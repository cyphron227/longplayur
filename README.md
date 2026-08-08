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

1. Copy the redirect URI Longplayur shows you (it is `location.origin + location.pathname`, so it changes if you move the deployment), then log in and create a Spotify app at the [developer dashboard](https://developer.spotify.com/dashboard). Any name and description will do. This step needs a computer: the dashboard is not built for small screens.
2. Add the redirect URI you copied to the app's settings. It must match exactly.
3. Under your app's User Management, add your own Spotify account, since development-mode apps are capped at 5 allowlisted users, then paste the client ID into Longplayur and press Connect Spotify.

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
| A record bag | A curated album collection, chosen from the Record bags screen |
| Records nearby | A shelf of related albums for whatever is currently playing |
| The Wall | The full zoomed-out view of your album history |
| New session | Starting a fresh listening session |
| Flip | The searchable list view of the Wall, alongside the spinning dome (Spin) |
| Shelves | The Record bags screen's grouped rows: your record bags, by mood, by decade, New arrivals, your playlists |
| Runout groove | Also the name of the screen offering nine directions for what to play next, once an album ends |

## Record bags, playlists, search, and New arrivals

A "Record bags" tab sits alongside Now Playing, Past sessions, and Setup. It's
where you choose what's on the Wall, grouped into shelves like a real
shop: a "Your Record Bag" button always returns to your own pool; below
it, "Your record bags", "By mood", and "By decade" each scroll
horizontally, then New arrivals (if you follow any artists) and your own
Spotify playlists. A search field lets you pull in an artist's discography.

Opening a record bag or playlist card lands on a **bag detail** view first,
rather than committing straight to the Wall: every album in it as a small
cover, amber-ringed and full brightness if you've played it, dimmed if not
(the same look the Wall's own zoomed-out view already uses for played
covers), with an "X of N played" count. "Play this bag" loads the whole
thing onto the Wall exactly as a card click used to; tapping any individual
cover does the same and starts playing that one directly. New arrivals,
search results, and Your Record Bag itself skip this and crossfade straight
to Now Playing, the same as before -- none of them is a fixed, named list
of albums the way a bag or playlist is.

**Record bags** ship with Longplayur (`bags/*.json`) -- six original seed
bags (90s US rap, soul essentials, Motown, trip hop, Britpop, late-night
jazz) and two chart bags (Cool Guide Top Albums 1-25 and 26-50, transcribed
from a fan-made ranking), plus four mood bags (Sunday morning, Headphones
on, Driving, Rainy day) and seven decade bags (the 60s through the 2020s),
a first draft not yet vetted the way the original six were. Each is an
original 15-to-25 album curation; albums resolve to real Spotify album IDs
via search the first time you open that bag, then stay cached.

**New arrivals** is a fourth source: the latest album or EP from each
artist you follow on Spotify, refreshed every few hours. It needs the
`user-follow-read` scope, and hides itself entirely if you follow nobody
or Spotify can't be reached, rather than showing an empty card.

**Your Spotify playlists** (owned and followed) work the same way, needing
the `playlist-read-private` and `playlist-read-collaborative` scopes.
A playlist's albums resolve without an extra search call (they're already
on the playlist's own tracks) and re-resolve automatically if you edit the
playlist later.

If you connected before New arrivals or playlists were added, sign out and
reconnect once to grant their scopes.

Anything you play from a bag, playlist, search result, or New arrivals
records into Past sessions exactly like anything else, tagged with where
it came from.

## Flip: find in your crate

The dome (Spin) is for browsing by feel. Flip, a toggle at the top of Now
Playing, swaps it for a real, searchable, sortable list over the same
pool: a text search, a **Sort** row (artist A-to-Z, genre, or recently
played -- how the list is ordered) and a separate **Show** row (all, unplayed
only, or listened only -- what's actually in it), with sticky group headers
under alpha/genre sort. Sort and Show used to be one row of chips, which
made "Recently played" read as a filter it never was (sorting alone never
removes anything); they're deliberately two controls now. Tapping a row
plays it exactly like tapping a cover on the dome. Your last-used mode,
sort, and show choices are all remembered.

Genre resolves automatically in the background as soon as a pool is
mounted, from Spotify's own artist data first and MusicBrainz second
(Spotify's own genre field has been observed to come back empty for most
artists in practice); resolved genres are cached in your browser for 30
days, so this cost is paid once per artist, not once per visit.

## Runout groove: nine ways to go next

When an album ends, Longplayur no longer jumps straight to the whole wall.
Instead it offers up to nine honestly-labelled directions, each grounded
in something the app can actually check: more from this artist, the same
genre or year from your own wall, a Deezer-related album, a keeper from
your crate (or, failing that, anything you've played before), an unplayed
pick from whatever bag or playlist you're in, a new arrival, a deliberate
left turn into a different genre, and playing it again. If fewer than nine
can be honestly filled for a given album, the grid simply shows fewer --
never a duplicate or invented pick. "Browse the full wall instead" is
still there if you'd rather zoom out yourself.

## Past sessions: tags, streaks, credits, and By album

Each played album in an expanded session can be marked keeper, spin again,
or pass; a keeper nudges that album to resurface a little more often on
the Wall, a pass a little less. Two or more consecutive days with a
needle drop shows as a small streak badge under the Past sessions header.
And on the selection preview (tap a cover before pressing Play), a
collapsed "Credits" line, closed by default, looks up producer/engineer/
performer credits from MusicBrainz -- a second, free, keyless source, since
Spotify's own API has none. Not every release has this data; when it
doesn't, the line simply says so.

A second toggle, "By album", swaps the chronological session-by-session log
for a flat, deduplicated list of every album you've ever played through
Longplayur, searchable and sortable (most recent, artist A-to-Z, or most
played). Tapping a row plays it directly, exactly like anywhere else in the
app.

## Records nearby

While something is playing, the device-shaped icon's neighbour on the
player bar (the overlapping-circles icon) opens a shelf of 4 to 6 related
albums, sourced from Deezer's free public API (no account or key needed)
and mapped back to real Spotify albums. It hides itself with no error
state if Deezer cannot be reached.

## Search

The search field on the Record bags screen takes a free-text artist name
and pulls that artist's own discography. Only full albums and EPs of 6 or
more tracks are shown; singles and compilations are filtered out. A result
replaces the Wall the same way a record bag does.

Genre search existed for a while (an Artist/Genre toggle, combining
several sources to work around Spotify's own sparse genre tags) and was
removed entirely: live testing found it returning wrong results for real
genre terms, matching "African music" and "Brazilian" to generically
popular, unrelated artists rather than anything actually related. Fixing
its several earlier bugs never addressed that fundamental problem, so it
was cut rather than patched again; see `KNOWN-DEVIATIONS.md` for the
history.

## Privacy

- No accounts, no server.
- This deployment uses Vercel Web Analytics and Google Analytics (GA4) to see page views and traffic. Neither sees your Spotify listening history, your client ID, or anything else this app stores locally -- they only see that the page was visited, same as any other website with analytics. If you deploy your own copy, both are entirely optional: remove the `<script>` tags for either (or both) in `index.html`, and their CSP entries alongside them, and no analytics data leaves your instance at all.
- Your Spotify client ID, tokens, cached album pool, journal (including any keeper/spin-again/pass tags), New arrivals cache, and small caches of genre names and MusicBrainz credits picked up from past use live only in your browser's local storage.
- Network requests go to Spotify's own domains (`accounts.spotify.com`, `api.spotify.com`, `sdk.scdn.co`), to Deezer's public API (`api.deezer.com`, for Records nearby and Runout groove's related-album direction, and only artist/album/genre metadata -- never your listening history), to MusicBrainz's public API (`musicbrainz.org`, for album credits only, looked up by artist and title, never your listening history), to Google Analytics (`www.googletagmanager.com`, `www.google-analytics.com`) and Vercel Analytics (same-origin, no separate domain), and to your own self-hosted copy of this site.
- Signing out clears your Spotify session tokens but keeps your client ID and your past sessions, so you are not re-typing your client ID or losing your listening history every time.

## Limitations, honestly

- Requires Spotify Premium. There is no free-tier fallback.
- The Web Playback SDK works in desktop Chrome, Edge, and Firefox. iOS Safari and most mobile browsers fall back to Spotify Connect (control a device that's already playing Spotify elsewhere) with a 5-second polling loop instead of the SDK's real-time events, so the player bar is slightly less responsive there.
- No playlists, no social features, no accounts, no native mobile app: this is a v1, and those are deliberate non-goals, not oversights.
- End-of-album detection is a heuristic (see `js/ending.js` and `tests.html`). It is unit-tested against 8+ cases per playback path, but has not yet been exercised against a real Spotify account by an automated agent; see `KNOWN-DEVIATIONS.md`.
- The album disc's centre label is a flat colour rather than a true sample of the album art's dominant edge colour, to avoid a second canvas/CORS dependency inside the persistent per-cell SVG.
- The Android "Wake Spotify" flow, the output switcher, and native share have not been exercised on a real device by an automated agent; see `KNOWN-DEVIATIONS.md`.
- Album credits (MusicBrainz) only cover release-level relationships, not the per-track credits MusicBrainz often records instead; and no other-server "Community Wax" (shared ratings across users) exists or is planned without its own separate architecture decision -- see `Docs/PRD.md`'s "Deferred: Community Wax" section.
- The eight mood and decade record bags (`bags/sunday-morning.json` and similar) are a first draft, assembled from general knowledge rather than vetted the way the original six were; review before relying on them.

## Development

The deployed site itself has no build step: it is served directly with
`npx serve .` and deploys to GitHub Pages or Vercel as-is. Two exceptions
are real React components compiled ahead of time into plain static files:
the Wall's dome gallery (forked from react-bits), and the transport
(player bar), built on `react-h5-audio-player`:

```bash
npx serve .          # serve the site locally, no build needed

cd gallery && npm install && npm run build     # only needed after editing gallery/src/*
cd transport && npm install && npm run build   # only needed after editing transport/src/*
```

`gallery/` builds `gallery/src/DomeGallery.tsx` + `gallery/src/mount.tsx`
into `js/dome-gallery.bundle.js` (React, ReactDOM, and `@use-gesture/react`
inlined), which `js/wall.js` imports like any other static module.
`transport/` builds `transport/src/Transport.tsx` + `transport/src/mount.tsx`
into `js/transport.bundle.js` (React, ReactDOM, and `react-h5-audio-player`
inlined), which `js/main.js` imports the same way; see
`KNOWN-DEVIATIONS.md` for why it is mounted with no real `<audio>` source.
Both built bundles are committed, so cloning the repo and running
`npx serve .` is enough unless you're changing one of these components.

Open `tests.html` in a browser (or via the local server above) to run the
pure-function test suite: end-of-album detection (`js/ending.js`, skips,
pauses, scrubs, repeat, device switches, context changes), the listening
streak (`js/journal.js`'s `streakDays()`), Flip's filter/sort/grouping
(`js/flip.js`), and Runout groove's direction-selection logic
(`js/runout.js`'s `buildRunoutGrid()`, including a sparse pool that can't
fill all nine directions).

```
index.html      screens, SVG icon sprite, the groove brand mark
styles.css      design tokens, layout, ceremony choreography CSS
gallery/        isolated Vite build for the Wall's dome gallery (see above)
transport/      isolated Vite build for the transport/player bar (see above)
bags/           record bag definitions (name, blurb, category, album/artist pairs)
js/
  main.js                 boot, screen routing, event wiring
  auth.js                 OAuth 2.0 PKCE, token refresh
  spotify.js              API client, 429 handling
  albums.js               pool building, scoring (incl. personal-tag weighting), caching
  bags.js                 record bag manifest + lazy Spotify resolution
  playlists.js            your Spotify playlists as a Wall source
  newarrivals.js          New arrivals: latest releases from followed artists
  deezer.js               shared Deezer public API client (fetch + JSONP fallback)
  nearby.js               Records nearby, sourced from Deezer's public API
  musicbrainz.js          album credits from MusicBrainz's public API
  search.js               search by artist (Spotify)
  flip.js                 Flip: filter/sort over the mounted Wall pool
  runout.js               Runout groove: the nine end-of-album directions
  wall.js                 bridges the dome gallery to the app's needle-drop/journal API
  dome-gallery.bundle.js  build output of gallery/ (React dome gallery), do not hand-edit
  transport.bundle.js     build output of transport/ (React player bar), do not hand-edit
  playback.js             Web Playback SDK + Spotify Connect fallback, output switcher
  ending.js               end-of-album detection (pure functions)
  ceremony.js             needle drop, crackle (Web Audio), tonearm arc, runout groove visual
  journal.js              Past sessions storage (versioned, migrates forward), streaks, tags
  exporter.js             the share card (canvas, native share + download)
  ui.js                   DOM helpers, escaping, aria-live announcer
```

## License

MIT, see `LICENSE`.
