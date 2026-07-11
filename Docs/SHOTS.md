# SHOTS.md — Build plan for Claude Code

Run these as four sequential sessions. Paste each prompt as-is. Do not start a shot until the previous shot's checklist is fully green. Between shots, YOU (Yaron) test in a real browser with your real client ID — Claude Code cannot log into Spotify.

---

## Shot 1 — Skeleton, auth, data layer

**Prompt:**

> Read CLAUDE.md, PRD.md and DESIGN-SPEC.md in this repo in full, including DESIGN-SPEC §0 anti-generic rules. Build the foundation of Longplayur: the file structure from CLAUDE.md; self-hosted fonts (download the woff2 files into /fonts and declare @font-face per CLAUDE.md, no runtime Google Fonts); the SVG icon sprite from DESIGN-SPEC §0 and the groove brand mark and favicon; index.html with all screens present but wall/journal as placeholder shells; styles.css implementing the full token system, the sleeve-back setup layout, and the 33 rpm loading state from DESIGN-SPEC §4; auth.js (complete PKCE flow with state param, token refresh, sign-out per PRD F2); spotify.js (fetch wrapper, 429 handling with max 2 retries, typed errors); albums.js (full pool builder per PRD F3 including saved-albums merge, dedupe, scoring, 24h localStorage cache) plus the pure spiralPosition(rank) function with tests; the setup screen per PRD F1 with the exact copy-deck strings, both specified error states, and the Test connection diagnostic. Wire boot flow in main.js: callback handling, cached session, setup. End state: I can complete setup with my own client ID, authenticate, run Test connection and see OK lines, and see a temporary debug list of my top albums with scores. Implement the strict CSP meta tag and referrer meta now, not later.

**Acceptance:**
- [ ] Setup renders as the sleeve-back layout at 360px and desktop; redirect URI shown and copyable; no glyph icons, no dashes in copy
- [ ] Fonts load from /fonts; network tab shows zero requests to Google
- [ ] Full PKCE round-trip works; refresh works (test by faking `expires_at` in the past); Test connection reports correctly for both a working and a broken (unauthorised) setup
- [ ] 403 and redirect-mismatch errors show their exact copy-deck strings
- [ ] spiralPosition tests pass
- [ ] Pool builds: ≥ 9 albums for a normal account, singles < 4 tracks excluded, saved albums merged, cache hit on reload (verify via network tab: no top-tracks calls within 24h)
- [ ] CSP present; no console violations
- [ ] CLAUDE.md definition of done

---

## Shot 2 — Tapestry, Wall, playback

**Prompt:**

> Continue Longplayur (read CLAUDE.md, PRD.md, DESIGN-SPEC.md and the existing code first). Build: wall.js implementing the unified one-Wall-one-camera model per DESIGN-SPEC §2 and PRD F4+F5: spiral layout via spiralPosition, the camera framed on a 3×3 region by CSS transform, pan-to-centre on selection, zoom out via the SVG zoom-out button, pinch, scroll, and Escape, lazy cover images, brightness-lift hover (no scaling), played-state styling, edge handling per the copy deck. No journey thread yet. Also playback.js: Web Playback SDK init with 8s timeout, Spotify Connect device-picker fallback per PRD F7, play/pause/skip with the SVG icon set, player bar per DESIGN-SPEC §4 with ALBUM-level progress (fetch tracklist durations at play start). Full keyboard navigation across the Wall (arrows, Enter, Escape) and the aria-live region. Clicking a cover pans the camera and plays immediately (plain, the ceremony is shot 3). Include the device modal with its copy-deck strings.

**Acceptance:**
- [ ] The 3×3 camera view pixel-matches DESIGN-SPEC tokens; hover is a brightness lift, nothing scales
- [ ] Spiral layout is correct (rank 0 centre, ranks 1 to 8 the first ring); camera pans smoothly to any selected cover; zoom in/out at 60fps on a 100+ cover wall; Escape zooms out
- [ ] SDK path plays full albums in Chrome desktop; kill the SDK (block sdk.scdn.co) and the Connect fallback path works end to end
- [ ] Player bar shows album-level progress advancing across track boundaries
- [ ] Full keyboard operation of the grid; screen reader announces now-playing
- [ ] CLAUDE.md definition of done

