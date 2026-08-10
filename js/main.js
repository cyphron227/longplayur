// Boot, screen routing, and event wiring only. Feature logic lives in the
// other modules; this file glues them together.

import * as auth from './auth.js';
import { getMe, getTopTracks, SpotifyApiError } from './spotify.js';
import { getAlbumPool, getCachedPool, isPoolFresh, buildAlbumPool, SparseHistoryError } from './albums.js';
import { announce, show, hide, escapeHtml, formatDuration, formatRunningTime, formatDeadwaxDate, prefersReducedMotion } from './ui.js';
import { initWall } from './wall.js';
import * as playback from './playback.js';
import {
  needleDrop, selectAlbum, runoutGroove, updateTonearmProgress, retireDisc,
  isCrackleEnabled, toggleCrackle, settleActiveOverlay, cancelSelectionPreview,
  resurfaceNowPlaying
} from './ceremony.js';
import { detectEndFromSdkStates, detectEndFromConnectSnapshots } from './ending.js';
import * as journal from './journal.js';
import * as exporter from './exporter.js';
import { loadBagManifest, resolveBag } from './bags.js';
import { loadCustomBags, createCustomBag, deleteCustomBag, searchCatalog } from './bagbuilder.js';
import { loadMyPlaylists, resolvePlaylist } from './playlists.js';
import { getNewArrivals } from './newarrivals.js';
import { getRecordsNearby } from './nearby.js';
import { searchAlbums } from './search.js';
import * as flip from './flip.js';
import { gatherRunoutContext, buildRunoutGrid } from './runout.js';
import { mountTransport } from './transport.bundle.js';

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
  crates: document.getElementById('screen-crates'),
  pastSessions: document.getElementById('screen-past-sessions'),
  // Runout groove (INCREMENT-03 Phase 3): reached only from end-of-album,
  // deliberately absent from tabsByScreen below since it has no tab of its
  // own (not reachable from the tab bar).
  runout: document.getElementById('screen-runout'),
};

// Tabs only apply to the four screens reachable once connected; 'loading'
// has no tab of its own and simply leaves the previous tab's state as-is.
const tabsByScreen = { app: 'tab-wall', crates: 'tab-crates', pastSessions: 'tab-past-sessions', setup: 'tab-setup' };

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
const tabCrates = document.getElementById('tab-crates');
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
const cratesBtn = document.getElementById('crates-btn');
const cratesBtnLabel = document.getElementById('crates-btn-label');
const cratesYourBagBtn = document.getElementById('crates-your-bag-btn');
// Shelves (INCREMENT-03 Phase 2): record bags are grouped by their own
// `category` field into three shelf rows rather than one flat grid.
// Bag builder (custom record bags, js/bagbuilder.js): a "Bags you've made"
// shelf sits alongside the seed/mood/decade ones, reusing BAG_SHELVES below
// (grid()/count()/section()) the same way; its own count element is
// deliberately absent -- see BAG_SHELVES.custom.
const crateBagsCustomGrid = document.getElementById('crate-bags-custom-grid');
const crateCreateBagBtn = document.getElementById('crate-create-bag-btn');
const crateBagsSeedGrid = document.getElementById('crate-bags-seed-grid');
const crateBagsSeedCountEl = document.getElementById('crate-bags-seed-count');
const crateBagsMoodSection = document.getElementById('crate-bags-mood-section');
const crateBagsMoodGrid = document.getElementById('crate-bags-mood-grid');
const crateBagsMoodCountEl = document.getElementById('crate-bags-mood-count');
const crateBagsDecadeSection = document.getElementById('crate-bags-decade-section');
const crateBagsDecadeGrid = document.getElementById('crate-bags-decade-grid');
const crateBagsDecadeCountEl = document.getElementById('crate-bags-decade-count');
const crateNewArrivalsSection = document.getElementById('crate-newarrivals-section');
const crateNewArrivalsGrid = document.getElementById('crate-newarrivals-grid');
const cratePlaylistsGrid = document.getElementById('crate-playlists-grid');
const cratePlaylistsStatus = document.getElementById('crate-playlists-status');
const cratesBody = document.querySelector('.crates-body');
// Bag detail (a completion view, opened before a bag/playlist commits to
// the Wall): see KNOWN-DEVIATIONS.md for why bags and playlists get one
// and New arrivals/search/Your Record Bag do not -- those are not a
// stable, named list of albums in the same sense.
const bagDetailView = document.getElementById('bag-detail-view');
const bagDetailBack = document.getElementById('bag-detail-back');
const bagDetailTitle = document.getElementById('bag-detail-title');
const bagDetailBlurb = document.getElementById('bag-detail-blurb');
const bagDetailCount = document.getElementById('bag-detail-count');
const bagDetailPlayBtn = document.getElementById('bag-detail-play');
const bagDetailDeleteBtn = document.getElementById('bag-detail-delete');
const bagDetailStatus = document.getElementById('bag-detail-status');
const bagDetailGrid = document.getElementById('bag-detail-grid');

// Bag builder: creating a new custom record bag (js/bagbuilder.js) -- name
// it, then search Spotify by album or artist name and tap covers to add
// them. A second in-place view over cratesBody, the same pattern
// bagDetailView already uses (hide the shelf overview, show this instead;
// "Back" reverses it), rather than a whole new screen/tab.
const bagBuilderView = document.getElementById('bagbuilder-view');
const bagBuilderBack = document.getElementById('bagbuilder-back');
const bagBuilderNameInput = document.getElementById('bagbuilder-name');
const bagBuilderBlurbInput = document.getElementById('bagbuilder-blurb');
const bagBuilderSearchForm = document.getElementById('bagbuilder-search-form');
const bagBuilderSearchInput = document.getElementById('bagbuilder-search-input');
const bagBuilderSearchStatus = document.getElementById('bagbuilder-search-status');
const bagBuilderResultsGrid = document.getElementById('bagbuilder-results-grid');
const bagBuilderSelectedCountEl = document.getElementById('bagbuilder-selected-count');
const bagBuilderSaveBtn = document.getElementById('bagbuilder-save');

const nearbyShelf = document.getElementById('nearby-shelf');
const playerBarEl = document.getElementById('player-bar');
const wakeConfirmation = document.getElementById('wake-confirmation');

const modalDevice = document.getElementById('modal-device');
const modalDeviceCopy = document.getElementById('modal-device-copy');
const deviceList = document.getElementById('device-list');
const modalDeviceClose = document.getElementById('modal-device-close');

const crackleHint = document.getElementById('crackle-hint');
const btnCrackle = document.getElementById('btn-crackle');

const LS_EVER_DROPPED = 'lp_ever_dropped';

let wallApi = null;
let currentWallPool = []; // raw pool array currently mounted on the Wall; flip.js's list view reads this directly.
let latestViewModel = null;
let pendingEntry = null;
let currentAlbumId = null;
// The full entry for whatever currentAlbumId is currently playing, set
// only once a needle drop actually commits -- NOT the same thing as
// pendingEntry, which is set as soon as a preview opens and stays set even
// if that preview is dismissed without playing. Using pendingEntry for
// "what's currently playing" (an earlier version of both handleRunout()
// and handleResurfaceNowPlaying() did) breaks the moment a listener
// previews a *different* album and then dismisses it while something else
// is still playing: pendingEntry would point at the dismissed album, not
// the one actually still playing. See KNOWN-DEVIATIONS.md.
let currentPlayingEntry = null;
let currentSessionId = null;
let ceremonyBusy = false;
let runoutBusy = false;

// Record bags, playlists, and search (PRD F11/F12): the user's own pool
// ("Your Record Bag") is always available to switch back to; seed bags
// resolve to real Spotify albums lazily, the first time each is actually
// selected; the user's own Spotify playlists (js/playlists.js) work the
// same way. All four sources are mutually exclusive and chosen from the
// Crates screen, not the Wall itself -- selecting any of them crossfades
// the Wall (switchWallPool()) and returns to the Now Playing tab.
let userWallPool = null;
let activeBagId = null;
let activePlaylistId = null;
let activeSearchQuery = null; // { query } | null
let activeNewArrivals = false;
let bagSwitchBusy = false;
// The bag/playlist currently open in bag detail (not necessarily the same
// as activeBagId/activePlaylistId -- browsing a bag's detail view does not
// itself commit it to the Wall, only "Play this bag" or tapping one of its
// covers does). { kind: 'bag'|'playlist', id, name, blurb } | null.
let bagDetailSource = null;
let bagManifestCache = null;
let playlistManifestCache = null; // null until the Crates screen has been opened at least once
let newArrivalsPool = null; // last resolved New arrivals pool, kept for selectNewArrivals()

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
  currentWallPool = pool;
  onWallPoolChanged();
}

/** Label for whatever source is currently on the Wall -- shown on the
 * Crates-screen entry point button and used to build the wall prompt. */
