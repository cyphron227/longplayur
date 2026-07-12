# INCREMENT-01 — Longplayur consolidation build

You are working on the existing Longplayur repository. This is an INCREMENTAL build against code that has drifted from the docs: manual tweaks have been made since PRD.md, DESIGN-SPEC.md and SHOTS.md were written. Follow the phases in order. Commit at the end of each phase with the phase name.

## Ground rules

1. Read CLAUDE.md, PRD.md, DESIGN-SPEC.md, then the ENTIRE codebase before changing anything.
2. **The repo is the source of truth wherever it and the docs disagree** (naming, layout tweaks, copy changes). Never revert a manual change to match the docs; instead update the docs to match the code. Log every discrepancy you find and how you resolved it in KNOWN-DEVIATIONS.md.
3. All existing hard rules stand: no em or en dashes in user-facing copy, no emoji or unicode glyph icons (inline SVG only), no innerHTML with unescaped strings, strict CSP, British English, copy-deck voice.
4. Audit-first in every phase: if something is already implemented, verify it against spec and move on; if half-implemented, finish it; only build from scratch what's absent.

## Phase 0 — Reconcile naming and docs

- The journal concept has been renamed by the owner: **"sides" are now "sessions"** everywhere. Complete this rename across code, UI copy, aria-labels, storage (migrate keys/fields if any still say side), docs and README. Deadwax format becomes `SESSION 12 · 11 JUL 2026`. Header action: "Past sessions". Prompt copy: "Session {n} · now playing". Runout copy: "The session isn't over. Choose the next record." New-session action: "New session". Confirm-delete: "Forget session {n}? The music stays; the record of it goes."
- "Record bag(s)" refers ONLY to curated collections (the bag rail), never the journal. Grep and fix any leftover journal uses.
- Update PRD.md and DESIGN-SPEC.md copy deck to reflect all of this and anything else the code has changed, so the docs are trustworthy again.

## Phase 1 — Friction fixes (formerly shot 5; skip whatever already exists)

- Setup screen per revised PRD F1: redirect-URI copy step FIRST; prominent notice that the Spotify developer dashboard must be done on a computer, with a copyable link to this page shown on mobile ("Send this page to your computer:"); four steps in real-world order; Test connection diagnostic.
- Silent desktop reconnect (PRD F7): on load with a valid session, init the SDK player and transfer playback to it (`PUT /me/player`, `play: false`). The user must never see Spotify's no-device state on desktop.
- Android wake flow (PRD F7): when no devices are found on a phone, one button "Wake Spotify" deep-links to the Spotify app; on visibilitychange back, re-poll devices for up to 15s, auto-select this phone, show the confirmation "Found this phone. Carrying on." (moss, deadwax, auto-dismisses), and resume the intended action.
- Output switcher: persistent cast-style SVG icon on the player bar; shows current device; lists devices; transfers mid-session via `PUT /me/player` with `device_ids`. Works during a session without losing the tonearm arc.

## Phase 2 — Record bags and Records nearby (formerly shot 6; skip whatever already exists)

- Bag rail per DESIGN-SPEC §2: half-tile chips in deadwax mono above the wall, "YOUR WALL" first; each bag is its own spiral wall; crossfade swap; camera snaps to whole rows and columns so no cover is ever cropped at any viewport (letterbox with obsidian).
- Six seed bags as `/bags/*.json` (name, blurb, albums as title+artist pairs), ORIGINAL curation, 15 to 25 albums each: 90s US rap, soul essentials, Motown, trip hop, Britpop, late-night jazz. Do not reproduce any publication's list. Lazy resolution to Spotify album IDs via search, cached per bag, unresolvables skipped silently.
- Records nearby per PRD F10: player-bar action opens a low shelf of 4 to 6 related albums via Deezer's keyless public API (artist search → related artists → top albums ranked by fan count → mapped to Spotify IDs via search, 7-day cache). Plain fetch first; JSONP fallback only per the CLAUDE.md security rules (randomised callback, script removal, 10s timeout, documented in KNOWN-DEVIATIONS.md). Feature hides itself if Deezer is unreachable. Captions: `ARTIST · {n} FANS`. Needle drop from the shelf runs the full ceremony. Session entries record their source bag.

## Phase 3 — New changes (this increment's additions)

### 3a. Remove liner notes entirely
- Delete the notes UI (player bar and Past sessions), all code paths that read or write notes, and the placeholder copy.
- Migrate the stored journal to the next version number, dropping any `note` fields. Existing sessions must survive the migration intact otherwise.

### 3b. Native share on mobile
Upgrade the session export from save-a-picture to a proper share:
- Render the share card canvas, then `canvas.toBlob` → `new File([blob], "longplayur-session-{n}.png", { type: "image/png" })`.
- If `navigator.canShare && navigator.canShare({ files: [file] })`: call `navigator.share({ files: [file], title: "Longplayur", text: "Session {n} · {date}" })`. This triggers the native share sheet on Android and iOS.
- Fallbacks: unsupported (desktop) → download the PNG as now. `AbortError` (user cancelled the sheet) → silent, no error UI. `NotAllowedError` or any other failure → fall back to download.
- iOS Safari requires the share call to happen within the user's tap: keep async work between tap and `share()` minimal. If the card render is slow, pre-render it when Past sessions opens so the tap handler only does toBlob + share. Test on iOS specifically; if transient activation is lost, restructure until it isn't.

### 3c. Move share to the session row
- The share action moves to the TOP of each session in Past sessions: an export SVG icon on the collapsed session row itself (right-aligned, 44px target, aria-label "Share session {n}"), so sharing never requires expanding the session details.
- Remove the old button position inside the expanded view. One share affordance per session, on the row.

## Phase 4 — Sweep and verify

- Greps, all must return nothing in user-facing output: `—` and `–`; glyph icons (⏮⏸▶⏭⤢⌄⛭✕); the words "side"/"sides" used for the journal; "record bag" used for the journal; "liner"; "note" in journal UI.
- Zero console errors across: setup, connect, needle drop, runout, bag switch, nearby shelf, share (mobile and desktop paths), sign out.
- Update README to reflect sessions naming, record bags, Records nearby, and the share behaviour.
- Append a dated summary of everything this increment changed to KNOWN-DEVIATIONS.md.

## Acceptance (tick honestly before finishing)
- [ ] Docs now match the code; discrepancies logged, nothing manually-changed was reverted
- [ ] No journal string anywhere says side, record bag, or mentions notes
- [ ] Desktop reconnect: after 24h idle, play works with no device prompt
- [ ] Android: Wake Spotify round-trip auto-selects the phone within 15s
- [ ] Output switcher transfers playback mid-album and back
- [ ] No cover is ever partially cropped at 360px, tablet, desktop, in every bag
- [ ] Nearby shelf works, and hides cleanly with api.deezer.com blocked
- [ ] Share: native sheet appears on Android and iPhone with the image attached; cancelling is silent; desktop downloads; share icon sits on the collapsed session row
- [ ] Journal migration preserves all existing sessions minus notes
- [ ] CLAUDE.md definition of done
