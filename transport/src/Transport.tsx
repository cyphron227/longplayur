// The transport (player bar): react-h5-audio-player supplies the outer
// shell, layout classes, and accessibility scaffolding, but not its own
// audio playback -- Longplayur never has a local audio stream to hand a
// real <audio> element (Spotify's Web Playback SDK renders audio itself;
// Connect mode plays on a remote device entirely outside this tab), so
// this component is mounted with no `src` at all. Every interactive part
// (play/pause, prev/next, the progress fill, the device/nearby buttons)
// is therefore a custom element supplied through the library's
// customProgressBarSection/customControlsSection/customAdditionalControls
// slots rather than its built-in RHAP_UI members, which are only ever
// meaningful against a real, loaded <audio> element. See
// KNOWN-DEVIATIONS.md for the fuller reasoning.
import { createElement, type ReactNode } from 'react';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import './transport.css';

export interface TransportViewModel {
  trackName: string;
  artistName: string;
  albumName: string;
  albumArt: string | null;
  isPlaying: boolean;
  elapsedMs: number;
  totalMs: number;
  deviceName: string | null;
  mode: 'sdk' | 'connect' | null;
}

export interface TransportHandlers {
  onArtClick: () => void;
  onPrev: () => void;
  onPlayPause: () => void;
  onNext: () => void;
  onNearby: () => void;
  onDeviceSwitch: () => void;
}

export interface TransportProps {
  viewModel: TransportViewModel;
  handlers: TransportHandlers;
}

// Mirrors js/ui.js's formatDuration() exactly (M:SS, or H:MM:SS past an
// hour). Duplicated rather than shared -- this build has no access to the
// app's own ES modules, the same trade-off gallery/ already accepted for
// its own small helpers.
function formatDuration(ms: number): string {
  const totalSeconds = Math.max(0, Math.round(ms / 1000));
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  if (hours > 0) {
    return `${hours}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }
  return `${minutes}:${String(seconds).padStart(2, '0')}`;
}

// References the shared SVG sprite defined once in index.html -- a <use>
// with a local fragment resolves against the whole document, not just
// this subtree, the same way Flip/Runout's plain-JS-built markup already
// references it, so no icon data needs duplicating into this bundle.
function spriteIcon(id: string): ReactNode {
  return createElement(
    'svg',
    { className: 'icon', 'aria-hidden': true },
    createElement('use', { href: `#${id}` })
  );
}

function iconButton(opts: {
  key: string;
  icon: string;
  label: string;
  onClick: () => void;
  className?: string;
}): ReactNode {
  return createElement(
    'button',
    {
      key: opts.key,
      type: 'button',
      className: `icon-btn lp-transport-icon-btn ${opts.className || ''}`.trim(),
      'aria-label': opts.label,
      title: opts.label,
      onClick: opts.onClick,
    },
    spriteIcon(opts.icon)
  );
}

export default function Transport({ viewModel, handlers }: TransportProps): ReactNode {
  const pct = viewModel.totalMs ? Math.min(100, (viewModel.elapsedMs / viewModel.totalMs) * 100) : 0;
  const showDevice = viewModel.mode === 'connect' && Boolean(viewModel.deviceName);

  const header = createElement(
    'div',
    { className: 'lp-transport-meta' },
    createElement(
      'button',
      {
        type: 'button',
        className: 'lp-transport-art-btn',
        'aria-label': 'Show now playing',
        title: 'Show now playing',
        onClick: handlers.onArtClick,
      },
      viewModel.albumArt
        ? createElement('img', { className: 'lp-transport-art', src: viewModel.albumArt, alt: '' })
        : createElement('div', { className: 'lp-transport-art lp-transport-art-empty' })
    ),
    createElement(
      'div',
      { className: 'lp-transport-text' },
      createElement('div', { className: 'lp-transport-track' }, viewModel.trackName || ''),
      createElement('div', { className: 'lp-transport-artist' }, viewModel.artistName || ''),
      createElement('div', { className: 'lp-transport-album' }, viewModel.albumName || '')
    )
  );

  // Everything below the header lives in one custom row, passed as the
  // library's whole customControlsSection -- customProgressBarSection is
  // left empty (see transport.css, which hides its now-permanently-empty
  // wrapper div) rather than split across the library's own progress/
  // controls halves, since those assume a real <audio> element's metadata
  // driving their layout math. One flat row also matches the bar's
  // previous single-row bottom half more closely than the library's
  // two-part default would.
  const bottomRow = [
    createElement(
      'div',
      { key: 'bottom', className: 'lp-transport-bottom-row' },
      createElement(
        'div',
        { key: 'controls', className: 'lp-transport-controls' },
        iconButton({ key: 'prev', icon: 'icon-previous', label: 'Previous album', onClick: handlers.onPrev }),
        iconButton({
          key: 'playpause',
          icon: viewModel.isPlaying ? 'icon-pause' : 'icon-play',
          label: viewModel.isPlaying ? 'Pause' : 'Play',
          onClick: handlers.onPlayPause,
          className: 'lp-transport-playpause',
        }),
        iconButton({ key: 'next', icon: 'icon-next', label: 'Next album', onClick: handlers.onNext })
      ),
      createElement(
        'div',
        { key: 'progress', className: 'lp-transport-progress-wrap' },
        createElement('span', { className: 'lp-transport-time' }, formatDuration(viewModel.elapsedMs)),
        createElement(
          'div',
          { className: 'lp-transport-progress' },
          createElement('div', { className: 'lp-transport-progress-fill', style: { width: `${pct}%` } })
        ),
        createElement('span', { className: 'lp-transport-time' }, formatDuration(viewModel.totalMs))
      ),
      showDevice
        ? createElement('span', { key: 'device', className: 'lp-transport-device' }, `Playing on ${viewModel.deviceName}`)
        : null,
      iconButton({ key: 'nearby', icon: 'icon-nearby', label: 'Records nearby', onClick: handlers.onNearby }),
      iconButton({ key: 'device-switch', icon: 'icon-device', label: 'Choose playback device', onClick: handlers.onDeviceSwitch })
    ),
  ];

  return createElement(AudioPlayer, {
    className: 'lp-transport',
    src: undefined,
    autoPlay: false,
    autoPlayAfterSrcChange: false,
    showJumpControls: false,
    showSkipControls: false,
    showFilledProgress: false,
    showDownloadProgress: false,
    hasDefaultKeyBindings: false,
    layout: 'stacked',
    header,
    customProgressBarSection: [],
    customControlsSection: bottomRow,
  });
}
