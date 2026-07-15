# CLAUDE.md — Longplayur project conventions

You are building Longplayur, a client-side, no-build, open-source web app. Read `PRD.md` and `DESIGN-SPEC.md` in full before writing any code. Where they conflict with your instincts, they win. Where something is unspecified, choose the quieter option.

## Stack and structure (fixed — do not add frameworks or a build step)

Vanilla HTML/CSS/JS, ES2022, no dependencies, no bundler, no TypeScript. It must run from `npx serve .` and deploy to GitHub Pages as-is.

```
index.html
styles.css
js/
  main.js        // boot, screen routing, event wiring only
  auth.js        // PKCE, tokens, refresh
  spotify.js     // API client (fetch wrapper, 429 handling), endpoints
  albums.js      // pool building: top-tracks aggregation + saved albums, caching
  playback.js    // SDK init, Connect fallback, play/pause/skip, device picker
  ending.js      // end-of-album detection ONLY: pure functions + thin adapters
  ceremony.js    // needle drop, tonearm arc, runout groove, crackle (Web Audio)
  wall.js        // tapestry grid, Wall zoom, journey thread SVG
  journal.js     // sides, liner notes, record bag view, storage
  exporter.js    // canvas share card
  ui.js          // dom helpers, escapeHtml, live region announcements
LICENSE          // MIT
README.md
```

ES modules (`type="module"`). Each module exports a small explicit surface; no globals except the SDK's required `window.onSpotifyWebPlaybackSDKReady`.

## Security requirements (treat as hard constraints)

1. **PKCE only.** Authorization Code with PKCE. There is no client secret anywhere, ever. `code_verifier` in sessionStorage, cleared after exchange.
2. **XSS:** every string from Spotify (album names, artists, device names) is untrusted. Never interpolate into `innerHTML`. Build DOM via `textContent` / `createElement`, or pass through the single shared `escapeHtml`. Liner notes (user input) likewise.
3. **CSP:** fonts are SELF-HOSTED (download DM Serif Display 400, Inter 400/500/600, IBM Plex Mono 400 as woff2 into `/fonts` in shot 1; declare via @font-face; no runtime Google Fonts). This allows a strict policy. Add a meta CSP: `default-src 'self'; script-src 'self' https://sdk.scdn.co; connect-src 'self' https://accounts.spotify.com https://api.spotify.com; img-src 'self' https://*.scdn.co data:; style-src 'self'; font-src 'self'; frame-src https://sdk.scdn.co`. Note: JS setting `element.style` properties is NOT blocked by style-src, so no 'unsafe-inline' is needed; do not add it. If the SDK demonstrably requires a relaxation, make the minimal change and document why in a comment and in KNOWN-DEVIATIONS.md.
3a. **Threat model note:** tokens live in localStorage, so the primary risk is XSS. That is why rule 2 and the CSP are absolute, and why the only third-party script is Spotify's SDK (which cannot be SRI-pinned as Spotify rotates it; documented risk, accepted).
3b. **Links and referrers:** every external link gets `rel="noopener noreferrer"`. Add `<meta name="referrer" content="no-referrer">`. The OAuth `code` is stripped from the URL via `history.replaceState` before anything else runs.
4. **Storage:** localStorage keys prefixed `lp_`. Tokens in `lp_tokens`. Journal is versioned (`v` field) with a migration stub. Never store anything a third party could use beyond the user's own browser.
5. **Telemetry.** Vercel Web Analytics (same-origin, `/_vercel/insights/*`, no CSP change needed) and Google Analytics (GA4, `www.googletagmanager.com` / `www.google-analytics.com`) are in use, added per explicit request; see `KNOWN-DEVIATIONS.md` for when and why this superseded the original no-analytics stance. State this plainly in the README rather than leaving a stale "no analytics" claim.
6. **OAuth hygiene:** `state` parameter used and verified. Auth errors from the callback are displayed, never silently retried in a loop.

## Code conventions

- British English in ALL user-facing copy; use the copy deck in DESIGN-SPEC verbatim.
- **No em dashes and no en dashes in any user-facing string** (UI text, errors, aria-labels, share card, README's quoted UI strings). Use full stops, commas, colons, or the interpunct (·) in deadwax lines. Add a grep for `—` and `–` across user-facing strings to the definition of done.
- **No emoji or unicode glyph icons.** All icons are inline SVG per DESIGN-SPEC §0. Grep for common glyphs (⏮⏸▶⏭⤢⌄⛭✕) as part of done.
- `spiralPosition(rank)` (Wall layout) is a pure function with tests in tests.html (first 25 ranks asserted).
- The vinyl vocabulary (needle drop, side, runout groove, record bag, liner notes) appears in UI copy and user-facing identifiers; internal function names stay plain (`onAlbumEnded`, not `onRunoutGroove`).
- Network retries are BOUNDED: 429 handling retries at most twice per request, honouring Retry-After, then surfaces the error.
- `ending.js` contains pure, unit-testable functions: `detectEndFromSdkStates(prev, next)` and `detectEndFromConnectSnapshots(prev, next)`. Include a tiny test harness (`tests.html` opening a page that runs assertions and prints pass/fail) covering at least 8 cases each: normal end, track skip near end, pause near end, scrub to 0, single-track album, context change mid-album, device switch, repeat-on.
- No magic numbers in ceremony timing: all durations imported from one `TIMINGS` object matching DESIGN-SPEC §3.
- Comments explain WHY (policy constraints, Spotify quirks), not what.

## Accessibility (part of done, not polish)

Everything in DESIGN-SPEC §5. Specifically verify: grid arrow-key navigation, Enter to needle-drop, focus visible at all times, `aria-live="polite"` region announcing "Now playing {album}" and the runout prompt, all buttons labelled, reduced-motion path actually implemented (test with the emulation toggle).

## Definition of done (every shot)

- [ ] Zero console errors/warnings on the happy path
- [ ] Works served from a subpath (GitHub Pages `/longplayur/`) — no absolute root paths
- [ ] All copy from the copy deck, no invented strings without flagging them
- [ ] Reduced motion respected in anything animated this shot
- [ ] Keyboard operable for anything interactive this shot
- [ ] No unescaped Spotify/user strings in the DOM (grep for `innerHTML`)
- [ ] No em/en dashes and no glyph icons in user-facing output (grep)
- [ ] The shot's acceptance checklist in `SHOTS.md` fully ticked, honestly

## Honesty rule

If Spotify's live behaviour contradicts the spec (endpoints, SDK events, CORS on images), do not fudge around it silently: implement the closest working behaviour, and add a `KNOWN-DEVIATIONS.md` entry explaining what differed and what you did.
