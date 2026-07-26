var Nd = Object.defineProperty;
var Ld = (u, d, i) => d in u ? Nd(u, d, { enumerable: !0, configurable: !0, writable: !0, value: i }) : u[d] = i;
var j = (u, d, i) => Ld(u, typeof d != "symbol" ? d + "" : d, i);
function Md(u) {
  return u && u.__esModule && Object.prototype.hasOwnProperty.call(u, "default") ? u.default : u;
}
var Ui = { exports: {} }, ee = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Ya;
function Od() {
  if (Ya) return ee;
  Ya = 1;
  var u = Symbol.for("react.element"), d = Symbol.for("react.portal"), i = Symbol.for("react.fragment"), a = Symbol.for("react.strict_mode"), c = Symbol.for("react.profiler"), m = Symbol.for("react.provider"), y = Symbol.for("react.context"), k = Symbol.for("react.forward_ref"), E = Symbol.for("react.suspense"), O = Symbol.for("react.memo"), N = Symbol.for("react.lazy"), U = Symbol.iterator;
  function V(v) {
    return v === null || typeof v != "object" ? null : (v = U && v[U] || v["@@iterator"], typeof v == "function" ? v : null);
  }
  var J = { isMounted: function() {
    return !1;
  }, enqueueForceUpdate: function() {
  }, enqueueReplaceState: function() {
  }, enqueueSetState: function() {
  } }, b = Object.assign, K = {};
  function R(v, x, q) {
    this.props = v, this.context = x, this.refs = K, this.updater = q || J;
  }
  R.prototype.isReactComponent = {}, R.prototype.setState = function(v, x) {
    if (typeof v != "object" && typeof v != "function" && v != null) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
    this.updater.enqueueSetState(this, v, x, "setState");
  }, R.prototype.forceUpdate = function(v) {
    this.updater.enqueueForceUpdate(this, v, "forceUpdate");
  };
  function X() {
  }
  X.prototype = R.prototype;
  function ve(v, x, q) {
    this.props = v, this.context = x, this.refs = K, this.updater = q || J;
  }
  var re = ve.prototype = new X();
  re.constructor = ve, b(re, R.prototype), re.isPureReactComponent = !0;
  var ue = Array.isArray, Oe = Object.prototype.hasOwnProperty, W = { current: null }, Z = { key: !0, ref: !0, __self: !0, __source: !0 };
  function ce(v, x, q) {
    var te, le = {}, oe = null, fe = null;
    if (x != null) for (te in x.ref !== void 0 && (fe = x.ref), x.key !== void 0 && (oe = "" + x.key), x) Oe.call(x, te) && !Z.hasOwnProperty(te) && (le[te] = x[te]);
    var se = arguments.length - 2;
    if (se === 1) le.children = q;
    else if (1 < se) {
      for (var ge = Array(se), Je = 0; Je < se; Je++) ge[Je] = arguments[Je + 2];
      le.children = ge;
    }
    if (v && v.defaultProps) for (te in se = v.defaultProps, se) le[te] === void 0 && (le[te] = se[te]);
    return { $$typeof: u, type: v, key: oe, ref: fe, props: le, _owner: W.current };
  }
  function pe(v, x) {
    return { $$typeof: u, type: v.type, key: x, ref: v.ref, props: v.props, _owner: v._owner };
  }
  function De(v) {
    return typeof v == "object" && v !== null && v.$$typeof === u;
  }
  function Jt(v) {
    var x = { "=": "=0", ":": "=2" };
    return "$" + v.replace(/[=:]/g, function(q) {
      return x[q];
    });
  }
  var mt = /\/+/g;
  function Ye(v, x) {
    return typeof v == "object" && v !== null && v.key != null ? Jt("" + v.key) : x.toString(36);
  }
  function ut(v, x, q, te, le) {
    var oe = typeof v;
    (oe === "undefined" || oe === "boolean") && (v = null);
    var fe = !1;
    if (v === null) fe = !0;
    else switch (oe) {
      case "string":
      case "number":
        fe = !0;
        break;
      case "object":
        switch (v.$$typeof) {
          case u:
          case d:
            fe = !0;
        }
    }
    if (fe) return fe = v, le = le(fe), v = te === "" ? "." + Ye(fe, 0) : te, ue(le) ? (q = "", v != null && (q = v.replace(mt, "$&/") + "/"), ut(le, x, q, "", function(Je) {
      return Je;
    })) : le != null && (De(le) && (le = pe(le, q + (!le.key || fe && fe.key === le.key ? "" : ("" + le.key).replace(mt, "$&/") + "/") + v)), x.push(le)), 1;
    if (fe = 0, te = te === "" ? "." : te + ":", ue(v)) for (var se = 0; se < v.length; se++) {
      oe = v[se];
      var ge = te + Ye(oe, se);
      fe += ut(oe, x, q, ge, le);
    }
    else if (ge = V(v), typeof ge == "function") for (v = ge.call(v), se = 0; !(oe = v.next()).done; ) oe = oe.value, ge = te + Ye(oe, se++), fe += ut(oe, x, q, ge, le);
    else if (oe === "object") throw x = String(v), Error("Objects are not valid as a React child (found: " + (x === "[object Object]" ? "object with keys {" + Object.keys(v).join(", ") + "}" : x) + "). If you meant to render a collection of children, use an array instead.");
    return fe;
  }
  function vt(v, x, q) {
    if (v == null) return v;
    var te = [], le = 0;
    return ut(v, te, "", "", function(oe) {
      return x.call(q, oe, le++);
    }), te;
  }
  function $e(v) {
    if (v._status === -1) {
      var x = v._result;
      x = x(), x.then(function(q) {
        (v._status === 0 || v._status === -1) && (v._status = 1, v._result = q);
      }, function(q) {
        (v._status === 0 || v._status === -1) && (v._status = 2, v._result = q);
      }), v._status === -1 && (v._status = 0, v._result = x);
    }
    if (v._status === 1) return v._result.default;
    throw v._result;
  }
  var ke = { current: null }, L = { transition: null }, H = { ReactCurrentDispatcher: ke, ReactCurrentBatchConfig: L, ReactCurrentOwner: W };
  function I() {
    throw Error("act(...) is not supported in production builds of React.");
  }
  return ee.Children = { map: vt, forEach: function(v, x, q) {
    vt(v, function() {
      x.apply(this, arguments);
    }, q);
  }, count: function(v) {
    var x = 0;
    return vt(v, function() {
      x++;
    }), x;
  }, toArray: function(v) {
    return vt(v, function(x) {
      return x;
    }) || [];
  }, only: function(v) {
    if (!De(v)) throw Error("React.Children.only expected to receive a single React element child.");
    return v;
  } }, ee.Component = R, ee.Fragment = i, ee.Profiler = c, ee.PureComponent = ve, ee.StrictMode = a, ee.Suspense = E, ee.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = H, ee.act = I, ee.cloneElement = function(v, x, q) {
    if (v == null) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + v + ".");
    var te = b({}, v.props), le = v.key, oe = v.ref, fe = v._owner;
    if (x != null) {
      if (x.ref !== void 0 && (oe = x.ref, fe = W.current), x.key !== void 0 && (le = "" + x.key), v.type && v.type.defaultProps) var se = v.type.defaultProps;
      for (ge in x) Oe.call(x, ge) && !Z.hasOwnProperty(ge) && (te[ge] = x[ge] === void 0 && se !== void 0 ? se[ge] : x[ge]);
    }
    var ge = arguments.length - 2;
    if (ge === 1) te.children = q;
    else if (1 < ge) {
      se = Array(ge);
      for (var Je = 0; Je < ge; Je++) se[Je] = arguments[Je + 2];
      te.children = se;
    }
    return { $$typeof: u, type: v.type, key: le, ref: oe, props: te, _owner: fe };
  }, ee.createContext = function(v) {
    return v = { $$typeof: y, _currentValue: v, _currentValue2: v, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null }, v.Provider = { $$typeof: m, _context: v }, v.Consumer = v;
  }, ee.createElement = ce, ee.createFactory = function(v) {
    var x = ce.bind(null, v);
    return x.type = v, x;
  }, ee.createRef = function() {
    return { current: null };
  }, ee.forwardRef = function(v) {
    return { $$typeof: k, render: v };
  }, ee.isValidElement = De, ee.lazy = function(v) {
    return { $$typeof: N, _payload: { _status: -1, _result: v }, _init: $e };
  }, ee.memo = function(v, x) {
    return { $$typeof: O, type: v, compare: x === void 0 ? null : x };
  }, ee.startTransition = function(v) {
    var x = L.transition;
    L.transition = {};
    try {
      v();
    } finally {
      L.transition = x;
    }
  }, ee.unstable_act = I, ee.useCallback = function(v, x) {
    return ke.current.useCallback(v, x);
  }, ee.useContext = function(v) {
    return ke.current.useContext(v);
  }, ee.useDebugValue = function() {
  }, ee.useDeferredValue = function(v) {
    return ke.current.useDeferredValue(v);
  }, ee.useEffect = function(v, x) {
    return ke.current.useEffect(v, x);
  }, ee.useId = function() {
    return ke.current.useId();
  }, ee.useImperativeHandle = function(v, x, q) {
    return ke.current.useImperativeHandle(v, x, q);
  }, ee.useInsertionEffect = function(v, x) {
    return ke.current.useInsertionEffect(v, x);
  }, ee.useLayoutEffect = function(v, x) {
    return ke.current.useLayoutEffect(v, x);
  }, ee.useMemo = function(v, x) {
    return ke.current.useMemo(v, x);
  }, ee.useReducer = function(v, x, q) {
    return ke.current.useReducer(v, x, q);
  }, ee.useRef = function(v) {
    return ke.current.useRef(v);
  }, ee.useState = function(v) {
    return ke.current.useState(v);
  }, ee.useSyncExternalStore = function(v, x, q) {
    return ke.current.useSyncExternalStore(v, x, q);
  }, ee.useTransition = function() {
    return ke.current.useTransition();
  }, ee.version = "18.3.1", ee;
}
var Ja;
function mc() {
  return Ja || (Ja = 1, Ui.exports = Od()), Ui.exports;
}
var Y = mc();
const G = /* @__PURE__ */ Md(Y);
var jl = {}, ji = { exports: {} }, Xe = {}, Vi = { exports: {} }, Bi = {};
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Za;
function Dd() {
  return Za || (Za = 1, (function(u) {
    function d(L, H) {
      var I = L.length;
      L.push(H);
      e: for (; 0 < I; ) {
        var v = I - 1 >>> 1, x = L[v];
        if (0 < c(x, H)) L[v] = H, L[I] = x, I = v;
        else break e;
      }
    }
    function i(L) {
      return L.length === 0 ? null : L[0];
    }
    function a(L) {
      if (L.length === 0) return null;
      var H = L[0], I = L.pop();
      if (I !== H) {
        L[0] = I;
        e: for (var v = 0, x = L.length, q = x >>> 1; v < q; ) {
          var te = 2 * (v + 1) - 1, le = L[te], oe = te + 1, fe = L[oe];
          if (0 > c(le, I)) oe < x && 0 > c(fe, le) ? (L[v] = fe, L[oe] = I, v = oe) : (L[v] = le, L[te] = I, v = te);
          else if (oe < x && 0 > c(fe, I)) L[v] = fe, L[oe] = I, v = oe;
          else break e;
        }
      }
      return H;
    }
    function c(L, H) {
      var I = L.sortIndex - H.sortIndex;
      return I !== 0 ? I : L.id - H.id;
    }
    if (typeof performance == "object" && typeof performance.now == "function") {
      var m = performance;
      u.unstable_now = function() {
        return m.now();
      };
    } else {
      var y = Date, k = y.now();
      u.unstable_now = function() {
        return y.now() - k;
      };
    }
    var E = [], O = [], N = 1, U = null, V = 3, J = !1, b = !1, K = !1, R = typeof setTimeout == "function" ? setTimeout : null, X = typeof clearTimeout == "function" ? clearTimeout : null, ve = typeof setImmediate < "u" ? setImmediate : null;
    typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
    function re(L) {
      for (var H = i(O); H !== null; ) {
        if (H.callback === null) a(O);
        else if (H.startTime <= L) a(O), H.sortIndex = H.expirationTime, d(E, H);
        else break;
        H = i(O);
      }
    }
    function ue(L) {
      if (K = !1, re(L), !b) if (i(E) !== null) b = !0, $e(Oe);
      else {
        var H = i(O);
        H !== null && ke(ue, H.startTime - L);
      }
    }
    function Oe(L, H) {
      b = !1, K && (K = !1, X(ce), ce = -1), J = !0;
      var I = V;
      try {
        for (re(H), U = i(E); U !== null && (!(U.expirationTime > H) || L && !Jt()); ) {
          var v = U.callback;
          if (typeof v == "function") {
            U.callback = null, V = U.priorityLevel;
            var x = v(U.expirationTime <= H);
            H = u.unstable_now(), typeof x == "function" ? U.callback = x : U === i(E) && a(E), re(H);
          } else a(E);
          U = i(E);
        }
        if (U !== null) var q = !0;
        else {
          var te = i(O);
          te !== null && ke(ue, te.startTime - H), q = !1;
        }
        return q;
      } finally {
        U = null, V = I, J = !1;
      }
    }
    var W = !1, Z = null, ce = -1, pe = 5, De = -1;
    function Jt() {
      return !(u.unstable_now() - De < pe);
    }
    function mt() {
      if (Z !== null) {
        var L = u.unstable_now();
        De = L;
        var H = !0;
        try {
          H = Z(!0, L);
        } finally {
          H ? Ye() : (W = !1, Z = null);
        }
      } else W = !1;
    }
    var Ye;
    if (typeof ve == "function") Ye = function() {
      ve(mt);
    };
    else if (typeof MessageChannel < "u") {
      var ut = new MessageChannel(), vt = ut.port2;
      ut.port1.onmessage = mt, Ye = function() {
        vt.postMessage(null);
      };
    } else Ye = function() {
      R(mt, 0);
    };
    function $e(L) {
      Z = L, W || (W = !0, Ye());
    }
    function ke(L, H) {
      ce = R(function() {
        L(u.unstable_now());
      }, H);
    }
    u.unstable_IdlePriority = 5, u.unstable_ImmediatePriority = 1, u.unstable_LowPriority = 4, u.unstable_NormalPriority = 3, u.unstable_Profiling = null, u.unstable_UserBlockingPriority = 2, u.unstable_cancelCallback = function(L) {
      L.callback = null;
    }, u.unstable_continueExecution = function() {
      b || J || (b = !0, $e(Oe));
    }, u.unstable_forceFrameRate = function(L) {
      0 > L || 125 < L ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : pe = 0 < L ? Math.floor(1e3 / L) : 5;
    }, u.unstable_getCurrentPriorityLevel = function() {
      return V;
    }, u.unstable_getFirstCallbackNode = function() {
      return i(E);
    }, u.unstable_next = function(L) {
      switch (V) {
        case 1:
        case 2:
        case 3:
          var H = 3;
          break;
        default:
          H = V;
      }
      var I = V;
      V = H;
      try {
        return L();
      } finally {
        V = I;
      }
    }, u.unstable_pauseExecution = function() {
    }, u.unstable_requestPaint = function() {
    }, u.unstable_runWithPriority = function(L, H) {
      switch (L) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          L = 3;
      }
      var I = V;
      V = L;
      try {
        return H();
      } finally {
        V = I;
      }
    }, u.unstable_scheduleCallback = function(L, H, I) {
      var v = u.unstable_now();
      switch (typeof I == "object" && I !== null ? (I = I.delay, I = typeof I == "number" && 0 < I ? v + I : v) : I = v, L) {
        case 1:
          var x = -1;
          break;
        case 2:
          x = 250;
          break;
        case 5:
          x = 1073741823;
          break;
        case 4:
          x = 1e4;
          break;
        default:
          x = 5e3;
      }
      return x = I + x, L = { id: N++, callback: H, priorityLevel: L, startTime: I, expirationTime: x, sortIndex: -1 }, I > v ? (L.sortIndex = I, d(O, L), i(E) === null && L === i(O) && (K ? (X(ce), ce = -1) : K = !0, ke(ue, I - v))) : (L.sortIndex = x, d(E, L), b || J || (b = !0, $e(Oe))), L;
    }, u.unstable_shouldYield = Jt, u.unstable_wrapCallback = function(L) {
      var H = V;
      return function() {
        var I = V;
        V = H;
        try {
          return L.apply(this, arguments);
        } finally {
          V = I;
        }
      };
    };
  })(Bi)), Bi;
}
var qa;
function Rd() {
  return qa || (qa = 1, Vi.exports = Dd()), Vi.exports;
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
var ba;
function Id() {
  if (ba) return Xe;
  ba = 1;
  var u = mc(), d = Rd();
  function i(e) {
    for (var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, n = 1; n < arguments.length; n++) t += "&args[]=" + encodeURIComponent(arguments[n]);
    return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  var a = /* @__PURE__ */ new Set(), c = {};
  function m(e, t) {
    y(e, t), y(e + "Capture", t);
  }
  function y(e, t) {
    for (c[e] = t, e = 0; e < t.length; e++) a.add(t[e]);
  }
  var k = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), E = Object.prototype.hasOwnProperty, O = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, N = {}, U = {};
  function V(e) {
    return E.call(U, e) ? !0 : E.call(N, e) ? !1 : O.test(e) ? U[e] = !0 : (N[e] = !0, !1);
  }
  function J(e, t, n, r) {
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
  function b(e, t, n, r) {
    if (t === null || typeof t > "u" || J(e, t, n, r)) return !0;
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
  function K(e, t, n, r, l, o, s) {
    this.acceptsBooleans = t === 2 || t === 3 || t === 4, this.attributeName = r, this.attributeNamespace = l, this.mustUseProperty = n, this.propertyName = e, this.type = t, this.sanitizeURL = o, this.removeEmptyString = s;
  }
  var R = {};
  "children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e) {
    R[e] = new K(e, 0, !1, e, null, !1, !1);
  }), [["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(e) {
    var t = e[0];
    R[t] = new K(t, 1, !1, e[1], null, !1, !1);
  }), ["contentEditable", "draggable", "spellCheck", "value"].forEach(function(e) {
    R[e] = new K(e, 2, !1, e.toLowerCase(), null, !1, !1);
  }), ["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(e) {
    R[e] = new K(e, 2, !1, e, null, !1, !1);
  }), "allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e) {
    R[e] = new K(e, 3, !1, e.toLowerCase(), null, !1, !1);
  }), ["checked", "multiple", "muted", "selected"].forEach(function(e) {
    R[e] = new K(e, 3, !0, e, null, !1, !1);
  }), ["capture", "download"].forEach(function(e) {
    R[e] = new K(e, 4, !1, e, null, !1, !1);
  }), ["cols", "rows", "size", "span"].forEach(function(e) {
    R[e] = new K(e, 6, !1, e, null, !1, !1);
  }), ["rowSpan", "start"].forEach(function(e) {
    R[e] = new K(e, 5, !1, e.toLowerCase(), null, !1, !1);
  });
  var X = /[\-:]([a-z])/g;
  function ve(e) {
    return e[1].toUpperCase();
  }
  "accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e) {
    var t = e.replace(
      X,
      ve
    );
    R[t] = new K(t, 1, !1, e, null, !1, !1);
  }), "xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e) {
    var t = e.replace(X, ve);
    R[t] = new K(t, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1);
  }), ["xml:base", "xml:lang", "xml:space"].forEach(function(e) {
    var t = e.replace(X, ve);
    R[t] = new K(t, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1, !1);
  }), ["tabIndex", "crossOrigin"].forEach(function(e) {
    R[e] = new K(e, 1, !1, e.toLowerCase(), null, !1, !1);
  }), R.xlinkHref = new K("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0, !1), ["src", "href", "action", "formAction"].forEach(function(e) {
    R[e] = new K(e, 1, !1, e.toLowerCase(), null, !0, !0);
  });
  function re(e, t, n, r) {
    var l = R.hasOwnProperty(t) ? R[t] : null;
    (l !== null ? l.type !== 0 : r || !(2 < t.length) || t[0] !== "o" && t[0] !== "O" || t[1] !== "n" && t[1] !== "N") && (b(t, n, l, r) && (n = null), r || l === null ? V(t) && (n === null ? e.removeAttribute(t) : e.setAttribute(t, "" + n)) : l.mustUseProperty ? e[l.propertyName] = n === null ? l.type === 3 ? !1 : "" : n : (t = l.attributeName, r = l.attributeNamespace, n === null ? e.removeAttribute(t) : (l = l.type, n = l === 3 || l === 4 && n === !0 ? "" : "" + n, r ? e.setAttributeNS(r, t, n) : e.setAttribute(t, n))));
  }
  var ue = u.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, Oe = Symbol.for("react.element"), W = Symbol.for("react.portal"), Z = Symbol.for("react.fragment"), ce = Symbol.for("react.strict_mode"), pe = Symbol.for("react.profiler"), De = Symbol.for("react.provider"), Jt = Symbol.for("react.context"), mt = Symbol.for("react.forward_ref"), Ye = Symbol.for("react.suspense"), ut = Symbol.for("react.suspense_list"), vt = Symbol.for("react.memo"), $e = Symbol.for("react.lazy"), ke = Symbol.for("react.offscreen"), L = Symbol.iterator;
  function H(e) {
    return e === null || typeof e != "object" ? null : (e = L && e[L] || e["@@iterator"], typeof e == "function" ? e : null);
  }
  var I = Object.assign, v;
  function x(e) {
    if (v === void 0) try {
      throw Error();
    } catch (n) {
      var t = n.stack.trim().match(/\n( *(at )?)/);
      v = t && t[1] || "";
    }
    return `
` + v + e;
  }
  var q = !1;
  function te(e, t) {
    if (!e || q) return "";
    q = !0;
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
        } catch (S) {
          var r = S;
        }
        Reflect.construct(e, [], t);
      } else {
        try {
          t.call();
        } catch (S) {
          r = S;
        }
        e.call(t.prototype);
      }
      else {
        try {
          throw Error();
        } catch (S) {
          r = S;
        }
        e();
      }
    } catch (S) {
      if (S && r && typeof S.stack == "string") {
        for (var l = S.stack.split(`
`), o = r.stack.split(`
`), s = l.length - 1, f = o.length - 1; 1 <= s && 0 <= f && l[s] !== o[f]; ) f--;
        for (; 1 <= s && 0 <= f; s--, f--) if (l[s] !== o[f]) {
          if (s !== 1 || f !== 1)
            do
              if (s--, f--, 0 > f || l[s] !== o[f]) {
                var p = `
` + l[s].replace(" at new ", " at ");
                return e.displayName && p.includes("<anonymous>") && (p = p.replace("<anonymous>", e.displayName)), p;
              }
            while (1 <= s && 0 <= f);
          break;
        }
      }
    } finally {
      q = !1, Error.prepareStackTrace = n;
    }
    return (e = e ? e.displayName || e.name : "") ? x(e) : "";
  }
  function le(e) {
    switch (e.tag) {
      case 5:
        return x(e.type);
      case 16:
        return x("Lazy");
      case 13:
        return x("Suspense");
      case 19:
        return x("SuspenseList");
      case 0:
      case 2:
      case 15:
        return e = te(e.type, !1), e;
      case 11:
        return e = te(e.type.render, !1), e;
      case 1:
        return e = te(e.type, !0), e;
      default:
        return "";
    }
  }
  function oe(e) {
    if (e == null) return null;
    if (typeof e == "function") return e.displayName || e.name || null;
    if (typeof e == "string") return e;
    switch (e) {
      case Z:
        return "Fragment";
      case W:
        return "Portal";
      case pe:
        return "Profiler";
      case ce:
        return "StrictMode";
      case Ye:
        return "Suspense";
      case ut:
        return "SuspenseList";
    }
    if (typeof e == "object") switch (e.$$typeof) {
      case Jt:
        return (e.displayName || "Context") + ".Consumer";
      case De:
        return (e._context.displayName || "Context") + ".Provider";
      case mt:
        var t = e.render;
        return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
      case vt:
        return t = e.displayName || null, t !== null ? t : oe(e.type) || "Memo";
      case $e:
        t = e._payload, e = e._init;
        try {
          return oe(e(t));
        } catch {
        }
    }
    return null;
  }
  function fe(e) {
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
        return oe(t);
      case 8:
        return t === ce ? "StrictMode" : "Mode";
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
  function se(e) {
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
  function ge(e) {
    var t = e.type;
    return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
  }
  function Je(e) {
    var t = ge(e) ? "checked" : "value", n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t), r = "" + e[t];
    if (!e.hasOwnProperty(t) && typeof n < "u" && typeof n.get == "function" && typeof n.set == "function") {
      var l = n.get, o = n.set;
      return Object.defineProperty(e, t, { configurable: !0, get: function() {
        return l.call(this);
      }, set: function(s) {
        r = "" + s, o.call(this, s);
      } }), Object.defineProperty(e, t, { enumerable: n.enumerable }), { getValue: function() {
        return r;
      }, setValue: function(s) {
        r = "" + s;
      }, stopTracking: function() {
        e._valueTracker = null, delete e[t];
      } };
    }
  }
  function Lr(e) {
    e._valueTracker || (e._valueTracker = Je(e));
  }
  function tu(e) {
    if (!e) return !1;
    var t = e._valueTracker;
    if (!t) return !0;
    var n = t.getValue(), r = "";
    return e && (r = ge(e) ? e.checked ? "true" : "false" : e.value), e = r, e !== n ? (t.setValue(e), !0) : !1;
  }
  function Mr(e) {
    if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u") return null;
    try {
      return e.activeElement || e.body;
    } catch {
      return e.body;
    }
  }
  function Hl(e, t) {
    var n = t.checked;
    return I({}, t, { defaultChecked: void 0, defaultValue: void 0, value: void 0, checked: n ?? e._wrapperState.initialChecked });
  }
  function nu(e, t) {
    var n = t.defaultValue == null ? "" : t.defaultValue, r = t.checked != null ? t.checked : t.defaultChecked;
    n = se(t.value != null ? t.value : n), e._wrapperState = { initialChecked: r, initialValue: n, controlled: t.type === "checkbox" || t.type === "radio" ? t.checked != null : t.value != null };
  }
  function ru(e, t) {
    t = t.checked, t != null && re(e, "checked", t, !1);
  }
  function Ql(e, t) {
    ru(e, t);
    var n = se(t.value), r = t.type;
    if (n != null) r === "number" ? (n === 0 && e.value === "" || e.value != n) && (e.value = "" + n) : e.value !== "" + n && (e.value = "" + n);
    else if (r === "submit" || r === "reset") {
      e.removeAttribute("value");
      return;
    }
    t.hasOwnProperty("value") ? Kl(e, t.type, n) : t.hasOwnProperty("defaultValue") && Kl(e, t.type, se(t.defaultValue)), t.checked == null && t.defaultChecked != null && (e.defaultChecked = !!t.defaultChecked);
  }
  function lu(e, t, n) {
    if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
      var r = t.type;
      if (!(r !== "submit" && r !== "reset" || t.value !== void 0 && t.value !== null)) return;
      t = "" + e._wrapperState.initialValue, n || t === e.value || (e.value = t), e.defaultValue = t;
    }
    n = e.name, n !== "" && (e.name = ""), e.defaultChecked = !!e._wrapperState.initialChecked, n !== "" && (e.name = n);
  }
  function Kl(e, t, n) {
    (t !== "number" || Mr(e.ownerDocument) !== e) && (n == null ? e.defaultValue = "" + e._wrapperState.initialValue : e.defaultValue !== "" + n && (e.defaultValue = "" + n));
  }
  var jn = Array.isArray;
  function fn(e, t, n, r) {
    if (e = e.options, t) {
      t = {};
      for (var l = 0; l < n.length; l++) t["$" + n[l]] = !0;
      for (n = 0; n < e.length; n++) l = t.hasOwnProperty("$" + e[n].value), e[n].selected !== l && (e[n].selected = l), l && r && (e[n].defaultSelected = !0);
    } else {
      for (n = "" + se(n), t = null, l = 0; l < e.length; l++) {
        if (e[l].value === n) {
          e[l].selected = !0, r && (e[l].defaultSelected = !0);
          return;
        }
        t !== null || e[l].disabled || (t = e[l]);
      }
      t !== null && (t.selected = !0);
    }
  }
  function Gl(e, t) {
    if (t.dangerouslySetInnerHTML != null) throw Error(i(91));
    return I({}, t, { value: void 0, defaultValue: void 0, children: "" + e._wrapperState.initialValue });
  }
  function ou(e, t) {
    var n = t.value;
    if (n == null) {
      if (n = t.children, t = t.defaultValue, n != null) {
        if (t != null) throw Error(i(92));
        if (jn(n)) {
          if (1 < n.length) throw Error(i(93));
          n = n[0];
        }
        t = n;
      }
      t == null && (t = ""), n = t;
    }
    e._wrapperState = { initialValue: se(n) };
  }
  function iu(e, t) {
    var n = se(t.value), r = se(t.defaultValue);
    n != null && (n = "" + n, n !== e.value && (e.value = n), t.defaultValue == null && e.defaultValue !== n && (e.defaultValue = n)), r != null && (e.defaultValue = "" + r);
  }
  function uu(e) {
    var t = e.textContent;
    t === e._wrapperState.initialValue && t !== "" && t !== null && (e.value = t);
  }
  function su(e) {
    switch (e) {
      case "svg":
        return "http://www.w3.org/2000/svg";
      case "math":
        return "http://www.w3.org/1998/Math/MathML";
      default:
        return "http://www.w3.org/1999/xhtml";
    }
  }
  function Xl(e, t) {
    return e == null || e === "http://www.w3.org/1999/xhtml" ? su(t) : e === "http://www.w3.org/2000/svg" && t === "foreignObject" ? "http://www.w3.org/1999/xhtml" : e;
  }
  var Or, au = (function(e) {
    return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction ? function(t, n, r, l) {
      MSApp.execUnsafeLocalFunction(function() {
        return e(t, n, r, l);
      });
    } : e;
  })(function(e, t) {
    if (e.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in e) e.innerHTML = t;
    else {
      for (Or = Or || document.createElement("div"), Or.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>", t = Or.firstChild; e.firstChild; ) e.removeChild(e.firstChild);
      for (; t.firstChild; ) e.appendChild(t.firstChild);
    }
  });
  function Vn(e, t) {
    if (t) {
      var n = e.firstChild;
      if (n && n === e.lastChild && n.nodeType === 3) {
        n.nodeValue = t;
        return;
      }
    }
    e.textContent = t;
  }
  var Bn = {
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
  }, Oc = ["Webkit", "ms", "Moz", "O"];
  Object.keys(Bn).forEach(function(e) {
    Oc.forEach(function(t) {
      t = t + e.charAt(0).toUpperCase() + e.substring(1), Bn[t] = Bn[e];
    });
  });
  function cu(e, t, n) {
    return t == null || typeof t == "boolean" || t === "" ? "" : n || typeof t != "number" || t === 0 || Bn.hasOwnProperty(e) && Bn[e] ? ("" + t).trim() : t + "px";
  }
  function fu(e, t) {
    e = e.style;
    for (var n in t) if (t.hasOwnProperty(n)) {
      var r = n.indexOf("--") === 0, l = cu(n, t[n], r);
      n === "float" && (n = "cssFloat"), r ? e.setProperty(n, l) : e[n] = l;
    }
  }
  var Dc = I({ menuitem: !0 }, { area: !0, base: !0, br: !0, col: !0, embed: !0, hr: !0, img: !0, input: !0, keygen: !0, link: !0, meta: !0, param: !0, source: !0, track: !0, wbr: !0 });
  function Yl(e, t) {
    if (t) {
      if (Dc[e] && (t.children != null || t.dangerouslySetInnerHTML != null)) throw Error(i(137, e));
      if (t.dangerouslySetInnerHTML != null) {
        if (t.children != null) throw Error(i(60));
        if (typeof t.dangerouslySetInnerHTML != "object" || !("__html" in t.dangerouslySetInnerHTML)) throw Error(i(61));
      }
      if (t.style != null && typeof t.style != "object") throw Error(i(62));
    }
  }
  function Jl(e, t) {
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
  var Zl = null;
  function ql(e) {
    return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
  }
  var bl = null, dn = null, pn = null;
  function du(e) {
    if (e = ar(e)) {
      if (typeof bl != "function") throw Error(i(280));
      var t = e.stateNode;
      t && (t = el(t), bl(e.stateNode, e.type, t));
    }
  }
  function pu(e) {
    dn ? pn ? pn.push(e) : pn = [e] : dn = e;
  }
  function hu() {
    if (dn) {
      var e = dn, t = pn;
      if (pn = dn = null, du(e), t) for (e = 0; e < t.length; e++) du(t[e]);
    }
  }
  function mu(e, t) {
    return e(t);
  }
  function vu() {
  }
  var eo = !1;
  function gu(e, t, n) {
    if (eo) return e(t, n);
    eo = !0;
    try {
      return mu(e, t, n);
    } finally {
      eo = !1, (dn !== null || pn !== null) && (vu(), hu());
    }
  }
  function $n(e, t) {
    var n = e.stateNode;
    if (n === null) return null;
    var r = el(n);
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
    if (n && typeof n != "function") throw Error(i(231, t, typeof n));
    return n;
  }
  var to = !1;
  if (k) try {
    var Wn = {};
    Object.defineProperty(Wn, "passive", { get: function() {
      to = !0;
    } }), window.addEventListener("test", Wn, Wn), window.removeEventListener("test", Wn, Wn);
  } catch {
    to = !1;
  }
  function Rc(e, t, n, r, l, o, s, f, p) {
    var S = Array.prototype.slice.call(arguments, 3);
    try {
      t.apply(n, S);
    } catch (P) {
      this.onError(P);
    }
  }
  var Hn = !1, Dr = null, Rr = !1, no = null, Ic = { onError: function(e) {
    Hn = !0, Dr = e;
  } };
  function zc(e, t, n, r, l, o, s, f, p) {
    Hn = !1, Dr = null, Rc.apply(Ic, arguments);
  }
  function Ac(e, t, n, r, l, o, s, f, p) {
    if (zc.apply(this, arguments), Hn) {
      if (Hn) {
        var S = Dr;
        Hn = !1, Dr = null;
      } else throw Error(i(198));
      Rr || (Rr = !0, no = S);
    }
  }
  function Zt(e) {
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
  function yu(e) {
    if (e.tag === 13) {
      var t = e.memoizedState;
      if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
    }
    return null;
  }
  function wu(e) {
    if (Zt(e) !== e) throw Error(i(188));
  }
  function Fc(e) {
    var t = e.alternate;
    if (!t) {
      if (t = Zt(e), t === null) throw Error(i(188));
      return t !== e ? null : e;
    }
    for (var n = e, r = t; ; ) {
      var l = n.return;
      if (l === null) break;
      var o = l.alternate;
      if (o === null) {
        if (r = l.return, r !== null) {
          n = r;
          continue;
        }
        break;
      }
      if (l.child === o.child) {
        for (o = l.child; o; ) {
          if (o === n) return wu(l), e;
          if (o === r) return wu(l), t;
          o = o.sibling;
        }
        throw Error(i(188));
      }
      if (n.return !== r.return) n = l, r = o;
      else {
        for (var s = !1, f = l.child; f; ) {
          if (f === n) {
            s = !0, n = l, r = o;
            break;
          }
          if (f === r) {
            s = !0, r = l, n = o;
            break;
          }
          f = f.sibling;
        }
        if (!s) {
          for (f = o.child; f; ) {
            if (f === n) {
              s = !0, n = o, r = l;
              break;
            }
            if (f === r) {
              s = !0, r = o, n = l;
              break;
            }
            f = f.sibling;
          }
          if (!s) throw Error(i(189));
        }
      }
      if (n.alternate !== r) throw Error(i(190));
    }
    if (n.tag !== 3) throw Error(i(188));
    return n.stateNode.current === n ? e : t;
  }
  function Su(e) {
    return e = Fc(e), e !== null ? ku(e) : null;
  }
  function ku(e) {
    if (e.tag === 5 || e.tag === 6) return e;
    for (e = e.child; e !== null; ) {
      var t = ku(e);
      if (t !== null) return t;
      e = e.sibling;
    }
    return null;
  }
  var Eu = d.unstable_scheduleCallback, Cu = d.unstable_cancelCallback, Uc = d.unstable_shouldYield, jc = d.unstable_requestPaint, Ce = d.unstable_now, Vc = d.unstable_getCurrentPriorityLevel, ro = d.unstable_ImmediatePriority, xu = d.unstable_UserBlockingPriority, Ir = d.unstable_NormalPriority, Bc = d.unstable_LowPriority, Pu = d.unstable_IdlePriority, zr = null, gt = null;
  function $c(e) {
    if (gt && typeof gt.onCommitFiberRoot == "function") try {
      gt.onCommitFiberRoot(zr, e, void 0, (e.current.flags & 128) === 128);
    } catch {
    }
  }
  var st = Math.clz32 ? Math.clz32 : Qc, Wc = Math.log, Hc = Math.LN2;
  function Qc(e) {
    return e >>>= 0, e === 0 ? 32 : 31 - (Wc(e) / Hc | 0) | 0;
  }
  var Ar = 64, Fr = 4194304;
  function Qn(e) {
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
  function Ur(e, t) {
    var n = e.pendingLanes;
    if (n === 0) return 0;
    var r = 0, l = e.suspendedLanes, o = e.pingedLanes, s = n & 268435455;
    if (s !== 0) {
      var f = s & ~l;
      f !== 0 ? r = Qn(f) : (o &= s, o !== 0 && (r = Qn(o)));
    } else s = n & ~l, s !== 0 ? r = Qn(s) : o !== 0 && (r = Qn(o));
    if (r === 0) return 0;
    if (t !== 0 && t !== r && (t & l) === 0 && (l = r & -r, o = t & -t, l >= o || l === 16 && (o & 4194240) !== 0)) return t;
    if ((r & 4) !== 0 && (r |= n & 16), t = e.entangledLanes, t !== 0) for (e = e.entanglements, t &= r; 0 < t; ) n = 31 - st(t), l = 1 << n, r |= e[n], t &= ~l;
    return r;
  }
  function Kc(e, t) {
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
  function Gc(e, t) {
    for (var n = e.suspendedLanes, r = e.pingedLanes, l = e.expirationTimes, o = e.pendingLanes; 0 < o; ) {
      var s = 31 - st(o), f = 1 << s, p = l[s];
      p === -1 ? ((f & n) === 0 || (f & r) !== 0) && (l[s] = Kc(f, t)) : p <= t && (e.expiredLanes |= f), o &= ~f;
    }
  }
  function lo(e) {
    return e = e.pendingLanes & -1073741825, e !== 0 ? e : e & 1073741824 ? 1073741824 : 0;
  }
  function Tu() {
    var e = Ar;
    return Ar <<= 1, (Ar & 4194240) === 0 && (Ar = 64), e;
  }
  function oo(e) {
    for (var t = [], n = 0; 31 > n; n++) t.push(e);
    return t;
  }
  function Kn(e, t, n) {
    e.pendingLanes |= t, t !== 536870912 && (e.suspendedLanes = 0, e.pingedLanes = 0), e = e.eventTimes, t = 31 - st(t), e[t] = n;
  }
  function Xc(e, t) {
    var n = e.pendingLanes & ~t;
    e.pendingLanes = t, e.suspendedLanes = 0, e.pingedLanes = 0, e.expiredLanes &= t, e.mutableReadLanes &= t, e.entangledLanes &= t, t = e.entanglements;
    var r = e.eventTimes;
    for (e = e.expirationTimes; 0 < n; ) {
      var l = 31 - st(n), o = 1 << l;
      t[l] = 0, r[l] = -1, e[l] = -1, n &= ~o;
    }
  }
  function io(e, t) {
    var n = e.entangledLanes |= t;
    for (e = e.entanglements; n; ) {
      var r = 31 - st(n), l = 1 << r;
      l & t | e[r] & t && (e[r] |= t), n &= ~l;
    }
  }
  var ae = 0;
  function _u(e) {
    return e &= -e, 1 < e ? 4 < e ? (e & 268435455) !== 0 ? 16 : 536870912 : 4 : 1;
  }
  var Nu, uo, Lu, Mu, Ou, so = !1, jr = [], Ot = null, Dt = null, Rt = null, Gn = /* @__PURE__ */ new Map(), Xn = /* @__PURE__ */ new Map(), It = [], Yc = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
  function Du(e, t) {
    switch (e) {
      case "focusin":
      case "focusout":
        Ot = null;
        break;
      case "dragenter":
      case "dragleave":
        Dt = null;
        break;
      case "mouseover":
      case "mouseout":
        Rt = null;
        break;
      case "pointerover":
      case "pointerout":
        Gn.delete(t.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        Xn.delete(t.pointerId);
    }
  }
  function Yn(e, t, n, r, l, o) {
    return e === null || e.nativeEvent !== o ? (e = { blockedOn: t, domEventName: n, eventSystemFlags: r, nativeEvent: o, targetContainers: [l] }, t !== null && (t = ar(t), t !== null && uo(t)), e) : (e.eventSystemFlags |= r, t = e.targetContainers, l !== null && t.indexOf(l) === -1 && t.push(l), e);
  }
  function Jc(e, t, n, r, l) {
    switch (t) {
      case "focusin":
        return Ot = Yn(Ot, e, t, n, r, l), !0;
      case "dragenter":
        return Dt = Yn(Dt, e, t, n, r, l), !0;
      case "mouseover":
        return Rt = Yn(Rt, e, t, n, r, l), !0;
      case "pointerover":
        var o = l.pointerId;
        return Gn.set(o, Yn(Gn.get(o) || null, e, t, n, r, l)), !0;
      case "gotpointercapture":
        return o = l.pointerId, Xn.set(o, Yn(Xn.get(o) || null, e, t, n, r, l)), !0;
    }
    return !1;
  }
  function Ru(e) {
    var t = qt(e.target);
    if (t !== null) {
      var n = Zt(t);
      if (n !== null) {
        if (t = n.tag, t === 13) {
          if (t = yu(n), t !== null) {
            e.blockedOn = t, Ou(e.priority, function() {
              Lu(n);
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
  function Vr(e) {
    if (e.blockedOn !== null) return !1;
    for (var t = e.targetContainers; 0 < t.length; ) {
      var n = co(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
      if (n === null) {
        n = e.nativeEvent;
        var r = new n.constructor(n.type, n);
        Zl = r, n.target.dispatchEvent(r), Zl = null;
      } else return t = ar(n), t !== null && uo(t), e.blockedOn = n, !1;
      t.shift();
    }
    return !0;
  }
  function Iu(e, t, n) {
    Vr(e) && n.delete(t);
  }
  function Zc() {
    so = !1, Ot !== null && Vr(Ot) && (Ot = null), Dt !== null && Vr(Dt) && (Dt = null), Rt !== null && Vr(Rt) && (Rt = null), Gn.forEach(Iu), Xn.forEach(Iu);
  }
  function Jn(e, t) {
    e.blockedOn === t && (e.blockedOn = null, so || (so = !0, d.unstable_scheduleCallback(d.unstable_NormalPriority, Zc)));
  }
  function Zn(e) {
    function t(l) {
      return Jn(l, e);
    }
    if (0 < jr.length) {
      Jn(jr[0], e);
      for (var n = 1; n < jr.length; n++) {
        var r = jr[n];
        r.blockedOn === e && (r.blockedOn = null);
      }
    }
    for (Ot !== null && Jn(Ot, e), Dt !== null && Jn(Dt, e), Rt !== null && Jn(Rt, e), Gn.forEach(t), Xn.forEach(t), n = 0; n < It.length; n++) r = It[n], r.blockedOn === e && (r.blockedOn = null);
    for (; 0 < It.length && (n = It[0], n.blockedOn === null); ) Ru(n), n.blockedOn === null && It.shift();
  }
  var hn = ue.ReactCurrentBatchConfig, Br = !0;
  function qc(e, t, n, r) {
    var l = ae, o = hn.transition;
    hn.transition = null;
    try {
      ae = 1, ao(e, t, n, r);
    } finally {
      ae = l, hn.transition = o;
    }
  }
  function bc(e, t, n, r) {
    var l = ae, o = hn.transition;
    hn.transition = null;
    try {
      ae = 4, ao(e, t, n, r);
    } finally {
      ae = l, hn.transition = o;
    }
  }
  function ao(e, t, n, r) {
    if (Br) {
      var l = co(e, t, n, r);
      if (l === null) No(e, t, r, $r, n), Du(e, r);
      else if (Jc(l, e, t, n, r)) r.stopPropagation();
      else if (Du(e, r), t & 4 && -1 < Yc.indexOf(e)) {
        for (; l !== null; ) {
          var o = ar(l);
          if (o !== null && Nu(o), o = co(e, t, n, r), o === null && No(e, t, r, $r, n), o === l) break;
          l = o;
        }
        l !== null && r.stopPropagation();
      } else No(e, t, r, null, n);
    }
  }
  var $r = null;
  function co(e, t, n, r) {
    if ($r = null, e = ql(r), e = qt(e), e !== null) if (t = Zt(e), t === null) e = null;
    else if (n = t.tag, n === 13) {
      if (e = yu(t), e !== null) return e;
      e = null;
    } else if (n === 3) {
      if (t.stateNode.current.memoizedState.isDehydrated) return t.tag === 3 ? t.stateNode.containerInfo : null;
      e = null;
    } else t !== e && (e = null);
    return $r = e, null;
  }
  function zu(e) {
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
        switch (Vc()) {
          case ro:
            return 1;
          case xu:
            return 4;
          case Ir:
          case Bc:
            return 16;
          case Pu:
            return 536870912;
          default:
            return 16;
        }
      default:
        return 16;
    }
  }
  var zt = null, fo = null, Wr = null;
  function Au() {
    if (Wr) return Wr;
    var e, t = fo, n = t.length, r, l = "value" in zt ? zt.value : zt.textContent, o = l.length;
    for (e = 0; e < n && t[e] === l[e]; e++) ;
    var s = n - e;
    for (r = 1; r <= s && t[n - r] === l[o - r]; r++) ;
    return Wr = l.slice(e, 1 < r ? 1 - r : void 0);
  }
  function Hr(e) {
    var t = e.keyCode;
    return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
  }
  function Qr() {
    return !0;
  }
  function Fu() {
    return !1;
  }
  function Ze(e) {
    function t(n, r, l, o, s) {
      this._reactName = n, this._targetInst = l, this.type = r, this.nativeEvent = o, this.target = s, this.currentTarget = null;
      for (var f in e) e.hasOwnProperty(f) && (n = e[f], this[f] = n ? n(o) : o[f]);
      return this.isDefaultPrevented = (o.defaultPrevented != null ? o.defaultPrevented : o.returnValue === !1) ? Qr : Fu, this.isPropagationStopped = Fu, this;
    }
    return I(t.prototype, { preventDefault: function() {
      this.defaultPrevented = !0;
      var n = this.nativeEvent;
      n && (n.preventDefault ? n.preventDefault() : typeof n.returnValue != "unknown" && (n.returnValue = !1), this.isDefaultPrevented = Qr);
    }, stopPropagation: function() {
      var n = this.nativeEvent;
      n && (n.stopPropagation ? n.stopPropagation() : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0), this.isPropagationStopped = Qr);
    }, persist: function() {
    }, isPersistent: Qr }), t;
  }
  var mn = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(e) {
    return e.timeStamp || Date.now();
  }, defaultPrevented: 0, isTrusted: 0 }, po = Ze(mn), qn = I({}, mn, { view: 0, detail: 0 }), ef = Ze(qn), ho, mo, bn, Kr = I({}, qn, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: go, button: 0, buttons: 0, relatedTarget: function(e) {
    return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
  }, movementX: function(e) {
    return "movementX" in e ? e.movementX : (e !== bn && (bn && e.type === "mousemove" ? (ho = e.screenX - bn.screenX, mo = e.screenY - bn.screenY) : mo = ho = 0, bn = e), ho);
  }, movementY: function(e) {
    return "movementY" in e ? e.movementY : mo;
  } }), Uu = Ze(Kr), tf = I({}, Kr, { dataTransfer: 0 }), nf = Ze(tf), rf = I({}, qn, { relatedTarget: 0 }), vo = Ze(rf), lf = I({}, mn, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }), of = Ze(lf), uf = I({}, mn, { clipboardData: function(e) {
    return "clipboardData" in e ? e.clipboardData : window.clipboardData;
  } }), sf = Ze(uf), af = I({}, mn, { data: 0 }), ju = Ze(af), cf = {
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
  }, ff = {
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
  }, df = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
  function pf(e) {
    var t = this.nativeEvent;
    return t.getModifierState ? t.getModifierState(e) : (e = df[e]) ? !!t[e] : !1;
  }
  function go() {
    return pf;
  }
  var hf = I({}, qn, { key: function(e) {
    if (e.key) {
      var t = cf[e.key] || e.key;
      if (t !== "Unidentified") return t;
    }
    return e.type === "keypress" ? (e = Hr(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? ff[e.keyCode] || "Unidentified" : "";
  }, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: go, charCode: function(e) {
    return e.type === "keypress" ? Hr(e) : 0;
  }, keyCode: function(e) {
    return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
  }, which: function(e) {
    return e.type === "keypress" ? Hr(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
  } }), mf = Ze(hf), vf = I({}, Kr, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), Vu = Ze(vf), gf = I({}, qn, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: go }), yf = Ze(gf), wf = I({}, mn, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }), Sf = Ze(wf), kf = I({}, Kr, {
    deltaX: function(e) {
      return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
    },
    deltaY: function(e) {
      return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), Ef = Ze(kf), Cf = [9, 13, 27, 32], yo = k && "CompositionEvent" in window, er = null;
  k && "documentMode" in document && (er = document.documentMode);
  var xf = k && "TextEvent" in window && !er, Bu = k && (!yo || er && 8 < er && 11 >= er), $u = " ", Wu = !1;
  function Hu(e, t) {
    switch (e) {
      case "keyup":
        return Cf.indexOf(t.keyCode) !== -1;
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
  function Qu(e) {
    return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
  }
  var vn = !1;
  function Pf(e, t) {
    switch (e) {
      case "compositionend":
        return Qu(t);
      case "keypress":
        return t.which !== 32 ? null : (Wu = !0, $u);
      case "textInput":
        return e = t.data, e === $u && Wu ? null : e;
      default:
        return null;
    }
  }
  function Tf(e, t) {
    if (vn) return e === "compositionend" || !yo && Hu(e, t) ? (e = Au(), Wr = fo = zt = null, vn = !1, e) : null;
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
        return Bu && t.locale !== "ko" ? null : t.data;
      default:
        return null;
    }
  }
  var _f = { color: !0, date: !0, datetime: !0, "datetime-local": !0, email: !0, month: !0, number: !0, password: !0, range: !0, search: !0, tel: !0, text: !0, time: !0, url: !0, week: !0 };
  function Ku(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t === "input" ? !!_f[e.type] : t === "textarea";
  }
  function Gu(e, t, n, r) {
    pu(r), t = Zr(t, "onChange"), 0 < t.length && (n = new po("onChange", "change", null, n, r), e.push({ event: n, listeners: t }));
  }
  var tr = null, nr = null;
  function Nf(e) {
    fs(e, 0);
  }
  function Gr(e) {
    var t = kn(e);
    if (tu(t)) return e;
  }
  function Lf(e, t) {
    if (e === "change") return t;
  }
  var Xu = !1;
  if (k) {
    var wo;
    if (k) {
      var So = "oninput" in document;
      if (!So) {
        var Yu = document.createElement("div");
        Yu.setAttribute("oninput", "return;"), So = typeof Yu.oninput == "function";
      }
      wo = So;
    } else wo = !1;
    Xu = wo && (!document.documentMode || 9 < document.documentMode);
  }
  function Ju() {
    tr && (tr.detachEvent("onpropertychange", Zu), nr = tr = null);
  }
  function Zu(e) {
    if (e.propertyName === "value" && Gr(nr)) {
      var t = [];
      Gu(t, nr, e, ql(e)), gu(Nf, t);
    }
  }
  function Mf(e, t, n) {
    e === "focusin" ? (Ju(), tr = t, nr = n, tr.attachEvent("onpropertychange", Zu)) : e === "focusout" && Ju();
  }
  function Of(e) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown") return Gr(nr);
  }
  function Df(e, t) {
    if (e === "click") return Gr(t);
  }
  function Rf(e, t) {
    if (e === "input" || e === "change") return Gr(t);
  }
  function If(e, t) {
    return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
  }
  var at = typeof Object.is == "function" ? Object.is : If;
  function rr(e, t) {
    if (at(e, t)) return !0;
    if (typeof e != "object" || e === null || typeof t != "object" || t === null) return !1;
    var n = Object.keys(e), r = Object.keys(t);
    if (n.length !== r.length) return !1;
    for (r = 0; r < n.length; r++) {
      var l = n[r];
      if (!E.call(t, l) || !at(e[l], t[l])) return !1;
    }
    return !0;
  }
  function qu(e) {
    for (; e && e.firstChild; ) e = e.firstChild;
    return e;
  }
  function bu(e, t) {
    var n = qu(e);
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
      n = qu(n);
    }
  }
  function es(e, t) {
    return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? es(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
  }
  function ts() {
    for (var e = window, t = Mr(); t instanceof e.HTMLIFrameElement; ) {
      try {
        var n = typeof t.contentWindow.location.href == "string";
      } catch {
        n = !1;
      }
      if (n) e = t.contentWindow;
      else break;
      t = Mr(e.document);
    }
    return t;
  }
  function ko(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
  }
  function zf(e) {
    var t = ts(), n = e.focusedElem, r = e.selectionRange;
    if (t !== n && n && n.ownerDocument && es(n.ownerDocument.documentElement, n)) {
      if (r !== null && ko(n)) {
        if (t = r.start, e = r.end, e === void 0 && (e = t), "selectionStart" in n) n.selectionStart = t, n.selectionEnd = Math.min(e, n.value.length);
        else if (e = (t = n.ownerDocument || document) && t.defaultView || window, e.getSelection) {
          e = e.getSelection();
          var l = n.textContent.length, o = Math.min(r.start, l);
          r = r.end === void 0 ? o : Math.min(r.end, l), !e.extend && o > r && (l = r, r = o, o = l), l = bu(n, o);
          var s = bu(
            n,
            r
          );
          l && s && (e.rangeCount !== 1 || e.anchorNode !== l.node || e.anchorOffset !== l.offset || e.focusNode !== s.node || e.focusOffset !== s.offset) && (t = t.createRange(), t.setStart(l.node, l.offset), e.removeAllRanges(), o > r ? (e.addRange(t), e.extend(s.node, s.offset)) : (t.setEnd(s.node, s.offset), e.addRange(t)));
        }
      }
      for (t = [], e = n; e = e.parentNode; ) e.nodeType === 1 && t.push({ element: e, left: e.scrollLeft, top: e.scrollTop });
      for (typeof n.focus == "function" && n.focus(), n = 0; n < t.length; n++) e = t[n], e.element.scrollLeft = e.left, e.element.scrollTop = e.top;
    }
  }
  var Af = k && "documentMode" in document && 11 >= document.documentMode, gn = null, Eo = null, lr = null, Co = !1;
  function ns(e, t, n) {
    var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
    Co || gn == null || gn !== Mr(r) || (r = gn, "selectionStart" in r && ko(r) ? r = { start: r.selectionStart, end: r.selectionEnd } : (r = (r.ownerDocument && r.ownerDocument.defaultView || window).getSelection(), r = { anchorNode: r.anchorNode, anchorOffset: r.anchorOffset, focusNode: r.focusNode, focusOffset: r.focusOffset }), lr && rr(lr, r) || (lr = r, r = Zr(Eo, "onSelect"), 0 < r.length && (t = new po("onSelect", "select", null, t, n), e.push({ event: t, listeners: r }), t.target = gn)));
  }
  function Xr(e, t) {
    var n = {};
    return n[e.toLowerCase()] = t.toLowerCase(), n["Webkit" + e] = "webkit" + t, n["Moz" + e] = "moz" + t, n;
  }
  var yn = { animationend: Xr("Animation", "AnimationEnd"), animationiteration: Xr("Animation", "AnimationIteration"), animationstart: Xr("Animation", "AnimationStart"), transitionend: Xr("Transition", "TransitionEnd") }, xo = {}, rs = {};
  k && (rs = document.createElement("div").style, "AnimationEvent" in window || (delete yn.animationend.animation, delete yn.animationiteration.animation, delete yn.animationstart.animation), "TransitionEvent" in window || delete yn.transitionend.transition);
  function Yr(e) {
    if (xo[e]) return xo[e];
    if (!yn[e]) return e;
    var t = yn[e], n;
    for (n in t) if (t.hasOwnProperty(n) && n in rs) return xo[e] = t[n];
    return e;
  }
  var ls = Yr("animationend"), os = Yr("animationiteration"), is = Yr("animationstart"), us = Yr("transitionend"), ss = /* @__PURE__ */ new Map(), as = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
  function At(e, t) {
    ss.set(e, t), m(t, [e]);
  }
  for (var Po = 0; Po < as.length; Po++) {
    var To = as[Po], Ff = To.toLowerCase(), Uf = To[0].toUpperCase() + To.slice(1);
    At(Ff, "on" + Uf);
  }
  At(ls, "onAnimationEnd"), At(os, "onAnimationIteration"), At(is, "onAnimationStart"), At("dblclick", "onDoubleClick"), At("focusin", "onFocus"), At("focusout", "onBlur"), At(us, "onTransitionEnd"), y("onMouseEnter", ["mouseout", "mouseover"]), y("onMouseLeave", ["mouseout", "mouseover"]), y("onPointerEnter", ["pointerout", "pointerover"]), y("onPointerLeave", ["pointerout", "pointerover"]), m("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" ")), m("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")), m("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]), m("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" ")), m("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" ")), m("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
  var or = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), jf = new Set("cancel close invalid load scroll toggle".split(" ").concat(or));
  function cs(e, t, n) {
    var r = e.type || "unknown-event";
    e.currentTarget = n, Ac(r, t, void 0, e), e.currentTarget = null;
  }
  function fs(e, t) {
    t = (t & 4) !== 0;
    for (var n = 0; n < e.length; n++) {
      var r = e[n], l = r.event;
      r = r.listeners;
      e: {
        var o = void 0;
        if (t) for (var s = r.length - 1; 0 <= s; s--) {
          var f = r[s], p = f.instance, S = f.currentTarget;
          if (f = f.listener, p !== o && l.isPropagationStopped()) break e;
          cs(l, f, S), o = p;
        }
        else for (s = 0; s < r.length; s++) {
          if (f = r[s], p = f.instance, S = f.currentTarget, f = f.listener, p !== o && l.isPropagationStopped()) break e;
          cs(l, f, S), o = p;
        }
      }
    }
    if (Rr) throw e = no, Rr = !1, no = null, e;
  }
  function he(e, t) {
    var n = t[Io];
    n === void 0 && (n = t[Io] = /* @__PURE__ */ new Set());
    var r = e + "__bubble";
    n.has(r) || (ds(t, e, 2, !1), n.add(r));
  }
  function _o(e, t, n) {
    var r = 0;
    t && (r |= 4), ds(n, e, r, t);
  }
  var Jr = "_reactListening" + Math.random().toString(36).slice(2);
  function ir(e) {
    if (!e[Jr]) {
      e[Jr] = !0, a.forEach(function(n) {
        n !== "selectionchange" && (jf.has(n) || _o(n, !1, e), _o(n, !0, e));
      });
      var t = e.nodeType === 9 ? e : e.ownerDocument;
      t === null || t[Jr] || (t[Jr] = !0, _o("selectionchange", !1, t));
    }
  }
  function ds(e, t, n, r) {
    switch (zu(t)) {
      case 1:
        var l = qc;
        break;
      case 4:
        l = bc;
        break;
      default:
        l = ao;
    }
    n = l.bind(null, t, n, e), l = void 0, !to || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (l = !0), r ? l !== void 0 ? e.addEventListener(t, n, { capture: !0, passive: l }) : e.addEventListener(t, n, !0) : l !== void 0 ? e.addEventListener(t, n, { passive: l }) : e.addEventListener(t, n, !1);
  }
  function No(e, t, n, r, l) {
    var o = r;
    if ((t & 1) === 0 && (t & 2) === 0 && r !== null) e: for (; ; ) {
      if (r === null) return;
      var s = r.tag;
      if (s === 3 || s === 4) {
        var f = r.stateNode.containerInfo;
        if (f === l || f.nodeType === 8 && f.parentNode === l) break;
        if (s === 4) for (s = r.return; s !== null; ) {
          var p = s.tag;
          if ((p === 3 || p === 4) && (p = s.stateNode.containerInfo, p === l || p.nodeType === 8 && p.parentNode === l)) return;
          s = s.return;
        }
        for (; f !== null; ) {
          if (s = qt(f), s === null) return;
          if (p = s.tag, p === 5 || p === 6) {
            r = o = s;
            continue e;
          }
          f = f.parentNode;
        }
      }
      r = r.return;
    }
    gu(function() {
      var S = o, P = ql(n), T = [];
      e: {
        var C = ss.get(e);
        if (C !== void 0) {
          var M = po, z = e;
          switch (e) {
            case "keypress":
              if (Hr(n) === 0) break e;
            case "keydown":
            case "keyup":
              M = mf;
              break;
            case "focusin":
              z = "focus", M = vo;
              break;
            case "focusout":
              z = "blur", M = vo;
              break;
            case "beforeblur":
            case "afterblur":
              M = vo;
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
              M = Uu;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              M = nf;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              M = yf;
              break;
            case ls:
            case os:
            case is:
              M = of;
              break;
            case us:
              M = Sf;
              break;
            case "scroll":
              M = ef;
              break;
            case "wheel":
              M = Ef;
              break;
            case "copy":
            case "cut":
            case "paste":
              M = sf;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              M = Vu;
          }
          var A = (t & 4) !== 0, xe = !A && e === "scroll", g = A ? C !== null ? C + "Capture" : null : C;
          A = [];
          for (var h = S, w; h !== null; ) {
            w = h;
            var _ = w.stateNode;
            if (w.tag === 5 && _ !== null && (w = _, g !== null && (_ = $n(h, g), _ != null && A.push(ur(h, _, w)))), xe) break;
            h = h.return;
          }
          0 < A.length && (C = new M(C, z, null, n, P), T.push({ event: C, listeners: A }));
        }
      }
      if ((t & 7) === 0) {
        e: {
          if (C = e === "mouseover" || e === "pointerover", M = e === "mouseout" || e === "pointerout", C && n !== Zl && (z = n.relatedTarget || n.fromElement) && (qt(z) || z[Ct])) break e;
          if ((M || C) && (C = P.window === P ? P : (C = P.ownerDocument) ? C.defaultView || C.parentWindow : window, M ? (z = n.relatedTarget || n.toElement, M = S, z = z ? qt(z) : null, z !== null && (xe = Zt(z), z !== xe || z.tag !== 5 && z.tag !== 6) && (z = null)) : (M = null, z = S), M !== z)) {
            if (A = Uu, _ = "onMouseLeave", g = "onMouseEnter", h = "mouse", (e === "pointerout" || e === "pointerover") && (A = Vu, _ = "onPointerLeave", g = "onPointerEnter", h = "pointer"), xe = M == null ? C : kn(M), w = z == null ? C : kn(z), C = new A(_, h + "leave", M, n, P), C.target = xe, C.relatedTarget = w, _ = null, qt(P) === S && (A = new A(g, h + "enter", z, n, P), A.target = w, A.relatedTarget = xe, _ = A), xe = _, M && z) t: {
              for (A = M, g = z, h = 0, w = A; w; w = wn(w)) h++;
              for (w = 0, _ = g; _; _ = wn(_)) w++;
              for (; 0 < h - w; ) A = wn(A), h--;
              for (; 0 < w - h; ) g = wn(g), w--;
              for (; h--; ) {
                if (A === g || g !== null && A === g.alternate) break t;
                A = wn(A), g = wn(g);
              }
              A = null;
            }
            else A = null;
            M !== null && ps(T, C, M, A, !1), z !== null && xe !== null && ps(T, xe, z, A, !0);
          }
        }
        e: {
          if (C = S ? kn(S) : window, M = C.nodeName && C.nodeName.toLowerCase(), M === "select" || M === "input" && C.type === "file") var F = Lf;
          else if (Ku(C)) if (Xu) F = Rf;
          else {
            F = Of;
            var B = Mf;
          }
          else (M = C.nodeName) && M.toLowerCase() === "input" && (C.type === "checkbox" || C.type === "radio") && (F = Df);
          if (F && (F = F(e, S))) {
            Gu(T, F, n, P);
            break e;
          }
          B && B(e, C, S), e === "focusout" && (B = C._wrapperState) && B.controlled && C.type === "number" && Kl(C, "number", C.value);
        }
        switch (B = S ? kn(S) : window, e) {
          case "focusin":
            (Ku(B) || B.contentEditable === "true") && (gn = B, Eo = S, lr = null);
            break;
          case "focusout":
            lr = Eo = gn = null;
            break;
          case "mousedown":
            Co = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            Co = !1, ns(T, n, P);
            break;
          case "selectionchange":
            if (Af) break;
          case "keydown":
          case "keyup":
            ns(T, n, P);
        }
        var $;
        if (yo) e: {
          switch (e) {
            case "compositionstart":
              var Q = "onCompositionStart";
              break e;
            case "compositionend":
              Q = "onCompositionEnd";
              break e;
            case "compositionupdate":
              Q = "onCompositionUpdate";
              break e;
          }
          Q = void 0;
        }
        else vn ? Hu(e, n) && (Q = "onCompositionEnd") : e === "keydown" && n.keyCode === 229 && (Q = "onCompositionStart");
        Q && (Bu && n.locale !== "ko" && (vn || Q !== "onCompositionStart" ? Q === "onCompositionEnd" && vn && ($ = Au()) : (zt = P, fo = "value" in zt ? zt.value : zt.textContent, vn = !0)), B = Zr(S, Q), 0 < B.length && (Q = new ju(Q, e, null, n, P), T.push({ event: Q, listeners: B }), $ ? Q.data = $ : ($ = Qu(n), $ !== null && (Q.data = $)))), ($ = xf ? Pf(e, n) : Tf(e, n)) && (S = Zr(S, "onBeforeInput"), 0 < S.length && (P = new ju("onBeforeInput", "beforeinput", null, n, P), T.push({ event: P, listeners: S }), P.data = $));
      }
      fs(T, t);
    });
  }
  function ur(e, t, n) {
    return { instance: e, listener: t, currentTarget: n };
  }
  function Zr(e, t) {
    for (var n = t + "Capture", r = []; e !== null; ) {
      var l = e, o = l.stateNode;
      l.tag === 5 && o !== null && (l = o, o = $n(e, n), o != null && r.unshift(ur(e, o, l)), o = $n(e, t), o != null && r.push(ur(e, o, l))), e = e.return;
    }
    return r;
  }
  function wn(e) {
    if (e === null) return null;
    do
      e = e.return;
    while (e && e.tag !== 5);
    return e || null;
  }
  function ps(e, t, n, r, l) {
    for (var o = t._reactName, s = []; n !== null && n !== r; ) {
      var f = n, p = f.alternate, S = f.stateNode;
      if (p !== null && p === r) break;
      f.tag === 5 && S !== null && (f = S, l ? (p = $n(n, o), p != null && s.unshift(ur(n, p, f))) : l || (p = $n(n, o), p != null && s.push(ur(n, p, f)))), n = n.return;
    }
    s.length !== 0 && e.push({ event: t, listeners: s });
  }
  var Vf = /\r\n?/g, Bf = /\u0000|\uFFFD/g;
  function hs(e) {
    return (typeof e == "string" ? e : "" + e).replace(Vf, `
`).replace(Bf, "");
  }
  function qr(e, t, n) {
    if (t = hs(t), hs(e) !== t && n) throw Error(i(425));
  }
  function br() {
  }
  var Lo = null, Mo = null;
  function Oo(e, t) {
    return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
  }
  var Do = typeof setTimeout == "function" ? setTimeout : void 0, $f = typeof clearTimeout == "function" ? clearTimeout : void 0, ms = typeof Promise == "function" ? Promise : void 0, Wf = typeof queueMicrotask == "function" ? queueMicrotask : typeof ms < "u" ? function(e) {
    return ms.resolve(null).then(e).catch(Hf);
  } : Do;
  function Hf(e) {
    setTimeout(function() {
      throw e;
    });
  }
  function Ro(e, t) {
    var n = t, r = 0;
    do {
      var l = n.nextSibling;
      if (e.removeChild(n), l && l.nodeType === 8) if (n = l.data, n === "/$") {
        if (r === 0) {
          e.removeChild(l), Zn(t);
          return;
        }
        r--;
      } else n !== "$" && n !== "$?" && n !== "$!" || r++;
      n = l;
    } while (n);
    Zn(t);
  }
  function Ft(e) {
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
  function vs(e) {
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
  var Sn = Math.random().toString(36).slice(2), yt = "__reactFiber$" + Sn, sr = "__reactProps$" + Sn, Ct = "__reactContainer$" + Sn, Io = "__reactEvents$" + Sn, Qf = "__reactListeners$" + Sn, Kf = "__reactHandles$" + Sn;
  function qt(e) {
    var t = e[yt];
    if (t) return t;
    for (var n = e.parentNode; n; ) {
      if (t = n[Ct] || n[yt]) {
        if (n = t.alternate, t.child !== null || n !== null && n.child !== null) for (e = vs(e); e !== null; ) {
          if (n = e[yt]) return n;
          e = vs(e);
        }
        return t;
      }
      e = n, n = e.parentNode;
    }
    return null;
  }
  function ar(e) {
    return e = e[yt] || e[Ct], !e || e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3 ? null : e;
  }
  function kn(e) {
    if (e.tag === 5 || e.tag === 6) return e.stateNode;
    throw Error(i(33));
  }
  function el(e) {
    return e[sr] || null;
  }
  var zo = [], En = -1;
  function Ut(e) {
    return { current: e };
  }
  function me(e) {
    0 > En || (e.current = zo[En], zo[En] = null, En--);
  }
  function de(e, t) {
    En++, zo[En] = e.current, e.current = t;
  }
  var jt = {}, Ae = Ut(jt), We = Ut(!1), bt = jt;
  function Cn(e, t) {
    var n = e.type.contextTypes;
    if (!n) return jt;
    var r = e.stateNode;
    if (r && r.__reactInternalMemoizedUnmaskedChildContext === t) return r.__reactInternalMemoizedMaskedChildContext;
    var l = {}, o;
    for (o in n) l[o] = t[o];
    return r && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = t, e.__reactInternalMemoizedMaskedChildContext = l), l;
  }
  function He(e) {
    return e = e.childContextTypes, e != null;
  }
  function tl() {
    me(We), me(Ae);
  }
  function gs(e, t, n) {
    if (Ae.current !== jt) throw Error(i(168));
    de(Ae, t), de(We, n);
  }
  function ys(e, t, n) {
    var r = e.stateNode;
    if (t = t.childContextTypes, typeof r.getChildContext != "function") return n;
    r = r.getChildContext();
    for (var l in r) if (!(l in t)) throw Error(i(108, fe(e) || "Unknown", l));
    return I({}, n, r);
  }
  function nl(e) {
    return e = (e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext || jt, bt = Ae.current, de(Ae, e), de(We, We.current), !0;
  }
  function ws(e, t, n) {
    var r = e.stateNode;
    if (!r) throw Error(i(169));
    n ? (e = ys(e, t, bt), r.__reactInternalMemoizedMergedChildContext = e, me(We), me(Ae), de(Ae, e)) : me(We), de(We, n);
  }
  var xt = null, rl = !1, Ao = !1;
  function Ss(e) {
    xt === null ? xt = [e] : xt.push(e);
  }
  function Gf(e) {
    rl = !0, Ss(e);
  }
  function Vt() {
    if (!Ao && xt !== null) {
      Ao = !0;
      var e = 0, t = ae;
      try {
        var n = xt;
        for (ae = 1; e < n.length; e++) {
          var r = n[e];
          do
            r = r(!0);
          while (r !== null);
        }
        xt = null, rl = !1;
      } catch (l) {
        throw xt !== null && (xt = xt.slice(e + 1)), Eu(ro, Vt), l;
      } finally {
        ae = t, Ao = !1;
      }
    }
    return null;
  }
  var xn = [], Pn = 0, ll = null, ol = 0, tt = [], nt = 0, en = null, Pt = 1, Tt = "";
  function tn(e, t) {
    xn[Pn++] = ol, xn[Pn++] = ll, ll = e, ol = t;
  }
  function ks(e, t, n) {
    tt[nt++] = Pt, tt[nt++] = Tt, tt[nt++] = en, en = e;
    var r = Pt;
    e = Tt;
    var l = 32 - st(r) - 1;
    r &= ~(1 << l), n += 1;
    var o = 32 - st(t) + l;
    if (30 < o) {
      var s = l - l % 5;
      o = (r & (1 << s) - 1).toString(32), r >>= s, l -= s, Pt = 1 << 32 - st(t) + l | n << l | r, Tt = o + e;
    } else Pt = 1 << o | n << l | r, Tt = e;
  }
  function Fo(e) {
    e.return !== null && (tn(e, 1), ks(e, 1, 0));
  }
  function Uo(e) {
    for (; e === ll; ) ll = xn[--Pn], xn[Pn] = null, ol = xn[--Pn], xn[Pn] = null;
    for (; e === en; ) en = tt[--nt], tt[nt] = null, Tt = tt[--nt], tt[nt] = null, Pt = tt[--nt], tt[nt] = null;
  }
  var qe = null, be = null, ye = !1, ct = null;
  function Es(e, t) {
    var n = it(5, null, null, 0);
    n.elementType = "DELETED", n.stateNode = t, n.return = e, t = e.deletions, t === null ? (e.deletions = [n], e.flags |= 16) : t.push(n);
  }
  function Cs(e, t) {
    switch (e.tag) {
      case 5:
        var n = e.type;
        return t = t.nodeType !== 1 || n.toLowerCase() !== t.nodeName.toLowerCase() ? null : t, t !== null ? (e.stateNode = t, qe = e, be = Ft(t.firstChild), !0) : !1;
      case 6:
        return t = e.pendingProps === "" || t.nodeType !== 3 ? null : t, t !== null ? (e.stateNode = t, qe = e, be = null, !0) : !1;
      case 13:
        return t = t.nodeType !== 8 ? null : t, t !== null ? (n = en !== null ? { id: Pt, overflow: Tt } : null, e.memoizedState = { dehydrated: t, treeContext: n, retryLane: 1073741824 }, n = it(18, null, null, 0), n.stateNode = t, n.return = e, e.child = n, qe = e, be = null, !0) : !1;
      default:
        return !1;
    }
  }
  function jo(e) {
    return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
  }
  function Vo(e) {
    if (ye) {
      var t = be;
      if (t) {
        var n = t;
        if (!Cs(e, t)) {
          if (jo(e)) throw Error(i(418));
          t = Ft(n.nextSibling);
          var r = qe;
          t && Cs(e, t) ? Es(r, n) : (e.flags = e.flags & -4097 | 2, ye = !1, qe = e);
        }
      } else {
        if (jo(e)) throw Error(i(418));
        e.flags = e.flags & -4097 | 2, ye = !1, qe = e;
      }
    }
  }
  function xs(e) {
    for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13; ) e = e.return;
    qe = e;
  }
  function il(e) {
    if (e !== qe) return !1;
    if (!ye) return xs(e), ye = !0, !1;
    var t;
    if ((t = e.tag !== 3) && !(t = e.tag !== 5) && (t = e.type, t = t !== "head" && t !== "body" && !Oo(e.type, e.memoizedProps)), t && (t = be)) {
      if (jo(e)) throw Ps(), Error(i(418));
      for (; t; ) Es(e, t), t = Ft(t.nextSibling);
    }
    if (xs(e), e.tag === 13) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(i(317));
      e: {
        for (e = e.nextSibling, t = 0; e; ) {
          if (e.nodeType === 8) {
            var n = e.data;
            if (n === "/$") {
              if (t === 0) {
                be = Ft(e.nextSibling);
                break e;
              }
              t--;
            } else n !== "$" && n !== "$!" && n !== "$?" || t++;
          }
          e = e.nextSibling;
        }
        be = null;
      }
    } else be = qe ? Ft(e.stateNode.nextSibling) : null;
    return !0;
  }
  function Ps() {
    for (var e = be; e; ) e = Ft(e.nextSibling);
  }
  function Tn() {
    be = qe = null, ye = !1;
  }
  function Bo(e) {
    ct === null ? ct = [e] : ct.push(e);
  }
  var Xf = ue.ReactCurrentBatchConfig;
  function cr(e, t, n) {
    if (e = n.ref, e !== null && typeof e != "function" && typeof e != "object") {
      if (n._owner) {
        if (n = n._owner, n) {
          if (n.tag !== 1) throw Error(i(309));
          var r = n.stateNode;
        }
        if (!r) throw Error(i(147, e));
        var l = r, o = "" + e;
        return t !== null && t.ref !== null && typeof t.ref == "function" && t.ref._stringRef === o ? t.ref : (t = function(s) {
          var f = l.refs;
          s === null ? delete f[o] : f[o] = s;
        }, t._stringRef = o, t);
      }
      if (typeof e != "string") throw Error(i(284));
      if (!n._owner) throw Error(i(290, e));
    }
    return e;
  }
  function ul(e, t) {
    throw e = Object.prototype.toString.call(t), Error(i(31, e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e));
  }
  function Ts(e) {
    var t = e._init;
    return t(e._payload);
  }
  function _s(e) {
    function t(g, h) {
      if (e) {
        var w = g.deletions;
        w === null ? (g.deletions = [h], g.flags |= 16) : w.push(h);
      }
    }
    function n(g, h) {
      if (!e) return null;
      for (; h !== null; ) t(g, h), h = h.sibling;
      return null;
    }
    function r(g, h) {
      for (g = /* @__PURE__ */ new Map(); h !== null; ) h.key !== null ? g.set(h.key, h) : g.set(h.index, h), h = h.sibling;
      return g;
    }
    function l(g, h) {
      return g = Xt(g, h), g.index = 0, g.sibling = null, g;
    }
    function o(g, h, w) {
      return g.index = w, e ? (w = g.alternate, w !== null ? (w = w.index, w < h ? (g.flags |= 2, h) : w) : (g.flags |= 2, h)) : (g.flags |= 1048576, h);
    }
    function s(g) {
      return e && g.alternate === null && (g.flags |= 2), g;
    }
    function f(g, h, w, _) {
      return h === null || h.tag !== 6 ? (h = Di(w, g.mode, _), h.return = g, h) : (h = l(h, w), h.return = g, h);
    }
    function p(g, h, w, _) {
      var F = w.type;
      return F === Z ? P(g, h, w.props.children, _, w.key) : h !== null && (h.elementType === F || typeof F == "object" && F !== null && F.$$typeof === $e && Ts(F) === h.type) ? (_ = l(h, w.props), _.ref = cr(g, h, w), _.return = g, _) : (_ = Ol(w.type, w.key, w.props, null, g.mode, _), _.ref = cr(g, h, w), _.return = g, _);
    }
    function S(g, h, w, _) {
      return h === null || h.tag !== 4 || h.stateNode.containerInfo !== w.containerInfo || h.stateNode.implementation !== w.implementation ? (h = Ri(w, g.mode, _), h.return = g, h) : (h = l(h, w.children || []), h.return = g, h);
    }
    function P(g, h, w, _, F) {
      return h === null || h.tag !== 7 ? (h = cn(w, g.mode, _, F), h.return = g, h) : (h = l(h, w), h.return = g, h);
    }
    function T(g, h, w) {
      if (typeof h == "string" && h !== "" || typeof h == "number") return h = Di("" + h, g.mode, w), h.return = g, h;
      if (typeof h == "object" && h !== null) {
        switch (h.$$typeof) {
          case Oe:
            return w = Ol(h.type, h.key, h.props, null, g.mode, w), w.ref = cr(g, null, h), w.return = g, w;
          case W:
            return h = Ri(h, g.mode, w), h.return = g, h;
          case $e:
            var _ = h._init;
            return T(g, _(h._payload), w);
        }
        if (jn(h) || H(h)) return h = cn(h, g.mode, w, null), h.return = g, h;
        ul(g, h);
      }
      return null;
    }
    function C(g, h, w, _) {
      var F = h !== null ? h.key : null;
      if (typeof w == "string" && w !== "" || typeof w == "number") return F !== null ? null : f(g, h, "" + w, _);
      if (typeof w == "object" && w !== null) {
        switch (w.$$typeof) {
          case Oe:
            return w.key === F ? p(g, h, w, _) : null;
          case W:
            return w.key === F ? S(g, h, w, _) : null;
          case $e:
            return F = w._init, C(
              g,
              h,
              F(w._payload),
              _
            );
        }
        if (jn(w) || H(w)) return F !== null ? null : P(g, h, w, _, null);
        ul(g, w);
      }
      return null;
    }
    function M(g, h, w, _, F) {
      if (typeof _ == "string" && _ !== "" || typeof _ == "number") return g = g.get(w) || null, f(h, g, "" + _, F);
      if (typeof _ == "object" && _ !== null) {
        switch (_.$$typeof) {
          case Oe:
            return g = g.get(_.key === null ? w : _.key) || null, p(h, g, _, F);
          case W:
            return g = g.get(_.key === null ? w : _.key) || null, S(h, g, _, F);
          case $e:
            var B = _._init;
            return M(g, h, w, B(_._payload), F);
        }
        if (jn(_) || H(_)) return g = g.get(w) || null, P(h, g, _, F, null);
        ul(h, _);
      }
      return null;
    }
    function z(g, h, w, _) {
      for (var F = null, B = null, $ = h, Q = h = 0, Me = null; $ !== null && Q < w.length; Q++) {
        $.index > Q ? (Me = $, $ = null) : Me = $.sibling;
        var ie = C(g, $, w[Q], _);
        if (ie === null) {
          $ === null && ($ = Me);
          break;
        }
        e && $ && ie.alternate === null && t(g, $), h = o(ie, h, Q), B === null ? F = ie : B.sibling = ie, B = ie, $ = Me;
      }
      if (Q === w.length) return n(g, $), ye && tn(g, Q), F;
      if ($ === null) {
        for (; Q < w.length; Q++) $ = T(g, w[Q], _), $ !== null && (h = o($, h, Q), B === null ? F = $ : B.sibling = $, B = $);
        return ye && tn(g, Q), F;
      }
      for ($ = r(g, $); Q < w.length; Q++) Me = M($, g, Q, w[Q], _), Me !== null && (e && Me.alternate !== null && $.delete(Me.key === null ? Q : Me.key), h = o(Me, h, Q), B === null ? F = Me : B.sibling = Me, B = Me);
      return e && $.forEach(function(Yt) {
        return t(g, Yt);
      }), ye && tn(g, Q), F;
    }
    function A(g, h, w, _) {
      var F = H(w);
      if (typeof F != "function") throw Error(i(150));
      if (w = F.call(w), w == null) throw Error(i(151));
      for (var B = F = null, $ = h, Q = h = 0, Me = null, ie = w.next(); $ !== null && !ie.done; Q++, ie = w.next()) {
        $.index > Q ? (Me = $, $ = null) : Me = $.sibling;
        var Yt = C(g, $, ie.value, _);
        if (Yt === null) {
          $ === null && ($ = Me);
          break;
        }
        e && $ && Yt.alternate === null && t(g, $), h = o(Yt, h, Q), B === null ? F = Yt : B.sibling = Yt, B = Yt, $ = Me;
      }
      if (ie.done) return n(
        g,
        $
      ), ye && tn(g, Q), F;
      if ($ === null) {
        for (; !ie.done; Q++, ie = w.next()) ie = T(g, ie.value, _), ie !== null && (h = o(ie, h, Q), B === null ? F = ie : B.sibling = ie, B = ie);
        return ye && tn(g, Q), F;
      }
      for ($ = r(g, $); !ie.done; Q++, ie = w.next()) ie = M($, g, Q, ie.value, _), ie !== null && (e && ie.alternate !== null && $.delete(ie.key === null ? Q : ie.key), h = o(ie, h, Q), B === null ? F = ie : B.sibling = ie, B = ie);
      return e && $.forEach(function(_d) {
        return t(g, _d);
      }), ye && tn(g, Q), F;
    }
    function xe(g, h, w, _) {
      if (typeof w == "object" && w !== null && w.type === Z && w.key === null && (w = w.props.children), typeof w == "object" && w !== null) {
        switch (w.$$typeof) {
          case Oe:
            e: {
              for (var F = w.key, B = h; B !== null; ) {
                if (B.key === F) {
                  if (F = w.type, F === Z) {
                    if (B.tag === 7) {
                      n(g, B.sibling), h = l(B, w.props.children), h.return = g, g = h;
                      break e;
                    }
                  } else if (B.elementType === F || typeof F == "object" && F !== null && F.$$typeof === $e && Ts(F) === B.type) {
                    n(g, B.sibling), h = l(B, w.props), h.ref = cr(g, B, w), h.return = g, g = h;
                    break e;
                  }
                  n(g, B);
                  break;
                } else t(g, B);
                B = B.sibling;
              }
              w.type === Z ? (h = cn(w.props.children, g.mode, _, w.key), h.return = g, g = h) : (_ = Ol(w.type, w.key, w.props, null, g.mode, _), _.ref = cr(g, h, w), _.return = g, g = _);
            }
            return s(g);
          case W:
            e: {
              for (B = w.key; h !== null; ) {
                if (h.key === B) if (h.tag === 4 && h.stateNode.containerInfo === w.containerInfo && h.stateNode.implementation === w.implementation) {
                  n(g, h.sibling), h = l(h, w.children || []), h.return = g, g = h;
                  break e;
                } else {
                  n(g, h);
                  break;
                }
                else t(g, h);
                h = h.sibling;
              }
              h = Ri(w, g.mode, _), h.return = g, g = h;
            }
            return s(g);
          case $e:
            return B = w._init, xe(g, h, B(w._payload), _);
        }
        if (jn(w)) return z(g, h, w, _);
        if (H(w)) return A(g, h, w, _);
        ul(g, w);
      }
      return typeof w == "string" && w !== "" || typeof w == "number" ? (w = "" + w, h !== null && h.tag === 6 ? (n(g, h.sibling), h = l(h, w), h.return = g, g = h) : (n(g, h), h = Di(w, g.mode, _), h.return = g, g = h), s(g)) : n(g, h);
    }
    return xe;
  }
  var _n = _s(!0), Ns = _s(!1), sl = Ut(null), al = null, Nn = null, $o = null;
  function Wo() {
    $o = Nn = al = null;
  }
  function Ho(e) {
    var t = sl.current;
    me(sl), e._currentValue = t;
  }
  function Qo(e, t, n) {
    for (; e !== null; ) {
      var r = e.alternate;
      if ((e.childLanes & t) !== t ? (e.childLanes |= t, r !== null && (r.childLanes |= t)) : r !== null && (r.childLanes & t) !== t && (r.childLanes |= t), e === n) break;
      e = e.return;
    }
  }
  function Ln(e, t) {
    al = e, $o = Nn = null, e = e.dependencies, e !== null && e.firstContext !== null && ((e.lanes & t) !== 0 && (Qe = !0), e.firstContext = null);
  }
  function rt(e) {
    var t = e._currentValue;
    if ($o !== e) if (e = { context: e, memoizedValue: t, next: null }, Nn === null) {
      if (al === null) throw Error(i(308));
      Nn = e, al.dependencies = { lanes: 0, firstContext: e };
    } else Nn = Nn.next = e;
    return t;
  }
  var nn = null;
  function Ko(e) {
    nn === null ? nn = [e] : nn.push(e);
  }
  function Ls(e, t, n, r) {
    var l = t.interleaved;
    return l === null ? (n.next = n, Ko(t)) : (n.next = l.next, l.next = n), t.interleaved = n, _t(e, r);
  }
  function _t(e, t) {
    e.lanes |= t;
    var n = e.alternate;
    for (n !== null && (n.lanes |= t), n = e, e = e.return; e !== null; ) e.childLanes |= t, n = e.alternate, n !== null && (n.childLanes |= t), n = e, e = e.return;
    return n.tag === 3 ? n.stateNode : null;
  }
  var Bt = !1;
  function Go(e) {
    e.updateQueue = { baseState: e.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, interleaved: null, lanes: 0 }, effects: null };
  }
  function Ms(e, t) {
    e = e.updateQueue, t.updateQueue === e && (t.updateQueue = { baseState: e.baseState, firstBaseUpdate: e.firstBaseUpdate, lastBaseUpdate: e.lastBaseUpdate, shared: e.shared, effects: e.effects });
  }
  function Nt(e, t) {
    return { eventTime: e, lane: t, tag: 0, payload: null, callback: null, next: null };
  }
  function $t(e, t, n) {
    var r = e.updateQueue;
    if (r === null) return null;
    if (r = r.shared, (ne & 2) !== 0) {
      var l = r.pending;
      return l === null ? t.next = t : (t.next = l.next, l.next = t), r.pending = t, _t(e, n);
    }
    return l = r.interleaved, l === null ? (t.next = t, Ko(r)) : (t.next = l.next, l.next = t), r.interleaved = t, _t(e, n);
  }
  function cl(e, t, n) {
    if (t = t.updateQueue, t !== null && (t = t.shared, (n & 4194240) !== 0)) {
      var r = t.lanes;
      r &= e.pendingLanes, n |= r, t.lanes = n, io(e, n);
    }
  }
  function Os(e, t) {
    var n = e.updateQueue, r = e.alternate;
    if (r !== null && (r = r.updateQueue, n === r)) {
      var l = null, o = null;
      if (n = n.firstBaseUpdate, n !== null) {
        do {
          var s = { eventTime: n.eventTime, lane: n.lane, tag: n.tag, payload: n.payload, callback: n.callback, next: null };
          o === null ? l = o = s : o = o.next = s, n = n.next;
        } while (n !== null);
        o === null ? l = o = t : o = o.next = t;
      } else l = o = t;
      n = { baseState: r.baseState, firstBaseUpdate: l, lastBaseUpdate: o, shared: r.shared, effects: r.effects }, e.updateQueue = n;
      return;
    }
    e = n.lastBaseUpdate, e === null ? n.firstBaseUpdate = t : e.next = t, n.lastBaseUpdate = t;
  }
  function fl(e, t, n, r) {
    var l = e.updateQueue;
    Bt = !1;
    var o = l.firstBaseUpdate, s = l.lastBaseUpdate, f = l.shared.pending;
    if (f !== null) {
      l.shared.pending = null;
      var p = f, S = p.next;
      p.next = null, s === null ? o = S : s.next = S, s = p;
      var P = e.alternate;
      P !== null && (P = P.updateQueue, f = P.lastBaseUpdate, f !== s && (f === null ? P.firstBaseUpdate = S : f.next = S, P.lastBaseUpdate = p));
    }
    if (o !== null) {
      var T = l.baseState;
      s = 0, P = S = p = null, f = o;
      do {
        var C = f.lane, M = f.eventTime;
        if ((r & C) === C) {
          P !== null && (P = P.next = {
            eventTime: M,
            lane: 0,
            tag: f.tag,
            payload: f.payload,
            callback: f.callback,
            next: null
          });
          e: {
            var z = e, A = f;
            switch (C = t, M = n, A.tag) {
              case 1:
                if (z = A.payload, typeof z == "function") {
                  T = z.call(M, T, C);
                  break e;
                }
                T = z;
                break e;
              case 3:
                z.flags = z.flags & -65537 | 128;
              case 0:
                if (z = A.payload, C = typeof z == "function" ? z.call(M, T, C) : z, C == null) break e;
                T = I({}, T, C);
                break e;
              case 2:
                Bt = !0;
            }
          }
          f.callback !== null && f.lane !== 0 && (e.flags |= 64, C = l.effects, C === null ? l.effects = [f] : C.push(f));
        } else M = { eventTime: M, lane: C, tag: f.tag, payload: f.payload, callback: f.callback, next: null }, P === null ? (S = P = M, p = T) : P = P.next = M, s |= C;
        if (f = f.next, f === null) {
          if (f = l.shared.pending, f === null) break;
          C = f, f = C.next, C.next = null, l.lastBaseUpdate = C, l.shared.pending = null;
        }
      } while (!0);
      if (P === null && (p = T), l.baseState = p, l.firstBaseUpdate = S, l.lastBaseUpdate = P, t = l.shared.interleaved, t !== null) {
        l = t;
        do
          s |= l.lane, l = l.next;
        while (l !== t);
      } else o === null && (l.shared.lanes = 0);
      on |= s, e.lanes = s, e.memoizedState = T;
    }
  }
  function Ds(e, t, n) {
    if (e = t.effects, t.effects = null, e !== null) for (t = 0; t < e.length; t++) {
      var r = e[t], l = r.callback;
      if (l !== null) {
        if (r.callback = null, r = n, typeof l != "function") throw Error(i(191, l));
        l.call(r);
      }
    }
  }
  var fr = {}, wt = Ut(fr), dr = Ut(fr), pr = Ut(fr);
  function rn(e) {
    if (e === fr) throw Error(i(174));
    return e;
  }
  function Xo(e, t) {
    switch (de(pr, t), de(dr, e), de(wt, fr), e = t.nodeType, e) {
      case 9:
      case 11:
        t = (t = t.documentElement) ? t.namespaceURI : Xl(null, "");
        break;
      default:
        e = e === 8 ? t.parentNode : t, t = e.namespaceURI || null, e = e.tagName, t = Xl(t, e);
    }
    me(wt), de(wt, t);
  }
  function Mn() {
    me(wt), me(dr), me(pr);
  }
  function Rs(e) {
    rn(pr.current);
    var t = rn(wt.current), n = Xl(t, e.type);
    t !== n && (de(dr, e), de(wt, n));
  }
  function Yo(e) {
    dr.current === e && (me(wt), me(dr));
  }
  var we = Ut(0);
  function dl(e) {
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
  var Jo = [];
  function Zo() {
    for (var e = 0; e < Jo.length; e++) Jo[e]._workInProgressVersionPrimary = null;
    Jo.length = 0;
  }
  var pl = ue.ReactCurrentDispatcher, qo = ue.ReactCurrentBatchConfig, ln = 0, Se = null, Te = null, Ne = null, hl = !1, hr = !1, mr = 0, Yf = 0;
  function Fe() {
    throw Error(i(321));
  }
  function bo(e, t) {
    if (t === null) return !1;
    for (var n = 0; n < t.length && n < e.length; n++) if (!at(e[n], t[n])) return !1;
    return !0;
  }
  function ei(e, t, n, r, l, o) {
    if (ln = o, Se = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, pl.current = e === null || e.memoizedState === null ? bf : ed, e = n(r, l), hr) {
      o = 0;
      do {
        if (hr = !1, mr = 0, 25 <= o) throw Error(i(301));
        o += 1, Ne = Te = null, t.updateQueue = null, pl.current = td, e = n(r, l);
      } while (hr);
    }
    if (pl.current = gl, t = Te !== null && Te.next !== null, ln = 0, Ne = Te = Se = null, hl = !1, t) throw Error(i(300));
    return e;
  }
  function ti() {
    var e = mr !== 0;
    return mr = 0, e;
  }
  function St() {
    var e = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
    return Ne === null ? Se.memoizedState = Ne = e : Ne = Ne.next = e, Ne;
  }
  function lt() {
    if (Te === null) {
      var e = Se.alternate;
      e = e !== null ? e.memoizedState : null;
    } else e = Te.next;
    var t = Ne === null ? Se.memoizedState : Ne.next;
    if (t !== null) Ne = t, Te = e;
    else {
      if (e === null) throw Error(i(310));
      Te = e, e = { memoizedState: Te.memoizedState, baseState: Te.baseState, baseQueue: Te.baseQueue, queue: Te.queue, next: null }, Ne === null ? Se.memoizedState = Ne = e : Ne = Ne.next = e;
    }
    return Ne;
  }
  function vr(e, t) {
    return typeof t == "function" ? t(e) : t;
  }
  function ni(e) {
    var t = lt(), n = t.queue;
    if (n === null) throw Error(i(311));
    n.lastRenderedReducer = e;
    var r = Te, l = r.baseQueue, o = n.pending;
    if (o !== null) {
      if (l !== null) {
        var s = l.next;
        l.next = o.next, o.next = s;
      }
      r.baseQueue = l = o, n.pending = null;
    }
    if (l !== null) {
      o = l.next, r = r.baseState;
      var f = s = null, p = null, S = o;
      do {
        var P = S.lane;
        if ((ln & P) === P) p !== null && (p = p.next = { lane: 0, action: S.action, hasEagerState: S.hasEagerState, eagerState: S.eagerState, next: null }), r = S.hasEagerState ? S.eagerState : e(r, S.action);
        else {
          var T = {
            lane: P,
            action: S.action,
            hasEagerState: S.hasEagerState,
            eagerState: S.eagerState,
            next: null
          };
          p === null ? (f = p = T, s = r) : p = p.next = T, Se.lanes |= P, on |= P;
        }
        S = S.next;
      } while (S !== null && S !== o);
      p === null ? s = r : p.next = f, at(r, t.memoizedState) || (Qe = !0), t.memoizedState = r, t.baseState = s, t.baseQueue = p, n.lastRenderedState = r;
    }
    if (e = n.interleaved, e !== null) {
      l = e;
      do
        o = l.lane, Se.lanes |= o, on |= o, l = l.next;
      while (l !== e);
    } else l === null && (n.lanes = 0);
    return [t.memoizedState, n.dispatch];
  }
  function ri(e) {
    var t = lt(), n = t.queue;
    if (n === null) throw Error(i(311));
    n.lastRenderedReducer = e;
    var r = n.dispatch, l = n.pending, o = t.memoizedState;
    if (l !== null) {
      n.pending = null;
      var s = l = l.next;
      do
        o = e(o, s.action), s = s.next;
      while (s !== l);
      at(o, t.memoizedState) || (Qe = !0), t.memoizedState = o, t.baseQueue === null && (t.baseState = o), n.lastRenderedState = o;
    }
    return [o, r];
  }
  function Is() {
  }
  function zs(e, t) {
    var n = Se, r = lt(), l = t(), o = !at(r.memoizedState, l);
    if (o && (r.memoizedState = l, Qe = !0), r = r.queue, li(Us.bind(null, n, r, e), [e]), r.getSnapshot !== t || o || Ne !== null && Ne.memoizedState.tag & 1) {
      if (n.flags |= 2048, gr(9, Fs.bind(null, n, r, l, t), void 0, null), Le === null) throw Error(i(349));
      (ln & 30) !== 0 || As(n, t, l);
    }
    return l;
  }
  function As(e, t, n) {
    e.flags |= 16384, e = { getSnapshot: t, value: n }, t = Se.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, Se.updateQueue = t, t.stores = [e]) : (n = t.stores, n === null ? t.stores = [e] : n.push(e));
  }
  function Fs(e, t, n, r) {
    t.value = n, t.getSnapshot = r, js(t) && Vs(e);
  }
  function Us(e, t, n) {
    return n(function() {
      js(t) && Vs(e);
    });
  }
  function js(e) {
    var t = e.getSnapshot;
    e = e.value;
    try {
      var n = t();
      return !at(e, n);
    } catch {
      return !0;
    }
  }
  function Vs(e) {
    var t = _t(e, 1);
    t !== null && ht(t, e, 1, -1);
  }
  function Bs(e) {
    var t = St();
    return typeof e == "function" && (e = e()), t.memoizedState = t.baseState = e, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: vr, lastRenderedState: e }, t.queue = e, e = e.dispatch = qf.bind(null, Se, e), [t.memoizedState, e];
  }
  function gr(e, t, n, r) {
    return e = { tag: e, create: t, destroy: n, deps: r, next: null }, t = Se.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, Se.updateQueue = t, t.lastEffect = e.next = e) : (n = t.lastEffect, n === null ? t.lastEffect = e.next = e : (r = n.next, n.next = e, e.next = r, t.lastEffect = e)), e;
  }
  function $s() {
    return lt().memoizedState;
  }
  function ml(e, t, n, r) {
    var l = St();
    Se.flags |= e, l.memoizedState = gr(1 | t, n, void 0, r === void 0 ? null : r);
  }
  function vl(e, t, n, r) {
    var l = lt();
    r = r === void 0 ? null : r;
    var o = void 0;
    if (Te !== null) {
      var s = Te.memoizedState;
      if (o = s.destroy, r !== null && bo(r, s.deps)) {
        l.memoizedState = gr(t, n, o, r);
        return;
      }
    }
    Se.flags |= e, l.memoizedState = gr(1 | t, n, o, r);
  }
  function Ws(e, t) {
    return ml(8390656, 8, e, t);
  }
  function li(e, t) {
    return vl(2048, 8, e, t);
  }
  function Hs(e, t) {
    return vl(4, 2, e, t);
  }
  function Qs(e, t) {
    return vl(4, 4, e, t);
  }
  function Ks(e, t) {
    if (typeof t == "function") return e = e(), t(e), function() {
      t(null);
    };
    if (t != null) return e = e(), t.current = e, function() {
      t.current = null;
    };
  }
  function Gs(e, t, n) {
    return n = n != null ? n.concat([e]) : null, vl(4, 4, Ks.bind(null, t, e), n);
  }
  function oi() {
  }
  function Xs(e, t) {
    var n = lt();
    t = t === void 0 ? null : t;
    var r = n.memoizedState;
    return r !== null && t !== null && bo(t, r[1]) ? r[0] : (n.memoizedState = [e, t], e);
  }
  function Ys(e, t) {
    var n = lt();
    t = t === void 0 ? null : t;
    var r = n.memoizedState;
    return r !== null && t !== null && bo(t, r[1]) ? r[0] : (e = e(), n.memoizedState = [e, t], e);
  }
  function Js(e, t, n) {
    return (ln & 21) === 0 ? (e.baseState && (e.baseState = !1, Qe = !0), e.memoizedState = n) : (at(n, t) || (n = Tu(), Se.lanes |= n, on |= n, e.baseState = !0), t);
  }
  function Jf(e, t) {
    var n = ae;
    ae = n !== 0 && 4 > n ? n : 4, e(!0);
    var r = qo.transition;
    qo.transition = {};
    try {
      e(!1), t();
    } finally {
      ae = n, qo.transition = r;
    }
  }
  function Zs() {
    return lt().memoizedState;
  }
  function Zf(e, t, n) {
    var r = Kt(e);
    if (n = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null }, qs(e)) bs(t, n);
    else if (n = Ls(e, t, n, r), n !== null) {
      var l = Be();
      ht(n, e, r, l), ea(n, t, r);
    }
  }
  function qf(e, t, n) {
    var r = Kt(e), l = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null };
    if (qs(e)) bs(t, l);
    else {
      var o = e.alternate;
      if (e.lanes === 0 && (o === null || o.lanes === 0) && (o = t.lastRenderedReducer, o !== null)) try {
        var s = t.lastRenderedState, f = o(s, n);
        if (l.hasEagerState = !0, l.eagerState = f, at(f, s)) {
          var p = t.interleaved;
          p === null ? (l.next = l, Ko(t)) : (l.next = p.next, p.next = l), t.interleaved = l;
          return;
        }
      } catch {
      } finally {
      }
      n = Ls(e, t, l, r), n !== null && (l = Be(), ht(n, e, r, l), ea(n, t, r));
    }
  }
  function qs(e) {
    var t = e.alternate;
    return e === Se || t !== null && t === Se;
  }
  function bs(e, t) {
    hr = hl = !0;
    var n = e.pending;
    n === null ? t.next = t : (t.next = n.next, n.next = t), e.pending = t;
  }
  function ea(e, t, n) {
    if ((n & 4194240) !== 0) {
      var r = t.lanes;
      r &= e.pendingLanes, n |= r, t.lanes = n, io(e, n);
    }
  }
  var gl = { readContext: rt, useCallback: Fe, useContext: Fe, useEffect: Fe, useImperativeHandle: Fe, useInsertionEffect: Fe, useLayoutEffect: Fe, useMemo: Fe, useReducer: Fe, useRef: Fe, useState: Fe, useDebugValue: Fe, useDeferredValue: Fe, useTransition: Fe, useMutableSource: Fe, useSyncExternalStore: Fe, useId: Fe, unstable_isNewReconciler: !1 }, bf = { readContext: rt, useCallback: function(e, t) {
    return St().memoizedState = [e, t === void 0 ? null : t], e;
  }, useContext: rt, useEffect: Ws, useImperativeHandle: function(e, t, n) {
    return n = n != null ? n.concat([e]) : null, ml(
      4194308,
      4,
      Ks.bind(null, t, e),
      n
    );
  }, useLayoutEffect: function(e, t) {
    return ml(4194308, 4, e, t);
  }, useInsertionEffect: function(e, t) {
    return ml(4, 2, e, t);
  }, useMemo: function(e, t) {
    var n = St();
    return t = t === void 0 ? null : t, e = e(), n.memoizedState = [e, t], e;
  }, useReducer: function(e, t, n) {
    var r = St();
    return t = n !== void 0 ? n(t) : t, r.memoizedState = r.baseState = t, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: e, lastRenderedState: t }, r.queue = e, e = e.dispatch = Zf.bind(null, Se, e), [r.memoizedState, e];
  }, useRef: function(e) {
    var t = St();
    return e = { current: e }, t.memoizedState = e;
  }, useState: Bs, useDebugValue: oi, useDeferredValue: function(e) {
    return St().memoizedState = e;
  }, useTransition: function() {
    var e = Bs(!1), t = e[0];
    return e = Jf.bind(null, e[1]), St().memoizedState = e, [t, e];
  }, useMutableSource: function() {
  }, useSyncExternalStore: function(e, t, n) {
    var r = Se, l = St();
    if (ye) {
      if (n === void 0) throw Error(i(407));
      n = n();
    } else {
      if (n = t(), Le === null) throw Error(i(349));
      (ln & 30) !== 0 || As(r, t, n);
    }
    l.memoizedState = n;
    var o = { value: n, getSnapshot: t };
    return l.queue = o, Ws(Us.bind(
      null,
      r,
      o,
      e
    ), [e]), r.flags |= 2048, gr(9, Fs.bind(null, r, o, n, t), void 0, null), n;
  }, useId: function() {
    var e = St(), t = Le.identifierPrefix;
    if (ye) {
      var n = Tt, r = Pt;
      n = (r & ~(1 << 32 - st(r) - 1)).toString(32) + n, t = ":" + t + "R" + n, n = mr++, 0 < n && (t += "H" + n.toString(32)), t += ":";
    } else n = Yf++, t = ":" + t + "r" + n.toString(32) + ":";
    return e.memoizedState = t;
  }, unstable_isNewReconciler: !1 }, ed = {
    readContext: rt,
    useCallback: Xs,
    useContext: rt,
    useEffect: li,
    useImperativeHandle: Gs,
    useInsertionEffect: Hs,
    useLayoutEffect: Qs,
    useMemo: Ys,
    useReducer: ni,
    useRef: $s,
    useState: function() {
      return ni(vr);
    },
    useDebugValue: oi,
    useDeferredValue: function(e) {
      var t = lt();
      return Js(t, Te.memoizedState, e);
    },
    useTransition: function() {
      var e = ni(vr)[0], t = lt().memoizedState;
      return [e, t];
    },
    useMutableSource: Is,
    useSyncExternalStore: zs,
    useId: Zs,
    unstable_isNewReconciler: !1
  }, td = { readContext: rt, useCallback: Xs, useContext: rt, useEffect: li, useImperativeHandle: Gs, useInsertionEffect: Hs, useLayoutEffect: Qs, useMemo: Ys, useReducer: ri, useRef: $s, useState: function() {
    return ri(vr);
  }, useDebugValue: oi, useDeferredValue: function(e) {
    var t = lt();
    return Te === null ? t.memoizedState = e : Js(t, Te.memoizedState, e);
  }, useTransition: function() {
    var e = ri(vr)[0], t = lt().memoizedState;
    return [e, t];
  }, useMutableSource: Is, useSyncExternalStore: zs, useId: Zs, unstable_isNewReconciler: !1 };
  function ft(e, t) {
    if (e && e.defaultProps) {
      t = I({}, t), e = e.defaultProps;
      for (var n in e) t[n] === void 0 && (t[n] = e[n]);
      return t;
    }
    return t;
  }
  function ii(e, t, n, r) {
    t = e.memoizedState, n = n(r, t), n = n == null ? t : I({}, t, n), e.memoizedState = n, e.lanes === 0 && (e.updateQueue.baseState = n);
  }
  var yl = { isMounted: function(e) {
    return (e = e._reactInternals) ? Zt(e) === e : !1;
  }, enqueueSetState: function(e, t, n) {
    e = e._reactInternals;
    var r = Be(), l = Kt(e), o = Nt(r, l);
    o.payload = t, n != null && (o.callback = n), t = $t(e, o, l), t !== null && (ht(t, e, l, r), cl(t, e, l));
  }, enqueueReplaceState: function(e, t, n) {
    e = e._reactInternals;
    var r = Be(), l = Kt(e), o = Nt(r, l);
    o.tag = 1, o.payload = t, n != null && (o.callback = n), t = $t(e, o, l), t !== null && (ht(t, e, l, r), cl(t, e, l));
  }, enqueueForceUpdate: function(e, t) {
    e = e._reactInternals;
    var n = Be(), r = Kt(e), l = Nt(n, r);
    l.tag = 2, t != null && (l.callback = t), t = $t(e, l, r), t !== null && (ht(t, e, r, n), cl(t, e, r));
  } };
  function ta(e, t, n, r, l, o, s) {
    return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(r, o, s) : t.prototype && t.prototype.isPureReactComponent ? !rr(n, r) || !rr(l, o) : !0;
  }
  function na(e, t, n) {
    var r = !1, l = jt, o = t.contextType;
    return typeof o == "object" && o !== null ? o = rt(o) : (l = He(t) ? bt : Ae.current, r = t.contextTypes, o = (r = r != null) ? Cn(e, l) : jt), t = new t(n, o), e.memoizedState = t.state !== null && t.state !== void 0 ? t.state : null, t.updater = yl, e.stateNode = t, t._reactInternals = e, r && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = l, e.__reactInternalMemoizedMaskedChildContext = o), t;
  }
  function ra(e, t, n, r) {
    e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, r), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, r), t.state !== e && yl.enqueueReplaceState(t, t.state, null);
  }
  function ui(e, t, n, r) {
    var l = e.stateNode;
    l.props = n, l.state = e.memoizedState, l.refs = {}, Go(e);
    var o = t.contextType;
    typeof o == "object" && o !== null ? l.context = rt(o) : (o = He(t) ? bt : Ae.current, l.context = Cn(e, o)), l.state = e.memoizedState, o = t.getDerivedStateFromProps, typeof o == "function" && (ii(e, t, o, n), l.state = e.memoizedState), typeof t.getDerivedStateFromProps == "function" || typeof l.getSnapshotBeforeUpdate == "function" || typeof l.UNSAFE_componentWillMount != "function" && typeof l.componentWillMount != "function" || (t = l.state, typeof l.componentWillMount == "function" && l.componentWillMount(), typeof l.UNSAFE_componentWillMount == "function" && l.UNSAFE_componentWillMount(), t !== l.state && yl.enqueueReplaceState(l, l.state, null), fl(e, n, l, r), l.state = e.memoizedState), typeof l.componentDidMount == "function" && (e.flags |= 4194308);
  }
  function On(e, t) {
    try {
      var n = "", r = t;
      do
        n += le(r), r = r.return;
      while (r);
      var l = n;
    } catch (o) {
      l = `
Error generating stack: ` + o.message + `
` + o.stack;
    }
    return { value: e, source: t, stack: l, digest: null };
  }
  function si(e, t, n) {
    return { value: e, source: null, stack: n ?? null, digest: t ?? null };
  }
  function ai(e, t) {
    try {
      console.error(t.value);
    } catch (n) {
      setTimeout(function() {
        throw n;
      });
    }
  }
  var nd = typeof WeakMap == "function" ? WeakMap : Map;
  function la(e, t, n) {
    n = Nt(-1, n), n.tag = 3, n.payload = { element: null };
    var r = t.value;
    return n.callback = function() {
      Pl || (Pl = !0, xi = r), ai(e, t);
    }, n;
  }
  function oa(e, t, n) {
    n = Nt(-1, n), n.tag = 3;
    var r = e.type.getDerivedStateFromError;
    if (typeof r == "function") {
      var l = t.value;
      n.payload = function() {
        return r(l);
      }, n.callback = function() {
        ai(e, t);
      };
    }
    var o = e.stateNode;
    return o !== null && typeof o.componentDidCatch == "function" && (n.callback = function() {
      ai(e, t), typeof r != "function" && (Ht === null ? Ht = /* @__PURE__ */ new Set([this]) : Ht.add(this));
      var s = t.stack;
      this.componentDidCatch(t.value, { componentStack: s !== null ? s : "" });
    }), n;
  }
  function ia(e, t, n) {
    var r = e.pingCache;
    if (r === null) {
      r = e.pingCache = new nd();
      var l = /* @__PURE__ */ new Set();
      r.set(t, l);
    } else l = r.get(t), l === void 0 && (l = /* @__PURE__ */ new Set(), r.set(t, l));
    l.has(n) || (l.add(n), e = vd.bind(null, e, t, n), t.then(e, e));
  }
  function ua(e) {
    do {
      var t;
      if ((t = e.tag === 13) && (t = e.memoizedState, t = t !== null ? t.dehydrated !== null : !0), t) return e;
      e = e.return;
    } while (e !== null);
    return null;
  }
  function sa(e, t, n, r, l) {
    return (e.mode & 1) === 0 ? (e === t ? e.flags |= 65536 : (e.flags |= 128, n.flags |= 131072, n.flags &= -52805, n.tag === 1 && (n.alternate === null ? n.tag = 17 : (t = Nt(-1, 1), t.tag = 2, $t(n, t, 1))), n.lanes |= 1), e) : (e.flags |= 65536, e.lanes = l, e);
  }
  var rd = ue.ReactCurrentOwner, Qe = !1;
  function Ve(e, t, n, r) {
    t.child = e === null ? Ns(t, null, n, r) : _n(t, e.child, n, r);
  }
  function aa(e, t, n, r, l) {
    n = n.render;
    var o = t.ref;
    return Ln(t, l), r = ei(e, t, n, r, o, l), n = ti(), e !== null && !Qe ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~l, Lt(e, t, l)) : (ye && n && Fo(t), t.flags |= 1, Ve(e, t, r, l), t.child);
  }
  function ca(e, t, n, r, l) {
    if (e === null) {
      var o = n.type;
      return typeof o == "function" && !Oi(o) && o.defaultProps === void 0 && n.compare === null && n.defaultProps === void 0 ? (t.tag = 15, t.type = o, fa(e, t, o, r, l)) : (e = Ol(n.type, null, r, t, t.mode, l), e.ref = t.ref, e.return = t, t.child = e);
    }
    if (o = e.child, (e.lanes & l) === 0) {
      var s = o.memoizedProps;
      if (n = n.compare, n = n !== null ? n : rr, n(s, r) && e.ref === t.ref) return Lt(e, t, l);
    }
    return t.flags |= 1, e = Xt(o, r), e.ref = t.ref, e.return = t, t.child = e;
  }
  function fa(e, t, n, r, l) {
    if (e !== null) {
      var o = e.memoizedProps;
      if (rr(o, r) && e.ref === t.ref) if (Qe = !1, t.pendingProps = r = o, (e.lanes & l) !== 0) (e.flags & 131072) !== 0 && (Qe = !0);
      else return t.lanes = e.lanes, Lt(e, t, l);
    }
    return ci(e, t, n, r, l);
  }
  function da(e, t, n) {
    var r = t.pendingProps, l = r.children, o = e !== null ? e.memoizedState : null;
    if (r.mode === "hidden") if ((t.mode & 1) === 0) t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, de(Rn, et), et |= n;
    else {
      if ((n & 1073741824) === 0) return e = o !== null ? o.baseLanes | n : n, t.lanes = t.childLanes = 1073741824, t.memoizedState = { baseLanes: e, cachePool: null, transitions: null }, t.updateQueue = null, de(Rn, et), et |= e, null;
      t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, r = o !== null ? o.baseLanes : n, de(Rn, et), et |= r;
    }
    else o !== null ? (r = o.baseLanes | n, t.memoizedState = null) : r = n, de(Rn, et), et |= r;
    return Ve(e, t, l, n), t.child;
  }
  function pa(e, t) {
    var n = t.ref;
    (e === null && n !== null || e !== null && e.ref !== n) && (t.flags |= 512, t.flags |= 2097152);
  }
  function ci(e, t, n, r, l) {
    var o = He(n) ? bt : Ae.current;
    return o = Cn(t, o), Ln(t, l), n = ei(e, t, n, r, o, l), r = ti(), e !== null && !Qe ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~l, Lt(e, t, l)) : (ye && r && Fo(t), t.flags |= 1, Ve(e, t, n, l), t.child);
  }
  function ha(e, t, n, r, l) {
    if (He(n)) {
      var o = !0;
      nl(t);
    } else o = !1;
    if (Ln(t, l), t.stateNode === null) Sl(e, t), na(t, n, r), ui(t, n, r, l), r = !0;
    else if (e === null) {
      var s = t.stateNode, f = t.memoizedProps;
      s.props = f;
      var p = s.context, S = n.contextType;
      typeof S == "object" && S !== null ? S = rt(S) : (S = He(n) ? bt : Ae.current, S = Cn(t, S));
      var P = n.getDerivedStateFromProps, T = typeof P == "function" || typeof s.getSnapshotBeforeUpdate == "function";
      T || typeof s.UNSAFE_componentWillReceiveProps != "function" && typeof s.componentWillReceiveProps != "function" || (f !== r || p !== S) && ra(t, s, r, S), Bt = !1;
      var C = t.memoizedState;
      s.state = C, fl(t, r, s, l), p = t.memoizedState, f !== r || C !== p || We.current || Bt ? (typeof P == "function" && (ii(t, n, P, r), p = t.memoizedState), (f = Bt || ta(t, n, f, r, C, p, S)) ? (T || typeof s.UNSAFE_componentWillMount != "function" && typeof s.componentWillMount != "function" || (typeof s.componentWillMount == "function" && s.componentWillMount(), typeof s.UNSAFE_componentWillMount == "function" && s.UNSAFE_componentWillMount()), typeof s.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof s.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = r, t.memoizedState = p), s.props = r, s.state = p, s.context = S, r = f) : (typeof s.componentDidMount == "function" && (t.flags |= 4194308), r = !1);
    } else {
      s = t.stateNode, Ms(e, t), f = t.memoizedProps, S = t.type === t.elementType ? f : ft(t.type, f), s.props = S, T = t.pendingProps, C = s.context, p = n.contextType, typeof p == "object" && p !== null ? p = rt(p) : (p = He(n) ? bt : Ae.current, p = Cn(t, p));
      var M = n.getDerivedStateFromProps;
      (P = typeof M == "function" || typeof s.getSnapshotBeforeUpdate == "function") || typeof s.UNSAFE_componentWillReceiveProps != "function" && typeof s.componentWillReceiveProps != "function" || (f !== T || C !== p) && ra(t, s, r, p), Bt = !1, C = t.memoizedState, s.state = C, fl(t, r, s, l);
      var z = t.memoizedState;
      f !== T || C !== z || We.current || Bt ? (typeof M == "function" && (ii(t, n, M, r), z = t.memoizedState), (S = Bt || ta(t, n, S, r, C, z, p) || !1) ? (P || typeof s.UNSAFE_componentWillUpdate != "function" && typeof s.componentWillUpdate != "function" || (typeof s.componentWillUpdate == "function" && s.componentWillUpdate(r, z, p), typeof s.UNSAFE_componentWillUpdate == "function" && s.UNSAFE_componentWillUpdate(r, z, p)), typeof s.componentDidUpdate == "function" && (t.flags |= 4), typeof s.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof s.componentDidUpdate != "function" || f === e.memoizedProps && C === e.memoizedState || (t.flags |= 4), typeof s.getSnapshotBeforeUpdate != "function" || f === e.memoizedProps && C === e.memoizedState || (t.flags |= 1024), t.memoizedProps = r, t.memoizedState = z), s.props = r, s.state = z, s.context = p, r = S) : (typeof s.componentDidUpdate != "function" || f === e.memoizedProps && C === e.memoizedState || (t.flags |= 4), typeof s.getSnapshotBeforeUpdate != "function" || f === e.memoizedProps && C === e.memoizedState || (t.flags |= 1024), r = !1);
    }
    return fi(e, t, n, r, o, l);
  }
  function fi(e, t, n, r, l, o) {
    pa(e, t);
    var s = (t.flags & 128) !== 0;
    if (!r && !s) return l && ws(t, n, !1), Lt(e, t, o);
    r = t.stateNode, rd.current = t;
    var f = s && typeof n.getDerivedStateFromError != "function" ? null : r.render();
    return t.flags |= 1, e !== null && s ? (t.child = _n(t, e.child, null, o), t.child = _n(t, null, f, o)) : Ve(e, t, f, o), t.memoizedState = r.state, l && ws(t, n, !0), t.child;
  }
  function ma(e) {
    var t = e.stateNode;
    t.pendingContext ? gs(e, t.pendingContext, t.pendingContext !== t.context) : t.context && gs(e, t.context, !1), Xo(e, t.containerInfo);
  }
  function va(e, t, n, r, l) {
    return Tn(), Bo(l), t.flags |= 256, Ve(e, t, n, r), t.child;
  }
  var di = { dehydrated: null, treeContext: null, retryLane: 0 };
  function pi(e) {
    return { baseLanes: e, cachePool: null, transitions: null };
  }
  function ga(e, t, n) {
    var r = t.pendingProps, l = we.current, o = !1, s = (t.flags & 128) !== 0, f;
    if ((f = s) || (f = e !== null && e.memoizedState === null ? !1 : (l & 2) !== 0), f ? (o = !0, t.flags &= -129) : (e === null || e.memoizedState !== null) && (l |= 1), de(we, l & 1), e === null)
      return Vo(t), e = t.memoizedState, e !== null && (e = e.dehydrated, e !== null) ? ((t.mode & 1) === 0 ? t.lanes = 1 : e.data === "$!" ? t.lanes = 8 : t.lanes = 1073741824, null) : (s = r.children, e = r.fallback, o ? (r = t.mode, o = t.child, s = { mode: "hidden", children: s }, (r & 1) === 0 && o !== null ? (o.childLanes = 0, o.pendingProps = s) : o = Dl(s, r, 0, null), e = cn(e, r, n, null), o.return = t, e.return = t, o.sibling = e, t.child = o, t.child.memoizedState = pi(n), t.memoizedState = di, e) : hi(t, s));
    if (l = e.memoizedState, l !== null && (f = l.dehydrated, f !== null)) return ld(e, t, s, r, f, l, n);
    if (o) {
      o = r.fallback, s = t.mode, l = e.child, f = l.sibling;
      var p = { mode: "hidden", children: r.children };
      return (s & 1) === 0 && t.child !== l ? (r = t.child, r.childLanes = 0, r.pendingProps = p, t.deletions = null) : (r = Xt(l, p), r.subtreeFlags = l.subtreeFlags & 14680064), f !== null ? o = Xt(f, o) : (o = cn(o, s, n, null), o.flags |= 2), o.return = t, r.return = t, r.sibling = o, t.child = r, r = o, o = t.child, s = e.child.memoizedState, s = s === null ? pi(n) : { baseLanes: s.baseLanes | n, cachePool: null, transitions: s.transitions }, o.memoizedState = s, o.childLanes = e.childLanes & ~n, t.memoizedState = di, r;
    }
    return o = e.child, e = o.sibling, r = Xt(o, { mode: "visible", children: r.children }), (t.mode & 1) === 0 && (r.lanes = n), r.return = t, r.sibling = null, e !== null && (n = t.deletions, n === null ? (t.deletions = [e], t.flags |= 16) : n.push(e)), t.child = r, t.memoizedState = null, r;
  }
  function hi(e, t) {
    return t = Dl({ mode: "visible", children: t }, e.mode, 0, null), t.return = e, e.child = t;
  }
  function wl(e, t, n, r) {
    return r !== null && Bo(r), _n(t, e.child, null, n), e = hi(t, t.pendingProps.children), e.flags |= 2, t.memoizedState = null, e;
  }
  function ld(e, t, n, r, l, o, s) {
    if (n)
      return t.flags & 256 ? (t.flags &= -257, r = si(Error(i(422))), wl(e, t, s, r)) : t.memoizedState !== null ? (t.child = e.child, t.flags |= 128, null) : (o = r.fallback, l = t.mode, r = Dl({ mode: "visible", children: r.children }, l, 0, null), o = cn(o, l, s, null), o.flags |= 2, r.return = t, o.return = t, r.sibling = o, t.child = r, (t.mode & 1) !== 0 && _n(t, e.child, null, s), t.child.memoizedState = pi(s), t.memoizedState = di, o);
    if ((t.mode & 1) === 0) return wl(e, t, s, null);
    if (l.data === "$!") {
      if (r = l.nextSibling && l.nextSibling.dataset, r) var f = r.dgst;
      return r = f, o = Error(i(419)), r = si(o, r, void 0), wl(e, t, s, r);
    }
    if (f = (s & e.childLanes) !== 0, Qe || f) {
      if (r = Le, r !== null) {
        switch (s & -s) {
          case 4:
            l = 2;
            break;
          case 16:
            l = 8;
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
            l = 32;
            break;
          case 536870912:
            l = 268435456;
            break;
          default:
            l = 0;
        }
        l = (l & (r.suspendedLanes | s)) !== 0 ? 0 : l, l !== 0 && l !== o.retryLane && (o.retryLane = l, _t(e, l), ht(r, e, l, -1));
      }
      return Mi(), r = si(Error(i(421))), wl(e, t, s, r);
    }
    return l.data === "$?" ? (t.flags |= 128, t.child = e.child, t = gd.bind(null, e), l._reactRetry = t, null) : (e = o.treeContext, be = Ft(l.nextSibling), qe = t, ye = !0, ct = null, e !== null && (tt[nt++] = Pt, tt[nt++] = Tt, tt[nt++] = en, Pt = e.id, Tt = e.overflow, en = t), t = hi(t, r.children), t.flags |= 4096, t);
  }
  function ya(e, t, n) {
    e.lanes |= t;
    var r = e.alternate;
    r !== null && (r.lanes |= t), Qo(e.return, t, n);
  }
  function mi(e, t, n, r, l) {
    var o = e.memoizedState;
    o === null ? e.memoizedState = { isBackwards: t, rendering: null, renderingStartTime: 0, last: r, tail: n, tailMode: l } : (o.isBackwards = t, o.rendering = null, o.renderingStartTime = 0, o.last = r, o.tail = n, o.tailMode = l);
  }
  function wa(e, t, n) {
    var r = t.pendingProps, l = r.revealOrder, o = r.tail;
    if (Ve(e, t, r.children, n), r = we.current, (r & 2) !== 0) r = r & 1 | 2, t.flags |= 128;
    else {
      if (e !== null && (e.flags & 128) !== 0) e: for (e = t.child; e !== null; ) {
        if (e.tag === 13) e.memoizedState !== null && ya(e, n, t);
        else if (e.tag === 19) ya(e, n, t);
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
    if (de(we, r), (t.mode & 1) === 0) t.memoizedState = null;
    else switch (l) {
      case "forwards":
        for (n = t.child, l = null; n !== null; ) e = n.alternate, e !== null && dl(e) === null && (l = n), n = n.sibling;
        n = l, n === null ? (l = t.child, t.child = null) : (l = n.sibling, n.sibling = null), mi(t, !1, l, n, o);
        break;
      case "backwards":
        for (n = null, l = t.child, t.child = null; l !== null; ) {
          if (e = l.alternate, e !== null && dl(e) === null) {
            t.child = l;
            break;
          }
          e = l.sibling, l.sibling = n, n = l, l = e;
        }
        mi(t, !0, n, null, o);
        break;
      case "together":
        mi(t, !1, null, null, void 0);
        break;
      default:
        t.memoizedState = null;
    }
    return t.child;
  }
  function Sl(e, t) {
    (t.mode & 1) === 0 && e !== null && (e.alternate = null, t.alternate = null, t.flags |= 2);
  }
  function Lt(e, t, n) {
    if (e !== null && (t.dependencies = e.dependencies), on |= t.lanes, (n & t.childLanes) === 0) return null;
    if (e !== null && t.child !== e.child) throw Error(i(153));
    if (t.child !== null) {
      for (e = t.child, n = Xt(e, e.pendingProps), t.child = n, n.return = t; e.sibling !== null; ) e = e.sibling, n = n.sibling = Xt(e, e.pendingProps), n.return = t;
      n.sibling = null;
    }
    return t.child;
  }
  function od(e, t, n) {
    switch (t.tag) {
      case 3:
        ma(t), Tn();
        break;
      case 5:
        Rs(t);
        break;
      case 1:
        He(t.type) && nl(t);
        break;
      case 4:
        Xo(t, t.stateNode.containerInfo);
        break;
      case 10:
        var r = t.type._context, l = t.memoizedProps.value;
        de(sl, r._currentValue), r._currentValue = l;
        break;
      case 13:
        if (r = t.memoizedState, r !== null)
          return r.dehydrated !== null ? (de(we, we.current & 1), t.flags |= 128, null) : (n & t.child.childLanes) !== 0 ? ga(e, t, n) : (de(we, we.current & 1), e = Lt(e, t, n), e !== null ? e.sibling : null);
        de(we, we.current & 1);
        break;
      case 19:
        if (r = (n & t.childLanes) !== 0, (e.flags & 128) !== 0) {
          if (r) return wa(e, t, n);
          t.flags |= 128;
        }
        if (l = t.memoizedState, l !== null && (l.rendering = null, l.tail = null, l.lastEffect = null), de(we, we.current), r) break;
        return null;
      case 22:
      case 23:
        return t.lanes = 0, da(e, t, n);
    }
    return Lt(e, t, n);
  }
  var Sa, vi, ka, Ea;
  Sa = function(e, t) {
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
  }, vi = function() {
  }, ka = function(e, t, n, r) {
    var l = e.memoizedProps;
    if (l !== r) {
      e = t.stateNode, rn(wt.current);
      var o = null;
      switch (n) {
        case "input":
          l = Hl(e, l), r = Hl(e, r), o = [];
          break;
        case "select":
          l = I({}, l, { value: void 0 }), r = I({}, r, { value: void 0 }), o = [];
          break;
        case "textarea":
          l = Gl(e, l), r = Gl(e, r), o = [];
          break;
        default:
          typeof l.onClick != "function" && typeof r.onClick == "function" && (e.onclick = br);
      }
      Yl(n, r);
      var s;
      n = null;
      for (S in l) if (!r.hasOwnProperty(S) && l.hasOwnProperty(S) && l[S] != null) if (S === "style") {
        var f = l[S];
        for (s in f) f.hasOwnProperty(s) && (n || (n = {}), n[s] = "");
      } else S !== "dangerouslySetInnerHTML" && S !== "children" && S !== "suppressContentEditableWarning" && S !== "suppressHydrationWarning" && S !== "autoFocus" && (c.hasOwnProperty(S) ? o || (o = []) : (o = o || []).push(S, null));
      for (S in r) {
        var p = r[S];
        if (f = l != null ? l[S] : void 0, r.hasOwnProperty(S) && p !== f && (p != null || f != null)) if (S === "style") if (f) {
          for (s in f) !f.hasOwnProperty(s) || p && p.hasOwnProperty(s) || (n || (n = {}), n[s] = "");
          for (s in p) p.hasOwnProperty(s) && f[s] !== p[s] && (n || (n = {}), n[s] = p[s]);
        } else n || (o || (o = []), o.push(
          S,
          n
        )), n = p;
        else S === "dangerouslySetInnerHTML" ? (p = p ? p.__html : void 0, f = f ? f.__html : void 0, p != null && f !== p && (o = o || []).push(S, p)) : S === "children" ? typeof p != "string" && typeof p != "number" || (o = o || []).push(S, "" + p) : S !== "suppressContentEditableWarning" && S !== "suppressHydrationWarning" && (c.hasOwnProperty(S) ? (p != null && S === "onScroll" && he("scroll", e), o || f === p || (o = [])) : (o = o || []).push(S, p));
      }
      n && (o = o || []).push("style", n);
      var S = o;
      (t.updateQueue = S) && (t.flags |= 4);
    }
  }, Ea = function(e, t, n, r) {
    n !== r && (t.flags |= 4);
  };
  function yr(e, t) {
    if (!ye) switch (e.tailMode) {
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
  function Ue(e) {
    var t = e.alternate !== null && e.alternate.child === e.child, n = 0, r = 0;
    if (t) for (var l = e.child; l !== null; ) n |= l.lanes | l.childLanes, r |= l.subtreeFlags & 14680064, r |= l.flags & 14680064, l.return = e, l = l.sibling;
    else for (l = e.child; l !== null; ) n |= l.lanes | l.childLanes, r |= l.subtreeFlags, r |= l.flags, l.return = e, l = l.sibling;
    return e.subtreeFlags |= r, e.childLanes = n, t;
  }
  function id(e, t, n) {
    var r = t.pendingProps;
    switch (Uo(t), t.tag) {
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
        return Ue(t), null;
      case 1:
        return He(t.type) && tl(), Ue(t), null;
      case 3:
        return r = t.stateNode, Mn(), me(We), me(Ae), Zo(), r.pendingContext && (r.context = r.pendingContext, r.pendingContext = null), (e === null || e.child === null) && (il(t) ? t.flags |= 4 : e === null || e.memoizedState.isDehydrated && (t.flags & 256) === 0 || (t.flags |= 1024, ct !== null && (_i(ct), ct = null))), vi(e, t), Ue(t), null;
      case 5:
        Yo(t);
        var l = rn(pr.current);
        if (n = t.type, e !== null && t.stateNode != null) ka(e, t, n, r, l), e.ref !== t.ref && (t.flags |= 512, t.flags |= 2097152);
        else {
          if (!r) {
            if (t.stateNode === null) throw Error(i(166));
            return Ue(t), null;
          }
          if (e = rn(wt.current), il(t)) {
            r = t.stateNode, n = t.type;
            var o = t.memoizedProps;
            switch (r[yt] = t, r[sr] = o, e = (t.mode & 1) !== 0, n) {
              case "dialog":
                he("cancel", r), he("close", r);
                break;
              case "iframe":
              case "object":
              case "embed":
                he("load", r);
                break;
              case "video":
              case "audio":
                for (l = 0; l < or.length; l++) he(or[l], r);
                break;
              case "source":
                he("error", r);
                break;
              case "img":
              case "image":
              case "link":
                he(
                  "error",
                  r
                ), he("load", r);
                break;
              case "details":
                he("toggle", r);
                break;
              case "input":
                nu(r, o), he("invalid", r);
                break;
              case "select":
                r._wrapperState = { wasMultiple: !!o.multiple }, he("invalid", r);
                break;
              case "textarea":
                ou(r, o), he("invalid", r);
            }
            Yl(n, o), l = null;
            for (var s in o) if (o.hasOwnProperty(s)) {
              var f = o[s];
              s === "children" ? typeof f == "string" ? r.textContent !== f && (o.suppressHydrationWarning !== !0 && qr(r.textContent, f, e), l = ["children", f]) : typeof f == "number" && r.textContent !== "" + f && (o.suppressHydrationWarning !== !0 && qr(
                r.textContent,
                f,
                e
              ), l = ["children", "" + f]) : c.hasOwnProperty(s) && f != null && s === "onScroll" && he("scroll", r);
            }
            switch (n) {
              case "input":
                Lr(r), lu(r, o, !0);
                break;
              case "textarea":
                Lr(r), uu(r);
                break;
              case "select":
              case "option":
                break;
              default:
                typeof o.onClick == "function" && (r.onclick = br);
            }
            r = l, t.updateQueue = r, r !== null && (t.flags |= 4);
          } else {
            s = l.nodeType === 9 ? l : l.ownerDocument, e === "http://www.w3.org/1999/xhtml" && (e = su(n)), e === "http://www.w3.org/1999/xhtml" ? n === "script" ? (e = s.createElement("div"), e.innerHTML = "<script><\/script>", e = e.removeChild(e.firstChild)) : typeof r.is == "string" ? e = s.createElement(n, { is: r.is }) : (e = s.createElement(n), n === "select" && (s = e, r.multiple ? s.multiple = !0 : r.size && (s.size = r.size))) : e = s.createElementNS(e, n), e[yt] = t, e[sr] = r, Sa(e, t, !1, !1), t.stateNode = e;
            e: {
              switch (s = Jl(n, r), n) {
                case "dialog":
                  he("cancel", e), he("close", e), l = r;
                  break;
                case "iframe":
                case "object":
                case "embed":
                  he("load", e), l = r;
                  break;
                case "video":
                case "audio":
                  for (l = 0; l < or.length; l++) he(or[l], e);
                  l = r;
                  break;
                case "source":
                  he("error", e), l = r;
                  break;
                case "img":
                case "image":
                case "link":
                  he(
                    "error",
                    e
                  ), he("load", e), l = r;
                  break;
                case "details":
                  he("toggle", e), l = r;
                  break;
                case "input":
                  nu(e, r), l = Hl(e, r), he("invalid", e);
                  break;
                case "option":
                  l = r;
                  break;
                case "select":
                  e._wrapperState = { wasMultiple: !!r.multiple }, l = I({}, r, { value: void 0 }), he("invalid", e);
                  break;
                case "textarea":
                  ou(e, r), l = Gl(e, r), he("invalid", e);
                  break;
                default:
                  l = r;
              }
              Yl(n, l), f = l;
              for (o in f) if (f.hasOwnProperty(o)) {
                var p = f[o];
                o === "style" ? fu(e, p) : o === "dangerouslySetInnerHTML" ? (p = p ? p.__html : void 0, p != null && au(e, p)) : o === "children" ? typeof p == "string" ? (n !== "textarea" || p !== "") && Vn(e, p) : typeof p == "number" && Vn(e, "" + p) : o !== "suppressContentEditableWarning" && o !== "suppressHydrationWarning" && o !== "autoFocus" && (c.hasOwnProperty(o) ? p != null && o === "onScroll" && he("scroll", e) : p != null && re(e, o, p, s));
              }
              switch (n) {
                case "input":
                  Lr(e), lu(e, r, !1);
                  break;
                case "textarea":
                  Lr(e), uu(e);
                  break;
                case "option":
                  r.value != null && e.setAttribute("value", "" + se(r.value));
                  break;
                case "select":
                  e.multiple = !!r.multiple, o = r.value, o != null ? fn(e, !!r.multiple, o, !1) : r.defaultValue != null && fn(
                    e,
                    !!r.multiple,
                    r.defaultValue,
                    !0
                  );
                  break;
                default:
                  typeof l.onClick == "function" && (e.onclick = br);
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
        return Ue(t), null;
      case 6:
        if (e && t.stateNode != null) Ea(e, t, e.memoizedProps, r);
        else {
          if (typeof r != "string" && t.stateNode === null) throw Error(i(166));
          if (n = rn(pr.current), rn(wt.current), il(t)) {
            if (r = t.stateNode, n = t.memoizedProps, r[yt] = t, (o = r.nodeValue !== n) && (e = qe, e !== null)) switch (e.tag) {
              case 3:
                qr(r.nodeValue, n, (e.mode & 1) !== 0);
                break;
              case 5:
                e.memoizedProps.suppressHydrationWarning !== !0 && qr(r.nodeValue, n, (e.mode & 1) !== 0);
            }
            o && (t.flags |= 4);
          } else r = (n.nodeType === 9 ? n : n.ownerDocument).createTextNode(r), r[yt] = t, t.stateNode = r;
        }
        return Ue(t), null;
      case 13:
        if (me(we), r = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
          if (ye && be !== null && (t.mode & 1) !== 0 && (t.flags & 128) === 0) Ps(), Tn(), t.flags |= 98560, o = !1;
          else if (o = il(t), r !== null && r.dehydrated !== null) {
            if (e === null) {
              if (!o) throw Error(i(318));
              if (o = t.memoizedState, o = o !== null ? o.dehydrated : null, !o) throw Error(i(317));
              o[yt] = t;
            } else Tn(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
            Ue(t), o = !1;
          } else ct !== null && (_i(ct), ct = null), o = !0;
          if (!o) return t.flags & 65536 ? t : null;
        }
        return (t.flags & 128) !== 0 ? (t.lanes = n, t) : (r = r !== null, r !== (e !== null && e.memoizedState !== null) && r && (t.child.flags |= 8192, (t.mode & 1) !== 0 && (e === null || (we.current & 1) !== 0 ? _e === 0 && (_e = 3) : Mi())), t.updateQueue !== null && (t.flags |= 4), Ue(t), null);
      case 4:
        return Mn(), vi(e, t), e === null && ir(t.stateNode.containerInfo), Ue(t), null;
      case 10:
        return Ho(t.type._context), Ue(t), null;
      case 17:
        return He(t.type) && tl(), Ue(t), null;
      case 19:
        if (me(we), o = t.memoizedState, o === null) return Ue(t), null;
        if (r = (t.flags & 128) !== 0, s = o.rendering, s === null) if (r) yr(o, !1);
        else {
          if (_e !== 0 || e !== null && (e.flags & 128) !== 0) for (e = t.child; e !== null; ) {
            if (s = dl(e), s !== null) {
              for (t.flags |= 128, yr(o, !1), r = s.updateQueue, r !== null && (t.updateQueue = r, t.flags |= 4), t.subtreeFlags = 0, r = n, n = t.child; n !== null; ) o = n, e = r, o.flags &= 14680066, s = o.alternate, s === null ? (o.childLanes = 0, o.lanes = e, o.child = null, o.subtreeFlags = 0, o.memoizedProps = null, o.memoizedState = null, o.updateQueue = null, o.dependencies = null, o.stateNode = null) : (o.childLanes = s.childLanes, o.lanes = s.lanes, o.child = s.child, o.subtreeFlags = 0, o.deletions = null, o.memoizedProps = s.memoizedProps, o.memoizedState = s.memoizedState, o.updateQueue = s.updateQueue, o.type = s.type, e = s.dependencies, o.dependencies = e === null ? null : { lanes: e.lanes, firstContext: e.firstContext }), n = n.sibling;
              return de(we, we.current & 1 | 2), t.child;
            }
            e = e.sibling;
          }
          o.tail !== null && Ce() > In && (t.flags |= 128, r = !0, yr(o, !1), t.lanes = 4194304);
        }
        else {
          if (!r) if (e = dl(s), e !== null) {
            if (t.flags |= 128, r = !0, n = e.updateQueue, n !== null && (t.updateQueue = n, t.flags |= 4), yr(o, !0), o.tail === null && o.tailMode === "hidden" && !s.alternate && !ye) return Ue(t), null;
          } else 2 * Ce() - o.renderingStartTime > In && n !== 1073741824 && (t.flags |= 128, r = !0, yr(o, !1), t.lanes = 4194304);
          o.isBackwards ? (s.sibling = t.child, t.child = s) : (n = o.last, n !== null ? n.sibling = s : t.child = s, o.last = s);
        }
        return o.tail !== null ? (t = o.tail, o.rendering = t, o.tail = t.sibling, o.renderingStartTime = Ce(), t.sibling = null, n = we.current, de(we, r ? n & 1 | 2 : n & 1), t) : (Ue(t), null);
      case 22:
      case 23:
        return Li(), r = t.memoizedState !== null, e !== null && e.memoizedState !== null !== r && (t.flags |= 8192), r && (t.mode & 1) !== 0 ? (et & 1073741824) !== 0 && (Ue(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : Ue(t), null;
      case 24:
        return null;
      case 25:
        return null;
    }
    throw Error(i(156, t.tag));
  }
  function ud(e, t) {
    switch (Uo(t), t.tag) {
      case 1:
        return He(t.type) && tl(), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 3:
        return Mn(), me(We), me(Ae), Zo(), e = t.flags, (e & 65536) !== 0 && (e & 128) === 0 ? (t.flags = e & -65537 | 128, t) : null;
      case 5:
        return Yo(t), null;
      case 13:
        if (me(we), e = t.memoizedState, e !== null && e.dehydrated !== null) {
          if (t.alternate === null) throw Error(i(340));
          Tn();
        }
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 19:
        return me(we), null;
      case 4:
        return Mn(), null;
      case 10:
        return Ho(t.type._context), null;
      case 22:
      case 23:
        return Li(), null;
      case 24:
        return null;
      default:
        return null;
    }
  }
  var kl = !1, je = !1, sd = typeof WeakSet == "function" ? WeakSet : Set, D = null;
  function Dn(e, t) {
    var n = e.ref;
    if (n !== null) if (typeof n == "function") try {
      n(null);
    } catch (r) {
      Ee(e, t, r);
    }
    else n.current = null;
  }
  function gi(e, t, n) {
    try {
      n();
    } catch (r) {
      Ee(e, t, r);
    }
  }
  var Ca = !1;
  function ad(e, t) {
    if (Lo = Br, e = ts(), ko(e)) {
      if ("selectionStart" in e) var n = { start: e.selectionStart, end: e.selectionEnd };
      else e: {
        n = (n = e.ownerDocument) && n.defaultView || window;
        var r = n.getSelection && n.getSelection();
        if (r && r.rangeCount !== 0) {
          n = r.anchorNode;
          var l = r.anchorOffset, o = r.focusNode;
          r = r.focusOffset;
          try {
            n.nodeType, o.nodeType;
          } catch {
            n = null;
            break e;
          }
          var s = 0, f = -1, p = -1, S = 0, P = 0, T = e, C = null;
          t: for (; ; ) {
            for (var M; T !== n || l !== 0 && T.nodeType !== 3 || (f = s + l), T !== o || r !== 0 && T.nodeType !== 3 || (p = s + r), T.nodeType === 3 && (s += T.nodeValue.length), (M = T.firstChild) !== null; )
              C = T, T = M;
            for (; ; ) {
              if (T === e) break t;
              if (C === n && ++S === l && (f = s), C === o && ++P === r && (p = s), (M = T.nextSibling) !== null) break;
              T = C, C = T.parentNode;
            }
            T = M;
          }
          n = f === -1 || p === -1 ? null : { start: f, end: p };
        } else n = null;
      }
      n = n || { start: 0, end: 0 };
    } else n = null;
    for (Mo = { focusedElem: e, selectionRange: n }, Br = !1, D = t; D !== null; ) if (t = D, e = t.child, (t.subtreeFlags & 1028) !== 0 && e !== null) e.return = t, D = e;
    else for (; D !== null; ) {
      t = D;
      try {
        var z = t.alternate;
        if ((t.flags & 1024) !== 0) switch (t.tag) {
          case 0:
          case 11:
          case 15:
            break;
          case 1:
            if (z !== null) {
              var A = z.memoizedProps, xe = z.memoizedState, g = t.stateNode, h = g.getSnapshotBeforeUpdate(t.elementType === t.type ? A : ft(t.type, A), xe);
              g.__reactInternalSnapshotBeforeUpdate = h;
            }
            break;
          case 3:
            var w = t.stateNode.containerInfo;
            w.nodeType === 1 ? w.textContent = "" : w.nodeType === 9 && w.documentElement && w.removeChild(w.documentElement);
            break;
          case 5:
          case 6:
          case 4:
          case 17:
            break;
          default:
            throw Error(i(163));
        }
      } catch (_) {
        Ee(t, t.return, _);
      }
      if (e = t.sibling, e !== null) {
        e.return = t.return, D = e;
        break;
      }
      D = t.return;
    }
    return z = Ca, Ca = !1, z;
  }
  function wr(e, t, n) {
    var r = t.updateQueue;
    if (r = r !== null ? r.lastEffect : null, r !== null) {
      var l = r = r.next;
      do {
        if ((l.tag & e) === e) {
          var o = l.destroy;
          l.destroy = void 0, o !== void 0 && gi(t, n, o);
        }
        l = l.next;
      } while (l !== r);
    }
  }
  function El(e, t) {
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
  function yi(e) {
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
  function xa(e) {
    var t = e.alternate;
    t !== null && (e.alternate = null, xa(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && (delete t[yt], delete t[sr], delete t[Io], delete t[Qf], delete t[Kf])), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
  }
  function Pa(e) {
    return e.tag === 5 || e.tag === 3 || e.tag === 4;
  }
  function Ta(e) {
    e: for (; ; ) {
      for (; e.sibling === null; ) {
        if (e.return === null || Pa(e.return)) return null;
        e = e.return;
      }
      for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
        if (e.flags & 2 || e.child === null || e.tag === 4) continue e;
        e.child.return = e, e = e.child;
      }
      if (!(e.flags & 2)) return e.stateNode;
    }
  }
  function wi(e, t, n) {
    var r = e.tag;
    if (r === 5 || r === 6) e = e.stateNode, t ? n.nodeType === 8 ? n.parentNode.insertBefore(e, t) : n.insertBefore(e, t) : (n.nodeType === 8 ? (t = n.parentNode, t.insertBefore(e, n)) : (t = n, t.appendChild(e)), n = n._reactRootContainer, n != null || t.onclick !== null || (t.onclick = br));
    else if (r !== 4 && (e = e.child, e !== null)) for (wi(e, t, n), e = e.sibling; e !== null; ) wi(e, t, n), e = e.sibling;
  }
  function Si(e, t, n) {
    var r = e.tag;
    if (r === 5 || r === 6) e = e.stateNode, t ? n.insertBefore(e, t) : n.appendChild(e);
    else if (r !== 4 && (e = e.child, e !== null)) for (Si(e, t, n), e = e.sibling; e !== null; ) Si(e, t, n), e = e.sibling;
  }
  var Re = null, dt = !1;
  function Wt(e, t, n) {
    for (n = n.child; n !== null; ) _a(e, t, n), n = n.sibling;
  }
  function _a(e, t, n) {
    if (gt && typeof gt.onCommitFiberUnmount == "function") try {
      gt.onCommitFiberUnmount(zr, n);
    } catch {
    }
    switch (n.tag) {
      case 5:
        je || Dn(n, t);
      case 6:
        var r = Re, l = dt;
        Re = null, Wt(e, t, n), Re = r, dt = l, Re !== null && (dt ? (e = Re, n = n.stateNode, e.nodeType === 8 ? e.parentNode.removeChild(n) : e.removeChild(n)) : Re.removeChild(n.stateNode));
        break;
      case 18:
        Re !== null && (dt ? (e = Re, n = n.stateNode, e.nodeType === 8 ? Ro(e.parentNode, n) : e.nodeType === 1 && Ro(e, n), Zn(e)) : Ro(Re, n.stateNode));
        break;
      case 4:
        r = Re, l = dt, Re = n.stateNode.containerInfo, dt = !0, Wt(e, t, n), Re = r, dt = l;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        if (!je && (r = n.updateQueue, r !== null && (r = r.lastEffect, r !== null))) {
          l = r = r.next;
          do {
            var o = l, s = o.destroy;
            o = o.tag, s !== void 0 && ((o & 2) !== 0 || (o & 4) !== 0) && gi(n, t, s), l = l.next;
          } while (l !== r);
        }
        Wt(e, t, n);
        break;
      case 1:
        if (!je && (Dn(n, t), r = n.stateNode, typeof r.componentWillUnmount == "function")) try {
          r.props = n.memoizedProps, r.state = n.memoizedState, r.componentWillUnmount();
        } catch (f) {
          Ee(n, t, f);
        }
        Wt(e, t, n);
        break;
      case 21:
        Wt(e, t, n);
        break;
      case 22:
        n.mode & 1 ? (je = (r = je) || n.memoizedState !== null, Wt(e, t, n), je = r) : Wt(e, t, n);
        break;
      default:
        Wt(e, t, n);
    }
  }
  function Na(e) {
    var t = e.updateQueue;
    if (t !== null) {
      e.updateQueue = null;
      var n = e.stateNode;
      n === null && (n = e.stateNode = new sd()), t.forEach(function(r) {
        var l = yd.bind(null, e, r);
        n.has(r) || (n.add(r), r.then(l, l));
      });
    }
  }
  function pt(e, t) {
    var n = t.deletions;
    if (n !== null) for (var r = 0; r < n.length; r++) {
      var l = n[r];
      try {
        var o = e, s = t, f = s;
        e: for (; f !== null; ) {
          switch (f.tag) {
            case 5:
              Re = f.stateNode, dt = !1;
              break e;
            case 3:
              Re = f.stateNode.containerInfo, dt = !0;
              break e;
            case 4:
              Re = f.stateNode.containerInfo, dt = !0;
              break e;
          }
          f = f.return;
        }
        if (Re === null) throw Error(i(160));
        _a(o, s, l), Re = null, dt = !1;
        var p = l.alternate;
        p !== null && (p.return = null), l.return = null;
      } catch (S) {
        Ee(l, t, S);
      }
    }
    if (t.subtreeFlags & 12854) for (t = t.child; t !== null; ) La(t, e), t = t.sibling;
  }
  function La(e, t) {
    var n = e.alternate, r = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        if (pt(t, e), kt(e), r & 4) {
          try {
            wr(3, e, e.return), El(3, e);
          } catch (A) {
            Ee(e, e.return, A);
          }
          try {
            wr(5, e, e.return);
          } catch (A) {
            Ee(e, e.return, A);
          }
        }
        break;
      case 1:
        pt(t, e), kt(e), r & 512 && n !== null && Dn(n, n.return);
        break;
      case 5:
        if (pt(t, e), kt(e), r & 512 && n !== null && Dn(n, n.return), e.flags & 32) {
          var l = e.stateNode;
          try {
            Vn(l, "");
          } catch (A) {
            Ee(e, e.return, A);
          }
        }
        if (r & 4 && (l = e.stateNode, l != null)) {
          var o = e.memoizedProps, s = n !== null ? n.memoizedProps : o, f = e.type, p = e.updateQueue;
          if (e.updateQueue = null, p !== null) try {
            f === "input" && o.type === "radio" && o.name != null && ru(l, o), Jl(f, s);
            var S = Jl(f, o);
            for (s = 0; s < p.length; s += 2) {
              var P = p[s], T = p[s + 1];
              P === "style" ? fu(l, T) : P === "dangerouslySetInnerHTML" ? au(l, T) : P === "children" ? Vn(l, T) : re(l, P, T, S);
            }
            switch (f) {
              case "input":
                Ql(l, o);
                break;
              case "textarea":
                iu(l, o);
                break;
              case "select":
                var C = l._wrapperState.wasMultiple;
                l._wrapperState.wasMultiple = !!o.multiple;
                var M = o.value;
                M != null ? fn(l, !!o.multiple, M, !1) : C !== !!o.multiple && (o.defaultValue != null ? fn(
                  l,
                  !!o.multiple,
                  o.defaultValue,
                  !0
                ) : fn(l, !!o.multiple, o.multiple ? [] : "", !1));
            }
            l[sr] = o;
          } catch (A) {
            Ee(e, e.return, A);
          }
        }
        break;
      case 6:
        if (pt(t, e), kt(e), r & 4) {
          if (e.stateNode === null) throw Error(i(162));
          l = e.stateNode, o = e.memoizedProps;
          try {
            l.nodeValue = o;
          } catch (A) {
            Ee(e, e.return, A);
          }
        }
        break;
      case 3:
        if (pt(t, e), kt(e), r & 4 && n !== null && n.memoizedState.isDehydrated) try {
          Zn(t.containerInfo);
        } catch (A) {
          Ee(e, e.return, A);
        }
        break;
      case 4:
        pt(t, e), kt(e);
        break;
      case 13:
        pt(t, e), kt(e), l = e.child, l.flags & 8192 && (o = l.memoizedState !== null, l.stateNode.isHidden = o, !o || l.alternate !== null && l.alternate.memoizedState !== null || (Ci = Ce())), r & 4 && Na(e);
        break;
      case 22:
        if (P = n !== null && n.memoizedState !== null, e.mode & 1 ? (je = (S = je) || P, pt(t, e), je = S) : pt(t, e), kt(e), r & 8192) {
          if (S = e.memoizedState !== null, (e.stateNode.isHidden = S) && !P && (e.mode & 1) !== 0) for (D = e, P = e.child; P !== null; ) {
            for (T = D = P; D !== null; ) {
              switch (C = D, M = C.child, C.tag) {
                case 0:
                case 11:
                case 14:
                case 15:
                  wr(4, C, C.return);
                  break;
                case 1:
                  Dn(C, C.return);
                  var z = C.stateNode;
                  if (typeof z.componentWillUnmount == "function") {
                    r = C, n = C.return;
                    try {
                      t = r, z.props = t.memoizedProps, z.state = t.memoizedState, z.componentWillUnmount();
                    } catch (A) {
                      Ee(r, n, A);
                    }
                  }
                  break;
                case 5:
                  Dn(C, C.return);
                  break;
                case 22:
                  if (C.memoizedState !== null) {
                    Da(T);
                    continue;
                  }
              }
              M !== null ? (M.return = C, D = M) : Da(T);
            }
            P = P.sibling;
          }
          e: for (P = null, T = e; ; ) {
            if (T.tag === 5) {
              if (P === null) {
                P = T;
                try {
                  l = T.stateNode, S ? (o = l.style, typeof o.setProperty == "function" ? o.setProperty("display", "none", "important") : o.display = "none") : (f = T.stateNode, p = T.memoizedProps.style, s = p != null && p.hasOwnProperty("display") ? p.display : null, f.style.display = cu("display", s));
                } catch (A) {
                  Ee(e, e.return, A);
                }
              }
            } else if (T.tag === 6) {
              if (P === null) try {
                T.stateNode.nodeValue = S ? "" : T.memoizedProps;
              } catch (A) {
                Ee(e, e.return, A);
              }
            } else if ((T.tag !== 22 && T.tag !== 23 || T.memoizedState === null || T === e) && T.child !== null) {
              T.child.return = T, T = T.child;
              continue;
            }
            if (T === e) break e;
            for (; T.sibling === null; ) {
              if (T.return === null || T.return === e) break e;
              P === T && (P = null), T = T.return;
            }
            P === T && (P = null), T.sibling.return = T.return, T = T.sibling;
          }
        }
        break;
      case 19:
        pt(t, e), kt(e), r & 4 && Na(e);
        break;
      case 21:
        break;
      default:
        pt(
          t,
          e
        ), kt(e);
    }
  }
  function kt(e) {
    var t = e.flags;
    if (t & 2) {
      try {
        e: {
          for (var n = e.return; n !== null; ) {
            if (Pa(n)) {
              var r = n;
              break e;
            }
            n = n.return;
          }
          throw Error(i(160));
        }
        switch (r.tag) {
          case 5:
            var l = r.stateNode;
            r.flags & 32 && (Vn(l, ""), r.flags &= -33);
            var o = Ta(e);
            Si(e, o, l);
            break;
          case 3:
          case 4:
            var s = r.stateNode.containerInfo, f = Ta(e);
            wi(e, f, s);
            break;
          default:
            throw Error(i(161));
        }
      } catch (p) {
        Ee(e, e.return, p);
      }
      e.flags &= -3;
    }
    t & 4096 && (e.flags &= -4097);
  }
  function cd(e, t, n) {
    D = e, Ma(e);
  }
  function Ma(e, t, n) {
    for (var r = (e.mode & 1) !== 0; D !== null; ) {
      var l = D, o = l.child;
      if (l.tag === 22 && r) {
        var s = l.memoizedState !== null || kl;
        if (!s) {
          var f = l.alternate, p = f !== null && f.memoizedState !== null || je;
          f = kl;
          var S = je;
          if (kl = s, (je = p) && !S) for (D = l; D !== null; ) s = D, p = s.child, s.tag === 22 && s.memoizedState !== null ? Ra(l) : p !== null ? (p.return = s, D = p) : Ra(l);
          for (; o !== null; ) D = o, Ma(o), o = o.sibling;
          D = l, kl = f, je = S;
        }
        Oa(e);
      } else (l.subtreeFlags & 8772) !== 0 && o !== null ? (o.return = l, D = o) : Oa(e);
    }
  }
  function Oa(e) {
    for (; D !== null; ) {
      var t = D;
      if ((t.flags & 8772) !== 0) {
        var n = t.alternate;
        try {
          if ((t.flags & 8772) !== 0) switch (t.tag) {
            case 0:
            case 11:
            case 15:
              je || El(5, t);
              break;
            case 1:
              var r = t.stateNode;
              if (t.flags & 4 && !je) if (n === null) r.componentDidMount();
              else {
                var l = t.elementType === t.type ? n.memoizedProps : ft(t.type, n.memoizedProps);
                r.componentDidUpdate(l, n.memoizedState, r.__reactInternalSnapshotBeforeUpdate);
              }
              var o = t.updateQueue;
              o !== null && Ds(t, o, r);
              break;
            case 3:
              var s = t.updateQueue;
              if (s !== null) {
                if (n = null, t.child !== null) switch (t.child.tag) {
                  case 5:
                    n = t.child.stateNode;
                    break;
                  case 1:
                    n = t.child.stateNode;
                }
                Ds(t, s, n);
              }
              break;
            case 5:
              var f = t.stateNode;
              if (n === null && t.flags & 4) {
                n = f;
                var p = t.memoizedProps;
                switch (t.type) {
                  case "button":
                  case "input":
                  case "select":
                  case "textarea":
                    p.autoFocus && n.focus();
                    break;
                  case "img":
                    p.src && (n.src = p.src);
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
                var S = t.alternate;
                if (S !== null) {
                  var P = S.memoizedState;
                  if (P !== null) {
                    var T = P.dehydrated;
                    T !== null && Zn(T);
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
              throw Error(i(163));
          }
          je || t.flags & 512 && yi(t);
        } catch (C) {
          Ee(t, t.return, C);
        }
      }
      if (t === e) {
        D = null;
        break;
      }
      if (n = t.sibling, n !== null) {
        n.return = t.return, D = n;
        break;
      }
      D = t.return;
    }
  }
  function Da(e) {
    for (; D !== null; ) {
      var t = D;
      if (t === e) {
        D = null;
        break;
      }
      var n = t.sibling;
      if (n !== null) {
        n.return = t.return, D = n;
        break;
      }
      D = t.return;
    }
  }
  function Ra(e) {
    for (; D !== null; ) {
      var t = D;
      try {
        switch (t.tag) {
          case 0:
          case 11:
          case 15:
            var n = t.return;
            try {
              El(4, t);
            } catch (p) {
              Ee(t, n, p);
            }
            break;
          case 1:
            var r = t.stateNode;
            if (typeof r.componentDidMount == "function") {
              var l = t.return;
              try {
                r.componentDidMount();
              } catch (p) {
                Ee(t, l, p);
              }
            }
            var o = t.return;
            try {
              yi(t);
            } catch (p) {
              Ee(t, o, p);
            }
            break;
          case 5:
            var s = t.return;
            try {
              yi(t);
            } catch (p) {
              Ee(t, s, p);
            }
        }
      } catch (p) {
        Ee(t, t.return, p);
      }
      if (t === e) {
        D = null;
        break;
      }
      var f = t.sibling;
      if (f !== null) {
        f.return = t.return, D = f;
        break;
      }
      D = t.return;
    }
  }
  var fd = Math.ceil, Cl = ue.ReactCurrentDispatcher, ki = ue.ReactCurrentOwner, ot = ue.ReactCurrentBatchConfig, ne = 0, Le = null, Pe = null, Ie = 0, et = 0, Rn = Ut(0), _e = 0, Sr = null, on = 0, xl = 0, Ei = 0, kr = null, Ke = null, Ci = 0, In = 1 / 0, Mt = null, Pl = !1, xi = null, Ht = null, Tl = !1, Qt = null, _l = 0, Er = 0, Pi = null, Nl = -1, Ll = 0;
  function Be() {
    return (ne & 6) !== 0 ? Ce() : Nl !== -1 ? Nl : Nl = Ce();
  }
  function Kt(e) {
    return (e.mode & 1) === 0 ? 1 : (ne & 2) !== 0 && Ie !== 0 ? Ie & -Ie : Xf.transition !== null ? (Ll === 0 && (Ll = Tu()), Ll) : (e = ae, e !== 0 || (e = window.event, e = e === void 0 ? 16 : zu(e.type)), e);
  }
  function ht(e, t, n, r) {
    if (50 < Er) throw Er = 0, Pi = null, Error(i(185));
    Kn(e, n, r), ((ne & 2) === 0 || e !== Le) && (e === Le && ((ne & 2) === 0 && (xl |= n), _e === 4 && Gt(e, Ie)), Ge(e, r), n === 1 && ne === 0 && (t.mode & 1) === 0 && (In = Ce() + 500, rl && Vt()));
  }
  function Ge(e, t) {
    var n = e.callbackNode;
    Gc(e, t);
    var r = Ur(e, e === Le ? Ie : 0);
    if (r === 0) n !== null && Cu(n), e.callbackNode = null, e.callbackPriority = 0;
    else if (t = r & -r, e.callbackPriority !== t) {
      if (n != null && Cu(n), t === 1) e.tag === 0 ? Gf(za.bind(null, e)) : Ss(za.bind(null, e)), Wf(function() {
        (ne & 6) === 0 && Vt();
      }), n = null;
      else {
        switch (_u(r)) {
          case 1:
            n = ro;
            break;
          case 4:
            n = xu;
            break;
          case 16:
            n = Ir;
            break;
          case 536870912:
            n = Pu;
            break;
          default:
            n = Ir;
        }
        n = Wa(n, Ia.bind(null, e));
      }
      e.callbackPriority = t, e.callbackNode = n;
    }
  }
  function Ia(e, t) {
    if (Nl = -1, Ll = 0, (ne & 6) !== 0) throw Error(i(327));
    var n = e.callbackNode;
    if (zn() && e.callbackNode !== n) return null;
    var r = Ur(e, e === Le ? Ie : 0);
    if (r === 0) return null;
    if ((r & 30) !== 0 || (r & e.expiredLanes) !== 0 || t) t = Ml(e, r);
    else {
      t = r;
      var l = ne;
      ne |= 2;
      var o = Fa();
      (Le !== e || Ie !== t) && (Mt = null, In = Ce() + 500, sn(e, t));
      do
        try {
          hd();
          break;
        } catch (f) {
          Aa(e, f);
        }
      while (!0);
      Wo(), Cl.current = o, ne = l, Pe !== null ? t = 0 : (Le = null, Ie = 0, t = _e);
    }
    if (t !== 0) {
      if (t === 2 && (l = lo(e), l !== 0 && (r = l, t = Ti(e, l))), t === 1) throw n = Sr, sn(e, 0), Gt(e, r), Ge(e, Ce()), n;
      if (t === 6) Gt(e, r);
      else {
        if (l = e.current.alternate, (r & 30) === 0 && !dd(l) && (t = Ml(e, r), t === 2 && (o = lo(e), o !== 0 && (r = o, t = Ti(e, o))), t === 1)) throw n = Sr, sn(e, 0), Gt(e, r), Ge(e, Ce()), n;
        switch (e.finishedWork = l, e.finishedLanes = r, t) {
          case 0:
          case 1:
            throw Error(i(345));
          case 2:
            an(e, Ke, Mt);
            break;
          case 3:
            if (Gt(e, r), (r & 130023424) === r && (t = Ci + 500 - Ce(), 10 < t)) {
              if (Ur(e, 0) !== 0) break;
              if (l = e.suspendedLanes, (l & r) !== r) {
                Be(), e.pingedLanes |= e.suspendedLanes & l;
                break;
              }
              e.timeoutHandle = Do(an.bind(null, e, Ke, Mt), t);
              break;
            }
            an(e, Ke, Mt);
            break;
          case 4:
            if (Gt(e, r), (r & 4194240) === r) break;
            for (t = e.eventTimes, l = -1; 0 < r; ) {
              var s = 31 - st(r);
              o = 1 << s, s = t[s], s > l && (l = s), r &= ~o;
            }
            if (r = l, r = Ce() - r, r = (120 > r ? 120 : 480 > r ? 480 : 1080 > r ? 1080 : 1920 > r ? 1920 : 3e3 > r ? 3e3 : 4320 > r ? 4320 : 1960 * fd(r / 1960)) - r, 10 < r) {
              e.timeoutHandle = Do(an.bind(null, e, Ke, Mt), r);
              break;
            }
            an(e, Ke, Mt);
            break;
          case 5:
            an(e, Ke, Mt);
            break;
          default:
            throw Error(i(329));
        }
      }
    }
    return Ge(e, Ce()), e.callbackNode === n ? Ia.bind(null, e) : null;
  }
  function Ti(e, t) {
    var n = kr;
    return e.current.memoizedState.isDehydrated && (sn(e, t).flags |= 256), e = Ml(e, t), e !== 2 && (t = Ke, Ke = n, t !== null && _i(t)), e;
  }
  function _i(e) {
    Ke === null ? Ke = e : Ke.push.apply(Ke, e);
  }
  function dd(e) {
    for (var t = e; ; ) {
      if (t.flags & 16384) {
        var n = t.updateQueue;
        if (n !== null && (n = n.stores, n !== null)) for (var r = 0; r < n.length; r++) {
          var l = n[r], o = l.getSnapshot;
          l = l.value;
          try {
            if (!at(o(), l)) return !1;
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
  function Gt(e, t) {
    for (t &= ~Ei, t &= ~xl, e.suspendedLanes |= t, e.pingedLanes &= ~t, e = e.expirationTimes; 0 < t; ) {
      var n = 31 - st(t), r = 1 << n;
      e[n] = -1, t &= ~r;
    }
  }
  function za(e) {
    if ((ne & 6) !== 0) throw Error(i(327));
    zn();
    var t = Ur(e, 0);
    if ((t & 1) === 0) return Ge(e, Ce()), null;
    var n = Ml(e, t);
    if (e.tag !== 0 && n === 2) {
      var r = lo(e);
      r !== 0 && (t = r, n = Ti(e, r));
    }
    if (n === 1) throw n = Sr, sn(e, 0), Gt(e, t), Ge(e, Ce()), n;
    if (n === 6) throw Error(i(345));
    return e.finishedWork = e.current.alternate, e.finishedLanes = t, an(e, Ke, Mt), Ge(e, Ce()), null;
  }
  function Ni(e, t) {
    var n = ne;
    ne |= 1;
    try {
      return e(t);
    } finally {
      ne = n, ne === 0 && (In = Ce() + 500, rl && Vt());
    }
  }
  function un(e) {
    Qt !== null && Qt.tag === 0 && (ne & 6) === 0 && zn();
    var t = ne;
    ne |= 1;
    var n = ot.transition, r = ae;
    try {
      if (ot.transition = null, ae = 1, e) return e();
    } finally {
      ae = r, ot.transition = n, ne = t, (ne & 6) === 0 && Vt();
    }
  }
  function Li() {
    et = Rn.current, me(Rn);
  }
  function sn(e, t) {
    e.finishedWork = null, e.finishedLanes = 0;
    var n = e.timeoutHandle;
    if (n !== -1 && (e.timeoutHandle = -1, $f(n)), Pe !== null) for (n = Pe.return; n !== null; ) {
      var r = n;
      switch (Uo(r), r.tag) {
        case 1:
          r = r.type.childContextTypes, r != null && tl();
          break;
        case 3:
          Mn(), me(We), me(Ae), Zo();
          break;
        case 5:
          Yo(r);
          break;
        case 4:
          Mn();
          break;
        case 13:
          me(we);
          break;
        case 19:
          me(we);
          break;
        case 10:
          Ho(r.type._context);
          break;
        case 22:
        case 23:
          Li();
      }
      n = n.return;
    }
    if (Le = e, Pe = e = Xt(e.current, null), Ie = et = t, _e = 0, Sr = null, Ei = xl = on = 0, Ke = kr = null, nn !== null) {
      for (t = 0; t < nn.length; t++) if (n = nn[t], r = n.interleaved, r !== null) {
        n.interleaved = null;
        var l = r.next, o = n.pending;
        if (o !== null) {
          var s = o.next;
          o.next = l, r.next = s;
        }
        n.pending = r;
      }
      nn = null;
    }
    return e;
  }
  function Aa(e, t) {
    do {
      var n = Pe;
      try {
        if (Wo(), pl.current = gl, hl) {
          for (var r = Se.memoizedState; r !== null; ) {
            var l = r.queue;
            l !== null && (l.pending = null), r = r.next;
          }
          hl = !1;
        }
        if (ln = 0, Ne = Te = Se = null, hr = !1, mr = 0, ki.current = null, n === null || n.return === null) {
          _e = 1, Sr = t, Pe = null;
          break;
        }
        e: {
          var o = e, s = n.return, f = n, p = t;
          if (t = Ie, f.flags |= 32768, p !== null && typeof p == "object" && typeof p.then == "function") {
            var S = p, P = f, T = P.tag;
            if ((P.mode & 1) === 0 && (T === 0 || T === 11 || T === 15)) {
              var C = P.alternate;
              C ? (P.updateQueue = C.updateQueue, P.memoizedState = C.memoizedState, P.lanes = C.lanes) : (P.updateQueue = null, P.memoizedState = null);
            }
            var M = ua(s);
            if (M !== null) {
              M.flags &= -257, sa(M, s, f, o, t), M.mode & 1 && ia(o, S, t), t = M, p = S;
              var z = t.updateQueue;
              if (z === null) {
                var A = /* @__PURE__ */ new Set();
                A.add(p), t.updateQueue = A;
              } else z.add(p);
              break e;
            } else {
              if ((t & 1) === 0) {
                ia(o, S, t), Mi();
                break e;
              }
              p = Error(i(426));
            }
          } else if (ye && f.mode & 1) {
            var xe = ua(s);
            if (xe !== null) {
              (xe.flags & 65536) === 0 && (xe.flags |= 256), sa(xe, s, f, o, t), Bo(On(p, f));
              break e;
            }
          }
          o = p = On(p, f), _e !== 4 && (_e = 2), kr === null ? kr = [o] : kr.push(o), o = s;
          do {
            switch (o.tag) {
              case 3:
                o.flags |= 65536, t &= -t, o.lanes |= t;
                var g = la(o, p, t);
                Os(o, g);
                break e;
              case 1:
                f = p;
                var h = o.type, w = o.stateNode;
                if ((o.flags & 128) === 0 && (typeof h.getDerivedStateFromError == "function" || w !== null && typeof w.componentDidCatch == "function" && (Ht === null || !Ht.has(w)))) {
                  o.flags |= 65536, t &= -t, o.lanes |= t;
                  var _ = oa(o, f, t);
                  Os(o, _);
                  break e;
                }
            }
            o = o.return;
          } while (o !== null);
        }
        ja(n);
      } catch (F) {
        t = F, Pe === n && n !== null && (Pe = n = n.return);
        continue;
      }
      break;
    } while (!0);
  }
  function Fa() {
    var e = Cl.current;
    return Cl.current = gl, e === null ? gl : e;
  }
  function Mi() {
    (_e === 0 || _e === 3 || _e === 2) && (_e = 4), Le === null || (on & 268435455) === 0 && (xl & 268435455) === 0 || Gt(Le, Ie);
  }
  function Ml(e, t) {
    var n = ne;
    ne |= 2;
    var r = Fa();
    (Le !== e || Ie !== t) && (Mt = null, sn(e, t));
    do
      try {
        pd();
        break;
      } catch (l) {
        Aa(e, l);
      }
    while (!0);
    if (Wo(), ne = n, Cl.current = r, Pe !== null) throw Error(i(261));
    return Le = null, Ie = 0, _e;
  }
  function pd() {
    for (; Pe !== null; ) Ua(Pe);
  }
  function hd() {
    for (; Pe !== null && !Uc(); ) Ua(Pe);
  }
  function Ua(e) {
    var t = $a(e.alternate, e, et);
    e.memoizedProps = e.pendingProps, t === null ? ja(e) : Pe = t, ki.current = null;
  }
  function ja(e) {
    var t = e;
    do {
      var n = t.alternate;
      if (e = t.return, (t.flags & 32768) === 0) {
        if (n = id(n, t, et), n !== null) {
          Pe = n;
          return;
        }
      } else {
        if (n = ud(n, t), n !== null) {
          n.flags &= 32767, Pe = n;
          return;
        }
        if (e !== null) e.flags |= 32768, e.subtreeFlags = 0, e.deletions = null;
        else {
          _e = 6, Pe = null;
          return;
        }
      }
      if (t = t.sibling, t !== null) {
        Pe = t;
        return;
      }
      Pe = t = e;
    } while (t !== null);
    _e === 0 && (_e = 5);
  }
  function an(e, t, n) {
    var r = ae, l = ot.transition;
    try {
      ot.transition = null, ae = 1, md(e, t, n, r);
    } finally {
      ot.transition = l, ae = r;
    }
    return null;
  }
  function md(e, t, n, r) {
    do
      zn();
    while (Qt !== null);
    if ((ne & 6) !== 0) throw Error(i(327));
    n = e.finishedWork;
    var l = e.finishedLanes;
    if (n === null) return null;
    if (e.finishedWork = null, e.finishedLanes = 0, n === e.current) throw Error(i(177));
    e.callbackNode = null, e.callbackPriority = 0;
    var o = n.lanes | n.childLanes;
    if (Xc(e, o), e === Le && (Pe = Le = null, Ie = 0), (n.subtreeFlags & 2064) === 0 && (n.flags & 2064) === 0 || Tl || (Tl = !0, Wa(Ir, function() {
      return zn(), null;
    })), o = (n.flags & 15990) !== 0, (n.subtreeFlags & 15990) !== 0 || o) {
      o = ot.transition, ot.transition = null;
      var s = ae;
      ae = 1;
      var f = ne;
      ne |= 4, ki.current = null, ad(e, n), La(n, e), zf(Mo), Br = !!Lo, Mo = Lo = null, e.current = n, cd(n), jc(), ne = f, ae = s, ot.transition = o;
    } else e.current = n;
    if (Tl && (Tl = !1, Qt = e, _l = l), o = e.pendingLanes, o === 0 && (Ht = null), $c(n.stateNode), Ge(e, Ce()), t !== null) for (r = e.onRecoverableError, n = 0; n < t.length; n++) l = t[n], r(l.value, { componentStack: l.stack, digest: l.digest });
    if (Pl) throw Pl = !1, e = xi, xi = null, e;
    return (_l & 1) !== 0 && e.tag !== 0 && zn(), o = e.pendingLanes, (o & 1) !== 0 ? e === Pi ? Er++ : (Er = 0, Pi = e) : Er = 0, Vt(), null;
  }
  function zn() {
    if (Qt !== null) {
      var e = _u(_l), t = ot.transition, n = ae;
      try {
        if (ot.transition = null, ae = 16 > e ? 16 : e, Qt === null) var r = !1;
        else {
          if (e = Qt, Qt = null, _l = 0, (ne & 6) !== 0) throw Error(i(331));
          var l = ne;
          for (ne |= 4, D = e.current; D !== null; ) {
            var o = D, s = o.child;
            if ((D.flags & 16) !== 0) {
              var f = o.deletions;
              if (f !== null) {
                for (var p = 0; p < f.length; p++) {
                  var S = f[p];
                  for (D = S; D !== null; ) {
                    var P = D;
                    switch (P.tag) {
                      case 0:
                      case 11:
                      case 15:
                        wr(8, P, o);
                    }
                    var T = P.child;
                    if (T !== null) T.return = P, D = T;
                    else for (; D !== null; ) {
                      P = D;
                      var C = P.sibling, M = P.return;
                      if (xa(P), P === S) {
                        D = null;
                        break;
                      }
                      if (C !== null) {
                        C.return = M, D = C;
                        break;
                      }
                      D = M;
                    }
                  }
                }
                var z = o.alternate;
                if (z !== null) {
                  var A = z.child;
                  if (A !== null) {
                    z.child = null;
                    do {
                      var xe = A.sibling;
                      A.sibling = null, A = xe;
                    } while (A !== null);
                  }
                }
                D = o;
              }
            }
            if ((o.subtreeFlags & 2064) !== 0 && s !== null) s.return = o, D = s;
            else e: for (; D !== null; ) {
              if (o = D, (o.flags & 2048) !== 0) switch (o.tag) {
                case 0:
                case 11:
                case 15:
                  wr(9, o, o.return);
              }
              var g = o.sibling;
              if (g !== null) {
                g.return = o.return, D = g;
                break e;
              }
              D = o.return;
            }
          }
          var h = e.current;
          for (D = h; D !== null; ) {
            s = D;
            var w = s.child;
            if ((s.subtreeFlags & 2064) !== 0 && w !== null) w.return = s, D = w;
            else e: for (s = h; D !== null; ) {
              if (f = D, (f.flags & 2048) !== 0) try {
                switch (f.tag) {
                  case 0:
                  case 11:
                  case 15:
                    El(9, f);
                }
              } catch (F) {
                Ee(f, f.return, F);
              }
              if (f === s) {
                D = null;
                break e;
              }
              var _ = f.sibling;
              if (_ !== null) {
                _.return = f.return, D = _;
                break e;
              }
              D = f.return;
            }
          }
          if (ne = l, Vt(), gt && typeof gt.onPostCommitFiberRoot == "function") try {
            gt.onPostCommitFiberRoot(zr, e);
          } catch {
          }
          r = !0;
        }
        return r;
      } finally {
        ae = n, ot.transition = t;
      }
    }
    return !1;
  }
  function Va(e, t, n) {
    t = On(n, t), t = la(e, t, 1), e = $t(e, t, 1), t = Be(), e !== null && (Kn(e, 1, t), Ge(e, t));
  }
  function Ee(e, t, n) {
    if (e.tag === 3) Va(e, e, n);
    else for (; t !== null; ) {
      if (t.tag === 3) {
        Va(t, e, n);
        break;
      } else if (t.tag === 1) {
        var r = t.stateNode;
        if (typeof t.type.getDerivedStateFromError == "function" || typeof r.componentDidCatch == "function" && (Ht === null || !Ht.has(r))) {
          e = On(n, e), e = oa(t, e, 1), t = $t(t, e, 1), e = Be(), t !== null && (Kn(t, 1, e), Ge(t, e));
          break;
        }
      }
      t = t.return;
    }
  }
  function vd(e, t, n) {
    var r = e.pingCache;
    r !== null && r.delete(t), t = Be(), e.pingedLanes |= e.suspendedLanes & n, Le === e && (Ie & n) === n && (_e === 4 || _e === 3 && (Ie & 130023424) === Ie && 500 > Ce() - Ci ? sn(e, 0) : Ei |= n), Ge(e, t);
  }
  function Ba(e, t) {
    t === 0 && ((e.mode & 1) === 0 ? t = 1 : (t = Fr, Fr <<= 1, (Fr & 130023424) === 0 && (Fr = 4194304)));
    var n = Be();
    e = _t(e, t), e !== null && (Kn(e, t, n), Ge(e, n));
  }
  function gd(e) {
    var t = e.memoizedState, n = 0;
    t !== null && (n = t.retryLane), Ba(e, n);
  }
  function yd(e, t) {
    var n = 0;
    switch (e.tag) {
      case 13:
        var r = e.stateNode, l = e.memoizedState;
        l !== null && (n = l.retryLane);
        break;
      case 19:
        r = e.stateNode;
        break;
      default:
        throw Error(i(314));
    }
    r !== null && r.delete(t), Ba(e, n);
  }
  var $a;
  $a = function(e, t, n) {
    if (e !== null) if (e.memoizedProps !== t.pendingProps || We.current) Qe = !0;
    else {
      if ((e.lanes & n) === 0 && (t.flags & 128) === 0) return Qe = !1, od(e, t, n);
      Qe = (e.flags & 131072) !== 0;
    }
    else Qe = !1, ye && (t.flags & 1048576) !== 0 && ks(t, ol, t.index);
    switch (t.lanes = 0, t.tag) {
      case 2:
        var r = t.type;
        Sl(e, t), e = t.pendingProps;
        var l = Cn(t, Ae.current);
        Ln(t, n), l = ei(null, t, r, e, l, n);
        var o = ti();
        return t.flags |= 1, typeof l == "object" && l !== null && typeof l.render == "function" && l.$$typeof === void 0 ? (t.tag = 1, t.memoizedState = null, t.updateQueue = null, He(r) ? (o = !0, nl(t)) : o = !1, t.memoizedState = l.state !== null && l.state !== void 0 ? l.state : null, Go(t), l.updater = yl, t.stateNode = l, l._reactInternals = t, ui(t, r, e, n), t = fi(null, t, r, !0, o, n)) : (t.tag = 0, ye && o && Fo(t), Ve(null, t, l, n), t = t.child), t;
      case 16:
        r = t.elementType;
        e: {
          switch (Sl(e, t), e = t.pendingProps, l = r._init, r = l(r._payload), t.type = r, l = t.tag = Sd(r), e = ft(r, e), l) {
            case 0:
              t = ci(null, t, r, e, n);
              break e;
            case 1:
              t = ha(null, t, r, e, n);
              break e;
            case 11:
              t = aa(null, t, r, e, n);
              break e;
            case 14:
              t = ca(null, t, r, ft(r.type, e), n);
              break e;
          }
          throw Error(i(
            306,
            r,
            ""
          ));
        }
        return t;
      case 0:
        return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : ft(r, l), ci(e, t, r, l, n);
      case 1:
        return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : ft(r, l), ha(e, t, r, l, n);
      case 3:
        e: {
          if (ma(t), e === null) throw Error(i(387));
          r = t.pendingProps, o = t.memoizedState, l = o.element, Ms(e, t), fl(t, r, null, n);
          var s = t.memoizedState;
          if (r = s.element, o.isDehydrated) if (o = { element: r, isDehydrated: !1, cache: s.cache, pendingSuspenseBoundaries: s.pendingSuspenseBoundaries, transitions: s.transitions }, t.updateQueue.baseState = o, t.memoizedState = o, t.flags & 256) {
            l = On(Error(i(423)), t), t = va(e, t, r, n, l);
            break e;
          } else if (r !== l) {
            l = On(Error(i(424)), t), t = va(e, t, r, n, l);
            break e;
          } else for (be = Ft(t.stateNode.containerInfo.firstChild), qe = t, ye = !0, ct = null, n = Ns(t, null, r, n), t.child = n; n; ) n.flags = n.flags & -3 | 4096, n = n.sibling;
          else {
            if (Tn(), r === l) {
              t = Lt(e, t, n);
              break e;
            }
            Ve(e, t, r, n);
          }
          t = t.child;
        }
        return t;
      case 5:
        return Rs(t), e === null && Vo(t), r = t.type, l = t.pendingProps, o = e !== null ? e.memoizedProps : null, s = l.children, Oo(r, l) ? s = null : o !== null && Oo(r, o) && (t.flags |= 32), pa(e, t), Ve(e, t, s, n), t.child;
      case 6:
        return e === null && Vo(t), null;
      case 13:
        return ga(e, t, n);
      case 4:
        return Xo(t, t.stateNode.containerInfo), r = t.pendingProps, e === null ? t.child = _n(t, null, r, n) : Ve(e, t, r, n), t.child;
      case 11:
        return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : ft(r, l), aa(e, t, r, l, n);
      case 7:
        return Ve(e, t, t.pendingProps, n), t.child;
      case 8:
        return Ve(e, t, t.pendingProps.children, n), t.child;
      case 12:
        return Ve(e, t, t.pendingProps.children, n), t.child;
      case 10:
        e: {
          if (r = t.type._context, l = t.pendingProps, o = t.memoizedProps, s = l.value, de(sl, r._currentValue), r._currentValue = s, o !== null) if (at(o.value, s)) {
            if (o.children === l.children && !We.current) {
              t = Lt(e, t, n);
              break e;
            }
          } else for (o = t.child, o !== null && (o.return = t); o !== null; ) {
            var f = o.dependencies;
            if (f !== null) {
              s = o.child;
              for (var p = f.firstContext; p !== null; ) {
                if (p.context === r) {
                  if (o.tag === 1) {
                    p = Nt(-1, n & -n), p.tag = 2;
                    var S = o.updateQueue;
                    if (S !== null) {
                      S = S.shared;
                      var P = S.pending;
                      P === null ? p.next = p : (p.next = P.next, P.next = p), S.pending = p;
                    }
                  }
                  o.lanes |= n, p = o.alternate, p !== null && (p.lanes |= n), Qo(
                    o.return,
                    n,
                    t
                  ), f.lanes |= n;
                  break;
                }
                p = p.next;
              }
            } else if (o.tag === 10) s = o.type === t.type ? null : o.child;
            else if (o.tag === 18) {
              if (s = o.return, s === null) throw Error(i(341));
              s.lanes |= n, f = s.alternate, f !== null && (f.lanes |= n), Qo(s, n, t), s = o.sibling;
            } else s = o.child;
            if (s !== null) s.return = o;
            else for (s = o; s !== null; ) {
              if (s === t) {
                s = null;
                break;
              }
              if (o = s.sibling, o !== null) {
                o.return = s.return, s = o;
                break;
              }
              s = s.return;
            }
            o = s;
          }
          Ve(e, t, l.children, n), t = t.child;
        }
        return t;
      case 9:
        return l = t.type, r = t.pendingProps.children, Ln(t, n), l = rt(l), r = r(l), t.flags |= 1, Ve(e, t, r, n), t.child;
      case 14:
        return r = t.type, l = ft(r, t.pendingProps), l = ft(r.type, l), ca(e, t, r, l, n);
      case 15:
        return fa(e, t, t.type, t.pendingProps, n);
      case 17:
        return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : ft(r, l), Sl(e, t), t.tag = 1, He(r) ? (e = !0, nl(t)) : e = !1, Ln(t, n), na(t, r, l), ui(t, r, l, n), fi(null, t, r, !0, e, n);
      case 19:
        return wa(e, t, n);
      case 22:
        return da(e, t, n);
    }
    throw Error(i(156, t.tag));
  };
  function Wa(e, t) {
    return Eu(e, t);
  }
  function wd(e, t, n, r) {
    this.tag = e, this.key = n, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = r, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function it(e, t, n, r) {
    return new wd(e, t, n, r);
  }
  function Oi(e) {
    return e = e.prototype, !(!e || !e.isReactComponent);
  }
  function Sd(e) {
    if (typeof e == "function") return Oi(e) ? 1 : 0;
    if (e != null) {
      if (e = e.$$typeof, e === mt) return 11;
      if (e === vt) return 14;
    }
    return 2;
  }
  function Xt(e, t) {
    var n = e.alternate;
    return n === null ? (n = it(e.tag, t, e.key, e.mode), n.elementType = e.elementType, n.type = e.type, n.stateNode = e.stateNode, n.alternate = e, e.alternate = n) : (n.pendingProps = t, n.type = e.type, n.flags = 0, n.subtreeFlags = 0, n.deletions = null), n.flags = e.flags & 14680064, n.childLanes = e.childLanes, n.lanes = e.lanes, n.child = e.child, n.memoizedProps = e.memoizedProps, n.memoizedState = e.memoizedState, n.updateQueue = e.updateQueue, t = e.dependencies, n.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }, n.sibling = e.sibling, n.index = e.index, n.ref = e.ref, n;
  }
  function Ol(e, t, n, r, l, o) {
    var s = 2;
    if (r = e, typeof e == "function") Oi(e) && (s = 1);
    else if (typeof e == "string") s = 5;
    else e: switch (e) {
      case Z:
        return cn(n.children, l, o, t);
      case ce:
        s = 8, l |= 8;
        break;
      case pe:
        return e = it(12, n, t, l | 2), e.elementType = pe, e.lanes = o, e;
      case Ye:
        return e = it(13, n, t, l), e.elementType = Ye, e.lanes = o, e;
      case ut:
        return e = it(19, n, t, l), e.elementType = ut, e.lanes = o, e;
      case ke:
        return Dl(n, l, o, t);
      default:
        if (typeof e == "object" && e !== null) switch (e.$$typeof) {
          case De:
            s = 10;
            break e;
          case Jt:
            s = 9;
            break e;
          case mt:
            s = 11;
            break e;
          case vt:
            s = 14;
            break e;
          case $e:
            s = 16, r = null;
            break e;
        }
        throw Error(i(130, e == null ? e : typeof e, ""));
    }
    return t = it(s, n, t, l), t.elementType = e, t.type = r, t.lanes = o, t;
  }
  function cn(e, t, n, r) {
    return e = it(7, e, r, t), e.lanes = n, e;
  }
  function Dl(e, t, n, r) {
    return e = it(22, e, r, t), e.elementType = ke, e.lanes = n, e.stateNode = { isHidden: !1 }, e;
  }
  function Di(e, t, n) {
    return e = it(6, e, null, t), e.lanes = n, e;
  }
  function Ri(e, t, n) {
    return t = it(4, e.children !== null ? e.children : [], e.key, t), t.lanes = n, t.stateNode = { containerInfo: e.containerInfo, pendingChildren: null, implementation: e.implementation }, t;
  }
  function kd(e, t, n, r, l) {
    this.tag = t, this.containerInfo = e, this.finishedWork = this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.pendingContext = this.context = null, this.callbackPriority = 0, this.eventTimes = oo(0), this.expirationTimes = oo(-1), this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = oo(0), this.identifierPrefix = r, this.onRecoverableError = l, this.mutableSourceEagerHydrationData = null;
  }
  function Ii(e, t, n, r, l, o, s, f, p) {
    return e = new kd(e, t, n, f, p), t === 1 ? (t = 1, o === !0 && (t |= 8)) : t = 0, o = it(3, null, null, t), e.current = o, o.stateNode = e, o.memoizedState = { element: r, isDehydrated: n, cache: null, transitions: null, pendingSuspenseBoundaries: null }, Go(o), e;
  }
  function Ed(e, t, n) {
    var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return { $$typeof: W, key: r == null ? null : "" + r, children: e, containerInfo: t, implementation: n };
  }
  function Ha(e) {
    if (!e) return jt;
    e = e._reactInternals;
    e: {
      if (Zt(e) !== e || e.tag !== 1) throw Error(i(170));
      var t = e;
      do {
        switch (t.tag) {
          case 3:
            t = t.stateNode.context;
            break e;
          case 1:
            if (He(t.type)) {
              t = t.stateNode.__reactInternalMemoizedMergedChildContext;
              break e;
            }
        }
        t = t.return;
      } while (t !== null);
      throw Error(i(171));
    }
    if (e.tag === 1) {
      var n = e.type;
      if (He(n)) return ys(e, n, t);
    }
    return t;
  }
  function Qa(e, t, n, r, l, o, s, f, p) {
    return e = Ii(n, r, !0, e, l, o, s, f, p), e.context = Ha(null), n = e.current, r = Be(), l = Kt(n), o = Nt(r, l), o.callback = t ?? null, $t(n, o, l), e.current.lanes = l, Kn(e, l, r), Ge(e, r), e;
  }
  function Rl(e, t, n, r) {
    var l = t.current, o = Be(), s = Kt(l);
    return n = Ha(n), t.context === null ? t.context = n : t.pendingContext = n, t = Nt(o, s), t.payload = { element: e }, r = r === void 0 ? null : r, r !== null && (t.callback = r), e = $t(l, t, s), e !== null && (ht(e, l, s, o), cl(e, l, s)), s;
  }
  function Il(e) {
    if (e = e.current, !e.child) return null;
    switch (e.child.tag) {
      case 5:
        return e.child.stateNode;
      default:
        return e.child.stateNode;
    }
  }
  function Ka(e, t) {
    if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
      var n = e.retryLane;
      e.retryLane = n !== 0 && n < t ? n : t;
    }
  }
  function zi(e, t) {
    Ka(e, t), (e = e.alternate) && Ka(e, t);
  }
  function Cd() {
    return null;
  }
  var Ga = typeof reportError == "function" ? reportError : function(e) {
    console.error(e);
  };
  function Ai(e) {
    this._internalRoot = e;
  }
  zl.prototype.render = Ai.prototype.render = function(e) {
    var t = this._internalRoot;
    if (t === null) throw Error(i(409));
    Rl(e, t, null, null);
  }, zl.prototype.unmount = Ai.prototype.unmount = function() {
    var e = this._internalRoot;
    if (e !== null) {
      this._internalRoot = null;
      var t = e.containerInfo;
      un(function() {
        Rl(null, e, null, null);
      }), t[Ct] = null;
    }
  };
  function zl(e) {
    this._internalRoot = e;
  }
  zl.prototype.unstable_scheduleHydration = function(e) {
    if (e) {
      var t = Mu();
      e = { blockedOn: null, target: e, priority: t };
      for (var n = 0; n < It.length && t !== 0 && t < It[n].priority; n++) ;
      It.splice(n, 0, e), n === 0 && Ru(e);
    }
  };
  function Fi(e) {
    return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
  }
  function Al(e) {
    return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11 && (e.nodeType !== 8 || e.nodeValue !== " react-mount-point-unstable "));
  }
  function Xa() {
  }
  function xd(e, t, n, r, l) {
    if (l) {
      if (typeof r == "function") {
        var o = r;
        r = function() {
          var S = Il(s);
          o.call(S);
        };
      }
      var s = Qa(t, r, e, 0, null, !1, !1, "", Xa);
      return e._reactRootContainer = s, e[Ct] = s.current, ir(e.nodeType === 8 ? e.parentNode : e), un(), s;
    }
    for (; l = e.lastChild; ) e.removeChild(l);
    if (typeof r == "function") {
      var f = r;
      r = function() {
        var S = Il(p);
        f.call(S);
      };
    }
    var p = Ii(e, 0, !1, null, null, !1, !1, "", Xa);
    return e._reactRootContainer = p, e[Ct] = p.current, ir(e.nodeType === 8 ? e.parentNode : e), un(function() {
      Rl(t, p, n, r);
    }), p;
  }
  function Fl(e, t, n, r, l) {
    var o = n._reactRootContainer;
    if (o) {
      var s = o;
      if (typeof l == "function") {
        var f = l;
        l = function() {
          var p = Il(s);
          f.call(p);
        };
      }
      Rl(t, s, e, l);
    } else s = xd(n, t, e, l, r);
    return Il(s);
  }
  Nu = function(e) {
    switch (e.tag) {
      case 3:
        var t = e.stateNode;
        if (t.current.memoizedState.isDehydrated) {
          var n = Qn(t.pendingLanes);
          n !== 0 && (io(t, n | 1), Ge(t, Ce()), (ne & 6) === 0 && (In = Ce() + 500, Vt()));
        }
        break;
      case 13:
        un(function() {
          var r = _t(e, 1);
          if (r !== null) {
            var l = Be();
            ht(r, e, 1, l);
          }
        }), zi(e, 1);
    }
  }, uo = function(e) {
    if (e.tag === 13) {
      var t = _t(e, 134217728);
      if (t !== null) {
        var n = Be();
        ht(t, e, 134217728, n);
      }
      zi(e, 134217728);
    }
  }, Lu = function(e) {
    if (e.tag === 13) {
      var t = Kt(e), n = _t(e, t);
      if (n !== null) {
        var r = Be();
        ht(n, e, t, r);
      }
      zi(e, t);
    }
  }, Mu = function() {
    return ae;
  }, Ou = function(e, t) {
    var n = ae;
    try {
      return ae = e, t();
    } finally {
      ae = n;
    }
  }, bl = function(e, t, n) {
    switch (t) {
      case "input":
        if (Ql(e, n), t = n.name, n.type === "radio" && t != null) {
          for (n = e; n.parentNode; ) n = n.parentNode;
          for (n = n.querySelectorAll("input[name=" + JSON.stringify("" + t) + '][type="radio"]'), t = 0; t < n.length; t++) {
            var r = n[t];
            if (r !== e && r.form === e.form) {
              var l = el(r);
              if (!l) throw Error(i(90));
              tu(r), Ql(r, l);
            }
          }
        }
        break;
      case "textarea":
        iu(e, n);
        break;
      case "select":
        t = n.value, t != null && fn(e, !!n.multiple, t, !1);
    }
  }, mu = Ni, vu = un;
  var Pd = { usingClientEntryPoint: !1, Events: [ar, kn, el, pu, hu, Ni] }, Cr = { findFiberByHostInstance: qt, bundleType: 0, version: "18.3.1", rendererPackageName: "react-dom" }, Td = { bundleType: Cr.bundleType, version: Cr.version, rendererPackageName: Cr.rendererPackageName, rendererConfig: Cr.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setErrorHandler: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: ue.ReactCurrentDispatcher, findHostInstanceByFiber: function(e) {
    return e = Su(e), e === null ? null : e.stateNode;
  }, findFiberByHostInstance: Cr.findFiberByHostInstance || Cd, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null, reconcilerVersion: "18.3.1-next-f1338f8080-20240426" };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var Ul = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Ul.isDisabled && Ul.supportsFiber) try {
      zr = Ul.inject(Td), gt = Ul;
    } catch {
    }
  }
  return Xe.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Pd, Xe.createPortal = function(e, t) {
    var n = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!Fi(t)) throw Error(i(200));
    return Ed(e, t, null, n);
  }, Xe.createRoot = function(e, t) {
    if (!Fi(e)) throw Error(i(299));
    var n = !1, r = "", l = Ga;
    return t != null && (t.unstable_strictMode === !0 && (n = !0), t.identifierPrefix !== void 0 && (r = t.identifierPrefix), t.onRecoverableError !== void 0 && (l = t.onRecoverableError)), t = Ii(e, 1, !1, null, null, n, !1, r, l), e[Ct] = t.current, ir(e.nodeType === 8 ? e.parentNode : e), new Ai(t);
  }, Xe.findDOMNode = function(e) {
    if (e == null) return null;
    if (e.nodeType === 1) return e;
    var t = e._reactInternals;
    if (t === void 0)
      throw typeof e.render == "function" ? Error(i(188)) : (e = Object.keys(e).join(","), Error(i(268, e)));
    return e = Su(t), e = e === null ? null : e.stateNode, e;
  }, Xe.flushSync = function(e) {
    return un(e);
  }, Xe.hydrate = function(e, t, n) {
    if (!Al(t)) throw Error(i(200));
    return Fl(null, e, t, !0, n);
  }, Xe.hydrateRoot = function(e, t, n) {
    if (!Fi(e)) throw Error(i(405));
    var r = n != null && n.hydratedSources || null, l = !1, o = "", s = Ga;
    if (n != null && (n.unstable_strictMode === !0 && (l = !0), n.identifierPrefix !== void 0 && (o = n.identifierPrefix), n.onRecoverableError !== void 0 && (s = n.onRecoverableError)), t = Qa(t, null, e, 1, n ?? null, l, !1, o, s), e[Ct] = t.current, ir(e), r) for (e = 0; e < r.length; e++) n = r[e], l = n._getVersion, l = l(n._source), t.mutableSourceEagerHydrationData == null ? t.mutableSourceEagerHydrationData = [n, l] : t.mutableSourceEagerHydrationData.push(
      n,
      l
    );
    return new zl(t);
  }, Xe.render = function(e, t, n) {
    if (!Al(t)) throw Error(i(200));
    return Fl(null, e, t, !1, n);
  }, Xe.unmountComponentAtNode = function(e) {
    if (!Al(e)) throw Error(i(40));
    return e._reactRootContainer ? (un(function() {
      Fl(null, null, e, !1, function() {
        e._reactRootContainer = null, e[Ct] = null;
      });
    }), !0) : !1;
  }, Xe.unstable_batchedUpdates = Ni, Xe.unstable_renderSubtreeIntoContainer = function(e, t, n, r) {
    if (!Al(n)) throw Error(i(200));
    if (e == null || e._reactInternals === void 0) throw Error(i(38));
    return Fl(e, t, n, !1, r);
  }, Xe.version = "18.3.1-next-f1338f8080-20240426", Xe;
}
var ec;
function zd() {
  if (ec) return ji.exports;
  ec = 1;
  function u() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(u);
      } catch (d) {
        console.error(d);
      }
  }
  return u(), ji.exports = Id(), ji.exports;
}
var tc;
function Ad() {
  if (tc) return jl;
  tc = 1;
  var u = zd();
  return jl.createRoot = u.createRoot, jl.hydrateRoot = u.hydrateRoot, jl;
}
var Fd = Ad();
const vc = Object.freeze(
  {
    left: 0,
    top: 0,
    width: 16,
    height: 16
  }
), $l = Object.freeze({
  rotate: 0,
  vFlip: !1,
  hFlip: !1
}), Zi = Object.freeze({
  ...vc,
  ...$l
}), Qi = Object.freeze({
  ...Zi,
  body: "",
  hidden: !1
});
function Ud(u, d) {
  const i = {};
  !u.hFlip != !d.hFlip && (i.hFlip = !0), !u.vFlip != !d.vFlip && (i.vFlip = !0);
  const a = ((u.rotate || 0) + (d.rotate || 0)) % 4;
  return a && (i.rotate = a), i;
}
function nc(u, d) {
  const i = Ud(u, d);
  for (const a in Qi)
    a in $l ? a in u && !(a in i) && (i[a] = $l[a]) : a in d ? i[a] = d[a] : a in u && (i[a] = u[a]);
  return i;
}
function jd(u, d) {
  const i = u.icons, a = u.aliases || /* @__PURE__ */ Object.create(null), c = /* @__PURE__ */ Object.create(null);
  function m(y) {
    if (i[y])
      return c[y] = [];
    if (!(y in c)) {
      c[y] = null;
      const k = a[y] && a[y].parent, E = k && m(k);
      E && (c[y] = [k].concat(E));
    }
    return c[y];
  }
  return Object.keys(i).concat(Object.keys(a)).forEach(m), c;
}
function Vd(u, d, i) {
  const a = u.icons, c = u.aliases || /* @__PURE__ */ Object.create(null);
  let m = {};
  function y(k) {
    m = nc(
      a[k] || c[k],
      m
    );
  }
  return y(d), i.forEach(y), nc(u, m);
}
function gc(u, d) {
  const i = [];
  if (typeof u != "object" || typeof u.icons != "object")
    return i;
  u.not_found instanceof Array && u.not_found.forEach((c) => {
    d(c, null), i.push(c);
  });
  const a = jd(u);
  for (const c in a) {
    const m = a[c];
    m && (d(c, Vd(u, c, m)), i.push(c));
  }
  return i;
}
const Bd = {
  provider: "",
  aliases: {},
  not_found: {},
  ...vc
};
function $i(u, d) {
  for (const i in d)
    if (i in u && typeof u[i] != typeof d[i])
      return !1;
  return !0;
}
function yc(u) {
  if (typeof u != "object" || u === null)
    return null;
  const d = u;
  if (typeof d.prefix != "string" || !u.icons || typeof u.icons != "object" || !$i(u, Bd))
    return null;
  const i = d.icons;
  for (const c in i) {
    const m = i[c];
    if (
      // Name cannot be empty
      !c || // Must have body
      typeof m.body != "string" || // Check other props
      !$i(
        m,
        Qi
      )
    )
      return null;
  }
  const a = d.aliases || /* @__PURE__ */ Object.create(null);
  for (const c in a) {
    const m = a[c], y = m.parent;
    if (
      // Name cannot be empty
      !c || // Parent must be set and point to existing icon
      typeof y != "string" || !i[y] && !a[y] || // Check other props
      !$i(
        m,
        Qi
      )
    )
      return null;
  }
  return d;
}
const wc = /^[a-z0-9]+(-[a-z0-9]+)*$/, Wl = (u, d, i, a = "") => {
  const c = u.split(":");
  if (u.slice(0, 1) === "@") {
    if (c.length < 2 || c.length > 3)
      return null;
    a = c.shift().slice(1);
  }
  if (c.length > 3 || !c.length)
    return null;
  if (c.length > 1) {
    const k = c.pop(), E = c.pop(), O = {
      // Allow provider without '@': "provider:prefix:name"
      provider: c.length > 0 ? c[0] : a,
      prefix: E,
      name: k
    };
    return d && !Vl(O) ? null : O;
  }
  const m = c[0], y = m.split("-");
  if (y.length > 1) {
    const k = {
      provider: a,
      prefix: y.shift(),
      name: y.join("-")
    };
    return d && !Vl(k) ? null : k;
  }
  if (i && a === "") {
    const k = {
      provider: a,
      prefix: "",
      name: m
    };
    return d && !Vl(k, i) ? null : k;
  }
  return null;
}, Vl = (u, d) => u ? !!// Check prefix: cannot be empty, unless allowSimpleName is enabled
// Check name: cannot be empty
((d && u.prefix === "" || u.prefix) && u.name) : !1, rc = /* @__PURE__ */ Object.create(null);
function $d(u, d) {
  return {
    provider: u,
    prefix: d,
    icons: /* @__PURE__ */ Object.create(null),
    missing: /* @__PURE__ */ new Set()
  };
}
function Un(u, d) {
  const i = rc[u] || (rc[u] = /* @__PURE__ */ Object.create(null));
  return i[d] || (i[d] = $d(u, d));
}
function Sc(u, d) {
  return yc(d) ? gc(d, (i, a) => {
    a ? u.icons[i] = a : u.missing.add(i);
  }) : [];
}
function Wd(u, d, i) {
  try {
    if (typeof i.body == "string")
      return u.icons[d] = { ...i }, !0;
  } catch {
  }
  return !1;
}
let Nr = !1;
function kc(u) {
  return typeof u == "boolean" && (Nr = u), Nr;
}
function lc(u) {
  const d = typeof u == "string" ? Wl(u, !0, Nr) : u;
  if (d) {
    const i = Un(d.provider, d.prefix), a = d.name;
    return i.icons[a] || (i.missing.has(a) ? null : void 0);
  }
}
function Hd(u, d) {
  const i = Wl(u, !0, Nr);
  if (!i)
    return !1;
  const a = Un(i.provider, i.prefix);
  return d ? Wd(a, i.name, d) : (a.missing.add(i.name), !0);
}
function Qd(u, d) {
  if (typeof u != "object")
    return !1;
  if (typeof d != "string" && (d = u.provider || ""), Nr && !d && !u.prefix) {
    let c = !1;
    return yc(u) && (u.prefix = "", gc(u, (m, y) => {
      Hd(m, y) && (c = !0);
    })), c;
  }
  const i = u.prefix;
  if (!Vl({
    prefix: i,
    name: "a"
  }))
    return !1;
  const a = Un(d, i);
  return !!Sc(a, u);
}
const Ec = Object.freeze({
  width: null,
  height: null
}), Cc = Object.freeze({
  // Dimensions
  ...Ec,
  // Transformations
  ...$l
}), Kd = /(-?[0-9.]*[0-9]+[0-9.]*)/g, Gd = /^-?[0-9.]*[0-9]+[0-9.]*$/g;
function oc(u, d, i) {
  if (d === 1)
    return u;
  if (i = i || 100, typeof u == "number")
    return Math.ceil(u * d * i) / i;
  if (typeof u != "string")
    return u;
  const a = u.split(Kd);
  if (a === null || !a.length)
    return u;
  const c = [];
  let m = a.shift(), y = Gd.test(m);
  for (; ; ) {
    if (y) {
      const k = parseFloat(m);
      isNaN(k) ? c.push(m) : c.push(Math.ceil(k * d * i) / i);
    } else
      c.push(m);
    if (m = a.shift(), m === void 0)
      return c.join("");
    y = !y;
  }
}
function Xd(u, d = "defs") {
  let i = "";
  const a = u.indexOf("<" + d);
  for (; a >= 0; ) {
    const c = u.indexOf(">", a), m = u.indexOf("</" + d);
    if (c === -1 || m === -1)
      break;
    const y = u.indexOf(">", m);
    if (y === -1)
      break;
    i += u.slice(c + 1, m).trim(), u = u.slice(0, a).trim() + u.slice(y + 1);
  }
  return {
    defs: i,
    content: u
  };
}
function Yd(u, d) {
  return u ? "<defs>" + u + "</defs>" + d : d;
}
function Jd(u, d, i) {
  const a = Xd(u);
  return Yd(a.defs, d + a.content + i);
}
const Zd = (u) => u === "unset" || u === "undefined" || u === "none";
function qd(u, d) {
  const i = {
    ...Zi,
    ...u
  }, a = {
    ...Cc,
    ...d
  }, c = {
    left: i.left,
    top: i.top,
    width: i.width,
    height: i.height
  };
  let m = i.body;
  [i, a].forEach((K) => {
    const R = [], X = K.hFlip, ve = K.vFlip;
    let re = K.rotate;
    X ? ve ? re += 2 : (R.push(
      "translate(" + (c.width + c.left).toString() + " " + (0 - c.top).toString() + ")"
    ), R.push("scale(-1 1)"), c.top = c.left = 0) : ve && (R.push(
      "translate(" + (0 - c.left).toString() + " " + (c.height + c.top).toString() + ")"
    ), R.push("scale(1 -1)"), c.top = c.left = 0);
    let ue;
    switch (re < 0 && (re -= Math.floor(re / 4) * 4), re = re % 4, re) {
      case 1:
        ue = c.height / 2 + c.top, R.unshift(
          "rotate(90 " + ue.toString() + " " + ue.toString() + ")"
        );
        break;
      case 2:
        R.unshift(
          "rotate(180 " + (c.width / 2 + c.left).toString() + " " + (c.height / 2 + c.top).toString() + ")"
        );
        break;
      case 3:
        ue = c.width / 2 + c.left, R.unshift(
          "rotate(-90 " + ue.toString() + " " + ue.toString() + ")"
        );
        break;
    }
    re % 2 === 1 && (c.left !== c.top && (ue = c.left, c.left = c.top, c.top = ue), c.width !== c.height && (ue = c.width, c.width = c.height, c.height = ue)), R.length && (m = Jd(
      m,
      '<g transform="' + R.join(" ") + '">',
      "</g>"
    ));
  });
  const y = a.width, k = a.height, E = c.width, O = c.height;
  let N, U;
  y === null ? (U = k === null ? "1em" : k === "auto" ? O : k, N = oc(U, E / O)) : (N = y === "auto" ? E : y, U = k === null ? oc(N, O / E) : k === "auto" ? O : k);
  const V = {}, J = (K, R) => {
    Zd(R) || (V[K] = R.toString());
  };
  J("width", N), J("height", U);
  const b = [c.left, c.top, E, O];
  return V.viewBox = b.join(" "), {
    attributes: V,
    viewBox: b,
    body: m
  };
}
const bd = /\sid="(\S+)"/g, ep = "IconifyId" + Date.now().toString(16) + (Math.random() * 16777216 | 0).toString(16);
let tp = 0;
function np(u, d = ep) {
  const i = [];
  let a;
  for (; a = bd.exec(u); )
    i.push(a[1]);
  if (!i.length)
    return u;
  const c = "suffix" + (Math.random() * 16777216 | Date.now()).toString(16);
  return i.forEach((m) => {
    const y = typeof d == "function" ? d(m) : d + (tp++).toString(), k = m.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    u = u.replace(
      // Allowed characters before id: [#;"]
      // Allowed characters after id: [)"], .[a-z]
      new RegExp('([#;"])(' + k + ')([")]|\\.[a-z])', "g"),
      "$1" + y + c + "$3"
    );
  }), u = u.replace(new RegExp(c, "g"), ""), u;
}
const Ki = /* @__PURE__ */ Object.create(null);
function rp(u, d) {
  Ki[u] = d;
}
function Gi(u) {
  return Ki[u] || Ki[""];
}
function qi(u) {
  let d;
  if (typeof u.resources == "string")
    d = [u.resources];
  else if (d = u.resources, !(d instanceof Array) || !d.length)
    return null;
  return {
    // API hosts
    resources: d,
    // Root path
    path: u.path || "/",
    // URL length limit
    maxURL: u.maxURL || 500,
    // Timeout before next host is used.
    rotate: u.rotate || 750,
    // Timeout before failing query.
    timeout: u.timeout || 5e3,
    // Randomise default API end point.
    random: u.random === !0,
    // Start index
    index: u.index || 0,
    // Receive data after time out (used if time out kicks in first, then API module sends data anyway).
    dataAfterTimeout: u.dataAfterTimeout !== !1
  };
}
const bi = /* @__PURE__ */ Object.create(null), xr = [
  "https://api.simplesvg.com",
  "https://api.unisvg.com"
], Bl = [];
for (; xr.length > 0; )
  xr.length === 1 || Math.random() > 0.5 ? Bl.push(xr.shift()) : Bl.push(xr.pop());
bi[""] = qi({
  resources: ["https://api.iconify.design"].concat(Bl)
});
function lp(u, d) {
  const i = qi(d);
  return i === null ? !1 : (bi[u] = i, !0);
}
function eu(u) {
  return bi[u];
}
const op = () => {
  let u;
  try {
    if (u = fetch, typeof u == "function")
      return u;
  } catch {
  }
};
let ic = op();
function ip(u, d) {
  const i = eu(u);
  if (!i)
    return 0;
  let a;
  if (!i.maxURL)
    a = 0;
  else {
    let c = 0;
    i.resources.forEach((y) => {
      c = Math.max(c, y.length);
    });
    const m = d + ".json?icons=";
    a = i.maxURL - c - i.path.length - m.length;
  }
  return a;
}
function up(u) {
  return u === 404;
}
const sp = (u, d, i) => {
  const a = [], c = ip(u, d), m = "icons";
  let y = {
    type: m,
    provider: u,
    prefix: d,
    icons: []
  }, k = 0;
  return i.forEach((E, O) => {
    k += E.length + 1, k >= c && O > 0 && (a.push(y), y = {
      type: m,
      provider: u,
      prefix: d,
      icons: []
    }, k = E.length), y.icons.push(E);
  }), a.push(y), a;
};
function ap(u) {
  if (typeof u == "string") {
    const d = eu(u);
    if (d)
      return d.path;
  }
  return "/";
}
const cp = (u, d, i) => {
  if (!ic) {
    i("abort", 424);
    return;
  }
  let a = ap(d.provider);
  switch (d.type) {
    case "icons": {
      const m = d.prefix, k = d.icons.join(","), E = new URLSearchParams({
        icons: k
      });
      a += m + ".json?" + E.toString();
      break;
    }
    case "custom": {
      const m = d.uri;
      a += m.slice(0, 1) === "/" ? m.slice(1) : m;
      break;
    }
    default:
      i("abort", 400);
      return;
  }
  let c = 503;
  ic(u + a).then((m) => {
    const y = m.status;
    if (y !== 200) {
      setTimeout(() => {
        i(up(y) ? "abort" : "next", y);
      });
      return;
    }
    return c = 501, m.json();
  }).then((m) => {
    if (typeof m != "object" || m === null) {
      setTimeout(() => {
        m === 404 ? i("abort", m) : i("next", c);
      });
      return;
    }
    setTimeout(() => {
      i("success", m);
    });
  }).catch(() => {
    i("next", c);
  });
}, fp = {
  prepare: sp,
  send: cp
};
function dp(u) {
  const d = {
    loaded: [],
    missing: [],
    pending: []
  }, i = /* @__PURE__ */ Object.create(null);
  u.sort((c, m) => c.provider !== m.provider ? c.provider.localeCompare(m.provider) : c.prefix !== m.prefix ? c.prefix.localeCompare(m.prefix) : c.name.localeCompare(m.name));
  let a = {
    provider: "",
    prefix: "",
    name: ""
  };
  return u.forEach((c) => {
    if (a.name === c.name && a.prefix === c.prefix && a.provider === c.provider)
      return;
    a = c;
    const m = c.provider, y = c.prefix, k = c.name, E = i[m] || (i[m] = /* @__PURE__ */ Object.create(null)), O = E[y] || (E[y] = Un(m, y));
    let N;
    k in O.icons ? N = d.loaded : y === "" || O.missing.has(k) ? N = d.missing : N = d.pending;
    const U = {
      provider: m,
      prefix: y,
      name: k
    };
    N.push(U);
  }), d;
}
function xc(u, d) {
  u.forEach((i) => {
    const a = i.loaderCallbacks;
    a && (i.loaderCallbacks = a.filter((c) => c.id !== d));
  });
}
function pp(u) {
  u.pendingCallbacksFlag || (u.pendingCallbacksFlag = !0, setTimeout(() => {
    u.pendingCallbacksFlag = !1;
    const d = u.loaderCallbacks ? u.loaderCallbacks.slice(0) : [];
    if (!d.length)
      return;
    let i = !1;
    const a = u.provider, c = u.prefix;
    d.forEach((m) => {
      const y = m.icons, k = y.pending.length;
      y.pending = y.pending.filter((E) => {
        if (E.prefix !== c)
          return !0;
        const O = E.name;
        if (u.icons[O])
          y.loaded.push({
            provider: a,
            prefix: c,
            name: O
          });
        else if (u.missing.has(O))
          y.missing.push({
            provider: a,
            prefix: c,
            name: O
          });
        else
          return i = !0, !0;
        return !1;
      }), y.pending.length !== k && (i || xc([u], m.id), m.callback(
        y.loaded.slice(0),
        y.missing.slice(0),
        y.pending.slice(0),
        m.abort
      ));
    });
  }));
}
let hp = 0;
function mp(u, d, i) {
  const a = hp++, c = xc.bind(null, i, a);
  if (!d.pending.length)
    return c;
  const m = {
    id: a,
    icons: d,
    callback: u,
    abort: c
  };
  return i.forEach((y) => {
    (y.loaderCallbacks || (y.loaderCallbacks = [])).push(m);
  }), c;
}
function vp(u, d = !0, i = !1) {
  const a = [];
  return u.forEach((c) => {
    const m = typeof c == "string" ? Wl(c, d, i) : c;
    m && a.push(m);
  }), a;
}
var gp = {
  resources: [],
  index: 0,
  timeout: 2e3,
  rotate: 750,
  random: !1,
  dataAfterTimeout: !1
};
function yp(u, d, i, a) {
  const c = u.resources.length, m = u.random ? Math.floor(Math.random() * c) : u.index;
  let y;
  if (u.random) {
    let W = u.resources.slice(0);
    for (y = []; W.length > 1; ) {
      const Z = Math.floor(Math.random() * W.length);
      y.push(W[Z]), W = W.slice(0, Z).concat(W.slice(Z + 1));
    }
    y = y.concat(W);
  } else
    y = u.resources.slice(m).concat(u.resources.slice(0, m));
  const k = Date.now();
  let E = "pending", O = 0, N, U = null, V = [], J = [];
  typeof a == "function" && J.push(a);
  function b() {
    U && (clearTimeout(U), U = null);
  }
  function K() {
    E === "pending" && (E = "aborted"), b(), V.forEach((W) => {
      W.status === "pending" && (W.status = "aborted");
    }), V = [];
  }
  function R(W, Z) {
    Z && (J = []), typeof W == "function" && J.push(W);
  }
  function X() {
    return {
      startTime: k,
      payload: d,
      status: E,
      queriesSent: O,
      queriesPending: V.length,
      subscribe: R,
      abort: K
    };
  }
  function ve() {
    E = "failed", J.forEach((W) => {
      W(void 0, N);
    });
  }
  function re() {
    V.forEach((W) => {
      W.status === "pending" && (W.status = "aborted");
    }), V = [];
  }
  function ue(W, Z, ce) {
    const pe = Z !== "success";
    switch (V = V.filter((De) => De !== W), E) {
      case "pending":
        break;
      case "failed":
        if (pe || !u.dataAfterTimeout)
          return;
        break;
      default:
        return;
    }
    if (Z === "abort") {
      N = ce, ve();
      return;
    }
    if (pe) {
      N = ce, V.length || (y.length ? Oe() : ve());
      return;
    }
    if (b(), re(), !u.random) {
      const De = u.resources.indexOf(W.resource);
      De !== -1 && De !== u.index && (u.index = De);
    }
    E = "completed", J.forEach((De) => {
      De(ce);
    });
  }
  function Oe() {
    if (E !== "pending")
      return;
    b();
    const W = y.shift();
    if (W === void 0) {
      if (V.length) {
        U = setTimeout(() => {
          b(), E === "pending" && (re(), ve());
        }, u.timeout);
        return;
      }
      ve();
      return;
    }
    const Z = {
      status: "pending",
      resource: W,
      callback: (ce, pe) => {
        ue(Z, ce, pe);
      }
    };
    V.push(Z), O++, U = setTimeout(Oe, u.rotate), i(W, d, Z.callback);
  }
  return setTimeout(Oe), X;
}
function Pc(u) {
  const d = {
    ...gp,
    ...u
  };
  let i = [];
  function a() {
    i = i.filter((k) => k().status === "pending");
  }
  function c(k, E, O) {
    const N = yp(
      d,
      k,
      E,
      (U, V) => {
        a(), O && O(U, V);
      }
    );
    return i.push(N), N;
  }
  function m(k) {
    return i.find((E) => k(E)) || null;
  }
  return {
    query: c,
    find: m,
    setIndex: (k) => {
      d.index = k;
    },
    getIndex: () => d.index,
    cleanup: a
  };
}
function uc() {
}
const Wi = /* @__PURE__ */ Object.create(null);
function wp(u) {
  if (!Wi[u]) {
    const d = eu(u);
    if (!d)
      return;
    const i = Pc(d), a = {
      config: d,
      redundancy: i
    };
    Wi[u] = a;
  }
  return Wi[u];
}
function Sp(u, d, i) {
  let a, c;
  if (typeof u == "string") {
    const m = Gi(u);
    if (!m)
      return i(void 0, 424), uc;
    c = m.send;
    const y = wp(u);
    y && (a = y.redundancy);
  } else {
    const m = qi(u);
    if (m) {
      a = Pc(m);
      const y = u.resources ? u.resources[0] : "", k = Gi(y);
      k && (c = k.send);
    }
  }
  return !a || !c ? (i(void 0, 424), uc) : a.query(d, c, i)().abort;
}
function sc() {
}
function kp(u) {
  u.iconsLoaderFlag || (u.iconsLoaderFlag = !0, setTimeout(() => {
    u.iconsLoaderFlag = !1, pp(u);
  }));
}
function Ep(u) {
  const d = [], i = [];
  return u.forEach((a) => {
    (a.match(wc) ? d : i).push(a);
  }), {
    valid: d,
    invalid: i
  };
}
function Pr(u, d, i) {
  function a() {
    const c = u.pendingIcons;
    d.forEach((m) => {
      c && c.delete(m), u.icons[m] || u.missing.add(m);
    });
  }
  if (i && typeof i == "object")
    try {
      if (!Sc(u, i).length) {
        a();
        return;
      }
    } catch (c) {
      console.error(c);
    }
  a(), kp(u);
}
function ac(u, d) {
  u instanceof Promise ? u.then((i) => {
    d(i);
  }).catch(() => {
    d(null);
  }) : d(u);
}
function Cp(u, d) {
  u.iconsToLoad ? u.iconsToLoad = u.iconsToLoad.concat(d).sort() : u.iconsToLoad = d, u.iconsQueueFlag || (u.iconsQueueFlag = !0, setTimeout(() => {
    u.iconsQueueFlag = !1;
    const { provider: i, prefix: a } = u, c = u.iconsToLoad;
    if (delete u.iconsToLoad, !c || !c.length)
      return;
    const m = u.loadIcon;
    if (u.loadIcons && (c.length > 1 || !m)) {
      ac(
        u.loadIcons(c, a, i),
        (N) => {
          Pr(u, c, N);
        }
      );
      return;
    }
    if (m) {
      c.forEach((N) => {
        const U = m(N, a, i);
        ac(U, (V) => {
          const J = V ? {
            prefix: a,
            icons: {
              [N]: V
            }
          } : null;
          Pr(u, [N], J);
        });
      });
      return;
    }
    const { valid: y, invalid: k } = Ep(c);
    if (k.length && Pr(u, k, null), !y.length)
      return;
    const E = a.match(wc) ? Gi(i) : null;
    if (!E) {
      Pr(u, y, null);
      return;
    }
    E.prepare(i, a, y).forEach((N) => {
      Sp(i, N, (U) => {
        Pr(u, N.icons, U);
      });
    });
  }));
}
const xp = (u, d) => {
  const i = vp(u, !0, kc()), a = dp(i);
  if (!a.pending.length) {
    let E = !0;
    return d && setTimeout(() => {
      E && d(
        a.loaded,
        a.missing,
        a.pending,
        sc
      );
    }), () => {
      E = !1;
    };
  }
  const c = /* @__PURE__ */ Object.create(null), m = [];
  let y, k;
  return a.pending.forEach((E) => {
    const { provider: O, prefix: N } = E;
    if (N === k && O === y)
      return;
    y = O, k = N, m.push(Un(O, N));
    const U = c[O] || (c[O] = /* @__PURE__ */ Object.create(null));
    U[N] || (U[N] = []);
  }), a.pending.forEach((E) => {
    const { provider: O, prefix: N, name: U } = E, V = Un(O, N), J = V.pendingIcons || (V.pendingIcons = /* @__PURE__ */ new Set());
    J.has(U) || (J.add(U), c[O][N].push(U));
  }), m.forEach((E) => {
    const O = c[E.provider][E.prefix];
    O.length && Cp(E, O);
  }), d ? mp(d, a, m) : sc;
};
function Pp(u, d) {
  const i = {
    ...u
  };
  for (const a in d) {
    const c = d[a], m = typeof c;
    a in Ec ? (c === null || c && (m === "string" || m === "number")) && (i[a] = c) : m === typeof i[a] && (i[a] = a === "rotate" ? c % 4 : c);
  }
  return i;
}
const Tp = /[\s,]+/;
function _p(u, d) {
  d.split(Tp).forEach((i) => {
    switch (i.trim()) {
      case "horizontal":
        u.hFlip = !0;
        break;
      case "vertical":
        u.vFlip = !0;
        break;
    }
  });
}
function Np(u, d = 0) {
  const i = u.replace(/^-?[0-9.]*/, "");
  function a(c) {
    for (; c < 0; )
      c += 4;
    return c % 4;
  }
  if (i === "") {
    const c = parseInt(u);
    return isNaN(c) ? 0 : a(c);
  } else if (i !== u) {
    let c = 0;
    switch (i) {
      case "%":
        c = 25;
        break;
      case "deg":
        c = 90;
    }
    if (c) {
      let m = parseFloat(u.slice(0, u.length - i.length));
      return isNaN(m) ? 0 : (m = m / c, m % 1 === 0 ? a(m) : 0);
    }
  }
  return d;
}
function Lp(u, d) {
  let i = u.indexOf("xlink:") === -1 ? "" : ' xmlns:xlink="http://www.w3.org/1999/xlink"';
  for (const a in d)
    i += " " + a + '="' + d[a] + '"';
  return '<svg xmlns="http://www.w3.org/2000/svg"' + i + ">" + u + "</svg>";
}
function Mp(u) {
  return u.replace(/"/g, "'").replace(/%/g, "%25").replace(/#/g, "%23").replace(/</g, "%3C").replace(/>/g, "%3E").replace(/\s+/g, " ");
}
function Op(u) {
  return "data:image/svg+xml," + Mp(u);
}
function Dp(u) {
  return 'url("' + Op(u) + '")';
}
let _r;
function Rp() {
  try {
    _r = window.trustedTypes.createPolicy("iconify", {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      createHTML: (u) => u
    });
  } catch {
    _r = null;
  }
}
function Ip(u) {
  return _r === void 0 && Rp(), _r ? _r.createHTML(u) : u;
}
const Tc = {
  ...Cc,
  inline: !1
}, zp = {
  xmlns: "http://www.w3.org/2000/svg",
  xmlnsXlink: "http://www.w3.org/1999/xlink",
  "aria-hidden": !0,
  role: "img"
}, Ap = {
  display: "inline-block"
}, Xi = {
  backgroundColor: "currentColor"
}, _c = {
  backgroundColor: "transparent"
}, cc = {
  Image: "var(--svg)",
  Repeat: "no-repeat",
  Size: "100% 100%"
}, fc = {
  WebkitMask: Xi,
  mask: Xi,
  background: _c
};
for (const u in fc) {
  const d = fc[u];
  for (const i in cc)
    d[u + i] = cc[i];
}
const Fp = {
  ...Tc,
  inline: !0
};
function dc(u) {
  return u + (u.match(/^[-0-9.]+$/) ? "px" : "");
}
const Up = (u, d, i) => {
  const a = d.inline ? Fp : Tc, c = Pp(a, d), m = d.mode || "svg", y = {}, k = d.style || {}, E = {
    ...m === "svg" ? zp : {}
  };
  if (i) {
    const R = Wl(i, !1, !0);
    if (R) {
      const X = ["iconify"], ve = [
        "provider",
        "prefix"
      ];
      for (const re of ve)
        R[re] && X.push("iconify--" + R[re]);
      E.className = X.join(" ");
    }
  }
  for (let R in d) {
    const X = d[R];
    if (X !== void 0)
      switch (R) {
        // Properties to ignore
        case "icon":
        case "style":
        case "children":
        case "onLoad":
        case "mode":
        case "ssr":
          break;
        // Forward ref
        case "_ref":
          E.ref = X;
          break;
        // Merge class names
        case "className":
          E[R] = (E[R] ? E[R] + " " : "") + X;
          break;
        // Boolean attributes
        case "inline":
        case "hFlip":
        case "vFlip":
          c[R] = X === !0 || X === "true" || X === 1;
          break;
        // Flip as string: 'horizontal,vertical'
        case "flip":
          typeof X == "string" && _p(c, X);
          break;
        // Color: copy to style
        case "color":
          y.color = X;
          break;
        // Rotation as string
        case "rotate":
          typeof X == "string" ? c[R] = Np(X) : typeof X == "number" && (c[R] = X);
          break;
        // Remove aria-hidden
        case "ariaHidden":
        case "aria-hidden":
          X !== !0 && X !== "true" && delete E["aria-hidden"];
          break;
        // Copy missing property if it does not exist in customisations
        default:
          a[R] === void 0 && (E[R] = X);
      }
  }
  const O = qd(u, c), N = O.attributes;
  if (c.inline && (y.verticalAlign = "-0.125em"), m === "svg") {
    E.style = {
      ...y,
      ...k
    }, Object.assign(E, N);
    let R = 0, X = d.id;
    return typeof X == "string" && (X = X.replace(/-/g, "_")), E.dangerouslySetInnerHTML = {
      __html: Ip(np(O.body, X ? () => X + "ID" + R++ : "iconifyReact"))
    }, Y.createElement("svg", E);
  }
  const { body: U, width: V, height: J } = u, b = m === "mask" || (m === "bg" ? !1 : U.indexOf("currentColor") !== -1), K = Lp(U, {
    ...N,
    width: V + "",
    height: J + ""
  });
  return E.style = {
    ...y,
    "--svg": Dp(K),
    width: dc(N.width),
    height: dc(N.height),
    ...Ap,
    ...b ? Xi : _c,
    ...k
  }, Y.createElement("span", E);
};
kc(!0);
rp("", fp);
if (typeof document < "u" && typeof window < "u") {
  const u = window;
  if (u.IconifyPreload !== void 0) {
    const d = u.IconifyPreload, i = "Invalid IconifyPreload syntax.";
    typeof d == "object" && d !== null && (d instanceof Array ? d : [d]).forEach((a) => {
      try {
        // Check if item is an object and not null/array
        (typeof a != "object" || a === null || a instanceof Array || // Check for 'icons' and 'prefix'
        typeof a.icons != "object" || typeof a.prefix != "string" || // Add icon set
        !Qd(a)) && console.error(i);
      } catch {
        console.error(i);
      }
    });
  }
  if (u.IconifyProviders !== void 0) {
    const d = u.IconifyProviders;
    if (typeof d == "object" && d !== null)
      for (let i in d) {
        const a = "IconifyProviders[" + i + "] is invalid.";
        try {
          const c = d[i];
          if (typeof c != "object" || !c || c.resources === void 0)
            continue;
          lp(i, c) || console.error(a);
        } catch {
          console.error(a);
        }
      }
  }
}
function Nc(u) {
  const [d, i] = Y.useState(!!u.ssr), [a, c] = Y.useState({});
  function m(J) {
    if (J) {
      const b = u.icon;
      if (typeof b == "object")
        return {
          name: "",
          data: b
        };
      const K = lc(b);
      if (K)
        return {
          name: b,
          data: K
        };
    }
    return {
      name: ""
    };
  }
  const [y, k] = Y.useState(m(!!u.ssr));
  function E() {
    const J = a.callback;
    J && (J(), c({}));
  }
  function O(J) {
    if (JSON.stringify(y) !== JSON.stringify(J))
      return E(), k(J), !0;
  }
  function N() {
    var J;
    const b = u.icon;
    if (typeof b == "object") {
      O({
        name: "",
        data: b
      });
      return;
    }
    const K = lc(b);
    if (O({
      name: b,
      data: K
    }))
      if (K === void 0) {
        const R = xp([b], N);
        c({
          callback: R
        });
      } else K && ((J = u.onLoad) === null || J === void 0 || J.call(u, b));
  }
  Y.useEffect(() => (i(!0), E), []), Y.useEffect(() => {
    d && N();
  }, [u.icon, d]);
  const { name: U, data: V } = y;
  return V ? Up({
    ...Zi,
    ...V
  }, u, U) : u.children ? u.children : u.fallback ? u.fallback : Y.createElement("span", {});
}
const Et = Y.forwardRef((u, d) => Nc({
  ...u,
  _ref: d
}));
Y.forwardRef((u, d) => Nc({
  inline: !0,
  ...u,
  _ref: d
}));
function Yi() {
  return Yi = Object.assign ? Object.assign.bind() : function(u) {
    for (var d = 1; d < arguments.length; d++) {
      var i = arguments[d];
      for (var a in i) ({}).hasOwnProperty.call(i, a) && (u[a] = i[a]);
    }
    return u;
  }, Yi.apply(null, arguments);
}
const jp = (u) => {
  switch (u) {
    case "stacked":
      return "rhap_stacked";
    case "stacked-reverse":
      return "rhap_stacked-reverse";
    case "horizontal":
      return "rhap_horizontal";
    case "horizontal-reverse":
      return "rhap_horizontal-reverse";
    default:
      return "rhap_stacked";
  }
}, Lc = (u) => u instanceof MouseEvent ? u.clientX : u.touches[0].clientX, Hi = (u) => u > 9 ? u.toString() : `0${u}`, Fn = (u, d, i) => {
  if (!isFinite(u))
    return null;
  const a = Math.floor(u / 60), c = Hi(a), m = Hi(Math.floor(u % 60)), y = Hi(Math.floor(a % 60)), k = Math.floor(a / 60), E = `${c}:${m}`, O = `${k}:${y}:${m}`;
  if (i === "auto")
    return d >= 3600 ? O : E;
  if (i === "mm:ss")
    return E;
  if (i === "hh:mm:ss")
    return O;
};
function Mc(u, d) {
  let i = !1;
  return (a) => {
    i || (u(a), i = !0, setTimeout(() => i = !1, d));
  };
}
class Vp extends Y.Component {
  constructor() {
    super(...arguments);
    j(this, "timeOnMouseMove", 0);
    j(this, "hasAddedAudioEventListener", !1);
    j(this, "state", {
      isDraggingProgress: !1,
      currentTimePos: "0%",
      hasDownloadProgressAnimation: !1,
      downloadProgressArr: [],
      waitingForSeekCallback: !1
    });
    j(this, "getCurrentProgress", (i) => {
      const {
        audio: a,
        progressBar: c
      } = this.props;
      if (a.src.indexOf("blob:") !== 0 && typeof this.props.srcDuration > "u" && (!a.src || !isFinite(a.currentTime) || !c.current))
        return {
          currentTime: 0,
          currentTimePos: "0%"
        };
      const y = c.current.getBoundingClientRect(), k = y.width;
      let E = Lc(i) - y.left;
      return E < 0 ? E = 0 : E > k && (E = k), {
        currentTime: this.getDuration() * E / k,
        currentTimePos: `${(E / k * 100).toFixed(2)}%`
      };
    });
    j(this, "handleContextMenu", (i) => {
      i.preventDefault();
    });
    j(this, "handleMouseDownOrTouchStartProgressBar", (i) => {
      i.stopPropagation();
      const {
        currentTime: a,
        currentTimePos: c
      } = this.getCurrentProgress(i.nativeEvent);
      isFinite(a) && (this.timeOnMouseMove = a, this.setState({
        isDraggingProgress: !0,
        currentTimePos: c
      }), i.nativeEvent instanceof MouseEvent ? (window.addEventListener("mousemove", this.handleWindowMouseOrTouchMove), window.addEventListener("mouseup", this.handleWindowMouseOrTouchUp)) : (window.addEventListener("touchmove", this.handleWindowMouseOrTouchMove), window.addEventListener("touchend", this.handleWindowMouseOrTouchUp)));
    });
    j(this, "handleWindowMouseOrTouchMove", (i) => {
      i instanceof MouseEvent && i.preventDefault(), i.stopPropagation();
      const a = window.getSelection();
      a && a.type === "Range" && a.empty();
      const {
        isDraggingProgress: c
      } = this.state;
      if (c) {
        const {
          currentTime: m,
          currentTimePos: y
        } = this.getCurrentProgress(i);
        this.timeOnMouseMove = m, this.setState({
          currentTimePos: y
        });
      }
    });
    j(this, "handleWindowMouseOrTouchUp", (i) => {
      i.stopPropagation();
      const a = this.timeOnMouseMove, {
        audio: c,
        onChangeCurrentTimeError: m,
        onSeek: y
      } = this.props;
      if (y)
        this.setState({
          isDraggingProgress: !1,
          waitingForSeekCallback: !0
        }, () => {
          y(c, a).then(() => this.setState({
            waitingForSeekCallback: !1
          }), (k) => {
            const E = k instanceof Error ? k.message : String(k);
            throw new Error(E);
          });
        });
      else {
        const k = {
          isDraggingProgress: !1
        };
        if (c.readyState === c.HAVE_NOTHING || c.readyState === c.HAVE_METADATA || !isFinite(a))
          try {
            c.load();
          } catch (E) {
            return k.currentTimePos = "0%", m && m(E);
          }
        c.currentTime = a, this.setState(k);
      }
      i instanceof MouseEvent ? (window.removeEventListener("mousemove", this.handleWindowMouseOrTouchMove), window.removeEventListener("mouseup", this.handleWindowMouseOrTouchUp)) : (window.removeEventListener("touchmove", this.handleWindowMouseOrTouchMove), window.removeEventListener("touchend", this.handleWindowMouseOrTouchUp));
    });
    j(this, "handleAudioTimeUpdate", Mc((i) => {
      const {
        isDraggingProgress: a
      } = this.state, c = i.target;
      if (a || this.state.waitingForSeekCallback === !0) return;
      const {
        currentTime: m
      } = c, y = this.getDuration();
      this.setState({
        currentTimePos: `${(m / y * 100 || 0).toFixed(2)}%`
      });
    }, this.props.progressUpdateInterval));
    j(this, "handleAudioDownloadProgressUpdate", (i) => {
      const a = i.target, c = this.getDuration(), m = [];
      for (let y = 0; y < a.buffered.length; y++) {
        const k = a.buffered.start(y), E = a.buffered.end(y);
        m.push({
          left: `${Math.round(100 / c * k) || 0}%`,
          width: `${Math.round(100 / c * (E - k)) || 0}%`
        });
      }
      clearTimeout(this.downloadProgressAnimationTimer), this.setState({
        downloadProgressArr: m,
        hasDownloadProgressAnimation: !0
      }), this.downloadProgressAnimationTimer = setTimeout(() => {
        this.setState({
          hasDownloadProgressAnimation: !1
        });
      }, 200);
    });
  }
  getDuration() {
    const {
      audio: i,
      srcDuration: a
    } = this.props;
    return typeof a > "u" ? i.duration : a;
  }
  initialize() {
    const {
      audio: i
    } = this.props;
    i && !this.hasAddedAudioEventListener && (this.audio = i, this.hasAddedAudioEventListener = !0, i.addEventListener("timeupdate", this.handleAudioTimeUpdate), i.addEventListener("progress", this.handleAudioDownloadProgressUpdate));
  }
  componentDidMount() {
    this.initialize();
  }
  componentDidUpdate() {
    this.initialize();
  }
  componentWillUnmount() {
    this.audio && this.hasAddedAudioEventListener && (this.audio.removeEventListener("timeupdate", this.handleAudioTimeUpdate), this.audio.removeEventListener("progress", this.handleAudioDownloadProgressUpdate)), clearTimeout(this.downloadProgressAnimationTimer);
  }
  render() {
    const {
      showDownloadProgress: i,
      showFilledProgress: a,
      progressBar: c,
      i18nProgressBar: m
    } = this.props, {
      currentTimePos: y,
      downloadProgressArr: k,
      hasDownloadProgressAnimation: E
    } = this.state;
    return G.createElement("div", {
      className: "rhap_progress-container",
      ref: c,
      "aria-label": m,
      role: "progressbar",
      "aria-valuemin": 0,
      "aria-valuemax": 100,
      "aria-valuenow": Number(y.split("%")[0]),
      tabIndex: 0,
      onMouseDown: this.handleMouseDownOrTouchStartProgressBar,
      onTouchStart: this.handleMouseDownOrTouchStartProgressBar,
      onContextMenu: this.handleContextMenu
    }, G.createElement("div", {
      className: `rhap_progress-bar ${i ? "rhap_progress-bar-show-download" : ""}`
    }, G.createElement("div", {
      className: "rhap_progress-indicator",
      style: {
        left: y
      }
    }), a && G.createElement("div", {
      className: "rhap_progress-filled",
      style: {
        width: y
      }
    }), i && k.map(({
      left: O,
      width: N
    }, U) => G.createElement("div", {
      key: U,
      className: "rhap_download-progress",
      style: {
        left: O,
        width: N,
        transitionDuration: E ? ".2s" : "0s"
      }
    }))));
  }
}
const Bp = (u, d) => G.createElement(Vp, Yi({}, u, {
  progressBar: d
})), $p = Y.forwardRef(Bp);
class pc extends Y.PureComponent {
  constructor(i) {
    super(i);
    j(this, "hasAddedAudioEventListener", !1);
    j(this, "state", {
      currentTime: this.props.defaultCurrentTime
    });
    j(this, "handleAudioCurrentTimeChange", (i) => {
      const a = i.target, {
        isLeftTime: c,
        timeFormat: m,
        defaultCurrentTime: y
      } = this.props;
      this.setState({
        currentTime: Fn(c ? a.duration - a.currentTime : a.currentTime, a.duration, m) || y
      });
    });
    j(this, "addAudioEventListeners", () => {
      const {
        audio: i
      } = this.props;
      i && !this.hasAddedAudioEventListener && (this.audio = i, this.hasAddedAudioEventListener = !0, i.addEventListener("timeupdate", this.handleAudioCurrentTimeChange), i.addEventListener("loadedmetadata", this.handleAudioCurrentTimeChange));
    });
    const {
      audio: a,
      defaultCurrentTime: c,
      isLeftTime: m,
      timeFormat: y
    } = i;
    let k = c;
    a && (k = Fn(m ? a.duration - a.currentTime : a.currentTime, a.duration, y)), this.state = {
      currentTime: k
    };
  }
  componentDidMount() {
    this.addAudioEventListeners();
  }
  componentDidUpdate() {
    this.addAudioEventListeners();
  }
  componentWillUnmount() {
    this.audio && this.hasAddedAudioEventListener && (this.audio.removeEventListener("timeupdate", this.handleAudioCurrentTimeChange), this.audio.removeEventListener("loadedmetadata", this.handleAudioCurrentTimeChange));
  }
  render() {
    return this.state.currentTime;
  }
}
class Wp extends Y.PureComponent {
  constructor(i) {
    super(i);
    j(this, "hasAddedAudioEventListener", !1);
    j(this, "state", {
      duration: this.props.audio ? Fn(this.props.audio.duration, this.props.audio.duration, this.props.timeFormat) : this.props.defaultDuration
    });
    j(this, "handleAudioDurationChange", (i) => {
      const a = i.target, {
        timeFormat: c,
        defaultDuration: m
      } = this.props;
      this.setState({
        duration: Fn(a.duration, a.duration, c) || m
      });
    });
    j(this, "addAudioEventListeners", () => {
      const {
        audio: i
      } = this.props;
      i && !this.hasAddedAudioEventListener && (this.audio = i, this.hasAddedAudioEventListener = !0, i.addEventListener("durationchange", this.handleAudioDurationChange), i.addEventListener("abort", this.handleAudioDurationChange));
    });
    const {
      audio: a,
      timeFormat: c,
      defaultDuration: m
    } = i;
    this.state = {
      duration: a ? Fn(a.duration, a.duration, c) : m
    };
  }
  componentDidMount() {
    this.addAudioEventListeners();
  }
  componentDidUpdate() {
    this.addAudioEventListeners();
  }
  componentWillUnmount() {
    this.audio && this.hasAddedAudioEventListener && (this.audio.removeEventListener("durationchange", this.handleAudioDurationChange), this.audio.removeEventListener("abort", this.handleAudioDurationChange));
  }
  render() {
    return this.state.duration;
  }
}
class Hp extends Y.Component {
  constructor() {
    super(...arguments);
    j(this, "hasAddedAudioEventListener", !1);
    j(this, "volumeBar", Y.createRef());
    j(this, "volumeAnimationTimer", 0);
    j(this, "lastVolume", this.props.volume);
    j(this, "state", {
      currentVolumePos: `${(this.lastVolume / 1 * 100 || 0).toFixed(2)}%`,
      hasVolumeAnimation: !1,
      isDraggingVolume: !1
    });
    j(this, "getCurrentVolume", (i) => {
      const {
        audio: a
      } = this.props;
      if (!this.volumeBar.current)
        return {
          currentVolume: a.volume,
          currentVolumePos: this.state.currentVolumePos
        };
      const c = this.volumeBar.current.getBoundingClientRect(), m = c.width, y = Lc(i) - c.left;
      let k, E;
      return y < 0 ? (k = 0, E = "0%") : y > c.width ? (k = 1, E = "100%") : (k = y / m, E = `${y / m * 100}%`), {
        currentVolume: k,
        currentVolumePos: E
      };
    });
    j(this, "handleContextMenu", (i) => {
      i.preventDefault();
    });
    j(this, "handleClickVolumeButton", () => {
      const {
        audio: i
      } = this.props;
      i.volume > 0 ? (this.lastVolume = i.volume, i.volume = 0) : i.volume = this.lastVolume;
    });
    j(this, "handleVolumnControlMouseOrTouchDown", (i) => {
      i.stopPropagation();
      const {
        audio: a
      } = this.props, {
        currentVolume: c,
        currentVolumePos: m
      } = this.getCurrentVolume(i.nativeEvent);
      a.volume = c, this.setState({
        isDraggingVolume: !0,
        currentVolumePos: m
      }), i.nativeEvent instanceof MouseEvent ? (window.addEventListener("mousemove", this.handleWindowMouseOrTouchMove), window.addEventListener("mouseup", this.handleWindowMouseOrTouchUp)) : (window.addEventListener("touchmove", this.handleWindowMouseOrTouchMove), window.addEventListener("touchend", this.handleWindowMouseOrTouchUp));
    });
    j(this, "handleWindowMouseOrTouchMove", (i) => {
      i instanceof MouseEvent && i.preventDefault(), i.stopPropagation();
      const {
        audio: a
      } = this.props, c = window.getSelection();
      c && c.type === "Range" && c.empty();
      const {
        isDraggingVolume: m
      } = this.state;
      if (m) {
        const {
          currentVolume: y,
          currentVolumePos: k
        } = this.getCurrentVolume(i);
        a.volume = y, this.setState({
          currentVolumePos: k
        });
      }
    });
    j(this, "handleWindowMouseOrTouchUp", (i) => {
      i.stopPropagation(), this.setState({
        isDraggingVolume: !1
      }), i instanceof MouseEvent ? (window.removeEventListener("mousemove", this.handleWindowMouseOrTouchMove), window.removeEventListener("mouseup", this.handleWindowMouseOrTouchUp)) : (window.removeEventListener("touchmove", this.handleWindowMouseOrTouchMove), window.removeEventListener("touchend", this.handleWindowMouseOrTouchUp));
    });
    j(this, "handleAudioVolumeChange", (i) => {
      const {
        isDraggingVolume: a
      } = this.state, {
        volume: c
      } = i.target;
      (this.lastVolume > 0 && c === 0 || this.lastVolume === 0 && c > 0) && this.props.onMuteChange(), this.lastVolume = c, !a && (this.setState({
        hasVolumeAnimation: !0,
        currentVolumePos: `${(c / 1 * 100 || 0).toFixed(2)}%`
      }), clearTimeout(this.volumeAnimationTimer), this.volumeAnimationTimer = setTimeout(() => {
        this.setState({
          hasVolumeAnimation: !1
        });
      }, 100));
    });
  }
  componentDidUpdate() {
    const {
      audio: i
    } = this.props;
    i && !this.hasAddedAudioEventListener && (this.audio = i, this.hasAddedAudioEventListener = !0, i.addEventListener("volumechange", this.handleAudioVolumeChange));
  }
  componentWillUnmount() {
    this.audio && this.hasAddedAudioEventListener && this.audio.removeEventListener("volumechange", this.handleAudioVolumeChange), clearTimeout(this.volumeAnimationTimer);
  }
  render() {
    const {
      audio: i,
      showFilledVolume: a,
      i18nVolumeControl: c
    } = this.props, {
      currentVolumePos: m,
      hasVolumeAnimation: y
    } = this.state, {
      volume: k
    } = i || {};
    return G.createElement("div", {
      ref: this.volumeBar,
      onMouseDown: this.handleVolumnControlMouseOrTouchDown,
      onTouchStart: this.handleVolumnControlMouseOrTouchDown,
      onContextMenu: this.handleContextMenu,
      role: "progressbar",
      "aria-label": c,
      "aria-valuemin": 0,
      "aria-valuemax": 100,
      "aria-valuenow": Number((k * 100).toFixed(0)),
      tabIndex: 0,
      className: "rhap_volume-bar-area"
    }, G.createElement("div", {
      className: "rhap_volume-bar"
    }, G.createElement("div", {
      className: "rhap_volume-indicator",
      style: {
        left: m,
        transitionDuration: y ? ".1s" : "0s"
      }
    }), a && G.createElement("div", {
      className: "rhap_volume-filled",
      style: {
        width: m
      }
    })));
  }
}
let ze = (function(u) {
  return u.CURRENT_TIME = "CURRENT_TIME", u.CURRENT_LEFT_TIME = "CURRENT_LEFT_TIME", u.PROGRESS_BAR = "PROGRESS_BAR", u.DURATION = "DURATION", u.ADDITIONAL_CONTROLS = "ADDITIONAL_CONTROLS", u.MAIN_CONTROLS = "MAIN_CONTROLS", u.VOLUME_CONTROLS = "VOLUME_CONTROLS", u.LOOP = "LOOP", u.VOLUME = "VOLUME", u;
})({});
const An = class An extends Y.Component {
  constructor() {
    super(...arguments);
    j(this, "audio", Y.createRef());
    j(this, "progressBar", Y.createRef());
    j(this, "container", Y.createRef());
    j(this, "lastVolume", this.props.volume ?? 1);
    j(this, "togglePlay", (i) => {
      i.stopPropagation();
      const a = this.audio.current;
      (a.paused || a.ended) && a.src ? this.playAudioPromise() : a.paused || a.pause();
    });
    j(this, "playAudioPromise", () => {
      this.audio.current.error && this.audio.current.load();
      const i = this.audio.current.play();
      i ? i.then(null).catch((a) => {
        const {
          onPlayError: c
        } = this.props, m = a instanceof Error ? a.message : String(a);
        c && c(new Error(m));
      }) : this.forceUpdate();
    });
    j(this, "isPlaying", () => {
      const i = this.audio.current;
      return i ? !i.paused && !i.ended : !1;
    });
    j(this, "handlePlay", (i) => {
      this.forceUpdate(), this.props.onPlay && this.props.onPlay(i);
    });
    j(this, "handlePause", (i) => {
      this.audio && (this.forceUpdate(), this.props.onPause && this.props.onPause(i));
    });
    j(this, "handleEnded", (i) => {
      this.audio && (this.forceUpdate(), this.props.onEnded && this.props.onEnded(i));
    });
    j(this, "handleAbort", (i) => {
      this.props.onAbort && this.props.onAbort(i);
    });
    j(this, "handleClickVolumeButton", () => {
      const i = this.audio.current;
      i.volume > 0 ? (this.lastVolume = i.volume, i.volume = 0) : i.volume = this.lastVolume;
    });
    j(this, "handleMuteChange", () => {
      this.forceUpdate();
    });
    j(this, "handleClickLoopButton", () => {
      this.audio.current.loop = !this.audio.current.loop, this.forceUpdate();
    });
    j(this, "handleClickRewind", () => {
      const {
        progressJumpSteps: i,
        progressJumpStep: a
      } = this.props, c = i.backward || a;
      this.setJumpTime(-c);
    });
    j(this, "handleClickForward", () => {
      const {
        progressJumpSteps: i,
        progressJumpStep: a
      } = this.props, c = i.forward || a;
      this.setJumpTime(c);
    });
    j(this, "setJumpTime", (i) => {
      const a = this.audio.current, {
        duration: c,
        currentTime: m
      } = a;
      if (a.readyState === a.HAVE_NOTHING || a.readyState === a.HAVE_METADATA || !isFinite(c) || !isFinite(m))
        try {
          a.load();
        } catch (k) {
          return this.props.onChangeCurrentTimeError && this.props.onChangeCurrentTimeError(k);
        }
      let y = m + i / 1e3;
      y < 0 ? (a.currentTime = 0, y = 0) : y > c ? (a.currentTime = c, y = c) : a.currentTime = y;
    });
    j(this, "setJumpVolume", (i) => {
      const a = this.audio.current, c = Number(i), m = a == null ? void 0 : a.volume;
      if (!a || !Number.isFinite(c) || !Number.isFinite(m))
        return;
      let y = m + c;
      y < 0 ? y = 0 : y > 1 && (y = 1), a.volume = y;
    });
    j(this, "handleKeyDown", (i) => {
      if (this.props.hasDefaultKeyBindings ?? !0)
        switch (i.key) {
          case " ":
            (i.target === this.container.current || i.target === this.progressBar.current) && (i.preventDefault(), this.togglePlay(i));
            break;
          case "ArrowLeft":
            this.handleClickRewind();
            break;
          case "ArrowRight":
            this.handleClickForward();
            break;
          case "ArrowUp":
            i.preventDefault(), this.setJumpVolume(this.props.volumeJumpStep);
            break;
          case "ArrowDown":
            i.preventDefault(), this.setJumpVolume(-this.props.volumeJumpStep);
            break;
          case "l":
            this.handleClickLoopButton();
            break;
          case "m":
            this.handleClickVolumeButton();
            break;
        }
    });
    j(this, "renderUIModules", (i) => i.map((a, c) => this.renderUIModule(a, c)));
    j(this, "renderUIModule", (i, a) => {
      const {
        defaultCurrentTime: c = "--:--",
        progressUpdateInterval: m = 20,
        showDownloadProgress: y = !0,
        showFilledProgress: k = !0,
        showFilledVolume: E = !1,
        defaultDuration: O = "--:--",
        customIcons: N = {},
        showSkipControls: U = !1,
        onClickPrevious: V,
        onClickNext: J,
        onChangeCurrentTimeError: b,
        showJumpControls: K = !0,
        customAdditionalControls: R = [ze.LOOP],
        customVolumeControls: X = [ze.VOLUME],
        muted: ve = !1,
        timeFormat: re = "auto",
        volume: ue = 1,
        loop: Oe = !1,
        mse: W,
        i18nAriaLabels: Z = An.defaultI18nAriaLabels
      } = this.props;
      switch (i) {
        case ze.CURRENT_TIME:
          return G.createElement("div", {
            key: a,
            id: "rhap_current-time",
            className: "rhap_time rhap_current-time"
          }, G.createElement(pc, {
            audio: this.audio.current,
            isLeftTime: !1,
            defaultCurrentTime: c,
            timeFormat: re
          }));
        case ze.CURRENT_LEFT_TIME:
          return G.createElement("div", {
            key: a,
            id: "rhap_current-left-time",
            className: "rhap_time rhap_current-left-time"
          }, G.createElement(pc, {
            audio: this.audio.current,
            isLeftTime: !0,
            defaultCurrentTime: c,
            timeFormat: re
          }));
        case ze.PROGRESS_BAR:
          return G.createElement($p, {
            key: a,
            ref: this.progressBar,
            audio: this.audio.current,
            progressUpdateInterval: m,
            showDownloadProgress: y,
            showFilledProgress: k,
            onSeek: W && W.onSeek,
            onChangeCurrentTimeError: b,
            srcDuration: W && W.srcDuration,
            i18nProgressBar: Z.progressControl
          });
        case ze.DURATION:
          return G.createElement("div", {
            key: a,
            className: "rhap_time rhap_total-time"
          }, W && W.srcDuration ? Fn(W.srcDuration, W.srcDuration, this.props.timeFormat) : G.createElement(Wp, {
            audio: this.audio.current,
            defaultDuration: O,
            timeFormat: re
          }));
        case ze.ADDITIONAL_CONTROLS:
          return G.createElement("div", {
            key: a,
            className: "rhap_additional-controls"
          }, this.renderUIModules(R));
        case ze.MAIN_CONTROLS: {
          const ce = this.isPlaying();
          let pe;
          return ce ? pe = N.pause ? N.pause : G.createElement(Et, {
            icon: "mdi:pause-circle",
            ssr: !0
          }) : pe = N.play ? N.play : G.createElement(Et, {
            icon: "mdi:play-circle",
            ssr: !0
          }), G.createElement("div", {
            key: a,
            className: "rhap_main-controls"
          }, U && G.createElement("button", {
            "aria-label": Z.previous,
            className: "rhap_button-clear rhap_main-controls-button rhap_skip-button",
            type: "button",
            onClick: V
          }, N.previous ? N.previous : G.createElement(Et, {
            icon: "mdi:skip-previous",
            ssr: !0
          })), K && G.createElement("button", {
            "aria-label": Z.rewind,
            className: "rhap_button-clear rhap_main-controls-button rhap_rewind-button",
            type: "button",
            onClick: this.handleClickRewind
          }, N.rewind ? N.rewind : G.createElement(Et, {
            icon: "mdi:rewind",
            ssr: !0
          })), G.createElement("button", {
            "aria-label": ce ? Z.pause : Z.play,
            className: "rhap_button-clear rhap_main-controls-button rhap_play-pause-button",
            type: "button",
            onClick: this.togglePlay
          }, pe), K && G.createElement("button", {
            "aria-label": Z.forward,
            className: "rhap_button-clear rhap_main-controls-button rhap_forward-button",
            type: "button",
            onClick: this.handleClickForward
          }, N.forward ? N.forward : G.createElement(Et, {
            icon: "mdi:fast-forward",
            ssr: !0
          })), U && G.createElement("button", {
            "aria-label": Z.next,
            className: "rhap_button-clear rhap_main-controls-button rhap_skip-button",
            type: "button",
            onClick: J
          }, N.next ? N.next : G.createElement(Et, {
            icon: "mdi:skip-next",
            ssr: !0
          })));
        }
        case ze.VOLUME_CONTROLS:
          return G.createElement("div", {
            key: a,
            className: "rhap_volume-controls"
          }, this.renderUIModules(X));
        case ze.LOOP: {
          const ce = this.audio.current ? this.audio.current.loop : Oe;
          let pe;
          return ce ? pe = N.loop ? N.loop : G.createElement(Et, {
            icon: "mdi:repeat",
            ssr: !0
          }) : pe = N.loopOff ? N.loopOff : G.createElement(Et, {
            icon: "mdi:repeat-off",
            ssr: !0
          }), G.createElement("button", {
            key: a,
            "aria-label": ce ? Z.loop : Z.loopOff,
            className: "rhap_button-clear rhap_repeat-button",
            type: "button",
            onClick: this.handleClickLoopButton
          }, pe);
        }
        case ze.VOLUME: {
          const {
            volume: ce = ve ? 0 : ue
          } = this.audio.current || {};
          let pe;
          return ce ? pe = N.volume ? N.volume : G.createElement(Et, {
            icon: "mdi:volume-high",
            ssr: !0
          }) : pe = N.volume ? N.volumeMute : G.createElement(Et, {
            icon: "mdi:volume-mute",
            ssr: !0
          }), G.createElement("div", {
            key: a,
            className: "rhap_volume-container"
          }, G.createElement("button", {
            "aria-label": ce ? Z.volume : Z.volumeMute,
            onClick: this.handleClickVolumeButton,
            type: "button",
            className: "rhap_button-clear rhap_volume-button"
          }, pe), G.createElement(Hp, {
            audio: this.audio.current,
            volume: ce,
            onMuteChange: this.handleMuteChange,
            showFilledVolume: E,
            i18nVolumeControl: Z.volumeControl
          }));
        }
        default:
          return Y.isValidElement(i) ? i.key ? i : Y.cloneElement(i, {
            key: a
          }) : null;
      }
    });
  }
  componentDidMount() {
    this.forceUpdate();
    const i = this.audio.current;
    this.props.muted ? i.volume = 0 : i.volume = this.lastVolume, i.addEventListener("error", (a) => {
      const c = a.target;
      if (c.error && c.currentTime === c.duration)
        return this.props.onEnded && this.props.onEnded(a);
      this.props.onError && this.props.onError(a);
    }), i.addEventListener("canplay", (a) => {
      this.props.onCanPlay && this.props.onCanPlay(a);
    }), i.addEventListener("canplaythrough", (a) => {
      this.props.onCanPlayThrough && this.props.onCanPlayThrough(a);
    }), i.addEventListener("play", this.handlePlay), i.addEventListener("abort", this.handleAbort), i.addEventListener("ended", this.handleEnded), i.addEventListener("playing", (a) => {
      this.props.onPlaying && this.props.onPlaying(a);
    }), i.addEventListener("seeking", (a) => {
      this.props.onSeeking && this.props.onSeeking(a);
    }), i.addEventListener("seeked", (a) => {
      this.props.onSeeked && this.props.onSeeked(a);
    }), i.addEventListener("waiting", (a) => {
      this.props.onWaiting && this.props.onWaiting(a);
    }), i.addEventListener("emptied", (a) => {
      this.props.onEmptied && this.props.onEmptied(a);
    }), i.addEventListener("stalled", (a) => {
      this.props.onStalled && this.props.onStalled(a);
    }), i.addEventListener("suspend", (a) => {
      this.props.onSuspend && this.props.onSuspend(a);
    }), i.addEventListener("loadstart", (a) => {
      this.props.onLoadStart && this.props.onLoadStart(a);
    }), i.addEventListener("loadedmetadata", (a) => {
      this.props.onLoadedMetaData && this.props.onLoadedMetaData(a);
    }), i.addEventListener("loadeddata", (a) => {
      this.props.onLoadedData && this.props.onLoadedData(a);
    }), i.addEventListener("pause", this.handlePause), i.addEventListener("timeupdate", Mc((a) => {
      this.props.onListen && this.props.onListen(a);
    }, this.props.listenInterval)), i.addEventListener("volumechange", (a) => {
      this.props.onVolumeChange && this.props.onVolumeChange(a);
    }), i.addEventListener("encrypted", (a) => {
      const {
        mse: c
      } = this.props;
      c && c.onEcrypted && c.onEcrypted(a);
    });
  }
  componentDidUpdate(i) {
    const {
      src: a,
      autoPlayAfterSrcChange: c
    } = this.props;
    i.src !== a && (c ? this.playAudioPromise() : this.forceUpdate());
  }
  render() {
    const {
      className: i = "",
      src: a,
      loop: c = !1,
      preload: m = "auto",
      autoPlay: y = !1,
      crossOrigin: k,
      mediaGroup: E,
      header: O,
      footer: N,
      layout: U = "stacked",
      customProgressBarSection: V = [ze.CURRENT_TIME, ze.PROGRESS_BAR, ze.DURATION],
      customControlsSection: J = [ze.ADDITIONAL_CONTROLS, ze.MAIN_CONTROLS, ze.VOLUME_CONTROLS],
      children: b,
      style: K,
      i18nAriaLabels: R = An.defaultI18nAriaLabels
    } = this.props, X = this.audio.current ? this.audio.current.loop : c, ve = X ? "rhap_loop--on" : "rhap_loop--off", re = this.isPlaying() ? "rhap_play-status--playing" : "rhap_play-status--paused";
    return G.createElement("div", {
      role: "group",
      tabIndex: 0,
      "aria-label": R.player,
      className: `rhap_container ${ve} ${re} ${i}`,
      onKeyDown: this.handleKeyDown,
      ref: this.container,
      style: K
    }, G.createElement("audio", {
      src: a,
      controls: !1,
      loop: X,
      autoPlay: y,
      preload: m,
      crossOrigin: k,
      mediaGroup: E,
      ref: this.audio
    }, b), O && G.createElement("div", {
      className: "rhap_header"
    }, O), G.createElement("div", {
      className: `rhap_main ${jp(U)}`
    }, G.createElement("div", {
      className: "rhap_progress-section"
    }, this.renderUIModules(V)), G.createElement("div", {
      className: "rhap_controls-section"
    }, this.renderUIModules(J))), N && G.createElement("div", {
      className: "rhap_footer"
    }, N));
  }
};
j(An, "defaultI18nAriaLabels", {
  player: "Audio player",
  progressControl: "Audio progress control",
  volumeControl: "Volume control",
  play: "Play",
  pause: "Pause",
  rewind: "Rewind",
  forward: "Forward",
  previous: "Previous",
  next: "Skip",
  loop: "Disable loop",
  loopOff: "Enable loop",
  volume: "Mute",
  volumeMute: "Unmute"
}), j(An, "defaultProps", {
  progressJumpSteps: {
    backward: 5e3,
    forward: 5e3
  },
  progressJumpStep: 5e3,
  volumeJumpStep: 0.1
});
let Ji = An;
function hc(u) {
  const d = Math.max(0, Math.round(u / 1e3)), i = Math.floor(d / 3600), a = Math.floor(d % 3600 / 60), c = d % 60;
  return i > 0 ? `${i}:${String(a).padStart(2, "0")}:${String(c).padStart(2, "0")}` : `${a}:${String(c).padStart(2, "0")}`;
}
function Qp(u) {
  return Y.createElement(
    "svg",
    { className: "icon", "aria-hidden": !0 },
    Y.createElement("use", { href: `#${u}` })
  );
}
function Tr(u) {
  return Y.createElement(
    "button",
    {
      key: u.key,
      type: "button",
      className: `icon-btn lp-transport-icon-btn ${u.className || ""}`.trim(),
      "aria-label": u.label,
      title: u.label,
      onClick: u.onClick
    },
    Qp(u.icon)
  );
}
function Kp({ viewModel: u, handlers: d }) {
  const i = u.totalMs ? Math.min(100, u.elapsedMs / u.totalMs * 100) : 0, a = u.mode === "connect" && !!u.deviceName, c = Y.createElement(
    "div",
    { className: "lp-transport-meta" },
    Y.createElement(
      "button",
      {
        type: "button",
        className: "lp-transport-art-btn",
        "aria-label": "Show now playing",
        title: "Show now playing",
        onClick: d.onArtClick
      },
      u.albumArt ? Y.createElement("img", { className: "lp-transport-art", src: u.albumArt, alt: "" }) : Y.createElement("div", { className: "lp-transport-art lp-transport-art-empty" })
    ),
    Y.createElement(
      "div",
      { className: "lp-transport-text" },
      Y.createElement("div", { className: "lp-transport-track" }, u.trackName || ""),
      Y.createElement("div", { className: "lp-transport-artist" }, u.artistName || ""),
      Y.createElement("div", { className: "lp-transport-album" }, u.albumName || "")
    )
  ), m = [
    Y.createElement(
      "div",
      { key: "bottom", className: "lp-transport-bottom-row" },
      Y.createElement(
        "div",
        { key: "controls", className: "lp-transport-controls" },
        Tr({ key: "prev", icon: "icon-previous", label: "Previous album", onClick: d.onPrev }),
        Tr({
          key: "playpause",
          icon: u.isPlaying ? "icon-pause" : "icon-play",
          label: u.isPlaying ? "Pause" : "Play",
          onClick: d.onPlayPause,
          className: "lp-transport-playpause"
        }),
        Tr({ key: "next", icon: "icon-next", label: "Next album", onClick: d.onNext })
      ),
      Y.createElement(
        "div",
        { key: "progress", className: "lp-transport-progress-wrap" },
        Y.createElement("span", { className: "lp-transport-time" }, hc(u.elapsedMs)),
        Y.createElement(
          "div",
          { className: "lp-transport-progress" },
          Y.createElement("div", { className: "lp-transport-progress-fill", style: { width: `${i}%` } })
        ),
        Y.createElement("span", { className: "lp-transport-time" }, hc(u.totalMs))
      ),
      a ? Y.createElement("span", { key: "device", className: "lp-transport-device" }, `Playing on ${u.deviceName}`) : null,
      Tr({ key: "nearby", icon: "icon-nearby", label: "Records nearby", onClick: d.onNearby }),
      Tr({ key: "device-switch", icon: "icon-device", label: "Choose playback device", onClick: d.onDeviceSwitch })
    )
  ];
  return Y.createElement(Ji, {
    className: "lp-transport",
    src: void 0,
    autoPlay: !1,
    autoPlayAfterSrcChange: !1,
    showJumpControls: !1,
    showSkipControls: !1,
    showFilledProgress: !1,
    showDownloadProgress: !1,
    hasDefaultKeyBindings: !1,
    layout: "stacked",
    header: c,
    customProgressBarSection: [],
    customControlsSection: m
  });
}
function Xp(u, d) {
  const i = Fd.createRoot(u);
  return {
    update(a) {
      i.render(Y.createElement(Kp, { viewModel: a, handlers: d }));
    },
    unmount() {
      i.unmount();
    }
  };
}
export {
  Xp as mountTransport
};
