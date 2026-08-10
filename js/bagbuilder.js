// Custom record bags: letting a listener build their own bag by hand,
// distinct from the six shipped seed bags (js/bags.js, static JSON resolved
// lazily via search) and Spotify playlists (js/playlists.js, live and
// read-only). A custom bag is created entirely client-side from Spotify
// search results the listener picked themselves, so -- unlike a seed bag --
// there is nothing to resolve lazily: the chosen albums' own pool entries
// are saved directly, in the order they were picked.
//
// Stored as one array under a single localStorage key (`lp_custom_bags`,
// prefixed per Docs/CLAUDE.md's storage rule), newest first. Small by
// nature (a listener hand-picking albums one at a time), so no per-bag key
// or resolution cache is needed the way bags.js/playlists.js use for their
// own, much larger, sources.

import { apiFetch } from './spotify.js';

const LS_CUSTOM_BAGS = 'lp_custom_bags';
const RESULTS_LIMIT = 24;

function pickImage(images) {
  if (!Array.isArray(images) || images.length === 0) return null;
  const sorted = [...images].sort((a, b) => Math.abs((a.width ?? 300) - 300) - Math.abs((b.width ?? 300) - 300));
  return sorted[0].url;
}

/** Only real albums (album_type "album"), plus "single"-typed releases
 * that actually have 6 or more tracks (an EP Spotify happens to file as a
 * single). Compilations, and anything shorter, are dropped -- same rule
 * search.js, playlists.js and bags.js apply, so a custom bag's albums
 * behave the same way everywhere else in the app (Flip, Runout groove)
 * that assumes a pool entry is a genuine album or EP. */
function isWantedRelease(album) {
  if (album.album_type === 'compilation') return false;
  if (album.album_type === 'album') return true;
  return (album.total_tracks ?? 0) >= 6;
}

function toEntry(album, rank) {
  return {
    id: album.id,
    uri: album.uri,
    name: album.name,
    artist: (album.artists || []).map((a) => a.name).join(', '),
    artistId: album.artists?.[0]?.id ?? null,
    image: pickImage(album.images),
    totalTracks: album.total_tracks ?? null,
    releaseDate: album.release_date || null,
    rank,
  };
}

/**
 * Free-text album search for the bag builder. Unlike search.js's own
 * searchAlbums() (which resolves to a single best-matching artist first,
 * then returns their whole discography -- deliberately, since Spotify has
 * no reliable "search by artist name" ranking within type=album alone),
 * this hits GET /search with type=album directly: Spotify's own album
 * search already matches free text against both the album's title and its
 * artist's name, so one query covers "found it by album name" and "found
 * it by artist name" without a mode toggle. That is exactly what building
 * a bag by hand needs -- browsing a set of candidates across possibly
 * several artists, rather than committing up front to one artist's entire
 * back catalogue.
 * @returns {Promise<{items: Array, failed: boolean}>} pool-shaped entries;
 *   failed distinguishes a broken request from an honest zero-result search.
 */
export async function searchCatalog(query) {
  const trimmed = query.trim();
  if (!trimmed) return { items: [], failed: false };
  try {
    const data = await apiFetch(`/search?q=${encodeURIComponent(trimmed)}&type=album&limit=${RESULTS_LIMIT}`);
    const items = (data?.albums?.items || []).filter(isWantedRelease).map((album, i) => toEntry(album, i));
    return { items, failed: false };
  } catch (err) {
    console.error('[bagbuilder] GET /search (type=album) failed:', err);
    return { items: [], failed: true };
  }
}

function readCustomBags() {
  try {
    const raw = localStorage.getItem(LS_CUSTOM_BAGS);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeCustomBags(bags) {
  try {
    localStorage.setItem(LS_CUSTOM_BAGS, JSON.stringify(bags));
  } catch {
    // localStorage full/unavailable: the bag the caller just built still
    // exists in memory for the rest of this tab session, but will not
    // survive a reload -- the same silent-degrade convention bags.js uses
    // for its own per-bag resolution cache.
  }
}

/** All of the listener's own custom bags, tagged with the same `category`
 * field bags.js's seed/mood/decade bags carry, so the Crates screen can
 * group them onto their own shelf the same way. Synchronous under the
 * hood (a plain localStorage read) but returns a promise-free array
 * directly, since -- unlike loadBagManifest()'s fetch of six JSON files --
 * there is no actual async work to memoize. */
export function loadCustomBags() {
  return readCustomBags().map((bag) => ({ ...bag, category: 'custom' }));
}

function slugify(name) {
  const slug = name.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
  return slug || 'bag';
}

/**
 * Saves a new custom bag. `albums` are pool-shaped entries the listener
 * picked from searchCatalog() results, in the order they picked them --
 * saved as-is (re-ranked 0..n-1, tagged with the new bag's id) rather than
 * re-resolved, since they are already real, specific Spotify album ids the
 * listener chose deliberately; re-searching by title/artist the way
 * bags.js's resolveBag() does could plausibly land on a different release.
 * @param {{name: string, blurb?: string, albums: Array}} input
 * @returns {{id, name, blurb, pool, createdAt, category: 'custom'}}
 */
export function createCustomBag({ name, blurb, albums }) {
  const id = `custom-${slugify(name)}-${Date.now().toString(36)}`;
  const pool = albums.map((entry, index) => ({ ...entry, rank: index, bagId: id }));
  const bag = { id, name: name.trim(), blurb: (blurb || '').trim(), pool, createdAt: Date.now() };
  const bags = readCustomBags();
  bags.unshift(bag);
  writeCustomBags(bags);
  return { ...bag, category: 'custom' };
}

/** Deletes a custom bag by id. A no-op (not an error) if it is already
 * gone, matching this app's general silent-skip convention for storage
 * edge cases rather than throwing over something the caller can't act on. */
export function deleteCustomBag(id) {
  writeCustomBags(readCustomBags().filter((bag) => bag.id !== id));
}

/**
 * Updates an existing custom bag's name, blurb and album list in place --
 * the "Add or remove albums" flow (main.js's bag builder in edit mode).
 * The id and createdAt stay the same: a previously-played album's journal
 * entry can carry this bag's id as its own `bagId` (see F14 in PRD.md), so
 * changing it here would silently orphan that history's "which bag did
 * this come from" link, not just rename a card on a shelf.
 * @param {string} id existing bag id (unchanged by this call)
 * @param {{name: string, blurb?: string, albums: Array}} input albums are
 *   pool-shaped entries, in the order the listener wants them saved --
 *   entirely replaces the previous album list, not merged with it (the
 *   caller already started from the existing selection and added/removed
 *   from there, so this is meant to be the final, complete list).
 * @returns {{id, name, blurb, pool, createdAt, category: 'custom'}|null}
 *   null if `id` no longer exists (deleted from elsewhere in the meantime).
 */
export function updateCustomBag(id, { name, blurb, albums }) {
  const bags = readCustomBags();
  const index = bags.findIndex((bag) => bag.id === id);
  if (index === -1) return null;
  const pool = albums.map((entry, i) => ({ ...entry, rank: i, bagId: id }));
  const updated = { ...bags[index], name: name.trim(), blurb: (blurb || '').trim(), pool };
  bags[index] = updated;
  writeCustomBags(bags);
  return { ...updated, category: 'custom' };
}
