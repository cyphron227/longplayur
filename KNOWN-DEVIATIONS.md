# Known deviations

Per `Docs/CLAUDE.md`'s honesty rule: this file records where the implementation
differs from the letter of `Docs/PRD.md` / `Docs/DESIGN-SPEC.md`, and any
assumptions made without the ability to verify against Spotify's live
behaviour.

## Selection preview polish, search, autoplay prevention, tile shuffling (2026-07-12)

A round of fixes and additions on top of the selection-preview flow above:

- **Consistent, non-overlapping preview sizing.** The enlarged cover's
  target size was `cellRect.width * 1.6`, where `cellRect` came from the
  tapped tile's live `getBoundingClientRect()`. DomeGallery tiles sit on a
  rotating 3D dome, so that is a *projected* size that varies with
  perspective depending on where the tile currently sits -- this made the
  enlarged cover, and the text positioned above it, inconsistent from
  album to album, and on some albums put the text close enough to
  overlap the cover. `computeEnlargedTarget()` in `js/ceremony.js` now
  returns a fixed, viewport-relative size (same for every album); the
  cover still animates from the tile's real (small, possibly distorted)
  position, just always to the same place. Used by both `needleDrop()`
  and `selectAlbum()`.
- **Readable against any background.** The preview's title/artist/
  description now sit on their own opaque, blurred panel (`.preview-text-
  panel`) instead of floating directly over the cover or the dimmed wall,
  so they stay legible regardless of the album art's own colours.
- **Removed a genuine artist repetition**: the description line
  (`descriptionLine()`) used to lead with the artist name, which was
  already shown on its own line above it. It no longer does.
- **Genre in place of the year**, where Spotify has one. Genres live on
  the *artist*, not the album -- the album response never populates one --
  so this is a second small request (`GET /artists/{id}`, `spotify.js`'s
  new `getArtist()`), cached per artist in `js/ceremony.js`'s
  `artistGenreCache` for the tab's lifetime. Falls back to the release
  year where Spotify has no genre for that artist, which is common enough
  (many artists, especially lesser-known ones, have an empty `genres`
  array) that this needed to be a graceful fallback, not an assumption.
  Every pool-producing module (`albums.js`, `bags.js`, `nearby.js`,
  `search.js`) now also carries the primary artist's `artistId` on each
  pool entry so this lookup is possible.
- **A real pre-existing bug fixed**: `.preview-play-btn` never had
  `pointer-events: auto`. Its parent (`.ceremony-layer`) is
  `pointer-events: none` so drags pass through to the gallery beneath it,
  and CSS `pointer-events` is inherited, so the button was very likely
  unclickable this whole time -- only caught now since it had previously
  only been verified via curl, never on an actual device.
- **Output switcher icon redesigned.** The original combined a portrait
  rectangle with disconnected signal arcs that did not read as a coherent
  glyph. Replaced with the conventional cast shape: a screen open at the
  bottom-left, with two wave arcs and a dot emanating from that corner.
