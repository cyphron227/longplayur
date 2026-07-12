# Known deviations

Per `Docs/CLAUDE.md`'s honesty rule: this file records where the implementation
differs from the letter of `Docs/PRD.md` / `Docs/DESIGN-SPEC.md`, and any
assumptions made without the ability to verify against Spotify's live
behaviour.

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
also fire for plain taps). A long-press feature was added the same way
(`onLongPress`/`onLongPressEnd`/`longPressMs` props): holding a tile shows
a quick, lightweight preview of its cover, name, and artist via
`showLongPressPreview()`/`hideLongPressPreview()` in `js/ceremony.js` (no
disc, no crackle, no camera pan, no dimming the rest of the wall, unlike
the full ceremony) -- distinct from the "now playing" hero cover, and the
two can coexist on screen if you long-press something else while a
session is playing. The component's own file header now documents seven
deliberate changes from the upstream source in total.

The now-removed zoom-out/"fullscreen" button also took its atEdge runout
copy with it ("Zoom out and pick from the shelf" became "Pick from the
shelf"): `wallApi.zoomToFitAll()` still exists and still fires
automatically from `runoutGroove()`'s atEdge case, but there is no longer
a manual trigger for it in the UI.

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
| 7 | Restricted album (403 on play): mark unavailable, do not break the side | Pass | `js/ceremony.js needleDrop()` rethrows a failed `commitPlayback()`, `js/main.js handleNeedleDrop()` catch marks the cover unavailable and never calls `journal.recordNeedleDrop()` |
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
   audio file asset" in PRD F6. Sounds close to brown noise but has not been
   critically listened to on real speakers/headphones.

4. **Share-card grid rounding.** DESIGN-SPEC §4 specifies a 480px first
   cover "spanning columns 1 to 2" inside a 4-column, 224px-cell grid across
   a 952px content width; those two numbers do not divide evenly. This build
   uses the literal 480px and 224px values and computes the grid gap to fill
   the remaining width, rather than deriving cover 1's size from the column
   math. The visual difference is a few pixels.

5. **Mobile/iOS detection.** `playback.js` skips straight to the Connect
   fallback on iOS (including iPadOS, detected via
   `navigator.maxTouchPoints` on `MacIntel`) rather than attempting the SDK
   first, per PRD F7's "iOS Safari, mobile" fallback list. Android mobile
   browsers still attempt the SDK first since Chrome for Android has
   historically supported it. This is a coarse heuristic, not a feature
   test, because there is no reliable way to feature-detect "will the SDK
   actually initialise here" other than trying it.

6. **"Side {n} · now playing" / record bag ordinals.** These use the side's
   1-based position in the lifetime journal (`journal.js`), computed at
   record time. If two browser tabs are open simultaneously and both start a
   new side, the "last write wins" rule (PRD edge case 9) means one tab's
   view of the ordinal can go stale until it next re-reads the journal.
