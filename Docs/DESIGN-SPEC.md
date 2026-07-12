# Longplayur — Design Specification (v2, post-review)

The interface is a listening room at night. The album covers are the only colour; everything else recedes. Slowness is a feature: this app should feel like the opposite of an infinite feed.

## 0. Anti-generic rules (read first)

These exist because the obvious implementation of this spec looks AI-generated. They are hard requirements:

1. **No emoji and no unicode glyph icons** (no ⏮ ⏸ ⤢ ⌄ ⛭ anywhere). All icons are inline SVG, 1.5px stroke, round caps, drawn from a shared sprite in index.html. Icon set needed: play, pause, previous, next, chevron, crackle (three short arcs), close, copy, export (doubles as the share icon), bin, device (the output switcher's cast icon: a screen, open at the bottom-left where two wave arcs and a dot emanate from, the standard cast glyph shape), nearby (two overlapping circles), search (a magnifying glass). The zoom-out (four corners) icon was retired along with its manual trigger button; `wallApi.zoomToFitAll()` still fires automatically from the runout groove's at-edge case.
2. **Nothing scales on hover.** Covers respond like sleeves under gallery light: `filter: brightness(1.08)` and the label rises. Scale transforms are reserved exclusively for the ceremony.
3. **No infinite pulsing animations.** Anything that "breathes" forever reads as a loading skeleton. The runout wake is a single ripple (see §3), then rest.
4. **One serif element per screen state, maximum.**
5. **No em dashes and no en dashes in any user-facing string.** Use full stops, commas, colons, or the interpunct (·) in deadwax lines. This includes error messages, aria-labels, the README's quoted UI strings, and the share card.
6. Brand mark is **the groove**: three concentric circles, hairline, bone; a single amber dot on the outer ring at 2 o'clock (the stylus). Favicon: same on obsidian. The old four-squares mark is retired.

## 1. Tokens

### Colour
| Token | Hex | Use |
|---|---|---|
| `--obsidian` | `#121212` | Room. Page background |
| `--obsidian-2` | `#1B1A18` | Furniture. Cards, bars, modals |
| `--vinyl` | `#0B0B0C` | The disc itself. Near-black, darker than the room |
| `--bone` | `#DCD7CB` | Primary text |
| `--bone-dim` | `#9D998F` | Secondary text |
| `--moss` | `#6B7C5E` | Tertiary status (device note, saved confirmation) |
| `--amber` | `#E8B45A` | Stylus light. THE accent: tonearm arc, journey thread, primary button, focus ring |
| `--line` | `rgba(220,215,203,0.14)` | Hairlines |
| `--ember` | `#D98A7A` | Errors only |

No gradients except the label scrim on covers. No shadows anywhere; depth comes from the disc sliding behind the sleeve and from opacity layers.

### Type (self-hosted, see CLAUDE.md; no Google Fonts at runtime)
| Role | Face | Notes |
|---|---|---|
| Ceremony | DM Serif Display 400 | The needle-drop album title and empty states only |
| Interface | Inter 400/500/600 | Everything else |
| Deadwax | IBM Plex Mono 400 | Dates, times, session numbers, durations. ALL CAPS, tracking 0.08em, 11 to 12px, bone-dim. e.g. `SESSION 12 · 23:47 · 11 JUL 2026` |

### Motion
Base easing `cubic-bezier(0.4, 0, 0.2, 1)`. Never spring, never bounce.
| Token | Value |
|---|---|
| `--dur-breath` | 600ms |
| `--dur-move` | 400ms |
| `--dur-touch` | 180ms |
| Disc revolution | 1800ms per rotation (33⅓ rpm, a deliberate in-joke; used by the loading spinner) |

`prefers-reduced-motion`: every choreography collapses to 150ms crossfades; the disc appears without sliding; the loading ring does not rotate; crackle is unaffected (audio, separately toggleable).

## 2. The unified model: one Wall, one camera

There is exactly ONE grid in the app: the Wall. This removes all tapestry/wall synchronisation logic.

- **Layout:** the pool (up to ~120 albums) is placed on a square-cell grid along a **square spiral from the centre outwards, in descending score order**. Highest-scored album at the centre cell, next 8 form the ring around it, and so on. Deterministic and testable: `spiralPosition(rank) -> {col, row}`.
- **The tapestry view is a camera.** Default state: camera framed tightly on a 3×3 region of the Wall. First run: centred on the Wall's centre. Zoom and pan are CSS transforms on the wall container; the journey thread SVG lives inside the container so it scales for free.
- **The walk:** a needle drop pans the camera (`--dur-breath`) to centre the chosen cover. At runout, the choice offered is the playing album's **8 physical neighbours on the Wall** (played ones excluded, shown spent). Your evening is literally a walk across your own wall. At the Wall's edge, or if fewer than 2 unplayed neighbours remain, the prompt adds the zoom-out option and the camera eases back slightly to reveal more.
- **Zoom out** (button or pinch/scroll) shows the whole Wall: played covers at full opacity with a 2px amber ring, the journey thread connecting them in order, everything else at 70%, waking to 100% on hover/focus. Tap any unplayed cover to needle-drop it; the camera dives back in to it.

### 2a. The Record bags screen
Choosing what's on the Wall is its own screen/tab ("Record bags"), not a rail on the Wall itself, so browsing and search have room to breathe -- a single small entry-point button on the Wall (labelled with whatever source is currently loaded, "Your Record Bag" by default) opens it. "Your Record Bag" (the user's own pool) is a dedicated button at the top; below it, the six seed record bags and the user's own Spotify playlists each render as cover-art cards in their own grid. Selecting anything crossfades the whole Wall (`--dur-breath`) to that source's own spiral layout and returns to the Now Playing tab; the camera always snaps to whole rows and columns on any switch, at any viewport, so no cover is ever cropped, letterboxing with obsidian where the aspect ratio does not divide evenly. A record bag or playlist is a curated/live list of albums, not a listening session: playing from one records normally into Past sessions, tagged with which bag or playlist it came from.