function currentSourceLabel() {
  if (activeSearchQuery) return `Artist: ${activeSearchQuery.query}`;
  if (activeBagId) {
    const bag = (bagManifestCache || []).find((b) => b.id === activeBagId);
    return bag ? bag.name : 'Record bag';
  }
  if (activePlaylistId) {
    const playlist = (playlistManifestCache || []).find((p) => p.id === activePlaylistId);
    return playlist ? playlist.name : 'Playlist';
  }
  if (activeNewArrivals) return 'New arrivals';
  return 'Your Record Bag';
}

function updateCratesBtnLabel() {
  if (cratesBtnLabel) cratesBtnLabel.textContent = currentSourceLabel();
}

function setWallPrompt(pool) {
  const everDropped = localStorage.getItem(LS_EVER_DROPPED) === 'true';
  if (activeSearchQuery || activeBagId || activePlaylistId || activeNewArrivals) {
    wallPrompt.textContent = `${pool.length} records. Tap one to drop the needle.`;
  } else {
    wallPrompt.textContent = everDropped
      ? `Your Record Bag. ${pool.length} records. Tap one to drop the needle.`
      : 'Drop the needle on something.';
  }
  updateCratesBtnLabel();
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

const cratesStatus = document.getElementById('crates-status');
const BAG_PREVIEW_COUNT = 9;
// Populated the first time a bag's preview grid resolves, keyed by bagId,
// so switching back to the Crates screen doesn't wait on resolveBag()'s
// own cache-read again just to redraw a card already shown this tab
// session.
const bagPreviewCache = new Map();

/** The single-image art area of a crate card, or (bag cards only) a 3x3
 * grid of up to 9 mini covers as a preview of what's in the bag. Built via
 * createElement rather than innerHTML since playlist/album art comes
 * straight from Spotify and is untrusted. */
function buildCrateCardArt({ image, images }) {
  if (images && images.length > 0) {
    const grid = document.createElement('div');
    grid.className = 'crate-card-art-grid';
    images.slice(0, BAG_PREVIEW_COUNT).forEach((src) => {
      const img = document.createElement('img');
      img.src = src;
      img.alt = '';
      grid.appendChild(img);
    });
    return grid;
  }
  const art = image ? document.createElement('img') : document.createElement('div');
  art.className = 'crate-card-art';
  if (image) { art.src = image; art.alt = ''; }
  return art;
}

/** A single card in the Crates screen's bag/playlist grids. */
function buildCrateCard({ label, sublabel, image, images, pressed, title, onClick }) {
  const card = document.createElement('button');
  card.type = 'button';
  card.className = 'crate-card';
  card.setAttribute('aria-pressed', String(pressed));
  if (title) card.title = title;

  card.appendChild(buildCrateCardArt({ image, images }));

  const name = document.createElement('span');
  name.className = 'crate-card-name';
  name.textContent = label;
  card.appendChild(name);

  if (sublabel) {
    const meta = document.createElement('span');
    meta.className = 'crate-card-meta';
    meta.textContent = sublabel;
    card.appendChild(meta);
  }

  card.addEventListener('click', onClick);
  return card;
}

/** Replaces a card's art area in place once a bag's preview images are
 * known, without rebuilding the whole card (and losing its aria-pressed
 * state or requiring a fresh click listener). */
function updateCrateCardArt(card, images) {
  const oldArt = card.querySelector('.crate-card-art, .crate-card-art-grid');
  const newArt = buildCrateCardArt({ images });
  if (oldArt) card.replaceChild(newArt, oldArt);
  else card.insertBefore(newArt, card.firstChild);
}

// A bag's own `category` (bags.js's loadBagManifest(), falls back to
// 'seed' for anything missing/unrecognised) picks which shelf it renders
// into. Grid element and its shelf's own <section> (so an empty shelf --
// not expected in practice with 4 mood + 4 decade bags shipped, but
// possible if a bag JSON fails to load) can be hidden, the same
// no-empty-state convention used elsewhere in this app.
const BAG_SHELVES = {
  custom: { grid: () => crateBagsCustomGrid, count: () => null, section: () => null },
  seed: { grid: () => crateBagsSeedGrid, count: () => crateBagsSeedCountEl, section: () => null },
  mood: { grid: () => crateBagsMoodGrid, count: () => crateBagsMoodCountEl, section: () => crateBagsMoodSection },
  decade: { grid: () => crateBagsDecadeGrid, count: () => crateBagsDecadeCountEl, section: () => crateBagsDecadeSection },
};

/** A bag's own playable pool: seed/mood/decade bags resolve their
 * {title, artist} pairs against Spotify lazily (bags.js's resolveBag(),
 * cached there); a custom bag (js/bagbuilder.js) already stores real,
 * previously-selected Spotify album entries directly on `.pool`, so there
 * is nothing to resolve. */
function bagPoolFor(bag) {
  return bag.category === 'custom' ? Promise.resolve(bag.pool) : resolveBag(bag);
}

function renderBagCards() {
  crateBagsCustomGrid.innerHTML = '';
  crateBagsSeedGrid.innerHTML = '';
  crateBagsMoodGrid.innerHTML = '';
  crateBagsDecadeGrid.innerHTML = '';
  const cards = new Map();
  const counts = { custom: 0, seed: 0, mood: 0, decade: 0 };

  for (const bag of bagManifestCache || []) {
    const category = BAG_SHELVES[bag.category] ? bag.category : 'seed';
    const cached = bagPreviewCache.get(bag.id);
    const card = buildCrateCard({
      label: bag.name,
      title: bag.blurb,
      images: cached,
      pressed: !activeSearchQuery && !activePlaylistId && !activeNewArrivals && activeBagId === bag.id,
      onClick: () => openBagDetail({ kind: 'bag', id: bag.id, name: bag.name, blurb: bag.blurb }),
    });
    BAG_SHELVES[category].grid().appendChild(card);
    counts[category] += 1;
    if (!cached) cards.set(bag.id, card);
  }

  for (const [category, { count, section }] of Object.entries(BAG_SHELVES)) {
    const n = counts[category];
    const countEl = count();
    if (countEl) countEl.textContent = `${n} CRATE${n === 1 ? '' : 'S'}`;
    const sectionEl = section();
    if (sectionEl) sectionEl.hidden = n === 0;
  }

  return cards;
}

/** Resolves each bag not already previewed, one at a time rather than all
 * at once -- each bag's own resolution is already throttled internally
 * (bags.js's mapWithConcurrency), but firing all six bags' resolutions in
 * parallel on top of that would still stack into a much larger concurrent
 * burst than a single bag search ever needed, the same class of mistake
 * that caused a live Spotify 429 earlier. Bags already selected once (or
 * previewed in an earlier visit this tab session) resolve instantly from
 * cache, so this only actually waits on genuinely new bags. */
async function loadBagPreviews(bagsToLoad, cardsById) {
  for (const bag of bagsToLoad) {
    const card = cardsById.get(bag.id);
    if (!card) continue;
    let pool;
    try {
      pool = await bagPoolFor(bag);
    } catch {
      continue; // leave this card's blank placeholder; resolveBag() already handles per-album failures silently.
    }
    const images = pool.map((entry) => entry.image).filter(Boolean).slice(0, BAG_PREVIEW_COUNT);
    bagPreviewCache.set(bag.id, images);
    if (images.length > 0) updateCrateCardArt(card, images);
  }
}

function renderPlaylistCards() {
  cratePlaylistsGrid.innerHTML = '';
  for (const playlist of playlistManifestCache || []) {
    cratePlaylistsGrid.appendChild(buildCrateCard({
      label: playlist.name,
      sublabel: `${playlist.trackCount} tracks`,
      image: playlist.image,
      pressed: !activeSearchQuery && !activeBagId && activePlaylistId === playlist.id,
      onClick: () => openBagDetail({ kind: 'playlist', id: playlist.id, name: playlist.name, blurb: null }),
    }));
  }
}

/** Populates the Crates screen. Record bags are cheap (small local JSON)
 * and loaded once and cached; the user's own Spotify playlists are a live
 * API call, so they're only fetched the first time this screen is opened,
 * not eagerly at boot. */
async function renderCratesScreen() {
  cratesYourBagBtn.setAttribute('aria-pressed', String(!activeBagId && !activePlaylistId && !activeSearchQuery && !activeNewArrivals));

  if (!bagManifestCache) {
    let seedBags;
    try {
      seedBags = await loadBagManifest();
    } catch {
      seedBags = [];
    }
    // Custom bags (js/bagbuilder.js) load first: they're already fully
    // resolved (no network round trip, see bagPoolFor() above), and this is
    // the listener's own work, so it leads the shelf order. Kept in sync by
    // hand (not re-read from storage) once this screen has loaded it once --
    // saveBagBuilder() and the bag-detail-delete handler below both splice
    // bagManifestCache directly, the same "load once, then mutate in place"
    // pattern this cache already used for seed bags.
    bagManifestCache = [...loadCustomBags(), ...seedBags];
  }
  const cardsNeedingPreview = renderBagCards();
  if (cardsNeedingPreview.size > 0) {
    const bagsToLoad = (bagManifestCache || []).filter((bag) => cardsNeedingPreview.has(bag.id));
    loadBagPreviews(bagsToLoad, cardsNeedingPreview); // not awaited: the screen shouldn't block on a cold cache resolving several bags.
  }

  loadNewArrivalsCard(); // not awaited: the screen shouldn't block on a followed-artists fetch (may itself be stale-refreshing).

  if (!playlistManifestCache) {
    cratePlaylistsStatus.textContent = 'Loading your playlists.';
    const { playlists, failed } = await loadMyPlaylists();
    if (failed) {
      // Not cached (loadMyPlaylists() itself resets on failure too): the
      // next visit to this screen retries rather than repeating a stale
      // failure until the page is reloaded, e.g. right after reconnecting.
      cratePlaylistsStatus.textContent = 'Could not load your playlists. Check your connection, or check the browser console for a specific error, and try again.';
      renderPlaylistCards();
      return;
    }
    playlistManifestCache = playlists;
  }
  cratePlaylistsStatus.textContent = playlistManifestCache.length === 0 ? 'No playlists found.' : '';
  renderPlaylistCards();
}

/** Resolves (or retrieves the cached) New arrivals pool and shows/hides its
 * card accordingly -- hidden entirely, not shown empty or broken, if
 * GET /me/following failed or the user follows nobody with a recent
 * release (Records nearby's own convention, PRD edge case 10). Refreshes
 * itself on every visit to this screen if the cache has gone stale
 * (newarrivals.js's own 6h TTL), so this can simply be called unconditionally. */
async function loadNewArrivalsCard() {
  const { pool } = await getNewArrivals();
  if (pool.length === 0) {
    newArrivalsPool = null;
    if (crateNewArrivalsSection) crateNewArrivalsSection.hidden = true;
    return;
  }
  newArrivalsPool = pool;
  if (crateNewArrivalsSection) crateNewArrivalsSection.hidden = false;
  renderNewArrivalsCard();
}

function renderNewArrivalsCard() {
  if (!crateNewArrivalsGrid || !newArrivalsPool) return;
  crateNewArrivalsGrid.innerHTML = '';
  const images = newArrivalsPool.map((entry) => entry.image).filter(Boolean).slice(0, BAG_PREVIEW_COUNT);
  crateNewArrivalsGrid.appendChild(buildCrateCard({
    label: 'New arrivals',
    sublabel: `${newArrivalsPool.length} latest releases`,
    title: 'The latest release from each artist you follow',
    images,
    pressed: activeNewArrivals,
    onClick: () => selectNewArrivals(),
  }));
}

async function selectNewArrivals() {
  if (activeNewArrivals && !activeSearchQuery && !activeBagId && !activePlaylistId) { showScreen('app'); return; }
  if (bagSwitchBusy || !newArrivalsPool || newArrivalsPool.length === 0) return;

  cratesStatus.textContent = 'New arrivals. Pulling records from the shelf.';
  activeBagId = null;
  activePlaylistId = null;
  activeSearchQuery = null;
  activeNewArrivals = true;
  await switchWallPool(newArrivalsPool);
  cratesStatus.textContent = '';
  showScreen('app');
}

async function selectBag(bagId) {
  if (bagId === activeBagId && !activeSearchQuery && !activePlaylistId && !activeNewArrivals) { showScreen('app'); return; }
  if (bagSwitchBusy) return;

  if (bagId === null) {
    activeBagId = null;
    activePlaylistId = null;
    activeSearchQuery = null;
    activeNewArrivals = false;
    if (userWallPool) await switchWallPool(userWallPool);
    showScreen('app');
    return;
  }

  const bag = (bagManifestCache || []).find((b) => b.id === bagId);
  if (!bag) return;

  cratesStatus.textContent = `${bag.name}. Pulling records from the shelf.`;
  const pool = await bagPoolFor(bag);
  if (pool.length === 0) {
    cratesStatus.textContent = `Could not resolve any records in ${bag.name} right now.`;
    return;
  }
  cratesStatus.textContent = '';
  activeBagId = bagId;
  activePlaylistId = null;
  activeSearchQuery = null;
  activeNewArrivals = false;
  await switchWallPool(pool);
  showScreen('app');
}

async function selectPlaylist(playlistId) {
  if (playlistId === activePlaylistId && !activeSearchQuery && !activeBagId && !activeNewArrivals) { showScreen('app'); return; }
  if (bagSwitchBusy) return;

  const playlist = (playlistManifestCache || []).find((p) => p.id === playlistId);
  if (!playlist) return;

  cratesStatus.textContent = `${playlist.name}. Pulling records from the crate.`;
  const pool = await resolvePlaylist(playlist);
  if (pool.length === 0) {
    cratesStatus.textContent = `Could not resolve any records in ${playlist.name} right now.`;
    return;
  }
  cratesStatus.textContent = '';
  activePlaylistId = playlistId;
  activeBagId = null;
  activeSearchQuery = null;
  activeNewArrivals = false;
  await switchWallPool(pool);
  showScreen('app');
}

// ---------------------------------------------------------------------
// Bag detail: opening a record bag or playlist card lands here first,
// rather than committing straight to the Wall the way it used to -- a
// completion view over that one bag/playlist's own albums (amber ring on
// played, dimmed on unplayed, same visual as the Wall's own zoom-out; a
// "X of N played" count in deadwax mono). "Play this bag" and tapping any
// individual cover both still end up calling the existing
// selectBag()/selectPlaylist() (no new commit-to-Wall logic, a new entry
// point into it), the same rule this app has followed since Flip and
// Runout groove's own cell clicks. New arrivals, search results, and
// Your Record Bag itself do not get a detail view: none of them is a
// stable, named list of albums in the way a bag/playlist is -- see
// KNOWN-DEVIATIONS.md.
// ---------------------------------------------------------------------

async function resolveBagDetailPool(source) {
  if (source.kind === 'bag') {
    const bag = (bagManifestCache || []).find((b) => b.id === source.id);
    return bag ? bagPoolFor(bag) : [];
  }
  const playlist = (playlistManifestCache || []).find((p) => p.id === source.id);
  return playlist ? resolvePlaylist(playlist) : [];
}

function renderBagDetailGrid(pool, source) {
  const playedAt = journal.lastPlayedAtByAlbum();
  const played = pool.filter((entry) => playedAt.has(entry.id)).length;
  bagDetailCount.textContent = `${played} of ${pool.length} played`;

  bagDetailGrid.innerHTML = '';
  for (const entry of pool) {
    const isPlayed = playedAt.has(entry.id);
    const cover = document.createElement('button');
    cover.type = 'button';
    cover.className = 'bag-detail-cover' + (isPlayed ? ' is-played' : '');
    const label = `${entry.name} by ${entry.artist}, ${isPlayed ? 'played' : 'not yet played'}`;
    cover.setAttribute('aria-label', label);
    cover.title = label;

    const img = document.createElement('img');
    img.alt = '';
    if (entry.image) img.src = entry.image;
    cover.appendChild(img);

    cover.addEventListener('click', () => playBagDetailAlbum(source, entry));
    bagDetailGrid.appendChild(cover);
  }
}

async function openBagDetail(source) {
  bagDetailSource = source;
  hide(cratesBody);
  show(bagDetailView);

  // Only a custom bag (js/bagbuilder.js) can be deleted here -- the six
  // seed bags and mood/decade sets ship as static JSON, and playlists live
  // on Spotify itself, so neither has anything for this app to delete.
  const bagRecord = source.kind === 'bag' ? (bagManifestCache || []).find((b) => b.id === source.id) : null;
  if (bagDetailDeleteBtn) bagDetailDeleteBtn.hidden = bagRecord?.category !== 'custom';

  bagDetailTitle.textContent = source.name;
  if (source.blurb) {
    bagDetailBlurb.textContent = source.blurb;
    show(bagDetailBlurb);
  } else {
    hide(bagDetailBlurb);
  }
  bagDetailCount.textContent = '';
  bagDetailGrid.innerHTML = '';
  bagDetailPlayBtn.disabled = true;
  bagDetailStatus.textContent = 'Pulling records from the shelf.';

  const pool = await resolveBagDetailPool(source);
  if (bagDetailSource !== source) return; // navigated away, or opened something else, while this was resolving.

  if (pool.length === 0) {
    bagDetailStatus.textContent = `Could not resolve any records in ${source.name} right now.`;
    return;
  }
  bagDetailStatus.textContent = '';
  bagDetailPlayBtn.disabled = false;
  renderBagDetailGrid(pool, source);
}

function closeBagDetail() {
  bagDetailSource = null;
  hide(bagDetailView);
  show(cratesBody);
}
bagDetailBack?.addEventListener('click', closeBagDetail);

bagDetailPlayBtn?.addEventListener('click', () => {
  if (!bagDetailSource) return;
  if (bagDetailSource.kind === 'bag') selectBag(bagDetailSource.id);
  else selectPlaylist(bagDetailSource.id);
});

bagDetailDeleteBtn?.addEventListener('click', () => {
  if (!bagDetailSource || bagDetailSource.kind !== 'bag') return;
  const bag = (bagManifestCache || []).find((b) => b.id === bagDetailSource.id);
  if (!bag) return;
  if (!window.confirm(`Delete "${bag.name}"? This cannot be undone.`)) return;

  deleteCustomBag(bag.id);
  bagManifestCache = (bagManifestCache || []).filter((b) => b.id !== bag.id);
  bagPreviewCache.delete(bag.id);
  // Leave the Wall itself untouched even if this bag is the one currently
  // mounted there (activeBagId === bag.id) -- deleting a bag from this
  // list is not the same action as choosing to leave it (selectBag(null)),
  // and forcing a crossfade away from whatever might still be playing
  // would be a surprising side effect of a delete. Only the "currently
  // selected" highlighting on the shelf itself needs to catch up, and it
  // already degrades gracefully (currentSourceLabel() falls back to a
  // generic label once activeBagId no longer resolves to a real bag).
  if (activeBagId === bag.id) activeBagId = null;

  closeBagDetail();
  cratesStatus.textContent = `${bag.name} deleted.`;
  renderBagCards();
});

/** Tapping one cover in the detail grid commits the whole bag/playlist to
 * the Wall (exactly what "Play this bag" does) and then needle-drops that
 * specific album, rather than only the one cover -- needling an album not
 * actually mounted on the Wall would have nowhere real to pan the camera
 * to. setFlipMode('spin') for the same reason Flip's own rows need it: the
 * ceremony animates into the Wall's own container, which Flip mode hides. */
async function playBagDetailAlbum(source, entry) {
  if (bagSwitchBusy) return;
  if (source.kind === 'bag') await selectBag(source.id);
  else await selectPlaylist(source.id);
  setFlipMode('spin');
  handleSelectAlbum(entry);
}

function openCrates() {
  closeBagDetail(); // always land on the shelf overview, not wherever a previous visit left off.
  hide(bagBuilderView);
  show(cratesBody);
  showScreen('crates');
  renderCratesScreen();
}
cratesBtn?.addEventListener('click', openCrates);
tabCrates.addEventListener('click', openCrates);
cratesYourBagBtn?.addEventListener('click', () => selectBag(null));

// ---------------------------------------------------------------------
// Bag builder (js/bagbuilder.js): creating a custom record bag by hand.
// Name it, search Spotify by album or artist name (one free-text query
// matches both, see bagbuilder.js's own header comment), and tap covers to
// add or remove them from the bag, across as many searches as needed --
// selections persist in bagBuilderSelected across a fresh search rather
// than being cleared by it. Saving stores the picked albums' pool entries
// directly (already real, resolved Spotify albums, nothing left to
// resolve) and drops the new bag straight onto the "Bags you've made"
// shelf, the same shape as a seed bag from bagManifestCache's point of
// view (see bagPoolFor() above).
// ---------------------------------------------------------------------

let bagBuilderSelected = new Map(); // id -> pool entry, insertion order preserved (a Map, not a Set of ids, since the entry itself is needed again at save time).

function updateBagBuilderCoverState(cover, entry) {
  const selected = bagBuilderSelected.has(entry.id);
  cover.classList.toggle('is-selected', selected);
  cover.setAttribute('aria-pressed', String(selected));
  const label = `${entry.name} by ${entry.artist}, ${selected ? 'added to this bag' : 'not added'}`;
  cover.setAttribute('aria-label', label);
  cover.title = label;
}

function updateBagBuilderSaveState() {
  const n = bagBuilderSelected.size;
  bagBuilderSelectedCountEl.textContent = n === 1 ? '1 album selected' : `${n} albums selected`;
  bagBuilderSaveBtn.disabled = n === 0 || !bagBuilderNameInput.value.trim();
}

function toggleBagBuilderSelection(entry, cover) {
  if (bagBuilderSelected.has(entry.id)) bagBuilderSelected.delete(entry.id);
  else bagBuilderSelected.set(entry.id, entry);
  updateBagBuilderCoverState(cover, entry);
  updateBagBuilderSaveState();
}

/** One result cover: a toggle button (aria-pressed), not a play button --
 * tapping it adds/removes the album from the bag being built, the same
 * "act on tap, no separate confirm step" interaction bag-detail-cover
 * already uses for a different action. Reuses bag-detail-cover's own CSS
 * (art, img, hover) rather than a new component; `.is-selected` shares
 * `.is-played`'s amber-ring treatment (styles.css) since both mean "this
 * one is already accounted for". */
function buildBagBuilderCover(entry) {
  const cover = document.createElement('button');
  cover.type = 'button';
  cover.className = 'bag-detail-cover';

  const img = document.createElement('img');
  img.alt = '';
  if (entry.image) img.src = entry.image;
  cover.appendChild(img);

  updateBagBuilderCoverState(cover, entry);
  cover.addEventListener('click', () => toggleBagBuilderSelection(entry, cover));
  return cover;
}

async function performBagBuilderSearch(query) {
  const trimmed = query.trim();
  if (!trimmed) return;

  bagBuilderSearchStatus.textContent = `Searching for "${trimmed}".`;
  bagBuilderResultsGrid.innerHTML = '';
  const { items, failed } = await searchCatalog(trimmed);
  if (items.length === 0) {
    bagBuilderSearchStatus.textContent = failed
      ? 'Search failed. Check your connection and try again.'
      : `No albums found for "${trimmed}". Only full albums and EPs of 6 or more tracks are shown.`;
    return;
  }
  bagBuilderSearchStatus.textContent = '';
  for (const entry of items) {
    bagBuilderResultsGrid.appendChild(buildBagBuilderCover(entry));
  }
}

bagBuilderSearchForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  performBagBuilderSearch(bagBuilderSearchInput.value);
  bagBuilderSearchInput.blur();
});

