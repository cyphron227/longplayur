// Search the Wall by artist or genre. Spotify's search endpoint only
// supports the genre: field filter for artist/track searches, not albums
// directly, so both paths resolve to one or more artists first, then pull
// each artist's own albums -- more reliable than a free-text album search
// anyway, since that also surfaces unrelated compilations and
// various-artist samplers.
//
// Only albums, and EPs of 6 or more tracks, are kept: singles shorter than
// that and compilations are filtered out, per explicit request.
//
// Genre mode is a "soft" search combining several sources, because
// Spotify's exact genre:"..." tag filter alone is too brittle for a lot of
// real genre terms in practice (confirmed live: "jungle" and "britpop"
// both returned nothing, while "soul" returned the band Soul II Soul
// instead of soul records). Most to least confident:
//   1. Spotify's exact genre:"..." tag search (kept -- sometimes works).
//   2. A plain free-text Spotify artist search, kept only where the artist's
//      own .genres tags softly match the query (word-level overlap, not raw
//      substring -- see phraseSoftMatches for why "britpop" must not match
//      an artist merely tagged "pop").
//   3. Deezer's own, coarser genre taxonomy (e.g. "Soul & Funk", "Rap/Hip
//      Hop") -- the same public, keyless API "Records nearby" already uses
//      -- whose member artists are resolved back to Spotify by name.
//   4. Last resort, only if 1-3 all came back empty: the plain free-text
//      search results unfiltered, so a niche term with no matching tag or
//      Deezer bucket (e.g. "jungle") still returns something rather than
//      nothing, at the cost of possibly matching on artist name alone.
// Results are deduplicated and ranked in that order, then capped before
// fetching any album data (each artist costs up to 2 paginated requests).
// getGenreSuggestions() separately exposes genre names for an autocomplete
// (Deezer's list plus real Spotify tags harvested from past searches, see
// harvestGenres()), steering users toward terms most likely to hit tier 1-3.

import { apiFetch } from './spotify.js';
import { deezerFetch } from './deezer.js';

const MAX_ARTISTS_GENRE = 10;
// GET /artists/{id}/albums caps `limit` at 10 (not 50, as most other list
// endpoints allow) -- confirmed against Spotify's own docs after a live
// request with limit=12 came back "400 Invalid limit". Two pages (20
// releases pre-filter) gives a fuller discography than one without adding
// much latency, since both requests for a given artist fire in parallel.
const ALBUMS_PAGE_LIMIT = 10;
const ALBUMS_PAGES_PER_ARTIST = 2;
const POOL_TARGET = 40;
// Cap on how many candidate artists (across all three genre sources
// combined) actually get their discographies fetched, so a broad soft
// match doesn't balloon into dozens of parallel album requests.
const MAX_ARTISTS_FOR_ALBUMS = 15;
const DEEZER_GENRE_ARTIST_LIMIT = 10;

function pickImage(images) {
  if (!Array.isArray(images) || images.length === 0) return null;
  const sorted = [...images].sort((a, b) => Math.abs((a.width ?? 300) - 300) - Math.abs((b.width ?? 300) - 300));
  return sorted[0].url;
}

/** Only real albums (album_type "album"), plus "single"-typed releases
 * that actually have 6 or more tracks (an EP Spotify happens to file as a
 * single). Compilations, and anything shorter, are dropped. */
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

function normalize(s) {
  return (s || '').trim().toLowerCase();
}

// Spotify has no working public endpoint that lists its own genre
// vocabulary -- both GET /recommendations/available-genre-seeds and GET
// /browse/categories are marked Deprecated in Spotify's own current API
// reference (checked directly, not assumed). What Spotify does still
// return, on every artist object from GET /search?type=artist, is that
// artist's own .genres array -- real tags like "britpop" or "madchester",
// finer-grained than Deezer's ~30 broad buckets. searchArtists() harvests
// every one of those it sees into localStorage, so the genre autocomplete
// grows richer with real Spotify vocabulary the more the app is used,
// rather than starting (and staying) as coarse as Deezer alone.
const GENRE_VOCAB_KEY = 'lp_genre_vocab';
const GENRE_VOCAB_MAX = 500;

