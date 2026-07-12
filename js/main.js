// Boot, screen routing, and event wiring only. Feature logic lives in the
// other modules; this file glues them together.

import * as auth from './auth.js';
import { getMe, getTopTracks, SpotifyApiError } from './spotify.js';
import { getAlbumPool, getCachedPool, isPoolFresh, buildAlbumPool, SparseHistoryError } from './albums.js';
import { announce, show, hide, escapeHtml, formatDuration, formatRunningTime, formatDeadwaxDate, prefersReducedMotion } from './ui.js';
import { initWall } from './wall.js';
import * as playback from './playback.js';
import {
  needleDrop, selectAlbum, runoutGroove, runoutPrompt, updateTonearmProgress, retireDisc,
  isCrackleEnabled, toggleCrackle, settleActiveOverlay, cancelSelectionPreview
} from './ceremony.js';
import { detectEndFromSdkStates, detectEndFromConnectSnapshots } from './ending.js';
import * as journal from './journal.js';
import * as exporter from './exporter.js';
import { loadBagManifest, resolveBag } from './bags.js';
import { getRecordsNearby } from './nearby.js';
import { searchAlbums } from './search.js';

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
  pastSessions: document.getElementById('screen-past-sessions'),
};

// Tabs only apply to the three screens reachable once connected; 'loading'
// has no tab of its own and simply leaves the previous tab's state as-is.
const tabsByScreen = { app: 'tab-wall', pastSessions: 'tab-past-sessions', setup: 'tab-setup' };

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
const tabPastSessionsBtn = document.getElementById('tab-past-sessions');
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

// Step 02 (create the app) has to happen on the Spotify developer dashboard,
// which is unusable on a small screen. On a phone/tablet, offer a copyable
// link to this exact page so the rest of setup can continue on a computer.
const sendToComputerWell = document.getElementById('send-to-computer');
const sendToComputerLabel = document.getElementById('send-to-computer-label');
const sendToComputerUrl = document.getElementById('send-to-computer-url');
const copyPageUrlBtn = document.getElementById('copy-page-url');

function isMobileDevice() {
  return /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
}

if (isMobileDevice()) {
  sendToComputerUrl.textContent = window.location.href;
  show(sendToComputerWell);
  show(sendToComputerLabel);
}

copyPageUrlBtn?.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(window.location.href);
    const label = copyPageUrlBtn.querySelector('span');
    const original = label.textContent;
    label.textContent = 'Copied';
    setTimeout(() => { label.textContent = original; }, 1500);
  } catch {
    // Clipboard API unavailable: the URL is already selectable as plain text.
  }
});

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
const bagRail = document.getElementById('bag-rail');
const nearbyShelf = document.getElementById('nearby-shelf');
const playerNearby = document.getElementById('player-nearby');

const playerBar = document.getElementById('player-bar');
const playerArt = document.getElementById('player-art');
const playerTrack = document.getElementById('player-track');
const playerArtist = document.getElementById('player-artist');
const playerAlbum = document.getElementById('player-album');
const playerPlayPause = document.getElementById('player-playpause');
const playerPrev = document.getElementById('player-prev');
const playerNext = document.getElementById('player-next');
const playerElapsed = document.getElementById('player-elapsed');
const playerTotal = document.getElementById('player-total');
const playerProgressFill = document.getElementById('player-progress-fill');
const playerDevice = document.getElementById('player-device');
const playerDeviceSwitch = document.getElementById('player-device-switch');
const wakeConfirmation = document.getElementById('wake-confirmation');

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
let currentSessionId = null;
let ceremonyBusy = false;
let runoutBusy = false;

// Record bags (PRD F11): the user's own pool is always available to switch
// back to ("YOUR WALL"); the seed bags resolve to real Spotify albums
// lazily, the first time each is actually selected.
let userWallPool = null;
let activeBagId = null;
let activeSearchQuery = null; // { query, mode: 'artist'|'genre' } | null, mutually exclusive with activeBagId
let bagSwitchBusy = false;
let bagManifestCache = null;

function delay(ms) {
  return new Promise((resolve) => { setTimeout(resolve, ms); });
}

