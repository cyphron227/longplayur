# Longplayur

![Longplayur: one needle drop at a time](docs/demo.gif)
*(replace the GIF above: record one needle drop, held breath, music. About 8 seconds.)*

Whole albums, in order, on purpose.

Longplayur is an anti-shuffle listening room. Your Spotify history becomes a wall of album covers; you play whole albums, chosen deliberately, one needle drop at a time. No algorithm choosing what's next.

## Why you need your own Spotify app

Spotify closed its API to independent developers in February 2026: development mode now caps at 5 users and requires Premium, and extended access is reserved for registered businesses with 250k+ monthly active users. That shuts the door on small, free, open-source tools like this one talking to Spotify on a shared app.

Longplayur's answer is to skip the shared app entirely. It is free, open source, has no server and no build step, and every user runs their own instance with their own free Spotify client ID. Five minutes, once. After that, this page runs entirely in your browser using your own app, and nothing about your listening ever leaves your machine except calls to Spotify itself.

Spotify Premium is required; Longplayur does not work on the free tier.

## Try it

A live instance can be deployed at your own domain (this build targets `longplayur.dan-gur.com`) or run locally:

```bash
npx serve .
```

Then open the URL it prints and follow the on-screen setup (create a Spotify app, set the redirect URI, paste your client ID).

## Deploy your own

### GitHub Pages

1. Fork this repository.
2. In your fork's Settings &rarr; Pages, set the source to the `main` branch, root folder.
3. Once it is live, open it and note the exact URL shown on the setup screen as your redirect URI.
4. Add that redirect URI to your Spotify app's settings at the [developer dashboard](https://developer.spotify.com/dashboard).

Longplayur has no build step and no absolute root paths, so it works from a project subpath like `you.github.io/longplayur/` without any configuration.

### Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/cyphron227/longplayur)

Vercel needs no build command and no environment variables; it is a static site.

## First-run setup

