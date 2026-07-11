# Longplayur build pack — how to use

1. Create an empty repo `longplayur`, drop these four files in the root, plus your existing prototype if you want Claude Code to reference it (optional — the docs are self-contained).
2. Open Claude Code in the repo. It will pick up CLAUDE.md automatically.
3. Run the four prompts from SHOTS.md in order, one session each. Between shots, test in a real browser with your own client ID and tick the acceptance boxes yourself before continuing.
4. Anything Spotify does differently in the wild lands in KNOWN-DEVIATIONS.md — bring that back to the planning chat if it forces a spec change.

Files:
- PRD.md — what to build, edge cases, non-goals
- DESIGN-SPEC.md — tokens, layouts, ceremony choreography, verbatim copy deck
- CLAUDE.md — conventions, security hard constraints, definition of done
- SHOTS.md — the four build prompts with acceptance checklists
