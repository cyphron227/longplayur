# Known deviations

Per `Docs/CLAUDE.md`'s honesty rule: this file records where the implementation
differs from the letter of `Docs/PRD.md` / `Docs/DESIGN-SPEC.md`, and any
assumptions made without the ability to verify against Spotify's live
behaviour.

## Credits "never found": three compounding bugs, none of them verifiable live here (2026-08-08)

Reported live: opening the Credits disclosure on any album never finds anything. This build environment's network egress is allowlisted and does not include `musicbrainz.org` (confirmed by directly querying it: `CONNECT` is rejected with a 403 by the proxy, and the same domain is explicitly blocked when fetched through the web-fetch tool too), so none of this could be checked against the real API the way this project's own convention would prefer -- everything below is diagnosed from code review and documented MusicBrainz API behaviour, not confirmed live. Flagging that plainly rather than presenting it as verified.

Found three compounding issues, worth fixing together since any one of them alone could plausibly explain "always empty":

1. **The credits lookup was searching MusicBrainz for an artist literally named "A, B".** `ceremony.js`'s `buildCreditsDisclosure()` passed `entry.artist` straight through to `getAlbumCredits()`, but pool entries build that field as every credited artist joined with `", "` (`(album.artists || []).map(a => a.name).join(', ')`). A MusicBrainz `artist:"..."` search for a comma-joined multi-artist string essentially never matches a real artist entity. This is the same bug genre lookups already had to fix (`flip.js`/`runout.js`'s own `.split(',')[0].trim()`) -- credits never got the equivalent fix. Now takes only the first credited artist, same as everywhere else in this app that queries MusicBrainz by name. Any album credited to a single artist was unaffected by this specific bug, but see 2 and 3 below.

2. **An exact title match was too strict for how often Spotify and MusicBrainz titles differ.** `findReleaseGroup()` required MusicBrainz's confidence score >= 90 *and* an exact normalised-title match. Spotify routinely appends an edition/remaster qualifier MusicBrainz's own canonical release-group title does not carry, or vice versa ("Rumours (Remastered)" vs "Rumours"), and a bare punctuation/case normalisation does not account for that. Added `coreTitle()`, which strips a small, explicit list of common qualifier words in parentheses/brackets (remaster, deluxe, edition, anniversary, bonus, reissue, remix, mono/stereo, etc.) before comparing, and accepts either the exact match or the qualifier-stripped one. The score threshold itself is unchanged -- this widens what counts as "the same title", not how confident the match has to be.

3. **Release-level relationships are the wrong place to look for most production credits.** `findRelationCredits()` only ever fetched `GET /release/{id}?inc=artist-rels` -- relationships attached to the *release* as a whole. In practice, MusicBrainz data overwhelmingly attaches producer/engineer/mixing credits to individual *recordings* (tracks), not the release; this was flagged as a deliberate scope simplification when Phase 4 first shipped, but its real-world impact looks to have been underestimated -- for most albums this alone would mean release-level relationships come back empty regardless of how good MusicBrainz's actual credit data is. Now also fetches `GET /release/{id}?inc=recordings+recording-level-rels` and aggregates each track's own recording-level relationships alongside the release-level ones. This is a second, best-effort request wrapped in its own `try`/`catch`: if the include token doesn't do what the MusicBrainz API docs describe (unverifiable here), or the request fails outright, whatever release-level credits the first request already found still stand rather than the whole lookup failing.

Also bumped the credits cache key prefix (`lp_mbcredits_` -> `lp_mbcredits_v2_`): every album a listener had already tried before this fix was cached as a confirmed "no credits found" miss for the existing 30-day TTL, which would have kept masking the fix for exactly the albums it was reported against. Added one diagnostic `console.info` (fires only on an unconfident match, listing the actual top candidate and its score) so a future "why didn't this specific album match" question is answerable from the browser console instead of a total black box, given the inability to reproduce this live from here.

Verified functionally with mocked MusicBrainz network responses (multi-artist splitting, qualifier-stripped title matching, recording-level credit aggregation, and graceful degradation when the second request fails) -- not against the real API, for the reason stated above.

## By album's real bug, and a genre sort, both from live use (2026-08-08)

Reported right after the three-phase plan above shipped: "By session" and
"By album" looked identical, with keeper/spin-again/pass icons showing up
somewhere the listener didn't expect them.

### The actual bug: `.past-sessions-list` never hid

Root cause was a missing companion rule, the same class of bug this file
has already recorded once for a different element (`.flip-view[hidden]`'s
own comment explains why): `.past-sessions-list { display: flex; ... }`
is an author-origin CSS rule, and author rules always beat the browser's
own `[hidden] { display: none }` default, regardless of selector
specificity -- there is no author-origin `.past-sessions-list[hidden]`
rule undoing that, unlike `.flip-view`, `.crate-shelf`, `.bag-detail-view`,
`.sessions-albums-view`, `.nearby-shelf`, and `.modal`, which all already
have one. `setSessionsMode('albums')` calls `hide(pastSessionsList)`,
which sets the `hidden` attribute correctly, but the element stayed
visually `display: flex` regardless, stacked underneath the new By album
list. This existed from the moment By album shipped, since nothing had
ever tried to hide `.past-sessions-list` before that toggle existed.

The reported symptoms are both fully explained by this one bug: the two
views looked the same because both were rendering at once, and the
keeper/spin-again/pass icons appearing "by albums" were always the
By-session view's own entry-tag buttons (`renderSessionRow()`, unchanged,
never present in By album's own row-building code) bleeding through from
the still-visible list underneath. Fixed with the same one-line pattern
as the others: `.past-sessions-list[hidden] { display: none; }`.

### A real request, added: genre sort

By album's sort was recent/artist A-Z/most played; a genre sort was asked
for directly. Added the same way Flip's own genre sort works: a persistent
`albumId -> genre` map, filled in the background via `flip.resolveGenres()`
(so it reuses Flip's own resolver and, underneath that, `ceremony.js`'s
existing 30-day genre cache -- no second genre-fetching path), with
sticky group headers the same way alpha sort already had them. Needed one
small addition to the journal entry itself: `artistId` (genre resolution
needs an artist id, not just a name, to check Spotify's own genre field
first) was never stored, the same gap `uri` had before the previous
entry's fix. Stored going forward, purely additive; entries recorded
before this simply show "Unknown" for genre, the same honest degradation
Flip already gives an artist with no resolvable genre.

## From played to complete: Sort/Show split, By album, Bag detail (2026-08-08)

Three phases from a proposed plan (an artifact shared for review, then approved), in one pass, per explicit request ("go ahead"). All three are built entirely on `journal.js`'s existing lifetime history -- no second played/unplayed store anywhere.

### Phase 1: Flip's "Recently played" was a sort, not a filter

Reported live as a bug ("if you click show recently played it shows all the albums"). It was working exactly as built: `flip.js`'s `RECENT` was one of four *sort* modes, and sorting never removes anything -- unplayed albums simply sank to the bottom of the list. `UNPLAYED` was the only real filter, folded in as if it were a fifth sort mode, which is what made `RECENT` read as broken by association: one chip row was doing two unrelated jobs.

Fixed by actually separating them, not by relabelling: `SORT_MODES` is now `{ALPHA, GENRE, RECENT}` only (`sortPool()` only ever reorders); a new `SHOW_MODES` (`{ALL, UNPLAYED, LISTENED}`) and `filterByPlayed()` handle inclusion (only ever removes, never reorders). `LISTENED` is new -- there was previously no way to see only what you've played at all. Flip's markup is now two chip rows ("Sort" / "Show"), each with its own small deadwax label so which is which is never ambiguous again. Empty-state copy is specific to why the list is empty (a search with no match, vs. genuinely nothing listened to yet, vs. everything already listened to).

### Phase 2: Past sessions gains a second lens, By album