1. Copy the redirect URI Longplayur shows you (it is `location.origin + location.pathname`, so it changes if you move the deployment).
2. Create a Spotify app at the [developer dashboard](https://developer.spotify.com/dashboard). Any name and description will do. This step needs a computer; on a phone, Longplayur offers a copyable link to send the page to one.
3. Add the redirect URI you copied in step 1 to the app's settings. It must match exactly.
4. Under your app's User Management, add your own Spotify account, since development-mode apps are capped at 5 allowlisted users, then paste the client ID into Longplayur and press Connect Spotify.

If something goes wrong, use the "Test connection" diagnostic on the setup screen: it runs a `GET /me` and a one-item top-tracks call and reports each as OK or a specific, actionable failure.

## Vocabulary

Longplayur uses vinyl language throughout the interface:

| Term | Meaning |
|---|---|
| Needle drop | Choosing and starting an album |
| Tonearm arc | The album-wide progress indicator on the disc |
| Runout groove | The end of an album |
| A session | A listening session |
| Past sessions | Your journal of past sessions |
| A record bag | A curated album collection shown as a rail above the Wall |
| Records nearby | A shelf of related albums for whatever is currently playing |
| The Wall | The full zoomed-out view of your album history |
| New session | Starting a fresh listening session |

## Record bags

Above the Wall sits a rail of chips: "YOUR WALL" (your own pool) plus six
seed bags shipped with Longplayur (`bags/*.json`) -- 90s US rap, soul
essentials, Motown, trip hop, Britpop, and late-night jazz, each an
original 15-to-25-album curation. Selecting one crossfades the Wall to
that bag; the albums resolve to real Spotify album IDs via search the
first time you open that bag, then stay cached. Anything you play from a
bag records into Past sessions exactly like anything else, tagged with
which bag it came from.

## Records nearby

While something is playing, the device-shaped icon's neighbour on the
player bar (the overlapping-circles icon) opens a shelf of 4 to 6 related
albums, sourced from Deezer's free public API (no account or key needed)
and mapped back to real Spotify albums. It hides itself with no error
state if Deezer cannot be reached.

## Search

A search field above the bag rail takes a free-text term plus an
explicit Artist/Genre toggle. Artist mode pulls that one artist's own
discography; genre mode finds several artists tagged with that genre and
pulls a few albums from each. Only full albums and EPs of 6 or more
tracks are shown; singles and compilations are filtered out. A result
replaces the Wall the same way a record bag does, with a dismissible chip
to get back
to your own wall.

## Privacy

- No accounts, no server, no analytics, no telemetry.
- Your Spotify client ID, tokens, cached album pool, and journal live only in your browser's local storage.
- Network requests go to Spotify's own domains (`accounts.spotify.com`, `api.spotify.com`, `sdk.scdn.co`), to Deezer's public API (`api.deezer.com`, for Records nearby only, and only artist/album metadata -- never your listening history), and to your own self-hosted copy of this site.
- Signing out clears your Spotify session tokens but keeps your client ID and your past sessions, so you are not re-typing your client ID or losing your listening history every time.

## Limitations, honestly

- Requires Spotify Premium. There is no free-tier fallback.
- The Web Playback SDK works in desktop Chrome, Edge, and Firefox. iOS Safari and most mobile browsers fall back to Spotify Connect (control a device that's already playing Spotify elsewhere) with a 5-second polling loop instead of the SDK's real-time events, so the player bar is slightly less responsive there.
- No playlists, no social features, no accounts, no native mobile app: this is a v1, and those are deliberate non-goals, not oversights.
- End-of-album detection is a heuristic (see `js/ending.js` and `tests.html`). It is unit-tested against 8+ cases per playback path, but has not yet been exercised against a real Spotify account by an automated agent; see `KNOWN-DEVIATIONS.md`.
- The album disc's centre label is a flat colour rather than a true sample of the album art's dominant edge colour, to avoid a second canvas/CORS dependency inside the persistent per-cell SVG.
- The Android "Wake Spotify" flow, the output switcher, and native share have not been exercised on a real device by an automated agent; see `KNOWN-DEVIATIONS.md`.

## Development

The deployed site itself has no build step: it is served directly with
`npx serve .` and deploys to GitHub Pages or Vercel as-is. The one
exception is the Wall's dome gallery, which is a real React component
(forked from react-bits) compiled ahead of time into a plain static file:

```bash
npx serve .          # serve the site locally, no build needed

cd gallery && npm install && npm run build   # only needed after editing gallery/src/*
```

`gallery/` builds `gallery/src/DomeGallery.tsx` + `gallery/src/mount.tsx`
into `js/dome-gallery.bundle.js` (React, ReactDOM, and `@use-gesture/react`
inlined), which `js/wall.js` imports like any other static module. The
built bundle is committed, so cloning the repo and running `npx serve .` is
enough unless you're changing the gallery itself.

Open `tests.html` in a browser (or via the local server above) to run the pure-function test suite: both end-of-album detection functions in `js/ending.js`, covering skips, pauses, scrubs, repeat, device switches, and context changes.

```
index.html      screens, SVG icon sprite, the groove brand mark
styles.css      design tokens, layout, ceremony choreography CSS
gallery/        isolated Vite build for the Wall's dome gallery (see above)
bags/           seed record bag definitions (name, blurb, album/artist pairs)
js/
  main.js                 boot, screen routing, event wiring
  auth.js                 OAuth 2.0 PKCE, token refresh
  spotify.js              API client, 429 handling
  albums.js               pool building, scoring, caching
  bags.js                 record bag manifest + lazy Spotify resolution
  nearby.js               Records nearby, sourced from Deezer's public API
  search.js               search by artist or genre (Spotify's own API)
  wall.js                 bridges the dome gallery to the app's needle-drop/journal API
  dome-gallery.bundle.js  build output of gallery/ (React dome gallery), do not hand-edit
  playback.js             Web Playback SDK + Spotify Connect fallback, output switcher
  ending.js               end-of-album detection (pure functions)
  ceremony.js             needle drop, crackle (Web Audio), tonearm arc, runout groove
  journal.js              Past sessions storage (versioned, migrates forward)
  exporter.js             the share card (canvas, native share + download)
  ui.js                   DOM helpers, escaping, aria-live announcer
```

## License

MIT, see `LICENSE`.