- **Devices labelled by type** (Computer, Phone, Speaker, TV, Cast, etc.,
  from Spotify's own `device.type` field) in the output-switcher/device-
  picker modal. This is deliberately *not* a separate Google Cast
  integration: Spotify's authenticated audio streams cannot be flung to a
  generic Cast receiver from a webpage, so the only way to actually get
  Spotify audio playing on a cast device is via Spotify's own device
  network, which already surfaces any Chromecast-paired speaker with
  Spotify Connect support as a device of type `CastAudio`/`CastVideo`. A
  literal separate Cast picker was considered and rejected as misleading:
  it would only be able to cast the webpage itself, with no control over
  Spotify playback through it.
- **Past sessions mobile overflow.** `#screen-past-sessions` set
  `overflow-y: auto` without an explicit `overflow-x`; per the CSS
  overflow spec, setting only one axis to a non-`visible` value computes
  the other as `auto` too, so anything that didn't quite fit on a narrow
  phone (the header's title plus New session plus close button; a
  session row's deadwax label plus share button) became an invisible
  horizontal scroll rather than wrapping or truncating -- the share
  button was there, just off past the right edge. Fixed with an explicit
  `overflow-x: hidden`, a `flex-wrap` header that drops to a second line
  if it doesn't fit, and a dedicated truncating class on the row's
  deadwax label (`.session-row-label`) instead of letting it force
  overflow the way an un-shrinkable flex item's text content can.
- **Runout no longer risks Spotify's own Autoplay.** If a listener has
  Spotify's account-level Autoplay setting on, it could previously start
  something unrelated playing the moment an album's context ran out,
  undermining the entire "you have to choose the next record" premise.
  `handleRunout()` in `js/main.js` now explicitly issues a pause
  (`playback.togglePlayPause(true)`) as soon as the runout is detected.
  Caveat: if Autoplay is on and Spotify's own client races ahead of this
  app's end-of-album detection (`js/ending.js`) before ever reporting a
  paused state, the detection itself might not fire in the first place --
  this has not been exercised against a real account with Autoplay
  enabled, so treat this as a best-effort mitigation, not a guarantee.
- **Fewer visible duplicate covers on the Wall.** `gallery/src/
  DomeGallery.tsx`'s `buildItems()` used to fill a pool smaller than the
  dome's slot count with a straight modulo repeat (image 0 at slot 0,
  slot `pool.length`, slot `2 * pool.length`...), which could put two
  instances of the same album close enough together to both be visible on
  screen at once. It now fills with independently shuffled full passes of
  the pool instead, so an album can only reappear after every other album
  in the pool has had a turn, and even then in a different order. This is
  the eighth deliberate change from the upstream component, documented in
  the file's own header comment; rebuilt via `cd gallery && npm run build`.
- **New: search by artist or genre** (`js/search.js`). Spotify's search
  endpoint only supports the `genre:` field filter for artist and track
  searches, not albums directly, so both modes resolve to one or more
  artists first, then pull each artist's own albums via `/artists/{id}/
  albums` -- more reliable than a free-text album search anyway, since
  that also surfaces unrelated compilations and various-artist samplers.
  Artist mode takes the single best match; genre mode takes up to 10
  artists tagged with that genre and aggregates a few albums from each.
  Only real albums (`album_type === 'album'`), and `single`-typed
  releases with 6 or more tracks (an EP Spotify happens to file as a
  single), are kept; compilations and shorter singles are filtered out,
  per explicit request. A result reuses the bag-rail's own crossfade
  (`switchWallPool()`) and adds a dismissible "ARTIST: X" / "GENRE: X"
  chip alongside YOUR WALL, mutually exclusive with an active bag.

## Search: real bug, found via a live device report, fixed on the same day

Shipped search returned zero results for every query -- confirmed live by
Yaron testing "Frank Ocean" and "uk hip hop", both empty. `js/search.js`'s
Spotify requests were wrapped in a bare `try/catch { return []; }`, so a
genuinely broken request was indistinguishable from an honest empty
result; there was no way to tell which had happened from the outside.

First fix: made failures loud instead of silent -- every failed request
now `console.error`s, and `failed` threads back through
`searchByArtist()`/`searchByGenre()`/`searchAlbums()` so `main.js` can
show "Search failed, check your connection" instead of the misleading
"No albums found" when the request itself broke, rather than merely
finding nothing. At the same time, `market=from_token` was added to both
Spotify calls, reasoned from general API best practice for
market-restricted endpoints -- this was not evidence-based, since nothing
was known yet about the actual failure.

That guess was wrong, and made things worse in a specific way: the
console logging then surfaced the real cause directly from a live
session -- `403 Insufficient client scope` on the `/search` call.
`market=from_token` requires Spotify to resolve the user's country from
their private profile, which needs the `user-read-private` scope; this
app's OAuth scopes (`js/auth.js`) do not include it, and adding it would
mean every already-connected user has to reconnect to pick up the new
scope. `market=from_token` was removed from both calls (`searchArtists()`
and `albumsForArtist()`) rather than adding the scope -- omitting
`market` entirely is valid for both endpoints and only means Spotify does
not filter the discography to one country, which does not matter for a
preview pool. The diagnosability fix (loud failures, the `failed` flag)
stayed, since it is what actually made this fixable at all, and is worth
keeping regardless of this specific bug.

With the scope error gone, the same live session immediately surfaced a
second, unrelated bug the same way: `GET /artists/{id}/albums` came back
`400 Invalid limit` for `limit=12`. `js/search.js`'s `MAX_ALBUMS_PER_ARTIST`
constant was set from a general assumption that Spotify list endpoints
allow up to 50 -- true for many of them, but this specific endpoint (and,
it turns out, the general `/search` endpoint too) caps `limit` at 10,
confirmed against Spotify's own current API reference rather than
assumed a second time. Fixed by paginating: `albumsForArtist()` now
fetches two pages of 10 (`offset=0` and `offset=10`) in parallel per
artist, for up to 20 releases before the album/EP filter runs, rather
than requesting an invalid `limit=12` in one call.

With requests actually succeeding, a third issue surfaced -- this one a
genuine design flaw rather than a request bug: searching "soul" (meaning
the genre) returned the band Soul II Soul's discography instead, because
`searchAlbums()` tried artist mode first and only fell back to genre mode
if that found literally nothing. Spotify's artist search is fuzzy enough
that almost any genre-like word also matches some real, if obscure,
artist, so that fallback essentially never triggered in practice --
confirmed live. Auto-detection was removed entirely: `searchAlbums()` now
takes an explicit `mode` ('artist' | 'genre') argument, chosen via a new
Artist/Genre toggle next to the search field (`main.js`'s `searchMode`
state, defaulting to 'artist'), rather than guessed.

With the mode no longer guessed, a fourth issue surfaced -- genuine genre
terms still came back empty even in explicit genre mode: "jungle" and
"britpop" both returned nothing, confirmed live. Spotify's exact
`genre:"..."` tag filter turns out to be too sparse for a lot of real
genre vocabulary on its own; it either has the tag or it doesn't, with no
fuzziness. `searchByGenre()` was rewritten into a "soft search" combining
three sources instead of relying on the tag filter alone: (1) the existing
exact `genre:"..."` tag search, kept since it sometimes works; (2) a
plain free-text Spotify artist search, kept only where the returned
artist's own `.genres` array softly overlaps the query; (3) Deezer's own
public genre taxonomy (`GET /genre` then `GET /genre/{id}/artists`) -- the
same keyless API "Records nearby" already uses -- whose coarser buckets
(e.g. "Rap/Hip Hop" covers "uk hip hop") catch genre words Spotify's own
tag search misses entirely, with each Deezer artist name resolved back to
a real Spotify artist via the same search call. The three sources are
deduplicated by artist ID and ranked in that order (exact tag first),
capped at 15 artists total before any album data is fetched, since each
artist costs up to 2 paginated requests. The shared Deezer
fetch-with-JSONP-fallback logic was pulled out of `nearby.js` into a new
`js/deezer.js` module so both features use the same tested client rather
than duplicating it. `POOL_TARGET` was also lowered from 100 to 40 per
explicit request, applying to both artist and genre mode.

The soft-search matching above was initially implemented as a raw
substring check ("does one string contain the other"), and that shipped
with a real bug caught on the very next live test: searching "britpop"
pulled in an artist tagged only "pop", because `"britpop".includes("pop")`
is true. `genreSoftMatches()` and the Deezer bucket matcher were rewritten
to a word-level check instead (`phraseSoftMatches()`, `js/search.js`):
both strings are split into words, and one word-set must be a subset of
the other, so "britpop" and "pop" are simply different single-word tokens
and no longer collide, while genuine multi-word overlaps like "hip hop" /
"uk hip hop" still work. The same live round confirmed "jungle" still
came back completely empty: no exact Spotify tag, no artist whose own
genre tags mention it, and no matching Deezer bucket either (Deezer's own
taxonomy has no bucket fine enough for it). A fourth, last-resort tier was
added: when all three ranked sources come back empty, `searchByGenre()`
now falls back to the plain free-text artist-search results unfiltered,
so a niche term still surfaces something rather than nothing -- at the
cost of the same imprecision the "soul" -> Soul II Soul case had, since
this tier only matches by artist name, not genre. It only ever runs when
nothing more precise was found, and is documented here as a deliberate
trade-off rather than a fixed bug, per the explicit request for a softer,
more allowing search over an empty one.

To reduce how often genre search lands on a term with no real coverage in
the first place, the search field now offers an autocomplete: a
`<datalist>` bound to the input via `list="genre-suggestions"`, populated
only while Genre mode is active (`main.js`'s `populateGenreSuggestions()`)
from a new `getGenreSuggestions()` export in `js/search.js`. Suggestions
were initially Deezer's own genre names only, fetched live rather than
hand-written, since Spotify does not expose a public "list every genre
tag" endpoint for an app like this to call, and hand-writing a genre-tag
list would be exactly the kind of unverified guess that caused the two
bugs above.

That was flagged as too basic on the next live round (Deezer's taxonomy
is only ~30 broad buckets). Spotify's real per-artist genre vocabulary
(things like "britpop" or "madchester", visible on every artist object
`/search?type=artist` returns) is far richer, but there is no working
Spotify endpoint left to enumerate it up front: `GET /recommendations/
available-genre-seeds` and `GET /browse/categories` are both marked
Deprecated in Spotify's own current API reference (checked directly
before ruling them out, not assumed -- the project's actual constraint
being avoided here is guessing at deprecated-endpoint behaviour a third
time in the same session). Instead, `searchArtists()` now harvests the
`.genres` array off every artist object it ever sees (from both artist
mode and genre mode searches) into `localStorage['lp_genre_vocab']`
(capped at 500 unique tags, deduplicated case-insensitively), and
`getGenreSuggestions()` merges that harvested vocabulary with Deezer's
baseline list. The autocomplete therefore starts identical to before (just
Deezer's ~30 buckets on a fresh install) and grows richer with genuine
Spotify genre tags the more the app is actually used, with zero
hand-written genre content and zero reliance on a deprecated endpoint.

Resolving each Deezer artist name back to Spotify (`deezerGenreArtists()`)
fired all of them as one `Promise.all`, up to `DEEZER_GENRE_ARTIST_LIMIT`
(10) concurrent Spotify search calls, on top of the exact-tag and
free-text searches `searchByGenre()` always ran alongside it -- up to 12
concurrent Spotify requests for a single genre search. Stacked against the
final stage, which fetched all `MAX_ARTISTS_FOR_ALBUMS` (15) candidates'
discographies as one more `Promise.all` (2 requests each, so up to 30
concurrent), a genre search could burst up to roughly 40 concurrent
Spotify requests. Live testing tripped an actual `429` from this,
confirmed from the browser console, breaking both artist and genre search
(genre search's burst exhausted the rate limit window that artist search's
much smaller single request then also landed in). Fixed two ways: (1)
`searchByGenre()` now runs only the two cheap sources (exact tag,
free-text) first, and only pays for the Deezer lookup -- and its own
Spotify-resolution burst -- when those two together found fewer than
`MIN_CANDIDATES_BEFORE_DEEZER` (5) candidates, rather than always running
all three regardless of whether the cheap sources already had enough; (2)
both the Deezer-name-resolution step and the final per-artist album fetch
now go through a new `mapWithConcurrency()` helper (a small fixed-size
worker pool) instead of one big `Promise.all`, capping how many Spotify
requests are ever in flight at once to `RESOLVE_CONCURRENCY` (3) and
`ALBUMS_FETCH_CONCURRENCY` (4) respectively, rather than bursting the
entire batch at once.

## Liner notes removed, native share added (INCREMENT-01 Phase 3)

Liner notes are gone entirely: `journal.js`'s `setLinerNote()` export, the
`note` field on journal entries, and the textarea in each Past sessions
entry row are all removed. `CURRENT_VERSION` moved 2 -> 3 and `migrate()`
strips any lingering `note` field from existing entries on load; sessions
and their other entry data are otherwise untouched.

The share action moved to a dedicated icon button on each session's
collapsed row (`aria-label="Share session {n}"`, 44px target), and now
attempts a native share (PRD F8a) before falling back to download. Since a
button cannot nest inside another button, the row's head is now two
siblings (`.session-row-head` for expand/collapse, `.session-share-btn`
for sharing) inside a new `.session-row-head-wrap`, rather than one button
as before.

`exporter.js`'s `exportSessionCard()` (returned a `dataUrl`) became
`renderSessionCard()` (returns a `canvas`), so callers can choose
`canvas.toDataURL()` (download, via the new `downloadCanvas()`) or
`canvas.toBlob()` (share, via the new `canvasToFile()`) without rendering
twice. Per PRD F8a's transient-activation constraint, rendering is kicked
off as soon as each row exists (`preRenderShareCard()`, fired from
`renderSessionRow()`, cached in `main.js`'s `sessionCardCache` keyed by
session id) rather than inside the share button's own click handler, so a
tap on an already-open Past sessions screen only needs `canvas.toBlob()` +
`navigator.share()` before it. This has not been exercised on a real iOS
device; if transient activation is still lost in practice, the pre-render
would need to start even earlier (e.g. when a session is recorded, rather
than when Past sessions is opened).

## "Side" renamed to "Session", now everywhere including storage (INCREMENT-01 Phase 0)

Per explicit request: every occurrence of "side"/"Side" is now
"session"/"Session" (wall prompts, share card, confirm dialogs, README,
PRD.md, DESIGN-SPEC.md). This originally stopped at UI copy, deliberately
leaving the stored journal's field/function names unchanged so nobody's
saved journal would break. INCREMENT-01 Phase 0 explicitly extended the
rename into storage and code too, reversing that earlier decision: the
journal's own field is now `sessions`, not `sides`, and every internal
name follows (`startNewSession()`, `getSessionsNewestFirst()`,
`getLifetimeSessionCount()`, `deleteSession()`, `SESSION_INACTIVITY_MS`,
`currentSessionId`, `exportSessionCard()`, etc.). `js/journal.js` bumped
`CURRENT_VERSION` from 1 to 2 and its `migrate()` renames an existing v1
journal's `sides` array to `sessions` in place; no entry data is touched,
so nobody's saved history is lost.

Also per INCREMENT-01 Phase 0: "record bag" no longer refers to the
journal at all. It is reserved exclusively for the curated album
collections introduced in Phase 2 (a rail of chips above the Wall). The
screen, tab, and header button that used to be labelled "Record bag" (the
journal view) are now "Past sessions" throughout `index.html`, `js/main.js`,
and `styles.css` (`#screen-past-sessions`, `#tab-past-sessions`,
`#btn-past-sessions`, `.session-row` etc., replacing the old
`#screen-record-bag` / `.side-row` names).