function renderWallDom(pool) {
  wallContainer.innerHTML = '';
  wallApi = initWall(wallViewport, wallContainer, pool, {
    // Tapping (or long-pressing) a cover no longer plays it immediately:
    // both bring it to the foreground as a selection preview and wait for
    // Play or "Find something else" -- see handleSelectAlbum().
    onSelect: (entry) => handleSelectAlbum(entry),
    onLongPress: (entry) => handleSelectAlbum(entry),
    onZoomOut: () => renderJourneyThread(),
    // Dragging the gallery is one of the two conditions that ends the "now
    // playing" hero cover (the other is the album finishing, in
    // handleRunout); settle it back into its cell so the gallery is free
    // to explore. It should also drop any selection preview that's still
    // waiting on a decision, for the same reason.
    onGalleryDragMove: () => {
      settleActiveOverlay(wallApi, { animate: true });
      cancelSelectionPreview();
    },
  });
}

function setWallPrompt(pool) {
  const everDropped = localStorage.getItem(LS_EVER_DROPPED) === 'true';
  if (activeSearchQuery) {
    const label = activeSearchQuery.mode === 'artist' ? 'Artist' : 'Genre';
    wallPrompt.textContent = `${label}: ${activeSearchQuery.query}. ${pool.length} records. Tap one to drop the needle.`;
  } else if (activeBagId) {
    wallPrompt.textContent = `${pool.length} records. Tap one to drop the needle.`;
  } else {
    wallPrompt.textContent = everDropped
      ? `Your wall. ${pool.length} records. Tap one to drop the needle.`
      : 'Drop the needle on something.';
  }
}

/**
 * Crossfades the Wall from whatever pool is currently mounted to a new one
 * (DESIGN-SPEC §2a): the DomeGallery component has no way to swap its image
 * set in place, so this tears the old mount down and remounts fresh. Any
 * "now playing" hero cover is cleared first since its cell may not exist in
 * the new pool at all; playback itself is untouched, so the music continues.
 */
async function switchWallPool(pool) {
  if (bagSwitchBusy) return;
  bagSwitchBusy = true;
  try {
    if (currentAlbumId) retireDisc(currentAlbumId);
    wallContainer.classList.add('is-fading');
    // Matches #wall-container's own CSS transition-duration (--dur-breath,
    // collapsed to 150ms under reduced motion) so the remount happens only
    // once the fade-out has actually finished, not mid-fade.
    await delay(prefersReducedMotion() ? 150 : 600);
    if (wallApi) wallApi.destroy();
    renderWallDom(pool);
    setWallPrompt(pool);
    requestAnimationFrame(() => wallContainer.classList.remove('is-fading'));
  } finally {
    bagSwitchBusy = false;
  }
}

function renderBagChips(bags) {
  bagRail.innerHTML = '';

  const wallChip = document.createElement('button');
  wallChip.type = 'button';
  wallChip.className = 'bag-chip deadwax';
  wallChip.textContent = 'YOUR WALL';
  wallChip.setAttribute('aria-pressed', String(!activeBagId && !activeSearchQuery));
  wallChip.addEventListener('click', () => selectBag(null));
  bagRail.appendChild(wallChip);

  if (activeSearchQuery) {
    const searchChip = document.createElement('button');
    searchChip.type = 'button';
    searchChip.className = 'bag-chip deadwax is-search';
    const label = activeSearchQuery.mode === 'artist' ? 'ARTIST' : 'GENRE';
    searchChip.textContent = `${label}: ${activeSearchQuery.query.toUpperCase()}`;
    searchChip.setAttribute('aria-pressed', 'true');
    searchChip.title = 'Back to your wall';
    searchChip.addEventListener('click', () => selectBag(null));
    bagRail.appendChild(searchChip);
  }

  for (const bag of bags) {
    const chip = document.createElement('button');
    chip.type = 'button';
    chip.className = 'bag-chip deadwax';
    chip.textContent = bag.name.toUpperCase();
    chip.title = bag.blurb;
    chip.setAttribute('aria-pressed', String(!activeSearchQuery && activeBagId === bag.id));
    chip.addEventListener('click', () => selectBag(bag.id));
    bagRail.appendChild(chip);
  }

  show(bagRail);
}

