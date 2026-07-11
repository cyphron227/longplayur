// Boot, screen routing, and event wiring only. Feature logic lives in the
// other modules; this file glues them together.

import * as auth from './auth.js';
import { getMe, getTopTracks, SpotifyApiError } from './spotify.js';
import { getAlbumPool, getCachedPool, isPoolFresh, buildAlbumPool, SparseHistoryError } from './albums.js';
import { announce, show, hide, escapeHtml, formatDuration, formatDeadwaxDate } from './ui.js';
import { initWall } from './wall.js';
import * as playback from './playback.js';
import { needleDrop, runoutGroove, runoutPrompt, updateTonearmProgress, retireDisc, isCrackleEnabled, toggleCrackle } from './ceremony.js';
import { detectEndFromSdkStates, detectEndFromConnectSnapshots } from './ending.js';
import * as journal from './journal.js';
import * as exporter from './exporter.js';

// Strip the OAuth `code`/`state`/`error` from the address bar before anything else runs.
const callbackParams = auth.consumeCallbackParams();

// PRD edge case 8: offline detection. Existing fetches already fail quietly
// without hammering (bounded retries, fixed 5s poll interval); this banner
// is the "resume gracefully" half, since nothing here needs to be torn down.
const offlineBanner = document.getElementById('offline-banner');
function updateOnlineStatus() {
  if (navigator.onLine) hide(offlineBanner);
  else show(offlineBanner);
}
window.addEventListener('online', updateOnlineStatus);
window.addEventListener('offline', updateOnlineStatus);
updateOnlineStatus();

const screens = {
  setup: document.getElementById('screen-setup'),
  loading: document.getElementById('screen-loading'),
  app: document.getElementById('screen-app'),
  recordBag: document.getElementById('screen-record-bag'),
};

// Tabs only apply to the three screens reachable once connected; 'loading'
// has no tab of its own and simply leaves the previous tab's state as-is.
const tabsByScreen = { app: 'tab-wall', recordBag: 'tab-record-bag', setup: 'tab-setup' };

function showScreen(name) {
  for (const [key, node] of Object.entries(screens)) {
    if (!node) continue;
    node.hidden = key !== name;
  }
  if (name === 'setup') syncSetupPanels();
  for (const [key, tabId] of Object.entries(tabsByScreen)) {
    const tabBtn = document.getElementById(tabId);
    if (!tabBtn) continue;
    if (key === name) tabBtn.setAttribute('aria-current', 'page');
    else tabBtn.removeAttribute('aria-current');
  }
}

const redirectUriEl = document.getElementById('redirect-uri');
const clientIdInput = document.getElementById('client-id-input');
const clientIdError = document.getElementById('client-id-error');
const connectButton = document.getElementById('connect-button');
const setupConnectPanel = document.getElementById('setup-connect-panel');
const setupConnectedPanel = document.getElementById('setup-connected-panel');
const setupSignOutBtn = document.getElementById('setup-sign-out');
const testConnectionLink = document.getElementById('test-connection-link');
const setupError = document.getElementById('setup-error');
const diagnostics = document.getElementById('diagnostics');
const appTabs = document.getElementById('app-tabs');
const tabWall = document.getElementById('tab-wall');
const tabRecordBagBtn = document.getElementById('tab-record-bag');
const tabSetup = document.getElementById('tab-setup');

/** Setup doubles as first-run onboarding and a "connection settings" tab. */
function syncSetupPanels() {
  const connected = auth.hasSession();
  setupConnectPanel.hidden = connected;
  setupConnectedPanel.hidden = !connected;
}
const copyRedirectBtn = document.getElementById('copy-redirect-uri');

redirectUriEl.textContent = auth.getRedirectUri();
clientIdInput.value = auth.getClientId();
updateConnectButtonState();

clientIdInput.addEventListener('input', () => {
  hide(clientIdError);
  updateConnectButtonState();
});

function updateConnectButtonState() {
  connectButton.disabled = !auth.isValidClientId(clientIdInput.value || '');
}

copyRedirectBtn.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(auth.getRedirectUri());
    const label = copyRedirectBtn.querySelector('span');
    const original = label.textContent;
    label.textContent = 'Copied';
    setTimeout(() => { label.textContent = original; }, 1500);
  } catch {
    // Clipboard API unavailable: the URI is already selectable as plain text.
  }
});

