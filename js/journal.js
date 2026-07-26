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
const CURRENT_VERSION = 4;

// Keeper / spin again / pass (INCREMENT-02 Phase 2): a personal tag on one
// played album within one session. Mutually exclusive per entry -- setting
// one clears whichever was there before, and tapping the active one again
// clears it entirely (see setEntryTag()).
export const ENTRY_TAGS = Object.freeze({ KEEPER: 'keeper', SPIN_AGAIN: 'spin-again', PASS: 'pass' });

function uuid() {
  if (window.crypto?.randomUUID) return window.crypto.randomUUID();
  return `id-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

/**
 * v1 -> v2: the journal's own field name changed from `sides` to
 * `sessions` (INCREMENT-01 Phase 0's storage rename).
 * v2 -> v3: liner notes removed entirely (INCREMENT-01 Phase 3a); every
 * entry's `note` field is dropped.
 * v3 -> v4: adds the optional per-entry `tag` field (keeper / spin again /
 * pass, INCREMENT-02 Phase 2). No data migration is actually needed --
 * an entry with no `tag` property is already indistinguishable from one
 * explicitly set to untagged -- but the version bump still happens the same
 * way the last two did, so a future migration has a clean version to check
 * against rather than inferring "has this app ever written a tag field."
 * Existing sessions and entries otherwise survive every migration intact.
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
export function recordNeedleDrop(entry, { durationMs = null } = {}) {
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
    durationMs,
    bagId: entry.bagId ?? null,
    playlistId: entry.playlistId ?? null,
    tag: null,
  });

  saveJournal(journal);
  return { journal, session, sessionOrdinal: journal.sessions.length };
}

/**
 * Sets (or, tapping the already-active tag again, clears) one played
 * entry's personal tag. Entries have no id of their own; `entryStartedAt`
 * (the `startedAt` recorded at needle-drop time) is used to identify one
 * specific play within a session instead, on the assumption that two
 * needle drops in the same session can never share the same millisecond
 * timestamp -- true in practice since the ceremony's own choreography takes
 * seconds, not sub-millisecond time, between one drop and the next.
 * @param {string} sessionId
 * @param {number} entryStartedAt
 * @param {'keeper'|'spin-again'|'pass'} tag
 * @returns {object} the updated journal
 */
export function setEntryTag(sessionId, entryStartedAt, tag) {
  const journal = loadJournal();
  const session = journal.sessions.find((s) => s.id === sessionId);
  if (!session) return journal;
  const entry = session.entries.find((e) => e.startedAt === entryStartedAt);
  if (!entry) return journal;
  entry.tag = entry.tag === tag ? null : tag;
  saveJournal(journal);
  return journal;
}

/**
 * The most recent personal tag recorded against each album, across every
 * session (sessions and their entries are both stored oldest-first, so a
 * later tag naturally overwrites an earlier one as this walks the array in
 * order). Feeds albums.js's pool scoring (INCREMENT-02 Phase 2); an album
 * never tagged is simply absent from the returned map.
 * @returns {Map<string, 'keeper'|'spin-again'|'pass'>}
 */
export function latestTagsByAlbum() {
  const journal = loadJournal();
  const map = new Map();
  for (const session of journal.sessions) {
    for (const entry of session.entries) {
      if (entry.tag) map.set(entry.albumId, entry.tag);
    }
  }
  return map;
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

/** Sum of the known album durations in a session. Entries recorded before
 * durations were stored contribute 0, so this can undercount old sessions. */
export function sessionDurationMs(session) {
  return session.entries.reduce((sum, e) => sum + (e.durationMs || 0), 0);
}