async function selectBag(bagId) {
  if (bagId === activeBagId && !activeSearchQuery) return;
  if (bagSwitchBusy) return;

  if (bagId === null) {
    activeBagId = null;
    activeSearchQuery = null;
    renderBagChips(bagManifestCache || []);
    if (userWallPool) await switchWallPool(userWallPool);
    return;
  }

  const bag = (bagManifestCache || []).find((b) => b.id === bagId);
  if (!bag) return;

  wallPrompt.textContent = `${bag.name}. Pulling records from the shelf.`;
  const pool = await resolveBag(bag);
  if (pool.length === 0) {
    wallPrompt.textContent = `Could not resolve any records in ${bag.name} right now.`;
    return;
  }
  activeBagId = bagId;
  activeSearchQuery = null;
  renderBagChips(bagManifestCache || []);
  await switchWallPool(pool);
}

async function renderBagRail() {
  try {
    bagManifestCache = await loadBagManifest();
  } catch {
    bagManifestCache = [];
  }
  if (bagManifestCache.length === 0 && !activeSearchQuery) {
    hide(bagRail);
    return;
  }
  renderBagChips(bagManifestCache);
}

// ---------------------------------------------------------------------
// Search: by artist or genre. Shares the bag-rail chip (a dismissible
// "ARTIST: X" / "GENRE: X" chip appears alongside YOUR WALL) and the same
// switchWallPool() crossfade the bags use.
// ---------------------------------------------------------------------

const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');

async function performSearch(query) {
  if (bagSwitchBusy) return;
  const trimmed = query.trim();
  if (!trimmed) return;

  wallPrompt.textContent = `Searching for "${trimmed}".`;
  const { pool, mode, failed } = await searchAlbums(trimmed);
  if (pool.length === 0) {
    wallPrompt.textContent = failed
      ? `Search failed. Check your connection and try again.`
      : `No albums found for "${trimmed}". Only full albums and EPs of 6 or more tracks are shown.`;
    return;
  }
  activeBagId = null;
  activeSearchQuery = { query: trimmed, mode };
  renderBagChips(bagManifestCache || []);
  await switchWallPool(pool);
}

searchForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  performSearch(searchInput.value);
  searchInput.blur(); // dismiss the on-screen keyboard on mobile once submitted.
});