---

## Shot 3 — The ceremony

**Prompt:**

> Continue Longplayur (read all docs and code first). This shot is the signature; execute DESIGN-SPEC §3 exactly, timings from one TIMINGS object. Build ceremony.js: the needle-drop choreography (recede, camera pan with the chosen cover scaling on an overlay layer, serif title and deadwax line, THE DISC sliding out from behind the sleeve, the held breath); the breath is skippable per spec with the crackle stopping on a soft tick; Web Audio synthesised crackle exactly as specified (no audio files), header toggle persisted to lp_crackle, default on, one-time deadwax hint after the first needle drop; the tonearm arc as an amber stroke on the disc's exposed edge driven by album-elapsed time; the runout-groove sequence with the single wake ripple (no looping animations) offering the 8 Wall neighbours, and the copy-deck prompts including the wall-edge variant. Build ending.js as pure functions per CLAUDE.md with tests.html covering the required cases for both SDK and Connect detection, then wire both playback paths to trigger the runout groove. Implement the reduced-motion collapse per DESIGN-SPEC §1.

**Acceptance:**
- [ ] Needle drop timing matches the choreography table within ~100ms (record it and watch); the disc slide reads clearly as a record leaving its sleeve
- [ ] The held breath actually holds, and skipping it (click/Enter/Space) cuts cleanly to play with the crackle tick
- [ ] Crackle NEVER overlaps Spotify audio; toggle persists; one-time hint shows exactly once
- [ ] Tonearm arc creeps continuously and reaches 360° as the last track ends
- [ ] tests.html: all ending-detection cases pass; skip-to-next-album, scrubbing, and pausing near the end do NOT false-trigger the runout groove
- [ ] Real-world test: play a short album to the end on BOTH playback paths; runout groove fires on both
- [ ] Reduced-motion mode verified with emulation
- [ ] CLAUDE.md definition of done

---

## Shot 4 — Record bag, journey thread, export, ship

**Prompt:**

> Continue Longplayur (read all docs and code first). Build: journal.js per PRD F8 — sides lifecycle (first needle drop opens, New side / 6h inactivity closes), liner notes from the player bar and record bag with autosave, the record bag view per DESIGN-SPEC with delete-side confirm copy; the journey thread, an amber SVG polyline inside the wall container connecting this side's played covers in order (drawing itself via stroke-dashoffset when the Wall view opens), and played-cover glow; exporter.js, the 1080×1350 canvas share card per the EXACT layout in DESIGN-SPEC §4 including the tainted-canvas typographic fallback; header actions (Record bag, New side, Crackle, Sign out). Then the ship pass: write the public README (lead with the anti-shuffle line and the Feb 2026 story, GIF placeholder at top, fork-to-deploy instructions for GitHub Pages and a Deploy-to-Vercel button, privacy section, honest limitations), add repo topics suggestions, and run a final QA sweep against every edge case in PRD (list each with pass/fail).

**Acceptance:**
- [ ] A full evening flow works: setup → needle drop → runout → next album → liner note → record bag shows the side → export produces a correct share card
- [ ] Journey thread renders correctly on the Wall for a 3+ album side
- [ ] Export works with images (check canvas isn't tainted); typographic fallback demonstrably works if forced
- [ ] Journal survives reload, sign-out, and a two-tab session without corruption
- [ ] README complete; edge-case QA table all green or honestly red with notes
- [ ] Lighthouse: a11y ≥ 95, perf ≥ 90 on tapestry
- [ ] CLAUDE.md definition of done

---

## After shot 4 (yours, not Claude Code's)
1. Record the GIF: one needle drop → held breath → music, 8 seconds, drop into the README
2. Push, enable Pages, set the About link
3. Launch order: WhatsTyped posts first (they're written), then Show HN for Longplayur leading with the constraint story