A mode toggle (same pattern as Spin/Flip) adds "By album" alongside the existing chronological "By session" log: every album ever played through Longplayur, deduplicated, searchable, and sortable (most recent, artist A-Z, most played). Built almost entirely on data that already existed: `journal.playedEntriesNewestFirst()` was already written (for Runout groove's "Played before" direction) and simply had no screen of its own; `lastPlayedAtByAlbum()` is reused as-is; the only new journal export is `playCountsByAlbum()` (a per-album tally across the whole lifetime journal, for the "Most played" sort). Rows reuse Flip's own `.flip-row`/`.flip-letter-head`/`.flip-empty` styling verbatim rather than a new component -- it is the same kind of list, just a different source.

**A real bug found and fixed along the way, not part of the original ask:** `playedEntriesNewestFirst()`/`keeperEntriesNewestFirst()` returned entries with no `uri` field (the journal only ever stored `albumId`, never the Spotify URI), while `commitPlayback()` requires `currentContext.entry.uri` to actually start playback. Tapping a row here would have called Spotify's play endpoint with an undefined `context_uri`. This also means Runout groove's existing "Played before" and "From your crate" directions (INCREMENT-03 Phase 3) very likely had the same bug already, silently, since they consume the same two functions -- not verified live, since it was caught by inspection while building this feature rather than reported, but the code path is identical. Fixed at the source: `recordNeedleDrop()` now stores `uri` on every new entry (purely additive, no migration, same treatment `bagId`/`playlistId`/`source` already got), and both functions fall back to `spotify:album:{id}` for entries recorded before this shipped -- not a guess, Spotify's actual deterministic URI format, so every entry either function returns is now genuinely playable regardless of when it was recorded.

### Phase 3: Bag detail, a completion view

Opening a record bag or playlist card on the Record bags screen now opens a detail view first, instead of committing straight to the Wall. Every album in that bag/playlist renders as a small cover: amber-ringed and full opacity if played, dimmed to 70% if not (the exact values already used by the Wall's own zoom-out, `.item__image.is-played` / `body.wall-zoomed-out .item__image`, copied rather than reinvented), with a `deadwax` "X of N played" count in moss (this app's existing colour for a quiet positive status, e.g. the device note and the streak badge). "Play this bag" commits the whole thing to the Wall exactly as a card click used to; tapping any individual cover does the same and then needle-drops that specific album directly (calling the pre-existing `selectBag()`/`selectPlaylist()`, a new entry point into them, not new commit logic).

Deliberately does **not** cover New arrivals, search results, or Your Record Bag itself: none of those is a stable, named list of albums the way a bag or playlist is (New arrivals changes as new releases appear; a search result and Your Record Bag are not really "collections to complete" in the sense a curated bag or a chart, like the two Cool Guide bags, is).

**Scope note:** the proposed plan's Phase 4 (the same "X of N played" count as a badge on the card itself, before opening detail) and Phase 5 (grouping By album by genre/source) were both explicitly deferred as optional -- Phases 1 to 3 alone were judged to be the complete original ask (fix the bug, one list of everything played, one completion view per bag), and shipped as one pass; 4 and 5 remain available on request.

Verified functionally throughout (mocked Spotify network responses via Playwright, real `resolveBag()`/journal calls, real DOM interaction) rather than against a live account, per this file's own repeated caveat.

## Two "Cool Guide" chart bags, transcribed from a screenshotted ranking (2026-08-08)

`bags/cool-guide-top-1-25.json` and `bags/cool-guide-top-26-50.json` (25
albums each, `category: "seed"`) per explicit request, sourced from two
screenshots of a "Cool Guide" fan-made album ranking chart (user/critic
scores, dated May 2025 per the images' own caption). Titles were
transcribed as given, with the chart's own abbreviations expanded to
their full album titles for search accuracy ("TRAFOZSATSFM" -> *The Rise
and Fall of Ziggy Stardust and the Spiders from Mars*, "TVU&N" -> *The
Velvet Underground & Nico*, "LYSFLATH" -> *Lift Your Skinny Fists Like
Antennas to Heaven*). `category: "seed"` rather than a new dedicated
shelf: these are neither a mood nor a decade, and no chart/ranking shelf
exists on the Shelves screen, so they render alongside the original six
under "Your record bags", the same fallback every unrecognised category
already gets. Not vetted beyond a re-read of the transcription against
the screenshots; no album-by-album search-resolution check against a
live Spotify account was possible in this environment (see this file's
own repeated caveat on that).

## The 80s decade bag, and the transport rewritten on react-h5-audio-player (2026-07-26)

### The 80s

`bags/the-80s.json` (20 albums, `category: "decade"`) fills the one
remaining gap the previous session's 2000s/2010s addition left on
purpose. `bags.js`'s `BAG_IDS` now reads 60s, 70s, 80s, 90s, 2000s, 2010s,
2020s -- the full run, in chronological order, per explicit request. Same
caveat as every other non-seed bag: first draft, content authoring from
general knowledge, not yet vetted by the project owner.

### Records nearby ("similar albums") invisible behind the player bar on a phone

Reported live: opening it appeared to do nothing on an Android layout.
Root cause, confirmed by measuring the actual rendered geometry
(Playwright, a 390x844 mobile viewport): `#screen-app`'s phone-width media
query takes the player bar out of flex flow (`position: fixed`, so it
always sits above whatever else is on screen) but left `.nearby-shelf` a
plain static-flow sibling, unpositioned. With the player bar no longer
reserving its own space in the flex column, `.nearby-shelf` rendered
starting exactly where the fixed player bar's own 140px zone begins --
underneath it optically (a positioned element beats a static one
regardless of DOM order) and then clipped outright by `#app`/`#screen-app`'s
`overflow: hidden`, since the flex column's total content height now
exceeded the viewport. Fixed the same way `.crackle-hint` already handles
this: anchor `.nearby-shelf` to the viewport in its own right on a phone,
directly above the player bar, at a higher z-index. See `styles.css`'s
own comment on the fix for the full reasoning.

### The transport, rebuilt on react-h5-audio-player

Per explicit request. The player bar's markup, styling, and event wiring
were hand-rolled vanilla JS/CSS; they are now a `react-h5-audio-player`
component (`transport/`, a new isolated Vite build following the same
pattern `gallery/` already established for the Wall's dome -- compiles to
`js/transport.bundle.js`/`.css`, committed like the gallery bundle is, no
runtime build step for deployment).

The one thing this could not do literally: `react-h5-audio-player` is
built around a real `<audio>` element with a real media `src` -- it plays
the file itself, and its default progress bar, current-time/duration
labels, and play/pause button all read that element's own state.
Longplayur has no such thing to give it. The Web Playback SDK renders
Spotify's audio itself, inside the browser but outside any `<audio>` tag
this page controls; Spotify Connect mode plays on a remote device
entirely outside this tab. There is no audio stream URL this page can
legally or technically hand to a local `<audio>` element (Spotify's API
does not expose one). Mounting the library with a real-looking fake `src`
was rejected: it would either silently fail to load (broken/misleading
`<audio>` state) or, worse, actually try to play something.

So `transport/src/Transport.tsx` mounts `<AudioPlayer>` with no `src` at
all, and every interactive part -- play/pause, previous/next, the
progress fill, the elapsed/total labels, the device-switch and Records
nearby buttons -- is a custom element supplied through the library's
`customControlsSection` override rather than its own `RHAP_UI` defaults,
driven entirely by the same view-model shape `playback.js`'s
`onPlayerBarUpdate` already produced for the old hand-rolled bar
(`trackName`, `artistName`, `albumName`, `albumArt`, `isPlaying`,
`elapsedMs`, `totalMs`, `deviceName`, `mode`). `customProgressBarSection`
is passed empty and hidden via CSS, rather than split across the
library's own progress/controls halves, both of which assume real audio
metadata driving their layout. Button icons reuse the app's existing
shared SVG sprite (`<use href="#icon-x">`, resolved against the whole
document regardless of which subtree it's referenced from) rather than
the library's own default icon set, which is sourced from Iconify by
name and would otherwise require a runtime fetch to `api.iconify.design`
-- blocked by this app's CSP (`connect-src`/`script-src` are both a fixed
allowlist) and undesirable even if it weren't. `hasDefaultKeyBindings` is
turned off for the same reason as the missing `src`: the library's
built-in arrow-key seek/space-to-toggle bindings operate on the real
(absent) `<audio>` element and would be silent no-ops at best.

Net effect: the transport looks and is structured like a
`react-h5-audio-player` instance (its container/header/controls-section
class names and responsive layout scaffolding are genuinely in use, and
its CSS is restyled with this app's own colour tokens rather than its
default light skin), but essentially none of its own audio-handling
logic runs -- Longplayur's playback state has always lived in
`playback.js`, and still does. Functionally this is a like-for-like swap:
tapping any control still calls exactly the same `playback.js`/`main.js`
functions the old bar's buttons called (`skipPrevious`, `skipNext`,
`togglePlayPause`, `handleResurfaceNowPlaying`, the device-switch modal,
Records nearby), and `updatePlayerBar()` still drives the visible state
from the same `onPlayerBarUpdate` callback -- only the DOM/CSS producing
the bar changed. Verified functionally with mocked view-model updates and
real clicks under Playwright (both a desktop viewport and an Android
user agent/viewport), not against a live Spotify account, matching this
project's own established caveat for anything that cannot be exercised
without one.

## Two more decade bags: the 2000s and 2010s, per explicit request (2026-07-26)

`bags/the-2000s.json` and `bags/the-2010s.json` (20 albums each, `category:
"decade"`) fill the gap between the existing "The 90s" and "The 2020s"
bags. `bags.js`'s `BAG_IDS` lists the decade bags in chronological order
(60s, 70s, 90s, 2000s, 2010s, 2020s), which is also their render order on
the Shelves screen, since `loadBagManifest()` resolves them via
`Promise.all` over that same array and `Promise.all` preserves input
order regardless of which request actually finishes first. The 80s
remains absent, per no request to add it; not adding it was a deliberate
scope decision, not an oversight. Like the earlier eight, these two are a
first draft (content authoring, assembled from general knowledge, not
reproduced from any published list) and not yet vetted by the project
owner.

## Two more bugs from live use: resurfacing "did nothing", Wake Spotify on every open (2026-07-26)

### "Now playing doesn't load" when tapping the player-bar art: `pendingEntry` was the wrong source of truth

Reported live, right after the player-art resurface feature shipped:
tapping it sometimes did nothing at all. Root cause: `handleResurfaceNowPlaying()`
(and, it turns out, the earlier `handleRunout()` fix from the same
session) both used `pendingEntry` as a stand-in for "the entry that is
currently playing". `pendingEntry` is not that -- it is set the instant
*any* selection preview opens (`handleSelectAlbum()`'s very first line),
and critically is **never reset** if that preview is then dismissed
("Find something else") without playing. So the sequence that broke it:
album A is playing (`currentAlbumId` = A); the listener taps a *different*
cover, B, previewing it; they dismiss B without pressing Play. At that
point `pendingEntry` = B, but the actually-playing album is still A.
Tapping the player-bar art then compared `pendingEntry.id` (B) against
`currentAlbumId` (A), found a mismatch, and silently did nothing -- exactly
the reported symptom. The same stale-pointer risk existed in
`handleRunout()` already, just less likely to be hit by chance (it needs a
dismissed preview to land in the narrow window before the *previous*
album's runout fires).

Fixed with a dedicated `currentPlayingEntry` variable in `main.js`, set
only at the one point a needle drop actually **commits** (immediately
after `currentAlbumId = entry.id;`, in both `handleNeedleDrop()` and
`handleSelectAlbum()`), never by a preview merely opening. Both
`handleRunout()` and `handleResurfaceNowPlaying()` now read this instead
of `pendingEntry`, which keeps its original, narrower meaning ("the entry
a device-picker resume should hand back to `handleNeedleDrop()`" -- see
`openDeviceModal()`'s own device-click handler, the one place `pendingEntry`
is still the genuinely correct thing to read).

### "Wake Spotify" appearing on every app open, whether or not it was needed

Reported live: the no-devices-found modal (with its Android "Wake Spotify"
button) popped up immediately on opening the app, even when the listener
had no intention of playing anything yet, and often wasn't actually stuck
(Spotify would have been reachable once they tried). Root cause:
`playback.js`'s `startConnectFallback()` -- which every iOS/mobile boot,
and any desktop boot where the SDK failed to initialise, goes through --
called `handlers.onNeedDevicePicker?.([])` unconditionally the moment
`GET /me/player/devices` came back empty, before the listener had done
anything at all. A `GET /me/player/devices` call returning nothing is
extremely common right after opening the app (Spotify simply isn't
already playing anywhere), so this fired on essentially every load using
Connect mode.

Fixed by deferring the whole "what do we do about zero or several
devices" decision from boot time to the moment a play is actually
attempted. `startConnectFallback()` now only acts on the one unambiguous
case at boot -- exactly one device found, silently claimed, the same way
the SDK path's own silent desktop reconnect already works without asking
-- and does nothing for zero or several. A new `NoActiveDeviceError`
(exported from `playback.js`) is thrown from `commitPlayback()` instead,
at the moment of a real play attempt, after a **fresh** device check
(not the boot-time snapshot, since the listener may well have opened
Spotify elsewhere in the meantime): if that fresh check finds exactly one
device, it is silently claimed there instead, mid-play, with no prompt at
all; zero or several throw `NoActiveDeviceError(devices)`, which
`handleNeedleDrop()`/`handleSelectAlbum()` catch and only then open the
device picker (Wake Spotify included, on Android, exactly as before) --
now genuinely only when there is a real decision blocking a real play
attempt. `onNeedDevicePicker` (the handler `initPlayback()` used to call
this through) had no callers left after this change and was removed
rather than left wired to nothing.

**Verified against mocked network responses** (again, no live Spotify
account reachable from this environment): forced into Connect mode via an
iPhone user agent, four scenarios were exercised directly against
`playback.js`'s real `initPlayback()`/`commitPlayback()` --
zero-devices-at-boot-and-at-play (throws `NoActiveDeviceError` with an
empty list, no `PUT /me/player/play` request ever sent), one-device-at-boot
(silently claimed at boot, exactly one `GET /me/player/devices` call made,
play succeeds immediately), zero-at-boot-then-one-appears-by-play-time
(the fresh check at play time correctly catches and claims it, play
succeeds), and zero-at-boot-then-two-at-play-time (correctly throws
`NoActiveDeviceError` with both, genuinely ambiguous). All four matched
the intended behaviour exactly.

## Player bar art resurfaces the "now playing" hero (2026-07-26)

Per explicit request: tapping the small album art on the player bar now
brings the enlarged "now playing" hero cover (the same disc-bearing cover
shown right after a needle drop) back to the foreground, from wherever it
has settled to -- a small persistent per-cell disc on the dome (dragging
the gallery settles it there), or off screen entirely (Flip, Crates, Past
sessions, or Runout groove all leave the Wall itself out of view). Before
this, once the hero settled away there was no way to bring it back short
of starting a fresh needle drop.

- **`ceremony.js`'s new `resurfaceNowPlaying(entry, ctx)`** is the direct
  inverse of the existing `settleActiveOverlay()`: it rebuilds the enlarged
  cover and disc from wherever the album's current cell is (or the
  existing viewport-centre fallback, `fallbackCenterRect()`, for an album
  not present in whatever pool is currently mounted -- the same mechanism
  Records nearby and Runout groove picks already rely on), recovers
  whatever tonearm-arc progress the settled persistent disc had already
  reached (so resurfacing never visibly resets progress to 0 -- an
  off-pool album, which never had a cell to attach a persistent disc to in
  the first place, is the one case with nothing to recover; its arc simply
  starts at 0 and catches back up within a second, since the arc is
  continuously re-driven from the player bar's own live elapsed/total on
  every poll regardless), and skips building a text panel entirely, since
  the steady "now playing" state never shows one even right after a real
  needle drop (it fades out the moment playback actually starts).
- **`main.js`'s `handleResurfaceNowPlaying()`** reads the currently-playing
  album from `pendingEntry` (the same reliable, pool-membership-independent
  source `handleRunout()` already uses, rather than `wallApi.getEntry()`,
  which only knows about whatever pool happens to be mounted right now),
  cancels any unrelated selection preview the listener has open elsewhere,
  switches back to Spin (if Flip is active) and to the Now Playing screen
  (if elsewhere) so the ceremony has a visible home to animate into --
  exactly the same "switch back first" pattern Flip's rows and Runout
  groove's cells already needed for the same underlying reason (the
  ceremony renders inside `#wall-viewport`, invisible whenever that screen
  or view mode isn't the active one).
- **UI**: the player bar's album art (`#player-art`) is now wrapped in a
  real `<button>` (`aria-label="Show now playing"`, 52px, well over the
  44px touch-target floor) rather than a bare `<img>` with a click
  listener, so it is keyboard-reachable and has an accessible name, per
  the app's own accessibility floor. Hover gets the same `filter:
  brightness(1.08)` "covers respond like sleeves under gallery light"
  treatment used elsewhere (DESIGN-SPEC's anti-generic rule against
  scaling on hover), not a scale transform.

## Genre search removed entirely, per explicit request (2026-07-26)

Reported live: searching by genre for "African music" and "Brazilian"
both returned generically popular, unrelated artists (Michael Jackson,
Taylor Swift) rather than anything genuinely related. Per explicit
instruction, genre search is removed from the app entirely rather than
patched a further time; only artist search remains.

This is the fourth live bug this feature had, and it was the same root
cause every time it went wrong: `searchByGenre()`'s own last-resort tier,
added specifically so a niche term like "jungle" (no exact tag, no
genre-tag overlap, no matching Deezer bucket) still returned *something*
rather than nothing, falls back to the plain free-text Spotify
artist-search results **unfiltered**. For a broad regional or descriptive
term with no real Spotify artist-name match at all ("African music",
"Brazilian"), that free-text search still returns *some* artists back
(Spotify's search is fuzzy and rarely returns literally zero results for
a plausible-looking query), just not remotely related ones -- there was no
further check catching this, since by design this tier trusts whatever
free-text search finds once every more precise source has failed. Earlier
fixes (see the search.js entries below) narrowed how *often* this
fallback tier fired and tightened the tiers *above* it, but never removed
the fundamentally unsound fallback itself, which is why the same shape of
bug kept resurfacing for different query terms.

- **`js/search.js`** was reduced to its `searchByArtist()` path only:
  `searchAlbums(query)` now takes no mode argument at all.
  `searchByGenre()`, `deezerGenreArtists()`, `getDeezerGenreList()`,
  `getGenreSuggestions()`, the genre-tag soft-matching helpers
  (`phraseSoftMatches()`, `genreSoftMatches()`, `tokenize()`), and the
  Spotify-genre-vocabulary harvesting into `localStorage['lp_genre_vocab']`
  (`harvestGenres()`) are all gone, along with every constant that only
  existed to tune them (`MAX_ARTISTS_GENRE`, `MAX_ARTISTS_FOR_ALBUMS`,
  `DEEZER_GENRE_ARTIST_LIMIT`, `MIN_CANDIDATES_BEFORE_DEEZER`,
  `RESOLVE_CONCURRENCY`). `search.js` no longer imports `deezer.js` at
  all -- Deezer is still used elsewhere (Records nearby, `nearby.js`), just
  no longer here.
- **UI**: the Artist/Genre mode toggle (`.search-mode-toggle`, a pair of
  pressed/unpressed pills) and the genre-name `<datalist>` autocomplete are
  both removed from the Record bags screen's search form; the field is now
  a single artist-name input with a fixed placeholder. `main.js` lost
  `searchMode` state, `setSearchMode()`, `populateGenreSuggestions()`, and
  `clearGenreSuggestions()`; `activeSearchQuery` no longer carries a
  `mode`, and its label on the Crates entry-point button and wall prompt
  is unconditionally "Artist: {query}".
- **Stale `localStorage['lp_genre_vocab']`** from any earlier build that
  had genre search is left alone rather than actively cleared -- it is now
  simply unused and inert, and adding a one-time migration purely to
  delete a small, harmless, orphaned key was judged not worth the
  complexity.
- **Docs updated to match**: `Docs/PRD.md` F12, `Docs/DESIGN-SPEC.md` §2a
  and its copy deck, and `README.md`'s Search section all now describe
  artist-only search, each also stating plainly that genre search existed
  and was removed (not just silently rewritten as if it never happened),
  per the honesty rule.

## Two bugs from the previous round, found live (2026-07-26)

### Flip rows didn't play: the ceremony was rendering inside a hidden container

Reported live: tapping a row in Flip did nothing audible. Root cause:
`setFlipMode('flip')` hides `#wall-viewport` entirely (`hide(wallViewport)`,
which the browser's own `[hidden] { display: none }` default applies,
since `.wall-viewport`'s own CSS never sets `display` to conflict with
it) so the dome can be swapped for the list. But `buildFlipRow()`'s click
handler called `handleSelectAlbum(entry)` directly, and `ceremony.js`'s
`selectAlbum()` builds its entire selection preview -- cover, text panel,
and critically the Play button -- as children appended inside
`wallViewportEl`. A descendant of a `display: none` ancestor has no box at
all: it is fully present in the DOM (so nothing throws) but entirely
invisible and unclickable. The ceremony was, every time, silently waiting
forever for a Play press on a button the listener could never see or tap.

This is exactly the same shape of bug Runout groove's cells were already
built to avoid (`showScreen('app')` before `handleSelectAlbum()`), just
missed for Flip's own rows when Phase 1 was built -- Flip's own instruction
said reusing `handleSelectAlbum()` needed "no new interaction code, just a
new entry point into it", which is true for the *call*, but the *view*
still has to actually be visible first. Fixed the same way: `setFlipMode('spin')`
now runs immediately before `handleSelectAlbum(entry)` in the row's click
handler, so `#wall-viewport` (and the ceremony inside it) is visible before
anything animates into it.

### Genre still "Unknown" for some artists: a rate-limited MusicBrainz burst was getting permanently mis-cached

Reported live, after the previous MusicBrainz-fallback fix: some artists'
genres resolved correctly, others stayed stuck on "Unknown" indefinitely.
Two compounding causes, both in the automatic background resolution added
for the earlier fix:

1. **Concurrency limits don't cap request rate.** `flip.js`/`runout.js`
   bound how many artists' lookups can be *in flight* at once
   (`GENRE_RESOLVE_CONCURRENCY`, lowered from 4 to 2 already), but that
   does not by itself cap how fast completed requests arrive -- with each
   artist needing up to two sequential MusicBrainz requests (search, then
   genres) and each pair completing quickly, a real pool's worth of unique
   artists could still burst well past MusicBrainz's roughly-1-request-
   per-second public courtesy guidance. Fixed with an actual request-pacing
   queue in `musicbrainz.js`'s `mbFetch()` (`schedule()`, a promise chain
   enforcing a minimum 500ms gap between the *start* of any two
   consecutive MusicBrainz requests, app-wide -- credits and genre lookups
   share the same queue), rather than only bounding concurrency. 500ms
   (roughly 2 requests/second) is a deliberate compromise between
   respecting the 1/second guidance and not making an occasional
   on-demand credits lookup wait too long behind a queued-up background
   genre batch -- not a value verified against MusicBrainz's actual
   enforcement, since this environment has no network access to it.
