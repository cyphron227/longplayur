// The share card: a 1080x1350 canvas. The session's covers sit in a square
// grid of 1, 4, 9 or 16 cells (whichever fits the count), with the album
// count and total running time overlaid on a dark scrim so the text stays
// readable whatever colours the covers happen to be. Album art needs
// crossOrigin="anonymous" (Spotify's CDN sends CORS headers); if the canvas
// is tainted anyway, or an image simply fails to load, we fall back to a
// typographic card rather than failing the export outright.

import { formatDeadwaxDate, formatRunningTime } from './ui.js';
import { sideDurationMs } from './journal.js';

const CANVAS_W = 1080;
const CANVAS_H = 1350;
const MARGIN = 64;
const GRID_SIZE = CANVAS_W - MARGIN * 2; // square grid area
const GRID_TOP = MARGIN + 56 + 40; // below the title baseline
const GRID_GAP = 16;
const MAX_COVERS = 16;
const CORNER_RADIUS = 8;

function roundedRectPath(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function loadImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error('Image failed to load.'));
    img.src = url;
  });
}

/** 1, 4, 9 or 16 cells: the smallest square grid that holds the covers. */
function gridDimension(count) {
  if (count <= 1) return 1;
  if (count <= 4) return 2;
  if (count <= 9) return 3;
  return 4;
}

function computeGridCells(count) {
  const g = gridDimension(count);
  const gap = g === 1 ? 0 : GRID_GAP;
  const cell = (GRID_SIZE - gap * (g - 1)) / g;
  const cells = [];
  for (let i = 0; i < g * g; i += 1) {
    const col = i % g;
    const row = Math.floor(i / g);
    cells.push({
      x: MARGIN + col * (cell + gap),
      y: GRID_TOP + row * (cell + gap),
      w: cell,
      h: cell,
    });
  }
  return cells;
}

/** A quiet vinyl-dark placeholder for grid cells beyond the session's count. */
function drawEmptyCell(ctx, r) {
  ctx.save();
  roundedRectPath(ctx, r.x, r.y, r.w, r.h, CORNER_RADIUS);
  ctx.fillStyle = '#1B1A18';
  ctx.fill();
  ctx.strokeStyle = 'rgba(220,215,203,0.08)';
  ctx.lineWidth = 2;
  const cx = r.x + r.w / 2;
  const cy = r.y + r.h / 2;
  [0.38, 0.28, 0.18].forEach((f) => {
    ctx.beginPath();
    ctx.arc(cx, cy, r.w * f, 0, Math.PI * 2);
    ctx.stroke();
  });
  ctx.restore();
}

/** Bottom-of-grid scrim + stats. The gradient guarantees contrast against
 * any cover art; the text shadow covers the near-transparent top edge. */
function drawStatsOverlay(ctx, count, runningMs) {
  const gridBottom = GRID_TOP + GRID_SIZE;
  const scrimH = 360;
  const scrimTop = gridBottom - scrimH;

  ctx.save();
  roundedRectPath(ctx, MARGIN, GRID_TOP, GRID_SIZE, GRID_SIZE, CORNER_RADIUS);
  ctx.clip();
  const gradient = ctx.createLinearGradient(0, scrimTop, 0, gridBottom);
  gradient.addColorStop(0, 'rgba(0, 0, 0, 0)');
  gradient.addColorStop(0.4, 'rgba(0, 0, 0, 0.55)');
  gradient.addColorStop(1, 'rgba(0, 0, 0, 0.92)');
  ctx.fillStyle = gradient;
  ctx.fillRect(MARGIN, scrimTop, GRID_SIZE, scrimH);

  ctx.shadowColor = 'rgba(0, 0, 0, 0.7)';
  ctx.shadowBlur = 14;
  ctx.fillStyle = '#DCD7CB';
  ctx.font = '400 60px "DM Serif Display"';
  ctx.textBaseline = 'alphabetic';
  const recordWord = count === 1 ? 'record' : 'records';
  ctx.fillText(`${count} ${recordWord}`, MARGIN + 40, gridBottom - 96);

  if (runningMs > 0) {
    ctx.fillStyle = '#E8B45A';
    ctx.font = '400 30px "IBM Plex Mono"';
    ctx.fillText(formatRunningTime(runningMs).toUpperCase(), MARGIN + 40, gridBottom - 44);
  }
  ctx.restore();
}

function drawFrame(ctx, deadwaxText) {
  ctx.fillStyle = '#121212';
  ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);

  ctx.fillStyle = '#DCD7CB';
  ctx.font = '400 56px "DM Serif Display"';
  ctx.textBaseline = 'alphabetic';
  ctx.fillText('A session, played in full.', MARGIN, MARGIN + 56);

  const hairlineY = CANVAS_H - MARGIN - 40;
  ctx.strokeStyle = 'rgba(220,215,203,0.14)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(MARGIN, hairlineY);
  ctx.lineTo(CANVAS_W - MARGIN, hairlineY);
  ctx.stroke();

  ctx.fillStyle = '#9D998F';
  ctx.font = '400 24px "IBM Plex Mono"';
  ctx.fillText(deadwaxText, MARGIN, hairlineY + 40);

  return hairlineY;
}

function renderTypographicFallback(side, deadwaxText) {
  const canvas = document.createElement('canvas');
  canvas.width = CANVAS_W;
  canvas.height = CANVAS_H;
  const ctx = canvas.getContext('2d');

  drawFrame(ctx, deadwaxText);

  ctx.fillStyle = '#DCD7CB';
  ctx.font = '400 22px Inter, sans-serif';
  let y = MARGIN + 56 + 84;
  side.entries.forEach((entry, i) => {
    ctx.fillText(`${i + 1}. ${entry.name} / ${entry.artist}`, MARGIN, y);
    y += 36;
  });

  return { dataUrl: canvas.toDataURL('image/png'), typographicFallback: true };
}

/**
 * @param {object} side journal side {id, startedAt, entries}
 * @param {number} sideOrdinal 1-based lifetime side number
 * @returns {Promise<{dataUrl: string, typographicFallback: boolean}>}
 */
export async function exportSideCard(side, sideOrdinal) {
  const deadwaxText = `SESSION ${sideOrdinal} · ${formatDeadwaxDate(side.startedAt)} · LONGPLAYUR`;
  const shownEntries = side.entries.slice(0, MAX_COVERS);

  let images;
  try {
    images = await Promise.all(shownEntries.map((e) => loadImage(e.image)));
  } catch {
    return renderTypographicFallback(side, deadwaxText);
  }

  const canvas = document.createElement('canvas');
  canvas.width = CANVAS_W;
  canvas.height = CANVAS_H;
  const ctx = canvas.getContext('2d');

  drawFrame(ctx, deadwaxText);

  const cells = computeGridCells(shownEntries.length);
  cells.forEach((r, i) => {
    const img = images[i];
    if (!img) {
      drawEmptyCell(ctx, r);
      return;
    }
    ctx.save();
    roundedRectPath(ctx, r.x, r.y, r.w, r.h, CORNER_RADIUS);
    ctx.clip();
    ctx.drawImage(img, r.x, r.y, r.w, r.h);
    ctx.restore();
  });

  drawStatsOverlay(ctx, side.entries.length, sideDurationMs(side));

  try {
    return { dataUrl: canvas.toDataURL('image/png'), typographicFallback: false };
  } catch {
    return renderTypographicFallback(side, deadwaxText);
  }
}

export function downloadCard(dataUrl, filename) {
  const a = document.createElement('a');
  a.href = dataUrl;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
}
