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
| A listening session | **A side** |
| Per-album note | **Liner notes** |
| Journal of past sessions | **The record bag** |
| The full zoomed-out history view | **The Wall** |
| Starting fresh | **New side** |
| The 6 hour rule | A side closes on New side, or if the last entry is over 6 hours old at load |

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
Needle drop sequence (see DESIGN-SPEC for exact timing):
1. Other covers recede (dim + slight scale down).
2. Chosen cover moves to centre and enlarges; a groove ring fades in around it.
3. The disc slides out from behind the sleeve (the signature element, DESIGN-SPEC §3).
4. A held breath before audio. Optional soft vinyl crackle, synthesised with the Web Audio API (filtered noise bursts; NO audio file asset). Crackle setting persisted; default ON; toggle in the header; never overlaps Spotify audio. The breath is SKIPPABLE: click, Enter or Space cuts straight to play.
5. First track starts.

Tonearm arc: an amber stroke on the disc's exposed edge representing progress through the WHOLE ALBUM (sum of track durations; position = elapsed across tracklist), not the current track. Requires fetching the album's tracklist durations (`GET /albums/{id}`) at needle drop.

Runout groove: when the last track ends, the arc completes, pulses twice like a locked groove, prompt reads from the copy deck, and the wall wakes for the next choice.

### F7. Playback
- Primary: Web Playback SDK ("Longplayur" device). Premium required; works on desktop Chrome/Edge/Firefox.
- Fallback (SDK init failure, iOS Safari, mobile): Spotify Connect device picker; playback state then polled every 5s via `GET /me/player`.
- End-of-album detection: SDK path — last track in context (`next_tracks` empty) transitions to paused at position 0 having been near its end; Connect path — snapshot heuristic (last track number of album, near end, then stopped/reset). Both paths must trigger the runout groove reliably; this is the highest-risk logic in the app, isolate it in one module with unit-testable pure functions.
- Player bar: track, album–artist, play/pause, prev/next, album-level progress (the tonearm arc mirrors it), device note when on Connect.

### F8. The record bag (journal)
- Data model (localStorage, versioned):
```json
{ "v": 1, "sides": [ { "id": "uuid", "startedAt": 1234567890, "endedAt": null,
  "entries": [ { "albumId": "...", "name": "...", "artist": "...", "image": "...",
                 "startedAt": 1234567890, "note": "" } ] } ] }
```
- A side starts at the first needle drop of a visit and closes on explicit "New side" or after 6h inactivity.
- Liner notes: from the player bar or the record bag, a small text field per played album ("Liner notes"). Autosaved.
- Record bag view: shelf of past sides, newest first; each side renders its covers as a mini-strip with date/time in the mono face; expanding shows entries and notes; a side can be deleted.
- Export: any side exports as a 1080×1350 share card (canvas): obsidian background, the side's covers in play order connected by a thread, footer in deadwax mono: `SIDE 12 · 11 JUL 2026 · LONGPLAYUR` (exact layout now specified in DESIGN-SPEC §4). Album images need `crossOrigin="anonymous"` (Spotify's CDN sends CORS headers); if canvas is tainted anyway, fall back to an export without images (typographic card listing albums) rather than failing.

### F9. Settings (header, minimal)
Crackle on/off · New side · Record bag · Sign out. No settings page.

## Edge cases (must handle, with specific copy — see copy deck)
1. 403 on `/me/top/tracks`: user not allowlisted on their own app, or app misconfigured. Explain the fix.
2. Redirect URI mismatch on auth: explain exact-match requirement.
3. Fewer than 9 albums: pad with singles; below 4, show the sparse-history state.
4. No Connect devices found: instruct to open Spotify anywhere and press play once.
5. Token refresh failure: silent re-auth attempt once, then return to setup preserving journal.
6. Rate limit 429: honour Retry-After, never hammer.
7. Album playable check: if play returns 403 restriction, mark cover unavailable, apologise briefly, don't break the side.
8. Offline: detect, pause polling, banner, resume gracefully.
9. Two tabs open: last writer wins on journal; no corruption (read-modify-write on each mutation).

## Non-goals (v1)
No accounts, no server, no analytics, no payments (development-mode terms forbid commercial use), no social features, no playlist support, no free-tier Spotify support, no mobile app.

## Success criteria
- A stranger with Premium completes setup and reaches their first needle drop in under 6 minutes.
- The ceremony demonstrably feels different from clicking play in Spotify (the GIF of it should be self-explanatory).
- Lighthouse: accessibility ≥ 95, performance ≥ 90 on the tapestry view.
- Zero console errors across the happy path and edge cases 1–5.