connectButton.addEventListener('click', async () => {
  const value = clientIdInput.value.trim();
  if (!auth.isValidClientId(value)) {
    clientIdError.textContent = 'That does not look like a Spotify client ID. It is a string of 16 to 40 hex characters.';
    show(clientIdError);
    return;
  }
  auth.setClientId(value);
  hide(setupError);
  await auth.startAuthorization();
});

testConnectionLink.addEventListener('click', () => {
  runDiagnostics();
});

function setSetupError(message, { showDiagnosticsLink = true } = {}) {
  setupError.textContent = message;
  show(setupError);
  if (showDiagnosticsLink) show(testConnectionLink);
}

function diagLine(label, status, detail) {
  const cls = status === 'OK' ? 'diag-ok' : 'diag-fail';
  const text = status === 'OK' ? 'OK' : `FAILED: ${detail}`;
  return `<p class="diag-line">${escapeHtml(label)} &middot; <span class="${cls}">${escapeHtml(text)}</span></p>`;
}

async function runDiagnostics() {
  diagnostics.innerHTML = '<p class="diag-line">Running diagnostics&hellip;</p>';
  show(diagnostics);

  let ok = true;
  let failureMessage = '';

  let meLine;
  try {
    await getMe();
    meLine = diagLine('GET /me', 'OK');
  } catch (err) {
    ok = false;
    failureMessage = describeSpotifyError(err);
    meLine = diagLine('GET /me', 'FAILED', failureMessage);
  }

  let topLine;
  try {
    await getTopTracks('long_term', 1);
    topLine = diagLine('Top tracks', 'OK');
  } catch (err) {
    ok = false;
    failureMessage = describeSpotifyError(err);
    topLine = diagLine('Top tracks', 'FAILED', failureMessage);
  }

  diagnostics.innerHTML = meLine + topLine;
  return { ok, message: failureMessage };
}

function describeSpotifyError(err) {
  if (err instanceof SpotifyApiError) {
    if (err.status === 403) {
      return "Spotify refused (403). In your app's settings on the developer dashboard, add your own Spotify account under User Management, then try again.";
    }
    if (err.kind === 'network') return 'Could not reach Spotify. You may be offline.';
    return `Spotify responded with ${err.status}.`;
  }
  return err?.message || 'Unknown error.';
}

// ---------------------------------------------------------------------
// The Wall + playback
// ---------------------------------------------------------------------

const wallViewport = document.getElementById('wall-viewport');
const wallContainer = document.getElementById('wall-container');
const wallPrompt = document.getElementById('wall-prompt');
const btnZoomOut = document.getElementById('btn-zoom-out');

const playerBar = document.getElementById('player-bar');
const playerArt = document.getElementById('player-art');
const playerTrack = document.getElementById('player-track');
const playerAlbum = document.getElementById('player-album');
const playerPlayPause = document.getElementById('player-playpause');
const playerPrev = document.getElementById('player-prev');
const playerNext = document.getElementById('player-next');
const playerElapsed = document.getElementById('player-elapsed');
const playerTotal = document.getElementById('player-total');
const playerProgressFill = document.getElementById('player-progress-fill');
const playerDevice = document.getElementById('player-device');

const modalDevice = document.getElementById('modal-device');
const modalDeviceCopy = document.getElementById('modal-device-copy');
const deviceList = document.getElementById('device-list');
const modalDeviceClose = document.getElementById('modal-device-close');

const crackleHint = document.getElementById('crackle-hint');
const btnCrackle = document.getElementById('btn-crackle');

const LS_EVER_DROPPED = 'lp_ever_dropped';

let wallApi = null;
let latestViewModel = null;
let pendingEntry = null;
let currentAlbumId = null;
let currentSideId = null;
let ceremonyBusy = false;
let runoutBusy = false;

function renderWallDom(pool) {
  wallContainer.innerHTML = '';
  wallApi = initWall(wallViewport, wallContainer, pool, {
    onSelect: (entry) => handleNeedleDrop(entry),
    onZoomOut: () => renderJourneyThread(),
  });
  const everDropped = localStorage.getItem(LS_EVER_DROPPED) === 'true';
  wallPrompt.textContent = everDropped
    ? `Your wall. ${pool.length} records. Tap one to drop the needle.`
    : 'Drop the needle on something.';
}

function renderJourneyThread() {
  if (!wallApi) return;
  if (!currentSideId) { wallApi.renderThread([]); return; }
  const side = journal.getSide(currentSideId);
  if (!side) return;
  wallApi.renderThread(side.entries.map((e) => e.albumId));
}

