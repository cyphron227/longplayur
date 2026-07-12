// Shared Deezer client: keyless public API, no account or key needed.
// Deezer does not send CORS headers on most endpoints, so a plain fetch is
// tried first (works when it works) and a JSONP fallback is used only if
// that fails, per Docs/CLAUDE.md's security rules: a randomised callback
// name, the injected <script> removed after use, and a 10s timeout.
// Shared by nearby.js (related artists) and search.js (genre browsing).

const DEEZER_BASE = 'https://api.deezer.com';
const JSONP_TIMEOUT_MS = 10000;

function jsonpFetch(url) {
  return new Promise((resolve, reject) => {
    const callbackName = `lpJsonp${Date.now()}${Math.random().toString(36).slice(2)}`;
    const script = document.createElement('script');
    let settled = false;

    const cleanup = () => {
      delete window[callbackName];
      script.remove();
    };

    const timer = setTimeout(() => {
      if (settled) return;
      settled = true;
      cleanup();
      reject(new Error('jsonp_timeout'));
    }, JSONP_TIMEOUT_MS);

    window[callbackName] = (data) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      cleanup();
      resolve(data);
    };

    script.onerror = () => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      cleanup();
      reject(new Error('jsonp_script_error'));
    };

    const sep = url.includes('?') ? '&' : '?';
    script.src = `${url}${sep}output=jsonp&callback=${callbackName}`;
    document.head.appendChild(script);
  });
}

export async function deezerFetch(path) {
  const url = `${DEEZER_BASE}${path}`;
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`deezer_${res.status}`);
    return await res.json();
  } catch {
    return jsonpFetch(url);
  }
}