function renderJourneyThread() {
  if (!wallApi) return;
  if (!currentSessionId) { wallApi.renderThread([]); return; }
  const session = journal.getSession(currentSessionId);
  if (!session) return;
  wallApi.renderThread(session.entries.map((e) => e.albumId));
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
    // prepareAlbum() has run by now (needleDrop awaits commitPlayback), so
    // the context carries the album's real tracklist duration.
    const durationMs = playback.getCurrentContext()?.totalDurationMs ?? null;
    const { session, sessionOrdinal } = journal.recordNeedleDrop(entry, { durationMs });
    currentSessionId = session.id;
    wallPrompt.textContent = `Session ${sessionOrdinal} · now playing`;
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

/**
 * The Wall's primary tap/long-press flow: brings the cover to the
 * foreground with its name, artist, and a one-line description, and waits
 * for Play or "Find something else" before anything actually plays (see
 * ceremony.js's selectAlbum()). Nothing is recorded in the journal unless
 * the listener actually presses Play.
 */
async function handleSelectAlbum(entry) {
  if (ceremonyBusy) return;
  ceremonyBusy = true;
  pendingEntry = entry;
  wallPrompt.textContent = '';
  announce(`${entry.name} by ${entry.artist}. Press play, or find something else.`);
  try {
    const result = await selectAlbum(entry, {
      wallApi,
      wallViewportEl: wallViewport,
      currentAlbumId,
      crackleHintEl: crackleHint,
    });
    if (!result.committed) {
      wallPrompt.textContent = 'Pick another record.';
      return;
    }
    currentAlbumId = entry.id;
    localStorage.setItem(LS_EVER_DROPPED, 'true');
    const durationMs = playback.getCurrentContext()?.totalDurationMs ?? null;
    const { session, sessionOrdinal } = journal.recordNeedleDrop(entry, { durationMs });
    currentSessionId = session.id;
    wallPrompt.textContent = `Session ${sessionOrdinal} · now playing`;
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
    // Explicitly pause: Spotify's own account-level Autoplay setting (if
    // the listener has it on) would otherwise start playing something
    // unrelated the moment the album's context runs out, which defeats
    // the "you must choose the next record" experience this app is for.
    await playback.togglePlayPause(true).catch(() => {});
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
  playerArtist.textContent = viewModel.artistName || '';
  playerAlbum.textContent = viewModel.albumName || '';

  const playIcon = playerPlayPause.querySelector('use');
  playIcon.setAttribute('href', viewModel.isPlaying ? '#icon-pause' : '#icon-play');
  playerPlayPause.setAttribute('aria-label', viewModel.isPlaying ? 'Pause' : 'Play');
  playerPlayPause.setAttribute('title', viewModel.isPlaying ? 'Pause' : 'Play');

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

function syncCrackleButton() {
  const on = isCrackleEnabled();
  btnCrackle.setAttribute('aria-pressed', String(on));
  btnCrackle.querySelector('span').textContent = on ? 'On' : 'Off';
}
syncCrackleButton();
btnCrackle.addEventListener('click', () => {
  toggleCrackle();
  syncCrackleButton();
});

// ---------------------------------------------------------------------
// Past sessions (the journal). "Record bag" is reserved for curated
// collections shown on the wall itself (js/bags.js); this is what was
// called "Record bag" before INCREMENT-01 Phase 0's rename.
// ---------------------------------------------------------------------

const pastSessionsList = document.getElementById('past-sessions-list');
const btnClosePastSessions = document.getElementById('btn-close-past-sessions');
const btnNewSession = document.getElementById('btn-new-session');

function openPastSessions() {
  renderPastSessions();
  showScreen('pastSessions');
}

btnClosePastSessions.addEventListener('click', () => showScreen('app'));

btnNewSession.addEventListener('click', () => {
  // Closes whatever session is currently open in the journal (PRD F8); the
  // next needle drop opens a fresh one. Nothing about current playback
  // changes, which is why this needs an explicit confirmation, otherwise
  // it looks like the button does nothing at all.
  journal.startNewSession();
  currentSessionId = null;
  renderJourneyThread();
  renderPastSessions();
  wallPrompt.textContent = 'New session. Drop the needle on something.';
  announce('New session started.');
});

// ---------------------------------------------------------------------
// Top tab navigation (Now playing / Past sessions / Setup), shown once connected
// ---------------------------------------------------------------------

tabWall.addEventListener('click', () => showScreen('app'));
tabPastSessionsBtn.addEventListener('click', openPastSessions);
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

function renderPastSessions() {
  const sessions = journal.getSessionsNewestFirst();
  const lifetimeCount = journal.getLifetimeSessionCount();
  pastSessionsList.innerHTML = '';

  if (sessions.length === 0) {
    const empty = document.createElement('p');
    empty.className = 'empty-past-sessions';
    empty.textContent = 'No sessions yet. The first needle drop starts one.';
    pastSessionsList.appendChild(empty);
    return;
  }

  sessions.forEach((session, indexFromNewest) => {
    const ordinal = lifetimeCount - indexFromNewest;
    pastSessionsList.appendChild(renderSessionRow(session, ordinal));
  });
}

function renderSessionRow(session, ordinal) {
  const row = document.createElement('div');
  row.className = 'session-row';

  const headWrap = document.createElement('div');
  headWrap.className = 'session-row-head-wrap';

  const head = document.createElement('button');
  head.type = 'button';
  head.className = 'session-row-head';
  const headLabel = document.createElement('span');
  headLabel.className = 'deadwax session-row-label';
  const parts = [`SESSION ${ordinal}`, formatDeadwaxDate(session.startedAt)];
  const runningMs = journal.sessionDurationMs(session);
  if (runningMs > 0) parts.push(formatRunningTime(runningMs));
  headLabel.textContent = parts.join(' · ');
  head.append(headLabel, svgIcon('icon-chevron'));

  // Share lives on the collapsed row itself (INCREMENT-01 Phase 3c): one
  // affordance per session, no need to expand first.
  const shareBtn = document.createElement('button');
  shareBtn.type = 'button';
  shareBtn.className = 'icon-btn session-share-btn';
  shareBtn.setAttribute('aria-label', `Share session ${ordinal}`);
  shareBtn.title = `Share session ${ordinal}`;
  shareBtn.appendChild(svgIcon('icon-export'));
  shareBtn.addEventListener('click', () => handleShareSession(session, ordinal, shareBtn));

  headWrap.append(head, shareBtn);
  row.appendChild(headWrap);

  const strip = document.createElement('div');
  strip.className = 'session-strip';
  session.entries.forEach((entry) => {
    if (!entry.image) return;
    const img = document.createElement('img');
    img.src = entry.image;
    img.alt = '';
    strip.appendChild(img);
  });
  if (session.entries.length > 1) {
    const thread = document.createElement('div');
    thread.className = 'session-thread';
    strip.appendChild(thread);
  }
  row.appendChild(strip);

  const entriesWrap = document.createElement('div');
  entriesWrap.className = 'session-entries';
  session.entries.forEach((entry) => entriesWrap.appendChild(renderEntryRow(session, entry)));

  const actions = document.createElement('div');
  actions.className = 'session-actions';
  const deleteBtn = document.createElement('button');
  deleteBtn.type = 'button';
  deleteBtn.className = 'icon-btn';
  deleteBtn.append(svgIcon('icon-bin'), document.createTextNode('Forget this session'));
  deleteBtn.addEventListener('click', () => handleDeleteSession(session, ordinal));
  actions.append(deleteBtn);
  entriesWrap.appendChild(actions);
  row.appendChild(entriesWrap);

  head.addEventListener('click', () => entriesWrap.classList.toggle('is-open'));

  preRenderShareCard(session, ordinal);

  return row;
}

function renderEntryRow(session, entry) {
  const wrap = document.createElement('div');
  wrap.className = 'session-entry';
  if (entry.image) {
    const img = document.createElement('img');
    img.src = entry.image;
    img.alt = '';
    wrap.appendChild(img);
  }

  const body = document.createElement('div');
  body.className = 'session-entry-body';
  const title = document.createElement('div');
  title.className = 'session-entry-title';
  title.textContent = entry.name;
  const artist = document.createElement('div');
  artist.className = 'session-entry-artist';
  artist.textContent = entry.artist;

  body.append(title, artist);
  wrap.appendChild(body);
  return wrap;
}

// Share cards are rendered ahead of the tap that shares them (INCREMENT-01
// Phase 3b / PRD F8a): iOS Safari requires navigator.share() to run inside
// the tap's transient activation, and rendering (loading album art over the
// network) is too slow to fit inside that window. Kicked off as soon as
// each row exists (Past sessions opening), keyed by session id.
const sessionCardCache = new Map();

function preRenderShareCard(session, ordinal) {
  if (sessionCardCache.has(session.id)) return;
  sessionCardCache.set(session.id, exporter.renderSessionCard(session, ordinal));
}

function getSessionCard(session, ordinal) {
  preRenderShareCard(session, ordinal);
  return sessionCardCache.get(session.id);
}

async function handleShareSession(session, ordinal, triggerBtn) {
  triggerBtn.disabled = true;
  try {
    const filename = `longplayur-session-${ordinal}.png`;
    const { canvas } = await getSessionCard(session, ordinal);

    if (navigator.canShare) {
      try {
        const file = await exporter.canvasToFile(canvas, filename);
        if (navigator.canShare({ files: [file] })) {
          await navigator.share({
            files: [file],
            title: 'Longplayur',
            text: `Session ${ordinal} · ${formatDeadwaxDate(session.startedAt)}`,
          });
          return;
        }
      } catch (err) {
        if (err?.name === 'AbortError') return; // user cancelled the sheet: silent, no error UI.
        // NotAllowedError or anything else: fall through to download.
      }
    }
    exporter.downloadCanvas(canvas, filename);
  } finally {
    triggerBtn.disabled = false;
  }
}

function handleDeleteSession(session, ordinal) {
  const confirmed = window.confirm(`Forget session ${ordinal}? The music stays; the record of it goes.`);
  if (!confirmed) return;
  journal.deleteSession(session.id);
  sessionCardCache.delete(session.id);
  if (currentSessionId === session.id) {
    currentSessionId = null;
    renderJourneyThread();
  }
  renderPastSessions();
}

function isAndroidDevice() {
  return /Android/i.test(navigator.userAgent);
}

// Spotify's own device list already includes any Chromecast-paired speaker
// that supports Spotify Connect (as type CastAudio/CastVideo) -- that is
// the only way to actually get Spotify audio playing on a cast device, so
// rather than a separate, incompatible Google Cast picker, each entry is
// labelled with Spotify's own device type.
const DEVICE_TYPE_LABELS = {
  Computer: 'Computer',
  Smartphone: 'Phone',
  Tablet: 'Tablet',
  Speaker: 'Speaker',
  TV: 'TV',
  AVR: 'Receiver',
  STB: 'Set-top box',
  AudioDongle: 'Audio dongle',
  GameConsole: 'Game console',
  CastVideo: 'Cast',
  CastAudio: 'Cast',
  Automobile: 'Car',
};

function deviceTypeLabel(type) {
  return DEVICE_TYPE_LABELS[type] || 'Device';
}

function renderDeviceListItems(devices, { isSwitch }) {
  deviceList.innerHTML = '';
  for (const device of devices) {
    const li = document.createElement('li');
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'device-item';

    const name = document.createElement('span');
    name.className = 'device-item-name';
    name.textContent = device.is_active ? `${device.name} (current)` : device.name;

    const type = document.createElement('span');
    type.className = 'device-item-type deadwax';
    type.textContent = deviceTypeLabel(device.type);

    btn.append(name, type);
    btn.addEventListener('click', async () => {
      await playback.selectDevice(device.id, device.name);
      hide(modalDevice);
      if (!isSwitch && pendingEntry) handleNeedleDrop(pendingEntry);
    });
    li.appendChild(btn);
    deviceList.appendChild(li);
  }
}

/**
 * @param {Array} devices
 * @param {{isSwitch?: boolean}} [opts] isSwitch: mid-session output switcher
 *   rather than the initial "no active device" picker, so picking a device
 *   transfers playback (PRD F7) instead of resuming a pending needle drop.
 */
function openDeviceModal(devices, { isSwitch = false } = {}) {
  if (devices.length === 0 && !isSwitch) {
    deviceList.innerHTML = '';
    if (isAndroidDevice()) {
      modalDeviceCopy.textContent = 'No Spotify devices found.';
      const li = document.createElement('li');
      const wakeBtn = document.createElement('button');
      wakeBtn.type = 'button';
      wakeBtn.textContent = 'Wake Spotify';
      wakeBtn.addEventListener('click', handleWakeSpotify);
      li.appendChild(wakeBtn);
      deviceList.appendChild(li);
    } else {
      modalDeviceCopy.textContent = 'No Spotify devices found. Open Spotify anywhere, play anything for a second, then refresh.';
    }
  } else if (devices.length === 0) {
    deviceList.innerHTML = '';
    modalDeviceCopy.textContent = 'No other Spotify devices found.';
  } else {
    modalDeviceCopy.textContent = 'Choose where Longplayur should play.';
    renderDeviceListItems(devices, { isSwitch });
  }
  show(modalDevice);
}
modalDeviceClose.addEventListener('click', () => hide(modalDevice));

// ---------------------------------------------------------------------
// Android wake flow (PRD F7): deep-link into the Spotify app, then re-poll
// for up to 15s once the user returns to Longplayur, auto-selecting the
// phone the moment it appears as a device.
// ---------------------------------------------------------------------

const WAKE_POLL_WINDOW_MS = 15000;
const WAKE_POLL_INTERVAL_MS = 1000;

function showWakeConfirmation() {
  show(wakeConfirmation);
  wakeConfirmation.classList.add('is-visible');
  announce('Found this phone. Carrying on.');
  setTimeout(() => {
    wakeConfirmation.classList.remove('is-visible');
    setTimeout(() => hide(wakeConfirmation), 200);
  }, 2200);
}

async function pollForWokenDevice(deadline) {
  while (Date.now() < deadline) {
    const devices = await playback.listDevices();
    if (devices.length > 0) {
      const device = devices[0];
      await playback.selectDevice(device.id, device.name);
      hide(modalDevice);
      showWakeConfirmation();
      if (pendingEntry) handleNeedleDrop(pendingEntry);
      return;
    }
    await new Promise((resolve) => setTimeout(resolve, WAKE_POLL_INTERVAL_MS));
  }
  modalDeviceCopy.textContent = 'Still no Spotify devices found. Open Spotify on this phone and try again.';
}

function handleWakeSpotify() {
  const deadline = Date.now() + WAKE_POLL_WINDOW_MS;
  const onVisible = () => {
    if (document.visibilityState !== 'visible') return;
    document.removeEventListener('visibilitychange', onVisible);
    pollForWokenDevice(deadline);
  };
  document.addEventListener('visibilitychange', onVisible);
  // The `spotify:` URI scheme opens the installed app if present; if it is
  // not installed there is simply no visibility change to react to, and the
  // modal's copy already tells the user to open Spotify themselves.
  window.location.href = 'spotify:';
}

// ---------------------------------------------------------------------
// Output switcher (PRD F7): persistent device icon on the player bar,
// transfers playback mid-session without resetting the tonearm arc (the
// arc is driven by elapsed/total from whichever poll or SDK event reports
// next, unaffected by which device is reporting it).
// ---------------------------------------------------------------------

playerDeviceSwitch.addEventListener('click', async () => {
  const devices = await playback.listDevices();
  openDeviceModal(devices, { isSwitch: true });
});

// ---------------------------------------------------------------------
// Records nearby (PRD F10): a low shelf of related albums for whatever is
// currently playing, sourced from Deezer. Hides itself with no error state
// if nothing resolves, per edge case 10.
// ---------------------------------------------------------------------

let nearbyOpen = false;

function renderNearbyShelf(shelf) {
  nearbyShelf.innerHTML = '';
  for (const entry of shelf) {
    const item = document.createElement('button');
    item.type = 'button';
    item.className = 'nearby-item';
    if (entry.image) {
      const img = document.createElement('img');
      img.src = entry.image;
      img.alt = '';
      item.appendChild(img);
    }
    const caption = document.createElement('span');
    caption.className = 'nearby-caption deadwax';
    caption.textContent = entry.caption;
    item.appendChild(caption);
    item.addEventListener('click', () => {
      closeNearbyShelf();
      handleNeedleDrop(entry);
    });
    nearbyShelf.appendChild(item);
  }
}

function closeNearbyShelf() {
  nearbyOpen = false;
  hide(nearbyShelf);
}

playerNearby.addEventListener('click', async () => {
  if (nearbyOpen) {
    closeNearbyShelf();
    return;
  }
  if (!latestViewModel?.artistName) return;
  const seedArtist = latestViewModel.artistName.split(',')[0].trim();
  const shelf = await getRecordsNearby(seedArtist);
  if (shelf.length === 0) return; // Deezer unreachable or nothing resolved: no error state.
  renderNearbyShelf(shelf);
  nearbyOpen = true;
  show(nearbyShelf);
});

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
    userWallPool = pool;
    activeBagId = null;
    renderWallDom(pool);
    setWallPrompt(pool);
    announce(`Your wall. ${pool.length} records. Tap one to drop the needle.`);
    renderBagRail();
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
  currentSessionId = null;
  auth.signOut();
  hide(appTabs);
  showScreen('setup');
  hide(setupError);
  hide(diagnostics);
  hide(testConnectionLink);
}

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
