# Longplayur — Product Requirements

**One line:** an anti-shuffle listening room. Your Spotify history becomes a wall of album covers; you play whole albums, chosen deliberately, one needle drop at a time.

**Positioning:** Spotify closed its API to independent developers in February 2026 (development mode: 5 users max, Premium required; extended access: registered businesses with 250k+ MAU only). Longplayur is the answer: free, open source, no server, no build step, and every user runs their own instance with their own free Spotify client ID. The constraint is the story. The product thesis is anti-shuffle: albums as the artist sequenced them, no algorithm choosing what's next.

**Audience:** developers, self-hosters, vinyl-minded music lovers on GitHub/HN. All have Spotify Premium (hard requirement). Do not design for a mainstream consumer.

---

## Vocabulary (used consistently in ALL UI copy, code comments may be plain)

| Concept | Longplayur term |
|---|---|
| Choosing/starting an album | **Needle drop** |
| Album progress indicator | **Tonearm arc** |
| End of album | **Runout groove** |
| A listening session | **A session** |
| Journal of past sessions | **Past sessions** |
| A curated album collection | **A record bag** |
| The full zoomed-out history view | **The Wall** |
| Starting fresh | **New session** |
| The 6 hour rule | A session closes on New session, or if the last entry is over 6 hours old at load |

Renamed by the owner during INCREMENT-01: "side" is now "session" everywhere
(code, storage, and UI copy), and "record bag" no longer means the journal.
It is reserved for curated album collections shown as a rail on the Wall
(see F11); the journal itself is called "Past sessions". Liner notes were
removed entirely in the same increment (see F8).

## Functional requirements

### F1. First-run setup (bring your own client ID)
- Explain in one short paragraph why the user needs their own Spotify app (Feb 2026 policy), without bitterness.
- Three numbered steps: create app at developer.spotify.com/dashboard; add the exact Redirect URI (displayed with a copy button, computed as `location.origin + location.pathname`); paste Client ID.
- Client ID validated loosely (hex, 16–40 chars), stored in localStorage only.
- State plainly: Spotify Premium required; nothing leaves the browser except calls to Spotify.
- Errors here must be actionable: wrong redirect URI and not-allowlisted (403) are the two most common failures; each gets specific copy (see DESIGN-SPEC copy deck).
- A "Test connection" diagnostic (run automatically after first connect, and on demand from error states) performs a `GET /me` and a 1-item top-tracks call and reports each as OK or FAILED with the specific fix in deadwax mono. Diagnosis beats documentation.

### F2. Auth
- OAuth 2.0 Authorization Code with PKCE, fully client-side. Scopes: `user-top-read user-library-read streaming user-read-playback-state user-modify-playback-state playlist-read-private playlist-read-collaborative`.
- Token refresh 60s before expiry; refresh token rotation handled (Spotify may or may not return a new refresh token).
- Sign out clears tokens but keeps client ID and journal.

### F3. Building the wall (data layer)
- No top-albums endpoint exists. Aggregate:
  - `GET /me/top/tracks?limit=50` for `long_term`, `medium_term`, `short_term`; group tracks by album; score = weighted count (long 1.0, medium 1.2, short 0.8).
  - `GET /me/albums` (saved albums, paginate up to 100) merged in at a base score below top-derived albums, deduplicated.
- Exclude singles with < 4 tracks. Require artwork.
- Pool target: up to ~120 albums for the Wall. Minimum viable: 9 (if fewer, include singles rather than fail; if zero, friendly error).
- Cache the pool in localStorage with a 24h TTL so returning users get an instant wall; refresh in background.