bagBuilderNameInput?.addEventListener('input', updateBagBuilderSaveState);

function openBagBuilder() {
  bagBuilderSelected = new Map();
  bagBuilderNameInput.value = '';
  bagBuilderBlurbInput.value = '';
  bagBuilderSearchInput.value = '';
  bagBuilderResultsGrid.innerHTML = '';
  bagBuilderSearchStatus.textContent = '';
  updateBagBuilderSaveState();
  hide(cratesBody);
  show(bagBuilderView);
  bagBuilderNameInput.focus();
}
crateCreateBagBtn?.addEventListener('click', openBagBuilder);

function closeBagBuilder() {
  const hasWork = bagBuilderSelected.size > 0 || bagBuilderNameInput.value.trim();
  if (hasWork && !window.confirm('Discard this record bag? Your selections will be lost.')) return;
  hide(bagBuilderView);
  show(cratesBody);
}
bagBuilderBack?.addEventListener('click', closeBagBuilder);

function saveBagBuilder() {
  const name = bagBuilderNameInput.value.trim();
  if (!name || bagBuilderSelected.size === 0) return; // save is disabled in this case; defensive only.

  const bag = createCustomBag({ name, blurb: bagBuilderBlurbInput.value, albums: Array.from(bagBuilderSelected.values()) });
  bagManifestCache = [bag, ...(bagManifestCache || [])];
  bagPreviewCache.set(bag.id, bag.pool.map((entry) => entry.image).filter(Boolean).slice(0, BAG_PREVIEW_COUNT));

  hide(bagBuilderView);
  show(cratesBody);
  cratesStatus.textContent = `${name} saved to your record bags.`;
  announce(`${name} saved to your record bags.`);
  renderBagCards();
}
bagBuilderSaveBtn?.addEventListener('click', saveBagBuilder);

