function Sd(a) {
  return a && a.__esModule && Object.prototype.hasOwnProperty.call(a, "default") ? a.default : a;
}
var ls = { exports: {} }, Q = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Ka;
function kd() {
  if (Ka) return Q;
  Ka = 1;
  var a = Symbol.for("react.element"), o = Symbol.for("react.portal"), s = Symbol.for("react.fragment"), c = Symbol.for("react.strict_mode"), m = Symbol.for("react.profiler"), k = Symbol.for("react.provider"), P = Symbol.for("react.context"), L = Symbol.for("react.forward_ref"), R = Symbol.for("react.suspense"), D = Symbol.for("react.memo"), T = Symbol.for("react.lazy"), H = Symbol.iterator;
  function B(h) {
    return h === null || typeof h != "object" ? null : (h = H && h[H] || h["@@iterator"], typeof h == "function" ? h : null);
  }
  var Te = { isMounted: function() {
    return !1;
  }, enqueueForceUpdate: function() {
  }, enqueueReplaceState: function() {
  }, enqueueSetState: function() {
  } }, Pe = Object.assign, te = {};
  function K(h, w, W) {
    this.props = h, this.context = w, this.refs = te, this.updater = W || Te;
  }
  K.prototype.isReactComponent = {}, K.prototype.setState = function(h, w) {
    if (typeof h != "object" && typeof h != "function" && h != null) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
    this.updater.enqueueSetState(this, h, w, "setState");
  }, K.prototype.forceUpdate = function(h) {
    this.updater.enqueueForceUpdate(this, h, "forceUpdate");
  };
  function Oe() {
  }
  Oe.prototype = K.prototype;
  function Ue(h, w, W) {
    this.props = h, this.context = w, this.refs = te, this.updater = W || Te;
  }
  var ct = Ue.prototype = new Oe();
  ct.constructor = Ue, Pe(ct, K.prototype), ct.isPureReactComponent = !0;
  var pe = Array.isArray, We = Object.prototype.hasOwnProperty, q = { current: null }, Ae = { key: !0, ref: !0, __self: !0, __source: !0 };
  function be(h, w, W) {
    var X, J = {}, b = null, he = null;
    if (w != null) for (X in w.ref !== void 0 && (he = w.ref), w.key !== void 0 && (b = "" + w.key), w) We.call(w, X) && !Ae.hasOwnProperty(X) && (J[X] = w[X]);
    var Z = arguments.length - 2;
    if (Z === 1) J.children = W;
    else if (1 < Z) {
      for (var me = Array(Z), nt = 0; nt < Z; nt++) me[nt] = arguments[nt + 2];
      J.children = me;
    }
    if (h && h.defaultProps) for (X in Z = h.defaultProps, Z) J[X] === void 0 && (J[X] = Z[X]);
    return { $$typeof: a, type: h, key: b, ref: he, props: J, _owner: q.current };
  }
  function Dt(h, w) {
    return { $$typeof: a, type: h.type, key: w, ref: h.ref, props: h.props, _owner: h._owner };
  }
  function Ge(h) {
    return typeof h == "object" && h !== null && h.$$typeof === a;
  }
  function Lt(h) {
    var w = { "=": "=0", ":": "=2" };
    return "$" + h.replace(/[=:]/g, function(W) {
      return w[W];
    });
  }
  var _e = /\/+/g;
  function et(h, w) {
    return typeof h == "object" && h !== null && h.key != null ? Lt("" + h.key) : w.toString(36);
  }
  function $e(h, w, W, X, J) {
    var b = typeof h;
    (b === "undefined" || b === "boolean") && (h = null);
    var he = !1;
    if (h === null) he = !0;
    else switch (b) {
      case "string":
      case "number":
        he = !0;
        break;
      case "object":
        switch (h.$$typeof) {
          case a:
          case o:
            he = !0;
        }
    }
    if (he) return he = h, J = J(he), h = X === "" ? "." + et(he, 0) : X, pe(J) ? (W = "", h != null && (W = h.replace(_e, "$&/") + "/"), $e(J, w, W, "", function(nt) {
      return nt;
    })) : J != null && (Ge(J) && (J = Dt(J, W + (!J.key || he && he.key === J.key ? "" : ("" + J.key).replace(_e, "$&/") + "/") + h)), w.push(J)), 1;
    if (he = 0, X = X === "" ? "." : X + ":", pe(h)) for (var Z = 0; Z < h.length; Z++) {
      b = h[Z];
      var me = X + et(b, Z);
      he += $e(b, w, W, me, J);
    }
    else if (me = B(h), typeof me == "function") for (h = me.call(h), Z = 0; !(b = h.next()).done; ) b = b.value, me = X + et(b, Z++), he += $e(b, w, W, me, J);
    else if (b === "object") throw w = String(h), Error("Objects are not valid as a React child (found: " + (w === "[object Object]" ? "object with keys {" + Object.keys(h).join(", ") + "}" : w) + "). If you meant to render a collection of children, use an array instead.");
    return he;
  }
  function tt(h, w, W) {
    if (h == null) return h;
    var X = [], J = 0;
    return $e(h, X, "", "", function(b) {
      return w.call(W, b, J++);
    }), X;
  }
  function Ye(h) {
    if (h._status === -1) {
      var w = h._result;
      w = w(), w.then(function(W) {
        (h._status === 0 || h._status === -1) && (h._status = 1, h._result = W);
      }, function(W) {
        (h._status === 0 || h._status === -1) && (h._status = 2, h._result = W);
      }), h._status === -1 && (h._status = 0, h._result = w);
    }
    if (h._status === 1) return h._result.default;
    throw h._result;
  }
  var se = { current: null }, C = { transition: null }, j = { ReactCurrentDispatcher: se, ReactCurrentBatchConfig: C, ReactCurrentOwner: q };
  function z() {
    throw Error("act(...) is not supported in production builds of React.");
  }
  return Q.Children = { map: tt, forEach: function(h, w, W) {
    tt(h, function() {
      w.apply(this, arguments);
    }, W);
  }, count: function(h) {
    var w = 0;
    return tt(h, function() {
      w++;
    }), w;
  }, toArray: function(h) {
    return tt(h, function(w) {
      return w;
    }) || [];
  }, only: function(h) {
    if (!Ge(h)) throw Error("React.Children.only expected to receive a single React element child.");
    return h;
  } }, Q.Component = K, Q.Fragment = s, Q.Profiler = m, Q.PureComponent = Ue, Q.StrictMode = c, Q.Suspense = R, Q.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = j, Q.act = z, Q.cloneElement = function(h, w, W) {
    if (h == null) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + h + ".");
    var X = Pe({}, h.props), J = h.key, b = h.ref, he = h._owner;
    if (w != null) {
      if (w.ref !== void 0 && (b = w.ref, he = q.current), w.key !== void 0 && (J = "" + w.key), h.type && h.type.defaultProps) var Z = h.type.defaultProps;
      for (me in w) We.call(w, me) && !Ae.hasOwnProperty(me) && (X[me] = w[me] === void 0 && Z !== void 0 ? Z[me] : w[me]);
    }
    var me = arguments.length - 2;
    if (me === 1) X.children = W;
    else if (1 < me) {
      Z = Array(me);
      for (var nt = 0; nt < me; nt++) Z[nt] = arguments[nt + 2];
      X.children = Z;
    }
    return { $$typeof: a, type: h.type, key: J, ref: b, props: X, _owner: he };
  }, Q.createContext = function(h) {
    return h = { $$typeof: P, _currentValue: h, _currentValue2: h, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null }, h.Provider = { $$typeof: k, _context: h }, h.Consumer = h;
  }, Q.createElement = be, Q.createFactory = function(h) {
    var w = be.bind(null, h);
    return w.type = h, w;
  }, Q.createRef = function() {
    return { current: null };
  }, Q.forwardRef = function(h) {
    return { $$typeof: L, render: h };
  }, Q.isValidElement = Ge, Q.lazy = function(h) {
    return { $$typeof: T, _payload: { _status: -1, _result: h }, _init: Ye };
  }, Q.memo = function(h, w) {
    return { $$typeof: D, type: h, compare: w === void 0 ? null : w };
  }, Q.startTransition = function(h) {
    var w = C.transition;
    C.transition = {};
    try {
      h();
    } finally {
      C.transition = w;
    }
  }, Q.unstable_act = z, Q.useCallback = function(h, w) {
    return se.current.useCallback(h, w);
  }, Q.useContext = function(h) {
    return se.current.useContext(h);
  }, Q.useDebugValue = function() {
  }, Q.useDeferredValue = function(h) {
    return se.current.useDeferredValue(h);
  }, Q.useEffect = function(h, w) {
    return se.current.useEffect(h, w);
  }, Q.useId = function() {
    return se.current.useId();
  }, Q.useImperativeHandle = function(h, w, W) {
    return se.current.useImperativeHandle(h, w, W);
  }, Q.useInsertionEffect = function(h, w) {
    return se.current.useInsertionEffect(h, w);
  }, Q.useLayoutEffect = function(h, w) {
    return se.current.useLayoutEffect(h, w);
  }, Q.useMemo = function(h, w) {
    return se.current.useMemo(h, w);
  }, Q.useReducer = function(h, w, W) {
    return se.current.useReducer(h, w, W);
  }, Q.useRef = function(h) {
    return se.current.useRef(h);
  }, Q.useState = function(h) {
    return se.current.useState(h);
  }, Q.useSyncExternalStore = function(h, w, W) {
    return se.current.useSyncExternalStore(h, w, W);
  }, Q.useTransition = function() {
    return se.current.useTransition();
  }, Q.version = "18.3.1", Q;
}
var Qa;
function hs() {
  return Qa || (Qa = 1, ls.exports = kd()), ls.exports;
}
var ee = hs();
const os = /* @__PURE__ */ Sd(ee);
var gl = {}, ss = { exports: {} }, wt = {}, us = { exports: {} }, as = {};
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Ga;
function xd() {
  return Ga || (Ga = 1, (function(a) {
    function o(C, j) {
      var z = C.length;
      C.push(j);
      e: for (; 0 < z; ) {
        var h = z - 1 >>> 1, w = C[h];
        if (0 < m(w, j)) C[h] = j, C[z] = w, z = h;
        else break e;
      }
    }
    function s(C) {
      return C.length === 0 ? null : C[0];
    }
    function c(C) {
      if (C.length === 0) return null;
      var j = C[0], z = C.pop();
      if (z !== j) {
        C[0] = z;
        e: for (var h = 0, w = C.length, W = w >>> 1; h < W; ) {
          var X = 2 * (h + 1) - 1, J = C[X], b = X + 1, he = C[b];
          if (0 > m(J, z)) b < w && 0 > m(he, J) ? (C[h] = he, C[b] = z, h = b) : (C[h] = J, C[X] = z, h = X);
          else if (b < w && 0 > m(he, z)) C[h] = he, C[b] = z, h = b;
          else break e;
        }
      }
      return j;
    }
    function m(C, j) {
      var z = C.sortIndex - j.sortIndex;
      return z !== 0 ? z : C.id - j.id;
    }
    if (typeof performance == "object" && typeof performance.now == "function") {
      var k = performance;
      a.unstable_now = function() {
        return k.now();
      };
    } else {
      var P = Date, L = P.now();
      a.unstable_now = function() {
        return P.now() - L;
      };
    }
    var R = [], D = [], T = 1, H = null, B = 3, Te = !1, Pe = !1, te = !1, K = typeof setTimeout == "function" ? setTimeout : null, Oe = typeof clearTimeout == "function" ? clearTimeout : null, Ue = typeof setImmediate < "u" ? setImmediate : null;
    typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
    function ct(C) {
      for (var j = s(D); j !== null; ) {
        if (j.callback === null) c(D);
        else if (j.startTime <= C) c(D), j.sortIndex = j.expirationTime, o(R, j);
        else break;
        j = s(D);
      }
    }
    function pe(C) {
      if (te = !1, ct(C), !Pe) if (s(R) !== null) Pe = !0, Ye(We);
      else {
        var j = s(D);
        j !== null && se(pe, j.startTime - C);
      }
    }
    function We(C, j) {
      Pe = !1, te && (te = !1, Oe(be), be = -1), Te = !0;
      var z = B;
      try {
        for (ct(j), H = s(R); H !== null && (!(H.expirationTime > j) || C && !Lt()); ) {
          var h = H.callback;
          if (typeof h == "function") {
            H.callback = null, B = H.priorityLevel;
            var w = h(H.expirationTime <= j);
            j = a.unstable_now(), typeof w == "function" ? H.callback = w : H === s(R) && c(R), ct(j);
          } else c(R);
          H = s(R);
        }
        if (H !== null) var W = !0;
        else {
          var X = s(D);
          X !== null && se(pe, X.startTime - j), W = !1;
        }
        return W;
      } finally {
        H = null, B = z, Te = !1;
      }
    }
    var q = !1, Ae = null, be = -1, Dt = 5, Ge = -1;
    function Lt() {
      return !(a.unstable_now() - Ge < Dt);
    }
    function _e() {
      if (Ae !== null) {
        var C = a.unstable_now();
        Ge = C;
        var j = !0;
        try {
          j = Ae(!0, C);
        } finally {
          j ? et() : (q = !1, Ae = null);
        }
      } else q = !1;
    }
    var et;
    if (typeof Ue == "function") et = function() {
      Ue(_e);
    };
    else if (typeof MessageChannel < "u") {
      var $e = new MessageChannel(), tt = $e.port2;
      $e.port1.onmessage = _e, et = function() {
        tt.postMessage(null);
      };
    } else et = function() {
      K(_e, 0);
    };
    function Ye(C) {
      Ae = C, q || (q = !0, et());
    }
    function se(C, j) {
      be = K(function() {
        C(a.unstable_now());
      }, j);
    }
    a.unstable_IdlePriority = 5, a.unstable_ImmediatePriority = 1, a.unstable_LowPriority = 4, a.unstable_NormalPriority = 3, a.unstable_Profiling = null, a.unstable_UserBlockingPriority = 2, a.unstable_cancelCallback = function(C) {
      C.callback = null;
    }, a.unstable_continueExecution = function() {
      Pe || Te || (Pe = !0, Ye(We));
    }, a.unstable_forceFrameRate = function(C) {
      0 > C || 125 < C ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : Dt = 0 < C ? Math.floor(1e3 / C) : 5;
    }, a.unstable_getCurrentPriorityLevel = function() {
      return B;
    }, a.unstable_getFirstCallbackNode = function() {
      return s(R);
    }, a.unstable_next = function(C) {
      switch (B) {
        case 1:
        case 2:
        case 3:
          var j = 3;
          break;
        default:
          j = B;
      }
      var z = B;
      B = j;
      try {
        return C();
      } finally {
        B = z;
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
      var z = B;
      B = C;
      try {
        return j();
      } finally {
        B = z;
      }
    }, a.unstable_scheduleCallback = function(C, j, z) {
      var h = a.unstable_now();
      switch (typeof z == "object" && z !== null ? (z = z.delay, z = typeof z == "number" && 0 < z ? h + z : h) : z = h, C) {
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
      return w = z + w, C = { id: T++, callback: j, priorityLevel: C, startTime: z, expirationTime: w, sortIndex: -1 }, z > h ? (C.sortIndex = z, o(D, C), s(R) === null && C === s(D) && (te ? (Oe(be), be = -1) : te = !0, se(pe, z - h))) : (C.sortIndex = w, o(R, C), Pe || Te || (Pe = !0, Ye(We))), C;
    }, a.unstable_shouldYield = Lt, a.unstable_wrapCallback = function(C) {
      var j = B;
      return function() {
        var z = B;
        B = j;
        try {
          return C.apply(this, arguments);
        } finally {
          B = z;
        }
      };
    };
  })(as)), as;
}
var Za;
function Ed() {
  return Za || (Za = 1, us.exports = xd()), us.exports;
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
var qa;
function Cd() {
  if (qa) return wt;
  qa = 1;
  var a = hs(), o = Ed();
  function s(e) {
    for (var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, n = 1; n < arguments.length; n++) t += "&args[]=" + encodeURIComponent(arguments[n]);
    return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  var c = /* @__PURE__ */ new Set(), m = {};
  function k(e, t) {
    P(e, t), P(e + "Capture", t);
  }
  function P(e, t) {
    for (m[e] = t, e = 0; e < t.length; e++) c.add(t[e]);
  }
  var L = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), R = Object.prototype.hasOwnProperty, D = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, T = {}, H = {};
  function B(e) {
    return R.call(H, e) ? !0 : R.call(T, e) ? !1 : D.test(e) ? H[e] = !0 : (T[e] = !0, !1);
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
  function Pe(e, t, n, r) {
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
  function te(e, t, n, r, i, l, u) {
    this.acceptsBooleans = t === 2 || t === 3 || t === 4, this.attributeName = r, this.attributeNamespace = i, this.mustUseProperty = n, this.propertyName = e, this.type = t, this.sanitizeURL = l, this.removeEmptyString = u;
  }
  var K = {};
  "children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e) {
    K[e] = new te(e, 0, !1, e, null, !1, !1);
  }), [["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(e) {
    var t = e[0];
    K[t] = new te(t, 1, !1, e[1], null, !1, !1);
  }), ["contentEditable", "draggable", "spellCheck", "value"].forEach(function(e) {
    K[e] = new te(e, 2, !1, e.toLowerCase(), null, !1, !1);
  }), ["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(e) {
    K[e] = new te(e, 2, !1, e, null, !1, !1);
  }), "allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e) {
    K[e] = new te(e, 3, !1, e.toLowerCase(), null, !1, !1);
  }), ["checked", "multiple", "muted", "selected"].forEach(function(e) {
    K[e] = new te(e, 3, !0, e, null, !1, !1);
  }), ["capture", "download"].forEach(function(e) {
    K[e] = new te(e, 4, !1, e, null, !1, !1);
  }), ["cols", "rows", "size", "span"].forEach(function(e) {
    K[e] = new te(e, 6, !1, e, null, !1, !1);
  }), ["rowSpan", "start"].forEach(function(e) {
    K[e] = new te(e, 5, !1, e.toLowerCase(), null, !1, !1);
  });
  var Oe = /[\-:]([a-z])/g;
  function Ue(e) {
    return e[1].toUpperCase();
  }
  "accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e) {
    var t = e.replace(
      Oe,
      Ue
    );
    K[t] = new te(t, 1, !1, e, null, !1, !1);
  }), "xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e) {
    var t = e.replace(Oe, Ue);
    K[t] = new te(t, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1);
  }), ["xml:base", "xml:lang", "xml:space"].forEach(function(e) {
    var t = e.replace(Oe, Ue);
    K[t] = new te(t, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1, !1);
  }), ["tabIndex", "crossOrigin"].forEach(function(e) {
    K[e] = new te(e, 1, !1, e.toLowerCase(), null, !1, !1);
  }), K.xlinkHref = new te("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0, !1), ["src", "href", "action", "formAction"].forEach(function(e) {
    K[e] = new te(e, 1, !1, e.toLowerCase(), null, !0, !0);
  });
  function ct(e, t, n, r) {
    var i = K.hasOwnProperty(t) ? K[t] : null;
    (i !== null ? i.type !== 0 : r || !(2 < t.length) || t[0] !== "o" && t[0] !== "O" || t[1] !== "n" && t[1] !== "N") && (Pe(t, n, i, r) && (n = null), r || i === null ? B(t) && (n === null ? e.removeAttribute(t) : e.setAttribute(t, "" + n)) : i.mustUseProperty ? e[i.propertyName] = n === null ? i.type === 3 ? !1 : "" : n : (t = i.attributeName, r = i.attributeNamespace, n === null ? e.removeAttribute(t) : (i = i.type, n = i === 3 || i === 4 && n === !0 ? "" : "" + n, r ? e.setAttributeNS(r, t, n) : e.setAttribute(t, n))));
  }
  var pe = a.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, We = Symbol.for("react.element"), q = Symbol.for("react.portal"), Ae = Symbol.for("react.fragment"), be = Symbol.for("react.strict_mode"), Dt = Symbol.for("react.profiler"), Ge = Symbol.for("react.provider"), Lt = Symbol.for("react.context"), _e = Symbol.for("react.forward_ref"), et = Symbol.for("react.suspense"), $e = Symbol.for("react.suspense_list"), tt = Symbol.for("react.memo"), Ye = Symbol.for("react.lazy"), se = Symbol.for("react.offscreen"), C = Symbol.iterator;
  function j(e) {
    return e === null || typeof e != "object" ? null : (e = C && e[C] || e["@@iterator"], typeof e == "function" ? e : null);
  }
  var z = Object.assign, h;
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
  var W = !1;
  function X(e, t) {
    if (!e || W) return "";
    W = !0;
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
      W = !1, Error.prepareStackTrace = n;
    }
    return (e = e ? e.displayName || e.name : "") ? w(e) : "";
  }
  function J(e) {
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
  function b(e) {
    if (e == null) return null;
    if (typeof e == "function") return e.displayName || e.name || null;
    if (typeof e == "string") return e;
    switch (e) {
      case Ae:
        return "Fragment";
      case q:
        return "Portal";
      case Dt:
        return "Profiler";
      case be:
        return "StrictMode";
      case et:
        return "Suspense";
      case $e:
        return "SuspenseList";
    }
    if (typeof e == "object") switch (e.$$typeof) {
      case Lt:
        return (e.displayName || "Context") + ".Consumer";
      case Ge:
        return (e._context.displayName || "Context") + ".Provider";
      case _e:
        var t = e.render;
        return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
      case tt:
        return t = e.displayName || null, t !== null ? t : b(e.type) || "Memo";
      case Ye:
        t = e._payload, e = e._init;
        try {
          return b(e(t));
        } catch {
        }
    }
    return null;
  }
  function he(e) {
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
        return b(t);
      case 8:
        return t === be ? "StrictMode" : "Mode";
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
  function Z(e) {
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
  function me(e) {
    var t = e.type;
    return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
  }
  function nt(e) {
    var t = me(e) ? "checked" : "value", n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t), r = "" + e[t];
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
  function Wn(e) {
    e._valueTracker || (e._valueTracker = nt(e));
  }
  function Tn(e) {
    if (!e) return !1;
    var t = e._valueTracker;
    if (!t) return !0;
    var n = t.getValue(), r = "";
    return e && (r = me(e) ? e.checked ? "true" : "false" : e.value), e = r, e !== n ? (t.setValue(e), !0) : !1;
  }
  function gr(e) {
    if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u") return null;
    try {
      return e.activeElement || e.body;
    } catch {
      return e.body;
    }
  }
  function F(e, t) {
    var n = t.checked;
    return z({}, t, { defaultChecked: void 0, defaultValue: void 0, value: void 0, checked: n ?? e._wrapperState.initialChecked });
  }
  function G(e, t) {
    var n = t.defaultValue == null ? "" : t.defaultValue, r = t.checked != null ? t.checked : t.defaultChecked;
    n = Z(t.value != null ? t.value : n), e._wrapperState = { initialChecked: r, initialValue: n, controlled: t.type === "checkbox" || t.type === "radio" ? t.checked != null : t.value != null };
  }
  function ne(e, t) {
    t = t.checked, t != null && ct(e, "checked", t, !1);
  }
  function re(e, t) {
    ne(e, t);
    var n = Z(t.value), r = t.type;
    if (n != null) r === "number" ? (n === 0 && e.value === "" || e.value != n) && (e.value = "" + n) : e.value !== "" + n && (e.value = "" + n);
    else if (r === "submit" || r === "reset") {
      e.removeAttribute("value");
      return;
    }
    t.hasOwnProperty("value") ? ve(e, t.type, n) : t.hasOwnProperty("defaultValue") && ve(e, t.type, Z(t.defaultValue)), t.checked == null && t.defaultChecked != null && (e.defaultChecked = !!t.defaultChecked);
  }
  function ue(e, t, n) {
    if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
      var r = t.type;
      if (!(r !== "submit" && r !== "reset" || t.value !== void 0 && t.value !== null)) return;
      t = "" + e._wrapperState.initialValue, n || t === e.value || (e.value = t), e.defaultValue = t;
    }
    n = e.name, n !== "" && (e.name = ""), e.defaultChecked = !!e._wrapperState.initialChecked, n !== "" && (e.name = n);
  }
  function ve(e, t, n) {
    (t !== "number" || gr(e.ownerDocument) !== e) && (n == null ? e.defaultValue = "" + e._wrapperState.initialValue : e.defaultValue !== "" + n && (e.defaultValue = "" + n));
  }
  var ae = Array.isArray;
  function ge(e, t, n, r) {
    if (e = e.options, t) {
      t = {};
      for (var i = 0; i < n.length; i++) t["$" + n[i]] = !0;
      for (n = 0; n < e.length; n++) i = t.hasOwnProperty("$" + e[n].value), e[n].selected !== i && (e[n].selected = i), i && r && (e[n].defaultSelected = !0);
    } else {
      for (n = "" + Z(n), t = null, i = 0; i < e.length; i++) {
        if (e[i].value === n) {
          e[i].selected = !0, r && (e[i].defaultSelected = !0);
          return;
        }
        t !== null || e[i].disabled || (t = e[i]);
      }
      t !== null && (t.selected = !0);
    }
  }
  function Le(e, t) {
    if (t.dangerouslySetInnerHTML != null) throw Error(s(91));
    return z({}, t, { value: void 0, defaultValue: void 0, children: "" + e._wrapperState.initialValue });
  }
  function ye(e, t) {
    var n = t.value;
    if (n == null) {
      if (n = t.children, t = t.defaultValue, n != null) {
        if (t != null) throw Error(s(92));
        if (ae(n)) {
          if (1 < n.length) throw Error(s(93));
          n = n[0];
        }
        t = n;
      }
      t == null && (t = ""), n = t;
    }
    e._wrapperState = { initialValue: Z(n) };
  }
  function Ee(e, t) {
    var n = Z(t.value), r = Z(t.defaultValue);
    n != null && (n = "" + n, n !== e.value && (e.value = n), t.defaultValue == null && e.defaultValue !== n && (e.defaultValue = n)), r != null && (e.defaultValue = "" + r);
  }
  function ce(e) {
    var t = e.textContent;
    t === e._wrapperState.initialValue && t !== "" && t !== null && (e.value = t);
  }
  function ie(e) {
    switch (e) {
      case "svg":
        return "http://www.w3.org/2000/svg";
      case "math":
        return "http://www.w3.org/1998/Math/MathML";
      default:
        return "http://www.w3.org/1999/xhtml";
    }
  }
  function Me(e, t) {
    return e == null || e === "http://www.w3.org/1999/xhtml" ? ie(t) : e === "http://www.w3.org/2000/svg" && t === "foreignObject" ? "http://www.w3.org/1999/xhtml" : e;
  }
  var fe, Y = (function(e) {
    return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction ? function(t, n, r, i) {
      MSApp.execUnsafeLocalFunction(function() {
        return e(t, n, r, i);
      });
    } : e;
  })(function(e, t) {
    if (e.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in e) e.innerHTML = t;
    else {
      for (fe = fe || document.createElement("div"), fe.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>", t = fe.firstChild; e.firstChild; ) e.removeChild(e.firstChild);
      for (; t.firstChild; ) e.appendChild(t.firstChild);
    }
  });
  function Ve(e, t) {
    if (t) {
      var n = e.firstChild;
      if (n && n === e.lastChild && n.nodeType === 3) {
        n.nodeValue = t;
        return;
      }
    }
    e.textContent = t;
  }
  var Xe = {
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
  }, Re = ["Webkit", "ms", "Moz", "O"];
  Object.keys(Xe).forEach(function(e) {
    Re.forEach(function(t) {
      t = t + e.charAt(0).toUpperCase() + e.substring(1), Xe[t] = Xe[e];
    });
  });
  function ft(e, t, n) {
    return t == null || typeof t == "boolean" || t === "" ? "" : n || typeof t != "number" || t === 0 || Xe.hasOwnProperty(e) && Xe[e] ? ("" + t).trim() : t + "px";
  }
  function nn(e, t) {
    e = e.style;
    for (var n in t) if (t.hasOwnProperty(n)) {
      var r = n.indexOf("--") === 0, i = ft(n, t[n], r);
      n === "float" && (n = "cssFloat"), r ? e.setProperty(n, i) : e[n] = i;
    }
  }
  var $t = z({ menuitem: !0 }, { area: !0, base: !0, br: !0, col: !0, embed: !0, hr: !0, img: !0, input: !0, keygen: !0, link: !0, meta: !0, param: !0, source: !0, track: !0, wbr: !0 });
  function Pn(e, t) {
    if (t) {
      if ($t[e] && (t.children != null || t.dangerouslySetInnerHTML != null)) throw Error(s(137, e));
      if (t.dangerouslySetInnerHTML != null) {
        if (t.children != null) throw Error(s(60));
        if (typeof t.dangerouslySetInnerHTML != "object" || !("__html" in t.dangerouslySetInnerHTML)) throw Error(s(61));
      }
      if (t.style != null && typeof t.style != "object") throw Error(s(62));
    }
  }
  function wr(e, t) {
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
  var _r = null;
  function ui(e) {
    return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
  }
  var Yn = null, Xt = null, Kt = null;
  function Sr(e) {
    if (e = Wr(e)) {
      if (typeof Yn != "function") throw Error(s(280));
      var t = e.stateNode;
      t && (t = Mi(t), Yn(e.stateNode, e.type, t));
    }
  }
  function rn(e) {
    Xt ? Kt ? Kt.push(e) : Kt = [e] : Xt = e;
  }
  function ai() {
    if (Xt) {
      var e = Xt, t = Kt;
      if (Kt = Xt = null, Sr(e), t) for (e = 0; e < t.length; e++) Sr(t[e]);
    }
  }
  function ci(e, t) {
    return e(t);
  }
  function kr() {
  }
  var Xn = !1;
  function xr(e, t, n) {
    if (Xn) return e(t, n);
    Xn = !0;
    try {
      return ci(e, t, n);
    } finally {
      Xn = !1, (Xt !== null || Kt !== null) && (kr(), ai());
    }
  }
  function Rn(e, t) {
    var n = e.stateNode;
    if (n === null) return null;
    var r = Mi(n);
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
  var Er = !1;
  if (L) try {
    var ln = {};
    Object.defineProperty(ln, "passive", { get: function() {
      Er = !0;
    } }), window.addEventListener("test", ln, ln), window.removeEventListener("test", ln, ln);
  } catch {
    Er = !1;
  }
  function Tc(e, t, n, r, i, l, u, f, d) {
    var g = Array.prototype.slice.call(arguments, 3);
    try {
      t.apply(n, g);
    } catch (S) {
      this.onError(S);
    }
  }
  var Cr = !1, fi = null, di = !1, xl = null, Pc = { onError: function(e) {
    Cr = !0, fi = e;
  } };
  function Rc(e, t, n, r, i, l, u, f, d) {
    Cr = !1, fi = null, Tc.apply(Pc, arguments);
  }
  function zc(e, t, n, r, i, l, u, f, d) {
    if (Rc.apply(this, arguments), Cr) {
      if (Cr) {
        var g = fi;
        Cr = !1, fi = null;
      } else throw Error(s(198));
      di || (di = !0, xl = g);
    }
  }
  function zn(e) {
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
  function vs(e) {
    if (e.tag === 13) {
      var t = e.memoizedState;
      if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
    }
    return null;
  }
  function ys(e) {
    if (zn(e) !== e) throw Error(s(188));
  }
  function Nc(e) {
    var t = e.alternate;
    if (!t) {
      if (t = zn(e), t === null) throw Error(s(188));
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
          if (l === n) return ys(i), e;
          if (l === r) return ys(i), t;
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
  function gs(e) {
    return e = Nc(e), e !== null ? ws(e) : null;
  }
  function ws(e) {
    if (e.tag === 5 || e.tag === 6) return e;
    for (e = e.child; e !== null; ) {
      var t = ws(e);
      if (t !== null) return t;
      e = e.sibling;
    }
    return null;
  }
  var _s = o.unstable_scheduleCallback, Ss = o.unstable_cancelCallback, Dc = o.unstable_shouldYield, Lc = o.unstable_requestPaint, je = o.unstable_now, Mc = o.unstable_getCurrentPriorityLevel, El = o.unstable_ImmediatePriority, ks = o.unstable_UserBlockingPriority, pi = o.unstable_NormalPriority, Ic = o.unstable_LowPriority, xs = o.unstable_IdlePriority, hi = null, Vt = null;
  function Oc(e) {
    if (Vt && typeof Vt.onCommitFiberRoot == "function") try {
      Vt.onCommitFiberRoot(hi, e, void 0, (e.current.flags & 128) === 128);
    } catch {
    }
  }
  var Mt = Math.clz32 ? Math.clz32 : Fc, Ac = Math.log, jc = Math.LN2;
  function Fc(e) {
    return e >>>= 0, e === 0 ? 32 : 31 - (Ac(e) / jc | 0) | 0;
  }
  var mi = 64, vi = 4194304;
  function Tr(e) {
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
  function yi(e, t) {
    var n = e.pendingLanes;
    if (n === 0) return 0;
    var r = 0, i = e.suspendedLanes, l = e.pingedLanes, u = n & 268435455;
    if (u !== 0) {
      var f = u & ~i;
      f !== 0 ? r = Tr(f) : (l &= u, l !== 0 && (r = Tr(l)));
    } else u = n & ~i, u !== 0 ? r = Tr(u) : l !== 0 && (r = Tr(l));
    if (r === 0) return 0;
    if (t !== 0 && t !== r && (t & i) === 0 && (i = r & -r, l = t & -t, i >= l || i === 16 && (l & 4194240) !== 0)) return t;
    if ((r & 4) !== 0 && (r |= n & 16), t = e.entangledLanes, t !== 0) for (e = e.entanglements, t &= r; 0 < t; ) n = 31 - Mt(t), i = 1 << n, r |= e[n], t &= ~i;
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
      var u = 31 - Mt(l), f = 1 << u, d = i[u];
      d === -1 ? ((f & n) === 0 || (f & r) !== 0) && (i[u] = Uc(f, t)) : d <= t && (e.expiredLanes |= f), l &= ~f;
    }
  }
  function Cl(e) {
    return e = e.pendingLanes & -1073741825, e !== 0 ? e : e & 1073741824 ? 1073741824 : 0;
  }
  function Es() {
    var e = mi;
    return mi <<= 1, (mi & 4194240) === 0 && (mi = 64), e;
  }
  function Tl(e) {
    for (var t = [], n = 0; 31 > n; n++) t.push(e);
    return t;
  }
  function Pr(e, t, n) {
    e.pendingLanes |= t, t !== 536870912 && (e.suspendedLanes = 0, e.pingedLanes = 0), e = e.eventTimes, t = 31 - Mt(t), e[t] = n;
  }
  function Vc(e, t) {
    var n = e.pendingLanes & ~t;
    e.pendingLanes = t, e.suspendedLanes = 0, e.pingedLanes = 0, e.expiredLanes &= t, e.mutableReadLanes &= t, e.entangledLanes &= t, t = e.entanglements;
    var r = e.eventTimes;
    for (e = e.expirationTimes; 0 < n; ) {
      var i = 31 - Mt(n), l = 1 << i;
      t[i] = 0, r[i] = -1, e[i] = -1, n &= ~l;
    }
  }
  function Pl(e, t) {
    var n = e.entangledLanes |= t;
    for (e = e.entanglements; n; ) {
      var r = 31 - Mt(n), i = 1 << r;
      i & t | e[r] & t && (e[r] |= t), n &= ~i;
    }
  }
  var de = 0;
  function Cs(e) {
    return e &= -e, 1 < e ? 4 < e ? (e & 268435455) !== 0 ? 16 : 536870912 : 4 : 1;
  }
  var Ts, Rl, Ps, Rs, zs, zl = !1, gi = [], on = null, sn = null, un = null, Rr = /* @__PURE__ */ new Map(), zr = /* @__PURE__ */ new Map(), an = [], Hc = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
  function Ns(e, t) {
    switch (e) {
      case "focusin":
      case "focusout":
        on = null;
        break;
      case "dragenter":
      case "dragleave":
        sn = null;
        break;
      case "mouseover":
      case "mouseout":
        un = null;
        break;
      case "pointerover":
      case "pointerout":
        Rr.delete(t.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        zr.delete(t.pointerId);
    }
  }
  function Nr(e, t, n, r, i, l) {
    return e === null || e.nativeEvent !== l ? (e = { blockedOn: t, domEventName: n, eventSystemFlags: r, nativeEvent: l, targetContainers: [i] }, t !== null && (t = Wr(t), t !== null && Rl(t)), e) : (e.eventSystemFlags |= r, t = e.targetContainers, i !== null && t.indexOf(i) === -1 && t.push(i), e);
  }
  function Bc(e, t, n, r, i) {
    switch (t) {
      case "focusin":
        return on = Nr(on, e, t, n, r, i), !0;
      case "dragenter":
        return sn = Nr(sn, e, t, n, r, i), !0;
      case "mouseover":
        return un = Nr(un, e, t, n, r, i), !0;
      case "pointerover":
        var l = i.pointerId;
        return Rr.set(l, Nr(Rr.get(l) || null, e, t, n, r, i)), !0;
      case "gotpointercapture":
        return l = i.pointerId, zr.set(l, Nr(zr.get(l) || null, e, t, n, r, i)), !0;
    }
    return !1;
  }
  function Ds(e) {
    var t = Nn(e.target);
    if (t !== null) {
      var n = zn(t);
      if (n !== null) {
        if (t = n.tag, t === 13) {
          if (t = vs(n), t !== null) {
            e.blockedOn = t, zs(e.priority, function() {
              Ps(n);
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
  function wi(e) {
    if (e.blockedOn !== null) return !1;
    for (var t = e.targetContainers; 0 < t.length; ) {
      var n = Dl(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
      if (n === null) {
        n = e.nativeEvent;
        var r = new n.constructor(n.type, n);
        _r = r, n.target.dispatchEvent(r), _r = null;
      } else return t = Wr(n), t !== null && Rl(t), e.blockedOn = n, !1;
      t.shift();
    }
    return !0;
  }
  function Ls(e, t, n) {
    wi(e) && n.delete(t);
  }
  function Wc() {
    zl = !1, on !== null && wi(on) && (on = null), sn !== null && wi(sn) && (sn = null), un !== null && wi(un) && (un = null), Rr.forEach(Ls), zr.forEach(Ls);
  }
  function Dr(e, t) {
    e.blockedOn === t && (e.blockedOn = null, zl || (zl = !0, o.unstable_scheduleCallback(o.unstable_NormalPriority, Wc)));
  }
  function Lr(e) {
    function t(i) {
      return Dr(i, e);
    }
    if (0 < gi.length) {
      Dr(gi[0], e);
      for (var n = 1; n < gi.length; n++) {
        var r = gi[n];
        r.blockedOn === e && (r.blockedOn = null);
      }
    }
    for (on !== null && Dr(on, e), sn !== null && Dr(sn, e), un !== null && Dr(un, e), Rr.forEach(t), zr.forEach(t), n = 0; n < an.length; n++) r = an[n], r.blockedOn === e && (r.blockedOn = null);
    for (; 0 < an.length && (n = an[0], n.blockedOn === null); ) Ds(n), n.blockedOn === null && an.shift();
  }
  var Kn = pe.ReactCurrentBatchConfig, _i = !0;
  function Yc(e, t, n, r) {
    var i = de, l = Kn.transition;
    Kn.transition = null;
    try {
      de = 1, Nl(e, t, n, r);
    } finally {
      de = i, Kn.transition = l;
    }
  }
  function Xc(e, t, n, r) {
    var i = de, l = Kn.transition;
    Kn.transition = null;
    try {
      de = 4, Nl(e, t, n, r);
    } finally {
      de = i, Kn.transition = l;
    }
  }
  function Nl(e, t, n, r) {
    if (_i) {
      var i = Dl(e, t, n, r);
      if (i === null) Ql(e, t, r, Si, n), Ns(e, r);
      else if (Bc(i, e, t, n, r)) r.stopPropagation();
      else if (Ns(e, r), t & 4 && -1 < Hc.indexOf(e)) {
        for (; i !== null; ) {
          var l = Wr(i);
          if (l !== null && Ts(l), l = Dl(e, t, n, r), l === null && Ql(e, t, r, Si, n), l === i) break;
          i = l;
        }
        i !== null && r.stopPropagation();
      } else Ql(e, t, r, null, n);
    }
  }
  var Si = null;
  function Dl(e, t, n, r) {
    if (Si = null, e = ui(r), e = Nn(e), e !== null) if (t = zn(e), t === null) e = null;
    else if (n = t.tag, n === 13) {
      if (e = vs(t), e !== null) return e;
      e = null;
    } else if (n === 3) {
      if (t.stateNode.current.memoizedState.isDehydrated) return t.tag === 3 ? t.stateNode.containerInfo : null;
      e = null;
    } else t !== e && (e = null);
    return Si = e, null;
  }
  function Ms(e) {
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
          case El:
            return 1;
          case ks:
            return 4;
          case pi:
          case Ic:
            return 16;
          case xs:
            return 536870912;
          default:
            return 16;
        }
      default:
        return 16;
    }
  }
  var cn = null, Ll = null, ki = null;
  function Is() {
    if (ki) return ki;
    var e, t = Ll, n = t.length, r, i = "value" in cn ? cn.value : cn.textContent, l = i.length;
    for (e = 0; e < n && t[e] === i[e]; e++) ;
    var u = n - e;
    for (r = 1; r <= u && t[n - r] === i[l - r]; r++) ;
    return ki = i.slice(e, 1 < r ? 1 - r : void 0);
  }
  function xi(e) {
    var t = e.keyCode;
    return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
  }
  function Ei() {
    return !0;
  }
  function Os() {
    return !1;
  }
  function _t(e) {
    function t(n, r, i, l, u) {
      this._reactName = n, this._targetInst = i, this.type = r, this.nativeEvent = l, this.target = u, this.currentTarget = null;
      for (var f in e) e.hasOwnProperty(f) && (n = e[f], this[f] = n ? n(l) : l[f]);
      return this.isDefaultPrevented = (l.defaultPrevented != null ? l.defaultPrevented : l.returnValue === !1) ? Ei : Os, this.isPropagationStopped = Os, this;
    }
    return z(t.prototype, { preventDefault: function() {
      this.defaultPrevented = !0;
      var n = this.nativeEvent;
      n && (n.preventDefault ? n.preventDefault() : typeof n.returnValue != "unknown" && (n.returnValue = !1), this.isDefaultPrevented = Ei);
    }, stopPropagation: function() {
      var n = this.nativeEvent;
      n && (n.stopPropagation ? n.stopPropagation() : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0), this.isPropagationStopped = Ei);
    }, persist: function() {
    }, isPersistent: Ei }), t;
  }
  var Qn = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(e) {
    return e.timeStamp || Date.now();
  }, defaultPrevented: 0, isTrusted: 0 }, Ml = _t(Qn), Mr = z({}, Qn, { view: 0, detail: 0 }), Kc = _t(Mr), Il, Ol, Ir, Ci = z({}, Mr, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: jl, button: 0, buttons: 0, relatedTarget: function(e) {
    return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
  }, movementX: function(e) {
    return "movementX" in e ? e.movementX : (e !== Ir && (Ir && e.type === "mousemove" ? (Il = e.screenX - Ir.screenX, Ol = e.screenY - Ir.screenY) : Ol = Il = 0, Ir = e), Il);
  }, movementY: function(e) {
    return "movementY" in e ? e.movementY : Ol;
  } }), As = _t(Ci), Qc = z({}, Ci, { dataTransfer: 0 }), Gc = _t(Qc), Zc = z({}, Mr, { relatedTarget: 0 }), Al = _t(Zc), qc = z({}, Qn, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }), Jc = _t(qc), bc = z({}, Qn, { clipboardData: function(e) {
    return "clipboardData" in e ? e.clipboardData : window.clipboardData;
  } }), ef = _t(bc), tf = z({}, Qn, { data: 0 }), js = _t(tf), nf = {
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
  function jl() {
    return of;
  }
  var sf = z({}, Mr, { key: function(e) {
    if (e.key) {
      var t = nf[e.key] || e.key;
      if (t !== "Unidentified") return t;
    }
    return e.type === "keypress" ? (e = xi(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? rf[e.keyCode] || "Unidentified" : "";
  }, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: jl, charCode: function(e) {
    return e.type === "keypress" ? xi(e) : 0;
  }, keyCode: function(e) {
    return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
  }, which: function(e) {
    return e.type === "keypress" ? xi(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
  } }), uf = _t(sf), af = z({}, Ci, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), Fs = _t(af), cf = z({}, Mr, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: jl }), ff = _t(cf), df = z({}, Qn, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }), pf = _t(df), hf = z({}, Ci, {
    deltaX: function(e) {
      return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
    },
    deltaY: function(e) {
      return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), mf = _t(hf), vf = [9, 13, 27, 32], Fl = L && "CompositionEvent" in window, Or = null;
  L && "documentMode" in document && (Or = document.documentMode);
  var yf = L && "TextEvent" in window && !Or, Us = L && (!Fl || Or && 8 < Or && 11 >= Or), $s = " ", Vs = !1;
  function Hs(e, t) {
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
  function Bs(e) {
    return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
  }
  var Gn = !1;
  function gf(e, t) {
    switch (e) {
      case "compositionend":
        return Bs(t);
      case "keypress":
        return t.which !== 32 ? null : (Vs = !0, $s);
      case "textInput":
        return e = t.data, e === $s && Vs ? null : e;
      default:
        return null;
    }
  }
  function wf(e, t) {
    if (Gn) return e === "compositionend" || !Fl && Hs(e, t) ? (e = Is(), ki = Ll = cn = null, Gn = !1, e) : null;
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
        return Us && t.locale !== "ko" ? null : t.data;
      default:
        return null;
    }
  }
  var _f = { color: !0, date: !0, datetime: !0, "datetime-local": !0, email: !0, month: !0, number: !0, password: !0, range: !0, search: !0, tel: !0, text: !0, time: !0, url: !0, week: !0 };
  function Ws(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t === "input" ? !!_f[e.type] : t === "textarea";
  }
  function Ys(e, t, n, r) {
    rn(r), t = Ni(t, "onChange"), 0 < t.length && (n = new Ml("onChange", "change", null, n, r), e.push({ event: n, listeners: t }));
  }
  var Ar = null, jr = null;
  function Sf(e) {
    au(e, 0);
  }
  function Ti(e) {
    var t = er(e);
    if (Tn(t)) return e;
  }
  function kf(e, t) {
    if (e === "change") return t;
  }
  var Xs = !1;
  if (L) {
    var Ul;
    if (L) {
      var $l = "oninput" in document;
      if (!$l) {
        var Ks = document.createElement("div");
        Ks.setAttribute("oninput", "return;"), $l = typeof Ks.oninput == "function";
      }
      Ul = $l;
    } else Ul = !1;
    Xs = Ul && (!document.documentMode || 9 < document.documentMode);
  }
  function Qs() {
    Ar && (Ar.detachEvent("onpropertychange", Gs), jr = Ar = null);
  }
  function Gs(e) {
    if (e.propertyName === "value" && Ti(jr)) {
      var t = [];
      Ys(t, jr, e, ui(e)), xr(Sf, t);
    }
  }
  function xf(e, t, n) {
    e === "focusin" ? (Qs(), Ar = t, jr = n, Ar.attachEvent("onpropertychange", Gs)) : e === "focusout" && Qs();
  }
  function Ef(e) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown") return Ti(jr);
  }
  function Cf(e, t) {
    if (e === "click") return Ti(t);
  }
  function Tf(e, t) {
    if (e === "input" || e === "change") return Ti(t);
  }
  function Pf(e, t) {
    return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
  }
  var It = typeof Object.is == "function" ? Object.is : Pf;
  function Fr(e, t) {
    if (It(e, t)) return !0;
    if (typeof e != "object" || e === null || typeof t != "object" || t === null) return !1;
    var n = Object.keys(e), r = Object.keys(t);
    if (n.length !== r.length) return !1;
    for (r = 0; r < n.length; r++) {
      var i = n[r];
      if (!R.call(t, i) || !It(e[i], t[i])) return !1;
    }
    return !0;
  }
  function Zs(e) {
    for (; e && e.firstChild; ) e = e.firstChild;
    return e;
  }
  function qs(e, t) {
    var n = Zs(e);
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
      n = Zs(n);
    }
  }
  function Js(e, t) {
    return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? Js(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
  }
  function bs() {
    for (var e = window, t = gr(); t instanceof e.HTMLIFrameElement; ) {
      try {
        var n = typeof t.contentWindow.location.href == "string";
      } catch {
        n = !1;
      }
      if (n) e = t.contentWindow;
      else break;
      t = gr(e.document);
    }
    return t;
  }
  function Vl(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
  }
  function Rf(e) {
    var t = bs(), n = e.focusedElem, r = e.selectionRange;
    if (t !== n && n && n.ownerDocument && Js(n.ownerDocument.documentElement, n)) {
      if (r !== null && Vl(n)) {
        if (t = r.start, e = r.end, e === void 0 && (e = t), "selectionStart" in n) n.selectionStart = t, n.selectionEnd = Math.min(e, n.value.length);
        else if (e = (t = n.ownerDocument || document) && t.defaultView || window, e.getSelection) {
          e = e.getSelection();
          var i = n.textContent.length, l = Math.min(r.start, i);
          r = r.end === void 0 ? l : Math.min(r.end, i), !e.extend && l > r && (i = r, r = l, l = i), i = qs(n, l);
          var u = qs(
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
  var zf = L && "documentMode" in document && 11 >= document.documentMode, Zn = null, Hl = null, Ur = null, Bl = !1;
  function eu(e, t, n) {
    var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
    Bl || Zn == null || Zn !== gr(r) || (r = Zn, "selectionStart" in r && Vl(r) ? r = { start: r.selectionStart, end: r.selectionEnd } : (r = (r.ownerDocument && r.ownerDocument.defaultView || window).getSelection(), r = { anchorNode: r.anchorNode, anchorOffset: r.anchorOffset, focusNode: r.focusNode, focusOffset: r.focusOffset }), Ur && Fr(Ur, r) || (Ur = r, r = Ni(Hl, "onSelect"), 0 < r.length && (t = new Ml("onSelect", "select", null, t, n), e.push({ event: t, listeners: r }), t.target = Zn)));
  }
  function Pi(e, t) {
    var n = {};
    return n[e.toLowerCase()] = t.toLowerCase(), n["Webkit" + e] = "webkit" + t, n["Moz" + e] = "moz" + t, n;
  }
  var qn = { animationend: Pi("Animation", "AnimationEnd"), animationiteration: Pi("Animation", "AnimationIteration"), animationstart: Pi("Animation", "AnimationStart"), transitionend: Pi("Transition", "TransitionEnd") }, Wl = {}, tu = {};
  L && (tu = document.createElement("div").style, "AnimationEvent" in window || (delete qn.animationend.animation, delete qn.animationiteration.animation, delete qn.animationstart.animation), "TransitionEvent" in window || delete qn.transitionend.transition);
  function Ri(e) {
    if (Wl[e]) return Wl[e];
    if (!qn[e]) return e;
    var t = qn[e], n;
    for (n in t) if (t.hasOwnProperty(n) && n in tu) return Wl[e] = t[n];
    return e;
  }
  var nu = Ri("animationend"), ru = Ri("animationiteration"), iu = Ri("animationstart"), lu = Ri("transitionend"), ou = /* @__PURE__ */ new Map(), su = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
  function fn(e, t) {
    ou.set(e, t), k(t, [e]);
  }
  for (var Yl = 0; Yl < su.length; Yl++) {
    var Xl = su[Yl], Nf = Xl.toLowerCase(), Df = Xl[0].toUpperCase() + Xl.slice(1);
    fn(Nf, "on" + Df);
  }
  fn(nu, "onAnimationEnd"), fn(ru, "onAnimationIteration"), fn(iu, "onAnimationStart"), fn("dblclick", "onDoubleClick"), fn("focusin", "onFocus"), fn("focusout", "onBlur"), fn(lu, "onTransitionEnd"), P("onMouseEnter", ["mouseout", "mouseover"]), P("onMouseLeave", ["mouseout", "mouseover"]), P("onPointerEnter", ["pointerout", "pointerover"]), P("onPointerLeave", ["pointerout", "pointerover"]), k("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" ")), k("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")), k("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]), k("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" ")), k("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" ")), k("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
  var $r = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), Lf = new Set("cancel close invalid load scroll toggle".split(" ").concat($r));
  function uu(e, t, n) {
    var r = e.type || "unknown-event";
    e.currentTarget = n, zc(r, t, void 0, e), e.currentTarget = null;
  }
  function au(e, t) {
    t = (t & 4) !== 0;
    for (var n = 0; n < e.length; n++) {
      var r = e[n], i = r.event;
      r = r.listeners;
      e: {
        var l = void 0;
        if (t) for (var u = r.length - 1; 0 <= u; u--) {
          var f = r[u], d = f.instance, g = f.currentTarget;
          if (f = f.listener, d !== l && i.isPropagationStopped()) break e;
          uu(i, f, g), l = d;
        }
        else for (u = 0; u < r.length; u++) {
          if (f = r[u], d = f.instance, g = f.currentTarget, f = f.listener, d !== l && i.isPropagationStopped()) break e;
          uu(i, f, g), l = d;
        }
      }
    }
    if (di) throw e = xl, di = !1, xl = null, e;
  }
  function Se(e, t) {
    var n = t[eo];
    n === void 0 && (n = t[eo] = /* @__PURE__ */ new Set());
    var r = e + "__bubble";
    n.has(r) || (cu(t, e, 2, !1), n.add(r));
  }
  function Kl(e, t, n) {
    var r = 0;
    t && (r |= 4), cu(n, e, r, t);
  }
  var zi = "_reactListening" + Math.random().toString(36).slice(2);
  function Vr(e) {
    if (!e[zi]) {
      e[zi] = !0, c.forEach(function(n) {
        n !== "selectionchange" && (Lf.has(n) || Kl(n, !1, e), Kl(n, !0, e));
      });
      var t = e.nodeType === 9 ? e : e.ownerDocument;
      t === null || t[zi] || (t[zi] = !0, Kl("selectionchange", !1, t));
    }
  }
  function cu(e, t, n, r) {
    switch (Ms(t)) {
      case 1:
        var i = Yc;
        break;
      case 4:
        i = Xc;
        break;
      default:
        i = Nl;
    }
    n = i.bind(null, t, n, e), i = void 0, !Er || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (i = !0), r ? i !== void 0 ? e.addEventListener(t, n, { capture: !0, passive: i }) : e.addEventListener(t, n, !0) : i !== void 0 ? e.addEventListener(t, n, { passive: i }) : e.addEventListener(t, n, !1);
  }
  function Ql(e, t, n, r, i) {
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
          if (u = Nn(f), u === null) return;
          if (d = u.tag, d === 5 || d === 6) {
            r = l = u;
            continue e;
          }
          f = f.parentNode;
        }
      }
      r = r.return;
    }
    xr(function() {
      var g = l, S = ui(n), x = [];
      e: {
        var _ = ou.get(e);
        if (_ !== void 0) {
          var N = Ml, I = e;
          switch (e) {
            case "keypress":
              if (xi(n) === 0) break e;
            case "keydown":
            case "keyup":
              N = uf;
              break;
            case "focusin":
              I = "focus", N = Al;
              break;
            case "focusout":
              I = "blur", N = Al;
              break;
            case "beforeblur":
            case "afterblur":
              N = Al;
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
              N = As;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              N = Gc;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              N = ff;
              break;
            case nu:
            case ru:
            case iu:
              N = Jc;
              break;
            case lu:
              N = pf;
              break;
            case "scroll":
              N = Kc;
              break;
            case "wheel":
              N = mf;
              break;
            case "copy":
            case "cut":
            case "paste":
              N = ef;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              N = Fs;
          }
          var O = (t & 4) !== 0, Fe = !O && e === "scroll", v = O ? _ !== null ? _ + "Capture" : null : _;
          O = [];
          for (var p = g, y; p !== null; ) {
            y = p;
            var E = y.stateNode;
            if (y.tag === 5 && E !== null && (y = E, v !== null && (E = Rn(p, v), E != null && O.push(Hr(p, E, y)))), Fe) break;
            p = p.return;
          }
          0 < O.length && (_ = new N(_, I, null, n, S), x.push({ event: _, listeners: O }));
        }
      }
      if ((t & 7) === 0) {
        e: {
          if (_ = e === "mouseover" || e === "pointerover", N = e === "mouseout" || e === "pointerout", _ && n !== _r && (I = n.relatedTarget || n.fromElement) && (Nn(I) || I[Qt])) break e;
          if ((N || _) && (_ = S.window === S ? S : (_ = S.ownerDocument) ? _.defaultView || _.parentWindow : window, N ? (I = n.relatedTarget || n.toElement, N = g, I = I ? Nn(I) : null, I !== null && (Fe = zn(I), I !== Fe || I.tag !== 5 && I.tag !== 6) && (I = null)) : (N = null, I = g), N !== I)) {
            if (O = As, E = "onMouseLeave", v = "onMouseEnter", p = "mouse", (e === "pointerout" || e === "pointerover") && (O = Fs, E = "onPointerLeave", v = "onPointerEnter", p = "pointer"), Fe = N == null ? _ : er(N), y = I == null ? _ : er(I), _ = new O(E, p + "leave", N, n, S), _.target = Fe, _.relatedTarget = y, E = null, Nn(S) === g && (O = new O(v, p + "enter", I, n, S), O.target = y, O.relatedTarget = Fe, E = O), Fe = E, N && I) t: {
              for (O = N, v = I, p = 0, y = O; y; y = Jn(y)) p++;
              for (y = 0, E = v; E; E = Jn(E)) y++;
              for (; 0 < p - y; ) O = Jn(O), p--;
              for (; 0 < y - p; ) v = Jn(v), y--;
              for (; p--; ) {
                if (O === v || v !== null && O === v.alternate) break t;
                O = Jn(O), v = Jn(v);
              }
              O = null;
            }
            else O = null;
            N !== null && fu(x, _, N, O, !1), I !== null && Fe !== null && fu(x, Fe, I, O, !0);
          }
        }
        e: {
          if (_ = g ? er(g) : window, N = _.nodeName && _.nodeName.toLowerCase(), N === "select" || N === "input" && _.type === "file") var A = kf;
          else if (Ws(_)) if (Xs) A = Tf;
          else {
            A = Ef;
            var U = xf;
          }
          else (N = _.nodeName) && N.toLowerCase() === "input" && (_.type === "checkbox" || _.type === "radio") && (A = Cf);
          if (A && (A = A(e, g))) {
            Ys(x, A, n, S);
            break e;
          }
          U && U(e, _, g), e === "focusout" && (U = _._wrapperState) && U.controlled && _.type === "number" && ve(_, "number", _.value);
        }
        switch (U = g ? er(g) : window, e) {
          case "focusin":
            (Ws(U) || U.contentEditable === "true") && (Zn = U, Hl = g, Ur = null);
            break;
          case "focusout":
            Ur = Hl = Zn = null;
            break;
          case "mousedown":
            Bl = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            Bl = !1, eu(x, n, S);
            break;
          case "selectionchange":
            if (zf) break;
          case "keydown":
          case "keyup":
            eu(x, n, S);
        }
        var $;
        if (Fl) e: {
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
        else Gn ? Hs(e, n) && (V = "onCompositionEnd") : e === "keydown" && n.keyCode === 229 && (V = "onCompositionStart");
        V && (Us && n.locale !== "ko" && (Gn || V !== "onCompositionStart" ? V === "onCompositionEnd" && Gn && ($ = Is()) : (cn = S, Ll = "value" in cn ? cn.value : cn.textContent, Gn = !0)), U = Ni(g, V), 0 < U.length && (V = new js(V, e, null, n, S), x.push({ event: V, listeners: U }), $ ? V.data = $ : ($ = Bs(n), $ !== null && (V.data = $)))), ($ = yf ? gf(e, n) : wf(e, n)) && (g = Ni(g, "onBeforeInput"), 0 < g.length && (S = new js("onBeforeInput", "beforeinput", null, n, S), x.push({ event: S, listeners: g }), S.data = $));
      }
      au(x, t);
    });
  }
  function Hr(e, t, n) {
    return { instance: e, listener: t, currentTarget: n };
  }
  function Ni(e, t) {
    for (var n = t + "Capture", r = []; e !== null; ) {
      var i = e, l = i.stateNode;
      i.tag === 5 && l !== null && (i = l, l = Rn(e, n), l != null && r.unshift(Hr(e, l, i)), l = Rn(e, t), l != null && r.push(Hr(e, l, i))), e = e.return;
    }
    return r;
  }
  function Jn(e) {
    if (e === null) return null;
    do
      e = e.return;
    while (e && e.tag !== 5);
    return e || null;
  }
  function fu(e, t, n, r, i) {
    for (var l = t._reactName, u = []; n !== null && n !== r; ) {
      var f = n, d = f.alternate, g = f.stateNode;
      if (d !== null && d === r) break;
      f.tag === 5 && g !== null && (f = g, i ? (d = Rn(n, l), d != null && u.unshift(Hr(n, d, f))) : i || (d = Rn(n, l), d != null && u.push(Hr(n, d, f)))), n = n.return;
    }
    u.length !== 0 && e.push({ event: t, listeners: u });
  }
  var Mf = /\r\n?/g, If = /\u0000|\uFFFD/g;
  function du(e) {
    return (typeof e == "string" ? e : "" + e).replace(Mf, `
`).replace(If, "");
  }
  function Di(e, t, n) {
    if (t = du(t), du(e) !== t && n) throw Error(s(425));
  }
  function Li() {
  }
  var Gl = null, Zl = null;
  function ql(e, t) {
    return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
  }
  var Jl = typeof setTimeout == "function" ? setTimeout : void 0, Of = typeof clearTimeout == "function" ? clearTimeout : void 0, pu = typeof Promise == "function" ? Promise : void 0, Af = typeof queueMicrotask == "function" ? queueMicrotask : typeof pu < "u" ? function(e) {
    return pu.resolve(null).then(e).catch(jf);
  } : Jl;
  function jf(e) {
    setTimeout(function() {
      throw e;
    });
  }
  function bl(e, t) {
    var n = t, r = 0;
    do {
      var i = n.nextSibling;
      if (e.removeChild(n), i && i.nodeType === 8) if (n = i.data, n === "/$") {
        if (r === 0) {
          e.removeChild(i), Lr(t);
          return;
        }
        r--;
      } else n !== "$" && n !== "$?" && n !== "$!" || r++;
      n = i;
    } while (n);
    Lr(t);
  }
  function dn(e) {
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
  function hu(e) {
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
  var bn = Math.random().toString(36).slice(2), Ht = "__reactFiber$" + bn, Br = "__reactProps$" + bn, Qt = "__reactContainer$" + bn, eo = "__reactEvents$" + bn, Ff = "__reactListeners$" + bn, Uf = "__reactHandles$" + bn;
  function Nn(e) {
    var t = e[Ht];
    if (t) return t;
    for (var n = e.parentNode; n; ) {
      if (t = n[Qt] || n[Ht]) {
        if (n = t.alternate, t.child !== null || n !== null && n.child !== null) for (e = hu(e); e !== null; ) {
          if (n = e[Ht]) return n;
          e = hu(e);
        }
        return t;
      }
      e = n, n = e.parentNode;
    }
    return null;
  }
  function Wr(e) {
    return e = e[Ht] || e[Qt], !e || e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3 ? null : e;
  }
  function er(e) {
    if (e.tag === 5 || e.tag === 6) return e.stateNode;
    throw Error(s(33));
  }
  function Mi(e) {
    return e[Br] || null;
  }
  var to = [], tr = -1;
  function pn(e) {
    return { current: e };
  }
  function ke(e) {
    0 > tr || (e.current = to[tr], to[tr] = null, tr--);
  }
  function we(e, t) {
    tr++, to[tr] = e.current, e.current = t;
  }
  var hn = {}, ot = pn(hn), ht = pn(!1), Dn = hn;
  function nr(e, t) {
    var n = e.type.contextTypes;
    if (!n) return hn;
    var r = e.stateNode;
    if (r && r.__reactInternalMemoizedUnmaskedChildContext === t) return r.__reactInternalMemoizedMaskedChildContext;
    var i = {}, l;
    for (l in n) i[l] = t[l];
    return r && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = t, e.__reactInternalMemoizedMaskedChildContext = i), i;
  }
  function mt(e) {
    return e = e.childContextTypes, e != null;
  }
  function Ii() {
    ke(ht), ke(ot);
  }
  function mu(e, t, n) {
    if (ot.current !== hn) throw Error(s(168));
    we(ot, t), we(ht, n);
  }
  function vu(e, t, n) {
    var r = e.stateNode;
    if (t = t.childContextTypes, typeof r.getChildContext != "function") return n;
    r = r.getChildContext();
    for (var i in r) if (!(i in t)) throw Error(s(108, he(e) || "Unknown", i));
    return z({}, n, r);
  }
  function Oi(e) {
    return e = (e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext || hn, Dn = ot.current, we(ot, e), we(ht, ht.current), !0;
  }
  function yu(e, t, n) {
    var r = e.stateNode;
    if (!r) throw Error(s(169));
    n ? (e = vu(e, t, Dn), r.__reactInternalMemoizedMergedChildContext = e, ke(ht), ke(ot), we(ot, e)) : ke(ht), we(ht, n);
  }
  var Gt = null, Ai = !1, no = !1;
  function gu(e) {
    Gt === null ? Gt = [e] : Gt.push(e);
  }
  function $f(e) {
    Ai = !0, gu(e);
  }
  function mn() {
    if (!no && Gt !== null) {
      no = !0;
      var e = 0, t = de;
      try {
        var n = Gt;
        for (de = 1; e < n.length; e++) {
          var r = n[e];
          do
            r = r(!0);
          while (r !== null);
        }
        Gt = null, Ai = !1;
      } catch (i) {
        throw Gt !== null && (Gt = Gt.slice(e + 1)), _s(El, mn), i;
      } finally {
        de = t, no = !1;
      }
    }
    return null;
  }
  var rr = [], ir = 0, ji = null, Fi = 0, Et = [], Ct = 0, Ln = null, Zt = 1, qt = "";
  function Mn(e, t) {
    rr[ir++] = Fi, rr[ir++] = ji, ji = e, Fi = t;
  }
  function wu(e, t, n) {
    Et[Ct++] = Zt, Et[Ct++] = qt, Et[Ct++] = Ln, Ln = e;
    var r = Zt;
    e = qt;
    var i = 32 - Mt(r) - 1;
    r &= ~(1 << i), n += 1;
    var l = 32 - Mt(t) + i;
    if (30 < l) {
      var u = i - i % 5;
      l = (r & (1 << u) - 1).toString(32), r >>= u, i -= u, Zt = 1 << 32 - Mt(t) + i | n << i | r, qt = l + e;
    } else Zt = 1 << l | n << i | r, qt = e;
  }
  function ro(e) {
    e.return !== null && (Mn(e, 1), wu(e, 1, 0));
  }
  function io(e) {
    for (; e === ji; ) ji = rr[--ir], rr[ir] = null, Fi = rr[--ir], rr[ir] = null;
    for (; e === Ln; ) Ln = Et[--Ct], Et[Ct] = null, qt = Et[--Ct], Et[Ct] = null, Zt = Et[--Ct], Et[Ct] = null;
  }
  var St = null, kt = null, Ce = !1, Ot = null;
  function _u(e, t) {
    var n = zt(5, null, null, 0);
    n.elementType = "DELETED", n.stateNode = t, n.return = e, t = e.deletions, t === null ? (e.deletions = [n], e.flags |= 16) : t.push(n);
  }
  function Su(e, t) {
    switch (e.tag) {
      case 5:
        var n = e.type;
        return t = t.nodeType !== 1 || n.toLowerCase() !== t.nodeName.toLowerCase() ? null : t, t !== null ? (e.stateNode = t, St = e, kt = dn(t.firstChild), !0) : !1;
      case 6:
        return t = e.pendingProps === "" || t.nodeType !== 3 ? null : t, t !== null ? (e.stateNode = t, St = e, kt = null, !0) : !1;
      case 13:
        return t = t.nodeType !== 8 ? null : t, t !== null ? (n = Ln !== null ? { id: Zt, overflow: qt } : null, e.memoizedState = { dehydrated: t, treeContext: n, retryLane: 1073741824 }, n = zt(18, null, null, 0), n.stateNode = t, n.return = e, e.child = n, St = e, kt = null, !0) : !1;
      default:
        return !1;
    }
  }
  function lo(e) {
    return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
  }
  function oo(e) {
    if (Ce) {
      var t = kt;
      if (t) {
        var n = t;
        if (!Su(e, t)) {
          if (lo(e)) throw Error(s(418));
          t = dn(n.nextSibling);
          var r = St;
          t && Su(e, t) ? _u(r, n) : (e.flags = e.flags & -4097 | 2, Ce = !1, St = e);
        }
      } else {
        if (lo(e)) throw Error(s(418));
        e.flags = e.flags & -4097 | 2, Ce = !1, St = e;
      }
    }
  }
  function ku(e) {
    for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13; ) e = e.return;
    St = e;
  }
  function Ui(e) {
    if (e !== St) return !1;
    if (!Ce) return ku(e), Ce = !0, !1;
    var t;
    if ((t = e.tag !== 3) && !(t = e.tag !== 5) && (t = e.type, t = t !== "head" && t !== "body" && !ql(e.type, e.memoizedProps)), t && (t = kt)) {
      if (lo(e)) throw xu(), Error(s(418));
      for (; t; ) _u(e, t), t = dn(t.nextSibling);
    }
    if (ku(e), e.tag === 13) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(s(317));
      e: {
        for (e = e.nextSibling, t = 0; e; ) {
          if (e.nodeType === 8) {
            var n = e.data;
            if (n === "/$") {
              if (t === 0) {
                kt = dn(e.nextSibling);
                break e;
              }
              t--;
            } else n !== "$" && n !== "$!" && n !== "$?" || t++;
          }
          e = e.nextSibling;
        }
        kt = null;
      }
    } else kt = St ? dn(e.stateNode.nextSibling) : null;
    return !0;
  }
  function xu() {
    for (var e = kt; e; ) e = dn(e.nextSibling);
  }
  function lr() {
    kt = St = null, Ce = !1;
  }
  function so(e) {
    Ot === null ? Ot = [e] : Ot.push(e);
  }
  var Vf = pe.ReactCurrentBatchConfig;
  function Yr(e, t, n) {
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
  function $i(e, t) {
    throw e = Object.prototype.toString.call(t), Error(s(31, e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e));
  }
  function Eu(e) {
    var t = e._init;
    return t(e._payload);
  }
  function Cu(e) {
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
      return v = xn(v, p), v.index = 0, v.sibling = null, v;
    }
    function l(v, p, y) {
      return v.index = y, e ? (y = v.alternate, y !== null ? (y = y.index, y < p ? (v.flags |= 2, p) : y) : (v.flags |= 2, p)) : (v.flags |= 1048576, p);
    }
    function u(v) {
      return e && v.alternate === null && (v.flags |= 2), v;
    }
    function f(v, p, y, E) {
      return p === null || p.tag !== 6 ? (p = bo(y, v.mode, E), p.return = v, p) : (p = i(p, y), p.return = v, p);
    }
    function d(v, p, y, E) {
      var A = y.type;
      return A === Ae ? S(v, p, y.props.children, E, y.key) : p !== null && (p.elementType === A || typeof A == "object" && A !== null && A.$$typeof === Ye && Eu(A) === p.type) ? (E = i(p, y.props), E.ref = Yr(v, p, y), E.return = v, E) : (E = cl(y.type, y.key, y.props, null, v.mode, E), E.ref = Yr(v, p, y), E.return = v, E);
    }
    function g(v, p, y, E) {
      return p === null || p.tag !== 4 || p.stateNode.containerInfo !== y.containerInfo || p.stateNode.implementation !== y.implementation ? (p = es(y, v.mode, E), p.return = v, p) : (p = i(p, y.children || []), p.return = v, p);
    }
    function S(v, p, y, E, A) {
      return p === null || p.tag !== 7 ? (p = Vn(y, v.mode, E, A), p.return = v, p) : (p = i(p, y), p.return = v, p);
    }
    function x(v, p, y) {
      if (typeof p == "string" && p !== "" || typeof p == "number") return p = bo("" + p, v.mode, y), p.return = v, p;
      if (typeof p == "object" && p !== null) {
        switch (p.$$typeof) {
          case We:
            return y = cl(p.type, p.key, p.props, null, v.mode, y), y.ref = Yr(v, null, p), y.return = v, y;
          case q:
            return p = es(p, v.mode, y), p.return = v, p;
          case Ye:
            var E = p._init;
            return x(v, E(p._payload), y);
        }
        if (ae(p) || j(p)) return p = Vn(p, v.mode, y, null), p.return = v, p;
        $i(v, p);
      }
      return null;
    }
    function _(v, p, y, E) {
      var A = p !== null ? p.key : null;
      if (typeof y == "string" && y !== "" || typeof y == "number") return A !== null ? null : f(v, p, "" + y, E);
      if (typeof y == "object" && y !== null) {
        switch (y.$$typeof) {
          case We:
            return y.key === A ? d(v, p, y, E) : null;
          case q:
            return y.key === A ? g(v, p, y, E) : null;
          case Ye:
            return A = y._init, _(
              v,
              p,
              A(y._payload),
              E
            );
        }
        if (ae(y) || j(y)) return A !== null ? null : S(v, p, y, E, null);
        $i(v, y);
      }
      return null;
    }
    function N(v, p, y, E, A) {
      if (typeof E == "string" && E !== "" || typeof E == "number") return v = v.get(y) || null, f(p, v, "" + E, A);
      if (typeof E == "object" && E !== null) {
        switch (E.$$typeof) {
          case We:
            return v = v.get(E.key === null ? y : E.key) || null, d(p, v, E, A);
          case q:
            return v = v.get(E.key === null ? y : E.key) || null, g(p, v, E, A);
          case Ye:
            var U = E._init;
            return N(v, p, y, U(E._payload), A);
        }
        if (ae(E) || j(E)) return v = v.get(y) || null, S(p, v, E, A, null);
        $i(p, E);
      }
      return null;
    }
    function I(v, p, y, E) {
      for (var A = null, U = null, $ = p, V = p = 0, Je = null; $ !== null && V < y.length; V++) {
        $.index > V ? (Je = $, $ = null) : Je = $.sibling;
        var oe = _(v, $, y[V], E);
        if (oe === null) {
          $ === null && ($ = Je);
          break;
        }
        e && $ && oe.alternate === null && t(v, $), p = l(oe, p, V), U === null ? A = oe : U.sibling = oe, U = oe, $ = Je;
      }
      if (V === y.length) return n(v, $), Ce && Mn(v, V), A;
      if ($ === null) {
        for (; V < y.length; V++) $ = x(v, y[V], E), $ !== null && (p = l($, p, V), U === null ? A = $ : U.sibling = $, U = $);
        return Ce && Mn(v, V), A;
      }
      for ($ = r(v, $); V < y.length; V++) Je = N($, v, V, y[V], E), Je !== null && (e && Je.alternate !== null && $.delete(Je.key === null ? V : Je.key), p = l(Je, p, V), U === null ? A = Je : U.sibling = Je, U = Je);
      return e && $.forEach(function(En) {
        return t(v, En);
      }), Ce && Mn(v, V), A;
    }
    function O(v, p, y, E) {
      var A = j(y);
      if (typeof A != "function") throw Error(s(150));
      if (y = A.call(y), y == null) throw Error(s(151));
      for (var U = A = null, $ = p, V = p = 0, Je = null, oe = y.next(); $ !== null && !oe.done; V++, oe = y.next()) {
        $.index > V ? (Je = $, $ = null) : Je = $.sibling;
        var En = _(v, $, oe.value, E);
        if (En === null) {
          $ === null && ($ = Je);
          break;
        }
        e && $ && En.alternate === null && t(v, $), p = l(En, p, V), U === null ? A = En : U.sibling = En, U = En, $ = Je;
      }
      if (oe.done) return n(
        v,
        $
      ), Ce && Mn(v, V), A;
      if ($ === null) {
        for (; !oe.done; V++, oe = y.next()) oe = x(v, oe.value, E), oe !== null && (p = l(oe, p, V), U === null ? A = oe : U.sibling = oe, U = oe);
        return Ce && Mn(v, V), A;
      }
      for ($ = r(v, $); !oe.done; V++, oe = y.next()) oe = N($, v, V, oe.value, E), oe !== null && (e && oe.alternate !== null && $.delete(oe.key === null ? V : oe.key), p = l(oe, p, V), U === null ? A = oe : U.sibling = oe, U = oe);
      return e && $.forEach(function(_d) {
        return t(v, _d);
      }), Ce && Mn(v, V), A;
    }
    function Fe(v, p, y, E) {
      if (typeof y == "object" && y !== null && y.type === Ae && y.key === null && (y = y.props.children), typeof y == "object" && y !== null) {
        switch (y.$$typeof) {
          case We:
            e: {
              for (var A = y.key, U = p; U !== null; ) {
                if (U.key === A) {
                  if (A = y.type, A === Ae) {
                    if (U.tag === 7) {
                      n(v, U.sibling), p = i(U, y.props.children), p.return = v, v = p;
                      break e;
                    }
                  } else if (U.elementType === A || typeof A == "object" && A !== null && A.$$typeof === Ye && Eu(A) === U.type) {
                    n(v, U.sibling), p = i(U, y.props), p.ref = Yr(v, U, y), p.return = v, v = p;
                    break e;
                  }
                  n(v, U);
                  break;
                } else t(v, U);
                U = U.sibling;
              }
              y.type === Ae ? (p = Vn(y.props.children, v.mode, E, y.key), p.return = v, v = p) : (E = cl(y.type, y.key, y.props, null, v.mode, E), E.ref = Yr(v, p, y), E.return = v, v = E);
            }
            return u(v);
          case q:
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
              p = es(y, v.mode, E), p.return = v, v = p;
            }
            return u(v);
          case Ye:
            return U = y._init, Fe(v, p, U(y._payload), E);
        }
        if (ae(y)) return I(v, p, y, E);
        if (j(y)) return O(v, p, y, E);
        $i(v, y);
      }
      return typeof y == "string" && y !== "" || typeof y == "number" ? (y = "" + y, p !== null && p.tag === 6 ? (n(v, p.sibling), p = i(p, y), p.return = v, v = p) : (n(v, p), p = bo(y, v.mode, E), p.return = v, v = p), u(v)) : n(v, p);
    }
    return Fe;
  }
  var or = Cu(!0), Tu = Cu(!1), Vi = pn(null), Hi = null, sr = null, uo = null;
  function ao() {
    uo = sr = Hi = null;
  }
  function co(e) {
    var t = Vi.current;
    ke(Vi), e._currentValue = t;
  }
  function fo(e, t, n) {
    for (; e !== null; ) {
      var r = e.alternate;
      if ((e.childLanes & t) !== t ? (e.childLanes |= t, r !== null && (r.childLanes |= t)) : r !== null && (r.childLanes & t) !== t && (r.childLanes |= t), e === n) break;
      e = e.return;
    }
  }
  function ur(e, t) {
    Hi = e, uo = sr = null, e = e.dependencies, e !== null && e.firstContext !== null && ((e.lanes & t) !== 0 && (vt = !0), e.firstContext = null);
  }
  function Tt(e) {
    var t = e._currentValue;
    if (uo !== e) if (e = { context: e, memoizedValue: t, next: null }, sr === null) {
      if (Hi === null) throw Error(s(308));
      sr = e, Hi.dependencies = { lanes: 0, firstContext: e };
    } else sr = sr.next = e;
    return t;
  }
  var In = null;
  function po(e) {
    In === null ? In = [e] : In.push(e);
  }
  function Pu(e, t, n, r) {
    var i = t.interleaved;
    return i === null ? (n.next = n, po(t)) : (n.next = i.next, i.next = n), t.interleaved = n, Jt(e, r);
  }
  function Jt(e, t) {
    e.lanes |= t;
    var n = e.alternate;
    for (n !== null && (n.lanes |= t), n = e, e = e.return; e !== null; ) e.childLanes |= t, n = e.alternate, n !== null && (n.childLanes |= t), n = e, e = e.return;
    return n.tag === 3 ? n.stateNode : null;
  }
  var vn = !1;
  function ho(e) {
    e.updateQueue = { baseState: e.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, interleaved: null, lanes: 0 }, effects: null };
  }
  function Ru(e, t) {
    e = e.updateQueue, t.updateQueue === e && (t.updateQueue = { baseState: e.baseState, firstBaseUpdate: e.firstBaseUpdate, lastBaseUpdate: e.lastBaseUpdate, shared: e.shared, effects: e.effects });
  }
  function bt(e, t) {
    return { eventTime: e, lane: t, tag: 0, payload: null, callback: null, next: null };
  }
  function yn(e, t, n) {
    var r = e.updateQueue;
    if (r === null) return null;
    if (r = r.shared, (le & 2) !== 0) {
      var i = r.pending;
      return i === null ? t.next = t : (t.next = i.next, i.next = t), r.pending = t, Jt(e, n);
    }
    return i = r.interleaved, i === null ? (t.next = t, po(r)) : (t.next = i.next, i.next = t), r.interleaved = t, Jt(e, n);
  }
  function Bi(e, t, n) {
    if (t = t.updateQueue, t !== null && (t = t.shared, (n & 4194240) !== 0)) {
      var r = t.lanes;
      r &= e.pendingLanes, n |= r, t.lanes = n, Pl(e, n);
    }
  }
  function zu(e, t) {
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
  function Wi(e, t, n, r) {
    var i = e.updateQueue;
    vn = !1;
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
        var _ = f.lane, N = f.eventTime;
        if ((r & _) === _) {
          S !== null && (S = S.next = {
            eventTime: N,
            lane: 0,
            tag: f.tag,
            payload: f.payload,
            callback: f.callback,
            next: null
          });
          e: {
            var I = e, O = f;
            switch (_ = t, N = n, O.tag) {
              case 1:
                if (I = O.payload, typeof I == "function") {
                  x = I.call(N, x, _);
                  break e;
                }
                x = I;
                break e;
              case 3:
                I.flags = I.flags & -65537 | 128;
              case 0:
                if (I = O.payload, _ = typeof I == "function" ? I.call(N, x, _) : I, _ == null) break e;
                x = z({}, x, _);
                break e;
              case 2:
                vn = !0;
            }
          }
          f.callback !== null && f.lane !== 0 && (e.flags |= 64, _ = i.effects, _ === null ? i.effects = [f] : _.push(f));
        } else N = { eventTime: N, lane: _, tag: f.tag, payload: f.payload, callback: f.callback, next: null }, S === null ? (g = S = N, d = x) : S = S.next = N, u |= _;
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
      jn |= u, e.lanes = u, e.memoizedState = x;
    }
  }
  function Nu(e, t, n) {
    if (e = t.effects, t.effects = null, e !== null) for (t = 0; t < e.length; t++) {
      var r = e[t], i = r.callback;
      if (i !== null) {
        if (r.callback = null, r = n, typeof i != "function") throw Error(s(191, i));
        i.call(r);
      }
    }
  }
  var Xr = {}, Bt = pn(Xr), Kr = pn(Xr), Qr = pn(Xr);
  function On(e) {
    if (e === Xr) throw Error(s(174));
    return e;
  }
  function mo(e, t) {
    switch (we(Qr, t), we(Kr, e), we(Bt, Xr), e = t.nodeType, e) {
      case 9:
      case 11:
        t = (t = t.documentElement) ? t.namespaceURI : Me(null, "");
        break;
      default:
        e = e === 8 ? t.parentNode : t, t = e.namespaceURI || null, e = e.tagName, t = Me(t, e);
    }
    ke(Bt), we(Bt, t);
  }
  function ar() {
    ke(Bt), ke(Kr), ke(Qr);
  }
  function Du(e) {
    On(Qr.current);
    var t = On(Bt.current), n = Me(t, e.type);
    t !== n && (we(Kr, e), we(Bt, n));
  }
  function vo(e) {
    Kr.current === e && (ke(Bt), ke(Kr));
  }
  var ze = pn(0);
  function Yi(e) {
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
  var yo = [];
  function go() {
    for (var e = 0; e < yo.length; e++) yo[e]._workInProgressVersionPrimary = null;
    yo.length = 0;
  }
  var Xi = pe.ReactCurrentDispatcher, wo = pe.ReactCurrentBatchConfig, An = 0, Ne = null, Ke = null, Ze = null, Ki = !1, Gr = !1, Zr = 0, Hf = 0;
  function st() {
    throw Error(s(321));
  }
  function _o(e, t) {
    if (t === null) return !1;
    for (var n = 0; n < t.length && n < e.length; n++) if (!It(e[n], t[n])) return !1;
    return !0;
  }
  function So(e, t, n, r, i, l) {
    if (An = l, Ne = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, Xi.current = e === null || e.memoizedState === null ? Xf : Kf, e = n(r, i), Gr) {
      l = 0;
      do {
        if (Gr = !1, Zr = 0, 25 <= l) throw Error(s(301));
        l += 1, Ze = Ke = null, t.updateQueue = null, Xi.current = Qf, e = n(r, i);
      } while (Gr);
    }
    if (Xi.current = Zi, t = Ke !== null && Ke.next !== null, An = 0, Ze = Ke = Ne = null, Ki = !1, t) throw Error(s(300));
    return e;
  }
  function ko() {
    var e = Zr !== 0;
    return Zr = 0, e;
  }
  function Wt() {
    var e = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
    return Ze === null ? Ne.memoizedState = Ze = e : Ze = Ze.next = e, Ze;
  }
  function Pt() {
    if (Ke === null) {
      var e = Ne.alternate;
      e = e !== null ? e.memoizedState : null;
    } else e = Ke.next;
    var t = Ze === null ? Ne.memoizedState : Ze.next;
    if (t !== null) Ze = t, Ke = e;
    else {
      if (e === null) throw Error(s(310));
      Ke = e, e = { memoizedState: Ke.memoizedState, baseState: Ke.baseState, baseQueue: Ke.baseQueue, queue: Ke.queue, next: null }, Ze === null ? Ne.memoizedState = Ze = e : Ze = Ze.next = e;
    }
    return Ze;
  }
  function qr(e, t) {
    return typeof t == "function" ? t(e) : t;
  }
  function xo(e) {
    var t = Pt(), n = t.queue;
    if (n === null) throw Error(s(311));
    n.lastRenderedReducer = e;
    var r = Ke, i = r.baseQueue, l = n.pending;
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
        if ((An & S) === S) d !== null && (d = d.next = { lane: 0, action: g.action, hasEagerState: g.hasEagerState, eagerState: g.eagerState, next: null }), r = g.hasEagerState ? g.eagerState : e(r, g.action);
        else {
          var x = {
            lane: S,
            action: g.action,
            hasEagerState: g.hasEagerState,
            eagerState: g.eagerState,
            next: null
          };
          d === null ? (f = d = x, u = r) : d = d.next = x, Ne.lanes |= S, jn |= S;
        }
        g = g.next;
      } while (g !== null && g !== l);
      d === null ? u = r : d.next = f, It(r, t.memoizedState) || (vt = !0), t.memoizedState = r, t.baseState = u, t.baseQueue = d, n.lastRenderedState = r;
    }
    if (e = n.interleaved, e !== null) {
      i = e;
      do
        l = i.lane, Ne.lanes |= l, jn |= l, i = i.next;
      while (i !== e);
    } else i === null && (n.lanes = 0);
    return [t.memoizedState, n.dispatch];
  }
  function Eo(e) {
    var t = Pt(), n = t.queue;
    if (n === null) throw Error(s(311));
    n.lastRenderedReducer = e;
    var r = n.dispatch, i = n.pending, l = t.memoizedState;
    if (i !== null) {
      n.pending = null;
      var u = i = i.next;
      do
        l = e(l, u.action), u = u.next;
      while (u !== i);
      It(l, t.memoizedState) || (vt = !0), t.memoizedState = l, t.baseQueue === null && (t.baseState = l), n.lastRenderedState = l;
    }
    return [l, r];
  }
  function Lu() {
  }
  function Mu(e, t) {
    var n = Ne, r = Pt(), i = t(), l = !It(r.memoizedState, i);
    if (l && (r.memoizedState = i, vt = !0), r = r.queue, Co(Au.bind(null, n, r, e), [e]), r.getSnapshot !== t || l || Ze !== null && Ze.memoizedState.tag & 1) {
      if (n.flags |= 2048, Jr(9, Ou.bind(null, n, r, i, t), void 0, null), qe === null) throw Error(s(349));
      (An & 30) !== 0 || Iu(n, t, i);
    }
    return i;
  }
  function Iu(e, t, n) {
    e.flags |= 16384, e = { getSnapshot: t, value: n }, t = Ne.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, Ne.updateQueue = t, t.stores = [e]) : (n = t.stores, n === null ? t.stores = [e] : n.push(e));
  }
  function Ou(e, t, n, r) {
    t.value = n, t.getSnapshot = r, ju(t) && Fu(e);
  }
  function Au(e, t, n) {
    return n(function() {
      ju(t) && Fu(e);
    });
  }
  function ju(e) {
    var t = e.getSnapshot;
    e = e.value;
    try {
      var n = t();
      return !It(e, n);
    } catch {
      return !0;
    }
  }
  function Fu(e) {
    var t = Jt(e, 1);
    t !== null && Ut(t, e, 1, -1);
  }
  function Uu(e) {
    var t = Wt();
    return typeof e == "function" && (e = e()), t.memoizedState = t.baseState = e, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: qr, lastRenderedState: e }, t.queue = e, e = e.dispatch = Yf.bind(null, Ne, e), [t.memoizedState, e];
  }
  function Jr(e, t, n, r) {
    return e = { tag: e, create: t, destroy: n, deps: r, next: null }, t = Ne.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, Ne.updateQueue = t, t.lastEffect = e.next = e) : (n = t.lastEffect, n === null ? t.lastEffect = e.next = e : (r = n.next, n.next = e, e.next = r, t.lastEffect = e)), e;
  }
  function $u() {
    return Pt().memoizedState;
  }
  function Qi(e, t, n, r) {
    var i = Wt();
    Ne.flags |= e, i.memoizedState = Jr(1 | t, n, void 0, r === void 0 ? null : r);
  }
  function Gi(e, t, n, r) {
    var i = Pt();
    r = r === void 0 ? null : r;
    var l = void 0;
    if (Ke !== null) {
      var u = Ke.memoizedState;
      if (l = u.destroy, r !== null && _o(r, u.deps)) {
        i.memoizedState = Jr(t, n, l, r);
        return;
      }
    }
    Ne.flags |= e, i.memoizedState = Jr(1 | t, n, l, r);
  }
  function Vu(e, t) {
    return Qi(8390656, 8, e, t);
  }
  function Co(e, t) {
    return Gi(2048, 8, e, t);
  }
  function Hu(e, t) {
    return Gi(4, 2, e, t);
  }
  function Bu(e, t) {
    return Gi(4, 4, e, t);
  }
  function Wu(e, t) {
    if (typeof t == "function") return e = e(), t(e), function() {
      t(null);
    };
    if (t != null) return e = e(), t.current = e, function() {
      t.current = null;
    };
  }
  function Yu(e, t, n) {
    return n = n != null ? n.concat([e]) : null, Gi(4, 4, Wu.bind(null, t, e), n);
  }
  function To() {
  }
  function Xu(e, t) {
    var n = Pt();
    t = t === void 0 ? null : t;
    var r = n.memoizedState;
    return r !== null && t !== null && _o(t, r[1]) ? r[0] : (n.memoizedState = [e, t], e);
  }
  function Ku(e, t) {
    var n = Pt();
    t = t === void 0 ? null : t;
    var r = n.memoizedState;
    return r !== null && t !== null && _o(t, r[1]) ? r[0] : (e = e(), n.memoizedState = [e, t], e);
  }
  function Qu(e, t, n) {
    return (An & 21) === 0 ? (e.baseState && (e.baseState = !1, vt = !0), e.memoizedState = n) : (It(n, t) || (n = Es(), Ne.lanes |= n, jn |= n, e.baseState = !0), t);
  }
  function Bf(e, t) {
    var n = de;
    de = n !== 0 && 4 > n ? n : 4, e(!0);
    var r = wo.transition;
    wo.transition = {};
    try {
      e(!1), t();
    } finally {
      de = n, wo.transition = r;
    }
  }
  function Gu() {
    return Pt().memoizedState;
  }
  function Wf(e, t, n) {
    var r = Sn(e);
    if (n = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null }, Zu(e)) qu(t, n);
    else if (n = Pu(e, t, n, r), n !== null) {
      var i = pt();
      Ut(n, e, r, i), Ju(n, t, r);
    }
  }
  function Yf(e, t, n) {
    var r = Sn(e), i = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null };
    if (Zu(e)) qu(t, i);
    else {
      var l = e.alternate;
      if (e.lanes === 0 && (l === null || l.lanes === 0) && (l = t.lastRenderedReducer, l !== null)) try {
        var u = t.lastRenderedState, f = l(u, n);
        if (i.hasEagerState = !0, i.eagerState = f, It(f, u)) {
          var d = t.interleaved;
          d === null ? (i.next = i, po(t)) : (i.next = d.next, d.next = i), t.interleaved = i;
          return;
        }
      } catch {
      } finally {
      }
      n = Pu(e, t, i, r), n !== null && (i = pt(), Ut(n, e, r, i), Ju(n, t, r));
    }
  }
  function Zu(e) {
    var t = e.alternate;
    return e === Ne || t !== null && t === Ne;
  }
  function qu(e, t) {
    Gr = Ki = !0;
    var n = e.pending;
    n === null ? t.next = t : (t.next = n.next, n.next = t), e.pending = t;
  }
  function Ju(e, t, n) {
    if ((n & 4194240) !== 0) {
      var r = t.lanes;
      r &= e.pendingLanes, n |= r, t.lanes = n, Pl(e, n);
    }
  }
  var Zi = { readContext: Tt, useCallback: st, useContext: st, useEffect: st, useImperativeHandle: st, useInsertionEffect: st, useLayoutEffect: st, useMemo: st, useReducer: st, useRef: st, useState: st, useDebugValue: st, useDeferredValue: st, useTransition: st, useMutableSource: st, useSyncExternalStore: st, useId: st, unstable_isNewReconciler: !1 }, Xf = { readContext: Tt, useCallback: function(e, t) {
    return Wt().memoizedState = [e, t === void 0 ? null : t], e;
  }, useContext: Tt, useEffect: Vu, useImperativeHandle: function(e, t, n) {
    return n = n != null ? n.concat([e]) : null, Qi(
      4194308,
      4,
      Wu.bind(null, t, e),
      n
    );
  }, useLayoutEffect: function(e, t) {
    return Qi(4194308, 4, e, t);
  }, useInsertionEffect: function(e, t) {
    return Qi(4, 2, e, t);
  }, useMemo: function(e, t) {
    var n = Wt();
    return t = t === void 0 ? null : t, e = e(), n.memoizedState = [e, t], e;
  }, useReducer: function(e, t, n) {
    var r = Wt();
    return t = n !== void 0 ? n(t) : t, r.memoizedState = r.baseState = t, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: e, lastRenderedState: t }, r.queue = e, e = e.dispatch = Wf.bind(null, Ne, e), [r.memoizedState, e];
  }, useRef: function(e) {
    var t = Wt();
    return e = { current: e }, t.memoizedState = e;
  }, useState: Uu, useDebugValue: To, useDeferredValue: function(e) {
    return Wt().memoizedState = e;
  }, useTransition: function() {
    var e = Uu(!1), t = e[0];
    return e = Bf.bind(null, e[1]), Wt().memoizedState = e, [t, e];
  }, useMutableSource: function() {
  }, useSyncExternalStore: function(e, t, n) {
    var r = Ne, i = Wt();
    if (Ce) {
      if (n === void 0) throw Error(s(407));
      n = n();
    } else {
      if (n = t(), qe === null) throw Error(s(349));
      (An & 30) !== 0 || Iu(r, t, n);
    }
    i.memoizedState = n;
    var l = { value: n, getSnapshot: t };
    return i.queue = l, Vu(Au.bind(
      null,
      r,
      l,
      e
    ), [e]), r.flags |= 2048, Jr(9, Ou.bind(null, r, l, n, t), void 0, null), n;
  }, useId: function() {
    var e = Wt(), t = qe.identifierPrefix;
    if (Ce) {
      var n = qt, r = Zt;
      n = (r & ~(1 << 32 - Mt(r) - 1)).toString(32) + n, t = ":" + t + "R" + n, n = Zr++, 0 < n && (t += "H" + n.toString(32)), t += ":";
    } else n = Hf++, t = ":" + t + "r" + n.toString(32) + ":";
    return e.memoizedState = t;
  }, unstable_isNewReconciler: !1 }, Kf = {
    readContext: Tt,
    useCallback: Xu,
    useContext: Tt,
    useEffect: Co,
    useImperativeHandle: Yu,
    useInsertionEffect: Hu,
    useLayoutEffect: Bu,
    useMemo: Ku,
    useReducer: xo,
    useRef: $u,
    useState: function() {
      return xo(qr);
    },
    useDebugValue: To,
    useDeferredValue: function(e) {
      var t = Pt();
      return Qu(t, Ke.memoizedState, e);
    },
    useTransition: function() {
      var e = xo(qr)[0], t = Pt().memoizedState;
      return [e, t];
    },
    useMutableSource: Lu,
    useSyncExternalStore: Mu,
    useId: Gu,
    unstable_isNewReconciler: !1
  }, Qf = { readContext: Tt, useCallback: Xu, useContext: Tt, useEffect: Co, useImperativeHandle: Yu, useInsertionEffect: Hu, useLayoutEffect: Bu, useMemo: Ku, useReducer: Eo, useRef: $u, useState: function() {
    return Eo(qr);
  }, useDebugValue: To, useDeferredValue: function(e) {
    var t = Pt();
    return Ke === null ? t.memoizedState = e : Qu(t, Ke.memoizedState, e);
  }, useTransition: function() {
    var e = Eo(qr)[0], t = Pt().memoizedState;
    return [e, t];
  }, useMutableSource: Lu, useSyncExternalStore: Mu, useId: Gu, unstable_isNewReconciler: !1 };
  function At(e, t) {
    if (e && e.defaultProps) {
      t = z({}, t), e = e.defaultProps;
      for (var n in e) t[n] === void 0 && (t[n] = e[n]);
      return t;
    }
    return t;
  }
  function Po(e, t, n, r) {
    t = e.memoizedState, n = n(r, t), n = n == null ? t : z({}, t, n), e.memoizedState = n, e.lanes === 0 && (e.updateQueue.baseState = n);
  }
  var qi = { isMounted: function(e) {
    return (e = e._reactInternals) ? zn(e) === e : !1;
  }, enqueueSetState: function(e, t, n) {
    e = e._reactInternals;
    var r = pt(), i = Sn(e), l = bt(r, i);
    l.payload = t, n != null && (l.callback = n), t = yn(e, l, i), t !== null && (Ut(t, e, i, r), Bi(t, e, i));
  }, enqueueReplaceState: function(e, t, n) {
    e = e._reactInternals;
    var r = pt(), i = Sn(e), l = bt(r, i);
    l.tag = 1, l.payload = t, n != null && (l.callback = n), t = yn(e, l, i), t !== null && (Ut(t, e, i, r), Bi(t, e, i));
  }, enqueueForceUpdate: function(e, t) {
    e = e._reactInternals;
    var n = pt(), r = Sn(e), i = bt(n, r);
    i.tag = 2, t != null && (i.callback = t), t = yn(e, i, r), t !== null && (Ut(t, e, r, n), Bi(t, e, r));
  } };
  function bu(e, t, n, r, i, l, u) {
    return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(r, l, u) : t.prototype && t.prototype.isPureReactComponent ? !Fr(n, r) || !Fr(i, l) : !0;
  }
  function ea(e, t, n) {
    var r = !1, i = hn, l = t.contextType;
    return typeof l == "object" && l !== null ? l = Tt(l) : (i = mt(t) ? Dn : ot.current, r = t.contextTypes, l = (r = r != null) ? nr(e, i) : hn), t = new t(n, l), e.memoizedState = t.state !== null && t.state !== void 0 ? t.state : null, t.updater = qi, e.stateNode = t, t._reactInternals = e, r && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = i, e.__reactInternalMemoizedMaskedChildContext = l), t;
  }
  function ta(e, t, n, r) {
    e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, r), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, r), t.state !== e && qi.enqueueReplaceState(t, t.state, null);
  }
  function Ro(e, t, n, r) {
    var i = e.stateNode;
    i.props = n, i.state = e.memoizedState, i.refs = {}, ho(e);
    var l = t.contextType;
    typeof l == "object" && l !== null ? i.context = Tt(l) : (l = mt(t) ? Dn : ot.current, i.context = nr(e, l)), i.state = e.memoizedState, l = t.getDerivedStateFromProps, typeof l == "function" && (Po(e, t, l, n), i.state = e.memoizedState), typeof t.getDerivedStateFromProps == "function" || typeof i.getSnapshotBeforeUpdate == "function" || typeof i.UNSAFE_componentWillMount != "function" && typeof i.componentWillMount != "function" || (t = i.state, typeof i.componentWillMount == "function" && i.componentWillMount(), typeof i.UNSAFE_componentWillMount == "function" && i.UNSAFE_componentWillMount(), t !== i.state && qi.enqueueReplaceState(i, i.state, null), Wi(e, n, i, r), i.state = e.memoizedState), typeof i.componentDidMount == "function" && (e.flags |= 4194308);
  }
  function cr(e, t) {
    try {
      var n = "", r = t;
      do
        n += J(r), r = r.return;
      while (r);
      var i = n;
    } catch (l) {
      i = `
Error generating stack: ` + l.message + `
` + l.stack;
    }
    return { value: e, source: t, stack: i, digest: null };
  }
  function zo(e, t, n) {
    return { value: e, source: null, stack: n ?? null, digest: t ?? null };
  }
  function No(e, t) {
    try {
      console.error(t.value);
    } catch (n) {
      setTimeout(function() {
        throw n;
      });
    }
  }
  var Gf = typeof WeakMap == "function" ? WeakMap : Map;
  function na(e, t, n) {
    n = bt(-1, n), n.tag = 3, n.payload = { element: null };
    var r = t.value;
    return n.callback = function() {
      il || (il = !0, Yo = r), No(e, t);
    }, n;
  }
  function ra(e, t, n) {
    n = bt(-1, n), n.tag = 3;
    var r = e.type.getDerivedStateFromError;
    if (typeof r == "function") {
      var i = t.value;
      n.payload = function() {
        return r(i);
      }, n.callback = function() {
        No(e, t);
      };
    }
    var l = e.stateNode;
    return l !== null && typeof l.componentDidCatch == "function" && (n.callback = function() {
      No(e, t), typeof r != "function" && (wn === null ? wn = /* @__PURE__ */ new Set([this]) : wn.add(this));
      var u = t.stack;
      this.componentDidCatch(t.value, { componentStack: u !== null ? u : "" });
    }), n;
  }
  function ia(e, t, n) {
    var r = e.pingCache;
    if (r === null) {
      r = e.pingCache = new Gf();
      var i = /* @__PURE__ */ new Set();
      r.set(t, i);
    } else i = r.get(t), i === void 0 && (i = /* @__PURE__ */ new Set(), r.set(t, i));
    i.has(n) || (i.add(n), e = ad.bind(null, e, t, n), t.then(e, e));
  }
  function la(e) {
    do {
      var t;
      if ((t = e.tag === 13) && (t = e.memoizedState, t = t !== null ? t.dehydrated !== null : !0), t) return e;
      e = e.return;
    } while (e !== null);
    return null;
  }
  function oa(e, t, n, r, i) {
    return (e.mode & 1) === 0 ? (e === t ? e.flags |= 65536 : (e.flags |= 128, n.flags |= 131072, n.flags &= -52805, n.tag === 1 && (n.alternate === null ? n.tag = 17 : (t = bt(-1, 1), t.tag = 2, yn(n, t, 1))), n.lanes |= 1), e) : (e.flags |= 65536, e.lanes = i, e);
  }
  var Zf = pe.ReactCurrentOwner, vt = !1;
  function dt(e, t, n, r) {
    t.child = e === null ? Tu(t, null, n, r) : or(t, e.child, n, r);
  }
  function sa(e, t, n, r, i) {
    n = n.render;
    var l = t.ref;
    return ur(t, i), r = So(e, t, n, r, l, i), n = ko(), e !== null && !vt ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~i, en(e, t, i)) : (Ce && n && ro(t), t.flags |= 1, dt(e, t, r, i), t.child);
  }
  function ua(e, t, n, r, i) {
    if (e === null) {
      var l = n.type;
      return typeof l == "function" && !Jo(l) && l.defaultProps === void 0 && n.compare === null && n.defaultProps === void 0 ? (t.tag = 15, t.type = l, aa(e, t, l, r, i)) : (e = cl(n.type, null, r, t, t.mode, i), e.ref = t.ref, e.return = t, t.child = e);
    }
    if (l = e.child, (e.lanes & i) === 0) {
      var u = l.memoizedProps;
      if (n = n.compare, n = n !== null ? n : Fr, n(u, r) && e.ref === t.ref) return en(e, t, i);
    }
    return t.flags |= 1, e = xn(l, r), e.ref = t.ref, e.return = t, t.child = e;
  }
  function aa(e, t, n, r, i) {
    if (e !== null) {
      var l = e.memoizedProps;
      if (Fr(l, r) && e.ref === t.ref) if (vt = !1, t.pendingProps = r = l, (e.lanes & i) !== 0) (e.flags & 131072) !== 0 && (vt = !0);
      else return t.lanes = e.lanes, en(e, t, i);
    }
    return Do(e, t, n, r, i);
  }
  function ca(e, t, n) {
    var r = t.pendingProps, i = r.children, l = e !== null ? e.memoizedState : null;
    if (r.mode === "hidden") if ((t.mode & 1) === 0) t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, we(dr, xt), xt |= n;
    else {
      if ((n & 1073741824) === 0) return e = l !== null ? l.baseLanes | n : n, t.lanes = t.childLanes = 1073741824, t.memoizedState = { baseLanes: e, cachePool: null, transitions: null }, t.updateQueue = null, we(dr, xt), xt |= e, null;
      t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, r = l !== null ? l.baseLanes : n, we(dr, xt), xt |= r;
    }
    else l !== null ? (r = l.baseLanes | n, t.memoizedState = null) : r = n, we(dr, xt), xt |= r;
    return dt(e, t, i, n), t.child;
  }
  function fa(e, t) {
    var n = t.ref;
    (e === null && n !== null || e !== null && e.ref !== n) && (t.flags |= 512, t.flags |= 2097152);
  }
  function Do(e, t, n, r, i) {
    var l = mt(n) ? Dn : ot.current;
    return l = nr(t, l), ur(t, i), n = So(e, t, n, r, l, i), r = ko(), e !== null && !vt ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~i, en(e, t, i)) : (Ce && r && ro(t), t.flags |= 1, dt(e, t, n, i), t.child);
  }
  function da(e, t, n, r, i) {
    if (mt(n)) {
      var l = !0;
      Oi(t);
    } else l = !1;
    if (ur(t, i), t.stateNode === null) bi(e, t), ea(t, n, r), Ro(t, n, r, i), r = !0;
    else if (e === null) {
      var u = t.stateNode, f = t.memoizedProps;
      u.props = f;
      var d = u.context, g = n.contextType;
      typeof g == "object" && g !== null ? g = Tt(g) : (g = mt(n) ? Dn : ot.current, g = nr(t, g));
      var S = n.getDerivedStateFromProps, x = typeof S == "function" || typeof u.getSnapshotBeforeUpdate == "function";
      x || typeof u.UNSAFE_componentWillReceiveProps != "function" && typeof u.componentWillReceiveProps != "function" || (f !== r || d !== g) && ta(t, u, r, g), vn = !1;
      var _ = t.memoizedState;
      u.state = _, Wi(t, r, u, i), d = t.memoizedState, f !== r || _ !== d || ht.current || vn ? (typeof S == "function" && (Po(t, n, S, r), d = t.memoizedState), (f = vn || bu(t, n, f, r, _, d, g)) ? (x || typeof u.UNSAFE_componentWillMount != "function" && typeof u.componentWillMount != "function" || (typeof u.componentWillMount == "function" && u.componentWillMount(), typeof u.UNSAFE_componentWillMount == "function" && u.UNSAFE_componentWillMount()), typeof u.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof u.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = r, t.memoizedState = d), u.props = r, u.state = d, u.context = g, r = f) : (typeof u.componentDidMount == "function" && (t.flags |= 4194308), r = !1);
    } else {
      u = t.stateNode, Ru(e, t), f = t.memoizedProps, g = t.type === t.elementType ? f : At(t.type, f), u.props = g, x = t.pendingProps, _ = u.context, d = n.contextType, typeof d == "object" && d !== null ? d = Tt(d) : (d = mt(n) ? Dn : ot.current, d = nr(t, d));
      var N = n.getDerivedStateFromProps;
      (S = typeof N == "function" || typeof u.getSnapshotBeforeUpdate == "function") || typeof u.UNSAFE_componentWillReceiveProps != "function" && typeof u.componentWillReceiveProps != "function" || (f !== x || _ !== d) && ta(t, u, r, d), vn = !1, _ = t.memoizedState, u.state = _, Wi(t, r, u, i);
      var I = t.memoizedState;
      f !== x || _ !== I || ht.current || vn ? (typeof N == "function" && (Po(t, n, N, r), I = t.memoizedState), (g = vn || bu(t, n, g, r, _, I, d) || !1) ? (S || typeof u.UNSAFE_componentWillUpdate != "function" && typeof u.componentWillUpdate != "function" || (typeof u.componentWillUpdate == "function" && u.componentWillUpdate(r, I, d), typeof u.UNSAFE_componentWillUpdate == "function" && u.UNSAFE_componentWillUpdate(r, I, d)), typeof u.componentDidUpdate == "function" && (t.flags |= 4), typeof u.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof u.componentDidUpdate != "function" || f === e.memoizedProps && _ === e.memoizedState || (t.flags |= 4), typeof u.getSnapshotBeforeUpdate != "function" || f === e.memoizedProps && _ === e.memoizedState || (t.flags |= 1024), t.memoizedProps = r, t.memoizedState = I), u.props = r, u.state = I, u.context = d, r = g) : (typeof u.componentDidUpdate != "function" || f === e.memoizedProps && _ === e.memoizedState || (t.flags |= 4), typeof u.getSnapshotBeforeUpdate != "function" || f === e.memoizedProps && _ === e.memoizedState || (t.flags |= 1024), r = !1);
    }
    return Lo(e, t, n, r, l, i);
  }
  function Lo(e, t, n, r, i, l) {
    fa(e, t);
    var u = (t.flags & 128) !== 0;
    if (!r && !u) return i && yu(t, n, !1), en(e, t, l);
    r = t.stateNode, Zf.current = t;
    var f = u && typeof n.getDerivedStateFromError != "function" ? null : r.render();
    return t.flags |= 1, e !== null && u ? (t.child = or(t, e.child, null, l), t.child = or(t, null, f, l)) : dt(e, t, f, l), t.memoizedState = r.state, i && yu(t, n, !0), t.child;
  }
  function pa(e) {
    var t = e.stateNode;
    t.pendingContext ? mu(e, t.pendingContext, t.pendingContext !== t.context) : t.context && mu(e, t.context, !1), mo(e, t.containerInfo);
  }
  function ha(e, t, n, r, i) {
    return lr(), so(i), t.flags |= 256, dt(e, t, n, r), t.child;
  }
  var Mo = { dehydrated: null, treeContext: null, retryLane: 0 };
  function Io(e) {
    return { baseLanes: e, cachePool: null, transitions: null };
  }
  function ma(e, t, n) {
    var r = t.pendingProps, i = ze.current, l = !1, u = (t.flags & 128) !== 0, f;
    if ((f = u) || (f = e !== null && e.memoizedState === null ? !1 : (i & 2) !== 0), f ? (l = !0, t.flags &= -129) : (e === null || e.memoizedState !== null) && (i |= 1), we(ze, i & 1), e === null)
      return oo(t), e = t.memoizedState, e !== null && (e = e.dehydrated, e !== null) ? ((t.mode & 1) === 0 ? t.lanes = 1 : e.data === "$!" ? t.lanes = 8 : t.lanes = 1073741824, null) : (u = r.children, e = r.fallback, l ? (r = t.mode, l = t.child, u = { mode: "hidden", children: u }, (r & 1) === 0 && l !== null ? (l.childLanes = 0, l.pendingProps = u) : l = fl(u, r, 0, null), e = Vn(e, r, n, null), l.return = t, e.return = t, l.sibling = e, t.child = l, t.child.memoizedState = Io(n), t.memoizedState = Mo, e) : Oo(t, u));
    if (i = e.memoizedState, i !== null && (f = i.dehydrated, f !== null)) return qf(e, t, u, r, f, i, n);
    if (l) {
      l = r.fallback, u = t.mode, i = e.child, f = i.sibling;
      var d = { mode: "hidden", children: r.children };
      return (u & 1) === 0 && t.child !== i ? (r = t.child, r.childLanes = 0, r.pendingProps = d, t.deletions = null) : (r = xn(i, d), r.subtreeFlags = i.subtreeFlags & 14680064), f !== null ? l = xn(f, l) : (l = Vn(l, u, n, null), l.flags |= 2), l.return = t, r.return = t, r.sibling = l, t.child = r, r = l, l = t.child, u = e.child.memoizedState, u = u === null ? Io(n) : { baseLanes: u.baseLanes | n, cachePool: null, transitions: u.transitions }, l.memoizedState = u, l.childLanes = e.childLanes & ~n, t.memoizedState = Mo, r;
    }
    return l = e.child, e = l.sibling, r = xn(l, { mode: "visible", children: r.children }), (t.mode & 1) === 0 && (r.lanes = n), r.return = t, r.sibling = null, e !== null && (n = t.deletions, n === null ? (t.deletions = [e], t.flags |= 16) : n.push(e)), t.child = r, t.memoizedState = null, r;
  }
  function Oo(e, t) {
    return t = fl({ mode: "visible", children: t }, e.mode, 0, null), t.return = e, e.child = t;
  }
  function Ji(e, t, n, r) {
    return r !== null && so(r), or(t, e.child, null, n), e = Oo(t, t.pendingProps.children), e.flags |= 2, t.memoizedState = null, e;
  }
  function qf(e, t, n, r, i, l, u) {
    if (n)
      return t.flags & 256 ? (t.flags &= -257, r = zo(Error(s(422))), Ji(e, t, u, r)) : t.memoizedState !== null ? (t.child = e.child, t.flags |= 128, null) : (l = r.fallback, i = t.mode, r = fl({ mode: "visible", children: r.children }, i, 0, null), l = Vn(l, i, u, null), l.flags |= 2, r.return = t, l.return = t, r.sibling = l, t.child = r, (t.mode & 1) !== 0 && or(t, e.child, null, u), t.child.memoizedState = Io(u), t.memoizedState = Mo, l);
    if ((t.mode & 1) === 0) return Ji(e, t, u, null);
    if (i.data === "$!") {
      if (r = i.nextSibling && i.nextSibling.dataset, r) var f = r.dgst;
      return r = f, l = Error(s(419)), r = zo(l, r, void 0), Ji(e, t, u, r);
    }
    if (f = (u & e.childLanes) !== 0, vt || f) {
      if (r = qe, r !== null) {
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
        i = (i & (r.suspendedLanes | u)) !== 0 ? 0 : i, i !== 0 && i !== l.retryLane && (l.retryLane = i, Jt(e, i), Ut(r, e, i, -1));
      }
      return qo(), r = zo(Error(s(421))), Ji(e, t, u, r);
    }
    return i.data === "$?" ? (t.flags |= 128, t.child = e.child, t = cd.bind(null, e), i._reactRetry = t, null) : (e = l.treeContext, kt = dn(i.nextSibling), St = t, Ce = !0, Ot = null, e !== null && (Et[Ct++] = Zt, Et[Ct++] = qt, Et[Ct++] = Ln, Zt = e.id, qt = e.overflow, Ln = t), t = Oo(t, r.children), t.flags |= 4096, t);
  }
  function va(e, t, n) {
    e.lanes |= t;
    var r = e.alternate;
    r !== null && (r.lanes |= t), fo(e.return, t, n);
  }
  function Ao(e, t, n, r, i) {
    var l = e.memoizedState;
    l === null ? e.memoizedState = { isBackwards: t, rendering: null, renderingStartTime: 0, last: r, tail: n, tailMode: i } : (l.isBackwards = t, l.rendering = null, l.renderingStartTime = 0, l.last = r, l.tail = n, l.tailMode = i);
  }
  function ya(e, t, n) {
    var r = t.pendingProps, i = r.revealOrder, l = r.tail;
    if (dt(e, t, r.children, n), r = ze.current, (r & 2) !== 0) r = r & 1 | 2, t.flags |= 128;
    else {
      if (e !== null && (e.flags & 128) !== 0) e: for (e = t.child; e !== null; ) {
        if (e.tag === 13) e.memoizedState !== null && va(e, n, t);
        else if (e.tag === 19) va(e, n, t);
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
    if (we(ze, r), (t.mode & 1) === 0) t.memoizedState = null;
    else switch (i) {
      case "forwards":
        for (n = t.child, i = null; n !== null; ) e = n.alternate, e !== null && Yi(e) === null && (i = n), n = n.sibling;
        n = i, n === null ? (i = t.child, t.child = null) : (i = n.sibling, n.sibling = null), Ao(t, !1, i, n, l);
        break;
      case "backwards":
        for (n = null, i = t.child, t.child = null; i !== null; ) {
          if (e = i.alternate, e !== null && Yi(e) === null) {
            t.child = i;
            break;
          }
          e = i.sibling, i.sibling = n, n = i, i = e;
        }
        Ao(t, !0, n, null, l);
        break;
      case "together":
        Ao(t, !1, null, null, void 0);
        break;
      default:
        t.memoizedState = null;
    }
    return t.child;
  }
  function bi(e, t) {
    (t.mode & 1) === 0 && e !== null && (e.alternate = null, t.alternate = null, t.flags |= 2);
  }
  function en(e, t, n) {
    if (e !== null && (t.dependencies = e.dependencies), jn |= t.lanes, (n & t.childLanes) === 0) return null;
    if (e !== null && t.child !== e.child) throw Error(s(153));
    if (t.child !== null) {
      for (e = t.child, n = xn(e, e.pendingProps), t.child = n, n.return = t; e.sibling !== null; ) e = e.sibling, n = n.sibling = xn(e, e.pendingProps), n.return = t;
      n.sibling = null;
    }
    return t.child;
  }
  function Jf(e, t, n) {
    switch (t.tag) {
      case 3:
        pa(t), lr();
        break;
      case 5:
        Du(t);
        break;
      case 1:
        mt(t.type) && Oi(t);
        break;
      case 4:
        mo(t, t.stateNode.containerInfo);
        break;
      case 10:
        var r = t.type._context, i = t.memoizedProps.value;
        we(Vi, r._currentValue), r._currentValue = i;
        break;
      case 13:
        if (r = t.memoizedState, r !== null)
          return r.dehydrated !== null ? (we(ze, ze.current & 1), t.flags |= 128, null) : (n & t.child.childLanes) !== 0 ? ma(e, t, n) : (we(ze, ze.current & 1), e = en(e, t, n), e !== null ? e.sibling : null);
        we(ze, ze.current & 1);
        break;
      case 19:
        if (r = (n & t.childLanes) !== 0, (e.flags & 128) !== 0) {
          if (r) return ya(e, t, n);
          t.flags |= 128;
        }
        if (i = t.memoizedState, i !== null && (i.rendering = null, i.tail = null, i.lastEffect = null), we(ze, ze.current), r) break;
        return null;
      case 22:
      case 23:
        return t.lanes = 0, ca(e, t, n);
    }
    return en(e, t, n);
  }
  var ga, jo, wa, _a;
  ga = function(e, t) {
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
  }, jo = function() {
  }, wa = function(e, t, n, r) {
    var i = e.memoizedProps;
    if (i !== r) {
      e = t.stateNode, On(Bt.current);
      var l = null;
      switch (n) {
        case "input":
          i = F(e, i), r = F(e, r), l = [];
          break;
        case "select":
          i = z({}, i, { value: void 0 }), r = z({}, r, { value: void 0 }), l = [];
          break;
        case "textarea":
          i = Le(e, i), r = Le(e, r), l = [];
          break;
        default:
          typeof i.onClick != "function" && typeof r.onClick == "function" && (e.onclick = Li);
      }
      Pn(n, r);
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
  }, _a = function(e, t, n, r) {
    n !== r && (t.flags |= 4);
  };
  function br(e, t) {
    if (!Ce) switch (e.tailMode) {
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
  function ut(e) {
    var t = e.alternate !== null && e.alternate.child === e.child, n = 0, r = 0;
    if (t) for (var i = e.child; i !== null; ) n |= i.lanes | i.childLanes, r |= i.subtreeFlags & 14680064, r |= i.flags & 14680064, i.return = e, i = i.sibling;
    else for (i = e.child; i !== null; ) n |= i.lanes | i.childLanes, r |= i.subtreeFlags, r |= i.flags, i.return = e, i = i.sibling;
    return e.subtreeFlags |= r, e.childLanes = n, t;
  }
  function bf(e, t, n) {
    var r = t.pendingProps;
    switch (io(t), t.tag) {
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
        return ut(t), null;
      case 1:
        return mt(t.type) && Ii(), ut(t), null;
      case 3:
        return r = t.stateNode, ar(), ke(ht), ke(ot), go(), r.pendingContext && (r.context = r.pendingContext, r.pendingContext = null), (e === null || e.child === null) && (Ui(t) ? t.flags |= 4 : e === null || e.memoizedState.isDehydrated && (t.flags & 256) === 0 || (t.flags |= 1024, Ot !== null && (Qo(Ot), Ot = null))), jo(e, t), ut(t), null;
      case 5:
        vo(t);
        var i = On(Qr.current);
        if (n = t.type, e !== null && t.stateNode != null) wa(e, t, n, r, i), e.ref !== t.ref && (t.flags |= 512, t.flags |= 2097152);
        else {
          if (!r) {
            if (t.stateNode === null) throw Error(s(166));
            return ut(t), null;
          }
          if (e = On(Bt.current), Ui(t)) {
            r = t.stateNode, n = t.type;
            var l = t.memoizedProps;
            switch (r[Ht] = t, r[Br] = l, e = (t.mode & 1) !== 0, n) {
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
                for (i = 0; i < $r.length; i++) Se($r[i], r);
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
                G(r, l), Se("invalid", r);
                break;
              case "select":
                r._wrapperState = { wasMultiple: !!l.multiple }, Se("invalid", r);
                break;
              case "textarea":
                ye(r, l), Se("invalid", r);
            }
            Pn(n, l), i = null;
            for (var u in l) if (l.hasOwnProperty(u)) {
              var f = l[u];
              u === "children" ? typeof f == "string" ? r.textContent !== f && (l.suppressHydrationWarning !== !0 && Di(r.textContent, f, e), i = ["children", f]) : typeof f == "number" && r.textContent !== "" + f && (l.suppressHydrationWarning !== !0 && Di(
                r.textContent,
                f,
                e
              ), i = ["children", "" + f]) : m.hasOwnProperty(u) && f != null && u === "onScroll" && Se("scroll", r);
            }
            switch (n) {
              case "input":
                Wn(r), ue(r, l, !0);
                break;
              case "textarea":
                Wn(r), ce(r);
                break;
              case "select":
              case "option":
                break;
              default:
                typeof l.onClick == "function" && (r.onclick = Li);
            }
            r = i, t.updateQueue = r, r !== null && (t.flags |= 4);
          } else {
            u = i.nodeType === 9 ? i : i.ownerDocument, e === "http://www.w3.org/1999/xhtml" && (e = ie(n)), e === "http://www.w3.org/1999/xhtml" ? n === "script" ? (e = u.createElement("div"), e.innerHTML = "<script><\/script>", e = e.removeChild(e.firstChild)) : typeof r.is == "string" ? e = u.createElement(n, { is: r.is }) : (e = u.createElement(n), n === "select" && (u = e, r.multiple ? u.multiple = !0 : r.size && (u.size = r.size))) : e = u.createElementNS(e, n), e[Ht] = t, e[Br] = r, ga(e, t, !1, !1), t.stateNode = e;
            e: {
              switch (u = wr(n, r), n) {
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
                  for (i = 0; i < $r.length; i++) Se($r[i], e);
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
                  G(e, r), i = F(e, r), Se("invalid", e);
                  break;
                case "option":
                  i = r;
                  break;
                case "select":
                  e._wrapperState = { wasMultiple: !!r.multiple }, i = z({}, r, { value: void 0 }), Se("invalid", e);
                  break;
                case "textarea":
                  ye(e, r), i = Le(e, r), Se("invalid", e);
                  break;
                default:
                  i = r;
              }
              Pn(n, i), f = i;
              for (l in f) if (f.hasOwnProperty(l)) {
                var d = f[l];
                l === "style" ? nn(e, d) : l === "dangerouslySetInnerHTML" ? (d = d ? d.__html : void 0, d != null && Y(e, d)) : l === "children" ? typeof d == "string" ? (n !== "textarea" || d !== "") && Ve(e, d) : typeof d == "number" && Ve(e, "" + d) : l !== "suppressContentEditableWarning" && l !== "suppressHydrationWarning" && l !== "autoFocus" && (m.hasOwnProperty(l) ? d != null && l === "onScroll" && Se("scroll", e) : d != null && ct(e, l, d, u));
              }
              switch (n) {
                case "input":
                  Wn(e), ue(e, r, !1);
                  break;
                case "textarea":
                  Wn(e), ce(e);
                  break;
                case "option":
                  r.value != null && e.setAttribute("value", "" + Z(r.value));
                  break;
                case "select":
                  e.multiple = !!r.multiple, l = r.value, l != null ? ge(e, !!r.multiple, l, !1) : r.defaultValue != null && ge(
                    e,
                    !!r.multiple,
                    r.defaultValue,
                    !0
                  );
                  break;
                default:
                  typeof i.onClick == "function" && (e.onclick = Li);
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
        return ut(t), null;
      case 6:
        if (e && t.stateNode != null) _a(e, t, e.memoizedProps, r);
        else {
          if (typeof r != "string" && t.stateNode === null) throw Error(s(166));
          if (n = On(Qr.current), On(Bt.current), Ui(t)) {
            if (r = t.stateNode, n = t.memoizedProps, r[Ht] = t, (l = r.nodeValue !== n) && (e = St, e !== null)) switch (e.tag) {
              case 3:
                Di(r.nodeValue, n, (e.mode & 1) !== 0);
                break;
              case 5:
                e.memoizedProps.suppressHydrationWarning !== !0 && Di(r.nodeValue, n, (e.mode & 1) !== 0);
            }
            l && (t.flags |= 4);
          } else r = (n.nodeType === 9 ? n : n.ownerDocument).createTextNode(r), r[Ht] = t, t.stateNode = r;
        }
        return ut(t), null;
      case 13:
        if (ke(ze), r = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
          if (Ce && kt !== null && (t.mode & 1) !== 0 && (t.flags & 128) === 0) xu(), lr(), t.flags |= 98560, l = !1;
          else if (l = Ui(t), r !== null && r.dehydrated !== null) {
            if (e === null) {
              if (!l) throw Error(s(318));
              if (l = t.memoizedState, l = l !== null ? l.dehydrated : null, !l) throw Error(s(317));
              l[Ht] = t;
            } else lr(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
            ut(t), l = !1;
          } else Ot !== null && (Qo(Ot), Ot = null), l = !0;
          if (!l) return t.flags & 65536 ? t : null;
        }
        return (t.flags & 128) !== 0 ? (t.lanes = n, t) : (r = r !== null, r !== (e !== null && e.memoizedState !== null) && r && (t.child.flags |= 8192, (t.mode & 1) !== 0 && (e === null || (ze.current & 1) !== 0 ? Qe === 0 && (Qe = 3) : qo())), t.updateQueue !== null && (t.flags |= 4), ut(t), null);
      case 4:
        return ar(), jo(e, t), e === null && Vr(t.stateNode.containerInfo), ut(t), null;
      case 10:
        return co(t.type._context), ut(t), null;
      case 17:
        return mt(t.type) && Ii(), ut(t), null;
      case 19:
        if (ke(ze), l = t.memoizedState, l === null) return ut(t), null;
        if (r = (t.flags & 128) !== 0, u = l.rendering, u === null) if (r) br(l, !1);
        else {
          if (Qe !== 0 || e !== null && (e.flags & 128) !== 0) for (e = t.child; e !== null; ) {
            if (u = Yi(e), u !== null) {
              for (t.flags |= 128, br(l, !1), r = u.updateQueue, r !== null && (t.updateQueue = r, t.flags |= 4), t.subtreeFlags = 0, r = n, n = t.child; n !== null; ) l = n, e = r, l.flags &= 14680066, u = l.alternate, u === null ? (l.childLanes = 0, l.lanes = e, l.child = null, l.subtreeFlags = 0, l.memoizedProps = null, l.memoizedState = null, l.updateQueue = null, l.dependencies = null, l.stateNode = null) : (l.childLanes = u.childLanes, l.lanes = u.lanes, l.child = u.child, l.subtreeFlags = 0, l.deletions = null, l.memoizedProps = u.memoizedProps, l.memoizedState = u.memoizedState, l.updateQueue = u.updateQueue, l.type = u.type, e = u.dependencies, l.dependencies = e === null ? null : { lanes: e.lanes, firstContext: e.firstContext }), n = n.sibling;
              return we(ze, ze.current & 1 | 2), t.child;
            }
            e = e.sibling;
          }
          l.tail !== null && je() > pr && (t.flags |= 128, r = !0, br(l, !1), t.lanes = 4194304);
        }
        else {
          if (!r) if (e = Yi(u), e !== null) {
            if (t.flags |= 128, r = !0, n = e.updateQueue, n !== null && (t.updateQueue = n, t.flags |= 4), br(l, !0), l.tail === null && l.tailMode === "hidden" && !u.alternate && !Ce) return ut(t), null;
          } else 2 * je() - l.renderingStartTime > pr && n !== 1073741824 && (t.flags |= 128, r = !0, br(l, !1), t.lanes = 4194304);
          l.isBackwards ? (u.sibling = t.child, t.child = u) : (n = l.last, n !== null ? n.sibling = u : t.child = u, l.last = u);
        }
        return l.tail !== null ? (t = l.tail, l.rendering = t, l.tail = t.sibling, l.renderingStartTime = je(), t.sibling = null, n = ze.current, we(ze, r ? n & 1 | 2 : n & 1), t) : (ut(t), null);
      case 22:
      case 23:
        return Zo(), r = t.memoizedState !== null, e !== null && e.memoizedState !== null !== r && (t.flags |= 8192), r && (t.mode & 1) !== 0 ? (xt & 1073741824) !== 0 && (ut(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : ut(t), null;
      case 24:
        return null;
      case 25:
        return null;
    }
    throw Error(s(156, t.tag));
  }
  function ed(e, t) {
    switch (io(t), t.tag) {
      case 1:
        return mt(t.type) && Ii(), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 3:
        return ar(), ke(ht), ke(ot), go(), e = t.flags, (e & 65536) !== 0 && (e & 128) === 0 ? (t.flags = e & -65537 | 128, t) : null;
      case 5:
        return vo(t), null;
      case 13:
        if (ke(ze), e = t.memoizedState, e !== null && e.dehydrated !== null) {
          if (t.alternate === null) throw Error(s(340));
          lr();
        }
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 19:
        return ke(ze), null;
      case 4:
        return ar(), null;
      case 10:
        return co(t.type._context), null;
      case 22:
      case 23:
        return Zo(), null;
      case 24:
        return null;
      default:
        return null;
    }
  }
  var el = !1, at = !1, td = typeof WeakSet == "function" ? WeakSet : Set, M = null;
  function fr(e, t) {
    var n = e.ref;
    if (n !== null) if (typeof n == "function") try {
      n(null);
    } catch (r) {
      Ie(e, t, r);
    }
    else n.current = null;
  }
  function Fo(e, t, n) {
    try {
      n();
    } catch (r) {
      Ie(e, t, r);
    }
  }
  var Sa = !1;
  function nd(e, t) {
    if (Gl = _i, e = bs(), Vl(e)) {
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
            for (var N; x !== n || i !== 0 && x.nodeType !== 3 || (f = u + i), x !== l || r !== 0 && x.nodeType !== 3 || (d = u + r), x.nodeType === 3 && (u += x.nodeValue.length), (N = x.firstChild) !== null; )
              _ = x, x = N;
            for (; ; ) {
              if (x === e) break t;
              if (_ === n && ++g === i && (f = u), _ === l && ++S === r && (d = u), (N = x.nextSibling) !== null) break;
              x = _, _ = x.parentNode;
            }
            x = N;
          }
          n = f === -1 || d === -1 ? null : { start: f, end: d };
        } else n = null;
      }
      n = n || { start: 0, end: 0 };
    } else n = null;
    for (Zl = { focusedElem: e, selectionRange: n }, _i = !1, M = t; M !== null; ) if (t = M, e = t.child, (t.subtreeFlags & 1028) !== 0 && e !== null) e.return = t, M = e;
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
              var O = I.memoizedProps, Fe = I.memoizedState, v = t.stateNode, p = v.getSnapshotBeforeUpdate(t.elementType === t.type ? O : At(t.type, O), Fe);
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
    return I = Sa, Sa = !1, I;
  }
  function ei(e, t, n) {
    var r = t.updateQueue;
    if (r = r !== null ? r.lastEffect : null, r !== null) {
      var i = r = r.next;
      do {
        if ((i.tag & e) === e) {
          var l = i.destroy;
          i.destroy = void 0, l !== void 0 && Fo(t, n, l);
        }
        i = i.next;
      } while (i !== r);
    }
  }
  function tl(e, t) {
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
  function Uo(e) {
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
  function ka(e) {
    var t = e.alternate;
    t !== null && (e.alternate = null, ka(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && (delete t[Ht], delete t[Br], delete t[eo], delete t[Ff], delete t[Uf])), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
  }
  function xa(e) {
    return e.tag === 5 || e.tag === 3 || e.tag === 4;
  }
  function Ea(e) {
    e: for (; ; ) {
      for (; e.sibling === null; ) {
        if (e.return === null || xa(e.return)) return null;
        e = e.return;
      }
      for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
        if (e.flags & 2 || e.child === null || e.tag === 4) continue e;
        e.child.return = e, e = e.child;
      }
      if (!(e.flags & 2)) return e.stateNode;
    }
  }
  function $o(e, t, n) {
    var r = e.tag;
    if (r === 5 || r === 6) e = e.stateNode, t ? n.nodeType === 8 ? n.parentNode.insertBefore(e, t) : n.insertBefore(e, t) : (n.nodeType === 8 ? (t = n.parentNode, t.insertBefore(e, n)) : (t = n, t.appendChild(e)), n = n._reactRootContainer, n != null || t.onclick !== null || (t.onclick = Li));
    else if (r !== 4 && (e = e.child, e !== null)) for ($o(e, t, n), e = e.sibling; e !== null; ) $o(e, t, n), e = e.sibling;
  }
  function Vo(e, t, n) {
    var r = e.tag;
    if (r === 5 || r === 6) e = e.stateNode, t ? n.insertBefore(e, t) : n.appendChild(e);
    else if (r !== 4 && (e = e.child, e !== null)) for (Vo(e, t, n), e = e.sibling; e !== null; ) Vo(e, t, n), e = e.sibling;
  }
  var rt = null, jt = !1;
  function gn(e, t, n) {
    for (n = n.child; n !== null; ) Ca(e, t, n), n = n.sibling;
  }
  function Ca(e, t, n) {
    if (Vt && typeof Vt.onCommitFiberUnmount == "function") try {
      Vt.onCommitFiberUnmount(hi, n);
    } catch {
    }
    switch (n.tag) {
      case 5:
        at || fr(n, t);
      case 6:
        var r = rt, i = jt;
        rt = null, gn(e, t, n), rt = r, jt = i, rt !== null && (jt ? (e = rt, n = n.stateNode, e.nodeType === 8 ? e.parentNode.removeChild(n) : e.removeChild(n)) : rt.removeChild(n.stateNode));
        break;
      case 18:
        rt !== null && (jt ? (e = rt, n = n.stateNode, e.nodeType === 8 ? bl(e.parentNode, n) : e.nodeType === 1 && bl(e, n), Lr(e)) : bl(rt, n.stateNode));
        break;
      case 4:
        r = rt, i = jt, rt = n.stateNode.containerInfo, jt = !0, gn(e, t, n), rt = r, jt = i;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        if (!at && (r = n.updateQueue, r !== null && (r = r.lastEffect, r !== null))) {
          i = r = r.next;
          do {
            var l = i, u = l.destroy;
            l = l.tag, u !== void 0 && ((l & 2) !== 0 || (l & 4) !== 0) && Fo(n, t, u), i = i.next;
          } while (i !== r);
        }
        gn(e, t, n);
        break;
      case 1:
        if (!at && (fr(n, t), r = n.stateNode, typeof r.componentWillUnmount == "function")) try {
          r.props = n.memoizedProps, r.state = n.memoizedState, r.componentWillUnmount();
        } catch (f) {
          Ie(n, t, f);
        }
        gn(e, t, n);
        break;
      case 21:
        gn(e, t, n);
        break;
      case 22:
        n.mode & 1 ? (at = (r = at) || n.memoizedState !== null, gn(e, t, n), at = r) : gn(e, t, n);
        break;
      default:
        gn(e, t, n);
    }
  }
  function Ta(e) {
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
  function Ft(e, t) {
    var n = t.deletions;
    if (n !== null) for (var r = 0; r < n.length; r++) {
      var i = n[r];
      try {
        var l = e, u = t, f = u;
        e: for (; f !== null; ) {
          switch (f.tag) {
            case 5:
              rt = f.stateNode, jt = !1;
              break e;
            case 3:
              rt = f.stateNode.containerInfo, jt = !0;
              break e;
            case 4:
              rt = f.stateNode.containerInfo, jt = !0;
              break e;
          }
          f = f.return;
        }
        if (rt === null) throw Error(s(160));
        Ca(l, u, i), rt = null, jt = !1;
        var d = i.alternate;
        d !== null && (d.return = null), i.return = null;
      } catch (g) {
        Ie(i, t, g);
      }
    }
    if (t.subtreeFlags & 12854) for (t = t.child; t !== null; ) Pa(t, e), t = t.sibling;
  }
  function Pa(e, t) {
    var n = e.alternate, r = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        if (Ft(t, e), Yt(e), r & 4) {
          try {
            ei(3, e, e.return), tl(3, e);
          } catch (O) {
            Ie(e, e.return, O);
          }
          try {
            ei(5, e, e.return);
          } catch (O) {
            Ie(e, e.return, O);
          }
        }
        break;
      case 1:
        Ft(t, e), Yt(e), r & 512 && n !== null && fr(n, n.return);
        break;
      case 5:
        if (Ft(t, e), Yt(e), r & 512 && n !== null && fr(n, n.return), e.flags & 32) {
          var i = e.stateNode;
          try {
            Ve(i, "");
          } catch (O) {
            Ie(e, e.return, O);
          }
        }
        if (r & 4 && (i = e.stateNode, i != null)) {
          var l = e.memoizedProps, u = n !== null ? n.memoizedProps : l, f = e.type, d = e.updateQueue;
          if (e.updateQueue = null, d !== null) try {
            f === "input" && l.type === "radio" && l.name != null && ne(i, l), wr(f, u);
            var g = wr(f, l);
            for (u = 0; u < d.length; u += 2) {
              var S = d[u], x = d[u + 1];
              S === "style" ? nn(i, x) : S === "dangerouslySetInnerHTML" ? Y(i, x) : S === "children" ? Ve(i, x) : ct(i, S, x, g);
            }
            switch (f) {
              case "input":
                re(i, l);
                break;
              case "textarea":
                Ee(i, l);
                break;
              case "select":
                var _ = i._wrapperState.wasMultiple;
                i._wrapperState.wasMultiple = !!l.multiple;
                var N = l.value;
                N != null ? ge(i, !!l.multiple, N, !1) : _ !== !!l.multiple && (l.defaultValue != null ? ge(
                  i,
                  !!l.multiple,
                  l.defaultValue,
                  !0
                ) : ge(i, !!l.multiple, l.multiple ? [] : "", !1));
            }
            i[Br] = l;
          } catch (O) {
            Ie(e, e.return, O);
          }
        }
        break;
      case 6:
        if (Ft(t, e), Yt(e), r & 4) {
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
        if (Ft(t, e), Yt(e), r & 4 && n !== null && n.memoizedState.isDehydrated) try {
          Lr(t.containerInfo);
        } catch (O) {
          Ie(e, e.return, O);
        }
        break;
      case 4:
        Ft(t, e), Yt(e);
        break;
      case 13:
        Ft(t, e), Yt(e), i = e.child, i.flags & 8192 && (l = i.memoizedState !== null, i.stateNode.isHidden = l, !l || i.alternate !== null && i.alternate.memoizedState !== null || (Wo = je())), r & 4 && Ta(e);
        break;
      case 22:
        if (S = n !== null && n.memoizedState !== null, e.mode & 1 ? (at = (g = at) || S, Ft(t, e), at = g) : Ft(t, e), Yt(e), r & 8192) {
          if (g = e.memoizedState !== null, (e.stateNode.isHidden = g) && !S && (e.mode & 1) !== 0) for (M = e, S = e.child; S !== null; ) {
            for (x = M = S; M !== null; ) {
              switch (_ = M, N = _.child, _.tag) {
                case 0:
                case 11:
                case 14:
                case 15:
                  ei(4, _, _.return);
                  break;
                case 1:
                  fr(_, _.return);
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
                  fr(_, _.return);
                  break;
                case 22:
                  if (_.memoizedState !== null) {
                    Na(x);
                    continue;
                  }
              }
              N !== null ? (N.return = _, M = N) : Na(x);
            }
            S = S.sibling;
          }
          e: for (S = null, x = e; ; ) {
            if (x.tag === 5) {
              if (S === null) {
                S = x;
                try {
                  i = x.stateNode, g ? (l = i.style, typeof l.setProperty == "function" ? l.setProperty("display", "none", "important") : l.display = "none") : (f = x.stateNode, d = x.memoizedProps.style, u = d != null && d.hasOwnProperty("display") ? d.display : null, f.style.display = ft("display", u));
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
        Ft(t, e), Yt(e), r & 4 && Ta(e);
        break;
      case 21:
        break;
      default:
        Ft(
          t,
          e
        ), Yt(e);
    }
  }
  function Yt(e) {
    var t = e.flags;
    if (t & 2) {
      try {
        e: {
          for (var n = e.return; n !== null; ) {
            if (xa(n)) {
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
            r.flags & 32 && (Ve(i, ""), r.flags &= -33);
            var l = Ea(e);
            Vo(e, l, i);
            break;
          case 3:
          case 4:
            var u = r.stateNode.containerInfo, f = Ea(e);
            $o(e, f, u);
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
    M = e, Ra(e);
  }
  function Ra(e, t, n) {
    for (var r = (e.mode & 1) !== 0; M !== null; ) {
      var i = M, l = i.child;
      if (i.tag === 22 && r) {
        var u = i.memoizedState !== null || el;
        if (!u) {
          var f = i.alternate, d = f !== null && f.memoizedState !== null || at;
          f = el;
          var g = at;
          if (el = u, (at = d) && !g) for (M = i; M !== null; ) u = M, d = u.child, u.tag === 22 && u.memoizedState !== null ? Da(i) : d !== null ? (d.return = u, M = d) : Da(i);
          for (; l !== null; ) M = l, Ra(l), l = l.sibling;
          M = i, el = f, at = g;
        }
        za(e);
      } else (i.subtreeFlags & 8772) !== 0 && l !== null ? (l.return = i, M = l) : za(e);
    }
  }
  function za(e) {
    for (; M !== null; ) {
      var t = M;
      if ((t.flags & 8772) !== 0) {
        var n = t.alternate;
        try {
          if ((t.flags & 8772) !== 0) switch (t.tag) {
            case 0:
            case 11:
            case 15:
              at || tl(5, t);
              break;
            case 1:
              var r = t.stateNode;
              if (t.flags & 4 && !at) if (n === null) r.componentDidMount();
              else {
                var i = t.elementType === t.type ? n.memoizedProps : At(t.type, n.memoizedProps);
                r.componentDidUpdate(i, n.memoizedState, r.__reactInternalSnapshotBeforeUpdate);
              }
              var l = t.updateQueue;
              l !== null && Nu(t, l, r);
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
                Nu(t, u, n);
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
                    x !== null && Lr(x);
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
          at || t.flags & 512 && Uo(t);
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
  function Na(e) {
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
  function Da(e) {
    for (; M !== null; ) {
      var t = M;
      try {
        switch (t.tag) {
          case 0:
          case 11:
          case 15:
            var n = t.return;
            try {
              tl(4, t);
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
              Uo(t);
            } catch (d) {
              Ie(t, l, d);
            }
            break;
          case 5:
            var u = t.return;
            try {
              Uo(t);
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
  var id = Math.ceil, nl = pe.ReactCurrentDispatcher, Ho = pe.ReactCurrentOwner, Rt = pe.ReactCurrentBatchConfig, le = 0, qe = null, He = null, it = 0, xt = 0, dr = pn(0), Qe = 0, ti = null, jn = 0, rl = 0, Bo = 0, ni = null, yt = null, Wo = 0, pr = 1 / 0, tn = null, il = !1, Yo = null, wn = null, ll = !1, _n = null, ol = 0, ri = 0, Xo = null, sl = -1, ul = 0;
  function pt() {
    return (le & 6) !== 0 ? je() : sl !== -1 ? sl : sl = je();
  }
  function Sn(e) {
    return (e.mode & 1) === 0 ? 1 : (le & 2) !== 0 && it !== 0 ? it & -it : Vf.transition !== null ? (ul === 0 && (ul = Es()), ul) : (e = de, e !== 0 || (e = window.event, e = e === void 0 ? 16 : Ms(e.type)), e);
  }
  function Ut(e, t, n, r) {
    if (50 < ri) throw ri = 0, Xo = null, Error(s(185));
    Pr(e, n, r), ((le & 2) === 0 || e !== qe) && (e === qe && ((le & 2) === 0 && (rl |= n), Qe === 4 && kn(e, it)), gt(e, r), n === 1 && le === 0 && (t.mode & 1) === 0 && (pr = je() + 500, Ai && mn()));
  }
  function gt(e, t) {
    var n = e.callbackNode;
    $c(e, t);
    var r = yi(e, e === qe ? it : 0);
    if (r === 0) n !== null && Ss(n), e.callbackNode = null, e.callbackPriority = 0;
    else if (t = r & -r, e.callbackPriority !== t) {
      if (n != null && Ss(n), t === 1) e.tag === 0 ? $f(Ma.bind(null, e)) : gu(Ma.bind(null, e)), Af(function() {
        (le & 6) === 0 && mn();
      }), n = null;
      else {
        switch (Cs(r)) {
          case 1:
            n = El;
            break;
          case 4:
            n = ks;
            break;
          case 16:
            n = pi;
            break;
          case 536870912:
            n = xs;
            break;
          default:
            n = pi;
        }
        n = Va(n, La.bind(null, e));
      }
      e.callbackPriority = t, e.callbackNode = n;
    }
  }
  function La(e, t) {
    if (sl = -1, ul = 0, (le & 6) !== 0) throw Error(s(327));
    var n = e.callbackNode;
    if (hr() && e.callbackNode !== n) return null;
    var r = yi(e, e === qe ? it : 0);
    if (r === 0) return null;
    if ((r & 30) !== 0 || (r & e.expiredLanes) !== 0 || t) t = al(e, r);
    else {
      t = r;
      var i = le;
      le |= 2;
      var l = Oa();
      (qe !== e || it !== t) && (tn = null, pr = je() + 500, Un(e, t));
      do
        try {
          sd();
          break;
        } catch (f) {
          Ia(e, f);
        }
      while (!0);
      ao(), nl.current = l, le = i, He !== null ? t = 0 : (qe = null, it = 0, t = Qe);
    }
    if (t !== 0) {
      if (t === 2 && (i = Cl(e), i !== 0 && (r = i, t = Ko(e, i))), t === 1) throw n = ti, Un(e, 0), kn(e, r), gt(e, je()), n;
      if (t === 6) kn(e, r);
      else {
        if (i = e.current.alternate, (r & 30) === 0 && !ld(i) && (t = al(e, r), t === 2 && (l = Cl(e), l !== 0 && (r = l, t = Ko(e, l))), t === 1)) throw n = ti, Un(e, 0), kn(e, r), gt(e, je()), n;
        switch (e.finishedWork = i, e.finishedLanes = r, t) {
          case 0:
          case 1:
            throw Error(s(345));
          case 2:
            $n(e, yt, tn);
            break;
          case 3:
            if (kn(e, r), (r & 130023424) === r && (t = Wo + 500 - je(), 10 < t)) {
              if (yi(e, 0) !== 0) break;
              if (i = e.suspendedLanes, (i & r) !== r) {
                pt(), e.pingedLanes |= e.suspendedLanes & i;
                break;
              }
              e.timeoutHandle = Jl($n.bind(null, e, yt, tn), t);
              break;
            }
            $n(e, yt, tn);
            break;
          case 4:
            if (kn(e, r), (r & 4194240) === r) break;
            for (t = e.eventTimes, i = -1; 0 < r; ) {
              var u = 31 - Mt(r);
              l = 1 << u, u = t[u], u > i && (i = u), r &= ~l;
            }
            if (r = i, r = je() - r, r = (120 > r ? 120 : 480 > r ? 480 : 1080 > r ? 1080 : 1920 > r ? 1920 : 3e3 > r ? 3e3 : 4320 > r ? 4320 : 1960 * id(r / 1960)) - r, 10 < r) {
              e.timeoutHandle = Jl($n.bind(null, e, yt, tn), r);
              break;
            }
            $n(e, yt, tn);
            break;
          case 5:
            $n(e, yt, tn);
            break;
          default:
            throw Error(s(329));
        }
      }
    }
    return gt(e, je()), e.callbackNode === n ? La.bind(null, e) : null;
  }
  function Ko(e, t) {
    var n = ni;
    return e.current.memoizedState.isDehydrated && (Un(e, t).flags |= 256), e = al(e, t), e !== 2 && (t = yt, yt = n, t !== null && Qo(t)), e;
  }
  function Qo(e) {
    yt === null ? yt = e : yt.push.apply(yt, e);
  }
  function ld(e) {
    for (var t = e; ; ) {
      if (t.flags & 16384) {
        var n = t.updateQueue;
        if (n !== null && (n = n.stores, n !== null)) for (var r = 0; r < n.length; r++) {
          var i = n[r], l = i.getSnapshot;
          i = i.value;
          try {
            if (!It(l(), i)) return !1;
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
  function kn(e, t) {
    for (t &= ~Bo, t &= ~rl, e.suspendedLanes |= t, e.pingedLanes &= ~t, e = e.expirationTimes; 0 < t; ) {
      var n = 31 - Mt(t), r = 1 << n;
      e[n] = -1, t &= ~r;
    }
  }
  function Ma(e) {
    if ((le & 6) !== 0) throw Error(s(327));
    hr();
    var t = yi(e, 0);
    if ((t & 1) === 0) return gt(e, je()), null;
    var n = al(e, t);
    if (e.tag !== 0 && n === 2) {
      var r = Cl(e);
      r !== 0 && (t = r, n = Ko(e, r));
    }
    if (n === 1) throw n = ti, Un(e, 0), kn(e, t), gt(e, je()), n;
    if (n === 6) throw Error(s(345));
    return e.finishedWork = e.current.alternate, e.finishedLanes = t, $n(e, yt, tn), gt(e, je()), null;
  }
  function Go(e, t) {
    var n = le;
    le |= 1;
    try {
      return e(t);
    } finally {
      le = n, le === 0 && (pr = je() + 500, Ai && mn());
    }
  }
  function Fn(e) {
    _n !== null && _n.tag === 0 && (le & 6) === 0 && hr();
    var t = le;
    le |= 1;
    var n = Rt.transition, r = de;
    try {
      if (Rt.transition = null, de = 1, e) return e();
    } finally {
      de = r, Rt.transition = n, le = t, (le & 6) === 0 && mn();
    }
  }
  function Zo() {
    xt = dr.current, ke(dr);
  }
  function Un(e, t) {
    e.finishedWork = null, e.finishedLanes = 0;
    var n = e.timeoutHandle;
    if (n !== -1 && (e.timeoutHandle = -1, Of(n)), He !== null) for (n = He.return; n !== null; ) {
      var r = n;
      switch (io(r), r.tag) {
        case 1:
          r = r.type.childContextTypes, r != null && Ii();
          break;
        case 3:
          ar(), ke(ht), ke(ot), go();
          break;
        case 5:
          vo(r);
          break;
        case 4:
          ar();
          break;
        case 13:
          ke(ze);
          break;
        case 19:
          ke(ze);
          break;
        case 10:
          co(r.type._context);
          break;
        case 22:
        case 23:
          Zo();
      }
      n = n.return;
    }
    if (qe = e, He = e = xn(e.current, null), it = xt = t, Qe = 0, ti = null, Bo = rl = jn = 0, yt = ni = null, In !== null) {
      for (t = 0; t < In.length; t++) if (n = In[t], r = n.interleaved, r !== null) {
        n.interleaved = null;
        var i = r.next, l = n.pending;
        if (l !== null) {
          var u = l.next;
          l.next = i, r.next = u;
        }
        n.pending = r;
      }
      In = null;
    }
    return e;
  }
  function Ia(e, t) {
    do {
      var n = He;
      try {
        if (ao(), Xi.current = Zi, Ki) {
          for (var r = Ne.memoizedState; r !== null; ) {
            var i = r.queue;
            i !== null && (i.pending = null), r = r.next;
          }
          Ki = !1;
        }
        if (An = 0, Ze = Ke = Ne = null, Gr = !1, Zr = 0, Ho.current = null, n === null || n.return === null) {
          Qe = 1, ti = t, He = null;
          break;
        }
        e: {
          var l = e, u = n.return, f = n, d = t;
          if (t = it, f.flags |= 32768, d !== null && typeof d == "object" && typeof d.then == "function") {
            var g = d, S = f, x = S.tag;
            if ((S.mode & 1) === 0 && (x === 0 || x === 11 || x === 15)) {
              var _ = S.alternate;
              _ ? (S.updateQueue = _.updateQueue, S.memoizedState = _.memoizedState, S.lanes = _.lanes) : (S.updateQueue = null, S.memoizedState = null);
            }
            var N = la(u);
            if (N !== null) {
              N.flags &= -257, oa(N, u, f, l, t), N.mode & 1 && ia(l, g, t), t = N, d = g;
              var I = t.updateQueue;
              if (I === null) {
                var O = /* @__PURE__ */ new Set();
                O.add(d), t.updateQueue = O;
              } else I.add(d);
              break e;
            } else {
              if ((t & 1) === 0) {
                ia(l, g, t), qo();
                break e;
              }
              d = Error(s(426));
            }
          } else if (Ce && f.mode & 1) {
            var Fe = la(u);
            if (Fe !== null) {
              (Fe.flags & 65536) === 0 && (Fe.flags |= 256), oa(Fe, u, f, l, t), so(cr(d, f));
              break e;
            }
          }
          l = d = cr(d, f), Qe !== 4 && (Qe = 2), ni === null ? ni = [l] : ni.push(l), l = u;
          do {
            switch (l.tag) {
              case 3:
                l.flags |= 65536, t &= -t, l.lanes |= t;
                var v = na(l, d, t);
                zu(l, v);
                break e;
              case 1:
                f = d;
                var p = l.type, y = l.stateNode;
                if ((l.flags & 128) === 0 && (typeof p.getDerivedStateFromError == "function" || y !== null && typeof y.componentDidCatch == "function" && (wn === null || !wn.has(y)))) {
                  l.flags |= 65536, t &= -t, l.lanes |= t;
                  var E = ra(l, f, t);
                  zu(l, E);
                  break e;
                }
            }
            l = l.return;
          } while (l !== null);
        }
        ja(n);
      } catch (A) {
        t = A, He === n && n !== null && (He = n = n.return);
        continue;
      }
      break;
    } while (!0);
  }
  function Oa() {
    var e = nl.current;
    return nl.current = Zi, e === null ? Zi : e;
  }
  function qo() {
    (Qe === 0 || Qe === 3 || Qe === 2) && (Qe = 4), qe === null || (jn & 268435455) === 0 && (rl & 268435455) === 0 || kn(qe, it);
  }
  function al(e, t) {
    var n = le;
    le |= 2;
    var r = Oa();
    (qe !== e || it !== t) && (tn = null, Un(e, t));
    do
      try {
        od();
        break;
      } catch (i) {
        Ia(e, i);
      }
    while (!0);
    if (ao(), le = n, nl.current = r, He !== null) throw Error(s(261));
    return qe = null, it = 0, Qe;
  }
  function od() {
    for (; He !== null; ) Aa(He);
  }
  function sd() {
    for (; He !== null && !Dc(); ) Aa(He);
  }
  function Aa(e) {
    var t = $a(e.alternate, e, xt);
    e.memoizedProps = e.pendingProps, t === null ? ja(e) : He = t, Ho.current = null;
  }
  function ja(e) {
    var t = e;
    do {
      var n = t.alternate;
      if (e = t.return, (t.flags & 32768) === 0) {
        if (n = bf(n, t, xt), n !== null) {
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
          Qe = 6, He = null;
          return;
        }
      }
      if (t = t.sibling, t !== null) {
        He = t;
        return;
      }
      He = t = e;
    } while (t !== null);
    Qe === 0 && (Qe = 5);
  }
  function $n(e, t, n) {
    var r = de, i = Rt.transition;
    try {
      Rt.transition = null, de = 1, ud(e, t, n, r);
    } finally {
      Rt.transition = i, de = r;
    }
    return null;
  }
  function ud(e, t, n, r) {
    do
      hr();
    while (_n !== null);
    if ((le & 6) !== 0) throw Error(s(327));
    n = e.finishedWork;
    var i = e.finishedLanes;
    if (n === null) return null;
    if (e.finishedWork = null, e.finishedLanes = 0, n === e.current) throw Error(s(177));
    e.callbackNode = null, e.callbackPriority = 0;
    var l = n.lanes | n.childLanes;
    if (Vc(e, l), e === qe && (He = qe = null, it = 0), (n.subtreeFlags & 2064) === 0 && (n.flags & 2064) === 0 || ll || (ll = !0, Va(pi, function() {
      return hr(), null;
    })), l = (n.flags & 15990) !== 0, (n.subtreeFlags & 15990) !== 0 || l) {
      l = Rt.transition, Rt.transition = null;
      var u = de;
      de = 1;
      var f = le;
      le |= 4, Ho.current = null, nd(e, n), Pa(n, e), Rf(Zl), _i = !!Gl, Zl = Gl = null, e.current = n, rd(n), Lc(), le = f, de = u, Rt.transition = l;
    } else e.current = n;
    if (ll && (ll = !1, _n = e, ol = i), l = e.pendingLanes, l === 0 && (wn = null), Oc(n.stateNode), gt(e, je()), t !== null) for (r = e.onRecoverableError, n = 0; n < t.length; n++) i = t[n], r(i.value, { componentStack: i.stack, digest: i.digest });
    if (il) throw il = !1, e = Yo, Yo = null, e;
    return (ol & 1) !== 0 && e.tag !== 0 && hr(), l = e.pendingLanes, (l & 1) !== 0 ? e === Xo ? ri++ : (ri = 0, Xo = e) : ri = 0, mn(), null;
  }
  function hr() {
    if (_n !== null) {
      var e = Cs(ol), t = Rt.transition, n = de;
      try {
        if (Rt.transition = null, de = 16 > e ? 16 : e, _n === null) var r = !1;
        else {
          if (e = _n, _n = null, ol = 0, (le & 6) !== 0) throw Error(s(331));
          var i = le;
          for (le |= 4, M = e.current; M !== null; ) {
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
                        ei(8, S, l);
                    }
                    var x = S.child;
                    if (x !== null) x.return = S, M = x;
                    else for (; M !== null; ) {
                      S = M;
                      var _ = S.sibling, N = S.return;
                      if (ka(S), S === g) {
                        M = null;
                        break;
                      }
                      if (_ !== null) {
                        _.return = N, M = _;
                        break;
                      }
                      M = N;
                    }
                  }
                }
                var I = l.alternate;
                if (I !== null) {
                  var O = I.child;
                  if (O !== null) {
                    I.child = null;
                    do {
                      var Fe = O.sibling;
                      O.sibling = null, O = Fe;
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
                  ei(9, l, l.return);
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
                    tl(9, f);
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
          if (le = i, mn(), Vt && typeof Vt.onPostCommitFiberRoot == "function") try {
            Vt.onPostCommitFiberRoot(hi, e);
          } catch {
          }
          r = !0;
        }
        return r;
      } finally {
        de = n, Rt.transition = t;
      }
    }
    return !1;
  }
  function Fa(e, t, n) {
    t = cr(n, t), t = na(e, t, 1), e = yn(e, t, 1), t = pt(), e !== null && (Pr(e, 1, t), gt(e, t));
  }
  function Ie(e, t, n) {
    if (e.tag === 3) Fa(e, e, n);
    else for (; t !== null; ) {
      if (t.tag === 3) {
        Fa(t, e, n);
        break;
      } else if (t.tag === 1) {
        var r = t.stateNode;
        if (typeof t.type.getDerivedStateFromError == "function" || typeof r.componentDidCatch == "function" && (wn === null || !wn.has(r))) {
          e = cr(n, e), e = ra(t, e, 1), t = yn(t, e, 1), e = pt(), t !== null && (Pr(t, 1, e), gt(t, e));
          break;
        }
      }
      t = t.return;
    }
  }
  function ad(e, t, n) {
    var r = e.pingCache;
    r !== null && r.delete(t), t = pt(), e.pingedLanes |= e.suspendedLanes & n, qe === e && (it & n) === n && (Qe === 4 || Qe === 3 && (it & 130023424) === it && 500 > je() - Wo ? Un(e, 0) : Bo |= n), gt(e, t);
  }
  function Ua(e, t) {
    t === 0 && ((e.mode & 1) === 0 ? t = 1 : (t = vi, vi <<= 1, (vi & 130023424) === 0 && (vi = 4194304)));
    var n = pt();
    e = Jt(e, t), e !== null && (Pr(e, t, n), gt(e, n));
  }
  function cd(e) {
    var t = e.memoizedState, n = 0;
    t !== null && (n = t.retryLane), Ua(e, n);
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
    r !== null && r.delete(t), Ua(e, n);
  }
  var $a;
  $a = function(e, t, n) {
    if (e !== null) if (e.memoizedProps !== t.pendingProps || ht.current) vt = !0;
    else {
      if ((e.lanes & n) === 0 && (t.flags & 128) === 0) return vt = !1, Jf(e, t, n);
      vt = (e.flags & 131072) !== 0;
    }
    else vt = !1, Ce && (t.flags & 1048576) !== 0 && wu(t, Fi, t.index);
    switch (t.lanes = 0, t.tag) {
      case 2:
        var r = t.type;
        bi(e, t), e = t.pendingProps;
        var i = nr(t, ot.current);
        ur(t, n), i = So(null, t, r, e, i, n);
        var l = ko();
        return t.flags |= 1, typeof i == "object" && i !== null && typeof i.render == "function" && i.$$typeof === void 0 ? (t.tag = 1, t.memoizedState = null, t.updateQueue = null, mt(r) ? (l = !0, Oi(t)) : l = !1, t.memoizedState = i.state !== null && i.state !== void 0 ? i.state : null, ho(t), i.updater = qi, t.stateNode = i, i._reactInternals = t, Ro(t, r, e, n), t = Lo(null, t, r, !0, l, n)) : (t.tag = 0, Ce && l && ro(t), dt(null, t, i, n), t = t.child), t;
      case 16:
        r = t.elementType;
        e: {
          switch (bi(e, t), e = t.pendingProps, i = r._init, r = i(r._payload), t.type = r, i = t.tag = pd(r), e = At(r, e), i) {
            case 0:
              t = Do(null, t, r, e, n);
              break e;
            case 1:
              t = da(null, t, r, e, n);
              break e;
            case 11:
              t = sa(null, t, r, e, n);
              break e;
            case 14:
              t = ua(null, t, r, At(r.type, e), n);
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
        return r = t.type, i = t.pendingProps, i = t.elementType === r ? i : At(r, i), Do(e, t, r, i, n);
      case 1:
        return r = t.type, i = t.pendingProps, i = t.elementType === r ? i : At(r, i), da(e, t, r, i, n);
      case 3:
        e: {
          if (pa(t), e === null) throw Error(s(387));
          r = t.pendingProps, l = t.memoizedState, i = l.element, Ru(e, t), Wi(t, r, null, n);
          var u = t.memoizedState;
          if (r = u.element, l.isDehydrated) if (l = { element: r, isDehydrated: !1, cache: u.cache, pendingSuspenseBoundaries: u.pendingSuspenseBoundaries, transitions: u.transitions }, t.updateQueue.baseState = l, t.memoizedState = l, t.flags & 256) {
            i = cr(Error(s(423)), t), t = ha(e, t, r, n, i);
            break e;
          } else if (r !== i) {
            i = cr(Error(s(424)), t), t = ha(e, t, r, n, i);
            break e;
          } else for (kt = dn(t.stateNode.containerInfo.firstChild), St = t, Ce = !0, Ot = null, n = Tu(t, null, r, n), t.child = n; n; ) n.flags = n.flags & -3 | 4096, n = n.sibling;
          else {
            if (lr(), r === i) {
              t = en(e, t, n);
              break e;
            }
            dt(e, t, r, n);
          }
          t = t.child;
        }
        return t;
      case 5:
        return Du(t), e === null && oo(t), r = t.type, i = t.pendingProps, l = e !== null ? e.memoizedProps : null, u = i.children, ql(r, i) ? u = null : l !== null && ql(r, l) && (t.flags |= 32), fa(e, t), dt(e, t, u, n), t.child;
      case 6:
        return e === null && oo(t), null;
      case 13:
        return ma(e, t, n);
      case 4:
        return mo(t, t.stateNode.containerInfo), r = t.pendingProps, e === null ? t.child = or(t, null, r, n) : dt(e, t, r, n), t.child;
      case 11:
        return r = t.type, i = t.pendingProps, i = t.elementType === r ? i : At(r, i), sa(e, t, r, i, n);
      case 7:
        return dt(e, t, t.pendingProps, n), t.child;
      case 8:
        return dt(e, t, t.pendingProps.children, n), t.child;
      case 12:
        return dt(e, t, t.pendingProps.children, n), t.child;
      case 10:
        e: {
          if (r = t.type._context, i = t.pendingProps, l = t.memoizedProps, u = i.value, we(Vi, r._currentValue), r._currentValue = u, l !== null) if (It(l.value, u)) {
            if (l.children === i.children && !ht.current) {
              t = en(e, t, n);
              break e;
            }
          } else for (l = t.child, l !== null && (l.return = t); l !== null; ) {
            var f = l.dependencies;
            if (f !== null) {
              u = l.child;
              for (var d = f.firstContext; d !== null; ) {
                if (d.context === r) {
                  if (l.tag === 1) {
                    d = bt(-1, n & -n), d.tag = 2;
                    var g = l.updateQueue;
                    if (g !== null) {
                      g = g.shared;
                      var S = g.pending;
                      S === null ? d.next = d : (d.next = S.next, S.next = d), g.pending = d;
                    }
                  }
                  l.lanes |= n, d = l.alternate, d !== null && (d.lanes |= n), fo(
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
              u.lanes |= n, f = u.alternate, f !== null && (f.lanes |= n), fo(u, n, t), u = l.sibling;
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
          dt(e, t, i.children, n), t = t.child;
        }
        return t;
      case 9:
        return i = t.type, r = t.pendingProps.children, ur(t, n), i = Tt(i), r = r(i), t.flags |= 1, dt(e, t, r, n), t.child;
      case 14:
        return r = t.type, i = At(r, t.pendingProps), i = At(r.type, i), ua(e, t, r, i, n);
      case 15:
        return aa(e, t, t.type, t.pendingProps, n);
      case 17:
        return r = t.type, i = t.pendingProps, i = t.elementType === r ? i : At(r, i), bi(e, t), t.tag = 1, mt(r) ? (e = !0, Oi(t)) : e = !1, ur(t, n), ea(t, r, i), Ro(t, r, i, n), Lo(null, t, r, !0, e, n);
      case 19:
        return ya(e, t, n);
      case 22:
        return ca(e, t, n);
    }
    throw Error(s(156, t.tag));
  };
  function Va(e, t) {
    return _s(e, t);
  }
  function dd(e, t, n, r) {
    this.tag = e, this.key = n, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = r, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function zt(e, t, n, r) {
    return new dd(e, t, n, r);
  }
  function Jo(e) {
    return e = e.prototype, !(!e || !e.isReactComponent);
  }
  function pd(e) {
    if (typeof e == "function") return Jo(e) ? 1 : 0;
    if (e != null) {
      if (e = e.$$typeof, e === _e) return 11;
      if (e === tt) return 14;
    }
    return 2;
  }
  function xn(e, t) {
    var n = e.alternate;
    return n === null ? (n = zt(e.tag, t, e.key, e.mode), n.elementType = e.elementType, n.type = e.type, n.stateNode = e.stateNode, n.alternate = e, e.alternate = n) : (n.pendingProps = t, n.type = e.type, n.flags = 0, n.subtreeFlags = 0, n.deletions = null), n.flags = e.flags & 14680064, n.childLanes = e.childLanes, n.lanes = e.lanes, n.child = e.child, n.memoizedProps = e.memoizedProps, n.memoizedState = e.memoizedState, n.updateQueue = e.updateQueue, t = e.dependencies, n.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }, n.sibling = e.sibling, n.index = e.index, n.ref = e.ref, n;
  }
  function cl(e, t, n, r, i, l) {
    var u = 2;
    if (r = e, typeof e == "function") Jo(e) && (u = 1);
    else if (typeof e == "string") u = 5;
    else e: switch (e) {
      case Ae:
        return Vn(n.children, i, l, t);
      case be:
        u = 8, i |= 8;
        break;
      case Dt:
        return e = zt(12, n, t, i | 2), e.elementType = Dt, e.lanes = l, e;
      case et:
        return e = zt(13, n, t, i), e.elementType = et, e.lanes = l, e;
      case $e:
        return e = zt(19, n, t, i), e.elementType = $e, e.lanes = l, e;
      case se:
        return fl(n, i, l, t);
      default:
        if (typeof e == "object" && e !== null) switch (e.$$typeof) {
          case Ge:
            u = 10;
            break e;
          case Lt:
            u = 9;
            break e;
          case _e:
            u = 11;
            break e;
          case tt:
            u = 14;
            break e;
          case Ye:
            u = 16, r = null;
            break e;
        }
        throw Error(s(130, e == null ? e : typeof e, ""));
    }
    return t = zt(u, n, t, i), t.elementType = e, t.type = r, t.lanes = l, t;
  }
  function Vn(e, t, n, r) {
    return e = zt(7, e, r, t), e.lanes = n, e;
  }
  function fl(e, t, n, r) {
    return e = zt(22, e, r, t), e.elementType = se, e.lanes = n, e.stateNode = { isHidden: !1 }, e;
  }
  function bo(e, t, n) {
    return e = zt(6, e, null, t), e.lanes = n, e;
  }
  function es(e, t, n) {
    return t = zt(4, e.children !== null ? e.children : [], e.key, t), t.lanes = n, t.stateNode = { containerInfo: e.containerInfo, pendingChildren: null, implementation: e.implementation }, t;
  }
  function hd(e, t, n, r, i) {
    this.tag = t, this.containerInfo = e, this.finishedWork = this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.pendingContext = this.context = null, this.callbackPriority = 0, this.eventTimes = Tl(0), this.expirationTimes = Tl(-1), this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Tl(0), this.identifierPrefix = r, this.onRecoverableError = i, this.mutableSourceEagerHydrationData = null;
  }
  function ts(e, t, n, r, i, l, u, f, d) {
    return e = new hd(e, t, n, f, d), t === 1 ? (t = 1, l === !0 && (t |= 8)) : t = 0, l = zt(3, null, null, t), e.current = l, l.stateNode = e, l.memoizedState = { element: r, isDehydrated: n, cache: null, transitions: null, pendingSuspenseBoundaries: null }, ho(l), e;
  }
  function md(e, t, n) {
    var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return { $$typeof: q, key: r == null ? null : "" + r, children: e, containerInfo: t, implementation: n };
  }
  function Ha(e) {
    if (!e) return hn;
    e = e._reactInternals;
    e: {
      if (zn(e) !== e || e.tag !== 1) throw Error(s(170));
      var t = e;
      do {
        switch (t.tag) {
          case 3:
            t = t.stateNode.context;
            break e;
          case 1:
            if (mt(t.type)) {
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
      if (mt(n)) return vu(e, n, t);
    }
    return t;
  }
  function Ba(e, t, n, r, i, l, u, f, d) {
    return e = ts(n, r, !0, e, i, l, u, f, d), e.context = Ha(null), n = e.current, r = pt(), i = Sn(n), l = bt(r, i), l.callback = t ?? null, yn(n, l, i), e.current.lanes = i, Pr(e, i, r), gt(e, r), e;
  }
  function dl(e, t, n, r) {
    var i = t.current, l = pt(), u = Sn(i);
    return n = Ha(n), t.context === null ? t.context = n : t.pendingContext = n, t = bt(l, u), t.payload = { element: e }, r = r === void 0 ? null : r, r !== null && (t.callback = r), e = yn(i, t, u), e !== null && (Ut(e, i, u, l), Bi(e, i, u)), u;
  }
  function pl(e) {
    if (e = e.current, !e.child) return null;
    switch (e.child.tag) {
      case 5:
        return e.child.stateNode;
      default:
        return e.child.stateNode;
    }
  }
  function Wa(e, t) {
    if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
      var n = e.retryLane;
      e.retryLane = n !== 0 && n < t ? n : t;
    }
  }
  function ns(e, t) {
    Wa(e, t), (e = e.alternate) && Wa(e, t);
  }
  function vd() {
    return null;
  }
  var Ya = typeof reportError == "function" ? reportError : function(e) {
    console.error(e);
  };
  function rs(e) {
    this._internalRoot = e;
  }
  hl.prototype.render = rs.prototype.render = function(e) {
    var t = this._internalRoot;
    if (t === null) throw Error(s(409));
    dl(e, t, null, null);
  }, hl.prototype.unmount = rs.prototype.unmount = function() {
    var e = this._internalRoot;
    if (e !== null) {
      this._internalRoot = null;
      var t = e.containerInfo;
      Fn(function() {
        dl(null, e, null, null);
      }), t[Qt] = null;
    }
  };
  function hl(e) {
    this._internalRoot = e;
  }
  hl.prototype.unstable_scheduleHydration = function(e) {
    if (e) {
      var t = Rs();
      e = { blockedOn: null, target: e, priority: t };
      for (var n = 0; n < an.length && t !== 0 && t < an[n].priority; n++) ;
      an.splice(n, 0, e), n === 0 && Ds(e);
    }
  };
  function is(e) {
    return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
  }
  function ml(e) {
    return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11 && (e.nodeType !== 8 || e.nodeValue !== " react-mount-point-unstable "));
  }
  function Xa() {
  }
  function yd(e, t, n, r, i) {
    if (i) {
      if (typeof r == "function") {
        var l = r;
        r = function() {
          var g = pl(u);
          l.call(g);
        };
      }
      var u = Ba(t, r, e, 0, null, !1, !1, "", Xa);
      return e._reactRootContainer = u, e[Qt] = u.current, Vr(e.nodeType === 8 ? e.parentNode : e), Fn(), u;
    }
    for (; i = e.lastChild; ) e.removeChild(i);
    if (typeof r == "function") {
      var f = r;
      r = function() {
        var g = pl(d);
        f.call(g);
      };
    }
    var d = ts(e, 0, !1, null, null, !1, !1, "", Xa);
    return e._reactRootContainer = d, e[Qt] = d.current, Vr(e.nodeType === 8 ? e.parentNode : e), Fn(function() {
      dl(t, d, n, r);
    }), d;
  }
  function vl(e, t, n, r, i) {
    var l = n._reactRootContainer;
    if (l) {
      var u = l;
      if (typeof i == "function") {
        var f = i;
        i = function() {
          var d = pl(u);
          f.call(d);
        };
      }
      dl(t, u, e, i);
    } else u = yd(n, t, e, i, r);
    return pl(u);
  }
  Ts = function(e) {
    switch (e.tag) {
      case 3:
        var t = e.stateNode;
        if (t.current.memoizedState.isDehydrated) {
          var n = Tr(t.pendingLanes);
          n !== 0 && (Pl(t, n | 1), gt(t, je()), (le & 6) === 0 && (pr = je() + 500, mn()));
        }
        break;
      case 13:
        Fn(function() {
          var r = Jt(e, 1);
          if (r !== null) {
            var i = pt();
            Ut(r, e, 1, i);
          }
        }), ns(e, 1);
    }
  }, Rl = function(e) {
    if (e.tag === 13) {
      var t = Jt(e, 134217728);
      if (t !== null) {
        var n = pt();
        Ut(t, e, 134217728, n);
      }
      ns(e, 134217728);
    }
  }, Ps = function(e) {
    if (e.tag === 13) {
      var t = Sn(e), n = Jt(e, t);
      if (n !== null) {
        var r = pt();
        Ut(n, e, t, r);
      }
      ns(e, t);
    }
  }, Rs = function() {
    return de;
  }, zs = function(e, t) {
    var n = de;
    try {
      return de = e, t();
    } finally {
      de = n;
    }
  }, Yn = function(e, t, n) {
    switch (t) {
      case "input":
        if (re(e, n), t = n.name, n.type === "radio" && t != null) {
          for (n = e; n.parentNode; ) n = n.parentNode;
          for (n = n.querySelectorAll("input[name=" + JSON.stringify("" + t) + '][type="radio"]'), t = 0; t < n.length; t++) {
            var r = n[t];
            if (r !== e && r.form === e.form) {
              var i = Mi(r);
              if (!i) throw Error(s(90));
              Tn(r), re(r, i);
            }
          }
        }
        break;
      case "textarea":
        Ee(e, n);
        break;
      case "select":
        t = n.value, t != null && ge(e, !!n.multiple, t, !1);
    }
  }, ci = Go, kr = Fn;
  var gd = { usingClientEntryPoint: !1, Events: [Wr, er, Mi, rn, ai, Go] }, ii = { findFiberByHostInstance: Nn, bundleType: 0, version: "18.3.1", rendererPackageName: "react-dom" }, wd = { bundleType: ii.bundleType, version: ii.version, rendererPackageName: ii.rendererPackageName, rendererConfig: ii.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setErrorHandler: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: pe.ReactCurrentDispatcher, findHostInstanceByFiber: function(e) {
    return e = gs(e), e === null ? null : e.stateNode;
  }, findFiberByHostInstance: ii.findFiberByHostInstance || vd, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null, reconcilerVersion: "18.3.1-next-f1338f8080-20240426" };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var yl = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!yl.isDisabled && yl.supportsFiber) try {
      hi = yl.inject(wd), Vt = yl;
    } catch {
    }
  }
  return wt.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = gd, wt.createPortal = function(e, t) {
    var n = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!is(t)) throw Error(s(200));
    return md(e, t, null, n);
  }, wt.createRoot = function(e, t) {
    if (!is(e)) throw Error(s(299));
    var n = !1, r = "", i = Ya;
    return t != null && (t.unstable_strictMode === !0 && (n = !0), t.identifierPrefix !== void 0 && (r = t.identifierPrefix), t.onRecoverableError !== void 0 && (i = t.onRecoverableError)), t = ts(e, 1, !1, null, null, n, !1, r, i), e[Qt] = t.current, Vr(e.nodeType === 8 ? e.parentNode : e), new rs(t);
  }, wt.findDOMNode = function(e) {
    if (e == null) return null;
    if (e.nodeType === 1) return e;
    var t = e._reactInternals;
    if (t === void 0)
      throw typeof e.render == "function" ? Error(s(188)) : (e = Object.keys(e).join(","), Error(s(268, e)));
    return e = gs(t), e = e === null ? null : e.stateNode, e;
  }, wt.flushSync = function(e) {
    return Fn(e);
  }, wt.hydrate = function(e, t, n) {
    if (!ml(t)) throw Error(s(200));
    return vl(null, e, t, !0, n);
  }, wt.hydrateRoot = function(e, t, n) {
    if (!is(e)) throw Error(s(405));
    var r = n != null && n.hydratedSources || null, i = !1, l = "", u = Ya;
    if (n != null && (n.unstable_strictMode === !0 && (i = !0), n.identifierPrefix !== void 0 && (l = n.identifierPrefix), n.onRecoverableError !== void 0 && (u = n.onRecoverableError)), t = Ba(t, null, e, 1, n ?? null, i, !1, l, u), e[Qt] = t.current, Vr(e), r) for (e = 0; e < r.length; e++) n = r[e], i = n._getVersion, i = i(n._source), t.mutableSourceEagerHydrationData == null ? t.mutableSourceEagerHydrationData = [n, i] : t.mutableSourceEagerHydrationData.push(
      n,
      i
    );
    return new hl(t);
  }, wt.render = function(e, t, n) {
    if (!ml(t)) throw Error(s(200));
    return vl(null, e, t, !1, n);
  }, wt.unmountComponentAtNode = function(e) {
    if (!ml(e)) throw Error(s(40));
    return e._reactRootContainer ? (Fn(function() {
      vl(null, null, e, !1, function() {
        e._reactRootContainer = null, e[Qt] = null;
      });
    }), !0) : !1;
  }, wt.unstable_batchedUpdates = Go, wt.unstable_renderSubtreeIntoContainer = function(e, t, n, r) {
    if (!ml(n)) throw Error(s(200));
    if (e == null || e._reactInternals === void 0) throw Error(s(38));
    return vl(e, t, n, !1, r);
  }, wt.version = "18.3.1-next-f1338f8080-20240426", wt;
}
var Ja;
function Td() {
  if (Ja) return ss.exports;
  Ja = 1;
  function a() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(a);
      } catch (o) {
        console.error(o);
      }
  }
  return a(), ss.exports = Cd(), ss.exports;
}
var ba;
function Pd() {
  if (ba) return gl;
  ba = 1;
  var a = Td();
  return gl.createRoot = a.createRoot, gl.hydrateRoot = a.hydrateRoot, gl;
}
var Rd = Pd(), cs = { exports: {} }, li = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ec;
function zd() {
  if (ec) return li;
  ec = 1;
  var a = hs(), o = Symbol.for("react.element"), s = Symbol.for("react.fragment"), c = Object.prototype.hasOwnProperty, m = a.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, k = { key: !0, ref: !0, __self: !0, __source: !0 };
  function P(L, R, D) {
    var T, H = {}, B = null, Te = null;
    D !== void 0 && (B = "" + D), R.key !== void 0 && (B = "" + R.key), R.ref !== void 0 && (Te = R.ref);
    for (T in R) c.call(R, T) && !k.hasOwnProperty(T) && (H[T] = R[T]);
    if (L && L.defaultProps) for (T in R = L.defaultProps, R) H[T] === void 0 && (H[T] = R[T]);
    return { $$typeof: o, type: L, key: B, ref: Te, props: H, _owner: m.current };
  }
  return li.Fragment = s, li.jsx = P, li.jsxs = P, li;
}
var tc;
function Nd() {
  return tc || (tc = 1, cs.exports = zd()), cs.exports;
}
var lt = Nd();
function Dd(a, o, s) {
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
function nc(a, o, s) {
  return o === 0 || Math.abs(o) === 1 / 0 ? Math.pow(a, s * 5) : a * o * s / (o + s * a);
}
function rc(a, o, s, c = 0.15) {
  return c === 0 ? Dd(a, o, s) : a < o ? -nc(o - a, s - o, c) + o : a > s ? +nc(a - s, s - o, c) + s : a;
}
function Ld(a, [o, s], [c, m]) {
  const [[k, P], [L, R]] = a;
  return [rc(o, k, P, c), rc(s, L, R, m)];
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
function ic(a, o) {
  var s = Object.keys(a);
  if (Object.getOwnPropertySymbols) {
    var c = Object.getOwnPropertySymbols(a);
    o && (c = c.filter(function(m) {
      return Object.getOwnPropertyDescriptor(a, m).enumerable;
    })), s.push.apply(s, c);
  }
  return s;
}
function De(a) {
  for (var o = 1; o < arguments.length; o++) {
    var s = arguments[o] != null ? arguments[o] : {};
    o % 2 ? ic(Object(s), !0).forEach(function(c) {
      Be(a, c, s[c]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(a, Object.getOwnPropertyDescriptors(s)) : ic(Object(s)).forEach(function(c) {
      Object.defineProperty(a, c, Object.getOwnPropertyDescriptor(s, c));
    });
  }
  return a;
}
const yc = {
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
function lc(a) {
  return a ? a[0].toUpperCase() + a.slice(1) : "";
}
const Od = ["enter", "leave"];
function Ad(a = !1, o) {
  return a && !Od.includes(o);
}
function jd(a, o = "", s = !1) {
  const c = yc[a], m = c && c[o] || o;
  return "on" + lc(a) + lc(m) + (Ad(s, m) ? "Capture" : "");
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
  const s = yc[a], c = s && s[o] || o;
  return a + c;
}
function kl(a) {
  return "touches" in a;
}
function gc(a) {
  return kl(a) ? "touch" : "pointerType" in a ? a.pointerType : "mouse";
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
function wc(a) {
  return kl(a) ? Hd(a)[0] : a;
}
function ds(a, o) {
  try {
    const s = o.clientX - a.clientX, c = o.clientY - a.clientY, m = (o.clientX + a.clientX) / 2, k = (o.clientY + a.clientY) / 2, P = Math.hypot(s, c);
    return {
      angle: -(Math.atan2(s, c) * 180) / Math.PI,
      distance: P,
      origin: [m, k]
    };
  } catch {
  }
  return null;
}
function Bd(a) {
  return Vd(a).map((o) => o.identifier);
}
function oc(a, o) {
  const [s, c] = Array.from(a.touches).filter((m) => o.includes(m.identifier));
  return ds(s, c);
}
function fs(a) {
  const o = wc(a);
  return kl(a) ? o.identifier : o.pointerId;
}
function yr(a) {
  const o = wc(a);
  return [o.clientX, o.clientY];
}
const sc = 40, uc = 800;
function _c(a) {
  let {
    deltaX: o,
    deltaY: s,
    deltaMode: c
  } = a;
  return c === 1 ? (o *= sc, s *= sc) : c === 2 && (o *= uc, s *= uc), [o, s];
}
function Wd(a) {
  var o, s;
  const {
    scrollX: c,
    scrollY: m,
    scrollLeft: k,
    scrollTop: P
  } = a.currentTarget;
  return [(o = c ?? k) !== null && o !== void 0 ? o : 0, (s = m ?? P) !== null && s !== void 0 ? s : 0];
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
function Sl(a, ...o) {
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
function ac(a, o) {
  return Object.assign({}, o, a || {});
}
const Qd = 32;
class Sc {
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
    s._active || (this.reset(), this.computeInitial(), s._active = !0, s.target = o.target, s.currentTarget = o.currentTarget, s.lastOffset = c.from ? Sl(c.from, s) : s.offset, s.offset = s.lastOffset, s.startTime = s.timeStamp = o.timeStamp);
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
      const q = s._delta.map(Math.abs);
      xe.addTo(s._distance, q);
    }
    this.axisIntent && this.axisIntent(o);
    const [P, L] = s._movement, [R, D] = c.threshold, {
      _step: T,
      values: H
    } = s;
    if (c.hasCustomTransform ? (T[0] === !1 && (T[0] = Math.abs(P) >= R && H[0]), T[1] === !1 && (T[1] = Math.abs(L) >= D && H[1])) : (T[0] === !1 && (T[0] = Math.abs(P) >= R && Math.sign(P) * R), T[1] === !1 && (T[1] = Math.abs(L) >= D && Math.sign(L) * D)), s.intentional = T[0] !== !1 || T[1] !== !1, !s.intentional) return;
    const B = [0, 0];
    if (c.hasCustomTransform) {
      const [q, Ae] = H;
      B[0] = T[0] !== !1 ? q - T[0] : 0, B[1] = T[1] !== !1 ? Ae - T[1] : 0;
    } else
      B[0] = T[0] !== !1 ? P - T[0] : 0, B[1] = T[1] !== !1 ? L - T[1] : 0;
    this.restrictToAxis && !s._blocked && this.restrictToAxis(B);
    const Te = s.offset, Pe = s._active && !s._blocked || s.active;
    Pe && (s.first = s._active && !s.active, s.last = !s._active && s.active, s.active = m[this.ingKey] = s._active, o && (s.first && ("bounds" in c && (s._bounds = Sl(c.bounds, s)), this.setup && this.setup()), s.movement = B, this.computeOffset()));
    const [te, K] = s.offset, [[Oe, Ue], [ct, pe]] = s._bounds;
    s.overflow = [te < Oe ? -1 : te > Ue ? 1 : 0, K < ct ? -1 : K > pe ? 1 : 0], s._movementBound[0] = s.overflow[0] ? s._movementBound[0] === !1 ? s._movement[0] : s._movementBound[0] : !1, s._movementBound[1] = s.overflow[1] ? s._movementBound[1] === !1 ? s._movement[1] : s._movementBound[1] : !1;
    const We = s._active ? c.rubberband || [0, 0] : [0, 0];
    if (s.offset = Ld(s._bounds, s.offset, We), s.delta = xe.sub(s.offset, Te), this.computeMovement(), Pe && (!s.last || k > Qd)) {
      s.delta = xe.sub(s.offset, Te);
      const q = s.delta.map(Math.abs);
      xe.addTo(s.distance, q), s.direction = s.delta.map(Math.sign), s._direction = s._delta.map(Math.sign), !s.first && k > 0 && (s.velocity = [q[0] / k, q[1] / k], s.timeDelta = k);
    }
  }
  emit() {
    const o = this.state, s = this.shared, c = this.config;
    if (o._active || this.clean(), (o._blocked || !o.intentional) && !o._force && !c.triggerAllEvents) return;
    const m = this.handler(De(De(De({}, s), o), {}, {
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
class oi extends Sc {
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
      const m = typeof c.axisThreshold == "object" ? c.axisThreshold[gc(o)] : c.axisThreshold;
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
const Zd = (a) => a, cc = 0.15, kc = {
  enabled(a = !0) {
    return a;
  },
  eventOptions(a, o, s) {
    return De(De({}, s.shared.eventOptions), a);
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
        return [cc, cc];
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
    return this.hasCustomTransform = !!c, c || Zd;
  },
  threshold(a) {
    return xe.toVector(a, 0);
  }
}, qd = 0, Bn = De(De({}, kc), {}, {
  axis(a, o, {
    axis: s
  }) {
    if (this.lockDirection = s === "lock", !this.lockDirection) return s;
  },
  axisThreshold(a = qd) {
    return a;
  },
  bounds(a = {}) {
    if (typeof a == "function")
      return (k) => Bn.bounds(a(k));
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
}), fc = {
  ArrowRight: (a, o = 1) => [a * o, 0],
  ArrowLeft: (a, o = 1) => [-1 * a * o, 0],
  ArrowUp: (a, o = 1) => [0, -1 * a * o],
  ArrowDown: (a, o = 1) => [0, a * o]
};
class Jd extends oi {
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
      o._bounds = Bn.bounds(m);
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
    s.pointerCapture && o.target.setPointerCapture(o.pointerId), !(m && m.size > 1 && c._pointerActive) && (this.start(o), this.setupPointer(o), c._pointerId = fs(o), c._pointerActive = !0, this.computeValues(yr(o)), this.computeInitial(), s.preventScrollAxis && gc(o) !== "mouse" ? (c._active = !1, this.setupScrollPrevention(o)) : s.delay > 0 ? (this.setupDelayTrigger(o), s.triggerAllEvents && (this.compute(o), this.emit())) : this.startPointerDrag(o));
  }
  startPointerDrag(o) {
    const s = this.state;
    s._active = !0, s._preventScroll = !0, s._delayed = !1, this.compute(o), this.emit();
  }
  pointerMove(o) {
    const s = this.state, c = this.config;
    if (!s._pointerActive) return;
    const m = fs(o);
    if (s._pointerId !== void 0 && m !== s._pointerId) return;
    const k = yr(o);
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
    const m = fs(o);
    if (s._pointerId !== void 0 && m !== s._pointerId) return;
    this.state._pointerActive = !1, this.setActive(), this.compute(o);
    const [k, P] = s._distance;
    if (s.tap = k <= c.tapsThreshold && P <= c.tapsThreshold, s.tap && c.filterTaps)
      s._force = !0;
    else {
      const [L, R] = s._delta, [D, T] = s._movement, [H, B] = c.swipe.velocity, [Te, Pe] = c.swipe.distance, te = c.swipe.duration;
      if (s.elapsedTime < te) {
        const K = Math.abs(L / s.timeDelta), Oe = Math.abs(R / s.timeDelta);
        K > H && Math.abs(D) > Te && (s.swipe[0] = Math.sign(L)), Oe > B && Math.abs(T) > Pe && (s.swipe[1] = Math.sign(R));
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
    const s = fc[o.key];
    if (s) {
      const c = this.state, m = o.shiftKey ? 10 : o.altKey ? 0.1 : 1;
      this.start(o), c._delta = s(this.config.keyboardDisplacement, m), c._keyboardActive = !0, xe.addTo(c._movement, c._delta), this.compute(o), this.emit();
    }
  }
  keyUp(o) {
    o.key in fc && (this.state._keyboardActive = !1, this.setActive(), this.compute(o), this.emit());
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
const si = typeof window < "u" && window.document && window.document.createElement;
function xc() {
  return si && "ontouchstart" in window;
}
function ep() {
  return xc() || si && window.navigator.maxTouchPoints > 1;
}
function tp() {
  return si && "onpointerdown" in window;
}
function np() {
  return si && "exitPointerLock" in window.document;
}
function rp() {
  try {
    return "constructor" in GestureEvent;
  } catch {
    return !1;
  }
}
const Nt = {
  isBrowser: si,
  gesture: rp(),
  touch: xc(),
  touchscreen: ep(),
  pointer: tp(),
  pointerLock: np()
}, ip = 250, lp = 180, op = 0.5, sp = 50, up = 250, ap = 10, dc = {
  mouse: 0,
  touch: 0,
  pen: 8
}, cp = De(De({}, Bn), {}, {
  device(a, o, {
    pointer: {
      touch: s = !1,
      lock: c = !1,
      mouse: m = !1
    } = {}
  }) {
    return this.pointerLock = c && Nt.pointerLock, Nt.touch && s ? "touch" : this.pointerLock ? "mouse" : Nt.pointer && !m ? "pointer" : Nt.touch ? "touch" : "mouse";
  },
  preventScrollAxis(a, o, {
    preventScroll: s
  }) {
    if (this.preventScrollDelay = typeof s == "number" ? s : s || s === void 0 && a ? ip : void 0, !(!Nt.touchscreen || s === !1))
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
    return a ? De(De({}, dc), a) : dc;
  },
  keyboardDisplacement(a = ap) {
    return a;
  }
});
function Ec(a) {
  const [o, s] = a.overflow, [c, m] = a._delta, [k, P] = a._direction;
  (o < 0 && c > 0 && k < 0 || o > 0 && c < 0 && k > 0) && (a._movement[0] = a._movementBound[0]), (s < 0 && m > 0 && P < 0 || s > 0 && m < 0 && P > 0) && (a._movement[1] = a._movementBound[1]);
}
const fp = 30, dp = 100;
class pp extends Sc {
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
    const m = oc(o, s._touchIds);
    m && this.pinchStart(o, m);
  }
  pointerStart(o) {
    if (o.buttons != null && o.buttons % 2 !== 1) return;
    this.ctrl.setEventIds(o), o.target.setPointerCapture(o.pointerId);
    const s = this.state, c = s._pointerEvents, m = this.ctrl.pointerIds;
    if (s._active && Array.from(c.keys()).every((P) => m.has(P)) || (c.size < 2 && c.set(o.pointerId, o), s._pointerEvents.size < 2)) return;
    this.start(o);
    const k = ds(...Array.from(c.values()));
    k && this.pinchStart(o, k);
  }
  pinchStart(o, s) {
    const c = this.state;
    c.origin = s.origin, this.computeValues([s.distance, s.angle]), this.computeInitial(), this.compute(o), this.emit();
  }
  touchMove(o) {
    if (!this.state._active) return;
    const s = oc(o, this.state._touchIds);
    s && this.pinchMove(o, s);
  }
  pointerMove(o) {
    const s = this.state._pointerEvents;
    if (s.has(o.pointerId) && s.set(o.pointerId, o), !this.state._active) return;
    const c = ds(...Array.from(s.values()));
    c && this.pinchMove(o, c);
  }
  pinchMove(o, s) {
    const c = this.state, m = c._values[1], k = s.angle - m;
    let P = 0;
    Math.abs(k) > 270 && (P += Math.sign(k)), this.computeValues([s.distance, s.angle - 360 * P]), c.origin = s.origin, c.turns = P, c._movement = [c._values[0] / c._initial[0] - 1, c._values[1] - c._initial[1]], this.compute(o), this.emit();
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
    c._delta = [-_c(o)[1] / dp * c.offset[0], 0], xe.addTo(c._movement, c._delta), Ec(c), this.state.origin = [o.clientX, o.clientY], this.compute(o), this.emit();
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
const hp = De(De({}, kc), {}, {
  device(a, o, {
    shared: s,
    pointer: {
      touch: c = !1
    } = {}
  }) {
    if (s.target && !Nt.touch && Nt.gesture) return "gesture";
    if (Nt.touch && c) return "touch";
    if (Nt.touchscreen) {
      if (Nt.pointer) return "pointer";
      if (Nt.touch) return "touch";
    }
  },
  bounds(a, o, {
    scaleBounds: s = {},
    angleBounds: c = {}
  }) {
    const m = (P) => {
      const L = ac(Sl(s, P), {
        min: -1 / 0,
        max: 1 / 0
      });
      return [L.min, L.max];
    }, k = (P) => {
      const L = ac(Sl(c, P), {
        min: -1 / 0,
        max: 1 / 0
      });
      return [L.min, L.max];
    };
    return typeof s != "function" && typeof c != "function" ? [m(), k()] : (P) => [m(P), k(P)];
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
class mp extends oi {
  constructor(...o) {
    super(...o), Be(this, "ingKey", "moving");
  }
  move(o) {
    this.config.mouseOnly && o.pointerType !== "mouse" || (this.state._active ? this.moveChange(o) : this.moveStart(o), this.timeoutStore.add("moveEnd", this.moveEnd.bind(this)));
  }
  moveStart(o) {
    this.start(o), this.computeValues(yr(o)), this.compute(o), this.computeInitial(), this.emit();
  }
  moveChange(o) {
    if (!this.state._active) return;
    const s = yr(o), c = this.state;
    c._delta = xe.sub(s, c._values), xe.addTo(c._movement, c._delta), this.computeValues(s), this.compute(o), this.emit();
  }
  moveEnd(o) {
    this.state._active && (this.state._active = !1, this.compute(o), this.emit());
  }
  bind(o) {
    o("pointer", "change", this.move.bind(this)), o("pointer", "leave", this.moveEnd.bind(this));
  }
}
const vp = De(De({}, Bn), {}, {
  mouseOnly: (a = !0) => a
});
class yp extends oi {
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
const gp = Bn;
class wp extends oi {
  constructor(...o) {
    super(...o), Be(this, "ingKey", "wheeling");
  }
  wheel(o) {
    this.state._active || this.start(o), this.wheelChange(o), this.timeoutStore.add("wheelEnd", this.wheelEnd.bind(this));
  }
  wheelChange(o) {
    const s = this.state;
    s._delta = _c(o), xe.addTo(s._movement, s._delta), Ec(s), this.compute(o), this.emit();
  }
  wheelEnd() {
    this.state._active && (this.state._active = !1, this.compute(), this.emit());
  }
  bind(o) {
    o("wheel", "", this.wheel.bind(this));
  }
}
const _p = Bn;
class Sp extends oi {
  constructor(...o) {
    super(...o), Be(this, "ingKey", "hovering");
  }
  enter(o) {
    this.config.mouseOnly && o.pointerType !== "mouse" || (this.start(o), this.computeValues(yr(o)), this.compute(o), this.emit());
  }
  leave(o) {
    if (this.config.mouseOnly && o.pointerType !== "mouse") return;
    const s = this.state;
    if (!s._active) return;
    s._active = !1;
    const c = yr(o);
    s._movement = s._delta = xe.sub(c, s._values), this.computeValues(c), this.compute(o), s.delta = s.movement, this.emit();
  }
  bind(o) {
    o("pointer", "enter", this.enter.bind(this)), o("pointer", "leave", this.leave.bind(this));
  }
}
const kp = De(De({}, Bn), {}, {
  mouseOnly: (a = !0) => a
}), ms = /* @__PURE__ */ new Map(), ps = /* @__PURE__ */ new Map();
function xp(a) {
  ms.set(a.key, a.engine), ps.set(a.key, a.resolver);
}
const Ep = {
  key: "drag",
  engine: Jd,
  resolver: cp
}, Cp = {
  key: "hover",
  engine: Sp,
  resolver: kp
}, Tp = {
  key: "move",
  engine: mp,
  resolver: vp
}, Pp = {
  key: "pinch",
  engine: pp,
  resolver: hp
}, Rp = {
  key: "scroll",
  engine: yp,
  resolver: gp
}, zp = {
  key: "wheel",
  engine: wp,
  resolver: _p
};
function Np(a, o) {
  if (a == null) return {};
  var s = {}, c = Object.keys(a), m, k;
  for (k = 0; k < c.length; k++)
    m = c[k], !(o.indexOf(m) >= 0) && (s[m] = a[m]);
  return s;
}
function Dp(a, o) {
  if (a == null) return {};
  var s = Np(a, o), c, m;
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
  window(a = Nt.isBrowser ? window : void 0) {
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
function _l(a = {}, o) {
  const s = {};
  for (const [c, m] of Object.entries(o))
    switch (typeof m) {
      case "function":
        s[c] = m.call(s, a[c], c, a);
        break;
      case "object":
        s[c] = _l(a[c], m);
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
    window: P,
    enabled: L,
    transform: R
  } = c, D = Dp(c, Mp);
  if (s.shared = _l({
    target: m,
    eventOptions: k,
    window: P,
    enabled: L,
    transform: R
  }, Lp), o) {
    const T = ps.get(o);
    s[o] = _l(De({
      shared: s.shared
    }, D), T);
  } else
    for (const T in D) {
      const H = ps.get(T);
      H && (s[T] = _l(De({
        shared: s.shared
      }, D[T]), H));
    }
  return s;
}
class Cc {
  constructor(o, s) {
    Be(this, "_listeners", /* @__PURE__ */ new Set()), this._ctrl = o, this._gestureKey = s;
  }
  add(o, s, c, m, k) {
    const P = this._listeners, L = $d(s, c), R = this._gestureKey ? this._ctrl.config[this._gestureKey].eventOptions : {}, D = De(De({}, R), k);
    o.addEventListener(L, m, D);
    const T = () => {
      o.removeEventListener(L, m, D), P.delete(T);
    };
    return P.add(T), T;
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
    Be(this, "gestures", /* @__PURE__ */ new Set()), Be(this, "_targetEventStore", new Cc(this)), Be(this, "gestureEventStores", {}), Be(this, "gestureTimeoutStores", {}), Be(this, "handlers", {}), Be(this, "config", {}), Be(this, "pointerIds", /* @__PURE__ */ new Set()), Be(this, "touchIds", /* @__PURE__ */ new Set()), Be(this, "state", {
      shared: {
        shiftKey: !1,
        metaKey: !1,
        ctrlKey: !1,
        altKey: !1
      }
    }), jp(this, o);
  }
  setEventIds(o) {
    if (kl(o))
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
        for (const P of this.gestures) {
          const L = this.config[P], R = pc(c, L.eventOptions, !!m);
          if (L.enabled) {
            const D = ms.get(P);
            new D(this, o, P).bind(R);
          }
        }
        const k = pc(c, s.eventOptions, !!m);
        for (const P in this.nativeHandlers)
          k(P, "", (L) => this.nativeHandlers[P](De(De({}, this.state.shared), {}, {
            event: L,
            args: o
          })), void 0, !0);
      }
      for (const k in c)
        c[k] = Kd(...c[k]);
      if (!m) return c;
      for (const k in c) {
        const {
          device: P,
          capture: L,
          passive: R
        } = Ud(k);
        this._targetEventStore.add(m, P, "", c[k], {
          capture: L,
          passive: R
        });
      }
    }
  }
}
function mr(a, o) {
  a.gestures.add(o), a.gestureEventStores[o] = new Cc(a, o), a.gestureTimeoutStores[o] = new Op();
}
function jp(a, o) {
  o.drag && mr(a, "drag"), o.wheel && mr(a, "wheel"), o.scroll && mr(a, "scroll"), o.move && mr(a, "move"), o.pinch && mr(a, "pinch"), o.hover && mr(a, "hover");
}
const pc = (a, o, s) => (c, m, k, P = {}, L = !1) => {
  var R, D;
  const T = (R = P.capture) !== null && R !== void 0 ? R : o.capture, H = (D = P.passive) !== null && D !== void 0 ? D : o.passive;
  let B = L ? c : jd(c, m, T);
  s && H && (B += "Passive"), a[B] = a[B] || [], a[B].push(k);
}, Fp = /^on(Drag|Wheel|Scroll|Move|Pinch|Hover)/;
function Up(a) {
  const o = {}, s = {}, c = /* @__PURE__ */ new Set();
  for (let m in a)
    Fp.test(m) ? (c.add(RegExp.lastMatch), s[m] = a[m]) : o[m] = a[m];
  return [s, o, c];
}
function vr(a, o, s, c, m, k) {
  if (!a.has(s) || !ms.has(c))
    return;
  const P = s + "Start", L = s + "End", R = (D) => {
    let T;
    return D.first && P in o && o[P](D), s in o && (T = o[s](D)), D.last && L in o && o[L](D), T;
  };
  m[c] = R, k[c] = k[c] || {};
}
function $p(a, o) {
  const [s, c, m] = Up(a), k = {};
  return vr(m, s, "onDrag", "drag", k, o), vr(m, s, "onWheel", "wheel", k, o), vr(m, s, "onScroll", "scroll", k, o), vr(m, s, "onPinch", "pinch", k, o), vr(m, s, "onMove", "move", k, o), vr(m, s, "onHover", "hover", k, o), {
    handlers: k,
    config: o,
    nativeHandlers: c
  };
}
function Vp(a, o = {}, s, c) {
  const m = os.useMemo(() => new Ap(a), []);
  if (m.applyHandlers(a, c), m.applyConfig(o, s), os.useEffect(m.effect.bind(m)), os.useEffect(() => m.clean.bind(m), []), o.target === void 0)
    return m.bind.bind(m);
}
function Hp(a) {
  return a.forEach(xp), function(s, c) {
    const {
      handlers: m,
      nativeHandlers: k,
      config: P
    } = $p(s, c || {});
    return Vp(m, P, void 0, k);
  };
}
function Bp(a, o) {
  return Hp([Ep, Pp, Rp, zp, Tp, Cp])(a, o || {});
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
], wl = {
  maxVerticalRotationDeg: 5,
  dragSensitivity: 20,
  enlargeTransitionMs: 300,
  segments: 35
}, Hn = (a, o, s) => Math.min(Math.max(a, o), s), hc = (a) => (a % 360 + 360) % 360, mc = (a) => ((a + 180) % 360 + 360) % 360 - 180, Cn = (a, o, s) => {
  const c = a.dataset[o] ?? a.getAttribute(`data-${o}`), m = c == null ? NaN : parseFloat(c);
  return Number.isFinite(m) ? m : s;
};
function Yp(a, o) {
  const s = Array.from({ length: o }, (D, T) => -37 + T * 2), c = [-4, -2, 0, 2, 4], m = [-3, -1, 1, 3, 5], k = s.flatMap((D, T) => (T % 2 === 0 ? c : m).map((B) => ({ x: D, y: B, sizeX: 2, sizeY: 2 }))), P = k.length;
  if (a.length === 0)
    return k.map((D) => ({ ...D, src: "", alt: "" }));
  a.length > P && console.warn(
    `[DomeGallery] Provided image count (${a.length}) exceeds available tiles (${P}). Some images will not be shown.`
  );
  const L = a.map((D) => typeof D == "string" ? { src: D, alt: "" } : { src: D.src || "", alt: D.alt || "" }), R = Array.from({ length: P }, (D, T) => L[T % L.length]);
  for (let D = 1; D < R.length; D++)
    if (R[D].src === R[D - 1].src) {
      for (let T = D + 1; T < R.length; T++)
        if (R[T].src !== R[D].src) {
          const H = R[D];
          R[D] = R[T], R[T] = H;
          break;
        }
    }
  return k.map((D, T) => ({
    ...D,
    src: R[T].src,
    alt: R[T].alt
  }));
}
function vc(a, o, s, c, m) {
  const k = 360 / m / 2, P = k * (a + (s - 1) / 2);
  return { rotateX: k * (o - (c - 1) / 2), rotateY: P };
}
const Xp = ee.forwardRef(function({
  images: o = Wp,
  fit: s = 0.5,
  fitBasis: c = "auto",
  minRadius: m = 600,
  maxRadius: k = 1 / 0,
  padFactor: P = 0.25,
  overlayBlurColor: L = "#120F17",
  maxVerticalRotationDeg: R = wl.maxVerticalRotationDeg,
  dragSensitivity: D = wl.dragSensitivity,
  enlargeTransitionMs: T = wl.enlargeTransitionMs,
  segments: H = wl.segments,
  dragDampening: B = 2,
  openedImageWidth: Te = "400px",
  openedImageHeight: Pe = "400px",
  imageBorderRadius: te = "30px",
  openedImageBorderRadius: K = "30px",
  grayscale: Oe = !0,
  onImageClick: Ue
}, ct) {
  const pe = ee.useRef(null), We = ee.useRef(null), q = ee.useRef(null), Ae = ee.useRef(null), be = ee.useRef(null), Dt = ee.useRef(null), Ge = ee.useRef(null), Lt = ee.useRef(null), _e = ee.useRef({ x: 0, y: 0 }), et = ee.useRef({ x: 0, y: 0 }), $e = ee.useRef(null), tt = ee.useRef(!1), Ye = ee.useRef(!1), se = ee.useRef(!1), C = ee.useRef(null), j = ee.useRef("mouse"), z = ee.useRef(null), h = ee.useRef(!1), w = ee.useRef(0), W = ee.useRef(0), X = ee.useRef(!1), J = ee.useCallback(() => {
    X.current || (X.current = !0, document.body.classList.add("dg-scroll-lock"));
  }, []), b = ee.useCallback(() => {
    var F;
    X.current && ((F = pe.current) == null ? void 0 : F.getAttribute("data-enlarging")) !== "true" && (X.current = !1, document.body.classList.remove("dg-scroll-lock"));
  }, []), he = ee.useMemo(() => Yp(o, H), [o, H]), Z = (F, G) => {
    const ne = q.current;
    ne && (ne.style.transform = `translateZ(calc(var(--radius) * -1)) rotateX(${F}deg) rotateY(${G}deg)`);
  };
  ee.useImperativeHandle(
    ct,
    () => ({
      focusOn: (F) => {
        var Ee;
        const G = (Ee = q.current) == null ? void 0 : Ee.querySelectorAll("[data-src]");
        if (!G) return;
        let ne = null;
        for (const ce of Array.from(G))
          if (ce.dataset.src === F) {
            ne = ce;
            break;
          }
        if (!ne) return;
        const re = Cn(ne, "offsetX", 0), ue = Cn(ne, "offsetY", 0), ve = Cn(ne, "sizeX", 2), ae = Cn(ne, "sizeY", 2), ge = vc(re, ue, ve, ae, H), Le = Hn(-ge.rotateX, -R, R), ye = mc(-ge.rotateY);
        _e.current = { x: Le, y: ye }, q.current && (q.current.style.transition = "transform 600ms ease"), Z(Le, ye), window.setTimeout(() => {
          q.current && (q.current.style.transition = "");
        }, 650);
      },
      resetRotation: () => {
        _e.current = { x: 0, y: 0 }, q.current && (q.current.style.transition = "transform 600ms ease"), Z(0, 0), window.setTimeout(() => {
          q.current && (q.current.style.transition = "");
        }, 650);
      }
    }),
    [H, R]
  );
  const me = ee.useRef(null);
  ee.useEffect(() => {
    const F = pe.current;
    if (!F) return;
    const G = new ResizeObserver((ne) => {
      var fe;
      const re = ne[0].contentRect, ue = Math.max(1, re.width), ve = Math.max(1, re.height), ae = Math.min(ue, ve), ge = Math.max(ue, ve), Le = ue / ve;
      let ye;
      switch (c) {
        case "min":
          ye = ae;
          break;
        case "max":
          ye = ge;
          break;
        case "width":
          ye = ue;
          break;
        case "height":
          ye = ve;
          break;
        default:
          ye = Le >= 1.3 ? ue : ae;
      }
      let Ee = ye * s;
      const ce = ve * 1.35;
      Ee = Math.min(Ee, ce), Ee = Hn(Ee, m, k), me.current = Math.round(Ee);
      const ie = Math.max(8, Math.round(ae * P));
      F.style.setProperty("--radius", `${me.current}px`), F.style.setProperty("--viewer-pad", `${ie}px`), F.style.setProperty("--overlay-blur-color", L), F.style.setProperty("--tile-radius", te), F.style.setProperty("--enlarge-radius", K), F.style.setProperty("--image-filter", Oe ? "grayscale(1)" : "none"), Z(_e.current.x, _e.current.y);
      const Me = (fe = be.current) == null ? void 0 : fe.querySelector(".enlarge");
      if (Me && Ae.current && We.current) {
        const Y = Ae.current.getBoundingClientRect(), Ve = We.current.getBoundingClientRect();
        if (Te && Pe) {
          const Re = document.createElement("div");
          Re.style.cssText = `position: absolute; width: ${Te}; height: ${Pe}; visibility: hidden;`, document.body.appendChild(Re);
          const ft = Re.getBoundingClientRect();
          document.body.removeChild(Re);
          const nn = Y.left - Ve.left + (Y.width - ft.width) / 2, $t = Y.top - Ve.top + (Y.height - ft.height) / 2;
          Me.style.left = `${nn}px`, Me.style.top = `${$t}px`;
        } else
          Me.style.left = `${Y.left - Ve.left}px`, Me.style.top = `${Y.top - Ve.top}px`, Me.style.width = `${Y.width}px`, Me.style.height = `${Y.height}px`;
      }
    });
    return G.observe(F), () => G.disconnect();
  }, [
    s,
    c,
    m,
    k,
    P,
    L,
    Oe,
    te,
    K,
    Te,
    Pe
  ]), ee.useEffect(() => {
    Z(_e.current.x, _e.current.y);
  }, []);
  const nt = ee.useCallback(() => {
    C.current && (cancelAnimationFrame(C.current), C.current = null);
  }, []), Wn = ee.useCallback(
    (F, G) => {
      let re = Hn(F, -1.4, 1.4) * 80, ue = Hn(G, -1.4, 1.4) * 80, ve = 0;
      const ae = Hn(B ?? 0.6, 0, 1), ge = 0.94 + 0.055 * ae, Le = 0.015 - 0.01 * ae, ye = Math.round(90 + 270 * ae), Ee = () => {
        if (re *= ge, ue *= ge, Math.abs(re) < Le && Math.abs(ue) < Le) {
          C.current = null;
          return;
        }
        if (++ve > ye) {
          C.current = null;
          return;
        }
        const ce = Hn(_e.current.x - ue / 200, -R, R), ie = mc(_e.current.y + re / 200);
        _e.current = { x: ce, y: ie }, Z(ce, ie), C.current = requestAnimationFrame(Ee);
      };
      nt(), C.current = requestAnimationFrame(Ee);
    },
    [B, R, nt]
  );
  Bp(
    {
      onDragStart: ({ event: F }) => {
        var re, ue;
        if (Ge.current) return;
        nt();
        const G = F;
        j.current = G.pointerType || "mouse", j.current === "touch" && G.preventDefault(), j.current === "touch" && J(), tt.current = !0, Ye.current = !1, se.current = !1, et.current = { ..._e.current }, $e.current = { x: G.clientX, y: G.clientY };
        const ne = (ue = (re = G.target).closest) == null ? void 0 : ue.call(re, ".item__image");
        z.current = ne || null;
      },
      onDrag: ({ event: F, last: G, velocity: ne = [0, 0], direction: re = [0, 0], movement: ue }) => {
        if (Ge.current || !tt.current || !$e.current) return;
        const ve = F;
        j.current === "touch" && ve.preventDefault();
        const ae = ve.clientX - $e.current.x, ge = ve.clientY - $e.current.y;
        se.current || ae * ae + ge * ge > 16 && (se.current = !0);
        const Le = Hn(
          et.current.x - ge / D,
          -R,
          R
        ), ye = et.current.y + ae / D, Ee = _e.current;
        if ((Ee.x !== Le || Ee.y !== ye) && (_e.current = { x: Le, y: ye }, Z(Le, ye)), G) {
          tt.current = !1;
          let ce = !1;
          if ($e.current) {
            const Re = ve.clientX - $e.current.x, ft = ve.clientY - $e.current.y, nn = Re * Re + ft * ft, $t = j.current === "touch" ? 10 : 6;
            nn <= $t * $t && (ce = !0);
          }
          let [ie, Me] = ne;
          const [fe, Y] = re;
          let Ve = ie * fe, Xe = Me * Y;
          if (!ce && Math.abs(Ve) < 1e-3 && Math.abs(Xe) < 1e-3 && Array.isArray(ue)) {
            const [Re, ft] = ue;
            Ve = Re / D * 0.02, Xe = ft / D * 0.02;
          }
          if (!ce && (Math.abs(Ve) > 5e-3 || Math.abs(Xe) > 5e-3) && Wn(Ve, Xe), $e.current = null, Ye.current = !ce, ce && z.current && !Ge.current)
            if (Ue) {
              const Re = z.current.parentElement, ft = (Re == null ? void 0 : Re.dataset.src) || "";
              ft && Ue(ft);
            } else
              Tn(z.current);
          z.current = null, Ye.current && setTimeout(() => Ye.current = !1, 120), j.current === "touch" && b(), se.current && (W.current = performance.now()), se.current = !1;
        }
      }
    },
    { target: We, eventOptions: { passive: !1 } }
  ), ee.useEffect(() => {
    const F = Dt.current;
    if (!F) return;
    const G = () => {
      var Y, Ve;
      if (performance.now() - w.current < 250) return;
      const re = Ge.current;
      if (!re) return;
      const ue = re.parentElement, ve = (Y = be.current) == null ? void 0 : Y.querySelector(".enlarge");
      if (!ve) return;
      const ae = ue.querySelector(".item__image--reference"), ge = Lt.current;
      if (!ge) {
        ve.remove(), ae && ae.remove(), ue.style.setProperty("--rot-y-delta", "0deg"), ue.style.setProperty("--rot-x-delta", "0deg"), re.style.visibility = "", re.style.zIndex = 0, Ge.current = null, (Ve = pe.current) == null || Ve.removeAttribute("data-enlarging"), h.current = !1;
        return;
      }
      const Le = ve.getBoundingClientRect(), ye = pe.current.getBoundingClientRect(), Ee = {
        left: ge.left - ye.left,
        top: ge.top - ye.top,
        width: ge.width,
        height: ge.height
      }, ce = {
        left: Le.left - ye.left,
        top: Le.top - ye.top,
        width: Le.width,
        height: Le.height
      }, ie = document.createElement("div");
      ie.className = "enlarge-closing", ie.style.cssText = `
        position: absolute;
        left: ${ce.left}px;
        top: ${ce.top}px;
        width: ${ce.width}px;
        height: ${ce.height}px;
        z-index: 9999;
        border-radius: ${K};
        overflow: hidden;
        box-shadow: 0 10px 30px rgba(0,0,0,.35);
        transition: all ${T}ms ease-out;
        pointer-events: none;
        margin: 0;
        transform: none;
        filter: ${Oe ? "grayscale(1)" : "none"};
      `;
      const Me = ve.querySelector("img");
      if (Me) {
        const Xe = Me.cloneNode();
        Xe.style.cssText = "width: 100%; height: 100%; object-fit: cover;", ie.appendChild(Xe);
      }
      ve.remove(), pe.current.appendChild(ie), ie.getBoundingClientRect(), requestAnimationFrame(() => {
        ie.style.left = Ee.left + "px", ie.style.top = Ee.top + "px", ie.style.width = Ee.width + "px", ie.style.height = Ee.height + "px", ie.style.opacity = "0";
      });
      const fe = () => {
        ie.remove(), Lt.current = null, ae && ae.remove(), ue.style.transition = "none", re.style.transition = "none", ue.style.setProperty("--rot-y-delta", "0deg"), ue.style.setProperty("--rot-x-delta", "0deg"), requestAnimationFrame(() => {
          var Xe;
          re.style.visibility = "", re.style.opacity = "0", re.style.zIndex = 0, Ge.current = null, (Xe = pe.current) == null || Xe.removeAttribute("data-enlarging"), requestAnimationFrame(() => {
            ue.style.transition = "", re.style.transition = "opacity 300ms ease-out", requestAnimationFrame(() => {
              re.style.opacity = "1", setTimeout(() => {
                var Re;
                re.style.transition = "", re.style.opacity = "", h.current = !1, !tt.current && ((Re = pe.current) == null ? void 0 : Re.getAttribute("data-enlarging")) !== "true" && document.body.classList.remove("dg-scroll-lock");
              }, 300);
            });
          });
        });
      };
      ie.addEventListener("transitionend", fe, {
        once: !0
      });
    };
    F.addEventListener("click", G);
    const ne = (re) => {
      re.key === "Escape" && G();
    };
    return window.addEventListener("keydown", ne), () => {
      F.removeEventListener("click", G), window.removeEventListener("keydown", ne);
    };
  }, [T, K, Oe]);
  const Tn = (F) => {
    var Yn, Xt, Kt, Sr;
    if (h.current) return;
    h.current = !0, w.current = performance.now(), J();
    const G = F.parentElement;
    Ge.current = F, F.setAttribute("data-focused", "true");
    const ne = Cn(G, "offsetX", 0), re = Cn(G, "offsetY", 0), ue = Cn(G, "sizeX", 2), ve = Cn(G, "sizeY", 2), ae = vc(ne, re, ue, ve, H), ge = hc(ae.rotateY), Le = hc(_e.current.y);
    let ye = -(ge + Le) % 360;
    ye < -180 && (ye += 360);
    const Ee = -ae.rotateX - _e.current.x;
    G.style.setProperty("--rot-y-delta", `${ye}deg`), G.style.setProperty("--rot-x-delta", `${Ee}deg`);
    const ce = document.createElement("div");
    ce.className = "item__image item__image--reference opacity-0", ce.style.transform = `rotateX(${-ae.rotateX}deg) rotateY(${-ae.rotateY}deg)`, G.appendChild(ce), ce.offsetHeight;
    const ie = ce.getBoundingClientRect(), Me = (Yn = We.current) == null ? void 0 : Yn.getBoundingClientRect(), fe = (Xt = Ae.current) == null ? void 0 : Xt.getBoundingClientRect();
    if (!Me || !fe || ie.width <= 0 || ie.height <= 0) {
      h.current = !1, Ge.current = null, G.removeChild(ce), b();
      return;
    }
    Lt.current = {
      left: ie.left,
      top: ie.top,
      width: ie.width,
      height: ie.height
    }, F.style.visibility = "hidden", F.style.zIndex = 0;
    const Y = document.createElement("div");
    Y.className = "enlarge", Y.style.cssText = `position:absolute; left:${fe.left - Me.left}px; top:${fe.top - Me.top}px; width:${fe.width}px; height:${fe.height}px; opacity:0; z-index:30; will-change:transform,opacity; transform-origin:top left; transition:transform ${T}ms ease, opacity ${T}ms ease; border-radius:${K}; overflow:hidden; box-shadow:0 10px 30px rgba(0,0,0,.35);`;
    const Ve = G.dataset.src || ((Kt = F.querySelector("img")) == null ? void 0 : Kt.src) || "", Xe = G.dataset.alt || ((Sr = F.querySelector("img")) == null ? void 0 : Sr.alt) || "", Re = document.createElement("img");
    Re.src = Ve, Re.alt = Xe, Re.style.cssText = `width:100%; height:100%; object-fit:cover; filter:${Oe ? "grayscale(1)" : "none"};`, Y.appendChild(Re), be.current.appendChild(Y);
    const ft = ie.left - fe.left, nn = ie.top - fe.top, $t = ie.width / fe.width, Pn = ie.height / fe.height, wr = isFinite($t) && $t > 0 ? $t : 1, _r = isFinite(Pn) && Pn > 0 ? Pn : 1;
    if (Y.style.transform = `translate(${ft}px, ${nn}px) scale(${wr}, ${_r})`, setTimeout(() => {
      var rn;
      Y.parentElement && (Y.style.opacity = "1", Y.style.transform = "translate(0px, 0px) scale(1, 1)", (rn = pe.current) == null || rn.setAttribute("data-enlarging", "true"));
    }, 16), Te || Pe) {
      const rn = (ai) => {
        if (ai.propertyName !== "transform") return;
        Y.removeEventListener("transitionend", rn);
        const ci = Y.style.transition;
        Y.style.transition = "none";
        const kr = Te || `${fe.width}px`, Xn = Pe || `${fe.height}px`;
        Y.style.width = kr, Y.style.height = Xn;
        const xr = Y.getBoundingClientRect();
        Y.style.width = fe.width + "px", Y.style.height = fe.height + "px", Y.offsetWidth, Y.style.transition = `left ${T}ms ease, top ${T}ms ease, width ${T}ms ease, height ${T}ms ease`;
        const Rn = fe.left - Me.left + (fe.width - xr.width) / 2, Er = fe.top - Me.top + (fe.height - xr.height) / 2;
        requestAnimationFrame(() => {
          Y.style.left = `${Rn}px`, Y.style.top = `${Er}px`, Y.style.width = kr, Y.style.height = Xn;
        });
        const ln = () => {
          Y.removeEventListener("transitionend", ln), Y.style.transition = ci;
        };
        Y.addEventListener("transitionend", ln, {
          once: !0
        });
      };
      Y.addEventListener("transitionend", rn);
    }
  };
  return ee.useEffect(() => () => {
    document.body.classList.remove("dg-scroll-lock");
  }, []), /* @__PURE__ */ lt.jsxs(lt.Fragment, { children: [
    /* @__PURE__ */ lt.jsx("style", { dangerouslySetInnerHTML: { __html: `
    .sphere-root {
      --radius: 520px;
      --viewer-pad: 72px;
      --circ: calc(var(--radius) * 3.14);
      --rot-y: calc((360deg / var(--segments-x)) / 2);
      --rot-x: calc((360deg / var(--segments-y)) / 2);
      --item-width: calc(var(--circ) / var(--segments-x));
      --item-height: calc(var(--circ) / var(--segments-y));
      position: relative;
      width: 100%;
      height: 100%;
    }

    .sphere-root * { box-sizing: border-box; }
    .sphere, .sphere-item, .item__image { transform-style: preserve-3d; }

    .stage {
      width: 100%;
      height: 100%;
      display: grid;
      place-items: center;
      position: absolute;
      inset: 0;
      margin: auto;
      perspective: calc(var(--radius) * 2);
      perspective-origin: 50% 50%;
    }

    .sphere {
      transform: translateZ(calc(var(--radius) * -1));
      will-change: transform;
      position: absolute;
    }

    .sphere-item {
      width: calc(var(--item-width) * var(--item-size-x));
      height: calc(var(--item-height) * var(--item-size-y));
      position: absolute;
      top: -999px;
      bottom: -999px;
      left: -999px;
      right: -999px;
      margin: auto;
      transform-origin: 50% 50%;
      backface-visibility: hidden;
      transition: transform 300ms;
      transform: rotateY(calc(var(--rot-y) * (var(--offset-x) + ((var(--item-size-x) - 1) / 2)) + var(--rot-y-delta, 0deg)))
                 rotateX(calc(var(--rot-x) * (var(--offset-y) - ((var(--item-size-y) - 1) / 2)) + var(--rot-x-delta, 0deg)))
                 translateZ(var(--radius));
    }

    .sphere-root[data-enlarging="true"] .scrim {
      opacity: 1 !important;
      pointer-events: all !important;
    }

    @media (max-aspect-ratio: 1/1) {
      .viewer-frame {
        height: auto !important;
        width: 100% !important;
      }
    }

    .item__image {
      position: absolute;
      inset: 10px;
      border-radius: var(--tile-radius, 12px);
      overflow: hidden;
      cursor: pointer;
      backface-visibility: hidden;
      -webkit-backface-visibility: hidden;
      transition: transform 300ms;
      pointer-events: auto;
      -webkit-transform: translateZ(0);
      transform: translateZ(0);
      display: block;
      background-color: #e5e7eb;
    }
    .item__image--reference {
      position: absolute;
      inset: 10px;
      pointer-events: none;
    }
    .item__image:focus-visible {
      outline: 2px solid #E8B45A;
      outline-offset: 2px;
    }

    /* Hand-written equivalents of the handful of Tailwind utility classes
       the original component uses, so this compiles without a Tailwind
       build step. Purely mechanical; no visual change from the original. */
    .dg-main { position: absolute; inset: 0; display: grid; place-items: center; overflow: hidden; user-select: none; background: transparent; }
    .dg-sphere-item-pos { position: absolute; margin: auto; }
    .dg-tile-img { width: 100%; height: 100%; object-fit: cover; pointer-events: none; }
    .dg-overlay-radial { position: absolute; inset: 0; margin: auto; z-index: 3; pointer-events: none; }
    .dg-edge-top { position: absolute; left: 0; right: 0; top: 0; height: 120px; z-index: 5; pointer-events: none; transform: rotate(180deg); }
    .dg-edge-bottom { position: absolute; left: 0; right: 0; bottom: 0; height: 120px; z-index: 5; pointer-events: none; }
    .dg-viewer { position: absolute; inset: 0; z-index: 20; pointer-events: none; display: flex; align-items: center; justify-content: center; }
    .dg-scrim { position: absolute; inset: 0; z-index: 10; pointer-events: none; opacity: 0; transition: opacity 500ms; }
    .dg-viewer-frame { height: 100%; aspect-ratio: 1 / 1; display: flex; }
  ` } }),
    /* @__PURE__ */ lt.jsx(
      "div",
      {
        ref: pe,
        className: "sphere-root",
        style: {
          "--segments-x": H,
          "--segments-y": H,
          "--overlay-blur-color": L,
          "--tile-radius": te,
          "--enlarge-radius": K,
          "--image-filter": Oe ? "grayscale(1)" : "none"
        },
        children: /* @__PURE__ */ lt.jsxs(
          "main",
          {
            ref: We,
            className: "dg-main",
            style: {
              touchAction: "none",
              WebkitUserSelect: "none"
            },
            children: [
              /* @__PURE__ */ lt.jsx("div", { className: "stage", children: /* @__PURE__ */ lt.jsx("div", { ref: q, className: "sphere", children: he.map((F, G) => /* @__PURE__ */ lt.jsx(
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
                  children: /* @__PURE__ */ lt.jsx(
                    "div",
                    {
                      className: "item__image",
                      role: "button",
                      tabIndex: 0,
                      "aria-label": F.alt || "Open image",
                      onClick: (ne) => {
                        if (!tt.current && !se.current && !(performance.now() - W.current < 80)) {
                          if (Ue) {
                            Ue(F.src);
                            return;
                          }
                          h.current || Tn(ne.currentTarget);
                        }
                      },
                      onPointerUp: (ne) => {
                        ne.nativeEvent.pointerType === "touch" && (tt.current || se.current || performance.now() - W.current < 80 || Ue || h.current || Tn(ne.currentTarget));
                      },
                      onKeyDown: (ne) => {
                        if (!(ne.key !== "Enter" && ne.key !== " ")) {
                          if (ne.preventDefault(), Ue) {
                            Ue(F.src);
                            return;
                          }
                          h.current || Tn(ne.currentTarget);
                        }
                      },
                      style: {
                        inset: "10px",
                        borderRadius: `var(--tile-radius, ${te})`,
                        backfaceVisibility: "hidden"
                      },
                      children: /* @__PURE__ */ lt.jsx(
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
                `${F.x},${F.y},${G}`
              )) }) }),
              /* @__PURE__ */ lt.jsx(
                "div",
                {
                  className: "dg-overlay-radial",
                  style: {
                    backgroundImage: `radial-gradient(rgba(235, 235, 235, 0) 65%, var(--overlay-blur-color, ${L}) 100%)`
                  }
                }
              ),
              /* @__PURE__ */ lt.jsx(
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
              /* @__PURE__ */ lt.jsx(
                "div",
                {
                  className: "dg-edge-top",
                  style: {
                    background: `linear-gradient(to bottom, transparent, var(--overlay-blur-color, ${L}))`
                  }
                }
              ),
              /* @__PURE__ */ lt.jsx(
                "div",
                {
                  className: "dg-edge-bottom",
                  style: {
                    background: `linear-gradient(to bottom, transparent, var(--overlay-blur-color, ${L}))`
                  }
                }
              ),
              /* @__PURE__ */ lt.jsxs("div", { ref: be, className: "dg-viewer", style: { padding: "var(--viewer-pad)" }, children: [
                /* @__PURE__ */ lt.jsx(
                  "div",
                  {
                    ref: Dt,
                    className: "scrim dg-scrim",
                    style: {
                      background: "rgba(0, 0, 0, 0.4)",
                      backdropFilter: "blur(3px)"
                    }
                  }
                ),
                /* @__PURE__ */ lt.jsx(
                  "div",
                  {
                    ref: Ae,
                    className: "viewer-frame dg-viewer-frame",
                    style: {
                      borderRadius: `var(--enlarge-radius, ${K})`
                    }
                  }
                )
              ] })
            ]
          }
        )
      }
    )
  ] });
});
function Kp(a, o) {
  const s = { current: null }, c = Rd.createRoot(a);
  return c.render(
    ee.createElement(Xp, {
      ref: (m) => {
        s.current = m;
      },
      images: o.images,
      onImageClick: o.onImageClick,
      fit: o.fit ?? 0.8,
      minRadius: o.minRadius ?? 900,
      // The pasted reference used 0 (no vertical tilt at all); Longplayur
      // wants real up/down drag too, so this defaults much higher. The
      // component still clamps vertical rotation structurally (it is a
      // hemispheric dome, not a full sphere) -- see KNOWN-DEVIATIONS.md.
      maxVerticalRotationDeg: o.maxVerticalRotationDeg ?? 45,
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