### F4 + F5. One Wall, one camera (unified model, see DESIGN-SPEC §2)
- There is exactly one grid: the Wall. The pool is placed along a square spiral from the centre in descending score order (deterministic `spiralPosition(rank)`).
- The default "tapestry" view is a camera framed on a 3×3 region of the Wall, centred on the Wall centre at first run.
- A needle drop pans the camera to centre the chosen cover. At runout, the user chooses among the playing album's 8 physical neighbours on the Wall (played ones shown spent and unselectable). The evening is a walk across the wall.
- Edge handling: at the Wall's edge or with fewer than 2 unplayed neighbours, show the edge prompt (copy deck) and ease the camera out slightly.
- Zoom out (button, pinch, scroll, or Escape) reveals the whole Wall: played covers glow with an amber ring, the journey thread (SVG polyline inside the transformed container) connects them in play order. Tapping any unplayed cover needle-drops it and the camera dives back in.
- Performance: covers lazy-loaded (300px Spotify image size), transform-based pan/zoom only (no re-layout), 60fps target on a mid-range laptop.

### F6. The ceremony (signature — do not cut corners here)
Selecting a cover (tap or long press) does not play it: it brings the
cover to the foreground — always at the same fixed size, not scaled off
the tapped tile's own live position on the rotating dome, which varies
with perspective and made the layout inconsistent from album to album —
with its name, artist, and a one-line description on its own opaque
panel (legible against any album art or background): the artist's
primary genre where Spotify has one for them, else the release year,
plus track count and duration (Spotify has no free-text album
description). Waits for Play or "Find something else." Nothing plays,
and nothing is recorded in Past sessions, unless Play is pressed.

Needle drop sequence, once Play is pressed (see DESIGN-SPEC for exact timing):
1. Other covers recede (dim + slight scale down) — already true from the selection step above.
2. Chosen cover is already centred and enlarged from the selection step; no re-animation.
3. The disc slides out from behind the sleeve (the signature element, DESIGN-SPEC §3).
4. A held breath before audio, shorter than a from-cold drop since the anticipation already happened while deciding. Optional soft vinyl crackle, synthesised with the Web Audio API (no audio file asset). Crackle setting persisted; default ON; never overlaps Spotify audio. The breath is SKIPPABLE: click, Enter or Space cuts straight to play.
5. First track starts.

A direct, no-preview version of this sequence (skip straight from tap to
step 1) still exists for confirmed choices: resuming after a device
picker, and Records nearby's shelf.

Tonearm arc: an amber stroke on the disc's exposed edge representing progress through the WHOLE ALBUM (sum of track durations; position = elapsed across tracklist), not the current track. Requires fetching the album's tracklist durations (`GET /albums/{id}`) at needle drop.

Runout groove: when the last track ends, playback is explicitly paused
(`PUT /me/player/pause`) before anything else, so Spotify's own
account-level Autoplay setting (if the listener has it on) cannot start
something unrelated the moment the album's context runs out — choosing
the next record is meant to require an actual choice, not a race against
Spotify's own autoplay. The arc completes, pulses twice like a locked
groove, prompt reads from the copy deck, and the wall wakes for the next
choice.

### F7. Playback
- Primary: Web Playback SDK ("Longplayur" device). Premium required; works on desktop Chrome/Edge/Firefox.
- Fallback (SDK init failure, iOS Safari, mobile): Spotify Connect device picker; playback state then polled every 5s via `GET /me/player`.
- End-of-album detection: SDK path — last track in context (`next_tracks` empty) transitions to paused at position 0 having been near its end; Connect path — snapshot heuristic (last track number of album, near end, then stopped/reset). Both paths must trigger the runout groove reliably; this is the highest-risk logic in the app, isolate it in one module with unit-testable pure functions.
- Player bar: track, album–artist, play/pause, prev/next, album-level progress (the tonearm arc mirrors it), device note when on Connect.
- Mini now playing: a compact strip (small art, track, artist) shown on every screen other than Now Playing itself (Record bags, Past sessions, Runout groove), so browsing doesn't lose track of what's actually playing. A plain flex sibling of the screens, not an overlay — the visible screen simply shrinks to make room for it while something is playing, and it disappears (freeing that room back up) once nothing is. Tapping it returns to Now Playing and resurfaces the hero cover, the same behaviour the full player bar's own small album art already triggers.
- Silent desktop reconnect: on load with a valid session, initialise the SDK player and transfer playback to it (`PUT /me/player`, `play: false`) before the user does anything. The user must never see Spotify's no-device state on a desktop that already has a valid session.
- Android wake flow: when no Connect devices are found on a phone, a single "Wake Spotify" button deep-links into the Spotify app; on returning to Longplayur (`visibilitychange`), re-poll devices for up to 15s, auto-select this phone once it appears, and show a brief confirmation ("Found this phone. Carrying on.") before resuming the action that triggered the wake.
- Output switcher: a persistent device icon on the player bar shows the current device and lists others, each labelled with its Spotify-reported type (Computer, Phone, Speaker, TV, Cast, etc.); choosing one transfers playback mid-session via `PUT /me/player` with `device_ids`, without resetting the tonearm arc's progress. Any Chromecast-paired speaker that supports Spotify Connect already appears here (as "Cast") — that is the only way to get Spotify audio actually playing on a cast device from a webpage, so there is no separate Google Cast picker; one would only be able to cast the page itself, not control Spotify playback through it.