// ---------------------------------------------------------------------
// Search: by artist only. Genre search was removed entirely (it used to
// live here as a mode toggle alongside this) after live testing found it
// returning wrong results for real genre terms -- "African music" and
// "Brazilian" both came back with generically popular, unrelated artists.
// See search.js's own header comment and KNOWN-DEVIATIONS.md for the full
// history. Lives on the Crates screen alongside record bags and playlists,
// and shares the same switchWallPool() crossfade they use.
// ---------------------------------------------------------------------

const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');

async function performSearch(query) {
  if (bagSwitchBusy) return;
  const trimmed = query.trim();
  if (!trimmed) return;

  cratesStatus.textContent = `Searching for "${trimmed}".`;
  const { pool, failed } = await searchAlbums(trimmed);
  if (pool.length === 0) {
    cratesStatus.textContent = failed
      ? `Search failed. Check your connection and try again.`
      : `No albums found for "${trimmed}". Only full albums and EPs of 6 or more tracks are shown.`;
    return;
  }
  cratesStatus.textContent = '';
  activeBagId = null;
  activePlaylistId = null;
  activeNewArrivals = false;
  activeSearchQuery = { query: trimmed };
  await switchWallPool(pool);
  showScreen('app');
}

searchForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  performSearch(searchInput.value);
  searchInput.blur(); // dismiss the on-screen keyboard on mobile once submitted.
});