2. **The real bug: a rate-limited (or otherwise failed) MusicBrainz
   request was being cached exactly like a confirmed "no genre" miss.**
   `ceremony.js`'s `fetchPrimaryGenre()` called `musicbrainz.js`'s
   `getArtistGenre()` and unconditionally cached whatever it returned --
   `null` either way, with no way to tell "MusicBrainz doesn't know this
   artist's genre" apart from "the request to find out failed". Once (1)
   above caused a burst of artists to get legitimately rate-limited by
   MusicBrainz, every one of them had that failure permanently written
   into both the in-memory `Map` and the 30-day `localStorage` cache as if
   it were a confirmed miss -- exactly the patchy "some correct, some
   stuck forever" pattern reported. Fixed by changing `getArtistGenre()`'s
   return shape to `{genre, failed}` (mirroring `getAlbumCredits()`'s own
   existing `{credits, failed}` pattern in the same file) and having
   `fetchPrimaryGenre()` return `null` for that call *without caching
   anything* when `failed` is true, so a later attempt (the next pool
   mount, reopening Flip) retries that artist honestly instead of trusting
   a stuck failure for 30 days.
3. **A smaller, related fix bundled in**: `normalize()` in
   `musicbrainz.js` now runs Unicode NFKD decomposition and strips
   combining diacritical marks before the existing `[^a-z0-9]` filter, so
   an accented name like "Björk" normalises consistently instead of the
   accent silently splitting the word in two (a plain `[^a-z0-9]` filter
   turns "ö" into a bare space: "bj rk"), which could otherwise fail an
   otherwise-correct exact-name match against MusicBrainz's own stored
   spelling and produce a false "not confident enough" miss. This affects
   both the genre lookup and the existing album-credits lookup, since both
   share this same function.

