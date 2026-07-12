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
- OAuth 2.0 Authorization Code with PKCE, fully client-side. Scopes: `user-top-read user-library-read streaming user-read-playback-state user-modify-playback-state`.
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
cover to the foreground with its name, artist, and a one-line description
(artist, year, track count, duration — Spotify has no free-text album
description), and waits for Play or "Find something else." Nothing plays,
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

Runout groove: when the last track ends, the arc completes, pulses twice like a locked groove, prompt reads from the copy deck, and the wall wakes for the next choice.

### F7. Playback
- Primary: Web Playback SDK ("Longplayur" device). Premium required; works on desktop Chrome/Edge/Firefox.
- Fallback (SDK init failure, iOS Safari, mobile): Spotify Connect device picker; playback state then polled every 5s via `GET /me/player`.
- End-of-album detection: SDK path — last track in context (`next_tracks` empty) transitions to paused at position 0 having been near its end; Connect path — snapshot heuristic (last track number of album, near end, then stopped/reset). Both paths must trigger the runout groove reliably; this is the highest-risk logic in the app, isolate it in one module with unit-testable pure functions.
- Player bar: track, album–artist, play/pause, prev/next, album-level progress (the tonearm arc mirrors it), device note when on Connect.
- Silent desktop reconnect: on load with a valid session, initialise the SDK player and transfer playback to it (`PUT /me/player`, `play: false`) before the user does anything. The user must never see Spotify's no-device state on a desktop that already has a valid session.
- Android wake flow: when no Connect devices are found on a phone, a single "Wake Spotify" button deep-links into the Spotify app; on returning to Longplayur (`visibilitychange`), re-poll devices for up to 15s, auto-select this phone once it appears, and show a brief confirmation ("Found this phone. Carrying on.") before resuming the action that triggered the wake.
- Output switcher: a persistent device icon on the player bar shows the current device and lists others; choosing one transfers playback mid-session via `PUT /me/player` with `device_ids`, without resetting the tonearm arc's progress.

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
- "Record bag" now means a curated album collection, never the journal (see F8). A rail of bag chips sits above the Wall (DESIGN-SPEC §2): half-tile chips in deadwax mono, "YOUR WALL" always first (the user's own pool), followed by the seed bags. Selecting a bag crossfades the Wall to that bag's own spiral; the camera always snaps to whole rows and columns on any transition so no cover is ever cropped, at any viewport.
- Six seed bags ship as `/bags/*.json` (name, blurb, 15 to 25 original `{title, artist}` pairs each, not reproduced from any published list): 90s US rap, soul essentials, Motown, trip hop, Britpop, late-night jazz.
- Albums in a bag are resolved to Spotify album IDs lazily (on first view of that bag) via search, then cached; unresolvable entries are skipped silently rather than shown broken.

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

## Non-goals (v1)
No accounts, no server, no analytics, no payments (development-mode terms forbid commercial use), no social features, no playlist support, no free-tier Spotify support, no mobile app.

## Success criteria
- A stranger with Premium completes setup and reaches their first needle drop in under 6 minutes.
- The ceremony demonstrably feels different from clicking play in Spotify (the GIF of it should be self-explanatory).
- Lighthouse: accessibility ≥ 95, performance ≥ 90 on the tapestry view.
- Zero console errors across the happy path and edge cases 1–5.
