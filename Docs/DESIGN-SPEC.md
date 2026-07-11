# Longplayur — Design Specification (v2, post-review)

The interface is a listening room at night. The album covers are the only colour; everything else recedes. Slowness is a feature: this app should feel like the opposite of an infinite feed.

## 0. Anti-generic rules (read first)

These exist because the obvious implementation of this spec looks AI-generated. They are hard requirements:

1. **No emoji and no unicode glyph icons** (no ⏮ ⏸ ⤢ ⌄ ⛭ anywhere). All icons are inline SVG, 1.5px stroke, round caps, drawn from a shared sprite in index.html. Icon set needed: play, pause, previous, next, zoom-out (four corners), chevron, crackle (three short arcs), close, copy, export, bin.
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
| Deadwax | IBM Plex Mono 400 | Dates, times, side numbers, durations. ALL CAPS, tracking 0.08em, 11 to 12px, bone-dim. e.g. `SIDE 12 · 23:47 · 11 JUL 2026` |

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

## 3. The ceremony (choreography, exact)

### The disc (signature element)
When an album plays, a vinyl disc slides out from behind its sleeve: a circle of `--vinyl`, diameter 92% of the tile, offset so ~30% of it shows beyond the sleeve's right edge, carrying 3 concentric hairline grooves and a small centre label rendered from the album art's dominant edge. The **tonearm arc** is an amber stroke on the disc's exposed edge, showing progress through the WHOLE ALBUM (elapsed across all tracks ÷ total album duration, from `GET /albums/{id}` track durations). It advances with a 1s linear transition so it creeps like a stylus.

### Needle drop (from click; audio at ~3.0s)
| t (ms) | What |
|---|---|
| 0 | Click. All other covers ease to 20% opacity (`--dur-breath`). No scaling of anything except the chosen cover |
| 0 to 600 | Camera pans to centre the chosen cover; the cover alone scales to 1.6 on an overlay layer (original cell hidden) |
| 400 | Serif album title fades in above; deadwax line below: `ARTIST · YEAR · N TRACKS · MM:SS` |
| 600 to 1100 | The disc slides out from behind the sleeve (translateX, `--dur-breath`) |
| 700 | Crackle starts if enabled: Web Audio synthesised, no audio file. Brown-noise bed at −38 dBFS through a 1.2 kHz low-pass, plus randomised tick bursts (2 to 6 per second, 3 to 8ms, band-passed 2 to 4 kHz). 200ms fade-in |
| 1100 to 3000 | **The held breath.** Nothing moves. The stillness is the feature |
| 3000 | Crackle fades (200ms). `PUT /me/player/play` fires |
| on first playing state | Title and deadwax fade; cover eases back to 1.0 into its cell WITH the disc still out; other covers return to 45%; player bar populates |

**The breath is skippable:** any click, Enter, or Space during it cuts straight to play. Skipping must feel intentional, not like fixing a bug: the crackle stops with a soft tick.

First needle drop ever shows a one-time deadwax hint under the player bar: `CRACKLE ON · TOGGLE IN THE HEADER`.

### Runout groove (album end)
| t | What |
|---|---|
| 0 | Arc reaches 360°, pulses twice (opacity 1 → 0.4 → 1, 800ms each). If crackle enabled, a quiet runout loop plays, max 30s |
| 800 | A single wake ripple: neighbours brighten to 100% in one wave outward from the centre (60ms stagger per ring), then REST at full. No looping animation |
| 800 | Prompt: "Side's not over. Choose the next record." |

## 4. Screens

### Setup: the sleeve back
Left-aligned editorial layout like the back of a record sleeve, not a centred hero. Wordmark top-left with the groove mark. Steps numbered in deadwax mono (`01` `02` `03`) like a tracklist, hairline rules between them. The redirect URI in a mono well with a copy button (SVG icon + "Copy"). Client ID input below step 03. One amber button: "Connect Spotify". Footer hairline, then the honesty line and repo link.