**Verified against mocked network responses** (still no live Spotify or
MusicBrainz access in this environment): a successful MusicBrainz
fallback still resolves and caches correctly; a simulated `500` response
from every MusicBrainz endpoint resolves to `null` for that call *and
leaves nothing in the persistent cache*, confirmed by inspecting
`localStorage['lp_artist_genre_cache']` directly; a confirmed "artist not
found" response (empty search results, a real 200) still caches `null` as
before, unaffected by the fix.

## Genre resolution: MusicBrainz fallback, persistent cache, automated (2026-07-26)

Reported live, post-launch, against the real deployment: every genre in
Flip's genre sort/filter and Runout groove's genre-based directions showed
as "Unknown". Root cause, inferred rather than confirmed (this build
environment has no live Spotify session to verify it against directly, so
this is stated as an inference from the app's own live behaviour, per the
honesty rule, not a documented Spotify change): `GET /artists/{id}`'s
`genres` array appears to be coming back empty for most or all artists now.
When this app's selection-preview description line and genre features were
first built, the comment above `fetchPrimaryGenre()` already anticipated
"coverage is patchy" and built in a fallback to the release year -- but
"patchy" is a different situation from "effectively always empty", which
is what real usage surfaced.

- **MusicBrainz as a second genre source**, the same free, keyless API
  already used for album credits (INCREMENT-02 Phase 4). `js/musicbrainz.js`
  gained `getArtistGenre(artistName)`: search MusicBrainz for the artist by
  name (confidence-gated exactly like `getAlbumCredits()`'s release-group
  match: relevance score >= 90 AND a normalised exact name match, or treated
  as not found), then read that artist's own first-class `genres` field
  (community-tagged, each with a vote count) and take the highest-voted
  one. **Deezer was considered and rejected** as this fallback: its public
  API has no per-artist genre field to query directly, only editorial
  genre-to-artist buckets (`/genre/{id}/artists`, the same one
  `search.js`'s genre search already reads in the other direction), which
  would need brute-forcing every bucket to check an arbitrary artist's
  membership -- not a real per-artist lookup the way MusicBrainz's `genres`
  field is.
- **`ceremony.js`'s `fetchPrimaryGenre()`/`getPrimaryGenre()` now take an
  optional artist name**, used only for the MusicBrainz fallback (which has
  no relationship to a Spotify artist id and must search by name) and only
  tried when Spotify's own `genres[0]` comes back empty, so a working
  Spotify response is never second-guessed. Every caller (`selectAlbum()`,
  `flip.js`'s `resolveGenres()`, `runout.js`'s `resolvePoolGenres()` and
  `gatherRunoutContext()`) was updated to pass the artist's name through
  (the first name on a possibly-multi-artist credit, matching the existing
  pattern already used for Records nearby's seed artist).
- **A genuinely new persistent cache** (`localStorage['lp_artist_genre_cache']`,
  keyed by Spotify artist id, 30-day TTL matching `musicbrainz.js`'s own
  credits cache, capped at 1000 entries via the same "stop adding once
  full" rule `search.js`'s genre-vocabulary harvest already uses) sits
  alongside the existing in-memory `artistGenreCache` Map. Before this, an
  artist's genre was refetched every tab session; now it is resolved once
  per artist, ever, which matters a great deal now that a genuinely new
  artist typically costs two MusicBrainz requests (search, then genres) on
  top of the always-failing Spotify one, not zero.
- **Automated, not just cached**: `main.js`'s `onWallPoolChanged()` now
  kicks off `flip.resolveGenres()` for the newly-mounted pool immediately
  in the background (via a new shared `ensurePoolGenresResolving()` guard
  against starting it twice for the same pool), rather than waiting for the
  listener to open Flip first. By the time Flip or a Runout event actually
  needs genre data, most of the pool's artists are typically already
  resolved. This is a real, deliberate increase in background MusicBrainz
  traffic (up to roughly one pool's worth of unique artists' worth of
  requests, once, per pool mount) -- judged acceptable specifically because
  of three things together: (1) it is bounded, sequential-ish concurrency,
  not a burst (see below); (2) it is paid once per artist ever, not once
  per session, once the persistent cache above is warm; and (3) every user
  runs their own instance against their own IP (this app's whole
  architecture premise, restated in `README.md`'s "Why you need your own
  Spotify app" section), so this traffic is naturally spread across many
  real users rather than one shared backend hammering MusicBrainz. Stated
  plainly as a real trade-off, not a free lunch.
- **Concurrency lowered from 4 to 2** in both `flip.js`'s and `runout.js`'s
  pool-genre-resolution loops (their shared constant, `GENRE_RESOLVE_CONCURRENCY`),
  specifically because of the point above: this codebase's usual
  concurrency of 4 was sized for Spotify requests, and MusicBrainz's own
  public-API courtesy guidance (roughly 1 request/second) is tighter than
  Spotify's -- a genuinely new artist id now typically costs two sequential
  MusicBrainz requests, not one Spotify request, so the same concurrency
  number would have doubled the effective request rate against the
  tighter-limited API.
- **Verified against mocked network responses** (this environment still has
  no live Spotify or MusicBrainz access): with Spotify's own artist call
  failing (simulated here by having no auth session at all, which fails the
  same way an empty `genres` array does from this function's point of view)
  and MusicBrainz's endpoints intercepted, `getPrimaryGenre()` correctly
  falls through to the MusicBrainz result, sorts by vote count (a
  lower-count "electronic" tag was correctly passed over for a
  higher-count "trip hop" one), caches it to both the in-memory Map and
  localStorage, and a second call for the same artist returns instantly
  without hitting either mock again. A separate check confirmed a
  low-score, name-mismatched MusicBrainz candidate is rejected (returns
  `null`) rather than guessed at, matching `getAlbumCredits()`'s existing
  confidence-gating behaviour. Not, and cannot be in this environment,
  verified against MusicBrainz's actual live artist-genre data.

## INCREMENT-03 Phase 3: Runout groove (2026-07-26)

A new screen (`#screen-runout`, reached only from `handleRunout()`, never
the tab bar) replaces the immediate zoom-to-the-whole-wall as the default
next step after an album finishes: up to nine honestly-labelled directions,
each mapping to something checkable, never padded with a duplicate or
invented pick when fewer than nine can be honestly filled.

- **`js/runout.js` splits pure selection from impure gathering**, the same
  shape `flip.js` established in Phase 1: `buildRunoutGrid(context)` is a
  pure function (unit-tested in `tests.html`, 8 new assertions covering a
  fully-populated context filling all nine in order, a sparse pool
  shrinking to just "Play it again" with no padding, the "Played
  before"/"From your crate" fallback, and the "in this bag"/"on your Wall"
  label split) and `gatherRunoutContext()` is the async counterpart doing
  the actual (bounded) network calls and journal/pool reads.
- **Tapping a cell calls `handleSelectAlbum()` (the preview-first flow),
  not the direct `needleDrop()` path Records nearby's shelf actually uses.**
  The instruction's own wording says a cell "calls selectAlbum() exactly as
  Records nearby's shelf already does" -- but Records nearby's shelf
  (`main.js`'s `playerNearby` click handler) calls `handleNeedleDrop()` /
  `ceremony.needleDrop()` (the direct, no-preview path), not `selectAlbum()`,
  confirmed by reading that handler directly. The mockup this phase is
  meant to treat as the literal layout/interaction reference states the
  opposite, explicitly: its own footnote reads "Tapping a cell opens the
  *same selection preview* used everywhere else on the Wall... Play or find
  something else, so this screen introduces one new layout, not a new
  interaction pattern" -- and Phase 1's Flip rows already established
  `handleSelectAlbum()` as that "everywhere else" default for a new list
  UI's rows. Per the honesty rule, the mockup's own explicit statement (and
  consistency with Flip) won out over the phase instruction's incorrect
  description of Records nearby's current behaviour: Runout cells call
  `handleSelectAlbum()`. The one genuinely shared piece, exactly as
  instructed, is the fallback rect: both `needleDrop()` and `selectAlbum()`
  already fall back to a viewport-centre rect when `wallApi.getCellRect()`
  returns null (an album not present in whatever pool is currently
  mounted, the common case for a Runout pick), so nothing needed to change
  there at all.
- **Switching screens before running the ceremony.** A Runout cell's click
  handler calls `showScreen('app')` before `handleSelectAlbum()`, since the
  ceremony operates on `wallViewport`/`wallApi` (invisible while
  `#screen-runout` is showing) -- exactly like Flip rows needed no extra
  interaction code, just an extra `showScreen('app')` first so there is
  somewhere for the ceremony to actually animate into.
- **Finding the just-finished album's own data: `pendingEntry`, not
  `wallApi.getEntry()`.** `wallApi.getEntry()` only knows about whatever
  pool is currently mounted, which does not reliably include an album
  played from Records nearby, or from a previous Runout screen -- exactly
  the kind of pick Runout groove itself produces most often. `pendingEntry`
  (set at the top of both `handleNeedleDrop()`/`handleSelectAlbum()` and
  never cleared) reliably holds the full entry for whatever is currently
  playing regardless of pool membership, so `handleRunout()` reads that
  instead, with a defensive `pendingEntry.id === finishedId` check and a
  fallback to the always-available `zoomToFitAll()` in the (not normally
  reachable) case it somehow doesn't match.
- **`ceremony.js`'s `runoutGroove()` demoted, not removed**, per explicit
  instruction: it now only plays the visual completion (arc, pulse,
  crackle, settling the hero cover). The physical-neighbour wake-ripple and
  the automatic `zoomToFitAll()` at the wall's edge, both previously inside
  this function, are gone from the *default* path but not deleted:
  `wallApi.zoomToFitAll()` is unchanged and is exactly what "Browse the full
  wall instead" calls, and `wallApi.getNeighbors()`/`getCellEl()` (only ever
  called by the old wake-ripple block) are left defined in `wall.js`,
  simply unreferenced now -- stated here plainly as a real, if unusual,
  choice (most code with no remaining caller would normally just be
  deleted) rather than silent dead code, precisely because the instruction
  explicitly asked that nothing existing be removed here, only demoted.
- **The nine directions' data sources**, each against the "never invented,
  always checkable" rule:
  1. *More from this artist*: `GET /artists/{id}/albums`, same two-pages-of-
     10 pagination and album/EP filter `search.js` established (its own
     `limit=10` cap is a confirmed Spotify constraint, not re-guessed).
  2. *Same genre* / 8. *A left turn*: both read genre off the *current wall
     pool*, resolved via `ceremony.js`'s existing per-artist genre cache
     (the same one the selection preview and Flip's genre sort already
     share) -- deduplicated by artist id, bounded concurrency (4), often
     entirely free if the pool has already been browsed.
  3. *Same year*: `releaseDate` already on every pool entry, no fetch.
  4. *Related*: `nearby.js`'s existing `getRecordsNearby()`, unchanged, no
     new Deezer client.
  5. *From your crate* / *Played before*: two new `journal.js` exports,
     `keeperEntriesNewestFirst()` and `playedEntriesNewestFirst()`,
     reconstructing lightweight pool-shaped entries directly from journal
     data (`{id, name, artist, image}`, already stored on every entry) --
     deliberately not requiring that album to be present in any
     currently-mounted pool, since a keeper or a past play very often
     isn't. `hasEntryTagSupport()` (`loadJournal().v >= 4`) is the actual
     feature-detection the instruction asks for; in this build it is
     always true (both increments shipped together), but the check is
     real, not a stub, and would correctly fall through to "Played before"
     against an older, un-migrated journal.
  6. *Unplayed in this bag/on your Wall*: `poolSourceType` is computed in
     `main.js` from the same `activeBagId`/`activePlaylistId`/
     `activeSearchQuery`/`activeNewArrivals` flags the Crates screen
     already tracks (`'own'` only when none are set), rather than
     inspecting pool entries' own `bagId`/`playlistId` fields -- simpler,
     and already the authoritative source of "what is mounted right now".
     Search results and New arrivals both fold into the generic `'other'`
     bucket alongside bags/playlists (the instruction only names two
     outcomes, bag/playlist vs "your own Wall, no bag/playlist origin"; a
     third, more specific label for search/New-arrivals-origin pools was
     not asked for and would have been invented).
  7. *New arrival*: `newarrivals.js`'s `getCachedNewArrivalsPool()` --
     already built in INCREMENT-02 Phase 1 specifically for this kind of
     synchronous, no-network feature check -- rather than a fresh
     `getNewArrivals()` call, keeping this direction's cost at zero new
     requests.
  8. See row 2 above. `ADJACENT_GENRE_PAIRS` is a small, explicit,
     hand-picked list (soul/motown, hip hop/trap, house/techno, etc.),
     stated plainly as a first-pass guess, not a real taxonomy, per
     explicit instruction. Styled with the `--ember` accent (`wildcard:
     true`), not amber, matching the mockup.
  9. *Play it again* / *A past favourite*: prefers a keeper-tagged album
     not already used by an earlier direction (most often direction 5);
     falls back to the just-finished album itself otherwise. Always fills,
     so the grid can never come back genuinely empty as long as `finished`
     itself is a real entry, which it always is.
- **`source: 'runout'`** is a new, purely additive `journal.js` entry field
  (no `CURRENT_VERSION` bump, matching `bagId`/`playlistId`'s own original,
  un-migrated addition rather than Phase 2's tag-field bump, since there is
  no existing data to transform either way) -- recorded *alongside*, not
  instead of, whatever `bagId`/`playlistId` a pick's own entry data already
  carries, since those describe what the album's data is from and `source`
  describes how the choice was made, two independent facts.
- **Network cost**: as the instruction states outright, at most two
  genuinely new calls per runout event (the artist lookup for direction 1,
  Deezer's already-throttled call for direction 4 via `nearby.js`);
  directions 2, 3, 5, 6, 7, 8, and 9 are pool/journal/cache reads with no
  new request of their own. A materially different risk profile from
  INCREMENT-02, which was mostly new API surface.

## INCREMENT-03 Phase 2: Shelves (2026-07-26)

The Record bags screen's flat lists are now grouped into labelled shelf
sections (`Your record bags`, `By mood`, `By decade`, `New arrivals`,
`Your playlists`), each a heading, a small `N CRATES` count in deadwax
mono, and a horizontally scrolling row -- per the mockup's `.shelf`
pattern. The card component itself (`buildCrateCard()`, `.crate-card`, the
9-cover preview grid) is genuinely unchanged, exactly as instructed: the
only things that changed are the grouping (bags.js's new `category` field)
and the grid container's own layout (a flex row with `overflow-x: auto`
instead of a CSS grid; `.crate-card` picked up a fixed 148px width to make
sense inside a horizontal scroller, since a CSS grid's `minmax(130px, 1fr)`
sizing has no meaning there).

- **`category` schema addition.** All six original bags' JSON gained
  `"category": "seed"`; the eight new bags (below) are `"mood"` or
  `"decade"`. `bags.js`'s `loadBagManifest()` passes it through, falling
  back to `'seed'` for anything missing or unrecognised so a malformed or
  future bag lands somewhere sensible rather than disappearing. This is a
  schema change to static content files, not user data, so (as the
  instruction notes) no migration was needed.
- **Eight new bags, content authoring, not engineering, and a first draft
  only**: `sunday-morning`, `headphones-on`, `driving`, `rainy-day` (mood,
  15-18 albums each), `the-60s`, `the-70s`, `the-90s`, `the-2020s` (decade,
  20-21 albums each). Assembled directly from general, widely-known
  knowledge of each mood/decade rather than reproduced from any single
  published list (matching the original six bags' own stated convention,
  PRD F11), and cross-checked against each decade bag's own stated year
  range where a release date was confidently known (the four decade bags
  only include albums genuinely released in that decade; "The 2020s" is
  deliberately capped at real releases up to 2023, this build's own
  knowledge horizon for confidently real Spotify-searchable titles, rather
  than reaching for anything more recent and risking an invented title).
  Unlike the original six, **these eight have not been vetted by the
  project owner** and should be reviewed before shipping to real users --
  stated here plainly, per explicit instruction, not implied.
- **"New arrivals" feature detection, honestly scoped down.** The
  instruction asks this to be checked "without assuming" INCREMENT-02
  shipped, the same way Runout groove's Phase 3 will need to. In this
  actual codebase, both increments are being built together in the same
  session, so `main.js` already holds a static `import` of `js/newarrivals.js`
  from INCREMENT-02 Phase 1 -- there is no meaningful way to "not assume"
  a module exists when this file's own `import` statement already requires
  it to, short of a contrived dynamic `import()` wrapped in try/catch purely
  for its own sake. What Shelves actually does, and what "feature detection"
  reduces to here, is unchanged from Phase 1: `#crate-newarrivals-section`
  stays `hidden` unless `loadNewArrivalsCard()` resolves a non-empty pool,
  so the shelf still never appears with no data, empty, or broken -- the
  data-presence check *is* the detection that matters to a listener, even
  though the module-presence check is, in this combined build, moot.
- **Card-shelf pressed state.** `renderBagCards()`'s pressed check gained
  `!activeNewArrivals` (previously only checked search/playlist), matching
  the same mutual-exclusivity guarantee the other three sources already had
  with each other going into this phase.

## INCREMENT-03 Phase 1: Flip (2026-07-26)

A second view mode on the Now Playing screen: the dome (Spin) is
unchanged; Flip is a searchable, sortable list over the same pool, swapped
in as a sibling of `#wall-viewport` rather than a `wall.js` remount.

- **Genre needed a new, deliberately impure resolver, since it does not
  already exist on pool entries.** Every pool-producing module
  (`albums.js`, `bags.js`, `search.js`, `playlists.js`, `newarrivals.js`)
  carries `artistId`, not genre -- genre lives on the artist and is fetched
  lazily, one artist at a time, only as albums are actually viewed
  (`ceremony.js`'s `artistGenreCache`). `js/flip.js`'s `filterPool()` and
  `sortPool()` are pure functions exactly as specified, operating on
  whatever `.genre` an entry already carries (or doesn't); the new
  `resolveGenres()` in the same file is the one explicitly impure addition,
  reusing `ceremony.js`'s existing cache (via a new `getPrimaryGenre()`
  export) rather than fetching and caching genre a second time, deduplicated
  by artist id, and run through `mapWithConcurrency()` (concurrency 4) from
  its first commit per the hard constraint. In practice this usually costs
  nothing: a pool of albums the listener has already browsed on the dome
  resolves entirely from cache.
- **When genre resolution happens.** `main.js`'s `onWallPoolChanged()`
  invalidates the previously-resolved genre pool whenever a new pool is
  mounted (a bag/playlist/search/New arrivals switch, or the initial Wall
  build) and kicks off a fresh `resolveGenres()` in the background; the list
  renders immediately against whatever is available (unresolved entries
  simply can't match or group on genre yet) and re-renders once resolution
  lands, rather than blocking the whole Flip view on a network round-trip.
- **Played state: journal history, not `wall.js`'s own `markPlayed()`.**
  `wall.js` already tracks a played set, but only for the current pool
  mount's own session (reset on every bag/playlist switch) -- an album
  played last week, on a different Wall pool, would incorrectly show as
  "unplayed" under that narrower definition. `journal.js`'s new
  `lastPlayedAtByAlbum()` reads the existing lifetime journal instead (the
  same store `markPlayed()`'s own visual ring is ultimately downstream of,
  via `handleSelectAlbum()`/`handleNeedleDrop()` recording every play), per
  the explicit instruction not to invent a second played-state store.
- **Unresolved genre groups under a literal "Unknown" label**, not the
  release-year fallback the ceremony's own deadwax line uses when genre is
  unavailable -- grouping an album under a year while labelling the section
  "genre" would misrepresent what the grouping actually is, so this needed
  its own honest label rather than reusing an unrelated one.
- **Display preferences (mode, sort) persist across sessions**
  (`localStorage['lp_flip_mode']`/`['lp_flip_sort']`), independent of
  whatever pool happens to be mounted, exactly as specified; restored
  immediately on boot (harmless before `enterApp()` ever mounts a pool,
  since `#screen-app` itself stays hidden until then).
- **Accessibility, stated as intended rather than verified**: the list is
  real `<button>` rows in document order (keyboard-focusable, reachable via
  Tab, and readable by a screen reader as an actual list), which the dome
  never was (`KNOWN-DEVIATIONS.md`'s own "per-cover hover caption is gone... though each tile still has an accessible name" entry, and the dome's own drag-based interaction model generally). Not verified with an actual screen reader in this environment.
- Two new inline icons (`icon-spin`, `icon-flip`) added to the shared
  sprite for the mode toggle, same 1.5px-stroke style as the rest.
- Unit-tested in `tests.html` (12 new assertions): `filterPool()` matching
  artist/title/genre case-insensitively including an empty query and a
  no-match query, `sortPool()` for all four modes (including the
  played/unplayed split against a supplied `playedAt` map), and
  `groupKeyFor()`'s Unknown-genre and no-grouping cases.

## INCREMENT-02 Phase 4: MusicBrainz credits, and Community Wax deferred (2026-07-26)

A second free, keyless data source (`js/musicbrainz.js`) for producer/
engineer/performer credits, since Spotify's own Web API has none (confirmed
directly while building the deadwax line, back in the pre-INCREMENT-01
history above). Surfaces as a collapsed "Credits" disclosure, closed by
default, fetched only when opened.

- **Placement: the selection preview, not the needle-drop ceremony's own
  text.** The instruction says "under the album view's existing deadwax
  line" without naming which of the app's two deadwax-bearing views it
  means. The needle-drop ceremony's own text (`ceremony.js`'s
  `.ceremony-text`) fades within about a second of Play being pressed
  (`text.classList.remove('is-visible')` once `commitPlayback()` resolves),
  which is not long enough to notice, let alone open, a disclosure. The
  selection preview (`selectAlbum()`'s `.preview-description`) stays on
  screen indefinitely while waiting for Play or "Find something else", so
  the Credits toggle was added there instead, under `.preview-text-panel`.
- **No JSONP fallback, despite the instruction to model this "directly on
  deezer.js" with "the same fetch-then-JSONP-style-fallback shape".**
  Deezer's client supports JSONP because Deezer's own API documents an
  `output=jsonp&callback=` parameter that actually wraps its response in a
  callback invocation. MusicBrainz's public API has no equivalent: appending
  a `callback` parameter to a MusicBrainz URL does nothing, since the server
  does not recognise it and simply returns plain JSON regardless. Loading
  that as a `<script src>` would not silently fail the way a genuine JSONP
  timeout does; it would load a JSON object as if it were executable
  JavaScript and throw a syntax error, which is a strictly worse failure
  mode than not having a fallback at all. Rather than build a fallback that
  cannot work and would only be found broken on first real use, `mbFetch()`
  is a plain `fetch()` only, matching MusicBrainz's actual, documented CORS
  support for its JSON API. Per the honesty rule: implementing the closest
  real behaviour instead of a spec detail that does not hold for this API.
- **No custom `User-Agent` header**, despite MusicBrainz's own API etiquette
  guide asking API clients to send a descriptive one (app name, version, a
  contact). Browsers refuse to let JavaScript set the `User-Agent` header at
  all (it is one of a small set of forbidden header names `fetch()` cannot
  override); there is no client-side workaround. Requests go out with
  whatever generic `User-Agent` the listener's own browser sends. Some
  mitigating context, stated honestly rather than as an excuse: this app has
  no shared backend for MusicBrainz to rate-limit as a single bad actor in
  the first place (PRD's own "every user runs their own instance" premise
  applies here too), and credits are fetched one album at a time, only on
  an explicit open, never in a batch, which keeps any one user's traffic
  well inside MusicBrainz's roughly 1-request-per-second public guidance
  without needing an explicit throttle of its own.
- **Release-level credits only.** MusicBrainz frequently attaches
  "producer" and similar roles to individual recordings (tracks) rather
  than the release (album) as a whole; this pass only reads the release's
  own `artist-rels`, not each track's. A deliberate scope cut for this
  phase, not an oversight: pulling every track's relationships would mean
  up to N additional requests per album (N = track count) for a supplementary,
  optional feature, which does not fit the "at most one or two genuinely new
  network calls" discipline the surrounding increment holds everything else
  to. Some albums will show fewer or no credits than MusicBrainz actually
  has recorded, purely because of this scoping choice.
- **Match confidence.** A release-group candidate is only trusted if
  MusicBrainz's own search relevance score is at least 90 (of 100) AND its
  title normalises (lowercased, punctuation stripped) to an exact match --
  both thresholds picked as reasonable-sounding starting points, not tuned
  against real MusicBrainz responses in this environment (no network access
  to MusicBrainz was available while writing this). Anything less confident
  is treated as "not found" rather than shown as a guess, per explicit
  instruction.
- **One unified "No credits found" message for both an honest miss (no
  confident match, or a match with no relationship data) and a genuine
  request failure**, rather than exposing network-failure detail inside a
  minor collapsed disclosure row. This is a narrower reading of "fail loud"
  than the rest of the app: the failure is still logged
  (`console.error('[musicbrainz] credit lookup failed:', ...)`), and
  `getAlbumCredits()` still returns a `failed` flag a future caller could
  act on differently, but the two cases are not given different copy here
  the way search or playlist loading distinguish "failed" from "empty" in
  their status lines. Judged proportionate to how minor this feature is
  (an optional, closed-by-default detail row) versus the cost of a second
  string a listener would rarely have reason to care about the difference
  between.
- **CSP**: `connect-src` gained `https://musicbrainz.org` (plain fetch
  only; no `script-src` change, since there is no JSONP fallback to add one
  for).
- **Community Wax**, the shared-ratings idea sketched in the originating
  research, is documentation only per explicit instruction: `Docs/PRD.md`
  gained a new "Deferred: Community Wax" section naming it, its dependency
  on the personal tag from Phase 2, and the fact that it needs its own
  backend decision (Supabase is already connected to this project) before
  any code is written. No code for it exists anywhere in this phase.

## INCREMENT-02 Phase 3: Listening streak (2026-07-26)

`journal.js`'s new `streakDays(sessions)` is a pure function (unit-tested in
`tests.html`, 5 new assertions: no sessions, a single session today, a
broken streak, a streak ending yesterday counting, a streak ending two days
ago resetting to 0) that counts consecutive local-calendar days, up to and
including today or yesterday, with at least one recorded needle drop.
"Today or yesterday" (not today only) is deliberate: without it, every
streak would show as broken for the entire first half of every day until
the listener's first needle drop of that day, which reads as punishing
rather than motivating, and isn't how the "N day streak" concept is
generally understood elsewhere.

- **Placement: the Past sessions screen's own header, not each session
  row.** The originating research doc's own wording ("append to the
  existing Past sessions header line... `SESSION 12 · 11 JUL 2026 · 48
  MIN`") describes a per-session-row deadwax label, but a streak is a
  property of "now" (today's date against the whole journal), not of any
  one past session -- attaching it to the newest row, an arbitrary past
  row, or every row equally would all misrepresent what the number means.
  The phase prompt's own wording ("the existing Past sessions header line,
  only when N >= 2") more literally names the screen's actual `<h1>Past
  sessions</h1>` header, which this instead extends with a small deadwax
  line underneath it (`#past-sessions-streak`, `moss` coloured, matching
  that token's existing "quiet positive status" usage for the device note
  and saved confirmations) shown only once currentStreakDays() >= 2. Stated
  here as an interpretation call, not a literal reading of either source.
- `currentStreakDays()` is a thin convenience wrapper (`streakDays(loadJournal().sessions)`)
  for `main.js`, which does not otherwise need the raw `sessions` array;
  the pure function itself needs no localStorage access at all, which is
  what made it straightforward to unit test directly.

## INCREMENT-02 Phase 2: Personal tag, keeper / spin again / pass (2026-07-26)

`journal.js` bumped `CURRENT_VERSION` 3 -> 4, adding an optional per-entry
`tag` field (`'keeper' | 'spin-again' | 'pass' | null`). No actual data
migration happens on load -- an entry with no `tag` property already reads
identically to one explicitly `null` -- but the version bump still happens
the same way the previous two did, per the explicit instruction, so a
future migration has a real version number to check against.

- **No entry id, so `startedAt` identifies the play.** Journal entries have
  never carried an id of their own (`albumId` + `startedAt` + a few display
  fields). `setEntryTag(sessionId, entryStartedAt, tag)` identifies one
  specific play within a session by its recorded `startedAt` timestamp
  (milliseconds), on the assumption that two needle drops in the same
  session can never land on the same millisecond -- true in practice, since
  the ceremony's own choreography takes seconds between one drop and the
  next, but stated here as an assumption rather than a guarantee the code
  itself enforces.
- **Mutually exclusive, toggled off by tapping again**, exactly as
  specified: `setEntryTag()` sets `entry.tag = entry.tag === tag ? null :
  tag`, so pressing the already-active one clears it and pressing a
  different one replaces it, never stacking more than one tag on an entry.
- **UI reads/writes the tag without a full re-render.** Tapping a tag
  button updates the journal via `setEntryTag()` and mutates the in-memory
  `entry.tag` (and the three buttons' own `aria-pressed`) directly, rather
  than calling `renderPastSessions()` again -- a full re-render would rebuild
  every session row from scratch and collapse whichever ones the listener
  currently has expanded, which would make tagging an album feel like it
  closes the session you were looking at. Three new icons (`icon-keeper`,
  `icon-repeat`, `icon-pass`) were added to the shared SVG sprite, drawn in
  the same 1.5px-stroke, round-cap style as the existing set; no emoji or
  unicode glyphs.
- **Pool-scoring weighting is a stated guess, not a tuned value**:
  `albums.js`'s new `applyTagWeighting()` multiplies a tagged album's score
  by 1.15 (keeper) or 0.6 (pass) before the pool is sorted, nudging its rank
  (and, on a library over `POOL_TARGET`, its odds of being included at all)
  up or down. "Spin again" is deliberately left neutral -- it reads as a
  softer, non-committal signal than an explicit keeper, and this is a
  starting guess pending real usage, not a considered value either way.
- **Could not honestly extend this to Records nearby**, despite the
  instruction asking for both: `js/nearby.js` ranks Deezer-sourced related
  artists by their own fan count, with no per-album score of this app's own
  to weight in the first place -- there is no existing hook to nudge, so
  applying the tag there would mean inventing a new scoring concept for
  that feature rather than feeding an existing one, which is out of scope
  for this phase. Only the Wall's own pool (`albums.js`) is affected.
- **No aggregate tag view** was built (not required this phase, per the
  prompt): a tag can currently only be seen or changed from within its own
  expanded session row, one play at a time.

## INCREMENT-02 Phase 1: New arrivals (2026-07-26)

A fourth Record bags source (`js/newarrivals.js`): the latest wanted release
(real album, or a 6+ track EP Spotify files as a single) from each artist
the user follows on Spotify, newest first.

- **New scope.** `GET /me/following?type=artist` needs `user-follow-read`,
  added to `js/auth.js`'s `SCOPES`. Per the standing convention for every
  scope addition so far, this only takes effect on a fresh authorisation --
  anyone already connected needs to sign out and reconnect once, or the
  card simply never appears (its own failure path already hides it rather
  than showing an explanatory error, so this is silent unless the user
  reads this file or the console).
- **Cursor pagination, not offset.** `GET /me/following` paginates via an
  `after` cursor nested one level down (`data.artists.next`,
  `data.artists.items`), unlike every other paginated endpoint this app
  already calls (`getSavedAlbums()`, `getMyPlaylists()`), which return
  `items`/`next` directly on the response body. `spotify.js`'s new
  `getFollowedArtists()` follows the same "walk `.next` until absent, capped
  at `maxPages`" shape as those two, just one level deeper.
- **Per-artist latest release** reuses `search.js`'s already-confirmed
  Spotify constraint on `GET /artists/{id}/albums` (`limit` capped at 10,
  not the 50 most list endpoints allow -- discovered live, see that file's
  own deviation entry) rather than re-guessing it: two pages of 10 per
  artist, filtered to real albums or 6+ track EPs, sorted by release date,
  keeping only the newest. Every artist's lookup goes through
  `mapWithConcurrency()` (concurrency 4, matching `search.js`'s
  `ALBUMS_FETCH_CONCURRENCY`) from this module's first commit rather than
  after a live 429, per explicit instruction.
- **Caching.** Resolved pool cached in `localStorage['lp_new_arrivals']`
  keyed by a `builtAt` timestamp; a visit to the Record bags screen
  refreshes it once it is more than 6 hours stale. That interval is a
  starting guess (matching the journal's own 6h session-inactivity window
  for no stronger reason than consistency), not a tuned value, pending real
  usage. A transient `GET /me/following` failure serves the last-known
  cache rather than blanking the card, if one exists.
- **Hides itself entirely** (no error state, no empty card) if
  `GET /me/following` fails outright, or the user follows nobody, or none
  of their followed artists have a release passing the album/EP filter --
  matching Records nearby's own silent-hide convention (PRD edge case 10)
  rather than the loud "Search failed" pattern used for an explicit user
  action like search.
- **`newArrival: true`** is tagged onto every entry (mirroring `bagId`/
  `playlistId` on bag/playlist entries) so a later feature -- Runout
  groove's "Unplayed in this bag" vs "Unplayed on your Wall" distinction
  (INCREMENT-03 Phase 3) -- can tell a New-arrivals-sourced pool apart from
  the user's own Wall, even though nothing in this phase's UI needs it yet.
  No journal-level tag (no `bagId`/`playlistId`-style field recorded against
  played entries) was added, since Phase 1's own spec doesn't ask for one
  and the existing journal schema has no natural third slot for it without
  a migration this phase doesn't otherwise need.
- **UI**: a new "New arrivals" section on the Record bags screen, reusing
  `buildCrateCard()`'s existing card pattern (a single card showing a 3x3
  preview grid of up to 9 covers, same as a record bag's own preview) and
  the same selection-preview to needle-drop flow as every other source --
  no new interaction code. Selecting it, like a bag or playlist, is
  mutually exclusive with the other three sources.

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

## Tile-size fix, part 2: minRadius is only a floor (2026-07-12)

Reported live a second time, after the segments-aware radius fix above:
other record bags (10-20 albums) were still rendering oversized,
overlapping tiles, only 2 rows visible instead of 5. Root cause identified
directly in `DomeGallery.tsx`'s own resize handler, not assumed:

```
let radius = basis * fit;              // the viewport's own natural radius
radius = Math.min(radius, heightGuard);
radius = clamp(radius, minRadius, maxRadius);
```

`domeRadiusForSegments()` was only ever passed as `minRadius` -- a FLOOR
that only takes effect if the viewport's own naturally-computed radius
comes in smaller. For a small record bag (4 segments), the solved radius
is itself small (~115px desktop), almost always well below whatever a
normal browser window's own viewport-driven radius computes to -- so the
floor never actually won; the uncontrolled, segments-*unaware* natural
radius was used instead, and dividing that by only 4 segments produced
exactly the oversized, overlapping tiles reported. This is also why
"Your Record Bag" (24 segments, solved radius ~687px, much closer to a
typical natural radius) happened to look right -- not because the fix
worked, but because the floor was more likely to bind there anyway.

`mount.tsx` did not even expose `maxRadius` as a passthrough prop before
this, despite `DomeGallery.tsx` itself already supporting it (`maxRadius
= Infinity` default). Added it, and `wall.js` now passes the same
computed value as both `minRadius` and `maxRadius`, pinning the radius
exactly rather than merely flooring it, so the segments-aware target tile
size takes effect regardless of what the viewport would otherwise have
computed. Trade-off, stated honestly: pinning min=max also means the
`heightGuard` safety net (which shrinks the radius further on a very
short viewport) can no longer act, since `clamp(x, R, R)` always returns
`R` regardless of what came before it. Not expected to matter in
practice given the target tile sizes are modest (90px desktop / 55px
phone), but is a real, deliberate simplification worth knowing about if
a genuinely very short viewport (e.g. a landscape phone) turns out to
clip the dome. Rebuilt via `cd gallery && npm run build`; confirmed the
built module still exports only `mountDomeGallery`.

## Tile-size fix, part 3: the sphere itself was too small (2026-07-12)

Reported live a third time, after part 2 fixed individual tile size:
"individual size is better but dome size is too small so the albums
overlap and cross each other... need to cover a bigger ball." Both tile
width and dome radius are solved from the same `segments` value
(`domeRadiusForSegments()`), so a low segment count (the whole point of
sizing segments to a small pool, originally) meant a genuinely small
radius too -- wrapping normal-sized tiles around a small-radius sphere
means each tile occupies a much larger share of the sphere's own
circumference, which is what was actually causing the overlap, distinct
from both earlier tile-size bugs.

`MIN_DOME_SEGMENTS` raised from 4 to 24 in `js/wall.js` -- matching the
segment count "Your Record Bag" (~100+ albums) naturally computes to and
which was confirmed live, across every round of this fix, to be the one
configuration that actually looks right. Essentially every record bag,
search result, and playlist now gets the same dome size regardless of
how few albums it has, trading away most of the original "fewer segments
for a small pool means fewer duplicate slots to fill" intent -- but that
trade is safe now, since the spatial-adjacency fix (two entries up)
separately guarantees no two neighbouring tiles ever repeat the same
cover regardless of how much repetition the pool needs overall. Verified
by simulation: zero adjacent-duplicate conflicts across 100 independent
builds each for pools of 10, 18, and 25 images filling a 120-slot (24
segment) dome.

## Playlists not showing after reconnect: diagnosability, again (2026-07-12)

Reported live: no Spotify playlists showing on the Record bags screen
even after reconnecting to grant the new scopes. `js/playlists.js`'s
`loadMyPlaylists()` wrapped `GET /me/playlists` in a bare
`.catch(() => [])`, the exact same diagnosability bug `js/search.js` had
earlier the same day: a genuinely failed request (most likely a 403 if
reconnecting did not actually re-run the OAuth consent screen and grant
the scopes) was indistinguishable from an honest "you have no
playlists". Fixed the same way: the error is now logged
(`console.error`), and `loadMyPlaylists()` returns `{ playlists, failed
}` instead of a bare array so `main.js` can show "Could not load your
playlists" instead of the misleading "No playlists found" when the
request itself broke.

A second, separate gap made this worse: `loadMyPlaylists()` memoized its
own promise (`playlistsPromise`) regardless of outcome, so a failed
result was cached for the rest of the tab session -- even a genuinely
successful reconnect would not have triggered a retry without a full page
reload, since the same rejected-then-caught promise kept being returned.
`playlistsPromise` is now reset to `null` on failure so the next visit to
the Record bags screen genuinely retries the request rather than
repeating a stale failure.
