function kd(a) {
  return a && a.__esModule && Object.prototype.hasOwnProperty.call(a, "default") ? a.default : a;
}
var as = { exports: {} }, te = {};
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
function xd() {
  if (Za) return te;
  Za = 1;
  var a = Symbol.for("react.element"), l = Symbol.for("react.portal"), s = Symbol.for("react.fragment"), c = Symbol.for("react.strict_mode"), m = Symbol.for("react.profiler"), w = Symbol.for("react.provider"), T = Symbol.for("react.context"), P = Symbol.for("react.forward_ref"), D = Symbol.for("react.suspense"), U = Symbol.for("react.memo"), z = Symbol.for("react.lazy"), W = Symbol.iterator;
  function $(h) {
    return h === null || typeof h != "object" ? null : (h = W && h[W] || h["@@iterator"], typeof h == "function" ? h : null);
  }
  var A = { isMounted: function() {
    return !1;
  }, enqueueForceUpdate: function() {
  }, enqueueReplaceState: function() {
  }, enqueueSetState: function() {
  } }, X = Object.assign, K = {};
  function Q(h, _, Y) {
    this.props = h, this.context = _, this.refs = K, this.updater = Y || A;
  }
  Q.prototype.isReactComponent = {}, Q.prototype.setState = function(h, _) {
    if (typeof h != "object" && typeof h != "function" && h != null) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
    this.updater.enqueueSetState(this, h, _, "setState");
  }, Q.prototype.forceUpdate = function(h) {
    this.updater.enqueueForceUpdate(this, h, "forceUpdate");
  };
  function Se() {
  }
  Se.prototype = Q.prototype;
  function Me(h, _, Y) {
    this.props = h, this.context = _, this.refs = K, this.updater = Y || A;
  }
  var We = Me.prototype = new Se();
  We.constructor = Me, X(We, Q.prototype), We.isPureReactComponent = !0;
  var Ie = Array.isArray, Qe = Object.prototype.hasOwnProperty, ke = { current: null }, Ge = { key: !0, ref: !0, __self: !0, __source: !0 };
  function Oe(h, _, Y) {
    var q, J = {}, ie = null, ce = null;
    if (_ != null) for (q in _.ref !== void 0 && (ce = _.ref), _.key !== void 0 && (ie = "" + _.key), _) Qe.call(_, q) && !Ge.hasOwnProperty(q) && (J[q] = _[q]);
    var re = arguments.length - 2;
    if (re === 1) J.children = Y;
    else if (1 < re) {
      for (var se = Array(re), qe = 0; qe < re; qe++) se[qe] = arguments[qe + 2];
      J.children = se;
    }
    if (h && h.defaultProps) for (q in re = h.defaultProps, re) J[q] === void 0 && (J[q] = re[q]);
    return { $$typeof: a, type: h, key: ie, ref: ce, props: J, _owner: ke.current };
  }
  function pt(h, _) {
    return { $$typeof: a, type: h.type, key: _, ref: h.ref, props: h.props, _owner: h._owner };
  }
  function Fe(h) {
    return typeof h == "object" && h !== null && h.$$typeof === a;
  }
  function Ct(h) {
    var _ = { "=": "=0", ":": "=2" };
    return "$" + h.replace(/[=:]/g, function(Y) {
      return _[Y];
    });
  }
  var ct = /\/+/g;
  function it(h, _) {
    return typeof h == "object" && h !== null && h.key != null ? Ct("" + h.key) : _.toString(36);
  }
  function Ve(h, _, Y, q, J) {
    var ie = typeof h;
    (ie === "undefined" || ie === "boolean") && (h = null);
    var ce = !1;
    if (h === null) ce = !0;
    else switch (ie) {
      case "string":
      case "number":
        ce = !0;
        break;
      case "object":
        switch (h.$$typeof) {
          case a:
          case l:
            ce = !0;
        }
    }
    if (ce) return ce = h, J = J(ce), h = q === "" ? "." + it(ce, 0) : q, Ie(J) ? (Y = "", h != null && (Y = h.replace(ct, "$&/") + "/"), Ve(J, _, Y, "", function(qe) {
      return qe;
    })) : J != null && (Fe(J) && (J = pt(J, Y + (!J.key || ce && ce.key === J.key ? "" : ("" + J.key).replace(ct, "$&/") + "/") + h)), _.push(J)), 1;
    if (ce = 0, q = q === "" ? "." : q + ":", Ie(h)) for (var re = 0; re < h.length; re++) {
      ie = h[re];
      var se = q + it(ie, re);
      ce += Ve(ie, _, Y, se, J);
    }
    else if (se = $(h), typeof se == "function") for (h = se.call(h), re = 0; !(ie = h.next()).done; ) ie = ie.value, se = q + it(ie, re++), ce += Ve(ie, _, Y, se, J);
    else if (ie === "object") throw _ = String(h), Error("Objects are not valid as a React child (found: " + (_ === "[object Object]" ? "object with keys {" + Object.keys(h).join(", ") + "}" : _) + "). If you meant to render a collection of children, use an array instead.");
    return ce;
  }
  function ht(h, _, Y) {
    if (h == null) return h;
    var q = [], J = 0;
    return Ve(h, q, "", "", function(ie) {
      return _.call(Y, ie, J++);
    }), q;
  }
  function fe(h) {
    if (h._status === -1) {
      var _ = h._result;
      _ = _(), _.then(function(Y) {
        (h._status === 0 || h._status === -1) && (h._status = 1, h._result = Y);
      }, function(Y) {
        (h._status === 0 || h._status === -1) && (h._status = 2, h._result = Y);
      }), h._status === -1 && (h._status = 0, h._result = _);
    }
    if (h._status === 1) return h._result.default;
    throw h._result;
  }
  var ye = { current: null }, C = { transition: null }, j = { ReactCurrentDispatcher: ye, ReactCurrentBatchConfig: C, ReactCurrentOwner: ke };
  function R() {
    throw Error("act(...) is not supported in production builds of React.");
  }
  return te.Children = { map: ht, forEach: function(h, _, Y) {
    ht(h, function() {
      _.apply(this, arguments);
    }, Y);
  }, count: function(h) {
    var _ = 0;
    return ht(h, function() {
      _++;
    }), _;
  }, toArray: function(h) {
    return ht(h, function(_) {
      return _;
    }) || [];
  }, only: function(h) {
    if (!Fe(h)) throw Error("React.Children.only expected to receive a single React element child.");
    return h;
  } }, te.Component = Q, te.Fragment = s, te.Profiler = m, te.PureComponent = Me, te.StrictMode = c, te.Suspense = D, te.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = j, te.act = R, te.cloneElement = function(h, _, Y) {
    if (h == null) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + h + ".");
    var q = X({}, h.props), J = h.key, ie = h.ref, ce = h._owner;
    if (_ != null) {
      if (_.ref !== void 0 && (ie = _.ref, ce = ke.current), _.key !== void 0 && (J = "" + _.key), h.type && h.type.defaultProps) var re = h.type.defaultProps;
      for (se in _) Qe.call(_, se) && !Ge.hasOwnProperty(se) && (q[se] = _[se] === void 0 && re !== void 0 ? re[se] : _[se]);
    }
    var se = arguments.length - 2;
    if (se === 1) q.children = Y;
    else if (1 < se) {
      re = Array(se);
      for (var qe = 0; qe < se; qe++) re[qe] = arguments[qe + 2];
      q.children = re;
    }
    return { $$typeof: a, type: h.type, key: J, ref: ie, props: q, _owner: ce };
  }, te.createContext = function(h) {
    return h = { $$typeof: T, _currentValue: h, _currentValue2: h, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null }, h.Provider = { $$typeof: w, _context: h }, h.Consumer = h;
  }, te.createElement = Oe, te.createFactory = function(h) {
    var _ = Oe.bind(null, h);
    return _.type = h, _;
  }, te.createRef = function() {
    return { current: null };
  }, te.forwardRef = function(h) {
    return { $$typeof: P, render: h };
  }, te.isValidElement = Fe, te.lazy = function(h) {
    return { $$typeof: z, _payload: { _status: -1, _result: h }, _init: fe };
  }, te.memo = function(h, _) {
    return { $$typeof: U, type: h, compare: _ === void 0 ? null : _ };
  }, te.startTransition = function(h) {
    var _ = C.transition;
    C.transition = {};
    try {
      h();
    } finally {
      C.transition = _;
    }
  }, te.unstable_act = R, te.useCallback = function(h, _) {
    return ye.current.useCallback(h, _);
  }, te.useContext = function(h) {
    return ye.current.useContext(h);
  }, te.useDebugValue = function() {
  }, te.useDeferredValue = function(h) {
    return ye.current.useDeferredValue(h);
  }, te.useEffect = function(h, _) {
    return ye.current.useEffect(h, _);
  }, te.useId = function() {
    return ye.current.useId();
  }, te.useImperativeHandle = function(h, _, Y) {
    return ye.current.useImperativeHandle(h, _, Y);
  }, te.useInsertionEffect = function(h, _) {
    return ye.current.useInsertionEffect(h, _);
  }, te.useLayoutEffect = function(h, _) {
    return ye.current.useLayoutEffect(h, _);
  }, te.useMemo = function(h, _) {
    return ye.current.useMemo(h, _);
  }, te.useReducer = function(h, _, Y) {
    return ye.current.useReducer(h, _, Y);
  }, te.useRef = function(h) {
    return ye.current.useRef(h);
  }, te.useState = function(h) {
    return ye.current.useState(h);
  }, te.useSyncExternalStore = function(h, _, Y) {
    return ye.current.useSyncExternalStore(h, _, Y);
  }, te.useTransition = function() {
    return ye.current.useTransition();
  }, te.version = "18.3.1", te;
}
var Ja;
function gs() {
  return Ja || (Ja = 1, as.exports = xd()), as.exports;
}
var ee = gs();
const cs = /* @__PURE__ */ kd(ee);
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
function Ed() {
  return ba || (ba = 1, (function(a) {
    function l(C, j) {
      var R = C.length;
      C.push(j);
      e: for (; 0 < R; ) {
        var h = R - 1 >>> 1, _ = C[h];
        if (0 < m(_, j)) C[h] = j, C[R] = _, R = h;
        else break e;
      }
    }
    function s(C) {
      return C.length === 0 ? null : C[0];
    }
    function c(C) {
      if (C.length === 0) return null;
      var j = C[0], R = C.pop();
      if (R !== j) {
        C[0] = R;
        e: for (var h = 0, _ = C.length, Y = _ >>> 1; h < Y; ) {
          var q = 2 * (h + 1) - 1, J = C[q], ie = q + 1, ce = C[ie];
          if (0 > m(J, R)) ie < _ && 0 > m(ce, J) ? (C[h] = ce, C[ie] = R, h = ie) : (C[h] = J, C[q] = R, h = q);
          else if (ie < _ && 0 > m(ce, R)) C[h] = ce, C[ie] = R, h = ie;
          else break e;
        }
      }
      return j;
    }
    function m(C, j) {
      var R = C.sortIndex - j.sortIndex;
      return R !== 0 ? R : C.id - j.id;
    }
    if (typeof performance == "object" && typeof performance.now == "function") {
      var w = performance;
      a.unstable_now = function() {
        return w.now();
      };
    } else {
      var T = Date, P = T.now();
      a.unstable_now = function() {
        return T.now() - P;
      };
    }
    var D = [], U = [], z = 1, W = null, $ = 3, A = !1, X = !1, K = !1, Q = typeof setTimeout == "function" ? setTimeout : null, Se = typeof clearTimeout == "function" ? clearTimeout : null, Me = typeof setImmediate < "u" ? setImmediate : null;
    typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
    function We(C) {
      for (var j = s(U); j !== null; ) {
        if (j.callback === null) c(U);
        else if (j.startTime <= C) c(U), j.sortIndex = j.expirationTime, l(D, j);
        else break;
        j = s(U);
      }
    }
    function Ie(C) {
      if (K = !1, We(C), !X) if (s(D) !== null) X = !0, fe(Qe);
      else {
        var j = s(U);
        j !== null && ye(Ie, j.startTime - C);
      }
    }
    function Qe(C, j) {
      X = !1, K && (K = !1, Se(Oe), Oe = -1), A = !0;
      var R = $;
      try {
        for (We(j), W = s(D); W !== null && (!(W.expirationTime > j) || C && !Ct()); ) {
          var h = W.callback;
          if (typeof h == "function") {
            W.callback = null, $ = W.priorityLevel;
            var _ = h(W.expirationTime <= j);
            j = a.unstable_now(), typeof _ == "function" ? W.callback = _ : W === s(D) && c(D), We(j);
          } else c(D);
          W = s(D);
        }
        if (W !== null) var Y = !0;
        else {
          var q = s(U);
          q !== null && ye(Ie, q.startTime - j), Y = !1;
        }
        return Y;
      } finally {
        W = null, $ = R, A = !1;
      }
    }
    var ke = !1, Ge = null, Oe = -1, pt = 5, Fe = -1;
    function Ct() {
      return !(a.unstable_now() - Fe < pt);
    }
    function ct() {
      if (Ge !== null) {
        var C = a.unstable_now();
        Fe = C;
        var j = !0;
        try {
          j = Ge(!0, C);
        } finally {
          j ? it() : (ke = !1, Ge = null);
        }
      } else ke = !1;
    }
    var it;
    if (typeof Me == "function") it = function() {
      Me(ct);
    };
    else if (typeof MessageChannel < "u") {
      var Ve = new MessageChannel(), ht = Ve.port2;
      Ve.port1.onmessage = ct, it = function() {
        ht.postMessage(null);
      };
    } else it = function() {
      Q(ct, 0);
    };
    function fe(C) {
      Ge = C, ke || (ke = !0, it());
    }
    function ye(C, j) {
      Oe = Q(function() {
        C(a.unstable_now());
      }, j);
    }
    a.unstable_IdlePriority = 5, a.unstable_ImmediatePriority = 1, a.unstable_LowPriority = 4, a.unstable_NormalPriority = 3, a.unstable_Profiling = null, a.unstable_UserBlockingPriority = 2, a.unstable_cancelCallback = function(C) {
      C.callback = null;
    }, a.unstable_continueExecution = function() {
      X || A || (X = !0, fe(Qe));
    }, a.unstable_forceFrameRate = function(C) {
      0 > C || 125 < C ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : pt = 0 < C ? Math.floor(1e3 / C) : 5;
    }, a.unstable_getCurrentPriorityLevel = function() {
      return $;
    }, a.unstable_getFirstCallbackNode = function() {
      return s(D);
    }, a.unstable_next = function(C) {
      switch ($) {
        case 1:
        case 2:
        case 3:
          var j = 3;
          break;
        default:
          j = $;
      }
      var R = $;
      $ = j;
      try {
        return C();
      } finally {
        $ = R;
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
      var R = $;
      $ = C;
      try {
        return j();
      } finally {
        $ = R;
      }
    }, a.unstable_scheduleCallback = function(C, j, R) {
      var h = a.unstable_now();
      switch (typeof R == "object" && R !== null ? (R = R.delay, R = typeof R == "number" && 0 < R ? h + R : h) : R = h, C) {
        case 1:
          var _ = -1;
          break;
        case 2:
          _ = 250;
          break;
        case 5:
          _ = 1073741823;
          break;
        case 4:
          _ = 1e4;
          break;
        default:
          _ = 5e3;
      }
      return _ = R + _, C = { id: z++, callback: j, priorityLevel: C, startTime: R, expirationTime: _, sortIndex: -1 }, R > h ? (C.sortIndex = R, l(U, C), s(D) === null && C === s(U) && (K ? (Se(Oe), Oe = -1) : K = !0, ye(Ie, R - h))) : (C.sortIndex = _, l(D, C), X || A || (X = !0, fe(Qe))), C;
    }, a.unstable_shouldYield = Ct, a.unstable_wrapCallback = function(C) {
      var j = $;
      return function() {
        var R = $;
        $ = j;
        try {
          return C.apply(this, arguments);
        } finally {
          $ = R;
        }
      };
    };
  })(ps)), ps;
}
var ec;
function Cd() {
  return ec || (ec = 1, ds.exports = Ed()), ds.exports;
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
function Td() {
  if (tc) return _t;
  tc = 1;
  var a = gs(), l = Cd();
  function s(e) {
    for (var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, n = 1; n < arguments.length; n++) t += "&args[]=" + encodeURIComponent(arguments[n]);
    return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  var c = /* @__PURE__ */ new Set(), m = {};
  function w(e, t) {
    T(e, t), T(e + "Capture", t);
  }
  function T(e, t) {
    for (m[e] = t, e = 0; e < t.length; e++) c.add(t[e]);
  }
  var P = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), D = Object.prototype.hasOwnProperty, U = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, z = {}, W = {};
  function $(e) {
    return D.call(W, e) ? !0 : D.call(z, e) ? !1 : U.test(e) ? W[e] = !0 : (z[e] = !0, !1);
  }
  function A(e, t, n, r) {
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
  function X(e, t, n, r) {
    if (t === null || typeof t > "u" || A(e, t, n, r)) return !0;
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
  function K(e, t, n, r, i, o, u) {
    this.acceptsBooleans = t === 2 || t === 3 || t === 4, this.attributeName = r, this.attributeNamespace = i, this.mustUseProperty = n, this.propertyName = e, this.type = t, this.sanitizeURL = o, this.removeEmptyString = u;
  }
  var Q = {};
  "children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e) {
    Q[e] = new K(e, 0, !1, e, null, !1, !1);
  }), [["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(e) {
    var t = e[0];
    Q[t] = new K(t, 1, !1, e[1], null, !1, !1);
  }), ["contentEditable", "draggable", "spellCheck", "value"].forEach(function(e) {
    Q[e] = new K(e, 2, !1, e.toLowerCase(), null, !1, !1);
  }), ["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(e) {
    Q[e] = new K(e, 2, !1, e, null, !1, !1);
  }), "allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e) {
    Q[e] = new K(e, 3, !1, e.toLowerCase(), null, !1, !1);
  }), ["checked", "multiple", "muted", "selected"].forEach(function(e) {
    Q[e] = new K(e, 3, !0, e, null, !1, !1);
  }), ["capture", "download"].forEach(function(e) {
    Q[e] = new K(e, 4, !1, e, null, !1, !1);
  }), ["cols", "rows", "size", "span"].forEach(function(e) {
    Q[e] = new K(e, 6, !1, e, null, !1, !1);
  }), ["rowSpan", "start"].forEach(function(e) {
    Q[e] = new K(e, 5, !1, e.toLowerCase(), null, !1, !1);
  });
  var Se = /[\-:]([a-z])/g;
  function Me(e) {
    return e[1].toUpperCase();
  }
  "accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e) {
    var t = e.replace(
      Se,
      Me
    );
    Q[t] = new K(t, 1, !1, e, null, !1, !1);
  }), "xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e) {
    var t = e.replace(Se, Me);
    Q[t] = new K(t, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1);
  }), ["xml:base", "xml:lang", "xml:space"].forEach(function(e) {
    var t = e.replace(Se, Me);
    Q[t] = new K(t, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1, !1);
  }), ["tabIndex", "crossOrigin"].forEach(function(e) {
    Q[e] = new K(e, 1, !1, e.toLowerCase(), null, !1, !1);
  }), Q.xlinkHref = new K("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0, !1), ["src", "href", "action", "formAction"].forEach(function(e) {
    Q[e] = new K(e, 1, !1, e.toLowerCase(), null, !0, !0);
  });
  function We(e, t, n, r) {
    var i = Q.hasOwnProperty(t) ? Q[t] : null;
    (i !== null ? i.type !== 0 : r || !(2 < t.length) || t[0] !== "o" && t[0] !== "O" || t[1] !== "n" && t[1] !== "N") && (X(t, n, i, r) && (n = null), r || i === null ? $(t) && (n === null ? e.removeAttribute(t) : e.setAttribute(t, "" + n)) : i.mustUseProperty ? e[i.propertyName] = n === null ? i.type === 3 ? !1 : "" : n : (t = i.attributeName, r = i.attributeNamespace, n === null ? e.removeAttribute(t) : (i = i.type, n = i === 3 || i === 4 && n === !0 ? "" : "" + n, r ? e.setAttributeNS(r, t, n) : e.setAttribute(t, n))));
  }
  var Ie = a.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, Qe = Symbol.for("react.element"), ke = Symbol.for("react.portal"), Ge = Symbol.for("react.fragment"), Oe = Symbol.for("react.strict_mode"), pt = Symbol.for("react.profiler"), Fe = Symbol.for("react.provider"), Ct = Symbol.for("react.context"), ct = Symbol.for("react.forward_ref"), it = Symbol.for("react.suspense"), Ve = Symbol.for("react.suspense_list"), ht = Symbol.for("react.memo"), fe = Symbol.for("react.lazy"), ye = Symbol.for("react.offscreen"), C = Symbol.iterator;
  function j(e) {
    return e === null || typeof e != "object" ? null : (e = C && e[C] || e["@@iterator"], typeof e == "function" ? e : null);
  }
  var R = Object.assign, h;
  function _(e) {
    if (h === void 0) try {
      throw Error();
    } catch (n) {
      var t = n.stack.trim().match(/\n( *(at )?)/);
      h = t && t[1] || "";
    }
    return `
` + h + e;
  }
  var Y = !1;
  function q(e, t) {
    if (!e || Y) return "";
    Y = !0;
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
`), o = r.stack.split(`
`), u = i.length - 1, f = o.length - 1; 1 <= u && 0 <= f && i[u] !== o[f]; ) f--;
        for (; 1 <= u && 0 <= f; u--, f--) if (i[u] !== o[f]) {
          if (u !== 1 || f !== 1)
            do
              if (u--, f--, 0 > f || i[u] !== o[f]) {
                var d = `
` + i[u].replace(" at new ", " at ");
                return e.displayName && d.includes("<anonymous>") && (d = d.replace("<anonymous>", e.displayName)), d;
              }
            while (1 <= u && 0 <= f);
          break;
        }
      }
    } finally {
      Y = !1, Error.prepareStackTrace = n;
    }
    return (e = e ? e.displayName || e.name : "") ? _(e) : "";
  }
  function J(e) {
    switch (e.tag) {
      case 5:
        return _(e.type);
      case 16:
        return _("Lazy");
      case 13:
        return _("Suspense");
      case 19:
        return _("SuspenseList");
      case 0:
      case 2:
      case 15:
        return e = q(e.type, !1), e;
      case 11:
        return e = q(e.type.render, !1), e;
      case 1:
        return e = q(e.type, !0), e;
      default:
        return "";
    }
  }
  function ie(e) {
    if (e == null) return null;
    if (typeof e == "function") return e.displayName || e.name || null;
    if (typeof e == "string") return e;
    switch (e) {
      case Ge:
        return "Fragment";
      case ke:
        return "Portal";
      case pt:
        return "Profiler";
      case Oe:
        return "StrictMode";
      case it:
        return "Suspense";
      case Ve:
        return "SuspenseList";
    }
    if (typeof e == "object") switch (e.$$typeof) {
      case Ct:
        return (e.displayName || "Context") + ".Consumer";
      case Fe:
        return (e._context.displayName || "Context") + ".Provider";
      case ct:
        var t = e.render;
        return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
      case ht:
        return t = e.displayName || null, t !== null ? t : ie(e.type) || "Memo";
      case fe:
        t = e._payload, e = e._init;
        try {
          return ie(e(t));
        } catch {
        }
    }
    return null;
  }
  function ce(e) {
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
        return ie(t);
      case 8:
        return t === Oe ? "StrictMode" : "Mode";
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
  function re(e) {
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
  function se(e) {
    var t = e.type;
    return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
  }
  function qe(e) {
    var t = se(e) ? "checked" : "value", n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t), r = "" + e[t];
    if (!e.hasOwnProperty(t) && typeof n < "u" && typeof n.get == "function" && typeof n.set == "function") {
      var i = n.get, o = n.set;
      return Object.defineProperty(e, t, { configurable: !0, get: function() {
        return i.call(this);
      }, set: function(u) {
        r = "" + u, o.call(this, u);
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
    e._valueTracker || (e._valueTracker = qe(e));
  }
  function Kt(e) {
    if (!e) return !1;
    var t = e._valueTracker;
    if (!t) return !0;
    var n = t.getValue(), r = "";
    return e && (r = se(e) ? e.checked ? "true" : "false" : e.value), e = r, e !== n ? (t.setValue(e), !0) : !1;
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
    return R({}, t, { defaultChecked: void 0, defaultValue: void 0, value: void 0, checked: n ?? e._wrapperState.initialChecked });
  }
  function Tr(e, t) {
    var n = t.defaultValue == null ? "" : t.defaultValue, r = t.checked != null ? t.checked : t.defaultChecked;
    n = re(t.value != null ? t.value : n), e._wrapperState = { initialChecked: r, initialValue: n, controlled: t.type === "checkbox" || t.type === "radio" ? t.checked != null : t.value != null };
  }
  function Pr(e, t) {
    t = t.checked, t != null && We(e, "checked", t, !1);
  }
  function Rr(e, t) {
    Pr(e, t);
    var n = re(t.value), r = t.type;
    if (n != null) r === "number" ? (n === 0 && e.value === "" || e.value != n) && (e.value = "" + n) : e.value !== "" + n && (e.value = "" + n);
    else if (r === "submit" || r === "reset") {
      e.removeAttribute("value");
      return;
    }
    t.hasOwnProperty("value") ? qn(e, t.type, n) : t.hasOwnProperty("defaultValue") && qn(e, t.type, re(t.defaultValue)), t.checked == null && t.defaultChecked != null && (e.defaultChecked = !!t.defaultChecked);
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
      for (n = "" + re(n), t = null, i = 0; i < e.length; i++) {
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
    return R({}, t, { value: void 0, defaultValue: void 0, children: "" + e._wrapperState.initialValue });
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
    e._wrapperState = { initialValue: re(n) };
  }
  function ne(e, t) {
    var n = re(t.value), r = re(t.defaultValue);
    n != null && (n = "" + n, n !== e.value && (e.value = n), t.defaultValue == null && e.defaultValue !== n && (e.defaultValue = n)), r != null && (e.defaultValue = "" + r);
  }
  function Z(e) {
    var t = e.textContent;
    t === e._wrapperState.initialValue && t !== "" && t !== null && (e.value = t);
  }
  function b(e) {
    switch (e) {
      case "svg":
        return "http://www.w3.org/2000/svg";
      case "math":
        return "http://www.w3.org/1998/Math/MathML";
      default:
        return "http://www.w3.org/1999/xhtml";
    }
  }
  function le(e, t) {
    return e == null || e === "http://www.w3.org/1999/xhtml" ? b(t) : e === "http://www.w3.org/2000/svg" && t === "foreignObject" ? "http://www.w3.org/1999/xhtml" : e;
  }
  var he, ge = (function(e) {
    return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction ? function(t, n, r, i) {
      MSApp.execUnsafeLocalFunction(function() {
        return e(t, n, r, i);
      });
    } : e;
  })(function(e, t) {
    if (e.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in e) e.innerHTML = t;
    else {
      for (he = he || document.createElement("div"), he.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>", t = he.firstChild; e.firstChild; ) e.removeChild(e.firstChild);
      for (; t.firstChild; ) e.appendChild(t.firstChild);
    }
  });
  function xe(e, t) {
    if (t) {
      var n = e.firstChild;
      if (n && n === e.lastChild && n.nodeType === 3) {
        n.nodeValue = t;
        return;
      }
    }
    e.textContent = t;
  }
  var Pe = {
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
  }, we = ["Webkit", "ms", "Moz", "O"];
  Object.keys(Pe).forEach(function(e) {
    we.forEach(function(t) {
      t = t + e.charAt(0).toUpperCase() + e.substring(1), Pe[t] = Pe[e];
    });
  });
  function Re(e, t, n) {
    return t == null || typeof t == "boolean" || t === "" ? "" : n || typeof t != "number" || t === 0 || Pe.hasOwnProperty(e) && Pe[e] ? ("" + t).trim() : t + "px";
  }
  function de(e, t) {
    e = e.style;
    for (var n in t) if (t.hasOwnProperty(n)) {
      var r = n.indexOf("--") === 0, i = Re(n, t[n], r);
      n === "float" && (n = "cssFloat"), r ? e.setProperty(n, i) : e[n] = i;
    }
  }
  var ue = R({ menuitem: !0 }, { area: !0, base: !0, br: !0, col: !0, embed: !0, hr: !0, img: !0, input: !0, keygen: !0, link: !0, meta: !0, param: !0, source: !0, track: !0, wbr: !0 });
  function Ae(e, t) {
    if (t) {
      if (ue[e] && (t.children != null || t.dangerouslySetInnerHTML != null)) throw Error(s(137, e));
      if (t.dangerouslySetInnerHTML != null) {
        if (t.children != null) throw Error(s(60));
        if (typeof t.dangerouslySetInnerHTML != "object" || !("__html" in t.dangerouslySetInnerHTML)) throw Error(s(61));
      }
      if (t.style != null && typeof t.style != "object") throw Error(s(62));
    }
  }
  function me(e, t) {
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
  var G = null;
  function Ze(e) {
    return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
  }
  var tt = null, ve = null, Ye = null;
  function an(e) {
    if (e = Qr(e)) {
      if (typeof tt != "function") throw Error(s(280));
      var t = e.stateNode;
      t && (t = Ai(t), tt(e.stateNode, e.type, t));
    }
  }
  function Mt(e) {
    ve ? Ye ? Ye.push(e) : Ye = [e] : ve = e;
  }
  function Zn() {
    if (ve) {
      var e = ve, t = Ye;
      if (Ye = ve = null, an(e), t) for (e = 0; e < t.length; e++) an(t[e]);
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
      hi = !1, (ve !== null || Ye !== null) && (pi(), Zn());
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
  if (P) try {
    var fn = {};
    Object.defineProperty(fn, "passive", { get: function() {
      Jn = !0;
    } }), window.addEventListener("test", fn, fn), window.removeEventListener("test", fn, fn);
  } catch {
    Jn = !1;
  }
  function Mn(e, t, n, r, i, o, u, f, d) {
    var g = Array.prototype.slice.call(arguments, 3);
    try {
      t.apply(n, g);
    } catch (k) {
      this.onError(k);
    }
  }
  var In = !1, bn = null, On = !1, er = null, mi = { onError: function(e) {
    In = !0, bn = e;
  } };
  function Tl(e, t, n, r, i, o, u, f, d) {
    In = !1, bn = null, Mn.apply(mi, arguments);
  }
  function Pl(e, t, n, r, i, o, u, f, d) {
    if (Tl.apply(this, arguments), In) {
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
  function zc(e) {
    var t = e.alternate;
    if (!t) {
      if (t = Vt(e), t === null) throw Error(s(188));
      return t !== e ? null : e;
    }
    for (var n = e, r = t; ; ) {
      var i = n.return;
      if (i === null) break;
      var o = i.alternate;
      if (o === null) {
        if (r = i.return, r !== null) {
          n = r;
          continue;
        }
        break;
      }
      if (i.child === o.child) {
        for (o = i.child; o; ) {
          if (o === n) return Ss(i), e;
          if (o === r) return Ss(i), t;
          o = o.sibling;
        }
        throw Error(s(188));
      }
      if (n.return !== r.return) n = i, r = o;
      else {
        for (var u = !1, f = i.child; f; ) {
          if (f === n) {
            u = !0, n = i, r = o;
            break;
          }
          if (f === r) {
            u = !0, r = i, n = o;
            break;
          }
          f = f.sibling;
        }
        if (!u) {
          for (f = o.child; f; ) {
            if (f === n) {
              u = !0, n = o, r = i;
              break;
            }
            if (f === r) {
              u = !0, r = o, n = i;
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
    return e = zc(e), e !== null ? xs(e) : null;
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
  var Es = l.unstable_scheduleCallback, Cs = l.unstable_cancelCallback, Lc = l.unstable_shouldYield, Mc = l.unstable_requestPaint, Ue = l.unstable_now, Ic = l.unstable_getCurrentPriorityLevel, Rl = l.unstable_ImmediatePriority, Ts = l.unstable_UserBlockingPriority, vi = l.unstable_NormalPriority, Oc = l.unstable_LowPriority, Ps = l.unstable_IdlePriority, yi = null, Ht = null;
  function Ac(e) {
    if (Ht && typeof Ht.onCommitFiberRoot == "function") try {
      Ht.onCommitFiberRoot(yi, e, void 0, (e.current.flags & 128) === 128);
    } catch {
    }
  }
  var It = Math.clz32 ? Math.clz32 : Uc, jc = Math.log, Fc = Math.LN2;
  function Uc(e) {
    return e >>>= 0, e === 0 ? 32 : 31 - (jc(e) / Fc | 0) | 0;
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
    var r = 0, i = e.suspendedLanes, o = e.pingedLanes, u = n & 268435455;
    if (u !== 0) {
      var f = u & ~i;
      f !== 0 ? r = Dr(f) : (o &= u, o !== 0 && (r = Dr(o)));
    } else u = n & ~i, u !== 0 ? r = Dr(u) : o !== 0 && (r = Dr(o));
    if (r === 0) return 0;
    if (t !== 0 && t !== r && (t & i) === 0 && (i = r & -r, o = t & -t, i >= o || i === 16 && (o & 4194240) !== 0)) return t;
    if ((r & 4) !== 0 && (r |= n & 16), t = e.entangledLanes, t !== 0) for (e = e.entanglements, t &= r; 0 < t; ) n = 31 - It(t), i = 1 << n, r |= e[n], t &= ~i;
    return r;
  }
  function $c(e, t) {
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
  function Vc(e, t) {
    for (var n = e.suspendedLanes, r = e.pingedLanes, i = e.expirationTimes, o = e.pendingLanes; 0 < o; ) {
      var u = 31 - It(o), f = 1 << u, d = i[u];
      d === -1 ? ((f & n) === 0 || (f & r) !== 0) && (i[u] = $c(f, t)) : d <= t && (e.expiredLanes |= f), o &= ~f;
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
  function Hc(e, t) {
    var n = e.pendingLanes & ~t;
    e.pendingLanes = t, e.suspendedLanes = 0, e.pingedLanes = 0, e.expiredLanes &= t, e.mutableReadLanes &= t, e.entangledLanes &= t, t = e.entanglements;
    var r = e.eventTimes;
    for (e = e.expirationTimes; 0 < n; ) {
      var i = 31 - It(n), o = 1 << i;
      t[i] = 0, r[i] = -1, e[i] = -1, n &= ~o;
    }
  }
  function zl(e, t) {
    var n = e.entangledLanes |= t;
    for (e = e.entanglements; n; ) {
      var r = 31 - It(n), i = 1 << r;
      i & t | e[r] & t && (e[r] |= t), n &= ~i;
    }
  }
  var pe = 0;
  function Ns(e) {
    return e &= -e, 1 < e ? 4 < e ? (e & 268435455) !== 0 ? 16 : 536870912 : 4 : 1;
  }
  var Ds, Ll, zs, Ls, Ms, Ml = !1, Si = [], dn = null, pn = null, hn = null, Lr = /* @__PURE__ */ new Map(), Mr = /* @__PURE__ */ new Map(), mn = [], Bc = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
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
  function Ir(e, t, n, r, i, o) {
    return e === null || e.nativeEvent !== o ? (e = { blockedOn: t, domEventName: n, eventSystemFlags: r, nativeEvent: o, targetContainers: [i] }, t !== null && (t = Qr(t), t !== null && Ll(t)), e) : (e.eventSystemFlags |= r, t = e.targetContainers, i !== null && t.indexOf(i) === -1 && t.push(i), e);
  }
  function Wc(e, t, n, r, i) {
    switch (t) {
      case "focusin":
        return dn = Ir(dn, e, t, n, r, i), !0;
      case "dragenter":
        return pn = Ir(pn, e, t, n, r, i), !0;
      case "mouseover":
        return hn = Ir(hn, e, t, n, r, i), !0;
      case "pointerover":
        var o = i.pointerId;
        return Lr.set(o, Ir(Lr.get(o) || null, e, t, n, r, i)), !0;
      case "gotpointercapture":
        return o = i.pointerId, Mr.set(o, Ir(Mr.get(o) || null, e, t, n, r, i)), !0;
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
        G = r, n.target.dispatchEvent(r), G = null;
      } else return t = Qr(n), t !== null && Ll(t), e.blockedOn = n, !1;
      t.shift();
    }
    return !0;
  }
  function As(e, t, n) {
    ki(e) && n.delete(t);
  }
  function Yc() {
    Ml = !1, dn !== null && ki(dn) && (dn = null), pn !== null && ki(pn) && (pn = null), hn !== null && ki(hn) && (hn = null), Lr.forEach(As), Mr.forEach(As);
  }
  function Or(e, t) {
    e.blockedOn === t && (e.blockedOn = null, Ml || (Ml = !0, l.unstable_scheduleCallback(l.unstable_NormalPriority, Yc)));
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
  var tr = Ie.ReactCurrentBatchConfig, xi = !0;
  function Xc(e, t, n, r) {
    var i = pe, o = tr.transition;
    tr.transition = null;
    try {
      pe = 1, Il(e, t, n, r);
    } finally {
      pe = i, tr.transition = o;
    }
  }
  function Kc(e, t, n, r) {
    var i = pe, o = tr.transition;
    tr.transition = null;
    try {
      pe = 4, Il(e, t, n, r);
    } finally {
      pe = i, tr.transition = o;
    }
  }
  function Il(e, t, n, r) {
    if (xi) {
      var i = Ol(e, t, n, r);
      if (i === null) Jl(e, t, r, Ei, n), Is(e, r);
      else if (Wc(i, e, t, n, r)) r.stopPropagation();
      else if (Is(e, r), t & 4 && -1 < Bc.indexOf(e)) {
        for (; i !== null; ) {
          var o = Qr(i);
          if (o !== null && Ds(o), o = Ol(e, t, n, r), o === null && Jl(e, t, r, Ei, n), o === i) break;
          i = o;
        }
        i !== null && r.stopPropagation();
      } else Jl(e, t, r, null, n);
    }
  }
  var Ei = null;
  function Ol(e, t, n, r) {
    if (Ei = null, e = Ze(r), e = An(e), e !== null) if (t = Vt(e), t === null) e = null;
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
        switch (Ic()) {
          case Rl:
            return 1;
          case Ts:
            return 4;
          case vi:
          case Oc:
            return 16;
          case Ps:
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
    var e, t = Al, n = t.length, r, i = "value" in vn ? vn.value : vn.textContent, o = i.length;
    for (e = 0; e < n && t[e] === i[e]; e++) ;
    var u = n - e;
    for (r = 1; r <= u && t[n - r] === i[o - r]; r++) ;
    return Ci = i.slice(e, 1 < r ? 1 - r : void 0);
  }
  function Ti(e) {
    var t = e.keyCode;
    return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
  }
  function Pi() {
    return !0;
  }
  function Us() {
    return !1;
  }
  function St(e) {
    function t(n, r, i, o, u) {
      this._reactName = n, this._targetInst = i, this.type = r, this.nativeEvent = o, this.target = u, this.currentTarget = null;
      for (var f in e) e.hasOwnProperty(f) && (n = e[f], this[f] = n ? n(o) : o[f]);
      return this.isDefaultPrevented = (o.defaultPrevented != null ? o.defaultPrevented : o.returnValue === !1) ? Pi : Us, this.isPropagationStopped = Us, this;
    }
    return R(t.prototype, { preventDefault: function() {
      this.defaultPrevented = !0;
      var n = this.nativeEvent;
      n && (n.preventDefault ? n.preventDefault() : typeof n.returnValue != "unknown" && (n.returnValue = !1), this.isDefaultPrevented = Pi);
    }, stopPropagation: function() {
      var n = this.nativeEvent;
      n && (n.stopPropagation ? n.stopPropagation() : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0), this.isPropagationStopped = Pi);
    }, persist: function() {
    }, isPersistent: Pi }), t;
  }
  var nr = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(e) {
    return e.timeStamp || Date.now();
  }, defaultPrevented: 0, isTrusted: 0 }, jl = St(nr), jr = R({}, nr, { view: 0, detail: 0 }), Qc = St(jr), Fl, Ul, Fr, Ri = R({}, jr, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: Vl, button: 0, buttons: 0, relatedTarget: function(e) {
    return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
  }, movementX: function(e) {
    return "movementX" in e ? e.movementX : (e !== Fr && (Fr && e.type === "mousemove" ? (Fl = e.screenX - Fr.screenX, Ul = e.screenY - Fr.screenY) : Ul = Fl = 0, Fr = e), Fl);
  }, movementY: function(e) {
    return "movementY" in e ? e.movementY : Ul;
  } }), $s = St(Ri), Gc = R({}, Ri, { dataTransfer: 0 }), qc = St(Gc), Zc = R({}, jr, { relatedTarget: 0 }), $l = St(Zc), Jc = R({}, nr, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }), bc = St(Jc), ef = R({}, nr, { clipboardData: function(e) {
    return "clipboardData" in e ? e.clipboardData : window.clipboardData;
  } }), tf = St(ef), nf = R({}, nr, { data: 0 }), Vs = St(nf), rf = {
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
  }, lf = {
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
  }, of = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
  function sf(e) {
    var t = this.nativeEvent;
    return t.getModifierState ? t.getModifierState(e) : (e = of[e]) ? !!t[e] : !1;
  }
  function Vl() {
    return sf;
  }
  var uf = R({}, jr, { key: function(e) {
    if (e.key) {
      var t = rf[e.key] || e.key;
      if (t !== "Unidentified") return t;
    }
    return e.type === "keypress" ? (e = Ti(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? lf[e.keyCode] || "Unidentified" : "";
  }, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: Vl, charCode: function(e) {
    return e.type === "keypress" ? Ti(e) : 0;
  }, keyCode: function(e) {
    return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
  }, which: function(e) {
    return e.type === "keypress" ? Ti(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
  } }), af = St(uf), cf = R({}, Ri, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), Hs = St(cf), ff = R({}, jr, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: Vl }), df = St(ff), pf = R({}, nr, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }), hf = St(pf), mf = R({}, Ri, {
    deltaX: function(e) {
      return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
    },
    deltaY: function(e) {
      return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), vf = St(mf), yf = [9, 13, 27, 32], Hl = P && "CompositionEvent" in window, Ur = null;
  P && "documentMode" in document && (Ur = document.documentMode);
  var gf = P && "TextEvent" in window && !Ur, Bs = P && (!Hl || Ur && 8 < Ur && 11 >= Ur), Ws = " ", Ys = !1;
  function Xs(e, t) {
    switch (e) {
      case "keyup":
        return yf.indexOf(t.keyCode) !== -1;
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
  function wf(e, t) {
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
  function _f(e, t) {
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
  var Sf = { color: !0, date: !0, datetime: !0, "datetime-local": !0, email: !0, month: !0, number: !0, password: !0, range: !0, search: !0, tel: !0, text: !0, time: !0, url: !0, week: !0 };
  function Qs(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t === "input" ? !!Sf[e.type] : t === "textarea";
  }
  function Gs(e, t, n, r) {
    Mt(r), t = Mi(t, "onChange"), 0 < t.length && (n = new jl("onChange", "change", null, n, r), e.push({ event: n, listeners: t }));
  }
  var $r = null, Vr = null;
  function kf(e) {
    pu(e, 0);
  }
  function Ni(e) {
    var t = ur(e);
    if (Kt(t)) return e;
  }
  function xf(e, t) {
    if (e === "change") return t;
  }
  var qs = !1;
  if (P) {
    var Bl;
    if (P) {
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
      Gs(t, Vr, e, Ze(e)), Nr(kf, t);
    }
  }
  function Ef(e, t, n) {
    e === "focusin" ? (Js(), $r = t, Vr = n, $r.attachEvent("onpropertychange", bs)) : e === "focusout" && Js();
  }
  function Cf(e) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown") return Ni(Vr);
  }
  function Tf(e, t) {
    if (e === "click") return Ni(t);
  }
  function Pf(e, t) {
    if (e === "input" || e === "change") return Ni(t);
  }
  function Rf(e, t) {
    return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
  }
  var Ot = typeof Object.is == "function" ? Object.is : Rf;
  function Hr(e, t) {
    if (Ot(e, t)) return !0;
    if (typeof e != "object" || e === null || typeof t != "object" || t === null) return !1;
    var n = Object.keys(e), r = Object.keys(t);
    if (n.length !== r.length) return !1;
    for (r = 0; r < n.length; r++) {
      var i = n[r];
      if (!D.call(t, i) || !Ot(e[i], t[i])) return !1;
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
  function Nf(e) {
    var t = ru(), n = e.focusedElem, r = e.selectionRange;
    if (t !== n && n && n.ownerDocument && nu(n.ownerDocument.documentElement, n)) {
      if (r !== null && Yl(n)) {
        if (t = r.start, e = r.end, e === void 0 && (e = t), "selectionStart" in n) n.selectionStart = t, n.selectionEnd = Math.min(e, n.value.length);
        else if (e = (t = n.ownerDocument || document) && t.defaultView || window, e.getSelection) {
          e = e.getSelection();
          var i = n.textContent.length, o = Math.min(r.start, i);
          r = r.end === void 0 ? o : Math.min(r.end, i), !e.extend && o > r && (i = r, r = o, o = i), i = tu(n, o);
          var u = tu(
            n,
            r
          );
          i && u && (e.rangeCount !== 1 || e.anchorNode !== i.node || e.anchorOffset !== i.offset || e.focusNode !== u.node || e.focusOffset !== u.offset) && (t = t.createRange(), t.setStart(i.node, i.offset), e.removeAllRanges(), o > r ? (e.addRange(t), e.extend(u.node, u.offset)) : (t.setEnd(u.node, u.offset), e.addRange(t)));
        }
      }
      for (t = [], e = n; e = e.parentNode; ) e.nodeType === 1 && t.push({ element: e, left: e.scrollLeft, top: e.scrollTop });
      for (typeof n.focus == "function" && n.focus(), n = 0; n < t.length; n++) e = t[n], e.element.scrollLeft = e.left, e.element.scrollTop = e.top;
    }
  }
  var Df = P && "documentMode" in document && 11 >= document.documentMode, ir = null, Xl = null, Br = null, Kl = !1;
  function iu(e, t, n) {
    var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
    Kl || ir == null || ir !== ln(r) || (r = ir, "selectionStart" in r && Yl(r) ? r = { start: r.selectionStart, end: r.selectionEnd } : (r = (r.ownerDocument && r.ownerDocument.defaultView || window).getSelection(), r = { anchorNode: r.anchorNode, anchorOffset: r.anchorOffset, focusNode: r.focusNode, focusOffset: r.focusOffset }), Br && Hr(Br, r) || (Br = r, r = Mi(Xl, "onSelect"), 0 < r.length && (t = new jl("onSelect", "select", null, t, n), e.push({ event: t, listeners: r }), t.target = ir)));
  }
  function Di(e, t) {
    var n = {};
    return n[e.toLowerCase()] = t.toLowerCase(), n["Webkit" + e] = "webkit" + t, n["Moz" + e] = "moz" + t, n;
  }
  var lr = { animationend: Di("Animation", "AnimationEnd"), animationiteration: Di("Animation", "AnimationIteration"), animationstart: Di("Animation", "AnimationStart"), transitionend: Di("Transition", "TransitionEnd") }, Ql = {}, lu = {};
  P && (lu = document.createElement("div").style, "AnimationEvent" in window || (delete lr.animationend.animation, delete lr.animationiteration.animation, delete lr.animationstart.animation), "TransitionEvent" in window || delete lr.transitionend.transition);
  function zi(e) {
    if (Ql[e]) return Ql[e];
    if (!lr[e]) return e;
    var t = lr[e], n;
    for (n in t) if (t.hasOwnProperty(n) && n in lu) return Ql[e] = t[n];
    return e;
  }
  var ou = zi("animationend"), su = zi("animationiteration"), uu = zi("animationstart"), au = zi("transitionend"), cu = /* @__PURE__ */ new Map(), fu = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
  function yn(e, t) {
    cu.set(e, t), w(t, [e]);
  }
  for (var Gl = 0; Gl < fu.length; Gl++) {
    var ql = fu[Gl], zf = ql.toLowerCase(), Lf = ql[0].toUpperCase() + ql.slice(1);
    yn(zf, "on" + Lf);
  }
  yn(ou, "onAnimationEnd"), yn(su, "onAnimationIteration"), yn(uu, "onAnimationStart"), yn("dblclick", "onDoubleClick"), yn("focusin", "onFocus"), yn("focusout", "onBlur"), yn(au, "onTransitionEnd"), T("onMouseEnter", ["mouseout", "mouseover"]), T("onMouseLeave", ["mouseout", "mouseover"]), T("onPointerEnter", ["pointerout", "pointerover"]), T("onPointerLeave", ["pointerout", "pointerover"]), w("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" ")), w("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")), w("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]), w("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" ")), w("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" ")), w("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
  var Wr = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), Mf = new Set("cancel close invalid load scroll toggle".split(" ").concat(Wr));
  function du(e, t, n) {
    var r = e.type || "unknown-event";
    e.currentTarget = n, Pl(r, t, void 0, e), e.currentTarget = null;
  }
  function pu(e, t) {
    t = (t & 4) !== 0;
    for (var n = 0; n < e.length; n++) {
      var r = e[n], i = r.event;
      r = r.listeners;
      e: {
        var o = void 0;
        if (t) for (var u = r.length - 1; 0 <= u; u--) {
          var f = r[u], d = f.instance, g = f.currentTarget;
          if (f = f.listener, d !== o && i.isPropagationStopped()) break e;
          du(i, f, g), o = d;
        }
        else for (u = 0; u < r.length; u++) {
          if (f = r[u], d = f.instance, g = f.currentTarget, f = f.listener, d !== o && i.isPropagationStopped()) break e;
          du(i, f, g), o = d;
        }
      }
    }
    if (On) throw e = er, On = !1, er = null, e;
  }
  function Ee(e, t) {
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
        n !== "selectionchange" && (Mf.has(n) || Zl(n, !1, e), Zl(n, !0, e));
      });
      var t = e.nodeType === 9 ? e : e.ownerDocument;
      t === null || t[Li] || (t[Li] = !0, Zl("selectionchange", !1, t));
    }
  }
  function hu(e, t, n, r) {
    switch (js(t)) {
      case 1:
        var i = Xc;
        break;
      case 4:
        i = Kc;
        break;
      default:
        i = Il;
    }
    n = i.bind(null, t, n, e), i = void 0, !Jn || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (i = !0), r ? i !== void 0 ? e.addEventListener(t, n, { capture: !0, passive: i }) : e.addEventListener(t, n, !0) : i !== void 0 ? e.addEventListener(t, n, { passive: i }) : e.addEventListener(t, n, !1);
  }
  function Jl(e, t, n, r, i) {
    var o = r;
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
            r = o = u;
            continue e;
          }
          f = f.parentNode;
        }
      }
      r = r.return;
    }
    Nr(function() {
      var g = o, k = Ze(n), x = [];
      e: {
        var S = cu.get(e);
        if (S !== void 0) {
          var N = jl, M = e;
          switch (e) {
            case "keypress":
              if (Ti(n) === 0) break e;
            case "keydown":
            case "keyup":
              N = af;
              break;
            case "focusin":
              M = "focus", N = $l;
              break;
            case "focusout":
              M = "blur", N = $l;
              break;
            case "beforeblur":
            case "afterblur":
              N = $l;
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
              N = $s;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              N = qc;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              N = df;
              break;
            case ou:
            case su:
            case uu:
              N = bc;
              break;
            case au:
              N = hf;
              break;
            case "scroll":
              N = Qc;
              break;
            case "wheel":
              N = vf;
              break;
            case "copy":
            case "cut":
            case "paste":
              N = tf;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              N = Hs;
          }
          var I = (t & 4) !== 0, $e = !I && e === "scroll", v = I ? S !== null ? S + "Capture" : null : S;
          I = [];
          for (var p = g, y; p !== null; ) {
            y = p;
            var E = y.stateNode;
            if (y.tag === 5 && E !== null && (y = E, v !== null && (E = cn(p, v), E != null && I.push(Xr(p, E, y)))), $e) break;
            p = p.return;
          }
          0 < I.length && (S = new N(S, M, null, n, k), x.push({ event: S, listeners: I }));
        }
      }
      if ((t & 7) === 0) {
        e: {
          if (S = e === "mouseover" || e === "pointerover", N = e === "mouseout" || e === "pointerout", S && n !== G && (M = n.relatedTarget || n.fromElement) && (An(M) || M[qt])) break e;
          if ((N || S) && (S = k.window === k ? k : (S = k.ownerDocument) ? S.defaultView || S.parentWindow : window, N ? (M = n.relatedTarget || n.toElement, N = g, M = M ? An(M) : null, M !== null && ($e = Vt(M), M !== $e || M.tag !== 5 && M.tag !== 6) && (M = null)) : (N = null, M = g), N !== M)) {
            if (I = $s, E = "onMouseLeave", v = "onMouseEnter", p = "mouse", (e === "pointerout" || e === "pointerover") && (I = Hs, E = "onPointerLeave", v = "onPointerEnter", p = "pointer"), $e = N == null ? S : ur(N), y = M == null ? S : ur(M), S = new I(E, p + "leave", N, n, k), S.target = $e, S.relatedTarget = y, E = null, An(k) === g && (I = new I(v, p + "enter", M, n, k), I.target = y, I.relatedTarget = $e, E = I), $e = E, N && M) t: {
              for (I = N, v = M, p = 0, y = I; y; y = or(y)) p++;
              for (y = 0, E = v; E; E = or(E)) y++;
              for (; 0 < p - y; ) I = or(I), p--;
              for (; 0 < y - p; ) v = or(v), y--;
              for (; p--; ) {
                if (I === v || v !== null && I === v.alternate) break t;
                I = or(I), v = or(v);
              }
              I = null;
            }
            else I = null;
            N !== null && mu(x, S, N, I, !1), M !== null && $e !== null && mu(x, $e, M, I, !0);
          }
        }
        e: {
          if (S = g ? ur(g) : window, N = S.nodeName && S.nodeName.toLowerCase(), N === "select" || N === "input" && S.type === "file") var O = xf;
          else if (Qs(S)) if (qs) O = Pf;
          else {
            O = Cf;
            var V = Ef;
          }
          else (N = S.nodeName) && N.toLowerCase() === "input" && (S.type === "checkbox" || S.type === "radio") && (O = Tf);
          if (O && (O = O(e, g))) {
            Gs(x, O, n, k);
            break e;
          }
          V && V(e, S, g), e === "focusout" && (V = S._wrapperState) && V.controlled && S.type === "number" && qn(S, "number", S.value);
        }
        switch (V = g ? ur(g) : window, e) {
          case "focusin":
            (Qs(V) || V.contentEditable === "true") && (ir = V, Xl = g, Br = null);
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
            Kl = !1, iu(x, n, k);
            break;
          case "selectionchange":
            if (Df) break;
          case "keydown":
          case "keyup":
            iu(x, n, k);
        }
        var H;
        if (Hl) e: {
          switch (e) {
            case "compositionstart":
              var B = "onCompositionStart";
              break e;
            case "compositionend":
              B = "onCompositionEnd";
              break e;
            case "compositionupdate":
              B = "onCompositionUpdate";
              break e;
          }
          B = void 0;
        }
        else rr ? Xs(e, n) && (B = "onCompositionEnd") : e === "keydown" && n.keyCode === 229 && (B = "onCompositionStart");
        B && (Bs && n.locale !== "ko" && (rr || B !== "onCompositionStart" ? B === "onCompositionEnd" && rr && (H = Fs()) : (vn = k, Al = "value" in vn ? vn.value : vn.textContent, rr = !0)), V = Mi(g, B), 0 < V.length && (B = new Vs(B, e, null, n, k), x.push({ event: B, listeners: V }), H ? B.data = H : (H = Ks(n), H !== null && (B.data = H)))), (H = gf ? wf(e, n) : _f(e, n)) && (g = Mi(g, "onBeforeInput"), 0 < g.length && (k = new Vs("onBeforeInput", "beforeinput", null, n, k), x.push({ event: k, listeners: g }), k.data = H));
      }
      pu(x, t);
    });
  }
  function Xr(e, t, n) {
    return { instance: e, listener: t, currentTarget: n };
  }
  function Mi(e, t) {
    for (var n = t + "Capture", r = []; e !== null; ) {
      var i = e, o = i.stateNode;
      i.tag === 5 && o !== null && (i = o, o = cn(e, n), o != null && r.unshift(Xr(e, o, i)), o = cn(e, t), o != null && r.push(Xr(e, o, i))), e = e.return;
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
    for (var o = t._reactName, u = []; n !== null && n !== r; ) {
      var f = n, d = f.alternate, g = f.stateNode;
      if (d !== null && d === r) break;
      f.tag === 5 && g !== null && (f = g, i ? (d = cn(n, o), d != null && u.unshift(Xr(n, d, f))) : i || (d = cn(n, o), d != null && u.push(Xr(n, d, f)))), n = n.return;
    }
    u.length !== 0 && e.push({ event: t, listeners: u });
  }
  var If = /\r\n?/g, Of = /\u0000|\uFFFD/g;
  function vu(e) {
    return (typeof e == "string" ? e : "" + e).replace(If, `
`).replace(Of, "");
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
  var no = typeof setTimeout == "function" ? setTimeout : void 0, Af = typeof clearTimeout == "function" ? clearTimeout : void 0, yu = typeof Promise == "function" ? Promise : void 0, jf = typeof queueMicrotask == "function" ? queueMicrotask : typeof yu < "u" ? function(e) {
    return yu.resolve(null).then(e).catch(Ff);
  } : no;
  function Ff(e) {
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
  var sr = Math.random().toString(36).slice(2), Bt = "__reactFiber$" + sr, Kr = "__reactProps$" + sr, qt = "__reactContainer$" + sr, io = "__reactEvents$" + sr, Uf = "__reactListeners$" + sr, $f = "__reactHandles$" + sr;
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
  function Ce(e) {
    0 > ar || (e.current = lo[ar], lo[ar] = null, ar--);
  }
  function _e(e, t) {
    ar++, lo[ar] = e.current, e.current = t;
  }
  var _n = {}, lt = wn(_n), mt = wn(!1), jn = _n;
  function cr(e, t) {
    var n = e.type.contextTypes;
    if (!n) return _n;
    var r = e.stateNode;
    if (r && r.__reactInternalMemoizedUnmaskedChildContext === t) return r.__reactInternalMemoizedMaskedChildContext;
    var i = {}, o;
    for (o in n) i[o] = t[o];
    return r && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = t, e.__reactInternalMemoizedMaskedChildContext = i), i;
  }
  function vt(e) {
    return e = e.childContextTypes, e != null;
  }
  function ji() {
    Ce(mt), Ce(lt);
  }
  function wu(e, t, n) {
    if (lt.current !== _n) throw Error(s(168));
    _e(lt, t), _e(mt, n);
  }
  function _u(e, t, n) {
    var r = e.stateNode;
    if (t = t.childContextTypes, typeof r.getChildContext != "function") return n;
    r = r.getChildContext();
    for (var i in r) if (!(i in t)) throw Error(s(108, ce(e) || "Unknown", i));
    return R({}, n, r);
  }
  function Fi(e) {
    return e = (e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext || _n, jn = lt.current, _e(lt, e), _e(mt, mt.current), !0;
  }
  function Su(e, t, n) {
    var r = e.stateNode;
    if (!r) throw Error(s(169));
    n ? (e = _u(e, t, jn), r.__reactInternalMemoizedMergedChildContext = e, Ce(mt), Ce(lt), _e(lt, e)) : Ce(mt), _e(mt, n);
  }
  var Zt = null, Ui = !1, oo = !1;
  function ku(e) {
    Zt === null ? Zt = [e] : Zt.push(e);
  }
  function Vf(e) {
    Ui = !0, ku(e);
  }
  function Sn() {
    if (!oo && Zt !== null) {
      oo = !0;
      var e = 0, t = pe;
      try {
        var n = Zt;
        for (pe = 1; e < n.length; e++) {
          var r = n[e];
          do
            r = r(!0);
          while (r !== null);
        }
        Zt = null, Ui = !1;
      } catch (i) {
        throw Zt !== null && (Zt = Zt.slice(e + 1)), Es(Rl, Sn), i;
      } finally {
        pe = t, oo = !1;
      }
    }
    return null;
  }
  var fr = [], dr = 0, $i = null, Vi = 0, Tt = [], Pt = 0, Fn = null, Jt = 1, bt = "";
  function Un(e, t) {
    fr[dr++] = Vi, fr[dr++] = $i, $i = e, Vi = t;
  }
  function xu(e, t, n) {
    Tt[Pt++] = Jt, Tt[Pt++] = bt, Tt[Pt++] = Fn, Fn = e;
    var r = Jt;
    e = bt;
    var i = 32 - It(r) - 1;
    r &= ~(1 << i), n += 1;
    var o = 32 - It(t) + i;
    if (30 < o) {
      var u = i - i % 5;
      o = (r & (1 << u) - 1).toString(32), r >>= u, i -= u, Jt = 1 << 32 - It(t) + i | n << i | r, bt = o + e;
    } else Jt = 1 << o | n << i | r, bt = e;
  }
  function so(e) {
    e.return !== null && (Un(e, 1), xu(e, 1, 0));
  }
  function uo(e) {
    for (; e === $i; ) $i = fr[--dr], fr[dr] = null, Vi = fr[--dr], fr[dr] = null;
    for (; e === Fn; ) Fn = Tt[--Pt], Tt[Pt] = null, bt = Tt[--Pt], Tt[Pt] = null, Jt = Tt[--Pt], Tt[Pt] = null;
  }
  var kt = null, xt = null, Ne = !1, At = null;
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
    if (Ne) {
      var t = xt;
      if (t) {
        var n = t;
        if (!Cu(e, t)) {
          if (ao(e)) throw Error(s(418));
          t = gn(n.nextSibling);
          var r = kt;
          t && Cu(e, t) ? Eu(r, n) : (e.flags = e.flags & -4097 | 2, Ne = !1, kt = e);
        }
      } else {
        if (ao(e)) throw Error(s(418));
        e.flags = e.flags & -4097 | 2, Ne = !1, kt = e;
      }
    }
  }
  function Tu(e) {
    for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13; ) e = e.return;
    kt = e;
  }
  function Hi(e) {
    if (e !== kt) return !1;
    if (!Ne) return Tu(e), Ne = !0, !1;
    var t;
    if ((t = e.tag !== 3) && !(t = e.tag !== 5) && (t = e.type, t = t !== "head" && t !== "body" && !to(e.type, e.memoizedProps)), t && (t = xt)) {
      if (ao(e)) throw Pu(), Error(s(418));
      for (; t; ) Eu(e, t), t = gn(t.nextSibling);
    }
    if (Tu(e), e.tag === 13) {
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
  function Pu() {
    for (var e = xt; e; ) e = gn(e.nextSibling);
  }
  function pr() {
    xt = kt = null, Ne = !1;
  }
  function fo(e) {
    At === null ? At = [e] : At.push(e);
  }
  var Hf = Ie.ReactCurrentBatchConfig;
  function Gr(e, t, n) {
    if (e = n.ref, e !== null && typeof e != "function" && typeof e != "object") {
      if (n._owner) {
        if (n = n._owner, n) {
          if (n.tag !== 1) throw Error(s(309));
          var r = n.stateNode;
        }
        if (!r) throw Error(s(147, e));
        var i = r, o = "" + e;
        return t !== null && t.ref !== null && typeof t.ref == "function" && t.ref._stringRef === o ? t.ref : (t = function(u) {
          var f = i.refs;
          u === null ? delete f[o] : f[o] = u;
        }, t._stringRef = o, t);
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
    function o(v, p, y) {
      return v.index = y, e ? (y = v.alternate, y !== null ? (y = y.index, y < p ? (v.flags |= 2, p) : y) : (v.flags |= 2, p)) : (v.flags |= 1048576, p);
    }
    function u(v) {
      return e && v.alternate === null && (v.flags |= 2), v;
    }
    function f(v, p, y, E) {
      return p === null || p.tag !== 6 ? (p = rs(y, v.mode, E), p.return = v, p) : (p = i(p, y), p.return = v, p);
    }
    function d(v, p, y, E) {
      var O = y.type;
      return O === Ge ? k(v, p, y.props.children, E, y.key) : p !== null && (p.elementType === O || typeof O == "object" && O !== null && O.$$typeof === fe && Ru(O) === p.type) ? (E = i(p, y.props), E.ref = Gr(v, p, y), E.return = v, E) : (E = pl(y.type, y.key, y.props, null, v.mode, E), E.ref = Gr(v, p, y), E.return = v, E);
    }
    function g(v, p, y, E) {
      return p === null || p.tag !== 4 || p.stateNode.containerInfo !== y.containerInfo || p.stateNode.implementation !== y.implementation ? (p = is(y, v.mode, E), p.return = v, p) : (p = i(p, y.children || []), p.return = v, p);
    }
    function k(v, p, y, E, O) {
      return p === null || p.tag !== 7 ? (p = Kn(y, v.mode, E, O), p.return = v, p) : (p = i(p, y), p.return = v, p);
    }
    function x(v, p, y) {
      if (typeof p == "string" && p !== "" || typeof p == "number") return p = rs("" + p, v.mode, y), p.return = v, p;
      if (typeof p == "object" && p !== null) {
        switch (p.$$typeof) {
          case Qe:
            return y = pl(p.type, p.key, p.props, null, v.mode, y), y.ref = Gr(v, null, p), y.return = v, y;
          case ke:
            return p = is(p, v.mode, y), p.return = v, p;
          case fe:
            var E = p._init;
            return x(v, E(p._payload), y);
        }
        if (Gt(p) || j(p)) return p = Kn(p, v.mode, y, null), p.return = v, p;
        Bi(v, p);
      }
      return null;
    }
    function S(v, p, y, E) {
      var O = p !== null ? p.key : null;
      if (typeof y == "string" && y !== "" || typeof y == "number") return O !== null ? null : f(v, p, "" + y, E);
      if (typeof y == "object" && y !== null) {
        switch (y.$$typeof) {
          case Qe:
            return y.key === O ? d(v, p, y, E) : null;
          case ke:
            return y.key === O ? g(v, p, y, E) : null;
          case fe:
            return O = y._init, S(
              v,
              p,
              O(y._payload),
              E
            );
        }
        if (Gt(y) || j(y)) return O !== null ? null : k(v, p, y, E, null);
        Bi(v, y);
      }
      return null;
    }
    function N(v, p, y, E, O) {
      if (typeof E == "string" && E !== "" || typeof E == "number") return v = v.get(y) || null, f(p, v, "" + E, O);
      if (typeof E == "object" && E !== null) {
        switch (E.$$typeof) {
          case Qe:
            return v = v.get(E.key === null ? y : E.key) || null, d(p, v, E, O);
          case ke:
            return v = v.get(E.key === null ? y : E.key) || null, g(p, v, E, O);
          case fe:
            var V = E._init;
            return N(v, p, y, V(E._payload), O);
        }
        if (Gt(E) || j(E)) return v = v.get(y) || null, k(p, v, E, O, null);
        Bi(p, E);
      }
      return null;
    }
    function M(v, p, y, E) {
      for (var O = null, V = null, H = p, B = p = 0, et = null; H !== null && B < y.length; B++) {
        H.index > B ? (et = H, H = null) : et = H.sibling;
        var ae = S(v, H, y[B], E);
        if (ae === null) {
          H === null && (H = et);
          break;
        }
        e && H && ae.alternate === null && t(v, H), p = o(ae, p, B), V === null ? O = ae : V.sibling = ae, V = ae, H = et;
      }
      if (B === y.length) return n(v, H), Ne && Un(v, B), O;
      if (H === null) {
        for (; B < y.length; B++) H = x(v, y[B], E), H !== null && (p = o(H, p, B), V === null ? O = H : V.sibling = H, V = H);
        return Ne && Un(v, B), O;
      }
      for (H = r(v, H); B < y.length; B++) et = N(H, v, B, y[B], E), et !== null && (e && et.alternate !== null && H.delete(et.key === null ? B : et.key), p = o(et, p, B), V === null ? O = et : V.sibling = et, V = et);
      return e && H.forEach(function(Dn) {
        return t(v, Dn);
      }), Ne && Un(v, B), O;
    }
    function I(v, p, y, E) {
      var O = j(y);
      if (typeof O != "function") throw Error(s(150));
      if (y = O.call(y), y == null) throw Error(s(151));
      for (var V = O = null, H = p, B = p = 0, et = null, ae = y.next(); H !== null && !ae.done; B++, ae = y.next()) {
        H.index > B ? (et = H, H = null) : et = H.sibling;
        var Dn = S(v, H, ae.value, E);
        if (Dn === null) {
          H === null && (H = et);
          break;
        }
        e && H && Dn.alternate === null && t(v, H), p = o(Dn, p, B), V === null ? O = Dn : V.sibling = Dn, V = Dn, H = et;
      }
      if (ae.done) return n(
        v,
        H
      ), Ne && Un(v, B), O;
      if (H === null) {
        for (; !ae.done; B++, ae = y.next()) ae = x(v, ae.value, E), ae !== null && (p = o(ae, p, B), V === null ? O = ae : V.sibling = ae, V = ae);
        return Ne && Un(v, B), O;
      }
      for (H = r(v, H); !ae.done; B++, ae = y.next()) ae = N(H, v, B, ae.value, E), ae !== null && (e && ae.alternate !== null && H.delete(ae.key === null ? B : ae.key), p = o(ae, p, B), V === null ? O = ae : V.sibling = ae, V = ae);
      return e && H.forEach(function(Sd) {
        return t(v, Sd);
      }), Ne && Un(v, B), O;
    }
    function $e(v, p, y, E) {
      if (typeof y == "object" && y !== null && y.type === Ge && y.key === null && (y = y.props.children), typeof y == "object" && y !== null) {
        switch (y.$$typeof) {
          case Qe:
            e: {
              for (var O = y.key, V = p; V !== null; ) {
                if (V.key === O) {
                  if (O = y.type, O === Ge) {
                    if (V.tag === 7) {
                      n(v, V.sibling), p = i(V, y.props.children), p.return = v, v = p;
                      break e;
                    }
                  } else if (V.elementType === O || typeof O == "object" && O !== null && O.$$typeof === fe && Ru(O) === V.type) {
                    n(v, V.sibling), p = i(V, y.props), p.ref = Gr(v, V, y), p.return = v, v = p;
                    break e;
                  }
                  n(v, V);
                  break;
                } else t(v, V);
                V = V.sibling;
              }
              y.type === Ge ? (p = Kn(y.props.children, v.mode, E, y.key), p.return = v, v = p) : (E = pl(y.type, y.key, y.props, null, v.mode, E), E.ref = Gr(v, p, y), E.return = v, v = E);
            }
            return u(v);
          case ke:
            e: {
              for (V = y.key; p !== null; ) {
                if (p.key === V) if (p.tag === 4 && p.stateNode.containerInfo === y.containerInfo && p.stateNode.implementation === y.implementation) {
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
          case fe:
            return V = y._init, $e(v, p, V(y._payload), E);
        }
        if (Gt(y)) return M(v, p, y, E);
        if (j(y)) return I(v, p, y, E);
        Bi(v, y);
      }
      return typeof y == "string" && y !== "" || typeof y == "number" ? (y = "" + y, p !== null && p.tag === 6 ? (n(v, p.sibling), p = i(p, y), p.return = v, v = p) : (n(v, p), p = rs(y, v.mode, E), p.return = v, v = p), u(v)) : n(v, p);
    }
    return $e;
  }
  var hr = Nu(!0), Du = Nu(!1), Wi = wn(null), Yi = null, mr = null, po = null;
  function ho() {
    po = mr = Yi = null;
  }
  function mo(e) {
    var t = Wi.current;
    Ce(Wi), e._currentValue = t;
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
    if (r = r.shared, (oe & 2) !== 0) {
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
      var i = null, o = null;
      if (n = n.firstBaseUpdate, n !== null) {
        do {
          var u = { eventTime: n.eventTime, lane: n.lane, tag: n.tag, payload: n.payload, callback: n.callback, next: null };
          o === null ? i = o = u : o = o.next = u, n = n.next;
        } while (n !== null);
        o === null ? i = o = t : o = o.next = t;
      } else i = o = t;
      n = { baseState: r.baseState, firstBaseUpdate: i, lastBaseUpdate: o, shared: r.shared, effects: r.effects }, e.updateQueue = n;
      return;
    }
    e = n.lastBaseUpdate, e === null ? n.firstBaseUpdate = t : e.next = t, n.lastBaseUpdate = t;
  }
  function Ki(e, t, n, r) {
    var i = e.updateQueue;
    kn = !1;
    var o = i.firstBaseUpdate, u = i.lastBaseUpdate, f = i.shared.pending;
    if (f !== null) {
      i.shared.pending = null;
      var d = f, g = d.next;
      d.next = null, u === null ? o = g : u.next = g, u = d;
      var k = e.alternate;
      k !== null && (k = k.updateQueue, f = k.lastBaseUpdate, f !== u && (f === null ? k.firstBaseUpdate = g : f.next = g, k.lastBaseUpdate = d));
    }
    if (o !== null) {
      var x = i.baseState;
      u = 0, k = g = d = null, f = o;
      do {
        var S = f.lane, N = f.eventTime;
        if ((r & S) === S) {
          k !== null && (k = k.next = {
            eventTime: N,
            lane: 0,
            tag: f.tag,
            payload: f.payload,
            callback: f.callback,
            next: null
          });
          e: {
            var M = e, I = f;
            switch (S = t, N = n, I.tag) {
              case 1:
                if (M = I.payload, typeof M == "function") {
                  x = M.call(N, x, S);
                  break e;
                }
                x = M;
                break e;
              case 3:
                M.flags = M.flags & -65537 | 128;
              case 0:
                if (M = I.payload, S = typeof M == "function" ? M.call(N, x, S) : M, S == null) break e;
                x = R({}, x, S);
                break e;
              case 2:
                kn = !0;
            }
          }
          f.callback !== null && f.lane !== 0 && (e.flags |= 64, S = i.effects, S === null ? i.effects = [f] : S.push(f));
        } else N = { eventTime: N, lane: S, tag: f.tag, payload: f.payload, callback: f.callback, next: null }, k === null ? (g = k = N, d = x) : k = k.next = N, u |= S;
        if (f = f.next, f === null) {
          if (f = i.shared.pending, f === null) break;
          S = f, f = S.next, S.next = null, i.lastBaseUpdate = S, i.shared.pending = null;
        }
      } while (!0);
      if (k === null && (d = x), i.baseState = d, i.firstBaseUpdate = g, i.lastBaseUpdate = k, t = i.shared.interleaved, t !== null) {
        i = t;
        do
          u |= i.lane, i = i.next;
        while (i !== t);
      } else o === null && (i.shared.lanes = 0);
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
    switch (_e(Jr, t), _e(Zr, e), _e(Wt, qr), e = t.nodeType, e) {
      case 9:
      case 11:
        t = (t = t.documentElement) ? t.namespaceURI : le(null, "");
        break;
      default:
        e = e === 8 ? t.parentNode : t, t = e.namespaceURI || null, e = e.tagName, t = le(t, e);
    }
    Ce(Wt), _e(Wt, t);
  }
  function yr() {
    Ce(Wt), Ce(Zr), Ce(Jr);
  }
  function Ou(e) {
    Vn(Jr.current);
    var t = Vn(Wt.current), n = le(t, e.type);
    t !== n && (_e(Zr, e), _e(Wt, n));
  }
  function _o(e) {
    Zr.current === e && (Ce(Wt), Ce(Zr));
  }
  var De = wn(0);
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
  var Gi = Ie.ReactCurrentDispatcher, xo = Ie.ReactCurrentBatchConfig, Hn = 0, ze = null, Xe = null, Je = null, qi = !1, br = !1, ei = 0, Bf = 0;
  function ot() {
    throw Error(s(321));
  }
  function Eo(e, t) {
    if (t === null) return !1;
    for (var n = 0; n < t.length && n < e.length; n++) if (!Ot(e[n], t[n])) return !1;
    return !0;
  }
  function Co(e, t, n, r, i, o) {
    if (Hn = o, ze = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, Gi.current = e === null || e.memoizedState === null ? Kf : Qf, e = n(r, i), br) {
      o = 0;
      do {
        if (br = !1, ei = 0, 25 <= o) throw Error(s(301));
        o += 1, Je = Xe = null, t.updateQueue = null, Gi.current = Gf, e = n(r, i);
      } while (br);
    }
    if (Gi.current = bi, t = Xe !== null && Xe.next !== null, Hn = 0, Je = Xe = ze = null, qi = !1, t) throw Error(s(300));
    return e;
  }
  function To() {
    var e = ei !== 0;
    return ei = 0, e;
  }
  function Yt() {
    var e = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
    return Je === null ? ze.memoizedState = Je = e : Je = Je.next = e, Je;
  }
  function Nt() {
    if (Xe === null) {
      var e = ze.alternate;
      e = e !== null ? e.memoizedState : null;
    } else e = Xe.next;
    var t = Je === null ? ze.memoizedState : Je.next;
    if (t !== null) Je = t, Xe = e;
    else {
      if (e === null) throw Error(s(310));
      Xe = e, e = { memoizedState: Xe.memoizedState, baseState: Xe.baseState, baseQueue: Xe.baseQueue, queue: Xe.queue, next: null }, Je === null ? ze.memoizedState = Je = e : Je = Je.next = e;
    }
    return Je;
  }
  function ti(e, t) {
    return typeof t == "function" ? t(e) : t;
  }
  function Po(e) {
    var t = Nt(), n = t.queue;
    if (n === null) throw Error(s(311));
    n.lastRenderedReducer = e;
    var r = Xe, i = r.baseQueue, o = n.pending;
    if (o !== null) {
      if (i !== null) {
        var u = i.next;
        i.next = o.next, o.next = u;
      }
      r.baseQueue = i = o, n.pending = null;
    }
    if (i !== null) {
      o = i.next, r = r.baseState;
      var f = u = null, d = null, g = o;
      do {
        var k = g.lane;
        if ((Hn & k) === k) d !== null && (d = d.next = { lane: 0, action: g.action, hasEagerState: g.hasEagerState, eagerState: g.eagerState, next: null }), r = g.hasEagerState ? g.eagerState : e(r, g.action);
        else {
          var x = {
            lane: k,
            action: g.action,
            hasEagerState: g.hasEagerState,
            eagerState: g.eagerState,
            next: null
          };
          d === null ? (f = d = x, u = r) : d = d.next = x, ze.lanes |= k, Bn |= k;
        }
        g = g.next;
      } while (g !== null && g !== o);
      d === null ? u = r : d.next = f, Ot(r, t.memoizedState) || (yt = !0), t.memoizedState = r, t.baseState = u, t.baseQueue = d, n.lastRenderedState = r;
    }
    if (e = n.interleaved, e !== null) {
      i = e;
      do
        o = i.lane, ze.lanes |= o, Bn |= o, i = i.next;
      while (i !== e);
    } else i === null && (n.lanes = 0);
    return [t.memoizedState, n.dispatch];
  }
  function Ro(e) {
    var t = Nt(), n = t.queue;
    if (n === null) throw Error(s(311));
    n.lastRenderedReducer = e;
    var r = n.dispatch, i = n.pending, o = t.memoizedState;
    if (i !== null) {
      n.pending = null;
      var u = i = i.next;
      do
        o = e(o, u.action), u = u.next;
      while (u !== i);
      Ot(o, t.memoizedState) || (yt = !0), t.memoizedState = o, t.baseQueue === null && (t.baseState = o), n.lastRenderedState = o;
    }
    return [o, r];
  }
  function Au() {
  }
  function ju(e, t) {
    var n = ze, r = Nt(), i = t(), o = !Ot(r.memoizedState, i);
    if (o && (r.memoizedState = i, yt = !0), r = r.queue, No($u.bind(null, n, r, e), [e]), r.getSnapshot !== t || o || Je !== null && Je.memoizedState.tag & 1) {
      if (n.flags |= 2048, ni(9, Uu.bind(null, n, r, i, t), void 0, null), be === null) throw Error(s(349));
      (Hn & 30) !== 0 || Fu(n, t, i);
    }
    return i;
  }
  function Fu(e, t, n) {
    e.flags |= 16384, e = { getSnapshot: t, value: n }, t = ze.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, ze.updateQueue = t, t.stores = [e]) : (n = t.stores, n === null ? t.stores = [e] : n.push(e));
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
    return typeof e == "function" && (e = e()), t.memoizedState = t.baseState = e, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: ti, lastRenderedState: e }, t.queue = e, e = e.dispatch = Xf.bind(null, ze, e), [t.memoizedState, e];
  }
  function ni(e, t, n, r) {
    return e = { tag: e, create: t, destroy: n, deps: r, next: null }, t = ze.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, ze.updateQueue = t, t.lastEffect = e.next = e) : (n = t.lastEffect, n === null ? t.lastEffect = e.next = e : (r = n.next, n.next = e, e.next = r, t.lastEffect = e)), e;
  }
  function Wu() {
    return Nt().memoizedState;
  }
  function Zi(e, t, n, r) {
    var i = Yt();
    ze.flags |= e, i.memoizedState = ni(1 | t, n, void 0, r === void 0 ? null : r);
  }
  function Ji(e, t, n, r) {
    var i = Nt();
    r = r === void 0 ? null : r;
    var o = void 0;
    if (Xe !== null) {
      var u = Xe.memoizedState;
      if (o = u.destroy, r !== null && Eo(r, u.deps)) {
        i.memoizedState = ni(t, n, o, r);
        return;
      }
    }
    ze.flags |= e, i.memoizedState = ni(1 | t, n, o, r);
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
    return (Hn & 21) === 0 ? (e.baseState && (e.baseState = !1, yt = !0), e.memoizedState = n) : (Ot(n, t) || (n = Rs(), ze.lanes |= n, Bn |= n, e.baseState = !0), t);
  }
  function Wf(e, t) {
    var n = pe;
    pe = n !== 0 && 4 > n ? n : 4, e(!0);
    var r = xo.transition;
    xo.transition = {};
    try {
      e(!1), t();
    } finally {
      pe = n, xo.transition = r;
    }
  }
  function bu() {
    return Nt().memoizedState;
  }
  function Yf(e, t, n) {
    var r = Pn(e);
    if (n = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null }, ea(e)) ta(t, n);
    else if (n = zu(e, t, n, r), n !== null) {
      var i = dt();
      $t(n, e, r, i), na(n, t, r);
    }
  }
  function Xf(e, t, n) {
    var r = Pn(e), i = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null };
    if (ea(e)) ta(t, i);
    else {
      var o = e.alternate;
      if (e.lanes === 0 && (o === null || o.lanes === 0) && (o = t.lastRenderedReducer, o !== null)) try {
        var u = t.lastRenderedState, f = o(u, n);
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
    return e === ze || t !== null && t === ze;
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
  var bi = { readContext: Rt, useCallback: ot, useContext: ot, useEffect: ot, useImperativeHandle: ot, useInsertionEffect: ot, useLayoutEffect: ot, useMemo: ot, useReducer: ot, useRef: ot, useState: ot, useDebugValue: ot, useDeferredValue: ot, useTransition: ot, useMutableSource: ot, useSyncExternalStore: ot, useId: ot, unstable_isNewReconciler: !1 }, Kf = { readContext: Rt, useCallback: function(e, t) {
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
    return t = n !== void 0 ? n(t) : t, r.memoizedState = r.baseState = t, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: e, lastRenderedState: t }, r.queue = e, e = e.dispatch = Yf.bind(null, ze, e), [r.memoizedState, e];
  }, useRef: function(e) {
    var t = Yt();
    return e = { current: e }, t.memoizedState = e;
  }, useState: Bu, useDebugValue: Do, useDeferredValue: function(e) {
    return Yt().memoizedState = e;
  }, useTransition: function() {
    var e = Bu(!1), t = e[0];
    return e = Wf.bind(null, e[1]), Yt().memoizedState = e, [t, e];
  }, useMutableSource: function() {
  }, useSyncExternalStore: function(e, t, n) {
    var r = ze, i = Yt();
    if (Ne) {
      if (n === void 0) throw Error(s(407));
      n = n();
    } else {
      if (n = t(), be === null) throw Error(s(349));
      (Hn & 30) !== 0 || Fu(r, t, n);
    }
    i.memoizedState = n;
    var o = { value: n, getSnapshot: t };
    return i.queue = o, Yu($u.bind(
      null,
      r,
      o,
      e
    ), [e]), r.flags |= 2048, ni(9, Uu.bind(null, r, o, n, t), void 0, null), n;
  }, useId: function() {
    var e = Yt(), t = be.identifierPrefix;
    if (Ne) {
      var n = bt, r = Jt;
      n = (r & ~(1 << 32 - It(r) - 1)).toString(32) + n, t = ":" + t + "R" + n, n = ei++, 0 < n && (t += "H" + n.toString(32)), t += ":";
    } else n = Bf++, t = ":" + t + "r" + n.toString(32) + ":";
    return e.memoizedState = t;
  }, unstable_isNewReconciler: !1 }, Qf = {
    readContext: Rt,
    useCallback: qu,
    useContext: Rt,
    useEffect: No,
    useImperativeHandle: Gu,
    useInsertionEffect: Xu,
    useLayoutEffect: Ku,
    useMemo: Zu,
    useReducer: Po,
    useRef: Wu,
    useState: function() {
      return Po(ti);
    },
    useDebugValue: Do,
    useDeferredValue: function(e) {
      var t = Nt();
      return Ju(t, Xe.memoizedState, e);
    },
    useTransition: function() {
      var e = Po(ti)[0], t = Nt().memoizedState;
      return [e, t];
    },
    useMutableSource: Au,
    useSyncExternalStore: ju,
    useId: bu,
    unstable_isNewReconciler: !1
  }, Gf = { readContext: Rt, useCallback: qu, useContext: Rt, useEffect: No, useImperativeHandle: Gu, useInsertionEffect: Xu, useLayoutEffect: Ku, useMemo: Zu, useReducer: Ro, useRef: Wu, useState: function() {
    return Ro(ti);
  }, useDebugValue: Do, useDeferredValue: function(e) {
    var t = Nt();
    return Xe === null ? t.memoizedState = e : Ju(t, Xe.memoizedState, e);
  }, useTransition: function() {
    var e = Ro(ti)[0], t = Nt().memoizedState;
    return [e, t];
  }, useMutableSource: Au, useSyncExternalStore: ju, useId: bu, unstable_isNewReconciler: !1 };
  function jt(e, t) {
    if (e && e.defaultProps) {
      t = R({}, t), e = e.defaultProps;
      for (var n in e) t[n] === void 0 && (t[n] = e[n]);
      return t;
    }
    return t;
  }
  function zo(e, t, n, r) {
    t = e.memoizedState, n = n(r, t), n = n == null ? t : R({}, t, n), e.memoizedState = n, e.lanes === 0 && (e.updateQueue.baseState = n);
  }
  var el = { isMounted: function(e) {
    return (e = e._reactInternals) ? Vt(e) === e : !1;
  }, enqueueSetState: function(e, t, n) {
    e = e._reactInternals;
    var r = dt(), i = Pn(e), o = tn(r, i);
    o.payload = t, n != null && (o.callback = n), t = xn(e, o, i), t !== null && ($t(t, e, i, r), Xi(t, e, i));
  }, enqueueReplaceState: function(e, t, n) {
    e = e._reactInternals;
    var r = dt(), i = Pn(e), o = tn(r, i);
    o.tag = 1, o.payload = t, n != null && (o.callback = n), t = xn(e, o, i), t !== null && ($t(t, e, i, r), Xi(t, e, i));
  }, enqueueForceUpdate: function(e, t) {
    e = e._reactInternals;
    var n = dt(), r = Pn(e), i = tn(n, r);
    i.tag = 2, t != null && (i.callback = t), t = xn(e, i, r), t !== null && ($t(t, e, r, n), Xi(t, e, r));
  } };
  function ra(e, t, n, r, i, o, u) {
    return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(r, o, u) : t.prototype && t.prototype.isPureReactComponent ? !Hr(n, r) || !Hr(i, o) : !0;
  }
  function ia(e, t, n) {
    var r = !1, i = _n, o = t.contextType;
    return typeof o == "object" && o !== null ? o = Rt(o) : (i = vt(t) ? jn : lt.current, r = t.contextTypes, o = (r = r != null) ? cr(e, i) : _n), t = new t(n, o), e.memoizedState = t.state !== null && t.state !== void 0 ? t.state : null, t.updater = el, e.stateNode = t, t._reactInternals = e, r && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = i, e.__reactInternalMemoizedMaskedChildContext = o), t;
  }
  function la(e, t, n, r) {
    e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, r), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, r), t.state !== e && el.enqueueReplaceState(t, t.state, null);
  }
  function Lo(e, t, n, r) {
    var i = e.stateNode;
    i.props = n, i.state = e.memoizedState, i.refs = {}, go(e);
    var o = t.contextType;
    typeof o == "object" && o !== null ? i.context = Rt(o) : (o = vt(t) ? jn : lt.current, i.context = cr(e, o)), i.state = e.memoizedState, o = t.getDerivedStateFromProps, typeof o == "function" && (zo(e, t, o, n), i.state = e.memoizedState), typeof t.getDerivedStateFromProps == "function" || typeof i.getSnapshotBeforeUpdate == "function" || typeof i.UNSAFE_componentWillMount != "function" && typeof i.componentWillMount != "function" || (t = i.state, typeof i.componentWillMount == "function" && i.componentWillMount(), typeof i.UNSAFE_componentWillMount == "function" && i.UNSAFE_componentWillMount(), t !== i.state && el.enqueueReplaceState(i, i.state, null), Ki(e, n, i, r), i.state = e.memoizedState), typeof i.componentDidMount == "function" && (e.flags |= 4194308);
  }
  function gr(e, t) {
    try {
      var n = "", r = t;
      do
        n += J(r), r = r.return;
      while (r);
      var i = n;
    } catch (o) {
      i = `
Error generating stack: ` + o.message + `
` + o.stack;
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
  var qf = typeof WeakMap == "function" ? WeakMap : Map;
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
    var o = e.stateNode;
    return o !== null && typeof o.componentDidCatch == "function" && (n.callback = function() {
      Io(e, t), typeof r != "function" && (Cn === null ? Cn = /* @__PURE__ */ new Set([this]) : Cn.add(this));
      var u = t.stack;
      this.componentDidCatch(t.value, { componentStack: u !== null ? u : "" });
    }), n;
  }
  function ua(e, t, n) {
    var r = e.pingCache;
    if (r === null) {
      r = e.pingCache = new qf();
      var i = /* @__PURE__ */ new Set();
      r.set(t, i);
    } else i = r.get(t), i === void 0 && (i = /* @__PURE__ */ new Set(), r.set(t, i));
    i.has(n) || (i.add(n), e = cd.bind(null, e, t, n), t.then(e, e));
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
  var Zf = Ie.ReactCurrentOwner, yt = !1;
  function ft(e, t, n, r) {
    t.child = e === null ? Du(t, null, n, r) : hr(t, e.child, n, r);
  }
  function fa(e, t, n, r, i) {
    n = n.render;
    var o = t.ref;
    return vr(t, i), r = Co(e, t, n, r, o, i), n = To(), e !== null && !yt ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~i, nn(e, t, i)) : (Ne && n && so(t), t.flags |= 1, ft(e, t, r, i), t.child);
  }
  function da(e, t, n, r, i) {
    if (e === null) {
      var o = n.type;
      return typeof o == "function" && !ns(o) && o.defaultProps === void 0 && n.compare === null && n.defaultProps === void 0 ? (t.tag = 15, t.type = o, pa(e, t, o, r, i)) : (e = pl(n.type, null, r, t, t.mode, i), e.ref = t.ref, e.return = t, t.child = e);
    }
    if (o = e.child, (e.lanes & i) === 0) {
      var u = o.memoizedProps;
      if (n = n.compare, n = n !== null ? n : Hr, n(u, r) && e.ref === t.ref) return nn(e, t, i);
    }
    return t.flags |= 1, e = Nn(o, r), e.ref = t.ref, e.return = t, t.child = e;
  }
  function pa(e, t, n, r, i) {
    if (e !== null) {
      var o = e.memoizedProps;
      if (Hr(o, r) && e.ref === t.ref) if (yt = !1, t.pendingProps = r = o, (e.lanes & i) !== 0) (e.flags & 131072) !== 0 && (yt = !0);
      else return t.lanes = e.lanes, nn(e, t, i);
    }
    return Oo(e, t, n, r, i);
  }
  function ha(e, t, n) {
    var r = t.pendingProps, i = r.children, o = e !== null ? e.memoizedState : null;
    if (r.mode === "hidden") if ((t.mode & 1) === 0) t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, _e(_r, Et), Et |= n;
    else {
      if ((n & 1073741824) === 0) return e = o !== null ? o.baseLanes | n : n, t.lanes = t.childLanes = 1073741824, t.memoizedState = { baseLanes: e, cachePool: null, transitions: null }, t.updateQueue = null, _e(_r, Et), Et |= e, null;
      t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, r = o !== null ? o.baseLanes : n, _e(_r, Et), Et |= r;
    }
    else o !== null ? (r = o.baseLanes | n, t.memoizedState = null) : r = n, _e(_r, Et), Et |= r;
    return ft(e, t, i, n), t.child;
  }
  function ma(e, t) {
    var n = t.ref;
    (e === null && n !== null || e !== null && e.ref !== n) && (t.flags |= 512, t.flags |= 2097152);
  }
  function Oo(e, t, n, r, i) {
    var o = vt(n) ? jn : lt.current;
    return o = cr(t, o), vr(t, i), n = Co(e, t, n, r, o, i), r = To(), e !== null && !yt ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~i, nn(e, t, i)) : (Ne && r && so(t), t.flags |= 1, ft(e, t, n, i), t.child);
  }
  function va(e, t, n, r, i) {
    if (vt(n)) {
      var o = !0;
      Fi(t);
    } else o = !1;
    if (vr(t, i), t.stateNode === null) nl(e, t), ia(t, n, r), Lo(t, n, r, i), r = !0;
    else if (e === null) {
      var u = t.stateNode, f = t.memoizedProps;
      u.props = f;
      var d = u.context, g = n.contextType;
      typeof g == "object" && g !== null ? g = Rt(g) : (g = vt(n) ? jn : lt.current, g = cr(t, g));
      var k = n.getDerivedStateFromProps, x = typeof k == "function" || typeof u.getSnapshotBeforeUpdate == "function";
      x || typeof u.UNSAFE_componentWillReceiveProps != "function" && typeof u.componentWillReceiveProps != "function" || (f !== r || d !== g) && la(t, u, r, g), kn = !1;
      var S = t.memoizedState;
      u.state = S, Ki(t, r, u, i), d = t.memoizedState, f !== r || S !== d || mt.current || kn ? (typeof k == "function" && (zo(t, n, k, r), d = t.memoizedState), (f = kn || ra(t, n, f, r, S, d, g)) ? (x || typeof u.UNSAFE_componentWillMount != "function" && typeof u.componentWillMount != "function" || (typeof u.componentWillMount == "function" && u.componentWillMount(), typeof u.UNSAFE_componentWillMount == "function" && u.UNSAFE_componentWillMount()), typeof u.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof u.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = r, t.memoizedState = d), u.props = r, u.state = d, u.context = g, r = f) : (typeof u.componentDidMount == "function" && (t.flags |= 4194308), r = !1);
    } else {
      u = t.stateNode, Lu(e, t), f = t.memoizedProps, g = t.type === t.elementType ? f : jt(t.type, f), u.props = g, x = t.pendingProps, S = u.context, d = n.contextType, typeof d == "object" && d !== null ? d = Rt(d) : (d = vt(n) ? jn : lt.current, d = cr(t, d));
      var N = n.getDerivedStateFromProps;
      (k = typeof N == "function" || typeof u.getSnapshotBeforeUpdate == "function") || typeof u.UNSAFE_componentWillReceiveProps != "function" && typeof u.componentWillReceiveProps != "function" || (f !== x || S !== d) && la(t, u, r, d), kn = !1, S = t.memoizedState, u.state = S, Ki(t, r, u, i);
      var M = t.memoizedState;
      f !== x || S !== M || mt.current || kn ? (typeof N == "function" && (zo(t, n, N, r), M = t.memoizedState), (g = kn || ra(t, n, g, r, S, M, d) || !1) ? (k || typeof u.UNSAFE_componentWillUpdate != "function" && typeof u.componentWillUpdate != "function" || (typeof u.componentWillUpdate == "function" && u.componentWillUpdate(r, M, d), typeof u.UNSAFE_componentWillUpdate == "function" && u.UNSAFE_componentWillUpdate(r, M, d)), typeof u.componentDidUpdate == "function" && (t.flags |= 4), typeof u.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof u.componentDidUpdate != "function" || f === e.memoizedProps && S === e.memoizedState || (t.flags |= 4), typeof u.getSnapshotBeforeUpdate != "function" || f === e.memoizedProps && S === e.memoizedState || (t.flags |= 1024), t.memoizedProps = r, t.memoizedState = M), u.props = r, u.state = M, u.context = d, r = g) : (typeof u.componentDidUpdate != "function" || f === e.memoizedProps && S === e.memoizedState || (t.flags |= 4), typeof u.getSnapshotBeforeUpdate != "function" || f === e.memoizedProps && S === e.memoizedState || (t.flags |= 1024), r = !1);
    }
    return Ao(e, t, n, r, o, i);
  }
  function Ao(e, t, n, r, i, o) {
    ma(e, t);
    var u = (t.flags & 128) !== 0;
    if (!r && !u) return i && Su(t, n, !1), nn(e, t, o);
    r = t.stateNode, Zf.current = t;
    var f = u && typeof n.getDerivedStateFromError != "function" ? null : r.render();
    return t.flags |= 1, e !== null && u ? (t.child = hr(t, e.child, null, o), t.child = hr(t, null, f, o)) : ft(e, t, f, o), t.memoizedState = r.state, i && Su(t, n, !0), t.child;
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
    var r = t.pendingProps, i = De.current, o = !1, u = (t.flags & 128) !== 0, f;
    if ((f = u) || (f = e !== null && e.memoizedState === null ? !1 : (i & 2) !== 0), f ? (o = !0, t.flags &= -129) : (e === null || e.memoizedState !== null) && (i |= 1), _e(De, i & 1), e === null)
      return co(t), e = t.memoizedState, e !== null && (e = e.dehydrated, e !== null) ? ((t.mode & 1) === 0 ? t.lanes = 1 : e.data === "$!" ? t.lanes = 8 : t.lanes = 1073741824, null) : (u = r.children, e = r.fallback, o ? (r = t.mode, o = t.child, u = { mode: "hidden", children: u }, (r & 1) === 0 && o !== null ? (o.childLanes = 0, o.pendingProps = u) : o = hl(u, r, 0, null), e = Kn(e, r, n, null), o.return = t, e.return = t, o.sibling = e, t.child = o, t.child.memoizedState = Fo(n), t.memoizedState = jo, e) : Uo(t, u));
    if (i = e.memoizedState, i !== null && (f = i.dehydrated, f !== null)) return Jf(e, t, u, r, f, i, n);
    if (o) {
      o = r.fallback, u = t.mode, i = e.child, f = i.sibling;
      var d = { mode: "hidden", children: r.children };
      return (u & 1) === 0 && t.child !== i ? (r = t.child, r.childLanes = 0, r.pendingProps = d, t.deletions = null) : (r = Nn(i, d), r.subtreeFlags = i.subtreeFlags & 14680064), f !== null ? o = Nn(f, o) : (o = Kn(o, u, n, null), o.flags |= 2), o.return = t, r.return = t, r.sibling = o, t.child = r, r = o, o = t.child, u = e.child.memoizedState, u = u === null ? Fo(n) : { baseLanes: u.baseLanes | n, cachePool: null, transitions: u.transitions }, o.memoizedState = u, o.childLanes = e.childLanes & ~n, t.memoizedState = jo, r;
    }
    return o = e.child, e = o.sibling, r = Nn(o, { mode: "visible", children: r.children }), (t.mode & 1) === 0 && (r.lanes = n), r.return = t, r.sibling = null, e !== null && (n = t.deletions, n === null ? (t.deletions = [e], t.flags |= 16) : n.push(e)), t.child = r, t.memoizedState = null, r;
  }
  function Uo(e, t) {
    return t = hl({ mode: "visible", children: t }, e.mode, 0, null), t.return = e, e.child = t;
  }
  function tl(e, t, n, r) {
    return r !== null && fo(r), hr(t, e.child, null, n), e = Uo(t, t.pendingProps.children), e.flags |= 2, t.memoizedState = null, e;
  }
  function Jf(e, t, n, r, i, o, u) {
    if (n)
      return t.flags & 256 ? (t.flags &= -257, r = Mo(Error(s(422))), tl(e, t, u, r)) : t.memoizedState !== null ? (t.child = e.child, t.flags |= 128, null) : (o = r.fallback, i = t.mode, r = hl({ mode: "visible", children: r.children }, i, 0, null), o = Kn(o, i, u, null), o.flags |= 2, r.return = t, o.return = t, r.sibling = o, t.child = r, (t.mode & 1) !== 0 && hr(t, e.child, null, u), t.child.memoizedState = Fo(u), t.memoizedState = jo, o);
    if ((t.mode & 1) === 0) return tl(e, t, u, null);
    if (i.data === "$!") {
      if (r = i.nextSibling && i.nextSibling.dataset, r) var f = r.dgst;
      return r = f, o = Error(s(419)), r = Mo(o, r, void 0), tl(e, t, u, r);
    }
    if (f = (u & e.childLanes) !== 0, yt || f) {
      if (r = be, r !== null) {
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
        i = (i & (r.suspendedLanes | u)) !== 0 ? 0 : i, i !== 0 && i !== o.retryLane && (o.retryLane = i, en(e, i), $t(r, e, i, -1));
      }
      return ts(), r = Mo(Error(s(421))), tl(e, t, u, r);
    }
    return i.data === "$?" ? (t.flags |= 128, t.child = e.child, t = fd.bind(null, e), i._reactRetry = t, null) : (e = o.treeContext, xt = gn(i.nextSibling), kt = t, Ne = !0, At = null, e !== null && (Tt[Pt++] = Jt, Tt[Pt++] = bt, Tt[Pt++] = Fn, Jt = e.id, bt = e.overflow, Fn = t), t = Uo(t, r.children), t.flags |= 4096, t);
  }
  function _a(e, t, n) {
    e.lanes |= t;
    var r = e.alternate;
    r !== null && (r.lanes |= t), vo(e.return, t, n);
  }
  function $o(e, t, n, r, i) {
    var o = e.memoizedState;
    o === null ? e.memoizedState = { isBackwards: t, rendering: null, renderingStartTime: 0, last: r, tail: n, tailMode: i } : (o.isBackwards = t, o.rendering = null, o.renderingStartTime = 0, o.last = r, o.tail = n, o.tailMode = i);
  }
  function Sa(e, t, n) {
    var r = t.pendingProps, i = r.revealOrder, o = r.tail;
    if (ft(e, t, r.children, n), r = De.current, (r & 2) !== 0) r = r & 1 | 2, t.flags |= 128;
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
    if (_e(De, r), (t.mode & 1) === 0) t.memoizedState = null;
    else switch (i) {
      case "forwards":
        for (n = t.child, i = null; n !== null; ) e = n.alternate, e !== null && Qi(e) === null && (i = n), n = n.sibling;
        n = i, n === null ? (i = t.child, t.child = null) : (i = n.sibling, n.sibling = null), $o(t, !1, i, n, o);
        break;
      case "backwards":
        for (n = null, i = t.child, t.child = null; i !== null; ) {
          if (e = i.alternate, e !== null && Qi(e) === null) {
            t.child = i;
            break;
          }
          e = i.sibling, i.sibling = n, n = i, i = e;
        }
        $o(t, !0, n, null, o);
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
  function bf(e, t, n) {
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
        _e(Wi, r._currentValue), r._currentValue = i;
        break;
      case 13:
        if (r = t.memoizedState, r !== null)
          return r.dehydrated !== null ? (_e(De, De.current & 1), t.flags |= 128, null) : (n & t.child.childLanes) !== 0 ? wa(e, t, n) : (_e(De, De.current & 1), e = nn(e, t, n), e !== null ? e.sibling : null);
        _e(De, De.current & 1);
        break;
      case 19:
        if (r = (n & t.childLanes) !== 0, (e.flags & 128) !== 0) {
          if (r) return Sa(e, t, n);
          t.flags |= 128;
        }
        if (i = t.memoizedState, i !== null && (i.rendering = null, i.tail = null, i.lastEffect = null), _e(De, De.current), r) break;
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
      var o = null;
      switch (n) {
        case "input":
          i = on(e, i), r = on(e, r), o = [];
          break;
        case "select":
          i = R({}, i, { value: void 0 }), r = R({}, r, { value: void 0 }), o = [];
          break;
        case "textarea":
          i = un(e, i), r = un(e, r), o = [];
          break;
        default:
          typeof i.onClick != "function" && typeof r.onClick == "function" && (e.onclick = Oi);
      }
      Ae(n, r);
      var u;
      n = null;
      for (g in i) if (!r.hasOwnProperty(g) && i.hasOwnProperty(g) && i[g] != null) if (g === "style") {
        var f = i[g];
        for (u in f) f.hasOwnProperty(u) && (n || (n = {}), n[u] = "");
      } else g !== "dangerouslySetInnerHTML" && g !== "children" && g !== "suppressContentEditableWarning" && g !== "suppressHydrationWarning" && g !== "autoFocus" && (m.hasOwnProperty(g) ? o || (o = []) : (o = o || []).push(g, null));
      for (g in r) {
        var d = r[g];
        if (f = i != null ? i[g] : void 0, r.hasOwnProperty(g) && d !== f && (d != null || f != null)) if (g === "style") if (f) {
          for (u in f) !f.hasOwnProperty(u) || d && d.hasOwnProperty(u) || (n || (n = {}), n[u] = "");
          for (u in d) d.hasOwnProperty(u) && f[u] !== d[u] && (n || (n = {}), n[u] = d[u]);
        } else n || (o || (o = []), o.push(
          g,
          n
        )), n = d;
        else g === "dangerouslySetInnerHTML" ? (d = d ? d.__html : void 0, f = f ? f.__html : void 0, d != null && f !== d && (o = o || []).push(g, d)) : g === "children" ? typeof d != "string" && typeof d != "number" || (o = o || []).push(g, "" + d) : g !== "suppressContentEditableWarning" && g !== "suppressHydrationWarning" && (m.hasOwnProperty(g) ? (d != null && g === "onScroll" && Ee("scroll", e), o || f === d || (o = [])) : (o = o || []).push(g, d));
      }
      n && (o = o || []).push("style", n);
      var g = o;
      (t.updateQueue = g) && (t.flags |= 4);
    }
  }, Ea = function(e, t, n, r) {
    n !== r && (t.flags |= 4);
  };
  function ri(e, t) {
    if (!Ne) switch (e.tailMode) {
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
  function ed(e, t, n) {
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
        return r = t.stateNode, yr(), Ce(mt), Ce(lt), ko(), r.pendingContext && (r.context = r.pendingContext, r.pendingContext = null), (e === null || e.child === null) && (Hi(t) ? t.flags |= 4 : e === null || e.memoizedState.isDehydrated && (t.flags & 256) === 0 || (t.flags |= 1024, At !== null && (Jo(At), At = null))), Vo(e, t), st(t), null;
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
            var o = t.memoizedProps;
            switch (r[Bt] = t, r[Kr] = o, e = (t.mode & 1) !== 0, n) {
              case "dialog":
                Ee("cancel", r), Ee("close", r);
                break;
              case "iframe":
              case "object":
              case "embed":
                Ee("load", r);
                break;
              case "video":
              case "audio":
                for (i = 0; i < Wr.length; i++) Ee(Wr[i], r);
                break;
              case "source":
                Ee("error", r);
                break;
              case "img":
              case "image":
              case "link":
                Ee(
                  "error",
                  r
                ), Ee("load", r);
                break;
              case "details":
                Ee("toggle", r);
                break;
              case "input":
                Tr(r, o), Ee("invalid", r);
                break;
              case "select":
                r._wrapperState = { wasMultiple: !!o.multiple }, Ee("invalid", r);
                break;
              case "textarea":
                F(r, o), Ee("invalid", r);
            }
            Ae(n, o), i = null;
            for (var u in o) if (o.hasOwnProperty(u)) {
              var f = o[u];
              u === "children" ? typeof f == "string" ? r.textContent !== f && (o.suppressHydrationWarning !== !0 && Ii(r.textContent, f, e), i = ["children", f]) : typeof f == "number" && r.textContent !== "" + f && (o.suppressHydrationWarning !== !0 && Ii(
                r.textContent,
                f,
                e
              ), i = ["children", "" + f]) : m.hasOwnProperty(u) && f != null && u === "onScroll" && Ee("scroll", r);
            }
            switch (n) {
              case "input":
                Ln(r), Qt(r, o, !0);
                break;
              case "textarea":
                Ln(r), Z(r);
                break;
              case "select":
              case "option":
                break;
              default:
                typeof o.onClick == "function" && (r.onclick = Oi);
            }
            r = i, t.updateQueue = r, r !== null && (t.flags |= 4);
          } else {
            u = i.nodeType === 9 ? i : i.ownerDocument, e === "http://www.w3.org/1999/xhtml" && (e = b(n)), e === "http://www.w3.org/1999/xhtml" ? n === "script" ? (e = u.createElement("div"), e.innerHTML = "<script><\/script>", e = e.removeChild(e.firstChild)) : typeof r.is == "string" ? e = u.createElement(n, { is: r.is }) : (e = u.createElement(n), n === "select" && (u = e, r.multiple ? u.multiple = !0 : r.size && (u.size = r.size))) : e = u.createElementNS(e, n), e[Bt] = t, e[Kr] = r, ka(e, t, !1, !1), t.stateNode = e;
            e: {
              switch (u = me(n, r), n) {
                case "dialog":
                  Ee("cancel", e), Ee("close", e), i = r;
                  break;
                case "iframe":
                case "object":
                case "embed":
                  Ee("load", e), i = r;
                  break;
                case "video":
                case "audio":
                  for (i = 0; i < Wr.length; i++) Ee(Wr[i], e);
                  i = r;
                  break;
                case "source":
                  Ee("error", e), i = r;
                  break;
                case "img":
                case "image":
                case "link":
                  Ee(
                    "error",
                    e
                  ), Ee("load", e), i = r;
                  break;
                case "details":
                  Ee("toggle", e), i = r;
                  break;
                case "input":
                  Tr(e, r), i = on(e, r), Ee("invalid", e);
                  break;
                case "option":
                  i = r;
                  break;
                case "select":
                  e._wrapperState = { wasMultiple: !!r.multiple }, i = R({}, r, { value: void 0 }), Ee("invalid", e);
                  break;
                case "textarea":
                  F(e, r), i = un(e, r), Ee("invalid", e);
                  break;
                default:
                  i = r;
              }
              Ae(n, i), f = i;
              for (o in f) if (f.hasOwnProperty(o)) {
                var d = f[o];
                o === "style" ? de(e, d) : o === "dangerouslySetInnerHTML" ? (d = d ? d.__html : void 0, d != null && ge(e, d)) : o === "children" ? typeof d == "string" ? (n !== "textarea" || d !== "") && xe(e, d) : typeof d == "number" && xe(e, "" + d) : o !== "suppressContentEditableWarning" && o !== "suppressHydrationWarning" && o !== "autoFocus" && (m.hasOwnProperty(o) ? d != null && o === "onScroll" && Ee("scroll", e) : d != null && We(e, o, d, u));
              }
              switch (n) {
                case "input":
                  Ln(e), Qt(e, r, !1);
                  break;
                case "textarea":
                  Ln(e), Z(e);
                  break;
                case "option":
                  r.value != null && e.setAttribute("value", "" + re(r.value));
                  break;
                case "select":
                  e.multiple = !!r.multiple, o = r.value, o != null ? sn(e, !!r.multiple, o, !1) : r.defaultValue != null && sn(
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
            if (r = t.stateNode, n = t.memoizedProps, r[Bt] = t, (o = r.nodeValue !== n) && (e = kt, e !== null)) switch (e.tag) {
              case 3:
                Ii(r.nodeValue, n, (e.mode & 1) !== 0);
                break;
              case 5:
                e.memoizedProps.suppressHydrationWarning !== !0 && Ii(r.nodeValue, n, (e.mode & 1) !== 0);
            }
            o && (t.flags |= 4);
          } else r = (n.nodeType === 9 ? n : n.ownerDocument).createTextNode(r), r[Bt] = t, t.stateNode = r;
        }
        return st(t), null;
      case 13:
        if (Ce(De), r = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
          if (Ne && xt !== null && (t.mode & 1) !== 0 && (t.flags & 128) === 0) Pu(), pr(), t.flags |= 98560, o = !1;
          else if (o = Hi(t), r !== null && r.dehydrated !== null) {
            if (e === null) {
              if (!o) throw Error(s(318));
              if (o = t.memoizedState, o = o !== null ? o.dehydrated : null, !o) throw Error(s(317));
              o[Bt] = t;
            } else pr(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
            st(t), o = !1;
          } else At !== null && (Jo(At), At = null), o = !0;
          if (!o) return t.flags & 65536 ? t : null;
        }
        return (t.flags & 128) !== 0 ? (t.lanes = n, t) : (r = r !== null, r !== (e !== null && e.memoizedState !== null) && r && (t.child.flags |= 8192, (t.mode & 1) !== 0 && (e === null || (De.current & 1) !== 0 ? Ke === 0 && (Ke = 3) : ts())), t.updateQueue !== null && (t.flags |= 4), st(t), null);
      case 4:
        return yr(), Vo(e, t), e === null && Yr(t.stateNode.containerInfo), st(t), null;
      case 10:
        return mo(t.type._context), st(t), null;
      case 17:
        return vt(t.type) && ji(), st(t), null;
      case 19:
        if (Ce(De), o = t.memoizedState, o === null) return st(t), null;
        if (r = (t.flags & 128) !== 0, u = o.rendering, u === null) if (r) ri(o, !1);
        else {
          if (Ke !== 0 || e !== null && (e.flags & 128) !== 0) for (e = t.child; e !== null; ) {
            if (u = Qi(e), u !== null) {
              for (t.flags |= 128, ri(o, !1), r = u.updateQueue, r !== null && (t.updateQueue = r, t.flags |= 4), t.subtreeFlags = 0, r = n, n = t.child; n !== null; ) o = n, e = r, o.flags &= 14680066, u = o.alternate, u === null ? (o.childLanes = 0, o.lanes = e, o.child = null, o.subtreeFlags = 0, o.memoizedProps = null, o.memoizedState = null, o.updateQueue = null, o.dependencies = null, o.stateNode = null) : (o.childLanes = u.childLanes, o.lanes = u.lanes, o.child = u.child, o.subtreeFlags = 0, o.deletions = null, o.memoizedProps = u.memoizedProps, o.memoizedState = u.memoizedState, o.updateQueue = u.updateQueue, o.type = u.type, e = u.dependencies, o.dependencies = e === null ? null : { lanes: e.lanes, firstContext: e.firstContext }), n = n.sibling;
              return _e(De, De.current & 1 | 2), t.child;
            }
            e = e.sibling;
          }
          o.tail !== null && Ue() > Sr && (t.flags |= 128, r = !0, ri(o, !1), t.lanes = 4194304);
        }
        else {
          if (!r) if (e = Qi(u), e !== null) {
            if (t.flags |= 128, r = !0, n = e.updateQueue, n !== null && (t.updateQueue = n, t.flags |= 4), ri(o, !0), o.tail === null && o.tailMode === "hidden" && !u.alternate && !Ne) return st(t), null;
          } else 2 * Ue() - o.renderingStartTime > Sr && n !== 1073741824 && (t.flags |= 128, r = !0, ri(o, !1), t.lanes = 4194304);
          o.isBackwards ? (u.sibling = t.child, t.child = u) : (n = o.last, n !== null ? n.sibling = u : t.child = u, o.last = u);
        }
        return o.tail !== null ? (t = o.tail, o.rendering = t, o.tail = t.sibling, o.renderingStartTime = Ue(), t.sibling = null, n = De.current, _e(De, r ? n & 1 | 2 : n & 1), t) : (st(t), null);
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
  function td(e, t) {
    switch (uo(t), t.tag) {
      case 1:
        return vt(t.type) && ji(), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 3:
        return yr(), Ce(mt), Ce(lt), ko(), e = t.flags, (e & 65536) !== 0 && (e & 128) === 0 ? (t.flags = e & -65537 | 128, t) : null;
      case 5:
        return _o(t), null;
      case 13:
        if (Ce(De), e = t.memoizedState, e !== null && e.dehydrated !== null) {
          if (t.alternate === null) throw Error(s(340));
          pr();
        }
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 19:
        return Ce(De), null;
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
  var rl = !1, ut = !1, nd = typeof WeakSet == "function" ? WeakSet : Set, L = null;
  function wr(e, t) {
    var n = e.ref;
    if (n !== null) if (typeof n == "function") try {
      n(null);
    } catch (r) {
      je(e, t, r);
    }
    else n.current = null;
  }
  function Ho(e, t, n) {
    try {
      n();
    } catch (r) {
      je(e, t, r);
    }
  }
  var Ca = !1;
  function rd(e, t) {
    if (bl = xi, e = ru(), Yl(e)) {
      if ("selectionStart" in e) var n = { start: e.selectionStart, end: e.selectionEnd };
      else e: {
        n = (n = e.ownerDocument) && n.defaultView || window;
        var r = n.getSelection && n.getSelection();
        if (r && r.rangeCount !== 0) {
          n = r.anchorNode;
          var i = r.anchorOffset, o = r.focusNode;
          r = r.focusOffset;
          try {
            n.nodeType, o.nodeType;
          } catch {
            n = null;
            break e;
          }
          var u = 0, f = -1, d = -1, g = 0, k = 0, x = e, S = null;
          t: for (; ; ) {
            for (var N; x !== n || i !== 0 && x.nodeType !== 3 || (f = u + i), x !== o || r !== 0 && x.nodeType !== 3 || (d = u + r), x.nodeType === 3 && (u += x.nodeValue.length), (N = x.firstChild) !== null; )
              S = x, x = N;
            for (; ; ) {
              if (x === e) break t;
              if (S === n && ++g === i && (f = u), S === o && ++k === r && (d = u), (N = x.nextSibling) !== null) break;
              x = S, S = x.parentNode;
            }
            x = N;
          }
          n = f === -1 || d === -1 ? null : { start: f, end: d };
        } else n = null;
      }
      n = n || { start: 0, end: 0 };
    } else n = null;
    for (eo = { focusedElem: e, selectionRange: n }, xi = !1, L = t; L !== null; ) if (t = L, e = t.child, (t.subtreeFlags & 1028) !== 0 && e !== null) e.return = t, L = e;
    else for (; L !== null; ) {
      t = L;
      try {
        var M = t.alternate;
        if ((t.flags & 1024) !== 0) switch (t.tag) {
          case 0:
          case 11:
          case 15:
            break;
          case 1:
            if (M !== null) {
              var I = M.memoizedProps, $e = M.memoizedState, v = t.stateNode, p = v.getSnapshotBeforeUpdate(t.elementType === t.type ? I : jt(t.type, I), $e);
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
        je(t, t.return, E);
      }
      if (e = t.sibling, e !== null) {
        e.return = t.return, L = e;
        break;
      }
      L = t.return;
    }
    return M = Ca, Ca = !1, M;
  }
  function ii(e, t, n) {
    var r = t.updateQueue;
    if (r = r !== null ? r.lastEffect : null, r !== null) {
      var i = r = r.next;
      do {
        if ((i.tag & e) === e) {
          var o = i.destroy;
          i.destroy = void 0, o !== void 0 && Ho(t, n, o);
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
  function Ta(e) {
    var t = e.alternate;
    t !== null && (e.alternate = null, Ta(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && (delete t[Bt], delete t[Kr], delete t[io], delete t[Uf], delete t[$f])), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
  }
  function Pa(e) {
    return e.tag === 5 || e.tag === 3 || e.tag === 4;
  }
  function Ra(e) {
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
            var o = i, u = o.destroy;
            o = o.tag, u !== void 0 && ((o & 2) !== 0 || (o & 4) !== 0) && Ho(n, t, u), i = i.next;
          } while (i !== r);
        }
        En(e, t, n);
        break;
      case 1:
        if (!ut && (wr(n, t), r = n.stateNode, typeof r.componentWillUnmount == "function")) try {
          r.props = n.memoizedProps, r.state = n.memoizedState, r.componentWillUnmount();
        } catch (f) {
          je(n, t, f);
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
      n === null && (n = e.stateNode = new nd()), t.forEach(function(r) {
        var i = dd.bind(null, e, r);
        n.has(r) || (n.add(r), r.then(i, i));
      });
    }
  }
  function Ut(e, t) {
    var n = t.deletions;
    if (n !== null) for (var r = 0; r < n.length; r++) {
      var i = n[r];
      try {
        var o = e, u = t, f = u;
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
        Na(o, u, i), nt = null, Ft = !1;
        var d = i.alternate;
        d !== null && (d.return = null), i.return = null;
      } catch (g) {
        je(i, t, g);
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
          } catch (I) {
            je(e, e.return, I);
          }
          try {
            ii(5, e, e.return);
          } catch (I) {
            je(e, e.return, I);
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
            xe(i, "");
          } catch (I) {
            je(e, e.return, I);
          }
        }
        if (r & 4 && (i = e.stateNode, i != null)) {
          var o = e.memoizedProps, u = n !== null ? n.memoizedProps : o, f = e.type, d = e.updateQueue;
          if (e.updateQueue = null, d !== null) try {
            f === "input" && o.type === "radio" && o.name != null && Pr(i, o), me(f, u);
            var g = me(f, o);
            for (u = 0; u < d.length; u += 2) {
              var k = d[u], x = d[u + 1];
              k === "style" ? de(i, x) : k === "dangerouslySetInnerHTML" ? ge(i, x) : k === "children" ? xe(i, x) : We(i, k, x, g);
            }
            switch (f) {
              case "input":
                Rr(i, o);
                break;
              case "textarea":
                ne(i, o);
                break;
              case "select":
                var S = i._wrapperState.wasMultiple;
                i._wrapperState.wasMultiple = !!o.multiple;
                var N = o.value;
                N != null ? sn(i, !!o.multiple, N, !1) : S !== !!o.multiple && (o.defaultValue != null ? sn(
                  i,
                  !!o.multiple,
                  o.defaultValue,
                  !0
                ) : sn(i, !!o.multiple, o.multiple ? [] : "", !1));
            }
            i[Kr] = o;
          } catch (I) {
            je(e, e.return, I);
          }
        }
        break;
      case 6:
        if (Ut(t, e), Xt(e), r & 4) {
          if (e.stateNode === null) throw Error(s(162));
          i = e.stateNode, o = e.memoizedProps;
          try {
            i.nodeValue = o;
          } catch (I) {
            je(e, e.return, I);
          }
        }
        break;
      case 3:
        if (Ut(t, e), Xt(e), r & 4 && n !== null && n.memoizedState.isDehydrated) try {
          Ar(t.containerInfo);
        } catch (I) {
          je(e, e.return, I);
        }
        break;
      case 4:
        Ut(t, e), Xt(e);
        break;
      case 13:
        Ut(t, e), Xt(e), i = e.child, i.flags & 8192 && (o = i.memoizedState !== null, i.stateNode.isHidden = o, !o || i.alternate !== null && i.alternate.memoizedState !== null || (Qo = Ue())), r & 4 && Da(e);
        break;
      case 22:
        if (k = n !== null && n.memoizedState !== null, e.mode & 1 ? (ut = (g = ut) || k, Ut(t, e), ut = g) : Ut(t, e), Xt(e), r & 8192) {
          if (g = e.memoizedState !== null, (e.stateNode.isHidden = g) && !k && (e.mode & 1) !== 0) for (L = e, k = e.child; k !== null; ) {
            for (x = L = k; L !== null; ) {
              switch (S = L, N = S.child, S.tag) {
                case 0:
                case 11:
                case 14:
                case 15:
                  ii(4, S, S.return);
                  break;
                case 1:
                  wr(S, S.return);
                  var M = S.stateNode;
                  if (typeof M.componentWillUnmount == "function") {
                    r = S, n = S.return;
                    try {
                      t = r, M.props = t.memoizedProps, M.state = t.memoizedState, M.componentWillUnmount();
                    } catch (I) {
                      je(r, n, I);
                    }
                  }
                  break;
                case 5:
                  wr(S, S.return);
                  break;
                case 22:
                  if (S.memoizedState !== null) {
                    Ia(x);
                    continue;
                  }
              }
              N !== null ? (N.return = S, L = N) : Ia(x);
            }
            k = k.sibling;
          }
          e: for (k = null, x = e; ; ) {
            if (x.tag === 5) {
              if (k === null) {
                k = x;
                try {
                  i = x.stateNode, g ? (o = i.style, typeof o.setProperty == "function" ? o.setProperty("display", "none", "important") : o.display = "none") : (f = x.stateNode, d = x.memoizedProps.style, u = d != null && d.hasOwnProperty("display") ? d.display : null, f.style.display = Re("display", u));
                } catch (I) {
                  je(e, e.return, I);
                }
              }
            } else if (x.tag === 6) {
              if (k === null) try {
                x.stateNode.nodeValue = g ? "" : x.memoizedProps;
              } catch (I) {
                je(e, e.return, I);
              }
            } else if ((x.tag !== 22 && x.tag !== 23 || x.memoizedState === null || x === e) && x.child !== null) {
              x.child.return = x, x = x.child;
              continue;
            }
            if (x === e) break e;
            for (; x.sibling === null; ) {
              if (x.return === null || x.return === e) break e;
              k === x && (k = null), x = x.return;
            }
            k === x && (k = null), x.sibling.return = x.return, x = x.sibling;
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
            if (Pa(n)) {
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
            r.flags & 32 && (xe(i, ""), r.flags &= -33);
            var o = Ra(e);
            Yo(e, o, i);
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
        je(e, e.return, d);
      }
      e.flags &= -3;
    }
    t & 4096 && (e.flags &= -4097);
  }
  function id(e, t, n) {
    L = e, La(e);
  }
  function La(e, t, n) {
    for (var r = (e.mode & 1) !== 0; L !== null; ) {
      var i = L, o = i.child;
      if (i.tag === 22 && r) {
        var u = i.memoizedState !== null || rl;
        if (!u) {
          var f = i.alternate, d = f !== null && f.memoizedState !== null || ut;
          f = rl;
          var g = ut;
          if (rl = u, (ut = d) && !g) for (L = i; L !== null; ) u = L, d = u.child, u.tag === 22 && u.memoizedState !== null ? Oa(i) : d !== null ? (d.return = u, L = d) : Oa(i);
          for (; o !== null; ) L = o, La(o), o = o.sibling;
          L = i, rl = f, ut = g;
        }
        Ma(e);
      } else (i.subtreeFlags & 8772) !== 0 && o !== null ? (o.return = i, L = o) : Ma(e);
    }
  }
  function Ma(e) {
    for (; L !== null; ) {
      var t = L;
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
              var o = t.updateQueue;
              o !== null && Iu(t, o, r);
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
                  var k = g.memoizedState;
                  if (k !== null) {
                    var x = k.dehydrated;
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
        } catch (S) {
          je(t, t.return, S);
        }
      }
      if (t === e) {
        L = null;
        break;
      }
      if (n = t.sibling, n !== null) {
        n.return = t.return, L = n;
        break;
      }
      L = t.return;
    }
  }
  function Ia(e) {
    for (; L !== null; ) {
      var t = L;
      if (t === e) {
        L = null;
        break;
      }
      var n = t.sibling;
      if (n !== null) {
        n.return = t.return, L = n;
        break;
      }
      L = t.return;
    }
  }
  function Oa(e) {
    for (; L !== null; ) {
      var t = L;
      try {
        switch (t.tag) {
          case 0:
          case 11:
          case 15:
            var n = t.return;
            try {
              il(4, t);
            } catch (d) {
              je(t, n, d);
            }
            break;
          case 1:
            var r = t.stateNode;
            if (typeof r.componentDidMount == "function") {
              var i = t.return;
              try {
                r.componentDidMount();
              } catch (d) {
                je(t, i, d);
              }
            }
            var o = t.return;
            try {
              Bo(t);
            } catch (d) {
              je(t, o, d);
            }
            break;
          case 5:
            var u = t.return;
            try {
              Bo(t);
            } catch (d) {
              je(t, u, d);
            }
        }
      } catch (d) {
        je(t, t.return, d);
      }
      if (t === e) {
        L = null;
        break;
      }
      var f = t.sibling;
      if (f !== null) {
        f.return = t.return, L = f;
        break;
      }
      L = t.return;
    }
  }
  var ld = Math.ceil, ll = Ie.ReactCurrentDispatcher, Xo = Ie.ReactCurrentOwner, Dt = Ie.ReactCurrentBatchConfig, oe = 0, be = null, He = null, rt = 0, Et = 0, _r = wn(0), Ke = 0, li = null, Bn = 0, ol = 0, Ko = 0, oi = null, gt = null, Qo = 0, Sr = 1 / 0, rn = null, sl = !1, Go = null, Cn = null, ul = !1, Tn = null, al = 0, si = 0, qo = null, cl = -1, fl = 0;
  function dt() {
    return (oe & 6) !== 0 ? Ue() : cl !== -1 ? cl : cl = Ue();
  }
  function Pn(e) {
    return (e.mode & 1) === 0 ? 1 : (oe & 2) !== 0 && rt !== 0 ? rt & -rt : Hf.transition !== null ? (fl === 0 && (fl = Rs()), fl) : (e = pe, e !== 0 || (e = window.event, e = e === void 0 ? 16 : js(e.type)), e);
  }
  function $t(e, t, n, r) {
    if (50 < si) throw si = 0, qo = null, Error(s(185));
    zr(e, n, r), ((oe & 2) === 0 || e !== be) && (e === be && ((oe & 2) === 0 && (ol |= n), Ke === 4 && Rn(e, rt)), wt(e, r), n === 1 && oe === 0 && (t.mode & 1) === 0 && (Sr = Ue() + 500, Ui && Sn()));
  }
  function wt(e, t) {
    var n = e.callbackNode;
    Vc(e, t);
    var r = _i(e, e === be ? rt : 0);
    if (r === 0) n !== null && Cs(n), e.callbackNode = null, e.callbackPriority = 0;
    else if (t = r & -r, e.callbackPriority !== t) {
      if (n != null && Cs(n), t === 1) e.tag === 0 ? Vf(ja.bind(null, e)) : ku(ja.bind(null, e)), jf(function() {
        (oe & 6) === 0 && Sn();
      }), n = null;
      else {
        switch (Ns(r)) {
          case 1:
            n = Rl;
            break;
          case 4:
            n = Ts;
            break;
          case 16:
            n = vi;
            break;
          case 536870912:
            n = Ps;
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
    if (cl = -1, fl = 0, (oe & 6) !== 0) throw Error(s(327));
    var n = e.callbackNode;
    if (kr() && e.callbackNode !== n) return null;
    var r = _i(e, e === be ? rt : 0);
    if (r === 0) return null;
    if ((r & 30) !== 0 || (r & e.expiredLanes) !== 0 || t) t = dl(e, r);
    else {
      t = r;
      var i = oe;
      oe |= 2;
      var o = Ua();
      (be !== e || rt !== t) && (rn = null, Sr = Ue() + 500, Yn(e, t));
      do
        try {
          ud();
          break;
        } catch (f) {
          Fa(e, f);
        }
      while (!0);
      ho(), ll.current = o, oe = i, He !== null ? t = 0 : (be = null, rt = 0, t = Ke);
    }
    if (t !== 0) {
      if (t === 2 && (i = Nl(e), i !== 0 && (r = i, t = Zo(e, i))), t === 1) throw n = li, Yn(e, 0), Rn(e, r), wt(e, Ue()), n;
      if (t === 6) Rn(e, r);
      else {
        if (i = e.current.alternate, (r & 30) === 0 && !od(i) && (t = dl(e, r), t === 2 && (o = Nl(e), o !== 0 && (r = o, t = Zo(e, o))), t === 1)) throw n = li, Yn(e, 0), Rn(e, r), wt(e, Ue()), n;
        switch (e.finishedWork = i, e.finishedLanes = r, t) {
          case 0:
          case 1:
            throw Error(s(345));
          case 2:
            Xn(e, gt, rn);
            break;
          case 3:
            if (Rn(e, r), (r & 130023424) === r && (t = Qo + 500 - Ue(), 10 < t)) {
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
              o = 1 << u, u = t[u], u > i && (i = u), r &= ~o;
            }
            if (r = i, r = Ue() - r, r = (120 > r ? 120 : 480 > r ? 480 : 1080 > r ? 1080 : 1920 > r ? 1920 : 3e3 > r ? 3e3 : 4320 > r ? 4320 : 1960 * ld(r / 1960)) - r, 10 < r) {
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
    return wt(e, Ue()), e.callbackNode === n ? Aa.bind(null, e) : null;
  }
  function Zo(e, t) {
    var n = oi;
    return e.current.memoizedState.isDehydrated && (Yn(e, t).flags |= 256), e = dl(e, t), e !== 2 && (t = gt, gt = n, t !== null && Jo(t)), e;
  }
  function Jo(e) {
    gt === null ? gt = e : gt.push.apply(gt, e);
  }
  function od(e) {
    for (var t = e; ; ) {
      if (t.flags & 16384) {
        var n = t.updateQueue;
        if (n !== null && (n = n.stores, n !== null)) for (var r = 0; r < n.length; r++) {
          var i = n[r], o = i.getSnapshot;
          i = i.value;
          try {
            if (!Ot(o(), i)) return !1;
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
    if ((oe & 6) !== 0) throw Error(s(327));
    kr();
    var t = _i(e, 0);
    if ((t & 1) === 0) return wt(e, Ue()), null;
    var n = dl(e, t);
    if (e.tag !== 0 && n === 2) {
      var r = Nl(e);
      r !== 0 && (t = r, n = Zo(e, r));
    }
    if (n === 1) throw n = li, Yn(e, 0), Rn(e, t), wt(e, Ue()), n;
    if (n === 6) throw Error(s(345));
    return e.finishedWork = e.current.alternate, e.finishedLanes = t, Xn(e, gt, rn), wt(e, Ue()), null;
  }
  function bo(e, t) {
    var n = oe;
    oe |= 1;
    try {
      return e(t);
    } finally {
      oe = n, oe === 0 && (Sr = Ue() + 500, Ui && Sn());
    }
  }
  function Wn(e) {
    Tn !== null && Tn.tag === 0 && (oe & 6) === 0 && kr();
    var t = oe;
    oe |= 1;
    var n = Dt.transition, r = pe;
    try {
      if (Dt.transition = null, pe = 1, e) return e();
    } finally {
      pe = r, Dt.transition = n, oe = t, (oe & 6) === 0 && Sn();
    }
  }
  function es() {
    Et = _r.current, Ce(_r);
  }
  function Yn(e, t) {
    e.finishedWork = null, e.finishedLanes = 0;
    var n = e.timeoutHandle;
    if (n !== -1 && (e.timeoutHandle = -1, Af(n)), He !== null) for (n = He.return; n !== null; ) {
      var r = n;
      switch (uo(r), r.tag) {
        case 1:
          r = r.type.childContextTypes, r != null && ji();
          break;
        case 3:
          yr(), Ce(mt), Ce(lt), ko();
          break;
        case 5:
          _o(r);
          break;
        case 4:
          yr();
          break;
        case 13:
          Ce(De);
          break;
        case 19:
          Ce(De);
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
    if (be = e, He = e = Nn(e.current, null), rt = Et = t, Ke = 0, li = null, Ko = ol = Bn = 0, gt = oi = null, $n !== null) {
      for (t = 0; t < $n.length; t++) if (n = $n[t], r = n.interleaved, r !== null) {
        n.interleaved = null;
        var i = r.next, o = n.pending;
        if (o !== null) {
          var u = o.next;
          o.next = i, r.next = u;
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
          for (var r = ze.memoizedState; r !== null; ) {
            var i = r.queue;
            i !== null && (i.pending = null), r = r.next;
          }
          qi = !1;
        }
        if (Hn = 0, Je = Xe = ze = null, br = !1, ei = 0, Xo.current = null, n === null || n.return === null) {
          Ke = 1, li = t, He = null;
          break;
        }
        e: {
          var o = e, u = n.return, f = n, d = t;
          if (t = rt, f.flags |= 32768, d !== null && typeof d == "object" && typeof d.then == "function") {
            var g = d, k = f, x = k.tag;
            if ((k.mode & 1) === 0 && (x === 0 || x === 11 || x === 15)) {
              var S = k.alternate;
              S ? (k.updateQueue = S.updateQueue, k.memoizedState = S.memoizedState, k.lanes = S.lanes) : (k.updateQueue = null, k.memoizedState = null);
            }
            var N = aa(u);
            if (N !== null) {
              N.flags &= -257, ca(N, u, f, o, t), N.mode & 1 && ua(o, g, t), t = N, d = g;
              var M = t.updateQueue;
              if (M === null) {
                var I = /* @__PURE__ */ new Set();
                I.add(d), t.updateQueue = I;
              } else M.add(d);
              break e;
            } else {
              if ((t & 1) === 0) {
                ua(o, g, t), ts();
                break e;
              }
              d = Error(s(426));
            }
          } else if (Ne && f.mode & 1) {
            var $e = aa(u);
            if ($e !== null) {
              ($e.flags & 65536) === 0 && ($e.flags |= 256), ca($e, u, f, o, t), fo(gr(d, f));
              break e;
            }
          }
          o = d = gr(d, f), Ke !== 4 && (Ke = 2), oi === null ? oi = [o] : oi.push(o), o = u;
          do {
            switch (o.tag) {
              case 3:
                o.flags |= 65536, t &= -t, o.lanes |= t;
                var v = oa(o, d, t);
                Mu(o, v);
                break e;
              case 1:
                f = d;
                var p = o.type, y = o.stateNode;
                if ((o.flags & 128) === 0 && (typeof p.getDerivedStateFromError == "function" || y !== null && typeof y.componentDidCatch == "function" && (Cn === null || !Cn.has(y)))) {
                  o.flags |= 65536, t &= -t, o.lanes |= t;
                  var E = sa(o, f, t);
                  Mu(o, E);
                  break e;
                }
            }
            o = o.return;
          } while (o !== null);
        }
        Va(n);
      } catch (O) {
        t = O, He === n && n !== null && (He = n = n.return);
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
    (Ke === 0 || Ke === 3 || Ke === 2) && (Ke = 4), be === null || (Bn & 268435455) === 0 && (ol & 268435455) === 0 || Rn(be, rt);
  }
  function dl(e, t) {
    var n = oe;
    oe |= 2;
    var r = Ua();
    (be !== e || rt !== t) && (rn = null, Yn(e, t));
    do
      try {
        sd();
        break;
      } catch (i) {
        Fa(e, i);
      }
    while (!0);
    if (ho(), oe = n, ll.current = r, He !== null) throw Error(s(261));
    return be = null, rt = 0, Ke;
  }
  function sd() {
    for (; He !== null; ) $a(He);
  }
  function ud() {
    for (; He !== null && !Lc(); ) $a(He);
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
        if (n = ed(n, t, Et), n !== null) {
          He = n;
          return;
        }
      } else {
        if (n = td(n, t), n !== null) {
          n.flags &= 32767, He = n;
          return;
        }
        if (e !== null) e.flags |= 32768, e.subtreeFlags = 0, e.deletions = null;
        else {
          Ke = 6, He = null;
          return;
        }
      }
      if (t = t.sibling, t !== null) {
        He = t;
        return;
      }
      He = t = e;
    } while (t !== null);
    Ke === 0 && (Ke = 5);
  }
  function Xn(e, t, n) {
    var r = pe, i = Dt.transition;
    try {
      Dt.transition = null, pe = 1, ad(e, t, n, r);
    } finally {
      Dt.transition = i, pe = r;
    }
    return null;
  }
  function ad(e, t, n, r) {
    do
      kr();
    while (Tn !== null);
    if ((oe & 6) !== 0) throw Error(s(327));
    n = e.finishedWork;
    var i = e.finishedLanes;
    if (n === null) return null;
    if (e.finishedWork = null, e.finishedLanes = 0, n === e.current) throw Error(s(177));
    e.callbackNode = null, e.callbackPriority = 0;
    var o = n.lanes | n.childLanes;
    if (Hc(e, o), e === be && (He = be = null, rt = 0), (n.subtreeFlags & 2064) === 0 && (n.flags & 2064) === 0 || ul || (ul = !0, Ya(vi, function() {
      return kr(), null;
    })), o = (n.flags & 15990) !== 0, (n.subtreeFlags & 15990) !== 0 || o) {
      o = Dt.transition, Dt.transition = null;
      var u = pe;
      pe = 1;
      var f = oe;
      oe |= 4, Xo.current = null, rd(e, n), za(n, e), Nf(eo), xi = !!bl, eo = bl = null, e.current = n, id(n), Mc(), oe = f, pe = u, Dt.transition = o;
    } else e.current = n;
    if (ul && (ul = !1, Tn = e, al = i), o = e.pendingLanes, o === 0 && (Cn = null), Ac(n.stateNode), wt(e, Ue()), t !== null) for (r = e.onRecoverableError, n = 0; n < t.length; n++) i = t[n], r(i.value, { componentStack: i.stack, digest: i.digest });
    if (sl) throw sl = !1, e = Go, Go = null, e;
    return (al & 1) !== 0 && e.tag !== 0 && kr(), o = e.pendingLanes, (o & 1) !== 0 ? e === qo ? si++ : (si = 0, qo = e) : si = 0, Sn(), null;
  }
  function kr() {
    if (Tn !== null) {
      var e = Ns(al), t = Dt.transition, n = pe;
      try {
        if (Dt.transition = null, pe = 16 > e ? 16 : e, Tn === null) var r = !1;
        else {
          if (e = Tn, Tn = null, al = 0, (oe & 6) !== 0) throw Error(s(331));
          var i = oe;
          for (oe |= 4, L = e.current; L !== null; ) {
            var o = L, u = o.child;
            if ((L.flags & 16) !== 0) {
              var f = o.deletions;
              if (f !== null) {
                for (var d = 0; d < f.length; d++) {
                  var g = f[d];
                  for (L = g; L !== null; ) {
                    var k = L;
                    switch (k.tag) {
                      case 0:
                      case 11:
                      case 15:
                        ii(8, k, o);
                    }
                    var x = k.child;
                    if (x !== null) x.return = k, L = x;
                    else for (; L !== null; ) {
                      k = L;
                      var S = k.sibling, N = k.return;
                      if (Ta(k), k === g) {
                        L = null;
                        break;
                      }
                      if (S !== null) {
                        S.return = N, L = S;
                        break;
                      }
                      L = N;
                    }
                  }
                }
                var M = o.alternate;
                if (M !== null) {
                  var I = M.child;
                  if (I !== null) {
                    M.child = null;
                    do {
                      var $e = I.sibling;
                      I.sibling = null, I = $e;
                    } while (I !== null);
                  }
                }
                L = o;
              }
            }
            if ((o.subtreeFlags & 2064) !== 0 && u !== null) u.return = o, L = u;
            else e: for (; L !== null; ) {
              if (o = L, (o.flags & 2048) !== 0) switch (o.tag) {
                case 0:
                case 11:
                case 15:
                  ii(9, o, o.return);
              }
              var v = o.sibling;
              if (v !== null) {
                v.return = o.return, L = v;
                break e;
              }
              L = o.return;
            }
          }
          var p = e.current;
          for (L = p; L !== null; ) {
            u = L;
            var y = u.child;
            if ((u.subtreeFlags & 2064) !== 0 && y !== null) y.return = u, L = y;
            else e: for (u = p; L !== null; ) {
              if (f = L, (f.flags & 2048) !== 0) try {
                switch (f.tag) {
                  case 0:
                  case 11:
                  case 15:
                    il(9, f);
                }
              } catch (O) {
                je(f, f.return, O);
              }
              if (f === u) {
                L = null;
                break e;
              }
              var E = f.sibling;
              if (E !== null) {
                E.return = f.return, L = E;
                break e;
              }
              L = f.return;
            }
          }
          if (oe = i, Sn(), Ht && typeof Ht.onPostCommitFiberRoot == "function") try {
            Ht.onPostCommitFiberRoot(yi, e);
          } catch {
          }
          r = !0;
        }
        return r;
      } finally {
        pe = n, Dt.transition = t;
      }
    }
    return !1;
  }
  function Ha(e, t, n) {
    t = gr(n, t), t = oa(e, t, 1), e = xn(e, t, 1), t = dt(), e !== null && (zr(e, 1, t), wt(e, t));
  }
  function je(e, t, n) {
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
  function cd(e, t, n) {
    var r = e.pingCache;
    r !== null && r.delete(t), t = dt(), e.pingedLanes |= e.suspendedLanes & n, be === e && (rt & n) === n && (Ke === 4 || Ke === 3 && (rt & 130023424) === rt && 500 > Ue() - Qo ? Yn(e, 0) : Ko |= n), wt(e, t);
  }
  function Ba(e, t) {
    t === 0 && ((e.mode & 1) === 0 ? t = 1 : (t = wi, wi <<= 1, (wi & 130023424) === 0 && (wi = 4194304)));
    var n = dt();
    e = en(e, t), e !== null && (zr(e, t, n), wt(e, n));
  }
  function fd(e) {
    var t = e.memoizedState, n = 0;
    t !== null && (n = t.retryLane), Ba(e, n);
  }
  function dd(e, t) {
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
      if ((e.lanes & n) === 0 && (t.flags & 128) === 0) return yt = !1, bf(e, t, n);
      yt = (e.flags & 131072) !== 0;
    }
    else yt = !1, Ne && (t.flags & 1048576) !== 0 && xu(t, Vi, t.index);
    switch (t.lanes = 0, t.tag) {
      case 2:
        var r = t.type;
        nl(e, t), e = t.pendingProps;
        var i = cr(t, lt.current);
        vr(t, n), i = Co(null, t, r, e, i, n);
        var o = To();
        return t.flags |= 1, typeof i == "object" && i !== null && typeof i.render == "function" && i.$$typeof === void 0 ? (t.tag = 1, t.memoizedState = null, t.updateQueue = null, vt(r) ? (o = !0, Fi(t)) : o = !1, t.memoizedState = i.state !== null && i.state !== void 0 ? i.state : null, go(t), i.updater = el, t.stateNode = i, i._reactInternals = t, Lo(t, r, e, n), t = Ao(null, t, r, !0, o, n)) : (t.tag = 0, Ne && o && so(t), ft(null, t, i, n), t = t.child), t;
      case 16:
        r = t.elementType;
        e: {
          switch (nl(e, t), e = t.pendingProps, i = r._init, r = i(r._payload), t.type = r, i = t.tag = hd(r), e = jt(r, e), i) {
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
          r = t.pendingProps, o = t.memoizedState, i = o.element, Lu(e, t), Ki(t, r, null, n);
          var u = t.memoizedState;
          if (r = u.element, o.isDehydrated) if (o = { element: r, isDehydrated: !1, cache: u.cache, pendingSuspenseBoundaries: u.pendingSuspenseBoundaries, transitions: u.transitions }, t.updateQueue.baseState = o, t.memoizedState = o, t.flags & 256) {
            i = gr(Error(s(423)), t), t = ga(e, t, r, n, i);
            break e;
          } else if (r !== i) {
            i = gr(Error(s(424)), t), t = ga(e, t, r, n, i);
            break e;
          } else for (xt = gn(t.stateNode.containerInfo.firstChild), kt = t, Ne = !0, At = null, n = Du(t, null, r, n), t.child = n; n; ) n.flags = n.flags & -3 | 4096, n = n.sibling;
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
        return Ou(t), e === null && co(t), r = t.type, i = t.pendingProps, o = e !== null ? e.memoizedProps : null, u = i.children, to(r, i) ? u = null : o !== null && to(r, o) && (t.flags |= 32), ma(e, t), ft(e, t, u, n), t.child;
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
          if (r = t.type._context, i = t.pendingProps, o = t.memoizedProps, u = i.value, _e(Wi, r._currentValue), r._currentValue = u, o !== null) if (Ot(o.value, u)) {
            if (o.children === i.children && !mt.current) {
              t = nn(e, t, n);
              break e;
            }
          } else for (o = t.child, o !== null && (o.return = t); o !== null; ) {
            var f = o.dependencies;
            if (f !== null) {
              u = o.child;
              for (var d = f.firstContext; d !== null; ) {
                if (d.context === r) {
                  if (o.tag === 1) {
                    d = tn(-1, n & -n), d.tag = 2;
                    var g = o.updateQueue;
                    if (g !== null) {
                      g = g.shared;
                      var k = g.pending;
                      k === null ? d.next = d : (d.next = k.next, k.next = d), g.pending = d;
                    }
                  }
                  o.lanes |= n, d = o.alternate, d !== null && (d.lanes |= n), vo(
                    o.return,
                    n,
                    t
                  ), f.lanes |= n;
                  break;
                }
                d = d.next;
              }
            } else if (o.tag === 10) u = o.type === t.type ? null : o.child;
            else if (o.tag === 18) {
              if (u = o.return, u === null) throw Error(s(341));
              u.lanes |= n, f = u.alternate, f !== null && (f.lanes |= n), vo(u, n, t), u = o.sibling;
            } else u = o.child;
            if (u !== null) u.return = o;
            else for (u = o; u !== null; ) {
              if (u === t) {
                u = null;
                break;
              }
              if (o = u.sibling, o !== null) {
                o.return = u.return, u = o;
                break;
              }
              u = u.return;
            }
            o = u;
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
  function pd(e, t, n, r) {
    this.tag = e, this.key = n, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = r, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function zt(e, t, n, r) {
    return new pd(e, t, n, r);
  }
  function ns(e) {
    return e = e.prototype, !(!e || !e.isReactComponent);
  }
  function hd(e) {
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
  function pl(e, t, n, r, i, o) {
    var u = 2;
    if (r = e, typeof e == "function") ns(e) && (u = 1);
    else if (typeof e == "string") u = 5;
    else e: switch (e) {
      case Ge:
        return Kn(n.children, i, o, t);
      case Oe:
        u = 8, i |= 8;
        break;
      case pt:
        return e = zt(12, n, t, i | 2), e.elementType = pt, e.lanes = o, e;
      case it:
        return e = zt(13, n, t, i), e.elementType = it, e.lanes = o, e;
      case Ve:
        return e = zt(19, n, t, i), e.elementType = Ve, e.lanes = o, e;
      case ye:
        return hl(n, i, o, t);
      default:
        if (typeof e == "object" && e !== null) switch (e.$$typeof) {
          case Fe:
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
          case fe:
            u = 16, r = null;
            break e;
        }
        throw Error(s(130, e == null ? e : typeof e, ""));
    }
    return t = zt(u, n, t, i), t.elementType = e, t.type = r, t.lanes = o, t;
  }
  function Kn(e, t, n, r) {
    return e = zt(7, e, r, t), e.lanes = n, e;
  }
  function hl(e, t, n, r) {
    return e = zt(22, e, r, t), e.elementType = ye, e.lanes = n, e.stateNode = { isHidden: !1 }, e;
  }
  function rs(e, t, n) {
    return e = zt(6, e, null, t), e.lanes = n, e;
  }
  function is(e, t, n) {
    return t = zt(4, e.children !== null ? e.children : [], e.key, t), t.lanes = n, t.stateNode = { containerInfo: e.containerInfo, pendingChildren: null, implementation: e.implementation }, t;
  }
  function md(e, t, n, r, i) {
    this.tag = t, this.containerInfo = e, this.finishedWork = this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.pendingContext = this.context = null, this.callbackPriority = 0, this.eventTimes = Dl(0), this.expirationTimes = Dl(-1), this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Dl(0), this.identifierPrefix = r, this.onRecoverableError = i, this.mutableSourceEagerHydrationData = null;
  }
  function ls(e, t, n, r, i, o, u, f, d) {
    return e = new md(e, t, n, f, d), t === 1 ? (t = 1, o === !0 && (t |= 8)) : t = 0, o = zt(3, null, null, t), e.current = o, o.stateNode = e, o.memoizedState = { element: r, isDehydrated: n, cache: null, transitions: null, pendingSuspenseBoundaries: null }, go(o), e;
  }
  function vd(e, t, n) {
    var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return { $$typeof: ke, key: r == null ? null : "" + r, children: e, containerInfo: t, implementation: n };
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
  function Ka(e, t, n, r, i, o, u, f, d) {
    return e = ls(n, r, !0, e, i, o, u, f, d), e.context = Xa(null), n = e.current, r = dt(), i = Pn(n), o = tn(r, i), o.callback = t ?? null, xn(n, o, i), e.current.lanes = i, zr(e, i, r), wt(e, r), e;
  }
  function ml(e, t, n, r) {
    var i = t.current, o = dt(), u = Pn(i);
    return n = Xa(n), t.context === null ? t.context = n : t.pendingContext = n, t = tn(o, u), t.payload = { element: e }, r = r === void 0 ? null : r, r !== null && (t.callback = r), e = xn(i, t, u), e !== null && ($t(e, i, u, o), Xi(e, i, u)), u;
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
  function yd() {
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
  function gd(e, t, n, r, i) {
    if (i) {
      if (typeof r == "function") {
        var o = r;
        r = function() {
          var g = vl(u);
          o.call(g);
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
    var o = n._reactRootContainer;
    if (o) {
      var u = o;
      if (typeof i == "function") {
        var f = i;
        i = function() {
          var d = vl(u);
          f.call(d);
        };
      }
      ml(t, u, e, i);
    } else u = gd(n, t, e, i, r);
    return vl(u);
  }
  Ds = function(e) {
    switch (e.tag) {
      case 3:
        var t = e.stateNode;
        if (t.current.memoizedState.isDehydrated) {
          var n = Dr(t.pendingLanes);
          n !== 0 && (zl(t, n | 1), wt(t, Ue()), (oe & 6) === 0 && (Sr = Ue() + 500, Sn()));
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
      var t = Pn(e), n = en(e, t);
      if (n !== null) {
        var r = dt();
        $t(n, e, t, r);
      }
      os(e, t);
    }
  }, Ls = function() {
    return pe;
  }, Ms = function(e, t) {
    var n = pe;
    try {
      return pe = e, t();
    } finally {
      pe = n;
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
        ne(e, n);
        break;
      case "select":
        t = n.value, t != null && sn(e, !!n.multiple, t, !1);
    }
  }, di = bo, pi = Wn;
  var wd = { usingClientEntryPoint: !1, Events: [Qr, ur, Ai, Mt, Zn, bo] }, ui = { findFiberByHostInstance: An, bundleType: 0, version: "18.3.1", rendererPackageName: "react-dom" }, _d = { bundleType: ui.bundleType, version: ui.version, rendererPackageName: ui.rendererPackageName, rendererConfig: ui.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setErrorHandler: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: Ie.ReactCurrentDispatcher, findHostInstanceByFiber: function(e) {
    return e = ks(e), e === null ? null : e.stateNode;
  }, findFiberByHostInstance: ui.findFiberByHostInstance || yd, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null, reconcilerVersion: "18.3.1-next-f1338f8080-20240426" };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var _l = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!_l.isDisabled && _l.supportsFiber) try {
      yi = _l.inject(_d), Ht = _l;
    } catch {
    }
  }
  return _t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = wd, _t.createPortal = function(e, t) {
    var n = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!us(t)) throw Error(s(200));
    return vd(e, t, null, n);
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
    var r = n != null && n.hydratedSources || null, i = !1, o = "", u = Ga;
    if (n != null && (n.unstable_strictMode === !0 && (i = !0), n.identifierPrefix !== void 0 && (o = n.identifierPrefix), n.onRecoverableError !== void 0 && (u = n.onRecoverableError)), t = Ka(t, null, e, 1, n ?? null, i, !1, o, u), e[qt] = t.current, Yr(e), r) for (e = 0; e < r.length; e++) n = r[e], i = n._getVersion, i = i(n._source), t.mutableSourceEagerHydrationData == null ? t.mutableSourceEagerHydrationData = [n, i] : t.mutableSourceEagerHydrationData.push(
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
      } catch (l) {
        console.error(l);
      }
  }
  return a(), fs.exports = Td(), fs.exports;
}
var rc;
function Rd() {
  if (rc) return Sl;
  rc = 1;
  var a = Pd();
  return Sl.createRoot = a.createRoot, Sl.hydrateRoot = a.hydrateRoot, Sl;
}
var Nd = Rd(), hs = { exports: {} }, ai = {};
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
function Dd() {
  if (ic) return ai;
  ic = 1;
  var a = gs(), l = Symbol.for("react.element"), s = Symbol.for("react.fragment"), c = Object.prototype.hasOwnProperty, m = a.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, w = { key: !0, ref: !0, __self: !0, __source: !0 };
  function T(P, D, U) {
    var z, W = {}, $ = null, A = null;
    U !== void 0 && ($ = "" + U), D.key !== void 0 && ($ = "" + D.key), D.ref !== void 0 && (A = D.ref);
    for (z in D) c.call(D, z) && !w.hasOwnProperty(z) && (W[z] = D[z]);
    if (P && P.defaultProps) for (z in D = P.defaultProps, D) W[z] === void 0 && (W[z] = D[z]);
    return { $$typeof: l, type: P, key: $, ref: A, props: W, _owner: m.current };
  }
  return ai.Fragment = s, ai.jsx = T, ai.jsxs = T, ai;
}
var lc;
function zd() {
  return lc || (lc = 1, hs.exports = Dd()), hs.exports;
}
var at = zd();
function Ld(a, l, s) {
  return Math.max(l, Math.min(a, s));
}
const Te = {
  toVector(a, l) {
    return a === void 0 && (a = l), Array.isArray(a) ? a : [a, a];
  },
  add(a, l) {
    return [a[0] + l[0], a[1] + l[1]];
  },
  sub(a, l) {
    return [a[0] - l[0], a[1] - l[1]];
  },
  addTo(a, l) {
    a[0] += l[0], a[1] += l[1];
  },
  subTo(a, l) {
    a[0] -= l[0], a[1] -= l[1];
  }
};
function oc(a, l, s) {
  return l === 0 || Math.abs(l) === 1 / 0 ? Math.pow(a, s * 5) : a * l * s / (l + s * a);
}
function sc(a, l, s, c = 0.15) {
  return c === 0 ? Ld(a, l, s) : a < l ? -oc(l - a, s - l, c) + l : a > s ? +oc(a - s, s - l, c) + s : a;
}
function Md(a, [l, s], [c, m]) {
  const [[w, T], [P, D]] = a;
  return [sc(l, w, T, c), sc(s, P, D, m)];
}
function Id(a, l) {
  if (typeof a != "object" || a === null) return a;
  var s = a[Symbol.toPrimitive];
  if (s !== void 0) {
    var c = s.call(a, l);
    if (typeof c != "object") return c;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (l === "string" ? String : Number)(a);
}
function Od(a) {
  var l = Id(a, "string");
  return typeof l == "symbol" ? l : String(l);
}
function Be(a, l, s) {
  return l = Od(l), l in a ? Object.defineProperty(a, l, {
    value: s,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : a[l] = s, a;
}
function uc(a, l) {
  var s = Object.keys(a);
  if (Object.getOwnPropertySymbols) {
    var c = Object.getOwnPropertySymbols(a);
    l && (c = c.filter(function(m) {
      return Object.getOwnPropertyDescriptor(a, m).enumerable;
    })), s.push.apply(s, c);
  }
  return s;
}
function Le(a) {
  for (var l = 1; l < arguments.length; l++) {
    var s = arguments[l] != null ? arguments[l] : {};
    l % 2 ? uc(Object(s), !0).forEach(function(c) {
      Be(a, c, s[c]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(a, Object.getOwnPropertyDescriptors(s)) : uc(Object(s)).forEach(function(c) {
      Object.defineProperty(a, c, Object.getOwnPropertyDescriptor(s, c));
    });
  }
  return a;
}
const kc = {
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
const Ad = ["enter", "leave"];
function jd(a = !1, l) {
  return a && !Ad.includes(l);
}
function Fd(a, l = "", s = !1) {
  const c = kc[a], m = c && c[l] || l;
  return "on" + ac(a) + ac(m) + (jd(s, m) ? "Capture" : "");
}
const Ud = ["gotpointercapture", "lostpointercapture"];
function $d(a) {
  let l = a.substring(2).toLowerCase();
  const s = !!~l.indexOf("passive");
  s && (l = l.replace("passive", ""));
  const c = Ud.includes(l) ? "capturecapture" : "capture", m = !!~l.indexOf(c);
  return m && (l = l.replace("capture", "")), {
    device: l,
    capture: m,
    passive: s
  };
}
function Vd(a, l = "") {
  const s = kc[a], c = s && s[l] || l;
  return a + c;
}
function Cl(a) {
  return "touches" in a;
}
function xc(a) {
  return Cl(a) ? "touch" : "pointerType" in a ? a.pointerType : "mouse";
}
function Hd(a) {
  return Array.from(a.touches).filter((l) => {
    var s, c;
    return l.target === a.currentTarget || ((s = a.currentTarget) === null || s === void 0 || (c = s.contains) === null || c === void 0 ? void 0 : c.call(s, l.target));
  });
}
function Bd(a) {
  return a.type === "touchend" || a.type === "touchcancel" ? a.changedTouches : a.targetTouches;
}
function Ec(a) {
  return Cl(a) ? Bd(a)[0] : a;
}
function vs(a, l) {
  try {
    const s = l.clientX - a.clientX, c = l.clientY - a.clientY, m = (l.clientX + a.clientX) / 2, w = (l.clientY + a.clientY) / 2, T = Math.hypot(s, c);
    return {
      angle: -(Math.atan2(s, c) * 180) / Math.PI,
      distance: T,
      origin: [m, w]
    };
  } catch {
  }
  return null;
}
function Wd(a) {
  return Hd(a).map((l) => l.identifier);
}
function cc(a, l) {
  const [s, c] = Array.from(a.touches).filter((m) => l.includes(m.identifier));
  return vs(s, c);
}
function ms(a) {
  const l = Ec(a);
  return Cl(a) ? l.identifier : l.pointerId;
}
function Cr(a) {
  const l = Ec(a);
  return [l.clientX, l.clientY];
}
const fc = 40, dc = 800;
function Cc(a) {
  let {
    deltaX: l,
    deltaY: s,
    deltaMode: c
  } = a;
  return c === 1 ? (l *= fc, s *= fc) : c === 2 && (l *= dc, s *= dc), [l, s];
}
function Yd(a) {
  var l, s;
  const {
    scrollX: c,
    scrollY: m,
    scrollLeft: w,
    scrollTop: T
  } = a.currentTarget;
  return [(l = c ?? w) !== null && l !== void 0 ? l : 0, (s = m ?? T) !== null && s !== void 0 ? s : 0];
}
function Xd(a) {
  const l = {};
  if ("buttons" in a && (l.buttons = a.buttons), "shiftKey" in a) {
    const {
      shiftKey: s,
      altKey: c,
      metaKey: m,
      ctrlKey: w
    } = a;
    Object.assign(l, {
      shiftKey: s,
      altKey: c,
      metaKey: m,
      ctrlKey: w
    });
  }
  return l;
}
function El(a, ...l) {
  return typeof a == "function" ? a(...l) : a;
}
function Kd() {
}
function Qd(...a) {
  return a.length === 0 ? Kd : a.length === 1 ? a[0] : function() {
    let l;
    for (const s of a)
      l = s.apply(this, arguments) || l;
    return l;
  };
}
function pc(a, l) {
  return Object.assign({}, l, a || {});
}
const Gd = 32;
class Tc {
  constructor(l, s, c) {
    this.ctrl = l, this.args = s, this.key = c, this.state || (this.state = {}, this.computeValues([0, 0]), this.computeInitial(), this.init && this.init(), this.reset());
  }
  get state() {
    return this.ctrl.state[this.key];
  }
  set state(l) {
    this.ctrl.state[this.key] = l;
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
      state: l,
      shared: s,
      ingKey: c,
      args: m
    } = this;
    s[c] = l._active = l.active = l._blocked = l._force = !1, l._step = [!1, !1], l.intentional = !1, l._movement = [0, 0], l._distance = [0, 0], l._direction = [0, 0], l._delta = [0, 0], l._bounds = [[-1 / 0, 1 / 0], [-1 / 0, 1 / 0]], l.args = m, l.axis = void 0, l.memo = void 0, l.elapsedTime = l.timeDelta = 0, l.direction = [0, 0], l.distance = [0, 0], l.overflow = [0, 0], l._movementBound = [!1, !1], l.velocity = [0, 0], l.movement = [0, 0], l.delta = [0, 0], l.timeStamp = 0;
  }
  start(l) {
    const s = this.state, c = this.config;
    s._active || (this.reset(), this.computeInitial(), s._active = !0, s.target = l.target, s.currentTarget = l.currentTarget, s.lastOffset = c.from ? El(c.from, s) : s.offset, s.offset = s.lastOffset, s.startTime = s.timeStamp = l.timeStamp);
  }
  computeValues(l) {
    const s = this.state;
    s._values = l, s.values = this.config.transform(l);
  }
  computeInitial() {
    const l = this.state;
    l._initial = l._values, l.initial = l.values;
  }
  compute(l) {
    const {
      state: s,
      config: c,
      shared: m
    } = this;
    s.args = this.args;
    let w = 0;
    if (l && (s.event = l, c.preventDefault && l.cancelable && s.event.preventDefault(), s.type = l.type, m.touches = this.ctrl.pointerIds.size || this.ctrl.touchIds.size, m.locked = !!document.pointerLockElement, Object.assign(m, Xd(l)), m.down = m.pressed = m.buttons % 2 === 1 || m.touches > 0, w = l.timeStamp - s.timeStamp, s.timeStamp = l.timeStamp, s.elapsedTime = s.timeStamp - s.startTime), s._active) {
      const ke = s._delta.map(Math.abs);
      Te.addTo(s._distance, ke);
    }
    this.axisIntent && this.axisIntent(l);
    const [T, P] = s._movement, [D, U] = c.threshold, {
      _step: z,
      values: W
    } = s;
    if (c.hasCustomTransform ? (z[0] === !1 && (z[0] = Math.abs(T) >= D && W[0]), z[1] === !1 && (z[1] = Math.abs(P) >= U && W[1])) : (z[0] === !1 && (z[0] = Math.abs(T) >= D && Math.sign(T) * D), z[1] === !1 && (z[1] = Math.abs(P) >= U && Math.sign(P) * U)), s.intentional = z[0] !== !1 || z[1] !== !1, !s.intentional) return;
    const $ = [0, 0];
    if (c.hasCustomTransform) {
      const [ke, Ge] = W;
      $[0] = z[0] !== !1 ? ke - z[0] : 0, $[1] = z[1] !== !1 ? Ge - z[1] : 0;
    } else
      $[0] = z[0] !== !1 ? T - z[0] : 0, $[1] = z[1] !== !1 ? P - z[1] : 0;
    this.restrictToAxis && !s._blocked && this.restrictToAxis($);
    const A = s.offset, X = s._active && !s._blocked || s.active;
    X && (s.first = s._active && !s.active, s.last = !s._active && s.active, s.active = m[this.ingKey] = s._active, l && (s.first && ("bounds" in c && (s._bounds = El(c.bounds, s)), this.setup && this.setup()), s.movement = $, this.computeOffset()));
    const [K, Q] = s.offset, [[Se, Me], [We, Ie]] = s._bounds;
    s.overflow = [K < Se ? -1 : K > Me ? 1 : 0, Q < We ? -1 : Q > Ie ? 1 : 0], s._movementBound[0] = s.overflow[0] ? s._movementBound[0] === !1 ? s._movement[0] : s._movementBound[0] : !1, s._movementBound[1] = s.overflow[1] ? s._movementBound[1] === !1 ? s._movement[1] : s._movementBound[1] : !1;
    const Qe = s._active ? c.rubberband || [0, 0] : [0, 0];
    if (s.offset = Md(s._bounds, s.offset, Qe), s.delta = Te.sub(s.offset, A), this.computeMovement(), X && (!s.last || w > Gd)) {
      s.delta = Te.sub(s.offset, A);
      const ke = s.delta.map(Math.abs);
      Te.addTo(s.distance, ke), s.direction = s.delta.map(Math.sign), s._direction = s._delta.map(Math.sign), !s.first && w > 0 && (s.velocity = [ke[0] / w, ke[1] / w], s.timeDelta = w);
    }
  }
  emit() {
    const l = this.state, s = this.shared, c = this.config;
    if (l._active || this.clean(), (l._blocked || !l.intentional) && !l._force && !c.triggerAllEvents) return;
    const m = this.handler(Le(Le(Le({}, s), l), {}, {
      [this.aliasKey]: l.values
    }));
    m !== void 0 && (l.memo = m);
  }
  clean() {
    this.eventStore.clean(), this.timeoutStore.clean();
  }
}
function qd([a, l], s) {
  const c = Math.abs(a), m = Math.abs(l);
  if (c > m && c > s)
    return "x";
  if (m > c && m > s)
    return "y";
}
class ci extends Tc {
  constructor(...l) {
    super(...l), Be(this, "aliasKey", "xy");
  }
  reset() {
    super.reset(), this.state.axis = void 0;
  }
  init() {
    this.state.offset = [0, 0], this.state.lastOffset = [0, 0];
  }
  computeOffset() {
    this.state.offset = Te.add(this.state.lastOffset, this.state.movement);
  }
  computeMovement() {
    this.state.movement = Te.sub(this.state.offset, this.state.lastOffset);
  }
  axisIntent(l) {
    const s = this.state, c = this.config;
    if (!s.axis && l) {
      const m = typeof c.axisThreshold == "object" ? c.axisThreshold[xc(l)] : c.axisThreshold;
      s.axis = qd(s._movement, m);
    }
    s._blocked = (c.lockDirection || !!c.axis) && !s.axis || !!c.axis && c.axis !== s.axis;
  }
  restrictToAxis(l) {
    if (this.config.axis || this.config.lockDirection)
      switch (this.state.axis) {
        case "x":
          l[1] = 0;
          break;
        case "y":
          l[0] = 0;
          break;
      }
  }
}
const Zd = (a) => a, hc = 0.15, Pc = {
  enabled(a = !0) {
    return a;
  },
  eventOptions(a, l, s) {
    return Le(Le({}, s.shared.eventOptions), a);
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
        return Te.toVector(a);
    }
  },
  from(a) {
    if (typeof a == "function") return a;
    if (a != null) return Te.toVector(a);
  },
  transform(a, l, s) {
    const c = a || s.shared.transform;
    return this.hasCustomTransform = !!c, c || Zd;
  },
  threshold(a) {
    return Te.toVector(a, 0);
  }
}, Jd = 0, Gn = Le(Le({}, Pc), {}, {
  axis(a, l, {
    axis: s
  }) {
    if (this.lockDirection = s === "lock", !this.lockDirection) return s;
  },
  axisThreshold(a = Jd) {
    return a;
  },
  bounds(a = {}) {
    if (typeof a == "function")
      return (w) => Gn.bounds(a(w));
    if ("current" in a)
      return () => a.current;
    if (typeof HTMLElement == "function" && a instanceof HTMLElement)
      return a;
    const {
      left: l = -1 / 0,
      right: s = 1 / 0,
      top: c = -1 / 0,
      bottom: m = 1 / 0
    } = a;
    return [[l, s], [c, m]];
  }
}), mc = {
  ArrowRight: (a, l = 1) => [a * l, 0],
  ArrowLeft: (a, l = 1) => [-1 * a * l, 0],
  ArrowUp: (a, l = 1) => [0, -1 * a * l],
  ArrowDown: (a, l = 1) => [0, a * l]
};
class bd extends ci {
  constructor(...l) {
    super(...l), Be(this, "ingKey", "dragging");
  }
  reset() {
    super.reset();
    const l = this.state;
    l._pointerId = void 0, l._pointerActive = !1, l._keyboardActive = !1, l._preventScroll = !1, l._delayed = !1, l.swipe = [0, 0], l.tap = !1, l.canceled = !1, l.cancel = this.cancel.bind(this);
  }
  setup() {
    const l = this.state;
    if (l._bounds instanceof HTMLElement) {
      const s = l._bounds.getBoundingClientRect(), c = l.currentTarget.getBoundingClientRect(), m = {
        left: s.left - c.left + l.offset[0],
        right: s.right - c.right + l.offset[0],
        top: s.top - c.top + l.offset[1],
        bottom: s.bottom - c.bottom + l.offset[1]
      };
      l._bounds = Gn.bounds(m);
    }
  }
  cancel() {
    const l = this.state;
    l.canceled || (l.canceled = !0, l._active = !1, setTimeout(() => {
      this.compute(), this.emit();
    }, 0));
  }
  setActive() {
    this.state._active = this.state._pointerActive || this.state._keyboardActive;
  }
  clean() {
    this.pointerClean(), this.state._pointerActive = !1, this.state._keyboardActive = !1, super.clean();
  }
  pointerDown(l) {
    const s = this.config, c = this.state;
    if (l.buttons != null && (Array.isArray(s.pointerButtons) ? !s.pointerButtons.includes(l.buttons) : s.pointerButtons !== -1 && s.pointerButtons !== l.buttons)) return;
    const m = this.ctrl.setEventIds(l);
    s.pointerCapture && l.target.setPointerCapture(l.pointerId), !(m && m.size > 1 && c._pointerActive) && (this.start(l), this.setupPointer(l), c._pointerId = ms(l), c._pointerActive = !0, this.computeValues(Cr(l)), this.computeInitial(), s.preventScrollAxis && xc(l) !== "mouse" ? (c._active = !1, this.setupScrollPrevention(l)) : s.delay > 0 ? (this.setupDelayTrigger(l), s.triggerAllEvents && (this.compute(l), this.emit())) : this.startPointerDrag(l));
  }
  startPointerDrag(l) {
    const s = this.state;
    s._active = !0, s._preventScroll = !0, s._delayed = !1, this.compute(l), this.emit();
  }
  pointerMove(l) {
    const s = this.state, c = this.config;
    if (!s._pointerActive) return;
    const m = ms(l);
    if (s._pointerId !== void 0 && m !== s._pointerId) return;
    const w = Cr(l);
    if (document.pointerLockElement === l.target ? s._delta = [l.movementX, l.movementY] : (s._delta = Te.sub(w, s._values), this.computeValues(w)), Te.addTo(s._movement, s._delta), this.compute(l), s._delayed && s.intentional) {
      this.timeoutStore.remove("dragDelay"), s.active = !1, this.startPointerDrag(l);
      return;
    }
    if (c.preventScrollAxis && !s._preventScroll)
      if (s.axis)
        if (s.axis === c.preventScrollAxis || c.preventScrollAxis === "xy") {
          s._active = !1, this.clean();
          return;
        } else {
          this.timeoutStore.remove("startPointerDrag"), this.startPointerDrag(l);
          return;
        }
      else
        return;
    this.emit();
  }
  pointerUp(l) {
    this.ctrl.setEventIds(l);
    try {
      this.config.pointerCapture && l.target.hasPointerCapture(l.pointerId) && l.target.releasePointerCapture(l.pointerId);
    } catch {
    }
    const s = this.state, c = this.config;
    if (!s._active || !s._pointerActive) return;
    const m = ms(l);
    if (s._pointerId !== void 0 && m !== s._pointerId) return;
    this.state._pointerActive = !1, this.setActive(), this.compute(l);
    const [w, T] = s._distance;
    if (s.tap = w <= c.tapsThreshold && T <= c.tapsThreshold, s.tap && c.filterTaps)
      s._force = !0;
    else {
      const [P, D] = s._delta, [U, z] = s._movement, [W, $] = c.swipe.velocity, [A, X] = c.swipe.distance, K = c.swipe.duration;
      if (s.elapsedTime < K) {
        const Q = Math.abs(P / s.timeDelta), Se = Math.abs(D / s.timeDelta);
        Q > W && Math.abs(U) > A && (s.swipe[0] = Math.sign(P)), Se > $ && Math.abs(z) > X && (s.swipe[1] = Math.sign(D));
      }
    }
    this.emit();
  }
  pointerClick(l) {
    !this.state.tap && l.detail > 0 && (l.preventDefault(), l.stopPropagation());
  }
  setupPointer(l) {
    const s = this.config, c = s.device;
    s.pointerLock && l.currentTarget.requestPointerLock(), s.pointerCapture || (this.eventStore.add(this.sharedConfig.window, c, "change", this.pointerMove.bind(this)), this.eventStore.add(this.sharedConfig.window, c, "end", this.pointerUp.bind(this)), this.eventStore.add(this.sharedConfig.window, c, "cancel", this.pointerUp.bind(this)));
  }
  pointerClean() {
    this.config.pointerLock && document.pointerLockElement === this.state.currentTarget && document.exitPointerLock();
  }
  preventScroll(l) {
    this.state._preventScroll && l.cancelable && l.preventDefault();
  }
  setupScrollPrevention(l) {
    this.state._preventScroll = !1, ep(l);
    const s = this.eventStore.add(this.sharedConfig.window, "touch", "change", this.preventScroll.bind(this), {
      passive: !1
    });
    this.eventStore.add(this.sharedConfig.window, "touch", "end", s), this.eventStore.add(this.sharedConfig.window, "touch", "cancel", s), this.timeoutStore.add("startPointerDrag", this.startPointerDrag.bind(this), this.config.preventScrollDelay, l);
  }
  setupDelayTrigger(l) {
    this.state._delayed = !0, this.timeoutStore.add("dragDelay", () => {
      this.state._step = [0, 0], this.startPointerDrag(l);
    }, this.config.delay);
  }
  keyDown(l) {
    const s = mc[l.key];
    if (s) {
      const c = this.state, m = l.shiftKey ? 10 : l.altKey ? 0.1 : 1;
      this.start(l), c._delta = s(this.config.keyboardDisplacement, m), c._keyboardActive = !0, Te.addTo(c._movement, c._delta), this.compute(l), this.emit();
    }
  }
  keyUp(l) {
    l.key in mc && (this.state._keyboardActive = !1, this.setActive(), this.compute(l), this.emit());
  }
  bind(l) {
    const s = this.config.device;
    l(s, "start", this.pointerDown.bind(this)), this.config.pointerCapture && (l(s, "change", this.pointerMove.bind(this)), l(s, "end", this.pointerUp.bind(this)), l(s, "cancel", this.pointerUp.bind(this)), l("lostPointerCapture", "", this.pointerUp.bind(this))), this.config.keys && (l("key", "down", this.keyDown.bind(this)), l("key", "up", this.keyUp.bind(this))), this.config.filterTaps && l("click", "", this.pointerClick.bind(this), {
      capture: !0,
      passive: !1
    });
  }
}
function ep(a) {
  "persist" in a && typeof a.persist == "function" && a.persist();
}
const fi = typeof window < "u" && window.document && window.document.createElement;
function Rc() {
  return fi && "ontouchstart" in window;
}
function tp() {
  return Rc() || fi && window.navigator.maxTouchPoints > 1;
}
function np() {
  return fi && "onpointerdown" in window;
}
function rp() {
  return fi && "exitPointerLock" in window.document;
}
function ip() {
  try {
    return "constructor" in GestureEvent;
  } catch {
    return !1;
  }
}
const Lt = {
  isBrowser: fi,
  gesture: ip(),
  touch: Rc(),
  touchscreen: tp(),
  pointer: np(),
  pointerLock: rp()
}, lp = 250, op = 180, sp = 0.5, up = 50, ap = 250, cp = 10, vc = {
  mouse: 0,
  touch: 0,
  pen: 8
}, fp = Le(Le({}, Gn), {}, {
  device(a, l, {
    pointer: {
      touch: s = !1,
      lock: c = !1,
      mouse: m = !1
    } = {}
  }) {
    return this.pointerLock = c && Lt.pointerLock, Lt.touch && s ? "touch" : this.pointerLock ? "mouse" : Lt.pointer && !m ? "pointer" : Lt.touch ? "touch" : "mouse";
  },
  preventScrollAxis(a, l, {
    preventScroll: s
  }) {
    if (this.preventScrollDelay = typeof s == "number" ? s : s || s === void 0 && a ? lp : void 0, !(!Lt.touchscreen || s === !1))
      return a || (s !== void 0 ? "y" : void 0);
  },
  pointerCapture(a, l, {
    pointer: {
      capture: s = !0,
      buttons: c = 1,
      keys: m = !0
    } = {}
  }) {
    return this.pointerButtons = c, this.keys = m, !this.pointerLock && this.device === "pointer" && s;
  },
  threshold(a, l, {
    filterTaps: s = !1,
    tapsThreshold: c = 3,
    axis: m = void 0
  }) {
    const w = Te.toVector(a, s ? c : m ? 1 : 0);
    return this.filterTaps = s, this.tapsThreshold = c, w;
  },
  swipe({
    velocity: a = sp,
    distance: l = up,
    duration: s = ap
  } = {}) {
    return {
      velocity: this.transform(Te.toVector(a)),
      distance: this.transform(Te.toVector(l)),
      duration: s
    };
  },
  delay(a = 0) {
    switch (a) {
      case !0:
        return op;
      case !1:
        return 0;
      default:
        return a;
    }
  },
  axisThreshold(a) {
    return a ? Le(Le({}, vc), a) : vc;
  },
  keyboardDisplacement(a = cp) {
    return a;
  }
});
function Nc(a) {
  const [l, s] = a.overflow, [c, m] = a._delta, [w, T] = a._direction;
  (l < 0 && c > 0 && w < 0 || l > 0 && c < 0 && w > 0) && (a._movement[0] = a._movementBound[0]), (s < 0 && m > 0 && T < 0 || s > 0 && m < 0 && T > 0) && (a._movement[1] = a._movementBound[1]);
}
const dp = 30, pp = 100;
class hp extends Tc {
  constructor(...l) {
    super(...l), Be(this, "ingKey", "pinching"), Be(this, "aliasKey", "da");
  }
  init() {
    this.state.offset = [1, 0], this.state.lastOffset = [1, 0], this.state._pointerEvents = /* @__PURE__ */ new Map();
  }
  reset() {
    super.reset();
    const l = this.state;
    l._touchIds = [], l.canceled = !1, l.cancel = this.cancel.bind(this), l.turns = 0;
  }
  computeOffset() {
    const {
      type: l,
      movement: s,
      lastOffset: c
    } = this.state;
    l === "wheel" ? this.state.offset = Te.add(s, c) : this.state.offset = [(1 + s[0]) * c[0], s[1] + c[1]];
  }
  computeMovement() {
    const {
      offset: l,
      lastOffset: s
    } = this.state;
    this.state.movement = [l[0] / s[0], l[1] - s[1]];
  }
  axisIntent() {
    const l = this.state, [s, c] = l._movement;
    if (!l.axis) {
      const m = Math.abs(s) * dp - Math.abs(c);
      m < 0 ? l.axis = "angle" : m > 0 && (l.axis = "scale");
    }
  }
  restrictToAxis(l) {
    this.config.lockDirection && (this.state.axis === "scale" ? l[1] = 0 : this.state.axis === "angle" && (l[0] = 0));
  }
  cancel() {
    const l = this.state;
    l.canceled || setTimeout(() => {
      l.canceled = !0, l._active = !1, this.compute(), this.emit();
    }, 0);
  }
  touchStart(l) {
    this.ctrl.setEventIds(l);
    const s = this.state, c = this.ctrl.touchIds;
    if (s._active && s._touchIds.every((w) => c.has(w)) || c.size < 2) return;
    this.start(l), s._touchIds = Array.from(c).slice(0, 2);
    const m = cc(l, s._touchIds);
    m && this.pinchStart(l, m);
  }
  pointerStart(l) {
    if (l.buttons != null && l.buttons % 2 !== 1) return;
    this.ctrl.setEventIds(l), l.target.setPointerCapture(l.pointerId);
    const s = this.state, c = s._pointerEvents, m = this.ctrl.pointerIds;
    if (s._active && Array.from(c.keys()).every((T) => m.has(T)) || (c.size < 2 && c.set(l.pointerId, l), s._pointerEvents.size < 2)) return;
    this.start(l);
    const w = vs(...Array.from(c.values()));
    w && this.pinchStart(l, w);
  }
  pinchStart(l, s) {
    const c = this.state;
    c.origin = s.origin, this.computeValues([s.distance, s.angle]), this.computeInitial(), this.compute(l), this.emit();
  }
  touchMove(l) {
    if (!this.state._active) return;
    const s = cc(l, this.state._touchIds);
    s && this.pinchMove(l, s);
  }
  pointerMove(l) {
    const s = this.state._pointerEvents;
    if (s.has(l.pointerId) && s.set(l.pointerId, l), !this.state._active) return;
    const c = vs(...Array.from(s.values()));
    c && this.pinchMove(l, c);
  }
  pinchMove(l, s) {
    const c = this.state, m = c._values[1], w = s.angle - m;
    let T = 0;
    Math.abs(w) > 270 && (T += Math.sign(w)), this.computeValues([s.distance, s.angle - 360 * T]), c.origin = s.origin, c.turns = T, c._movement = [c._values[0] / c._initial[0] - 1, c._values[1] - c._initial[1]], this.compute(l), this.emit();
  }
  touchEnd(l) {
    this.ctrl.setEventIds(l), this.state._active && this.state._touchIds.some((s) => !this.ctrl.touchIds.has(s)) && (this.state._active = !1, this.compute(l), this.emit());
  }
  pointerEnd(l) {
    const s = this.state;
    this.ctrl.setEventIds(l);
    try {
      l.target.releasePointerCapture(l.pointerId);
    } catch {
    }
    s._pointerEvents.has(l.pointerId) && s._pointerEvents.delete(l.pointerId), s._active && s._pointerEvents.size < 2 && (s._active = !1, this.compute(l), this.emit());
  }
  gestureStart(l) {
    l.cancelable && l.preventDefault();
    const s = this.state;
    s._active || (this.start(l), this.computeValues([l.scale, l.rotation]), s.origin = [l.clientX, l.clientY], this.compute(l), this.emit());
  }
  gestureMove(l) {
    if (l.cancelable && l.preventDefault(), !this.state._active) return;
    const s = this.state;
    this.computeValues([l.scale, l.rotation]), s.origin = [l.clientX, l.clientY];
    const c = s._movement;
    s._movement = [l.scale - 1, l.rotation], s._delta = Te.sub(s._movement, c), this.compute(l), this.emit();
  }
  gestureEnd(l) {
    this.state._active && (this.state._active = !1, this.compute(l), this.emit());
  }
  wheel(l) {
    const s = this.config.modifierKey;
    s && (Array.isArray(s) ? !s.find((c) => l[c]) : !l[s]) || (this.state._active ? this.wheelChange(l) : this.wheelStart(l), this.timeoutStore.add("wheelEnd", this.wheelEnd.bind(this)));
  }
  wheelStart(l) {
    this.start(l), this.wheelChange(l);
  }
  wheelChange(l) {
    "uv" in l || l.cancelable && l.preventDefault();
    const c = this.state;
    c._delta = [-Cc(l)[1] / pp * c.offset[0], 0], Te.addTo(c._movement, c._delta), Nc(c), this.state.origin = [l.clientX, l.clientY], this.compute(l), this.emit();
  }
  wheelEnd() {
    this.state._active && (this.state._active = !1, this.compute(), this.emit());
  }
  bind(l) {
    const s = this.config.device;
    s && (l(s, "start", this[s + "Start"].bind(this)), l(s, "change", this[s + "Move"].bind(this)), l(s, "end", this[s + "End"].bind(this)), l(s, "cancel", this[s + "End"].bind(this)), l("lostPointerCapture", "", this[s + "End"].bind(this))), this.config.pinchOnWheel && l("wheel", "", this.wheel.bind(this), {
      passive: !1
    });
  }
}
const mp = Le(Le({}, Pc), {}, {
  device(a, l, {
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
  bounds(a, l, {
    scaleBounds: s = {},
    angleBounds: c = {}
  }) {
    const m = (T) => {
      const P = pc(El(s, T), {
        min: -1 / 0,
        max: 1 / 0
      });
      return [P.min, P.max];
    }, w = (T) => {
      const P = pc(El(c, T), {
        min: -1 / 0,
        max: 1 / 0
      });
      return [P.min, P.max];
    };
    return typeof s != "function" && typeof c != "function" ? [m(), w()] : (T) => [m(T), w(T)];
  },
  threshold(a, l, s) {
    return this.lockDirection = s.axis === "lock", Te.toVector(a, this.lockDirection ? [0.1, 3] : 0);
  },
  modifierKey(a) {
    return a === void 0 ? "ctrlKey" : a;
  },
  pinchOnWheel(a = !0) {
    return a;
  }
});
class vp extends ci {
  constructor(...l) {
    super(...l), Be(this, "ingKey", "moving");
  }
  move(l) {
    this.config.mouseOnly && l.pointerType !== "mouse" || (this.state._active ? this.moveChange(l) : this.moveStart(l), this.timeoutStore.add("moveEnd", this.moveEnd.bind(this)));
  }
  moveStart(l) {
    this.start(l), this.computeValues(Cr(l)), this.compute(l), this.computeInitial(), this.emit();
  }
  moveChange(l) {
    if (!this.state._active) return;
    const s = Cr(l), c = this.state;
    c._delta = Te.sub(s, c._values), Te.addTo(c._movement, c._delta), this.computeValues(s), this.compute(l), this.emit();
  }
  moveEnd(l) {
    this.state._active && (this.state._active = !1, this.compute(l), this.emit());
  }
  bind(l) {
    l("pointer", "change", this.move.bind(this)), l("pointer", "leave", this.moveEnd.bind(this));
  }
}
const yp = Le(Le({}, Gn), {}, {
  mouseOnly: (a = !0) => a
});
class gp extends ci {
  constructor(...l) {
    super(...l), Be(this, "ingKey", "scrolling");
  }
  scroll(l) {
    this.state._active || this.start(l), this.scrollChange(l), this.timeoutStore.add("scrollEnd", this.scrollEnd.bind(this));
  }
  scrollChange(l) {
    l.cancelable && l.preventDefault();
    const s = this.state, c = Yd(l);
    s._delta = Te.sub(c, s._values), Te.addTo(s._movement, s._delta), this.computeValues(c), this.compute(l), this.emit();
  }
  scrollEnd() {
    this.state._active && (this.state._active = !1, this.compute(), this.emit());
  }
  bind(l) {
    l("scroll", "", this.scroll.bind(this));
  }
}
const wp = Gn;
class _p extends ci {
  constructor(...l) {
    super(...l), Be(this, "ingKey", "wheeling");
  }
  wheel(l) {
    this.state._active || this.start(l), this.wheelChange(l), this.timeoutStore.add("wheelEnd", this.wheelEnd.bind(this));
  }
  wheelChange(l) {
    const s = this.state;
    s._delta = Cc(l), Te.addTo(s._movement, s._delta), Nc(s), this.compute(l), this.emit();
  }
  wheelEnd() {
    this.state._active && (this.state._active = !1, this.compute(), this.emit());
  }
  bind(l) {
    l("wheel", "", this.wheel.bind(this));
  }
}
const Sp = Gn;
class kp extends ci {
  constructor(...l) {
    super(...l), Be(this, "ingKey", "hovering");
  }
  enter(l) {
    this.config.mouseOnly && l.pointerType !== "mouse" || (this.start(l), this.computeValues(Cr(l)), this.compute(l), this.emit());
  }
  leave(l) {
    if (this.config.mouseOnly && l.pointerType !== "mouse") return;
    const s = this.state;
    if (!s._active) return;
    s._active = !1;
    const c = Cr(l);
    s._movement = s._delta = Te.sub(c, s._values), this.computeValues(c), this.compute(l), s.delta = s.movement, this.emit();
  }
  bind(l) {
    l("pointer", "enter", this.enter.bind(this)), l("pointer", "leave", this.leave.bind(this));
  }
}
const xp = Le(Le({}, Gn), {}, {
  mouseOnly: (a = !0) => a
}), ws = /* @__PURE__ */ new Map(), ys = /* @__PURE__ */ new Map();
function Ep(a) {
  ws.set(a.key, a.engine), ys.set(a.key, a.resolver);
}
const Cp = {
  key: "drag",
  engine: bd,
  resolver: fp
}, Tp = {
  key: "hover",
  engine: kp,
  resolver: xp
}, Pp = {
  key: "move",
  engine: vp,
  resolver: yp
}, Rp = {
  key: "pinch",
  engine: hp,
  resolver: mp
}, Np = {
  key: "scroll",
  engine: gp,
  resolver: wp
}, Dp = {
  key: "wheel",
  engine: _p,
  resolver: Sp
};
function zp(a, l) {
  if (a == null) return {};
  var s = {}, c = Object.keys(a), m, w;
  for (w = 0; w < c.length; w++)
    m = c[w], !(l.indexOf(m) >= 0) && (s[m] = a[m]);
  return s;
}
function Lp(a, l) {
  if (a == null) return {};
  var s = zp(a, l), c, m;
  if (Object.getOwnPropertySymbols) {
    var w = Object.getOwnPropertySymbols(a);
    for (m = 0; m < w.length; m++)
      c = w[m], !(l.indexOf(c) >= 0) && Object.prototype.propertyIsEnumerable.call(a, c) && (s[c] = a[c]);
  }
  return s;
}
const Mp = {
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
    capture: l = !1
  } = {}) {
    return {
      passive: a,
      capture: l
    };
  },
  transform(a) {
    return a;
  }
}, Ip = ["target", "eventOptions", "window", "enabled", "transform"];
function xl(a = {}, l) {
  const s = {};
  for (const [c, m] of Object.entries(l))
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
function Op(a, l, s = {}) {
  const c = a, {
    target: m,
    eventOptions: w,
    window: T,
    enabled: P,
    transform: D
  } = c, U = Lp(c, Ip);
  if (s.shared = xl({
    target: m,
    eventOptions: w,
    window: T,
    enabled: P,
    transform: D
  }, Mp), l) {
    const z = ys.get(l);
    s[l] = xl(Le({
      shared: s.shared
    }, U), z);
  } else
    for (const z in U) {
      const W = ys.get(z);
      W && (s[z] = xl(Le({
        shared: s.shared
      }, U[z]), W));
    }
  return s;
}
class Dc {
  constructor(l, s) {
    Be(this, "_listeners", /* @__PURE__ */ new Set()), this._ctrl = l, this._gestureKey = s;
  }
  add(l, s, c, m, w) {
    const T = this._listeners, P = Vd(s, c), D = this._gestureKey ? this._ctrl.config[this._gestureKey].eventOptions : {}, U = Le(Le({}, D), w);
    l.addEventListener(P, m, U);
    const z = () => {
      l.removeEventListener(P, m, U), T.delete(z);
    };
    return T.add(z), z;
  }
  clean() {
    this._listeners.forEach((l) => l()), this._listeners.clear();
  }
}
class Ap {
  constructor() {
    Be(this, "_timeouts", /* @__PURE__ */ new Map());
  }
  add(l, s, c = 140, ...m) {
    this.remove(l), this._timeouts.set(l, window.setTimeout(s, c, ...m));
  }
  remove(l) {
    const s = this._timeouts.get(l);
    s && window.clearTimeout(s);
  }
  clean() {
    this._timeouts.forEach((l) => void window.clearTimeout(l)), this._timeouts.clear();
  }
}
class jp {
  constructor(l) {
    Be(this, "gestures", /* @__PURE__ */ new Set()), Be(this, "_targetEventStore", new Dc(this)), Be(this, "gestureEventStores", {}), Be(this, "gestureTimeoutStores", {}), Be(this, "handlers", {}), Be(this, "config", {}), Be(this, "pointerIds", /* @__PURE__ */ new Set()), Be(this, "touchIds", /* @__PURE__ */ new Set()), Be(this, "state", {
      shared: {
        shiftKey: !1,
        metaKey: !1,
        ctrlKey: !1,
        altKey: !1
      }
    }), Fp(this, l);
  }
  setEventIds(l) {
    if (Cl(l))
      return this.touchIds = new Set(Wd(l)), this.touchIds;
    if ("pointerId" in l)
      return l.type === "pointerup" || l.type === "pointercancel" ? this.pointerIds.delete(l.pointerId) : l.type === "pointerdown" && this.pointerIds.add(l.pointerId), this.pointerIds;
  }
  applyHandlers(l, s) {
    this.handlers = l, this.nativeHandlers = s;
  }
  applyConfig(l, s) {
    this.config = Op(l, s, this.config);
  }
  clean() {
    this._targetEventStore.clean();
    for (const l of this.gestures)
      this.gestureEventStores[l].clean(), this.gestureTimeoutStores[l].clean();
  }
  effect() {
    return this.config.shared.target && this.bind(), () => this._targetEventStore.clean();
  }
  bind(...l) {
    const s = this.config.shared, c = {};
    let m;
    if (!(s.target && (m = s.target(), !m))) {
      if (s.enabled) {
        for (const T of this.gestures) {
          const P = this.config[T], D = yc(c, P.eventOptions, !!m);
          if (P.enabled) {
            const U = ws.get(T);
            new U(this, l, T).bind(D);
          }
        }
        const w = yc(c, s.eventOptions, !!m);
        for (const T in this.nativeHandlers)
          w(T, "", (P) => this.nativeHandlers[T](Le(Le({}, this.state.shared), {}, {
            event: P,
            args: l
          })), void 0, !0);
      }
      for (const w in c)
        c[w] = Qd(...c[w]);
      if (!m) return c;
      for (const w in c) {
        const {
          device: T,
          capture: P,
          passive: D
        } = $d(w);
        this._targetEventStore.add(m, T, "", c[w], {
          capture: P,
          passive: D
        });
      }
    }
  }
}
function xr(a, l) {
  a.gestures.add(l), a.gestureEventStores[l] = new Dc(a, l), a.gestureTimeoutStores[l] = new Ap();
}
function Fp(a, l) {
  l.drag && xr(a, "drag"), l.wheel && xr(a, "wheel"), l.scroll && xr(a, "scroll"), l.move && xr(a, "move"), l.pinch && xr(a, "pinch"), l.hover && xr(a, "hover");
}
const yc = (a, l, s) => (c, m, w, T = {}, P = !1) => {
  var D, U;
  const z = (D = T.capture) !== null && D !== void 0 ? D : l.capture, W = (U = T.passive) !== null && U !== void 0 ? U : l.passive;
  let $ = P ? c : Fd(c, m, z);
  s && W && ($ += "Passive"), a[$] = a[$] || [], a[$].push(w);
}, Up = /^on(Drag|Wheel|Scroll|Move|Pinch|Hover)/;
function $p(a) {
  const l = {}, s = {}, c = /* @__PURE__ */ new Set();
  for (let m in a)
    Up.test(m) ? (c.add(RegExp.lastMatch), s[m] = a[m]) : l[m] = a[m];
  return [s, l, c];
}
function Er(a, l, s, c, m, w) {
  if (!a.has(s) || !ws.has(c))
    return;
  const T = s + "Start", P = s + "End", D = (U) => {
    let z;
    return U.first && T in l && l[T](U), s in l && (z = l[s](U)), U.last && P in l && l[P](U), z;
  };
  m[c] = D, w[c] = w[c] || {};
}
function Vp(a, l) {
  const [s, c, m] = $p(a), w = {};
  return Er(m, s, "onDrag", "drag", w, l), Er(m, s, "onWheel", "wheel", w, l), Er(m, s, "onScroll", "scroll", w, l), Er(m, s, "onPinch", "pinch", w, l), Er(m, s, "onMove", "move", w, l), Er(m, s, "onHover", "hover", w, l), {
    handlers: w,
    config: l,
    nativeHandlers: c
  };
}
function Hp(a, l = {}, s, c) {
  const m = cs.useMemo(() => new jp(a), []);
  if (m.applyHandlers(a, c), m.applyConfig(l, s), cs.useEffect(m.effect.bind(m)), cs.useEffect(() => m.clean.bind(m), []), l.target === void 0)
    return m.bind.bind(m);
}
function Bp(a) {
  return a.forEach(Ep), function(s, c) {
    const {
      handlers: m,
      nativeHandlers: w,
      config: T
    } = Vp(s, c || {});
    return Hp(m, T, void 0, w);
  };
}
function Wp(a, l) {
  return Bp([Cp, Rp, Np, Dp, Pp, Tp])(a, l || {});
}
const Yp = [
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
}, Qn = (a, l, s) => Math.min(Math.max(a, l), s), gc = (a) => (a % 360 + 360) % 360, wc = (a) => ((a + 180) % 360 + 360) % 360 - 180, zn = (a, l, s) => {
  const c = a.dataset[l] ?? a.getAttribute(`data-${l}`), m = c == null ? NaN : parseFloat(c);
  return Number.isFinite(m) ? m : s;
};
function Xp(a) {
  const l = a.slice();
  for (let s = l.length - 1; s > 0; s--) {
    const c = Math.floor(Math.random() * (s + 1));
    [l[s], l[c]] = [l[c], l[s]];
  }
  return l;
}
function _c(a, l, s, c, m) {
  const w = [];
  for (; w.length < l; )
    w.push(...Xp(a));
  w.length = l;
  let T = 0, P = 0;
  for (let D = 0; D < s.length; D++)
    for (let U = 0; U < s[D].length; U++) {
      const z = m(D, U).filter(($) => $ < P);
      if (z.some(($) => w[$].src === w[P].src)) {
        let $ = !1;
        for (let A = P + 1; A < w.length; A++)
          if (!z.some((K) => w[K].src === w[A].src)) {
            const K = w[P];
            w[P] = w[A], w[A] = K, $ = !0;
            break;
          }
        $ || T++;
      }
      P++;
    }
  return { usedImages: w, conflicts: T };
}
const Kp = 20;
function Qp(a, l) {
  const s = Array.from({ length: l }, (A, X) => -37 + X * 2), c = [-4, -2, 0, 2, 4], m = [-3, -1, 1, 3, 5], w = s.map((A, X) => (X % 2 === 0 ? c : m).map((Q) => ({ x: A, y: Q, sizeX: 2, sizeY: 2 }))), T = w.flat(), P = T.length;
  if (a.length === 0)
    return T.map((A) => ({ ...A, src: "", alt: "" }));
  a.length > P && console.warn(
    `[DomeGallery] Provided image count (${a.length}) exceeds available tiles (${P}). Some images will not be shown.`
  );
  const D = a.map((A) => typeof A == "string" ? { src: A, alt: "" } : { src: A.src || "", alt: A.alt || "" }), U = [];
  {
    let A = 0;
    for (const X of w)
      U.push(A), A += X.length;
  }
  const z = (A, X) => U[A] + X, W = (A, X) => {
    const K = [];
    X > 0 && K.push(z(A, X - 1)), X < w[A].length - 1 && K.push(z(A, X + 1));
    const Q = w[A][X].y;
    for (const Se of [(A - 1 + l) % l, (A + 1) % l])
      Se !== A && w[Se].forEach((Me, We) => {
        Math.abs(Me.y - Q) <= 1 && K.push(z(Se, We));
      });
    return K;
  };
  let $ = _c(D, P, w, U, W);
  for (let A = 1; $.conflicts > 0 && A < Kp; A++) {
    const X = _c(D, P, w, U, W);
    X.conflicts < $.conflicts && ($ = X);
  }
  return T.map((A, X) => ({
    ...A,
    src: $.usedImages[X].src,
    alt: $.usedImages[X].alt
  }));
}
function Sc(a, l, s, c, m) {
  const w = 360 / m / 2, T = w * (a + (s - 1) / 2);
  return { rotateX: w * (l - (c - 1) / 2), rotateY: T };
}
const Gp = ee.forwardRef(function({
  images: l = Yp,
  fit: s = 0.5,
  fitBasis: c = "auto",
  minRadius: m = 600,
  maxRadius: w = 1 / 0,
  padFactor: T = 0.25,
  overlayBlurColor: P = "#120F17",
  maxVerticalRotationDeg: D = kl.maxVerticalRotationDeg,
  dragSensitivity: U = kl.dragSensitivity,
  enlargeTransitionMs: z = kl.enlargeTransitionMs,
  segments: W = kl.segments,
  dragDampening: $ = 2,
  openedImageWidth: A = "400px",
  openedImageHeight: X = "400px",
  imageBorderRadius: K = "30px",
  openedImageBorderRadius: Q = "30px",
  grayscale: Se = !0,
  onImageClick: Me,
  onDragMove: We,
  onLongPress: Ie,
  onLongPressEnd: Qe,
  longPressMs: ke = 500
}, Ge) {
  const Oe = ee.useRef(null), pt = ee.useRef(null), Fe = ee.useRef(null), Ct = ee.useRef(null), ct = ee.useRef(null), it = ee.useRef(null), Ve = ee.useRef(null), ht = ee.useRef(null), fe = ee.useRef({ x: 0, y: 0 }), ye = ee.useRef({ x: 0, y: 0 }), C = ee.useRef(null), j = ee.useRef(!1), R = ee.useRef(!1), h = ee.useRef(!1), _ = ee.useRef(null), Y = ee.useRef("mouse"), q = ee.useRef(null), J = ee.useRef(!1), ie = ee.useRef(0), ce = ee.useRef(0), re = ee.useRef(null), se = ee.useRef(!1), qe = ee.useRef(null), Ln = 10, Kt = ee.useCallback(() => {
    re.current !== null && (window.clearTimeout(re.current), re.current = null);
  }, []), ln = ee.useCallback(() => {
    Kt(), se.current && (se.current = !1, Qe == null || Qe());
  }, [Kt, Qe]), on = ee.useRef(!1), Tr = ee.useCallback(() => {
    on.current || (on.current = !0, document.body.classList.add("dg-scroll-lock"));
  }, []), Pr = ee.useCallback(() => {
    var F;
    on.current && ((F = Oe.current) == null ? void 0 : F.getAttribute("data-enlarging")) !== "true" && (on.current = !1, document.body.classList.remove("dg-scroll-lock"));
  }, []), Rr = ee.useMemo(() => Qp(l, W), [l, W]), Qt = (F, ne) => {
    const Z = Fe.current;
    Z && (Z.style.transform = `translateZ(calc(var(--radius) * -1)) rotateX(${F}deg) rotateY(${ne}deg)`);
  };
  ee.useImperativeHandle(
    Ge,
    () => ({
      focusOn: (F) => {
        var Re;
        const ne = (Re = Fe.current) == null ? void 0 : Re.querySelectorAll("[data-src]");
        if (!ne) return;
        let Z = null;
        for (const de of Array.from(ne))
          if (de.dataset.src === F) {
            Z = de;
            break;
          }
        if (!Z) return;
        const b = zn(Z, "offsetX", 0), le = zn(Z, "offsetY", 0), he = zn(Z, "sizeX", 2), ge = zn(Z, "sizeY", 2), xe = Sc(b, le, he, ge, W), Pe = Qn(-xe.rotateX, -D, D), we = wc(-xe.rotateY);
        fe.current = { x: Pe, y: we }, Fe.current && (Fe.current.style.transition = "transform 600ms ease"), Qt(Pe, we), window.setTimeout(() => {
          Fe.current && (Fe.current.style.transition = "");
        }, 650);
      },
      resetRotation: () => {
        fe.current = { x: 0, y: 0 }, Fe.current && (Fe.current.style.transition = "transform 600ms ease"), Qt(0, 0), window.setTimeout(() => {
          Fe.current && (Fe.current.style.transition = "");
        }, 650);
      }
    }),
    [W, D]
  );
  const qn = ee.useRef(null);
  ee.useEffect(() => {
    const F = Oe.current;
    if (!F) return;
    const ne = new ResizeObserver((Z) => {
      var me;
      const b = Z[0].contentRect, le = Math.max(1, b.width), he = Math.max(1, b.height), ge = Math.min(le, he), xe = Math.max(le, he), Pe = le / he;
      let we;
      switch (c) {
        case "min":
          we = ge;
          break;
        case "max":
          we = xe;
          break;
        case "width":
          we = le;
          break;
        case "height":
          we = he;
          break;
        default:
          we = Pe >= 1.3 ? le : ge;
      }
      let Re = we * s;
      const de = he * 1.35;
      Re = Math.min(Re, de), Re = Qn(Re, m, w), qn.current = Math.round(Re);
      const ue = Math.max(8, Math.round(ge * T));
      F.style.setProperty("--radius", `${qn.current}px`), F.style.setProperty("--viewer-pad", `${ue}px`), F.style.setProperty("--overlay-blur-color", P), F.style.setProperty("--tile-radius", K), F.style.setProperty("--enlarge-radius", Q), F.style.setProperty("--image-filter", Se ? "grayscale(1)" : "none"), Qt(fe.current.x, fe.current.y);
      const Ae = (me = ct.current) == null ? void 0 : me.querySelector(".enlarge");
      if (Ae && Ct.current && pt.current) {
        const G = Ct.current.getBoundingClientRect(), Ze = pt.current.getBoundingClientRect();
        if (A && X) {
          const ve = document.createElement("div");
          ve.style.cssText = `position: absolute; width: ${A}; height: ${X}; visibility: hidden;`, document.body.appendChild(ve);
          const Ye = ve.getBoundingClientRect();
          document.body.removeChild(ve);
          const an = G.left - Ze.left + (G.width - Ye.width) / 2, Mt = G.top - Ze.top + (G.height - Ye.height) / 2;
          Ae.style.left = `${an}px`, Ae.style.top = `${Mt}px`;
        } else
          Ae.style.left = `${G.left - Ze.left}px`, Ae.style.top = `${G.top - Ze.top}px`, Ae.style.width = `${G.width}px`, Ae.style.height = `${G.height}px`;
      }
    });
    return ne.observe(F), () => ne.disconnect();
  }, [
    s,
    c,
    m,
    w,
    T,
    P,
    Se,
    K,
    Q,
    A,
    X
  ]), ee.useEffect(() => {
    Qt(fe.current.x, fe.current.y);
  }, []);
  const Gt = ee.useCallback(() => {
    _.current && (cancelAnimationFrame(_.current), _.current = null);
  }, []), sn = ee.useCallback(
    (F, ne) => {
      let b = Qn(F, -1.4, 1.4) * 80, le = Qn(ne, -1.4, 1.4) * 80, he = 0;
      const ge = Qn($ ?? 0.6, 0, 1), xe = 0.94 + 0.055 * ge, Pe = 0.015 - 0.01 * ge, we = Math.round(90 + 270 * ge), Re = () => {
        if (b *= xe, le *= xe, Math.abs(b) < Pe && Math.abs(le) < Pe) {
          _.current = null;
          return;
        }
        if (++he > we) {
          _.current = null;
          return;
        }
        const de = Qn(fe.current.x - le / 200, -D, D), ue = wc(fe.current.y + b / 200);
        fe.current = { x: de, y: ue }, Qt(de, ue), _.current = requestAnimationFrame(Re);
      };
      Gt(), _.current = requestAnimationFrame(Re);
    },
    [$, D, Gt]
  );
  Wp(
    {
      onDragStart: ({ event: F }) => {
        var b, le;
        if (Ve.current) return;
        Gt();
        const ne = F;
        Y.current = ne.pointerType || "mouse", Y.current === "touch" && ne.preventDefault(), Y.current === "touch" && Tr(), j.current = !0, R.current = !1, h.current = !1, ye.current = { ...fe.current }, C.current = { x: ne.clientX, y: ne.clientY };
        const Z = (le = (b = ne.target).closest) == null ? void 0 : le.call(b, ".item__image");
        q.current = Z || null;
      },
      onDrag: ({ event: F, last: ne, velocity: Z = [0, 0], direction: b = [0, 0], movement: le }) => {
        if (Ve.current || !j.current || !C.current) return;
        const he = F;
        Y.current === "touch" && he.preventDefault();
        const ge = he.clientX - C.current.x, xe = he.clientY - C.current.y;
        h.current || ge * ge + xe * xe > 16 && (h.current = !0, We == null || We());
        const Pe = Qn(
          ye.current.x - xe / U,
          -D,
          D
        ), we = ye.current.y + ge / U, Re = fe.current;
        if ((Re.x !== Pe || Re.y !== we) && (fe.current = { x: Pe, y: we }, Qt(Pe, we)), ne) {
          j.current = !1;
          let de = !1;
          if (C.current) {
            const ve = he.clientX - C.current.x, Ye = he.clientY - C.current.y, an = ve * ve + Ye * Ye, Mt = Y.current === "touch" ? 10 : 6;
            an <= Mt * Mt && (de = !0);
          }
          let [ue, Ae] = Z;
          const [me, G] = b;
          let Ze = ue * me, tt = Ae * G;
          if (!de && Math.abs(Ze) < 1e-3 && Math.abs(tt) < 1e-3 && Array.isArray(le)) {
            const [ve, Ye] = le;
            Ze = ve / U * 0.02, tt = Ye / U * 0.02;
          }
          if (!de && (Math.abs(Ze) > 5e-3 || Math.abs(tt) > 5e-3) && sn(Ze, tt), C.current = null, R.current = !de, de && q.current && !Ve.current)
            if (Me) {
              const ve = q.current.parentElement, Ye = (ve == null ? void 0 : ve.dataset.src) || "";
              Ye && Me(Ye);
            } else
              un(q.current);
          q.current = null, R.current && setTimeout(() => R.current = !1, 120), Y.current === "touch" && Pr(), h.current && (ce.current = performance.now()), h.current = !1;
        }
      }
    },
    { target: pt, eventOptions: { passive: !1 } }
  ), ee.useEffect(() => {
    const F = it.current;
    if (!F) return;
    const ne = () => {
      var G, Ze;
      if (performance.now() - ie.current < 250) return;
      const b = Ve.current;
      if (!b) return;
      const le = b.parentElement, he = (G = ct.current) == null ? void 0 : G.querySelector(".enlarge");
      if (!he) return;
      const ge = le.querySelector(".item__image--reference"), xe = ht.current;
      if (!xe) {
        he.remove(), ge && ge.remove(), le.style.setProperty("--rot-y-delta", "0deg"), le.style.setProperty("--rot-x-delta", "0deg"), b.style.visibility = "", b.style.zIndex = 0, Ve.current = null, (Ze = Oe.current) == null || Ze.removeAttribute("data-enlarging"), J.current = !1;
        return;
      }
      const Pe = he.getBoundingClientRect(), we = Oe.current.getBoundingClientRect(), Re = {
        left: xe.left - we.left,
        top: xe.top - we.top,
        width: xe.width,
        height: xe.height
      }, de = {
        left: Pe.left - we.left,
        top: Pe.top - we.top,
        width: Pe.width,
        height: Pe.height
      }, ue = document.createElement("div");
      ue.className = "enlarge-closing", ue.style.cssText = `
        position: absolute;
        left: ${de.left}px;
        top: ${de.top}px;
        width: ${de.width}px;
        height: ${de.height}px;
        z-index: 9999;
        border-radius: ${Q};
        overflow: hidden;
        box-shadow: 0 10px 30px rgba(0,0,0,.35);
        transition: all ${z}ms ease-out;
        pointer-events: none;
        margin: 0;
        transform: none;
        filter: ${Se ? "grayscale(1)" : "none"};
      `;
      const Ae = he.querySelector("img");
      if (Ae) {
        const tt = Ae.cloneNode();
        tt.style.cssText = "width: 100%; height: 100%; object-fit: cover;", ue.appendChild(tt);
      }
      he.remove(), Oe.current.appendChild(ue), ue.getBoundingClientRect(), requestAnimationFrame(() => {
        ue.style.left = Re.left + "px", ue.style.top = Re.top + "px", ue.style.width = Re.width + "px", ue.style.height = Re.height + "px", ue.style.opacity = "0";
      });
      const me = () => {
        ue.remove(), ht.current = null, ge && ge.remove(), le.style.transition = "none", b.style.transition = "none", le.style.setProperty("--rot-y-delta", "0deg"), le.style.setProperty("--rot-x-delta", "0deg"), requestAnimationFrame(() => {
          var tt;
          b.style.visibility = "", b.style.opacity = "0", b.style.zIndex = 0, Ve.current = null, (tt = Oe.current) == null || tt.removeAttribute("data-enlarging"), requestAnimationFrame(() => {
            le.style.transition = "", b.style.transition = "opacity 300ms ease-out", requestAnimationFrame(() => {
              b.style.opacity = "1", setTimeout(() => {
                var ve;
                b.style.transition = "", b.style.opacity = "", J.current = !1, !j.current && ((ve = Oe.current) == null ? void 0 : ve.getAttribute("data-enlarging")) !== "true" && document.body.classList.remove("dg-scroll-lock");
              }, 300);
            });
          });
        });
      };
      ue.addEventListener("transitionend", me, {
        once: !0
      });
    };
    F.addEventListener("click", ne);
    const Z = (b) => {
      b.key === "Escape" && ne();
    };
    return window.addEventListener("keydown", Z), () => {
      F.removeEventListener("click", ne), window.removeEventListener("keydown", Z);
    };
  }, [z, Q, Se]);
  const un = (F) => {
    var Nr, cn, Jn, fn;
    if (J.current) return;
    J.current = !0, ie.current = performance.now(), Tr();
    const ne = F.parentElement;
    Ve.current = F, F.setAttribute("data-focused", "true");
    const Z = zn(ne, "offsetX", 0), b = zn(ne, "offsetY", 0), le = zn(ne, "sizeX", 2), he = zn(ne, "sizeY", 2), ge = Sc(Z, b, le, he, W), xe = gc(ge.rotateY), Pe = gc(fe.current.y);
    let we = -(xe + Pe) % 360;
    we < -180 && (we += 360);
    const Re = -ge.rotateX - fe.current.x;
    ne.style.setProperty("--rot-y-delta", `${we}deg`), ne.style.setProperty("--rot-x-delta", `${Re}deg`);
    const de = document.createElement("div");
    de.className = "item__image item__image--reference opacity-0", de.style.transform = `rotateX(${-ge.rotateX}deg) rotateY(${-ge.rotateY}deg)`, ne.appendChild(de), de.offsetHeight;
    const ue = de.getBoundingClientRect(), Ae = (Nr = pt.current) == null ? void 0 : Nr.getBoundingClientRect(), me = (cn = Ct.current) == null ? void 0 : cn.getBoundingClientRect();
    if (!Ae || !me || ue.width <= 0 || ue.height <= 0) {
      J.current = !1, Ve.current = null, ne.removeChild(de), Pr();
      return;
    }
    ht.current = {
      left: ue.left,
      top: ue.top,
      width: ue.width,
      height: ue.height
    }, F.style.visibility = "hidden", F.style.zIndex = 0;
    const G = document.createElement("div");
    G.className = "enlarge", G.style.cssText = `position:absolute; left:${me.left - Ae.left}px; top:${me.top - Ae.top}px; width:${me.width}px; height:${me.height}px; opacity:0; z-index:30; will-change:transform,opacity; transform-origin:top left; transition:transform ${z}ms ease, opacity ${z}ms ease; border-radius:${Q}; overflow:hidden; box-shadow:0 10px 30px rgba(0,0,0,.35);`;
    const Ze = ne.dataset.src || ((Jn = F.querySelector("img")) == null ? void 0 : Jn.src) || "", tt = ne.dataset.alt || ((fn = F.querySelector("img")) == null ? void 0 : fn.alt) || "", ve = document.createElement("img");
    ve.src = Ze, ve.alt = tt, ve.style.cssText = `width:100%; height:100%; object-fit:cover; filter:${Se ? "grayscale(1)" : "none"};`, G.appendChild(ve), ct.current.appendChild(G);
    const Ye = ue.left - me.left, an = ue.top - me.top, Mt = ue.width / me.width, Zn = ue.height / me.height, di = isFinite(Mt) && Mt > 0 ? Mt : 1, pi = isFinite(Zn) && Zn > 0 ? Zn : 1;
    if (G.style.transform = `translate(${Ye}px, ${an}px) scale(${di}, ${pi})`, setTimeout(() => {
      var Mn;
      G.parentElement && (G.style.opacity = "1", G.style.transform = "translate(0px, 0px) scale(1, 1)", (Mn = Oe.current) == null || Mn.setAttribute("data-enlarging", "true"));
    }, 16), A || X) {
      const Mn = (In) => {
        if (In.propertyName !== "transform") return;
        G.removeEventListener("transitionend", Mn);
        const bn = G.style.transition;
        G.style.transition = "none";
        const On = A || `${me.width}px`, er = X || `${me.height}px`;
        G.style.width = On, G.style.height = er;
        const mi = G.getBoundingClientRect();
        G.style.width = me.width + "px", G.style.height = me.height + "px", G.offsetWidth, G.style.transition = `left ${z}ms ease, top ${z}ms ease, width ${z}ms ease, height ${z}ms ease`;
        const Tl = me.left - Ae.left + (me.width - mi.width) / 2, Pl = me.top - Ae.top + (me.height - mi.height) / 2;
        requestAnimationFrame(() => {
          G.style.left = `${Tl}px`, G.style.top = `${Pl}px`, G.style.width = On, G.style.height = er;
        });
        const Vt = () => {
          G.removeEventListener("transitionend", Vt), G.style.transition = bn;
        };
        G.addEventListener("transitionend", Vt, {
          once: !0
        });
      };
      G.addEventListener("transitionend", Mn);
    }
  };
  return ee.useEffect(() => () => {
    document.body.classList.remove("dg-scroll-lock"), Kt();
  }, [Kt]), /* @__PURE__ */ at.jsx(at.Fragment, { children: /* @__PURE__ */ at.jsx(
    "div",
    {
      ref: Oe,
      className: "sphere-root",
      style: {
        "--segments-x": W,
        "--segments-y": W,
        "--overlay-blur-color": P,
        "--tile-radius": K,
        "--enlarge-radius": Q,
        "--image-filter": Se ? "grayscale(1)" : "none"
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
            /* @__PURE__ */ at.jsx("div", { className: "stage", children: /* @__PURE__ */ at.jsx("div", { ref: Fe, className: "sphere", children: Rr.map((F, ne) => /* @__PURE__ */ at.jsx(
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
                    onContextMenu: (Z) => {
                      Ie && Z.preventDefault();
                    },
                    onClick: (Z) => {
                      if (se.current) {
                        se.current = !1;
                        return;
                      }
                      if (!j.current && !h.current && !(performance.now() - ce.current < 80)) {
                        if (Me) {
                          Me(F.src);
                          return;
                        }
                        J.current || un(Z.currentTarget);
                      }
                    },
                    onPointerDown: (Z) => {
                      if (!Ie) return;
                      se.current = !1, qe.current = { x: Z.clientX, y: Z.clientY }, Kt();
                      const b = F.src;
                      re.current = window.setTimeout(() => {
                        re.current = null, !(j.current || h.current) && (se.current = !0, Ie(b));
                      }, ke);
                    },
                    onPointerMove: (Z) => {
                      if (re.current === null || !qe.current) return;
                      const b = Z.clientX - qe.current.x, le = Z.clientY - qe.current.y;
                      b * b + le * le > Ln * Ln && Kt();
                    },
                    onPointerUp: (Z) => {
                      const b = se.current;
                      ln(), !b && Z.nativeEvent.pointerType === "touch" && (j.current || h.current || performance.now() - ce.current < 80 || Me || J.current || un(Z.currentTarget));
                    },
                    onPointerLeave: ln,
                    onPointerCancel: ln,
                    onKeyDown: (Z) => {
                      if (!(Z.key !== "Enter" && Z.key !== " ")) {
                        if (Z.preventDefault(), Me) {
                          Me(F.src);
                          return;
                        }
                        J.current || un(Z.currentTarget);
                      }
                    },
                    style: {
                      inset: "10px",
                      borderRadius: `var(--tile-radius, ${K})`,
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
                          filter: `var(--image-filter, ${Se ? "grayscale(1)" : "none"})`
                        }
                      }
                    )
                  }
                )
              },
              `${F.x},${F.y},${ne}`
            )) }) }),
            /* @__PURE__ */ at.jsx(
              "div",
              {
                className: "dg-overlay-radial",
                style: {
                  backgroundImage: `radial-gradient(rgba(235, 235, 235, 0) 65%, var(--overlay-blur-color, ${P}) 100%)`
                }
              }
            ),
            /* @__PURE__ */ at.jsx(
              "div",
              {
                className: "dg-overlay-radial",
                style: {
                  WebkitMaskImage: `radial-gradient(rgba(235, 235, 235, 0) 70%, var(--overlay-blur-color, ${P}) 90%)`,
                  maskImage: `radial-gradient(rgba(235, 235, 235, 0) 70%, var(--overlay-blur-color, ${P}) 90%)`,
                  backdropFilter: "blur(3px)"
                }
              }
            ),
            /* @__PURE__ */ at.jsx(
              "div",
              {
                className: "dg-edge-top",
                style: {
                  background: `linear-gradient(to bottom, transparent, var(--overlay-blur-color, ${P}))`
                }
              }
            ),
            /* @__PURE__ */ at.jsx(
              "div",
              {
                className: "dg-edge-bottom",
                style: {
                  background: `linear-gradient(to bottom, transparent, var(--overlay-blur-color, ${P}))`
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
function qp(a, l) {
  const s = { current: null }, c = Nd.createRoot(a);
  return c.render(
    ee.createElement(Gp, {
      ref: (m) => {
        s.current = m;
      },
      images: l.images,
      onImageClick: l.onImageClick,
      onDragMove: l.onDragMove,
      onLongPress: l.onLongPress,
      onLongPressEnd: l.onLongPressEnd,
      fit: l.fit ?? 0.8,
      minRadius: l.minRadius ?? 900,
      // Locked back to 0 (no vertical tilt) per explicit request, reverting
      // an earlier "unlock vertical drag" change: dragging vertically must
      // not reveal blank space above/below the tile band.
      maxVerticalRotationDeg: l.maxVerticalRotationDeg ?? 0,
      segments: l.segments ?? 34,
      dragDampening: l.dragDampening ?? 2,
      grayscale: l.grayscale ?? !1
    })
  ), {
    focusOn: (m) => {
      var w;
      return (w = s.current) == null ? void 0 : w.focusOn(m);
    },
    resetRotation: () => {
      var m;
      return (m = s.current) == null ? void 0 : m.resetRotation();
    },
    unmount: () => c.unmount()
  };
}
export {
  qp as mountDomeGallery
};
