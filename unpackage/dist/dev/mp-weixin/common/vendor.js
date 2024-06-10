(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/vendor"],{

/***/ 1:
/*!************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.createApp = createApp;exports.createComponent = createComponent;exports.createPage = createPage;exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _iterableToArrayLimit(arr, i) {if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(n);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _iterableToArray(iter) {if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) return _arrayLikeToArray(arr);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}

var _toString = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;

function isFn(fn) {
  return typeof fn === 'function';
}

function isStr(str) {
  return typeof str === 'string';
}

function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}

function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}

function noop() {}

/**
                    * Create a cached version of a pure function.
                    */
function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

/**
   * Camelize a hyphen-delimited string.
   */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {return c ? c.toUpperCase() : '';});
});

var HOOKS = [
'invoke',
'success',
'fail',
'complete',
'returnValue'];


var globalInterceptors = {};
var scopedInterceptors = {};

function mergeHook(parentVal, childVal) {
  var res = childVal ?
  parentVal ?
  parentVal.concat(childVal) :
  Array.isArray(childVal) ?
  childVal : [childVal] :
  parentVal;
  return res ?
  dedupeHooks(res) :
  res;
}

function dedupeHooks(hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res;
}

function removeHook(hooks, hook) {
  var index = hooks.indexOf(hook);
  if (index !== -1) {
    hooks.splice(index, 1);
  }
}

function mergeInterceptorHook(interceptor, option) {
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      interceptor[hook] = mergeHook(interceptor[hook], option[hook]);
    }
  });
}

function removeInterceptorHook(interceptor, option) {
  if (!interceptor || !option) {
    return;
  }
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      removeHook(interceptor[hook], option[hook]);
    }
  });
}

function addInterceptor(method, option) {
  if (typeof method === 'string' && isPlainObject(option)) {
    mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), option);
  } else if (isPlainObject(method)) {
    mergeInterceptorHook(globalInterceptors, method);
  }
}

function removeInterceptor(method, option) {
  if (typeof method === 'string') {
    if (isPlainObject(option)) {
      removeInterceptorHook(scopedInterceptors[method], option);
    } else {
      delete scopedInterceptors[method];
    }
  } else if (isPlainObject(method)) {
    removeInterceptorHook(globalInterceptors, method);
  }
}

function wrapperHook(hook) {
  return function (data) {
    return hook(data) || data;
  };
}

function isPromise(obj) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

function queue(hooks, data) {
  var promise = false;
  for (var i = 0; i < hooks.length; i++) {
    var hook = hooks[i];
    if (promise) {
      promise = Promise.then(wrapperHook(hook));
    } else {
      var res = hook(data);
      if (isPromise(res)) {
        promise = Promise.resolve(res);
      }
      if (res === false) {
        return {
          then: function then() {} };

      }
    }
  }
  return promise || {
    then: function then(callback) {
      return callback(data);
    } };

}

function wrapperOptions(interceptor) {var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  ['success', 'fail', 'complete'].forEach(function (name) {
    if (Array.isArray(interceptor[name])) {
      var oldCallback = options[name];
      options[name] = function callbackInterceptor(res) {
        queue(interceptor[name], res).then(function (res) {
          /* eslint-disable no-mixed-operators */
          return isFn(oldCallback) && oldCallback(res) || res;
        });
      };
    }
  });
  return options;
}

function wrapperReturnValue(method, returnValue) {
  var returnValueHooks = [];
  if (Array.isArray(globalInterceptors.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(globalInterceptors.returnValue));
  }
  var interceptor = scopedInterceptors[method];
  if (interceptor && Array.isArray(interceptor.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(interceptor.returnValue));
  }
  returnValueHooks.forEach(function (hook) {
    returnValue = hook(returnValue) || returnValue;
  });
  return returnValue;
}

function getApiInterceptorHooks(method) {
  var interceptor = Object.create(null);
  Object.keys(globalInterceptors).forEach(function (hook) {
    if (hook !== 'returnValue') {
      interceptor[hook] = globalInterceptors[hook].slice();
    }
  });
  var scopedInterceptor = scopedInterceptors[method];
  if (scopedInterceptor) {
    Object.keys(scopedInterceptor).forEach(function (hook) {
      if (hook !== 'returnValue') {
        interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
      }
    });
  }
  return interceptor;
}

function invokeApi(method, api, options) {for (var _len = arguments.length, params = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {params[_key - 3] = arguments[_key];}
  var interceptor = getApiInterceptorHooks(method);
  if (interceptor && Object.keys(interceptor).length) {
    if (Array.isArray(interceptor.invoke)) {
      var res = queue(interceptor.invoke, options);
      return res.then(function (options) {
        return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
      });
    } else {
      return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
    }
  }
  return api.apply(void 0, [options].concat(params));
}

var promiseInterceptor = {
  returnValue: function returnValue(res) {
    if (!isPromise(res)) {
      return res;
    }
    return res.then(function (res) {
      return res[1];
    }).catch(function (res) {
      return res[0];
    });
  } };


var SYNC_API_RE =
/^\$|sendNativeEvent|restoreGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64/;

var CONTEXT_API_RE = /^create|Manager$/;

// Context例外情况
var CONTEXT_API_RE_EXC = ['createBLEConnection'];

// 同步例外情况
var ASYNC_API = ['createBLEConnection'];

var CALLBACK_API_RE = /^on|^off/;

function isContextApi(name) {
  return CONTEXT_API_RE.test(name) && CONTEXT_API_RE_EXC.indexOf(name) === -1;
}
function isSyncApi(name) {
  return SYNC_API_RE.test(name) && ASYNC_API.indexOf(name) === -1;
}

function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name) && name !== 'onPush';
}

function handlePromise(promise) {
  return promise.then(function (data) {
    return [null, data];
  }).
  catch(function (err) {return [err];});
}

function shouldPromise(name) {
  if (
  isContextApi(name) ||
  isSyncApi(name) ||
  isCallbackApi(name))
  {
    return false;
  }
  return true;
}

/* eslint-disable no-extend-native */
if (!Promise.prototype.finally) {
  Promise.prototype.finally = function (callback) {
    var promise = this.constructor;
    return this.then(
    function (value) {return promise.resolve(callback()).then(function () {return value;});},
    function (reason) {return promise.resolve(callback()).then(function () {
        throw reason;
      });});

  };
}

function promisify(name, api) {
  if (!shouldPromise(name)) {
    return api;
  }
  return function promiseApi() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {params[_key2 - 1] = arguments[_key2];}
    if (isFn(options.success) || isFn(options.fail) || isFn(options.complete)) {
      return wrapperReturnValue(name, invokeApi.apply(void 0, [name, api, options].concat(params)));
    }
    return wrapperReturnValue(name, handlePromise(new Promise(function (resolve, reject) {
      invokeApi.apply(void 0, [name, api, Object.assign({}, options, {
        success: resolve,
        fail: reject })].concat(
      params));
    })));
  };
}

var EPS = 1e-4;
var BASE_DEVICE_WIDTH = 750;
var isIOS = false;
var deviceWidth = 0;
var deviceDPR = 0;

function checkDeviceWidth() {var _wx$getSystemInfoSync =




  wx.getSystemInfoSync(),platform = _wx$getSystemInfoSync.platform,pixelRatio = _wx$getSystemInfoSync.pixelRatio,windowWidth = _wx$getSystemInfoSync.windowWidth; // uni=>wx runtime 编译目标是 uni 对象，内部不允许直接使用 uni

  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === 'ios';
}

function upx2px(number, newDeviceWidth) {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }

  number = Number(number);
  if (number === 0) {
    return 0;
  }
  var result = number / BASE_DEVICE_WIDTH * (newDeviceWidth || deviceWidth);
  if (result < 0) {
    result = -result;
  }
  result = Math.floor(result + EPS);
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      return 1;
    } else {
      return 0.5;
    }
  }
  return number < 0 ? -result : result;
}

var interceptors = {
  promiseInterceptor: promiseInterceptor };


var baseApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  upx2px: upx2px,
  addInterceptor: addInterceptor,
  removeInterceptor: removeInterceptor,
  interceptors: interceptors });


var previewImage = {
  args: function args(fromArgs) {
    var currentIndex = parseInt(fromArgs.current);
    if (isNaN(currentIndex)) {
      return;
    }
    var urls = fromArgs.urls;
    if (!Array.isArray(urls)) {
      return;
    }
    var len = urls.length;
    if (!len) {
      return;
    }
    if (currentIndex < 0) {
      currentIndex = 0;
    } else if (currentIndex >= len) {
      currentIndex = len - 1;
    }
    if (currentIndex > 0) {
      fromArgs.current = urls[currentIndex];
      fromArgs.urls = urls.filter(
      function (item, index) {return index < currentIndex ? item !== urls[currentIndex] : true;});

    } else {
      fromArgs.current = urls[0];
    }
    return {
      indicator: false,
      loop: false };

  } };


function addSafeAreaInsets(result) {
  if (result.safeArea) {
    var safeArea = result.safeArea;
    result.safeAreaInsets = {
      top: safeArea.top,
      left: safeArea.left,
      right: result.windowWidth - safeArea.right,
      bottom: result.windowHeight - safeArea.bottom };

  }
}
var protocols = {
  previewImage: previewImage,
  getSystemInfo: {
    returnValue: addSafeAreaInsets },

  getSystemInfoSync: {
    returnValue: addSafeAreaInsets } };


var todos = [
'vibrate'];

var canIUses = [];

var CALLBACKS = ['success', 'fail', 'cancel', 'complete'];

function processCallback(methodName, method, returnValue) {
  return function (res) {
    return method(processReturnValue(methodName, res, returnValue));
  };
}

function processArgs(methodName, fromArgs) {var argsOption = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};var returnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};var keepFromArgs = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  if (isPlainObject(fromArgs)) {// 一般 api 的参数解析
    var toArgs = keepFromArgs === true ? fromArgs : {}; // returnValue 为 false 时，说明是格式化返回值，直接在返回值对象上修改赋值
    if (isFn(argsOption)) {
      argsOption = argsOption(fromArgs, toArgs) || {};
    }
    for (var key in fromArgs) {
      if (hasOwn(argsOption, key)) {
        var keyOption = argsOption[key];
        if (isFn(keyOption)) {
          keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
        }
        if (!keyOption) {// 不支持的参数
          console.warn("\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F ".concat(methodName, "\u6682\u4E0D\u652F\u6301").concat(key));
        } else if (isStr(keyOption)) {// 重写参数 key
          toArgs[keyOption] = fromArgs[key];
        } else if (isPlainObject(keyOption)) {// {name:newName,value:value}可重新指定参数 key:value
          toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
        }
      } else if (CALLBACKS.indexOf(key) !== -1) {
        toArgs[key] = processCallback(methodName, fromArgs[key], returnValue);
      } else {
        if (!keepFromArgs) {
          toArgs[key] = fromArgs[key];
        }
      }
    }
    return toArgs;
  } else if (isFn(fromArgs)) {
    fromArgs = processCallback(methodName, fromArgs, returnValue);
  }
  return fromArgs;
}

function processReturnValue(methodName, res, returnValue) {var keepReturnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  if (isFn(protocols.returnValue)) {// 处理通用 returnValue
    res = protocols.returnValue(methodName, res);
  }
  return processArgs(methodName, res, returnValue, {}, keepReturnValue);
}

function wrapper(methodName, method) {
  if (hasOwn(protocols, methodName)) {
    var protocol = protocols[methodName];
    if (!protocol) {// 暂不支持的 api
      return function () {
        console.error("\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F \u6682\u4E0D\u652F\u6301".concat(methodName));
      };
    }
    return function (arg1, arg2) {// 目前 api 最多两个参数
      var options = protocol;
      if (isFn(protocol)) {
        options = protocol(arg1);
      }

      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);

      var args = [arg1];
      if (typeof arg2 !== 'undefined') {
        args.push(arg2);
      }
      var returnValue = wx[options.name || methodName].apply(wx, args);
      if (isSyncApi(methodName)) {// 同步 api
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }
      return returnValue;
    };
  }
  return method;
}

var todoApis = Object.create(null);

var TODOS = [
'onTabBarMidButtonTap',
'subscribePush',
'unsubscribePush',
'onPush',
'offPush',
'share'];


function createTodoApi(name) {
  return function todoApi(_ref)


  {var fail = _ref.fail,complete = _ref.complete;
    var res = {
      errMsg: "".concat(name, ":fail:\u6682\u4E0D\u652F\u6301 ").concat(name, " \u65B9\u6CD5") };

    isFn(fail) && fail(res);
    isFn(complete) && complete(res);
  };
}

TODOS.forEach(function (name) {
  todoApis[name] = createTodoApi(name);
});

var providers = {
  oauth: ['weixin'],
  share: ['weixin'],
  payment: ['wxpay'],
  push: ['weixin'] };


function getProvider(_ref2)




{var service = _ref2.service,success = _ref2.success,fail = _ref2.fail,complete = _ref2.complete;
  var res = false;
  if (providers[service]) {
    res = {
      errMsg: 'getProvider:ok',
      service: service,
      provider: providers[service] };

    isFn(success) && success(res);
  } else {
    res = {
      errMsg: 'getProvider:fail:服务[' + service + ']不存在' };

    isFn(fail) && fail(res);
  }
  isFn(complete) && complete(res);
}

var extraApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getProvider: getProvider });


var getEmitter = function () {
  if (typeof getUniEmitter === 'function') {
    /* eslint-disable no-undef */
    return getUniEmitter;
  }
  var Emitter;
  return function getUniEmitter() {
    if (!Emitter) {
      Emitter = new _vue.default();
    }
    return Emitter;
  };
}();

function apply(ctx, method, args) {
  return ctx[method].apply(ctx, args);
}

function $on() {
  return apply(getEmitter(), '$on', Array.prototype.slice.call(arguments));
}
function $off() {
  return apply(getEmitter(), '$off', Array.prototype.slice.call(arguments));
}
function $once() {
  return apply(getEmitter(), '$once', Array.prototype.slice.call(arguments));
}
function $emit() {
  return apply(getEmitter(), '$emit', Array.prototype.slice.call(arguments));
}

var eventApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  $on: $on,
  $off: $off,
  $once: $once,
  $emit: $emit });


var api = /*#__PURE__*/Object.freeze({
  __proto__: null });


var MPPage = Page;
var MPComponent = Component;

var customizeRE = /:/g;

var customize = cached(function (str) {
  return camelize(str.replace(customizeRE, '-'));
});

function initTriggerEvent(mpInstance) {
  {
    if (!wx.canIUse('nextTick')) {
      return;
    }
  }
  var oldTriggerEvent = mpInstance.triggerEvent;
  mpInstance.triggerEvent = function (event) {for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {args[_key3 - 1] = arguments[_key3];}
    return oldTriggerEvent.apply(mpInstance, [customize(event)].concat(args));
  };
}

function initHook(name, options) {
  var oldHook = options[name];
  if (!oldHook) {
    options[name] = function () {
      initTriggerEvent(this);
    };
  } else {
    options[name] = function () {
      initTriggerEvent(this);for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {args[_key4] = arguments[_key4];}
      return oldHook.apply(this, args);
    };
  }
}

Page = function Page() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  initHook('onLoad', options);
  return MPPage(options);
};

Component = function Component() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  initHook('created', options);
  return MPComponent(options);
};

var PAGE_EVENT_HOOKS = [
'onPullDownRefresh',
'onReachBottom',
'onShareAppMessage',
'onPageScroll',
'onResize',
'onTabItemTap'];


function initMocks(vm, mocks) {
  var mpInstance = vm.$mp[vm.mpType];
  mocks.forEach(function (mock) {
    if (hasOwn(mpInstance, mock)) {
      vm[mock] = mpInstance[mock];
    }
  });
}

function hasHook(hook, vueOptions) {
  if (!vueOptions) {
    return true;
  }

  if (_vue.default.options && Array.isArray(_vue.default.options[hook])) {
    return true;
  }

  vueOptions = vueOptions.default || vueOptions;

  if (isFn(vueOptions)) {
    if (isFn(vueOptions.extendOptions[hook])) {
      return true;
    }
    if (vueOptions.super &&
    vueOptions.super.options &&
    Array.isArray(vueOptions.super.options[hook])) {
      return true;
    }
    return false;
  }

  if (isFn(vueOptions[hook])) {
    return true;
  }
  var mixins = vueOptions.mixins;
  if (Array.isArray(mixins)) {
    return !!mixins.find(function (mixin) {return hasHook(hook, mixin);});
  }
}

function initHooks(mpOptions, hooks, vueOptions) {
  hooks.forEach(function (hook) {
    if (hasHook(hook, vueOptions)) {
      mpOptions[hook] = function (args) {
        return this.$vm && this.$vm.__call_hook(hook, args);
      };
    }
  });
}

function initVueComponent(Vue, vueOptions) {
  vueOptions = vueOptions.default || vueOptions;
  var VueComponent;
  if (isFn(vueOptions)) {
    VueComponent = vueOptions;
  } else {
    VueComponent = Vue.extend(vueOptions);
  }
  vueOptions = VueComponent.options;
  return [VueComponent, vueOptions];
}

function initSlots(vm, vueSlots) {
  if (Array.isArray(vueSlots) && vueSlots.length) {
    var $slots = Object.create(null);
    vueSlots.forEach(function (slotName) {
      $slots[slotName] = true;
    });
    vm.$scopedSlots = vm.$slots = $slots;
  }
}

function initVueIds(vueIds, mpInstance) {
  vueIds = (vueIds || '').split(',');
  var len = vueIds.length;

  if (len === 1) {
    mpInstance._$vueId = vueIds[0];
  } else if (len === 2) {
    mpInstance._$vueId = vueIds[0];
    mpInstance._$vuePid = vueIds[1];
  }
}

function initData(vueOptions, context) {
  var data = vueOptions.data || {};
  var methods = vueOptions.methods || {};

  if (typeof data === 'function') {
    try {
      data = data.call(context); // 支持 Vue.prototype 上挂的数据
    } catch (e) {
      if (Object({"VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.warn('根据 Vue 的 data 函数初始化小程序 data 失败，请尽量确保 data 函数中不访问 vm 对象，否则可能影响首次数据渲染速度。', data);
      }
    }
  } else {
    try {
      // 对 data 格式化
      data = JSON.parse(JSON.stringify(data));
    } catch (e) {}
  }

  if (!isPlainObject(data)) {
    data = {};
  }

  Object.keys(methods).forEach(function (methodName) {
    if (context.__lifecycle_hooks__.indexOf(methodName) === -1 && !hasOwn(data, methodName)) {
      data[methodName] = methods[methodName];
    }
  });

  return data;
}

var PROP_TYPES = [String, Number, Boolean, Object, Array, null];

function createObserver(name) {
  return function observer(newVal, oldVal) {
    if (this.$vm) {
      this.$vm[name] = newVal; // 为了触发其他非 render watcher
    }
  };
}

function initBehaviors(vueOptions, initBehavior) {
  var vueBehaviors = vueOptions.behaviors;
  var vueExtends = vueOptions.extends;
  var vueMixins = vueOptions.mixins;

  var vueProps = vueOptions.props;

  if (!vueProps) {
    vueOptions.props = vueProps = [];
  }

  var behaviors = [];
  if (Array.isArray(vueBehaviors)) {
    vueBehaviors.forEach(function (behavior) {
      behaviors.push(behavior.replace('uni://', "wx".concat("://")));
      if (behavior === 'uni://form-field') {
        if (Array.isArray(vueProps)) {
          vueProps.push('name');
          vueProps.push('value');
        } else {
          vueProps.name = {
            type: String,
            default: '' };

          vueProps.value = {
            type: [String, Number, Boolean, Array, Object, Date],
            default: '' };

        }
      }
    });
  }
  if (isPlainObject(vueExtends) && vueExtends.props) {
    behaviors.push(
    initBehavior({
      properties: initProperties(vueExtends.props, true) }));


  }
  if (Array.isArray(vueMixins)) {
    vueMixins.forEach(function (vueMixin) {
      if (isPlainObject(vueMixin) && vueMixin.props) {
        behaviors.push(
        initBehavior({
          properties: initProperties(vueMixin.props, true) }));


      }
    });
  }
  return behaviors;
}

function parsePropType(key, type, defaultValue, file) {
  // [String]=>String
  if (Array.isArray(type) && type.length === 1) {
    return type[0];
  }
  return type;
}

function initProperties(props) {var isBehavior = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;var file = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var properties = {};
  if (!isBehavior) {
    properties.vueId = {
      type: String,
      value: '' };

    properties.vueSlots = { // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
      type: null,
      value: [],
      observer: function observer(newVal, oldVal) {
        var $slots = Object.create(null);
        newVal.forEach(function (slotName) {
          $slots[slotName] = true;
        });
        this.setData({
          $slots: $slots });

      } };

  }
  if (Array.isArray(props)) {// ['title']
    props.forEach(function (key) {
      properties[key] = {
        type: null,
        observer: createObserver(key) };

    });
  } else if (isPlainObject(props)) {// {title:{type:String,default:''},content:String}
    Object.keys(props).forEach(function (key) {
      var opts = props[key];
      if (isPlainObject(opts)) {// title:{type:String,default:''}
        var value = opts.default;
        if (isFn(value)) {
          value = value();
        }

        opts.type = parsePropType(key, opts.type);

        properties[key] = {
          type: PROP_TYPES.indexOf(opts.type) !== -1 ? opts.type : null,
          value: value,
          observer: createObserver(key) };

      } else {// content:String
        var type = parsePropType(key, opts);
        properties[key] = {
          type: PROP_TYPES.indexOf(type) !== -1 ? type : null,
          observer: createObserver(key) };

      }
    });
  }
  return properties;
}

function wrapper$1(event) {
  // TODO 又得兼容 mpvue 的 mp 对象
  try {
    event.mp = JSON.parse(JSON.stringify(event));
  } catch (e) {}

  event.stopPropagation = noop;
  event.preventDefault = noop;

  event.target = event.target || {};

  if (!hasOwn(event, 'detail')) {
    event.detail = {};
  }

  if (hasOwn(event, 'markerId')) {
    event.detail = typeof event.detail === 'object' ? event.detail : {};
    event.detail.markerId = event.markerId;
  }

  if (isPlainObject(event.detail)) {
    event.target = Object.assign({}, event.target, event.detail);
  }

  return event;
}

function getExtraValue(vm, dataPathsArray) {
  var context = vm;
  dataPathsArray.forEach(function (dataPathArray) {
    var dataPath = dataPathArray[0];
    var value = dataPathArray[2];
    if (dataPath || typeof value !== 'undefined') {// ['','',index,'disable']
      var propPath = dataPathArray[1];
      var valuePath = dataPathArray[3];

      var vFor = dataPath ? vm.__get_value(dataPath, context) : context;

      if (Number.isInteger(vFor)) {
        context = value;
      } else if (!propPath) {
        context = vFor[value];
      } else {
        if (Array.isArray(vFor)) {
          context = vFor.find(function (vForItem) {
            return vm.__get_value(propPath, vForItem) === value;
          });
        } else if (isPlainObject(vFor)) {
          context = Object.keys(vFor).find(function (vForKey) {
            return vm.__get_value(propPath, vFor[vForKey]) === value;
          });
        } else {
          console.error('v-for 暂不支持循环数据：', vFor);
        }
      }

      if (valuePath) {
        context = vm.__get_value(valuePath, context);
      }
    }
  });
  return context;
}

function processEventExtra(vm, extra, event) {
  var extraObj = {};

  if (Array.isArray(extra) && extra.length) {
    /**
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *'test'
                                              */
    extra.forEach(function (dataPath, index) {
      if (typeof dataPath === 'string') {
        if (!dataPath) {// model,prop.sync
          extraObj['$' + index] = vm;
        } else {
          if (dataPath === '$event') {// $event
            extraObj['$' + index] = event;
          } else if (dataPath.indexOf('$event.') === 0) {// $event.target.value
            extraObj['$' + index] = vm.__get_value(dataPath.replace('$event.', ''), event);
          } else {
            extraObj['$' + index] = vm.__get_value(dataPath);
          }
        }
      } else {
        extraObj['$' + index] = getExtraValue(vm, dataPath);
      }
    });
  }

  return extraObj;
}

function getObjByArray(arr) {
  var obj = {};
  for (var i = 1; i < arr.length; i++) {
    var element = arr[i];
    obj[element[0]] = element[1];
  }
  return obj;
}

function processEventArgs(vm, event) {var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];var extra = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];var isCustom = arguments.length > 4 ? arguments[4] : undefined;var methodName = arguments.length > 5 ? arguments[5] : undefined;
  var isCustomMPEvent = false; // wxcomponent 组件，传递原始 event 对象
  if (isCustom) {// 自定义事件
    isCustomMPEvent = event.currentTarget &&
    event.currentTarget.dataset &&
    event.currentTarget.dataset.comType === 'wx';
    if (!args.length) {// 无参数，直接传入 event 或 detail 数组
      if (isCustomMPEvent) {
        return [event];
      }
      return event.detail.__args__ || event.detail;
    }
  }

  var extraObj = processEventExtra(vm, extra, event);

  var ret = [];
  args.forEach(function (arg) {
    if (arg === '$event') {
      if (methodName === '__set_model' && !isCustom) {// input v-model value
        ret.push(event.target.value);
      } else {
        if (isCustom && !isCustomMPEvent) {
          ret.push(event.detail.__args__[0]);
        } else {// wxcomponent 组件或内置组件
          ret.push(event);
        }
      }
    } else {
      if (Array.isArray(arg) && arg[0] === 'o') {
        ret.push(getObjByArray(arg));
      } else if (typeof arg === 'string' && hasOwn(extraObj, arg)) {
        ret.push(extraObj[arg]);
      } else {
        ret.push(arg);
      }
    }
  });

  return ret;
}

var ONCE = '~';
var CUSTOM = '^';

function isMatchEventType(eventType, optType) {
  return eventType === optType ||

  optType === 'regionchange' && (

  eventType === 'begin' ||
  eventType === 'end');


}

function handleEvent(event) {var _this = this;
  event = wrapper$1(event);

  // [['tap',[['handle',[1,2,a]],['handle1',[1,2,a]]]]]
  var dataset = (event.currentTarget || event.target).dataset;
  if (!dataset) {
    return console.warn('事件信息不存在');
  }
  var eventOpts = dataset.eventOpts || dataset['event-opts']; // 支付宝 web-view 组件 dataset 非驼峰
  if (!eventOpts) {
    return console.warn('事件信息不存在');
  }

  // [['handle',[1,2,a]],['handle1',[1,2,a]]]
  var eventType = event.type;

  var ret = [];

  eventOpts.forEach(function (eventOpt) {
    var type = eventOpt[0];
    var eventsArray = eventOpt[1];

    var isCustom = type.charAt(0) === CUSTOM;
    type = isCustom ? type.slice(1) : type;
    var isOnce = type.charAt(0) === ONCE;
    type = isOnce ? type.slice(1) : type;

    if (eventsArray && isMatchEventType(eventType, type)) {
      eventsArray.forEach(function (eventArray) {
        var methodName = eventArray[0];
        if (methodName) {
          var handlerCtx = _this.$vm;
          if (
          handlerCtx.$options.generic &&
          handlerCtx.$parent &&
          handlerCtx.$parent.$parent)
          {// mp-weixin,mp-toutiao 抽象节点模拟 scoped slots
            handlerCtx = handlerCtx.$parent.$parent;
          }
          if (methodName === '$emit') {
            handlerCtx.$emit.apply(handlerCtx,
            processEventArgs(
            _this.$vm,
            event,
            eventArray[1],
            eventArray[2],
            isCustom,
            methodName));

            return;
          }
          var handler = handlerCtx[methodName];
          if (!isFn(handler)) {
            throw new Error(" _vm.".concat(methodName, " is not a function"));
          }
          if (isOnce) {
            if (handler.once) {
              return;
            }
            handler.once = true;
          }
          ret.push(handler.apply(handlerCtx, processEventArgs(
          _this.$vm,
          event,
          eventArray[1],
          eventArray[2],
          isCustom,
          methodName)));

        }
      });
    }
  });

  if (
  eventType === 'input' &&
  ret.length === 1 &&
  typeof ret[0] !== 'undefined')
  {
    return ret[0];
  }
}

var hooks = [
'onShow',
'onHide',
'onError',
'onPageNotFound'];


function parseBaseApp(vm, _ref3)


{var mocks = _ref3.mocks,initRefs = _ref3.initRefs;
  if (vm.$options.store) {
    _vue.default.prototype.$store = vm.$options.store;
  }

  _vue.default.prototype.mpHost = "mp-weixin";

  _vue.default.mixin({
    beforeCreate: function beforeCreate() {
      if (!this.$options.mpType) {
        return;
      }

      this.mpType = this.$options.mpType;

      this.$mp = _defineProperty({
        data: {} },
      this.mpType, this.$options.mpInstance);


      this.$scope = this.$options.mpInstance;

      delete this.$options.mpType;
      delete this.$options.mpInstance;

      if (this.mpType !== 'app') {
        initRefs(this);
        initMocks(this, mocks);
      }
    } });


  var appOptions = {
    onLaunch: function onLaunch(args) {
      if (this.$vm) {// 已经初始化过了，主要是为了百度，百度 onShow 在 onLaunch 之前
        return;
      }
      {
        if (!wx.canIUse('nextTick')) {// 事实 上2.2.3 即可，简单使用 2.3.0 的 nextTick 判断
          console.error('当前微信基础库版本过低，请将 微信开发者工具-详情-项目设置-调试基础库版本 更换为`2.3.0`以上');
        }
      }

      this.$vm = vm;

      this.$vm.$mp = {
        app: this };


      this.$vm.$scope = this;
      // vm 上也挂载 globalData
      this.$vm.globalData = this.globalData;

      this.$vm._isMounted = true;
      this.$vm.__call_hook('mounted', args);

      this.$vm.__call_hook('onLaunch', args);
    } };


  // 兼容旧版本 globalData
  appOptions.globalData = vm.$options.globalData || {};
  // 将 methods 中的方法挂在 getApp() 中
  var methods = vm.$options.methods;
  if (methods) {
    Object.keys(methods).forEach(function (name) {
      appOptions[name] = methods[name];
    });
  }

  initHooks(appOptions, hooks);

  return appOptions;
}

var mocks = ['__route__', '__wxExparserNodeId__', '__wxWebviewId__'];

function findVmByVueId(vm, vuePid) {
  var $children = vm.$children;
  // 优先查找直属(反向查找:https://github.com/dcloudio/uni-app/issues/1200)
  for (var i = $children.length - 1; i >= 0; i--) {
    var childVm = $children[i];
    if (childVm.$scope._$vueId === vuePid) {
      return childVm;
    }
  }
  // 反向递归查找
  var parentVm;
  for (var _i = $children.length - 1; _i >= 0; _i--) {
    parentVm = findVmByVueId($children[_i], vuePid);
    if (parentVm) {
      return parentVm;
    }
  }
}

function initBehavior(options) {
  return Behavior(options);
}

function isPage() {
  return !!this.route;
}

function initRelation(detail) {
  this.triggerEvent('__l', detail);
}

function initRefs(vm) {
  var mpInstance = vm.$scope;
  Object.defineProperty(vm, '$refs', {
    get: function get() {
      var $refs = {};
      var components = mpInstance.selectAllComponents('.vue-ref');
      components.forEach(function (component) {
        var ref = component.dataset.ref;
        $refs[ref] = component.$vm || component;
      });
      var forComponents = mpInstance.selectAllComponents('.vue-ref-in-for');
      forComponents.forEach(function (component) {
        var ref = component.dataset.ref;
        if (!$refs[ref]) {
          $refs[ref] = [];
        }
        $refs[ref].push(component.$vm || component);
      });
      return $refs;
    } });

}

function handleLink(event) {var _ref4 =



  event.detail || event.value,vuePid = _ref4.vuePid,vueOptions = _ref4.vueOptions; // detail 是微信,value 是百度(dipatch)

  var parentVm;

  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }

  if (!parentVm) {
    parentVm = this.$vm;
  }

  vueOptions.parent = parentVm;
}

function parseApp(vm) {
  return parseBaseApp(vm, {
    mocks: mocks,
    initRefs: initRefs });

}

function createApp(vm) {
  App(parseApp(vm));
  return vm;
}

function parseBaseComponent(vueComponentOptions)


{var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},isPage = _ref5.isPage,initRelation = _ref5.initRelation;var _initVueComponent =
  initVueComponent(_vue.default, vueComponentOptions),_initVueComponent2 = _slicedToArray(_initVueComponent, 2),VueComponent = _initVueComponent2[0],vueOptions = _initVueComponent2[1];

  var options = _objectSpread({
    multipleSlots: true,
    addGlobalClass: true },
  vueOptions.options || {});


  {
    // 微信 multipleSlots 部分情况有 bug，导致内容顺序错乱 如 u-list，提供覆盖选项
    if (vueOptions['mp-weixin'] && vueOptions['mp-weixin'].options) {
      Object.assign(options, vueOptions['mp-weixin'].options);
    }
  }

  var componentOptions = {
    options: options,
    data: initData(vueOptions, _vue.default.prototype),
    behaviors: initBehaviors(vueOptions, initBehavior),
    properties: initProperties(vueOptions.props, false, vueOptions.__file),
    lifetimes: {
      attached: function attached() {
        var properties = this.properties;

        var options = {
          mpType: isPage.call(this) ? 'page' : 'component',
          mpInstance: this,
          propsData: properties };


        initVueIds(properties.vueId, this);

        // 处理父子关系
        initRelation.call(this, {
          vuePid: this._$vuePid,
          vueOptions: options });


        // 初始化 vue 实例
        this.$vm = new VueComponent(options);

        // 处理$slots,$scopedSlots（暂不支持动态变化$slots）
        initSlots(this.$vm, properties.vueSlots);

        // 触发首次 setData
        this.$vm.$mount();
      },
      ready: function ready() {
        // 当组件 props 默认值为 true，初始化时传入 false 会导致 created,ready 触发, 但 attached 不触发
        // https://developers.weixin.qq.com/community/develop/doc/00066ae2844cc0f8eb883e2a557800
        if (this.$vm) {
          this.$vm._isMounted = true;
          this.$vm.__call_hook('mounted');
          this.$vm.__call_hook('onReady');
        }
      },
      detached: function detached() {
        this.$vm && this.$vm.$destroy();
      } },

    pageLifetimes: {
      show: function show(args) {
        this.$vm && this.$vm.__call_hook('onPageShow', args);
      },
      hide: function hide() {
        this.$vm && this.$vm.__call_hook('onPageHide');
      },
      resize: function resize(size) {
        this.$vm && this.$vm.__call_hook('onPageResize', size);
      } },

    methods: {
      __l: handleLink,
      __e: handleEvent } };


  // externalClasses
  if (vueOptions.externalClasses) {
    componentOptions.externalClasses = vueOptions.externalClasses;
  }

  if (Array.isArray(vueOptions.wxsCallMethods)) {
    vueOptions.wxsCallMethods.forEach(function (callMethod) {
      componentOptions.methods[callMethod] = function (args) {
        return this.$vm[callMethod](args);
      };
    });
  }

  if (isPage) {
    return componentOptions;
  }
  return [componentOptions, VueComponent];
}

function parseComponent(vueComponentOptions) {
  return parseBaseComponent(vueComponentOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

var hooks$1 = [
'onShow',
'onHide',
'onUnload'];


hooks$1.push.apply(hooks$1, PAGE_EVENT_HOOKS);

function parseBasePage(vuePageOptions, _ref6)


{var isPage = _ref6.isPage,initRelation = _ref6.initRelation;
  var pageOptions = parseComponent(vuePageOptions);

  initHooks(pageOptions.methods, hooks$1, vuePageOptions);

  pageOptions.methods.onLoad = function (args) {
    this.$vm.$mp.query = args; // 兼容 mpvue
    this.$vm.__call_hook('onLoad', args);
  };

  return pageOptions;
}

function parsePage(vuePageOptions) {
  return parseBasePage(vuePageOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

function createPage(vuePageOptions) {
  {
    return Component(parsePage(vuePageOptions));
  }
}

function createComponent(vueOptions) {
  {
    return Component(parseComponent(vueOptions));
  }
}

todos.forEach(function (todoApi) {
  protocols[todoApi] = false;
});

canIUses.forEach(function (canIUseApi) {
  var apiName = protocols[canIUseApi] && protocols[canIUseApi].name ? protocols[canIUseApi].name :
  canIUseApi;
  if (!wx.canIUse(apiName)) {
    protocols[canIUseApi] = false;
  }
});

var uni = {};

if (typeof Proxy !== 'undefined' && "mp-weixin" !== 'app-plus') {
  uni = new Proxy({}, {
    get: function get(target, name) {
      if (target[name]) {
        return target[name];
      }
      if (baseApi[name]) {
        return baseApi[name];
      }
      if (api[name]) {
        return promisify(name, api[name]);
      }
      {
        if (extraApi[name]) {
          return promisify(name, extraApi[name]);
        }
        if (todoApis[name]) {
          return promisify(name, todoApis[name]);
        }
      }
      if (eventApi[name]) {
        return eventApi[name];
      }
      if (!hasOwn(wx, name) && !hasOwn(protocols, name)) {
        return;
      }
      return promisify(name, wrapper(name, wx[name]));
    },
    set: function set(target, name, value) {
      target[name] = value;
      return true;
    } });

} else {
  Object.keys(baseApi).forEach(function (name) {
    uni[name] = baseApi[name];
  });

  {
    Object.keys(todoApis).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
    Object.keys(extraApi).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
  }

  Object.keys(eventApi).forEach(function (name) {
    uni[name] = eventApi[name];
  });

  Object.keys(api).forEach(function (name) {
    uni[name] = promisify(name, api[name]);
  });

  Object.keys(wx).forEach(function (name) {
    if (hasOwn(wx, name) || hasOwn(protocols, name)) {
      uni[name] = promisify(name, wrapper(name, wx[name]));
    }
  });
}

wx.createApp = createApp;
wx.createPage = createPage;
wx.createComponent = createComponent;

var uni$1 = uni;var _default =

uni$1;exports.default = _default;

/***/ }),

/***/ 10:
/*!**********************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode, /* vue-cli only */
  components, // fixed by xxxxxx auto components
  renderjs // fixed by xxxxxx renderjs
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // fixed by xxxxxx auto components
  if (components) {
    if (!options.components) {
      options.components = {}
    }
    var hasOwn = Object.prototype.hasOwnProperty
    for (var name in components) {
      if (hasOwn.call(components, name) && !hasOwn.call(options.components, name)) {
        options.components[name] = components[name]
      }
    }
  }
  // fixed by xxxxxx renderjs
  if (renderjs) {
    (renderjs.beforeCreate || (renderjs.beforeCreate = [])).unshift(function() {
      this[renderjs.__module] = this
    });
    (options.mixins || (options.mixins = [])).push(renderjs)
  }

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ 120:
/*!*******************************************************************************!*\
  !*** C:/Users/pc4/Desktop/工作/玺玥月子餐设计/玺玥月子餐/components/ld-select/eval5.min.js ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*!
 * @license eval5 v1.4.5
 * Copyright (c) 2019-2020 nobo (MIT Licensed)
 * https://github.com/bplok20010/eval5
 */
!function (e, t) {
   true ? module.exports = t() : undefined;
}(this, function () {
  return function (e) {
    var t = {};

    function r(i) {
      if (t[i]) return t[i].exports;
      var n = t[i] = {
        i: i,
        l: !1,
        exports: {} };

      return e[i].call(n.exports, n, n.exports, r), n.l = !0, n.exports;
    }
    return r.m = e, r.c = t, r.d = function (e, t, i) {
      r.o(e, t) || Object.defineProperty(e, t, {
        enumerable: !0,
        get: i });

    }, r.r = function (e) {
      "undefined" !== typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
        value: "Module" }),
      Object.defineProperty(e, "__esModule", {
        value: !0 });

    }, r.t = function (e, t) {
      if (1 & t && (e = r(e)), 8 & t) return e;
      if (4 & t && "object" === typeof e && e && e.__esModule) return e;
      var i = Object.create(null);
      if (r.r(i), Object.defineProperty(i, "default", {
        enumerable: !0,
        value: e }),
      2 & t && "string" != typeof e)
      for (var n in e) {r.d(i, n, function (t) {
          return e[t];
        }.bind(null, n));}
      return i;
    }, r.n = function (e) {
      var t = e && e.__esModule ? function () {
        return e.default;
      } : function () {
        return e;
      };
      return r.d(t, "a", t), t;
    }, r.o = function (e, t) {
      return Object.prototype.hasOwnProperty.call(e, t);
    }, r.p = "", r(r.s = 5);
  }([function (e, t) {
    e.exports = function (e) {
      return e && e.__esModule ? e : {
        default: e };

    };
  }, function (e, t, r) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
      value: !0 }),
    t.createContext = function (e) {
      void 0 === e && (e = Object.create(null));
      return e;
    }, t.compileFunction = function (e, t, r) {
      void 0 === t && (t = []);
      void 0 === r && (r = {});
      var n = r.parsingContext,
      s = void 0 === r.timeout ? 0 : r.timeout,
      a = "\n    (function anonymous(" + t.join(",") + "){\n         " + e + "\n    });\n    ";
      return new i.Interpreter(n, {
        ecmaVersion: r.ecmaVersion,
        timeout: s,
        rootContext: r.rootContext,
        globalContextInFunction: r.globalContextInFunction }).
      evaluate(a);
    }, t.runInContext = n, t.Script = t.runInNewContext = void 0;
    var i = r(2);

    function n(e, t, r) {
      return new i.Interpreter(t, r).evaluate(e);
    }
    var s = n;
    t.runInNewContext = s;
    var a = function () {
      function e(e) {
        this._code = e;
      }
      var t = e.prototype;
      return t.runInContext = function (e) {
        return n(this._code, e);
      }, t.runInNewContext = function (e) {
        return n(this._code, e);
      }, e;
    }();
    t.Script = a;
  }, function (e, t, r) {
    "use strict";
    var i = r(0);
    Object.defineProperty(t, "__esModule", {
      value: !0 }),
    t.Interpreter = void 0;
    var n = i(r(3)),
    s = i(r(9)),
    a = r(10),
    o = r(11);

    function h(e, t) {
      Object.defineProperty(e, "name", {
        value: t,
        writable: !1,
        enumerable: !1,
        configurable: !0 });

    }
    var c = Object.prototype.hasOwnProperty,
    u = Symbol("Break"),
    p = Symbol("Continue"),
    l = Symbol("DefaultCase"),
    d = Symbol("EmptyStatementReturn"),
    f = Symbol("WithScope");

    function m(e) {
      return "function" === typeof e;
    }
    var g = function () {
      function e(e) {
        this.interpreter = e;
      }
      return e.prototype.generator = function () {
        var e = this.interpreter;
        return {
          getOptions: e.getOptions.bind(e),
          getCurrentScope: function () {
            return this.getCurrentScope();
          }.bind(e),
          getGlobalScope: function () {
            return this.getGlobalScope();
          }.bind(e),
          getCurrentContext: function () {
            return this.getCurrentContext();
          }.bind(e),
          getExecStartTime: e.getExecStartTime.bind(e) };

      }, e;
    }();

    function x(e, t, r) {
      if (void 0 === r && (r = !0), !(e instanceof g)) throw new Error("Illegal call");
      if ("string" !== typeof t) return t;
      if (t) {
        var i = e.generator(),
        n = {
          timeout: i.getOptions().timeout,
          _initEnv: function _initEnv() {
            r || this.setCurrentContext(i.getCurrentContext()), this.execStartTime = i.getExecStartTime(), this.execEndTime =
            this.execStartTime;
          } },

        s = r ? i.getGlobalScope() : i.getCurrentScope();
        return new w(s, n).evaluate(t);
      }
    }

    function y(e) {
      if (!(e instanceof g)) throw new Error("Illegal call");
      for (var t = e.generator(), r = arguments.length, i = new Array(r > 1 ? r - 1 : 0), n = 1; n < r; n++) {i[n - 1] =
        arguments[n];}
      var s = i.pop(),
      a = new w(t.getGlobalScope(), t.getOptions()),
      o = "\n\t\t    (function anonymous(" + i.join(",") + "){\n\t\t        " + s + "\n\t\t    });\n\t\t    ";
      return a.evaluate(o);
    }
    Object.defineProperty(x, "__IS_EVAL_FUNC", {
      value: !0,
      writable: !1,
      enumerable: !1,
      configurable: !1 }),
    Object.defineProperty(y, "__IS_FUNCTION_FUNC", {
      value: !0,
      writable: !1,
      enumerable: !1,
      configurable: !1 });

    var v = function v(e) {
      this.value = e;
    },
    b = function b(e) {
      this.value = e;
    },
    S = function S(e) {
      this.value = e;
    },
    _ = function _(e, t, r) {
      void 0 === t && (t = null), this.name = r, this.parent = t, this.data = e, this.labelStack = [];
    };

    function C() {}

    function k(e, t) {
      return void 0 === e && (e = null), new _(Object.create(null), e, t);
    }
    var E = {
      NaN: NaN,
      Infinity: 1 / 0,
      undefined: void 0,
      Object: Object,
      Array: Array,
      String: String,
      Boolean: Boolean,
      Number: Number,
      Date: Date,
      RegExp: RegExp,
      Error: Error,
      URIError: URIError,
      TypeError: TypeError,
      RangeError: RangeError,
      SyntaxError: SyntaxError,
      ReferenceError: ReferenceError,
      Math: Math,
      parseInt: parseInt,
      parseFloat: parseFloat,
      isNaN: isNaN,
      isFinite: isFinite,
      decodeURI: decodeURI,
      decodeURIComponent: decodeURIComponent,
      encodeURI: encodeURI,
      encodeURIComponent: encodeURIComponent,
      escape: escape,
      unescape: unescape,
      eval: x,
      Function: y };

    "undefined" !== typeof JSON && (E.JSON = JSON), "undefined" !== typeof Promise && (E.Promise = Promise),
    "undefined" !== typeof Set && (E.Set = Set), "undefined" !== typeof Map && (E.Map = Map), "undefined" !==
    typeof Symbol && (E.Symbol = Symbol), "undefined" !== typeof Proxy && (E.Proxy = Proxy), "undefined" !== typeof WeakMap && (
    E.WeakMap = WeakMap), "undefined" !== typeof WeakSet && (E.WeakSet = WeakSet), "undefined" !== typeof Reflect && (
    E.Reflect = Reflect);
    var w = function () {
      function e(t, r) {
        void 0 === t && (t = e.global), void 0 === r && (r = {}), this.sourceList = [], this.collectDeclVars = Object.
        create(null), this.collectDeclFuncs = Object.create(null), this.isVarDeclMode = !1, this.lastExecNode =
        null, this.isRunning = !1, this.options = {
          ecmaVersion: r.ecmaVersion || e.ecmaVersion,
          timeout: r.timeout || 0,
          rootContext: r.rootContext,
          globalContextInFunction: void 0 === r.globalContextInFunction ? e.globalContextInFunction : r.globalContextInFunction,
          _initEnv: r._initEnv },
        this.context = t || Object.create(null), this.callStack = [], this.initEnvironment(this.context);
      }
      var t = e.prototype;
      return t.initEnvironment = function (e) {
        var t, r;
        if (e instanceof _) t = e;else
        {
          var i = null,
          n = this.createSuperScope(e);
          this.options.rootContext && (i = new _((r = this.options.rootContext, Object.create(r)), n, "rootScope")),
          t = new _(e, i || n, "globalScope");
        }
        this.globalScope = t, this.currentScope = this.globalScope, this.globalContext = t.data, this.currentContext =
        t.data, this.collectDeclVars = Object.create(null), this.collectDeclFuncs = Object.create(null), this.execStartTime =
        Date.now(), this.execEndTime = this.execStartTime;
        var s = this.options._initEnv;
        s && s.call(this);
      }, t.getExecStartTime = function () {
        return this.execStartTime;
      }, t.getExecutionTime = function () {
        return this.execEndTime - this.execStartTime;
      }, t.setExecTimeout = function (e) {
        void 0 === e && (e = 0), this.options.timeout = e;
      }, t.getOptions = function () {
        return this.options;
      }, t.getGlobalScope = function () {
        return this.globalScope;
      }, t.getCurrentScope = function () {
        return this.currentScope;
      }, t.getCurrentContext = function () {
        return this.currentContext;
      }, t.isInterruptThrow = function (e) {
        return e instanceof o.InterruptThrowError || e instanceof o.InterruptThrowReferenceError || e instanceof o.InterruptThrowSyntaxError;
      }, t.createSuperScope = function (e) {
        var t = (0, s.default)({}, E);
        return Object.keys(t).forEach(function (r) {
          r in e && delete t[r];
        }), new _(t, null, "superScope");
      }, t.setCurrentContext = function (e) {
        this.currentContext = e;
      }, t.setCurrentScope = function (e) {
        this.currentScope = e;
      }, t.evaluate = function (t) {
        var r;
        if (void 0 === t && (t = ""), t) return r = (0, a.parse)(t, {
          ranges: !0,
          locations: !0,
          ecmaVersion: this.options.ecmaVersion || e.ecmaVersion }),
        this.evaluateNode(r, t);
      }, t.appendCode = function (e) {
        return this.evaluate(e);
      }, t.evaluateNode = function (e, t) {
        var r = this;
        void 0 === t && (t = ""), this.value = void 0, this.source = t, this.sourceList.push(t), this.isRunning = !0,
        this.execStartTime = Date.now(), this.execEndTime = this.execStartTime, this.collectDeclVars = Object.create(
        null), this.collectDeclFuncs = Object.create(null);
        var i = this.getCurrentScope(),
        n = this.getCurrentContext(),
        s = i.labelStack.concat([]),
        a = this.callStack.concat([]);
        try {
          var o = this.createClosure(e);
          this.addDeclarationsToScope(this.collectDeclVars, this.collectDeclFuncs, this.getCurrentScope()), o();
        } catch (h) {
          throw h;
        } finally {
          r.setCurrentScope(i), r.setCurrentContext(n), i.labelStack = s, r.callStack = a, this.execEndTime = Date.now();
        }
        return this.isRunning = !1, this.getValue();
      }, t.createErrorMessage = function (e, t, r) {
        var i = e[1].replace("%0", String(t));
        return null !== r && (i += this.getNodePosition(r || this.lastExecNode)), i;
      }, t.createError = function (e, t) {
        return new t(e);
      }, t.createThrowError = function (e, t) {
        return this.createError(e, t);
      }, t.createInternalThrowError = function (e, t, r) {
        return this.createError(this.createErrorMessage(e, t, r), e[2]);
      }, t.checkTimeout = function () {
        if (!this.isRunning) return !1;
        var e = this.options.timeout || 0;
        return Date.now() - this.execStartTime > e;
      }, t.getNodePosition = function (e) {
        if (e) {
          return e.loc ? " [" + e.loc.start.line + ":" + e.loc.start.column + "]" : "";
        }
        return "";
      }, t.createClosure = function (e) {
        var t,r = this;
        switch (e.type) {
          case "BinaryExpression":
            t = this.binaryExpressionHandler(e);
            break;
          case "LogicalExpression":
            t = this.logicalExpressionHandler(e);
            break;
          case "UnaryExpression":
            t = this.unaryExpressionHandler(e);
            break;
          case "UpdateExpression":
            t = this.updateExpressionHandler(e);
            break;
          case "ObjectExpression":
            t = this.objectExpressionHandler(e);
            break;
          case "ArrayExpression":
            t = this.arrayExpressionHandler(e);
            break;
          case "CallExpression":
            t = this.callExpressionHandler(e);
            break;
          case "NewExpression":
            t = this.newExpressionHandler(e);
            break;
          case "MemberExpression":
            t = this.memberExpressionHandler(e);
            break;
          case "ThisExpression":
            t = this.thisExpressionHandler(e);
            break;
          case "SequenceExpression":
            t = this.sequenceExpressionHandler(e);
            break;
          case "Literal":
            t = this.literalHandler(e);
            break;
          case "Identifier":
            t = this.identifierHandler(e);
            break;
          case "AssignmentExpression":
            t = this.assignmentExpressionHandler(e);
            break;
          case "FunctionDeclaration":
            t = this.functionDeclarationHandler(e);
            break;
          case "VariableDeclaration":
            t = this.variableDeclarationHandler(e);
            break;
          case "BlockStatement":
          case "Program":
            t = this.programHandler(e);
            break;
          case "ExpressionStatement":
            t = this.expressionStatementHandler(e);
            break;
          case "EmptyStatement":
            t = this.emptyStatementHandler(e);
            break;
          case "ReturnStatement":
            t = this.returnStatementHandler(e);
            break;
          case "FunctionExpression":
            t = this.functionExpressionHandler(e);
            break;
          case "IfStatement":
            t = this.ifStatementHandler(e);
            break;
          case "ConditionalExpression":
            t = this.conditionalExpressionHandler(e);
            break;
          case "ForStatement":
            t = this.forStatementHandler(e);
            break;
          case "WhileStatement":
            t = this.whileStatementHandler(e);
            break;
          case "DoWhileStatement":
            t = this.doWhileStatementHandler(e);
            break;
          case "ForInStatement":
            t = this.forInStatementHandler(e);
            break;
          case "WithStatement":
            t = this.withStatementHandler(e);
            break;
          case "ThrowStatement":
            t = this.throwStatementHandler(e);
            break;
          case "TryStatement":
            t = this.tryStatementHandler(e);
            break;
          case "ContinueStatement":
            t = this.continueStatementHandler(e);
            break;
          case "BreakStatement":
            t = this.breakStatementHandler(e);
            break;
          case "SwitchStatement":
            t = this.switchStatementHandler(e);
            break;
          case "LabeledStatement":
            t = this.labeledStatementHandler(e);
            break;
          case "DebuggerStatement":
            t = this.debuggerStatementHandler(e);
            break;
          default:
            throw this.createInternalThrowError(o.Messages.NodeTypeSyntaxError, e.type, e);}

        return function () {
          var i = r.options.timeout;
          if (i && i > 0 && r.checkTimeout()) throw r.createInternalThrowError(o.Messages.ExecutionTimeOutError, i,
          null);
          return r.lastExecNode = e, t.apply(void 0, arguments);
        };
      }, t.binaryExpressionHandler = function (e) {
        var t = this,
        r = this.createClosure(e.left),
        i = this.createClosure(e.right);
        return function () {
          var n = r(),
          s = i();
          switch (e.operator) {
            case "==":
              return n == s;
            case "!=":
              return n != s;
            case "===":
              return n === s;
            case "!==":
              return n !== s;
            case "<":
              return n < s;
            case "<=":
              return n <= s;
            case ">":
              return n > s;
            case ">=":
              return n >= s;
            case "<<":
              return n << s;
            case ">>":
              return n >> s;
            case ">>>":
              return n >>> s;
            case "+":
              return n + s;
            case "-":
              return n - s;
            case "*":
              return n * s;
            case "**":
              return Math.pow(n, s);
            case "/":
              return n / s;
            case "%":
              return n % s;
            case "|":
              return n | s;
            case "^":
              return n ^ s;
            case "&":
              return n & s;
            case "in":
              return n in s;
            case "instanceof":
              return n instanceof s;
            default:
              throw t.createInternalThrowError(o.Messages.BinaryOperatorSyntaxError, e.operator, e);}

        };
      }, t.logicalExpressionHandler = function (e) {
        var t = this,
        r = this.createClosure(e.left),
        i = this.createClosure(e.right);
        return function () {
          switch (e.operator) {
            case "||":
              return r() || i();
            case "&&":
              return r() && i();
            default:
              throw t.createInternalThrowError(o.Messages.LogicalOperatorSyntaxError, e.operator, e);}

        };
      }, t.unaryExpressionHandler = function (e) {
        var t = this;
        switch (e.operator) {
          case "delete":
            var r = this.createObjectGetter(e.argument),
            i = this.createNameGetter(e.argument);
            return function () {
              return delete r()[i()];
            };
          default:
            var n;
            if ("typeof" === e.operator && "Identifier" === e.argument.type) {
              var s = this.createObjectGetter(e.argument),
              a = this.createNameGetter(e.argument);
              n = function n() {
                return s()[a()];
              };
            } else n = this.createClosure(e.argument);
            return function () {
              var r = n();
              switch (e.operator) {
                case "-":
                  return -r;
                case "+":
                  return +r;
                case "!":
                  return !r;
                case "~":
                  return ~r;
                case "void":
                  return;
                case "typeof":
                  return typeof r;
                default:
                  throw t.createInternalThrowError(o.Messages.UnaryOperatorSyntaxError, e.operator, e);}

            };}

      }, t.updateExpressionHandler = function (e) {
        var t = this,
        r = this.createObjectGetter(e.argument),
        i = this.createNameGetter(e.argument);
        return function () {
          var n = r(),
          s = i();
          switch (t.assertVariable(n, s, e), e.operator) {
            case "++":
              return e.prefix ? ++n[s] : n[s]++;
            case "--":
              return e.prefix ? --n[s] : n[s]--;
            default:
              throw t.createInternalThrowError(o.Messages.UpdateOperatorSyntaxError, e.operator, e);}

        };
      }, t.objectExpressionHandler = function (e) {
        var t = this,
        r = [];
        var i = Object.create(null);
        return e.properties.forEach(function (e) {
          var n = e.kind,
          s = function (e) {
            return "Identifier" === e.type ? e.name : "Literal" === e.type ? e.value : this.throwError(o.Messages.ObjectStructureSyntaxError,
            e.type, e);
          }(e.key);
          i[s] && "init" !== n || (i[s] = {}), i[s][n] = t.createClosure(e.value), r.push({
            key: s,
            property: e });

        }),
        function () {
          for (var e = {}, t = r.length, n = 0; n < t; n++) {
            var s = r[n],
            a = s.key,
            o = i[a],
            c = o.init ? o.init() : void 0,
            u = o.get ? o.get() : function () {},
            p = o.set ? o.set() : function (e) {};
            if ("set" in o || "get" in o) {
              var l = {
                configurable: !0,
                enumerable: !0,
                get: u,
                set: p };

              Object.defineProperty(e, a, l);
            } else {
              var d = s.property,
              f = d.kind;
              "Identifier" !== d.key.type || "FunctionExpression" !== d.value.type || "init" !== f || d.value.id || h(
              c, d.key.name), e[a] = c;
            }
          }
          return e;
        };
      }, t.arrayExpressionHandler = function (e) {
        var t = this,
        r = e.elements.map(function (e) {
          return e ? t.createClosure(e) : e;
        });
        return function () {
          for (var e = r.length, t = Array(e), i = 0; i < e; i++) {
            var n = r[i];
            n && (t[i] = n());
          }
          return t;
        };
      }, t.safeObjectGet = function (e, t, r) {
        return e[t];
      }, t.createCallFunctionGetter = function (e) {
        var t = this;
        switch (e.type) {
          case "MemberExpression":
            var r = this.createClosure(e.object),
            i = this.createMemberKeyGetter(e),
            n = this.source;
            return function () {
              var s = r(),
              a = i(),
              h = t.safeObjectGet(s, a, e);
              if (!h || !m(h)) {
                var c = n.slice(e.start, e.end);
                throw t.createInternalThrowError(o.Messages.FunctionUndefinedReferenceError, c, e);
              }
              return h.__IS_EVAL_FUNC ? function (e) {
                return h(new g(t), e, !0);
              } : h.__IS_FUNCTION_FUNC ? function () {
                for (var e = arguments.length, r = new Array(e), i = 0; i < e; i++) {r[i] = arguments[i];}
                return h.apply(void 0, [new g(t)].concat(r));
              } : h.bind(s);
            };
          default:
            var s = this.createClosure(e);
            return function () {
              var r = "";
              "Identifier" === e.type && (r = e.name);
              var i = s();
              if (!i || !m(i)) throw t.createInternalThrowError(o.Messages.FunctionUndefinedReferenceError, r, e);
              if ("Identifier" === e.type && i.__IS_EVAL_FUNC && "eval" === r) return function (e) {
                var n = t.getScopeFromName(r, t.getCurrentScope()),
                s = !n.parent || t.globalScope === n || "rootScope" === n.name;
                return i(new g(t), e, !s);
              };
              if (i.__IS_EVAL_FUNC) return function (e) {
                return i(new g(t), e, !0);
              };
              if (i.__IS_FUNCTION_FUNC) return function () {
                for (var e = arguments.length, r = new Array(e), n = 0; n < e; n++) {r[n] = arguments[n];}
                return i.apply(void 0, [new g(t)].concat(r));
              };
              var n = t.options.globalContextInFunction;
              if ("Identifier" === e.type) {
                var a = t.getIdentifierScope(e);
                a.name === f && (n = a.data);
              }
              return i.bind(n);
            };}

      }, t.callExpressionHandler = function (e) {
        var t = this,
        r = this.createCallFunctionGetter(e.callee),
        i = e.arguments.map(function (e) {
          return t.createClosure(e);
        });
        return function () {
          return r().apply(void 0, i.map(function (e) {
            return e();
          }));
        };
      }, t.functionExpressionHandler = function (e) {
        var t = this,
        r = this,
        i = this.source,
        n = this.collectDeclVars,
        s = this.collectDeclFuncs;
        this.collectDeclVars = Object.create(null), this.collectDeclFuncs = Object.create(null);
        var a = e.id ? e.id.name : "",
        o = e.params.length,
        c = e.params.map(function (e) {
          return t.createParamNameGetter(e);
        }),
        u = this.createClosure(e.body),
        p = this.collectDeclVars,
        l = this.collectDeclFuncs;
        return this.collectDeclVars = n, this.collectDeclFuncs = s,
        function () {
          var t = r.getCurrentScope(),
          n = function e() {
            for (var i = arguments.length, n = new Array(i), s = 0; s < i; s++) {n[s] = arguments[s];}
            r.callStack.push("" + a);
            var o = r.getCurrentScope(),
            h = k(t, a);
            r.setCurrentScope(h), r.addDeclarationsToScope(p, l, h), a && (h.data[a] = e), h.data.arguments =
            arguments, c.forEach(function (e, t) {
              h.data[e()] = n[t];
            });
            var d = r.getCurrentContext();
            r.setCurrentContext(this);
            var f = u();
            if (r.setCurrentContext(d), r.setCurrentScope(o), r.callStack.pop(), f instanceof v) return f.value;
          };
          return h(n, a), Object.defineProperty(n, "length", {
            value: o,
            writable: !1,
            enumerable: !1,
            configurable: !0 }),
          Object.defineProperty(n, "toString", {
            value: function value() {
              return i.slice(e.start, e.end);
            },
            writable: !0,
            configurable: !0,
            enumerable: !1 }),
          Object.defineProperty(n, "valueOf", {
            value: function value() {
              return i.slice(e.start, e.end);
            },
            writable: !0,
            configurable: !0,
            enumerable: !1 }),
          n;
        };
      }, t.newExpressionHandler = function (e) {
        var t = this,
        r = this.source,
        i = this.createClosure(e.callee),
        s = e.arguments.map(function (e) {
          return t.createClosure(e);
        });
        return function () {
          var a = i();
          if (!m(a) || a.__IS_EVAL_FUNC) {
            var h = e.callee,
            c = r.slice(h.start, h.end);
            throw t.createInternalThrowError(o.Messages.IsNotConstructor, c, e);
          }
          return a.__IS_FUNCTION_FUNC ? a.apply(void 0, [new g(t)].concat(s.map(function (e) {
            return e();
          }))) : (0, n.default)(a, s.map(function (e) {
            return e();
          }));
        };
      }, t.memberExpressionHandler = function (e) {
        var t = this.createClosure(e.object),
        r = this.createMemberKeyGetter(e);
        return function () {
          return t()[r()];
        };
      }, t.thisExpressionHandler = function (e) {
        var t = this;
        return function () {
          return t.getCurrentContext();
        };
      }, t.sequenceExpressionHandler = function (e) {
        var t = this,
        r = e.expressions.map(function (e) {
          return t.createClosure(e);
        });
        return function () {
          for (var e, t = r.length, i = 0; i < t; i++) {
            e = (0, r[i])();
          }
          return e;
        };
      }, t.literalHandler = function (e) {
        return function () {
          return e.regex ? new RegExp(e.regex.pattern, e.regex.flags) : e.value;
        };
      }, t.identifierHandler = function (e) {
        var t = this;
        return function () {
          var r = t.getCurrentScope(),
          i = t.getScopeDataFromName(e.name, r);
          return t.assertVariable(i, e.name, e), i[e.name];
        };
      }, t.getIdentifierScope = function (e) {
        var t = this.getCurrentScope();
        return this.getScopeFromName(e.name, t);
      }, t.assignmentExpressionHandler = function (e) {
        var t = this;
        "Identifier" !== e.left.type || "FunctionExpression" !== e.right.type || e.right.id || (e.right.id = {
          type: "Identifier",
          name: e.left.name });

        var r = this.createObjectGetter(e.left),
        i = this.createNameGetter(e.left),
        n = this.createClosure(e.right);
        return function () {
          var s = r(),
          a = i(),
          h = n();
          switch ("=" !== e.operator && t.assertVariable(s, a, e), e.operator) {
            case "=":
              return s[a] = h;
            case "+=":
              return s[a] += h;
            case "-=":
              return s[a] -= h;
            case "*=":
              return s[a] *= h;
            case "/=":
              return s[a] /= h;
            case "%=":
              return s[a] %= h;
            case "<<=":
              return s[a] <<= h;
            case ">>=":
              return s[a] >>= h;
            case ">>>=":
              return s[a] >>>= h;
            case "&=":
              return s[a] &= h;
            case "^=":
              return s[a] ^= h;
            case "|=":
              return s[a] |= h;
            default:
              throw t.createInternalThrowError(o.Messages.AssignmentExpressionSyntaxError, e.type, e);}

        };
      }, t.functionDeclarationHandler = function (e) {
        if (e.id) {
          var t = this.functionExpressionHandler(e);
          Object.defineProperty(t, "isFunctionDeclareClosure", {
            value: !0,
            writable: !1,
            configurable: !1,
            enumerable: !1 }),
          this.funcDeclaration(e.id.name, t);
        }
        return function () {
          return d;
        };
      }, t.getVariableName = function (e) {
        if ("Identifier" === e.type) return e.name;
        throw this.createInternalThrowError(o.Messages.VariableTypeSyntaxError, e.type, e);
      }, t.variableDeclarationHandler = function (e) {
        for (var t, r = this, i = [], n = 0; n < e.declarations.length; n++) {
          var s = e.declarations[n];
          this.varDeclaration(this.getVariableName(s.id)), s.init && i.push({
            type: "AssignmentExpression",
            operator: "=",
            left: s.id,
            right: s.init });

        }
        return i.length && (t = this.createClosure({
          type: "BlockStatement",
          body: i })),

        function () {
          if (t) {
            var e = r.isVarDeclMode;
            r.isVarDeclMode = !0, t(), r.isVarDeclMode = e;
          }
          return d;
        };
      }, t.assertVariable = function (e, t, r) {
        if (e === this.globalScope.data && !(t in e)) throw this.createInternalThrowError(o.Messages.VariableUndefinedReferenceError,
        t, r);
      }, t.programHandler = function (e) {
        var t = this,
        r = e.body.map(function (e) {
          return t.createClosure(e);
        });
        return function () {
          for (var e = d, i = 0; i < r.length; i++) {
            var n = r[i],
            s = t.setValue(n());
            if (s !== d && ((e = s) instanceof v || e instanceof b || e instanceof S || e === u || e === p)) break;
          }
          return e;
        };
      }, t.expressionStatementHandler = function (e) {
        return this.createClosure(e.expression);
      }, t.emptyStatementHandler = function (e) {
        return function () {
          return d;
        };
      }, t.returnStatementHandler = function (e) {
        var t = e.argument ? this.createClosure(e.argument) : C;
        return function () {
          return new v(t());
        };
      }, t.ifStatementHandler = function (e) {
        var t = this.createClosure(e.test),
        r = this.createClosure(e.consequent),
        i = e.alternate ? this.createClosure(e.alternate) : function () {
          return d;
        };
        return function () {
          return t() ? r() : i();
        };
      }, t.conditionalExpressionHandler = function (e) {
        return this.ifStatementHandler(e);
      }, t.forStatementHandler = function (e) {
        var t = this,
        r = C,
        i = e.test ? this.createClosure(e.test) : function () {
          return !0;
        },
        n = C,
        s = this.createClosure(e.body);
        return "ForStatement" === e.type && (r = e.init ? this.createClosure(e.init) : r, n = e.update ? this.createClosure(
        e.update) : C),
        function (a) {
          var o,h = d,
          c = "DoWhileStatement" === e.type;
          for (a && "LabeledStatement" === a.type && (o = a.label.name), r(); c || i(); n()) {
            c = !1;
            var l = t.setValue(s());
            if (l !== d && l !== p) {
              if (l === u) break;
              if ((h = l) instanceof S && h.value === o) h = d;else
              if (h instanceof v || h instanceof b || h instanceof S) break;
            }
          }
          return h;
        };
      }, t.whileStatementHandler = function (e) {
        return this.forStatementHandler(e);
      }, t.doWhileStatementHandler = function (e) {
        return this.forStatementHandler(e);
      }, t.forInStatementHandler = function (e) {
        var t = this,
        r = e.left,
        i = this.createClosure(e.right),
        n = this.createClosure(e.body);
        return "VariableDeclaration" === e.left.type && (this.createClosure(e.left)(), r = e.left.declarations[0].id),
        function (e) {
          var s,a,o = d;
          e && "LabeledStatement" === e.type && (s = e.label.name);
          var h = i();
          for (a in h) {
            t.assignmentExpressionHandler({
              type: "AssignmentExpression",
              operator: "=",
              left: r,
              right: {
                type: "Literal",
                value: a } })();


            var c = t.setValue(n());
            if (c !== d && c !== p) {
              if (c === u) break;
              if ((o = c) instanceof S && o.value === s) o = d;else
              if (o instanceof v || o instanceof b || o instanceof S) break;
            }
          }
          return o;
        };
      }, t.withStatementHandler = function (e) {
        var t = this,
        r = this.createClosure(e.object),
        i = this.createClosure(e.body);
        return function () {
          var e = r(),
          n = t.getCurrentScope(),
          s = new _(e, n, f);
          t.setCurrentScope(s);
          var a = t.setValue(i());
          return t.setCurrentScope(n), a;
        };
      }, t.throwStatementHandler = function (e) {
        var t = this,
        r = this.createClosure(e.argument);
        return function () {
          throw t.setValue(void 0), r();
        };
      }, t.tryStatementHandler = function (e) {
        var t = this,
        r = this.createClosure(e.block),
        i = e.handler ? this.catchClauseHandler(e.handler) : null,
        n = e.finalizer ? this.createClosure(e.finalizer) : null;
        return function () {
          var e,s,a = t.getCurrentScope(),
          o = t.getCurrentContext(),
          h = a.labelStack.concat([]),
          c = t.callStack.concat([]),
          u = d,
          p = function p() {
            t.setCurrentScope(a), t.setCurrentContext(o), a.labelStack = h, t.callStack = c;
          };
          try {
            (u = t.setValue(r())) instanceof v && (e = u);
          } catch (l) {
            if (p(), t.isInterruptThrow(l)) throw l;
            if (i) try {
              (u = t.setValue(i(l))) instanceof v && (e = u);
            } catch (l) {
              if (p(), t.isInterruptThrow(l)) throw l;
              s = l;
            }
          }
          if (n) try {
            (u = n()) instanceof v && (e = u);
          } catch (l) {
            if (p(), t.isInterruptThrow(l)) throw l;
            s = l;
          }
          if (s) throw s;
          return e || u;
        };
      }, t.catchClauseHandler = function (e) {
        var t = this,
        r = this.createParamNameGetter(e.param),
        i = this.createClosure(e.body);
        return function (e) {
          var n,s = t.getCurrentScope().data,
          a = r(),
          o = c.call(s, a),
          h = s[a];
          return s[a] = e, n = i(), o ? s[a] = h : delete s[a], n;
        };
      }, t.continueStatementHandler = function (e) {
        return function () {
          return e.label ? new S(e.label.name) : p;
        };
      }, t.breakStatementHandler = function (e) {
        return function () {
          return e.label ? new b(e.label.name) : u;
        };
      }, t.switchStatementHandler = function (e) {
        var t = this,
        r = this.createClosure(e.discriminant),
        i = e.cases.map(function (e) {
          return t.switchCaseHandler(e);
        });
        return function () {
          for (var e, n, s, a = r(), o = !1, h = 0; h < i.length; h++) {
            var c = i[h](),
            f = c.testClosure();
            if (f !== l) {
              if (o || f === a) {
                if (o = !0, (n = t.setValue(c.bodyClosure())) === d) continue;
                if (n === u) break;
                if ((e = n) instanceof v || e instanceof b || e instanceof S || e === p) break;
              }
            } else s = c;
          }!o && s && ((n = t.setValue(s.bodyClosure())) === d || n === u || n === p || (e = n));
          return e;
        };
      }, t.switchCaseHandler = function (e) {
        var t = e.test ? this.createClosure(e.test) : function () {
          return l;
        },
        r = this.createClosure({
          type: "BlockStatement",
          body: e.consequent });

        return function () {
          return {
            testClosure: t,
            bodyClosure: r };

        };
      }, t.labeledStatementHandler = function (e) {
        var t = this,
        r = e.label.name,
        i = this.createClosure(e.body);
        return function () {
          var n,s = t.getCurrentScope();
          return s.labelStack.push(r), (n = i(e)) instanceof b && n.value === r && (n = d), s.labelStack.pop(), n;
        };
      }, t.debuggerStatementHandler = function (e) {
        return function () {
          return d;
        };
      }, t.createParamNameGetter = function (e) {
        if ("Identifier" === e.type) return function () {
          return e.name;
        };
        throw this.createInternalThrowError(o.Messages.ParamTypeSyntaxError, e.type, e);
      }, t.createObjectKeyGetter = function (e) {
        var t;
        return t = "Identifier" === e.type ? function () {
          return e.name;
        } : this.createClosure(e),
        function () {
          return t();
        };
      }, t.createMemberKeyGetter = function (e) {
        return e.computed ? this.createClosure(e.property) : this.createObjectKeyGetter(e.property);
      }, t.createObjectGetter = function (e) {
        var t = this;
        switch (e.type) {
          case "Identifier":
            return function () {
              return t.getScopeDataFromName(e.name, t.getCurrentScope());
            };
          case "MemberExpression":
            return this.createClosure(e.object);
          default:
            throw this.createInternalThrowError(o.Messages.AssignmentTypeSyntaxError, e.type, e);}

      }, t.createNameGetter = function (e) {
        switch (e.type) {
          case "Identifier":
            return function () {
              return e.name;
            };
          case "MemberExpression":
            return this.createMemberKeyGetter(e);
          default:
            throw this.createInternalThrowError(o.Messages.AssignmentTypeSyntaxError, e.type, e);}

      }, t.varDeclaration = function (e) {
        this.collectDeclVars[e] = void 0;
      }, t.funcDeclaration = function (e, t) {
        this.collectDeclFuncs[e] = t;
      }, t.addDeclarationsToScope = function (e, t, r) {
        var i = r.data;
        for (var n in t) {
          var s = t[n];
          i[n] = s ? s() : s;
        }
        for (var a in e) {a in i || (i[a] = void 0);}
      }, t.getScopeValue = function (e, t) {
        return this.getScopeFromName(e, t).data[e];
      }, t.getScopeDataFromName = function (e, t) {
        return this.getScopeFromName(e, t).data;
      }, t.getScopeFromName = function (e, t) {
        var r = t;
        do {
          if (e in r.data) return r;
        } while (r = r.parent);
        return this.globalScope;
      }, t.setValue = function (e) {
        var t = this.callStack.length;
        return this.isVarDeclMode || t || e === d || e === u || e === p || e instanceof b || e instanceof S ? e : (
        this.value = e instanceof v ? e.value : e, e);
      }, t.getValue = function () {
        return this.value;
      }, e;
    }();
    t.Interpreter = w, w.version = "1.4.5", w.eval = x, w.Function = y, w.ecmaVersion = 5, w.globalContextInFunction =
    void 0, w.global = Object.create(null);
  }, function (e, t, r) {
    var i = r(4);

    function n(t, r, s) {
      return !function () {
        if ("undefined" === typeof Reflect || !Reflect.construct) return !1;
        if (Reflect.construct.sham) return !1;
        if ("function" === typeof Proxy) return !0;
        try {
          return Date.prototype.toString.call(Reflect.construct(Date, [], function () {})), !0;
        } catch (e) {
          return !1;
        }
      }() ? e.exports = n = function n(e, t, r) {
        var n = [null];
        n.push.apply(n, t);
        var s = new (Function.bind.apply(e, n))();
        return r && i(s, r.prototype), s;
      } : e.exports = n = Reflect.construct, n.apply(null, arguments);
    }
    e.exports = n;
  }, function (e, t) {
    function r(t, i) {
      return e.exports = r = Object.setPrototypeOf || function (e, t) {
        return e.__proto__ = t, e;
      }, r(t, i);
    }
    e.exports = r;
  }, function (e, t, r) {
    e.exports = r(6);
  }, function (e, t, r) {
    "use strict";
    var i = r(0),
    n = r(7);
    Object.defineProperty(t, "__esModule", {
      value: !0 }),
    Object.defineProperty(t, "Interpreter", {
      enumerable: !0,
      get: function get() {
        return s.Interpreter;
      } }),
    Object.defineProperty(t, "evaluate", {
      enumerable: !0,
      get: function get() {
        return o.default;
      } }),
    Object.defineProperty(t, "Function", {
      enumerable: !0,
      get: function get() {
        return h.default;
      } }),
    t.vm = void 0;
    var s = r(2),
    a = n(r(1));
    t.vm = a;
    var o = i(r(16)),
    h = i(r(17));
  }, function (e, t, r) {
    var i = r(8);

    function n() {
      if ("function" !== typeof WeakMap) return null;
      var e = new WeakMap();
      return n = function n() {
        return e;
      }, e;
    }
    e.exports = function (e) {
      if (e && e.__esModule) return e;
      if (null === e || "object" !== i(e) && "function" !== typeof e) return {
        default: e };

      var t = n();
      if (t && t.has(e)) return t.get(e);
      var r = {},
      s = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var a in e) {
        if (Object.prototype.hasOwnProperty.call(e, a)) {
          var o = s ? Object.getOwnPropertyDescriptor(e, a) : null;
          o && (o.get || o.set) ? Object.defineProperty(r, a, o) : r[a] = e[a];
        }}return r.default = e, t && t.set(e, r), r;
    };
  }, function (e, t) {
    function r(t) {
      return "function" === typeof Symbol && "symbol" === typeof Symbol.iterator ? e.exports = r = function r(e) {
        return typeof e;
      } : e.exports = r = function r(e) {
        return e && "function" === typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" :
        typeof e;
      }, r(t);
    }
    e.exports = r;
  }, function (e, t) {
    function r() {
      return e.exports = r = Object.assign || function (e) {
        for (var t = 1; t < arguments.length; t++) {
          var r = arguments[t];
          for (var i in r) {Object.prototype.hasOwnProperty.call(r, i) && (e[i] = r[i]);}
        }
        return e;
      }, r.apply(this, arguments);
    }
    e.exports = r;
  }, function (e, t, r) {
    "use strict";
    r.r(t), r.d(t, "Node", function () {
      return oe;
    }), r.d(t, "Parser", function () {
      return W;
    }), r.d(t, "Position", function () {
      return O;
    }), r.d(t, "SourceLocation", function () {
      return M;
    }), r.d(t, "TokContext", function () {
      return ue;
    }), r.d(t, "Token", function () {
      return Le;
    }), r.d(t, "TokenType", function () {
      return g;
    }), r.d(t, "defaultOptions", function () {
      return D;
    }), r.d(t, "getLineInfo", function () {
      return R;
    }), r.d(t, "isIdentifierChar", function () {
      return m;
    }), r.d(t, "isIdentifierStart", function () {
      return f;
    }), r.d(t, "isNewLine", function () {
      return E;
    }), r.d(t, "keywordTypes", function () {
      return b;
    }), r.d(t, "lineBreak", function () {
      return C;
    }), r.d(t, "lineBreakG", function () {
      return k;
    }), r.d(t, "nonASCIIwhitespace", function () {
      return w;
    }), r.d(t, "parse", function () {
      return Be;
    }), r.d(t, "parseExpressionAt", function () {
      return Fe;
    }), r.d(t, "tokContexts", function () {
      return pe;
    }), r.d(t, "tokTypes", function () {
      return _;
    }), r.d(t, "tokenizer", function () {
      return He;
    }), r.d(t, "version", function () {
      return De;
    });
    var i = {
      3: "abstract boolean byte char class double enum export extends final float goto implements import int interface long native package private protected public short static super synchronized throws transient volatile",
      5: "class enum extends super const export import",
      6: "enum",
      strict: "implements interface let package private protected public static yield",
      strictBind: "eval arguments" },

    n =
    "break case catch continue debugger default do else finally for function if return switch throw try var while with null true false instanceof typeof void delete new in this",
    s = {
      5: n,
      "5module": n + " export import",
      6: n + " const class extends export import super" },

    a = /^in(stanceof)?$/,
    o =
    "\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0560-\u0588\u05D0-\u05EA\u05EF-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u0860-\u086A\u08A0-\u08B4\u08B6-\u08BD\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u09FC\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E86-\u0E8A\u0E8C-\u0EA3\u0EA5\u0EA7-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1878\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C88\u1C90-\u1CBA\u1CBD-\u1CBF\u1CE9-\u1CEC\u1CEE-\u1CF3\u1CF5\u1CF6\u1CFA\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2118-\u211D\u2124\u2126\u2128\u212A-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309B-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312F\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FEF\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA7BF\uA7C2-\uA7C6\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA8FE\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB67\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC",
    h =
    "\u200C\u200D\xB7\u0300-\u036F\u0387\u0483-\u0487\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u0610-\u061A\u064B-\u0669\u0670\u06D6-\u06DC\u06DF-\u06E4\u06E7\u06E8\u06EA-\u06ED\u06F0-\u06F9\u0711\u0730-\u074A\u07A6-\u07B0\u07C0-\u07C9\u07EB-\u07F3\u07FD\u0816-\u0819\u081B-\u0823\u0825-\u0827\u0829-\u082D\u0859-\u085B\u08D3-\u08E1\u08E3-\u0903\u093A-\u093C\u093E-\u094F\u0951-\u0957\u0962\u0963\u0966-\u096F\u0981-\u0983\u09BC\u09BE-\u09C4\u09C7\u09C8\u09CB-\u09CD\u09D7\u09E2\u09E3\u09E6-\u09EF\u09FE\u0A01-\u0A03\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A66-\u0A71\u0A75\u0A81-\u0A83\u0ABC\u0ABE-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AE2\u0AE3\u0AE6-\u0AEF\u0AFA-\u0AFF\u0B01-\u0B03\u0B3C\u0B3E-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B62\u0B63\u0B66-\u0B6F\u0B82\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD7\u0BE6-\u0BEF\u0C00-\u0C04\u0C3E-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C62\u0C63\u0C66-\u0C6F\u0C81-\u0C83\u0CBC\u0CBE-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CE2\u0CE3\u0CE6-\u0CEF\u0D00-\u0D03\u0D3B\u0D3C\u0D3E-\u0D44\u0D46-\u0D48\u0D4A-\u0D4D\u0D57\u0D62\u0D63\u0D66-\u0D6F\u0D82\u0D83\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DE6-\u0DEF\u0DF2\u0DF3\u0E31\u0E34-\u0E3A\u0E47-\u0E4E\u0E50-\u0E59\u0EB1\u0EB4-\u0EBC\u0EC8-\u0ECD\u0ED0-\u0ED9\u0F18\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F3E\u0F3F\u0F71-\u0F84\u0F86\u0F87\u0F8D-\u0F97\u0F99-\u0FBC\u0FC6\u102B-\u103E\u1040-\u1049\u1056-\u1059\u105E-\u1060\u1062-\u1064\u1067-\u106D\u1071-\u1074\u1082-\u108D\u108F-\u109D\u135D-\u135F\u1369-\u1371\u1712-\u1714\u1732-\u1734\u1752\u1753\u1772\u1773\u17B4-\u17D3\u17DD\u17E0-\u17E9\u180B-\u180D\u1810-\u1819\u18A9\u1920-\u192B\u1930-\u193B\u1946-\u194F\u19D0-\u19DA\u1A17-\u1A1B\u1A55-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AB0-\u1ABD\u1B00-\u1B04\u1B34-\u1B44\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1B82\u1BA1-\u1BAD\u1BB0-\u1BB9\u1BE6-\u1BF3\u1C24-\u1C37\u1C40-\u1C49\u1C50-\u1C59\u1CD0-\u1CD2\u1CD4-\u1CE8\u1CED\u1CF4\u1CF7-\u1CF9\u1DC0-\u1DF9\u1DFB-\u1DFF\u203F\u2040\u2054\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2CEF-\u2CF1\u2D7F\u2DE0-\u2DFF\u302A-\u302F\u3099\u309A\uA620-\uA629\uA66F\uA674-\uA67D\uA69E\uA69F\uA6F0\uA6F1\uA802\uA806\uA80B\uA823-\uA827\uA880\uA881\uA8B4-\uA8C5\uA8D0-\uA8D9\uA8E0-\uA8F1\uA8FF-\uA909\uA926-\uA92D\uA947-\uA953\uA980-\uA983\uA9B3-\uA9C0\uA9D0-\uA9D9\uA9E5\uA9F0-\uA9F9\uAA29-\uAA36\uAA43\uAA4C\uAA4D\uAA50-\uAA59\uAA7B-\uAA7D\uAAB0\uAAB2-\uAAB4\uAAB7\uAAB8\uAABE\uAABF\uAAC1\uAAEB-\uAAEF\uAAF5\uAAF6\uABE3-\uABEA\uABEC\uABED\uABF0-\uABF9\uFB1E\uFE00-\uFE0F\uFE20-\uFE2F\uFE33\uFE34\uFE4D-\uFE4F\uFF10-\uFF19\uFF3F",
    c = new RegExp("[" + o + "]"),
    u = new RegExp("[" + o + h + "]");
    o = h = null;
    var p = [0, 11, 2, 25, 2, 18, 2, 1, 2, 14, 3, 13, 35, 122, 70, 52, 268, 28, 4, 48, 48, 31, 14, 29, 6, 37, 11, 29,
    3, 35, 5, 7, 2, 4, 43, 157, 19, 35, 5, 35, 5, 39, 9, 51, 157, 310, 10, 21, 11, 7, 153, 5, 3, 0, 2, 43, 2, 1, 4,
    0, 3, 22, 11, 22, 10, 30, 66, 18, 2, 1, 11, 21, 11, 25, 71, 55, 7, 1, 65, 0, 16, 3, 2, 2, 2, 28, 43, 28, 4, 28,
    36, 7, 2, 27, 28, 53, 11, 21, 11, 18, 14, 17, 111, 72, 56, 50, 14, 50, 14, 35, 477, 28, 11, 0, 9, 21, 155, 22,
    13, 52, 76, 44, 33, 24, 27, 35, 30, 0, 12, 34, 4, 0, 13, 47, 15, 3, 22, 0, 2, 0, 36, 17, 2, 24, 85, 6, 2, 0, 2,
    3, 2, 14, 2, 9, 8, 46, 39, 7, 3, 1, 3, 21, 2, 6, 2, 1, 2, 4, 4, 0, 19, 0, 13, 4, 159, 52, 19, 3, 21, 0, 33, 47,
    21, 1, 2, 0, 185, 46, 42, 3, 37, 47, 21, 0, 60, 42, 14, 0, 72, 26, 230, 43, 117, 63, 32, 0, 161, 7, 3, 38, 17,
    0, 2, 0, 29, 0, 11, 39, 8, 0, 22, 0, 12, 45, 20, 0, 35, 56, 264, 8, 2, 36, 18, 0, 50, 29, 113, 6, 2, 1, 2, 37,
    22, 0, 26, 5, 2, 1, 2, 31, 15, 0, 328, 18, 270, 921, 103, 110, 18, 195, 2749, 1070, 4050, 582, 8634, 568, 8,
    30, 114, 29, 19, 47, 17, 3, 32, 20, 6, 18, 689, 63, 129, 74, 6, 0, 67, 12, 65, 1, 2, 0, 29, 6135, 9, 754, 9486,
    286, 50, 2, 18, 3, 9, 395, 2309, 106, 6, 12, 4, 8, 8, 9, 5991, 84, 2, 70, 2, 1, 3, 0, 3, 1, 3, 3, 2, 11, 2, 0,
    2, 6, 2, 64, 2, 3, 3, 7, 2, 6, 2, 27, 2, 3, 2, 4, 2, 0, 4, 6, 2, 339, 3, 24, 2, 24, 2, 30, 2, 24, 2, 30, 2, 24,
    2, 30, 2, 24, 2, 30, 2, 24, 2, 7, 2357, 44, 11, 6, 17, 0, 370, 43, 1301, 196, 60, 67, 8, 0, 1205, 3, 2, 26, 2,
    1, 2, 0, 3, 0, 2, 9, 2, 3, 2, 0, 2, 0, 7, 0, 5, 0, 2, 0, 2, 0, 2, 2, 2, 1, 2, 0, 3, 0, 2, 0, 2, 0, 2, 0, 2, 0,
    2, 1, 2, 0, 3, 3, 2, 6, 2, 3, 2, 3, 2, 0, 2, 9, 2, 16, 6, 2, 2, 4, 2, 16, 4421, 42710, 42, 4148, 12, 221, 3,
    5761, 15, 7472, 3104, 541],

    l = [509, 0, 227, 0, 150, 4, 294, 9, 1368, 2, 2, 1, 6, 3, 41, 2, 5, 0, 166, 1, 574, 3, 9, 9, 525, 10, 176, 2,
    54, 14, 32, 9, 16, 3, 46, 10, 54, 9, 7, 2, 37, 13, 2, 9, 6, 1, 45, 0, 13, 2, 49, 13, 9, 3, 4, 9, 83, 11, 7, 0,
    161, 11, 6, 9, 7, 3, 56, 1, 2, 6, 3, 1, 3, 2, 10, 0, 11, 1, 3, 6, 4, 4, 193, 17, 10, 9, 5, 0, 82, 19, 13, 9,
    214, 6, 3, 8, 28, 1, 83, 16, 16, 9, 82, 12, 9, 9, 84, 14, 5, 9, 243, 14, 166, 9, 232, 6, 3, 6, 4, 0, 29, 9, 41,
    6, 2, 3, 9, 0, 10, 10, 47, 15, 406, 7, 2, 7, 17, 9, 57, 21, 2, 13, 123, 5, 4, 0, 2, 1, 2, 6, 2, 0, 9, 9, 49, 4,
    2, 1, 2, 4, 9, 9, 330, 3, 19306, 9, 135, 4, 60, 6, 26, 9, 1014, 0, 2, 54, 8, 3, 19723, 1, 5319, 4, 4, 5, 9, 7,
    3, 6, 31, 3, 149, 2, 1418, 49, 513, 54, 5, 49, 9, 0, 15, 0, 23, 4, 2, 14, 1361, 6, 2, 16, 3, 6, 2, 1, 2, 4,
    262, 6, 10, 9, 419, 13, 1495, 6, 110, 6, 6, 9, 792487, 239];


    function d(e, t) {
      for (var r = 65536, i = 0; i < t.length; i += 2) {
        if ((r += t[i]) > e) return !1;
        if ((r += t[i + 1]) >= e) return !0;
      }
    }

    function f(e, t) {
      return e < 65 ? 36 === e : e < 91 || (e < 97 ? 95 === e : e < 123 || (e <= 65535 ? e >= 170 && c.test(String.fromCharCode(
      e)) : !1 !== t && d(e, p)));
    }

    function m(e, t) {
      return e < 48 ? 36 === e : e < 58 || !(e < 65) && (e < 91 || (e < 97 ? 95 === e : e < 123 || (e <= 65535 ? e >=
      170 && u.test(String.fromCharCode(e)) : !1 !== t && (d(e, p) || d(e, l)))));
    }
    var g = function g(e, t) {
      void 0 === t && (t = {}), this.label = e, this.keyword = t.keyword, this.beforeExpr = !!t.beforeExpr, this.startsExpr = !
      !t.startsExpr, this.isLoop = !!t.isLoop, this.isAssign = !!t.isAssign, this.prefix = !!t.prefix, this.postfix = !
      !t.postfix, this.binop = t.binop || null, this.updateContext = null;
    };

    function x(e, t) {
      return new g(e, {
        beforeExpr: !0,
        binop: t });

    }
    var y = {
      beforeExpr: !0 },

    v = {
      startsExpr: !0 },

    b = {};

    function S(e, t) {
      return void 0 === t && (t = {}), t.keyword = e, b[e] = new g(e, t);
    }
    var _ = {
      num: new g("num", v),
      regexp: new g("regexp", v),
      string: new g("string", v),
      name: new g("name", v),
      eof: new g("eof"),
      bracketL: new g("[", {
        beforeExpr: !0,
        startsExpr: !0 }),

      bracketR: new g("]"),
      braceL: new g("{", {
        beforeExpr: !0,
        startsExpr: !0 }),

      braceR: new g("}"),
      parenL: new g("(", {
        beforeExpr: !0,
        startsExpr: !0 }),

      parenR: new g(")"),
      comma: new g(",", y),
      semi: new g(";", y),
      colon: new g(":", y),
      dot: new g("."),
      question: new g("?", y),
      arrow: new g("=>", y),
      template: new g("template"),
      invalidTemplate: new g("invalidTemplate"),
      ellipsis: new g("...", y),
      backQuote: new g("`", v),
      dollarBraceL: new g("${", {
        beforeExpr: !0,
        startsExpr: !0 }),

      eq: new g("=", {
        beforeExpr: !0,
        isAssign: !0 }),

      assign: new g("_=", {
        beforeExpr: !0,
        isAssign: !0 }),

      incDec: new g("++/--", {
        prefix: !0,
        postfix: !0,
        startsExpr: !0 }),

      prefix: new g("!/~", {
        beforeExpr: !0,
        prefix: !0,
        startsExpr: !0 }),

      logicalOR: x("||", 1),
      logicalAND: x("&&", 2),
      bitwiseOR: x("|", 3),
      bitwiseXOR: x("^", 4),
      bitwiseAND: x("&", 5),
      equality: x("==/!=/===/!==", 6),
      relational: x("</>/<=/>=", 7),
      bitShift: x("<</>>/>>>", 8),
      plusMin: new g("+/-", {
        beforeExpr: !0,
        binop: 9,
        prefix: !0,
        startsExpr: !0 }),

      modulo: x("%", 10),
      star: x("*", 10),
      slash: x("/", 10),
      starstar: new g("**", {
        beforeExpr: !0 }),

      _break: S("break"),
      _case: S("case", y),
      _catch: S("catch"),
      _continue: S("continue"),
      _debugger: S("debugger"),
      _default: S("default", y),
      _do: S("do", {
        isLoop: !0,
        beforeExpr: !0 }),

      _else: S("else", y),
      _finally: S("finally"),
      _for: S("for", {
        isLoop: !0 }),

      _function: S("function", v),
      _if: S("if"),
      _return: S("return", y),
      _switch: S("switch"),
      _throw: S("throw", y),
      _try: S("try"),
      _var: S("var"),
      _const: S("const"),
      _while: S("while", {
        isLoop: !0 }),

      _with: S("with"),
      _new: S("new", {
        beforeExpr: !0,
        startsExpr: !0 }),

      _this: S("this", v),
      _super: S("super", v),
      _class: S("class", v),
      _extends: S("extends", y),
      _export: S("export"),
      _import: S("import", v),
      _null: S("null", v),
      _true: S("true", v),
      _false: S("false", v),
      _in: S("in", {
        beforeExpr: !0,
        binop: 7 }),

      _instanceof: S("instanceof", {
        beforeExpr: !0,
        binop: 7 }),

      _typeof: S("typeof", {
        beforeExpr: !0,
        prefix: !0,
        startsExpr: !0 }),

      _void: S("void", {
        beforeExpr: !0,
        prefix: !0,
        startsExpr: !0 }),

      _delete: S("delete", {
        beforeExpr: !0,
        prefix: !0,
        startsExpr: !0 }) },


    C = /\r\n?|\n|\u2028|\u2029/,
    k = new RegExp(C.source, "g");

    function E(e, t) {
      return 10 === e || 13 === e || !t && (8232 === e || 8233 === e);
    }
    var w = /[\u1680\u2000-\u200a\u202f\u205f\u3000\ufeff]/,
    I = /(?:\s|\/\/.*|\/\*[^]*?\*\/)*/g,
    T = Object.prototype,
    P = T.hasOwnProperty,
    A = T.toString;

    function N(e, t) {
      return P.call(e, t);
    }
    var V = Array.isArray || function (e) {
      return "[object Array]" === A.call(e);
    };

    function L(e) {
      return new RegExp("^(?:" + e.replace(/ /g, "|") + ")$");
    }
    var O = function O(e, t) {
      this.line = e, this.column = t;
    };
    O.prototype.offset = function (e) {
      return new O(this.line, this.column + e);
    };
    var M = function M(e, t, r) {
      this.start = t, this.end = r, null !== e.sourceFile && (this.source = e.sourceFile);
    };

    function R(e, t) {
      for (var r = 1, i = 0;;) {
        k.lastIndex = i;
        var n = k.exec(e);
        if (!(n && n.index < t)) return new O(r, t - i);
        ++r, i = n.index + n[0].length;
      }
    }
    var D = {
      ecmaVersion: 10,
      sourceType: "script",
      onInsertedSemicolon: null,
      onTrailingComma: null,
      allowReserved: null,
      allowReturnOutsideFunction: !1,
      allowImportExportEverywhere: !1,
      allowAwaitOutsideFunction: !1,
      allowHashBang: !1,
      locations: !1,
      onToken: null,
      onComment: null,
      ranges: !1,
      program: null,
      sourceFile: null,
      directSourceFile: null,
      preserveParens: !1 };


    function B(e) {
      var t = {};
      for (var r in D) {t[r] = e && N(e, r) ? e[r] : D[r];}
      if (t.ecmaVersion >= 2015 && (t.ecmaVersion -= 2009), null == t.allowReserved && (t.allowReserved = t.ecmaVersion <
      5), V(t.onToken)) {
        var i = t.onToken;
        t.onToken = function (e) {
          return i.push(e);
        };
      }
      return V(t.onComment) && (t.onComment = function (e, t) {
        return function (r, i, n, s, a, o) {
          var h = {
            type: r ? "Block" : "Line",
            value: i,
            start: n,
            end: s };

          e.locations && (h.loc = new M(this, a, o)), e.ranges && (h.range = [n, s]), t.push(h);
        };
      }(t, t.onComment)), t;
    }
    var F = 2,
    H = 1 | F,
    U = 4,
    j = 8;

    function G(e, t) {
      return F | (e ? U : 0) | (t ? j : 0);
    }
    var W = function W(e, t, r) {
      this.options = e = B(e), this.sourceFile = e.sourceFile, this.keywords = L(s[e.ecmaVersion >= 6 ? 6 : "module" ===
      e.sourceType ? "5module" : 5]);
      var n = "";
      if (!0 !== e.allowReserved) {
        for (var a = e.ecmaVersion; !(n = i[a]); a--) {;}
        "module" === e.sourceType && (n += " await");
      }
      this.reservedWords = L(n);
      var o = (n ? n + " " : "") + i.strict;
      this.reservedWordsStrict = L(o), this.reservedWordsStrictBind = L(o + " " + i.strictBind), this.input = String(
      t), this.containsEsc = !1, r ? (this.pos = r, this.lineStart = this.input.lastIndexOf("\n", r - 1) + 1, this.
      curLine = this.input.slice(0, this.lineStart).split(C).length) : (this.pos = this.lineStart = 0, this.curLine =
      1), this.type = _.eof, this.value = null, this.start = this.end = this.pos, this.startLoc = this.endLoc =
      this.curPosition(), this.lastTokEndLoc = this.lastTokStartLoc = null, this.lastTokStart = this.lastTokEnd =
      this.pos, this.context = this.initialContext(), this.exprAllowed = !0, this.inModule = "module" === e.sourceType,
      this.strict = this.inModule || this.strictDirective(this.pos), this.potentialArrowAt = -1, this.yieldPos =
      this.awaitPos = this.awaitIdentPos = 0, this.labels = [], this.undefinedExports = {}, 0 === this.pos && e.allowHashBang &&
      "#!" === this.input.slice(0, 2) && this.skipLineComment(2), this.scopeStack = [], this.enterScope(1), this.regexpState =
      null;
    },
    q = {
      inFunction: {
        configurable: !0 },

      inGenerator: {
        configurable: !0 },

      inAsync: {
        configurable: !0 },

      allowSuper: {
        configurable: !0 },

      allowDirectSuper: {
        configurable: !0 },

      treatFunctionsAsVar: {
        configurable: !0 } };


    W.prototype.parse = function () {
      var e = this.options.program || this.startNode();
      return this.nextToken(), this.parseTopLevel(e);
    }, q.inFunction.get = function () {
      return (this.currentVarScope().flags & F) > 0;
    }, q.inGenerator.get = function () {
      return (this.currentVarScope().flags & j) > 0;
    }, q.inAsync.get = function () {
      return (this.currentVarScope().flags & U) > 0;
    }, q.allowSuper.get = function () {
      return (64 & this.currentThisScope().flags) > 0;
    }, q.allowDirectSuper.get = function () {
      return (128 & this.currentThisScope().flags) > 0;
    }, q.treatFunctionsAsVar.get = function () {
      return this.treatFunctionsAsVarInScope(this.currentScope());
    }, W.prototype.inNonArrowFunction = function () {
      return (this.currentThisScope().flags & F) > 0;
    }, W.extend = function () {
      for (var e = [], t = arguments.length; t--;) {e[t] = arguments[t];}
      for (var r = this, i = 0; i < e.length; i++) {r = e[i](r);}
      return r;
    }, W.parse = function (e, t) {
      return new this(t, e).parse();
    }, W.parseExpressionAt = function (e, t, r) {
      var i = new this(r, e, t);
      return i.nextToken(), i.parseExpression();
    }, W.tokenizer = function (e, t) {
      return new this(t, e);
    }, Object.defineProperties(W.prototype, q);
    var K = W.prototype,
    z = /^(?:'((?:\\.|[^'])*?)'|"((?:\\.|[^"])*?)")/;

    function Q() {
      this.shorthandAssign = this.trailingComma = this.parenthesizedAssign = this.parenthesizedBind = this.doubleProto = -
      1;
    }
    K.strictDirective = function (e) {
      for (;;) {
        I.lastIndex = e, e += I.exec(this.input)[0].length;
        var t = z.exec(this.input.slice(e));
        if (!t) return !1;
        if ("use strict" === (t[1] || t[2])) return !0;
        e += t[0].length, I.lastIndex = e, e += I.exec(this.input)[0].length, ";" === this.input[e] && e++;
      }
    }, K.eat = function (e) {
      return this.type === e && (this.next(), !0);
    }, K.isContextual = function (e) {
      return this.type === _.name && this.value === e && !this.containsEsc;
    }, K.eatContextual = function (e) {
      return !!this.isContextual(e) && (this.next(), !0);
    }, K.expectContextual = function (e) {
      this.eatContextual(e) || this.unexpected();
    }, K.canInsertSemicolon = function () {
      return this.type === _.eof || this.type === _.braceR || C.test(this.input.slice(this.lastTokEnd, this.start));
    }, K.insertSemicolon = function () {
      if (this.canInsertSemicolon()) return this.options.onInsertedSemicolon && this.options.onInsertedSemicolon(
      this.lastTokEnd, this.lastTokEndLoc), !0;
    }, K.semicolon = function () {
      this.eat(_.semi) || this.insertSemicolon() || this.unexpected();
    }, K.afterTrailingComma = function (e, t) {
      if (this.type === e) return this.options.onTrailingComma && this.options.onTrailingComma(this.lastTokStart,
      this.lastTokStartLoc), t || this.next(), !0;
    }, K.expect = function (e) {
      this.eat(e) || this.unexpected();
    }, K.unexpected = function (e) {
      this.raise(null != e ? e : this.start, "Unexpected token");
    }, K.checkPatternErrors = function (e, t) {
      if (e) {
        e.trailingComma > -1 && this.raiseRecoverable(e.trailingComma,
        "Comma is not permitted after the rest element");
        var r = t ? e.parenthesizedAssign : e.parenthesizedBind;
        r > -1 && this.raiseRecoverable(r, "Parenthesized pattern");
      }
    }, K.checkExpressionErrors = function (e, t) {
      if (!e) return !1;
      var r = e.shorthandAssign,
      i = e.doubleProto;
      if (!t) return r >= 0 || i >= 0;
      r >= 0 && this.raise(r, "Shorthand property assignments are valid only in destructuring patterns"), i >= 0 &&
      this.raiseRecoverable(i, "Redefinition of __proto__ property");
    }, K.checkYieldAwaitInDefaultParams = function () {
      this.yieldPos && (!this.awaitPos || this.yieldPos < this.awaitPos) && this.raise(this.yieldPos,
      "Yield expression cannot be a default value"), this.awaitPos && this.raise(this.awaitPos,
      "Await expression cannot be a default value");
    }, K.isSimpleAssignTarget = function (e) {
      return "ParenthesizedExpression" === e.type ? this.isSimpleAssignTarget(e.expression) : "Identifier" === e.type ||
      "MemberExpression" === e.type;
    };
    var X = W.prototype;
    X.parseTopLevel = function (e) {
      var t = {};
      for (e.body || (e.body = []); this.type !== _.eof;) {
        var r = this.parseStatement(null, !0, t);
        e.body.push(r);
      }
      if (this.inModule)
      for (var i = 0, n = Object.keys(this.undefinedExports); i < n.length; i += 1) {
        var s = n[i];
        this.raiseRecoverable(this.undefinedExports[s].start, "Export '" + s + "' is not defined");
      }
      return this.adaptDirectivePrologue(e.body), this.next(), e.sourceType = this.options.sourceType, this.finishNode(
      e, "Program");
    };
    var Z = {
      kind: "loop" },

    Y = {
      kind: "switch" };

    X.isLet = function (e) {
      if (this.options.ecmaVersion < 6 || !this.isContextual("let")) return !1;
      I.lastIndex = this.pos;
      var t = I.exec(this.input),
      r = this.pos + t[0].length,
      i = this.input.charCodeAt(r);
      if (91 === i) return !0;
      if (e) return !1;
      if (123 === i) return !0;
      if (f(i, !0)) {
        for (var n = r + 1; m(this.input.charCodeAt(n), !0);) {++n;}
        var s = this.input.slice(r, n);
        if (!a.test(s)) return !0;
      }
      return !1;
    }, X.isAsyncFunction = function () {
      if (this.options.ecmaVersion < 8 || !this.isContextual("async")) return !1;
      I.lastIndex = this.pos;
      var e = I.exec(this.input),
      t = this.pos + e[0].length;
      return !C.test(this.input.slice(this.pos, t)) && "function" === this.input.slice(t, t + 8) && (t + 8 === this.input.
      length || !m(this.input.charAt(t + 8)));
    }, X.parseStatement = function (e, t, r) {
      var i,n = this.type,
      s = this.startNode();
      switch (this.isLet(e) && (n = _._var, i = "let"), n) {
        case _._break:
        case _._continue:
          return this.parseBreakContinueStatement(s, n.keyword);
        case _._debugger:
          return this.parseDebuggerStatement(s);
        case _._do:
          return this.parseDoStatement(s);
        case _._for:
          return this.parseForStatement(s);
        case _._function:
          return e && (this.strict || "if" !== e && "label" !== e) && this.options.ecmaVersion >= 6 && this.unexpected(),
          this.parseFunctionStatement(s, !1, !e);
        case _._class:
          return e && this.unexpected(), this.parseClass(s, !0);
        case _._if:
          return this.parseIfStatement(s);
        case _._return:
          return this.parseReturnStatement(s);
        case _._switch:
          return this.parseSwitchStatement(s);
        case _._throw:
          return this.parseThrowStatement(s);
        case _._try:
          return this.parseTryStatement(s);
        case _._const:
        case _._var:
          return i = i || this.value, e && "var" !== i && this.unexpected(), this.parseVarStatement(s, i);
        case _._while:
          return this.parseWhileStatement(s);
        case _._with:
          return this.parseWithStatement(s);
        case _.braceL:
          return this.parseBlock(!0, s);
        case _.semi:
          return this.parseEmptyStatement(s);
        case _._export:
        case _._import:
          if (this.options.ecmaVersion > 10 && n === _._import) {
            I.lastIndex = this.pos;
            var a = I.exec(this.input),
            o = this.pos + a[0].length;
            if (40 === this.input.charCodeAt(o)) return this.parseExpressionStatement(s, this.parseExpression());
          }
          return this.options.allowImportExportEverywhere || (t || this.raise(this.start,
          "'import' and 'export' may only appear at the top level"), this.inModule || this.raise(this.start,
          "'import' and 'export' may appear only with 'sourceType: module'")), n === _._import ? this.parseImport(s) :
          this.parseExport(s, r);
        default:
          if (this.isAsyncFunction()) return e && this.unexpected(), this.next(), this.parseFunctionStatement(s, !0, !
          e);
          var h = this.value,
          c = this.parseExpression();
          return n === _.name && "Identifier" === c.type && this.eat(_.colon) ? this.parseLabeledStatement(s, h, c, e) :
          this.parseExpressionStatement(s, c);}

    }, X.parseBreakContinueStatement = function (e, t) {
      var r = "break" === t;
      this.next(), this.eat(_.semi) || this.insertSemicolon() ? e.label = null : this.type !== _.name ? this.unexpected() : (
      e.label = this.parseIdent(), this.semicolon());
      for (var i = 0; i < this.labels.length; ++i) {
        var n = this.labels[i];
        if (null == e.label || n.name === e.label.name) {
          if (null != n.kind && (r || "loop" === n.kind)) break;
          if (e.label && r) break;
        }
      }
      return i === this.labels.length && this.raise(e.start, "Unsyntactic " + t), this.finishNode(e, r ?
      "BreakStatement" : "ContinueStatement");
    }, X.parseDebuggerStatement = function (e) {
      return this.next(), this.semicolon(), this.finishNode(e, "DebuggerStatement");
    }, X.parseDoStatement = function (e) {
      return this.next(), this.labels.push(Z), e.body = this.parseStatement("do"), this.labels.pop(), this.expect(_._while),
      e.test = this.parseParenExpression(), this.options.ecmaVersion >= 6 ? this.eat(_.semi) : this.semicolon(),
      this.finishNode(e, "DoWhileStatement");
    }, X.parseForStatement = function (e) {
      this.next();
      var t = this.options.ecmaVersion >= 9 && (this.inAsync || !this.inFunction && this.options.allowAwaitOutsideFunction) &&
      this.eatContextual("await") ? this.lastTokStart : -1;
      if (this.labels.push(Z), this.enterScope(0), this.expect(_.parenL), this.type === _.semi) return t > -1 &&
      this.unexpected(t), this.parseFor(e, null);
      var r = this.isLet();
      if (this.type === _._var || this.type === _._const || r) {
        var i = this.startNode(),
        n = r ? "let" : this.value;
        return this.next(), this.parseVar(i, !0, n), this.finishNode(i, "VariableDeclaration"), (this.type === _._in ||
        this.options.ecmaVersion >= 6 && this.isContextual("of")) && 1 === i.declarations.length ? (this.options.ecmaVersion >=
        9 && (this.type === _._in ? t > -1 && this.unexpected(t) : e.await = t > -1), this.parseForIn(e, i)) : (t >
        -1 && this.unexpected(t), this.parseFor(e, i));
      }
      var s = new Q(),
      a = this.parseExpression(!0, s);
      return this.type === _._in || this.options.ecmaVersion >= 6 && this.isContextual("of") ? (this.options.ecmaVersion >=
      9 && (this.type === _._in ? t > -1 && this.unexpected(t) : e.await = t > -1), this.toAssignable(a, !1, s),
      this.checkLVal(a), this.parseForIn(e, a)) : (this.checkExpressionErrors(s, !0), t > -1 && this.unexpected(t),
      this.parseFor(e, a));
    }, X.parseFunctionStatement = function (e, t, r) {
      return this.next(), this.parseFunction(e, $ | (r ? 0 : ee), !1, t);
    }, X.parseIfStatement = function (e) {
      return this.next(), e.test = this.parseParenExpression(), e.consequent = this.parseStatement("if"), e.alternate =
      this.eat(_._else) ? this.parseStatement("if") : null, this.finishNode(e, "IfStatement");
    }, X.parseReturnStatement = function (e) {
      return this.inFunction || this.options.allowReturnOutsideFunction || this.raise(this.start,
      "'return' outside of function"), this.next(), this.eat(_.semi) || this.insertSemicolon() ? e.argument = null : (
      e.argument = this.parseExpression(), this.semicolon()), this.finishNode(e, "ReturnStatement");
    }, X.parseSwitchStatement = function (e) {
      var t;
      this.next(), e.discriminant = this.parseParenExpression(), e.cases = [], this.expect(_.braceL), this.labels.push(
      Y), this.enterScope(0);
      for (var r = !1; this.type !== _.braceR;) {
        if (this.type === _._case || this.type === _._default) {
          var i = this.type === _._case;
          t && this.finishNode(t, "SwitchCase"), e.cases.push(t = this.startNode()), t.consequent = [], this.next(), i ?
          t.test = this.parseExpression() : (r && this.raiseRecoverable(this.lastTokStart, "Multiple default clauses"),
          r = !0, t.test = null), this.expect(_.colon);
        } else t || this.unexpected(), t.consequent.push(this.parseStatement(null));}
      return this.exitScope(), t && this.finishNode(t, "SwitchCase"), this.next(), this.labels.pop(), this.finishNode(
      e, "SwitchStatement");
    }, X.parseThrowStatement = function (e) {
      return this.next(), C.test(this.input.slice(this.lastTokEnd, this.start)) && this.raise(this.lastTokEnd,
      "Illegal newline after throw"), e.argument = this.parseExpression(), this.semicolon(), this.finishNode(e,
      "ThrowStatement");
    };
    var J = [];
    X.parseTryStatement = function (e) {
      if (this.next(), e.block = this.parseBlock(), e.handler = null, this.type === _._catch) {
        var t = this.startNode();
        if (this.next(), this.eat(_.parenL)) {
          t.param = this.parseBindingAtom();
          var r = "Identifier" === t.param.type;
          this.enterScope(r ? 32 : 0), this.checkLVal(t.param, r ? 4 : 2), this.expect(_.parenR);
        } else this.options.ecmaVersion < 10 && this.unexpected(), t.param = null, this.enterScope(0);
        t.body = this.parseBlock(!1), this.exitScope(), e.handler = this.finishNode(t, "CatchClause");
      }
      return e.finalizer = this.eat(_._finally) ? this.parseBlock() : null, e.handler || e.finalizer || this.raise(e.
      start, "Missing catch or finally clause"), this.finishNode(e, "TryStatement");
    }, X.parseVarStatement = function (e, t) {
      return this.next(), this.parseVar(e, !1, t), this.semicolon(), this.finishNode(e, "VariableDeclaration");
    }, X.parseWhileStatement = function (e) {
      return this.next(), e.test = this.parseParenExpression(), this.labels.push(Z), e.body = this.parseStatement(
      "while"), this.labels.pop(), this.finishNode(e, "WhileStatement");
    }, X.parseWithStatement = function (e) {
      return this.strict && this.raise(this.start, "'with' in strict mode"), this.next(), e.object = this.parseParenExpression(),
      e.body = this.parseStatement("with"), this.finishNode(e, "WithStatement");
    }, X.parseEmptyStatement = function (e) {
      return this.next(), this.finishNode(e, "EmptyStatement");
    }, X.parseLabeledStatement = function (e, t, r, i) {
      for (var n = 0, s = this.labels; n < s.length; n += 1) {
        s[n].name === t && this.raise(r.start, "Label '" + t + "' is already declared");
      }
      for (var a = this.type.isLoop ? "loop" : this.type === _._switch ? "switch" : null, o = this.labels.length - 1; o >=
      0; o--) {
        var h = this.labels[o];
        if (h.statementStart !== e.start) break;
        h.statementStart = this.start, h.kind = a;
      }
      return this.labels.push({
        name: t,
        kind: a,
        statementStart: this.start }),
      e.body = this.parseStatement(i ? -1 === i.indexOf("label") ? i + "label" : i : "label"), this.labels.pop(),
      e.label = r, this.finishNode(e, "LabeledStatement");
    }, X.parseExpressionStatement = function (e, t) {
      return e.expression = t, this.semicolon(), this.finishNode(e, "ExpressionStatement");
    }, X.parseBlock = function (e, t) {
      for (void 0 === e && (e = !0), void 0 === t && (t = this.startNode()), t.body = [], this.expect(_.braceL), e &&
      this.enterScope(0); !this.eat(_.braceR);) {
        var r = this.parseStatement(null);
        t.body.push(r);
      }
      return e && this.exitScope(), this.finishNode(t, "BlockStatement");
    }, X.parseFor = function (e, t) {
      return e.init = t, this.expect(_.semi), e.test = this.type === _.semi ? null : this.parseExpression(), this.expect(
      _.semi), e.update = this.type === _.parenR ? null : this.parseExpression(), this.expect(_.parenR), e.body =
      this.parseStatement("for"), this.exitScope(), this.labels.pop(), this.finishNode(e, "ForStatement");
    }, X.parseForIn = function (e, t) {
      var r = this.type === _._in;
      return this.next(), "VariableDeclaration" === t.type && null != t.declarations[0].init && (!r || this.options.ecmaVersion <
      8 || this.strict || "var" !== t.kind || "Identifier" !== t.declarations[0].id.type) ? this.raise(t.start, (r ?
      "for-in" : "for-of") + " loop variable declaration may not have an initializer") : "AssignmentPattern" ===
      t.type && this.raise(t.start, "Invalid left-hand side in for-loop"), e.left = t, e.right = r ? this.parseExpression() :
      this.parseMaybeAssign(), this.expect(_.parenR), e.body = this.parseStatement("for"), this.exitScope(), this.labels.
      pop(), this.finishNode(e, r ? "ForInStatement" : "ForOfStatement");
    }, X.parseVar = function (e, t, r) {
      for (e.declarations = [], e.kind = r;;) {
        var i = this.startNode();
        if (this.parseVarId(i, r), this.eat(_.eq) ? i.init = this.parseMaybeAssign(t) : "const" !== r || this.type ===
        _._in || this.options.ecmaVersion >= 6 && this.isContextual("of") ? "Identifier" === i.id.type || t && (this.
        type === _._in || this.isContextual("of")) ? i.init = null : this.raise(this.lastTokEnd,
        "Complex binding patterns require an initialization value") : this.unexpected(), e.declarations.push(this.finishNode(
        i, "VariableDeclarator")), !this.eat(_.comma)) break;
      }
      return e;
    }, X.parseVarId = function (e, t) {
      e.id = this.parseBindingAtom(), this.checkLVal(e.id, "var" === t ? 1 : 2, !1);
    };
    var $ = 1,
    ee = 2;
    X.parseFunction = function (e, t, r, i) {
      this.initFunction(e), (this.options.ecmaVersion >= 9 || this.options.ecmaVersion >= 6 && !i) && (this.type ===
      _.star && t & ee && this.unexpected(), e.generator = this.eat(_.star)), this.options.ecmaVersion >= 8 && (e.async = !
      !i), t & $ && (e.id = 4 & t && this.type !== _.name ? null : this.parseIdent(), !e.id || t & ee || this.checkLVal(
      e.id, this.strict || e.generator || e.async ? this.treatFunctionsAsVar ? 1 : 2 : 3));
      var n = this.yieldPos,
      s = this.awaitPos,
      a = this.awaitIdentPos;
      return this.yieldPos = 0, this.awaitPos = 0, this.awaitIdentPos = 0, this.enterScope(G(e.async, e.generator)),
      t & $ || (e.id = this.type === _.name ? this.parseIdent() : null), this.parseFunctionParams(e), this.parseFunctionBody(
      e, r, !1), this.yieldPos = n, this.awaitPos = s, this.awaitIdentPos = a, this.finishNode(e, t & $ ?
      "FunctionDeclaration" : "FunctionExpression");
    }, X.parseFunctionParams = function (e) {
      this.expect(_.parenL), e.params = this.parseBindingList(_.parenR, !1, this.options.ecmaVersion >= 8), this.checkYieldAwaitInDefaultParams();
    }, X.parseClass = function (e, t) {
      this.next();
      var r = this.strict;
      this.strict = !0, this.parseClassId(e, t), this.parseClassSuper(e);
      var i = this.startNode(),
      n = !1;
      for (i.body = [], this.expect(_.braceL); !this.eat(_.braceR);) {
        var s = this.parseClassElement(null !== e.superClass);
        s && (i.body.push(s), "MethodDefinition" === s.type && "constructor" === s.kind && (n && this.raise(s.start,
        "Duplicate constructor in the same class"), n = !0));
      }
      return e.body = this.finishNode(i, "ClassBody"), this.strict = r, this.finishNode(e, t ? "ClassDeclaration" :
      "ClassExpression");
    }, X.parseClassElement = function (e) {
      var t = this;
      if (this.eat(_.semi)) return null;
      var r = this.startNode(),
      i = function i(e, _i) {
        void 0 === _i && (_i = !1);
        var n = t.start,
        s = t.startLoc;
        return !!t.eatContextual(e) && (!(t.type === _.parenL || _i && t.canInsertSemicolon()) || (r.key && t.unexpected(),
        r.computed = !1, r.key = t.startNodeAt(n, s), r.key.name = e, t.finishNode(r.key, "Identifier"), !1));
      };
      r.kind = "method", r.static = i("static");
      var n = this.eat(_.star),
      s = !1;
      n || (this.options.ecmaVersion >= 8 && i("async", !0) ? (s = !0, n = this.options.ecmaVersion >= 9 && this.eat(
      _.star)) : i("get") ? r.kind = "get" : i("set") && (r.kind = "set")), r.key || this.parsePropertyName(r);
      var a = r.key,
      o = !1;
      return r.computed || r.static || !("Identifier" === a.type && "constructor" === a.name || "Literal" === a.type &&
      "constructor" === a.value) ? r.static && "Identifier" === a.type && "prototype" === a.name && this.raise(a.start,
      "Classes may not have a static property named prototype") : ("method" !== r.kind && this.raise(a.start,
      "Constructor can't have get/set modifier"), n && this.raise(a.start, "Constructor can't be a generator"), s &&
      this.raise(a.start, "Constructor can't be an async method"), r.kind = "constructor", o = e), this.parseClassMethod(
      r, n, s, o), "get" === r.kind && 0 !== r.value.params.length && this.raiseRecoverable(r.value.start,
      "getter should have no params"), "set" === r.kind && 1 !== r.value.params.length && this.raiseRecoverable(r.value.
      start, "setter should have exactly one param"), "set" === r.kind && "RestElement" === r.value.params[0].type &&
      this.raiseRecoverable(r.value.params[0].start, "Setter cannot use rest params"), r;
    }, X.parseClassMethod = function (e, t, r, i) {
      return e.value = this.parseMethod(t, r, i), this.finishNode(e, "MethodDefinition");
    }, X.parseClassId = function (e, t) {
      this.type === _.name ? (e.id = this.parseIdent(), t && this.checkLVal(e.id, 2, !1)) : (!0 === t && this.unexpected(),
      e.id = null);
    }, X.parseClassSuper = function (e) {
      e.superClass = this.eat(_._extends) ? this.parseExprSubscripts() : null;
    }, X.parseExport = function (e, t) {
      if (this.next(), this.eat(_.star)) return this.expectContextual("from"), this.type !== _.string && this.unexpected(),
      e.source = this.parseExprAtom(), this.semicolon(), this.finishNode(e, "ExportAllDeclaration");
      if (this.eat(_._default)) {
        var r;
        if (this.checkExport(t, "default", this.lastTokStart), this.type === _._function || (r = this.isAsyncFunction())) {
          var i = this.startNode();
          this.next(), r && this.next(), e.declaration = this.parseFunction(i, 4 | $, !1, r);
        } else if (this.type === _._class) {
          var n = this.startNode();
          e.declaration = this.parseClass(n, "nullableID");
        } else e.declaration = this.parseMaybeAssign(), this.semicolon();
        return this.finishNode(e, "ExportDefaultDeclaration");
      }
      if (this.shouldParseExportStatement()) e.declaration = this.parseStatement(null), "VariableDeclaration" === e.declaration.
      type ? this.checkVariableExport(t, e.declaration.declarations) : this.checkExport(t, e.declaration.id.name,
      e.declaration.id.start), e.specifiers = [], e.source = null;else
      {
        if (e.declaration = null, e.specifiers = this.parseExportSpecifiers(t), this.eatContextual("from")) this.type !==
        _.string && this.unexpected(), e.source = this.parseExprAtom();else
        {
          for (var s = 0, a = e.specifiers; s < a.length; s += 1) {
            var o = a[s];
            this.checkUnreserved(o.local), this.checkLocalExport(o.local);
          }
          e.source = null;
        }
        this.semicolon();
      }
      return this.finishNode(e, "ExportNamedDeclaration");
    }, X.checkExport = function (e, t, r) {
      e && (N(e, t) && this.raiseRecoverable(r, "Duplicate export '" + t + "'"), e[t] = !0);
    }, X.checkPatternExport = function (e, t) {
      var r = t.type;
      if ("Identifier" === r) this.checkExport(e, t.name, t.start);else
      if ("ObjectPattern" === r)
      for (var i = 0, n = t.properties; i < n.length; i += 1) {
        var s = n[i];
        this.checkPatternExport(e, s);
      } else if ("ArrayPattern" === r)
      for (var a = 0, o = t.elements; a < o.length; a += 1) {
        var h = o[a];
        h && this.checkPatternExport(e, h);
      } else "Property" === r ? this.checkPatternExport(e, t.value) : "AssignmentPattern" === r ? this.checkPatternExport(
      e, t.left) : "RestElement" === r ? this.checkPatternExport(e, t.argument) : "ParenthesizedExpression" ===
      r && this.checkPatternExport(e, t.expression);
    }, X.checkVariableExport = function (e, t) {
      if (e)
      for (var r = 0, i = t; r < i.length; r += 1) {
        var n = i[r];
        this.checkPatternExport(e, n.id);
      }
    }, X.shouldParseExportStatement = function () {
      return "var" === this.type.keyword || "const" === this.type.keyword || "class" === this.type.keyword ||
      "function" === this.type.keyword || this.isLet() || this.isAsyncFunction();
    }, X.parseExportSpecifiers = function (e) {
      var t = [],
      r = !0;
      for (this.expect(_.braceL); !this.eat(_.braceR);) {
        if (r) r = !1;else
        if (this.expect(_.comma), this.afterTrailingComma(_.braceR)) break;
        var i = this.startNode();
        i.local = this.parseIdent(!0), i.exported = this.eatContextual("as") ? this.parseIdent(!0) : i.local, this.checkExport(
        e, i.exported.name, i.exported.start), t.push(this.finishNode(i, "ExportSpecifier"));
      }
      return t;
    }, X.parseImport = function (e) {
      return this.next(), this.type === _.string ? (e.specifiers = J, e.source = this.parseExprAtom()) : (e.specifiers =
      this.parseImportSpecifiers(), this.expectContextual("from"), e.source = this.type === _.string ? this.parseExprAtom() :
      this.unexpected()), this.semicolon(), this.finishNode(e, "ImportDeclaration");
    }, X.parseImportSpecifiers = function () {
      var e = [],
      t = !0;
      if (this.type === _.name) {
        var r = this.startNode();
        if (r.local = this.parseIdent(), this.checkLVal(r.local, 2), e.push(this.finishNode(r,
        "ImportDefaultSpecifier")), !this.eat(_.comma)) return e;
      }
      if (this.type === _.star) {
        var i = this.startNode();
        return this.next(), this.expectContextual("as"), i.local = this.parseIdent(), this.checkLVal(i.local, 2), e.push(
        this.finishNode(i, "ImportNamespaceSpecifier")), e;
      }
      for (this.expect(_.braceL); !this.eat(_.braceR);) {
        if (t) t = !1;else
        if (this.expect(_.comma), this.afterTrailingComma(_.braceR)) break;
        var n = this.startNode();
        n.imported = this.parseIdent(!0), this.eatContextual("as") ? n.local = this.parseIdent() : (this.checkUnreserved(
        n.imported), n.local = n.imported), this.checkLVal(n.local, 2), e.push(this.finishNode(n, "ImportSpecifier"));
      }
      return e;
    }, X.adaptDirectivePrologue = function (e) {
      for (var t = 0; t < e.length && this.isDirectiveCandidate(e[t]); ++t) {e[t].directive = e[t].expression.raw.slice(
        1, -1);}
    }, X.isDirectiveCandidate = function (e) {
      return "ExpressionStatement" === e.type && "Literal" === e.expression.type && "string" === typeof e.expression.
      value && ('"' === this.input[e.start] || "'" === this.input[e.start]);
    };
    var te = W.prototype;
    te.toAssignable = function (e, t, r) {
      if (this.options.ecmaVersion >= 6 && e) switch (e.type) {
        case "Identifier":
          this.inAsync && "await" === e.name && this.raise(e.start,
          "Cannot use 'await' as identifier inside an async function");
          break;
        case "ObjectPattern":
        case "ArrayPattern":
        case "RestElement":
          break;
        case "ObjectExpression":
          e.type = "ObjectPattern", r && this.checkPatternErrors(r, !0);
          for (var i = 0, n = e.properties; i < n.length; i += 1) {
            var s = n[i];
            this.toAssignable(s, t), "RestElement" !== s.type || "ArrayPattern" !== s.argument.type && "ObjectPattern" !==
            s.argument.type || this.raise(s.argument.start, "Unexpected token");
          }
          break;
        case "Property":
          "init" !== e.kind && this.raise(e.key.start, "Object pattern can't contain getter or setter"), this.toAssignable(
          e.value, t);
          break;
        case "ArrayExpression":
          e.type = "ArrayPattern", r && this.checkPatternErrors(r, !0), this.toAssignableList(e.elements, t);
          break;
        case "SpreadElement":
          e.type = "RestElement", this.toAssignable(e.argument, t), "AssignmentPattern" === e.argument.type && this.raise(
          e.argument.start, "Rest elements cannot have a default value");
          break;
        case "AssignmentExpression":
          "=" !== e.operator && this.raise(e.left.end, "Only '=' operator can be used for specifying default value."),
          e.type = "AssignmentPattern", delete e.operator, this.toAssignable(e.left, t);
        case "AssignmentPattern":
          break;
        case "ParenthesizedExpression":
          this.toAssignable(e.expression, t, r);
          break;
        case "MemberExpression":
          if (!t) break;
        default:
          this.raise(e.start, "Assigning to rvalue");} else
      r && this.checkPatternErrors(r, !0);
      return e;
    }, te.toAssignableList = function (e, t) {
      for (var r = e.length, i = 0; i < r; i++) {
        var n = e[i];
        n && this.toAssignable(n, t);
      }
      if (r) {
        var s = e[r - 1];
        6 === this.options.ecmaVersion && t && s && "RestElement" === s.type && "Identifier" !== s.argument.type &&
        this.unexpected(s.argument.start);
      }
      return e;
    }, te.parseSpread = function (e) {
      var t = this.startNode();
      return this.next(), t.argument = this.parseMaybeAssign(!1, e), this.finishNode(t, "SpreadElement");
    }, te.parseRestBinding = function () {
      var e = this.startNode();
      return this.next(), 6 === this.options.ecmaVersion && this.type !== _.name && this.unexpected(), e.argument =
      this.parseBindingAtom(), this.finishNode(e, "RestElement");
    }, te.parseBindingAtom = function () {
      if (this.options.ecmaVersion >= 6) switch (this.type) {
        case _.bracketL:
          var e = this.startNode();
          return this.next(), e.elements = this.parseBindingList(_.bracketR, !0, !0), this.finishNode(e,
          "ArrayPattern");
        case _.braceL:
          return this.parseObj(!0);}

      return this.parseIdent();
    }, te.parseBindingList = function (e, t, r) {
      for (var i = [], n = !0; !this.eat(e);) {
        if (n ? n = !1 : this.expect(_.comma), t && this.type === _.comma) i.push(null);else
        {
          if (r && this.afterTrailingComma(e)) break;
          if (this.type === _.ellipsis) {
            var s = this.parseRestBinding();
            this.parseBindingListItem(s), i.push(s), this.type === _.comma && this.raise(this.start,
            "Comma is not permitted after the rest element"), this.expect(e);
            break;
          }
          var a = this.parseMaybeDefault(this.start, this.startLoc);
          this.parseBindingListItem(a), i.push(a);
        }}return i;
    }, te.parseBindingListItem = function (e) {
      return e;
    }, te.parseMaybeDefault = function (e, t, r) {
      if (r = r || this.parseBindingAtom(), this.options.ecmaVersion < 6 || !this.eat(_.eq)) return r;
      var i = this.startNodeAt(e, t);
      return i.left = r, i.right = this.parseMaybeAssign(), this.finishNode(i, "AssignmentPattern");
    }, te.checkLVal = function (e, t, r) {
      switch (void 0 === t && (t = 0), e.type) {
        case "Identifier":
          2 === t && "let" === e.name && this.raiseRecoverable(e.start, "let is disallowed as a lexically bound name"),
          this.strict && this.reservedWordsStrictBind.test(e.name) && this.raiseRecoverable(e.start, (t ? "Binding " :
          "Assigning to ") + e.name + " in strict mode"), r && (N(r, e.name) && this.raiseRecoverable(e.start,
          "Argument name clash"), r[e.name] = !0), 0 !== t && 5 !== t && this.declareName(e.name, t, e.start);
          break;
        case "MemberExpression":
          t && this.raiseRecoverable(e.start, "Binding member expression");
          break;
        case "ObjectPattern":
          for (var i = 0, n = e.properties; i < n.length; i += 1) {
            var s = n[i];
            this.checkLVal(s, t, r);
          }
          break;
        case "Property":
          this.checkLVal(e.value, t, r);
          break;
        case "ArrayPattern":
          for (var a = 0, o = e.elements; a < o.length; a += 1) {
            var h = o[a];
            h && this.checkLVal(h, t, r);
          }
          break;
        case "AssignmentPattern":
          this.checkLVal(e.left, t, r);
          break;
        case "RestElement":
          this.checkLVal(e.argument, t, r);
          break;
        case "ParenthesizedExpression":
          this.checkLVal(e.expression, t, r);
          break;
        default:
          this.raise(e.start, (t ? "Binding" : "Assigning to") + " rvalue");}

    };
    var re = W.prototype;
    re.checkPropClash = function (e, t, r) {
      if (!(this.options.ecmaVersion >= 9 && "SpreadElement" === e.type) && !(this.options.ecmaVersion >= 6 && (e.computed ||
      e.method || e.shorthand))) {
        var i,n = e.key;
        switch (n.type) {
          case "Identifier":
            i = n.name;
            break;
          case "Literal":
            i = String(n.value);
            break;
          default:
            return;}

        var s = e.kind;
        if (this.options.ecmaVersion >= 6) "__proto__" === i && "init" === s && (t.proto && (r && r.doubleProto < 0 ?
        r.doubleProto = n.start : this.raiseRecoverable(n.start, "Redefinition of __proto__ property")), t.proto = !
        0);else
        {
          var a = t[i = "$" + i];
          if (a) ("init" === s ? this.strict && a.init || a.get || a.set : a.init || a[s]) && this.raiseRecoverable(n.start,
          "Redefinition of property");else
          a = t[i] = {
            init: !1,
            get: !1,
            set: !1 };

          a[s] = !0;
        }
      }
    }, re.parseExpression = function (e, t) {
      var r = this.start,
      i = this.startLoc,
      n = this.parseMaybeAssign(e, t);
      if (this.type === _.comma) {
        var s = this.startNodeAt(r, i);
        for (s.expressions = [n]; this.eat(_.comma);) {s.expressions.push(this.parseMaybeAssign(e, t));}
        return this.finishNode(s, "SequenceExpression");
      }
      return n;
    }, re.parseMaybeAssign = function (e, t, r) {
      if (this.isContextual("yield")) {
        if (this.inGenerator) return this.parseYield(e);
        this.exprAllowed = !1;
      }
      var i = !1,
      n = -1,
      s = -1,
      a = -1;
      t ? (n = t.parenthesizedAssign, s = t.trailingComma, a = t.shorthandAssign, t.parenthesizedAssign = t.trailingComma =
      t.shorthandAssign = -1) : (t = new Q(), i = !0);
      var o = this.start,
      h = this.startLoc;
      this.type !== _.parenL && this.type !== _.name || (this.potentialArrowAt = this.start);
      var c = this.parseMaybeConditional(e, t);
      if (r && (c = r.call(this, c, o, h)), this.type.isAssign) {
        var u = this.startNodeAt(o, h);
        return u.operator = this.value, u.left = this.type === _.eq ? this.toAssignable(c, !1, t) : c, i || Q.call(t),
        t.shorthandAssign = -1, this.checkLVal(c), this.next(), u.right = this.parseMaybeAssign(e), this.finishNode(
        u, "AssignmentExpression");
      }
      return i && this.checkExpressionErrors(t, !0), n > -1 && (t.parenthesizedAssign = n), s > -1 && (t.trailingComma =
      s), a > -1 && (t.shorthandAssign = a), c;
    }, re.parseMaybeConditional = function (e, t) {
      var r = this.start,
      i = this.startLoc,
      n = this.parseExprOps(e, t);
      if (this.checkExpressionErrors(t)) return n;
      if (this.eat(_.question)) {
        var s = this.startNodeAt(r, i);
        return s.test = n, s.consequent = this.parseMaybeAssign(), this.expect(_.colon), s.alternate = this.parseMaybeAssign(
        e), this.finishNode(s, "ConditionalExpression");
      }
      return n;
    }, re.parseExprOps = function (e, t) {
      var r = this.start,
      i = this.startLoc,
      n = this.parseMaybeUnary(t, !1);
      return this.checkExpressionErrors(t) ? n : n.start === r && "ArrowFunctionExpression" === n.type ? n : this.parseExprOp(
      n, r, i, -1, e);
    }, re.parseExprOp = function (e, t, r, i, n) {
      var s = this.type.binop;
      if (null != s && (!n || this.type !== _._in) && s > i) {
        var a = this.type === _.logicalOR || this.type === _.logicalAND,
        o = this.value;
        this.next();
        var h = this.start,
        c = this.startLoc,
        u = this.parseExprOp(this.parseMaybeUnary(null, !1), h, c, s, n),
        p = this.buildBinary(t, r, e, u, o, a);
        return this.parseExprOp(p, t, r, i, n);
      }
      return e;
    }, re.buildBinary = function (e, t, r, i, n, s) {
      var a = this.startNodeAt(e, t);
      return a.left = r, a.operator = n, a.right = i, this.finishNode(a, s ? "LogicalExpression" :
      "BinaryExpression");
    }, re.parseMaybeUnary = function (e, t) {
      var r,i = this.start,
      n = this.startLoc;
      if (this.isContextual("await") && (this.inAsync || !this.inFunction && this.options.allowAwaitOutsideFunction))
      r = this.parseAwait(), t = !0;else
      if (this.type.prefix) {
        var s = this.startNode(),
        a = this.type === _.incDec;
        s.operator = this.value, s.prefix = !0, this.next(), s.argument = this.parseMaybeUnary(null, !0), this.checkExpressionErrors(
        e, !0), a ? this.checkLVal(s.argument) : this.strict && "delete" === s.operator && "Identifier" === s.argument.
        type ? this.raiseRecoverable(s.start, "Deleting local variable in strict mode") : t = !0, r = this.finishNode(
        s, a ? "UpdateExpression" : "UnaryExpression");
      } else {
        if (r = this.parseExprSubscripts(e), this.checkExpressionErrors(e)) return r;
        for (; this.type.postfix && !this.canInsertSemicolon();) {
          var o = this.startNodeAt(i, n);
          o.operator = this.value, o.prefix = !1, o.argument = r, this.checkLVal(r), this.next(), r = this.finishNode(
          o, "UpdateExpression");
        }
      }
      return !t && this.eat(_.starstar) ? this.buildBinary(i, n, r, this.parseMaybeUnary(null, !1), "**", !1) : r;
    }, re.parseExprSubscripts = function (e) {
      var t = this.start,
      r = this.startLoc,
      i = this.parseExprAtom(e),
      n = "ArrowFunctionExpression" === i.type && ")" !== this.input.slice(this.lastTokStart, this.lastTokEnd);
      if (this.checkExpressionErrors(e) || n) return i;
      var s = this.parseSubscripts(i, t, r);
      return e && "MemberExpression" === s.type && (e.parenthesizedAssign >= s.start && (e.parenthesizedAssign = -1),
      e.parenthesizedBind >= s.start && (e.parenthesizedBind = -1)), s;
    }, re.parseSubscripts = function (e, t, r, i) {
      for (var n = this.options.ecmaVersion >= 8 && "Identifier" === e.type && "async" === e.name && this.lastTokEnd ===
      e.end && !this.canInsertSemicolon() && "async" === this.input.slice(e.start, e.end);;) {
        var s = this.parseSubscript(e, t, r, i, n);
        if (s === e || "ArrowFunctionExpression" === s.type) return s;
        e = s;
      }
    }, re.parseSubscript = function (e, t, r, i, n) {
      var s = this.eat(_.bracketL);
      if (s || this.eat(_.dot)) {
        var a = this.startNodeAt(t, r);
        a.object = e, a.property = s ? this.parseExpression() : this.parseIdent("never" !== this.options.allowReserved),
        a.computed = !!s, s && this.expect(_.bracketR), e = this.finishNode(a, "MemberExpression");
      } else if (!i && this.eat(_.parenL)) {
        var o = new Q(),
        h = this.yieldPos,
        c = this.awaitPos,
        u = this.awaitIdentPos;
        this.yieldPos = 0, this.awaitPos = 0, this.awaitIdentPos = 0;
        var p = this.parseExprList(_.parenR, this.options.ecmaVersion >= 8, !1, o);
        if (n && !this.canInsertSemicolon() && this.eat(_.arrow)) return this.checkPatternErrors(o, !1), this.checkYieldAwaitInDefaultParams(),
        this.awaitIdentPos > 0 && this.raise(this.awaitIdentPos,
        "Cannot use 'await' as identifier inside an async function"), this.yieldPos = h, this.awaitPos = c, this.awaitIdentPos =
        u, this.parseArrowExpression(this.startNodeAt(t, r), p, !0);
        this.checkExpressionErrors(o, !0), this.yieldPos = h || this.yieldPos, this.awaitPos = c || this.awaitPos,
        this.awaitIdentPos = u || this.awaitIdentPos;
        var l = this.startNodeAt(t, r);
        l.callee = e, l.arguments = p, e = this.finishNode(l, "CallExpression");
      } else if (this.type === _.backQuote) {
        var d = this.startNodeAt(t, r);
        d.tag = e, d.quasi = this.parseTemplate({
          isTagged: !0 }),
        e = this.finishNode(d, "TaggedTemplateExpression");
      }
      return e;
    }, re.parseExprAtom = function (e) {
      this.type === _.slash && this.readRegexp();
      var t,r = this.potentialArrowAt === this.start;
      switch (this.type) {
        case _._super:
          return this.allowSuper || this.raise(this.start, "'super' keyword outside a method"), t = this.startNode(),
          this.next(), this.type !== _.parenL || this.allowDirectSuper || this.raise(t.start,
          "super() call outside constructor of a subclass"), this.type !== _.dot && this.type !== _.bracketL && this.
          type !== _.parenL && this.unexpected(), this.finishNode(t, "Super");
        case _._this:
          return t = this.startNode(), this.next(), this.finishNode(t, "ThisExpression");
        case _.name:
          var i = this.start,
          n = this.startLoc,
          s = this.containsEsc,
          a = this.parseIdent(!1);
          if (this.options.ecmaVersion >= 8 && !s && "async" === a.name && !this.canInsertSemicolon() && this.eat(_._function))
          return this.parseFunction(this.startNodeAt(i, n), 0, !1, !0);
          if (r && !this.canInsertSemicolon()) {
            if (this.eat(_.arrow)) return this.parseArrowExpression(this.startNodeAt(i, n), [a], !1);
            if (this.options.ecmaVersion >= 8 && "async" === a.name && this.type === _.name && !s) return a = this.parseIdent(
            !1), !this.canInsertSemicolon() && this.eat(_.arrow) || this.unexpected(), this.parseArrowExpression(
            this.startNodeAt(i, n), [a], !0);
          }
          return a;
        case _.regexp:
          var o = this.value;
          return (t = this.parseLiteral(o.value)).regex = {
            pattern: o.pattern,
            flags: o.flags },
          t;
        case _.num:
        case _.string:
          return this.parseLiteral(this.value);
        case _._null:
        case _._true:
        case _._false:
          return (t = this.startNode()).value = this.type === _._null ? null : this.type === _._true, t.raw = this.type.
          keyword, this.next(), this.finishNode(t, "Literal");
        case _.parenL:
          var h = this.start,
          c = this.parseParenAndDistinguishExpression(r);
          return e && (e.parenthesizedAssign < 0 && !this.isSimpleAssignTarget(c) && (e.parenthesizedAssign = h), e.parenthesizedBind <
          0 && (e.parenthesizedBind = h)), c;
        case _.bracketL:
          return t = this.startNode(), this.next(), t.elements = this.parseExprList(_.bracketR, !0, !0, e), this.finishNode(
          t, "ArrayExpression");
        case _.braceL:
          return this.parseObj(!1, e);
        case _._function:
          return t = this.startNode(), this.next(), this.parseFunction(t, 0);
        case _._class:
          return this.parseClass(this.startNode(), !1);
        case _._new:
          return this.parseNew();
        case _.backQuote:
          return this.parseTemplate();
        case _._import:
          return this.options.ecmaVersion >= 11 ? this.parseExprImport() : this.unexpected();
        default:
          this.unexpected();}

    }, re.parseExprImport = function () {
      var e = this.startNode();
      switch (this.next(), this.type) {
        case _.parenL:
          return this.parseDynamicImport(e);
        default:
          this.unexpected();}

    }, re.parseDynamicImport = function (e) {
      if (this.next(), e.source = this.parseMaybeAssign(), !this.eat(_.parenR)) {
        var t = this.start;
        this.eat(_.comma) && this.eat(_.parenR) ? this.raiseRecoverable(t,
        "Trailing comma is not allowed in import()") : this.unexpected(t);
      }
      return this.finishNode(e, "ImportExpression");
    }, re.parseLiteral = function (e) {
      var t = this.startNode();
      return t.value = e, t.raw = this.input.slice(this.start, this.end), 110 === t.raw.charCodeAt(t.raw.length - 1) && (
      t.bigint = t.raw.slice(0, -1)), this.next(), this.finishNode(t, "Literal");
    }, re.parseParenExpression = function () {
      this.expect(_.parenL);
      var e = this.parseExpression();
      return this.expect(_.parenR), e;
    }, re.parseParenAndDistinguishExpression = function (e) {
      var t,r = this.start,
      i = this.startLoc,
      n = this.options.ecmaVersion >= 8;
      if (this.options.ecmaVersion >= 6) {
        this.next();
        var s,a = this.start,
        o = this.startLoc,
        h = [],
        c = !0,
        u = !1,
        p = new Q(),
        l = this.yieldPos,
        d = this.awaitPos;
        for (this.yieldPos = 0, this.awaitPos = 0; this.type !== _.parenR;) {
          if (c ? c = !1 : this.expect(_.comma), n && this.afterTrailingComma(_.parenR, !0)) {
            u = !0;
            break;
          }
          if (this.type === _.ellipsis) {
            s = this.start, h.push(this.parseParenItem(this.parseRestBinding())), this.type === _.comma && this.raise(
            this.start, "Comma is not permitted after the rest element");
            break;
          }
          h.push(this.parseMaybeAssign(!1, p, this.parseParenItem));
        }
        var f = this.start,
        m = this.startLoc;
        if (this.expect(_.parenR), e && !this.canInsertSemicolon() && this.eat(_.arrow)) return this.checkPatternErrors(
        p, !1), this.checkYieldAwaitInDefaultParams(), this.yieldPos = l, this.awaitPos = d, this.parseParenArrowList(
        r, i, h);
        h.length && !u || this.unexpected(this.lastTokStart), s && this.unexpected(s), this.checkExpressionErrors(p,
        !0), this.yieldPos = l || this.yieldPos, this.awaitPos = d || this.awaitPos, h.length > 1 ? ((t = this.startNodeAt(
        a, o)).expressions = h, this.finishNodeAt(t, "SequenceExpression", f, m)) : t = h[0];
      } else t = this.parseParenExpression();
      if (this.options.preserveParens) {
        var g = this.startNodeAt(r, i);
        return g.expression = t, this.finishNode(g, "ParenthesizedExpression");
      }
      return t;
    }, re.parseParenItem = function (e) {
      return e;
    }, re.parseParenArrowList = function (e, t, r) {
      return this.parseArrowExpression(this.startNodeAt(e, t), r);
    };
    var ie = [];
    re.parseNew = function () {
      var e = this.startNode(),
      t = this.parseIdent(!0);
      if (this.options.ecmaVersion >= 6 && this.eat(_.dot)) {
        e.meta = t;
        var r = this.containsEsc;
        return e.property = this.parseIdent(!0), ("target" !== e.property.name || r) && this.raiseRecoverable(e.property.
        start, "The only valid meta property for new is new.target"), this.inNonArrowFunction() || this.raiseRecoverable(
        e.start, "new.target can only be used in functions"), this.finishNode(e, "MetaProperty");
      }
      var i = this.start,
      n = this.startLoc,
      s = this.type === _._import;
      return e.callee = this.parseSubscripts(this.parseExprAtom(), i, n, !0), s && "ImportExpression" === e.callee.type &&
      this.raise(i, "Cannot use new with import()"), this.eat(_.parenL) ? e.arguments = this.parseExprList(_.parenR,
      this.options.ecmaVersion >= 8, !1) : e.arguments = ie, this.finishNode(e, "NewExpression");
    }, re.parseTemplateElement = function (e) {
      var t = e.isTagged,
      r = this.startNode();
      return this.type === _.invalidTemplate ? (t || this.raiseRecoverable(this.start,
      "Bad escape sequence in untagged template literal"), r.value = {
        raw: this.value,
        cooked: null }) :
      r.value = {
        raw: this.input.slice(this.start, this.end).replace(/\r\n?/g, "\n"),
        cooked: this.value },
      this.next(), r.tail = this.type === _.backQuote, this.finishNode(r, "TemplateElement");
    }, re.parseTemplate = function (e) {
      void 0 === e && (e = {});
      var t = e.isTagged;
      void 0 === t && (t = !1);
      var r = this.startNode();
      this.next(), r.expressions = [];
      var i = this.parseTemplateElement({
        isTagged: t });

      for (r.quasis = [i]; !i.tail;) {this.type === _.eof && this.raise(this.pos, "Unterminated template literal"),
        this.expect(_.dollarBraceL), r.expressions.push(this.parseExpression()), this.expect(_.braceR), r.quasis.push(
        i = this.parseTemplateElement({
          isTagged: t }));}

      return this.next(), this.finishNode(r, "TemplateLiteral");
    }, re.isAsyncProp = function (e) {
      return !e.computed && "Identifier" === e.key.type && "async" === e.key.name && (this.type === _.name || this.type ===
      _.num || this.type === _.string || this.type === _.bracketL || this.type.keyword || this.options.ecmaVersion >=
      9 && this.type === _.star) && !C.test(this.input.slice(this.lastTokEnd, this.start));
    }, re.parseObj = function (e, t) {
      var r = this.startNode(),
      i = !0,
      n = {};
      for (r.properties = [], this.next(); !this.eat(_.braceR);) {
        if (i) i = !1;else
        if (this.expect(_.comma), this.options.ecmaVersion >= 5 && this.afterTrailingComma(_.braceR)) break;
        var s = this.parseProperty(e, t);
        e || this.checkPropClash(s, n, t), r.properties.push(s);
      }
      return this.finishNode(r, e ? "ObjectPattern" : "ObjectExpression");
    }, re.parseProperty = function (e, t) {
      var r,i,n,s,a = this.startNode();
      if (this.options.ecmaVersion >= 9 && this.eat(_.ellipsis)) return e ? (a.argument = this.parseIdent(!1), this.type ===
      _.comma && this.raise(this.start, "Comma is not permitted after the rest element"), this.finishNode(a,
      "RestElement")) : (this.type === _.parenL && t && (t.parenthesizedAssign < 0 && (t.parenthesizedAssign =
      this.start), t.parenthesizedBind < 0 && (t.parenthesizedBind = this.start)), a.argument = this.parseMaybeAssign(
      !1, t), this.type === _.comma && t && t.trailingComma < 0 && (t.trailingComma = this.start), this.finishNode(
      a, "SpreadElement"));
      this.options.ecmaVersion >= 6 && (a.method = !1, a.shorthand = !1, (e || t) && (n = this.start, s = this.startLoc),
      e || (r = this.eat(_.star)));
      var o = this.containsEsc;
      return this.parsePropertyName(a), !e && !o && this.options.ecmaVersion >= 8 && !r && this.isAsyncProp(a) ? (i = !
      0, r = this.options.ecmaVersion >= 9 && this.eat(_.star), this.parsePropertyName(a, t)) : i = !1, this.parsePropertyValue(
      a, e, r, i, n, s, t, o), this.finishNode(a, "Property");
    }, re.parsePropertyValue = function (e, t, r, i, n, s, a, o) {
      if ((r || i) && this.type === _.colon && this.unexpected(), this.eat(_.colon)) e.value = t ? this.parseMaybeDefault(
      this.start, this.startLoc) : this.parseMaybeAssign(!1, a), e.kind = "init";else
      if (this.options.ecmaVersion >= 6 && this.type === _.parenL) t && this.unexpected(), e.kind = "init", e.method = !
      0, e.value = this.parseMethod(r, i);else
      if (t || o || !(this.options.ecmaVersion >= 5) || e.computed || "Identifier" !== e.key.type || "get" !==
      e.key.name && "set" !== e.key.name || this.type === _.comma || this.type === _.braceR) this.options.ecmaVersion >=
      6 && !e.computed && "Identifier" === e.key.type ? ((r || i) && this.unexpected(), this.checkUnreserved(e.key),
      "await" !== e.key.name || this.awaitIdentPos || (this.awaitIdentPos = n), e.kind = "init", t ? e.value =
      this.parseMaybeDefault(n, s, e.key) : this.type === _.eq && a ? (a.shorthandAssign < 0 && (a.shorthandAssign =
      this.start), e.value = this.parseMaybeDefault(n, s, e.key)) : e.value = e.key, e.shorthand = !0) : this.unexpected();else
      {
        (r || i) && this.unexpected(), e.kind = e.key.name, this.parsePropertyName(e), e.value = this.parseMethod(!1);
        var h = "get" === e.kind ? 0 : 1;
        if (e.value.params.length !== h) {
          var c = e.value.start;
          "get" === e.kind ? this.raiseRecoverable(c, "getter should have no params") : this.raiseRecoverable(c,
          "setter should have exactly one param");
        } else "set" === e.kind && "RestElement" === e.value.params[0].type && this.raiseRecoverable(e.value.params[0].
        start, "Setter cannot use rest params");
      }
    }, re.parsePropertyName = function (e) {
      if (this.options.ecmaVersion >= 6) {
        if (this.eat(_.bracketL)) return e.computed = !0, e.key = this.parseMaybeAssign(), this.expect(_.bracketR), e.
        key;
        e.computed = !1;
      }
      return e.key = this.type === _.num || this.type === _.string ? this.parseExprAtom() : this.parseIdent("never" !==
      this.options.allowReserved);
    }, re.initFunction = function (e) {
      e.id = null, this.options.ecmaVersion >= 6 && (e.generator = e.expression = !1), this.options.ecmaVersion >= 8 && (
      e.async = !1);
    }, re.parseMethod = function (e, t, r) {
      var i = this.startNode(),
      n = this.yieldPos,
      s = this.awaitPos,
      a = this.awaitIdentPos;
      return this.initFunction(i), this.options.ecmaVersion >= 6 && (i.generator = e), this.options.ecmaVersion >= 8 && (
      i.async = !!t), this.yieldPos = 0, this.awaitPos = 0, this.awaitIdentPos = 0, this.enterScope(64 | G(t, i.generator) | (
      r ? 128 : 0)), this.expect(_.parenL), i.params = this.parseBindingList(_.parenR, !1, this.options.ecmaVersion >=
      8), this.checkYieldAwaitInDefaultParams(), this.parseFunctionBody(i, !1, !0), this.yieldPos = n, this.awaitPos =
      s, this.awaitIdentPos = a, this.finishNode(i, "FunctionExpression");
    }, re.parseArrowExpression = function (e, t, r) {
      var i = this.yieldPos,
      n = this.awaitPos,
      s = this.awaitIdentPos;
      return this.enterScope(16 | G(r, !1)), this.initFunction(e), this.options.ecmaVersion >= 8 && (e.async = !!r),
      this.yieldPos = 0, this.awaitPos = 0, this.awaitIdentPos = 0, e.params = this.toAssignableList(t, !0), this.parseFunctionBody(
      e, !0, !1), this.yieldPos = i, this.awaitPos = n, this.awaitIdentPos = s, this.finishNode(e,
      "ArrowFunctionExpression");
    }, re.parseFunctionBody = function (e, t, r) {
      var i = t && this.type !== _.braceL,
      n = this.strict,
      s = !1;
      if (i) e.body = this.parseMaybeAssign(), e.expression = !0, this.checkParams(e, !1);else
      {
        var a = this.options.ecmaVersion >= 7 && !this.isSimpleParamList(e.params);
        n && !a || (s = this.strictDirective(this.end)) && a && this.raiseRecoverable(e.start,
        "Illegal 'use strict' directive in function with non-simple parameter list");
        var o = this.labels;
        this.labels = [], s && (this.strict = !0), this.checkParams(e, !n && !s && !t && !r && this.isSimpleParamList(
        e.params)), e.body = this.parseBlock(!1), e.expression = !1, this.adaptDirectivePrologue(e.body.body), this.
        labels = o;
      }
      this.exitScope(), this.strict && e.id && this.checkLVal(e.id, 5), this.strict = n;
    }, re.isSimpleParamList = function (e) {
      for (var t = 0, r = e; t < r.length; t += 1) {
        if ("Identifier" !== r[t].type) return !1;
      }
      return !0;
    }, re.checkParams = function (e, t) {
      for (var r = {}, i = 0, n = e.params; i < n.length; i += 1) {
        var s = n[i];
        this.checkLVal(s, 1, t ? null : r);
      }
    }, re.parseExprList = function (e, t, r, i) {
      for (var n = [], s = !0; !this.eat(e);) {
        if (s) s = !1;else
        if (this.expect(_.comma), t && this.afterTrailingComma(e)) break;
        var a = void 0;
        r && this.type === _.comma ? a = null : this.type === _.ellipsis ? (a = this.parseSpread(i), i && this.type ===
        _.comma && i.trailingComma < 0 && (i.trailingComma = this.start)) : a = this.parseMaybeAssign(!1, i), n.push(
        a);
      }
      return n;
    }, re.checkUnreserved = function (e) {
      var t = e.start,
      r = e.end,
      i = e.name;
      (this.inGenerator && "yield" === i && this.raiseRecoverable(t,
      "Cannot use 'yield' as identifier inside a generator"), this.inAsync && "await" === i && this.raiseRecoverable(
      t, "Cannot use 'await' as identifier inside an async function"), this.keywords.test(i) && this.raise(t,
      "Unexpected keyword '" + i + "'"), this.options.ecmaVersion < 6 && -1 !== this.input.slice(t, r).indexOf(
      "\\")) || (this.strict ? this.reservedWordsStrict : this.reservedWords).test(i) && (this.inAsync || "await" !==
      i || this.raiseRecoverable(t, "Cannot use keyword 'await' outside an async function"), this.raiseRecoverable(
      t, "The keyword '" + i + "' is reserved"));
    }, re.parseIdent = function (e, t) {
      var r = this.startNode();
      return this.type === _.name ? r.name = this.value : this.type.keyword ? (r.name = this.type.keyword, "class" !==
      r.name && "function" !== r.name || this.lastTokEnd === this.lastTokStart + 1 && 46 === this.input.charCodeAt(
      this.lastTokStart) || this.context.pop()) : this.unexpected(), this.next(), this.finishNode(r, "Identifier"),
      e || (this.checkUnreserved(r), "await" !== r.name || this.awaitIdentPos || (this.awaitIdentPos = r.start)), r;
    }, re.parseYield = function (e) {
      this.yieldPos || (this.yieldPos = this.start);
      var t = this.startNode();
      return this.next(), this.type === _.semi || this.canInsertSemicolon() || this.type !== _.star && !this.type.startsExpr ? (
      t.delegate = !1, t.argument = null) : (t.delegate = this.eat(_.star), t.argument = this.parseMaybeAssign(e)),
      this.finishNode(t, "YieldExpression");
    }, re.parseAwait = function () {
      this.awaitPos || (this.awaitPos = this.start);
      var e = this.startNode();
      return this.next(), e.argument = this.parseMaybeUnary(null, !0), this.finishNode(e, "AwaitExpression");
    };
    var ne = W.prototype;
    ne.raise = function (e, t) {
      var r = R(this.input, e);
      t += " (" + r.line + ":" + r.column + ")";
      var i = new SyntaxError(t);
      throw i.pos = e, i.loc = r, i.raisedAt = this.pos, i;
    }, ne.raiseRecoverable = ne.raise, ne.curPosition = function () {
      if (this.options.locations) return new O(this.curLine, this.pos - this.lineStart);
    };
    var se = W.prototype,
    ae = function ae(e) {
      this.flags = e, this.var = [], this.lexical = [], this.functions = [];
    };
    se.enterScope = function (e) {
      this.scopeStack.push(new ae(e));
    }, se.exitScope = function () {
      this.scopeStack.pop();
    }, se.treatFunctionsAsVarInScope = function (e) {
      return e.flags & F || !this.inModule && 1 & e.flags;
    }, se.declareName = function (e, t, r) {
      var i = !1;
      if (2 === t) {
        var n = this.currentScope();
        i = n.lexical.indexOf(e) > -1 || n.functions.indexOf(e) > -1 || n.var.indexOf(e) > -1, n.lexical.push(e),
        this.inModule && 1 & n.flags && delete this.undefinedExports[e];
      } else if (4 === t) {
        this.currentScope().lexical.push(e);
      } else if (3 === t) {
        var s = this.currentScope();
        i = this.treatFunctionsAsVar ? s.lexical.indexOf(e) > -1 : s.lexical.indexOf(e) > -1 || s.var.indexOf(e) > -1,
        s.functions.push(e);
      } else
      for (var a = this.scopeStack.length - 1; a >= 0; --a) {
        var o = this.scopeStack[a];
        if (o.lexical.indexOf(e) > -1 && !(32 & o.flags && o.lexical[0] === e) || !this.treatFunctionsAsVarInScope(o) &&
        o.functions.indexOf(e) > -1) {
          i = !0;
          break;
        }
        if (o.var.push(e), this.inModule && 1 & o.flags && delete this.undefinedExports[e], o.flags & H) break;
      }
      i && this.raiseRecoverable(r, "Identifier '" + e + "' has already been declared");
    }, se.checkLocalExport = function (e) {
      -1 === this.scopeStack[0].lexical.indexOf(e.name) && -1 === this.scopeStack[0].var.indexOf(e.name) && (this.undefinedExports[
      e.name] = e);
    }, se.currentScope = function () {
      return this.scopeStack[this.scopeStack.length - 1];
    }, se.currentVarScope = function () {
      for (var e = this.scopeStack.length - 1;; e--) {
        var t = this.scopeStack[e];
        if (t.flags & H) return t;
      }
    }, se.currentThisScope = function () {
      for (var e = this.scopeStack.length - 1;; e--) {
        var t = this.scopeStack[e];
        if (t.flags & H && !(16 & t.flags)) return t;
      }
    };
    var oe = function oe(e, t, r) {
      this.type = "", this.start = t, this.end = 0, e.options.locations && (this.loc = new M(e, r)), e.options.directSourceFile && (
      this.sourceFile = e.options.directSourceFile), e.options.ranges && (this.range = [t, 0]);
    },
    he = W.prototype;

    function ce(e, t, r, i) {
      return e.type = t, e.end = r, this.options.locations && (e.loc.end = i), this.options.ranges && (e.range[1] = r),
      e;
    }
    he.startNode = function () {
      return new oe(this, this.start, this.startLoc);
    }, he.startNodeAt = function (e, t) {
      return new oe(this, e, t);
    }, he.finishNode = function (e, t) {
      return ce.call(this, e, t, this.lastTokEnd, this.lastTokEndLoc);
    }, he.finishNodeAt = function (e, t, r, i) {
      return ce.call(this, e, t, r, i);
    };
    var ue = function ue(e, t, r, i, n) {
      this.token = e, this.isExpr = !!t, this.preserveSpace = !!r, this.override = i, this.generator = !!n;
    },
    pe = {
      b_stat: new ue("{", !1),
      b_expr: new ue("{", !0),
      b_tmpl: new ue("${", !1),
      p_stat: new ue("(", !1),
      p_expr: new ue("(", !0),
      q_tmpl: new ue("`", !0, !0, function (e) {
        return e.tryReadTemplateToken();
      }),
      f_stat: new ue("function", !1),
      f_expr: new ue("function", !0),
      f_expr_gen: new ue("function", !0, !1, null, !0),
      f_gen: new ue("function", !1, !1, null, !0) },

    le = W.prototype;
    le.initialContext = function () {
      return [pe.b_stat];
    }, le.braceIsBlock = function (e) {
      var t = this.curContext();
      return t === pe.f_expr || t === pe.f_stat || (e !== _.colon || t !== pe.b_stat && t !== pe.b_expr ? e === _._return ||
      e === _.name && this.exprAllowed ? C.test(this.input.slice(this.lastTokEnd, this.start)) : e === _._else ||
      e === _.semi || e === _.eof || e === _.parenR || e === _.arrow || (e === _.braceL ? t === pe.b_stat : e !==
      _._var && e !== _._const && e !== _.name && !this.exprAllowed) : !t.isExpr);
    }, le.inGeneratorContext = function () {
      for (var e = this.context.length - 1; e >= 1; e--) {
        var t = this.context[e];
        if ("function" === t.token) return t.generator;
      }
      return !1;
    }, le.updateContext = function (e) {
      var t,r = this.type;
      r.keyword && e === _.dot ? this.exprAllowed = !1 : (t = r.updateContext) ? t.call(this, e) : this.exprAllowed =
      r.beforeExpr;
    }, _.parenR.updateContext = _.braceR.updateContext = function () {
      if (1 !== this.context.length) {
        var e = this.context.pop();
        e === pe.b_stat && "function" === this.curContext().token && (e = this.context.pop()), this.exprAllowed = !e.isExpr;
      } else this.exprAllowed = !0;
    }, _.braceL.updateContext = function (e) {
      this.context.push(this.braceIsBlock(e) ? pe.b_stat : pe.b_expr), this.exprAllowed = !0;
    }, _.dollarBraceL.updateContext = function () {
      this.context.push(pe.b_tmpl), this.exprAllowed = !0;
    }, _.parenL.updateContext = function (e) {
      var t = e === _._if || e === _._for || e === _._with || e === _._while;
      this.context.push(t ? pe.p_stat : pe.p_expr), this.exprAllowed = !0;
    }, _.incDec.updateContext = function () {}, _._function.updateContext = _._class.updateContext = function (e) {
      !e.beforeExpr || e === _.semi || e === _._else || e === _._return && C.test(this.input.slice(this.lastTokEnd,
      this.start)) || (e === _.colon || e === _.braceL) && this.curContext() === pe.b_stat ? this.context.push(pe.f_stat) :
      this.context.push(pe.f_expr), this.exprAllowed = !1;
    }, _.backQuote.updateContext = function () {
      this.curContext() === pe.q_tmpl ? this.context.pop() : this.context.push(pe.q_tmpl), this.exprAllowed = !1;
    }, _.star.updateContext = function (e) {
      if (e === _._function) {
        var t = this.context.length - 1;
        this.context[t] === pe.f_expr ? this.context[t] = pe.f_expr_gen : this.context[t] = pe.f_gen;
      }
      this.exprAllowed = !0;
    }, _.name.updateContext = function (e) {
      var t = !1;
      this.options.ecmaVersion >= 6 && e !== _.dot && ("of" === this.value && !this.exprAllowed || "yield" === this.value &&
      this.inGeneratorContext()) && (t = !0), this.exprAllowed = t;
    };
    var de =
    "ASCII ASCII_Hex_Digit AHex Alphabetic Alpha Any Assigned Bidi_Control Bidi_C Bidi_Mirrored Bidi_M Case_Ignorable CI Cased Changes_When_Casefolded CWCF Changes_When_Casemapped CWCM Changes_When_Lowercased CWL Changes_When_NFKC_Casefolded CWKCF Changes_When_Titlecased CWT Changes_When_Uppercased CWU Dash Default_Ignorable_Code_Point DI Deprecated Dep Diacritic Dia Emoji Emoji_Component Emoji_Modifier Emoji_Modifier_Base Emoji_Presentation Extender Ext Grapheme_Base Gr_Base Grapheme_Extend Gr_Ext Hex_Digit Hex IDS_Binary_Operator IDSB IDS_Trinary_Operator IDST ID_Continue IDC ID_Start IDS Ideographic Ideo Join_Control Join_C Logical_Order_Exception LOE Lowercase Lower Math Noncharacter_Code_Point NChar Pattern_Syntax Pat_Syn Pattern_White_Space Pat_WS Quotation_Mark QMark Radical Regional_Indicator RI Sentence_Terminal STerm Soft_Dotted SD Terminal_Punctuation Term Unified_Ideograph UIdeo Uppercase Upper Variation_Selector VS White_Space space XID_Continue XIDC XID_Start XIDS",
    fe = de + " Extended_Pictographic",
    me = {
      9: de,
      10: fe,
      11: "ASCII ASCII_Hex_Digit AHex Alphabetic Alpha Any Assigned Bidi_Control Bidi_C Bidi_Mirrored Bidi_M Case_Ignorable CI Cased Changes_When_Casefolded CWCF Changes_When_Casemapped CWCM Changes_When_Lowercased CWL Changes_When_NFKC_Casefolded CWKCF Changes_When_Titlecased CWT Changes_When_Uppercased CWU Dash Default_Ignorable_Code_Point DI Deprecated Dep Diacritic Dia Emoji Emoji_Component Emoji_Modifier Emoji_Modifier_Base Emoji_Presentation Extender Ext Grapheme_Base Gr_Base Grapheme_Extend Gr_Ext Hex_Digit Hex IDS_Binary_Operator IDSB IDS_Trinary_Operator IDST ID_Continue IDC ID_Start IDS Ideographic Ideo Join_Control Join_C Logical_Order_Exception LOE Lowercase Lower Math Noncharacter_Code_Point NChar Pattern_Syntax Pat_Syn Pattern_White_Space Pat_WS Quotation_Mark QMark Radical Regional_Indicator RI Sentence_Terminal STerm Soft_Dotted SD Terminal_Punctuation Term Unified_Ideograph UIdeo Uppercase Upper Variation_Selector VS White_Space space XID_Continue XIDC XID_Start XIDS Extended_Pictographic" },

    ge =
    "Cased_Letter LC Close_Punctuation Pe Connector_Punctuation Pc Control Cc cntrl Currency_Symbol Sc Dash_Punctuation Pd Decimal_Number Nd digit Enclosing_Mark Me Final_Punctuation Pf Format Cf Initial_Punctuation Pi Letter L Letter_Number Nl Line_Separator Zl Lowercase_Letter Ll Mark M Combining_Mark Math_Symbol Sm Modifier_Letter Lm Modifier_Symbol Sk Nonspacing_Mark Mn Number N Open_Punctuation Ps Other C Other_Letter Lo Other_Number No Other_Punctuation Po Other_Symbol So Paragraph_Separator Zp Private_Use Co Punctuation P punct Separator Z Space_Separator Zs Spacing_Mark Mc Surrogate Cs Symbol S Titlecase_Letter Lt Unassigned Cn Uppercase_Letter Lu",
    xe =
    "Adlam Adlm Ahom Ahom Anatolian_Hieroglyphs Hluw Arabic Arab Armenian Armn Avestan Avst Balinese Bali Bamum Bamu Bassa_Vah Bass Batak Batk Bengali Beng Bhaiksuki Bhks Bopomofo Bopo Brahmi Brah Braille Brai Buginese Bugi Buhid Buhd Canadian_Aboriginal Cans Carian Cari Caucasian_Albanian Aghb Chakma Cakm Cham Cham Cherokee Cher Common Zyyy Coptic Copt Qaac Cuneiform Xsux Cypriot Cprt Cyrillic Cyrl Deseret Dsrt Devanagari Deva Duployan Dupl Egyptian_Hieroglyphs Egyp Elbasan Elba Ethiopic Ethi Georgian Geor Glagolitic Glag Gothic Goth Grantha Gran Greek Grek Gujarati Gujr Gurmukhi Guru Han Hani Hangul Hang Hanunoo Hano Hatran Hatr Hebrew Hebr Hiragana Hira Imperial_Aramaic Armi Inherited Zinh Qaai Inscriptional_Pahlavi Phli Inscriptional_Parthian Prti Javanese Java Kaithi Kthi Kannada Knda Katakana Kana Kayah_Li Kali Kharoshthi Khar Khmer Khmr Khojki Khoj Khudawadi Sind Lao Laoo Latin Latn Lepcha Lepc Limbu Limb Linear_A Lina Linear_B Linb Lisu Lisu Lycian Lyci Lydian Lydi Mahajani Mahj Malayalam Mlym Mandaic Mand Manichaean Mani Marchen Marc Masaram_Gondi Gonm Meetei_Mayek Mtei Mende_Kikakui Mend Meroitic_Cursive Merc Meroitic_Hieroglyphs Mero Miao Plrd Modi Modi Mongolian Mong Mro Mroo Multani Mult Myanmar Mymr Nabataean Nbat New_Tai_Lue Talu Newa Newa Nko Nkoo Nushu Nshu Ogham Ogam Ol_Chiki Olck Old_Hungarian Hung Old_Italic Ital Old_North_Arabian Narb Old_Permic Perm Old_Persian Xpeo Old_South_Arabian Sarb Old_Turkic Orkh Oriya Orya Osage Osge Osmanya Osma Pahawh_Hmong Hmng Palmyrene Palm Pau_Cin_Hau Pauc Phags_Pa Phag Phoenician Phnx Psalter_Pahlavi Phlp Rejang Rjng Runic Runr Samaritan Samr Saurashtra Saur Sharada Shrd Shavian Shaw Siddham Sidd SignWriting Sgnw Sinhala Sinh Sora_Sompeng Sora Soyombo Soyo Sundanese Sund Syloti_Nagri Sylo Syriac Syrc Tagalog Tglg Tagbanwa Tagb Tai_Le Tale Tai_Tham Lana Tai_Viet Tavt Takri Takr Tamil Taml Tangut Tang Telugu Telu Thaana Thaa Thai Thai Tibetan Tibt Tifinagh Tfng Tirhuta Tirh Ugaritic Ugar Vai Vaii Warang_Citi Wara Yi Yiii Zanabazar_Square Zanb",
    ye = xe +
    " Dogra Dogr Gunjala_Gondi Gong Hanifi_Rohingya Rohg Makasar Maka Medefaidrin Medf Old_Sogdian Sogo Sogdian Sogd",
    ve = {
      9: xe,
      10: ye,
      11: "Adlam Adlm Ahom Ahom Anatolian_Hieroglyphs Hluw Arabic Arab Armenian Armn Avestan Avst Balinese Bali Bamum Bamu Bassa_Vah Bass Batak Batk Bengali Beng Bhaiksuki Bhks Bopomofo Bopo Brahmi Brah Braille Brai Buginese Bugi Buhid Buhd Canadian_Aboriginal Cans Carian Cari Caucasian_Albanian Aghb Chakma Cakm Cham Cham Cherokee Cher Common Zyyy Coptic Copt Qaac Cuneiform Xsux Cypriot Cprt Cyrillic Cyrl Deseret Dsrt Devanagari Deva Duployan Dupl Egyptian_Hieroglyphs Egyp Elbasan Elba Ethiopic Ethi Georgian Geor Glagolitic Glag Gothic Goth Grantha Gran Greek Grek Gujarati Gujr Gurmukhi Guru Han Hani Hangul Hang Hanunoo Hano Hatran Hatr Hebrew Hebr Hiragana Hira Imperial_Aramaic Armi Inherited Zinh Qaai Inscriptional_Pahlavi Phli Inscriptional_Parthian Prti Javanese Java Kaithi Kthi Kannada Knda Katakana Kana Kayah_Li Kali Kharoshthi Khar Khmer Khmr Khojki Khoj Khudawadi Sind Lao Laoo Latin Latn Lepcha Lepc Limbu Limb Linear_A Lina Linear_B Linb Lisu Lisu Lycian Lyci Lydian Lydi Mahajani Mahj Malayalam Mlym Mandaic Mand Manichaean Mani Marchen Marc Masaram_Gondi Gonm Meetei_Mayek Mtei Mende_Kikakui Mend Meroitic_Cursive Merc Meroitic_Hieroglyphs Mero Miao Plrd Modi Modi Mongolian Mong Mro Mroo Multani Mult Myanmar Mymr Nabataean Nbat New_Tai_Lue Talu Newa Newa Nko Nkoo Nushu Nshu Ogham Ogam Ol_Chiki Olck Old_Hungarian Hung Old_Italic Ital Old_North_Arabian Narb Old_Permic Perm Old_Persian Xpeo Old_South_Arabian Sarb Old_Turkic Orkh Oriya Orya Osage Osge Osmanya Osma Pahawh_Hmong Hmng Palmyrene Palm Pau_Cin_Hau Pauc Phags_Pa Phag Phoenician Phnx Psalter_Pahlavi Phlp Rejang Rjng Runic Runr Samaritan Samr Saurashtra Saur Sharada Shrd Shavian Shaw Siddham Sidd SignWriting Sgnw Sinhala Sinh Sora_Sompeng Sora Soyombo Soyo Sundanese Sund Syloti_Nagri Sylo Syriac Syrc Tagalog Tglg Tagbanwa Tagb Tai_Le Tale Tai_Tham Lana Tai_Viet Tavt Takri Takr Tamil Taml Tangut Tang Telugu Telu Thaana Thaa Thai Thai Tibetan Tibt Tifinagh Tfng Tirhuta Tirh Ugaritic Ugar Vai Vaii Warang_Citi Wara Yi Yiii Zanabazar_Square Zanb Dogra Dogr Gunjala_Gondi Gong Hanifi_Rohingya Rohg Makasar Maka Medefaidrin Medf Old_Sogdian Sogo Sogdian Sogd Elymaic Elym Nandinagari Nand Nyiakeng_Puachue_Hmong Hmnp Wancho Wcho" },

    be = {};

    function Se(e) {
      var t = be[e] = {
        binary: L(me[e] + " " + ge),
        nonBinary: {
          General_Category: L(ge),
          Script: L(ve[e]) } };


      t.nonBinary.Script_Extensions = t.nonBinary.Script, t.nonBinary.gc = t.nonBinary.General_Category, t.nonBinary.sc =
      t.nonBinary.Script, t.nonBinary.scx = t.nonBinary.Script_Extensions;
    }
    Se(9), Se(10), Se(11);
    var _e = W.prototype,
    Ce = function Ce(e) {
      this.parser = e, this.validFlags = "gim" + (e.options.ecmaVersion >= 6 ? "uy" : "") + (e.options.ecmaVersion >=
      9 ? "s" : ""), this.unicodeProperties = be[e.options.ecmaVersion >= 11 ? 11 : e.options.ecmaVersion], this.source =
      "", this.flags = "", this.start = 0, this.switchU = !1, this.switchN = !1, this.pos = 0, this.lastIntValue =
      0, this.lastStringValue = "", this.lastAssertionIsQuantifiable = !1, this.numCapturingParens = 0, this.maxBackReference =
      0, this.groupNames = [], this.backReferenceNames = [];
    };

    function ke(e) {
      return e <= 65535 ? String.fromCharCode(e) : (e -= 65536, String.fromCharCode(55296 + (e >> 10), 56320 + (1023 &
      e)));
    }

    function Ee(e) {
      return 36 === e || e >= 40 && e <= 43 || 46 === e || 63 === e || e >= 91 && e <= 94 || e >= 123 && e <= 125;
    }

    function we(e) {
      return e >= 65 && e <= 90 || e >= 97 && e <= 122;
    }

    function Ie(e) {
      return we(e) || 95 === e;
    }

    function Te(e) {
      return Ie(e) || Pe(e);
    }

    function Pe(e) {
      return e >= 48 && e <= 57;
    }

    function Ae(e) {
      return e >= 48 && e <= 57 || e >= 65 && e <= 70 || e >= 97 && e <= 102;
    }

    function Ne(e) {
      return e >= 65 && e <= 70 ? e - 65 + 10 : e >= 97 && e <= 102 ? e - 97 + 10 : e - 48;
    }

    function Ve(e) {
      return e >= 48 && e <= 55;
    }
    Ce.prototype.reset = function (e, t, r) {
      var i = -1 !== r.indexOf("u");
      this.start = 0 | e, this.source = t + "", this.flags = r, this.switchU = i && this.parser.options.ecmaVersion >=
      6, this.switchN = i && this.parser.options.ecmaVersion >= 9;
    }, Ce.prototype.raise = function (e) {
      this.parser.raiseRecoverable(this.start, "Invalid regular expression: /" + this.source + "/: " + e);
    }, Ce.prototype.at = function (e) {
      var t = this.source,
      r = t.length;
      if (e >= r) return -1;
      var i = t.charCodeAt(e);
      return !this.switchU || i <= 55295 || i >= 57344 || e + 1 >= r ? i : (i << 10) + t.charCodeAt(e + 1) -
      56613888;
    }, Ce.prototype.nextIndex = function (e) {
      var t = this.source,
      r = t.length;
      if (e >= r) return r;
      var i = t.charCodeAt(e);
      return !this.switchU || i <= 55295 || i >= 57344 || e + 1 >= r ? e + 1 : e + 2;
    }, Ce.prototype.current = function () {
      return this.at(this.pos);
    }, Ce.prototype.lookahead = function () {
      return this.at(this.nextIndex(this.pos));
    }, Ce.prototype.advance = function () {
      this.pos = this.nextIndex(this.pos);
    }, Ce.prototype.eat = function (e) {
      return this.current() === e && (this.advance(), !0);
    }, _e.validateRegExpFlags = function (e) {
      for (var t = e.validFlags, r = e.flags, i = 0; i < r.length; i++) {
        var n = r.charAt(i);-1 === t.indexOf(n) && this.raise(e.start, "Invalid regular expression flag"), r.indexOf(
        n, i + 1) > -1 && this.raise(e.start, "Duplicate regular expression flag");
      }
    }, _e.validateRegExpPattern = function (e) {
      this.regexp_pattern(e), !e.switchN && this.options.ecmaVersion >= 9 && e.groupNames.length > 0 && (e.switchN = !
      0, this.regexp_pattern(e));
    }, _e.regexp_pattern = function (e) {
      e.pos = 0, e.lastIntValue = 0, e.lastStringValue = "", e.lastAssertionIsQuantifiable = !1, e.numCapturingParens =
      0, e.maxBackReference = 0, e.groupNames.length = 0, e.backReferenceNames.length = 0, this.regexp_disjunction(
      e), e.pos !== e.source.length && (e.eat(41) && e.raise("Unmatched ')'"), (e.eat(93) || e.eat(125)) && e.raise(
      "Lone quantifier brackets")), e.maxBackReference > e.numCapturingParens && e.raise("Invalid escape");
      for (var t = 0, r = e.backReferenceNames; t < r.length; t += 1) {
        var i = r[t];-1 === e.groupNames.indexOf(i) && e.raise("Invalid named capture referenced");
      }
    }, _e.regexp_disjunction = function (e) {
      for (this.regexp_alternative(e); e.eat(124);) {this.regexp_alternative(e);}
      this.regexp_eatQuantifier(e, !0) && e.raise("Nothing to repeat"), e.eat(123) && e.raise(
      "Lone quantifier brackets");
    }, _e.regexp_alternative = function (e) {
      for (; e.pos < e.source.length && this.regexp_eatTerm(e);) {;}
    }, _e.regexp_eatTerm = function (e) {
      return this.regexp_eatAssertion(e) ? (e.lastAssertionIsQuantifiable && this.regexp_eatQuantifier(e) && e.switchU &&
      e.raise("Invalid quantifier"), !0) : !(e.switchU ? !this.regexp_eatAtom(e) : !this.regexp_eatExtendedAtom(e)) && (
      this.regexp_eatQuantifier(e), !0);
    }, _e.regexp_eatAssertion = function (e) {
      var t = e.pos;
      if (e.lastAssertionIsQuantifiable = !1, e.eat(94) || e.eat(36)) return !0;
      if (e.eat(92)) {
        if (e.eat(66) || e.eat(98)) return !0;
        e.pos = t;
      }
      if (e.eat(40) && e.eat(63)) {
        var r = !1;
        if (this.options.ecmaVersion >= 9 && (r = e.eat(60)), e.eat(61) || e.eat(33)) return this.regexp_disjunction(
        e), e.eat(41) || e.raise("Unterminated group"), e.lastAssertionIsQuantifiable = !r, !0;
      }
      return e.pos = t, !1;
    }, _e.regexp_eatQuantifier = function (e, t) {
      return void 0 === t && (t = !1), !!this.regexp_eatQuantifierPrefix(e, t) && (e.eat(63), !0);
    }, _e.regexp_eatQuantifierPrefix = function (e, t) {
      return e.eat(42) || e.eat(43) || e.eat(63) || this.regexp_eatBracedQuantifier(e, t);
    }, _e.regexp_eatBracedQuantifier = function (e, t) {
      var r = e.pos;
      if (e.eat(123)) {
        var i = 0,
        n = -1;
        if (this.regexp_eatDecimalDigits(e) && (i = e.lastIntValue, e.eat(44) && this.regexp_eatDecimalDigits(e) && (
        n = e.lastIntValue), e.eat(125))) return -1 !== n && n < i && !t && e.raise(
        "numbers out of order in {} quantifier"), !0;
        e.switchU && !t && e.raise("Incomplete quantifier"), e.pos = r;
      }
      return !1;
    }, _e.regexp_eatAtom = function (e) {
      return this.regexp_eatPatternCharacters(e) || e.eat(46) || this.regexp_eatReverseSolidusAtomEscape(e) || this.regexp_eatCharacterClass(
      e) || this.regexp_eatUncapturingGroup(e) || this.regexp_eatCapturingGroup(e);
    }, _e.regexp_eatReverseSolidusAtomEscape = function (e) {
      var t = e.pos;
      if (e.eat(92)) {
        if (this.regexp_eatAtomEscape(e)) return !0;
        e.pos = t;
      }
      return !1;
    }, _e.regexp_eatUncapturingGroup = function (e) {
      var t = e.pos;
      if (e.eat(40)) {
        if (e.eat(63) && e.eat(58)) {
          if (this.regexp_disjunction(e), e.eat(41)) return !0;
          e.raise("Unterminated group");
        }
        e.pos = t;
      }
      return !1;
    }, _e.regexp_eatCapturingGroup = function (e) {
      if (e.eat(40)) {
        if (this.options.ecmaVersion >= 9 ? this.regexp_groupSpecifier(e) : 63 === e.current() && e.raise(
        "Invalid group"), this.regexp_disjunction(e), e.eat(41)) return e.numCapturingParens += 1, !0;
        e.raise("Unterminated group");
      }
      return !1;
    }, _e.regexp_eatExtendedAtom = function (e) {
      return e.eat(46) || this.regexp_eatReverseSolidusAtomEscape(e) || this.regexp_eatCharacterClass(e) || this.regexp_eatUncapturingGroup(
      e) || this.regexp_eatCapturingGroup(e) || this.regexp_eatInvalidBracedQuantifier(e) || this.regexp_eatExtendedPatternCharacter(
      e);
    }, _e.regexp_eatInvalidBracedQuantifier = function (e) {
      return this.regexp_eatBracedQuantifier(e, !0) && e.raise("Nothing to repeat"), !1;
    }, _e.regexp_eatSyntaxCharacter = function (e) {
      var t = e.current();
      return !!Ee(t) && (e.lastIntValue = t, e.advance(), !0);
    }, _e.regexp_eatPatternCharacters = function (e) {
      for (var t = e.pos, r = 0; -1 !== (r = e.current()) && !Ee(r);) {e.advance();}
      return e.pos !== t;
    }, _e.regexp_eatExtendedPatternCharacter = function (e) {
      var t = e.current();
      return !(-1 === t || 36 === t || t >= 40 && t <= 43 || 46 === t || 63 === t || 91 === t || 94 === t || 124 ===
      t) && (e.advance(), !0);
    }, _e.regexp_groupSpecifier = function (e) {
      if (e.eat(63)) {
        if (this.regexp_eatGroupName(e)) return -1 !== e.groupNames.indexOf(e.lastStringValue) && e.raise(
        "Duplicate capture group name"), void e.groupNames.push(e.lastStringValue);
        e.raise("Invalid group");
      }
    }, _e.regexp_eatGroupName = function (e) {
      if (e.lastStringValue = "", e.eat(60)) {
        if (this.regexp_eatRegExpIdentifierName(e) && e.eat(62)) return !0;
        e.raise("Invalid capture group name");
      }
      return !1;
    }, _e.regexp_eatRegExpIdentifierName = function (e) {
      if (e.lastStringValue = "", this.regexp_eatRegExpIdentifierStart(e)) {
        for (e.lastStringValue += ke(e.lastIntValue); this.regexp_eatRegExpIdentifierPart(e);) {e.lastStringValue +=
          ke(e.lastIntValue);}
        return !0;
      }
      return !1;
    }, _e.regexp_eatRegExpIdentifierStart = function (e) {
      var t = e.pos,
      r = e.current();
      return e.advance(), 92 === r && this.regexp_eatRegExpUnicodeEscapeSequence(e) && (r = e.lastIntValue),
      function (e) {
        return f(e, !0) || 36 === e || 95 === e;
      }(r) ? (e.lastIntValue = r, !0) : (e.pos = t, !1);
    }, _e.regexp_eatRegExpIdentifierPart = function (e) {
      var t = e.pos,
      r = e.current();
      return e.advance(), 92 === r && this.regexp_eatRegExpUnicodeEscapeSequence(e) && (r = e.lastIntValue),
      function (e) {
        return m(e, !0) || 36 === e || 95 === e || 8204 === e || 8205 === e;
      }(r) ? (e.lastIntValue = r, !0) : (e.pos = t, !1);
    }, _e.regexp_eatAtomEscape = function (e) {
      return !!(this.regexp_eatBackReference(e) || this.regexp_eatCharacterClassEscape(e) || this.regexp_eatCharacterEscape(
      e) || e.switchN && this.regexp_eatKGroupName(e)) || (e.switchU && (99 === e.current() && e.raise(
      "Invalid unicode escape"), e.raise("Invalid escape")), !1);
    }, _e.regexp_eatBackReference = function (e) {
      var t = e.pos;
      if (this.regexp_eatDecimalEscape(e)) {
        var r = e.lastIntValue;
        if (e.switchU) return r > e.maxBackReference && (e.maxBackReference = r), !0;
        if (r <= e.numCapturingParens) return !0;
        e.pos = t;
      }
      return !1;
    }, _e.regexp_eatKGroupName = function (e) {
      if (e.eat(107)) {
        if (this.regexp_eatGroupName(e)) return e.backReferenceNames.push(e.lastStringValue), !0;
        e.raise("Invalid named reference");
      }
      return !1;
    }, _e.regexp_eatCharacterEscape = function (e) {
      return this.regexp_eatControlEscape(e) || this.regexp_eatCControlLetter(e) || this.regexp_eatZero(e) || this.regexp_eatHexEscapeSequence(
      e) || this.regexp_eatRegExpUnicodeEscapeSequence(e) || !e.switchU && this.regexp_eatLegacyOctalEscapeSequence(
      e) || this.regexp_eatIdentityEscape(e);
    }, _e.regexp_eatCControlLetter = function (e) {
      var t = e.pos;
      if (e.eat(99)) {
        if (this.regexp_eatControlLetter(e)) return !0;
        e.pos = t;
      }
      return !1;
    }, _e.regexp_eatZero = function (e) {
      return 48 === e.current() && !Pe(e.lookahead()) && (e.lastIntValue = 0, e.advance(), !0);
    }, _e.regexp_eatControlEscape = function (e) {
      var t = e.current();
      return 116 === t ? (e.lastIntValue = 9, e.advance(), !0) : 110 === t ? (e.lastIntValue = 10, e.advance(), !0) :
      118 === t ? (e.lastIntValue = 11, e.advance(), !0) : 102 === t ? (e.lastIntValue = 12, e.advance(), !0) : 114 ===
      t && (e.lastIntValue = 13, e.advance(), !0);
    }, _e.regexp_eatControlLetter = function (e) {
      var t = e.current();
      return !!we(t) && (e.lastIntValue = t % 32, e.advance(), !0);
    }, _e.regexp_eatRegExpUnicodeEscapeSequence = function (e) {
      var t,r = e.pos;
      if (e.eat(117)) {
        if (this.regexp_eatFixedHexDigits(e, 4)) {
          var i = e.lastIntValue;
          if (e.switchU && i >= 55296 && i <= 56319) {
            var n = e.pos;
            if (e.eat(92) && e.eat(117) && this.regexp_eatFixedHexDigits(e, 4)) {
              var s = e.lastIntValue;
              if (s >= 56320 && s <= 57343) return e.lastIntValue = 1024 * (i - 55296) + (s - 56320) + 65536, !0;
            }
            e.pos = n, e.lastIntValue = i;
          }
          return !0;
        }
        if (e.switchU && e.eat(123) && this.regexp_eatHexDigits(e) && e.eat(125) && (t = e.lastIntValue) >= 0 && t <=
        1114111) return !0;
        e.switchU && e.raise("Invalid unicode escape"), e.pos = r;
      }
      return !1;
    }, _e.regexp_eatIdentityEscape = function (e) {
      if (e.switchU) return !!this.regexp_eatSyntaxCharacter(e) || !!e.eat(47) && (e.lastIntValue = 47, !0);
      var t = e.current();
      return !(99 === t || e.switchN && 107 === t) && (e.lastIntValue = t, e.advance(), !0);
    }, _e.regexp_eatDecimalEscape = function (e) {
      e.lastIntValue = 0;
      var t = e.current();
      if (t >= 49 && t <= 57) {
        do {
          e.lastIntValue = 10 * e.lastIntValue + (t - 48), e.advance();
        } while ((t = e.current()) >= 48 && t <= 57);
        return !0;
      }
      return !1;
    }, _e.regexp_eatCharacterClassEscape = function (e) {
      var t = e.current();
      if (function (e) {
        return 100 === e || 68 === e || 115 === e || 83 === e || 119 === e || 87 === e;
      }(t)) return e.lastIntValue = -1, e.advance(), !0;
      if (e.switchU && this.options.ecmaVersion >= 9 && (80 === t || 112 === t)) {
        if (e.lastIntValue = -1, e.advance(), e.eat(123) && this.regexp_eatUnicodePropertyValueExpression(e) && e.eat(
        125)) return !0;
        e.raise("Invalid property name");
      }
      return !1;
    }, _e.regexp_eatUnicodePropertyValueExpression = function (e) {
      var t = e.pos;
      if (this.regexp_eatUnicodePropertyName(e) && e.eat(61)) {
        var r = e.lastStringValue;
        if (this.regexp_eatUnicodePropertyValue(e)) {
          var i = e.lastStringValue;
          return this.regexp_validateUnicodePropertyNameAndValue(e, r, i), !0;
        }
      }
      if (e.pos = t, this.regexp_eatLoneUnicodePropertyNameOrValue(e)) {
        var n = e.lastStringValue;
        return this.regexp_validateUnicodePropertyNameOrValue(e, n), !0;
      }
      return !1;
    }, _e.regexp_validateUnicodePropertyNameAndValue = function (e, t, r) {
      N(e.unicodeProperties.nonBinary, t) || e.raise("Invalid property name"), e.unicodeProperties.nonBinary[t].test(
      r) || e.raise("Invalid property value");
    }, _e.regexp_validateUnicodePropertyNameOrValue = function (e, t) {
      e.unicodeProperties.binary.test(t) || e.raise("Invalid property name");
    }, _e.regexp_eatUnicodePropertyName = function (e) {
      var t = 0;
      for (e.lastStringValue = ""; Ie(t = e.current());) {e.lastStringValue += ke(t), e.advance();}
      return "" !== e.lastStringValue;
    }, _e.regexp_eatUnicodePropertyValue = function (e) {
      var t = 0;
      for (e.lastStringValue = ""; Te(t = e.current());) {e.lastStringValue += ke(t), e.advance();}
      return "" !== e.lastStringValue;
    }, _e.regexp_eatLoneUnicodePropertyNameOrValue = function (e) {
      return this.regexp_eatUnicodePropertyValue(e);
    }, _e.regexp_eatCharacterClass = function (e) {
      if (e.eat(91)) {
        if (e.eat(94), this.regexp_classRanges(e), e.eat(93)) return !0;
        e.raise("Unterminated character class");
      }
      return !1;
    }, _e.regexp_classRanges = function (e) {
      for (; this.regexp_eatClassAtom(e);) {
        var t = e.lastIntValue;
        if (e.eat(45) && this.regexp_eatClassAtom(e)) {
          var r = e.lastIntValue;
          !e.switchU || -1 !== t && -1 !== r || e.raise("Invalid character class"), -1 !== t && -1 !== r && t > r && e.
          raise("Range out of order in character class");
        }
      }
    }, _e.regexp_eatClassAtom = function (e) {
      var t = e.pos;
      if (e.eat(92)) {
        if (this.regexp_eatClassEscape(e)) return !0;
        if (e.switchU) {
          var r = e.current();
          (99 === r || Ve(r)) && e.raise("Invalid class escape"), e.raise("Invalid escape");
        }
        e.pos = t;
      }
      var i = e.current();
      return 93 !== i && (e.lastIntValue = i, e.advance(), !0);
    }, _e.regexp_eatClassEscape = function (e) {
      var t = e.pos;
      if (e.eat(98)) return e.lastIntValue = 8, !0;
      if (e.switchU && e.eat(45)) return e.lastIntValue = 45, !0;
      if (!e.switchU && e.eat(99)) {
        if (this.regexp_eatClassControlLetter(e)) return !0;
        e.pos = t;
      }
      return this.regexp_eatCharacterClassEscape(e) || this.regexp_eatCharacterEscape(e);
    }, _e.regexp_eatClassControlLetter = function (e) {
      var t = e.current();
      return !(!Pe(t) && 95 !== t) && (e.lastIntValue = t % 32, e.advance(), !0);
    }, _e.regexp_eatHexEscapeSequence = function (e) {
      var t = e.pos;
      if (e.eat(120)) {
        if (this.regexp_eatFixedHexDigits(e, 2)) return !0;
        e.switchU && e.raise("Invalid escape"), e.pos = t;
      }
      return !1;
    }, _e.regexp_eatDecimalDigits = function (e) {
      var t = e.pos,
      r = 0;
      for (e.lastIntValue = 0; Pe(r = e.current());) {e.lastIntValue = 10 * e.lastIntValue + (r - 48), e.advance();}
      return e.pos !== t;
    }, _e.regexp_eatHexDigits = function (e) {
      var t = e.pos,
      r = 0;
      for (e.lastIntValue = 0; Ae(r = e.current());) {e.lastIntValue = 16 * e.lastIntValue + Ne(r), e.advance();}
      return e.pos !== t;
    }, _e.regexp_eatLegacyOctalEscapeSequence = function (e) {
      if (this.regexp_eatOctalDigit(e)) {
        var t = e.lastIntValue;
        if (this.regexp_eatOctalDigit(e)) {
          var r = e.lastIntValue;
          t <= 3 && this.regexp_eatOctalDigit(e) ? e.lastIntValue = 64 * t + 8 * r + e.lastIntValue : e.lastIntValue =
          8 * t + r;
        } else e.lastIntValue = t;
        return !0;
      }
      return !1;
    }, _e.regexp_eatOctalDigit = function (e) {
      var t = e.current();
      return Ve(t) ? (e.lastIntValue = t - 48, e.advance(), !0) : (e.lastIntValue = 0, !1);
    }, _e.regexp_eatFixedHexDigits = function (e, t) {
      var r = e.pos;
      e.lastIntValue = 0;
      for (var i = 0; i < t; ++i) {
        var n = e.current();
        if (!Ae(n)) return e.pos = r, !1;
        e.lastIntValue = 16 * e.lastIntValue + Ne(n), e.advance();
      }
      return !0;
    };
    var Le = function Le(e) {
      this.type = e.type, this.value = e.value, this.start = e.start, this.end = e.end, e.options.locations && (this.
      loc = new M(e, e.startLoc, e.endLoc)), e.options.ranges && (this.range = [e.start, e.end]);
    },
    Oe = W.prototype;

    function Me(e) {
      return e <= 65535 ? String.fromCharCode(e) : (e -= 65536, String.fromCharCode(55296 + (e >> 10), 56320 + (1023 &
      e)));
    }
    Oe.next = function () {
      this.options.onToken && this.options.onToken(new Le(this)), this.lastTokEnd = this.end, this.lastTokStart =
      this.start, this.lastTokEndLoc = this.endLoc, this.lastTokStartLoc = this.startLoc, this.nextToken();
    }, Oe.getToken = function () {
      return this.next(), new Le(this);
    }, "undefined" !== typeof Symbol && (Oe[Symbol.iterator] = function () {
      var e = this;
      return {
        next: function next() {
          var t = e.getToken();
          return {
            done: t.type === _.eof,
            value: t };

        } };

    }), Oe.curContext = function () {
      return this.context[this.context.length - 1];
    }, Oe.nextToken = function () {
      var e = this.curContext();
      return e && e.preserveSpace || this.skipSpace(), this.start = this.pos, this.options.locations && (this.startLoc =
      this.curPosition()), this.pos >= this.input.length ? this.finishToken(_.eof) : e.override ? e.override(this) :
      void this.readToken(this.fullCharCodeAtPos());
    }, Oe.readToken = function (e) {
      return f(e, this.options.ecmaVersion >= 6) || 92 === e ? this.readWord() : this.getTokenFromCode(e);
    }, Oe.fullCharCodeAtPos = function () {
      var e = this.input.charCodeAt(this.pos);
      return e <= 55295 || e >= 57344 ? e : (e << 10) + this.input.charCodeAt(this.pos + 1) - 56613888;
    }, Oe.skipBlockComment = function () {
      var e,t = this.options.onComment && this.curPosition(),
      r = this.pos,
      i = this.input.indexOf("*/", this.pos += 2);
      if (-1 === i && this.raise(this.pos - 2, "Unterminated comment"), this.pos = i + 2, this.options.locations)
      for (k.lastIndex = r;
      (e = k.exec(this.input)) && e.index < this.pos;) {++this.curLine, this.lineStart = e.index + e[0].length;}
      this.options.onComment && this.options.onComment(!0, this.input.slice(r + 2, i), r, this.pos, t, this.curPosition());
    }, Oe.skipLineComment = function (e) {
      for (var t = this.pos, r = this.options.onComment && this.curPosition(), i = this.input.charCodeAt(this.pos +=
      e); this.pos < this.input.length && !E(i);) {i = this.input.charCodeAt(++this.pos);}
      this.options.onComment && this.options.onComment(!1, this.input.slice(t + e, this.pos), t, this.pos, r, this.curPosition());
    }, Oe.skipSpace = function () {
      e: for (; this.pos < this.input.length;) {
        var e = this.input.charCodeAt(this.pos);
        switch (e) {
          case 32:
          case 160:
            ++this.pos;
            break;
          case 13:
            10 === this.input.charCodeAt(this.pos + 1) && ++this.pos;
          case 10:
          case 8232:
          case 8233:
            ++this.pos, this.options.locations && (++this.curLine, this.lineStart = this.pos);
            break;
          case 47:
            switch (this.input.charCodeAt(this.pos + 1)) {
              case 42:
                this.skipBlockComment();
                break;
              case 47:
                this.skipLineComment(2);
                break;
              default:
                break e;}

            break;
          default:
            if (!(e > 8 && e < 14 || e >= 5760 && w.test(String.fromCharCode(e)))) break e;
            ++this.pos;}

      }
    }, Oe.finishToken = function (e, t) {
      this.end = this.pos, this.options.locations && (this.endLoc = this.curPosition());
      var r = this.type;
      this.type = e, this.value = t, this.updateContext(r);
    }, Oe.readToken_dot = function () {
      var e = this.input.charCodeAt(this.pos + 1);
      if (e >= 48 && e <= 57) return this.readNumber(!0);
      var t = this.input.charCodeAt(this.pos + 2);
      return this.options.ecmaVersion >= 6 && 46 === e && 46 === t ? (this.pos += 3, this.finishToken(_.ellipsis)) : (
      ++this.pos, this.finishToken(_.dot));
    }, Oe.readToken_slash = function () {
      var e = this.input.charCodeAt(this.pos + 1);
      return this.exprAllowed ? (++this.pos, this.readRegexp()) : 61 === e ? this.finishOp(_.assign, 2) : this.finishOp(
      _.slash, 1);
    }, Oe.readToken_mult_modulo_exp = function (e) {
      var t = this.input.charCodeAt(this.pos + 1),
      r = 1,
      i = 42 === e ? _.star : _.modulo;
      return this.options.ecmaVersion >= 7 && 42 === e && 42 === t && (++r, i = _.starstar, t = this.input.charCodeAt(
      this.pos + 2)), 61 === t ? this.finishOp(_.assign, r + 1) : this.finishOp(i, r);
    }, Oe.readToken_pipe_amp = function (e) {
      var t = this.input.charCodeAt(this.pos + 1);
      return t === e ? this.finishOp(124 === e ? _.logicalOR : _.logicalAND, 2) : 61 === t ? this.finishOp(_.assign,
      2) : this.finishOp(124 === e ? _.bitwiseOR : _.bitwiseAND, 1);
    }, Oe.readToken_caret = function () {
      return 61 === this.input.charCodeAt(this.pos + 1) ? this.finishOp(_.assign, 2) : this.finishOp(_.bitwiseXOR, 1);
    }, Oe.readToken_plus_min = function (e) {
      var t = this.input.charCodeAt(this.pos + 1);
      return t === e ? 45 !== t || this.inModule || 62 !== this.input.charCodeAt(this.pos + 2) || 0 !== this.lastTokEnd &&
      !C.test(this.input.slice(this.lastTokEnd, this.pos)) ? this.finishOp(_.incDec, 2) : (this.skipLineComment(3),
      this.skipSpace(), this.nextToken()) : 61 === t ? this.finishOp(_.assign, 2) : this.finishOp(_.plusMin, 1);
    }, Oe.readToken_lt_gt = function (e) {
      var t = this.input.charCodeAt(this.pos + 1),
      r = 1;
      return t === e ? (r = 62 === e && 62 === this.input.charCodeAt(this.pos + 2) ? 3 : 2, 61 === this.input.charCodeAt(
      this.pos + r) ? this.finishOp(_.assign, r + 1) : this.finishOp(_.bitShift, r)) : 33 !== t || 60 !== e ||
      this.inModule || 45 !== this.input.charCodeAt(this.pos + 2) || 45 !== this.input.charCodeAt(this.pos + 3) ? (
      61 === t && (r = 2), this.finishOp(_.relational, r)) : (this.skipLineComment(4), this.skipSpace(), this.nextToken());
    }, Oe.readToken_eq_excl = function (e) {
      var t = this.input.charCodeAt(this.pos + 1);
      return 61 === t ? this.finishOp(_.equality, 61 === this.input.charCodeAt(this.pos + 2) ? 3 : 2) : 61 === e &&
      62 === t && this.options.ecmaVersion >= 6 ? (this.pos += 2, this.finishToken(_.arrow)) : this.finishOp(61 ===
      e ? _.eq : _.prefix, 1);
    }, Oe.getTokenFromCode = function (e) {
      switch (e) {
        case 46:
          return this.readToken_dot();
        case 40:
          return ++this.pos, this.finishToken(_.parenL);
        case 41:
          return ++this.pos, this.finishToken(_.parenR);
        case 59:
          return ++this.pos, this.finishToken(_.semi);
        case 44:
          return ++this.pos, this.finishToken(_.comma);
        case 91:
          return ++this.pos, this.finishToken(_.bracketL);
        case 93:
          return ++this.pos, this.finishToken(_.bracketR);
        case 123:
          return ++this.pos, this.finishToken(_.braceL);
        case 125:
          return ++this.pos, this.finishToken(_.braceR);
        case 58:
          return ++this.pos, this.finishToken(_.colon);
        case 63:
          return ++this.pos, this.finishToken(_.question);
        case 96:
          if (this.options.ecmaVersion < 6) break;
          return ++this.pos, this.finishToken(_.backQuote);
        case 48:
          var t = this.input.charCodeAt(this.pos + 1);
          if (120 === t || 88 === t) return this.readRadixNumber(16);
          if (this.options.ecmaVersion >= 6) {
            if (111 === t || 79 === t) return this.readRadixNumber(8);
            if (98 === t || 66 === t) return this.readRadixNumber(2);
          }
        case 49:
        case 50:
        case 51:
        case 52:
        case 53:
        case 54:
        case 55:
        case 56:
        case 57:
          return this.readNumber(!1);
        case 34:
        case 39:
          return this.readString(e);
        case 47:
          return this.readToken_slash();
        case 37:
        case 42:
          return this.readToken_mult_modulo_exp(e);
        case 124:
        case 38:
          return this.readToken_pipe_amp(e);
        case 94:
          return this.readToken_caret();
        case 43:
        case 45:
          return this.readToken_plus_min(e);
        case 60:
        case 62:
          return this.readToken_lt_gt(e);
        case 61:
        case 33:
          return this.readToken_eq_excl(e);
        case 126:
          return this.finishOp(_.prefix, 1);}

      this.raise(this.pos, "Unexpected character '" + Me(e) + "'");
    }, Oe.finishOp = function (e, t) {
      var r = this.input.slice(this.pos, this.pos + t);
      return this.pos += t, this.finishToken(e, r);
    }, Oe.readRegexp = function () {
      for (var e, t, r = this.pos;;) {
        this.pos >= this.input.length && this.raise(r, "Unterminated regular expression");
        var i = this.input.charAt(this.pos);
        if (C.test(i) && this.raise(r, "Unterminated regular expression"), e) e = !1;else
        {
          if ("[" === i) t = !0;else
          if ("]" === i && t) t = !1;else
          if ("/" === i && !t) break;
          e = "\\" === i;
        }++this.pos;
      }
      var n = this.input.slice(r, this.pos);
      ++this.pos;
      var s = this.pos,
      a = this.readWord1();
      this.containsEsc && this.unexpected(s);
      var o = this.regexpState || (this.regexpState = new Ce(this));
      o.reset(r, n, a), this.validateRegExpFlags(o), this.validateRegExpPattern(o);
      var h = null;
      try {
        h = new RegExp(n, a);
      } catch (c) {}
      return this.finishToken(_.regexp, {
        pattern: n,
        flags: a,
        value: h });

    }, Oe.readInt = function (e, t) {
      for (var r = this.pos, i = 0, n = 0, s = null == t ? 1 / 0 : t; n < s; ++n) {
        var a = this.input.charCodeAt(this.pos),
        o = void 0;
        if ((o = a >= 97 ? a - 97 + 10 : a >= 65 ? a - 65 + 10 : a >= 48 && a <= 57 ? a - 48 : 1 / 0) >= e) break;
        ++this.pos, i = i * e + o;
      }
      return this.pos === r || null != t && this.pos - r !== t ? null : i;
    }, Oe.readRadixNumber = function (e) {
      var t = this.pos;
      this.pos += 2;
      var r = this.readInt(e);
      return null == r && this.raise(this.start + 2, "Expected number in radix " + e), this.options.ecmaVersion >=
      11 && 110 === this.input.charCodeAt(this.pos) ? (r = "undefined" !== typeof BigInt ? BigInt(this.input.slice(
      t, this.pos)) : null, ++this.pos) : f(this.fullCharCodeAtPos()) && this.raise(this.pos,
      "Identifier directly after number"), this.finishToken(_.num, r);
    }, Oe.readNumber = function (e) {
      var t = this.pos;
      e || null !== this.readInt(10) || this.raise(t, "Invalid number");
      var r = this.pos - t >= 2 && 48 === this.input.charCodeAt(t);
      r && this.strict && this.raise(t, "Invalid number"), r && /[89]/.test(this.input.slice(t, this.pos)) && (r = !
      1);
      var i = this.input.charCodeAt(this.pos);
      if (!r && !e && this.options.ecmaVersion >= 11 && 110 === i) {
        var n = this.input.slice(t, this.pos),
        s = "undefined" !== typeof BigInt ? BigInt(n) : null;
        return ++this.pos, f(this.fullCharCodeAtPos()) && this.raise(this.pos, "Identifier directly after number"),
        this.finishToken(_.num, s);
      }
      46 !== i || r || (++this.pos, this.readInt(10), i = this.input.charCodeAt(this.pos)), 69 !== i && 101 !== i ||
      r || (43 !== (i = this.input.charCodeAt(++this.pos)) && 45 !== i || ++this.pos, null === this.readInt(10) &&
      this.raise(t, "Invalid number")), f(this.fullCharCodeAtPos()) && this.raise(this.pos,
      "Identifier directly after number");
      var a = this.input.slice(t, this.pos),
      o = r ? parseInt(a, 8) : parseFloat(a);
      return this.finishToken(_.num, o);
    }, Oe.readCodePoint = function () {
      var e;
      if (123 === this.input.charCodeAt(this.pos)) {
        this.options.ecmaVersion < 6 && this.unexpected();
        var t = ++this.pos;
        e = this.readHexChar(this.input.indexOf("}", this.pos) - this.pos), ++this.pos, e > 1114111 && this.invalidStringToken(
        t, "Code point out of bounds");
      } else e = this.readHexChar(4);
      return e;
    }, Oe.readString = function (e) {
      for (var t = "", r = ++this.pos;;) {
        this.pos >= this.input.length && this.raise(this.start, "Unterminated string constant");
        var i = this.input.charCodeAt(this.pos);
        if (i === e) break;
        92 === i ? (t += this.input.slice(r, this.pos), t += this.readEscapedChar(!1), r = this.pos) : (E(i, this.options.
        ecmaVersion >= 10) && this.raise(this.start, "Unterminated string constant"), ++this.pos);
      }
      return t += this.input.slice(r, this.pos++), this.finishToken(_.string, t);
    };
    var Re = {};
    Oe.tryReadTemplateToken = function () {
      this.inTemplateElement = !0;
      try {
        this.readTmplToken();
      } catch (e) {
        if (e !== Re) throw e;
        this.readInvalidTemplateToken();
      }
      this.inTemplateElement = !1;
    }, Oe.invalidStringToken = function (e, t) {
      if (this.inTemplateElement && this.options.ecmaVersion >= 9) throw Re;
      this.raise(e, t);
    }, Oe.readTmplToken = function () {
      for (var e = "", t = this.pos;;) {
        this.pos >= this.input.length && this.raise(this.start, "Unterminated template");
        var r = this.input.charCodeAt(this.pos);
        if (96 === r || 36 === r && 123 === this.input.charCodeAt(this.pos + 1)) return this.pos !== this.start ||
        this.type !== _.template && this.type !== _.invalidTemplate ? (e += this.input.slice(t, this.pos), this.finishToken(
        _.template, e)) : 36 === r ? (this.pos += 2, this.finishToken(_.dollarBraceL)) : (++this.pos, this.finishToken(
        _.backQuote));
        if (92 === r) e += this.input.slice(t, this.pos), e += this.readEscapedChar(!0), t = this.pos;else
        if (E(r)) {
          switch (e += this.input.slice(t, this.pos), ++this.pos, r) {
            case 13:
              10 === this.input.charCodeAt(this.pos) && ++this.pos;
            case 10:
              e += "\n";
              break;
            default:
              e += String.fromCharCode(r);}

          this.options.locations && (++this.curLine, this.lineStart = this.pos), t = this.pos;
        } else ++this.pos;
      }
    }, Oe.readInvalidTemplateToken = function () {
      for (; this.pos < this.input.length; this.pos++) {switch (this.input[this.pos]) {
          case "\\":
            ++this.pos;
            break;
          case "$":
            if ("{" !== this.input[this.pos + 1]) break;
          case "`":
            return this.finishToken(_.invalidTemplate, this.input.slice(this.start, this.pos));}}

      this.raise(this.start, "Unterminated template");
    }, Oe.readEscapedChar = function (e) {
      var t = this.input.charCodeAt(++this.pos);
      switch (++this.pos, t) {
        case 110:
          return "\n";
        case 114:
          return "\r";
        case 120:
          return String.fromCharCode(this.readHexChar(2));
        case 117:
          return Me(this.readCodePoint());
        case 116:
          return "\t";
        case 98:
          return "\b";
        case 118:
          return "\v";
        case 102:
          return "\f";
        case 13:
          10 === this.input.charCodeAt(this.pos) && ++this.pos;
        case 10:
          return this.options.locations && (this.lineStart = this.pos, ++this.curLine), "";
        default:
          if (t >= 48 && t <= 55) {
            var r = this.input.substr(this.pos - 1, 3).match(/^[0-7]+/)[0],
            i = parseInt(r, 8);
            return i > 255 && (r = r.slice(0, -1), i = parseInt(r, 8)), this.pos += r.length - 1, t = this.input.charCodeAt(
            this.pos), "0" === r && 56 !== t && 57 !== t || !this.strict && !e || this.invalidStringToken(this.pos -
            1 - r.length, e ? "Octal literal in template string" : "Octal literal in strict mode"), String.fromCharCode(
            i);
          }
          return E(t) ? "" : String.fromCharCode(t);}

    }, Oe.readHexChar = function (e) {
      var t = this.pos,
      r = this.readInt(16, e);
      return null === r && this.invalidStringToken(t, "Bad character escape sequence"), r;
    }, Oe.readWord1 = function () {
      this.containsEsc = !1;
      for (var e = "", t = !0, r = this.pos, i = this.options.ecmaVersion >= 6; this.pos < this.input.length;) {
        var n = this.fullCharCodeAtPos();
        if (m(n, i)) this.pos += n <= 65535 ? 1 : 2;else
        {
          if (92 !== n) break;
          this.containsEsc = !0, e += this.input.slice(r, this.pos);
          var s = this.pos;
          117 !== this.input.charCodeAt(++this.pos) && this.invalidStringToken(this.pos,
          "Expecting Unicode escape sequence \\uXXXX"), ++this.pos;
          var a = this.readCodePoint();
          (t ? f : m)(a, i) || this.invalidStringToken(s, "Invalid Unicode escape"), e += Me(a), r = this.pos;
        }
        t = !1;
      }
      return e + this.input.slice(r, this.pos);
    }, Oe.readWord = function () {
      var e = this.readWord1(),
      t = _.name;
      return this.keywords.test(e) && (this.containsEsc && this.raiseRecoverable(this.start,
      "Escape sequence in keyword " + e), t = b[e]), this.finishToken(t, e);
    };
    var De = "7.1.0";

    function Be(e, t) {
      return W.parse(e, t);
    }

    function Fe(e, t, r) {
      return W.parseExpressionAt(e, t, r);
    }

    function He(e, t) {
      return W.tokenizer(e, t);
    }
    W.acorn = {
      Parser: W,
      version: De,
      defaultOptions: D,
      Position: O,
      SourceLocation: M,
      getLineInfo: R,
      Node: oe,
      TokenType: g,
      tokTypes: _,
      keywordTypes: b,
      TokContext: ue,
      tokContexts: pe,
      isIdentifierChar: m,
      isIdentifierStart: f,
      Token: Le,
      isNewLine: E,
      lineBreak: C,
      lineBreakG: k,
      nonASCIIwhitespace: w };

  }, function (e, t, r) {
    "use strict";
    var i = r(0);
    Object.defineProperty(t, "__esModule", {
      value: !0 }),
    t.Messages = t.InterruptThrowReferenceError = t.InterruptThrowSyntaxError = t.InterruptThrowError = t.ThrowTypeError =
    t.ThrowReferenceError = t.ThrowSyntaxError = t.ThrowError = void 0;
    var n = i(r(12)),
    s = i(r(13)),
    a = function (e) {
      function t() {
        return e.apply(this, arguments) || this;
      }
      return (0, n.default)(t, e), t;
    }((0, s.default)(Error));
    t.ThrowError = a;
    var o = function (e) {
      function t() {
        return e.apply(this, arguments) || this;
      }
      return (0, n.default)(t, e), t;
    }((0, s.default)(SyntaxError));
    t.ThrowSyntaxError = o;
    var h = function (e) {
      function t() {
        return e.apply(this, arguments) || this;
      }
      return (0, n.default)(t, e), t;
    }((0, s.default)(ReferenceError));
    t.ThrowReferenceError = h;
    var c = function (e) {
      function t() {
        return e.apply(this, arguments) || this;
      }
      return (0, n.default)(t, e), t;
    }((0, s.default)(TypeError));
    t.ThrowTypeError = c;
    var u = function (e) {
      function t() {
        return e.apply(this, arguments) || this;
      }
      return (0, n.default)(t, e), t;
    }(a);
    t.InterruptThrowError = u;
    var p = function (e) {
      function t() {
        return e.apply(this, arguments) || this;
      }
      return (0, n.default)(t, e), t;
    }(o);
    t.InterruptThrowSyntaxError = p;
    var l = function (e) {
      function t() {
        return e.apply(this, arguments) || this;
      }
      return (0, n.default)(t, e), t;
    }(h);
    t.InterruptThrowReferenceError = l;
    var d = {
      UnknownError: [3001, "%0", u],
      ExecutionTimeOutError: [3002, "Script execution timed out after %0ms", u],
      NodeTypeSyntaxError: [1001, "Unknown node type: %0", l],
      BinaryOperatorSyntaxError: [1002, "Unknown binary operator: %0", l],
      LogicalOperatorSyntaxError: [1003, "Unknown logical operator: %0", l],
      UnaryOperatorSyntaxError: [1004, "Unknown unary operator: %0", l],
      UpdateOperatorSyntaxError: [1005, "Unknown update operator: %0", l],
      ObjectStructureSyntaxError: [1006, "Unknown object structure: %0", l],
      AssignmentExpressionSyntaxError: [1007, "Unknown assignment expression: %0", l],
      VariableTypeSyntaxError: [1008, "Unknown variable type: %0", l],
      ParamTypeSyntaxError: [1009, "Unknown param type: %0", l],
      AssignmentTypeSyntaxError: [1010, "Unknown assignment type: %0", l],
      FunctionUndefinedReferenceError: [2001, "%0 is not a function", h],
      VariableUndefinedReferenceError: [2002, "%0 is not defined", h],
      IsNotConstructor: [2003, "%0 is not a constructor", c] };

    t.Messages = d;
  }, function (e, t) {
    e.exports = function (e, t) {
      e.prototype = Object.create(t.prototype), e.prototype.constructor = e, e.__proto__ = t;
    };
  }, function (e, t, r) {
    var i = r(14),
    n = r(4),
    s = r(15),
    a = r(3);

    function o(t) {
      var r = "function" === typeof Map ? new Map() : void 0;
      return e.exports = o = function o(e) {
        if (null === e || !s(e)) return e;
        if ("function" !== typeof e) throw new TypeError("Super expression must either be null or a function");
        if ("undefined" !== typeof r) {
          if (r.has(e)) return r.get(e);
          r.set(e, t);
        }

        function t() {
          return a(e, arguments, i(this).constructor);
        }
        return t.prototype = Object.create(e.prototype, {
          constructor: {
            value: t,
            enumerable: !1,
            writable: !0,
            configurable: !0 } }),

        n(t, e);
      }, o(t);
    }
    e.exports = o;
  }, function (e, t) {
    function r(t) {
      return e.exports = r = Object.setPrototypeOf ? Object.getPrototypeOf : function (e) {
        return e.__proto__ || Object.getPrototypeOf(e);
      }, r(t);
    }
    e.exports = r;
  }, function (e, t) {
    e.exports = function (e) {
      return -1 !== Function.toString.call(e).indexOf("[native code]");
    };
  }, function (e, t, r) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
      value: !0 }),
    t.default = void 0;
    var i = r(1);
    t.default = function (e, t, r) {
      return (0, i.runInContext)(e, t, r);
    };
  }, function (e, t, r) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
      value: !0 }),
    t.default = function () {
      for (var e = arguments.length, t = new Array(e), r = 0; r < e; r++) {t[r] = arguments[r];}
      var n = t.pop();
      return (0, i.compileFunction)(n || "", t);
    };
    var i = r(1);
  }]);
});

/***/ }),

/***/ 130:
/*!***************************************************************************!*\
  !*** C:/Users/pc4/Desktop/工作/玺玥月子餐设计/玺玥月子餐/components/uni-icons/icons.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = {
  "pulldown": "\uE588",
  "refreshempty": "\uE461",
  "back": "\uE471",
  "forward": "\uE470",
  "more": "\uE507",
  "more-filled": "\uE537",
  "scan": "\uE612",
  "qq": "\uE264",
  "weibo": "\uE260",
  "weixin": "\uE261",
  "pengyouquan": "\uE262",
  "loop": "\uE565",
  "refresh": "\uE407",
  "refresh-filled": "\uE437",
  "arrowthindown": "\uE585",
  "arrowthinleft": "\uE586",
  "arrowthinright": "\uE587",
  "arrowthinup": "\uE584",
  "undo-filled": "\uE7D6",
  "undo": "\uE406",
  "redo": "\uE405",
  "redo-filled": "\uE7D9",
  "bars": "\uE563",
  "chatboxes": "\uE203",
  "camera": "\uE301",
  "chatboxes-filled": "\uE233",
  "camera-filled": "\uE7EF",
  "cart-filled": "\uE7F4",
  "cart": "\uE7F5",
  "checkbox-filled": "\uE442",
  "checkbox": "\uE7FA",
  "arrowleft": "\uE582",
  "arrowdown": "\uE581",
  "arrowright": "\uE583",
  "smallcircle-filled": "\uE801",
  "arrowup": "\uE580",
  "circle": "\uE411",
  "eye-filled": "\uE568",
  "eye-slash-filled": "\uE822",
  "eye-slash": "\uE823",
  "eye": "\uE824",
  "flag-filled": "\uE825",
  "flag": "\uE508",
  "gear-filled": "\uE532",
  "reload": "\uE462",
  "gear": "\uE502",
  "hand-thumbsdown-filled": "\uE83B",
  "hand-thumbsdown": "\uE83C",
  "hand-thumbsup-filled": "\uE83D",
  "heart-filled": "\uE83E",
  "hand-thumbsup": "\uE83F",
  "heart": "\uE840",
  "home": "\uE500",
  "info": "\uE504",
  "home-filled": "\uE530",
  "info-filled": "\uE534",
  "circle-filled": "\uE441",
  "chat-filled": "\uE847",
  "chat": "\uE263",
  "mail-open-filled": "\uE84D",
  "email-filled": "\uE231",
  "mail-open": "\uE84E",
  "email": "\uE201",
  "checkmarkempty": "\uE472",
  "list": "\uE562",
  "locked-filled": "\uE856",
  "locked": "\uE506",
  "map-filled": "\uE85C",
  "map-pin": "\uE85E",
  "map-pin-ellipse": "\uE864",
  "map": "\uE364",
  "minus-filled": "\uE440",
  "mic-filled": "\uE332",
  "minus": "\uE410",
  "micoff": "\uE360",
  "mic": "\uE302",
  "clear": "\uE434",
  "smallcircle": "\uE868",
  "close": "\uE404",
  "closeempty": "\uE460",
  "paperclip": "\uE567",
  "paperplane": "\uE503",
  "paperplane-filled": "\uE86E",
  "person-filled": "\uE131",
  "contact-filled": "\uE130",
  "person": "\uE101",
  "contact": "\uE100",
  "images-filled": "\uE87A",
  "phone": "\uE200",
  "images": "\uE87B",
  "image": "\uE363",
  "image-filled": "\uE877",
  "location-filled": "\uE333",
  "location": "\uE303",
  "plus-filled": "\uE439",
  "plus": "\uE409",
  "plusempty": "\uE468",
  "help-filled": "\uE535",
  "help": "\uE505",
  "navigate-filled": "\uE884",
  "navigate": "\uE501",
  "mic-slash-filled": "\uE892",
  "search": "\uE466",
  "settings": "\uE560",
  "sound": "\uE590",
  "sound-filled": "\uE8A1",
  "spinner-cycle": "\uE465",
  "download-filled": "\uE8A4",
  "personadd-filled": "\uE132",
  "videocam-filled": "\uE8AF",
  "personadd": "\uE102",
  "upload": "\uE402",
  "upload-filled": "\uE8B1",
  "starhalf": "\uE463",
  "star-filled": "\uE438",
  "star": "\uE408",
  "trash": "\uE401",
  "phone-filled": "\uE230",
  "compose": "\uE400",
  "videocam": "\uE300",
  "trash-filled": "\uE8DC",
  "download": "\uE403",
  "chatbubble-filled": "\uE232",
  "chatbubble": "\uE202",
  "cloud-download": "\uE8E4",
  "cloud-upload-filled": "\uE8E5",
  "cloud-upload": "\uE8E6",
  "cloud-download-filled": "\uE8E9",
  "headphones": "\uE8BF",
  "shop": "\uE609" };exports.default = _default;

/***/ }),

/***/ 2:
/*!******************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * Vue.js v2.6.11
 * (c) 2014-2020 Evan You
 * Released under the MIT License.
 */
/*  */

var emptyObject = Object.freeze({});

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive.
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

function isPromise (val) {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if an attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array.
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether an object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */
var identity = function (_) { return _; };

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
];

/*  */



var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /*@__PURE__*/(function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (true) {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    {
      if(vm.$scope && vm.$scope.is){
        return vm.$scope.is
      }
    }
    if (vm.$root === vm) {
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm) {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  // fixed by xxxxxx (nvue vuex)
  /* eslint-disable no-undef */
  if(typeof SharedObject !== 'undefined'){
    this.id = SharedObject.uid++;
  } else {
    this.id = uid++;
  }
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.SharedObject.target) {
    Dep.SharedObject.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  if ( true && !config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) { return a.id - b.id; });
  }
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
// fixed by xxxxxx (nvue shared vuex)
/* eslint-disable no-undef */
Dep.SharedObject = typeof SharedObject !== 'undefined' ? SharedObject : {};
Dep.SharedObject.target = null;
Dep.SharedObject.targetStack = [];

function pushTarget (target) {
  Dep.SharedObject.targetStack.push(target);
  Dep.SharedObject.target = target;
}

function popTarget () {
  Dep.SharedObject.targetStack.pop();
  Dep.SharedObject.target = Dep.SharedObject.targetStack[Dep.SharedObject.targetStack.length - 1];
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    if (hasProto) {
      {// fixed by xxxxxx 微信小程序使用 plugins 之后，数组方法被直接挂载到了数组对象上，需要执行 copyAugment 逻辑
        if(value.push !== value.__proto__.push){
          copyAugment(value, arrayMethods, arrayKeys);
        } else {
          protoAugment(value, arrayMethods);
        }
      }
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.SharedObject.target) { // fixed by xxxxxx
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if ( true && customSetter) {
        customSetter();
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) { return }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (true) {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;

  var keys = hasSymbol
    ? Reflect.ownKeys(from)
    : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    // in case the object is already observed...
    if (key === '__ob__') { continue }
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
       true && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  var res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal;
  return res
    ? dedupeHooks(res)
    : res
}

function dedupeHooks (hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
     true && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (true) {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'should conform to valid custom element name in html5 specification.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (true) {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];
      if (typeof def$$1 === 'function') {
        dirs[key] = { bind: def$$1, update: def$$1 };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (true) {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ( true && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */



function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  if (
    true
  ) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ( true && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(
      getInvalidTypeMessage(name, value, expectedTypes),
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

function getInvalidTypeMessage (name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." +
    " Expected " + (expectedTypes.map(capitalize).join(', '));
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType);
  // check if we need to specify expected value
  if (expectedTypes.length === 1 &&
      isExplicable(expectedType) &&
      !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }
  message += ", got " + receivedType + " ";
  // check if we need to specify received value
  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }
  return message
}

function styleValue (value, type) {
  if (type === 'String') {
    return ("\"" + value + "\"")
  } else if (type === 'Number') {
    return ("" + (Number(value)))
  } else {
    return ("" + value)
  }
}

function isExplicable (value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) { return value.toLowerCase() === elem; })
}

function isBoolean () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return args.some(function (elem) { return elem.toLowerCase() === 'boolean'; })
}

/*  */

function handleError (err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();
  try {
    if (vm) {
      var cur = vm;
      while ((cur = cur.$parent)) {
        var hooks = cur.$options.errorCaptured;
        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;
              if (capture) { return }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling (
  handler,
  context,
  args,
  vm,
  info
) {
  var res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context);
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
      // issue #9511
      // avoid catch triggering multiple times when nested calls
      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }
  return res
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (true) {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
var timerFunc;

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  timerFunc = function () {
    p.then(flushCallbacks);
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });
  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Technically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (true) {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var warnReservedPrefix = function (target, key) {
    warn(
      "Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " +
      'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
      'prevent conflicts with Vue internals. ' +
      'See: https://vuejs.org/v2/api/#data',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) ||
        (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));
      if (!has && !isAllowed) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

var mark;
var measure;

if (true) {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      // perf.clearMeasures(name)
    };
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns, vm) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler")
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  createOnceHandler,
  vm
) {
  var name, def$$1, cur, old, event;
  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
       true && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }
      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }
      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

/*  */

// fixed by xxxxxx (mp properties)
function extractPropertiesFromVNodeData(data, Ctor, res, context) {
  var propOptions = Ctor.options.mpOptions && Ctor.options.mpOptions.properties;
  if (isUndef(propOptions)) {
    return res
  }
  var externalClasses = Ctor.options.mpOptions.externalClasses || [];
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      var result = checkProp(res, props, key, altKey, true) ||
          checkProp(res, attrs, key, altKey, false);
      // externalClass
      if (
        result &&
        res[key] &&
        externalClasses.indexOf(altKey) !== -1 &&
        context[camelize(res[key])]
      ) {
        // 赋值 externalClass 真正的值(模板里 externalClass 的值可能是字符串)
        res[key] = context[camelize(res[key])];
      }
    }
  }
  return res
}

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag,
  context// fixed by xxxxxx
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    // fixed by xxxxxx
    return extractPropertiesFromVNodeData(data, Ctor, {}, context)
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (true) {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  // fixed by xxxxxx
  return extractPropertiesFromVNodeData(data, Ctor, res, context)
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (true) {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {}
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject)
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // #6574 in case the inject object is observed...
      if (key === '__ob__') { continue }
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (true) {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  if (!children || !children.length) {
    return {}
  }
  var slots = {};
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      // fixed by xxxxxx 临时 hack 掉 uni-app 中的异步 name slot page
      if(child.asyncMeta && child.asyncMeta.data && child.asyncMeta.data.slot === 'page'){
        (slots['page'] || (slots['page'] = [])).push(child);
      }else{
        (slots.default || (slots.default = [])).push(child);
      }
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

/*  */

function normalizeScopedSlots (
  slots,
  normalSlots,
  prevSlots
) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;
  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized
  } else if (
    isStable &&
    prevSlots &&
    prevSlots !== emptyObject &&
    key === prevSlots.$key &&
    !hasNormalSlots &&
    !prevSlots.$hasNormal
  ) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots
  } else {
    res = {};
    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  }
  // expose normal slots on scopedSlots
  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  }
  // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error
  if (slots && Object.isExtensible(slots)) {
    (slots)._normalized = res;
  }
  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res)
      ? [res] // single vnode
      : normalizeChildren(res);
    return res && (
      res.length === 0 ||
      (res.length === 1 && res[0].isComment) // #9658
    ) ? undefined
      : res
  };
  // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.
  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }
  return normalized
}

function proxyNormalSlot(slots, key) {
  return function () { return slots[key]; }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i, i, i); // fixed by xxxxxx
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i, i, i); // fixed by xxxxxx
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render(result.value, ret.length, i++, i)); // fixed by xxxxxx
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i, i); // fixed by xxxxxx
      }
    }
  }
  if (!isDef(ret)) {
    ret = [];
  }
  (ret)._isVList = true;
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if ( true && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    // fixed by xxxxxx app-plus scopedSlot
    nodes = scopedSlotFn(props, this, props._i) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
       true && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);
        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
       true && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function resolveScopedSlots (
  fns, // see flow/vnode
  res,
  // the following are added in 2.6
  hasDynamicKeys,
  contentHashKey
) {
  res = res || { $stable: !hasDynamicKeys };
  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];
    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }
      res[slot.key] = slot.fn;
    }
  }
  if (contentHashKey) {
    (res).$key = contentHashKey;
  }
  return res
}

/*  */

function bindDynamicKeys (baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];
    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if ( true && key !== '' && key !== null) {
      // null is a special value for explicitly removing a binding
      warn(
        ("Invalid value for dynamic directive argument (expected string or null): " + key),
        this
      );
    }
  }
  return baseObj
}

// helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.
function prependModifier (value, symbol) {
  return typeof value === 'string' ? symbol + value : value
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var this$1 = this;

  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(
        data.scopedSlots,
        this$1.$slots = resolveSlots(children, parent)
      );
    }
    return this$1.$slots
  };

  Object.defineProperty(this, 'scopedSlots', ({
    enumerable: true,
    get: function get () {
      return normalizeScopedSlots(data.scopedSlots, this.slots())
    }
  }));

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (true) {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

/*  */

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (vnode, hydrating) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      callHook(componentInstance, 'onServiceCreated');
      callHook(componentInstance, 'onServiceAttached');
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (true) {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag, context); // fixed by xxxxxx

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1 (f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input'
  ;(data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;
  if (isDef(existing)) {
    if (
      Array.isArray(existing)
        ? existing.indexOf(callback) === -1
        : existing !== callback
    ) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
     true && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if ( true &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      if ( true && isDef(data) && isDef(data.nativeOn)) {
        warn(
          ("The .native modifier for v-on is only valid on components but it was used on <" + tag + ">."),
          context
        );
      }
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (true) {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {}
}

var currentRenderingInstance = null;

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(
        _parentVnode.data.scopedSlots,
        vm.$slots,
        vm.$scopedSlots
      );
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      // There's no need to maintain a stack because all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if ( true && vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    }
    // if the returned array contains only a single node, allow it
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ( true && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  var owner = currentRenderingInstance;
  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null

    ;(owner).$on('hook:destroyed', function () { return remove(owners, owner); });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        (owners[i]).$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;
        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }
        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });

    var reject = once(function (reason) {
       true && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;
            if (isUndef(factory.resolved)) {
              reject(
                 true
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : undefined
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn) {
  target.$on(event, fn);
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function createOnceHandler (event, fn) {
  var _target = target;
  return function onceHandler () {
    var res = fn.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  }
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (true) {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";
      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }
    return vm
  };
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  }
}

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (true) {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.

  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.
  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(
    (newScopedSlots && !newScopedSlots.$stable) ||
    (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
    (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)
  );

  // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.
  var needsForceUpdate = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    hasDynamicScopedSlot
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }
  
  // fixed by xxxxxx update properties(mp runtime)
  vm._$updateProperties && vm._$updateProperties(vm);
  
  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (true) {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */

var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (true) {
    circular = {};
  }
  waiting = flushing = false;
}

// Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.
var currentFlushTimestamp = 0;

// Async edge case fix requires storing an event listener's attach timestamp.
var getNow = Date.now;

// Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)
if (inBrowser && !isIE) {
  var performance = window.performance;
  if (
    performance &&
    typeof performance.now === 'function' &&
    getNow() > document.createEvent('Event').timeStamp
  ) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () { return performance.now(); };
  }
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ( true && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;

      if ( true && !config.async) {
        flushSchedulerQueue();
        return
      }
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */



var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression =  true
    ? expOrFn.toString()
    : undefined;
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = noop;
       true && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
  var i = this.deps.length;
  while (i--) {
    var dep = this.deps[i];
    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
  var i = this.deps.length;
  while (i--) {
    this.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (true) {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          {
            if(vm.mpHost === 'mp-baidu'){//百度 observer 在 setData callback 之后触发，直接忽略该 warn
                return
            }
            //fixed by xxxxxx __next_tick_pending,uni://form-field 时不告警
            if(
                key === 'value' && 
                Array.isArray(vm.$options.behaviors) &&
                vm.$options.behaviors.indexOf('uni://form-field') !== -1
              ){
              return
            }
            if(vm._getFormData){
              return
            }
            var $parent = vm.$parent;
            while($parent){
              if($parent.__next_tick_pending){
                return  
              }
              $parent = $parent.$parent;
            }
          }
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {}
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
     true && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (true) {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
       true && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if ( true && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (true) {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  if ( true &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.SharedObject.target) {// fixed by xxxxxx
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function createGetterInvoker(fn) {
  return function computedGetter () {
    return fn.call(this, this)
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (true) {
      if (typeof methods[key] !== 'function') {
        warn(
          "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (true) {
    dataDef.set = function () {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
      }
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (true) {
      initProxy(vm);
    } else {}
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    !vm._$fallback && initInjections(vm); // resolve injections before data/props  
    initState(vm);
    !vm._$fallback && initProvide(vm); // resolve provide after data/props
    !vm._$fallback && callHook(vm, 'created');      

    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = latest[key];
    }
  }
  return modified
}

function Vue (options) {
  if ( true &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if ( true && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if ( true && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */



function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (true) {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  // 2.6 explicit observable API
  Vue.observable = function (obj) {
    observe(obj);
    return obj
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.6.11';

/**
 * https://raw.githubusercontent.com/Tencent/westore/master/packages/westore/utils/diff.js
 */
var ARRAYTYPE = '[object Array]';
var OBJECTTYPE = '[object Object]';
// const FUNCTIONTYPE = '[object Function]'

function diff(current, pre) {
    var result = {};
    syncKeys(current, pre);
    _diff(current, pre, '', result);
    return result
}

function syncKeys(current, pre) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
        if(Object.keys(current).length >= Object.keys(pre).length){
            for (var key in pre) {
                var currentValue = current[key];
                if (currentValue === undefined) {
                    current[key] = null;
                } else {
                    syncKeys(currentValue, pre[key]);
                }
            }
        }
    } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
        if (current.length >= pre.length) {
            pre.forEach(function (item, index) {
                syncKeys(current[index], item);
            });
        }
    }
}

function _diff(current, pre, path, result) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE) {
        if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
            setResult(result, path, current);
        } else {
            var loop = function ( key ) {
                var currentValue = current[key];
                var preValue = pre[key];
                var currentType = type(currentValue);
                var preType = type(preValue);
                if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
                    if (currentValue != pre[key]) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    }
                } else if (currentType == ARRAYTYPE) {
                    if (preType != ARRAYTYPE) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        if (currentValue.length < preValue.length) {
                            setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                        } else {
                            currentValue.forEach(function (item, index) {
                                _diff(item, preValue[index], (path == '' ? '' : path + ".") + key + '[' + index + ']', result);
                            });
                        }
                    }
                } else if (currentType == OBJECTTYPE) {
                    if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        for (var subKey in currentValue) {
                            _diff(currentValue[subKey], preValue[subKey], (path == '' ? '' : path + ".") + key + '.' + subKey, result);
                        }
                    }
                }
            };

            for (var key in current) loop( key );
        }
    } else if (rootCurrentType == ARRAYTYPE) {
        if (rootPreType != ARRAYTYPE) {
            setResult(result, path, current);
        } else {
            if (current.length < pre.length) {
                setResult(result, path, current);
            } else {
                current.forEach(function (item, index) {
                    _diff(item, pre[index], path + '[' + index + ']', result);
                });
            }
        }
    } else {
        setResult(result, path, current);
    }
}

function setResult(result, k, v) {
    // if (type(v) != FUNCTIONTYPE) {
        result[k] = v;
    // }
}

function type(obj) {
    return Object.prototype.toString.call(obj)
}

/*  */

function flushCallbacks$1(vm) {
    if (vm.__next_tick_callbacks && vm.__next_tick_callbacks.length) {
        if (Object({"VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:flushCallbacks[' + vm.__next_tick_callbacks.length + ']');
        }
        var copies = vm.__next_tick_callbacks.slice(0);
        vm.__next_tick_callbacks.length = 0;
        for (var i = 0; i < copies.length; i++) {
            copies[i]();
        }
    }
}

function hasRenderWatcher(vm) {
    return queue.find(function (watcher) { return vm._watcher === watcher; })
}

function nextTick$1(vm, cb) {
    //1.nextTick 之前 已 setData 且 setData 还未回调完成
    //2.nextTick 之前存在 render watcher
    if (!vm.__next_tick_pending && !hasRenderWatcher(vm)) {
        if(Object({"VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:nextVueTick');
        }
        return nextTick(cb, vm)
    }else{
        if(Object({"VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance$1 = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance$1.is || mpInstance$1.route) + '][' + vm._uid +
                ']:nextMPTick');
        }
    }
    var _resolve;
    if (!vm.__next_tick_callbacks) {
        vm.__next_tick_callbacks = [];
    }
    vm.__next_tick_callbacks.push(function () {
        if (cb) {
            try {
                cb.call(vm);
            } catch (e) {
                handleError(e, vm, 'nextTick');
            }
        } else if (_resolve) {
            _resolve(vm);
        }
    });
    // $flow-disable-line
    if (!cb && typeof Promise !== 'undefined') {
        return new Promise(function (resolve) {
            _resolve = resolve;
        })
    }
}

/*  */

function cloneWithData(vm) {
  // 确保当前 vm 所有数据被同步
  var ret = Object.create(null);
  var dataKeys = [].concat(
    Object.keys(vm._data || {}),
    Object.keys(vm._computedWatchers || {}));

  dataKeys.reduce(function(ret, key) {
    ret[key] = vm[key];
    return ret
  }, ret);
  //TODO 需要把无用数据处理掉，比如 list=>l0 则 list 需要移除，否则多传输一份数据
  Object.assign(ret, vm.$mp.data || {});
  if (
    Array.isArray(vm.$options.behaviors) &&
    vm.$options.behaviors.indexOf('uni://form-field') !== -1
  ) { //form-field
    ret['name'] = vm.name;
    ret['value'] = vm.value;
  }

  return JSON.parse(JSON.stringify(ret))
}

var patch = function(oldVnode, vnode) {
  var this$1 = this;

  if (vnode === null) { //destroy
    return
  }
  if (this.mpType === 'page' || this.mpType === 'component') {
    var mpInstance = this.$scope;
    var data = Object.create(null);
    try {
      data = cloneWithData(this);
    } catch (err) {
      console.error(err);
    }
    data.__webviewId__ = mpInstance.data.__webviewId__;
    var mpData = Object.create(null);
    Object.keys(data).forEach(function (key) { //仅同步 data 中有的数据
      mpData[key] = mpInstance.data[key];
    });
    var diffData = this.$shouldDiffData === false ? data : diff(data, mpData);
    if (Object.keys(diffData).length) {
      if (Object({"VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + this._uid +
          ']差量更新',
          JSON.stringify(diffData));
      }
      this.__next_tick_pending = true;
      mpInstance.setData(diffData, function () {
        this$1.__next_tick_pending = false;
        flushCallbacks$1(this$1);
      });
    } else {
      flushCallbacks$1(this);
    }
  }
};

/*  */

function createEmptyRender() {

}

function mountComponent$1(
  vm,
  el,
  hydrating
) {
  if (!vm.mpType) {//main.js 中的 new Vue
    return vm
  }
  if (vm.mpType === 'app') {
    vm.$options.render = createEmptyRender;
  }
  if (!vm.$options.render) {
    vm.$options.render = createEmptyRender;
    if (true) {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  
  !vm._$fallback && callHook(vm, 'beforeMount');

  var updateComponent = function () {
    vm._update(vm._render(), hydrating);
  };

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before: function before() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
  hydrating = false;
  return vm
}

/*  */

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/*  */

var MP_METHODS = ['createSelectorQuery', 'createIntersectionObserver', 'selectAllComponents', 'selectComponent'];

function getTarget(obj, path) {
  var parts = path.split('.');
  var key = parts[0];
  if (key.indexOf('__$n') === 0) { //number index
    key = parseInt(key.replace('__$n', ''));
  }
  if (parts.length === 1) {
    return obj[key]
  }
  return getTarget(obj[key], parts.slice(1).join('.'))
}

function internalMixin(Vue) {

  Vue.config.errorHandler = function(err) {
    console.error(err);
    /* eslint-disable no-undef */
    var app = getApp();
    if (app && app.onError) {
      app.onError(err);
    }
  };

  var oldEmit = Vue.prototype.$emit;

  Vue.prototype.$emit = function(event) {
    if (this.$scope && event) {
      this.$scope['triggerEvent'](event, {
        __args__: toArray(arguments, 1)
      });
    }
    return oldEmit.apply(this, arguments)
  };

  Vue.prototype.$nextTick = function(fn) {
    return nextTick$1(this, fn)
  };

  MP_METHODS.forEach(function (method) {
    Vue.prototype[method] = function(args) {
      if (this.$scope && this.$scope[method]) {
        return this.$scope[method](args)
      }
      // mp-alipay
      if (typeof my === 'undefined') {
        return
      }
      if (method === 'createSelectorQuery') {
        /* eslint-disable no-undef */
        return my.createSelectorQuery(args)
      } else if (method === 'createIntersectionObserver') {
        /* eslint-disable no-undef */
        return my.createIntersectionObserver(args)
      }
      // TODO mp-alipay 暂不支持 selectAllComponents,selectComponent
    };
  });

  Vue.prototype.__init_provide = initProvide;

  Vue.prototype.__init_injections = initInjections;

  Vue.prototype.__call_hook = function(hook, args) {
    var vm = this;
    // #7573 disable dep collection when invoking lifecycle hooks
    pushTarget();
    var handlers = vm.$options[hook];
    var info = hook + " hook";
    var ret;
    if (handlers) {
      for (var i = 0, j = handlers.length; i < j; i++) {
        ret = invokeWithErrorHandling(handlers[i], vm, args ? [args] : null, vm, info);
      }
    }
    if (vm._hasHookEvent) {
      vm.$emit('hook:' + hook, args);
    }
    popTarget();
    return ret
  };

  Vue.prototype.__set_model = function(target, key, value, modifiers) {
    if (Array.isArray(modifiers)) {
      if (modifiers.indexOf('trim') !== -1) {
        value = value.trim();
      }
      if (modifiers.indexOf('number') !== -1) {
        value = this._n(value);
      }
    }
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__set_sync = function(target, key, value) {
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__get_orig = function(item) {
    if (isPlainObject(item)) {
      return item['$orig'] || item
    }
    return item
  };

  Vue.prototype.__get_value = function(dataPath, target) {
    return getTarget(target || this, dataPath)
  };


  Vue.prototype.__get_class = function(dynamicClass, staticClass) {
    return renderClass(staticClass, dynamicClass)
  };

  Vue.prototype.__get_style = function(dynamicStyle, staticStyle) {
    if (!dynamicStyle && !staticStyle) {
      return ''
    }
    var dynamicStyleObj = normalizeStyleBinding(dynamicStyle);
    var styleObj = staticStyle ? extend(staticStyle, dynamicStyleObj) : dynamicStyleObj;
    return Object.keys(styleObj).map(function (name) { return ((hyphenate(name)) + ":" + (styleObj[name])); }).join(';')
  };

  Vue.prototype.__map = function(val, iteratee) {
    //TODO 暂不考虑 string,number
    var ret, i, l, keys, key;
    if (Array.isArray(val)) {
      ret = new Array(val.length);
      for (i = 0, l = val.length; i < l; i++) {
        ret[i] = iteratee(val[i], i);
      }
      return ret
    } else if (isObject(val)) {
      keys = Object.keys(val);
      ret = Object.create(null);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[key] = iteratee(val[key], key, i);
      }
      return ret
    }
    return []
  };

}

/*  */

var LIFECYCLE_HOOKS$1 = [
    //App
    'onLaunch',
    'onShow',
    'onHide',
    'onUniNViewMessage',
    'onError',
    //Page
    'onLoad',
    // 'onShow',
    'onReady',
    // 'onHide',
    'onUnload',
    'onPullDownRefresh',
    'onReachBottom',
    'onTabItemTap',
    'onShareAppMessage',
    'onResize',
    'onPageScroll',
    'onNavigationBarButtonTap',
    'onBackPress',
    'onNavigationBarSearchInputChanged',
    'onNavigationBarSearchInputConfirmed',
    'onNavigationBarSearchInputClicked',
    //Component
    // 'onReady', // 兼容旧版本，应该移除该事件
    'onPageShow',
    'onPageHide',
    'onPageResize'
];
function lifecycleMixin$1(Vue) {

    //fixed vue-class-component
    var oldExtend = Vue.extend;
    Vue.extend = function(extendOptions) {
        extendOptions = extendOptions || {};

        var methods = extendOptions.methods;
        if (methods) {
            Object.keys(methods).forEach(function (methodName) {
                if (LIFECYCLE_HOOKS$1.indexOf(methodName)!==-1) {
                    extendOptions[methodName] = methods[methodName];
                    delete methods[methodName];
                }
            });
        }

        return oldExtend.call(this, extendOptions)
    };

    var strategies = Vue.config.optionMergeStrategies;
    var mergeHook = strategies.created;
    LIFECYCLE_HOOKS$1.forEach(function (hook) {
        strategies[hook] = mergeHook;
    });

    Vue.prototype.__lifecycle_hooks__ = LIFECYCLE_HOOKS$1;
}

/*  */

// install platform patch function
Vue.prototype.__patch__ = patch;

// public mount method
Vue.prototype.$mount = function(
    el ,
    hydrating 
) {
    return mountComponent$1(this, el, hydrating)
};

lifecycleMixin$1(Vue);
internalMixin(Vue);

/*  */

/* harmony default export */ __webpack_exports__["default"] = (Vue);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 3)))

/***/ }),

/***/ 25:
/*!************************************************************************!*\
  !*** C:/Users/pc4/Desktop/工作/玺玥月子餐设计/玺玥月子餐/common/jquery-1.8.3.min.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*! jQuery v1.8.3 jquery.com | jquery.org/license */
(function (e, t) {
  function _(e) {
    var t = M[e] = {};
    return v.each(e.split(y), function (e, n) {
      t[n] = !0;
    }), t;
  }

  function H(e, n, r) {
    if (r === t && e.nodeType === 1) {
      var i = "data-" + n.replace(P, "-$1").toLowerCase();
      r = e.getAttribute(i);
      if (typeof r == "string") {
        try {
          r = r === "true" ? !0 : r === "false" ? !1 : r === "null" ? null : +r + "" === r ? +r : D.test(r) ? v.parseJSON(r) :
          r;
        } catch (s) {}
        v.data(e, n, r);
      } else r = t;
    }
    return r;
  }

  function B(e) {
    var t;
    for (t in e) {
      if (t === "data" && v.isEmptyObject(e[t])) continue;
      if (t !== "toJSON") return !1;
    }
    return !0;
  }

  function et() {
    return !1;
  }

  function tt() {
    return !0;
  }

  function ut(e) {
    return !e || !e.parentNode || e.parentNode.nodeType === 11;
  }

  function at(e, t) {
    do {e = e[t];} while (e && e.nodeType !== 1);
    return e;
  }

  function ft(e, t, n) {
    t = t || 0;
    if (v.isFunction(t)) return v.grep(e, function (e, r) {
      var i = !!t.call(e, r, e);
      return i === n;
    });
    if (t.nodeType) return v.grep(e, function (e, r) {
      return e === t === n;
    });
    if (typeof t == "string") {
      var r = v.grep(e, function (e) {
        return e.nodeType === 1;
      });
      if (it.test(t)) return v.filter(t, r, !n);
      t = v.filter(t, r);
    }
    return v.grep(e, function (e, r) {
      return v.inArray(e, t) >= 0 === n;
    });
  }

  function lt(e) {
    var t = ct.split("|"),
    n = e.createDocumentFragment();
    if (n.createElement)
    while (t.length) {n.createElement(t.pop());}
    return n;
  }

  function Lt(e, t) {
    return e.getElementsByTagName(t)[0] || e.appendChild(e.ownerDocument.createElement(t));
  }

  function At(e, t) {
    if (t.nodeType !== 1 || !v.hasData(e)) return;
    var n,r,i,s = v._data(e),
    o = v._data(t, s),
    u = s.events;
    if (u) {
      delete o.handle, o.events = {};
      for (n in u) {
        for (r = 0, i = u[n].length; r < i; r++) {v.event.add(t, n, u[n][r]);}}
    }
    o.data && (o.data = v.extend({}, o.data));
  }

  function Ot(e, t) {
    var n;
    if (t.nodeType !== 1) return;
    t.clearAttributes && t.clearAttributes(), t.mergeAttributes && t.mergeAttributes(e), n = t.nodeName.toLowerCase(), n ===
    "object" ? (t.parentNode && (t.outerHTML = e.outerHTML), v.support.html5Clone && e.innerHTML && !v.trim(t.innerHTML) && (
    t.innerHTML = e.innerHTML)) : n === "input" && Et.test(e.type) ? (t.defaultChecked = t.checked = e.checked, t.value !==
    e.value && (t.value = e.value)) : n === "option" ? t.selected = e.defaultSelected : n === "input" || n ===
    "textarea" ? t.defaultValue = e.defaultValue : n === "script" && t.text !== e.text && (t.text = e.text), t.removeAttribute(
    v.expando);
  }

  function Mt(e) {
    return typeof e.getElementsByTagName != "undefined" ? e.getElementsByTagName("*") : typeof e.querySelectorAll !=
    "undefined" ? e.querySelectorAll("*") : [];
  }

  function _t(e) {
    Et.test(e.type) && (e.defaultChecked = e.checked);
  }

  function Qt(e, t) {
    if (t in e) return t;
    var n = t.charAt(0).toUpperCase() + t.slice(1),
    r = t,
    i = Jt.length;
    while (i--) {
      t = Jt[i] + n;
      if (t in e) return t;
    }
    return r;
  }

  function Gt(e, t) {
    return e = t || e, v.css(e, "display") === "none" || !v.contains(e.ownerDocument, e);
  }

  function Yt(e, t) {
    var n,r,i = [],
    s = 0,
    o = e.length;
    for (; s < o; s++) {
      n = e[s];
      if (!n.style) continue;
      i[s] = v._data(n, "olddisplay"), t ? (!i[s] && n.style.display === "none" && (n.style.display = ""), n.style.display ===
      "" && Gt(n) && (i[s] = v._data(n, "olddisplay", nn(n.nodeName)))) : (r = Dt(n, "display"), !i[s] && r !== "none" &&
      v._data(n, "olddisplay", r));
    }
    for (s = 0; s < o; s++) {
      n = e[s];
      if (!n.style) continue;
      if (!t || n.style.display === "none" || n.style.display === "") n.style.display = t ? i[s] || "" : "none";
    }
    return e;
  }

  function Zt(e, t, n) {
    var r = Rt.exec(t);
    return r ? Math.max(0, r[1] - (n || 0)) + (r[2] || "px") : t;
  }

  function en(e, t, n, r) {
    var i = n === (r ? "border" : "content") ? 4 : t === "width" ? 1 : 0,
    s = 0;
    for (; i < 4; i += 2) {n === "margin" && (s += v.css(e, n + $t[i], !0)), r ? (n === "content" && (s -= parseFloat(Dt(
      e, "padding" + $t[i])) || 0), n !== "margin" && (s -= parseFloat(Dt(e, "border" + $t[i] + "Width")) || 0)) : (s +=
      parseFloat(Dt(e, "padding" + $t[i])) || 0, n !== "padding" && (s += parseFloat(Dt(e, "border" + $t[i] + "Width")) ||
      0));}
    return s;
  }

  function tn(e, t, n) {
    var r = t === "width" ? e.offsetWidth : e.offsetHeight,
    i = !0,
    s = v.support.boxSizing && v.css(e, "boxSizing") === "border-box";
    if (r <= 0 || r == null) {
      r = Dt(e, t);
      if (r < 0 || r == null) r = e.style[t];
      if (Ut.test(r)) return r;
      i = s && (v.support.boxSizingReliable || r === e.style[t]), r = parseFloat(r) || 0;
    }
    return r + en(e, t, n || (s ? "border" : "content"), i) + "px";
  }

  function nn(e) {
    if (Wt[e]) return Wt[e];
    var t = v("<" + e + ">").appendTo(i.body),
    n = t.css("display");
    t.remove();
    if (n === "none" || n === "") {
      Pt = i.body.appendChild(Pt || v.extend(i.createElement("iframe"), {
        frameBorder: 0,
        width: 0,
        height: 0 }));

      if (!Ht || !Pt.createElement) Ht = (Pt.contentWindow || Pt.contentDocument).document, Ht.write(
      "<!doctype html><html><body>"), Ht.close();
      t = Ht.body.appendChild(Ht.createElement(e)), n = Dt(t, "display"), i.body.removeChild(Pt);
    }
    return Wt[e] = n, n;
  }

  function fn(e, t, n, r) {
    var i;
    if (v.isArray(t)) v.each(t, function (t, i) {
      n || sn.test(e) ? r(e, i) : fn(e + "[" + (typeof i == "object" ? t : "") + "]", i, n, r);
    });else
    if (!n && v.type(t) === "object")
    for (i in t) {fn(e + "[" + i + "]", t[i], n, r);} else
    r(e, t);
  }

  function Cn(e) {
    return function (t, n) {
      typeof t != "string" && (n = t, t = "*");
      var r,i,s,o = t.toLowerCase().split(y),
      u = 0,
      a = o.length;
      if (v.isFunction(n))
      for (; u < a; u++) {r = o[u], s = /^\+/.test(r), s && (r = r.substr(1) || "*"), i = e[r] = e[r] || [], i[s ?
        "unshift" : "push"](n);}
    };
  }

  function kn(e, n, r, i, s, o) {
    s = s || n.dataTypes[0], o = o || {}, o[s] = !0;
    var u,a = e[s],
    f = 0,
    l = a ? a.length : 0,
    c = e === Sn;
    for (; f < l && (c || !u); f++) {u = a[f](n, r, i), typeof u == "string" && (!c || o[u] ? u = t : (n.dataTypes.unshift(
      u), u = kn(e, n, r, i, u, o)));}
    return (c || !u) && !o["*"] && (u = kn(e, n, r, i, "*", o)), u;
  }

  function Ln(e, n) {
    var r,i,s = v.ajaxSettings.flatOptions || {};
    for (r in n) {n[r] !== t && ((s[r] ? e : i || (i = {}))[r] = n[r]);}
    i && v.extend(!0, e, i);
  }

  function An(e, n, r) {
    var i,s,o,u,a = e.contents,
    f = e.dataTypes,
    l = e.responseFields;
    for (s in l) {s in r && (n[l[s]] = r[s]);}
    while (f[0] === "*") {f.shift(), i === t && (i = e.mimeType || n.getResponseHeader("content-type"));}
    if (i)
    for (s in a) {
      if (a[s] && a[s].test(i)) {
        f.unshift(s);
        break;
      }}if (f[0] in r) o = f[0];else
    {
      for (s in r) {
        if (!f[0] || e.converters[s + " " + f[0]]) {
          o = s;
          break;
        }
        u || (u = s);
      }
      o = o || u;
    }
    if (o) return o !== f[0] && f.unshift(o), r[o];
  }

  function On(e, t) {
    var n,r,i,s,o = e.dataTypes.slice(),
    u = o[0],
    a = {},
    f = 0;
    e.dataFilter && (t = e.dataFilter(t, e.dataType));
    if (o[1])
    for (n in e.converters) {a[n.toLowerCase()] = e.converters[n];}
    for (; i = o[++f];) {
      if (i !== "*") {
        if (u !== "*" && u !== i) {
          n = a[u + " " + i] || a["* " + i];
          if (!n)
          for (r in a) {
            s = r.split(" ");
            if (s[1] === i) {
              n = a[u + " " + s[0]] || a["* " + s[0]];
              if (n) {
                n === !0 ? n = a[r] : a[r] !== !0 && (i = s[0], o.splice(f--, 0, i));
                break;
              }
            }
          }
          if (n !== !0)
          if (n && e["throws"]) t = n(t);else
          try {
            t = n(t);
          } catch (l) {
            return {
              state: "parsererror",
              error: n ? l : "No conversion from " + u + " to " + i };

          }
        }
        u = i;
      }}return {
      state: "success",
      data: t };

  }

  function Fn() {
    try {
      return new e.XMLHttpRequest();
    } catch (t) {}
  }

  function In() {
    try {
      return new e.ActiveXObject("Microsoft.XMLHTTP");
    } catch (t) {}
  }

  function $n() {
    return setTimeout(function () {
      qn = t;
    }, 0), qn = v.now();
  }

  function Jn(e, t) {
    v.each(t, function (t, n) {
      var r = (Vn[t] || []).concat(Vn["*"]),
      i = 0,
      s = r.length;
      for (; i < s; i++) {
        if (r[i].call(e, t, n)) return;}
    });
  }

  function Kn(e, t, n) {
    var r,i = 0,
    s = 0,
    o = Xn.length,
    u = v.Deferred().always(function () {
      delete a.elem;
    }),
    a = function a() {
      var t = qn || $n(),
      n = Math.max(0, f.startTime + f.duration - t),
      r = n / f.duration || 0,
      i = 1 - r,
      s = 0,
      o = f.tweens.length;
      for (; s < o; s++) {f.tweens[s].run(i);}
      return u.notifyWith(e, [f, i, n]), i < 1 && o ? n : (u.resolveWith(e, [f]), !1);
    },
    f = u.promise({
      elem: e,
      props: v.extend({}, t),
      opts: v.extend(!0, {
        specialEasing: {} },
      n),
      originalProperties: t,
      originalOptions: n,
      startTime: qn || $n(),
      duration: n.duration,
      tweens: [],
      createTween: function createTween(t, n, r) {
        var i = v.Tween(e, f.opts, t, n, f.opts.specialEasing[t] || f.opts.easing);
        return f.tweens.push(i), i;
      },
      stop: function stop(t) {
        var n = 0,
        r = t ? f.tweens.length : 0;
        for (; n < r; n++) {f.tweens[n].run(1);}
        return t ? u.resolveWith(e, [f, t]) : u.rejectWith(e, [f, t]), this;
      } }),

    l = f.props;
    Qn(l, f.opts.specialEasing);
    for (; i < o; i++) {
      r = Xn[i].call(f, e, l, f.opts);
      if (r) return r;
    }
    return Jn(f, l), v.isFunction(f.opts.start) && f.opts.start.call(e, f), v.fx.timer(v.extend(a, {
      anim: f,
      queue: f.opts.queue,
      elem: e })),
    f.progress(f.opts.progress).done(f.opts.done, f.opts.complete).fail(f.opts.fail).always(f.opts.always);
  }

  function Qn(e, t) {
    var n, r, i, s, o;
    for (n in e) {
      r = v.camelCase(n), i = t[r], s = e[n], v.isArray(s) && (i = s[1], s = e[n] = s[0]), n !== r && (e[r] = s, delete e[
      n]), o = v.cssHooks[r];
      if (o && "expand" in o) {
        s = o.expand(s), delete e[r];
        for (n in s) {n in e || (e[n] = s[n], t[n] = i);}
      } else t[r] = i;
    }
  }

  function Gn(e, t, n) {
    var r,i,s,o,u,a,f,l,c,h = this,
    p = e.style,
    d = {},
    m = [],
    g = e.nodeType && Gt(e);
    n.queue || (l = v._queueHooks(e, "fx"), l.unqueued == null && (l.unqueued = 0, c = l.empty.fire, l.empty.fire =
    function () {
      l.unqueued || c();
    }), l.unqueued++, h.always(function () {
      h.always(function () {
        l.unqueued--, v.queue(e, "fx").length || l.empty.fire();
      });
    })), e.nodeType === 1 && ("height" in t || "width" in t) && (n.overflow = [p.overflow, p.overflowX, p.overflowY], v.
    css(e, "display") === "inline" && v.css(e, "float") === "none" && (!v.support.inlineBlockNeedsLayout || nn(e.nodeName) ===
    "inline" ? p.display = "inline-block" : p.zoom = 1)), n.overflow && (p.overflow = "hidden", v.support.shrinkWrapBlocks ||
    h.done(function () {
      p.overflow = n.overflow[0], p.overflowX = n.overflow[1], p.overflowY = n.overflow[2];
    }));
    for (r in t) {
      s = t[r];
      if (Un.exec(s)) {
        delete t[r], a = a || s === "toggle";
        if (s === (g ? "hide" : "show")) continue;
        m.push(r);
      }
    }
    o = m.length;
    if (o) {
      u = v._data(e, "fxshow") || v._data(e, "fxshow", {}), "hidden" in u && (g = u.hidden), a && (u.hidden = !g), g ? v(
      e).show() : h.done(function () {
        v(e).hide();
      }), h.done(function () {
        var t;
        v.removeData(e, "fxshow", !0);
        for (t in d) {v.style(e, t, d[t]);}
      });
      for (r = 0; r < o; r++) {i = m[r], f = h.createTween(i, g ? u[i] : 0), d[i] = u[i] || v.style(e, i), i in u || (u[i] =
        f.start, g && (f.end = f.start, f.start = i === "width" || i === "height" ? 1 : 0));}
    }
  }

  function Yn(e, t, n, r, i) {
    return new Yn.prototype.init(e, t, n, r, i);
  }

  function Zn(e, t) {
    var n,r = {
      height: e },

    i = 0;
    t = t ? 1 : 0;
    for (; i < 4; i += 2 - t) {n = $t[i], r["margin" + n] = r["padding" + n] = e;}
    return t && (r.opacity = r.width = e), r;
  }

  function tr(e) {
    return v.isWindow(e) ? e : e.nodeType === 9 ? e.defaultView || e.parentWindow : !1;
  }
  var n,r,i = e.document,
  s = e.location,
  o = e.navigator,
  u = e.jQuery,
  a = e.$,
  f = Array.prototype.push,
  l = Array.prototype.slice,
  c = Array.prototype.indexOf,
  h = Object.prototype.toString,
  p = Object.prototype.hasOwnProperty,
  d = String.prototype.trim,
  v = function v(e, t) {
    return new v.fn.init(e, t, n);
  },
  m = /[\-+]?(?:\d*\.|)\d+(?:[eE][\-+]?\d+|)/.source,
  g = /\S/,
  y = /\s+/,
  b = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
  w = /^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/,
  E = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
  S = /^[\],:{}\s]*$/,
  x = /(?:^|:|,)(?:\s*\[)+/g,
  T = /\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g,
  N = /"[^"\\\r\n]*"|true|false|null|-?(?:\d\d*\.|)\d+(?:[eE][\-+]?\d+|)/g,
  C = /^-ms-/,
  k = /-([\da-z])/gi,
  L = function L(e, t) {
    return (t + "").toUpperCase();
  },
  A = function A() {
    i.addEventListener ? (i.removeEventListener("DOMContentLoaded", A, !1), v.ready()) : i.readyState === "complete" && (
    i.detachEvent("onreadystatechange", A), v.ready());
  },
  O = {};
  v.fn = v.prototype = {
    constructor: v,
    init: function init(e, n, r) {
      var s, o, u, a;
      if (!e) return this;
      if (e.nodeType) return this.context = this[0] = e, this.length = 1, this;
      if (typeof e == "string") {
        e.charAt(0) === "<" && e.charAt(e.length - 1) === ">" && e.length >= 3 ? s = [null, e, null] : s = w.exec(e);
        if (s && (s[1] || !n)) {
          if (s[1]) return n = n instanceof v ? n[0] : n, a = n && n.nodeType ? n.ownerDocument || n : i, e = v.parseHTML(
          s[1], a, !0), E.test(s[1]) && v.isPlainObject(n) && this.attr.call(e, n, !0), v.merge(this, e);
          o = i.getElementById(s[2]);
          if (o && o.parentNode) {
            if (o.id !== s[2]) return r.find(e);
            this.length = 1, this[0] = o;
          }
          return this.context = i, this.selector = e, this;
        }
        return !n || n.jquery ? (n || r).find(e) : this.constructor(n).find(e);
      }
      return v.isFunction(e) ? r.ready(e) : (e.selector !== t && (this.selector = e.selector, this.context = e.context),
      v.makeArray(e, this));
    },
    selector: "",
    jquery: "1.8.3",
    length: 0,
    size: function size() {
      return this.length;
    },
    toArray: function toArray() {
      return l.call(this);
    },
    get: function get(e) {
      return e == null ? this.toArray() : e < 0 ? this[this.length + e] : this[e];
    },
    pushStack: function pushStack(e, t, n) {
      var r = v.merge(this.constructor(), e);
      return r.prevObject = this, r.context = this.context, t === "find" ? r.selector = this.selector + (this.selector ?
      " " : "") + n : t && (r.selector = this.selector + "." + t + "(" + n + ")"), r;
    },
    each: function each(e, t) {
      return v.each(this, e, t);
    },
    ready: function ready(e) {
      return v.ready.promise().done(e), this;
    },
    eq: function eq(e) {
      return e = +e, e === -1 ? this.slice(e) : this.slice(e, e + 1);
    },
    first: function first() {
      return this.eq(0);
    },
    last: function last() {
      return this.eq(-1);
    },
    slice: function slice() {
      return this.pushStack(l.apply(this, arguments), "slice", l.call(arguments).join(","));
    },
    map: function map(e) {
      return this.pushStack(v.map(this, function (t, n) {
        return e.call(t, n, t);
      }));
    },
    end: function end() {
      return this.prevObject || this.constructor(null);
    },
    push: f,
    sort: [].sort,
    splice: [].splice },
  v.fn.init.prototype = v.fn, v.extend = v.fn.extend = function () {
    var e,n,r,i,s,o,u = arguments[0] || {},
    a = 1,
    f = arguments.length,
    l = !1;
    typeof u == "boolean" && (l = u, u = arguments[1] || {}, a = 2), typeof u != "object" && !v.isFunction(u) && (u = {}),
    f === a && (u = this, --a);
    for (; a < f; a++) {
      if ((e = arguments[a]) != null)
      for (n in e) {
        r = u[n], i = e[n];
        if (u === i) continue;
        l && i && (v.isPlainObject(i) || (s = v.isArray(i))) ? (s ? (s = !1, o = r && v.isArray(r) ? r : []) : o = r &&
        v.isPlainObject(r) ? r : {}, u[n] = v.extend(l, o, i)) : i !== t && (u[n] = i);
      }}
    return u;
  }, v.extend({
    noConflict: function noConflict(t) {
      return e.$ === v && (e.$ = a), t && e.jQuery === v && (e.jQuery = u), v;
    },
    isReady: !1,
    readyWait: 1,
    holdReady: function holdReady(e) {
      e ? v.readyWait++ : v.ready(!0);
    },
    ready: function ready(e) {
      if (e === !0 ? --v.readyWait : v.isReady) return;
      if (!i.body) return setTimeout(v.ready, 1);
      v.isReady = !0;
      if (e !== !0 && --v.readyWait > 0) return;
      r.resolveWith(i, [v]), v.fn.trigger && v(i).trigger("ready").off("ready");
    },
    isFunction: function isFunction(e) {
      return v.type(e) === "function";
    },
    isArray: Array.isArray || function (e) {
      return v.type(e) === "array";
    },
    isWindow: function isWindow(e) {
      return e != null && e == e.window;
    },
    isNumeric: function isNumeric(e) {
      return !isNaN(parseFloat(e)) && isFinite(e);
    },
    type: function type(e) {
      return e == null ? String(e) : O[h.call(e)] || "object";
    },
    isPlainObject: function isPlainObject(e) {
      if (!e || v.type(e) !== "object" || e.nodeType || v.isWindow(e)) return !1;
      try {
        if (e.constructor && !p.call(e, "constructor") && !p.call(e.constructor.prototype, "isPrototypeOf")) return !1;
      } catch (n) {
        return !1;
      }
      var r;
      for (r in e) {;}
      return r === t || p.call(e, r);
    },
    isEmptyObject: function isEmptyObject(e) {
      var t;
      for (t in e) {return !1;}
      return !0;
    },
    error: function error(e) {
      throw new Error(e);
    },
    parseHTML: function parseHTML(e, t, n) {
      var r;
      return !e || typeof e != "string" ? null : (typeof t == "boolean" && (n = t, t = 0), t = t || i, (r = E.exec(e)) ?
      [t.createElement(r[1])] : (r = v.buildFragment([e], t, n ? null : []), v.merge([], (r.cacheable ? v.clone(r.fragment) :
      r.fragment).childNodes)));
    },
    parseJSON: function parseJSON(t) {
      if (!t || typeof t != "string") return null;
      t = v.trim(t);
      if (e.JSON && e.JSON.parse) return e.JSON.parse(t);
      if (S.test(t.replace(T, "@").replace(N, "]").replace(x, ""))) return new Function("return " + t)();
      v.error("Invalid JSON: " + t);
    },
    parseXML: function parseXML(n) {
      var r, i;
      if (!n || typeof n != "string") return null;
      try {
        e.DOMParser ? (i = new DOMParser(), r = i.parseFromString(n, "text/xml")) : (r = new ActiveXObject(
        "Microsoft.XMLDOM"), r.async = "false", r.loadXML(n));
      } catch (s) {
        r = t;
      }
      return (!r || !r.documentElement || r.getElementsByTagName("parsererror").length) && v.error("Invalid XML: " + n),
      r;
    },
    noop: function noop() {},
    globalEval: function globalEval(t) {
      t && g.test(t) && (e.execScript || function (t) {
        e.eval.call(e, t);
      })(t);
    },
    camelCase: function camelCase(e) {
      return e.replace(C, "ms-").replace(k, L);
    },
    nodeName: function nodeName(e, t) {
      return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase();
    },
    each: function each(e, n, r) {
      var i,s = 0,
      o = e.length,
      u = o === t || v.isFunction(e);
      if (r) {
        if (u) {
          for (i in e) {
            if (n.apply(e[i], r) === !1) break;}
        } else
        for (; s < o;) {
          if (n.apply(e[s++], r) === !1) break;}
      } else if (u) {
        for (i in e) {
          if (n.call(e[i], i, e[i]) === !1) break;}
      } else
      for (; s < o;) {
        if (n.call(e[s], s, e[s++]) === !1) break;}
      return e;
    },
    trim: d && !d.call("\uFEFF\xA0") ? function (e) {
      return e == null ? "" : d.call(e);
    } : function (e) {
      return e == null ? "" : (e + "").replace(b, "");
    },
    makeArray: function makeArray(e, t) {
      var n,r = t || [];
      return e != null && (n = v.type(e), e.length == null || n === "string" || n === "function" || n === "regexp" ||
      v.isWindow(e) ? f.call(r, e) : v.merge(r, e)), r;
    },
    inArray: function inArray(e, t, n) {
      var r;
      if (t) {
        if (c) return c.call(t, e, n);
        r = t.length, n = n ? n < 0 ? Math.max(0, r + n) : n : 0;
        for (; n < r; n++) {
          if (n in t && t[n] === e) return n;}
      }
      return -1;
    },
    merge: function merge(e, n) {
      var r = n.length,
      i = e.length,
      s = 0;
      if (typeof r == "number")
      for (; s < r; s++) {e[i++] = n[s];} else

      while (n[s] !== t) {e[i++] = n[s++];}
      return e.length = i, e;
    },
    grep: function grep(e, t, n) {
      var r,i = [],
      s = 0,
      o = e.length;
      n = !!n;
      for (; s < o; s++) {r = !!t(e[s], s), n !== r && i.push(e[s]);}
      return i;
    },
    map: function map(e, n, r) {
      var i,s,o = [],
      u = 0,
      a = e.length,
      f = e instanceof v || a !== t && typeof a == "number" && (a > 0 && e[0] && e[a - 1] || a === 0 || v.isArray(e));
      if (f)
      for (; u < a; u++) {i = n(e[u], u, r), i != null && (o[o.length] = i);} else

      for (s in e) {i = n(e[s], s, r), i != null && (o[o.length] = i);}
      return o.concat.apply([], o);
    },
    guid: 1,
    proxy: function proxy(e, n) {
      var r, i, s;
      return typeof n == "string" && (r = e[n], n = e, e = r), v.isFunction(e) ? (i = l.call(arguments, 2), s =
      function s() {
        return e.apply(n, i.concat(l.call(arguments)));
      }, s.guid = e.guid = e.guid || v.guid++, s) : t;
    },
    access: function access(e, n, r, i, s, o, u) {
      var a,f = r == null,
      l = 0,
      c = e.length;
      if (r && typeof r == "object") {
        for (l in r) {v.access(e, n, l, r[l], 1, o, i);}
        s = 1;
      } else if (i !== t) {
        a = u === t && v.isFunction(i), f && (a ? (a = n, n = function n(e, t, _n2) {
          return a.call(v(e), _n2);
        }) : (n.call(e, i), n = null));
        if (n)
        for (; l < c; l++) {n(e[l], r, a ? i.call(e[l], l, n(e[l], r)) : i, u);}
        s = 1;
      }
      return s ? e : f ? n.call(e) : c ? n(e[0], r) : o;
    },
    now: function now() {
      return new Date().getTime();
    } }),
  v.ready.promise = function (t) {
    if (!r) {
      r = v.Deferred();
      if (i.readyState === "complete") setTimeout(v.ready, 1);else
      if (i.addEventListener) i.addEventListener("DOMContentLoaded", A, !1), e.addEventListener("load", v.ready, !1);else
      {
        i.attachEvent("onreadystatechange", A), e.attachEvent("onload", v.ready);
        var n = !1;
        try {
          n = e.frameElement == null && i.documentElement;
        } catch (s) {}
        n && n.doScroll && function o() {
          if (!v.isReady) {
            try {
              n.doScroll("left");
            } catch (e) {
              return setTimeout(o, 50);
            }
            v.ready();
          }
        }();
      }
    }
    return r.promise(t);
  }, v.each("Boolean Number String Function Array Date RegExp Object".split(" "), function (e, t) {
    O["[object " + t + "]"] = t.toLowerCase();
  }), n = v(i);
  var M = {};
  v.Callbacks = function (e) {
    e = typeof e == "string" ? M[e] || _(e) : v.extend({}, e);
    var n,r,i,s,o,u,a = [],
    f = !e.once && [],
    l = function l(t) {
      n = e.memory && t, r = !0, u = s || 0, s = 0, o = a.length, i = !0;
      for (; a && u < o; u++) {
        if (a[u].apply(t[0], t[1]) === !1 && e.stopOnFalse) {
          n = !1;
          break;
        }}i = !1, a && (f ? f.length && l(f.shift()) : n ? a = [] : c.disable());
    },
    c = {
      add: function add() {
        if (a) {
          var t = a.length;
          (function r(t) {
            v.each(t, function (t, n) {
              var i = v.type(n);
              i === "function" ? (!e.unique || !c.has(n)) && a.push(n) : n && n.length && i !== "string" && r(n);
            });
          })(arguments), i ? o = a.length : n && (s = t, l(n));
        }
        return this;
      },
      remove: function remove() {
        return a && v.each(arguments, function (e, t) {
          var n;
          while ((n = v.inArray(t, a, n)) > -1) {a.splice(n, 1), i && (n <= o && o--, n <= u && u--);}
        }), this;
      },
      has: function has(e) {
        return v.inArray(e, a) > -1;
      },
      empty: function empty() {
        return a = [], this;
      },
      disable: function disable() {
        return a = f = n = t, this;
      },
      disabled: function disabled() {
        return !a;
      },
      lock: function lock() {
        return f = t, n || c.disable(), this;
      },
      locked: function locked() {
        return !f;
      },
      fireWith: function fireWith(e, t) {
        return t = t || [], t = [e, t.slice ? t.slice() : t], a && (!r || f) && (i ? f.push(t) : l(t)), this;
      },
      fire: function fire() {
        return c.fireWith(this, arguments), this;
      },
      fired: function fired() {
        return !!r;
      } };

    return c;
  }, v.extend({
    Deferred: function Deferred(e) {
      var t = [
      ["resolve", "done", v.Callbacks("once memory"), "resolved"],
      ["reject", "fail", v.Callbacks("once memory"), "rejected"],
      ["notify", "progress", v.Callbacks("memory")]],

      n = "pending",
      r = {
        state: function state() {
          return n;
        },
        always: function always() {
          return i.done(arguments).fail(arguments), this;
        },
        then: function then() {
          var e = arguments;
          return v.Deferred(function (n) {
            v.each(t, function (t, r) {
              var s = r[0],
              o = e[t];
              i[r[1]](v.isFunction(o) ? function () {
                var e = o.apply(this, arguments);
                e && v.isFunction(e.promise) ? e.promise().done(n.resolve).fail(n.reject).progress(n.notify) : n[s +
                "With"](this === i ? n : this, [e]);
              } : n[s]);
            }), e = null;
          }).promise();
        },
        promise: function promise(e) {
          return e != null ? v.extend(e, r) : r;
        } },

      i = {};
      return r.pipe = r.then, v.each(t, function (e, s) {
        var o = s[2],
        u = s[3];
        r[s[1]] = o.add, u && o.add(function () {
          n = u;
        }, t[e ^ 1][2].disable, t[2][2].lock), i[s[0]] = o.fire, i[s[0] + "With"] = o.fireWith;
      }), r.promise(i), e && e.call(i, i), i;
    },
    when: function when(e) {
      var t = 0,
      n = l.call(arguments),
      r = n.length,
      i = r !== 1 || e && v.isFunction(e.promise) ? r : 0,
      s = i === 1 ? e : v.Deferred(),
      o = function o(e, t, n) {
        return function (r) {
          t[e] = this, n[e] = arguments.length > 1 ? l.call(arguments) : r, n === u ? s.notifyWith(t, n) : --i || s.resolveWith(
          t, n);
        };
      },
      u,a,f;
      if (r > 1) {
        u = new Array(r), a = new Array(r), f = new Array(r);
        for (; t < r; t++) {n[t] && v.isFunction(n[t].promise) ? n[t].promise().done(o(t, f, n)).fail(s.reject).progress(
          o(t, a, u)) : --i;}
      }
      return i || s.resolveWith(f, n), s.promise();
    } }),
  v.support = function () {
    var t,n,r,s,o,u,a,f,l,c,h,p = i.createElement("div");
    p.setAttribute("className", "t"), p.innerHTML =
    "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", n = p.getElementsByTagName("*"), r = p.getElementsByTagName(
    "a")[0];
    if (!n || !r || !n.length) return {};
    s = i.createElement("select"), o = s.appendChild(i.createElement("option")), u = p.getElementsByTagName("input")[0],
    r.style.cssText = "top:1px;float:left;opacity:.5", t = {
      leadingWhitespace: p.firstChild.nodeType === 3,
      tbody: !p.getElementsByTagName("tbody").length,
      htmlSerialize: !!p.getElementsByTagName("link").length,
      style: /top/.test(r.getAttribute("style")),
      hrefNormalized: r.getAttribute("href") === "/a",
      opacity: /^0.5/.test(r.style.opacity),
      cssFloat: !!r.style.cssFloat,
      checkOn: u.value === "on",
      optSelected: o.selected,
      getSetAttribute: p.className !== "t",
      enctype: !!i.createElement("form").enctype,
      html5Clone: i.createElement("nav").cloneNode(!0).outerHTML !== "<:nav></:nav>",
      boxModel: i.compatMode === "CSS1Compat",
      submitBubbles: !0,
      changeBubbles: !0,
      focusinBubbles: !1,
      deleteExpando: !0,
      noCloneEvent: !0,
      inlineBlockNeedsLayout: !1,
      shrinkWrapBlocks: !1,
      reliableMarginRight: !0,
      boxSizingReliable: !0,
      pixelPosition: !1 },
    u.checked = !0, t.noCloneChecked = u.cloneNode(!0).checked, s.disabled = !0, t.optDisabled = !o.disabled;
    try {
      delete p.test;
    } catch (d) {
      t.deleteExpando = !1;
    }!p.addEventListener && p.attachEvent && p.fireEvent && (p.attachEvent("onclick", h = function h() {
      t.noCloneEvent = !1;
    }), p.cloneNode(!0).fireEvent("onclick"), p.detachEvent("onclick", h)), u = i.createElement("input"), u.value =
    "t", u.setAttribute("type", "radio"), t.radioValue = u.value === "t", u.setAttribute("checked", "checked"), u.setAttribute(
    "name", "t"), p.appendChild(u), a = i.createDocumentFragment(), a.appendChild(p.lastChild), t.checkClone = a.cloneNode(
    !0).cloneNode(!0).lastChild.checked, t.appendChecked = u.checked, a.removeChild(u), a.appendChild(p);
    if (p.attachEvent)
    for (l in {
      submit: !0,
      change: !0,
      focusin: !0 }) {
      f = "on" + l, c = f in p, c || (p.setAttribute(f, "return;"), c = typeof p[f] == "function"), t[l + "Bubbles"] =
      c;}
    return v(function () {
      var n,r,s,o,u = "padding:0;margin:0;border:0;display:block;overflow:hidden;",
      a = i.getElementsByTagName("body")[0];
      if (!a) return;
      n = i.createElement("div"), n.style.cssText =
      "visibility:hidden;border:0;width:0;height:0;position:static;top:0;margin-top:1px", a.insertBefore(n, a.firstChild),
      r = i.createElement("div"), n.appendChild(r), r.innerHTML = "<table><tr><td></td><td>t</td></tr></table>", s =
      r.getElementsByTagName("td"), s[0].style.cssText = "padding:0;margin:0;border:0;display:none", c = s[0].offsetHeight ===
      0, s[0].style.display = "", s[1].style.display = "none", t.reliableHiddenOffsets = c && s[0].offsetHeight ===
      0, r.innerHTML = "", r.style.cssText =
      "box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;",
      t.boxSizing = r.offsetWidth === 4, t.doesNotIncludeMarginInBodyOffset = a.offsetTop !== 1, e.getComputedStyle && (
      t.pixelPosition = (e.getComputedStyle(r, null) || {}).top !== "1%", t.boxSizingReliable = (e.getComputedStyle(
      r, null) || {
        width: "4px" }).
      width === "4px", o = i.createElement("div"), o.style.cssText = r.style.cssText = u, o.style.marginRight = o.
      style.width = "0", r.style.width = "1px", r.appendChild(o), t.reliableMarginRight = !parseFloat((e.getComputedStyle(
      o, null) || {}).marginRight)), typeof r.style.zoom != "undefined" && (r.innerHTML = "", r.style.cssText = u +
      "width:1px;padding:1px;display:inline;zoom:1", t.inlineBlockNeedsLayout = r.offsetWidth === 3, r.style.display =
      "block", r.style.overflow = "visible", r.innerHTML = "<div></div>", r.firstChild.style.width = "5px", t.shrinkWrapBlocks =
      r.offsetWidth !== 3, n.style.zoom = 1), a.removeChild(n), n = r = s = o = null;
    }), a.removeChild(p), n = r = s = o = u = a = p = null, t;
  }();
  var D = /(?:\{[\s\S]*\}|\[[\s\S]*\])$/,
  P = /([A-Z])/g;
  v.extend({
    cache: {},
    deletedIds: [],
    uuid: 0,
    expando: "jQuery" + (v.fn.jquery + Math.random()).replace(/\D/g, ""),
    noData: {
      embed: !0,
      object: "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",
      applet: !0 },

    hasData: function hasData(e) {
      return e = e.nodeType ? v.cache[e[v.expando]] : e[v.expando], !!e && !B(e);
    },
    data: function data(e, n, r, i) {
      if (!v.acceptData(e)) return;
      var s,o,u = v.expando,
      a = typeof n == "string",
      f = e.nodeType,
      l = f ? v.cache : e,
      c = f ? e[u] : e[u] && u;
      if ((!c || !l[c] || !i && !l[c].data) && a && r === t) return;
      c || (f ? e[u] = c = v.deletedIds.pop() || v.guid++ : c = u), l[c] || (l[c] = {}, f || (l[c].toJSON = v.noop));
      if (typeof n == "object" || typeof n == "function") i ? l[c] = v.extend(l[c], n) : l[c].data = v.extend(l[c].data,
      n);
      return s = l[c], i || (s.data || (s.data = {}), s = s.data), r !== t && (s[v.camelCase(n)] = r), a ? (o = s[n],
      o == null && (o = s[v.camelCase(n)])) : o = s, o;
    },
    removeData: function removeData(e, t, n) {
      if (!v.acceptData(e)) return;
      var r,i,s,o = e.nodeType,
      u = o ? v.cache : e,
      a = o ? e[v.expando] : v.expando;
      if (!u[a]) return;
      if (t) {
        r = n ? u[a] : u[a].data;
        if (r) {
          v.isArray(t) || (t in r ? t = [t] : (t = v.camelCase(t), t in r ? t = [t] : t = t.split(" ")));
          for (i = 0, s = t.length; i < s; i++) {delete r[t[i]];}
          if (!(n ? B : v.isEmptyObject)(r)) return;
        }
      }
      if (!n) {
        delete u[a].data;
        if (!B(u[a])) return;
      }
      o ? v.cleanData([e], !0) : v.support.deleteExpando || u != u.window ? delete u[a] : u[a] = null;
    },
    _data: function _data(e, t, n) {
      return v.data(e, t, n, !0);
    },
    acceptData: function acceptData(e) {
      var t = e.nodeName && v.noData[e.nodeName.toLowerCase()];
      return !t || t !== !0 && e.getAttribute("classid") === t;
    } }),
  v.fn.extend({
    data: function data(e, n) {
      var r,i,s,o,u,a = this[0],
      f = 0,
      l = null;
      if (e === t) {
        if (this.length) {
          l = v.data(a);
          if (a.nodeType === 1 && !v._data(a, "parsedAttrs")) {
            s = a.attributes;
            for (u = s.length; f < u; f++) {o = s[f].name, o.indexOf("data-") || (o = v.camelCase(o.substring(5)), H(a, o,
              l[o]));}
            v._data(a, "parsedAttrs", !0);
          }
        }
        return l;
      }
      return typeof e == "object" ? this.each(function () {
        v.data(this, e);
      }) : (r = e.split(".", 2), r[1] = r[1] ? "." + r[1] : "", i = r[1] + "!", v.access(this, function (n) {
        if (n === t) return l = this.triggerHandler("getData" + i, [r[0]]), l === t && a && (l = v.data(a, e), l = H(
        a, e, l)), l === t && r[1] ? this.data(r[0]) : l;
        r[1] = n, this.each(function () {
          var t = v(this);
          t.triggerHandler("setData" + i, r), v.data(this, e, n), t.triggerHandler("changeData" + i, r);
        });
      }, null, n, arguments.length > 1, null, !1));
    },
    removeData: function removeData(e) {
      return this.each(function () {
        v.removeData(this, e);
      });
    } }),
  v.extend({
    queue: function queue(e, t, n) {
      var r;
      if (e) return t = (t || "fx") + "queue", r = v._data(e, t), n && (!r || v.isArray(n) ? r = v._data(e, t, v.makeArray(
      n)) : r.push(n)), r || [];
    },
    dequeue: function dequeue(e, t) {
      t = t || "fx";
      var n = v.queue(e, t),
      r = n.length,
      i = n.shift(),
      s = v._queueHooks(e, t),
      o = function o() {
        v.dequeue(e, t);
      };
      i === "inprogress" && (i = n.shift(), r--), i && (t === "fx" && n.unshift("inprogress"), delete s.stop, i.call(e,
      o, s)), !r && s && s.empty.fire();
    },
    _queueHooks: function _queueHooks(e, t) {
      var n = t + "queueHooks";
      return v._data(e, n) || v._data(e, n, {
        empty: v.Callbacks("once memory").add(function () {
          v.removeData(e, t + "queue", !0), v.removeData(e, n, !0);
        }) });

    } }),
  v.fn.extend({
    queue: function queue(e, n) {
      var r = 2;
      return typeof e != "string" && (n = e, e = "fx", r--), arguments.length < r ? v.queue(this[0], e) : n === t ?
      this : this.each(function () {
        var t = v.queue(this, e, n);
        v._queueHooks(this, e), e === "fx" && t[0] !== "inprogress" && v.dequeue(this, e);
      });
    },
    dequeue: function dequeue(e) {
      return this.each(function () {
        v.dequeue(this, e);
      });
    },
    delay: function delay(e, t) {
      return e = v.fx ? v.fx.speeds[e] || e : e, t = t || "fx", this.queue(t, function (t, n) {
        var r = setTimeout(t, e);
        n.stop = function () {
          clearTimeout(r);
        };
      });
    },
    clearQueue: function clearQueue(e) {
      return this.queue(e || "fx", []);
    },
    promise: function promise(e, n) {
      var r,i = 1,
      s = v.Deferred(),
      o = this,
      u = this.length,
      a = function a() {
        --i || s.resolveWith(o, [o]);
      };
      typeof e != "string" && (n = e, e = t), e = e || "fx";
      while (u--) {r = v._data(o[u], e + "queueHooks"), r && r.empty && (i++, r.empty.add(a));}
      return a(), s.promise(n);
    } });

  var j,F,I,q = /[\t\r\n]/g,
  R = /\r/g,
  U = /^(?:button|input)$/i,
  z = /^(?:button|input|object|select|textarea)$/i,
  W = /^a(?:rea|)$/i,
  X =
  /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,
  V = v.support.getSetAttribute;
  v.fn.extend({
    attr: function attr(e, t) {
      return v.access(this, v.attr, e, t, arguments.length > 1);
    },
    removeAttr: function removeAttr(e) {
      return this.each(function () {
        v.removeAttr(this, e);
      });
    },
    prop: function prop(e, t) {
      return v.access(this, v.prop, e, t, arguments.length > 1);
    },
    removeProp: function removeProp(e) {
      return e = v.propFix[e] || e, this.each(function () {
        try {
          this[e] = t, delete this[e];
        } catch (n) {}
      });
    },
    addClass: function addClass(e) {
      var t, n, r, i, s, o, u;
      if (v.isFunction(e)) return this.each(function (t) {
        v(this).addClass(e.call(this, t, this.className));
      });
      if (e && typeof e == "string") {
        t = e.split(y);
        for (n = 0, r = this.length; n < r; n++) {
          i = this[n];
          if (i.nodeType === 1)
          if (!i.className && t.length === 1) i.className = e;else
          {
            s = " " + i.className + " ";
            for (o = 0, u = t.length; o < u; o++) {s.indexOf(" " + t[o] + " ") < 0 && (s += t[o] + " ");}
            i.className = v.trim(s);
          }
        }
      }
      return this;
    },
    removeClass: function removeClass(e) {
      var n, r, i, s, o, u, a;
      if (v.isFunction(e)) return this.each(function (t) {
        v(this).removeClass(e.call(this, t, this.className));
      });
      if (e && typeof e == "string" || e === t) {
        n = (e || "").split(y);
        for (u = 0, a = this.length; u < a; u++) {
          i = this[u];
          if (i.nodeType === 1 && i.className) {
            r = (" " + i.className + " ").replace(q, " ");
            for (s = 0, o = n.length; s < o; s++) {
              while (r.indexOf(" " + n[s] + " ") >= 0) {r = r.replace(" " + n[s] + " ", " ");}}
            i.className = e ? v.trim(r) : "";
          }
        }
      }
      return this;
    },
    toggleClass: function toggleClass(e, t) {
      var n = typeof e,
      r = typeof t == "boolean";
      return v.isFunction(e) ? this.each(function (n) {
        v(this).toggleClass(e.call(this, n, this.className, t), t);
      }) : this.each(function () {
        if (n === "string") {
          var i,s = 0,
          o = v(this),
          u = t,
          a = e.split(y);
          while (i = a[s++]) {u = r ? u : !o.hasClass(i), o[u ? "addClass" : "removeClass"](i);}
        } else if (n === "undefined" || n === "boolean") this.className && v._data(this, "__className__", this.className),
        this.className = this.className || e === !1 ? "" : v._data(this, "__className__") || "";
      });
    },
    hasClass: function hasClass(e) {
      var t = " " + e + " ",
      n = 0,
      r = this.length;
      for (; n < r; n++) {
        if (this[n].nodeType === 1 && (" " + this[n].className + " ").replace(q, " ").indexOf(t) >= 0) return !0;}
      return !1;
    },
    val: function val(e) {
      var n,r,i,s = this[0];
      if (!arguments.length) {
        if (s) return n = v.valHooks[s.type] || v.valHooks[s.nodeName.toLowerCase()], n && "get" in n && (r = n.get(s,
        "value")) !== t ? r : (r = s.value, typeof r == "string" ? r.replace(R, "") : r == null ? "" : r);
        return;
      }
      return i = v.isFunction(e), this.each(function (r) {
        var s,o = v(this);
        if (this.nodeType !== 1) return;
        i ? s = e.call(this, r, o.val()) : s = e, s == null ? s = "" : typeof s == "number" ? s += "" : v.isArray(s) && (
        s = v.map(s, function (e) {
          return e == null ? "" : e + "";
        })), n = v.valHooks[this.type] || v.valHooks[this.nodeName.toLowerCase()];
        if (!n || !("set" in n) || n.set(this, s, "value") === t) this.value = s;
      });
    } }),
  v.extend({
    valHooks: {
      option: {
        get: function get(e) {
          var t = e.attributes.value;
          return !t || t.specified ? e.value : e.text;
        } },

      select: {
        get: function get(e) {
          var t,n,r = e.options,
          i = e.selectedIndex,
          s = e.type === "select-one" || i < 0,
          o = s ? null : [],
          u = s ? i + 1 : r.length,
          a = i < 0 ? u : s ? i : 0;
          for (; a < u; a++) {
            n = r[a];
            if ((n.selected || a === i) && (v.support.optDisabled ? !n.disabled : n.getAttribute("disabled") === null) && (
            !n.parentNode.disabled || !v.nodeName(n.parentNode, "optgroup"))) {
              t = v(n).val();
              if (s) return t;
              o.push(t);
            }
          }
          return o;
        },
        set: function set(e, t) {
          var n = v.makeArray(t);
          return v(e).find("option").each(function () {
            this.selected = v.inArray(v(this).val(), n) >= 0;
          }), n.length || (e.selectedIndex = -1), n;
        } } },


    attrFn: {},
    attr: function attr(e, n, r, i) {
      var s,o,u,a = e.nodeType;
      if (!e || a === 3 || a === 8 || a === 2) return;
      if (i && v.isFunction(v.fn[n])) return v(e)[n](r);
      if (typeof e.getAttribute == "undefined") return v.prop(e, n, r);
      u = a !== 1 || !v.isXMLDoc(e), u && (n = n.toLowerCase(), o = v.attrHooks[n] || (X.test(n) ? F : j));
      if (r !== t) {
        if (r === null) {
          v.removeAttr(e, n);
          return;
        }
        return o && "set" in o && u && (s = o.set(e, r, n)) !== t ? s : (e.setAttribute(n, r + ""), r);
      }
      return o && "get" in o && u && (s = o.get(e, n)) !== null ? s : (s = e.getAttribute(n), s === null ? t : s);
    },
    removeAttr: function removeAttr(e, t) {
      var n,r,i,s,o = 0;
      if (t && e.nodeType === 1) {
        r = t.split(y);
        for (; o < r.length; o++) {i = r[o], i && (n = v.propFix[i] || i, s = X.test(i), s || v.attr(e, i, ""), e.removeAttribute(
          V ? i : n), s && n in e && (e[n] = !1));}
      }
    },
    attrHooks: {
      type: {
        set: function set(e, t) {
          if (U.test(e.nodeName) && e.parentNode) v.error("type property can't be changed");else
          if (!v.support.radioValue && t === "radio" && v.nodeName(e, "input")) {
            var n = e.value;
            return e.setAttribute("type", t), n && (e.value = n), t;
          }
        } },

      value: {
        get: function get(e, t) {
          return j && v.nodeName(e, "button") ? j.get(e, t) : t in e ? e.value : null;
        },
        set: function set(e, t, n) {
          if (j && v.nodeName(e, "button")) return j.set(e, t, n);
          e.value = t;
        } } },


    propFix: {
      tabindex: "tabIndex",
      readonly: "readOnly",
      "for": "htmlFor",
      "class": "className",
      maxlength: "maxLength",
      cellspacing: "cellSpacing",
      cellpadding: "cellPadding",
      rowspan: "rowSpan",
      colspan: "colSpan",
      usemap: "useMap",
      frameborder: "frameBorder",
      contenteditable: "contentEditable" },

    prop: function prop(e, n, r) {
      var i,s,o,u = e.nodeType;
      if (!e || u === 3 || u === 8 || u === 2) return;
      return o = u !== 1 || !v.isXMLDoc(e), o && (n = v.propFix[n] || n, s = v.propHooks[n]), r !== t ? s && "set" in
      s && (i = s.set(e, r, n)) !== t ? i : e[n] = r : s && "get" in s && (i = s.get(e, n)) !== null ? i : e[n];
    },
    propHooks: {
      tabIndex: {
        get: function get(e) {
          var n = e.getAttributeNode("tabindex");
          return n && n.specified ? parseInt(n.value, 10) : z.test(e.nodeName) || W.test(e.nodeName) && e.href ? 0 : t;
        } } } }),


  F = {
    get: function get(e, n) {
      var r,i = v.prop(e, n);
      return i === !0 || typeof i != "boolean" && (r = e.getAttributeNode(n)) && r.nodeValue !== !1 ? n.toLowerCase() :
      t;
    },
    set: function set(e, t, n) {
      var r;
      return t === !1 ? v.removeAttr(e, n) : (r = v.propFix[n] || n, r in e && (e[r] = !0), e.setAttribute(n, n.toLowerCase())),
      n;
    } },
  V || (I = {
    name: !0,
    id: !0,
    coords: !0 },
  j = v.valHooks.button = {
    get: function get(e, n) {
      var r;
      return r = e.getAttributeNode(n), r && (I[n] ? r.value !== "" : r.specified) ? r.value : t;
    },
    set: function set(e, t, n) {
      var r = e.getAttributeNode(n);
      return r || (r = i.createAttribute(n), e.setAttributeNode(r)), r.value = t + "";
    } },
  v.each(["width", "height"], function (e, t) {
    v.attrHooks[t] = v.extend(v.attrHooks[t], {
      set: function set(e, n) {
        if (n === "") return e.setAttribute(t, "auto"), n;
      } });

  }), v.attrHooks.contenteditable = {
    get: j.get,
    set: function set(e, t, n) {
      t === "" && (t = "false"), j.set(e, t, n);
    } }),
  v.support.hrefNormalized || v.each(["href", "src", "width", "height"], function (e, n) {
    v.attrHooks[n] = v.extend(v.attrHooks[n], {
      get: function get(e) {
        var r = e.getAttribute(n, 2);
        return r === null ? t : r;
      } });

  }), v.support.style || (v.attrHooks.style = {
    get: function get(e) {
      return e.style.cssText.toLowerCase() || t;
    },
    set: function set(e, t) {
      return e.style.cssText = t + "";
    } }),
  v.support.optSelected || (v.propHooks.selected = v.extend(v.propHooks.selected, {
    get: function get(e) {
      var t = e.parentNode;
      return t && (t.selectedIndex, t.parentNode && t.parentNode.selectedIndex), null;
    } })),
  v.support.enctype || (v.propFix.enctype = "encoding"), v.support.checkOn || v.each(["radio", "checkbox"],
  function () {
    v.valHooks[this] = {
      get: function get(e) {
        return e.getAttribute("value") === null ? "on" : e.value;
      } };

  }), v.each(["radio", "checkbox"], function () {
    v.valHooks[this] = v.extend(v.valHooks[this], {
      set: function set(e, t) {
        if (v.isArray(t)) return e.checked = v.inArray(v(e).val(), t) >= 0;
      } });

  });
  var $ = /^(?:textarea|input|select)$/i,
  J = /^([^\.]*|)(?:\.(.+)|)$/,
  K = /(?:^|\s)hover(\.\S+|)\b/,
  Q = /^key/,
  G = /^(?:mouse|contextmenu)|click/,
  Y = /^(?:focusinfocus|focusoutblur)$/,
  Z = function Z(e) {
    return v.event.special.hover ? e : e.replace(K, "mouseenter$1 mouseleave$1");
  };
  v.event = {
    add: function add(e, n, r, i, s) {
      var o, _u, a, f, l, c, h, p, d, m, g;
      if (e.nodeType === 3 || e.nodeType === 8 || !n || !r || !(o = v._data(e))) return;
      r.handler && (d = r, r = d.handler, s = d.selector), r.guid || (r.guid = v.guid++), a = o.events, a || (o.events =
      a = {}), _u = o.handle, _u || (o.handle = _u = function u(e) {
        return typeof v == "undefined" || !!e && v.event.triggered === e.type ? t : v.event.dispatch.apply(_u.elem,
        arguments);
      }, _u.elem = e), n = v.trim(Z(n)).split(" ");
      for (f = 0; f < n.length; f++) {
        l = J.exec(n[f]) || [], c = l[1], h = (l[2] || "").split(".").sort(), g = v.event.special[c] || {}, c = (s ? g.delegateType :
        g.bindType) || c, g = v.event.special[c] || {}, p = v.extend({
          type: c,
          origType: l[1],
          data: i,
          handler: r,
          guid: r.guid,
          selector: s,
          needsContext: s && v.expr.match.needsContext.test(s),
          namespace: h.join(".") },
        d), m = a[c];
        if (!m) {
          m = a[c] = [], m.delegateCount = 0;
          if (!g.setup || g.setup.call(e, i, h, _u) === !1) e.addEventListener ? e.addEventListener(c, _u, !1) : e.attachEvent &&
          e.attachEvent("on" + c, _u);
        }
        g.add && (g.add.call(e, p), p.handler.guid || (p.handler.guid = r.guid)), s ? m.splice(m.delegateCount++, 0, p) :
        m.push(p), v.event.global[c] = !0;
      }
      e = null;
    },
    global: {},
    remove: function remove(e, t, n, r, i) {
      var s,o,u,a,f,l,c,h,p,d,m,g = v.hasData(e) && v._data(e);
      if (!g || !(h = g.events)) return;
      t = v.trim(Z(t || "")).split(" ");
      for (s = 0; s < t.length; s++) {
        o = J.exec(t[s]) || [], u = a = o[1], f = o[2];
        if (!u) {
          for (u in h) {v.event.remove(e, u + t[s], n, r, !0);}
          continue;
        }
        p = v.event.special[u] || {}, u = (r ? p.delegateType : p.bindType) || u, d = h[u] || [], l = d.length, f = f ?
        new RegExp("(^|\\.)" + f.split(".").sort().join("\\.(?:.*\\.|)") + "(\\.|$)") : null;
        for (c = 0; c < d.length; c++) {m = d[c], (i || a === m.origType) && (!n || n.guid === m.guid) && (!f || f.test(m.
          namespace)) && (!r || r === m.selector || r === "**" && m.selector) && (d.splice(c--, 1), m.selector && d.delegateCount--,
          p.remove && p.remove.call(e, m));}
        d.length === 0 && l !== d.length && ((!p.teardown || p.teardown.call(e, f, g.handle) === !1) && v.removeEvent(e,
        u, g.handle), delete h[u]);
      }
      v.isEmptyObject(h) && (delete g.handle, v.removeData(e, "events", !0));
    },
    customEvent: {
      getData: !0,
      setData: !0,
      changeData: !0 },

    trigger: function trigger(n, r, s, o) {
      if (!s || s.nodeType !== 3 && s.nodeType !== 8) {
        var u,a,f,l,c,h,p,d,m,g,y = n.type || n,
        b = [];
        if (Y.test(y + v.event.triggered)) return;
        y.indexOf("!") >= 0 && (y = y.slice(0, -1), a = !0), y.indexOf(".") >= 0 && (b = y.split("."), y = b.shift(), b.sort());
        if ((!s || v.event.customEvent[y]) && !v.event.global[y]) return;
        n = typeof n == "object" ? n[v.expando] ? n : new v.Event(y, n) : new v.Event(y), n.type = y, n.isTrigger = !0,
        n.exclusive = a, n.namespace = b.join("."), n.namespace_re = n.namespace ? new RegExp("(^|\\.)" + b.join(
        "\\.(?:.*\\.|)") + "(\\.|$)") : null, h = y.indexOf(":") < 0 ? "on" + y : "";
        if (!s) {
          u = v.cache;
          for (f in u) {u[f].events && u[f].events[y] && v.event.trigger(n, r, u[f].handle.elem, !0);}
          return;
        }
        n.result = t, n.target || (n.target = s), r = r != null ? v.makeArray(r) : [], r.unshift(n), p = v.event.special[
        y] || {};
        if (p.trigger && p.trigger.apply(s, r) === !1) return;
        m = [
        [s, p.bindType || y]];

        if (!o && !p.noBubble && !v.isWindow(s)) {
          g = p.delegateType || y, l = Y.test(g + y) ? s : s.parentNode;
          for (c = s; l; l = l.parentNode) {m.push([l, g]), c = l;}
          c === (s.ownerDocument || i) && m.push([c.defaultView || c.parentWindow || e, g]);
        }
        for (f = 0; f < m.length && !n.isPropagationStopped(); f++) {l = m[f][0], n.type = m[f][1], d = (v._data(l,
          "events") || {})[n.type] && v._data(l, "handle"), d && d.apply(l, r), d = h && l[h], d && v.acceptData(l) && d.
          apply && d.apply(l, r) === !1 && n.preventDefault();}
        return n.type = y, !o && !n.isDefaultPrevented() && (!p._default || p._default.apply(s.ownerDocument, r) === !1) && (
        y !== "click" || !v.nodeName(s, "a")) && v.acceptData(s) && h && s[y] && (y !== "focus" && y !== "blur" || n.target.
        offsetWidth !== 0) && !v.isWindow(s) && (c = s[h], c && (s[h] = null), v.event.triggered = y, s[y](), v.event.
        triggered = t, c && (s[h] = c)), n.result;
      }
      return;
    },
    dispatch: function dispatch(n) {
      n = v.event.fix(n || e.event);
      var r,i,s,o,u,a,f,c,h,p,d = (v._data(this, "events") || {})[n.type] || [],
      m = d.delegateCount,
      g = l.call(arguments),
      y = !n.exclusive && !n.namespace,
      b = v.event.special[n.type] || {},
      w = [];
      g[0] = n, n.delegateTarget = this;
      if (b.preDispatch && b.preDispatch.call(this, n) === !1) return;
      if (m && (!n.button || n.type !== "click"))
      for (s = n.target; s != this; s = s.parentNode || this) {
        if (s.disabled !== !0 || n.type !== "click") {
          u = {}, f = [];
          for (r = 0; r < m; r++) {c = d[r], h = c.selector, u[h] === t && (u[h] = c.needsContext ? v(h, this).index(s) >=
            0 : v.find(h, this, null, [s]).length), u[h] && f.push(c);}
          f.length && w.push({
            elem: s,
            matches: f });

        }}d.length > m && w.push({
        elem: this,
        matches: d.slice(m) });

      for (r = 0; r < w.length && !n.isPropagationStopped(); r++) {
        a = w[r], n.currentTarget = a.elem;
        for (i = 0; i < a.matches.length && !n.isImmediatePropagationStopped(); i++) {
          c = a.matches[i];
          if (y || !n.namespace && !c.namespace || n.namespace_re && n.namespace_re.test(c.namespace)) n.data = c.data, n.
          handleObj = c, o = ((v.event.special[c.origType] || {}).handle || c.handler).apply(a.elem, g), o !== t && (n.result =
          o, o === !1 && (n.preventDefault(), n.stopPropagation()));
        }
      }
      return b.postDispatch && b.postDispatch.call(this, n), n.result;
    },
    props: "attrChange attrName relatedNode srcElement altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".
    split(" "),
    fixHooks: {},
    keyHooks: {
      props: "char charCode key keyCode".split(" "),
      filter: function filter(e, t) {
        return e.which == null && (e.which = t.charCode != null ? t.charCode : t.keyCode), e;
      } },

    mouseHooks: {
      props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(
      " "),
      filter: function filter(e, n) {
        var r,s,o,u = n.button,
        a = n.fromElement;
        return e.pageX == null && n.clientX != null && (r = e.target.ownerDocument || i, s = r.documentElement, o = r.body,
        e.pageX = n.clientX + (s && s.scrollLeft || o && o.scrollLeft || 0) - (s && s.clientLeft || o && o.clientLeft ||
        0), e.pageY = n.clientY + (s && s.scrollTop || o && o.scrollTop || 0) - (s && s.clientTop || o && o.clientTop ||
        0)), !e.relatedTarget && a && (e.relatedTarget = a === e.target ? n.toElement : a), !e.which && u !== t && (e.
        which = u & 1 ? 1 : u & 2 ? 3 : u & 4 ? 2 : 0), e;
      } },

    fix: function fix(e) {
      if (e[v.expando]) return e;
      var t,n,r = e,
      s = v.event.fixHooks[e.type] || {},
      o = s.props ? this.props.concat(s.props) : this.props;
      e = v.Event(r);
      for (t = o.length; t;) {n = o[--t], e[n] = r[n];}
      return e.target || (e.target = r.srcElement || i), e.target.nodeType === 3 && (e.target = e.target.parentNode), e.
      metaKey = !!e.metaKey, s.filter ? s.filter(e, r) : e;
    },
    special: {
      load: {
        noBubble: !0 },

      focus: {
        delegateType: "focusin" },

      blur: {
        delegateType: "focusout" },

      beforeunload: {
        setup: function setup(e, t, n) {
          v.isWindow(this) && (this.onbeforeunload = n);
        },
        teardown: function teardown(e, t) {
          this.onbeforeunload === t && (this.onbeforeunload = null);
        } } },


    simulate: function simulate(e, t, n, r) {
      var i = v.extend(new v.Event(), n, {
        type: e,
        isSimulated: !0,
        originalEvent: {} });

      r ? v.event.trigger(i, null, t) : v.event.dispatch.call(t, i), i.isDefaultPrevented() && n.preventDefault();
    } },
  v.event.handle = v.event.dispatch, v.removeEvent = i.removeEventListener ? function (e, t, n) {
    e.removeEventListener && e.removeEventListener(t, n, !1);
  } : function (e, t, n) {
    var r = "on" + t;
    e.detachEvent && (typeof e[r] == "undefined" && (e[r] = null), e.detachEvent(r, n));
  }, v.Event = function (e, t) {
    if (!(this instanceof v.Event)) return new v.Event(e, t);
    e && e.type ? (this.originalEvent = e, this.type = e.type, this.isDefaultPrevented = e.defaultPrevented || e.returnValue ===
    !1 || e.getPreventDefault && e.getPreventDefault() ? tt : et) : this.type = e, t && v.extend(this, t), this.timeStamp =
    e && e.timeStamp || v.now(), this[v.expando] = !0;
  }, v.Event.prototype = {
    preventDefault: function preventDefault() {
      this.isDefaultPrevented = tt;
      var e = this.originalEvent;
      if (!e) return;
      e.preventDefault ? e.preventDefault() : e.returnValue = !1;
    },
    stopPropagation: function stopPropagation() {
      this.isPropagationStopped = tt;
      var e = this.originalEvent;
      if (!e) return;
      e.stopPropagation && e.stopPropagation(), e.cancelBubble = !0;
    },
    stopImmediatePropagation: function stopImmediatePropagation() {
      this.isImmediatePropagationStopped = tt, this.stopPropagation();
    },
    isDefaultPrevented: et,
    isPropagationStopped: et,
    isImmediatePropagationStopped: et },
  v.each({
    mouseenter: "mouseover",
    mouseleave: "mouseout" },
  function (e, t) {
    v.event.special[e] = {
      delegateType: t,
      bindType: t,
      handle: function handle(e) {
        var n,r = this,
        i = e.relatedTarget,
        s = e.handleObj,
        o = s.selector;
        if (!i || i !== r && !v.contains(r, i)) e.type = s.origType, n = s.handler.apply(this, arguments), e.type = t;
        return n;
      } };

  }), v.support.submitBubbles || (v.event.special.submit = {
    setup: function setup() {
      if (v.nodeName(this, "form")) return !1;
      v.event.add(this, "click._submit keypress._submit", function (e) {
        var n = e.target,
        r = v.nodeName(n, "input") || v.nodeName(n, "button") ? n.form : t;
        r && !v._data(r, "_submit_attached") && (v.event.add(r, "submit._submit", function (e) {
          e._submit_bubble = !0;
        }), v._data(r, "_submit_attached", !0));
      });
    },
    postDispatch: function postDispatch(e) {
      e._submit_bubble && (delete e._submit_bubble, this.parentNode && !e.isTrigger && v.event.simulate("submit", this.
      parentNode, e, !0));
    },
    teardown: function teardown() {
      if (v.nodeName(this, "form")) return !1;
      v.event.remove(this, "._submit");
    } }),
  v.support.changeBubbles || (v.event.special.change = {
    setup: function setup() {
      if ($.test(this.nodeName)) {
        if (this.type === "checkbox" || this.type === "radio") v.event.add(this, "propertychange._change", function (e) {
          e.originalEvent.propertyName === "checked" && (this._just_changed = !0);
        }), v.event.add(this, "click._change", function (e) {
          this._just_changed && !e.isTrigger && (this._just_changed = !1), v.event.simulate("change", this, e, !0);
        });
        return !1;
      }
      v.event.add(this, "beforeactivate._change", function (e) {
        var t = e.target;
        $.test(t.nodeName) && !v._data(t, "_change_attached") && (v.event.add(t, "change._change", function (e) {
          this.parentNode && !e.isSimulated && !e.isTrigger && v.event.simulate("change", this.parentNode, e, !0);
        }), v._data(t, "_change_attached", !0));
      });
    },
    handle: function handle(e) {
      var t = e.target;
      if (this !== t || e.isSimulated || e.isTrigger || t.type !== "radio" && t.type !== "checkbox") return e.handleObj.
      handler.apply(this, arguments);
    },
    teardown: function teardown() {
      return v.event.remove(this, "._change"), !$.test(this.nodeName);
    } }),
  v.support.focusinBubbles || v.each({
    focus: "focusin",
    blur: "focusout" },
  function (e, t) {
    var n = 0,
    r = function r(e) {
      v.event.simulate(t, e.target, v.event.fix(e), !0);
    };
    v.event.special[t] = {
      setup: function setup() {
        n++ === 0 && i.addEventListener(e, r, !0);
      },
      teardown: function teardown() {
        --n === 0 && i.removeEventListener(e, r, !0);
      } };

  }), v.fn.extend({
    on: function on(e, n, r, i, s) {
      var o, u;
      if (typeof e == "object") {
        typeof n != "string" && (r = r || n, n = t);
        for (u in e) {this.on(u, n, r, e[u], s);}
        return this;
      }
      r == null && i == null ? (i = n, r = n = t) : i == null && (typeof n == "string" ? (i = r, r = t) : (i = r, r =
      n, n = t));
      if (i === !1) i = et;else
      if (!i) return this;
      return s === 1 && (o = i, i = function i(e) {
        return v().off(e), o.apply(this, arguments);
      }, i.guid = o.guid || (o.guid = v.guid++)), this.each(function () {
        v.event.add(this, e, i, r, n);
      });
    },
    one: function one(e, t, n, r) {
      return this.on(e, t, n, r, 1);
    },
    off: function off(e, n, r) {
      var i, s;
      if (e && e.preventDefault && e.handleObj) return i = e.handleObj, v(e.delegateTarget).off(i.namespace ? i.origType +
      "." + i.namespace : i.origType, i.selector, i.handler), this;
      if (typeof e == "object") {
        for (s in e) {this.off(s, n, e[s]);}
        return this;
      }
      if (n === !1 || typeof n == "function") r = n, n = t;
      return r === !1 && (r = et), this.each(function () {
        v.event.remove(this, e, r, n);
      });
    },
    bind: function bind(e, t, n) {
      return this.on(e, null, t, n);
    },
    unbind: function unbind(e, t) {
      return this.off(e, null, t);
    },
    live: function live(e, t, n) {
      return v(this.context).on(e, this.selector, t, n), this;
    },
    die: function die(e, t) {
      return v(this.context).off(e, this.selector || "**", t), this;
    },
    delegate: function delegate(e, t, n, r) {
      return this.on(t, e, n, r);
    },
    undelegate: function undelegate(e, t, n) {
      return arguments.length === 1 ? this.off(e, "**") : this.off(t, e || "**", n);
    },
    trigger: function trigger(e, t) {
      return this.each(function () {
        v.event.trigger(e, t, this);
      });
    },
    triggerHandler: function triggerHandler(e, t) {
      if (this[0]) return v.event.trigger(e, t, this[0], !0);
    },
    toggle: function toggle(e) {
      var t = arguments,
      n = e.guid || v.guid++,
      r = 0,
      i = function i(n) {
        var i = (v._data(this, "lastToggle" + e.guid) || 0) % r;
        return v._data(this, "lastToggle" + e.guid, i + 1), n.preventDefault(), t[i].apply(this, arguments) || !1;
      };
      i.guid = n;
      while (r < t.length) {t[r++].guid = n;}
      return this.click(i);
    },
    hover: function hover(e, t) {
      return this.mouseenter(e).mouseleave(t || e);
    } }),
  v.each(
  "blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".
  split(" "),
  function (e, t) {
    v.fn[t] = function (e, n) {
      return n == null && (n = e, e = null), arguments.length > 0 ? this.on(t, null, e, n) : this.trigger(t);
    }, Q.test(t) && (v.event.fixHooks[t] = v.event.keyHooks), G.test(t) && (v.event.fixHooks[t] = v.event.mouseHooks);
  }),
  function (e, t) {
    function nt(e, t, n, r) {
      n = n || [], t = t || g;
      var i,s,a,f,l = t.nodeType;
      if (!e || typeof e != "string") return n;
      if (l !== 1 && l !== 9) return [];
      a = o(t);
      if (!a && !r)
      if (i = R.exec(e))
      if (f = i[1]) {
        if (l === 9) {
          s = t.getElementById(f);
          if (!s || !s.parentNode) return n;
          if (s.id === f) return n.push(s), n;
        } else if (t.ownerDocument && (s = t.ownerDocument.getElementById(f)) && u(t, s) && s.id === f) return n.push(s),
        n;
      } else {
        if (i[2]) return S.apply(n, x.call(t.getElementsByTagName(e), 0)), n;
        if ((f = i[3]) && Z && t.getElementsByClassName) return S.apply(n, x.call(t.getElementsByClassName(f), 0)), n;
      }return vt(e.replace(j, "$1"), t, n, r, a);
    }

    function rt(e) {
      return function (t) {
        var n = t.nodeName.toLowerCase();
        return n === "input" && t.type === e;
      };
    }

    function it(e) {
      return function (t) {
        var n = t.nodeName.toLowerCase();
        return (n === "input" || n === "button") && t.type === e;
      };
    }

    function st(e) {
      return N(function (t) {
        return t = +t, N(function (n, r) {
          var i,s = e([], n.length, t),
          o = s.length;
          while (o--) {n[i = s[o]] && (n[i] = !(r[i] = n[i]));}
        });
      });
    }

    function ot(e, t, n) {
      if (e === t) return n;
      var r = e.nextSibling;
      while (r) {
        if (r === t) return -1;
        r = r.nextSibling;
      }
      return 1;
    }

    function ut(e, t) {
      var n,r,s,o,u,a,f,l = L[d][e + " "];
      if (l) return t ? 0 : l.slice(0);
      u = e, a = [], f = i.preFilter;
      while (u) {
        if (!n || (r = F.exec(u))) r && (u = u.slice(r[0].length) || u), a.push(s = []);
        n = !1;
        if (r = I.exec(u)) s.push(n = new m(r.shift())), u = u.slice(n.length), n.type = r[0].replace(j, " ");
        for (o in i.filter) {(r = J[o].exec(u)) && (!f[o] || (r = f[o](r))) && (s.push(n = new m(r.shift())), u = u.slice(n.
          length), n.type = o, n.matches = r);}
        if (!n) break;
      }
      return t ? u.length : u ? nt.error(e) : L(e, a).slice(0);
    }

    function at(e, t, r) {
      var i = t.dir,
      s = r && t.dir === "parentNode",
      o = w++;
      return t.first ? function (t, n, r) {
        while (t = t[i]) {
          if (s || t.nodeType === 1) return e(t, n, r);}
      } : function (t, r, u) {
        if (!u) {
          var a,f = b + " " + o + " ",
          l = f + n;
          while (t = t[i]) {
            if (s || t.nodeType === 1) {
              if ((a = t[d]) === l) return t.sizset;
              if (typeof a == "string" && a.indexOf(f) === 0) {
                if (t.sizset) return t;
              } else {
                t[d] = l;
                if (e(t, r, u)) return t.sizset = !0, t;
                t.sizset = !1;
              }
            }}
        } else
        while (t = t[i]) {
          if (s || t.nodeType === 1)
          if (e(t, r, u)) return t;}
      };
    }

    function ft(e) {
      return e.length > 1 ? function (t, n, r) {
        var i = e.length;
        while (i--) {
          if (!e[i](t, n, r)) return !1;}
        return !0;
      } : e[0];
    }

    function lt(e, t, n, r, i) {
      var s,o = [],
      u = 0,
      a = e.length,
      f = t != null;
      for (; u < a; u++) {
        if (s = e[u])
        if (!n || n(s, r, i)) o.push(s), f && t.push(u);}
      return o;
    }

    function ct(e, t, n, r, i, s) {
      return r && !r[d] && (r = ct(r)), i && !i[d] && (i = ct(i, s)), N(function (s, o, u, a) {
        var f,l,c,h = [],
        p = [],
        d = o.length,
        v = s || dt(t || "*", u.nodeType ? [u] : u, []),
        m = e && (s || !t) ? lt(v, h, e, u, a) : v,
        g = n ? i || (s ? e : d || r) ? [] : o : m;
        n && n(m, g, u, a);
        if (r) {
          f = lt(g, p), r(f, [], u, a), l = f.length;
          while (l--) {
            if (c = f[l]) g[p[l]] = !(m[p[l]] = c);}
        }
        if (s) {
          if (i || e) {
            if (i) {
              f = [], l = g.length;
              while (l--) {(c = g[l]) && f.push(m[l] = c);}
              i(null, g = [], f, a);
            }
            l = g.length;
            while (l--) {(c = g[l]) && (f = i ? T.call(s, c) : h[l]) > -1 && (s[f] = !(o[f] = c));}
          }
        } else g = lt(g === o ? g.splice(d, g.length) : g), i ? i(null, o, g, a) : S.apply(o, g);
      });
    }

    function ht(e) {
      var t,n,r,s = e.length,
      o = i.relative[e[0].type],
      u = o || i.relative[" "],
      a = o ? 1 : 0,
      f = at(function (e) {
        return e === t;
      }, u, !0),
      l = at(function (e) {
        return T.call(t, e) > -1;
      }, u, !0),
      h = [function (e, n, r) {
        return !o && (r || n !== c) || ((t = n).nodeType ? f(e, n, r) : l(e, n, r));
      }];
      for (; a < s; a++) {
        if (n = i.relative[e[a].type]) h = [at(ft(h), n)];else
        {
          n = i.filter[e[a].type].apply(null, e[a].matches);
          if (n[d]) {
            r = ++a;
            for (; r < s; r++) {
              if (i.relative[e[r].type]) break;}
            return ct(a > 1 && ft(h), a > 1 && e.slice(0, a - 1).join("").replace(j, "$1"), n, a < r && ht(e.slice(a, r)),
            r < s && ht(e = e.slice(r)), r < s && e.join(""));
          }
          h.push(n);
        }}return ft(h);
    }

    function pt(e, t) {
      var r = t.length > 0,
      s = e.length > 0,
      o = function o(u, a, f, l, h) {
        var p,d,v,m = [],
        y = 0,
        w = "0",
        x = u && [],
        T = h != null,
        N = c,
        C = u || s && i.find.TAG("*", h && a.parentNode || a),
        k = b += N == null ? 1 : Math.E;
        T && (c = a !== g && a, n = o.el);
        for (;
        (p = C[w]) != null; w++) {
          if (s && p) {
            for (d = 0; v = e[d]; d++) {
              if (v(p, a, f)) {
                l.push(p);
                break;
              }}T && (b = k, n = ++o.el);
          }
          r && ((p = !v && p) && y--, u && x.push(p));
        }
        y += w;
        if (r && w !== y) {
          for (d = 0; v = t[d]; d++) {v(x, m, a, f);}
          if (u) {
            if (y > 0)
            while (w--) {!x[w] && !m[w] && (m[w] = E.call(l));}
            m = lt(m);
          }
          S.apply(l, m), T && !u && m.length > 0 && y + t.length > 1 && nt.uniqueSort(l);
        }
        return T && (b = k, c = N), x;
      };
      return o.el = 0, r ? N(o) : o;
    }

    function dt(e, t, n) {
      var r = 0,
      i = t.length;
      for (; r < i; r++) {nt(e, t[r], n);}
      return n;
    }

    function vt(e, t, n, r, s) {
      var o,u,f,l,c,h = ut(e),
      p = h.length;
      if (!r && h.length === 1) {
        u = h[0] = h[0].slice(0);
        if (u.length > 2 && (f = u[0]).type === "ID" && t.nodeType === 9 && !s && i.relative[u[1].type]) {
          t = i.find.ID(f.matches[0].replace($, ""), t, s)[0];
          if (!t) return n;
          e = e.slice(u.shift().length);
        }
        for (o = J.POS.test(e) ? -1 : u.length - 1; o >= 0; o--) {
          f = u[o];
          if (i.relative[l = f.type]) break;
          if (c = i.find[l])
          if (r = c(f.matches[0].replace($, ""), z.test(u[0].type) && t.parentNode || t, s)) {
            u.splice(o, 1), e = r.length && u.join("");
            if (!e) return S.apply(n, x.call(r, 0)), n;
            break;
          }
        }
      }
      return a(e, h)(r, t, s, n, z.test(e)), n;
    }

    function mt() {}
    var n,r,i,s,o,u,a,f,l,c,h = !0,
    p = "undefined",
    d = ("sizcache" + Math.random()).replace(".", ""),
    m = String,
    g = e.document,
    y = g.documentElement,
    b = 0,
    w = 0,
    E = [].pop,
    S = [].push,
    x = [].slice,
    T = [].indexOf || function (e) {
      var t = 0,
      n = this.length;
      for (; t < n; t++) {
        if (this[t] === e) return t;}
      return -1;
    },
    N = function N(e, t) {
      return e[d] = t == null || t, e;
    },
    C = function C() {
      var e = {},
      t = [];
      return N(function (n, r) {
        return t.push(n) > i.cacheLength && delete e[t.shift()], e[n + " "] = r;
      }, e);
    },
    k = C(),
    L = C(),
    A = C(),
    O = "[\\x20\\t\\r\\n\\f]",
    M = "(?:\\\\.|[-\\w]|[^\\x00-\\xa0])+",
    _ = M.replace("w", "w#"),
    D = "([*^$|!~]?=)",
    P = "\\[" + O + "*(" + M + ")" + O + "*(?:" + D + O + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + _ + ")|)|)" + O +
    "*\\]",
    H = ":(" + M + ")(?:\\((?:(['\"])((?:\\\\.|[^\\\\])*?)\\2|([^()[\\]]*|(?:(?:" + P + ")|[^:]|\\\\.)*|.*))\\)|)",
    B = ":(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + O + "*((?:-\\d)?\\d*)" + O + "*\\)|)(?=[^-]|$)",
    j = new RegExp("^" + O + "+|((?:^|[^\\\\])(?:\\\\.)*)" + O + "+$", "g"),
    F = new RegExp("^" + O + "*," + O + "*"),
    I = new RegExp("^" + O + "*([\\x20\\t\\r\\n\\f>+~])" + O + "*"),
    q = new RegExp(H),
    R = /^(?:#([\w\-]+)|(\w+)|\.([\w\-]+))$/,
    U = /^:not/,
    z = /[\x20\t\r\n\f]*[+~]/,
    W = /:not\($/,
    X = /h\d/i,
    V = /input|select|textarea|button/i,
    $ = /\\(?!\\)/g,
    J = {
      ID: new RegExp("^#(" + M + ")"),
      CLASS: new RegExp("^\\.(" + M + ")"),
      NAME: new RegExp("^\\[name=['\"]?(" + M + ")['\"]?\\]"),
      TAG: new RegExp("^(" + M.replace("w", "w*") + ")"),
      ATTR: new RegExp("^" + P),
      PSEUDO: new RegExp("^" + H),
      POS: new RegExp(B, "i"),
      CHILD: new RegExp("^:(only|nth|first|last)-child(?:\\(" + O + "*(even|odd|(([+-]|)(\\d*)n|)" + O + "*(?:([+-]|)" +
      O + "*(\\d+)|))" + O + "*\\)|)", "i"),
      needsContext: new RegExp("^" + O + "*[>+~]|" + B, "i") },

    K = function K(e) {
      var t = g.createElement("div");
      try {
        return e(t);
      } catch (n) {
        return !1;
      } finally {
        t = null;
      }
    },
    Q = K(function (e) {
      return e.appendChild(g.createComment("")), !e.getElementsByTagName("*").length;
    }),
    G = K(function (e) {
      return e.innerHTML = "<a href='#'></a>", e.firstChild && typeof e.firstChild.getAttribute !== p && e.firstChild.getAttribute(
      "href") === "#";
    }),
    Y = K(function (e) {
      e.innerHTML = "<select></select>";
      var t = typeof e.lastChild.getAttribute("multiple");
      return t !== "boolean" && t !== "string";
    }),
    Z = K(function (e) {
      return e.innerHTML = "<div class='hidden e'></div><div class='hidden'></div>", !e.getElementsByClassName || !e.getElementsByClassName(
      "e").length ? !1 : (e.lastChild.className = "e", e.getElementsByClassName("e").length === 2);
    }),
    et = K(function (e) {
      e.id = d + 0, e.innerHTML = "<a name='" + d + "'></a><div name='" + d + "'></div>", y.insertBefore(e, y.firstChild);
      var t = g.getElementsByName && g.getElementsByName(d).length === 2 + g.getElementsByName(d + 0).length;
      return r = !g.getElementById(d), y.removeChild(e), t;
    });
    try {
      x.call(y.childNodes, 0)[0].nodeType;
    } catch (tt) {
      x = function x(e) {
        var t,n = [];
        for (; t = this[e]; e++) {n.push(t);}
        return n;
      };
    }
    nt.matches = function (e, t) {
      return nt(e, null, null, t);
    }, nt.matchesSelector = function (e, t) {
      return nt(t, null, null, [e]).length > 0;
    }, s = nt.getText = function (e) {
      var t,n = "",
      r = 0,
      i = e.nodeType;
      if (i) {
        if (i === 1 || i === 9 || i === 11) {
          if (typeof e.textContent == "string") return e.textContent;
          for (e = e.firstChild; e; e = e.nextSibling) {n += s(e);}
        } else if (i === 3 || i === 4) return e.nodeValue;
      } else
      for (; t = e[r]; r++) {n += s(t);}
      return n;
    }, o = nt.isXML = function (e) {
      var t = e && (e.ownerDocument || e).documentElement;
      return t ? t.nodeName !== "HTML" : !1;
    }, u = nt.contains = y.contains ? function (e, t) {
      var n = e.nodeType === 9 ? e.documentElement : e,
      r = t && t.parentNode;
      return e === r || !!(r && r.nodeType === 1 && n.contains && n.contains(r));
    } : y.compareDocumentPosition ? function (e, t) {
      return t && !!(e.compareDocumentPosition(t) & 16);
    } : function (e, t) {
      while (t = t.parentNode) {
        if (t === e) return !0;}
      return !1;
    }, nt.attr = function (e, t) {
      var n,r = o(e);
      return r || (t = t.toLowerCase()), (n = i.attrHandle[t]) ? n(e) : r || Y ? e.getAttribute(t) : (n = e.getAttributeNode(
      t), n ? typeof e[t] == "boolean" ? e[t] ? t : null : n.specified ? n.value : null : null);
    }, i = nt.selectors = {
      cacheLength: 50,
      createPseudo: N,
      match: J,
      attrHandle: G ? {} : {
        href: function href(e) {
          return e.getAttribute("href", 2);
        },
        type: function type(e) {
          return e.getAttribute("type");
        } },

      find: {
        ID: r ? function (e, t, n) {
          if (typeof t.getElementById !== p && !n) {
            var r = t.getElementById(e);
            return r && r.parentNode ? [r] : [];
          }
        } : function (e, n, r) {
          if (typeof n.getElementById !== p && !r) {
            var i = n.getElementById(e);
            return i ? i.id === e || typeof i.getAttributeNode !== p && i.getAttributeNode("id").value === e ? [i] : t : [];
          }
        },
        TAG: Q ? function (e, t) {
          if (typeof t.getElementsByTagName !== p) return t.getElementsByTagName(e);
        } : function (e, t) {
          var n = t.getElementsByTagName(e);
          if (e === "*") {
            var r,i = [],
            s = 0;
            for (; r = n[s]; s++) {r.nodeType === 1 && i.push(r);}
            return i;
          }
          return n;
        },
        NAME: et && function (e, t) {
          if (typeof t.getElementsByName !== p) return t.getElementsByName(name);
        },
        CLASS: Z && function (e, t, n) {
          if (typeof t.getElementsByClassName !== p && !n) return t.getElementsByClassName(e);
        } },

      relative: {
        ">": {
          dir: "parentNode",
          first: !0 },

        " ": {
          dir: "parentNode" },

        "+": {
          dir: "previousSibling",
          first: !0 },

        "~": {
          dir: "previousSibling" } },


      preFilter: {
        ATTR: function ATTR(e) {
          return e[1] = e[1].replace($, ""), e[3] = (e[4] || e[5] || "").replace($, ""), e[2] === "~=" && (e[3] = " " +
          e[3] + " "), e.slice(0, 4);
        },
        CHILD: function CHILD(e) {
          return e[1] = e[1].toLowerCase(), e[1] === "nth" ? (e[2] || nt.error(e[0]), e[3] = +(e[3] ? e[4] + (e[5] || 1) :
          2 * (e[2] === "even" || e[2] === "odd")), e[4] = +(e[6] + e[7] || e[2] === "odd")) : e[2] && nt.error(e[0]),
          e;
        },
        PSEUDO: function PSEUDO(e) {
          var t, n;
          if (J.CHILD.test(e[0])) return null;
          if (e[3]) e[2] = e[3];else
          if (t = e[4]) q.test(t) && (n = ut(t, !0)) && (n = t.indexOf(")", t.length - n) - t.length) && (t = t.slice(
          0, n), e[0] = e[0].slice(0, n)), e[2] = t;
          return e.slice(0, 3);
        } },

      filter: {
        ID: r ? function (e) {
          return e = e.replace($, ""),
          function (t) {
            return t.getAttribute("id") === e;
          };
        } : function (e) {
          return e = e.replace($, ""),
          function (t) {
            var n = typeof t.getAttributeNode !== p && t.getAttributeNode("id");
            return n && n.value === e;
          };
        },
        TAG: function TAG(e) {
          return e === "*" ? function () {
            return !0;
          } : (e = e.replace($, "").toLowerCase(), function (t) {
            return t.nodeName && t.nodeName.toLowerCase() === e;
          });
        },
        CLASS: function CLASS(e) {
          var t = k[d][e + " "];
          return t || (t = new RegExp("(^|" + O + ")" + e + "(" + O + "|$)")) && k(e, function (e) {
            return t.test(e.className || typeof e.getAttribute !== p && e.getAttribute("class") || "");
          });
        },
        ATTR: function ATTR(e, t, n) {
          return function (r, i) {
            var s = nt.attr(r, e);
            return s == null ? t === "!=" : t ? (s += "", t === "=" ? s === n : t === "!=" ? s !== n : t === "^=" ? n &&
            s.indexOf(n) === 0 : t === "*=" ? n && s.indexOf(n) > -1 : t === "$=" ? n && s.substr(s.length - n.length) ===
            n : t === "~=" ? (" " + s + " ").indexOf(n) > -1 : t === "|=" ? s === n || s.substr(0, n.length + 1) ===
            n + "-" : !1) : !0;
          };
        },
        CHILD: function CHILD(e, t, n, r) {
          return e === "nth" ? function (e) {
            var t,i,s = e.parentNode;
            if (n === 1 && r === 0) return !0;
            if (s) {
              i = 0;
              for (t = s.firstChild; t; t = t.nextSibling) {
                if (t.nodeType === 1) {
                  i++;
                  if (e === t) break;
                }}
            }
            return i -= r, i === n || i % n === 0 && i / n >= 0;
          } : function (t) {
            var n = t;
            switch (e) {
              case "only":
              case "first":
                while (n = n.previousSibling) {
                  if (n.nodeType === 1) return !1;}
                if (e === "first") return !0;
                n = t;
              case "last":
                while (n = n.nextSibling) {
                  if (n.nodeType === 1) return !1;}
                return !0;}

          };
        },
        PSEUDO: function PSEUDO(e, t) {
          var n,r = i.pseudos[e] || i.setFilters[e.toLowerCase()] || nt.error("unsupported pseudo: " + e);
          return r[d] ? r(t) : r.length > 1 ? (n = [e, e, "", t], i.setFilters.hasOwnProperty(e.toLowerCase()) ? N(
          function (e, n) {
            var i,s = r(e, t),
            o = s.length;
            while (o--) {i = T.call(e, s[o]), e[i] = !(n[i] = s[o]);}
          }) : function (e) {
            return r(e, 0, n);
          }) : r;
        } },

      pseudos: {
        not: N(function (e) {
          var t = [],
          n = [],
          r = a(e.replace(j, "$1"));
          return r[d] ? N(function (e, t, n, i) {
            var s,o = r(e, null, i, []),
            u = e.length;
            while (u--) {
              if (s = o[u]) e[u] = !(t[u] = s);}
          }) : function (e, i, s) {
            return t[0] = e, r(t, null, s, n), !n.pop();
          };
        }),
        has: N(function (e) {
          return function (t) {
            return nt(e, t).length > 0;
          };
        }),
        contains: N(function (e) {
          return function (t) {
            return (t.textContent || t.innerText || s(t)).indexOf(e) > -1;
          };
        }),
        enabled: function enabled(e) {
          return e.disabled === !1;
        },
        disabled: function disabled(e) {
          return e.disabled === !0;
        },
        checked: function checked(e) {
          var t = e.nodeName.toLowerCase();
          return t === "input" && !!e.checked || t === "option" && !!e.selected;
        },
        selected: function selected(e) {
          return e.parentNode && e.parentNode.selectedIndex, e.selected === !0;
        },
        parent: function parent(e) {
          return !i.pseudos.empty(e);
        },
        empty: function empty(e) {
          var t;
          e = e.firstChild;
          while (e) {
            if (e.nodeName > "@" || (t = e.nodeType) === 3 || t === 4) return !1;
            e = e.nextSibling;
          }
          return !0;
        },
        header: function header(e) {
          return X.test(e.nodeName);
        },
        text: function text(e) {
          var t, n;
          return e.nodeName.toLowerCase() === "input" && (t = e.type) === "text" && ((n = e.getAttribute("type")) ==
          null || n.toLowerCase() === t);
        },
        radio: rt("radio"),
        checkbox: rt("checkbox"),
        file: rt("file"),
        password: rt("password"),
        image: rt("image"),
        submit: it("submit"),
        reset: it("reset"),
        button: function button(e) {
          var t = e.nodeName.toLowerCase();
          return t === "input" && e.type === "button" || t === "button";
        },
        input: function input(e) {
          return V.test(e.nodeName);
        },
        focus: function focus(e) {
          var t = e.ownerDocument;
          return e === t.activeElement && (!t.hasFocus || t.hasFocus()) && !!(e.type || e.href || ~e.tabIndex);
        },
        active: function active(e) {
          return e === e.ownerDocument.activeElement;
        },
        first: st(function () {
          return [0];
        }),
        last: st(function (e, t) {
          return [t - 1];
        }),
        eq: st(function (e, t, n) {
          return [n < 0 ? n + t : n];
        }),
        even: st(function (e, t) {
          for (var n = 0; n < t; n += 2) {e.push(n);}
          return e;
        }),
        odd: st(function (e, t) {
          for (var n = 1; n < t; n += 2) {e.push(n);}
          return e;
        }),
        lt: st(function (e, t, n) {
          for (var r = n < 0 ? n + t : n; --r >= 0;) {e.push(r);}
          return e;
        }),
        gt: st(function (e, t, n) {
          for (var r = n < 0 ? n + t : n; ++r < t;) {e.push(r);}
          return e;
        }) } },

    f = y.compareDocumentPosition ? function (e, t) {
      return e === t ? (l = !0, 0) : (!e.compareDocumentPosition || !t.compareDocumentPosition ? e.compareDocumentPosition :
      e.compareDocumentPosition(t) & 4) ? -1 : 1;
    } : function (e, t) {
      if (e === t) return l = !0, 0;
      if (e.sourceIndex && t.sourceIndex) return e.sourceIndex - t.sourceIndex;
      var n,r,i = [],
      s = [],
      o = e.parentNode,
      u = t.parentNode,
      a = o;
      if (o === u) return ot(e, t);
      if (!o) return -1;
      if (!u) return 1;
      while (a) {i.unshift(a), a = a.parentNode;}
      a = u;
      while (a) {s.unshift(a), a = a.parentNode;}
      n = i.length, r = s.length;
      for (var f = 0; f < n && f < r; f++) {
        if (i[f] !== s[f]) return ot(i[f], s[f]);}
      return f === n ? ot(e, s[f], -1) : ot(i[f], t, 1);
    }, [0, 0].sort(f), h = !l, nt.uniqueSort = function (e) {
      var t,n = [],
      r = 1,
      i = 0;
      l = h, e.sort(f);
      if (l) {
        for (; t = e[r]; r++) {t === e[r - 1] && (i = n.push(r));}
        while (i--) {e.splice(n[i], 1);}
      }
      return e;
    }, nt.error = function (e) {
      throw new Error("Syntax error, unrecognized expression: " + e);
    }, a = nt.compile = function (e, t) {
      var n,r = [],
      i = [],
      s = A[d][e + " "];
      if (!s) {
        t || (t = ut(e)), n = t.length;
        while (n--) {s = ht(t[n]), s[d] ? r.push(s) : i.push(s);}
        s = A(e, pt(i, r));
      }
      return s;
    }, g.querySelectorAll && function () {
      var e,t = vt,
      n = /'|\\/g,
      r = /\=[\x20\t\r\n\f]*([^'"\]]*)[\x20\t\r\n\f]*\]/g,
      i = [":focus"],
      s = [":active"],
      u = y.matchesSelector || y.mozMatchesSelector || y.webkitMatchesSelector || y.oMatchesSelector || y.msMatchesSelector;
      K(function (e) {
        e.innerHTML = "<select><option selected=''></option></select>", e.querySelectorAll("[selected]").length || i.push(
        "\\[" + O + "*(?:checked|disabled|ismap|multiple|readonly|selected|value)"), e.querySelectorAll(":checked").length ||
        i.push(":checked");
      }), K(function (e) {
        e.innerHTML = "<p test=''></p>", e.querySelectorAll("[test^='']").length && i.push("[*^$]=" + O +
        "*(?:\"\"|'')"), e.innerHTML = "<input type='hidden'/>", e.querySelectorAll(":enabled").length || i.push(
        ":enabled", ":disabled");
      }), i = new RegExp(i.join("|")), vt = function vt(e, r, s, o, u) {
        if (!o && !u && !i.test(e)) {
          var a,f,l = !0,
          c = d,
          h = r,
          p = r.nodeType === 9 && e;
          if (r.nodeType === 1 && r.nodeName.toLowerCase() !== "object") {
            a = ut(e), (l = r.getAttribute("id")) ? c = l.replace(n, "\\$&") : r.setAttribute("id", c), c = "[id='" + c +
            "'] ", f = a.length;
            while (f--) {a[f] = c + a[f].join("");}
            h = z.test(e) && r.parentNode || r, p = a.join(",");
          }
          if (p) try {
            return S.apply(s, x.call(h.querySelectorAll(p), 0)), s;
          } catch (v) {} finally {
            l || r.removeAttribute("id");
          }
        }
        return t(e, r, s, o, u);
      }, u && (K(function (t) {
        e = u.call(t, "div");
        try {
          u.call(t, "[test!='']:sizzle"), s.push("!=", H);
        } catch (n) {}
      }), s = new RegExp(s.join("|")), nt.matchesSelector = function (t, n) {
        n = n.replace(r, "='$1']");
        if (!o(t) && !s.test(n) && !i.test(n)) try {
          var a = u.call(t, n);
          if (a || e || t.document && t.document.nodeType !== 11) return a;
        } catch (f) {}
        return nt(n, null, null, [t]).length > 0;
      });
    }(), i.pseudos.nth = i.pseudos.eq, i.filters = mt.prototype = i.pseudos, i.setFilters = new mt(), nt.attr = v.attr,
    v.find = nt, v.expr = nt.selectors, v.expr[":"] = v.expr.pseudos, v.unique = nt.uniqueSort, v.text = nt.getText, v.
    isXMLDoc = nt.isXML, v.contains = nt.contains;
  }(e);
  var nt = /Until$/,
  rt = /^(?:parents|prev(?:Until|All))/,
  it = /^.[^:#\[\.,]*$/,
  st = v.expr.match.needsContext,
  ot = {
    children: !0,
    contents: !0,
    next: !0,
    prev: !0 };

  v.fn.extend({
    find: function find(e) {
      var t,n,r,i,s,o,u = this;
      if (typeof e != "string") return v(e).filter(function () {
        for (t = 0, n = u.length; t < n; t++) {
          if (v.contains(u[t], this)) return !0;}
      });
      o = this.pushStack("", "find", e);
      for (t = 0, n = this.length; t < n; t++) {
        r = o.length, v.find(e, this[t], o);
        if (t > 0)
        for (i = r; i < o.length; i++) {
          for (s = 0; s < r; s++) {
            if (o[s] === o[i]) {
              o.splice(i--, 1);
              break;
            }}}
      }
      return o;
    },
    has: function has(e) {
      var t,n = v(e, this),
      r = n.length;
      return this.filter(function () {
        for (t = 0; t < r; t++) {
          if (v.contains(this, n[t])) return !0;}
      });
    },
    not: function not(e) {
      return this.pushStack(ft(this, e, !1), "not", e);
    },
    filter: function filter(e) {
      return this.pushStack(ft(this, e, !0), "filter", e);
    },
    is: function is(e) {
      return !!e && (typeof e == "string" ? st.test(e) ? v(e, this.context).index(this[0]) >= 0 : v.filter(e, this).length >
      0 : this.filter(e).length > 0);
    },
    closest: function closest(e, t) {
      var n,r = 0,
      i = this.length,
      s = [],
      o = st.test(e) || typeof e != "string" ? v(e, t || this.context) : 0;
      for (; r < i; r++) {
        n = this[r];
        while (n && n.ownerDocument && n !== t && n.nodeType !== 11) {
          if (o ? o.index(n) > -1 : v.find.matchesSelector(n, e)) {
            s.push(n);
            break;
          }
          n = n.parentNode;
        }
      }
      return s = s.length > 1 ? v.unique(s) : s, this.pushStack(s, "closest", e);
    },
    index: function index(e) {
      return e ? typeof e == "string" ? v.inArray(this[0], v(e)) : v.inArray(e.jquery ? e[0] : e, this) : this[0] &&
      this[0].parentNode ? this.prevAll().length : -1;
    },
    add: function add(e, t) {
      var n = typeof e == "string" ? v(e, t) : v.makeArray(e && e.nodeType ? [e] : e),
      r = v.merge(this.get(), n);
      return this.pushStack(ut(n[0]) || ut(r[0]) ? r : v.unique(r));
    },
    addBack: function addBack(e) {
      return this.add(e == null ? this.prevObject : this.prevObject.filter(e));
    } }),
  v.fn.andSelf = v.fn.addBack, v.each({
    parent: function parent(e) {
      var t = e.parentNode;
      return t && t.nodeType !== 11 ? t : null;
    },
    parents: function parents(e) {
      return v.dir(e, "parentNode");
    },
    parentsUntil: function parentsUntil(e, t, n) {
      return v.dir(e, "parentNode", n);
    },
    next: function next(e) {
      return at(e, "nextSibling");
    },
    prev: function prev(e) {
      return at(e, "previousSibling");
    },
    nextAll: function nextAll(e) {
      return v.dir(e, "nextSibling");
    },
    prevAll: function prevAll(e) {
      return v.dir(e, "previousSibling");
    },
    nextUntil: function nextUntil(e, t, n) {
      return v.dir(e, "nextSibling", n);
    },
    prevUntil: function prevUntil(e, t, n) {
      return v.dir(e, "previousSibling", n);
    },
    siblings: function siblings(e) {
      return v.sibling((e.parentNode || {}).firstChild, e);
    },
    children: function children(e) {
      return v.sibling(e.firstChild);
    },
    contents: function contents(e) {
      return v.nodeName(e, "iframe") ? e.contentDocument || e.contentWindow.document : v.merge([], e.childNodes);
    } },
  function (e, t) {
    v.fn[e] = function (n, r) {
      var i = v.map(this, t, n);
      return nt.test(e) || (r = n), r && typeof r == "string" && (i = v.filter(r, i)), i = this.length > 1 && !ot[e] ?
      v.unique(i) : i, this.length > 1 && rt.test(e) && (i = i.reverse()), this.pushStack(i, e, l.call(arguments).join(
      ","));
    };
  }), v.extend({
    filter: function filter(e, t, n) {
      return n && (e = ":not(" + e + ")"), t.length === 1 ? v.find.matchesSelector(t[0], e) ? [t[0]] : [] : v.find.matches(
      e, t);
    },
    dir: function dir(e, n, r) {
      var i = [],
      s = e[n];
      while (s && s.nodeType !== 9 && (r === t || s.nodeType !== 1 || !v(s).is(r))) {s.nodeType === 1 && i.push(s), s =
        s[n];}
      return i;
    },
    sibling: function sibling(e, t) {
      var n = [];
      for (; e; e = e.nextSibling) {e.nodeType === 1 && e !== t && n.push(e);}
      return n;
    } });

  var ct =
  "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
  ht = / jQuery\d+="(?:null|\d+)"/g,
  pt = /^\s+/,
  dt = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
  vt = /<([\w:]+)/,
  mt = /<tbody/i,
  gt = /<|&#?\w+;/,
  yt = /<(?:script|style|link)/i,
  bt = /<(?:script|object|embed|option|style)/i,
  wt = new RegExp("<(?:" + ct + ")[\\s/>]", "i"),
  Et = /^(?:checkbox|radio)$/,
  St = /checked\s*(?:[^=]|=\s*.checked.)/i,
  xt = /\/(java|ecma)script/i,
  Tt = /^\s*<!(?:\[CDATA\[|\-\-)|[\]\-]{2}>\s*$/g,
  Nt = {
    option: [1, "<select multiple='multiple'>", "</select>"],
    legend: [1, "<fieldset>", "</fieldset>"],
    thead: [1, "<table>", "</table>"],
    tr: [2, "<table><tbody>", "</tbody></table>"],
    td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
    col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
    area: [1, "<map>", "</map>"],
    _default: [0, "", ""] },

  Ct = lt(i),
  kt = Ct.appendChild(i.createElement("div"));
  Nt.optgroup = Nt.option, Nt.tbody = Nt.tfoot = Nt.colgroup = Nt.caption = Nt.thead, Nt.th = Nt.td, v.support.htmlSerialize || (
  Nt._default = [1, "X<div>", "</div>"]), v.fn.extend({
    text: function text(e) {
      return v.access(this, function (e) {
        return e === t ? v.text(this) : this.empty().append((this[0] && this[0].ownerDocument || i).createTextNode(e));
      }, null, e, arguments.length);
    },
    wrapAll: function wrapAll(e) {
      if (v.isFunction(e)) return this.each(function (t) {
        v(this).wrapAll(e.call(this, t));
      });
      if (this[0]) {
        var t = v(e, this[0].ownerDocument).eq(0).clone(!0);
        this[0].parentNode && t.insertBefore(this[0]), t.map(function () {
          var e = this;
          while (e.firstChild && e.firstChild.nodeType === 1) {e = e.firstChild;}
          return e;
        }).append(this);
      }
      return this;
    },
    wrapInner: function wrapInner(e) {
      return v.isFunction(e) ? this.each(function (t) {
        v(this).wrapInner(e.call(this, t));
      }) : this.each(function () {
        var t = v(this),
        n = t.contents();
        n.length ? n.wrapAll(e) : t.append(e);
      });
    },
    wrap: function wrap(e) {
      var t = v.isFunction(e);
      return this.each(function (n) {
        v(this).wrapAll(t ? e.call(this, n) : e);
      });
    },
    unwrap: function unwrap() {
      return this.parent().each(function () {
        v.nodeName(this, "body") || v(this).replaceWith(this.childNodes);
      }).end();
    },
    append: function append() {
      return this.domManip(arguments, !0, function (e) {
        (this.nodeType === 1 || this.nodeType === 11) && this.appendChild(e);
      });
    },
    prepend: function prepend() {
      return this.domManip(arguments, !0, function (e) {
        (this.nodeType === 1 || this.nodeType === 11) && this.insertBefore(e, this.firstChild);
      });
    },
    before: function before() {
      if (!ut(this[0])) return this.domManip(arguments, !1, function (e) {
        this.parentNode.insertBefore(e, this);
      });
      if (arguments.length) {
        var e = v.clean(arguments);
        return this.pushStack(v.merge(e, this), "before", this.selector);
      }
    },
    after: function after() {
      if (!ut(this[0])) return this.domManip(arguments, !1, function (e) {
        this.parentNode.insertBefore(e, this.nextSibling);
      });
      if (arguments.length) {
        var e = v.clean(arguments);
        return this.pushStack(v.merge(this, e), "after", this.selector);
      }
    },
    remove: function remove(e, t) {
      var n,r = 0;
      for (;
      (n = this[r]) != null; r++) {
        if (!e || v.filter(e, [n]).length) !t && n.nodeType === 1 && (v.cleanData(n.getElementsByTagName("*")), v.cleanData(
        [n])), n.parentNode && n.parentNode.removeChild(n);}
      return this;
    },
    empty: function empty() {
      var e,t = 0;
      for (;
      (e = this[t]) != null; t++) {
        e.nodeType === 1 && v.cleanData(e.getElementsByTagName("*"));
        while (e.firstChild) {e.removeChild(e.firstChild);}
      }
      return this;
    },
    clone: function clone(e, t) {
      return e = e == null ? !1 : e, t = t == null ? e : t, this.map(function () {
        return v.clone(this, e, t);
      });
    },
    html: function html(e) {
      return v.access(this, function (e) {
        var n = this[0] || {},
        r = 0,
        i = this.length;
        if (e === t) return n.nodeType === 1 ? n.innerHTML.replace(ht, "") : t;
        if (typeof e == "string" && !yt.test(e) && (v.support.htmlSerialize || !wt.test(e)) && (v.support.leadingWhitespace ||
        !pt.test(e)) && !Nt[(vt.exec(e) || ["", ""])[1].toLowerCase()]) {
          e = e.replace(dt, "<$1></$2>");
          try {
            for (; r < i; r++) {n = this[r] || {}, n.nodeType === 1 && (v.cleanData(n.getElementsByTagName("*")), n.innerHTML =
              e);}
            n = 0;
          } catch (s) {}
        }
        n && this.empty().append(e);
      }, null, e, arguments.length);
    },
    replaceWith: function replaceWith(e) {
      return ut(this[0]) ? this.length ? this.pushStack(v(v.isFunction(e) ? e() : e), "replaceWith", e) : this : v.isFunction(
      e) ? this.each(function (t) {
        var n = v(this),
        r = n.html();
        n.replaceWith(e.call(this, t, r));
      }) : (typeof e != "string" && (e = v(e).detach()), this.each(function () {
        var t = this.nextSibling,
        n = this.parentNode;
        v(this).remove(), t ? v(t).before(e) : v(n).append(e);
      }));
    },
    detach: function detach(e) {
      return this.remove(e, !0);
    },
    domManip: function domManip(e, n, r) {
      e = [].concat.apply([], e);
      var i,s,o,u,a = 0,
      f = e[0],
      l = [],
      c = this.length;
      if (!v.support.checkClone && c > 1 && typeof f == "string" && St.test(f)) return this.each(function () {
        v(this).domManip(e, n, r);
      });
      if (v.isFunction(f)) return this.each(function (i) {
        var s = v(this);
        e[0] = f.call(this, i, n ? s.html() : t), s.domManip(e, n, r);
      });
      if (this[0]) {
        i = v.buildFragment(e, this, l), o = i.fragment, s = o.firstChild, o.childNodes.length === 1 && (o = s);
        if (s) {
          n = n && v.nodeName(s, "tr");
          for (u = i.cacheable || c - 1; a < c; a++) {r.call(n && v.nodeName(this[a], "table") ? Lt(this[a], "tbody") :
            this[a], a === u ? o : v.clone(o, !0, !0));}
        }
        o = s = null, l.length && v.each(l, function (e, t) {
          t.src ? v.ajax ? v.ajax({
            url: t.src,
            type: "GET",
            dataType: "script",
            async: !1,
            global: !1,
            "throws": !0 }) :
          v.error("no ajax") : v.globalEval((t.text || t.textContent || t.innerHTML || "").replace(Tt, "")), t.parentNode &&
          t.parentNode.removeChild(t);
        });
      }
      return this;
    } }),
  v.buildFragment = function (e, n, r) {
    var s,o,u,a = e[0];
    return n = n || i, n = !n.nodeType && n[0] || n, n = n.ownerDocument || n, e.length === 1 && typeof a == "string" &&
    a.length < 512 && n === i && a.charAt(0) === "<" && !bt.test(a) && (v.support.checkClone || !St.test(a)) && (v.support.
    html5Clone || !wt.test(a)) && (o = !0, s = v.fragments[a], u = s !== t), s || (s = n.createDocumentFragment(), v.
    clean(e, n, s, r), o && (v.fragments[a] = u && s)), {
      fragment: s,
      cacheable: o };

  }, v.fragments = {}, v.each({
    appendTo: "append",
    prependTo: "prepend",
    insertBefore: "before",
    insertAfter: "after",
    replaceAll: "replaceWith" },
  function (e, t) {
    v.fn[e] = function (n) {
      var r,i = 0,
      s = [],
      o = v(n),
      u = o.length,
      a = this.length === 1 && this[0].parentNode;
      if ((a == null || a && a.nodeType === 11 && a.childNodes.length === 1) && u === 1) return o[t](this[0]), this;
      for (; i < u; i++) {r = (i > 0 ? this.clone(!0) : this).get(), v(o[i])[t](r), s = s.concat(r);}
      return this.pushStack(s, e, o.selector);
    };
  }), v.extend({
    clone: function clone(e, t, n) {
      var r, i, s, o;
      v.support.html5Clone || v.isXMLDoc(e) || !wt.test("<" + e.nodeName + ">") ? o = e.cloneNode(!0) : (kt.innerHTML =
      e.outerHTML, kt.removeChild(o = kt.firstChild));
      if ((!v.support.noCloneEvent || !v.support.noCloneChecked) && (e.nodeType === 1 || e.nodeType === 11) && !v.isXMLDoc(
      e)) {
        Ot(e, o), r = Mt(e), i = Mt(o);
        for (s = 0; r[s]; ++s) {i[s] && Ot(r[s], i[s]);}
      }
      if (t) {
        At(e, o);
        if (n) {
          r = Mt(e), i = Mt(o);
          for (s = 0; r[s]; ++s) {At(r[s], i[s]);}
        }
      }
      return r = i = null, o;
    },
    clean: function clean(e, t, n, r) {
      var s,o,u,a,f,l,c,h,p,d,m,g,y = t === i && Ct,
      b = [];
      if (!t || typeof t.createDocumentFragment == "undefined") t = i;
      for (s = 0;
      (u = e[s]) != null; s++) {
        typeof u == "number" && (u += "");
        if (!u) continue;
        if (typeof u == "string")
        if (!gt.test(u)) u = t.createTextNode(u);else
        {
          y = y || lt(t), c = t.createElement("div"), y.appendChild(c), u = u.replace(dt, "<$1></$2>"), a = (vt.exec(u) ||
          ["", ""])[1].toLowerCase(), f = Nt[a] || Nt._default, l = f[0], c.innerHTML = f[1] + u + f[2];
          while (l--) {c = c.lastChild;}
          if (!v.support.tbody) {
            h = mt.test(u), p = a === "table" && !h ? c.firstChild && c.firstChild.childNodes : f[1] === "<table>" && !h ?
            c.childNodes : [];
            for (o = p.length - 1; o >= 0; --o) {v.nodeName(p[o], "tbody") && !p[o].childNodes.length && p[o].parentNode.removeChild(
              p[o]);}
          }!v.support.leadingWhitespace && pt.test(u) && c.insertBefore(t.createTextNode(pt.exec(u)[0]), c.firstChild),
          u = c.childNodes, c.parentNode.removeChild(c);
        }u.nodeType ? b.push(u) : v.merge(b, u);
      }
      c && (u = c = y = null);
      if (!v.support.appendChecked)
      for (s = 0;
      (u = b[s]) != null; s++) {v.nodeName(u, "input") ? _t(u) : typeof u.getElementsByTagName != "undefined" && v.grep(
        u.getElementsByTagName("input"), _t);}
      if (n) {
        m = function m(e) {
          if (!e.type || xt.test(e.type)) return r ? r.push(e.parentNode ? e.parentNode.removeChild(e) : e) : n.appendChild(
          e);
        };
        for (s = 0;
        (u = b[s]) != null; s++) {
          if (!v.nodeName(u, "script") || !m(u)) n.appendChild(u), typeof u.getElementsByTagName != "undefined" && (g =
          v.grep(v.merge([], u.getElementsByTagName("script")), m), b.splice.apply(b, [s + 1, 0].concat(g)), s += g.length);}

      }
      return b;
    },
    cleanData: function cleanData(e, t) {
      var n,r,i,s,o = 0,
      u = v.expando,
      a = v.cache,
      f = v.support.deleteExpando,
      l = v.event.special;
      for (;
      (i = e[o]) != null; o++) {
        if (t || v.acceptData(i)) {
          r = i[u], n = r && a[r];
          if (n) {
            if (n.events)
            for (s in n.events) {l[s] ? v.event.remove(i, s) : v.removeEvent(i, s, n.handle);}
            a[r] && (delete a[r], f ? delete i[u] : i.removeAttribute ? i.removeAttribute(u) : i[u] = null, v.deletedIds.push(
            r));
          }
        }}
    } }),

  function () {
    var e, t;
    v.uaMatch = function (e) {
      e = e.toLowerCase();
      var t = /(chrome)[ \/]([\w.]+)/.exec(e) || /(webkit)[ \/]([\w.]+)/.exec(e) ||
      /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(e) || /(msie) ([\w.]+)/.exec(e) || e.indexOf("compatible") < 0 &&
      /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(e) || [];
      return {
        browser: t[1] || "",
        version: t[2] || "0" };

    }, e = v.uaMatch(o.userAgent), t = {}, e.browser && (t[e.browser] = !0, t.version = e.version), t.chrome ? t.webkit = !
    0 : t.webkit && (t.safari = !0), v.browser = t, v.sub = function () {
      function e(t, n) {
        return new e.fn.init(t, n);
      }
      v.extend(!0, e, this), e.superclass = this, e.fn = e.prototype = this(), e.fn.constructor = e, e.sub = this.sub,
      e.fn.init = function (r, i) {
        return i && i instanceof v && !(i instanceof e) && (i = e(i)), v.fn.init.call(this, r, i, t);
      }, e.fn.init.prototype = e.fn;
      var t = e(i);
      return e;
    };
  }();
  var Dt,Pt,Ht,Bt = /alpha\([^)]*\)/i,
  jt = /opacity=([^)]*)/,
  Ft = /^(top|right|bottom|left)$/,
  It = /^(none|table(?!-c[ea]).+)/,
  qt = /^margin/,
  Rt = new RegExp("^(" + m + ")(.*)$", "i"),
  Ut = new RegExp("^(" + m + ")(?!px)[a-z%]+$", "i"),
  zt = new RegExp("^([-+])=(" + m + ")", "i"),
  Wt = {
    BODY: "block" },

  Xt = {
    position: "absolute",
    visibility: "hidden",
    display: "block" },

  Vt = {
    letterSpacing: 0,
    fontWeight: 400 },

  $t = ["Top", "Right", "Bottom", "Left"],
  Jt = ["Webkit", "O", "Moz", "ms"],
  Kt = v.fn.toggle;
  v.fn.extend({
    css: function css(e, n) {
      return v.access(this, function (e, n, r) {
        return r !== t ? v.style(e, n, r) : v.css(e, n);
      }, e, n, arguments.length > 1);
    },
    show: function show() {
      return Yt(this, !0);
    },
    hide: function hide() {
      return Yt(this);
    },
    toggle: function toggle(e, t) {
      var n = typeof e == "boolean";
      return v.isFunction(e) && v.isFunction(t) ? Kt.apply(this, arguments) : this.each(function () {
        (n ? e : Gt(this)) ? v(this).show() : v(this).hide();
      });
    } }),
  v.extend({
    cssHooks: {
      opacity: {
        get: function get(e, t) {
          if (t) {
            var n = Dt(e, "opacity");
            return n === "" ? "1" : n;
          }
        } } },


    cssNumber: {
      fillOpacity: !0,
      fontWeight: !0,
      lineHeight: !0,
      opacity: !0,
      orphans: !0,
      widows: !0,
      zIndex: !0,
      zoom: !0 },

    cssProps: {
      "float": v.support.cssFloat ? "cssFloat" : "styleFloat" },

    style: function style(e, n, r, i) {
      if (!e || e.nodeType === 3 || e.nodeType === 8 || !e.style) return;
      var s,o,u,a = v.camelCase(n),
      f = e.style;
      n = v.cssProps[a] || (v.cssProps[a] = Qt(f, a)), u = v.cssHooks[n] || v.cssHooks[a];
      if (r === t) return u && "get" in u && (s = u.get(e, !1, i)) !== t ? s : f[n];
      o = typeof r, o === "string" && (s = zt.exec(r)) && (r = (s[1] + 1) * s[2] + parseFloat(v.css(e, n)), o =
      "number");
      if (r == null || o === "number" && isNaN(r)) return;
      o === "number" && !v.cssNumber[a] && (r += "px");
      if (!u || !("set" in u) || (r = u.set(e, r, i)) !== t) try {
        f[n] = r;
      } catch (l) {}
    },
    css: function css(e, n, r, i) {
      var s,o,u,a = v.camelCase(n);
      return n = v.cssProps[a] || (v.cssProps[a] = Qt(e.style, a)), u = v.cssHooks[n] || v.cssHooks[a], u && "get" in
      u && (s = u.get(e, !0, i)), s === t && (s = Dt(e, n)), s === "normal" && n in Vt && (s = Vt[n]), r || i !== t ? (
      o = parseFloat(s), r || v.isNumeric(o) ? o || 0 : s) : s;
    },
    swap: function swap(e, t, n) {
      var r,i,s = {};
      for (i in t) {s[i] = e.style[i], e.style[i] = t[i];}
      r = n.call(e);
      for (i in t) {e.style[i] = s[i];}
      return r;
    } }),
  e.getComputedStyle ? Dt = function Dt(t, n) {
    var r,i,s,o,u = e.getComputedStyle(t, null),
    a = t.style;
    return u && (r = u.getPropertyValue(n) || u[n], r === "" && !v.contains(t.ownerDocument, t) && (r = v.style(t, n)),
    Ut.test(r) && qt.test(n) && (i = a.width, s = a.minWidth, o = a.maxWidth, a.minWidth = a.maxWidth = a.width = r,
    r = u.width, a.width = i, a.minWidth = s, a.maxWidth = o)), r;
  } : i.documentElement.currentStyle && (Dt = function Dt(e, t) {
    var n,r,i = e.currentStyle && e.currentStyle[t],
    s = e.style;
    return i == null && s && s[t] && (i = s[t]), Ut.test(i) && !Ft.test(t) && (n = s.left, r = e.runtimeStyle && e.runtimeStyle.
    left, r && (e.runtimeStyle.left = e.currentStyle.left), s.left = t === "fontSize" ? "1em" : i, i = s.pixelLeft +
    "px", s.left = n, r && (e.runtimeStyle.left = r)), i === "" ? "auto" : i;
  }), v.each(["height", "width"], function (e, t) {
    v.cssHooks[t] = {
      get: function get(e, n, r) {
        if (n) return e.offsetWidth === 0 && It.test(Dt(e, "display")) ? v.swap(e, Xt, function () {
          return tn(e, t, r);
        }) : tn(e, t, r);
      },
      set: function set(e, n, r) {
        return Zt(e, n, r ? en(e, t, r, v.support.boxSizing && v.css(e, "boxSizing") === "border-box") : 0);
      } };

  }), v.support.opacity || (v.cssHooks.opacity = {
    get: function get(e, t) {
      return jt.test((t && e.currentStyle ? e.currentStyle.filter : e.style.filter) || "") ? .01 * parseFloat(RegExp.$1) +
      "" : t ? "1" : "";
    },
    set: function set(e, t) {
      var n = e.style,
      r = e.currentStyle,
      i = v.isNumeric(t) ? "alpha(opacity=" + t * 100 + ")" : "",
      s = r && r.filter || n.filter || "";
      n.zoom = 1;
      if (t >= 1 && v.trim(s.replace(Bt, "")) === "" && n.removeAttribute) {
        n.removeAttribute("filter");
        if (r && !r.filter) return;
      }
      n.filter = Bt.test(s) ? s.replace(Bt, i) : s + " " + i;
    } }),
  v(function () {
    v.support.reliableMarginRight || (v.cssHooks.marginRight = {
      get: function get(e, t) {
        return v.swap(e, {
          display: "inline-block" },
        function () {
          if (t) return Dt(e, "marginRight");
        });
      } }),
    !v.support.pixelPosition && v.fn.position && v.each(["top", "left"], function (e, t) {
      v.cssHooks[t] = {
        get: function get(e, n) {
          if (n) {
            var r = Dt(e, t);
            return Ut.test(r) ? v(e).position()[t] + "px" : r;
          }
        } };

    });
  }), v.expr && v.expr.filters && (v.expr.filters.hidden = function (e) {
    return e.offsetWidth === 0 && e.offsetHeight === 0 || !v.support.reliableHiddenOffsets && (e.style && e.style.display ||
    Dt(e, "display")) === "none";
  }, v.expr.filters.visible = function (e) {
    return !v.expr.filters.hidden(e);
  }), v.each({
    margin: "",
    padding: "",
    border: "Width" },
  function (e, t) {
    v.cssHooks[e + t] = {
      expand: function expand(n) {
        var r,i = typeof n == "string" ? n.split(" ") : [n],
        s = {};
        for (r = 0; r < 4; r++) {s[e + $t[r] + t] = i[r] || i[r - 2] || i[0];}
        return s;
      } },
    qt.test(e) || (v.cssHooks[e + t].set = Zt);
  });
  var rn = /%20/g,
  sn = /\[\]$/,
  on = /\r?\n/g,
  un =
  /^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,
  an = /^(?:select|textarea)/i;
  v.fn.extend({
    serialize: function serialize() {
      return v.param(this.serializeArray());
    },
    serializeArray: function serializeArray() {
      return this.map(function () {
        return this.elements ? v.makeArray(this.elements) : this;
      }).filter(function () {
        return this.name && !this.disabled && (this.checked || an.test(this.nodeName) || un.test(this.type));
      }).map(function (e, t) {
        var n = v(this).val();
        return n == null ? null : v.isArray(n) ? v.map(n, function (e, n) {
          return {
            name: t.name,
            value: e.replace(on, "\r\n") };

        }) : {
          name: t.name,
          value: n.replace(on, "\r\n") };

      }).get();
    } }),
  v.param = function (e, n) {
    var r,i = [],
    s = function s(e, t) {
      t = v.isFunction(t) ? t() : t == null ? "" : t, i[i.length] = encodeURIComponent(e) + "=" + encodeURIComponent(t);
    };
    n === t && (n = v.ajaxSettings && v.ajaxSettings.traditional);
    if (v.isArray(e) || e.jquery && !v.isPlainObject(e)) v.each(e, function () {
      s(this.name, this.value);
    });else

    for (r in e) {fn(r, e[r], n, s);}
    return i.join("&").replace(rn, "+");
  };
  var ln,cn,hn = /#.*$/,
  pn = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg,
  dn = /^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/,
  vn = /^(?:GET|HEAD)$/,
  mn = /^\/\//,
  gn = /\?/,
  yn = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
  bn = /([?&])_=[^&]*/,
  wn = /^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,
  En = v.fn.load,
  Sn = {},
  xn = {},
  Tn = ["*/"] + ["*"];
  try {
    cn = s.href;
  } catch (Nn) {
    cn = i.createElement("a"), cn.href = "", cn = cn.href;
  }
  ln = wn.exec(cn.toLowerCase()) || [], v.fn.load = function (e, n, r) {
    if (typeof e != "string" && En) return En.apply(this, arguments);
    if (!this.length) return this;
    var i,s,o,u = this,
    a = e.indexOf(" ");
    return a >= 0 && (i = e.slice(a, e.length), e = e.slice(0, a)), v.isFunction(n) ? (r = n, n = t) : n && typeof n ==
    "object" && (s = "POST"), v.ajax({
      url: e,
      type: s,
      dataType: "html",
      data: n,
      complete: function complete(e, t) {
        r && u.each(r, o || [e.responseText, t, e]);
      } }).
    done(function (e) {
      o = arguments, u.html(i ? v("<div>").append(e.replace(yn, "")).find(i) : e);
    }), this;
  }, v.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "), function (e, t) {
    v.fn[t] = function (e) {
      return this.on(t, e);
    };
  }), v.each(["get", "post"], function (e, n) {
    v[n] = function (e, r, i, s) {
      return v.isFunction(r) && (s = s || i, i = r, r = t), v.ajax({
        type: n,
        url: e,
        data: r,
        success: i,
        dataType: s });

    };
  }), v.extend({
    getScript: function getScript(e, n) {
      return v.get(e, t, n, "script");
    },
    getJSON: function getJSON(e, t, n) {
      return v.get(e, t, n, "json");
    },
    ajaxSetup: function ajaxSetup(e, t) {
      return t ? Ln(e, v.ajaxSettings) : (t = e, e = v.ajaxSettings), Ln(e, t), e;
    },
    ajaxSettings: {
      url: cn,
      isLocal: dn.test(ln[1]),
      global: !0,
      type: "GET",
      contentType: "application/x-www-form-urlencoded; charset=UTF-8",
      processData: !0,
      async: !0,
      accepts: {
        xml: "application/xml, text/xml",
        html: "text/html",
        text: "text/plain",
        json: "application/json, text/javascript",
        "*": Tn },

      contents: {
        xml: /xml/,
        html: /html/,
        json: /json/ },

      responseFields: {
        xml: "responseXML",
        text: "responseText" },

      converters: {
        "* text": e.String,
        "text html": !0,
        "text json": v.parseJSON,
        "text xml": v.parseXML },

      flatOptions: {
        context: !0,
        url: !0 } },


    ajaxPrefilter: Cn(Sn),
    ajaxTransport: Cn(xn),
    ajax: function ajax(e, n) {
      function T(e, n, s, a) {
        var l,y,b,w,S,T = n;
        if (E === 2) return;
        E = 2, u && clearTimeout(u), o = t, i = a || "", x.readyState = e > 0 ? 4 : 0, s && (w = An(c, x, s));
        if (e >= 200 && e < 300 || e === 304) c.ifModified && (S = x.getResponseHeader("Last-Modified"), S && (v.lastModified[
        r] = S), S = x.getResponseHeader("Etag"), S && (v.etag[r] = S)), e === 304 ? (T = "notmodified", l = !0) : (l =
        On(c, w), T = l.state, y = l.data, b = l.error, l = !b);else
        {
          b = T;
          if (!T || e) T = "error", e < 0 && (e = 0);
        }
        x.status = e, x.statusText = (n || T) + "", l ? d.resolveWith(h, [y, T, x]) : d.rejectWith(h, [x, T, b]), x.statusCode(
        g), g = t, f && p.trigger("ajax" + (l ? "Success" : "Error"), [x, c, l ? y : b]), m.fireWith(h, [x, T]), f && (
        p.trigger("ajaxComplete", [x, c]), --v.active || v.event.trigger("ajaxStop"));
      }
      typeof e == "object" && (n = e, e = t), n = n || {};
      var r,i,s,o,u,a,f,l,c = v.ajaxSetup({}, n),
      h = c.context || c,
      p = h !== c && (h.nodeType || h instanceof v) ? v(h) : v.event,
      d = v.Deferred(),
      m = v.Callbacks("once memory"),
      g = c.statusCode || {},
      b = {},
      w = {},
      E = 0,
      S = "canceled",
      x = {
        readyState: 0,
        setRequestHeader: function setRequestHeader(e, t) {
          if (!E) {
            var n = e.toLowerCase();
            e = w[n] = w[n] || e, b[e] = t;
          }
          return this;
        },
        getAllResponseHeaders: function getAllResponseHeaders() {
          return E === 2 ? i : null;
        },
        getResponseHeader: function getResponseHeader(e) {
          var n;
          if (E === 2) {
            if (!s) {
              s = {};
              while (n = pn.exec(i)) {s[n[1].toLowerCase()] = n[2];}
            }
            n = s[e.toLowerCase()];
          }
          return n === t ? null : n;
        },
        overrideMimeType: function overrideMimeType(e) {
          return E || (c.mimeType = e), this;
        },
        abort: function abort(e) {
          return e = e || S, o && o.abort(e), T(0, e), this;
        } };

      d.promise(x), x.success = x.done, x.error = x.fail, x.complete = m.add, x.statusCode = function (e) {
        if (e) {
          var t;
          if (E < 2)
          for (t in e) {g[t] = [g[t], e[t]];} else
          t = e[x.status], x.always(t);
        }
        return this;
      }, c.url = ((e || c.url) + "").replace(hn, "").replace(mn, ln[1] + "//"), c.dataTypes = v.trim(c.dataType ||
      "*").toLowerCase().split(y), c.crossDomain == null && (a = wn.exec(c.url.toLowerCase()), c.crossDomain = !(!a ||
      a[1] === ln[1] && a[2] === ln[2] && (a[3] || (a[1] === "http:" ? 80 : 443)) == (ln[3] || (ln[1] === "http:" ?
      80 : 443)))), c.data && c.processData && typeof c.data != "string" && (c.data = v.param(c.data, c.traditional)),
      kn(Sn, c, n, x);
      if (E === 2) return x;
      f = c.global, c.type = c.type.toUpperCase(), c.hasContent = !vn.test(c.type), f && v.active++ === 0 && v.event.trigger(
      "ajaxStart");
      if (!c.hasContent) {
        c.data && (c.url += (gn.test(c.url) ? "&" : "?") + c.data, delete c.data), r = c.url;
        if (c.cache === !1) {
          var N = v.now(),
          C = c.url.replace(bn, "$1_=" + N);
          c.url = C + (C === c.url ? (gn.test(c.url) ? "&" : "?") + "_=" + N : "");
        }
      }(c.data && c.hasContent && c.contentType !== !1 || n.contentType) && x.setRequestHeader("Content-Type", c.contentType),
      c.ifModified && (r = r || c.url, v.lastModified[r] && x.setRequestHeader("If-Modified-Since", v.lastModified[r]),
      v.etag[r] && x.setRequestHeader("If-None-Match", v.etag[r])), x.setRequestHeader("Accept", c.dataTypes[0] && c.
      accepts[c.dataTypes[0]] ? c.accepts[c.dataTypes[0]] + (c.dataTypes[0] !== "*" ? ", " + Tn + "; q=0.01" : "") :
      c.accepts["*"]);
      for (l in c.headers) {x.setRequestHeader(l, c.headers[l]);}
      if (!c.beforeSend || c.beforeSend.call(h, x, c) !== !1 && E !== 2) {
        S = "abort";
        for (l in {
          success: 1,
          error: 1,
          complete: 1 }) {
          x[l](c[l]);}
        o = kn(xn, c, n, x);
        if (!o) T(-1, "No Transport");else
        {
          x.readyState = 1, f && p.trigger("ajaxSend", [x, c]), c.async && c.timeout > 0 && (u = setTimeout(function () {
            x.abort("timeout");
          }, c.timeout));
          try {
            E = 1, o.send(b, T);
          } catch (k) {
            if (!(E < 2)) throw k;
            T(-1, k);
          }
        }
        return x;
      }
      return x.abort();
    },
    active: 0,
    lastModified: {},
    etag: {} });

  var Mn = [],
  _n = /\?/,
  Dn = /(=)\?(?=&|$)|\?\?/,
  Pn = v.now();
  v.ajaxSetup({
    jsonp: "callback",
    jsonpCallback: function jsonpCallback() {
      var e = Mn.pop() || v.expando + "_" + Pn++;
      return this[e] = !0, e;
    } }),
  v.ajaxPrefilter("json jsonp", function (n, r, i) {
    var s,o,u,a = n.data,
    f = n.url,
    l = n.jsonp !== !1,
    c = l && Dn.test(f),
    h = l && !c && typeof a == "string" && !(n.contentType || "").indexOf("application/x-www-form-urlencoded") && Dn.test(
    a);
    if (n.dataTypes[0] === "jsonp" || c || h) return s = n.jsonpCallback = v.isFunction(n.jsonpCallback) ? n.jsonpCallback() :
    n.jsonpCallback, o = e[s], c ? n.url = f.replace(Dn, "$1" + s) : h ? n.data = a.replace(Dn, "$1" + s) : l && (n.url +=
    (_n.test(f) ? "&" : "?") + n.jsonp + "=" + s), n.converters["script json"] = function () {
      return u || v.error(s + " was not called"), u[0];
    }, n.dataTypes[0] = "json", e[s] = function () {
      u = arguments;
    }, i.always(function () {
      e[s] = o, n[s] && (n.jsonpCallback = r.jsonpCallback, Mn.push(s)), u && v.isFunction(o) && o(u[0]), u = o = t;
    }), "script";
  }), v.ajaxSetup({
    accepts: {
      script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript" },

    contents: {
      script: /javascript|ecmascript/ },

    converters: {
      "text script": function textScript(e) {
        return v.globalEval(e), e;
      } } }),

  v.ajaxPrefilter("script", function (e) {
    e.cache === t && (e.cache = !1), e.crossDomain && (e.type = "GET", e.global = !1);
  }), v.ajaxTransport("script", function (e) {
    if (e.crossDomain) {
      var n,r = i.head || i.getElementsByTagName("head")[0] || i.documentElement;
      return {
        send: function send(s, o) {
          n = i.createElement("script"), n.async = "async", e.scriptCharset && (n.charset = e.scriptCharset), n.src = e.url,
          n.onload = n.onreadystatechange = function (e, i) {
            if (i || !n.readyState || /loaded|complete/.test(n.readyState)) n.onload = n.onreadystatechange = null, r &&
            n.parentNode && r.removeChild(n), n = t, i || o(200, "success");
          }, r.insertBefore(n, r.firstChild);
        },
        abort: function abort() {
          n && n.onload(0, 1);
        } };

    }
  });
  var Hn,Bn = e.ActiveXObject ? function () {
    for (var e in Hn) {Hn[e](0, 1);}
  } : !1,
  jn = 0;
  v.ajaxSettings.xhr = e.ActiveXObject ? function () {
    return !this.isLocal && Fn() || In();
  } : Fn,
  function (e) {
    v.extend(v.support, {
      ajax: !!e,
      cors: !!e && "withCredentials" in e });

  }(v.ajaxSettings.xhr()), v.support.ajax && v.ajaxTransport(function (n) {
    if (!n.crossDomain || v.support.cors) {
      var _r;
      return {
        send: function send(i, s) {
          var o,u,a = n.xhr();
          n.username ? a.open(n.type, n.url, n.async, n.username, n.password) : a.open(n.type, n.url, n.async);
          if (n.xhrFields)
          for (u in n.xhrFields) {a[u] = n.xhrFields[u];}
          n.mimeType && a.overrideMimeType && a.overrideMimeType(n.mimeType), !n.crossDomain && !i["X-Requested-With"] && (
          i["X-Requested-With"] = "XMLHttpRequest");
          try {
            for (u in i) {a.setRequestHeader(u, i[u]);}
          } catch (f) {}
          a.send(n.hasContent && n.data || null), _r = function r(e, i) {
            var u, f, l, c, h;
            try {
              if (_r && (i || a.readyState === 4)) {
                _r = t, o && (a.onreadystatechange = v.noop, Bn && delete Hn[o]);
                if (i) a.readyState !== 4 && a.abort();else
                {
                  u = a.status, l = a.getAllResponseHeaders(), c = {}, h = a.responseXML, h && h.documentElement && (c.xml =
                  h);
                  try {
                    c.text = a.responseText;
                  } catch (p) {}
                  try {
                    f = a.statusText;
                  } catch (p) {
                    f = "";
                  }!u && n.isLocal && !n.crossDomain ? u = c.text ? 200 : 404 : u === 1223 && (u = 204);
                }
              }
            } catch (d) {
              i || s(-1, d);
            }
            c && s(u, f, c, l);
          }, n.async ? a.readyState === 4 ? setTimeout(_r, 0) : (o = ++jn, Bn && (Hn || (Hn = {}, v(e).unload(Bn)), Hn[o] =
          _r), a.onreadystatechange = _r) : _r();
        },
        abort: function abort() {
          _r && _r(0, 1);
        } };

    }
  });
  var qn,Rn,Un = /^(?:toggle|show|hide)$/,
  zn = new RegExp("^(?:([-+])=|)(" + m + ")([a-z%]*)$", "i"),
  Wn = /queueHooks$/,
  Xn = [Gn],
  Vn = {
    "*": [function (e, t) {
      var n,r,i = this.createTween(e, t),
      s = zn.exec(t),
      o = i.cur(),
      u = +o || 0,
      a = 1,
      f = 20;
      if (s) {
        n = +s[2], r = s[3] || (v.cssNumber[e] ? "" : "px");
        if (r !== "px" && u) {
          u = v.css(i.elem, e, !0) || n || 1;
          do {a = a || ".5", u /= a, v.style(i.elem, e, u + r);} while (a !== (a = i.cur() / o) && a !== 1 && --f);
        }
        i.unit = r, i.start = u, i.end = s[1] ? u + (s[1] + 1) * n : n;
      }
      return i;
    }] };

  v.Animation = v.extend(Kn, {
    tweener: function tweener(e, t) {
      v.isFunction(e) ? (t = e, e = ["*"]) : e = e.split(" ");
      var n,r = 0,
      i = e.length;
      for (; r < i; r++) {n = e[r], Vn[n] = Vn[n] || [], Vn[n].unshift(t);}
    },
    prefilter: function prefilter(e, t) {
      t ? Xn.unshift(e) : Xn.push(e);
    } }),
  v.Tween = Yn, Yn.prototype = {
    constructor: Yn,
    init: function init(e, t, n, r, i, s) {
      this.elem = e, this.prop = n, this.easing = i || "swing", this.options = t, this.start = this.now = this.cur(),
      this.end = r, this.unit = s || (v.cssNumber[n] ? "" : "px");
    },
    cur: function cur() {
      var e = Yn.propHooks[this.prop];
      return e && e.get ? e.get(this) : Yn.propHooks._default.get(this);
    },
    run: function run(e) {
      var t,n = Yn.propHooks[this.prop];
      return this.options.duration ? this.pos = t = v.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.
      duration) : this.pos = t = e, this.now = (this.end - this.start) * t + this.start, this.options.step && this.options.
      step.call(this.elem, this.now, this), n && n.set ? n.set(this) : Yn.propHooks._default.set(this), this;
    } },
  Yn.prototype.init.prototype = Yn.prototype, Yn.propHooks = {
    _default: {
      get: function get(e) {
        var t;
        return e.elem[e.prop] == null || !!e.elem.style && e.elem.style[e.prop] != null ? (t = v.css(e.elem, e.prop, !1,
        ""), !t || t === "auto" ? 0 : t) : e.elem[e.prop];
      },
      set: function set(e) {
        v.fx.step[e.prop] ? v.fx.step[e.prop](e) : e.elem.style && (e.elem.style[v.cssProps[e.prop]] != null || v.cssHooks[
        e.prop]) ? v.style(e.elem, e.prop, e.now + e.unit) : e.elem[e.prop] = e.now;
      } } },

  Yn.propHooks.scrollTop = Yn.propHooks.scrollLeft = {
    set: function set(e) {
      e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now);
    } },
  v.each(["toggle", "show", "hide"], function (e, t) {
    var n = v.fn[t];
    v.fn[t] = function (r, i, s) {
      return r == null || typeof r == "boolean" || !e && v.isFunction(r) && v.isFunction(i) ? n.apply(this, arguments) :
      this.animate(Zn(t, !0), r, i, s);
    };
  }), v.fn.extend({
    fadeTo: function fadeTo(e, t, n, r) {
      return this.filter(Gt).css("opacity", 0).show().end().animate({
        opacity: t },
      e, n, r);
    },
    animate: function animate(e, t, n, r) {
      var i = v.isEmptyObject(e),
      s = v.speed(t, n, r),
      o = function o() {
        var t = Kn(this, v.extend({}, e), s);
        i && t.stop(!0);
      };
      return i || s.queue === !1 ? this.each(o) : this.queue(s.queue, o);
    },
    stop: function stop(e, n, r) {
      var i = function i(e) {
        var t = e.stop;
        delete e.stop, t(r);
      };
      return typeof e != "string" && (r = n, n = e, e = t), n && e !== !1 && this.queue(e || "fx", []), this.each(
      function () {
        var t = !0,
        n = e != null && e + "queueHooks",
        s = v.timers,
        o = v._data(this);
        if (n) o[n] && o[n].stop && i(o[n]);else

        for (n in o) {o[n] && o[n].stop && Wn.test(n) && i(o[n]);}
        for (n = s.length; n--;) {s[n].elem === this && (e == null || s[n].queue === e) && (s[n].anim.stop(r), t = !1,
          s.splice(n, 1));}
        (t || !r) && v.dequeue(this, e);
      });
    } }),
  v.each({
    slideDown: Zn("show"),
    slideUp: Zn("hide"),
    slideToggle: Zn("toggle"),
    fadeIn: {
      opacity: "show" },

    fadeOut: {
      opacity: "hide" },

    fadeToggle: {
      opacity: "toggle" } },

  function (e, t) {
    v.fn[e] = function (e, n, r) {
      return this.animate(t, e, n, r);
    };
  }), v.speed = function (e, t, n) {
    var r = e && typeof e == "object" ? v.extend({}, e) : {
      complete: n || !n && t || v.isFunction(e) && e,
      duration: e,
      easing: n && t || t && !v.isFunction(t) && t };

    r.duration = v.fx.off ? 0 : typeof r.duration == "number" ? r.duration : r.duration in v.fx.speeds ? v.fx.speeds[r.duration] :
    v.fx.speeds._default;
    if (r.queue == null || r.queue === !0) r.queue = "fx";
    return r.old = r.complete, r.complete = function () {
      v.isFunction(r.old) && r.old.call(this), r.queue && v.dequeue(this, r.queue);
    }, r;
  }, v.easing = {
    linear: function linear(e) {
      return e;
    },
    swing: function swing(e) {
      return .5 - Math.cos(e * Math.PI) / 2;
    } },
  v.timers = [], v.fx = Yn.prototype.init, v.fx.tick = function () {
    var e,n = v.timers,
    r = 0;
    qn = v.now();
    for (; r < n.length; r++) {e = n[r], !e() && n[r] === e && n.splice(r--, 1);}
    n.length || v.fx.stop(), qn = t;
  }, v.fx.timer = function (e) {
    e() && v.timers.push(e) && !Rn && (Rn = setInterval(v.fx.tick, v.fx.interval));
  }, v.fx.interval = 13, v.fx.stop = function () {
    clearInterval(Rn), Rn = null;
  }, v.fx.speeds = {
    slow: 600,
    fast: 200,
    _default: 400 },
  v.fx.step = {}, v.expr && v.expr.filters && (v.expr.filters.animated = function (e) {
    return v.grep(v.timers, function (t) {
      return e === t.elem;
    }).length;
  });
  var er = /^(?:body|html)$/i;
  v.fn.offset = function (e) {
    if (arguments.length) return e === t ? this : this.each(function (t) {
      v.offset.setOffset(this, e, t);
    });
    var n,r,i,s,o,u,a,f = {
      top: 0,
      left: 0 },

    l = this[0],
    c = l && l.ownerDocument;
    if (!c) return;
    return (r = c.body) === l ? v.offset.bodyOffset(l) : (n = c.documentElement, v.contains(n, l) ? (typeof l.getBoundingClientRect !=
    "undefined" && (f = l.getBoundingClientRect()), i = tr(c), s = n.clientTop || r.clientTop || 0, o = n.clientLeft ||
    r.clientLeft || 0, u = i.pageYOffset || n.scrollTop, a = i.pageXOffset || n.scrollLeft, {
      top: f.top + u - s,
      left: f.left + a - o }) :
    f);
  }, v.offset = {
    bodyOffset: function bodyOffset(e) {
      var t = e.offsetTop,
      n = e.offsetLeft;
      return v.support.doesNotIncludeMarginInBodyOffset && (t += parseFloat(v.css(e, "marginTop")) || 0, n +=
      parseFloat(v.css(e, "marginLeft")) || 0), {
        top: t,
        left: n };

    },
    setOffset: function setOffset(e, t, n) {
      var r = v.css(e, "position");
      r === "static" && (e.style.position = "relative");
      var i = v(e),
      s = i.offset(),
      o = v.css(e, "top"),
      u = v.css(e, "left"),
      a = (r === "absolute" || r === "fixed") && v.inArray("auto", [o, u]) > -1,
      f = {},
      l = {},
      c,h;
      a ? (l = i.position(), c = l.top, h = l.left) : (c = parseFloat(o) || 0, h = parseFloat(u) || 0), v.isFunction(t) && (
      t = t.call(e, n, s)), t.top != null && (f.top = t.top - s.top + c), t.left != null && (f.left = t.left - s.left +
      h), "using" in t ? t.using.call(e, f) : i.css(f);
    } },
  v.fn.extend({
    position: function position() {
      if (!this[0]) return;
      var e = this[0],
      t = this.offsetParent(),
      n = this.offset(),
      r = er.test(t[0].nodeName) ? {
        top: 0,
        left: 0 } :
      t.offset();
      return n.top -= parseFloat(v.css(e, "marginTop")) || 0, n.left -= parseFloat(v.css(e, "marginLeft")) || 0, r.top +=
      parseFloat(v.css(t[0], "borderTopWidth")) || 0, r.left += parseFloat(v.css(t[0], "borderLeftWidth")) || 0, {
        top: n.top - r.top,
        left: n.left - r.left };

    },
    offsetParent: function offsetParent() {
      return this.map(function () {
        var e = this.offsetParent || i.body;
        while (e && !er.test(e.nodeName) && v.css(e, "position") === "static") {e = e.offsetParent;}
        return e || i.body;
      });
    } }),
  v.each({
    scrollLeft: "pageXOffset",
    scrollTop: "pageYOffset" },
  function (e, n) {
    var r = /Y/.test(n);
    v.fn[e] = function (i) {
      return v.access(this, function (e, i, s) {
        var o = tr(e);
        if (s === t) return o ? n in o ? o[n] : o.document.documentElement[i] : e[i];
        o ? o.scrollTo(r ? v(o).scrollLeft() : s, r ? s : v(o).scrollTop()) : e[i] = s;
      }, e, i, arguments.length, null);
    };
  }), v.each({
    Height: "height",
    Width: "width" },
  function (e, n) {
    v.each({
      padding: "inner" + e,
      content: n,
      "": "outer" + e },
    function (r, i) {
      v.fn[i] = function (i, s) {
        var o = arguments.length && (r || typeof i != "boolean"),
        u = r || (i === !0 || s === !0 ? "margin" : "border");
        return v.access(this, function (n, r, i) {
          var s;
          return v.isWindow(n) ? n.document.documentElement["client" + e] : n.nodeType === 9 ? (s = n.documentElement,
          Math.max(n.body["scroll" + e], s["scroll" + e], n.body["offset" + e], s["offset" + e], s["client" + e])) :
          i === t ? v.css(n, r, i, u) : v.style(n, r, i, u);
        }, n, o ? i : t, o, null);
      };
    });
  }), e.jQuery = e.$ = v,  true && __webpack_require__(/*! !webpack amd options */ 26).jQuery && !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
    return v;
  }).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
})(window);

/***/ }),

/***/ 26:
/*!****************************************!*\
  !*** (webpack)/buildin/amd-options.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* WEBPACK VAR INJECTION */(function(__webpack_amd_options__) {/* globals __webpack_amd_options__ */
module.exports = __webpack_amd_options__;

/* WEBPACK VAR INJECTION */}.call(this, {}))

/***/ }),

/***/ 3:
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ 4:
/*!********************************************************!*\
  !*** C:/Users/pc4/Desktop/工作/玺玥月子餐设计/玺玥月子餐/pages.json ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ })

}]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/vendor.js.map