function loadGenreVocab() {
  try {
    const raw = localStorage.getItem(GENRE_VOCAB_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function harvestGenres(artists) {
  const genres = (artists || []).flatMap((a) => a?.genres || []).filter(Boolean);
  if (genres.length === 0) return;

  const vocab = loadGenreVocab();
  if (vocab.length >= GENRE_VOCAB_MAX) return; // simplest correct cap: stop adding once full, keep what's already learned.

  const seen = new Set(vocab.map((g) => normalize(g)));
  let changed = false;
  for (const g of genres) {
    const key = normalize(g);
    if (!key || seen.has(key)) continue;
    seen.add(key);
    vocab.push(g);
    changed = true;
    if (vocab.length >= GENRE_VOCAB_MAX) break;
  }

  if (!changed) return;
  try {
    localStorage.setItem(GENRE_VOCAB_KEY, JSON.stringify(vocab));
  } catch {
    // localStorage full/unavailable: this run's harvest is simply lost.
  }
}

function tokenize(s) {
  return normalize(s).split(/[^a-z0-9]+/).filter(Boolean);
}

/** True if every word of the shorter phrase appears as a whole word in the
 * longer one ("uk hip hop" vs "hip hop" matches on {hip, hop}). Word-level,
 * not raw substring: a raw substring check let query "britpop" match any
 * artist merely tagged "pop", since "britpop".includes("pop") is true --
 * confirmed live, an artist tagged just "pop" was pulled into a "britpop"
 * search. Tokenizing first means "britpop" and "pop" are different single
 * words, so that false match no longer happens, while genuine multi-word
 * overlaps like "hip hop" / "uk hip hop" still work. */
function phraseSoftMatches(candidate, query) {
  const c = tokenize(candidate);
  const q = tokenize(query);
  if (c.length === 0 || q.length === 0) return false;
  const cSet = new Set(c);
  const qSet = new Set(q);
  const isSubset = (small, big) => [...small].every((w) => big.has(w));
  return isSubset(qSet, cSet) || isSubset(cSet, qSet);
}

/** True if the query softly matches one of the artist's own genre tags. */
function genreSoftMatches(genres, query) {
  return (genres || []).some((g) => phraseSoftMatches(g, query));
}

/** @returns {Promise<{items: Array, failed: boolean}>} failed distinguishes
 * "the request itself broke" from "it succeeded and legitimately found
 * nothing" -- these used to look identical, with no way to tell a real bug
 * apart from an honest empty result. */
async function albumsForArtist(artistId) {
  try {
    // No market param: market=from_token needs the user-read-private scope
    // (to resolve the user's country) which this app does not request, and
    // requesting it would mean every existing connected user has to
    // reconnect to pick up the new scope. Omitting market entirely is
    // valid for this endpoint -- it just means Spotify does not filter the
    // discography to one country, which does not matter for a preview pool.
    const pages = await Promise.all(
      Array.from({ length: ALBUMS_PAGES_PER_ARTIST }, (_, i) =>
        apiFetch(`/artists/${artistId}/albums?include_groups=album,single&limit=${ALBUMS_PAGE_LIMIT}&offset=${i * ALBUMS_PAGE_LIMIT}`)
      )
    );
    return { items: pages.flatMap((data) => data?.items || []), failed: false };
  } catch (err) {
    console.error('[search] GET /artists/{id}/albums failed:', err);
    return { items: [], failed: true };
  }
}

async function searchArtists(q, limit) {
  try {
    const data = await apiFetch(`/search?q=${encodeURIComponent(q)}&type=artist&limit=${limit}`);
    const items = data?.artists?.items || [];
    harvestGenres(items);
    return { items, failed: false };
  } catch (err) {
    console.error('[search] GET /search (type=artist) failed:', err);
    return { items: [], failed: true };
  }
}

// Deezer's genre list is a small, static taxonomy (a few dozen broad
// buckets) -- fetched once and cached for the tab's lifetime, same pattern
// as ceremony.js's artistGenreCache.
let deezerGenreListPromise = null;
function getDeezerGenreList() {
  if (!deezerGenreListPromise) {
    deezerGenreListPromise = deezerFetch('/genre').catch(() => null);
  }
  return deezerGenreListPromise;
}

/** Finds the closest-matching Deezer genre bucket for the query, pulls its
 * member artists, and resolves each one back to a real Spotify artist by
 * name. Deezer's own genre names are coarse ("Soul & Funk", "Rap/Hip Hop"),
 * so this catches terms Spotify's exact tag search misses entirely.
 * @returns {Promise<{items: Array, failed: boolean}>} */
async function deezerGenreArtists(query) {
  try {
    const genreList = await getDeezerGenreList();
    const genres = (genreList?.data || []).filter((g) => g && g.id !== 0); // id 0 is Deezer's "All genres" bucket.
    if (genres.length === 0) return { items: [], failed: genreList === null };

    const q = normalize(query);
    const matches = genres.filter((g) => phraseSoftMatches(g.name, query));
    if (matches.length === 0) return { items: [], failed: false };

    // Prefer the bucket whose name length is closest to the query -- the
    // least "extra" unrelated genre swept in alongside the match.
    matches.sort((a, b) => Math.abs(a.name.length - q.length) - Math.abs(b.name.length - q.length));
    const best = matches[0];

    const artistsData = await deezerFetch(`/genre/${best.id}/artists`);
    const deezerArtists = (artistsData?.data || []).slice(0, DEEZER_GENRE_ARTIST_LIMIT);
    if (deezerArtists.length === 0) return { items: [], failed: false };

    const resolved = await Promise.all(
      deezerArtists.map((da) =>
        searchArtists(da.name, 1)
          .then((r) => r.items?.[0] || null)
          .catch(() => null)
      )
    );
    return { items: resolved.filter(Boolean), failed: false };
  } catch (err) {
    console.error('[search] Deezer genre lookup failed:', err);
    return { items: [], failed: true };
  }
}

function poolFromAlbumLists(albumLists) {
  const seen = new Set();
  const pool = [];
  albumLists.flat().forEach((album) => {
    if (!album || !album.id || seen.has(album.id)) return;
    if (!isWantedRelease(album)) return;
    seen.add(album.id);
    pool.push(album);
  });
  return pool.slice(0, POOL_TARGET).map(toEntry);
}

/** The single best-matching artist's own discography. */
async function searchByArtist(query) {
  const artists = await searchArtists(query, 1);
  if (artists.failed) return { pool: [], failed: true };
  if (artists.items.length === 0) return { pool: [], failed: false };

  const albums = await albumsForArtist(artists.items[0].id);
  return { pool: poolFromAlbumLists([albums.items]), failed: albums.failed };
}

/** Several artists softly matched to the genre from three sources (exact
 * Spotify tag, free-text Spotify search cross-checked against the artist's
 * own genre tags, and Deezer's broader taxonomy), each contributing a few
 * albums, forming a wall for that genre rather than any one artist's
 * catalogue. */
async function searchByGenre(query) {
  const [tagResult, freeResult, deezerResult] = await Promise.all([
    searchArtists(`genre:"${query}"`, MAX_ARTISTS_GENRE),
    searchArtists(query, MAX_ARTISTS_GENRE),
    deezerGenreArtists(query),
  ]);

  // Rank 0 = exact tag match (most confident), 1 = free-text softly matched
  // against its own genre tags, 2 = resolved via Deezer's broader taxonomy.
  // A Map preserves insertion order, so inserting in rank order also keeps
  // the final candidate list rank-sorted with no separate sort step.
  const candidates = new Map();
  tagResult.items.forEach((a) => {
    if (!candidates.has(a.id)) candidates.set(a.id, a);
  });
  freeResult.items
    .filter((a) => genreSoftMatches(a.genres, query))
    .forEach((a) => {
      if (!candidates.has(a.id)) candidates.set(a.id, a);
    });
  deezerResult.items.forEach((a) => {
    if (!candidates.has(a.id)) candidates.set(a.id, a);
  });

  // Last resort: for niche terms with no exact tag, no genre-tag overlap,
  // and no matching Deezer bucket at all (confirmed live for "jungle" --
  // Deezer's own taxonomy is too coarse to have a bucket for it), fall
  // back to whichever artists the plain free-text search found by name,
  // unfiltered. This can surface an artist whose name matches but whose
  // actual style doesn't (the same imprecision "soul" once had matching
  // the band Soul II Soul) -- but only after every more precise source has
  // come back empty, so a loosely-related result stands in for nothing at
  // all, per explicit request for a softer, more allowing search.
  if (candidates.size === 0) {
    freeResult.items.forEach((a) => {
      if (!candidates.has(a.id)) candidates.set(a.id, a);
    });
  }

  if (candidates.size === 0) {
    const allFailed = tagResult.failed && freeResult.failed && deezerResult.failed;
    return { pool: [], failed: allFailed };
  }

  const artistList = Array.from(candidates.values()).slice(0, MAX_ARTISTS_FOR_ALBUMS);
  const albumLists = await Promise.all(artistList.map((a) => albumsForArtist(a.id)));
  const anyFailed = albumLists.every((r) => r.failed); // every request failing, not just one artist coming up short.
  return { pool: poolFromAlbumLists(albumLists.map((r) => r.items)), failed: anyFailed };
}

/**
 * @param {string} query free-text artist name or genre
 * @param {'artist'|'genre'} mode which interpretation to use -- this used
 *   to be guessed (try artist, fall back to genre only if that found
 *   literally nothing), but Spotify's artist search is fuzzy enough that
 *   almost any genre-like word also matches some real, if obscure, artist
 *   (e.g. "soul" matching the band Soul II Soul), so the guess essentially
 *   never fell through to genre mode in practice. The caller now asks for
 *   one explicitly (see the mode toggle next to the search field).
 * @returns {Promise<{pool: Array, failed: boolean}>} pool is pool-shaped
 *   entries (same shape as albums.js/bags.js produce). failed means every
 *   underlying request broke (check the browser console for the logged
 *   error) -- distinct from a genuine, successful zero-result search.
 */
export async function searchAlbums(query, mode) {
  const trimmed = query.trim();
  if (!trimmed) return { pool: [], failed: false };

  const result = mode === 'genre' ? await searchByGenre(trimmed) : await searchByArtist(trimmed);
  return result;
}

/**
 * Genre names for an autocomplete on the search field, so a genre search
 * is steered toward terms most likely to actually return something rather
 * than typed blind. Two real sources, merged and deduplicated, neither
 * hand-written: Deezer's own public genre list (the same one
 * deezerGenreArtists() matches against, coarse but always present from
 * first launch) and the Spotify genre vocabulary harvested from every
 * artist search this app has actually made (see harvestGenres() above) --
 * finer-grained, and grows richer the more the app is used. Spotify itself
 * has no working "list every genre tag" endpoint left to call directly
 * (both candidates are marked Deprecated in Spotify's current API
 * reference), so this is the closest available substitute.
 * @returns {Promise<string[]>} alphabetised genre names, deduplicated
 *   case-insensitively (Deezer's casing wins on a collision, since it is
 *   the more consistently curated of the two).
 */
export async function getGenreSuggestions() {
  const genreList = await getDeezerGenreList();
  const deezerNames = (genreList?.data || []).filter((g) => g && g.id !== 0 && g.name).map((g) => g.name);
  const harvested = loadGenreVocab();

  const seen = new Set();
  const merged = [];
  [...deezerNames, ...harvested].forEach((name) => {
    const key = normalize(name);
    if (!key || seen.has(key)) return;
    seen.add(key);
    merged.push(name);
  });
  return merged.sort((a, b) => a.localeCompare(b));
}