## The needle-drop cover now stays expanded

Separately from the rename above: per explicit request, the needle-drop ceremony's enlarged cover no
longer auto-shrinks back into its cell once the held breath ends. It now
stays large on screen as the "now playing" hero until one of two things
happens: the gallery is dragged, or the album finishes. Both are handled
by `settleActiveOverlay()` in `js/ceremony.js`, which eases the cover back
into its actual cell and hands its disc off to a persistent per-cell disc
at the same progress (no jump). Starting a *different* needle drop while
one is still expanded still fully retires the old one immediately (as
before this change), rather than settling it, since two hero covers on
screen at once would not make sense.

Detecting "the gallery was dragged" needed a further small addition to the
DomeGallery fork (`gallery/src/DomeGallery.tsx`): an `onDragMove` prop
firing once a gesture actually crosses the movement threshold that
distinguishes a drag from a tap (not on every pointer-down, which would
also fire for plain taps). A long-press capability was added the same way
(`onLongPress`/`onLongPressEnd`/`longPressMs` props on the tile) so the
Wall could react to holding a cover, not just tapping it.

## Selecting an album no longer plays it immediately (per explicit request)

Tapping or long-pressing a cover used to run the full needle-drop ceremony
straight away. It now opens a selection preview first -- name, artist, and
a one-line description, plus Play / "Find something else" -- and nothing
plays (and nothing is recorded in Past sessions) unless Play is pressed.
`js/ceremony.js`'s `selectAlbum(entry, ctx)` is the new entry point for
this; it resolves `{ committed: true }` once playback has actually
started (the caller then records the journal entry the same way it would
for a direct drop) or `{ committed: false }` if dismissed.

This absorbed and replaced the earlier "long-press preview"
(`showLongPressPreview()`/`hideLongPressPreview()`, a lightweight peek
with no disc/crackle/camera-pan): since a tap now shows essentially the
same thing with more information and an explicit decision, keeping a
separate, different-looking long-press preview alongside it would have
been redundant. `onSelect` and `onLongPress` are both wired to the same
`handleSelectAlbum()` in `js/main.js` now.

**The "description"** is the same artist/year/track-count/duration deadwax
line the needle drop itself already showed -- Spotify's Web API has no
free-text album description field, so this is the closest honest
approximation available, not an invented summary.