### F8. Past sessions (the journal)
- Data model (localStorage, versioned):
```json
{ "v": 2, "sessions": [ { "id": "uuid", "startedAt": 1234567890, "endedAt": null,
  "entries": [ { "albumId": "...", "name": "...", "artist": "...", "image": "...",
                 "startedAt": 1234567890, "bagId": null } ] } ] }
```
- A session starts at the first needle drop of a visit and closes on explicit "New session" or after 6h inactivity.
- Past sessions view: shelf of past sessions, newest first; each row renders its covers as a mini-strip with date/time in the mono face, a share icon on the collapsed row itself, and a chevron to expand into its entries.
- Liner notes were removed entirely (INCREMENT-01 3a): no per-album note field anywhere, in storage or UI.
- Share: rendering the share card and sharing it is one action, available directly from the collapsed session row (no need to expand first). On a phone/tablet that supports the Web Share API with files, sharing opens the native share sheet with the card image attached; elsewhere it downloads the PNG, matching prior behaviour. Cancelling the native sheet is silent. See F8a for the exact mechanics.
- Export card: 1080×1350 share card (canvas): obsidian background, the session's covers in play order connected by a thread, footer in deadwax mono: `SESSION 12 · 11 JUL 2026 · LONGPLAYUR` (exact layout in DESIGN-SPEC §4). Album images need `crossOrigin="anonymous"` (Spotify's CDN sends CORS headers); if the canvas is tainted anyway, fall back to an export without images (typographic card listing albums) rather than failing.

