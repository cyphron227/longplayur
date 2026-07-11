# Instructions for Yaron: what's left

Longplayur is fully built: all four shots from `SHOTS.md` are implemented,
every pure function is unit-tested (`tests.html`, 149/149 assertions pass),
and a code-level QA sweep against every PRD edge case is in
`KNOWN-DEVIATIONS.md`. What's left is everything that genuinely needs a human
with a Spotify account, a real browser, and DNS access. Claude Code cannot
log into Spotify, so **none of this has been exercised against a live
Spotify account** — that first real session is the most important item
below.

## 1. First real test run (do this first)

1. `cd longplayur && npx serve .` and open the printed URL.
2. Create your own Spotify app at the
   [developer dashboard](https://developer.spotify.com/dashboard).
3. Copy the redirect URI Longplayur shows you (step 02 on the setup screen)
   into your Spotify app's settings, exactly.
4. Under your app's **User Management**, add your own Spotify account
   (development-mode apps cap at 5 allowlisted users and require this or
   every request 403s).
5. Paste the client ID in, press **Connect Spotify**, and watch the
   diagnostics (Test connection) report `OK` for both `GET /me` and top
   tracks.
6. Walk the golden path once: wall loads → needle drop → held
   breath (try both letting it play out and skipping it with
   Enter/Space/click) → album plays → let one short album run to
   the runout groove → pick the next record → add a liner note
   → open the record bag → export a side → reload the page
   and confirm the journal survived.
7. Anything that behaves differently from `Docs/PRD.md` or
   `Docs/DESIGN-SPEC.md` (an endpoint shape, an SDK event, a timing that
   feels off) — add an entry to `KNOWN-DEVIATIONS.md` rather than
   silently living with it, per the project's own honesty rule.

Specific things worth deliberately checking, because they're the highest-risk
parts of the build and the easiest to get subtly wrong:

- **End-of-album detection on both paths.** Play a short album to the very
  end with the Web Playback SDK active (desktop Chrome/Edge/Firefox), then
  again after blocking `sdk.scdn.co` in devtools to force the Spotify
  Connect fallback. The runout groove should fire reliably on both. Also
  confirm it does **not** fire on: skipping tracks near the end, pausing
  near the end, scrubbing to 0, or a single-track album.
- **The held breath and its skip.** The crackle should never overlap actual
  Spotify audio; skipping should cut cleanly with a soft tick, not abruptly.
- **iOS/mobile.** If you have an iPhone or iPad, confirm it goes straight to
  the Spotify Connect device picker rather than trying (and failing) the SDK.
- **Two tabs open at once.** Confirm the journal doesn't corrupt.
- **Reduced motion.** Toggle it in devtools/OS settings and confirm the
  choreography collapses to short crossfades instead of erroring out.
- **The dome gallery's drag feel.** This is the one piece that has never
  been seen in an actual browser. Check whether `maxVerticalRotationDeg`
  (45 in `gallery/src/mount.tsx`) gives enough vertical tilt for your
  taste, and whether `dragDampening`/drag sensitivity feel right. It's a
  hemispheric dome, not a true full sphere (vertical drag is always
  clamped; horizontal spins freely) — see `KNOWN-DEVIATIONS.md` for why.
  After changing anything in `gallery/src/`, run `cd gallery && npm run
  build` to recompile `js/dome-gallery.bundle.js` before it'll show up.

## 2. Push to a real GitHub repository

This folder isn't a git repository yet (it currently lives as an untracked
directory inside `Company2Code`). `Docs/START-HERE.md` calls for Longplayur
to be its own repo, so:

```bash
cd longplayur
git init
git add .
git commit -m "Longplayur v1"
gh repo create longplayur --public --source=. --remote=origin
git push -u origin main
```

(Or create the GitHub repo by hand and `git remote add origin <url>` if you
don't use the `gh` CLI.)

Once the repo exists, update two placeholder links that currently point
nowhere real:

- `index.html`: the `id="repo-link"` anchor in the setup screen footer
  (currently `href="https://github.com/"`).
- `README.md`: the Vercel deploy button's `repository-url` query param
  (currently `YOUR_USERNAME`).

## 3. Deploy to longplayur.dan-gur.com

Longplayur is a static site with no build step, so any static host works.
Pick one:

**GitHub Pages with a custom domain**
1. Add a file named `CNAME` (no extension) to the repo root containing
   exactly `longplayur.dan-gur.com`.
2. In the repo's Settings → Pages, set the source to your default
   branch, root folder.
3. In dan-gur.com's DNS, add a `CNAME` record: `longplayur` →
   `<your-github-username>.github.io`.
4. Wait for DNS to propagate and GitHub to issue the HTTPS certificate.

**Vercel with a custom domain**
1. Import the repo in Vercel (no build command, no environment variables,
   no framework preset needed).
2. In the Vercel project's Domains settings, add `longplayur.dan-gur.com`.
3. Vercel will show you the DNS record (usually a `CNAME` to
   `cname.vercel-dns.com`) to add at your DNS provider for dan-gur.com.

Either way, once `https://longplayur.dan-gur.com/` is live:

- Open it and note the exact redirect URI it now shows (it will be
  `https://longplayur.dan-gur.com/`, but confirm the trailing slash matches).
- Add that as a **second** redirect URI on your Spotify app (Spotify apps
  support multiple), so both your local dev URL and production keep working.

## 4. Record the demo GIF

`README.md` has a placeholder at the top:
`![Longplayur: one needle drop at a time](docs/demo.gif)`. Record one needle
drop through to music starting (about 8 seconds, per `SHOTS.md`), save it as
`docs/demo.gif` in the repo, and it'll pick up automatically. This has to be
a real screen recording of a real needle drop; there's no way to fake it
convincingly and the whole pitch of this app is that the ceremony is worth
watching.

## 5. Lighthouse audit

PRD success criteria: accessibility ≥ 95, performance ≥ 90 on the
tapestry view. Run Lighthouse in Chrome DevTools against either your local
`npx serve .` instance or the deployed production URL, on the wall/tapestry
screen (not the setup screen). If either score comes in under target, the
likely first places to look are image sizing on the Wall (covers are
requested at Spotify's native sizes via `pickImage()` in `js/albums.js`,
preferring near-300px, which should already be reasonable) and any
console warnings Lighthouse surfaces.

## 6. Launch, if you want to

`Docs/SHOTS.md` notes a launch order: WhatsTyped posts first, then Show HN
leading with the constraint story (Spotify's February 2026 API closure).
That's entirely your call and timing, not something to automate.

---

Everything else — UI, ceremony, playback, the record bag, the share
card, accessibility, the CSP, the copy deck — is done and code-reviewed
against the spec. This list is what's left because it genuinely needs you: a
Spotify account, a real browser, DNS you control, and a camera pointed at a
needle drop.
