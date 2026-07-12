// OAuth 2.0 Authorization Code with PKCE, fully client-side. No client secret, ever.

const AUTH_URL = 'https://accounts.spotify.com/authorize';
const TOKEN_URL = 'https://accounts.spotify.com/api/token';
// playlist-read-private/-collaborative added for the Crates screen's
// "your playlists" source. New scopes only take effect on a fresh
// authorisation, not a token refresh -- anyone already connected before
// this change needs to sign out and reconnect once to grant it.
const SCOPES = 'user-top-read user-library-read streaming user-read-playback-state user-modify-playback-state playlist-read-private playlist-read-collaborative';

const LS_CLIENT_ID = 'lp_client_id';
const LS_TOKENS = 'lp_tokens';
const SS_VERIFIER = 'lp_pkce_verifier';
const SS_STATE = 'lp_pkce_state';

const REFRESH_MARGIN_MS = 60_000;

let refreshTimer = null;

export function getRedirectUri() {
  return window.location.origin + window.location.pathname;
}

export function getClientId() {
  return localStorage.getItem(LS_CLIENT_ID) || '';
}

export function setClientId(clientId) {
  localStorage.setItem(LS_CLIENT_ID, clientId);
}

export function isValidClientId(value) {
  return /^[a-f0-9]{16,40}$/i.test(value.trim());
}

function randomString(length) {
  const bytes = new Uint8Array(length);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('').slice(0, length);
}

function base64UrlEncode(buffer) {
  const bytes = new Uint8Array(buffer);
  let binary = '';
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

async function sha256(plain) {
  const data = new TextEncoder().encode(plain);
  return crypto.subtle.digest('SHA-256', data);
}

/** Reads and immediately strips OAuth callback params from the URL bar. */
export function consumeCallbackParams() {
  const params = new URLSearchParams(window.location.search);
  const result = {
    code: params.get('code'),
    state: params.get('state'),
    error: params.get('error'),
  };
  if (result.code || result.error) {
    const url = new URL(window.location.href);
    url.search = '';
    window.history.replaceState({}, document.title, url.toString());
  }
  return result;
}

export async function startAuthorization() {
  const clientId = getClientId();
  const verifier = randomString(64);
  const state = randomString(16);
  const challenge = base64UrlEncode(await sha256(verifier));

  sessionStorage.setItem(SS_VERIFIER, verifier);
  sessionStorage.setItem(SS_STATE, state);

  const params = new URLSearchParams({
    client_id: clientId,
    response_type: 'code',
    redirect_uri: getRedirectUri(),
    code_challenge_method: 'S256',
    code_challenge: challenge,
    state,
    scope: SCOPES,
  });

  window.location.assign(`${AUTH_URL}?${params.toString()}`);
}

class AuthError extends Error {
  constructor(kind, message) {
    super(message);
    this.name = 'AuthError';
    this.kind = kind; // 'state_mismatch' | 'redirect_mismatch' | 'not_allowlisted' | 'denied' | 'network'
  }
}

/** Exchanges the callback `code` for tokens. Throws AuthError on any failure. */
export async function completeAuthorization({ code, state, error }) {
  const expectedState = sessionStorage.getItem(SS_STATE);
  const verifier = sessionStorage.getItem(SS_VERIFIER);
  sessionStorage.removeItem(SS_STATE);

  if (error) {
    if (error === 'access_denied') throw new AuthError('denied', 'You declined access in Spotify.');
    if (error === 'invalid_client' || error === 'redirect_uri_mismatch') {
      throw new AuthError('redirect_mismatch', `Spotify rejected the redirect. The redirect URI in your app settings must match this exactly: ${getRedirectUri()}`);
    }
    throw new AuthError('unknown', `Spotify returned an error: ${error}`);
  }

  if (!state || state !== expectedState) {
    throw new AuthError('state_mismatch', 'The authorisation response could not be verified. Please try connecting again.');
  }
  if (!verifier) {
    throw new AuthError('state_mismatch', 'The authorisation session expired. Please try connecting again.');
  }

  const body = new URLSearchParams({
    grant_type: 'authorization_code',
    code,
    redirect_uri: getRedirectUri(),
    client_id: getClientId(),
    code_verifier: verifier,
  });

  sessionStorage.removeItem(SS_VERIFIER);

  let response;
  try {
    response = await fetch(TOKEN_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body,
    });
  } catch {
    throw new AuthError('network', 'Could not reach Spotify. Check your connection and try again.');
  }

  if (!response.ok) {
    if (response.status === 400) {
      throw new AuthError('redirect_mismatch', `Spotify rejected the redirect. The redirect URI in your app settings must match this exactly: ${getRedirectUri()}`);
    }
    throw new AuthError('unknown', `Spotify token exchange failed (${response.status}).`);
  }

  const json = await response.json();
  storeTokens(json);
  return json;
}

function storeTokens({ access_token, refresh_token, expires_in }) {
  const existing = getTokens();
  const tokens = {
    access_token,
    refresh_token: refresh_token || existing?.refresh_token,
    expires_at: Date.now() + expires_in * 1000,
  };
  localStorage.setItem(LS_TOKENS, JSON.stringify(tokens));
  scheduleRefresh(tokens);
  return tokens;
}

export function getTokens() {
  try {
    const raw = localStorage.getItem(LS_TOKENS);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function hasSession() {
  const tokens = getTokens();
  return Boolean(tokens && tokens.refresh_token);
}

async function refreshTokens() {
  const tokens = getTokens();
  if (!tokens?.refresh_token) throw new AuthError('unknown', 'No session to refresh.');

  const body = new URLSearchParams({
    grant_type: 'refresh_token',
    refresh_token: tokens.refresh_token,
    client_id: getClientId(),
  });

  const response = await fetch(TOKEN_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body,
  });

  if (!response.ok) {
    throw new AuthError('refresh_failed', 'Session refresh failed.');
  }

  const json = await response.json();
  return storeTokens(json);
}

function scheduleRefresh(tokens) {
  if (refreshTimer) clearTimeout(refreshTimer);
  const delay = Math.max(0, tokens.expires_at - Date.now() - REFRESH_MARGIN_MS);
  refreshTimer = setTimeout(() => {
    refreshTokens().catch(() => {
      // A single silent retry is attempted by getValidAccessToken(); if that
      // also fails the caller is responsible for returning to setup.
    });
  }, delay);
}

let refreshInFlight = null;

/** Returns a currently-valid access token, refreshing once if needed. */
export async function getValidAccessToken() {
  const tokens = getTokens();
  if (!tokens) throw new AuthError('no_session', 'Not signed in.');

  if (Date.now() < tokens.expires_at - REFRESH_MARGIN_MS) {
    return tokens.access_token;
  }

  if (!refreshInFlight) {
    refreshInFlight = refreshTokens().finally(() => {
      refreshInFlight = null;
    });
  }
  const refreshed = await refreshInFlight;
  return refreshed.access_token;
}

export function signOut() {
  if (refreshTimer) clearTimeout(refreshTimer);
  localStorage.removeItem(LS_TOKENS);
  sessionStorage.removeItem(SS_VERIFIER);
  sessionStorage.removeItem(SS_STATE);
}

export { AuthError };