**Committing (Play pressed)** reuses the preview's own cover/text DOM
elements rather than tearing them down and having the needle drop rebuild
them from the wall cell, specifically to avoid a shrink-then-reexpand
flicker between the two stages. The disc-slide/crackle/held-breath
timings after Play are deliberately shorter than a directly-triggered drop
(`TIMINGS.postPlayCrackleDelayMs`/`postPlayBreathMs`, ~1s total vs ~2.3s)
since the anticipation already happened while deciding whether to press
Play.

**If a different album is already the "now playing" hero** when a new
preview opens, it eases back into its cell via the existing
`settleActiveOverlay()` (same mechanism as a gallery drag) *before* the
preview appears, so the two enlarged covers never overlap on screen --
critically, this happens whether or not the new preview is ever confirmed,
since it is purely visual (the still-playing album keeps its disc/progress
as a persistent per-cell disc either way) and does not touch playback,
the journal, or the "played" ring on that album's tile. The tile only
actually gets marked played, and its persistent disc retired for good,
once Play is confirmed on the *new* album -- not merely by opening its
preview -- so dismissing a preview never misrepresents what has and hasn't
been played this session.

**`needleDrop()` (the original, no-preview function) still exists
unchanged** and is used by the two callers that already represent a
confirmed choice rather than a fresh browse: resuming a needle drop after
picking a device from the output-switcher/Android-wake modal, and Records
nearby's shelf (a one-tap "quick add" from a curated list, not the Wall's
primary tap-to-browse interaction -- it was judged not to need the extra
preview step, though this is a judgement call, not a hard requirement, and
could be revisited).

**Bug caught in the process:** `.preview-play-btn` never had
`pointer-events: auto` set. Its parent (`.ceremony-layer`) is
`pointer-events: none` so drags pass through to the gallery beneath it,
and CSS `pointer-events` is inherited, so the Play button itself was very
likely unclickable this whole time, including in the original long-press
preview this replaces -- it was only ever verified via curl (the code
being live), never on an actual device. Fixed alongside this change.

