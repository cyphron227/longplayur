// The journal of past sessions: storage only. Versioned so the shape can
// migrate later. Every mutator does read-modify-write against localStorage
// (never holds a long-lived in-memory copy) so two open tabs do not
// corrupt each other; the last writer simply wins, per PRD edge case 9.
//
// "Record bag" is reserved for curated album collections (js/bags.js); this
// module is the journal of what was actually played, called "sessions" in
// all UI copy and, since INCREMENT-01 Phase 0, in storage and code too.

const LS_JOURNAL = 'lp_journal';
const SESSION_INACTIVITY_MS = 6 * 60 * 60 * 1000; // 6 hours, PRD F8.
const CURRENT_VERSION = 3;

function uuid() {
  if (window.crypto?.randomUUID) return window.crypto.randomUUID();
  return `id-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

/**
 * v1 -> v2: the journal's own field name changed from `sides` to
 * `sessions` (INCREMENT-01 Phase 0's storage rename).
 * v2 -> v3: liner notes removed entirely (INCREMENT-01 Phase 3a); every
 * entry's `note` field is dropped. Existing sessions and entries otherwise
 * survive both migrations intact.
 */
function migrate(journal) {
  if (!journal || typeof journal !== 'object') return { v: CURRENT_VERSION, sessions: [] };

  if (!journal.v || journal.v < 2) {
    journal.sessions = Array.isArray(journal.sessions) ? journal.sessions : (Array.isArray(journal.sides) ? journal.sides : []);
    delete journal.sides;
  }
  if (!Array.isArray(journal.sessions)) journal.sessions = [];

  if (!journal.v || journal.v < 3) {
    for (const session of journal.sessions) {
      for (const entry of session.entries || []) {
        delete entry.note;
      }
    }
  }

  journal.v = CURRENT_VERSION;
  return journal;
}

export function loadJournal() {
  try {
    const raw = localStorage.getItem(LS_JOURNAL);
    if (!raw) return { v: CURRENT_VERSION, sessions: [] };
    return migrate(JSON.parse(raw));
  } catch {
    return { v: CURRENT_VERSION, sessions: [] };
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

function lastEntryTime(session) {
  const entries = session.entries;
  if (!entries.length) return session.startedAt;
  return entries[entries.length - 1].startedAt;
}

function isSessionOpen(session, now) {
  return session.endedAt === null && now - lastEntryTime(session) < SESSION_INACTIVITY_MS;
}

/**
 * Appends a played album to the current open session, opening a new one if
 * the last session was explicitly closed or has gone stale (PRD's 6h rule).
 * @returns {{journal: object, session: object, sessionOrdinal: number}}
 */
export function recordNeedleDrop(entry) {
  const journal = loadJournal();
  const now = Date.now();
  let session = journal.sessions[journal.sessions.length - 1];

  if (!session || !isSessionOpen(session, now)) {
    session = { id: uuid(), startedAt: now, endedAt: null, entries: [] };
    journal.sessions.push(session);
  }

  session.entries.push({
    albumId: entry.id,
    name: entry.name,
    artist: entry.artist,
    image: entry.image,
    startedAt: now,
    bagId: entry.bagId ?? null,
  });

  saveJournal(journal);
  return { journal, session, sessionOrdinal: journal.sessions.length };
}

/** Explicit "New session": closes whatever session is currently open. */
export function startNewSession() {
  const journal = loadJournal();
  const last = journal.sessions[journal.sessions.length - 1];
  if (last && last.endedAt === null) last.endedAt = Date.now();
  saveJournal(journal);
  return journal;
}

export function deleteSession(sessionId) {
  const journal = loadJournal();
  journal.sessions = journal.sessions.filter((s) => s.id !== sessionId);
  return saveJournal(journal);
}

/** Newest first, for the past-sessions shelf. */
export function getSessionsNewestFirst() {
  return [...loadJournal().sessions].reverse();
}

export function getSession(sessionId) {
  return loadJournal().sessions.find((s) => s.id === sessionId) || null;
}

export function getLifetimeSessionCount() {
  return loadJournal().sessions.length;
}