// ---------------------------------------------------------------------
// Flip (INCREMENT-03 Phase 1): a searchable, sortable list view over the
// same pool currently mounted on the Wall, swapped in over the dome rather
// than replacing it (no wall.js remount). Mode and sort choice are display
// preferences, persisted independently of whatever pool happens to be
// mounted; genre data is resolved once per pool (see onWallPoolChanged())
// and re-filtered/sorted locally after that, no further network calls.
// ---------------------------------------------------------------------

const modeToggle = document.getElementById('mode-toggle');
const btnModeSpin = document.getElementById('btn-mode-spin');
const btnModeFlip = document.getElementById('btn-mode-flip');
const flipView = document.getElementById('flip-view');
const flipSearchInput = document.getElementById('flip-search');
const flipSortChips = document.getElementById('flip-sort-chips');
const flipShowChips = document.getElementById('flip-show-chips');
const flipListEl = document.getElementById('flip-list');

const LS_FLIP_MODE = 'lp_flip_mode';
const LS_FLIP_SORT = 'lp_flip_sort';
const LS_FLIP_SHOW = 'lp_flip_show';

let flipMode = localStorage.getItem(LS_FLIP_MODE) === 'flip' ? 'flip' : 'spin';
let flipSort = Object.values(flip.SORT_MODES).includes(localStorage.getItem(LS_FLIP_SORT)) ? localStorage.getItem(LS_FLIP_SORT) : flip.SORT_MODES.ALPHA;
let flipShow = Object.values(flip.SHOW_MODES).includes(localStorage.getItem(LS_FLIP_SHOW)) ? localStorage.getItem(LS_FLIP_SHOW) : flip.SHOW_MODES.ALL;
let flipQuery = '';
let flipGenrePool = null; // currentWallPool, augmented with .genre, once resolved; null until resolveGenres() finishes for this pool.
let flipGenrePoolFor = null; // which pool (by reference) flipGenrePool was resolved from, so a pool switch invalidates it.

/**
 * Kicks off flip.resolveGenres() for `pool` if it isn't already resolved
 * (or resolving), a no-op otherwise. Automates genre fetching (Flip's
 * genre sort/filter, Runout groove's genre-based directions) so it starts
 * as soon as a pool is mounted rather than waiting for the listener to
 * open Flip first -- by the time either is actually used, most of the
 * pool's artists are typically already resolved and cached. Safe to call
 * from more than one place (onWallPoolChanged() and renderFlipList() both
 * do) since flipGenrePoolFor guards against starting a second resolution
 * for the same pool while one is already in flight.
 */
function ensurePoolGenresResolving(pool) {
  if (flipGenrePoolFor === pool) return;
  flipGenrePoolFor = pool;
  flip.resolveGenres(pool).then((resolved) => {
    if (flipGenrePoolFor !== pool) return; // pool changed again while this was in flight.
    flipGenrePool = resolved;
    if (flipMode === 'flip') renderFlipList();
  });
}

/** Called whenever a new pool is mounted on the Wall (renderWallDom()):
 * genre resolution is per-pool, so a switch invalidates whatever was
 * previously resolved and starts a fresh one in the background regardless
 * of which view mode is currently active; Flip's list (if it is the
 * visible mode) is also re-rendered immediately against the new pool
 * (with genre absent until the background resolution above lands). */
function onWallPoolChanged() {
  flipGenrePool = null;
  flipGenrePoolFor = null;
  ensurePoolGenresResolving(currentWallPool);
  if (flipMode === 'flip') renderFlipList();
}

function setFlipMode(mode) {
  flipMode = mode;
  localStorage.setItem(LS_FLIP_MODE, mode);
  btnModeSpin.setAttribute('aria-pressed', String(mode === 'spin'));
  btnModeFlip.setAttribute('aria-pressed', String(mode === 'flip'));
  if (mode === 'flip') {
    hide(wallViewport);
    show(flipView);
    renderFlipList();
  } else {
    show(wallViewport);
    hide(flipView);
  }
}
btnModeSpin?.addEventListener('click', () => setFlipMode('spin'));
btnModeFlip?.addEventListener('click', () => setFlipMode('flip'));

function setFlipSort(mode) {
  flipSort = mode;
  localStorage.setItem(LS_FLIP_SORT, mode);
  flipSortChips?.querySelectorAll('.chip').forEach((chip) => {
    chip.setAttribute('aria-pressed', String(chip.dataset.sort === mode));
  });
  renderFlipList();
}
flipSortChips?.addEventListener('click', (e) => {
  const chip = e.target.closest('[data-sort]');
  if (chip) setFlipSort(chip.dataset.sort);
});

function setFlipShow(show) {
  flipShow = show;
  localStorage.setItem(LS_FLIP_SHOW, show);
  flipShowChips?.querySelectorAll('.chip').forEach((chip) => {
    chip.setAttribute('aria-pressed', String(chip.dataset.show === show));
  });
  renderFlipList();
}
flipShowChips?.addEventListener('click', (e) => {
  const chip = e.target.closest('[data-show]');
  if (chip) setFlipShow(chip.dataset.show);
});

flipSearchInput?.addEventListener('input', () => {
  flipQuery = flipSearchInput.value;
  renderFlipList();
});

// Restore the persisted display preferences immediately: harmless before
// enterApp() ever mounts a pool (#screen-app itself stays hidden until
// then), and means a listener who left the app in Flip mode sees Flip
// again on their next visit rather than always starting on Spin. Only the
// chips' own aria-pressed state needs a manual sync here; flipSort/flipShow
// themselves were already read from localStorage above and renderFlipList()
// (called by setFlipMode() when applicable) already sorts/filters by them.
flipSortChips?.querySelectorAll('.chip').forEach((chip) => {
  chip.setAttribute('aria-pressed', String(chip.dataset.sort === flipSort));
});
flipShowChips?.querySelectorAll('.chip').forEach((chip) => {
  chip.setAttribute('aria-pressed', String(chip.dataset.show === flipShow));
});
setFlipMode(flipMode);

function flipRowDeadwax(entry) {
  const year = (entry.releaseDate || '').slice(0, 4);
  return [entry.genre || year || null].filter(Boolean).join(' · ');
}

/** One row: small cover, artist, title, deadwax genre/year line. Tapping it
 * calls the exact same handler Wall tile taps already use -- no new
 * interaction code, just a new entry point into it (per explicit
 * instruction). */
function buildFlipRow(entry) {
  const row = document.createElement('button');
  row.type = 'button';
  row.className = 'flip-row';

  const cover = document.createElement('img');
  cover.className = 'flip-row-cover';
  cover.alt = '';
  if (entry.image) cover.src = entry.image;
  row.appendChild(cover);

  const meta = document.createElement('div');
  meta.className = 'flip-meta';
  const artist = document.createElement('div');
  artist.className = 'flip-artist';
  artist.textContent = entry.artist;
  const title = document.createElement('div');
  title.className = 'flip-album';
  title.textContent = entry.name;
  meta.append(artist, title);
  row.appendChild(meta);

  const dw = document.createElement('div');
  dw.className = 'flip-deadwax';
  dw.textContent = flipRowDeadwax(entry);
  row.appendChild(dw);

  row.addEventListener('click', () => {
    // The ceremony needs the dome's own container visible to animate into
    // (it appends its layer inside #wall-viewport, which Flip mode hides
    // entirely) -- without switching back first, the whole preview
    // (including its Play button) renders inside a display:none ancestor:
    // present in the DOM, completely invisible and unclickable, so the
    // ceremony just sits there waiting for a Play press that can never
    // happen. Switch back to Spin first, exactly like Runout groove's
    // cells switch back to Now Playing before doing the same thing.
    setFlipMode('spin');
    handleSelectAlbum(entry);
  });
  return row;
}

