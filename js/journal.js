// The record bag: sides, liner notes, storage. Versioned so the shape can
// migrate later. Every mutator does read-modify-write against localStorage
// (never holds a long-lived in-memory copy) so two open tabs do not
// corrupt each other; the last writer simply wins, per PRD edge case 9.

const LS_JOURNAL = 'lp_journal';
const SIDE_INACTIVITY_MS = 6 * 60 * 60 * 1000; // 6 hours, PRD F8.
const CURRENT_VERSION = 1;

function uuid() {
  if (window.crypto?.randomUUID) return window.crypto.randomUUID();
  return `id-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function migrate(journal) {
  // v1 is the only shape so far; this stub is where future migrations attach.
  if (!journal || typeof journal !== 'object') return { v: CURRENT_VERSION, sides: [] };
  if (!Array.isArray(journal.sides)) journal.sides = [];
  journal.v = CURRENT_VERSION;
  return journal;
}

export function loadJournal() {
  try {
    const raw = localStorage.getItem(LS_JOURNAL);
    if (!raw) return { v: CURRENT_VERSION, sides: [] };
    return migrate(JSON.parse(raw));
  } catch {
    return { v: CURRENT_VERSION, sides: [] };
  }
}

function saveJournal(journal) {
  try {
    localStorage.setItem(LS_JOURNAL, JSON.stringify(journal));
  } catch {
    // Storage full/unavailable: the session continues without persistence.
  }
  return journal;
}

function lastEntryTime(side) {
  const entries = side.entries;
  if (!entries.length) return side.startedAt;
  return entries[entries.length - 1].startedAt;
}

function isSideOpen(side, now) {
  return side.endedAt === null && now - lastEntryTime(side) < SIDE_INACTIVITY_MS;
}

/**
 * Appends a played album to the current open side, opening a new one if
 * the last side was explicitly closed or has gone stale (PRD's 6h rule).
 * @returns {{journal: object, side: object, sideOrdinal: number}}
 */
export function recordNeedleDrop(entry, { durationMs = null } = {}) {
  const journal = loadJournal();
  const now = Date.now();
  let side = journal.sides[journal.sides.length - 1];

  if (!side || !isSideOpen(side, now)) {
    side = { id: uuid(), startedAt: now, endedAt: null, entries: [] };
    journal.sides.push(side);
  }

  side.entries.push({
    albumId: entry.id,
    name: entry.name,
    artist: entry.artist,
    image: entry.image,
    startedAt: now,
    durationMs,
    note: '',
  });

  saveJournal(journal);
  return { journal, side, sideOrdinal: journal.sides.length };
}

/** Explicit "New side": closes whatever side is currently open. */
export function startNewSide() {
  const journal = loadJournal();
  const last = journal.sides[journal.sides.length - 1];
  if (last && last.endedAt === null) last.endedAt = Date.now();
  saveJournal(journal);
  return journal;
}

export function setLinerNote(sideId, albumId, note) {
  const journal = loadJournal();
  const side = journal.sides.find((s) => s.id === sideId);
  if (!side) return journal;
  const entry = [...side.entries].reverse().find((e) => e.albumId === albumId);
  if (!entry) return journal;
  entry.note = note;
  return saveJournal(journal);
}

export function deleteSide(sideId) {
  const journal = loadJournal();
  journal.sides = journal.sides.filter((s) => s.id !== sideId);
  return saveJournal(journal);
}

/** Newest first, for the record bag shelf. */
export function getSidesNewestFirst() {
  return [...loadJournal().sides].reverse();
}

export function getSide(sideId) {
  return loadJournal().sides.find((s) => s.id === sideId) || null;
}

export function getLifetimeSideCount() {
  return loadJournal().sides.length;
}

/** Sum of the known album durations in a side. Entries recorded before
 * durations were stored contribute 0, so this can undercount old sides. */
export function sideDurationMs(side) {
  return side.entries.reduce((sum, e) => sum + (e.durationMs || 0), 0);
}