A search field also sits on the Record bags screen: an Artist/Genre toggle (a pair of pills, one always pressed; Artist is the default), then the text input and search icon. The mode is chosen explicitly, not guessed -- Spotify's artist search is fuzzy enough that almost any genre-like word also matches some real, if obscure, artist (e.g. "soul" matching the band Soul II Soul), so an earlier "try artist, fall back to genre" auto-detect essentially never actually reached genre mode. A result crossfades the Wall the same way a bag does and returns to Now Playing. Only real albums, and EPs of 6 or more tracks, are shown -- singles shorter than that and compilations are filtered out. Artist mode resolves to that one artist's own discography. Genre mode is a soft search combining several sources, since Spotify's exact `genre:` tag filter alone proved too sparse for real genre terms (e.g. "jungle" and "britpop" both returned nothing live): the exact `genre:` tag search, a free-text Spotify artist search kept only where the artist's own genre tags word-overlap the query (word-level, not raw substring -- a raw substring check let "britpop" wrongly match an artist merely tagged "pop"), and Deezer's broader public genre taxonomy (the same source Records nearby uses) with member artists resolved back to Spotify by name -- deduplicated, ranked, and capped at 15 artists before fetching albums. If all three come back empty, the free-text results are used unfiltered as a last resort rather than showing nothing. The search field also offers an autocomplete of genre names while Genre mode is active: Deezer's live taxonomy merged with real Spotify genre tags harvested from past searches, growing richer with use since Spotify has no working "list every genre" endpoint left to call directly.

Within the Wall, a pool smaller than the dome's slot count is filled with independently shuffled full passes of the pool rather than a straight repeat, so the same album cannot reappear until every other album has had its turn, and even then in a different order -- avoiding visible duplicates within any one glance across the dome.

## 3. The ceremony (choreography, exact)

### The disc (signature element)
When an album plays, a vinyl disc slides out from behind its sleeve: a circle of `--vinyl`, diameter 92% of the tile, offset so ~30% of it shows beyond the sleeve's right edge, carrying 3 concentric hairline grooves and a small centre label rendered from the album art's dominant edge. The **tonearm arc** is an amber stroke on the disc's exposed edge, showing progress through the WHOLE ALBUM (elapsed across all tracks ÷ total album duration, from `GET /albums/{id}` track durations). It advances with a 1s linear transition so it creeps like a stylus.

### Selecting an album (from click, before any of the above)
Clicking or long-pressing a cover does not play it. It brings the cover to
the foreground as a decision point:

| t (ms) | What |
|---|---|
| 0 | Click (or long press). Other covers ease to 20% opacity (`--dur-breath`); if a different album is the current "now playing" hero, it settles back into its cell first so the two covers never overlap. No scaling of anything except the chosen cover |
| 0 to 600 | Camera pans to centre the chosen cover; the cover alone scales to a fixed size (not derived from the tapped tile's own live, perspective-projected bounding box, which varies with where it sits on the dome -- see "Consistent sizing" below), always the same for every album |
| on animation end | A single opaque text panel fades in above the cover (not floating directly over it, so it stays legible against any album art or dimmed wall behind it): serif album title, artist name, then a one-line description -- the artist's primary genre where Spotify has one for them, falling back to the release year, plus track count and duration (never repeating the artist, already shown on its own line). An amber Play button sits over the cover; "Find something else" sits below it |
| indefinite | Waits for a decision. Play continues into the needle drop below. "Find something else" (or tapping the scrim behind the cover, or Escape, or dragging the gallery) eases the cover back into its cell and clears the recede, with nothing played and nothing recorded in Past sessions |

**Consistent sizing:** DomeGallery tiles sit on a rotating 3D dome, so a tapped tile's own `getBoundingClientRect()` is a *projected* size that varies with perspective depending on where it currently sits. Scaling the enlarged cover off that directly made its size (and everything positioned relative to it) inconsistent from album to album, including sometimes overlapping the text above it. The enlarged size is a fixed, viewport-relative value instead -- the same every time -- and the cover still animates FROM the tapped tile's real position, just always TO the same place.

### Needle drop (from the Play button in the selection above; audio at ~1.9s after Play)
| t (ms), from Play | What |
|---|---|
| 0 | The disc slides out from behind the sleeve (translateX, `--dur-breath`). Title/artist/description are already showing from the selection step above, so there is no separate title-reveal beat here |
| 100 | Crackle starts if enabled: Web Audio synthesised, no audio file (see js/ceremony.js for the current synthesis). 200ms fade-in |
| 100 to 900 | **The held breath.** Nothing moves. Deliberately shorter than a from-cold needle drop, since the anticipation already happened while deciding whether to press Play |
| 900 | Crackle fades (200ms). `PUT /me/player/play` fires |
| on first playing state | Title/artist/description fade; cover eases back to 1.0 into its cell WITH the disc still out; other covers return to 45%; player bar populates |

**The breath is skippable:** any click, Enter, or Space during it cuts straight to play. Skipping must feel intentional, not like fixing a bug: the crackle stops with a soft tick.

The direct, no-preview version of this choreography (recede straight into disc/crackle/breath with no Play-button gate) still exists for callers that already represent a confirmed choice: resuming a needle drop after a device picker, and Records nearby's one-tap shelf.

First needle drop ever shows a one-time deadwax hint under the player bar: `CRACKLE ON · TOGGLE IN THE HEADER`.

### Runout groove (album end)
| t | What |
|---|---|
| 0 | Arc reaches 360°, pulses twice (opacity 1 → 0.4 → 1, 800ms each). If crackle enabled, a quiet runout loop plays, max 30s |
| 800 | A single wake ripple: neighbours brighten to 100% in one wave outward from the centre (60ms stagger per ring), then REST at full. No looping animation |
| 800 | Prompt: "The session isn't over. Choose the next record." |

## 4. Screens

### Setup: the sleeve back
Left-aligned editorial layout like the back of a record sleeve, not a centred hero. Wordmark top-left with the groove mark. Steps numbered in deadwax mono (`01` `02` `03`) like a tracklist, hairline rules between them. Step 01 (create a Spotify app) includes the redirect URI in a mono well with a copy button (SVG icon + "Copy"), to copy before logging in and creating the app. Client ID input is step 03. One amber button: "Connect Spotify". Footer hairline, then the honesty line and repo link.

After a successful connect and pool build, and on demand via a "Test connection" link in error states: run `GET /me` + a 1-item top-tracks call and report each as `OK` / `FAILED: <specific fix>` in deadwax mono. Diagnosis beats documentation.

### Loading
The groove mark, larger, rotating at 33⅓ rpm (1800ms/rev), amber stylus dot fixed. Copy: "Pulling records from the shelf."

### Player bar
`[art] Track name / Album · Artist    prev play next` with the album-level progress hairline below (amber fill) and times in deadwax. Device note (moss): "Playing on {device}" when on Connect. A persistent device (output switcher) icon -- a screen with two cast waves and a dot, the same shape a cast/output control is generally recognised by -- sits at the end of the bar: tapping it lists available Spotify devices, each labelled with its type (Computer, Phone, Speaker, TV, Cast, etc., from Spotify's own device data) and the current one marked. Choosing another transfers playback there without resetting the tonearm arc. On a phone with no devices found, the same control offers "Wake Spotify" (see PRD F7). Any Chromecast-paired speaker that supports Spotify Connect already appears in this same list (labelled "Cast") -- that is the only way to actually get Spotify audio playing on a cast device from a webpage, so there is no separate Google Cast picker.

### Records nearby
Opened from a player-bar action while something is playing: a low shelf of 4 to 6 related albums slides up over the bottom of the viewport, each cover captioned `ARTIST · {n} FANS` in deadwax. Needle-dropping one runs the full ceremony as normal. The shelf hides itself entirely (no error state, no empty shelf) if Deezer is unreachable.

### Past sessions
Shelf of sessions, newest first. Each row: `SESSION 12 · 11 JUL 2026` in deadwax, a share icon (right-aligned, 44px target, `aria-label="Share session {n}"`) that renders and shares the card directly from the row, a strip of mini covers (wraps onto as many rows as the session needs, never clipped or horizontally scrolling), and a chevron to expand into its entries. There is no liner-notes field: notes were removed entirely.

### Share card (1080×1350 canvas, exact layout)
Obsidian field, 64px margin. Covers of the session in play order on a 4-column layout: cover 1 at 480px spanning columns 1 to 2, subsequent covers 224px flowing left to right beneath, all corners 8px radius, amber thread (3px, 60% opacity) connecting cover centres in order, drawn UNDER the covers. Top-left, DM Serif 56px, bone: "A session, played in full." Bottom hairline, then deadwax 24px: `SESSION 12 · 11 JUL 2026 · LONGPLAYUR`. Typographic fallback (tainted canvas): same frame, covers replaced by a numbered tracklist of `ALBUM / ARTIST` lines, serif heading unchanged. On a device that supports the Web Share API with files, the rendered card is shared natively (PRD F8a) instead of only downloading.

## 5. Copy deck (verbatim; British English; sentence case; no exclamation marks; no em or en dashes)

Setup
- Tagline: "Listen to whole albums like the artist intended."
- Why-BYO: "Create your own free Spotify app. Five minutes, once. This page then runs entirely in your browser using it, and nothing about your listening ever leaves your machine."
- Steps: "Create a Spotify app" / "Add the redirect URI to your app" / "Paste your client ID"
- Premium note: "Spotify requires a Premium account for this."
- Button: "Connect Spotify" · Diagnostics link: "Test connection"

Prompts
- First run: "Drop the needle on something."
- Playing: "Session {n} · now playing" (n = count of sessions in the journal, lifetime)
- Selection dismissed ("Find something else" pressed): "Pick another record."
- Runout: "The session isn't over. Choose the next record."
- Runout at wall edge: "You've reached the edge of the wall. Pick from the shelf."
- Wall: "Your wall. {N} records. Tap one to drop the needle."
- New session: "New session. Drop the needle on something."

Selecting an album
- Play button aria-label: "Play {album}"
- Dismiss: "Find something else"

Search
- Mode toggle: "Artist" / "Genre" (Artist is the default)
- Placeholder: "Search by artist" / "Search by genre"
- Searching: "Searching for "{query}"."
- No results: "No albums found for "{query}". Only full albums and EPs of 6 or more tracks are shown."
- Failed (the request itself broke, not a genuine empty result): "Search failed. Check your connection and try again."
- Result prompt: "Artist: {query}. {N} records. Tap one to drop the needle." / "Genre: {query}. {N} records. Tap one to drop the needle."

Errors
- 403 top tracks: "Spotify refused (403). In your app's settings on the developer dashboard, add your own Spotify account under User Management, then try again."
- Redirect mismatch: "Spotify rejected the redirect. The redirect URI in your app settings must match this exactly: {uri}"
- No devices (desktop): "No Spotify devices found. Open Spotify anywhere, play anything for a second, then refresh."
- No devices (Android): button "Wake Spotify"; confirmation once found: "Found this phone. Carrying on."
- Restricted album: "Spotify won't play this one here. Pick another record."
- Sparse history: "Not enough listening history yet to build a wall. Play more albums and come back."
- Offline: "You're offline. The music may continue; the room will catch up when you're back."
- Nearby unreachable: no copy; the shelf simply does not appear.

Past sessions
- Empty: "No sessions yet. The first needle drop starts one."
- Share (aria-label on the row's icon button): "Share session {n}"
- Delete: "Forget this session" · Confirm: "Forget session {n}? The music stays; the record of it goes."

Records nearby
- Caption: "{ARTIST} · {n} FANS"

Header: "Past sessions" · "New session" · "Crackle" · "Sign out"

## 6. Quality floor (unchanged, non-negotiable)
Full keyboard grid navigation (arrows move focus across the Wall, Enter drops the needle, Escape zooms out), amber focus ring always visible, `aria-live="polite"` announcements ("Now playing {album} by {artist}", the runout prompt), 44px touch targets, AA/AAA contrast as before, responsive to 360px, no layout shift (aspect-ratio boxes), reduced motion per §1.