After a successful connect and pool build, and on demand via a "Test connection" link in error states: run `GET /me` + a 1-item top-tracks call and report each as `OK` / `FAILED: <specific fix>` in deadwax mono. Diagnosis beats documentation.

### Loading
The groove mark, larger, rotating at 33⅓ rpm (1800ms/rev), amber stylus dot fixed. Copy: "Pulling records from the shelf."

### Player bar
`[art] Track name / Album · Artist    prev play next` with the album-level progress hairline below (amber fill) and times in deadwax. Device note (moss): "Playing on {device}" when on Connect.

### Record bag
Shelf of sides, newest first. Each row: `SIDE 12 · 11 JUL 2026 · 4 RECORDS` in deadwax, a strip of mini covers joined by a thin amber thread, chevron to expand. Expanded: entries with liner-note fields, "Export this side", "Forget this side".

### Share card (1080×1350 canvas, exact layout)
Obsidian field, 64px margin. Covers of the side in play order on a 4-column layout: cover 1 at 480px spanning columns 1 to 2, subsequent covers 224px flowing left to right beneath, all corners 8px radius, amber thread (3px, 60% opacity) connecting cover centres in order, drawn UNDER the covers. Top-left, DM Serif 56px, bone: "A side, played in full." Bottom hairline, then deadwax 24px: `SIDE 12 · 11 JUL 2026 · LONGPLAYUR`. Typographic fallback (tainted canvas): same frame, covers replaced by a numbered tracklist of `ALBUM / ARTIST` lines, serif heading unchanged.

## 5. Copy deck (verbatim; British English; sentence case; no exclamation marks; no em or en dashes)

Setup
- Tagline: "Whole albums, in order, on purpose."
- Why-BYO: "Spotify no longer opens its API to independent apps, so Longplayur can't offer a normal log-in. Instead you create your own free Spotify app. Five minutes, once. This page then runs entirely in your browser using it, and nothing about your listening ever leaves your machine."
- Steps: "Create a Spotify app" / "Set the redirect URI" / "Paste your client ID"
- Premium note: "Spotify requires a Premium account for this."
- Button: "Connect Spotify" · Diagnostics link: "Test connection"

Prompts
- First run: "Drop the needle on something."
- Playing: "Side {n} · now playing" (n = count of sides in the journal, lifetime)
- Runout: "Side's not over. Choose the next record."
- Runout at wall edge: "You've reached the edge of the wall. Zoom out and pick from the shelf."
- Wall: "Your wall. {N} records. Tap one to drop the needle."

Errors
- 403 top tracks: "Spotify refused (403). In your app's settings on the developer dashboard, add your own Spotify account under User Management, then try again."
- Redirect mismatch: "Spotify rejected the redirect. The redirect URI in your app settings must match this exactly: {uri}"
- No devices: "No Spotify devices found. Open Spotify anywhere, play anything for a second, then refresh."
- Restricted album: "Spotify won't play this one here. Pick another record."
- Sparse history: "Not enough listening history yet to build a wall. Play more albums and come back."
- Offline: "You're offline. The music may continue; the room will catch up when you're back."

Journal
- Empty record bag: "No sides yet. The first needle drop starts one."
- Liner notes placeholder: "Liner notes. What did this one do to you?"
- Export: "Export this side" · Delete: "Forget this side" · Confirm: "Forget side {n}? The music stays; the record of it goes."

Header: "Record bag" · "New side" · "Crackle" · "Sign out"

## 6. Quality floor (unchanged, non-negotiable)
Full keyboard grid navigation (arrows move focus across the Wall, Enter drops the needle, Escape zooms out), amber focus ring always visible, `aria-live="polite"` announcements ("Now playing {album} by {artist}", the runout prompt), 44px touch targets, AA/AAA contrast as before, responsive to 360px, no layout shift (aspect-ratio boxes), reduced motion per §1.