The now-removed zoom-out/"fullscreen" button also took its atEdge runout
copy with it ("Zoom out and pick from the shelf" became "Pick from the
shelf"): `wallApi.zoomToFitAll()` still exists and still fires
automatically from `runoutGroove()`'s atEdge case, but there is no longer
a manual trigger for it in the UI.

## Record bags (INCREMENT-01 Phase 2): full remount instead of an in-place pool swap

DomeGallery (see above) has no API to change its `images` set on a mounted
instance; the only way to show a different pool is to unmount the React
root and mount a fresh one. `js/wall.js`'s `initWall()` return value gained
a `destroy()` method (clears its thread-position poll interval and calls
the compiled component's own `unmount()`); `js/main.js`'s `switchWallPool()`
fades `#wall-container` to 0 opacity, tears the old mount down, mounts the
new pool, then fades back in. This reads as a crossfade even though
structurally it is closer to "hide, replace, reveal" -- there is no true
cross-dissolve between the two pools' tile positions, since the new pool's
layout is unrelated to the old one's.

**"Camera snaps to whole rows and columns so no cover is ever cropped, at
any viewport" (DESIGN-SPEC §2a) is treated as already satisfied**, not
separately implemented: DomeGallery's own `fit`/`minRadius` sizing plus
`maxVerticalRotationDeg: 0` (locked, see above) already keep a fixed 5-row
band fully within the viewport with no vertical scroll possible, on any
bag or the user's own wall. A bespoke row/column-snapping carousel was not
built on top of it, since that would mean substantially reworking the
forked component's drag/inertia model without the ability to test it in a
real browser in this environment.

Any currently-playing "now playing" hero cover is retired (not settled)
before a bag switch, via the same `retireDisc()` used on sign-out, since
its cell may not exist at all in the pool being switched to. Playback
itself is untouched: only the visual disc/overlay is cleared, and the
album keeps playing through Spotify exactly as before.

## Records nearby (INCREMENT-01 Phase 2): needle-dropping an album that isn't on the current wall

Both Records nearby (Deezer-sourced) and record-bag albums can be
needle-dropped while the clicked album's cell does not exist on whatever
pool is currently mounted on the Wall (nearby albums are never part of any
mounted pool at all). `js/ceremony.js`'s `needleDrop()` originally
returned early with no visible effect at all if `wallApi.getCellRect()`
came back null, since the ceremony's cover animates from a real cell's
screen position. It now falls back to a small rect at the viewport centre
in that case, so the full ceremony still runs (disc, held breath, crackle)
rather than the button silently doing nothing. Everything downstream
(`recedeAllExcept`, `panToAlbum`, `enterRestingState`, `setCurrent`,
`markPlayed`, `getNeighbors`) already degraded gracefully for an
albumId absent from `wall.js`'s internal `byId` map before this change;
the missing-cellRect case was the only actual gap. One consequence: an
album finished this way always reports `atEdge: true` at runout (its
`getNeighbors()` is empty, since it is not part of the ranked pool), so
the wall zooms out to the full shelf afterwards rather than offering
physical-neighbour choices, which was judged the more sensible fallback
than picking arbitrary unrelated neighbours.

The CSP's `script-src` and `connect-src` were extended to include
`https://api.deezer.com` (needed for both the plain `fetch` attempt and
the `<script src=...>` JSONP fallback). No Deezer-hosted images are ever
used: album art always comes from the Spotify album the Deezer result
resolves to, so `img-src` did not need to change.

## Now-playing layout rework: no in-app header, settings live on Setup, new share card

A second Claude session (`claude.ai/code`, commit `911899c`) reworked this
same area of the app in parallel with INCREMENT-01, from the same base
commit; the two were merged together rather than one overwriting the
other. Where the two disagreed on placement, INCREMENT-01's explicit,
written Phase 3c requirement won (see below); everything else from
`911899c` was kept, adapted to the session/Past-sessions naming:

- The main screen's header row (wordmark + Record bag / New session /
  Crackle / Sign out) is gone. The groove mark now sits at the left of the
  top tab bar, with no site name next to it; the tab bar is the only
  chrome above the wall. This supersedes PRD F9 ("Settings (header,
  minimal) ... No settings page") and DESIGN-SPEC's header layout.
- "New session" moved to the Past sessions page's header.
- The crackle toggle moved to the Setup tab (a "Vinyl crackle" preference
  row with an On/Off button). The one-time hint copy changed accordingly:
  `CRACKLE ON · TOGGLE IN SETUP`, not "IN THE HEADER" as DESIGN-SPEC §3
  specifies.
- Sign out now exists only on the Setup tab (it was already there;
  the header duplicate was removed).
- The player bar is two rows: track, artist, and album name each get a
  full-width ellipsized line of their own above the controls/progress row,
  so long song names are no longer squeezed beside the controls. The
  "Playing on {device}" label is hidden at phone widths to keep the
  progress bar usable; the output-switcher and Records-nearby icons
  (INCREMENT-01 Phase 1/2, added after `911899c`) sit in that same row.
- Past sessions rows: the cover strip clips at the page width (`overflow:
  hidden`, no horizontal scrolling), and the session heading now includes
  the total running time of the session's albums when known, appended
  after the date (`SESSION 12 · 11 JUL 2026 · 48 MIN`). Durations are
  captured at needle-drop time (`journal.recordNeedleDrop()` stores
  `durationMs` from the prepared album context, renamed
  `journal.sessionDurationMs()`); entries recorded before this change have
  no duration and contribute 0, so old sessions may show a low total or
  none at all.
- **Where this diverged from `911899c`'s own choice:** that commit made
  export a prominent amber "Share this session" button inside the
  expanded session view. INCREMENT-01 Phase 3c explicitly specifies an
  icon-only share button on the *collapsed* row instead ("so sharing never
  requires expanding the session details... one share affordance per
  session, on the row"), which is what shipped; the prominent in-expanded-
  view button was not carried over.
- The share card (DESIGN-SPEC §4, and "Deliberate simplifications" item 4
  below, now superseded) was redrawn: the session's covers fill a square
  grid of 1, 4, 9, or 16 cells (smallest that fits; sessions beyond 16
  albums show the first 16; unused cells get a quiet vinyl placeholder),
  with the album count and total running time overlaid on a bottom
  gradient scrim so the text stays readable over any cover art. The
  played-order thread is no longer drawn on the card. This card is what
  INCREMENT-01 Phase 3b's native share (`navigator.share()`) now sends.

## The Wall is now the real react-bits DomeGallery, not the flat spiral grid in DESIGN-SPEC §2

Superseded by explicit direction from Yaron after initial ship, in two
steps. First pass: a hand-written CSS 3D sphere (framework-free, to avoid a
build step). Yaron tried it and said it didn't work well, and asked for the
actual pasted React/`shadcn` component instead. Second pass (current state):
the real `DomeGallery-TS-TW` component, fetched from the shadcn registry
(`reactbits.dev/r/DomeGallery-TS-TW.json`) and forked into
`gallery/src/DomeGallery.tsx` with four deliberate, minimal changes
documented at the top of that file (an `onImageClick` callback replacing
the built-in lightbox, a `focusOn`/`resetRotation` imperative handle, hand
CSS in place of the Tailwind classNames the original used, and a keyboard
Enter/Space handler the upstream component itself was missing despite
declaring `role="button"`). This required accepting a build step for this
one component: it compiles via an isolated Vite project in `gallery/` into
`js/dome-gallery.bundle.js` (React/ReactDOM/`@use-gesture/react` inlined, ~
196KB gzipped), which is committed to the repo and imported like any other
static file, so the deployed site itself still has no build step and
`Docs/CLAUDE.md`'s "deploy to GitHub Pages as-is" holds. Re-run
`npm run build` inside `gallery/` after editing anything in `gallery/src/`.

**Two structural constraints inherited from the upstream component, not
introduced by this integration:**

1. It is a hemispheric dome with clamped vertical tilt, not a true full
   sphere: horizontal drag (yaw) spins freely, but vertical drag (pitch) is
   always clamped to `maxVerticalRotationDeg`. `gallery/src/mount.tsx`
   locks this to `0` (matching the originally pasted example) so dragging
   vertically never reveals blank space above/below the tile band; an
   earlier version of this file briefly defaulted it to `45` at Yaron's
   request, then reverted to `0` at his follow-up request. It will never
   wrap top-to-bottom like a true globe with this component regardless.
2. It tiles a fixed grid of slots (`segments` columns x 5 rows) by
   cyclically repeating the provided `images` array. A pool smaller than
   the slot count (the common case: 9 to 120 albums against `segments=34`'s
   170 slots) shows each album more than once around the dome, and a pool
   larger than the slot count would silently drop albums (not currently
   possible at PRD's ~120-album pool cap, but would need a larger
   `segments` value if that cap ever changes).

**What changed in the surrounding app:** `js/wall.js` is now a bridge that
mounts the component and adapts its DOM to the same public API the rest of
the app already expected (`panToAlbum`, `markPlayed`, `getCellRect`, etc.),
so `ceremony.js`, `playback.js`, and `journal.js` needed no changes.
Consequences of the bridge:
- `getNeighbors()` (runout choices) can no longer mean "physical neighbours
  on a grid/sphere" since tiles repeat and have no stable adjacency; it now
  returns the 4 albums before and 4 after in the score-sorted pool instead.
- The per-cover hover caption (album/artist name) is gone; the component
  has no equivalent, though each tile still has an accessible name via
  `alt`/`aria-label`.
- `prefers-reduced-motion` does not reach the component's own drag/focus/
  inertia animations (they are fixed-duration, defined in
  `gallery/src/DomeGallery.css`, not this app's `--dur-*` tokens); it
  still applies to everything this app draws on top (the ceremony
  overlay, the journey thread).
- `spiralPosition`/`spherePosition` (this app's own pure layout function
  from the two earlier iterations) is gone; tile placement math now lives
  entirely inside the forked component, which was deliberately kept close
  to the vetted upstream source rather than re-exposed for unit testing.

Not yet seen in a real browser: drag feel and tile repetition at various
pool sizes. `maxVerticalRotationDeg` is a single number in
`gallery/src/mount.tsx` if it ever needs revisiting (rebuild after
changing it).

## Not yet verified against a live Spotify account (read this first)

Claude Code cannot complete Spotify's OAuth flow (per `Docs/SHOTS.md`: "Claude
Code cannot log into Spotify"), so nothing in this build has been exercised
against real API responses. All Spotify-facing code was written directly to
the documented Web API and Web Playback SDK contracts, and everything that
could be tested as a pure function was unit-tested (`tests.html`:
`spiralPosition`, `detectEndFromSdkStates`, `detectEndFromConnectSnapshots`,
149 assertions, all passing). But the following need your first real session
to confirm, and this file should be updated (or entries removed) once they
are:

- OAuth PKCE round-trip end to end, including the 403/redirect-mismatch error
  copy actually matching what Spotify returns in practice.
- Pool building against a real `/me/top/tracks` + `/me/albums` response shape
  and scoring that feels right subjectively.
- Web Playback SDK init timing (the 8s timeout may be too short or too long
  on a slow connection) and the Connect fallback device picker.
- End-of-album detection firing reliably on both paths for a real short
  album, per Shot 3's acceptance checklist.
- Whether Spotify's album art CDN responses actually carry CORS headers in
  practice for the share-card canvas (PRD F8 assumes they do; the
  typographic fallback exists specifically in case they do not, always).
- Everything added in INCREMENT-01 that touches a real device or a second
  API: silent desktop reconnect, the Android "Wake Spotify" round-trip, the
  output switcher's mid-session transfer, Deezer's actual JSON shapes for
  Records nearby (written to Deezer's documented API, not exercised
  against it), and native share's transient-activation timing on iOS
  Safari specifically.

## QA sweep against PRD edge cases

Code-reviewed against every edge case in `Docs/PRD.md`. Everything here is
implemented and internally consistent, but none of it has run against a real
Spotify account yet (see above), so treat "pass" as "pass on inspection."

| # | Edge case | Status | Where |
|---|---|---|---|
| 1 | 403 on `/me/top/tracks` | Pass | `js/albums.js` throws, `js/main.js enterApp()` shows exact copy-deck 403 message |
| 2 | Redirect URI mismatch | Pass | `js/auth.js completeAuthorization()` |
| 3 | Fewer than 9 albums (pad with singles); zero albums (sparse state) | Pass | `js/albums.js buildAlbumPool()` two-pass strategy, `SparseHistoryError` |
| 4 | No Connect devices found | Pass | `js/playback.js startConnectFallback()`, `js/main.js openDeviceModal()` |
| 5 | Token refresh failure: silent retry once, return to setup, keep journal | Pass | `js/auth.js getValidAccessToken()` single-flight refresh; sign-out is never called on this path, so the journal is untouched |
| 6 | Rate limit 429, honour Retry-After, bounded retries | Pass | `js/spotify.js apiFetch()`, max 2 retries |
| 7 | Restricted album (403 on play): mark unavailable, do not break the session | Pass | `js/ceremony.js needleDrop()` rethrows a failed `commitPlayback()`, `js/main.js handleNeedleDrop()` catch marks the cover unavailable and never calls `journal.recordNeedleDrop()` |
| 8 | Offline: detect, banner, resume gracefully | Pass (added late in the QA pass, see below) | `#offline-banner` in `index.html`, wired in `js/main.js` |
| 9 | Two tabs open: last writer wins, no journal corruption | Pass | `js/journal.js` never holds a long-lived in-memory copy; every mutator re-reads localStorage before writing |

Edge case 8 was missed in the first pass through Shots 1 to 4 and added
during this QA sweep: `js/main.js` now listens for `online`/`offline` events
and shows/hides the copy-deck banner. The existing polling and retry logic
already avoids hammering Spotify while offline (bounded retries, fixed
5-second Connect poll interval), so "pause polling" is satisfied by simply
not escalating rather than by an explicit stop/start of the interval timer.

## Deliberate simplifications

1. **Disc centre label colour.** DESIGN-SPEC §3 describes it as "rendered
   from the album art's dominant edge". This build uses a flat
   `--obsidian-2` fill instead of sampling the artwork, to avoid a second
   canvas/CORS dependency living inside a persistent per-cell SVG (as
   opposed to the one-shot canvas in `exporter.js`, where sampling would be
   cheap). Worth revisiting if it reads as flat in practice.

2. **End-of-album "near end" threshold (Connect path).** `ending.js` treats
   a track as "near its end" if less than 20 seconds or less than 10% of its
   duration remains. This is not specified by the PRD; it was chosen to make
   the heuristic robust to the 5-second poll interval. May need tuning
   against real playback.

3. **Brown noise synthesis.** The crackle bed is generated by leaky
   integration of white noise (`last = (last + 0.02*white) / 1.02`) rather
   than a true 1/f-shaped brown noise or a pre-rendered file. Chosen to avoid
   an AudioWorklet module (extra file, extra CSP surface) and to honour "no
   audio file asset" in PRD F6. Reworked per request (2026-07-12) to sound
   less like a robotic loop: the bed is now two independently-generated
   (and so naturally decorrelated) 8-second layers, highpassed/lowpassed
   and hard-panned apart via `StereoPannerNode` for width (falls back to
   mono if unsupported); ticks vary in loudness/frequency with an
   exponential decay envelope, an occasional lower "pop" thump alongside
   the usual high ticks, a random pan per hit, and occasional small
   clusters instead of one uniform sound at an even rate. Still no audio
   file. Not critically listened to on real speakers/headphones by an
   automated agent -- this environment cannot play or record audio, so the
   change is reasoned from known vinyl-noise synthesis technique, not
   auditioned.

4. **Share-card grid rounding.** Superseded by the layout rework above:
   the card no longer uses DESIGN-SPEC §4's 480px-hero-plus-224px-grid
   layout at all; it is now a uniform square grid of 1, 4, 9, or 16 cells.

5. **Mobile/iOS detection.** `playback.js` skips straight to the Connect
   fallback on iOS (including iPadOS, detected via
   `navigator.maxTouchPoints` on `MacIntel`) rather than attempting the SDK
   first, per PRD F7's "iOS Safari, mobile" fallback list. Android mobile
   browsers still attempt the SDK first since Chrome for Android has
   historically supported it. This is a coarse heuristic, not a feature
   test, because there is no reliable way to feature-detect "will the SDK
   actually initialise here" other than trying it.

6. **"Session {n} · now playing" / Past sessions ordinals.** These use the
   session's 1-based position in the lifetime journal (`journal.js`),
   computed at record time. If two browser tabs are open simultaneously and
   both start a new session, the "last write wins" rule (PRD edge case 9)
   means one tab's view of the ordinal can go stale until it next re-reads
   the journal.

## INCREMENT-01 summary (2026-07-12)

Everything above this line except the "Side renamed to Session" and "The
needle-drop cover now stays expanded" sections predates this increment.
INCREMENT-01 consolidated the app against `Docs/PRD.md` /
`Docs/DESIGN-SPEC.md` (updated to match throughout) across five phases,
each its own commit:

- **Phase 0.** "Side" renamed to "Session" everywhere including storage
  (journal v1 -> v2) and code, not just UI copy as before. "Record bag" now
  means only the curated collections added in Phase 2; the journal screen
  is "Past sessions".
- **Phase 1.** Setup screen reordered to real-world order (redirect URI
  copy first) with a mobile "send this page to your computer" notice.
  Silent desktop reconnect, Android "Wake Spotify" with a 15s device
  re-poll, and a persistent output-switcher icon on the player bar.
- **Phase 2.** A bag rail above the Wall ("YOUR WALL" plus six seed
  bags, `bags/*.json`, lazily resolved to Spotify via search and cached).
  Records nearby, a Deezer-sourced shelf of related albums (`js/nearby.js`),
  fetch-first with a JSONP fallback, hiding itself if unreachable.
- **Phase 3.** Liner notes removed entirely (journal v2 -> v3). Share
  became a native `navigator.share()` action (falling back to download)
  triggered from an icon on each session's collapsed row, pre-rendered
  ahead of the tap for iOS Safari's transient-activation window.
- **Phase 4 (this sweep).** Grepped clean for em/en dashes, glyph icons,
  leftover "side"/"record bag as journal"/"liner"/journal "note" usage;
  cross-checked every `getElementById` call against `index.html` and every
  relative JS import against the files on disk; confirmed `gallery/` and
  `tests.html` were untouched and need no rebuild/rerun. No live-browser or
  real-device verification was possible in this environment (no Spotify
  login, no real iOS/Android hardware); see the "Not yet verified" sections
  above and throughout this file for exactly what that leaves outstanding.

## Crates screen replaces the bag rail; Spotify playlists added (2026-07-12)

Per explicit request: the artist/genre search field and the record-bag
picker moved off the Wall entirely, onto a new dedicated "Crates" screen
(a fourth top tab, alongside Now Playing / Past sessions / Setup), and the
Wall's own "YOUR WALL" chip is renamed "Your Record Bag" throughout.

- **Why.** The bag rail + search form living directly above the Wall
  (`#bag-rail`, `#search-form` in `#screen-app`) had no room to grow: a
  horizontal chip strip does not scale to showing playlist cover art, and
  crowds the Wall itself. Moving the picker to its own screen leaves the
  Wall screen holding only a single small entry-point button (`#crates-btn`,
  labelled with whatever source is currently loaded) that opens it.
- **New: Spotify playlists as a Wall source** (`js/playlists.js`,
  `Docs/PRD.md` F13). The user's own playlists (owned and followed) render
  as cover-art cards on the Crates screen, resolved to real Spotify album
  pool entries the same way record bags are, tagged `playlistId` (mirrors
  `bagId`) so Past sessions can record which playlist a session came from.
  Unlike record bags, a playlist's own track objects already carry a full
  Spotify album object (`GET /playlists/{id}/tracks` with a `fields` filter
  inlining `track.album`), so no per-track search call is needed to
  resolve one -- just dedup and the existing album/EP filter. Capped at 4
  pages (200 tracks) per playlist. Resolved pools are cached per playlist
  keyed to the playlist's own `snapshot_id`, so an edited playlist
  resolves fresh automatically rather than serving a stale cache -- record
  bags have no equivalent staleness risk since their source JSON is
  static, so this is a genuinely new concern playlists introduce.
- **New OAuth scopes required.** `playlist-read-private` and
  `playlist-read-collaborative` were added to `js/auth.js`'s `SCOPES`.
  Scopes only take effect on a fresh authorisation, not a token refresh --
  anyone already connected before this change needs to sign out and
  reconnect once, or the Crates screen's playlists grid stays empty (the
  underlying 403 is swallowed by `loadMyPlaylists()`'s existing
  silent-fail convention, matching how record bags treat an unresolvable
  entry, so the empty-state copy explicitly suggests reconnecting rather
  than leaving the cause unexplained).
- **Restructured, not just moved.** `main.js`'s `renderBagChips()` /
  `renderBagRail()` (built `<button class="bag-chip">` elements in a
  horizontal scroller) were replaced with `renderCratesScreen()` /
  `buildCrateCard()` (cover-art cards in a CSS grid, `.crate-grid`).
  `selectBag()` gained a `showScreen('app')` at the end of a successful
  switch (previously the rail stayed in place since it lived on the same
  screen as the Wall); a new `selectPlaylist()` mirrors it. `performSearch()`
  does the same. Progress/error messaging that used to go through
  `wallPrompt` (invisible while the picker's own screen is showing, since
  `wallPrompt` lives on `#screen-app`) now goes through a new
  `#crates-status` element on the Crates screen itself.
- **Record bags now load lazily too, on the Crates screen's first open,**
  rather than eagerly at boot (`renderBagRail()` used to run right after
  the Wall itself finished loading). Bag manifest JSON is cheap (six small
  local files) so this barely changes load time, but keeps the loading
  behaviour of all three sources (bags, playlists, search) consistent:
  nothing about the picker is fetched until the user actually opens it.

## Setup screen copy simplified (2026-07-12)

Per explicit request: the tagline changed to "Listen to whole albums like
the artist intended."; the why-bring-your-own-app explanation dropped its
opening sentence ("Spotify no longer opens its API to independent apps, so
Longplayur can't offer a normal log-in.") and now opens directly with
"Create your own free Spotify app."; and the old step 01 ("Copy the
redirect URI") was folded into step 01 ("Create a Spotify app") instead of
standing alone, since copying the redirect URI is naturally part of the
same trip to Spotify's dashboard rather than a separate step before it.
The remaining steps renumbered down by one (redirect-URI-to-app is now
step 02, client ID is step 03); `README.md`'s "First-run setup" list and
`Docs/DESIGN-SPEC.md`'s copy deck were updated to match. The one cross-
reference to the old step 01 ("paste the redirect URI you copied in step
01") was reworded to "copied above" rather than a step number, since the
redirect URI copy widget no longer has a step number of its own.

## Dome duplicate covers, phone tile size, Past sessions overflow (2026-07-12)

Three fixes to how the Wall's DomeGallery actually renders, found on the
same live round of testing:

- **Far fewer duplicate covers.** `gallery/`'s `segments` prop (the
  dome's column count) was left at a fixed default (34 columns * 5 rows
  = 170 slots) regardless of pool size -- a 40-album search pool tiled
  into 170 slots meant most albums repeated roughly 4 times, confirmed
  as visibly excessive on live testing even after the earlier
  shuffled-full-passes fix (which only ever addressed adjacent-slot
  duplicates within one lap, not the total repeat count). `segments` is
  a legitimate configurable prop on the component, not something that
  needed a `gallery/` rebuild to change: `js/wall.js`'s new
  `segmentsForPool()` sizes it to the actual pool (one column per 5
  images, DomeGallery's own fixed row-count-per-column, rounded up,
  clamped between 4 and the original 34), so the dome only ever needs
  enough duplicates to complete its last partial column rather than to
  fill a fixed grid sized for the largest possible pool regardless of
  how many albums are actually showing.
- **Smaller album tiles on phones.** DomeGallery clamps its computed
  radius (viewport basis * `fit`, naturally ~300-350px on a typical
  phone width) up to a `minRadius` floor if that computed value comes in
  smaller -- `mount.tsx`'s default (900px) is tuned for desktop, so on a
  phone it was overriding the naturally smaller radius upward to 900px
  regardless, forcing noticeably bigger tiles than the screen actually
  called for. `js/wall.js`'s new `domeMinRadius()` uses a much lower
  floor (280px, chosen to sit below the naturally computed radius for
  essentially all phone widths) below the same 480px breakpoint
  `styles.css` already uses elsewhere, so the naturally smaller,
  viewport-appropriate radius passes through unclamped on a phone
  instead of being forced up to the desktop value. Computed once at
  mount time (pool switch or boot), not on live resize/rotation, since
  the dome has no exposed prop-update path once mounted.
- **Past sessions mini-covers strip.** `.session-strip` was a single
  non-wrapping flex row relying on `overflow: hidden` to clip covers
  that did not fit, on the stated assumption that clipping (never a
  horizontal scrollbar) was an acceptable trade-off. Live testing found
  covers visibly continuing past the right edge of a phone screen
  regardless, pushing the row's own share button out of view without
  horizontal scrolling. Changed to `flex-wrap: wrap` so every cover in a
  session stays visible across as many rows as needed, removing the
  `overflow: hidden` clipping entirely. The trailing `.session-thread`
  bar (a 1px amber line filling the remaining space after the last
  cover, meant to visually suggest a connecting thread) no longer made
  sense once covers wrap onto multiple rows, so it was removed rather
  than left to render oddly at the end of whichever row happens to be
  last; `Docs/DESIGN-SPEC.md`'s Past sessions description was updated to
  match.

## Dome tile size: the real fix (segments-aware radius) (2026-07-12)

The previous entry's `minRadius` correction (a fixed 550px floor on
phone) was itself wrong, confirmed live almost immediately: record bags
other than the user's own pool started rendering "huge, only 2 on
screen." Root cause was a coupling between that entry's two changes that
went unnoticed until live testing on a genuinely small pool: DomeGallery
derives each tile's on-screen width as `(radius * PI) / segments`
(`--item-width`, `DomeGallery.css`). `segmentsForPool()` correctly varies
`segments` with pool size (fewer segments for a small record bag), but
`minRadius` was left as a *fixed* value independent of segments -- so for
a small bag (few segments), the same radius divided by a smaller number
produced a much larger tile, while a large pool (the user's own wall, many
segments) produced smaller tiles. Both symptoms (bags "huge", phone tiles
"too small" on a big pool) were the same bug from opposite ends.

`wall.js`'s `domeRadiusForSegments()` replaces the fixed floor: it solves
for the radius that keeps tile width at a fixed target (90px desktop,
55px phone -- the desktop figure chosen to match the original always-900px
setup's own effective tile size, ~83px, since desktop tile size was never
reported as wrong) regardless of how many segments a given pool needed,
so a small record bag, a search result, and the full wall now all render
comparably sized tiles. `ABSOLUTE_MIN_RADIUS` was dropped from 200 to 50,
since 200 would have clobbered the formula's own correct output for the
smallest phone case (70px, `MIN_DOME_SEGMENTS`'s floor of 4 segments) --
`MIN_DOME_SEGMENTS` already keeps the formula-driven radius sane on its
own, so this floor is now purely defensive against a pathological
near-zero value rather than a real constraint.

Honestly: none of this was verified against a live browser or a real
phone in this environment (no way to render the actual dome), only worked
out from the component's own documented CSS formula and confirmed-live bug
reports from the two prior rounds. Further live testing may still need
one more adjustment to the two target pixel values.

## Small copy/UX changes, per explicit request (2026-07-12)

- Share card headline changed from "A session, played in full." to
  "Albums, played in full." (`js/exporter.js`).
- The "Crates" tab/screen renamed to "Record bags" throughout user-facing
  text (`index.html`, `README.md`, `Docs/PRD.md`, `Docs/DESIGN-SPEC.md`).
  Internal identifiers (`tabCrates`, `renderCratesScreen()`,
  `#screen-crates`, etc., `js/main.js`) were left as plain internal names
  rather than renamed to match, per `Docs/CLAUDE.md`'s convention that
  internal names stay plain regardless of user-facing vocabulary.
- The Setup screen's "Send this page to your computer" copyable-link
  well (`#send-to-computer`, shown only on mobile user agents) removed
  entirely, along with its `main.js` wiring (`isMobileDevice()`,
  `copyPageUrlBtn`) -- flagged as visually duplicating the redirect-URI
  copy well directly below it in the same step. `README.md`'s "First-run
  setup" list updated to drop the now-false claim that Longplayur offers
  a copyable link on mobile. `Docs/PRD.md`'s F2 scope list was also found
  stale while making this pass (missing the `playlist-read-*` scopes
  added earlier the same day) and corrected.

## Record bag cards show a 9-album preview grid (2026-07-12)

Per explicit request: record bag cards on the Record bags screen, which
previously showed a blank placeholder (unlike playlist cards, which
already had Spotify's own playlist cover art to show), now show a 3x3
grid of up to 9 of that bag's own resolved covers.

Showing a preview means resolving a bag's albums (`bags.js`'s
`resolveBag()`, one search call per album) is no longer purely deferred
to selection -- it now also runs the first time that bag's card is shown.
Doing this for all six seed bags at once risked exactly the request-volume
mistake `js/search.js` already got burned by earlier the same day (a live
429): `resolveBag()`'s own `Promise.all` over up to 25 albums was
unthrottled, and firing that for six bags simultaneously would have
stacked into a much larger burst. Fixed the same way search.js was: a
`mapWithConcurrency()` throttle inside `resolveBag()` itself (4 concurrent
searches per bag), and `main.js`'s new `loadBagPreviews()` resolves bags
one at a time rather than all six in parallel, accepting a slower
progressive fill-in on a cold cache in exchange for bounded peak
concurrency. Every bag's resolution is still cached exactly as before
(`localStorage`, keyed per bag), so this cost is paid once ever per bag,
not on every visit to the screen.

## The actual duplicate-covers bug: spatial, not array, adjacency (2026-07-12)

Reported live: "Your Record Bag" (the user's own pool, up to 120 albums,
segments up to 24) rendered fine, but every other record bag (15-25
albums, segments 4-5) showed two tiles with the same cover visibly
adjacent -- "crossing each other". Identified with evidence, not assumed:
a Node simulation of `gallery/src/DomeGallery.tsx`'s `buildItems()`
exactly as it existed after this same day's earlier "fewer duplicates"
fix found 45-1399 genuinely adjacent duplicate pairs per 200 independent
builds for pool sizes of 18, 15, and 5 images at 4 columns, versus zero
for 120 images at 24 columns -- reproducing the reported symptom
precisely along the same fault line the user described (small
bag-sized pools broken, the large default pool fine).

Root cause: the existing "shuffled full passes" anti-duplicate logic
(added earlier this session) only ever compared ARRAY-adjacent indices
(`usedImages[i]` vs `usedImages[i-1]`). Because `coords` is built column
by column, that happens to catch same-column vertical neighbours, but
never checks a tile against its neighbour in the NEXT column at all --
the exact case that produces two angularly-adjacent tiles with the same
cover. This gap existed since the original "fewer duplicates" fix and
was invisible in the 34-column default (few of a 34-column dome's tiles
are ever the *same* image close together, since duplicates are rare
relative to slot count), and stayed invisible at the large end after
this session's segments-per-pool change (a 120-image, 24-column dome
has the same property) -- it only became visible once pools with far
fewer slots relative to columns (the 4-5 column floor for small record
bags) started actually being used.

Fixed in two parts, both verified by simulation before and after (the
`Math.abs(coord.y - y) <= 1` check in the rebuilt `js/dome-gallery.
bundle.js` was confirmed present post-build by grepping the minified
bundle for that literal comparison, since identifier names don't survive
minification): (1) `buildItems()` now checks each tile's true spatial
neighbours (same column above/below, plus the nearest row(s) in the
columns either side -- accounting for the honeycomb row offset between
even/odd columns -- including the wrap-around seam between the first and
last column, which needs no special-case handling since column 0 is
always assigned before the last column regardless of the circular
adjacency); (2) because a single forward-only swap pass can still run out
of later slots to swap into right at the end of the fill, `buildItems()`
now retries a fresh shuffle+repair (up to 20 attempts, keeping whichever
attempt has the fewest remaining conflicts) rather than accepting the
first attempt outright. Simulated to zero remaining adjacent duplicates
across 100+ independent builds each for pool sizes of 5, 15, 18, 25, and
120 images (matching a sparse bag, typical bags, and the largest wall) --
the only case that cannot reach zero is a pool with fewer unique images
than a single column has rows (5), where no shuffle of an inherently
too-small pool can avoid every repeat; that is an honest, unavoidable
limit of the source pool, not a bug. Rebuilt via `cd gallery && npm run
build`; confirmed the built module still exports only `mountDomeGallery`
and contains no leaked `process.env` references.
