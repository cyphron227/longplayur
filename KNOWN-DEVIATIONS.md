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
