// The share card: a 1080x1350 canvas per DESIGN-SPEC §4. Album art needs
// crossOrigin="anonymous" (Spotify's CDN sends CORS headers); if the canvas
// is tainted anyway, or an image simply fails to load, we fall back to a
// typographic card rather than failing the export outright.

import { formatDeadwaxDate } from './ui.js';

const CANVAS_W = 1080;
const CANVAS_H = 1350;
const MARGIN = 64;
const COVER1_SIZE = 480;
const GRID_COLS = 4;
const GRID_CELL = 224;
const GRID_GAP = (CANVAS_W - MARGIN * 2 - GRID_COLS * GRID_CELL) / (GRID_COLS - 1);
const CORNER_RADIUS = 8;
const THREAD_COLOR = 'rgba(232, 180, 90, 0.6)';
const THREAD_WIDTH = 3;

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

function computeLayout(count) {
  const rects = [];
  if (count === 0) return rects;
  const cover1Y = MARGIN + 56 + 40;
  rects.push({ x: MARGIN, y: cover1Y, w: COVER1_SIZE, h: COVER1_SIZE });

  const gridStartY = cover1Y + COVER1_SIZE + 24;
  for (let i = 1; i < count; i += 1) {
    const idx = i - 1;
    const col = idx % GRID_COLS;
    const row = Math.floor(idx / GRID_COLS);
    rects.push({
      x: MARGIN + col * (GRID_CELL + GRID_GAP),
      y: gridStartY + row * (GRID_CELL + GRID_GAP),
      w: GRID_CELL,
      h: GRID_CELL,
    });
  }
  return rects;
}

function drawThread(ctx, rects) {
  if (rects.length < 2) return;
  ctx.save();
  ctx.strokeStyle = THREAD_COLOR;
  ctx.lineWidth = THREAD_WIDTH;
  ctx.beginPath();
  rects.forEach((r, i) => {
    const cx = r.x + r.w / 2;
    const cy = r.y + r.h / 2;
    if (i === 0) ctx.moveTo(cx, cy);
    else ctx.lineTo(cx, cy);
  });
  ctx.stroke();
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

  let images;
  try {
    images = await Promise.all(side.entries.map((e) => loadImage(e.image)));
  } catch {
    return renderTypographicFallback(side, deadwaxText);
  }

  const canvas = document.createElement('canvas');
  canvas.width = CANVAS_W;
  canvas.height = CANVAS_H;
  const ctx = canvas.getContext('2d');

  drawFrame(ctx, deadwaxText);

  const rects = computeLayout(side.entries.length);
  drawThread(ctx, rects); // drawn UNDER the covers.
  images.forEach((img, i) => {
    const r = rects[i];
    ctx.save();
    roundedRectPath(ctx, r.x, r.y, r.w, r.h, CORNER_RADIUS);
    ctx.clip();
    ctx.drawImage(img, r.x, r.y, r.w, r.h);
    ctx.restore();
  });

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
