function Sd(a) {
  return a && a.__esModule && Object.prototype.hasOwnProperty.call(a, "default") ? a.default : a;
}
var as = { exports: {} }, J = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Za;
function kd() {
  if (Za) return J;
  Za = 1;
  var a = Symbol.for("react.element"), o = Symbol.for("react.portal"), s = Symbol.for("react.fragment"), c = Symbol.for("react.strict_mode"), m = Symbol.for("react.profiler"), k = Symbol.for("react.provider"), T = Symbol.for("react.context"), L = Symbol.for("react.forward_ref"), R = Symbol.for("react.suspense"), z = Symbol.for("react.memo"), P = Symbol.for("react.lazy"), B = Symbol.iterator;
  function Y(h) {
    return h === null || typeof h != "object" ? null : (h = B && h[B] || h["@@iterator"], typeof h == "function" ? h : null);
  }
  var Te = { isMounted: function() {
    return !1;
  }, enqueueForceUpdate: function() {
  }, enqueueReplaceState: function() {
  }, enqueueSetState: function() {
  } }, Re = Object.assign, ne = {};
  function Q(h, w, H) {
    this.props = h, this.context = w, this.refs = ne, this.updater = H || Te;
  }
  Q.prototype.isReactComponent = {}, Q.prototype.setState = function(h, w) {
    if (typeof h != "object" && typeof h != "function" && h != null) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
    this.updater.enqueueSetState(this, h, w, "setState");
  }, Q.prototype.forceUpdate = function(h) {
    this.updater.enqueueForceUpdate(this, h, "forceUpdate");
  };
  function Oe() {
  }
  Oe.prototype = Q.prototype;
  function $e(h, w, H) {
    this.props = h, this.context = w, this.refs = ne, this.updater = H || Te;
  }
  var et = $e.prototype = new Oe();
  et.constructor = $e, Re(et, Q.prototype), et.isPureReactComponent = !0;
  var Ae = Array.isArray, Ke = Object.prototype.hasOwnProperty, we = { current: null }, Qe = { key: !0, ref: !0, __self: !0, __source: !0 };
  function Le(h, w, H) {
    var X, K = {}, te = null, ue = null;
    if (w != null) for (X in w.ref !== void 0 && (ue = w.ref), w.key !== void 0 && (te = "" + w.key), w) Ke.call(w, X) && !Qe.hasOwnProperty(X) && (K[X] = w[X]);
    var ee = arguments.length - 2;
    if (ee === 1) K.children = H;
    else if (1 < ee) {
      for (var le = Array(ee), Ge = 0; Ge < ee; Ge++) le[Ge] = arguments[Ge + 2];
      K.children = le;
    }
    if (h && h.defaultProps) for (X in ee = h.defaultProps, ee) K[X] === void 0 && (K[X] = ee[X]);
    return { $$typeof: a, type: h, key: te, ref: ue, props: K, _owner: we.current };
  }
  function pt(h, w) {
    return { $$typeof: a, type: h.type, key: w, ref: h.ref, props: h.props, _owner: h._owner };
  }
  function je(h) {
    return typeof h == "object" && h !== null && h.$$typeof === a;
  }
  function Ct(h) {
    var w = { "=": "=0", ":": "=2" };
    return "$" + h.replace(/[=:]/g, function(H) {
      return w[H];
    });
  }
  var ct = /\/+/g;
  function it(h, w) {
    return typeof h == "object" && h !== null && h.key != null ? Ct("" + h.key) : w.toString(36);
  }
  function Ve(h, w, H, X, K) {
    var te = typeof h;
    (te === "undefined" || te === "boolean") && (h = null);
    var ue = !1;
    if (h === null) ue = !0;
    else switch (te) {
      case "string":
      case "number":
        ue = !0;
        break;
      case "object":
        switch (h.$$typeof) {
          case a:
          case o:
            ue = !0;
        }
    }
    if (ue) return ue = h, K = K(ue), h = X === "" ? "." + it(ue, 0) : X, Ae(K) ? (H = "", h != null && (H = h.replace(ct, "$&/") + "/"), Ve(K, w, H, "", function(Ge) {
      return Ge;
    })) : K != null && (je(K) && (K = pt(K, H + (!K.key || ue && ue.key === K.key ? "" : ("" + K.key).replace(ct, "$&/") + "/") + h)), w.push(K)), 1;
    if (ue = 0, X = X === "" ? "." : X + ":", Ae(h)) for (var ee = 0; ee < h.length; ee++) {
      te = h[ee];
      var le = X + it(te, ee);
      ue += Ve(te, w, H, le, K);
    }
    else if (le = Y(h), typeof le == "function") for (h = le.call(h), ee = 0; !(te = h.next()).done; ) te = te.value, le = X + it(te, ee++), ue += Ve(te, w, H, le, K);
    else if (te === "object") throw w = String(h), Error("Objects are not valid as a React child (found: " + (w === "[object Object]" ? "object with keys {" + Object.keys(h).join(", ") + "}" : w) + "). If you meant to render a collection of children, use an array instead.");
    return ue;
  }
  function ht(h, w, H) {
    if (h == null) return h;
    var X = [], K = 0;
    return Ve(h, X, "", "", function(te) {
      return w.call(H, te, K++);
    }), X;
  }
  function ae(h) {
    if (h._status === -1) {
      var w = h._result;
      w = w(), w.then(function(H) {
        (h._status === 0 || h._status === -1) && (h._status = 1, h._result = H);
      }, function(H) {
        (h._status === 0 || h._status === -1) && (h._status = 2, h._result = H);
      }), h._status === -1 && (h._status = 0, h._result = w);
    }
    if (h._status === 1) return h._result.default;
    throw h._result;
  }
  var me = { current: null }, C = { transition: null }, j = { ReactCurrentDispatcher: me, ReactCurrentBatchConfig: C, ReactCurrentOwner: we };
  function N() {
    throw Error("act(...) is not supported in production builds of React.");
  }
  return J.Children = { map: ht, forEach: function(h, w, H) {
    ht(h, function() {
      w.apply(this, arguments);
    }, H);
  }, count: function(h) {
    var w = 0;
    return ht(h, function() {
      w++;
    }), w;
  }, toArray: function(h) {
    return ht(h, function(w) {
      return w;
    }) || [];
  }, only: function(h) {
    if (!je(h)) throw Error("React.Children.only expected to receive a single React element child.");
    return h;
  } }, J.Component = Q, J.Fragment = s, J.Profiler = m, J.PureComponent = $e, J.StrictMode = c, J.Suspense = R, J.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = j, J.act = N, J.cloneElement = function(h, w, H) {
    if (h == null) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + h + ".");
    var X = Re({}, h.props), K = h.key, te = h.ref, ue = h._owner;
    if (w != null) {
      if (w.ref !== void 0 && (te = w.ref, ue = we.current), w.key !== void 0 && (K = "" + w.key), h.type && h.type.defaultProps) var ee = h.type.defaultProps;
      for (le in w) Ke.call(w, le) && !Qe.hasOwnProperty(le) && (X[le] = w[le] === void 0 && ee !== void 0 ? ee[le] : w[le]);
    }
    var le = arguments.length - 2;
    if (le === 1) X.children = H;
    else if (1 < le) {
      ee = Array(le);
      for (var Ge = 0; Ge < le; Ge++) ee[Ge] = arguments[Ge + 2];
      X.children = ee;
    }
    return { $$typeof: a, type: h.type, key: K, ref: te, props: X, _owner: ue };
  }, J.createContext = function(h) {
    return h = { $$typeof: T, _currentValue: h, _currentValue2: h, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null }, h.Provider = { $$typeof: k, _context: h }, h.Consumer = h;
  }, J.createElement = Le, J.createFactory = function(h) {
    var w = Le.bind(null, h);
    return w.type = h, w;
  }, J.createRef = function() {
    return { current: null };
  }, J.forwardRef = function(h) {
    return { $$typeof: L, render: h };
  }, J.isValidElement = je, J.lazy = function(h) {
    return { $$typeof: P, _payload: { _status: -1, _result: h }, _init: ae };
  }, J.memo = function(h, w) {
    return { $$typeof: z, type: h, compare: w === void 0 ? null : w };
  }, J.startTransition = function(h) {
    var w = C.transition;
    C.transition = {};
    try {
      h();
    } finally {
      C.transition = w;
    }
  }, J.unstable_act = N, J.useCallback = function(h, w) {
    return me.current.useCallback(h, w);
  }, J.useContext = function(h) {
    return me.current.useContext(h);
  }, J.useDebugValue = function() {
  }, J.useDeferredValue = function(h) {
    return me.current.useDeferredValue(h);
  }, J.useEffect = function(h, w) {
    return me.current.useEffect(h, w);
  }, J.useId = function() {
    return me.current.useId();
  }, J.useImperativeHandle = function(h, w, H) {
    return me.current.useImperativeHandle(h, w, H);
  }, J.useInsertionEffect = function(h, w) {
    return me.current.useInsertionEffect(h, w);
  }, J.useLayoutEffect = function(h, w) {
    return me.current.useLayoutEffect(h, w);
  }, J.useMemo = function(h, w) {
    return me.current.useMemo(h, w);
  }, J.useReducer = function(h, w, H) {
    return me.current.useReducer(h, w, H);
  }, J.useRef = function(h) {
    return me.current.useRef(h);
  }, J.useState = function(h) {
    return me.current.useState(h);
  }, J.useSyncExternalStore = function(h, w, H) {
    return me.current.useSyncExternalStore(h, w, H);
  }, J.useTransition = function() {
    return me.current.useTransition();
  }, J.version = "18.3.1", J;
}
var Ja;
function gs() {
  return Ja || (Ja = 1, as.exports = kd()), as.exports;
}
var Z = gs();
const cs = /* @__PURE__ */ Sd(Z);
var Sl = {}, fs = { exports: {} }, _t = {}, ds = { exports: {} }, ps = {};
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ba;
function xd() {
  return ba || (ba = 1, (function(a) {
    function o(C, j) {
      var N = C.length;
      C.push(j);
      e: for (; 0 < N; ) {
        var h = N - 1 >>> 1, w = C[h];
        if (0 < m(w, j)) C[h] = j, C[N] = w, N = h;
        else break e;
      }
    }
    function s(C) {
      return C.length === 0 ? null : C[0];
    }
    function c(C) {
      if (C.length === 0) return null;
      var j = C[0], N = C.pop();
      if (N !== j) {
        C[0] = N;
        e: for (var h = 0, w = C.length, H = w >>> 1; h < H; ) {
          var X = 2 * (h + 1) - 1, K = C[X], te = X + 1, ue = C[te];
          if (0 > m(K, N)) te < w && 0 > m(ue, K) ? (C[h] = ue, C[te] = N, h = te) : (C[h] = K, C[X] = N, h = X);
          else if (te < w && 0 > m(ue, N)) C[h] = ue, C[te] = N, h = te;
          else break e;
        }
      }
      return j;
    }
    function m(C, j) {
      var N = C.sortIndex - j.sortIndex;
      return N !== 0 ? N : C.id - j.id;
    }
    if (typeof performance == "object" && typeof performance.now == "function") {
      var k = performance;
      a.unstable_now = function() {
        return k.now();
      };
    } else {
      var T = Date, L = T.now();
      a.unstable_now = function() {
        return T.now() - L;
      };
    }
    var R = [], z = [], P = 1, B = null, Y = 3, Te = !1, Re = !1, ne = !1, Q = typeof setTimeout == "function" ? setTimeout : null, Oe = typeof clearTimeout == "function" ? clearTimeout : null, $e = typeof setImmediate < "u" ? setImmediate : null;
    typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
    function et(C) {
      for (var j = s(z); j !== null; ) {
        if (j.callback === null) c(z);
        else if (j.startTime <= C) c(z), j.sortIndex = j.expirationTime, o(R, j);
        else break;
        j = s(z);
      }
    }
    function Ae(C) {
      if (ne = !1, et(C), !Re) if (s(R) !== null) Re = !0, ae(Ke);
      else {
        var j = s(z);
        j !== null && me(Ae, j.startTime - C);
      }
    }
    function Ke(C, j) {
      Re = !1, ne && (ne = !1, Oe(Le), Le = -1), Te = !0;
      var N = Y;
      try {
        for (et(j), B = s(R); B !== null && (!(B.expirationTime > j) || C && !Ct()); ) {
          var h = B.callback;
          if (typeof h == "function") {
            B.callback = null, Y = B.priorityLevel;
            var w = h(B.expirationTime <= j);
            j = a.unstable_now(), typeof w == "function" ? B.callback = w : B === s(R) && c(R), et(j);
          } else c(R);
          B = s(R);
        }
        if (B !== null) var H = !0;
        else {
          var X = s(z);
          X !== null && me(Ae, X.startTime - j), H = !1;
        }
        return H;
      } finally {
        B = null, Y = N, Te = !1;
      }
    }
    var we = !1, Qe = null, Le = -1, pt = 5, je = -1;
    function Ct() {
      return !(a.unstable_now() - je < pt);
    }
    function ct() {
      if (Qe !== null) {
        var C = a.unstable_now();
        je = C;
        var j = !0;
        try {
          j = Qe(!0, C);
        } finally {
          j ? it() : (we = !1, Qe = null);
        }
      } else we = !1;
    }
    var it;
    if (typeof $e == "function") it = function() {
      $e(ct);
    };
    else if (typeof MessageChannel < "u") {
      var Ve = new MessageChannel(), ht = Ve.port2;
      Ve.port1.onmessage = ct, it = function() {
        ht.postMessage(null);
      };
    } else it = function() {
      Q(ct, 0);
    };
    function ae(C) {
      Qe = C, we || (we = !0, it());
    }
    function me(C, j) {
      Le = Q(function() {
        C(a.unstable_now());
      }, j);
    }
    a.unstable_IdlePriority = 5, a.unstable_ImmediatePriority = 1, a.unstable_LowPriority = 4, a.unstable_NormalPriority = 3, a.unstable_Profiling = null, a.unstable_UserBlockingPriority = 2, a.unstable_cancelCallback = function(C) {
      C.callback = null;
    }, a.unstable_continueExecution = function() {
      Re || Te || (Re = !0, ae(Ke));
    }, a.unstable_forceFrameRate = function(C) {
      0 > C || 125 < C ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : pt = 0 < C ? Math.floor(1e3 / C) : 5;
    }, a.unstable_getCurrentPriorityLevel = function() {
      return Y;
    }, a.unstable_getFirstCallbackNode = function() {
      return s(R);
    }, a.unstable_next = function(C) {
      switch (Y) {
        case 1:
        case 2:
        case 3:
          var j = 3;
          break;
        default:
          j = Y;
      }
      var N = Y;
      Y = j;
      try {
        return C();
      } finally {
        Y = N;
      }
    }, a.unstable_pauseExecution = function() {
    }, a.unstable_requestPaint = function() {
    }, a.unstable_runWithPriority = function(C, j) {
      switch (C) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          C = 3;
      }
      var N = Y;
      Y = C;
      try {
        return j();
      } finally {
        Y = N;
      }
    }, a.unstable_scheduleCallback = function(C, j, N) {
      var h = a.unstable_now();
      switch (typeof N == "object" && N !== null ? (N = N.delay, N = typeof N == "number" && 0 < N ? h + N : h) : N = h, C) {
        case 1:
          var w = -1;
          break;
        case 2:
          w = 250;
          break;
        case 5:
          w = 1073741823;
          break;
        case 4:
          w = 1e4;
          break;
        default:
          w = 5e3;
      }
      return w = N + w, C = { id: P++, callback: j, priorityLevel: C, startTime: N, expirationTime: w, sortIndex: -1 }, N > h ? (C.sortIndex = N, o(z, C), s(R) === null && C === s(z) && (ne ? (Oe(Le), Le = -1) : ne = !0, me(Ae, N - h))) : (C.sortIndex = w, o(R, C), Re || Te || (Re = !0, ae(Ke))), C;
    }, a.unstable_shouldYield = Ct, a.unstable_wrapCallback = function(C) {
      var j = Y;
      return function() {
        var N = Y;
        Y = j;
        try {
          return C.apply(this, arguments);
        } finally {
          Y = N;
        }
      };
    };
  })(ps)), ps;
}
var ec;
function Ed() {
  return ec || (ec = 1, ds.exports = xd()), ds.exports;
}
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var tc;
function Cd() {
  if (tc) return _t;
  tc = 1;
  var a = gs(), o = Ed();
  function s(e) {
    for (var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, n = 1; n < arguments.length; n++) t += "&args[]=" + encodeURIComponent(arguments[n]);
    return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  var c = /* @__PURE__ */ new Set(), m = {};
  function k(e, t) {
    T(e, t), T(e + "Capture", t);
  }
  function T(e, t) {
    for (m[e] = t, e = 0; e < t.length; e++) c.add(t[e]);
  }
  var L = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), R = Object.prototype.hasOwnProperty, z = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, P = {}, B = {};
  function Y(e) {
    return R.call(B, e) ? !0 : R.call(P, e) ? !1 : z.test(e) ? B[e] = !0 : (P[e] = !0, !1);
  }
  function Te(e, t, n, r) {
    if (n !== null && n.type === 0) return !1;
    switch (typeof t) {
      case "function":
      case "symbol":
        return !0;
      case "boolean":
        return r ? !1 : n !== null ? !n.acceptsBooleans : (e = e.toLowerCase().slice(0, 5), e !== "data-" && e !== "aria-");
      default:
        return !1;
    }
  }
  function Re(e, t, n, r) {
    if (t === null || typeof t > "u" || Te(e, t, n, r)) return !0;
    if (r) return !1;
    if (n !== null) switch (n.type) {
      case 3:
        return !t;
      case 4:
        return t === !1;
      case 5:
        return isNaN(t);
      case 6:
        return isNaN(t) || 1 > t;
    }
    return !1;
  }
  function ne(e, t, n, r, i, l, u) {
    this.acceptsBooleans = t === 2 || t === 3 || t === 4, this.attributeName = r, this.attributeNamespace = i, this.mustUseProperty = n, this.propertyName = e, this.type = t, this.sanitizeURL = l, this.removeEmptyString = u;
  }
  var Q = {};
  "children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e) {
    Q[e] = new ne(e, 0, !1, e, null, !1, !1);
  }), [["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(e) {
    var t = e[0];
    Q[t] = new ne(t, 1, !1, e[1], null, !1, !1);
  }), ["contentEditable", "draggable", "spellCheck", "value"].forEach(function(e) {
    Q[e] = new ne(e, 2, !1, e.toLowerCase(), null, !1, !1);
  }), ["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(e) {
    Q[e] = new ne(e, 2, !1, e, null, !1, !1);
  }), "allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e) {
    Q[e] = new ne(e, 3, !1, e.toLowerCase(), null, !1, !1);
  }), ["checked", "multiple", "muted", "selected"].forEach(function(e) {
    Q[e] = new ne(e, 3, !0, e, null, !1, !1);
  }), ["capture", "download"].forEach(function(e) {
    Q[e] = new ne(e, 4, !1, e, null, !1, !1);
  }), ["cols", "rows", "size", "span"].forEach(function(e) {
    Q[e] = new ne(e, 6, !1, e, null, !1, !1);
  }), ["rowSpan", "start"].forEach(function(e) {
    Q[e] = new ne(e, 5, !1, e.toLowerCase(), null, !1, !1);
  });
  var Oe = /[\-:]([a-z])/g;
  function $e(e) {
    return e[1].toUpperCase();
  }
  "accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e) {
    var t = e.replace(
      Oe,
      $e
    );
    Q[t] = new ne(t, 1, !1, e, null, !1, !1);
  }), "xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e) {
    var t = e.replace(Oe, $e);
    Q[t] = new ne(t, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1);
  }), ["xml:base", "xml:lang", "xml:space"].forEach(function(e) {
    var t = e.replace(Oe, $e);
    Q[t] = new ne(t, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1, !1);
  }), ["tabIndex", "crossOrigin"].forEach(function(e) {
    Q[e] = new ne(e, 1, !1, e.toLowerCase(), null, !1, !1);
  }), Q.xlinkHref = new ne("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0, !1), ["src", "href", "action", "formAction"].forEach(function(e) {
    Q[e] = new ne(e, 1, !1, e.toLowerCase(), null, !0, !0);
  });
  function et(e, t, n, r) {
    var i = Q.hasOwnProperty(t) ? Q[t] : null;
    (i !== null ? i.type !== 0 : r || !(2 < t.length) || t[0] !== "o" && t[0] !== "O" || t[1] !== "n" && t[1] !== "N") && (Re(t, n, i, r) && (n = null), r || i === null ? Y(t) && (n === null ? e.removeAttribute(t) : e.setAttribute(t, "" + n)) : i.mustUseProperty ? e[i.propertyName] = n === null ? i.type === 3 ? !1 : "" : n : (t = i.attributeName, r = i.attributeNamespace, n === null ? e.removeAttribute(t) : (i = i.type, n = i === 3 || i === 4 && n === !0 ? "" : "" + n, r ? e.setAttributeNS(r, t, n) : e.setAttribute(t, n))));
  }
  var Ae = a.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, Ke = Symbol.for("react.element"), we = Symbol.for("react.portal"), Qe = Symbol.for("react.fragment"), Le = Symbol.for("react.strict_mode"), pt = Symbol.for("react.profiler"), je = Symbol.for("react.provider"), Ct = Symbol.for("react.context"), ct = Symbol.for("react.forward_ref"), it = Symbol.for("react.suspense"), Ve = Symbol.for("react.suspense_list"), ht = Symbol.for("react.memo"), ae = Symbol.for("react.lazy"), me = Symbol.for("react.offscreen"), C = Symbol.iterator;
  function j(e) {
    return e === null || typeof e != "object" ? null : (e = C && e[C] || e["@@iterator"], typeof e == "function" ? e : null);
  }
  var N = Object.assign, h;
  function w(e) {
    if (h === void 0) try {
      throw Error();
    } catch (n) {
      var t = n.stack.trim().match(/\n( *(at )?)/);
      h = t && t[1] || "";
    }
    return `
` + h + e;
  }
  var H = !1;
  function X(e, t) {
    if (!e || H) return "";
    H = !0;
    var n = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      if (t) if (t = function() {
        throw Error();
      }, Object.defineProperty(t.prototype, "props", { set: function() {
        throw Error();
      } }), typeof Reflect == "object" && Reflect.construct) {
        try {
          Reflect.construct(t, []);
        } catch (g) {
          var r = g;
        }
        Reflect.construct(e, [], t);
      } else {
        try {
          t.call();
        } catch (g) {
          r = g;
        }
        e.call(t.prototype);
      }
      else {
        try {
          throw Error();
        } catch (g) {
          r = g;
        }
        e();
      }
    } catch (g) {
      if (g && r && typeof g.stack == "string") {
        for (var i = g.stack.split(`
`), l = r.stack.split(`
`), u = i.length - 1, f = l.length - 1; 1 <= u && 0 <= f && i[u] !== l[f]; ) f--;
        for (; 1 <= u && 0 <= f; u--, f--) if (i[u] !== l[f]) {
          if (u !== 1 || f !== 1)
            do
              if (u--, f--, 0 > f || i[u] !== l[f]) {
                var d = `
` + i[u].replace(" at new ", " at ");
                return e.displayName && d.includes("<anonymous>") && (d = d.replace("<anonymous>", e.displayName)), d;
              }
            while (1 <= u && 0 <= f);
          break;
        }
      }
    } finally {
      H = !1, Error.prepareStackTrace = n;
    }
    return (e = e ? e.displayName || e.name : "") ? w(e) : "";
  }
  function K(e) {
    switch (e.tag) {
      case 5:
        return w(e.type);
      case 16:
        return w("Lazy");
      case 13:
        return w("Suspense");
      case 19:
        return w("SuspenseList");
      case 0:
      case 2:
      case 15:
        return e = X(e.type, !1), e;
      case 11:
        return e = X(e.type.render, !1), e;
      case 1:
        return e = X(e.type, !0), e;
      default:
        return "";
    }
  }
  function te(e) {
    if (e == null) return null;
    if (typeof e == "function") return e.displayName || e.name || null;
    if (typeof e == "string") return e;
    switch (e) {
      case Qe:
        return "Fragment";
      case we:
        return "Portal";
      case pt:
        return "Profiler";
      case Le:
        return "StrictMode";
      case it:
        return "Suspense";
      case Ve:
        return "SuspenseList";
    }
    if (typeof e == "object") switch (e.$$typeof) {
      case Ct:
        return (e.displayName || "Context") + ".Consumer";
      case je:
        return (e._context.displayName || "Context") + ".Provider";
      case ct:
        var t = e.render;
        return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
      case ht:
        return t = e.displayName || null, t !== null ? t : te(e.type) || "Memo";
      case ae:
        t = e._payload, e = e._init;
        try {
          return te(e(t));
        } catch {
        }
    }
    return null;
  }
  function ue(e) {
    var t = e.type;
    switch (e.tag) {
      case 24:
        return "Cache";
      case 9:
        return (t.displayName || "Context") + ".Consumer";
      case 10:
        return (t._context.displayName || "Context") + ".Provider";
      case 18:
        return "DehydratedFragment";
      case 11:
        return e = t.render, e = e.displayName || e.name || "", t.displayName || (e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef");
      case 7:
        return "Fragment";
      case 5:
        return t;
      case 4:
        return "Portal";
      case 3:
        return "Root";
      case 6:
        return "Text";
      case 16:
        return te(t);
      case 8:
        return t === Le ? "StrictMode" : "Mode";
      case 22:
        return "Offscreen";
      case 12:
        return "Profiler";
      case 21:
        return "Scope";
      case 13:
        return "Suspense";
      case 19:
        return "SuspenseList";
      case 25:
        return "TracingMarker";
      case 1:
      case 0:
      case 17:
      case 2:
      case 14:
      case 15:
        if (typeof t == "function") return t.displayName || t.name || null;
        if (typeof t == "string") return t;
    }
    return null;
  }
  function ee(e) {
    switch (typeof e) {
      case "boolean":
      case "number":
      case "string":
      case "undefined":
        return e;
      case "object":
        return e;
      default:
        return "";
    }
  }
  function le(e) {
    var t = e.type;
    return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
  }
  function Ge(e) {
    var t = le(e) ? "checked" : "value", n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t), r = "" + e[t];
    if (!e.hasOwnProperty(t) && typeof n < "u" && typeof n.get == "function" && typeof n.set == "function") {
      var i = n.get, l = n.set;
      return Object.defineProperty(e, t, { configurable: !0, get: function() {
        return i.call(this);
      }, set: function(u) {
        r = "" + u, l.call(this, u);
      } }), Object.defineProperty(e, t, { enumerable: n.enumerable }), { getValue: function() {
        return r;
      }, setValue: function(u) {
        r = "" + u;
      }, stopTracking: function() {
        e._valueTracker = null, delete e[t];
      } };
    }
  }
  function Ln(e) {
    e._valueTracker || (e._valueTracker = Ge(e));
  }
  function Kt(e) {
    if (!e) return !1;
    var t = e._valueTracker;
    if (!t) return !0;
    var n = t.getValue(), r = "";
    return e && (r = le(e) ? e.checked ? "true" : "false" : e.value), e = r, e !== n ? (t.setValue(e), !0) : !1;
  }
  function ln(e) {
    if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u") return null;
    try {
      return e.activeElement || e.body;
    } catch {
      return e.body;
    }
  }
  function on(e, t) {
    var n = t.checked;
    return N({}, t, { defaultChecked: void 0, defaultValue: void 0, value: void 0, checked: n ?? e._wrapperState.initialChecked });
  }
  function Pr(e, t) {
    var n = t.defaultValue == null ? "" : t.defaultValue, r = t.checked != null ? t.checked : t.defaultChecked;
    n = ee(t.value != null ? t.value : n), e._wrapperState = { initialChecked: r, initialValue: n, controlled: t.type === "checkbox" || t.type === "radio" ? t.checked != null : t.value != null };
  }
  function Tr(e, t) {
    t = t.checked, t != null && et(e, "checked", t, !1);
  }
  function Rr(e, t) {
    Tr(e, t);
    var n = ee(t.value), r = t.type;
    if (n != null) r === "number" ? (n === 0 && e.value === "" || e.value != n) && (e.value = "" + n) : e.value !== "" + n && (e.value = "" + n);
    else if (r === "submit" || r === "reset") {
      e.removeAttribute("value");
      return;
    }
    t.hasOwnProperty("value") ? qn(e, t.type, n) : t.hasOwnProperty("defaultValue") && qn(e, t.type, ee(t.defaultValue)), t.checked == null && t.defaultChecked != null && (e.defaultChecked = !!t.defaultChecked);
  }
  function Qt(e, t, n) {
    if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
      var r = t.type;
      if (!(r !== "submit" && r !== "reset" || t.value !== void 0 && t.value !== null)) return;
      t = "" + e._wrapperState.initialValue, n || t === e.value || (e.value = t), e.defaultValue = t;
    }
    n = e.name, n !== "" && (e.name = ""), e.defaultChecked = !!e._wrapperState.initialChecked, n !== "" && (e.name = n);
  }
  function qn(e, t, n) {
    (t !== "number" || ln(e.ownerDocument) !== e) && (n == null ? e.defaultValue = "" + e._wrapperState.initialValue : e.defaultValue !== "" + n && (e.defaultValue = "" + n));
  }
  var Gt = Array.isArray;
  function sn(e, t, n, r) {
    if (e = e.options, t) {
      t = {};
      for (var i = 0; i < n.length; i++) t["$" + n[i]] = !0;
      for (n = 0; n < e.length; n++) i = t.hasOwnProperty("$" + e[n].value), e[n].selected !== i && (e[n].selected = i), i && r && (e[n].defaultSelected = !0);
    } else {
      for (n = "" + ee(n), t = null, i = 0; i < e.length; i++) {
        if (e[i].value === n) {
          e[i].selected = !0, r && (e[i].defaultSelected = !0);
          return;
        }
        t !== null || e[i].disabled || (t = e[i]);
      }
      t !== null && (t.selected = !0);
    }
  }
  function un(e, t) {
    if (t.dangerouslySetInnerHTML != null) throw Error(s(91));
    return N({}, t, { value: void 0, defaultValue: void 0, children: "" + e._wrapperState.initialValue });
  }
  function F(e, t) {
    var n = t.value;
    if (n == null) {
      if (n = t.children, t = t.defaultValue, n != null) {
        if (t != null) throw Error(s(92));
        if (Gt(n)) {
          if (1 < n.length) throw Error(s(93));
          n = n[0];
        }
        t = n;
      }
      t == null && (t = ""), n = t;
    }
    e._wrapperState = { initialValue: ee(n) };
  }
  function b(e, t) {
    var n = ee(t.value), r = ee(t.defaultValue);
    n != null && (n = "" + n, n !== e.value && (e.value = n), t.defaultValue == null && e.defaultValue !== n && (e.defaultValue = n)), r != null && (e.defaultValue = "" + r);
  }
  function G(e) {
    var t = e.textContent;
    t === e._wrapperState.initialValue && t !== "" && t !== null && (e.value = t);
  }
  function q(e) {
    switch (e) {
      case "svg":
        return "http://www.w3.org/2000/svg";
      case "math":
        return "http://www.w3.org/1998/Math/MathML";
      default:
        return "http://www.w3.org/1999/xhtml";
    }
  }
  function re(e, t) {
    return e == null || e === "http://www.w3.org/1999/xhtml" ? q(t) : e === "http://www.w3.org/2000/svg" && t === "foreignObject" ? "http://www.w3.org/1999/xhtml" : e;
  }
  var de, ve = (function(e) {
    return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction ? function(t, n, r, i) {
      MSApp.execUnsafeLocalFunction(function() {
        return e(t, n, r, i);
      });
    } : e;
  })(function(e, t) {
    if (e.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in e) e.innerHTML = t;
    else {
      for (de = de || document.createElement("div"), de.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>", t = de.firstChild; e.firstChild; ) e.removeChild(e.firstChild);
      for (; t.firstChild; ) e.appendChild(t.firstChild);
    }
  });
  function _e(e, t) {
    if (t) {
      var n = e.firstChild;
      if (n && n === e.lastChild && n.nodeType === 3) {
        n.nodeValue = t;
        return;
      }
    }
    e.textContent = t;
  }
  var Ee = {
    animationIterationCount: !0,
    aspectRatio: !0,
    borderImageOutset: !0,
    borderImageSlice: !0,
    borderImageWidth: !0,
    boxFlex: !0,
    boxFlexGroup: !0,
    boxOrdinalGroup: !0,
    columnCount: !0,
    columns: !0,
    flex: !0,
    flexGrow: !0,
    flexPositive: !0,
    flexShrink: !0,
    flexNegative: !0,
    flexOrder: !0,
    gridArea: !0,
    gridRow: !0,
    gridRowEnd: !0,
    gridRowSpan: !0,
    gridRowStart: !0,
    gridColumn: !0,
    gridColumnEnd: !0,
    gridColumnSpan: !0,
    gridColumnStart: !0,
    fontWeight: !0,
    lineClamp: !0,
    lineHeight: !0,
    opacity: !0,
    order: !0,
    orphans: !0,
    tabSize: !0,
    widows: !0,
    zIndex: !0,
    zoom: !0,
    fillOpacity: !0,
    floodOpacity: !0,
    stopOpacity: !0,
    strokeDasharray: !0,
    strokeDashoffset: !0,
    strokeMiterlimit: !0,
    strokeOpacity: !0,
    strokeWidth: !0
  }, ye = ["Webkit", "ms", "Moz", "O"];
  Object.keys(Ee).forEach(function(e) {
    ye.forEach(function(t) {
      t = t + e.charAt(0).toUpperCase() + e.substring(1), Ee[t] = Ee[e];
    });
  });
  function Ce(e, t, n) {
    return t == null || typeof t == "boolean" || t === "" ? "" : n || typeof t != "number" || t === 0 || Ee.hasOwnProperty(e) && Ee[e] ? ("" + t).trim() : t + "px";
  }
  function ce(e, t) {
    e = e.style;
    for (var n in t) if (t.hasOwnProperty(n)) {
      var r = n.indexOf("--") === 0, i = Ce(n, t[n], r);
      n === "float" && (n = "cssFloat"), r ? e.setProperty(n, i) : e[n] = i;
    }
  }
  var oe = N({ menuitem: !0 }, { area: !0, base: !0, br: !0, col: !0, embed: !0, hr: !0, img: !0, input: !0, keygen: !0, link: !0, meta: !0, param: !0, source: !0, track: !0, wbr: !0 });
  function Me(e, t) {
    if (t) {
      if (oe[e] && (t.children != null || t.dangerouslySetInnerHTML != null)) throw Error(s(137, e));
      if (t.dangerouslySetInnerHTML != null) {
        if (t.children != null) throw Error(s(60));
        if (typeof t.dangerouslySetInnerHTML != "object" || !("__html" in t.dangerouslySetInnerHTML)) throw Error(s(61));
      }
      if (t.style != null && typeof t.style != "object") throw Error(s(62));
    }
  }
  function pe(e, t) {
    if (e.indexOf("-") === -1) return typeof t.is == "string";
    switch (e) {
      case "annotation-xml":
      case "color-profile":
      case "font-face":
      case "font-face-src":
      case "font-face-uri":
      case "font-face-format":
      case "font-face-name":
      case "missing-glyph":
        return !1;
      default:
        return !0;
    }
  }
  var W = null;
  function qe(e) {
    return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
  }
  var tt = null, he = null, We = null;
  function an(e) {
    if (e = Qr(e)) {
      if (typeof tt != "function") throw Error(s(280));
      var t = e.stateNode;
      t && (t = Ai(t), tt(e.stateNode, e.type, t));
    }
  }
  function Mt(e) {
    he ? We ? We.push(e) : We = [e] : he = e;
  }
  function Zn() {
    if (he) {
      var e = he, t = We;
      if (We = he = null, an(e), t) for (e = 0; e < t.length; e++) an(t[e]);
    }
  }
  function di(e, t) {
    return e(t);
  }
  function pi() {
  }
  var hi = !1;
  function Nr(e, t, n) {
    if (hi) return e(t, n);
    hi = !0;
    try {
      return di(e, t, n);
    } finally {
      hi = !1, (he !== null || We !== null) && (pi(), Zn());
    }
  }
  function cn(e, t) {
    var n = e.stateNode;
    if (n === null) return null;
    var r = Ai(n);
    if (r === null) return null;
    n = r[t];
    e: switch (t) {
      case "onClick":
      case "onClickCapture":
      case "onDoubleClick":
      case "onDoubleClickCapture":
      case "onMouseDown":
      case "onMouseDownCapture":
      case "onMouseMove":
      case "onMouseMoveCapture":
      case "onMouseUp":
      case "onMouseUpCapture":
      case "onMouseEnter":
        (r = !r.disabled) || (e = e.type, r = !(e === "button" || e === "input" || e === "select" || e === "textarea")), e = !r;
        break e;
      default:
        e = !1;
    }
    if (e) return null;
    if (n && typeof n != "function") throw Error(s(231, t, typeof n));
    return n;
  }
  var Jn = !1;
  if (L) try {
    var fn = {};
    Object.defineProperty(fn, "passive", { get: function() {
      Jn = !0;
    } }), window.addEventListener("test", fn, fn), window.removeEventListener("test", fn, fn);
  } catch {
    Jn = !1;
  }
  function Mn(e, t, n, r, i, l, u, f, d) {
    var g = Array.prototype.slice.call(arguments, 3);
    try {
      t.apply(n, g);
    } catch (S) {
      this.onError(S);
    }
  }
  var In = !1, bn = null, On = !1, er = null, mi = { onError: function(e) {
    In = !0, bn = e;
  } };
  function Pl(e, t, n, r, i, l, u, f, d) {
    In = !1, bn = null, Mn.apply(mi, arguments);
  }
  function Tl(e, t, n, r, i, l, u, f, d) {
    if (Pl.apply(this, arguments), In) {
      if (In) {
        var g = bn;
        In = !1, bn = null;
      } else throw Error(s(198));
      On || (On = !0, er = g);
    }
  }
  function Vt(e) {
    var t = e, n = e;
    if (e.alternate) for (; t.return; ) t = t.return;
    else {
      e = t;
      do
        t = e, (t.flags & 4098) !== 0 && (n = t.return), e = t.return;
      while (e);
    }
    return t.tag === 3 ? n : null;
  }
  function _s(e) {
    if (e.tag === 13) {
      var t = e.memoizedState;
      if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
    }
    return null;
  }
  function Ss(e) {
    if (Vt(e) !== e) throw Error(s(188));
  }
  function Dc(e) {
    var t = e.alternate;
    if (!t) {
      if (t = Vt(e), t === null) throw Error(s(188));
      return t !== e ? null : e;
    }
    for (var n = e, r = t; ; ) {
      var i = n.return;
      if (i === null) break;
      var l = i.alternate;
      if (l === null) {
        if (r = i.return, r !== null) {
          n = r;
          continue;
        }
        break;
      }
      if (i.child === l.child) {
        for (l = i.child; l; ) {
          if (l === n) return Ss(i), e;
          if (l === r) return Ss(i), t;
          l = l.sibling;
        }
        throw Error(s(188));
      }
      if (n.return !== r.return) n = i, r = l;
      else {
        for (var u = !1, f = i.child; f; ) {
          if (f === n) {
            u = !0, n = i, r = l;
            break;
          }
          if (f === r) {
            u = !0, r = i, n = l;
            break;
          }
          f = f.sibling;
        }
        if (!u) {
          for (f = l.child; f; ) {
            if (f === n) {
              u = !0, n = l, r = i;
              break;
            }
            if (f === r) {
              u = !0, r = l, n = i;
              break;
            }
            f = f.sibling;
          }
          if (!u) throw Error(s(189));
        }
      }
      if (n.alternate !== r) throw Error(s(190));
    }
    if (n.tag !== 3) throw Error(s(188));
    return n.stateNode.current === n ? e : t;
  }
  function ks(e) {
    return e = Dc(e), e !== null ? xs(e) : null;
  }
  function xs(e) {
    if (e.tag === 5 || e.tag === 6) return e;
    for (e = e.child; e !== null; ) {
      var t = xs(e);
      if (t !== null) return t;
      e = e.sibling;
    }
    return null;
  }
  var Es = o.unstable_scheduleCallback, Cs = o.unstable_cancelCallback, zc = o.unstable_shouldYield, Lc = o.unstable_requestPaint, Fe = o.unstable_now, Mc = o.unstable_getCurrentPriorityLevel, Rl = o.unstable_ImmediatePriority, Ps = o.unstable_UserBlockingPriority, vi = o.unstable_NormalPriority, Ic = o.unstable_LowPriority, Ts = o.unstable_IdlePriority, yi = null, Ht = null;
  function Oc(e) {
    if (Ht && typeof Ht.onCommitFiberRoot == "function") try {
      Ht.onCommitFiberRoot(yi, e, void 0, (e.current.flags & 128) === 128);
    } catch {
    }
  }
  var It = Math.clz32 ? Math.clz32 : Fc, Ac = Math.log, jc = Math.LN2;
  function Fc(e) {
    return e >>>= 0, e === 0 ? 32 : 31 - (Ac(e) / jc | 0) | 0;
  }
  var gi = 64, wi = 4194304;
  function Dr(e) {
    switch (e & -e) {
      case 1:
        return 1;
      case 2:
        return 2;
      case 4:
        return 4;
      case 8:
        return 8;
      case 16:
        return 16;
      case 32:
        return 32;
      case 64:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return e & 4194240;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
      case 67108864:
        return e & 130023424;
      case 134217728:
        return 134217728;
      case 268435456:
        return 268435456;
      case 536870912:
        return 536870912;
      case 1073741824:
        return 1073741824;
      default:
        return e;
    }
  }
  function _i(e, t) {
    var n = e.pendingLanes;
    if (n === 0) return 0;
    var r = 0, i = e.suspendedLanes, l = e.pingedLanes, u = n & 268435455;
    if (u !== 0) {
      var f = u & ~i;
      f !== 0 ? r = Dr(f) : (l &= u, l !== 0 && (r = Dr(l)));
    } else u = n & ~i, u !== 0 ? r = Dr(u) : l !== 0 && (r = Dr(l));
    if (r === 0) return 0;
    if (t !== 0 && t !== r && (t & i) === 0 && (i = r & -r, l = t & -t, i >= l || i === 16 && (l & 4194240) !== 0)) return t;
    if ((r & 4) !== 0 && (r |= n & 16), t = e.entangledLanes, t !== 0) for (e = e.entanglements, t &= r; 0 < t; ) n = 31 - It(t), i = 1 << n, r |= e[n], t &= ~i;
    return r;
  }
  function Uc(e, t) {
    switch (e) {
      case 1:
      case 2:
      case 4:
        return t + 250;
      case 8:
      case 16:
      case 32:
      case 64:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return t + 5e3;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
      case 67108864:
        return -1;
      case 134217728:
      case 268435456:
      case 536870912:
      case 1073741824:
        return -1;
      default:
        return -1;
    }
  }
  function $c(e, t) {
    for (var n = e.suspendedLanes, r = e.pingedLanes, i = e.expirationTimes, l = e.pendingLanes; 0 < l; ) {
      var u = 31 - It(l), f = 1 << u, d = i[u];
      d === -1 ? ((f & n) === 0 || (f & r) !== 0) && (i[u] = Uc(f, t)) : d <= t && (e.expiredLanes |= f), l &= ~f;
    }
  }
  function Nl(e) {
    return e = e.pendingLanes & -1073741825, e !== 0 ? e : e & 1073741824 ? 1073741824 : 0;
  }
  function Rs() {
    var e = gi;
    return gi <<= 1, (gi & 4194240) === 0 && (gi = 64), e;
  }
  function Dl(e) {
    for (var t = [], n = 0; 31 > n; n++) t.push(e);
    return t;
  }
  function zr(e, t, n) {
    e.pendingLanes |= t, t !== 536870912 && (e.suspendedLanes = 0, e.pingedLanes = 0), e = e.eventTimes, t = 31 - It(t), e[t] = n;
  }
  function Vc(e, t) {
    var n = e.pendingLanes & ~t;
    e.pendingLanes = t, e.suspendedLanes = 0, e.pingedLanes = 0, e.expiredLanes &= t, e.mutableReadLanes &= t, e.entangledLanes &= t, t = e.entanglements;
    var r = e.eventTimes;
    for (e = e.expirationTimes; 0 < n; ) {
      var i = 31 - It(n), l = 1 << i;
      t[i] = 0, r[i] = -1, e[i] = -1, n &= ~l;
    }
  }
  function zl(e, t) {
    var n = e.entangledLanes |= t;
    for (e = e.entanglements; n; ) {
      var r = 31 - It(n), i = 1 << r;
      i & t | e[r] & t && (e[r] |= t), n &= ~i;
    }
  }
  var fe = 0;
  function Ns(e) {
    return e &= -e, 1 < e ? 4 < e ? (e & 268435455) !== 0 ? 16 : 536870912 : 4 : 1;
  }
  var Ds, Ll, zs, Ls, Ms, Ml = !1, Si = [], dn = null, pn = null, hn = null, Lr = /* @__PURE__ */ new Map(), Mr = /* @__PURE__ */ new Map(), mn = [], Hc = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
  function Is(e, t) {
    switch (e) {
      case "focusin":
      case "focusout":
        dn = null;
        break;
      case "dragenter":
      case "dragleave":
        pn = null;
        break;
      case "mouseover":
      case "mouseout":
        hn = null;
        break;
      case "pointerover":
      case "pointerout":
        Lr.delete(t.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        Mr.delete(t.pointerId);
    }
  }
  function Ir(e, t, n, r, i, l) {
    return e === null || e.nativeEvent !== l ? (e = { blockedOn: t, domEventName: n, eventSystemFlags: r, nativeEvent: l, targetContainers: [i] }, t !== null && (t = Qr(t), t !== null && Ll(t)), e) : (e.eventSystemFlags |= r, t = e.targetContainers, i !== null && t.indexOf(i) === -1 && t.push(i), e);
  }
  function Bc(e, t, n, r, i) {
    switch (t) {
      case "focusin":
        return dn = Ir(dn, e, t, n, r, i), !0;
      case "dragenter":
        return pn = Ir(pn, e, t, n, r, i), !0;
      case "mouseover":
        return hn = Ir(hn, e, t, n, r, i), !0;
      case "pointerover":
        var l = i.pointerId;
        return Lr.set(l, Ir(Lr.get(l) || null, e, t, n, r, i)), !0;
      case "gotpointercapture":
        return l = i.pointerId, Mr.set(l, Ir(Mr.get(l) || null, e, t, n, r, i)), !0;
    }
    return !1;
  }
  function Os(e) {
    var t = An(e.target);
    if (t !== null) {
      var n = Vt(t);
      if (n !== null) {
        if (t = n.tag, t === 13) {
          if (t = _s(n), t !== null) {
            e.blockedOn = t, Ms(e.priority, function() {
              zs(n);
            });
            return;
          }
        } else if (t === 3 && n.stateNode.current.memoizedState.isDehydrated) {
          e.blockedOn = n.tag === 3 ? n.stateNode.containerInfo : null;
          return;
        }
      }
    }
    e.blockedOn = null;
  }
  function ki(e) {
    if (e.blockedOn !== null) return !1;
    for (var t = e.targetContainers; 0 < t.length; ) {
      var n = Ol(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
      if (n === null) {
        n = e.nativeEvent;
        var r = new n.constructor(n.type, n);
        W = r, n.target.dispatchEvent(r), W = null;
      } else return t = Qr(n), t !== null && Ll(t), e.blockedOn = n, !1;
      t.shift();
    }
    return !0;
  }
  function As(e, t, n) {
    ki(e) && n.delete(t);
  }
  function Wc() {
    Ml = !1, dn !== null && ki(dn) && (dn = null), pn !== null && ki(pn) && (pn = null), hn !== null && ki(hn) && (hn = null), Lr.forEach(As), Mr.forEach(As);
  }
  function Or(e, t) {
    e.blockedOn === t && (e.blockedOn = null, Ml || (Ml = !0, o.unstable_scheduleCallback(o.unstable_NormalPriority, Wc)));
  }
  function Ar(e) {
    function t(i) {
      return Or(i, e);
    }
    if (0 < Si.length) {
      Or(Si[0], e);
      for (var n = 1; n < Si.length; n++) {
        var r = Si[n];
        r.blockedOn === e && (r.blockedOn = null);
      }
    }
    for (dn !== null && Or(dn, e), pn !== null && Or(pn, e), hn !== null && Or(hn, e), Lr.forEach(t), Mr.forEach(t), n = 0; n < mn.length; n++) r = mn[n], r.blockedOn === e && (r.blockedOn = null);
    for (; 0 < mn.length && (n = mn[0], n.blockedOn === null); ) Os(n), n.blockedOn === null && mn.shift();
  }
  var tr = Ae.ReactCurrentBatchConfig, xi = !0;
  function Yc(e, t, n, r) {
    var i = fe, l = tr.transition;
    tr.transition = null;
    try {
      fe = 1, Il(e, t, n, r);
    } finally {
      fe = i, tr.transition = l;
    }
  }
  function Xc(e, t, n, r) {
    var i = fe, l = tr.transition;
    tr.transition = null;
    try {
      fe = 4, Il(e, t, n, r);
    } finally {
      fe = i, tr.transition = l;
    }
  }
  function Il(e, t, n, r) {
    if (xi) {
      var i = Ol(e, t, n, r);
      if (i === null) Jl(e, t, r, Ei, n), Is(e, r);
      else if (Bc(i, e, t, n, r)) r.stopPropagation();
      else if (Is(e, r), t & 4 && -1 < Hc.indexOf(e)) {
        for (; i !== null; ) {
          var l = Qr(i);
          if (l !== null && Ds(l), l = Ol(e, t, n, r), l === null && Jl(e, t, r, Ei, n), l === i) break;
          i = l;
        }
        i !== null && r.stopPropagation();
      } else Jl(e, t, r, null, n);
    }
  }
  var Ei = null;
  function Ol(e, t, n, r) {
    if (Ei = null, e = qe(r), e = An(e), e !== null) if (t = Vt(e), t === null) e = null;
    else if (n = t.tag, n === 13) {
      if (e = _s(t), e !== null) return e;
      e = null;
    } else if (n === 3) {
      if (t.stateNode.current.memoizedState.isDehydrated) return t.tag === 3 ? t.stateNode.containerInfo : null;
      e = null;
    } else t !== e && (e = null);
    return Ei = e, null;
  }
  function js(e) {
    switch (e) {
      case "cancel":
      case "click":
      case "close":
      case "contextmenu":
      case "copy":
      case "cut":
      case "auxclick":
      case "dblclick":
      case "dragend":
      case "dragstart":
      case "drop":
      case "focusin":
      case "focusout":
      case "input":
      case "invalid":
      case "keydown":
      case "keypress":
      case "keyup":
      case "mousedown":
      case "mouseup":
      case "paste":
      case "pause":
      case "play":
      case "pointercancel":
      case "pointerdown":
      case "pointerup":
      case "ratechange":
      case "reset":
      case "resize":
      case "seeked":
      case "submit":
      case "touchcancel":
      case "touchend":
      case "touchstart":
      case "volumechange":
      case "change":
      case "selectionchange":
      case "textInput":
      case "compositionstart":
      case "compositionend":
      case "compositionupdate":
      case "beforeblur":
      case "afterblur":
      case "beforeinput":
      case "blur":
      case "fullscreenchange":
      case "focus":
      case "hashchange":
      case "popstate":
      case "select":
      case "selectstart":
        return 1;
      case "drag":
      case "dragenter":
      case "dragexit":
      case "dragleave":
      case "dragover":
      case "mousemove":
      case "mouseout":
      case "mouseover":
      case "pointermove":
      case "pointerout":
      case "pointerover":
      case "scroll":
      case "toggle":
      case "touchmove":
      case "wheel":
      case "mouseenter":
      case "mouseleave":
      case "pointerenter":
      case "pointerleave":
        return 4;
      case "message":
        switch (Mc()) {
          case Rl:
            return 1;
          case Ps:
            return 4;
          case vi:
          case Ic:
            return 16;
          case Ts:
            return 536870912;
          default:
            return 16;
        }
      default:
        return 16;
    }
  }
  var vn = null, Al = null, Ci = null;
  function Fs() {
    if (Ci) return Ci;
    var e, t = Al, n = t.length, r, i = "value" in vn ? vn.value : vn.textContent, l = i.length;
    for (e = 0; e < n && t[e] === i[e]; e++) ;
    var u = n - e;
    for (r = 1; r <= u && t[n - r] === i[l - r]; r++) ;
    return Ci = i.slice(e, 1 < r ? 1 - r : void 0);
  }
  function Pi(e) {
    var t = e.keyCode;
    return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
  }
  function Ti() {
    return !0;
  }
  function Us() {
    return !1;
  }
  function St(e) {
    function t(n, r, i, l, u) {
      this._reactName = n, this._targetInst = i, this.type = r, this.nativeEvent = l, this.target = u, this.currentTarget = null;
      for (var f in e) e.hasOwnProperty(f) && (n = e[f], this[f] = n ? n(l) : l[f]);
      return this.isDefaultPrevented = (l.defaultPrevented != null ? l.defaultPrevented : l.returnValue === !1) ? Ti : Us, this.isPropagationStopped = Us, this;
    }
    return N(t.prototype, { preventDefault: function() {
      this.defaultPrevented = !0;
      var n = this.nativeEvent;
      n && (n.preventDefault ? n.preventDefault() : typeof n.returnValue != "unknown" && (n.returnValue = !1), this.isDefaultPrevented = Ti);
    }, stopPropagation: function() {
      var n = this.nativeEvent;
      n && (n.stopPropagation ? n.stopPropagation() : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0), this.isPropagationStopped = Ti);
    }, persist: function() {
    }, isPersistent: Ti }), t;
  }
  var nr = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(e) {
    return e.timeStamp || Date.now();
  }, defaultPrevented: 0, isTrusted: 0 }, jl = St(nr), jr = N({}, nr, { view: 0, detail: 0 }), Kc = St(jr), Fl, Ul, Fr, Ri = N({}, jr, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: Vl, button: 0, buttons: 0, relatedTarget: function(e) {
    return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
  }, movementX: function(e) {
    return "movementX" in e ? e.movementX : (e !== Fr && (Fr && e.type === "mousemove" ? (Fl = e.screenX - Fr.screenX, Ul = e.screenY - Fr.screenY) : Ul = Fl = 0, Fr = e), Fl);
  }, movementY: function(e) {
    return "movementY" in e ? e.movementY : Ul;
  } }), $s = St(Ri), Qc = N({}, Ri, { dataTransfer: 0 }), Gc = St(Qc), qc = N({}, jr, { relatedTarget: 0 }), $l = St(qc), Zc = N({}, nr, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }), Jc = St(Zc), bc = N({}, nr, { clipboardData: function(e) {
    return "clipboardData" in e ? e.clipboardData : window.clipboardData;
  } }), ef = St(bc), tf = N({}, nr, { data: 0 }), Vs = St(tf), nf = {
    Esc: "Escape",
    Spacebar: " ",
    Left: "ArrowLeft",
    Up: "ArrowUp",
    Right: "ArrowRight",
    Down: "ArrowDown",
    Del: "Delete",
    Win: "OS",
    Menu: "ContextMenu",
    Apps: "ContextMenu",
    Scroll: "ScrollLock",
    MozPrintableKey: "Unidentified"
  }, rf = {
    8: "Backspace",
    9: "Tab",
    12: "Clear",
    13: "Enter",
    16: "Shift",
    17: "Control",
    18: "Alt",
    19: "Pause",
    20: "CapsLock",
    27: "Escape",
    32: " ",
    33: "PageUp",
    34: "PageDown",
    35: "End",
    36: "Home",
    37: "ArrowLeft",
    38: "ArrowUp",
    39: "ArrowRight",
    40: "ArrowDown",
    45: "Insert",
    46: "Delete",
    112: "F1",
    113: "F2",
    114: "F3",
    115: "F4",
    116: "F5",
    117: "F6",
    118: "F7",
    119: "F8",
    120: "F9",
    121: "F10",
    122: "F11",
    123: "F12",
    144: "NumLock",
    145: "ScrollLock",
    224: "Meta"
  }, lf = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
  function of(e) {
    var t = this.nativeEvent;
    return t.getModifierState ? t.getModifierState(e) : (e = lf[e]) ? !!t[e] : !1;
  }
  function Vl() {
    return of;
  }
  var sf = N({}, jr, { key: function(e) {
    if (e.key) {
      var t = nf[e.key] || e.key;
      if (t !== "Unidentified") return t;
    }
    return e.type === "keypress" ? (e = Pi(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? rf[e.keyCode] || "Unidentified" : "";
  }, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: Vl, charCode: function(e) {
    return e.type === "keypress" ? Pi(e) : 0;
  }, keyCode: function(e) {
    return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
  }, which: function(e) {
    return e.type === "keypress" ? Pi(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
  } }), uf = St(sf), af = N({}, Ri, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), Hs = St(af), cf = N({}, jr, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: Vl }), ff = St(cf), df = N({}, nr, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }), pf = St(df), hf = N({}, Ri, {
    deltaX: function(e) {
      return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
    },
    deltaY: function(e) {
      return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), mf = St(hf), vf = [9, 13, 27, 32], Hl = L && "CompositionEvent" in window, Ur = null;
  L && "documentMode" in document && (Ur = document.documentMode);
  var yf = L && "TextEvent" in window && !Ur, Bs = L && (!Hl || Ur && 8 < Ur && 11 >= Ur), Ws = " ", Ys = !1;
  function Xs(e, t) {
    switch (e) {
      case "keyup":
        return vf.indexOf(t.keyCode) !== -1;
      case "keydown":
        return t.keyCode !== 229;
      case "keypress":
      case "mousedown":
      case "focusout":
        return !0;
      default:
        return !1;
    }
  }
  function Ks(e) {
    return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
  }
  var rr = !1;
  function gf(e, t) {
    switch (e) {
      case "compositionend":
        return Ks(t);
      case "keypress":
        return t.which !== 32 ? null : (Ys = !0, Ws);
      case "textInput":
        return e = t.data, e === Ws && Ys ? null : e;
      default:
        return null;
    }
  }
  function wf(e, t) {
    if (rr) return e === "compositionend" || !Hl && Xs(e, t) ? (e = Fs(), Ci = Al = vn = null, rr = !1, e) : null;
    switch (e) {
      case "paste":
        return null;
      case "keypress":
        if (!(t.ctrlKey || t.altKey || t.metaKey) || t.ctrlKey && t.altKey) {
          if (t.char && 1 < t.char.length) return t.char;
          if (t.which) return String.fromCharCode(t.which);
        }
        return null;
      case "compositionend":
        return Bs && t.locale !== "ko" ? null : t.data;
      default:
        return null;
    }
  }
  var _f = { color: !0, date: !0, datetime: !0, "datetime-local": !0, email: !0, month: !0, number: !0, password: !0, range: !0, search: !0, tel: !0, text: !0, time: !0, url: !0, week: !0 };
  function Qs(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t === "input" ? !!_f[e.type] : t === "textarea";
  }
  function Gs(e, t, n, r) {
    Mt(r), t = Mi(t, "onChange"), 0 < t.length && (n = new jl("onChange", "change", null, n, r), e.push({ event: n, listeners: t }));
  }
  var $r = null, Vr = null;
  function Sf(e) {
    pu(e, 0);
  }
  function Ni(e) {
    var t = ur(e);
    if (Kt(t)) return e;
  }
  function kf(e, t) {
    if (e === "change") return t;
  }
  var qs = !1;
  if (L) {
    var Bl;
    if (L) {
      var Wl = "oninput" in document;
      if (!Wl) {
        var Zs = document.createElement("div");
        Zs.setAttribute("oninput", "return;"), Wl = typeof Zs.oninput == "function";
      }
      Bl = Wl;
    } else Bl = !1;
    qs = Bl && (!document.documentMode || 9 < document.documentMode);
  }
  function Js() {
    $r && ($r.detachEvent("onpropertychange", bs), Vr = $r = null);
  }
  function bs(e) {
    if (e.propertyName === "value" && Ni(Vr)) {
      var t = [];
      Gs(t, Vr, e, qe(e)), Nr(Sf, t);
    }
  }
  function xf(e, t, n) {
    e === "focusin" ? (Js(), $r = t, Vr = n, $r.attachEvent("onpropertychange", bs)) : e === "focusout" && Js();
  }
  function Ef(e) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown") return Ni(Vr);
  }
  function Cf(e, t) {
    if (e === "click") return Ni(t);
  }
  function Pf(e, t) {
    if (e === "input" || e === "change") return Ni(t);
  }
  function Tf(e, t) {
    return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
  }
  var Ot = typeof Object.is == "function" ? Object.is : Tf;
  function Hr(e, t) {
    if (Ot(e, t)) return !0;
    if (typeof e != "object" || e === null || typeof t != "object" || t === null) return !1;
    var n = Object.keys(e), r = Object.keys(t);
    if (n.length !== r.length) return !1;
    for (r = 0; r < n.length; r++) {
      var i = n[r];
      if (!R.call(t, i) || !Ot(e[i], t[i])) return !1;
    }
    return !0;
  }
  function eu(e) {
    for (; e && e.firstChild; ) e = e.firstChild;
    return e;
  }
  function tu(e, t) {
    var n = eu(e);
    e = 0;
    for (var r; n; ) {
      if (n.nodeType === 3) {
        if (r = e + n.textContent.length, e <= t && r >= t) return { node: n, offset: t - e };
        e = r;
      }
      e: {
        for (; n; ) {
          if (n.nextSibling) {
            n = n.nextSibling;
            break e;
          }
          n = n.parentNode;
        }
        n = void 0;
      }
      n = eu(n);
    }
  }
  function nu(e, t) {
    return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? nu(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
  }
  function ru() {
    for (var e = window, t = ln(); t instanceof e.HTMLIFrameElement; ) {
      try {
        var n = typeof t.contentWindow.location.href == "string";
      } catch {
        n = !1;
      }
      if (n) e = t.contentWindow;
      else break;
      t = ln(e.document);
    }
    return t;
  }
  function Yl(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
  }
  function Rf(e) {
    var t = ru(), n = e.focusedElem, r = e.selectionRange;
    if (t !== n && n && n.ownerDocument && nu(n.ownerDocument.documentElement, n)) {
      if (r !== null && Yl(n)) {
        if (t = r.start, e = r.end, e === void 0 && (e = t), "selectionStart" in n) n.selectionStart = t, n.selectionEnd = Math.min(e, n.value.length);
        else if (e = (t = n.ownerDocument || document) && t.defaultView || window, e.getSelection) {
          e = e.getSelection();
          var i = n.textContent.length, l = Math.min(r.start, i);
          r = r.end === void 0 ? l : Math.min(r.end, i), !e.extend && l > r && (i = r, r = l, l = i), i = tu(n, l);
          var u = tu(
            n,
            r
          );
          i && u && (e.rangeCount !== 1 || e.anchorNode !== i.node || e.anchorOffset !== i.offset || e.focusNode !== u.node || e.focusOffset !== u.offset) && (t = t.createRange(), t.setStart(i.node, i.offset), e.removeAllRanges(), l > r ? (e.addRange(t), e.extend(u.node, u.offset)) : (t.setEnd(u.node, u.offset), e.addRange(t)));
        }
      }
      for (t = [], e = n; e = e.parentNode; ) e.nodeType === 1 && t.push({ element: e, left: e.scrollLeft, top: e.scrollTop });
      for (typeof n.focus == "function" && n.focus(), n = 0; n < t.length; n++) e = t[n], e.element.scrollLeft = e.left, e.element.scrollTop = e.top;
    }
  }
  var Nf = L && "documentMode" in document && 11 >= document.documentMode, ir = null, Xl = null, Br = null, Kl = !1;
  function iu(e, t, n) {
    var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
    Kl || ir == null || ir !== ln(r) || (r = ir, "selectionStart" in r && Yl(r) ? r = { start: r.selectionStart, end: r.selectionEnd } : (r = (r.ownerDocument && r.ownerDocument.defaultView || window).getSelection(), r = { anchorNode: r.anchorNode, anchorOffset: r.anchorOffset, focusNode: r.focusNode, focusOffset: r.focusOffset }), Br && Hr(Br, r) || (Br = r, r = Mi(Xl, "onSelect"), 0 < r.length && (t = new jl("onSelect", "select", null, t, n), e.push({ event: t, listeners: r }), t.target = ir)));
  }
  function Di(e, t) {
    var n = {};
    return n[e.toLowerCase()] = t.toLowerCase(), n["Webkit" + e] = "webkit" + t, n["Moz" + e] = "moz" + t, n;
  }
  var lr = { animationend: Di("Animation", "AnimationEnd"), animationiteration: Di("Animation", "AnimationIteration"), animationstart: Di("Animation", "AnimationStart"), transitionend: Di("Transition", "TransitionEnd") }, Ql = {}, lu = {};
  L && (lu = document.createElement("div").style, "AnimationEvent" in window || (delete lr.animationend.animation, delete lr.animationiteration.animation, delete lr.animationstart.animation), "TransitionEvent" in window || delete lr.transitionend.transition);
  function zi(e) {
    if (Ql[e]) return Ql[e];
    if (!lr[e]) return e;
    var t = lr[e], n;
    for (n in t) if (t.hasOwnProperty(n) && n in lu) return Ql[e] = t[n];
    return e;
  }
  var ou = zi("animationend"), su = zi("animationiteration"), uu = zi("animationstart"), au = zi("transitionend"), cu = /* @__PURE__ */ new Map(), fu = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
  function yn(e, t) {
    cu.set(e, t), k(t, [e]);
  }
  for (var Gl = 0; Gl < fu.length; Gl++) {
    var ql = fu[Gl], Df = ql.toLowerCase(), zf = ql[0].toUpperCase() + ql.slice(1);
    yn(Df, "on" + zf);
  }
  yn(ou, "onAnimationEnd"), yn(su, "onAnimationIteration"), yn(uu, "onAnimationStart"), yn("dblclick", "onDoubleClick"), yn("focusin", "onFocus"), yn("focusout", "onBlur"), yn(au, "onTransitionEnd"), T("onMouseEnter", ["mouseout", "mouseover"]), T("onMouseLeave", ["mouseout", "mouseover"]), T("onPointerEnter", ["pointerout", "pointerover"]), T("onPointerLeave", ["pointerout", "pointerover"]), k("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" ")), k("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")), k("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]), k("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" ")), k("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" ")), k("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
  var Wr = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), Lf = new Set("cancel close invalid load scroll toggle".split(" ").concat(Wr));
  function du(e, t, n) {
    var r = e.type || "unknown-event";
    e.currentTarget = n, Tl(r, t, void 0, e), e.currentTarget = null;
  }
  function pu(e, t) {
    t = (t & 4) !== 0;
    for (var n = 0; n < e.length; n++) {
      var r = e[n], i = r.event;
      r = r.listeners;
      e: {
        var l = void 0;
        if (t) for (var u = r.length - 1; 0 <= u; u--) {
          var f = r[u], d = f.instance, g = f.currentTarget;
          if (f = f.listener, d !== l && i.isPropagationStopped()) break e;
          du(i, f, g), l = d;
        }
        else for (u = 0; u < r.length; u++) {
          if (f = r[u], d = f.instance, g = f.currentTarget, f = f.listener, d !== l && i.isPropagationStopped()) break e;
          du(i, f, g), l = d;
        }
      }
    }
    if (On) throw e = er, On = !1, er = null, e;
  }
  function Se(e, t) {
    var n = t[io];
    n === void 0 && (n = t[io] = /* @__PURE__ */ new Set());
    var r = e + "__bubble";
    n.has(r) || (hu(t, e, 2, !1), n.add(r));
  }
  function Zl(e, t, n) {
    var r = 0;
    t && (r |= 4), hu(n, e, r, t);
  }
  var Li = "_reactListening" + Math.random().toString(36).slice(2);
  function Yr(e) {
    if (!e[Li]) {
      e[Li] = !0, c.forEach(function(n) {
        n !== "selectionchange" && (Lf.has(n) || Zl(n, !1, e), Zl(n, !0, e));
      });
      var t = e.nodeType === 9 ? e : e.ownerDocument;
      t === null || t[Li] || (t[Li] = !0, Zl("selectionchange", !1, t));
    }
  }
  function hu(e, t, n, r) {
    switch (js(t)) {
      case 1:
        var i = Yc;
        break;
      case 4:
        i = Xc;
        break;
      default:
        i = Il;
    }
    n = i.bind(null, t, n, e), i = void 0, !Jn || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (i = !0), r ? i !== void 0 ? e.addEventListener(t, n, { capture: !0, passive: i }) : e.addEventListener(t, n, !0) : i !== void 0 ? e.addEventListener(t, n, { passive: i }) : e.addEventListener(t, n, !1);
  }
  function Jl(e, t, n, r, i) {
    var l = r;
    if ((t & 1) === 0 && (t & 2) === 0 && r !== null) e: for (; ; ) {
      if (r === null) return;
      var u = r.tag;
      if (u === 3 || u === 4) {
        var f = r.stateNode.containerInfo;
        if (f === i || f.nodeType === 8 && f.parentNode === i) break;
        if (u === 4) for (u = r.return; u !== null; ) {
          var d = u.tag;
          if ((d === 3 || d === 4) && (d = u.stateNode.containerInfo, d === i || d.nodeType === 8 && d.parentNode === i)) return;
          u = u.return;
        }
        for (; f !== null; ) {
          if (u = An(f), u === null) return;
          if (d = u.tag, d === 5 || d === 6) {
            r = l = u;
            continue e;
          }
          f = f.parentNode;
        }
      }
      r = r.return;
    }
    Nr(function() {
      var g = l, S = qe(n), x = [];
      e: {
        var _ = cu.get(e);
        if (_ !== void 0) {
          var D = jl, I = e;
          switch (e) {
            case "keypress":
              if (Pi(n) === 0) break e;
            case "keydown":
            case "keyup":
              D = uf;
              break;
            case "focusin":
              I = "focus", D = $l;
              break;
            case "focusout":
              I = "blur", D = $l;
              break;
            case "beforeblur":
            case "afterblur":
              D = $l;
              break;
            case "click":
              if (n.button === 2) break e;
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              D = $s;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              D = Gc;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              D = ff;
              break;
            case ou:
            case su:
            case uu:
              D = Jc;
              break;
            case au:
              D = pf;
              break;
            case "scroll":
              D = Kc;
              break;
            case "wheel":
              D = mf;
              break;
            case "copy":
            case "cut":
            case "paste":
              D = ef;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              D = Hs;
          }
          var O = (t & 4) !== 0, Ue = !O && e === "scroll", v = O ? _ !== null ? _ + "Capture" : null : _;
          O = [];
          for (var p = g, y; p !== null; ) {
            y = p;
            var E = y.stateNode;
            if (y.tag === 5 && E !== null && (y = E, v !== null && (E = cn(p, v), E != null && O.push(Xr(p, E, y)))), Ue) break;
            p = p.return;
          }
          0 < O.length && (_ = new D(_, I, null, n, S), x.push({ event: _, listeners: O }));
        }
      }
      if ((t & 7) === 0) {
        e: {
          if (_ = e === "mouseover" || e === "pointerover", D = e === "mouseout" || e === "pointerout", _ && n !== W && (I = n.relatedTarget || n.fromElement) && (An(I) || I[qt])) break e;
          if ((D || _) && (_ = S.window === S ? S : (_ = S.ownerDocument) ? _.defaultView || _.parentWindow : window, D ? (I = n.relatedTarget || n.toElement, D = g, I = I ? An(I) : null, I !== null && (Ue = Vt(I), I !== Ue || I.tag !== 5 && I.tag !== 6) && (I = null)) : (D = null, I = g), D !== I)) {
            if (O = $s, E = "onMouseLeave", v = "onMouseEnter", p = "mouse", (e === "pointerout" || e === "pointerover") && (O = Hs, E = "onPointerLeave", v = "onPointerEnter", p = "pointer"), Ue = D == null ? _ : ur(D), y = I == null ? _ : ur(I), _ = new O(E, p + "leave", D, n, S), _.target = Ue, _.relatedTarget = y, E = null, An(S) === g && (O = new O(v, p + "enter", I, n, S), O.target = y, O.relatedTarget = Ue, E = O), Ue = E, D && I) t: {
              for (O = D, v = I, p = 0, y = O; y; y = or(y)) p++;
              for (y = 0, E = v; E; E = or(E)) y++;
              for (; 0 < p - y; ) O = or(O), p--;
              for (; 0 < y - p; ) v = or(v), y--;
              for (; p--; ) {
                if (O === v || v !== null && O === v.alternate) break t;
                O = or(O), v = or(v);
              }
              O = null;
            }
            else O = null;
            D !== null && mu(x, _, D, O, !1), I !== null && Ue !== null && mu(x, Ue, I, O, !0);
          }
        }
        e: {
          if (_ = g ? ur(g) : window, D = _.nodeName && _.nodeName.toLowerCase(), D === "select" || D === "input" && _.type === "file") var A = kf;
          else if (Qs(_)) if (qs) A = Pf;
          else {
            A = Ef;
            var U = xf;
          }
          else (D = _.nodeName) && D.toLowerCase() === "input" && (_.type === "checkbox" || _.type === "radio") && (A = Cf);
          if (A && (A = A(e, g))) {
            Gs(x, A, n, S);
            break e;
          }
          U && U(e, _, g), e === "focusout" && (U = _._wrapperState) && U.controlled && _.type === "number" && qn(_, "number", _.value);
        }
        switch (U = g ? ur(g) : window, e) {
          case "focusin":
            (Qs(U) || U.contentEditable === "true") && (ir = U, Xl = g, Br = null);
            break;
          case "focusout":
            Br = Xl = ir = null;
            break;
          case "mousedown":
            Kl = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            Kl = !1, iu(x, n, S);
            break;
          case "selectionchange":
            if (Nf) break;
          case "keydown":
          case "keyup":
            iu(x, n, S);
        }
        var $;
        if (Hl) e: {
          switch (e) {
            case "compositionstart":
              var V = "onCompositionStart";
              break e;
            case "compositionend":
              V = "onCompositionEnd";
              break e;
            case "compositionupdate":
              V = "onCompositionUpdate";
              break e;
          }
          V = void 0;
        }
        else rr ? Xs(e, n) && (V = "onCompositionEnd") : e === "keydown" && n.keyCode === 229 && (V = "onCompositionStart");
        V && (Bs && n.locale !== "ko" && (rr || V !== "onCompositionStart" ? V === "onCompositionEnd" && rr && ($ = Fs()) : (vn = S, Al = "value" in vn ? vn.value : vn.textContent, rr = !0)), U = Mi(g, V), 0 < U.length && (V = new Vs(V, e, null, n, S), x.push({ event: V, listeners: U }), $ ? V.data = $ : ($ = Ks(n), $ !== null && (V.data = $)))), ($ = yf ? gf(e, n) : wf(e, n)) && (g = Mi(g, "onBeforeInput"), 0 < g.length && (S = new Vs("onBeforeInput", "beforeinput", null, n, S), x.push({ event: S, listeners: g }), S.data = $));
      }
      pu(x, t);
    });
  }
  function Xr(e, t, n) {
    return { instance: e, listener: t, currentTarget: n };
  }
  function Mi(e, t) {
    for (var n = t + "Capture", r = []; e !== null; ) {
      var i = e, l = i.stateNode;
      i.tag === 5 && l !== null && (i = l, l = cn(e, n), l != null && r.unshift(Xr(e, l, i)), l = cn(e, t), l != null && r.push(Xr(e, l, i))), e = e.return;
    }
    return r;
  }
  function or(e) {
    if (e === null) return null;
    do
      e = e.return;
    while (e && e.tag !== 5);
    return e || null;
  }
  function mu(e, t, n, r, i) {
    for (var l = t._reactName, u = []; n !== null && n !== r; ) {
      var f = n, d = f.alternate, g = f.stateNode;
      if (d !== null && d === r) break;
      f.tag === 5 && g !== null && (f = g, i ? (d = cn(n, l), d != null && u.unshift(Xr(n, d, f))) : i || (d = cn(n, l), d != null && u.push(Xr(n, d, f)))), n = n.return;
    }
    u.length !== 0 && e.push({ event: t, listeners: u });
  }
  var Mf = /\r\n?/g, If = /\u0000|\uFFFD/g;
  function vu(e) {
    return (typeof e == "string" ? e : "" + e).replace(Mf, `
`).replace(If, "");
  }
  function Ii(e, t, n) {
    if (t = vu(t), vu(e) !== t && n) throw Error(s(425));
  }
  function Oi() {
  }
  var bl = null, eo = null;
  function to(e, t) {
    return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
  }
  var no = typeof setTimeout == "function" ? setTimeout : void 0, Of = typeof clearTimeout == "function" ? clearTimeout : void 0, yu = typeof Promise == "function" ? Promise : void 0, Af = typeof queueMicrotask == "function" ? queueMicrotask : typeof yu < "u" ? function(e) {
    return yu.resolve(null).then(e).catch(jf);
  } : no;
  function jf(e) {
    setTimeout(function() {
      throw e;
    });
  }
  function ro(e, t) {
    var n = t, r = 0;
    do {
      var i = n.nextSibling;
      if (e.removeChild(n), i && i.nodeType === 8) if (n = i.data, n === "/$") {
        if (r === 0) {
          e.removeChild(i), Ar(t);
          return;
        }
        r--;
      } else n !== "$" && n !== "$?" && n !== "$!" || r++;
      n = i;
    } while (n);
    Ar(t);
  }
  function gn(e) {
    for (; e != null; e = e.nextSibling) {
      var t = e.nodeType;
      if (t === 1 || t === 3) break;
      if (t === 8) {
        if (t = e.data, t === "$" || t === "$!" || t === "$?") break;
        if (t === "/$") return null;
      }
    }
    return e;
  }
  function gu(e) {
    e = e.previousSibling;
    for (var t = 0; e; ) {
      if (e.nodeType === 8) {
        var n = e.data;
        if (n === "$" || n === "$!" || n === "$?") {
          if (t === 0) return e;
          t--;
        } else n === "/$" && t++;
      }
      e = e.previousSibling;
    }
    return null;
  }
  var sr = Math.random().toString(36).slice(2), Bt = "__reactFiber$" + sr, Kr = "__reactProps$" + sr, qt = "__reactContainer$" + sr, io = "__reactEvents$" + sr, Ff = "__reactListeners$" + sr, Uf = "__reactHandles$" + sr;
  function An(e) {
    var t = e[Bt];
    if (t) return t;
    for (var n = e.parentNode; n; ) {
      if (t = n[qt] || n[Bt]) {
        if (n = t.alternate, t.child !== null || n !== null && n.child !== null) for (e = gu(e); e !== null; ) {
          if (n = e[Bt]) return n;
          e = gu(e);
        }
        return t;
      }
      e = n, n = e.parentNode;
    }
    return null;
  }
  function Qr(e) {
    return e = e[Bt] || e[qt], !e || e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3 ? null : e;
  }
  function ur(e) {
    if (e.tag === 5 || e.tag === 6) return e.stateNode;
    throw Error(s(33));
  }
  function Ai(e) {
    return e[Kr] || null;
  }
  var lo = [], ar = -1;
  function wn(e) {
    return { current: e };
  }
  function ke(e) {
    0 > ar || (e.current = lo[ar], lo[ar] = null, ar--);
  }
  function ge(e, t) {
    ar++, lo[ar] = e.current, e.current = t;
  }
  var _n = {}, lt = wn(_n), mt = wn(!1), jn = _n;
  function cr(e, t) {
    var n = e.type.contextTypes;
    if (!n) return _n;
    var r = e.stateNode;
    if (r && r.__reactInternalMemoizedUnmaskedChildContext === t) return r.__reactInternalMemoizedMaskedChildContext;
    var i = {}, l;
    for (l in n) i[l] = t[l];
    return r && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = t, e.__reactInternalMemoizedMaskedChildContext = i), i;
  }
  function vt(e) {
    return e = e.childContextTypes, e != null;
  }
  function ji() {
    ke(mt), ke(lt);
  }
  function wu(e, t, n) {
    if (lt.current !== _n) throw Error(s(168));
    ge(lt, t), ge(mt, n);
  }
  function _u(e, t, n) {
    var r = e.stateNode;
    if (t = t.childContextTypes, typeof r.getChildContext != "function") return n;
    r = r.getChildContext();
    for (var i in r) if (!(i in t)) throw Error(s(108, ue(e) || "Unknown", i));
    return N({}, n, r);
  }
  function Fi(e) {
    return e = (e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext || _n, jn = lt.current, ge(lt, e), ge(mt, mt.current), !0;
  }
  function Su(e, t, n) {
    var r = e.stateNode;
    if (!r) throw Error(s(169));
    n ? (e = _u(e, t, jn), r.__reactInternalMemoizedMergedChildContext = e, ke(mt), ke(lt), ge(lt, e)) : ke(mt), ge(mt, n);
  }
  var Zt = null, Ui = !1, oo = !1;
  function ku(e) {
    Zt === null ? Zt = [e] : Zt.push(e);
  }
  function $f(e) {
    Ui = !0, ku(e);
  }
  function Sn() {
    if (!oo && Zt !== null) {
      oo = !0;
      var e = 0, t = fe;
      try {
        var n = Zt;
        for (fe = 1; e < n.length; e++) {
          var r = n[e];
          do
            r = r(!0);
          while (r !== null);
        }
        Zt = null, Ui = !1;
      } catch (i) {
        throw Zt !== null && (Zt = Zt.slice(e + 1)), Es(Rl, Sn), i;
      } finally {
        fe = t, oo = !1;
      }
    }
    return null;
  }
  var fr = [], dr = 0, $i = null, Vi = 0, Pt = [], Tt = 0, Fn = null, Jt = 1, bt = "";
  function Un(e, t) {
    fr[dr++] = Vi, fr[dr++] = $i, $i = e, Vi = t;
  }
  function xu(e, t, n) {
    Pt[Tt++] = Jt, Pt[Tt++] = bt, Pt[Tt++] = Fn, Fn = e;
    var r = Jt;
    e = bt;
    var i = 32 - It(r) - 1;
    r &= ~(1 << i), n += 1;
    var l = 32 - It(t) + i;
    if (30 < l) {
      var u = i - i % 5;
      l = (r & (1 << u) - 1).toString(32), r >>= u, i -= u, Jt = 1 << 32 - It(t) + i | n << i | r, bt = l + e;
    } else Jt = 1 << l | n << i | r, bt = e;
  }
  function so(e) {
    e.return !== null && (Un(e, 1), xu(e, 1, 0));
  }
  function uo(e) {
    for (; e === $i; ) $i = fr[--dr], fr[dr] = null, Vi = fr[--dr], fr[dr] = null;
    for (; e === Fn; ) Fn = Pt[--Tt], Pt[Tt] = null, bt = Pt[--Tt], Pt[Tt] = null, Jt = Pt[--Tt], Pt[Tt] = null;
  }
  var kt = null, xt = null, Pe = !1, At = null;
  function Eu(e, t) {
    var n = zt(5, null, null, 0);
    n.elementType = "DELETED", n.stateNode = t, n.return = e, t = e.deletions, t === null ? (e.deletions = [n], e.flags |= 16) : t.push(n);
  }
  function Cu(e, t) {
    switch (e.tag) {
      case 5:
        var n = e.type;
        return t = t.nodeType !== 1 || n.toLowerCase() !== t.nodeName.toLowerCase() ? null : t, t !== null ? (e.stateNode = t, kt = e, xt = gn(t.firstChild), !0) : !1;
      case 6:
        return t = e.pendingProps === "" || t.nodeType !== 3 ? null : t, t !== null ? (e.stateNode = t, kt = e, xt = null, !0) : !1;
      case 13:
        return t = t.nodeType !== 8 ? null : t, t !== null ? (n = Fn !== null ? { id: Jt, overflow: bt } : null, e.memoizedState = { dehydrated: t, treeContext: n, retryLane: 1073741824 }, n = zt(18, null, null, 0), n.stateNode = t, n.return = e, e.child = n, kt = e, xt = null, !0) : !1;
      default:
        return !1;
    }
  }
  function ao(e) {
    return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
  }
  function co(e) {
    if (Pe) {
      var t = xt;
      if (t) {
        var n = t;
        if (!Cu(e, t)) {
          if (ao(e)) throw Error(s(418));
          t = gn(n.nextSibling);
          var r = kt;
          t && Cu(e, t) ? Eu(r, n) : (e.flags = e.flags & -4097 | 2, Pe = !1, kt = e);
        }
      } else {
        if (ao(e)) throw Error(s(418));
        e.flags = e.flags & -4097 | 2, Pe = !1, kt = e;
      }
    }
  }
  function Pu(e) {
    for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13; ) e = e.return;
    kt = e;
  }
  function Hi(e) {
    if (e !== kt) return !1;
    if (!Pe) return Pu(e), Pe = !0, !1;
    var t;
    if ((t = e.tag !== 3) && !(t = e.tag !== 5) && (t = e.type, t = t !== "head" && t !== "body" && !to(e.type, e.memoizedProps)), t && (t = xt)) {
      if (ao(e)) throw Tu(), Error(s(418));
      for (; t; ) Eu(e, t), t = gn(t.nextSibling);
    }
    if (Pu(e), e.tag === 13) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(s(317));
      e: {
        for (e = e.nextSibling, t = 0; e; ) {
          if (e.nodeType === 8) {
            var n = e.data;
            if (n === "/$") {
              if (t === 0) {
                xt = gn(e.nextSibling);
                break e;
              }
              t--;
            } else n !== "$" && n !== "$!" && n !== "$?" || t++;
          }
          e = e.nextSibling;
        }
        xt = null;
      }
    } else xt = kt ? gn(e.stateNode.nextSibling) : null;
    return !0;
  }
  function Tu() {
    for (var e = xt; e; ) e = gn(e.nextSibling);
  }
  function pr() {
    xt = kt = null, Pe = !1;
  }
  function fo(e) {
    At === null ? At = [e] : At.push(e);
  }
  var Vf = Ae.ReactCurrentBatchConfig;
  function Gr(e, t, n) {
    if (e = n.ref, e !== null && typeof e != "function" && typeof e != "object") {
      if (n._owner) {
        if (n = n._owner, n) {
          if (n.tag !== 1) throw Error(s(309));
          var r = n.stateNode;
        }
        if (!r) throw Error(s(147, e));
        var i = r, l = "" + e;
        return t !== null && t.ref !== null && typeof t.ref == "function" && t.ref._stringRef === l ? t.ref : (t = function(u) {
          var f = i.refs;
          u === null ? delete f[l] : f[l] = u;
        }, t._stringRef = l, t);
      }
      if (typeof e != "string") throw Error(s(284));
      if (!n._owner) throw Error(s(290, e));
    }
    return e;
  }
  function Bi(e, t) {
    throw e = Object.prototype.toString.call(t), Error(s(31, e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e));
  }
  function Ru(e) {
    var t = e._init;
    return t(e._payload);
  }
  function Nu(e) {
    function t(v, p) {
      if (e) {
        var y = v.deletions;
        y === null ? (v.deletions = [p], v.flags |= 16) : y.push(p);
      }
    }
    function n(v, p) {
      if (!e) return null;
      for (; p !== null; ) t(v, p), p = p.sibling;
      return null;
    }
    function r(v, p) {
      for (v = /* @__PURE__ */ new Map(); p !== null; ) p.key !== null ? v.set(p.key, p) : v.set(p.index, p), p = p.sibling;
      return v;
    }
    function i(v, p) {
      return v = Nn(v, p), v.index = 0, v.sibling = null, v;
    }
    function l(v, p, y) {
      return v.index = y, e ? (y = v.alternate, y !== null ? (y = y.index, y < p ? (v.flags |= 2, p) : y) : (v.flags |= 2, p)) : (v.flags |= 1048576, p);
    }
    function u(v) {
      return e && v.alternate === null && (v.flags |= 2), v;
    }
    function f(v, p, y, E) {
      return p === null || p.tag !== 6 ? (p = rs(y, v.mode, E), p.return = v, p) : (p = i(p, y), p.return = v, p);
    }
    function d(v, p, y, E) {
      var A = y.type;
      return A === Qe ? S(v, p, y.props.children, E, y.key) : p !== null && (p.elementType === A || typeof A == "object" && A !== null && A.$$typeof === ae && Ru(A) === p.type) ? (E = i(p, y.props), E.ref = Gr(v, p, y), E.return = v, E) : (E = pl(y.type, y.key, y.props, null, v.mode, E), E.ref = Gr(v, p, y), E.return = v, E);
    }
    function g(v, p, y, E) {
      return p === null || p.tag !== 4 || p.stateNode.containerInfo !== y.containerInfo || p.stateNode.implementation !== y.implementation ? (p = is(y, v.mode, E), p.return = v, p) : (p = i(p, y.children || []), p.return = v, p);
    }
    function S(v, p, y, E, A) {
      return p === null || p.tag !== 7 ? (p = Kn(y, v.mode, E, A), p.return = v, p) : (p = i(p, y), p.return = v, p);
    }
    function x(v, p, y) {
      if (typeof p == "string" && p !== "" || typeof p == "number") return p = rs("" + p, v.mode, y), p.return = v, p;
      if (typeof p == "object" && p !== null) {
        switch (p.$$typeof) {
          case Ke:
            return y = pl(p.type, p.key, p.props, null, v.mode, y), y.ref = Gr(v, null, p), y.return = v, y;
          case we:
            return p = is(p, v.mode, y), p.return = v, p;
          case ae:
            var E = p._init;
            return x(v, E(p._payload), y);
        }
        if (Gt(p) || j(p)) return p = Kn(p, v.mode, y, null), p.return = v, p;
        Bi(v, p);
      }
      return null;
    }
    function _(v, p, y, E) {
      var A = p !== null ? p.key : null;
      if (typeof y == "string" && y !== "" || typeof y == "number") return A !== null ? null : f(v, p, "" + y, E);
      if (typeof y == "object" && y !== null) {
        switch (y.$$typeof) {
          case Ke:
            return y.key === A ? d(v, p, y, E) : null;
          case we:
            return y.key === A ? g(v, p, y, E) : null;
          case ae:
            return A = y._init, _(
              v,
              p,
              A(y._payload),
              E
            );
        }
        if (Gt(y) || j(y)) return A !== null ? null : S(v, p, y, E, null);
        Bi(v, y);
      }
      return null;
    }
    function D(v, p, y, E, A) {
      if (typeof E == "string" && E !== "" || typeof E == "number") return v = v.get(y) || null, f(p, v, "" + E, A);
      if (typeof E == "object" && E !== null) {
        switch (E.$$typeof) {
          case Ke:
            return v = v.get(E.key === null ? y : E.key) || null, d(p, v, E, A);
          case we:
            return v = v.get(E.key === null ? y : E.key) || null, g(p, v, E, A);
          case ae:
            var U = E._init;
            return D(v, p, y, U(E._payload), A);
        }
        if (Gt(E) || j(E)) return v = v.get(y) || null, S(p, v, E, A, null);
        Bi(p, E);
      }
      return null;
    }
    function I(v, p, y, E) {
      for (var A = null, U = null, $ = p, V = p = 0, be = null; $ !== null && V < y.length; V++) {
        $.index > V ? (be = $, $ = null) : be = $.sibling;
        var se = _(v, $, y[V], E);
        if (se === null) {
          $ === null && ($ = be);
          break;
        }
        e && $ && se.alternate === null && t(v, $), p = l(se, p, V), U === null ? A = se : U.sibling = se, U = se, $ = be;
      }
      if (V === y.length) return n(v, $), Pe && Un(v, V), A;
      if ($ === null) {
        for (; V < y.length; V++) $ = x(v, y[V], E), $ !== null && (p = l($, p, V), U === null ? A = $ : U.sibling = $, U = $);
        return Pe && Un(v, V), A;
      }
      for ($ = r(v, $); V < y.length; V++) be = D($, v, V, y[V], E), be !== null && (e && be.alternate !== null && $.delete(be.key === null ? V : be.key), p = l(be, p, V), U === null ? A = be : U.sibling = be, U = be);
      return e && $.forEach(function(Dn) {
        return t(v, Dn);
      }), Pe && Un(v, V), A;
    }
    function O(v, p, y, E) {
      var A = j(y);
      if (typeof A != "function") throw Error(s(150));
      if (y = A.call(y), y == null) throw Error(s(151));
      for (var U = A = null, $ = p, V = p = 0, be = null, se = y.next(); $ !== null && !se.done; V++, se = y.next()) {
        $.index > V ? (be = $, $ = null) : be = $.sibling;
        var Dn = _(v, $, se.value, E);
        if (Dn === null) {
          $ === null && ($ = be);
          break;
        }
        e && $ && Dn.alternate === null && t(v, $), p = l(Dn, p, V), U === null ? A = Dn : U.sibling = Dn, U = Dn, $ = be;
      }
      if (se.done) return n(
        v,
        $
      ), Pe && Un(v, V), A;
      if ($ === null) {
        for (; !se.done; V++, se = y.next()) se = x(v, se.value, E), se !== null && (p = l(se, p, V), U === null ? A = se : U.sibling = se, U = se);
        return Pe && Un(v, V), A;
      }
      for ($ = r(v, $); !se.done; V++, se = y.next()) se = D($, v, V, se.value, E), se !== null && (e && se.alternate !== null && $.delete(se.key === null ? V : se.key), p = l(se, p, V), U === null ? A = se : U.sibling = se, U = se);
      return e && $.forEach(function(_d) {
        return t(v, _d);
      }), Pe && Un(v, V), A;
    }
    function Ue(v, p, y, E) {
      if (typeof y == "object" && y !== null && y.type === Qe && y.key === null && (y = y.props.children), typeof y == "object" && y !== null) {
        switch (y.$$typeof) {
          case Ke:
            e: {
              for (var A = y.key, U = p; U !== null; ) {
                if (U.key === A) {
                  if (A = y.type, A === Qe) {
                    if (U.tag === 7) {
                      n(v, U.sibling), p = i(U, y.props.children), p.return = v, v = p;
                      break e;
                    }
                  } else if (U.elementType === A || typeof A == "object" && A !== null && A.$$typeof === ae && Ru(A) === U.type) {
                    n(v, U.sibling), p = i(U, y.props), p.ref = Gr(v, U, y), p.return = v, v = p;
                    break e;
                  }
                  n(v, U);
                  break;
                } else t(v, U);
                U = U.sibling;
              }
              y.type === Qe ? (p = Kn(y.props.children, v.mode, E, y.key), p.return = v, v = p) : (E = pl(y.type, y.key, y.props, null, v.mode, E), E.ref = Gr(v, p, y), E.return = v, v = E);
            }
            return u(v);
          case we:
            e: {
              for (U = y.key; p !== null; ) {
                if (p.key === U) if (p.tag === 4 && p.stateNode.containerInfo === y.containerInfo && p.stateNode.implementation === y.implementation) {
                  n(v, p.sibling), p = i(p, y.children || []), p.return = v, v = p;
                  break e;
                } else {
                  n(v, p);
                  break;
                }
                else t(v, p);
                p = p.sibling;
              }
              p = is(y, v.mode, E), p.return = v, v = p;
            }
            return u(v);
          case ae:
            return U = y._init, Ue(v, p, U(y._payload), E);
        }
        if (Gt(y)) return I(v, p, y, E);
        if (j(y)) return O(v, p, y, E);
        Bi(v, y);
      }
      return typeof y == "string" && y !== "" || typeof y == "number" ? (y = "" + y, p !== null && p.tag === 6 ? (n(v, p.sibling), p = i(p, y), p.return = v, v = p) : (n(v, p), p = rs(y, v.mode, E), p.return = v, v = p), u(v)) : n(v, p);
    }
    return Ue;
  }
  var hr = Nu(!0), Du = Nu(!1), Wi = wn(null), Yi = null, mr = null, po = null;
  function ho() {
    po = mr = Yi = null;
  }
  function mo(e) {
    var t = Wi.current;
    ke(Wi), e._currentValue = t;
  }
  function vo(e, t, n) {
    for (; e !== null; ) {
      var r = e.alternate;
      if ((e.childLanes & t) !== t ? (e.childLanes |= t, r !== null && (r.childLanes |= t)) : r !== null && (r.childLanes & t) !== t && (r.childLanes |= t), e === n) break;
      e = e.return;
    }
  }
  function vr(e, t) {
    Yi = e, po = mr = null, e = e.dependencies, e !== null && e.firstContext !== null && ((e.lanes & t) !== 0 && (yt = !0), e.firstContext = null);
  }
  function Rt(e) {
    var t = e._currentValue;
    if (po !== e) if (e = { context: e, memoizedValue: t, next: null }, mr === null) {
      if (Yi === null) throw Error(s(308));
      mr = e, Yi.dependencies = { lanes: 0, firstContext: e };
    } else mr = mr.next = e;
    return t;
  }
  var $n = null;
  function yo(e) {
    $n === null ? $n = [e] : $n.push(e);
  }
  function zu(e, t, n, r) {
    var i = t.interleaved;
    return i === null ? (n.next = n, yo(t)) : (n.next = i.next, i.next = n), t.interleaved = n, en(e, r);
  }
  function en(e, t) {
    e.lanes |= t;
    var n = e.alternate;
    for (n !== null && (n.lanes |= t), n = e, e = e.return; e !== null; ) e.childLanes |= t, n = e.alternate, n !== null && (n.childLanes |= t), n = e, e = e.return;
    return n.tag === 3 ? n.stateNode : null;
  }
  var kn = !1;
  function go(e) {
    e.updateQueue = { baseState: e.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, interleaved: null, lanes: 0 }, effects: null };
  }
  function Lu(e, t) {
    e = e.updateQueue, t.updateQueue === e && (t.updateQueue = { baseState: e.baseState, firstBaseUpdate: e.firstBaseUpdate, lastBaseUpdate: e.lastBaseUpdate, shared: e.shared, effects: e.effects });
  }
  function tn(e, t) {
    return { eventTime: e, lane: t, tag: 0, payload: null, callback: null, next: null };
  }
  function xn(e, t, n) {
    var r = e.updateQueue;
    if (r === null) return null;
    if (r = r.shared, (ie & 2) !== 0) {
      var i = r.pending;
      return i === null ? t.next = t : (t.next = i.next, i.next = t), r.pending = t, en(e, n);
    }
    return i = r.interleaved, i === null ? (t.next = t, yo(r)) : (t.next = i.next, i.next = t), r.interleaved = t, en(e, n);
  }
  function Xi(e, t, n) {
    if (t = t.updateQueue, t !== null && (t = t.shared, (n & 4194240) !== 0)) {
      var r = t.lanes;
      r &= e.pendingLanes, n |= r, t.lanes = n, zl(e, n);
    }
  }
  function Mu(e, t) {
    var n = e.updateQueue, r = e.alternate;
    if (r !== null && (r = r.updateQueue, n === r)) {
      var i = null, l = null;
      if (n = n.firstBaseUpdate, n !== null) {
        do {
          var u = { eventTime: n.eventTime, lane: n.lane, tag: n.tag, payload: n.payload, callback: n.callback, next: null };
          l === null ? i = l = u : l = l.next = u, n = n.next;
        } while (n !== null);
        l === null ? i = l = t : l = l.next = t;
      } else i = l = t;
      n = { baseState: r.baseState, firstBaseUpdate: i, lastBaseUpdate: l, shared: r.shared, effects: r.effects }, e.updateQueue = n;
      return;
    }
    e = n.lastBaseUpdate, e === null ? n.firstBaseUpdate = t : e.next = t, n.lastBaseUpdate = t;
  }
  function Ki(e, t, n, r) {
    var i = e.updateQueue;
    kn = !1;
    var l = i.firstBaseUpdate, u = i.lastBaseUpdate, f = i.shared.pending;
    if (f !== null) {
      i.shared.pending = null;
      var d = f, g = d.next;
      d.next = null, u === null ? l = g : u.next = g, u = d;
      var S = e.alternate;
      S !== null && (S = S.updateQueue, f = S.lastBaseUpdate, f !== u && (f === null ? S.firstBaseUpdate = g : f.next = g, S.lastBaseUpdate = d));
    }
    if (l !== null) {
      var x = i.baseState;
      u = 0, S = g = d = null, f = l;
      do {
        var _ = f.lane, D = f.eventTime;
        if ((r & _) === _) {
          S !== null && (S = S.next = {
            eventTime: D,
            lane: 0,
            tag: f.tag,
            payload: f.payload,
            callback: f.callback,
            next: null
          });
          e: {
            var I = e, O = f;
            switch (_ = t, D = n, O.tag) {
              case 1:
                if (I = O.payload, typeof I == "function") {
                  x = I.call(D, x, _);
                  break e;
                }
                x = I;
                break e;
              case 3:
                I.flags = I.flags & -65537 | 128;
              case 0:
                if (I = O.payload, _ = typeof I == "function" ? I.call(D, x, _) : I, _ == null) break e;
                x = N({}, x, _);
                break e;
              case 2:
                kn = !0;
            }
          }
          f.callback !== null && f.lane !== 0 && (e.flags |= 64, _ = i.effects, _ === null ? i.effects = [f] : _.push(f));
        } else D = { eventTime: D, lane: _, tag: f.tag, payload: f.payload, callback: f.callback, next: null }, S === null ? (g = S = D, d = x) : S = S.next = D, u |= _;
        if (f = f.next, f === null) {
          if (f = i.shared.pending, f === null) break;
          _ = f, f = _.next, _.next = null, i.lastBaseUpdate = _, i.shared.pending = null;
        }
      } while (!0);
      if (S === null && (d = x), i.baseState = d, i.firstBaseUpdate = g, i.lastBaseUpdate = S, t = i.shared.interleaved, t !== null) {
        i = t;
        do
          u |= i.lane, i = i.next;
        while (i !== t);
      } else l === null && (i.shared.lanes = 0);
      Bn |= u, e.lanes = u, e.memoizedState = x;
    }
  }
  function Iu(e, t, n) {
    if (e = t.effects, t.effects = null, e !== null) for (t = 0; t < e.length; t++) {
      var r = e[t], i = r.callback;
      if (i !== null) {
        if (r.callback = null, r = n, typeof i != "function") throw Error(s(191, i));
        i.call(r);
      }
    }
  }
  var qr = {}, Wt = wn(qr), Zr = wn(qr), Jr = wn(qr);
  function Vn(e) {
    if (e === qr) throw Error(s(174));
    return e;
  }
  function wo(e, t) {
    switch (ge(Jr, t), ge(Zr, e), ge(Wt, qr), e = t.nodeType, e) {
      case 9:
      case 11:
        t = (t = t.documentElement) ? t.namespaceURI : re(null, "");
        break;
      default:
        e = e === 8 ? t.parentNode : t, t = e.namespaceURI || null, e = e.tagName, t = re(t, e);
    }
    ke(Wt), ge(Wt, t);
  }
  function yr() {
    ke(Wt), ke(Zr), ke(Jr);
  }
  function Ou(e) {
    Vn(Jr.current);
    var t = Vn(Wt.current), n = re(t, e.type);
    t !== n && (ge(Zr, e), ge(Wt, n));
  }
  function _o(e) {
    Zr.current === e && (ke(Wt), ke(Zr));
  }
  var Ne = wn(0);
  function Qi(e) {
    for (var t = e; t !== null; ) {
      if (t.tag === 13) {
        var n = t.memoizedState;
        if (n !== null && (n = n.dehydrated, n === null || n.data === "$?" || n.data === "$!")) return t;
      } else if (t.tag === 19 && t.memoizedProps.revealOrder !== void 0) {
        if ((t.flags & 128) !== 0) return t;
      } else if (t.child !== null) {
        t.child.return = t, t = t.child;
        continue;
      }
      if (t === e) break;
      for (; t.sibling === null; ) {
        if (t.return === null || t.return === e) return null;
        t = t.return;
      }
      t.sibling.return = t.return, t = t.sibling;
    }
    return null;
  }
  var So = [];
  function ko() {
    for (var e = 0; e < So.length; e++) So[e]._workInProgressVersionPrimary = null;
    So.length = 0;
  }
  var Gi = Ae.ReactCurrentDispatcher, xo = Ae.ReactCurrentBatchConfig, Hn = 0, De = null, Ye = null, Ze = null, qi = !1, br = !1, ei = 0, Hf = 0;
  function ot() {
    throw Error(s(321));
  }
  function Eo(e, t) {
    if (t === null) return !1;
    for (var n = 0; n < t.length && n < e.length; n++) if (!Ot(e[n], t[n])) return !1;
    return !0;
  }
  function Co(e, t, n, r, i, l) {
    if (Hn = l, De = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, Gi.current = e === null || e.memoizedState === null ? Xf : Kf, e = n(r, i), br) {
      l = 0;
      do {
        if (br = !1, ei = 0, 25 <= l) throw Error(s(301));
        l += 1, Ze = Ye = null, t.updateQueue = null, Gi.current = Qf, e = n(r, i);
      } while (br);
    }
    if (Gi.current = bi, t = Ye !== null && Ye.next !== null, Hn = 0, Ze = Ye = De = null, qi = !1, t) throw Error(s(300));
    return e;
  }
  function Po() {
    var e = ei !== 0;
    return ei = 0, e;
  }
  function Yt() {
    var e = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
    return Ze === null ? De.memoizedState = Ze = e : Ze = Ze.next = e, Ze;
  }
  function Nt() {
    if (Ye === null) {
      var e = De.alternate;
      e = e !== null ? e.memoizedState : null;
    } else e = Ye.next;
    var t = Ze === null ? De.memoizedState : Ze.next;
    if (t !== null) Ze = t, Ye = e;
    else {
      if (e === null) throw Error(s(310));
      Ye = e, e = { memoizedState: Ye.memoizedState, baseState: Ye.baseState, baseQueue: Ye.baseQueue, queue: Ye.queue, next: null }, Ze === null ? De.memoizedState = Ze = e : Ze = Ze.next = e;
    }
    return Ze;
  }
  function ti(e, t) {
    return typeof t == "function" ? t(e) : t;
  }
  function To(e) {
    var t = Nt(), n = t.queue;
    if (n === null) throw Error(s(311));
    n.lastRenderedReducer = e;
    var r = Ye, i = r.baseQueue, l = n.pending;
    if (l !== null) {
      if (i !== null) {
        var u = i.next;
        i.next = l.next, l.next = u;
      }
      r.baseQueue = i = l, n.pending = null;
    }
    if (i !== null) {
      l = i.next, r = r.baseState;
      var f = u = null, d = null, g = l;
      do {
        var S = g.lane;
        if ((Hn & S) === S) d !== null && (d = d.next = { lane: 0, action: g.action, hasEagerState: g.hasEagerState, eagerState: g.eagerState, next: null }), r = g.hasEagerState ? g.eagerState : e(r, g.action);
        else {
          var x = {
            lane: S,
            action: g.action,
            hasEagerState: g.hasEagerState,
            eagerState: g.eagerState,
            next: null
          };
          d === null ? (f = d = x, u = r) : d = d.next = x, De.lanes |= S, Bn |= S;
        }
        g = g.next;
      } while (g !== null && g !== l);
      d === null ? u = r : d.next = f, Ot(r, t.memoizedState) || (yt = !0), t.memoizedState = r, t.baseState = u, t.baseQueue = d, n.lastRenderedState = r;
    }
    if (e = n.interleaved, e !== null) {
      i = e;
      do
        l = i.lane, De.lanes |= l, Bn |= l, i = i.next;
      while (i !== e);
    } else i === null && (n.lanes = 0);
    return [t.memoizedState, n.dispatch];
  }
  function Ro(e) {
    var t = Nt(), n = t.queue;
    if (n === null) throw Error(s(311));
    n.lastRenderedReducer = e;
    var r = n.dispatch, i = n.pending, l = t.memoizedState;
    if (i !== null) {
      n.pending = null;
      var u = i = i.next;
      do
        l = e(l, u.action), u = u.next;
      while (u !== i);
      Ot(l, t.memoizedState) || (yt = !0), t.memoizedState = l, t.baseQueue === null && (t.baseState = l), n.lastRenderedState = l;
    }
    return [l, r];
  }
  function Au() {
  }
  function ju(e, t) {
    var n = De, r = Nt(), i = t(), l = !Ot(r.memoizedState, i);
    if (l && (r.memoizedState = i, yt = !0), r = r.queue, No($u.bind(null, n, r, e), [e]), r.getSnapshot !== t || l || Ze !== null && Ze.memoizedState.tag & 1) {
      if (n.flags |= 2048, ni(9, Uu.bind(null, n, r, i, t), void 0, null), Je === null) throw Error(s(349));
      (Hn & 30) !== 0 || Fu(n, t, i);
    }
    return i;
  }
  function Fu(e, t, n) {
    e.flags |= 16384, e = { getSnapshot: t, value: n }, t = De.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, De.updateQueue = t, t.stores = [e]) : (n = t.stores, n === null ? t.stores = [e] : n.push(e));
  }
  function Uu(e, t, n, r) {
    t.value = n, t.getSnapshot = r, Vu(t) && Hu(e);
  }
  function $u(e, t, n) {
    return n(function() {
      Vu(t) && Hu(e);
    });
  }
  function Vu(e) {
    var t = e.getSnapshot;
    e = e.value;
    try {
      var n = t();
      return !Ot(e, n);
    } catch {
      return !0;
    }
  }
  function Hu(e) {
    var t = en(e, 1);
    t !== null && $t(t, e, 1, -1);
  }
  function Bu(e) {
    var t = Yt();
    return typeof e == "function" && (e = e()), t.memoizedState = t.baseState = e, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: ti, lastRenderedState: e }, t.queue = e, e = e.dispatch = Yf.bind(null, De, e), [t.memoizedState, e];
  }
  function ni(e, t, n, r) {
    return e = { tag: e, create: t, destroy: n, deps: r, next: null }, t = De.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, De.updateQueue = t, t.lastEffect = e.next = e) : (n = t.lastEffect, n === null ? t.lastEffect = e.next = e : (r = n.next, n.next = e, e.next = r, t.lastEffect = e)), e;
  }
  function Wu() {
    return Nt().memoizedState;
  }
  function Zi(e, t, n, r) {
    var i = Yt();
    De.flags |= e, i.memoizedState = ni(1 | t, n, void 0, r === void 0 ? null : r);
  }
  function Ji(e, t, n, r) {
    var i = Nt();
    r = r === void 0 ? null : r;
    var l = void 0;
    if (Ye !== null) {
      var u = Ye.memoizedState;
      if (l = u.destroy, r !== null && Eo(r, u.deps)) {
        i.memoizedState = ni(t, n, l, r);
        return;
      }
    }
    De.flags |= e, i.memoizedState = ni(1 | t, n, l, r);
  }
  function Yu(e, t) {
    return Zi(8390656, 8, e, t);
  }
  function No(e, t) {
    return Ji(2048, 8, e, t);
  }
  function Xu(e, t) {
    return Ji(4, 2, e, t);
  }
  function Ku(e, t) {
    return Ji(4, 4, e, t);
  }
  function Qu(e, t) {
    if (typeof t == "function") return e = e(), t(e), function() {
      t(null);
    };
    if (t != null) return e = e(), t.current = e, function() {
      t.current = null;
    };
  }
  function Gu(e, t, n) {
    return n = n != null ? n.concat([e]) : null, Ji(4, 4, Qu.bind(null, t, e), n);
  }
  function Do() {
  }
  function qu(e, t) {
    var n = Nt();
    t = t === void 0 ? null : t;
    var r = n.memoizedState;
    return r !== null && t !== null && Eo(t, r[1]) ? r[0] : (n.memoizedState = [e, t], e);
  }
  function Zu(e, t) {
    var n = Nt();
    t = t === void 0 ? null : t;
    var r = n.memoizedState;
    return r !== null && t !== null && Eo(t, r[1]) ? r[0] : (e = e(), n.memoizedState = [e, t], e);
  }
  function Ju(e, t, n) {
    return (Hn & 21) === 0 ? (e.baseState && (e.baseState = !1, yt = !0), e.memoizedState = n) : (Ot(n, t) || (n = Rs(), De.lanes |= n, Bn |= n, e.baseState = !0), t);
  }
  function Bf(e, t) {
    var n = fe;
    fe = n !== 0 && 4 > n ? n : 4, e(!0);
    var r = xo.transition;
    xo.transition = {};
    try {
      e(!1), t();
    } finally {
      fe = n, xo.transition = r;
    }
  }
  function bu() {
    return Nt().memoizedState;
  }
  function Wf(e, t, n) {
    var r = Tn(e);
    if (n = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null }, ea(e)) ta(t, n);
    else if (n = zu(e, t, n, r), n !== null) {
      var i = dt();
      $t(n, e, r, i), na(n, t, r);
    }
  }
  function Yf(e, t, n) {
    var r = Tn(e), i = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null };
    if (ea(e)) ta(t, i);
    else {
      var l = e.alternate;
      if (e.lanes === 0 && (l === null || l.lanes === 0) && (l = t.lastRenderedReducer, l !== null)) try {
        var u = t.lastRenderedState, f = l(u, n);
        if (i.hasEagerState = !0, i.eagerState = f, Ot(f, u)) {
          var d = t.interleaved;
          d === null ? (i.next = i, yo(t)) : (i.next = d.next, d.next = i), t.interleaved = i;
          return;
        }
      } catch {
      } finally {
      }
      n = zu(e, t, i, r), n !== null && (i = dt(), $t(n, e, r, i), na(n, t, r));
    }
  }
  function ea(e) {
    var t = e.alternate;
    return e === De || t !== null && t === De;
  }
  function ta(e, t) {
    br = qi = !0;
    var n = e.pending;
    n === null ? t.next = t : (t.next = n.next, n.next = t), e.pending = t;
  }
  function na(e, t, n) {
    if ((n & 4194240) !== 0) {
      var r = t.lanes;
      r &= e.pendingLanes, n |= r, t.lanes = n, zl(e, n);
    }
  }
  var bi = { readContext: Rt, useCallback: ot, useContext: ot, useEffect: ot, useImperativeHandle: ot, useInsertionEffect: ot, useLayoutEffect: ot, useMemo: ot, useReducer: ot, useRef: ot, useState: ot, useDebugValue: ot, useDeferredValue: ot, useTransition: ot, useMutableSource: ot, useSyncExternalStore: ot, useId: ot, unstable_isNewReconciler: !1 }, Xf = { readContext: Rt, useCallback: function(e, t) {
    return Yt().memoizedState = [e, t === void 0 ? null : t], e;
  }, useContext: Rt, useEffect: Yu, useImperativeHandle: function(e, t, n) {
    return n = n != null ? n.concat([e]) : null, Zi(
      4194308,
      4,
      Qu.bind(null, t, e),
      n
    );
  }, useLayoutEffect: function(e, t) {
    return Zi(4194308, 4, e, t);
  }, useInsertionEffect: function(e, t) {
    return Zi(4, 2, e, t);
  }, useMemo: function(e, t) {
    var n = Yt();
    return t = t === void 0 ? null : t, e = e(), n.memoizedState = [e, t], e;
  }, useReducer: function(e, t, n) {
    var r = Yt();
    return t = n !== void 0 ? n(t) : t, r.memoizedState = r.baseState = t, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: e, lastRenderedState: t }, r.queue = e, e = e.dispatch = Wf.bind(null, De, e), [r.memoizedState, e];
  }, useRef: function(e) {
    var t = Yt();
    return e = { current: e }, t.memoizedState = e;
  }, useState: Bu, useDebugValue: Do, useDeferredValue: function(e) {
    return Yt().memoizedState = e;
  }, useTransition: function() {
    var e = Bu(!1), t = e[0];
    return e = Bf.bind(null, e[1]), Yt().memoizedState = e, [t, e];
  }, useMutableSource: function() {
  }, useSyncExternalStore: function(e, t, n) {
    var r = De, i = Yt();
    if (Pe) {
      if (n === void 0) throw Error(s(407));
      n = n();
    } else {
      if (n = t(), Je === null) throw Error(s(349));
      (Hn & 30) !== 0 || Fu(r, t, n);
    }
    i.memoizedState = n;
    var l = { value: n, getSnapshot: t };
    return i.queue = l, Yu($u.bind(
      null,
      r,
      l,
      e
    ), [e]), r.flags |= 2048, ni(9, Uu.bind(null, r, l, n, t), void 0, null), n;
  }, useId: function() {
    var e = Yt(), t = Je.identifierPrefix;
    if (Pe) {
      var n = bt, r = Jt;
      n = (r & ~(1 << 32 - It(r) - 1)).toString(32) + n, t = ":" + t + "R" + n, n = ei++, 0 < n && (t += "H" + n.toString(32)), t += ":";
    } else n = Hf++, t = ":" + t + "r" + n.toString(32) + ":";
    return e.memoizedState = t;
  }, unstable_isNewReconciler: !1 }, Kf = {
    readContext: Rt,
    useCallback: qu,
    useContext: Rt,
    useEffect: No,
    useImperativeHandle: Gu,
    useInsertionEffect: Xu,
    useLayoutEffect: Ku,
    useMemo: Zu,
    useReducer: To,
    useRef: Wu,
    useState: function() {
      return To(ti);
    },
    useDebugValue: Do,
    useDeferredValue: function(e) {
      var t = Nt();
      return Ju(t, Ye.memoizedState, e);
    },
    useTransition: function() {
      var e = To(ti)[0], t = Nt().memoizedState;
      return [e, t];
    },
    useMutableSource: Au,
    useSyncExternalStore: ju,
    useId: bu,
    unstable_isNewReconciler: !1
  }, Qf = { readContext: Rt, useCallback: qu, useContext: Rt, useEffect: No, useImperativeHandle: Gu, useInsertionEffect: Xu, useLayoutEffect: Ku, useMemo: Zu, useReducer: Ro, useRef: Wu, useState: function() {
    return Ro(ti);
  }, useDebugValue: Do, useDeferredValue: function(e) {
    var t = Nt();
    return Ye === null ? t.memoizedState = e : Ju(t, Ye.memoizedState, e);
  }, useTransition: function() {
    var e = Ro(ti)[0], t = Nt().memoizedState;
    return [e, t];
  }, useMutableSource: Au, useSyncExternalStore: ju, useId: bu, unstable_isNewReconciler: !1 };
  function jt(e, t) {
    if (e && e.defaultProps) {
      t = N({}, t), e = e.defaultProps;
      for (var n in e) t[n] === void 0 && (t[n] = e[n]);
      return t;
    }
    return t;
  }
  function zo(e, t, n, r) {
    t = e.memoizedState, n = n(r, t), n = n == null ? t : N({}, t, n), e.memoizedState = n, e.lanes === 0 && (e.updateQueue.baseState = n);
  }
  var el = { isMounted: function(e) {
    return (e = e._reactInternals) ? Vt(e) === e : !1;
  }, enqueueSetState: function(e, t, n) {
    e = e._reactInternals;
    var r = dt(), i = Tn(e), l = tn(r, i);
    l.payload = t, n != null && (l.callback = n), t = xn(e, l, i), t !== null && ($t(t, e, i, r), Xi(t, e, i));
  }, enqueueReplaceState: function(e, t, n) {
    e = e._reactInternals;
    var r = dt(), i = Tn(e), l = tn(r, i);
    l.tag = 1, l.payload = t, n != null && (l.callback = n), t = xn(e, l, i), t !== null && ($t(t, e, i, r), Xi(t, e, i));
  }, enqueueForceUpdate: function(e, t) {
    e = e._reactInternals;
    var n = dt(), r = Tn(e), i = tn(n, r);
    i.tag = 2, t != null && (i.callback = t), t = xn(e, i, r), t !== null && ($t(t, e, r, n), Xi(t, e, r));
  } };
  function ra(e, t, n, r, i, l, u) {
    return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(r, l, u) : t.prototype && t.prototype.isPureReactComponent ? !Hr(n, r) || !Hr(i, l) : !0;
  }
  function ia(e, t, n) {
    var r = !1, i = _n, l = t.contextType;
    return typeof l == "object" && l !== null ? l = Rt(l) : (i = vt(t) ? jn : lt.current, r = t.contextTypes, l = (r = r != null) ? cr(e, i) : _n), t = new t(n, l), e.memoizedState = t.state !== null && t.state !== void 0 ? t.state : null, t.updater = el, e.stateNode = t, t._reactInternals = e, r && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = i, e.__reactInternalMemoizedMaskedChildContext = l), t;
  }
  function la(e, t, n, r) {
    e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, r), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, r), t.state !== e && el.enqueueReplaceState(t, t.state, null);
  }
  function Lo(e, t, n, r) {
    var i = e.stateNode;
    i.props = n, i.state = e.memoizedState, i.refs = {}, go(e);
    var l = t.contextType;
    typeof l == "object" && l !== null ? i.context = Rt(l) : (l = vt(t) ? jn : lt.current, i.context = cr(e, l)), i.state = e.memoizedState, l = t.getDerivedStateFromProps, typeof l == "function" && (zo(e, t, l, n), i.state = e.memoizedState), typeof t.getDerivedStateFromProps == "function" || typeof i.getSnapshotBeforeUpdate == "function" || typeof i.UNSAFE_componentWillMount != "function" && typeof i.componentWillMount != "function" || (t = i.state, typeof i.componentWillMount == "function" && i.componentWillMount(), typeof i.UNSAFE_componentWillMount == "function" && i.UNSAFE_componentWillMount(), t !== i.state && el.enqueueReplaceState(i, i.state, null), Ki(e, n, i, r), i.state = e.memoizedState), typeof i.componentDidMount == "function" && (e.flags |= 4194308);
  }
  function gr(e, t) {
    try {
      var n = "", r = t;
      do
        n += K(r), r = r.return;
      while (r);
      var i = n;
    } catch (l) {
      i = `
Error generating stack: ` + l.message + `
` + l.stack;
    }
    return { value: e, source: t, stack: i, digest: null };
  }
  function Mo(e, t, n) {
    return { value: e, source: null, stack: n ?? null, digest: t ?? null };
  }
  function Io(e, t) {
    try {
      console.error(t.value);
    } catch (n) {
      setTimeout(function() {
        throw n;
      });
    }
  }
  var Gf = typeof WeakMap == "function" ? WeakMap : Map;
  function oa(e, t, n) {
    n = tn(-1, n), n.tag = 3, n.payload = { element: null };
    var r = t.value;
    return n.callback = function() {
      sl || (sl = !0, Go = r), Io(e, t);
    }, n;
  }
  function sa(e, t, n) {
    n = tn(-1, n), n.tag = 3;
    var r = e.type.getDerivedStateFromError;
    if (typeof r == "function") {
      var i = t.value;
      n.payload = function() {
        return r(i);
      }, n.callback = function() {
        Io(e, t);
      };
    }
    var l = e.stateNode;
    return l !== null && typeof l.componentDidCatch == "function" && (n.callback = function() {
      Io(e, t), typeof r != "function" && (Cn === null ? Cn = /* @__PURE__ */ new Set([this]) : Cn.add(this));
      var u = t.stack;
      this.componentDidCatch(t.value, { componentStack: u !== null ? u : "" });
    }), n;
  }
  function ua(e, t, n) {
    var r = e.pingCache;
    if (r === null) {
      r = e.pingCache = new Gf();
      var i = /* @__PURE__ */ new Set();
      r.set(t, i);
    } else i = r.get(t), i === void 0 && (i = /* @__PURE__ */ new Set(), r.set(t, i));
    i.has(n) || (i.add(n), e = ad.bind(null, e, t, n), t.then(e, e));
  }
  function aa(e) {
    do {
      var t;
      if ((t = e.tag === 13) && (t = e.memoizedState, t = t !== null ? t.dehydrated !== null : !0), t) return e;
      e = e.return;
    } while (e !== null);
    return null;
  }
  function ca(e, t, n, r, i) {
    return (e.mode & 1) === 0 ? (e === t ? e.flags |= 65536 : (e.flags |= 128, n.flags |= 131072, n.flags &= -52805, n.tag === 1 && (n.alternate === null ? n.tag = 17 : (t = tn(-1, 1), t.tag = 2, xn(n, t, 1))), n.lanes |= 1), e) : (e.flags |= 65536, e.lanes = i, e);
  }
  var qf = Ae.ReactCurrentOwner, yt = !1;
  function ft(e, t, n, r) {
    t.child = e === null ? Du(t, null, n, r) : hr(t, e.child, n, r);
  }
  function fa(e, t, n, r, i) {
    n = n.render;
    var l = t.ref;
    return vr(t, i), r = Co(e, t, n, r, l, i), n = Po(), e !== null && !yt ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~i, nn(e, t, i)) : (Pe && n && so(t), t.flags |= 1, ft(e, t, r, i), t.child);
  }
  function da(e, t, n, r, i) {
    if (e === null) {
      var l = n.type;
      return typeof l == "function" && !ns(l) && l.defaultProps === void 0 && n.compare === null && n.defaultProps === void 0 ? (t.tag = 15, t.type = l, pa(e, t, l, r, i)) : (e = pl(n.type, null, r, t, t.mode, i), e.ref = t.ref, e.return = t, t.child = e);
    }
    if (l = e.child, (e.lanes & i) === 0) {
      var u = l.memoizedProps;
      if (n = n.compare, n = n !== null ? n : Hr, n(u, r) && e.ref === t.ref) return nn(e, t, i);
    }
    return t.flags |= 1, e = Nn(l, r), e.ref = t.ref, e.return = t, t.child = e;
  }
  function pa(e, t, n, r, i) {
    if (e !== null) {
      var l = e.memoizedProps;
      if (Hr(l, r) && e.ref === t.ref) if (yt = !1, t.pendingProps = r = l, (e.lanes & i) !== 0) (e.flags & 131072) !== 0 && (yt = !0);
      else return t.lanes = e.lanes, nn(e, t, i);
    }
    return Oo(e, t, n, r, i);
  }
  function ha(e, t, n) {
    var r = t.pendingProps, i = r.children, l = e !== null ? e.memoizedState : null;
    if (r.mode === "hidden") if ((t.mode & 1) === 0) t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, ge(_r, Et), Et |= n;
    else {
      if ((n & 1073741824) === 0) return e = l !== null ? l.baseLanes | n : n, t.lanes = t.childLanes = 1073741824, t.memoizedState = { baseLanes: e, cachePool: null, transitions: null }, t.updateQueue = null, ge(_r, Et), Et |= e, null;
      t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, r = l !== null ? l.baseLanes : n, ge(_r, Et), Et |= r;
    }
    else l !== null ? (r = l.baseLanes | n, t.memoizedState = null) : r = n, ge(_r, Et), Et |= r;
    return ft(e, t, i, n), t.child;
  }
  function ma(e, t) {
    var n = t.ref;
    (e === null && n !== null || e !== null && e.ref !== n) && (t.flags |= 512, t.flags |= 2097152);
  }
  function Oo(e, t, n, r, i) {
    var l = vt(n) ? jn : lt.current;
    return l = cr(t, l), vr(t, i), n = Co(e, t, n, r, l, i), r = Po(), e !== null && !yt ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~i, nn(e, t, i)) : (Pe && r && so(t), t.flags |= 1, ft(e, t, n, i), t.child);
  }
  function va(e, t, n, r, i) {
    if (vt(n)) {
      var l = !0;
      Fi(t);
    } else l = !1;
    if (vr(t, i), t.stateNode === null) nl(e, t), ia(t, n, r), Lo(t, n, r, i), r = !0;
    else if (e === null) {
      var u = t.stateNode, f = t.memoizedProps;
      u.props = f;
      var d = u.context, g = n.contextType;
      typeof g == "object" && g !== null ? g = Rt(g) : (g = vt(n) ? jn : lt.current, g = cr(t, g));
      var S = n.getDerivedStateFromProps, x = typeof S == "function" || typeof u.getSnapshotBeforeUpdate == "function";
      x || typeof u.UNSAFE_componentWillReceiveProps != "function" && typeof u.componentWillReceiveProps != "function" || (f !== r || d !== g) && la(t, u, r, g), kn = !1;
      var _ = t.memoizedState;
      u.state = _, Ki(t, r, u, i), d = t.memoizedState, f !== r || _ !== d || mt.current || kn ? (typeof S == "function" && (zo(t, n, S, r), d = t.memoizedState), (f = kn || ra(t, n, f, r, _, d, g)) ? (x || typeof u.UNSAFE_componentWillMount != "function" && typeof u.componentWillMount != "function" || (typeof u.componentWillMount == "function" && u.componentWillMount(), typeof u.UNSAFE_componentWillMount == "function" && u.UNSAFE_componentWillMount()), typeof u.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof u.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = r, t.memoizedState = d), u.props = r, u.state = d, u.context = g, r = f) : (typeof u.componentDidMount == "function" && (t.flags |= 4194308), r = !1);
    } else {
      u = t.stateNode, Lu(e, t), f = t.memoizedProps, g = t.type === t.elementType ? f : jt(t.type, f), u.props = g, x = t.pendingProps, _ = u.context, d = n.contextType, typeof d == "object" && d !== null ? d = Rt(d) : (d = vt(n) ? jn : lt.current, d = cr(t, d));
      var D = n.getDerivedStateFromProps;
      (S = typeof D == "function" || typeof u.getSnapshotBeforeUpdate == "function") || typeof u.UNSAFE_componentWillReceiveProps != "function" && typeof u.componentWillReceiveProps != "function" || (f !== x || _ !== d) && la(t, u, r, d), kn = !1, _ = t.memoizedState, u.state = _, Ki(t, r, u, i);
      var I = t.memoizedState;
      f !== x || _ !== I || mt.current || kn ? (typeof D == "function" && (zo(t, n, D, r), I = t.memoizedState), (g = kn || ra(t, n, g, r, _, I, d) || !1) ? (S || typeof u.UNSAFE_componentWillUpdate != "function" && typeof u.componentWillUpdate != "function" || (typeof u.componentWillUpdate == "function" && u.componentWillUpdate(r, I, d), typeof u.UNSAFE_componentWillUpdate == "function" && u.UNSAFE_componentWillUpdate(r, I, d)), typeof u.componentDidUpdate == "function" && (t.flags |= 4), typeof u.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof u.componentDidUpdate != "function" || f === e.memoizedProps && _ === e.memoizedState || (t.flags |= 4), typeof u.getSnapshotBeforeUpdate != "function" || f === e.memoizedProps && _ === e.memoizedState || (t.flags |= 1024), t.memoizedProps = r, t.memoizedState = I), u.props = r, u.state = I, u.context = d, r = g) : (typeof u.componentDidUpdate != "function" || f === e.memoizedProps && _ === e.memoizedState || (t.flags |= 4), typeof u.getSnapshotBeforeUpdate != "function" || f === e.memoizedProps && _ === e.memoizedState || (t.flags |= 1024), r = !1);
    }
    return Ao(e, t, n, r, l, i);
  }
  function Ao(e, t, n, r, i, l) {
    ma(e, t);
    var u = (t.flags & 128) !== 0;
    if (!r && !u) return i && Su(t, n, !1), nn(e, t, l);
    r = t.stateNode, qf.current = t;
    var f = u && typeof n.getDerivedStateFromError != "function" ? null : r.render();
    return t.flags |= 1, e !== null && u ? (t.child = hr(t, e.child, null, l), t.child = hr(t, null, f, l)) : ft(e, t, f, l), t.memoizedState = r.state, i && Su(t, n, !0), t.child;
  }
  function ya(e) {
    var t = e.stateNode;
    t.pendingContext ? wu(e, t.pendingContext, t.pendingContext !== t.context) : t.context && wu(e, t.context, !1), wo(e, t.containerInfo);
  }
  function ga(e, t, n, r, i) {
    return pr(), fo(i), t.flags |= 256, ft(e, t, n, r), t.child;
  }
  var jo = { dehydrated: null, treeContext: null, retryLane: 0 };
  function Fo(e) {
    return { baseLanes: e, cachePool: null, transitions: null };
  }
  function wa(e, t, n) {
    var r = t.pendingProps, i = Ne.current, l = !1, u = (t.flags & 128) !== 0, f;
    if ((f = u) || (f = e !== null && e.memoizedState === null ? !1 : (i & 2) !== 0), f ? (l = !0, t.flags &= -129) : (e === null || e.memoizedState !== null) && (i |= 1), ge(Ne, i & 1), e === null)
      return co(t), e = t.memoizedState, e !== null && (e = e.dehydrated, e !== null) ? ((t.mode & 1) === 0 ? t.lanes = 1 : e.data === "$!" ? t.lanes = 8 : t.lanes = 1073741824, null) : (u = r.children, e = r.fallback, l ? (r = t.mode, l = t.child, u = { mode: "hidden", children: u }, (r & 1) === 0 && l !== null ? (l.childLanes = 0, l.pendingProps = u) : l = hl(u, r, 0, null), e = Kn(e, r, n, null), l.return = t, e.return = t, l.sibling = e, t.child = l, t.child.memoizedState = Fo(n), t.memoizedState = jo, e) : Uo(t, u));
    if (i = e.memoizedState, i !== null && (f = i.dehydrated, f !== null)) return Zf(e, t, u, r, f, i, n);
    if (l) {
      l = r.fallback, u = t.mode, i = e.child, f = i.sibling;
      var d = { mode: "hidden", children: r.children };
      return (u & 1) === 0 && t.child !== i ? (r = t.child, r.childLanes = 0, r.pendingProps = d, t.deletions = null) : (r = Nn(i, d), r.subtreeFlags = i.subtreeFlags & 14680064), f !== null ? l = Nn(f, l) : (l = Kn(l, u, n, null), l.flags |= 2), l.return = t, r.return = t, r.sibling = l, t.child = r, r = l, l = t.child, u = e.child.memoizedState, u = u === null ? Fo(n) : { baseLanes: u.baseLanes | n, cachePool: null, transitions: u.transitions }, l.memoizedState = u, l.childLanes = e.childLanes & ~n, t.memoizedState = jo, r;
    }
    return l = e.child, e = l.sibling, r = Nn(l, { mode: "visible", children: r.children }), (t.mode & 1) === 0 && (r.lanes = n), r.return = t, r.sibling = null, e !== null && (n = t.deletions, n === null ? (t.deletions = [e], t.flags |= 16) : n.push(e)), t.child = r, t.memoizedState = null, r;
  }
  function Uo(e, t) {
    return t = hl({ mode: "visible", children: t }, e.mode, 0, null), t.return = e, e.child = t;
  }
  function tl(e, t, n, r) {
    return r !== null && fo(r), hr(t, e.child, null, n), e = Uo(t, t.pendingProps.children), e.flags |= 2, t.memoizedState = null, e;
  }
  function Zf(e, t, n, r, i, l, u) {
    if (n)
      return t.flags & 256 ? (t.flags &= -257, r = Mo(Error(s(422))), tl(e, t, u, r)) : t.memoizedState !== null ? (t.child = e.child, t.flags |= 128, null) : (l = r.fallback, i = t.mode, r = hl({ mode: "visible", children: r.children }, i, 0, null), l = Kn(l, i, u, null), l.flags |= 2, r.return = t, l.return = t, r.sibling = l, t.child = r, (t.mode & 1) !== 0 && hr(t, e.child, null, u), t.child.memoizedState = Fo(u), t.memoizedState = jo, l);
    if ((t.mode & 1) === 0) return tl(e, t, u, null);
    if (i.data === "$!") {
      if (r = i.nextSibling && i.nextSibling.dataset, r) var f = r.dgst;
      return r = f, l = Error(s(419)), r = Mo(l, r, void 0), tl(e, t, u, r);
    }
    if (f = (u & e.childLanes) !== 0, yt || f) {
      if (r = Je, r !== null) {
        switch (u & -u) {
          case 4:
            i = 2;
            break;
          case 16:
            i = 8;
            break;
          case 64:
          case 128:
          case 256:
          case 512:
          case 1024:
          case 2048:
          case 4096:
          case 8192:
          case 16384:
          case 32768:
          case 65536:
          case 131072:
          case 262144:
          case 524288:
          case 1048576:
          case 2097152:
          case 4194304:
          case 8388608:
          case 16777216:
          case 33554432:
          case 67108864:
            i = 32;
            break;
          case 536870912:
            i = 268435456;
            break;
          default:
            i = 0;
        }
        i = (i & (r.suspendedLanes | u)) !== 0 ? 0 : i, i !== 0 && i !== l.retryLane && (l.retryLane = i, en(e, i), $t(r, e, i, -1));
      }
      return ts(), r = Mo(Error(s(421))), tl(e, t, u, r);
    }
    return i.data === "$?" ? (t.flags |= 128, t.child = e.child, t = cd.bind(null, e), i._reactRetry = t, null) : (e = l.treeContext, xt = gn(i.nextSibling), kt = t, Pe = !0, At = null, e !== null && (Pt[Tt++] = Jt, Pt[Tt++] = bt, Pt[Tt++] = Fn, Jt = e.id, bt = e.overflow, Fn = t), t = Uo(t, r.children), t.flags |= 4096, t);
  }
  function _a(e, t, n) {
    e.lanes |= t;
    var r = e.alternate;
    r !== null && (r.lanes |= t), vo(e.return, t, n);
  }
  function $o(e, t, n, r, i) {
    var l = e.memoizedState;
    l === null ? e.memoizedState = { isBackwards: t, rendering: null, renderingStartTime: 0, last: r, tail: n, tailMode: i } : (l.isBackwards = t, l.rendering = null, l.renderingStartTime = 0, l.last = r, l.tail = n, l.tailMode = i);
  }
  function Sa(e, t, n) {
    var r = t.pendingProps, i = r.revealOrder, l = r.tail;
    if (ft(e, t, r.children, n), r = Ne.current, (r & 2) !== 0) r = r & 1 | 2, t.flags |= 128;
    else {
      if (e !== null && (e.flags & 128) !== 0) e: for (e = t.child; e !== null; ) {
        if (e.tag === 13) e.memoizedState !== null && _a(e, n, t);
        else if (e.tag === 19) _a(e, n, t);
        else if (e.child !== null) {
          e.child.return = e, e = e.child;
          continue;
        }
        if (e === t) break e;
        for (; e.sibling === null; ) {
          if (e.return === null || e.return === t) break e;
          e = e.return;
        }
        e.sibling.return = e.return, e = e.sibling;
      }
      r &= 1;
    }
    if (ge(Ne, r), (t.mode & 1) === 0) t.memoizedState = null;
    else switch (i) {
      case "forwards":
        for (n = t.child, i = null; n !== null; ) e = n.alternate, e !== null && Qi(e) === null && (i = n), n = n.sibling;
        n = i, n === null ? (i = t.child, t.child = null) : (i = n.sibling, n.sibling = null), $o(t, !1, i, n, l);
        break;
      case "backwards":
        for (n = null, i = t.child, t.child = null; i !== null; ) {
          if (e = i.alternate, e !== null && Qi(e) === null) {
            t.child = i;
            break;
          }
          e = i.sibling, i.sibling = n, n = i, i = e;
        }
        $o(t, !0, n, null, l);
        break;
      case "together":
        $o(t, !1, null, null, void 0);
        break;
      default:
        t.memoizedState = null;
    }
    return t.child;
  }
  function nl(e, t) {
    (t.mode & 1) === 0 && e !== null && (e.alternate = null, t.alternate = null, t.flags |= 2);
  }
  function nn(e, t, n) {
    if (e !== null && (t.dependencies = e.dependencies), Bn |= t.lanes, (n & t.childLanes) === 0) return null;
    if (e !== null && t.child !== e.child) throw Error(s(153));
    if (t.child !== null) {
      for (e = t.child, n = Nn(e, e.pendingProps), t.child = n, n.return = t; e.sibling !== null; ) e = e.sibling, n = n.sibling = Nn(e, e.pendingProps), n.return = t;
      n.sibling = null;
    }
    return t.child;
  }
  function Jf(e, t, n) {
    switch (t.tag) {
      case 3:
        ya(t), pr();
        break;
      case 5:
        Ou(t);
        break;
      case 1:
        vt(t.type) && Fi(t);
        break;
      case 4:
        wo(t, t.stateNode.containerInfo);
        break;
      case 10:
        var r = t.type._context, i = t.memoizedProps.value;
        ge(Wi, r._currentValue), r._currentValue = i;
        break;
      case 13:
        if (r = t.memoizedState, r !== null)
          return r.dehydrated !== null ? (ge(Ne, Ne.current & 1), t.flags |= 128, null) : (n & t.child.childLanes) !== 0 ? wa(e, t, n) : (ge(Ne, Ne.current & 1), e = nn(e, t, n), e !== null ? e.sibling : null);
        ge(Ne, Ne.current & 1);
        break;
      case 19:
        if (r = (n & t.childLanes) !== 0, (e.flags & 128) !== 0) {
          if (r) return Sa(e, t, n);
          t.flags |= 128;
        }
        if (i = t.memoizedState, i !== null && (i.rendering = null, i.tail = null, i.lastEffect = null), ge(Ne, Ne.current), r) break;
        return null;
      case 22:
      case 23:
        return t.lanes = 0, ha(e, t, n);
    }
    return nn(e, t, n);
  }
  var ka, Vo, xa, Ea;
  ka = function(e, t) {
    for (var n = t.child; n !== null; ) {
      if (n.tag === 5 || n.tag === 6) e.appendChild(n.stateNode);
      else if (n.tag !== 4 && n.child !== null) {
        n.child.return = n, n = n.child;
        continue;
      }
      if (n === t) break;
      for (; n.sibling === null; ) {
        if (n.return === null || n.return === t) return;
        n = n.return;
      }
      n.sibling.return = n.return, n = n.sibling;
    }
  }, Vo = function() {
  }, xa = function(e, t, n, r) {
    var i = e.memoizedProps;
    if (i !== r) {
      e = t.stateNode, Vn(Wt.current);
      var l = null;
      switch (n) {
        case "input":
          i = on(e, i), r = on(e, r), l = [];
          break;
        case "select":
          i = N({}, i, { value: void 0 }), r = N({}, r, { value: void 0 }), l = [];
          break;
        case "textarea":
          i = un(e, i), r = un(e, r), l = [];
          break;
        default:
          typeof i.onClick != "function" && typeof r.onClick == "function" && (e.onclick = Oi);
      }
      Me(n, r);
      var u;
      n = null;
      for (g in i) if (!r.hasOwnProperty(g) && i.hasOwnProperty(g) && i[g] != null) if (g === "style") {
        var f = i[g];
        for (u in f) f.hasOwnProperty(u) && (n || (n = {}), n[u] = "");
      } else g !== "dangerouslySetInnerHTML" && g !== "children" && g !== "suppressContentEditableWarning" && g !== "suppressHydrationWarning" && g !== "autoFocus" && (m.hasOwnProperty(g) ? l || (l = []) : (l = l || []).push(g, null));
      for (g in r) {
        var d = r[g];
        if (f = i != null ? i[g] : void 0, r.hasOwnProperty(g) && d !== f && (d != null || f != null)) if (g === "style") if (f) {
          for (u in f) !f.hasOwnProperty(u) || d && d.hasOwnProperty(u) || (n || (n = {}), n[u] = "");
          for (u in d) d.hasOwnProperty(u) && f[u] !== d[u] && (n || (n = {}), n[u] = d[u]);
        } else n || (l || (l = []), l.push(
          g,
          n
        )), n = d;
        else g === "dangerouslySetInnerHTML" ? (d = d ? d.__html : void 0, f = f ? f.__html : void 0, d != null && f !== d && (l = l || []).push(g, d)) : g === "children" ? typeof d != "string" && typeof d != "number" || (l = l || []).push(g, "" + d) : g !== "suppressContentEditableWarning" && g !== "suppressHydrationWarning" && (m.hasOwnProperty(g) ? (d != null && g === "onScroll" && Se("scroll", e), l || f === d || (l = [])) : (l = l || []).push(g, d));
      }
      n && (l = l || []).push("style", n);
      var g = l;
      (t.updateQueue = g) && (t.flags |= 4);
    }
  }, Ea = function(e, t, n, r) {
    n !== r && (t.flags |= 4);
  };
  function ri(e, t) {
    if (!Pe) switch (e.tailMode) {
      case "hidden":
        t = e.tail;
        for (var n = null; t !== null; ) t.alternate !== null && (n = t), t = t.sibling;
        n === null ? e.tail = null : n.sibling = null;
        break;
      case "collapsed":
        n = e.tail;
        for (var r = null; n !== null; ) n.alternate !== null && (r = n), n = n.sibling;
        r === null ? t || e.tail === null ? e.tail = null : e.tail.sibling = null : r.sibling = null;
    }
  }
  function st(e) {
    var t = e.alternate !== null && e.alternate.child === e.child, n = 0, r = 0;
    if (t) for (var i = e.child; i !== null; ) n |= i.lanes | i.childLanes, r |= i.subtreeFlags & 14680064, r |= i.flags & 14680064, i.return = e, i = i.sibling;
    else for (i = e.child; i !== null; ) n |= i.lanes | i.childLanes, r |= i.subtreeFlags, r |= i.flags, i.return = e, i = i.sibling;
    return e.subtreeFlags |= r, e.childLanes = n, t;
  }
  function bf(e, t, n) {
    var r = t.pendingProps;
    switch (uo(t), t.tag) {
      case 2:
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return st(t), null;
      case 1:
        return vt(t.type) && ji(), st(t), null;
      case 3:
        return r = t.stateNode, yr(), ke(mt), ke(lt), ko(), r.pendingContext && (r.context = r.pendingContext, r.pendingContext = null), (e === null || e.child === null) && (Hi(t) ? t.flags |= 4 : e === null || e.memoizedState.isDehydrated && (t.flags & 256) === 0 || (t.flags |= 1024, At !== null && (Jo(At), At = null))), Vo(e, t), st(t), null;
      case 5:
        _o(t);
        var i = Vn(Jr.current);
        if (n = t.type, e !== null && t.stateNode != null) xa(e, t, n, r, i), e.ref !== t.ref && (t.flags |= 512, t.flags |= 2097152);
        else {
          if (!r) {
            if (t.stateNode === null) throw Error(s(166));
            return st(t), null;
          }
          if (e = Vn(Wt.current), Hi(t)) {
            r = t.stateNode, n = t.type;
            var l = t.memoizedProps;
            switch (r[Bt] = t, r[Kr] = l, e = (t.mode & 1) !== 0, n) {
              case "dialog":
                Se("cancel", r), Se("close", r);
                break;
              case "iframe":
              case "object":
              case "embed":
                Se("load", r);
                break;
              case "video":
              case "audio":
                for (i = 0; i < Wr.length; i++) Se(Wr[i], r);
                break;
              case "source":
                Se("error", r);
                break;
              case "img":
              case "image":
              case "link":
                Se(
                  "error",
                  r
                ), Se("load", r);
                break;
              case "details":
                Se("toggle", r);
                break;
              case "input":
                Pr(r, l), Se("invalid", r);
                break;
              case "select":
                r._wrapperState = { wasMultiple: !!l.multiple }, Se("invalid", r);
                break;
              case "textarea":
                F(r, l), Se("invalid", r);
            }
            Me(n, l), i = null;
            for (var u in l) if (l.hasOwnProperty(u)) {
              var f = l[u];
              u === "children" ? typeof f == "string" ? r.textContent !== f && (l.suppressHydrationWarning !== !0 && Ii(r.textContent, f, e), i = ["children", f]) : typeof f == "number" && r.textContent !== "" + f && (l.suppressHydrationWarning !== !0 && Ii(
                r.textContent,
                f,
                e
              ), i = ["children", "" + f]) : m.hasOwnProperty(u) && f != null && u === "onScroll" && Se("scroll", r);
            }
            switch (n) {
              case "input":
                Ln(r), Qt(r, l, !0);
                break;
              case "textarea":
                Ln(r), G(r);
                break;
              case "select":
              case "option":
                break;
              default:
                typeof l.onClick == "function" && (r.onclick = Oi);
            }
            r = i, t.updateQueue = r, r !== null && (t.flags |= 4);
          } else {
            u = i.nodeType === 9 ? i : i.ownerDocument, e === "http://www.w3.org/1999/xhtml" && (e = q(n)), e === "http://www.w3.org/1999/xhtml" ? n === "script" ? (e = u.createElement("div"), e.innerHTML = "<script><\/script>", e = e.removeChild(e.firstChild)) : typeof r.is == "string" ? e = u.createElement(n, { is: r.is }) : (e = u.createElement(n), n === "select" && (u = e, r.multiple ? u.multiple = !0 : r.size && (u.size = r.size))) : e = u.createElementNS(e, n), e[Bt] = t, e[Kr] = r, ka(e, t, !1, !1), t.stateNode = e;
            e: {
              switch (u = pe(n, r), n) {
                case "dialog":
                  Se("cancel", e), Se("close", e), i = r;
                  break;
                case "iframe":
                case "object":
                case "embed":
                  Se("load", e), i = r;
                  break;
                case "video":
                case "audio":
                  for (i = 0; i < Wr.length; i++) Se(Wr[i], e);
                  i = r;
                  break;
                case "source":
                  Se("error", e), i = r;
                  break;
                case "img":
                case "image":
                case "link":
                  Se(
                    "error",
                    e
                  ), Se("load", e), i = r;
                  break;
                case "details":
                  Se("toggle", e), i = r;
                  break;
                case "input":
                  Pr(e, r), i = on(e, r), Se("invalid", e);
                  break;
                case "option":
                  i = r;
                  break;
                case "select":
                  e._wrapperState = { wasMultiple: !!r.multiple }, i = N({}, r, { value: void 0 }), Se("invalid", e);
                  break;
                case "textarea":
                  F(e, r), i = un(e, r), Se("invalid", e);
                  break;
                default:
                  i = r;
              }
              Me(n, i), f = i;
              for (l in f) if (f.hasOwnProperty(l)) {
                var d = f[l];
                l === "style" ? ce(e, d) : l === "dangerouslySetInnerHTML" ? (d = d ? d.__html : void 0, d != null && ve(e, d)) : l === "children" ? typeof d == "string" ? (n !== "textarea" || d !== "") && _e(e, d) : typeof d == "number" && _e(e, "" + d) : l !== "suppressContentEditableWarning" && l !== "suppressHydrationWarning" && l !== "autoFocus" && (m.hasOwnProperty(l) ? d != null && l === "onScroll" && Se("scroll", e) : d != null && et(e, l, d, u));
              }
              switch (n) {
                case "input":
                  Ln(e), Qt(e, r, !1);
                  break;
                case "textarea":
                  Ln(e), G(e);
                  break;
                case "option":
                  r.value != null && e.setAttribute("value", "" + ee(r.value));
                  break;
                case "select":
                  e.multiple = !!r.multiple, l = r.value, l != null ? sn(e, !!r.multiple, l, !1) : r.defaultValue != null && sn(
                    e,
                    !!r.multiple,
                    r.defaultValue,
                    !0
                  );
                  break;
                default:
                  typeof i.onClick == "function" && (e.onclick = Oi);
              }
              switch (n) {
                case "button":
                case "input":
                case "select":
                case "textarea":
                  r = !!r.autoFocus;
                  break e;
                case "img":
                  r = !0;
                  break e;
                default:
                  r = !1;
              }
            }
            r && (t.flags |= 4);
          }
          t.ref !== null && (t.flags |= 512, t.flags |= 2097152);
        }
        return st(t), null;
      case 6:
        if (e && t.stateNode != null) Ea(e, t, e.memoizedProps, r);
        else {
          if (typeof r != "string" && t.stateNode === null) throw Error(s(166));
          if (n = Vn(Jr.current), Vn(Wt.current), Hi(t)) {
            if (r = t.stateNode, n = t.memoizedProps, r[Bt] = t, (l = r.nodeValue !== n) && (e = kt, e !== null)) switch (e.tag) {
              case 3:
                Ii(r.nodeValue, n, (e.mode & 1) !== 0);
                break;
              case 5:
                e.memoizedProps.suppressHydrationWarning !== !0 && Ii(r.nodeValue, n, (e.mode & 1) !== 0);
            }
            l && (t.flags |= 4);
          } else r = (n.nodeType === 9 ? n : n.ownerDocument).createTextNode(r), r[Bt] = t, t.stateNode = r;
        }
        return st(t), null;
      case 13:
        if (ke(Ne), r = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
          if (Pe && xt !== null && (t.mode & 1) !== 0 && (t.flags & 128) === 0) Tu(), pr(), t.flags |= 98560, l = !1;
          else if (l = Hi(t), r !== null && r.dehydrated !== null) {
            if (e === null) {
              if (!l) throw Error(s(318));
              if (l = t.memoizedState, l = l !== null ? l.dehydrated : null, !l) throw Error(s(317));
              l[Bt] = t;
            } else pr(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
            st(t), l = !1;
          } else At !== null && (Jo(At), At = null), l = !0;
          if (!l) return t.flags & 65536 ? t : null;
        }
        return (t.flags & 128) !== 0 ? (t.lanes = n, t) : (r = r !== null, r !== (e !== null && e.memoizedState !== null) && r && (t.child.flags |= 8192, (t.mode & 1) !== 0 && (e === null || (Ne.current & 1) !== 0 ? Xe === 0 && (Xe = 3) : ts())), t.updateQueue !== null && (t.flags |= 4), st(t), null);
      case 4:
        return yr(), Vo(e, t), e === null && Yr(t.stateNode.containerInfo), st(t), null;
      case 10:
        return mo(t.type._context), st(t), null;
      case 17:
        return vt(t.type) && ji(), st(t), null;
      case 19:
        if (ke(Ne), l = t.memoizedState, l === null) return st(t), null;
        if (r = (t.flags & 128) !== 0, u = l.rendering, u === null) if (r) ri(l, !1);
        else {
          if (Xe !== 0 || e !== null && (e.flags & 128) !== 0) for (e = t.child; e !== null; ) {
            if (u = Qi(e), u !== null) {
              for (t.flags |= 128, ri(l, !1), r = u.updateQueue, r !== null && (t.updateQueue = r, t.flags |= 4), t.subtreeFlags = 0, r = n, n = t.child; n !== null; ) l = n, e = r, l.flags &= 14680066, u = l.alternate, u === null ? (l.childLanes = 0, l.lanes = e, l.child = null, l.subtreeFlags = 0, l.memoizedProps = null, l.memoizedState = null, l.updateQueue = null, l.dependencies = null, l.stateNode = null) : (l.childLanes = u.childLanes, l.lanes = u.lanes, l.child = u.child, l.subtreeFlags = 0, l.deletions = null, l.memoizedProps = u.memoizedProps, l.memoizedState = u.memoizedState, l.updateQueue = u.updateQueue, l.type = u.type, e = u.dependencies, l.dependencies = e === null ? null : { lanes: e.lanes, firstContext: e.firstContext }), n = n.sibling;
              return ge(Ne, Ne.current & 1 | 2), t.child;
            }
            e = e.sibling;
          }
          l.tail !== null && Fe() > Sr && (t.flags |= 128, r = !0, ri(l, !1), t.lanes = 4194304);
        }
        else {
          if (!r) if (e = Qi(u), e !== null) {
            if (t.flags |= 128, r = !0, n = e.updateQueue, n !== null && (t.updateQueue = n, t.flags |= 4), ri(l, !0), l.tail === null && l.tailMode === "hidden" && !u.alternate && !Pe) return st(t), null;
          } else 2 * Fe() - l.renderingStartTime > Sr && n !== 1073741824 && (t.flags |= 128, r = !0, ri(l, !1), t.lanes = 4194304);
          l.isBackwards ? (u.sibling = t.child, t.child = u) : (n = l.last, n !== null ? n.sibling = u : t.child = u, l.last = u);
        }
        return l.tail !== null ? (t = l.tail, l.rendering = t, l.tail = t.sibling, l.renderingStartTime = Fe(), t.sibling = null, n = Ne.current, ge(Ne, r ? n & 1 | 2 : n & 1), t) : (st(t), null);
      case 22:
      case 23:
        return es(), r = t.memoizedState !== null, e !== null && e.memoizedState !== null !== r && (t.flags |= 8192), r && (t.mode & 1) !== 0 ? (Et & 1073741824) !== 0 && (st(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : st(t), null;
      case 24:
        return null;
      case 25:
        return null;
    }
    throw Error(s(156, t.tag));
  }
  function ed(e, t) {
    switch (uo(t), t.tag) {
      case 1:
        return vt(t.type) && ji(), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 3:
        return yr(), ke(mt), ke(lt), ko(), e = t.flags, (e & 65536) !== 0 && (e & 128) === 0 ? (t.flags = e & -65537 | 128, t) : null;
      case 5:
        return _o(t), null;
      case 13:
        if (ke(Ne), e = t.memoizedState, e !== null && e.dehydrated !== null) {
          if (t.alternate === null) throw Error(s(340));
          pr();
        }
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 19:
        return ke(Ne), null;
      case 4:
        return yr(), null;
      case 10:
        return mo(t.type._context), null;
      case 22:
      case 23:
        return es(), null;
      case 24:
        return null;
      default:
        return null;
    }
  }
  var rl = !1, ut = !1, td = typeof WeakSet == "function" ? WeakSet : Set, M = null;
  function wr(e, t) {
    var n = e.ref;
    if (n !== null) if (typeof n == "function") try {
      n(null);
    } catch (r) {
      Ie(e, t, r);
    }
    else n.current = null;
  }
  function Ho(e, t, n) {
    try {
      n();
    } catch (r) {
      Ie(e, t, r);
    }
  }
  var Ca = !1;
  function nd(e, t) {
    if (bl = xi, e = ru(), Yl(e)) {
      if ("selectionStart" in e) var n = { start: e.selectionStart, end: e.selectionEnd };
      else e: {
        n = (n = e.ownerDocument) && n.defaultView || window;
        var r = n.getSelection && n.getSelection();
        if (r && r.rangeCount !== 0) {
          n = r.anchorNode;
          var i = r.anchorOffset, l = r.focusNode;
          r = r.focusOffset;
          try {
            n.nodeType, l.nodeType;
          } catch {
            n = null;
            break e;
          }
          var u = 0, f = -1, d = -1, g = 0, S = 0, x = e, _ = null;
          t: for (; ; ) {
            for (var D; x !== n || i !== 0 && x.nodeType !== 3 || (f = u + i), x !== l || r !== 0 && x.nodeType !== 3 || (d = u + r), x.nodeType === 3 && (u += x.nodeValue.length), (D = x.firstChild) !== null; )
              _ = x, x = D;
            for (; ; ) {
              if (x === e) break t;
              if (_ === n && ++g === i && (f = u), _ === l && ++S === r && (d = u), (D = x.nextSibling) !== null) break;
              x = _, _ = x.parentNode;
            }
            x = D;
          }
          n = f === -1 || d === -1 ? null : { start: f, end: d };
        } else n = null;
      }
      n = n || { start: 0, end: 0 };
    } else n = null;
    for (eo = { focusedElem: e, selectionRange: n }, xi = !1, M = t; M !== null; ) if (t = M, e = t.child, (t.subtreeFlags & 1028) !== 0 && e !== null) e.return = t, M = e;
    else for (; M !== null; ) {
      t = M;
      try {
        var I = t.alternate;
        if ((t.flags & 1024) !== 0) switch (t.tag) {
          case 0:
          case 11:
          case 15:
            break;
          case 1:
            if (I !== null) {
              var O = I.memoizedProps, Ue = I.memoizedState, v = t.stateNode, p = v.getSnapshotBeforeUpdate(t.elementType === t.type ? O : jt(t.type, O), Ue);
              v.__reactInternalSnapshotBeforeUpdate = p;
            }
            break;
          case 3:
            var y = t.stateNode.containerInfo;
            y.nodeType === 1 ? y.textContent = "" : y.nodeType === 9 && y.documentElement && y.removeChild(y.documentElement);
            break;
          case 5:
          case 6:
          case 4:
          case 17:
            break;
          default:
            throw Error(s(163));
        }
      } catch (E) {
        Ie(t, t.return, E);
      }
      if (e = t.sibling, e !== null) {
        e.return = t.return, M = e;
        break;
      }
      M = t.return;
    }
    return I = Ca, Ca = !1, I;
  }
  function ii(e, t, n) {
    var r = t.updateQueue;
    if (r = r !== null ? r.lastEffect : null, r !== null) {
      var i = r = r.next;
      do {
        if ((i.tag & e) === e) {
          var l = i.destroy;
          i.destroy = void 0, l !== void 0 && Ho(t, n, l);
        }
        i = i.next;
      } while (i !== r);
    }
  }
  function il(e, t) {
    if (t = t.updateQueue, t = t !== null ? t.lastEffect : null, t !== null) {
      var n = t = t.next;
      do {
        if ((n.tag & e) === e) {
          var r = n.create;
          n.destroy = r();
        }
        n = n.next;
      } while (n !== t);
    }
  }
  function Bo(e) {
    var t = e.ref;
    if (t !== null) {
      var n = e.stateNode;
      switch (e.tag) {
        case 5:
          e = n;
          break;
        default:
          e = n;
      }
      typeof t == "function" ? t(e) : t.current = e;
    }
  }
  function Pa(e) {
    var t = e.alternate;
    t !== null && (e.alternate = null, Pa(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && (delete t[Bt], delete t[Kr], delete t[io], delete t[Ff], delete t[Uf])), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
  }
  function Ta(e) {
    return e.tag === 5 || e.tag === 3 || e.tag === 4;
  }
  function Ra(e) {
    e: for (; ; ) {
      for (; e.sibling === null; ) {
        if (e.return === null || Ta(e.return)) return null;
        e = e.return;
      }
      for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
        if (e.flags & 2 || e.child === null || e.tag === 4) continue e;
        e.child.return = e, e = e.child;
      }
      if (!(e.flags & 2)) return e.stateNode;
    }
  }
  function Wo(e, t, n) {
    var r = e.tag;
    if (r === 5 || r === 6) e = e.stateNode, t ? n.nodeType === 8 ? n.parentNode.insertBefore(e, t) : n.insertBefore(e, t) : (n.nodeType === 8 ? (t = n.parentNode, t.insertBefore(e, n)) : (t = n, t.appendChild(e)), n = n._reactRootContainer, n != null || t.onclick !== null || (t.onclick = Oi));
    else if (r !== 4 && (e = e.child, e !== null)) for (Wo(e, t, n), e = e.sibling; e !== null; ) Wo(e, t, n), e = e.sibling;
  }
  function Yo(e, t, n) {
    var r = e.tag;
    if (r === 5 || r === 6) e = e.stateNode, t ? n.insertBefore(e, t) : n.appendChild(e);
    else if (r !== 4 && (e = e.child, e !== null)) for (Yo(e, t, n), e = e.sibling; e !== null; ) Yo(e, t, n), e = e.sibling;
  }
  var nt = null, Ft = !1;
  function En(e, t, n) {
    for (n = n.child; n !== null; ) Na(e, t, n), n = n.sibling;
  }
  function Na(e, t, n) {
    if (Ht && typeof Ht.onCommitFiberUnmount == "function") try {
      Ht.onCommitFiberUnmount(yi, n);
    } catch {
    }
    switch (n.tag) {
      case 5:
        ut || wr(n, t);
      case 6:
        var r = nt, i = Ft;
        nt = null, En(e, t, n), nt = r, Ft = i, nt !== null && (Ft ? (e = nt, n = n.stateNode, e.nodeType === 8 ? e.parentNode.removeChild(n) : e.removeChild(n)) : nt.removeChild(n.stateNode));
        break;
      case 18:
        nt !== null && (Ft ? (e = nt, n = n.stateNode, e.nodeType === 8 ? ro(e.parentNode, n) : e.nodeType === 1 && ro(e, n), Ar(e)) : ro(nt, n.stateNode));
        break;
      case 4:
        r = nt, i = Ft, nt = n.stateNode.containerInfo, Ft = !0, En(e, t, n), nt = r, Ft = i;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        if (!ut && (r = n.updateQueue, r !== null && (r = r.lastEffect, r !== null))) {
          i = r = r.next;
          do {
            var l = i, u = l.destroy;
            l = l.tag, u !== void 0 && ((l & 2) !== 0 || (l & 4) !== 0) && Ho(n, t, u), i = i.next;
          } while (i !== r);
        }
        En(e, t, n);
        break;
      case 1:
        if (!ut && (wr(n, t), r = n.stateNode, typeof r.componentWillUnmount == "function")) try {
          r.props = n.memoizedProps, r.state = n.memoizedState, r.componentWillUnmount();
        } catch (f) {
          Ie(n, t, f);
        }
        En(e, t, n);
        break;
      case 21:
        En(e, t, n);
        break;
      case 22:
        n.mode & 1 ? (ut = (r = ut) || n.memoizedState !== null, En(e, t, n), ut = r) : En(e, t, n);
        break;
      default:
        En(e, t, n);
    }
  }
  function Da(e) {
    var t = e.updateQueue;
    if (t !== null) {
      e.updateQueue = null;
      var n = e.stateNode;
      n === null && (n = e.stateNode = new td()), t.forEach(function(r) {
        var i = fd.bind(null, e, r);
        n.has(r) || (n.add(r), r.then(i, i));
      });
    }
  }
  function Ut(e, t) {
    var n = t.deletions;
    if (n !== null) for (var r = 0; r < n.length; r++) {
      var i = n[r];
      try {
        var l = e, u = t, f = u;
        e: for (; f !== null; ) {
          switch (f.tag) {
            case 5:
              nt = f.stateNode, Ft = !1;
              break e;
            case 3:
              nt = f.stateNode.containerInfo, Ft = !0;
              break e;
            case 4:
              nt = f.stateNode.containerInfo, Ft = !0;
              break e;
          }
          f = f.return;
        }
        if (nt === null) throw Error(s(160));
        Na(l, u, i), nt = null, Ft = !1;
        var d = i.alternate;
        d !== null && (d.return = null), i.return = null;
      } catch (g) {
        Ie(i, t, g);
      }
    }
    if (t.subtreeFlags & 12854) for (t = t.child; t !== null; ) za(t, e), t = t.sibling;
  }
  function za(e, t) {
    var n = e.alternate, r = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        if (Ut(t, e), Xt(e), r & 4) {
          try {
            ii(3, e, e.return), il(3, e);
          } catch (O) {
            Ie(e, e.return, O);
          }
          try {
            ii(5, e, e.return);
          } catch (O) {
            Ie(e, e.return, O);
          }
        }
        break;
      case 1:
        Ut(t, e), Xt(e), r & 512 && n !== null && wr(n, n.return);
        break;
      case 5:
        if (Ut(t, e), Xt(e), r & 512 && n !== null && wr(n, n.return), e.flags & 32) {
          var i = e.stateNode;
          try {
            _e(i, "");
          } catch (O) {
            Ie(e, e.return, O);
          }
        }
        if (r & 4 && (i = e.stateNode, i != null)) {
          var l = e.memoizedProps, u = n !== null ? n.memoizedProps : l, f = e.type, d = e.updateQueue;
          if (e.updateQueue = null, d !== null) try {
            f === "input" && l.type === "radio" && l.name != null && Tr(i, l), pe(f, u);
            var g = pe(f, l);
            for (u = 0; u < d.length; u += 2) {
              var S = d[u], x = d[u + 1];
              S === "style" ? ce(i, x) : S === "dangerouslySetInnerHTML" ? ve(i, x) : S === "children" ? _e(i, x) : et(i, S, x, g);
            }
            switch (f) {
              case "input":
                Rr(i, l);
                break;
              case "textarea":
                b(i, l);
                break;
              case "select":
                var _ = i._wrapperState.wasMultiple;
                i._wrapperState.wasMultiple = !!l.multiple;
                var D = l.value;
                D != null ? sn(i, !!l.multiple, D, !1) : _ !== !!l.multiple && (l.defaultValue != null ? sn(
                  i,
                  !!l.multiple,
                  l.defaultValue,
                  !0
                ) : sn(i, !!l.multiple, l.multiple ? [] : "", !1));
            }
            i[Kr] = l;
          } catch (O) {
            Ie(e, e.return, O);
          }
        }
        break;
      case 6:
        if (Ut(t, e), Xt(e), r & 4) {
          if (e.stateNode === null) throw Error(s(162));
          i = e.stateNode, l = e.memoizedProps;
          try {
            i.nodeValue = l;
          } catch (O) {
            Ie(e, e.return, O);
          }
        }
        break;
      case 3:
        if (Ut(t, e), Xt(e), r & 4 && n !== null && n.memoizedState.isDehydrated) try {
          Ar(t.containerInfo);
        } catch (O) {
          Ie(e, e.return, O);
        }
        break;
      case 4:
        Ut(t, e), Xt(e);
        break;
      case 13:
        Ut(t, e), Xt(e), i = e.child, i.flags & 8192 && (l = i.memoizedState !== null, i.stateNode.isHidden = l, !l || i.alternate !== null && i.alternate.memoizedState !== null || (Qo = Fe())), r & 4 && Da(e);
        break;
      case 22:
        if (S = n !== null && n.memoizedState !== null, e.mode & 1 ? (ut = (g = ut) || S, Ut(t, e), ut = g) : Ut(t, e), Xt(e), r & 8192) {
          if (g = e.memoizedState !== null, (e.stateNode.isHidden = g) && !S && (e.mode & 1) !== 0) for (M = e, S = e.child; S !== null; ) {
            for (x = M = S; M !== null; ) {
              switch (_ = M, D = _.child, _.tag) {
                case 0:
                case 11:
                case 14:
                case 15:
                  ii(4, _, _.return);
                  break;
                case 1:
                  wr(_, _.return);
                  var I = _.stateNode;
                  if (typeof I.componentWillUnmount == "function") {
                    r = _, n = _.return;
                    try {
                      t = r, I.props = t.memoizedProps, I.state = t.memoizedState, I.componentWillUnmount();
                    } catch (O) {
                      Ie(r, n, O);
                    }
                  }
                  break;
                case 5:
                  wr(_, _.return);
                  break;
                case 22:
                  if (_.memoizedState !== null) {
                    Ia(x);
                    continue;
                  }
              }
              D !== null ? (D.return = _, M = D) : Ia(x);
            }
            S = S.sibling;
          }
          e: for (S = null, x = e; ; ) {
            if (x.tag === 5) {
              if (S === null) {
                S = x;
                try {
                  i = x.stateNode, g ? (l = i.style, typeof l.setProperty == "function" ? l.setProperty("display", "none", "important") : l.display = "none") : (f = x.stateNode, d = x.memoizedProps.style, u = d != null && d.hasOwnProperty("display") ? d.display : null, f.style.display = Ce("display", u));
                } catch (O) {
                  Ie(e, e.return, O);
                }
              }
            } else if (x.tag === 6) {
              if (S === null) try {
                x.stateNode.nodeValue = g ? "" : x.memoizedProps;
              } catch (O) {
                Ie(e, e.return, O);
              }
            } else if ((x.tag !== 22 && x.tag !== 23 || x.memoizedState === null || x === e) && x.child !== null) {
              x.child.return = x, x = x.child;
              continue;
            }
            if (x === e) break e;
            for (; x.sibling === null; ) {
              if (x.return === null || x.return === e) break e;
              S === x && (S = null), x = x.return;
            }
            S === x && (S = null), x.sibling.return = x.return, x = x.sibling;
          }
        }
        break;
      case 19:
        Ut(t, e), Xt(e), r & 4 && Da(e);
        break;
      case 21:
        break;
      default:
        Ut(
          t,
          e
        ), Xt(e);
    }
  }
  function Xt(e) {
    var t = e.flags;
    if (t & 2) {
      try {
        e: {
          for (var n = e.return; n !== null; ) {
            if (Ta(n)) {
              var r = n;
              break e;
            }
            n = n.return;
          }
          throw Error(s(160));
        }
        switch (r.tag) {
          case 5:
            var i = r.stateNode;
            r.flags & 32 && (_e(i, ""), r.flags &= -33);
            var l = Ra(e);
            Yo(e, l, i);
            break;
          case 3:
          case 4:
            var u = r.stateNode.containerInfo, f = Ra(e);
            Wo(e, f, u);
            break;
          default:
            throw Error(s(161));
        }
      } catch (d) {
        Ie(e, e.return, d);
      }
      e.flags &= -3;
    }
    t & 4096 && (e.flags &= -4097);
  }
  function rd(e, t, n) {
    M = e, La(e);
  }
  function La(e, t, n) {
    for (var r = (e.mode & 1) !== 0; M !== null; ) {
      var i = M, l = i.child;
      if (i.tag === 22 && r) {
        var u = i.memoizedState !== null || rl;
        if (!u) {
          var f = i.alternate, d = f !== null && f.memoizedState !== null || ut;
          f = rl;
          var g = ut;
          if (rl = u, (ut = d) && !g) for (M = i; M !== null; ) u = M, d = u.child, u.tag === 22 && u.memoizedState !== null ? Oa(i) : d !== null ? (d.return = u, M = d) : Oa(i);
          for (; l !== null; ) M = l, La(l), l = l.sibling;
          M = i, rl = f, ut = g;
        }
        Ma(e);
      } else (i.subtreeFlags & 8772) !== 0 && l !== null ? (l.return = i, M = l) : Ma(e);
    }
  }
  function Ma(e) {
    for (; M !== null; ) {
      var t = M;
      if ((t.flags & 8772) !== 0) {
        var n = t.alternate;
        try {
          if ((t.flags & 8772) !== 0) switch (t.tag) {
            case 0:
            case 11:
            case 15:
              ut || il(5, t);
              break;
            case 1:
              var r = t.stateNode;
              if (t.flags & 4 && !ut) if (n === null) r.componentDidMount();
              else {
                var i = t.elementType === t.type ? n.memoizedProps : jt(t.type, n.memoizedProps);
                r.componentDidUpdate(i, n.memoizedState, r.__reactInternalSnapshotBeforeUpdate);
              }
              var l = t.updateQueue;
              l !== null && Iu(t, l, r);
              break;
            case 3:
              var u = t.updateQueue;
              if (u !== null) {
                if (n = null, t.child !== null) switch (t.child.tag) {
                  case 5:
                    n = t.child.stateNode;
                    break;
                  case 1:
                    n = t.child.stateNode;
                }
                Iu(t, u, n);
              }
              break;
            case 5:
              var f = t.stateNode;
              if (n === null && t.flags & 4) {
                n = f;
                var d = t.memoizedProps;
                switch (t.type) {
                  case "button":
                  case "input":
                  case "select":
                  case "textarea":
                    d.autoFocus && n.focus();
                    break;
                  case "img":
                    d.src && (n.src = d.src);
                }
              }
              break;
            case 6:
              break;
            case 4:
              break;
            case 12:
              break;
            case 13:
              if (t.memoizedState === null) {
                var g = t.alternate;
                if (g !== null) {
                  var S = g.memoizedState;
                  if (S !== null) {
                    var x = S.dehydrated;
                    x !== null && Ar(x);
                  }
                }
              }
              break;
            case 19:
            case 17:
            case 21:
            case 22:
            case 23:
            case 25:
              break;
            default:
              throw Error(s(163));
          }
          ut || t.flags & 512 && Bo(t);
        } catch (_) {
          Ie(t, t.return, _);
        }
      }
      if (t === e) {
        M = null;
        break;
      }
      if (n = t.sibling, n !== null) {
        n.return = t.return, M = n;
        break;
      }
      M = t.return;
    }
  }
  function Ia(e) {
    for (; M !== null; ) {
      var t = M;
      if (t === e) {
        M = null;
        break;
      }
      var n = t.sibling;
      if (n !== null) {
        n.return = t.return, M = n;
        break;
      }
      M = t.return;
    }
  }
  function Oa(e) {
    for (; M !== null; ) {
      var t = M;
      try {
        switch (t.tag) {
          case 0:
          case 11:
          case 15:
            var n = t.return;
            try {
              il(4, t);
            } catch (d) {
              Ie(t, n, d);
            }
            break;
          case 1:
            var r = t.stateNode;
            if (typeof r.componentDidMount == "function") {
              var i = t.return;
              try {
                r.componentDidMount();
              } catch (d) {
                Ie(t, i, d);
              }
            }
            var l = t.return;
            try {
              Bo(t);
            } catch (d) {
              Ie(t, l, d);
            }
            break;
          case 5:
            var u = t.return;
            try {
              Bo(t);
            } catch (d) {
              Ie(t, u, d);
            }
        }
      } catch (d) {
        Ie(t, t.return, d);
      }
      if (t === e) {
        M = null;
        break;
      }
      var f = t.sibling;
      if (f !== null) {
        f.return = t.return, M = f;
        break;
      }
      M = t.return;
    }
  }
  var id = Math.ceil, ll = Ae.ReactCurrentDispatcher, Xo = Ae.ReactCurrentOwner, Dt = Ae.ReactCurrentBatchConfig, ie = 0, Je = null, He = null, rt = 0, Et = 0, _r = wn(0), Xe = 0, li = null, Bn = 0, ol = 0, Ko = 0, oi = null, gt = null, Qo = 0, Sr = 1 / 0, rn = null, sl = !1, Go = null, Cn = null, ul = !1, Pn = null, al = 0, si = 0, qo = null, cl = -1, fl = 0;
  function dt() {
    return (ie & 6) !== 0 ? Fe() : cl !== -1 ? cl : cl = Fe();
  }
  function Tn(e) {
    return (e.mode & 1) === 0 ? 1 : (ie & 2) !== 0 && rt !== 0 ? rt & -rt : Vf.transition !== null ? (fl === 0 && (fl = Rs()), fl) : (e = fe, e !== 0 || (e = window.event, e = e === void 0 ? 16 : js(e.type)), e);
  }
  function $t(e, t, n, r) {
    if (50 < si) throw si = 0, qo = null, Error(s(185));
    zr(e, n, r), ((ie & 2) === 0 || e !== Je) && (e === Je && ((ie & 2) === 0 && (ol |= n), Xe === 4 && Rn(e, rt)), wt(e, r), n === 1 && ie === 0 && (t.mode & 1) === 0 && (Sr = Fe() + 500, Ui && Sn()));
  }
  function wt(e, t) {
    var n = e.callbackNode;
    $c(e, t);
    var r = _i(e, e === Je ? rt : 0);
    if (r === 0) n !== null && Cs(n), e.callbackNode = null, e.callbackPriority = 0;
    else if (t = r & -r, e.callbackPriority !== t) {
      if (n != null && Cs(n), t === 1) e.tag === 0 ? $f(ja.bind(null, e)) : ku(ja.bind(null, e)), Af(function() {
        (ie & 6) === 0 && Sn();
      }), n = null;
      else {
        switch (Ns(r)) {
          case 1:
            n = Rl;
            break;
          case 4:
            n = Ps;
            break;
          case 16:
            n = vi;
            break;
          case 536870912:
            n = Ts;
            break;
          default:
            n = vi;
        }
        n = Ya(n, Aa.bind(null, e));
      }
      e.callbackPriority = t, e.callbackNode = n;
    }
  }
  function Aa(e, t) {
    if (cl = -1, fl = 0, (ie & 6) !== 0) throw Error(s(327));
    var n = e.callbackNode;
    if (kr() && e.callbackNode !== n) return null;
    var r = _i(e, e === Je ? rt : 0);
    if (r === 0) return null;
    if ((r & 30) !== 0 || (r & e.expiredLanes) !== 0 || t) t = dl(e, r);
    else {
      t = r;
      var i = ie;
      ie |= 2;
      var l = Ua();
      (Je !== e || rt !== t) && (rn = null, Sr = Fe() + 500, Yn(e, t));
      do
        try {
          sd();
          break;
        } catch (f) {
          Fa(e, f);
        }
      while (!0);
      ho(), ll.current = l, ie = i, He !== null ? t = 0 : (Je = null, rt = 0, t = Xe);
    }
    if (t !== 0) {
      if (t === 2 && (i = Nl(e), i !== 0 && (r = i, t = Zo(e, i))), t === 1) throw n = li, Yn(e, 0), Rn(e, r), wt(e, Fe()), n;
      if (t === 6) Rn(e, r);
      else {
        if (i = e.current.alternate, (r & 30) === 0 && !ld(i) && (t = dl(e, r), t === 2 && (l = Nl(e), l !== 0 && (r = l, t = Zo(e, l))), t === 1)) throw n = li, Yn(e, 0), Rn(e, r), wt(e, Fe()), n;
        switch (e.finishedWork = i, e.finishedLanes = r, t) {
          case 0:
          case 1:
            throw Error(s(345));
          case 2:
            Xn(e, gt, rn);
            break;
          case 3:
            if (Rn(e, r), (r & 130023424) === r && (t = Qo + 500 - Fe(), 10 < t)) {
              if (_i(e, 0) !== 0) break;
              if (i = e.suspendedLanes, (i & r) !== r) {
                dt(), e.pingedLanes |= e.suspendedLanes & i;
                break;
              }
              e.timeoutHandle = no(Xn.bind(null, e, gt, rn), t);
              break;
            }
            Xn(e, gt, rn);
            break;
          case 4:
            if (Rn(e, r), (r & 4194240) === r) break;
            for (t = e.eventTimes, i = -1; 0 < r; ) {
              var u = 31 - It(r);
              l = 1 << u, u = t[u], u > i && (i = u), r &= ~l;
            }
            if (r = i, r = Fe() - r, r = (120 > r ? 120 : 480 > r ? 480 : 1080 > r ? 1080 : 1920 > r ? 1920 : 3e3 > r ? 3e3 : 4320 > r ? 4320 : 1960 * id(r / 1960)) - r, 10 < r) {
              e.timeoutHandle = no(Xn.bind(null, e, gt, rn), r);
              break;
            }
            Xn(e, gt, rn);
            break;
          case 5:
            Xn(e, gt, rn);
            break;
          default:
            throw Error(s(329));
        }
      }
    }
    return wt(e, Fe()), e.callbackNode === n ? Aa.bind(null, e) : null;
  }
  function Zo(e, t) {
    var n = oi;
    return e.current.memoizedState.isDehydrated && (Yn(e, t).flags |= 256), e = dl(e, t), e !== 2 && (t = gt, gt = n, t !== null && Jo(t)), e;
  }
  function Jo(e) {
    gt === null ? gt = e : gt.push.apply(gt, e);
  }
  function ld(e) {
    for (var t = e; ; ) {
      if (t.flags & 16384) {
        var n = t.updateQueue;
        if (n !== null && (n = n.stores, n !== null)) for (var r = 0; r < n.length; r++) {
          var i = n[r], l = i.getSnapshot;
          i = i.value;
          try {
            if (!Ot(l(), i)) return !1;
          } catch {
            return !1;
          }
        }
      }
      if (n = t.child, t.subtreeFlags & 16384 && n !== null) n.return = t, t = n;
      else {
        if (t === e) break;
        for (; t.sibling === null; ) {
          if (t.return === null || t.return === e) return !0;
          t = t.return;
        }
        t.sibling.return = t.return, t = t.sibling;
      }
    }
    return !0;
  }
  function Rn(e, t) {
    for (t &= ~Ko, t &= ~ol, e.suspendedLanes |= t, e.pingedLanes &= ~t, e = e.expirationTimes; 0 < t; ) {
      var n = 31 - It(t), r = 1 << n;
      e[n] = -1, t &= ~r;
    }
  }
  function ja(e) {
    if ((ie & 6) !== 0) throw Error(s(327));
    kr();
    var t = _i(e, 0);
    if ((t & 1) === 0) return wt(e, Fe()), null;
    var n = dl(e, t);
    if (e.tag !== 0 && n === 2) {
      var r = Nl(e);
      r !== 0 && (t = r, n = Zo(e, r));
    }
    if (n === 1) throw n = li, Yn(e, 0), Rn(e, t), wt(e, Fe()), n;
    if (n === 6) throw Error(s(345));
    return e.finishedWork = e.current.alternate, e.finishedLanes = t, Xn(e, gt, rn), wt(e, Fe()), null;
  }
  function bo(e, t) {
    var n = ie;
    ie |= 1;
    try {
      return e(t);
    } finally {
      ie = n, ie === 0 && (Sr = Fe() + 500, Ui && Sn());
    }
  }
  function Wn(e) {
    Pn !== null && Pn.tag === 0 && (ie & 6) === 0 && kr();
    var t = ie;
    ie |= 1;
    var n = Dt.transition, r = fe;
    try {
      if (Dt.transition = null, fe = 1, e) return e();
    } finally {
      fe = r, Dt.transition = n, ie = t, (ie & 6) === 0 && Sn();
    }
  }
  function es() {
    Et = _r.current, ke(_r);
  }
  function Yn(e, t) {
    e.finishedWork = null, e.finishedLanes = 0;
    var n = e.timeoutHandle;
    if (n !== -1 && (e.timeoutHandle = -1, Of(n)), He !== null) for (n = He.return; n !== null; ) {
      var r = n;
      switch (uo(r), r.tag) {
        case 1:
          r = r.type.childContextTypes, r != null && ji();
          break;
        case 3:
          yr(), ke(mt), ke(lt), ko();
          break;
        case 5:
          _o(r);
          break;
        case 4:
          yr();
          break;
        case 13:
          ke(Ne);
          break;
        case 19:
          ke(Ne);
          break;
        case 10:
          mo(r.type._context);
          break;
        case 22:
        case 23:
          es();
      }
      n = n.return;
    }
    if (Je = e, He = e = Nn(e.current, null), rt = Et = t, Xe = 0, li = null, Ko = ol = Bn = 0, gt = oi = null, $n !== null) {
      for (t = 0; t < $n.length; t++) if (n = $n[t], r = n.interleaved, r !== null) {
        n.interleaved = null;
        var i = r.next, l = n.pending;
        if (l !== null) {
          var u = l.next;
          l.next = i, r.next = u;
        }
        n.pending = r;
      }
      $n = null;
    }
    return e;
  }
  function Fa(e, t) {
    do {
      var n = He;
      try {
        if (ho(), Gi.current = bi, qi) {
          for (var r = De.memoizedState; r !== null; ) {
            var i = r.queue;
            i !== null && (i.pending = null), r = r.next;
          }
          qi = !1;
        }
        if (Hn = 0, Ze = Ye = De = null, br = !1, ei = 0, Xo.current = null, n === null || n.return === null) {
          Xe = 1, li = t, He = null;
          break;
        }
        e: {
          var l = e, u = n.return, f = n, d = t;
          if (t = rt, f.flags |= 32768, d !== null && typeof d == "object" && typeof d.then == "function") {
            var g = d, S = f, x = S.tag;
            if ((S.mode & 1) === 0 && (x === 0 || x === 11 || x === 15)) {
              var _ = S.alternate;
              _ ? (S.updateQueue = _.updateQueue, S.memoizedState = _.memoizedState, S.lanes = _.lanes) : (S.updateQueue = null, S.memoizedState = null);
            }
            var D = aa(u);
            if (D !== null) {
              D.flags &= -257, ca(D, u, f, l, t), D.mode & 1 && ua(l, g, t), t = D, d = g;
              var I = t.updateQueue;
              if (I === null) {
                var O = /* @__PURE__ */ new Set();
                O.add(d), t.updateQueue = O;
              } else I.add(d);
              break e;
            } else {
              if ((t & 1) === 0) {
                ua(l, g, t), ts();
                break e;
              }
              d = Error(s(426));
            }
          } else if (Pe && f.mode & 1) {
            var Ue = aa(u);
            if (Ue !== null) {
              (Ue.flags & 65536) === 0 && (Ue.flags |= 256), ca(Ue, u, f, l, t), fo(gr(d, f));
              break e;
            }
          }
          l = d = gr(d, f), Xe !== 4 && (Xe = 2), oi === null ? oi = [l] : oi.push(l), l = u;
          do {
            switch (l.tag) {
              case 3:
                l.flags |= 65536, t &= -t, l.lanes |= t;
                var v = oa(l, d, t);
                Mu(l, v);
                break e;
              case 1:
                f = d;
                var p = l.type, y = l.stateNode;
                if ((l.flags & 128) === 0 && (typeof p.getDerivedStateFromError == "function" || y !== null && typeof y.componentDidCatch == "function" && (Cn === null || !Cn.has(y)))) {
                  l.flags |= 65536, t &= -t, l.lanes |= t;
                  var E = sa(l, f, t);
                  Mu(l, E);
                  break e;
                }
            }
            l = l.return;
          } while (l !== null);
        }
        Va(n);
      } catch (A) {
        t = A, He === n && n !== null && (He = n = n.return);
        continue;
      }
      break;
    } while (!0);
  }
  function Ua() {
    var e = ll.current;
    return ll.current = bi, e === null ? bi : e;
  }
  function ts() {
    (Xe === 0 || Xe === 3 || Xe === 2) && (Xe = 4), Je === null || (Bn & 268435455) === 0 && (ol & 268435455) === 0 || Rn(Je, rt);
  }
  function dl(e, t) {
    var n = ie;
    ie |= 2;
    var r = Ua();
    (Je !== e || rt !== t) && (rn = null, Yn(e, t));
    do
      try {
        od();
        break;
      } catch (i) {
        Fa(e, i);
      }
    while (!0);
    if (ho(), ie = n, ll.current = r, He !== null) throw Error(s(261));
    return Je = null, rt = 0, Xe;
  }
  function od() {
    for (; He !== null; ) $a(He);
  }
  function sd() {
    for (; He !== null && !zc(); ) $a(He);
  }
  function $a(e) {
    var t = Wa(e.alternate, e, Et);
    e.memoizedProps = e.pendingProps, t === null ? Va(e) : He = t, Xo.current = null;
  }
  function Va(e) {
    var t = e;
    do {
      var n = t.alternate;
      if (e = t.return, (t.flags & 32768) === 0) {
        if (n = bf(n, t, Et), n !== null) {
          He = n;
          return;
        }
      } else {
        if (n = ed(n, t), n !== null) {
          n.flags &= 32767, He = n;
          return;
        }
        if (e !== null) e.flags |= 32768, e.subtreeFlags = 0, e.deletions = null;
        else {
          Xe = 6, He = null;
          return;
        }
      }
      if (t = t.sibling, t !== null) {
        He = t;
        return;
      }
      He = t = e;
    } while (t !== null);
    Xe === 0 && (Xe = 5);
  }
  function Xn(e, t, n) {
    var r = fe, i = Dt.transition;
    try {
      Dt.transition = null, fe = 1, ud(e, t, n, r);
    } finally {
      Dt.transition = i, fe = r;
    }
    return null;
  }
  function ud(e, t, n, r) {
    do
      kr();
    while (Pn !== null);
    if ((ie & 6) !== 0) throw Error(s(327));
    n = e.finishedWork;
    var i = e.finishedLanes;
    if (n === null) return null;
    if (e.finishedWork = null, e.finishedLanes = 0, n === e.current) throw Error(s(177));
    e.callbackNode = null, e.callbackPriority = 0;
    var l = n.lanes | n.childLanes;
    if (Vc(e, l), e === Je && (He = Je = null, rt = 0), (n.subtreeFlags & 2064) === 0 && (n.flags & 2064) === 0 || ul || (ul = !0, Ya(vi, function() {
      return kr(), null;
    })), l = (n.flags & 15990) !== 0, (n.subtreeFlags & 15990) !== 0 || l) {
      l = Dt.transition, Dt.transition = null;
      var u = fe;
      fe = 1;
      var f = ie;
      ie |= 4, Xo.current = null, nd(e, n), za(n, e), Rf(eo), xi = !!bl, eo = bl = null, e.current = n, rd(n), Lc(), ie = f, fe = u, Dt.transition = l;
    } else e.current = n;
    if (ul && (ul = !1, Pn = e, al = i), l = e.pendingLanes, l === 0 && (Cn = null), Oc(n.stateNode), wt(e, Fe()), t !== null) for (r = e.onRecoverableError, n = 0; n < t.length; n++) i = t[n], r(i.value, { componentStack: i.stack, digest: i.digest });
    if (sl) throw sl = !1, e = Go, Go = null, e;
    return (al & 1) !== 0 && e.tag !== 0 && kr(), l = e.pendingLanes, (l & 1) !== 0 ? e === qo ? si++ : (si = 0, qo = e) : si = 0, Sn(), null;
  }
  function kr() {
    if (Pn !== null) {
      var e = Ns(al), t = Dt.transition, n = fe;
      try {
        if (Dt.transition = null, fe = 16 > e ? 16 : e, Pn === null) var r = !1;
        else {
          if (e = Pn, Pn = null, al = 0, (ie & 6) !== 0) throw Error(s(331));
          var i = ie;
          for (ie |= 4, M = e.current; M !== null; ) {
            var l = M, u = l.child;
            if ((M.flags & 16) !== 0) {
              var f = l.deletions;
              if (f !== null) {
                for (var d = 0; d < f.length; d++) {
                  var g = f[d];
                  for (M = g; M !== null; ) {
                    var S = M;
                    switch (S.tag) {
                      case 0:
                      case 11:
                      case 15:
                        ii(8, S, l);
                    }
                    var x = S.child;
                    if (x !== null) x.return = S, M = x;
                    else for (; M !== null; ) {
                      S = M;
                      var _ = S.sibling, D = S.return;
                      if (Pa(S), S === g) {
                        M = null;
                        break;
                      }
                      if (_ !== null) {
                        _.return = D, M = _;
                        break;
                      }
                      M = D;
                    }
                  }
                }
                var I = l.alternate;
                if (I !== null) {
                  var O = I.child;
                  if (O !== null) {
                    I.child = null;
                    do {
                      var Ue = O.sibling;
                      O.sibling = null, O = Ue;
                    } while (O !== null);
                  }
                }
                M = l;
              }
            }
            if ((l.subtreeFlags & 2064) !== 0 && u !== null) u.return = l, M = u;
            else e: for (; M !== null; ) {
              if (l = M, (l.flags & 2048) !== 0) switch (l.tag) {
                case 0:
                case 11:
                case 15:
                  ii(9, l, l.return);
              }
              var v = l.sibling;
              if (v !== null) {
                v.return = l.return, M = v;
                break e;
              }
              M = l.return;
            }
          }
          var p = e.current;
          for (M = p; M !== null; ) {
            u = M;
            var y = u.child;
            if ((u.subtreeFlags & 2064) !== 0 && y !== null) y.return = u, M = y;
            else e: for (u = p; M !== null; ) {
              if (f = M, (f.flags & 2048) !== 0) try {
                switch (f.tag) {
                  case 0:
                  case 11:
                  case 15:
                    il(9, f);
                }
              } catch (A) {
                Ie(f, f.return, A);
              }
              if (f === u) {
                M = null;
                break e;
              }
              var E = f.sibling;
              if (E !== null) {
                E.return = f.return, M = E;
                break e;
              }
              M = f.return;
            }
          }
          if (ie = i, Sn(), Ht && typeof Ht.onPostCommitFiberRoot == "function") try {
            Ht.onPostCommitFiberRoot(yi, e);
          } catch {
          }
          r = !0;
        }
        return r;
      } finally {
        fe = n, Dt.transition = t;
      }
    }
    return !1;
  }
  function Ha(e, t, n) {
    t = gr(n, t), t = oa(e, t, 1), e = xn(e, t, 1), t = dt(), e !== null && (zr(e, 1, t), wt(e, t));
  }
  function Ie(e, t, n) {
    if (e.tag === 3) Ha(e, e, n);
    else for (; t !== null; ) {
      if (t.tag === 3) {
        Ha(t, e, n);
        break;
      } else if (t.tag === 1) {
        var r = t.stateNode;
        if (typeof t.type.getDerivedStateFromError == "function" || typeof r.componentDidCatch == "function" && (Cn === null || !Cn.has(r))) {
          e = gr(n, e), e = sa(t, e, 1), t = xn(t, e, 1), e = dt(), t !== null && (zr(t, 1, e), wt(t, e));
          break;
        }
      }
      t = t.return;
    }
  }
  function ad(e, t, n) {
    var r = e.pingCache;
    r !== null && r.delete(t), t = dt(), e.pingedLanes |= e.suspendedLanes & n, Je === e && (rt & n) === n && (Xe === 4 || Xe === 3 && (rt & 130023424) === rt && 500 > Fe() - Qo ? Yn(e, 0) : Ko |= n), wt(e, t);
  }
  function Ba(e, t) {
    t === 0 && ((e.mode & 1) === 0 ? t = 1 : (t = wi, wi <<= 1, (wi & 130023424) === 0 && (wi = 4194304)));
    var n = dt();
    e = en(e, t), e !== null && (zr(e, t, n), wt(e, n));
  }
  function cd(e) {
    var t = e.memoizedState, n = 0;
    t !== null && (n = t.retryLane), Ba(e, n);
  }
  function fd(e, t) {
    var n = 0;
    switch (e.tag) {
      case 13:
        var r = e.stateNode, i = e.memoizedState;
        i !== null && (n = i.retryLane);
        break;
      case 19:
        r = e.stateNode;
        break;
      default:
        throw Error(s(314));
    }
    r !== null && r.delete(t), Ba(e, n);
  }
  var Wa;
  Wa = function(e, t, n) {
    if (e !== null) if (e.memoizedProps !== t.pendingProps || mt.current) yt = !0;
    else {
      if ((e.lanes & n) === 0 && (t.flags & 128) === 0) return yt = !1, Jf(e, t, n);
      yt = (e.flags & 131072) !== 0;
    }
    else yt = !1, Pe && (t.flags & 1048576) !== 0 && xu(t, Vi, t.index);
    switch (t.lanes = 0, t.tag) {
      case 2:
        var r = t.type;
        nl(e, t), e = t.pendingProps;
        var i = cr(t, lt.current);
        vr(t, n), i = Co(null, t, r, e, i, n);
        var l = Po();
        return t.flags |= 1, typeof i == "object" && i !== null && typeof i.render == "function" && i.$$typeof === void 0 ? (t.tag = 1, t.memoizedState = null, t.updateQueue = null, vt(r) ? (l = !0, Fi(t)) : l = !1, t.memoizedState = i.state !== null && i.state !== void 0 ? i.state : null, go(t), i.updater = el, t.stateNode = i, i._reactInternals = t, Lo(t, r, e, n), t = Ao(null, t, r, !0, l, n)) : (t.tag = 0, Pe && l && so(t), ft(null, t, i, n), t = t.child), t;
      case 16:
        r = t.elementType;
        e: {
          switch (nl(e, t), e = t.pendingProps, i = r._init, r = i(r._payload), t.type = r, i = t.tag = pd(r), e = jt(r, e), i) {
            case 0:
              t = Oo(null, t, r, e, n);
              break e;
            case 1:
              t = va(null, t, r, e, n);
              break e;
            case 11:
              t = fa(null, t, r, e, n);
              break e;
            case 14:
              t = da(null, t, r, jt(r.type, e), n);
              break e;
          }
          throw Error(s(
            306,
            r,
            ""
          ));
        }
        return t;
      case 0:
        return r = t.type, i = t.pendingProps, i = t.elementType === r ? i : jt(r, i), Oo(e, t, r, i, n);
      case 1:
        return r = t.type, i = t.pendingProps, i = t.elementType === r ? i : jt(r, i), va(e, t, r, i, n);
      case 3:
        e: {
          if (ya(t), e === null) throw Error(s(387));
          r = t.pendingProps, l = t.memoizedState, i = l.element, Lu(e, t), Ki(t, r, null, n);
          var u = t.memoizedState;
          if (r = u.element, l.isDehydrated) if (l = { element: r, isDehydrated: !1, cache: u.cache, pendingSuspenseBoundaries: u.pendingSuspenseBoundaries, transitions: u.transitions }, t.updateQueue.baseState = l, t.memoizedState = l, t.flags & 256) {
            i = gr(Error(s(423)), t), t = ga(e, t, r, n, i);
            break e;
          } else if (r !== i) {
            i = gr(Error(s(424)), t), t = ga(e, t, r, n, i);
            break e;
          } else for (xt = gn(t.stateNode.containerInfo.firstChild), kt = t, Pe = !0, At = null, n = Du(t, null, r, n), t.child = n; n; ) n.flags = n.flags & -3 | 4096, n = n.sibling;
          else {
            if (pr(), r === i) {
              t = nn(e, t, n);
              break e;
            }
            ft(e, t, r, n);
          }
          t = t.child;
        }
        return t;
      case 5:
        return Ou(t), e === null && co(t), r = t.type, i = t.pendingProps, l = e !== null ? e.memoizedProps : null, u = i.children, to(r, i) ? u = null : l !== null && to(r, l) && (t.flags |= 32), ma(e, t), ft(e, t, u, n), t.child;
      case 6:
        return e === null && co(t), null;
      case 13:
        return wa(e, t, n);
      case 4:
        return wo(t, t.stateNode.containerInfo), r = t.pendingProps, e === null ? t.child = hr(t, null, r, n) : ft(e, t, r, n), t.child;
      case 11:
        return r = t.type, i = t.pendingProps, i = t.elementType === r ? i : jt(r, i), fa(e, t, r, i, n);
      case 7:
        return ft(e, t, t.pendingProps, n), t.child;
      case 8:
        return ft(e, t, t.pendingProps.children, n), t.child;
      case 12:
        return ft(e, t, t.pendingProps.children, n), t.child;
      case 10:
        e: {
          if (r = t.type._context, i = t.pendingProps, l = t.memoizedProps, u = i.value, ge(Wi, r._currentValue), r._currentValue = u, l !== null) if (Ot(l.value, u)) {
            if (l.children === i.children && !mt.current) {
              t = nn(e, t, n);
              break e;
            }
          } else for (l = t.child, l !== null && (l.return = t); l !== null; ) {
            var f = l.dependencies;
            if (f !== null) {
              u = l.child;
              for (var d = f.firstContext; d !== null; ) {
                if (d.context === r) {
                  if (l.tag === 1) {
                    d = tn(-1, n & -n), d.tag = 2;
                    var g = l.updateQueue;
                    if (g !== null) {
                      g = g.shared;
                      var S = g.pending;
                      S === null ? d.next = d : (d.next = S.next, S.next = d), g.pending = d;
                    }
                  }
                  l.lanes |= n, d = l.alternate, d !== null && (d.lanes |= n), vo(
                    l.return,
                    n,
                    t
                  ), f.lanes |= n;
                  break;
                }
                d = d.next;
              }
            } else if (l.tag === 10) u = l.type === t.type ? null : l.child;
            else if (l.tag === 18) {
              if (u = l.return, u === null) throw Error(s(341));
              u.lanes |= n, f = u.alternate, f !== null && (f.lanes |= n), vo(u, n, t), u = l.sibling;
            } else u = l.child;
            if (u !== null) u.return = l;
            else for (u = l; u !== null; ) {
              if (u === t) {
                u = null;
                break;
              }
              if (l = u.sibling, l !== null) {
                l.return = u.return, u = l;
                break;
              }
              u = u.return;
            }
            l = u;
          }
          ft(e, t, i.children, n), t = t.child;
        }
        return t;
      case 9:
        return i = t.type, r = t.pendingProps.children, vr(t, n), i = Rt(i), r = r(i), t.flags |= 1, ft(e, t, r, n), t.child;
      case 14:
        return r = t.type, i = jt(r, t.pendingProps), i = jt(r.type, i), da(e, t, r, i, n);
      case 15:
        return pa(e, t, t.type, t.pendingProps, n);
      case 17:
        return r = t.type, i = t.pendingProps, i = t.elementType === r ? i : jt(r, i), nl(e, t), t.tag = 1, vt(r) ? (e = !0, Fi(t)) : e = !1, vr(t, n), ia(t, r, i), Lo(t, r, i, n), Ao(null, t, r, !0, e, n);
      case 19:
        return Sa(e, t, n);
      case 22:
        return ha(e, t, n);
    }
    throw Error(s(156, t.tag));
  };
  function Ya(e, t) {
    return Es(e, t);
  }
  function dd(e, t, n, r) {
    this.tag = e, this.key = n, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = r, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function zt(e, t, n, r) {
    return new dd(e, t, n, r);
  }
  function ns(e) {
    return e = e.prototype, !(!e || !e.isReactComponent);
  }
  function pd(e) {
    if (typeof e == "function") return ns(e) ? 1 : 0;
    if (e != null) {
      if (e = e.$$typeof, e === ct) return 11;
      if (e === ht) return 14;
    }
    return 2;
  }
  function Nn(e, t) {
    var n = e.alternate;
    return n === null ? (n = zt(e.tag, t, e.key, e.mode), n.elementType = e.elementType, n.type = e.type, n.stateNode = e.stateNode, n.alternate = e, e.alternate = n) : (n.pendingProps = t, n.type = e.type, n.flags = 0, n.subtreeFlags = 0, n.deletions = null), n.flags = e.flags & 14680064, n.childLanes = e.childLanes, n.lanes = e.lanes, n.child = e.child, n.memoizedProps = e.memoizedProps, n.memoizedState = e.memoizedState, n.updateQueue = e.updateQueue, t = e.dependencies, n.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }, n.sibling = e.sibling, n.index = e.index, n.ref = e.ref, n;
  }
  function pl(e, t, n, r, i, l) {
    var u = 2;
    if (r = e, typeof e == "function") ns(e) && (u = 1);
    else if (typeof e == "string") u = 5;
    else e: switch (e) {
      case Qe:
        return Kn(n.children, i, l, t);
      case Le:
        u = 8, i |= 8;
        break;
      case pt:
        return e = zt(12, n, t, i | 2), e.elementType = pt, e.lanes = l, e;
      case it:
        return e = zt(13, n, t, i), e.elementType = it, e.lanes = l, e;
      case Ve:
        return e = zt(19, n, t, i), e.elementType = Ve, e.lanes = l, e;
      case me:
        return hl(n, i, l, t);
      default:
        if (typeof e == "object" && e !== null) switch (e.$$typeof) {
          case je:
            u = 10;
            break e;
          case Ct:
            u = 9;
            break e;
          case ct:
            u = 11;
            break e;
          case ht:
            u = 14;
            break e;
          case ae:
            u = 16, r = null;
            break e;
        }
        throw Error(s(130, e == null ? e : typeof e, ""));
    }
    return t = zt(u, n, t, i), t.elementType = e, t.type = r, t.lanes = l, t;
  }
  function Kn(e, t, n, r) {
    return e = zt(7, e, r, t), e.lanes = n, e;
  }
  function hl(e, t, n, r) {
    return e = zt(22, e, r, t), e.elementType = me, e.lanes = n, e.stateNode = { isHidden: !1 }, e;
  }
  function rs(e, t, n) {
    return e = zt(6, e, null, t), e.lanes = n, e;
  }
  function is(e, t, n) {
    return t = zt(4, e.children !== null ? e.children : [], e.key, t), t.lanes = n, t.stateNode = { containerInfo: e.containerInfo, pendingChildren: null, implementation: e.implementation }, t;
  }
  function hd(e, t, n, r, i) {
    this.tag = t, this.containerInfo = e, this.finishedWork = this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.pendingContext = this.context = null, this.callbackPriority = 0, this.eventTimes = Dl(0), this.expirationTimes = Dl(-1), this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Dl(0), this.identifierPrefix = r, this.onRecoverableError = i, this.mutableSourceEagerHydrationData = null;
  }
  function ls(e, t, n, r, i, l, u, f, d) {
    return e = new hd(e, t, n, f, d), t === 1 ? (t = 1, l === !0 && (t |= 8)) : t = 0, l = zt(3, null, null, t), e.current = l, l.stateNode = e, l.memoizedState = { element: r, isDehydrated: n, cache: null, transitions: null, pendingSuspenseBoundaries: null }, go(l), e;
  }
  function md(e, t, n) {
    var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return { $$typeof: we, key: r == null ? null : "" + r, children: e, containerInfo: t, implementation: n };
  }
  function Xa(e) {
    if (!e) return _n;
    e = e._reactInternals;
    e: {
      if (Vt(e) !== e || e.tag !== 1) throw Error(s(170));
      var t = e;
      do {
        switch (t.tag) {
          case 3:
            t = t.stateNode.context;
            break e;
          case 1:
            if (vt(t.type)) {
              t = t.stateNode.__reactInternalMemoizedMergedChildContext;
              break e;
            }
        }
        t = t.return;
      } while (t !== null);
      throw Error(s(171));
    }
    if (e.tag === 1) {
      var n = e.type;
      if (vt(n)) return _u(e, n, t);
    }
    return t;
  }
  function Ka(e, t, n, r, i, l, u, f, d) {
    return e = ls(n, r, !0, e, i, l, u, f, d), e.context = Xa(null), n = e.current, r = dt(), i = Tn(n), l = tn(r, i), l.callback = t ?? null, xn(n, l, i), e.current.lanes = i, zr(e, i, r), wt(e, r), e;
  }
  function ml(e, t, n, r) {
    var i = t.current, l = dt(), u = Tn(i);
    return n = Xa(n), t.context === null ? t.context = n : t.pendingContext = n, t = tn(l, u), t.payload = { element: e }, r = r === void 0 ? null : r, r !== null && (t.callback = r), e = xn(i, t, u), e !== null && ($t(e, i, u, l), Xi(e, i, u)), u;
  }
  function vl(e) {
    if (e = e.current, !e.child) return null;
    switch (e.child.tag) {
      case 5:
        return e.child.stateNode;
      default:
        return e.child.stateNode;
    }
  }
  function Qa(e, t) {
    if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
      var n = e.retryLane;
      e.retryLane = n !== 0 && n < t ? n : t;
    }
  }
  function os(e, t) {
    Qa(e, t), (e = e.alternate) && Qa(e, t);
  }
  function vd() {
    return null;
  }
  var Ga = typeof reportError == "function" ? reportError : function(e) {
    console.error(e);
  };
  function ss(e) {
    this._internalRoot = e;
  }
  yl.prototype.render = ss.prototype.render = function(e) {
    var t = this._internalRoot;
    if (t === null) throw Error(s(409));
    ml(e, t, null, null);
  }, yl.prototype.unmount = ss.prototype.unmount = function() {
    var e = this._internalRoot;
    if (e !== null) {
      this._internalRoot = null;
      var t = e.containerInfo;
      Wn(function() {
        ml(null, e, null, null);
      }), t[qt] = null;
    }
  };
  function yl(e) {
    this._internalRoot = e;
  }
  yl.prototype.unstable_scheduleHydration = function(e) {
    if (e) {
      var t = Ls();
      e = { blockedOn: null, target: e, priority: t };
      for (var n = 0; n < mn.length && t !== 0 && t < mn[n].priority; n++) ;
      mn.splice(n, 0, e), n === 0 && Os(e);
    }
  };
  function us(e) {
    return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
  }
  function gl(e) {
    return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11 && (e.nodeType !== 8 || e.nodeValue !== " react-mount-point-unstable "));
  }
  function qa() {
  }
  function yd(e, t, n, r, i) {
    if (i) {
      if (typeof r == "function") {
        var l = r;
        r = function() {
          var g = vl(u);
          l.call(g);
        };
      }
      var u = Ka(t, r, e, 0, null, !1, !1, "", qa);
      return e._reactRootContainer = u, e[qt] = u.current, Yr(e.nodeType === 8 ? e.parentNode : e), Wn(), u;
    }
    for (; i = e.lastChild; ) e.removeChild(i);
    if (typeof r == "function") {
      var f = r;
      r = function() {
        var g = vl(d);
        f.call(g);
      };
    }
    var d = ls(e, 0, !1, null, null, !1, !1, "", qa);
    return e._reactRootContainer = d, e[qt] = d.current, Yr(e.nodeType === 8 ? e.parentNode : e), Wn(function() {
      ml(t, d, n, r);
    }), d;
  }
  function wl(e, t, n, r, i) {
    var l = n._reactRootContainer;
    if (l) {
      var u = l;
      if (typeof i == "function") {
        var f = i;
        i = function() {
          var d = vl(u);
          f.call(d);
        };
      }
      ml(t, u, e, i);
    } else u = yd(n, t, e, i, r);
    return vl(u);
  }
  Ds = function(e) {
    switch (e.tag) {
      case 3:
        var t = e.stateNode;
        if (t.current.memoizedState.isDehydrated) {
          var n = Dr(t.pendingLanes);
          n !== 0 && (zl(t, n | 1), wt(t, Fe()), (ie & 6) === 0 && (Sr = Fe() + 500, Sn()));
        }
        break;
      case 13:
        Wn(function() {
          var r = en(e, 1);
          if (r !== null) {
            var i = dt();
            $t(r, e, 1, i);
          }
        }), os(e, 1);
    }
  }, Ll = function(e) {
    if (e.tag === 13) {
      var t = en(e, 134217728);
      if (t !== null) {
        var n = dt();
        $t(t, e, 134217728, n);
      }
      os(e, 134217728);
    }
  }, zs = function(e) {
    if (e.tag === 13) {
      var t = Tn(e), n = en(e, t);
      if (n !== null) {
        var r = dt();
        $t(n, e, t, r);
      }
      os(e, t);
    }
  }, Ls = function() {
    return fe;
  }, Ms = function(e, t) {
    var n = fe;
    try {
      return fe = e, t();
    } finally {
      fe = n;
    }
  }, tt = function(e, t, n) {
    switch (t) {
      case "input":
        if (Rr(e, n), t = n.name, n.type === "radio" && t != null) {
          for (n = e; n.parentNode; ) n = n.parentNode;
          for (n = n.querySelectorAll("input[name=" + JSON.stringify("" + t) + '][type="radio"]'), t = 0; t < n.length; t++) {
            var r = n[t];
            if (r !== e && r.form === e.form) {
              var i = Ai(r);
              if (!i) throw Error(s(90));
              Kt(r), Rr(r, i);
            }
          }
        }
        break;
      case "textarea":
        b(e, n);
        break;
      case "select":
        t = n.value, t != null && sn(e, !!n.multiple, t, !1);
    }
  }, di = bo, pi = Wn;
  var gd = { usingClientEntryPoint: !1, Events: [Qr, ur, Ai, Mt, Zn, bo] }, ui = { findFiberByHostInstance: An, bundleType: 0, version: "18.3.1", rendererPackageName: "react-dom" }, wd = { bundleType: ui.bundleType, version: ui.version, rendererPackageName: ui.rendererPackageName, rendererConfig: ui.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setErrorHandler: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: Ae.ReactCurrentDispatcher, findHostInstanceByFiber: function(e) {
    return e = ks(e), e === null ? null : e.stateNode;
  }, findFiberByHostInstance: ui.findFiberByHostInstance || vd, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null, reconcilerVersion: "18.3.1-next-f1338f8080-20240426" };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var _l = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!_l.isDisabled && _l.supportsFiber) try {
      yi = _l.inject(wd), Ht = _l;
    } catch {
    }
  }
  return _t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = gd, _t.createPortal = function(e, t) {
    var n = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!us(t)) throw Error(s(200));
    return md(e, t, null, n);
  }, _t.createRoot = function(e, t) {
    if (!us(e)) throw Error(s(299));
    var n = !1, r = "", i = Ga;
    return t != null && (t.unstable_strictMode === !0 && (n = !0), t.identifierPrefix !== void 0 && (r = t.identifierPrefix), t.onRecoverableError !== void 0 && (i = t.onRecoverableError)), t = ls(e, 1, !1, null, null, n, !1, r, i), e[qt] = t.current, Yr(e.nodeType === 8 ? e.parentNode : e), new ss(t);
  }, _t.findDOMNode = function(e) {
    if (e == null) return null;
    if (e.nodeType === 1) return e;
    var t = e._reactInternals;
    if (t === void 0)
      throw typeof e.render == "function" ? Error(s(188)) : (e = Object.keys(e).join(","), Error(s(268, e)));
    return e = ks(t), e = e === null ? null : e.stateNode, e;
  }, _t.flushSync = function(e) {
    return Wn(e);
  }, _t.hydrate = function(e, t, n) {
    if (!gl(t)) throw Error(s(200));
    return wl(null, e, t, !0, n);
  }, _t.hydrateRoot = function(e, t, n) {
    if (!us(e)) throw Error(s(405));
    var r = n != null && n.hydratedSources || null, i = !1, l = "", u = Ga;
    if (n != null && (n.unstable_strictMode === !0 && (i = !0), n.identifierPrefix !== void 0 && (l = n.identifierPrefix), n.onRecoverableError !== void 0 && (u = n.onRecoverableError)), t = Ka(t, null, e, 1, n ?? null, i, !1, l, u), e[qt] = t.current, Yr(e), r) for (e = 0; e < r.length; e++) n = r[e], i = n._getVersion, i = i(n._source), t.mutableSourceEagerHydrationData == null ? t.mutableSourceEagerHydrationData = [n, i] : t.mutableSourceEagerHydrationData.push(
      n,
      i
    );
    return new yl(t);
  }, _t.render = function(e, t, n) {
    if (!gl(t)) throw Error(s(200));
    return wl(null, e, t, !1, n);
  }, _t.unmountComponentAtNode = function(e) {
    if (!gl(e)) throw Error(s(40));
    return e._reactRootContainer ? (Wn(function() {
      wl(null, null, e, !1, function() {
        e._reactRootContainer = null, e[qt] = null;
      });
    }), !0) : !1;
  }, _t.unstable_batchedUpdates = bo, _t.unstable_renderSubtreeIntoContainer = function(e, t, n, r) {
    if (!gl(n)) throw Error(s(200));
    if (e == null || e._reactInternals === void 0) throw Error(s(38));
    return wl(e, t, n, !1, r);
  }, _t.version = "18.3.1-next-f1338f8080-20240426", _t;
}
var nc;
function Pd() {
  if (nc) return fs.exports;
  nc = 1;
  function a() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(a);
      } catch (o) {
        console.error(o);
      }
  }
  return a(), fs.exports = Cd(), fs.exports;
}
var rc;
function Td() {
  if (rc) return Sl;
  rc = 1;
  var a = Pd();
  return Sl.createRoot = a.createRoot, Sl.hydrateRoot = a.hydrateRoot, Sl;
}
var Rd = Td(), hs = { exports: {} }, ai = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ic;
function Nd() {
  if (ic) return ai;
  ic = 1;
  var a = gs(), o = Symbol.for("react.element"), s = Symbol.for("react.fragment"), c = Object.prototype.hasOwnProperty, m = a.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, k = { key: !0, ref: !0, __self: !0, __source: !0 };
  function T(L, R, z) {
    var P, B = {}, Y = null, Te = null;
    z !== void 0 && (Y = "" + z), R.key !== void 0 && (Y = "" + R.key), R.ref !== void 0 && (Te = R.ref);
    for (P in R) c.call(R, P) && !k.hasOwnProperty(P) && (B[P] = R[P]);
    if (L && L.defaultProps) for (P in R = L.defaultProps, R) B[P] === void 0 && (B[P] = R[P]);
    return { $$typeof: o, type: L, key: Y, ref: Te, props: B, _owner: m.current };
  }
  return ai.Fragment = s, ai.jsx = T, ai.jsxs = T, ai;
}
var lc;
function Dd() {
  return lc || (lc = 1, hs.exports = Nd()), hs.exports;
}
var at = Dd();
function zd(a, o, s) {
  return Math.max(o, Math.min(a, s));
}
const xe = {
  toVector(a, o) {
    return a === void 0 && (a = o), Array.isArray(a) ? a : [a, a];
  },
  add(a, o) {
    return [a[0] + o[0], a[1] + o[1]];
  },
  sub(a, o) {
    return [a[0] - o[0], a[1] - o[1]];
  },
  addTo(a, o) {
    a[0] += o[0], a[1] += o[1];
  },
  subTo(a, o) {
    a[0] -= o[0], a[1] -= o[1];
  }
};
function oc(a, o, s) {
  return o === 0 || Math.abs(o) === 1 / 0 ? Math.pow(a, s * 5) : a * o * s / (o + s * a);
}
function sc(a, o, s, c = 0.15) {
  return c === 0 ? zd(a, o, s) : a < o ? -oc(o - a, s - o, c) + o : a > s ? +oc(a - s, s - o, c) + s : a;
}
function Ld(a, [o, s], [c, m]) {
  const [[k, T], [L, R]] = a;
  return [sc(o, k, T, c), sc(s, L, R, m)];
}
function Md(a, o) {
  if (typeof a != "object" || a === null) return a;
  var s = a[Symbol.toPrimitive];
  if (s !== void 0) {
    var c = s.call(a, o);
    if (typeof c != "object") return c;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (o === "string" ? String : Number)(a);
}
function Id(a) {
  var o = Md(a, "string");
  return typeof o == "symbol" ? o : String(o);
}
function Be(a, o, s) {
  return o = Id(o), o in a ? Object.defineProperty(a, o, {
    value: s,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : a[o] = s, a;
}
function uc(a, o) {
  var s = Object.keys(a);
  if (Object.getOwnPropertySymbols) {
    var c = Object.getOwnPropertySymbols(a);
    o && (c = c.filter(function(m) {
      return Object.getOwnPropertyDescriptor(a, m).enumerable;
    })), s.push.apply(s, c);
  }
  return s;
}
function ze(a) {
  for (var o = 1; o < arguments.length; o++) {
    var s = arguments[o] != null ? arguments[o] : {};
    o % 2 ? uc(Object(s), !0).forEach(function(c) {
      Be(a, c, s[c]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(a, Object.getOwnPropertyDescriptors(s)) : uc(Object(s)).forEach(function(c) {
      Object.defineProperty(a, c, Object.getOwnPropertyDescriptor(s, c));
    });
  }
  return a;
}
const Sc = {
  pointer: {
    start: "down",
    change: "move",
    end: "up"
  },
  mouse: {
    start: "down",
    change: "move",
    end: "up"
  },
  touch: {
    start: "start",
    change: "move",
    end: "end"
  },
  gesture: {
    start: "start",
    change: "change",
    end: "end"
  }
};
function ac(a) {
  return a ? a[0].toUpperCase() + a.slice(1) : "";
}
const Od = ["enter", "leave"];
function Ad(a = !1, o) {
  return a && !Od.includes(o);
}
function jd(a, o = "", s = !1) {
  const c = Sc[a], m = c && c[o] || o;
  return "on" + ac(a) + ac(m) + (Ad(s, m) ? "Capture" : "");
}
const Fd = ["gotpointercapture", "lostpointercapture"];
function Ud(a) {
  let o = a.substring(2).toLowerCase();
  const s = !!~o.indexOf("passive");
  s && (o = o.replace("passive", ""));
  const c = Fd.includes(o) ? "capturecapture" : "capture", m = !!~o.indexOf(c);
  return m && (o = o.replace("capture", "")), {
    device: o,
    capture: m,
    passive: s
  };
}
function $d(a, o = "") {
  const s = Sc[a], c = s && s[o] || o;
  return a + c;
}
function Cl(a) {
  return "touches" in a;
}
function kc(a) {
  return Cl(a) ? "touch" : "pointerType" in a ? a.pointerType : "mouse";
}
function Vd(a) {
  return Array.from(a.touches).filter((o) => {
    var s, c;
    return o.target === a.currentTarget || ((s = a.currentTarget) === null || s === void 0 || (c = s.contains) === null || c === void 0 ? void 0 : c.call(s, o.target));
  });
}
function Hd(a) {
  return a.type === "touchend" || a.type === "touchcancel" ? a.changedTouches : a.targetTouches;
}
function xc(a) {
  return Cl(a) ? Hd(a)[0] : a;
}
function vs(a, o) {
  try {
    const s = o.clientX - a.clientX, c = o.clientY - a.clientY, m = (o.clientX + a.clientX) / 2, k = (o.clientY + a.clientY) / 2, T = Math.hypot(s, c);
    return {
      angle: -(Math.atan2(s, c) * 180) / Math.PI,
      distance: T,
      origin: [m, k]
    };
  } catch {
  }
  return null;
}
function Bd(a) {
  return Vd(a).map((o) => o.identifier);
}
function cc(a, o) {
  const [s, c] = Array.from(a.touches).filter((m) => o.includes(m.identifier));
  return vs(s, c);
}
function ms(a) {
  const o = xc(a);
  return Cl(a) ? o.identifier : o.pointerId;
}
function Cr(a) {
  const o = xc(a);
  return [o.clientX, o.clientY];
}
const fc = 40, dc = 800;
function Ec(a) {
  let {
    deltaX: o,
    deltaY: s,
    deltaMode: c
  } = a;
  return c === 1 ? (o *= fc, s *= fc) : c === 2 && (o *= dc, s *= dc), [o, s];
}
function Wd(a) {
  var o, s;
  const {
    scrollX: c,
    scrollY: m,
    scrollLeft: k,
    scrollTop: T
  } = a.currentTarget;
  return [(o = c ?? k) !== null && o !== void 0 ? o : 0, (s = m ?? T) !== null && s !== void 0 ? s : 0];
}
function Yd(a) {
  const o = {};
  if ("buttons" in a && (o.buttons = a.buttons), "shiftKey" in a) {
    const {
      shiftKey: s,
      altKey: c,
      metaKey: m,
      ctrlKey: k
    } = a;
    Object.assign(o, {
      shiftKey: s,
      altKey: c,
      metaKey: m,
      ctrlKey: k
    });
  }
  return o;
}
function El(a, ...o) {
  return typeof a == "function" ? a(...o) : a;
}
function Xd() {
}
function Kd(...a) {
  return a.length === 0 ? Xd : a.length === 1 ? a[0] : function() {
    let o;
    for (const s of a)
      o = s.apply(this, arguments) || o;
    return o;
  };
}
function pc(a, o) {
  return Object.assign({}, o, a || {});
}
const Qd = 32;
class Cc {
  constructor(o, s, c) {
    this.ctrl = o, this.args = s, this.key = c, this.state || (this.state = {}, this.computeValues([0, 0]), this.computeInitial(), this.init && this.init(), this.reset());
  }
  get state() {
    return this.ctrl.state[this.key];
  }
  set state(o) {
    this.ctrl.state[this.key] = o;
  }
  get shared() {
    return this.ctrl.state.shared;
  }
  get eventStore() {
    return this.ctrl.gestureEventStores[this.key];
  }
  get timeoutStore() {
    return this.ctrl.gestureTimeoutStores[this.key];
  }
  get config() {
    return this.ctrl.config[this.key];
  }
  get sharedConfig() {
    return this.ctrl.config.shared;
  }
  get handler() {
    return this.ctrl.handlers[this.key];
  }
  reset() {
    const {
      state: o,
      shared: s,
      ingKey: c,
      args: m
    } = this;
    s[c] = o._active = o.active = o._blocked = o._force = !1, o._step = [!1, !1], o.intentional = !1, o._movement = [0, 0], o._distance = [0, 0], o._direction = [0, 0], o._delta = [0, 0], o._bounds = [[-1 / 0, 1 / 0], [-1 / 0, 1 / 0]], o.args = m, o.axis = void 0, o.memo = void 0, o.elapsedTime = o.timeDelta = 0, o.direction = [0, 0], o.distance = [0, 0], o.overflow = [0, 0], o._movementBound = [!1, !1], o.velocity = [0, 0], o.movement = [0, 0], o.delta = [0, 0], o.timeStamp = 0;
  }
  start(o) {
    const s = this.state, c = this.config;
    s._active || (this.reset(), this.computeInitial(), s._active = !0, s.target = o.target, s.currentTarget = o.currentTarget, s.lastOffset = c.from ? El(c.from, s) : s.offset, s.offset = s.lastOffset, s.startTime = s.timeStamp = o.timeStamp);
  }
  computeValues(o) {
    const s = this.state;
    s._values = o, s.values = this.config.transform(o);
  }
  computeInitial() {
    const o = this.state;
    o._initial = o._values, o.initial = o.values;
  }
  compute(o) {
    const {
      state: s,
      config: c,
      shared: m
    } = this;
    s.args = this.args;
    let k = 0;
    if (o && (s.event = o, c.preventDefault && o.cancelable && s.event.preventDefault(), s.type = o.type, m.touches = this.ctrl.pointerIds.size || this.ctrl.touchIds.size, m.locked = !!document.pointerLockElement, Object.assign(m, Yd(o)), m.down = m.pressed = m.buttons % 2 === 1 || m.touches > 0, k = o.timeStamp - s.timeStamp, s.timeStamp = o.timeStamp, s.elapsedTime = s.timeStamp - s.startTime), s._active) {
      const we = s._delta.map(Math.abs);
      xe.addTo(s._distance, we);
    }
    this.axisIntent && this.axisIntent(o);
    const [T, L] = s._movement, [R, z] = c.threshold, {
      _step: P,
      values: B
    } = s;
    if (c.hasCustomTransform ? (P[0] === !1 && (P[0] = Math.abs(T) >= R && B[0]), P[1] === !1 && (P[1] = Math.abs(L) >= z && B[1])) : (P[0] === !1 && (P[0] = Math.abs(T) >= R && Math.sign(T) * R), P[1] === !1 && (P[1] = Math.abs(L) >= z && Math.sign(L) * z)), s.intentional = P[0] !== !1 || P[1] !== !1, !s.intentional) return;
    const Y = [0, 0];
    if (c.hasCustomTransform) {
      const [we, Qe] = B;
      Y[0] = P[0] !== !1 ? we - P[0] : 0, Y[1] = P[1] !== !1 ? Qe - P[1] : 0;
    } else
      Y[0] = P[0] !== !1 ? T - P[0] : 0, Y[1] = P[1] !== !1 ? L - P[1] : 0;
    this.restrictToAxis && !s._blocked && this.restrictToAxis(Y);
    const Te = s.offset, Re = s._active && !s._blocked || s.active;
    Re && (s.first = s._active && !s.active, s.last = !s._active && s.active, s.active = m[this.ingKey] = s._active, o && (s.first && ("bounds" in c && (s._bounds = El(c.bounds, s)), this.setup && this.setup()), s.movement = Y, this.computeOffset()));
    const [ne, Q] = s.offset, [[Oe, $e], [et, Ae]] = s._bounds;
    s.overflow = [ne < Oe ? -1 : ne > $e ? 1 : 0, Q < et ? -1 : Q > Ae ? 1 : 0], s._movementBound[0] = s.overflow[0] ? s._movementBound[0] === !1 ? s._movement[0] : s._movementBound[0] : !1, s._movementBound[1] = s.overflow[1] ? s._movementBound[1] === !1 ? s._movement[1] : s._movementBound[1] : !1;
    const Ke = s._active ? c.rubberband || [0, 0] : [0, 0];
    if (s.offset = Ld(s._bounds, s.offset, Ke), s.delta = xe.sub(s.offset, Te), this.computeMovement(), Re && (!s.last || k > Qd)) {
      s.delta = xe.sub(s.offset, Te);
      const we = s.delta.map(Math.abs);
      xe.addTo(s.distance, we), s.direction = s.delta.map(Math.sign), s._direction = s._delta.map(Math.sign), !s.first && k > 0 && (s.velocity = [we[0] / k, we[1] / k], s.timeDelta = k);
    }
  }
  emit() {
    const o = this.state, s = this.shared, c = this.config;
    if (o._active || this.clean(), (o._blocked || !o.intentional) && !o._force && !c.triggerAllEvents) return;
    const m = this.handler(ze(ze(ze({}, s), o), {}, {
      [this.aliasKey]: o.values
    }));
    m !== void 0 && (o.memo = m);
  }
  clean() {
    this.eventStore.clean(), this.timeoutStore.clean();
  }
}
function Gd([a, o], s) {
  const c = Math.abs(a), m = Math.abs(o);
  if (c > m && c > s)
    return "x";
  if (m > c && m > s)
    return "y";
}
class ci extends Cc {
  constructor(...o) {
    super(...o), Be(this, "aliasKey", "xy");
  }
  reset() {
    super.reset(), this.state.axis = void 0;
  }
  init() {
    this.state.offset = [0, 0], this.state.lastOffset = [0, 0];
  }
  computeOffset() {
    this.state.offset = xe.add(this.state.lastOffset, this.state.movement);
  }
  computeMovement() {
    this.state.movement = xe.sub(this.state.offset, this.state.lastOffset);
  }
  axisIntent(o) {
    const s = this.state, c = this.config;
    if (!s.axis && o) {
      const m = typeof c.axisThreshold == "object" ? c.axisThreshold[kc(o)] : c.axisThreshold;
      s.axis = Gd(s._movement, m);
    }
    s._blocked = (c.lockDirection || !!c.axis) && !s.axis || !!c.axis && c.axis !== s.axis;
  }
  restrictToAxis(o) {
    if (this.config.axis || this.config.lockDirection)
      switch (this.state.axis) {
        case "x":
          o[1] = 0;
          break;
        case "y":
          o[0] = 0;
          break;
      }
  }
}
const qd = (a) => a, hc = 0.15, Pc = {
  enabled(a = !0) {
    return a;
  },
  eventOptions(a, o, s) {
    return ze(ze({}, s.shared.eventOptions), a);
  },
  preventDefault(a = !1) {
    return a;
  },
  triggerAllEvents(a = !1) {
    return a;
  },
  rubberband(a = 0) {
    switch (a) {
      case !0:
        return [hc, hc];
      case !1:
        return [0, 0];
      default:
        return xe.toVector(a);
    }
  },
  from(a) {
    if (typeof a == "function") return a;
    if (a != null) return xe.toVector(a);
  },
  transform(a, o, s) {
    const c = a || s.shared.transform;
    return this.hasCustomTransform = !!c, c || qd;
  },
  threshold(a) {
    return xe.toVector(a, 0);
  }
}, Zd = 0, Gn = ze(ze({}, Pc), {}, {
  axis(a, o, {
    axis: s
  }) {
    if (this.lockDirection = s === "lock", !this.lockDirection) return s;
  },
  axisThreshold(a = Zd) {
    return a;
  },
  bounds(a = {}) {
    if (typeof a == "function")
      return (k) => Gn.bounds(a(k));
    if ("current" in a)
      return () => a.current;
    if (typeof HTMLElement == "function" && a instanceof HTMLElement)
      return a;
    const {
      left: o = -1 / 0,
      right: s = 1 / 0,
      top: c = -1 / 0,
      bottom: m = 1 / 0
    } = a;
    return [[o, s], [c, m]];
  }
}), mc = {
  ArrowRight: (a, o = 1) => [a * o, 0],
  ArrowLeft: (a, o = 1) => [-1 * a * o, 0],
  ArrowUp: (a, o = 1) => [0, -1 * a * o],
  ArrowDown: (a, o = 1) => [0, a * o]
};
class Jd extends ci {
  constructor(...o) {
    super(...o), Be(this, "ingKey", "dragging");
  }
  reset() {
    super.reset();
    const o = this.state;
    o._pointerId = void 0, o._pointerActive = !1, o._keyboardActive = !1, o._preventScroll = !1, o._delayed = !1, o.swipe = [0, 0], o.tap = !1, o.canceled = !1, o.cancel = this.cancel.bind(this);
  }
  setup() {
    const o = this.state;
    if (o._bounds instanceof HTMLElement) {
      const s = o._bounds.getBoundingClientRect(), c = o.currentTarget.getBoundingClientRect(), m = {
        left: s.left - c.left + o.offset[0],
        right: s.right - c.right + o.offset[0],
        top: s.top - c.top + o.offset[1],
        bottom: s.bottom - c.bottom + o.offset[1]
      };
      o._bounds = Gn.bounds(m);
    }
  }
  cancel() {
    const o = this.state;
    o.canceled || (o.canceled = !0, o._active = !1, setTimeout(() => {
      this.compute(), this.emit();
    }, 0));
  }
  setActive() {
    this.state._active = this.state._pointerActive || this.state._keyboardActive;
  }
  clean() {
    this.pointerClean(), this.state._pointerActive = !1, this.state._keyboardActive = !1, super.clean();
  }
  pointerDown(o) {
    const s = this.config, c = this.state;
    if (o.buttons != null && (Array.isArray(s.pointerButtons) ? !s.pointerButtons.includes(o.buttons) : s.pointerButtons !== -1 && s.pointerButtons !== o.buttons)) return;
    const m = this.ctrl.setEventIds(o);
    s.pointerCapture && o.target.setPointerCapture(o.pointerId), !(m && m.size > 1 && c._pointerActive) && (this.start(o), this.setupPointer(o), c._pointerId = ms(o), c._pointerActive = !0, this.computeValues(Cr(o)), this.computeInitial(), s.preventScrollAxis && kc(o) !== "mouse" ? (c._active = !1, this.setupScrollPrevention(o)) : s.delay > 0 ? (this.setupDelayTrigger(o), s.triggerAllEvents && (this.compute(o), this.emit())) : this.startPointerDrag(o));
  }
  startPointerDrag(o) {
    const s = this.state;
    s._active = !0, s._preventScroll = !0, s._delayed = !1, this.compute(o), this.emit();
  }
  pointerMove(o) {
    const s = this.state, c = this.config;
    if (!s._pointerActive) return;
    const m = ms(o);
    if (s._pointerId !== void 0 && m !== s._pointerId) return;
    const k = Cr(o);
    if (document.pointerLockElement === o.target ? s._delta = [o.movementX, o.movementY] : (s._delta = xe.sub(k, s._values), this.computeValues(k)), xe.addTo(s._movement, s._delta), this.compute(o), s._delayed && s.intentional) {
      this.timeoutStore.remove("dragDelay"), s.active = !1, this.startPointerDrag(o);
      return;
    }
    if (c.preventScrollAxis && !s._preventScroll)
      if (s.axis)
        if (s.axis === c.preventScrollAxis || c.preventScrollAxis === "xy") {
          s._active = !1, this.clean();
          return;
        } else {
          this.timeoutStore.remove("startPointerDrag"), this.startPointerDrag(o);
          return;
        }
      else
        return;
    this.emit();
  }
  pointerUp(o) {
    this.ctrl.setEventIds(o);
    try {
      this.config.pointerCapture && o.target.hasPointerCapture(o.pointerId) && o.target.releasePointerCapture(o.pointerId);
    } catch {
    }
    const s = this.state, c = this.config;
    if (!s._active || !s._pointerActive) return;
    const m = ms(o);
    if (s._pointerId !== void 0 && m !== s._pointerId) return;
    this.state._pointerActive = !1, this.setActive(), this.compute(o);
    const [k, T] = s._distance;
    if (s.tap = k <= c.tapsThreshold && T <= c.tapsThreshold, s.tap && c.filterTaps)
      s._force = !0;
    else {
      const [L, R] = s._delta, [z, P] = s._movement, [B, Y] = c.swipe.velocity, [Te, Re] = c.swipe.distance, ne = c.swipe.duration;
      if (s.elapsedTime < ne) {
        const Q = Math.abs(L / s.timeDelta), Oe = Math.abs(R / s.timeDelta);
        Q > B && Math.abs(z) > Te && (s.swipe[0] = Math.sign(L)), Oe > Y && Math.abs(P) > Re && (s.swipe[1] = Math.sign(R));
      }
    }
    this.emit();
  }
  pointerClick(o) {
    !this.state.tap && o.detail > 0 && (o.preventDefault(), o.stopPropagation());
  }
  setupPointer(o) {
    const s = this.config, c = s.device;
    s.pointerLock && o.currentTarget.requestPointerLock(), s.pointerCapture || (this.eventStore.add(this.sharedConfig.window, c, "change", this.pointerMove.bind(this)), this.eventStore.add(this.sharedConfig.window, c, "end", this.pointerUp.bind(this)), this.eventStore.add(this.sharedConfig.window, c, "cancel", this.pointerUp.bind(this)));
  }
  pointerClean() {
    this.config.pointerLock && document.pointerLockElement === this.state.currentTarget && document.exitPointerLock();
  }
  preventScroll(o) {
    this.state._preventScroll && o.cancelable && o.preventDefault();
  }
  setupScrollPrevention(o) {
    this.state._preventScroll = !1, bd(o);
    const s = this.eventStore.add(this.sharedConfig.window, "touch", "change", this.preventScroll.bind(this), {
      passive: !1
    });
    this.eventStore.add(this.sharedConfig.window, "touch", "end", s), this.eventStore.add(this.sharedConfig.window, "touch", "cancel", s), this.timeoutStore.add("startPointerDrag", this.startPointerDrag.bind(this), this.config.preventScrollDelay, o);
  }
  setupDelayTrigger(o) {
    this.state._delayed = !0, this.timeoutStore.add("dragDelay", () => {
      this.state._step = [0, 0], this.startPointerDrag(o);
    }, this.config.delay);
  }
  keyDown(o) {
    const s = mc[o.key];
    if (s) {
      const c = this.state, m = o.shiftKey ? 10 : o.altKey ? 0.1 : 1;
      this.start(o), c._delta = s(this.config.keyboardDisplacement, m), c._keyboardActive = !0, xe.addTo(c._movement, c._delta), this.compute(o), this.emit();
    }
  }
  keyUp(o) {
    o.key in mc && (this.state._keyboardActive = !1, this.setActive(), this.compute(o), this.emit());
  }
  bind(o) {
    const s = this.config.device;
    o(s, "start", this.pointerDown.bind(this)), this.config.pointerCapture && (o(s, "change", this.pointerMove.bind(this)), o(s, "end", this.pointerUp.bind(this)), o(s, "cancel", this.pointerUp.bind(this)), o("lostPointerCapture", "", this.pointerUp.bind(this))), this.config.keys && (o("key", "down", this.keyDown.bind(this)), o("key", "up", this.keyUp.bind(this))), this.config.filterTaps && o("click", "", this.pointerClick.bind(this), {
      capture: !0,
      passive: !1
    });
  }
}
function bd(a) {
  "persist" in a && typeof a.persist == "function" && a.persist();
}
const fi = typeof window < "u" && window.document && window.document.createElement;
function Tc() {
  return fi && "ontouchstart" in window;
}
function ep() {
  return Tc() || fi && window.navigator.maxTouchPoints > 1;
}
function tp() {
  return fi && "onpointerdown" in window;
}
function np() {
  return fi && "exitPointerLock" in window.document;
}
function rp() {
  try {
    return "constructor" in GestureEvent;
  } catch {
    return !1;
  }
}
const Lt = {
  isBrowser: fi,
  gesture: rp(),
  touch: Tc(),
  touchscreen: ep(),
  pointer: tp(),
  pointerLock: np()
}, ip = 250, lp = 180, op = 0.5, sp = 50, up = 250, ap = 10, vc = {
  mouse: 0,
  touch: 0,
  pen: 8
}, cp = ze(ze({}, Gn), {}, {
  device(a, o, {
    pointer: {
      touch: s = !1,
      lock: c = !1,
      mouse: m = !1
    } = {}
  }) {
    return this.pointerLock = c && Lt.pointerLock, Lt.touch && s ? "touch" : this.pointerLock ? "mouse" : Lt.pointer && !m ? "pointer" : Lt.touch ? "touch" : "mouse";
  },
  preventScrollAxis(a, o, {
    preventScroll: s
  }) {
    if (this.preventScrollDelay = typeof s == "number" ? s : s || s === void 0 && a ? ip : void 0, !(!Lt.touchscreen || s === !1))
      return a || (s !== void 0 ? "y" : void 0);
  },
  pointerCapture(a, o, {
    pointer: {
      capture: s = !0,
      buttons: c = 1,
      keys: m = !0
    } = {}
  }) {
    return this.pointerButtons = c, this.keys = m, !this.pointerLock && this.device === "pointer" && s;
  },
  threshold(a, o, {
    filterTaps: s = !1,
    tapsThreshold: c = 3,
    axis: m = void 0
  }) {
    const k = xe.toVector(a, s ? c : m ? 1 : 0);
    return this.filterTaps = s, this.tapsThreshold = c, k;
  },
  swipe({
    velocity: a = op,
    distance: o = sp,
    duration: s = up
  } = {}) {
    return {
      velocity: this.transform(xe.toVector(a)),
      distance: this.transform(xe.toVector(o)),
      duration: s
    };
  },
  delay(a = 0) {
    switch (a) {
      case !0:
        return lp;
      case !1:
        return 0;
      default:
        return a;
    }
  },
  axisThreshold(a) {
    return a ? ze(ze({}, vc), a) : vc;
  },
  keyboardDisplacement(a = ap) {
    return a;
  }
});
function Rc(a) {
  const [o, s] = a.overflow, [c, m] = a._delta, [k, T] = a._direction;
  (o < 0 && c > 0 && k < 0 || o > 0 && c < 0 && k > 0) && (a._movement[0] = a._movementBound[0]), (s < 0 && m > 0 && T < 0 || s > 0 && m < 0 && T > 0) && (a._movement[1] = a._movementBound[1]);
}
const fp = 30, dp = 100;
class pp extends Cc {
  constructor(...o) {
    super(...o), Be(this, "ingKey", "pinching"), Be(this, "aliasKey", "da");
  }
  init() {
    this.state.offset = [1, 0], this.state.lastOffset = [1, 0], this.state._pointerEvents = /* @__PURE__ */ new Map();
  }
  reset() {
    super.reset();
    const o = this.state;
    o._touchIds = [], o.canceled = !1, o.cancel = this.cancel.bind(this), o.turns = 0;
  }
  computeOffset() {
    const {
      type: o,
      movement: s,
      lastOffset: c
    } = this.state;
    o === "wheel" ? this.state.offset = xe.add(s, c) : this.state.offset = [(1 + s[0]) * c[0], s[1] + c[1]];
  }
  computeMovement() {
    const {
      offset: o,
      lastOffset: s
    } = this.state;
    this.state.movement = [o[0] / s[0], o[1] - s[1]];
  }
  axisIntent() {
    const o = this.state, [s, c] = o._movement;
    if (!o.axis) {
      const m = Math.abs(s) * fp - Math.abs(c);
      m < 0 ? o.axis = "angle" : m > 0 && (o.axis = "scale");
    }
  }
  restrictToAxis(o) {
    this.config.lockDirection && (this.state.axis === "scale" ? o[1] = 0 : this.state.axis === "angle" && (o[0] = 0));
  }
  cancel() {
    const o = this.state;
    o.canceled || setTimeout(() => {
      o.canceled = !0, o._active = !1, this.compute(), this.emit();
    }, 0);
  }
  touchStart(o) {
    this.ctrl.setEventIds(o);
    const s = this.state, c = this.ctrl.touchIds;
    if (s._active && s._touchIds.every((k) => c.has(k)) || c.size < 2) return;
    this.start(o), s._touchIds = Array.from(c).slice(0, 2);
    const m = cc(o, s._touchIds);
    m && this.pinchStart(o, m);
  }
  pointerStart(o) {
    if (o.buttons != null && o.buttons % 2 !== 1) return;
    this.ctrl.setEventIds(o), o.target.setPointerCapture(o.pointerId);
    const s = this.state, c = s._pointerEvents, m = this.ctrl.pointerIds;
    if (s._active && Array.from(c.keys()).every((T) => m.has(T)) || (c.size < 2 && c.set(o.pointerId, o), s._pointerEvents.size < 2)) return;
    this.start(o);
    const k = vs(...Array.from(c.values()));
    k && this.pinchStart(o, k);
  }
  pinchStart(o, s) {
    const c = this.state;
    c.origin = s.origin, this.computeValues([s.distance, s.angle]), this.computeInitial(), this.compute(o), this.emit();
  }
  touchMove(o) {
    if (!this.state._active) return;
    const s = cc(o, this.state._touchIds);
    s && this.pinchMove(o, s);
  }
  pointerMove(o) {
    const s = this.state._pointerEvents;
    if (s.has(o.pointerId) && s.set(o.pointerId, o), !this.state._active) return;
    const c = vs(...Array.from(s.values()));
    c && this.pinchMove(o, c);
  }
  pinchMove(o, s) {
    const c = this.state, m = c._values[1], k = s.angle - m;
    let T = 0;
    Math.abs(k) > 270 && (T += Math.sign(k)), this.computeValues([s.distance, s.angle - 360 * T]), c.origin = s.origin, c.turns = T, c._movement = [c._values[0] / c._initial[0] - 1, c._values[1] - c._initial[1]], this.compute(o), this.emit();
  }
  touchEnd(o) {
    this.ctrl.setEventIds(o), this.state._active && this.state._touchIds.some((s) => !this.ctrl.touchIds.has(s)) && (this.state._active = !1, this.compute(o), this.emit());
  }
  pointerEnd(o) {
    const s = this.state;
    this.ctrl.setEventIds(o);
    try {
      o.target.releasePointerCapture(o.pointerId);
    } catch {
    }
    s._pointerEvents.has(o.pointerId) && s._pointerEvents.delete(o.pointerId), s._active && s._pointerEvents.size < 2 && (s._active = !1, this.compute(o), this.emit());
  }
  gestureStart(o) {
    o.cancelable && o.preventDefault();
    const s = this.state;
    s._active || (this.start(o), this.computeValues([o.scale, o.rotation]), s.origin = [o.clientX, o.clientY], this.compute(o), this.emit());
  }
  gestureMove(o) {
    if (o.cancelable && o.preventDefault(), !this.state._active) return;
    const s = this.state;
    this.computeValues([o.scale, o.rotation]), s.origin = [o.clientX, o.clientY];
    const c = s._movement;
    s._movement = [o.scale - 1, o.rotation], s._delta = xe.sub(s._movement, c), this.compute(o), this.emit();
  }
  gestureEnd(o) {
    this.state._active && (this.state._active = !1, this.compute(o), this.emit());
  }
  wheel(o) {
    const s = this.config.modifierKey;
    s && (Array.isArray(s) ? !s.find((c) => o[c]) : !o[s]) || (this.state._active ? this.wheelChange(o) : this.wheelStart(o), this.timeoutStore.add("wheelEnd", this.wheelEnd.bind(this)));
  }
  wheelStart(o) {
    this.start(o), this.wheelChange(o);
  }
  wheelChange(o) {
    "uv" in o || o.cancelable && o.preventDefault();
    const c = this.state;
    c._delta = [-Ec(o)[1] / dp * c.offset[0], 0], xe.addTo(c._movement, c._delta), Rc(c), this.state.origin = [o.clientX, o.clientY], this.compute(o), this.emit();
  }
  wheelEnd() {
    this.state._active && (this.state._active = !1, this.compute(), this.emit());
  }
  bind(o) {
    const s = this.config.device;
    s && (o(s, "start", this[s + "Start"].bind(this)), o(s, "change", this[s + "Move"].bind(this)), o(s, "end", this[s + "End"].bind(this)), o(s, "cancel", this[s + "End"].bind(this)), o("lostPointerCapture", "", this[s + "End"].bind(this))), this.config.pinchOnWheel && o("wheel", "", this.wheel.bind(this), {
      passive: !1
    });
  }
}
const hp = ze(ze({}, Pc), {}, {
  device(a, o, {
    shared: s,
    pointer: {
      touch: c = !1
    } = {}
  }) {
    if (s.target && !Lt.touch && Lt.gesture) return "gesture";
    if (Lt.touch && c) return "touch";
    if (Lt.touchscreen) {
      if (Lt.pointer) return "pointer";
      if (Lt.touch) return "touch";
    }
  },
  bounds(a, o, {
    scaleBounds: s = {},
    angleBounds: c = {}
  }) {
    const m = (T) => {
      const L = pc(El(s, T), {
        min: -1 / 0,
        max: 1 / 0
      });
      return [L.min, L.max];
    }, k = (T) => {
      const L = pc(El(c, T), {
        min: -1 / 0,
        max: 1 / 0
      });
      return [L.min, L.max];
    };
    return typeof s != "function" && typeof c != "function" ? [m(), k()] : (T) => [m(T), k(T)];
  },
  threshold(a, o, s) {
    return this.lockDirection = s.axis === "lock", xe.toVector(a, this.lockDirection ? [0.1, 3] : 0);
  },
  modifierKey(a) {
    return a === void 0 ? "ctrlKey" : a;
  },
  pinchOnWheel(a = !0) {
    return a;
  }
});
class mp extends ci {
  constructor(...o) {
    super(...o), Be(this, "ingKey", "moving");
  }
  move(o) {
    this.config.mouseOnly && o.pointerType !== "mouse" || (this.state._active ? this.moveChange(o) : this.moveStart(o), this.timeoutStore.add("moveEnd", this.moveEnd.bind(this)));
  }
  moveStart(o) {
    this.start(o), this.computeValues(Cr(o)), this.compute(o), this.computeInitial(), this.emit();
  }
  moveChange(o) {
    if (!this.state._active) return;
    const s = Cr(o), c = this.state;
    c._delta = xe.sub(s, c._values), xe.addTo(c._movement, c._delta), this.computeValues(s), this.compute(o), this.emit();
  }
  moveEnd(o) {
    this.state._active && (this.state._active = !1, this.compute(o), this.emit());
  }
  bind(o) {
    o("pointer", "change", this.move.bind(this)), o("pointer", "leave", this.moveEnd.bind(this));
  }
}
const vp = ze(ze({}, Gn), {}, {
  mouseOnly: (a = !0) => a
});
class yp extends ci {
  constructor(...o) {
    super(...o), Be(this, "ingKey", "scrolling");
  }
  scroll(o) {
    this.state._active || this.start(o), this.scrollChange(o), this.timeoutStore.add("scrollEnd", this.scrollEnd.bind(this));
  }
  scrollChange(o) {
    o.cancelable && o.preventDefault();
    const s = this.state, c = Wd(o);
    s._delta = xe.sub(c, s._values), xe.addTo(s._movement, s._delta), this.computeValues(c), this.compute(o), this.emit();
  }
  scrollEnd() {
    this.state._active && (this.state._active = !1, this.compute(), this.emit());
  }
  bind(o) {
    o("scroll", "", this.scroll.bind(this));
  }
}
const gp = Gn;
class wp extends ci {
  constructor(...o) {
    super(...o), Be(this, "ingKey", "wheeling");
  }
  wheel(o) {
    this.state._active || this.start(o), this.wheelChange(o), this.timeoutStore.add("wheelEnd", this.wheelEnd.bind(this));
  }
  wheelChange(o) {
    const s = this.state;
    s._delta = Ec(o), xe.addTo(s._movement, s._delta), Rc(s), this.compute(o), this.emit();
  }
  wheelEnd() {
    this.state._active && (this.state._active = !1, this.compute(), this.emit());
  }
  bind(o) {
    o("wheel", "", this.wheel.bind(this));
  }
}
const _p = Gn;
class Sp extends ci {
  constructor(...o) {
    super(...o), Be(this, "ingKey", "hovering");
  }
  enter(o) {
    this.config.mouseOnly && o.pointerType !== "mouse" || (this.start(o), this.computeValues(Cr(o)), this.compute(o), this.emit());
  }
  leave(o) {
    if (this.config.mouseOnly && o.pointerType !== "mouse") return;
    const s = this.state;
    if (!s._active) return;
    s._active = !1;
    const c = Cr(o);
    s._movement = s._delta = xe.sub(c, s._values), this.computeValues(c), this.compute(o), s.delta = s.movement, this.emit();
  }
  bind(o) {
    o("pointer", "enter", this.enter.bind(this)), o("pointer", "leave", this.leave.bind(this));
  }
}
const kp = ze(ze({}, Gn), {}, {
  mouseOnly: (a = !0) => a
}), ws = /* @__PURE__ */ new Map(), ys = /* @__PURE__ */ new Map();
function xp(a) {
  ws.set(a.key, a.engine), ys.set(a.key, a.resolver);
}
const Ep = {
  key: "drag",
  engine: Jd,
  resolver: cp
}, Cp = {
  key: "hover",
  engine: Sp,
  resolver: kp
}, Pp = {
  key: "move",
  engine: mp,
  resolver: vp
}, Tp = {
  key: "pinch",
  engine: pp,
  resolver: hp
}, Rp = {
  key: "scroll",
  engine: yp,
  resolver: gp
}, Np = {
  key: "wheel",
  engine: wp,
  resolver: _p
};
function Dp(a, o) {
  if (a == null) return {};
  var s = {}, c = Object.keys(a), m, k;
  for (k = 0; k < c.length; k++)
    m = c[k], !(o.indexOf(m) >= 0) && (s[m] = a[m]);
  return s;
}
function zp(a, o) {
  if (a == null) return {};
  var s = Dp(a, o), c, m;
  if (Object.getOwnPropertySymbols) {
    var k = Object.getOwnPropertySymbols(a);
    for (m = 0; m < k.length; m++)
      c = k[m], !(o.indexOf(c) >= 0) && Object.prototype.propertyIsEnumerable.call(a, c) && (s[c] = a[c]);
  }
  return s;
}
const Lp = {
  target(a) {
    if (a)
      return () => "current" in a ? a.current : a;
  },
  enabled(a = !0) {
    return a;
  },
  window(a = Lt.isBrowser ? window : void 0) {
    return a;
  },
  eventOptions({
    passive: a = !0,
    capture: o = !1
  } = {}) {
    return {
      passive: a,
      capture: o
    };
  },
  transform(a) {
    return a;
  }
}, Mp = ["target", "eventOptions", "window", "enabled", "transform"];
function xl(a = {}, o) {
  const s = {};
  for (const [c, m] of Object.entries(o))
    switch (typeof m) {
      case "function":
        s[c] = m.call(s, a[c], c, a);
        break;
      case "object":
        s[c] = xl(a[c], m);
        break;
      case "boolean":
        m && (s[c] = a[c]);
        break;
    }
  return s;
}
function Ip(a, o, s = {}) {
  const c = a, {
    target: m,
    eventOptions: k,
    window: T,
    enabled: L,
    transform: R
  } = c, z = zp(c, Mp);
  if (s.shared = xl({
    target: m,
    eventOptions: k,
    window: T,
    enabled: L,
    transform: R
  }, Lp), o) {
    const P = ys.get(o);
    s[o] = xl(ze({
      shared: s.shared
    }, z), P);
  } else
    for (const P in z) {
      const B = ys.get(P);
      B && (s[P] = xl(ze({
        shared: s.shared
      }, z[P]), B));
    }
  return s;
}
class Nc {
  constructor(o, s) {
    Be(this, "_listeners", /* @__PURE__ */ new Set()), this._ctrl = o, this._gestureKey = s;
  }
  add(o, s, c, m, k) {
    const T = this._listeners, L = $d(s, c), R = this._gestureKey ? this._ctrl.config[this._gestureKey].eventOptions : {}, z = ze(ze({}, R), k);
    o.addEventListener(L, m, z);
    const P = () => {
      o.removeEventListener(L, m, z), T.delete(P);
    };
    return T.add(P), P;
  }
  clean() {
    this._listeners.forEach((o) => o()), this._listeners.clear();
  }
}
class Op {
  constructor() {
    Be(this, "_timeouts", /* @__PURE__ */ new Map());
  }
  add(o, s, c = 140, ...m) {
    this.remove(o), this._timeouts.set(o, window.setTimeout(s, c, ...m));
  }
  remove(o) {
    const s = this._timeouts.get(o);
    s && window.clearTimeout(s);
  }
  clean() {
    this._timeouts.forEach((o) => void window.clearTimeout(o)), this._timeouts.clear();
  }
}
class Ap {
  constructor(o) {
    Be(this, "gestures", /* @__PURE__ */ new Set()), Be(this, "_targetEventStore", new Nc(this)), Be(this, "gestureEventStores", {}), Be(this, "gestureTimeoutStores", {}), Be(this, "handlers", {}), Be(this, "config", {}), Be(this, "pointerIds", /* @__PURE__ */ new Set()), Be(this, "touchIds", /* @__PURE__ */ new Set()), Be(this, "state", {
      shared: {
        shiftKey: !1,
        metaKey: !1,
        ctrlKey: !1,
        altKey: !1
      }
    }), jp(this, o);
  }
  setEventIds(o) {
    if (Cl(o))
      return this.touchIds = new Set(Bd(o)), this.touchIds;
    if ("pointerId" in o)
      return o.type === "pointerup" || o.type === "pointercancel" ? this.pointerIds.delete(o.pointerId) : o.type === "pointerdown" && this.pointerIds.add(o.pointerId), this.pointerIds;
  }
  applyHandlers(o, s) {
    this.handlers = o, this.nativeHandlers = s;
  }
  applyConfig(o, s) {
    this.config = Ip(o, s, this.config);
  }
  clean() {
    this._targetEventStore.clean();
    for (const o of this.gestures)
      this.gestureEventStores[o].clean(), this.gestureTimeoutStores[o].clean();
  }
  effect() {
    return this.config.shared.target && this.bind(), () => this._targetEventStore.clean();
  }
  bind(...o) {
    const s = this.config.shared, c = {};
    let m;
    if (!(s.target && (m = s.target(), !m))) {
      if (s.enabled) {
        for (const T of this.gestures) {
          const L = this.config[T], R = yc(c, L.eventOptions, !!m);
          if (L.enabled) {
            const z = ws.get(T);
            new z(this, o, T).bind(R);
          }
        }
        const k = yc(c, s.eventOptions, !!m);
        for (const T in this.nativeHandlers)
          k(T, "", (L) => this.nativeHandlers[T](ze(ze({}, this.state.shared), {}, {
            event: L,
            args: o
          })), void 0, !0);
      }
      for (const k in c)
        c[k] = Kd(...c[k]);
      if (!m) return c;
      for (const k in c) {
        const {
          device: T,
          capture: L,
          passive: R
        } = Ud(k);
        this._targetEventStore.add(m, T, "", c[k], {
          capture: L,
          passive: R
        });
      }
    }
  }
}
function xr(a, o) {
  a.gestures.add(o), a.gestureEventStores[o] = new Nc(a, o), a.gestureTimeoutStores[o] = new Op();
}
function jp(a, o) {
  o.drag && xr(a, "drag"), o.wheel && xr(a, "wheel"), o.scroll && xr(a, "scroll"), o.move && xr(a, "move"), o.pinch && xr(a, "pinch"), o.hover && xr(a, "hover");
}
const yc = (a, o, s) => (c, m, k, T = {}, L = !1) => {
  var R, z;
  const P = (R = T.capture) !== null && R !== void 0 ? R : o.capture, B = (z = T.passive) !== null && z !== void 0 ? z : o.passive;
  let Y = L ? c : jd(c, m, P);
  s && B && (Y += "Passive"), a[Y] = a[Y] || [], a[Y].push(k);
}, Fp = /^on(Drag|Wheel|Scroll|Move|Pinch|Hover)/;
function Up(a) {
  const o = {}, s = {}, c = /* @__PURE__ */ new Set();
  for (let m in a)
    Fp.test(m) ? (c.add(RegExp.lastMatch), s[m] = a[m]) : o[m] = a[m];
  return [s, o, c];
}
function Er(a, o, s, c, m, k) {
  if (!a.has(s) || !ws.has(c))
    return;
  const T = s + "Start", L = s + "End", R = (z) => {
    let P;
    return z.first && T in o && o[T](z), s in o && (P = o[s](z)), z.last && L in o && o[L](z), P;
  };
  m[c] = R, k[c] = k[c] || {};
}
function $p(a, o) {
  const [s, c, m] = Up(a), k = {};
  return Er(m, s, "onDrag", "drag", k, o), Er(m, s, "onWheel", "wheel", k, o), Er(m, s, "onScroll", "scroll", k, o), Er(m, s, "onPinch", "pinch", k, o), Er(m, s, "onMove", "move", k, o), Er(m, s, "onHover", "hover", k, o), {
    handlers: k,
    config: o,
    nativeHandlers: c
  };
}
function Vp(a, o = {}, s, c) {
  const m = cs.useMemo(() => new Ap(a), []);
  if (m.applyHandlers(a, c), m.applyConfig(o, s), cs.useEffect(m.effect.bind(m)), cs.useEffect(() => m.clean.bind(m), []), o.target === void 0)
    return m.bind.bind(m);
}
function Hp(a) {
  return a.forEach(xp), function(s, c) {
    const {
      handlers: m,
      nativeHandlers: k,
      config: T
    } = $p(s, c || {});
    return Vp(m, T, void 0, k);
  };
}
function Bp(a, o) {
  return Hp([Ep, Tp, Rp, Np, Pp, Cp])(a, o || {});
}
const Wp = [
  {
    src: "https://images.unsplash.com/photo-1755331039789-7e5680e26e8f?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Abstract art"
  },
  {
    src: "https://images.unsplash.com/photo-1755569309049-98410b94f66d?q=80&w=772&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Modern sculpture"
  },
  {
    src: "https://images.unsplash.com/photo-1755497595318-7e5e3523854f?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Digital artwork"
  },
  {
    src: "https://images.unsplash.com/photo-1755353985163-c2a0fe5ac3d8?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Contemporary art"
  },
  {
    src: "https://images.unsplash.com/photo-1745965976680-d00be7dc0377?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Geometric pattern"
  },
  {
    src: "https://images.unsplash.com/photo-1752588975228-21f44630bb3c?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Textured surface"
  },
  {
    src: "https://pbs.twimg.com/media/Gyla7NnXMAAXSo_?format=jpg&name=large",
    alt: "Social media image"
  }
], kl = {
  maxVerticalRotationDeg: 5,
  dragSensitivity: 20,
  enlargeTransitionMs: 300,
  segments: 35
}, Qn = (a, o, s) => Math.min(Math.max(a, o), s), gc = (a) => (a % 360 + 360) % 360, wc = (a) => ((a + 180) % 360 + 360) % 360 - 180, zn = (a, o, s) => {
  const c = a.dataset[o] ?? a.getAttribute(`data-${o}`), m = c == null ? NaN : parseFloat(c);
  return Number.isFinite(m) ? m : s;
};
function Yp(a, o) {
  const s = Array.from({ length: o }, (z, P) => -37 + P * 2), c = [-4, -2, 0, 2, 4], m = [-3, -1, 1, 3, 5], k = s.flatMap((z, P) => (P % 2 === 0 ? c : m).map((Y) => ({ x: z, y: Y, sizeX: 2, sizeY: 2 }))), T = k.length;
  if (a.length === 0)
    return k.map((z) => ({ ...z, src: "", alt: "" }));
  a.length > T && console.warn(
    `[DomeGallery] Provided image count (${a.length}) exceeds available tiles (${T}). Some images will not be shown.`
  );
  const L = a.map((z) => typeof z == "string" ? { src: z, alt: "" } : { src: z.src || "", alt: z.alt || "" }), R = Array.from({ length: T }, (z, P) => L[P % L.length]);
  for (let z = 1; z < R.length; z++)
    if (R[z].src === R[z - 1].src) {
      for (let P = z + 1; P < R.length; P++)
        if (R[P].src !== R[z].src) {
          const B = R[z];
          R[z] = R[P], R[P] = B;
          break;
        }
    }
  return k.map((z, P) => ({
    ...z,
    src: R[P].src,
    alt: R[P].alt
  }));
}
function _c(a, o, s, c, m) {
  const k = 360 / m / 2, T = k * (a + (s - 1) / 2);
  return { rotateX: k * (o - (c - 1) / 2), rotateY: T };
}
const Xp = Z.forwardRef(function({
  images: o = Wp,
  fit: s = 0.5,
  fitBasis: c = "auto",
  minRadius: m = 600,
  maxRadius: k = 1 / 0,
  padFactor: T = 0.25,
  overlayBlurColor: L = "#120F17",
  maxVerticalRotationDeg: R = kl.maxVerticalRotationDeg,
  dragSensitivity: z = kl.dragSensitivity,
  enlargeTransitionMs: P = kl.enlargeTransitionMs,
  segments: B = kl.segments,
  dragDampening: Y = 2,
  openedImageWidth: Te = "400px",
  openedImageHeight: Re = "400px",
  imageBorderRadius: ne = "30px",
  openedImageBorderRadius: Q = "30px",
  grayscale: Oe = !0,
  onImageClick: $e,
  onDragMove: et,
  onLongPress: Ae,
  onLongPressEnd: Ke,
  longPressMs: we = 500
}, Qe) {
  const Le = Z.useRef(null), pt = Z.useRef(null), je = Z.useRef(null), Ct = Z.useRef(null), ct = Z.useRef(null), it = Z.useRef(null), Ve = Z.useRef(null), ht = Z.useRef(null), ae = Z.useRef({ x: 0, y: 0 }), me = Z.useRef({ x: 0, y: 0 }), C = Z.useRef(null), j = Z.useRef(!1), N = Z.useRef(!1), h = Z.useRef(!1), w = Z.useRef(null), H = Z.useRef("mouse"), X = Z.useRef(null), K = Z.useRef(!1), te = Z.useRef(0), ue = Z.useRef(0), ee = Z.useRef(null), le = Z.useRef(!1), Ge = Z.useRef(null), Ln = 10, Kt = Z.useCallback(() => {
    ee.current !== null && (window.clearTimeout(ee.current), ee.current = null);
  }, []), ln = Z.useCallback(() => {
    Kt(), le.current && (le.current = !1, Ke == null || Ke());
  }, [Kt, Ke]), on = Z.useRef(!1), Pr = Z.useCallback(() => {
    on.current || (on.current = !0, document.body.classList.add("dg-scroll-lock"));
  }, []), Tr = Z.useCallback(() => {
    var F;
    on.current && ((F = Le.current) == null ? void 0 : F.getAttribute("data-enlarging")) !== "true" && (on.current = !1, document.body.classList.remove("dg-scroll-lock"));
  }, []), Rr = Z.useMemo(() => Yp(o, B), [o, B]), Qt = (F, b) => {
    const G = je.current;
    G && (G.style.transform = `translateZ(calc(var(--radius) * -1)) rotateX(${F}deg) rotateY(${b}deg)`);
  };
  Z.useImperativeHandle(
    Qe,
    () => ({
      focusOn: (F) => {
        var Ce;
        const b = (Ce = je.current) == null ? void 0 : Ce.querySelectorAll("[data-src]");
        if (!b) return;
        let G = null;
        for (const ce of Array.from(b))
          if (ce.dataset.src === F) {
            G = ce;
            break;
          }
        if (!G) return;
        const q = zn(G, "offsetX", 0), re = zn(G, "offsetY", 0), de = zn(G, "sizeX", 2), ve = zn(G, "sizeY", 2), _e = _c(q, re, de, ve, B), Ee = Qn(-_e.rotateX, -R, R), ye = wc(-_e.rotateY);
        ae.current = { x: Ee, y: ye }, je.current && (je.current.style.transition = "transform 600ms ease"), Qt(Ee, ye), window.setTimeout(() => {
          je.current && (je.current.style.transition = "");
        }, 650);
      },
      resetRotation: () => {
        ae.current = { x: 0, y: 0 }, je.current && (je.current.style.transition = "transform 600ms ease"), Qt(0, 0), window.setTimeout(() => {
          je.current && (je.current.style.transition = "");
        }, 650);
      }
    }),
    [B, R]
  );
  const qn = Z.useRef(null);
  Z.useEffect(() => {
    const F = Le.current;
    if (!F) return;
    const b = new ResizeObserver((G) => {
      var pe;
      const q = G[0].contentRect, re = Math.max(1, q.width), de = Math.max(1, q.height), ve = Math.min(re, de), _e = Math.max(re, de), Ee = re / de;
      let ye;
      switch (c) {
        case "min":
          ye = ve;
          break;
        case "max":
          ye = _e;
          break;
        case "width":
          ye = re;
          break;
        case "height":
          ye = de;
          break;
        default:
          ye = Ee >= 1.3 ? re : ve;
      }
      let Ce = ye * s;
      const ce = de * 1.35;
      Ce = Math.min(Ce, ce), Ce = Qn(Ce, m, k), qn.current = Math.round(Ce);
      const oe = Math.max(8, Math.round(ve * T));
      F.style.setProperty("--radius", `${qn.current}px`), F.style.setProperty("--viewer-pad", `${oe}px`), F.style.setProperty("--overlay-blur-color", L), F.style.setProperty("--tile-radius", ne), F.style.setProperty("--enlarge-radius", Q), F.style.setProperty("--image-filter", Oe ? "grayscale(1)" : "none"), Qt(ae.current.x, ae.current.y);
      const Me = (pe = ct.current) == null ? void 0 : pe.querySelector(".enlarge");
      if (Me && Ct.current && pt.current) {
        const W = Ct.current.getBoundingClientRect(), qe = pt.current.getBoundingClientRect();
        if (Te && Re) {
          const he = document.createElement("div");
          he.style.cssText = `position: absolute; width: ${Te}; height: ${Re}; visibility: hidden;`, document.body.appendChild(he);
          const We = he.getBoundingClientRect();
          document.body.removeChild(he);
          const an = W.left - qe.left + (W.width - We.width) / 2, Mt = W.top - qe.top + (W.height - We.height) / 2;
          Me.style.left = `${an}px`, Me.style.top = `${Mt}px`;
        } else
          Me.style.left = `${W.left - qe.left}px`, Me.style.top = `${W.top - qe.top}px`, Me.style.width = `${W.width}px`, Me.style.height = `${W.height}px`;
      }
    });
    return b.observe(F), () => b.disconnect();
  }, [
    s,
    c,
    m,
    k,
    T,
    L,
    Oe,
    ne,
    Q,
    Te,
    Re
  ]), Z.useEffect(() => {
    Qt(ae.current.x, ae.current.y);
  }, []);
  const Gt = Z.useCallback(() => {
    w.current && (cancelAnimationFrame(w.current), w.current = null);
  }, []), sn = Z.useCallback(
    (F, b) => {
      let q = Qn(F, -1.4, 1.4) * 80, re = Qn(b, -1.4, 1.4) * 80, de = 0;
      const ve = Qn(Y ?? 0.6, 0, 1), _e = 0.94 + 0.055 * ve, Ee = 0.015 - 0.01 * ve, ye = Math.round(90 + 270 * ve), Ce = () => {
        if (q *= _e, re *= _e, Math.abs(q) < Ee && Math.abs(re) < Ee) {
          w.current = null;
          return;
        }
        if (++de > ye) {
          w.current = null;
          return;
        }
        const ce = Qn(ae.current.x - re / 200, -R, R), oe = wc(ae.current.y + q / 200);
        ae.current = { x: ce, y: oe }, Qt(ce, oe), w.current = requestAnimationFrame(Ce);
      };
      Gt(), w.current = requestAnimationFrame(Ce);
    },
    [Y, R, Gt]
  );
  Bp(
    {
      onDragStart: ({ event: F }) => {
        var q, re;
        if (Ve.current) return;
        Gt();
        const b = F;
        H.current = b.pointerType || "mouse", H.current === "touch" && b.preventDefault(), H.current === "touch" && Pr(), j.current = !0, N.current = !1, h.current = !1, me.current = { ...ae.current }, C.current = { x: b.clientX, y: b.clientY };
        const G = (re = (q = b.target).closest) == null ? void 0 : re.call(q, ".item__image");
        X.current = G || null;
      },
      onDrag: ({ event: F, last: b, velocity: G = [0, 0], direction: q = [0, 0], movement: re }) => {
        if (Ve.current || !j.current || !C.current) return;
        const de = F;
        H.current === "touch" && de.preventDefault();
        const ve = de.clientX - C.current.x, _e = de.clientY - C.current.y;
        h.current || ve * ve + _e * _e > 16 && (h.current = !0, et == null || et());
        const Ee = Qn(
          me.current.x - _e / z,
          -R,
          R
        ), ye = me.current.y + ve / z, Ce = ae.current;
        if ((Ce.x !== Ee || Ce.y !== ye) && (ae.current = { x: Ee, y: ye }, Qt(Ee, ye)), b) {
          j.current = !1;
          let ce = !1;
          if (C.current) {
            const he = de.clientX - C.current.x, We = de.clientY - C.current.y, an = he * he + We * We, Mt = H.current === "touch" ? 10 : 6;
            an <= Mt * Mt && (ce = !0);
          }
          let [oe, Me] = G;
          const [pe, W] = q;
          let qe = oe * pe, tt = Me * W;
          if (!ce && Math.abs(qe) < 1e-3 && Math.abs(tt) < 1e-3 && Array.isArray(re)) {
            const [he, We] = re;
            qe = he / z * 0.02, tt = We / z * 0.02;
          }
          if (!ce && (Math.abs(qe) > 5e-3 || Math.abs(tt) > 5e-3) && sn(qe, tt), C.current = null, N.current = !ce, ce && X.current && !Ve.current)
            if ($e) {
              const he = X.current.parentElement, We = (he == null ? void 0 : he.dataset.src) || "";
              We && $e(We);
            } else
              un(X.current);
          X.current = null, N.current && setTimeout(() => N.current = !1, 120), H.current === "touch" && Tr(), h.current && (ue.current = performance.now()), h.current = !1;
        }
      }
    },
    { target: pt, eventOptions: { passive: !1 } }
  ), Z.useEffect(() => {
    const F = it.current;
    if (!F) return;
    const b = () => {
      var W, qe;
      if (performance.now() - te.current < 250) return;
      const q = Ve.current;
      if (!q) return;
      const re = q.parentElement, de = (W = ct.current) == null ? void 0 : W.querySelector(".enlarge");
      if (!de) return;
      const ve = re.querySelector(".item__image--reference"), _e = ht.current;
      if (!_e) {
        de.remove(), ve && ve.remove(), re.style.setProperty("--rot-y-delta", "0deg"), re.style.setProperty("--rot-x-delta", "0deg"), q.style.visibility = "", q.style.zIndex = 0, Ve.current = null, (qe = Le.current) == null || qe.removeAttribute("data-enlarging"), K.current = !1;
        return;
      }
      const Ee = de.getBoundingClientRect(), ye = Le.current.getBoundingClientRect(), Ce = {
        left: _e.left - ye.left,
        top: _e.top - ye.top,
        width: _e.width,
        height: _e.height
      }, ce = {
        left: Ee.left - ye.left,
        top: Ee.top - ye.top,
        width: Ee.width,
        height: Ee.height
      }, oe = document.createElement("div");
      oe.className = "enlarge-closing", oe.style.cssText = `
        position: absolute;
        left: ${ce.left}px;
        top: ${ce.top}px;
        width: ${ce.width}px;
        height: ${ce.height}px;
        z-index: 9999;
        border-radius: ${Q};
        overflow: hidden;
        box-shadow: 0 10px 30px rgba(0,0,0,.35);
        transition: all ${P}ms ease-out;
        pointer-events: none;
        margin: 0;
        transform: none;
        filter: ${Oe ? "grayscale(1)" : "none"};
      `;
      const Me = de.querySelector("img");
      if (Me) {
        const tt = Me.cloneNode();
        tt.style.cssText = "width: 100%; height: 100%; object-fit: cover;", oe.appendChild(tt);
      }
      de.remove(), Le.current.appendChild(oe), oe.getBoundingClientRect(), requestAnimationFrame(() => {
        oe.style.left = Ce.left + "px", oe.style.top = Ce.top + "px", oe.style.width = Ce.width + "px", oe.style.height = Ce.height + "px", oe.style.opacity = "0";
      });
      const pe = () => {
        oe.remove(), ht.current = null, ve && ve.remove(), re.style.transition = "none", q.style.transition = "none", re.style.setProperty("--rot-y-delta", "0deg"), re.style.setProperty("--rot-x-delta", "0deg"), requestAnimationFrame(() => {
          var tt;
          q.style.visibility = "", q.style.opacity = "0", q.style.zIndex = 0, Ve.current = null, (tt = Le.current) == null || tt.removeAttribute("data-enlarging"), requestAnimationFrame(() => {
            re.style.transition = "", q.style.transition = "opacity 300ms ease-out", requestAnimationFrame(() => {
              q.style.opacity = "1", setTimeout(() => {
                var he;
                q.style.transition = "", q.style.opacity = "", K.current = !1, !j.current && ((he = Le.current) == null ? void 0 : he.getAttribute("data-enlarging")) !== "true" && document.body.classList.remove("dg-scroll-lock");
              }, 300);
            });
          });
        });
      };
      oe.addEventListener("transitionend", pe, {
        once: !0
      });
    };
    F.addEventListener("click", b);
    const G = (q) => {
      q.key === "Escape" && b();
    };
    return window.addEventListener("keydown", G), () => {
      F.removeEventListener("click", b), window.removeEventListener("keydown", G);
    };
  }, [P, Q, Oe]);
  const un = (F) => {
    var Nr, cn, Jn, fn;
    if (K.current) return;
    K.current = !0, te.current = performance.now(), Pr();
    const b = F.parentElement;
    Ve.current = F, F.setAttribute("data-focused", "true");
    const G = zn(b, "offsetX", 0), q = zn(b, "offsetY", 0), re = zn(b, "sizeX", 2), de = zn(b, "sizeY", 2), ve = _c(G, q, re, de, B), _e = gc(ve.rotateY), Ee = gc(ae.current.y);
    let ye = -(_e + Ee) % 360;
    ye < -180 && (ye += 360);
    const Ce = -ve.rotateX - ae.current.x;
    b.style.setProperty("--rot-y-delta", `${ye}deg`), b.style.setProperty("--rot-x-delta", `${Ce}deg`);
    const ce = document.createElement("div");
    ce.className = "item__image item__image--reference opacity-0", ce.style.transform = `rotateX(${-ve.rotateX}deg) rotateY(${-ve.rotateY}deg)`, b.appendChild(ce), ce.offsetHeight;
    const oe = ce.getBoundingClientRect(), Me = (Nr = pt.current) == null ? void 0 : Nr.getBoundingClientRect(), pe = (cn = Ct.current) == null ? void 0 : cn.getBoundingClientRect();
    if (!Me || !pe || oe.width <= 0 || oe.height <= 0) {
      K.current = !1, Ve.current = null, b.removeChild(ce), Tr();
      return;
    }
    ht.current = {
      left: oe.left,
      top: oe.top,
      width: oe.width,
      height: oe.height
    }, F.style.visibility = "hidden", F.style.zIndex = 0;
    const W = document.createElement("div");
    W.className = "enlarge", W.style.cssText = `position:absolute; left:${pe.left - Me.left}px; top:${pe.top - Me.top}px; width:${pe.width}px; height:${pe.height}px; opacity:0; z-index:30; will-change:transform,opacity; transform-origin:top left; transition:transform ${P}ms ease, opacity ${P}ms ease; border-radius:${Q}; overflow:hidden; box-shadow:0 10px 30px rgba(0,0,0,.35);`;
    const qe = b.dataset.src || ((Jn = F.querySelector("img")) == null ? void 0 : Jn.src) || "", tt = b.dataset.alt || ((fn = F.querySelector("img")) == null ? void 0 : fn.alt) || "", he = document.createElement("img");
    he.src = qe, he.alt = tt, he.style.cssText = `width:100%; height:100%; object-fit:cover; filter:${Oe ? "grayscale(1)" : "none"};`, W.appendChild(he), ct.current.appendChild(W);
    const We = oe.left - pe.left, an = oe.top - pe.top, Mt = oe.width / pe.width, Zn = oe.height / pe.height, di = isFinite(Mt) && Mt > 0 ? Mt : 1, pi = isFinite(Zn) && Zn > 0 ? Zn : 1;
    if (W.style.transform = `translate(${We}px, ${an}px) scale(${di}, ${pi})`, setTimeout(() => {
      var Mn;
      W.parentElement && (W.style.opacity = "1", W.style.transform = "translate(0px, 0px) scale(1, 1)", (Mn = Le.current) == null || Mn.setAttribute("data-enlarging", "true"));
    }, 16), Te || Re) {
      const Mn = (In) => {
        if (In.propertyName !== "transform") return;
        W.removeEventListener("transitionend", Mn);
        const bn = W.style.transition;
        W.style.transition = "none";
        const On = Te || `${pe.width}px`, er = Re || `${pe.height}px`;
        W.style.width = On, W.style.height = er;
        const mi = W.getBoundingClientRect();
        W.style.width = pe.width + "px", W.style.height = pe.height + "px", W.offsetWidth, W.style.transition = `left ${P}ms ease, top ${P}ms ease, width ${P}ms ease, height ${P}ms ease`;
        const Pl = pe.left - Me.left + (pe.width - mi.width) / 2, Tl = pe.top - Me.top + (pe.height - mi.height) / 2;
        requestAnimationFrame(() => {
          W.style.left = `${Pl}px`, W.style.top = `${Tl}px`, W.style.width = On, W.style.height = er;
        });
        const Vt = () => {
          W.removeEventListener("transitionend", Vt), W.style.transition = bn;
        };
        W.addEventListener("transitionend", Vt, {
          once: !0
        });
      };
      W.addEventListener("transitionend", Mn);
    }
  };
  return Z.useEffect(() => () => {
    document.body.classList.remove("dg-scroll-lock"), Kt();
  }, [Kt]), /* @__PURE__ */ at.jsx(at.Fragment, { children: /* @__PURE__ */ at.jsx(
    "div",
    {
      ref: Le,
      className: "sphere-root",
      style: {
        "--segments-x": B,
        "--segments-y": B,
        "--overlay-blur-color": L,
        "--tile-radius": ne,
        "--enlarge-radius": Q,
        "--image-filter": Oe ? "grayscale(1)" : "none"
      },
      children: /* @__PURE__ */ at.jsxs(
        "main",
        {
          ref: pt,
          className: "dg-main",
          style: {
            touchAction: "none",
            WebkitUserSelect: "none"
          },
          children: [
            /* @__PURE__ */ at.jsx("div", { className: "stage", children: /* @__PURE__ */ at.jsx("div", { ref: je, className: "sphere", children: Rr.map((F, b) => /* @__PURE__ */ at.jsx(
              "div",
              {
                className: "sphere-item dg-sphere-item-pos",
                "data-src": F.src,
                "data-alt": F.alt,
                "data-offset-x": F.x,
                "data-offset-y": F.y,
                "data-size-x": F.sizeX,
                "data-size-y": F.sizeY,
                style: {
                  "--offset-x": F.x,
                  "--offset-y": F.y,
                  "--item-size-x": F.sizeX,
                  "--item-size-y": F.sizeY,
                  top: "-999px",
                  bottom: "-999px",
                  left: "-999px",
                  right: "-999px"
                },
                children: /* @__PURE__ */ at.jsx(
                  "div",
                  {
                    className: "item__image",
                    role: "button",
                    tabIndex: 0,
                    "aria-label": F.alt || "Open image",
                    onClick: (G) => {
                      if (le.current) {
                        le.current = !1;
                        return;
                      }
                      if (!j.current && !h.current && !(performance.now() - ue.current < 80)) {
                        if ($e) {
                          $e(F.src);
                          return;
                        }
                        K.current || un(G.currentTarget);
                      }
                    },
                    onPointerDown: (G) => {
                      if (!Ae) return;
                      le.current = !1, Ge.current = { x: G.clientX, y: G.clientY }, Kt();
                      const q = F.src;
                      ee.current = window.setTimeout(() => {
                        ee.current = null, !(j.current || h.current) && (le.current = !0, Ae(q));
                      }, we);
                    },
                    onPointerMove: (G) => {
                      if (ee.current === null || !Ge.current) return;
                      const q = G.clientX - Ge.current.x, re = G.clientY - Ge.current.y;
                      q * q + re * re > Ln * Ln && Kt();
                    },
                    onPointerUp: (G) => {
                      const q = le.current;
                      ln(), !q && G.nativeEvent.pointerType === "touch" && (j.current || h.current || performance.now() - ue.current < 80 || $e || K.current || un(G.currentTarget));
                    },
                    onPointerLeave: ln,
                    onPointerCancel: ln,
                    onKeyDown: (G) => {
                      if (!(G.key !== "Enter" && G.key !== " ")) {
                        if (G.preventDefault(), $e) {
                          $e(F.src);
                          return;
                        }
                        K.current || un(G.currentTarget);
                      }
                    },
                    style: {
                      inset: "10px",
                      borderRadius: `var(--tile-radius, ${ne})`,
                      backfaceVisibility: "hidden"
                    },
                    children: /* @__PURE__ */ at.jsx(
                      "img",
                      {
                        src: F.src,
                        draggable: !1,
                        alt: F.alt,
                        className: "dg-tile-img",
                        style: {
                          backfaceVisibility: "hidden",
                          filter: `var(--image-filter, ${Oe ? "grayscale(1)" : "none"})`
                        }
                      }
                    )
                  }
                )
              },
              `${F.x},${F.y},${b}`
            )) }) }),
            /* @__PURE__ */ at.jsx(
              "div",
              {
                className: "dg-overlay-radial",
                style: {
                  backgroundImage: `radial-gradient(rgba(235, 235, 235, 0) 65%, var(--overlay-blur-color, ${L}) 100%)`
                }
              }
            ),
            /* @__PURE__ */ at.jsx(
              "div",
              {
                className: "dg-overlay-radial",
                style: {
                  WebkitMaskImage: `radial-gradient(rgba(235, 235, 235, 0) 70%, var(--overlay-blur-color, ${L}) 90%)`,
                  maskImage: `radial-gradient(rgba(235, 235, 235, 0) 70%, var(--overlay-blur-color, ${L}) 90%)`,
                  backdropFilter: "blur(3px)"
                }
              }
            ),
            /* @__PURE__ */ at.jsx(
              "div",
              {
                className: "dg-edge-top",
                style: {
                  background: `linear-gradient(to bottom, transparent, var(--overlay-blur-color, ${L}))`
                }
              }
            ),
            /* @__PURE__ */ at.jsx(
              "div",
              {
                className: "dg-edge-bottom",
                style: {
                  background: `linear-gradient(to bottom, transparent, var(--overlay-blur-color, ${L}))`
                }
              }
            ),
            /* @__PURE__ */ at.jsxs("div", { ref: ct, className: "dg-viewer", style: { padding: "var(--viewer-pad)" }, children: [
              /* @__PURE__ */ at.jsx(
                "div",
                {
                  ref: it,
                  className: "scrim dg-scrim",
                  style: {
                    background: "rgba(0, 0, 0, 0.4)",
                    backdropFilter: "blur(3px)"
                  }
                }
              ),
              /* @__PURE__ */ at.jsx(
                "div",
                {
                  ref: Ct,
                  className: "viewer-frame dg-viewer-frame",
                  style: {
                    borderRadius: `var(--enlarge-radius, ${Q})`
                  }
                }
              )
            ] })
          ]
        }
      )
    }
  ) });
});
function Kp(a, o) {
  const s = { current: null }, c = Rd.createRoot(a);
  return c.render(
    Z.createElement(Xp, {
      ref: (m) => {
        s.current = m;
      },
      images: o.images,
      onImageClick: o.onImageClick,
      onDragMove: o.onDragMove,
      onLongPress: o.onLongPress,
      onLongPressEnd: o.onLongPressEnd,
      fit: o.fit ?? 0.8,
      minRadius: o.minRadius ?? 900,
      // Locked back to 0 (no vertical tilt) per explicit request, reverting
      // an earlier "unlock vertical drag" change: dragging vertically must
      // not reveal blank space above/below the tile band.
      maxVerticalRotationDeg: o.maxVerticalRotationDeg ?? 0,
      segments: o.segments ?? 34,
      dragDampening: o.dragDampening ?? 2,
      grayscale: o.grayscale ?? !1
    })
  ), {
    focusOn: (m) => {
      var k;
      return (k = s.current) == null ? void 0 : k.focusOn(m);
    },
    resetRotation: () => {
      var m;
      return (m = s.current) == null ? void 0 : m.resetRotation();
    },
    unmount: () => c.unmount()
  };
}
export {
  Kp as mountDomeGallery
};