### F8a. Native share mechanics
- Render the share card canvas (pre-rendered when Past sessions opens, so the tap handler itself only does `canvas.toBlob` + `share()`, since iOS Safari requires the share call to happen within the user's tap gesture with minimal async work in between).
- `canvas.toBlob` → `new File([blob], "longplayur-session-{n}.png", { type: "image/png" })`.
- If `navigator.canShare?.({ files: [file] })`: call `navigator.share({ files: [file], title: "Longplayur", text: "Session {n} · {date}" })`.
- Fallback ladder: unsupported (typically desktop) → download the PNG, as before. `AbortError` (user cancelled the sheet) → silent, no error UI. Any other failure (including `NotAllowedError`) → fall back to download.

### F9. Settings (header, minimal)
Crackle on/off · New session · Past sessions · Sign out. No settings page.

### F10. Records nearby
- A player-bar action opens a low shelf of 4 to 6 related albums, sourced from Deezer's keyless public API: artist search → related artists → each related artist's top albums, ranked by fan count, mapped back to Spotify album IDs via search. Cached per artist for 7 days.
- Plain `fetch` is tried first; a JSONP fallback is used only if that fails, per the security rules in `Docs/CLAUDE.md` (randomised callback name, script element removed after use, 10s timeout), and documented in `KNOWN-DEVIATIONS.md`.
- The feature hides itself entirely if Deezer is unreachable, rather than showing an error state.
- Captions read `ARTIST · {n} FANS`. Needle-dropping an album from the shelf runs the full ceremony exactly as from the Wall; the resulting journal entry records which record bag (if any) it came from via `bagId`.

### F11. Record bags
- "Record bag" now means a curated album collection, never the journal (see F8). Choosing what's on the Wall (the user's own pool, a seed bag, a Spotify playlist, or a search result) lives on its own Record bags screen/tab, not a rail on the Wall itself, so browsing and search have room to breathe. Selecting anything crossfades the Wall to that source and returns to the Now Playing tab; the camera always snaps to whole rows and columns on any transition so no cover is ever cropped, at any viewport.
- One tab line along the top of the screen, not a stack of always-visible shelves: "Your record bags" (Your Record Bag itself is the first card in it, followed by New arrivals when there is one, the listener's own custom bags — F14 — and the seed bags), "By mood", "By decade" and "Playlists" (F13) each filter the same wrapping grid below to just that set, rather than each getting its own permanently-stacked row. This keeps the screen's height independent of how many categories happen to be shipped, and leaves more of a short viewport free for what's actually playing (F7's mini now playing) on screens other than Now Playing itself. The grid wraps rather than scrolling horizontally, so it uses width sensibly at any viewport: a couple of columns on a phone, many more on a wide desktop window, with no separate breakpoint needed for that part. The active tab is remembered between visits.
- Six seed bags ship as `/bags/*.json` (name, blurb, 15 to 25 original `{title, artist}` pairs each, not reproduced from any published list): 90s US rap, soul essentials, Motown, trip hop, Britpop, late-night jazz.
- Albums in a bag are resolved to Spotify album IDs lazily via search, then cached; unresolvable entries are skipped silently rather than shown broken. Each bag's card on the Record bags screen shows a 3x3 preview grid of up to 9 of its own resolved covers rather than a blank placeholder, resolved the first time that card is shown (not only on selection) and cached from then on; resolutions are sequenced one bag at a time to bound request volume on a cold cache.
- Within any pool smaller than the Wall's slot count, slots are filled with independently shuffled full passes of the pool rather than a straight repeat, so an album cannot reappear until every other album has had a turn (and even then in a different order), avoiding visible near-duplicates.

### F12. Search
- A search field on the Record bags screen takes free text and finds the single best-matching artist, pulling their own discography.
- Only real albums, and EPs of 6 or more tracks, are shown — singles shorter than that and compilations are filtered out (Spotify's `album_type` field, plus `total_tracks` for the EP exception). The pool is capped at 40 albums.
- A result replaces the Wall exactly like selecting a record bag does (same crossfade) and returns to Now Playing; needle-dropping from a search result records normally into Past sessions.
- **Genre search, removed.** An earlier version of this feature added an explicit Artist/Genre mode toggle and a "soft search" across Spotify's exact genre tags, a free-text artist search cross-checked against artist genre tags, and Deezer's own genre taxonomy, falling back to unfiltered free-text results as a last resort. Live testing found that last-resort fallback returning wrong results for real genre terms: "African music" and "Brazilian" both matched generically popular, unrelated artists (Michael Jackson, Taylor Swift) rather than anything genuinely related. Per explicit instruction, genre search was removed entirely rather than patched again; see `KNOWN-DEVIATIONS.md` for the fix history kept as a record.

### F13. Playlists
- The user's own Spotify playlists (owned and followed) are a third Wall source alongside record bags and search, shown as cover-art cards on their own "Playlists" tab of the Record bags screen (F11). Fetched lazily the first time that tab is actually opened, not eagerly on every visit to the screen, since it is a live API call unlike the record bags above it. Needs the `playlist-read-private` and `playlist-read-collaborative` OAuth scopes (`js/auth.js`); anyone connected before these scopes were added needs to sign out and reconnect once to grant them.
- Unlike record bags, a playlist's own tracks already carry a full Spotify album object, so no per-track search call is needed to resolve one — just dedup and the same album/EP filter search.js and bags.js use. Capped at 200 tracks per playlist (4 pages of 50) so one very large playlist can't balloon into an unbounded number of requests.
- Resolved pools are cached per playlist and keyed to the playlist's own `snapshot_id`, so an edited playlist resolves fresh automatically rather than serving a stale cache.
- Needle-dropping an album from a playlist records normally into Past sessions, tagged with which playlist it came from via `playlistId` (same pattern as `bagId` for record bags).

### F14. Custom record bags
- The "Your record bags" tab's "+ Create a record bag" button opens a bag builder view in place of the tab's own grid (the same in-place-swap pattern F11's bag detail view already uses). Name the bag, optionally give it a blurb, then search by album name or artist name (one free-text field, one query, no mode toggle -- Spotify's own album search already matches both) and tap covers to add them; an "In this bag" grid shows every album picked so far and stays visible (and each cover removable from it) across as many further searches as it takes, not just a running count that a fresh search would otherwise bury.
- Unlike a seed bag, a custom bag's albums are saved directly from the real Spotify pool entries the listener picked, not as {title, artist} pairs resolved lazily -- there is nothing left to resolve, and it avoids a re-search landing on a different release than the one actually chosen. Stored client-side only, one localStorage array (`lp_custom_bags`), newest first.
- A custom bag behaves exactly like a seed bag everywhere else in the app (bag detail view, needle-dropping, journal `bagId` tagging, Runout groove, Flip), with two additions its own detail view gets: "Add or remove albums" reopens the same bag builder pre-populated with the bag's current name/blurb/albums, saving over the existing bag rather than creating a new one (its id, and therefore any journal entry's own `bagId` link to it, never changes); "Delete this record bag" removes it outright. Neither a seed bag nor a Spotify playlist gets either action -- this is the one bag source the app itself owns and can change or remove.