async function handleNeedleDrop(entry) {
  if (ceremonyBusy) return;
  ceremonyBusy = true;
  pendingEntry = entry;
  wallPrompt.textContent = '';
  try {
    await needleDrop(entry, {
      wallApi,
      wallViewportEl: wallViewport,
      currentAlbumId,
      crackleHintEl: crackleHint,
    });
    currentAlbumId = entry.id;
    localStorage.setItem(LS_EVER_DROPPED, 'true');
    const { side, sideOrdinal } = journal.recordNeedleDrop(entry);
    currentSideId = side.id;
    wallPrompt.textContent = `Side ${sideOrdinal} · now playing`;
  } catch (err) {
    if (err instanceof SpotifyApiError && err.status === 403) {
      wallApi.markUnavailable(entry.id);
      wallPrompt.textContent = "Spotify won't play this one here. Pick another record.";
    } else {
      wallPrompt.textContent = describeSpotifyError(err);
    }
  } finally {
    ceremonyBusy = false;
  }
}

async function handleRunout() {
  if (runoutBusy || !currentAlbumId) return;
  runoutBusy = true;
  const finishedId = currentAlbumId;
  currentAlbumId = null;
  try {
    const { atEdge } = await runoutGroove(finishedId, { wallApi });
    wallPrompt.textContent = runoutPrompt(atEdge);
    announce(runoutPrompt(atEdge));
  } finally {
    runoutBusy = false;
  }
}

function updatePlayerBar(viewModel) {
  latestViewModel = viewModel;
  show(playerBar);
  if (viewModel.albumArt) playerArt.src = viewModel.albumArt;
  playerTrack.textContent = viewModel.trackName || '';
  playerAlbum.textContent = viewModel.albumName && viewModel.artistName
    ? `${viewModel.albumName} · ${viewModel.artistName}`
    : (viewModel.albumName || viewModel.artistName || '');

  const playIcon = playerPlayPause.querySelector('use');
  playIcon.setAttribute('href', viewModel.isPlaying ? '#icon-pause' : '#icon-play');
  playerPlayPause.setAttribute('aria-label', viewModel.isPlaying ? 'Pause' : 'Play');

  playerElapsed.textContent = formatDuration(viewModel.elapsedMs || 0);
  playerTotal.textContent = formatDuration(viewModel.totalMs || 0);
  const pct = viewModel.totalMs ? Math.min(100, (viewModel.elapsedMs / viewModel.totalMs) * 100) : 0;
  playerProgressFill.style.width = `${pct}%`;

  if (viewModel.mode === 'connect' && viewModel.deviceName) {
    playerDevice.textContent = `Playing on ${viewModel.deviceName}`;
    show(playerDevice);
  } else {
    hide(playerDevice);
  }

  if (currentAlbumId) updateTonearmProgress(currentAlbumId, viewModel.elapsedMs || 0, viewModel.totalMs || 0);

  announce(`Now playing ${viewModel.albumName} by ${viewModel.artistName}`);
}

playerPlayPause.addEventListener('click', async () => {
  if (!latestViewModel) return;
  await playback.togglePlayPause(latestViewModel.isPlaying);
});
playerPrev.addEventListener('click', () => playback.skipPrevious());
playerNext.addEventListener('click', () => playback.skipNext());

btnZoomOut.addEventListener('click', () => wallApi?.zoomToFitAll());

function syncCrackleButton() {
  btnCrackle.setAttribute('aria-pressed', String(isCrackleEnabled()));
}
syncCrackleButton();
btnCrackle.addEventListener('click', () => {
  toggleCrackle();
  syncCrackleButton();
});

// ---------------------------------------------------------------------
// Record bag
// ---------------------------------------------------------------------

const recordBagList = document.getElementById('record-bag-list');
const btnRecordBag = document.getElementById('btn-record-bag');
const btnCloseRecordBag = document.getElementById('btn-close-record-bag');
const btnNewSide = document.getElementById('btn-new-side');

const noteDebounceTimers = new Map();

function openRecordBag() {
  renderRecordBag();
  showScreen('recordBag');
}

btnRecordBag.addEventListener('click', openRecordBag);
btnCloseRecordBag.addEventListener('click', () => showScreen('app'));

btnNewSide.addEventListener('click', () => {
  journal.startNewSide();
  currentSideId = null;
  renderJourneyThread();
});

// ---------------------------------------------------------------------
// Top tab navigation (Now playing / Record bag / Setup), shown once connected
// ---------------------------------------------------------------------

