function BD(g) {
  return g && g.__esModule && Object.prototype.hasOwnProperty.call(g, "default") ? g.default : g;
}
var iy = { exports: {} }, Ht = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var yR;
function $D() {
  if (yR) return Ht;
  yR = 1;
  var g = Symbol.for("react.element"), d = Symbol.for("react.portal"), v = Symbol.for("react.fragment"), R = Symbol.for("react.strict_mode"), M = Symbol.for("react.profiler"), I = Symbol.for("react.provider"), C = Symbol.for("react.context"), de = Symbol.for("react.forward_ref"), Q = Symbol.for("react.suspense"), W = Symbol.for("react.memo"), Z = Symbol.for("react.lazy"), J = Symbol.iterator;
  function se(L) {
    return L === null || typeof L != "object" ? null : (L = J && L[J] || L["@@iterator"], typeof L == "function" ? L : null);
  }
  var oe = { isMounted: function() {
    return !1;
  }, enqueueForceUpdate: function() {
  }, enqueueReplaceState: function() {
  }, enqueueSetState: function() {
  } }, Ue = Object.assign, ct = {};
  function Ke(L, Y, Ie) {
    this.props = L, this.context = Y, this.refs = ct, this.updater = Ie || oe;
  }
  Ke.prototype.isReactComponent = {}, Ke.prototype.setState = function(L, Y) {
    if (typeof L != "object" && typeof L != "function" && L != null) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
    this.updater.enqueueSetState(this, L, Y, "setState");
  }, Ke.prototype.forceUpdate = function(L) {
    this.updater.enqueueForceUpdate(this, L, "forceUpdate");
  };
  function jt() {
  }
  jt.prototype = Ke.prototype;
  function tt(L, Y, Ie) {
    this.props = L, this.context = Y, this.refs = ct, this.updater = Ie || oe;
  }
  var Ze = tt.prototype = new jt();
  Ze.constructor = tt, Ue(Ze, Ke.prototype), Ze.isPureReactComponent = !0;
  var Je = Array.isArray, _e = Object.prototype.hasOwnProperty, Le = { current: null }, je = { key: !0, ref: !0, __self: !0, __source: !0 };
  function sn(L, Y, Ie) {
    var Fe, gt = {}, pt = null, vt = null;
    if (Y != null) for (Fe in Y.ref !== void 0 && (vt = Y.ref), Y.key !== void 0 && (pt = "" + Y.key), Y) _e.call(Y, Fe) && !je.hasOwnProperty(Fe) && (gt[Fe] = Y[Fe]);
    var rt = arguments.length - 2;
    if (rt === 1) gt.children = Ie;
    else if (1 < rt) {
      for (var St = Array(rt), Qt = 0; Qt < rt; Qt++) St[Qt] = arguments[Qt + 2];
      gt.children = St;
    }
    if (L && L.defaultProps) for (Fe in rt = L.defaultProps, rt) gt[Fe] === void 0 && (gt[Fe] = rt[Fe]);
    return { $$typeof: g, type: L, key: pt, ref: vt, props: gt, _owner: Le.current };
  }
  function Gt(L, Y) {
    return { $$typeof: g, type: L.type, key: Y, ref: L.ref, props: L.props, _owner: L._owner };
  }
  function Pt(L) {
    return typeof L == "object" && L !== null && L.$$typeof === g;
  }
  function dn(L) {
    var Y = { "=": "=0", ":": "=2" };
    return "$" + L.replace(/[=:]/g, function(Ie) {
      return Y[Ie];
    });
  }
  var nt = /\/+/g;
  function Ae(L, Y) {
    return typeof L == "object" && L !== null && L.key != null ? dn("" + L.key) : Y.toString(36);
  }
  function _t(L, Y, Ie, Fe, gt) {
    var pt = typeof L;
    (pt === "undefined" || pt === "boolean") && (L = null);
    var vt = !1;
    if (L === null) vt = !0;
    else switch (pt) {
      case "string":
      case "number":
        vt = !0;
        break;
      case "object":
        switch (L.$$typeof) {
          case g:
          case d:
            vt = !0;
        }
    }
    if (vt) return vt = L, gt = gt(vt), L = Fe === "" ? "." + Ae(vt, 0) : Fe, Je(gt) ? (Ie = "", L != null && (Ie = L.replace(nt, "$&/") + "/"), _t(gt, Y, Ie, "", function(Qt) {
      return Qt;
    })) : gt != null && (Pt(gt) && (gt = Gt(gt, Ie + (!gt.key || vt && vt.key === gt.key ? "" : ("" + gt.key).replace(nt, "$&/") + "/") + L)), Y.push(gt)), 1;
    if (vt = 0, Fe = Fe === "" ? "." : Fe + ":", Je(L)) for (var rt = 0; rt < L.length; rt++) {
      pt = L[rt];
      var St = Fe + Ae(pt, rt);
      vt += _t(pt, Y, Ie, St, gt);
    }
    else if (St = se(L), typeof St == "function") for (L = St.call(L), rt = 0; !(pt = L.next()).done; ) pt = pt.value, St = Fe + Ae(pt, rt++), vt += _t(pt, Y, Ie, St, gt);
    else if (pt === "object") throw Y = String(L), Error("Objects are not valid as a React child (found: " + (Y === "[object Object]" ? "object with keys {" + Object.keys(L).join(", ") + "}" : Y) + "). If you meant to render a collection of children, use an array instead.");
    return vt;
  }
  function xt(L, Y, Ie) {
    if (L == null) return L;
    var Fe = [], gt = 0;
    return _t(L, Fe, "", "", function(pt) {
      return Y.call(Ie, pt, gt++);
    }), Fe;
  }
  function At(L) {
    if (L._status === -1) {
      var Y = L._result;
      Y = Y(), Y.then(function(Ie) {
        (L._status === 0 || L._status === -1) && (L._status = 1, L._result = Ie);
      }, function(Ie) {
        (L._status === 0 || L._status === -1) && (L._status = 2, L._result = Ie);
      }), L._status === -1 && (L._status = 0, L._result = Y);
    }
    if (L._status === 1) return L._result.default;
    throw L._result;
  }
  var Ee = { current: null }, ie = { transition: null }, be = { ReactCurrentDispatcher: Ee, ReactCurrentBatchConfig: ie, ReactCurrentOwner: Le };
  function ue() {
    throw Error("act(...) is not supported in production builds of React.");
  }
  return Ht.Children = { map: xt, forEach: function(L, Y, Ie) {
    xt(L, function() {
      Y.apply(this, arguments);
    }, Ie);
  }, count: function(L) {
    var Y = 0;
    return xt(L, function() {
      Y++;
    }), Y;
  }, toArray: function(L) {
    return xt(L, function(Y) {
      return Y;
    }) || [];
  }, only: function(L) {
    if (!Pt(L)) throw Error("React.Children.only expected to receive a single React element child.");
    return L;
  } }, Ht.Component = Ke, Ht.Fragment = v, Ht.Profiler = M, Ht.PureComponent = tt, Ht.StrictMode = R, Ht.Suspense = Q, Ht.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = be, Ht.act = ue, Ht.cloneElement = function(L, Y, Ie) {
    if (L == null) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + L + ".");
    var Fe = Ue({}, L.props), gt = L.key, pt = L.ref, vt = L._owner;
    if (Y != null) {
      if (Y.ref !== void 0 && (pt = Y.ref, vt = Le.current), Y.key !== void 0 && (gt = "" + Y.key), L.type && L.type.defaultProps) var rt = L.type.defaultProps;
      for (St in Y) _e.call(Y, St) && !je.hasOwnProperty(St) && (Fe[St] = Y[St] === void 0 && rt !== void 0 ? rt[St] : Y[St]);
    }
    var St = arguments.length - 2;
    if (St === 1) Fe.children = Ie;
    else if (1 < St) {
      rt = Array(St);
      for (var Qt = 0; Qt < St; Qt++) rt[Qt] = arguments[Qt + 2];
      Fe.children = rt;
    }
    return { $$typeof: g, type: L.type, key: gt, ref: pt, props: Fe, _owner: vt };
  }, Ht.createContext = function(L) {
    return L = { $$typeof: C, _currentValue: L, _currentValue2: L, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null }, L.Provider = { $$typeof: I, _context: L }, L.Consumer = L;
  }, Ht.createElement = sn, Ht.createFactory = function(L) {
    var Y = sn.bind(null, L);
    return Y.type = L, Y;
  }, Ht.createRef = function() {
    return { current: null };
  }, Ht.forwardRef = function(L) {
    return { $$typeof: de, render: L };
  }, Ht.isValidElement = Pt, Ht.lazy = function(L) {
    return { $$typeof: Z, _payload: { _status: -1, _result: L }, _init: At };
  }, Ht.memo = function(L, Y) {
    return { $$typeof: W, type: L, compare: Y === void 0 ? null : Y };
  }, Ht.startTransition = function(L) {
    var Y = ie.transition;
    ie.transition = {};
    try {
      L();
    } finally {
      ie.transition = Y;
    }
  }, Ht.unstable_act = ue, Ht.useCallback = function(L, Y) {
    return Ee.current.useCallback(L, Y);
  }, Ht.useContext = function(L) {
    return Ee.current.useContext(L);
  }, Ht.useDebugValue = function() {
  }, Ht.useDeferredValue = function(L) {
    return Ee.current.useDeferredValue(L);
  }, Ht.useEffect = function(L, Y) {
    return Ee.current.useEffect(L, Y);
  }, Ht.useId = function() {
    return Ee.current.useId();
  }, Ht.useImperativeHandle = function(L, Y, Ie) {
    return Ee.current.useImperativeHandle(L, Y, Ie);
  }, Ht.useInsertionEffect = function(L, Y) {
    return Ee.current.useInsertionEffect(L, Y);
  }, Ht.useLayoutEffect = function(L, Y) {
    return Ee.current.useLayoutEffect(L, Y);
  }, Ht.useMemo = function(L, Y) {
    return Ee.current.useMemo(L, Y);
  }, Ht.useReducer = function(L, Y, Ie) {
    return Ee.current.useReducer(L, Y, Ie);
  }, Ht.useRef = function(L) {
    return Ee.current.useRef(L);
  }, Ht.useState = function(L) {
    return Ee.current.useState(L);
  }, Ht.useSyncExternalStore = function(L, Y, Ie) {
    return Ee.current.useSyncExternalStore(L, Y, Ie);
  }, Ht.useTransition = function() {
    return Ee.current.useTransition();
  }, Ht.version = "18.3.1", Ht;
}
var cv = { exports: {} };
/**
 * @license React
 * react.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
cv.exports;
var gR;
function ID() {
  return gR || (gR = 1, (function(g, d) {
    process.env.NODE_ENV !== "production" && (function() {
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error());
      var v = "18.3.1", R = Symbol.for("react.element"), M = Symbol.for("react.portal"), I = Symbol.for("react.fragment"), C = Symbol.for("react.strict_mode"), de = Symbol.for("react.profiler"), Q = Symbol.for("react.provider"), W = Symbol.for("react.context"), Z = Symbol.for("react.forward_ref"), J = Symbol.for("react.suspense"), se = Symbol.for("react.suspense_list"), oe = Symbol.for("react.memo"), Ue = Symbol.for("react.lazy"), ct = Symbol.for("react.offscreen"), Ke = Symbol.iterator, jt = "@@iterator";
      function tt(y) {
        if (y === null || typeof y != "object")
          return null;
        var b = Ke && y[Ke] || y[jt];
        return typeof b == "function" ? b : null;
      }
      var Ze = {
        /**
         * @internal
         * @type {ReactComponent}
         */
        current: null
      }, Je = {
        transition: null
      }, _e = {
        current: null,
        // Used to reproduce behavior of `batchedUpdates` in legacy mode.
        isBatchingLegacy: !1,
        didScheduleLegacyUpdate: !1
      }, Le = {
        /**
         * @internal
         * @type {ReactComponent}
         */
        current: null
      }, je = {}, sn = null;
      function Gt(y) {
        sn = y;
      }
      je.setExtraStackFrame = function(y) {
        sn = y;
      }, je.getCurrentStack = null, je.getStackAddendum = function() {
        var y = "";
        sn && (y += sn);
        var b = je.getCurrentStack;
        return b && (y += b() || ""), y;
      };
      var Pt = !1, dn = !1, nt = !1, Ae = !1, _t = !1, xt = {
        ReactCurrentDispatcher: Ze,
        ReactCurrentBatchConfig: Je,
        ReactCurrentOwner: Le
      };
      xt.ReactDebugCurrentFrame = je, xt.ReactCurrentActQueue = _e;
      function At(y) {
        {
          for (var b = arguments.length, F = new Array(b > 1 ? b - 1 : 0), V = 1; V < b; V++)
            F[V - 1] = arguments[V];
          ie("warn", y, F);
        }
      }
      function Ee(y) {
        {
          for (var b = arguments.length, F = new Array(b > 1 ? b - 1 : 0), V = 1; V < b; V++)
            F[V - 1] = arguments[V];
          ie("error", y, F);
        }
      }
      function ie(y, b, F) {
        {
          var V = xt.ReactDebugCurrentFrame, le = V.getStackAddendum();
          le !== "" && (b += "%s", F = F.concat([le]));
          var Be = F.map(function(fe) {
            return String(fe);
          });
          Be.unshift("Warning: " + b), Function.prototype.apply.call(console[y], console, Be);
        }
      }
      var be = {};
      function ue(y, b) {
        {
          var F = y.constructor, V = F && (F.displayName || F.name) || "ReactClass", le = V + "." + b;
          if (be[le])
            return;
          Ee("Can't call %s on a component that is not yet mounted. This is a no-op, but it might indicate a bug in your application. Instead, assign to `this.state` directly or define a `state = {};` class property with the desired state in the %s component.", b, V), be[le] = !0;
        }
      }
      var L = {
        /**
         * Checks whether or not this composite component is mounted.
         * @param {ReactClass} publicInstance The instance we want to test.
         * @return {boolean} True if mounted, false otherwise.
         * @protected
         * @final
         */
        isMounted: function(y) {
          return !1;
        },
        /**
         * Forces an update. This should only be invoked when it is known with
         * certainty that we are **not** in a DOM transaction.
         *
         * You may want to call this when you know that some deeper aspect of the
         * component's state has changed but `setState` was not called.
         *
         * This will not invoke `shouldComponentUpdate`, but it will invoke
         * `componentWillUpdate` and `componentDidUpdate`.
         *
         * @param {ReactClass} publicInstance The instance that should rerender.
         * @param {?function} callback Called after component is updated.
         * @param {?string} callerName name of the calling function in the public API.
         * @internal
         */
        enqueueForceUpdate: function(y, b, F) {
          ue(y, "forceUpdate");
        },
        /**
         * Replaces all of the state. Always use this or `setState` to mutate state.
         * You should treat `this.state` as immutable.
         *
         * There is no guarantee that `this.state` will be immediately updated, so
         * accessing `this.state` after calling this method may return the old value.
         *
         * @param {ReactClass} publicInstance The instance that should rerender.
         * @param {object} completeState Next state.
         * @param {?function} callback Called after component is updated.
         * @param {?string} callerName name of the calling function in the public API.
         * @internal
         */
        enqueueReplaceState: function(y, b, F, V) {
          ue(y, "replaceState");
        },
        /**
         * Sets a subset of the state. This only exists because _pendingState is
         * internal. This provides a merging strategy that is not available to deep
         * properties which is confusing. TODO: Expose pendingState or don't use it
         * during the merge.
         *
         * @param {ReactClass} publicInstance The instance that should rerender.
         * @param {object} partialState Next partial state to be merged with state.
         * @param {?function} callback Called after component is updated.
         * @param {?string} Name of the calling function in the public API.
         * @internal
         */
        enqueueSetState: function(y, b, F, V) {
          ue(y, "setState");
        }
      }, Y = Object.assign, Ie = {};
      Object.freeze(Ie);
      function Fe(y, b, F) {
        this.props = y, this.context = b, this.refs = Ie, this.updater = F || L;
      }
      Fe.prototype.isReactComponent = {}, Fe.prototype.setState = function(y, b) {
        if (typeof y != "object" && typeof y != "function" && y != null)
          throw new Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
        this.updater.enqueueSetState(this, y, b, "setState");
      }, Fe.prototype.forceUpdate = function(y) {
        this.updater.enqueueForceUpdate(this, y, "forceUpdate");
      };
      {
        var gt = {
          isMounted: ["isMounted", "Instead, make sure to clean up subscriptions and pending requests in componentWillUnmount to prevent memory leaks."],
          replaceState: ["replaceState", "Refactor your code to use setState instead (see https://github.com/facebook/react/issues/3236)."]
        }, pt = function(y, b) {
          Object.defineProperty(Fe.prototype, y, {
            get: function() {
              At("%s(...) is deprecated in plain JavaScript React classes. %s", b[0], b[1]);
            }
          });
        };
        for (var vt in gt)
          gt.hasOwnProperty(vt) && pt(vt, gt[vt]);
      }
      function rt() {
      }
      rt.prototype = Fe.prototype;
      function St(y, b, F) {
        this.props = y, this.context = b, this.refs = Ie, this.updater = F || L;
      }
      var Qt = St.prototype = new rt();
      Qt.constructor = St, Y(Qt, Fe.prototype), Qt.isPureReactComponent = !0;
      function jn() {
        var y = {
          current: null
        };
        return Object.seal(y), y;
      }
      var Qn = Array.isArray;
      function Fn(y) {
        return Qn(y);
      }
      function Ce(y) {
        {
          var b = typeof Symbol == "function" && Symbol.toStringTag, F = b && y[Symbol.toStringTag] || y.constructor.name || "Object";
          return F;
        }
      }
      function Ve(y) {
        try {
          return Qe(y), !1;
        } catch {
          return !0;
        }
      }
      function Qe(y) {
        return "" + y;
      }
      function ft(y) {
        if (Ve(y))
          return Ee("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", Ce(y)), Qe(y);
      }
      function Lt(y, b, F) {
        var V = y.displayName;
        if (V)
          return V;
        var le = b.displayName || b.name || "";
        return le !== "" ? F + "(" + le + ")" : F;
      }
      function zt(y) {
        return y.displayName || "Context";
      }
      function Ct(y) {
        if (y == null)
          return null;
        if (typeof y.tag == "number" && Ee("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof y == "function")
          return y.displayName || y.name || null;
        if (typeof y == "string")
          return y;
        switch (y) {
          case I:
            return "Fragment";
          case M:
            return "Portal";
          case de:
            return "Profiler";
          case C:
            return "StrictMode";
          case J:
            return "Suspense";
          case se:
            return "SuspenseList";
        }
        if (typeof y == "object")
          switch (y.$$typeof) {
            case W:
              var b = y;
              return zt(b) + ".Consumer";
            case Q:
              var F = y;
              return zt(F._context) + ".Provider";
            case Z:
              return Lt(y, y.render, "ForwardRef");
            case oe:
              var V = y.displayName || null;
              return V !== null ? V : Ct(y.type) || "Memo";
            case Ue: {
              var le = y, Be = le._payload, fe = le._init;
              try {
                return Ct(fe(Be));
              } catch {
                return null;
              }
            }
          }
        return null;
      }
      var Rt = Object.prototype.hasOwnProperty, Nt = {
        key: !0,
        ref: !0,
        __self: !0,
        __source: !0
      }, wt, Xt, it;
      it = {};
      function lt(y) {
        if (Rt.call(y, "ref")) {
          var b = Object.getOwnPropertyDescriptor(y, "ref").get;
          if (b && b.isReactWarning)
            return !1;
        }
        return y.ref !== void 0;
      }
      function Zt(y) {
        if (Rt.call(y, "key")) {
          var b = Object.getOwnPropertyDescriptor(y, "key").get;
          if (b && b.isReactWarning)
            return !1;
        }
        return y.key !== void 0;
      }
      function Ft(y, b) {
        var F = function() {
          wt || (wt = !0, Ee("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", b));
        };
        F.isReactWarning = !0, Object.defineProperty(y, "key", {
          get: F,
          configurable: !0
        });
      }
      function Xe(y, b) {
        var F = function() {
          Xt || (Xt = !0, Ee("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", b));
        };
        F.isReactWarning = !0, Object.defineProperty(y, "ref", {
          get: F,
          configurable: !0
        });
      }
      function ne(y) {
        if (typeof y.ref == "string" && Le.current && y.__self && Le.current.stateNode !== y.__self) {
          var b = Ct(Le.current.type);
          it[b] || (Ee('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', b, y.ref), it[b] = !0);
        }
      }
      var me = function(y, b, F, V, le, Be, fe) {
        var We = {
          // This tag allows us to uniquely identify this as a React Element
          $$typeof: R,
          // Built-in properties that belong on the element
          type: y,
          key: b,
          ref: F,
          props: fe,
          // Record the component responsible for creating this element.
          _owner: Be
        };
        return We._store = {}, Object.defineProperty(We._store, "validated", {
          configurable: !1,
          enumerable: !1,
          writable: !0,
          value: !1
        }), Object.defineProperty(We, "_self", {
          configurable: !1,
          enumerable: !1,
          writable: !1,
          value: V
        }), Object.defineProperty(We, "_source", {
          configurable: !1,
          enumerable: !1,
          writable: !1,
          value: le
        }), Object.freeze && (Object.freeze(We.props), Object.freeze(We)), We;
      };
      function Oe(y, b, F) {
        var V, le = {}, Be = null, fe = null, We = null, Mt = null;
        if (b != null) {
          lt(b) && (fe = b.ref, ne(b)), Zt(b) && (ft(b.key), Be = "" + b.key), We = b.__self === void 0 ? null : b.__self, Mt = b.__source === void 0 ? null : b.__source;
          for (V in b)
            Rt.call(b, V) && !Nt.hasOwnProperty(V) && (le[V] = b[V]);
        }
        var Wt = arguments.length - 2;
        if (Wt === 1)
          le.children = F;
        else if (Wt > 1) {
          for (var wn = Array(Wt), yn = 0; yn < Wt; yn++)
            wn[yn] = arguments[yn + 2];
          Object.freeze && Object.freeze(wn), le.children = wn;
        }
        if (y && y.defaultProps) {
          var bt = y.defaultProps;
          for (V in bt)
            le[V] === void 0 && (le[V] = bt[V]);
        }
        if (Be || fe) {
          var gn = typeof y == "function" ? y.displayName || y.name || "Unknown" : y;
          Be && Ft(le, gn), fe && Xe(le, gn);
        }
        return me(y, Be, fe, We, Mt, Le.current, le);
      }
      function ht(y, b) {
        var F = me(y.type, b, y.ref, y._self, y._source, y._owner, y.props);
        return F;
      }
      function Jt(y, b, F) {
        if (y == null)
          throw new Error("React.cloneElement(...): The argument must be a React element, but you passed " + y + ".");
        var V, le = Y({}, y.props), Be = y.key, fe = y.ref, We = y._self, Mt = y._source, Wt = y._owner;
        if (b != null) {
          lt(b) && (fe = b.ref, Wt = Le.current), Zt(b) && (ft(b.key), Be = "" + b.key);
          var wn;
          y.type && y.type.defaultProps && (wn = y.type.defaultProps);
          for (V in b)
            Rt.call(b, V) && !Nt.hasOwnProperty(V) && (b[V] === void 0 && wn !== void 0 ? le[V] = wn[V] : le[V] = b[V]);
        }
        var yn = arguments.length - 2;
        if (yn === 1)
          le.children = F;
        else if (yn > 1) {
          for (var bt = Array(yn), gn = 0; gn < yn; gn++)
            bt[gn] = arguments[gn + 2];
          le.children = bt;
        }
        return me(y.type, Be, fe, We, Mt, Wt, le);
      }
      function en(y) {
        return typeof y == "object" && y !== null && y.$$typeof === R;
      }
      var pn = ".", Xn = ":";
      function hn(y) {
        var b = /[=:]/g, F = {
          "=": "=0",
          ":": "=2"
        }, V = y.replace(b, function(le) {
          return F[le];
        });
        return "$" + V;
      }
      var vn = !1, un = /\/+/g;
      function Ar(y) {
        return y.replace(un, "$&/");
      }
      function lr(y, b) {
        return typeof y == "object" && y !== null && y.key != null ? (ft(y.key), hn("" + y.key)) : b.toString(36);
      }
      function Hr(y, b, F, V, le) {
        var Be = typeof y;
        (Be === "undefined" || Be === "boolean") && (y = null);
        var fe = !1;
        if (y === null)
          fe = !0;
        else
          switch (Be) {
            case "string":
            case "number":
              fe = !0;
              break;
            case "object":
              switch (y.$$typeof) {
                case R:
                case M:
                  fe = !0;
              }
          }
        if (fe) {
          var We = y, Mt = le(We), Wt = V === "" ? pn + lr(We, 0) : V;
          if (Fn(Mt)) {
            var wn = "";
            Wt != null && (wn = Ar(Wt) + "/"), Hr(Mt, b, wn, "", function(ld) {
              return ld;
            });
          } else Mt != null && (en(Mt) && (Mt.key && (!We || We.key !== Mt.key) && ft(Mt.key), Mt = ht(
            Mt,
            // Keep both the (mapped) and old keys if they differ, just as
            // traverseAllChildren used to do for objects as children
            F + // $FlowFixMe Flow incorrectly thinks React.Portal doesn't have a key
            (Mt.key && (!We || We.key !== Mt.key) ? (
              // $FlowFixMe Flow incorrectly thinks existing element's key can be a number
              // eslint-disable-next-line react-internal/safe-string-coercion
              Ar("" + Mt.key) + "/"
            ) : "") + Wt
          )), b.push(Mt));
          return 1;
        }
        var yn, bt, gn = 0, Mn = V === "" ? pn : V + Xn;
        if (Fn(y))
          for (var kl = 0; kl < y.length; kl++)
            yn = y[kl], bt = Mn + lr(yn, kl), gn += Hr(yn, b, F, bt, le);
        else {
          var es = tt(y);
          if (typeof es == "function") {
            var qi = y;
            es === qi.entries && (vn || At("Using Maps as children is not supported. Use an array of keyed ReactElements instead."), vn = !0);
            for (var ts = es.call(qi), po, id = 0; !(po = ts.next()).done; )
              yn = po.value, bt = Mn + lr(yn, id++), gn += Hr(yn, b, F, bt, le);
          } else if (Be === "object") {
            var hc = String(y);
            throw new Error("Objects are not valid as a React child (found: " + (hc === "[object Object]" ? "object with keys {" + Object.keys(y).join(", ") + "}" : hc) + "). If you meant to render a collection of children, use an array instead.");
          }
        }
        return gn;
      }
      function Pr(y, b, F) {
        if (y == null)
          return y;
        var V = [], le = 0;
        return Hr(y, V, "", "", function(Be) {
          return b.call(F, Be, le++);
        }), V;
      }
      function Gi(y) {
        var b = 0;
        return Pr(y, function() {
          b++;
        }), b;
      }
      function Qi(y, b, F) {
        Pr(y, function() {
          b.apply(this, arguments);
        }, F);
      }
      function Ja(y) {
        return Pr(y, function(b) {
          return b;
        }) || [];
      }
      function ei(y) {
        if (!en(y))
          throw new Error("React.Children.only expected to receive a single React element child.");
        return y;
      }
      function gi(y) {
        var b = {
          $$typeof: W,
          // As a workaround to support multiple concurrent renderers, we categorize
          // some renderers as primary and others as secondary. We only expect
          // there to be two concurrent renderers at most: React Native (primary) and
          // Fabric (secondary); React DOM (primary) and React ART (secondary).
          // Secondary renderers store their context values on separate fields.
          _currentValue: y,
          _currentValue2: y,
          // Used to track how many concurrent renderers this context currently
          // supports within in a single renderer. Such as parallel server rendering.
          _threadCount: 0,
          // These are circular
          Provider: null,
          Consumer: null,
          // Add these to use same hidden class in VM as ServerContext
          _defaultValue: null,
          _globalName: null
        };
        b.Provider = {
          $$typeof: Q,
          _context: b
        };
        var F = !1, V = !1, le = !1;
        {
          var Be = {
            $$typeof: W,
            _context: b
          };
          Object.defineProperties(Be, {
            Provider: {
              get: function() {
                return V || (V = !0, Ee("Rendering <Context.Consumer.Provider> is not supported and will be removed in a future major release. Did you mean to render <Context.Provider> instead?")), b.Provider;
              },
              set: function(fe) {
                b.Provider = fe;
              }
            },
            _currentValue: {
              get: function() {
                return b._currentValue;
              },
              set: function(fe) {
                b._currentValue = fe;
              }
            },
            _currentValue2: {
              get: function() {
                return b._currentValue2;
              },
              set: function(fe) {
                b._currentValue2 = fe;
              }
            },
            _threadCount: {
              get: function() {
                return b._threadCount;
              },
              set: function(fe) {
                b._threadCount = fe;
              }
            },
            Consumer: {
              get: function() {
                return F || (F = !0, Ee("Rendering <Context.Consumer.Consumer> is not supported and will be removed in a future major release. Did you mean to render <Context.Consumer> instead?")), b.Consumer;
              }
            },
            displayName: {
              get: function() {
                return b.displayName;
              },
              set: function(fe) {
                le || (At("Setting `displayName` on Context.Consumer has no effect. You should set it directly on the context with Context.displayName = '%s'.", fe), le = !0);
              }
            }
          }), b.Consumer = Be;
        }
        return b._currentRenderer = null, b._currentRenderer2 = null, b;
      }
      var gr = -1, Sr = 0, Kn = 1, Si = 2;
      function ti(y) {
        if (y._status === gr) {
          var b = y._result, F = b();
          if (F.then(function(Be) {
            if (y._status === Sr || y._status === gr) {
              var fe = y;
              fe._status = Kn, fe._result = Be;
            }
          }, function(Be) {
            if (y._status === Sr || y._status === gr) {
              var fe = y;
              fe._status = Si, fe._result = Be;
            }
          }), y._status === gr) {
            var V = y;
            V._status = Sr, V._result = F;
          }
        }
        if (y._status === Kn) {
          var le = y._result;
          return le === void 0 && Ee(`lazy: Expected the result of a dynamic import() call. Instead received: %s

Your code should look like: 
  const MyComponent = lazy(() => import('./MyComponent'))

Did you accidentally put curly braces around the import?`, le), "default" in le || Ee(`lazy: Expected the result of a dynamic import() call. Instead received: %s

Your code should look like: 
  const MyComponent = lazy(() => import('./MyComponent'))`, le), le.default;
        } else
          throw y._result;
      }
      function Ei(y) {
        var b = {
          // We use these fields to store the result.
          _status: gr,
          _result: y
        }, F = {
          $$typeof: Ue,
          _payload: b,
          _init: ti
        };
        {
          var V, le;
          Object.defineProperties(F, {
            defaultProps: {
              configurable: !0,
              get: function() {
                return V;
              },
              set: function(Be) {
                Ee("React.lazy(...): It is not supported to assign `defaultProps` to a lazy component import. Either specify them where the component is defined, or create a wrapping component around it."), V = Be, Object.defineProperty(F, "defaultProps", {
                  enumerable: !0
                });
              }
            },
            propTypes: {
              configurable: !0,
              get: function() {
                return le;
              },
              set: function(Be) {
                Ee("React.lazy(...): It is not supported to assign `propTypes` to a lazy component import. Either specify them where the component is defined, or create a wrapping component around it."), le = Be, Object.defineProperty(F, "propTypes", {
                  enumerable: !0
                });
              }
            }
          });
        }
        return F;
      }
      function Ci(y) {
        y != null && y.$$typeof === oe ? Ee("forwardRef requires a render function but received a `memo` component. Instead of forwardRef(memo(...)), use memo(forwardRef(...)).") : typeof y != "function" ? Ee("forwardRef requires a render function but was given %s.", y === null ? "null" : typeof y) : y.length !== 0 && y.length !== 2 && Ee("forwardRef render functions accept exactly two parameters: props and ref. %s", y.length === 1 ? "Did you forget to use the ref parameter?" : "Any additional parameter will be undefined."), y != null && (y.defaultProps != null || y.propTypes != null) && Ee("forwardRef render functions do not support propTypes or defaultProps. Did you accidentally pass a React component?");
        var b = {
          $$typeof: Z,
          render: y
        };
        {
          var F;
          Object.defineProperty(b, "displayName", {
            enumerable: !1,
            configurable: !0,
            get: function() {
              return F;
            },
            set: function(V) {
              F = V, !y.name && !y.displayName && (y.displayName = V);
            }
          });
        }
        return b;
      }
      var _;
      _ = Symbol.for("react.module.reference");
      function X(y) {
        return !!(typeof y == "string" || typeof y == "function" || y === I || y === de || _t || y === C || y === J || y === se || Ae || y === ct || Pt || dn || nt || typeof y == "object" && y !== null && (y.$$typeof === Ue || y.$$typeof === oe || y.$$typeof === Q || y.$$typeof === W || y.$$typeof === Z || // This needs to include all possible module reference object
        // types supported by any Flight configuration anywhere since
        // we don't know which Flight build this will end up being used
        // with.
        y.$$typeof === _ || y.getModuleId !== void 0));
      }
      function pe(y, b) {
        X(y) || Ee("memo: The first argument must be a component. Instead received: %s", y === null ? "null" : typeof y);
        var F = {
          $$typeof: oe,
          type: y,
          compare: b === void 0 ? null : b
        };
        {
          var V;
          Object.defineProperty(F, "displayName", {
            enumerable: !1,
            configurable: !0,
            get: function() {
              return V;
            },
            set: function(le) {
              V = le, !y.name && !y.displayName && (y.displayName = le);
            }
          });
        }
        return F;
      }
      function we() {
        var y = Ze.current;
        return y === null && Ee(`Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
1. You might have mismatching versions of React and the renderer (such as React DOM)
2. You might be breaking the Rules of Hooks
3. You might have more than one copy of React in the same app
See https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem.`), y;
      }
      function mt(y) {
        var b = we();
        if (y._context !== void 0) {
          var F = y._context;
          F.Consumer === y ? Ee("Calling useContext(Context.Consumer) is not supported, may cause bugs, and will be removed in a future major release. Did you mean to call useContext(Context) instead?") : F.Provider === y && Ee("Calling useContext(Context.Provider) is not supported. Did you mean to call useContext(Context) instead?");
        }
        return b.useContext(y);
      }
      function ut(y) {
        var b = we();
        return b.useState(y);
      }
      function Ot(y, b, F) {
        var V = we();
        return V.useReducer(y, b, F);
      }
      function Dt(y) {
        var b = we();
        return b.useRef(y);
      }
      function Pn(y, b) {
        var F = we();
        return F.useEffect(y, b);
      }
      function Rn(y, b) {
        var F = we();
        return F.useInsertionEffect(y, b);
      }
      function _n(y, b) {
        var F = we();
        return F.useLayoutEffect(y, b);
      }
      function Er(y, b) {
        var F = we();
        return F.useCallback(y, b);
      }
      function ni(y, b) {
        var F = we();
        return F.useMemo(y, b);
      }
      function ri(y, b, F) {
        var V = we();
        return V.useImperativeHandle(y, b, F);
      }
      function yt(y, b) {
        {
          var F = we();
          return F.useDebugValue(y, b);
        }
      }
      function Tt() {
        var y = we();
        return y.useTransition();
      }
      function ai(y) {
        var b = we();
        return b.useDeferredValue(y);
      }
      function lo() {
        var y = we();
        return y.useId();
      }
      function oo(y, b, F) {
        var V = we();
        return V.useSyncExternalStore(y, b, F);
      }
      var Tl = 0, Zo, Rl, aa, Ku, Vr, pc, vc;
      function Jo() {
      }
      Jo.__reactDisabledLog = !0;
      function wl() {
        {
          if (Tl === 0) {
            Zo = console.log, Rl = console.info, aa = console.warn, Ku = console.error, Vr = console.group, pc = console.groupCollapsed, vc = console.groupEnd;
            var y = {
              configurable: !0,
              enumerable: !0,
              value: Jo,
              writable: !0
            };
            Object.defineProperties(console, {
              info: y,
              log: y,
              warn: y,
              error: y,
              group: y,
              groupCollapsed: y,
              groupEnd: y
            });
          }
          Tl++;
        }
      }
      function Ca() {
        {
          if (Tl--, Tl === 0) {
            var y = {
              configurable: !0,
              enumerable: !0,
              writable: !0
            };
            Object.defineProperties(console, {
              log: Y({}, y, {
                value: Zo
              }),
              info: Y({}, y, {
                value: Rl
              }),
              warn: Y({}, y, {
                value: aa
              }),
              error: Y({}, y, {
                value: Ku
              }),
              group: Y({}, y, {
                value: Vr
              }),
              groupCollapsed: Y({}, y, {
                value: pc
              }),
              groupEnd: Y({}, y, {
                value: vc
              })
            });
          }
          Tl < 0 && Ee("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
        }
      }
      var ii = xt.ReactCurrentDispatcher, li;
      function eu(y, b, F) {
        {
          if (li === void 0)
            try {
              throw Error();
            } catch (le) {
              var V = le.stack.trim().match(/\n( *(at )?)/);
              li = V && V[1] || "";
            }
          return `
` + li + y;
        }
      }
      var uo = !1, bl;
      {
        var tu = typeof WeakMap == "function" ? WeakMap : Map;
        bl = new tu();
      }
      function nu(y, b) {
        if (!y || uo)
          return "";
        {
          var F = bl.get(y);
          if (F !== void 0)
            return F;
        }
        var V;
        uo = !0;
        var le = Error.prepareStackTrace;
        Error.prepareStackTrace = void 0;
        var Be;
        Be = ii.current, ii.current = null, wl();
        try {
          if (b) {
            var fe = function() {
              throw Error();
            };
            if (Object.defineProperty(fe.prototype, "props", {
              set: function() {
                throw Error();
              }
            }), typeof Reflect == "object" && Reflect.construct) {
              try {
                Reflect.construct(fe, []);
              } catch (Mn) {
                V = Mn;
              }
              Reflect.construct(y, [], fe);
            } else {
              try {
                fe.call();
              } catch (Mn) {
                V = Mn;
              }
              y.call(fe.prototype);
            }
          } else {
            try {
              throw Error();
            } catch (Mn) {
              V = Mn;
            }
            y();
          }
        } catch (Mn) {
          if (Mn && V && typeof Mn.stack == "string") {
            for (var We = Mn.stack.split(`
`), Mt = V.stack.split(`
`), Wt = We.length - 1, wn = Mt.length - 1; Wt >= 1 && wn >= 0 && We[Wt] !== Mt[wn]; )
              wn--;
            for (; Wt >= 1 && wn >= 0; Wt--, wn--)
              if (We[Wt] !== Mt[wn]) {
                if (Wt !== 1 || wn !== 1)
                  do
                    if (Wt--, wn--, wn < 0 || We[Wt] !== Mt[wn]) {
                      var yn = `
` + We[Wt].replace(" at new ", " at ");
                      return y.displayName && yn.includes("<anonymous>") && (yn = yn.replace("<anonymous>", y.displayName)), typeof y == "function" && bl.set(y, yn), yn;
                    }
                  while (Wt >= 1 && wn >= 0);
                break;
              }
          }
        } finally {
          uo = !1, ii.current = Be, Ca(), Error.prepareStackTrace = le;
        }
        var bt = y ? y.displayName || y.name : "", gn = bt ? eu(bt) : "";
        return typeof y == "function" && bl.set(y, gn), gn;
      }
      function Xi(y, b, F) {
        return nu(y, !1);
      }
      function rd(y) {
        var b = y.prototype;
        return !!(b && b.isReactComponent);
      }
      function Ki(y, b, F) {
        if (y == null)
          return "";
        if (typeof y == "function")
          return nu(y, rd(y));
        if (typeof y == "string")
          return eu(y);
        switch (y) {
          case J:
            return eu("Suspense");
          case se:
            return eu("SuspenseList");
        }
        if (typeof y == "object")
          switch (y.$$typeof) {
            case Z:
              return Xi(y.render);
            case oe:
              return Ki(y.type, b, F);
            case Ue: {
              var V = y, le = V._payload, Be = V._init;
              try {
                return Ki(Be(le), b, F);
              } catch {
              }
            }
          }
        return "";
      }
      var tn = {}, ru = xt.ReactDebugCurrentFrame;
      function Yt(y) {
        if (y) {
          var b = y._owner, F = Ki(y.type, y._source, b ? b.type : null);
          ru.setExtraStackFrame(F);
        } else
          ru.setExtraStackFrame(null);
      }
      function qu(y, b, F, V, le) {
        {
          var Be = Function.call.bind(Rt);
          for (var fe in y)
            if (Be(y, fe)) {
              var We = void 0;
              try {
                if (typeof y[fe] != "function") {
                  var Mt = Error((V || "React class") + ": " + F + " type `" + fe + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof y[fe] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                  throw Mt.name = "Invariant Violation", Mt;
                }
                We = y[fe](b, fe, V, F, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
              } catch (Wt) {
                We = Wt;
              }
              We && !(We instanceof Error) && (Yt(le), Ee("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", V || "React class", F, fe, typeof We), Yt(null)), We instanceof Error && !(We.message in tn) && (tn[We.message] = !0, Yt(le), Ee("Failed %s type: %s", F, We.message), Yt(null));
            }
        }
      }
      function Ti(y) {
        if (y) {
          var b = y._owner, F = Ki(y.type, y._source, b ? b.type : null);
          Gt(F);
        } else
          Gt(null);
      }
      var ot;
      ot = !1;
      function au() {
        if (Le.current) {
          var y = Ct(Le.current.type);
          if (y)
            return `

Check the render method of \`` + y + "`.";
        }
        return "";
      }
      function Cr(y) {
        if (y !== void 0) {
          var b = y.fileName.replace(/^.*[\\\/]/, ""), F = y.lineNumber;
          return `

Check your code at ` + b + ":" + F + ".";
        }
        return "";
      }
      function Ri(y) {
        return y != null ? Cr(y.__source) : "";
      }
      var Br = {};
      function wi(y) {
        var b = au();
        if (!b) {
          var F = typeof y == "string" ? y : y.displayName || y.name;
          F && (b = `

Check the top-level render call using <` + F + ">.");
        }
        return b;
      }
      function xn(y, b) {
        if (!(!y._store || y._store.validated || y.key != null)) {
          y._store.validated = !0;
          var F = wi(b);
          if (!Br[F]) {
            Br[F] = !0;
            var V = "";
            y && y._owner && y._owner !== Le.current && (V = " It was passed a child from " + Ct(y._owner.type) + "."), Ti(y), Ee('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', F, V), Ti(null);
          }
        }
      }
      function mn(y, b) {
        if (typeof y == "object") {
          if (Fn(y))
            for (var F = 0; F < y.length; F++) {
              var V = y[F];
              en(V) && xn(V, b);
            }
          else if (en(y))
            y._store && (y._store.validated = !0);
          else if (y) {
            var le = tt(y);
            if (typeof le == "function" && le !== y.entries)
              for (var Be = le.call(y), fe; !(fe = Be.next()).done; )
                en(fe.value) && xn(fe.value, b);
          }
        }
      }
      function _l(y) {
        {
          var b = y.type;
          if (b == null || typeof b == "string")
            return;
          var F;
          if (typeof b == "function")
            F = b.propTypes;
          else if (typeof b == "object" && (b.$$typeof === Z || // Note: Memo only checks outer props here.
          // Inner props are checked in the reconciler.
          b.$$typeof === oe))
            F = b.propTypes;
          else
            return;
          if (F) {
            var V = Ct(b);
            qu(F, y.props, "prop", V, y);
          } else if (b.PropTypes !== void 0 && !ot) {
            ot = !0;
            var le = Ct(b);
            Ee("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", le || "Unknown");
          }
          typeof b.getDefaultProps == "function" && !b.getDefaultProps.isReactClassApproved && Ee("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
        }
      }
      function or(y) {
        {
          for (var b = Object.keys(y.props), F = 0; F < b.length; F++) {
            var V = b[F];
            if (V !== "children" && V !== "key") {
              Ti(y), Ee("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", V), Ti(null);
              break;
            }
          }
          y.ref !== null && (Ti(y), Ee("Invalid attribute `ref` supplied to `React.Fragment`."), Ti(null));
        }
      }
      function $r(y, b, F) {
        var V = X(y);
        if (!V) {
          var le = "";
          (y === void 0 || typeof y == "object" && y !== null && Object.keys(y).length === 0) && (le += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var Be = Ri(b);
          Be ? le += Be : le += au();
          var fe;
          y === null ? fe = "null" : Fn(y) ? fe = "array" : y !== void 0 && y.$$typeof === R ? (fe = "<" + (Ct(y.type) || "Unknown") + " />", le = " Did you accidentally export a JSX literal instead of a component?") : fe = typeof y, Ee("React.createElement: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", fe, le);
        }
        var We = Oe.apply(this, arguments);
        if (We == null)
          return We;
        if (V)
          for (var Mt = 2; Mt < arguments.length; Mt++)
            mn(arguments[Mt], y);
        return y === I ? or(We) : _l(We), We;
      }
      var Na = !1;
      function so(y) {
        var b = $r.bind(null, y);
        return b.type = y, Na || (Na = !0, At("React.createFactory() is deprecated and will be removed in a future major release. Consider using JSX or use React.createElement() directly instead.")), Object.defineProperty(b, "type", {
          enumerable: !1,
          get: function() {
            return At("Factory.type is deprecated. Access the class directly before passing it to createFactory."), Object.defineProperty(this, "type", {
              value: y
            }), y;
          }
        }), b;
      }
      function Zu(y, b, F) {
        for (var V = Jt.apply(this, arguments), le = 2; le < arguments.length; le++)
          mn(arguments[le], V.type);
        return _l(V), V;
      }
      function Ju(y, b) {
        var F = Je.transition;
        Je.transition = {};
        var V = Je.transition;
        Je.transition._updatedFibers = /* @__PURE__ */ new Set();
        try {
          y();
        } finally {
          if (Je.transition = F, F === null && V._updatedFibers) {
            var le = V._updatedFibers.size;
            le > 10 && At("Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table."), V._updatedFibers.clear();
          }
        }
      }
      var xl = !1, co = null;
      function ad(y) {
        if (co === null)
          try {
            var b = ("require" + Math.random()).slice(0, 7), F = g && g[b];
            co = F.call(g, "timers").setImmediate;
          } catch {
            co = function(le) {
              xl === !1 && (xl = !0, typeof MessageChannel > "u" && Ee("This browser does not have a MessageChannel implementation, so enqueuing tasks via await act(async () => ...) will fail. Please file an issue at https://github.com/facebook/react/issues if you encounter this warning."));
              var Be = new MessageChannel();
              Be.port1.onmessage = le, Be.port2.postMessage(void 0);
            };
          }
        return co(y);
      }
      var Aa = 0, oi = !1;
      function bi(y) {
        {
          var b = Aa;
          Aa++, _e.current === null && (_e.current = []);
          var F = _e.isBatchingLegacy, V;
          try {
            if (_e.isBatchingLegacy = !0, V = y(), !F && _e.didScheduleLegacyUpdate) {
              var le = _e.current;
              le !== null && (_e.didScheduleLegacyUpdate = !1, Dl(le));
            }
          } catch (bt) {
            throw za(b), bt;
          } finally {
            _e.isBatchingLegacy = F;
          }
          if (V !== null && typeof V == "object" && typeof V.then == "function") {
            var Be = V, fe = !1, We = {
              then: function(bt, gn) {
                fe = !0, Be.then(function(Mn) {
                  za(b), Aa === 0 ? iu(Mn, bt, gn) : bt(Mn);
                }, function(Mn) {
                  za(b), gn(Mn);
                });
              }
            };
            return !oi && typeof Promise < "u" && Promise.resolve().then(function() {
            }).then(function() {
              fe || (oi = !0, Ee("You called act(async () => ...) without await. This could lead to unexpected testing behaviour, interleaving multiple act calls and mixing their scopes. You should - await act(async () => ...);"));
            }), We;
          } else {
            var Mt = V;
            if (za(b), Aa === 0) {
              var Wt = _e.current;
              Wt !== null && (Dl(Wt), _e.current = null);
              var wn = {
                then: function(bt, gn) {
                  _e.current === null ? (_e.current = [], iu(Mt, bt, gn)) : bt(Mt);
                }
              };
              return wn;
            } else {
              var yn = {
                then: function(bt, gn) {
                  bt(Mt);
                }
              };
              return yn;
            }
          }
        }
      }
      function za(y) {
        y !== Aa - 1 && Ee("You seem to have overlapping act() calls, this is not supported. Be sure to await previous act() calls before making a new one. "), Aa = y;
      }
      function iu(y, b, F) {
        {
          var V = _e.current;
          if (V !== null)
            try {
              Dl(V), ad(function() {
                V.length === 0 ? (_e.current = null, b(y)) : iu(y, b, F);
              });
            } catch (le) {
              F(le);
            }
          else
            b(y);
        }
      }
      var lu = !1;
      function Dl(y) {
        if (!lu) {
          lu = !0;
          var b = 0;
          try {
            for (; b < y.length; b++) {
              var F = y[b];
              do
                F = F(!0);
              while (F !== null);
            }
            y.length = 0;
          } catch (V) {
            throw y = y.slice(b + 1), V;
          } finally {
            lu = !1;
          }
        }
      }
      var fo = $r, ou = Zu, uu = so, ui = {
        map: Pr,
        forEach: Qi,
        count: Gi,
        toArray: Ja,
        only: ei
      };
      d.Children = ui, d.Component = Fe, d.Fragment = I, d.Profiler = de, d.PureComponent = St, d.StrictMode = C, d.Suspense = J, d.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = xt, d.act = bi, d.cloneElement = ou, d.createContext = gi, d.createElement = fo, d.createFactory = uu, d.createRef = jn, d.forwardRef = Ci, d.isValidElement = en, d.lazy = Ei, d.memo = pe, d.startTransition = Ju, d.unstable_act = bi, d.useCallback = Er, d.useContext = mt, d.useDebugValue = yt, d.useDeferredValue = ai, d.useEffect = Pn, d.useId = lo, d.useImperativeHandle = ri, d.useInsertionEffect = Rn, d.useLayoutEffect = _n, d.useMemo = ni, d.useReducer = Ot, d.useRef = Dt, d.useState = ut, d.useSyncExternalStore = oo, d.useTransition = Tt, d.version = v, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
    })();
  })(cv, cv.exports)), cv.exports;
}
var SR;
function fv() {
  return SR || (SR = 1, process.env.NODE_ENV === "production" ? iy.exports = $D() : iy.exports = ID()), iy.exports;
}
var qt = fv();
const k0 = /* @__PURE__ */ BD(qt);
var Jf = {}, ly = { exports: {} }, qa = {}, oy = { exports: {} }, O0 = {};
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ER;
function YD() {
  return ER || (ER = 1, (function(g) {
    function d(ie, be) {
      var ue = ie.length;
      ie.push(be);
      e: for (; 0 < ue; ) {
        var L = ue - 1 >>> 1, Y = ie[L];
        if (0 < M(Y, be)) ie[L] = be, ie[ue] = Y, ue = L;
        else break e;
      }
    }
    function v(ie) {
      return ie.length === 0 ? null : ie[0];
    }
    function R(ie) {
      if (ie.length === 0) return null;
      var be = ie[0], ue = ie.pop();
      if (ue !== be) {
        ie[0] = ue;
        e: for (var L = 0, Y = ie.length, Ie = Y >>> 1; L < Ie; ) {
          var Fe = 2 * (L + 1) - 1, gt = ie[Fe], pt = Fe + 1, vt = ie[pt];
          if (0 > M(gt, ue)) pt < Y && 0 > M(vt, gt) ? (ie[L] = vt, ie[pt] = ue, L = pt) : (ie[L] = gt, ie[Fe] = ue, L = Fe);
          else if (pt < Y && 0 > M(vt, ue)) ie[L] = vt, ie[pt] = ue, L = pt;
          else break e;
        }
      }
      return be;
    }
    function M(ie, be) {
      var ue = ie.sortIndex - be.sortIndex;
      return ue !== 0 ? ue : ie.id - be.id;
    }
    if (typeof performance == "object" && typeof performance.now == "function") {
      var I = performance;
      g.unstable_now = function() {
        return I.now();
      };
    } else {
      var C = Date, de = C.now();
      g.unstable_now = function() {
        return C.now() - de;
      };
    }
    var Q = [], W = [], Z = 1, J = null, se = 3, oe = !1, Ue = !1, ct = !1, Ke = typeof setTimeout == "function" ? setTimeout : null, jt = typeof clearTimeout == "function" ? clearTimeout : null, tt = typeof setImmediate < "u" ? setImmediate : null;
    typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
    function Ze(ie) {
      for (var be = v(W); be !== null; ) {
        if (be.callback === null) R(W);
        else if (be.startTime <= ie) R(W), be.sortIndex = be.expirationTime, d(Q, be);
        else break;
        be = v(W);
      }
    }
    function Je(ie) {
      if (ct = !1, Ze(ie), !Ue) if (v(Q) !== null) Ue = !0, At(_e);
      else {
        var be = v(W);
        be !== null && Ee(Je, be.startTime - ie);
      }
    }
    function _e(ie, be) {
      Ue = !1, ct && (ct = !1, jt(sn), sn = -1), oe = !0;
      var ue = se;
      try {
        for (Ze(be), J = v(Q); J !== null && (!(J.expirationTime > be) || ie && !dn()); ) {
          var L = J.callback;
          if (typeof L == "function") {
            J.callback = null, se = J.priorityLevel;
            var Y = L(J.expirationTime <= be);
            be = g.unstable_now(), typeof Y == "function" ? J.callback = Y : J === v(Q) && R(Q), Ze(be);
          } else R(Q);
          J = v(Q);
        }
        if (J !== null) var Ie = !0;
        else {
          var Fe = v(W);
          Fe !== null && Ee(Je, Fe.startTime - be), Ie = !1;
        }
        return Ie;
      } finally {
        J = null, se = ue, oe = !1;
      }
    }
    var Le = !1, je = null, sn = -1, Gt = 5, Pt = -1;
    function dn() {
      return !(g.unstable_now() - Pt < Gt);
    }
    function nt() {
      if (je !== null) {
        var ie = g.unstable_now();
        Pt = ie;
        var be = !0;
        try {
          be = je(!0, ie);
        } finally {
          be ? Ae() : (Le = !1, je = null);
        }
      } else Le = !1;
    }
    var Ae;
    if (typeof tt == "function") Ae = function() {
      tt(nt);
    };
    else if (typeof MessageChannel < "u") {
      var _t = new MessageChannel(), xt = _t.port2;
      _t.port1.onmessage = nt, Ae = function() {
        xt.postMessage(null);
      };
    } else Ae = function() {
      Ke(nt, 0);
    };
    function At(ie) {
      je = ie, Le || (Le = !0, Ae());
    }
    function Ee(ie, be) {
      sn = Ke(function() {
        ie(g.unstable_now());
      }, be);
    }
    g.unstable_IdlePriority = 5, g.unstable_ImmediatePriority = 1, g.unstable_LowPriority = 4, g.unstable_NormalPriority = 3, g.unstable_Profiling = null, g.unstable_UserBlockingPriority = 2, g.unstable_cancelCallback = function(ie) {
      ie.callback = null;
    }, g.unstable_continueExecution = function() {
      Ue || oe || (Ue = !0, At(_e));
    }, g.unstable_forceFrameRate = function(ie) {
      0 > ie || 125 < ie ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : Gt = 0 < ie ? Math.floor(1e3 / ie) : 5;
    }, g.unstable_getCurrentPriorityLevel = function() {
      return se;
    }, g.unstable_getFirstCallbackNode = function() {
      return v(Q);
    }, g.unstable_next = function(ie) {
      switch (se) {
        case 1:
        case 2:
        case 3:
          var be = 3;
          break;
        default:
          be = se;
      }
      var ue = se;
      se = be;
      try {
        return ie();
      } finally {
        se = ue;
      }
    }, g.unstable_pauseExecution = function() {
    }, g.unstable_requestPaint = function() {
    }, g.unstable_runWithPriority = function(ie, be) {
      switch (ie) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          ie = 3;
      }
      var ue = se;
      se = ie;
      try {
        return be();
      } finally {
        se = ue;
      }
    }, g.unstable_scheduleCallback = function(ie, be, ue) {
      var L = g.unstable_now();
      switch (typeof ue == "object" && ue !== null ? (ue = ue.delay, ue = typeof ue == "number" && 0 < ue ? L + ue : L) : ue = L, ie) {
        case 1:
          var Y = -1;
          break;
        case 2:
          Y = 250;
          break;
        case 5:
          Y = 1073741823;
          break;
        case 4:
          Y = 1e4;
          break;
        default:
          Y = 5e3;
      }
      return Y = ue + Y, ie = { id: Z++, callback: be, priorityLevel: ie, startTime: ue, expirationTime: Y, sortIndex: -1 }, ue > L ? (ie.sortIndex = ue, d(W, ie), v(Q) === null && ie === v(W) && (ct ? (jt(sn), sn = -1) : ct = !0, Ee(Je, ue - L))) : (ie.sortIndex = Y, d(Q, ie), Ue || oe || (Ue = !0, At(_e))), ie;
    }, g.unstable_shouldYield = dn, g.unstable_wrapCallback = function(ie) {
      var be = se;
      return function() {
        var ue = se;
        se = be;
        try {
          return ie.apply(this, arguments);
        } finally {
          se = ue;
        }
      };
    };
  })(O0)), O0;
}
var M0 = {};
/**
 * @license React
 * scheduler.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var CR;
function WD() {
  return CR || (CR = 1, (function(g) {
    process.env.NODE_ENV !== "production" && (function() {
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error());
      var d = !1, v = 5;
      function R(ne, me) {
        var Oe = ne.length;
        ne.push(me), C(ne, me, Oe);
      }
      function M(ne) {
        return ne.length === 0 ? null : ne[0];
      }
      function I(ne) {
        if (ne.length === 0)
          return null;
        var me = ne[0], Oe = ne.pop();
        return Oe !== me && (ne[0] = Oe, de(ne, Oe, 0)), me;
      }
      function C(ne, me, Oe) {
        for (var ht = Oe; ht > 0; ) {
          var Jt = ht - 1 >>> 1, en = ne[Jt];
          if (Q(en, me) > 0)
            ne[Jt] = me, ne[ht] = en, ht = Jt;
          else
            return;
        }
      }
      function de(ne, me, Oe) {
        for (var ht = Oe, Jt = ne.length, en = Jt >>> 1; ht < en; ) {
          var pn = (ht + 1) * 2 - 1, Xn = ne[pn], hn = pn + 1, vn = ne[hn];
          if (Q(Xn, me) < 0)
            hn < Jt && Q(vn, Xn) < 0 ? (ne[ht] = vn, ne[hn] = me, ht = hn) : (ne[ht] = Xn, ne[pn] = me, ht = pn);
          else if (hn < Jt && Q(vn, me) < 0)
            ne[ht] = vn, ne[hn] = me, ht = hn;
          else
            return;
        }
      }
      function Q(ne, me) {
        var Oe = ne.sortIndex - me.sortIndex;
        return Oe !== 0 ? Oe : ne.id - me.id;
      }
      var W = 1, Z = 2, J = 3, se = 4, oe = 5;
      function Ue(ne, me) {
      }
      var ct = typeof performance == "object" && typeof performance.now == "function";
      if (ct) {
        var Ke = performance;
        g.unstable_now = function() {
          return Ke.now();
        };
      } else {
        var jt = Date, tt = jt.now();
        g.unstable_now = function() {
          return jt.now() - tt;
        };
      }
      var Ze = 1073741823, Je = -1, _e = 250, Le = 5e3, je = 1e4, sn = Ze, Gt = [], Pt = [], dn = 1, nt = null, Ae = J, _t = !1, xt = !1, At = !1, Ee = typeof setTimeout == "function" ? setTimeout : null, ie = typeof clearTimeout == "function" ? clearTimeout : null, be = typeof setImmediate < "u" ? setImmediate : null;
      typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
      function ue(ne) {
        for (var me = M(Pt); me !== null; ) {
          if (me.callback === null)
            I(Pt);
          else if (me.startTime <= ne)
            I(Pt), me.sortIndex = me.expirationTime, R(Gt, me);
          else
            return;
          me = M(Pt);
        }
      }
      function L(ne) {
        if (At = !1, ue(ne), !xt)
          if (M(Gt) !== null)
            xt = !0, it(Y);
          else {
            var me = M(Pt);
            me !== null && lt(L, me.startTime - ne);
          }
      }
      function Y(ne, me) {
        xt = !1, At && (At = !1, Zt()), _t = !0;
        var Oe = Ae;
        try {
          var ht;
          if (!d) return Ie(ne, me);
        } finally {
          nt = null, Ae = Oe, _t = !1;
        }
      }
      function Ie(ne, me) {
        var Oe = me;
        for (ue(Oe), nt = M(Gt); nt !== null && !(nt.expirationTime > Oe && (!ne || Lt())); ) {
          var ht = nt.callback;
          if (typeof ht == "function") {
            nt.callback = null, Ae = nt.priorityLevel;
            var Jt = nt.expirationTime <= Oe, en = ht(Jt);
            Oe = g.unstable_now(), typeof en == "function" ? nt.callback = en : nt === M(Gt) && I(Gt), ue(Oe);
          } else
            I(Gt);
          nt = M(Gt);
        }
        if (nt !== null)
          return !0;
        var pn = M(Pt);
        return pn !== null && lt(L, pn.startTime - Oe), !1;
      }
      function Fe(ne, me) {
        switch (ne) {
          case W:
          case Z:
          case J:
          case se:
          case oe:
            break;
          default:
            ne = J;
        }
        var Oe = Ae;
        Ae = ne;
        try {
          return me();
        } finally {
          Ae = Oe;
        }
      }
      function gt(ne) {
        var me;
        switch (Ae) {
          case W:
          case Z:
          case J:
            me = J;
            break;
          default:
            me = Ae;
            break;
        }
        var Oe = Ae;
        Ae = me;
        try {
          return ne();
        } finally {
          Ae = Oe;
        }
      }
      function pt(ne) {
        var me = Ae;
        return function() {
          var Oe = Ae;
          Ae = me;
          try {
            return ne.apply(this, arguments);
          } finally {
            Ae = Oe;
          }
        };
      }
      function vt(ne, me, Oe) {
        var ht = g.unstable_now(), Jt;
        if (typeof Oe == "object" && Oe !== null) {
          var en = Oe.delay;
          typeof en == "number" && en > 0 ? Jt = ht + en : Jt = ht;
        } else
          Jt = ht;
        var pn;
        switch (ne) {
          case W:
            pn = Je;
            break;
          case Z:
            pn = _e;
            break;
          case oe:
            pn = sn;
            break;
          case se:
            pn = je;
            break;
          case J:
          default:
            pn = Le;
            break;
        }
        var Xn = Jt + pn, hn = {
          id: dn++,
          callback: me,
          priorityLevel: ne,
          startTime: Jt,
          expirationTime: Xn,
          sortIndex: -1
        };
        return Jt > ht ? (hn.sortIndex = Jt, R(Pt, hn), M(Gt) === null && hn === M(Pt) && (At ? Zt() : At = !0, lt(L, Jt - ht))) : (hn.sortIndex = Xn, R(Gt, hn), !xt && !_t && (xt = !0, it(Y))), hn;
      }
      function rt() {
      }
      function St() {
        !xt && !_t && (xt = !0, it(Y));
      }
      function Qt() {
        return M(Gt);
      }
      function jn(ne) {
        ne.callback = null;
      }
      function Qn() {
        return Ae;
      }
      var Fn = !1, Ce = null, Ve = -1, Qe = v, ft = -1;
      function Lt() {
        var ne = g.unstable_now() - ft;
        return !(ne < Qe);
      }
      function zt() {
      }
      function Ct(ne) {
        if (ne < 0 || ne > 125) {
          console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported");
          return;
        }
        ne > 0 ? Qe = Math.floor(1e3 / ne) : Qe = v;
      }
      var Rt = function() {
        if (Ce !== null) {
          var ne = g.unstable_now();
          ft = ne;
          var me = !0, Oe = !0;
          try {
            Oe = Ce(me, ne);
          } finally {
            Oe ? Nt() : (Fn = !1, Ce = null);
          }
        } else
          Fn = !1;
      }, Nt;
      if (typeof be == "function")
        Nt = function() {
          be(Rt);
        };
      else if (typeof MessageChannel < "u") {
        var wt = new MessageChannel(), Xt = wt.port2;
        wt.port1.onmessage = Rt, Nt = function() {
          Xt.postMessage(null);
        };
      } else
        Nt = function() {
          Ee(Rt, 0);
        };
      function it(ne) {
        Ce = ne, Fn || (Fn = !0, Nt());
      }
      function lt(ne, me) {
        Ve = Ee(function() {
          ne(g.unstable_now());
        }, me);
      }
      function Zt() {
        ie(Ve), Ve = -1;
      }
      var Ft = zt, Xe = null;
      g.unstable_IdlePriority = oe, g.unstable_ImmediatePriority = W, g.unstable_LowPriority = se, g.unstable_NormalPriority = J, g.unstable_Profiling = Xe, g.unstable_UserBlockingPriority = Z, g.unstable_cancelCallback = jn, g.unstable_continueExecution = St, g.unstable_forceFrameRate = Ct, g.unstable_getCurrentPriorityLevel = Qn, g.unstable_getFirstCallbackNode = Qt, g.unstable_next = gt, g.unstable_pauseExecution = rt, g.unstable_requestPaint = Ft, g.unstable_runWithPriority = Fe, g.unstable_scheduleCallback = vt, g.unstable_shouldYield = Lt, g.unstable_wrapCallback = pt, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
    })();
  })(M0)), M0;
}
var TR;
function WR() {
  return TR || (TR = 1, process.env.NODE_ENV === "production" ? oy.exports = YD() : oy.exports = WD()), oy.exports;
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
var RR;
function GD() {
  if (RR) return qa;
  RR = 1;
  var g = fv(), d = WR();
  function v(n) {
    for (var r = "https://reactjs.org/docs/error-decoder.html?invariant=" + n, l = 1; l < arguments.length; l++) r += "&args[]=" + encodeURIComponent(arguments[l]);
    return "Minified React error #" + n + "; visit " + r + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  var R = /* @__PURE__ */ new Set(), M = {};
  function I(n, r) {
    C(n, r), C(n + "Capture", r);
  }
  function C(n, r) {
    for (M[n] = r, n = 0; n < r.length; n++) R.add(r[n]);
  }
  var de = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), Q = Object.prototype.hasOwnProperty, W = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, Z = {}, J = {};
  function se(n) {
    return Q.call(J, n) ? !0 : Q.call(Z, n) ? !1 : W.test(n) ? J[n] = !0 : (Z[n] = !0, !1);
  }
  function oe(n, r, l, u) {
    if (l !== null && l.type === 0) return !1;
    switch (typeof r) {
      case "function":
      case "symbol":
        return !0;
      case "boolean":
        return u ? !1 : l !== null ? !l.acceptsBooleans : (n = n.toLowerCase().slice(0, 5), n !== "data-" && n !== "aria-");
      default:
        return !1;
    }
  }
  function Ue(n, r, l, u) {
    if (r === null || typeof r > "u" || oe(n, r, l, u)) return !0;
    if (u) return !1;
    if (l !== null) switch (l.type) {
      case 3:
        return !r;
      case 4:
        return r === !1;
      case 5:
        return isNaN(r);
      case 6:
        return isNaN(r) || 1 > r;
    }
    return !1;
  }
  function ct(n, r, l, u, c, p, S) {
    this.acceptsBooleans = r === 2 || r === 3 || r === 4, this.attributeName = u, this.attributeNamespace = c, this.mustUseProperty = l, this.propertyName = n, this.type = r, this.sanitizeURL = p, this.removeEmptyString = S;
  }
  var Ke = {};
  "children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(n) {
    Ke[n] = new ct(n, 0, !1, n, null, !1, !1);
  }), [["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(n) {
    var r = n[0];
    Ke[r] = new ct(r, 1, !1, n[1], null, !1, !1);
  }), ["contentEditable", "draggable", "spellCheck", "value"].forEach(function(n) {
    Ke[n] = new ct(n, 2, !1, n.toLowerCase(), null, !1, !1);
  }), ["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(n) {
    Ke[n] = new ct(n, 2, !1, n, null, !1, !1);
  }), "allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(n) {
    Ke[n] = new ct(n, 3, !1, n.toLowerCase(), null, !1, !1);
  }), ["checked", "multiple", "muted", "selected"].forEach(function(n) {
    Ke[n] = new ct(n, 3, !0, n, null, !1, !1);
  }), ["capture", "download"].forEach(function(n) {
    Ke[n] = new ct(n, 4, !1, n, null, !1, !1);
  }), ["cols", "rows", "size", "span"].forEach(function(n) {
    Ke[n] = new ct(n, 6, !1, n, null, !1, !1);
  }), ["rowSpan", "start"].forEach(function(n) {
    Ke[n] = new ct(n, 5, !1, n.toLowerCase(), null, !1, !1);
  });
  var jt = /[\-:]([a-z])/g;
  function tt(n) {
    return n[1].toUpperCase();
  }
  "accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(n) {
    var r = n.replace(
      jt,
      tt
    );
    Ke[r] = new ct(r, 1, !1, n, null, !1, !1);
  }), "xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(n) {
    var r = n.replace(jt, tt);
    Ke[r] = new ct(r, 1, !1, n, "http://www.w3.org/1999/xlink", !1, !1);
  }), ["xml:base", "xml:lang", "xml:space"].forEach(function(n) {
    var r = n.replace(jt, tt);
    Ke[r] = new ct(r, 1, !1, n, "http://www.w3.org/XML/1998/namespace", !1, !1);
  }), ["tabIndex", "crossOrigin"].forEach(function(n) {
    Ke[n] = new ct(n, 1, !1, n.toLowerCase(), null, !1, !1);
  }), Ke.xlinkHref = new ct("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0, !1), ["src", "href", "action", "formAction"].forEach(function(n) {
    Ke[n] = new ct(n, 1, !1, n.toLowerCase(), null, !0, !0);
  });
  function Ze(n, r, l, u) {
    var c = Ke.hasOwnProperty(r) ? Ke[r] : null;
    (c !== null ? c.type !== 0 : u || !(2 < r.length) || r[0] !== "o" && r[0] !== "O" || r[1] !== "n" && r[1] !== "N") && (Ue(r, l, c, u) && (l = null), u || c === null ? se(r) && (l === null ? n.removeAttribute(r) : n.setAttribute(r, "" + l)) : c.mustUseProperty ? n[c.propertyName] = l === null ? c.type === 3 ? !1 : "" : l : (r = c.attributeName, u = c.attributeNamespace, l === null ? n.removeAttribute(r) : (c = c.type, l = c === 3 || c === 4 && l === !0 ? "" : "" + l, u ? n.setAttributeNS(u, r, l) : n.setAttribute(r, l))));
  }
  var Je = g.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, _e = Symbol.for("react.element"), Le = Symbol.for("react.portal"), je = Symbol.for("react.fragment"), sn = Symbol.for("react.strict_mode"), Gt = Symbol.for("react.profiler"), Pt = Symbol.for("react.provider"), dn = Symbol.for("react.context"), nt = Symbol.for("react.forward_ref"), Ae = Symbol.for("react.suspense"), _t = Symbol.for("react.suspense_list"), xt = Symbol.for("react.memo"), At = Symbol.for("react.lazy"), Ee = Symbol.for("react.offscreen"), ie = Symbol.iterator;
  function be(n) {
    return n === null || typeof n != "object" ? null : (n = ie && n[ie] || n["@@iterator"], typeof n == "function" ? n : null);
  }
  var ue = Object.assign, L;
  function Y(n) {
    if (L === void 0) try {
      throw Error();
    } catch (l) {
      var r = l.stack.trim().match(/\n( *(at )?)/);
      L = r && r[1] || "";
    }
    return `
` + L + n;
  }
  var Ie = !1;
  function Fe(n, r) {
    if (!n || Ie) return "";
    Ie = !0;
    var l = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      if (r) if (r = function() {
        throw Error();
      }, Object.defineProperty(r.prototype, "props", { set: function() {
        throw Error();
      } }), typeof Reflect == "object" && Reflect.construct) {
        try {
          Reflect.construct(r, []);
        } catch (H) {
          var u = H;
        }
        Reflect.construct(n, [], r);
      } else {
        try {
          r.call();
        } catch (H) {
          u = H;
        }
        n.call(r.prototype);
      }
      else {
        try {
          throw Error();
        } catch (H) {
          u = H;
        }
        n();
      }
    } catch (H) {
      if (H && u && typeof H.stack == "string") {
        for (var c = H.stack.split(`
`), p = u.stack.split(`
`), S = c.length - 1, w = p.length - 1; 1 <= S && 0 <= w && c[S] !== p[w]; ) w--;
        for (; 1 <= S && 0 <= w; S--, w--) if (c[S] !== p[w]) {
          if (S !== 1 || w !== 1)
            do
              if (S--, w--, 0 > w || c[S] !== p[w]) {
                var x = `
` + c[S].replace(" at new ", " at ");
                return n.displayName && x.includes("<anonymous>") && (x = x.replace("<anonymous>", n.displayName)), x;
              }
            while (1 <= S && 0 <= w);
          break;
        }
      }
    } finally {
      Ie = !1, Error.prepareStackTrace = l;
    }
    return (n = n ? n.displayName || n.name : "") ? Y(n) : "";
  }
  function gt(n) {
    switch (n.tag) {
      case 5:
        return Y(n.type);
      case 16:
        return Y("Lazy");
      case 13:
        return Y("Suspense");
      case 19:
        return Y("SuspenseList");
      case 0:
      case 2:
      case 15:
        return n = Fe(n.type, !1), n;
      case 11:
        return n = Fe(n.type.render, !1), n;
      case 1:
        return n = Fe(n.type, !0), n;
      default:
        return "";
    }
  }
  function pt(n) {
    if (n == null) return null;
    if (typeof n == "function") return n.displayName || n.name || null;
    if (typeof n == "string") return n;
    switch (n) {
      case je:
        return "Fragment";
      case Le:
        return "Portal";
      case Gt:
        return "Profiler";
      case sn:
        return "StrictMode";
      case Ae:
        return "Suspense";
      case _t:
        return "SuspenseList";
    }
    if (typeof n == "object") switch (n.$$typeof) {
      case dn:
        return (n.displayName || "Context") + ".Consumer";
      case Pt:
        return (n._context.displayName || "Context") + ".Provider";
      case nt:
        var r = n.render;
        return n = n.displayName, n || (n = r.displayName || r.name || "", n = n !== "" ? "ForwardRef(" + n + ")" : "ForwardRef"), n;
      case xt:
        return r = n.displayName || null, r !== null ? r : pt(n.type) || "Memo";
      case At:
        r = n._payload, n = n._init;
        try {
          return pt(n(r));
        } catch {
        }
    }
    return null;
  }
  function vt(n) {
    var r = n.type;
    switch (n.tag) {
      case 24:
        return "Cache";
      case 9:
        return (r.displayName || "Context") + ".Consumer";
      case 10:
        return (r._context.displayName || "Context") + ".Provider";
      case 18:
        return "DehydratedFragment";
      case 11:
        return n = r.render, n = n.displayName || n.name || "", r.displayName || (n !== "" ? "ForwardRef(" + n + ")" : "ForwardRef");
      case 7:
        return "Fragment";
      case 5:
        return r;
      case 4:
        return "Portal";
      case 3:
        return "Root";
      case 6:
        return "Text";
      case 16:
        return pt(r);
      case 8:
        return r === sn ? "StrictMode" : "Mode";
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
        if (typeof r == "function") return r.displayName || r.name || null;
        if (typeof r == "string") return r;
    }
    return null;
  }
  function rt(n) {
    switch (typeof n) {
      case "boolean":
      case "number":
      case "string":
      case "undefined":
        return n;
      case "object":
        return n;
      default:
        return "";
    }
  }
  function St(n) {
    var r = n.type;
    return (n = n.nodeName) && n.toLowerCase() === "input" && (r === "checkbox" || r === "radio");
  }
  function Qt(n) {
    var r = St(n) ? "checked" : "value", l = Object.getOwnPropertyDescriptor(n.constructor.prototype, r), u = "" + n[r];
    if (!n.hasOwnProperty(r) && typeof l < "u" && typeof l.get == "function" && typeof l.set == "function") {
      var c = l.get, p = l.set;
      return Object.defineProperty(n, r, { configurable: !0, get: function() {
        return c.call(this);
      }, set: function(S) {
        u = "" + S, p.call(this, S);
      } }), Object.defineProperty(n, r, { enumerable: l.enumerable }), { getValue: function() {
        return u;
      }, setValue: function(S) {
        u = "" + S;
      }, stopTracking: function() {
        n._valueTracker = null, delete n[r];
      } };
    }
  }
  function jn(n) {
    n._valueTracker || (n._valueTracker = Qt(n));
  }
  function Qn(n) {
    if (!n) return !1;
    var r = n._valueTracker;
    if (!r) return !0;
    var l = r.getValue(), u = "";
    return n && (u = St(n) ? n.checked ? "true" : "false" : n.value), n = u, n !== l ? (r.setValue(n), !0) : !1;
  }
  function Fn(n) {
    if (n = n || (typeof document < "u" ? document : void 0), typeof n > "u") return null;
    try {
      return n.activeElement || n.body;
    } catch {
      return n.body;
    }
  }
  function Ce(n, r) {
    var l = r.checked;
    return ue({}, r, { defaultChecked: void 0, defaultValue: void 0, value: void 0, checked: l ?? n._wrapperState.initialChecked });
  }
  function Ve(n, r) {
    var l = r.defaultValue == null ? "" : r.defaultValue, u = r.checked != null ? r.checked : r.defaultChecked;
    l = rt(r.value != null ? r.value : l), n._wrapperState = { initialChecked: u, initialValue: l, controlled: r.type === "checkbox" || r.type === "radio" ? r.checked != null : r.value != null };
  }
  function Qe(n, r) {
    r = r.checked, r != null && Ze(n, "checked", r, !1);
  }
  function ft(n, r) {
    Qe(n, r);
    var l = rt(r.value), u = r.type;
    if (l != null) u === "number" ? (l === 0 && n.value === "" || n.value != l) && (n.value = "" + l) : n.value !== "" + l && (n.value = "" + l);
    else if (u === "submit" || u === "reset") {
      n.removeAttribute("value");
      return;
    }
    r.hasOwnProperty("value") ? zt(n, r.type, l) : r.hasOwnProperty("defaultValue") && zt(n, r.type, rt(r.defaultValue)), r.checked == null && r.defaultChecked != null && (n.defaultChecked = !!r.defaultChecked);
  }
  function Lt(n, r, l) {
    if (r.hasOwnProperty("value") || r.hasOwnProperty("defaultValue")) {
      var u = r.type;
      if (!(u !== "submit" && u !== "reset" || r.value !== void 0 && r.value !== null)) return;
      r = "" + n._wrapperState.initialValue, l || r === n.value || (n.value = r), n.defaultValue = r;
    }
    l = n.name, l !== "" && (n.name = ""), n.defaultChecked = !!n._wrapperState.initialChecked, l !== "" && (n.name = l);
  }
  function zt(n, r, l) {
    (r !== "number" || Fn(n.ownerDocument) !== n) && (l == null ? n.defaultValue = "" + n._wrapperState.initialValue : n.defaultValue !== "" + l && (n.defaultValue = "" + l));
  }
  var Ct = Array.isArray;
  function Rt(n, r, l, u) {
    if (n = n.options, r) {
      r = {};
      for (var c = 0; c < l.length; c++) r["$" + l[c]] = !0;
      for (l = 0; l < n.length; l++) c = r.hasOwnProperty("$" + n[l].value), n[l].selected !== c && (n[l].selected = c), c && u && (n[l].defaultSelected = !0);
    } else {
      for (l = "" + rt(l), r = null, c = 0; c < n.length; c++) {
        if (n[c].value === l) {
          n[c].selected = !0, u && (n[c].defaultSelected = !0);
          return;
        }
        r !== null || n[c].disabled || (r = n[c]);
      }
      r !== null && (r.selected = !0);
    }
  }
  function Nt(n, r) {
    if (r.dangerouslySetInnerHTML != null) throw Error(v(91));
    return ue({}, r, { value: void 0, defaultValue: void 0, children: "" + n._wrapperState.initialValue });
  }
  function wt(n, r) {
    var l = r.value;
    if (l == null) {
      if (l = r.children, r = r.defaultValue, l != null) {
        if (r != null) throw Error(v(92));
        if (Ct(l)) {
          if (1 < l.length) throw Error(v(93));
          l = l[0];
        }
        r = l;
      }
      r == null && (r = ""), l = r;
    }
    n._wrapperState = { initialValue: rt(l) };
  }
  function Xt(n, r) {
    var l = rt(r.value), u = rt(r.defaultValue);
    l != null && (l = "" + l, l !== n.value && (n.value = l), r.defaultValue == null && n.defaultValue !== l && (n.defaultValue = l)), u != null && (n.defaultValue = "" + u);
  }
  function it(n) {
    var r = n.textContent;
    r === n._wrapperState.initialValue && r !== "" && r !== null && (n.value = r);
  }
  function lt(n) {
    switch (n) {
      case "svg":
        return "http://www.w3.org/2000/svg";
      case "math":
        return "http://www.w3.org/1998/Math/MathML";
      default:
        return "http://www.w3.org/1999/xhtml";
    }
  }
  function Zt(n, r) {
    return n == null || n === "http://www.w3.org/1999/xhtml" ? lt(r) : n === "http://www.w3.org/2000/svg" && r === "foreignObject" ? "http://www.w3.org/1999/xhtml" : n;
  }
  var Ft, Xe = (function(n) {
    return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction ? function(r, l, u, c) {
      MSApp.execUnsafeLocalFunction(function() {
        return n(r, l, u, c);
      });
    } : n;
  })(function(n, r) {
    if (n.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in n) n.innerHTML = r;
    else {
      for (Ft = Ft || document.createElement("div"), Ft.innerHTML = "<svg>" + r.valueOf().toString() + "</svg>", r = Ft.firstChild; n.firstChild; ) n.removeChild(n.firstChild);
      for (; r.firstChild; ) n.appendChild(r.firstChild);
    }
  });
  function ne(n, r) {
    if (r) {
      var l = n.firstChild;
      if (l && l === n.lastChild && l.nodeType === 3) {
        l.nodeValue = r;
        return;
      }
    }
    n.textContent = r;
  }
  var me = {
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
  }, Oe = ["Webkit", "ms", "Moz", "O"];
  Object.keys(me).forEach(function(n) {
    Oe.forEach(function(r) {
      r = r + n.charAt(0).toUpperCase() + n.substring(1), me[r] = me[n];
    });
  });
  function ht(n, r, l) {
    return r == null || typeof r == "boolean" || r === "" ? "" : l || typeof r != "number" || r === 0 || me.hasOwnProperty(n) && me[n] ? ("" + r).trim() : r + "px";
  }
  function Jt(n, r) {
    n = n.style;
    for (var l in r) if (r.hasOwnProperty(l)) {
      var u = l.indexOf("--") === 0, c = ht(l, r[l], u);
      l === "float" && (l = "cssFloat"), u ? n.setProperty(l, c) : n[l] = c;
    }
  }
  var en = ue({ menuitem: !0 }, { area: !0, base: !0, br: !0, col: !0, embed: !0, hr: !0, img: !0, input: !0, keygen: !0, link: !0, meta: !0, param: !0, source: !0, track: !0, wbr: !0 });
  function pn(n, r) {
    if (r) {
      if (en[n] && (r.children != null || r.dangerouslySetInnerHTML != null)) throw Error(v(137, n));
      if (r.dangerouslySetInnerHTML != null) {
        if (r.children != null) throw Error(v(60));
        if (typeof r.dangerouslySetInnerHTML != "object" || !("__html" in r.dangerouslySetInnerHTML)) throw Error(v(61));
      }
      if (r.style != null && typeof r.style != "object") throw Error(v(62));
    }
  }
  function Xn(n, r) {
    if (n.indexOf("-") === -1) return typeof r.is == "string";
    switch (n) {
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
  var hn = null;
  function vn(n) {
    return n = n.target || n.srcElement || window, n.correspondingUseElement && (n = n.correspondingUseElement), n.nodeType === 3 ? n.parentNode : n;
  }
  var un = null, Ar = null, lr = null;
  function Hr(n) {
    if (n = He(n)) {
      if (typeof un != "function") throw Error(v(280));
      var r = n.stateNode;
      r && (r = Ln(r), un(n.stateNode, n.type, r));
    }
  }
  function Pr(n) {
    Ar ? lr ? lr.push(n) : lr = [n] : Ar = n;
  }
  function Gi() {
    if (Ar) {
      var n = Ar, r = lr;
      if (lr = Ar = null, Hr(n), r) for (n = 0; n < r.length; n++) Hr(r[n]);
    }
  }
  function Qi(n, r) {
    return n(r);
  }
  function Ja() {
  }
  var ei = !1;
  function gi(n, r, l) {
    if (ei) return n(r, l);
    ei = !0;
    try {
      return Qi(n, r, l);
    } finally {
      ei = !1, (Ar !== null || lr !== null) && (Ja(), Gi());
    }
  }
  function gr(n, r) {
    var l = n.stateNode;
    if (l === null) return null;
    var u = Ln(l);
    if (u === null) return null;
    l = u[r];
    e: switch (r) {
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
        (u = !u.disabled) || (n = n.type, u = !(n === "button" || n === "input" || n === "select" || n === "textarea")), n = !u;
        break e;
      default:
        n = !1;
    }
    if (n) return null;
    if (l && typeof l != "function") throw Error(v(231, r, typeof l));
    return l;
  }
  var Sr = !1;
  if (de) try {
    var Kn = {};
    Object.defineProperty(Kn, "passive", { get: function() {
      Sr = !0;
    } }), window.addEventListener("test", Kn, Kn), window.removeEventListener("test", Kn, Kn);
  } catch {
    Sr = !1;
  }
  function Si(n, r, l, u, c, p, S, w, x) {
    var H = Array.prototype.slice.call(arguments, 3);
    try {
      r.apply(l, H);
    } catch (ee) {
      this.onError(ee);
    }
  }
  var ti = !1, Ei = null, Ci = !1, _ = null, X = { onError: function(n) {
    ti = !0, Ei = n;
  } };
  function pe(n, r, l, u, c, p, S, w, x) {
    ti = !1, Ei = null, Si.apply(X, arguments);
  }
  function we(n, r, l, u, c, p, S, w, x) {
    if (pe.apply(this, arguments), ti) {
      if (ti) {
        var H = Ei;
        ti = !1, Ei = null;
      } else throw Error(v(198));
      Ci || (Ci = !0, _ = H);
    }
  }
  function mt(n) {
    var r = n, l = n;
    if (n.alternate) for (; r.return; ) r = r.return;
    else {
      n = r;
      do
        r = n, (r.flags & 4098) !== 0 && (l = r.return), n = r.return;
      while (n);
    }
    return r.tag === 3 ? l : null;
  }
  function ut(n) {
    if (n.tag === 13) {
      var r = n.memoizedState;
      if (r === null && (n = n.alternate, n !== null && (r = n.memoizedState)), r !== null) return r.dehydrated;
    }
    return null;
  }
  function Ot(n) {
    if (mt(n) !== n) throw Error(v(188));
  }
  function Dt(n) {
    var r = n.alternate;
    if (!r) {
      if (r = mt(n), r === null) throw Error(v(188));
      return r !== n ? null : n;
    }
    for (var l = n, u = r; ; ) {
      var c = l.return;
      if (c === null) break;
      var p = c.alternate;
      if (p === null) {
        if (u = c.return, u !== null) {
          l = u;
          continue;
        }
        break;
      }
      if (c.child === p.child) {
        for (p = c.child; p; ) {
          if (p === l) return Ot(c), n;
          if (p === u) return Ot(c), r;
          p = p.sibling;
        }
        throw Error(v(188));
      }
      if (l.return !== u.return) l = c, u = p;
      else {
        for (var S = !1, w = c.child; w; ) {
          if (w === l) {
            S = !0, l = c, u = p;
            break;
          }
          if (w === u) {
            S = !0, u = c, l = p;
            break;
          }
          w = w.sibling;
        }
        if (!S) {
          for (w = p.child; w; ) {
            if (w === l) {
              S = !0, l = p, u = c;
              break;
            }
            if (w === u) {
              S = !0, u = p, l = c;
              break;
            }
            w = w.sibling;
          }
          if (!S) throw Error(v(189));
        }
      }
      if (l.alternate !== u) throw Error(v(190));
    }
    if (l.tag !== 3) throw Error(v(188));
    return l.stateNode.current === l ? n : r;
  }
  function Pn(n) {
    return n = Dt(n), n !== null ? Rn(n) : null;
  }
  function Rn(n) {
    if (n.tag === 5 || n.tag === 6) return n;
    for (n = n.child; n !== null; ) {
      var r = Rn(n);
      if (r !== null) return r;
      n = n.sibling;
    }
    return null;
  }
  var _n = d.unstable_scheduleCallback, Er = d.unstable_cancelCallback, ni = d.unstable_shouldYield, ri = d.unstable_requestPaint, yt = d.unstable_now, Tt = d.unstable_getCurrentPriorityLevel, ai = d.unstable_ImmediatePriority, lo = d.unstable_UserBlockingPriority, oo = d.unstable_NormalPriority, Tl = d.unstable_LowPriority, Zo = d.unstable_IdlePriority, Rl = null, aa = null;
  function Ku(n) {
    if (aa && typeof aa.onCommitFiberRoot == "function") try {
      aa.onCommitFiberRoot(Rl, n, void 0, (n.current.flags & 128) === 128);
    } catch {
    }
  }
  var Vr = Math.clz32 ? Math.clz32 : Jo, pc = Math.log, vc = Math.LN2;
  function Jo(n) {
    return n >>>= 0, n === 0 ? 32 : 31 - (pc(n) / vc | 0) | 0;
  }
  var wl = 64, Ca = 4194304;
  function ii(n) {
    switch (n & -n) {
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
        return n & 4194240;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
      case 67108864:
        return n & 130023424;
      case 134217728:
        return 134217728;
      case 268435456:
        return 268435456;
      case 536870912:
        return 536870912;
      case 1073741824:
        return 1073741824;
      default:
        return n;
    }
  }
  function li(n, r) {
    var l = n.pendingLanes;
    if (l === 0) return 0;
    var u = 0, c = n.suspendedLanes, p = n.pingedLanes, S = l & 268435455;
    if (S !== 0) {
      var w = S & ~c;
      w !== 0 ? u = ii(w) : (p &= S, p !== 0 && (u = ii(p)));
    } else S = l & ~c, S !== 0 ? u = ii(S) : p !== 0 && (u = ii(p));
    if (u === 0) return 0;
    if (r !== 0 && r !== u && (r & c) === 0 && (c = u & -u, p = r & -r, c >= p || c === 16 && (p & 4194240) !== 0)) return r;
    if ((u & 4) !== 0 && (u |= l & 16), r = n.entangledLanes, r !== 0) for (n = n.entanglements, r &= u; 0 < r; ) l = 31 - Vr(r), c = 1 << l, u |= n[l], r &= ~c;
    return u;
  }
  function eu(n, r) {
    switch (n) {
      case 1:
      case 2:
      case 4:
        return r + 250;
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
        return r + 5e3;
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
  function uo(n, r) {
    for (var l = n.suspendedLanes, u = n.pingedLanes, c = n.expirationTimes, p = n.pendingLanes; 0 < p; ) {
      var S = 31 - Vr(p), w = 1 << S, x = c[S];
      x === -1 ? ((w & l) === 0 || (w & u) !== 0) && (c[S] = eu(w, r)) : x <= r && (n.expiredLanes |= w), p &= ~w;
    }
  }
  function bl(n) {
    return n = n.pendingLanes & -1073741825, n !== 0 ? n : n & 1073741824 ? 1073741824 : 0;
  }
  function tu() {
    var n = wl;
    return wl <<= 1, (wl & 4194240) === 0 && (wl = 64), n;
  }
  function nu(n) {
    for (var r = [], l = 0; 31 > l; l++) r.push(n);
    return r;
  }
  function Xi(n, r, l) {
    n.pendingLanes |= r, r !== 536870912 && (n.suspendedLanes = 0, n.pingedLanes = 0), n = n.eventTimes, r = 31 - Vr(r), n[r] = l;
  }
  function rd(n, r) {
    var l = n.pendingLanes & ~r;
    n.pendingLanes = r, n.suspendedLanes = 0, n.pingedLanes = 0, n.expiredLanes &= r, n.mutableReadLanes &= r, n.entangledLanes &= r, r = n.entanglements;
    var u = n.eventTimes;
    for (n = n.expirationTimes; 0 < l; ) {
      var c = 31 - Vr(l), p = 1 << c;
      r[c] = 0, u[c] = -1, n[c] = -1, l &= ~p;
    }
  }
  function Ki(n, r) {
    var l = n.entangledLanes |= r;
    for (n = n.entanglements; l; ) {
      var u = 31 - Vr(l), c = 1 << u;
      c & r | n[u] & r && (n[u] |= r), l &= ~c;
    }
  }
  var tn = 0;
  function ru(n) {
    return n &= -n, 1 < n ? 4 < n ? (n & 268435455) !== 0 ? 16 : 536870912 : 4 : 1;
  }
  var Yt, qu, Ti, ot, au, Cr = !1, Ri = [], Br = null, wi = null, xn = null, mn = /* @__PURE__ */ new Map(), _l = /* @__PURE__ */ new Map(), or = [], $r = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
  function Na(n, r) {
    switch (n) {
      case "focusin":
      case "focusout":
        Br = null;
        break;
      case "dragenter":
      case "dragleave":
        wi = null;
        break;
      case "mouseover":
      case "mouseout":
        xn = null;
        break;
      case "pointerover":
      case "pointerout":
        mn.delete(r.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        _l.delete(r.pointerId);
    }
  }
  function so(n, r, l, u, c, p) {
    return n === null || n.nativeEvent !== p ? (n = { blockedOn: r, domEventName: l, eventSystemFlags: u, nativeEvent: p, targetContainers: [c] }, r !== null && (r = He(r), r !== null && qu(r)), n) : (n.eventSystemFlags |= u, r = n.targetContainers, c !== null && r.indexOf(c) === -1 && r.push(c), n);
  }
  function Zu(n, r, l, u, c) {
    switch (r) {
      case "focusin":
        return Br = so(Br, n, r, l, u, c), !0;
      case "dragenter":
        return wi = so(wi, n, r, l, u, c), !0;
      case "mouseover":
        return xn = so(xn, n, r, l, u, c), !0;
      case "pointerover":
        var p = c.pointerId;
        return mn.set(p, so(mn.get(p) || null, n, r, l, u, c)), !0;
      case "gotpointercapture":
        return p = c.pointerId, _l.set(p, so(_l.get(p) || null, n, r, l, u, c)), !0;
    }
    return !1;
  }
  function Ju(n) {
    var r = So(n.target);
    if (r !== null) {
      var l = mt(r);
      if (l !== null) {
        if (r = l.tag, r === 13) {
          if (r = ut(l), r !== null) {
            n.blockedOn = r, au(n.priority, function() {
              Ti(l);
            });
            return;
          }
        } else if (r === 3 && l.stateNode.current.memoizedState.isDehydrated) {
          n.blockedOn = l.tag === 3 ? l.stateNode.containerInfo : null;
          return;
        }
      }
    }
    n.blockedOn = null;
  }
  function xl(n) {
    if (n.blockedOn !== null) return !1;
    for (var r = n.targetContainers; 0 < r.length; ) {
      var l = ou(n.domEventName, n.eventSystemFlags, r[0], n.nativeEvent);
      if (l === null) {
        l = n.nativeEvent;
        var u = new l.constructor(l.type, l);
        hn = u, l.target.dispatchEvent(u), hn = null;
      } else return r = He(l), r !== null && qu(r), n.blockedOn = l, !1;
      r.shift();
    }
    return !0;
  }
  function co(n, r, l) {
    xl(n) && l.delete(r);
  }
  function ad() {
    Cr = !1, Br !== null && xl(Br) && (Br = null), wi !== null && xl(wi) && (wi = null), xn !== null && xl(xn) && (xn = null), mn.forEach(co), _l.forEach(co);
  }
  function Aa(n, r) {
    n.blockedOn === r && (n.blockedOn = null, Cr || (Cr = !0, d.unstable_scheduleCallback(d.unstable_NormalPriority, ad)));
  }
  function oi(n) {
    function r(c) {
      return Aa(c, n);
    }
    if (0 < Ri.length) {
      Aa(Ri[0], n);
      for (var l = 1; l < Ri.length; l++) {
        var u = Ri[l];
        u.blockedOn === n && (u.blockedOn = null);
      }
    }
    for (Br !== null && Aa(Br, n), wi !== null && Aa(wi, n), xn !== null && Aa(xn, n), mn.forEach(r), _l.forEach(r), l = 0; l < or.length; l++) u = or[l], u.blockedOn === n && (u.blockedOn = null);
    for (; 0 < or.length && (l = or[0], l.blockedOn === null); ) Ju(l), l.blockedOn === null && or.shift();
  }
  var bi = Je.ReactCurrentBatchConfig, za = !0;
  function iu(n, r, l, u) {
    var c = tn, p = bi.transition;
    bi.transition = null;
    try {
      tn = 1, Dl(n, r, l, u);
    } finally {
      tn = c, bi.transition = p;
    }
  }
  function lu(n, r, l, u) {
    var c = tn, p = bi.transition;
    bi.transition = null;
    try {
      tn = 4, Dl(n, r, l, u);
    } finally {
      tn = c, bi.transition = p;
    }
  }
  function Dl(n, r, l, u) {
    if (za) {
      var c = ou(n, r, l, u);
      if (c === null) _c(n, r, u, fo, l), Na(n, u);
      else if (Zu(c, n, r, l, u)) u.stopPropagation();
      else if (Na(n, u), r & 4 && -1 < $r.indexOf(n)) {
        for (; c !== null; ) {
          var p = He(c);
          if (p !== null && Yt(p), p = ou(n, r, l, u), p === null && _c(n, r, u, fo, l), p === c) break;
          c = p;
        }
        c !== null && u.stopPropagation();
      } else _c(n, r, u, null, l);
    }
  }
  var fo = null;
  function ou(n, r, l, u) {
    if (fo = null, n = vn(u), n = So(n), n !== null) if (r = mt(n), r === null) n = null;
    else if (l = r.tag, l === 13) {
      if (n = ut(r), n !== null) return n;
      n = null;
    } else if (l === 3) {
      if (r.stateNode.current.memoizedState.isDehydrated) return r.tag === 3 ? r.stateNode.containerInfo : null;
      n = null;
    } else r !== n && (n = null);
    return fo = n, null;
  }
  function uu(n) {
    switch (n) {
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
        switch (Tt()) {
          case ai:
            return 1;
          case lo:
            return 4;
          case oo:
          case Tl:
            return 16;
          case Zo:
            return 536870912;
          default:
            return 16;
        }
      default:
        return 16;
    }
  }
  var ui = null, y = null, b = null;
  function F() {
    if (b) return b;
    var n, r = y, l = r.length, u, c = "value" in ui ? ui.value : ui.textContent, p = c.length;
    for (n = 0; n < l && r[n] === c[n]; n++) ;
    var S = l - n;
    for (u = 1; u <= S && r[l - u] === c[p - u]; u++) ;
    return b = c.slice(n, 1 < u ? 1 - u : void 0);
  }
  function V(n) {
    var r = n.keyCode;
    return "charCode" in n ? (n = n.charCode, n === 0 && r === 13 && (n = 13)) : n = r, n === 10 && (n = 13), 32 <= n || n === 13 ? n : 0;
  }
  function le() {
    return !0;
  }
  function Be() {
    return !1;
  }
  function fe(n) {
    function r(l, u, c, p, S) {
      this._reactName = l, this._targetInst = c, this.type = u, this.nativeEvent = p, this.target = S, this.currentTarget = null;
      for (var w in n) n.hasOwnProperty(w) && (l = n[w], this[w] = l ? l(p) : p[w]);
      return this.isDefaultPrevented = (p.defaultPrevented != null ? p.defaultPrevented : p.returnValue === !1) ? le : Be, this.isPropagationStopped = Be, this;
    }
    return ue(r.prototype, { preventDefault: function() {
      this.defaultPrevented = !0;
      var l = this.nativeEvent;
      l && (l.preventDefault ? l.preventDefault() : typeof l.returnValue != "unknown" && (l.returnValue = !1), this.isDefaultPrevented = le);
    }, stopPropagation: function() {
      var l = this.nativeEvent;
      l && (l.stopPropagation ? l.stopPropagation() : typeof l.cancelBubble != "unknown" && (l.cancelBubble = !0), this.isPropagationStopped = le);
    }, persist: function() {
    }, isPersistent: le }), r;
  }
  var We = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(n) {
    return n.timeStamp || Date.now();
  }, defaultPrevented: 0, isTrusted: 0 }, Mt = fe(We), Wt = ue({}, We, { view: 0, detail: 0 }), wn = fe(Wt), yn, bt, gn, Mn = ue({}, Wt, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: sd, button: 0, buttons: 0, relatedTarget: function(n) {
    return n.relatedTarget === void 0 ? n.fromElement === n.srcElement ? n.toElement : n.fromElement : n.relatedTarget;
  }, movementX: function(n) {
    return "movementX" in n ? n.movementX : (n !== gn && (gn && n.type === "mousemove" ? (yn = n.screenX - gn.screenX, bt = n.screenY - gn.screenY) : bt = yn = 0, gn = n), yn);
  }, movementY: function(n) {
    return "movementY" in n ? n.movementY : bt;
  } }), kl = fe(Mn), es = ue({}, Mn, { dataTransfer: 0 }), qi = fe(es), ts = ue({}, Wt, { relatedTarget: 0 }), po = fe(ts), id = ue({}, We, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }), hc = fe(id), ld = ue({}, We, { clipboardData: function(n) {
    return "clipboardData" in n ? n.clipboardData : window.clipboardData;
  } }), vv = fe(ld), od = ue({}, We, { data: 0 }), ud = fe(od), hv = {
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
  }, mv = {
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
  }, py = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
  function Zi(n) {
    var r = this.nativeEvent;
    return r.getModifierState ? r.getModifierState(n) : (n = py[n]) ? !!r[n] : !1;
  }
  function sd() {
    return Zi;
  }
  var cd = ue({}, Wt, { key: function(n) {
    if (n.key) {
      var r = hv[n.key] || n.key;
      if (r !== "Unidentified") return r;
    }
    return n.type === "keypress" ? (n = V(n), n === 13 ? "Enter" : String.fromCharCode(n)) : n.type === "keydown" || n.type === "keyup" ? mv[n.keyCode] || "Unidentified" : "";
  }, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: sd, charCode: function(n) {
    return n.type === "keypress" ? V(n) : 0;
  }, keyCode: function(n) {
    return n.type === "keydown" || n.type === "keyup" ? n.keyCode : 0;
  }, which: function(n) {
    return n.type === "keypress" ? V(n) : n.type === "keydown" || n.type === "keyup" ? n.keyCode : 0;
  } }), fd = fe(cd), dd = ue({}, Mn, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), yv = fe(dd), mc = ue({}, Wt, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: sd }), gv = fe(mc), ia = ue({}, We, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }), Ji = fe(ia), qn = ue({}, Mn, {
    deltaX: function(n) {
      return "deltaX" in n ? n.deltaX : "wheelDeltaX" in n ? -n.wheelDeltaX : 0;
    },
    deltaY: function(n) {
      return "deltaY" in n ? n.deltaY : "wheelDeltaY" in n ? -n.wheelDeltaY : "wheelDelta" in n ? -n.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), el = fe(qn), pd = [9, 13, 27, 32], su = de && "CompositionEvent" in window, ns = null;
  de && "documentMode" in document && (ns = document.documentMode);
  var rs = de && "TextEvent" in window && !ns, Sv = de && (!su || ns && 8 < ns && 11 >= ns), Ev = " ", yc = !1;
  function Cv(n, r) {
    switch (n) {
      case "keyup":
        return pd.indexOf(r.keyCode) !== -1;
      case "keydown":
        return r.keyCode !== 229;
      case "keypress":
      case "mousedown":
      case "focusout":
        return !0;
      default:
        return !1;
    }
  }
  function Tv(n) {
    return n = n.detail, typeof n == "object" && "data" in n ? n.data : null;
  }
  var cu = !1;
  function Rv(n, r) {
    switch (n) {
      case "compositionend":
        return Tv(r);
      case "keypress":
        return r.which !== 32 ? null : (yc = !0, Ev);
      case "textInput":
        return n = r.data, n === Ev && yc ? null : n;
      default:
        return null;
    }
  }
  function vy(n, r) {
    if (cu) return n === "compositionend" || !su && Cv(n, r) ? (n = F(), b = y = ui = null, cu = !1, n) : null;
    switch (n) {
      case "paste":
        return null;
      case "keypress":
        if (!(r.ctrlKey || r.altKey || r.metaKey) || r.ctrlKey && r.altKey) {
          if (r.char && 1 < r.char.length) return r.char;
          if (r.which) return String.fromCharCode(r.which);
        }
        return null;
      case "compositionend":
        return Sv && r.locale !== "ko" ? null : r.data;
      default:
        return null;
    }
  }
  var hy = { color: !0, date: !0, datetime: !0, "datetime-local": !0, email: !0, month: !0, number: !0, password: !0, range: !0, search: !0, tel: !0, text: !0, time: !0, url: !0, week: !0 };
  function wv(n) {
    var r = n && n.nodeName && n.nodeName.toLowerCase();
    return r === "input" ? !!hy[n.type] : r === "textarea";
  }
  function vd(n, r, l, u) {
    Pr(u), r = ss(r, "onChange"), 0 < r.length && (l = new Mt("onChange", "change", null, l, u), n.push({ event: l, listeners: r }));
  }
  var _i = null, vo = null;
  function bv(n) {
    yo(n, 0);
  }
  function as(n) {
    var r = ci(n);
    if (Qn(r)) return n;
  }
  function my(n, r) {
    if (n === "change") return r;
  }
  var _v = !1;
  if (de) {
    var hd;
    if (de) {
      var md = "oninput" in document;
      if (!md) {
        var xv = document.createElement("div");
        xv.setAttribute("oninput", "return;"), md = typeof xv.oninput == "function";
      }
      hd = md;
    } else hd = !1;
    _v = hd && (!document.documentMode || 9 < document.documentMode);
  }
  function Dv() {
    _i && (_i.detachEvent("onpropertychange", kv), vo = _i = null);
  }
  function kv(n) {
    if (n.propertyName === "value" && as(vo)) {
      var r = [];
      vd(r, vo, n, vn(n)), gi(bv, r);
    }
  }
  function yy(n, r, l) {
    n === "focusin" ? (Dv(), _i = r, vo = l, _i.attachEvent("onpropertychange", kv)) : n === "focusout" && Dv();
  }
  function Ov(n) {
    if (n === "selectionchange" || n === "keyup" || n === "keydown") return as(vo);
  }
  function gy(n, r) {
    if (n === "click") return as(r);
  }
  function Mv(n, r) {
    if (n === "input" || n === "change") return as(r);
  }
  function Sy(n, r) {
    return n === r && (n !== 0 || 1 / n === 1 / r) || n !== n && r !== r;
  }
  var si = typeof Object.is == "function" ? Object.is : Sy;
  function is(n, r) {
    if (si(n, r)) return !0;
    if (typeof n != "object" || n === null || typeof r != "object" || r === null) return !1;
    var l = Object.keys(n), u = Object.keys(r);
    if (l.length !== u.length) return !1;
    for (u = 0; u < l.length; u++) {
      var c = l[u];
      if (!Q.call(r, c) || !si(n[c], r[c])) return !1;
    }
    return !0;
  }
  function Lv(n) {
    for (; n && n.firstChild; ) n = n.firstChild;
    return n;
  }
  function gc(n, r) {
    var l = Lv(n);
    n = 0;
    for (var u; l; ) {
      if (l.nodeType === 3) {
        if (u = n + l.textContent.length, n <= r && u >= r) return { node: l, offset: r - n };
        n = u;
      }
      e: {
        for (; l; ) {
          if (l.nextSibling) {
            l = l.nextSibling;
            break e;
          }
          l = l.parentNode;
        }
        l = void 0;
      }
      l = Lv(l);
    }
  }
  function Ol(n, r) {
    return n && r ? n === r ? !0 : n && n.nodeType === 3 ? !1 : r && r.nodeType === 3 ? Ol(n, r.parentNode) : "contains" in n ? n.contains(r) : n.compareDocumentPosition ? !!(n.compareDocumentPosition(r) & 16) : !1 : !1;
  }
  function ls() {
    for (var n = window, r = Fn(); r instanceof n.HTMLIFrameElement; ) {
      try {
        var l = typeof r.contentWindow.location.href == "string";
      } catch {
        l = !1;
      }
      if (l) n = r.contentWindow;
      else break;
      r = Fn(n.document);
    }
    return r;
  }
  function Sc(n) {
    var r = n && n.nodeName && n.nodeName.toLowerCase();
    return r && (r === "input" && (n.type === "text" || n.type === "search" || n.type === "tel" || n.type === "url" || n.type === "password") || r === "textarea" || n.contentEditable === "true");
  }
  function fu(n) {
    var r = ls(), l = n.focusedElem, u = n.selectionRange;
    if (r !== l && l && l.ownerDocument && Ol(l.ownerDocument.documentElement, l)) {
      if (u !== null && Sc(l)) {
        if (r = u.start, n = u.end, n === void 0 && (n = r), "selectionStart" in l) l.selectionStart = r, l.selectionEnd = Math.min(n, l.value.length);
        else if (n = (r = l.ownerDocument || document) && r.defaultView || window, n.getSelection) {
          n = n.getSelection();
          var c = l.textContent.length, p = Math.min(u.start, c);
          u = u.end === void 0 ? p : Math.min(u.end, c), !n.extend && p > u && (c = u, u = p, p = c), c = gc(l, p);
          var S = gc(
            l,
            u
          );
          c && S && (n.rangeCount !== 1 || n.anchorNode !== c.node || n.anchorOffset !== c.offset || n.focusNode !== S.node || n.focusOffset !== S.offset) && (r = r.createRange(), r.setStart(c.node, c.offset), n.removeAllRanges(), p > u ? (n.addRange(r), n.extend(S.node, S.offset)) : (r.setEnd(S.node, S.offset), n.addRange(r)));
        }
      }
      for (r = [], n = l; n = n.parentNode; ) n.nodeType === 1 && r.push({ element: n, left: n.scrollLeft, top: n.scrollTop });
      for (typeof l.focus == "function" && l.focus(), l = 0; l < r.length; l++) n = r[l], n.element.scrollLeft = n.left, n.element.scrollTop = n.top;
    }
  }
  var Ey = de && "documentMode" in document && 11 >= document.documentMode, du = null, yd = null, os = null, gd = !1;
  function Sd(n, r, l) {
    var u = l.window === l ? l.document : l.nodeType === 9 ? l : l.ownerDocument;
    gd || du == null || du !== Fn(u) || (u = du, "selectionStart" in u && Sc(u) ? u = { start: u.selectionStart, end: u.selectionEnd } : (u = (u.ownerDocument && u.ownerDocument.defaultView || window).getSelection(), u = { anchorNode: u.anchorNode, anchorOffset: u.anchorOffset, focusNode: u.focusNode, focusOffset: u.focusOffset }), os && is(os, u) || (os = u, u = ss(yd, "onSelect"), 0 < u.length && (r = new Mt("onSelect", "select", null, r, l), n.push({ event: r, listeners: u }), r.target = du)));
  }
  function Ec(n, r) {
    var l = {};
    return l[n.toLowerCase()] = r.toLowerCase(), l["Webkit" + n] = "webkit" + r, l["Moz" + n] = "moz" + r, l;
  }
  var ho = { animationend: Ec("Animation", "AnimationEnd"), animationiteration: Ec("Animation", "AnimationIteration"), animationstart: Ec("Animation", "AnimationStart"), transitionend: Ec("Transition", "TransitionEnd") }, Tr = {}, Ed = {};
  de && (Ed = document.createElement("div").style, "AnimationEvent" in window || (delete ho.animationend.animation, delete ho.animationiteration.animation, delete ho.animationstart.animation), "TransitionEvent" in window || delete ho.transitionend.transition);
  function Cc(n) {
    if (Tr[n]) return Tr[n];
    if (!ho[n]) return n;
    var r = ho[n], l;
    for (l in r) if (r.hasOwnProperty(l) && l in Ed) return Tr[n] = r[l];
    return n;
  }
  var Nv = Cc("animationend"), Av = Cc("animationiteration"), zv = Cc("animationstart"), Uv = Cc("transitionend"), Cd = /* @__PURE__ */ new Map(), Tc = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
  function Ua(n, r) {
    Cd.set(n, r), I(r, [n]);
  }
  for (var Td = 0; Td < Tc.length; Td++) {
    var mo = Tc[Td], Cy = mo.toLowerCase(), Ty = mo[0].toUpperCase() + mo.slice(1);
    Ua(Cy, "on" + Ty);
  }
  Ua(Nv, "onAnimationEnd"), Ua(Av, "onAnimationIteration"), Ua(zv, "onAnimationStart"), Ua("dblclick", "onDoubleClick"), Ua("focusin", "onFocus"), Ua("focusout", "onBlur"), Ua(Uv, "onTransitionEnd"), C("onMouseEnter", ["mouseout", "mouseover"]), C("onMouseLeave", ["mouseout", "mouseover"]), C("onPointerEnter", ["pointerout", "pointerover"]), C("onPointerLeave", ["pointerout", "pointerover"]), I("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" ")), I("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")), I("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]), I("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" ")), I("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" ")), I("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
  var us = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), Rd = new Set("cancel close invalid load scroll toggle".split(" ").concat(us));
  function Rc(n, r, l) {
    var u = n.type || "unknown-event";
    n.currentTarget = l, we(u, r, void 0, n), n.currentTarget = null;
  }
  function yo(n, r) {
    r = (r & 4) !== 0;
    for (var l = 0; l < n.length; l++) {
      var u = n[l], c = u.event;
      u = u.listeners;
      e: {
        var p = void 0;
        if (r) for (var S = u.length - 1; 0 <= S; S--) {
          var w = u[S], x = w.instance, H = w.currentTarget;
          if (w = w.listener, x !== p && c.isPropagationStopped()) break e;
          Rc(c, w, H), p = x;
        }
        else for (S = 0; S < u.length; S++) {
          if (w = u[S], x = w.instance, H = w.currentTarget, w = w.listener, x !== p && c.isPropagationStopped()) break e;
          Rc(c, w, H), p = x;
        }
      }
    }
    if (Ci) throw n = _, Ci = !1, _ = null, n;
  }
  function cn(n, r) {
    var l = r[ds];
    l === void 0 && (l = r[ds] = /* @__PURE__ */ new Set());
    var u = n + "__bubble";
    l.has(u) || (jv(r, n, 2, !1), l.add(u));
  }
  function wc(n, r, l) {
    var u = 0;
    r && (u |= 4), jv(l, n, u, r);
  }
  var bc = "_reactListening" + Math.random().toString(36).slice(2);
  function pu(n) {
    if (!n[bc]) {
      n[bc] = !0, R.forEach(function(l) {
        l !== "selectionchange" && (Rd.has(l) || wc(l, !1, n), wc(l, !0, n));
      });
      var r = n.nodeType === 9 ? n : n.ownerDocument;
      r === null || r[bc] || (r[bc] = !0, wc("selectionchange", !1, r));
    }
  }
  function jv(n, r, l, u) {
    switch (uu(r)) {
      case 1:
        var c = iu;
        break;
      case 4:
        c = lu;
        break;
      default:
        c = Dl;
    }
    l = c.bind(null, r, l, n), c = void 0, !Sr || r !== "touchstart" && r !== "touchmove" && r !== "wheel" || (c = !0), u ? c !== void 0 ? n.addEventListener(r, l, { capture: !0, passive: c }) : n.addEventListener(r, l, !0) : c !== void 0 ? n.addEventListener(r, l, { passive: c }) : n.addEventListener(r, l, !1);
  }
  function _c(n, r, l, u, c) {
    var p = u;
    if ((r & 1) === 0 && (r & 2) === 0 && u !== null) e: for (; ; ) {
      if (u === null) return;
      var S = u.tag;
      if (S === 3 || S === 4) {
        var w = u.stateNode.containerInfo;
        if (w === c || w.nodeType === 8 && w.parentNode === c) break;
        if (S === 4) for (S = u.return; S !== null; ) {
          var x = S.tag;
          if ((x === 3 || x === 4) && (x = S.stateNode.containerInfo, x === c || x.nodeType === 8 && x.parentNode === c)) return;
          S = S.return;
        }
        for (; w !== null; ) {
          if (S = So(w), S === null) return;
          if (x = S.tag, x === 5 || x === 6) {
            u = p = S;
            continue e;
          }
          w = w.parentNode;
        }
      }
      u = u.return;
    }
    gi(function() {
      var H = p, ee = vn(l), re = [];
      e: {
        var q = Cd.get(n);
        if (q !== void 0) {
          var ge = Mt, xe = n;
          switch (n) {
            case "keypress":
              if (V(l) === 0) break e;
            case "keydown":
            case "keyup":
              ge = fd;
              break;
            case "focusin":
              xe = "focus", ge = po;
              break;
            case "focusout":
              xe = "blur", ge = po;
              break;
            case "beforeblur":
            case "afterblur":
              ge = po;
              break;
            case "click":
              if (l.button === 2) break e;
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              ge = kl;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              ge = qi;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              ge = gv;
              break;
            case Nv:
            case Av:
            case zv:
              ge = hc;
              break;
            case Uv:
              ge = Ji;
              break;
            case "scroll":
              ge = wn;
              break;
            case "wheel":
              ge = el;
              break;
            case "copy":
            case "cut":
            case "paste":
              ge = vv;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              ge = yv;
          }
          var Me = (r & 4) !== 0, Yn = !Me && n === "scroll", N = Me ? q !== null ? q + "Capture" : null : q;
          Me = [];
          for (var k = H, U; k !== null; ) {
            U = k;
            var te = U.stateNode;
            if (U.tag === 5 && te !== null && (U = te, N !== null && (te = gr(k, N), te != null && Me.push(vu(k, te, U)))), Yn) break;
            k = k.return;
          }
          0 < Me.length && (q = new ge(q, xe, null, l, ee), re.push({ event: q, listeners: Me }));
        }
      }
      if ((r & 7) === 0) {
        e: {
          if (q = n === "mouseover" || n === "pointerover", ge = n === "mouseout" || n === "pointerout", q && l !== hn && (xe = l.relatedTarget || l.fromElement) && (So(xe) || xe[tl])) break e;
          if ((ge || q) && (q = ee.window === ee ? ee : (q = ee.ownerDocument) ? q.defaultView || q.parentWindow : window, ge ? (xe = l.relatedTarget || l.toElement, ge = H, xe = xe ? So(xe) : null, xe !== null && (Yn = mt(xe), xe !== Yn || xe.tag !== 5 && xe.tag !== 6) && (xe = null)) : (ge = null, xe = H), ge !== xe)) {
            if (Me = kl, te = "onMouseLeave", N = "onMouseEnter", k = "mouse", (n === "pointerout" || n === "pointerover") && (Me = yv, te = "onPointerLeave", N = "onPointerEnter", k = "pointer"), Yn = ge == null ? q : ci(ge), U = xe == null ? q : ci(xe), q = new Me(te, k + "leave", ge, l, ee), q.target = Yn, q.relatedTarget = U, te = null, So(ee) === H && (Me = new Me(N, k + "enter", xe, l, ee), Me.target = U, Me.relatedTarget = Yn, te = Me), Yn = te, ge && xe) t: {
              for (Me = ge, N = xe, k = 0, U = Me; U; U = Ml(U)) k++;
              for (U = 0, te = N; te; te = Ml(te)) U++;
              for (; 0 < k - U; ) Me = Ml(Me), k--;
              for (; 0 < U - k; ) N = Ml(N), U--;
              for (; k--; ) {
                if (Me === N || N !== null && Me === N.alternate) break t;
                Me = Ml(Me), N = Ml(N);
              }
              Me = null;
            }
            else Me = null;
            ge !== null && Fv(re, q, ge, Me, !1), xe !== null && Yn !== null && Fv(re, Yn, xe, Me, !0);
          }
        }
        e: {
          if (q = H ? ci(H) : window, ge = q.nodeName && q.nodeName.toLowerCase(), ge === "select" || ge === "input" && q.type === "file") var De = my;
          else if (wv(q)) if (_v) De = Mv;
          else {
            De = Ov;
            var Ye = yy;
          }
          else (ge = q.nodeName) && ge.toLowerCase() === "input" && (q.type === "checkbox" || q.type === "radio") && (De = gy);
          if (De && (De = De(n, H))) {
            vd(re, De, l, ee);
            break e;
          }
          Ye && Ye(n, q, H), n === "focusout" && (Ye = q._wrapperState) && Ye.controlled && q.type === "number" && zt(q, "number", q.value);
        }
        switch (Ye = H ? ci(H) : window, n) {
          case "focusin":
            (wv(Ye) || Ye.contentEditable === "true") && (du = Ye, yd = H, os = null);
            break;
          case "focusout":
            os = yd = du = null;
            break;
          case "mousedown":
            gd = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            gd = !1, Sd(re, l, ee);
            break;
          case "selectionchange":
            if (Ey) break;
          case "keydown":
          case "keyup":
            Sd(re, l, ee);
        }
        var Ge;
        if (su) e: {
          switch (n) {
            case "compositionstart":
              var at = "onCompositionStart";
              break e;
            case "compositionend":
              at = "onCompositionEnd";
              break e;
            case "compositionupdate":
              at = "onCompositionUpdate";
              break e;
          }
          at = void 0;
        }
        else cu ? Cv(n, l) && (at = "onCompositionEnd") : n === "keydown" && l.keyCode === 229 && (at = "onCompositionStart");
        at && (Sv && l.locale !== "ko" && (cu || at !== "onCompositionStart" ? at === "onCompositionEnd" && cu && (Ge = F()) : (ui = ee, y = "value" in ui ? ui.value : ui.textContent, cu = !0)), Ye = ss(H, at), 0 < Ye.length && (at = new ud(at, n, null, l, ee), re.push({ event: at, listeners: Ye }), Ge ? at.data = Ge : (Ge = Tv(l), Ge !== null && (at.data = Ge)))), (Ge = rs ? Rv(n, l) : vy(n, l)) && (H = ss(H, "onBeforeInput"), 0 < H.length && (ee = new ud("onBeforeInput", "beforeinput", null, l, ee), re.push({ event: ee, listeners: H }), ee.data = Ge));
      }
      yo(re, r);
    });
  }
  function vu(n, r, l) {
    return { instance: n, listener: r, currentTarget: l };
  }
  function ss(n, r) {
    for (var l = r + "Capture", u = []; n !== null; ) {
      var c = n, p = c.stateNode;
      c.tag === 5 && p !== null && (c = p, p = gr(n, l), p != null && u.unshift(vu(n, p, c)), p = gr(n, r), p != null && u.push(vu(n, p, c))), n = n.return;
    }
    return u;
  }
  function Ml(n) {
    if (n === null) return null;
    do
      n = n.return;
    while (n && n.tag !== 5);
    return n || null;
  }
  function Fv(n, r, l, u, c) {
    for (var p = r._reactName, S = []; l !== null && l !== u; ) {
      var w = l, x = w.alternate, H = w.stateNode;
      if (x !== null && x === u) break;
      w.tag === 5 && H !== null && (w = H, c ? (x = gr(l, p), x != null && S.unshift(vu(l, x, w))) : c || (x = gr(l, p), x != null && S.push(vu(l, x, w)))), l = l.return;
    }
    S.length !== 0 && n.push({ event: r, listeners: S });
  }
  var Hv = /\r\n?/g, Ry = /\u0000|\uFFFD/g;
  function Pv(n) {
    return (typeof n == "string" ? n : "" + n).replace(Hv, `
`).replace(Ry, "");
  }
  function xc(n, r, l) {
    if (r = Pv(r), Pv(n) !== r && l) throw Error(v(425));
  }
  function Ll() {
  }
  var cs = null, go = null;
  function Dc(n, r) {
    return n === "textarea" || n === "noscript" || typeof r.children == "string" || typeof r.children == "number" || typeof r.dangerouslySetInnerHTML == "object" && r.dangerouslySetInnerHTML !== null && r.dangerouslySetInnerHTML.__html != null;
  }
  var kc = typeof setTimeout == "function" ? setTimeout : void 0, wd = typeof clearTimeout == "function" ? clearTimeout : void 0, Vv = typeof Promise == "function" ? Promise : void 0, hu = typeof queueMicrotask == "function" ? queueMicrotask : typeof Vv < "u" ? function(n) {
    return Vv.resolve(null).then(n).catch(Oc);
  } : kc;
  function Oc(n) {
    setTimeout(function() {
      throw n;
    });
  }
  function mu(n, r) {
    var l = r, u = 0;
    do {
      var c = l.nextSibling;
      if (n.removeChild(l), c && c.nodeType === 8) if (l = c.data, l === "/$") {
        if (u === 0) {
          n.removeChild(c), oi(r);
          return;
        }
        u--;
      } else l !== "$" && l !== "$?" && l !== "$!" || u++;
      l = c;
    } while (l);
    oi(r);
  }
  function xi(n) {
    for (; n != null; n = n.nextSibling) {
      var r = n.nodeType;
      if (r === 1 || r === 3) break;
      if (r === 8) {
        if (r = n.data, r === "$" || r === "$!" || r === "$?") break;
        if (r === "/$") return null;
      }
    }
    return n;
  }
  function Bv(n) {
    n = n.previousSibling;
    for (var r = 0; n; ) {
      if (n.nodeType === 8) {
        var l = n.data;
        if (l === "$" || l === "$!" || l === "$?") {
          if (r === 0) return n;
          r--;
        } else l === "/$" && r++;
      }
      n = n.previousSibling;
    }
    return null;
  }
  var Nl = Math.random().toString(36).slice(2), Di = "__reactFiber$" + Nl, fs = "__reactProps$" + Nl, tl = "__reactContainer$" + Nl, ds = "__reactEvents$" + Nl, yu = "__reactListeners$" + Nl, wy = "__reactHandles$" + Nl;
  function So(n) {
    var r = n[Di];
    if (r) return r;
    for (var l = n.parentNode; l; ) {
      if (r = l[tl] || l[Di]) {
        if (l = r.alternate, r.child !== null || l !== null && l.child !== null) for (n = Bv(n); n !== null; ) {
          if (l = n[Di]) return l;
          n = Bv(n);
        }
        return r;
      }
      n = l, l = n.parentNode;
    }
    return null;
  }
  function He(n) {
    return n = n[Di] || n[tl], !n || n.tag !== 5 && n.tag !== 6 && n.tag !== 13 && n.tag !== 3 ? null : n;
  }
  function ci(n) {
    if (n.tag === 5 || n.tag === 6) return n.stateNode;
    throw Error(v(33));
  }
  function Ln(n) {
    return n[fs] || null;
  }
  var Vt = [], ja = -1;
  function Fa(n) {
    return { current: n };
  }
  function bn(n) {
    0 > ja || (n.current = Vt[ja], Vt[ja] = null, ja--);
  }
  function ze(n, r) {
    ja++, Vt[ja] = n.current, n.current = r;
  }
  var zr = {}, Hn = Fa(zr), ur = Fa(!1), la = zr;
  function oa(n, r) {
    var l = n.type.contextTypes;
    if (!l) return zr;
    var u = n.stateNode;
    if (u && u.__reactInternalMemoizedUnmaskedChildContext === r) return u.__reactInternalMemoizedMaskedChildContext;
    var c = {}, p;
    for (p in l) c[p] = r[p];
    return u && (n = n.stateNode, n.__reactInternalMemoizedUnmaskedChildContext = r, n.__reactInternalMemoizedMaskedChildContext = c), c;
  }
  function Zn(n) {
    return n = n.childContextTypes, n != null;
  }
  function gu() {
    bn(ur), bn(Hn);
  }
  function $v(n, r, l) {
    if (Hn.current !== zr) throw Error(v(168));
    ze(Hn, r), ze(ur, l);
  }
  function ps(n, r, l) {
    var u = n.stateNode;
    if (r = r.childContextTypes, typeof u.getChildContext != "function") return l;
    u = u.getChildContext();
    for (var c in u) if (!(c in r)) throw Error(v(108, vt(n) || "Unknown", c));
    return ue({}, l, u);
  }
  function dr(n) {
    return n = (n = n.stateNode) && n.__reactInternalMemoizedMergedChildContext || zr, la = Hn.current, ze(Hn, n), ze(ur, ur.current), !0;
  }
  function Mc(n, r, l) {
    var u = n.stateNode;
    if (!u) throw Error(v(169));
    l ? (n = ps(n, r, la), u.__reactInternalMemoizedMergedChildContext = n, bn(ur), bn(Hn), ze(Hn, n)) : bn(ur), ze(ur, l);
  }
  var ki = null, Su = !1, nl = !1;
  function Lc(n) {
    ki === null ? ki = [n] : ki.push(n);
  }
  function Al(n) {
    Su = !0, Lc(n);
  }
  function Oi() {
    if (!nl && ki !== null) {
      nl = !0;
      var n = 0, r = tn;
      try {
        var l = ki;
        for (tn = 1; n < l.length; n++) {
          var u = l[n];
          do
            u = u(!0);
          while (u !== null);
        }
        ki = null, Su = !1;
      } catch (c) {
        throw ki !== null && (ki = ki.slice(n + 1)), _n(ai, Oi), c;
      } finally {
        tn = r, nl = !1;
      }
    }
    return null;
  }
  var zl = [], Ul = 0, jl = null, rl = 0, Jn = [], Ha = 0, Ta = null, Mi = 1, Li = "";
  function Eo(n, r) {
    zl[Ul++] = rl, zl[Ul++] = jl, jl = n, rl = r;
  }
  function Iv(n, r, l) {
    Jn[Ha++] = Mi, Jn[Ha++] = Li, Jn[Ha++] = Ta, Ta = n;
    var u = Mi;
    n = Li;
    var c = 32 - Vr(u) - 1;
    u &= ~(1 << c), l += 1;
    var p = 32 - Vr(r) + c;
    if (30 < p) {
      var S = c - c % 5;
      p = (u & (1 << S) - 1).toString(32), u >>= S, c -= S, Mi = 1 << 32 - Vr(r) + c | l << c | u, Li = p + n;
    } else Mi = 1 << p | l << c | u, Li = n;
  }
  function Nc(n) {
    n.return !== null && (Eo(n, 1), Iv(n, 1, 0));
  }
  function Ac(n) {
    for (; n === jl; ) jl = zl[--Ul], zl[Ul] = null, rl = zl[--Ul], zl[Ul] = null;
    for (; n === Ta; ) Ta = Jn[--Ha], Jn[Ha] = null, Li = Jn[--Ha], Jn[Ha] = null, Mi = Jn[--Ha], Jn[Ha] = null;
  }
  var ua = null, sa = null, kn = !1, Pa = null;
  function bd(n, r) {
    var l = Ya(5, null, null, 0);
    l.elementType = "DELETED", l.stateNode = r, l.return = n, r = n.deletions, r === null ? (n.deletions = [l], n.flags |= 16) : r.push(l);
  }
  function Yv(n, r) {
    switch (n.tag) {
      case 5:
        var l = n.type;
        return r = r.nodeType !== 1 || l.toLowerCase() !== r.nodeName.toLowerCase() ? null : r, r !== null ? (n.stateNode = r, ua = n, sa = xi(r.firstChild), !0) : !1;
      case 6:
        return r = n.pendingProps === "" || r.nodeType !== 3 ? null : r, r !== null ? (n.stateNode = r, ua = n, sa = null, !0) : !1;
      case 13:
        return r = r.nodeType !== 8 ? null : r, r !== null ? (l = Ta !== null ? { id: Mi, overflow: Li } : null, n.memoizedState = { dehydrated: r, treeContext: l, retryLane: 1073741824 }, l = Ya(18, null, null, 0), l.stateNode = r, l.return = n, n.child = l, ua = n, sa = null, !0) : !1;
      default:
        return !1;
    }
  }
  function _d(n) {
    return (n.mode & 1) !== 0 && (n.flags & 128) === 0;
  }
  function xd(n) {
    if (kn) {
      var r = sa;
      if (r) {
        var l = r;
        if (!Yv(n, r)) {
          if (_d(n)) throw Error(v(418));
          r = xi(l.nextSibling);
          var u = ua;
          r && Yv(n, r) ? bd(u, l) : (n.flags = n.flags & -4097 | 2, kn = !1, ua = n);
        }
      } else {
        if (_d(n)) throw Error(v(418));
        n.flags = n.flags & -4097 | 2, kn = !1, ua = n;
      }
    }
  }
  function sr(n) {
    for (n = n.return; n !== null && n.tag !== 5 && n.tag !== 3 && n.tag !== 13; ) n = n.return;
    ua = n;
  }
  function zc(n) {
    if (n !== ua) return !1;
    if (!kn) return sr(n), kn = !0, !1;
    var r;
    if ((r = n.tag !== 3) && !(r = n.tag !== 5) && (r = n.type, r = r !== "head" && r !== "body" && !Dc(n.type, n.memoizedProps)), r && (r = sa)) {
      if (_d(n)) throw vs(), Error(v(418));
      for (; r; ) bd(n, r), r = xi(r.nextSibling);
    }
    if (sr(n), n.tag === 13) {
      if (n = n.memoizedState, n = n !== null ? n.dehydrated : null, !n) throw Error(v(317));
      e: {
        for (n = n.nextSibling, r = 0; n; ) {
          if (n.nodeType === 8) {
            var l = n.data;
            if (l === "/$") {
              if (r === 0) {
                sa = xi(n.nextSibling);
                break e;
              }
              r--;
            } else l !== "$" && l !== "$!" && l !== "$?" || r++;
          }
          n = n.nextSibling;
        }
        sa = null;
      }
    } else sa = ua ? xi(n.stateNode.nextSibling) : null;
    return !0;
  }
  function vs() {
    for (var n = sa; n; ) n = xi(n.nextSibling);
  }
  function Fl() {
    sa = ua = null, kn = !1;
  }
  function al(n) {
    Pa === null ? Pa = [n] : Pa.push(n);
  }
  var by = Je.ReactCurrentBatchConfig;
  function Co(n, r, l) {
    if (n = l.ref, n !== null && typeof n != "function" && typeof n != "object") {
      if (l._owner) {
        if (l = l._owner, l) {
          if (l.tag !== 1) throw Error(v(309));
          var u = l.stateNode;
        }
        if (!u) throw Error(v(147, n));
        var c = u, p = "" + n;
        return r !== null && r.ref !== null && typeof r.ref == "function" && r.ref._stringRef === p ? r.ref : (r = function(S) {
          var w = c.refs;
          S === null ? delete w[p] : w[p] = S;
        }, r._stringRef = p, r);
      }
      if (typeof n != "string") throw Error(v(284));
      if (!l._owner) throw Error(v(290, n));
    }
    return n;
  }
  function Uc(n, r) {
    throw n = Object.prototype.toString.call(r), Error(v(31, n === "[object Object]" ? "object with keys {" + Object.keys(r).join(", ") + "}" : n));
  }
  function Wv(n) {
    var r = n._init;
    return r(n._payload);
  }
  function To(n) {
    function r(N, k) {
      if (n) {
        var U = N.deletions;
        U === null ? (N.deletions = [k], N.flags |= 16) : U.push(k);
      }
    }
    function l(N, k) {
      if (!n) return null;
      for (; k !== null; ) r(N, k), k = k.sibling;
      return null;
    }
    function u(N, k) {
      for (N = /* @__PURE__ */ new Map(); k !== null; ) k.key !== null ? N.set(k.key, k) : N.set(k.index, k), k = k.sibling;
      return N;
    }
    function c(N, k) {
      return N = Wl(N, k), N.index = 0, N.sibling = null, N;
    }
    function p(N, k, U) {
      return N.index = U, n ? (U = N.alternate, U !== null ? (U = U.index, U < k ? (N.flags |= 2, k) : U) : (N.flags |= 2, k)) : (N.flags |= 1048576, k);
    }
    function S(N) {
      return n && N.alternate === null && (N.flags |= 2), N;
    }
    function w(N, k, U, te) {
      return k === null || k.tag !== 6 ? (k = ap(U, N.mode, te), k.return = N, k) : (k = c(k, U), k.return = N, k);
    }
    function x(N, k, U, te) {
      var De = U.type;
      return De === je ? ee(N, k, U.props.children, te, U.key) : k !== null && (k.elementType === De || typeof De == "object" && De !== null && De.$$typeof === At && Wv(De) === k.type) ? (te = c(k, U.props), te.ref = Co(N, k, U), te.return = N, te) : (te = Is(U.type, U.key, U.props, null, N.mode, te), te.ref = Co(N, k, U), te.return = N, te);
    }
    function H(N, k, U, te) {
      return k === null || k.tag !== 4 || k.stateNode.containerInfo !== U.containerInfo || k.stateNode.implementation !== U.implementation ? (k = mf(U, N.mode, te), k.return = N, k) : (k = c(k, U.children || []), k.return = N, k);
    }
    function ee(N, k, U, te, De) {
      return k === null || k.tag !== 7 ? (k = cl(U, N.mode, te, De), k.return = N, k) : (k = c(k, U), k.return = N, k);
    }
    function re(N, k, U) {
      if (typeof k == "string" && k !== "" || typeof k == "number") return k = ap("" + k, N.mode, U), k.return = N, k;
      if (typeof k == "object" && k !== null) {
        switch (k.$$typeof) {
          case _e:
            return U = Is(k.type, k.key, k.props, null, N.mode, U), U.ref = Co(N, null, k), U.return = N, U;
          case Le:
            return k = mf(k, N.mode, U), k.return = N, k;
          case At:
            var te = k._init;
            return re(N, te(k._payload), U);
        }
        if (Ct(k) || be(k)) return k = cl(k, N.mode, U, null), k.return = N, k;
        Uc(N, k);
      }
      return null;
    }
    function q(N, k, U, te) {
      var De = k !== null ? k.key : null;
      if (typeof U == "string" && U !== "" || typeof U == "number") return De !== null ? null : w(N, k, "" + U, te);
      if (typeof U == "object" && U !== null) {
        switch (U.$$typeof) {
          case _e:
            return U.key === De ? x(N, k, U, te) : null;
          case Le:
            return U.key === De ? H(N, k, U, te) : null;
          case At:
            return De = U._init, q(
              N,
              k,
              De(U._payload),
              te
            );
        }
        if (Ct(U) || be(U)) return De !== null ? null : ee(N, k, U, te, null);
        Uc(N, U);
      }
      return null;
    }
    function ge(N, k, U, te, De) {
      if (typeof te == "string" && te !== "" || typeof te == "number") return N = N.get(U) || null, w(k, N, "" + te, De);
      if (typeof te == "object" && te !== null) {
        switch (te.$$typeof) {
          case _e:
            return N = N.get(te.key === null ? U : te.key) || null, x(k, N, te, De);
          case Le:
            return N = N.get(te.key === null ? U : te.key) || null, H(k, N, te, De);
          case At:
            var Ye = te._init;
            return ge(N, k, U, Ye(te._payload), De);
        }
        if (Ct(te) || be(te)) return N = N.get(U) || null, ee(k, N, te, De, null);
        Uc(k, te);
      }
      return null;
    }
    function xe(N, k, U, te) {
      for (var De = null, Ye = null, Ge = k, at = k = 0, hr = null; Ge !== null && at < U.length; at++) {
        Ge.index > at ? (hr = Ge, Ge = null) : hr = Ge.sibling;
        var an = q(N, Ge, U[at], te);
        if (an === null) {
          Ge === null && (Ge = hr);
          break;
        }
        n && Ge && an.alternate === null && r(N, Ge), k = p(an, k, at), Ye === null ? De = an : Ye.sibling = an, Ye = an, Ge = hr;
      }
      if (at === U.length) return l(N, Ge), kn && Eo(N, at), De;
      if (Ge === null) {
        for (; at < U.length; at++) Ge = re(N, U[at], te), Ge !== null && (k = p(Ge, k, at), Ye === null ? De = Ge : Ye.sibling = Ge, Ye = Ge);
        return kn && Eo(N, at), De;
      }
      for (Ge = u(N, Ge); at < U.length; at++) hr = ge(Ge, N, at, U[at], te), hr !== null && (n && hr.alternate !== null && Ge.delete(hr.key === null ? at : hr.key), k = p(hr, k, at), Ye === null ? De = hr : Ye.sibling = hr, Ye = hr);
      return n && Ge.forEach(function(Xl) {
        return r(N, Xl);
      }), kn && Eo(N, at), De;
    }
    function Me(N, k, U, te) {
      var De = be(U);
      if (typeof De != "function") throw Error(v(150));
      if (U = De.call(U), U == null) throw Error(v(151));
      for (var Ye = De = null, Ge = k, at = k = 0, hr = null, an = U.next(); Ge !== null && !an.done; at++, an = U.next()) {
        Ge.index > at ? (hr = Ge, Ge = null) : hr = Ge.sibling;
        var Xl = q(N, Ge, an.value, te);
        if (Xl === null) {
          Ge === null && (Ge = hr);
          break;
        }
        n && Ge && Xl.alternate === null && r(N, Ge), k = p(Xl, k, at), Ye === null ? De = Xl : Ye.sibling = Xl, Ye = Xl, Ge = hr;
      }
      if (an.done) return l(
        N,
        Ge
      ), kn && Eo(N, at), De;
      if (Ge === null) {
        for (; !an.done; at++, an = U.next()) an = re(N, an.value, te), an !== null && (k = p(an, k, at), Ye === null ? De = an : Ye.sibling = an, Ye = an);
        return kn && Eo(N, at), De;
      }
      for (Ge = u(N, Ge); !an.done; at++, an = U.next()) an = ge(Ge, N, at, an.value, te), an !== null && (n && an.alternate !== null && Ge.delete(an.key === null ? at : an.key), k = p(an, k, at), Ye === null ? De = an : Ye.sibling = an, Ye = an);
      return n && Ge.forEach(function(Dh) {
        return r(N, Dh);
      }), kn && Eo(N, at), De;
    }
    function Yn(N, k, U, te) {
      if (typeof U == "object" && U !== null && U.type === je && U.key === null && (U = U.props.children), typeof U == "object" && U !== null) {
        switch (U.$$typeof) {
          case _e:
            e: {
              for (var De = U.key, Ye = k; Ye !== null; ) {
                if (Ye.key === De) {
                  if (De = U.type, De === je) {
                    if (Ye.tag === 7) {
                      l(N, Ye.sibling), k = c(Ye, U.props.children), k.return = N, N = k;
                      break e;
                    }
                  } else if (Ye.elementType === De || typeof De == "object" && De !== null && De.$$typeof === At && Wv(De) === Ye.type) {
                    l(N, Ye.sibling), k = c(Ye, U.props), k.ref = Co(N, Ye, U), k.return = N, N = k;
                    break e;
                  }
                  l(N, Ye);
                  break;
                } else r(N, Ye);
                Ye = Ye.sibling;
              }
              U.type === je ? (k = cl(U.props.children, N.mode, te, U.key), k.return = N, N = k) : (te = Is(U.type, U.key, U.props, null, N.mode, te), te.ref = Co(N, k, U), te.return = N, N = te);
            }
            return S(N);
          case Le:
            e: {
              for (Ye = U.key; k !== null; ) {
                if (k.key === Ye) if (k.tag === 4 && k.stateNode.containerInfo === U.containerInfo && k.stateNode.implementation === U.implementation) {
                  l(N, k.sibling), k = c(k, U.children || []), k.return = N, N = k;
                  break e;
                } else {
                  l(N, k);
                  break;
                }
                else r(N, k);
                k = k.sibling;
              }
              k = mf(U, N.mode, te), k.return = N, N = k;
            }
            return S(N);
          case At:
            return Ye = U._init, Yn(N, k, Ye(U._payload), te);
        }
        if (Ct(U)) return xe(N, k, U, te);
        if (be(U)) return Me(N, k, U, te);
        Uc(N, U);
      }
      return typeof U == "string" && U !== "" || typeof U == "number" ? (U = "" + U, k !== null && k.tag === 6 ? (l(N, k.sibling), k = c(k, U), k.return = N, N = k) : (l(N, k), k = ap(U, N.mode, te), k.return = N, N = k), S(N)) : l(N, k);
    }
    return Yn;
  }
  var Vn = To(!0), ve = To(!1), Ra = Fa(null), ca = null, Eu = null, Dd = null;
  function kd() {
    Dd = Eu = ca = null;
  }
  function Od(n) {
    var r = Ra.current;
    bn(Ra), n._currentValue = r;
  }
  function Md(n, r, l) {
    for (; n !== null; ) {
      var u = n.alternate;
      if ((n.childLanes & r) !== r ? (n.childLanes |= r, u !== null && (u.childLanes |= r)) : u !== null && (u.childLanes & r) !== r && (u.childLanes |= r), n === l) break;
      n = n.return;
    }
  }
  function Nn(n, r) {
    ca = n, Dd = Eu = null, n = n.dependencies, n !== null && n.firstContext !== null && ((n.lanes & r) !== 0 && (tr = !0), n.firstContext = null);
  }
  function Va(n) {
    var r = n._currentValue;
    if (Dd !== n) if (n = { context: n, memoizedValue: r, next: null }, Eu === null) {
      if (ca === null) throw Error(v(308));
      Eu = n, ca.dependencies = { lanes: 0, firstContext: n };
    } else Eu = Eu.next = n;
    return r;
  }
  var Ro = null;
  function Ld(n) {
    Ro === null ? Ro = [n] : Ro.push(n);
  }
  function Nd(n, r, l, u) {
    var c = r.interleaved;
    return c === null ? (l.next = l, Ld(r)) : (l.next = c.next, c.next = l), r.interleaved = l, wa(n, u);
  }
  function wa(n, r) {
    n.lanes |= r;
    var l = n.alternate;
    for (l !== null && (l.lanes |= r), l = n, n = n.return; n !== null; ) n.childLanes |= r, l = n.alternate, l !== null && (l.childLanes |= r), l = n, n = n.return;
    return l.tag === 3 ? l.stateNode : null;
  }
  var ba = !1;
  function Ad(n) {
    n.updateQueue = { baseState: n.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, interleaved: null, lanes: 0 }, effects: null };
  }
  function Gv(n, r) {
    n = n.updateQueue, r.updateQueue === n && (r.updateQueue = { baseState: n.baseState, firstBaseUpdate: n.firstBaseUpdate, lastBaseUpdate: n.lastBaseUpdate, shared: n.shared, effects: n.effects });
  }
  function il(n, r) {
    return { eventTime: n, lane: r, tag: 0, payload: null, callback: null, next: null };
  }
  function Hl(n, r, l) {
    var u = n.updateQueue;
    if (u === null) return null;
    if (u = u.shared, (Bt & 2) !== 0) {
      var c = u.pending;
      return c === null ? r.next = r : (r.next = c.next, c.next = r), u.pending = r, wa(n, l);
    }
    return c = u.interleaved, c === null ? (r.next = r, Ld(u)) : (r.next = c.next, c.next = r), u.interleaved = r, wa(n, l);
  }
  function jc(n, r, l) {
    if (r = r.updateQueue, r !== null && (r = r.shared, (l & 4194240) !== 0)) {
      var u = r.lanes;
      u &= n.pendingLanes, l |= u, r.lanes = l, Ki(n, l);
    }
  }
  function Qv(n, r) {
    var l = n.updateQueue, u = n.alternate;
    if (u !== null && (u = u.updateQueue, l === u)) {
      var c = null, p = null;
      if (l = l.firstBaseUpdate, l !== null) {
        do {
          var S = { eventTime: l.eventTime, lane: l.lane, tag: l.tag, payload: l.payload, callback: l.callback, next: null };
          p === null ? c = p = S : p = p.next = S, l = l.next;
        } while (l !== null);
        p === null ? c = p = r : p = p.next = r;
      } else c = p = r;
      l = { baseState: u.baseState, firstBaseUpdate: c, lastBaseUpdate: p, shared: u.shared, effects: u.effects }, n.updateQueue = l;
      return;
    }
    n = l.lastBaseUpdate, n === null ? l.firstBaseUpdate = r : n.next = r, l.lastBaseUpdate = r;
  }
  function hs(n, r, l, u) {
    var c = n.updateQueue;
    ba = !1;
    var p = c.firstBaseUpdate, S = c.lastBaseUpdate, w = c.shared.pending;
    if (w !== null) {
      c.shared.pending = null;
      var x = w, H = x.next;
      x.next = null, S === null ? p = H : S.next = H, S = x;
      var ee = n.alternate;
      ee !== null && (ee = ee.updateQueue, w = ee.lastBaseUpdate, w !== S && (w === null ? ee.firstBaseUpdate = H : w.next = H, ee.lastBaseUpdate = x));
    }
    if (p !== null) {
      var re = c.baseState;
      S = 0, ee = H = x = null, w = p;
      do {
        var q = w.lane, ge = w.eventTime;
        if ((u & q) === q) {
          ee !== null && (ee = ee.next = {
            eventTime: ge,
            lane: 0,
            tag: w.tag,
            payload: w.payload,
            callback: w.callback,
            next: null
          });
          e: {
            var xe = n, Me = w;
            switch (q = r, ge = l, Me.tag) {
              case 1:
                if (xe = Me.payload, typeof xe == "function") {
                  re = xe.call(ge, re, q);
                  break e;
                }
                re = xe;
                break e;
              case 3:
                xe.flags = xe.flags & -65537 | 128;
              case 0:
                if (xe = Me.payload, q = typeof xe == "function" ? xe.call(ge, re, q) : xe, q == null) break e;
                re = ue({}, re, q);
                break e;
              case 2:
                ba = !0;
            }
          }
          w.callback !== null && w.lane !== 0 && (n.flags |= 64, q = c.effects, q === null ? c.effects = [w] : q.push(w));
        } else ge = { eventTime: ge, lane: q, tag: w.tag, payload: w.payload, callback: w.callback, next: null }, ee === null ? (H = ee = ge, x = re) : ee = ee.next = ge, S |= q;
        if (w = w.next, w === null) {
          if (w = c.shared.pending, w === null) break;
          q = w, w = q.next, q.next = null, c.lastBaseUpdate = q, c.shared.pending = null;
        }
      } while (!0);
      if (ee === null && (x = re), c.baseState = x, c.firstBaseUpdate = H, c.lastBaseUpdate = ee, r = c.shared.interleaved, r !== null) {
        c = r;
        do
          S |= c.lane, c = c.next;
        while (c !== r);
      } else p === null && (c.shared.lanes = 0);
      ji |= S, n.lanes = S, n.memoizedState = re;
    }
  }
  function zd(n, r, l) {
    if (n = r.effects, r.effects = null, n !== null) for (r = 0; r < n.length; r++) {
      var u = n[r], c = u.callback;
      if (c !== null) {
        if (u.callback = null, u = l, typeof c != "function") throw Error(v(191, c));
        c.call(u);
      }
    }
  }
  var ms = {}, Ni = Fa(ms), ys = Fa(ms), gs = Fa(ms);
  function wo(n) {
    if (n === ms) throw Error(v(174));
    return n;
  }
  function Ud(n, r) {
    switch (ze(gs, r), ze(ys, n), ze(Ni, ms), n = r.nodeType, n) {
      case 9:
      case 11:
        r = (r = r.documentElement) ? r.namespaceURI : Zt(null, "");
        break;
      default:
        n = n === 8 ? r.parentNode : r, r = n.namespaceURI || null, n = n.tagName, r = Zt(r, n);
    }
    bn(Ni), ze(Ni, r);
  }
  function bo() {
    bn(Ni), bn(ys), bn(gs);
  }
  function Xv(n) {
    wo(gs.current);
    var r = wo(Ni.current), l = Zt(r, n.type);
    r !== l && (ze(ys, n), ze(Ni, l));
  }
  function Fc(n) {
    ys.current === n && (bn(Ni), bn(ys));
  }
  var An = Fa(0);
  function Hc(n) {
    for (var r = n; r !== null; ) {
      if (r.tag === 13) {
        var l = r.memoizedState;
        if (l !== null && (l = l.dehydrated, l === null || l.data === "$?" || l.data === "$!")) return r;
      } else if (r.tag === 19 && r.memoizedProps.revealOrder !== void 0) {
        if ((r.flags & 128) !== 0) return r;
      } else if (r.child !== null) {
        r.child.return = r, r = r.child;
        continue;
      }
      if (r === n) break;
      for (; r.sibling === null; ) {
        if (r.return === null || r.return === n) return null;
        r = r.return;
      }
      r.sibling.return = r.return, r = r.sibling;
    }
    return null;
  }
  var Ss = [];
  function Pe() {
    for (var n = 0; n < Ss.length; n++) Ss[n]._workInProgressVersionPrimary = null;
    Ss.length = 0;
  }
  var kt = Je.ReactCurrentDispatcher, nn = Je.ReactCurrentBatchConfig, Sn = 0, rn = null, er = null, pr = null, Pc = !1, Es = !1, _o = 0, K = 0;
  function Kt() {
    throw Error(v(321));
  }
  function qe(n, r) {
    if (r === null) return !1;
    for (var l = 0; l < r.length && l < n.length; l++) if (!si(n[l], r[l])) return !1;
    return !0;
  }
  function Pl(n, r, l, u, c, p) {
    if (Sn = p, rn = r, r.memoizedState = null, r.updateQueue = null, r.lanes = 0, kt.current = n === null || n.memoizedState === null ? tf : _s, n = l(u, c), Es) {
      p = 0;
      do {
        if (Es = !1, _o = 0, 25 <= p) throw Error(v(301));
        p += 1, pr = er = null, r.updateQueue = null, kt.current = nf, n = l(u, c);
      } while (Es);
    }
    if (kt.current = Mo, r = er !== null && er.next !== null, Sn = 0, pr = er = rn = null, Pc = !1, r) throw Error(v(300));
    return n;
  }
  function fi() {
    var n = _o !== 0;
    return _o = 0, n;
  }
  function Ur() {
    var n = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
    return pr === null ? rn.memoizedState = pr = n : pr = pr.next = n, pr;
  }
  function Bn() {
    if (er === null) {
      var n = rn.alternate;
      n = n !== null ? n.memoizedState : null;
    } else n = er.next;
    var r = pr === null ? rn.memoizedState : pr.next;
    if (r !== null) pr = r, er = n;
    else {
      if (n === null) throw Error(v(310));
      er = n, n = { memoizedState: er.memoizedState, baseState: er.baseState, baseQueue: er.baseQueue, queue: er.queue, next: null }, pr === null ? rn.memoizedState = pr = n : pr = pr.next = n;
    }
    return pr;
  }
  function ll(n, r) {
    return typeof r == "function" ? r(n) : r;
  }
  function Vl(n) {
    var r = Bn(), l = r.queue;
    if (l === null) throw Error(v(311));
    l.lastRenderedReducer = n;
    var u = er, c = u.baseQueue, p = l.pending;
    if (p !== null) {
      if (c !== null) {
        var S = c.next;
        c.next = p.next, p.next = S;
      }
      u.baseQueue = c = p, l.pending = null;
    }
    if (c !== null) {
      p = c.next, u = u.baseState;
      var w = S = null, x = null, H = p;
      do {
        var ee = H.lane;
        if ((Sn & ee) === ee) x !== null && (x = x.next = { lane: 0, action: H.action, hasEagerState: H.hasEagerState, eagerState: H.eagerState, next: null }), u = H.hasEagerState ? H.eagerState : n(u, H.action);
        else {
          var re = {
            lane: ee,
            action: H.action,
            hasEagerState: H.hasEagerState,
            eagerState: H.eagerState,
            next: null
          };
          x === null ? (w = x = re, S = u) : x = x.next = re, rn.lanes |= ee, ji |= ee;
        }
        H = H.next;
      } while (H !== null && H !== p);
      x === null ? S = u : x.next = w, si(u, r.memoizedState) || (tr = !0), r.memoizedState = u, r.baseState = S, r.baseQueue = x, l.lastRenderedState = u;
    }
    if (n = l.interleaved, n !== null) {
      c = n;
      do
        p = c.lane, rn.lanes |= p, ji |= p, c = c.next;
      while (c !== n);
    } else c === null && (l.lanes = 0);
    return [r.memoizedState, l.dispatch];
  }
  function xo(n) {
    var r = Bn(), l = r.queue;
    if (l === null) throw Error(v(311));
    l.lastRenderedReducer = n;
    var u = l.dispatch, c = l.pending, p = r.memoizedState;
    if (c !== null) {
      l.pending = null;
      var S = c = c.next;
      do
        p = n(p, S.action), S = S.next;
      while (S !== c);
      si(p, r.memoizedState) || (tr = !0), r.memoizedState = p, r.baseQueue === null && (r.baseState = p), l.lastRenderedState = p;
    }
    return [p, u];
  }
  function Vc() {
  }
  function Bc(n, r) {
    var l = rn, u = Bn(), c = r(), p = !si(u.memoizedState, c);
    if (p && (u.memoizedState = c, tr = !0), u = u.queue, Cs(Yc.bind(null, l, u, n), [n]), u.getSnapshot !== r || p || pr !== null && pr.memoizedState.tag & 1) {
      if (l.flags |= 2048, Do(9, Ic.bind(null, l, u, c, r), void 0, null), cr === null) throw Error(v(349));
      (Sn & 30) !== 0 || $c(l, r, c);
    }
    return c;
  }
  function $c(n, r, l) {
    n.flags |= 16384, n = { getSnapshot: r, value: l }, r = rn.updateQueue, r === null ? (r = { lastEffect: null, stores: null }, rn.updateQueue = r, r.stores = [n]) : (l = r.stores, l === null ? r.stores = [n] : l.push(n));
  }
  function Ic(n, r, l, u) {
    r.value = l, r.getSnapshot = u, Wc(r) && Gc(n);
  }
  function Yc(n, r, l) {
    return l(function() {
      Wc(r) && Gc(n);
    });
  }
  function Wc(n) {
    var r = n.getSnapshot;
    n = n.value;
    try {
      var l = r();
      return !si(n, l);
    } catch {
      return !0;
    }
  }
  function Gc(n) {
    var r = wa(n, 1);
    r !== null && Gr(r, n, 1, -1);
  }
  function Qc(n) {
    var r = Ur();
    return typeof n == "function" && (n = n()), r.memoizedState = r.baseState = n, n = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: ll, lastRenderedState: n }, r.queue = n, n = n.dispatch = Oo.bind(null, rn, n), [r.memoizedState, n];
  }
  function Do(n, r, l, u) {
    return n = { tag: n, create: r, destroy: l, deps: u, next: null }, r = rn.updateQueue, r === null ? (r = { lastEffect: null, stores: null }, rn.updateQueue = r, r.lastEffect = n.next = n) : (l = r.lastEffect, l === null ? r.lastEffect = n.next = n : (u = l.next, l.next = n, n.next = u, r.lastEffect = n)), n;
  }
  function Xc() {
    return Bn().memoizedState;
  }
  function Cu(n, r, l, u) {
    var c = Ur();
    rn.flags |= n, c.memoizedState = Do(1 | r, l, void 0, u === void 0 ? null : u);
  }
  function Tu(n, r, l, u) {
    var c = Bn();
    u = u === void 0 ? null : u;
    var p = void 0;
    if (er !== null) {
      var S = er.memoizedState;
      if (p = S.destroy, u !== null && qe(u, S.deps)) {
        c.memoizedState = Do(r, l, p, u);
        return;
      }
    }
    rn.flags |= n, c.memoizedState = Do(1 | r, l, p, u);
  }
  function Kc(n, r) {
    return Cu(8390656, 8, n, r);
  }
  function Cs(n, r) {
    return Tu(2048, 8, n, r);
  }
  function qc(n, r) {
    return Tu(4, 2, n, r);
  }
  function Ts(n, r) {
    return Tu(4, 4, n, r);
  }
  function ko(n, r) {
    if (typeof r == "function") return n = n(), r(n), function() {
      r(null);
    };
    if (r != null) return n = n(), r.current = n, function() {
      r.current = null;
    };
  }
  function Zc(n, r, l) {
    return l = l != null ? l.concat([n]) : null, Tu(4, 4, ko.bind(null, r, n), l);
  }
  function Rs() {
  }
  function Jc(n, r) {
    var l = Bn();
    r = r === void 0 ? null : r;
    var u = l.memoizedState;
    return u !== null && r !== null && qe(r, u[1]) ? u[0] : (l.memoizedState = [n, r], n);
  }
  function ef(n, r) {
    var l = Bn();
    r = r === void 0 ? null : r;
    var u = l.memoizedState;
    return u !== null && r !== null && qe(r, u[1]) ? u[0] : (n = n(), l.memoizedState = [n, r], n);
  }
  function jd(n, r, l) {
    return (Sn & 21) === 0 ? (n.baseState && (n.baseState = !1, tr = !0), n.memoizedState = l) : (si(l, r) || (l = tu(), rn.lanes |= l, ji |= l, n.baseState = !0), r);
  }
  function ws(n, r) {
    var l = tn;
    tn = l !== 0 && 4 > l ? l : 4, n(!0);
    var u = nn.transition;
    nn.transition = {};
    try {
      n(!1), r();
    } finally {
      tn = l, nn.transition = u;
    }
  }
  function Fd() {
    return Bn().memoizedState;
  }
  function bs(n, r, l) {
    var u = Fi(n);
    if (l = { lane: u, action: l, hasEagerState: !1, eagerState: null, next: null }, fa(n)) Kv(r, l);
    else if (l = Nd(n, r, l, u), l !== null) {
      var c = ar();
      Gr(l, n, u, c), Tn(l, r, u);
    }
  }
  function Oo(n, r, l) {
    var u = Fi(n), c = { lane: u, action: l, hasEagerState: !1, eagerState: null, next: null };
    if (fa(n)) Kv(r, c);
    else {
      var p = n.alternate;
      if (n.lanes === 0 && (p === null || p.lanes === 0) && (p = r.lastRenderedReducer, p !== null)) try {
        var S = r.lastRenderedState, w = p(S, l);
        if (c.hasEagerState = !0, c.eagerState = w, si(w, S)) {
          var x = r.interleaved;
          x === null ? (c.next = c, Ld(r)) : (c.next = x.next, x.next = c), r.interleaved = c;
          return;
        }
      } catch {
      } finally {
      }
      l = Nd(n, r, c, u), l !== null && (c = ar(), Gr(l, n, u, c), Tn(l, r, u));
    }
  }
  function fa(n) {
    var r = n.alternate;
    return n === rn || r !== null && r === rn;
  }
  function Kv(n, r) {
    Es = Pc = !0;
    var l = n.pending;
    l === null ? r.next = r : (r.next = l.next, l.next = r), n.pending = r;
  }
  function Tn(n, r, l) {
    if ((l & 4194240) !== 0) {
      var u = r.lanes;
      u &= n.pendingLanes, l |= u, r.lanes = l, Ki(n, l);
    }
  }
  var Mo = { readContext: Va, useCallback: Kt, useContext: Kt, useEffect: Kt, useImperativeHandle: Kt, useInsertionEffect: Kt, useLayoutEffect: Kt, useMemo: Kt, useReducer: Kt, useRef: Kt, useState: Kt, useDebugValue: Kt, useDeferredValue: Kt, useTransition: Kt, useMutableSource: Kt, useSyncExternalStore: Kt, useId: Kt, unstable_isNewReconciler: !1 }, tf = { readContext: Va, useCallback: function(n, r) {
    return Ur().memoizedState = [n, r === void 0 ? null : r], n;
  }, useContext: Va, useEffect: Kc, useImperativeHandle: function(n, r, l) {
    return l = l != null ? l.concat([n]) : null, Cu(
      4194308,
      4,
      ko.bind(null, r, n),
      l
    );
  }, useLayoutEffect: function(n, r) {
    return Cu(4194308, 4, n, r);
  }, useInsertionEffect: function(n, r) {
    return Cu(4, 2, n, r);
  }, useMemo: function(n, r) {
    var l = Ur();
    return r = r === void 0 ? null : r, n = n(), l.memoizedState = [n, r], n;
  }, useReducer: function(n, r, l) {
    var u = Ur();
    return r = l !== void 0 ? l(r) : r, u.memoizedState = u.baseState = r, n = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: n, lastRenderedState: r }, u.queue = n, n = n.dispatch = bs.bind(null, rn, n), [u.memoizedState, n];
  }, useRef: function(n) {
    var r = Ur();
    return n = { current: n }, r.memoizedState = n;
  }, useState: Qc, useDebugValue: Rs, useDeferredValue: function(n) {
    return Ur().memoizedState = n;
  }, useTransition: function() {
    var n = Qc(!1), r = n[0];
    return n = ws.bind(null, n[1]), Ur().memoizedState = n, [r, n];
  }, useMutableSource: function() {
  }, useSyncExternalStore: function(n, r, l) {
    var u = rn, c = Ur();
    if (kn) {
      if (l === void 0) throw Error(v(407));
      l = l();
    } else {
      if (l = r(), cr === null) throw Error(v(349));
      (Sn & 30) !== 0 || $c(u, r, l);
    }
    c.memoizedState = l;
    var p = { value: l, getSnapshot: r };
    return c.queue = p, Kc(Yc.bind(
      null,
      u,
      p,
      n
    ), [n]), u.flags |= 2048, Do(9, Ic.bind(null, u, p, l, r), void 0, null), l;
  }, useId: function() {
    var n = Ur(), r = cr.identifierPrefix;
    if (kn) {
      var l = Li, u = Mi;
      l = (u & ~(1 << 32 - Vr(u) - 1)).toString(32) + l, r = ":" + r + "R" + l, l = _o++, 0 < l && (r += "H" + l.toString(32)), r += ":";
    } else l = K++, r = ":" + r + "r" + l.toString(32) + ":";
    return n.memoizedState = r;
  }, unstable_isNewReconciler: !1 }, _s = {
    readContext: Va,
    useCallback: Jc,
    useContext: Va,
    useEffect: Cs,
    useImperativeHandle: Zc,
    useInsertionEffect: qc,
    useLayoutEffect: Ts,
    useMemo: ef,
    useReducer: Vl,
    useRef: Xc,
    useState: function() {
      return Vl(ll);
    },
    useDebugValue: Rs,
    useDeferredValue: function(n) {
      var r = Bn();
      return jd(r, er.memoizedState, n);
    },
    useTransition: function() {
      var n = Vl(ll)[0], r = Bn().memoizedState;
      return [n, r];
    },
    useMutableSource: Vc,
    useSyncExternalStore: Bc,
    useId: Fd,
    unstable_isNewReconciler: !1
  }, nf = { readContext: Va, useCallback: Jc, useContext: Va, useEffect: Cs, useImperativeHandle: Zc, useInsertionEffect: qc, useLayoutEffect: Ts, useMemo: ef, useReducer: xo, useRef: Xc, useState: function() {
    return xo(ll);
  }, useDebugValue: Rs, useDeferredValue: function(n) {
    var r = Bn();
    return er === null ? r.memoizedState = n : jd(r, er.memoizedState, n);
  }, useTransition: function() {
    var n = xo(ll)[0], r = Bn().memoizedState;
    return [n, r];
  }, useMutableSource: Vc, useSyncExternalStore: Bc, useId: Fd, unstable_isNewReconciler: !1 };
  function di(n, r) {
    if (n && n.defaultProps) {
      r = ue({}, r), n = n.defaultProps;
      for (var l in n) r[l] === void 0 && (r[l] = n[l]);
      return r;
    }
    return r;
  }
  function Hd(n, r, l, u) {
    r = n.memoizedState, l = l(u, r), l = l == null ? r : ue({}, r, l), n.memoizedState = l, n.lanes === 0 && (n.updateQueue.baseState = l);
  }
  var rf = { isMounted: function(n) {
    return (n = n._reactInternals) ? mt(n) === n : !1;
  }, enqueueSetState: function(n, r, l) {
    n = n._reactInternals;
    var u = ar(), c = Fi(n), p = il(u, c);
    p.payload = r, l != null && (p.callback = l), r = Hl(n, p, c), r !== null && (Gr(r, n, c, u), jc(r, n, c));
  }, enqueueReplaceState: function(n, r, l) {
    n = n._reactInternals;
    var u = ar(), c = Fi(n), p = il(u, c);
    p.tag = 1, p.payload = r, l != null && (p.callback = l), r = Hl(n, p, c), r !== null && (Gr(r, n, c, u), jc(r, n, c));
  }, enqueueForceUpdate: function(n, r) {
    n = n._reactInternals;
    var l = ar(), u = Fi(n), c = il(l, u);
    c.tag = 2, r != null && (c.callback = r), r = Hl(n, c, u), r !== null && (Gr(r, n, u, l), jc(r, n, u));
  } };
  function qv(n, r, l, u, c, p, S) {
    return n = n.stateNode, typeof n.shouldComponentUpdate == "function" ? n.shouldComponentUpdate(u, p, S) : r.prototype && r.prototype.isPureReactComponent ? !is(l, u) || !is(c, p) : !0;
  }
  function af(n, r, l) {
    var u = !1, c = zr, p = r.contextType;
    return typeof p == "object" && p !== null ? p = Va(p) : (c = Zn(r) ? la : Hn.current, u = r.contextTypes, p = (u = u != null) ? oa(n, c) : zr), r = new r(l, p), n.memoizedState = r.state !== null && r.state !== void 0 ? r.state : null, r.updater = rf, n.stateNode = r, r._reactInternals = n, u && (n = n.stateNode, n.__reactInternalMemoizedUnmaskedChildContext = c, n.__reactInternalMemoizedMaskedChildContext = p), r;
  }
  function Zv(n, r, l, u) {
    n = r.state, typeof r.componentWillReceiveProps == "function" && r.componentWillReceiveProps(l, u), typeof r.UNSAFE_componentWillReceiveProps == "function" && r.UNSAFE_componentWillReceiveProps(l, u), r.state !== n && rf.enqueueReplaceState(r, r.state, null);
  }
  function xs(n, r, l, u) {
    var c = n.stateNode;
    c.props = l, c.state = n.memoizedState, c.refs = {}, Ad(n);
    var p = r.contextType;
    typeof p == "object" && p !== null ? c.context = Va(p) : (p = Zn(r) ? la : Hn.current, c.context = oa(n, p)), c.state = n.memoizedState, p = r.getDerivedStateFromProps, typeof p == "function" && (Hd(n, r, p, l), c.state = n.memoizedState), typeof r.getDerivedStateFromProps == "function" || typeof c.getSnapshotBeforeUpdate == "function" || typeof c.UNSAFE_componentWillMount != "function" && typeof c.componentWillMount != "function" || (r = c.state, typeof c.componentWillMount == "function" && c.componentWillMount(), typeof c.UNSAFE_componentWillMount == "function" && c.UNSAFE_componentWillMount(), r !== c.state && rf.enqueueReplaceState(c, c.state, null), hs(n, l, c, u), c.state = n.memoizedState), typeof c.componentDidMount == "function" && (n.flags |= 4194308);
  }
  function Lo(n, r) {
    try {
      var l = "", u = r;
      do
        l += gt(u), u = u.return;
      while (u);
      var c = l;
    } catch (p) {
      c = `
Error generating stack: ` + p.message + `
` + p.stack;
    }
    return { value: n, source: r, stack: c, digest: null };
  }
  function Pd(n, r, l) {
    return { value: n, source: null, stack: l ?? null, digest: r ?? null };
  }
  function Vd(n, r) {
    try {
      console.error(r.value);
    } catch (l) {
      setTimeout(function() {
        throw l;
      });
    }
  }
  var lf = typeof WeakMap == "function" ? WeakMap : Map;
  function Jv(n, r, l) {
    l = il(-1, l), l.tag = 3, l.payload = { element: null };
    var u = r.value;
    return l.callback = function() {
      Du || (Du = !0, zo = u), Vd(n, r);
    }, l;
  }
  function Bd(n, r, l) {
    l = il(-1, l), l.tag = 3;
    var u = n.type.getDerivedStateFromError;
    if (typeof u == "function") {
      var c = r.value;
      l.payload = function() {
        return u(c);
      }, l.callback = function() {
        Vd(n, r);
      };
    }
    var p = n.stateNode;
    return p !== null && typeof p.componentDidCatch == "function" && (l.callback = function() {
      Vd(n, r), typeof u != "function" && (Il === null ? Il = /* @__PURE__ */ new Set([this]) : Il.add(this));
      var S = r.stack;
      this.componentDidCatch(r.value, { componentStack: S !== null ? S : "" });
    }), l;
  }
  function $d(n, r, l) {
    var u = n.pingCache;
    if (u === null) {
      u = n.pingCache = new lf();
      var c = /* @__PURE__ */ new Set();
      u.set(r, c);
    } else c = u.get(r), c === void 0 && (c = /* @__PURE__ */ new Set(), u.set(r, c));
    c.has(l) || (c.add(l), n = Ly.bind(null, n, r, l), r.then(n, n));
  }
  function eh(n) {
    do {
      var r;
      if ((r = n.tag === 13) && (r = n.memoizedState, r = r !== null ? r.dehydrated !== null : !0), r) return n;
      n = n.return;
    } while (n !== null);
    return null;
  }
  function Bl(n, r, l, u, c) {
    return (n.mode & 1) === 0 ? (n === r ? n.flags |= 65536 : (n.flags |= 128, l.flags |= 131072, l.flags &= -52805, l.tag === 1 && (l.alternate === null ? l.tag = 17 : (r = il(-1, 1), r.tag = 2, Hl(l, r, 1))), l.lanes |= 1), n) : (n.flags |= 65536, n.lanes = c, n);
  }
  var Ds = Je.ReactCurrentOwner, tr = !1;
  function Rr(n, r, l, u) {
    r.child = n === null ? ve(r, null, l, u) : Vn(r, n.child, l, u);
  }
  function da(n, r, l, u, c) {
    l = l.render;
    var p = r.ref;
    return Nn(r, c), u = Pl(n, r, l, u, p, c), l = fi(), n !== null && !tr ? (r.updateQueue = n.updateQueue, r.flags &= -2053, n.lanes &= ~c, $a(n, r, c)) : (kn && l && Nc(r), r.flags |= 1, Rr(n, r, u, c), r.child);
  }
  function No(n, r, l, u, c) {
    if (n === null) {
      var p = l.type;
      return typeof p == "function" && !rp(p) && p.defaultProps === void 0 && l.compare === null && l.defaultProps === void 0 ? (r.tag = 15, r.type = p, Et(n, r, p, u, c)) : (n = Is(l.type, null, u, r, r.mode, c), n.ref = r.ref, n.return = r, r.child = n);
    }
    if (p = n.child, (n.lanes & c) === 0) {
      var S = p.memoizedProps;
      if (l = l.compare, l = l !== null ? l : is, l(S, u) && n.ref === r.ref) return $a(n, r, c);
    }
    return r.flags |= 1, n = Wl(p, u), n.ref = r.ref, n.return = r, r.child = n;
  }
  function Et(n, r, l, u, c) {
    if (n !== null) {
      var p = n.memoizedProps;
      if (is(p, u) && n.ref === r.ref) if (tr = !1, r.pendingProps = u = p, (n.lanes & c) !== 0) (n.flags & 131072) !== 0 && (tr = !0);
      else return r.lanes = n.lanes, $a(n, r, c);
    }
    return th(n, r, l, u, c);
  }
  function ks(n, r, l) {
    var u = r.pendingProps, c = u.children, p = n !== null ? n.memoizedState : null;
    if (u.mode === "hidden") if ((r.mode & 1) === 0) r.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, ze(bu, _a), _a |= l;
    else {
      if ((l & 1073741824) === 0) return n = p !== null ? p.baseLanes | l : l, r.lanes = r.childLanes = 1073741824, r.memoizedState = { baseLanes: n, cachePool: null, transitions: null }, r.updateQueue = null, ze(bu, _a), _a |= n, null;
      r.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, u = p !== null ? p.baseLanes : l, ze(bu, _a), _a |= u;
    }
    else p !== null ? (u = p.baseLanes | l, r.memoizedState = null) : u = l, ze(bu, _a), _a |= u;
    return Rr(n, r, c, l), r.child;
  }
  function Id(n, r) {
    var l = r.ref;
    (n === null && l !== null || n !== null && n.ref !== l) && (r.flags |= 512, r.flags |= 2097152);
  }
  function th(n, r, l, u, c) {
    var p = Zn(l) ? la : Hn.current;
    return p = oa(r, p), Nn(r, c), l = Pl(n, r, l, u, p, c), u = fi(), n !== null && !tr ? (r.updateQueue = n.updateQueue, r.flags &= -2053, n.lanes &= ~c, $a(n, r, c)) : (kn && u && Nc(r), r.flags |= 1, Rr(n, r, l, c), r.child);
  }
  function nh(n, r, l, u, c) {
    if (Zn(l)) {
      var p = !0;
      dr(r);
    } else p = !1;
    if (Nn(r, c), r.stateNode === null) Ba(n, r), af(r, l, u), xs(r, l, u, c), u = !0;
    else if (n === null) {
      var S = r.stateNode, w = r.memoizedProps;
      S.props = w;
      var x = S.context, H = l.contextType;
      typeof H == "object" && H !== null ? H = Va(H) : (H = Zn(l) ? la : Hn.current, H = oa(r, H));
      var ee = l.getDerivedStateFromProps, re = typeof ee == "function" || typeof S.getSnapshotBeforeUpdate == "function";
      re || typeof S.UNSAFE_componentWillReceiveProps != "function" && typeof S.componentWillReceiveProps != "function" || (w !== u || x !== H) && Zv(r, S, u, H), ba = !1;
      var q = r.memoizedState;
      S.state = q, hs(r, u, S, c), x = r.memoizedState, w !== u || q !== x || ur.current || ba ? (typeof ee == "function" && (Hd(r, l, ee, u), x = r.memoizedState), (w = ba || qv(r, l, w, u, q, x, H)) ? (re || typeof S.UNSAFE_componentWillMount != "function" && typeof S.componentWillMount != "function" || (typeof S.componentWillMount == "function" && S.componentWillMount(), typeof S.UNSAFE_componentWillMount == "function" && S.UNSAFE_componentWillMount()), typeof S.componentDidMount == "function" && (r.flags |= 4194308)) : (typeof S.componentDidMount == "function" && (r.flags |= 4194308), r.memoizedProps = u, r.memoizedState = x), S.props = u, S.state = x, S.context = H, u = w) : (typeof S.componentDidMount == "function" && (r.flags |= 4194308), u = !1);
    } else {
      S = r.stateNode, Gv(n, r), w = r.memoizedProps, H = r.type === r.elementType ? w : di(r.type, w), S.props = H, re = r.pendingProps, q = S.context, x = l.contextType, typeof x == "object" && x !== null ? x = Va(x) : (x = Zn(l) ? la : Hn.current, x = oa(r, x));
      var ge = l.getDerivedStateFromProps;
      (ee = typeof ge == "function" || typeof S.getSnapshotBeforeUpdate == "function") || typeof S.UNSAFE_componentWillReceiveProps != "function" && typeof S.componentWillReceiveProps != "function" || (w !== re || q !== x) && Zv(r, S, u, x), ba = !1, q = r.memoizedState, S.state = q, hs(r, u, S, c);
      var xe = r.memoizedState;
      w !== re || q !== xe || ur.current || ba ? (typeof ge == "function" && (Hd(r, l, ge, u), xe = r.memoizedState), (H = ba || qv(r, l, H, u, q, xe, x) || !1) ? (ee || typeof S.UNSAFE_componentWillUpdate != "function" && typeof S.componentWillUpdate != "function" || (typeof S.componentWillUpdate == "function" && S.componentWillUpdate(u, xe, x), typeof S.UNSAFE_componentWillUpdate == "function" && S.UNSAFE_componentWillUpdate(u, xe, x)), typeof S.componentDidUpdate == "function" && (r.flags |= 4), typeof S.getSnapshotBeforeUpdate == "function" && (r.flags |= 1024)) : (typeof S.componentDidUpdate != "function" || w === n.memoizedProps && q === n.memoizedState || (r.flags |= 4), typeof S.getSnapshotBeforeUpdate != "function" || w === n.memoizedProps && q === n.memoizedState || (r.flags |= 1024), r.memoizedProps = u, r.memoizedState = xe), S.props = u, S.state = xe, S.context = x, u = H) : (typeof S.componentDidUpdate != "function" || w === n.memoizedProps && q === n.memoizedState || (r.flags |= 4), typeof S.getSnapshotBeforeUpdate != "function" || w === n.memoizedProps && q === n.memoizedState || (r.flags |= 1024), u = !1);
    }
    return Os(n, r, l, u, p, c);
  }
  function Os(n, r, l, u, c, p) {
    Id(n, r);
    var S = (r.flags & 128) !== 0;
    if (!u && !S) return c && Mc(r, l, !1), $a(n, r, p);
    u = r.stateNode, Ds.current = r;
    var w = S && typeof l.getDerivedStateFromError != "function" ? null : u.render();
    return r.flags |= 1, n !== null && S ? (r.child = Vn(r, n.child, null, p), r.child = Vn(r, null, w, p)) : Rr(n, r, w, p), r.memoizedState = u.state, c && Mc(r, l, !0), r.child;
  }
  function Ru(n) {
    var r = n.stateNode;
    r.pendingContext ? $v(n, r.pendingContext, r.pendingContext !== r.context) : r.context && $v(n, r.context, !1), Ud(n, r.containerInfo);
  }
  function rh(n, r, l, u, c) {
    return Fl(), al(c), r.flags |= 256, Rr(n, r, l, u), r.child;
  }
  var of = { dehydrated: null, treeContext: null, retryLane: 0 };
  function Yd(n) {
    return { baseLanes: n, cachePool: null, transitions: null };
  }
  function uf(n, r, l) {
    var u = r.pendingProps, c = An.current, p = !1, S = (r.flags & 128) !== 0, w;
    if ((w = S) || (w = n !== null && n.memoizedState === null ? !1 : (c & 2) !== 0), w ? (p = !0, r.flags &= -129) : (n === null || n.memoizedState !== null) && (c |= 1), ze(An, c & 1), n === null)
      return xd(r), n = r.memoizedState, n !== null && (n = n.dehydrated, n !== null) ? ((r.mode & 1) === 0 ? r.lanes = 1 : n.data === "$!" ? r.lanes = 8 : r.lanes = 1073741824, null) : (S = u.children, n = u.fallback, p ? (u = r.mode, p = r.child, S = { mode: "hidden", children: S }, (u & 1) === 0 && p !== null ? (p.childLanes = 0, p.pendingProps = S) : p = Gl(S, u, 0, null), n = cl(n, u, l, null), p.return = r, n.return = r, p.sibling = n, r.child = p, r.child.memoizedState = Yd(l), r.memoizedState = of, n) : Wd(r, S));
    if (c = n.memoizedState, c !== null && (w = c.dehydrated, w !== null)) return ah(n, r, S, u, w, c, l);
    if (p) {
      p = u.fallback, S = r.mode, c = n.child, w = c.sibling;
      var x = { mode: "hidden", children: u.children };
      return (S & 1) === 0 && r.child !== c ? (u = r.child, u.childLanes = 0, u.pendingProps = x, r.deletions = null) : (u = Wl(c, x), u.subtreeFlags = c.subtreeFlags & 14680064), w !== null ? p = Wl(w, p) : (p = cl(p, S, l, null), p.flags |= 2), p.return = r, u.return = r, u.sibling = p, r.child = u, u = p, p = r.child, S = n.child.memoizedState, S = S === null ? Yd(l) : { baseLanes: S.baseLanes | l, cachePool: null, transitions: S.transitions }, p.memoizedState = S, p.childLanes = n.childLanes & ~l, r.memoizedState = of, u;
    }
    return p = n.child, n = p.sibling, u = Wl(p, { mode: "visible", children: u.children }), (r.mode & 1) === 0 && (u.lanes = l), u.return = r, u.sibling = null, n !== null && (l = r.deletions, l === null ? (r.deletions = [n], r.flags |= 16) : l.push(n)), r.child = u, r.memoizedState = null, u;
  }
  function Wd(n, r) {
    return r = Gl({ mode: "visible", children: r }, n.mode, 0, null), r.return = n, n.child = r;
  }
  function Ms(n, r, l, u) {
    return u !== null && al(u), Vn(r, n.child, null, l), n = Wd(r, r.pendingProps.children), n.flags |= 2, r.memoizedState = null, n;
  }
  function ah(n, r, l, u, c, p, S) {
    if (l)
      return r.flags & 256 ? (r.flags &= -257, u = Pd(Error(v(422))), Ms(n, r, S, u)) : r.memoizedState !== null ? (r.child = n.child, r.flags |= 128, null) : (p = u.fallback, c = r.mode, u = Gl({ mode: "visible", children: u.children }, c, 0, null), p = cl(p, c, S, null), p.flags |= 2, u.return = r, p.return = r, u.sibling = p, r.child = u, (r.mode & 1) !== 0 && Vn(r, n.child, null, S), r.child.memoizedState = Yd(S), r.memoizedState = of, p);
    if ((r.mode & 1) === 0) return Ms(n, r, S, null);
    if (c.data === "$!") {
      if (u = c.nextSibling && c.nextSibling.dataset, u) var w = u.dgst;
      return u = w, p = Error(v(419)), u = Pd(p, u, void 0), Ms(n, r, S, u);
    }
    if (w = (S & n.childLanes) !== 0, tr || w) {
      if (u = cr, u !== null) {
        switch (S & -S) {
          case 4:
            c = 2;
            break;
          case 16:
            c = 8;
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
            c = 32;
            break;
          case 536870912:
            c = 268435456;
            break;
          default:
            c = 0;
        }
        c = (c & (u.suspendedLanes | S)) !== 0 ? 0 : c, c !== 0 && c !== p.retryLane && (p.retryLane = c, wa(n, c), Gr(u, n, c, -1));
      }
      return np(), u = Pd(Error(v(421))), Ms(n, r, S, u);
    }
    return c.data === "$?" ? (r.flags |= 128, r.child = n.child, r = Ny.bind(null, n), c._reactRetry = r, null) : (n = p.treeContext, sa = xi(c.nextSibling), ua = r, kn = !0, Pa = null, n !== null && (Jn[Ha++] = Mi, Jn[Ha++] = Li, Jn[Ha++] = Ta, Mi = n.id, Li = n.overflow, Ta = r), r = Wd(r, u.children), r.flags |= 4096, r);
  }
  function Gd(n, r, l) {
    n.lanes |= r;
    var u = n.alternate;
    u !== null && (u.lanes |= r), Md(n.return, r, l);
  }
  function Ir(n, r, l, u, c) {
    var p = n.memoizedState;
    p === null ? n.memoizedState = { isBackwards: r, rendering: null, renderingStartTime: 0, last: u, tail: l, tailMode: c } : (p.isBackwards = r, p.rendering = null, p.renderingStartTime = 0, p.last = u, p.tail = l, p.tailMode = c);
  }
  function Ai(n, r, l) {
    var u = r.pendingProps, c = u.revealOrder, p = u.tail;
    if (Rr(n, r, u.children, l), u = An.current, (u & 2) !== 0) u = u & 1 | 2, r.flags |= 128;
    else {
      if (n !== null && (n.flags & 128) !== 0) e: for (n = r.child; n !== null; ) {
        if (n.tag === 13) n.memoizedState !== null && Gd(n, l, r);
        else if (n.tag === 19) Gd(n, l, r);
        else if (n.child !== null) {
          n.child.return = n, n = n.child;
          continue;
        }
        if (n === r) break e;
        for (; n.sibling === null; ) {
          if (n.return === null || n.return === r) break e;
          n = n.return;
        }
        n.sibling.return = n.return, n = n.sibling;
      }
      u &= 1;
    }
    if (ze(An, u), (r.mode & 1) === 0) r.memoizedState = null;
    else switch (c) {
      case "forwards":
        for (l = r.child, c = null; l !== null; ) n = l.alternate, n !== null && Hc(n) === null && (c = l), l = l.sibling;
        l = c, l === null ? (c = r.child, r.child = null) : (c = l.sibling, l.sibling = null), Ir(r, !1, c, l, p);
        break;
      case "backwards":
        for (l = null, c = r.child, r.child = null; c !== null; ) {
          if (n = c.alternate, n !== null && Hc(n) === null) {
            r.child = c;
            break;
          }
          n = c.sibling, c.sibling = l, l = c, c = n;
        }
        Ir(r, !0, l, null, p);
        break;
      case "together":
        Ir(r, !1, null, null, void 0);
        break;
      default:
        r.memoizedState = null;
    }
    return r.child;
  }
  function Ba(n, r) {
    (r.mode & 1) === 0 && n !== null && (n.alternate = null, r.alternate = null, r.flags |= 2);
  }
  function $a(n, r, l) {
    if (n !== null && (r.dependencies = n.dependencies), ji |= r.lanes, (l & r.childLanes) === 0) return null;
    if (n !== null && r.child !== n.child) throw Error(v(153));
    if (r.child !== null) {
      for (n = r.child, l = Wl(n, n.pendingProps), r.child = l, l.return = r; n.sibling !== null; ) n = n.sibling, l = l.sibling = Wl(n, n.pendingProps), l.return = r;
      l.sibling = null;
    }
    return r.child;
  }
  function Ls(n, r, l) {
    switch (r.tag) {
      case 3:
        Ru(r), Fl();
        break;
      case 5:
        Xv(r);
        break;
      case 1:
        Zn(r.type) && dr(r);
        break;
      case 4:
        Ud(r, r.stateNode.containerInfo);
        break;
      case 10:
        var u = r.type._context, c = r.memoizedProps.value;
        ze(Ra, u._currentValue), u._currentValue = c;
        break;
      case 13:
        if (u = r.memoizedState, u !== null)
          return u.dehydrated !== null ? (ze(An, An.current & 1), r.flags |= 128, null) : (l & r.child.childLanes) !== 0 ? uf(n, r, l) : (ze(An, An.current & 1), n = $a(n, r, l), n !== null ? n.sibling : null);
        ze(An, An.current & 1);
        break;
      case 19:
        if (u = (l & r.childLanes) !== 0, (n.flags & 128) !== 0) {
          if (u) return Ai(n, r, l);
          r.flags |= 128;
        }
        if (c = r.memoizedState, c !== null && (c.rendering = null, c.tail = null, c.lastEffect = null), ze(An, An.current), u) break;
        return null;
      case 22:
      case 23:
        return r.lanes = 0, ks(n, r, l);
    }
    return $a(n, r, l);
  }
  var Ia, nr, ih, lh;
  Ia = function(n, r) {
    for (var l = r.child; l !== null; ) {
      if (l.tag === 5 || l.tag === 6) n.appendChild(l.stateNode);
      else if (l.tag !== 4 && l.child !== null) {
        l.child.return = l, l = l.child;
        continue;
      }
      if (l === r) break;
      for (; l.sibling === null; ) {
        if (l.return === null || l.return === r) return;
        l = l.return;
      }
      l.sibling.return = l.return, l = l.sibling;
    }
  }, nr = function() {
  }, ih = function(n, r, l, u) {
    var c = n.memoizedProps;
    if (c !== u) {
      n = r.stateNode, wo(Ni.current);
      var p = null;
      switch (l) {
        case "input":
          c = Ce(n, c), u = Ce(n, u), p = [];
          break;
        case "select":
          c = ue({}, c, { value: void 0 }), u = ue({}, u, { value: void 0 }), p = [];
          break;
        case "textarea":
          c = Nt(n, c), u = Nt(n, u), p = [];
          break;
        default:
          typeof c.onClick != "function" && typeof u.onClick == "function" && (n.onclick = Ll);
      }
      pn(l, u);
      var S;
      l = null;
      for (H in c) if (!u.hasOwnProperty(H) && c.hasOwnProperty(H) && c[H] != null) if (H === "style") {
        var w = c[H];
        for (S in w) w.hasOwnProperty(S) && (l || (l = {}), l[S] = "");
      } else H !== "dangerouslySetInnerHTML" && H !== "children" && H !== "suppressContentEditableWarning" && H !== "suppressHydrationWarning" && H !== "autoFocus" && (M.hasOwnProperty(H) ? p || (p = []) : (p = p || []).push(H, null));
      for (H in u) {
        var x = u[H];
        if (w = c != null ? c[H] : void 0, u.hasOwnProperty(H) && x !== w && (x != null || w != null)) if (H === "style") if (w) {
          for (S in w) !w.hasOwnProperty(S) || x && x.hasOwnProperty(S) || (l || (l = {}), l[S] = "");
          for (S in x) x.hasOwnProperty(S) && w[S] !== x[S] && (l || (l = {}), l[S] = x[S]);
        } else l || (p || (p = []), p.push(
          H,
          l
        )), l = x;
        else H === "dangerouslySetInnerHTML" ? (x = x ? x.__html : void 0, w = w ? w.__html : void 0, x != null && w !== x && (p = p || []).push(H, x)) : H === "children" ? typeof x != "string" && typeof x != "number" || (p = p || []).push(H, "" + x) : H !== "suppressContentEditableWarning" && H !== "suppressHydrationWarning" && (M.hasOwnProperty(H) ? (x != null && H === "onScroll" && cn("scroll", n), p || w === x || (p = [])) : (p = p || []).push(H, x));
      }
      l && (p = p || []).push("style", l);
      var H = p;
      (r.updateQueue = H) && (r.flags |= 4);
    }
  }, lh = function(n, r, l, u) {
    l !== u && (r.flags |= 4);
  };
  function Ns(n, r) {
    if (!kn) switch (n.tailMode) {
      case "hidden":
        r = n.tail;
        for (var l = null; r !== null; ) r.alternate !== null && (l = r), r = r.sibling;
        l === null ? n.tail = null : l.sibling = null;
        break;
      case "collapsed":
        l = n.tail;
        for (var u = null; l !== null; ) l.alternate !== null && (u = l), l = l.sibling;
        u === null ? r || n.tail === null ? n.tail = null : n.tail.sibling = null : u.sibling = null;
    }
  }
  function vr(n) {
    var r = n.alternate !== null && n.alternate.child === n.child, l = 0, u = 0;
    if (r) for (var c = n.child; c !== null; ) l |= c.lanes | c.childLanes, u |= c.subtreeFlags & 14680064, u |= c.flags & 14680064, c.return = n, c = c.sibling;
    else for (c = n.child; c !== null; ) l |= c.lanes | c.childLanes, u |= c.subtreeFlags, u |= c.flags, c.return = n, c = c.sibling;
    return n.subtreeFlags |= u, n.childLanes = l, r;
  }
  function oh(n, r, l) {
    var u = r.pendingProps;
    switch (Ac(r), r.tag) {
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
        return vr(r), null;
      case 1:
        return Zn(r.type) && gu(), vr(r), null;
      case 3:
        return u = r.stateNode, bo(), bn(ur), bn(Hn), Pe(), u.pendingContext && (u.context = u.pendingContext, u.pendingContext = null), (n === null || n.child === null) && (zc(r) ? r.flags |= 4 : n === null || n.memoizedState.isDehydrated && (r.flags & 256) === 0 || (r.flags |= 1024, Pa !== null && (Uo(Pa), Pa = null))), nr(n, r), vr(r), null;
      case 5:
        Fc(r);
        var c = wo(gs.current);
        if (l = r.type, n !== null && r.stateNode != null) ih(n, r, l, u, c), n.ref !== r.ref && (r.flags |= 512, r.flags |= 2097152);
        else {
          if (!u) {
            if (r.stateNode === null) throw Error(v(166));
            return vr(r), null;
          }
          if (n = wo(Ni.current), zc(r)) {
            u = r.stateNode, l = r.type;
            var p = r.memoizedProps;
            switch (u[Di] = r, u[fs] = p, n = (r.mode & 1) !== 0, l) {
              case "dialog":
                cn("cancel", u), cn("close", u);
                break;
              case "iframe":
              case "object":
              case "embed":
                cn("load", u);
                break;
              case "video":
              case "audio":
                for (c = 0; c < us.length; c++) cn(us[c], u);
                break;
              case "source":
                cn("error", u);
                break;
              case "img":
              case "image":
              case "link":
                cn(
                  "error",
                  u
                ), cn("load", u);
                break;
              case "details":
                cn("toggle", u);
                break;
              case "input":
                Ve(u, p), cn("invalid", u);
                break;
              case "select":
                u._wrapperState = { wasMultiple: !!p.multiple }, cn("invalid", u);
                break;
              case "textarea":
                wt(u, p), cn("invalid", u);
            }
            pn(l, p), c = null;
            for (var S in p) if (p.hasOwnProperty(S)) {
              var w = p[S];
              S === "children" ? typeof w == "string" ? u.textContent !== w && (p.suppressHydrationWarning !== !0 && xc(u.textContent, w, n), c = ["children", w]) : typeof w == "number" && u.textContent !== "" + w && (p.suppressHydrationWarning !== !0 && xc(
                u.textContent,
                w,
                n
              ), c = ["children", "" + w]) : M.hasOwnProperty(S) && w != null && S === "onScroll" && cn("scroll", u);
            }
            switch (l) {
              case "input":
                jn(u), Lt(u, p, !0);
                break;
              case "textarea":
                jn(u), it(u);
                break;
              case "select":
              case "option":
                break;
              default:
                typeof p.onClick == "function" && (u.onclick = Ll);
            }
            u = c, r.updateQueue = u, u !== null && (r.flags |= 4);
          } else {
            S = c.nodeType === 9 ? c : c.ownerDocument, n === "http://www.w3.org/1999/xhtml" && (n = lt(l)), n === "http://www.w3.org/1999/xhtml" ? l === "script" ? (n = S.createElement("div"), n.innerHTML = "<script><\/script>", n = n.removeChild(n.firstChild)) : typeof u.is == "string" ? n = S.createElement(l, { is: u.is }) : (n = S.createElement(l), l === "select" && (S = n, u.multiple ? S.multiple = !0 : u.size && (S.size = u.size))) : n = S.createElementNS(n, l), n[Di] = r, n[fs] = u, Ia(n, r, !1, !1), r.stateNode = n;
            e: {
              switch (S = Xn(l, u), l) {
                case "dialog":
                  cn("cancel", n), cn("close", n), c = u;
                  break;
                case "iframe":
                case "object":
                case "embed":
                  cn("load", n), c = u;
                  break;
                case "video":
                case "audio":
                  for (c = 0; c < us.length; c++) cn(us[c], n);
                  c = u;
                  break;
                case "source":
                  cn("error", n), c = u;
                  break;
                case "img":
                case "image":
                case "link":
                  cn(
                    "error",
                    n
                  ), cn("load", n), c = u;
                  break;
                case "details":
                  cn("toggle", n), c = u;
                  break;
                case "input":
                  Ve(n, u), c = Ce(n, u), cn("invalid", n);
                  break;
                case "option":
                  c = u;
                  break;
                case "select":
                  n._wrapperState = { wasMultiple: !!u.multiple }, c = ue({}, u, { value: void 0 }), cn("invalid", n);
                  break;
                case "textarea":
                  wt(n, u), c = Nt(n, u), cn("invalid", n);
                  break;
                default:
                  c = u;
              }
              pn(l, c), w = c;
              for (p in w) if (w.hasOwnProperty(p)) {
                var x = w[p];
                p === "style" ? Jt(n, x) : p === "dangerouslySetInnerHTML" ? (x = x ? x.__html : void 0, x != null && Xe(n, x)) : p === "children" ? typeof x == "string" ? (l !== "textarea" || x !== "") && ne(n, x) : typeof x == "number" && ne(n, "" + x) : p !== "suppressContentEditableWarning" && p !== "suppressHydrationWarning" && p !== "autoFocus" && (M.hasOwnProperty(p) ? x != null && p === "onScroll" && cn("scroll", n) : x != null && Ze(n, p, x, S));
              }
              switch (l) {
                case "input":
                  jn(n), Lt(n, u, !1);
                  break;
                case "textarea":
                  jn(n), it(n);
                  break;
                case "option":
                  u.value != null && n.setAttribute("value", "" + rt(u.value));
                  break;
                case "select":
                  n.multiple = !!u.multiple, p = u.value, p != null ? Rt(n, !!u.multiple, p, !1) : u.defaultValue != null && Rt(
                    n,
                    !!u.multiple,
                    u.defaultValue,
                    !0
                  );
                  break;
                default:
                  typeof c.onClick == "function" && (n.onclick = Ll);
              }
              switch (l) {
                case "button":
                case "input":
                case "select":
                case "textarea":
                  u = !!u.autoFocus;
                  break e;
                case "img":
                  u = !0;
                  break e;
                default:
                  u = !1;
              }
            }
            u && (r.flags |= 4);
          }
          r.ref !== null && (r.flags |= 512, r.flags |= 2097152);
        }
        return vr(r), null;
      case 6:
        if (n && r.stateNode != null) lh(n, r, n.memoizedProps, u);
        else {
          if (typeof u != "string" && r.stateNode === null) throw Error(v(166));
          if (l = wo(gs.current), wo(Ni.current), zc(r)) {
            if (u = r.stateNode, l = r.memoizedProps, u[Di] = r, (p = u.nodeValue !== l) && (n = ua, n !== null)) switch (n.tag) {
              case 3:
                xc(u.nodeValue, l, (n.mode & 1) !== 0);
                break;
              case 5:
                n.memoizedProps.suppressHydrationWarning !== !0 && xc(u.nodeValue, l, (n.mode & 1) !== 0);
            }
            p && (r.flags |= 4);
          } else u = (l.nodeType === 9 ? l : l.ownerDocument).createTextNode(u), u[Di] = r, r.stateNode = u;
        }
        return vr(r), null;
      case 13:
        if (bn(An), u = r.memoizedState, n === null || n.memoizedState !== null && n.memoizedState.dehydrated !== null) {
          if (kn && sa !== null && (r.mode & 1) !== 0 && (r.flags & 128) === 0) vs(), Fl(), r.flags |= 98560, p = !1;
          else if (p = zc(r), u !== null && u.dehydrated !== null) {
            if (n === null) {
              if (!p) throw Error(v(318));
              if (p = r.memoizedState, p = p !== null ? p.dehydrated : null, !p) throw Error(v(317));
              p[Di] = r;
            } else Fl(), (r.flags & 128) === 0 && (r.memoizedState = null), r.flags |= 4;
            vr(r), p = !1;
          } else Pa !== null && (Uo(Pa), Pa = null), p = !0;
          if (!p) return r.flags & 65536 ? r : null;
        }
        return (r.flags & 128) !== 0 ? (r.lanes = l, r) : (u = u !== null, u !== (n !== null && n.memoizedState !== null) && u && (r.child.flags |= 8192, (r.mode & 1) !== 0 && (n === null || (An.current & 1) !== 0 ? In === 0 && (In = 3) : np())), r.updateQueue !== null && (r.flags |= 4), vr(r), null);
      case 4:
        return bo(), nr(n, r), n === null && pu(r.stateNode.containerInfo), vr(r), null;
      case 10:
        return Od(r.type._context), vr(r), null;
      case 17:
        return Zn(r.type) && gu(), vr(r), null;
      case 19:
        if (bn(An), p = r.memoizedState, p === null) return vr(r), null;
        if (u = (r.flags & 128) !== 0, S = p.rendering, S === null) if (u) Ns(p, !1);
        else {
          if (In !== 0 || n !== null && (n.flags & 128) !== 0) for (n = r.child; n !== null; ) {
            if (S = Hc(n), S !== null) {
              for (r.flags |= 128, Ns(p, !1), u = S.updateQueue, u !== null && (r.updateQueue = u, r.flags |= 4), r.subtreeFlags = 0, u = l, l = r.child; l !== null; ) p = l, n = u, p.flags &= 14680066, S = p.alternate, S === null ? (p.childLanes = 0, p.lanes = n, p.child = null, p.subtreeFlags = 0, p.memoizedProps = null, p.memoizedState = null, p.updateQueue = null, p.dependencies = null, p.stateNode = null) : (p.childLanes = S.childLanes, p.lanes = S.lanes, p.child = S.child, p.subtreeFlags = 0, p.deletions = null, p.memoizedProps = S.memoizedProps, p.memoizedState = S.memoizedState, p.updateQueue = S.updateQueue, p.type = S.type, n = S.dependencies, p.dependencies = n === null ? null : { lanes: n.lanes, firstContext: n.firstContext }), l = l.sibling;
              return ze(An, An.current & 1 | 2), r.child;
            }
            n = n.sibling;
          }
          p.tail !== null && yt() > xu && (r.flags |= 128, u = !0, Ns(p, !1), r.lanes = 4194304);
        }
        else {
          if (!u) if (n = Hc(S), n !== null) {
            if (r.flags |= 128, u = !0, l = n.updateQueue, l !== null && (r.updateQueue = l, r.flags |= 4), Ns(p, !0), p.tail === null && p.tailMode === "hidden" && !S.alternate && !kn) return vr(r), null;
          } else 2 * yt() - p.renderingStartTime > xu && l !== 1073741824 && (r.flags |= 128, u = !0, Ns(p, !1), r.lanes = 4194304);
          p.isBackwards ? (S.sibling = r.child, r.child = S) : (l = p.last, l !== null ? l.sibling = S : r.child = S, p.last = S);
        }
        return p.tail !== null ? (r = p.tail, p.rendering = r, p.tail = r.sibling, p.renderingStartTime = yt(), r.sibling = null, l = An.current, ze(An, u ? l & 1 | 2 : l & 1), r) : (vr(r), null);
      case 22:
      case 23:
        return tp(), u = r.memoizedState !== null, n !== null && n.memoizedState !== null !== u && (r.flags |= 8192), u && (r.mode & 1) !== 0 ? (_a & 1073741824) !== 0 && (vr(r), r.subtreeFlags & 6 && (r.flags |= 8192)) : vr(r), null;
      case 24:
        return null;
      case 25:
        return null;
    }
    throw Error(v(156, r.tag));
  }
  function sf(n, r) {
    switch (Ac(r), r.tag) {
      case 1:
        return Zn(r.type) && gu(), n = r.flags, n & 65536 ? (r.flags = n & -65537 | 128, r) : null;
      case 3:
        return bo(), bn(ur), bn(Hn), Pe(), n = r.flags, (n & 65536) !== 0 && (n & 128) === 0 ? (r.flags = n & -65537 | 128, r) : null;
      case 5:
        return Fc(r), null;
      case 13:
        if (bn(An), n = r.memoizedState, n !== null && n.dehydrated !== null) {
          if (r.alternate === null) throw Error(v(340));
          Fl();
        }
        return n = r.flags, n & 65536 ? (r.flags = n & -65537 | 128, r) : null;
      case 19:
        return bn(An), null;
      case 4:
        return bo(), null;
      case 10:
        return Od(r.type._context), null;
      case 22:
      case 23:
        return tp(), null;
      case 24:
        return null;
      default:
        return null;
    }
  }
  var As = !1, jr = !1, _y = typeof WeakSet == "function" ? WeakSet : Set, Re = null;
  function wu(n, r) {
    var l = n.ref;
    if (l !== null) if (typeof l == "function") try {
      l(null);
    } catch (u) {
      On(n, r, u);
    }
    else l.current = null;
  }
  function cf(n, r, l) {
    try {
      l();
    } catch (u) {
      On(n, r, u);
    }
  }
  var uh = !1;
  function sh(n, r) {
    if (cs = za, n = ls(), Sc(n)) {
      if ("selectionStart" in n) var l = { start: n.selectionStart, end: n.selectionEnd };
      else e: {
        l = (l = n.ownerDocument) && l.defaultView || window;
        var u = l.getSelection && l.getSelection();
        if (u && u.rangeCount !== 0) {
          l = u.anchorNode;
          var c = u.anchorOffset, p = u.focusNode;
          u = u.focusOffset;
          try {
            l.nodeType, p.nodeType;
          } catch {
            l = null;
            break e;
          }
          var S = 0, w = -1, x = -1, H = 0, ee = 0, re = n, q = null;
          t: for (; ; ) {
            for (var ge; re !== l || c !== 0 && re.nodeType !== 3 || (w = S + c), re !== p || u !== 0 && re.nodeType !== 3 || (x = S + u), re.nodeType === 3 && (S += re.nodeValue.length), (ge = re.firstChild) !== null; )
              q = re, re = ge;
            for (; ; ) {
              if (re === n) break t;
              if (q === l && ++H === c && (w = S), q === p && ++ee === u && (x = S), (ge = re.nextSibling) !== null) break;
              re = q, q = re.parentNode;
            }
            re = ge;
          }
          l = w === -1 || x === -1 ? null : { start: w, end: x };
        } else l = null;
      }
      l = l || { start: 0, end: 0 };
    } else l = null;
    for (go = { focusedElem: n, selectionRange: l }, za = !1, Re = r; Re !== null; ) if (r = Re, n = r.child, (r.subtreeFlags & 1028) !== 0 && n !== null) n.return = r, Re = n;
    else for (; Re !== null; ) {
      r = Re;
      try {
        var xe = r.alternate;
        if ((r.flags & 1024) !== 0) switch (r.tag) {
          case 0:
          case 11:
          case 15:
            break;
          case 1:
            if (xe !== null) {
              var Me = xe.memoizedProps, Yn = xe.memoizedState, N = r.stateNode, k = N.getSnapshotBeforeUpdate(r.elementType === r.type ? Me : di(r.type, Me), Yn);
              N.__reactInternalSnapshotBeforeUpdate = k;
            }
            break;
          case 3:
            var U = r.stateNode.containerInfo;
            U.nodeType === 1 ? U.textContent = "" : U.nodeType === 9 && U.documentElement && U.removeChild(U.documentElement);
            break;
          case 5:
          case 6:
          case 4:
          case 17:
            break;
          default:
            throw Error(v(163));
        }
      } catch (te) {
        On(r, r.return, te);
      }
      if (n = r.sibling, n !== null) {
        n.return = r.return, Re = n;
        break;
      }
      Re = r.return;
    }
    return xe = uh, uh = !1, xe;
  }
  function zs(n, r, l) {
    var u = r.updateQueue;
    if (u = u !== null ? u.lastEffect : null, u !== null) {
      var c = u = u.next;
      do {
        if ((c.tag & n) === n) {
          var p = c.destroy;
          c.destroy = void 0, p !== void 0 && cf(r, l, p);
        }
        c = c.next;
      } while (c !== u);
    }
  }
  function Us(n, r) {
    if (r = r.updateQueue, r = r !== null ? r.lastEffect : null, r !== null) {
      var l = r = r.next;
      do {
        if ((l.tag & n) === n) {
          var u = l.create;
          l.destroy = u();
        }
        l = l.next;
      } while (l !== r);
    }
  }
  function Qd(n) {
    var r = n.ref;
    if (r !== null) {
      var l = n.stateNode;
      switch (n.tag) {
        case 5:
          n = l;
          break;
        default:
          n = l;
      }
      typeof r == "function" ? r(n) : r.current = n;
    }
  }
  function ff(n) {
    var r = n.alternate;
    r !== null && (n.alternate = null, ff(r)), n.child = null, n.deletions = null, n.sibling = null, n.tag === 5 && (r = n.stateNode, r !== null && (delete r[Di], delete r[fs], delete r[ds], delete r[yu], delete r[wy])), n.stateNode = null, n.return = null, n.dependencies = null, n.memoizedProps = null, n.memoizedState = null, n.pendingProps = null, n.stateNode = null, n.updateQueue = null;
  }
  function js(n) {
    return n.tag === 5 || n.tag === 3 || n.tag === 4;
  }
  function ol(n) {
    e: for (; ; ) {
      for (; n.sibling === null; ) {
        if (n.return === null || js(n.return)) return null;
        n = n.return;
      }
      for (n.sibling.return = n.return, n = n.sibling; n.tag !== 5 && n.tag !== 6 && n.tag !== 18; ) {
        if (n.flags & 2 || n.child === null || n.tag === 4) continue e;
        n.child.return = n, n = n.child;
      }
      if (!(n.flags & 2)) return n.stateNode;
    }
  }
  function zi(n, r, l) {
    var u = n.tag;
    if (u === 5 || u === 6) n = n.stateNode, r ? l.nodeType === 8 ? l.parentNode.insertBefore(n, r) : l.insertBefore(n, r) : (l.nodeType === 8 ? (r = l.parentNode, r.insertBefore(n, l)) : (r = l, r.appendChild(n)), l = l._reactRootContainer, l != null || r.onclick !== null || (r.onclick = Ll));
    else if (u !== 4 && (n = n.child, n !== null)) for (zi(n, r, l), n = n.sibling; n !== null; ) zi(n, r, l), n = n.sibling;
  }
  function Ui(n, r, l) {
    var u = n.tag;
    if (u === 5 || u === 6) n = n.stateNode, r ? l.insertBefore(n, r) : l.appendChild(n);
    else if (u !== 4 && (n = n.child, n !== null)) for (Ui(n, r, l), n = n.sibling; n !== null; ) Ui(n, r, l), n = n.sibling;
  }
  var $n = null, Yr = !1;
  function Wr(n, r, l) {
    for (l = l.child; l !== null; ) ch(n, r, l), l = l.sibling;
  }
  function ch(n, r, l) {
    if (aa && typeof aa.onCommitFiberUnmount == "function") try {
      aa.onCommitFiberUnmount(Rl, l);
    } catch {
    }
    switch (l.tag) {
      case 5:
        jr || wu(l, r);
      case 6:
        var u = $n, c = Yr;
        $n = null, Wr(n, r, l), $n = u, Yr = c, $n !== null && (Yr ? (n = $n, l = l.stateNode, n.nodeType === 8 ? n.parentNode.removeChild(l) : n.removeChild(l)) : $n.removeChild(l.stateNode));
        break;
      case 18:
        $n !== null && (Yr ? (n = $n, l = l.stateNode, n.nodeType === 8 ? mu(n.parentNode, l) : n.nodeType === 1 && mu(n, l), oi(n)) : mu($n, l.stateNode));
        break;
      case 4:
        u = $n, c = Yr, $n = l.stateNode.containerInfo, Yr = !0, Wr(n, r, l), $n = u, Yr = c;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        if (!jr && (u = l.updateQueue, u !== null && (u = u.lastEffect, u !== null))) {
          c = u = u.next;
          do {
            var p = c, S = p.destroy;
            p = p.tag, S !== void 0 && ((p & 2) !== 0 || (p & 4) !== 0) && cf(l, r, S), c = c.next;
          } while (c !== u);
        }
        Wr(n, r, l);
        break;
      case 1:
        if (!jr && (wu(l, r), u = l.stateNode, typeof u.componentWillUnmount == "function")) try {
          u.props = l.memoizedProps, u.state = l.memoizedState, u.componentWillUnmount();
        } catch (w) {
          On(l, r, w);
        }
        Wr(n, r, l);
        break;
      case 21:
        Wr(n, r, l);
        break;
      case 22:
        l.mode & 1 ? (jr = (u = jr) || l.memoizedState !== null, Wr(n, r, l), jr = u) : Wr(n, r, l);
        break;
      default:
        Wr(n, r, l);
    }
  }
  function fh(n) {
    var r = n.updateQueue;
    if (r !== null) {
      n.updateQueue = null;
      var l = n.stateNode;
      l === null && (l = n.stateNode = new _y()), r.forEach(function(u) {
        var c = Eh.bind(null, n, u);
        l.has(u) || (l.add(u), u.then(c, c));
      });
    }
  }
  function pi(n, r) {
    var l = r.deletions;
    if (l !== null) for (var u = 0; u < l.length; u++) {
      var c = l[u];
      try {
        var p = n, S = r, w = S;
        e: for (; w !== null; ) {
          switch (w.tag) {
            case 5:
              $n = w.stateNode, Yr = !1;
              break e;
            case 3:
              $n = w.stateNode.containerInfo, Yr = !0;
              break e;
            case 4:
              $n = w.stateNode.containerInfo, Yr = !0;
              break e;
          }
          w = w.return;
        }
        if ($n === null) throw Error(v(160));
        ch(p, S, c), $n = null, Yr = !1;
        var x = c.alternate;
        x !== null && (x.return = null), c.return = null;
      } catch (H) {
        On(c, r, H);
      }
    }
    if (r.subtreeFlags & 12854) for (r = r.child; r !== null; ) Xd(r, n), r = r.sibling;
  }
  function Xd(n, r) {
    var l = n.alternate, u = n.flags;
    switch (n.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        if (pi(r, n), pa(n), u & 4) {
          try {
            zs(3, n, n.return), Us(3, n);
          } catch (Me) {
            On(n, n.return, Me);
          }
          try {
            zs(5, n, n.return);
          } catch (Me) {
            On(n, n.return, Me);
          }
        }
        break;
      case 1:
        pi(r, n), pa(n), u & 512 && l !== null && wu(l, l.return);
        break;
      case 5:
        if (pi(r, n), pa(n), u & 512 && l !== null && wu(l, l.return), n.flags & 32) {
          var c = n.stateNode;
          try {
            ne(c, "");
          } catch (Me) {
            On(n, n.return, Me);
          }
        }
        if (u & 4 && (c = n.stateNode, c != null)) {
          var p = n.memoizedProps, S = l !== null ? l.memoizedProps : p, w = n.type, x = n.updateQueue;
          if (n.updateQueue = null, x !== null) try {
            w === "input" && p.type === "radio" && p.name != null && Qe(c, p), Xn(w, S);
            var H = Xn(w, p);
            for (S = 0; S < x.length; S += 2) {
              var ee = x[S], re = x[S + 1];
              ee === "style" ? Jt(c, re) : ee === "dangerouslySetInnerHTML" ? Xe(c, re) : ee === "children" ? ne(c, re) : Ze(c, ee, re, H);
            }
            switch (w) {
              case "input":
                ft(c, p);
                break;
              case "textarea":
                Xt(c, p);
                break;
              case "select":
                var q = c._wrapperState.wasMultiple;
                c._wrapperState.wasMultiple = !!p.multiple;
                var ge = p.value;
                ge != null ? Rt(c, !!p.multiple, ge, !1) : q !== !!p.multiple && (p.defaultValue != null ? Rt(
                  c,
                  !!p.multiple,
                  p.defaultValue,
                  !0
                ) : Rt(c, !!p.multiple, p.multiple ? [] : "", !1));
            }
            c[fs] = p;
          } catch (Me) {
            On(n, n.return, Me);
          }
        }
        break;
      case 6:
        if (pi(r, n), pa(n), u & 4) {
          if (n.stateNode === null) throw Error(v(162));
          c = n.stateNode, p = n.memoizedProps;
          try {
            c.nodeValue = p;
          } catch (Me) {
            On(n, n.return, Me);
          }
        }
        break;
      case 3:
        if (pi(r, n), pa(n), u & 4 && l !== null && l.memoizedState.isDehydrated) try {
          oi(r.containerInfo);
        } catch (Me) {
          On(n, n.return, Me);
        }
        break;
      case 4:
        pi(r, n), pa(n);
        break;
      case 13:
        pi(r, n), pa(n), c = n.child, c.flags & 8192 && (p = c.memoizedState !== null, c.stateNode.isHidden = p, !p || c.alternate !== null && c.alternate.memoizedState !== null || (Zd = yt())), u & 4 && fh(n);
        break;
      case 22:
        if (ee = l !== null && l.memoizedState !== null, n.mode & 1 ? (jr = (H = jr) || ee, pi(r, n), jr = H) : pi(r, n), pa(n), u & 8192) {
          if (H = n.memoizedState !== null, (n.stateNode.isHidden = H) && !ee && (n.mode & 1) !== 0) for (Re = n, ee = n.child; ee !== null; ) {
            for (re = Re = ee; Re !== null; ) {
              switch (q = Re, ge = q.child, q.tag) {
                case 0:
                case 11:
                case 14:
                case 15:
                  zs(4, q, q.return);
                  break;
                case 1:
                  wu(q, q.return);
                  var xe = q.stateNode;
                  if (typeof xe.componentWillUnmount == "function") {
                    u = q, l = q.return;
                    try {
                      r = u, xe.props = r.memoizedProps, xe.state = r.memoizedState, xe.componentWillUnmount();
                    } catch (Me) {
                      On(u, l, Me);
                    }
                  }
                  break;
                case 5:
                  wu(q, q.return);
                  break;
                case 22:
                  if (q.memoizedState !== null) {
                    Fs(re);
                    continue;
                  }
              }
              ge !== null ? (ge.return = q, Re = ge) : Fs(re);
            }
            ee = ee.sibling;
          }
          e: for (ee = null, re = n; ; ) {
            if (re.tag === 5) {
              if (ee === null) {
                ee = re;
                try {
                  c = re.stateNode, H ? (p = c.style, typeof p.setProperty == "function" ? p.setProperty("display", "none", "important") : p.display = "none") : (w = re.stateNode, x = re.memoizedProps.style, S = x != null && x.hasOwnProperty("display") ? x.display : null, w.style.display = ht("display", S));
                } catch (Me) {
                  On(n, n.return, Me);
                }
              }
            } else if (re.tag === 6) {
              if (ee === null) try {
                re.stateNode.nodeValue = H ? "" : re.memoizedProps;
              } catch (Me) {
                On(n, n.return, Me);
              }
            } else if ((re.tag !== 22 && re.tag !== 23 || re.memoizedState === null || re === n) && re.child !== null) {
              re.child.return = re, re = re.child;
              continue;
            }
            if (re === n) break e;
            for (; re.sibling === null; ) {
              if (re.return === null || re.return === n) break e;
              ee === re && (ee = null), re = re.return;
            }
            ee === re && (ee = null), re.sibling.return = re.return, re = re.sibling;
          }
        }
        break;
      case 19:
        pi(r, n), pa(n), u & 4 && fh(n);
        break;
      case 21:
        break;
      default:
        pi(
          r,
          n
        ), pa(n);
    }
  }
  function pa(n) {
    var r = n.flags;
    if (r & 2) {
      try {
        e: {
          for (var l = n.return; l !== null; ) {
            if (js(l)) {
              var u = l;
              break e;
            }
            l = l.return;
          }
          throw Error(v(160));
        }
        switch (u.tag) {
          case 5:
            var c = u.stateNode;
            u.flags & 32 && (ne(c, ""), u.flags &= -33);
            var p = ol(n);
            Ui(n, p, c);
            break;
          case 3:
          case 4:
            var S = u.stateNode.containerInfo, w = ol(n);
            zi(n, w, S);
            break;
          default:
            throw Error(v(161));
        }
      } catch (x) {
        On(n, n.return, x);
      }
      n.flags &= -3;
    }
    r & 4096 && (n.flags &= -4097);
  }
  function xy(n, r, l) {
    Re = n, Kd(n);
  }
  function Kd(n, r, l) {
    for (var u = (n.mode & 1) !== 0; Re !== null; ) {
      var c = Re, p = c.child;
      if (c.tag === 22 && u) {
        var S = c.memoizedState !== null || As;
        if (!S) {
          var w = c.alternate, x = w !== null && w.memoizedState !== null || jr;
          w = As;
          var H = jr;
          if (As = S, (jr = x) && !H) for (Re = c; Re !== null; ) S = Re, x = S.child, S.tag === 22 && S.memoizedState !== null ? qd(c) : x !== null ? (x.return = S, Re = x) : qd(c);
          for (; p !== null; ) Re = p, Kd(p), p = p.sibling;
          Re = c, As = w, jr = H;
        }
        dh(n);
      } else (c.subtreeFlags & 8772) !== 0 && p !== null ? (p.return = c, Re = p) : dh(n);
    }
  }
  function dh(n) {
    for (; Re !== null; ) {
      var r = Re;
      if ((r.flags & 8772) !== 0) {
        var l = r.alternate;
        try {
          if ((r.flags & 8772) !== 0) switch (r.tag) {
            case 0:
            case 11:
            case 15:
              jr || Us(5, r);
              break;
            case 1:
              var u = r.stateNode;
              if (r.flags & 4 && !jr) if (l === null) u.componentDidMount();
              else {
                var c = r.elementType === r.type ? l.memoizedProps : di(r.type, l.memoizedProps);
                u.componentDidUpdate(c, l.memoizedState, u.__reactInternalSnapshotBeforeUpdate);
              }
              var p = r.updateQueue;
              p !== null && zd(r, p, u);
              break;
            case 3:
              var S = r.updateQueue;
              if (S !== null) {
                if (l = null, r.child !== null) switch (r.child.tag) {
                  case 5:
                    l = r.child.stateNode;
                    break;
                  case 1:
                    l = r.child.stateNode;
                }
                zd(r, S, l);
              }
              break;
            case 5:
              var w = r.stateNode;
              if (l === null && r.flags & 4) {
                l = w;
                var x = r.memoizedProps;
                switch (r.type) {
                  case "button":
                  case "input":
                  case "select":
                  case "textarea":
                    x.autoFocus && l.focus();
                    break;
                  case "img":
                    x.src && (l.src = x.src);
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
              if (r.memoizedState === null) {
                var H = r.alternate;
                if (H !== null) {
                  var ee = H.memoizedState;
                  if (ee !== null) {
                    var re = ee.dehydrated;
                    re !== null && oi(re);
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
              throw Error(v(163));
          }
          jr || r.flags & 512 && Qd(r);
        } catch (q) {
          On(r, r.return, q);
        }
      }
      if (r === n) {
        Re = null;
        break;
      }
      if (l = r.sibling, l !== null) {
        l.return = r.return, Re = l;
        break;
      }
      Re = r.return;
    }
  }
  function Fs(n) {
    for (; Re !== null; ) {
      var r = Re;
      if (r === n) {
        Re = null;
        break;
      }
      var l = r.sibling;
      if (l !== null) {
        l.return = r.return, Re = l;
        break;
      }
      Re = r.return;
    }
  }
  function qd(n) {
    for (; Re !== null; ) {
      var r = Re;
      try {
        switch (r.tag) {
          case 0:
          case 11:
          case 15:
            var l = r.return;
            try {
              Us(4, r);
            } catch (x) {
              On(r, l, x);
            }
            break;
          case 1:
            var u = r.stateNode;
            if (typeof u.componentDidMount == "function") {
              var c = r.return;
              try {
                u.componentDidMount();
              } catch (x) {
                On(r, c, x);
              }
            }
            var p = r.return;
            try {
              Qd(r);
            } catch (x) {
              On(r, p, x);
            }
            break;
          case 5:
            var S = r.return;
            try {
              Qd(r);
            } catch (x) {
              On(r, S, x);
            }
        }
      } catch (x) {
        On(r, r.return, x);
      }
      if (r === n) {
        Re = null;
        break;
      }
      var w = r.sibling;
      if (w !== null) {
        w.return = r.return, Re = w;
        break;
      }
      Re = r.return;
    }
  }
  var Dy = Math.ceil, $l = Je.ReactCurrentDispatcher, Ao = Je.ReactCurrentOwner, wr = Je.ReactCurrentBatchConfig, Bt = 0, cr = null, rr = null, br = 0, _a = 0, bu = Fa(0), In = 0, Hs = null, ji = 0, _u = 0, df = 0, Ps = null, va = null, Zd = 0, xu = 1 / 0, xa = null, Du = !1, zo = null, Il = null, pf = !1, ul = null, Vs = 0, Yl = 0, ku = null, Bs = -1, Fr = 0;
  function ar() {
    return (Bt & 6) !== 0 ? yt() : Bs !== -1 ? Bs : Bs = yt();
  }
  function Fi(n) {
    return (n.mode & 1) === 0 ? 1 : (Bt & 2) !== 0 && br !== 0 ? br & -br : by.transition !== null ? (Fr === 0 && (Fr = tu()), Fr) : (n = tn, n !== 0 || (n = window.event, n = n === void 0 ? 16 : uu(n.type)), n);
  }
  function Gr(n, r, l, u) {
    if (50 < Yl) throw Yl = 0, ku = null, Error(v(185));
    Xi(n, l, u), ((Bt & 2) === 0 || n !== cr) && (n === cr && ((Bt & 2) === 0 && (_u |= l), In === 4 && vi(n, br)), ha(n, u), l === 1 && Bt === 0 && (r.mode & 1) === 0 && (xu = yt() + 500, Su && Oi()));
  }
  function ha(n, r) {
    var l = n.callbackNode;
    uo(n, r);
    var u = li(n, n === cr ? br : 0);
    if (u === 0) l !== null && Er(l), n.callbackNode = null, n.callbackPriority = 0;
    else if (r = u & -u, n.callbackPriority !== r) {
      if (l != null && Er(l), r === 1) n.tag === 0 ? Al(Jd.bind(null, n)) : Lc(Jd.bind(null, n)), hu(function() {
        (Bt & 6) === 0 && Oi();
      }), l = null;
      else {
        switch (ru(u)) {
          case 1:
            l = ai;
            break;
          case 4:
            l = lo;
            break;
          case 16:
            l = oo;
            break;
          case 536870912:
            l = Zo;
            break;
          default:
            l = oo;
        }
        l = Th(l, vf.bind(null, n));
      }
      n.callbackPriority = r, n.callbackNode = l;
    }
  }
  function vf(n, r) {
    if (Bs = -1, Fr = 0, (Bt & 6) !== 0) throw Error(v(327));
    var l = n.callbackNode;
    if (Ou() && n.callbackNode !== l) return null;
    var u = li(n, n === cr ? br : 0);
    if (u === 0) return null;
    if ((u & 30) !== 0 || (u & n.expiredLanes) !== 0 || r) r = hf(n, u);
    else {
      r = u;
      var c = Bt;
      Bt |= 2;
      var p = vh();
      (cr !== n || br !== r) && (xa = null, xu = yt() + 500, sl(n, r));
      do
        try {
          hh();
          break;
        } catch (w) {
          ph(n, w);
        }
      while (!0);
      kd(), $l.current = p, Bt = c, rr !== null ? r = 0 : (cr = null, br = 0, r = In);
    }
    if (r !== 0) {
      if (r === 2 && (c = bl(n), c !== 0 && (u = c, r = $s(n, c))), r === 1) throw l = Hs, sl(n, 0), vi(n, u), ha(n, yt()), l;
      if (r === 6) vi(n, u);
      else {
        if (c = n.current.alternate, (u & 30) === 0 && !ky(c) && (r = hf(n, u), r === 2 && (p = bl(n), p !== 0 && (u = p, r = $s(n, p))), r === 1)) throw l = Hs, sl(n, 0), vi(n, u), ha(n, yt()), l;
        switch (n.finishedWork = c, n.finishedLanes = u, r) {
          case 0:
          case 1:
            throw Error(v(345));
          case 2:
            Fo(n, va, xa);
            break;
          case 3:
            if (vi(n, u), (u & 130023424) === u && (r = Zd + 500 - yt(), 10 < r)) {
              if (li(n, 0) !== 0) break;
              if (c = n.suspendedLanes, (c & u) !== u) {
                ar(), n.pingedLanes |= n.suspendedLanes & c;
                break;
              }
              n.timeoutHandle = kc(Fo.bind(null, n, va, xa), r);
              break;
            }
            Fo(n, va, xa);
            break;
          case 4:
            if (vi(n, u), (u & 4194240) === u) break;
            for (r = n.eventTimes, c = -1; 0 < u; ) {
              var S = 31 - Vr(u);
              p = 1 << S, S = r[S], S > c && (c = S), u &= ~p;
            }
            if (u = c, u = yt() - u, u = (120 > u ? 120 : 480 > u ? 480 : 1080 > u ? 1080 : 1920 > u ? 1920 : 3e3 > u ? 3e3 : 4320 > u ? 4320 : 1960 * Dy(u / 1960)) - u, 10 < u) {
              n.timeoutHandle = kc(Fo.bind(null, n, va, xa), u);
              break;
            }
            Fo(n, va, xa);
            break;
          case 5:
            Fo(n, va, xa);
            break;
          default:
            throw Error(v(329));
        }
      }
    }
    return ha(n, yt()), n.callbackNode === l ? vf.bind(null, n) : null;
  }
  function $s(n, r) {
    var l = Ps;
    return n.current.memoizedState.isDehydrated && (sl(n, r).flags |= 256), n = hf(n, r), n !== 2 && (r = va, va = l, r !== null && Uo(r)), n;
  }
  function Uo(n) {
    va === null ? va = n : va.push.apply(va, n);
  }
  function ky(n) {
    for (var r = n; ; ) {
      if (r.flags & 16384) {
        var l = r.updateQueue;
        if (l !== null && (l = l.stores, l !== null)) for (var u = 0; u < l.length; u++) {
          var c = l[u], p = c.getSnapshot;
          c = c.value;
          try {
            if (!si(p(), c)) return !1;
          } catch {
            return !1;
          }
        }
      }
      if (l = r.child, r.subtreeFlags & 16384 && l !== null) l.return = r, r = l;
      else {
        if (r === n) break;
        for (; r.sibling === null; ) {
          if (r.return === null || r.return === n) return !0;
          r = r.return;
        }
        r.sibling.return = r.return, r = r.sibling;
      }
    }
    return !0;
  }
  function vi(n, r) {
    for (r &= ~df, r &= ~_u, n.suspendedLanes |= r, n.pingedLanes &= ~r, n = n.expirationTimes; 0 < r; ) {
      var l = 31 - Vr(r), u = 1 << l;
      n[l] = -1, r &= ~u;
    }
  }
  function Jd(n) {
    if ((Bt & 6) !== 0) throw Error(v(327));
    Ou();
    var r = li(n, 0);
    if ((r & 1) === 0) return ha(n, yt()), null;
    var l = hf(n, r);
    if (n.tag !== 0 && l === 2) {
      var u = bl(n);
      u !== 0 && (r = u, l = $s(n, u));
    }
    if (l === 1) throw l = Hs, sl(n, 0), vi(n, r), ha(n, yt()), l;
    if (l === 6) throw Error(v(345));
    return n.finishedWork = n.current.alternate, n.finishedLanes = r, Fo(n, va, xa), ha(n, yt()), null;
  }
  function ep(n, r) {
    var l = Bt;
    Bt |= 1;
    try {
      return n(r);
    } finally {
      Bt = l, Bt === 0 && (xu = yt() + 500, Su && Oi());
    }
  }
  function jo(n) {
    ul !== null && ul.tag === 0 && (Bt & 6) === 0 && Ou();
    var r = Bt;
    Bt |= 1;
    var l = wr.transition, u = tn;
    try {
      if (wr.transition = null, tn = 1, n) return n();
    } finally {
      tn = u, wr.transition = l, Bt = r, (Bt & 6) === 0 && Oi();
    }
  }
  function tp() {
    _a = bu.current, bn(bu);
  }
  function sl(n, r) {
    n.finishedWork = null, n.finishedLanes = 0;
    var l = n.timeoutHandle;
    if (l !== -1 && (n.timeoutHandle = -1, wd(l)), rr !== null) for (l = rr.return; l !== null; ) {
      var u = l;
      switch (Ac(u), u.tag) {
        case 1:
          u = u.type.childContextTypes, u != null && gu();
          break;
        case 3:
          bo(), bn(ur), bn(Hn), Pe();
          break;
        case 5:
          Fc(u);
          break;
        case 4:
          bo();
          break;
        case 13:
          bn(An);
          break;
        case 19:
          bn(An);
          break;
        case 10:
          Od(u.type._context);
          break;
        case 22:
        case 23:
          tp();
      }
      l = l.return;
    }
    if (cr = n, rr = n = Wl(n.current, null), br = _a = r, In = 0, Hs = null, df = _u = ji = 0, va = Ps = null, Ro !== null) {
      for (r = 0; r < Ro.length; r++) if (l = Ro[r], u = l.interleaved, u !== null) {
        l.interleaved = null;
        var c = u.next, p = l.pending;
        if (p !== null) {
          var S = p.next;
          p.next = c, u.next = S;
        }
        l.pending = u;
      }
      Ro = null;
    }
    return n;
  }
  function ph(n, r) {
    do {
      var l = rr;
      try {
        if (kd(), kt.current = Mo, Pc) {
          for (var u = rn.memoizedState; u !== null; ) {
            var c = u.queue;
            c !== null && (c.pending = null), u = u.next;
          }
          Pc = !1;
        }
        if (Sn = 0, pr = er = rn = null, Es = !1, _o = 0, Ao.current = null, l === null || l.return === null) {
          In = 1, Hs = r, rr = null;
          break;
        }
        e: {
          var p = n, S = l.return, w = l, x = r;
          if (r = br, w.flags |= 32768, x !== null && typeof x == "object" && typeof x.then == "function") {
            var H = x, ee = w, re = ee.tag;
            if ((ee.mode & 1) === 0 && (re === 0 || re === 11 || re === 15)) {
              var q = ee.alternate;
              q ? (ee.updateQueue = q.updateQueue, ee.memoizedState = q.memoizedState, ee.lanes = q.lanes) : (ee.updateQueue = null, ee.memoizedState = null);
            }
            var ge = eh(S);
            if (ge !== null) {
              ge.flags &= -257, Bl(ge, S, w, p, r), ge.mode & 1 && $d(p, H, r), r = ge, x = H;
              var xe = r.updateQueue;
              if (xe === null) {
                var Me = /* @__PURE__ */ new Set();
                Me.add(x), r.updateQueue = Me;
              } else xe.add(x);
              break e;
            } else {
              if ((r & 1) === 0) {
                $d(p, H, r), np();
                break e;
              }
              x = Error(v(426));
            }
          } else if (kn && w.mode & 1) {
            var Yn = eh(S);
            if (Yn !== null) {
              (Yn.flags & 65536) === 0 && (Yn.flags |= 256), Bl(Yn, S, w, p, r), al(Lo(x, w));
              break e;
            }
          }
          p = x = Lo(x, w), In !== 4 && (In = 2), Ps === null ? Ps = [p] : Ps.push(p), p = S;
          do {
            switch (p.tag) {
              case 3:
                p.flags |= 65536, r &= -r, p.lanes |= r;
                var N = Jv(p, x, r);
                Qv(p, N);
                break e;
              case 1:
                w = x;
                var k = p.type, U = p.stateNode;
                if ((p.flags & 128) === 0 && (typeof k.getDerivedStateFromError == "function" || U !== null && typeof U.componentDidCatch == "function" && (Il === null || !Il.has(U)))) {
                  p.flags |= 65536, r &= -r, p.lanes |= r;
                  var te = Bd(p, w, r);
                  Qv(p, te);
                  break e;
                }
            }
            p = p.return;
          } while (p !== null);
        }
        yh(l);
      } catch (De) {
        r = De, rr === l && l !== null && (rr = l = l.return);
        continue;
      }
      break;
    } while (!0);
  }
  function vh() {
    var n = $l.current;
    return $l.current = Mo, n === null ? Mo : n;
  }
  function np() {
    (In === 0 || In === 3 || In === 2) && (In = 4), cr === null || (ji & 268435455) === 0 && (_u & 268435455) === 0 || vi(cr, br);
  }
  function hf(n, r) {
    var l = Bt;
    Bt |= 2;
    var u = vh();
    (cr !== n || br !== r) && (xa = null, sl(n, r));
    do
      try {
        Oy();
        break;
      } catch (c) {
        ph(n, c);
      }
    while (!0);
    if (kd(), Bt = l, $l.current = u, rr !== null) throw Error(v(261));
    return cr = null, br = 0, In;
  }
  function Oy() {
    for (; rr !== null; ) mh(rr);
  }
  function hh() {
    for (; rr !== null && !ni(); ) mh(rr);
  }
  function mh(n) {
    var r = Ch(n.alternate, n, _a);
    n.memoizedProps = n.pendingProps, r === null ? yh(n) : rr = r, Ao.current = null;
  }
  function yh(n) {
    var r = n;
    do {
      var l = r.alternate;
      if (n = r.return, (r.flags & 32768) === 0) {
        if (l = oh(l, r, _a), l !== null) {
          rr = l;
          return;
        }
      } else {
        if (l = sf(l, r), l !== null) {
          l.flags &= 32767, rr = l;
          return;
        }
        if (n !== null) n.flags |= 32768, n.subtreeFlags = 0, n.deletions = null;
        else {
          In = 6, rr = null;
          return;
        }
      }
      if (r = r.sibling, r !== null) {
        rr = r;
        return;
      }
      rr = r = n;
    } while (r !== null);
    In === 0 && (In = 5);
  }
  function Fo(n, r, l) {
    var u = tn, c = wr.transition;
    try {
      wr.transition = null, tn = 1, My(n, r, l, u);
    } finally {
      wr.transition = c, tn = u;
    }
    return null;
  }
  function My(n, r, l, u) {
    do
      Ou();
    while (ul !== null);
    if ((Bt & 6) !== 0) throw Error(v(327));
    l = n.finishedWork;
    var c = n.finishedLanes;
    if (l === null) return null;
    if (n.finishedWork = null, n.finishedLanes = 0, l === n.current) throw Error(v(177));
    n.callbackNode = null, n.callbackPriority = 0;
    var p = l.lanes | l.childLanes;
    if (rd(n, p), n === cr && (rr = cr = null, br = 0), (l.subtreeFlags & 2064) === 0 && (l.flags & 2064) === 0 || pf || (pf = !0, Th(oo, function() {
      return Ou(), null;
    })), p = (l.flags & 15990) !== 0, (l.subtreeFlags & 15990) !== 0 || p) {
      p = wr.transition, wr.transition = null;
      var S = tn;
      tn = 1;
      var w = Bt;
      Bt |= 4, Ao.current = null, sh(n, l), Xd(l, n), fu(go), za = !!cs, go = cs = null, n.current = l, xy(l), ri(), Bt = w, tn = S, wr.transition = p;
    } else n.current = l;
    if (pf && (pf = !1, ul = n, Vs = c), p = n.pendingLanes, p === 0 && (Il = null), Ku(l.stateNode), ha(n, yt()), r !== null) for (u = n.onRecoverableError, l = 0; l < r.length; l++) c = r[l], u(c.value, { componentStack: c.stack, digest: c.digest });
    if (Du) throw Du = !1, n = zo, zo = null, n;
    return (Vs & 1) !== 0 && n.tag !== 0 && Ou(), p = n.pendingLanes, (p & 1) !== 0 ? n === ku ? Yl++ : (Yl = 0, ku = n) : Yl = 0, Oi(), null;
  }
  function Ou() {
    if (ul !== null) {
      var n = ru(Vs), r = wr.transition, l = tn;
      try {
        if (wr.transition = null, tn = 16 > n ? 16 : n, ul === null) var u = !1;
        else {
          if (n = ul, ul = null, Vs = 0, (Bt & 6) !== 0) throw Error(v(331));
          var c = Bt;
          for (Bt |= 4, Re = n.current; Re !== null; ) {
            var p = Re, S = p.child;
            if ((Re.flags & 16) !== 0) {
              var w = p.deletions;
              if (w !== null) {
                for (var x = 0; x < w.length; x++) {
                  var H = w[x];
                  for (Re = H; Re !== null; ) {
                    var ee = Re;
                    switch (ee.tag) {
                      case 0:
                      case 11:
                      case 15:
                        zs(8, ee, p);
                    }
                    var re = ee.child;
                    if (re !== null) re.return = ee, Re = re;
                    else for (; Re !== null; ) {
                      ee = Re;
                      var q = ee.sibling, ge = ee.return;
                      if (ff(ee), ee === H) {
                        Re = null;
                        break;
                      }
                      if (q !== null) {
                        q.return = ge, Re = q;
                        break;
                      }
                      Re = ge;
                    }
                  }
                }
                var xe = p.alternate;
                if (xe !== null) {
                  var Me = xe.child;
                  if (Me !== null) {
                    xe.child = null;
                    do {
                      var Yn = Me.sibling;
                      Me.sibling = null, Me = Yn;
                    } while (Me !== null);
                  }
                }
                Re = p;
              }
            }
            if ((p.subtreeFlags & 2064) !== 0 && S !== null) S.return = p, Re = S;
            else e: for (; Re !== null; ) {
              if (p = Re, (p.flags & 2048) !== 0) switch (p.tag) {
                case 0:
                case 11:
                case 15:
                  zs(9, p, p.return);
              }
              var N = p.sibling;
              if (N !== null) {
                N.return = p.return, Re = N;
                break e;
              }
              Re = p.return;
            }
          }
          var k = n.current;
          for (Re = k; Re !== null; ) {
            S = Re;
            var U = S.child;
            if ((S.subtreeFlags & 2064) !== 0 && U !== null) U.return = S, Re = U;
            else e: for (S = k; Re !== null; ) {
              if (w = Re, (w.flags & 2048) !== 0) try {
                switch (w.tag) {
                  case 0:
                  case 11:
                  case 15:
                    Us(9, w);
                }
              } catch (De) {
                On(w, w.return, De);
              }
              if (w === S) {
                Re = null;
                break e;
              }
              var te = w.sibling;
              if (te !== null) {
                te.return = w.return, Re = te;
                break e;
              }
              Re = w.return;
            }
          }
          if (Bt = c, Oi(), aa && typeof aa.onPostCommitFiberRoot == "function") try {
            aa.onPostCommitFiberRoot(Rl, n);
          } catch {
          }
          u = !0;
        }
        return u;
      } finally {
        tn = l, wr.transition = r;
      }
    }
    return !1;
  }
  function gh(n, r, l) {
    r = Lo(l, r), r = Jv(n, r, 1), n = Hl(n, r, 1), r = ar(), n !== null && (Xi(n, 1, r), ha(n, r));
  }
  function On(n, r, l) {
    if (n.tag === 3) gh(n, n, l);
    else for (; r !== null; ) {
      if (r.tag === 3) {
        gh(r, n, l);
        break;
      } else if (r.tag === 1) {
        var u = r.stateNode;
        if (typeof r.type.getDerivedStateFromError == "function" || typeof u.componentDidCatch == "function" && (Il === null || !Il.has(u))) {
          n = Lo(l, n), n = Bd(r, n, 1), r = Hl(r, n, 1), n = ar(), r !== null && (Xi(r, 1, n), ha(r, n));
          break;
        }
      }
      r = r.return;
    }
  }
  function Ly(n, r, l) {
    var u = n.pingCache;
    u !== null && u.delete(r), r = ar(), n.pingedLanes |= n.suspendedLanes & l, cr === n && (br & l) === l && (In === 4 || In === 3 && (br & 130023424) === br && 500 > yt() - Zd ? sl(n, 0) : df |= l), ha(n, r);
  }
  function Sh(n, r) {
    r === 0 && ((n.mode & 1) === 0 ? r = 1 : (r = Ca, Ca <<= 1, (Ca & 130023424) === 0 && (Ca = 4194304)));
    var l = ar();
    n = wa(n, r), n !== null && (Xi(n, r, l), ha(n, l));
  }
  function Ny(n) {
    var r = n.memoizedState, l = 0;
    r !== null && (l = r.retryLane), Sh(n, l);
  }
  function Eh(n, r) {
    var l = 0;
    switch (n.tag) {
      case 13:
        var u = n.stateNode, c = n.memoizedState;
        c !== null && (l = c.retryLane);
        break;
      case 19:
        u = n.stateNode;
        break;
      default:
        throw Error(v(314));
    }
    u !== null && u.delete(r), Sh(n, l);
  }
  var Ch;
  Ch = function(n, r, l) {
    if (n !== null) if (n.memoizedProps !== r.pendingProps || ur.current) tr = !0;
    else {
      if ((n.lanes & l) === 0 && (r.flags & 128) === 0) return tr = !1, Ls(n, r, l);
      tr = (n.flags & 131072) !== 0;
    }
    else tr = !1, kn && (r.flags & 1048576) !== 0 && Iv(r, rl, r.index);
    switch (r.lanes = 0, r.tag) {
      case 2:
        var u = r.type;
        Ba(n, r), n = r.pendingProps;
        var c = oa(r, Hn.current);
        Nn(r, l), c = Pl(null, r, u, n, c, l);
        var p = fi();
        return r.flags |= 1, typeof c == "object" && c !== null && typeof c.render == "function" && c.$$typeof === void 0 ? (r.tag = 1, r.memoizedState = null, r.updateQueue = null, Zn(u) ? (p = !0, dr(r)) : p = !1, r.memoizedState = c.state !== null && c.state !== void 0 ? c.state : null, Ad(r), c.updater = rf, r.stateNode = c, c._reactInternals = r, xs(r, u, n, l), r = Os(null, r, u, !0, p, l)) : (r.tag = 0, kn && p && Nc(r), Rr(null, r, c, l), r = r.child), r;
      case 16:
        u = r.elementType;
        e: {
          switch (Ba(n, r), n = r.pendingProps, c = u._init, u = c(u._payload), r.type = u, c = r.tag = zy(u), n = di(u, n), c) {
            case 0:
              r = th(null, r, u, n, l);
              break e;
            case 1:
              r = nh(null, r, u, n, l);
              break e;
            case 11:
              r = da(null, r, u, n, l);
              break e;
            case 14:
              r = No(null, r, u, di(u.type, n), l);
              break e;
          }
          throw Error(v(
            306,
            u,
            ""
          ));
        }
        return r;
      case 0:
        return u = r.type, c = r.pendingProps, c = r.elementType === u ? c : di(u, c), th(n, r, u, c, l);
      case 1:
        return u = r.type, c = r.pendingProps, c = r.elementType === u ? c : di(u, c), nh(n, r, u, c, l);
      case 3:
        e: {
          if (Ru(r), n === null) throw Error(v(387));
          u = r.pendingProps, p = r.memoizedState, c = p.element, Gv(n, r), hs(r, u, null, l);
          var S = r.memoizedState;
          if (u = S.element, p.isDehydrated) if (p = { element: u, isDehydrated: !1, cache: S.cache, pendingSuspenseBoundaries: S.pendingSuspenseBoundaries, transitions: S.transitions }, r.updateQueue.baseState = p, r.memoizedState = p, r.flags & 256) {
            c = Lo(Error(v(423)), r), r = rh(n, r, u, l, c);
            break e;
          } else if (u !== c) {
            c = Lo(Error(v(424)), r), r = rh(n, r, u, l, c);
            break e;
          } else for (sa = xi(r.stateNode.containerInfo.firstChild), ua = r, kn = !0, Pa = null, l = ve(r, null, u, l), r.child = l; l; ) l.flags = l.flags & -3 | 4096, l = l.sibling;
          else {
            if (Fl(), u === c) {
              r = $a(n, r, l);
              break e;
            }
            Rr(n, r, u, l);
          }
          r = r.child;
        }
        return r;
      case 5:
        return Xv(r), n === null && xd(r), u = r.type, c = r.pendingProps, p = n !== null ? n.memoizedProps : null, S = c.children, Dc(u, c) ? S = null : p !== null && Dc(u, p) && (r.flags |= 32), Id(n, r), Rr(n, r, S, l), r.child;
      case 6:
        return n === null && xd(r), null;
      case 13:
        return uf(n, r, l);
      case 4:
        return Ud(r, r.stateNode.containerInfo), u = r.pendingProps, n === null ? r.child = Vn(r, null, u, l) : Rr(n, r, u, l), r.child;
      case 11:
        return u = r.type, c = r.pendingProps, c = r.elementType === u ? c : di(u, c), da(n, r, u, c, l);
      case 7:
        return Rr(n, r, r.pendingProps, l), r.child;
      case 8:
        return Rr(n, r, r.pendingProps.children, l), r.child;
      case 12:
        return Rr(n, r, r.pendingProps.children, l), r.child;
      case 10:
        e: {
          if (u = r.type._context, c = r.pendingProps, p = r.memoizedProps, S = c.value, ze(Ra, u._currentValue), u._currentValue = S, p !== null) if (si(p.value, S)) {
            if (p.children === c.children && !ur.current) {
              r = $a(n, r, l);
              break e;
            }
          } else for (p = r.child, p !== null && (p.return = r); p !== null; ) {
            var w = p.dependencies;
            if (w !== null) {
              S = p.child;
              for (var x = w.firstContext; x !== null; ) {
                if (x.context === u) {
                  if (p.tag === 1) {
                    x = il(-1, l & -l), x.tag = 2;
                    var H = p.updateQueue;
                    if (H !== null) {
                      H = H.shared;
                      var ee = H.pending;
                      ee === null ? x.next = x : (x.next = ee.next, ee.next = x), H.pending = x;
                    }
                  }
                  p.lanes |= l, x = p.alternate, x !== null && (x.lanes |= l), Md(
                    p.return,
                    l,
                    r
                  ), w.lanes |= l;
                  break;
                }
                x = x.next;
              }
            } else if (p.tag === 10) S = p.type === r.type ? null : p.child;
            else if (p.tag === 18) {
              if (S = p.return, S === null) throw Error(v(341));
              S.lanes |= l, w = S.alternate, w !== null && (w.lanes |= l), Md(S, l, r), S = p.sibling;
            } else S = p.child;
            if (S !== null) S.return = p;
            else for (S = p; S !== null; ) {
              if (S === r) {
                S = null;
                break;
              }
              if (p = S.sibling, p !== null) {
                p.return = S.return, S = p;
                break;
              }
              S = S.return;
            }
            p = S;
          }
          Rr(n, r, c.children, l), r = r.child;
        }
        return r;
      case 9:
        return c = r.type, u = r.pendingProps.children, Nn(r, l), c = Va(c), u = u(c), r.flags |= 1, Rr(n, r, u, l), r.child;
      case 14:
        return u = r.type, c = di(u, r.pendingProps), c = di(u.type, c), No(n, r, u, c, l);
      case 15:
        return Et(n, r, r.type, r.pendingProps, l);
      case 17:
        return u = r.type, c = r.pendingProps, c = r.elementType === u ? c : di(u, c), Ba(n, r), r.tag = 1, Zn(u) ? (n = !0, dr(r)) : n = !1, Nn(r, l), af(r, u, c), xs(r, u, c, l), Os(null, r, u, !0, n, l);
      case 19:
        return Ai(n, r, l);
      case 22:
        return ks(n, r, l);
    }
    throw Error(v(156, r.tag));
  };
  function Th(n, r) {
    return _n(n, r);
  }
  function Ay(n, r, l, u) {
    this.tag = n, this.key = l, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.ref = null, this.pendingProps = r, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = u, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function Ya(n, r, l, u) {
    return new Ay(n, r, l, u);
  }
  function rp(n) {
    return n = n.prototype, !(!n || !n.isReactComponent);
  }
  function zy(n) {
    if (typeof n == "function") return rp(n) ? 1 : 0;
    if (n != null) {
      if (n = n.$$typeof, n === nt) return 11;
      if (n === xt) return 14;
    }
    return 2;
  }
  function Wl(n, r) {
    var l = n.alternate;
    return l === null ? (l = Ya(n.tag, r, n.key, n.mode), l.elementType = n.elementType, l.type = n.type, l.stateNode = n.stateNode, l.alternate = n, n.alternate = l) : (l.pendingProps = r, l.type = n.type, l.flags = 0, l.subtreeFlags = 0, l.deletions = null), l.flags = n.flags & 14680064, l.childLanes = n.childLanes, l.lanes = n.lanes, l.child = n.child, l.memoizedProps = n.memoizedProps, l.memoizedState = n.memoizedState, l.updateQueue = n.updateQueue, r = n.dependencies, l.dependencies = r === null ? null : { lanes: r.lanes, firstContext: r.firstContext }, l.sibling = n.sibling, l.index = n.index, l.ref = n.ref, l;
  }
  function Is(n, r, l, u, c, p) {
    var S = 2;
    if (u = n, typeof n == "function") rp(n) && (S = 1);
    else if (typeof n == "string") S = 5;
    else e: switch (n) {
      case je:
        return cl(l.children, c, p, r);
      case sn:
        S = 8, c |= 8;
        break;
      case Gt:
        return n = Ya(12, l, r, c | 2), n.elementType = Gt, n.lanes = p, n;
      case Ae:
        return n = Ya(13, l, r, c), n.elementType = Ae, n.lanes = p, n;
      case _t:
        return n = Ya(19, l, r, c), n.elementType = _t, n.lanes = p, n;
      case Ee:
        return Gl(l, c, p, r);
      default:
        if (typeof n == "object" && n !== null) switch (n.$$typeof) {
          case Pt:
            S = 10;
            break e;
          case dn:
            S = 9;
            break e;
          case nt:
            S = 11;
            break e;
          case xt:
            S = 14;
            break e;
          case At:
            S = 16, u = null;
            break e;
        }
        throw Error(v(130, n == null ? n : typeof n, ""));
    }
    return r = Ya(S, l, r, c), r.elementType = n, r.type = u, r.lanes = p, r;
  }
  function cl(n, r, l, u) {
    return n = Ya(7, n, u, r), n.lanes = l, n;
  }
  function Gl(n, r, l, u) {
    return n = Ya(22, n, u, r), n.elementType = Ee, n.lanes = l, n.stateNode = { isHidden: !1 }, n;
  }
  function ap(n, r, l) {
    return n = Ya(6, n, null, r), n.lanes = l, n;
  }
  function mf(n, r, l) {
    return r = Ya(4, n.children !== null ? n.children : [], n.key, r), r.lanes = l, r.stateNode = { containerInfo: n.containerInfo, pendingChildren: null, implementation: n.implementation }, r;
  }
  function Rh(n, r, l, u, c) {
    this.tag = r, this.containerInfo = n, this.finishedWork = this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.pendingContext = this.context = null, this.callbackPriority = 0, this.eventTimes = nu(0), this.expirationTimes = nu(-1), this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = nu(0), this.identifierPrefix = u, this.onRecoverableError = c, this.mutableSourceEagerHydrationData = null;
  }
  function yf(n, r, l, u, c, p, S, w, x) {
    return n = new Rh(n, r, l, w, x), r === 1 ? (r = 1, p === !0 && (r |= 8)) : r = 0, p = Ya(3, null, null, r), n.current = p, p.stateNode = n, p.memoizedState = { element: u, isDehydrated: l, cache: null, transitions: null, pendingSuspenseBoundaries: null }, Ad(p), n;
  }
  function Uy(n, r, l) {
    var u = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return { $$typeof: Le, key: u == null ? null : "" + u, children: n, containerInfo: r, implementation: l };
  }
  function ip(n) {
    if (!n) return zr;
    n = n._reactInternals;
    e: {
      if (mt(n) !== n || n.tag !== 1) throw Error(v(170));
      var r = n;
      do {
        switch (r.tag) {
          case 3:
            r = r.stateNode.context;
            break e;
          case 1:
            if (Zn(r.type)) {
              r = r.stateNode.__reactInternalMemoizedMergedChildContext;
              break e;
            }
        }
        r = r.return;
      } while (r !== null);
      throw Error(v(171));
    }
    if (n.tag === 1) {
      var l = n.type;
      if (Zn(l)) return ps(n, l, r);
    }
    return r;
  }
  function wh(n, r, l, u, c, p, S, w, x) {
    return n = yf(l, u, !0, n, c, p, S, w, x), n.context = ip(null), l = n.current, u = ar(), c = Fi(l), p = il(u, c), p.callback = r ?? null, Hl(l, p, c), n.current.lanes = c, Xi(n, c, u), ha(n, u), n;
  }
  function gf(n, r, l, u) {
    var c = r.current, p = ar(), S = Fi(c);
    return l = ip(l), r.context === null ? r.context = l : r.pendingContext = l, r = il(p, S), r.payload = { element: n }, u = u === void 0 ? null : u, u !== null && (r.callback = u), n = Hl(c, r, S), n !== null && (Gr(n, c, S, p), jc(n, c, S)), S;
  }
  function Sf(n) {
    if (n = n.current, !n.child) return null;
    switch (n.child.tag) {
      case 5:
        return n.child.stateNode;
      default:
        return n.child.stateNode;
    }
  }
  function lp(n, r) {
    if (n = n.memoizedState, n !== null && n.dehydrated !== null) {
      var l = n.retryLane;
      n.retryLane = l !== 0 && l < r ? l : r;
    }
  }
  function Ef(n, r) {
    lp(n, r), (n = n.alternate) && lp(n, r);
  }
  function bh() {
    return null;
  }
  var Ho = typeof reportError == "function" ? reportError : function(n) {
    console.error(n);
  };
  function op(n) {
    this._internalRoot = n;
  }
  Cf.prototype.render = op.prototype.render = function(n) {
    var r = this._internalRoot;
    if (r === null) throw Error(v(409));
    gf(n, r, null, null);
  }, Cf.prototype.unmount = op.prototype.unmount = function() {
    var n = this._internalRoot;
    if (n !== null) {
      this._internalRoot = null;
      var r = n.containerInfo;
      jo(function() {
        gf(null, n, null, null);
      }), r[tl] = null;
    }
  };
  function Cf(n) {
    this._internalRoot = n;
  }
  Cf.prototype.unstable_scheduleHydration = function(n) {
    if (n) {
      var r = ot();
      n = { blockedOn: null, target: n, priority: r };
      for (var l = 0; l < or.length && r !== 0 && r < or[l].priority; l++) ;
      or.splice(l, 0, n), l === 0 && Ju(n);
    }
  };
  function up(n) {
    return !(!n || n.nodeType !== 1 && n.nodeType !== 9 && n.nodeType !== 11);
  }
  function Tf(n) {
    return !(!n || n.nodeType !== 1 && n.nodeType !== 9 && n.nodeType !== 11 && (n.nodeType !== 8 || n.nodeValue !== " react-mount-point-unstable "));
  }
  function _h() {
  }
  function jy(n, r, l, u, c) {
    if (c) {
      if (typeof u == "function") {
        var p = u;
        u = function() {
          var H = Sf(S);
          p.call(H);
        };
      }
      var S = wh(r, u, n, 0, null, !1, !1, "", _h);
      return n._reactRootContainer = S, n[tl] = S.current, pu(n.nodeType === 8 ? n.parentNode : n), jo(), S;
    }
    for (; c = n.lastChild; ) n.removeChild(c);
    if (typeof u == "function") {
      var w = u;
      u = function() {
        var H = Sf(x);
        w.call(H);
      };
    }
    var x = yf(n, 0, !1, null, null, !1, !1, "", _h);
    return n._reactRootContainer = x, n[tl] = x.current, pu(n.nodeType === 8 ? n.parentNode : n), jo(function() {
      gf(r, x, l, u);
    }), x;
  }
  function Ys(n, r, l, u, c) {
    var p = l._reactRootContainer;
    if (p) {
      var S = p;
      if (typeof c == "function") {
        var w = c;
        c = function() {
          var x = Sf(S);
          w.call(x);
        };
      }
      gf(r, S, n, c);
    } else S = jy(l, r, n, c, u);
    return Sf(S);
  }
  Yt = function(n) {
    switch (n.tag) {
      case 3:
        var r = n.stateNode;
        if (r.current.memoizedState.isDehydrated) {
          var l = ii(r.pendingLanes);
          l !== 0 && (Ki(r, l | 1), ha(r, yt()), (Bt & 6) === 0 && (xu = yt() + 500, Oi()));
        }
        break;
      case 13:
        jo(function() {
          var u = wa(n, 1);
          if (u !== null) {
            var c = ar();
            Gr(u, n, 1, c);
          }
        }), Ef(n, 1);
    }
  }, qu = function(n) {
    if (n.tag === 13) {
      var r = wa(n, 134217728);
      if (r !== null) {
        var l = ar();
        Gr(r, n, 134217728, l);
      }
      Ef(n, 134217728);
    }
  }, Ti = function(n) {
    if (n.tag === 13) {
      var r = Fi(n), l = wa(n, r);
      if (l !== null) {
        var u = ar();
        Gr(l, n, r, u);
      }
      Ef(n, r);
    }
  }, ot = function() {
    return tn;
  }, au = function(n, r) {
    var l = tn;
    try {
      return tn = n, r();
    } finally {
      tn = l;
    }
  }, un = function(n, r, l) {
    switch (r) {
      case "input":
        if (ft(n, l), r = l.name, l.type === "radio" && r != null) {
          for (l = n; l.parentNode; ) l = l.parentNode;
          for (l = l.querySelectorAll("input[name=" + JSON.stringify("" + r) + '][type="radio"]'), r = 0; r < l.length; r++) {
            var u = l[r];
            if (u !== n && u.form === n.form) {
              var c = Ln(u);
              if (!c) throw Error(v(90));
              Qn(u), ft(u, c);
            }
          }
        }
        break;
      case "textarea":
        Xt(n, l);
        break;
      case "select":
        r = l.value, r != null && Rt(n, !!l.multiple, r, !1);
    }
  }, Qi = ep, Ja = jo;
  var Fy = { usingClientEntryPoint: !1, Events: [He, ci, Ln, Pr, Gi, ep] }, Ws = { findFiberByHostInstance: So, bundleType: 0, version: "18.3.1", rendererPackageName: "react-dom" }, xh = { bundleType: Ws.bundleType, version: Ws.version, rendererPackageName: Ws.rendererPackageName, rendererConfig: Ws.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setErrorHandler: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: Je.ReactCurrentDispatcher, findHostInstanceByFiber: function(n) {
    return n = Pn(n), n === null ? null : n.stateNode;
  }, findFiberByHostInstance: Ws.findFiberByHostInstance || bh, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null, reconcilerVersion: "18.3.1-next-f1338f8080-20240426" };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var Ql = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Ql.isDisabled && Ql.supportsFiber) try {
      Rl = Ql.inject(xh), aa = Ql;
    } catch {
    }
  }
  return qa.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Fy, qa.createPortal = function(n, r) {
    var l = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!up(r)) throw Error(v(200));
    return Uy(n, r, null, l);
  }, qa.createRoot = function(n, r) {
    if (!up(n)) throw Error(v(299));
    var l = !1, u = "", c = Ho;
    return r != null && (r.unstable_strictMode === !0 && (l = !0), r.identifierPrefix !== void 0 && (u = r.identifierPrefix), r.onRecoverableError !== void 0 && (c = r.onRecoverableError)), r = yf(n, 1, !1, null, null, l, !1, u, c), n[tl] = r.current, pu(n.nodeType === 8 ? n.parentNode : n), new op(r);
  }, qa.findDOMNode = function(n) {
    if (n == null) return null;
    if (n.nodeType === 1) return n;
    var r = n._reactInternals;
    if (r === void 0)
      throw typeof n.render == "function" ? Error(v(188)) : (n = Object.keys(n).join(","), Error(v(268, n)));
    return n = Pn(r), n = n === null ? null : n.stateNode, n;
  }, qa.flushSync = function(n) {
    return jo(n);
  }, qa.hydrate = function(n, r, l) {
    if (!Tf(r)) throw Error(v(200));
    return Ys(null, n, r, !0, l);
  }, qa.hydrateRoot = function(n, r, l) {
    if (!up(n)) throw Error(v(405));
    var u = l != null && l.hydratedSources || null, c = !1, p = "", S = Ho;
    if (l != null && (l.unstable_strictMode === !0 && (c = !0), l.identifierPrefix !== void 0 && (p = l.identifierPrefix), l.onRecoverableError !== void 0 && (S = l.onRecoverableError)), r = wh(r, null, n, 1, l ?? null, c, !1, p, S), n[tl] = r.current, pu(n), u) for (n = 0; n < u.length; n++) l = u[n], c = l._getVersion, c = c(l._source), r.mutableSourceEagerHydrationData == null ? r.mutableSourceEagerHydrationData = [l, c] : r.mutableSourceEagerHydrationData.push(
      l,
      c
    );
    return new Cf(r);
  }, qa.render = function(n, r, l) {
    if (!Tf(r)) throw Error(v(200));
    return Ys(null, n, r, !1, l);
  }, qa.unmountComponentAtNode = function(n) {
    if (!Tf(n)) throw Error(v(40));
    return n._reactRootContainer ? (jo(function() {
      Ys(null, null, n, !1, function() {
        n._reactRootContainer = null, n[tl] = null;
      });
    }), !0) : !1;
  }, qa.unstable_batchedUpdates = ep, qa.unstable_renderSubtreeIntoContainer = function(n, r, l, u) {
    if (!Tf(l)) throw Error(v(200));
    if (n == null || n._reactInternals === void 0) throw Error(v(38));
    return Ys(n, r, l, !1, u);
  }, qa.version = "18.3.1-next-f1338f8080-20240426", qa;
}
var Za = {};
/**
 * @license React
 * react-dom.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var wR;
function QD() {
  return wR || (wR = 1, process.env.NODE_ENV !== "production" && (function() {
    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error());
    var g = fv(), d = WR(), v = g.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, R = !1;
    function M(e) {
      R = e;
    }
    function I(e) {
      if (!R) {
        for (var t = arguments.length, a = new Array(t > 1 ? t - 1 : 0), i = 1; i < t; i++)
          a[i - 1] = arguments[i];
        de("warn", e, a);
      }
    }
    function C(e) {
      if (!R) {
        for (var t = arguments.length, a = new Array(t > 1 ? t - 1 : 0), i = 1; i < t; i++)
          a[i - 1] = arguments[i];
        de("error", e, a);
      }
    }
    function de(e, t, a) {
      {
        var i = v.ReactDebugCurrentFrame, o = i.getStackAddendum();
        o !== "" && (t += "%s", a = a.concat([o]));
        var s = a.map(function(f) {
          return String(f);
        });
        s.unshift("Warning: " + t), Function.prototype.apply.call(console[e], console, s);
      }
    }
    var Q = 0, W = 1, Z = 2, J = 3, se = 4, oe = 5, Ue = 6, ct = 7, Ke = 8, jt = 9, tt = 10, Ze = 11, Je = 12, _e = 13, Le = 14, je = 15, sn = 16, Gt = 17, Pt = 18, dn = 19, nt = 21, Ae = 22, _t = 23, xt = 24, At = 25, Ee = !0, ie = !1, be = !1, ue = !1, L = !1, Y = !0, Ie = !0, Fe = !0, gt = !0, pt = /* @__PURE__ */ new Set(), vt = {}, rt = {};
    function St(e, t) {
      Qt(e, t), Qt(e + "Capture", t);
    }
    function Qt(e, t) {
      vt[e] && C("EventRegistry: More than one plugin attempted to publish the same registration name, `%s`.", e), vt[e] = t;
      {
        var a = e.toLowerCase();
        rt[a] = e, e === "onDoubleClick" && (rt.ondblclick = e);
      }
      for (var i = 0; i < t.length; i++)
        pt.add(t[i]);
    }
    var jn = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u", Qn = Object.prototype.hasOwnProperty;
    function Fn(e) {
      {
        var t = typeof Symbol == "function" && Symbol.toStringTag, a = t && e[Symbol.toStringTag] || e.constructor.name || "Object";
        return a;
      }
    }
    function Ce(e) {
      try {
        return Ve(e), !1;
      } catch {
        return !0;
      }
    }
    function Ve(e) {
      return "" + e;
    }
    function Qe(e, t) {
      if (Ce(e))
        return C("The provided `%s` attribute is an unsupported type %s. This value must be coerced to a string before before using it here.", t, Fn(e)), Ve(e);
    }
    function ft(e) {
      if (Ce(e))
        return C("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", Fn(e)), Ve(e);
    }
    function Lt(e, t) {
      if (Ce(e))
        return C("The provided `%s` prop is an unsupported type %s. This value must be coerced to a string before before using it here.", t, Fn(e)), Ve(e);
    }
    function zt(e, t) {
      if (Ce(e))
        return C("The provided `%s` CSS property is an unsupported type %s. This value must be coerced to a string before before using it here.", t, Fn(e)), Ve(e);
    }
    function Ct(e) {
      if (Ce(e))
        return C("The provided HTML markup uses a value of unsupported type %s. This value must be coerced to a string before before using it here.", Fn(e)), Ve(e);
    }
    function Rt(e) {
      if (Ce(e))
        return C("Form field values (value, checked, defaultValue, or defaultChecked props) must be strings, not %s. This value must be coerced to a string before before using it here.", Fn(e)), Ve(e);
    }
    var Nt = 0, wt = 1, Xt = 2, it = 3, lt = 4, Zt = 5, Ft = 6, Xe = ":A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD", ne = Xe + "\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040", me = new RegExp("^[" + Xe + "][" + ne + "]*$"), Oe = {}, ht = {};
    function Jt(e) {
      return Qn.call(ht, e) ? !0 : Qn.call(Oe, e) ? !1 : me.test(e) ? (ht[e] = !0, !0) : (Oe[e] = !0, C("Invalid attribute name: `%s`", e), !1);
    }
    function en(e, t, a) {
      return t !== null ? t.type === Nt : a ? !1 : e.length > 2 && (e[0] === "o" || e[0] === "O") && (e[1] === "n" || e[1] === "N");
    }
    function pn(e, t, a, i) {
      if (a !== null && a.type === Nt)
        return !1;
      switch (typeof t) {
        case "function":
        // $FlowIssue symbol is perfectly valid here
        case "symbol":
          return !0;
        case "boolean": {
          if (i)
            return !1;
          if (a !== null)
            return !a.acceptsBooleans;
          var o = e.toLowerCase().slice(0, 5);
          return o !== "data-" && o !== "aria-";
        }
        default:
          return !1;
      }
    }
    function Xn(e, t, a, i) {
      if (t === null || typeof t > "u" || pn(e, t, a, i))
        return !0;
      if (i)
        return !1;
      if (a !== null)
        switch (a.type) {
          case it:
            return !t;
          case lt:
            return t === !1;
          case Zt:
            return isNaN(t);
          case Ft:
            return isNaN(t) || t < 1;
        }
      return !1;
    }
    function hn(e) {
      return un.hasOwnProperty(e) ? un[e] : null;
    }
    function vn(e, t, a, i, o, s, f) {
      this.acceptsBooleans = t === Xt || t === it || t === lt, this.attributeName = i, this.attributeNamespace = o, this.mustUseProperty = a, this.propertyName = e, this.type = t, this.sanitizeURL = s, this.removeEmptyString = f;
    }
    var un = {}, Ar = [
      "children",
      "dangerouslySetInnerHTML",
      // TODO: This prevents the assignment of defaultValue to regular
      // elements (not just inputs). Now that ReactDOMInput assigns to the
      // defaultValue property -- do we need this?
      "defaultValue",
      "defaultChecked",
      "innerHTML",
      "suppressContentEditableWarning",
      "suppressHydrationWarning",
      "style"
    ];
    Ar.forEach(function(e) {
      un[e] = new vn(
        e,
        Nt,
        !1,
        // mustUseProperty
        e,
        // attributeName
        null,
        // attributeNamespace
        !1,
        // sanitizeURL
        !1
      );
    }), [["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(e) {
      var t = e[0], a = e[1];
      un[t] = new vn(
        t,
        wt,
        !1,
        // mustUseProperty
        a,
        // attributeName
        null,
        // attributeNamespace
        !1,
        // sanitizeURL
        !1
      );
    }), ["contentEditable", "draggable", "spellCheck", "value"].forEach(function(e) {
      un[e] = new vn(
        e,
        Xt,
        !1,
        // mustUseProperty
        e.toLowerCase(),
        // attributeName
        null,
        // attributeNamespace
        !1,
        // sanitizeURL
        !1
      );
    }), ["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(e) {
      un[e] = new vn(
        e,
        Xt,
        !1,
        // mustUseProperty
        e,
        // attributeName
        null,
        // attributeNamespace
        !1,
        // sanitizeURL
        !1
      );
    }), [
      "allowFullScreen",
      "async",
      // Note: there is a special case that prevents it from being written to the DOM
      // on the client side because the browsers are inconsistent. Instead we call focus().
      "autoFocus",
      "autoPlay",
      "controls",
      "default",
      "defer",
      "disabled",
      "disablePictureInPicture",
      "disableRemotePlayback",
      "formNoValidate",
      "hidden",
      "loop",
      "noModule",
      "noValidate",
      "open",
      "playsInline",
      "readOnly",
      "required",
      "reversed",
      "scoped",
      "seamless",
      // Microdata
      "itemScope"
    ].forEach(function(e) {
      un[e] = new vn(
        e,
        it,
        !1,
        // mustUseProperty
        e.toLowerCase(),
        // attributeName
        null,
        // attributeNamespace
        !1,
        // sanitizeURL
        !1
      );
    }), [
      "checked",
      // Note: `option.selected` is not updated if `select.multiple` is
      // disabled with `removeAttribute`. We have special logic for handling this.
      "multiple",
      "muted",
      "selected"
      // NOTE: if you add a camelCased prop to this list,
      // you'll need to set attributeName to name.toLowerCase()
      // instead in the assignment below.
    ].forEach(function(e) {
      un[e] = new vn(
        e,
        it,
        !0,
        // mustUseProperty
        e,
        // attributeName
        null,
        // attributeNamespace
        !1,
        // sanitizeURL
        !1
      );
    }), [
      "capture",
      "download"
      // NOTE: if you add a camelCased prop to this list,
      // you'll need to set attributeName to name.toLowerCase()
      // instead in the assignment below.
    ].forEach(function(e) {
      un[e] = new vn(
        e,
        lt,
        !1,
        // mustUseProperty
        e,
        // attributeName
        null,
        // attributeNamespace
        !1,
        // sanitizeURL
        !1
      );
    }), [
      "cols",
      "rows",
      "size",
      "span"
      // NOTE: if you add a camelCased prop to this list,
      // you'll need to set attributeName to name.toLowerCase()
      // instead in the assignment below.
    ].forEach(function(e) {
      un[e] = new vn(
        e,
        Ft,
        !1,
        // mustUseProperty
        e,
        // attributeName
        null,
        // attributeNamespace
        !1,
        // sanitizeURL
        !1
      );
    }), ["rowSpan", "start"].forEach(function(e) {
      un[e] = new vn(
        e,
        Zt,
        !1,
        // mustUseProperty
        e.toLowerCase(),
        // attributeName
        null,
        // attributeNamespace
        !1,
        // sanitizeURL
        !1
      );
    });
    var lr = /[\-\:]([a-z])/g, Hr = function(e) {
      return e[1].toUpperCase();
    };
    [
      "accent-height",
      "alignment-baseline",
      "arabic-form",
      "baseline-shift",
      "cap-height",
      "clip-path",
      "clip-rule",
      "color-interpolation",
      "color-interpolation-filters",
      "color-profile",
      "color-rendering",
      "dominant-baseline",
      "enable-background",
      "fill-opacity",
      "fill-rule",
      "flood-color",
      "flood-opacity",
      "font-family",
      "font-size",
      "font-size-adjust",
      "font-stretch",
      "font-style",
      "font-variant",
      "font-weight",
      "glyph-name",
      "glyph-orientation-horizontal",
      "glyph-orientation-vertical",
      "horiz-adv-x",
      "horiz-origin-x",
      "image-rendering",
      "letter-spacing",
      "lighting-color",
      "marker-end",
      "marker-mid",
      "marker-start",
      "overline-position",
      "overline-thickness",
      "paint-order",
      "panose-1",
      "pointer-events",
      "rendering-intent",
      "shape-rendering",
      "stop-color",
      "stop-opacity",
      "strikethrough-position",
      "strikethrough-thickness",
      "stroke-dasharray",
      "stroke-dashoffset",
      "stroke-linecap",
      "stroke-linejoin",
      "stroke-miterlimit",
      "stroke-opacity",
      "stroke-width",
      "text-anchor",
      "text-decoration",
      "text-rendering",
      "underline-position",
      "underline-thickness",
      "unicode-bidi",
      "unicode-range",
      "units-per-em",
      "v-alphabetic",
      "v-hanging",
      "v-ideographic",
      "v-mathematical",
      "vector-effect",
      "vert-adv-y",
      "vert-origin-x",
      "vert-origin-y",
      "word-spacing",
      "writing-mode",
      "xmlns:xlink",
      "x-height"
      // NOTE: if you add a camelCased prop to this list,
      // you'll need to set attributeName to name.toLowerCase()
      // instead in the assignment below.
    ].forEach(function(e) {
      var t = e.replace(lr, Hr);
      un[t] = new vn(
        t,
        wt,
        !1,
        // mustUseProperty
        e,
        null,
        // attributeNamespace
        !1,
        // sanitizeURL
        !1
      );
    }), [
      "xlink:actuate",
      "xlink:arcrole",
      "xlink:role",
      "xlink:show",
      "xlink:title",
      "xlink:type"
      // NOTE: if you add a camelCased prop to this list,
      // you'll need to set attributeName to name.toLowerCase()
      // instead in the assignment below.
    ].forEach(function(e) {
      var t = e.replace(lr, Hr);
      un[t] = new vn(
        t,
        wt,
        !1,
        // mustUseProperty
        e,
        "http://www.w3.org/1999/xlink",
        !1,
        // sanitizeURL
        !1
      );
    }), [
      "xml:base",
      "xml:lang",
      "xml:space"
      // NOTE: if you add a camelCased prop to this list,
      // you'll need to set attributeName to name.toLowerCase()
      // instead in the assignment below.
    ].forEach(function(e) {
      var t = e.replace(lr, Hr);
      un[t] = new vn(
        t,
        wt,
        !1,
        // mustUseProperty
        e,
        "http://www.w3.org/XML/1998/namespace",
        !1,
        // sanitizeURL
        !1
      );
    }), ["tabIndex", "crossOrigin"].forEach(function(e) {
      un[e] = new vn(
        e,
        wt,
        !1,
        // mustUseProperty
        e.toLowerCase(),
        // attributeName
        null,
        // attributeNamespace
        !1,
        // sanitizeURL
        !1
      );
    });
    var Pr = "xlinkHref";
    un[Pr] = new vn(
      "xlinkHref",
      wt,
      !1,
      // mustUseProperty
      "xlink:href",
      "http://www.w3.org/1999/xlink",
      !0,
      // sanitizeURL
      !1
    ), ["src", "href", "action", "formAction"].forEach(function(e) {
      un[e] = new vn(
        e,
        wt,
        !1,
        // mustUseProperty
        e.toLowerCase(),
        // attributeName
        null,
        // attributeNamespace
        !0,
        // sanitizeURL
        !0
      );
    });
    var Gi = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*\:/i, Qi = !1;
    function Ja(e) {
      !Qi && Gi.test(e) && (Qi = !0, C("A future version of React will block javascript: URLs as a security precaution. Use event handlers instead if you can. If you need to generate unsafe HTML try using dangerouslySetInnerHTML instead. React was passed %s.", JSON.stringify(e)));
    }
    function ei(e, t, a, i) {
      if (i.mustUseProperty) {
        var o = i.propertyName;
        return e[o];
      } else {
        Qe(a, t), i.sanitizeURL && Ja("" + a);
        var s = i.attributeName, f = null;
        if (i.type === lt) {
          if (e.hasAttribute(s)) {
            var h = e.getAttribute(s);
            return h === "" ? !0 : Xn(t, a, i, !1) ? h : h === "" + a ? a : h;
          }
        } else if (e.hasAttribute(s)) {
          if (Xn(t, a, i, !1))
            return e.getAttribute(s);
          if (i.type === it)
            return a;
          f = e.getAttribute(s);
        }
        return Xn(t, a, i, !1) ? f === null ? a : f : f === "" + a ? a : f;
      }
    }
    function gi(e, t, a, i) {
      {
        if (!Jt(t))
          return;
        if (!e.hasAttribute(t))
          return a === void 0 ? void 0 : null;
        var o = e.getAttribute(t);
        return Qe(a, t), o === "" + a ? a : o;
      }
    }
    function gr(e, t, a, i) {
      var o = hn(t);
      if (!en(t, o, i)) {
        if (Xn(t, a, o, i) && (a = null), i || o === null) {
          if (Jt(t)) {
            var s = t;
            a === null ? e.removeAttribute(s) : (Qe(a, t), e.setAttribute(s, "" + a));
          }
          return;
        }
        var f = o.mustUseProperty;
        if (f) {
          var h = o.propertyName;
          if (a === null) {
            var m = o.type;
            e[h] = m === it ? !1 : "";
          } else
            e[h] = a;
          return;
        }
        var E = o.attributeName, T = o.attributeNamespace;
        if (a === null)
          e.removeAttribute(E);
        else {
          var O = o.type, D;
          O === it || O === lt && a === !0 ? D = "" : (Qe(a, E), D = "" + a, o.sanitizeURL && Ja(D.toString())), T ? e.setAttributeNS(T, E, D) : e.setAttribute(E, D);
        }
      }
    }
    var Sr = Symbol.for("react.element"), Kn = Symbol.for("react.portal"), Si = Symbol.for("react.fragment"), ti = Symbol.for("react.strict_mode"), Ei = Symbol.for("react.profiler"), Ci = Symbol.for("react.provider"), _ = Symbol.for("react.context"), X = Symbol.for("react.forward_ref"), pe = Symbol.for("react.suspense"), we = Symbol.for("react.suspense_list"), mt = Symbol.for("react.memo"), ut = Symbol.for("react.lazy"), Ot = Symbol.for("react.scope"), Dt = Symbol.for("react.debug_trace_mode"), Pn = Symbol.for("react.offscreen"), Rn = Symbol.for("react.legacy_hidden"), _n = Symbol.for("react.cache"), Er = Symbol.for("react.tracing_marker"), ni = Symbol.iterator, ri = "@@iterator";
    function yt(e) {
      if (e === null || typeof e != "object")
        return null;
      var t = ni && e[ni] || e[ri];
      return typeof t == "function" ? t : null;
    }
    var Tt = Object.assign, ai = 0, lo, oo, Tl, Zo, Rl, aa, Ku;
    function Vr() {
    }
    Vr.__reactDisabledLog = !0;
    function pc() {
      {
        if (ai === 0) {
          lo = console.log, oo = console.info, Tl = console.warn, Zo = console.error, Rl = console.group, aa = console.groupCollapsed, Ku = console.groupEnd;
          var e = {
            configurable: !0,
            enumerable: !0,
            value: Vr,
            writable: !0
          };
          Object.defineProperties(console, {
            info: e,
            log: e,
            warn: e,
            error: e,
            group: e,
            groupCollapsed: e,
            groupEnd: e
          });
        }
        ai++;
      }
    }
    function vc() {
      {
        if (ai--, ai === 0) {
          var e = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: Tt({}, e, {
              value: lo
            }),
            info: Tt({}, e, {
              value: oo
            }),
            warn: Tt({}, e, {
              value: Tl
            }),
            error: Tt({}, e, {
              value: Zo
            }),
            group: Tt({}, e, {
              value: Rl
            }),
            groupCollapsed: Tt({}, e, {
              value: aa
            }),
            groupEnd: Tt({}, e, {
              value: Ku
            })
          });
        }
        ai < 0 && C("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var Jo = v.ReactCurrentDispatcher, wl;
    function Ca(e, t, a) {
      {
        if (wl === void 0)
          try {
            throw Error();
          } catch (o) {
            var i = o.stack.trim().match(/\n( *(at )?)/);
            wl = i && i[1] || "";
          }
        return `
` + wl + e;
      }
    }
    var ii = !1, li;
    {
      var eu = typeof WeakMap == "function" ? WeakMap : Map;
      li = new eu();
    }
    function uo(e, t) {
      if (!e || ii)
        return "";
      {
        var a = li.get(e);
        if (a !== void 0)
          return a;
      }
      var i;
      ii = !0;
      var o = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var s;
      s = Jo.current, Jo.current = null, pc();
      try {
        if (t) {
          var f = function() {
            throw Error();
          };
          if (Object.defineProperty(f.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(f, []);
            } catch (P) {
              i = P;
            }
            Reflect.construct(e, [], f);
          } else {
            try {
              f.call();
            } catch (P) {
              i = P;
            }
            e.call(f.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (P) {
            i = P;
          }
          e();
        }
      } catch (P) {
        if (P && i && typeof P.stack == "string") {
          for (var h = P.stack.split(`
`), m = i.stack.split(`
`), E = h.length - 1, T = m.length - 1; E >= 1 && T >= 0 && h[E] !== m[T]; )
            T--;
          for (; E >= 1 && T >= 0; E--, T--)
            if (h[E] !== m[T]) {
              if (E !== 1 || T !== 1)
                do
                  if (E--, T--, T < 0 || h[E] !== m[T]) {
                    var O = `
` + h[E].replace(" at new ", " at ");
                    return e.displayName && O.includes("<anonymous>") && (O = O.replace("<anonymous>", e.displayName)), typeof e == "function" && li.set(e, O), O;
                  }
                while (E >= 1 && T >= 0);
              break;
            }
        }
      } finally {
        ii = !1, Jo.current = s, vc(), Error.prepareStackTrace = o;
      }
      var D = e ? e.displayName || e.name : "", j = D ? Ca(D) : "";
      return typeof e == "function" && li.set(e, j), j;
    }
    function bl(e, t, a) {
      return uo(e, !0);
    }
    function tu(e, t, a) {
      return uo(e, !1);
    }
    function nu(e) {
      var t = e.prototype;
      return !!(t && t.isReactComponent);
    }
    function Xi(e, t, a) {
      if (e == null)
        return "";
      if (typeof e == "function")
        return uo(e, nu(e));
      if (typeof e == "string")
        return Ca(e);
      switch (e) {
        case pe:
          return Ca("Suspense");
        case we:
          return Ca("SuspenseList");
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case X:
            return tu(e.render);
          case mt:
            return Xi(e.type, t, a);
          case ut: {
            var i = e, o = i._payload, s = i._init;
            try {
              return Xi(s(o), t, a);
            } catch {
            }
          }
        }
      return "";
    }
    function rd(e) {
      switch (e._debugOwner && e._debugOwner.type, e._debugSource, e.tag) {
        case oe:
          return Ca(e.type);
        case sn:
          return Ca("Lazy");
        case _e:
          return Ca("Suspense");
        case dn:
          return Ca("SuspenseList");
        case Q:
        case Z:
        case je:
          return tu(e.type);
        case Ze:
          return tu(e.type.render);
        case W:
          return bl(e.type);
        default:
          return "";
      }
    }
    function Ki(e) {
      try {
        var t = "", a = e;
        do
          t += rd(a), a = a.return;
        while (a);
        return t;
      } catch (i) {
        return `
Error generating stack: ` + i.message + `
` + i.stack;
      }
    }
    function tn(e, t, a) {
      var i = e.displayName;
      if (i)
        return i;
      var o = t.displayName || t.name || "";
      return o !== "" ? a + "(" + o + ")" : a;
    }
    function ru(e) {
      return e.displayName || "Context";
    }
    function Yt(e) {
      if (e == null)
        return null;
      if (typeof e.tag == "number" && C("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof e == "function")
        return e.displayName || e.name || null;
      if (typeof e == "string")
        return e;
      switch (e) {
        case Si:
          return "Fragment";
        case Kn:
          return "Portal";
        case Ei:
          return "Profiler";
        case ti:
          return "StrictMode";
        case pe:
          return "Suspense";
        case we:
          return "SuspenseList";
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case _:
            var t = e;
            return ru(t) + ".Consumer";
          case Ci:
            var a = e;
            return ru(a._context) + ".Provider";
          case X:
            return tn(e, e.render, "ForwardRef");
          case mt:
            var i = e.displayName || null;
            return i !== null ? i : Yt(e.type) || "Memo";
          case ut: {
            var o = e, s = o._payload, f = o._init;
            try {
              return Yt(f(s));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    function qu(e, t, a) {
      var i = t.displayName || t.name || "";
      return e.displayName || (i !== "" ? a + "(" + i + ")" : a);
    }
    function Ti(e) {
      return e.displayName || "Context";
    }
    function ot(e) {
      var t = e.tag, a = e.type;
      switch (t) {
        case xt:
          return "Cache";
        case jt:
          var i = a;
          return Ti(i) + ".Consumer";
        case tt:
          var o = a;
          return Ti(o._context) + ".Provider";
        case Pt:
          return "DehydratedFragment";
        case Ze:
          return qu(a, a.render, "ForwardRef");
        case ct:
          return "Fragment";
        case oe:
          return a;
        case se:
          return "Portal";
        case J:
          return "Root";
        case Ue:
          return "Text";
        case sn:
          return Yt(a);
        case Ke:
          return a === ti ? "StrictMode" : "Mode";
        case Ae:
          return "Offscreen";
        case Je:
          return "Profiler";
        case nt:
          return "Scope";
        case _e:
          return "Suspense";
        case dn:
          return "SuspenseList";
        case At:
          return "TracingMarker";
        // The display name for this tags come from the user-provided type:
        case W:
        case Q:
        case Gt:
        case Z:
        case Le:
        case je:
          if (typeof a == "function")
            return a.displayName || a.name || null;
          if (typeof a == "string")
            return a;
          break;
      }
      return null;
    }
    var au = v.ReactDebugCurrentFrame, Cr = null, Ri = !1;
    function Br() {
      {
        if (Cr === null)
          return null;
        var e = Cr._debugOwner;
        if (e !== null && typeof e < "u")
          return ot(e);
      }
      return null;
    }
    function wi() {
      return Cr === null ? "" : Ki(Cr);
    }
    function xn() {
      au.getCurrentStack = null, Cr = null, Ri = !1;
    }
    function mn(e) {
      au.getCurrentStack = e === null ? null : wi, Cr = e, Ri = !1;
    }
    function _l() {
      return Cr;
    }
    function or(e) {
      Ri = e;
    }
    function $r(e) {
      return "" + e;
    }
    function Na(e) {
      switch (typeof e) {
        case "boolean":
        case "number":
        case "string":
        case "undefined":
          return e;
        case "object":
          return Rt(e), e;
        default:
          return "";
      }
    }
    var so = {
      button: !0,
      checkbox: !0,
      image: !0,
      hidden: !0,
      radio: !0,
      reset: !0,
      submit: !0
    };
    function Zu(e, t) {
      so[t.type] || t.onChange || t.onInput || t.readOnly || t.disabled || t.value == null || C("You provided a `value` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultValue`. Otherwise, set either `onChange` or `readOnly`."), t.onChange || t.readOnly || t.disabled || t.checked == null || C("You provided a `checked` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultChecked`. Otherwise, set either `onChange` or `readOnly`.");
    }
    function Ju(e) {
      var t = e.type, a = e.nodeName;
      return a && a.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
    }
    function xl(e) {
      return e._valueTracker;
    }
    function co(e) {
      e._valueTracker = null;
    }
    function ad(e) {
      var t = "";
      return e && (Ju(e) ? t = e.checked ? "true" : "false" : t = e.value), t;
    }
    function Aa(e) {
      var t = Ju(e) ? "checked" : "value", a = Object.getOwnPropertyDescriptor(e.constructor.prototype, t);
      Rt(e[t]);
      var i = "" + e[t];
      if (!(e.hasOwnProperty(t) || typeof a > "u" || typeof a.get != "function" || typeof a.set != "function")) {
        var o = a.get, s = a.set;
        Object.defineProperty(e, t, {
          configurable: !0,
          get: function() {
            return o.call(this);
          },
          set: function(h) {
            Rt(h), i = "" + h, s.call(this, h);
          }
        }), Object.defineProperty(e, t, {
          enumerable: a.enumerable
        });
        var f = {
          getValue: function() {
            return i;
          },
          setValue: function(h) {
            Rt(h), i = "" + h;
          },
          stopTracking: function() {
            co(e), delete e[t];
          }
        };
        return f;
      }
    }
    function oi(e) {
      xl(e) || (e._valueTracker = Aa(e));
    }
    function bi(e) {
      if (!e)
        return !1;
      var t = xl(e);
      if (!t)
        return !0;
      var a = t.getValue(), i = ad(e);
      return i !== a ? (t.setValue(i), !0) : !1;
    }
    function za(e) {
      if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u")
        return null;
      try {
        return e.activeElement || e.body;
      } catch {
        return e.body;
      }
    }
    var iu = !1, lu = !1, Dl = !1, fo = !1;
    function ou(e) {
      var t = e.type === "checkbox" || e.type === "radio";
      return t ? e.checked != null : e.value != null;
    }
    function uu(e, t) {
      var a = e, i = t.checked, o = Tt({}, t, {
        defaultChecked: void 0,
        defaultValue: void 0,
        value: void 0,
        checked: i ?? a._wrapperState.initialChecked
      });
      return o;
    }
    function ui(e, t) {
      Zu("input", t), t.checked !== void 0 && t.defaultChecked !== void 0 && !lu && (C("%s contains an input of type %s with both checked and defaultChecked props. Input elements must be either controlled or uncontrolled (specify either the checked prop, or the defaultChecked prop, but not both). Decide between using a controlled or uncontrolled input element and remove one of these props. More info: https://reactjs.org/link/controlled-components", Br() || "A component", t.type), lu = !0), t.value !== void 0 && t.defaultValue !== void 0 && !iu && (C("%s contains an input of type %s with both value and defaultValue props. Input elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled input element and remove one of these props. More info: https://reactjs.org/link/controlled-components", Br() || "A component", t.type), iu = !0);
      var a = e, i = t.defaultValue == null ? "" : t.defaultValue;
      a._wrapperState = {
        initialChecked: t.checked != null ? t.checked : t.defaultChecked,
        initialValue: Na(t.value != null ? t.value : i),
        controlled: ou(t)
      };
    }
    function y(e, t) {
      var a = e, i = t.checked;
      i != null && gr(a, "checked", i, !1);
    }
    function b(e, t) {
      var a = e;
      {
        var i = ou(t);
        !a._wrapperState.controlled && i && !fo && (C("A component is changing an uncontrolled input to be controlled. This is likely caused by the value changing from undefined to a defined value, which should not happen. Decide between using a controlled or uncontrolled input element for the lifetime of the component. More info: https://reactjs.org/link/controlled-components"), fo = !0), a._wrapperState.controlled && !i && !Dl && (C("A component is changing a controlled input to be uncontrolled. This is likely caused by the value changing from a defined to undefined, which should not happen. Decide between using a controlled or uncontrolled input element for the lifetime of the component. More info: https://reactjs.org/link/controlled-components"), Dl = !0);
      }
      y(e, t);
      var o = Na(t.value), s = t.type;
      if (o != null)
        s === "number" ? (o === 0 && a.value === "" || // We explicitly want to coerce to number here if possible.
        // eslint-disable-next-line
        a.value != o) && (a.value = $r(o)) : a.value !== $r(o) && (a.value = $r(o));
      else if (s === "submit" || s === "reset") {
        a.removeAttribute("value");
        return;
      }
      t.hasOwnProperty("value") ? Be(a, t.type, o) : t.hasOwnProperty("defaultValue") && Be(a, t.type, Na(t.defaultValue)), t.checked == null && t.defaultChecked != null && (a.defaultChecked = !!t.defaultChecked);
    }
    function F(e, t, a) {
      var i = e;
      if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
        var o = t.type, s = o === "submit" || o === "reset";
        if (s && (t.value === void 0 || t.value === null))
          return;
        var f = $r(i._wrapperState.initialValue);
        a || f !== i.value && (i.value = f), i.defaultValue = f;
      }
      var h = i.name;
      h !== "" && (i.name = ""), i.defaultChecked = !i.defaultChecked, i.defaultChecked = !!i._wrapperState.initialChecked, h !== "" && (i.name = h);
    }
    function V(e, t) {
      var a = e;
      b(a, t), le(a, t);
    }
    function le(e, t) {
      var a = t.name;
      if (t.type === "radio" && a != null) {
        for (var i = e; i.parentNode; )
          i = i.parentNode;
        Qe(a, "name");
        for (var o = i.querySelectorAll("input[name=" + JSON.stringify("" + a) + '][type="radio"]'), s = 0; s < o.length; s++) {
          var f = o[s];
          if (!(f === e || f.form !== e.form)) {
            var h = Yh(f);
            if (!h)
              throw new Error("ReactDOMInput: Mixing React and non-React radio inputs with the same `name` is not supported.");
            bi(f), b(f, h);
          }
        }
      }
    }
    function Be(e, t, a) {
      // Focused number inputs synchronize on blur. See ChangeEventPlugin.js
      (t !== "number" || za(e.ownerDocument) !== e) && (a == null ? e.defaultValue = $r(e._wrapperState.initialValue) : e.defaultValue !== $r(a) && (e.defaultValue = $r(a)));
    }
    var fe = !1, We = !1, Mt = !1;
    function Wt(e, t) {
      t.value == null && (typeof t.children == "object" && t.children !== null ? g.Children.forEach(t.children, function(a) {
        a != null && (typeof a == "string" || typeof a == "number" || We || (We = !0, C("Cannot infer the option value of complex children. Pass a `value` prop or use a plain string as children to <option>.")));
      }) : t.dangerouslySetInnerHTML != null && (Mt || (Mt = !0, C("Pass a `value` prop if you set dangerouslyInnerHTML so React knows which value should be selected.")))), t.selected != null && !fe && (C("Use the `defaultValue` or `value` props on <select> instead of setting `selected` on <option>."), fe = !0);
    }
    function wn(e, t) {
      t.value != null && e.setAttribute("value", $r(Na(t.value)));
    }
    var yn = Array.isArray;
    function bt(e) {
      return yn(e);
    }
    var gn;
    gn = !1;
    function Mn() {
      var e = Br();
      return e ? `

Check the render method of \`` + e + "`." : "";
    }
    var kl = ["value", "defaultValue"];
    function es(e) {
      {
        Zu("select", e);
        for (var t = 0; t < kl.length; t++) {
          var a = kl[t];
          if (e[a] != null) {
            var i = bt(e[a]);
            e.multiple && !i ? C("The `%s` prop supplied to <select> must be an array if `multiple` is true.%s", a, Mn()) : !e.multiple && i && C("The `%s` prop supplied to <select> must be a scalar value if `multiple` is false.%s", a, Mn());
          }
        }
      }
    }
    function qi(e, t, a, i) {
      var o = e.options;
      if (t) {
        for (var s = a, f = {}, h = 0; h < s.length; h++)
          f["$" + s[h]] = !0;
        for (var m = 0; m < o.length; m++) {
          var E = f.hasOwnProperty("$" + o[m].value);
          o[m].selected !== E && (o[m].selected = E), E && i && (o[m].defaultSelected = !0);
        }
      } else {
        for (var T = $r(Na(a)), O = null, D = 0; D < o.length; D++) {
          if (o[D].value === T) {
            o[D].selected = !0, i && (o[D].defaultSelected = !0);
            return;
          }
          O === null && !o[D].disabled && (O = o[D]);
        }
        O !== null && (O.selected = !0);
      }
    }
    function ts(e, t) {
      return Tt({}, t, {
        value: void 0
      });
    }
    function po(e, t) {
      var a = e;
      es(t), a._wrapperState = {
        wasMultiple: !!t.multiple
      }, t.value !== void 0 && t.defaultValue !== void 0 && !gn && (C("Select elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled select element and remove one of these props. More info: https://reactjs.org/link/controlled-components"), gn = !0);
    }
    function id(e, t) {
      var a = e;
      a.multiple = !!t.multiple;
      var i = t.value;
      i != null ? qi(a, !!t.multiple, i, !1) : t.defaultValue != null && qi(a, !!t.multiple, t.defaultValue, !0);
    }
    function hc(e, t) {
      var a = e, i = a._wrapperState.wasMultiple;
      a._wrapperState.wasMultiple = !!t.multiple;
      var o = t.value;
      o != null ? qi(a, !!t.multiple, o, !1) : i !== !!t.multiple && (t.defaultValue != null ? qi(a, !!t.multiple, t.defaultValue, !0) : qi(a, !!t.multiple, t.multiple ? [] : "", !1));
    }
    function ld(e, t) {
      var a = e, i = t.value;
      i != null && qi(a, !!t.multiple, i, !1);
    }
    var vv = !1;
    function od(e, t) {
      var a = e;
      if (t.dangerouslySetInnerHTML != null)
        throw new Error("`dangerouslySetInnerHTML` does not make sense on <textarea>.");
      var i = Tt({}, t, {
        value: void 0,
        defaultValue: void 0,
        children: $r(a._wrapperState.initialValue)
      });
      return i;
    }
    function ud(e, t) {
      var a = e;
      Zu("textarea", t), t.value !== void 0 && t.defaultValue !== void 0 && !vv && (C("%s contains a textarea with both value and defaultValue props. Textarea elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled textarea and remove one of these props. More info: https://reactjs.org/link/controlled-components", Br() || "A component"), vv = !0);
      var i = t.value;
      if (i == null) {
        var o = t.children, s = t.defaultValue;
        if (o != null) {
          C("Use the `defaultValue` or `value` props instead of setting children on <textarea>.");
          {
            if (s != null)
              throw new Error("If you supply `defaultValue` on a <textarea>, do not pass children.");
            if (bt(o)) {
              if (o.length > 1)
                throw new Error("<textarea> can only have at most one child.");
              o = o[0];
            }
            s = o;
          }
        }
        s == null && (s = ""), i = s;
      }
      a._wrapperState = {
        initialValue: Na(i)
      };
    }
    function hv(e, t) {
      var a = e, i = Na(t.value), o = Na(t.defaultValue);
      if (i != null) {
        var s = $r(i);
        s !== a.value && (a.value = s), t.defaultValue == null && a.defaultValue !== s && (a.defaultValue = s);
      }
      o != null && (a.defaultValue = $r(o));
    }
    function mv(e, t) {
      var a = e, i = a.textContent;
      i === a._wrapperState.initialValue && i !== "" && i !== null && (a.value = i);
    }
    function py(e, t) {
      hv(e, t);
    }
    var Zi = "http://www.w3.org/1999/xhtml", sd = "http://www.w3.org/1998/Math/MathML", cd = "http://www.w3.org/2000/svg";
    function fd(e) {
      switch (e) {
        case "svg":
          return cd;
        case "math":
          return sd;
        default:
          return Zi;
      }
    }
    function dd(e, t) {
      return e == null || e === Zi ? fd(t) : e === cd && t === "foreignObject" ? Zi : e;
    }
    var yv = function(e) {
      return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction ? function(t, a, i, o) {
        MSApp.execUnsafeLocalFunction(function() {
          return e(t, a, i, o);
        });
      } : e;
    }, mc, gv = yv(function(e, t) {
      if (e.namespaceURI === cd && !("innerHTML" in e)) {
        mc = mc || document.createElement("div"), mc.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>";
        for (var a = mc.firstChild; e.firstChild; )
          e.removeChild(e.firstChild);
        for (; a.firstChild; )
          e.appendChild(a.firstChild);
        return;
      }
      e.innerHTML = t;
    }), ia = 1, Ji = 3, qn = 8, el = 9, pd = 11, su = function(e, t) {
      if (t) {
        var a = e.firstChild;
        if (a && a === e.lastChild && a.nodeType === Ji) {
          a.nodeValue = t;
          return;
        }
      }
      e.textContent = t;
    }, ns = {
      animation: ["animationDelay", "animationDirection", "animationDuration", "animationFillMode", "animationIterationCount", "animationName", "animationPlayState", "animationTimingFunction"],
      background: ["backgroundAttachment", "backgroundClip", "backgroundColor", "backgroundImage", "backgroundOrigin", "backgroundPositionX", "backgroundPositionY", "backgroundRepeat", "backgroundSize"],
      backgroundPosition: ["backgroundPositionX", "backgroundPositionY"],
      border: ["borderBottomColor", "borderBottomStyle", "borderBottomWidth", "borderImageOutset", "borderImageRepeat", "borderImageSlice", "borderImageSource", "borderImageWidth", "borderLeftColor", "borderLeftStyle", "borderLeftWidth", "borderRightColor", "borderRightStyle", "borderRightWidth", "borderTopColor", "borderTopStyle", "borderTopWidth"],
      borderBlockEnd: ["borderBlockEndColor", "borderBlockEndStyle", "borderBlockEndWidth"],
      borderBlockStart: ["borderBlockStartColor", "borderBlockStartStyle", "borderBlockStartWidth"],
      borderBottom: ["borderBottomColor", "borderBottomStyle", "borderBottomWidth"],
      borderColor: ["borderBottomColor", "borderLeftColor", "borderRightColor", "borderTopColor"],
      borderImage: ["borderImageOutset", "borderImageRepeat", "borderImageSlice", "borderImageSource", "borderImageWidth"],
      borderInlineEnd: ["borderInlineEndColor", "borderInlineEndStyle", "borderInlineEndWidth"],
      borderInlineStart: ["borderInlineStartColor", "borderInlineStartStyle", "borderInlineStartWidth"],
      borderLeft: ["borderLeftColor", "borderLeftStyle", "borderLeftWidth"],
      borderRadius: ["borderBottomLeftRadius", "borderBottomRightRadius", "borderTopLeftRadius", "borderTopRightRadius"],
      borderRight: ["borderRightColor", "borderRightStyle", "borderRightWidth"],
      borderStyle: ["borderBottomStyle", "borderLeftStyle", "borderRightStyle", "borderTopStyle"],
      borderTop: ["borderTopColor", "borderTopStyle", "borderTopWidth"],
      borderWidth: ["borderBottomWidth", "borderLeftWidth", "borderRightWidth", "borderTopWidth"],
      columnRule: ["columnRuleColor", "columnRuleStyle", "columnRuleWidth"],
      columns: ["columnCount", "columnWidth"],
      flex: ["flexBasis", "flexGrow", "flexShrink"],
      flexFlow: ["flexDirection", "flexWrap"],
      font: ["fontFamily", "fontFeatureSettings", "fontKerning", "fontLanguageOverride", "fontSize", "fontSizeAdjust", "fontStretch", "fontStyle", "fontVariant", "fontVariantAlternates", "fontVariantCaps", "fontVariantEastAsian", "fontVariantLigatures", "fontVariantNumeric", "fontVariantPosition", "fontWeight", "lineHeight"],
      fontVariant: ["fontVariantAlternates", "fontVariantCaps", "fontVariantEastAsian", "fontVariantLigatures", "fontVariantNumeric", "fontVariantPosition"],
      gap: ["columnGap", "rowGap"],
      grid: ["gridAutoColumns", "gridAutoFlow", "gridAutoRows", "gridTemplateAreas", "gridTemplateColumns", "gridTemplateRows"],
      gridArea: ["gridColumnEnd", "gridColumnStart", "gridRowEnd", "gridRowStart"],
      gridColumn: ["gridColumnEnd", "gridColumnStart"],
      gridColumnGap: ["columnGap"],
      gridGap: ["columnGap", "rowGap"],
      gridRow: ["gridRowEnd", "gridRowStart"],
      gridRowGap: ["rowGap"],
      gridTemplate: ["gridTemplateAreas", "gridTemplateColumns", "gridTemplateRows"],
      listStyle: ["listStyleImage", "listStylePosition", "listStyleType"],
      margin: ["marginBottom", "marginLeft", "marginRight", "marginTop"],
      marker: ["markerEnd", "markerMid", "markerStart"],
      mask: ["maskClip", "maskComposite", "maskImage", "maskMode", "maskOrigin", "maskPositionX", "maskPositionY", "maskRepeat", "maskSize"],
      maskPosition: ["maskPositionX", "maskPositionY"],
      outline: ["outlineColor", "outlineStyle", "outlineWidth"],
      overflow: ["overflowX", "overflowY"],
      padding: ["paddingBottom", "paddingLeft", "paddingRight", "paddingTop"],
      placeContent: ["alignContent", "justifyContent"],
      placeItems: ["alignItems", "justifyItems"],
      placeSelf: ["alignSelf", "justifySelf"],
      textDecoration: ["textDecorationColor", "textDecorationLine", "textDecorationStyle"],
      textEmphasis: ["textEmphasisColor", "textEmphasisStyle"],
      transition: ["transitionDelay", "transitionDuration", "transitionProperty", "transitionTimingFunction"],
      wordWrap: ["overflowWrap"]
    }, rs = {
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
      // SVG-related properties
      fillOpacity: !0,
      floodOpacity: !0,
      stopOpacity: !0,
      strokeDasharray: !0,
      strokeDashoffset: !0,
      strokeMiterlimit: !0,
      strokeOpacity: !0,
      strokeWidth: !0
    };
    function Sv(e, t) {
      return e + t.charAt(0).toUpperCase() + t.substring(1);
    }
    var Ev = ["Webkit", "ms", "Moz", "O"];
    Object.keys(rs).forEach(function(e) {
      Ev.forEach(function(t) {
        rs[Sv(t, e)] = rs[e];
      });
    });
    function yc(e, t, a) {
      var i = t == null || typeof t == "boolean" || t === "";
      return i ? "" : !a && typeof t == "number" && t !== 0 && !(rs.hasOwnProperty(e) && rs[e]) ? t + "px" : (zt(t, e), ("" + t).trim());
    }
    var Cv = /([A-Z])/g, Tv = /^ms-/;
    function cu(e) {
      return e.replace(Cv, "-$1").toLowerCase().replace(Tv, "-ms-");
    }
    var Rv = function() {
    };
    {
      var vy = /^(?:webkit|moz|o)[A-Z]/, hy = /^-ms-/, wv = /-(.)/g, vd = /;\s*$/, _i = {}, vo = {}, bv = !1, as = !1, my = function(e) {
        return e.replace(wv, function(t, a) {
          return a.toUpperCase();
        });
      }, _v = function(e) {
        _i.hasOwnProperty(e) && _i[e] || (_i[e] = !0, C(
          "Unsupported style property %s. Did you mean %s?",
          e,
          // As Andi Smith suggests
          // (http://www.andismith.com/blog/2012/02/modernizr-prefixed/), an `-ms` prefix
          // is converted to lowercase `ms`.
          my(e.replace(hy, "ms-"))
        ));
      }, hd = function(e) {
        _i.hasOwnProperty(e) && _i[e] || (_i[e] = !0, C("Unsupported vendor-prefixed style property %s. Did you mean %s?", e, e.charAt(0).toUpperCase() + e.slice(1)));
      }, md = function(e, t) {
        vo.hasOwnProperty(t) && vo[t] || (vo[t] = !0, C(`Style property values shouldn't contain a semicolon. Try "%s: %s" instead.`, e, t.replace(vd, "")));
      }, xv = function(e, t) {
        bv || (bv = !0, C("`NaN` is an invalid value for the `%s` css style property.", e));
      }, Dv = function(e, t) {
        as || (as = !0, C("`Infinity` is an invalid value for the `%s` css style property.", e));
      };
      Rv = function(e, t) {
        e.indexOf("-") > -1 ? _v(e) : vy.test(e) ? hd(e) : vd.test(t) && md(e, t), typeof t == "number" && (isNaN(t) ? xv(e, t) : isFinite(t) || Dv(e, t));
      };
    }
    var kv = Rv;
    function yy(e) {
      {
        var t = "", a = "";
        for (var i in e)
          if (e.hasOwnProperty(i)) {
            var o = e[i];
            if (o != null) {
              var s = i.indexOf("--") === 0;
              t += a + (s ? i : cu(i)) + ":", t += yc(i, o, s), a = ";";
            }
          }
        return t || null;
      }
    }
    function Ov(e, t) {
      var a = e.style;
      for (var i in t)
        if (t.hasOwnProperty(i)) {
          var o = i.indexOf("--") === 0;
          o || kv(i, t[i]);
          var s = yc(i, t[i], o);
          i === "float" && (i = "cssFloat"), o ? a.setProperty(i, s) : a[i] = s;
        }
    }
    function gy(e) {
      return e == null || typeof e == "boolean" || e === "";
    }
    function Mv(e) {
      var t = {};
      for (var a in e)
        for (var i = ns[a] || [a], o = 0; o < i.length; o++)
          t[i[o]] = a;
      return t;
    }
    function Sy(e, t) {
      {
        if (!t)
          return;
        var a = Mv(e), i = Mv(t), o = {};
        for (var s in a) {
          var f = a[s], h = i[s];
          if (h && f !== h) {
            var m = f + "," + h;
            if (o[m])
              continue;
            o[m] = !0, C("%s a style property during rerender (%s) when a conflicting property is set (%s) can lead to styling bugs. To avoid this, don't mix shorthand and non-shorthand properties for the same value; instead, replace the shorthand with separate values.", gy(e[f]) ? "Removing" : "Updating", f, h);
          }
        }
      }
    }
    var si = {
      area: !0,
      base: !0,
      br: !0,
      col: !0,
      embed: !0,
      hr: !0,
      img: !0,
      input: !0,
      keygen: !0,
      link: !0,
      meta: !0,
      param: !0,
      source: !0,
      track: !0,
      wbr: !0
      // NOTE: menuitem's close tag should be omitted, but that causes problems.
    }, is = Tt({
      menuitem: !0
    }, si), Lv = "__html";
    function gc(e, t) {
      if (t) {
        if (is[e] && (t.children != null || t.dangerouslySetInnerHTML != null))
          throw new Error(e + " is a void element tag and must neither have `children` nor use `dangerouslySetInnerHTML`.");
        if (t.dangerouslySetInnerHTML != null) {
          if (t.children != null)
            throw new Error("Can only set one of `children` or `props.dangerouslySetInnerHTML`.");
          if (typeof t.dangerouslySetInnerHTML != "object" || !(Lv in t.dangerouslySetInnerHTML))
            throw new Error("`props.dangerouslySetInnerHTML` must be in the form `{__html: ...}`. Please visit https://reactjs.org/link/dangerously-set-inner-html for more information.");
        }
        if (!t.suppressContentEditableWarning && t.contentEditable && t.children != null && C("A component is `contentEditable` and contains `children` managed by React. It is now your responsibility to guarantee that none of those nodes are unexpectedly modified or duplicated. This is probably not intentional."), t.style != null && typeof t.style != "object")
          throw new Error("The `style` prop expects a mapping from style properties to values, not a string. For example, style={{marginRight: spacing + 'em'}} when using JSX.");
      }
    }
    function Ol(e, t) {
      if (e.indexOf("-") === -1)
        return typeof t.is == "string";
      switch (e) {
        // These are reserved SVG and MathML elements.
        // We don't mind this list too much because we expect it to never grow.
        // The alternative is to track the namespace in a few places which is convoluted.
        // https://w3c.github.io/webcomponents/spec/custom/#custom-elements-core-concepts
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
    var ls = {
      // HTML
      accept: "accept",
      acceptcharset: "acceptCharset",
      "accept-charset": "acceptCharset",
      accesskey: "accessKey",
      action: "action",
      allowfullscreen: "allowFullScreen",
      alt: "alt",
      as: "as",
      async: "async",
      autocapitalize: "autoCapitalize",
      autocomplete: "autoComplete",
      autocorrect: "autoCorrect",
      autofocus: "autoFocus",
      autoplay: "autoPlay",
      autosave: "autoSave",
      capture: "capture",
      cellpadding: "cellPadding",
      cellspacing: "cellSpacing",
      challenge: "challenge",
      charset: "charSet",
      checked: "checked",
      children: "children",
      cite: "cite",
      class: "className",
      classid: "classID",
      classname: "className",
      cols: "cols",
      colspan: "colSpan",
      content: "content",
      contenteditable: "contentEditable",
      contextmenu: "contextMenu",
      controls: "controls",
      controlslist: "controlsList",
      coords: "coords",
      crossorigin: "crossOrigin",
      dangerouslysetinnerhtml: "dangerouslySetInnerHTML",
      data: "data",
      datetime: "dateTime",
      default: "default",
      defaultchecked: "defaultChecked",
      defaultvalue: "defaultValue",
      defer: "defer",
      dir: "dir",
      disabled: "disabled",
      disablepictureinpicture: "disablePictureInPicture",
      disableremoteplayback: "disableRemotePlayback",
      download: "download",
      draggable: "draggable",
      enctype: "encType",
      enterkeyhint: "enterKeyHint",
      for: "htmlFor",
      form: "form",
      formmethod: "formMethod",
      formaction: "formAction",
      formenctype: "formEncType",
      formnovalidate: "formNoValidate",
      formtarget: "formTarget",
      frameborder: "frameBorder",
      headers: "headers",
      height: "height",
      hidden: "hidden",
      high: "high",
      href: "href",
      hreflang: "hrefLang",
      htmlfor: "htmlFor",
      httpequiv: "httpEquiv",
      "http-equiv": "httpEquiv",
      icon: "icon",
      id: "id",
      imagesizes: "imageSizes",
      imagesrcset: "imageSrcSet",
      innerhtml: "innerHTML",
      inputmode: "inputMode",
      integrity: "integrity",
      is: "is",
      itemid: "itemID",
      itemprop: "itemProp",
      itemref: "itemRef",
      itemscope: "itemScope",
      itemtype: "itemType",
      keyparams: "keyParams",
      keytype: "keyType",
      kind: "kind",
      label: "label",
      lang: "lang",
      list: "list",
      loop: "loop",
      low: "low",
      manifest: "manifest",
      marginwidth: "marginWidth",
      marginheight: "marginHeight",
      max: "max",
      maxlength: "maxLength",
      media: "media",
      mediagroup: "mediaGroup",
      method: "method",
      min: "min",
      minlength: "minLength",
      multiple: "multiple",
      muted: "muted",
      name: "name",
      nomodule: "noModule",
      nonce: "nonce",
      novalidate: "noValidate",
      open: "open",
      optimum: "optimum",
      pattern: "pattern",
      placeholder: "placeholder",
      playsinline: "playsInline",
      poster: "poster",
      preload: "preload",
      profile: "profile",
      radiogroup: "radioGroup",
      readonly: "readOnly",
      referrerpolicy: "referrerPolicy",
      rel: "rel",
      required: "required",
      reversed: "reversed",
      role: "role",
      rows: "rows",
      rowspan: "rowSpan",
      sandbox: "sandbox",
      scope: "scope",
      scoped: "scoped",
      scrolling: "scrolling",
      seamless: "seamless",
      selected: "selected",
      shape: "shape",
      size: "size",
      sizes: "sizes",
      span: "span",
      spellcheck: "spellCheck",
      src: "src",
      srcdoc: "srcDoc",
      srclang: "srcLang",
      srcset: "srcSet",
      start: "start",
      step: "step",
      style: "style",
      summary: "summary",
      tabindex: "tabIndex",
      target: "target",
      title: "title",
      type: "type",
      usemap: "useMap",
      value: "value",
      width: "width",
      wmode: "wmode",
      wrap: "wrap",
      // SVG
      about: "about",
      accentheight: "accentHeight",
      "accent-height": "accentHeight",
      accumulate: "accumulate",
      additive: "additive",
      alignmentbaseline: "alignmentBaseline",
      "alignment-baseline": "alignmentBaseline",
      allowreorder: "allowReorder",
      alphabetic: "alphabetic",
      amplitude: "amplitude",
      arabicform: "arabicForm",
      "arabic-form": "arabicForm",
      ascent: "ascent",
      attributename: "attributeName",
      attributetype: "attributeType",
      autoreverse: "autoReverse",
      azimuth: "azimuth",
      basefrequency: "baseFrequency",
      baselineshift: "baselineShift",
      "baseline-shift": "baselineShift",
      baseprofile: "baseProfile",
      bbox: "bbox",
      begin: "begin",
      bias: "bias",
      by: "by",
      calcmode: "calcMode",
      capheight: "capHeight",
      "cap-height": "capHeight",
      clip: "clip",
      clippath: "clipPath",
      "clip-path": "clipPath",
      clippathunits: "clipPathUnits",
      cliprule: "clipRule",
      "clip-rule": "clipRule",
      color: "color",
      colorinterpolation: "colorInterpolation",
      "color-interpolation": "colorInterpolation",
      colorinterpolationfilters: "colorInterpolationFilters",
      "color-interpolation-filters": "colorInterpolationFilters",
      colorprofile: "colorProfile",
      "color-profile": "colorProfile",
      colorrendering: "colorRendering",
      "color-rendering": "colorRendering",
      contentscripttype: "contentScriptType",
      contentstyletype: "contentStyleType",
      cursor: "cursor",
      cx: "cx",
      cy: "cy",
      d: "d",
      datatype: "datatype",
      decelerate: "decelerate",
      descent: "descent",
      diffuseconstant: "diffuseConstant",
      direction: "direction",
      display: "display",
      divisor: "divisor",
      dominantbaseline: "dominantBaseline",
      "dominant-baseline": "dominantBaseline",
      dur: "dur",
      dx: "dx",
      dy: "dy",
      edgemode: "edgeMode",
      elevation: "elevation",
      enablebackground: "enableBackground",
      "enable-background": "enableBackground",
      end: "end",
      exponent: "exponent",
      externalresourcesrequired: "externalResourcesRequired",
      fill: "fill",
      fillopacity: "fillOpacity",
      "fill-opacity": "fillOpacity",
      fillrule: "fillRule",
      "fill-rule": "fillRule",
      filter: "filter",
      filterres: "filterRes",
      filterunits: "filterUnits",
      floodopacity: "floodOpacity",
      "flood-opacity": "floodOpacity",
      floodcolor: "floodColor",
      "flood-color": "floodColor",
      focusable: "focusable",
      fontfamily: "fontFamily",
      "font-family": "fontFamily",
      fontsize: "fontSize",
      "font-size": "fontSize",
      fontsizeadjust: "fontSizeAdjust",
      "font-size-adjust": "fontSizeAdjust",
      fontstretch: "fontStretch",
      "font-stretch": "fontStretch",
      fontstyle: "fontStyle",
      "font-style": "fontStyle",
      fontvariant: "fontVariant",
      "font-variant": "fontVariant",
      fontweight: "fontWeight",
      "font-weight": "fontWeight",
      format: "format",
      from: "from",
      fx: "fx",
      fy: "fy",
      g1: "g1",
      g2: "g2",
      glyphname: "glyphName",
      "glyph-name": "glyphName",
      glyphorientationhorizontal: "glyphOrientationHorizontal",
      "glyph-orientation-horizontal": "glyphOrientationHorizontal",
      glyphorientationvertical: "glyphOrientationVertical",
      "glyph-orientation-vertical": "glyphOrientationVertical",
      glyphref: "glyphRef",
      gradienttransform: "gradientTransform",
      gradientunits: "gradientUnits",
      hanging: "hanging",
      horizadvx: "horizAdvX",
      "horiz-adv-x": "horizAdvX",
      horizoriginx: "horizOriginX",
      "horiz-origin-x": "horizOriginX",
      ideographic: "ideographic",
      imagerendering: "imageRendering",
      "image-rendering": "imageRendering",
      in2: "in2",
      in: "in",
      inlist: "inlist",
      intercept: "intercept",
      k1: "k1",
      k2: "k2",
      k3: "k3",
      k4: "k4",
      k: "k",
      kernelmatrix: "kernelMatrix",
      kernelunitlength: "kernelUnitLength",
      kerning: "kerning",
      keypoints: "keyPoints",
      keysplines: "keySplines",
      keytimes: "keyTimes",
      lengthadjust: "lengthAdjust",
      letterspacing: "letterSpacing",
      "letter-spacing": "letterSpacing",
      lightingcolor: "lightingColor",
      "lighting-color": "lightingColor",
      limitingconeangle: "limitingConeAngle",
      local: "local",
      markerend: "markerEnd",
      "marker-end": "markerEnd",
      markerheight: "markerHeight",
      markermid: "markerMid",
      "marker-mid": "markerMid",
      markerstart: "markerStart",
      "marker-start": "markerStart",
      markerunits: "markerUnits",
      markerwidth: "markerWidth",
      mask: "mask",
      maskcontentunits: "maskContentUnits",
      maskunits: "maskUnits",
      mathematical: "mathematical",
      mode: "mode",
      numoctaves: "numOctaves",
      offset: "offset",
      opacity: "opacity",
      operator: "operator",
      order: "order",
      orient: "orient",
      orientation: "orientation",
      origin: "origin",
      overflow: "overflow",
      overlineposition: "overlinePosition",
      "overline-position": "overlinePosition",
      overlinethickness: "overlineThickness",
      "overline-thickness": "overlineThickness",
      paintorder: "paintOrder",
      "paint-order": "paintOrder",
      panose1: "panose1",
      "panose-1": "panose1",
      pathlength: "pathLength",
      patterncontentunits: "patternContentUnits",
      patterntransform: "patternTransform",
      patternunits: "patternUnits",
      pointerevents: "pointerEvents",
      "pointer-events": "pointerEvents",
      points: "points",
      pointsatx: "pointsAtX",
      pointsaty: "pointsAtY",
      pointsatz: "pointsAtZ",
      prefix: "prefix",
      preservealpha: "preserveAlpha",
      preserveaspectratio: "preserveAspectRatio",
      primitiveunits: "primitiveUnits",
      property: "property",
      r: "r",
      radius: "radius",
      refx: "refX",
      refy: "refY",
      renderingintent: "renderingIntent",
      "rendering-intent": "renderingIntent",
      repeatcount: "repeatCount",
      repeatdur: "repeatDur",
      requiredextensions: "requiredExtensions",
      requiredfeatures: "requiredFeatures",
      resource: "resource",
      restart: "restart",
      result: "result",
      results: "results",
      rotate: "rotate",
      rx: "rx",
      ry: "ry",
      scale: "scale",
      security: "security",
      seed: "seed",
      shaperendering: "shapeRendering",
      "shape-rendering": "shapeRendering",
      slope: "slope",
      spacing: "spacing",
      specularconstant: "specularConstant",
      specularexponent: "specularExponent",
      speed: "speed",
      spreadmethod: "spreadMethod",
      startoffset: "startOffset",
      stddeviation: "stdDeviation",
      stemh: "stemh",
      stemv: "stemv",
      stitchtiles: "stitchTiles",
      stopcolor: "stopColor",
      "stop-color": "stopColor",
      stopopacity: "stopOpacity",
      "stop-opacity": "stopOpacity",
      strikethroughposition: "strikethroughPosition",
      "strikethrough-position": "strikethroughPosition",
      strikethroughthickness: "strikethroughThickness",
      "strikethrough-thickness": "strikethroughThickness",
      string: "string",
      stroke: "stroke",
      strokedasharray: "strokeDasharray",
      "stroke-dasharray": "strokeDasharray",
      strokedashoffset: "strokeDashoffset",
      "stroke-dashoffset": "strokeDashoffset",
      strokelinecap: "strokeLinecap",
      "stroke-linecap": "strokeLinecap",
      strokelinejoin: "strokeLinejoin",
      "stroke-linejoin": "strokeLinejoin",
      strokemiterlimit: "strokeMiterlimit",
      "stroke-miterlimit": "strokeMiterlimit",
      strokewidth: "strokeWidth",
      "stroke-width": "strokeWidth",
      strokeopacity: "strokeOpacity",
      "stroke-opacity": "strokeOpacity",
      suppresscontenteditablewarning: "suppressContentEditableWarning",
      suppresshydrationwarning: "suppressHydrationWarning",
      surfacescale: "surfaceScale",
      systemlanguage: "systemLanguage",
      tablevalues: "tableValues",
      targetx: "targetX",
      targety: "targetY",
      textanchor: "textAnchor",
      "text-anchor": "textAnchor",
      textdecoration: "textDecoration",
      "text-decoration": "textDecoration",
      textlength: "textLength",
      textrendering: "textRendering",
      "text-rendering": "textRendering",
      to: "to",
      transform: "transform",
      typeof: "typeof",
      u1: "u1",
      u2: "u2",
      underlineposition: "underlinePosition",
      "underline-position": "underlinePosition",
      underlinethickness: "underlineThickness",
      "underline-thickness": "underlineThickness",
      unicode: "unicode",
      unicodebidi: "unicodeBidi",
      "unicode-bidi": "unicodeBidi",
      unicoderange: "unicodeRange",
      "unicode-range": "unicodeRange",
      unitsperem: "unitsPerEm",
      "units-per-em": "unitsPerEm",
      unselectable: "unselectable",
      valphabetic: "vAlphabetic",
      "v-alphabetic": "vAlphabetic",
      values: "values",
      vectoreffect: "vectorEffect",
      "vector-effect": "vectorEffect",
      version: "version",
      vertadvy: "vertAdvY",
      "vert-adv-y": "vertAdvY",
      vertoriginx: "vertOriginX",
      "vert-origin-x": "vertOriginX",
      vertoriginy: "vertOriginY",
      "vert-origin-y": "vertOriginY",
      vhanging: "vHanging",
      "v-hanging": "vHanging",
      videographic: "vIdeographic",
      "v-ideographic": "vIdeographic",
      viewbox: "viewBox",
      viewtarget: "viewTarget",
      visibility: "visibility",
      vmathematical: "vMathematical",
      "v-mathematical": "vMathematical",
      vocab: "vocab",
      widths: "widths",
      wordspacing: "wordSpacing",
      "word-spacing": "wordSpacing",
      writingmode: "writingMode",
      "writing-mode": "writingMode",
      x1: "x1",
      x2: "x2",
      x: "x",
      xchannelselector: "xChannelSelector",
      xheight: "xHeight",
      "x-height": "xHeight",
      xlinkactuate: "xlinkActuate",
      "xlink:actuate": "xlinkActuate",
      xlinkarcrole: "xlinkArcrole",
      "xlink:arcrole": "xlinkArcrole",
      xlinkhref: "xlinkHref",
      "xlink:href": "xlinkHref",
      xlinkrole: "xlinkRole",
      "xlink:role": "xlinkRole",
      xlinkshow: "xlinkShow",
      "xlink:show": "xlinkShow",
      xlinktitle: "xlinkTitle",
      "xlink:title": "xlinkTitle",
      xlinktype: "xlinkType",
      "xlink:type": "xlinkType",
      xmlbase: "xmlBase",
      "xml:base": "xmlBase",
      xmllang: "xmlLang",
      "xml:lang": "xmlLang",
      xmlns: "xmlns",
      "xml:space": "xmlSpace",
      xmlnsxlink: "xmlnsXlink",
      "xmlns:xlink": "xmlnsXlink",
      xmlspace: "xmlSpace",
      y1: "y1",
      y2: "y2",
      y: "y",
      ychannelselector: "yChannelSelector",
      z: "z",
      zoomandpan: "zoomAndPan"
    }, Sc = {
      "aria-current": 0,
      // state
      "aria-description": 0,
      "aria-details": 0,
      "aria-disabled": 0,
      // state
      "aria-hidden": 0,
      // state
      "aria-invalid": 0,
      // state
      "aria-keyshortcuts": 0,
      "aria-label": 0,
      "aria-roledescription": 0,
      // Widget Attributes
      "aria-autocomplete": 0,
      "aria-checked": 0,
      "aria-expanded": 0,
      "aria-haspopup": 0,
      "aria-level": 0,
      "aria-modal": 0,
      "aria-multiline": 0,
      "aria-multiselectable": 0,
      "aria-orientation": 0,
      "aria-placeholder": 0,
      "aria-pressed": 0,
      "aria-readonly": 0,
      "aria-required": 0,
      "aria-selected": 0,
      "aria-sort": 0,
      "aria-valuemax": 0,
      "aria-valuemin": 0,
      "aria-valuenow": 0,
      "aria-valuetext": 0,
      // Live Region Attributes
      "aria-atomic": 0,
      "aria-busy": 0,
      "aria-live": 0,
      "aria-relevant": 0,
      // Drag-and-Drop Attributes
      "aria-dropeffect": 0,
      "aria-grabbed": 0,
      // Relationship Attributes
      "aria-activedescendant": 0,
      "aria-colcount": 0,
      "aria-colindex": 0,
      "aria-colspan": 0,
      "aria-controls": 0,
      "aria-describedby": 0,
      "aria-errormessage": 0,
      "aria-flowto": 0,
      "aria-labelledby": 0,
      "aria-owns": 0,
      "aria-posinset": 0,
      "aria-rowcount": 0,
      "aria-rowindex": 0,
      "aria-rowspan": 0,
      "aria-setsize": 0
    }, fu = {}, Ey = new RegExp("^(aria)-[" + ne + "]*$"), du = new RegExp("^(aria)[A-Z][" + ne + "]*$");
    function yd(e, t) {
      {
        if (Qn.call(fu, t) && fu[t])
          return !0;
        if (du.test(t)) {
          var a = "aria-" + t.slice(4).toLowerCase(), i = Sc.hasOwnProperty(a) ? a : null;
          if (i == null)
            return C("Invalid ARIA attribute `%s`. ARIA attributes follow the pattern aria-* and must be lowercase.", t), fu[t] = !0, !0;
          if (t !== i)
            return C("Invalid ARIA attribute `%s`. Did you mean `%s`?", t, i), fu[t] = !0, !0;
        }
        if (Ey.test(t)) {
          var o = t.toLowerCase(), s = Sc.hasOwnProperty(o) ? o : null;
          if (s == null)
            return fu[t] = !0, !1;
          if (t !== s)
            return C("Unknown ARIA attribute `%s`. Did you mean `%s`?", t, s), fu[t] = !0, !0;
        }
      }
      return !0;
    }
    function os(e, t) {
      {
        var a = [];
        for (var i in t) {
          var o = yd(e, i);
          o || a.push(i);
        }
        var s = a.map(function(f) {
          return "`" + f + "`";
        }).join(", ");
        a.length === 1 ? C("Invalid aria prop %s on <%s> tag. For details, see https://reactjs.org/link/invalid-aria-props", s, e) : a.length > 1 && C("Invalid aria props %s on <%s> tag. For details, see https://reactjs.org/link/invalid-aria-props", s, e);
      }
    }
    function gd(e, t) {
      Ol(e, t) || os(e, t);
    }
    var Sd = !1;
    function Ec(e, t) {
      {
        if (e !== "input" && e !== "textarea" && e !== "select")
          return;
        t != null && t.value === null && !Sd && (Sd = !0, e === "select" && t.multiple ? C("`value` prop on `%s` should not be null. Consider using an empty array when `multiple` is set to `true` to clear the component or `undefined` for uncontrolled components.", e) : C("`value` prop on `%s` should not be null. Consider using an empty string to clear the component or `undefined` for uncontrolled components.", e));
      }
    }
    var ho = function() {
    };
    {
      var Tr = {}, Ed = /^on./, Cc = /^on[^A-Z]/, Nv = new RegExp("^(aria)-[" + ne + "]*$"), Av = new RegExp("^(aria)[A-Z][" + ne + "]*$");
      ho = function(e, t, a, i) {
        if (Qn.call(Tr, t) && Tr[t])
          return !0;
        var o = t.toLowerCase();
        if (o === "onfocusin" || o === "onfocusout")
          return C("React uses onFocus and onBlur instead of onFocusIn and onFocusOut. All React events are normalized to bubble, so onFocusIn and onFocusOut are not needed/supported by React."), Tr[t] = !0, !0;
        if (i != null) {
          var s = i.registrationNameDependencies, f = i.possibleRegistrationNames;
          if (s.hasOwnProperty(t))
            return !0;
          var h = f.hasOwnProperty(o) ? f[o] : null;
          if (h != null)
            return C("Invalid event handler property `%s`. Did you mean `%s`?", t, h), Tr[t] = !0, !0;
          if (Ed.test(t))
            return C("Unknown event handler property `%s`. It will be ignored.", t), Tr[t] = !0, !0;
        } else if (Ed.test(t))
          return Cc.test(t) && C("Invalid event handler property `%s`. React events use the camelCase naming convention, for example `onClick`.", t), Tr[t] = !0, !0;
        if (Nv.test(t) || Av.test(t))
          return !0;
        if (o === "innerhtml")
          return C("Directly setting property `innerHTML` is not permitted. For more information, lookup documentation on `dangerouslySetInnerHTML`."), Tr[t] = !0, !0;
        if (o === "aria")
          return C("The `aria` attribute is reserved for future use in React. Pass individual `aria-` attributes instead."), Tr[t] = !0, !0;
        if (o === "is" && a !== null && a !== void 0 && typeof a != "string")
          return C("Received a `%s` for a string attribute `is`. If this is expected, cast the value to a string.", typeof a), Tr[t] = !0, !0;
        if (typeof a == "number" && isNaN(a))
          return C("Received NaN for the `%s` attribute. If this is expected, cast the value to a string.", t), Tr[t] = !0, !0;
        var m = hn(t), E = m !== null && m.type === Nt;
        if (ls.hasOwnProperty(o)) {
          var T = ls[o];
          if (T !== t)
            return C("Invalid DOM property `%s`. Did you mean `%s`?", t, T), Tr[t] = !0, !0;
        } else if (!E && t !== o)
          return C("React does not recognize the `%s` prop on a DOM element. If you intentionally want it to appear in the DOM as a custom attribute, spell it as lowercase `%s` instead. If you accidentally passed it from a parent component, remove it from the DOM element.", t, o), Tr[t] = !0, !0;
        return typeof a == "boolean" && pn(t, a, m, !1) ? (a ? C('Received `%s` for a non-boolean attribute `%s`.\n\nIf you want to write it to the DOM, pass a string instead: %s="%s" or %s={value.toString()}.', a, t, t, a, t) : C('Received `%s` for a non-boolean attribute `%s`.\n\nIf you want to write it to the DOM, pass a string instead: %s="%s" or %s={value.toString()}.\n\nIf you used to conditionally omit it with %s={condition && value}, pass %s={condition ? value : undefined} instead.', a, t, t, a, t, t, t), Tr[t] = !0, !0) : E ? !0 : pn(t, a, m, !1) ? (Tr[t] = !0, !1) : ((a === "false" || a === "true") && m !== null && m.type === it && (C("Received the string `%s` for the boolean attribute `%s`. %s Did you mean %s={%s}?", a, t, a === "false" ? "The browser will interpret it as a truthy value." : 'Although this works, it will not work as expected if you pass the string "false".', t, a), Tr[t] = !0), !0);
      };
    }
    var zv = function(e, t, a) {
      {
        var i = [];
        for (var o in t) {
          var s = ho(e, o, t[o], a);
          s || i.push(o);
        }
        var f = i.map(function(h) {
          return "`" + h + "`";
        }).join(", ");
        i.length === 1 ? C("Invalid value for prop %s on <%s> tag. Either remove it from the element, or pass a string or number value to keep it in the DOM. For details, see https://reactjs.org/link/attribute-behavior ", f, e) : i.length > 1 && C("Invalid values for props %s on <%s> tag. Either remove them from the element, or pass a string or number value to keep them in the DOM. For details, see https://reactjs.org/link/attribute-behavior ", f, e);
      }
    };
    function Uv(e, t, a) {
      Ol(e, t) || zv(e, t, a);
    }
    var Cd = 1, Tc = 2, Ua = 4, Td = Cd | Tc | Ua, mo = null;
    function Cy(e) {
      mo !== null && C("Expected currently replaying event to be null. This error is likely caused by a bug in React. Please file an issue."), mo = e;
    }
    function Ty() {
      mo === null && C("Expected currently replaying event to not be null. This error is likely caused by a bug in React. Please file an issue."), mo = null;
    }
    function us(e) {
      return e === mo;
    }
    function Rd(e) {
      var t = e.target || e.srcElement || window;
      return t.correspondingUseElement && (t = t.correspondingUseElement), t.nodeType === Ji ? t.parentNode : t;
    }
    var Rc = null, yo = null, cn = null;
    function wc(e) {
      var t = Nu(e);
      if (t) {
        if (typeof Rc != "function")
          throw new Error("setRestoreImplementation() needs to be called to handle a target for controlled events. This error is likely caused by a bug in React. Please file an issue.");
        var a = t.stateNode;
        if (a) {
          var i = Yh(a);
          Rc(t.stateNode, t.type, i);
        }
      }
    }
    function bc(e) {
      Rc = e;
    }
    function pu(e) {
      yo ? cn ? cn.push(e) : cn = [e] : yo = e;
    }
    function jv() {
      return yo !== null || cn !== null;
    }
    function _c() {
      if (yo) {
        var e = yo, t = cn;
        if (yo = null, cn = null, wc(e), t)
          for (var a = 0; a < t.length; a++)
            wc(t[a]);
      }
    }
    var vu = function(e, t) {
      return e(t);
    }, ss = function() {
    }, Ml = !1;
    function Fv() {
      var e = jv();
      e && (ss(), _c());
    }
    function Hv(e, t, a) {
      if (Ml)
        return e(t, a);
      Ml = !0;
      try {
        return vu(e, t, a);
      } finally {
        Ml = !1, Fv();
      }
    }
    function Ry(e, t, a) {
      vu = e, ss = a;
    }
    function Pv(e) {
      return e === "button" || e === "input" || e === "select" || e === "textarea";
    }
    function xc(e, t, a) {
      switch (e) {
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
          return !!(a.disabled && Pv(t));
        default:
          return !1;
      }
    }
    function Ll(e, t) {
      var a = e.stateNode;
      if (a === null)
        return null;
      var i = Yh(a);
      if (i === null)
        return null;
      var o = i[t];
      if (xc(t, e.type, i))
        return null;
      if (o && typeof o != "function")
        throw new Error("Expected `" + t + "` listener to be a function, instead got a value of `" + typeof o + "` type.");
      return o;
    }
    var cs = !1;
    if (jn)
      try {
        var go = {};
        Object.defineProperty(go, "passive", {
          get: function() {
            cs = !0;
          }
        }), window.addEventListener("test", go, go), window.removeEventListener("test", go, go);
      } catch {
        cs = !1;
      }
    function Dc(e, t, a, i, o, s, f, h, m) {
      var E = Array.prototype.slice.call(arguments, 3);
      try {
        t.apply(a, E);
      } catch (T) {
        this.onError(T);
      }
    }
    var kc = Dc;
    if (typeof window < "u" && typeof window.dispatchEvent == "function" && typeof document < "u" && typeof document.createEvent == "function") {
      var wd = document.createElement("react");
      kc = function(t, a, i, o, s, f, h, m, E) {
        if (typeof document > "u" || document === null)
          throw new Error("The `document` global was defined when React was initialized, but is not defined anymore. This can happen in a test environment if a component schedules an update from an asynchronous callback, but the test has already finished running. To solve this, you can either unmount the component at the end of your test (and ensure that any asynchronous operations get canceled in `componentWillUnmount`), or you can change the test itself to be asynchronous.");
        var T = document.createEvent("Event"), O = !1, D = !0, j = window.event, P = Object.getOwnPropertyDescriptor(window, "event");
        function B() {
          wd.removeEventListener($, $e, !1), typeof window.event < "u" && window.hasOwnProperty("event") && (window.event = j);
        }
        var he = Array.prototype.slice.call(arguments, 3);
        function $e() {
          O = !0, B(), a.apply(i, he), D = !1;
        }
        var Ne, It = !1, Ut = !1;
        function A(z) {
          if (Ne = z.error, It = !0, Ne === null && z.colno === 0 && z.lineno === 0 && (Ut = !0), z.defaultPrevented && Ne != null && typeof Ne == "object")
            try {
              Ne._suppressLogging = !0;
            } catch {
            }
        }
        var $ = "react-" + (t || "invokeguardedcallback");
        if (window.addEventListener("error", A), wd.addEventListener($, $e, !1), T.initEvent($, !1, !1), wd.dispatchEvent(T), P && Object.defineProperty(window, "event", P), O && D && (It ? Ut && (Ne = new Error("A cross-origin error was thrown. React doesn't have access to the actual error object in development. See https://reactjs.org/link/crossorigin-error for more information.")) : Ne = new Error(`An error was thrown inside one of your components, but React doesn't know what it was. This is likely due to browser flakiness. React does its best to preserve the "Pause on exceptions" behavior of the DevTools, which requires some DEV-mode only tricks. It's possible that these don't work in your browser. Try triggering the error in production mode, or switching to a modern browser. If you suspect that this is actually an issue with React, please file an issue.`), this.onError(Ne)), window.removeEventListener("error", A), !O)
          return B(), Dc.apply(this, arguments);
      };
    }
    var Vv = kc, hu = !1, Oc = null, mu = !1, xi = null, Bv = {
      onError: function(e) {
        hu = !0, Oc = e;
      }
    };
    function Nl(e, t, a, i, o, s, f, h, m) {
      hu = !1, Oc = null, Vv.apply(Bv, arguments);
    }
    function Di(e, t, a, i, o, s, f, h, m) {
      if (Nl.apply(this, arguments), hu) {
        var E = ds();
        mu || (mu = !0, xi = E);
      }
    }
    function fs() {
      if (mu) {
        var e = xi;
        throw mu = !1, xi = null, e;
      }
    }
    function tl() {
      return hu;
    }
    function ds() {
      if (hu) {
        var e = Oc;
        return hu = !1, Oc = null, e;
      } else
        throw new Error("clearCaughtError was called but no error was captured. This error is likely caused by a bug in React. Please file an issue.");
    }
    function yu(e) {
      return e._reactInternals;
    }
    function wy(e) {
      return e._reactInternals !== void 0;
    }
    function So(e, t) {
      e._reactInternals = t;
    }
    var He = (
      /*                      */
      0
    ), ci = (
      /*                */
      1
    ), Ln = (
      /*                    */
      2
    ), Vt = (
      /*                       */
      4
    ), ja = (
      /*                */
      16
    ), Fa = (
      /*                 */
      32
    ), bn = (
      /*                     */
      64
    ), ze = (
      /*                   */
      128
    ), zr = (
      /*            */
      256
    ), Hn = (
      /*                          */
      512
    ), ur = (
      /*                     */
      1024
    ), la = (
      /*                      */
      2048
    ), oa = (
      /*                    */
      4096
    ), Zn = (
      /*                   */
      8192
    ), gu = (
      /*             */
      16384
    ), $v = (
      /*               */
      32767
    ), ps = (
      /*                   */
      32768
    ), dr = (
      /*                */
      65536
    ), Mc = (
      /* */
      131072
    ), ki = (
      /*                       */
      1048576
    ), Su = (
      /*                    */
      2097152
    ), nl = (
      /*                 */
      4194304
    ), Lc = (
      /*                */
      8388608
    ), Al = (
      /*               */
      16777216
    ), Oi = (
      /*              */
      33554432
    ), zl = (
      // TODO: Remove Update flag from before mutation phase by re-landing Visibility
      // flag logic (see #20043)
      Vt | ur | 0
    ), Ul = Ln | Vt | ja | Fa | Hn | oa | Zn, jl = Vt | bn | Hn | Zn, rl = la | ja, Jn = nl | Lc | Su, Ha = v.ReactCurrentOwner;
    function Ta(e) {
      var t = e, a = e;
      if (e.alternate)
        for (; t.return; )
          t = t.return;
      else {
        var i = t;
        do
          t = i, (t.flags & (Ln | oa)) !== He && (a = t.return), i = t.return;
        while (i);
      }
      return t.tag === J ? a : null;
    }
    function Mi(e) {
      if (e.tag === _e) {
        var t = e.memoizedState;
        if (t === null) {
          var a = e.alternate;
          a !== null && (t = a.memoizedState);
        }
        if (t !== null)
          return t.dehydrated;
      }
      return null;
    }
    function Li(e) {
      return e.tag === J ? e.stateNode.containerInfo : null;
    }
    function Eo(e) {
      return Ta(e) === e;
    }
    function Iv(e) {
      {
        var t = Ha.current;
        if (t !== null && t.tag === W) {
          var a = t, i = a.stateNode;
          i._warnedAboutRefsInRender || C("%s is accessing isMounted inside its render() function. render() should be a pure function of props and state. It should never access something that requires stale data from the previous render, such as refs. Move this logic to componentDidMount and componentDidUpdate instead.", ot(a) || "A component"), i._warnedAboutRefsInRender = !0;
        }
      }
      var o = yu(e);
      return o ? Ta(o) === o : !1;
    }
    function Nc(e) {
      if (Ta(e) !== e)
        throw new Error("Unable to find node on an unmounted component.");
    }
    function Ac(e) {
      var t = e.alternate;
      if (!t) {
        var a = Ta(e);
        if (a === null)
          throw new Error("Unable to find node on an unmounted component.");
        return a !== e ? null : e;
      }
      for (var i = e, o = t; ; ) {
        var s = i.return;
        if (s === null)
          break;
        var f = s.alternate;
        if (f === null) {
          var h = s.return;
          if (h !== null) {
            i = o = h;
            continue;
          }
          break;
        }
        if (s.child === f.child) {
          for (var m = s.child; m; ) {
            if (m === i)
              return Nc(s), e;
            if (m === o)
              return Nc(s), t;
            m = m.sibling;
          }
          throw new Error("Unable to find node on an unmounted component.");
        }
        if (i.return !== o.return)
          i = s, o = f;
        else {
          for (var E = !1, T = s.child; T; ) {
            if (T === i) {
              E = !0, i = s, o = f;
              break;
            }
            if (T === o) {
              E = !0, o = s, i = f;
              break;
            }
            T = T.sibling;
          }
          if (!E) {
            for (T = f.child; T; ) {
              if (T === i) {
                E = !0, i = f, o = s;
                break;
              }
              if (T === o) {
                E = !0, o = f, i = s;
                break;
              }
              T = T.sibling;
            }
            if (!E)
              throw new Error("Child was not found in either parent set. This indicates a bug in React related to the return pointer. Please file an issue.");
          }
        }
        if (i.alternate !== o)
          throw new Error("Return fibers should always be each others' alternates. This error is likely caused by a bug in React. Please file an issue.");
      }
      if (i.tag !== J)
        throw new Error("Unable to find node on an unmounted component.");
      return i.stateNode.current === i ? e : t;
    }
    function ua(e) {
      var t = Ac(e);
      return t !== null ? sa(t) : null;
    }
    function sa(e) {
      if (e.tag === oe || e.tag === Ue)
        return e;
      for (var t = e.child; t !== null; ) {
        var a = sa(t);
        if (a !== null)
          return a;
        t = t.sibling;
      }
      return null;
    }
    function kn(e) {
      var t = Ac(e);
      return t !== null ? Pa(t) : null;
    }
    function Pa(e) {
      if (e.tag === oe || e.tag === Ue)
        return e;
      for (var t = e.child; t !== null; ) {
        if (t.tag !== se) {
          var a = Pa(t);
          if (a !== null)
            return a;
        }
        t = t.sibling;
      }
      return null;
    }
    var bd = d.unstable_scheduleCallback, Yv = d.unstable_cancelCallback, _d = d.unstable_shouldYield, xd = d.unstable_requestPaint, sr = d.unstable_now, zc = d.unstable_getCurrentPriorityLevel, vs = d.unstable_ImmediatePriority, Fl = d.unstable_UserBlockingPriority, al = d.unstable_NormalPriority, by = d.unstable_LowPriority, Co = d.unstable_IdlePriority, Uc = d.unstable_yieldValue, Wv = d.unstable_setDisableYieldValue, To = null, Vn = null, ve = null, Ra = !1, ca = typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u";
    function Eu(e) {
      if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u")
        return !1;
      var t = __REACT_DEVTOOLS_GLOBAL_HOOK__;
      if (t.isDisabled)
        return !0;
      if (!t.supportsFiber)
        return C("The installed version of React DevTools is too old and will not work with the current version of React. Please update React DevTools. https://reactjs.org/link/react-devtools"), !0;
      try {
        Ie && (e = Tt({}, e, {
          getLaneLabelMap: Ro,
          injectProfilingHooks: Va
        })), To = t.inject(e), Vn = t;
      } catch (a) {
        C("React instrumentation encountered an error: %s.", a);
      }
      return !!t.checkDCE;
    }
    function Dd(e, t) {
      if (Vn && typeof Vn.onScheduleFiberRoot == "function")
        try {
          Vn.onScheduleFiberRoot(To, e, t);
        } catch (a) {
          Ra || (Ra = !0, C("React instrumentation encountered an error: %s", a));
        }
    }
    function kd(e, t) {
      if (Vn && typeof Vn.onCommitFiberRoot == "function")
        try {
          var a = (e.current.flags & ze) === ze;
          if (Fe) {
            var i;
            switch (t) {
              case Ir:
                i = vs;
                break;
              case Ai:
                i = Fl;
                break;
              case Ba:
                i = al;
                break;
              case $a:
                i = Co;
                break;
              default:
                i = al;
                break;
            }
            Vn.onCommitFiberRoot(To, e, i, a);
          }
        } catch (o) {
          Ra || (Ra = !0, C("React instrumentation encountered an error: %s", o));
        }
    }
    function Od(e) {
      if (Vn && typeof Vn.onPostCommitFiberRoot == "function")
        try {
          Vn.onPostCommitFiberRoot(To, e);
        } catch (t) {
          Ra || (Ra = !0, C("React instrumentation encountered an error: %s", t));
        }
    }
    function Md(e) {
      if (Vn && typeof Vn.onCommitFiberUnmount == "function")
        try {
          Vn.onCommitFiberUnmount(To, e);
        } catch (t) {
          Ra || (Ra = !0, C("React instrumentation encountered an error: %s", t));
        }
    }
    function Nn(e) {
      if (typeof Uc == "function" && (Wv(e), M(e)), Vn && typeof Vn.setStrictMode == "function")
        try {
          Vn.setStrictMode(To, e);
        } catch (t) {
          Ra || (Ra = !0, C("React instrumentation encountered an error: %s", t));
        }
    }
    function Va(e) {
      ve = e;
    }
    function Ro() {
      {
        for (var e = /* @__PURE__ */ new Map(), t = 1, a = 0; a < _o; a++) {
          var i = Kv(t);
          e.set(t, i), t *= 2;
        }
        return e;
      }
    }
    function Ld(e) {
      ve !== null && typeof ve.markCommitStarted == "function" && ve.markCommitStarted(e);
    }
    function Nd() {
      ve !== null && typeof ve.markCommitStopped == "function" && ve.markCommitStopped();
    }
    function wa(e) {
      ve !== null && typeof ve.markComponentRenderStarted == "function" && ve.markComponentRenderStarted(e);
    }
    function ba() {
      ve !== null && typeof ve.markComponentRenderStopped == "function" && ve.markComponentRenderStopped();
    }
    function Ad(e) {
      ve !== null && typeof ve.markComponentPassiveEffectMountStarted == "function" && ve.markComponentPassiveEffectMountStarted(e);
    }
    function Gv() {
      ve !== null && typeof ve.markComponentPassiveEffectMountStopped == "function" && ve.markComponentPassiveEffectMountStopped();
    }
    function il(e) {
      ve !== null && typeof ve.markComponentPassiveEffectUnmountStarted == "function" && ve.markComponentPassiveEffectUnmountStarted(e);
    }
    function Hl() {
      ve !== null && typeof ve.markComponentPassiveEffectUnmountStopped == "function" && ve.markComponentPassiveEffectUnmountStopped();
    }
    function jc(e) {
      ve !== null && typeof ve.markComponentLayoutEffectMountStarted == "function" && ve.markComponentLayoutEffectMountStarted(e);
    }
    function Qv() {
      ve !== null && typeof ve.markComponentLayoutEffectMountStopped == "function" && ve.markComponentLayoutEffectMountStopped();
    }
    function hs(e) {
      ve !== null && typeof ve.markComponentLayoutEffectUnmountStarted == "function" && ve.markComponentLayoutEffectUnmountStarted(e);
    }
    function zd() {
      ve !== null && typeof ve.markComponentLayoutEffectUnmountStopped == "function" && ve.markComponentLayoutEffectUnmountStopped();
    }
    function ms(e, t, a) {
      ve !== null && typeof ve.markComponentErrored == "function" && ve.markComponentErrored(e, t, a);
    }
    function Ni(e, t, a) {
      ve !== null && typeof ve.markComponentSuspended == "function" && ve.markComponentSuspended(e, t, a);
    }
    function ys(e) {
      ve !== null && typeof ve.markLayoutEffectsStarted == "function" && ve.markLayoutEffectsStarted(e);
    }
    function gs() {
      ve !== null && typeof ve.markLayoutEffectsStopped == "function" && ve.markLayoutEffectsStopped();
    }
    function wo(e) {
      ve !== null && typeof ve.markPassiveEffectsStarted == "function" && ve.markPassiveEffectsStarted(e);
    }
    function Ud() {
      ve !== null && typeof ve.markPassiveEffectsStopped == "function" && ve.markPassiveEffectsStopped();
    }
    function bo(e) {
      ve !== null && typeof ve.markRenderStarted == "function" && ve.markRenderStarted(e);
    }
    function Xv() {
      ve !== null && typeof ve.markRenderYielded == "function" && ve.markRenderYielded();
    }
    function Fc() {
      ve !== null && typeof ve.markRenderStopped == "function" && ve.markRenderStopped();
    }
    function An(e) {
      ve !== null && typeof ve.markRenderScheduled == "function" && ve.markRenderScheduled(e);
    }
    function Hc(e, t) {
      ve !== null && typeof ve.markForceUpdateScheduled == "function" && ve.markForceUpdateScheduled(e, t);
    }
    function Ss(e, t) {
      ve !== null && typeof ve.markStateUpdateScheduled == "function" && ve.markStateUpdateScheduled(e, t);
    }
    var Pe = (
      /*                         */
      0
    ), kt = (
      /*                 */
      1
    ), nn = (
      /*                    */
      2
    ), Sn = (
      /*               */
      8
    ), rn = (
      /*              */
      16
    ), er = Math.clz32 ? Math.clz32 : Es, pr = Math.log, Pc = Math.LN2;
    function Es(e) {
      var t = e >>> 0;
      return t === 0 ? 32 : 31 - (pr(t) / Pc | 0) | 0;
    }
    var _o = 31, K = (
      /*                        */
      0
    ), Kt = (
      /*                          */
      0
    ), qe = (
      /*                        */
      1
    ), Pl = (
      /*    */
      2
    ), fi = (
      /*             */
      4
    ), Ur = (
      /*            */
      8
    ), Bn = (
      /*                     */
      16
    ), ll = (
      /*                */
      32
    ), Vl = (
      /*                       */
      4194240
    ), xo = (
      /*                        */
      64
    ), Vc = (
      /*                        */
      128
    ), Bc = (
      /*                        */
      256
    ), $c = (
      /*                        */
      512
    ), Ic = (
      /*                        */
      1024
    ), Yc = (
      /*                        */
      2048
    ), Wc = (
      /*                        */
      4096
    ), Gc = (
      /*                        */
      8192
    ), Qc = (
      /*                        */
      16384
    ), Do = (
      /*                       */
      32768
    ), Xc = (
      /*                       */
      65536
    ), Cu = (
      /*                       */
      131072
    ), Tu = (
      /*                       */
      262144
    ), Kc = (
      /*                       */
      524288
    ), Cs = (
      /*                       */
      1048576
    ), qc = (
      /*                       */
      2097152
    ), Ts = (
      /*                            */
      130023424
    ), ko = (
      /*                             */
      4194304
    ), Zc = (
      /*                             */
      8388608
    ), Rs = (
      /*                             */
      16777216
    ), Jc = (
      /*                             */
      33554432
    ), ef = (
      /*                             */
      67108864
    ), jd = ko, ws = (
      /*          */
      134217728
    ), Fd = (
      /*                          */
      268435455
    ), bs = (
      /*               */
      268435456
    ), Oo = (
      /*                        */
      536870912
    ), fa = (
      /*                   */
      1073741824
    );
    function Kv(e) {
      {
        if (e & qe)
          return "Sync";
        if (e & Pl)
          return "InputContinuousHydration";
        if (e & fi)
          return "InputContinuous";
        if (e & Ur)
          return "DefaultHydration";
        if (e & Bn)
          return "Default";
        if (e & ll)
          return "TransitionHydration";
        if (e & Vl)
          return "Transition";
        if (e & Ts)
          return "Retry";
        if (e & ws)
          return "SelectiveHydration";
        if (e & bs)
          return "IdleHydration";
        if (e & Oo)
          return "Idle";
        if (e & fa)
          return "Offscreen";
      }
    }
    var Tn = -1, Mo = xo, tf = ko;
    function _s(e) {
      switch (Bl(e)) {
        case qe:
          return qe;
        case Pl:
          return Pl;
        case fi:
          return fi;
        case Ur:
          return Ur;
        case Bn:
          return Bn;
        case ll:
          return ll;
        case xo:
        case Vc:
        case Bc:
        case $c:
        case Ic:
        case Yc:
        case Wc:
        case Gc:
        case Qc:
        case Do:
        case Xc:
        case Cu:
        case Tu:
        case Kc:
        case Cs:
        case qc:
          return e & Vl;
        case ko:
        case Zc:
        case Rs:
        case Jc:
        case ef:
          return e & Ts;
        case ws:
          return ws;
        case bs:
          return bs;
        case Oo:
          return Oo;
        case fa:
          return fa;
        default:
          return C("Should have found matching lanes. This is a bug in React."), e;
      }
    }
    function nf(e, t) {
      var a = e.pendingLanes;
      if (a === K)
        return K;
      var i = K, o = e.suspendedLanes, s = e.pingedLanes, f = a & Fd;
      if (f !== K) {
        var h = f & ~o;
        if (h !== K)
          i = _s(h);
        else {
          var m = f & s;
          m !== K && (i = _s(m));
        }
      } else {
        var E = a & ~o;
        E !== K ? i = _s(E) : s !== K && (i = _s(s));
      }
      if (i === K)
        return K;
      if (t !== K && t !== i && // If we already suspended with a delay, then interrupting is fine. Don't
      // bother waiting until the root is complete.
      (t & o) === K) {
        var T = Bl(i), O = Bl(t);
        if (
          // Tests whether the next lane is equal or lower priority than the wip
          // one. This works because the bits decrease in priority as you go left.
          T >= O || // Default priority updates should not interrupt transition updates. The
          // only difference between default updates and transition updates is that
          // default updates do not support refresh transitions.
          T === Bn && (O & Vl) !== K
        )
          return t;
      }
      (i & fi) !== K && (i |= a & Bn);
      var D = e.entangledLanes;
      if (D !== K)
        for (var j = e.entanglements, P = i & D; P > 0; ) {
          var B = tr(P), he = 1 << B;
          i |= j[B], P &= ~he;
        }
      return i;
    }
    function di(e, t) {
      for (var a = e.eventTimes, i = Tn; t > 0; ) {
        var o = tr(t), s = 1 << o, f = a[o];
        f > i && (i = f), t &= ~s;
      }
      return i;
    }
    function Hd(e, t) {
      switch (e) {
        case qe:
        case Pl:
        case fi:
          return t + 250;
        case Ur:
        case Bn:
        case ll:
        case xo:
        case Vc:
        case Bc:
        case $c:
        case Ic:
        case Yc:
        case Wc:
        case Gc:
        case Qc:
        case Do:
        case Xc:
        case Cu:
        case Tu:
        case Kc:
        case Cs:
        case qc:
          return t + 5e3;
        case ko:
        case Zc:
        case Rs:
        case Jc:
        case ef:
          return Tn;
        case ws:
        case bs:
        case Oo:
        case fa:
          return Tn;
        default:
          return C("Should have found matching lanes. This is a bug in React."), Tn;
      }
    }
    function rf(e, t) {
      for (var a = e.pendingLanes, i = e.suspendedLanes, o = e.pingedLanes, s = e.expirationTimes, f = a; f > 0; ) {
        var h = tr(f), m = 1 << h, E = s[h];
        E === Tn ? ((m & i) === K || (m & o) !== K) && (s[h] = Hd(m, t)) : E <= t && (e.expiredLanes |= m), f &= ~m;
      }
    }
    function qv(e) {
      return _s(e.pendingLanes);
    }
    function af(e) {
      var t = e.pendingLanes & ~fa;
      return t !== K ? t : t & fa ? fa : K;
    }
    function Zv(e) {
      return (e & qe) !== K;
    }
    function xs(e) {
      return (e & Fd) !== K;
    }
    function Lo(e) {
      return (e & Ts) === e;
    }
    function Pd(e) {
      var t = qe | fi | Bn;
      return (e & t) === K;
    }
    function Vd(e) {
      return (e & Vl) === e;
    }
    function lf(e, t) {
      var a = Pl | fi | Ur | Bn;
      return (t & a) !== K;
    }
    function Jv(e, t) {
      return (t & e.expiredLanes) !== K;
    }
    function Bd(e) {
      return (e & Vl) !== K;
    }
    function $d() {
      var e = Mo;
      return Mo <<= 1, (Mo & Vl) === K && (Mo = xo), e;
    }
    function eh() {
      var e = tf;
      return tf <<= 1, (tf & Ts) === K && (tf = ko), e;
    }
    function Bl(e) {
      return e & -e;
    }
    function Ds(e) {
      return Bl(e);
    }
    function tr(e) {
      return 31 - er(e);
    }
    function Rr(e) {
      return tr(e);
    }
    function da(e, t) {
      return (e & t) !== K;
    }
    function No(e, t) {
      return (e & t) === t;
    }
    function Et(e, t) {
      return e | t;
    }
    function ks(e, t) {
      return e & ~t;
    }
    function Id(e, t) {
      return e & t;
    }
    function th(e) {
      return e;
    }
    function nh(e, t) {
      return e !== Kt && e < t ? e : t;
    }
    function Os(e) {
      for (var t = [], a = 0; a < _o; a++)
        t.push(e);
      return t;
    }
    function Ru(e, t, a) {
      e.pendingLanes |= t, t !== Oo && (e.suspendedLanes = K, e.pingedLanes = K);
      var i = e.eventTimes, o = Rr(t);
      i[o] = a;
    }
    function rh(e, t) {
      e.suspendedLanes |= t, e.pingedLanes &= ~t;
      for (var a = e.expirationTimes, i = t; i > 0; ) {
        var o = tr(i), s = 1 << o;
        a[o] = Tn, i &= ~s;
      }
    }
    function of(e, t, a) {
      e.pingedLanes |= e.suspendedLanes & t;
    }
    function Yd(e, t) {
      var a = e.pendingLanes & ~t;
      e.pendingLanes = t, e.suspendedLanes = K, e.pingedLanes = K, e.expiredLanes &= t, e.mutableReadLanes &= t, e.entangledLanes &= t;
      for (var i = e.entanglements, o = e.eventTimes, s = e.expirationTimes, f = a; f > 0; ) {
        var h = tr(f), m = 1 << h;
        i[h] = K, o[h] = Tn, s[h] = Tn, f &= ~m;
      }
    }
    function uf(e, t) {
      for (var a = e.entangledLanes |= t, i = e.entanglements, o = a; o; ) {
        var s = tr(o), f = 1 << s;
        // Is this one of the newly entangled lanes?
        f & t | // Is this lane transitively entangled with the newly entangled lanes?
        i[s] & t && (i[s] |= t), o &= ~f;
      }
    }
    function Wd(e, t) {
      var a = Bl(t), i;
      switch (a) {
        case fi:
          i = Pl;
          break;
        case Bn:
          i = Ur;
          break;
        case xo:
        case Vc:
        case Bc:
        case $c:
        case Ic:
        case Yc:
        case Wc:
        case Gc:
        case Qc:
        case Do:
        case Xc:
        case Cu:
        case Tu:
        case Kc:
        case Cs:
        case qc:
        case ko:
        case Zc:
        case Rs:
        case Jc:
        case ef:
          i = ll;
          break;
        case Oo:
          i = bs;
          break;
        default:
          i = Kt;
          break;
      }
      return (i & (e.suspendedLanes | t)) !== Kt ? Kt : i;
    }
    function Ms(e, t, a) {
      if (ca)
        for (var i = e.pendingUpdatersLaneMap; a > 0; ) {
          var o = Rr(a), s = 1 << o, f = i[o];
          f.add(t), a &= ~s;
        }
    }
    function ah(e, t) {
      if (ca)
        for (var a = e.pendingUpdatersLaneMap, i = e.memoizedUpdaters; t > 0; ) {
          var o = Rr(t), s = 1 << o, f = a[o];
          f.size > 0 && (f.forEach(function(h) {
            var m = h.alternate;
            (m === null || !i.has(m)) && i.add(h);
          }), f.clear()), t &= ~s;
        }
    }
    function Gd(e, t) {
      return null;
    }
    var Ir = qe, Ai = fi, Ba = Bn, $a = Oo, Ls = Kt;
    function Ia() {
      return Ls;
    }
    function nr(e) {
      Ls = e;
    }
    function ih(e, t) {
      var a = Ls;
      try {
        return Ls = e, t();
      } finally {
        Ls = a;
      }
    }
    function lh(e, t) {
      return e !== 0 && e < t ? e : t;
    }
    function Ns(e, t) {
      return e > t ? e : t;
    }
    function vr(e, t) {
      return e !== 0 && e < t;
    }
    function oh(e) {
      var t = Bl(e);
      return vr(Ir, t) ? vr(Ai, t) ? xs(t) ? Ba : $a : Ai : Ir;
    }
    function sf(e) {
      var t = e.current.memoizedState;
      return t.isDehydrated;
    }
    var As;
    function jr(e) {
      As = e;
    }
    function _y(e) {
      As(e);
    }
    var Re;
    function wu(e) {
      Re = e;
    }
    var cf;
    function uh(e) {
      cf = e;
    }
    var sh;
    function zs(e) {
      sh = e;
    }
    var Us;
    function Qd(e) {
      Us = e;
    }
    var ff = !1, js = [], ol = null, zi = null, Ui = null, $n = /* @__PURE__ */ new Map(), Yr = /* @__PURE__ */ new Map(), Wr = [], ch = [
      "mousedown",
      "mouseup",
      "touchcancel",
      "touchend",
      "touchstart",
      "auxclick",
      "dblclick",
      "pointercancel",
      "pointerdown",
      "pointerup",
      "dragend",
      "dragstart",
      "drop",
      "compositionend",
      "compositionstart",
      "keydown",
      "keypress",
      "keyup",
      "input",
      "textInput",
      // Intentionally camelCase
      "copy",
      "cut",
      "paste",
      "click",
      "change",
      "contextmenu",
      "reset",
      "submit"
    ];
    function fh(e) {
      return ch.indexOf(e) > -1;
    }
    function pi(e, t, a, i, o) {
      return {
        blockedOn: e,
        domEventName: t,
        eventSystemFlags: a,
        nativeEvent: o,
        targetContainers: [i]
      };
    }
    function Xd(e, t) {
      switch (e) {
        case "focusin":
        case "focusout":
          ol = null;
          break;
        case "dragenter":
        case "dragleave":
          zi = null;
          break;
        case "mouseover":
        case "mouseout":
          Ui = null;
          break;
        case "pointerover":
        case "pointerout": {
          var a = t.pointerId;
          $n.delete(a);
          break;
        }
        case "gotpointercapture":
        case "lostpointercapture": {
          var i = t.pointerId;
          Yr.delete(i);
          break;
        }
      }
    }
    function pa(e, t, a, i, o, s) {
      if (e === null || e.nativeEvent !== s) {
        var f = pi(t, a, i, o, s);
        if (t !== null) {
          var h = Nu(t);
          h !== null && Re(h);
        }
        return f;
      }
      e.eventSystemFlags |= i;
      var m = e.targetContainers;
      return o !== null && m.indexOf(o) === -1 && m.push(o), e;
    }
    function xy(e, t, a, i, o) {
      switch (t) {
        case "focusin": {
          var s = o;
          return ol = pa(ol, e, t, a, i, s), !0;
        }
        case "dragenter": {
          var f = o;
          return zi = pa(zi, e, t, a, i, f), !0;
        }
        case "mouseover": {
          var h = o;
          return Ui = pa(Ui, e, t, a, i, h), !0;
        }
        case "pointerover": {
          var m = o, E = m.pointerId;
          return $n.set(E, pa($n.get(E) || null, e, t, a, i, m)), !0;
        }
        case "gotpointercapture": {
          var T = o, O = T.pointerId;
          return Yr.set(O, pa(Yr.get(O) || null, e, t, a, i, T)), !0;
        }
      }
      return !1;
    }
    function Kd(e) {
      var t = Xs(e.target);
      if (t !== null) {
        var a = Ta(t);
        if (a !== null) {
          var i = a.tag;
          if (i === _e) {
            var o = Mi(a);
            if (o !== null) {
              e.blockedOn = o, Us(e.priority, function() {
                cf(a);
              });
              return;
            }
          } else if (i === J) {
            var s = a.stateNode;
            if (sf(s)) {
              e.blockedOn = Li(a);
              return;
            }
          }
        }
      }
      e.blockedOn = null;
    }
    function dh(e) {
      for (var t = sh(), a = {
        blockedOn: null,
        target: e,
        priority: t
      }, i = 0; i < Wr.length && vr(t, Wr[i].priority); i++)
        ;
      Wr.splice(i, 0, a), i === 0 && Kd(a);
    }
    function Fs(e) {
      if (e.blockedOn !== null)
        return !1;
      for (var t = e.targetContainers; t.length > 0; ) {
        var a = t[0], i = _u(e.domEventName, e.eventSystemFlags, a, e.nativeEvent);
        if (i === null) {
          var o = e.nativeEvent, s = new o.constructor(o.type, o);
          Cy(s), o.target.dispatchEvent(s), Ty();
        } else {
          var f = Nu(i);
          return f !== null && Re(f), e.blockedOn = i, !1;
        }
        t.shift();
      }
      return !0;
    }
    function qd(e, t, a) {
      Fs(e) && a.delete(t);
    }
    function Dy() {
      ff = !1, ol !== null && Fs(ol) && (ol = null), zi !== null && Fs(zi) && (zi = null), Ui !== null && Fs(Ui) && (Ui = null), $n.forEach(qd), Yr.forEach(qd);
    }
    function $l(e, t) {
      e.blockedOn === t && (e.blockedOn = null, ff || (ff = !0, d.unstable_scheduleCallback(d.unstable_NormalPriority, Dy)));
    }
    function Ao(e) {
      if (js.length > 0) {
        $l(js[0], e);
        for (var t = 1; t < js.length; t++) {
          var a = js[t];
          a.blockedOn === e && (a.blockedOn = null);
        }
      }
      ol !== null && $l(ol, e), zi !== null && $l(zi, e), Ui !== null && $l(Ui, e);
      var i = function(h) {
        return $l(h, e);
      };
      $n.forEach(i), Yr.forEach(i);
      for (var o = 0; o < Wr.length; o++) {
        var s = Wr[o];
        s.blockedOn === e && (s.blockedOn = null);
      }
      for (; Wr.length > 0; ) {
        var f = Wr[0];
        if (f.blockedOn !== null)
          break;
        Kd(f), f.blockedOn === null && Wr.shift();
      }
    }
    var wr = v.ReactCurrentBatchConfig, Bt = !0;
    function cr(e) {
      Bt = !!e;
    }
    function rr() {
      return Bt;
    }
    function br(e, t, a) {
      var i = df(t), o;
      switch (i) {
        case Ir:
          o = _a;
          break;
        case Ai:
          o = bu;
          break;
        case Ba:
        default:
          o = In;
          break;
      }
      return o.bind(null, t, a, e);
    }
    function _a(e, t, a, i) {
      var o = Ia(), s = wr.transition;
      wr.transition = null;
      try {
        nr(Ir), In(e, t, a, i);
      } finally {
        nr(o), wr.transition = s;
      }
    }
    function bu(e, t, a, i) {
      var o = Ia(), s = wr.transition;
      wr.transition = null;
      try {
        nr(Ai), In(e, t, a, i);
      } finally {
        nr(o), wr.transition = s;
      }
    }
    function In(e, t, a, i) {
      Bt && Hs(e, t, a, i);
    }
    function Hs(e, t, a, i) {
      var o = _u(e, t, a, i);
      if (o === null) {
        Yy(e, t, i, ji, a), Xd(e, i);
        return;
      }
      if (xy(o, e, t, a, i)) {
        i.stopPropagation();
        return;
      }
      if (Xd(e, i), t & Ua && fh(e)) {
        for (; o !== null; ) {
          var s = Nu(o);
          s !== null && _y(s);
          var f = _u(e, t, a, i);
          if (f === null && Yy(e, t, i, ji, a), f === o)
            break;
          o = f;
        }
        o !== null && i.stopPropagation();
        return;
      }
      Yy(e, t, i, null, a);
    }
    var ji = null;
    function _u(e, t, a, i) {
      ji = null;
      var o = Rd(i), s = Xs(o);
      if (s !== null) {
        var f = Ta(s);
        if (f === null)
          s = null;
        else {
          var h = f.tag;
          if (h === _e) {
            var m = Mi(f);
            if (m !== null)
              return m;
            s = null;
          } else if (h === J) {
            var E = f.stateNode;
            if (sf(E))
              return Li(f);
            s = null;
          } else f !== s && (s = null);
        }
      }
      return ji = s, null;
    }
    function df(e) {
      switch (e) {
        // Used by SimpleEventPlugin:
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
        // Used by polyfills:
        // eslint-disable-next-line no-fallthrough
        case "change":
        case "selectionchange":
        case "textInput":
        case "compositionstart":
        case "compositionend":
        case "compositionupdate":
        // Only enableCreateEventHandleAPI:
        // eslint-disable-next-line no-fallthrough
        case "beforeblur":
        case "afterblur":
        // Not used by React but could be by user code:
        // eslint-disable-next-line no-fallthrough
        case "beforeinput":
        case "blur":
        case "fullscreenchange":
        case "focus":
        case "hashchange":
        case "popstate":
        case "select":
        case "selectstart":
          return Ir;
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
        // Not used by React but could be by user code:
        // eslint-disable-next-line no-fallthrough
        case "mouseenter":
        case "mouseleave":
        case "pointerenter":
        case "pointerleave":
          return Ai;
        case "message": {
          var t = zc();
          switch (t) {
            case vs:
              return Ir;
            case Fl:
              return Ai;
            case al:
            case by:
              return Ba;
            case Co:
              return $a;
            default:
              return Ba;
          }
        }
        default:
          return Ba;
      }
    }
    function Ps(e, t, a) {
      return e.addEventListener(t, a, !1), a;
    }
    function va(e, t, a) {
      return e.addEventListener(t, a, !0), a;
    }
    function Zd(e, t, a, i) {
      return e.addEventListener(t, a, {
        capture: !0,
        passive: i
      }), a;
    }
    function xu(e, t, a, i) {
      return e.addEventListener(t, a, {
        passive: i
      }), a;
    }
    var xa = null, Du = null, zo = null;
    function Il(e) {
      return xa = e, Du = Vs(), !0;
    }
    function pf() {
      xa = null, Du = null, zo = null;
    }
    function ul() {
      if (zo)
        return zo;
      var e, t = Du, a = t.length, i, o = Vs(), s = o.length;
      for (e = 0; e < a && t[e] === o[e]; e++)
        ;
      var f = a - e;
      for (i = 1; i <= f && t[a - i] === o[s - i]; i++)
        ;
      var h = i > 1 ? 1 - i : void 0;
      return zo = o.slice(e, h), zo;
    }
    function Vs() {
      return "value" in xa ? xa.value : xa.textContent;
    }
    function Yl(e) {
      var t, a = e.keyCode;
      return "charCode" in e ? (t = e.charCode, t === 0 && a === 13 && (t = 13)) : t = a, t === 10 && (t = 13), t >= 32 || t === 13 ? t : 0;
    }
    function ku() {
      return !0;
    }
    function Bs() {
      return !1;
    }
    function Fr(e) {
      function t(a, i, o, s, f) {
        this._reactName = a, this._targetInst = o, this.type = i, this.nativeEvent = s, this.target = f, this.currentTarget = null;
        for (var h in e)
          if (e.hasOwnProperty(h)) {
            var m = e[h];
            m ? this[h] = m(s) : this[h] = s[h];
          }
        var E = s.defaultPrevented != null ? s.defaultPrevented : s.returnValue === !1;
        return E ? this.isDefaultPrevented = ku : this.isDefaultPrevented = Bs, this.isPropagationStopped = Bs, this;
      }
      return Tt(t.prototype, {
        preventDefault: function() {
          this.defaultPrevented = !0;
          var a = this.nativeEvent;
          a && (a.preventDefault ? a.preventDefault() : typeof a.returnValue != "unknown" && (a.returnValue = !1), this.isDefaultPrevented = ku);
        },
        stopPropagation: function() {
          var a = this.nativeEvent;
          a && (a.stopPropagation ? a.stopPropagation() : typeof a.cancelBubble != "unknown" && (a.cancelBubble = !0), this.isPropagationStopped = ku);
        },
        /**
         * We release all dispatched `SyntheticEvent`s after each event loop, adding
         * them back into the pool. This allows a way to hold onto a reference that
         * won't be added back into the pool.
         */
        persist: function() {
        },
        /**
         * Checks if this event should be released back into the pool.
         *
         * @return {boolean} True if this should not be released, false otherwise.
         */
        isPersistent: ku
      }), t;
    }
    var ar = {
      eventPhase: 0,
      bubbles: 0,
      cancelable: 0,
      timeStamp: function(e) {
        return e.timeStamp || Date.now();
      },
      defaultPrevented: 0,
      isTrusted: 0
    }, Fi = Fr(ar), Gr = Tt({}, ar, {
      view: 0,
      detail: 0
    }), ha = Fr(Gr), vf, $s, Uo;
    function ky(e) {
      e !== Uo && (Uo && e.type === "mousemove" ? (vf = e.screenX - Uo.screenX, $s = e.screenY - Uo.screenY) : (vf = 0, $s = 0), Uo = e);
    }
    var vi = Tt({}, Gr, {
      screenX: 0,
      screenY: 0,
      clientX: 0,
      clientY: 0,
      pageX: 0,
      pageY: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      getModifierState: On,
      button: 0,
      buttons: 0,
      relatedTarget: function(e) {
        return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
      },
      movementX: function(e) {
        return "movementX" in e ? e.movementX : (ky(e), vf);
      },
      movementY: function(e) {
        return "movementY" in e ? e.movementY : $s;
      }
    }), Jd = Fr(vi), ep = Tt({}, vi, {
      dataTransfer: 0
    }), jo = Fr(ep), tp = Tt({}, Gr, {
      relatedTarget: 0
    }), sl = Fr(tp), ph = Tt({}, ar, {
      animationName: 0,
      elapsedTime: 0,
      pseudoElement: 0
    }), vh = Fr(ph), np = Tt({}, ar, {
      clipboardData: function(e) {
        return "clipboardData" in e ? e.clipboardData : window.clipboardData;
      }
    }), hf = Fr(np), Oy = Tt({}, ar, {
      data: 0
    }), hh = Fr(Oy), mh = hh, yh = {
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
    }, Fo = {
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
    };
    function My(e) {
      if (e.key) {
        var t = yh[e.key] || e.key;
        if (t !== "Unidentified")
          return t;
      }
      if (e.type === "keypress") {
        var a = Yl(e);
        return a === 13 ? "Enter" : String.fromCharCode(a);
      }
      return e.type === "keydown" || e.type === "keyup" ? Fo[e.keyCode] || "Unidentified" : "";
    }
    var Ou = {
      Alt: "altKey",
      Control: "ctrlKey",
      Meta: "metaKey",
      Shift: "shiftKey"
    };
    function gh(e) {
      var t = this, a = t.nativeEvent;
      if (a.getModifierState)
        return a.getModifierState(e);
      var i = Ou[e];
      return i ? !!a[i] : !1;
    }
    function On(e) {
      return gh;
    }
    var Ly = Tt({}, Gr, {
      key: My,
      code: 0,
      location: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      repeat: 0,
      locale: 0,
      getModifierState: On,
      // Legacy Interface
      charCode: function(e) {
        return e.type === "keypress" ? Yl(e) : 0;
      },
      keyCode: function(e) {
        return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
      },
      which: function(e) {
        return e.type === "keypress" ? Yl(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
      }
    }), Sh = Fr(Ly), Ny = Tt({}, vi, {
      pointerId: 0,
      width: 0,
      height: 0,
      pressure: 0,
      tangentialPressure: 0,
      tiltX: 0,
      tiltY: 0,
      twist: 0,
      pointerType: 0,
      isPrimary: 0
    }), Eh = Fr(Ny), Ch = Tt({}, Gr, {
      touches: 0,
      targetTouches: 0,
      changedTouches: 0,
      altKey: 0,
      metaKey: 0,
      ctrlKey: 0,
      shiftKey: 0,
      getModifierState: On
    }), Th = Fr(Ch), Ay = Tt({}, ar, {
      propertyName: 0,
      elapsedTime: 0,
      pseudoElement: 0
    }), Ya = Fr(Ay), rp = Tt({}, vi, {
      deltaX: function(e) {
        return "deltaX" in e ? e.deltaX : (
          // Fallback to `wheelDeltaX` for Webkit and normalize (right is positive).
          "wheelDeltaX" in e ? -e.wheelDeltaX : 0
        );
      },
      deltaY: function(e) {
        return "deltaY" in e ? e.deltaY : (
          // Fallback to `wheelDeltaY` for Webkit and normalize (down is positive).
          "wheelDeltaY" in e ? -e.wheelDeltaY : (
            // Fallback to `wheelDelta` for IE<9 and normalize (down is positive).
            "wheelDelta" in e ? -e.wheelDelta : 0
          )
        );
      },
      deltaZ: 0,
      // Browsers without "deltaMode" is reporting in raw wheel delta where one
      // notch on the scroll is always +/- 120, roughly equivalent to pixels.
      // A good approximation of DOM_DELTA_LINE (1) is 5% of viewport size or
      // ~40 pixels, for DOM_DELTA_SCREEN (2) it is 87.5% of viewport size.
      deltaMode: 0
    }), zy = Fr(rp), Wl = [9, 13, 27, 32], Is = 229, cl = jn && "CompositionEvent" in window, Gl = null;
    jn && "documentMode" in document && (Gl = document.documentMode);
    var ap = jn && "TextEvent" in window && !Gl, mf = jn && (!cl || Gl && Gl > 8 && Gl <= 11), Rh = 32, yf = String.fromCharCode(Rh);
    function Uy() {
      St("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]), St("onCompositionEnd", ["compositionend", "focusout", "keydown", "keypress", "keyup", "mousedown"]), St("onCompositionStart", ["compositionstart", "focusout", "keydown", "keypress", "keyup", "mousedown"]), St("onCompositionUpdate", ["compositionupdate", "focusout", "keydown", "keypress", "keyup", "mousedown"]);
    }
    var ip = !1;
    function wh(e) {
      return (e.ctrlKey || e.altKey || e.metaKey) && // ctrlKey && altKey is equivalent to AltGr, and is not a command.
      !(e.ctrlKey && e.altKey);
    }
    function gf(e) {
      switch (e) {
        case "compositionstart":
          return "onCompositionStart";
        case "compositionend":
          return "onCompositionEnd";
        case "compositionupdate":
          return "onCompositionUpdate";
      }
    }
    function Sf(e, t) {
      return e === "keydown" && t.keyCode === Is;
    }
    function lp(e, t) {
      switch (e) {
        case "keyup":
          return Wl.indexOf(t.keyCode) !== -1;
        case "keydown":
          return t.keyCode !== Is;
        case "keypress":
        case "mousedown":
        case "focusout":
          return !0;
        default:
          return !1;
      }
    }
    function Ef(e) {
      var t = e.detail;
      return typeof t == "object" && "data" in t ? t.data : null;
    }
    function bh(e) {
      return e.locale === "ko";
    }
    var Ho = !1;
    function op(e, t, a, i, o) {
      var s, f;
      if (cl ? s = gf(t) : Ho ? lp(t, i) && (s = "onCompositionEnd") : Sf(t, i) && (s = "onCompositionStart"), !s)
        return null;
      mf && !bh(i) && (!Ho && s === "onCompositionStart" ? Ho = Il(o) : s === "onCompositionEnd" && Ho && (f = ul()));
      var h = Lh(a, s);
      if (h.length > 0) {
        var m = new hh(s, t, null, i, o);
        if (e.push({
          event: m,
          listeners: h
        }), f)
          m.data = f;
        else {
          var E = Ef(i);
          E !== null && (m.data = E);
        }
      }
    }
    function Cf(e, t) {
      switch (e) {
        case "compositionend":
          return Ef(t);
        case "keypress":
          var a = t.which;
          return a !== Rh ? null : (ip = !0, yf);
        case "textInput":
          var i = t.data;
          return i === yf && ip ? null : i;
        default:
          return null;
      }
    }
    function up(e, t) {
      if (Ho) {
        if (e === "compositionend" || !cl && lp(e, t)) {
          var a = ul();
          return pf(), Ho = !1, a;
        }
        return null;
      }
      switch (e) {
        case "paste":
          return null;
        case "keypress":
          if (!wh(t)) {
            if (t.char && t.char.length > 1)
              return t.char;
            if (t.which)
              return String.fromCharCode(t.which);
          }
          return null;
        case "compositionend":
          return mf && !bh(t) ? null : t.data;
        default:
          return null;
      }
    }
    function Tf(e, t, a, i, o) {
      var s;
      if (ap ? s = Cf(t, i) : s = up(t, i), !s)
        return null;
      var f = Lh(a, "onBeforeInput");
      if (f.length > 0) {
        var h = new mh("onBeforeInput", "beforeinput", null, i, o);
        e.push({
          event: h,
          listeners: f
        }), h.data = s;
      }
    }
    function _h(e, t, a, i, o, s, f) {
      op(e, t, a, i, o), Tf(e, t, a, i, o);
    }
    var jy = {
      color: !0,
      date: !0,
      datetime: !0,
      "datetime-local": !0,
      email: !0,
      month: !0,
      number: !0,
      password: !0,
      range: !0,
      search: !0,
      tel: !0,
      text: !0,
      time: !0,
      url: !0,
      week: !0
    };
    function Ys(e) {
      var t = e && e.nodeName && e.nodeName.toLowerCase();
      return t === "input" ? !!jy[e.type] : t === "textarea";
    }
    /**
     * Checks if an event is supported in the current execution environment.
     *
     * NOTE: This will not work correctly for non-generic events such as `change`,
     * `reset`, `load`, `error`, and `select`.
     *
     * Borrows from Modernizr.
     *
     * @param {string} eventNameSuffix Event name, e.g. "click".
     * @return {boolean} True if the event is supported.
     * @internal
     * @license Modernizr 3.0.0pre (Custom Build) | MIT
     */
    function Fy(e) {
      if (!jn)
        return !1;
      var t = "on" + e, a = t in document;
      if (!a) {
        var i = document.createElement("div");
        i.setAttribute(t, "return;"), a = typeof i[t] == "function";
      }
      return a;
    }
    function Ws() {
      St("onChange", ["change", "click", "focusin", "focusout", "input", "keydown", "keyup", "selectionchange"]);
    }
    function xh(e, t, a, i) {
      pu(i);
      var o = Lh(t, "onChange");
      if (o.length > 0) {
        var s = new Fi("onChange", "change", null, a, i);
        e.push({
          event: s,
          listeners: o
        });
      }
    }
    var Ql = null, n = null;
    function r(e) {
      var t = e.nodeName && e.nodeName.toLowerCase();
      return t === "select" || t === "input" && e.type === "file";
    }
    function l(e) {
      var t = [];
      xh(t, n, e, Rd(e)), Hv(u, t);
    }
    function u(e) {
      Q0(e, 0);
    }
    function c(e) {
      var t = Df(e);
      if (bi(t))
        return e;
    }
    function p(e, t) {
      if (e === "change")
        return t;
    }
    var S = !1;
    jn && (S = Fy("input") && (!document.documentMode || document.documentMode > 9));
    function w(e, t) {
      Ql = e, n = t, Ql.attachEvent("onpropertychange", H);
    }
    function x() {
      Ql && (Ql.detachEvent("onpropertychange", H), Ql = null, n = null);
    }
    function H(e) {
      e.propertyName === "value" && c(n) && l(e);
    }
    function ee(e, t, a) {
      e === "focusin" ? (x(), w(t, a)) : e === "focusout" && x();
    }
    function re(e, t) {
      if (e === "selectionchange" || e === "keyup" || e === "keydown")
        return c(n);
    }
    function q(e) {
      var t = e.nodeName;
      return t && t.toLowerCase() === "input" && (e.type === "checkbox" || e.type === "radio");
    }
    function ge(e, t) {
      if (e === "click")
        return c(t);
    }
    function xe(e, t) {
      if (e === "input" || e === "change")
        return c(t);
    }
    function Me(e) {
      var t = e._wrapperState;
      !t || !t.controlled || e.type !== "number" || Be(e, "number", e.value);
    }
    function Yn(e, t, a, i, o, s, f) {
      var h = a ? Df(a) : window, m, E;
      if (r(h) ? m = p : Ys(h) ? S ? m = xe : (m = re, E = ee) : q(h) && (m = ge), m) {
        var T = m(t, a);
        if (T) {
          xh(e, T, i, o);
          return;
        }
      }
      E && E(t, h, a), t === "focusout" && Me(h);
    }
    function N() {
      Qt("onMouseEnter", ["mouseout", "mouseover"]), Qt("onMouseLeave", ["mouseout", "mouseover"]), Qt("onPointerEnter", ["pointerout", "pointerover"]), Qt("onPointerLeave", ["pointerout", "pointerover"]);
    }
    function k(e, t, a, i, o, s, f) {
      var h = t === "mouseover" || t === "pointerover", m = t === "mouseout" || t === "pointerout";
      if (h && !us(i)) {
        var E = i.relatedTarget || i.fromElement;
        if (E && (Xs(E) || Tp(E)))
          return;
      }
      if (!(!m && !h)) {
        var T;
        if (o.window === o)
          T = o;
        else {
          var O = o.ownerDocument;
          O ? T = O.defaultView || O.parentWindow : T = window;
        }
        var D, j;
        if (m) {
          var P = i.relatedTarget || i.toElement;
          if (D = a, j = P ? Xs(P) : null, j !== null) {
            var B = Ta(j);
            (j !== B || j.tag !== oe && j.tag !== Ue) && (j = null);
          }
        } else
          D = null, j = a;
        if (D !== j) {
          var he = Jd, $e = "onMouseLeave", Ne = "onMouseEnter", It = "mouse";
          (t === "pointerout" || t === "pointerover") && (he = Eh, $e = "onPointerLeave", Ne = "onPointerEnter", It = "pointer");
          var Ut = D == null ? T : Df(D), A = j == null ? T : Df(j), $ = new he($e, It + "leave", D, i, o);
          $.target = Ut, $.relatedTarget = A;
          var z = null, ae = Xs(o);
          if (ae === a) {
            var Te = new he(Ne, It + "enter", j, i, o);
            Te.target = A, Te.relatedTarget = Ut, z = Te;
          }
          Ew(e, $, z, D, j);
        }
      }
    }
    function U(e, t) {
      return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
    }
    var te = typeof Object.is == "function" ? Object.is : U;
    function De(e, t) {
      if (te(e, t))
        return !0;
      if (typeof e != "object" || e === null || typeof t != "object" || t === null)
        return !1;
      var a = Object.keys(e), i = Object.keys(t);
      if (a.length !== i.length)
        return !1;
      for (var o = 0; o < a.length; o++) {
        var s = a[o];
        if (!Qn.call(t, s) || !te(e[s], t[s]))
          return !1;
      }
      return !0;
    }
    function Ye(e) {
      for (; e && e.firstChild; )
        e = e.firstChild;
      return e;
    }
    function Ge(e) {
      for (; e; ) {
        if (e.nextSibling)
          return e.nextSibling;
        e = e.parentNode;
      }
    }
    function at(e, t) {
      for (var a = Ye(e), i = 0, o = 0; a; ) {
        if (a.nodeType === Ji) {
          if (o = i + a.textContent.length, i <= t && o >= t)
            return {
              node: a,
              offset: t - i
            };
          i = o;
        }
        a = Ye(Ge(a));
      }
    }
    function hr(e) {
      var t = e.ownerDocument, a = t && t.defaultView || window, i = a.getSelection && a.getSelection();
      if (!i || i.rangeCount === 0)
        return null;
      var o = i.anchorNode, s = i.anchorOffset, f = i.focusNode, h = i.focusOffset;
      try {
        o.nodeType, f.nodeType;
      } catch {
        return null;
      }
      return an(e, o, s, f, h);
    }
    function an(e, t, a, i, o) {
      var s = 0, f = -1, h = -1, m = 0, E = 0, T = e, O = null;
      e: for (; ; ) {
        for (var D = null; T === t && (a === 0 || T.nodeType === Ji) && (f = s + a), T === i && (o === 0 || T.nodeType === Ji) && (h = s + o), T.nodeType === Ji && (s += T.nodeValue.length), (D = T.firstChild) !== null; )
          O = T, T = D;
        for (; ; ) {
          if (T === e)
            break e;
          if (O === t && ++m === a && (f = s), O === i && ++E === o && (h = s), (D = T.nextSibling) !== null)
            break;
          T = O, O = T.parentNode;
        }
        T = D;
      }
      return f === -1 || h === -1 ? null : {
        start: f,
        end: h
      };
    }
    function Xl(e, t) {
      var a = e.ownerDocument || document, i = a && a.defaultView || window;
      if (i.getSelection) {
        var o = i.getSelection(), s = e.textContent.length, f = Math.min(t.start, s), h = t.end === void 0 ? f : Math.min(t.end, s);
        if (!o.extend && f > h) {
          var m = h;
          h = f, f = m;
        }
        var E = at(e, f), T = at(e, h);
        if (E && T) {
          if (o.rangeCount === 1 && o.anchorNode === E.node && o.anchorOffset === E.offset && o.focusNode === T.node && o.focusOffset === T.offset)
            return;
          var O = a.createRange();
          O.setStart(E.node, E.offset), o.removeAllRanges(), f > h ? (o.addRange(O), o.extend(T.node, T.offset)) : (O.setEnd(T.node, T.offset), o.addRange(O));
        }
      }
    }
    function Dh(e) {
      return e && e.nodeType === Ji;
    }
    function j0(e, t) {
      return !e || !t ? !1 : e === t ? !0 : Dh(e) ? !1 : Dh(t) ? j0(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1;
    }
    function nw(e) {
      return e && e.ownerDocument && j0(e.ownerDocument.documentElement, e);
    }
    function rw(e) {
      try {
        return typeof e.contentWindow.location.href == "string";
      } catch {
        return !1;
      }
    }
    function F0() {
      for (var e = window, t = za(); t instanceof e.HTMLIFrameElement; ) {
        if (rw(t))
          e = t.contentWindow;
        else
          return t;
        t = za(e.document);
      }
      return t;
    }
    function Hy(e) {
      var t = e && e.nodeName && e.nodeName.toLowerCase();
      return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
    }
    function aw() {
      var e = F0();
      return {
        focusedElem: e,
        selectionRange: Hy(e) ? lw(e) : null
      };
    }
    function iw(e) {
      var t = F0(), a = e.focusedElem, i = e.selectionRange;
      if (t !== a && nw(a)) {
        i !== null && Hy(a) && ow(a, i);
        for (var o = [], s = a; s = s.parentNode; )
          s.nodeType === ia && o.push({
            element: s,
            left: s.scrollLeft,
            top: s.scrollTop
          });
        typeof a.focus == "function" && a.focus();
        for (var f = 0; f < o.length; f++) {
          var h = o[f];
          h.element.scrollLeft = h.left, h.element.scrollTop = h.top;
        }
      }
    }
    function lw(e) {
      var t;
      return "selectionStart" in e ? t = {
        start: e.selectionStart,
        end: e.selectionEnd
      } : t = hr(e), t || {
        start: 0,
        end: 0
      };
    }
    function ow(e, t) {
      var a = t.start, i = t.end;
      i === void 0 && (i = a), "selectionStart" in e ? (e.selectionStart = a, e.selectionEnd = Math.min(i, e.value.length)) : Xl(e, t);
    }
    var uw = jn && "documentMode" in document && document.documentMode <= 11;
    function sw() {
      St("onSelect", ["focusout", "contextmenu", "dragend", "focusin", "keydown", "keyup", "mousedown", "mouseup", "selectionchange"]);
    }
    var Rf = null, Py = null, sp = null, Vy = !1;
    function cw(e) {
      if ("selectionStart" in e && Hy(e))
        return {
          start: e.selectionStart,
          end: e.selectionEnd
        };
      var t = e.ownerDocument && e.ownerDocument.defaultView || window, a = t.getSelection();
      return {
        anchorNode: a.anchorNode,
        anchorOffset: a.anchorOffset,
        focusNode: a.focusNode,
        focusOffset: a.focusOffset
      };
    }
    function fw(e) {
      return e.window === e ? e.document : e.nodeType === el ? e : e.ownerDocument;
    }
    function H0(e, t, a) {
      var i = fw(a);
      if (!(Vy || Rf == null || Rf !== za(i))) {
        var o = cw(Rf);
        if (!sp || !De(sp, o)) {
          sp = o;
          var s = Lh(Py, "onSelect");
          if (s.length > 0) {
            var f = new Fi("onSelect", "select", null, t, a);
            e.push({
              event: f,
              listeners: s
            }), f.target = Rf;
          }
        }
      }
    }
    function dw(e, t, a, i, o, s, f) {
      var h = a ? Df(a) : window;
      switch (t) {
        // Track the input node that has focus.
        case "focusin":
          (Ys(h) || h.contentEditable === "true") && (Rf = h, Py = a, sp = null);
          break;
        case "focusout":
          Rf = null, Py = null, sp = null;
          break;
        // Don't fire the event while the user is dragging. This matches the
        // semantics of the native select event.
        case "mousedown":
          Vy = !0;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          Vy = !1, H0(e, i, o);
          break;
        // Chrome and IE fire non-standard event when selection is changed (and
        // sometimes when it hasn't). IE's event fires out of order with respect
        // to key and input events on deletion, so we discard it.
        //
        // Firefox doesn't support selectionchange, so check selection status
        // after each key entry. The selection changes after keydown and before
        // keyup, but we check on keydown as well in the case of holding down a
        // key, when multiple keydown events are fired but only one keyup is.
        // This is also our approach for IE handling, for the reason above.
        case "selectionchange":
          if (uw)
            break;
        // falls through
        case "keydown":
        case "keyup":
          H0(e, i, o);
      }
    }
    function kh(e, t) {
      var a = {};
      return a[e.toLowerCase()] = t.toLowerCase(), a["Webkit" + e] = "webkit" + t, a["Moz" + e] = "moz" + t, a;
    }
    var wf = {
      animationend: kh("Animation", "AnimationEnd"),
      animationiteration: kh("Animation", "AnimationIteration"),
      animationstart: kh("Animation", "AnimationStart"),
      transitionend: kh("Transition", "TransitionEnd")
    }, By = {}, P0 = {};
    jn && (P0 = document.createElement("div").style, "AnimationEvent" in window || (delete wf.animationend.animation, delete wf.animationiteration.animation, delete wf.animationstart.animation), "TransitionEvent" in window || delete wf.transitionend.transition);
    function Oh(e) {
      if (By[e])
        return By[e];
      if (!wf[e])
        return e;
      var t = wf[e];
      for (var a in t)
        if (t.hasOwnProperty(a) && a in P0)
          return By[e] = t[a];
      return e;
    }
    var V0 = Oh("animationend"), B0 = Oh("animationiteration"), $0 = Oh("animationstart"), I0 = Oh("transitionend"), Y0 = /* @__PURE__ */ new Map(), W0 = ["abort", "auxClick", "cancel", "canPlay", "canPlayThrough", "click", "close", "contextMenu", "copy", "cut", "drag", "dragEnd", "dragEnter", "dragExit", "dragLeave", "dragOver", "dragStart", "drop", "durationChange", "emptied", "encrypted", "ended", "error", "gotPointerCapture", "input", "invalid", "keyDown", "keyPress", "keyUp", "load", "loadedData", "loadedMetadata", "loadStart", "lostPointerCapture", "mouseDown", "mouseMove", "mouseOut", "mouseOver", "mouseUp", "paste", "pause", "play", "playing", "pointerCancel", "pointerDown", "pointerMove", "pointerOut", "pointerOver", "pointerUp", "progress", "rateChange", "reset", "resize", "seeked", "seeking", "stalled", "submit", "suspend", "timeUpdate", "touchCancel", "touchEnd", "touchStart", "volumeChange", "scroll", "toggle", "touchMove", "waiting", "wheel"];
    function Mu(e, t) {
      Y0.set(e, t), St(t, [e]);
    }
    function pw() {
      for (var e = 0; e < W0.length; e++) {
        var t = W0[e], a = t.toLowerCase(), i = t[0].toUpperCase() + t.slice(1);
        Mu(a, "on" + i);
      }
      Mu(V0, "onAnimationEnd"), Mu(B0, "onAnimationIteration"), Mu($0, "onAnimationStart"), Mu("dblclick", "onDoubleClick"), Mu("focusin", "onFocus"), Mu("focusout", "onBlur"), Mu(I0, "onTransitionEnd");
    }
    function vw(e, t, a, i, o, s, f) {
      var h = Y0.get(t);
      if (h !== void 0) {
        var m = Fi, E = t;
        switch (t) {
          case "keypress":
            if (Yl(i) === 0)
              return;
          /* falls through */
          case "keydown":
          case "keyup":
            m = Sh;
            break;
          case "focusin":
            E = "focus", m = sl;
            break;
          case "focusout":
            E = "blur", m = sl;
            break;
          case "beforeblur":
          case "afterblur":
            m = sl;
            break;
          case "click":
            if (i.button === 2)
              return;
          /* falls through */
          case "auxclick":
          case "dblclick":
          case "mousedown":
          case "mousemove":
          case "mouseup":
          // TODO: Disabled elements should not respond to mouse events
          /* falls through */
          case "mouseout":
          case "mouseover":
          case "contextmenu":
            m = Jd;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            m = jo;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            m = Th;
            break;
          case V0:
          case B0:
          case $0:
            m = vh;
            break;
          case I0:
            m = Ya;
            break;
          case "scroll":
            m = ha;
            break;
          case "wheel":
            m = zy;
            break;
          case "copy":
          case "cut":
          case "paste":
            m = hf;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            m = Eh;
            break;
        }
        var T = (s & Ua) !== 0;
        {
          var O = !T && // TODO: ideally, we'd eventually add all events from
          // nonDelegatedEvents list in DOMPluginEventSystem.
          // Then we can remove this special list.
          // This is a breaking change that can wait until React 18.
          t === "scroll", D = gw(a, h, i.type, T, O);
          if (D.length > 0) {
            var j = new m(h, E, null, i, o);
            e.push({
              event: j,
              listeners: D
            });
          }
        }
      }
    }
    pw(), N(), Ws(), sw(), Uy();
    function hw(e, t, a, i, o, s, f) {
      vw(e, t, a, i, o, s);
      var h = (s & Td) === 0;
      h && (k(e, t, a, i, o), Yn(e, t, a, i, o), dw(e, t, a, i, o), _h(e, t, a, i, o));
    }
    var cp = ["abort", "canplay", "canplaythrough", "durationchange", "emptied", "encrypted", "ended", "error", "loadeddata", "loadedmetadata", "loadstart", "pause", "play", "playing", "progress", "ratechange", "resize", "seeked", "seeking", "stalled", "suspend", "timeupdate", "volumechange", "waiting"], $y = new Set(["cancel", "close", "invalid", "load", "scroll", "toggle"].concat(cp));
    function G0(e, t, a) {
      var i = e.type || "unknown-event";
      e.currentTarget = a, Di(i, t, void 0, e), e.currentTarget = null;
    }
    function mw(e, t, a) {
      var i;
      if (a)
        for (var o = t.length - 1; o >= 0; o--) {
          var s = t[o], f = s.instance, h = s.currentTarget, m = s.listener;
          if (f !== i && e.isPropagationStopped())
            return;
          G0(e, m, h), i = f;
        }
      else
        for (var E = 0; E < t.length; E++) {
          var T = t[E], O = T.instance, D = T.currentTarget, j = T.listener;
          if (O !== i && e.isPropagationStopped())
            return;
          G0(e, j, D), i = O;
        }
    }
    function Q0(e, t) {
      for (var a = (t & Ua) !== 0, i = 0; i < e.length; i++) {
        var o = e[i], s = o.event, f = o.listeners;
        mw(s, f, a);
      }
      fs();
    }
    function yw(e, t, a, i, o) {
      var s = Rd(a), f = [];
      hw(f, e, i, a, s, t), Q0(f, t);
    }
    function zn(e, t) {
      $y.has(e) || C('Did not expect a listenToNonDelegatedEvent() call for "%s". This is a bug in React. Please file an issue.', e);
      var a = !1, i = Gb(t), o = Cw(e);
      i.has(o) || (X0(t, e, Tc, a), i.add(o));
    }
    function Iy(e, t, a) {
      $y.has(e) && !t && C('Did not expect a listenToNativeEvent() call for "%s" in the bubble phase. This is a bug in React. Please file an issue.', e);
      var i = 0;
      t && (i |= Ua), X0(a, e, i, t);
    }
    var Mh = "_reactListening" + Math.random().toString(36).slice(2);
    function fp(e) {
      if (!e[Mh]) {
        e[Mh] = !0, pt.forEach(function(a) {
          a !== "selectionchange" && ($y.has(a) || Iy(a, !1, e), Iy(a, !0, e));
        });
        var t = e.nodeType === el ? e : e.ownerDocument;
        t !== null && (t[Mh] || (t[Mh] = !0, Iy("selectionchange", !1, t)));
      }
    }
    function X0(e, t, a, i, o) {
      var s = br(e, t, a), f = void 0;
      cs && (t === "touchstart" || t === "touchmove" || t === "wheel") && (f = !0), e = e, i ? f !== void 0 ? Zd(e, t, s, f) : va(e, t, s) : f !== void 0 ? xu(e, t, s, f) : Ps(e, t, s);
    }
    function K0(e, t) {
      return e === t || e.nodeType === qn && e.parentNode === t;
    }
    function Yy(e, t, a, i, o) {
      var s = i;
      if ((t & Cd) === 0 && (t & Tc) === 0) {
        var f = o;
        if (i !== null) {
          var h = i;
          e: for (; ; ) {
            if (h === null)
              return;
            var m = h.tag;
            if (m === J || m === se) {
              var E = h.stateNode.containerInfo;
              if (K0(E, f))
                break;
              if (m === se)
                for (var T = h.return; T !== null; ) {
                  var O = T.tag;
                  if (O === J || O === se) {
                    var D = T.stateNode.containerInfo;
                    if (K0(D, f))
                      return;
                  }
                  T = T.return;
                }
              for (; E !== null; ) {
                var j = Xs(E);
                if (j === null)
                  return;
                var P = j.tag;
                if (P === oe || P === Ue) {
                  h = s = j;
                  continue e;
                }
                E = E.parentNode;
              }
            }
            h = h.return;
          }
        }
      }
      Hv(function() {
        return yw(e, t, a, s);
      });
    }
    function dp(e, t, a) {
      return {
        instance: e,
        listener: t,
        currentTarget: a
      };
    }
    function gw(e, t, a, i, o, s) {
      for (var f = t !== null ? t + "Capture" : null, h = i ? f : t, m = [], E = e, T = null; E !== null; ) {
        var O = E, D = O.stateNode, j = O.tag;
        if (j === oe && D !== null && (T = D, h !== null)) {
          var P = Ll(E, h);
          P != null && m.push(dp(E, P, T));
        }
        if (o)
          break;
        E = E.return;
      }
      return m;
    }
    function Lh(e, t) {
      for (var a = t + "Capture", i = [], o = e; o !== null; ) {
        var s = o, f = s.stateNode, h = s.tag;
        if (h === oe && f !== null) {
          var m = f, E = Ll(o, a);
          E != null && i.unshift(dp(o, E, m));
          var T = Ll(o, t);
          T != null && i.push(dp(o, T, m));
        }
        o = o.return;
      }
      return i;
    }
    function bf(e) {
      if (e === null)
        return null;
      do
        e = e.return;
      while (e && e.tag !== oe);
      return e || null;
    }
    function Sw(e, t) {
      for (var a = e, i = t, o = 0, s = a; s; s = bf(s))
        o++;
      for (var f = 0, h = i; h; h = bf(h))
        f++;
      for (; o - f > 0; )
        a = bf(a), o--;
      for (; f - o > 0; )
        i = bf(i), f--;
      for (var m = o; m--; ) {
        if (a === i || i !== null && a === i.alternate)
          return a;
        a = bf(a), i = bf(i);
      }
      return null;
    }
    function q0(e, t, a, i, o) {
      for (var s = t._reactName, f = [], h = a; h !== null && h !== i; ) {
        var m = h, E = m.alternate, T = m.stateNode, O = m.tag;
        if (E !== null && E === i)
          break;
        if (O === oe && T !== null) {
          var D = T;
          if (o) {
            var j = Ll(h, s);
            j != null && f.unshift(dp(h, j, D));
          } else if (!o) {
            var P = Ll(h, s);
            P != null && f.push(dp(h, P, D));
          }
        }
        h = h.return;
      }
      f.length !== 0 && e.push({
        event: t,
        listeners: f
      });
    }
    function Ew(e, t, a, i, o) {
      var s = i && o ? Sw(i, o) : null;
      i !== null && q0(e, t, i, s, !1), o !== null && a !== null && q0(e, a, o, s, !0);
    }
    function Cw(e, t) {
      return e + "__bubble";
    }
    var Wa = !1, pp = "dangerouslySetInnerHTML", Nh = "suppressContentEditableWarning", Lu = "suppressHydrationWarning", Z0 = "autoFocus", Gs = "children", Qs = "style", Ah = "__html", Wy, zh, vp, J0, Uh, eE, tE;
    Wy = {
      // There are working polyfills for <dialog>. Let people use it.
      dialog: !0,
      // Electron ships a custom <webview> tag to display external web content in
      // an isolated frame and process.
      // This tag is not present in non Electron environments such as JSDom which
      // is often used for testing purposes.
      // @see https://electronjs.org/docs/api/webview-tag
      webview: !0
    }, zh = function(e, t) {
      gd(e, t), Ec(e, t), Uv(e, t, {
        registrationNameDependencies: vt,
        possibleRegistrationNames: rt
      });
    }, eE = jn && !document.documentMode, vp = function(e, t, a) {
      if (!Wa) {
        var i = jh(a), o = jh(t);
        o !== i && (Wa = !0, C("Prop `%s` did not match. Server: %s Client: %s", e, JSON.stringify(o), JSON.stringify(i)));
      }
    }, J0 = function(e) {
      if (!Wa) {
        Wa = !0;
        var t = [];
        e.forEach(function(a) {
          t.push(a);
        }), C("Extra attributes from the server: %s", t);
      }
    }, Uh = function(e, t) {
      t === !1 ? C("Expected `%s` listener to be a function, instead got `false`.\n\nIf you used to conditionally omit it with %s={condition && value}, pass %s={condition ? value : undefined} instead.", e, e, e) : C("Expected `%s` listener to be a function, instead got a value of `%s` type.", e, typeof t);
    }, tE = function(e, t) {
      var a = e.namespaceURI === Zi ? e.ownerDocument.createElement(e.tagName) : e.ownerDocument.createElementNS(e.namespaceURI, e.tagName);
      return a.innerHTML = t, a.innerHTML;
    };
    var Tw = /\r\n?/g, Rw = /\u0000|\uFFFD/g;
    function jh(e) {
      Ct(e);
      var t = typeof e == "string" ? e : "" + e;
      return t.replace(Tw, `
`).replace(Rw, "");
    }
    function Fh(e, t, a, i) {
      var o = jh(t), s = jh(e);
      if (s !== o && (i && (Wa || (Wa = !0, C('Text content did not match. Server: "%s" Client: "%s"', s, o))), a && Ee))
        throw new Error("Text content does not match server-rendered HTML.");
    }
    function nE(e) {
      return e.nodeType === el ? e : e.ownerDocument;
    }
    function ww() {
    }
    function Hh(e) {
      e.onclick = ww;
    }
    function bw(e, t, a, i, o) {
      for (var s in i)
        if (i.hasOwnProperty(s)) {
          var f = i[s];
          if (s === Qs)
            f && Object.freeze(f), Ov(t, f);
          else if (s === pp) {
            var h = f ? f[Ah] : void 0;
            h != null && gv(t, h);
          } else if (s === Gs)
            if (typeof f == "string") {
              var m = e !== "textarea" || f !== "";
              m && su(t, f);
            } else typeof f == "number" && su(t, "" + f);
          else s === Nh || s === Lu || s === Z0 || (vt.hasOwnProperty(s) ? f != null && (typeof f != "function" && Uh(s, f), s === "onScroll" && zn("scroll", t)) : f != null && gr(t, s, f, o));
        }
    }
    function _w(e, t, a, i) {
      for (var o = 0; o < t.length; o += 2) {
        var s = t[o], f = t[o + 1];
        s === Qs ? Ov(e, f) : s === pp ? gv(e, f) : s === Gs ? su(e, f) : gr(e, s, f, i);
      }
    }
    function xw(e, t, a, i) {
      var o, s = nE(a), f, h = i;
      if (h === Zi && (h = fd(e)), h === Zi) {
        if (o = Ol(e, t), !o && e !== e.toLowerCase() && C("<%s /> is using incorrect casing. Use PascalCase for React components, or lowercase for HTML elements.", e), e === "script") {
          var m = s.createElement("div");
          m.innerHTML = "<script><\/script>";
          var E = m.firstChild;
          f = m.removeChild(E);
        } else if (typeof t.is == "string")
          f = s.createElement(e, {
            is: t.is
          });
        else if (f = s.createElement(e), e === "select") {
          var T = f;
          t.multiple ? T.multiple = !0 : t.size && (T.size = t.size);
        }
      } else
        f = s.createElementNS(h, e);
      return h === Zi && !o && Object.prototype.toString.call(f) === "[object HTMLUnknownElement]" && !Qn.call(Wy, e) && (Wy[e] = !0, C("The tag <%s> is unrecognized in this browser. If you meant to render a React component, start its name with an uppercase letter.", e)), f;
    }
    function Dw(e, t) {
      return nE(t).createTextNode(e);
    }
    function kw(e, t, a, i) {
      var o = Ol(t, a);
      zh(t, a);
      var s;
      switch (t) {
        case "dialog":
          zn("cancel", e), zn("close", e), s = a;
          break;
        case "iframe":
        case "object":
        case "embed":
          zn("load", e), s = a;
          break;
        case "video":
        case "audio":
          for (var f = 0; f < cp.length; f++)
            zn(cp[f], e);
          s = a;
          break;
        case "source":
          zn("error", e), s = a;
          break;
        case "img":
        case "image":
        case "link":
          zn("error", e), zn("load", e), s = a;
          break;
        case "details":
          zn("toggle", e), s = a;
          break;
        case "input":
          ui(e, a), s = uu(e, a), zn("invalid", e);
          break;
        case "option":
          Wt(e, a), s = a;
          break;
        case "select":
          po(e, a), s = ts(e, a), zn("invalid", e);
          break;
        case "textarea":
          ud(e, a), s = od(e, a), zn("invalid", e);
          break;
        default:
          s = a;
      }
      switch (gc(t, s), bw(t, e, i, s, o), t) {
        case "input":
          oi(e), F(e, a, !1);
          break;
        case "textarea":
          oi(e), mv(e);
          break;
        case "option":
          wn(e, a);
          break;
        case "select":
          id(e, a);
          break;
        default:
          typeof s.onClick == "function" && Hh(e);
          break;
      }
    }
    function Ow(e, t, a, i, o) {
      zh(t, i);
      var s = null, f, h;
      switch (t) {
        case "input":
          f = uu(e, a), h = uu(e, i), s = [];
          break;
        case "select":
          f = ts(e, a), h = ts(e, i), s = [];
          break;
        case "textarea":
          f = od(e, a), h = od(e, i), s = [];
          break;
        default:
          f = a, h = i, typeof f.onClick != "function" && typeof h.onClick == "function" && Hh(e);
          break;
      }
      gc(t, h);
      var m, E, T = null;
      for (m in f)
        if (!(h.hasOwnProperty(m) || !f.hasOwnProperty(m) || f[m] == null))
          if (m === Qs) {
            var O = f[m];
            for (E in O)
              O.hasOwnProperty(E) && (T || (T = {}), T[E] = "");
          } else m === pp || m === Gs || m === Nh || m === Lu || m === Z0 || (vt.hasOwnProperty(m) ? s || (s = []) : (s = s || []).push(m, null));
      for (m in h) {
        var D = h[m], j = f != null ? f[m] : void 0;
        if (!(!h.hasOwnProperty(m) || D === j || D == null && j == null))
          if (m === Qs)
            if (D && Object.freeze(D), j) {
              for (E in j)
                j.hasOwnProperty(E) && (!D || !D.hasOwnProperty(E)) && (T || (T = {}), T[E] = "");
              for (E in D)
                D.hasOwnProperty(E) && j[E] !== D[E] && (T || (T = {}), T[E] = D[E]);
            } else
              T || (s || (s = []), s.push(m, T)), T = D;
          else if (m === pp) {
            var P = D ? D[Ah] : void 0, B = j ? j[Ah] : void 0;
            P != null && B !== P && (s = s || []).push(m, P);
          } else m === Gs ? (typeof D == "string" || typeof D == "number") && (s = s || []).push(m, "" + D) : m === Nh || m === Lu || (vt.hasOwnProperty(m) ? (D != null && (typeof D != "function" && Uh(m, D), m === "onScroll" && zn("scroll", e)), !s && j !== D && (s = [])) : (s = s || []).push(m, D));
      }
      return T && (Sy(T, h[Qs]), (s = s || []).push(Qs, T)), s;
    }
    function Mw(e, t, a, i, o) {
      a === "input" && o.type === "radio" && o.name != null && y(e, o);
      var s = Ol(a, i), f = Ol(a, o);
      switch (_w(e, t, s, f), a) {
        case "input":
          b(e, o);
          break;
        case "textarea":
          hv(e, o);
          break;
        case "select":
          hc(e, o);
          break;
      }
    }
    function Lw(e) {
      {
        var t = e.toLowerCase();
        return ls.hasOwnProperty(t) && ls[t] || null;
      }
    }
    function Nw(e, t, a, i, o, s, f) {
      var h, m;
      switch (h = Ol(t, a), zh(t, a), t) {
        case "dialog":
          zn("cancel", e), zn("close", e);
          break;
        case "iframe":
        case "object":
        case "embed":
          zn("load", e);
          break;
        case "video":
        case "audio":
          for (var E = 0; E < cp.length; E++)
            zn(cp[E], e);
          break;
        case "source":
          zn("error", e);
          break;
        case "img":
        case "image":
        case "link":
          zn("error", e), zn("load", e);
          break;
        case "details":
          zn("toggle", e);
          break;
        case "input":
          ui(e, a), zn("invalid", e);
          break;
        case "option":
          Wt(e, a);
          break;
        case "select":
          po(e, a), zn("invalid", e);
          break;
        case "textarea":
          ud(e, a), zn("invalid", e);
          break;
      }
      gc(t, a);
      {
        m = /* @__PURE__ */ new Set();
        for (var T = e.attributes, O = 0; O < T.length; O++) {
          var D = T[O].name.toLowerCase();
          switch (D) {
            // Controlled attributes are not validated
            // TODO: Only ignore them on controlled tags.
            case "value":
              break;
            case "checked":
              break;
            case "selected":
              break;
            default:
              m.add(T[O].name);
          }
        }
      }
      var j = null;
      for (var P in a)
        if (a.hasOwnProperty(P)) {
          var B = a[P];
          if (P === Gs)
            typeof B == "string" ? e.textContent !== B && (a[Lu] !== !0 && Fh(e.textContent, B, s, f), j = [Gs, B]) : typeof B == "number" && e.textContent !== "" + B && (a[Lu] !== !0 && Fh(e.textContent, B, s, f), j = [Gs, "" + B]);
          else if (vt.hasOwnProperty(P))
            B != null && (typeof B != "function" && Uh(P, B), P === "onScroll" && zn("scroll", e));
          else if (f && // Convince Flow we've calculated it (it's DEV-only in this method.)
          typeof h == "boolean") {
            var he = void 0, $e = hn(P);
            if (a[Lu] !== !0) {
              if (!(P === Nh || P === Lu || // Controlled attributes are not validated
              // TODO: Only ignore them on controlled tags.
              P === "value" || P === "checked" || P === "selected")) {
                if (P === pp) {
                  var Ne = e.innerHTML, It = B ? B[Ah] : void 0;
                  if (It != null) {
                    var Ut = tE(e, It);
                    Ut !== Ne && vp(P, Ne, Ut);
                  }
                } else if (P === Qs) {
                  if (m.delete(P), eE) {
                    var A = yy(B);
                    he = e.getAttribute("style"), A !== he && vp(P, he, A);
                  }
                } else if (h && !L)
                  m.delete(P.toLowerCase()), he = gi(e, P, B), B !== he && vp(P, he, B);
                else if (!en(P, $e, h) && !Xn(P, B, $e, h)) {
                  var $ = !1;
                  if ($e !== null)
                    m.delete($e.attributeName), he = ei(e, P, B, $e);
                  else {
                    var z = i;
                    if (z === Zi && (z = fd(t)), z === Zi)
                      m.delete(P.toLowerCase());
                    else {
                      var ae = Lw(P);
                      ae !== null && ae !== P && ($ = !0, m.delete(ae)), m.delete(P);
                    }
                    he = gi(e, P, B);
                  }
                  var Te = L;
                  !Te && B !== he && !$ && vp(P, he, B);
                }
              }
            }
          }
        }
      switch (f && // $FlowFixMe - Should be inferred as not undefined.
      m.size > 0 && a[Lu] !== !0 && J0(m), t) {
        case "input":
          oi(e), F(e, a, !0);
          break;
        case "textarea":
          oi(e), mv(e);
          break;
        case "select":
        case "option":
          break;
        default:
          typeof a.onClick == "function" && Hh(e);
          break;
      }
      return j;
    }
    function Aw(e, t, a) {
      var i = e.nodeValue !== t;
      return i;
    }
    function Gy(e, t) {
      {
        if (Wa)
          return;
        Wa = !0, C("Did not expect server HTML to contain a <%s> in <%s>.", t.nodeName.toLowerCase(), e.nodeName.toLowerCase());
      }
    }
    function Qy(e, t) {
      {
        if (Wa)
          return;
        Wa = !0, C('Did not expect server HTML to contain the text node "%s" in <%s>.', t.nodeValue, e.nodeName.toLowerCase());
      }
    }
    function Xy(e, t, a) {
      {
        if (Wa)
          return;
        Wa = !0, C("Expected server HTML to contain a matching <%s> in <%s>.", t, e.nodeName.toLowerCase());
      }
    }
    function Ky(e, t) {
      {
        if (t === "" || Wa)
          return;
        Wa = !0, C('Expected server HTML to contain a matching text node for "%s" in <%s>.', t, e.nodeName.toLowerCase());
      }
    }
    function zw(e, t, a) {
      switch (t) {
        case "input":
          V(e, a);
          return;
        case "textarea":
          py(e, a);
          return;
        case "select":
          ld(e, a);
          return;
      }
    }
    var hp = function() {
    }, mp = function() {
    };
    {
      var Uw = ["address", "applet", "area", "article", "aside", "base", "basefont", "bgsound", "blockquote", "body", "br", "button", "caption", "center", "col", "colgroup", "dd", "details", "dir", "div", "dl", "dt", "embed", "fieldset", "figcaption", "figure", "footer", "form", "frame", "frameset", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "iframe", "img", "input", "isindex", "li", "link", "listing", "main", "marquee", "menu", "menuitem", "meta", "nav", "noembed", "noframes", "noscript", "object", "ol", "p", "param", "plaintext", "pre", "script", "section", "select", "source", "style", "summary", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "title", "tr", "track", "ul", "wbr", "xmp"], rE = [
        "applet",
        "caption",
        "html",
        "table",
        "td",
        "th",
        "marquee",
        "object",
        "template",
        // https://html.spec.whatwg.org/multipage/syntax.html#html-integration-point
        // TODO: Distinguish by namespace here -- for <title>, including it here
        // errs on the side of fewer warnings
        "foreignObject",
        "desc",
        "title"
      ], jw = rE.concat(["button"]), Fw = ["dd", "dt", "li", "option", "optgroup", "p", "rp", "rt"], aE = {
        current: null,
        formTag: null,
        aTagInScope: null,
        buttonTagInScope: null,
        nobrTagInScope: null,
        pTagInButtonScope: null,
        listItemTagAutoclosing: null,
        dlItemTagAutoclosing: null
      };
      mp = function(e, t) {
        var a = Tt({}, e || aE), i = {
          tag: t
        };
        return rE.indexOf(t) !== -1 && (a.aTagInScope = null, a.buttonTagInScope = null, a.nobrTagInScope = null), jw.indexOf(t) !== -1 && (a.pTagInButtonScope = null), Uw.indexOf(t) !== -1 && t !== "address" && t !== "div" && t !== "p" && (a.listItemTagAutoclosing = null, a.dlItemTagAutoclosing = null), a.current = i, t === "form" && (a.formTag = i), t === "a" && (a.aTagInScope = i), t === "button" && (a.buttonTagInScope = i), t === "nobr" && (a.nobrTagInScope = i), t === "p" && (a.pTagInButtonScope = i), t === "li" && (a.listItemTagAutoclosing = i), (t === "dd" || t === "dt") && (a.dlItemTagAutoclosing = i), a;
      };
      var Hw = function(e, t) {
        switch (t) {
          // https://html.spec.whatwg.org/multipage/syntax.html#parsing-main-inselect
          case "select":
            return e === "option" || e === "optgroup" || e === "#text";
          case "optgroup":
            return e === "option" || e === "#text";
          // Strictly speaking, seeing an <option> doesn't mean we're in a <select>
          // but
          case "option":
            return e === "#text";
          // https://html.spec.whatwg.org/multipage/syntax.html#parsing-main-intd
          // https://html.spec.whatwg.org/multipage/syntax.html#parsing-main-incaption
          // No special behavior since these rules fall back to "in body" mode for
          // all except special table nodes which cause bad parsing behavior anyway.
          // https://html.spec.whatwg.org/multipage/syntax.html#parsing-main-intr
          case "tr":
            return e === "th" || e === "td" || e === "style" || e === "script" || e === "template";
          // https://html.spec.whatwg.org/multipage/syntax.html#parsing-main-intbody
          case "tbody":
          case "thead":
          case "tfoot":
            return e === "tr" || e === "style" || e === "script" || e === "template";
          // https://html.spec.whatwg.org/multipage/syntax.html#parsing-main-incolgroup
          case "colgroup":
            return e === "col" || e === "template";
          // https://html.spec.whatwg.org/multipage/syntax.html#parsing-main-intable
          case "table":
            return e === "caption" || e === "colgroup" || e === "tbody" || e === "tfoot" || e === "thead" || e === "style" || e === "script" || e === "template";
          // https://html.spec.whatwg.org/multipage/syntax.html#parsing-main-inhead
          case "head":
            return e === "base" || e === "basefont" || e === "bgsound" || e === "link" || e === "meta" || e === "title" || e === "noscript" || e === "noframes" || e === "style" || e === "script" || e === "template";
          // https://html.spec.whatwg.org/multipage/semantics.html#the-html-element
          case "html":
            return e === "head" || e === "body" || e === "frameset";
          case "frameset":
            return e === "frame";
          case "#document":
            return e === "html";
        }
        switch (e) {
          case "h1":
          case "h2":
          case "h3":
          case "h4":
          case "h5":
          case "h6":
            return t !== "h1" && t !== "h2" && t !== "h3" && t !== "h4" && t !== "h5" && t !== "h6";
          case "rp":
          case "rt":
            return Fw.indexOf(t) === -1;
          case "body":
          case "caption":
          case "col":
          case "colgroup":
          case "frameset":
          case "frame":
          case "head":
          case "html":
          case "tbody":
          case "td":
          case "tfoot":
          case "th":
          case "thead":
          case "tr":
            return t == null;
        }
        return !0;
      }, Pw = function(e, t) {
        switch (e) {
          case "address":
          case "article":
          case "aside":
          case "blockquote":
          case "center":
          case "details":
          case "dialog":
          case "dir":
          case "div":
          case "dl":
          case "fieldset":
          case "figcaption":
          case "figure":
          case "footer":
          case "header":
          case "hgroup":
          case "main":
          case "menu":
          case "nav":
          case "ol":
          case "p":
          case "section":
          case "summary":
          case "ul":
          case "pre":
          case "listing":
          case "table":
          case "hr":
          case "xmp":
          case "h1":
          case "h2":
          case "h3":
          case "h4":
          case "h5":
          case "h6":
            return t.pTagInButtonScope;
          case "form":
            return t.formTag || t.pTagInButtonScope;
          case "li":
            return t.listItemTagAutoclosing;
          case "dd":
          case "dt":
            return t.dlItemTagAutoclosing;
          case "button":
            return t.buttonTagInScope;
          case "a":
            return t.aTagInScope;
          case "nobr":
            return t.nobrTagInScope;
        }
        return null;
      }, iE = {};
      hp = function(e, t, a) {
        a = a || aE;
        var i = a.current, o = i && i.tag;
        t != null && (e != null && C("validateDOMNesting: when childText is passed, childTag should be null"), e = "#text");
        var s = Hw(e, o) ? null : i, f = s ? null : Pw(e, a), h = s || f;
        if (h) {
          var m = h.tag, E = !!s + "|" + e + "|" + m;
          if (!iE[E]) {
            iE[E] = !0;
            var T = e, O = "";
            if (e === "#text" ? /\S/.test(t) ? T = "Text nodes" : (T = "Whitespace text nodes", O = " Make sure you don't have any extra whitespace between tags on each line of your source code.") : T = "<" + e + ">", s) {
              var D = "";
              m === "table" && e === "tr" && (D += " Add a <tbody>, <thead> or <tfoot> to your code to match the DOM tree generated by the browser."), C("validateDOMNesting(...): %s cannot appear as a child of <%s>.%s%s", T, m, O, D);
            } else
              C("validateDOMNesting(...): %s cannot appear as a descendant of <%s>.", T, m);
          }
        }
      };
    }
    var Ph = "suppressHydrationWarning", Vh = "$", Bh = "/$", yp = "$?", gp = "$!", Vw = "style", qy = null, Zy = null;
    function Bw(e) {
      var t, a, i = e.nodeType;
      switch (i) {
        case el:
        case pd: {
          t = i === el ? "#document" : "#fragment";
          var o = e.documentElement;
          a = o ? o.namespaceURI : dd(null, "");
          break;
        }
        default: {
          var s = i === qn ? e.parentNode : e, f = s.namespaceURI || null;
          t = s.tagName, a = dd(f, t);
          break;
        }
      }
      {
        var h = t.toLowerCase(), m = mp(null, h);
        return {
          namespace: a,
          ancestorInfo: m
        };
      }
    }
    function $w(e, t, a) {
      {
        var i = e, o = dd(i.namespace, t), s = mp(i.ancestorInfo, t);
        return {
          namespace: o,
          ancestorInfo: s
        };
      }
    }
    function hO(e) {
      return e;
    }
    function Iw(e) {
      qy = rr(), Zy = aw();
      var t = null;
      return cr(!1), t;
    }
    function Yw(e) {
      iw(Zy), cr(qy), qy = null, Zy = null;
    }
    function Ww(e, t, a, i, o) {
      var s;
      {
        var f = i;
        if (hp(e, null, f.ancestorInfo), typeof t.children == "string" || typeof t.children == "number") {
          var h = "" + t.children, m = mp(f.ancestorInfo, e);
          hp(null, h, m);
        }
        s = f.namespace;
      }
      var E = xw(e, t, a, s);
      return Cp(o, E), lg(E, t), E;
    }
    function Gw(e, t) {
      e.appendChild(t);
    }
    function Qw(e, t, a, i, o) {
      switch (kw(e, t, a, i), t) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          return !!a.autoFocus;
        case "img":
          return !0;
        default:
          return !1;
      }
    }
    function Xw(e, t, a, i, o, s) {
      {
        var f = s;
        if (typeof i.children != typeof a.children && (typeof i.children == "string" || typeof i.children == "number")) {
          var h = "" + i.children, m = mp(f.ancestorInfo, t);
          hp(null, h, m);
        }
      }
      return Ow(e, t, a, i);
    }
    function Jy(e, t) {
      return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
    }
    function Kw(e, t, a, i) {
      {
        var o = a;
        hp(null, e, o.ancestorInfo);
      }
      var s = Dw(e, t);
      return Cp(i, s), s;
    }
    function qw() {
      var e = window.event;
      return e === void 0 ? Ba : df(e.type);
    }
    var eg = typeof setTimeout == "function" ? setTimeout : void 0, Zw = typeof clearTimeout == "function" ? clearTimeout : void 0, tg = -1, lE = typeof Promise == "function" ? Promise : void 0, Jw = typeof queueMicrotask == "function" ? queueMicrotask : typeof lE < "u" ? function(e) {
      return lE.resolve(null).then(e).catch(eb);
    } : eg;
    function eb(e) {
      setTimeout(function() {
        throw e;
      });
    }
    function tb(e, t, a, i) {
      switch (t) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          a.autoFocus && e.focus();
          return;
        case "img": {
          a.src && (e.src = a.src);
          return;
        }
      }
    }
    function nb(e, t, a, i, o, s) {
      Mw(e, t, a, i, o), lg(e, o);
    }
    function oE(e) {
      su(e, "");
    }
    function rb(e, t, a) {
      e.nodeValue = a;
    }
    function ab(e, t) {
      e.appendChild(t);
    }
    function ib(e, t) {
      var a;
      e.nodeType === qn ? (a = e.parentNode, a.insertBefore(t, e)) : (a = e, a.appendChild(t));
      var i = e._reactRootContainer;
      i == null && a.onclick === null && Hh(a);
    }
    function lb(e, t, a) {
      e.insertBefore(t, a);
    }
    function ob(e, t, a) {
      e.nodeType === qn ? e.parentNode.insertBefore(t, a) : e.insertBefore(t, a);
    }
    function ub(e, t) {
      e.removeChild(t);
    }
    function sb(e, t) {
      e.nodeType === qn ? e.parentNode.removeChild(t) : e.removeChild(t);
    }
    function ng(e, t) {
      var a = t, i = 0;
      do {
        var o = a.nextSibling;
        if (e.removeChild(a), o && o.nodeType === qn) {
          var s = o.data;
          if (s === Bh)
            if (i === 0) {
              e.removeChild(o), Ao(t);
              return;
            } else
              i--;
          else (s === Vh || s === yp || s === gp) && i++;
        }
        a = o;
      } while (a);
      Ao(t);
    }
    function cb(e, t) {
      e.nodeType === qn ? ng(e.parentNode, t) : e.nodeType === ia && ng(e, t), Ao(e);
    }
    function fb(e) {
      e = e;
      var t = e.style;
      typeof t.setProperty == "function" ? t.setProperty("display", "none", "important") : t.display = "none";
    }
    function db(e) {
      e.nodeValue = "";
    }
    function pb(e, t) {
      e = e;
      var a = t[Vw], i = a != null && a.hasOwnProperty("display") ? a.display : null;
      e.style.display = yc("display", i);
    }
    function vb(e, t) {
      e.nodeValue = t;
    }
    function hb(e) {
      e.nodeType === ia ? e.textContent = "" : e.nodeType === el && e.documentElement && e.removeChild(e.documentElement);
    }
    function mb(e, t, a) {
      return e.nodeType !== ia || t.toLowerCase() !== e.nodeName.toLowerCase() ? null : e;
    }
    function yb(e, t) {
      return t === "" || e.nodeType !== Ji ? null : e;
    }
    function gb(e) {
      return e.nodeType !== qn ? null : e;
    }
    function uE(e) {
      return e.data === yp;
    }
    function rg(e) {
      return e.data === gp;
    }
    function Sb(e) {
      var t = e.nextSibling && e.nextSibling.dataset, a, i, o;
      return t && (a = t.dgst, i = t.msg, o = t.stck), {
        message: i,
        digest: a,
        stack: o
      };
    }
    function Eb(e, t) {
      e._reactRetry = t;
    }
    function $h(e) {
      for (; e != null; e = e.nextSibling) {
        var t = e.nodeType;
        if (t === ia || t === Ji)
          break;
        if (t === qn) {
          var a = e.data;
          if (a === Vh || a === gp || a === yp)
            break;
          if (a === Bh)
            return null;
        }
      }
      return e;
    }
    function Sp(e) {
      return $h(e.nextSibling);
    }
    function Cb(e) {
      return $h(e.firstChild);
    }
    function Tb(e) {
      return $h(e.firstChild);
    }
    function Rb(e) {
      return $h(e.nextSibling);
    }
    function wb(e, t, a, i, o, s, f) {
      Cp(s, e), lg(e, a);
      var h;
      {
        var m = o;
        h = m.namespace;
      }
      var E = (s.mode & kt) !== Pe;
      return Nw(e, t, a, h, i, E, f);
    }
    function bb(e, t, a, i) {
      return Cp(a, e), a.mode & kt, Aw(e, t);
    }
    function _b(e, t) {
      Cp(t, e);
    }
    function xb(e) {
      for (var t = e.nextSibling, a = 0; t; ) {
        if (t.nodeType === qn) {
          var i = t.data;
          if (i === Bh) {
            if (a === 0)
              return Sp(t);
            a--;
          } else (i === Vh || i === gp || i === yp) && a++;
        }
        t = t.nextSibling;
      }
      return null;
    }
    function sE(e) {
      for (var t = e.previousSibling, a = 0; t; ) {
        if (t.nodeType === qn) {
          var i = t.data;
          if (i === Vh || i === gp || i === yp) {
            if (a === 0)
              return t;
            a--;
          } else i === Bh && a++;
        }
        t = t.previousSibling;
      }
      return null;
    }
    function Db(e) {
      Ao(e);
    }
    function kb(e) {
      Ao(e);
    }
    function Ob(e) {
      return e !== "head" && e !== "body";
    }
    function Mb(e, t, a, i) {
      var o = !0;
      Fh(t.nodeValue, a, i, o);
    }
    function Lb(e, t, a, i, o, s) {
      if (t[Ph] !== !0) {
        var f = !0;
        Fh(i.nodeValue, o, s, f);
      }
    }
    function Nb(e, t) {
      t.nodeType === ia ? Gy(e, t) : t.nodeType === qn || Qy(e, t);
    }
    function Ab(e, t) {
      {
        var a = e.parentNode;
        a !== null && (t.nodeType === ia ? Gy(a, t) : t.nodeType === qn || Qy(a, t));
      }
    }
    function zb(e, t, a, i, o) {
      (o || t[Ph] !== !0) && (i.nodeType === ia ? Gy(a, i) : i.nodeType === qn || Qy(a, i));
    }
    function Ub(e, t, a) {
      Xy(e, t);
    }
    function jb(e, t) {
      Ky(e, t);
    }
    function Fb(e, t, a) {
      {
        var i = e.parentNode;
        i !== null && Xy(i, t);
      }
    }
    function Hb(e, t) {
      {
        var a = e.parentNode;
        a !== null && Ky(a, t);
      }
    }
    function Pb(e, t, a, i, o, s) {
      (s || t[Ph] !== !0) && Xy(a, i);
    }
    function Vb(e, t, a, i, o) {
      (o || t[Ph] !== !0) && Ky(a, i);
    }
    function Bb(e) {
      C("An error occurred during hydration. The server HTML was replaced with client content in <%s>.", e.nodeName.toLowerCase());
    }
    function $b(e) {
      fp(e);
    }
    var _f = Math.random().toString(36).slice(2), xf = "__reactFiber$" + _f, ag = "__reactProps$" + _f, Ep = "__reactContainer$" + _f, ig = "__reactEvents$" + _f, Ib = "__reactListeners$" + _f, Yb = "__reactHandles$" + _f;
    function Wb(e) {
      delete e[xf], delete e[ag], delete e[ig], delete e[Ib], delete e[Yb];
    }
    function Cp(e, t) {
      t[xf] = e;
    }
    function Ih(e, t) {
      t[Ep] = e;
    }
    function cE(e) {
      e[Ep] = null;
    }
    function Tp(e) {
      return !!e[Ep];
    }
    function Xs(e) {
      var t = e[xf];
      if (t)
        return t;
      for (var a = e.parentNode; a; ) {
        if (t = a[Ep] || a[xf], t) {
          var i = t.alternate;
          if (t.child !== null || i !== null && i.child !== null)
            for (var o = sE(e); o !== null; ) {
              var s = o[xf];
              if (s)
                return s;
              o = sE(o);
            }
          return t;
        }
        e = a, a = e.parentNode;
      }
      return null;
    }
    function Nu(e) {
      var t = e[xf] || e[Ep];
      return t && (t.tag === oe || t.tag === Ue || t.tag === _e || t.tag === J) ? t : null;
    }
    function Df(e) {
      if (e.tag === oe || e.tag === Ue)
        return e.stateNode;
      throw new Error("getNodeFromInstance: Invalid argument.");
    }
    function Yh(e) {
      return e[ag] || null;
    }
    function lg(e, t) {
      e[ag] = t;
    }
    function Gb(e) {
      var t = e[ig];
      return t === void 0 && (t = e[ig] = /* @__PURE__ */ new Set()), t;
    }
    var fE = {}, dE = v.ReactDebugCurrentFrame;
    function Wh(e) {
      if (e) {
        var t = e._owner, a = Xi(e.type, e._source, t ? t.type : null);
        dE.setExtraStackFrame(a);
      } else
        dE.setExtraStackFrame(null);
    }
    function fl(e, t, a, i, o) {
      {
        var s = Function.call.bind(Qn);
        for (var f in e)
          if (s(e, f)) {
            var h = void 0;
            try {
              if (typeof e[f] != "function") {
                var m = Error((i || "React class") + ": " + a + " type `" + f + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof e[f] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw m.name = "Invariant Violation", m;
              }
              h = e[f](t, f, i, a, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (E) {
              h = E;
            }
            h && !(h instanceof Error) && (Wh(o), C("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", i || "React class", a, f, typeof h), Wh(null)), h instanceof Error && !(h.message in fE) && (fE[h.message] = !0, Wh(o), C("Failed %s type: %s", a, h.message), Wh(null));
          }
      }
    }
    var og = [], Gh;
    Gh = [];
    var Po = -1;
    function Au(e) {
      return {
        current: e
      };
    }
    function ma(e, t) {
      if (Po < 0) {
        C("Unexpected pop.");
        return;
      }
      t !== Gh[Po] && C("Unexpected Fiber popped."), e.current = og[Po], og[Po] = null, Gh[Po] = null, Po--;
    }
    function ya(e, t, a) {
      Po++, og[Po] = e.current, Gh[Po] = a, e.current = t;
    }
    var ug;
    ug = {};
    var hi = {};
    Object.freeze(hi);
    var Vo = Au(hi), Kl = Au(!1), sg = hi;
    function kf(e, t, a) {
      return a && ql(t) ? sg : Vo.current;
    }
    function pE(e, t, a) {
      {
        var i = e.stateNode;
        i.__reactInternalMemoizedUnmaskedChildContext = t, i.__reactInternalMemoizedMaskedChildContext = a;
      }
    }
    function Of(e, t) {
      {
        var a = e.type, i = a.contextTypes;
        if (!i)
          return hi;
        var o = e.stateNode;
        if (o && o.__reactInternalMemoizedUnmaskedChildContext === t)
          return o.__reactInternalMemoizedMaskedChildContext;
        var s = {};
        for (var f in i)
          s[f] = t[f];
        {
          var h = ot(e) || "Unknown";
          fl(i, s, "context", h);
        }
        return o && pE(e, t, s), s;
      }
    }
    function Qh() {
      return Kl.current;
    }
    function ql(e) {
      {
        var t = e.childContextTypes;
        return t != null;
      }
    }
    function Xh(e) {
      ma(Kl, e), ma(Vo, e);
    }
    function cg(e) {
      ma(Kl, e), ma(Vo, e);
    }
    function vE(e, t, a) {
      {
        if (Vo.current !== hi)
          throw new Error("Unexpected context found on stack. This error is likely caused by a bug in React. Please file an issue.");
        ya(Vo, t, e), ya(Kl, a, e);
      }
    }
    function hE(e, t, a) {
      {
        var i = e.stateNode, o = t.childContextTypes;
        if (typeof i.getChildContext != "function") {
          {
            var s = ot(e) || "Unknown";
            ug[s] || (ug[s] = !0, C("%s.childContextTypes is specified but there is no getChildContext() method on the instance. You can either define getChildContext() on %s or remove childContextTypes from it.", s, s));
          }
          return a;
        }
        var f = i.getChildContext();
        for (var h in f)
          if (!(h in o))
            throw new Error((ot(e) || "Unknown") + '.getChildContext(): key "' + h + '" is not defined in childContextTypes.');
        {
          var m = ot(e) || "Unknown";
          fl(o, f, "child context", m);
        }
        return Tt({}, a, f);
      }
    }
    function Kh(e) {
      {
        var t = e.stateNode, a = t && t.__reactInternalMemoizedMergedChildContext || hi;
        return sg = Vo.current, ya(Vo, a, e), ya(Kl, Kl.current, e), !0;
      }
    }
    function mE(e, t, a) {
      {
        var i = e.stateNode;
        if (!i)
          throw new Error("Expected to have an instance by this point. This error is likely caused by a bug in React. Please file an issue.");
        if (a) {
          var o = hE(e, t, sg);
          i.__reactInternalMemoizedMergedChildContext = o, ma(Kl, e), ma(Vo, e), ya(Vo, o, e), ya(Kl, a, e);
        } else
          ma(Kl, e), ya(Kl, a, e);
      }
    }
    function Qb(e) {
      {
        if (!Eo(e) || e.tag !== W)
          throw new Error("Expected subtree parent to be a mounted class component. This error is likely caused by a bug in React. Please file an issue.");
        var t = e;
        do {
          switch (t.tag) {
            case J:
              return t.stateNode.context;
            case W: {
              var a = t.type;
              if (ql(a))
                return t.stateNode.__reactInternalMemoizedMergedChildContext;
              break;
            }
          }
          t = t.return;
        } while (t !== null);
        throw new Error("Found unexpected detached subtree parent. This error is likely caused by a bug in React. Please file an issue.");
      }
    }
    var zu = 0, qh = 1, Bo = null, fg = !1, dg = !1;
    function yE(e) {
      Bo === null ? Bo = [e] : Bo.push(e);
    }
    function Xb(e) {
      fg = !0, yE(e);
    }
    function gE() {
      fg && Uu();
    }
    function Uu() {
      if (!dg && Bo !== null) {
        dg = !0;
        var e = 0, t = Ia();
        try {
          var a = !0, i = Bo;
          for (nr(Ir); e < i.length; e++) {
            var o = i[e];
            do
              o = o(a);
            while (o !== null);
          }
          Bo = null, fg = !1;
        } catch (s) {
          throw Bo !== null && (Bo = Bo.slice(e + 1)), bd(vs, Uu), s;
        } finally {
          nr(t), dg = !1;
        }
      }
      return null;
    }
    var Mf = [], Lf = 0, Zh = null, Jh = 0, Hi = [], Pi = 0, Ks = null, $o = 1, Io = "";
    function Kb(e) {
      return Zs(), (e.flags & ki) !== He;
    }
    function qb(e) {
      return Zs(), Jh;
    }
    function Zb() {
      var e = Io, t = $o, a = t & ~Jb(t);
      return a.toString(32) + e;
    }
    function qs(e, t) {
      Zs(), Mf[Lf++] = Jh, Mf[Lf++] = Zh, Zh = e, Jh = t;
    }
    function SE(e, t, a) {
      Zs(), Hi[Pi++] = $o, Hi[Pi++] = Io, Hi[Pi++] = Ks, Ks = e;
      var i = $o, o = Io, s = em(i) - 1, f = i & ~(1 << s), h = a + 1, m = em(t) + s;
      if (m > 30) {
        var E = s - s % 5, T = (1 << E) - 1, O = (f & T).toString(32), D = f >> E, j = s - E, P = em(t) + j, B = h << j, he = B | D, $e = O + o;
        $o = 1 << P | he, Io = $e;
      } else {
        var Ne = h << s, It = Ne | f, Ut = o;
        $o = 1 << m | It, Io = Ut;
      }
    }
    function pg(e) {
      Zs();
      var t = e.return;
      if (t !== null) {
        var a = 1, i = 0;
        qs(e, a), SE(e, a, i);
      }
    }
    function em(e) {
      return 32 - er(e);
    }
    function Jb(e) {
      return 1 << em(e) - 1;
    }
    function vg(e) {
      for (; e === Zh; )
        Zh = Mf[--Lf], Mf[Lf] = null, Jh = Mf[--Lf], Mf[Lf] = null;
      for (; e === Ks; )
        Ks = Hi[--Pi], Hi[Pi] = null, Io = Hi[--Pi], Hi[Pi] = null, $o = Hi[--Pi], Hi[Pi] = null;
    }
    function e_() {
      return Zs(), Ks !== null ? {
        id: $o,
        overflow: Io
      } : null;
    }
    function t_(e, t) {
      Zs(), Hi[Pi++] = $o, Hi[Pi++] = Io, Hi[Pi++] = Ks, $o = t.id, Io = t.overflow, Ks = e;
    }
    function Zs() {
      Xr() || C("Expected to be hydrating. This is a bug in React. Please file an issue.");
    }
    var Qr = null, Vi = null, dl = !1, Js = !1, ju = null;
    function n_() {
      dl && C("We should not be hydrating here. This is a bug in React. Please file a bug.");
    }
    function EE() {
      Js = !0;
    }
    function r_() {
      return Js;
    }
    function a_(e) {
      var t = e.stateNode.containerInfo;
      return Vi = Tb(t), Qr = e, dl = !0, ju = null, Js = !1, !0;
    }
    function i_(e, t, a) {
      return Vi = Rb(t), Qr = e, dl = !0, ju = null, Js = !1, a !== null && t_(e, a), !0;
    }
    function CE(e, t) {
      switch (e.tag) {
        case J: {
          Nb(e.stateNode.containerInfo, t);
          break;
        }
        case oe: {
          var a = (e.mode & kt) !== Pe;
          zb(
            e.type,
            e.memoizedProps,
            e.stateNode,
            t,
            // TODO: Delete this argument when we remove the legacy root API.
            a
          );
          break;
        }
        case _e: {
          var i = e.memoizedState;
          i.dehydrated !== null && Ab(i.dehydrated, t);
          break;
        }
      }
    }
    function TE(e, t) {
      CE(e, t);
      var a = sD();
      a.stateNode = t, a.return = e;
      var i = e.deletions;
      i === null ? (e.deletions = [a], e.flags |= ja) : i.push(a);
    }
    function hg(e, t) {
      {
        if (Js)
          return;
        switch (e.tag) {
          case J: {
            var a = e.stateNode.containerInfo;
            switch (t.tag) {
              case oe:
                var i = t.type;
                t.pendingProps, Ub(a, i);
                break;
              case Ue:
                var o = t.pendingProps;
                jb(a, o);
                break;
            }
            break;
          }
          case oe: {
            var s = e.type, f = e.memoizedProps, h = e.stateNode;
            switch (t.tag) {
              case oe: {
                var m = t.type, E = t.pendingProps, T = (e.mode & kt) !== Pe;
                Pb(
                  s,
                  f,
                  h,
                  m,
                  E,
                  // TODO: Delete this argument when we remove the legacy root API.
                  T
                );
                break;
              }
              case Ue: {
                var O = t.pendingProps, D = (e.mode & kt) !== Pe;
                Vb(
                  s,
                  f,
                  h,
                  O,
                  // TODO: Delete this argument when we remove the legacy root API.
                  D
                );
                break;
              }
            }
            break;
          }
          case _e: {
            var j = e.memoizedState, P = j.dehydrated;
            if (P !== null) switch (t.tag) {
              case oe:
                var B = t.type;
                t.pendingProps, Fb(P, B);
                break;
              case Ue:
                var he = t.pendingProps;
                Hb(P, he);
                break;
            }
            break;
          }
          default:
            return;
        }
      }
    }
    function RE(e, t) {
      t.flags = t.flags & ~oa | Ln, hg(e, t);
    }
    function wE(e, t) {
      switch (e.tag) {
        case oe: {
          var a = e.type;
          e.pendingProps;
          var i = mb(t, a);
          return i !== null ? (e.stateNode = i, Qr = e, Vi = Cb(i), !0) : !1;
        }
        case Ue: {
          var o = e.pendingProps, s = yb(t, o);
          return s !== null ? (e.stateNode = s, Qr = e, Vi = null, !0) : !1;
        }
        case _e: {
          var f = gb(t);
          if (f !== null) {
            var h = {
              dehydrated: f,
              treeContext: e_(),
              retryLane: fa
            };
            e.memoizedState = h;
            var m = cD(f);
            return m.return = e, e.child = m, Qr = e, Vi = null, !0;
          }
          return !1;
        }
        default:
          return !1;
      }
    }
    function mg(e) {
      return (e.mode & kt) !== Pe && (e.flags & ze) === He;
    }
    function yg(e) {
      throw new Error("Hydration failed because the initial UI does not match what was rendered on the server.");
    }
    function gg(e) {
      if (dl) {
        var t = Vi;
        if (!t) {
          mg(e) && (hg(Qr, e), yg()), RE(Qr, e), dl = !1, Qr = e;
          return;
        }
        var a = t;
        if (!wE(e, t)) {
          mg(e) && (hg(Qr, e), yg()), t = Sp(a);
          var i = Qr;
          if (!t || !wE(e, t)) {
            RE(Qr, e), dl = !1, Qr = e;
            return;
          }
          TE(i, a);
        }
      }
    }
    function l_(e, t, a) {
      var i = e.stateNode, o = !Js, s = wb(i, e.type, e.memoizedProps, t, a, e, o);
      return e.updateQueue = s, s !== null;
    }
    function o_(e) {
      var t = e.stateNode, a = e.memoizedProps, i = bb(t, a, e);
      if (i) {
        var o = Qr;
        if (o !== null)
          switch (o.tag) {
            case J: {
              var s = o.stateNode.containerInfo, f = (o.mode & kt) !== Pe;
              Mb(
                s,
                t,
                a,
                // TODO: Delete this argument when we remove the legacy root API.
                f
              );
              break;
            }
            case oe: {
              var h = o.type, m = o.memoizedProps, E = o.stateNode, T = (o.mode & kt) !== Pe;
              Lb(
                h,
                m,
                E,
                t,
                a,
                // TODO: Delete this argument when we remove the legacy root API.
                T
              );
              break;
            }
          }
      }
      return i;
    }
    function u_(e) {
      var t = e.memoizedState, a = t !== null ? t.dehydrated : null;
      if (!a)
        throw new Error("Expected to have a hydrated suspense instance. This error is likely caused by a bug in React. Please file an issue.");
      _b(a, e);
    }
    function s_(e) {
      var t = e.memoizedState, a = t !== null ? t.dehydrated : null;
      if (!a)
        throw new Error("Expected to have a hydrated suspense instance. This error is likely caused by a bug in React. Please file an issue.");
      return xb(a);
    }
    function bE(e) {
      for (var t = e.return; t !== null && t.tag !== oe && t.tag !== J && t.tag !== _e; )
        t = t.return;
      Qr = t;
    }
    function tm(e) {
      if (e !== Qr)
        return !1;
      if (!dl)
        return bE(e), dl = !0, !1;
      if (e.tag !== J && (e.tag !== oe || Ob(e.type) && !Jy(e.type, e.memoizedProps))) {
        var t = Vi;
        if (t)
          if (mg(e))
            _E(e), yg();
          else
            for (; t; )
              TE(e, t), t = Sp(t);
      }
      return bE(e), e.tag === _e ? Vi = s_(e) : Vi = Qr ? Sp(e.stateNode) : null, !0;
    }
    function c_() {
      return dl && Vi !== null;
    }
    function _E(e) {
      for (var t = Vi; t; )
        CE(e, t), t = Sp(t);
    }
    function Nf() {
      Qr = null, Vi = null, dl = !1, Js = !1;
    }
    function xE() {
      ju !== null && (ET(ju), ju = null);
    }
    function Xr() {
      return dl;
    }
    function Sg(e) {
      ju === null ? ju = [e] : ju.push(e);
    }
    var f_ = v.ReactCurrentBatchConfig, d_ = null;
    function p_() {
      return f_.transition;
    }
    var pl = {
      recordUnsafeLifecycleWarnings: function(e, t) {
      },
      flushPendingUnsafeLifecycleWarnings: function() {
      },
      recordLegacyContextWarning: function(e, t) {
      },
      flushLegacyContextWarning: function() {
      },
      discardPendingWarnings: function() {
      }
    };
    {
      var v_ = function(e) {
        for (var t = null, a = e; a !== null; )
          a.mode & Sn && (t = a), a = a.return;
        return t;
      }, ec = function(e) {
        var t = [];
        return e.forEach(function(a) {
          t.push(a);
        }), t.sort().join(", ");
      }, Rp = [], wp = [], bp = [], _p = [], xp = [], Dp = [], tc = /* @__PURE__ */ new Set();
      pl.recordUnsafeLifecycleWarnings = function(e, t) {
        tc.has(e.type) || (typeof t.componentWillMount == "function" && // Don't warn about react-lifecycles-compat polyfilled components.
        t.componentWillMount.__suppressDeprecationWarning !== !0 && Rp.push(e), e.mode & Sn && typeof t.UNSAFE_componentWillMount == "function" && wp.push(e), typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps.__suppressDeprecationWarning !== !0 && bp.push(e), e.mode & Sn && typeof t.UNSAFE_componentWillReceiveProps == "function" && _p.push(e), typeof t.componentWillUpdate == "function" && t.componentWillUpdate.__suppressDeprecationWarning !== !0 && xp.push(e), e.mode & Sn && typeof t.UNSAFE_componentWillUpdate == "function" && Dp.push(e));
      }, pl.flushPendingUnsafeLifecycleWarnings = function() {
        var e = /* @__PURE__ */ new Set();
        Rp.length > 0 && (Rp.forEach(function(D) {
          e.add(ot(D) || "Component"), tc.add(D.type);
        }), Rp = []);
        var t = /* @__PURE__ */ new Set();
        wp.length > 0 && (wp.forEach(function(D) {
          t.add(ot(D) || "Component"), tc.add(D.type);
        }), wp = []);
        var a = /* @__PURE__ */ new Set();
        bp.length > 0 && (bp.forEach(function(D) {
          a.add(ot(D) || "Component"), tc.add(D.type);
        }), bp = []);
        var i = /* @__PURE__ */ new Set();
        _p.length > 0 && (_p.forEach(function(D) {
          i.add(ot(D) || "Component"), tc.add(D.type);
        }), _p = []);
        var o = /* @__PURE__ */ new Set();
        xp.length > 0 && (xp.forEach(function(D) {
          o.add(ot(D) || "Component"), tc.add(D.type);
        }), xp = []);
        var s = /* @__PURE__ */ new Set();
        if (Dp.length > 0 && (Dp.forEach(function(D) {
          s.add(ot(D) || "Component"), tc.add(D.type);
        }), Dp = []), t.size > 0) {
          var f = ec(t);
          C(`Using UNSAFE_componentWillMount in strict mode is not recommended and may indicate bugs in your code. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move code with side effects to componentDidMount, and set initial state in the constructor.

Please update the following components: %s`, f);
        }
        if (i.size > 0) {
          var h = ec(i);
          C(`Using UNSAFE_componentWillReceiveProps in strict mode is not recommended and may indicate bugs in your code. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.
* If you're updating state whenever props change, refactor your code to use memoization techniques or move it to static getDerivedStateFromProps. Learn more at: https://reactjs.org/link/derived-state

Please update the following components: %s`, h);
        }
        if (s.size > 0) {
          var m = ec(s);
          C(`Using UNSAFE_componentWillUpdate in strict mode is not recommended and may indicate bugs in your code. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.

Please update the following components: %s`, m);
        }
        if (e.size > 0) {
          var E = ec(e);
          I(`componentWillMount has been renamed, and is not recommended for use. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move code with side effects to componentDidMount, and set initial state in the constructor.
* Rename componentWillMount to UNSAFE_componentWillMount to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run \`npx react-codemod rename-unsafe-lifecycles\` in your project source folder.

Please update the following components: %s`, E);
        }
        if (a.size > 0) {
          var T = ec(a);
          I(`componentWillReceiveProps has been renamed, and is not recommended for use. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.
* If you're updating state whenever props change, refactor your code to use memoization techniques or move it to static getDerivedStateFromProps. Learn more at: https://reactjs.org/link/derived-state
* Rename componentWillReceiveProps to UNSAFE_componentWillReceiveProps to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run \`npx react-codemod rename-unsafe-lifecycles\` in your project source folder.

Please update the following components: %s`, T);
        }
        if (o.size > 0) {
          var O = ec(o);
          I(`componentWillUpdate has been renamed, and is not recommended for use. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.
* Rename componentWillUpdate to UNSAFE_componentWillUpdate to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run \`npx react-codemod rename-unsafe-lifecycles\` in your project source folder.

Please update the following components: %s`, O);
        }
      };
      var nm = /* @__PURE__ */ new Map(), DE = /* @__PURE__ */ new Set();
      pl.recordLegacyContextWarning = function(e, t) {
        var a = v_(e);
        if (a === null) {
          C("Expected to find a StrictMode component in a strict mode tree. This error is likely caused by a bug in React. Please file an issue.");
          return;
        }
        if (!DE.has(e.type)) {
          var i = nm.get(a);
          (e.type.contextTypes != null || e.type.childContextTypes != null || t !== null && typeof t.getChildContext == "function") && (i === void 0 && (i = [], nm.set(a, i)), i.push(e));
        }
      }, pl.flushLegacyContextWarning = function() {
        nm.forEach(function(e, t) {
          if (e.length !== 0) {
            var a = e[0], i = /* @__PURE__ */ new Set();
            e.forEach(function(s) {
              i.add(ot(s) || "Component"), DE.add(s.type);
            });
            var o = ec(i);
            try {
              mn(a), C(`Legacy context API has been detected within a strict-mode tree.

The old API will be supported in all 16.x releases, but applications using it should migrate to the new version.

Please update the following components: %s

Learn more about this warning here: https://reactjs.org/link/legacy-context`, o);
            } finally {
              xn();
            }
          }
        });
      }, pl.discardPendingWarnings = function() {
        Rp = [], wp = [], bp = [], _p = [], xp = [], Dp = [], nm = /* @__PURE__ */ new Map();
      };
    }
    var Eg, Cg, Tg, Rg, wg, kE = function(e, t) {
    };
    Eg = !1, Cg = !1, Tg = {}, Rg = {}, wg = {}, kE = function(e, t) {
      if (!(e === null || typeof e != "object") && !(!e._store || e._store.validated || e.key != null)) {
        if (typeof e._store != "object")
          throw new Error("React Component in warnForMissingKey should have a _store. This error is likely caused by a bug in React. Please file an issue.");
        e._store.validated = !0;
        var a = ot(t) || "Component";
        Rg[a] || (Rg[a] = !0, C('Each child in a list should have a unique "key" prop. See https://reactjs.org/link/warning-keys for more information.'));
      }
    };
    function h_(e) {
      return e.prototype && e.prototype.isReactComponent;
    }
    function kp(e, t, a) {
      var i = a.ref;
      if (i !== null && typeof i != "function" && typeof i != "object") {
        if ((e.mode & Sn || Y) && // We warn in ReactElement.js if owner and self are equal for string refs
        // because these cannot be automatically converted to an arrow function
        // using a codemod. Therefore, we don't have to warn about string refs again.
        !(a._owner && a._self && a._owner.stateNode !== a._self) && // Will already throw with "Function components cannot have string refs"
        !(a._owner && a._owner.tag !== W) && // Will already warn with "Function components cannot be given refs"
        !(typeof a.type == "function" && !h_(a.type)) && // Will already throw with "Element ref was specified as a string (someStringRef) but no owner was set"
        a._owner) {
          var o = ot(e) || "Component";
          Tg[o] || (C('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. We recommend using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', o, i), Tg[o] = !0);
        }
        if (a._owner) {
          var s = a._owner, f;
          if (s) {
            var h = s;
            if (h.tag !== W)
              throw new Error("Function components cannot have string refs. We recommend using useRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref");
            f = h.stateNode;
          }
          if (!f)
            throw new Error("Missing owner for string ref " + i + ". This error is likely caused by a bug in React. Please file an issue.");
          var m = f;
          Lt(i, "ref");
          var E = "" + i;
          if (t !== null && t.ref !== null && typeof t.ref == "function" && t.ref._stringRef === E)
            return t.ref;
          var T = function(O) {
            var D = m.refs;
            O === null ? delete D[E] : D[E] = O;
          };
          return T._stringRef = E, T;
        } else {
          if (typeof i != "string")
            throw new Error("Expected ref to be a function, a string, an object returned by React.createRef(), or null.");
          if (!a._owner)
            throw new Error("Element ref was specified as a string (" + i + `) but no owner was set. This could happen for one of the following reasons:
1. You may be adding a ref to a function component
2. You may be adding a ref to a component that was not created inside a component's render method
3. You have multiple copies of React loaded
See https://reactjs.org/link/refs-must-have-owner for more information.`);
        }
      }
      return i;
    }
    function rm(e, t) {
      var a = Object.prototype.toString.call(t);
      throw new Error("Objects are not valid as a React child (found: " + (a === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : a) + "). If you meant to render a collection of children, use an array instead.");
    }
    function am(e) {
      {
        var t = ot(e) || "Component";
        if (wg[t])
          return;
        wg[t] = !0, C("Functions are not valid as a React child. This may happen if you return a Component instead of <Component /> from render. Or maybe you meant to call this function rather than return it.");
      }
    }
    function OE(e) {
      var t = e._payload, a = e._init;
      return a(t);
    }
    function ME(e) {
      function t(A, $) {
        if (e) {
          var z = A.deletions;
          z === null ? (A.deletions = [$], A.flags |= ja) : z.push($);
        }
      }
      function a(A, $) {
        if (!e)
          return null;
        for (var z = $; z !== null; )
          t(A, z), z = z.sibling;
        return null;
      }
      function i(A, $) {
        for (var z = /* @__PURE__ */ new Map(), ae = $; ae !== null; )
          ae.key !== null ? z.set(ae.key, ae) : z.set(ae.index, ae), ae = ae.sibling;
        return z;
      }
      function o(A, $) {
        var z = cc(A, $);
        return z.index = 0, z.sibling = null, z;
      }
      function s(A, $, z) {
        if (A.index = z, !e)
          return A.flags |= ki, $;
        var ae = A.alternate;
        if (ae !== null) {
          var Te = ae.index;
          return Te < $ ? (A.flags |= Ln, $) : Te;
        } else
          return A.flags |= Ln, $;
      }
      function f(A) {
        return e && A.alternate === null && (A.flags |= Ln), A;
      }
      function h(A, $, z, ae) {
        if ($ === null || $.tag !== Ue) {
          var Te = S0(z, A.mode, ae);
          return Te.return = A, Te;
        } else {
          var ye = o($, z);
          return ye.return = A, ye;
        }
      }
      function m(A, $, z, ae) {
        var Te = z.type;
        if (Te === Si)
          return T(A, $, z.props.children, ae, z.key);
        if ($ !== null && ($.elementType === Te || // Keep this check inline so it only runs on the false path:
        UT($, z) || // Lazy types should reconcile their resolved type.
        // We need to do this after the Hot Reloading check above,
        // because hot reloading has different semantics than prod because
        // it doesn't resuspend. So we can't let the call below suspend.
        typeof Te == "object" && Te !== null && Te.$$typeof === ut && OE(Te) === $.type)) {
          var ye = o($, z.props);
          return ye.ref = kp(A, $, z), ye.return = A, ye._debugSource = z._source, ye._debugOwner = z._owner, ye;
        }
        var et = g0(z, A.mode, ae);
        return et.ref = kp(A, $, z), et.return = A, et;
      }
      function E(A, $, z, ae) {
        if ($ === null || $.tag !== se || $.stateNode.containerInfo !== z.containerInfo || $.stateNode.implementation !== z.implementation) {
          var Te = E0(z, A.mode, ae);
          return Te.return = A, Te;
        } else {
          var ye = o($, z.children || []);
          return ye.return = A, ye;
        }
      }
      function T(A, $, z, ae, Te) {
        if ($ === null || $.tag !== ct) {
          var ye = Qu(z, A.mode, ae, Te);
          return ye.return = A, ye;
        } else {
          var et = o($, z);
          return et.return = A, et;
        }
      }
      function O(A, $, z) {
        if (typeof $ == "string" && $ !== "" || typeof $ == "number") {
          var ae = S0("" + $, A.mode, z);
          return ae.return = A, ae;
        }
        if (typeof $ == "object" && $ !== null) {
          switch ($.$$typeof) {
            case Sr: {
              var Te = g0($, A.mode, z);
              return Te.ref = kp(A, null, $), Te.return = A, Te;
            }
            case Kn: {
              var ye = E0($, A.mode, z);
              return ye.return = A, ye;
            }
            case ut: {
              var et = $._payload, dt = $._init;
              return O(A, dt(et), z);
            }
          }
          if (bt($) || yt($)) {
            var Cn = Qu($, A.mode, z, null);
            return Cn.return = A, Cn;
          }
          rm(A, $);
        }
        return typeof $ == "function" && am(A), null;
      }
      function D(A, $, z, ae) {
        var Te = $ !== null ? $.key : null;
        if (typeof z == "string" && z !== "" || typeof z == "number")
          return Te !== null ? null : h(A, $, "" + z, ae);
        if (typeof z == "object" && z !== null) {
          switch (z.$$typeof) {
            case Sr:
              return z.key === Te ? m(A, $, z, ae) : null;
            case Kn:
              return z.key === Te ? E(A, $, z, ae) : null;
            case ut: {
              var ye = z._payload, et = z._init;
              return D(A, $, et(ye), ae);
            }
          }
          if (bt(z) || yt(z))
            return Te !== null ? null : T(A, $, z, ae, null);
          rm(A, z);
        }
        return typeof z == "function" && am(A), null;
      }
      function j(A, $, z, ae, Te) {
        if (typeof ae == "string" && ae !== "" || typeof ae == "number") {
          var ye = A.get(z) || null;
          return h($, ye, "" + ae, Te);
        }
        if (typeof ae == "object" && ae !== null) {
          switch (ae.$$typeof) {
            case Sr: {
              var et = A.get(ae.key === null ? z : ae.key) || null;
              return m($, et, ae, Te);
            }
            case Kn: {
              var dt = A.get(ae.key === null ? z : ae.key) || null;
              return E($, dt, ae, Te);
            }
            case ut:
              var Cn = ae._payload, ln = ae._init;
              return j(A, $, z, ln(Cn), Te);
          }
          if (bt(ae) || yt(ae)) {
            var fr = A.get(z) || null;
            return T($, fr, ae, Te, null);
          }
          rm($, ae);
        }
        return typeof ae == "function" && am($), null;
      }
      function P(A, $, z) {
        {
          if (typeof A != "object" || A === null)
            return $;
          switch (A.$$typeof) {
            case Sr:
            case Kn:
              kE(A, z);
              var ae = A.key;
              if (typeof ae != "string")
                break;
              if ($ === null) {
                $ = /* @__PURE__ */ new Set(), $.add(ae);
                break;
              }
              if (!$.has(ae)) {
                $.add(ae);
                break;
              }
              C("Encountered two children with the same key, `%s`. Keys should be unique so that components maintain their identity across updates. Non-unique keys may cause children to be duplicated and/or omitted — the behavior is unsupported and could change in a future version.", ae);
              break;
            case ut:
              var Te = A._payload, ye = A._init;
              P(ye(Te), $, z);
              break;
          }
        }
        return $;
      }
      function B(A, $, z, ae) {
        for (var Te = null, ye = 0; ye < z.length; ye++) {
          var et = z[ye];
          Te = P(et, Te, A);
        }
        for (var dt = null, Cn = null, ln = $, fr = 0, on = 0, ir = null; ln !== null && on < z.length; on++) {
          ln.index > on ? (ir = ln, ln = null) : ir = ln.sibling;
          var Sa = D(A, ln, z[on], ae);
          if (Sa === null) {
            ln === null && (ln = ir);
            break;
          }
          e && ln && Sa.alternate === null && t(A, ln), fr = s(Sa, fr, on), Cn === null ? dt = Sa : Cn.sibling = Sa, Cn = Sa, ln = ir;
        }
        if (on === z.length) {
          if (a(A, ln), Xr()) {
            var na = on;
            qs(A, na);
          }
          return dt;
        }
        if (ln === null) {
          for (; on < z.length; on++) {
            var yi = O(A, z[on], ae);
            yi !== null && (fr = s(yi, fr, on), Cn === null ? dt = yi : Cn.sibling = yi, Cn = yi);
          }
          if (Xr()) {
            var Ma = on;
            qs(A, Ma);
          }
          return dt;
        }
        for (var La = i(A, ln); on < z.length; on++) {
          var Ea = j(La, A, on, z[on], ae);
          Ea !== null && (e && Ea.alternate !== null && La.delete(Ea.key === null ? on : Ea.key), fr = s(Ea, fr, on), Cn === null ? dt = Ea : Cn.sibling = Ea, Cn = Ea);
        }
        if (e && La.forEach(function(Zf) {
          return t(A, Zf);
        }), Xr()) {
          var qo = on;
          qs(A, qo);
        }
        return dt;
      }
      function he(A, $, z, ae) {
        var Te = yt(z);
        if (typeof Te != "function")
          throw new Error("An object is not an iterable. This error is likely caused by a bug in React. Please file an issue.");
        {
          typeof Symbol == "function" && // $FlowFixMe Flow doesn't know about toStringTag
          z[Symbol.toStringTag] === "Generator" && (Cg || C("Using Generators as children is unsupported and will likely yield unexpected results because enumerating a generator mutates it. You may convert it to an array with `Array.from()` or the `[...spread]` operator before rendering. Keep in mind you might need to polyfill these features for older browsers."), Cg = !0), z.entries === Te && (Eg || C("Using Maps as children is not supported. Use an array of keyed ReactElements instead."), Eg = !0);
          var ye = Te.call(z);
          if (ye)
            for (var et = null, dt = ye.next(); !dt.done; dt = ye.next()) {
              var Cn = dt.value;
              et = P(Cn, et, A);
            }
        }
        var ln = Te.call(z);
        if (ln == null)
          throw new Error("An iterable object provided no iterator.");
        for (var fr = null, on = null, ir = $, Sa = 0, na = 0, yi = null, Ma = ln.next(); ir !== null && !Ma.done; na++, Ma = ln.next()) {
          ir.index > na ? (yi = ir, ir = null) : yi = ir.sibling;
          var La = D(A, ir, Ma.value, ae);
          if (La === null) {
            ir === null && (ir = yi);
            break;
          }
          e && ir && La.alternate === null && t(A, ir), Sa = s(La, Sa, na), on === null ? fr = La : on.sibling = La, on = La, ir = yi;
        }
        if (Ma.done) {
          if (a(A, ir), Xr()) {
            var Ea = na;
            qs(A, Ea);
          }
          return fr;
        }
        if (ir === null) {
          for (; !Ma.done; na++, Ma = ln.next()) {
            var qo = O(A, Ma.value, ae);
            qo !== null && (Sa = s(qo, Sa, na), on === null ? fr = qo : on.sibling = qo, on = qo);
          }
          if (Xr()) {
            var Zf = na;
            qs(A, Zf);
          }
          return fr;
        }
        for (var ov = i(A, ir); !Ma.done; na++, Ma = ln.next()) {
          var io = j(ov, A, na, Ma.value, ae);
          io !== null && (e && io.alternate !== null && ov.delete(io.key === null ? na : io.key), Sa = s(io, Sa, na), on === null ? fr = io : on.sibling = io, on = io);
        }
        if (e && ov.forEach(function(VD) {
          return t(A, VD);
        }), Xr()) {
          var PD = na;
          qs(A, PD);
        }
        return fr;
      }
      function $e(A, $, z, ae) {
        if ($ !== null && $.tag === Ue) {
          a(A, $.sibling);
          var Te = o($, z);
          return Te.return = A, Te;
        }
        a(A, $);
        var ye = S0(z, A.mode, ae);
        return ye.return = A, ye;
      }
      function Ne(A, $, z, ae) {
        for (var Te = z.key, ye = $; ye !== null; ) {
          if (ye.key === Te) {
            var et = z.type;
            if (et === Si) {
              if (ye.tag === ct) {
                a(A, ye.sibling);
                var dt = o(ye, z.props.children);
                return dt.return = A, dt._debugSource = z._source, dt._debugOwner = z._owner, dt;
              }
            } else if (ye.elementType === et || // Keep this check inline so it only runs on the false path:
            UT(ye, z) || // Lazy types should reconcile their resolved type.
            // We need to do this after the Hot Reloading check above,
            // because hot reloading has different semantics than prod because
            // it doesn't resuspend. So we can't let the call below suspend.
            typeof et == "object" && et !== null && et.$$typeof === ut && OE(et) === ye.type) {
              a(A, ye.sibling);
              var Cn = o(ye, z.props);
              return Cn.ref = kp(A, ye, z), Cn.return = A, Cn._debugSource = z._source, Cn._debugOwner = z._owner, Cn;
            }
            a(A, ye);
            break;
          } else
            t(A, ye);
          ye = ye.sibling;
        }
        if (z.type === Si) {
          var ln = Qu(z.props.children, A.mode, ae, z.key);
          return ln.return = A, ln;
        } else {
          var fr = g0(z, A.mode, ae);
          return fr.ref = kp(A, $, z), fr.return = A, fr;
        }
      }
      function It(A, $, z, ae) {
        for (var Te = z.key, ye = $; ye !== null; ) {
          if (ye.key === Te)
            if (ye.tag === se && ye.stateNode.containerInfo === z.containerInfo && ye.stateNode.implementation === z.implementation) {
              a(A, ye.sibling);
              var et = o(ye, z.children || []);
              return et.return = A, et;
            } else {
              a(A, ye);
              break;
            }
          else
            t(A, ye);
          ye = ye.sibling;
        }
        var dt = E0(z, A.mode, ae);
        return dt.return = A, dt;
      }
      function Ut(A, $, z, ae) {
        var Te = typeof z == "object" && z !== null && z.type === Si && z.key === null;
        if (Te && (z = z.props.children), typeof z == "object" && z !== null) {
          switch (z.$$typeof) {
            case Sr:
              return f(Ne(A, $, z, ae));
            case Kn:
              return f(It(A, $, z, ae));
            case ut:
              var ye = z._payload, et = z._init;
              return Ut(A, $, et(ye), ae);
          }
          if (bt(z))
            return B(A, $, z, ae);
          if (yt(z))
            return he(A, $, z, ae);
          rm(A, z);
        }
        return typeof z == "string" && z !== "" || typeof z == "number" ? f($e(A, $, "" + z, ae)) : (typeof z == "function" && am(A), a(A, $));
      }
      return Ut;
    }
    var Af = ME(!0), LE = ME(!1);
    function m_(e, t) {
      if (e !== null && t.child !== e.child)
        throw new Error("Resuming work not yet implemented.");
      if (t.child !== null) {
        var a = t.child, i = cc(a, a.pendingProps);
        for (t.child = i, i.return = t; a.sibling !== null; )
          a = a.sibling, i = i.sibling = cc(a, a.pendingProps), i.return = t;
        i.sibling = null;
      }
    }
    function y_(e, t) {
      for (var a = e.child; a !== null; )
        aD(a, t), a = a.sibling;
    }
    var bg = Au(null), _g;
    _g = {};
    var im = null, zf = null, xg = null, lm = !1;
    function om() {
      im = null, zf = null, xg = null, lm = !1;
    }
    function NE() {
      lm = !0;
    }
    function AE() {
      lm = !1;
    }
    function zE(e, t, a) {
      ya(bg, t._currentValue, e), t._currentValue = a, t._currentRenderer !== void 0 && t._currentRenderer !== null && t._currentRenderer !== _g && C("Detected multiple renderers concurrently rendering the same context provider. This is currently unsupported."), t._currentRenderer = _g;
    }
    function Dg(e, t) {
      var a = bg.current;
      ma(bg, t), e._currentValue = a;
    }
    function kg(e, t, a) {
      for (var i = e; i !== null; ) {
        var o = i.alternate;
        if (No(i.childLanes, t) ? o !== null && !No(o.childLanes, t) && (o.childLanes = Et(o.childLanes, t)) : (i.childLanes = Et(i.childLanes, t), o !== null && (o.childLanes = Et(o.childLanes, t))), i === a)
          break;
        i = i.return;
      }
      i !== a && C("Expected to find the propagation root when scheduling context work. This error is likely caused by a bug in React. Please file an issue.");
    }
    function g_(e, t, a) {
      S_(e, t, a);
    }
    function S_(e, t, a) {
      var i = e.child;
      for (i !== null && (i.return = e); i !== null; ) {
        var o = void 0, s = i.dependencies;
        if (s !== null) {
          o = i.child;
          for (var f = s.firstContext; f !== null; ) {
            if (f.context === t) {
              if (i.tag === W) {
                var h = Ds(a), m = Yo(Tn, h);
                m.tag = sm;
                var E = i.updateQueue;
                if (E !== null) {
                  var T = E.shared, O = T.pending;
                  O === null ? m.next = m : (m.next = O.next, O.next = m), T.pending = m;
                }
              }
              i.lanes = Et(i.lanes, a);
              var D = i.alternate;
              D !== null && (D.lanes = Et(D.lanes, a)), kg(i.return, a, e), s.lanes = Et(s.lanes, a);
              break;
            }
            f = f.next;
          }
        } else if (i.tag === tt)
          o = i.type === e.type ? null : i.child;
        else if (i.tag === Pt) {
          var j = i.return;
          if (j === null)
            throw new Error("We just came from a parent so we must have had a parent. This is a bug in React.");
          j.lanes = Et(j.lanes, a);
          var P = j.alternate;
          P !== null && (P.lanes = Et(P.lanes, a)), kg(j, a, e), o = i.sibling;
        } else
          o = i.child;
        if (o !== null)
          o.return = i;
        else
          for (o = i; o !== null; ) {
            if (o === e) {
              o = null;
              break;
            }
            var B = o.sibling;
            if (B !== null) {
              B.return = o.return, o = B;
              break;
            }
            o = o.return;
          }
        i = o;
      }
    }
    function Uf(e, t) {
      im = e, zf = null, xg = null;
      var a = e.dependencies;
      if (a !== null) {
        var i = a.firstContext;
        i !== null && (da(a.lanes, t) && Ip(), a.firstContext = null);
      }
    }
    function mr(e) {
      lm && C("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo().");
      var t = e._currentValue;
      if (xg !== e) {
        var a = {
          context: e,
          memoizedValue: t,
          next: null
        };
        if (zf === null) {
          if (im === null)
            throw new Error("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo().");
          zf = a, im.dependencies = {
            lanes: K,
            firstContext: a
          };
        } else
          zf = zf.next = a;
      }
      return t;
    }
    var nc = null;
    function Og(e) {
      nc === null ? nc = [e] : nc.push(e);
    }
    function E_() {
      if (nc !== null) {
        for (var e = 0; e < nc.length; e++) {
          var t = nc[e], a = t.interleaved;
          if (a !== null) {
            t.interleaved = null;
            var i = a.next, o = t.pending;
            if (o !== null) {
              var s = o.next;
              o.next = i, a.next = s;
            }
            t.pending = a;
          }
        }
        nc = null;
      }
    }
    function UE(e, t, a, i) {
      var o = t.interleaved;
      return o === null ? (a.next = a, Og(t)) : (a.next = o.next, o.next = a), t.interleaved = a, um(e, i);
    }
    function C_(e, t, a, i) {
      var o = t.interleaved;
      o === null ? (a.next = a, Og(t)) : (a.next = o.next, o.next = a), t.interleaved = a;
    }
    function T_(e, t, a, i) {
      var o = t.interleaved;
      return o === null ? (a.next = a, Og(t)) : (a.next = o.next, o.next = a), t.interleaved = a, um(e, i);
    }
    function Ga(e, t) {
      return um(e, t);
    }
    var R_ = um;
    function um(e, t) {
      e.lanes = Et(e.lanes, t);
      var a = e.alternate;
      a !== null && (a.lanes = Et(a.lanes, t)), a === null && (e.flags & (Ln | oa)) !== He && LT(e);
      for (var i = e, o = e.return; o !== null; )
        o.childLanes = Et(o.childLanes, t), a = o.alternate, a !== null ? a.childLanes = Et(a.childLanes, t) : (o.flags & (Ln | oa)) !== He && LT(e), i = o, o = o.return;
      if (i.tag === J) {
        var s = i.stateNode;
        return s;
      } else
        return null;
    }
    var jE = 0, FE = 1, sm = 2, Mg = 3, cm = !1, Lg, fm;
    Lg = !1, fm = null;
    function Ng(e) {
      var t = {
        baseState: e.memoizedState,
        firstBaseUpdate: null,
        lastBaseUpdate: null,
        shared: {
          pending: null,
          interleaved: null,
          lanes: K
        },
        effects: null
      };
      e.updateQueue = t;
    }
    function HE(e, t) {
      var a = t.updateQueue, i = e.updateQueue;
      if (a === i) {
        var o = {
          baseState: i.baseState,
          firstBaseUpdate: i.firstBaseUpdate,
          lastBaseUpdate: i.lastBaseUpdate,
          shared: i.shared,
          effects: i.effects
        };
        t.updateQueue = o;
      }
    }
    function Yo(e, t) {
      var a = {
        eventTime: e,
        lane: t,
        tag: jE,
        payload: null,
        callback: null,
        next: null
      };
      return a;
    }
    function Fu(e, t, a) {
      var i = e.updateQueue;
      if (i === null)
        return null;
      var o = i.shared;
      if (fm === o && !Lg && (C("An update (setState, replaceState, or forceUpdate) was scheduled from inside an update function. Update functions should be pure, with zero side-effects. Consider using componentDidUpdate or a callback."), Lg = !0), C1()) {
        var s = o.pending;
        return s === null ? t.next = t : (t.next = s.next, s.next = t), o.pending = t, R_(e, a);
      } else
        return T_(e, o, t, a);
    }
    function dm(e, t, a) {
      var i = t.updateQueue;
      if (i !== null) {
        var o = i.shared;
        if (Bd(a)) {
          var s = o.lanes;
          s = Id(s, e.pendingLanes);
          var f = Et(s, a);
          o.lanes = f, uf(e, f);
        }
      }
    }
    function Ag(e, t) {
      var a = e.updateQueue, i = e.alternate;
      if (i !== null) {
        var o = i.updateQueue;
        if (a === o) {
          var s = null, f = null, h = a.firstBaseUpdate;
          if (h !== null) {
            var m = h;
            do {
              var E = {
                eventTime: m.eventTime,
                lane: m.lane,
                tag: m.tag,
                payload: m.payload,
                callback: m.callback,
                next: null
              };
              f === null ? s = f = E : (f.next = E, f = E), m = m.next;
            } while (m !== null);
            f === null ? s = f = t : (f.next = t, f = t);
          } else
            s = f = t;
          a = {
            baseState: o.baseState,
            firstBaseUpdate: s,
            lastBaseUpdate: f,
            shared: o.shared,
            effects: o.effects
          }, e.updateQueue = a;
          return;
        }
      }
      var T = a.lastBaseUpdate;
      T === null ? a.firstBaseUpdate = t : T.next = t, a.lastBaseUpdate = t;
    }
    function w_(e, t, a, i, o, s) {
      switch (a.tag) {
        case FE: {
          var f = a.payload;
          if (typeof f == "function") {
            NE();
            var h = f.call(s, i, o);
            {
              if (e.mode & Sn) {
                Nn(!0);
                try {
                  f.call(s, i, o);
                } finally {
                  Nn(!1);
                }
              }
              AE();
            }
            return h;
          }
          return f;
        }
        case Mg:
          e.flags = e.flags & ~dr | ze;
        // Intentional fallthrough
        case jE: {
          var m = a.payload, E;
          if (typeof m == "function") {
            NE(), E = m.call(s, i, o);
            {
              if (e.mode & Sn) {
                Nn(!0);
                try {
                  m.call(s, i, o);
                } finally {
                  Nn(!1);
                }
              }
              AE();
            }
          } else
            E = m;
          return E == null ? i : Tt({}, i, E);
        }
        case sm:
          return cm = !0, i;
      }
      return i;
    }
    function pm(e, t, a, i) {
      var o = e.updateQueue;
      cm = !1, fm = o.shared;
      var s = o.firstBaseUpdate, f = o.lastBaseUpdate, h = o.shared.pending;
      if (h !== null) {
        o.shared.pending = null;
        var m = h, E = m.next;
        m.next = null, f === null ? s = E : f.next = E, f = m;
        var T = e.alternate;
        if (T !== null) {
          var O = T.updateQueue, D = O.lastBaseUpdate;
          D !== f && (D === null ? O.firstBaseUpdate = E : D.next = E, O.lastBaseUpdate = m);
        }
      }
      if (s !== null) {
        var j = o.baseState, P = K, B = null, he = null, $e = null, Ne = s;
        do {
          var It = Ne.lane, Ut = Ne.eventTime;
          if (No(i, It)) {
            if ($e !== null) {
              var $ = {
                eventTime: Ut,
                // This update is going to be committed so we never want uncommit
                // it. Using NoLane works because 0 is a subset of all bitmasks, so
                // this will never be skipped by the check above.
                lane: Kt,
                tag: Ne.tag,
                payload: Ne.payload,
                callback: Ne.callback,
                next: null
              };
              $e = $e.next = $;
            }
            j = w_(e, o, Ne, j, t, a);
            var z = Ne.callback;
            if (z !== null && // If the update was already committed, we should not queue its
            // callback again.
            Ne.lane !== Kt) {
              e.flags |= bn;
              var ae = o.effects;
              ae === null ? o.effects = [Ne] : ae.push(Ne);
            }
          } else {
            var A = {
              eventTime: Ut,
              lane: It,
              tag: Ne.tag,
              payload: Ne.payload,
              callback: Ne.callback,
              next: null
            };
            $e === null ? (he = $e = A, B = j) : $e = $e.next = A, P = Et(P, It);
          }
          if (Ne = Ne.next, Ne === null) {
            if (h = o.shared.pending, h === null)
              break;
            var Te = h, ye = Te.next;
            Te.next = null, Ne = ye, o.lastBaseUpdate = Te, o.shared.pending = null;
          }
        } while (!0);
        $e === null && (B = j), o.baseState = B, o.firstBaseUpdate = he, o.lastBaseUpdate = $e;
        var et = o.shared.interleaved;
        if (et !== null) {
          var dt = et;
          do
            P = Et(P, dt.lane), dt = dt.next;
          while (dt !== et);
        } else s === null && (o.shared.lanes = K);
        nv(P), e.lanes = P, e.memoizedState = j;
      }
      fm = null;
    }
    function b_(e, t) {
      if (typeof e != "function")
        throw new Error("Invalid argument passed as callback. Expected a function. Instead " + ("received: " + e));
      e.call(t);
    }
    function PE() {
      cm = !1;
    }
    function vm() {
      return cm;
    }
    function VE(e, t, a) {
      var i = t.effects;
      if (t.effects = null, i !== null)
        for (var o = 0; o < i.length; o++) {
          var s = i[o], f = s.callback;
          f !== null && (s.callback = null, b_(f, a));
        }
    }
    var Op = {}, Hu = Au(Op), Mp = Au(Op), hm = Au(Op);
    function mm(e) {
      if (e === Op)
        throw new Error("Expected host context to exist. This error is likely caused by a bug in React. Please file an issue.");
      return e;
    }
    function BE() {
      var e = mm(hm.current);
      return e;
    }
    function zg(e, t) {
      ya(hm, t, e), ya(Mp, e, e), ya(Hu, Op, e);
      var a = Bw(t);
      ma(Hu, e), ya(Hu, a, e);
    }
    function jf(e) {
      ma(Hu, e), ma(Mp, e), ma(hm, e);
    }
    function Ug() {
      var e = mm(Hu.current);
      return e;
    }
    function $E(e) {
      mm(hm.current);
      var t = mm(Hu.current), a = $w(t, e.type);
      t !== a && (ya(Mp, e, e), ya(Hu, a, e));
    }
    function jg(e) {
      Mp.current === e && (ma(Hu, e), ma(Mp, e));
    }
    var __ = 0, IE = 1, YE = 1, Lp = 2, vl = Au(__);
    function Fg(e, t) {
      return (e & t) !== 0;
    }
    function Ff(e) {
      return e & IE;
    }
    function Hg(e, t) {
      return e & IE | t;
    }
    function x_(e, t) {
      return e | t;
    }
    function Pu(e, t) {
      ya(vl, t, e);
    }
    function Hf(e) {
      ma(vl, e);
    }
    function D_(e, t) {
      var a = e.memoizedState;
      return a !== null ? a.dehydrated !== null : (e.memoizedProps, !0);
    }
    function ym(e) {
      for (var t = e; t !== null; ) {
        if (t.tag === _e) {
          var a = t.memoizedState;
          if (a !== null) {
            var i = a.dehydrated;
            if (i === null || uE(i) || rg(i))
              return t;
          }
        } else if (t.tag === dn && // revealOrder undefined can't be trusted because it don't
        // keep track of whether it suspended or not.
        t.memoizedProps.revealOrder !== void 0) {
          var o = (t.flags & ze) !== He;
          if (o)
            return t;
        } else if (t.child !== null) {
          t.child.return = t, t = t.child;
          continue;
        }
        if (t === e)
          return null;
        for (; t.sibling === null; ) {
          if (t.return === null || t.return === e)
            return null;
          t = t.return;
        }
        t.sibling.return = t.return, t = t.sibling;
      }
      return null;
    }
    var Qa = (
      /*   */
      0
    ), _r = (
      /* */
      1
    ), Zl = (
      /*  */
      2
    ), xr = (
      /*    */
      4
    ), Kr = (
      /*   */
      8
    ), Pg = [];
    function Vg() {
      for (var e = 0; e < Pg.length; e++) {
        var t = Pg[e];
        t._workInProgressVersionPrimary = null;
      }
      Pg.length = 0;
    }
    function k_(e, t) {
      var a = t._getVersion, i = a(t._source);
      e.mutableSourceEagerHydrationData == null ? e.mutableSourceEagerHydrationData = [t, i] : e.mutableSourceEagerHydrationData.push(t, i);
    }
    var Se = v.ReactCurrentDispatcher, Np = v.ReactCurrentBatchConfig, Bg, Pf;
    Bg = /* @__PURE__ */ new Set();
    var rc = K, En = null, Dr = null, kr = null, gm = !1, Ap = !1, zp = 0, O_ = 0, M_ = 25, G = null, Bi = null, Vu = -1, $g = !1;
    function fn() {
      {
        var e = G;
        Bi === null ? Bi = [e] : Bi.push(e);
      }
    }
    function ce() {
      {
        var e = G;
        Bi !== null && (Vu++, Bi[Vu] !== e && L_(e));
      }
    }
    function Vf(e) {
      e != null && !bt(e) && C("%s received a final argument that is not an array (instead, received `%s`). When specified, the final argument must be an array.", G, typeof e);
    }
    function L_(e) {
      {
        var t = ot(En);
        if (!Bg.has(t) && (Bg.add(t), Bi !== null)) {
          for (var a = "", i = 30, o = 0; o <= Vu; o++) {
            for (var s = Bi[o], f = o === Vu ? e : s, h = o + 1 + ". " + s; h.length < i; )
              h += " ";
            h += f + `
`, a += h;
          }
          C(`React has detected a change in the order of Hooks called by %s. This will lead to bugs and errors if not fixed. For more information, read the Rules of Hooks: https://reactjs.org/link/rules-of-hooks

   Previous render            Next render
   ------------------------------------------------------
%s   ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
`, t, a);
        }
      }
    }
    function ga() {
      throw new Error(`Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
1. You might have mismatching versions of React and the renderer (such as React DOM)
2. You might be breaking the Rules of Hooks
3. You might have more than one copy of React in the same app
See https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem.`);
    }
    function Ig(e, t) {
      if ($g)
        return !1;
      if (t === null)
        return C("%s received a final argument during this render, but not during the previous render. Even though the final argument is optional, its type cannot change between renders.", G), !1;
      e.length !== t.length && C(`The final argument passed to %s changed size between renders. The order and size of this array must remain constant.

Previous: %s
Incoming: %s`, G, "[" + t.join(", ") + "]", "[" + e.join(", ") + "]");
      for (var a = 0; a < t.length && a < e.length; a++)
        if (!te(e[a], t[a]))
          return !1;
      return !0;
    }
    function Bf(e, t, a, i, o, s) {
      rc = s, En = t, Bi = e !== null ? e._debugHookTypes : null, Vu = -1, $g = e !== null && e.type !== t.type, t.memoizedState = null, t.updateQueue = null, t.lanes = K, e !== null && e.memoizedState !== null ? Se.current = pC : Bi !== null ? Se.current = dC : Se.current = fC;
      var f = a(i, o);
      if (Ap) {
        var h = 0;
        do {
          if (Ap = !1, zp = 0, h >= M_)
            throw new Error("Too many re-renders. React limits the number of renders to prevent an infinite loop.");
          h += 1, $g = !1, Dr = null, kr = null, t.updateQueue = null, Vu = -1, Se.current = vC, f = a(i, o);
        } while (Ap);
      }
      Se.current = Mm, t._debugHookTypes = Bi;
      var m = Dr !== null && Dr.next !== null;
      if (rc = K, En = null, Dr = null, kr = null, G = null, Bi = null, Vu = -1, e !== null && (e.flags & Jn) !== (t.flags & Jn) && // Disable this warning in legacy mode, because legacy Suspense is weird
      // and creates false positives. To make this work in legacy mode, we'd
      // need to mark fibers that commit in an incomplete state, somehow. For
      // now I'll disable the warning that most of the bugs that would trigger
      // it are either exclusive to concurrent mode or exist in both.
      (e.mode & kt) !== Pe && C("Internal React error: Expected static flag was missing. Please notify the React team."), gm = !1, m)
        throw new Error("Rendered fewer hooks than expected. This may be caused by an accidental early return statement.");
      return f;
    }
    function $f() {
      var e = zp !== 0;
      return zp = 0, e;
    }
    function WE(e, t, a) {
      t.updateQueue = e.updateQueue, (t.mode & rn) !== Pe ? t.flags &= -50333701 : t.flags &= -2053, e.lanes = ks(e.lanes, a);
    }
    function GE() {
      if (Se.current = Mm, gm) {
        for (var e = En.memoizedState; e !== null; ) {
          var t = e.queue;
          t !== null && (t.pending = null), e = e.next;
        }
        gm = !1;
      }
      rc = K, En = null, Dr = null, kr = null, Bi = null, Vu = -1, G = null, lC = !1, Ap = !1, zp = 0;
    }
    function Jl() {
      var e = {
        memoizedState: null,
        baseState: null,
        baseQueue: null,
        queue: null,
        next: null
      };
      return kr === null ? En.memoizedState = kr = e : kr = kr.next = e, kr;
    }
    function $i() {
      var e;
      if (Dr === null) {
        var t = En.alternate;
        t !== null ? e = t.memoizedState : e = null;
      } else
        e = Dr.next;
      var a;
      if (kr === null ? a = En.memoizedState : a = kr.next, a !== null)
        kr = a, a = kr.next, Dr = e;
      else {
        if (e === null)
          throw new Error("Rendered more hooks than during the previous render.");
        Dr = e;
        var i = {
          memoizedState: Dr.memoizedState,
          baseState: Dr.baseState,
          baseQueue: Dr.baseQueue,
          queue: Dr.queue,
          next: null
        };
        kr === null ? En.memoizedState = kr = i : kr = kr.next = i;
      }
      return kr;
    }
    function QE() {
      return {
        lastEffect: null,
        stores: null
      };
    }
    function Yg(e, t) {
      return typeof t == "function" ? t(e) : t;
    }
    function Wg(e, t, a) {
      var i = Jl(), o;
      a !== void 0 ? o = a(t) : o = t, i.memoizedState = i.baseState = o;
      var s = {
        pending: null,
        interleaved: null,
        lanes: K,
        dispatch: null,
        lastRenderedReducer: e,
        lastRenderedState: o
      };
      i.queue = s;
      var f = s.dispatch = U_.bind(null, En, s);
      return [i.memoizedState, f];
    }
    function Gg(e, t, a) {
      var i = $i(), o = i.queue;
      if (o === null)
        throw new Error("Should have a queue. This is likely a bug in React. Please file an issue.");
      o.lastRenderedReducer = e;
      var s = Dr, f = s.baseQueue, h = o.pending;
      if (h !== null) {
        if (f !== null) {
          var m = f.next, E = h.next;
          f.next = E, h.next = m;
        }
        s.baseQueue !== f && C("Internal error: Expected work-in-progress queue to be a clone. This is a bug in React."), s.baseQueue = f = h, o.pending = null;
      }
      if (f !== null) {
        var T = f.next, O = s.baseState, D = null, j = null, P = null, B = T;
        do {
          var he = B.lane;
          if (No(rc, he)) {
            if (P !== null) {
              var Ne = {
                // This update is going to be committed so we never want uncommit
                // it. Using NoLane works because 0 is a subset of all bitmasks, so
                // this will never be skipped by the check above.
                lane: Kt,
                action: B.action,
                hasEagerState: B.hasEagerState,
                eagerState: B.eagerState,
                next: null
              };
              P = P.next = Ne;
            }
            if (B.hasEagerState)
              O = B.eagerState;
            else {
              var It = B.action;
              O = e(O, It);
            }
          } else {
            var $e = {
              lane: he,
              action: B.action,
              hasEagerState: B.hasEagerState,
              eagerState: B.eagerState,
              next: null
            };
            P === null ? (j = P = $e, D = O) : P = P.next = $e, En.lanes = Et(En.lanes, he), nv(he);
          }
          B = B.next;
        } while (B !== null && B !== T);
        P === null ? D = O : P.next = j, te(O, i.memoizedState) || Ip(), i.memoizedState = O, i.baseState = D, i.baseQueue = P, o.lastRenderedState = O;
      }
      var Ut = o.interleaved;
      if (Ut !== null) {
        var A = Ut;
        do {
          var $ = A.lane;
          En.lanes = Et(En.lanes, $), nv($), A = A.next;
        } while (A !== Ut);
      } else f === null && (o.lanes = K);
      var z = o.dispatch;
      return [i.memoizedState, z];
    }
    function Qg(e, t, a) {
      var i = $i(), o = i.queue;
      if (o === null)
        throw new Error("Should have a queue. This is likely a bug in React. Please file an issue.");
      o.lastRenderedReducer = e;
      var s = o.dispatch, f = o.pending, h = i.memoizedState;
      if (f !== null) {
        o.pending = null;
        var m = f.next, E = m;
        do {
          var T = E.action;
          h = e(h, T), E = E.next;
        } while (E !== m);
        te(h, i.memoizedState) || Ip(), i.memoizedState = h, i.baseQueue === null && (i.baseState = h), o.lastRenderedState = h;
      }
      return [h, s];
    }
    function mO(e, t, a) {
    }
    function yO(e, t, a) {
    }
    function Xg(e, t, a) {
      var i = En, o = Jl(), s, f = Xr();
      if (f) {
        if (a === void 0)
          throw new Error("Missing getServerSnapshot, which is required for server-rendered content. Will revert to client rendering.");
        s = a(), Pf || s !== a() && (C("The result of getServerSnapshot should be cached to avoid an infinite loop"), Pf = !0);
      } else {
        if (s = t(), !Pf) {
          var h = t();
          te(s, h) || (C("The result of getSnapshot should be cached to avoid an infinite loop"), Pf = !0);
        }
        var m = Km();
        if (m === null)
          throw new Error("Expected a work-in-progress root. This is a bug in React. Please file an issue.");
        lf(m, rc) || XE(i, t, s);
      }
      o.memoizedState = s;
      var E = {
        value: s,
        getSnapshot: t
      };
      return o.queue = E, Rm(qE.bind(null, i, E, e), [e]), i.flags |= la, Up(_r | Kr, KE.bind(null, i, E, s, t), void 0, null), s;
    }
    function Sm(e, t, a) {
      var i = En, o = $i(), s = t();
      if (!Pf) {
        var f = t();
        te(s, f) || (C("The result of getSnapshot should be cached to avoid an infinite loop"), Pf = !0);
      }
      var h = o.memoizedState, m = !te(h, s);
      m && (o.memoizedState = s, Ip());
      var E = o.queue;
      if (Fp(qE.bind(null, i, E, e), [e]), E.getSnapshot !== t || m || // Check if the susbcribe function changed. We can save some memory by
      // checking whether we scheduled a subscription effect above.
      kr !== null && kr.memoizedState.tag & _r) {
        i.flags |= la, Up(_r | Kr, KE.bind(null, i, E, s, t), void 0, null);
        var T = Km();
        if (T === null)
          throw new Error("Expected a work-in-progress root. This is a bug in React. Please file an issue.");
        lf(T, rc) || XE(i, t, s);
      }
      return s;
    }
    function XE(e, t, a) {
      e.flags |= gu;
      var i = {
        getSnapshot: t,
        value: a
      }, o = En.updateQueue;
      if (o === null)
        o = QE(), En.updateQueue = o, o.stores = [i];
      else {
        var s = o.stores;
        s === null ? o.stores = [i] : s.push(i);
      }
    }
    function KE(e, t, a, i) {
      t.value = a, t.getSnapshot = i, ZE(t) && JE(e);
    }
    function qE(e, t, a) {
      var i = function() {
        ZE(t) && JE(e);
      };
      return a(i);
    }
    function ZE(e) {
      var t = e.getSnapshot, a = e.value;
      try {
        var i = t();
        return !te(a, i);
      } catch {
        return !0;
      }
    }
    function JE(e) {
      var t = Ga(e, qe);
      t !== null && Nr(t, e, qe, Tn);
    }
    function Em(e) {
      var t = Jl();
      typeof e == "function" && (e = e()), t.memoizedState = t.baseState = e;
      var a = {
        pending: null,
        interleaved: null,
        lanes: K,
        dispatch: null,
        lastRenderedReducer: Yg,
        lastRenderedState: e
      };
      t.queue = a;
      var i = a.dispatch = j_.bind(null, En, a);
      return [t.memoizedState, i];
    }
    function Kg(e) {
      return Gg(Yg);
    }
    function qg(e) {
      return Qg(Yg);
    }
    function Up(e, t, a, i) {
      var o = {
        tag: e,
        create: t,
        destroy: a,
        deps: i,
        // Circular
        next: null
      }, s = En.updateQueue;
      if (s === null)
        s = QE(), En.updateQueue = s, s.lastEffect = o.next = o;
      else {
        var f = s.lastEffect;
        if (f === null)
          s.lastEffect = o.next = o;
        else {
          var h = f.next;
          f.next = o, o.next = h, s.lastEffect = o;
        }
      }
      return o;
    }
    function Zg(e) {
      var t = Jl();
      {
        var a = {
          current: e
        };
        return t.memoizedState = a, a;
      }
    }
    function Cm(e) {
      var t = $i();
      return t.memoizedState;
    }
    function jp(e, t, a, i) {
      var o = Jl(), s = i === void 0 ? null : i;
      En.flags |= e, o.memoizedState = Up(_r | t, a, void 0, s);
    }
    function Tm(e, t, a, i) {
      var o = $i(), s = i === void 0 ? null : i, f = void 0;
      if (Dr !== null) {
        var h = Dr.memoizedState;
        if (f = h.destroy, s !== null) {
          var m = h.deps;
          if (Ig(s, m)) {
            o.memoizedState = Up(t, a, f, s);
            return;
          }
        }
      }
      En.flags |= e, o.memoizedState = Up(_r | t, a, f, s);
    }
    function Rm(e, t) {
      return (En.mode & rn) !== Pe ? jp(Oi | la | Lc, Kr, e, t) : jp(la | Lc, Kr, e, t);
    }
    function Fp(e, t) {
      return Tm(la, Kr, e, t);
    }
    function Jg(e, t) {
      return jp(Vt, Zl, e, t);
    }
    function wm(e, t) {
      return Tm(Vt, Zl, e, t);
    }
    function eS(e, t) {
      var a = Vt;
      return a |= nl, (En.mode & rn) !== Pe && (a |= Al), jp(a, xr, e, t);
    }
    function bm(e, t) {
      return Tm(Vt, xr, e, t);
    }
    function eC(e, t) {
      if (typeof t == "function") {
        var a = t, i = e();
        return a(i), function() {
          a(null);
        };
      } else if (t != null) {
        var o = t;
        o.hasOwnProperty("current") || C("Expected useImperativeHandle() first argument to either be a ref callback or React.createRef() object. Instead received: %s.", "an object with keys {" + Object.keys(o).join(", ") + "}");
        var s = e();
        return o.current = s, function() {
          o.current = null;
        };
      }
    }
    function tS(e, t, a) {
      typeof t != "function" && C("Expected useImperativeHandle() second argument to be a function that creates a handle. Instead received: %s.", t !== null ? typeof t : "null");
      var i = a != null ? a.concat([e]) : null, o = Vt;
      return o |= nl, (En.mode & rn) !== Pe && (o |= Al), jp(o, xr, eC.bind(null, t, e), i);
    }
    function _m(e, t, a) {
      typeof t != "function" && C("Expected useImperativeHandle() second argument to be a function that creates a handle. Instead received: %s.", t !== null ? typeof t : "null");
      var i = a != null ? a.concat([e]) : null;
      return Tm(Vt, xr, eC.bind(null, t, e), i);
    }
    function N_(e, t) {
    }
    var xm = N_;
    function nS(e, t) {
      var a = Jl(), i = t === void 0 ? null : t;
      return a.memoizedState = [e, i], e;
    }
    function Dm(e, t) {
      var a = $i(), i = t === void 0 ? null : t, o = a.memoizedState;
      if (o !== null && i !== null) {
        var s = o[1];
        if (Ig(i, s))
          return o[0];
      }
      return a.memoizedState = [e, i], e;
    }
    function rS(e, t) {
      var a = Jl(), i = t === void 0 ? null : t, o = e();
      return a.memoizedState = [o, i], o;
    }
    function km(e, t) {
      var a = $i(), i = t === void 0 ? null : t, o = a.memoizedState;
      if (o !== null && i !== null) {
        var s = o[1];
        if (Ig(i, s))
          return o[0];
      }
      var f = e();
      return a.memoizedState = [f, i], f;
    }
    function aS(e) {
      var t = Jl();
      return t.memoizedState = e, e;
    }
    function tC(e) {
      var t = $i(), a = Dr, i = a.memoizedState;
      return rC(t, i, e);
    }
    function nC(e) {
      var t = $i();
      if (Dr === null)
        return t.memoizedState = e, e;
      var a = Dr.memoizedState;
      return rC(t, a, e);
    }
    function rC(e, t, a) {
      var i = !Pd(rc);
      if (i) {
        if (!te(a, t)) {
          var o = $d();
          En.lanes = Et(En.lanes, o), nv(o), e.baseState = !0;
        }
        return t;
      } else
        return e.baseState && (e.baseState = !1, Ip()), e.memoizedState = a, a;
    }
    function A_(e, t, a) {
      var i = Ia();
      nr(lh(i, Ai)), e(!0);
      var o = Np.transition;
      Np.transition = {};
      var s = Np.transition;
      Np.transition._updatedFibers = /* @__PURE__ */ new Set();
      try {
        e(!1), t();
      } finally {
        if (nr(i), Np.transition = o, o === null && s._updatedFibers) {
          var f = s._updatedFibers.size;
          f > 10 && I("Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table."), s._updatedFibers.clear();
        }
      }
    }
    function iS() {
      var e = Em(!1), t = e[0], a = e[1], i = A_.bind(null, a), o = Jl();
      return o.memoizedState = i, [t, i];
    }
    function aC() {
      var e = Kg(), t = e[0], a = $i(), i = a.memoizedState;
      return [t, i];
    }
    function iC() {
      var e = qg(), t = e[0], a = $i(), i = a.memoizedState;
      return [t, i];
    }
    var lC = !1;
    function z_() {
      return lC;
    }
    function lS() {
      var e = Jl(), t = Km(), a = t.identifierPrefix, i;
      if (Xr()) {
        var o = Zb();
        i = ":" + a + "R" + o;
        var s = zp++;
        s > 0 && (i += "H" + s.toString(32)), i += ":";
      } else {
        var f = O_++;
        i = ":" + a + "r" + f.toString(32) + ":";
      }
      return e.memoizedState = i, i;
    }
    function Om() {
      var e = $i(), t = e.memoizedState;
      return t;
    }
    function U_(e, t, a) {
      typeof arguments[3] == "function" && C("State updates from the useState() and useReducer() Hooks don't support the second callback argument. To execute a side effect after rendering, declare it in the component body with useEffect().");
      var i = Wu(e), o = {
        lane: i,
        action: a,
        hasEagerState: !1,
        eagerState: null,
        next: null
      };
      if (oC(e))
        uC(t, o);
      else {
        var s = UE(e, t, o, i);
        if (s !== null) {
          var f = Oa();
          Nr(s, e, i, f), sC(s, t, i);
        }
      }
      cC(e, i);
    }
    function j_(e, t, a) {
      typeof arguments[3] == "function" && C("State updates from the useState() and useReducer() Hooks don't support the second callback argument. To execute a side effect after rendering, declare it in the component body with useEffect().");
      var i = Wu(e), o = {
        lane: i,
        action: a,
        hasEagerState: !1,
        eagerState: null,
        next: null
      };
      if (oC(e))
        uC(t, o);
      else {
        var s = e.alternate;
        if (e.lanes === K && (s === null || s.lanes === K)) {
          var f = t.lastRenderedReducer;
          if (f !== null) {
            var h;
            h = Se.current, Se.current = hl;
            try {
              var m = t.lastRenderedState, E = f(m, a);
              if (o.hasEagerState = !0, o.eagerState = E, te(E, m)) {
                C_(e, t, o, i);
                return;
              }
            } catch {
            } finally {
              Se.current = h;
            }
          }
        }
        var T = UE(e, t, o, i);
        if (T !== null) {
          var O = Oa();
          Nr(T, e, i, O), sC(T, t, i);
        }
      }
      cC(e, i);
    }
    function oC(e) {
      var t = e.alternate;
      return e === En || t !== null && t === En;
    }
    function uC(e, t) {
      Ap = gm = !0;
      var a = e.pending;
      a === null ? t.next = t : (t.next = a.next, a.next = t), e.pending = t;
    }
    function sC(e, t, a) {
      if (Bd(a)) {
        var i = t.lanes;
        i = Id(i, e.pendingLanes);
        var o = Et(i, a);
        t.lanes = o, uf(e, o);
      }
    }
    function cC(e, t, a) {
      Ss(e, t);
    }
    var Mm = {
      readContext: mr,
      useCallback: ga,
      useContext: ga,
      useEffect: ga,
      useImperativeHandle: ga,
      useInsertionEffect: ga,
      useLayoutEffect: ga,
      useMemo: ga,
      useReducer: ga,
      useRef: ga,
      useState: ga,
      useDebugValue: ga,
      useDeferredValue: ga,
      useTransition: ga,
      useMutableSource: ga,
      useSyncExternalStore: ga,
      useId: ga,
      unstable_isNewReconciler: ie
    }, fC = null, dC = null, pC = null, vC = null, eo = null, hl = null, Lm = null;
    {
      var oS = function() {
        C("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo().");
      }, st = function() {
        C("Do not call Hooks inside useEffect(...), useMemo(...), or other built-in Hooks. You can only call Hooks at the top level of your React function. For more information, see https://reactjs.org/link/rules-of-hooks");
      };
      fC = {
        readContext: function(e) {
          return mr(e);
        },
        useCallback: function(e, t) {
          return G = "useCallback", fn(), Vf(t), nS(e, t);
        },
        useContext: function(e) {
          return G = "useContext", fn(), mr(e);
        },
        useEffect: function(e, t) {
          return G = "useEffect", fn(), Vf(t), Rm(e, t);
        },
        useImperativeHandle: function(e, t, a) {
          return G = "useImperativeHandle", fn(), Vf(a), tS(e, t, a);
        },
        useInsertionEffect: function(e, t) {
          return G = "useInsertionEffect", fn(), Vf(t), Jg(e, t);
        },
        useLayoutEffect: function(e, t) {
          return G = "useLayoutEffect", fn(), Vf(t), eS(e, t);
        },
        useMemo: function(e, t) {
          G = "useMemo", fn(), Vf(t);
          var a = Se.current;
          Se.current = eo;
          try {
            return rS(e, t);
          } finally {
            Se.current = a;
          }
        },
        useReducer: function(e, t, a) {
          G = "useReducer", fn();
          var i = Se.current;
          Se.current = eo;
          try {
            return Wg(e, t, a);
          } finally {
            Se.current = i;
          }
        },
        useRef: function(e) {
          return G = "useRef", fn(), Zg(e);
        },
        useState: function(e) {
          G = "useState", fn();
          var t = Se.current;
          Se.current = eo;
          try {
            return Em(e);
          } finally {
            Se.current = t;
          }
        },
        useDebugValue: function(e, t) {
          return G = "useDebugValue", fn(), void 0;
        },
        useDeferredValue: function(e) {
          return G = "useDeferredValue", fn(), aS(e);
        },
        useTransition: function() {
          return G = "useTransition", fn(), iS();
        },
        useMutableSource: function(e, t, a) {
          return G = "useMutableSource", fn(), void 0;
        },
        useSyncExternalStore: function(e, t, a) {
          return G = "useSyncExternalStore", fn(), Xg(e, t, a);
        },
        useId: function() {
          return G = "useId", fn(), lS();
        },
        unstable_isNewReconciler: ie
      }, dC = {
        readContext: function(e) {
          return mr(e);
        },
        useCallback: function(e, t) {
          return G = "useCallback", ce(), nS(e, t);
        },
        useContext: function(e) {
          return G = "useContext", ce(), mr(e);
        },
        useEffect: function(e, t) {
          return G = "useEffect", ce(), Rm(e, t);
        },
        useImperativeHandle: function(e, t, a) {
          return G = "useImperativeHandle", ce(), tS(e, t, a);
        },
        useInsertionEffect: function(e, t) {
          return G = "useInsertionEffect", ce(), Jg(e, t);
        },
        useLayoutEffect: function(e, t) {
          return G = "useLayoutEffect", ce(), eS(e, t);
        },
        useMemo: function(e, t) {
          G = "useMemo", ce();
          var a = Se.current;
          Se.current = eo;
          try {
            return rS(e, t);
          } finally {
            Se.current = a;
          }
        },
        useReducer: function(e, t, a) {
          G = "useReducer", ce();
          var i = Se.current;
          Se.current = eo;
          try {
            return Wg(e, t, a);
          } finally {
            Se.current = i;
          }
        },
        useRef: function(e) {
          return G = "useRef", ce(), Zg(e);
        },
        useState: function(e) {
          G = "useState", ce();
          var t = Se.current;
          Se.current = eo;
          try {
            return Em(e);
          } finally {
            Se.current = t;
          }
        },
        useDebugValue: function(e, t) {
          return G = "useDebugValue", ce(), void 0;
        },
        useDeferredValue: function(e) {
          return G = "useDeferredValue", ce(), aS(e);
        },
        useTransition: function() {
          return G = "useTransition", ce(), iS();
        },
        useMutableSource: function(e, t, a) {
          return G = "useMutableSource", ce(), void 0;
        },
        useSyncExternalStore: function(e, t, a) {
          return G = "useSyncExternalStore", ce(), Xg(e, t, a);
        },
        useId: function() {
          return G = "useId", ce(), lS();
        },
        unstable_isNewReconciler: ie
      }, pC = {
        readContext: function(e) {
          return mr(e);
        },
        useCallback: function(e, t) {
          return G = "useCallback", ce(), Dm(e, t);
        },
        useContext: function(e) {
          return G = "useContext", ce(), mr(e);
        },
        useEffect: function(e, t) {
          return G = "useEffect", ce(), Fp(e, t);
        },
        useImperativeHandle: function(e, t, a) {
          return G = "useImperativeHandle", ce(), _m(e, t, a);
        },
        useInsertionEffect: function(e, t) {
          return G = "useInsertionEffect", ce(), wm(e, t);
        },
        useLayoutEffect: function(e, t) {
          return G = "useLayoutEffect", ce(), bm(e, t);
        },
        useMemo: function(e, t) {
          G = "useMemo", ce();
          var a = Se.current;
          Se.current = hl;
          try {
            return km(e, t);
          } finally {
            Se.current = a;
          }
        },
        useReducer: function(e, t, a) {
          G = "useReducer", ce();
          var i = Se.current;
          Se.current = hl;
          try {
            return Gg(e, t, a);
          } finally {
            Se.current = i;
          }
        },
        useRef: function(e) {
          return G = "useRef", ce(), Cm();
        },
        useState: function(e) {
          G = "useState", ce();
          var t = Se.current;
          Se.current = hl;
          try {
            return Kg(e);
          } finally {
            Se.current = t;
          }
        },
        useDebugValue: function(e, t) {
          return G = "useDebugValue", ce(), xm();
        },
        useDeferredValue: function(e) {
          return G = "useDeferredValue", ce(), tC(e);
        },
        useTransition: function() {
          return G = "useTransition", ce(), aC();
        },
        useMutableSource: function(e, t, a) {
          return G = "useMutableSource", ce(), void 0;
        },
        useSyncExternalStore: function(e, t, a) {
          return G = "useSyncExternalStore", ce(), Sm(e, t);
        },
        useId: function() {
          return G = "useId", ce(), Om();
        },
        unstable_isNewReconciler: ie
      }, vC = {
        readContext: function(e) {
          return mr(e);
        },
        useCallback: function(e, t) {
          return G = "useCallback", ce(), Dm(e, t);
        },
        useContext: function(e) {
          return G = "useContext", ce(), mr(e);
        },
        useEffect: function(e, t) {
          return G = "useEffect", ce(), Fp(e, t);
        },
        useImperativeHandle: function(e, t, a) {
          return G = "useImperativeHandle", ce(), _m(e, t, a);
        },
        useInsertionEffect: function(e, t) {
          return G = "useInsertionEffect", ce(), wm(e, t);
        },
        useLayoutEffect: function(e, t) {
          return G = "useLayoutEffect", ce(), bm(e, t);
        },
        useMemo: function(e, t) {
          G = "useMemo", ce();
          var a = Se.current;
          Se.current = Lm;
          try {
            return km(e, t);
          } finally {
            Se.current = a;
          }
        },
        useReducer: function(e, t, a) {
          G = "useReducer", ce();
          var i = Se.current;
          Se.current = Lm;
          try {
            return Qg(e, t, a);
          } finally {
            Se.current = i;
          }
        },
        useRef: function(e) {
          return G = "useRef", ce(), Cm();
        },
        useState: function(e) {
          G = "useState", ce();
          var t = Se.current;
          Se.current = Lm;
          try {
            return qg(e);
          } finally {
            Se.current = t;
          }
        },
        useDebugValue: function(e, t) {
          return G = "useDebugValue", ce(), xm();
        },
        useDeferredValue: function(e) {
          return G = "useDeferredValue", ce(), nC(e);
        },
        useTransition: function() {
          return G = "useTransition", ce(), iC();
        },
        useMutableSource: function(e, t, a) {
          return G = "useMutableSource", ce(), void 0;
        },
        useSyncExternalStore: function(e, t, a) {
          return G = "useSyncExternalStore", ce(), Sm(e, t);
        },
        useId: function() {
          return G = "useId", ce(), Om();
        },
        unstable_isNewReconciler: ie
      }, eo = {
        readContext: function(e) {
          return oS(), mr(e);
        },
        useCallback: function(e, t) {
          return G = "useCallback", st(), fn(), nS(e, t);
        },
        useContext: function(e) {
          return G = "useContext", st(), fn(), mr(e);
        },
        useEffect: function(e, t) {
          return G = "useEffect", st(), fn(), Rm(e, t);
        },
        useImperativeHandle: function(e, t, a) {
          return G = "useImperativeHandle", st(), fn(), tS(e, t, a);
        },
        useInsertionEffect: function(e, t) {
          return G = "useInsertionEffect", st(), fn(), Jg(e, t);
        },
        useLayoutEffect: function(e, t) {
          return G = "useLayoutEffect", st(), fn(), eS(e, t);
        },
        useMemo: function(e, t) {
          G = "useMemo", st(), fn();
          var a = Se.current;
          Se.current = eo;
          try {
            return rS(e, t);
          } finally {
            Se.current = a;
          }
        },
        useReducer: function(e, t, a) {
          G = "useReducer", st(), fn();
          var i = Se.current;
          Se.current = eo;
          try {
            return Wg(e, t, a);
          } finally {
            Se.current = i;
          }
        },
        useRef: function(e) {
          return G = "useRef", st(), fn(), Zg(e);
        },
        useState: function(e) {
          G = "useState", st(), fn();
          var t = Se.current;
          Se.current = eo;
          try {
            return Em(e);
          } finally {
            Se.current = t;
          }
        },
        useDebugValue: function(e, t) {
          return G = "useDebugValue", st(), fn(), void 0;
        },
        useDeferredValue: function(e) {
          return G = "useDeferredValue", st(), fn(), aS(e);
        },
        useTransition: function() {
          return G = "useTransition", st(), fn(), iS();
        },
        useMutableSource: function(e, t, a) {
          return G = "useMutableSource", st(), fn(), void 0;
        },
        useSyncExternalStore: function(e, t, a) {
          return G = "useSyncExternalStore", st(), fn(), Xg(e, t, a);
        },
        useId: function() {
          return G = "useId", st(), fn(), lS();
        },
        unstable_isNewReconciler: ie
      }, hl = {
        readContext: function(e) {
          return oS(), mr(e);
        },
        useCallback: function(e, t) {
          return G = "useCallback", st(), ce(), Dm(e, t);
        },
        useContext: function(e) {
          return G = "useContext", st(), ce(), mr(e);
        },
        useEffect: function(e, t) {
          return G = "useEffect", st(), ce(), Fp(e, t);
        },
        useImperativeHandle: function(e, t, a) {
          return G = "useImperativeHandle", st(), ce(), _m(e, t, a);
        },
        useInsertionEffect: function(e, t) {
          return G = "useInsertionEffect", st(), ce(), wm(e, t);
        },
        useLayoutEffect: function(e, t) {
          return G = "useLayoutEffect", st(), ce(), bm(e, t);
        },
        useMemo: function(e, t) {
          G = "useMemo", st(), ce();
          var a = Se.current;
          Se.current = hl;
          try {
            return km(e, t);
          } finally {
            Se.current = a;
          }
        },
        useReducer: function(e, t, a) {
          G = "useReducer", st(), ce();
          var i = Se.current;
          Se.current = hl;
          try {
            return Gg(e, t, a);
          } finally {
            Se.current = i;
          }
        },
        useRef: function(e) {
          return G = "useRef", st(), ce(), Cm();
        },
        useState: function(e) {
          G = "useState", st(), ce();
          var t = Se.current;
          Se.current = hl;
          try {
            return Kg(e);
          } finally {
            Se.current = t;
          }
        },
        useDebugValue: function(e, t) {
          return G = "useDebugValue", st(), ce(), xm();
        },
        useDeferredValue: function(e) {
          return G = "useDeferredValue", st(), ce(), tC(e);
        },
        useTransition: function() {
          return G = "useTransition", st(), ce(), aC();
        },
        useMutableSource: function(e, t, a) {
          return G = "useMutableSource", st(), ce(), void 0;
        },
        useSyncExternalStore: function(e, t, a) {
          return G = "useSyncExternalStore", st(), ce(), Sm(e, t);
        },
        useId: function() {
          return G = "useId", st(), ce(), Om();
        },
        unstable_isNewReconciler: ie
      }, Lm = {
        readContext: function(e) {
          return oS(), mr(e);
        },
        useCallback: function(e, t) {
          return G = "useCallback", st(), ce(), Dm(e, t);
        },
        useContext: function(e) {
          return G = "useContext", st(), ce(), mr(e);
        },
        useEffect: function(e, t) {
          return G = "useEffect", st(), ce(), Fp(e, t);
        },
        useImperativeHandle: function(e, t, a) {
          return G = "useImperativeHandle", st(), ce(), _m(e, t, a);
        },
        useInsertionEffect: function(e, t) {
          return G = "useInsertionEffect", st(), ce(), wm(e, t);
        },
        useLayoutEffect: function(e, t) {
          return G = "useLayoutEffect", st(), ce(), bm(e, t);
        },
        useMemo: function(e, t) {
          G = "useMemo", st(), ce();
          var a = Se.current;
          Se.current = hl;
          try {
            return km(e, t);
          } finally {
            Se.current = a;
          }
        },
        useReducer: function(e, t, a) {
          G = "useReducer", st(), ce();
          var i = Se.current;
          Se.current = hl;
          try {
            return Qg(e, t, a);
          } finally {
            Se.current = i;
          }
        },
        useRef: function(e) {
          return G = "useRef", st(), ce(), Cm();
        },
        useState: function(e) {
          G = "useState", st(), ce();
          var t = Se.current;
          Se.current = hl;
          try {
            return qg(e);
          } finally {
            Se.current = t;
          }
        },
        useDebugValue: function(e, t) {
          return G = "useDebugValue", st(), ce(), xm();
        },
        useDeferredValue: function(e) {
          return G = "useDeferredValue", st(), ce(), nC(e);
        },
        useTransition: function() {
          return G = "useTransition", st(), ce(), iC();
        },
        useMutableSource: function(e, t, a) {
          return G = "useMutableSource", st(), ce(), void 0;
        },
        useSyncExternalStore: function(e, t, a) {
          return G = "useSyncExternalStore", st(), ce(), Sm(e, t);
        },
        useId: function() {
          return G = "useId", st(), ce(), Om();
        },
        unstable_isNewReconciler: ie
      };
    }
    var Bu = d.unstable_now, hC = 0, Nm = -1, Hp = -1, Am = -1, uS = !1, zm = !1;
    function mC() {
      return uS;
    }
    function F_() {
      zm = !0;
    }
    function H_() {
      uS = !1, zm = !1;
    }
    function P_() {
      uS = zm, zm = !1;
    }
    function yC() {
      return hC;
    }
    function gC() {
      hC = Bu();
    }
    function sS(e) {
      Hp = Bu(), e.actualStartTime < 0 && (e.actualStartTime = Bu());
    }
    function SC(e) {
      Hp = -1;
    }
    function Um(e, t) {
      if (Hp >= 0) {
        var a = Bu() - Hp;
        e.actualDuration += a, t && (e.selfBaseDuration = a), Hp = -1;
      }
    }
    function to(e) {
      if (Nm >= 0) {
        var t = Bu() - Nm;
        Nm = -1;
        for (var a = e.return; a !== null; ) {
          switch (a.tag) {
            case J:
              var i = a.stateNode;
              i.effectDuration += t;
              return;
            case Je:
              var o = a.stateNode;
              o.effectDuration += t;
              return;
          }
          a = a.return;
        }
      }
    }
    function cS(e) {
      if (Am >= 0) {
        var t = Bu() - Am;
        Am = -1;
        for (var a = e.return; a !== null; ) {
          switch (a.tag) {
            case J:
              var i = a.stateNode;
              i !== null && (i.passiveEffectDuration += t);
              return;
            case Je:
              var o = a.stateNode;
              o !== null && (o.passiveEffectDuration += t);
              return;
          }
          a = a.return;
        }
      }
    }
    function no() {
      Nm = Bu();
    }
    function fS() {
      Am = Bu();
    }
    function dS(e) {
      for (var t = e.child; t; )
        e.actualDuration += t.actualDuration, t = t.sibling;
    }
    function ml(e, t) {
      if (e && e.defaultProps) {
        var a = Tt({}, t), i = e.defaultProps;
        for (var o in i)
          a[o] === void 0 && (a[o] = i[o]);
        return a;
      }
      return t;
    }
    var pS = {}, vS, hS, mS, yS, gS, EC, jm, SS, ES, CS, Pp;
    {
      vS = /* @__PURE__ */ new Set(), hS = /* @__PURE__ */ new Set(), mS = /* @__PURE__ */ new Set(), yS = /* @__PURE__ */ new Set(), SS = /* @__PURE__ */ new Set(), gS = /* @__PURE__ */ new Set(), ES = /* @__PURE__ */ new Set(), CS = /* @__PURE__ */ new Set(), Pp = /* @__PURE__ */ new Set();
      var CC = /* @__PURE__ */ new Set();
      jm = function(e, t) {
        if (!(e === null || typeof e == "function")) {
          var a = t + "_" + e;
          CC.has(a) || (CC.add(a), C("%s(...): Expected the last optional `callback` argument to be a function. Instead received: %s.", t, e));
        }
      }, EC = function(e, t) {
        if (t === void 0) {
          var a = Yt(e) || "Component";
          gS.has(a) || (gS.add(a), C("%s.getDerivedStateFromProps(): A valid state object (or null) must be returned. You have returned undefined.", a));
        }
      }, Object.defineProperty(pS, "_processChildContext", {
        enumerable: !1,
        value: function() {
          throw new Error("_processChildContext is not available in React 16+. This likely means you have multiple copies of React and are attempting to nest a React 15 tree inside a React 16 tree using unstable_renderSubtreeIntoContainer, which isn't supported. Try to make sure you have only one copy of React (and ideally, switch to ReactDOM.createPortal).");
        }
      }), Object.freeze(pS);
    }
    function TS(e, t, a, i) {
      var o = e.memoizedState, s = a(i, o);
      {
        if (e.mode & Sn) {
          Nn(!0);
          try {
            s = a(i, o);
          } finally {
            Nn(!1);
          }
        }
        EC(t, s);
      }
      var f = s == null ? o : Tt({}, o, s);
      if (e.memoizedState = f, e.lanes === K) {
        var h = e.updateQueue;
        h.baseState = f;
      }
    }
    var RS = {
      isMounted: Iv,
      enqueueSetState: function(e, t, a) {
        var i = yu(e), o = Oa(), s = Wu(i), f = Yo(o, s);
        f.payload = t, a != null && (jm(a, "setState"), f.callback = a);
        var h = Fu(i, f, s);
        h !== null && (Nr(h, i, s, o), dm(h, i, s)), Ss(i, s);
      },
      enqueueReplaceState: function(e, t, a) {
        var i = yu(e), o = Oa(), s = Wu(i), f = Yo(o, s);
        f.tag = FE, f.payload = t, a != null && (jm(a, "replaceState"), f.callback = a);
        var h = Fu(i, f, s);
        h !== null && (Nr(h, i, s, o), dm(h, i, s)), Ss(i, s);
      },
      enqueueForceUpdate: function(e, t) {
        var a = yu(e), i = Oa(), o = Wu(a), s = Yo(i, o);
        s.tag = sm, t != null && (jm(t, "forceUpdate"), s.callback = t);
        var f = Fu(a, s, o);
        f !== null && (Nr(f, a, o, i), dm(f, a, o)), Hc(a, o);
      }
    };
    function TC(e, t, a, i, o, s, f) {
      var h = e.stateNode;
      if (typeof h.shouldComponentUpdate == "function") {
        var m = h.shouldComponentUpdate(i, s, f);
        {
          if (e.mode & Sn) {
            Nn(!0);
            try {
              m = h.shouldComponentUpdate(i, s, f);
            } finally {
              Nn(!1);
            }
          }
          m === void 0 && C("%s.shouldComponentUpdate(): Returned undefined instead of a boolean value. Make sure to return true or false.", Yt(t) || "Component");
        }
        return m;
      }
      return t.prototype && t.prototype.isPureReactComponent ? !De(a, i) || !De(o, s) : !0;
    }
    function V_(e, t, a) {
      var i = e.stateNode;
      {
        var o = Yt(t) || "Component", s = i.render;
        s || (t.prototype && typeof t.prototype.render == "function" ? C("%s(...): No `render` method found on the returned component instance: did you accidentally return an object from the constructor?", o) : C("%s(...): No `render` method found on the returned component instance: you may have forgotten to define `render`.", o)), i.getInitialState && !i.getInitialState.isReactClassApproved && !i.state && C("getInitialState was defined on %s, a plain JavaScript class. This is only supported for classes created using React.createClass. Did you mean to define a state property instead?", o), i.getDefaultProps && !i.getDefaultProps.isReactClassApproved && C("getDefaultProps was defined on %s, a plain JavaScript class. This is only supported for classes created using React.createClass. Use a static property to define defaultProps instead.", o), i.propTypes && C("propTypes was defined as an instance property on %s. Use a static property to define propTypes instead.", o), i.contextType && C("contextType was defined as an instance property on %s. Use a static property to define contextType instead.", o), t.childContextTypes && !Pp.has(t) && // Strict Mode has its own warning for legacy context, so we can skip
        // this one.
        (e.mode & Sn) === Pe && (Pp.add(t), C(`%s uses the legacy childContextTypes API which is no longer supported and will be removed in the next major release. Use React.createContext() instead

.Learn more about this warning here: https://reactjs.org/link/legacy-context`, o)), t.contextTypes && !Pp.has(t) && // Strict Mode has its own warning for legacy context, so we can skip
        // this one.
        (e.mode & Sn) === Pe && (Pp.add(t), C(`%s uses the legacy contextTypes API which is no longer supported and will be removed in the next major release. Use React.createContext() with static contextType instead.

Learn more about this warning here: https://reactjs.org/link/legacy-context`, o)), i.contextTypes && C("contextTypes was defined as an instance property on %s. Use a static property to define contextTypes instead.", o), t.contextType && t.contextTypes && !ES.has(t) && (ES.add(t), C("%s declares both contextTypes and contextType static properties. The legacy contextTypes property will be ignored.", o)), typeof i.componentShouldUpdate == "function" && C("%s has a method called componentShouldUpdate(). Did you mean shouldComponentUpdate()? The name is phrased as a question because the function is expected to return a value.", o), t.prototype && t.prototype.isPureReactComponent && typeof i.shouldComponentUpdate < "u" && C("%s has a method called shouldComponentUpdate(). shouldComponentUpdate should not be used when extending React.PureComponent. Please extend React.Component if shouldComponentUpdate is used.", Yt(t) || "A pure component"), typeof i.componentDidUnmount == "function" && C("%s has a method called componentDidUnmount(). But there is no such lifecycle method. Did you mean componentWillUnmount()?", o), typeof i.componentDidReceiveProps == "function" && C("%s has a method called componentDidReceiveProps(). But there is no such lifecycle method. If you meant to update the state in response to changing props, use componentWillReceiveProps(). If you meant to fetch data or run side-effects or mutations after React has updated the UI, use componentDidUpdate().", o), typeof i.componentWillRecieveProps == "function" && C("%s has a method called componentWillRecieveProps(). Did you mean componentWillReceiveProps()?", o), typeof i.UNSAFE_componentWillRecieveProps == "function" && C("%s has a method called UNSAFE_componentWillRecieveProps(). Did you mean UNSAFE_componentWillReceiveProps()?", o);
        var f = i.props !== a;
        i.props !== void 0 && f && C("%s(...): When calling super() in `%s`, make sure to pass up the same props that your component's constructor was passed.", o, o), i.defaultProps && C("Setting defaultProps as an instance property on %s is not supported and will be ignored. Instead, define defaultProps as a static property on %s.", o, o), typeof i.getSnapshotBeforeUpdate == "function" && typeof i.componentDidUpdate != "function" && !mS.has(t) && (mS.add(t), C("%s: getSnapshotBeforeUpdate() should be used with componentDidUpdate(). This component defines getSnapshotBeforeUpdate() only.", Yt(t))), typeof i.getDerivedStateFromProps == "function" && C("%s: getDerivedStateFromProps() is defined as an instance method and will be ignored. Instead, declare it as a static method.", o), typeof i.getDerivedStateFromError == "function" && C("%s: getDerivedStateFromError() is defined as an instance method and will be ignored. Instead, declare it as a static method.", o), typeof t.getSnapshotBeforeUpdate == "function" && C("%s: getSnapshotBeforeUpdate() is defined as a static method and will be ignored. Instead, declare it as an instance method.", o);
        var h = i.state;
        h && (typeof h != "object" || bt(h)) && C("%s.state: must be set to an object or null", o), typeof i.getChildContext == "function" && typeof t.childContextTypes != "object" && C("%s.getChildContext(): childContextTypes must be defined in order to use getChildContext().", o);
      }
    }
    function RC(e, t) {
      t.updater = RS, e.stateNode = t, So(t, e), t._reactInternalInstance = pS;
    }
    function wC(e, t, a) {
      var i = !1, o = hi, s = hi, f = t.contextType;
      if ("contextType" in t) {
        var h = (
          // Allow null for conditional declaration
          f === null || f !== void 0 && f.$$typeof === _ && f._context === void 0
        );
        if (!h && !CS.has(t)) {
          CS.add(t);
          var m = "";
          f === void 0 ? m = " However, it is set to undefined. This can be caused by a typo or by mixing up named and default imports. This can also happen due to a circular dependency, so try moving the createContext() call to a separate file." : typeof f != "object" ? m = " However, it is set to a " + typeof f + "." : f.$$typeof === Ci ? m = " Did you accidentally pass the Context.Provider instead?" : f._context !== void 0 ? m = " Did you accidentally pass the Context.Consumer instead?" : m = " However, it is set to an object with keys {" + Object.keys(f).join(", ") + "}.", C("%s defines an invalid contextType. contextType should point to the Context object returned by React.createContext().%s", Yt(t) || "Component", m);
        }
      }
      if (typeof f == "object" && f !== null)
        s = mr(f);
      else {
        o = kf(e, t, !0);
        var E = t.contextTypes;
        i = E != null, s = i ? Of(e, o) : hi;
      }
      var T = new t(a, s);
      if (e.mode & Sn) {
        Nn(!0);
        try {
          T = new t(a, s);
        } finally {
          Nn(!1);
        }
      }
      var O = e.memoizedState = T.state !== null && T.state !== void 0 ? T.state : null;
      RC(e, T);
      {
        if (typeof t.getDerivedStateFromProps == "function" && O === null) {
          var D = Yt(t) || "Component";
          hS.has(D) || (hS.add(D), C("`%s` uses `getDerivedStateFromProps` but its initial state is %s. This is not recommended. Instead, define the initial state by assigning an object to `this.state` in the constructor of `%s`. This ensures that `getDerivedStateFromProps` arguments have a consistent shape.", D, T.state === null ? "null" : "undefined", D));
        }
        if (typeof t.getDerivedStateFromProps == "function" || typeof T.getSnapshotBeforeUpdate == "function") {
          var j = null, P = null, B = null;
          if (typeof T.componentWillMount == "function" && T.componentWillMount.__suppressDeprecationWarning !== !0 ? j = "componentWillMount" : typeof T.UNSAFE_componentWillMount == "function" && (j = "UNSAFE_componentWillMount"), typeof T.componentWillReceiveProps == "function" && T.componentWillReceiveProps.__suppressDeprecationWarning !== !0 ? P = "componentWillReceiveProps" : typeof T.UNSAFE_componentWillReceiveProps == "function" && (P = "UNSAFE_componentWillReceiveProps"), typeof T.componentWillUpdate == "function" && T.componentWillUpdate.__suppressDeprecationWarning !== !0 ? B = "componentWillUpdate" : typeof T.UNSAFE_componentWillUpdate == "function" && (B = "UNSAFE_componentWillUpdate"), j !== null || P !== null || B !== null) {
            var he = Yt(t) || "Component", $e = typeof t.getDerivedStateFromProps == "function" ? "getDerivedStateFromProps()" : "getSnapshotBeforeUpdate()";
            yS.has(he) || (yS.add(he), C(`Unsafe legacy lifecycles will not be called for components using new component APIs.

%s uses %s but also contains the following legacy lifecycles:%s%s%s

The above lifecycles should be removed. Learn more about this warning here:
https://reactjs.org/link/unsafe-component-lifecycles`, he, $e, j !== null ? `
  ` + j : "", P !== null ? `
  ` + P : "", B !== null ? `
  ` + B : ""));
          }
        }
      }
      return i && pE(e, o, s), T;
    }
    function B_(e, t) {
      var a = t.state;
      typeof t.componentWillMount == "function" && t.componentWillMount(), typeof t.UNSAFE_componentWillMount == "function" && t.UNSAFE_componentWillMount(), a !== t.state && (C("%s.componentWillMount(): Assigning directly to this.state is deprecated (except inside a component's constructor). Use setState instead.", ot(e) || "Component"), RS.enqueueReplaceState(t, t.state, null));
    }
    function bC(e, t, a, i) {
      var o = t.state;
      if (typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(a, i), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(a, i), t.state !== o) {
        {
          var s = ot(e) || "Component";
          vS.has(s) || (vS.add(s), C("%s.componentWillReceiveProps(): Assigning directly to this.state is deprecated (except inside a component's constructor). Use setState instead.", s));
        }
        RS.enqueueReplaceState(t, t.state, null);
      }
    }
    function wS(e, t, a, i) {
      V_(e, t, a);
      var o = e.stateNode;
      o.props = a, o.state = e.memoizedState, o.refs = {}, Ng(e);
      var s = t.contextType;
      if (typeof s == "object" && s !== null)
        o.context = mr(s);
      else {
        var f = kf(e, t, !0);
        o.context = Of(e, f);
      }
      {
        if (o.state === a) {
          var h = Yt(t) || "Component";
          SS.has(h) || (SS.add(h), C("%s: It is not recommended to assign props directly to state because updates to props won't be reflected in state. In most cases, it is better to use props directly.", h));
        }
        e.mode & Sn && pl.recordLegacyContextWarning(e, o), pl.recordUnsafeLifecycleWarnings(e, o);
      }
      o.state = e.memoizedState;
      var m = t.getDerivedStateFromProps;
      if (typeof m == "function" && (TS(e, t, m, a), o.state = e.memoizedState), typeof t.getDerivedStateFromProps != "function" && typeof o.getSnapshotBeforeUpdate != "function" && (typeof o.UNSAFE_componentWillMount == "function" || typeof o.componentWillMount == "function") && (B_(e, o), pm(e, a, o, i), o.state = e.memoizedState), typeof o.componentDidMount == "function") {
        var E = Vt;
        E |= nl, (e.mode & rn) !== Pe && (E |= Al), e.flags |= E;
      }
    }
    function $_(e, t, a, i) {
      var o = e.stateNode, s = e.memoizedProps;
      o.props = s;
      var f = o.context, h = t.contextType, m = hi;
      if (typeof h == "object" && h !== null)
        m = mr(h);
      else {
        var E = kf(e, t, !0);
        m = Of(e, E);
      }
      var T = t.getDerivedStateFromProps, O = typeof T == "function" || typeof o.getSnapshotBeforeUpdate == "function";
      !O && (typeof o.UNSAFE_componentWillReceiveProps == "function" || typeof o.componentWillReceiveProps == "function") && (s !== a || f !== m) && bC(e, o, a, m), PE();
      var D = e.memoizedState, j = o.state = D;
      if (pm(e, a, o, i), j = e.memoizedState, s === a && D === j && !Qh() && !vm()) {
        if (typeof o.componentDidMount == "function") {
          var P = Vt;
          P |= nl, (e.mode & rn) !== Pe && (P |= Al), e.flags |= P;
        }
        return !1;
      }
      typeof T == "function" && (TS(e, t, T, a), j = e.memoizedState);
      var B = vm() || TC(e, t, s, a, D, j, m);
      if (B) {
        if (!O && (typeof o.UNSAFE_componentWillMount == "function" || typeof o.componentWillMount == "function") && (typeof o.componentWillMount == "function" && o.componentWillMount(), typeof o.UNSAFE_componentWillMount == "function" && o.UNSAFE_componentWillMount()), typeof o.componentDidMount == "function") {
          var he = Vt;
          he |= nl, (e.mode & rn) !== Pe && (he |= Al), e.flags |= he;
        }
      } else {
        if (typeof o.componentDidMount == "function") {
          var $e = Vt;
          $e |= nl, (e.mode & rn) !== Pe && ($e |= Al), e.flags |= $e;
        }
        e.memoizedProps = a, e.memoizedState = j;
      }
      return o.props = a, o.state = j, o.context = m, B;
    }
    function I_(e, t, a, i, o) {
      var s = t.stateNode;
      HE(e, t);
      var f = t.memoizedProps, h = t.type === t.elementType ? f : ml(t.type, f);
      s.props = h;
      var m = t.pendingProps, E = s.context, T = a.contextType, O = hi;
      if (typeof T == "object" && T !== null)
        O = mr(T);
      else {
        var D = kf(t, a, !0);
        O = Of(t, D);
      }
      var j = a.getDerivedStateFromProps, P = typeof j == "function" || typeof s.getSnapshotBeforeUpdate == "function";
      !P && (typeof s.UNSAFE_componentWillReceiveProps == "function" || typeof s.componentWillReceiveProps == "function") && (f !== m || E !== O) && bC(t, s, i, O), PE();
      var B = t.memoizedState, he = s.state = B;
      if (pm(t, i, s, o), he = t.memoizedState, f === m && B === he && !Qh() && !vm() && !be)
        return typeof s.componentDidUpdate == "function" && (f !== e.memoizedProps || B !== e.memoizedState) && (t.flags |= Vt), typeof s.getSnapshotBeforeUpdate == "function" && (f !== e.memoizedProps || B !== e.memoizedState) && (t.flags |= ur), !1;
      typeof j == "function" && (TS(t, a, j, i), he = t.memoizedState);
      var $e = vm() || TC(t, a, h, i, B, he, O) || // TODO: In some cases, we'll end up checking if context has changed twice,
      // both before and after `shouldComponentUpdate` has been called. Not ideal,
      // but I'm loath to refactor this function. This only happens for memoized
      // components so it's not that common.
      be;
      return $e ? (!P && (typeof s.UNSAFE_componentWillUpdate == "function" || typeof s.componentWillUpdate == "function") && (typeof s.componentWillUpdate == "function" && s.componentWillUpdate(i, he, O), typeof s.UNSAFE_componentWillUpdate == "function" && s.UNSAFE_componentWillUpdate(i, he, O)), typeof s.componentDidUpdate == "function" && (t.flags |= Vt), typeof s.getSnapshotBeforeUpdate == "function" && (t.flags |= ur)) : (typeof s.componentDidUpdate == "function" && (f !== e.memoizedProps || B !== e.memoizedState) && (t.flags |= Vt), typeof s.getSnapshotBeforeUpdate == "function" && (f !== e.memoizedProps || B !== e.memoizedState) && (t.flags |= ur), t.memoizedProps = i, t.memoizedState = he), s.props = i, s.state = he, s.context = O, $e;
    }
    function ac(e, t) {
      return {
        value: e,
        source: t,
        stack: Ki(t),
        digest: null
      };
    }
    function bS(e, t, a) {
      return {
        value: e,
        source: null,
        stack: a ?? null,
        digest: t ?? null
      };
    }
    function Y_(e, t) {
      return !0;
    }
    function _S(e, t) {
      try {
        var a = Y_(e, t);
        if (a === !1)
          return;
        var i = t.value, o = t.source, s = t.stack, f = s !== null ? s : "";
        if (i != null && i._suppressLogging) {
          if (e.tag === W)
            return;
          console.error(i);
        }
        var h = o ? ot(o) : null, m = h ? "The above error occurred in the <" + h + "> component:" : "The above error occurred in one of your React components:", E;
        if (e.tag === J)
          E = `Consider adding an error boundary to your tree to customize error handling behavior.
Visit https://reactjs.org/link/error-boundaries to learn more about error boundaries.`;
        else {
          var T = ot(e) || "Anonymous";
          E = "React will try to recreate this component tree from scratch " + ("using the error boundary you provided, " + T + ".");
        }
        var O = m + `
` + f + `

` + ("" + E);
        console.error(O);
      } catch (D) {
        setTimeout(function() {
          throw D;
        });
      }
    }
    var W_ = typeof WeakMap == "function" ? WeakMap : Map;
    function _C(e, t, a) {
      var i = Yo(Tn, a);
      i.tag = Mg, i.payload = {
        element: null
      };
      var o = t.value;
      return i.callback = function() {
        F1(o), _S(e, t);
      }, i;
    }
    function xS(e, t, a) {
      var i = Yo(Tn, a);
      i.tag = Mg;
      var o = e.type.getDerivedStateFromError;
      if (typeof o == "function") {
        var s = t.value;
        i.payload = function() {
          return o(s);
        }, i.callback = function() {
          jT(e), _S(e, t);
        };
      }
      var f = e.stateNode;
      return f !== null && typeof f.componentDidCatch == "function" && (i.callback = function() {
        jT(e), _S(e, t), typeof o != "function" && U1(this);
        var m = t.value, E = t.stack;
        this.componentDidCatch(m, {
          componentStack: E !== null ? E : ""
        }), typeof o != "function" && (da(e.lanes, qe) || C("%s: Error boundaries should implement getDerivedStateFromError(). In that method, return a state update to display an error message or fallback UI.", ot(e) || "Unknown"));
      }), i;
    }
    function xC(e, t, a) {
      var i = e.pingCache, o;
      if (i === null ? (i = e.pingCache = new W_(), o = /* @__PURE__ */ new Set(), i.set(t, o)) : (o = i.get(t), o === void 0 && (o = /* @__PURE__ */ new Set(), i.set(t, o))), !o.has(a)) {
        o.add(a);
        var s = H1.bind(null, e, t, a);
        ca && rv(e, a), t.then(s, s);
      }
    }
    function G_(e, t, a, i) {
      var o = e.updateQueue;
      if (o === null) {
        var s = /* @__PURE__ */ new Set();
        s.add(a), e.updateQueue = s;
      } else
        o.add(a);
    }
    function Q_(e, t) {
      var a = e.tag;
      if ((e.mode & kt) === Pe && (a === Q || a === Ze || a === je)) {
        var i = e.alternate;
        i ? (e.updateQueue = i.updateQueue, e.memoizedState = i.memoizedState, e.lanes = i.lanes) : (e.updateQueue = null, e.memoizedState = null);
      }
    }
    function DC(e) {
      var t = e;
      do {
        if (t.tag === _e && D_(t))
          return t;
        t = t.return;
      } while (t !== null);
      return null;
    }
    function kC(e, t, a, i, o) {
      if ((e.mode & kt) === Pe) {
        if (e === t)
          e.flags |= dr;
        else {
          if (e.flags |= ze, a.flags |= Mc, a.flags &= -52805, a.tag === W) {
            var s = a.alternate;
            if (s === null)
              a.tag = Gt;
            else {
              var f = Yo(Tn, qe);
              f.tag = sm, Fu(a, f, qe);
            }
          }
          a.lanes = Et(a.lanes, qe);
        }
        return e;
      }
      return e.flags |= dr, e.lanes = o, e;
    }
    function X_(e, t, a, i, o) {
      if (a.flags |= ps, ca && rv(e, o), i !== null && typeof i == "object" && typeof i.then == "function") {
        var s = i;
        Q_(a), Xr() && a.mode & kt && EE();
        var f = DC(t);
        if (f !== null) {
          f.flags &= ~zr, kC(f, t, a, e, o), f.mode & kt && xC(e, s, o), G_(f, e, s);
          return;
        } else {
          if (!Zv(o)) {
            xC(e, s, o), l0();
            return;
          }
          var h = new Error("A component suspended while responding to synchronous input. This will cause the UI to be replaced with a loading indicator. To fix, updates that suspend should be wrapped with startTransition.");
          i = h;
        }
      } else if (Xr() && a.mode & kt) {
        EE();
        var m = DC(t);
        if (m !== null) {
          (m.flags & dr) === He && (m.flags |= zr), kC(m, t, a, e, o), Sg(ac(i, a));
          return;
        }
      }
      i = ac(i, a), D1(i);
      var E = t;
      do {
        switch (E.tag) {
          case J: {
            var T = i;
            E.flags |= dr;
            var O = Ds(o);
            E.lanes = Et(E.lanes, O);
            var D = _C(E, T, O);
            Ag(E, D);
            return;
          }
          case W:
            var j = i, P = E.type, B = E.stateNode;
            if ((E.flags & ze) === He && (typeof P.getDerivedStateFromError == "function" || B !== null && typeof B.componentDidCatch == "function" && !DT(B))) {
              E.flags |= dr;
              var he = Ds(o);
              E.lanes = Et(E.lanes, he);
              var $e = xS(E, j, he);
              Ag(E, $e);
              return;
            }
            break;
        }
        E = E.return;
      } while (E !== null);
    }
    function K_() {
      return null;
    }
    var Vp = v.ReactCurrentOwner, yl = !1, DS, Bp, kS, OS, MS, ic, LS, Fm, $p;
    DS = {}, Bp = {}, kS = {}, OS = {}, MS = {}, ic = !1, LS = {}, Fm = {}, $p = {};
    function Da(e, t, a, i) {
      e === null ? t.child = LE(t, null, a, i) : t.child = Af(t, e.child, a, i);
    }
    function q_(e, t, a, i) {
      t.child = Af(t, e.child, null, i), t.child = Af(t, null, a, i);
    }
    function OC(e, t, a, i, o) {
      if (t.type !== t.elementType) {
        var s = a.propTypes;
        s && fl(
          s,
          i,
          // Resolved props
          "prop",
          Yt(a)
        );
      }
      var f = a.render, h = t.ref, m, E;
      Uf(t, o), wa(t);
      {
        if (Vp.current = t, or(!0), m = Bf(e, t, f, i, h, o), E = $f(), t.mode & Sn) {
          Nn(!0);
          try {
            m = Bf(e, t, f, i, h, o), E = $f();
          } finally {
            Nn(!1);
          }
        }
        or(!1);
      }
      return ba(), e !== null && !yl ? (WE(e, t, o), Wo(e, t, o)) : (Xr() && E && pg(t), t.flags |= ci, Da(e, t, m, o), t.child);
    }
    function MC(e, t, a, i, o) {
      if (e === null) {
        var s = a.type;
        if (nD(s) && a.compare === null && // SimpleMemoComponent codepath doesn't resolve outer props either.
        a.defaultProps === void 0) {
          var f = s;
          return f = qf(s), t.tag = je, t.type = f, zS(t, s), LC(e, t, f, i, o);
        }
        {
          var h = s.propTypes;
          if (h && fl(
            h,
            i,
            // Resolved props
            "prop",
            Yt(s)
          ), a.defaultProps !== void 0) {
            var m = Yt(s) || "Unknown";
            $p[m] || (C("%s: Support for defaultProps will be removed from memo components in a future major release. Use JavaScript default parameters instead.", m), $p[m] = !0);
          }
        }
        var E = y0(a.type, null, i, t, t.mode, o);
        return E.ref = t.ref, E.return = t, t.child = E, E;
      }
      {
        var T = a.type, O = T.propTypes;
        O && fl(
          O,
          i,
          // Resolved props
          "prop",
          Yt(T)
        );
      }
      var D = e.child, j = VS(e, o);
      if (!j) {
        var P = D.memoizedProps, B = a.compare;
        if (B = B !== null ? B : De, B(P, i) && e.ref === t.ref)
          return Wo(e, t, o);
      }
      t.flags |= ci;
      var he = cc(D, i);
      return he.ref = t.ref, he.return = t, t.child = he, he;
    }
    function LC(e, t, a, i, o) {
      if (t.type !== t.elementType) {
        var s = t.elementType;
        if (s.$$typeof === ut) {
          var f = s, h = f._payload, m = f._init;
          try {
            s = m(h);
          } catch {
            s = null;
          }
          var E = s && s.propTypes;
          E && fl(
            E,
            i,
            // Resolved (SimpleMemoComponent has no defaultProps)
            "prop",
            Yt(s)
          );
        }
      }
      if (e !== null) {
        var T = e.memoizedProps;
        if (De(T, i) && e.ref === t.ref && // Prevent bailout if the implementation changed due to hot reload.
        t.type === e.type)
          if (yl = !1, t.pendingProps = i = T, VS(e, o))
            (e.flags & Mc) !== He && (yl = !0);
          else return t.lanes = e.lanes, Wo(e, t, o);
      }
      return NS(e, t, a, i, o);
    }
    function NC(e, t, a) {
      var i = t.pendingProps, o = i.children, s = e !== null ? e.memoizedState : null;
      if (i.mode === "hidden" || ue)
        if ((t.mode & kt) === Pe) {
          var f = {
            baseLanes: K,
            cachePool: null,
            transitions: null
          };
          t.memoizedState = f, qm(t, a);
        } else if (da(a, fa)) {
          var O = {
            baseLanes: K,
            cachePool: null,
            transitions: null
          };
          t.memoizedState = O;
          var D = s !== null ? s.baseLanes : a;
          qm(t, D);
        } else {
          var h = null, m;
          if (s !== null) {
            var E = s.baseLanes;
            m = Et(E, a);
          } else
            m = a;
          t.lanes = t.childLanes = fa;
          var T = {
            baseLanes: m,
            cachePool: h,
            transitions: null
          };
          return t.memoizedState = T, t.updateQueue = null, qm(t, m), null;
        }
      else {
        var j;
        s !== null ? (j = Et(s.baseLanes, a), t.memoizedState = null) : j = a, qm(t, j);
      }
      return Da(e, t, o, a), t.child;
    }
    function Z_(e, t, a) {
      var i = t.pendingProps;
      return Da(e, t, i, a), t.child;
    }
    function J_(e, t, a) {
      var i = t.pendingProps.children;
      return Da(e, t, i, a), t.child;
    }
    function ex(e, t, a) {
      {
        t.flags |= Vt;
        {
          var i = t.stateNode;
          i.effectDuration = 0, i.passiveEffectDuration = 0;
        }
      }
      var o = t.pendingProps, s = o.children;
      return Da(e, t, s, a), t.child;
    }
    function AC(e, t) {
      var a = t.ref;
      (e === null && a !== null || e !== null && e.ref !== a) && (t.flags |= Hn, t.flags |= Su);
    }
    function NS(e, t, a, i, o) {
      if (t.type !== t.elementType) {
        var s = a.propTypes;
        s && fl(
          s,
          i,
          // Resolved props
          "prop",
          Yt(a)
        );
      }
      var f;
      {
        var h = kf(t, a, !0);
        f = Of(t, h);
      }
      var m, E;
      Uf(t, o), wa(t);
      {
        if (Vp.current = t, or(!0), m = Bf(e, t, a, i, f, o), E = $f(), t.mode & Sn) {
          Nn(!0);
          try {
            m = Bf(e, t, a, i, f, o), E = $f();
          } finally {
            Nn(!1);
          }
        }
        or(!1);
      }
      return ba(), e !== null && !yl ? (WE(e, t, o), Wo(e, t, o)) : (Xr() && E && pg(t), t.flags |= ci, Da(e, t, m, o), t.child);
    }
    function zC(e, t, a, i, o) {
      {
        switch (yD(t)) {
          case !1: {
            var s = t.stateNode, f = t.type, h = new f(t.memoizedProps, s.context), m = h.state;
            s.updater.enqueueSetState(s, m, null);
            break;
          }
          case !0: {
            t.flags |= ze, t.flags |= dr;
            var E = new Error("Simulated error coming from DevTools"), T = Ds(o);
            t.lanes = Et(t.lanes, T);
            var O = xS(t, ac(E, t), T);
            Ag(t, O);
            break;
          }
        }
        if (t.type !== t.elementType) {
          var D = a.propTypes;
          D && fl(
            D,
            i,
            // Resolved props
            "prop",
            Yt(a)
          );
        }
      }
      var j;
      ql(a) ? (j = !0, Kh(t)) : j = !1, Uf(t, o);
      var P = t.stateNode, B;
      P === null ? (Pm(e, t), wC(t, a, i), wS(t, a, i, o), B = !0) : e === null ? B = $_(t, a, i, o) : B = I_(e, t, a, i, o);
      var he = AS(e, t, a, B, j, o);
      {
        var $e = t.stateNode;
        B && $e.props !== i && (ic || C("It looks like %s is reassigning its own `this.props` while rendering. This is not supported and can lead to confusing bugs.", ot(t) || "a component"), ic = !0);
      }
      return he;
    }
    function AS(e, t, a, i, o, s) {
      AC(e, t);
      var f = (t.flags & ze) !== He;
      if (!i && !f)
        return o && mE(t, a, !1), Wo(e, t, s);
      var h = t.stateNode;
      Vp.current = t;
      var m;
      if (f && typeof a.getDerivedStateFromError != "function")
        m = null, SC();
      else {
        wa(t);
        {
          if (or(!0), m = h.render(), t.mode & Sn) {
            Nn(!0);
            try {
              h.render();
            } finally {
              Nn(!1);
            }
          }
          or(!1);
        }
        ba();
      }
      return t.flags |= ci, e !== null && f ? q_(e, t, m, s) : Da(e, t, m, s), t.memoizedState = h.state, o && mE(t, a, !0), t.child;
    }
    function UC(e) {
      var t = e.stateNode;
      t.pendingContext ? vE(e, t.pendingContext, t.pendingContext !== t.context) : t.context && vE(e, t.context, !1), zg(e, t.containerInfo);
    }
    function tx(e, t, a) {
      if (UC(t), e === null)
        throw new Error("Should have a current fiber. This is a bug in React.");
      var i = t.pendingProps, o = t.memoizedState, s = o.element;
      HE(e, t), pm(t, i, null, a);
      var f = t.memoizedState;
      t.stateNode;
      var h = f.element;
      if (o.isDehydrated) {
        var m = {
          element: h,
          isDehydrated: !1,
          cache: f.cache,
          pendingSuspenseBoundaries: f.pendingSuspenseBoundaries,
          transitions: f.transitions
        }, E = t.updateQueue;
        if (E.baseState = m, t.memoizedState = m, t.flags & zr) {
          var T = ac(new Error("There was an error while hydrating. Because the error happened outside of a Suspense boundary, the entire root will switch to client rendering."), t);
          return jC(e, t, h, a, T);
        } else if (h !== s) {
          var O = ac(new Error("This root received an early update, before anything was able hydrate. Switched the entire root to client rendering."), t);
          return jC(e, t, h, a, O);
        } else {
          a_(t);
          var D = LE(t, null, h, a);
          t.child = D;
          for (var j = D; j; )
            j.flags = j.flags & ~Ln | oa, j = j.sibling;
        }
      } else {
        if (Nf(), h === s)
          return Wo(e, t, a);
        Da(e, t, h, a);
      }
      return t.child;
    }
    function jC(e, t, a, i, o) {
      return Nf(), Sg(o), t.flags |= zr, Da(e, t, a, i), t.child;
    }
    function nx(e, t, a) {
      $E(t), e === null && gg(t);
      var i = t.type, o = t.pendingProps, s = e !== null ? e.memoizedProps : null, f = o.children, h = Jy(i, o);
      return h ? f = null : s !== null && Jy(i, s) && (t.flags |= Fa), AC(e, t), Da(e, t, f, a), t.child;
    }
    function rx(e, t) {
      return e === null && gg(t), null;
    }
    function ax(e, t, a, i) {
      Pm(e, t);
      var o = t.pendingProps, s = a, f = s._payload, h = s._init, m = h(f);
      t.type = m;
      var E = t.tag = rD(m), T = ml(m, o), O;
      switch (E) {
        case Q:
          return zS(t, m), t.type = m = qf(m), O = NS(null, t, m, T, i), O;
        case W:
          return t.type = m = f0(m), O = zC(null, t, m, T, i), O;
        case Ze:
          return t.type = m = d0(m), O = OC(null, t, m, T, i), O;
        case Le: {
          if (t.type !== t.elementType) {
            var D = m.propTypes;
            D && fl(
              D,
              T,
              // Resolved for outer only
              "prop",
              Yt(m)
            );
          }
          return O = MC(
            null,
            t,
            m,
            ml(m.type, T),
            // The inner type can have defaults too
            i
          ), O;
        }
      }
      var j = "";
      throw m !== null && typeof m == "object" && m.$$typeof === ut && (j = " Did you wrap a component in React.lazy() more than once?"), new Error("Element type is invalid. Received a promise that resolves to: " + m + ". " + ("Lazy element type must resolve to a class or function." + j));
    }
    function ix(e, t, a, i, o) {
      Pm(e, t), t.tag = W;
      var s;
      return ql(a) ? (s = !0, Kh(t)) : s = !1, Uf(t, o), wC(t, a, i), wS(t, a, i, o), AS(null, t, a, !0, s, o);
    }
    function lx(e, t, a, i) {
      Pm(e, t);
      var o = t.pendingProps, s;
      {
        var f = kf(t, a, !1);
        s = Of(t, f);
      }
      Uf(t, i);
      var h, m;
      wa(t);
      {
        if (a.prototype && typeof a.prototype.render == "function") {
          var E = Yt(a) || "Unknown";
          DS[E] || (C("The <%s /> component appears to have a render method, but doesn't extend React.Component. This is likely to cause errors. Change %s to extend React.Component instead.", E, E), DS[E] = !0);
        }
        t.mode & Sn && pl.recordLegacyContextWarning(t, null), or(!0), Vp.current = t, h = Bf(null, t, a, o, s, i), m = $f(), or(!1);
      }
      if (ba(), t.flags |= ci, typeof h == "object" && h !== null && typeof h.render == "function" && h.$$typeof === void 0) {
        var T = Yt(a) || "Unknown";
        Bp[T] || (C("The <%s /> component appears to be a function component that returns a class instance. Change %s to a class that extends React.Component instead. If you can't use a class try assigning the prototype on the function as a workaround. `%s.prototype = React.Component.prototype`. Don't use an arrow function since it cannot be called with `new` by React.", T, T, T), Bp[T] = !0);
      }
      if (
        // Run these checks in production only if the flag is off.
        // Eventually we'll delete this branch altogether.
        typeof h == "object" && h !== null && typeof h.render == "function" && h.$$typeof === void 0
      ) {
        {
          var O = Yt(a) || "Unknown";
          Bp[O] || (C("The <%s /> component appears to be a function component that returns a class instance. Change %s to a class that extends React.Component instead. If you can't use a class try assigning the prototype on the function as a workaround. `%s.prototype = React.Component.prototype`. Don't use an arrow function since it cannot be called with `new` by React.", O, O, O), Bp[O] = !0);
        }
        t.tag = W, t.memoizedState = null, t.updateQueue = null;
        var D = !1;
        return ql(a) ? (D = !0, Kh(t)) : D = !1, t.memoizedState = h.state !== null && h.state !== void 0 ? h.state : null, Ng(t), RC(t, h), wS(t, a, o, i), AS(null, t, a, !0, D, i);
      } else {
        if (t.tag = Q, t.mode & Sn) {
          Nn(!0);
          try {
            h = Bf(null, t, a, o, s, i), m = $f();
          } finally {
            Nn(!1);
          }
        }
        return Xr() && m && pg(t), Da(null, t, h, i), zS(t, a), t.child;
      }
    }
    function zS(e, t) {
      {
        if (t && t.childContextTypes && C("%s(...): childContextTypes cannot be defined on a function component.", t.displayName || t.name || "Component"), e.ref !== null) {
          var a = "", i = Br();
          i && (a += `

Check the render method of \`` + i + "`.");
          var o = i || "", s = e._debugSource;
          s && (o = s.fileName + ":" + s.lineNumber), MS[o] || (MS[o] = !0, C("Function components cannot be given refs. Attempts to access this ref will fail. Did you mean to use React.forwardRef()?%s", a));
        }
        if (t.defaultProps !== void 0) {
          var f = Yt(t) || "Unknown";
          $p[f] || (C("%s: Support for defaultProps will be removed from function components in a future major release. Use JavaScript default parameters instead.", f), $p[f] = !0);
        }
        if (typeof t.getDerivedStateFromProps == "function") {
          var h = Yt(t) || "Unknown";
          OS[h] || (C("%s: Function components do not support getDerivedStateFromProps.", h), OS[h] = !0);
        }
        if (typeof t.contextType == "object" && t.contextType !== null) {
          var m = Yt(t) || "Unknown";
          kS[m] || (C("%s: Function components do not support contextType.", m), kS[m] = !0);
        }
      }
    }
    var US = {
      dehydrated: null,
      treeContext: null,
      retryLane: Kt
    };
    function jS(e) {
      return {
        baseLanes: e,
        cachePool: K_(),
        transitions: null
      };
    }
    function ox(e, t) {
      var a = null;
      return {
        baseLanes: Et(e.baseLanes, t),
        cachePool: a,
        transitions: e.transitions
      };
    }
    function ux(e, t, a, i) {
      if (t !== null) {
        var o = t.memoizedState;
        if (o === null)
          return !1;
      }
      return Fg(e, Lp);
    }
    function sx(e, t) {
      return ks(e.childLanes, t);
    }
    function FC(e, t, a) {
      var i = t.pendingProps;
      gD(t) && (t.flags |= ze);
      var o = vl.current, s = !1, f = (t.flags & ze) !== He;
      if (f || ux(o, e) ? (s = !0, t.flags &= ~ze) : (e === null || e.memoizedState !== null) && (o = x_(o, YE)), o = Ff(o), Pu(t, o), e === null) {
        gg(t);
        var h = t.memoizedState;
        if (h !== null) {
          var m = h.dehydrated;
          if (m !== null)
            return vx(t, m);
        }
        var E = i.children, T = i.fallback;
        if (s) {
          var O = cx(t, E, T, a), D = t.child;
          return D.memoizedState = jS(a), t.memoizedState = US, O;
        } else
          return FS(t, E);
      } else {
        var j = e.memoizedState;
        if (j !== null) {
          var P = j.dehydrated;
          if (P !== null)
            return hx(e, t, f, i, P, j, a);
        }
        if (s) {
          var B = i.fallback, he = i.children, $e = dx(e, t, he, B, a), Ne = t.child, It = e.child.memoizedState;
          return Ne.memoizedState = It === null ? jS(a) : ox(It, a), Ne.childLanes = sx(e, a), t.memoizedState = US, $e;
        } else {
          var Ut = i.children, A = fx(e, t, Ut, a);
          return t.memoizedState = null, A;
        }
      }
    }
    function FS(e, t, a) {
      var i = e.mode, o = {
        mode: "visible",
        children: t
      }, s = HS(o, i);
      return s.return = e, e.child = s, s;
    }
    function cx(e, t, a, i) {
      var o = e.mode, s = e.child, f = {
        mode: "hidden",
        children: t
      }, h, m;
      return (o & kt) === Pe && s !== null ? (h = s, h.childLanes = K, h.pendingProps = f, e.mode & nn && (h.actualDuration = 0, h.actualStartTime = -1, h.selfBaseDuration = 0, h.treeBaseDuration = 0), m = Qu(a, o, i, null)) : (h = HS(f, o), m = Qu(a, o, i, null)), h.return = e, m.return = e, h.sibling = m, e.child = h, m;
    }
    function HS(e, t, a) {
      return HT(e, t, K, null);
    }
    function HC(e, t) {
      return cc(e, t);
    }
    function fx(e, t, a, i) {
      var o = e.child, s = o.sibling, f = HC(o, {
        mode: "visible",
        children: a
      });
      if ((t.mode & kt) === Pe && (f.lanes = i), f.return = t, f.sibling = null, s !== null) {
        var h = t.deletions;
        h === null ? (t.deletions = [s], t.flags |= ja) : h.push(s);
      }
      return t.child = f, f;
    }
    function dx(e, t, a, i, o) {
      var s = t.mode, f = e.child, h = f.sibling, m = {
        mode: "hidden",
        children: a
      }, E;
      if (
        // In legacy mode, we commit the primary tree as if it successfully
        // completed, even though it's in an inconsistent state.
        (s & kt) === Pe && // Make sure we're on the second pass, i.e. the primary child fragment was
        // already cloned. In legacy mode, the only case where this isn't true is
        // when DevTools forces us to display a fallback; we skip the first render
        // pass entirely and go straight to rendering the fallback. (In Concurrent
        // Mode, SuspenseList can also trigger this scenario, but this is a legacy-
        // only codepath.)
        t.child !== f
      ) {
        var T = t.child;
        E = T, E.childLanes = K, E.pendingProps = m, t.mode & nn && (E.actualDuration = 0, E.actualStartTime = -1, E.selfBaseDuration = f.selfBaseDuration, E.treeBaseDuration = f.treeBaseDuration), t.deletions = null;
      } else
        E = HC(f, m), E.subtreeFlags = f.subtreeFlags & Jn;
      var O;
      return h !== null ? O = cc(h, i) : (O = Qu(i, s, o, null), O.flags |= Ln), O.return = t, E.return = t, E.sibling = O, t.child = E, O;
    }
    function Hm(e, t, a, i) {
      i !== null && Sg(i), Af(t, e.child, null, a);
      var o = t.pendingProps, s = o.children, f = FS(t, s);
      return f.flags |= Ln, t.memoizedState = null, f;
    }
    function px(e, t, a, i, o) {
      var s = t.mode, f = {
        mode: "visible",
        children: a
      }, h = HS(f, s), m = Qu(i, s, o, null);
      return m.flags |= Ln, h.return = t, m.return = t, h.sibling = m, t.child = h, (t.mode & kt) !== Pe && Af(t, e.child, null, o), m;
    }
    function vx(e, t, a) {
      return (e.mode & kt) === Pe ? (C("Cannot hydrate Suspense in legacy mode. Switch from ReactDOM.hydrate(element, container) to ReactDOMClient.hydrateRoot(container, <App />).render(element) or remove the Suspense components from the server rendered components."), e.lanes = qe) : rg(t) ? e.lanes = Ur : e.lanes = fa, null;
    }
    function hx(e, t, a, i, o, s, f) {
      if (a)
        if (t.flags & zr) {
          t.flags &= ~zr;
          var A = bS(new Error("There was an error while hydrating this Suspense boundary. Switched to client rendering."));
          return Hm(e, t, f, A);
        } else {
          if (t.memoizedState !== null)
            return t.child = e.child, t.flags |= ze, null;
          var $ = i.children, z = i.fallback, ae = px(e, t, $, z, f), Te = t.child;
          return Te.memoizedState = jS(f), t.memoizedState = US, ae;
        }
      else {
        if (n_(), (t.mode & kt) === Pe)
          return Hm(
            e,
            t,
            f,
            // TODO: When we delete legacy mode, we should make this error argument
            // required — every concurrent mode path that causes hydration to
            // de-opt to client rendering should have an error message.
            null
          );
        if (rg(o)) {
          var h, m, E;
          {
            var T = Sb(o);
            h = T.digest, m = T.message, E = T.stack;
          }
          var O;
          m ? O = new Error(m) : O = new Error("The server could not finish this Suspense boundary, likely due to an error during server rendering. Switched to client rendering.");
          var D = bS(O, h, E);
          return Hm(e, t, f, D);
        }
        var j = da(f, e.childLanes);
        if (yl || j) {
          var P = Km();
          if (P !== null) {
            var B = Wd(P, f);
            if (B !== Kt && B !== s.retryLane) {
              s.retryLane = B;
              var he = Tn;
              Ga(e, B), Nr(P, e, B, he);
            }
          }
          l0();
          var $e = bS(new Error("This Suspense boundary received an update before it finished hydrating. This caused the boundary to switch to client rendering. The usual way to fix this is to wrap the original update in startTransition."));
          return Hm(e, t, f, $e);
        } else if (uE(o)) {
          t.flags |= ze, t.child = e.child;
          var Ne = P1.bind(null, e);
          return Eb(o, Ne), null;
        } else {
          i_(t, o, s.treeContext);
          var It = i.children, Ut = FS(t, It);
          return Ut.flags |= oa, Ut;
        }
      }
    }
    function PC(e, t, a) {
      e.lanes = Et(e.lanes, t);
      var i = e.alternate;
      i !== null && (i.lanes = Et(i.lanes, t)), kg(e.return, t, a);
    }
    function mx(e, t, a) {
      for (var i = t; i !== null; ) {
        if (i.tag === _e) {
          var o = i.memoizedState;
          o !== null && PC(i, a, e);
        } else if (i.tag === dn)
          PC(i, a, e);
        else if (i.child !== null) {
          i.child.return = i, i = i.child;
          continue;
        }
        if (i === e)
          return;
        for (; i.sibling === null; ) {
          if (i.return === null || i.return === e)
            return;
          i = i.return;
        }
        i.sibling.return = i.return, i = i.sibling;
      }
    }
    function yx(e) {
      for (var t = e, a = null; t !== null; ) {
        var i = t.alternate;
        i !== null && ym(i) === null && (a = t), t = t.sibling;
      }
      return a;
    }
    function gx(e) {
      if (e !== void 0 && e !== "forwards" && e !== "backwards" && e !== "together" && !LS[e])
        if (LS[e] = !0, typeof e == "string")
          switch (e.toLowerCase()) {
            case "together":
            case "forwards":
            case "backwards": {
              C('"%s" is not a valid value for revealOrder on <SuspenseList />. Use lowercase "%s" instead.', e, e.toLowerCase());
              break;
            }
            case "forward":
            case "backward": {
              C('"%s" is not a valid value for revealOrder on <SuspenseList />. React uses the -s suffix in the spelling. Use "%ss" instead.', e, e.toLowerCase());
              break;
            }
            default:
              C('"%s" is not a supported revealOrder on <SuspenseList />. Did you mean "together", "forwards" or "backwards"?', e);
              break;
          }
        else
          C('%s is not a supported value for revealOrder on <SuspenseList />. Did you mean "together", "forwards" or "backwards"?', e);
    }
    function Sx(e, t) {
      e !== void 0 && !Fm[e] && (e !== "collapsed" && e !== "hidden" ? (Fm[e] = !0, C('"%s" is not a supported value for tail on <SuspenseList />. Did you mean "collapsed" or "hidden"?', e)) : t !== "forwards" && t !== "backwards" && (Fm[e] = !0, C('<SuspenseList tail="%s" /> is only valid if revealOrder is "forwards" or "backwards". Did you mean to specify revealOrder="forwards"?', e)));
    }
    function VC(e, t) {
      {
        var a = bt(e), i = !a && typeof yt(e) == "function";
        if (a || i) {
          var o = a ? "array" : "iterable";
          return C("A nested %s was passed to row #%s in <SuspenseList />. Wrap it in an additional SuspenseList to configure its revealOrder: <SuspenseList revealOrder=...> ... <SuspenseList revealOrder=...>{%s}</SuspenseList> ... </SuspenseList>", o, t, o), !1;
        }
      }
      return !0;
    }
    function Ex(e, t) {
      if ((t === "forwards" || t === "backwards") && e !== void 0 && e !== null && e !== !1)
        if (bt(e)) {
          for (var a = 0; a < e.length; a++)
            if (!VC(e[a], a))
              return;
        } else {
          var i = yt(e);
          if (typeof i == "function") {
            var o = i.call(e);
            if (o)
              for (var s = o.next(), f = 0; !s.done; s = o.next()) {
                if (!VC(s.value, f))
                  return;
                f++;
              }
          } else
            C('A single row was passed to a <SuspenseList revealOrder="%s" />. This is not useful since it needs multiple rows. Did you mean to pass multiple children or an array?', t);
        }
    }
    function PS(e, t, a, i, o) {
      var s = e.memoizedState;
      s === null ? e.memoizedState = {
        isBackwards: t,
        rendering: null,
        renderingStartTime: 0,
        last: i,
        tail: a,
        tailMode: o
      } : (s.isBackwards = t, s.rendering = null, s.renderingStartTime = 0, s.last = i, s.tail = a, s.tailMode = o);
    }
    function BC(e, t, a) {
      var i = t.pendingProps, o = i.revealOrder, s = i.tail, f = i.children;
      gx(o), Sx(s, o), Ex(f, o), Da(e, t, f, a);
      var h = vl.current, m = Fg(h, Lp);
      if (m)
        h = Hg(h, Lp), t.flags |= ze;
      else {
        var E = e !== null && (e.flags & ze) !== He;
        E && mx(t, t.child, a), h = Ff(h);
      }
      if (Pu(t, h), (t.mode & kt) === Pe)
        t.memoizedState = null;
      else
        switch (o) {
          case "forwards": {
            var T = yx(t.child), O;
            T === null ? (O = t.child, t.child = null) : (O = T.sibling, T.sibling = null), PS(
              t,
              !1,
              // isBackwards
              O,
              T,
              s
            );
            break;
          }
          case "backwards": {
            var D = null, j = t.child;
            for (t.child = null; j !== null; ) {
              var P = j.alternate;
              if (P !== null && ym(P) === null) {
                t.child = j;
                break;
              }
              var B = j.sibling;
              j.sibling = D, D = j, j = B;
            }
            PS(
              t,
              !0,
              // isBackwards
              D,
              null,
              // last
              s
            );
            break;
          }
          case "together": {
            PS(
              t,
              !1,
              // isBackwards
              null,
              // tail
              null,
              // last
              void 0
            );
            break;
          }
          default:
            t.memoizedState = null;
        }
      return t.child;
    }
    function Cx(e, t, a) {
      zg(t, t.stateNode.containerInfo);
      var i = t.pendingProps;
      return e === null ? t.child = Af(t, null, i, a) : Da(e, t, i, a), t.child;
    }
    var $C = !1;
    function Tx(e, t, a) {
      var i = t.type, o = i._context, s = t.pendingProps, f = t.memoizedProps, h = s.value;
      {
        "value" in s || $C || ($C = !0, C("The `value` prop is required for the `<Context.Provider>`. Did you misspell it or forget to pass it?"));
        var m = t.type.propTypes;
        m && fl(m, s, "prop", "Context.Provider");
      }
      if (zE(t, o, h), f !== null) {
        var E = f.value;
        if (te(E, h)) {
          if (f.children === s.children && !Qh())
            return Wo(e, t, a);
        } else
          g_(t, o, a);
      }
      var T = s.children;
      return Da(e, t, T, a), t.child;
    }
    var IC = !1;
    function Rx(e, t, a) {
      var i = t.type;
      i._context === void 0 ? i !== i.Consumer && (IC || (IC = !0, C("Rendering <Context> directly is not supported and will be removed in a future major release. Did you mean to render <Context.Consumer> instead?"))) : i = i._context;
      var o = t.pendingProps, s = o.children;
      typeof s != "function" && C("A context consumer was rendered with multiple children, or a child that isn't a function. A context consumer expects a single child that is a function. If you did pass a function, make sure there is no trailing or leading whitespace around it."), Uf(t, a);
      var f = mr(i);
      wa(t);
      var h;
      return Vp.current = t, or(!0), h = s(f), or(!1), ba(), t.flags |= ci, Da(e, t, h, a), t.child;
    }
    function Ip() {
      yl = !0;
    }
    function Pm(e, t) {
      (t.mode & kt) === Pe && e !== null && (e.alternate = null, t.alternate = null, t.flags |= Ln);
    }
    function Wo(e, t, a) {
      return e !== null && (t.dependencies = e.dependencies), SC(), nv(t.lanes), da(a, t.childLanes) ? (m_(e, t), t.child) : null;
    }
    function wx(e, t, a) {
      {
        var i = t.return;
        if (i === null)
          throw new Error("Cannot swap the root fiber.");
        if (e.alternate = null, t.alternate = null, a.index = t.index, a.sibling = t.sibling, a.return = t.return, a.ref = t.ref, t === i.child)
          i.child = a;
        else {
          var o = i.child;
          if (o === null)
            throw new Error("Expected parent to have a child.");
          for (; o.sibling !== t; )
            if (o = o.sibling, o === null)
              throw new Error("Expected to find the previous sibling.");
          o.sibling = a;
        }
        var s = i.deletions;
        return s === null ? (i.deletions = [e], i.flags |= ja) : s.push(e), a.flags |= Ln, a;
      }
    }
    function VS(e, t) {
      var a = e.lanes;
      return !!da(a, t);
    }
    function bx(e, t, a) {
      switch (t.tag) {
        case J:
          UC(t), t.stateNode, Nf();
          break;
        case oe:
          $E(t);
          break;
        case W: {
          var i = t.type;
          ql(i) && Kh(t);
          break;
        }
        case se:
          zg(t, t.stateNode.containerInfo);
          break;
        case tt: {
          var o = t.memoizedProps.value, s = t.type._context;
          zE(t, s, o);
          break;
        }
        case Je:
          {
            var f = da(a, t.childLanes);
            f && (t.flags |= Vt);
            {
              var h = t.stateNode;
              h.effectDuration = 0, h.passiveEffectDuration = 0;
            }
          }
          break;
        case _e: {
          var m = t.memoizedState;
          if (m !== null) {
            if (m.dehydrated !== null)
              return Pu(t, Ff(vl.current)), t.flags |= ze, null;
            var E = t.child, T = E.childLanes;
            if (da(a, T))
              return FC(e, t, a);
            Pu(t, Ff(vl.current));
            var O = Wo(e, t, a);
            return O !== null ? O.sibling : null;
          } else
            Pu(t, Ff(vl.current));
          break;
        }
        case dn: {
          var D = (e.flags & ze) !== He, j = da(a, t.childLanes);
          if (D) {
            if (j)
              return BC(e, t, a);
            t.flags |= ze;
          }
          var P = t.memoizedState;
          if (P !== null && (P.rendering = null, P.tail = null, P.lastEffect = null), Pu(t, vl.current), j)
            break;
          return null;
        }
        case Ae:
        case _t:
          return t.lanes = K, NC(e, t, a);
      }
      return Wo(e, t, a);
    }
    function YC(e, t, a) {
      if (t._debugNeedsRemount && e !== null)
        return wx(e, t, y0(t.type, t.key, t.pendingProps, t._debugOwner || null, t.mode, t.lanes));
      if (e !== null) {
        var i = e.memoizedProps, o = t.pendingProps;
        if (i !== o || Qh() || // Force a re-render if the implementation changed due to hot reload:
        t.type !== e.type)
          yl = !0;
        else {
          var s = VS(e, a);
          if (!s && // If this is the second pass of an error or suspense boundary, there
          // may not be work scheduled on `current`, so we check for this flag.
          (t.flags & ze) === He)
            return yl = !1, bx(e, t, a);
          (e.flags & Mc) !== He ? yl = !0 : yl = !1;
        }
      } else if (yl = !1, Xr() && Kb(t)) {
        var f = t.index, h = qb();
        SE(t, h, f);
      }
      switch (t.lanes = K, t.tag) {
        case Z:
          return lx(e, t, t.type, a);
        case sn: {
          var m = t.elementType;
          return ax(e, t, m, a);
        }
        case Q: {
          var E = t.type, T = t.pendingProps, O = t.elementType === E ? T : ml(E, T);
          return NS(e, t, E, O, a);
        }
        case W: {
          var D = t.type, j = t.pendingProps, P = t.elementType === D ? j : ml(D, j);
          return zC(e, t, D, P, a);
        }
        case J:
          return tx(e, t, a);
        case oe:
          return nx(e, t, a);
        case Ue:
          return rx(e, t);
        case _e:
          return FC(e, t, a);
        case se:
          return Cx(e, t, a);
        case Ze: {
          var B = t.type, he = t.pendingProps, $e = t.elementType === B ? he : ml(B, he);
          return OC(e, t, B, $e, a);
        }
        case ct:
          return Z_(e, t, a);
        case Ke:
          return J_(e, t, a);
        case Je:
          return ex(e, t, a);
        case tt:
          return Tx(e, t, a);
        case jt:
          return Rx(e, t, a);
        case Le: {
          var Ne = t.type, It = t.pendingProps, Ut = ml(Ne, It);
          if (t.type !== t.elementType) {
            var A = Ne.propTypes;
            A && fl(
              A,
              Ut,
              // Resolved for outer only
              "prop",
              Yt(Ne)
            );
          }
          return Ut = ml(Ne.type, Ut), MC(e, t, Ne, Ut, a);
        }
        case je:
          return LC(e, t, t.type, t.pendingProps, a);
        case Gt: {
          var $ = t.type, z = t.pendingProps, ae = t.elementType === $ ? z : ml($, z);
          return ix(e, t, $, ae, a);
        }
        case dn:
          return BC(e, t, a);
        case nt:
          break;
        case Ae:
          return NC(e, t, a);
      }
      throw new Error("Unknown unit of work tag (" + t.tag + "). This error is likely caused by a bug in React. Please file an issue.");
    }
    function If(e) {
      e.flags |= Vt;
    }
    function WC(e) {
      e.flags |= Hn, e.flags |= Su;
    }
    var GC, BS, QC, XC;
    GC = function(e, t, a, i) {
      for (var o = t.child; o !== null; ) {
        if (o.tag === oe || o.tag === Ue)
          Gw(e, o.stateNode);
        else if (o.tag !== se) {
          if (o.child !== null) {
            o.child.return = o, o = o.child;
            continue;
          }
        }
        if (o === t)
          return;
        for (; o.sibling === null; ) {
          if (o.return === null || o.return === t)
            return;
          o = o.return;
        }
        o.sibling.return = o.return, o = o.sibling;
      }
    }, BS = function(e, t) {
    }, QC = function(e, t, a, i, o) {
      var s = e.memoizedProps;
      if (s !== i) {
        var f = t.stateNode, h = Ug(), m = Xw(f, a, s, i, o, h);
        t.updateQueue = m, m && If(t);
      }
    }, XC = function(e, t, a, i) {
      a !== i && If(t);
    };
    function Yp(e, t) {
      if (!Xr())
        switch (e.tailMode) {
          case "hidden": {
            for (var a = e.tail, i = null; a !== null; )
              a.alternate !== null && (i = a), a = a.sibling;
            i === null ? e.tail = null : i.sibling = null;
            break;
          }
          case "collapsed": {
            for (var o = e.tail, s = null; o !== null; )
              o.alternate !== null && (s = o), o = o.sibling;
            s === null ? !t && e.tail !== null ? e.tail.sibling = null : e.tail = null : s.sibling = null;
            break;
          }
        }
    }
    function qr(e) {
      var t = e.alternate !== null && e.alternate.child === e.child, a = K, i = He;
      if (t) {
        if ((e.mode & nn) !== Pe) {
          for (var m = e.selfBaseDuration, E = e.child; E !== null; )
            a = Et(a, Et(E.lanes, E.childLanes)), i |= E.subtreeFlags & Jn, i |= E.flags & Jn, m += E.treeBaseDuration, E = E.sibling;
          e.treeBaseDuration = m;
        } else
          for (var T = e.child; T !== null; )
            a = Et(a, Et(T.lanes, T.childLanes)), i |= T.subtreeFlags & Jn, i |= T.flags & Jn, T.return = e, T = T.sibling;
        e.subtreeFlags |= i;
      } else {
        if ((e.mode & nn) !== Pe) {
          for (var o = e.actualDuration, s = e.selfBaseDuration, f = e.child; f !== null; )
            a = Et(a, Et(f.lanes, f.childLanes)), i |= f.subtreeFlags, i |= f.flags, o += f.actualDuration, s += f.treeBaseDuration, f = f.sibling;
          e.actualDuration = o, e.treeBaseDuration = s;
        } else
          for (var h = e.child; h !== null; )
            a = Et(a, Et(h.lanes, h.childLanes)), i |= h.subtreeFlags, i |= h.flags, h.return = e, h = h.sibling;
        e.subtreeFlags |= i;
      }
      return e.childLanes = a, t;
    }
    function _x(e, t, a) {
      if (c_() && (t.mode & kt) !== Pe && (t.flags & ze) === He)
        return _E(t), Nf(), t.flags |= zr | ps | dr, !1;
      var i = tm(t);
      if (a !== null && a.dehydrated !== null)
        if (e === null) {
          if (!i)
            throw new Error("A dehydrated suspense component was completed without a hydrated node. This is probably a bug in React.");
          if (u_(t), qr(t), (t.mode & nn) !== Pe) {
            var o = a !== null;
            if (o) {
              var s = t.child;
              s !== null && (t.treeBaseDuration -= s.treeBaseDuration);
            }
          }
          return !1;
        } else {
          if (Nf(), (t.flags & ze) === He && (t.memoizedState = null), t.flags |= Vt, qr(t), (t.mode & nn) !== Pe) {
            var f = a !== null;
            if (f) {
              var h = t.child;
              h !== null && (t.treeBaseDuration -= h.treeBaseDuration);
            }
          }
          return !1;
        }
      else
        return xE(), !0;
    }
    function KC(e, t, a) {
      var i = t.pendingProps;
      switch (vg(t), t.tag) {
        case Z:
        case sn:
        case je:
        case Q:
        case Ze:
        case ct:
        case Ke:
        case Je:
        case jt:
        case Le:
          return qr(t), null;
        case W: {
          var o = t.type;
          return ql(o) && Xh(t), qr(t), null;
        }
        case J: {
          var s = t.stateNode;
          if (jf(t), cg(t), Vg(), s.pendingContext && (s.context = s.pendingContext, s.pendingContext = null), e === null || e.child === null) {
            var f = tm(t);
            if (f)
              If(t);
            else if (e !== null) {
              var h = e.memoizedState;
              // Check if this is a client root
              (!h.isDehydrated || // Check if we reverted to client rendering (e.g. due to an error)
              (t.flags & zr) !== He) && (t.flags |= ur, xE());
            }
          }
          return BS(e, t), qr(t), null;
        }
        case oe: {
          jg(t);
          var m = BE(), E = t.type;
          if (e !== null && t.stateNode != null)
            QC(e, t, E, i, m), e.ref !== t.ref && WC(t);
          else {
            if (!i) {
              if (t.stateNode === null)
                throw new Error("We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue.");
              return qr(t), null;
            }
            var T = Ug(), O = tm(t);
            if (O)
              l_(t, m, T) && If(t);
            else {
              var D = Ww(E, i, m, T, t);
              GC(D, t, !1, !1), t.stateNode = D, Qw(D, E, i, m) && If(t);
            }
            t.ref !== null && WC(t);
          }
          return qr(t), null;
        }
        case Ue: {
          var j = i;
          if (e && t.stateNode != null) {
            var P = e.memoizedProps;
            XC(e, t, P, j);
          } else {
            if (typeof j != "string" && t.stateNode === null)
              throw new Error("We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue.");
            var B = BE(), he = Ug(), $e = tm(t);
            $e ? o_(t) && If(t) : t.stateNode = Kw(j, B, he, t);
          }
          return qr(t), null;
        }
        case _e: {
          Hf(t);
          var Ne = t.memoizedState;
          if (e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
            var It = _x(e, t, Ne);
            if (!It)
              return t.flags & dr ? t : null;
          }
          if ((t.flags & ze) !== He)
            return t.lanes = a, (t.mode & nn) !== Pe && dS(t), t;
          var Ut = Ne !== null, A = e !== null && e.memoizedState !== null;
          if (Ut !== A && Ut) {
            var $ = t.child;
            if ($.flags |= Zn, (t.mode & kt) !== Pe) {
              var z = e === null && (t.memoizedProps.unstable_avoidThisFallback !== !0 || !0);
              z || Fg(vl.current, YE) ? x1() : l0();
            }
          }
          var ae = t.updateQueue;
          if (ae !== null && (t.flags |= Vt), qr(t), (t.mode & nn) !== Pe && Ut) {
            var Te = t.child;
            Te !== null && (t.treeBaseDuration -= Te.treeBaseDuration);
          }
          return null;
        }
        case se:
          return jf(t), BS(e, t), e === null && $b(t.stateNode.containerInfo), qr(t), null;
        case tt:
          var ye = t.type._context;
          return Dg(ye, t), qr(t), null;
        case Gt: {
          var et = t.type;
          return ql(et) && Xh(t), qr(t), null;
        }
        case dn: {
          Hf(t);
          var dt = t.memoizedState;
          if (dt === null)
            return qr(t), null;
          var Cn = (t.flags & ze) !== He, ln = dt.rendering;
          if (ln === null)
            if (Cn)
              Yp(dt, !1);
            else {
              var fr = k1() && (e === null || (e.flags & ze) === He);
              if (!fr)
                for (var on = t.child; on !== null; ) {
                  var ir = ym(on);
                  if (ir !== null) {
                    Cn = !0, t.flags |= ze, Yp(dt, !1);
                    var Sa = ir.updateQueue;
                    return Sa !== null && (t.updateQueue = Sa, t.flags |= Vt), t.subtreeFlags = He, y_(t, a), Pu(t, Hg(vl.current, Lp)), t.child;
                  }
                  on = on.sibling;
                }
              dt.tail !== null && sr() > yT() && (t.flags |= ze, Cn = !0, Yp(dt, !1), t.lanes = jd);
            }
          else {
            if (!Cn) {
              var na = ym(ln);
              if (na !== null) {
                t.flags |= ze, Cn = !0;
                var yi = na.updateQueue;
                if (yi !== null && (t.updateQueue = yi, t.flags |= Vt), Yp(dt, !0), dt.tail === null && dt.tailMode === "hidden" && !ln.alternate && !Xr())
                  return qr(t), null;
              } else // The time it took to render last row is greater than the remaining
              // time we have to render. So rendering one more row would likely
              // exceed it.
              sr() * 2 - dt.renderingStartTime > yT() && a !== fa && (t.flags |= ze, Cn = !0, Yp(dt, !1), t.lanes = jd);
            }
            if (dt.isBackwards)
              ln.sibling = t.child, t.child = ln;
            else {
              var Ma = dt.last;
              Ma !== null ? Ma.sibling = ln : t.child = ln, dt.last = ln;
            }
          }
          if (dt.tail !== null) {
            var La = dt.tail;
            dt.rendering = La, dt.tail = La.sibling, dt.renderingStartTime = sr(), La.sibling = null;
            var Ea = vl.current;
            return Cn ? Ea = Hg(Ea, Lp) : Ea = Ff(Ea), Pu(t, Ea), La;
          }
          return qr(t), null;
        }
        case nt:
          break;
        case Ae:
        case _t: {
          i0(t);
          var qo = t.memoizedState, Zf = qo !== null;
          if (e !== null) {
            var ov = e.memoizedState, io = ov !== null;
            io !== Zf && // LegacyHidden doesn't do any hiding — it only pre-renders.
            !ue && (t.flags |= Zn);
          }
          return !Zf || (t.mode & kt) === Pe ? qr(t) : da(ao, fa) && (qr(t), t.subtreeFlags & (Ln | Vt) && (t.flags |= Zn)), null;
        }
        case xt:
          return null;
        case At:
          return null;
      }
      throw new Error("Unknown unit of work tag (" + t.tag + "). This error is likely caused by a bug in React. Please file an issue.");
    }
    function xx(e, t, a) {
      switch (vg(t), t.tag) {
        case W: {
          var i = t.type;
          ql(i) && Xh(t);
          var o = t.flags;
          return o & dr ? (t.flags = o & ~dr | ze, (t.mode & nn) !== Pe && dS(t), t) : null;
        }
        case J: {
          t.stateNode, jf(t), cg(t), Vg();
          var s = t.flags;
          return (s & dr) !== He && (s & ze) === He ? (t.flags = s & ~dr | ze, t) : null;
        }
        case oe:
          return jg(t), null;
        case _e: {
          Hf(t);
          var f = t.memoizedState;
          if (f !== null && f.dehydrated !== null) {
            if (t.alternate === null)
              throw new Error("Threw in newly mounted dehydrated component. This is likely a bug in React. Please file an issue.");
            Nf();
          }
          var h = t.flags;
          return h & dr ? (t.flags = h & ~dr | ze, (t.mode & nn) !== Pe && dS(t), t) : null;
        }
        case dn:
          return Hf(t), null;
        case se:
          return jf(t), null;
        case tt:
          var m = t.type._context;
          return Dg(m, t), null;
        case Ae:
        case _t:
          return i0(t), null;
        case xt:
          return null;
        default:
          return null;
      }
    }
    function qC(e, t, a) {
      switch (vg(t), t.tag) {
        case W: {
          var i = t.type.childContextTypes;
          i != null && Xh(t);
          break;
        }
        case J: {
          t.stateNode, jf(t), cg(t), Vg();
          break;
        }
        case oe: {
          jg(t);
          break;
        }
        case se:
          jf(t);
          break;
        case _e:
          Hf(t);
          break;
        case dn:
          Hf(t);
          break;
        case tt:
          var o = t.type._context;
          Dg(o, t);
          break;
        case Ae:
        case _t:
          i0(t);
          break;
      }
    }
    var ZC = null;
    ZC = /* @__PURE__ */ new Set();
    var Vm = !1, Zr = !1, Dx = typeof WeakSet == "function" ? WeakSet : Set, ke = null, Yf = null, Wf = null;
    function kx(e) {
      Nl(null, function() {
        throw e;
      }), ds();
    }
    var Ox = function(e, t) {
      if (t.props = e.memoizedProps, t.state = e.memoizedState, e.mode & nn)
        try {
          no(), t.componentWillUnmount();
        } finally {
          to(e);
        }
      else
        t.componentWillUnmount();
    };
    function JC(e, t) {
      try {
        $u(xr, e);
      } catch (a) {
        Dn(e, t, a);
      }
    }
    function $S(e, t, a) {
      try {
        Ox(e, a);
      } catch (i) {
        Dn(e, t, i);
      }
    }
    function Mx(e, t, a) {
      try {
        a.componentDidMount();
      } catch (i) {
        Dn(e, t, i);
      }
    }
    function eT(e, t) {
      try {
        nT(e);
      } catch (a) {
        Dn(e, t, a);
      }
    }
    function Gf(e, t) {
      var a = e.ref;
      if (a !== null)
        if (typeof a == "function") {
          var i;
          try {
            if (Fe && gt && e.mode & nn)
              try {
                no(), i = a(null);
              } finally {
                to(e);
              }
            else
              i = a(null);
          } catch (o) {
            Dn(e, t, o);
          }
          typeof i == "function" && C("Unexpected return value from a callback ref in %s. A callback ref should not return a function.", ot(e));
        } else
          a.current = null;
    }
    function Bm(e, t, a) {
      try {
        a();
      } catch (i) {
        Dn(e, t, i);
      }
    }
    var tT = !1;
    function Lx(e, t) {
      Iw(e.containerInfo), ke = t, Nx();
      var a = tT;
      return tT = !1, a;
    }
    function Nx() {
      for (; ke !== null; ) {
        var e = ke, t = e.child;
        (e.subtreeFlags & zl) !== He && t !== null ? (t.return = e, ke = t) : Ax();
      }
    }
    function Ax() {
      for (; ke !== null; ) {
        var e = ke;
        mn(e);
        try {
          zx(e);
        } catch (a) {
          Dn(e, e.return, a);
        }
        xn();
        var t = e.sibling;
        if (t !== null) {
          t.return = e.return, ke = t;
          return;
        }
        ke = e.return;
      }
    }
    function zx(e) {
      var t = e.alternate, a = e.flags;
      if ((a & ur) !== He) {
        switch (mn(e), e.tag) {
          case Q:
          case Ze:
          case je:
            break;
          case W: {
            if (t !== null) {
              var i = t.memoizedProps, o = t.memoizedState, s = e.stateNode;
              e.type === e.elementType && !ic && (s.props !== e.memoizedProps && C("Expected %s props to match memoized props before getSnapshotBeforeUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", ot(e) || "instance"), s.state !== e.memoizedState && C("Expected %s state to match memoized state before getSnapshotBeforeUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", ot(e) || "instance"));
              var f = s.getSnapshotBeforeUpdate(e.elementType === e.type ? i : ml(e.type, i), o);
              {
                var h = ZC;
                f === void 0 && !h.has(e.type) && (h.add(e.type), C("%s.getSnapshotBeforeUpdate(): A snapshot value (or null) must be returned. You have returned undefined.", ot(e)));
              }
              s.__reactInternalSnapshotBeforeUpdate = f;
            }
            break;
          }
          case J: {
            {
              var m = e.stateNode;
              hb(m.containerInfo);
            }
            break;
          }
          case oe:
          case Ue:
          case se:
          case Gt:
            break;
          default:
            throw new Error("This unit of work tag should not have side-effects. This error is likely caused by a bug in React. Please file an issue.");
        }
        xn();
      }
    }
    function gl(e, t, a) {
      var i = t.updateQueue, o = i !== null ? i.lastEffect : null;
      if (o !== null) {
        var s = o.next, f = s;
        do {
          if ((f.tag & e) === e) {
            var h = f.destroy;
            f.destroy = void 0, h !== void 0 && ((e & Kr) !== Qa ? il(t) : (e & xr) !== Qa && hs(t), (e & Zl) !== Qa && av(!0), Bm(t, a, h), (e & Zl) !== Qa && av(!1), (e & Kr) !== Qa ? Hl() : (e & xr) !== Qa && zd());
          }
          f = f.next;
        } while (f !== s);
      }
    }
    function $u(e, t) {
      var a = t.updateQueue, i = a !== null ? a.lastEffect : null;
      if (i !== null) {
        var o = i.next, s = o;
        do {
          if ((s.tag & e) === e) {
            (e & Kr) !== Qa ? Ad(t) : (e & xr) !== Qa && jc(t);
            var f = s.create;
            (e & Zl) !== Qa && av(!0), s.destroy = f(), (e & Zl) !== Qa && av(!1), (e & Kr) !== Qa ? Gv() : (e & xr) !== Qa && Qv();
            {
              var h = s.destroy;
              if (h !== void 0 && typeof h != "function") {
                var m = void 0;
                (s.tag & xr) !== He ? m = "useLayoutEffect" : (s.tag & Zl) !== He ? m = "useInsertionEffect" : m = "useEffect";
                var E = void 0;
                h === null ? E = " You returned null. If your effect does not require clean up, return undefined (or nothing)." : typeof h.then == "function" ? E = `

It looks like you wrote ` + m + `(async () => ...) or returned a Promise. Instead, write the async function inside your effect and call it immediately:

` + m + `(() => {
  async function fetchData() {
    // You can await here
    const response = await MyAPI.getData(someId);
    // ...
  }
  fetchData();
}, [someId]); // Or [] if effect doesn't need props or state

Learn more about data fetching with Hooks: https://reactjs.org/link/hooks-data-fetching` : E = " You returned: " + h, C("%s must not return anything besides a function, which is used for clean-up.%s", m, E);
              }
            }
          }
          s = s.next;
        } while (s !== o);
      }
    }
    function Ux(e, t) {
      if ((t.flags & Vt) !== He)
        switch (t.tag) {
          case Je: {
            var a = t.stateNode.passiveEffectDuration, i = t.memoizedProps, o = i.id, s = i.onPostCommit, f = yC(), h = t.alternate === null ? "mount" : "update";
            mC() && (h = "nested-update"), typeof s == "function" && s(o, h, a, f);
            var m = t.return;
            e: for (; m !== null; ) {
              switch (m.tag) {
                case J:
                  var E = m.stateNode;
                  E.passiveEffectDuration += a;
                  break e;
                case Je:
                  var T = m.stateNode;
                  T.passiveEffectDuration += a;
                  break e;
              }
              m = m.return;
            }
            break;
          }
        }
    }
    function jx(e, t, a, i) {
      if ((a.flags & jl) !== He)
        switch (a.tag) {
          case Q:
          case Ze:
          case je: {
            if (!Zr)
              if (a.mode & nn)
                try {
                  no(), $u(xr | _r, a);
                } finally {
                  to(a);
                }
              else
                $u(xr | _r, a);
            break;
          }
          case W: {
            var o = a.stateNode;
            if (a.flags & Vt && !Zr)
              if (t === null)
                if (a.type === a.elementType && !ic && (o.props !== a.memoizedProps && C("Expected %s props to match memoized props before componentDidMount. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", ot(a) || "instance"), o.state !== a.memoizedState && C("Expected %s state to match memoized state before componentDidMount. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", ot(a) || "instance")), a.mode & nn)
                  try {
                    no(), o.componentDidMount();
                  } finally {
                    to(a);
                  }
                else
                  o.componentDidMount();
              else {
                var s = a.elementType === a.type ? t.memoizedProps : ml(a.type, t.memoizedProps), f = t.memoizedState;
                if (a.type === a.elementType && !ic && (o.props !== a.memoizedProps && C("Expected %s props to match memoized props before componentDidUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", ot(a) || "instance"), o.state !== a.memoizedState && C("Expected %s state to match memoized state before componentDidUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", ot(a) || "instance")), a.mode & nn)
                  try {
                    no(), o.componentDidUpdate(s, f, o.__reactInternalSnapshotBeforeUpdate);
                  } finally {
                    to(a);
                  }
                else
                  o.componentDidUpdate(s, f, o.__reactInternalSnapshotBeforeUpdate);
              }
            var h = a.updateQueue;
            h !== null && (a.type === a.elementType && !ic && (o.props !== a.memoizedProps && C("Expected %s props to match memoized props before processing the update queue. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", ot(a) || "instance"), o.state !== a.memoizedState && C("Expected %s state to match memoized state before processing the update queue. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", ot(a) || "instance")), VE(a, h, o));
            break;
          }
          case J: {
            var m = a.updateQueue;
            if (m !== null) {
              var E = null;
              if (a.child !== null)
                switch (a.child.tag) {
                  case oe:
                    E = a.child.stateNode;
                    break;
                  case W:
                    E = a.child.stateNode;
                    break;
                }
              VE(a, m, E);
            }
            break;
          }
          case oe: {
            var T = a.stateNode;
            if (t === null && a.flags & Vt) {
              var O = a.type, D = a.memoizedProps;
              tb(T, O, D);
            }
            break;
          }
          case Ue:
            break;
          case se:
            break;
          case Je: {
            {
              var j = a.memoizedProps, P = j.onCommit, B = j.onRender, he = a.stateNode.effectDuration, $e = yC(), Ne = t === null ? "mount" : "update";
              mC() && (Ne = "nested-update"), typeof B == "function" && B(a.memoizedProps.id, Ne, a.actualDuration, a.treeBaseDuration, a.actualStartTime, $e);
              {
                typeof P == "function" && P(a.memoizedProps.id, Ne, he, $e), A1(a);
                var It = a.return;
                e: for (; It !== null; ) {
                  switch (It.tag) {
                    case J:
                      var Ut = It.stateNode;
                      Ut.effectDuration += he;
                      break e;
                    case Je:
                      var A = It.stateNode;
                      A.effectDuration += he;
                      break e;
                  }
                  It = It.return;
                }
              }
            }
            break;
          }
          case _e: {
            Yx(e, a);
            break;
          }
          case dn:
          case Gt:
          case nt:
          case Ae:
          case _t:
          case At:
            break;
          default:
            throw new Error("This unit of work tag should not have side-effects. This error is likely caused by a bug in React. Please file an issue.");
        }
      Zr || a.flags & Hn && nT(a);
    }
    function Fx(e) {
      switch (e.tag) {
        case Q:
        case Ze:
        case je: {
          if (e.mode & nn)
            try {
              no(), JC(e, e.return);
            } finally {
              to(e);
            }
          else
            JC(e, e.return);
          break;
        }
        case W: {
          var t = e.stateNode;
          typeof t.componentDidMount == "function" && Mx(e, e.return, t), eT(e, e.return);
          break;
        }
        case oe: {
          eT(e, e.return);
          break;
        }
      }
    }
    function Hx(e, t) {
      for (var a = null, i = e; ; ) {
        if (i.tag === oe) {
          if (a === null) {
            a = i;
            try {
              var o = i.stateNode;
              t ? fb(o) : pb(i.stateNode, i.memoizedProps);
            } catch (f) {
              Dn(e, e.return, f);
            }
          }
        } else if (i.tag === Ue) {
          if (a === null)
            try {
              var s = i.stateNode;
              t ? db(s) : vb(s, i.memoizedProps);
            } catch (f) {
              Dn(e, e.return, f);
            }
        } else if (!((i.tag === Ae || i.tag === _t) && i.memoizedState !== null && i !== e)) {
          if (i.child !== null) {
            i.child.return = i, i = i.child;
            continue;
          }
        }
        if (i === e)
          return;
        for (; i.sibling === null; ) {
          if (i.return === null || i.return === e)
            return;
          a === i && (a = null), i = i.return;
        }
        a === i && (a = null), i.sibling.return = i.return, i = i.sibling;
      }
    }
    function nT(e) {
      var t = e.ref;
      if (t !== null) {
        var a = e.stateNode, i;
        switch (e.tag) {
          case oe:
            i = a;
            break;
          default:
            i = a;
        }
        if (typeof t == "function") {
          var o;
          if (e.mode & nn)
            try {
              no(), o = t(i);
            } finally {
              to(e);
            }
          else
            o = t(i);
          typeof o == "function" && C("Unexpected return value from a callback ref in %s. A callback ref should not return a function.", ot(e));
        } else
          t.hasOwnProperty("current") || C("Unexpected ref object provided for %s. Use either a ref-setter function or React.createRef().", ot(e)), t.current = i;
      }
    }
    function Px(e) {
      var t = e.alternate;
      t !== null && (t.return = null), e.return = null;
    }
    function rT(e) {
      var t = e.alternate;
      t !== null && (e.alternate = null, rT(t));
      {
        if (e.child = null, e.deletions = null, e.sibling = null, e.tag === oe) {
          var a = e.stateNode;
          a !== null && Wb(a);
        }
        e.stateNode = null, e._debugOwner = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
      }
    }
    function Vx(e) {
      for (var t = e.return; t !== null; ) {
        if (aT(t))
          return t;
        t = t.return;
      }
      throw new Error("Expected to find a host parent. This error is likely caused by a bug in React. Please file an issue.");
    }
    function aT(e) {
      return e.tag === oe || e.tag === J || e.tag === se;
    }
    function iT(e) {
      var t = e;
      e: for (; ; ) {
        for (; t.sibling === null; ) {
          if (t.return === null || aT(t.return))
            return null;
          t = t.return;
        }
        for (t.sibling.return = t.return, t = t.sibling; t.tag !== oe && t.tag !== Ue && t.tag !== Pt; ) {
          if (t.flags & Ln || t.child === null || t.tag === se)
            continue e;
          t.child.return = t, t = t.child;
        }
        if (!(t.flags & Ln))
          return t.stateNode;
      }
    }
    function Bx(e) {
      var t = Vx(e);
      switch (t.tag) {
        case oe: {
          var a = t.stateNode;
          t.flags & Fa && (oE(a), t.flags &= ~Fa);
          var i = iT(e);
          YS(e, i, a);
          break;
        }
        case J:
        case se: {
          var o = t.stateNode.containerInfo, s = iT(e);
          IS(e, s, o);
          break;
        }
        // eslint-disable-next-line-no-fallthrough
        default:
          throw new Error("Invalid host parent fiber. This error is likely caused by a bug in React. Please file an issue.");
      }
    }
    function IS(e, t, a) {
      var i = e.tag, o = i === oe || i === Ue;
      if (o) {
        var s = e.stateNode;
        t ? ob(a, s, t) : ib(a, s);
      } else if (i !== se) {
        var f = e.child;
        if (f !== null) {
          IS(f, t, a);
          for (var h = f.sibling; h !== null; )
            IS(h, t, a), h = h.sibling;
        }
      }
    }
    function YS(e, t, a) {
      var i = e.tag, o = i === oe || i === Ue;
      if (o) {
        var s = e.stateNode;
        t ? lb(a, s, t) : ab(a, s);
      } else if (i !== se) {
        var f = e.child;
        if (f !== null) {
          YS(f, t, a);
          for (var h = f.sibling; h !== null; )
            YS(h, t, a), h = h.sibling;
        }
      }
    }
    var Jr = null, Sl = !1;
    function $x(e, t, a) {
      {
        var i = t;
        e: for (; i !== null; ) {
          switch (i.tag) {
            case oe: {
              Jr = i.stateNode, Sl = !1;
              break e;
            }
            case J: {
              Jr = i.stateNode.containerInfo, Sl = !0;
              break e;
            }
            case se: {
              Jr = i.stateNode.containerInfo, Sl = !0;
              break e;
            }
          }
          i = i.return;
        }
        if (Jr === null)
          throw new Error("Expected to find a host parent. This error is likely caused by a bug in React. Please file an issue.");
        lT(e, t, a), Jr = null, Sl = !1;
      }
      Px(a);
    }
    function Iu(e, t, a) {
      for (var i = a.child; i !== null; )
        lT(e, t, i), i = i.sibling;
    }
    function lT(e, t, a) {
      switch (Md(a), a.tag) {
        case oe:
          Zr || Gf(a, t);
        // eslint-disable-next-line-no-fallthrough
        case Ue: {
          {
            var i = Jr, o = Sl;
            Jr = null, Iu(e, t, a), Jr = i, Sl = o, Jr !== null && (Sl ? sb(Jr, a.stateNode) : ub(Jr, a.stateNode));
          }
          return;
        }
        case Pt: {
          Jr !== null && (Sl ? cb(Jr, a.stateNode) : ng(Jr, a.stateNode));
          return;
        }
        case se: {
          {
            var s = Jr, f = Sl;
            Jr = a.stateNode.containerInfo, Sl = !0, Iu(e, t, a), Jr = s, Sl = f;
          }
          return;
        }
        case Q:
        case Ze:
        case Le:
        case je: {
          if (!Zr) {
            var h = a.updateQueue;
            if (h !== null) {
              var m = h.lastEffect;
              if (m !== null) {
                var E = m.next, T = E;
                do {
                  var O = T, D = O.destroy, j = O.tag;
                  D !== void 0 && ((j & Zl) !== Qa ? Bm(a, t, D) : (j & xr) !== Qa && (hs(a), a.mode & nn ? (no(), Bm(a, t, D), to(a)) : Bm(a, t, D), zd())), T = T.next;
                } while (T !== E);
              }
            }
          }
          Iu(e, t, a);
          return;
        }
        case W: {
          if (!Zr) {
            Gf(a, t);
            var P = a.stateNode;
            typeof P.componentWillUnmount == "function" && $S(a, t, P);
          }
          Iu(e, t, a);
          return;
        }
        case nt: {
          Iu(e, t, a);
          return;
        }
        case Ae: {
          if (
            // TODO: Remove this dead flag
            a.mode & kt
          ) {
            var B = Zr;
            Zr = B || a.memoizedState !== null, Iu(e, t, a), Zr = B;
          } else
            Iu(e, t, a);
          break;
        }
        default: {
          Iu(e, t, a);
          return;
        }
      }
    }
    function Ix(e) {
      e.memoizedState;
    }
    function Yx(e, t) {
      var a = t.memoizedState;
      if (a === null) {
        var i = t.alternate;
        if (i !== null) {
          var o = i.memoizedState;
          if (o !== null) {
            var s = o.dehydrated;
            s !== null && kb(s);
          }
        }
      }
    }
    function oT(e) {
      var t = e.updateQueue;
      if (t !== null) {
        e.updateQueue = null;
        var a = e.stateNode;
        a === null && (a = e.stateNode = new Dx()), t.forEach(function(i) {
          var o = V1.bind(null, e, i);
          if (!a.has(i)) {
            if (a.add(i), ca)
              if (Yf !== null && Wf !== null)
                rv(Wf, Yf);
              else
                throw Error("Expected finished root and lanes to be set. This is a bug in React.");
            i.then(o, o);
          }
        });
      }
    }
    function Wx(e, t, a) {
      Yf = a, Wf = e, mn(t), uT(t, e), mn(t), Yf = null, Wf = null;
    }
    function El(e, t, a) {
      var i = t.deletions;
      if (i !== null)
        for (var o = 0; o < i.length; o++) {
          var s = i[o];
          try {
            $x(e, t, s);
          } catch (m) {
            Dn(s, t, m);
          }
        }
      var f = _l();
      if (t.subtreeFlags & Ul)
        for (var h = t.child; h !== null; )
          mn(h), uT(h, e), h = h.sibling;
      mn(f);
    }
    function uT(e, t, a) {
      var i = e.alternate, o = e.flags;
      switch (e.tag) {
        case Q:
        case Ze:
        case Le:
        case je: {
          if (El(t, e), ro(e), o & Vt) {
            try {
              gl(Zl | _r, e, e.return), $u(Zl | _r, e);
            } catch (et) {
              Dn(e, e.return, et);
            }
            if (e.mode & nn) {
              try {
                no(), gl(xr | _r, e, e.return);
              } catch (et) {
                Dn(e, e.return, et);
              }
              to(e);
            } else
              try {
                gl(xr | _r, e, e.return);
              } catch (et) {
                Dn(e, e.return, et);
              }
          }
          return;
        }
        case W: {
          El(t, e), ro(e), o & Hn && i !== null && Gf(i, i.return);
          return;
        }
        case oe: {
          El(t, e), ro(e), o & Hn && i !== null && Gf(i, i.return);
          {
            if (e.flags & Fa) {
              var s = e.stateNode;
              try {
                oE(s);
              } catch (et) {
                Dn(e, e.return, et);
              }
            }
            if (o & Vt) {
              var f = e.stateNode;
              if (f != null) {
                var h = e.memoizedProps, m = i !== null ? i.memoizedProps : h, E = e.type, T = e.updateQueue;
                if (e.updateQueue = null, T !== null)
                  try {
                    nb(f, T, E, m, h, e);
                  } catch (et) {
                    Dn(e, e.return, et);
                  }
              }
            }
          }
          return;
        }
        case Ue: {
          if (El(t, e), ro(e), o & Vt) {
            if (e.stateNode === null)
              throw new Error("This should have a text node initialized. This error is likely caused by a bug in React. Please file an issue.");
            var O = e.stateNode, D = e.memoizedProps, j = i !== null ? i.memoizedProps : D;
            try {
              rb(O, j, D);
            } catch (et) {
              Dn(e, e.return, et);
            }
          }
          return;
        }
        case J: {
          if (El(t, e), ro(e), o & Vt && i !== null) {
            var P = i.memoizedState;
            if (P.isDehydrated)
              try {
                Db(t.containerInfo);
              } catch (et) {
                Dn(e, e.return, et);
              }
          }
          return;
        }
        case se: {
          El(t, e), ro(e);
          return;
        }
        case _e: {
          El(t, e), ro(e);
          var B = e.child;
          if (B.flags & Zn) {
            var he = B.stateNode, $e = B.memoizedState, Ne = $e !== null;
            if (he.isHidden = Ne, Ne) {
              var It = B.alternate !== null && B.alternate.memoizedState !== null;
              It || _1();
            }
          }
          if (o & Vt) {
            try {
              Ix(e);
            } catch (et) {
              Dn(e, e.return, et);
            }
            oT(e);
          }
          return;
        }
        case Ae: {
          var Ut = i !== null && i.memoizedState !== null;
          if (
            // TODO: Remove this dead flag
            e.mode & kt
          ) {
            var A = Zr;
            Zr = A || Ut, El(t, e), Zr = A;
          } else
            El(t, e);
          if (ro(e), o & Zn) {
            var $ = e.stateNode, z = e.memoizedState, ae = z !== null, Te = e;
            if ($.isHidden = ae, ae && !Ut && (Te.mode & kt) !== Pe) {
              ke = Te;
              for (var ye = Te.child; ye !== null; )
                ke = ye, Qx(ye), ye = ye.sibling;
            }
            Hx(Te, ae);
          }
          return;
        }
        case dn: {
          El(t, e), ro(e), o & Vt && oT(e);
          return;
        }
        case nt:
          return;
        default: {
          El(t, e), ro(e);
          return;
        }
      }
    }
    function ro(e) {
      var t = e.flags;
      if (t & Ln) {
        try {
          Bx(e);
        } catch (a) {
          Dn(e, e.return, a);
        }
        e.flags &= ~Ln;
      }
      t & oa && (e.flags &= ~oa);
    }
    function Gx(e, t, a) {
      Yf = a, Wf = t, ke = e, sT(e, t, a), Yf = null, Wf = null;
    }
    function sT(e, t, a) {
      for (var i = (e.mode & kt) !== Pe; ke !== null; ) {
        var o = ke, s = o.child;
        if (o.tag === Ae && i) {
          var f = o.memoizedState !== null, h = f || Vm;
          if (h) {
            WS(e, t, a);
            continue;
          } else {
            var m = o.alternate, E = m !== null && m.memoizedState !== null, T = E || Zr, O = Vm, D = Zr;
            Vm = h, Zr = T, Zr && !D && (ke = o, Xx(o));
            for (var j = s; j !== null; )
              ke = j, sT(
                j,
                // New root; bubble back up to here and stop.
                t,
                a
              ), j = j.sibling;
            ke = o, Vm = O, Zr = D, WS(e, t, a);
            continue;
          }
        }
        (o.subtreeFlags & jl) !== He && s !== null ? (s.return = o, ke = s) : WS(e, t, a);
      }
    }
    function WS(e, t, a) {
      for (; ke !== null; ) {
        var i = ke;
        if ((i.flags & jl) !== He) {
          var o = i.alternate;
          mn(i);
          try {
            jx(t, o, i, a);
          } catch (f) {
            Dn(i, i.return, f);
          }
          xn();
        }
        if (i === e) {
          ke = null;
          return;
        }
        var s = i.sibling;
        if (s !== null) {
          s.return = i.return, ke = s;
          return;
        }
        ke = i.return;
      }
    }
    function Qx(e) {
      for (; ke !== null; ) {
        var t = ke, a = t.child;
        switch (t.tag) {
          case Q:
          case Ze:
          case Le:
          case je: {
            if (t.mode & nn)
              try {
                no(), gl(xr, t, t.return);
              } finally {
                to(t);
              }
            else
              gl(xr, t, t.return);
            break;
          }
          case W: {
            Gf(t, t.return);
            var i = t.stateNode;
            typeof i.componentWillUnmount == "function" && $S(t, t.return, i);
            break;
          }
          case oe: {
            Gf(t, t.return);
            break;
          }
          case Ae: {
            var o = t.memoizedState !== null;
            if (o) {
              cT(e);
              continue;
            }
            break;
          }
        }
        a !== null ? (a.return = t, ke = a) : cT(e);
      }
    }
    function cT(e) {
      for (; ke !== null; ) {
        var t = ke;
        if (t === e) {
          ke = null;
          return;
        }
        var a = t.sibling;
        if (a !== null) {
          a.return = t.return, ke = a;
          return;
        }
        ke = t.return;
      }
    }
    function Xx(e) {
      for (; ke !== null; ) {
        var t = ke, a = t.child;
        if (t.tag === Ae) {
          var i = t.memoizedState !== null;
          if (i) {
            fT(e);
            continue;
          }
        }
        a !== null ? (a.return = t, ke = a) : fT(e);
      }
    }
    function fT(e) {
      for (; ke !== null; ) {
        var t = ke;
        mn(t);
        try {
          Fx(t);
        } catch (i) {
          Dn(t, t.return, i);
        }
        if (xn(), t === e) {
          ke = null;
          return;
        }
        var a = t.sibling;
        if (a !== null) {
          a.return = t.return, ke = a;
          return;
        }
        ke = t.return;
      }
    }
    function Kx(e, t, a, i) {
      ke = t, qx(t, e, a, i);
    }
    function qx(e, t, a, i) {
      for (; ke !== null; ) {
        var o = ke, s = o.child;
        (o.subtreeFlags & rl) !== He && s !== null ? (s.return = o, ke = s) : Zx(e, t, a, i);
      }
    }
    function Zx(e, t, a, i) {
      for (; ke !== null; ) {
        var o = ke;
        if ((o.flags & la) !== He) {
          mn(o);
          try {
            Jx(t, o, a, i);
          } catch (f) {
            Dn(o, o.return, f);
          }
          xn();
        }
        if (o === e) {
          ke = null;
          return;
        }
        var s = o.sibling;
        if (s !== null) {
          s.return = o.return, ke = s;
          return;
        }
        ke = o.return;
      }
    }
    function Jx(e, t, a, i) {
      switch (t.tag) {
        case Q:
        case Ze:
        case je: {
          if (t.mode & nn) {
            fS();
            try {
              $u(Kr | _r, t);
            } finally {
              cS(t);
            }
          } else
            $u(Kr | _r, t);
          break;
        }
      }
    }
    function e1(e) {
      ke = e, t1();
    }
    function t1() {
      for (; ke !== null; ) {
        var e = ke, t = e.child;
        if ((ke.flags & ja) !== He) {
          var a = e.deletions;
          if (a !== null) {
            for (var i = 0; i < a.length; i++) {
              var o = a[i];
              ke = o, a1(o, e);
            }
            {
              var s = e.alternate;
              if (s !== null) {
                var f = s.child;
                if (f !== null) {
                  s.child = null;
                  do {
                    var h = f.sibling;
                    f.sibling = null, f = h;
                  } while (f !== null);
                }
              }
            }
            ke = e;
          }
        }
        (e.subtreeFlags & rl) !== He && t !== null ? (t.return = e, ke = t) : n1();
      }
    }
    function n1() {
      for (; ke !== null; ) {
        var e = ke;
        (e.flags & la) !== He && (mn(e), r1(e), xn());
        var t = e.sibling;
        if (t !== null) {
          t.return = e.return, ke = t;
          return;
        }
        ke = e.return;
      }
    }
    function r1(e) {
      switch (e.tag) {
        case Q:
        case Ze:
        case je: {
          e.mode & nn ? (fS(), gl(Kr | _r, e, e.return), cS(e)) : gl(Kr | _r, e, e.return);
          break;
        }
      }
    }
    function a1(e, t) {
      for (; ke !== null; ) {
        var a = ke;
        mn(a), l1(a, t), xn();
        var i = a.child;
        i !== null ? (i.return = a, ke = i) : i1(e);
      }
    }
    function i1(e) {
      for (; ke !== null; ) {
        var t = ke, a = t.sibling, i = t.return;
        if (rT(t), t === e) {
          ke = null;
          return;
        }
        if (a !== null) {
          a.return = i, ke = a;
          return;
        }
        ke = i;
      }
    }
    function l1(e, t) {
      switch (e.tag) {
        case Q:
        case Ze:
        case je: {
          e.mode & nn ? (fS(), gl(Kr, e, t), cS(e)) : gl(Kr, e, t);
          break;
        }
      }
    }
    function o1(e) {
      switch (e.tag) {
        case Q:
        case Ze:
        case je: {
          try {
            $u(xr | _r, e);
          } catch (a) {
            Dn(e, e.return, a);
          }
          break;
        }
        case W: {
          var t = e.stateNode;
          try {
            t.componentDidMount();
          } catch (a) {
            Dn(e, e.return, a);
          }
          break;
        }
      }
    }
    function u1(e) {
      switch (e.tag) {
        case Q:
        case Ze:
        case je: {
          try {
            $u(Kr | _r, e);
          } catch (t) {
            Dn(e, e.return, t);
          }
          break;
        }
      }
    }
    function s1(e) {
      switch (e.tag) {
        case Q:
        case Ze:
        case je: {
          try {
            gl(xr | _r, e, e.return);
          } catch (a) {
            Dn(e, e.return, a);
          }
          break;
        }
        case W: {
          var t = e.stateNode;
          typeof t.componentWillUnmount == "function" && $S(e, e.return, t);
          break;
        }
      }
    }
    function c1(e) {
      switch (e.tag) {
        case Q:
        case Ze:
        case je:
          try {
            gl(Kr | _r, e, e.return);
          } catch (t) {
            Dn(e, e.return, t);
          }
      }
    }
    if (typeof Symbol == "function" && Symbol.for) {
      var Wp = Symbol.for;
      Wp("selector.component"), Wp("selector.has_pseudo_class"), Wp("selector.role"), Wp("selector.test_id"), Wp("selector.text");
    }
    var f1 = [];
    function d1() {
      f1.forEach(function(e) {
        return e();
      });
    }
    var p1 = v.ReactCurrentActQueue;
    function v1(e) {
      {
        var t = (
          // $FlowExpectedError – Flow doesn't know about IS_REACT_ACT_ENVIRONMENT global
          typeof IS_REACT_ACT_ENVIRONMENT < "u" ? IS_REACT_ACT_ENVIRONMENT : void 0
        ), a = typeof jest < "u";
        return a && t !== !1;
      }
    }
    function dT() {
      {
        var e = (
          // $FlowExpectedError – Flow doesn't know about IS_REACT_ACT_ENVIRONMENT global
          typeof IS_REACT_ACT_ENVIRONMENT < "u" ? IS_REACT_ACT_ENVIRONMENT : void 0
        );
        return !e && p1.current !== null && C("The current testing environment is not configured to support act(...)"), e;
      }
    }
    var h1 = Math.ceil, GS = v.ReactCurrentDispatcher, QS = v.ReactCurrentOwner, ea = v.ReactCurrentBatchConfig, Cl = v.ReactCurrentActQueue, Or = (
      /*             */
      0
    ), pT = (
      /*               */
      1
    ), ta = (
      /*                */
      2
    ), Ii = (
      /*                */
      4
    ), Go = 0, Gp = 1, lc = 2, $m = 3, Qp = 4, vT = 5, XS = 6, $t = Or, ka = null, Wn = null, Mr = K, ao = K, KS = Au(K), Lr = Go, Xp = null, Im = K, Kp = K, Ym = K, qp = null, Xa = null, qS = 0, hT = 500, mT = 1 / 0, m1 = 500, Qo = null;
    function Zp() {
      mT = sr() + m1;
    }
    function yT() {
      return mT;
    }
    var Wm = !1, ZS = null, Qf = null, oc = !1, Yu = null, Jp = K, JS = [], e0 = null, y1 = 50, ev = 0, t0 = null, n0 = !1, Gm = !1, g1 = 50, Xf = 0, Qm = null, tv = Tn, Xm = K, gT = !1;
    function Km() {
      return ka;
    }
    function Oa() {
      return ($t & (ta | Ii)) !== Or ? sr() : (tv !== Tn || (tv = sr()), tv);
    }
    function Wu(e) {
      var t = e.mode;
      if ((t & kt) === Pe)
        return qe;
      if (($t & ta) !== Or && Mr !== K)
        return Ds(Mr);
      var a = p_() !== d_;
      if (a) {
        if (ea.transition !== null) {
          var i = ea.transition;
          i._updatedFibers || (i._updatedFibers = /* @__PURE__ */ new Set()), i._updatedFibers.add(e);
        }
        return Xm === Kt && (Xm = $d()), Xm;
      }
      var o = Ia();
      if (o !== Kt)
        return o;
      var s = qw();
      return s;
    }
    function S1(e) {
      var t = e.mode;
      return (t & kt) === Pe ? qe : eh();
    }
    function Nr(e, t, a, i) {
      $1(), gT && C("useInsertionEffect must not schedule updates."), n0 && (Gm = !0), Ru(e, a, i), ($t & ta) !== K && e === ka ? W1(t) : (ca && Ms(e, t, a), G1(t), e === ka && (($t & ta) === Or && (Kp = Et(Kp, a)), Lr === Qp && Gu(e, Mr)), Ka(e, i), a === qe && $t === Or && (t.mode & kt) === Pe && // Treat `act` as if it's inside `batchedUpdates`, even in legacy mode.
      !Cl.isBatchingLegacy && (Zp(), gE()));
    }
    function E1(e, t, a) {
      var i = e.current;
      i.lanes = t, Ru(e, t, a), Ka(e, a);
    }
    function C1(e) {
      return (
        // TODO: Remove outdated deferRenderPhaseUpdateToNextBatch experiment. We
        // decided not to enable it.
        ($t & ta) !== Or
      );
    }
    function Ka(e, t) {
      var a = e.callbackNode;
      rf(e, t);
      var i = nf(e, e === ka ? Mr : K);
      if (i === K) {
        a !== null && AT(a), e.callbackNode = null, e.callbackPriority = Kt;
        return;
      }
      var o = Bl(i), s = e.callbackPriority;
      if (s === o && // Special case related to `act`. If the currently scheduled task is a
      // Scheduler task, rather than an `act` task, cancel it and re-scheduled
      // on the `act` queue.
      !(Cl.current !== null && a !== s0)) {
        a == null && s !== qe && C("Expected scheduled callback to exist. This error is likely caused by a bug in React. Please file an issue.");
        return;
      }
      a != null && AT(a);
      var f;
      if (o === qe)
        e.tag === zu ? (Cl.isBatchingLegacy !== null && (Cl.didScheduleLegacyUpdate = !0), Xb(CT.bind(null, e))) : yE(CT.bind(null, e)), Cl.current !== null ? Cl.current.push(Uu) : Jw(function() {
          ($t & (ta | Ii)) === Or && Uu();
        }), f = null;
      else {
        var h;
        switch (oh(i)) {
          case Ir:
            h = vs;
            break;
          case Ai:
            h = Fl;
            break;
          case Ba:
            h = al;
            break;
          case $a:
            h = Co;
            break;
          default:
            h = al;
            break;
        }
        f = c0(h, ST.bind(null, e));
      }
      e.callbackPriority = o, e.callbackNode = f;
    }
    function ST(e, t) {
      if (H_(), tv = Tn, Xm = K, ($t & (ta | Ii)) !== Or)
        throw new Error("Should not already be working.");
      var a = e.callbackNode, i = Ko();
      if (i && e.callbackNode !== a)
        return null;
      var o = nf(e, e === ka ? Mr : K);
      if (o === K)
        return null;
      var s = !lf(e, o) && !Jv(e, o) && !t, f = s ? M1(e, o) : Zm(e, o);
      if (f !== Go) {
        if (f === lc) {
          var h = af(e);
          h !== K && (o = h, f = r0(e, h));
        }
        if (f === Gp) {
          var m = Xp;
          throw uc(e, K), Gu(e, o), Ka(e, sr()), m;
        }
        if (f === XS)
          Gu(e, o);
        else {
          var E = !lf(e, o), T = e.current.alternate;
          if (E && !R1(T)) {
            if (f = Zm(e, o), f === lc) {
              var O = af(e);
              O !== K && (o = O, f = r0(e, O));
            }
            if (f === Gp) {
              var D = Xp;
              throw uc(e, K), Gu(e, o), Ka(e, sr()), D;
            }
          }
          e.finishedWork = T, e.finishedLanes = o, T1(e, f, o);
        }
      }
      return Ka(e, sr()), e.callbackNode === a ? ST.bind(null, e) : null;
    }
    function r0(e, t) {
      var a = qp;
      if (sf(e)) {
        var i = uc(e, t);
        i.flags |= zr, Bb(e.containerInfo);
      }
      var o = Zm(e, t);
      if (o !== lc) {
        var s = Xa;
        Xa = a, s !== null && ET(s);
      }
      return o;
    }
    function ET(e) {
      Xa === null ? Xa = e : Xa.push.apply(Xa, e);
    }
    function T1(e, t, a) {
      switch (t) {
        case Go:
        case Gp:
          throw new Error("Root did not complete. This is a bug in React.");
        // Flow knows about invariant, so it complains if I add a break
        // statement, but eslint doesn't know about invariant, so it complains
        // if I do. eslint-disable-next-line no-fallthrough
        case lc: {
          sc(e, Xa, Qo);
          break;
        }
        case $m: {
          if (Gu(e, a), Lo(a) && // do not delay if we're inside an act() scope
          !zT()) {
            var i = qS + hT - sr();
            if (i > 10) {
              var o = nf(e, K);
              if (o !== K)
                break;
              var s = e.suspendedLanes;
              if (!No(s, a)) {
                Oa(), of(e, s);
                break;
              }
              e.timeoutHandle = eg(sc.bind(null, e, Xa, Qo), i);
              break;
            }
          }
          sc(e, Xa, Qo);
          break;
        }
        case Qp: {
          if (Gu(e, a), Vd(a))
            break;
          if (!zT()) {
            var f = di(e, a), h = f, m = sr() - h, E = B1(m) - m;
            if (E > 10) {
              e.timeoutHandle = eg(sc.bind(null, e, Xa, Qo), E);
              break;
            }
          }
          sc(e, Xa, Qo);
          break;
        }
        case vT: {
          sc(e, Xa, Qo);
          break;
        }
        default:
          throw new Error("Unknown root exit status.");
      }
    }
    function R1(e) {
      for (var t = e; ; ) {
        if (t.flags & gu) {
          var a = t.updateQueue;
          if (a !== null) {
            var i = a.stores;
            if (i !== null)
              for (var o = 0; o < i.length; o++) {
                var s = i[o], f = s.getSnapshot, h = s.value;
                try {
                  if (!te(f(), h))
                    return !1;
                } catch {
                  return !1;
                }
              }
          }
        }
        var m = t.child;
        if (t.subtreeFlags & gu && m !== null) {
          m.return = t, t = m;
          continue;
        }
        if (t === e)
          return !0;
        for (; t.sibling === null; ) {
          if (t.return === null || t.return === e)
            return !0;
          t = t.return;
        }
        t.sibling.return = t.return, t = t.sibling;
      }
      return !0;
    }
    function Gu(e, t) {
      t = ks(t, Ym), t = ks(t, Kp), rh(e, t);
    }
    function CT(e) {
      if (P_(), ($t & (ta | Ii)) !== Or)
        throw new Error("Should not already be working.");
      Ko();
      var t = nf(e, K);
      if (!da(t, qe))
        return Ka(e, sr()), null;
      var a = Zm(e, t);
      if (e.tag !== zu && a === lc) {
        var i = af(e);
        i !== K && (t = i, a = r0(e, i));
      }
      if (a === Gp) {
        var o = Xp;
        throw uc(e, K), Gu(e, t), Ka(e, sr()), o;
      }
      if (a === XS)
        throw new Error("Root did not complete. This is a bug in React.");
      var s = e.current.alternate;
      return e.finishedWork = s, e.finishedLanes = t, sc(e, Xa, Qo), Ka(e, sr()), null;
    }
    function w1(e, t) {
      t !== K && (uf(e, Et(t, qe)), Ka(e, sr()), ($t & (ta | Ii)) === Or && (Zp(), Uu()));
    }
    function a0(e, t) {
      var a = $t;
      $t |= pT;
      try {
        return e(t);
      } finally {
        $t = a, $t === Or && // Treat `act` as if it's inside `batchedUpdates`, even in legacy mode.
        !Cl.isBatchingLegacy && (Zp(), gE());
      }
    }
    function b1(e, t, a, i, o) {
      var s = Ia(), f = ea.transition;
      try {
        return ea.transition = null, nr(Ir), e(t, a, i, o);
      } finally {
        nr(s), ea.transition = f, $t === Or && Zp();
      }
    }
    function Xo(e) {
      Yu !== null && Yu.tag === zu && ($t & (ta | Ii)) === Or && Ko();
      var t = $t;
      $t |= pT;
      var a = ea.transition, i = Ia();
      try {
        return ea.transition = null, nr(Ir), e ? e() : void 0;
      } finally {
        nr(i), ea.transition = a, $t = t, ($t & (ta | Ii)) === Or && Uu();
      }
    }
    function TT() {
      return ($t & (ta | Ii)) !== Or;
    }
    function qm(e, t) {
      ya(KS, ao, e), ao = Et(ao, t);
    }
    function i0(e) {
      ao = KS.current, ma(KS, e);
    }
    function uc(e, t) {
      e.finishedWork = null, e.finishedLanes = K;
      var a = e.timeoutHandle;
      if (a !== tg && (e.timeoutHandle = tg, Zw(a)), Wn !== null)
        for (var i = Wn.return; i !== null; ) {
          var o = i.alternate;
          qC(o, i), i = i.return;
        }
      ka = e;
      var s = cc(e.current, null);
      return Wn = s, Mr = ao = t, Lr = Go, Xp = null, Im = K, Kp = K, Ym = K, qp = null, Xa = null, E_(), pl.discardPendingWarnings(), s;
    }
    function RT(e, t) {
      do {
        var a = Wn;
        try {
          if (om(), GE(), xn(), QS.current = null, a === null || a.return === null) {
            Lr = Gp, Xp = t, Wn = null;
            return;
          }
          if (Fe && a.mode & nn && Um(a, !0), Ie)
            if (ba(), t !== null && typeof t == "object" && typeof t.then == "function") {
              var i = t;
              Ni(a, i, Mr);
            } else
              ms(a, t, Mr);
          X_(e, a.return, a, t, Mr), xT(a);
        } catch (o) {
          t = o, Wn === a && a !== null ? (a = a.return, Wn = a) : a = Wn;
          continue;
        }
        return;
      } while (!0);
    }
    function wT() {
      var e = GS.current;
      return GS.current = Mm, e === null ? Mm : e;
    }
    function bT(e) {
      GS.current = e;
    }
    function _1() {
      qS = sr();
    }
    function nv(e) {
      Im = Et(e, Im);
    }
    function x1() {
      Lr === Go && (Lr = $m);
    }
    function l0() {
      (Lr === Go || Lr === $m || Lr === lc) && (Lr = Qp), ka !== null && (xs(Im) || xs(Kp)) && Gu(ka, Mr);
    }
    function D1(e) {
      Lr !== Qp && (Lr = lc), qp === null ? qp = [e] : qp.push(e);
    }
    function k1() {
      return Lr === Go;
    }
    function Zm(e, t) {
      var a = $t;
      $t |= ta;
      var i = wT();
      if (ka !== e || Mr !== t) {
        if (ca) {
          var o = e.memoizedUpdaters;
          o.size > 0 && (rv(e, Mr), o.clear()), ah(e, t);
        }
        Qo = Gd(), uc(e, t);
      }
      bo(t);
      do
        try {
          O1();
          break;
        } catch (s) {
          RT(e, s);
        }
      while (!0);
      if (om(), $t = a, bT(i), Wn !== null)
        throw new Error("Cannot commit an incomplete root. This error is likely caused by a bug in React. Please file an issue.");
      return Fc(), ka = null, Mr = K, Lr;
    }
    function O1() {
      for (; Wn !== null; )
        _T(Wn);
    }
    function M1(e, t) {
      var a = $t;
      $t |= ta;
      var i = wT();
      if (ka !== e || Mr !== t) {
        if (ca) {
          var o = e.memoizedUpdaters;
          o.size > 0 && (rv(e, Mr), o.clear()), ah(e, t);
        }
        Qo = Gd(), Zp(), uc(e, t);
      }
      bo(t);
      do
        try {
          L1();
          break;
        } catch (s) {
          RT(e, s);
        }
      while (!0);
      return om(), bT(i), $t = a, Wn !== null ? (Xv(), Go) : (Fc(), ka = null, Mr = K, Lr);
    }
    function L1() {
      for (; Wn !== null && !_d(); )
        _T(Wn);
    }
    function _T(e) {
      var t = e.alternate;
      mn(e);
      var a;
      (e.mode & nn) !== Pe ? (sS(e), a = o0(t, e, ao), Um(e, !0)) : a = o0(t, e, ao), xn(), e.memoizedProps = e.pendingProps, a === null ? xT(e) : Wn = a, QS.current = null;
    }
    function xT(e) {
      var t = e;
      do {
        var a = t.alternate, i = t.return;
        if ((t.flags & ps) === He) {
          mn(t);
          var o = void 0;
          if ((t.mode & nn) === Pe ? o = KC(a, t, ao) : (sS(t), o = KC(a, t, ao), Um(t, !1)), xn(), o !== null) {
            Wn = o;
            return;
          }
        } else {
          var s = xx(a, t);
          if (s !== null) {
            s.flags &= $v, Wn = s;
            return;
          }
          if ((t.mode & nn) !== Pe) {
            Um(t, !1);
            for (var f = t.actualDuration, h = t.child; h !== null; )
              f += h.actualDuration, h = h.sibling;
            t.actualDuration = f;
          }
          if (i !== null)
            i.flags |= ps, i.subtreeFlags = He, i.deletions = null;
          else {
            Lr = XS, Wn = null;
            return;
          }
        }
        var m = t.sibling;
        if (m !== null) {
          Wn = m;
          return;
        }
        t = i, Wn = t;
      } while (t !== null);
      Lr === Go && (Lr = vT);
    }
    function sc(e, t, a) {
      var i = Ia(), o = ea.transition;
      try {
        ea.transition = null, nr(Ir), N1(e, t, a, i);
      } finally {
        ea.transition = o, nr(i);
      }
      return null;
    }
    function N1(e, t, a, i) {
      do
        Ko();
      while (Yu !== null);
      if (I1(), ($t & (ta | Ii)) !== Or)
        throw new Error("Should not already be working.");
      var o = e.finishedWork, s = e.finishedLanes;
      if (Ld(s), o === null)
        return Nd(), null;
      if (s === K && C("root.finishedLanes should not be empty during a commit. This is a bug in React."), e.finishedWork = null, e.finishedLanes = K, o === e.current)
        throw new Error("Cannot commit the same tree as before. This error is likely caused by a bug in React. Please file an issue.");
      e.callbackNode = null, e.callbackPriority = Kt;
      var f = Et(o.lanes, o.childLanes);
      Yd(e, f), e === ka && (ka = null, Wn = null, Mr = K), ((o.subtreeFlags & rl) !== He || (o.flags & rl) !== He) && (oc || (oc = !0, e0 = a, c0(al, function() {
        return Ko(), null;
      })));
      var h = (o.subtreeFlags & (zl | Ul | jl | rl)) !== He, m = (o.flags & (zl | Ul | jl | rl)) !== He;
      if (h || m) {
        var E = ea.transition;
        ea.transition = null;
        var T = Ia();
        nr(Ir);
        var O = $t;
        $t |= Ii, QS.current = null, Lx(e, o), gC(), Wx(e, o, s), Yw(e.containerInfo), e.current = o, ys(s), Gx(o, e, s), gs(), xd(), $t = O, nr(T), ea.transition = E;
      } else
        e.current = o, gC();
      var D = oc;
      if (oc ? (oc = !1, Yu = e, Jp = s) : (Xf = 0, Qm = null), f = e.pendingLanes, f === K && (Qf = null), D || MT(e.current, !1), kd(o.stateNode, i), ca && e.memoizedUpdaters.clear(), d1(), Ka(e, sr()), t !== null)
        for (var j = e.onRecoverableError, P = 0; P < t.length; P++) {
          var B = t[P], he = B.stack, $e = B.digest;
          j(B.value, {
            componentStack: he,
            digest: $e
          });
        }
      if (Wm) {
        Wm = !1;
        var Ne = ZS;
        throw ZS = null, Ne;
      }
      return da(Jp, qe) && e.tag !== zu && Ko(), f = e.pendingLanes, da(f, qe) ? (F_(), e === t0 ? ev++ : (ev = 0, t0 = e)) : ev = 0, Uu(), Nd(), null;
    }
    function Ko() {
      if (Yu !== null) {
        var e = oh(Jp), t = Ns(Ba, e), a = ea.transition, i = Ia();
        try {
          return ea.transition = null, nr(t), z1();
        } finally {
          nr(i), ea.transition = a;
        }
      }
      return !1;
    }
    function A1(e) {
      JS.push(e), oc || (oc = !0, c0(al, function() {
        return Ko(), null;
      }));
    }
    function z1() {
      if (Yu === null)
        return !1;
      var e = e0;
      e0 = null;
      var t = Yu, a = Jp;
      if (Yu = null, Jp = K, ($t & (ta | Ii)) !== Or)
        throw new Error("Cannot flush passive effects while already rendering.");
      n0 = !0, Gm = !1, wo(a);
      var i = $t;
      $t |= Ii, e1(t.current), Kx(t, t.current, a, e);
      {
        var o = JS;
        JS = [];
        for (var s = 0; s < o.length; s++) {
          var f = o[s];
          Ux(t, f);
        }
      }
      Ud(), MT(t.current, !0), $t = i, Uu(), Gm ? t === Qm ? Xf++ : (Xf = 0, Qm = t) : Xf = 0, n0 = !1, Gm = !1, Od(t);
      {
        var h = t.current.stateNode;
        h.effectDuration = 0, h.passiveEffectDuration = 0;
      }
      return !0;
    }
    function DT(e) {
      return Qf !== null && Qf.has(e);
    }
    function U1(e) {
      Qf === null ? Qf = /* @__PURE__ */ new Set([e]) : Qf.add(e);
    }
    function j1(e) {
      Wm || (Wm = !0, ZS = e);
    }
    var F1 = j1;
    function kT(e, t, a) {
      var i = ac(a, t), o = _C(e, i, qe), s = Fu(e, o, qe), f = Oa();
      s !== null && (Ru(s, qe, f), Ka(s, f));
    }
    function Dn(e, t, a) {
      if (kx(a), av(!1), e.tag === J) {
        kT(e, e, a);
        return;
      }
      var i = null;
      for (i = t; i !== null; ) {
        if (i.tag === J) {
          kT(i, e, a);
          return;
        } else if (i.tag === W) {
          var o = i.type, s = i.stateNode;
          if (typeof o.getDerivedStateFromError == "function" || typeof s.componentDidCatch == "function" && !DT(s)) {
            var f = ac(a, e), h = xS(i, f, qe), m = Fu(i, h, qe), E = Oa();
            m !== null && (Ru(m, qe, E), Ka(m, E));
            return;
          }
        }
        i = i.return;
      }
      C(`Internal React error: Attempted to capture a commit phase error inside a detached tree. This indicates a bug in React. Likely causes include deleting the same fiber more than once, committing an already-finished tree, or an inconsistent return pointer.

Error message:

%s`, a);
    }
    function H1(e, t, a) {
      var i = e.pingCache;
      i !== null && i.delete(t);
      var o = Oa();
      of(e, a), Q1(e), ka === e && No(Mr, a) && (Lr === Qp || Lr === $m && Lo(Mr) && sr() - qS < hT ? uc(e, K) : Ym = Et(Ym, a)), Ka(e, o);
    }
    function OT(e, t) {
      t === Kt && (t = S1(e));
      var a = Oa(), i = Ga(e, t);
      i !== null && (Ru(i, t, a), Ka(i, a));
    }
    function P1(e) {
      var t = e.memoizedState, a = Kt;
      t !== null && (a = t.retryLane), OT(e, a);
    }
    function V1(e, t) {
      var a = Kt, i;
      switch (e.tag) {
        case _e:
          i = e.stateNode;
          var o = e.memoizedState;
          o !== null && (a = o.retryLane);
          break;
        case dn:
          i = e.stateNode;
          break;
        default:
          throw new Error("Pinged unknown suspense boundary type. This is probably a bug in React.");
      }
      i !== null && i.delete(t), OT(e, a);
    }
    function B1(e) {
      return e < 120 ? 120 : e < 480 ? 480 : e < 1080 ? 1080 : e < 1920 ? 1920 : e < 3e3 ? 3e3 : e < 4320 ? 4320 : h1(e / 1960) * 1960;
    }
    function $1() {
      if (ev > y1)
        throw ev = 0, t0 = null, new Error("Maximum update depth exceeded. This can happen when a component repeatedly calls setState inside componentWillUpdate or componentDidUpdate. React limits the number of nested updates to prevent infinite loops.");
      Xf > g1 && (Xf = 0, Qm = null, C("Maximum update depth exceeded. This can happen when a component calls setState inside useEffect, but useEffect either doesn't have a dependency array, or one of the dependencies changes on every render."));
    }
    function I1() {
      pl.flushLegacyContextWarning(), pl.flushPendingUnsafeLifecycleWarnings();
    }
    function MT(e, t) {
      mn(e), Jm(e, Al, s1), t && Jm(e, Oi, c1), Jm(e, Al, o1), t && Jm(e, Oi, u1), xn();
    }
    function Jm(e, t, a) {
      for (var i = e, o = null; i !== null; ) {
        var s = i.subtreeFlags & t;
        i !== o && i.child !== null && s !== He ? i = i.child : ((i.flags & t) !== He && a(i), i.sibling !== null ? i = i.sibling : i = o = i.return);
      }
    }
    var ey = null;
    function LT(e) {
      {
        if (($t & ta) !== Or || !(e.mode & kt))
          return;
        var t = e.tag;
        if (t !== Z && t !== J && t !== W && t !== Q && t !== Ze && t !== Le && t !== je)
          return;
        var a = ot(e) || "ReactComponent";
        if (ey !== null) {
          if (ey.has(a))
            return;
          ey.add(a);
        } else
          ey = /* @__PURE__ */ new Set([a]);
        var i = Cr;
        try {
          mn(e), C("Can't perform a React state update on a component that hasn't mounted yet. This indicates that you have a side-effect in your render function that asynchronously later calls tries to update the component. Move this work to useEffect instead.");
        } finally {
          i ? mn(e) : xn();
        }
      }
    }
    var o0;
    {
      var Y1 = null;
      o0 = function(e, t, a) {
        var i = PT(Y1, t);
        try {
          return YC(e, t, a);
        } catch (s) {
          if (r_() || s !== null && typeof s == "object" && typeof s.then == "function")
            throw s;
          if (om(), GE(), qC(e, t), PT(t, i), t.mode & nn && sS(t), Nl(null, YC, null, e, t, a), tl()) {
            var o = ds();
            typeof o == "object" && o !== null && o._suppressLogging && typeof s == "object" && s !== null && !s._suppressLogging && (s._suppressLogging = !0);
          }
          throw s;
        }
      };
    }
    var NT = !1, u0;
    u0 = /* @__PURE__ */ new Set();
    function W1(e) {
      if (Ri && !z_())
        switch (e.tag) {
          case Q:
          case Ze:
          case je: {
            var t = Wn && ot(Wn) || "Unknown", a = t;
            if (!u0.has(a)) {
              u0.add(a);
              var i = ot(e) || "Unknown";
              C("Cannot update a component (`%s`) while rendering a different component (`%s`). To locate the bad setState() call inside `%s`, follow the stack trace as described in https://reactjs.org/link/setstate-in-render", i, t, t);
            }
            break;
          }
          case W: {
            NT || (C("Cannot update during an existing state transition (such as within `render`). Render methods should be a pure function of props and state."), NT = !0);
            break;
          }
        }
    }
    function rv(e, t) {
      if (ca) {
        var a = e.memoizedUpdaters;
        a.forEach(function(i) {
          Ms(e, i, t);
        });
      }
    }
    var s0 = {};
    function c0(e, t) {
      {
        var a = Cl.current;
        return a !== null ? (a.push(t), s0) : bd(e, t);
      }
    }
    function AT(e) {
      if (e !== s0)
        return Yv(e);
    }
    function zT() {
      return Cl.current !== null;
    }
    function G1(e) {
      {
        if (e.mode & kt) {
          if (!dT())
            return;
        } else if (!v1() || $t !== Or || e.tag !== Q && e.tag !== Ze && e.tag !== je)
          return;
        if (Cl.current === null) {
          var t = Cr;
          try {
            mn(e), C(`An update to %s inside a test was not wrapped in act(...).

When testing, code that causes React state updates should be wrapped into act(...):

act(() => {
  /* fire events that update state */
});
/* assert on the output */

This ensures that you're testing the behavior the user would see in the browser. Learn more at https://reactjs.org/link/wrap-tests-with-act`, ot(e));
          } finally {
            t ? mn(e) : xn();
          }
        }
      }
    }
    function Q1(e) {
      e.tag !== zu && dT() && Cl.current === null && C(`A suspended resource finished loading inside a test, but the event was not wrapped in act(...).

When testing, code that resolves suspended data should be wrapped into act(...):

act(() => {
  /* finish loading suspended data */
});
/* assert on the output */

This ensures that you're testing the behavior the user would see in the browser. Learn more at https://reactjs.org/link/wrap-tests-with-act`);
    }
    function av(e) {
      gT = e;
    }
    var Yi = null, Kf = null, X1 = function(e) {
      Yi = e;
    };
    function qf(e) {
      {
        if (Yi === null)
          return e;
        var t = Yi(e);
        return t === void 0 ? e : t.current;
      }
    }
    function f0(e) {
      return qf(e);
    }
    function d0(e) {
      {
        if (Yi === null)
          return e;
        var t = Yi(e);
        if (t === void 0) {
          if (e != null && typeof e.render == "function") {
            var a = qf(e.render);
            if (e.render !== a) {
              var i = {
                $$typeof: X,
                render: a
              };
              return e.displayName !== void 0 && (i.displayName = e.displayName), i;
            }
          }
          return e;
        }
        return t.current;
      }
    }
    function UT(e, t) {
      {
        if (Yi === null)
          return !1;
        var a = e.elementType, i = t.type, o = !1, s = typeof i == "object" && i !== null ? i.$$typeof : null;
        switch (e.tag) {
          case W: {
            typeof i == "function" && (o = !0);
            break;
          }
          case Q: {
            (typeof i == "function" || s === ut) && (o = !0);
            break;
          }
          case Ze: {
            (s === X || s === ut) && (o = !0);
            break;
          }
          case Le:
          case je: {
            (s === mt || s === ut) && (o = !0);
            break;
          }
          default:
            return !1;
        }
        if (o) {
          var f = Yi(a);
          if (f !== void 0 && f === Yi(i))
            return !0;
        }
        return !1;
      }
    }
    function jT(e) {
      {
        if (Yi === null || typeof WeakSet != "function")
          return;
        Kf === null && (Kf = /* @__PURE__ */ new WeakSet()), Kf.add(e);
      }
    }
    var K1 = function(e, t) {
      {
        if (Yi === null)
          return;
        var a = t.staleFamilies, i = t.updatedFamilies;
        Ko(), Xo(function() {
          p0(e.current, i, a);
        });
      }
    }, q1 = function(e, t) {
      {
        if (e.context !== hi)
          return;
        Ko(), Xo(function() {
          iv(t, e, null, null);
        });
      }
    };
    function p0(e, t, a) {
      {
        var i = e.alternate, o = e.child, s = e.sibling, f = e.tag, h = e.type, m = null;
        switch (f) {
          case Q:
          case je:
          case W:
            m = h;
            break;
          case Ze:
            m = h.render;
            break;
        }
        if (Yi === null)
          throw new Error("Expected resolveFamily to be set during hot reload.");
        var E = !1, T = !1;
        if (m !== null) {
          var O = Yi(m);
          O !== void 0 && (a.has(O) ? T = !0 : t.has(O) && (f === W ? T = !0 : E = !0));
        }
        if (Kf !== null && (Kf.has(e) || i !== null && Kf.has(i)) && (T = !0), T && (e._debugNeedsRemount = !0), T || E) {
          var D = Ga(e, qe);
          D !== null && Nr(D, e, qe, Tn);
        }
        o !== null && !T && p0(o, t, a), s !== null && p0(s, t, a);
      }
    }
    var Z1 = function(e, t) {
      {
        var a = /* @__PURE__ */ new Set(), i = new Set(t.map(function(o) {
          return o.current;
        }));
        return v0(e.current, i, a), a;
      }
    };
    function v0(e, t, a) {
      {
        var i = e.child, o = e.sibling, s = e.tag, f = e.type, h = null;
        switch (s) {
          case Q:
          case je:
          case W:
            h = f;
            break;
          case Ze:
            h = f.render;
            break;
        }
        var m = !1;
        h !== null && t.has(h) && (m = !0), m ? J1(e, a) : i !== null && v0(i, t, a), o !== null && v0(o, t, a);
      }
    }
    function J1(e, t) {
      {
        var a = eD(e, t);
        if (a)
          return;
        for (var i = e; ; ) {
          switch (i.tag) {
            case oe:
              t.add(i.stateNode);
              return;
            case se:
              t.add(i.stateNode.containerInfo);
              return;
            case J:
              t.add(i.stateNode.containerInfo);
              return;
          }
          if (i.return === null)
            throw new Error("Expected to reach root first.");
          i = i.return;
        }
      }
    }
    function eD(e, t) {
      for (var a = e, i = !1; ; ) {
        if (a.tag === oe)
          i = !0, t.add(a.stateNode);
        else if (a.child !== null) {
          a.child.return = a, a = a.child;
          continue;
        }
        if (a === e)
          return i;
        for (; a.sibling === null; ) {
          if (a.return === null || a.return === e)
            return i;
          a = a.return;
        }
        a.sibling.return = a.return, a = a.sibling;
      }
      return !1;
    }
    var h0;
    {
      h0 = !1;
      try {
        var FT = Object.preventExtensions({});
      } catch {
        h0 = !0;
      }
    }
    function tD(e, t, a, i) {
      this.tag = e, this.key = a, this.elementType = null, this.type = null, this.stateNode = null, this.return = null, this.child = null, this.sibling = null, this.index = 0, this.ref = null, this.pendingProps = t, this.memoizedProps = null, this.updateQueue = null, this.memoizedState = null, this.dependencies = null, this.mode = i, this.flags = He, this.subtreeFlags = He, this.deletions = null, this.lanes = K, this.childLanes = K, this.alternate = null, this.actualDuration = Number.NaN, this.actualStartTime = Number.NaN, this.selfBaseDuration = Number.NaN, this.treeBaseDuration = Number.NaN, this.actualDuration = 0, this.actualStartTime = -1, this.selfBaseDuration = 0, this.treeBaseDuration = 0, this._debugSource = null, this._debugOwner = null, this._debugNeedsRemount = !1, this._debugHookTypes = null, !h0 && typeof Object.preventExtensions == "function" && Object.preventExtensions(this);
    }
    var mi = function(e, t, a, i) {
      return new tD(e, t, a, i);
    };
    function m0(e) {
      var t = e.prototype;
      return !!(t && t.isReactComponent);
    }
    function nD(e) {
      return typeof e == "function" && !m0(e) && e.defaultProps === void 0;
    }
    function rD(e) {
      if (typeof e == "function")
        return m0(e) ? W : Q;
      if (e != null) {
        var t = e.$$typeof;
        if (t === X)
          return Ze;
        if (t === mt)
          return Le;
      }
      return Z;
    }
    function cc(e, t) {
      var a = e.alternate;
      a === null ? (a = mi(e.tag, t, e.key, e.mode), a.elementType = e.elementType, a.type = e.type, a.stateNode = e.stateNode, a._debugSource = e._debugSource, a._debugOwner = e._debugOwner, a._debugHookTypes = e._debugHookTypes, a.alternate = e, e.alternate = a) : (a.pendingProps = t, a.type = e.type, a.flags = He, a.subtreeFlags = He, a.deletions = null, a.actualDuration = 0, a.actualStartTime = -1), a.flags = e.flags & Jn, a.childLanes = e.childLanes, a.lanes = e.lanes, a.child = e.child, a.memoizedProps = e.memoizedProps, a.memoizedState = e.memoizedState, a.updateQueue = e.updateQueue;
      var i = e.dependencies;
      switch (a.dependencies = i === null ? null : {
        lanes: i.lanes,
        firstContext: i.firstContext
      }, a.sibling = e.sibling, a.index = e.index, a.ref = e.ref, a.selfBaseDuration = e.selfBaseDuration, a.treeBaseDuration = e.treeBaseDuration, a._debugNeedsRemount = e._debugNeedsRemount, a.tag) {
        case Z:
        case Q:
        case je:
          a.type = qf(e.type);
          break;
        case W:
          a.type = f0(e.type);
          break;
        case Ze:
          a.type = d0(e.type);
          break;
      }
      return a;
    }
    function aD(e, t) {
      e.flags &= Jn | Ln;
      var a = e.alternate;
      if (a === null)
        e.childLanes = K, e.lanes = t, e.child = null, e.subtreeFlags = He, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null, e.selfBaseDuration = 0, e.treeBaseDuration = 0;
      else {
        e.childLanes = a.childLanes, e.lanes = a.lanes, e.child = a.child, e.subtreeFlags = He, e.deletions = null, e.memoizedProps = a.memoizedProps, e.memoizedState = a.memoizedState, e.updateQueue = a.updateQueue, e.type = a.type;
        var i = a.dependencies;
        e.dependencies = i === null ? null : {
          lanes: i.lanes,
          firstContext: i.firstContext
        }, e.selfBaseDuration = a.selfBaseDuration, e.treeBaseDuration = a.treeBaseDuration;
      }
      return e;
    }
    function iD(e, t, a) {
      var i;
      return e === qh ? (i = kt, t === !0 && (i |= Sn, i |= rn)) : i = Pe, ca && (i |= nn), mi(J, null, null, i);
    }
    function y0(e, t, a, i, o, s) {
      var f = Z, h = e;
      if (typeof e == "function")
        m0(e) ? (f = W, h = f0(h)) : h = qf(h);
      else if (typeof e == "string")
        f = oe;
      else
        e: switch (e) {
          case Si:
            return Qu(a.children, o, s, t);
          case ti:
            f = Ke, o |= Sn, (o & kt) !== Pe && (o |= rn);
            break;
          case Ei:
            return lD(a, o, s, t);
          case pe:
            return oD(a, o, s, t);
          case we:
            return uD(a, o, s, t);
          case Pn:
            return HT(a, o, s, t);
          case Rn:
          // eslint-disable-next-line no-fallthrough
          case Ot:
          // eslint-disable-next-line no-fallthrough
          case _n:
          // eslint-disable-next-line no-fallthrough
          case Er:
          // eslint-disable-next-line no-fallthrough
          case Dt:
          // eslint-disable-next-line no-fallthrough
          default: {
            if (typeof e == "object" && e !== null)
              switch (e.$$typeof) {
                case Ci:
                  f = tt;
                  break e;
                case _:
                  f = jt;
                  break e;
                case X:
                  f = Ze, h = d0(h);
                  break e;
                case mt:
                  f = Le;
                  break e;
                case ut:
                  f = sn, h = null;
                  break e;
              }
            var m = "";
            {
              (e === void 0 || typeof e == "object" && e !== null && Object.keys(e).length === 0) && (m += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
              var E = i ? ot(i) : null;
              E && (m += `

Check the render method of \`` + E + "`.");
            }
            throw new Error("Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) " + ("but got: " + (e == null ? e : typeof e) + "." + m));
          }
        }
      var T = mi(f, a, t, o);
      return T.elementType = e, T.type = h, T.lanes = s, T._debugOwner = i, T;
    }
    function g0(e, t, a) {
      var i = null;
      i = e._owner;
      var o = e.type, s = e.key, f = e.props, h = y0(o, s, f, i, t, a);
      return h._debugSource = e._source, h._debugOwner = e._owner, h;
    }
    function Qu(e, t, a, i) {
      var o = mi(ct, e, i, t);
      return o.lanes = a, o;
    }
    function lD(e, t, a, i) {
      typeof e.id != "string" && C('Profiler must specify an "id" of type `string` as a prop. Received the type `%s` instead.', typeof e.id);
      var o = mi(Je, e, i, t | nn);
      return o.elementType = Ei, o.lanes = a, o.stateNode = {
        effectDuration: 0,
        passiveEffectDuration: 0
      }, o;
    }
    function oD(e, t, a, i) {
      var o = mi(_e, e, i, t);
      return o.elementType = pe, o.lanes = a, o;
    }
    function uD(e, t, a, i) {
      var o = mi(dn, e, i, t);
      return o.elementType = we, o.lanes = a, o;
    }
    function HT(e, t, a, i) {
      var o = mi(Ae, e, i, t);
      o.elementType = Pn, o.lanes = a;
      var s = {
        isHidden: !1
      };
      return o.stateNode = s, o;
    }
    function S0(e, t, a) {
      var i = mi(Ue, e, null, t);
      return i.lanes = a, i;
    }
    function sD() {
      var e = mi(oe, null, null, Pe);
      return e.elementType = "DELETED", e;
    }
    function cD(e) {
      var t = mi(Pt, null, null, Pe);
      return t.stateNode = e, t;
    }
    function E0(e, t, a) {
      var i = e.children !== null ? e.children : [], o = mi(se, i, e.key, t);
      return o.lanes = a, o.stateNode = {
        containerInfo: e.containerInfo,
        pendingChildren: null,
        // Used by persistent updates
        implementation: e.implementation
      }, o;
    }
    function PT(e, t) {
      return e === null && (e = mi(Z, null, null, Pe)), e.tag = t.tag, e.key = t.key, e.elementType = t.elementType, e.type = t.type, e.stateNode = t.stateNode, e.return = t.return, e.child = t.child, e.sibling = t.sibling, e.index = t.index, e.ref = t.ref, e.pendingProps = t.pendingProps, e.memoizedProps = t.memoizedProps, e.updateQueue = t.updateQueue, e.memoizedState = t.memoizedState, e.dependencies = t.dependencies, e.mode = t.mode, e.flags = t.flags, e.subtreeFlags = t.subtreeFlags, e.deletions = t.deletions, e.lanes = t.lanes, e.childLanes = t.childLanes, e.alternate = t.alternate, e.actualDuration = t.actualDuration, e.actualStartTime = t.actualStartTime, e.selfBaseDuration = t.selfBaseDuration, e.treeBaseDuration = t.treeBaseDuration, e._debugSource = t._debugSource, e._debugOwner = t._debugOwner, e._debugNeedsRemount = t._debugNeedsRemount, e._debugHookTypes = t._debugHookTypes, e;
    }
    function fD(e, t, a, i, o) {
      this.tag = t, this.containerInfo = e, this.pendingChildren = null, this.current = null, this.pingCache = null, this.finishedWork = null, this.timeoutHandle = tg, this.context = null, this.pendingContext = null, this.callbackNode = null, this.callbackPriority = Kt, this.eventTimes = Os(K), this.expirationTimes = Os(Tn), this.pendingLanes = K, this.suspendedLanes = K, this.pingedLanes = K, this.expiredLanes = K, this.mutableReadLanes = K, this.finishedLanes = K, this.entangledLanes = K, this.entanglements = Os(K), this.identifierPrefix = i, this.onRecoverableError = o, this.mutableSourceEagerHydrationData = null, this.effectDuration = 0, this.passiveEffectDuration = 0;
      {
        this.memoizedUpdaters = /* @__PURE__ */ new Set();
        for (var s = this.pendingUpdatersLaneMap = [], f = 0; f < _o; f++)
          s.push(/* @__PURE__ */ new Set());
      }
      switch (t) {
        case qh:
          this._debugRootType = a ? "hydrateRoot()" : "createRoot()";
          break;
        case zu:
          this._debugRootType = a ? "hydrate()" : "render()";
          break;
      }
    }
    function VT(e, t, a, i, o, s, f, h, m, E) {
      var T = new fD(e, t, a, h, m), O = iD(t, s);
      T.current = O, O.stateNode = T;
      {
        var D = {
          element: i,
          isDehydrated: a,
          cache: null,
          // not enabled yet
          transitions: null,
          pendingSuspenseBoundaries: null
        };
        O.memoizedState = D;
      }
      return Ng(O), T;
    }
    var C0 = "18.3.1";
    function dD(e, t, a) {
      var i = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : null;
      return ft(i), {
        // This tag allow us to uniquely identify this as a React Portal
        $$typeof: Kn,
        key: i == null ? null : "" + i,
        children: e,
        containerInfo: t,
        implementation: a
      };
    }
    var T0, R0;
    T0 = !1, R0 = {};
    function BT(e) {
      if (!e)
        return hi;
      var t = yu(e), a = Qb(t);
      if (t.tag === W) {
        var i = t.type;
        if (ql(i))
          return hE(t, i, a);
      }
      return a;
    }
    function pD(e, t) {
      {
        var a = yu(e);
        if (a === void 0) {
          if (typeof e.render == "function")
            throw new Error("Unable to find node on an unmounted component.");
          var i = Object.keys(e).join(",");
          throw new Error("Argument appears to not be a ReactComponent. Keys: " + i);
        }
        var o = ua(a);
        if (o === null)
          return null;
        if (o.mode & Sn) {
          var s = ot(a) || "Component";
          if (!R0[s]) {
            R0[s] = !0;
            var f = Cr;
            try {
              mn(o), a.mode & Sn ? C("%s is deprecated in StrictMode. %s was passed an instance of %s which is inside StrictMode. Instead, add a ref directly to the element you want to reference. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-find-node", t, t, s) : C("%s is deprecated in StrictMode. %s was passed an instance of %s which renders StrictMode children. Instead, add a ref directly to the element you want to reference. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-find-node", t, t, s);
            } finally {
              f ? mn(f) : xn();
            }
          }
        }
        return o.stateNode;
      }
    }
    function $T(e, t, a, i, o, s, f, h) {
      var m = !1, E = null;
      return VT(e, t, m, E, a, i, o, s, f);
    }
    function IT(e, t, a, i, o, s, f, h, m, E) {
      var T = !0, O = VT(a, i, T, e, o, s, f, h, m);
      O.context = BT(null);
      var D = O.current, j = Oa(), P = Wu(D), B = Yo(j, P);
      return B.callback = t ?? null, Fu(D, B, P), E1(O, P, j), O;
    }
    function iv(e, t, a, i) {
      Dd(t, e);
      var o = t.current, s = Oa(), f = Wu(o);
      An(f);
      var h = BT(a);
      t.context === null ? t.context = h : t.pendingContext = h, Ri && Cr !== null && !T0 && (T0 = !0, C(`Render methods should be a pure function of props and state; triggering nested component updates from render is not allowed. If necessary, trigger nested updates in componentDidUpdate.

Check the render method of %s.`, ot(Cr) || "Unknown"));
      var m = Yo(s, f);
      m.payload = {
        element: e
      }, i = i === void 0 ? null : i, i !== null && (typeof i != "function" && C("render(...): Expected the last optional `callback` argument to be a function. Instead received: %s.", i), m.callback = i);
      var E = Fu(o, m, f);
      return E !== null && (Nr(E, o, f, s), dm(E, o, f)), f;
    }
    function ty(e) {
      var t = e.current;
      if (!t.child)
        return null;
      switch (t.child.tag) {
        case oe:
          return t.child.stateNode;
        default:
          return t.child.stateNode;
      }
    }
    function vD(e) {
      switch (e.tag) {
        case J: {
          var t = e.stateNode;
          if (sf(t)) {
            var a = qv(t);
            w1(t, a);
          }
          break;
        }
        case _e: {
          Xo(function() {
            var o = Ga(e, qe);
            if (o !== null) {
              var s = Oa();
              Nr(o, e, qe, s);
            }
          });
          var i = qe;
          w0(e, i);
          break;
        }
      }
    }
    function YT(e, t) {
      var a = e.memoizedState;
      a !== null && a.dehydrated !== null && (a.retryLane = nh(a.retryLane, t));
    }
    function w0(e, t) {
      YT(e, t);
      var a = e.alternate;
      a && YT(a, t);
    }
    function hD(e) {
      if (e.tag === _e) {
        var t = ws, a = Ga(e, t);
        if (a !== null) {
          var i = Oa();
          Nr(a, e, t, i);
        }
        w0(e, t);
      }
    }
    function mD(e) {
      if (e.tag === _e) {
        var t = Wu(e), a = Ga(e, t);
        if (a !== null) {
          var i = Oa();
          Nr(a, e, t, i);
        }
        w0(e, t);
      }
    }
    function WT(e) {
      var t = kn(e);
      return t === null ? null : t.stateNode;
    }
    var GT = function(e) {
      return null;
    };
    function yD(e) {
      return GT(e);
    }
    var QT = function(e) {
      return !1;
    };
    function gD(e) {
      return QT(e);
    }
    var XT = null, KT = null, qT = null, ZT = null, JT = null, eR = null, tR = null, nR = null, rR = null;
    {
      var aR = function(e, t, a) {
        var i = t[a], o = bt(e) ? e.slice() : Tt({}, e);
        return a + 1 === t.length ? (bt(o) ? o.splice(i, 1) : delete o[i], o) : (o[i] = aR(e[i], t, a + 1), o);
      }, iR = function(e, t) {
        return aR(e, t, 0);
      }, lR = function(e, t, a, i) {
        var o = t[i], s = bt(e) ? e.slice() : Tt({}, e);
        if (i + 1 === t.length) {
          var f = a[i];
          s[f] = s[o], bt(s) ? s.splice(o, 1) : delete s[o];
        } else
          s[o] = lR(
            // $FlowFixMe number or string is fine here
            e[o],
            t,
            a,
            i + 1
          );
        return s;
      }, oR = function(e, t, a) {
        if (t.length !== a.length) {
          I("copyWithRename() expects paths of the same length");
          return;
        } else
          for (var i = 0; i < a.length - 1; i++)
            if (t[i] !== a[i]) {
              I("copyWithRename() expects paths to be the same except for the deepest key");
              return;
            }
        return lR(e, t, a, 0);
      }, uR = function(e, t, a, i) {
        if (a >= t.length)
          return i;
        var o = t[a], s = bt(e) ? e.slice() : Tt({}, e);
        return s[o] = uR(e[o], t, a + 1, i), s;
      }, sR = function(e, t, a) {
        return uR(e, t, 0, a);
      }, b0 = function(e, t) {
        for (var a = e.memoizedState; a !== null && t > 0; )
          a = a.next, t--;
        return a;
      };
      XT = function(e, t, a, i) {
        var o = b0(e, t);
        if (o !== null) {
          var s = sR(o.memoizedState, a, i);
          o.memoizedState = s, o.baseState = s, e.memoizedProps = Tt({}, e.memoizedProps);
          var f = Ga(e, qe);
          f !== null && Nr(f, e, qe, Tn);
        }
      }, KT = function(e, t, a) {
        var i = b0(e, t);
        if (i !== null) {
          var o = iR(i.memoizedState, a);
          i.memoizedState = o, i.baseState = o, e.memoizedProps = Tt({}, e.memoizedProps);
          var s = Ga(e, qe);
          s !== null && Nr(s, e, qe, Tn);
        }
      }, qT = function(e, t, a, i) {
        var o = b0(e, t);
        if (o !== null) {
          var s = oR(o.memoizedState, a, i);
          o.memoizedState = s, o.baseState = s, e.memoizedProps = Tt({}, e.memoizedProps);
          var f = Ga(e, qe);
          f !== null && Nr(f, e, qe, Tn);
        }
      }, ZT = function(e, t, a) {
        e.pendingProps = sR(e.memoizedProps, t, a), e.alternate && (e.alternate.pendingProps = e.pendingProps);
        var i = Ga(e, qe);
        i !== null && Nr(i, e, qe, Tn);
      }, JT = function(e, t) {
        e.pendingProps = iR(e.memoizedProps, t), e.alternate && (e.alternate.pendingProps = e.pendingProps);
        var a = Ga(e, qe);
        a !== null && Nr(a, e, qe, Tn);
      }, eR = function(e, t, a) {
        e.pendingProps = oR(e.memoizedProps, t, a), e.alternate && (e.alternate.pendingProps = e.pendingProps);
        var i = Ga(e, qe);
        i !== null && Nr(i, e, qe, Tn);
      }, tR = function(e) {
        var t = Ga(e, qe);
        t !== null && Nr(t, e, qe, Tn);
      }, nR = function(e) {
        GT = e;
      }, rR = function(e) {
        QT = e;
      };
    }
    function SD(e) {
      var t = ua(e);
      return t === null ? null : t.stateNode;
    }
    function ED(e) {
      return null;
    }
    function CD() {
      return Cr;
    }
    function TD(e) {
      var t = e.findFiberByHostInstance, a = v.ReactCurrentDispatcher;
      return Eu({
        bundleType: e.bundleType,
        version: e.version,
        rendererPackageName: e.rendererPackageName,
        rendererConfig: e.rendererConfig,
        overrideHookState: XT,
        overrideHookStateDeletePath: KT,
        overrideHookStateRenamePath: qT,
        overrideProps: ZT,
        overridePropsDeletePath: JT,
        overridePropsRenamePath: eR,
        setErrorHandler: nR,
        setSuspenseHandler: rR,
        scheduleUpdate: tR,
        currentDispatcherRef: a,
        findHostInstanceByFiber: SD,
        findFiberByHostInstance: t || ED,
        // React Refresh
        findHostInstancesForRefresh: Z1,
        scheduleRefresh: K1,
        scheduleRoot: q1,
        setRefreshHandler: X1,
        // Enables DevTools to append owner stacks to error messages in DEV mode.
        getCurrentFiber: CD,
        // Enables DevTools to detect reconciler version rather than renderer version
        // which may not match for third party renderers.
        reconcilerVersion: C0
      });
    }
    var cR = typeof reportError == "function" ? (
      // In modern browsers, reportError will dispatch an error event,
      // emulating an uncaught JavaScript error.
      reportError
    ) : function(e) {
      console.error(e);
    };
    function _0(e) {
      this._internalRoot = e;
    }
    ny.prototype.render = _0.prototype.render = function(e) {
      var t = this._internalRoot;
      if (t === null)
        throw new Error("Cannot update an unmounted root.");
      {
        typeof arguments[1] == "function" ? C("render(...): does not support the second callback argument. To execute a side effect after rendering, declare it in a component body with useEffect().") : ry(arguments[1]) ? C("You passed a container to the second argument of root.render(...). You don't need to pass it again since you already passed it to create the root.") : typeof arguments[1] < "u" && C("You passed a second argument to root.render(...) but it only accepts one argument.");
        var a = t.containerInfo;
        if (a.nodeType !== qn) {
          var i = WT(t.current);
          i && i.parentNode !== a && C("render(...): It looks like the React-rendered content of the root container was removed without using React. This is not supported and will cause errors. Instead, call root.unmount() to empty a root's container.");
        }
      }
      iv(e, t, null, null);
    }, ny.prototype.unmount = _0.prototype.unmount = function() {
      typeof arguments[0] == "function" && C("unmount(...): does not support a callback argument. To execute a side effect after rendering, declare it in a component body with useEffect().");
      var e = this._internalRoot;
      if (e !== null) {
        this._internalRoot = null;
        var t = e.containerInfo;
        TT() && C("Attempted to synchronously unmount a root while React was already rendering. React cannot finish unmounting the root until the current render has completed, which may lead to a race condition."), Xo(function() {
          iv(null, e, null, null);
        }), cE(t);
      }
    };
    function RD(e, t) {
      if (!ry(e))
        throw new Error("createRoot(...): Target container is not a DOM element.");
      fR(e);
      var a = !1, i = !1, o = "", s = cR;
      t != null && (t.hydrate ? I("hydrate through createRoot is deprecated. Use ReactDOMClient.hydrateRoot(container, <App />) instead.") : typeof t == "object" && t !== null && t.$$typeof === Sr && C(`You passed a JSX element to createRoot. You probably meant to call root.render instead. Example usage:

  let root = createRoot(domContainer);
  root.render(<App />);`), t.unstable_strictMode === !0 && (a = !0), t.identifierPrefix !== void 0 && (o = t.identifierPrefix), t.onRecoverableError !== void 0 && (s = t.onRecoverableError), t.transitionCallbacks !== void 0 && t.transitionCallbacks);
      var f = $T(e, qh, null, a, i, o, s);
      Ih(f.current, e);
      var h = e.nodeType === qn ? e.parentNode : e;
      return fp(h), new _0(f);
    }
    function ny(e) {
      this._internalRoot = e;
    }
    function wD(e) {
      e && dh(e);
    }
    ny.prototype.unstable_scheduleHydration = wD;
    function bD(e, t, a) {
      if (!ry(e))
        throw new Error("hydrateRoot(...): Target container is not a DOM element.");
      fR(e), t === void 0 && C("Must provide initial children as second argument to hydrateRoot. Example usage: hydrateRoot(domContainer, <App />)");
      var i = a ?? null, o = a != null && a.hydratedSources || null, s = !1, f = !1, h = "", m = cR;
      a != null && (a.unstable_strictMode === !0 && (s = !0), a.identifierPrefix !== void 0 && (h = a.identifierPrefix), a.onRecoverableError !== void 0 && (m = a.onRecoverableError));
      var E = IT(t, null, e, qh, i, s, f, h, m);
      if (Ih(E.current, e), fp(e), o)
        for (var T = 0; T < o.length; T++) {
          var O = o[T];
          k_(E, O);
        }
      return new ny(E);
    }
    function ry(e) {
      return !!(e && (e.nodeType === ia || e.nodeType === el || e.nodeType === pd));
    }
    function lv(e) {
      return !!(e && (e.nodeType === ia || e.nodeType === el || e.nodeType === pd || e.nodeType === qn && e.nodeValue === " react-mount-point-unstable "));
    }
    function fR(e) {
      e.nodeType === ia && e.tagName && e.tagName.toUpperCase() === "BODY" && C("createRoot(): Creating roots directly with document.body is discouraged, since its children are often manipulated by third-party scripts and browser extensions. This may lead to subtle reconciliation issues. Try using a container element created for your app."), Tp(e) && (e._reactRootContainer ? C("You are calling ReactDOMClient.createRoot() on a container that was previously passed to ReactDOM.render(). This is not supported.") : C("You are calling ReactDOMClient.createRoot() on a container that has already been passed to createRoot() before. Instead, call root.render() on the existing root instead if you want to update it."));
    }
    var _D = v.ReactCurrentOwner, dR;
    dR = function(e) {
      if (e._reactRootContainer && e.nodeType !== qn) {
        var t = WT(e._reactRootContainer.current);
        t && t.parentNode !== e && C("render(...): It looks like the React-rendered content of this container was removed without using React. This is not supported and will cause errors. Instead, call ReactDOM.unmountComponentAtNode to empty a container.");
      }
      var a = !!e._reactRootContainer, i = x0(e), o = !!(i && Nu(i));
      o && !a && C("render(...): Replacing React-rendered children with a new root component. If you intended to update the children of this node, you should instead have the existing children update their state and render the new components instead of calling ReactDOM.render."), e.nodeType === ia && e.tagName && e.tagName.toUpperCase() === "BODY" && C("render(): Rendering components directly into document.body is discouraged, since its children are often manipulated by third-party scripts and browser extensions. This may lead to subtle reconciliation issues. Try rendering into a container element created for your app.");
    };
    function x0(e) {
      return e ? e.nodeType === el ? e.documentElement : e.firstChild : null;
    }
    function pR() {
    }
    function xD(e, t, a, i, o) {
      if (o) {
        if (typeof i == "function") {
          var s = i;
          i = function() {
            var D = ty(f);
            s.call(D);
          };
        }
        var f = IT(
          t,
          i,
          e,
          zu,
          null,
          // hydrationCallbacks
          !1,
          // isStrictMode
          !1,
          // concurrentUpdatesByDefaultOverride,
          "",
          // identifierPrefix
          pR
        );
        e._reactRootContainer = f, Ih(f.current, e);
        var h = e.nodeType === qn ? e.parentNode : e;
        return fp(h), Xo(), f;
      } else {
        for (var m; m = e.lastChild; )
          e.removeChild(m);
        if (typeof i == "function") {
          var E = i;
          i = function() {
            var D = ty(T);
            E.call(D);
          };
        }
        var T = $T(
          e,
          zu,
          null,
          // hydrationCallbacks
          !1,
          // isStrictMode
          !1,
          // concurrentUpdatesByDefaultOverride,
          "",
          // identifierPrefix
          pR
        );
        e._reactRootContainer = T, Ih(T.current, e);
        var O = e.nodeType === qn ? e.parentNode : e;
        return fp(O), Xo(function() {
          iv(t, T, a, i);
        }), T;
      }
    }
    function DD(e, t) {
      e !== null && typeof e != "function" && C("%s(...): Expected the last optional `callback` argument to be a function. Instead received: %s.", t, e);
    }
    function ay(e, t, a, i, o) {
      dR(a), DD(o === void 0 ? null : o, "render");
      var s = a._reactRootContainer, f;
      if (!s)
        f = xD(a, t, e, o, i);
      else {
        if (f = s, typeof o == "function") {
          var h = o;
          o = function() {
            var m = ty(f);
            h.call(m);
          };
        }
        iv(t, f, e, o);
      }
      return ty(f);
    }
    var vR = !1;
    function kD(e) {
      {
        vR || (vR = !0, C("findDOMNode is deprecated and will be removed in the next major release. Instead, add a ref directly to the element you want to reference. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-find-node"));
        var t = _D.current;
        if (t !== null && t.stateNode !== null) {
          var a = t.stateNode._warnedAboutRefsInRender;
          a || C("%s is accessing findDOMNode inside its render(). render() should be a pure function of props and state. It should never access something that requires stale data from the previous render, such as refs. Move this logic to componentDidMount and componentDidUpdate instead.", Yt(t.type) || "A component"), t.stateNode._warnedAboutRefsInRender = !0;
        }
      }
      return e == null ? null : e.nodeType === ia ? e : pD(e, "findDOMNode");
    }
    function OD(e, t, a) {
      if (C("ReactDOM.hydrate is no longer supported in React 18. Use hydrateRoot instead. Until you switch to the new API, your app will behave as if it's running React 17. Learn more: https://reactjs.org/link/switch-to-createroot"), !lv(t))
        throw new Error("Target container is not a DOM element.");
      {
        var i = Tp(t) && t._reactRootContainer === void 0;
        i && C("You are calling ReactDOM.hydrate() on a container that was previously passed to ReactDOMClient.createRoot(). This is not supported. Did you mean to call hydrateRoot(container, element)?");
      }
      return ay(null, e, t, !0, a);
    }
    function MD(e, t, a) {
      if (C("ReactDOM.render is no longer supported in React 18. Use createRoot instead. Until you switch to the new API, your app will behave as if it's running React 17. Learn more: https://reactjs.org/link/switch-to-createroot"), !lv(t))
        throw new Error("Target container is not a DOM element.");
      {
        var i = Tp(t) && t._reactRootContainer === void 0;
        i && C("You are calling ReactDOM.render() on a container that was previously passed to ReactDOMClient.createRoot(). This is not supported. Did you mean to call root.render(element)?");
      }
      return ay(null, e, t, !1, a);
    }
    function LD(e, t, a, i) {
      if (C("ReactDOM.unstable_renderSubtreeIntoContainer() is no longer supported in React 18. Consider using a portal instead. Until you switch to the createRoot API, your app will behave as if it's running React 17. Learn more: https://reactjs.org/link/switch-to-createroot"), !lv(a))
        throw new Error("Target container is not a DOM element.");
      if (e == null || !wy(e))
        throw new Error("parentComponent must be a valid React Component");
      return ay(e, t, a, !1, i);
    }
    var hR = !1;
    function ND(e) {
      if (hR || (hR = !0, C("unmountComponentAtNode is deprecated and will be removed in the next major release. Switch to the createRoot API. Learn more: https://reactjs.org/link/switch-to-createroot")), !lv(e))
        throw new Error("unmountComponentAtNode(...): Target container is not a DOM element.");
      {
        var t = Tp(e) && e._reactRootContainer === void 0;
        t && C("You are calling ReactDOM.unmountComponentAtNode() on a container that was previously passed to ReactDOMClient.createRoot(). This is not supported. Did you mean to call root.unmount()?");
      }
      if (e._reactRootContainer) {
        {
          var a = x0(e), i = a && !Nu(a);
          i && C("unmountComponentAtNode(): The node you're attempting to unmount was rendered by another copy of React.");
        }
        return Xo(function() {
          ay(null, null, e, !1, function() {
            e._reactRootContainer = null, cE(e);
          });
        }), !0;
      } else {
        {
          var o = x0(e), s = !!(o && Nu(o)), f = e.nodeType === ia && lv(e.parentNode) && !!e.parentNode._reactRootContainer;
          s && C("unmountComponentAtNode(): The node you're attempting to unmount was rendered by React and is not a top-level container. %s", f ? "You may have accidentally passed in a React root node instead of its container." : "Instead, have the parent component update its state and rerender in order to remove this component.");
        }
        return !1;
      }
    }
    jr(vD), wu(hD), uh(mD), zs(Ia), Qd(ih), (typeof Map != "function" || // $FlowIssue Flow incorrectly thinks Map has no prototype
    Map.prototype == null || typeof Map.prototype.forEach != "function" || typeof Set != "function" || // $FlowIssue Flow incorrectly thinks Set has no prototype
    Set.prototype == null || typeof Set.prototype.clear != "function" || typeof Set.prototype.forEach != "function") && C("React depends on Map and Set built-in types. Make sure that you load a polyfill in older browsers. https://reactjs.org/link/react-polyfills"), bc(zw), Ry(a0, b1, Xo);
    function AD(e, t) {
      var a = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : null;
      if (!ry(t))
        throw new Error("Target container is not a DOM element.");
      return dD(e, t, null, a);
    }
    function zD(e, t, a, i) {
      return LD(e, t, a, i);
    }
    var D0 = {
      usingClientEntryPoint: !1,
      // Keep in sync with ReactTestUtils.js.
      // This is an array for better minification.
      Events: [Nu, Df, Yh, pu, _c, a0]
    };
    function UD(e, t) {
      return D0.usingClientEntryPoint || C('You are importing createRoot from "react-dom" which is not supported. You should instead import it from "react-dom/client".'), RD(e, t);
    }
    function jD(e, t, a) {
      return D0.usingClientEntryPoint || C('You are importing hydrateRoot from "react-dom" which is not supported. You should instead import it from "react-dom/client".'), bD(e, t, a);
    }
    function FD(e) {
      return TT() && C("flushSync was called from inside a lifecycle method. React cannot flush when React is already rendering. Consider moving this call to a scheduler task or micro task."), Xo(e);
    }
    var HD = TD({
      findFiberByHostInstance: Xs,
      bundleType: 1,
      version: C0,
      rendererPackageName: "react-dom"
    });
    if (!HD && jn && window.top === window.self && (navigator.userAgent.indexOf("Chrome") > -1 && navigator.userAgent.indexOf("Edge") === -1 || navigator.userAgent.indexOf("Firefox") > -1)) {
      var mR = window.location.protocol;
      /^(https?|file):$/.test(mR) && console.info("%cDownload the React DevTools for a better development experience: https://reactjs.org/link/react-devtools" + (mR === "file:" ? `
You might need to use a local HTTP server (instead of file://): https://reactjs.org/link/react-devtools-faq` : ""), "font-weight:bold");
    }
    Za.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = D0, Za.createPortal = AD, Za.createRoot = UD, Za.findDOMNode = kD, Za.flushSync = FD, Za.hydrate = OD, Za.hydrateRoot = jD, Za.render = MD, Za.unmountComponentAtNode = ND, Za.unstable_batchedUpdates = a0, Za.unstable_renderSubtreeIntoContainer = zD, Za.version = C0, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
  })()), Za;
}
var bR;
function XD() {
  if (bR) return ly.exports;
  bR = 1;
  function g() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function")) {
      if (process.env.NODE_ENV !== "production")
        throw new Error("^_^");
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(g);
      } catch (d) {
        console.error(d);
      }
    }
  }
  return process.env.NODE_ENV === "production" ? (g(), ly.exports = GD()) : ly.exports = QD(), ly.exports;
}
var _R;
function KD() {
  if (_R) return Jf;
  _R = 1;
  var g = XD();
  if (process.env.NODE_ENV === "production")
    Jf.createRoot = g.createRoot, Jf.hydrateRoot = g.hydrateRoot;
  else {
    var d = g.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    Jf.createRoot = function(v, R) {
      d.usingClientEntryPoint = !0;
      try {
        return g.createRoot(v, R);
      } finally {
        d.usingClientEntryPoint = !1;
      }
    }, Jf.hydrateRoot = function(v, R, M) {
      d.usingClientEntryPoint = !0;
      try {
        return g.hydrateRoot(v, R, M);
      } finally {
        d.usingClientEntryPoint = !1;
      }
    };
  }
  return Jf;
}
var qD = KD(), uy = { exports: {} }, uv = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var xR;
function ZD() {
  if (xR) return uv;
  xR = 1;
  var g = fv(), d = Symbol.for("react.element"), v = Symbol.for("react.fragment"), R = Object.prototype.hasOwnProperty, M = g.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, I = { key: !0, ref: !0, __self: !0, __source: !0 };
  function C(de, Q, W) {
    var Z, J = {}, se = null, oe = null;
    W !== void 0 && (se = "" + W), Q.key !== void 0 && (se = "" + Q.key), Q.ref !== void 0 && (oe = Q.ref);
    for (Z in Q) R.call(Q, Z) && !I.hasOwnProperty(Z) && (J[Z] = Q[Z]);
    if (de && de.defaultProps) for (Z in Q = de.defaultProps, Q) J[Z] === void 0 && (J[Z] = Q[Z]);
    return { $$typeof: d, type: de, key: se, ref: oe, props: J, _owner: M.current };
  }
  return uv.Fragment = v, uv.jsx = C, uv.jsxs = C, uv;
}
var sv = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var DR;
function JD() {
  return DR || (DR = 1, process.env.NODE_ENV !== "production" && (function() {
    var g = fv(), d = Symbol.for("react.element"), v = Symbol.for("react.portal"), R = Symbol.for("react.fragment"), M = Symbol.for("react.strict_mode"), I = Symbol.for("react.profiler"), C = Symbol.for("react.provider"), de = Symbol.for("react.context"), Q = Symbol.for("react.forward_ref"), W = Symbol.for("react.suspense"), Z = Symbol.for("react.suspense_list"), J = Symbol.for("react.memo"), se = Symbol.for("react.lazy"), oe = Symbol.for("react.offscreen"), Ue = Symbol.iterator, ct = "@@iterator";
    function Ke(_) {
      if (_ === null || typeof _ != "object")
        return null;
      var X = Ue && _[Ue] || _[ct];
      return typeof X == "function" ? X : null;
    }
    var jt = g.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function tt(_) {
      {
        for (var X = arguments.length, pe = new Array(X > 1 ? X - 1 : 0), we = 1; we < X; we++)
          pe[we - 1] = arguments[we];
        Ze("error", _, pe);
      }
    }
    function Ze(_, X, pe) {
      {
        var we = jt.ReactDebugCurrentFrame, mt = we.getStackAddendum();
        mt !== "" && (X += "%s", pe = pe.concat([mt]));
        var ut = pe.map(function(Ot) {
          return String(Ot);
        });
        ut.unshift("Warning: " + X), Function.prototype.apply.call(console[_], console, ut);
      }
    }
    var Je = !1, _e = !1, Le = !1, je = !1, sn = !1, Gt;
    Gt = Symbol.for("react.module.reference");
    function Pt(_) {
      return !!(typeof _ == "string" || typeof _ == "function" || _ === R || _ === I || sn || _ === M || _ === W || _ === Z || je || _ === oe || Je || _e || Le || typeof _ == "object" && _ !== null && (_.$$typeof === se || _.$$typeof === J || _.$$typeof === C || _.$$typeof === de || _.$$typeof === Q || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      _.$$typeof === Gt || _.getModuleId !== void 0));
    }
    function dn(_, X, pe) {
      var we = _.displayName;
      if (we)
        return we;
      var mt = X.displayName || X.name || "";
      return mt !== "" ? pe + "(" + mt + ")" : pe;
    }
    function nt(_) {
      return _.displayName || "Context";
    }
    function Ae(_) {
      if (_ == null)
        return null;
      if (typeof _.tag == "number" && tt("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof _ == "function")
        return _.displayName || _.name || null;
      if (typeof _ == "string")
        return _;
      switch (_) {
        case R:
          return "Fragment";
        case v:
          return "Portal";
        case I:
          return "Profiler";
        case M:
          return "StrictMode";
        case W:
          return "Suspense";
        case Z:
          return "SuspenseList";
      }
      if (typeof _ == "object")
        switch (_.$$typeof) {
          case de:
            var X = _;
            return nt(X) + ".Consumer";
          case C:
            var pe = _;
            return nt(pe._context) + ".Provider";
          case Q:
            return dn(_, _.render, "ForwardRef");
          case J:
            var we = _.displayName || null;
            return we !== null ? we : Ae(_.type) || "Memo";
          case se: {
            var mt = _, ut = mt._payload, Ot = mt._init;
            try {
              return Ae(Ot(ut));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var _t = Object.assign, xt = 0, At, Ee, ie, be, ue, L, Y;
    function Ie() {
    }
    Ie.__reactDisabledLog = !0;
    function Fe() {
      {
        if (xt === 0) {
          At = console.log, Ee = console.info, ie = console.warn, be = console.error, ue = console.group, L = console.groupCollapsed, Y = console.groupEnd;
          var _ = {
            configurable: !0,
            enumerable: !0,
            value: Ie,
            writable: !0
          };
          Object.defineProperties(console, {
            info: _,
            log: _,
            warn: _,
            error: _,
            group: _,
            groupCollapsed: _,
            groupEnd: _
          });
        }
        xt++;
      }
    }
    function gt() {
      {
        if (xt--, xt === 0) {
          var _ = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: _t({}, _, {
              value: At
            }),
            info: _t({}, _, {
              value: Ee
            }),
            warn: _t({}, _, {
              value: ie
            }),
            error: _t({}, _, {
              value: be
            }),
            group: _t({}, _, {
              value: ue
            }),
            groupCollapsed: _t({}, _, {
              value: L
            }),
            groupEnd: _t({}, _, {
              value: Y
            })
          });
        }
        xt < 0 && tt("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var pt = jt.ReactCurrentDispatcher, vt;
    function rt(_, X, pe) {
      {
        if (vt === void 0)
          try {
            throw Error();
          } catch (mt) {
            var we = mt.stack.trim().match(/\n( *(at )?)/);
            vt = we && we[1] || "";
          }
        return `
` + vt + _;
      }
    }
    var St = !1, Qt;
    {
      var jn = typeof WeakMap == "function" ? WeakMap : Map;
      Qt = new jn();
    }
    function Qn(_, X) {
      if (!_ || St)
        return "";
      {
        var pe = Qt.get(_);
        if (pe !== void 0)
          return pe;
      }
      var we;
      St = !0;
      var mt = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var ut;
      ut = pt.current, pt.current = null, Fe();
      try {
        if (X) {
          var Ot = function() {
            throw Error();
          };
          if (Object.defineProperty(Ot.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(Ot, []);
            } catch (yt) {
              we = yt;
            }
            Reflect.construct(_, [], Ot);
          } else {
            try {
              Ot.call();
            } catch (yt) {
              we = yt;
            }
            _.call(Ot.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (yt) {
            we = yt;
          }
          _();
        }
      } catch (yt) {
        if (yt && we && typeof yt.stack == "string") {
          for (var Dt = yt.stack.split(`
`), Pn = we.stack.split(`
`), Rn = Dt.length - 1, _n = Pn.length - 1; Rn >= 1 && _n >= 0 && Dt[Rn] !== Pn[_n]; )
            _n--;
          for (; Rn >= 1 && _n >= 0; Rn--, _n--)
            if (Dt[Rn] !== Pn[_n]) {
              if (Rn !== 1 || _n !== 1)
                do
                  if (Rn--, _n--, _n < 0 || Dt[Rn] !== Pn[_n]) {
                    var Er = `
` + Dt[Rn].replace(" at new ", " at ");
                    return _.displayName && Er.includes("<anonymous>") && (Er = Er.replace("<anonymous>", _.displayName)), typeof _ == "function" && Qt.set(_, Er), Er;
                  }
                while (Rn >= 1 && _n >= 0);
              break;
            }
        }
      } finally {
        St = !1, pt.current = ut, gt(), Error.prepareStackTrace = mt;
      }
      var ni = _ ? _.displayName || _.name : "", ri = ni ? rt(ni) : "";
      return typeof _ == "function" && Qt.set(_, ri), ri;
    }
    function Fn(_, X, pe) {
      return Qn(_, !1);
    }
    function Ce(_) {
      var X = _.prototype;
      return !!(X && X.isReactComponent);
    }
    function Ve(_, X, pe) {
      if (_ == null)
        return "";
      if (typeof _ == "function")
        return Qn(_, Ce(_));
      if (typeof _ == "string")
        return rt(_);
      switch (_) {
        case W:
          return rt("Suspense");
        case Z:
          return rt("SuspenseList");
      }
      if (typeof _ == "object")
        switch (_.$$typeof) {
          case Q:
            return Fn(_.render);
          case J:
            return Ve(_.type, X, pe);
          case se: {
            var we = _, mt = we._payload, ut = we._init;
            try {
              return Ve(ut(mt), X, pe);
            } catch {
            }
          }
        }
      return "";
    }
    var Qe = Object.prototype.hasOwnProperty, ft = {}, Lt = jt.ReactDebugCurrentFrame;
    function zt(_) {
      if (_) {
        var X = _._owner, pe = Ve(_.type, _._source, X ? X.type : null);
        Lt.setExtraStackFrame(pe);
      } else
        Lt.setExtraStackFrame(null);
    }
    function Ct(_, X, pe, we, mt) {
      {
        var ut = Function.call.bind(Qe);
        for (var Ot in _)
          if (ut(_, Ot)) {
            var Dt = void 0;
            try {
              if (typeof _[Ot] != "function") {
                var Pn = Error((we || "React class") + ": " + pe + " type `" + Ot + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof _[Ot] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw Pn.name = "Invariant Violation", Pn;
              }
              Dt = _[Ot](X, Ot, we, pe, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (Rn) {
              Dt = Rn;
            }
            Dt && !(Dt instanceof Error) && (zt(mt), tt("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", we || "React class", pe, Ot, typeof Dt), zt(null)), Dt instanceof Error && !(Dt.message in ft) && (ft[Dt.message] = !0, zt(mt), tt("Failed %s type: %s", pe, Dt.message), zt(null));
          }
      }
    }
    var Rt = Array.isArray;
    function Nt(_) {
      return Rt(_);
    }
    function wt(_) {
      {
        var X = typeof Symbol == "function" && Symbol.toStringTag, pe = X && _[Symbol.toStringTag] || _.constructor.name || "Object";
        return pe;
      }
    }
    function Xt(_) {
      try {
        return it(_), !1;
      } catch {
        return !0;
      }
    }
    function it(_) {
      return "" + _;
    }
    function lt(_) {
      if (Xt(_))
        return tt("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", wt(_)), it(_);
    }
    var Zt = jt.ReactCurrentOwner, Ft = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, Xe, ne;
    function me(_) {
      if (Qe.call(_, "ref")) {
        var X = Object.getOwnPropertyDescriptor(_, "ref").get;
        if (X && X.isReactWarning)
          return !1;
      }
      return _.ref !== void 0;
    }
    function Oe(_) {
      if (Qe.call(_, "key")) {
        var X = Object.getOwnPropertyDescriptor(_, "key").get;
        if (X && X.isReactWarning)
          return !1;
      }
      return _.key !== void 0;
    }
    function ht(_, X) {
      typeof _.ref == "string" && Zt.current;
    }
    function Jt(_, X) {
      {
        var pe = function() {
          Xe || (Xe = !0, tt("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", X));
        };
        pe.isReactWarning = !0, Object.defineProperty(_, "key", {
          get: pe,
          configurable: !0
        });
      }
    }
    function en(_, X) {
      {
        var pe = function() {
          ne || (ne = !0, tt("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", X));
        };
        pe.isReactWarning = !0, Object.defineProperty(_, "ref", {
          get: pe,
          configurable: !0
        });
      }
    }
    var pn = function(_, X, pe, we, mt, ut, Ot) {
      var Dt = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: d,
        // Built-in properties that belong on the element
        type: _,
        key: X,
        ref: pe,
        props: Ot,
        // Record the component responsible for creating this element.
        _owner: ut
      };
      return Dt._store = {}, Object.defineProperty(Dt._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: !1
      }), Object.defineProperty(Dt, "_self", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: we
      }), Object.defineProperty(Dt, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: mt
      }), Object.freeze && (Object.freeze(Dt.props), Object.freeze(Dt)), Dt;
    };
    function Xn(_, X, pe, we, mt) {
      {
        var ut, Ot = {}, Dt = null, Pn = null;
        pe !== void 0 && (lt(pe), Dt = "" + pe), Oe(X) && (lt(X.key), Dt = "" + X.key), me(X) && (Pn = X.ref, ht(X, mt));
        for (ut in X)
          Qe.call(X, ut) && !Ft.hasOwnProperty(ut) && (Ot[ut] = X[ut]);
        if (_ && _.defaultProps) {
          var Rn = _.defaultProps;
          for (ut in Rn)
            Ot[ut] === void 0 && (Ot[ut] = Rn[ut]);
        }
        if (Dt || Pn) {
          var _n = typeof _ == "function" ? _.displayName || _.name || "Unknown" : _;
          Dt && Jt(Ot, _n), Pn && en(Ot, _n);
        }
        return pn(_, Dt, Pn, mt, we, Zt.current, Ot);
      }
    }
    var hn = jt.ReactCurrentOwner, vn = jt.ReactDebugCurrentFrame;
    function un(_) {
      if (_) {
        var X = _._owner, pe = Ve(_.type, _._source, X ? X.type : null);
        vn.setExtraStackFrame(pe);
      } else
        vn.setExtraStackFrame(null);
    }
    var Ar;
    Ar = !1;
    function lr(_) {
      return typeof _ == "object" && _ !== null && _.$$typeof === d;
    }
    function Hr() {
      {
        if (hn.current) {
          var _ = Ae(hn.current.type);
          if (_)
            return `

Check the render method of \`` + _ + "`.";
        }
        return "";
      }
    }
    function Pr(_) {
      return "";
    }
    var Gi = {};
    function Qi(_) {
      {
        var X = Hr();
        if (!X) {
          var pe = typeof _ == "string" ? _ : _.displayName || _.name;
          pe && (X = `

Check the top-level render call using <` + pe + ">.");
        }
        return X;
      }
    }
    function Ja(_, X) {
      {
        if (!_._store || _._store.validated || _.key != null)
          return;
        _._store.validated = !0;
        var pe = Qi(X);
        if (Gi[pe])
          return;
        Gi[pe] = !0;
        var we = "";
        _ && _._owner && _._owner !== hn.current && (we = " It was passed a child from " + Ae(_._owner.type) + "."), un(_), tt('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', pe, we), un(null);
      }
    }
    function ei(_, X) {
      {
        if (typeof _ != "object")
          return;
        if (Nt(_))
          for (var pe = 0; pe < _.length; pe++) {
            var we = _[pe];
            lr(we) && Ja(we, X);
          }
        else if (lr(_))
          _._store && (_._store.validated = !0);
        else if (_) {
          var mt = Ke(_);
          if (typeof mt == "function" && mt !== _.entries)
            for (var ut = mt.call(_), Ot; !(Ot = ut.next()).done; )
              lr(Ot.value) && Ja(Ot.value, X);
        }
      }
    }
    function gi(_) {
      {
        var X = _.type;
        if (X == null || typeof X == "string")
          return;
        var pe;
        if (typeof X == "function")
          pe = X.propTypes;
        else if (typeof X == "object" && (X.$$typeof === Q || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        X.$$typeof === J))
          pe = X.propTypes;
        else
          return;
        if (pe) {
          var we = Ae(X);
          Ct(pe, _.props, "prop", we, _);
        } else if (X.PropTypes !== void 0 && !Ar) {
          Ar = !0;
          var mt = Ae(X);
          tt("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", mt || "Unknown");
        }
        typeof X.getDefaultProps == "function" && !X.getDefaultProps.isReactClassApproved && tt("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function gr(_) {
      {
        for (var X = Object.keys(_.props), pe = 0; pe < X.length; pe++) {
          var we = X[pe];
          if (we !== "children" && we !== "key") {
            un(_), tt("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", we), un(null);
            break;
          }
        }
        _.ref !== null && (un(_), tt("Invalid attribute `ref` supplied to `React.Fragment`."), un(null));
      }
    }
    var Sr = {};
    function Kn(_, X, pe, we, mt, ut) {
      {
        var Ot = Pt(_);
        if (!Ot) {
          var Dt = "";
          (_ === void 0 || typeof _ == "object" && _ !== null && Object.keys(_).length === 0) && (Dt += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var Pn = Pr();
          Pn ? Dt += Pn : Dt += Hr();
          var Rn;
          _ === null ? Rn = "null" : Nt(_) ? Rn = "array" : _ !== void 0 && _.$$typeof === d ? (Rn = "<" + (Ae(_.type) || "Unknown") + " />", Dt = " Did you accidentally export a JSX literal instead of a component?") : Rn = typeof _, tt("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", Rn, Dt);
        }
        var _n = Xn(_, X, pe, mt, ut);
        if (_n == null)
          return _n;
        if (Ot) {
          var Er = X.children;
          if (Er !== void 0)
            if (we)
              if (Nt(Er)) {
                for (var ni = 0; ni < Er.length; ni++)
                  ei(Er[ni], _);
                Object.freeze && Object.freeze(Er);
              } else
                tt("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              ei(Er, _);
        }
        if (Qe.call(X, "key")) {
          var ri = Ae(_), yt = Object.keys(X).filter(function(lo) {
            return lo !== "key";
          }), Tt = yt.length > 0 ? "{key: someKey, " + yt.join(": ..., ") + ": ...}" : "{key: someKey}";
          if (!Sr[ri + Tt]) {
            var ai = yt.length > 0 ? "{" + yt.join(": ..., ") + ": ...}" : "{}";
            tt(`A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`, Tt, ri, ai, ri), Sr[ri + Tt] = !0;
          }
        }
        return _ === R ? gr(_n) : gi(_n), _n;
      }
    }
    function Si(_, X, pe) {
      return Kn(_, X, pe, !0);
    }
    function ti(_, X, pe) {
      return Kn(_, X, pe, !1);
    }
    var Ei = ti, Ci = Si;
    sv.Fragment = R, sv.jsx = Ei, sv.jsxs = Ci;
  })()), sv;
}
var kR;
function ek() {
  return kR || (kR = 1, process.env.NODE_ENV === "production" ? uy.exports = ZD() : uy.exports = JD()), uy.exports;
}
var ra = ek();
function tk(g, d, v) {
  return Math.max(d, Math.min(g, v));
}
const Un = {
  toVector(g, d) {
    return g === void 0 && (g = d), Array.isArray(g) ? g : [g, g];
  },
  add(g, d) {
    return [g[0] + d[0], g[1] + d[1]];
  },
  sub(g, d) {
    return [g[0] - d[0], g[1] - d[1]];
  },
  addTo(g, d) {
    g[0] += d[0], g[1] += d[1];
  },
  subTo(g, d) {
    g[0] -= d[0], g[1] -= d[1];
  }
};
function OR(g, d, v) {
  return d === 0 || Math.abs(d) === 1 / 0 ? Math.pow(g, v * 5) : g * d * v / (d + v * g);
}
function MR(g, d, v, R = 0.15) {
  return R === 0 ? tk(g, d, v) : g < d ? -OR(d - g, v - d, R) + d : g > v ? +OR(g - v, v - d, R) + v : g;
}
function nk(g, [d, v], [R, M]) {
  const [[I, C], [de, Q]] = g;
  return [MR(d, I, C, R), MR(v, de, Q, M)];
}
function rk(g, d) {
  if (typeof g != "object" || g === null) return g;
  var v = g[Symbol.toPrimitive];
  if (v !== void 0) {
    var R = v.call(g, d);
    if (typeof R != "object") return R;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (d === "string" ? String : Number)(g);
}
function ak(g) {
  var d = rk(g, "string");
  return typeof d == "symbol" ? d : String(d);
}
function yr(g, d, v) {
  return d = ak(d), d in g ? Object.defineProperty(g, d, {
    value: v,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : g[d] = v, g;
}
function LR(g, d) {
  var v = Object.keys(g);
  if (Object.getOwnPropertySymbols) {
    var R = Object.getOwnPropertySymbols(g);
    d && (R = R.filter(function(M) {
      return Object.getOwnPropertyDescriptor(g, M).enumerable;
    })), v.push.apply(v, R);
  }
  return v;
}
function Gn(g) {
  for (var d = 1; d < arguments.length; d++) {
    var v = arguments[d] != null ? arguments[d] : {};
    d % 2 ? LR(Object(v), !0).forEach(function(R) {
      yr(g, R, v[R]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(g, Object.getOwnPropertyDescriptors(v)) : LR(Object(v)).forEach(function(R) {
      Object.defineProperty(g, R, Object.getOwnPropertyDescriptor(v, R));
    });
  }
  return g;
}
const GR = {
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
function NR(g) {
  return g ? g[0].toUpperCase() + g.slice(1) : "";
}
const ik = ["enter", "leave"];
function lk(g = !1, d) {
  return g && !ik.includes(d);
}
function ok(g, d = "", v = !1) {
  const R = GR[g], M = R && R[d] || d;
  return "on" + NR(g) + NR(M) + (lk(v, M) ? "Capture" : "");
}
const uk = ["gotpointercapture", "lostpointercapture"];
function sk(g) {
  let d = g.substring(2).toLowerCase();
  const v = !!~d.indexOf("passive");
  v && (d = d.replace("passive", ""));
  const R = uk.includes(d) ? "capturecapture" : "capture", M = !!~d.indexOf(R);
  return M && (d = d.replace("capture", "")), {
    device: d,
    capture: M,
    passive: v
  };
}
function ck(g, d = "") {
  const v = GR[g], R = v && v[d] || d;
  return g + R;
}
function dy(g) {
  return "touches" in g;
}
function QR(g) {
  return dy(g) ? "touch" : "pointerType" in g ? g.pointerType : "mouse";
}
function fk(g) {
  return Array.from(g.touches).filter((d) => {
    var v, R;
    return d.target === g.currentTarget || ((v = g.currentTarget) === null || v === void 0 || (R = v.contains) === null || R === void 0 ? void 0 : R.call(v, d.target));
  });
}
function dk(g) {
  return g.type === "touchend" || g.type === "touchcancel" ? g.changedTouches : g.targetTouches;
}
function XR(g) {
  return dy(g) ? dk(g)[0] : g;
}
function N0(g, d) {
  try {
    const v = d.clientX - g.clientX, R = d.clientY - g.clientY, M = (d.clientX + g.clientX) / 2, I = (d.clientY + g.clientY) / 2, C = Math.hypot(v, R);
    return {
      angle: -(Math.atan2(v, R) * 180) / Math.PI,
      distance: C,
      origin: [M, I]
    };
  } catch {
  }
  return null;
}
function pk(g) {
  return fk(g).map((d) => d.identifier);
}
function AR(g, d) {
  const [v, R] = Array.from(g.touches).filter((M) => d.includes(M.identifier));
  return N0(v, R);
}
function L0(g) {
  const d = XR(g);
  return dy(g) ? d.identifier : d.pointerId;
}
function nd(g) {
  const d = XR(g);
  return [d.clientX, d.clientY];
}
const zR = 40, UR = 800;
function KR(g) {
  let {
    deltaX: d,
    deltaY: v,
    deltaMode: R
  } = g;
  return R === 1 ? (d *= zR, v *= zR) : R === 2 && (d *= UR, v *= UR), [d, v];
}
function vk(g) {
  var d, v;
  const {
    scrollX: R,
    scrollY: M,
    scrollLeft: I,
    scrollTop: C
  } = g.currentTarget;
  return [(d = R ?? I) !== null && d !== void 0 ? d : 0, (v = M ?? C) !== null && v !== void 0 ? v : 0];
}
function hk(g) {
  const d = {};
  if ("buttons" in g && (d.buttons = g.buttons), "shiftKey" in g) {
    const {
      shiftKey: v,
      altKey: R,
      metaKey: M,
      ctrlKey: I
    } = g;
    Object.assign(d, {
      shiftKey: v,
      altKey: R,
      metaKey: M,
      ctrlKey: I
    });
  }
  return d;
}
function fy(g, ...d) {
  return typeof g == "function" ? g(...d) : g;
}
function mk() {
}
function yk(...g) {
  return g.length === 0 ? mk : g.length === 1 ? g[0] : function() {
    let d;
    for (const v of g)
      d = v.apply(this, arguments) || d;
    return d;
  };
}
function jR(g, d) {
  return Object.assign({}, d, g || {});
}
const gk = 32;
class qR {
  constructor(d, v, R) {
    this.ctrl = d, this.args = v, this.key = R, this.state || (this.state = {}, this.computeValues([0, 0]), this.computeInitial(), this.init && this.init(), this.reset());
  }
  get state() {
    return this.ctrl.state[this.key];
  }
  set state(d) {
    this.ctrl.state[this.key] = d;
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
      state: d,
      shared: v,
      ingKey: R,
      args: M
    } = this;
    v[R] = d._active = d.active = d._blocked = d._force = !1, d._step = [!1, !1], d.intentional = !1, d._movement = [0, 0], d._distance = [0, 0], d._direction = [0, 0], d._delta = [0, 0], d._bounds = [[-1 / 0, 1 / 0], [-1 / 0, 1 / 0]], d.args = M, d.axis = void 0, d.memo = void 0, d.elapsedTime = d.timeDelta = 0, d.direction = [0, 0], d.distance = [0, 0], d.overflow = [0, 0], d._movementBound = [!1, !1], d.velocity = [0, 0], d.movement = [0, 0], d.delta = [0, 0], d.timeStamp = 0;
  }
  start(d) {
    const v = this.state, R = this.config;
    v._active || (this.reset(), this.computeInitial(), v._active = !0, v.target = d.target, v.currentTarget = d.currentTarget, v.lastOffset = R.from ? fy(R.from, v) : v.offset, v.offset = v.lastOffset, v.startTime = v.timeStamp = d.timeStamp);
  }
  computeValues(d) {
    const v = this.state;
    v._values = d, v.values = this.config.transform(d);
  }
  computeInitial() {
    const d = this.state;
    d._initial = d._values, d.initial = d.values;
  }
  compute(d) {
    const {
      state: v,
      config: R,
      shared: M
    } = this;
    v.args = this.args;
    let I = 0;
    if (d && (v.event = d, R.preventDefault && d.cancelable && v.event.preventDefault(), v.type = d.type, M.touches = this.ctrl.pointerIds.size || this.ctrl.touchIds.size, M.locked = !!document.pointerLockElement, Object.assign(M, hk(d)), M.down = M.pressed = M.buttons % 2 === 1 || M.touches > 0, I = d.timeStamp - v.timeStamp, v.timeStamp = d.timeStamp, v.elapsedTime = v.timeStamp - v.startTime), v._active) {
      const Le = v._delta.map(Math.abs);
      Un.addTo(v._distance, Le);
    }
    this.axisIntent && this.axisIntent(d);
    const [C, de] = v._movement, [Q, W] = R.threshold, {
      _step: Z,
      values: J
    } = v;
    if (R.hasCustomTransform ? (Z[0] === !1 && (Z[0] = Math.abs(C) >= Q && J[0]), Z[1] === !1 && (Z[1] = Math.abs(de) >= W && J[1])) : (Z[0] === !1 && (Z[0] = Math.abs(C) >= Q && Math.sign(C) * Q), Z[1] === !1 && (Z[1] = Math.abs(de) >= W && Math.sign(de) * W)), v.intentional = Z[0] !== !1 || Z[1] !== !1, !v.intentional) return;
    const se = [0, 0];
    if (R.hasCustomTransform) {
      const [Le, je] = J;
      se[0] = Z[0] !== !1 ? Le - Z[0] : 0, se[1] = Z[1] !== !1 ? je - Z[1] : 0;
    } else
      se[0] = Z[0] !== !1 ? C - Z[0] : 0, se[1] = Z[1] !== !1 ? de - Z[1] : 0;
    this.restrictToAxis && !v._blocked && this.restrictToAxis(se);
    const oe = v.offset, Ue = v._active && !v._blocked || v.active;
    Ue && (v.first = v._active && !v.active, v.last = !v._active && v.active, v.active = M[this.ingKey] = v._active, d && (v.first && ("bounds" in R && (v._bounds = fy(R.bounds, v)), this.setup && this.setup()), v.movement = se, this.computeOffset()));
    const [ct, Ke] = v.offset, [[jt, tt], [Ze, Je]] = v._bounds;
    v.overflow = [ct < jt ? -1 : ct > tt ? 1 : 0, Ke < Ze ? -1 : Ke > Je ? 1 : 0], v._movementBound[0] = v.overflow[0] ? v._movementBound[0] === !1 ? v._movement[0] : v._movementBound[0] : !1, v._movementBound[1] = v.overflow[1] ? v._movementBound[1] === !1 ? v._movement[1] : v._movementBound[1] : !1;
    const _e = v._active ? R.rubberband || [0, 0] : [0, 0];
    if (v.offset = nk(v._bounds, v.offset, _e), v.delta = Un.sub(v.offset, oe), this.computeMovement(), Ue && (!v.last || I > gk)) {
      v.delta = Un.sub(v.offset, oe);
      const Le = v.delta.map(Math.abs);
      Un.addTo(v.distance, Le), v.direction = v.delta.map(Math.sign), v._direction = v._delta.map(Math.sign), !v.first && I > 0 && (v.velocity = [Le[0] / I, Le[1] / I], v.timeDelta = I);
    }
  }
  emit() {
    const d = this.state, v = this.shared, R = this.config;
    if (d._active || this.clean(), (d._blocked || !d.intentional) && !d._force && !R.triggerAllEvents) return;
    const M = this.handler(Gn(Gn(Gn({}, v), d), {}, {
      [this.aliasKey]: d.values
    }));
    M !== void 0 && (d.memo = M);
  }
  clean() {
    this.eventStore.clean(), this.timeoutStore.clean();
  }
}
function Sk([g, d], v) {
  const R = Math.abs(g), M = Math.abs(d);
  if (R > M && R > v)
    return "x";
  if (M > R && M > v)
    return "y";
}
class dv extends qR {
  constructor(...d) {
    super(...d), yr(this, "aliasKey", "xy");
  }
  reset() {
    super.reset(), this.state.axis = void 0;
  }
  init() {
    this.state.offset = [0, 0], this.state.lastOffset = [0, 0];
  }
  computeOffset() {
    this.state.offset = Un.add(this.state.lastOffset, this.state.movement);
  }
  computeMovement() {
    this.state.movement = Un.sub(this.state.offset, this.state.lastOffset);
  }
  axisIntent(d) {
    const v = this.state, R = this.config;
    if (!v.axis && d) {
      const M = typeof R.axisThreshold == "object" ? R.axisThreshold[QR(d)] : R.axisThreshold;
      v.axis = Sk(v._movement, M);
    }
    v._blocked = (R.lockDirection || !!R.axis) && !v.axis || !!R.axis && R.axis !== v.axis;
  }
  restrictToAxis(d) {
    if (this.config.axis || this.config.lockDirection)
      switch (this.state.axis) {
        case "x":
          d[1] = 0;
          break;
        case "y":
          d[0] = 0;
          break;
      }
  }
}
const FR = (g) => g, HR = 0.15, z0 = {
  enabled(g = !0) {
    return g;
  },
  eventOptions(g, d, v) {
    return Gn(Gn({}, v.shared.eventOptions), g);
  },
  preventDefault(g = !1) {
    return g;
  },
  triggerAllEvents(g = !1) {
    return g;
  },
  rubberband(g = 0) {
    switch (g) {
      case !0:
        return [HR, HR];
      case !1:
        return [0, 0];
      default:
        return Un.toVector(g);
    }
  },
  from(g) {
    if (typeof g == "function") return g;
    if (g != null) return Un.toVector(g);
  },
  transform(g, d, v) {
    const R = g || v.shared.transform;
    if (this.hasCustomTransform = !!R, process.env.NODE_ENV === "development") {
      const M = R || FR;
      return (I) => {
        const C = M(I);
        return (!isFinite(C[0]) || !isFinite(C[1])) && console.warn(`[@use-gesture]: config.transform() must produce a valid result, but it was: [${C[0]},${[1]}]`), C;
      };
    }
    return R || FR;
  },
  threshold(g) {
    return Un.toVector(g, 0);
  }
};
process.env.NODE_ENV === "development" && Object.assign(z0, {
  domTarget(g) {
    if (g !== void 0)
      throw Error("[@use-gesture]: `domTarget` option has been renamed to `target`.");
    return NaN;
  },
  lockDirection(g) {
    if (g !== void 0)
      throw Error("[@use-gesture]: `lockDirection` option has been merged with `axis`. Use it as in `{ axis: 'lock' }`");
    return NaN;
  },
  initial(g) {
    if (g !== void 0)
      throw Error("[@use-gesture]: `initial` option has been renamed to `from`.");
    return NaN;
  }
});
const Ek = 0, dc = Gn(Gn({}, z0), {}, {
  axis(g, d, {
    axis: v
  }) {
    if (this.lockDirection = v === "lock", !this.lockDirection) return v;
  },
  axisThreshold(g = Ek) {
    return g;
  },
  bounds(g = {}) {
    if (typeof g == "function")
      return (I) => dc.bounds(g(I));
    if ("current" in g)
      return () => g.current;
    if (typeof HTMLElement == "function" && g instanceof HTMLElement)
      return g;
    const {
      left: d = -1 / 0,
      right: v = 1 / 0,
      top: R = -1 / 0,
      bottom: M = 1 / 0
    } = g;
    return [[d, v], [R, M]];
  }
}), PR = {
  ArrowRight: (g, d = 1) => [g * d, 0],
  ArrowLeft: (g, d = 1) => [-1 * g * d, 0],
  ArrowUp: (g, d = 1) => [0, -1 * g * d],
  ArrowDown: (g, d = 1) => [0, g * d]
};
class Ck extends dv {
  constructor(...d) {
    super(...d), yr(this, "ingKey", "dragging");
  }
  reset() {
    super.reset();
    const d = this.state;
    d._pointerId = void 0, d._pointerActive = !1, d._keyboardActive = !1, d._preventScroll = !1, d._delayed = !1, d.swipe = [0, 0], d.tap = !1, d.canceled = !1, d.cancel = this.cancel.bind(this);
  }
  setup() {
    const d = this.state;
    if (d._bounds instanceof HTMLElement) {
      const v = d._bounds.getBoundingClientRect(), R = d.currentTarget.getBoundingClientRect(), M = {
        left: v.left - R.left + d.offset[0],
        right: v.right - R.right + d.offset[0],
        top: v.top - R.top + d.offset[1],
        bottom: v.bottom - R.bottom + d.offset[1]
      };
      d._bounds = dc.bounds(M);
    }
  }
  cancel() {
    const d = this.state;
    d.canceled || (d.canceled = !0, d._active = !1, setTimeout(() => {
      this.compute(), this.emit();
    }, 0));
  }
  setActive() {
    this.state._active = this.state._pointerActive || this.state._keyboardActive;
  }
  clean() {
    this.pointerClean(), this.state._pointerActive = !1, this.state._keyboardActive = !1, super.clean();
  }
  pointerDown(d) {
    const v = this.config, R = this.state;
    if (d.buttons != null && (Array.isArray(v.pointerButtons) ? !v.pointerButtons.includes(d.buttons) : v.pointerButtons !== -1 && v.pointerButtons !== d.buttons)) return;
    const M = this.ctrl.setEventIds(d);
    v.pointerCapture && d.target.setPointerCapture(d.pointerId), !(M && M.size > 1 && R._pointerActive) && (this.start(d), this.setupPointer(d), R._pointerId = L0(d), R._pointerActive = !0, this.computeValues(nd(d)), this.computeInitial(), v.preventScrollAxis && QR(d) !== "mouse" ? (R._active = !1, this.setupScrollPrevention(d)) : v.delay > 0 ? (this.setupDelayTrigger(d), v.triggerAllEvents && (this.compute(d), this.emit())) : this.startPointerDrag(d));
  }
  startPointerDrag(d) {
    const v = this.state;
    v._active = !0, v._preventScroll = !0, v._delayed = !1, this.compute(d), this.emit();
  }
  pointerMove(d) {
    const v = this.state, R = this.config;
    if (!v._pointerActive) return;
    const M = L0(d);
    if (v._pointerId !== void 0 && M !== v._pointerId) return;
    const I = nd(d);
    if (document.pointerLockElement === d.target ? v._delta = [d.movementX, d.movementY] : (v._delta = Un.sub(I, v._values), this.computeValues(I)), Un.addTo(v._movement, v._delta), this.compute(d), v._delayed && v.intentional) {
      this.timeoutStore.remove("dragDelay"), v.active = !1, this.startPointerDrag(d);
      return;
    }
    if (R.preventScrollAxis && !v._preventScroll)
      if (v.axis)
        if (v.axis === R.preventScrollAxis || R.preventScrollAxis === "xy") {
          v._active = !1, this.clean();
          return;
        } else {
          this.timeoutStore.remove("startPointerDrag"), this.startPointerDrag(d);
          return;
        }
      else
        return;
    this.emit();
  }
  pointerUp(d) {
    this.ctrl.setEventIds(d);
    try {
      this.config.pointerCapture && d.target.hasPointerCapture(d.pointerId) && d.target.releasePointerCapture(d.pointerId);
    } catch {
      process.env.NODE_ENV === "development" && console.warn("[@use-gesture]: If you see this message, it's likely that you're using an outdated version of `@react-three/fiber`. \n\nPlease upgrade to the latest version.");
    }
    const v = this.state, R = this.config;
    if (!v._active || !v._pointerActive) return;
    const M = L0(d);
    if (v._pointerId !== void 0 && M !== v._pointerId) return;
    this.state._pointerActive = !1, this.setActive(), this.compute(d);
    const [I, C] = v._distance;
    if (v.tap = I <= R.tapsThreshold && C <= R.tapsThreshold, v.tap && R.filterTaps)
      v._force = !0;
    else {
      const [de, Q] = v._delta, [W, Z] = v._movement, [J, se] = R.swipe.velocity, [oe, Ue] = R.swipe.distance, ct = R.swipe.duration;
      if (v.elapsedTime < ct) {
        const Ke = Math.abs(de / v.timeDelta), jt = Math.abs(Q / v.timeDelta);
        Ke > J && Math.abs(W) > oe && (v.swipe[0] = Math.sign(de)), jt > se && Math.abs(Z) > Ue && (v.swipe[1] = Math.sign(Q));
      }
    }
    this.emit();
  }
  pointerClick(d) {
    !this.state.tap && d.detail > 0 && (d.preventDefault(), d.stopPropagation());
  }
  setupPointer(d) {
    const v = this.config, R = v.device;
    if (process.env.NODE_ENV === "development")
      try {
        if (R === "pointer" && v.preventScrollDelay === void 0) {
          const M = "uv" in d ? d.sourceEvent.currentTarget : d.currentTarget;
          window.getComputedStyle(M).touchAction === "auto" && console.warn("[@use-gesture]: The drag target has its `touch-action` style property set to `auto`. It is recommended to add `touch-action: 'none'` so that the drag gesture behaves correctly on touch-enabled devices. For more information read this: https://use-gesture.netlify.app/docs/extras/#touch-action.\n\nThis message will only show in development mode. It won't appear in production. If this is intended, you can ignore it.", M);
        }
      } catch {
      }
    v.pointerLock && d.currentTarget.requestPointerLock(), v.pointerCapture || (this.eventStore.add(this.sharedConfig.window, R, "change", this.pointerMove.bind(this)), this.eventStore.add(this.sharedConfig.window, R, "end", this.pointerUp.bind(this)), this.eventStore.add(this.sharedConfig.window, R, "cancel", this.pointerUp.bind(this)));
  }
  pointerClean() {
    this.config.pointerLock && document.pointerLockElement === this.state.currentTarget && document.exitPointerLock();
  }
  preventScroll(d) {
    this.state._preventScroll && d.cancelable && d.preventDefault();
  }
  setupScrollPrevention(d) {
    this.state._preventScroll = !1, Tk(d);
    const v = this.eventStore.add(this.sharedConfig.window, "touch", "change", this.preventScroll.bind(this), {
      passive: !1
    });
    this.eventStore.add(this.sharedConfig.window, "touch", "end", v), this.eventStore.add(this.sharedConfig.window, "touch", "cancel", v), this.timeoutStore.add("startPointerDrag", this.startPointerDrag.bind(this), this.config.preventScrollDelay, d);
  }
  setupDelayTrigger(d) {
    this.state._delayed = !0, this.timeoutStore.add("dragDelay", () => {
      this.state._step = [0, 0], this.startPointerDrag(d);
    }, this.config.delay);
  }
  keyDown(d) {
    const v = PR[d.key];
    if (v) {
      const R = this.state, M = d.shiftKey ? 10 : d.altKey ? 0.1 : 1;
      this.start(d), R._delta = v(this.config.keyboardDisplacement, M), R._keyboardActive = !0, Un.addTo(R._movement, R._delta), this.compute(d), this.emit();
    }
  }
  keyUp(d) {
    d.key in PR && (this.state._keyboardActive = !1, this.setActive(), this.compute(d), this.emit());
  }
  bind(d) {
    const v = this.config.device;
    d(v, "start", this.pointerDown.bind(this)), this.config.pointerCapture && (d(v, "change", this.pointerMove.bind(this)), d(v, "end", this.pointerUp.bind(this)), d(v, "cancel", this.pointerUp.bind(this)), d("lostPointerCapture", "", this.pointerUp.bind(this))), this.config.keys && (d("key", "down", this.keyDown.bind(this)), d("key", "up", this.keyUp.bind(this))), this.config.filterTaps && d("click", "", this.pointerClick.bind(this), {
      capture: !0,
      passive: !1
    });
  }
}
function Tk(g) {
  "persist" in g && typeof g.persist == "function" && g.persist();
}
const pv = typeof window < "u" && window.document && window.document.createElement;
function ZR() {
  return pv && "ontouchstart" in window;
}
function Rk() {
  return ZR() || pv && window.navigator.maxTouchPoints > 1;
}
function wk() {
  return pv && "onpointerdown" in window;
}
function bk() {
  return pv && "exitPointerLock" in window.document;
}
function _k() {
  try {
    return "constructor" in GestureEvent;
  } catch {
    return !1;
  }
}
const Wi = {
  isBrowser: pv,
  gesture: _k(),
  touch: ZR(),
  touchscreen: Rk(),
  pointer: wk(),
  pointerLock: bk()
}, xk = 250, Dk = 180, kk = 0.5, Ok = 50, Mk = 250, Lk = 10, VR = {
  mouse: 0,
  touch: 0,
  pen: 8
}, JR = Gn(Gn({}, dc), {}, {
  device(g, d, {
    pointer: {
      touch: v = !1,
      lock: R = !1,
      mouse: M = !1
    } = {}
  }) {
    return this.pointerLock = R && Wi.pointerLock, Wi.touch && v ? "touch" : this.pointerLock ? "mouse" : Wi.pointer && !M ? "pointer" : Wi.touch ? "touch" : "mouse";
  },
  preventScrollAxis(g, d, {
    preventScroll: v
  }) {
    if (this.preventScrollDelay = typeof v == "number" ? v : v || v === void 0 && g ? xk : void 0, !(!Wi.touchscreen || v === !1))
      return g || (v !== void 0 ? "y" : void 0);
  },
  pointerCapture(g, d, {
    pointer: {
      capture: v = !0,
      buttons: R = 1,
      keys: M = !0
    } = {}
  }) {
    return this.pointerButtons = R, this.keys = M, !this.pointerLock && this.device === "pointer" && v;
  },
  threshold(g, d, {
    filterTaps: v = !1,
    tapsThreshold: R = 3,
    axis: M = void 0
  }) {
    const I = Un.toVector(g, v ? R : M ? 1 : 0);
    return this.filterTaps = v, this.tapsThreshold = R, I;
  },
  swipe({
    velocity: g = kk,
    distance: d = Ok,
    duration: v = Mk
  } = {}) {
    return {
      velocity: this.transform(Un.toVector(g)),
      distance: this.transform(Un.toVector(d)),
      duration: v
    };
  },
  delay(g = 0) {
    switch (g) {
      case !0:
        return Dk;
      case !1:
        return 0;
      default:
        return g;
    }
  },
  axisThreshold(g) {
    return g ? Gn(Gn({}, VR), g) : VR;
  },
  keyboardDisplacement(g = Lk) {
    return g;
  }
});
process.env.NODE_ENV === "development" && Object.assign(JR, {
  useTouch(g) {
    if (g !== void 0)
      throw Error("[@use-gesture]: `useTouch` option has been renamed to `pointer.touch`. Use it as in `{ pointer: { touch: true } }`.");
    return NaN;
  },
  experimental_preventWindowScrollY(g) {
    if (g !== void 0)
      throw Error("[@use-gesture]: `experimental_preventWindowScrollY` option has been renamed to `preventScroll`.");
    return NaN;
  },
  swipeVelocity(g) {
    if (g !== void 0)
      throw Error("[@use-gesture]: `swipeVelocity` option has been renamed to `swipe.velocity`. Use it as in `{ swipe: { velocity: 0.5 } }`.");
    return NaN;
  },
  swipeDistance(g) {
    if (g !== void 0)
      throw Error("[@use-gesture]: `swipeDistance` option has been renamed to `swipe.distance`. Use it as in `{ swipe: { distance: 50 } }`.");
    return NaN;
  },
  swipeDuration(g) {
    if (g !== void 0)
      throw Error("[@use-gesture]: `swipeDuration` option has been renamed to `swipe.duration`. Use it as in `{ swipe: { duration: 250 } }`.");
    return NaN;
  }
});
function ew(g) {
  const [d, v] = g.overflow, [R, M] = g._delta, [I, C] = g._direction;
  (d < 0 && R > 0 && I < 0 || d > 0 && R < 0 && I > 0) && (g._movement[0] = g._movementBound[0]), (v < 0 && M > 0 && C < 0 || v > 0 && M < 0 && C > 0) && (g._movement[1] = g._movementBound[1]);
}
const Nk = 30, Ak = 100;
class zk extends qR {
  constructor(...d) {
    super(...d), yr(this, "ingKey", "pinching"), yr(this, "aliasKey", "da");
  }
  init() {
    this.state.offset = [1, 0], this.state.lastOffset = [1, 0], this.state._pointerEvents = /* @__PURE__ */ new Map();
  }
  reset() {
    super.reset();
    const d = this.state;
    d._touchIds = [], d.canceled = !1, d.cancel = this.cancel.bind(this), d.turns = 0;
  }
  computeOffset() {
    const {
      type: d,
      movement: v,
      lastOffset: R
    } = this.state;
    d === "wheel" ? this.state.offset = Un.add(v, R) : this.state.offset = [(1 + v[0]) * R[0], v[1] + R[1]];
  }
  computeMovement() {
    const {
      offset: d,
      lastOffset: v
    } = this.state;
    this.state.movement = [d[0] / v[0], d[1] - v[1]];
  }
  axisIntent() {
    const d = this.state, [v, R] = d._movement;
    if (!d.axis) {
      const M = Math.abs(v) * Nk - Math.abs(R);
      M < 0 ? d.axis = "angle" : M > 0 && (d.axis = "scale");
    }
  }
  restrictToAxis(d) {
    this.config.lockDirection && (this.state.axis === "scale" ? d[1] = 0 : this.state.axis === "angle" && (d[0] = 0));
  }
  cancel() {
    const d = this.state;
    d.canceled || setTimeout(() => {
      d.canceled = !0, d._active = !1, this.compute(), this.emit();
    }, 0);
  }
  touchStart(d) {
    this.ctrl.setEventIds(d);
    const v = this.state, R = this.ctrl.touchIds;
    if (v._active && v._touchIds.every((I) => R.has(I)) || R.size < 2) return;
    this.start(d), v._touchIds = Array.from(R).slice(0, 2);
    const M = AR(d, v._touchIds);
    M && this.pinchStart(d, M);
  }
  pointerStart(d) {
    if (d.buttons != null && d.buttons % 2 !== 1) return;
    this.ctrl.setEventIds(d), d.target.setPointerCapture(d.pointerId);
    const v = this.state, R = v._pointerEvents, M = this.ctrl.pointerIds;
    if (v._active && Array.from(R.keys()).every((C) => M.has(C)) || (R.size < 2 && R.set(d.pointerId, d), v._pointerEvents.size < 2)) return;
    this.start(d);
    const I = N0(...Array.from(R.values()));
    I && this.pinchStart(d, I);
  }
  pinchStart(d, v) {
    const R = this.state;
    R.origin = v.origin, this.computeValues([v.distance, v.angle]), this.computeInitial(), this.compute(d), this.emit();
  }
  touchMove(d) {
    if (!this.state._active) return;
    const v = AR(d, this.state._touchIds);
    v && this.pinchMove(d, v);
  }
  pointerMove(d) {
    const v = this.state._pointerEvents;
    if (v.has(d.pointerId) && v.set(d.pointerId, d), !this.state._active) return;
    const R = N0(...Array.from(v.values()));
    R && this.pinchMove(d, R);
  }
  pinchMove(d, v) {
    const R = this.state, M = R._values[1], I = v.angle - M;
    let C = 0;
    Math.abs(I) > 270 && (C += Math.sign(I)), this.computeValues([v.distance, v.angle - 360 * C]), R.origin = v.origin, R.turns = C, R._movement = [R._values[0] / R._initial[0] - 1, R._values[1] - R._initial[1]], this.compute(d), this.emit();
  }
  touchEnd(d) {
    this.ctrl.setEventIds(d), this.state._active && this.state._touchIds.some((v) => !this.ctrl.touchIds.has(v)) && (this.state._active = !1, this.compute(d), this.emit());
  }
  pointerEnd(d) {
    const v = this.state;
    this.ctrl.setEventIds(d);
    try {
      d.target.releasePointerCapture(d.pointerId);
    } catch {
    }
    v._pointerEvents.has(d.pointerId) && v._pointerEvents.delete(d.pointerId), v._active && v._pointerEvents.size < 2 && (v._active = !1, this.compute(d), this.emit());
  }
  gestureStart(d) {
    d.cancelable && d.preventDefault();
    const v = this.state;
    v._active || (this.start(d), this.computeValues([d.scale, d.rotation]), v.origin = [d.clientX, d.clientY], this.compute(d), this.emit());
  }
  gestureMove(d) {
    if (d.cancelable && d.preventDefault(), !this.state._active) return;
    const v = this.state;
    this.computeValues([d.scale, d.rotation]), v.origin = [d.clientX, d.clientY];
    const R = v._movement;
    v._movement = [d.scale - 1, d.rotation], v._delta = Un.sub(v._movement, R), this.compute(d), this.emit();
  }
  gestureEnd(d) {
    this.state._active && (this.state._active = !1, this.compute(d), this.emit());
  }
  wheel(d) {
    const v = this.config.modifierKey;
    v && (Array.isArray(v) ? !v.find((R) => d[R]) : !d[v]) || (this.state._active ? this.wheelChange(d) : this.wheelStart(d), this.timeoutStore.add("wheelEnd", this.wheelEnd.bind(this)));
  }
  wheelStart(d) {
    this.start(d), this.wheelChange(d);
  }
  wheelChange(d) {
    "uv" in d || (d.cancelable && d.preventDefault(), process.env.NODE_ENV === "development" && !d.defaultPrevented && console.warn("[@use-gesture]: To properly support zoom on trackpads, try using the `target` option.\n\nThis message will only appear in development mode."));
    const R = this.state;
    R._delta = [-KR(d)[1] / Ak * R.offset[0], 0], Un.addTo(R._movement, R._delta), ew(R), this.state.origin = [d.clientX, d.clientY], this.compute(d), this.emit();
  }
  wheelEnd() {
    this.state._active && (this.state._active = !1, this.compute(), this.emit());
  }
  bind(d) {
    const v = this.config.device;
    v && (d(v, "start", this[v + "Start"].bind(this)), d(v, "change", this[v + "Move"].bind(this)), d(v, "end", this[v + "End"].bind(this)), d(v, "cancel", this[v + "End"].bind(this)), d("lostPointerCapture", "", this[v + "End"].bind(this))), this.config.pinchOnWheel && d("wheel", "", this.wheel.bind(this), {
      passive: !1
    });
  }
}
const Uk = Gn(Gn({}, z0), {}, {
  device(g, d, {
    shared: v,
    pointer: {
      touch: R = !1
    } = {}
  }) {
    if (v.target && !Wi.touch && Wi.gesture) return "gesture";
    if (Wi.touch && R) return "touch";
    if (Wi.touchscreen) {
      if (Wi.pointer) return "pointer";
      if (Wi.touch) return "touch";
    }
  },
  bounds(g, d, {
    scaleBounds: v = {},
    angleBounds: R = {}
  }) {
    const M = (C) => {
      const de = jR(fy(v, C), {
        min: -1 / 0,
        max: 1 / 0
      });
      return [de.min, de.max];
    }, I = (C) => {
      const de = jR(fy(R, C), {
        min: -1 / 0,
        max: 1 / 0
      });
      return [de.min, de.max];
    };
    return typeof v != "function" && typeof R != "function" ? [M(), I()] : (C) => [M(C), I(C)];
  },
  threshold(g, d, v) {
    return this.lockDirection = v.axis === "lock", Un.toVector(g, this.lockDirection ? [0.1, 3] : 0);
  },
  modifierKey(g) {
    return g === void 0 ? "ctrlKey" : g;
  },
  pinchOnWheel(g = !0) {
    return g;
  }
});
class jk extends dv {
  constructor(...d) {
    super(...d), yr(this, "ingKey", "moving");
  }
  move(d) {
    this.config.mouseOnly && d.pointerType !== "mouse" || (this.state._active ? this.moveChange(d) : this.moveStart(d), this.timeoutStore.add("moveEnd", this.moveEnd.bind(this)));
  }
  moveStart(d) {
    this.start(d), this.computeValues(nd(d)), this.compute(d), this.computeInitial(), this.emit();
  }
  moveChange(d) {
    if (!this.state._active) return;
    const v = nd(d), R = this.state;
    R._delta = Un.sub(v, R._values), Un.addTo(R._movement, R._delta), this.computeValues(v), this.compute(d), this.emit();
  }
  moveEnd(d) {
    this.state._active && (this.state._active = !1, this.compute(d), this.emit());
  }
  bind(d) {
    d("pointer", "change", this.move.bind(this)), d("pointer", "leave", this.moveEnd.bind(this));
  }
}
const Fk = Gn(Gn({}, dc), {}, {
  mouseOnly: (g = !0) => g
});
class Hk extends dv {
  constructor(...d) {
    super(...d), yr(this, "ingKey", "scrolling");
  }
  scroll(d) {
    this.state._active || this.start(d), this.scrollChange(d), this.timeoutStore.add("scrollEnd", this.scrollEnd.bind(this));
  }
  scrollChange(d) {
    d.cancelable && d.preventDefault();
    const v = this.state, R = vk(d);
    v._delta = Un.sub(R, v._values), Un.addTo(v._movement, v._delta), this.computeValues(R), this.compute(d), this.emit();
  }
  scrollEnd() {
    this.state._active && (this.state._active = !1, this.compute(), this.emit());
  }
  bind(d) {
    d("scroll", "", this.scroll.bind(this));
  }
}
const Pk = dc;
class Vk extends dv {
  constructor(...d) {
    super(...d), yr(this, "ingKey", "wheeling");
  }
  wheel(d) {
    this.state._active || this.start(d), this.wheelChange(d), this.timeoutStore.add("wheelEnd", this.wheelEnd.bind(this));
  }
  wheelChange(d) {
    const v = this.state;
    v._delta = KR(d), Un.addTo(v._movement, v._delta), ew(v), this.compute(d), this.emit();
  }
  wheelEnd() {
    this.state._active && (this.state._active = !1, this.compute(), this.emit());
  }
  bind(d) {
    d("wheel", "", this.wheel.bind(this));
  }
}
const Bk = dc;
class $k extends dv {
  constructor(...d) {
    super(...d), yr(this, "ingKey", "hovering");
  }
  enter(d) {
    this.config.mouseOnly && d.pointerType !== "mouse" || (this.start(d), this.computeValues(nd(d)), this.compute(d), this.emit());
  }
  leave(d) {
    if (this.config.mouseOnly && d.pointerType !== "mouse") return;
    const v = this.state;
    if (!v._active) return;
    v._active = !1;
    const R = nd(d);
    v._movement = v._delta = Un.sub(R, v._values), this.computeValues(R), this.compute(d), v.delta = v.movement, this.emit();
  }
  bind(d) {
    d("pointer", "enter", this.enter.bind(this)), d("pointer", "leave", this.leave.bind(this));
  }
}
const Ik = Gn(Gn({}, dc), {}, {
  mouseOnly: (g = !0) => g
}), U0 = /* @__PURE__ */ new Map(), A0 = /* @__PURE__ */ new Map();
function Yk(g) {
  U0.set(g.key, g.engine), A0.set(g.key, g.resolver);
}
const Wk = {
  key: "drag",
  engine: Ck,
  resolver: JR
}, Gk = {
  key: "hover",
  engine: $k,
  resolver: Ik
}, Qk = {
  key: "move",
  engine: jk,
  resolver: Fk
}, Xk = {
  key: "pinch",
  engine: zk,
  resolver: Uk
}, Kk = {
  key: "scroll",
  engine: Hk,
  resolver: Pk
}, qk = {
  key: "wheel",
  engine: Vk,
  resolver: Bk
};
function Zk(g, d) {
  if (g == null) return {};
  var v = {}, R = Object.keys(g), M, I;
  for (I = 0; I < R.length; I++)
    M = R[I], !(d.indexOf(M) >= 0) && (v[M] = g[M]);
  return v;
}
function Jk(g, d) {
  if (g == null) return {};
  var v = Zk(g, d), R, M;
  if (Object.getOwnPropertySymbols) {
    var I = Object.getOwnPropertySymbols(g);
    for (M = 0; M < I.length; M++)
      R = I[M], !(d.indexOf(R) >= 0) && Object.prototype.propertyIsEnumerable.call(g, R) && (v[R] = g[R]);
  }
  return v;
}
const eO = {
  target(g) {
    if (g)
      return () => "current" in g ? g.current : g;
  },
  enabled(g = !0) {
    return g;
  },
  window(g = Wi.isBrowser ? window : void 0) {
    return g;
  },
  eventOptions({
    passive: g = !0,
    capture: d = !1
  } = {}) {
    return {
      passive: g,
      capture: d
    };
  },
  transform(g) {
    return g;
  }
}, tO = ["target", "eventOptions", "window", "enabled", "transform"];
function cy(g = {}, d) {
  const v = {};
  for (const [R, M] of Object.entries(d))
    switch (typeof M) {
      case "function":
        if (process.env.NODE_ENV === "development") {
          const I = M.call(v, g[R], R, g);
          Number.isNaN(I) || (v[R] = I);
        } else
          v[R] = M.call(v, g[R], R, g);
        break;
      case "object":
        v[R] = cy(g[R], M);
        break;
      case "boolean":
        M && (v[R] = g[R]);
        break;
    }
  return v;
}
function nO(g, d, v = {}) {
  const R = g, {
    target: M,
    eventOptions: I,
    window: C,
    enabled: de,
    transform: Q
  } = R, W = Jk(R, tO);
  if (v.shared = cy({
    target: M,
    eventOptions: I,
    window: C,
    enabled: de,
    transform: Q
  }, eO), d) {
    const Z = A0.get(d);
    v[d] = cy(Gn({
      shared: v.shared
    }, W), Z);
  } else
    for (const Z in W) {
      const J = A0.get(Z);
      if (J)
        v[Z] = cy(Gn({
          shared: v.shared
        }, W[Z]), J);
      else if (process.env.NODE_ENV === "development" && !["drag", "pinch", "scroll", "wheel", "move", "hover"].includes(Z)) {
        if (Z === "domTarget")
          throw Error("[@use-gesture]: `domTarget` option has been renamed to `target`.");
        console.warn(`[@use-gesture]: Unknown config key \`${Z}\` was used. Please read the documentation for further information.`);
      }
    }
  return v;
}
class tw {
  constructor(d, v) {
    yr(this, "_listeners", /* @__PURE__ */ new Set()), this._ctrl = d, this._gestureKey = v;
  }
  add(d, v, R, M, I) {
    const C = this._listeners, de = ck(v, R), Q = this._gestureKey ? this._ctrl.config[this._gestureKey].eventOptions : {}, W = Gn(Gn({}, Q), I);
    d.addEventListener(de, M, W);
    const Z = () => {
      d.removeEventListener(de, M, W), C.delete(Z);
    };
    return C.add(Z), Z;
  }
  clean() {
    this._listeners.forEach((d) => d()), this._listeners.clear();
  }
}
class rO {
  constructor() {
    yr(this, "_timeouts", /* @__PURE__ */ new Map());
  }
  add(d, v, R = 140, ...M) {
    this.remove(d), this._timeouts.set(d, window.setTimeout(v, R, ...M));
  }
  remove(d) {
    const v = this._timeouts.get(d);
    v && window.clearTimeout(v);
  }
  clean() {
    this._timeouts.forEach((d) => void window.clearTimeout(d)), this._timeouts.clear();
  }
}
class aO {
  constructor(d) {
    yr(this, "gestures", /* @__PURE__ */ new Set()), yr(this, "_targetEventStore", new tw(this)), yr(this, "gestureEventStores", {}), yr(this, "gestureTimeoutStores", {}), yr(this, "handlers", {}), yr(this, "config", {}), yr(this, "pointerIds", /* @__PURE__ */ new Set()), yr(this, "touchIds", /* @__PURE__ */ new Set()), yr(this, "state", {
      shared: {
        shiftKey: !1,
        metaKey: !1,
        ctrlKey: !1,
        altKey: !1
      }
    }), iO(this, d);
  }
  setEventIds(d) {
    if (dy(d))
      return this.touchIds = new Set(pk(d)), this.touchIds;
    if ("pointerId" in d)
      return d.type === "pointerup" || d.type === "pointercancel" ? this.pointerIds.delete(d.pointerId) : d.type === "pointerdown" && this.pointerIds.add(d.pointerId), this.pointerIds;
  }
  applyHandlers(d, v) {
    this.handlers = d, this.nativeHandlers = v;
  }
  applyConfig(d, v) {
    this.config = nO(d, v, this.config);
  }
  clean() {
    this._targetEventStore.clean();
    for (const d of this.gestures)
      this.gestureEventStores[d].clean(), this.gestureTimeoutStores[d].clean();
  }
  effect() {
    return this.config.shared.target && this.bind(), () => this._targetEventStore.clean();
  }
  bind(...d) {
    const v = this.config.shared, R = {};
    let M;
    if (!(v.target && (M = v.target(), !M))) {
      if (v.enabled) {
        for (const C of this.gestures) {
          const de = this.config[C], Q = BR(R, de.eventOptions, !!M);
          if (de.enabled) {
            const W = U0.get(C);
            new W(this, d, C).bind(Q);
          }
        }
        const I = BR(R, v.eventOptions, !!M);
        for (const C in this.nativeHandlers)
          I(C, "", (de) => this.nativeHandlers[C](Gn(Gn({}, this.state.shared), {}, {
            event: de,
            args: d
          })), void 0, !0);
      }
      for (const I in R)
        R[I] = yk(...R[I]);
      if (!M) return R;
      for (const I in R) {
        const {
          device: C,
          capture: de,
          passive: Q
        } = sk(I);
        this._targetEventStore.add(M, C, "", R[I], {
          capture: de,
          passive: Q
        });
      }
    }
  }
}
function ed(g, d) {
  g.gestures.add(d), g.gestureEventStores[d] = new tw(g, d), g.gestureTimeoutStores[d] = new rO();
}
function iO(g, d) {
  d.drag && ed(g, "drag"), d.wheel && ed(g, "wheel"), d.scroll && ed(g, "scroll"), d.move && ed(g, "move"), d.pinch && ed(g, "pinch"), d.hover && ed(g, "hover");
}
const BR = (g, d, v) => (R, M, I, C = {}, de = !1) => {
  var Q, W;
  const Z = (Q = C.capture) !== null && Q !== void 0 ? Q : d.capture, J = (W = C.passive) !== null && W !== void 0 ? W : d.passive;
  let se = de ? R : ok(R, M, Z);
  v && J && (se += "Passive"), g[se] = g[se] || [], g[se].push(I);
}, lO = /^on(Drag|Wheel|Scroll|Move|Pinch|Hover)/;
function oO(g) {
  const d = {}, v = {}, R = /* @__PURE__ */ new Set();
  for (let M in g)
    lO.test(M) ? (R.add(RegExp.lastMatch), v[M] = g[M]) : d[M] = g[M];
  return [v, d, R];
}
function td(g, d, v, R, M, I) {
  if (!g.has(v)) return;
  if (!U0.has(R)) {
    process.env.NODE_ENV === "development" && console.warn(`[@use-gesture]: You've created a custom handler that that uses the \`${R}\` gesture but isn't properly configured.

Please add \`${R}Action\` when creating your handler.`);
    return;
  }
  const C = v + "Start", de = v + "End", Q = (W) => {
    let Z;
    return W.first && C in d && d[C](W), v in d && (Z = d[v](W)), W.last && de in d && d[de](W), Z;
  };
  M[R] = Q, I[R] = I[R] || {};
}
function uO(g, d) {
  const [v, R, M] = oO(g), I = {};
  return td(M, v, "onDrag", "drag", I, d), td(M, v, "onWheel", "wheel", I, d), td(M, v, "onScroll", "scroll", I, d), td(M, v, "onPinch", "pinch", I, d), td(M, v, "onMove", "move", I, d), td(M, v, "onHover", "hover", I, d), {
    handlers: I,
    config: d,
    nativeHandlers: R
  };
}
function sO(g, d = {}, v, R) {
  const M = k0.useMemo(() => new aO(g), []);
  if (M.applyHandlers(g, R), M.applyConfig(d, v), k0.useEffect(M.effect.bind(M)), k0.useEffect(() => M.clean.bind(M), []), d.target === void 0)
    return M.bind.bind(M);
}
function cO(g) {
  return g.forEach(Yk), function(v, R) {
    const {
      handlers: M,
      nativeHandlers: I,
      config: C
    } = uO(v, R || {});
    return sO(M, C, void 0, I);
  };
}
function fO(g, d) {
  return cO([Wk, Xk, Kk, qk, Qk, Gk])(g, d || {});
}
const dO = [
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
], sy = {
  maxVerticalRotationDeg: 5,
  dragSensitivity: 20,
  enlargeTransitionMs: 300,
  segments: 35
}, fc = (g, d, v) => Math.min(Math.max(g, d), v), $R = (g) => (g % 360 + 360) % 360, IR = (g) => ((g + 180) % 360 + 360) % 360 - 180, Xu = (g, d, v) => {
  const R = g.dataset[d] ?? g.getAttribute(`data-${d}`), M = R == null ? NaN : parseFloat(R);
  return Number.isFinite(M) ? M : v;
};
function pO(g, d) {
  const v = Array.from({ length: d }, (W, Z) => -37 + Z * 2), R = [-4, -2, 0, 2, 4], M = [-3, -1, 1, 3, 5], I = v.flatMap((W, Z) => (Z % 2 === 0 ? R : M).map((se) => ({ x: W, y: se, sizeX: 2, sizeY: 2 }))), C = I.length;
  if (g.length === 0)
    return I.map((W) => ({ ...W, src: "", alt: "" }));
  g.length > C && console.warn(
    `[DomeGallery] Provided image count (${g.length}) exceeds available tiles (${C}). Some images will not be shown.`
  );
  const de = g.map((W) => typeof W == "string" ? { src: W, alt: "" } : { src: W.src || "", alt: W.alt || "" }), Q = Array.from({ length: C }, (W, Z) => de[Z % de.length]);
  for (let W = 1; W < Q.length; W++)
    if (Q[W].src === Q[W - 1].src) {
      for (let Z = W + 1; Z < Q.length; Z++)
        if (Q[Z].src !== Q[W].src) {
          const J = Q[W];
          Q[W] = Q[Z], Q[Z] = J;
          break;
        }
    }
  return I.map((W, Z) => ({
    ...W,
    src: Q[Z].src,
    alt: Q[Z].alt
  }));
}
function YR(g, d, v, R, M) {
  const I = 360 / M / 2, C = I * (g + (v - 1) / 2);
  return { rotateX: I * (d - (R - 1) / 2), rotateY: C };
}
const vO = qt.forwardRef(function({
  images: d = dO,
  fit: v = 0.5,
  fitBasis: R = "auto",
  minRadius: M = 600,
  maxRadius: I = 1 / 0,
  padFactor: C = 0.25,
  overlayBlurColor: de = "#120F17",
  maxVerticalRotationDeg: Q = sy.maxVerticalRotationDeg,
  dragSensitivity: W = sy.dragSensitivity,
  enlargeTransitionMs: Z = sy.enlargeTransitionMs,
  segments: J = sy.segments,
  dragDampening: se = 2,
  openedImageWidth: oe = "400px",
  openedImageHeight: Ue = "400px",
  imageBorderRadius: ct = "30px",
  openedImageBorderRadius: Ke = "30px",
  grayscale: jt = !0,
  onImageClick: tt
}, Ze) {
  const Je = qt.useRef(null), _e = qt.useRef(null), Le = qt.useRef(null), je = qt.useRef(null), sn = qt.useRef(null), Gt = qt.useRef(null), Pt = qt.useRef(null), dn = qt.useRef(null), nt = qt.useRef({ x: 0, y: 0 }), Ae = qt.useRef({ x: 0, y: 0 }), _t = qt.useRef(null), xt = qt.useRef(!1), At = qt.useRef(!1), Ee = qt.useRef(!1), ie = qt.useRef(null), be = qt.useRef("mouse"), ue = qt.useRef(null), L = qt.useRef(!1), Y = qt.useRef(0), Ie = qt.useRef(0), Fe = qt.useRef(!1), gt = qt.useCallback(() => {
    Fe.current || (Fe.current = !0, document.body.classList.add("dg-scroll-lock"));
  }, []), pt = qt.useCallback(() => {
    var Ce;
    Fe.current && ((Ce = Je.current) == null ? void 0 : Ce.getAttribute("data-enlarging")) !== "true" && (Fe.current = !1, document.body.classList.remove("dg-scroll-lock"));
  }, []), vt = qt.useMemo(() => pO(d, J), [d, J]), rt = (Ce, Ve) => {
    const Qe = Le.current;
    Qe && (Qe.style.transform = `translateZ(calc(var(--radius) * -1)) rotateX(${Ce}deg) rotateY(${Ve}deg)`);
  };
  qt.useImperativeHandle(
    Ze,
    () => ({
      focusOn: (Ce) => {
        var Xt;
        const Ve = (Xt = Le.current) == null ? void 0 : Xt.querySelectorAll("[data-src]");
        if (!Ve) return;
        let Qe = null;
        for (const it of Array.from(Ve))
          if (it.dataset.src === Ce) {
            Qe = it;
            break;
          }
        if (!Qe) return;
        const ft = Xu(Qe, "offsetX", 0), Lt = Xu(Qe, "offsetY", 0), zt = Xu(Qe, "sizeX", 2), Ct = Xu(Qe, "sizeY", 2), Rt = YR(ft, Lt, zt, Ct, J), Nt = fc(-Rt.rotateX, -Q, Q), wt = IR(-Rt.rotateY);
        nt.current = { x: Nt, y: wt }, Le.current && (Le.current.style.transition = "transform 600ms ease"), rt(Nt, wt), window.setTimeout(() => {
          Le.current && (Le.current.style.transition = "");
        }, 650);
      },
      resetRotation: () => {
        nt.current = { x: 0, y: 0 }, Le.current && (Le.current.style.transition = "transform 600ms ease"), rt(0, 0), window.setTimeout(() => {
          Le.current && (Le.current.style.transition = "");
        }, 650);
      }
    }),
    [J, Q]
  );
  const St = qt.useRef(null);
  qt.useEffect(() => {
    const Ce = Je.current;
    if (!Ce) return;
    const Ve = new ResizeObserver((Qe) => {
      var Ft;
      const ft = Qe[0].contentRect, Lt = Math.max(1, ft.width), zt = Math.max(1, ft.height), Ct = Math.min(Lt, zt), Rt = Math.max(Lt, zt), Nt = Lt / zt;
      let wt;
      switch (R) {
        case "min":
          wt = Ct;
          break;
        case "max":
          wt = Rt;
          break;
        case "width":
          wt = Lt;
          break;
        case "height":
          wt = zt;
          break;
        default:
          wt = Nt >= 1.3 ? Lt : Ct;
      }
      let Xt = wt * v;
      const it = zt * 1.35;
      Xt = Math.min(Xt, it), Xt = fc(Xt, M, I), St.current = Math.round(Xt);
      const lt = Math.max(8, Math.round(Ct * C));
      Ce.style.setProperty("--radius", `${St.current}px`), Ce.style.setProperty("--viewer-pad", `${lt}px`), Ce.style.setProperty("--overlay-blur-color", de), Ce.style.setProperty("--tile-radius", ct), Ce.style.setProperty("--enlarge-radius", Ke), Ce.style.setProperty("--image-filter", jt ? "grayscale(1)" : "none"), rt(nt.current.x, nt.current.y);
      const Zt = (Ft = sn.current) == null ? void 0 : Ft.querySelector(".enlarge");
      if (Zt && je.current && _e.current) {
        const Xe = je.current.getBoundingClientRect(), ne = _e.current.getBoundingClientRect();
        if (oe && Ue) {
          const Oe = document.createElement("div");
          Oe.style.cssText = `position: absolute; width: ${oe}; height: ${Ue}; visibility: hidden;`, document.body.appendChild(Oe);
          const ht = Oe.getBoundingClientRect();
          document.body.removeChild(Oe);
          const Jt = Xe.left - ne.left + (Xe.width - ht.width) / 2, en = Xe.top - ne.top + (Xe.height - ht.height) / 2;
          Zt.style.left = `${Jt}px`, Zt.style.top = `${en}px`;
        } else
          Zt.style.left = `${Xe.left - ne.left}px`, Zt.style.top = `${Xe.top - ne.top}px`, Zt.style.width = `${Xe.width}px`, Zt.style.height = `${Xe.height}px`;
      }
    });
    return Ve.observe(Ce), () => Ve.disconnect();
  }, [
    v,
    R,
    M,
    I,
    C,
    de,
    jt,
    ct,
    Ke,
    oe,
    Ue
  ]), qt.useEffect(() => {
    rt(nt.current.x, nt.current.y);
  }, []);
  const Qt = qt.useCallback(() => {
    ie.current && (cancelAnimationFrame(ie.current), ie.current = null);
  }, []), jn = qt.useCallback(
    (Ce, Ve) => {
      let ft = fc(Ce, -1.4, 1.4) * 80, Lt = fc(Ve, -1.4, 1.4) * 80, zt = 0;
      const Ct = fc(se ?? 0.6, 0, 1), Rt = 0.94 + 0.055 * Ct, Nt = 0.015 - 0.01 * Ct, wt = Math.round(90 + 270 * Ct), Xt = () => {
        if (ft *= Rt, Lt *= Rt, Math.abs(ft) < Nt && Math.abs(Lt) < Nt) {
          ie.current = null;
          return;
        }
        if (++zt > wt) {
          ie.current = null;
          return;
        }
        const it = fc(nt.current.x - Lt / 200, -Q, Q), lt = IR(nt.current.y + ft / 200);
        nt.current = { x: it, y: lt }, rt(it, lt), ie.current = requestAnimationFrame(Xt);
      };
      Qt(), ie.current = requestAnimationFrame(Xt);
    },
    [se, Q, Qt]
  );
  fO(
    {
      onDragStart: ({ event: Ce }) => {
        var ft, Lt;
        if (Pt.current) return;
        Qt();
        const Ve = Ce;
        be.current = Ve.pointerType || "mouse", be.current === "touch" && Ve.preventDefault(), be.current === "touch" && gt(), xt.current = !0, At.current = !1, Ee.current = !1, Ae.current = { ...nt.current }, _t.current = { x: Ve.clientX, y: Ve.clientY };
        const Qe = (Lt = (ft = Ve.target).closest) == null ? void 0 : Lt.call(ft, ".item__image");
        ue.current = Qe || null;
      },
      onDrag: ({ event: Ce, last: Ve, velocity: Qe = [0, 0], direction: ft = [0, 0], movement: Lt }) => {
        if (Pt.current || !xt.current || !_t.current) return;
        const zt = Ce;
        be.current === "touch" && zt.preventDefault();
        const Ct = zt.clientX - _t.current.x, Rt = zt.clientY - _t.current.y;
        Ee.current || Ct * Ct + Rt * Rt > 16 && (Ee.current = !0);
        const Nt = fc(
          Ae.current.x - Rt / W,
          -Q,
          Q
        ), wt = Ae.current.y + Ct / W, Xt = nt.current;
        if ((Xt.x !== Nt || Xt.y !== wt) && (nt.current = { x: Nt, y: wt }, rt(Nt, wt)), Ve) {
          xt.current = !1;
          let it = !1;
          if (_t.current) {
            const Oe = zt.clientX - _t.current.x, ht = zt.clientY - _t.current.y, Jt = Oe * Oe + ht * ht, en = be.current === "touch" ? 10 : 6;
            Jt <= en * en && (it = !0);
          }
          let [lt, Zt] = Qe;
          const [Ft, Xe] = ft;
          let ne = lt * Ft, me = Zt * Xe;
          if (!it && Math.abs(ne) < 1e-3 && Math.abs(me) < 1e-3 && Array.isArray(Lt)) {
            const [Oe, ht] = Lt;
            ne = Oe / W * 0.02, me = ht / W * 0.02;
          }
          if (!it && (Math.abs(ne) > 5e-3 || Math.abs(me) > 5e-3) && jn(ne, me), _t.current = null, At.current = !it, it && ue.current && !Pt.current)
            if (tt) {
              const Oe = ue.current.parentElement, ht = (Oe == null ? void 0 : Oe.dataset.src) || "";
              ht && tt(ht);
            } else
              Qn(ue.current);
          ue.current = null, At.current && setTimeout(() => At.current = !1, 120), be.current === "touch" && pt(), Ee.current && (Ie.current = performance.now()), Ee.current = !1;
        }
      }
    },
    { target: _e, eventOptions: { passive: !1 } }
  ), qt.useEffect(() => {
    const Ce = Gt.current;
    if (!Ce) return;
    const Ve = () => {
      var Xe, ne;
      if (performance.now() - Y.current < 250) return;
      const ft = Pt.current;
      if (!ft) return;
      const Lt = ft.parentElement, zt = (Xe = sn.current) == null ? void 0 : Xe.querySelector(".enlarge");
      if (!zt) return;
      const Ct = Lt.querySelector(".item__image--reference"), Rt = dn.current;
      if (!Rt) {
        zt.remove(), Ct && Ct.remove(), Lt.style.setProperty("--rot-y-delta", "0deg"), Lt.style.setProperty("--rot-x-delta", "0deg"), ft.style.visibility = "", ft.style.zIndex = 0, Pt.current = null, (ne = Je.current) == null || ne.removeAttribute("data-enlarging"), L.current = !1;
        return;
      }
      const Nt = zt.getBoundingClientRect(), wt = Je.current.getBoundingClientRect(), Xt = {
        left: Rt.left - wt.left,
        top: Rt.top - wt.top,
        width: Rt.width,
        height: Rt.height
      }, it = {
        left: Nt.left - wt.left,
        top: Nt.top - wt.top,
        width: Nt.width,
        height: Nt.height
      }, lt = document.createElement("div");
      lt.className = "enlarge-closing", lt.style.cssText = `
        position: absolute;
        left: ${it.left}px;
        top: ${it.top}px;
        width: ${it.width}px;
        height: ${it.height}px;
        z-index: 9999;
        border-radius: ${Ke};
        overflow: hidden;
        box-shadow: 0 10px 30px rgba(0,0,0,.35);
        transition: all ${Z}ms ease-out;
        pointer-events: none;
        margin: 0;
        transform: none;
        filter: ${jt ? "grayscale(1)" : "none"};
      `;
      const Zt = zt.querySelector("img");
      if (Zt) {
        const me = Zt.cloneNode();
        me.style.cssText = "width: 100%; height: 100%; object-fit: cover;", lt.appendChild(me);
      }
      zt.remove(), Je.current.appendChild(lt), lt.getBoundingClientRect(), requestAnimationFrame(() => {
        lt.style.left = Xt.left + "px", lt.style.top = Xt.top + "px", lt.style.width = Xt.width + "px", lt.style.height = Xt.height + "px", lt.style.opacity = "0";
      });
      const Ft = () => {
        lt.remove(), dn.current = null, Ct && Ct.remove(), Lt.style.transition = "none", ft.style.transition = "none", Lt.style.setProperty("--rot-y-delta", "0deg"), Lt.style.setProperty("--rot-x-delta", "0deg"), requestAnimationFrame(() => {
          var me;
          ft.style.visibility = "", ft.style.opacity = "0", ft.style.zIndex = 0, Pt.current = null, (me = Je.current) == null || me.removeAttribute("data-enlarging"), requestAnimationFrame(() => {
            Lt.style.transition = "", ft.style.transition = "opacity 300ms ease-out", requestAnimationFrame(() => {
              ft.style.opacity = "1", setTimeout(() => {
                var Oe;
                ft.style.transition = "", ft.style.opacity = "", L.current = !1, !xt.current && ((Oe = Je.current) == null ? void 0 : Oe.getAttribute("data-enlarging")) !== "true" && document.body.classList.remove("dg-scroll-lock");
              }, 300);
            });
          });
        });
      };
      lt.addEventListener("transitionend", Ft, {
        once: !0
      });
    };
    Ce.addEventListener("click", Ve);
    const Qe = (ft) => {
      ft.key === "Escape" && Ve();
    };
    return window.addEventListener("keydown", Qe), () => {
      Ce.removeEventListener("click", Ve), window.removeEventListener("keydown", Qe);
    };
  }, [Z, Ke, jt]);
  const Qn = (Ce) => {
    var un, Ar, lr, Hr;
    if (L.current) return;
    L.current = !0, Y.current = performance.now(), gt();
    const Ve = Ce.parentElement;
    Pt.current = Ce, Ce.setAttribute("data-focused", "true");
    const Qe = Xu(Ve, "offsetX", 0), ft = Xu(Ve, "offsetY", 0), Lt = Xu(Ve, "sizeX", 2), zt = Xu(Ve, "sizeY", 2), Ct = YR(Qe, ft, Lt, zt, J), Rt = $R(Ct.rotateY), Nt = $R(nt.current.y);
    let wt = -(Rt + Nt) % 360;
    wt < -180 && (wt += 360);
    const Xt = -Ct.rotateX - nt.current.x;
    Ve.style.setProperty("--rot-y-delta", `${wt}deg`), Ve.style.setProperty("--rot-x-delta", `${Xt}deg`);
    const it = document.createElement("div");
    it.className = "item__image item__image--reference opacity-0", it.style.transform = `rotateX(${-Ct.rotateX}deg) rotateY(${-Ct.rotateY}deg)`, Ve.appendChild(it), it.offsetHeight;
    const lt = it.getBoundingClientRect(), Zt = (un = _e.current) == null ? void 0 : un.getBoundingClientRect(), Ft = (Ar = je.current) == null ? void 0 : Ar.getBoundingClientRect();
    if (!Zt || !Ft || lt.width <= 0 || lt.height <= 0) {
      L.current = !1, Pt.current = null, Ve.removeChild(it), pt();
      return;
    }
    dn.current = {
      left: lt.left,
      top: lt.top,
      width: lt.width,
      height: lt.height
    }, Ce.style.visibility = "hidden", Ce.style.zIndex = 0;
    const Xe = document.createElement("div");
    Xe.className = "enlarge", Xe.style.cssText = `position:absolute; left:${Ft.left - Zt.left}px; top:${Ft.top - Zt.top}px; width:${Ft.width}px; height:${Ft.height}px; opacity:0; z-index:30; will-change:transform,opacity; transform-origin:top left; transition:transform ${Z}ms ease, opacity ${Z}ms ease; border-radius:${Ke}; overflow:hidden; box-shadow:0 10px 30px rgba(0,0,0,.35);`;
    const ne = Ve.dataset.src || ((lr = Ce.querySelector("img")) == null ? void 0 : lr.src) || "", me = Ve.dataset.alt || ((Hr = Ce.querySelector("img")) == null ? void 0 : Hr.alt) || "", Oe = document.createElement("img");
    Oe.src = ne, Oe.alt = me, Oe.style.cssText = `width:100%; height:100%; object-fit:cover; filter:${jt ? "grayscale(1)" : "none"};`, Xe.appendChild(Oe), sn.current.appendChild(Xe);
    const ht = lt.left - Ft.left, Jt = lt.top - Ft.top, en = lt.width / Ft.width, pn = lt.height / Ft.height, Xn = isFinite(en) && en > 0 ? en : 1, hn = isFinite(pn) && pn > 0 ? pn : 1;
    if (Xe.style.transform = `translate(${ht}px, ${Jt}px) scale(${Xn}, ${hn})`, setTimeout(() => {
      var Pr;
      Xe.parentElement && (Xe.style.opacity = "1", Xe.style.transform = "translate(0px, 0px) scale(1, 1)", (Pr = Je.current) == null || Pr.setAttribute("data-enlarging", "true"));
    }, 16), oe || Ue) {
      const Pr = (Gi) => {
        if (Gi.propertyName !== "transform") return;
        Xe.removeEventListener("transitionend", Pr);
        const Qi = Xe.style.transition;
        Xe.style.transition = "none";
        const Ja = oe || `${Ft.width}px`, ei = Ue || `${Ft.height}px`;
        Xe.style.width = Ja, Xe.style.height = ei;
        const gi = Xe.getBoundingClientRect();
        Xe.style.width = Ft.width + "px", Xe.style.height = Ft.height + "px", Xe.offsetWidth, Xe.style.transition = `left ${Z}ms ease, top ${Z}ms ease, width ${Z}ms ease, height ${Z}ms ease`;
        const gr = Ft.left - Zt.left + (Ft.width - gi.width) / 2, Sr = Ft.top - Zt.top + (Ft.height - gi.height) / 2;
        requestAnimationFrame(() => {
          Xe.style.left = `${gr}px`, Xe.style.top = `${Sr}px`, Xe.style.width = Ja, Xe.style.height = ei;
        });
        const Kn = () => {
          Xe.removeEventListener("transitionend", Kn), Xe.style.transition = Qi;
        };
        Xe.addEventListener("transitionend", Kn, {
          once: !0
        });
      };
      Xe.addEventListener("transitionend", Pr);
    }
  };
  return qt.useEffect(() => () => {
    document.body.classList.remove("dg-scroll-lock");
  }, []), /* @__PURE__ */ ra.jsxs(ra.Fragment, { children: [
    /* @__PURE__ */ ra.jsx("style", { dangerouslySetInnerHTML: { __html: `
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
    /* @__PURE__ */ ra.jsx(
      "div",
      {
        ref: Je,
        className: "sphere-root",
        style: {
          "--segments-x": J,
          "--segments-y": J,
          "--overlay-blur-color": de,
          "--tile-radius": ct,
          "--enlarge-radius": Ke,
          "--image-filter": jt ? "grayscale(1)" : "none"
        },
        children: /* @__PURE__ */ ra.jsxs(
          "main",
          {
            ref: _e,
            className: "dg-main",
            style: {
              touchAction: "none",
              WebkitUserSelect: "none"
            },
            children: [
              /* @__PURE__ */ ra.jsx("div", { className: "stage", children: /* @__PURE__ */ ra.jsx("div", { ref: Le, className: "sphere", children: vt.map((Ce, Ve) => /* @__PURE__ */ ra.jsx(
                "div",
                {
                  className: "sphere-item dg-sphere-item-pos",
                  "data-src": Ce.src,
                  "data-alt": Ce.alt,
                  "data-offset-x": Ce.x,
                  "data-offset-y": Ce.y,
                  "data-size-x": Ce.sizeX,
                  "data-size-y": Ce.sizeY,
                  style: {
                    "--offset-x": Ce.x,
                    "--offset-y": Ce.y,
                    "--item-size-x": Ce.sizeX,
                    "--item-size-y": Ce.sizeY,
                    top: "-999px",
                    bottom: "-999px",
                    left: "-999px",
                    right: "-999px"
                  },
                  children: /* @__PURE__ */ ra.jsx(
                    "div",
                    {
                      className: "item__image",
                      role: "button",
                      tabIndex: 0,
                      "aria-label": Ce.alt || "Open image",
                      onClick: (Qe) => {
                        if (!xt.current && !Ee.current && !(performance.now() - Ie.current < 80)) {
                          if (tt) {
                            tt(Ce.src);
                            return;
                          }
                          L.current || Qn(Qe.currentTarget);
                        }
                      },
                      onPointerUp: (Qe) => {
                        Qe.nativeEvent.pointerType === "touch" && (xt.current || Ee.current || performance.now() - Ie.current < 80 || tt || L.current || Qn(Qe.currentTarget));
                      },
                      onKeyDown: (Qe) => {
                        if (!(Qe.key !== "Enter" && Qe.key !== " ")) {
                          if (Qe.preventDefault(), tt) {
                            tt(Ce.src);
                            return;
                          }
                          L.current || Qn(Qe.currentTarget);
                        }
                      },
                      style: {
                        inset: "10px",
                        borderRadius: `var(--tile-radius, ${ct})`,
                        backfaceVisibility: "hidden"
                      },
                      children: /* @__PURE__ */ ra.jsx(
                        "img",
                        {
                          src: Ce.src,
                          draggable: !1,
                          alt: Ce.alt,
                          className: "dg-tile-img",
                          style: {
                            backfaceVisibility: "hidden",
                            filter: `var(--image-filter, ${jt ? "grayscale(1)" : "none"})`
                          }
                        }
                      )
                    }
                  )
                },
                `${Ce.x},${Ce.y},${Ve}`
              )) }) }),
              /* @__PURE__ */ ra.jsx(
                "div",
                {
                  className: "dg-overlay-radial",
                  style: {
                    backgroundImage: `radial-gradient(rgba(235, 235, 235, 0) 65%, var(--overlay-blur-color, ${de}) 100%)`
                  }
                }
              ),
              /* @__PURE__ */ ra.jsx(
                "div",
                {
                  className: "dg-overlay-radial",
                  style: {
                    WebkitMaskImage: `radial-gradient(rgba(235, 235, 235, 0) 70%, var(--overlay-blur-color, ${de}) 90%)`,
                    maskImage: `radial-gradient(rgba(235, 235, 235, 0) 70%, var(--overlay-blur-color, ${de}) 90%)`,
                    backdropFilter: "blur(3px)"
                  }
                }
              ),
              /* @__PURE__ */ ra.jsx(
                "div",
                {
                  className: "dg-edge-top",
                  style: {
                    background: `linear-gradient(to bottom, transparent, var(--overlay-blur-color, ${de}))`
                  }
                }
              ),
              /* @__PURE__ */ ra.jsx(
                "div",
                {
                  className: "dg-edge-bottom",
                  style: {
                    background: `linear-gradient(to bottom, transparent, var(--overlay-blur-color, ${de}))`
                  }
                }
              ),
              /* @__PURE__ */ ra.jsxs("div", { ref: sn, className: "dg-viewer", style: { padding: "var(--viewer-pad)" }, children: [
                /* @__PURE__ */ ra.jsx(
                  "div",
                  {
                    ref: Gt,
                    className: "scrim dg-scrim",
                    style: {
                      background: "rgba(0, 0, 0, 0.4)",
                      backdropFilter: "blur(3px)"
                    }
                  }
                ),
                /* @__PURE__ */ ra.jsx(
                  "div",
                  {
                    ref: je,
                    className: "viewer-frame dg-viewer-frame",
                    style: {
                      borderRadius: `var(--enlarge-radius, ${Ke})`
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
function gO(g, d) {
  const v = { current: null }, R = qD.createRoot(g);
  return R.render(
    qt.createElement(vO, {
      ref: (M) => {
        v.current = M;
      },
      images: d.images,
      onImageClick: d.onImageClick,
      fit: d.fit ?? 0.8,
      minRadius: d.minRadius ?? 900,
      // The pasted reference used 0 (no vertical tilt at all); Longplayur
      // wants real up/down drag too, so this defaults much higher. The
      // component still clamps vertical rotation structurally (it is a
      // hemispheric dome, not a full sphere) -- see KNOWN-DEVIATIONS.md.
      maxVerticalRotationDeg: d.maxVerticalRotationDeg ?? 45,
      segments: d.segments ?? 34,
      dragDampening: d.dragDampening ?? 2,
      grayscale: d.grayscale ?? !1
    })
  ), {
    focusOn: (M) => {
      var I;
      return (I = v.current) == null ? void 0 : I.focusOn(M);
    },
    resetRotation: () => {
      var M;
      return (M = v.current) == null ? void 0 : M.resetRotation();
    },
    unmount: () => R.unmount()
  };
}
export {
  gO as mountDomeGallery
};