## Deferred: Community Wax

Sketched, not built. An opt-in Setup toggle that, if turned on, would sync a user's own keeper/spin-again/pass tags (F2's INCREMENT-02 personal tag, see `KNOWN-DEVIATIONS.md`) to a shared backend under a pseudonymous id and pull back an aggregate badge on each album (for example, "62% kept this"). This is explicitly out of scope for INCREMENT-02: every other feature in this document runs with no server and nothing leaving the user's own browser except calls to Spotify, Deezer, and MusicBrainz, and Community Wax breaks that premise on purpose. It needs its own architecture decision (Supabase is already available as a connector to this project) and its own sign-off before any code is written; it is named here only so the idea is not lost, not as a commitment to build it.

## Edge cases (must handle, with specific copy — see copy deck)
1. 403 on `/me/top/tracks`: user not allowlisted on their own app, or app misconfigured. Explain the fix.
2. Redirect URI mismatch on auth: explain exact-match requirement.
3. Fewer than 9 albums: pad with singles; below 4, show the sparse-history state.
4. No Connect devices found: instruct to open Spotify anywhere and press play once (desktop), or offer "Wake Spotify" (Android, see F7).
5. Token refresh failure: silent re-auth attempt once, then return to setup preserving the journal.
6. Rate limit 429: honour Retry-After, never hammer.
7. Album playable check: if play returns 403 restriction, mark cover unavailable, apologise briefly, don't break the session.
8. Offline: detect, pause polling, banner, resume gracefully.
9. Two tabs open: last writer wins on the journal; no corruption (read-modify-write on each mutation).
10. Deezer unreachable: Records nearby hides itself cleanly (F10); nothing else in the app depends on it.
11. Search matches nothing playable (no artist/genre match, or everything found is a filtered-out single/compilation): explain on the Record bags screen's status line, leave the current Wall/bag showing rather than switching to an empty one.
12. A playlist resolves to zero playable albums (empty, or everything filtered out as a single/compilation): explain on the Record bags screen's status line the same way, rather than switching to an empty Wall.

## Non-goals (v1)
No accounts, no server, no payments (development-mode terms forbid commercial use), no social features, no free-tier Spotify support, no mobile app. (Playlist support and site analytics were both added after v1; see F13 and `KNOWN-DEVIATIONS.md`.)

## Success criteria
- A stranger with Premium completes setup and reaches their first needle drop in under 6 minutes.
- The ceremony demonstrably feels different from clicking play in Spotify (the GIF of it should be self-explanatory).
- Lighthouse: accessibility ≥ 95, performance ≥ 90 on the tapestry view.
- Zero console errors across the happy path and edge cases 1–5.