async function renderFlipList() {
  if (!flipListEl) return;

  // Genre data isn't on pool entries by default (see flip.js); resolution
  // normally already started in the background as soon as this pool was
  // mounted (onWallPoolChanged()'s own ensurePoolGenresResolving() call),
  // but this covers the case of switching to Flip mid-resolution or before
  // it has ever started. filterPool()/sortPool() themselves run
  // synchronously against whatever is available in the meantime
  // (unresolved entries simply don't match/group on genre yet), so the
  // list is never blank while this is in flight.
  ensurePoolGenresResolving(currentWallPool);

  const pool = flipGenrePool || currentWallPool;
  const playedAt = journal.lastPlayedAtByAlbum();
  // Search, then Show (what's included), then Sort (how it's ordered) --
  // three independent steps now, not one chip row standing in for two of
  // them. filterByPlayed() only ever removes entries; sortPool() only
  // ever reorders them (see flip.js's own comments on each).
  const searched = flip.filterPool(pool, flipQuery);
  const shown = flip.filterByPlayed(searched, flipShow, { playedAt });
  const sorted = flip.sortPool(shown, flipSort, { playedAt });

  flipListEl.innerHTML = '';

  if (sorted.length === 0) {
    const empty = document.createElement('p');
    empty.className = 'flip-empty';
    let message = 'Nothing here yet.';
    if (flipQuery.trim()) message = 'Nothing in the crate matches that.';
    else if (flipShow === flip.SHOW_MODES.LISTENED) message = "You haven't listened to anything here yet.";
    else if (flipShow === flip.SHOW_MODES.UNPLAYED) message = "You've listened to everything here.";
    empty.textContent = message;
    flipListEl.appendChild(empty);
    return;
  }

  let lastGroupKey = undefined;
  for (const entry of sorted) {
    const groupKey = flip.groupKeyFor(entry, flipSort);
    if (groupKey !== null && groupKey !== lastGroupKey) {
      const header = document.createElement('div');
      header.className = 'flip-letter-head';
      header.textContent = groupKey;
      flipListEl.appendChild(header);
      lastGroupKey = groupKey;
    }
    flipListEl.appendChild(buildFlipRow(entry));
  }
}

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
    currentPlayingEntry = entry;
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
    } else if (err instanceof playback.NoActiveDeviceError) {
      wallPrompt.textContent = 'Choose where Longplayur should play.';
      openDeviceModal(err.devices);
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
    currentPlayingEntry = entry;
    localStorage.setItem(LS_EVER_DROPPED, 'true');
    const durationMs = playback.getCurrentContext()?.totalDurationMs ?? null;
    const { session, sessionOrdinal } = journal.recordNeedleDrop(entry, { durationMs });
    currentSessionId = session.id;
    wallPrompt.textContent = `Session ${sessionOrdinal} · now playing`;
  } catch (err) {
    if (err instanceof SpotifyApiError && err.status === 403) {
      wallApi.markUnavailable(entry.id);
      wallPrompt.textContent = "Spotify won't play this one here. Pick another record.";
    } else if (err instanceof playback.NoActiveDeviceError) {
      wallPrompt.textContent = 'Choose where Longplayur should play.';
      openDeviceModal(err.devices);
    } else {
      wallPrompt.textContent = describeSpotifyError(err);
    }
  } finally {
    ceremonyBusy = false;
  }
}

// ---------------------------------------------------------------------
// Runout groove (INCREMENT-03 Phase 3): the default next step after an
// album finishes, replacing the old immediate zoomToFitAll(). Reached only
// from here, never from the tab bar; "Browse the full wall instead" is the
// one manual way back to the original, unchanged behaviour.
// ---------------------------------------------------------------------

const runoutSourceCover = document.getElementById('runout-source-cover');
const runoutSourceName = document.getElementById('runout-source-name');
const runoutSourceDeadwax = document.getElementById('runout-source-deadwax');
const runoutStatus = document.getElementById('runout-status');
const runoutGridEl = document.getElementById('runout-grid');
const runoutBrowseWallBtn = document.getElementById('runout-browse-wall');

function runoutSourceDeadwaxLine(entry) {
  const year = (entry.releaseDate || '').slice(0, 4);
  const parts = [entry.artist, year, entry.totalTracks ? `${entry.totalTracks} tracks` : null].filter(Boolean);
  return parts.join(' · ');
}

function buildRunoutCell({ direction, entry, wildcard }) {
  const cell = document.createElement('button');
  cell.type = 'button';
  cell.className = 'runout-cell' + (wildcard ? ' wildcard' : '');

  const cover = document.createElement('img');
  cover.className = 'runout-cell-cover';
  cover.alt = '';
  if (entry.image) cover.src = entry.image;
  cell.appendChild(cover);

  const label = document.createElement('div');
  label.className = 'runout-label';
  const dir = document.createElement('div');
  dir.className = 'runout-direction';
  dir.textContent = direction;
  const pick = document.createElement('div');
  pick.className = 'runout-pick';
  pick.textContent = entry.name;
  const artist = document.createElement('div');
  artist.className = 'runout-artist';
  artist.textContent = entry.artist;
  label.append(dir, pick, artist);
  cell.appendChild(label);

  cell.addEventListener('click', () => {
    // The ceremony needs the Wall visible to animate into (it operates on
    // wallApi/wallViewport, which #screen-runout doesn't show) -- switch
    // back to Now Playing first, exactly as if this cover had been tapped
    // there. Everything downstream is the Wall's ordinary selection flow;
    // this is a new entry point into it, not new interaction code.
    showScreen('app');
    // Tags this play as chosen from Runout, alongside (not instead of)
    // whatever bagId/playlistId the entry's own data already carries.
    handleSelectAlbum({ ...entry, source: 'runout' });
  });

  return cell;
}

/** Gathers this album's nine (or fewer) directions and renders them, per
 * the fallback rule: never padded, shrinks to however many can be honestly
 * filled. Direction 9 always fills, so this never renders a genuinely
 * empty grid in practice, but the empty-state copy exists defensively. */
async function showRunoutScreen(finishedEntry) {
  runoutSourceCover.src = finishedEntry.image || '';
  runoutSourceName.textContent = finishedEntry.name;
  runoutSourceDeadwax.textContent = runoutSourceDeadwaxLine(finishedEntry);
  runoutGridEl.innerHTML = '';
  runoutStatus.textContent = 'Pulling a few more records from the shelf.';
  showScreen('runout');

  const poolSourceType = (activeBagId || activePlaylistId || activeSearchQuery || activeNewArrivals) ? 'other' : 'own';

  let cells = [];
  try {
    const context = await gatherRunoutContext(finishedEntry, { currentPool: currentWallPool, poolSourceType });
    cells = buildRunoutGrid(context);
  } catch (err) {
    console.error('[runout] failed to build the runout grid:', err);
  }

  runoutStatus.textContent = '';
  if (cells.length === 0) {
    // Not expected in practice ("Play it again" always fills), but a
    // genuine error above (e.g. every network call failing at once) could
    // still leave this empty; degrade honestly rather than showing a blank
    // grid with no explanation.
    runoutStatus.textContent = 'Nothing to suggest right now.';
    return;
  }

  announce("The session isn't over. Choose the next record.");
  cells.forEach((cell) => runoutGridEl.appendChild(buildRunoutCell(cell)));
}

runoutBrowseWallBtn?.addEventListener('click', () => {
  showScreen('app');
  wallApi?.zoomToFitAll({ animate: true });
});

async function handleRunout() {
  if (runoutBusy || !currentAlbumId) return;
  runoutBusy = true;
  const finishedId = currentAlbumId;
  // currentPlayingEntry (set only once a needle drop actually commits,
  // never by a merely-previewed-then-dismissed album -- see its own
  // definition) holds the full entry for whatever just finished,
  // regardless of whether that album is present in whatever pool is
  // currently mounted (e.g. it was dropped from Records nearby, or from
  // this very screen on a previous runout) -- more reliable than
  // wallApi.getEntry(), which only knows about the currently-mounted
  // pool's own membership.
  const finishedEntry = currentPlayingEntry && currentPlayingEntry.id === finishedId ? currentPlayingEntry : null;
  currentAlbumId = null;
  currentPlayingEntry = null;
  try {
    // Explicitly pause: Spotify's own account-level Autoplay setting (if
    // the listener has it on) would otherwise start playing something
    // unrelated the moment the album's context runs out, which defeats
    // the "you must choose the next record" experience this app is for.
    await playback.togglePlayPause(true).catch(() => {});
    await runoutGroove(finishedId, { wallApi });
    if (finishedEntry) {
      await showRunoutScreen(finishedEntry);
    } else {
      // Should not normally happen -- every played album's entry is known
      // via currentPlayingEntry -- but degrade to the always-available
      // fallback rather than show a Runout screen with nothing to build it from.
      wallApi.zoomToFitAll({ animate: true });
    }
  } finally {
    runoutBusy = false;
  }
}

/**
 * The Web Media Session API is the only way a page tells the OS what is
 * actually playing -- without it, a Bluetooth speaker/car head unit, a
 * lock screen, or a hardware media key has nothing to show beyond the
 * page/tab's own generic identity ("Longplayur"), which is exactly what
 * was reported live. Longplayur never had any `navigator.mediaSession`
 * code at all until now: this sets real per-track metadata on every
 * player-bar update, and (once, at boot -- see below) action handlers so
 * play/pause/skip from a Bluetooth remote, a car's steering-wheel
 * controls, or a hardware media key route to the exact same functions the
 * on-screen transport buttons already call.
 */