tabWall.addEventListener('click', () => showScreen('app'));
tabRecordBagBtn.addEventListener('click', openRecordBag);
tabSetup.addEventListener('click', () => showScreen('setup'));

function svgIcon(iconId) {
  const ns = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(ns, 'svg');
  svg.setAttribute('class', 'icon');
  const use = document.createElementNS(ns, 'use');
  use.setAttribute('href', `#${iconId}`);
  svg.appendChild(use);
  return svg;
}

function renderRecordBag() {
  const sides = journal.getSidesNewestFirst();
  const lifetimeCount = journal.getLifetimeSideCount();
  recordBagList.innerHTML = '';

  if (sides.length === 0) {
    const empty = document.createElement('p');
    empty.className = 'empty-record-bag';
    empty.textContent = 'No sides yet. The first needle drop starts one.';
    recordBagList.appendChild(empty);
    return;
  }

  sides.forEach((side, indexFromNewest) => {
    const ordinal = lifetimeCount - indexFromNewest;
    recordBagList.appendChild(renderSideRow(side, ordinal));
  });
}

function renderSideRow(side, ordinal) {
  const row = document.createElement('div');
  row.className = 'side-row';

  const head = document.createElement('button');
  head.type = 'button';
  head.className = 'side-row-head';
  const headLabel = document.createElement('span');
  headLabel.className = 'deadwax';
  const recordWord = side.entries.length === 1 ? 'RECORD' : 'RECORDS';
  headLabel.textContent = `SIDE ${ordinal} · ${formatDeadwaxDate(side.startedAt)} · ${side.entries.length} ${recordWord}`;
  head.append(headLabel, svgIcon('icon-chevron'));
  row.appendChild(head);

  const strip = document.createElement('div');
  strip.className = 'side-strip';
  side.entries.forEach((entry) => {
    if (!entry.image) return;
    const img = document.createElement('img');
    img.src = entry.image;
    img.alt = '';
    strip.appendChild(img);
  });
  if (side.entries.length > 1) {
    const thread = document.createElement('div');
    thread.className = 'side-thread';
    strip.appendChild(thread);
  }
  row.appendChild(strip);

  const entriesWrap = document.createElement('div');
  entriesWrap.className = 'side-entries';
  side.entries.forEach((entry) => entriesWrap.appendChild(renderEntryRow(side, entry)));

  const actions = document.createElement('div');
  actions.className = 'side-actions';
  const exportBtn = document.createElement('button');
  exportBtn.type = 'button';
  exportBtn.className = 'icon-btn';
  exportBtn.append(svgIcon('icon-export'), document.createTextNode('Export this side'));
  exportBtn.addEventListener('click', () => handleExportSide(side, ordinal, exportBtn));
  const deleteBtn = document.createElement('button');
  deleteBtn.type = 'button';
  deleteBtn.className = 'icon-btn';
  deleteBtn.append(svgIcon('icon-bin'), document.createTextNode('Forget this side'));
  deleteBtn.addEventListener('click', () => handleDeleteSide(side, ordinal));
  actions.append(exportBtn, deleteBtn);
  entriesWrap.appendChild(actions);
  row.appendChild(entriesWrap);

  head.addEventListener('click', () => entriesWrap.classList.toggle('is-open'));

  return row;
}

function renderEntryRow(side, entry) {
  const wrap = document.createElement('div');
  wrap.className = 'side-entry';
  if (entry.image) {
    const img = document.createElement('img');
    img.src = entry.image;
    img.alt = '';
    wrap.appendChild(img);
  }

  const body = document.createElement('div');
  body.className = 'side-entry-body';
  const title = document.createElement('div');
  title.className = 'side-entry-title';
  title.textContent = entry.name;
  const artist = document.createElement('div');
  artist.className = 'side-entry-artist';
  artist.textContent = entry.artist;

  const note = document.createElement('textarea');
  note.className = 'liner-note';
  note.placeholder = 'Liner notes. What did this one do to you?';
  note.value = entry.note || '';
  note.setAttribute('aria-label', `Liner notes for ${entry.name}`);
  note.addEventListener('input', () => {
    const key = `${side.id}:${entry.albumId}:${entry.startedAt}`;
    clearTimeout(noteDebounceTimers.get(key));
    noteDebounceTimers.set(key, setTimeout(() => {
      journal.setLinerNote(side.id, entry.albumId, note.value);
    }, 500));
  });

  body.append(title, artist, note);
  wrap.appendChild(body);
  return wrap;
}

async function handleExportSide(side, ordinal, triggerBtn) {
  triggerBtn.disabled = true;
  try {
    const { dataUrl } = await exporter.exportSideCard(side, ordinal);
    exporter.downloadCard(dataUrl, `longplayur-side-${ordinal}.png`);
  } finally {
    triggerBtn.disabled = false;
  }
}

function handleDeleteSide(side, ordinal) {
  const confirmed = window.confirm(`Forget side ${ordinal}? The music stays; the record of it goes.`);
  if (!confirmed) return;
  journal.deleteSide(side.id);
  if (currentSideId === side.id) {
    currentSideId = null;
    renderJourneyThread();
  }
  renderRecordBag();
}

function openDeviceModal(devices) {
  deviceList.innerHTML = '';
  if (devices.length === 0) {
    modalDeviceCopy.textContent = 'No Spotify devices found. Open Spotify anywhere, play anything for a second, then refresh.';
  } else {
    modalDeviceCopy.textContent = 'Choose where Longplayur should play.';
    for (const device of devices) {
      const li = document.createElement('li');
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.textContent = device.name;
      btn.addEventListener('click', async () => {
        await playback.selectDevice(device.id, device.name);
        hide(modalDevice);
        if (pendingEntry) handleNeedleDrop(pendingEntry);
      });
      li.appendChild(btn);
      deviceList.appendChild(li);
    }
  }
  show(modalDevice);
}
modalDeviceClose.addEventListener('click', () => hide(modalDevice));

async function initPlaybackForApp() {
  try {
    await playback.initPlayback({
      onPlayerBarUpdate: updatePlayerBar,
      onNeedDevicePicker: openDeviceModal,
      onSdkTransition: (prev, next) => {
        if (detectEndFromSdkStates(prev, next)) handleRunout();
      },
      onConnectTransition: (prev, next) => {
        if (detectEndFromConnectSnapshots(prev, next)) handleRunout();
      },
      onError: (message) => { wallPrompt.textContent = message; },
      onModeReady: () => {},
    });
  } catch {
    wallPrompt.textContent = 'Could not set up playback. Reload to try again.';
  }
}

// ---------------------------------------------------------------------
// Boot flow
// ---------------------------------------------------------------------

async function enterApp({ forceRefresh = false } = {}) {
  show(appTabs); // enterApp is only ever called once auth.hasSession() is true.
  showScreen('loading');
  try {
    let pool;
    const cached = getCachedPool();
    if (!forceRefresh && isPoolFresh(cached)) {
      pool = cached.pool;
      // Refresh silently in the background; failures here are non-fatal.
      buildAlbumPool().catch(() => {});
    } else {
      pool = await getAlbumPool();
    }
    showScreen('app');
    renderWallDom(pool);
    announce(`Your wall. ${pool.length} records. Tap one to drop the needle.`);
    initPlaybackForApp();
  } catch (err) {
    if (err instanceof SparseHistoryError) {
      showScreen('setup');
      setSetupError(err.message, { showDiagnosticsLink: false });
      return;
    }
    showScreen('setup');
    if (err instanceof SpotifyApiError && err.status === 403) {
      setSetupError("Spotify refused (403). In your app's settings on the developer dashboard, add your own Spotify account under User Management, then try again.");
    } else {
      setSetupError(describeSpotifyError(err));
    }
  }
}

function performSignOut() {
  playback.teardown();
  if (currentAlbumId) {
    retireDisc(currentAlbumId);
    currentAlbumId = null;
  }
  currentSideId = null;
  auth.signOut();
  hide(appTabs);
  showScreen('setup');
  hide(setupError);
  hide(diagnostics);
  hide(testConnectionLink);
}

document.getElementById('btn-sign-out').addEventListener('click', performSignOut);
setupSignOutBtn.addEventListener('click', performSignOut);

async function boot() {
  if (callbackParams.code || callbackParams.error) {
    showScreen('setup');
    try {
      await auth.completeAuthorization(callbackParams);
      show(testConnectionLink);
      const diag = await runDiagnostics();
      if (diag.ok) {
        await enterApp({ forceRefresh: true });
      } else {
        setSetupError(diag.message);
      }
    } catch (err) {
      showScreen('setup');
      setSetupError(err?.message || 'Something went wrong connecting to Spotify.');
    }
    return;
  }

  if (auth.hasSession()) {
    await enterApp();
    return;
  }

  showScreen('setup');
}

boot();