function updateMediaSessionMetadata(viewModel) {
  if (!('mediaSession' in navigator)) return;
  navigator.mediaSession.metadata = new MediaMetadata({
    title: viewModel.trackName || '',
    artist: viewModel.artistName || '',
    album: viewModel.albumName || '',
    artwork: viewModel.albumArt ? [{ src: viewModel.albumArt, sizes: '300x300', type: 'image/jpeg' }] : [],
  });
  navigator.mediaSession.playbackState = viewModel.isPlaying ? 'playing' : 'paused';
}

function updatePlayerBar(viewModel) {
  latestViewModel = viewModel;
  show(playerBarEl);
  transportApi.update(viewModel);
  updateMediaSessionMetadata(viewModel);

  if (currentAlbumId) updateTonearmProgress(currentAlbumId, viewModel.elapsedMs || 0, viewModel.totalMs || 0);

  announce(`Now playing ${viewModel.albumName} by ${viewModel.artistName}`);
}

// Registered once, not per update: unlike metadata (which changes every
// track), these handlers are the same function for the whole session.
// 'play'/'pause' call togglePlayPause() with the state we want to move
// *away* from, rather than routing through the on-screen button's own
// toggle-off-current-state handler -- a hardware "play" press means
// "start playing" unconditionally, not "flip whatever it currently is".
if ('mediaSession' in navigator) {
  navigator.mediaSession.setActionHandler('play', () => playback.togglePlayPause(false));
  navigator.mediaSession.setActionHandler('pause', () => playback.togglePlayPause(true));
  navigator.mediaSession.setActionHandler('previoustrack', () => playback.skipPrevious());
  navigator.mediaSession.setActionHandler('nexttrack', () => playback.skipNext());
}

/**
 * Tapping the player bar's small album art brings the enlarged "now
 * playing" hero cover back to the foreground, wherever it has settled to
 * (dragging the gallery leaves it as a small per-cell disc; switching to
 * Flip, Crates, Past sessions, or Runout groove leaves the Wall itself out
 * of view entirely) -- per explicit request, tapping it should resurface
 * the main graphic rather than doing nothing.
 */
async function handleResurfaceNowPlaying() {
  if (ceremonyBusy || !currentAlbumId || !wallApi) return;
  // currentPlayingEntry (set only once a needle drop actually commits)
  // reliably holds the full entry for whatever is currently playing,
  // regardless of whether that album is present in whatever pool happens
  // to be mounted right now -- the same reasoning handleRunout() relies on
  // it for. pendingEntry is NOT a safe substitute here: it is also set the
  // moment any preview opens, even one the listener goes on to dismiss
  // without playing, which would point this at the wrong album entirely
  // while something else keeps actually playing.
  const entry = currentPlayingEntry && currentPlayingEntry.id === currentAlbumId ? currentPlayingEntry : null;
  if (!entry) return;

  ceremonyBusy = true;
  try {
    cancelSelectionPreview(); // drop any unrelated selection preview the listener has open elsewhere.
    if (flipMode === 'flip') setFlipMode('spin'); // the ceremony needs the dome's own container visible to animate into.
    showScreen('app');
    await resurfaceNowPlaying(entry, { wallApi, wallViewportEl: wallViewport });
  } finally {
    ceremonyBusy = false;
  }
}
async function handlePlayPauseClick() {
  if (!latestViewModel) return;
  await playback.togglePlayPause(latestViewModel.isPlaying);
}

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
const pastSessionsStreak = document.getElementById('past-sessions-streak');
const btnClosePastSessions = document.getElementById('btn-close-past-sessions');
const btnNewSession = document.getElementById('btn-new-session');

// By session (the chronological log above) vs By album (every album ever
// played, deduplicated, sortable) -- same toggle pattern as Spin/Flip:
// two lenses on one screen, not a second tab. See KNOWN-DEVIATIONS.md.
const btnSessionsModeLog = document.getElementById('btn-sessions-mode-log');
const btnSessionsModeAlbums = document.getElementById('btn-sessions-mode-albums');
const sessionsAlbumsView = document.getElementById('sessions-albums-view');
const sessionsAlbumSearch = document.getElementById('sessions-album-search');
const sessionsAlbumSortChips = document.getElementById('sessions-album-sort-chips');
const sessionsAlbumListEl = document.getElementById('sessions-album-list');

const LS_SESSIONS_MODE = 'lp_sessions_mode';
const LS_SESSIONS_ALBUM_SORT = 'lp_sessions_album_sort';
const SESSIONS_ALBUM_SORT_MODES = ['recent', 'alpha', 'genre', 'most-played'];

let sessionsMode = localStorage.getItem(LS_SESSIONS_MODE) === 'albums' ? 'albums' : 'log';
let sessionsAlbumSort = SESSIONS_ALBUM_SORT_MODES.includes(localStorage.getItem(LS_SESSIONS_ALBUM_SORT)) ? localStorage.getItem(LS_SESSIONS_ALBUM_SORT) : 'recent';
let sessionsAlbumQuery = '';
// Genre isn't stored on a journal entry (it lives on the artist, resolved
// lazily, same as everywhere else genre is used in this app); this is a
// persistent albumId -> genre map, filled in incrementally by
// flip.resolveGenres() -- reusing Flip's own resolver and its own
// underlying cache (ceremony.js's artistGenreCache, 30-day localStorage),
// not a second genre-fetching path. A plain Map rather than caching whole
// resolved arrays, so a newly-played album since the last resolution just
// needs its own entry filled in, not a full re-resolve.
const sessionsAlbumGenreByAlbumId = new Map();
let sessionsAlbumGenreResolving = false;

function openPastSessions() {
  renderPastSessions();
  if (sessionsMode === 'albums') renderSessionAlbums();
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
// Top tab navigation (Now playing / Record bags / Past sessions / Setup), shown once connected
// ---------------------------------------------------------------------

tabWall.addEventListener('click', () => showScreen('app'));
tabCrates.addEventListener('click', openCrates);
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

function renderPastSessionsStreak() {
  if (!pastSessionsStreak) return;
  const streak = journal.currentStreakDays();
  if (streak >= 2) {
    pastSessionsStreak.textContent = `${streak} DAY STREAK`;
    pastSessionsStreak.hidden = false;
  } else {
    pastSessionsStreak.hidden = true;
  }
}

function renderPastSessions() {
  const sessions = journal.getSessionsNewestFirst();
  const lifetimeCount = journal.getLifetimeSessionCount();
  pastSessionsList.innerHTML = '';
  renderPastSessionsStreak();

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

// ---------------------------------------------------------------------
// By album: every album ever played through Longplayur, deduplicated,
// searchable and sortable, built entirely on journal.js's existing
// lifetime history (playedEntriesNewestFirst()/lastPlayedAtByAlbum()/
// playCountsByAlbum()) -- no second played-state store, same rule Flip's
// own build already set. Rows reuse Flip's row/letter-head/empty-state
// classes verbatim (.flip-row, .flip-letter-head, .flip-list, .flip-empty):
// this is the same kind of list, just fed from what you've played rather
// than whatever pool is currently on the Wall.
// ---------------------------------------------------------------------

function setSessionsMode(mode) {
  sessionsMode = mode;
  localStorage.setItem(LS_SESSIONS_MODE, mode);
  btnSessionsModeLog?.setAttribute('aria-pressed', String(mode === 'log'));
  btnSessionsModeAlbums?.setAttribute('aria-pressed', String(mode === 'albums'));
  if (mode === 'albums') {
    hide(pastSessionsList);
    show(sessionsAlbumsView);
    renderSessionAlbums();
  } else {
    show(pastSessionsList);
    hide(sessionsAlbumsView);
  }
}
btnSessionsModeLog?.addEventListener('click', () => setSessionsMode('log'));
btnSessionsModeAlbums?.addEventListener('click', () => setSessionsMode('albums'));
// Restored immediately, same reasoning as Flip's own mode/sort restore
// below: harmless before enterApp() ever mounts anything, and a listener
// who left this screen on By album sees By album again next time.
setSessionsMode(sessionsMode);

function setSessionsAlbumSort(mode) {
  sessionsAlbumSort = mode;
  localStorage.setItem(LS_SESSIONS_ALBUM_SORT, mode);
  sessionsAlbumSortChips?.querySelectorAll('.chip').forEach((chip) => {
    chip.setAttribute('aria-pressed', String(chip.dataset.sort === mode));
  });
  renderSessionAlbums();
}
sessionsAlbumSortChips?.addEventListener('click', (e) => {
  const chip = e.target.closest('[data-sort]');
  if (chip) setSessionsAlbumSort(chip.dataset.sort);
});
sessionsAlbumSortChips?.querySelectorAll('.chip').forEach((chip) => {
  chip.setAttribute('aria-pressed', String(chip.dataset.sort === sessionsAlbumSort));
});

sessionsAlbumSearch?.addEventListener('input', () => {
  sessionsAlbumQuery = sessionsAlbumSearch.value;
  renderSessionAlbums();
});

/** 'recent'/'alpha'/'genre' delegate straight to flip.js's own sortPool()
 * (the data shape matches exactly, once genre is augmented on -- see
 * ensureSessionAlbumGenresResolving()); 'most-played' is local to this
 * view -- play frequency isn't a concept Flip's own pool sorting needs,
 * so it doesn't belong in flip.js's exported SORT_MODES. */
function sortSessionAlbums(entries, mode, context) {
  if (mode === 'alpha') return flip.sortPool(entries, flip.SORT_MODES.ALPHA);
  if (mode === 'genre') return flip.sortPool(entries, flip.SORT_MODES.GENRE);
  if (mode === 'most-played') {
    return [...entries].sort((a, b) =>
      (context.playCounts.get(b.id) || 0) - (context.playCounts.get(a.id) || 0) ||
      (context.playedAt.get(b.id) || 0) - (context.playedAt.get(a.id) || 0)
    );
  }
  return flip.sortPool(entries, flip.SORT_MODES.RECENT, context); // default 'recent'
}

/** Resolves genre for whichever of `entries` don't already have one
 * cached in sessionsAlbumGenreByAlbumId, in the background, then
 * re-renders once done -- the list is never blocked on this, it just
 * shows "Unknown" for anything not yet resolved (same convention as
 * Flip). Guarded against overlapping calls the same way Flip's own
 * ensurePoolGenresResolving() is. */
function ensureSessionAlbumGenresResolving(entries) {
  if (sessionsAlbumGenreResolving) return;
  const unresolved = entries.filter((e) => !sessionsAlbumGenreByAlbumId.has(e.id));
  if (unresolved.length === 0) return;
  sessionsAlbumGenreResolving = true;
  flip.resolveGenres(unresolved).then((resolved) => {
    sessionsAlbumGenreResolving = false;
    for (const entry of resolved) sessionsAlbumGenreByAlbumId.set(entry.id, entry.genre);
    if (sessionsMode === 'albums') renderSessionAlbums();
  });
}

function sessionAlbumDeadwax(entry, { playCounts, playedAt }) {
  const count = playCounts.get(entry.id) || 0;
  const plays = `${count} play${count === 1 ? '' : 's'}`;
  const last = playedAt.get(entry.id);
  return [plays, last ? `last ${formatDeadwaxDate(last)}` : null].filter(Boolean).join(' · ');
}

/** Tapping a row needle-drops it directly -- the same handler Wall/Flip
 * rows already use, a new entry point into it rather than new interaction
 * code. showScreen('app') and setFlipMode('spin') are both needed: this
 * screen is not #screen-app at all, and the ceremony needs the Wall's own
 * container visible to animate into (the exact failure Flip's own rows
 * hit before that fix -- see KNOWN-DEVIATIONS.md). */
function buildSessionAlbumRow(entry, context) {
  const row = document.createElement('button');
  row.type = 'button';
  row.className = 'flip-row';

  const cover = document.createElement('img');
  cover.className = 'flip-row-cover';
  cover.alt = '';
  if (entry.image) cover.src = entry.image;
  row.appendChild(cover);

  const meta = document.createElement('div');
  meta.className = 'flip-meta';
  const artist = document.createElement('div');
  artist.className = 'flip-artist';
  artist.textContent = entry.artist;
  const title = document.createElement('div');
  title.className = 'flip-album';
  title.textContent = entry.name;
  meta.append(artist, title);
  row.appendChild(meta);

  const dw = document.createElement('div');
  dw.className = 'flip-deadwax';
  dw.textContent = sessionAlbumDeadwax(entry, context);
  row.appendChild(dw);

  row.addEventListener('click', () => {
    showScreen('app');
    setFlipMode('spin');
    handleSelectAlbum(entry);
  });
  return row;
}

function renderSessionAlbums() {
  if (!sessionsAlbumListEl) return;

  const played = journal.playedEntriesNewestFirst();
  if (sessionsAlbumSort === 'genre') ensureSessionAlbumGenresResolving(played);
  const all = played.map((e) => ({ ...e, genre: sessionsAlbumGenreByAlbumId.get(e.id) ?? null }));
  const context = { playedAt: journal.lastPlayedAtByAlbum(), playCounts: journal.playCountsByAlbum() };
  const filtered = flip.filterPool(all, sessionsAlbumQuery);
  const sorted = sortSessionAlbums(filtered, sessionsAlbumSort, context);

  sessionsAlbumListEl.innerHTML = '';

  if (sorted.length === 0) {
    const empty = document.createElement('p');
    empty.className = 'flip-empty';
    empty.textContent = sessionsAlbumQuery.trim()
      ? 'Nothing you have played matches that.'
      : 'Nothing here yet. Your first needle drop will show up here.';
    sessionsAlbumListEl.appendChild(empty);
    return;
  }

  const groupSortMode = flip.SORT_MODES[sessionsAlbumSort.toUpperCase()]; // undefined for 'most-played', which has no natural grouping, same as Flip's own 'recent'.
  let lastGroupKey;
  for (const entry of sorted) {
    const groupKey = groupSortMode ? flip.groupKeyFor(entry, groupSortMode) : null;
    if (groupKey !== null && groupKey !== lastGroupKey) {
      const header = document.createElement('div');
      header.className = 'flip-letter-head';
      header.textContent = groupKey;
      sessionsAlbumListEl.appendChild(header);
      lastGroupKey = groupKey;
    }
    sessionsAlbumListEl.appendChild(buildSessionAlbumRow(entry, context));
  }
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

// Keeper / spin again / pass (INCREMENT-02 Phase 2): a personal tag on one
// played album within one session, mutually exclusive, tapping the active
// one again clears it. Feeds albums.js's pool scoring on the next Wall
// build; see journal.js's setEntryTag()/latestTagsByAlbum().
const ENTRY_TAG_SPECS = [
  { tag: journal.ENTRY_TAGS.KEEPER, icon: 'icon-keeper', label: 'keeper' },
  { tag: journal.ENTRY_TAGS.SPIN_AGAIN, icon: 'icon-repeat', label: 'spin again' },
  { tag: journal.ENTRY_TAGS.PASS, icon: 'icon-pass', label: 'pass' },
];

/** Three small icon buttons (keeper/spin again/pass) for one played album.
 * Updates the journal and mutates `entry.tag` locally in place, so the
 * buttons' own aria-pressed states stay in sync without a full
 * renderPastSessions() re-render, which would otherwise collapse whichever
 * session rows the listener currently has expanded. */
function buildEntryTagButtons(session, entry) {
  const wrap = document.createElement('div');
  wrap.className = 'entry-tag-buttons';

  const buttons = ENTRY_TAG_SPECS.map(({ tag, icon, label }) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'icon-btn entry-tag-btn';
    btn.setAttribute('aria-pressed', String(entry.tag === tag));
    btn.setAttribute('aria-label', `Mark ${entry.name} as ${label}`);
    btn.title = label[0].toUpperCase() + label.slice(1);
    btn.appendChild(svgIcon(icon));
    wrap.appendChild(btn);
    return btn;
  });

  buttons.forEach((btn, i) => {
    const { tag } = ENTRY_TAG_SPECS[i];
    btn.addEventListener('click', () => {
      journal.setEntryTag(session.id, entry.startedAt, tag);
      entry.tag = entry.tag === tag ? null : tag;
      buttons.forEach((b, j) => b.setAttribute('aria-pressed', String(entry.tag === ENTRY_TAG_SPECS[j].tag)));
    });
  });

  return wrap;
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
  wrap.appendChild(buildEntryTagButtons(session, entry));
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

async function handleDeviceSwitchClick() {
  const devices = await playback.listDevices();
  openDeviceModal(devices, { isSwitch: true });
}

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

async function handleNearbyClick() {
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
}

// Mounted once: react-h5-audio-player's shell (see transport/src/Transport.tsx),
// driven entirely by updatePlayerBar() below via transportApi.update()
// rather than by any real <audio> element. Handler references here are all
// hoisted function declarations, so it does not matter that some are
// defined further down this file -- none of them run until an actual
// click, by which point the whole module has finished evaluating.
const transportApi = mountTransport(playerBarEl, {
  onArtClick: () => handleResurfaceNowPlaying(),
  onPrev: () => playback.skipPrevious(),
  onPlayPause: () => handlePlayPauseClick(),
  onNext: () => playback.skipNext(),
  onNearby: () => handleNearbyClick(),
  onDeviceSwitch: () => handleDeviceSwitchClick(),
});

async function initPlaybackForApp() {
  try {
    await playback.initPlayback({
      onPlayerBarUpdate: updatePlayerBar,
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
    activePlaylistId = null;
    renderWallDom(pool);
    setWallPrompt(pool);
    announce(`Your Record Bag. ${pool.length} records. Tap one to drop the needle.`);
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
    currentPlayingEntry = null;
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
