/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); //  todo: 多图层时,上下图层关系在绘制完毕后才应用,upper 处在最高层,透明度没有应用在 upper 层上
	// import Vue from 'vue';
	
	
	__webpack_require__(1);
	
	__webpack_require__(300);
	
	__webpack_require__(304);
	
	__webpack_require__(305);
	
	__webpack_require__(306);
	
	__webpack_require__(307);
	
	__webpack_require__(308);
	
	__webpack_require__(309);
	
	__webpack_require__(310);
	
	__webpack_require__(311);
	
	__webpack_require__(312);
	
	__webpack_require__(314);
	
	__webpack_require__(315);
	
	__webpack_require__(316);
	
	__webpack_require__(317);
	
	__webpack_require__(318);
	
	__webpack_require__(319);
	
	__webpack_require__(320);
	
	__webpack_require__(321);
	
	var _painter = __webpack_require__(322);
	
	var _painter2 = _interopRequireDefault(_painter);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Painter = function () {
	  function Painter(el) {
	    _classCallCheck(this, Painter);
	
	    /**
	     * State Manager
	     * @type {{
	     *          painter: Painter,
	     *          state: {currentObject: null, currentObjectType: null},
	     *          updateObject: (function())
	     *       }}
	     */
	    this.store = {
	      painter: this,
	      state: {
	        currentObject: null,
	        currentGroup: null,
	        currentObjectType: null,
	        needRefreshThumbnails: false,
	        costumeTitle: '',
	        rotationCenter: {
	          x: null,
	          y: null
	        }
	      },
	      updateObject: function updateObject() {
	        var canvas = this.painter.vm.canvas;
	        if (canvas) {
	          //  currentObject & currentObjectType
	          this.state.currentObject = canvas.getActiveObject();
	          if (this.state.currentObject) {
	            if (this.state.currentObject.text !== undefined) {
	              this.state.currentObjectType = 'text';
	            } else if (this.state.currentObject.stroke) {
	              this.state.currentObjectType = 'line';
	            } else {
	              this.state.currentObjectType = null;
	            }
	          }
	          //  currentGroup
	          this.state.currentGroup = canvas.getActiveGroup();
	        }
	      },
	      refreshThumbnails: function refreshThumbnails() {
	        this.state.needRefreshThumbnails = true;
	      },
	      setCostumeName: function setCostumeName(val) {
	        this.state.costumeTitle = val;
	      }
	    };
	
	    this.vm = new Vue({
	      el: '#painter-wrapper',
	      components: { painter: _painter2.default },
	      data: {
	        canvas: null,
	        layerManager: null,
	        painter: this,
	        isShowPainter: false
	      },
	      computed: {
	        painterVisibility: function painterVisibility() {
	          return this.isShowPainter ? '' : 'hidden';
	        },
	        zIndex: function zIndex() {
	          return this.isShowPainter ? '100' : '';
	        }
	      },
	      methods: {
	        setCanvasSize: function setCanvasSize(width, height) {
	          this.canvas.setWidth(width);
	          this.canvas.setHeight(height);
	          this.canvas.layerManager.setBackgroundImageURL();
	        }
	      },
	      events: {
	        'painter-save': function painterSave() {
	          this.painter.save();
	        },
	        'painter-cancel': function painterCancel() {
	          this.painter.close();
	        }
	      }
	    });
	
	    /**
	     * Init DOM Element
	     * @type {Element}
	     */
	    this.painterEl = document.querySelector('#' + el);
	    this.canvasWrapperEl = this.painterEl.querySelector('.painter-canvas-wrapper');
	    this.canvasEl = this.canvasWrapperEl.querySelector('.painter-canvas');
	    this.initColorPicker();
	    this.initFabricCanvas();
	    this.initListener();
	  }
	
	  /**
	   * Init canvas
	   */
	
	
	  _createClass(Painter, [{
	    key: 'initFabricCanvas',
	    value: function initFabricCanvas() {
	      this.vm.canvas = new fabric.Canvas(this.canvasEl);
	      this.vm.setCanvasSize(this.canvasWrapperEl.clientWidth, this.canvasWrapperEl.clientHeight);
	
	      this.vm.canvas.setFreeDrawingBrush('pencil', {
	        width: 5,
	        color: '#333',
	        opacity: 1
	      });
	      this.vm.canvas.setDrawingMode(true);
	    }
	
	    /**
	     * Init Color Picker
	     */
	
	  }, {
	    key: 'initColorPicker',
	    value: function initColorPicker() {
	      this.colorPicker = jsColorPicker('input.color', {
	        customBG: '#333333',
	        // readOnly: true,
	        init: function init(ele) {
	          // colors is a different instance (not connected to colorPicker)
	          Object.assign(ele, {
	            type: ''
	          });
	          // elm.style.backgroundColor = elm.value;
	          // elm.style.color = colors.rgbaMixCustom.luminance > 0.22 ? '#222' : '#ddd';
	        }
	      });
	    }
	  }, {
	    key: 'initListener',
	    value: function initListener() {
	      var _this = this;
	
	      //  Global Events
	      //  Listener of Resize
	      this.onPainterResize = function () {
	        _this.vm.setCanvasSize(_this.canvasWrapperEl.clientWidth, _this.canvasWrapperEl.clientHeight);
	      };
	      window.addEventListener('resize', this.onPainterResize.bind(this));
	      //
	      //  Fabric Events
	      //  Object selected events
	      this.onObjectSelected = function () {
	        _this.store.updateObject();
	      };
	      this.vm.canvas.on('object:selected', this.onObjectSelected.bind(this));
	      //
	      //  Object removed events
	      this.onObjectRemoved = function () {
	        _this.store.updateObject();
	      };
	      this.vm.canvas.on('object:removed', this.onObjectRemoved.bind(this));
	      //
	      //  Mouse up events
	      this.onMouseUpFabric = function () {
	        _this.store.refreshThumbnails();
	      };
	      this.vm.canvas.on('mouse:up', this.onMouseUpFabric.bind(this));
	      //
	      //  Slection cleared events
	      this.vm.canvas.on('selection:cleared', this.store.updateObject.bind(this.store));
	    }
	  }, {
	    key: 'openIn',
	    value: function openIn(img, name, options) {
	      this.vm.isShowPainter = true;
	      this.vm.zIndex = '100';
	      var x = this.vm.canvas.width / 2;
	      var y = this.vm.canvas.height / 2;
	      var width = 0;
	      var height = 0;
	      if (options) {
	        width = options.width;
	        height = options.height;
	        this.vm.canvas.rotationPoint = {
	          x: width > this.vm.canvas.width ? x : options.rotationCenter.x + (this.vm.canvas.width - width) / 2,
	          y: height > this.vm.canvas.height ? y : options.rotationCenter.y + (this.vm.canvas.height - height) / 2
	        };
	        this.vm.canvas.callback = options.callback;
	      }
	      this.vm.canvas.clear();
	
	      this.store.state.costumeTitle = name;
	
	      this.vm.canvas.setHeight(this.canvasWrapperEl.clientHeight);
	      this.vm.canvas.setWidth(this.canvasWrapperEl.clientWidth);
	      if (img) {
	        this.addImage(img, (this.vm.canvas.width - width) / 2, (this.vm.canvas.height - height) / 2);
	      }
	
	      this.store.refreshThumbnails();
	      this.vm.canvas.layerManager.setBackgroundImageURL('');
	      this.vm.canvas.layerManager.setBackgroundColor('transparent');
	      this.vm.canvas.renderAll();
	
	      // this.vm.canvas.setFreeDrawingBrush('pencil', {
	      //   width: 5,
	      //   color: '#333',
	      //   opacity: 1,
	      // });
	      //  this.vm.canvas.setDrawingMode(true);
	    }
	  }, {
	    key: 'save',
	    value: function save() {
	      var param = {};
	      this.vm.canvas.setDrawingMode(false);
	      this.vm.canvas.layerManager.combineAllLayers();
	      var activeObj = this.vm.canvas.getActiveObject();
	      var activeGroup = this.vm.canvas.getActiveGroup();
	      if (activeGroup) {
	        var objectsInGroup = activeGroup.getObjects();
	        this.vm.canvas.discardActiveGroup();
	        objectsInGroup.forEach(function (obj) {
	          Object.assign(obj, { active: false });
	        });
	      }
	      if (activeObj) {
	        activeObj.active = false;
	      }
	      this.vm.canvas.renderAll();
	      this.vm.canvas.setZoom(1);
	
	      var data = document.createElement('canvas');
	      data.width = this.vm.canvas.lowerCanvasEl.width;
	      data.height = this.vm.canvas.lowerCanvasEl.height;
	      data.getContext('2d').imageSmoothingEnabled = false;
	      data.getContext('2d').drawImage(this.vm.canvas.lowerCanvasEl, 0, 0);
	      param.img = data;
	      param.src = data.toDataURL();
	      param.rc = this.vm.canvas.rotationPoint;
	      param.name = this.store.state.costumeTitle;
	
	      if (this.vm.canvas.callback) {
	        this.vm.canvas.callback(param);
	      }
	
	      this.close();
	    }
	  }, {
	    key: 'close',
	    value: function close() {
	      this.vm.isShowPainter = false;
	      this.vm.zIndex = '';
	      this.vm.canvas.clear();
	      this.vm.canvas.layerManager.setBackgroundImageURL('');
	      this.vm.canvas.layerManager.setBackgroundColor('transparent');
	      // this.vm.canvas.renderAll();
	    }
	  }, {
	    key: 'addImage',
	    value: function addImage(path, x, y) {
	      var _this2 = this;
	
	      fabric.Image.fromURL(path, function (image) {
	        image.set({
	          left: x || 0,
	          top: y || 0,
	          angle: 0
	        }).scale(1).setCoords();
	        _this2.vm.canvas.add(image);
	        _this2.vm.canvas.setHeight(_this2.canvasWrapperEl.clientHeight);
	        _this2.vm.canvas.setWidth(_this2.canvasWrapperEl.clientWidth);
	        _this2.vm.canvas.renderAll();
	      });
	    }
	  }]);
	
	  return Painter;
	}();
	
	window.painterObject = new Painter('painter-wrapper');

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {/*istanbul ignore next*/"use strict";
	
	/*istanbul ignore next*/
	__webpack_require__(2);
	
	/*istanbul ignore next*/__webpack_require__(294);
	
	/*istanbul ignore next*/__webpack_require__(297);
	
	/* eslint max-len: 0 */
	
	if (global._babelPolyfill) {
	  throw new Error("only one instance of babel-polyfill is allowed");
	}
	global._babelPolyfill = true;
	
	// Should be removed in the next major release:
	
	var DEFINE_PROPERTY = "defineProperty";
	function define(O, key, value) {
	  O[key] || Object[DEFINE_PROPERTY](O, key, {
	    writable: true,
	    configurable: true,
	    value: value
	  });
	}
	
	define(String.prototype, "padLeft", "".padStart);
	define(String.prototype, "padRight", "".padEnd);
	
	"pop,reverse,shift,keys,values,entries,indexOf,every,some,forEach,map,filter,find,findIndex,includes,join,slice,concat,push,splice,unshift,sort,lastIndexOf,reduce,reduceRight,copyWithin,fill".split(",").forEach(function (key) {
	  [][key] && define(Array, key, Function.call.bind([][key]));
	});
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(3);
	__webpack_require__(52);
	__webpack_require__(53);
	__webpack_require__(54);
	__webpack_require__(55);
	__webpack_require__(57);
	__webpack_require__(60);
	__webpack_require__(61);
	__webpack_require__(62);
	__webpack_require__(63);
	__webpack_require__(64);
	__webpack_require__(65);
	__webpack_require__(66);
	__webpack_require__(67);
	__webpack_require__(68);
	__webpack_require__(70);
	__webpack_require__(72);
	__webpack_require__(74);
	__webpack_require__(76);
	__webpack_require__(79);
	__webpack_require__(80);
	__webpack_require__(81);
	__webpack_require__(85);
	__webpack_require__(87);
	__webpack_require__(89);
	__webpack_require__(93);
	__webpack_require__(94);
	__webpack_require__(95);
	__webpack_require__(96);
	__webpack_require__(98);
	__webpack_require__(99);
	__webpack_require__(100);
	__webpack_require__(101);
	__webpack_require__(102);
	__webpack_require__(103);
	__webpack_require__(104);
	__webpack_require__(106);
	__webpack_require__(107);
	__webpack_require__(108);
	__webpack_require__(110);
	__webpack_require__(111);
	__webpack_require__(112);
	__webpack_require__(114);
	__webpack_require__(115);
	__webpack_require__(116);
	__webpack_require__(117);
	__webpack_require__(118);
	__webpack_require__(119);
	__webpack_require__(120);
	__webpack_require__(121);
	__webpack_require__(122);
	__webpack_require__(123);
	__webpack_require__(124);
	__webpack_require__(125);
	__webpack_require__(126);
	__webpack_require__(127);
	__webpack_require__(132);
	__webpack_require__(133);
	__webpack_require__(137);
	__webpack_require__(138);
	__webpack_require__(139);
	__webpack_require__(140);
	__webpack_require__(142);
	__webpack_require__(143);
	__webpack_require__(144);
	__webpack_require__(145);
	__webpack_require__(146);
	__webpack_require__(147);
	__webpack_require__(148);
	__webpack_require__(149);
	__webpack_require__(150);
	__webpack_require__(151);
	__webpack_require__(152);
	__webpack_require__(153);
	__webpack_require__(154);
	__webpack_require__(155);
	__webpack_require__(156);
	__webpack_require__(157);
	__webpack_require__(158);
	__webpack_require__(160);
	__webpack_require__(161);
	__webpack_require__(167);
	__webpack_require__(168);
	__webpack_require__(170);
	__webpack_require__(171);
	__webpack_require__(172);
	__webpack_require__(176);
	__webpack_require__(177);
	__webpack_require__(178);
	__webpack_require__(179);
	__webpack_require__(180);
	__webpack_require__(182);
	__webpack_require__(183);
	__webpack_require__(184);
	__webpack_require__(185);
	__webpack_require__(188);
	__webpack_require__(190);
	__webpack_require__(191);
	__webpack_require__(192);
	__webpack_require__(194);
	__webpack_require__(196);
	__webpack_require__(198);
	__webpack_require__(199);
	__webpack_require__(200);
	__webpack_require__(202);
	__webpack_require__(203);
	__webpack_require__(204);
	__webpack_require__(205);
	__webpack_require__(211);
	__webpack_require__(214);
	__webpack_require__(215);
	__webpack_require__(217);
	__webpack_require__(218);
	__webpack_require__(221);
	__webpack_require__(222);
	__webpack_require__(225);
	__webpack_require__(226);
	__webpack_require__(227);
	__webpack_require__(228);
	__webpack_require__(229);
	__webpack_require__(230);
	__webpack_require__(231);
	__webpack_require__(232);
	__webpack_require__(233);
	__webpack_require__(234);
	__webpack_require__(235);
	__webpack_require__(236);
	__webpack_require__(237);
	__webpack_require__(238);
	__webpack_require__(239);
	__webpack_require__(240);
	__webpack_require__(241);
	__webpack_require__(242);
	__webpack_require__(243);
	__webpack_require__(245);
	__webpack_require__(246);
	__webpack_require__(247);
	__webpack_require__(248);
	__webpack_require__(249);
	__webpack_require__(250);
	__webpack_require__(252);
	__webpack_require__(253);
	__webpack_require__(254);
	__webpack_require__(255);
	__webpack_require__(256);
	__webpack_require__(257);
	__webpack_require__(258);
	__webpack_require__(259);
	__webpack_require__(261);
	__webpack_require__(262);
	__webpack_require__(264);
	__webpack_require__(265);
	__webpack_require__(266);
	__webpack_require__(267);
	__webpack_require__(270);
	__webpack_require__(271);
	__webpack_require__(272);
	__webpack_require__(273);
	__webpack_require__(274);
	__webpack_require__(275);
	__webpack_require__(276);
	__webpack_require__(277);
	__webpack_require__(279);
	__webpack_require__(280);
	__webpack_require__(281);
	__webpack_require__(282);
	__webpack_require__(283);
	__webpack_require__(284);
	__webpack_require__(285);
	__webpack_require__(286);
	__webpack_require__(287);
	__webpack_require__(288);
	__webpack_require__(289);
	__webpack_require__(292);
	__webpack_require__(293);
	module.exports = __webpack_require__(9);

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// ECMAScript 6 symbols shim
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	var global = __webpack_require__(4),
	    has = __webpack_require__(5),
	    DESCRIPTORS = __webpack_require__(6),
	    $export = __webpack_require__(8),
	    redefine = __webpack_require__(18),
	    META = __webpack_require__(22).KEY,
	    $fails = __webpack_require__(7),
	    shared = __webpack_require__(23),
	    setToStringTag = __webpack_require__(24),
	    uid = __webpack_require__(19),
	    wks = __webpack_require__(25),
	    wksExt = __webpack_require__(26),
	    wksDefine = __webpack_require__(27),
	    keyOf = __webpack_require__(29),
	    enumKeys = __webpack_require__(42),
	    isArray = __webpack_require__(45),
	    anObject = __webpack_require__(12),
	    toIObject = __webpack_require__(32),
	    toPrimitive = __webpack_require__(16),
	    createDesc = __webpack_require__(17),
	    _create = __webpack_require__(46),
	    gOPNExt = __webpack_require__(49),
	    $GOPD = __webpack_require__(51),
	    $DP = __webpack_require__(11),
	    $keys = __webpack_require__(30),
	    gOPD = $GOPD.f,
	    dP = $DP.f,
	    gOPN = gOPNExt.f,
	    $Symbol = global.Symbol,
	    $JSON = global.JSON,
	    _stringify = $JSON && $JSON.stringify,
	    PROTOTYPE = 'prototype',
	    HIDDEN = wks('_hidden'),
	    TO_PRIMITIVE = wks('toPrimitive'),
	    isEnum = {}.propertyIsEnumerable,
	    SymbolRegistry = shared('symbol-registry'),
	    AllSymbols = shared('symbols'),
	    OPSymbols = shared('op-symbols'),
	    ObjectProto = Object[PROTOTYPE],
	    USE_NATIVE = typeof $Symbol == 'function',
	    QObject = global.QObject;
	// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
	var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;
	
	// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
	var setSymbolDesc = DESCRIPTORS && $fails(function () {
	  return _create(dP({}, 'a', {
	    get: function get() {
	      return dP(this, 'a', { value: 7 }).a;
	    }
	  })).a != 7;
	}) ? function (it, key, D) {
	  var protoDesc = gOPD(ObjectProto, key);
	  if (protoDesc) delete ObjectProto[key];
	  dP(it, key, D);
	  if (protoDesc && it !== ObjectProto) dP(ObjectProto, key, protoDesc);
	} : dP;
	
	var wrap = function wrap(tag) {
	  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
	  sym._k = tag;
	  return sym;
	};
	
	var isSymbol = USE_NATIVE && _typeof($Symbol.iterator) == 'symbol' ? function (it) {
	  return (typeof it === 'undefined' ? 'undefined' : _typeof(it)) == 'symbol';
	} : function (it) {
	  return it instanceof $Symbol;
	};
	
	var $defineProperty = function defineProperty(it, key, D) {
	  if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
	  anObject(it);
	  key = toPrimitive(key, true);
	  anObject(D);
	  if (has(AllSymbols, key)) {
	    if (!D.enumerable) {
	      if (!has(it, HIDDEN)) dP(it, HIDDEN, createDesc(1, {}));
	      it[HIDDEN][key] = true;
	    } else {
	      if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
	      D = _create(D, { enumerable: createDesc(0, false) });
	    }return setSymbolDesc(it, key, D);
	  }return dP(it, key, D);
	};
	var $defineProperties = function defineProperties(it, P) {
	  anObject(it);
	  var keys = enumKeys(P = toIObject(P)),
	      i = 0,
	      l = keys.length,
	      key;
	  while (l > i) {
	    $defineProperty(it, key = keys[i++], P[key]);
	  }return it;
	};
	var $create = function create(it, P) {
	  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
	};
	var $propertyIsEnumerable = function propertyIsEnumerable(key) {
	  var E = isEnum.call(this, key = toPrimitive(key, true));
	  if (this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return false;
	  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
	};
	var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
	  it = toIObject(it);
	  key = toPrimitive(key, true);
	  if (it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return;
	  var D = gOPD(it, key);
	  if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
	  return D;
	};
	var $getOwnPropertyNames = function getOwnPropertyNames(it) {
	  var names = gOPN(toIObject(it)),
	      result = [],
	      i = 0,
	      key;
	  while (names.length > i) {
	    if (!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
	  }return result;
	};
	var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
	  var IS_OP = it === ObjectProto,
	      names = gOPN(IS_OP ? OPSymbols : toIObject(it)),
	      result = [],
	      i = 0,
	      key;
	  while (names.length > i) {
	    if (has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
	  }return result;
	};
	
	// 19.4.1.1 Symbol([description])
	if (!USE_NATIVE) {
	  $Symbol = function _Symbol() {
	    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
	    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
	    var $set = function $set(value) {
	      if (this === ObjectProto) $set.call(OPSymbols, value);
	      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
	      setSymbolDesc(this, tag, createDesc(1, value));
	    };
	    if (DESCRIPTORS && setter) setSymbolDesc(ObjectProto, tag, { configurable: true, set: $set });
	    return wrap(tag);
	  };
	  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
	    return this._k;
	  });
	
	  $GOPD.f = $getOwnPropertyDescriptor;
	  $DP.f = $defineProperty;
	  __webpack_require__(50).f = gOPNExt.f = $getOwnPropertyNames;
	  __webpack_require__(44).f = $propertyIsEnumerable;
	  __webpack_require__(43).f = $getOwnPropertySymbols;
	
	  if (DESCRIPTORS && !__webpack_require__(28)) {
	    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
	  }
	
	  wksExt.f = function (name) {
	    return wrap(wks(name));
	  };
	}
	
	$export($export.G + $export.W + $export.F * !USE_NATIVE, { Symbol: $Symbol });
	
	for (var symbols =
	// 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
	'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'.split(','), i = 0; symbols.length > i;) {
	  wks(symbols[i++]);
	}for (var symbols = $keys(wks.store), i = 0; symbols.length > i;) {
	  wksDefine(symbols[i++]);
	}$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
	  // 19.4.2.1 Symbol.for(key)
	  'for': function _for(key) {
	    return has(SymbolRegistry, key += '') ? SymbolRegistry[key] : SymbolRegistry[key] = $Symbol(key);
	  },
	  // 19.4.2.5 Symbol.keyFor(sym)
	  keyFor: function keyFor(key) {
	    if (isSymbol(key)) return keyOf(SymbolRegistry, key);
	    throw TypeError(key + ' is not a symbol!');
	  },
	  useSetter: function useSetter() {
	    setter = true;
	  },
	  useSimple: function useSimple() {
	    setter = false;
	  }
	});
	
	$export($export.S + $export.F * !USE_NATIVE, 'Object', {
	  // 19.1.2.2 Object.create(O [, Properties])
	  create: $create,
	  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
	  defineProperty: $defineProperty,
	  // 19.1.2.3 Object.defineProperties(O, Properties)
	  defineProperties: $defineProperties,
	  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
	  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
	  // 19.1.2.7 Object.getOwnPropertyNames(O)
	  getOwnPropertyNames: $getOwnPropertyNames,
	  // 19.1.2.8 Object.getOwnPropertySymbols(O)
	  getOwnPropertySymbols: $getOwnPropertySymbols
	});
	
	// 24.3.2 JSON.stringify(value [, replacer [, space]])
	$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function () {
	  var S = $Symbol();
	  // MS Edge converts symbol values to JSON as {}
	  // WebKit converts symbol values to JSON as null
	  // V8 throws on boxed symbols
	  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
	})), 'JSON', {
	  stringify: function stringify(it) {
	    if (it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
	    var args = [it],
	        i = 1,
	        replacer,
	        $replacer;
	    while (arguments.length > i) {
	      args.push(arguments[i++]);
	    }replacer = args[1];
	    if (typeof replacer == 'function') $replacer = replacer;
	    if ($replacer || !isArray(replacer)) replacer = function replacer(key, value) {
	      if ($replacer) value = $replacer.call(this, key, value);
	      if (!isSymbol(value)) return value;
	    };
	    args[1] = replacer;
	    return _stringify.apply($JSON, args);
	  }
	});
	
	// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
	$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(10)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
	// 19.4.3.5 Symbol.prototype[@@toStringTag]
	setToStringTag($Symbol, 'Symbol');
	// 20.2.1.9 Math[@@toStringTag]
	setToStringTag(Math, 'Math', true);
	// 24.3.3 JSON[@@toStringTag]
	setToStringTag(global.JSON, 'JSON', true);

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';
	
	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef

/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";
	
	var hasOwnProperty = {}.hasOwnProperty;
	module.exports = function (it, key) {
	  return hasOwnProperty.call(it, key);
	};

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	// Thank's IE8 for his funny defineProperty
	module.exports = !__webpack_require__(7)(function () {
	  return Object.defineProperty({}, 'a', { get: function get() {
	      return 7;
	    } }).a != 7;
	});

/***/ },
/* 7 */
/***/ function(module, exports) {

	"use strict";
	
	module.exports = function (exec) {
	  try {
	    return !!exec();
	  } catch (e) {
	    return true;
	  }
	};

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var global = __webpack_require__(4),
	    core = __webpack_require__(9),
	    hide = __webpack_require__(10),
	    redefine = __webpack_require__(18),
	    ctx = __webpack_require__(20),
	    PROTOTYPE = 'prototype';
	
	var $export = function $export(type, name, source) {
	  var IS_FORCED = type & $export.F,
	      IS_GLOBAL = type & $export.G,
	      IS_STATIC = type & $export.S,
	      IS_PROTO = type & $export.P,
	      IS_BIND = type & $export.B,
	      target = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE],
	      exports = IS_GLOBAL ? core : core[name] || (core[name] = {}),
	      expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {}),
	      key,
	      own,
	      out,
	      exp;
	  if (IS_GLOBAL) source = name;
	  for (key in source) {
	    // contains in native
	    own = !IS_FORCED && target && target[key] !== undefined;
	    // export native or passed
	    out = (own ? target : source)[key];
	    // bind timers to global for call from export context
	    exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
	    // extend global
	    if (target) redefine(target, key, out, type & $export.U);
	    // export
	    if (exports[key] != out) hide(exports, key, exp);
	    if (IS_PROTO && expProto[key] != out) expProto[key] = out;
	  }
	};
	global.core = core;
	// type bitmap
	$export.F = 1; // forced
	$export.G = 2; // global
	$export.S = 4; // static
	$export.P = 8; // proto
	$export.B = 16; // bind
	$export.W = 32; // wrap
	$export.U = 64; // safe
	$export.R = 128; // real proto method for `library`
	module.exports = $export;

/***/ },
/* 9 */
/***/ function(module, exports) {

	'use strict';
	
	var core = module.exports = { version: '2.4.0' };
	if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var dP = __webpack_require__(11),
	    createDesc = __webpack_require__(17);
	module.exports = __webpack_require__(6) ? function (object, key, value) {
	  return dP.f(object, key, createDesc(1, value));
	} : function (object, key, value) {
	  object[key] = value;
	  return object;
	};

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var anObject = __webpack_require__(12),
	    IE8_DOM_DEFINE = __webpack_require__(14),
	    toPrimitive = __webpack_require__(16),
	    dP = Object.defineProperty;
	
	exports.f = __webpack_require__(6) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
	  anObject(O);
	  P = toPrimitive(P, true);
	  anObject(Attributes);
	  if (IE8_DOM_DEFINE) try {
	    return dP(O, P, Attributes);
	  } catch (e) {/* empty */}
	  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
	  if ('value' in Attributes) O[P] = Attributes.value;
	  return O;
	};

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var isObject = __webpack_require__(13);
	module.exports = function (it) {
	  if (!isObject(it)) throw TypeError(it + ' is not an object!');
	  return it;
	};

/***/ },
/* 13 */
/***/ function(module, exports) {

	'use strict';
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	module.exports = function (it) {
	  return (typeof it === 'undefined' ? 'undefined' : _typeof(it)) === 'object' ? it !== null : typeof it === 'function';
	};

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	module.exports = !__webpack_require__(6) && !__webpack_require__(7)(function () {
	  return Object.defineProperty(__webpack_require__(15)('div'), 'a', { get: function get() {
	      return 7;
	    } }).a != 7;
	});

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var isObject = __webpack_require__(13),
	    document = __webpack_require__(4).document
	// in old IE typeof document.createElement is 'object'
	,
	    is = isObject(document) && isObject(document.createElement);
	module.exports = function (it) {
	  return is ? document.createElement(it) : {};
	};

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	// 7.1.1 ToPrimitive(input [, PreferredType])
	var isObject = __webpack_require__(13);
	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	module.exports = function (it, S) {
	  if (!isObject(it)) return it;
	  var fn, val;
	  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
	  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
	  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
	  throw TypeError("Can't convert object to primitive value");
	};

/***/ },
/* 17 */
/***/ function(module, exports) {

	"use strict";
	
	module.exports = function (bitmap, value) {
	  return {
	    enumerable: !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable: !(bitmap & 4),
	    value: value
	  };
	};

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var global = __webpack_require__(4),
	    hide = __webpack_require__(10),
	    has = __webpack_require__(5),
	    SRC = __webpack_require__(19)('src'),
	    TO_STRING = 'toString',
	    $toString = Function[TO_STRING],
	    TPL = ('' + $toString).split(TO_STRING);
	
	__webpack_require__(9).inspectSource = function (it) {
	  return $toString.call(it);
	};
	
	(module.exports = function (O, key, val, safe) {
	  var isFunction = typeof val == 'function';
	  if (isFunction) has(val, 'name') || hide(val, 'name', key);
	  if (O[key] === val) return;
	  if (isFunction) has(val, SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
	  if (O === global) {
	    O[key] = val;
	  } else {
	    if (!safe) {
	      delete O[key];
	      hide(O, key, val);
	    } else {
	      if (O[key]) O[key] = val;else hide(O, key, val);
	    }
	  }
	  // add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
	})(Function.prototype, TO_STRING, function toString() {
	  return typeof this == 'function' && this[SRC] || $toString.call(this);
	});

/***/ },
/* 19 */
/***/ function(module, exports) {

	'use strict';
	
	var id = 0,
	    px = Math.random();
	module.exports = function (key) {
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	// optional / simple context binding
	var aFunction = __webpack_require__(21);
	module.exports = function (fn, that, length) {
	  aFunction(fn);
	  if (that === undefined) return fn;
	  switch (length) {
	    case 1:
	      return function (a) {
	        return fn.call(that, a);
	      };
	    case 2:
	      return function (a, b) {
	        return fn.call(that, a, b);
	      };
	    case 3:
	      return function (a, b, c) {
	        return fn.call(that, a, b, c);
	      };
	  }
	  return function () /* ...args */{
	    return fn.apply(that, arguments);
	  };
	};

/***/ },
/* 21 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = function (it) {
	  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
	  return it;
	};

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	var META = __webpack_require__(19)('meta'),
	    isObject = __webpack_require__(13),
	    has = __webpack_require__(5),
	    setDesc = __webpack_require__(11).f,
	    id = 0;
	var isExtensible = Object.isExtensible || function () {
	  return true;
	};
	var FREEZE = !__webpack_require__(7)(function () {
	  return isExtensible(Object.preventExtensions({}));
	});
	var setMeta = function setMeta(it) {
	  setDesc(it, META, { value: {
	      i: 'O' + ++id, // object ID
	      w: {} // weak collections IDs
	    } });
	};
	var fastKey = function fastKey(it, create) {
	  // return primitive with prefix
	  if (!isObject(it)) return (typeof it === 'undefined' ? 'undefined' : _typeof(it)) == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
	  if (!has(it, META)) {
	    // can't set metadata to uncaught frozen object
	    if (!isExtensible(it)) return 'F';
	    // not necessary to add metadata
	    if (!create) return 'E';
	    // add missing metadata
	    setMeta(it);
	    // return object ID
	  }return it[META].i;
	};
	var getWeak = function getWeak(it, create) {
	  if (!has(it, META)) {
	    // can't set metadata to uncaught frozen object
	    if (!isExtensible(it)) return true;
	    // not necessary to add metadata
	    if (!create) return false;
	    // add missing metadata
	    setMeta(it);
	    // return hash weak collections IDs
	  }return it[META].w;
	};
	// add metadata on freeze-family methods calling
	var onFreeze = function onFreeze(it) {
	  if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
	  return it;
	};
	var meta = module.exports = {
	  KEY: META,
	  NEED: false,
	  fastKey: fastKey,
	  getWeak: getWeak,
	  onFreeze: onFreeze
	};

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var global = __webpack_require__(4),
	    SHARED = '__core-js_shared__',
	    store = global[SHARED] || (global[SHARED] = {});
	module.exports = function (key) {
	  return store[key] || (store[key] = {});
	};

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var def = __webpack_require__(11).f,
	    has = __webpack_require__(5),
	    TAG = __webpack_require__(25)('toStringTag');
	
	module.exports = function (it, tag, stat) {
	  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
	};

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var store = __webpack_require__(23)('wks'),
	    uid = __webpack_require__(19),
	    _Symbol = __webpack_require__(4).Symbol,
	    USE_SYMBOL = typeof _Symbol == 'function';
	
	var $exports = module.exports = function (name) {
	  return store[name] || (store[name] = USE_SYMBOL && _Symbol[name] || (USE_SYMBOL ? _Symbol : uid)('Symbol.' + name));
	};
	
	$exports.store = store;

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.f = __webpack_require__(25);

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var global = __webpack_require__(4),
	    core = __webpack_require__(9),
	    LIBRARY = __webpack_require__(28),
	    wksExt = __webpack_require__(26),
	    defineProperty = __webpack_require__(11).f;
	module.exports = function (name) {
	  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
	  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
	};

/***/ },
/* 28 */
/***/ function(module, exports) {

	"use strict";
	
	module.exports = false;

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var getKeys = __webpack_require__(30),
	    toIObject = __webpack_require__(32);
	module.exports = function (object, el) {
	  var O = toIObject(object),
	      keys = getKeys(O),
	      length = keys.length,
	      index = 0,
	      key;
	  while (length > index) {
	    if (O[key = keys[index++]] === el) return key;
	  }
	};

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	// 19.1.2.14 / 15.2.3.14 Object.keys(O)
	var $keys = __webpack_require__(31),
	    enumBugKeys = __webpack_require__(41);
	
	module.exports = Object.keys || function keys(O) {
	  return $keys(O, enumBugKeys);
	};

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var has = __webpack_require__(5),
	    toIObject = __webpack_require__(32),
	    arrayIndexOf = __webpack_require__(36)(false),
	    IE_PROTO = __webpack_require__(40)('IE_PROTO');
	
	module.exports = function (object, names) {
	  var O = toIObject(object),
	      i = 0,
	      result = [],
	      key;
	  for (key in O) {
	    if (key != IE_PROTO) has(O, key) && result.push(key);
	  } // Don't enum bug & hidden keys
	  while (names.length > i) {
	    if (has(O, key = names[i++])) {
	      ~arrayIndexOf(result, key) || result.push(key);
	    }
	  }return result;
	};

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	// to indexed object, toObject with fallback for non-array-like ES3 strings
	var IObject = __webpack_require__(33),
	    defined = __webpack_require__(35);
	module.exports = function (it) {
	  return IObject(defined(it));
	};

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var cof = __webpack_require__(34);
	module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};

/***/ },
/* 34 */
/***/ function(module, exports) {

	"use strict";
	
	var toString = {}.toString;
	
	module.exports = function (it) {
	  return toString.call(it).slice(8, -1);
	};

/***/ },
/* 35 */
/***/ function(module, exports) {

	"use strict";
	
	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function (it) {
	  if (it == undefined) throw TypeError("Can't call method on  " + it);
	  return it;
	};

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	// false -> Array#indexOf
	// true  -> Array#includes
	var toIObject = __webpack_require__(32),
	    toLength = __webpack_require__(37),
	    toIndex = __webpack_require__(39);
	module.exports = function (IS_INCLUDES) {
	  return function ($this, el, fromIndex) {
	    var O = toIObject($this),
	        length = toLength(O.length),
	        index = toIndex(fromIndex, length),
	        value;
	    // Array#includes uses SameValueZero equality algorithm
	    if (IS_INCLUDES && el != el) while (length > index) {
	      value = O[index++];
	      if (value != value) return true;
	      // Array#toIndex ignores holes, Array#includes - not
	    } else for (; length > index; index++) {
	        if (IS_INCLUDES || index in O) {
	          if (O[index] === el) return IS_INCLUDES || index || 0;
	        }
	      }return !IS_INCLUDES && -1;
	  };
	};

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	// 7.1.15 ToLength
	var toInteger = __webpack_require__(38),
	    min = Math.min;
	module.exports = function (it) {
	  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

/***/ },
/* 38 */
/***/ function(module, exports) {

	"use strict";
	
	// 7.1.4 ToInteger
	var ceil = Math.ceil,
	    floor = Math.floor;
	module.exports = function (it) {
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var toInteger = __webpack_require__(38),
	    max = Math.max,
	    min = Math.min;
	module.exports = function (index, length) {
	  index = toInteger(index);
	  return index < 0 ? max(index + length, 0) : min(index, length);
	};

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var shared = __webpack_require__(23)('keys'),
	    uid = __webpack_require__(19);
	module.exports = function (key) {
	  return shared[key] || (shared[key] = uid(key));
	};

/***/ },
/* 41 */
/***/ function(module, exports) {

	'use strict';
	
	// IE 8- don't enum bug keys
	module.exports = 'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'.split(',');

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	// all enumerable object keys, includes symbols
	var getKeys = __webpack_require__(30),
	    gOPS = __webpack_require__(43),
	    pIE = __webpack_require__(44);
	module.exports = function (it) {
	  var result = getKeys(it),
	      getSymbols = gOPS.f;
	  if (getSymbols) {
	    var symbols = getSymbols(it),
	        isEnum = pIE.f,
	        i = 0,
	        key;
	    while (symbols.length > i) {
	      if (isEnum.call(it, key = symbols[i++])) result.push(key);
	    }
	  }return result;
	};

/***/ },
/* 43 */
/***/ function(module, exports) {

	"use strict";
	
	exports.f = Object.getOwnPropertySymbols;

/***/ },
/* 44 */
/***/ function(module, exports) {

	"use strict";
	
	exports.f = {}.propertyIsEnumerable;

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	// 7.2.2 IsArray(argument)
	var cof = __webpack_require__(34);
	module.exports = Array.isArray || function isArray(arg) {
	  return cof(arg) == 'Array';
	};

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	var anObject = __webpack_require__(12),
	    dPs = __webpack_require__(47),
	    enumBugKeys = __webpack_require__(41),
	    IE_PROTO = __webpack_require__(40)('IE_PROTO'),
	    Empty = function Empty() {/* empty */},
	    PROTOTYPE = 'prototype';
	
	// Create object with fake `null` prototype: use iframe Object with cleared prototype
	var _createDict = function createDict() {
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = __webpack_require__(15)('iframe'),
	      i = enumBugKeys.length,
	      gt = '>',
	      iframeDocument;
	  iframe.style.display = 'none';
	  __webpack_require__(48).appendChild(iframe);
	  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
	  // createDict = iframe.contentWindow.Object;
	  // html.removeChild(iframe);
	  iframeDocument = iframe.contentWindow.document;
	  iframeDocument.open();
	  iframeDocument.write('<script>document.F=Object</script' + gt);
	  iframeDocument.close();
	  _createDict = iframeDocument.F;
	  while (i--) {
	    delete _createDict[PROTOTYPE][enumBugKeys[i]];
	  }return _createDict();
	};
	
	module.exports = Object.create || function create(O, Properties) {
	  var result;
	  if (O !== null) {
	    Empty[PROTOTYPE] = anObject(O);
	    result = new Empty();
	    Empty[PROTOTYPE] = null;
	    // add "__proto__" for Object.getPrototypeOf polyfill
	    result[IE_PROTO] = O;
	  } else result = _createDict();
	  return Properties === undefined ? result : dPs(result, Properties);
	};

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var dP = __webpack_require__(11),
	    anObject = __webpack_require__(12),
	    getKeys = __webpack_require__(30);
	
	module.exports = __webpack_require__(6) ? Object.defineProperties : function defineProperties(O, Properties) {
	  anObject(O);
	  var keys = getKeys(Properties),
	      length = keys.length,
	      i = 0,
	      P;
	  while (length > i) {
	    dP.f(O, P = keys[i++], Properties[P]);
	  }return O;
	};

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	module.exports = __webpack_require__(4).document && document.documentElement;

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
	var toIObject = __webpack_require__(32),
	    gOPN = __webpack_require__(50).f,
	    toString = {}.toString;
	
	var windowNames = (typeof window === 'undefined' ? 'undefined' : _typeof(window)) == 'object' && window && Object.getOwnPropertyNames ? Object.getOwnPropertyNames(window) : [];
	
	var getWindowNames = function getWindowNames(it) {
	  try {
	    return gOPN(it);
	  } catch (e) {
	    return windowNames.slice();
	  }
	};
	
	module.exports.f = function getOwnPropertyNames(it) {
	  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
	};

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
	var $keys = __webpack_require__(31),
	    hiddenKeys = __webpack_require__(41).concat('length', 'prototype');
	
	exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
	  return $keys(O, hiddenKeys);
	};

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var pIE = __webpack_require__(44),
	    createDesc = __webpack_require__(17),
	    toIObject = __webpack_require__(32),
	    toPrimitive = __webpack_require__(16),
	    has = __webpack_require__(5),
	    IE8_DOM_DEFINE = __webpack_require__(14),
	    gOPD = Object.getOwnPropertyDescriptor;
	
	exports.f = __webpack_require__(6) ? gOPD : function getOwnPropertyDescriptor(O, P) {
	  O = toIObject(O);
	  P = toPrimitive(P, true);
	  if (IE8_DOM_DEFINE) try {
	    return gOPD(O, P);
	  } catch (e) {/* empty */}
	  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
	};

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var $export = __webpack_require__(8);
	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	$export($export.S, 'Object', { create: __webpack_require__(46) });

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var $export = __webpack_require__(8);
	// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
	$export($export.S + $export.F * !__webpack_require__(6), 'Object', { defineProperty: __webpack_require__(11).f });

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var $export = __webpack_require__(8);
	// 19.1.2.3 / 15.2.3.7 Object.defineProperties(O, Properties)
	$export($export.S + $export.F * !__webpack_require__(6), 'Object', { defineProperties: __webpack_require__(47) });

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	// 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
	var toIObject = __webpack_require__(32),
	    $getOwnPropertyDescriptor = __webpack_require__(51).f;
	
	__webpack_require__(56)('getOwnPropertyDescriptor', function () {
	  return function getOwnPropertyDescriptor(it, key) {
	    return $getOwnPropertyDescriptor(toIObject(it), key);
	  };
	});

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	// most Object methods by ES6 should accept primitives
	var $export = __webpack_require__(8),
	    core = __webpack_require__(9),
	    fails = __webpack_require__(7);
	module.exports = function (KEY, exec) {
	  var fn = (core.Object || {})[KEY] || Object[KEY],
	      exp = {};
	  exp[KEY] = exec(fn);
	  $export($export.S + $export.F * fails(function () {
	    fn(1);
	  }), 'Object', exp);
	};

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	// 19.1.2.9 Object.getPrototypeOf(O)
	var toObject = __webpack_require__(58),
	    $getPrototypeOf = __webpack_require__(59);
	
	__webpack_require__(56)('getPrototypeOf', function () {
	  return function getPrototypeOf(it) {
	    return $getPrototypeOf(toObject(it));
	  };
	});

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	// 7.1.13 ToObject(argument)
	var defined = __webpack_require__(35);
	module.exports = function (it) {
	  return Object(defined(it));
	};

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
	var has = __webpack_require__(5),
	    toObject = __webpack_require__(58),
	    IE_PROTO = __webpack_require__(40)('IE_PROTO'),
	    ObjectProto = Object.prototype;
	
	module.exports = Object.getPrototypeOf || function (O) {
	  O = toObject(O);
	  if (has(O, IE_PROTO)) return O[IE_PROTO];
	  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
	    return O.constructor.prototype;
	  }return O instanceof Object ? ObjectProto : null;
	};

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	// 19.1.2.14 Object.keys(O)
	var toObject = __webpack_require__(58),
	    $keys = __webpack_require__(30);
	
	__webpack_require__(56)('keys', function () {
	  return function keys(it) {
	    return $keys(toObject(it));
	  };
	});

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	// 19.1.2.7 Object.getOwnPropertyNames(O)
	__webpack_require__(56)('getOwnPropertyNames', function () {
	  return __webpack_require__(49).f;
	});

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	// 19.1.2.5 Object.freeze(O)
	var isObject = __webpack_require__(13),
	    meta = __webpack_require__(22).onFreeze;
	
	__webpack_require__(56)('freeze', function ($freeze) {
	  return function freeze(it) {
	    return $freeze && isObject(it) ? $freeze(meta(it)) : it;
	  };
	});

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	// 19.1.2.17 Object.seal(O)
	var isObject = __webpack_require__(13),
	    meta = __webpack_require__(22).onFreeze;
	
	__webpack_require__(56)('seal', function ($seal) {
	  return function seal(it) {
	    return $seal && isObject(it) ? $seal(meta(it)) : it;
	  };
	});

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	// 19.1.2.15 Object.preventExtensions(O)
	var isObject = __webpack_require__(13),
	    meta = __webpack_require__(22).onFreeze;
	
	__webpack_require__(56)('preventExtensions', function ($preventExtensions) {
	  return function preventExtensions(it) {
	    return $preventExtensions && isObject(it) ? $preventExtensions(meta(it)) : it;
	  };
	});

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	// 19.1.2.12 Object.isFrozen(O)
	var isObject = __webpack_require__(13);
	
	__webpack_require__(56)('isFrozen', function ($isFrozen) {
	  return function isFrozen(it) {
	    return isObject(it) ? $isFrozen ? $isFrozen(it) : false : true;
	  };
	});

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	// 19.1.2.13 Object.isSealed(O)
	var isObject = __webpack_require__(13);
	
	__webpack_require__(56)('isSealed', function ($isSealed) {
	  return function isSealed(it) {
	    return isObject(it) ? $isSealed ? $isSealed(it) : false : true;
	  };
	});

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	// 19.1.2.11 Object.isExtensible(O)
	var isObject = __webpack_require__(13);
	
	__webpack_require__(56)('isExtensible', function ($isExtensible) {
	  return function isExtensible(it) {
	    return isObject(it) ? $isExtensible ? $isExtensible(it) : true : false;
	  };
	});

/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	// 19.1.3.1 Object.assign(target, source)
	var $export = __webpack_require__(8);
	
	$export($export.S + $export.F, 'Object', { assign: __webpack_require__(69) });

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// 19.1.2.1 Object.assign(target, source, ...)
	
	var getKeys = __webpack_require__(30),
	    gOPS = __webpack_require__(43),
	    pIE = __webpack_require__(44),
	    toObject = __webpack_require__(58),
	    IObject = __webpack_require__(33),
	    $assign = Object.assign;
	
	// should work with symbols and should have deterministic property order (V8 bug)
	module.exports = !$assign || __webpack_require__(7)(function () {
	  var A = {},
	      B = {},
	      S = Symbol(),
	      K = 'abcdefghijklmnopqrst';
	  A[S] = 7;
	  K.split('').forEach(function (k) {
	    B[k] = k;
	  });
	  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
	}) ? function assign(target, source) {
	  // eslint-disable-line no-unused-vars
	  var T = toObject(target),
	      aLen = arguments.length,
	      index = 1,
	      getSymbols = gOPS.f,
	      isEnum = pIE.f;
	  while (aLen > index) {
	    var S = IObject(arguments[index++]),
	        keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S),
	        length = keys.length,
	        j = 0,
	        key;
	    while (length > j) {
	      if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
	    }
	  }return T;
	} : $assign;

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	// 19.1.3.10 Object.is(value1, value2)
	var $export = __webpack_require__(8);
	$export($export.S, 'Object', { is: __webpack_require__(71) });

/***/ },
/* 71 */
/***/ function(module, exports) {

	"use strict";
	
	// 7.2.9 SameValue(x, y)
	module.exports = Object.is || function is(x, y) {
	  return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
	};

/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	// 19.1.3.19 Object.setPrototypeOf(O, proto)
	var $export = __webpack_require__(8);
	$export($export.S, 'Object', { setPrototypeOf: __webpack_require__(73).set });

/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	// Works with __proto__ only. Old v8 can't work with null proto objects.
	/* eslint-disable no-proto */
	var isObject = __webpack_require__(13),
	    anObject = __webpack_require__(12);
	var check = function check(O, proto) {
	  anObject(O);
	  if (!isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
	};
	module.exports = {
	  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
	  function (test, buggy, set) {
	    try {
	      set = __webpack_require__(20)(Function.call, __webpack_require__(51).f(Object.prototype, '__proto__').set, 2);
	      set(test, []);
	      buggy = !(test instanceof Array);
	    } catch (e) {
	      buggy = true;
	    }
	    return function setPrototypeOf(O, proto) {
	      check(O, proto);
	      if (buggy) O.__proto__ = proto;else set(O, proto);
	      return O;
	    };
	  }({}, false) : undefined),
	  check: check
	};

/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// 19.1.3.6 Object.prototype.toString()
	
	var classof = __webpack_require__(75),
	    test = {};
	test[__webpack_require__(25)('toStringTag')] = 'z';
	if (test + '' != '[object z]') {
	  __webpack_require__(18)(Object.prototype, 'toString', function toString() {
	    return '[object ' + classof(this) + ']';
	  }, true);
	}

/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	// getting tag from 19.1.3.6 Object.prototype.toString()
	var cof = __webpack_require__(34),
	    TAG = __webpack_require__(25)('toStringTag')
	// ES3 wrong here
	,
	    ARG = cof(function () {
	  return arguments;
	}()) == 'Arguments';
	
	// fallback for IE11 Script Access Denied error
	var tryGet = function tryGet(it, key) {
	  try {
	    return it[key];
	  } catch (e) {/* empty */}
	};
	
	module.exports = function (it) {
	  var O, T, B;
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	  // @@toStringTag case
	  : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
	  // builtinTag case
	  : ARG ? cof(O)
	  // ES3 arguments fallback
	  : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
	};

/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	// 19.2.3.2 / 15.3.4.5 Function.prototype.bind(thisArg, args...)
	var $export = __webpack_require__(8);
	
	$export($export.P, 'Function', { bind: __webpack_require__(77) });

/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var aFunction = __webpack_require__(21),
	    isObject = __webpack_require__(13),
	    invoke = __webpack_require__(78),
	    arraySlice = [].slice,
	    factories = {};
	
	var construct = function construct(F, len, args) {
	  if (!(len in factories)) {
	    for (var n = [], i = 0; i < len; i++) {
	      n[i] = 'a[' + i + ']';
	    }factories[len] = Function('F,a', 'return new F(' + n.join(',') + ')');
	  }return factories[len](F, args);
	};
	
	module.exports = Function.bind || function bind(that /*, args... */) {
	  var fn = aFunction(this),
	      partArgs = arraySlice.call(arguments, 1);
	  var bound = function bound() /* args... */{
	    var args = partArgs.concat(arraySlice.call(arguments));
	    return this instanceof bound ? construct(fn, args.length, args) : invoke(fn, args, that);
	  };
	  if (isObject(fn.prototype)) bound.prototype = fn.prototype;
	  return bound;
	};

/***/ },
/* 78 */
/***/ function(module, exports) {

	"use strict";
	
	// fast apply, http://jsperf.lnkit.com/fast-apply/5
	module.exports = function (fn, args, that) {
	                  var un = that === undefined;
	                  switch (args.length) {
	                                    case 0:
	                                                      return un ? fn() : fn.call(that);
	                                    case 1:
	                                                      return un ? fn(args[0]) : fn.call(that, args[0]);
	                                    case 2:
	                                                      return un ? fn(args[0], args[1]) : fn.call(that, args[0], args[1]);
	                                    case 3:
	                                                      return un ? fn(args[0], args[1], args[2]) : fn.call(that, args[0], args[1], args[2]);
	                                    case 4:
	                                                      return un ? fn(args[0], args[1], args[2], args[3]) : fn.call(that, args[0], args[1], args[2], args[3]);
	                  }return fn.apply(that, args);
	};

/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var dP = __webpack_require__(11).f,
	    createDesc = __webpack_require__(17),
	    has = __webpack_require__(5),
	    FProto = Function.prototype,
	    nameRE = /^\s*function ([^ (]*)/,
	    NAME = 'name';
	
	var isExtensible = Object.isExtensible || function () {
	  return true;
	};
	
	// 19.2.4.2 name
	NAME in FProto || __webpack_require__(6) && dP(FProto, NAME, {
	  configurable: true,
	  get: function get() {
	    try {
	      var that = this,
	          name = ('' + that).match(nameRE)[1];
	      has(that, NAME) || !isExtensible(that) || dP(that, NAME, createDesc(5, name));
	      return name;
	    } catch (e) {
	      return '';
	    }
	  }
	});

/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var isObject = __webpack_require__(13),
	    getPrototypeOf = __webpack_require__(59),
	    HAS_INSTANCE = __webpack_require__(25)('hasInstance'),
	    FunctionProto = Function.prototype;
	// 19.2.3.6 Function.prototype[@@hasInstance](V)
	if (!(HAS_INSTANCE in FunctionProto)) __webpack_require__(11).f(FunctionProto, HAS_INSTANCE, { value: function value(O) {
	    if (typeof this != 'function' || !isObject(O)) return false;
	    if (!isObject(this.prototype)) return O instanceof this;
	    // for environment w/o native `@@hasInstance` logic enough `instanceof`, but add this:
	    while (O = getPrototypeOf(O)) {
	      if (this.prototype === O) return true;
	    }return false;
	  } });

/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var $export = __webpack_require__(8),
	    $parseInt = __webpack_require__(82);
	// 18.2.5 parseInt(string, radix)
	$export($export.G + $export.F * (parseInt != $parseInt), { parseInt: $parseInt });

/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var $parseInt = __webpack_require__(4).parseInt,
	    $trim = __webpack_require__(83).trim,
	    ws = __webpack_require__(84),
	    hex = /^[\-+]?0[xX]/;
	
	module.exports = $parseInt(ws + '08') !== 8 || $parseInt(ws + '0x16') !== 22 ? function parseInt(str, radix) {
	  var string = $trim(String(str), 3);
	  return $parseInt(string, radix >>> 0 || (hex.test(string) ? 16 : 10));
	} : $parseInt;

/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var $export = __webpack_require__(8),
	    defined = __webpack_require__(35),
	    fails = __webpack_require__(7),
	    spaces = __webpack_require__(84),
	    space = '[' + spaces + ']',
	    non = '​',
	    ltrim = RegExp('^' + space + space + '*'),
	    rtrim = RegExp(space + space + '*$');
	
	var exporter = function exporter(KEY, exec, ALIAS) {
	  var exp = {};
	  var FORCE = fails(function () {
	    return !!spaces[KEY]() || non[KEY]() != non;
	  });
	  var fn = exp[KEY] = FORCE ? exec(trim) : spaces[KEY];
	  if (ALIAS) exp[ALIAS] = fn;
	  $export($export.P + $export.F * FORCE, 'String', exp);
	};
	
	// 1 -> String#trimLeft
	// 2 -> String#trimRight
	// 3 -> String#trim
	var trim = exporter.trim = function (string, TYPE) {
	  string = String(defined(string));
	  if (TYPE & 1) string = string.replace(ltrim, '');
	  if (TYPE & 2) string = string.replace(rtrim, '');
	  return string;
	};
	
	module.exports = exporter;

/***/ },
/* 84 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = '\t\n\u000b\f\r   ᠎    ' + '         　\u2028\u2029﻿';

/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var $export = __webpack_require__(8),
	    $parseFloat = __webpack_require__(86);
	// 18.2.4 parseFloat(string)
	$export($export.G + $export.F * (parseFloat != $parseFloat), { parseFloat: $parseFloat });

/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var $parseFloat = __webpack_require__(4).parseFloat,
	    $trim = __webpack_require__(83).trim;
	
	module.exports = 1 / $parseFloat(__webpack_require__(84) + '-0') !== -Infinity ? function parseFloat(str) {
	  var string = $trim(String(str), 3),
	      result = $parseFloat(string);
	  return result === 0 && string.charAt(0) == '-' ? -0 : result;
	} : $parseFloat;

/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var global = __webpack_require__(4),
	    has = __webpack_require__(5),
	    cof = __webpack_require__(34),
	    inheritIfRequired = __webpack_require__(88),
	    toPrimitive = __webpack_require__(16),
	    fails = __webpack_require__(7),
	    gOPN = __webpack_require__(50).f,
	    gOPD = __webpack_require__(51).f,
	    dP = __webpack_require__(11).f,
	    $trim = __webpack_require__(83).trim,
	    NUMBER = 'Number',
	    $Number = global[NUMBER],
	    Base = $Number,
	    proto = $Number.prototype
	// Opera ~12 has broken Object#toString
	,
	    BROKEN_COF = cof(__webpack_require__(46)(proto)) == NUMBER,
	    TRIM = 'trim' in String.prototype;
	
	// 7.1.3 ToNumber(argument)
	var toNumber = function toNumber(argument) {
	  var it = toPrimitive(argument, false);
	  if (typeof it == 'string' && it.length > 2) {
	    it = TRIM ? it.trim() : $trim(it, 3);
	    var first = it.charCodeAt(0),
	        third,
	        radix,
	        maxCode;
	    if (first === 43 || first === 45) {
	      third = it.charCodeAt(2);
	      if (third === 88 || third === 120) return NaN; // Number('+0x1') should be NaN, old V8 fix
	    } else if (first === 48) {
	        switch (it.charCodeAt(1)) {
	          case 66:case 98:
	            radix = 2;maxCode = 49;break; // fast equal /^0b[01]+$/i
	          case 79:case 111:
	            radix = 8;maxCode = 55;break; // fast equal /^0o[0-7]+$/i
	          default:
	            return +it;
	        }
	        for (var digits = it.slice(2), i = 0, l = digits.length, code; i < l; i++) {
	          code = digits.charCodeAt(i);
	          // parseInt parses a string to a first unavailable symbol
	          // but ToNumber should return NaN if a string contains unavailable symbols
	          if (code < 48 || code > maxCode) return NaN;
	        }return parseInt(digits, radix);
	      }
	  }return +it;
	};
	
	if (!$Number(' 0o1') || !$Number('0b1') || $Number('+0x1')) {
	  $Number = function Number(value) {
	    var it = arguments.length < 1 ? 0 : value,
	        that = this;
	    return that instanceof $Number
	    // check on 1..constructor(foo) case
	     && (BROKEN_COF ? fails(function () {
	      proto.valueOf.call(that);
	    }) : cof(that) != NUMBER) ? inheritIfRequired(new Base(toNumber(it)), that, $Number) : toNumber(it);
	  };
	  for (var keys = __webpack_require__(6) ? gOPN(Base) : (
	  // ES3:
	  'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
	  // ES6 (in case, if modules with ES6 Number statics required before):
	  'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' + 'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger').split(','), j = 0, key; keys.length > j; j++) {
	    if (has(Base, key = keys[j]) && !has($Number, key)) {
	      dP($Number, key, gOPD(Base, key));
	    }
	  }
	  $Number.prototype = proto;
	  proto.constructor = $Number;
	  __webpack_require__(18)(global, NUMBER, $Number);
	}

/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var isObject = __webpack_require__(13),
	    setPrototypeOf = __webpack_require__(73).set;
	module.exports = function (that, target, C) {
	  var P,
	      S = target.constructor;
	  if (S !== C && typeof S == 'function' && (P = S.prototype) !== C.prototype && isObject(P) && setPrototypeOf) {
	    setPrototypeOf(that, P);
	  }return that;
	};

/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var $export = __webpack_require__(8),
	    anInstance = __webpack_require__(90),
	    toInteger = __webpack_require__(38),
	    aNumberValue = __webpack_require__(91),
	    repeat = __webpack_require__(92),
	    $toFixed = 1..toFixed,
	    floor = Math.floor,
	    data = [0, 0, 0, 0, 0, 0],
	    ERROR = 'Number.toFixed: incorrect invocation!',
	    ZERO = '0';
	
	var multiply = function multiply(n, c) {
	  var i = -1,
	      c2 = c;
	  while (++i < 6) {
	    c2 += n * data[i];
	    data[i] = c2 % 1e7;
	    c2 = floor(c2 / 1e7);
	  }
	};
	var divide = function divide(n) {
	  var i = 6,
	      c = 0;
	  while (--i >= 0) {
	    c += data[i];
	    data[i] = floor(c / n);
	    c = c % n * 1e7;
	  }
	};
	var numToString = function numToString() {
	  var i = 6,
	      s = '';
	  while (--i >= 0) {
	    if (s !== '' || i === 0 || data[i] !== 0) {
	      var t = String(data[i]);
	      s = s === '' ? t : s + repeat.call(ZERO, 7 - t.length) + t;
	    }
	  }return s;
	};
	var pow = function pow(x, n, acc) {
	  return n === 0 ? acc : n % 2 === 1 ? pow(x, n - 1, acc * x) : pow(x * x, n / 2, acc);
	};
	var log = function log(x) {
	  var n = 0,
	      x2 = x;
	  while (x2 >= 4096) {
	    n += 12;
	    x2 /= 4096;
	  }
	  while (x2 >= 2) {
	    n += 1;
	    x2 /= 2;
	  }return n;
	};
	
	$export($export.P + $export.F * (!!$toFixed && (0.00008.toFixed(3) !== '0.000' || 0.9.toFixed(0) !== '1' || 1.255.toFixed(2) !== '1.25' || 1000000000000000128..toFixed(0) !== '1000000000000000128') || !__webpack_require__(7)(function () {
	  // V8 ~ Android 4.3-
	  $toFixed.call({});
	})), 'Number', {
	  toFixed: function toFixed(fractionDigits) {
	    var x = aNumberValue(this, ERROR),
	        f = toInteger(fractionDigits),
	        s = '',
	        m = ZERO,
	        e,
	        z,
	        j,
	        k;
	    if (f < 0 || f > 20) throw RangeError(ERROR);
	    if (x != x) return 'NaN';
	    if (x <= -1e21 || x >= 1e21) return String(x);
	    if (x < 0) {
	      s = '-';
	      x = -x;
	    }
	    if (x > 1e-21) {
	      e = log(x * pow(2, 69, 1)) - 69;
	      z = e < 0 ? x * pow(2, -e, 1) : x / pow(2, e, 1);
	      z *= 0x10000000000000;
	      e = 52 - e;
	      if (e > 0) {
	        multiply(0, z);
	        j = f;
	        while (j >= 7) {
	          multiply(1e7, 0);
	          j -= 7;
	        }
	        multiply(pow(10, j, 1), 0);
	        j = e - 1;
	        while (j >= 23) {
	          divide(1 << 23);
	          j -= 23;
	        }
	        divide(1 << j);
	        multiply(1, 1);
	        divide(2);
	        m = numToString();
	      } else {
	        multiply(0, z);
	        multiply(1 << -e, 0);
	        m = numToString() + repeat.call(ZERO, f);
	      }
	    }
	    if (f > 0) {
	      k = m.length;
	      m = s + (k <= f ? '0.' + repeat.call(ZERO, f - k) + m : m.slice(0, k - f) + '.' + m.slice(k - f));
	    } else {
	      m = s + m;
	    }return m;
	  }
	});

/***/ },
/* 90 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = function (it, Constructor, name, forbiddenField) {
	  if (!(it instanceof Constructor) || forbiddenField !== undefined && forbiddenField in it) {
	    throw TypeError(name + ': incorrect invocation!');
	  }return it;
	};

/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var cof = __webpack_require__(34);
	module.exports = function (it, msg) {
	  if (typeof it != 'number' && cof(it) != 'Number') throw TypeError(msg);
	  return +it;
	};

/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var toInteger = __webpack_require__(38),
	    defined = __webpack_require__(35);
	
	module.exports = function repeat(count) {
	  var str = String(defined(this)),
	      res = '',
	      n = toInteger(count);
	  if (n < 0 || n == Infinity) throw RangeError("Count can't be negative");
	  for (; n > 0; (n >>>= 1) && (str += str)) {
	    if (n & 1) res += str;
	  }return res;
	};

/***/ },
/* 93 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var $export = __webpack_require__(8),
	    $fails = __webpack_require__(7),
	    aNumberValue = __webpack_require__(91),
	    $toPrecision = 1..toPrecision;
	
	$export($export.P + $export.F * ($fails(function () {
	  // IE7-
	  return $toPrecision.call(1, undefined) !== '1';
	}) || !$fails(function () {
	  // V8 ~ Android 4.3-
	  $toPrecision.call({});
	})), 'Number', {
	  toPrecision: function toPrecision(precision) {
	    var that = aNumberValue(this, 'Number#toPrecision: incorrect invocation!');
	    return precision === undefined ? $toPrecision.call(that) : $toPrecision.call(that, precision);
	  }
	});

/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	// 20.1.2.1 Number.EPSILON
	var $export = __webpack_require__(8);
	
	$export($export.S, 'Number', { EPSILON: Math.pow(2, -52) });

/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	// 20.1.2.2 Number.isFinite(number)
	var $export = __webpack_require__(8),
	    _isFinite = __webpack_require__(4).isFinite;
	
	$export($export.S, 'Number', {
	  isFinite: function isFinite(it) {
	    return typeof it == 'number' && _isFinite(it);
	  }
	});

/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	// 20.1.2.3 Number.isInteger(number)
	var $export = __webpack_require__(8);
	
	$export($export.S, 'Number', { isInteger: __webpack_require__(97) });

/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	// 20.1.2.3 Number.isInteger(number)
	var isObject = __webpack_require__(13),
	    floor = Math.floor;
	module.exports = function isInteger(it) {
	  return !isObject(it) && isFinite(it) && floor(it) === it;
	};

/***/ },
/* 98 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	// 20.1.2.4 Number.isNaN(number)
	var $export = __webpack_require__(8);
	
	$export($export.S, 'Number', {
	  isNaN: function isNaN(number) {
	    return number != number;
	  }
	});

/***/ },
/* 99 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	// 20.1.2.5 Number.isSafeInteger(number)
	var $export = __webpack_require__(8),
	    isInteger = __webpack_require__(97),
	    abs = Math.abs;
	
	$export($export.S, 'Number', {
	  isSafeInteger: function isSafeInteger(number) {
	    return isInteger(number) && abs(number) <= 0x1fffffffffffff;
	  }
	});

/***/ },
/* 100 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	// 20.1.2.6 Number.MAX_SAFE_INTEGER
	var $export = __webpack_require__(8);
	
	$export($export.S, 'Number', { MAX_SAFE_INTEGER: 0x1fffffffffffff });

/***/ },
/* 101 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	// 20.1.2.10 Number.MIN_SAFE_INTEGER
	var $export = __webpack_require__(8);
	
	$export($export.S, 'Number', { MIN_SAFE_INTEGER: -0x1fffffffffffff });

/***/ },
/* 102 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var $export = __webpack_require__(8),
	    $parseFloat = __webpack_require__(86);
	// 20.1.2.12 Number.parseFloat(string)
	$export($export.S + $export.F * (Number.parseFloat != $parseFloat), 'Number', { parseFloat: $parseFloat });

/***/ },
/* 103 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var $export = __webpack_require__(8),
	    $parseInt = __webpack_require__(82);
	// 20.1.2.13 Number.parseInt(string, radix)
	$export($export.S + $export.F * (Number.parseInt != $parseInt), 'Number', { parseInt: $parseInt });

/***/ },
/* 104 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	// 20.2.2.3 Math.acosh(x)
	var $export = __webpack_require__(8),
	    log1p = __webpack_require__(105),
	    sqrt = Math.sqrt,
	    $acosh = Math.acosh;
	
	$export($export.S + $export.F * !($acosh
	// V8 bug: https://code.google.com/p/v8/issues/detail?id=3509
	 && Math.floor($acosh(Number.MAX_VALUE)) == 710
	// Tor Browser bug: Math.acosh(Infinity) -> NaN
	 && $acosh(Infinity) == Infinity), 'Math', {
	  acosh: function acosh(x) {
	    return (x = +x) < 1 ? NaN : x > 94906265.62425156 ? Math.log(x) + Math.LN2 : log1p(x - 1 + sqrt(x - 1) * sqrt(x + 1));
	  }
	});

/***/ },
/* 105 */
/***/ function(module, exports) {

	"use strict";
	
	// 20.2.2.20 Math.log1p(x)
	module.exports = Math.log1p || function log1p(x) {
	  return (x = +x) > -1e-8 && x < 1e-8 ? x - x * x / 2 : Math.log(1 + x);
	};

/***/ },
/* 106 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	// 20.2.2.5 Math.asinh(x)
	var $export = __webpack_require__(8),
	    $asinh = Math.asinh;
	
	function asinh(x) {
	  return !isFinite(x = +x) || x == 0 ? x : x < 0 ? -asinh(-x) : Math.log(x + Math.sqrt(x * x + 1));
	}
	
	// Tor Browser bug: Math.asinh(0) -> -0
	$export($export.S + $export.F * !($asinh && 1 / $asinh(0) > 0), 'Math', { asinh: asinh });

/***/ },
/* 107 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	// 20.2.2.7 Math.atanh(x)
	var $export = __webpack_require__(8),
	    $atanh = Math.atanh;
	
	// Tor Browser bug: Math.atanh(-0) -> 0
	$export($export.S + $export.F * !($atanh && 1 / $atanh(-0) < 0), 'Math', {
	  atanh: function atanh(x) {
	    return (x = +x) == 0 ? x : Math.log((1 + x) / (1 - x)) / 2;
	  }
	});

/***/ },
/* 108 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	// 20.2.2.9 Math.cbrt(x)
	var $export = __webpack_require__(8),
	    sign = __webpack_require__(109);
	
	$export($export.S, 'Math', {
	  cbrt: function cbrt(x) {
	    return sign(x = +x) * Math.pow(Math.abs(x), 1 / 3);
	  }
	});

/***/ },
/* 109 */
/***/ function(module, exports) {

	"use strict";
	
	// 20.2.2.28 Math.sign(x)
	module.exports = Math.sign || function sign(x) {
	  return (x = +x) == 0 || x != x ? x : x < 0 ? -1 : 1;
	};

/***/ },
/* 110 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	// 20.2.2.11 Math.clz32(x)
	var $export = __webpack_require__(8);
	
	$export($export.S, 'Math', {
	  clz32: function clz32(x) {
	    return (x >>>= 0) ? 31 - Math.floor(Math.log(x + 0.5) * Math.LOG2E) : 32;
	  }
	});

/***/ },
/* 111 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	// 20.2.2.12 Math.cosh(x)
	var $export = __webpack_require__(8),
	    exp = Math.exp;
	
	$export($export.S, 'Math', {
	  cosh: function cosh(x) {
	    return (exp(x = +x) + exp(-x)) / 2;
	  }
	});

/***/ },
/* 112 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	// 20.2.2.14 Math.expm1(x)
	var $export = __webpack_require__(8),
	    $expm1 = __webpack_require__(113);
	
	$export($export.S + $export.F * ($expm1 != Math.expm1), 'Math', { expm1: $expm1 });

/***/ },
/* 113 */
/***/ function(module, exports) {

	"use strict";
	
	// 20.2.2.14 Math.expm1(x)
	var $expm1 = Math.expm1;
	module.exports = !$expm1
	// Old FF bug
	 || $expm1(10) > 22025.465794806719 || $expm1(10) < 22025.4657948067165168
	// Tor Browser bug
	 || $expm1(-2e-17) != -2e-17 ? function expm1(x) {
	  return (x = +x) == 0 ? x : x > -1e-6 && x < 1e-6 ? x + x * x / 2 : Math.exp(x) - 1;
	} : $expm1;

/***/ },
/* 114 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	// 20.2.2.16 Math.fround(x)
	var $export = __webpack_require__(8),
	    sign = __webpack_require__(109),
	    pow = Math.pow,
	    EPSILON = pow(2, -52),
	    EPSILON32 = pow(2, -23),
	    MAX32 = pow(2, 127) * (2 - EPSILON32),
	    MIN32 = pow(2, -126);
	
	var roundTiesToEven = function roundTiesToEven(n) {
	  return n + 1 / EPSILON - 1 / EPSILON;
	};
	
	$export($export.S, 'Math', {
	  fround: function fround(x) {
	    var $abs = Math.abs(x),
	        $sign = sign(x),
	        a,
	        result;
	    if ($abs < MIN32) return $sign * roundTiesToEven($abs / MIN32 / EPSILON32) * MIN32 * EPSILON32;
	    a = (1 + EPSILON32 / EPSILON) * $abs;
	    result = a - (a - $abs);
	    if (result > MAX32 || result != result) return $sign * Infinity;
	    return $sign * result;
	  }
	});

/***/ },
/* 115 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	// 20.2.2.17 Math.hypot([value1[, value2[, … ]]])
	var $export = __webpack_require__(8),
	    abs = Math.abs;
	
	$export($export.S, 'Math', {
	  hypot: function hypot(value1, value2) {
	    // eslint-disable-line no-unused-vars
	    var sum = 0,
	        i = 0,
	        aLen = arguments.length,
	        larg = 0,
	        arg,
	        div;
	    while (i < aLen) {
	      arg = abs(arguments[i++]);
	      if (larg < arg) {
	        div = larg / arg;
	        sum = sum * div * div + 1;
	        larg = arg;
	      } else if (arg > 0) {
	        div = arg / larg;
	        sum += div * div;
	      } else sum += arg;
	    }
	    return larg === Infinity ? Infinity : larg * Math.sqrt(sum);
	  }
	});

/***/ },
/* 116 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	// 20.2.2.18 Math.imul(x, y)
	var $export = __webpack_require__(8),
	    $imul = Math.imul;
	
	// some WebKit versions fails with big numbers, some has wrong arity
	$export($export.S + $export.F * __webpack_require__(7)(function () {
	  return $imul(0xffffffff, 5) != -5 || $imul.length != 2;
	}), 'Math', {
	  imul: function imul(x, y) {
	    var UINT16 = 0xffff,
	        xn = +x,
	        yn = +y,
	        xl = UINT16 & xn,
	        yl = UINT16 & yn;
	    return 0 | xl * yl + ((UINT16 & xn >>> 16) * yl + xl * (UINT16 & yn >>> 16) << 16 >>> 0);
	  }
	});

/***/ },
/* 117 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	// 20.2.2.21 Math.log10(x)
	var $export = __webpack_require__(8);
	
	$export($export.S, 'Math', {
	  log10: function log10(x) {
	    return Math.log(x) / Math.LN10;
	  }
	});

/***/ },
/* 118 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	// 20.2.2.20 Math.log1p(x)
	var $export = __webpack_require__(8);
	
	$export($export.S, 'Math', { log1p: __webpack_require__(105) });

/***/ },
/* 119 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	// 20.2.2.22 Math.log2(x)
	var $export = __webpack_require__(8);
	
	$export($export.S, 'Math', {
	  log2: function log2(x) {
	    return Math.log(x) / Math.LN2;
	  }
	});

/***/ },
/* 120 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	// 20.2.2.28 Math.sign(x)
	var $export = __webpack_require__(8);
	
	$export($export.S, 'Math', { sign: __webpack_require__(109) });

/***/ },
/* 121 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	// 20.2.2.30 Math.sinh(x)
	var $export = __webpack_require__(8),
	    expm1 = __webpack_require__(113),
	    exp = Math.exp;
	
	// V8 near Chromium 38 has a problem with very small numbers
	$export($export.S + $export.F * __webpack_require__(7)(function () {
	  return !Math.sinh(-2e-17) != -2e-17;
	}), 'Math', {
	  sinh: function sinh(x) {
	    return Math.abs(x = +x) < 1 ? (expm1(x) - expm1(-x)) / 2 : (exp(x - 1) - exp(-x - 1)) * (Math.E / 2);
	  }
	});

/***/ },
/* 122 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	// 20.2.2.33 Math.tanh(x)
	var $export = __webpack_require__(8),
	    expm1 = __webpack_require__(113),
	    exp = Math.exp;
	
	$export($export.S, 'Math', {
	  tanh: function tanh(x) {
	    var a = expm1(x = +x),
	        b = expm1(-x);
	    return a == Infinity ? 1 : b == Infinity ? -1 : (a - b) / (exp(x) + exp(-x));
	  }
	});

/***/ },
/* 123 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	// 20.2.2.34 Math.trunc(x)
	var $export = __webpack_require__(8);
	
	$export($export.S, 'Math', {
	  trunc: function trunc(it) {
	    return (it > 0 ? Math.floor : Math.ceil)(it);
	  }
	});

/***/ },
/* 124 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var $export = __webpack_require__(8),
	    toIndex = __webpack_require__(39),
	    fromCharCode = String.fromCharCode,
	    $fromCodePoint = String.fromCodePoint;
	
	// length should be 1, old FF problem
	$export($export.S + $export.F * (!!$fromCodePoint && $fromCodePoint.length != 1), 'String', {
	  // 21.1.2.2 String.fromCodePoint(...codePoints)
	  fromCodePoint: function fromCodePoint(x) {
	    // eslint-disable-line no-unused-vars
	    var res = [],
	        aLen = arguments.length,
	        i = 0,
	        code;
	    while (aLen > i) {
	      code = +arguments[i++];
	      if (toIndex(code, 0x10ffff) !== code) throw RangeError(code + ' is not a valid code point');
	      res.push(code < 0x10000 ? fromCharCode(code) : fromCharCode(((code -= 0x10000) >> 10) + 0xd800, code % 0x400 + 0xdc00));
	    }return res.join('');
	  }
	});

/***/ },
/* 125 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var $export = __webpack_require__(8),
	    toIObject = __webpack_require__(32),
	    toLength = __webpack_require__(37);
	
	$export($export.S, 'String', {
	  // 21.1.2.4 String.raw(callSite, ...substitutions)
	  raw: function raw(callSite) {
	    var tpl = toIObject(callSite.raw),
	        len = toLength(tpl.length),
	        aLen = arguments.length,
	        res = [],
	        i = 0;
	    while (len > i) {
	      res.push(String(tpl[i++]));
	      if (i < aLen) res.push(String(arguments[i]));
	    }return res.join('');
	  }
	});

/***/ },
/* 126 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// 21.1.3.25 String.prototype.trim()
	
	__webpack_require__(83)('trim', function ($trim) {
	  return function trim() {
	    return $trim(this, 3);
	  };
	});

/***/ },
/* 127 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var $at = __webpack_require__(128)(true);
	
	// 21.1.3.27 String.prototype[@@iterator]()
	__webpack_require__(129)(String, 'String', function (iterated) {
	  this._t = String(iterated); // target
	  this._i = 0; // next index
	  // 21.1.5.2.1 %StringIteratorPrototype%.next()
	}, function () {
	  var O = this._t,
	      index = this._i,
	      point;
	  if (index >= O.length) return { value: undefined, done: true };
	  point = $at(O, index);
	  this._i += point.length;
	  return { value: point, done: false };
	});

/***/ },
/* 128 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var toInteger = __webpack_require__(38),
	    defined = __webpack_require__(35);
	// true  -> String#at
	// false -> String#codePointAt
	module.exports = function (TO_STRING) {
	  return function (that, pos) {
	    var s = String(defined(that)),
	        i = toInteger(pos),
	        l = s.length,
	        a,
	        b;
	    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
	    a = s.charCodeAt(i);
	    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff ? TO_STRING ? s.charAt(i) : a : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
	  };
	};

/***/ },
/* 129 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var LIBRARY = __webpack_require__(28),
	    $export = __webpack_require__(8),
	    redefine = __webpack_require__(18),
	    hide = __webpack_require__(10),
	    has = __webpack_require__(5),
	    Iterators = __webpack_require__(130),
	    $iterCreate = __webpack_require__(131),
	    setToStringTag = __webpack_require__(24),
	    getPrototypeOf = __webpack_require__(59),
	    ITERATOR = __webpack_require__(25)('iterator'),
	    BUGGY = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
	,
	    FF_ITERATOR = '@@iterator',
	    KEYS = 'keys',
	    VALUES = 'values';
	
	var returnThis = function returnThis() {
	  return this;
	};
	
	module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
	  $iterCreate(Constructor, NAME, next);
	  var getMethod = function getMethod(kind) {
	    if (!BUGGY && kind in proto) return proto[kind];
	    switch (kind) {
	      case KEYS:
	        return function keys() {
	          return new Constructor(this, kind);
	        };
	      case VALUES:
	        return function values() {
	          return new Constructor(this, kind);
	        };
	    }return function entries() {
	      return new Constructor(this, kind);
	    };
	  };
	  var TAG = NAME + ' Iterator',
	      DEF_VALUES = DEFAULT == VALUES,
	      VALUES_BUG = false,
	      proto = Base.prototype,
	      $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT],
	      $default = $native || getMethod(DEFAULT),
	      $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined,
	      $anyNative = NAME == 'Array' ? proto.entries || $native : $native,
	      methods,
	      key,
	      IteratorPrototype;
	  // Fix native
	  if ($anyNative) {
	    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
	    if (IteratorPrototype !== Object.prototype) {
	      // Set @@toStringTag to native iterators
	      setToStringTag(IteratorPrototype, TAG, true);
	      // fix for some old engines
	      if (!LIBRARY && !has(IteratorPrototype, ITERATOR)) hide(IteratorPrototype, ITERATOR, returnThis);
	    }
	  }
	  // fix Array#{values, @@iterator}.name in V8 / FF
	  if (DEF_VALUES && $native && $native.name !== VALUES) {
	    VALUES_BUG = true;
	    $default = function values() {
	      return $native.call(this);
	    };
	  }
	  // Define iterator
	  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
	    hide(proto, ITERATOR, $default);
	  }
	  // Plug for library
	  Iterators[NAME] = $default;
	  Iterators[TAG] = returnThis;
	  if (DEFAULT) {
	    methods = {
	      values: DEF_VALUES ? $default : getMethod(VALUES),
	      keys: IS_SET ? $default : getMethod(KEYS),
	      entries: $entries
	    };
	    if (FORCED) for (key in methods) {
	      if (!(key in proto)) redefine(proto, key, methods[key]);
	    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
	  }
	  return methods;
	};

/***/ },
/* 130 */
/***/ function(module, exports) {

	"use strict";
	
	module.exports = {};

/***/ },
/* 131 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var create = __webpack_require__(46),
	    descriptor = __webpack_require__(17),
	    setToStringTag = __webpack_require__(24),
	    IteratorPrototype = {};
	
	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	__webpack_require__(10)(IteratorPrototype, __webpack_require__(25)('iterator'), function () {
	  return this;
	});
	
	module.exports = function (Constructor, NAME, next) {
	  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
	  setToStringTag(Constructor, NAME + ' Iterator');
	};

/***/ },
/* 132 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var $export = __webpack_require__(8),
	    $at = __webpack_require__(128)(false);
	$export($export.P, 'String', {
	  // 21.1.3.3 String.prototype.codePointAt(pos)
	  codePointAt: function codePointAt(pos) {
	    return $at(this, pos);
	  }
	});

/***/ },
/* 133 */
/***/ function(module, exports, __webpack_require__) {

	// 21.1.3.6 String.prototype.endsWith(searchString [, endPosition])
	'use strict';
	
	var $export = __webpack_require__(8),
	    toLength = __webpack_require__(37),
	    context = __webpack_require__(134),
	    ENDS_WITH = 'endsWith',
	    $endsWith = ''[ENDS_WITH];
	
	$export($export.P + $export.F * __webpack_require__(136)(ENDS_WITH), 'String', {
	  endsWith: function endsWith(searchString /*, endPosition = @length */) {
	    var that = context(this, searchString, ENDS_WITH),
	        endPosition = arguments.length > 1 ? arguments[1] : undefined,
	        len = toLength(that.length),
	        end = endPosition === undefined ? len : Math.min(toLength(endPosition), len),
	        search = String(searchString);
	    return $endsWith ? $endsWith.call(that, search, end) : that.slice(end - search.length, end) === search;
	  }
	});

/***/ },
/* 134 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	// helper for String#{startsWith, endsWith, includes}
	var isRegExp = __webpack_require__(135),
	    defined = __webpack_require__(35);
	
	module.exports = function (that, searchString, NAME) {
	  if (isRegExp(searchString)) throw TypeError('String#' + NAME + " doesn't accept regex!");
	  return String(defined(that));
	};

/***/ },
/* 135 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	// 7.2.8 IsRegExp(argument)
	var isObject = __webpack_require__(13),
	    cof = __webpack_require__(34),
	    MATCH = __webpack_require__(25)('match');
	module.exports = function (it) {
	  var isRegExp;
	  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : cof(it) == 'RegExp');
	};

/***/ },
/* 136 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var MATCH = __webpack_require__(25)('match');
	module.exports = function (KEY) {
	  var re = /./;
	  try {
	    '/./'[KEY](re);
	  } catch (e) {
	    try {
	      re[MATCH] = false;
	      return !'/./'[KEY](re);
	    } catch (f) {/* empty */}
	  }return true;
	};

/***/ },
/* 137 */
/***/ function(module, exports, __webpack_require__) {

	// 21.1.3.7 String.prototype.includes(searchString, position = 0)
	'use strict';
	
	var $export = __webpack_require__(8),
	    context = __webpack_require__(134),
	    INCLUDES = 'includes';
	
	$export($export.P + $export.F * __webpack_require__(136)(INCLUDES), 'String', {
	  includes: function includes(searchString /*, position = 0 */) {
	    return !! ~context(this, searchString, INCLUDES).indexOf(searchString, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

/***/ },
/* 138 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var $export = __webpack_require__(8);
	
	$export($export.P, 'String', {
	  // 21.1.3.13 String.prototype.repeat(count)
	  repeat: __webpack_require__(92)
	});

/***/ },
/* 139 */
/***/ function(module, exports, __webpack_require__) {

	// 21.1.3.18 String.prototype.startsWith(searchString [, position ])
	'use strict';
	
	var $export = __webpack_require__(8),
	    toLength = __webpack_require__(37),
	    context = __webpack_require__(134),
	    STARTS_WITH = 'startsWith',
	    $startsWith = ''[STARTS_WITH];
	
	$export($export.P + $export.F * __webpack_require__(136)(STARTS_WITH), 'String', {
	  startsWith: function startsWith(searchString /*, position = 0 */) {
	    var that = context(this, searchString, STARTS_WITH),
	        index = toLength(Math.min(arguments.length > 1 ? arguments[1] : undefined, that.length)),
	        search = String(searchString);
	    return $startsWith ? $startsWith.call(that, search, index) : that.slice(index, index + search.length) === search;
	  }
	});

/***/ },
/* 140 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// B.2.3.2 String.prototype.anchor(name)
	
	__webpack_require__(141)('anchor', function (createHTML) {
	  return function anchor(name) {
	    return createHTML(this, 'a', 'name', name);
	  };
	});

/***/ },
/* 141 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var $export = __webpack_require__(8),
	    fails = __webpack_require__(7),
	    defined = __webpack_require__(35),
	    quot = /"/g;
	// B.2.3.2.1 CreateHTML(string, tag, attribute, value)
	var createHTML = function createHTML(string, tag, attribute, value) {
	  var S = String(defined(string)),
	      p1 = '<' + tag;
	  if (attribute !== '') p1 += ' ' + attribute + '="' + String(value).replace(quot, '&quot;') + '"';
	  return p1 + '>' + S + '</' + tag + '>';
	};
	module.exports = function (NAME, exec) {
	  var O = {};
	  O[NAME] = exec(createHTML);
	  $export($export.P + $export.F * fails(function () {
	    var test = ''[NAME]('"');
	    return test !== test.toLowerCase() || test.split('"').length > 3;
	  }), 'String', O);
	};

/***/ },
/* 142 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// B.2.3.3 String.prototype.big()
	
	__webpack_require__(141)('big', function (createHTML) {
	  return function big() {
	    return createHTML(this, 'big', '', '');
	  };
	});

/***/ },
/* 143 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// B.2.3.4 String.prototype.blink()
	
	__webpack_require__(141)('blink', function (createHTML) {
	  return function blink() {
	    return createHTML(this, 'blink', '', '');
	  };
	});

/***/ },
/* 144 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// B.2.3.5 String.prototype.bold()
	
	__webpack_require__(141)('bold', function (createHTML) {
	  return function bold() {
	    return createHTML(this, 'b', '', '');
	  };
	});

/***/ },
/* 145 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// B.2.3.6 String.prototype.fixed()
	
	__webpack_require__(141)('fixed', function (createHTML) {
	  return function fixed() {
	    return createHTML(this, 'tt', '', '');
	  };
	});

/***/ },
/* 146 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// B.2.3.7 String.prototype.fontcolor(color)
	
	__webpack_require__(141)('fontcolor', function (createHTML) {
	  return function fontcolor(color) {
	    return createHTML(this, 'font', 'color', color);
	  };
	});

/***/ },
/* 147 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// B.2.3.8 String.prototype.fontsize(size)
	
	__webpack_require__(141)('fontsize', function (createHTML) {
	  return function fontsize(size) {
	    return createHTML(this, 'font', 'size', size);
	  };
	});

/***/ },
/* 148 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// B.2.3.9 String.prototype.italics()
	
	__webpack_require__(141)('italics', function (createHTML) {
	  return function italics() {
	    return createHTML(this, 'i', '', '');
	  };
	});

/***/ },
/* 149 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// B.2.3.10 String.prototype.link(url)
	
	__webpack_require__(141)('link', function (createHTML) {
	  return function link(url) {
	    return createHTML(this, 'a', 'href', url);
	  };
	});

/***/ },
/* 150 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// B.2.3.11 String.prototype.small()
	
	__webpack_require__(141)('small', function (createHTML) {
	  return function small() {
	    return createHTML(this, 'small', '', '');
	  };
	});

/***/ },
/* 151 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// B.2.3.12 String.prototype.strike()
	
	__webpack_require__(141)('strike', function (createHTML) {
	  return function strike() {
	    return createHTML(this, 'strike', '', '');
	  };
	});

/***/ },
/* 152 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// B.2.3.13 String.prototype.sub()
	
	__webpack_require__(141)('sub', function (createHTML) {
	  return function sub() {
	    return createHTML(this, 'sub', '', '');
	  };
	});

/***/ },
/* 153 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// B.2.3.14 String.prototype.sup()
	
	__webpack_require__(141)('sup', function (createHTML) {
	  return function sup() {
	    return createHTML(this, 'sup', '', '');
	  };
	});

/***/ },
/* 154 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	// 20.3.3.1 / 15.9.4.4 Date.now()
	var $export = __webpack_require__(8);
	
	$export($export.S, 'Date', { now: function now() {
	    return new Date().getTime();
	  } });

/***/ },
/* 155 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var $export = __webpack_require__(8),
	    toObject = __webpack_require__(58),
	    toPrimitive = __webpack_require__(16);
	
	$export($export.P + $export.F * __webpack_require__(7)(function () {
	  return new Date(NaN).toJSON() !== null || Date.prototype.toJSON.call({ toISOString: function toISOString() {
	      return 1;
	    } }) !== 1;
	}), 'Date', {
	  toJSON: function toJSON(key) {
	    var O = toObject(this),
	        pv = toPrimitive(O);
	    return typeof pv == 'number' && !isFinite(pv) ? null : O.toISOString();
	  }
	});

/***/ },
/* 156 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// 20.3.4.36 / 15.9.5.43 Date.prototype.toISOString()
	
	var $export = __webpack_require__(8),
	    fails = __webpack_require__(7),
	    getTime = Date.prototype.getTime;
	
	var lz = function lz(num) {
	  return num > 9 ? num : '0' + num;
	};
	
	// PhantomJS / old WebKit has a broken implementations
	$export($export.P + $export.F * (fails(function () {
	  return new Date(-5e13 - 1).toISOString() != '0385-07-25T07:06:39.999Z';
	}) || !fails(function () {
	  new Date(NaN).toISOString();
	})), 'Date', {
	  toISOString: function toISOString() {
	    if (!isFinite(getTime.call(this))) throw RangeError('Invalid time value');
	    var d = this,
	        y = d.getUTCFullYear(),
	        m = d.getUTCMilliseconds(),
	        s = y < 0 ? '-' : y > 9999 ? '+' : '';
	    return s + ('00000' + Math.abs(y)).slice(s ? -6 : -4) + '-' + lz(d.getUTCMonth() + 1) + '-' + lz(d.getUTCDate()) + 'T' + lz(d.getUTCHours()) + ':' + lz(d.getUTCMinutes()) + ':' + lz(d.getUTCSeconds()) + '.' + (m > 99 ? m : '0' + lz(m)) + 'Z';
	  }
	});

/***/ },
/* 157 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var DateProto = Date.prototype,
	    INVALID_DATE = 'Invalid Date',
	    TO_STRING = 'toString',
	    $toString = DateProto[TO_STRING],
	    getTime = DateProto.getTime;
	if (new Date(NaN) + '' != INVALID_DATE) {
	  __webpack_require__(18)(DateProto, TO_STRING, function toString() {
	    var value = getTime.call(this);
	    return value === value ? $toString.call(this) : INVALID_DATE;
	  });
	}

/***/ },
/* 158 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var TO_PRIMITIVE = __webpack_require__(25)('toPrimitive'),
	    proto = Date.prototype;
	
	if (!(TO_PRIMITIVE in proto)) __webpack_require__(10)(proto, TO_PRIMITIVE, __webpack_require__(159));

/***/ },
/* 159 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var anObject = __webpack_require__(12),
	    toPrimitive = __webpack_require__(16),
	    NUMBER = 'number';
	
	module.exports = function (hint) {
	  if (hint !== 'string' && hint !== NUMBER && hint !== 'default') throw TypeError('Incorrect hint');
	  return toPrimitive(anObject(this), hint != NUMBER);
	};

/***/ },
/* 160 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	// 22.1.2.2 / 15.4.3.2 Array.isArray(arg)
	var $export = __webpack_require__(8);
	
	$export($export.S, 'Array', { isArray: __webpack_require__(45) });

/***/ },
/* 161 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var ctx = __webpack_require__(20),
	    $export = __webpack_require__(8),
	    toObject = __webpack_require__(58),
	    call = __webpack_require__(162),
	    isArrayIter = __webpack_require__(163),
	    toLength = __webpack_require__(37),
	    createProperty = __webpack_require__(164),
	    getIterFn = __webpack_require__(165);
	
	$export($export.S + $export.F * !__webpack_require__(166)(function (iter) {
	  Array.from(iter);
	}), 'Array', {
	  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
	  from: function from(arrayLike /*, mapfn = undefined, thisArg = undefined*/) {
	    var O = toObject(arrayLike),
	        C = typeof this == 'function' ? this : Array,
	        aLen = arguments.length,
	        mapfn = aLen > 1 ? arguments[1] : undefined,
	        mapping = mapfn !== undefined,
	        index = 0,
	        iterFn = getIterFn(O),
	        length,
	        result,
	        step,
	        iterator;
	    if (mapping) mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
	    // if object isn't iterable or it's array with default iterator - use simple case
	    if (iterFn != undefined && !(C == Array && isArrayIter(iterFn))) {
	      for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
	        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
	      }
	    } else {
	      length = toLength(O.length);
	      for (result = new C(length); length > index; index++) {
	        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
	      }
	    }
	    result.length = index;
	    return result;
	  }
	});

/***/ },
/* 162 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	// call something on iterator step with safe closing on error
	var anObject = __webpack_require__(12);
	module.exports = function (iterator, fn, value, entries) {
	  try {
	    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
	    // 7.4.6 IteratorClose(iterator, completion)
	  } catch (e) {
	    var ret = iterator['return'];
	    if (ret !== undefined) anObject(ret.call(iterator));
	    throw e;
	  }
	};

/***/ },
/* 163 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	// check on default Array iterator
	var Iterators = __webpack_require__(130),
	    ITERATOR = __webpack_require__(25)('iterator'),
	    ArrayProto = Array.prototype;
	
	module.exports = function (it) {
	  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
	};

/***/ },
/* 164 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var $defineProperty = __webpack_require__(11),
	    createDesc = __webpack_require__(17);
	
	module.exports = function (object, index, value) {
	  if (index in object) $defineProperty.f(object, index, createDesc(0, value));else object[index] = value;
	};

/***/ },
/* 165 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var classof = __webpack_require__(75),
	    ITERATOR = __webpack_require__(25)('iterator'),
	    Iterators = __webpack_require__(130);
	module.exports = __webpack_require__(9).getIteratorMethod = function (it) {
	  if (it != undefined) return it[ITERATOR] || it['@@iterator'] || Iterators[classof(it)];
	};

/***/ },
/* 166 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var ITERATOR = __webpack_require__(25)('iterator'),
	    SAFE_CLOSING = false;
	
	try {
	  var riter = [7][ITERATOR]();
	  riter['return'] = function () {
	    SAFE_CLOSING = true;
	  };
	  Array.from(riter, function () {
	    throw 2;
	  });
	} catch (e) {/* empty */}
	
	module.exports = function (exec, skipClosing) {
	  if (!skipClosing && !SAFE_CLOSING) return false;
	  var safe = false;
	  try {
	    var arr = [7],
	        iter = arr[ITERATOR]();
	    iter.next = function () {
	      return { done: safe = true };
	    };
	    arr[ITERATOR] = function () {
	      return iter;
	    };
	    exec(arr);
	  } catch (e) {/* empty */}
	  return safe;
	};

/***/ },
/* 167 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var $export = __webpack_require__(8),
	    createProperty = __webpack_require__(164);
	
	// WebKit Array.of isn't generic
	$export($export.S + $export.F * __webpack_require__(7)(function () {
	  function F() {}
	  return !(Array.of.call(F) instanceof F);
	}), 'Array', {
	  // 22.1.2.3 Array.of( ...items)
	  of: function of() /* ...args */{
	    var index = 0,
	        aLen = arguments.length,
	        result = new (typeof this == 'function' ? this : Array)(aLen);
	    while (aLen > index) {
	      createProperty(result, index, arguments[index++]);
	    }result.length = aLen;
	    return result;
	  }
	});

/***/ },
/* 168 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// 22.1.3.13 Array.prototype.join(separator)
	
	var $export = __webpack_require__(8),
	    toIObject = __webpack_require__(32),
	    arrayJoin = [].join;
	
	// fallback for not array-like strings
	$export($export.P + $export.F * (__webpack_require__(33) != Object || !__webpack_require__(169)(arrayJoin)), 'Array', {
	  join: function join(separator) {
	    return arrayJoin.call(toIObject(this), separator === undefined ? ',' : separator);
	  }
	});

/***/ },
/* 169 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var fails = __webpack_require__(7);
	
	module.exports = function (method, arg) {
	  return !!method && fails(function () {
	    arg ? method.call(null, function () {}, 1) : method.call(null);
	  });
	};

/***/ },
/* 170 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var $export = __webpack_require__(8),
	    html = __webpack_require__(48),
	    cof = __webpack_require__(34),
	    toIndex = __webpack_require__(39),
	    toLength = __webpack_require__(37),
	    arraySlice = [].slice;
	
	// fallback for not array-like ES3 strings and DOM objects
	$export($export.P + $export.F * __webpack_require__(7)(function () {
	  if (html) arraySlice.call(html);
	}), 'Array', {
	  slice: function slice(begin, end) {
	    var len = toLength(this.length),
	        klass = cof(this);
	    end = end === undefined ? len : end;
	    if (klass == 'Array') return arraySlice.call(this, begin, end);
	    var start = toIndex(begin, len),
	        upTo = toIndex(end, len),
	        size = toLength(upTo - start),
	        cloned = Array(size),
	        i = 0;
	    for (; i < size; i++) {
	      cloned[i] = klass == 'String' ? this.charAt(start + i) : this[start + i];
	    }return cloned;
	  }
	});

/***/ },
/* 171 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var $export = __webpack_require__(8),
	    aFunction = __webpack_require__(21),
	    toObject = __webpack_require__(58),
	    fails = __webpack_require__(7),
	    $sort = [].sort,
	    test = [1, 2, 3];
	
	$export($export.P + $export.F * (fails(function () {
	  // IE8-
	  test.sort(undefined);
	}) || !fails(function () {
	  // V8 bug
	  test.sort(null);
	  // Old WebKit
	}) || !__webpack_require__(169)($sort)), 'Array', {
	  // 22.1.3.25 Array.prototype.sort(comparefn)
	  sort: function sort(comparefn) {
	    return comparefn === undefined ? $sort.call(toObject(this)) : $sort.call(toObject(this), aFunction(comparefn));
	  }
	});

/***/ },
/* 172 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var $export = __webpack_require__(8),
	    $forEach = __webpack_require__(173)(0),
	    STRICT = __webpack_require__(169)([].forEach, true);
	
	$export($export.P + $export.F * !STRICT, 'Array', {
	  // 22.1.3.10 / 15.4.4.18 Array.prototype.forEach(callbackfn [, thisArg])
	  forEach: function forEach(callbackfn /* , thisArg */) {
	    return $forEach(this, callbackfn, arguments[1]);
	  }
	});

/***/ },
/* 173 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	// 0 -> Array#forEach
	// 1 -> Array#map
	// 2 -> Array#filter
	// 3 -> Array#some
	// 4 -> Array#every
	// 5 -> Array#find
	// 6 -> Array#findIndex
	var ctx = __webpack_require__(20),
	    IObject = __webpack_require__(33),
	    toObject = __webpack_require__(58),
	    toLength = __webpack_require__(37),
	    asc = __webpack_require__(174);
	module.exports = function (TYPE, $create) {
	  var IS_MAP = TYPE == 1,
	      IS_FILTER = TYPE == 2,
	      IS_SOME = TYPE == 3,
	      IS_EVERY = TYPE == 4,
	      IS_FIND_INDEX = TYPE == 6,
	      NO_HOLES = TYPE == 5 || IS_FIND_INDEX,
	      create = $create || asc;
	  return function ($this, callbackfn, that) {
	    var O = toObject($this),
	        self = IObject(O),
	        f = ctx(callbackfn, that, 3),
	        length = toLength(self.length),
	        index = 0,
	        result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined,
	        val,
	        res;
	    for (; length > index; index++) {
	      if (NO_HOLES || index in self) {
	        val = self[index];
	        res = f(val, index, O);
	        if (TYPE) {
	          if (IS_MAP) result[index] = res; // map
	          else if (res) switch (TYPE) {
	              case 3:
	                return true; // some
	              case 5:
	                return val; // find
	              case 6:
	                return index; // findIndex
	              case 2:
	                result.push(val); // filter
	            } else if (IS_EVERY) return false; // every
	        }
	      }
	    }return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
	  };
	};

/***/ },
/* 174 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	// 9.4.2.3 ArraySpeciesCreate(originalArray, length)
	var speciesConstructor = __webpack_require__(175);
	
	module.exports = function (original, length) {
	  return new (speciesConstructor(original))(length);
	};

/***/ },
/* 175 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var isObject = __webpack_require__(13),
	    isArray = __webpack_require__(45),
	    SPECIES = __webpack_require__(25)('species');
	
	module.exports = function (original) {
	  var C;
	  if (isArray(original)) {
	    C = original.constructor;
	    // cross-realm fallback
	    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
	    if (isObject(C)) {
	      C = C[SPECIES];
	      if (C === null) C = undefined;
	    }
	  }return C === undefined ? Array : C;
	};

/***/ },
/* 176 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var $export = __webpack_require__(8),
	    $map = __webpack_require__(173)(1);
	
	$export($export.P + $export.F * !__webpack_require__(169)([].map, true), 'Array', {
	  // 22.1.3.15 / 15.4.4.19 Array.prototype.map(callbackfn [, thisArg])
	  map: function map(callbackfn /* , thisArg */) {
	    return $map(this, callbackfn, arguments[1]);
	  }
	});

/***/ },
/* 177 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var $export = __webpack_require__(8),
	    $filter = __webpack_require__(173)(2);
	
	$export($export.P + $export.F * !__webpack_require__(169)([].filter, true), 'Array', {
	  // 22.1.3.7 / 15.4.4.20 Array.prototype.filter(callbackfn [, thisArg])
	  filter: function filter(callbackfn /* , thisArg */) {
	    return $filter(this, callbackfn, arguments[1]);
	  }
	});

/***/ },
/* 178 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var $export = __webpack_require__(8),
	    $some = __webpack_require__(173)(3);
	
	$export($export.P + $export.F * !__webpack_require__(169)([].some, true), 'Array', {
	  // 22.1.3.23 / 15.4.4.17 Array.prototype.some(callbackfn [, thisArg])
	  some: function some(callbackfn /* , thisArg */) {
	    return $some(this, callbackfn, arguments[1]);
	  }
	});

/***/ },
/* 179 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var $export = __webpack_require__(8),
	    $every = __webpack_require__(173)(4);
	
	$export($export.P + $export.F * !__webpack_require__(169)([].every, true), 'Array', {
	  // 22.1.3.5 / 15.4.4.16 Array.prototype.every(callbackfn [, thisArg])
	  every: function every(callbackfn /* , thisArg */) {
	    return $every(this, callbackfn, arguments[1]);
	  }
	});

/***/ },
/* 180 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var $export = __webpack_require__(8),
	    $reduce = __webpack_require__(181);
	
	$export($export.P + $export.F * !__webpack_require__(169)([].reduce, true), 'Array', {
	  // 22.1.3.18 / 15.4.4.21 Array.prototype.reduce(callbackfn [, initialValue])
	  reduce: function reduce(callbackfn /* , initialValue */) {
	    return $reduce(this, callbackfn, arguments.length, arguments[1], false);
	  }
	});

/***/ },
/* 181 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var aFunction = __webpack_require__(21),
	    toObject = __webpack_require__(58),
	    IObject = __webpack_require__(33),
	    toLength = __webpack_require__(37);
	
	module.exports = function (that, callbackfn, aLen, memo, isRight) {
	  aFunction(callbackfn);
	  var O = toObject(that),
	      self = IObject(O),
	      length = toLength(O.length),
	      index = isRight ? length - 1 : 0,
	      i = isRight ? -1 : 1;
	  if (aLen < 2) for (;;) {
	    if (index in self) {
	      memo = self[index];
	      index += i;
	      break;
	    }
	    index += i;
	    if (isRight ? index < 0 : length <= index) {
	      throw TypeError('Reduce of empty array with no initial value');
	    }
	  }
	  for (; isRight ? index >= 0 : length > index; index += i) {
	    if (index in self) {
	      memo = callbackfn(memo, self[index], index, O);
	    }
	  }return memo;
	};

/***/ },
/* 182 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var $export = __webpack_require__(8),
	    $reduce = __webpack_require__(181);
	
	$export($export.P + $export.F * !__webpack_require__(169)([].reduceRight, true), 'Array', {
	  // 22.1.3.19 / 15.4.4.22 Array.prototype.reduceRight(callbackfn [, initialValue])
	  reduceRight: function reduceRight(callbackfn /* , initialValue */) {
	    return $reduce(this, callbackfn, arguments.length, arguments[1], true);
	  }
	});

/***/ },
/* 183 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var $export = __webpack_require__(8),
	    $indexOf = __webpack_require__(36)(false),
	    $native = [].indexOf,
	    NEGATIVE_ZERO = !!$native && 1 / [1].indexOf(1, -0) < 0;
	
	$export($export.P + $export.F * (NEGATIVE_ZERO || !__webpack_require__(169)($native)), 'Array', {
	  // 22.1.3.11 / 15.4.4.14 Array.prototype.indexOf(searchElement [, fromIndex])
	  indexOf: function indexOf(searchElement /*, fromIndex = 0 */) {
	    return NEGATIVE_ZERO
	    // convert -0 to +0
	    ? $native.apply(this, arguments) || 0 : $indexOf(this, searchElement, arguments[1]);
	  }
	});

/***/ },
/* 184 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var $export = __webpack_require__(8),
	    toIObject = __webpack_require__(32),
	    toInteger = __webpack_require__(38),
	    toLength = __webpack_require__(37),
	    $native = [].lastIndexOf,
	    NEGATIVE_ZERO = !!$native && 1 / [1].lastIndexOf(1, -0) < 0;
	
	$export($export.P + $export.F * (NEGATIVE_ZERO || !__webpack_require__(169)($native)), 'Array', {
	  // 22.1.3.14 / 15.4.4.15 Array.prototype.lastIndexOf(searchElement [, fromIndex])
	  lastIndexOf: function lastIndexOf(searchElement /*, fromIndex = @[*-1] */) {
	    // convert -0 to +0
	    if (NEGATIVE_ZERO) return $native.apply(this, arguments) || 0;
	    var O = toIObject(this),
	        length = toLength(O.length),
	        index = length - 1;
	    if (arguments.length > 1) index = Math.min(index, toInteger(arguments[1]));
	    if (index < 0) index = length + index;
	    for (; index >= 0; index--) {
	      if (index in O) if (O[index] === searchElement) return index || 0;
	    }return -1;
	  }
	});

/***/ },
/* 185 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	// 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)
	var $export = __webpack_require__(8);
	
	$export($export.P, 'Array', { copyWithin: __webpack_require__(186) });
	
	__webpack_require__(187)('copyWithin');

/***/ },
/* 186 */
/***/ function(module, exports, __webpack_require__) {

	// 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)
	'use strict';
	
	var toObject = __webpack_require__(58),
	    toIndex = __webpack_require__(39),
	    toLength = __webpack_require__(37);
	
	module.exports = [].copyWithin || function copyWithin(target /*= 0*/, start /*= 0, end = @length*/) {
	  var O = toObject(this),
	      len = toLength(O.length),
	      to = toIndex(target, len),
	      from = toIndex(start, len),
	      end = arguments.length > 2 ? arguments[2] : undefined,
	      count = Math.min((end === undefined ? len : toIndex(end, len)) - from, len - to),
	      inc = 1;
	  if (from < to && to < from + count) {
	    inc = -1;
	    from += count - 1;
	    to += count - 1;
	  }
	  while (count-- > 0) {
	    if (from in O) O[to] = O[from];else delete O[to];
	    to += inc;
	    from += inc;
	  }return O;
	};

/***/ },
/* 187 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	// 22.1.3.31 Array.prototype[@@unscopables]
	var UNSCOPABLES = __webpack_require__(25)('unscopables'),
	    ArrayProto = Array.prototype;
	if (ArrayProto[UNSCOPABLES] == undefined) __webpack_require__(10)(ArrayProto, UNSCOPABLES, {});
	module.exports = function (key) {
	  ArrayProto[UNSCOPABLES][key] = true;
	};

/***/ },
/* 188 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	// 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)
	var $export = __webpack_require__(8);
	
	$export($export.P, 'Array', { fill: __webpack_require__(189) });
	
	__webpack_require__(187)('fill');

/***/ },
/* 189 */
/***/ function(module, exports, __webpack_require__) {

	// 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)
	'use strict';
	
	var toObject = __webpack_require__(58),
	    toIndex = __webpack_require__(39),
	    toLength = __webpack_require__(37);
	module.exports = function fill(value /*, start = 0, end = @length */) {
	  var O = toObject(this),
	      length = toLength(O.length),
	      aLen = arguments.length,
	      index = toIndex(aLen > 1 ? arguments[1] : undefined, length),
	      end = aLen > 2 ? arguments[2] : undefined,
	      endPos = end === undefined ? length : toIndex(end, length);
	  while (endPos > index) {
	    O[index++] = value;
	  }return O;
	};

/***/ },
/* 190 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// 22.1.3.8 Array.prototype.find(predicate, thisArg = undefined)
	
	var $export = __webpack_require__(8),
	    $find = __webpack_require__(173)(5),
	    KEY = 'find',
	    forced = true;
	// Shouldn't skip holes
	if (KEY in []) Array(1)[KEY](function () {
	  forced = false;
	});
	$export($export.P + $export.F * forced, 'Array', {
	  find: function find(callbackfn /*, that = undefined */) {
	    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});
	__webpack_require__(187)(KEY);

/***/ },
/* 191 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// 22.1.3.9 Array.prototype.findIndex(predicate, thisArg = undefined)
	
	var $export = __webpack_require__(8),
	    $find = __webpack_require__(173)(6),
	    KEY = 'findIndex',
	    forced = true;
	// Shouldn't skip holes
	if (KEY in []) Array(1)[KEY](function () {
	  forced = false;
	});
	$export($export.P + $export.F * forced, 'Array', {
	  findIndex: function findIndex(callbackfn /*, that = undefined */) {
	    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});
	__webpack_require__(187)(KEY);

/***/ },
/* 192 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(193)('Array');

/***/ },
/* 193 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var global = __webpack_require__(4),
	    dP = __webpack_require__(11),
	    DESCRIPTORS = __webpack_require__(6),
	    SPECIES = __webpack_require__(25)('species');
	
	module.exports = function (KEY) {
	  var C = global[KEY];
	  if (DESCRIPTORS && C && !C[SPECIES]) dP.f(C, SPECIES, {
	    configurable: true,
	    get: function get() {
	      return this;
	    }
	  });
	};

/***/ },
/* 194 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var addToUnscopables = __webpack_require__(187),
	    step = __webpack_require__(195),
	    Iterators = __webpack_require__(130),
	    toIObject = __webpack_require__(32);
	
	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	module.exports = __webpack_require__(129)(Array, 'Array', function (iterated, kind) {
	  this._t = toIObject(iterated); // target
	  this._i = 0; // next index
	  this._k = kind; // kind
	  // 22.1.5.2.1 %ArrayIteratorPrototype%.next()
	}, function () {
	  var O = this._t,
	      kind = this._k,
	      index = this._i++;
	  if (!O || index >= O.length) {
	    this._t = undefined;
	    return step(1);
	  }
	  if (kind == 'keys') return step(0, index);
	  if (kind == 'values') return step(0, O[index]);
	  return step(0, [index, O[index]]);
	}, 'values');
	
	// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
	Iterators.Arguments = Iterators.Array;
	
	addToUnscopables('keys');
	addToUnscopables('values');
	addToUnscopables('entries');

/***/ },
/* 195 */
/***/ function(module, exports) {

	"use strict";
	
	module.exports = function (done, value) {
	  return { value: value, done: !!done };
	};

/***/ },
/* 196 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var global = __webpack_require__(4),
	    inheritIfRequired = __webpack_require__(88),
	    dP = __webpack_require__(11).f,
	    gOPN = __webpack_require__(50).f,
	    isRegExp = __webpack_require__(135),
	    $flags = __webpack_require__(197),
	    $RegExp = global.RegExp,
	    Base = $RegExp,
	    proto = $RegExp.prototype,
	    re1 = /a/g,
	    re2 = /a/g
	// "new" creates a new object, old webkit buggy here
	,
	    CORRECT_NEW = new $RegExp(re1) !== re1;
	
	if (__webpack_require__(6) && (!CORRECT_NEW || __webpack_require__(7)(function () {
	  re2[__webpack_require__(25)('match')] = false;
	  // RegExp constructor can alter flags and IsRegExp works correct with @@match
	  return $RegExp(re1) != re1 || $RegExp(re2) == re2 || $RegExp(re1, 'i') != '/a/i';
	}))) {
	  $RegExp = function RegExp(p, f) {
	    var tiRE = this instanceof $RegExp,
	        piRE = isRegExp(p),
	        fiU = f === undefined;
	    return !tiRE && piRE && p.constructor === $RegExp && fiU ? p : inheritIfRequired(CORRECT_NEW ? new Base(piRE && !fiU ? p.source : p, f) : Base((piRE = p instanceof $RegExp) ? p.source : p, piRE && fiU ? $flags.call(p) : f), tiRE ? this : proto, $RegExp);
	  };
	  var proxy = function proxy(key) {
	    key in $RegExp || dP($RegExp, key, {
	      configurable: true,
	      get: function get() {
	        return Base[key];
	      },
	      set: function set(it) {
	        Base[key] = it;
	      }
	    });
	  };
	  for (var keys = gOPN(Base), i = 0; keys.length > i;) {
	    proxy(keys[i++]);
	  }proto.constructor = $RegExp;
	  $RegExp.prototype = proto;
	  __webpack_require__(18)(global, 'RegExp', $RegExp);
	}
	
	__webpack_require__(193)('RegExp');

/***/ },
/* 197 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// 21.2.5.3 get RegExp.prototype.flags
	
	var anObject = __webpack_require__(12);
	module.exports = function () {
	  var that = anObject(this),
	      result = '';
	  if (that.global) result += 'g';
	  if (that.ignoreCase) result += 'i';
	  if (that.multiline) result += 'm';
	  if (that.unicode) result += 'u';
	  if (that.sticky) result += 'y';
	  return result;
	};

/***/ },
/* 198 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(199);
	var anObject = __webpack_require__(12),
	    $flags = __webpack_require__(197),
	    DESCRIPTORS = __webpack_require__(6),
	    TO_STRING = 'toString',
	    $toString = /./[TO_STRING];
	
	var define = function define(fn) {
	  __webpack_require__(18)(RegExp.prototype, TO_STRING, fn, true);
	};
	
	// 21.2.5.14 RegExp.prototype.toString()
	if (__webpack_require__(7)(function () {
	  return $toString.call({ source: 'a', flags: 'b' }) != '/a/b';
	})) {
	  define(function toString() {
	    var R = anObject(this);
	    return '/'.concat(R.source, '/', 'flags' in R ? R.flags : !DESCRIPTORS && R instanceof RegExp ? $flags.call(R) : undefined);
	  });
	  // FF44- RegExp#toString has a wrong name
	} else if ($toString.name != TO_STRING) {
	    define(function toString() {
	      return $toString.call(this);
	    });
	  }

/***/ },
/* 199 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	// 21.2.5.3 get RegExp.prototype.flags()
	if (__webpack_require__(6) && /./g.flags != 'g') __webpack_require__(11).f(RegExp.prototype, 'flags', {
	  configurable: true,
	  get: __webpack_require__(197)
	});

/***/ },
/* 200 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	// @@match logic
	__webpack_require__(201)('match', 1, function (defined, MATCH, $match) {
	  // 21.1.3.11 String.prototype.match(regexp)
	  return [function match(regexp) {
	    'use strict';
	
	    var O = defined(this),
	        fn = regexp == undefined ? undefined : regexp[MATCH];
	    return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[MATCH](String(O));
	  }, $match];
	});

/***/ },
/* 201 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var hide = __webpack_require__(10),
	    redefine = __webpack_require__(18),
	    fails = __webpack_require__(7),
	    defined = __webpack_require__(35),
	    wks = __webpack_require__(25);
	
	module.exports = function (KEY, length, exec) {
	  var SYMBOL = wks(KEY),
	      fns = exec(defined, SYMBOL, ''[KEY]),
	      strfn = fns[0],
	      rxfn = fns[1];
	  if (fails(function () {
	    var O = {};
	    O[SYMBOL] = function () {
	      return 7;
	    };
	    return ''[KEY](O) != 7;
	  })) {
	    redefine(String.prototype, KEY, strfn);
	    hide(RegExp.prototype, SYMBOL, length == 2
	    // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
	    // 21.2.5.11 RegExp.prototype[@@split](string, limit)
	    ? function (string, arg) {
	      return rxfn.call(string, this, arg);
	    }
	    // 21.2.5.6 RegExp.prototype[@@match](string)
	    // 21.2.5.9 RegExp.prototype[@@search](string)
	    : function (string) {
	      return rxfn.call(string, this);
	    });
	  }
	};

/***/ },
/* 202 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	// @@replace logic
	__webpack_require__(201)('replace', 2, function (defined, REPLACE, $replace) {
	  // 21.1.3.14 String.prototype.replace(searchValue, replaceValue)
	  return [function replace(searchValue, replaceValue) {
	    'use strict';
	
	    var O = defined(this),
	        fn = searchValue == undefined ? undefined : searchValue[REPLACE];
	    return fn !== undefined ? fn.call(searchValue, O, replaceValue) : $replace.call(String(O), searchValue, replaceValue);
	  }, $replace];
	});

/***/ },
/* 203 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	// @@search logic
	__webpack_require__(201)('search', 1, function (defined, SEARCH, $search) {
	  // 21.1.3.15 String.prototype.search(regexp)
	  return [function search(regexp) {
	    'use strict';
	
	    var O = defined(this),
	        fn = regexp == undefined ? undefined : regexp[SEARCH];
	    return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[SEARCH](String(O));
	  }, $search];
	});

/***/ },
/* 204 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	// @@split logic
	__webpack_require__(201)('split', 2, function (defined, SPLIT, $split) {
	  'use strict';
	
	  var isRegExp = __webpack_require__(135),
	      _split = $split,
	      $push = [].push,
	      $SPLIT = 'split',
	      LENGTH = 'length',
	      LAST_INDEX = 'lastIndex';
	  if ('abbc'[$SPLIT](/(b)*/)[1] == 'c' || 'test'[$SPLIT](/(?:)/, -1)[LENGTH] != 4 || 'ab'[$SPLIT](/(?:ab)*/)[LENGTH] != 2 || '.'[$SPLIT](/(.?)(.?)/)[LENGTH] != 4 || '.'[$SPLIT](/()()/)[LENGTH] > 1 || ''[$SPLIT](/.?/)[LENGTH]) {
	    var NPCG = /()??/.exec('')[1] === undefined; // nonparticipating capturing group
	    // based on es5-shim implementation, need to rework it
	    $split = function $split(separator, limit) {
	      var string = String(this);
	      if (separator === undefined && limit === 0) return [];
	      // If `separator` is not a regex, use native split
	      if (!isRegExp(separator)) return _split.call(string, separator, limit);
	      var output = [];
	      var flags = (separator.ignoreCase ? 'i' : '') + (separator.multiline ? 'm' : '') + (separator.unicode ? 'u' : '') + (separator.sticky ? 'y' : '');
	      var lastLastIndex = 0;
	      var splitLimit = limit === undefined ? 4294967295 : limit >>> 0;
	      // Make `global` and avoid `lastIndex` issues by working with a copy
	      var separatorCopy = new RegExp(separator.source, flags + 'g');
	      var separator2, match, lastIndex, lastLength, i;
	      // Doesn't need flags gy, but they don't hurt
	      if (!NPCG) separator2 = new RegExp('^' + separatorCopy.source + '$(?!\\s)', flags);
	      while (match = separatorCopy.exec(string)) {
	        // `separatorCopy.lastIndex` is not reliable cross-browser
	        lastIndex = match.index + match[0][LENGTH];
	        if (lastIndex > lastLastIndex) {
	          output.push(string.slice(lastLastIndex, match.index));
	          // Fix browsers whose `exec` methods don't consistently return `undefined` for NPCG
	          if (!NPCG && match[LENGTH] > 1) match[0].replace(separator2, function () {
	            for (i = 1; i < arguments[LENGTH] - 2; i++) {
	              if (arguments[i] === undefined) match[i] = undefined;
	            }
	          });
	          if (match[LENGTH] > 1 && match.index < string[LENGTH]) $push.apply(output, match.slice(1));
	          lastLength = match[0][LENGTH];
	          lastLastIndex = lastIndex;
	          if (output[LENGTH] >= splitLimit) break;
	        }
	        if (separatorCopy[LAST_INDEX] === match.index) separatorCopy[LAST_INDEX]++; // Avoid an infinite loop
	      }
	      if (lastLastIndex === string[LENGTH]) {
	        if (lastLength || !separatorCopy.test('')) output.push('');
	      } else output.push(string.slice(lastLastIndex));
	      return output[LENGTH] > splitLimit ? output.slice(0, splitLimit) : output;
	    };
	    // Chakra, V8
	  } else if ('0'[$SPLIT](undefined, 0)[LENGTH]) {
	      $split = function $split(separator, limit) {
	        return separator === undefined && limit === 0 ? [] : _split.call(this, separator, limit);
	      };
	    }
	  // 21.1.3.17 String.prototype.split(separator, limit)
	  return [function split(separator, limit) {
	    var O = defined(this),
	        fn = separator == undefined ? undefined : separator[SPLIT];
	    return fn !== undefined ? fn.call(separator, O, limit) : $split.call(String(O), separator, limit);
	  }, $split];
	});

/***/ },
/* 205 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var LIBRARY = __webpack_require__(28),
	    global = __webpack_require__(4),
	    ctx = __webpack_require__(20),
	    classof = __webpack_require__(75),
	    $export = __webpack_require__(8),
	    isObject = __webpack_require__(13),
	    anObject = __webpack_require__(12),
	    aFunction = __webpack_require__(21),
	    anInstance = __webpack_require__(90),
	    forOf = __webpack_require__(206),
	    setProto = __webpack_require__(73).set,
	    speciesConstructor = __webpack_require__(207),
	    task = __webpack_require__(208).set,
	    microtask = __webpack_require__(209)(),
	    PROMISE = 'Promise',
	    TypeError = global.TypeError,
	    process = global.process,
	    $Promise = global[PROMISE],
	    process = global.process,
	    isNode = classof(process) == 'process',
	    empty = function empty() {/* empty */},
	    Internal,
	    GenericPromiseCapability,
	    Wrapper;
	
	var USE_NATIVE = !!function () {
	  try {
	    // correct subclassing with @@species support
	    var promise = $Promise.resolve(1),
	        FakePromise = (promise.constructor = {})[__webpack_require__(25)('species')] = function (exec) {
	      exec(empty, empty);
	    };
	    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
	    return (isNode || typeof PromiseRejectionEvent == 'function') && promise.then(empty) instanceof FakePromise;
	  } catch (e) {/* empty */}
	}();
	
	// helpers
	var sameConstructor = function sameConstructor(a, b) {
	  // with library wrapper special case
	  return a === b || a === $Promise && b === Wrapper;
	};
	var isThenable = function isThenable(it) {
	  var then;
	  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
	};
	var newPromiseCapability = function newPromiseCapability(C) {
	  return sameConstructor($Promise, C) ? new PromiseCapability(C) : new GenericPromiseCapability(C);
	};
	var PromiseCapability = GenericPromiseCapability = function GenericPromiseCapability(C) {
	  var resolve, reject;
	  this.promise = new C(function ($$resolve, $$reject) {
	    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
	    resolve = $$resolve;
	    reject = $$reject;
	  });
	  this.resolve = aFunction(resolve);
	  this.reject = aFunction(reject);
	};
	var perform = function perform(exec) {
	  try {
	    exec();
	  } catch (e) {
	    return { error: e };
	  }
	};
	var notify = function notify(promise, isReject) {
	  if (promise._n) return;
	  promise._n = true;
	  var chain = promise._c;
	  microtask(function () {
	    var value = promise._v,
	        ok = promise._s == 1,
	        i = 0;
	    var run = function run(reaction) {
	      var handler = ok ? reaction.ok : reaction.fail,
	          resolve = reaction.resolve,
	          reject = reaction.reject,
	          domain = reaction.domain,
	          result,
	          then;
	      try {
	        if (handler) {
	          if (!ok) {
	            if (promise._h == 2) onHandleUnhandled(promise);
	            promise._h = 1;
	          }
	          if (handler === true) result = value;else {
	            if (domain) domain.enter();
	            result = handler(value);
	            if (domain) domain.exit();
	          }
	          if (result === reaction.promise) {
	            reject(TypeError('Promise-chain cycle'));
	          } else if (then = isThenable(result)) {
	            then.call(result, resolve, reject);
	          } else resolve(result);
	        } else reject(value);
	      } catch (e) {
	        reject(e);
	      }
	    };
	    while (chain.length > i) {
	      run(chain[i++]);
	    } // variable length - can't use forEach
	    promise._c = [];
	    promise._n = false;
	    if (isReject && !promise._h) onUnhandled(promise);
	  });
	};
	var onUnhandled = function onUnhandled(promise) {
	  task.call(global, function () {
	    var value = promise._v,
	        abrupt,
	        handler,
	        console;
	    if (isUnhandled(promise)) {
	      abrupt = perform(function () {
	        if (isNode) {
	          process.emit('unhandledRejection', value, promise);
	        } else if (handler = global.onunhandledrejection) {
	          handler({ promise: promise, reason: value });
	        } else if ((console = global.console) && console.error) {
	          console.error('Unhandled promise rejection', value);
	        }
	      });
	      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
	      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
	    }promise._a = undefined;
	    if (abrupt) throw abrupt.error;
	  });
	};
	var isUnhandled = function isUnhandled(promise) {
	  if (promise._h == 1) return false;
	  var chain = promise._a || promise._c,
	      i = 0,
	      reaction;
	  while (chain.length > i) {
	    reaction = chain[i++];
	    if (reaction.fail || !isUnhandled(reaction.promise)) return false;
	  }return true;
	};
	var onHandleUnhandled = function onHandleUnhandled(promise) {
	  task.call(global, function () {
	    var handler;
	    if (isNode) {
	      process.emit('rejectionHandled', promise);
	    } else if (handler = global.onrejectionhandled) {
	      handler({ promise: promise, reason: promise._v });
	    }
	  });
	};
	var $reject = function $reject(value) {
	  var promise = this;
	  if (promise._d) return;
	  promise._d = true;
	  promise = promise._w || promise; // unwrap
	  promise._v = value;
	  promise._s = 2;
	  if (!promise._a) promise._a = promise._c.slice();
	  notify(promise, true);
	};
	var $resolve = function $resolve(value) {
	  var promise = this,
	      then;
	  if (promise._d) return;
	  promise._d = true;
	  promise = promise._w || promise; // unwrap
	  try {
	    if (promise === value) throw TypeError("Promise can't be resolved itself");
	    if (then = isThenable(value)) {
	      microtask(function () {
	        var wrapper = { _w: promise, _d: false }; // wrap
	        try {
	          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
	        } catch (e) {
	          $reject.call(wrapper, e);
	        }
	      });
	    } else {
	      promise._v = value;
	      promise._s = 1;
	      notify(promise, false);
	    }
	  } catch (e) {
	    $reject.call({ _w: promise, _d: false }, e); // wrap
	  }
	};
	
	// constructor polyfill
	if (!USE_NATIVE) {
	  // 25.4.3.1 Promise(executor)
	  $Promise = function Promise(executor) {
	    anInstance(this, $Promise, PROMISE, '_h');
	    aFunction(executor);
	    Internal.call(this);
	    try {
	      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
	    } catch (err) {
	      $reject.call(this, err);
	    }
	  };
	  Internal = function Promise(executor) {
	    this._c = []; // <- awaiting reactions
	    this._a = undefined; // <- checked in isUnhandled reactions
	    this._s = 0; // <- state
	    this._d = false; // <- done
	    this._v = undefined; // <- value
	    this._h = 0; // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
	    this._n = false; // <- notify
	  };
	  Internal.prototype = __webpack_require__(210)($Promise.prototype, {
	    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
	    then: function then(onFulfilled, onRejected) {
	      var reaction = newPromiseCapability(speciesConstructor(this, $Promise));
	      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
	      reaction.fail = typeof onRejected == 'function' && onRejected;
	      reaction.domain = isNode ? process.domain : undefined;
	      this._c.push(reaction);
	      if (this._a) this._a.push(reaction);
	      if (this._s) notify(this, false);
	      return reaction.promise;
	    },
	    // 25.4.5.1 Promise.prototype.catch(onRejected)
	    'catch': function _catch(onRejected) {
	      return this.then(undefined, onRejected);
	    }
	  });
	  PromiseCapability = function PromiseCapability() {
	    var promise = new Internal();
	    this.promise = promise;
	    this.resolve = ctx($resolve, promise, 1);
	    this.reject = ctx($reject, promise, 1);
	  };
	}
	
	$export($export.G + $export.W + $export.F * !USE_NATIVE, { Promise: $Promise });
	__webpack_require__(24)($Promise, PROMISE);
	__webpack_require__(193)(PROMISE);
	Wrapper = __webpack_require__(9)[PROMISE];
	
	// statics
	$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
	  // 25.4.4.5 Promise.reject(r)
	  reject: function reject(r) {
	    var capability = newPromiseCapability(this),
	        $$reject = capability.reject;
	    $$reject(r);
	    return capability.promise;
	  }
	});
	$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
	  // 25.4.4.6 Promise.resolve(x)
	  resolve: function resolve(x) {
	    // instanceof instead of internal slot check because we should fix it without replacement native Promise core
	    if (x instanceof $Promise && sameConstructor(x.constructor, this)) return x;
	    var capability = newPromiseCapability(this),
	        $$resolve = capability.resolve;
	    $$resolve(x);
	    return capability.promise;
	  }
	});
	$export($export.S + $export.F * !(USE_NATIVE && __webpack_require__(166)(function (iter) {
	  $Promise.all(iter)['catch'](empty);
	})), PROMISE, {
	  // 25.4.4.1 Promise.all(iterable)
	  all: function all(iterable) {
	    var C = this,
	        capability = newPromiseCapability(C),
	        resolve = capability.resolve,
	        reject = capability.reject;
	    var abrupt = perform(function () {
	      var values = [],
	          index = 0,
	          remaining = 1;
	      forOf(iterable, false, function (promise) {
	        var $index = index++,
	            alreadyCalled = false;
	        values.push(undefined);
	        remaining++;
	        C.resolve(promise).then(function (value) {
	          if (alreadyCalled) return;
	          alreadyCalled = true;
	          values[$index] = value;
	          --remaining || resolve(values);
	        }, reject);
	      });
	      --remaining || resolve(values);
	    });
	    if (abrupt) reject(abrupt.error);
	    return capability.promise;
	  },
	  // 25.4.4.4 Promise.race(iterable)
	  race: function race(iterable) {
	    var C = this,
	        capability = newPromiseCapability(C),
	        reject = capability.reject;
	    var abrupt = perform(function () {
	      forOf(iterable, false, function (promise) {
	        C.resolve(promise).then(capability.resolve, reject);
	      });
	    });
	    if (abrupt) reject(abrupt.error);
	    return capability.promise;
	  }
	});

/***/ },
/* 206 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var ctx = __webpack_require__(20),
	    call = __webpack_require__(162),
	    isArrayIter = __webpack_require__(163),
	    anObject = __webpack_require__(12),
	    toLength = __webpack_require__(37),
	    getIterFn = __webpack_require__(165),
	    BREAK = {},
	    RETURN = {};
	var _exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {
	  var iterFn = ITERATOR ? function () {
	    return iterable;
	  } : getIterFn(iterable),
	      f = ctx(fn, that, entries ? 2 : 1),
	      index = 0,
	      length,
	      step,
	      iterator,
	      result;
	  if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!');
	  // fast case for arrays with default iterator
	  if (isArrayIter(iterFn)) for (length = toLength(iterable.length); length > index; index++) {
	    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
	    if (result === BREAK || result === RETURN) return result;
	  } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
	    result = call(iterator, f, step.value, entries);
	    if (result === BREAK || result === RETURN) return result;
	  }
	};
	_exports.BREAK = BREAK;
	_exports.RETURN = RETURN;

/***/ },
/* 207 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	// 7.3.20 SpeciesConstructor(O, defaultConstructor)
	var anObject = __webpack_require__(12),
	    aFunction = __webpack_require__(21),
	    SPECIES = __webpack_require__(25)('species');
	module.exports = function (O, D) {
	  var C = anObject(O).constructor,
	      S;
	  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
	};

/***/ },
/* 208 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var ctx = __webpack_require__(20),
	    invoke = __webpack_require__(78),
	    html = __webpack_require__(48),
	    cel = __webpack_require__(15),
	    global = __webpack_require__(4),
	    process = global.process,
	    setTask = global.setImmediate,
	    clearTask = global.clearImmediate,
	    MessageChannel = global.MessageChannel,
	    counter = 0,
	    queue = {},
	    ONREADYSTATECHANGE = 'onreadystatechange',
	    defer,
	    channel,
	    port;
	var run = function run() {
	  var id = +this;
	  if (queue.hasOwnProperty(id)) {
	    var fn = queue[id];
	    delete queue[id];
	    fn();
	  }
	};
	var listener = function listener(event) {
	  run.call(event.data);
	};
	// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
	if (!setTask || !clearTask) {
	  setTask = function setImmediate(fn) {
	    var args = [],
	        i = 1;
	    while (arguments.length > i) {
	      args.push(arguments[i++]);
	    }queue[++counter] = function () {
	      invoke(typeof fn == 'function' ? fn : Function(fn), args);
	    };
	    defer(counter);
	    return counter;
	  };
	  clearTask = function clearImmediate(id) {
	    delete queue[id];
	  };
	  // Node.js 0.8-
	  if (__webpack_require__(34)(process) == 'process') {
	    defer = function defer(id) {
	      process.nextTick(ctx(run, id, 1));
	    };
	    // Browsers with MessageChannel, includes WebWorkers
	  } else if (MessageChannel) {
	      channel = new MessageChannel();
	      port = channel.port2;
	      channel.port1.onmessage = listener;
	      defer = ctx(port.postMessage, port, 1);
	      // Browsers with postMessage, skip WebWorkers
	      // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
	    } else if (global.addEventListener && typeof postMessage == 'function' && !global.importScripts) {
	        defer = function defer(id) {
	          global.postMessage(id + '', '*');
	        };
	        global.addEventListener('message', listener, false);
	        // IE8-
	      } else if (ONREADYSTATECHANGE in cel('script')) {
	          defer = function defer(id) {
	            html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function () {
	              html.removeChild(this);
	              run.call(id);
	            };
	          };
	          // Rest old browsers
	        } else {
	            defer = function defer(id) {
	              setTimeout(ctx(run, id, 1), 0);
	            };
	          }
	}
	module.exports = {
	  set: setTask,
	  clear: clearTask
	};

/***/ },
/* 209 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var global = __webpack_require__(4),
	    macrotask = __webpack_require__(208).set,
	    Observer = global.MutationObserver || global.WebKitMutationObserver,
	    process = global.process,
	    Promise = global.Promise,
	    isNode = __webpack_require__(34)(process) == 'process';
	
	module.exports = function () {
	  var head, last, notify;
	
	  var flush = function flush() {
	    var parent, fn;
	    if (isNode && (parent = process.domain)) parent.exit();
	    while (head) {
	      fn = head.fn;
	      head = head.next;
	      try {
	        fn();
	      } catch (e) {
	        if (head) notify();else last = undefined;
	        throw e;
	      }
	    }last = undefined;
	    if (parent) parent.enter();
	  };
	
	  // Node.js
	  if (isNode) {
	    notify = function notify() {
	      process.nextTick(flush);
	    };
	    // browsers with MutationObserver
	  } else if (Observer) {
	      var toggle = true,
	          node = document.createTextNode('');
	      new Observer(flush).observe(node, { characterData: true }); // eslint-disable-line no-new
	      notify = function notify() {
	        node.data = toggle = !toggle;
	      };
	      // environments with maybe non-completely correct, but existent Promise
	    } else if (Promise && Promise.resolve) {
	        var promise = Promise.resolve();
	        notify = function notify() {
	          promise.then(flush);
	        };
	        // for other environments - macrotask based on:
	        // - setImmediate
	        // - MessageChannel
	        // - window.postMessag
	        // - onreadystatechange
	        // - setTimeout
	      } else {
	          notify = function notify() {
	            // strange IE + webpack dev server bug - use .call(global)
	            macrotask.call(global, flush);
	          };
	        }
	
	  return function (fn) {
	    var task = { fn: fn, next: undefined };
	    if (last) last.next = task;
	    if (!head) {
	      head = task;
	      notify();
	    }last = task;
	  };
	};

/***/ },
/* 210 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var redefine = __webpack_require__(18);
	module.exports = function (target, src, safe) {
	  for (var key in src) {
	    redefine(target, key, src[key], safe);
	  }return target;
	};

/***/ },
/* 211 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var strong = __webpack_require__(212);
	
	// 23.1 Map Objects
	module.exports = __webpack_require__(213)('Map', function (get) {
	  return function Map() {
	    return get(this, arguments.length > 0 ? arguments[0] : undefined);
	  };
	}, {
	  // 23.1.3.6 Map.prototype.get(key)
	  get: function get(key) {
	    var entry = strong.getEntry(this, key);
	    return entry && entry.v;
	  },
	  // 23.1.3.9 Map.prototype.set(key, value)
	  set: function set(key, value) {
	    return strong.def(this, key === 0 ? 0 : key, value);
	  }
	}, strong, true);

/***/ },
/* 212 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var dP = __webpack_require__(11).f,
	    create = __webpack_require__(46),
	    hide = __webpack_require__(10),
	    redefineAll = __webpack_require__(210),
	    ctx = __webpack_require__(20),
	    anInstance = __webpack_require__(90),
	    defined = __webpack_require__(35),
	    forOf = __webpack_require__(206),
	    $iterDefine = __webpack_require__(129),
	    step = __webpack_require__(195),
	    setSpecies = __webpack_require__(193),
	    DESCRIPTORS = __webpack_require__(6),
	    fastKey = __webpack_require__(22).fastKey,
	    SIZE = DESCRIPTORS ? '_s' : 'size';
	
	var getEntry = function getEntry(that, key) {
	  // fast case
	  var index = fastKey(key),
	      entry;
	  if (index !== 'F') return that._i[index];
	  // frozen object case
	  for (entry = that._f; entry; entry = entry.n) {
	    if (entry.k == key) return entry;
	  }
	};
	
	module.exports = {
	  getConstructor: function getConstructor(wrapper, NAME, IS_MAP, ADDER) {
	    var C = wrapper(function (that, iterable) {
	      anInstance(that, C, NAME, '_i');
	      that._i = create(null); // index
	      that._f = undefined; // first entry
	      that._l = undefined; // last entry
	      that[SIZE] = 0; // size
	      if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
	    });
	    redefineAll(C.prototype, {
	      // 23.1.3.1 Map.prototype.clear()
	      // 23.2.3.2 Set.prototype.clear()
	      clear: function clear() {
	        for (var that = this, data = that._i, entry = that._f; entry; entry = entry.n) {
	          entry.r = true;
	          if (entry.p) entry.p = entry.p.n = undefined;
	          delete data[entry.i];
	        }
	        that._f = that._l = undefined;
	        that[SIZE] = 0;
	      },
	      // 23.1.3.3 Map.prototype.delete(key)
	      // 23.2.3.4 Set.prototype.delete(value)
	      'delete': function _delete(key) {
	        var that = this,
	            entry = getEntry(that, key);
	        if (entry) {
	          var next = entry.n,
	              prev = entry.p;
	          delete that._i[entry.i];
	          entry.r = true;
	          if (prev) prev.n = next;
	          if (next) next.p = prev;
	          if (that._f == entry) that._f = next;
	          if (that._l == entry) that._l = prev;
	          that[SIZE]--;
	        }return !!entry;
	      },
	      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
	      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
	      forEach: function forEach(callbackfn /*, that = undefined */) {
	        anInstance(this, C, 'forEach');
	        var f = ctx(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3),
	            entry;
	        while (entry = entry ? entry.n : this._f) {
	          f(entry.v, entry.k, this);
	          // revert to the last existing entry
	          while (entry && entry.r) {
	            entry = entry.p;
	          }
	        }
	      },
	      // 23.1.3.7 Map.prototype.has(key)
	      // 23.2.3.7 Set.prototype.has(value)
	      has: function has(key) {
	        return !!getEntry(this, key);
	      }
	    });
	    if (DESCRIPTORS) dP(C.prototype, 'size', {
	      get: function get() {
	        return defined(this[SIZE]);
	      }
	    });
	    return C;
	  },
	  def: function def(that, key, value) {
	    var entry = getEntry(that, key),
	        prev,
	        index;
	    // change existing entry
	    if (entry) {
	      entry.v = value;
	      // create new entry
	    } else {
	        that._l = entry = {
	          i: index = fastKey(key, true), // <- index
	          k: key, // <- key
	          v: value, // <- value
	          p: prev = that._l, // <- previous entry
	          n: undefined, // <- next entry
	          r: false // <- removed
	        };
	        if (!that._f) that._f = entry;
	        if (prev) prev.n = entry;
	        that[SIZE]++;
	        // add to index
	        if (index !== 'F') that._i[index] = entry;
	      }return that;
	  },
	  getEntry: getEntry,
	  setStrong: function setStrong(C, NAME, IS_MAP) {
	    // add .keys, .values, .entries, [@@iterator]
	    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
	    $iterDefine(C, NAME, function (iterated, kind) {
	      this._t = iterated; // target
	      this._k = kind; // kind
	      this._l = undefined; // previous
	    }, function () {
	      var that = this,
	          kind = that._k,
	          entry = that._l;
	      // revert to the last existing entry
	      while (entry && entry.r) {
	        entry = entry.p;
	      } // get next entry
	      if (!that._t || !(that._l = entry = entry ? entry.n : that._t._f)) {
	        // or finish the iteration
	        that._t = undefined;
	        return step(1);
	      }
	      // return step by kind
	      if (kind == 'keys') return step(0, entry.k);
	      if (kind == 'values') return step(0, entry.v);
	      return step(0, [entry.k, entry.v]);
	    }, IS_MAP ? 'entries' : 'values', !IS_MAP, true);
	
	    // add [@@species], 23.1.2.2, 23.2.2.2
	    setSpecies(NAME);
	  }
	};

/***/ },
/* 213 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var global = __webpack_require__(4),
	    $export = __webpack_require__(8),
	    redefine = __webpack_require__(18),
	    redefineAll = __webpack_require__(210),
	    meta = __webpack_require__(22),
	    forOf = __webpack_require__(206),
	    anInstance = __webpack_require__(90),
	    isObject = __webpack_require__(13),
	    fails = __webpack_require__(7),
	    $iterDetect = __webpack_require__(166),
	    setToStringTag = __webpack_require__(24),
	    inheritIfRequired = __webpack_require__(88);
	
	module.exports = function (NAME, wrapper, methods, common, IS_MAP, IS_WEAK) {
	  var Base = global[NAME],
	      C = Base,
	      ADDER = IS_MAP ? 'set' : 'add',
	      proto = C && C.prototype,
	      O = {};
	  var fixMethod = function fixMethod(KEY) {
	    var fn = proto[KEY];
	    redefine(proto, KEY, KEY == 'delete' ? function (a) {
	      return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
	    } : KEY == 'has' ? function has(a) {
	      return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
	    } : KEY == 'get' ? function get(a) {
	      return IS_WEAK && !isObject(a) ? undefined : fn.call(this, a === 0 ? 0 : a);
	    } : KEY == 'add' ? function add(a) {
	      fn.call(this, a === 0 ? 0 : a);return this;
	    } : function set(a, b) {
	      fn.call(this, a === 0 ? 0 : a, b);return this;
	    });
	  };
	  if (typeof C != 'function' || !(IS_WEAK || proto.forEach && !fails(function () {
	    new C().entries().next();
	  }))) {
	    // create collection constructor
	    C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
	    redefineAll(C.prototype, methods);
	    meta.NEED = true;
	  } else {
	    var instance = new C()
	    // early implementations not supports chaining
	    ,
	        HASNT_CHAINING = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance
	    // V8 ~  Chromium 40- weak-collections throws on primitives, but should return false
	    ,
	        THROWS_ON_PRIMITIVES = fails(function () {
	      instance.has(1);
	    })
	    // most early implementations doesn't supports iterables, most modern - not close it correctly
	    ,
	        ACCEPT_ITERABLES = $iterDetect(function (iter) {
	      new C(iter);
	    }) // eslint-disable-line no-new
	    // for early implementations -0 and +0 not the same
	    ,
	        BUGGY_ZERO = !IS_WEAK && fails(function () {
	      // V8 ~ Chromium 42- fails only with 5+ elements
	      var $instance = new C(),
	          index = 5;
	      while (index--) {
	        $instance[ADDER](index, index);
	      }return !$instance.has(-0);
	    });
	    if (!ACCEPT_ITERABLES) {
	      C = wrapper(function (target, iterable) {
	        anInstance(target, C, NAME);
	        var that = inheritIfRequired(new Base(), target, C);
	        if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
	        return that;
	      });
	      C.prototype = proto;
	      proto.constructor = C;
	    }
	    if (THROWS_ON_PRIMITIVES || BUGGY_ZERO) {
	      fixMethod('delete');
	      fixMethod('has');
	      IS_MAP && fixMethod('get');
	    }
	    if (BUGGY_ZERO || HASNT_CHAINING) fixMethod(ADDER);
	    // weak collections should not contains .clear method
	    if (IS_WEAK && proto.clear) delete proto.clear;
	  }
	
	  setToStringTag(C, NAME);
	
	  O[NAME] = C;
	  $export($export.G + $export.W + $export.F * (C != Base), O);
	
	  if (!IS_WEAK) common.setStrong(C, NAME, IS_MAP);
	
	  return C;
	};

/***/ },
/* 214 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var strong = __webpack_require__(212);
	
	// 23.2 Set Objects
	module.exports = __webpack_require__(213)('Set', function (get) {
	  return function Set() {
	    return get(this, arguments.length > 0 ? arguments[0] : undefined);
	  };
	}, {
	  // 23.2.3.1 Set.prototype.add(value)
	  add: function add(value) {
	    return strong.def(this, value = value === 0 ? 0 : value, value);
	  }
	}, strong);

/***/ },
/* 215 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var each = __webpack_require__(173)(0),
	    redefine = __webpack_require__(18),
	    meta = __webpack_require__(22),
	    assign = __webpack_require__(69),
	    weak = __webpack_require__(216),
	    isObject = __webpack_require__(13),
	    has = __webpack_require__(5),
	    getWeak = meta.getWeak,
	    isExtensible = Object.isExtensible,
	    uncaughtFrozenStore = weak.ufstore,
	    tmp = {},
	    InternalMap;
	
	var wrapper = function wrapper(get) {
	  return function WeakMap() {
	    return get(this, arguments.length > 0 ? arguments[0] : undefined);
	  };
	};
	
	var methods = {
	  // 23.3.3.3 WeakMap.prototype.get(key)
	  get: function get(key) {
	    if (isObject(key)) {
	      var data = getWeak(key);
	      if (data === true) return uncaughtFrozenStore(this).get(key);
	      return data ? data[this._i] : undefined;
	    }
	  },
	  // 23.3.3.5 WeakMap.prototype.set(key, value)
	  set: function set(key, value) {
	    return weak.def(this, key, value);
	  }
	};
	
	// 23.3 WeakMap Objects
	var $WeakMap = module.exports = __webpack_require__(213)('WeakMap', wrapper, methods, weak, true, true);
	
	// IE11 WeakMap frozen keys fix
	if (new $WeakMap().set((Object.freeze || Object)(tmp), 7).get(tmp) != 7) {
	  InternalMap = weak.getConstructor(wrapper);
	  assign(InternalMap.prototype, methods);
	  meta.NEED = true;
	  each(['delete', 'has', 'get', 'set'], function (key) {
	    var proto = $WeakMap.prototype,
	        method = proto[key];
	    redefine(proto, key, function (a, b) {
	      // store frozen objects on internal weakmap shim
	      if (isObject(a) && !isExtensible(a)) {
	        if (!this._f) this._f = new InternalMap();
	        var result = this._f[key](a, b);
	        return key == 'set' ? this : result;
	        // store all the rest on native weakmap
	      }return method.call(this, a, b);
	    });
	  });
	}

/***/ },
/* 216 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var redefineAll = __webpack_require__(210),
	    getWeak = __webpack_require__(22).getWeak,
	    anObject = __webpack_require__(12),
	    isObject = __webpack_require__(13),
	    anInstance = __webpack_require__(90),
	    forOf = __webpack_require__(206),
	    createArrayMethod = __webpack_require__(173),
	    $has = __webpack_require__(5),
	    arrayFind = createArrayMethod(5),
	    arrayFindIndex = createArrayMethod(6),
	    id = 0;
	
	// fallback for uncaught frozen keys
	var uncaughtFrozenStore = function uncaughtFrozenStore(that) {
	  return that._l || (that._l = new UncaughtFrozenStore());
	};
	var UncaughtFrozenStore = function UncaughtFrozenStore() {
	  this.a = [];
	};
	var findUncaughtFrozen = function findUncaughtFrozen(store, key) {
	  return arrayFind(store.a, function (it) {
	    return it[0] === key;
	  });
	};
	UncaughtFrozenStore.prototype = {
	  get: function get(key) {
	    var entry = findUncaughtFrozen(this, key);
	    if (entry) return entry[1];
	  },
	  has: function has(key) {
	    return !!findUncaughtFrozen(this, key);
	  },
	  set: function set(key, value) {
	    var entry = findUncaughtFrozen(this, key);
	    if (entry) entry[1] = value;else this.a.push([key, value]);
	  },
	  'delete': function _delete(key) {
	    var index = arrayFindIndex(this.a, function (it) {
	      return it[0] === key;
	    });
	    if (~index) this.a.splice(index, 1);
	    return !! ~index;
	  }
	};
	
	module.exports = {
	  getConstructor: function getConstructor(wrapper, NAME, IS_MAP, ADDER) {
	    var C = wrapper(function (that, iterable) {
	      anInstance(that, C, NAME, '_i');
	      that._i = id++; // collection id
	      that._l = undefined; // leak store for uncaught frozen objects
	      if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
	    });
	    redefineAll(C.prototype, {
	      // 23.3.3.2 WeakMap.prototype.delete(key)
	      // 23.4.3.3 WeakSet.prototype.delete(value)
	      'delete': function _delete(key) {
	        if (!isObject(key)) return false;
	        var data = getWeak(key);
	        if (data === true) return uncaughtFrozenStore(this)['delete'](key);
	        return data && $has(data, this._i) && delete data[this._i];
	      },
	      // 23.3.3.4 WeakMap.prototype.has(key)
	      // 23.4.3.4 WeakSet.prototype.has(value)
	      has: function has(key) {
	        if (!isObject(key)) return false;
	        var data = getWeak(key);
	        if (data === true) return uncaughtFrozenStore(this).has(key);
	        return data && $has(data, this._i);
	      }
	    });
	    return C;
	  },
	  def: function def(that, key, value) {
	    var data = getWeak(anObject(key), true);
	    if (data === true) uncaughtFrozenStore(that).set(key, value);else data[that._i] = value;
	    return that;
	  },
	  ufstore: uncaughtFrozenStore
	};

/***/ },
/* 217 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var weak = __webpack_require__(216);
	
	// 23.4 WeakSet Objects
	__webpack_require__(213)('WeakSet', function (get) {
	  return function WeakSet() {
	    return get(this, arguments.length > 0 ? arguments[0] : undefined);
	  };
	}, {
	  // 23.4.3.1 WeakSet.prototype.add(value)
	  add: function add(value) {
	    return weak.def(this, value, true);
	  }
	}, weak, false, true);

/***/ },
/* 218 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var $export = __webpack_require__(8),
	    $typed = __webpack_require__(219),
	    buffer = __webpack_require__(220),
	    anObject = __webpack_require__(12),
	    toIndex = __webpack_require__(39),
	    toLength = __webpack_require__(37),
	    isObject = __webpack_require__(13),
	    TYPED_ARRAY = __webpack_require__(25)('typed_array'),
	    ArrayBuffer = __webpack_require__(4).ArrayBuffer,
	    speciesConstructor = __webpack_require__(207),
	    $ArrayBuffer = buffer.ArrayBuffer,
	    $DataView = buffer.DataView,
	    $isView = $typed.ABV && ArrayBuffer.isView,
	    $slice = $ArrayBuffer.prototype.slice,
	    VIEW = $typed.VIEW,
	    ARRAY_BUFFER = 'ArrayBuffer';
	
	$export($export.G + $export.W + $export.F * (ArrayBuffer !== $ArrayBuffer), { ArrayBuffer: $ArrayBuffer });
	
	$export($export.S + $export.F * !$typed.CONSTR, ARRAY_BUFFER, {
	  // 24.1.3.1 ArrayBuffer.isView(arg)
	  isView: function isView(it) {
	    return $isView && $isView(it) || isObject(it) && VIEW in it;
	  }
	});
	
	$export($export.P + $export.U + $export.F * __webpack_require__(7)(function () {
	  return !new $ArrayBuffer(2).slice(1, undefined).byteLength;
	}), ARRAY_BUFFER, {
	  // 24.1.4.3 ArrayBuffer.prototype.slice(start, end)
	  slice: function slice(start, end) {
	    if ($slice !== undefined && end === undefined) return $slice.call(anObject(this), start); // FF fix
	    var len = anObject(this).byteLength,
	        first = toIndex(start, len),
	        final = toIndex(end === undefined ? len : end, len),
	        result = new (speciesConstructor(this, $ArrayBuffer))(toLength(final - first)),
	        viewS = new $DataView(this),
	        viewT = new $DataView(result),
	        index = 0;
	    while (first < final) {
	      viewT.setUint8(index++, viewS.getUint8(first++));
	    }return result;
	  }
	});
	
	__webpack_require__(193)(ARRAY_BUFFER);

/***/ },
/* 219 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var global = __webpack_require__(4),
	    hide = __webpack_require__(10),
	    uid = __webpack_require__(19),
	    TYPED = uid('typed_array'),
	    VIEW = uid('view'),
	    ABV = !!(global.ArrayBuffer && global.DataView),
	    CONSTR = ABV,
	    i = 0,
	    l = 9,
	    Typed;
	
	var TypedArrayConstructors = 'Int8Array,Uint8Array,Uint8ClampedArray,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array'.split(',');
	
	while (i < l) {
	  if (Typed = global[TypedArrayConstructors[i++]]) {
	    hide(Typed.prototype, TYPED, true);
	    hide(Typed.prototype, VIEW, true);
	  } else CONSTR = false;
	}
	
	module.exports = {
	  ABV: ABV,
	  CONSTR: CONSTR,
	  TYPED: TYPED,
	  VIEW: VIEW
	};

/***/ },
/* 220 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var global = __webpack_require__(4),
	    DESCRIPTORS = __webpack_require__(6),
	    LIBRARY = __webpack_require__(28),
	    $typed = __webpack_require__(219),
	    hide = __webpack_require__(10),
	    redefineAll = __webpack_require__(210),
	    fails = __webpack_require__(7),
	    anInstance = __webpack_require__(90),
	    toInteger = __webpack_require__(38),
	    toLength = __webpack_require__(37),
	    gOPN = __webpack_require__(50).f,
	    dP = __webpack_require__(11).f,
	    arrayFill = __webpack_require__(189),
	    setToStringTag = __webpack_require__(24),
	    ARRAY_BUFFER = 'ArrayBuffer',
	    DATA_VIEW = 'DataView',
	    PROTOTYPE = 'prototype',
	    WRONG_LENGTH = 'Wrong length!',
	    WRONG_INDEX = 'Wrong index!',
	    $ArrayBuffer = global[ARRAY_BUFFER],
	    $DataView = global[DATA_VIEW],
	    Math = global.Math,
	    parseInt = global.parseInt,
	    RangeError = global.RangeError,
	    Infinity = global.Infinity,
	    BaseBuffer = $ArrayBuffer,
	    abs = Math.abs,
	    pow = Math.pow,
	    min = Math.min,
	    floor = Math.floor,
	    log = Math.log,
	    LN2 = Math.LN2,
	    BUFFER = 'buffer',
	    BYTE_LENGTH = 'byteLength',
	    BYTE_OFFSET = 'byteOffset',
	    $BUFFER = DESCRIPTORS ? '_b' : BUFFER,
	    $LENGTH = DESCRIPTORS ? '_l' : BYTE_LENGTH,
	    $OFFSET = DESCRIPTORS ? '_o' : BYTE_OFFSET;
	
	// IEEE754 conversions based on https://github.com/feross/ieee754
	var packIEEE754 = function packIEEE754(value, mLen, nBytes) {
	  var buffer = Array(nBytes),
	      eLen = nBytes * 8 - mLen - 1,
	      eMax = (1 << eLen) - 1,
	      eBias = eMax >> 1,
	      rt = mLen === 23 ? pow(2, -24) - pow(2, -77) : 0,
	      i = 0,
	      s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0,
	      e,
	      m,
	      c;
	  value = abs(value);
	  if (value != value || value === Infinity) {
	    m = value != value ? 1 : 0;
	    e = eMax;
	  } else {
	    e = floor(log(value) / LN2);
	    if (value * (c = pow(2, -e)) < 1) {
	      e--;
	      c *= 2;
	    }
	    if (e + eBias >= 1) {
	      value += rt / c;
	    } else {
	      value += rt * pow(2, 1 - eBias);
	    }
	    if (value * c >= 2) {
	      e++;
	      c /= 2;
	    }
	    if (e + eBias >= eMax) {
	      m = 0;
	      e = eMax;
	    } else if (e + eBias >= 1) {
	      m = (value * c - 1) * pow(2, mLen);
	      e = e + eBias;
	    } else {
	      m = value * pow(2, eBias - 1) * pow(2, mLen);
	      e = 0;
	    }
	  }
	  for (; mLen >= 8; buffer[i++] = m & 255, m /= 256, mLen -= 8) {}
	  e = e << mLen | m;
	  eLen += mLen;
	  for (; eLen > 0; buffer[i++] = e & 255, e /= 256, eLen -= 8) {}
	  buffer[--i] |= s * 128;
	  return buffer;
	};
	var unpackIEEE754 = function unpackIEEE754(buffer, mLen, nBytes) {
	  var eLen = nBytes * 8 - mLen - 1,
	      eMax = (1 << eLen) - 1,
	      eBias = eMax >> 1,
	      nBits = eLen - 7,
	      i = nBytes - 1,
	      s = buffer[i--],
	      e = s & 127,
	      m;
	  s >>= 7;
	  for (; nBits > 0; e = e * 256 + buffer[i], i--, nBits -= 8) {}
	  m = e & (1 << -nBits) - 1;
	  e >>= -nBits;
	  nBits += mLen;
	  for (; nBits > 0; m = m * 256 + buffer[i], i--, nBits -= 8) {}
	  if (e === 0) {
	    e = 1 - eBias;
	  } else if (e === eMax) {
	    return m ? NaN : s ? -Infinity : Infinity;
	  } else {
	    m = m + pow(2, mLen);
	    e = e - eBias;
	  }return (s ? -1 : 1) * m * pow(2, e - mLen);
	};
	
	var unpackI32 = function unpackI32(bytes) {
	  return bytes[3] << 24 | bytes[2] << 16 | bytes[1] << 8 | bytes[0];
	};
	var packI8 = function packI8(it) {
	  return [it & 0xff];
	};
	var packI16 = function packI16(it) {
	  return [it & 0xff, it >> 8 & 0xff];
	};
	var packI32 = function packI32(it) {
	  return [it & 0xff, it >> 8 & 0xff, it >> 16 & 0xff, it >> 24 & 0xff];
	};
	var packF64 = function packF64(it) {
	  return packIEEE754(it, 52, 8);
	};
	var packF32 = function packF32(it) {
	  return packIEEE754(it, 23, 4);
	};
	
	var addGetter = function addGetter(C, key, internal) {
	  dP(C[PROTOTYPE], key, { get: function get() {
	      return this[internal];
	    } });
	};
	
	var get = function get(view, bytes, index, isLittleEndian) {
	  var numIndex = +index,
	      intIndex = toInteger(numIndex);
	  if (numIndex != intIndex || intIndex < 0 || intIndex + bytes > view[$LENGTH]) throw RangeError(WRONG_INDEX);
	  var store = view[$BUFFER]._b,
	      start = intIndex + view[$OFFSET],
	      pack = store.slice(start, start + bytes);
	  return isLittleEndian ? pack : pack.reverse();
	};
	var set = function set(view, bytes, index, conversion, value, isLittleEndian) {
	  var numIndex = +index,
	      intIndex = toInteger(numIndex);
	  if (numIndex != intIndex || intIndex < 0 || intIndex + bytes > view[$LENGTH]) throw RangeError(WRONG_INDEX);
	  var store = view[$BUFFER]._b,
	      start = intIndex + view[$OFFSET],
	      pack = conversion(+value);
	  for (var i = 0; i < bytes; i++) {
	    store[start + i] = pack[isLittleEndian ? i : bytes - i - 1];
	  }
	};
	
	var validateArrayBufferArguments = function validateArrayBufferArguments(that, length) {
	  anInstance(that, $ArrayBuffer, ARRAY_BUFFER);
	  var numberLength = +length,
	      byteLength = toLength(numberLength);
	  if (numberLength != byteLength) throw RangeError(WRONG_LENGTH);
	  return byteLength;
	};
	
	if (!$typed.ABV) {
	  $ArrayBuffer = function ArrayBuffer(length) {
	    var byteLength = validateArrayBufferArguments(this, length);
	    this._b = arrayFill.call(Array(byteLength), 0);
	    this[$LENGTH] = byteLength;
	  };
	
	  $DataView = function DataView(buffer, byteOffset, byteLength) {
	    anInstance(this, $DataView, DATA_VIEW);
	    anInstance(buffer, $ArrayBuffer, DATA_VIEW);
	    var bufferLength = buffer[$LENGTH],
	        offset = toInteger(byteOffset);
	    if (offset < 0 || offset > bufferLength) throw RangeError('Wrong offset!');
	    byteLength = byteLength === undefined ? bufferLength - offset : toLength(byteLength);
	    if (offset + byteLength > bufferLength) throw RangeError(WRONG_LENGTH);
	    this[$BUFFER] = buffer;
	    this[$OFFSET] = offset;
	    this[$LENGTH] = byteLength;
	  };
	
	  if (DESCRIPTORS) {
	    addGetter($ArrayBuffer, BYTE_LENGTH, '_l');
	    addGetter($DataView, BUFFER, '_b');
	    addGetter($DataView, BYTE_LENGTH, '_l');
	    addGetter($DataView, BYTE_OFFSET, '_o');
	  }
	
	  redefineAll($DataView[PROTOTYPE], {
	    getInt8: function getInt8(byteOffset) {
	      return get(this, 1, byteOffset)[0] << 24 >> 24;
	    },
	    getUint8: function getUint8(byteOffset) {
	      return get(this, 1, byteOffset)[0];
	    },
	    getInt16: function getInt16(byteOffset /*, littleEndian */) {
	      var bytes = get(this, 2, byteOffset, arguments[1]);
	      return (bytes[1] << 8 | bytes[0]) << 16 >> 16;
	    },
	    getUint16: function getUint16(byteOffset /*, littleEndian */) {
	      var bytes = get(this, 2, byteOffset, arguments[1]);
	      return bytes[1] << 8 | bytes[0];
	    },
	    getInt32: function getInt32(byteOffset /*, littleEndian */) {
	      return unpackI32(get(this, 4, byteOffset, arguments[1]));
	    },
	    getUint32: function getUint32(byteOffset /*, littleEndian */) {
	      return unpackI32(get(this, 4, byteOffset, arguments[1])) >>> 0;
	    },
	    getFloat32: function getFloat32(byteOffset /*, littleEndian */) {
	      return unpackIEEE754(get(this, 4, byteOffset, arguments[1]), 23, 4);
	    },
	    getFloat64: function getFloat64(byteOffset /*, littleEndian */) {
	      return unpackIEEE754(get(this, 8, byteOffset, arguments[1]), 52, 8);
	    },
	    setInt8: function setInt8(byteOffset, value) {
	      set(this, 1, byteOffset, packI8, value);
	    },
	    setUint8: function setUint8(byteOffset, value) {
	      set(this, 1, byteOffset, packI8, value);
	    },
	    setInt16: function setInt16(byteOffset, value /*, littleEndian */) {
	      set(this, 2, byteOffset, packI16, value, arguments[2]);
	    },
	    setUint16: function setUint16(byteOffset, value /*, littleEndian */) {
	      set(this, 2, byteOffset, packI16, value, arguments[2]);
	    },
	    setInt32: function setInt32(byteOffset, value /*, littleEndian */) {
	      set(this, 4, byteOffset, packI32, value, arguments[2]);
	    },
	    setUint32: function setUint32(byteOffset, value /*, littleEndian */) {
	      set(this, 4, byteOffset, packI32, value, arguments[2]);
	    },
	    setFloat32: function setFloat32(byteOffset, value /*, littleEndian */) {
	      set(this, 4, byteOffset, packF32, value, arguments[2]);
	    },
	    setFloat64: function setFloat64(byteOffset, value /*, littleEndian */) {
	      set(this, 8, byteOffset, packF64, value, arguments[2]);
	    }
	  });
	} else {
	  if (!fails(function () {
	    new $ArrayBuffer(); // eslint-disable-line no-new
	  }) || !fails(function () {
	    new $ArrayBuffer(.5); // eslint-disable-line no-new
	  })) {
	      $ArrayBuffer = function ArrayBuffer(length) {
	        return new BaseBuffer(validateArrayBufferArguments(this, length));
	      };
	      var ArrayBufferProto = $ArrayBuffer[PROTOTYPE] = BaseBuffer[PROTOTYPE];
	      for (var keys = gOPN(BaseBuffer), j = 0, key; keys.length > j;) {
	        if (!((key = keys[j++]) in $ArrayBuffer)) hide($ArrayBuffer, key, BaseBuffer[key]);
	      };
	      if (!LIBRARY) ArrayBufferProto.constructor = $ArrayBuffer;
	    }
	  // iOS Safari 7.x bug
	  var view = new $DataView(new $ArrayBuffer(2)),
	      $setInt8 = $DataView[PROTOTYPE].setInt8;
	  view.setInt8(0, 2147483648);
	  view.setInt8(1, 2147483649);
	  if (view.getInt8(0) || !view.getInt8(1)) redefineAll($DataView[PROTOTYPE], {
	    setInt8: function setInt8(byteOffset, value) {
	      $setInt8.call(this, byteOffset, value << 24 >> 24);
	    },
	    setUint8: function setUint8(byteOffset, value) {
	      $setInt8.call(this, byteOffset, value << 24 >> 24);
	    }
	  }, true);
	}
	setToStringTag($ArrayBuffer, ARRAY_BUFFER);
	setToStringTag($DataView, DATA_VIEW);
	hide($DataView[PROTOTYPE], $typed.VIEW, true);
	exports[ARRAY_BUFFER] = $ArrayBuffer;
	exports[DATA_VIEW] = $DataView;

/***/ },
/* 221 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var $export = __webpack_require__(8);
	$export($export.G + $export.W + $export.F * !__webpack_require__(219).ABV, {
	  DataView: __webpack_require__(220).DataView
	});

/***/ },
/* 222 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(223)('Int8', 1, function (init) {
	  return function Int8Array(data, byteOffset, length) {
	    return init(this, data, byteOffset, length);
	  };
	});

/***/ },
/* 223 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	if (__webpack_require__(6)) {
	  var LIBRARY = __webpack_require__(28),
	      global = __webpack_require__(4),
	      fails = __webpack_require__(7),
	      $export = __webpack_require__(8),
	      $typed = __webpack_require__(219),
	      $buffer = __webpack_require__(220),
	      ctx = __webpack_require__(20),
	      anInstance = __webpack_require__(90),
	      propertyDesc = __webpack_require__(17),
	      hide = __webpack_require__(10),
	      redefineAll = __webpack_require__(210),
	      isInteger = __webpack_require__(97),
	      toInteger = __webpack_require__(38),
	      toLength = __webpack_require__(37),
	      toIndex = __webpack_require__(39),
	      toPrimitive = __webpack_require__(16),
	      has = __webpack_require__(5),
	      same = __webpack_require__(71),
	      classof = __webpack_require__(75),
	      isObject = __webpack_require__(13),
	      toObject = __webpack_require__(58),
	      isArrayIter = __webpack_require__(163),
	      create = __webpack_require__(46),
	      getPrototypeOf = __webpack_require__(59),
	      gOPN = __webpack_require__(50).f,
	      isIterable = __webpack_require__(224),
	      getIterFn = __webpack_require__(165),
	      uid = __webpack_require__(19),
	      wks = __webpack_require__(25),
	      createArrayMethod = __webpack_require__(173),
	      createArrayIncludes = __webpack_require__(36),
	      speciesConstructor = __webpack_require__(207),
	      ArrayIterators = __webpack_require__(194),
	      Iterators = __webpack_require__(130),
	      $iterDetect = __webpack_require__(166),
	      setSpecies = __webpack_require__(193),
	      arrayFill = __webpack_require__(189),
	      arrayCopyWithin = __webpack_require__(186),
	      $DP = __webpack_require__(11),
	      $GOPD = __webpack_require__(51),
	      dP = $DP.f,
	      gOPD = $GOPD.f,
	      RangeError = global.RangeError,
	      TypeError = global.TypeError,
	      Uint8Array = global.Uint8Array,
	      ARRAY_BUFFER = 'ArrayBuffer',
	      SHARED_BUFFER = 'Shared' + ARRAY_BUFFER,
	      BYTES_PER_ELEMENT = 'BYTES_PER_ELEMENT',
	      PROTOTYPE = 'prototype',
	      ArrayProto = Array[PROTOTYPE],
	      $ArrayBuffer = $buffer.ArrayBuffer,
	      $DataView = $buffer.DataView,
	      arrayForEach = createArrayMethod(0),
	      arrayFilter = createArrayMethod(2),
	      arraySome = createArrayMethod(3),
	      arrayEvery = createArrayMethod(4),
	      arrayFind = createArrayMethod(5),
	      arrayFindIndex = createArrayMethod(6),
	      arrayIncludes = createArrayIncludes(true),
	      arrayIndexOf = createArrayIncludes(false),
	      arrayValues = ArrayIterators.values,
	      arrayKeys = ArrayIterators.keys,
	      arrayEntries = ArrayIterators.entries,
	      arrayLastIndexOf = ArrayProto.lastIndexOf,
	      arrayReduce = ArrayProto.reduce,
	      arrayReduceRight = ArrayProto.reduceRight,
	      arrayJoin = ArrayProto.join,
	      arraySort = ArrayProto.sort,
	      arraySlice = ArrayProto.slice,
	      arrayToString = ArrayProto.toString,
	      arrayToLocaleString = ArrayProto.toLocaleString,
	      ITERATOR = wks('iterator'),
	      TAG = wks('toStringTag'),
	      TYPED_CONSTRUCTOR = uid('typed_constructor'),
	      DEF_CONSTRUCTOR = uid('def_constructor'),
	      ALL_CONSTRUCTORS = $typed.CONSTR,
	      TYPED_ARRAY = $typed.TYPED,
	      VIEW = $typed.VIEW,
	      WRONG_LENGTH = 'Wrong length!';
	
	  var $map = createArrayMethod(1, function (O, length) {
	    return allocate(speciesConstructor(O, O[DEF_CONSTRUCTOR]), length);
	  });
	
	  var LITTLE_ENDIAN = fails(function () {
	    return new Uint8Array(new Uint16Array([1]).buffer)[0] === 1;
	  });
	
	  var FORCED_SET = !!Uint8Array && !!Uint8Array[PROTOTYPE].set && fails(function () {
	    new Uint8Array(1).set({});
	  });
	
	  var strictToLength = function strictToLength(it, SAME) {
	    if (it === undefined) throw TypeError(WRONG_LENGTH);
	    var number = +it,
	        length = toLength(it);
	    if (SAME && !same(number, length)) throw RangeError(WRONG_LENGTH);
	    return length;
	  };
	
	  var toOffset = function toOffset(it, BYTES) {
	    var offset = toInteger(it);
	    if (offset < 0 || offset % BYTES) throw RangeError('Wrong offset!');
	    return offset;
	  };
	
	  var validate = function validate(it) {
	    if (isObject(it) && TYPED_ARRAY in it) return it;
	    throw TypeError(it + ' is not a typed array!');
	  };
	
	  var allocate = function allocate(C, length) {
	    if (!(isObject(C) && TYPED_CONSTRUCTOR in C)) {
	      throw TypeError('It is not a typed array constructor!');
	    }return new C(length);
	  };
	
	  var speciesFromList = function speciesFromList(O, list) {
	    return fromList(speciesConstructor(O, O[DEF_CONSTRUCTOR]), list);
	  };
	
	  var fromList = function fromList(C, list) {
	    var index = 0,
	        length = list.length,
	        result = allocate(C, length);
	    while (length > index) {
	      result[index] = list[index++];
	    }return result;
	  };
	
	  var addGetter = function addGetter(it, key, internal) {
	    dP(it, key, { get: function get() {
	        return this._d[internal];
	      } });
	  };
	
	  var $from = function from(source /*, mapfn, thisArg */) {
	    var O = toObject(source),
	        aLen = arguments.length,
	        mapfn = aLen > 1 ? arguments[1] : undefined,
	        mapping = mapfn !== undefined,
	        iterFn = getIterFn(O),
	        i,
	        length,
	        values,
	        result,
	        step,
	        iterator;
	    if (iterFn != undefined && !isArrayIter(iterFn)) {
	      for (iterator = iterFn.call(O), values = [], i = 0; !(step = iterator.next()).done; i++) {
	        values.push(step.value);
	      }O = values;
	    }
	    if (mapping && aLen > 2) mapfn = ctx(mapfn, arguments[2], 2);
	    for (i = 0, length = toLength(O.length), result = allocate(this, length); length > i; i++) {
	      result[i] = mapping ? mapfn(O[i], i) : O[i];
	    }
	    return result;
	  };
	
	  var $of = function of() /*...items*/{
	    var index = 0,
	        length = arguments.length,
	        result = allocate(this, length);
	    while (length > index) {
	      result[index] = arguments[index++];
	    }return result;
	  };
	
	  // iOS Safari 6.x fails here
	  var TO_LOCALE_BUG = !!Uint8Array && fails(function () {
	    arrayToLocaleString.call(new Uint8Array(1));
	  });
	
	  var $toLocaleString = function toLocaleString() {
	    return arrayToLocaleString.apply(TO_LOCALE_BUG ? arraySlice.call(validate(this)) : validate(this), arguments);
	  };
	
	  var proto = {
	    copyWithin: function copyWithin(target, start /*, end */) {
	      return arrayCopyWithin.call(validate(this), target, start, arguments.length > 2 ? arguments[2] : undefined);
	    },
	    every: function every(callbackfn /*, thisArg */) {
	      return arrayEvery(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	    },
	    fill: function fill(value /*, start, end */) {
	      // eslint-disable-line no-unused-vars
	      return arrayFill.apply(validate(this), arguments);
	    },
	    filter: function filter(callbackfn /*, thisArg */) {
	      return speciesFromList(this, arrayFilter(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined));
	    },
	    find: function find(predicate /*, thisArg */) {
	      return arrayFind(validate(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
	    },
	    findIndex: function findIndex(predicate /*, thisArg */) {
	      return arrayFindIndex(validate(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
	    },
	    forEach: function forEach(callbackfn /*, thisArg */) {
	      arrayForEach(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	    },
	    indexOf: function indexOf(searchElement /*, fromIndex */) {
	      return arrayIndexOf(validate(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
	    },
	    includes: function includes(searchElement /*, fromIndex */) {
	      return arrayIncludes(validate(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
	    },
	    join: function join(separator) {
	      // eslint-disable-line no-unused-vars
	      return arrayJoin.apply(validate(this), arguments);
	    },
	    lastIndexOf: function lastIndexOf(searchElement /*, fromIndex */) {
	      // eslint-disable-line no-unused-vars
	      return arrayLastIndexOf.apply(validate(this), arguments);
	    },
	    map: function map(mapfn /*, thisArg */) {
	      return $map(validate(this), mapfn, arguments.length > 1 ? arguments[1] : undefined);
	    },
	    reduce: function reduce(callbackfn /*, initialValue */) {
	      // eslint-disable-line no-unused-vars
	      return arrayReduce.apply(validate(this), arguments);
	    },
	    reduceRight: function reduceRight(callbackfn /*, initialValue */) {
	      // eslint-disable-line no-unused-vars
	      return arrayReduceRight.apply(validate(this), arguments);
	    },
	    reverse: function reverse() {
	      var that = this,
	          length = validate(that).length,
	          middle = Math.floor(length / 2),
	          index = 0,
	          value;
	      while (index < middle) {
	        value = that[index];
	        that[index++] = that[--length];
	        that[length] = value;
	      }return that;
	    },
	    some: function some(callbackfn /*, thisArg */) {
	      return arraySome(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	    },
	    sort: function sort(comparefn) {
	      return arraySort.call(validate(this), comparefn);
	    },
	    subarray: function subarray(begin, end) {
	      var O = validate(this),
	          length = O.length,
	          $begin = toIndex(begin, length);
	      return new (speciesConstructor(O, O[DEF_CONSTRUCTOR]))(O.buffer, O.byteOffset + $begin * O.BYTES_PER_ELEMENT, toLength((end === undefined ? length : toIndex(end, length)) - $begin));
	    }
	  };
	
	  var $slice = function slice(start, end) {
	    return speciesFromList(this, arraySlice.call(validate(this), start, end));
	  };
	
	  var $set = function set(arrayLike /*, offset */) {
	    validate(this);
	    var offset = toOffset(arguments[1], 1),
	        length = this.length,
	        src = toObject(arrayLike),
	        len = toLength(src.length),
	        index = 0;
	    if (len + offset > length) throw RangeError(WRONG_LENGTH);
	    while (index < len) {
	      this[offset + index] = src[index++];
	    }
	  };
	
	  var $iterators = {
	    entries: function entries() {
	      return arrayEntries.call(validate(this));
	    },
	    keys: function keys() {
	      return arrayKeys.call(validate(this));
	    },
	    values: function values() {
	      return arrayValues.call(validate(this));
	    }
	  };
	
	  var isTAIndex = function isTAIndex(target, key) {
	    return isObject(target) && target[TYPED_ARRAY] && (typeof key === 'undefined' ? 'undefined' : _typeof(key)) != 'symbol' && key in target && String(+key) == String(key);
	  };
	  var $getDesc = function getOwnPropertyDescriptor(target, key) {
	    return isTAIndex(target, key = toPrimitive(key, true)) ? propertyDesc(2, target[key]) : gOPD(target, key);
	  };
	  var $setDesc = function defineProperty(target, key, desc) {
	    if (isTAIndex(target, key = toPrimitive(key, true)) && isObject(desc) && has(desc, 'value') && !has(desc, 'get') && !has(desc, 'set')
	    // TODO: add validation descriptor w/o calling accessors
	     && !desc.configurable && (!has(desc, 'writable') || desc.writable) && (!has(desc, 'enumerable') || desc.enumerable)) {
	      target[key] = desc.value;
	      return target;
	    } else return dP(target, key, desc);
	  };
	
	  if (!ALL_CONSTRUCTORS) {
	    $GOPD.f = $getDesc;
	    $DP.f = $setDesc;
	  }
	
	  $export($export.S + $export.F * !ALL_CONSTRUCTORS, 'Object', {
	    getOwnPropertyDescriptor: $getDesc,
	    defineProperty: $setDesc
	  });
	
	  if (fails(function () {
	    arrayToString.call({});
	  })) {
	    arrayToString = arrayToLocaleString = function toString() {
	      return arrayJoin.call(this);
	    };
	  }
	
	  var $TypedArrayPrototype$ = redefineAll({}, proto);
	  redefineAll($TypedArrayPrototype$, $iterators);
	  hide($TypedArrayPrototype$, ITERATOR, $iterators.values);
	  redefineAll($TypedArrayPrototype$, {
	    slice: $slice,
	    set: $set,
	    constructor: function constructor() {/* noop */},
	    toString: arrayToString,
	    toLocaleString: $toLocaleString
	  });
	  addGetter($TypedArrayPrototype$, 'buffer', 'b');
	  addGetter($TypedArrayPrototype$, 'byteOffset', 'o');
	  addGetter($TypedArrayPrototype$, 'byteLength', 'l');
	  addGetter($TypedArrayPrototype$, 'length', 'e');
	  dP($TypedArrayPrototype$, TAG, {
	    get: function get() {
	      return this[TYPED_ARRAY];
	    }
	  });
	
	  module.exports = function (KEY, BYTES, wrapper, CLAMPED) {
	    CLAMPED = !!CLAMPED;
	    var NAME = KEY + (CLAMPED ? 'Clamped' : '') + 'Array',
	        ISNT_UINT8 = NAME != 'Uint8Array',
	        GETTER = 'get' + KEY,
	        SETTER = 'set' + KEY,
	        TypedArray = global[NAME],
	        Base = TypedArray || {},
	        TAC = TypedArray && getPrototypeOf(TypedArray),
	        FORCED = !TypedArray || !$typed.ABV,
	        O = {},
	        TypedArrayPrototype = TypedArray && TypedArray[PROTOTYPE];
	    var getter = function getter(that, index) {
	      var data = that._d;
	      return data.v[GETTER](index * BYTES + data.o, LITTLE_ENDIAN);
	    };
	    var setter = function setter(that, index, value) {
	      var data = that._d;
	      if (CLAMPED) value = (value = Math.round(value)) < 0 ? 0 : value > 0xff ? 0xff : value & 0xff;
	      data.v[SETTER](index * BYTES + data.o, value, LITTLE_ENDIAN);
	    };
	    var addElement = function addElement(that, index) {
	      dP(that, index, {
	        get: function get() {
	          return getter(this, index);
	        },
	        set: function set(value) {
	          return setter(this, index, value);
	        },
	        enumerable: true
	      });
	    };
	    if (FORCED) {
	      TypedArray = wrapper(function (that, data, $offset, $length) {
	        anInstance(that, TypedArray, NAME, '_d');
	        var index = 0,
	            offset = 0,
	            buffer,
	            byteLength,
	            length,
	            klass;
	        if (!isObject(data)) {
	          length = strictToLength(data, true);
	          byteLength = length * BYTES;
	          buffer = new $ArrayBuffer(byteLength);
	        } else if (data instanceof $ArrayBuffer || (klass = classof(data)) == ARRAY_BUFFER || klass == SHARED_BUFFER) {
	          buffer = data;
	          offset = toOffset($offset, BYTES);
	          var $len = data.byteLength;
	          if ($length === undefined) {
	            if ($len % BYTES) throw RangeError(WRONG_LENGTH);
	            byteLength = $len - offset;
	            if (byteLength < 0) throw RangeError(WRONG_LENGTH);
	          } else {
	            byteLength = toLength($length) * BYTES;
	            if (byteLength + offset > $len) throw RangeError(WRONG_LENGTH);
	          }
	          length = byteLength / BYTES;
	        } else if (TYPED_ARRAY in data) {
	          return fromList(TypedArray, data);
	        } else {
	          return $from.call(TypedArray, data);
	        }
	        hide(that, '_d', {
	          b: buffer,
	          o: offset,
	          l: byteLength,
	          e: length,
	          v: new $DataView(buffer)
	        });
	        while (index < length) {
	          addElement(that, index++);
	        }
	      });
	      TypedArrayPrototype = TypedArray[PROTOTYPE] = create($TypedArrayPrototype$);
	      hide(TypedArrayPrototype, 'constructor', TypedArray);
	    } else if (!$iterDetect(function (iter) {
	      // V8 works with iterators, but fails in many other cases
	      // https://code.google.com/p/v8/issues/detail?id=4552
	      new TypedArray(null); // eslint-disable-line no-new
	      new TypedArray(iter); // eslint-disable-line no-new
	    }, true)) {
	      TypedArray = wrapper(function (that, data, $offset, $length) {
	        anInstance(that, TypedArray, NAME);
	        var klass;
	        // `ws` module bug, temporarily remove validation length for Uint8Array
	        // https://github.com/websockets/ws/pull/645
	        if (!isObject(data)) return new Base(strictToLength(data, ISNT_UINT8));
	        if (data instanceof $ArrayBuffer || (klass = classof(data)) == ARRAY_BUFFER || klass == SHARED_BUFFER) {
	          return $length !== undefined ? new Base(data, toOffset($offset, BYTES), $length) : $offset !== undefined ? new Base(data, toOffset($offset, BYTES)) : new Base(data);
	        }
	        if (TYPED_ARRAY in data) return fromList(TypedArray, data);
	        return $from.call(TypedArray, data);
	      });
	      arrayForEach(TAC !== Function.prototype ? gOPN(Base).concat(gOPN(TAC)) : gOPN(Base), function (key) {
	        if (!(key in TypedArray)) hide(TypedArray, key, Base[key]);
	      });
	      TypedArray[PROTOTYPE] = TypedArrayPrototype;
	      if (!LIBRARY) TypedArrayPrototype.constructor = TypedArray;
	    }
	    var $nativeIterator = TypedArrayPrototype[ITERATOR],
	        CORRECT_ITER_NAME = !!$nativeIterator && ($nativeIterator.name == 'values' || $nativeIterator.name == undefined),
	        $iterator = $iterators.values;
	    hide(TypedArray, TYPED_CONSTRUCTOR, true);
	    hide(TypedArrayPrototype, TYPED_ARRAY, NAME);
	    hide(TypedArrayPrototype, VIEW, true);
	    hide(TypedArrayPrototype, DEF_CONSTRUCTOR, TypedArray);
	
	    if (CLAMPED ? new TypedArray(1)[TAG] != NAME : !(TAG in TypedArrayPrototype)) {
	      dP(TypedArrayPrototype, TAG, {
	        get: function get() {
	          return NAME;
	        }
	      });
	    }
	
	    O[NAME] = TypedArray;
	
	    $export($export.G + $export.W + $export.F * (TypedArray != Base), O);
	
	    $export($export.S, NAME, {
	      BYTES_PER_ELEMENT: BYTES,
	      from: $from,
	      of: $of
	    });
	
	    if (!(BYTES_PER_ELEMENT in TypedArrayPrototype)) hide(TypedArrayPrototype, BYTES_PER_ELEMENT, BYTES);
	
	    $export($export.P, NAME, proto);
	
	    setSpecies(NAME);
	
	    $export($export.P + $export.F * FORCED_SET, NAME, { set: $set });
	
	    $export($export.P + $export.F * !CORRECT_ITER_NAME, NAME, $iterators);
	
	    $export($export.P + $export.F * (TypedArrayPrototype.toString != arrayToString), NAME, { toString: arrayToString });
	
	    $export($export.P + $export.F * fails(function () {
	      new TypedArray(1).slice();
	    }), NAME, { slice: $slice });
	
	    $export($export.P + $export.F * (fails(function () {
	      return [1, 2].toLocaleString() != new TypedArray([1, 2]).toLocaleString();
	    }) || !fails(function () {
	      TypedArrayPrototype.toLocaleString.call([1, 2]);
	    })), NAME, { toLocaleString: $toLocaleString });
	
	    Iterators[NAME] = CORRECT_ITER_NAME ? $nativeIterator : $iterator;
	    if (!LIBRARY && !CORRECT_ITER_NAME) hide(TypedArrayPrototype, ITERATOR, $iterator);
	  };
	} else module.exports = function () {/* empty */};

/***/ },
/* 224 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var classof = __webpack_require__(75),
	    ITERATOR = __webpack_require__(25)('iterator'),
	    Iterators = __webpack_require__(130);
	module.exports = __webpack_require__(9).isIterable = function (it) {
	  var O = Object(it);
	  return O[ITERATOR] !== undefined || '@@iterator' in O || Iterators.hasOwnProperty(classof(O));
	};

/***/ },
/* 225 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(223)('Uint8', 1, function (init) {
	  return function Uint8Array(data, byteOffset, length) {
	    return init(this, data, byteOffset, length);
	  };
	});

/***/ },
/* 226 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(223)('Uint8', 1, function (init) {
	  return function Uint8ClampedArray(data, byteOffset, length) {
	    return init(this, data, byteOffset, length);
	  };
	}, true);

/***/ },
/* 227 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(223)('Int16', 2, function (init) {
	  return function Int16Array(data, byteOffset, length) {
	    return init(this, data, byteOffset, length);
	  };
	});

/***/ },
/* 228 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(223)('Uint16', 2, function (init) {
	  return function Uint16Array(data, byteOffset, length) {
	    return init(this, data, byteOffset, length);
	  };
	});

/***/ },
/* 229 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(223)('Int32', 4, function (init) {
	  return function Int32Array(data, byteOffset, length) {
	    return init(this, data, byteOffset, length);
	  };
	});

/***/ },
/* 230 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(223)('Uint32', 4, function (init) {
	  return function Uint32Array(data, byteOffset, length) {
	    return init(this, data, byteOffset, length);
	  };
	});

/***/ },
/* 231 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(223)('Float32', 4, function (init) {
	  return function Float32Array(data, byteOffset, length) {
	    return init(this, data, byteOffset, length);
	  };
	});

/***/ },
/* 232 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(223)('Float64', 8, function (init) {
	  return function Float64Array(data, byteOffset, length) {
	    return init(this, data, byteOffset, length);
	  };
	});

/***/ },
/* 233 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	// 26.1.1 Reflect.apply(target, thisArgument, argumentsList)
	var $export = __webpack_require__(8),
	    aFunction = __webpack_require__(21),
	    anObject = __webpack_require__(12),
	    _apply = Function.apply;
	
	$export($export.S, 'Reflect', {
	  apply: function apply(target, thisArgument, argumentsList) {
	    return _apply.call(aFunction(target), thisArgument, anObject(argumentsList));
	  }
	});

/***/ },
/* 234 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	// 26.1.2 Reflect.construct(target, argumentsList [, newTarget])
	var $export = __webpack_require__(8),
	    create = __webpack_require__(46),
	    aFunction = __webpack_require__(21),
	    anObject = __webpack_require__(12),
	    isObject = __webpack_require__(13),
	    bind = __webpack_require__(77);
	
	// MS Edge supports only 2 arguments
	// FF Nightly sets third argument as `new.target`, but does not create `this` from it
	$export($export.S + $export.F * __webpack_require__(7)(function () {
	  function F() {}
	  return !(Reflect.construct(function () {}, [], F) instanceof F);
	}), 'Reflect', {
	  construct: function construct(Target, args /*, newTarget*/) {
	    aFunction(Target);
	    anObject(args);
	    var newTarget = arguments.length < 3 ? Target : aFunction(arguments[2]);
	    if (Target == newTarget) {
	      // w/o altered newTarget, optimization for 0-4 arguments
	      switch (args.length) {
	        case 0:
	          return new Target();
	        case 1:
	          return new Target(args[0]);
	        case 2:
	          return new Target(args[0], args[1]);
	        case 3:
	          return new Target(args[0], args[1], args[2]);
	        case 4:
	          return new Target(args[0], args[1], args[2], args[3]);
	      }
	      // w/o altered newTarget, lot of arguments case
	      var $args = [null];
	      $args.push.apply($args, args);
	      return new (bind.apply(Target, $args))();
	    }
	    // with altered newTarget, not support built-in constructors
	    var proto = newTarget.prototype,
	        instance = create(isObject(proto) ? proto : Object.prototype),
	        result = Function.apply.call(Target, instance, args);
	    return isObject(result) ? result : instance;
	  }
	});

/***/ },
/* 235 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	// 26.1.3 Reflect.defineProperty(target, propertyKey, attributes)
	var dP = __webpack_require__(11),
	    $export = __webpack_require__(8),
	    anObject = __webpack_require__(12),
	    toPrimitive = __webpack_require__(16);
	
	// MS Edge has broken Reflect.defineProperty - throwing instead of returning false
	$export($export.S + $export.F * __webpack_require__(7)(function () {
	  Reflect.defineProperty(dP.f({}, 1, { value: 1 }), 1, { value: 2 });
	}), 'Reflect', {
	  defineProperty: function defineProperty(target, propertyKey, attributes) {
	    anObject(target);
	    propertyKey = toPrimitive(propertyKey, true);
	    anObject(attributes);
	    try {
	      dP.f(target, propertyKey, attributes);
	      return true;
	    } catch (e) {
	      return false;
	    }
	  }
	});

/***/ },
/* 236 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	// 26.1.4 Reflect.deleteProperty(target, propertyKey)
	var $export = __webpack_require__(8),
	    gOPD = __webpack_require__(51).f,
	    anObject = __webpack_require__(12);
	
	$export($export.S, 'Reflect', {
	  deleteProperty: function deleteProperty(target, propertyKey) {
	    var desc = gOPD(anObject(target), propertyKey);
	    return desc && !desc.configurable ? false : delete target[propertyKey];
	  }
	});

/***/ },
/* 237 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// 26.1.5 Reflect.enumerate(target)
	
	var $export = __webpack_require__(8),
	    anObject = __webpack_require__(12);
	var Enumerate = function Enumerate(iterated) {
	  this._t = anObject(iterated); // target
	  this._i = 0; // next index
	  var keys = this._k = [] // keys
	  ,
	      key;
	  for (key in iterated) {
	    keys.push(key);
	  }
	};
	__webpack_require__(131)(Enumerate, 'Object', function () {
	  var that = this,
	      keys = that._k,
	      key;
	  do {
	    if (that._i >= keys.length) return { value: undefined, done: true };
	  } while (!((key = keys[that._i++]) in that._t));
	  return { value: key, done: false };
	});
	
	$export($export.S, 'Reflect', {
	  enumerate: function enumerate(target) {
	    return new Enumerate(target);
	  }
	});

/***/ },
/* 238 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	// 26.1.6 Reflect.get(target, propertyKey [, receiver])
	var gOPD = __webpack_require__(51),
	    getPrototypeOf = __webpack_require__(59),
	    has = __webpack_require__(5),
	    $export = __webpack_require__(8),
	    isObject = __webpack_require__(13),
	    anObject = __webpack_require__(12);
	
	function get(target, propertyKey /*, receiver*/) {
	  var receiver = arguments.length < 3 ? target : arguments[2],
	      desc,
	      proto;
	  if (anObject(target) === receiver) return target[propertyKey];
	  if (desc = gOPD.f(target, propertyKey)) return has(desc, 'value') ? desc.value : desc.get !== undefined ? desc.get.call(receiver) : undefined;
	  if (isObject(proto = getPrototypeOf(target))) return get(proto, propertyKey, receiver);
	}
	
	$export($export.S, 'Reflect', { get: get });

/***/ },
/* 239 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	// 26.1.7 Reflect.getOwnPropertyDescriptor(target, propertyKey)
	var gOPD = __webpack_require__(51),
	    $export = __webpack_require__(8),
	    anObject = __webpack_require__(12);
	
	$export($export.S, 'Reflect', {
	  getOwnPropertyDescriptor: function getOwnPropertyDescriptor(target, propertyKey) {
	    return gOPD.f(anObject(target), propertyKey);
	  }
	});

/***/ },
/* 240 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	// 26.1.8 Reflect.getPrototypeOf(target)
	var $export = __webpack_require__(8),
	    getProto = __webpack_require__(59),
	    anObject = __webpack_require__(12);
	
	$export($export.S, 'Reflect', {
	  getPrototypeOf: function getPrototypeOf(target) {
	    return getProto(anObject(target));
	  }
	});

/***/ },
/* 241 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	// 26.1.9 Reflect.has(target, propertyKey)
	var $export = __webpack_require__(8);
	
	$export($export.S, 'Reflect', {
	  has: function has(target, propertyKey) {
	    return propertyKey in target;
	  }
	});

/***/ },
/* 242 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	// 26.1.10 Reflect.isExtensible(target)
	var $export = __webpack_require__(8),
	    anObject = __webpack_require__(12),
	    $isExtensible = Object.isExtensible;
	
	$export($export.S, 'Reflect', {
	  isExtensible: function isExtensible(target) {
	    anObject(target);
	    return $isExtensible ? $isExtensible(target) : true;
	  }
	});

/***/ },
/* 243 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	// 26.1.11 Reflect.ownKeys(target)
	var $export = __webpack_require__(8);
	
	$export($export.S, 'Reflect', { ownKeys: __webpack_require__(244) });

/***/ },
/* 244 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	// all object keys, includes non-enumerable and symbols
	var gOPN = __webpack_require__(50),
	    gOPS = __webpack_require__(43),
	    anObject = __webpack_require__(12),
	    Reflect = __webpack_require__(4).Reflect;
	module.exports = Reflect && Reflect.ownKeys || function ownKeys(it) {
	  var keys = gOPN.f(anObject(it)),
	      getSymbols = gOPS.f;
	  return getSymbols ? keys.concat(getSymbols(it)) : keys;
	};

/***/ },
/* 245 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	// 26.1.12 Reflect.preventExtensions(target)
	var $export = __webpack_require__(8),
	    anObject = __webpack_require__(12),
	    $preventExtensions = Object.preventExtensions;
	
	$export($export.S, 'Reflect', {
	  preventExtensions: function preventExtensions(target) {
	    anObject(target);
	    try {
	      if ($preventExtensions) $preventExtensions(target);
	      return true;
	    } catch (e) {
	      return false;
	    }
	  }
	});

/***/ },
/* 246 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	// 26.1.13 Reflect.set(target, propertyKey, V [, receiver])
	var dP = __webpack_require__(11),
	    gOPD = __webpack_require__(51),
	    getPrototypeOf = __webpack_require__(59),
	    has = __webpack_require__(5),
	    $export = __webpack_require__(8),
	    createDesc = __webpack_require__(17),
	    anObject = __webpack_require__(12),
	    isObject = __webpack_require__(13);
	
	function set(target, propertyKey, V /*, receiver*/) {
	  var receiver = arguments.length < 4 ? target : arguments[3],
	      ownDesc = gOPD.f(anObject(target), propertyKey),
	      existingDescriptor,
	      proto;
	  if (!ownDesc) {
	    if (isObject(proto = getPrototypeOf(target))) {
	      return set(proto, propertyKey, V, receiver);
	    }
	    ownDesc = createDesc(0);
	  }
	  if (has(ownDesc, 'value')) {
	    if (ownDesc.writable === false || !isObject(receiver)) return false;
	    existingDescriptor = gOPD.f(receiver, propertyKey) || createDesc(0);
	    existingDescriptor.value = V;
	    dP.f(receiver, propertyKey, existingDescriptor);
	    return true;
	  }
	  return ownDesc.set === undefined ? false : (ownDesc.set.call(receiver, V), true);
	}
	
	$export($export.S, 'Reflect', { set: set });

/***/ },
/* 247 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	// 26.1.14 Reflect.setPrototypeOf(target, proto)
	var $export = __webpack_require__(8),
	    setProto = __webpack_require__(73);
	
	if (setProto) $export($export.S, 'Reflect', {
	  setPrototypeOf: function setPrototypeOf(target, proto) {
	    setProto.check(target, proto);
	    try {
	      setProto.set(target, proto);
	      return true;
	    } catch (e) {
	      return false;
	    }
	  }
	});

/***/ },
/* 248 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// https://github.com/tc39/Array.prototype.includes
	
	var $export = __webpack_require__(8),
	    $includes = __webpack_require__(36)(true);
	
	$export($export.P, 'Array', {
	  includes: function includes(el /*, fromIndex = 0 */) {
	    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});
	
	__webpack_require__(187)('includes');

/***/ },
/* 249 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// https://github.com/mathiasbynens/String.prototype.at
	
	var $export = __webpack_require__(8),
	    $at = __webpack_require__(128)(true);
	
	$export($export.P, 'String', {
	  at: function at(pos) {
	    return $at(this, pos);
	  }
	});

/***/ },
/* 250 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// https://github.com/tc39/proposal-string-pad-start-end
	
	var $export = __webpack_require__(8),
	    $pad = __webpack_require__(251);
	
	$export($export.P, 'String', {
	  padStart: function padStart(maxLength /*, fillString = ' ' */) {
	    return $pad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, true);
	  }
	});

/***/ },
/* 251 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	// https://github.com/tc39/proposal-string-pad-start-end
	var toLength = __webpack_require__(37),
	    repeat = __webpack_require__(92),
	    defined = __webpack_require__(35);
	
	module.exports = function (that, maxLength, fillString, left) {
	  var S = String(defined(that)),
	      stringLength = S.length,
	      fillStr = fillString === undefined ? ' ' : String(fillString),
	      intMaxLength = toLength(maxLength);
	  if (intMaxLength <= stringLength || fillStr == '') return S;
	  var fillLen = intMaxLength - stringLength,
	      stringFiller = repeat.call(fillStr, Math.ceil(fillLen / fillStr.length));
	  if (stringFiller.length > fillLen) stringFiller = stringFiller.slice(0, fillLen);
	  return left ? stringFiller + S : S + stringFiller;
	};

/***/ },
/* 252 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// https://github.com/tc39/proposal-string-pad-start-end
	
	var $export = __webpack_require__(8),
	    $pad = __webpack_require__(251);
	
	$export($export.P, 'String', {
	  padEnd: function padEnd(maxLength /*, fillString = ' ' */) {
	    return $pad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, false);
	  }
	});

/***/ },
/* 253 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// https://github.com/sebmarkbage/ecmascript-string-left-right-trim
	
	__webpack_require__(83)('trimLeft', function ($trim) {
	  return function trimLeft() {
	    return $trim(this, 1);
	  };
	}, 'trimStart');

/***/ },
/* 254 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// https://github.com/sebmarkbage/ecmascript-string-left-right-trim
	
	__webpack_require__(83)('trimRight', function ($trim) {
	  return function trimRight() {
	    return $trim(this, 2);
	  };
	}, 'trimEnd');

/***/ },
/* 255 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// https://tc39.github.io/String.prototype.matchAll/
	
	var $export = __webpack_require__(8),
	    defined = __webpack_require__(35),
	    toLength = __webpack_require__(37),
	    isRegExp = __webpack_require__(135),
	    getFlags = __webpack_require__(197),
	    RegExpProto = RegExp.prototype;
	
	var $RegExpStringIterator = function $RegExpStringIterator(regexp, string) {
	  this._r = regexp;
	  this._s = string;
	};
	
	__webpack_require__(131)($RegExpStringIterator, 'RegExp String', function next() {
	  var match = this._r.exec(this._s);
	  return { value: match, done: match === null };
	});
	
	$export($export.P, 'String', {
	  matchAll: function matchAll(regexp) {
	    defined(this);
	    if (!isRegExp(regexp)) throw TypeError(regexp + ' is not a regexp!');
	    var S = String(this),
	        flags = 'flags' in RegExpProto ? String(regexp.flags) : getFlags.call(regexp),
	        rx = new RegExp(regexp.source, ~flags.indexOf('g') ? flags : 'g' + flags);
	    rx.lastIndex = toLength(regexp.lastIndex);
	    return new $RegExpStringIterator(rx, S);
	  }
	});

/***/ },
/* 256 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(27)('asyncIterator');

/***/ },
/* 257 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(27)('observable');

/***/ },
/* 258 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	// https://github.com/tc39/proposal-object-getownpropertydescriptors
	var $export = __webpack_require__(8),
	    ownKeys = __webpack_require__(244),
	    toIObject = __webpack_require__(32),
	    gOPD = __webpack_require__(51),
	    createProperty = __webpack_require__(164);
	
	$export($export.S, 'Object', {
	  getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object) {
	    var O = toIObject(object),
	        getDesc = gOPD.f,
	        keys = ownKeys(O),
	        result = {},
	        i = 0,
	        key,
	        D;
	    while (keys.length > i) {
	      createProperty(result, key = keys[i++], getDesc(O, key));
	    }return result;
	  }
	});

/***/ },
/* 259 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	// https://github.com/tc39/proposal-object-values-entries
	var $export = __webpack_require__(8),
	    $values = __webpack_require__(260)(false);
	
	$export($export.S, 'Object', {
	  values: function values(it) {
	    return $values(it);
	  }
	});

/***/ },
/* 260 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var getKeys = __webpack_require__(30),
	    toIObject = __webpack_require__(32),
	    isEnum = __webpack_require__(44).f;
	module.exports = function (isEntries) {
	  return function (it) {
	    var O = toIObject(it),
	        keys = getKeys(O),
	        length = keys.length,
	        i = 0,
	        result = [],
	        key;
	    while (length > i) {
	      if (isEnum.call(O, key = keys[i++])) {
	        result.push(isEntries ? [key, O[key]] : O[key]);
	      }
	    }return result;
	  };
	};

/***/ },
/* 261 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	// https://github.com/tc39/proposal-object-values-entries
	var $export = __webpack_require__(8),
	    $entries = __webpack_require__(260)(true);
	
	$export($export.S, 'Object', {
	  entries: function entries(it) {
	    return $entries(it);
	  }
	});

/***/ },
/* 262 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var $export = __webpack_require__(8),
	    toObject = __webpack_require__(58),
	    aFunction = __webpack_require__(21),
	    $defineProperty = __webpack_require__(11);
	
	// B.2.2.2 Object.prototype.__defineGetter__(P, getter)
	__webpack_require__(6) && $export($export.P + __webpack_require__(263), 'Object', {
	  __defineGetter__: function __defineGetter__(P, getter) {
	    $defineProperty.f(toObject(this), P, { get: aFunction(getter), enumerable: true, configurable: true });
	  }
	});

/***/ },
/* 263 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	// Forced replacement prototype accessors methods
	module.exports = __webpack_require__(28) || !__webpack_require__(7)(function () {
	  var K = Math.random();
	  // In FF throws only define methods
	  __defineSetter__.call(null, K, function () {/* empty */});
	  delete __webpack_require__(4)[K];
	});

/***/ },
/* 264 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var $export = __webpack_require__(8),
	    toObject = __webpack_require__(58),
	    aFunction = __webpack_require__(21),
	    $defineProperty = __webpack_require__(11);
	
	// B.2.2.3 Object.prototype.__defineSetter__(P, setter)
	__webpack_require__(6) && $export($export.P + __webpack_require__(263), 'Object', {
	  __defineSetter__: function __defineSetter__(P, setter) {
	    $defineProperty.f(toObject(this), P, { set: aFunction(setter), enumerable: true, configurable: true });
	  }
	});

/***/ },
/* 265 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var $export = __webpack_require__(8),
	    toObject = __webpack_require__(58),
	    toPrimitive = __webpack_require__(16),
	    getPrototypeOf = __webpack_require__(59),
	    getOwnPropertyDescriptor = __webpack_require__(51).f;
	
	// B.2.2.4 Object.prototype.__lookupGetter__(P)
	__webpack_require__(6) && $export($export.P + __webpack_require__(263), 'Object', {
	  __lookupGetter__: function __lookupGetter__(P) {
	    var O = toObject(this),
	        K = toPrimitive(P, true),
	        D;
	    do {
	      if (D = getOwnPropertyDescriptor(O, K)) return D.get;
	    } while (O = getPrototypeOf(O));
	  }
	});

/***/ },
/* 266 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var $export = __webpack_require__(8),
	    toObject = __webpack_require__(58),
	    toPrimitive = __webpack_require__(16),
	    getPrototypeOf = __webpack_require__(59),
	    getOwnPropertyDescriptor = __webpack_require__(51).f;
	
	// B.2.2.5 Object.prototype.__lookupSetter__(P)
	__webpack_require__(6) && $export($export.P + __webpack_require__(263), 'Object', {
	  __lookupSetter__: function __lookupSetter__(P) {
	    var O = toObject(this),
	        K = toPrimitive(P, true),
	        D;
	    do {
	      if (D = getOwnPropertyDescriptor(O, K)) return D.set;
	    } while (O = getPrototypeOf(O));
	  }
	});

/***/ },
/* 267 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	// https://github.com/DavidBruant/Map-Set.prototype.toJSON
	var $export = __webpack_require__(8);
	
	$export($export.P + $export.R, 'Map', { toJSON: __webpack_require__(268)('Map') });

/***/ },
/* 268 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	// https://github.com/DavidBruant/Map-Set.prototype.toJSON
	var classof = __webpack_require__(75),
	    from = __webpack_require__(269);
	module.exports = function (NAME) {
	  return function toJSON() {
	    if (classof(this) != NAME) throw TypeError(NAME + "#toJSON isn't generic");
	    return from(this);
	  };
	};

/***/ },
/* 269 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var forOf = __webpack_require__(206);
	
	module.exports = function (iter, ITERATOR) {
	  var result = [];
	  forOf(iter, false, result.push, result, ITERATOR);
	  return result;
	};

/***/ },
/* 270 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	// https://github.com/DavidBruant/Map-Set.prototype.toJSON
	var $export = __webpack_require__(8);
	
	$export($export.P + $export.R, 'Set', { toJSON: __webpack_require__(268)('Set') });

/***/ },
/* 271 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	// https://github.com/ljharb/proposal-global
	var $export = __webpack_require__(8);
	
	$export($export.S, 'System', { global: __webpack_require__(4) });

/***/ },
/* 272 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	// https://github.com/ljharb/proposal-is-error
	var $export = __webpack_require__(8),
	    cof = __webpack_require__(34);
	
	$export($export.S, 'Error', {
	  isError: function isError(it) {
	    return cof(it) === 'Error';
	  }
	});

/***/ },
/* 273 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
	var $export = __webpack_require__(8);
	
	$export($export.S, 'Math', {
	  iaddh: function iaddh(x0, x1, y0, y1) {
	    var $x0 = x0 >>> 0,
	        $x1 = x1 >>> 0,
	        $y0 = y0 >>> 0;
	    return $x1 + (y1 >>> 0) + (($x0 & $y0 | ($x0 | $y0) & ~($x0 + $y0 >>> 0)) >>> 31) | 0;
	  }
	});

/***/ },
/* 274 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
	var $export = __webpack_require__(8);
	
	$export($export.S, 'Math', {
	  isubh: function isubh(x0, x1, y0, y1) {
	    var $x0 = x0 >>> 0,
	        $x1 = x1 >>> 0,
	        $y0 = y0 >>> 0;
	    return $x1 - (y1 >>> 0) - ((~$x0 & $y0 | ~($x0 ^ $y0) & $x0 - $y0 >>> 0) >>> 31) | 0;
	  }
	});

/***/ },
/* 275 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
	var $export = __webpack_require__(8);
	
	$export($export.S, 'Math', {
	  imulh: function imulh(u, v) {
	    var UINT16 = 0xffff,
	        $u = +u,
	        $v = +v,
	        u0 = $u & UINT16,
	        v0 = $v & UINT16,
	        u1 = $u >> 16,
	        v1 = $v >> 16,
	        t = (u1 * v0 >>> 0) + (u0 * v0 >>> 16);
	    return u1 * v1 + (t >> 16) + ((u0 * v1 >>> 0) + (t & UINT16) >> 16);
	  }
	});

/***/ },
/* 276 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
	var $export = __webpack_require__(8);
	
	$export($export.S, 'Math', {
	  umulh: function umulh(u, v) {
	    var UINT16 = 0xffff,
	        $u = +u,
	        $v = +v,
	        u0 = $u & UINT16,
	        v0 = $v & UINT16,
	        u1 = $u >>> 16,
	        v1 = $v >>> 16,
	        t = (u1 * v0 >>> 0) + (u0 * v0 >>> 16);
	    return u1 * v1 + (t >>> 16) + ((u0 * v1 >>> 0) + (t & UINT16) >>> 16);
	  }
	});

/***/ },
/* 277 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var metadata = __webpack_require__(278),
	    anObject = __webpack_require__(12),
	    toMetaKey = metadata.key,
	    ordinaryDefineOwnMetadata = metadata.set;
	
	metadata.exp({ defineMetadata: function defineMetadata(metadataKey, metadataValue, target, targetKey) {
	    ordinaryDefineOwnMetadata(metadataKey, metadataValue, anObject(target), toMetaKey(targetKey));
	  } });

/***/ },
/* 278 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	var Map = __webpack_require__(211),
	    $export = __webpack_require__(8),
	    shared = __webpack_require__(23)('metadata'),
	    store = shared.store || (shared.store = new (__webpack_require__(215))());
	
	var getOrCreateMetadataMap = function getOrCreateMetadataMap(target, targetKey, create) {
	  var targetMetadata = store.get(target);
	  if (!targetMetadata) {
	    if (!create) return undefined;
	    store.set(target, targetMetadata = new Map());
	  }
	  var keyMetadata = targetMetadata.get(targetKey);
	  if (!keyMetadata) {
	    if (!create) return undefined;
	    targetMetadata.set(targetKey, keyMetadata = new Map());
	  }return keyMetadata;
	};
	var ordinaryHasOwnMetadata = function ordinaryHasOwnMetadata(MetadataKey, O, P) {
	  var metadataMap = getOrCreateMetadataMap(O, P, false);
	  return metadataMap === undefined ? false : metadataMap.has(MetadataKey);
	};
	var ordinaryGetOwnMetadata = function ordinaryGetOwnMetadata(MetadataKey, O, P) {
	  var metadataMap = getOrCreateMetadataMap(O, P, false);
	  return metadataMap === undefined ? undefined : metadataMap.get(MetadataKey);
	};
	var ordinaryDefineOwnMetadata = function ordinaryDefineOwnMetadata(MetadataKey, MetadataValue, O, P) {
	  getOrCreateMetadataMap(O, P, true).set(MetadataKey, MetadataValue);
	};
	var ordinaryOwnMetadataKeys = function ordinaryOwnMetadataKeys(target, targetKey) {
	  var metadataMap = getOrCreateMetadataMap(target, targetKey, false),
	      keys = [];
	  if (metadataMap) metadataMap.forEach(function (_, key) {
	    keys.push(key);
	  });
	  return keys;
	};
	var toMetaKey = function toMetaKey(it) {
	  return it === undefined || (typeof it === 'undefined' ? 'undefined' : _typeof(it)) == 'symbol' ? it : String(it);
	};
	var exp = function exp(O) {
	  $export($export.S, 'Reflect', O);
	};
	
	module.exports = {
	  store: store,
	  map: getOrCreateMetadataMap,
	  has: ordinaryHasOwnMetadata,
	  get: ordinaryGetOwnMetadata,
	  set: ordinaryDefineOwnMetadata,
	  keys: ordinaryOwnMetadataKeys,
	  key: toMetaKey,
	  exp: exp
	};

/***/ },
/* 279 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var metadata = __webpack_require__(278),
	    anObject = __webpack_require__(12),
	    toMetaKey = metadata.key,
	    getOrCreateMetadataMap = metadata.map,
	    store = metadata.store;
	
	metadata.exp({ deleteMetadata: function deleteMetadata(metadataKey, target /*, targetKey */) {
	    var targetKey = arguments.length < 3 ? undefined : toMetaKey(arguments[2]),
	        metadataMap = getOrCreateMetadataMap(anObject(target), targetKey, false);
	    if (metadataMap === undefined || !metadataMap['delete'](metadataKey)) return false;
	    if (metadataMap.size) return true;
	    var targetMetadata = store.get(target);
	    targetMetadata['delete'](targetKey);
	    return !!targetMetadata.size || store['delete'](target);
	  } });

/***/ },
/* 280 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var metadata = __webpack_require__(278),
	    anObject = __webpack_require__(12),
	    getPrototypeOf = __webpack_require__(59),
	    ordinaryHasOwnMetadata = metadata.has,
	    ordinaryGetOwnMetadata = metadata.get,
	    toMetaKey = metadata.key;
	
	var ordinaryGetMetadata = function ordinaryGetMetadata(MetadataKey, O, P) {
	  var hasOwn = ordinaryHasOwnMetadata(MetadataKey, O, P);
	  if (hasOwn) return ordinaryGetOwnMetadata(MetadataKey, O, P);
	  var parent = getPrototypeOf(O);
	  return parent !== null ? ordinaryGetMetadata(MetadataKey, parent, P) : undefined;
	};
	
	metadata.exp({ getMetadata: function getMetadata(metadataKey, target /*, targetKey */) {
	    return ordinaryGetMetadata(metadataKey, anObject(target), arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
	  } });

/***/ },
/* 281 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Set = __webpack_require__(214),
	    from = __webpack_require__(269),
	    metadata = __webpack_require__(278),
	    anObject = __webpack_require__(12),
	    getPrototypeOf = __webpack_require__(59),
	    ordinaryOwnMetadataKeys = metadata.keys,
	    toMetaKey = metadata.key;
	
	var ordinaryMetadataKeys = function ordinaryMetadataKeys(O, P) {
	  var oKeys = ordinaryOwnMetadataKeys(O, P),
	      parent = getPrototypeOf(O);
	  if (parent === null) return oKeys;
	  var pKeys = ordinaryMetadataKeys(parent, P);
	  return pKeys.length ? oKeys.length ? from(new Set(oKeys.concat(pKeys))) : pKeys : oKeys;
	};
	
	metadata.exp({ getMetadataKeys: function getMetadataKeys(target /*, targetKey */) {
	    return ordinaryMetadataKeys(anObject(target), arguments.length < 2 ? undefined : toMetaKey(arguments[1]));
	  } });

/***/ },
/* 282 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var metadata = __webpack_require__(278),
	    anObject = __webpack_require__(12),
	    ordinaryGetOwnMetadata = metadata.get,
	    toMetaKey = metadata.key;
	
	metadata.exp({ getOwnMetadata: function getOwnMetadata(metadataKey, target /*, targetKey */) {
	    return ordinaryGetOwnMetadata(metadataKey, anObject(target), arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
	  } });

/***/ },
/* 283 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var metadata = __webpack_require__(278),
	    anObject = __webpack_require__(12),
	    ordinaryOwnMetadataKeys = metadata.keys,
	    toMetaKey = metadata.key;
	
	metadata.exp({ getOwnMetadataKeys: function getOwnMetadataKeys(target /*, targetKey */) {
	    return ordinaryOwnMetadataKeys(anObject(target), arguments.length < 2 ? undefined : toMetaKey(arguments[1]));
	  } });

/***/ },
/* 284 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var metadata = __webpack_require__(278),
	    anObject = __webpack_require__(12),
	    getPrototypeOf = __webpack_require__(59),
	    ordinaryHasOwnMetadata = metadata.has,
	    toMetaKey = metadata.key;
	
	var ordinaryHasMetadata = function ordinaryHasMetadata(MetadataKey, O, P) {
	  var hasOwn = ordinaryHasOwnMetadata(MetadataKey, O, P);
	  if (hasOwn) return true;
	  var parent = getPrototypeOf(O);
	  return parent !== null ? ordinaryHasMetadata(MetadataKey, parent, P) : false;
	};
	
	metadata.exp({ hasMetadata: function hasMetadata(metadataKey, target /*, targetKey */) {
	    return ordinaryHasMetadata(metadataKey, anObject(target), arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
	  } });

/***/ },
/* 285 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var metadata = __webpack_require__(278),
	    anObject = __webpack_require__(12),
	    ordinaryHasOwnMetadata = metadata.has,
	    toMetaKey = metadata.key;
	
	metadata.exp({ hasOwnMetadata: function hasOwnMetadata(metadataKey, target /*, targetKey */) {
	    return ordinaryHasOwnMetadata(metadataKey, anObject(target), arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
	  } });

/***/ },
/* 286 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var metadata = __webpack_require__(278),
	    anObject = __webpack_require__(12),
	    aFunction = __webpack_require__(21),
	    toMetaKey = metadata.key,
	    ordinaryDefineOwnMetadata = metadata.set;
	
	metadata.exp({ metadata: function metadata(metadataKey, metadataValue) {
	    return function decorator(target, targetKey) {
	      ordinaryDefineOwnMetadata(metadataKey, metadataValue, (targetKey !== undefined ? anObject : aFunction)(target), toMetaKey(targetKey));
	    };
	  } });

/***/ },
/* 287 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	// https://github.com/rwaldron/tc39-notes/blob/master/es6/2014-09/sept-25.md#510-globalasap-for-enqueuing-a-microtask
	var $export = __webpack_require__(8),
	    microtask = __webpack_require__(209)(),
	    process = __webpack_require__(4).process,
	    isNode = __webpack_require__(34)(process) == 'process';
	
	$export($export.G, {
	  asap: function asap(fn) {
	    var domain = isNode && process.domain;
	    microtask(domain ? domain.bind(fn) : fn);
	  }
	});

/***/ },
/* 288 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// https://github.com/zenparsing/es-observable
	
	var $export = __webpack_require__(8),
	    global = __webpack_require__(4),
	    core = __webpack_require__(9),
	    microtask = __webpack_require__(209)(),
	    OBSERVABLE = __webpack_require__(25)('observable'),
	    aFunction = __webpack_require__(21),
	    anObject = __webpack_require__(12),
	    anInstance = __webpack_require__(90),
	    redefineAll = __webpack_require__(210),
	    hide = __webpack_require__(10),
	    forOf = __webpack_require__(206),
	    RETURN = forOf.RETURN;
	
	var getMethod = function getMethod(fn) {
	  return fn == null ? undefined : aFunction(fn);
	};
	
	var cleanupSubscription = function cleanupSubscription(subscription) {
	  var cleanup = subscription._c;
	  if (cleanup) {
	    subscription._c = undefined;
	    cleanup();
	  }
	};
	
	var subscriptionClosed = function subscriptionClosed(subscription) {
	  return subscription._o === undefined;
	};
	
	var closeSubscription = function closeSubscription(subscription) {
	  if (!subscriptionClosed(subscription)) {
	    subscription._o = undefined;
	    cleanupSubscription(subscription);
	  }
	};
	
	var Subscription = function Subscription(observer, subscriber) {
	  anObject(observer);
	  this._c = undefined;
	  this._o = observer;
	  observer = new SubscriptionObserver(this);
	  try {
	    var cleanup = subscriber(observer),
	        subscription = cleanup;
	    if (cleanup != null) {
	      if (typeof cleanup.unsubscribe === 'function') cleanup = function cleanup() {
	        subscription.unsubscribe();
	      };else aFunction(cleanup);
	      this._c = cleanup;
	    }
	  } catch (e) {
	    observer.error(e);
	    return;
	  }if (subscriptionClosed(this)) cleanupSubscription(this);
	};
	
	Subscription.prototype = redefineAll({}, {
	  unsubscribe: function unsubscribe() {
	    closeSubscription(this);
	  }
	});
	
	var SubscriptionObserver = function SubscriptionObserver(subscription) {
	  this._s = subscription;
	};
	
	SubscriptionObserver.prototype = redefineAll({}, {
	  next: function next(value) {
	    var subscription = this._s;
	    if (!subscriptionClosed(subscription)) {
	      var observer = subscription._o;
	      try {
	        var m = getMethod(observer.next);
	        if (m) return m.call(observer, value);
	      } catch (e) {
	        try {
	          closeSubscription(subscription);
	        } finally {
	          throw e;
	        }
	      }
	    }
	  },
	  error: function error(value) {
	    var subscription = this._s;
	    if (subscriptionClosed(subscription)) throw value;
	    var observer = subscription._o;
	    subscription._o = undefined;
	    try {
	      var m = getMethod(observer.error);
	      if (!m) throw value;
	      value = m.call(observer, value);
	    } catch (e) {
	      try {
	        cleanupSubscription(subscription);
	      } finally {
	        throw e;
	      }
	    }cleanupSubscription(subscription);
	    return value;
	  },
	  complete: function complete(value) {
	    var subscription = this._s;
	    if (!subscriptionClosed(subscription)) {
	      var observer = subscription._o;
	      subscription._o = undefined;
	      try {
	        var m = getMethod(observer.complete);
	        value = m ? m.call(observer, value) : undefined;
	      } catch (e) {
	        try {
	          cleanupSubscription(subscription);
	        } finally {
	          throw e;
	        }
	      }cleanupSubscription(subscription);
	      return value;
	    }
	  }
	});
	
	var $Observable = function Observable(subscriber) {
	  anInstance(this, $Observable, 'Observable', '_f')._f = aFunction(subscriber);
	};
	
	redefineAll($Observable.prototype, {
	  subscribe: function subscribe(observer) {
	    return new Subscription(observer, this._f);
	  },
	  forEach: function forEach(fn) {
	    var that = this;
	    return new (core.Promise || global.Promise)(function (resolve, reject) {
	      aFunction(fn);
	      var subscription = that.subscribe({
	        next: function next(value) {
	          try {
	            return fn(value);
	          } catch (e) {
	            reject(e);
	            subscription.unsubscribe();
	          }
	        },
	        error: reject,
	        complete: resolve
	      });
	    });
	  }
	});
	
	redefineAll($Observable, {
	  from: function from(x) {
	    var C = typeof this === 'function' ? this : $Observable;
	    var method = getMethod(anObject(x)[OBSERVABLE]);
	    if (method) {
	      var observable = anObject(method.call(x));
	      return observable.constructor === C ? observable : new C(function (observer) {
	        return observable.subscribe(observer);
	      });
	    }
	    return new C(function (observer) {
	      var done = false;
	      microtask(function () {
	        if (!done) {
	          try {
	            if (forOf(x, false, function (it) {
	              observer.next(it);
	              if (done) return RETURN;
	            }) === RETURN) return;
	          } catch (e) {
	            if (done) throw e;
	            observer.error(e);
	            return;
	          }observer.complete();
	        }
	      });
	      return function () {
	        done = true;
	      };
	    });
	  },
	  of: function of() {
	    for (var i = 0, l = arguments.length, items = Array(l); i < l;) {
	      items[i] = arguments[i++];
	    }return new (typeof this === 'function' ? this : $Observable)(function (observer) {
	      var done = false;
	      microtask(function () {
	        if (!done) {
	          for (var i = 0; i < items.length; ++i) {
	            observer.next(items[i]);
	            if (done) return;
	          }observer.complete();
	        }
	      });
	      return function () {
	        done = true;
	      };
	    });
	  }
	});
	
	hide($Observable.prototype, OBSERVABLE, function () {
	  return this;
	});
	
	$export($export.G, { Observable: $Observable });
	
	__webpack_require__(193)('Observable');

/***/ },
/* 289 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	// ie9- setTimeout & setInterval additional parameters fix
	var global = __webpack_require__(4),
	    $export = __webpack_require__(8),
	    invoke = __webpack_require__(78),
	    partial = __webpack_require__(290),
	    navigator = global.navigator,
	    MSIE = !!navigator && /MSIE .\./.test(navigator.userAgent); // <- dirty ie9- check
	var wrap = function wrap(set) {
	  return MSIE ? function (fn, time /*, ...args */) {
	    return set(invoke(partial, [].slice.call(arguments, 2), typeof fn == 'function' ? fn : Function(fn)), time);
	  } : set;
	};
	$export($export.G + $export.B + $export.F * MSIE, {
	  setTimeout: wrap(global.setTimeout),
	  setInterval: wrap(global.setInterval)
	});

/***/ },
/* 290 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var path = __webpack_require__(291),
	    invoke = __webpack_require__(78),
	    aFunction = __webpack_require__(21);
	module.exports = function () /* ...pargs */{
	  var fn = aFunction(this),
	      length = arguments.length,
	      pargs = Array(length),
	      i = 0,
	      _ = path._,
	      holder = false;
	  while (length > i) {
	    if ((pargs[i] = arguments[i++]) === _) holder = true;
	  }return function () /* ...args */{
	    var that = this,
	        aLen = arguments.length,
	        j = 0,
	        k = 0,
	        args;
	    if (!holder && !aLen) return invoke(fn, pargs, that);
	    args = pargs.slice();
	    if (holder) for (; length > j; j++) {
	      if (args[j] === _) args[j] = arguments[k++];
	    }while (aLen > k) {
	      args.push(arguments[k++]);
	    }return invoke(fn, args, that);
	  };
	};

/***/ },
/* 291 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	module.exports = __webpack_require__(4);

/***/ },
/* 292 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var $export = __webpack_require__(8),
	    $task = __webpack_require__(208);
	$export($export.G + $export.B, {
	  setImmediate: $task.set,
	  clearImmediate: $task.clear
	});

/***/ },
/* 293 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var $iterators = __webpack_require__(194),
	    redefine = __webpack_require__(18),
	    global = __webpack_require__(4),
	    hide = __webpack_require__(10),
	    Iterators = __webpack_require__(130),
	    wks = __webpack_require__(25),
	    ITERATOR = wks('iterator'),
	    TO_STRING_TAG = wks('toStringTag'),
	    ArrayValues = Iterators.Array;
	
	for (var collections = ['NodeList', 'DOMTokenList', 'MediaList', 'StyleSheetList', 'CSSRuleList'], i = 0; i < 5; i++) {
	  var NAME = collections[i],
	      Collection = global[NAME],
	      proto = Collection && Collection.prototype,
	      key;
	  if (proto) {
	    if (!proto[ITERATOR]) hide(proto, ITERATOR, ArrayValues);
	    if (!proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
	    Iterators[NAME] = ArrayValues;
	    for (key in $iterators) {
	      if (!proto[key]) redefine(proto, key, $iterators[key], true);
	    }
	  }
	}

/***/ },
/* 294 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global, module, process) {"use strict";
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	/**
	 * Copyright (c) 2014, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * https://raw.github.com/facebook/regenerator/master/LICENSE file. An
	 * additional grant of patent rights can be found in the PATENTS file in
	 * the same directory.
	 */
	
	!function (global) {
	  "use strict";
	
	  var hasOwn = Object.prototype.hasOwnProperty;
	  var undefined; // More compressible than void 0.
	  var iteratorSymbol = typeof Symbol === "function" && Symbol.iterator || "@@iterator";
	
	  var inModule = ( false ? "undefined" : _typeof(module)) === "object";
	  var runtime = global.regeneratorRuntime;
	  if (runtime) {
	    if (inModule) {
	      // If regeneratorRuntime is defined globally and we're in a module,
	      // make the exports object identical to regeneratorRuntime.
	      module.exports = runtime;
	    }
	    // Don't bother evaluating the rest of this file if the runtime was
	    // already defined globally.
	    return;
	  }
	
	  // Define the runtime globally (as expected by generated code) as either
	  // module.exports (if we're in a module) or a new, empty object.
	  runtime = global.regeneratorRuntime = inModule ? module.exports : {};
	
	  function wrap(innerFn, outerFn, self, tryLocsList) {
	    // If outerFn provided, then outerFn.prototype instanceof Generator.
	    var generator = Object.create((outerFn || Generator).prototype);
	    var context = new Context(tryLocsList || []);
	
	    // The ._invoke method unifies the implementations of the .next,
	    // .throw, and .return methods.
	    generator._invoke = makeInvokeMethod(innerFn, self, context);
	
	    return generator;
	  }
	  runtime.wrap = wrap;
	
	  // Try/catch helper to minimize deoptimizations. Returns a completion
	  // record like context.tryEntries[i].completion. This interface could
	  // have been (and was previously) designed to take a closure to be
	  // invoked without arguments, but in all the cases we care about we
	  // already have an existing method we want to call, so there's no need
	  // to create a new function object. We can even get away with assuming
	  // the method takes exactly one argument, since that happens to be true
	  // in every case, so we don't have to touch the arguments object. The
	  // only additional allocation required is the completion record, which
	  // has a stable shape and so hopefully should be cheap to allocate.
	  function tryCatch(fn, obj, arg) {
	    try {
	      return { type: "normal", arg: fn.call(obj, arg) };
	    } catch (err) {
	      return { type: "throw", arg: err };
	    }
	  }
	
	  var GenStateSuspendedStart = "suspendedStart";
	  var GenStateSuspendedYield = "suspendedYield";
	  var GenStateExecuting = "executing";
	  var GenStateCompleted = "completed";
	
	  // Returning this object from the innerFn has the same effect as
	  // breaking out of the dispatch switch statement.
	  var ContinueSentinel = {};
	
	  // Dummy constructor functions that we use as the .constructor and
	  // .constructor.prototype properties for functions that return Generator
	  // objects. For full spec compliance, you may wish to configure your
	  // minifier not to mangle the names of these two functions.
	  function Generator() {}
	  function GeneratorFunction() {}
	  function GeneratorFunctionPrototype() {}
	
	  var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype;
	  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
	  GeneratorFunctionPrototype.constructor = GeneratorFunction;
	  GeneratorFunction.displayName = "GeneratorFunction";
	
	  // Helper for defining the .next, .throw, and .return methods of the
	  // Iterator interface in terms of a single ._invoke method.
	  function defineIteratorMethods(prototype) {
	    ["next", "throw", "return"].forEach(function (method) {
	      prototype[method] = function (arg) {
	        return this._invoke(method, arg);
	      };
	    });
	  }
	
	  runtime.isGeneratorFunction = function (genFun) {
	    var ctor = typeof genFun === "function" && genFun.constructor;
	    return ctor ? ctor === GeneratorFunction ||
	    // For the native GeneratorFunction constructor, the best we can
	    // do is to check its .name property.
	    (ctor.displayName || ctor.name) === "GeneratorFunction" : false;
	  };
	
	  runtime.mark = function (genFun) {
	    if (Object.setPrototypeOf) {
	      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
	    } else {
	      genFun.__proto__ = GeneratorFunctionPrototype;
	    }
	    genFun.prototype = Object.create(Gp);
	    return genFun;
	  };
	
	  // Within the body of any async function, `await x` is transformed to
	  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
	  // `value instanceof AwaitArgument` to determine if the yielded value is
	  // meant to be awaited. Some may consider the name of this method too
	  // cutesy, but they are curmudgeons.
	  runtime.awrap = function (arg) {
	    return new AwaitArgument(arg);
	  };
	
	  function AwaitArgument(arg) {
	    this.arg = arg;
	  }
	
	  function AsyncIterator(generator) {
	    // This invoke function is written in a style that assumes some
	    // calling function (or Promise) will handle exceptions.
	    function invoke(method, arg) {
	      var result = generator[method](arg);
	      var value = result.value;
	      return value instanceof AwaitArgument ? Promise.resolve(value.arg).then(invokeNext, invokeThrow) : Promise.resolve(value).then(function (unwrapped) {
	        // When a yielded Promise is resolved, its final value becomes
	        // the .value of the Promise<{value,done}> result for the
	        // current iteration. If the Promise is rejected, however, the
	        // result for this iteration will be rejected with the same
	        // reason. Note that rejections of yielded Promises are not
	        // thrown back into the generator function, as is the case
	        // when an awaited Promise is rejected. This difference in
	        // behavior between yield and await is important, because it
	        // allows the consumer to decide what to do with the yielded
	        // rejection (swallow it and continue, manually .throw it back
	        // into the generator, abandon iteration, whatever). With
	        // await, by contrast, there is no opportunity to examine the
	        // rejection reason outside the generator function, so the
	        // only option is to throw it from the await expression, and
	        // let the generator function handle the exception.
	        result.value = unwrapped;
	        return result;
	      });
	    }
	
	    if ((typeof process === "undefined" ? "undefined" : _typeof(process)) === "object" && process.domain) {
	      invoke = process.domain.bind(invoke);
	    }
	
	    var invokeNext = invoke.bind(generator, "next");
	    var invokeThrow = invoke.bind(generator, "throw");
	    var invokeReturn = invoke.bind(generator, "return");
	    var previousPromise;
	
	    function enqueue(method, arg) {
	      function callInvokeWithMethodAndArg() {
	        return invoke(method, arg);
	      }
	
	      return previousPromise =
	      // If enqueue has been called before, then we want to wait until
	      // all previous Promises have been resolved before calling invoke,
	      // so that results are always delivered in the correct order. If
	      // enqueue has not been called before, then it is important to
	      // call invoke immediately, without waiting on a callback to fire,
	      // so that the async generator function has the opportunity to do
	      // any necessary setup in a predictable way. This predictability
	      // is why the Promise constructor synchronously invokes its
	      // executor callback, and why async functions synchronously
	      // execute code before the first await. Since we implement simple
	      // async functions in terms of async generators, it is especially
	      // important to get this right, even though it requires care.
	      previousPromise ? previousPromise.then(callInvokeWithMethodAndArg,
	      // Avoid propagating failures to Promises returned by later
	      // invocations of the iterator.
	      callInvokeWithMethodAndArg) : new Promise(function (resolve) {
	        resolve(callInvokeWithMethodAndArg());
	      });
	    }
	
	    // Define the unified helper method that is used to implement .next,
	    // .throw, and .return (see defineIteratorMethods).
	    this._invoke = enqueue;
	  }
	
	  defineIteratorMethods(AsyncIterator.prototype);
	
	  // Note that simple async functions are implemented on top of
	  // AsyncIterator objects; they just return a Promise for the value of
	  // the final result produced by the iterator.
	  runtime.async = function (innerFn, outerFn, self, tryLocsList) {
	    var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList));
	
	    return runtime.isGeneratorFunction(outerFn) ? iter // If outerFn is a generator, return the full iterator.
	    : iter.next().then(function (result) {
	      return result.done ? result.value : iter.next();
	    });
	  };
	
	  function makeInvokeMethod(innerFn, self, context) {
	    var state = GenStateSuspendedStart;
	
	    return function invoke(method, arg) {
	      if (state === GenStateExecuting) {
	        throw new Error("Generator is already running");
	      }
	
	      if (state === GenStateCompleted) {
	        if (method === "throw") {
	          throw arg;
	        }
	
	        // Be forgiving, per 25.3.3.3.3 of the spec:
	        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
	        return doneResult();
	      }
	
	      while (true) {
	        var delegate = context.delegate;
	        if (delegate) {
	          if (method === "return" || method === "throw" && delegate.iterator[method] === undefined) {
	            // A return or throw (when the delegate iterator has no throw
	            // method) always terminates the yield* loop.
	            context.delegate = null;
	
	            // If the delegate iterator has a return method, give it a
	            // chance to clean up.
	            var returnMethod = delegate.iterator["return"];
	            if (returnMethod) {
	              var record = tryCatch(returnMethod, delegate.iterator, arg);
	              if (record.type === "throw") {
	                // If the return method threw an exception, let that
	                // exception prevail over the original return or throw.
	                method = "throw";
	                arg = record.arg;
	                continue;
	              }
	            }
	
	            if (method === "return") {
	              // Continue with the outer return, now that the delegate
	              // iterator has been terminated.
	              continue;
	            }
	          }
	
	          var record = tryCatch(delegate.iterator[method], delegate.iterator, arg);
	
	          if (record.type === "throw") {
	            context.delegate = null;
	
	            // Like returning generator.throw(uncaught), but without the
	            // overhead of an extra function call.
	            method = "throw";
	            arg = record.arg;
	            continue;
	          }
	
	          // Delegate generator ran and handled its own exceptions so
	          // regardless of what the method was, we continue as if it is
	          // "next" with an undefined arg.
	          method = "next";
	          arg = undefined;
	
	          var info = record.arg;
	          if (info.done) {
	            context[delegate.resultName] = info.value;
	            context.next = delegate.nextLoc;
	          } else {
	            state = GenStateSuspendedYield;
	            return info;
	          }
	
	          context.delegate = null;
	        }
	
	        if (method === "next") {
	          context._sent = arg;
	
	          if (state === GenStateSuspendedYield) {
	            context.sent = arg;
	          } else {
	            context.sent = undefined;
	          }
	        } else if (method === "throw") {
	          if (state === GenStateSuspendedStart) {
	            state = GenStateCompleted;
	            throw arg;
	          }
	
	          if (context.dispatchException(arg)) {
	            // If the dispatched exception was caught by a catch block,
	            // then let that catch block handle the exception normally.
	            method = "next";
	            arg = undefined;
	          }
	        } else if (method === "return") {
	          context.abrupt("return", arg);
	        }
	
	        state = GenStateExecuting;
	
	        var record = tryCatch(innerFn, self, context);
	        if (record.type === "normal") {
	          // If an exception is thrown from innerFn, we leave state ===
	          // GenStateExecuting and loop back for another invocation.
	          state = context.done ? GenStateCompleted : GenStateSuspendedYield;
	
	          var info = {
	            value: record.arg,
	            done: context.done
	          };
	
	          if (record.arg === ContinueSentinel) {
	            if (context.delegate && method === "next") {
	              // Deliberately forget the last sent value so that we don't
	              // accidentally pass it on to the delegate.
	              arg = undefined;
	            }
	          } else {
	            return info;
	          }
	        } else if (record.type === "throw") {
	          state = GenStateCompleted;
	          // Dispatch the exception by looping back around to the
	          // context.dispatchException(arg) call above.
	          method = "throw";
	          arg = record.arg;
	        }
	      }
	    };
	  }
	
	  // Define Generator.prototype.{next,throw,return} in terms of the
	  // unified ._invoke helper method.
	  defineIteratorMethods(Gp);
	
	  Gp[iteratorSymbol] = function () {
	    return this;
	  };
	
	  Gp.toString = function () {
	    return "[object Generator]";
	  };
	
	  function pushTryEntry(locs) {
	    var entry = { tryLoc: locs[0] };
	
	    if (1 in locs) {
	      entry.catchLoc = locs[1];
	    }
	
	    if (2 in locs) {
	      entry.finallyLoc = locs[2];
	      entry.afterLoc = locs[3];
	    }
	
	    this.tryEntries.push(entry);
	  }
	
	  function resetTryEntry(entry) {
	    var record = entry.completion || {};
	    record.type = "normal";
	    delete record.arg;
	    entry.completion = record;
	  }
	
	  function Context(tryLocsList) {
	    // The root entry object (effectively a try statement without a catch
	    // or a finally block) gives us a place to store values thrown from
	    // locations where there is no enclosing try statement.
	    this.tryEntries = [{ tryLoc: "root" }];
	    tryLocsList.forEach(pushTryEntry, this);
	    this.reset(true);
	  }
	
	  runtime.keys = function (object) {
	    var keys = [];
	    for (var key in object) {
	      keys.push(key);
	    }
	    keys.reverse();
	
	    // Rather than returning an object with a next method, we keep
	    // things simple and return the next function itself.
	    return function next() {
	      while (keys.length) {
	        var key = keys.pop();
	        if (key in object) {
	          next.value = key;
	          next.done = false;
	          return next;
	        }
	      }
	
	      // To avoid creating an additional object, we just hang the .value
	      // and .done properties off the next function object itself. This
	      // also ensures that the minifier will not anonymize the function.
	      next.done = true;
	      return next;
	    };
	  };
	
	  function values(iterable) {
	    if (iterable) {
	      var iteratorMethod = iterable[iteratorSymbol];
	      if (iteratorMethod) {
	        return iteratorMethod.call(iterable);
	      }
	
	      if (typeof iterable.next === "function") {
	        return iterable;
	      }
	
	      if (!isNaN(iterable.length)) {
	        var i = -1,
	            next = function next() {
	          while (++i < iterable.length) {
	            if (hasOwn.call(iterable, i)) {
	              next.value = iterable[i];
	              next.done = false;
	              return next;
	            }
	          }
	
	          next.value = undefined;
	          next.done = true;
	
	          return next;
	        };
	
	        return next.next = next;
	      }
	    }
	
	    // Return an iterator with no values.
	    return { next: doneResult };
	  }
	  runtime.values = values;
	
	  function doneResult() {
	    return { value: undefined, done: true };
	  }
	
	  Context.prototype = {
	    constructor: Context,
	
	    reset: function reset(skipTempReset) {
	      this.prev = 0;
	      this.next = 0;
	      this.sent = undefined;
	      this.done = false;
	      this.delegate = null;
	
	      this.tryEntries.forEach(resetTryEntry);
	
	      if (!skipTempReset) {
	        for (var name in this) {
	          // Not sure about the optimal order of these conditions:
	          if (name.charAt(0) === "t" && hasOwn.call(this, name) && !isNaN(+name.slice(1))) {
	            this[name] = undefined;
	          }
	        }
	      }
	    },
	
	    stop: function stop() {
	      this.done = true;
	
	      var rootEntry = this.tryEntries[0];
	      var rootRecord = rootEntry.completion;
	      if (rootRecord.type === "throw") {
	        throw rootRecord.arg;
	      }
	
	      return this.rval;
	    },
	
	    dispatchException: function dispatchException(exception) {
	      if (this.done) {
	        throw exception;
	      }
	
	      var context = this;
	      function handle(loc, caught) {
	        record.type = "throw";
	        record.arg = exception;
	        context.next = loc;
	        return !!caught;
	      }
	
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        var record = entry.completion;
	
	        if (entry.tryLoc === "root") {
	          // Exception thrown outside of any try block that could handle
	          // it, so set the completion value of the entire function to
	          // throw the exception.
	          return handle("end");
	        }
	
	        if (entry.tryLoc <= this.prev) {
	          var hasCatch = hasOwn.call(entry, "catchLoc");
	          var hasFinally = hasOwn.call(entry, "finallyLoc");
	
	          if (hasCatch && hasFinally) {
	            if (this.prev < entry.catchLoc) {
	              return handle(entry.catchLoc, true);
	            } else if (this.prev < entry.finallyLoc) {
	              return handle(entry.finallyLoc);
	            }
	          } else if (hasCatch) {
	            if (this.prev < entry.catchLoc) {
	              return handle(entry.catchLoc, true);
	            }
	          } else if (hasFinally) {
	            if (this.prev < entry.finallyLoc) {
	              return handle(entry.finallyLoc);
	            }
	          } else {
	            throw new Error("try statement without catch or finally");
	          }
	        }
	      }
	    },
	
	    abrupt: function abrupt(type, arg) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
	          var finallyEntry = entry;
	          break;
	        }
	      }
	
	      if (finallyEntry && (type === "break" || type === "continue") && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc) {
	        // Ignore the finally entry if control is not jumping to a
	        // location outside the try/catch block.
	        finallyEntry = null;
	      }
	
	      var record = finallyEntry ? finallyEntry.completion : {};
	      record.type = type;
	      record.arg = arg;
	
	      if (finallyEntry) {
	        this.next = finallyEntry.finallyLoc;
	      } else {
	        this.complete(record);
	      }
	
	      return ContinueSentinel;
	    },
	
	    complete: function complete(record, afterLoc) {
	      if (record.type === "throw") {
	        throw record.arg;
	      }
	
	      if (record.type === "break" || record.type === "continue") {
	        this.next = record.arg;
	      } else if (record.type === "return") {
	        this.rval = record.arg;
	        this.next = "end";
	      } else if (record.type === "normal" && afterLoc) {
	        this.next = afterLoc;
	      }
	    },
	
	    finish: function finish(finallyLoc) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        if (entry.finallyLoc === finallyLoc) {
	          this.complete(entry.completion, entry.afterLoc);
	          resetTryEntry(entry);
	          return ContinueSentinel;
	        }
	      }
	    },
	
	    "catch": function _catch(tryLoc) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        if (entry.tryLoc === tryLoc) {
	          var record = entry.completion;
	          if (record.type === "throw") {
	            var thrown = record.arg;
	            resetTryEntry(entry);
	          }
	          return thrown;
	        }
	      }
	
	      // The context.catch method must only be called with a location
	      // argument that corresponds to a known catch block.
	      throw new Error("illegal catch attempt");
	    },
	
	    delegateYield: function delegateYield(iterable, resultName, nextLoc) {
	      this.delegate = {
	        iterator: values(iterable),
	        resultName: resultName,
	        nextLoc: nextLoc
	      };
	
	      return ContinueSentinel;
	    }
	  };
	}(
	// Among the various tricks for obtaining a reference to the global
	// object, this seems to be the most reliable technique that does not
	// use indirect eval (which violates Content Security Policy).
	(typeof global === "undefined" ? "undefined" : _typeof(global)) === "object" ? global : (typeof window === "undefined" ? "undefined" : _typeof(window)) === "object" ? window : (typeof self === "undefined" ? "undefined" : _typeof(self)) === "object" ? self : undefined);
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(295)(module), __webpack_require__(296)))

/***/ },
/* 295 */
/***/ function(module, exports) {

	"use strict";
	
	module.exports = function (module) {
		if (!module.webpackPolyfill) {
			module.deprecate = function () {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	};

/***/ },
/* 296 */
/***/ function(module, exports) {

	'use strict';
	
	// shim for using process in browser
	
	var process = module.exports = {};
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;
	
	function cleanUpNextTick() {
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}
	
	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = setTimeout(cleanUpNextTick);
	    draining = true;
	
	    var len = queue.length;
	    while (len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    clearTimeout(timeout);
	}
	
	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        setTimeout(drainQueue, 0);
	    }
	};
	
	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};
	
	function noop() {}
	
	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;
	
	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};
	
	process.cwd = function () {
	    return '/';
	};
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function () {
	    return 0;
	};

/***/ },
/* 297 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(298);
	module.exports = __webpack_require__(9).RegExp.escape;

/***/ },
/* 298 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	// https://github.com/benjamingr/RexExp.escape
	var $export = __webpack_require__(8),
	    $re = __webpack_require__(299)(/[\\^$*+?.()|[\]{}]/g, '\\$&');
	
	$export($export.S, 'RegExp', { escape: function escape(it) {
	    return $re(it);
	  } });

/***/ },
/* 299 */
/***/ function(module, exports) {

	"use strict";
	
	module.exports = function (regExp, replace) {
	  var replacer = replace === Object(replace) ? function (part) {
	    return replace[part];
	  } : replace;
	  return function (it) {
	    return String(it).replace(regExp, replacer);
	  };
	};

/***/ },
/* 300 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(301);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(303)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/postcss-loader/index.js!./common.css", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/postcss-loader/index.js!./common.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 301 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(302)();
	// imports
	
	
	// module
	exports.push([module.id, "body {\n    margin: 0;\n}\n\n.h-flex{\n    display:-webkit-box;\n    -webkit-box-orient:horizontal;\n    display:-webkit-flex;\n    display:-ms-flexbox;\n    display:flex;\n    -webkit-flex-direction:row;\n        -ms-flex-direction:row;\n            flex-direction:row;\n}\n.v-flex{\n    display:-webkit-box;\n    -webkit-box-orient:vertical;\n    display:-webkit-flex;\n    display:-ms-flexbox;\n    display:flex;\n    -webkit-flex-direction:column;\n        -ms-flex-direction:column;\n            flex-direction:column;\n}\n.vh-center{\n    display:-webkit-box;\n    -webkit-box-orient:horizontal;\n    display:-webkit-flex;\n    display:-ms-flexbox;\n    display:flex;\n    -webkit-flex-direction:row;\n        -ms-flex-direction:row;\n            flex-direction:row;\n    -webkit-box-pack:center;\n    -webkit-justify-content:center;\n        -ms-flex-pack:center;\n            justify-content:center;\n    -webkit-box-align:center;\n    -webkit-align-items:center;\n        -ms-flex-align:center;\n            align-items:center;\n}\n.h-center{\n    -webkit-box-pack:center;\n    -webkit-justify-content:center;\n        -ms-flex-pack:center;\n            justify-content:center;\n}\n.v-center{\n    -webkit-box-align:center;\n    -webkit-align-items:center;\n        -ms-flex-align:center;\n                -ms-grid-row-align:center;\n            align-items:center;\n}\n.h-start{\n    -webkit-box-pack:start;\n    -webkit-justify-content:flex-start;\n        -ms-flex-pack:start;\n            justify-content:flex-start;\n}\n.v-start{\n    -webkit-box-align:start;\n    -webkit-align-items:flex-start;\n        -ms-flex-align:start;\n                -ms-grid-row-align:flex-start;\n            align-items:flex-start;\n}\n.h-end{\n    -webkit-box-pack:end;\n    -webkit-justify-content:flex-end;\n        -ms-flex-pack:end;\n            justify-content:flex-end;\n}\n.v-end{\n    -webkit-box-align:end;\n    -webkit-align-items:flex-end;\n        -ms-flex-align:end;\n                -ms-grid-row-align:flex-end;\n            align-items:flex-end;\n}\n.flex1{\n    -webkit-box-flex:1;\n    -webkit-flex:1;\n        -ms-flex:1;\n            flex:1;\n}", ""]);
	
	// exports


/***/ },
/* 302 */
/***/ function(module, exports) {

	"use strict";
	
	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function () {
		var list = [];
	
		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for (var i = 0; i < this.length; i++) {
				var item = this[i];
				if (item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};
	
		// import a list of modules into the list
		list.i = function (modules, mediaQuery) {
			if (typeof modules === "string") modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for (var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if (typeof id === "number") alreadyImportedModules[id] = true;
			}
			for (i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if (typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if (mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if (mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};

/***/ },
/* 303 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];
	
	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}
	
		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();
	
		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";
	
		var styles = listToStyles(list);
		addStylesToDom(styles, options);
	
		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}
	
	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}
	
	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}
	
	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}
	
	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}
	
	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}
	
	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}
	
	function addStyle(obj, options) {
		var styleElement, update, remove;
	
		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}
	
		update(obj);
	
		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}
	
	var replaceText = (function () {
		var textStore = [];
	
		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();
	
	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;
	
		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}
	
	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
	
		if(media) {
			styleElement.setAttribute("media", media)
		}
	
		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}
	
	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;
	
		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}
	
		var blob = new Blob([css], { type: "text/css" });
	
		var oldSrc = linkElement.href;
	
		linkElement.href = URL.createObjectURL(blob);
	
		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 304 */
/***/ function(module, exports) {

	"use strict";
	
	/**
	 * Created by GreenDou on 16/4/28.
	 * Static Canvas Override
	 */
	
	(function () {
	  if (!fabric) {
	    return;
	  }
	
	  fabric.StaticCanvas.prototype._setBackstoreDimension = function _setBackstoreDimension(prop, value) {
	    this.lowerCanvasEl[prop] = value;
	
	    if (this.upperCanvasEl) {
	      this.upperCanvasEl[prop] = value;
	    }
	    if (this.cursorCanvasEl) {
	      this.cursorCanvasEl[prop] = value;
	    }
	    if (this.cacheCanvasEl) {
	      this.cacheCanvasEl[prop] = value;
	    }
	
	    this[prop] = value;
	
	    return this;
	  };
	
	  fabric.StaticCanvas.prototype._setCssDimension = function _setCssDimension(prop, value) {
	    this.lowerCanvasEl.style[prop] = value;
	
	    if (this.upperCanvasEl) {
	      this.upperCanvasEl.style[prop] = value;
	    }
	
	    if (this.cursorCanvasEl) {
	      this.cursorCanvasEl.style[prop] = value;
	    }
	
	    if (this.wrapperEl) {
	      this.wrapperEl.style[prop] = value;
	    }
	
	    return this;
	  };
	})();

/***/ },
/* 305 */
/***/ function(module, exports) {

	'use strict';
	
	(function (fabric) {
	  if (!fabric) {
	    return;
	  }
	  function isBrushType(brush, type) {
	    return brush.constructor === type.constructor;
	  }
	
	  fabric.Canvas.prototype.initialize = function (el, options) {
	    options || (options = {});
	
	    this._initStatic(el, options);
	    this._initInteractive();
	    this._createCacheCanvas();
	
	    this.layerManager = new fabric.LayerManager(this);
	  };
	
	  fabric.Canvas.prototype._initInteractive = function () {
	    this._currentTransform = null;
	    this._groupSelector = null;
	    this._initWrapperElement();
	    this._createUpperCanvas();
	    this._initEventListeners();
	
	    //todo: fix it for iPad
	    //this._initRetinaScaling();
	
	    this._createCursorCanvas();
	
	    this.freeDrawingBrush = fabric.PencilBrush && new fabric.PencilBrush(this);
	
	    this.calcOffset();
	  };
	
	  fabric.Canvas.prototype.renderAll = function () {
	    var canvasToDrawOn = this.contextContainer,
	        objsToRender;
	
	    if (this.contextTop && this.selection && !this._groupSelector) {
	      this.clearContext(this.contextTop);
	    }
	
	    this.clearContext(canvasToDrawOn);
	
	    this.fire('before:render');
	
	    if (this.clipTo) {
	      fabric.util.clipContext(this, canvasToDrawOn);
	    }
	    this._renderBackground(canvasToDrawOn);
	
	    canvasToDrawOn.save();
	    objsToRender = this._chooseObjectsToRender();
	    //apply viewport transform once for all rendering process
	    canvasToDrawOn.transform.apply(canvasToDrawOn, this.viewportTransform);
	    this._renderObjects(canvasToDrawOn, objsToRender);
	    this.preserveObjectStacking || this._renderObjects(canvasToDrawOn, [this.getActiveGroup()]);
	    canvasToDrawOn.restore();
	
	    if (!this.controlsAboveOverlay && this.interactive) {
	      this.drawControls(canvasToDrawOn);
	    }
	    if (this.clipTo) {
	      canvasToDrawOn.restore();
	    }
	    this._renderOverlay(canvasToDrawOn);
	    if (this.controlsAboveOverlay && this.interactive) {
	      this.drawControls(canvasToDrawOn);
	    }
	
	    this.fire('after:render');
	    return this;
	  };
	
	  fabric.Canvas.prototype.clear = function () {
	    this.layerManager.clearLayers();
	    this._objects.length = 0;
	    if (this.discardActiveGroup) {
	      this.discardActiveGroup();
	    }
	    if (this.discardActiveObject) {
	      this.discardActiveObject();
	    }
	    this.clearContext(this.contextContainer);
	    if (this.contextTop) {
	      this.clearContext(this.contextTop);
	    }
	    this.fire('canvas:cleared');
	    this.renderAll();
	    return this;
	  };
	
	  fabric.Canvas.prototype._createCursorCanvas = function () {
	    this.cursorCanvasEl = this._createCanvasElement();
	    //this.cursorCanvasEl.setAttribute('width', this.width);
	    //this.cursorCanvasEl.setAttribute('height', this.height);
	
	    this.wrapperEl.appendChild(this.cursorCanvasEl);
	
	    this._copyCanvasStyle(this.lowerCanvasEl, this.cursorCanvasEl);
	    this._applyCanvasStyle(this.cursorCanvasEl);
	    this.cursorCanvasEl.style.pointerEvents = "none";
	
	    this.contextCursor = this.cursorCanvasEl.getContext('2d');
	  };
	
	  fabric.Canvas.prototype._onMouseMoveInDrawingMode = function (e) {
	    var ivt = fabric.util.invertTransform(this.viewportTransform),
	        pointer = fabric.util.transformPoint(this.getPointer(e, true), ivt);
	    if (this._isCurrentlyDrawing) {
	      this.freeDrawingBrush.onMouseMove(pointer);
	    }
	    if (this.freeDrawingBrush.cursorRenderer) {
	      this.freeDrawingBrush.cursorRender(pointer);
	    }
	
	    this.setCursor(this.freeDrawingCursor);
	    this.fire('mouse:move', { e: e });
	
	    var target = this.findTarget(e);
	    if (typeof target !== 'undefined') {
	      target.fire('mousemove', { e: e, target: target });
	    }
	  };
	
	  fabric.Canvas.prototype.setFreeDrawingBrush = function (brush, options) {
	    var myself = this;
	    this.clearContext(this.contextTop);
	    switch (brush) {
	      case 'round':
	        if (this.freeDrawingBrush && isBrushType(this.freeDrawingBrush, fabric.RoundBrush)) {
	          this.freeDrawingBrush.setOptions(options);
	        } else {
	          this.freeDrawingBrush = new fabric.RoundBrush(this, options);
	        }
	        break;
	      case 'line':
	        if (this.freeDrawingBrush && isBrushType(this.freeDrawingBrush, fabric.LineBrush)) {
	          this.freeDrawingBrush.setOptions(options);
	        } else {
	          this.freeDrawingBrush = new fabric.LineBrush(this, options);
	        }
	        break;
	      case 'rect':
	        if (this.freeDrawingBrush && isBrushType(this.freeDrawingBrush, fabric.RectBrush)) {
	          this.freeDrawingBrush.setOptions(options);
	        } else {
	          this.freeDrawingBrush = new fabric.RectBrush(this, options);
	        }
	        break;
	      case 'eraser':
	        if (this.freeDrawingBrush && this.freeDrawingBrush instanceof fabric.EraserBrush) {
	          this.freeDrawingBrush.setOptions(options);
	        } else {
	          this.freeDrawingBrush = new fabric.EraserBrush(this, options);
	        }
	        break;
	      case 'rotation':
	        if (this.rotationPoint) {
	          options.point = {
	            x: this.rotationPoint.x,
	            y: this.rotationPoint.y
	          };
	        }
	        if (this.freeDrawingBrush && this.freeDrawingBrush instanceof fabric.PointBrush) {
	          this.freeDrawingBrush.setOptions(options);
	        } else {
	          this.freeDrawingBrush = new fabric.PointBrush(this, function (point) {
	            myself.rotationPoint = {
	              x: point.x,
	              y: point.y
	            };
	          }, options);
	        }
	        if (this.rotationPoint) {
	          this.freeDrawingBrush.renderPoint();
	        }
	        break;
	      case 'pencil':
	      default:
	        if (!(this.freeDrawingBrush && isBrushType(this.freeDrawingBrush, fabric.PencilBrush))) {
	          this.freeDrawingBrush = new fabric.PencilBrush(myself);
	        }
	        for (var prop in options) {
	          if (options.hasOwnProperty(prop)) {
	            this.freeDrawingBrush[prop] = options[prop];
	          }
	        }
	    }
	  };
	
	  fabric.Canvas.prototype.setDrawingMode = function (flag) {
	    if (!this.freeDrawingBrush || this.isDrawingMode === flag) {
	      return;
	    }
	
	    this.clearContext(this.contextTop);
	    if (flag) {
	      this.isDrawingMode = true;
	      this.upperCanvasEl.addEventListener('mouseout', this._onMouseOut);
	    } else {
	      this.isDrawingMode = false;
	      this.upperCanvasEl.removeEventListener('mouseout', this._onMouseOut);
	    }
	  };
	})(fabric);

/***/ },
/* 306 */
/***/ function(module, exports) {

	"use strict";
	
	/**
	 * Created by GreenDou on 16/4/11.
	 * Canvas Events Functions
	 */
	
	(function () {
	    "use strict;";
	
	    if (!fabric) {
	        return;
	    }
	
	    fabric.Canvas.prototype._bindEvents = function () {
	        this._onMouseDown = this._onMouseDown.bind(this);
	        this._onMouseMove = this._onMouseMove.bind(this);
	        this._onMouseUp = this._onMouseUp.bind(this);
	        this._onMouseOut = this._onMouseOut.bind(this);
	        this._onResize = this._onResize.bind(this);
	        this._onGesture = this._onGesture.bind(this);
	        this._onDrag = this._onDrag.bind(this);
	        this._onShake = this._onShake.bind(this);
	        this._onLongPress = this._onLongPress.bind(this);
	        this._onOrientationChange = this._onOrientationChange.bind(this);
	        this._onMouseWheel = this._onMouseWheel.bind(this);
	    };
	
	    fabric.Canvas.prototype._onMouseOut = function (e) {
	        if (this.isDrawingMode) {
	            this.clearContext(this.contextCursor);
	        }
	    };
	})();

/***/ },
/* 307 */
/***/ function(module, exports) {

	'use strict';
	
	(function () {
	  if (!fabric) {
	    return;
	  }
	  fabric.BaseBrush.prototype.opacity = 1;
	
	  fabric.BaseBrush.prototype.setOptions = function setOptions(options) {
	    // for (var prop in options) {
	    //   if (options.hasOwnProperty(prop)) {
	    //     this[prop] = options[prop];
	    //   }
	    // }
	    Object.assign(this, options);
	  };
	  fabric.BaseBrush.prototype._setBrushStyles = function _setBrushStyles() {
	    var ctx = this.canvas.contextTop;
	
	    ctx.strokeStyle = this.color;
	    ctx.lineWidth = this.width;
	    ctx.lineCap = this.strokeLineCap;
	    ctx.lineJoin = this.strokeLineJoin;
	    // ctx.globalAlpha = this.opacity;
	    if (this.strokeDashArray && fabric.StaticCanvas.supports('setLineDash')) {
	      ctx.setLineDash(this.strokeDashArray);
	    }
	  };
	})();

/***/ },
/* 308 */
/***/ function(module, exports) {

	'use strict';
	
	(function () {
	  if (!fabric) {
	    return;
	  }
	
	  fabric.PencilBrush.prototype.initialize = function initialize(canvas) {
	    this.canvas = canvas;
	    this._points = [];
	
	    //  cursor
	    this.canvas.freeDrawingCursor = 'none';
	    this.cursorRenderer = new fabric.CursorRenderer(this.canvas.cursorCanvasEl, this);
	  };
	
	  fabric.PencilBrush.prototype._prepareForDrawing = function _prepareForDrawing(pointer) {
	    var p = new fabric.Point(pointer.x, pointer.y);
	
	    this._reset();
	    this._addPoint(p);
	
	    this.canvas.contextTop.moveTo(p.x, p.y);
	
	    if (this.cursorRenderer) {
	      this.cursorRenderer.prepareForRender();
	    }
	  };
	
	  fabric.PencilBrush.prototype.cursorRender = function cursorRender(pointer) {
	    this.canvas.clearContext(this.canvas.contextCursor);
	    this.cursorRenderer.renderCircle(pointer.x, pointer.y);
	  };
	
	  /**
	   * Creates fabric.Path object to add on canvas
	   * @param {String} pathData Path data
	   * @return {fabric.Path} Path to add on canvas
	   */
	  fabric.PencilBrush.prototype.createPath = function createPath(pathData) {
	    var path = new fabric.Path(pathData, {
	      fill: null,
	      stroke: this.color,
	      strokeWidth: this.width,
	      strokeLineCap: this.strokeLineCap,
	      strokeLineJoin: this.strokeLineJoin,
	      strokeDashArray: this.strokeDashArray,
	      originX: 'center',
	      originY: 'center'
	    });
	
	    // opacity: this.opacity,
	    if (this.shadow) {
	      this.shadow.affectStroke = true;
	      path.setShadow(this.shadow);
	    }
	
	    return path;
	  };
	})();

/***/ },
/* 309 */
/***/ function(module, exports) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	(function (fabric) {
	  if (!fabric) {
	    return;
	  }
	
	  var Layer = function () {
	    function Layer(canvasEl, name) {
	      _classCallCheck(this, Layer);
	
	      this.canvasEl = canvasEl;
	      this.context = canvasEl.getContext('2d');
	      this.name = name || '新建图层' + Layer.count++;
	      this.parent = null;
	      this.objects = [];
	      //  Use show&hideLayer to set this value,otherwise it won't work
	      this.visible = true;
	      // this.opacity = 1;
	      this.backgroundColor = null;
	      this.backgroundImageURL = null;
	      // this.thumbnail = null;
	    }
	
	    _createClass(Layer, [{
	      key: 'opacity',
	      set: function set(newValue) {
	        this.context.globalAlpha = newValue;
	        this.parent.parentCanvas.contextTop.globalAlpha = newValue;
	        this.parent.parentCanvas.renderAll();
	      },
	      get: function get() {
	        return this.context.globalAlpha;
	      }
	    }, {
	      key: 'thumbnail',
	      get: function get() {
	        return this.canvasEl.toDataURL();
	      }
	    }], [{
	      key: 'resetCount',
	      value: function resetCount() {
	        Layer.count = 1;
	      }
	    }]);
	
	    return Layer;
	  }();
	
	  Layer.count = 1; // Static prop
	  Object.assign(fabric, {
	    Layer: Layer
	  });
	  // fabric.Layer = Layer;
	})(fabric);

/***/ },
/* 310 */
/***/ function(module, exports) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	(function (fabric) {
	  if (!fabric) {
	    return;
	  }
	
	  var LayerManager = function () {
	    function LayerManager(parentCanvas) {
	      _classCallCheck(this, LayerManager);
	
	      this.layerList = [];
	      this.currentLayer = null;
	      this.parentCanvas = parentCanvas;
	
	      if (parentCanvas) {
	        this.currentLayer = new fabric.Layer(parentCanvas.lowerCanvasEl);
	        this.currentLayer.objects = parentCanvas._objects;
	        this.addLayer(this.currentLayer);
	      }
	    }
	
	    /**
	     * Add a new layer into fabric-canvas and layer-manager
	     * @param lyr layer to add (if have one)
	     */
	
	
	    _createClass(LayerManager, [{
	      key: 'addLayer',
	      value: function addLayer(lyr) {
	        var upperCanvasEl = this.parentCanvas.upperCanvasEl;
	        var layer = lyr;
	        if (!layer) {
	          var canvasEl = this.parentCanvas._createCanvasElement();
	          layer = new fabric.Layer(canvasEl);
	        } else if (!layer.canvasEl) {
	          layer.canvasEl = new this.parentCanvas._createCanvasElement();
	        }
	        this.layerList.push(layer);
	        layer.parent = this;
	        this.parentCanvas.wrapperEl.insertBefore(layer.canvasEl, upperCanvasEl);
	
	        this.parentCanvas._copyCanvasStyle(upperCanvasEl, layer.canvasEl);
	        this.parentCanvas._applyCanvasStyle(layer.canvasEl);
	
	        this.selectLayer(this.layerList.length - 1);
	      }
	
	      /**
	       * Remove a layer
	       * @param index :layer's index
	       */
	
	    }, {
	      key: 'removeLayer',
	      value: function removeLayer(index) {
	        if (index < this.layerList.length && this.layerList.length > 1) {
	          if (this.layerList[index] === this.currentLayer) {
	            if (index === 0) {
	              this.selectLayer(1);
	            } else {
	              this.selectLayer(index - 1);
	            }
	          }
	          this.parentCanvas.wrapperEl.removeChild(this.layerList[index].canvasEl);
	          this.layerList.splice(index, 1);
	        }
	      }
	
	      /**
	       * Up a layer's order in layer manager
	       * @param index
	       */
	
	    }, {
	      key: 'upLayer',
	      value: function upLayer(index) {
	        if (index !== this.layerList.length - 1) {
	          this.moveLayer(index + 1, index);
	        }
	      }
	
	      /**
	       * Move a layer to dest position in layer manager
	       * @param dest
	       * @param src
	       */
	
	    }, {
	      key: 'moveLayer',
	      value: function moveLayer(dest, src) {
	        if (dest === src) {
	          return;
	        }
	        if (dest === this.layerList.length - 1) {
	          this.parentCanvas.wrapperEl.insertBefore(this.layerList[src].canvasEl, this.parentCanvas.upperCanvasEl);
	        } else {
	          this.parentCanvas.wrapperEl.insertBefore(this.layerList[src].canvasEl, this.layerList[dest].canvasEl);
	        }
	        if (dest > src) {
	          this.layerList.splice(dest + 1, 0, this.layerList[src]);
	          this.layerList.splice(src, 1);
	        } else {
	          this.layerList.splice(dest, 0, this.layerList[src]);
	          this.layerList.splice(src + 1, 1);
	        }
	      }
	
	      /**
	       * Down a layer in layer manager
	       * @param index
	       */
	
	    }, {
	      key: 'downLayer',
	      value: function downLayer(index) {
	        if (index !== 0) {
	          this.moveLayer(index - 1, index);
	        }
	      }
	
	      /**
	       * Show a layer
	       * @param index
	       */
	
	    }, {
	      key: 'showLayer',
	      value: function showLayer(index) {
	        if (index < this.layerList.length) {
	          this.layerList[index].canvasEl.style.display = null;
	          for (var i = 0; i < this.layerList[index].objects.length; ++i) {
	            this.layerList[index].objects[i].visible = true;
	          }
	          this.layerList[index].visible = true;
	          this.parentCanvas.renderAll();
	        }
	      }
	
	      /**
	       * Hide a layer
	       * @param index
	       */
	
	    }, {
	      key: 'hideLayer',
	      value: function hideLayer(index) {
	        if (index < this.layerList.length) {
	          this.layerList[index].canvasEl.style.display = 'none';
	          for (var i = 0; i < this.layerList[index].objects.length; ++i) {
	            this.layerList[index].objects[i].visible = false;
	          }
	          this.layerList[index].visible = false;
	          this.parentCanvas.renderAll();
	          //  todo: will cause error in trim-canvas for width is 0
	        }
	      }
	
	      /**
	       * Toggle a layer's visibility
	       * @param index
	       */
	
	    }, {
	      key: 'toggleLayerVisible',
	      value: function toggleLayerVisible(index) {
	        if (this.layerList[index].visible) {
	          this.hideLayer(index);
	        } else {
	          this.showLayer(index);
	        }
	      }
	
	      /**
	       * Select Layer
	       * @param index
	       */
	
	    }, {
	      key: 'selectLayer',
	      value: function selectLayer(index) {
	        if (index < this.layerList.length) {
	          this.parentCanvas.deactivateAllWithDispatch();
	          this.parentCanvas.renderAll();
	          this.currentLayer = this.layerList[index];
	          this.parentCanvas.lowerCanvasEl = this.currentLayer.canvasEl;
	          this.parentCanvas.contextContainer = this.currentLayer.canvasEl.getContext('2d');
	          this.parentCanvas._objects = this.currentLayer.objects;
	          this.setBackgroundColor();
	          this.setBackgroundImageURL();
	        }
	      }
	
	      /**
	       * Get the position of the layer in layer manager
	       * @param layer
	       * @returns {number|Number}
	       */
	
	    }, {
	      key: 'getIndex',
	      value: function getIndex(layer) {
	        return this.layerList.indexOf(layer);
	      }
	
	      /**
	       *  Reset layers
	       */
	
	    }, {
	      key: 'clearLayers',
	      value: function clearLayers() {
	        this.selectLayer(0);
	        this.showLayer(0);
	        while (this.layerList.length > 1) {
	          this.removeLayer(1);
	        }
	      }
	
	      /**
	       * Make everything into one layer and kill others
	       */
	
	    }, {
	      key: 'combineAllLayers',
	      value: function combineAllLayers() {
	        this.selectLayer(0);
	        while (this.layerList.length > 1) {
	          this.currentLayer.objects = this.currentLayer.objects.concat(this.layerList[1].objects);
	          this.parentCanvas._objects = this.currentLayer.objects;
	          this.removeLayer(1);
	        }
	      }
	
	      /**
	       * Combine layers
	       * @param layers:Array<Number> index of layers
	       */
	
	    }, {
	      key: 'combineLayers',
	      value: function combineLayers(layers) {
	        this.selectLayer(layers[0]);
	        while (layers.length > 1) {
	          if (layers[1] < this.layerList.length) {
	            this.currentLayer.objects = this.currentLayer.objects.concat(this.layerList[layers[1]].objects);
	            this.parentCanvas._objects = this.currentLayer.objects;
	            this.removeLayer(layers[1]);
	          }
	        }
	      }
	    }, {
	      key: 'setBackgroundColor',
	      value: function setBackgroundColor(color) {
	        if (color) {
	          this.currentLayer.backgroundColor = color;
	        }
	        this.parentCanvas.setBackgroundColor(this.currentLayer.backgroundColor, this.parentCanvas.renderAll.bind(this.parentCanvas));
	      }
	    }, {
	      key: 'setBackgroundImageURL',
	      value: function setBackgroundImageURL(url) {
	        if (url !== undefined) {
	          this.currentLayer.backgroundImageURL = url;
	        }
	        if (this.currentLayer.backgroundImageURL) {
	          this.parentCanvas.setBackgroundImage(this.currentLayer.backgroundImageURL, this.parentCanvas.renderAll.bind(this.parentCanvas), {
	            left: this.parentCanvas.width / 2,
	            top: this.parentCanvas.height / 2,
	            originX: 'center',
	            originY: 'center',
	            crossOrigin: 'anonymous'
	          });
	        } else {
	          this.parentCanvas.backgroundImage = null;
	          this.parentCanvas.renderAll();
	        }
	      }
	    }]);
	
	    return LayerManager;
	  }();
	
	  Object.assign(fabric, {
	    LayerManager: LayerManager
	  });
	})(fabric);

/***/ },
/* 311 */
/***/ function(module, exports) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	(function () {
	  if (!fabric) {
	    return;
	  }
	
	  var CursorRenderer = function () {
	    function CursorRenderer(canvas, brush, options) {
	      _classCallCheck(this, CursorRenderer);
	
	      this.canvas = canvas;
	      this.brush = brush;
	      this.ctx = canvas.getContext('2d');
	
	      if (options) {
	        this.width = options.width || 1;
	        this.color = options.color || 'black';
	      } else {
	        this.width = 1;
	        this.color = 'black';
	      }
	    }
	
	    _createClass(CursorRenderer, [{
	      key: 'prepareForRender',
	      value: function prepareForRender() {
	        var ctx = this.ctx;
	        ctx.lineWidth = this.width;
	        ctx.strokeStyle = this.color;
	      }
	    }, {
	      key: 'renderCircle',
	      value: function renderCircle(x, y) {
	        var ctx = this.ctx;
	        var width = this.brush.width;
	        ctx.fillStyle = 'rgba(255,255,255,0.5)';
	        ctx.lineWidth = 1;
	        ctx.strokeStyle = 'black';
	        ctx.beginPath();
	        ctx.arc(x, y, width / 2, 0, Math.PI * 2, true);
	        ctx.stroke();
	        ctx.fill();
	      }
	    }, {
	      key: 'renderPoint',
	      value: function renderPoint(x, y) {
	        var ctx = this.ctx;
	        ctx.fillStyle = 'rgba(255,255,255,0.5)';
	        ctx.lineWidth = 1;
	        ctx.strokeStyle = 'black';
	        for (var i = 0; i < 20; i = i + 2) {
	          ctx.beginPath();
	          ctx.arc(x, y, 20, Math.PI * 2 * i / 20, Math.PI * 2 * (i + 1) / 20, false);
	          ctx.stroke();
	        }
	        ctx.beginPath();
	        ctx.arc(x, y, 20, 0, Math.PI * 2, true);
	        ctx.fill();
	
	        ctx.beginPath();
	        ctx.moveTo(x, y - 1);
	        ctx.lineTo(x, y + 1);
	        ctx.stroke();
	        ctx.moveTo(x - 1, y);
	        ctx.lineTo(x + 1, y);
	        ctx.stroke();
	      }
	    }]);
	
	    return CursorRenderer;
	  }();
	
	  Object.assign(fabric, {
	    CursorRenderer: CursorRenderer
	  });
	})();

/***/ },
/* 312 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(313);
	
	(function () {
	  /**
	   * EraserBrush class
	   * @class fabric.EraserBrush
	   * @extends fabric.BaseBrush
	   */
	  fabric.EraserBrush = fabric.util.createClass(fabric.BaseBrush, /** @lends fabric.PencilBrush.prototype */{
	
	    /**
	     * Constructor
	     * @param {fabric.Canvas} canvas
	     * @param options
	     * @return {fabric.PencilBrush} Instance of a pencil brush
	     */
	    initialize: function initialize(canvas, options) {
	      this.canvas = canvas;
	      this.backupCanvasEl = this.canvas._createCanvasElement();
	      this.backupContext = this.backupCanvasEl.getContext('2d');
	      this.canvas._copyCanvasStyle(this.canvas.upperCanvasEl, this.backupCanvasEl);
	      this.canvas._applyCanvasStyle(this.backupCanvasEl);
	      this.backupContext.imageSmoothingEnabled = false;
	      this.canvas.freeDrawingCursor = 'none';
	      this._points = [];
	      this.strokeStyle = 'rgb(255,255,255)';
	      this.width = 10;
	      //  init options
	
	      //  Dynamic events
	      //  this.onMouseOut = this.onMouseOut.bind(this);
	      //  this.events = {
	      //    mouseout: this.canvas._onMouseOut
	      //  };
	
	      for (var prop in options) {
	        if (options.hasOwnProperty(prop)) {
	          this[prop] = options[prop];
	        }
	      }
	
	      this.cursorRenderer = new fabric.CursorRenderer(this.canvas.cursorCanvasEl, this);
	    },
	
	    /**
	     * Inovoked on mouse down
	     * @param {Object} pointer
	     */
	    onMouseDown: function onMouseDown(pointer) {
	      this._prepareForDrawing(pointer);
	      // capture coordinates immediately
	      // this allows to draw dots (when movement never occurs)
	      this._captureDrawingPath(pointer);
	      this._render();
	    },
	
	    /**
	     * Inovoked on mouse move
	     * @param {Object} pointer
	     */
	    onMouseMove: function onMouseMove(pointer) {
	      this._captureDrawingPath(pointer);
	      // redraw curve
	      // clear top canvas
	      this.canvas.clearContext(this.canvas.contextTop);
	      this._render();
	    },
	
	    /**
	     * Invoked on mouse up
	     */
	    onMouseUp: function onMouseUp() {
	      this._finalizeAndAddPath();
	    },
	
	    onMouseOut: function onMouseOut(options) {
	      this.canvas.clearContext(this.canvas.contextCursor);
	    },
	
	    /**
	     * @private
	     * @param {Object} pointer Actual mouse position related to the canvas.
	     */
	    _prepareForDrawing: function _prepareForDrawing(pointer) {
	
	      var p = new fabric.Point(pointer.x, pointer.y);
	
	      this._reset();
	      this._addPoint(p);
	
	      this.canvas.clearContext(this.backupCanvasEl.getContext('2d'));
	      this.backupContext.drawImage(this.canvas.lowerCanvasEl, 0, 0, this.backupCanvasEl.width, this.backupCanvasEl.height);
	      this.canvas.clearContext(this.canvas.contextContainer);
	      this.canvas.contextTop.moveTo(p.x, p.y);
	
	      this.cursorRenderer.prepareForRender();
	    },
	
	    /**
	     * @private
	     * @param {fabric.Point} point Point to be added to points array
	     */
	    _addPoint: function _addPoint(point) {
	      this._points.push(point);
	    },
	
	    /**
	     * Clear points array and set contextTop canvas style.
	     * @private
	     */
	    _reset: function _reset() {
	      this._points.length = 0;
	
	      this._setBrushStyles();
	      this._setShadow();
	    },
	
	    _setBrushStyles: function _setBrushStyles() {
	      var ctx = this.canvas.contextTop;
	      ctx.strokeStyle = 'rgba(255,255,255,' + this.opacity + ')';
	      ctx.lineWidth = this.width;
	      ctx.lineCap = this.strokeLineCap;
	      ctx.lineJoin = this.strokeLineJoin;
	      // ctx.globalAlpha = 1;
	      if (this.strokeDashArray && fabric.StaticCanvas.supports("setLineDash")) {
	        ctx.setLineDash(this.strokeDashArray);
	      }
	    },
	
	    /**
	     * @private
	     * @param {Object} pointer Actual mouse position related to the canvas.
	     */
	    _captureDrawingPath: function _captureDrawingPath(pointer) {
	      var pointerPoint = new fabric.Point(pointer.x, pointer.y);
	      this._addPoint(pointerPoint);
	    },
	
	    /**
	     * Draw a smooth path on the topCanvas using quadraticCurveTo
	     * @private
	     */
	    _render: function _render() {
	      var ctx = this.canvas.contextTop,
	          v = this.canvas.viewportTransform,
	          p1 = this._points[0],
	          p2 = this._points[1];
	
	      ctx.save();
	      ctx.drawImage(this.backupCanvasEl, 0, 0);
	      ctx.globalCompositeOperation = 'destination-out';
	      ctx.transform(v[0], v[1], v[2], v[3], v[4], v[5]);
	      ctx.beginPath();
	
	      //if we only have 2 points in the path and they are the same
	      //it means that the user only clicked the canvas without moving the mouse
	      //then we should be drawing a dot. A path isn't drawn between two identical dots
	      //that's why we set them apart a bit
	      if (this._points.length === 2 && p1.x === p2.x && p1.y === p2.y) {
	        p1.x -= 0.5;
	        p2.x += 0.5;
	      }
	      ctx.moveTo(p1.x, p1.y);
	
	      for (var i = 1, len = this._points.length; i < len; i++) {
	        // we pick the point between pi + 1 & pi + 2 as the
	        // end point and p1 as our control point.
	        var midPoint = p1.midPointFrom(p2);
	        ctx.quadraticCurveTo(p1.x, p1.y, midPoint.x, midPoint.y);
	
	        p1 = this._points[i];
	        p2 = this._points[i + 1];
	      }
	      // Draw last line as a straight line while
	      // we wait for the next point to be able to calculate
	      // the bezier control point
	      ctx.lineTo(p1.x, p1.y);
	      ctx.stroke();
	      ctx.restore();
	    },
	
	    /**
	     * Converts points to SVG path
	     * @param {Array} points Array of points
	     * @param {Number} minX
	     * @param {Number} minY
	     * @return {String} SVG path
	     */
	    convertPointsToSVGPath: function convertPointsToSVGPath(points) {
	      var path = [],
	          p1 = new fabric.Point(points[0].x, points[0].y),
	          p2 = new fabric.Point(points[1].x, points[1].y);
	
	      path.push('M ', points[0].x, ' ', points[0].y, ' ');
	      for (var i = 1, len = points.length; i < len; i++) {
	        var midPoint = p1.midPointFrom(p2);
	        // p1 is our bezier control point
	        // midpoint is our endpoint
	        // start point is p(i-1) value.
	        path.push('Q ', p1.x, ' ', p1.y, ' ', midPoint.x, ' ', midPoint.y, ' ');
	        p1 = new fabric.Point(points[i].x, points[i].y);
	        if (i + 1 < points.length) {
	          p2 = new fabric.Point(points[i + 1].x, points[i + 1].y);
	        }
	      }
	      path.push('L ', p1.x, ' ', p1.y, ' ');
	      return path;
	    },
	
	    /**
	     * Creates fabric.Path object to add on canvas
	     * @param {String} pathData Path data
	     * @return {fabric.Path} Path to add on canvas
	     */
	    createPath: function createPath(pathData) {
	      var path = new fabric.Path(pathData, {
	        fill: null,
	        stroke: this.color,
	        strokeWidth: this.width,
	        strokeLineCap: this.strokeLineCap,
	        strokeLineJoin: this.strokeLineJoin,
	        strokeDashArray: this.strokeDashArray,
	        originX: 'center',
	        originY: 'center'
	      });
	
	      if (this.shadow) {
	        this.shadow.affectStroke = true;
	        path.setShadow(this.shadow);
	      }
	
	      return path;
	    },
	
	    /**
	     * On mouseup after drawing the path on contextTop canvas
	     * we use the points captured to create an new fabric path object
	     * and add it to the fabric canvas.
	     */
	    _finalizeAndAddPath: function _finalizeAndAddPath() {
	      var _this = this;
	
	      var ctx = this.canvas.contextTop,
	          data = void 0,
	          trimData = void 0,
	          layerObject = void 0,
	          myself = this,
	          currentLayer = this.canvas.layerManager.currentLayer;
	      ctx.closePath();
	      trimData = trimCanvasWithPosition(this.canvas.upperCanvasEl);
	      data = trimData.canvas.toDataURL('png');
	
	      fabric.Image.fromURL(data, function (image) {
	        image.set({
	          left: trimData.left,
	          top: trimData.top,
	          angle: 0
	        }).scale(1).setCoords();
	        // this.canvas.setHeight(this.height);
	        // this.canvas.setWidth(this.width);
	        // this.canvas.renderAll();
	        _this.canvas.add(image);
	        myself.canvas.contextTop.imageSmoothingEnabled = false;
	        myself.canvas.clearContext(myself.canvas.contextTop);
	        currentLayer.objects.splice(0, currentLayer.objects.length, image);
	        myself.canvas.renderAll();
	        myself.canvas.contextTop.imageSmoothingEnabled = true;
	      });
	    },
	
	    cursorRender: function cursorRender(pointer) {
	      this.canvas.clearContext(this.canvas.contextCursor);
	      this.cursorRenderer.renderCircle(pointer.x, pointer.y);
	    }
	  });
	})(); /**
	       * Created by GreenDou on 16/4/9.
	       * Eraser Brush
	       */

/***/ },
/* 313 */
/***/ function(module, exports) {

	"use strict";
	
	(function () {
	    window.trim_canvas = function (c) {
	        // open new window with trimmed image:
	        return getCanvas(c).canvas;
	    };
	
	    /**
	     * Trim with Position Info
	     * @param c Canvas Context
	     * @param {{x:number,y:number}} rc Rotation Center
	     * @returns {{canvas: *, left: null, top: null, rc: *}}
	     */
	    window.trimCanvasWithPosition = function (c, rc) {
	        "use strict";
	
	        var result = getCanvas(c, rc);
	        if (rc) {
	            rc.x = rc.x - result.bound.left;
	            rc.y = rc.y - result.bound.top;
	        }
	
	        // open new window with trimmed image:
	        return {
	            canvas: result.canvas,
	            left: result.bound.left,
	            top: result.bound.top,
	            rc: rc
	        };
	    };
	
	    function detectBounds(c, rc) {
	        var ctx = c.getContext('2d'),
	            pixels = ctx.getImageData(0, 0, c.width, c.height),
	            l = pixels.data.length,
	            i,
	            bound = {
	            top: null,
	            left: null,
	            right: null,
	            bottom: null
	        },
	            x,
	            y;
	
	        for (i = 0; i < l; i += 4) {
	            if (pixels.data[i + 3] !== 0) {
	                x = i / 4 % c.width;
	                y = ~ ~(i / 4 / c.width);
	
	                if (bound.top === null) {
	                    bound.top = y;
	                }
	
	                if (bound.left === null) {
	                    bound.left = x;
	                } else if (x < bound.left) {
	                    bound.left = x;
	                }
	
	                if (bound.right === null) {
	                    bound.right = x;
	                } else if (bound.right < x) {
	                    bound.right = x;
	                }
	
	                if (bound.bottom === null) {
	                    bound.bottom = y;
	                } else if (bound.bottom < y) {
	                    bound.bottom = y;
	                }
	            }
	        }
	
	        if (rc) {
	            if (bound.top > rc.y) {
	                bound.top = rc.y;
	            }
	            if (bound.bottom < rc.y) {
	                bound.bottom = rc.y;
	            }
	            if (bound.left > rc.x) {
	                bound.left = rc.x;
	            }
	            if (bound.right < rc.x) {
	                bound.right = rc.x;
	            }
	        }
	
	        bound.top = Math.max(bound.top - 10, 0);
	        bound.bottom = Math.min(bound.bottom + 10, c.height);
	        bound.left = Math.max(bound.left - 10, 0);
	        bound.right = Math.min(bound.right + 10, c.width);
	
	        return bound;
	    }
	
	    function getCanvas(c, rc) {
	        "use strict";
	
	        var copy = document.createElement('canvas').getContext('2d');
	        var bound = detectBounds(c, rc);
	        var trimHeight = bound.bottom - bound.top,
	            trimWidth = bound.right - bound.left;
	
	        copy.imageSmoothingEnabled = false;
	        copy.canvas.width = trimWidth;
	        copy.canvas.height = trimHeight;
	        copy.drawImage(c, bound.left, bound.top, trimWidth, trimHeight, 0, 0, trimWidth, trimHeight);
	        return {
	            canvas: copy.canvas,
	            bound: bound
	        };
	    }
	})();

/***/ },
/* 314 */
/***/ function(module, exports) {

	"use strict";
	
	/**
	 * Created by GreenDou on 16/4/12.
	 * Point Brush
	 */
	
	(function () {
	
	    /**
	     * PointBrush class
	     * @class fabric.PointBrush
	     * @extends fabric.BaseBrush
	     */
	    fabric.PointBrush = fabric.util.createClass(fabric.BaseBrush,
	    /** @lends fabric.PointBrush.prototype */
	    {
	
	        /**
	         * Constructor
	         * @param {fabric.Canvas} canvas
	         * @param {function} callback
	         * @param options
	         * @return {fabric.PencilBrush} Instance of a pencil brush
	         */
	        initialize: function initialize(canvas, callback, options) {
	            this.canvas = canvas;
	            this.callback = callback;
	            this.canvas.freeDrawingCursor = 'none';
	            this.width = 1;
	
	            for (var prop in options) {
	                if (options.hasOwnProperty(prop)) {
	                    this[prop] = options[prop];
	                }
	            }
	            this.cursorRenderer = new fabric.CursorRenderer(this.canvas.cursorCanvasEl, this);
	            this.cursorRenderer.width = this.width;
	        },
	
	        /**
	         * Inovoked on mouse down
	         * @param {Object} pointer
	         */
	        onMouseDown: function onMouseDown(pointer) {
	            this._prepareForDrawing(pointer);
	            this.point = pointer;
	            // capture coordinates immediately
	            // this allows to draw dots (when movement never occurs)
	            //this._captureDrawingPath(pointer);
	            this._render(pointer);
	        },
	
	        /**
	         * Inovoked on mouse move
	         * @param {Object} pointer
	         */
	        onMouseMove: function onMouseMove(pointer) {
	            //this._captureDrawingPath(pointer);
	            // redraw curve
	            // clear top canvas
	            this.canvas.clearContext(this.canvas.contextTop);
	            this.point = pointer;
	            this._render(pointer);
	        },
	
	        /**
	         * Invoked on mouse up
	         */
	        onMouseUp: function onMouseUp() {
	            this._finalizeAndCallback();
	        },
	
	        /**
	         * @private
	         * @param {Object} pointer Actual mouse position related to the canvas.
	         */
	        _prepareForDrawing: function _prepareForDrawing(pointer) {
	
	            this._reset();
	            this.canvas.clearContext(this.canvas.contextTop);
	            this.cursorRenderer.prepareForRender();
	        },
	
	        /**
	         * Clear points array and set contextTop canvas style.
	         * @private
	         */
	        _reset: function _reset() {
	            this._setBrushStyles();
	            this._setShadow();
	        },
	
	        _setBrushStyles: function _setBrushStyles() {
	            "use strict";
	
	            var ctx = this.canvas.contextTop;
	            ctx.lineWidth = this.width;
	            ctx.lineCap = this.strokeLineCap;
	            ctx.lineJoin = this.strokeLineJoin;
	            if (this.strokeDashArray && fabric.StaticCanvas.supports("setLineDash")) {
	                ctx.setLineDash(this.strokeDashArray);
	            }
	        },
	
	        /**
	         * Draw a smooth path on the topCanvas using quadraticCurveTo
	         * @private
	         */
	        _render: function _render(pointer) {
	            var ctx = this.canvas.contextTop,
	                v = this.canvas.viewportTransform,
	                x = pointer.x,
	                y = pointer.y;
	            ctx.lineWidth = 1;
	            ctx.save();
	            ctx.transform(v[0], v[1], v[2], v[3], v[4], v[5]);
	            ctx.fillStyle = 'rgba(255,255,255,0.5)';
	            ctx.strokeStyle = 'rgba(0,0,0,0.5)';
	            ctx.beginPath();
	            ctx.arc(x, y, 20, 0, Math.PI * 2);
	            ctx.stroke();
	            ctx.fill();
	            ctx.lineWidth = 1;
	            ctx.moveTo(x, 0);
	            ctx.lineTo(x, this.canvas.height);
	            ctx.stroke();
	            ctx.moveTo(0, y);
	            ctx.lineTo(this.canvas.width, y);
	            ctx.stroke();
	        },
	
	        /**
	         * On mouseup after drawing the path on contextTop canvas
	         * we use the points captured to create an new fabric path object
	         * and add it to the fabric canvas.
	         */
	        _finalizeAndCallback: function _finalizeAndCallback() {
	            "use strict";
	
	            if (this.callback) {
	                this.callback(this.point);
	            }
	        },
	
	        cursorRender: function cursorRender(pointer) {
	            this.canvas.clearContext(this.canvas.contextCursor);
	            this.cursorRenderer.renderPoint(pointer.x, pointer.y);
	            //this.canvas.contextTop.drawImage(this.canvas.cursorCanvasEl,0,0);
	        },
	
	        renderPoint: function renderPoint() {
	            "use strict";
	
	            this._render(this.point);
	        }
	
	    });
	})();

/***/ },
/* 315 */
/***/ function(module, exports) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var LineBrush = function (_fabric$PencilBrush) {
	  _inherits(LineBrush, _fabric$PencilBrush);
	
	  function LineBrush() {
	    _classCallCheck(this, LineBrush);
	
	    return _possibleConstructorReturn(this, Object.getPrototypeOf(LineBrush).apply(this, arguments));
	  }
	
	  _createClass(LineBrush, [{
	    key: 'initialize',
	
	    /**
	     * Constructor
	     * @param {fabric.Canvas} canvas
	     * @param options
	     * @return {fabric.PencilBrush} Instance of a pencil brush
	     */
	    value: function initialize(canvas, options) {
	      this.canvas = canvas;
	      this._points = [];
	
	      //  cursor
	      this.canvas.freeDrawingCursor = 'none';
	      this.cursorRenderer = new fabric.CursorRenderer(this.canvas.cursorCanvasEl, this);
	
	      this.setOptions(options);
	    }
	
	    /**
	     * Inovoked on mouse move
	     * @param {Object} pointer
	     */
	
	  }, {
	    key: 'onMouseMove',
	    value: function onMouseMove(pointer) {
	      this._captureDrawingPath(pointer);
	      // redraw curve
	      // clear top canvas
	      this.canvas.clearContext(this.canvas.contextTop);
	      this._render();
	    }
	  }, {
	    key: '_addPoint',
	    value: function _addPoint(point) {
	      if (this._points.length < 1) {
	        this._points.push(point);
	      } else {
	        this._points[1] = point;
	      }
	    }
	
	    /**
	     * On mouseup after drawing the path on contextTop canvas
	     * we use the points captured to create an new fabric path object
	     * and add it to the fabric canvas.
	     */
	
	  }, {
	    key: '_finalizeAndAddPath',
	    value: function _finalizeAndAddPath() {
	      var ctx = this.canvas.contextTop;
	
	      var pathData = this.convertPointsToSVGPath(this._points).join('');
	      if (pathData === 'M 0 0 Q 0 0 0 0 L 0 0') {
	        // do not create 0 width/height paths, as they are
	        // rendered inconsistently across browsers
	        // Firefox 4, for example, renders a dot,
	        // whereas Chrome 10 renders nothing
	        this.canvas.renderAll();
	        return;
	      }
	
	      var path = this.createPath(pathData);
	
	      this.canvas.add(path);
	      path.setCoords();
	
	      this.canvas.clearContext(this.canvas.contextTop);
	      this._resetShadow();
	      this.canvas.renderAll();
	
	      // fire event 'path' created
	      this.canvas.fire('path:created', { path: path });
	    }
	  }]);
	
	  return LineBrush;
	}(fabric.PencilBrush);
	
	Object.assign(fabric, {
	  LineBrush: LineBrush
	});

/***/ },
/* 316 */
/***/ function(module, exports) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var RectBrush = function (_fabric$LineBrush) {
	  _inherits(RectBrush, _fabric$LineBrush);
	
	  function RectBrush() {
	    _classCallCheck(this, RectBrush);
	
	    return _possibleConstructorReturn(this, Object.getPrototypeOf(RectBrush).apply(this, arguments));
	  }
	
	  _createClass(RectBrush, [{
	    key: 'initialize',
	
	    /**
	     * Constructor
	     * @param {fabric.Canvas} canvas
	     * @param options
	     * @return {fabric.PencilBrush} Instance of a pencil brush
	     */
	    value: function initialize(canvas, options) {
	      this.canvas = canvas;
	      this._points = [];
	
	      //  cursor
	      this.canvas.freeDrawingCursor = 'crosshair';
	
	      this.setOptions(options);
	    }
	
	    /**
	     * Set brush style
	     * @private
	     */
	
	  }, {
	    key: '_setBrushStyles',
	    value: function _setBrushStyles() {
	      var ctx = this.canvas.contextTop;
	      ctx.fillStyle = this.color;
	    }
	  }, {
	    key: '_render',
	    value: function _render() {
	      var ctx = this.canvas.contextTop;
	      var v = this.canvas.viewportTransform;
	      var p1 = this._points[0];
	      var p2 = this._points[1];
	
	      ctx.save();
	      ctx.transform(v[0], v[1], v[2], v[3], v[4], v[5]);
	      ctx.fillRect(p1.x, p1.y, p2.x - p1.x, p2.y - p1.y);
	      ctx.restore();
	    }
	
	    /**
	     * On mouseup after drawing the path on contextTop canvas
	     * we use the points captured to create an new fabric path object
	     * and add it to the fabric canvas.
	     */
	
	  }, {
	    key: '_finalizeAndAddPath',
	    value: function _finalizeAndAddPath() {
	      var point1 = this._points[0];
	      var point2 = this._points[1];
	      var rect = new fabric.Rect({
	        top: Math.min(point1.y, point2.y),
	        left: Math.min(point1.x, point2.x),
	        width: point2.x - point1.x,
	        height: point2.y - point1.y,
	        fill: this.color
	      });
	      this.canvas.add(rect);
	
	      this.canvas.clearContext(this.canvas.contextTop);
	      this.canvas.renderAll();
	
	      // fire event 'path' created
	      this.canvas.fire('rect:created', { rect: rect });
	    }
	  }]);
	
	  return RectBrush;
	}(fabric.LineBrush);
	
	Object.assign(fabric, {
	  RectBrush: RectBrush
	});

/***/ },
/* 317 */
/***/ function(module, exports) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var RoundBrush = function (_fabric$RectBrush) {
	  _inherits(RoundBrush, _fabric$RectBrush);
	
	  function RoundBrush() {
	    _classCallCheck(this, RoundBrush);
	
	    return _possibleConstructorReturn(this, Object.getPrototypeOf(RoundBrush).apply(this, arguments));
	  }
	
	  _createClass(RoundBrush, [{
	    key: '_render',
	    value: function _render() {
	      var ctx = this.canvas.contextTop;
	      var v = this.canvas.viewportTransform;
	      var p1 = this._points[0];
	      var p2 = this._points[1];
	      ctx.save();
	      ctx.transform(v[0], v[1], v[2], v[3], v[4], v[5]);
	      ctx.beginPath();
	      ctx.arc((p2.x + p1.x) / 2, (p2.y + p1.y) / 2, Math.min(Math.max(p2.x - p1.x, p1.x - p2.x), Math.max(p2.y - p1.y, p1.y - p2.y)) / 2, 0, 2 * Math.PI);
	      ctx.fill();
	      ctx.restore();
	    }
	
	    /**
	     * On mouseup after drawing the path on contextTop canvas
	     * we use the points captured to create an new fabric path object
	     * and add it to the fabric canvas.
	     */
	
	  }, {
	    key: '_finalizeAndAddPath',
	    value: function _finalizeAndAddPath() {
	      var p1 = this._points[0];
	      var p2 = this._points[1];
	      var round = new fabric.Circle({
	        top: (p2.y + p1.y) / 2,
	        left: (p2.x + p1.x) / 2,
	        originX: 'center',
	        originY: 'center',
	        fill: this.color,
	        radius: Math.min(Math.max(p1.x - p2.x, p2.x - p1.x), Math.max(p1.y - p2.y, p2.y - p1.y)) / 2
	      });
	      this.canvas.add(round);
	
	      this.canvas.clearContext(this.canvas.contextTop);
	      this.canvas.renderAll();
	
	      // fire event 'path' created
	      this.canvas.fire('circle:created', { round: round });
	    }
	  }]);
	
	  return RoundBrush;
	}(fabric.RectBrush);
	
	Object.assign(fabric, {
	  RoundBrush: RoundBrush
	});

/***/ },
/* 318 */
/***/ function(module, exports) {

	'use strict';
	
	;(function (window, undefined) {
		"use strict";
	
		var _valueRanges = {
			rgb: { r: [0, 255], g: [0, 255], b: [0, 255] },
			hsv: { h: [0, 360], s: [0, 100], v: [0, 100] },
			hsl: { h: [0, 360], s: [0, 100], l: [0, 100] },
			cmy: { c: [0, 100], m: [0, 100], y: [0, 100] },
			cmyk: { c: [0, 100], m: [0, 100], y: [0, 100], k: [0, 100] },
			Lab: { L: [0, 100], a: [-128, 127], b: [-128, 127] },
			XYZ: { X: [0, 100], Y: [0, 100], Z: [0, 100] },
			alpha: { alpha: [0, 1] },
			HEX: { HEX: [0, 16777215] } // maybe we don't need this
		},
		    _instance = {},
		    _colors = {},
	
	
		// http://www.brucelindbloom.com/index.html?Eqn_RGB_XYZ_Matrix.html for more
		XYZMatrix = { // Observer = 2° (CIE 1931), Illuminant = D65
			X: [0.4124564, 0.3575761, 0.1804375],
			Y: [0.2126729, 0.7151522, 0.0721750],
			Z: [0.0193339, 0.1191920, 0.9503041],
			R: [3.2404542, -1.5371385, -0.4985314],
			G: [-0.9692660, 1.8760108, 0.0415560],
			B: [0.0556434, -0.2040259, 1.0572252]
		},
		    grey = { r: 0.298954, g: 0.586434, b: 0.114612 },
		    // CIE-XYZ 1931
		luminance = { r: 0.2126, g: 0.7152, b: 0.0722 },
		    // W3C 2.0
	
		_math = window.Math,
		    _parseint = window.parseInt,
		    Colors = window.Colors = function (options) {
			this.colors = { RND: {} };
			this.options = {
				color: 'rgba(204, 82, 37, 0.8)', // init value(s)...
				XYZMatrix: XYZMatrix,
				// XYZReference: {},
				grey: grey,
				luminance: luminance,
				valueRanges: _valueRanges
				// customBG: '#808080'
				// convertCallback: undefined,
				// allMixDetails: false
			};
			initInstance(this, options || {});
		},
		    initInstance = function initInstance(THIS, options) {
			var matrix,
			    importColor,
			    _options = THIS.options,
			    customBG;
	
			focusInstance(THIS);
			for (var option in options) {
				if (options[option] !== undefined) _options[option] = options[option];
			}
			matrix = _options.XYZMatrix;
			if (!options.XYZReference) _options.XYZReference = {
				X: matrix.X[0] + matrix.X[1] + matrix.X[2],
				Y: matrix.Y[0] + matrix.Y[1] + matrix.Y[2],
				Z: matrix.Z[0] + matrix.Z[1] + matrix.Z[2]
			};
			customBG = _options.customBG;
			_options.customBG = typeof customBG === 'string' ? ColorConverter.txt2color(customBG).rgb : customBG;
			_colors = setColor(THIS.colors, _options.color, undefined, true); // THIS.colors = _colors =
		},
		    focusInstance = function focusInstance(THIS) {
			if (_instance !== THIS) {
				_instance = THIS;
				_colors = THIS.colors;
			}
		};
	
		Colors.prototype.setColor = function (newCol, type, alpha) {
			focusInstance(this);
			if (newCol) {
				return setColor(this.colors, newCol, type, undefined, alpha);
			} else {
				if (alpha !== undefined) {
					this.colors.alpha = limitValue(alpha, 0, 1);
				}
				return convertColors(type);
			}
		};
	
		Colors.prototype.getColor = function (type) {
			var result = this.colors,
			    n = 0;
	
			if (type) {
				type = type.split('.');
				while (result[type[n]]) {
					result = result[type[n++]];
				}
				if (type.length !== n) {
					result = undefined;
				}
			}
			return result;
		};
	
		Colors.prototype.setCustomBackground = function (col) {
			// wild gues,... check again...
			focusInstance(this); // needed???
			this.options.customBG = typeof col === 'string' ? ColorConverter.txt2color(col).rgb : col;
			// return setColor(this.colors, this.options.customBG, 'rgb', true); // !!!!RGB
			return setColor(this.colors, undefined, 'rgb'); // just recalculate existing
		};
	
		Colors.prototype.saveAsBackground = function () {
			// alpha
			focusInstance(this); // needed???
			// return setColor(this.colors, this.colors.RND.rgb, 'rgb', true);
			return setColor(this.colors, undefined, 'rgb', true);
		};
	
		Colors.prototype.convertColor = function (color, type) {
			var convert = ColorConverter,
			    ranges = _valueRanges,
			    types = type.split('2'),
			    fromType = types[0],
			    toType = types[1],
			    test = /(?:RG|HS|CM|LA)/,
			    normalizeFrom = test.test(fromType),
			    normalizeTo = test.test(toType),
			    exceptions = { LAB: 'Lab' },
			    normalize = function normalize(color, type, reverse) {
				var result = {},
				    Lab = type === 'Lab' ? 1 : 0;
	
				for (var n in color) {
					// faster (but bigger) way: if/else outside 2 for loops
					result[n] = reverse ? _math.round(color[n] * (Lab || ranges[type][n][1])) : color[n] / (Lab || ranges[type][n][1]);
				}
	
				return result;
			};
	
			fromType = ranges[fromType] ? fromType : exceptions[fromType] || fromType.toLowerCase();
			toType = ranges[toType] ? toType : exceptions[toType] || toType.toLowerCase();
	
			if (normalizeFrom && type !== 'RGB2HEX') {
				// from ABC to abc
				color = normalize(color, fromType);
			}
			color = fromType === toType ? color : // same type; returns same/normalized version
			convert[fromType + '2' + toType] ? convert[fromType + '2' + toType](color, true) : // existing converter
			toType === 'HEX' ? convert.RGB2HEX(type === 'RGB2HEX' ? color : normalize(fromType === 'rgb' ? color : convert[fromType + '2rgb'](color, true), 'rgb', true)) : convert['rgb2' + toType](convert[fromType + '2rgb'](color, true), true) // not in ColorConverter
			;
			if (normalizeTo) {
				// from abc to ABC
				color = normalize(color, toType, true);
			}
	
			return color;
		};
	
		// ------------------------------------------------------ //
		// ---------- Color calculation related stuff  ---------- //
		// -------------------------------------------------------//
	
		function setColor(colors, color, type, save, alpha) {
			// color only full range
			if (typeof color === 'string') {
				var color = ColorConverter.txt2color(color); // new object
				type = color.type;
				_colors[type] = color[type];
				alpha = alpha !== undefined ? alpha : color.alpha;
			} else if (color) {
				for (var n in color) {
					colors[type][n] = type === 'Lab' ? limitValue(color[n], _valueRanges[type][n][0], _valueRanges[type][n][1]) : limitValue(color[n] / _valueRanges[type][n][1], 0, 1);
				}
			}
			if (alpha !== undefined) {
				colors.alpha = limitValue(+alpha, 0, 1);
			}
			return convertColors(type, save ? colors : undefined);
		}
	
		function saveAsBackground(RGB, rgb, alpha) {
			var grey = _instance.options.grey,
			    color = {};
	
			color.RGB = { r: RGB.r, g: RGB.g, b: RGB.b };
			color.rgb = { r: rgb.r, g: rgb.g, b: rgb.b };
			color.alpha = alpha;
			// color.RGBLuminance = getLuminance(RGB);
			color.equivalentGrey = _math.round(grey.r * RGB.r + grey.g * RGB.g + grey.b * RGB.b);
	
			color.rgbaMixBlack = mixColors(rgb, { r: 0, g: 0, b: 0 }, alpha, 1);
			color.rgbaMixWhite = mixColors(rgb, { r: 1, g: 1, b: 1 }, alpha, 1);
			color.rgbaMixBlack.luminance = getLuminance(color.rgbaMixBlack, true);
			color.rgbaMixWhite.luminance = getLuminance(color.rgbaMixWhite, true);
	
			if (_instance.options.customBG) {
				color.rgbaMixCustom = mixColors(rgb, _instance.options.customBG, alpha, 1);
				color.rgbaMixCustom.luminance = getLuminance(color.rgbaMixCustom, true);
				_instance.options.customBG.luminance = getLuminance(_instance.options.customBG, true);
			}
	
			return color;
		}
	
		function convertColors(type, colorObj) {
			// console.time('convertColors');
			var _Math = _math,
			    colors = colorObj || _colors,
			    convert = ColorConverter,
			    options = _instance.options,
			    ranges = _valueRanges,
			    RND = colors.RND,
	
			// type = colorType, // || _mode.type,
			modes,
			    mode = '',
			    from = '',
			    // value = '',
			exceptions = { hsl: 'hsv', cmyk: 'cmy', rgb: type },
			    RGB = RND.rgb,
			    SAVE,
			    SMART;
	
			if (type !== 'alpha') {
				for (var typ in ranges) {
					if (!ranges[typ][typ]) {
						// no alpha|HEX
						if (type !== typ && typ !== 'XYZ') {
							from = exceptions[typ] || 'rgb';
							colors[typ] = convert[from + '2' + typ](colors[from]);
						}
	
						if (!RND[typ]) RND[typ] = {};
						modes = colors[typ];
						for (mode in modes) {
							RND[typ][mode] = _Math.round(modes[mode] * (typ === 'Lab' ? 1 : ranges[typ][mode][1]));
						}
					}
				}
				if (type !== 'Lab') {
					delete colors._rgb;
				}
	
				RGB = RND.rgb;
				colors.HEX = convert.RGB2HEX(RGB);
				colors.equivalentGrey = options.grey.r * colors.rgb.r + options.grey.g * colors.rgb.g + options.grey.b * colors.rgb.b;
				colors.webSave = SAVE = getClosestWebColor(RGB, 51);
				// colors.webSave.HEX = convert.RGB2HEX(colors.webSave);
				colors.webSmart = SMART = getClosestWebColor(RGB, 17);
				// colors.webSmart.HEX = convert.RGB2HEX(colors.webSmart);
				colors.saveColor = RGB.r === SAVE.r && RGB.g === SAVE.g && RGB.b === SAVE.b ? 'web save' : RGB.r === SMART.r && RGB.g === SMART.g && RGB.b === SMART.b ? 'web smart' : '';
				colors.hueRGB = convert.hue2RGB(colors.hsv.h);
	
				if (colorObj) {
					colors.background = saveAsBackground(RGB, colors.rgb, colors.alpha);
				}
			} // else RGB = RND.rgb;
	
			var rgb = colors.rgb,
			    // for better minification...
			alpha = colors.alpha,
			    luminance = 'luminance',
			    background = colors.background,
			    rgbaMixBlack,
			    rgbaMixWhite,
			    rgbaMixCustom,
			    rgbaMixBG,
			    rgbaMixBGMixBlack,
			    rgbaMixBGMixWhite,
			    rgbaMixBGMixCustom,
			    _mixColors = mixColors,
			    _getLuminance = getLuminance,
			    _getWCAG2Ratio = getWCAG2Ratio,
			    _getHueDelta = getHueDelta;
	
			rgbaMixBlack = _mixColors(rgb, { r: 0, g: 0, b: 0 }, alpha, 1);
			rgbaMixBlack[luminance] = _getLuminance(rgbaMixBlack, true);
			colors.rgbaMixBlack = rgbaMixBlack;
	
			rgbaMixWhite = _mixColors(rgb, { r: 1, g: 1, b: 1 }, alpha, 1);
			rgbaMixWhite[luminance] = _getLuminance(rgbaMixWhite, true);
			colors.rgbaMixWhite = rgbaMixWhite;
	
			if (options.allMixDetails) {
				rgbaMixBlack.WCAG2Ratio = _getWCAG2Ratio(rgbaMixBlack[luminance], 0);
				rgbaMixWhite.WCAG2Ratio = _getWCAG2Ratio(rgbaMixWhite[luminance], 1);
	
				if (options.customBG) {
					rgbaMixCustom = _mixColors(rgb, options.customBG, alpha, 1);
					rgbaMixCustom[luminance] = _getLuminance(rgbaMixCustom, true);
					rgbaMixCustom.WCAG2Ratio = _getWCAG2Ratio(rgbaMixCustom[luminance], options.customBG[luminance]);
					colors.rgbaMixCustom = rgbaMixCustom;
				}
	
				rgbaMixBG = _mixColors(rgb, background.rgb, alpha, background.alpha);
				rgbaMixBG[luminance] = _getLuminance(rgbaMixBG, true); // ?? do we need this?
				colors.rgbaMixBG = rgbaMixBG;
	
				rgbaMixBGMixBlack = _mixColors(rgb, background.rgbaMixBlack, alpha, 1);
				rgbaMixBGMixBlack[luminance] = _getLuminance(rgbaMixBGMixBlack, true);
				rgbaMixBGMixBlack.WCAG2Ratio = _getWCAG2Ratio(rgbaMixBGMixBlack[luminance], background.rgbaMixBlack[luminance]);
				/* ------ */
				rgbaMixBGMixBlack.luminanceDelta = _Math.abs(rgbaMixBGMixBlack[luminance] - background.rgbaMixBlack[luminance]);
				rgbaMixBGMixBlack.hueDelta = _getHueDelta(background.rgbaMixBlack, rgbaMixBGMixBlack, true);
				/* ------ */
				colors.rgbaMixBGMixBlack = rgbaMixBGMixBlack;
	
				rgbaMixBGMixWhite = _mixColors(rgb, background.rgbaMixWhite, alpha, 1);
				rgbaMixBGMixWhite[luminance] = _getLuminance(rgbaMixBGMixWhite, true);
				rgbaMixBGMixWhite.WCAG2Ratio = _getWCAG2Ratio(rgbaMixBGMixWhite[luminance], background.rgbaMixWhite[luminance]);
				/* ------ */
				rgbaMixBGMixWhite.luminanceDelta = _Math.abs(rgbaMixBGMixWhite[luminance] - background.rgbaMixWhite[luminance]);
				rgbaMixBGMixWhite.hueDelta = _getHueDelta(background.rgbaMixWhite, rgbaMixBGMixWhite, true);
				/* ------ */
				colors.rgbaMixBGMixWhite = rgbaMixBGMixWhite;
			}
	
			if (options.customBG) {
				rgbaMixBGMixCustom = _mixColors(rgb, background.rgbaMixCustom, alpha, 1);
				rgbaMixBGMixCustom[luminance] = _getLuminance(rgbaMixBGMixCustom, true);
				rgbaMixBGMixCustom.WCAG2Ratio = _getWCAG2Ratio(rgbaMixBGMixCustom[luminance], background.rgbaMixCustom[luminance]);
				colors.rgbaMixBGMixCustom = rgbaMixBGMixCustom;
				/* ------ */
				rgbaMixBGMixCustom.luminanceDelta = _Math.abs(rgbaMixBGMixCustom[luminance] - background.rgbaMixCustom[luminance]);
				rgbaMixBGMixCustom.hueDelta = _getHueDelta(background.rgbaMixCustom, rgbaMixBGMixCustom, true);
				/* ------ */
			}
	
			colors.RGBLuminance = _getLuminance(RGB);
			colors.HUELuminance = _getLuminance(colors.hueRGB);
	
			// renderVars.readyToRender = true;
			if (options.convertCallback) {
				options.convertCallback(colors, type); //, convert); //, _mode);
			}
	
			// console.timeEnd('convertColors')
			// if (colorObj)
			return colors;
		}
	
		// ------------------------------------------------------ //
		// ------------------ color conversion ------------------ //
		// -------------------------------------------------------//
	
		var ColorConverter = {
			txt2color: function txt2color(txt) {
				var color = {},
				    parts = txt.replace(/(?:#|\)|%)/g, '').split('('),
				    values = (parts[1] || '').split(/,\s*/),
				    type = parts[1] ? parts[0].substr(0, 3) : 'rgb',
				    m = '';
	
				color.type = type;
				color[type] = {};
				if (parts[1]) {
					for (var n = 3; n--;) {
						m = type[n] || type.charAt(n); // IE7
						color[type][m] = +values[n] / _valueRanges[type][m][1];
					}
				} else {
					color.rgb = ColorConverter.HEX2rgb(parts[0]);
				}
				// color.color = color[type];
				color.alpha = values[3] ? +values[3] : 1;
	
				return color;
			},
	
			RGB2HEX: function RGB2HEX(RGB) {
				return ((RGB.r < 16 ? '0' : '') + RGB.r.toString(16) + (RGB.g < 16 ? '0' : '') + RGB.g.toString(16) + (RGB.b < 16 ? '0' : '') + RGB.b.toString(16)).toUpperCase();
			},
	
			HEX2rgb: function HEX2rgb(HEX) {
				var _parseInt = _parseint;
	
				HEX = HEX.split(''); // IE7
				return {
					r: _parseInt(HEX[0] + HEX[HEX[3] ? 1 : 0], 16) / 255,
					g: _parseInt(HEX[HEX[3] ? 2 : 1] + (HEX[3] || HEX[1]), 16) / 255,
					b: _parseInt((HEX[4] || HEX[2]) + (HEX[5] || HEX[2]), 16) / 255
				};
			},
	
			hue2RGB: function hue2RGB(hue) {
				var _Math = _math,
				    h = hue * 6,
				    mod = ~ ~h % 6,
				    // Math.floor(h) -> faster in most browsers
				i = h === 6 ? 0 : h - mod;
	
				return {
					r: _Math.round([1, 1 - i, 0, 0, i, 1][mod] * 255),
					g: _Math.round([i, 1, 1, 1 - i, 0, 0][mod] * 255),
					b: _Math.round([0, 0, i, 1, 1, 1 - i][mod] * 255)
				};
			},
	
			// ------------------------ HSV ------------------------ //
	
			rgb2hsv: function rgb2hsv(rgb) {
				// faster
				var _Math = _math,
				    r = rgb.r,
				    g = rgb.g,
				    b = rgb.b,
				    k = 0,
				    chroma,
				    min,
				    s;
	
				if (g < b) {
					g = b + (b = g, 0);
					k = -1;
				}
				min = b;
				if (r < g) {
					r = g + (g = r, 0);
					k = -2 / 6 - k;
					min = _Math.min(g, b); // g < b ? g : b; ???
				}
				chroma = r - min;
				s = r ? chroma / r : 0;
				return {
					h: s < 1e-15 ? _colors && _colors.hsl && _colors.hsl.h || 0 : chroma ? _Math.abs(k + (g - b) / (6 * chroma)) : 0,
					s: r ? chroma / r : _colors && _colors.hsv && _colors.hsv.s || 0, // ??_colors.hsv.s || 0
					v: r
				};
			},
	
			hsv2rgb: function hsv2rgb(hsv) {
				var h = hsv.h * 6,
				    s = hsv.s,
				    v = hsv.v,
				    i = ~ ~h,
				    // Math.floor(h) -> faster in most browsers
				f = h - i,
				    p = v * (1 - s),
				    q = v * (1 - f * s),
				    t = v * (1 - (1 - f) * s),
				    mod = i % 6;
	
				return {
					r: [v, q, p, p, t, v][mod],
					g: [t, v, v, q, p, p][mod],
					b: [p, p, t, v, v, q][mod]
				};
			},
	
			// ------------------------ HSL ------------------------ //
	
			hsv2hsl: function hsv2hsl(hsv) {
				var l = (2 - hsv.s) * hsv.v,
				    s = hsv.s * hsv.v;
	
				s = !hsv.s ? 0 : l < 1 ? l ? s / l : 0 : s / (2 - l);
	
				return {
					h: hsv.h,
					s: !hsv.v && !s ? _colors && _colors.hsl && _colors.hsl.s || 0 : s, // ???
					l: l / 2
				};
			},
	
			rgb2hsl: function rgb2hsl(rgb, dependent) {
				// not used in Color
				var hsv = ColorConverter.rgb2hsv(rgb);
	
				return ColorConverter.hsv2hsl(dependent ? hsv : _colors.hsv = hsv);
			},
	
			hsl2rgb: function hsl2rgb(hsl) {
				var h = hsl.h * 6,
				    s = hsl.s,
				    l = hsl.l,
				    v = l < 0.5 ? l * (1 + s) : l + s - s * l,
				    m = l + l - v,
				    sv = v ? (v - m) / v : 0,
				    sextant = ~ ~h,
				    // Math.floor(h) -> faster in most browsers
				fract = h - sextant,
				    vsf = v * sv * fract,
				    t = m + vsf,
				    q = v - vsf,
				    mod = sextant % 6;
	
				return {
					r: [v, q, m, m, t, v][mod],
					g: [t, v, v, q, m, m][mod],
					b: [m, m, t, v, v, q][mod]
				};
			},
	
			// ------------------------ CMYK ------------------------ //
			// Quote from Wikipedia:
			// "Since RGB and CMYK spaces are both device-dependent spaces, there is no
			// simple or general conversion formula that converts between them.
			// Conversions are generally done through color management systems, using
			// color profiles that describe the spaces being converted. Nevertheless, the
			// conversions cannot be exact, since these spaces have very different gamuts."
			// Translation: the following are just simple RGB to CMY(K) and visa versa conversion functions.
	
			rgb2cmy: function rgb2cmy(rgb) {
				return {
					c: 1 - rgb.r,
					m: 1 - rgb.g,
					y: 1 - rgb.b
				};
			},
	
			cmy2cmyk: function cmy2cmyk(cmy) {
				var _Math = _math,
				    k = _Math.min(_Math.min(cmy.c, cmy.m), cmy.y),
				    t = 1 - k || 1e-20;
	
				return { // regular
					c: (cmy.c - k) / t,
					m: (cmy.m - k) / t,
					y: (cmy.y - k) / t,
					k: k
				};
			},
	
			cmyk2cmy: function cmyk2cmy(cmyk) {
				var k = cmyk.k;
	
				return { // regular
					c: cmyk.c * (1 - k) + k,
					m: cmyk.m * (1 - k) + k,
					y: cmyk.y * (1 - k) + k
				};
			},
	
			cmy2rgb: function cmy2rgb(cmy) {
				return {
					r: 1 - cmy.c,
					g: 1 - cmy.m,
					b: 1 - cmy.y
				};
			},
	
			rgb2cmyk: function rgb2cmyk(rgb, dependent) {
				var cmy = ColorConverter.rgb2cmy(rgb); // doppelt??
	
				return ColorConverter.cmy2cmyk(dependent ? cmy : _colors.cmy = cmy);
			},
	
			cmyk2rgb: function cmyk2rgb(cmyk, dependent) {
				var cmy = ColorConverter.cmyk2cmy(cmyk); // doppelt??
	
				return ColorConverter.cmy2rgb(dependent ? cmy : _colors.cmy = cmy);
			},
	
			// ------------------------ LAB ------------------------ //
	
			XYZ2rgb: function XYZ2rgb(XYZ, skip) {
				var _Math = _math,
				    M = _instance.options.XYZMatrix,
				    X = XYZ.X,
				    Y = XYZ.Y,
				    Z = XYZ.Z,
				    r = X * M.R[0] + Y * M.R[1] + Z * M.R[2],
				    g = X * M.G[0] + Y * M.G[1] + Z * M.G[2],
				    b = X * M.B[0] + Y * M.B[1] + Z * M.B[2],
				    N = 1 / 2.4;
	
				M = 0.0031308;
	
				r = r > M ? 1.055 * _Math.pow(r, N) - 0.055 : 12.92 * r;
				g = g > M ? 1.055 * _Math.pow(g, N) - 0.055 : 12.92 * g;
				b = b > M ? 1.055 * _Math.pow(b, N) - 0.055 : 12.92 * b;
	
				if (!skip) {
					// out of gammut
					_colors._rgb = { r: r, g: g, b: b };
				}
	
				return {
					r: limitValue(r, 0, 1),
					g: limitValue(g, 0, 1),
					b: limitValue(b, 0, 1)
				};
			},
	
			rgb2XYZ: function rgb2XYZ(rgb) {
				var _Math = _math,
				    M = _instance.options.XYZMatrix,
				    r = rgb.r,
				    g = rgb.g,
				    b = rgb.b,
				    N = 0.04045;
	
				r = r > N ? _Math.pow((r + 0.055) / 1.055, 2.4) : r / 12.92;
				g = g > N ? _Math.pow((g + 0.055) / 1.055, 2.4) : g / 12.92;
				b = b > N ? _Math.pow((b + 0.055) / 1.055, 2.4) : b / 12.92;
	
				return {
					X: r * M.X[0] + g * M.X[1] + b * M.X[2],
					Y: r * M.Y[0] + g * M.Y[1] + b * M.Y[2],
					Z: r * M.Z[0] + g * M.Z[1] + b * M.Z[2]
				};
			},
	
			XYZ2Lab: function XYZ2Lab(XYZ) {
				var _Math = _math,
				    R = _instance.options.XYZReference,
				    X = XYZ.X / R.X,
				    Y = XYZ.Y / R.Y,
				    Z = XYZ.Z / R.Z,
				    N = 16 / 116,
				    M = 1 / 3,
				    K = 0.008856,
				    L = 7.787037;
	
				X = X > K ? _Math.pow(X, M) : L * X + N;
				Y = Y > K ? _Math.pow(Y, M) : L * Y + N;
				Z = Z > K ? _Math.pow(Z, M) : L * Z + N;
	
				return {
					L: 116 * Y - 16,
					a: 500 * (X - Y),
					b: 200 * (Y - Z)
				};
			},
	
			Lab2XYZ: function Lab2XYZ(Lab) {
				var _Math = _math,
				    R = _instance.options.XYZReference,
				    Y = (Lab.L + 16) / 116,
				    X = Lab.a / 500 + Y,
				    Z = Y - Lab.b / 200,
				    X3 = _Math.pow(X, 3),
				    Y3 = _Math.pow(Y, 3),
				    Z3 = _Math.pow(Z, 3),
				    N = 16 / 116,
				    K = 0.008856,
				    L = 7.787037;
	
				return {
					X: (X3 > K ? X3 : (X - N) / L) * R.X,
					Y: (Y3 > K ? Y3 : (Y - N) / L) * R.Y,
					Z: (Z3 > K ? Z3 : (Z - N) / L) * R.Z
				};
			},
	
			rgb2Lab: function rgb2Lab(rgb, dependent) {
				var XYZ = ColorConverter.rgb2XYZ(rgb);
	
				return ColorConverter.XYZ2Lab(dependent ? XYZ : _colors.XYZ = XYZ);
			},
	
			Lab2rgb: function Lab2rgb(Lab, dependent) {
				var XYZ = ColorConverter.Lab2XYZ(Lab);
	
				return ColorConverter.XYZ2rgb(dependent ? XYZ : _colors.XYZ = XYZ, dependent);
			}
		};
	
		// ------------------------------------------------------ //
		// ------------------ helper functions ------------------ //
		// -------------------------------------------------------//
	
		function getClosestWebColor(RGB, val) {
			var out = {},
			    tmp = 0,
			    half = val / 2;
	
			for (var n in RGB) {
				tmp = RGB[n] % val; // 51 = 'web save', 17 = 'web smart'
				out[n] = RGB[n] + (tmp > half ? val - tmp : -tmp);
			}
			return out;
		}
	
		function getHueDelta(rgb1, rgb2, nominal) {
			var _Math = _math;
	
			return (_Math.max(rgb1.r - rgb2.r, rgb2.r - rgb1.r) + _Math.max(rgb1.g - rgb2.g, rgb2.g - rgb1.g) + _Math.max(rgb1.b - rgb2.b, rgb2.b - rgb1.b)) * (nominal ? 255 : 1) / 765;
		}
	
		function getLuminance(rgb, normalized) {
			var div = normalized ? 1 : 255,
			    RGB = [rgb.r / div, rgb.g / div, rgb.b / div],
			    luminance = _instance.options.luminance;
	
			for (var i = RGB.length; i--;) {
				RGB[i] = RGB[i] <= 0.03928 ? RGB[i] / 12.92 : _math.pow((RGB[i] + 0.055) / 1.055, 2.4);
			}
			return luminance.r * RGB[0] + luminance.g * RGB[1] + luminance.b * RGB[2];
		}
	
		function mixColors(topColor, bottomColor, topAlpha, bottomAlpha) {
			var newColor = {},
			    alphaTop = topAlpha !== undefined ? topAlpha : 1,
			    alphaBottom = bottomAlpha !== undefined ? bottomAlpha : 1,
			    alpha = alphaTop + alphaBottom * (1 - alphaTop); // 1 - (1 - alphaTop) * (1 - alphaBottom);
	
			for (var n in topColor) {
				newColor[n] = (topColor[n] * alphaTop + bottomColor[n] * alphaBottom * (1 - alphaTop)) / alpha;
			}
			newColor.a = alpha;
			return newColor;
		}
	
		function getWCAG2Ratio(lum1, lum2) {
			var ratio = 1;
	
			if (lum1 >= lum2) {
				ratio = (lum1 + 0.05) / (lum2 + 0.05);
			} else {
				ratio = (lum2 + 0.05) / (lum1 + 0.05);
			}
			return _math.round(ratio * 100) / 100;
		}
	
		function limitValue(value, min, max) {
			// return Math.max(min, Math.min(max, value)); // faster??
			return value > max ? max : value < min ? min : value;
		}
	})(window);

/***/ },
/* 319 */
/***/ function(module, exports) {

	'use strict';
	
	;(function (window, undefined) {
		"use strict";
	
		// see colorPicker.html for the following encrypted variables... will only be used in buildView()
	
		var _html = '^§app alpha-bg-w">^§slds">^§sldl-1">$^§sldl-2">$^§sldl-3">$^§curm">$^§sldr-1">$^§sldr-2">$^§sldr-4">$^§curl">$^§curr">$$^§opacity">|^§opacity-slider">$$$^§memo">^§raster">$^§raster-bg">$|$|$|$|$|$|$|$|$^§memo-store">$^§memo-cursor">$$^§panel">^§hsv">^hsl-mode §ß">$^hsv-h-ß §ß">H$^hsv-h-~ §~">-^§nsarrow">$$^hsl-h-@ §@">H$^hsv-s-ß §ß">S$^hsv-s-~ §~">-$^hsl-s-@ §@">S$^hsv-v-ß §ß">B$^hsv-v-~ §~">-$^hsl-l-@ §@">L$$^§hsl §hide">^hsv-mode §ß">$^hsl-h-ß §ß">H$^hsl-h-~ §~">-$^hsv-h-@ §@">H$^hsl-s-ß §ß">S$^hsl-s-~ §~">-$^hsv-s-@ §@">S$^hsl-l-ß §ß">L$^hsl-l-~ §~">-$^hsv-v-@ §@">B$$^§rgb">^rgb-r-ß §ß">R$^rgb-r-~ §~">-$^rgb-r-@ §ß">&nbsp;$^rgb-g-ß §ß">G$^rgb-g-~ §~">-$^rgb-g-@ §ß">&nbsp;$^rgb-b-ß §ß">B$^rgb-b-~ §~">-$^rgb-b-@ §ß">&nbsp;$$^§cmyk">^Lab-mode §ß">$^cmyk-c-ß §@">C$^cmyk-c-~ §~">-$^Lab-L-@ §@">L$^cmyk-m-ß §@">M$^cmyk-m-~ §~">-$^Lab-a-@ §@">a$^cmyk-y-ß §@">Y$^cmyk-y-~ §~">-$^Lab-b-@ §@">b$^cmyk-k-ß §@">K$^cmyk-k-~ §~">-$^Lab-x-@ §ß">&nbsp;$$^§Lab §hide">^cmyk-mode §ß">$^Lab-L-ß §@">L$^Lab-L-~ §~">-$^cmyk-c-@ §@">C$^Lab-a-ß §@">a$^Lab-a-~ §~">-$^cmyk-m-@ §@">M$^Lab-b-ß §@">b$^Lab-b-~ §~">-$^cmyk-y-@ §@">Y$^Lab-x-ß §@">&nbsp;$^Lab-x-~ §~">-$^cmyk-k-@ §@">K$$^§alpha">^alpha-ß §ß">A$^alpha-~ §~">-$^alpha-@ §ß">W$$^§HEX">^HEX-ß §ß">#$^HEX-~ §~">-$^HEX-@ §ß">M$$^§ctrl">^§raster">$^§cont">$^§cold">$^§col1">|&nbsp;$$^§col2">|&nbsp;$$^§bres">RESET$^§bsav">SAVE$$$^§exit">$^§resize">$^§resizer">|$$$'.replace(/\^/g, '<div class="').replace(/\$/g, '</div>').replace(/~/g, 'disp').replace(/ß/g, 'butt').replace(/@/g, 'labl').replace(/\|/g, '<div>'),
		    _cssFunc = 'är^1,äg^1,äb^1,öh^1,öh?1,öh?2,ös?1,öv?1,üh^1,üh?1,üh?2,üs?1,ül?1,.no-rgb-r är?2,.no-rgb-r är?3,.no-rgb-r är?4,.no-rgb-g äg?2,.no-rgb-g äg?3,.no-rgb-g äg?4,.no-rgb-b äb?2,.no-rgb-b äb?3,.no-rgb-b äb?4{visibility:hidden}är^2,är^3,äg^2,äg^3,äb^2,äb^3{@-image:url(_patches.png)}.§slds div{@-image:url(_vertical.png)}öh^2,ös^1,öv^1,üh^2,üs^1,ül^1{@-image:url(_horizontal.png)}ös?4,öv^3,üs?4,ül^3{@:#000}üs?3,ül^4{@:#fff}är?1{@-color:#f00}äg?1{@-color:#0f0}äb?1{@-color:#00f}är^2{@|-1664px 0}är^3{@|-896px 0}är?1,äg?1,äb?1,öh^3,ös^2,öv?2Ü-2432Öär?2Ü-2944Öär?3Ü-4480Öär?4Ü-3202Öäg^2Äöh^2{@|-640px 0}äg^3{@|-384px 0}äg?2Ü-4736Öäg?3Ü-3968Öäg?4Ü-3712Öäb^2{@|-1152px 0}äb^3{@|-1408px 0}äb?2Ü-3456Öäb?3Ü-4224Öäb?4Ü-2688Ööh^2Äär^3Ääb?4Ü0}öh?4,üh?4Ü-1664Öös^1,öv^1,üs^1,ül^1Ääg^3{@|-256px 0}ös^3,öv?4,üs^3,ül?4Ü-2176Öös?2,öv^2Ü-1920Öüh^2{@|-768px 0}üh^3,üs^2,ül?2Ü-5184Öüs?2,ül^2Ü-5824Ö.S är^2{@|-128px -128Ö.S är?1Ääg?1Ääb?1Äöh^3Äös^2Äöv?2Ü-1408Ö.S är?2Ääb^3Ü-128Ö.S är?3Ü-896Ö.S är?4Ü-256Ö.S äg^2{@|-256px -128Ö.S äg?2Ü-1024Ö.S äg?3Ü-640Ö.S äg?4Ü-512Ö.S äb^2{@|-128px 0}.S äb?2Ü-384Ö.S äb?3Ü-768Ö.S öh?4Äüh?4Ü-1536Ö.S ös^1Äöv^1Äüs^1Äül^1{@|-512px 0}.S ös^3Äöv?4Äüs^3Äül?4Ü-1280Ö.S ös?2Äöv^2Ü-1152Ö.S üh^2{@|-1024px 0}.S üh^3Äüs^2Äül?2Ü-5440Ö.S üs?2Äül^2Ü-5696Ö.XXS ös^2,.XXS öv?2Ü-5120Ö.XXS ös^3,.XXS öv?4,.XXS üs^3,.XXS ül^3,.XXS ül?4Ü-5056Ö.XXS ös?2,.XXS öv^2Ü-4992Ö.XXS üs^2,.XXS ül?2Ü-5568Ö.XXS üs?2,.XXS ül^2Ü-5632Ö'.replace(/Ü/g, '{@|0 ').replace(/Ö/g, 'px}').replace(/Ä/g, ',.S ').replace(/\|/g, '-position:').replace(/@/g, 'background').replace(/ü/g, '.hsl-').replace(/ö/g, '.hsv-').replace(/ä/g, '.rgb-').replace(/~/g, ' .no-rgb-}').replace(/\?/g, ' .§sldr-').replace(/\^/g, ' .§sldl-'),
		    _cssMain = '∑{@#bbb;font-family:monospace, "Courier New", Courier, mono;font-size:12¥line-ä15¥font-weight:bold;cursor:default;~412¥ä323¥?top-left-radius:7¥?top-Ü-radius:7¥?bottom-Ü-radius:7¥?bottom-left-radius:7¥ö@#444}.S{~266¥ä177px}.XS{~158¥ä173px}.XXS{ä105¥~154px}.no-alpha{ä308px}.no-alpha .§opacity,.no-alpha .§alpha{display:none}.S.no-alpha{ä162px}.XS.no-alpha{ä158px}.XXS.no-alpha{ä90px}∑,∑ div{border:none;padding:0¥float:none;margin:0¥outline:none;box-sizing:content-box}∑ div{|absolute}^s .§curm,«§disp,«§nsarrow,∑ .§exit,∑ ø-cursor,∑ .§resize{öimage:url(_icons.png)}∑ .do-drag div{cursor:none}∑ .§opacity,ø .§raster-bg,∑ .§raster{öimage:url(_bgs.png)}∑ ^s{~287¥ä256¥top:10¥left:10¥overflow:hidden;cursor:crosshair}.S ^s{~143¥ä128¥left:9¥top:9px}.XS ^s{left:7¥top:7px}.XXS ^s{left:5¥top:5px}^s div{~256¥ä256¥left:0px}.S ^l-1,.S ^l-2,.S ^l-3,.S ^l-4{~128¥ä128px}.XXS ^s,.XXS ^s ^l-1,.XXS ^s ^l-2,.XXS ^s ^l-3,.XXS ^s ^l-4{ä64px}^s ^r-1,^s ^r-2,^s ^r-3,^s ^r-4{~31¥left:256¥cursor:default}.S ^r-1,.S ^r-2,.S ^r-3,.S ^r-4{~15¥ä128¥left:128px}^s .§curm{margin:-5¥~11¥ä11¥ö|-36px -30px}.light .§curm{ö|-7px -30px}^s .§curl,^s .§curr{~0¥ä0¥margin:-3px -4¥border:4px solid;cursor:default;left:auto;öimage:none}^s .§curl,∑ ^s .§curl-dark,.hue-dark div.§curl{Ü:27¥?@† † † #fff}.light .§curl,∑ ^s .§curl-light,.hue-light .§curl{?@† † † #000}.S ^s .§curl,.S ^s .§curr{?~3px}.S ^s .§curl-light,.S ^s .§curl{Ü:13px}^s .§curr,∑ ^s .§curr-dark{Ü:4¥?@† #fff † †}.light .§curr,∑ ^s .§curr-light{?@† #000 † †}∑ .§opacity{bottom:44¥left:10¥ä10¥~287¥ö|0 -87px}.S .§opacity{bottom:27¥left:9¥~143¥ö|0 -100px}.XS .§opacity{left:7¥bottom:25px}.XXS .§opacity{left:5¥bottom:23px}.§opacity div{~100%;ä16¥margin-top:-3¥overflow:hidden}.§opacity .§opacity-slider{margin:0 -4¥~0¥ä8¥?~4¥?style:solid;?@#eee †}∑ ø{bottom:10¥left:10¥~288¥ä31¥ö@#fff}.S ø{ä15¥~144¥left:9¥bottom:9px}.XS ø{left:7¥bottom:7px}.XXS ø{left:5¥bottom:5px}ø div{|relative;float:left;~31¥ä31¥margin-Ü:1px}.S ø div{~15¥ä15px}∑ .§raster,ø .§raster-bg,.S ø .§raster,.S ø .§raster-bg{|absolute;top:0¥Ü:0¥bottom:0¥left:0¥~100%}.S ø .§raster-bg{ö|0 -31px}∑ .§raster{opacity:0.2;ö|0 -49px}.alpha-bg-b ø{ö@#333}.alpha-bg-b .§raster{opacity:1}ø ø-cursor{|absolute;Ü:0¥ö|-26px -87px}∑ .light ø-cursor{ö|3px -87px}.S ø-cursor{ö|-34px -95px}.S .light ø-cursor{ö|-5px -95px}∑ .§panel{|absolute;top:10¥Ü:10¥bottom:10¥~94¥?~1¥?style:solid;?@#222 #555 #555 #222;overflow:hidden;ö@#333}.S .§panel{top:9¥Ü:9¥bottom:9px}.XS .§panel{display:none}.§panel div{|relative}«§hsv,«§hsl,«§rgb,«§cmyk,«§Lab,«§alpha,.no-alpha «§HEX,«§HEX{~86¥margin:-1px 0px 1px 4¥padding:1px 0px 3¥?top-~1¥?top-style:solid;?top-@#444;?bottom-~1¥?bottom-style:solid;?bottom-@#222;float:Ö«§hsv,«§hsl{padding-top:2px}.S .§hsv,.S .§hsl{padding-top:1px}«§HEX{?bottom-style:none;?top-~0¥margin-top:-4¥padding-top:0px}.no-alpha «§HEX{?bottom-style:none}«§alpha{?bottom-style:none}.S .rgb-r .§hsv,.S .rgb-g .§hsv,.S .rgb-b .§hsv,.S .rgb-r .§hsl,.S .rgb-g .§hsl,.S .rgb-b .§hsl,.S .hsv-h .§rgb,.S .hsv-s .§rgb,.S .hsv-v .§rgb,.S .hsl-h .§rgb,.S .hsl-s .§rgb,.S .hsl-l .§rgb,.S .§cmyk,.S .§Lab{display:none}«§butt,«§labl{float:left;~14¥ä14¥margin-top:2¥text-align:center;border:1px solid}«§butt{?@#555 #222 #222 #555}«§butt:active{ö@#444}«§labl{?@†}«Lab-mode,«cmyk-mode,«hsv-mode,«hsl-mode{|absolute;Ü:0¥top:1¥ä50px}«hsv-mode,«hsl-mode{top:2px}«cmyk-mode{ä68px}.hsl-h .hsl-h-labl,.hsl-s .hsl-s-labl,.hsl-l .hsl-l-labl,.hsv-h .hsv-h-labl,.hsv-s .hsv-s-labl,.hsv-v .hsv-v-labl{@#f90}«cmyk-mode,«hsv-mode,.rgb-r .rgb-r-butt,.rgb-g .rgb-g-butt,.rgb-b .rgb-b-butt,.hsv-h .hsv-h-butt,.hsv-s .hsv-s-butt,.hsv-v .hsv-v-butt,.hsl-h .hsl-h-butt,.hsl-s .hsl-s-butt,.hsl-l .hsl-l-butt,«rgb-r-labl,«rgb-g-labl,«rgb-b-labl,«alpha-butt,«HEX-butt,«Lab-x-labl{?@#222 #555 #555 #222;ö@#444}.no-rgb-r .rgb-r-labl,.no-rgb-g .rgb-g-labl,.no-rgb-b .rgb-b-labl,.mute-alpha .alpha-butt,.no-HEX .HEX-butt,.cmy-only .Lab-x-labl{?@#555 #222 #222 #555;ö@#333}.Lab-x-disp,.cmy-only .cmyk-k-disp,.cmy-only .cmyk-k-butt{visibility:hidden}«HEX-disp{öimage:none}«§disp{float:left;~48¥ä14¥margin:2px 2px 0¥cursor:text;text-align:left;text-indent:3¥?~1¥?style:solid;?@#222 #555 #555 #222}∑ .§nsarrow{|absolute;top:0¥left:-13¥~8¥ä16¥display:none;ö|-87px -23px}∑ .start-change .§nsarrow{display:block}∑ .do-change .§nsarrow{display:block;ö|-87px -36px}.do-change .§disp{cursor:default}«§hide{display:none}«§cont,«§cold{|absolute;top:-5¥left:0¥ä3¥border:1px solid #333}«§cold{z-index:1;ö@#c00}«§cont{margin-Ü:-1¥z-index:2}«contrast .§cont{z-index:1;ö@#ccc}«orange .§cold{ö@#f90}«green .§cold{ö@#4d0}«§ctrl{|absolute;bottom:0¥left:0¥~100%;ö@#fff}.alpha-bg-b .§ctrl,«§bres,«§bsav{ö@#333}«§col1,«§col2,«§bres,«§bsav{?~1¥?style:solid;?@#555 #222 #222 #555;float:left;~45¥line-ä28¥text-align:center;top:0px}.§panel div div{ä100%}.S .§ctrl div{line-ä25px}.S «§bres,.S «§bsav{line-ä26px}∑ .§exit,∑ .§resize{Ü:3¥top:3¥~15¥ä15¥ö|0 -52px}∑ .§resize{top:auto;bottom:3¥cursor:nwse-resize;ö|-15px -52px}.S .§exit{ö|1px -52px}.XS .§resize,.XS .§exit{~10¥ä10¥Ü:0¥öimage:none}.XS .§exit{top:0px}.XS .§resize{bottom:0px}∑ .§resizer,∑ .§resizer div{|absolute;border:1px solid #888;top:-1¥Ü:-1¥bottom:-1¥left:-1¥z-index:2;display:none;cursor:nwse-resize}∑ .§resizer div{border:1px dashed #333;opacity:0.3;display:block;ö@#bbb}'.replace(/Ü/g, 'right').replace(/Ö/g, 'left}').replace(/∑/g, '.§app').replace(/«/g, '.§panel .').replace(/¥/g, 'px;').replace(/\|/g, 'position:').replace(/@/g, 'color:').replace(/ö/g, 'background-').replace(/ä/g, 'height:').replace(/ø/g, '.§memo').replace(/†/g, 'transparent').replace(/\~/g, 'width:').replace(/\?/g, 'border-').replace(/\^/g, '.§sld'),
		    _horizontalPng = 'iVBORw0KGgoAAAANSUhEUgAABIAAAAABCAYAAACmC9U0AAABT0lEQVR4Xu2S3Y6CMBCFhyqIsjGBO1/B9/F5DC/pK3DHhVkUgc7Zqus2DVlGU/cnQZKTjznttNPJBABA149HyRf1iN//4mIBCg0jV4In+j9xJiuihly1V/Z9X88v//kNeDXVvyO/lK+IPR76B019+1Riab3H1zkmeqerKnL+Bzwxx6PAgZxaSQU8vB62T28pxcQeRQ2sHw6GxCOWHvP78zwHAARBABOfdYtd30rwxXOEPDF+dj2+91r6vV/id3k+/brrXmaGUkqKhX3i+ffSt16HQ/dorTGZTHrs7ev7Tl7XdZhOpzc651nfsm1bRFF0YRiGaJoGs9nsQuN/xafTCXEco65rzOdzHI9HJEmCqqqwXC6x3++RZRnKssRqtUJRFFiv19jtdthutyAi5Hl+Jo9VZg7+7f3yXuvZf5c3KaXYzByb+WIzO5ymKW82G/0BNcFhO/tOuuMAAAAASUVORK5CYII=',
		    _verticalPng = 'iVBORw0KGgoAAAANSUhEUgAAAAEAABfACAYAAABn2KvYAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAABHtJREFUeNrtnN9SqzAQxpOF1to6zuiVvoI+j6/gva/lA/kKeqUzjtX+QTi7SzSYBg49xdIzfL34+e1usoQQklCnmLwoCjImNwDQA2xRGMqNAYB+gPEH9IdCgIUA6Aem0P1fLoMQAPYNHYDoCKAv8OMHFgKgX2AjDPQDXn4t1l+gt/1fId//yWgE/hUJ+mAn8EyY5wCwXxhrbaHzn8E9iPlv79DdHxXTqciZ4KROnXRVZMF/6U2OPhcEavtAbZH1SM7wRDD7VoHZItCiyEQf4t6+MW9UOxaZybmdCGKqNrB9Eb5SfMg3wTyiagMtigTmWofiSDCOYNTSNz6sLDIoaCU9GWDd0tdhoMMsRm+r8U/EfB0GfjmLXiqzimDd0tdhoLMsI7la45+I+ToM/HIW0kfGVQTrlr7tA91kaUr//fxrKo8jUFB7VAn6AKpHJf+EKwAAAIYD/f7F7/8MVgMo7P+gBqDKr57Lf72V8x8AAMDgYIuvH4EAAAAMDQX6AACAQcI9GGMjDADA4MA/P2KlP8IEAAAYFCz6AACAgaLA8y8AAIN+CMYXoQAADA7u/UPYCAMAMDjI7z9S+SdwDFQX2C9Gh9GMEOWriz8/Pw1lWQZsi/L3R4czzP678Ve+P8f9nCv/C7hwLq99ah8NfKrU15zPB5pVcwtiJt9qGy0IfEE+jQa+Fn0VtI/fkxUPqBlEfRENeF+tqUpbGpi1iu8epwJzvV5XA4GpWC6XGz7F+/u766EgwJ+ckiTJKU3TnI6OjnI6OzvLZf6zMggt3dzckPhIoiTlSGpQ+eEsVegdz0fbCCi4fRs+Po+4yWdeDXiT+6pBSTeHple1pkz3FZ+avpyavoiPxgLN0B7yprY08PlyQTTm0+PWmkH7ynedNKraar4F/lRj1WpTtYh+ozL/cY2sAvZl0gcbZm0gSLBLvkxGoaogiy/HDXemQk2t5pUm8OAhH8/HH6e0mkJ9q9XKKQXfb07xfZnJbZrRxcVFVt6/t7e3Kc1ms5RGo1Eq5VIZuyl9fHw4k/M5xYeoKj64A7eqCt1ZeqWFVSl8NV9OTV3fmvP5qE9VmzSoEcsXpArK1UHen/hZbgL53BZSdyEXalGau/hU8TEW0u3VcoFPy3EDFrTgT+njydeZ0+l0UV7fu7u7iVzziQQmUm4iqRw4n/NxMxw4s/Mp1NSALxf4NEtQ10cjMDwSl+b+/j6hp6enVGb+jUvrn05iKobm6PboOt8vPISY5Pr6OqGXlxe3fOokoGtAbMUJZmqvYmaLQDP+sdrecOjtO/SXeH69P8Imutm5urqy9PDwYOny8tLS4+OjpfPzc0vPz8+WTk9PLb2+vlpZbCzN53NLx8fHVtYZS5PJxMoEZWWqsjKULY3HYytTi1Pex5OMldXKRVXxuLcy/20onmms3BBOxcr5qCrZtsrd45SPel8sGlOxGoGy0neynQ6VL9fsa1YtWlCrtj9G83G7PjdVush5n5q1iJWLZW6u21a1bUvbVnVzlru0pe3RdmlV1/23fZtbZv4Dx+7FBypx77kAAAAASUVORK5CYII=',
		    _patchesPng = 'iVBORw0KGgo^NSUhEUgAAB4^EACAI#DdoPxz#L0UlEQVR4Xu3cQWrDQBREwR7FF8/BPR3wXktnQL+KvxfypuEhvLJXcp06d/bXd71OPt+trIw95zr33Z1bk1/fudEv79wa++7OfayZ59wrO2PBzklcGQmAZggAAOBYgAYBmpWRAGg^BGgRofAENgAAN#I0CBA6w8AG^ECABgEa/QH§AI0CNDoDwAY^QIAGAVp/AM§AjQI0OgPAAY^QoEGARn8Aw§CNAjQ+gMABg#BCgQYCmGQmABgAAEKBBgEZ/AM§AjQI0PoDAAY^QoEGARn8AM^IAADQI0+gMABg#BCgQYDWHwAw^gAANAjT6A4AB^BGgQoNEfAD^C#0CtP4AgAE^EaBCgaUYCoAE#RoEKDRHwAw^gAANArT+AIAB^BGgQoNEfAAw^gQIMAjf4AgAE^EaBCg9QcAD^CBAgwCN/gBg§EaBGj0BwAM^IECDAK0/AG§ARoEaJqRAGg^BGgRo9AcAD^CBAgwCtPwBg§EaBGj0BwAD^CNAgQKM/AG§ARoEaP0BAAM^I0CBAoz8AG^ECABgEa/QEAAw^jQIEDrDwAY^QIAGAZpmJACaBw^RoEKD1BwAM^IECDAK0/AG§ARoEaPQHAAw^gQIMArT8AY§BGgRo/QEAAw^jQIECjPwBg§EaBGj9AQAD^CNAgQOsPABg#BAgAYBGv0BAANwCwAAGB6gYeckmpEAa^AEaBGj0BwAM^IECDAK0/AG§ARoEaPQHAAM^I0CBAoz8AY§BGgRo/QEAAw^jQIECjPwAY^QIAGARr9AQAD^CNAgQOsPABg#BAgAYBmmYkABoAAECABgEa/QEAAw^jQIEDrDwAY^QIAGARr9Ac§AjQI0OgPABg#BAgAYBWn8Aw§CNAjQ6A8ABg#BCgQYBGfwD§AI0CND6AwAG^EKBBgKYZCYAG#QoEGARn8Aw§CNAjQ+gMABg#BCgQYBGfwAw^gAANAjT6AwAG^EKBBgNYfAD^C#0CNPoDgAE^EaBCg0R8AM^IAADQK0/gCAAQ^RoEKBpRgKgAQAABGgQoNEfAD^C#0CtP4AgAE^EaBCg0R8AD^CBAgwCN/gCAAQ^RoEKD1BwAM^IECDAI3+AG§ARoEaPQHAAw^gQIMArT8AY§BGgRomsMAM^IAADQK0/gCAAQ^RoEKDRHwAw^gAANO7fQHwAw^gAANArT+AIAB^BGgQoNEfAGg^BGgRo9AcAD^CBAgwCtPwBg§EaBGj0BwAD^RIB+Ntg5iea5AD^DAIwI0CND6AwAG^EKBBgEZ/AKAB#EaBCg0R8AM^IAADQK0/gCAAQ^RoEKDRHwAM^IECDAI3+AIAB^BGgQoPUHAAw^gQIMAjf4AY§BGgRo9AcAD^CBAgwCtPwBg§EaBGiakQBo^ARoEaPQHAAw^gQIMArT8AY§BGgRo9AcAAw^jQIECjPwBg§EaBGj9AQAD^CNAgQKM/ABg#BAgAYBGv0BAAM^I0CBA6w8AG^ECABgGaZiQAGgAAQIAGARr9AQAD^CNAgQOsPABg#BAgAYBGv0Bw§CNAjQ6A8AG^ECABgFafwD§AI0CNDoDwAG^EKBBgEZ/AM§AjQI0PoDAAY^QoEGApjkMAAM^I0CBA6w8AG^ECABgEa/QEAAw^jQsIP+AIAB^BGgQoPUHAAw^gQIMAjf4AgAE#Bea/fK+3P5/3PJOvh8t1cO4nflmQAQoAEAAF9Aw/7JHfQHAAw^gQIMArT8AY§BGvwHNPoDAA0AACBAgwCN/gCAAQ^RoEKD1BwAM^IECDAI3+AG§ARoEaPQHAAw^gQIMArT8AY§BGgRo9AcAAw^jQIECjPwBg§EaBGj9AQAD^CNAgQNOMBEAD#I0CBAoz8AY§BGgRo/QEAAw^jQIECjPwAY^QIAGARr9AQAD^CNAgQOsPABg#BAgAYBGv0Bw§CNAjQ6A8AG^ECABgFafwD§AI0CNA0IwHQ^AjQI0OgPABg#BAgAYBWn8Aw§CNAjQ6A8ABg#BCgQYBGfwD§AI0CND6AwAG^EKBBgEZ/AD^C#0CNPoDAAY^QoEGA1h8AM^IAADQI0DQAG^EKBBgEZ/AM§AjQI0PoDAAY^QoEGA1h8AM^IAADQI0+gMABg#BCgQYDWHwAw^gAANArT+AIAB^BGgQoNEfAD^C#0CtP4AgAE^EaBCg9QcAD^CBAgwCN/gCAAQ^RoEKD1BwAM^IECDAK0/AG§ARoEaPQHAAw^gQIMArT8AY§BGgRo/QEAAw^jQIECjPwBgACDhFgC#07t9AfAD^C#0CtP4AgAE^EaBCg0R8Aa^AEaBGj0BwAM^IECDAK0/AG§ARoEaPQHAAM^I0CBAoz8AY§BGgRo/QEAAw^jQIECjPwAY^QIAGARr9AQAD^CNAgQOsPABg#BAgAYBmmYkABoAAECABgEa/QEAAw^jQIEDrDwAY^QIAGARr9Ac§AjQI0OgPABg#BAgAYBWn8Aw§CNAjQ6A8ABg#BCgQYBGfwD§AI0CND6AwAG^EKBBgKYZCYAG#QoEGARn8Aw§CNAjQ+gMABg#BCgQYBGfwAw^gAANAjT6AwAG^EKBBgNYfAD^C#0CNPoDgAE^EaBCg0R8AM^IAADQK0/gCAAQ^RoEKBpRgKgAQAABGgQoNEfAD^C#0CtP4AgAE^EaBCg0R8AD^CBAgwCN/gCAAQ^RoEKD1BwAM^IECDAI3+AG§ARoEaPQHAAw^gQIMArT8AY§BGgRommEAM^CBAgwCN/gCAAQ^RoEKD1BwAM^IECDAI3+AIAB^ARoEaPQHAAw^gQIMArT8AY§BGgRo9AcAGgAAQICGCNBfRfNcABg#BgeICGnVvoDwAY^QIAGAVp/AM§AjQI0OgPADQAAIAADQI0+gMABg#BCgQYDWHwAw^gAANAjT6A4AB^BGgQoNEfAD^C#0CtP4AgAE^EaBCg0R8AD^CBAgwCN/gCAAQ^RoEKD1BwAM^IECDAE0zEgAN#gQIMAjf4AgAE^EaBCg9QcAD^CBAgwCN/gBg§EaBGj0BwAM^IECDAK0/AG§ARoEaPQHAAM^I0CBAoz8AY§BGgRo/QEAAw^jQIEDTjARAAwAACNAgQKM/AG§ARoEaP0BAAM^I0CBAoz8AG^ECABgEa/QEAAw^jQIEDrDwAY^QIAGARr9Ac§AjQI0OgPABg#BAgAYBWn8Aw§CNAjQNIcBY§BGgRo/QEAAw^jQIECjPwBg§EadtAfAD^C#0CtP4AgAE^EaBCgAQABGgAA+AO2TAbHupOgH^ABJRU5ErkJggg=='.replace(/§/g, 'AAAAAA').replace(/\^/g, 'AAAA').replace(/#/g, 'AAA'),
		    _iconsPng = 'iVBORw0KGgoAAAANSUhEUgAAAGEAAABDCAMAAAC7vJusAAAAkFBMVEUAAAAvLy9ERERubm7///8AAAD///9EREREREREREREREQAAAD///8AAAD///8AAAD///8AAAD///8AAAD///8AAAD///8AAAD///8AAAD///8AAAD///8cHBwkJCQnJycoKCgpKSkqKiouLi4vLy8/Pz9AQEBCQkJDQ0NdXV1ubm58fHykpKRERERVVVUzMzPx7Ab+AAAAHXRSTlMAAAAAAAQEBQ4QGR4eIyMtLUVFVVVqapKSnJy7u9JKTggAAAFUSURBVHja7dXbUoMwEAbgSICqLYeW88F6KIogqe//dpoYZ0W4AXbv8g9TwkxmvtndZMrEwlw/F8YIRjCCEYxgBCOsFmzqGMEI28J5zzmt0Pc9rdDL0NYgMxIYC5KiKpKAzZphWtZlGm4SjlnkOV6UHeeEUx77rh/npw1dCrI9k9lnwUwF+UG9D3m4ftJJxH4SJdPtaawXcbr+tBaeFrxiur309cIv19+4ytGCU0031a5euPVigLYGqjlAqM4ShOQ+QAYQUO80AMMAAkUGGfMfR9Ul+kmvPq2QGxXKOQBAKdjUgk0t2NiCGEVP+rHT3/iCUMBT90YrPMsKsIWP3x/VolaonJEETchHCS8AYAmaUICQQwaAQnjoXgHAES7jLkEFaHO4bdq/k25HAIpgWY34FwAE5xjCffM+D2DV8B0gRsAZT7hr5gE8wdrJcU+CJqhcqQD7Cx5L7Ph4WnrKAAAAAElFTkSuQmCC',
		    _bgsPng = 'iVBORw0KGgoAAAANSUhEUgAAASAAAABvCAYAAABM+h2NAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAABORJREFUeNrs3VtTW1UYBuCEcxAI4YydWqTWdqr1V7T/2QsvvPDCCy9qjxZbamsrhZIQUHsCEtfafpmJe8qFjpUxfZ4Zuvt2feydJvAOARZUut1u5bRerl692nV913f99/f6QxWAU6KAAAUEKCAABQQoIAAFBCggAAUEKCAABQQoIAAFBCggAAUEKCAABQQoIEABASggQAEBKCBAAQEoIEABASggQAEBKCBAAQEoIGBQC+jatWvd07zxrv9+Xx8fAQEoIEABASggQAEBKCBAAQEoIEABAQoIQAEBCghAAQEKCEABAQOk2u36kS6AAgLetwJKL29toFRM1be+QrVq3rx58//KvM8BAadGAQEKCFBAAAoIGHwnfhneZ+/Nmzf/LufzrI+AAE/BAAUEoIAABQTwztgLZt68eXvBAE/BABQQoIAAFBAweOwFM2/evL1ggKdgAAoIUEAACggYPPaCmTdv3l4wwFMwAAUEKCAABQQMHnvBzJs3by8Y4CkYgAICFBCAAgIGz4lfBQNQQMDgFlCtVisaaHV1tThubW1VInciD0U+ysdnz54N5+PKysphOnRTHsvHlN9EHo/1l5FrkV9Enoz8W87b29tTOS8vLx9EnoncjlyPvBe5EbkZeT4fU96NvBDr2znv7Ows57y0tLQVeSXy08gf5mNfPhPrjyOfrVarlcXFxZ9yfv78+bl8TPlh5LU8n/KDyOuxfj/y+VjfyHl3d/dCKv28fi/yp/m4sLDwQ+SLke9GvhT5Tinfjnw5f4/F/Pz8rZybzeZn+ZjyzVK+EfnzUr4S+Xopf9/L+fxzc3M5d1qt1hf531Mu5k/IxzGf85VYL+fefHH+RqNRrO/t7RW3L+UbkS9Hvhk5/386Kd/qW8/5duRLMV/OdyJfzNebnZ0t7t92u53v/07K9yJfiLwROT9+ef7HyOux/iDyWuSHkT+K+eLtZX9//2xer9frjyOfyY9/Wn8S86v59qT1p7Ge315zLt4RU16K19+O9YXIu5HnYn435hux3opcj9yOPB3z+5E/iPXf43y1yMX778HBQS3f3pTz+28l5bHIr2N+LN3+zszMzGHkoh/S+mHMF98XlNaP8zHd/0W/pMe943NAwKlSQIACAhQQgAICFBCAAgIUEIACAhQQgAIC/n9GqtXqYbfbHa38+RtSu32llPdqdNL6aOSj+LfxyMVekLTem39Ryr/mPDQ0NBznzXtROikPRW6W8k7k3m9rzXthOsPDw73bUuylGRkZ6cR63nvTSfko8oPIr+Pnz96P/DLW816ezujoaN6DdtyX9+P8eS9QZ2xs7Hxf7qa8Xlr/JO6Ljcjrcf6cj1P+OO+N6V1/fHz8XLz+/Tjfubh+sZcorZ+N9Ycxfybyo8ircf6fc56YmFiJ1/8l8mLk7cjzkfP92U15Ns63G+u9nPcKdWq12lQ8Xu3Ixd6f9Pd8P3UmJycnUszzL2N9LM7/anNzs9V7Q2q32395w/q7ubdH6L/KrVbrpPxlKX9Vyl+X8jel/G0pf5f/aDabvXy9tH6ztH63lDdKebOUH5Xyk1LeKuWd/ry2tlap9P125Onp6Zf9eWpq6lW3b8f6zMzM6/71er3+ppSP+u/XNN/pz41Go+sjIMBTMEABASggQAEBKCBAAQEoIEABASggQAEB/CN/CDAAw78uW9AVDw4AAAAASUVORK5CYII=';
	
		window.ColorPicker = {
			_html: _html,
			_cssFunc: _cssFunc,
			_cssMain: _cssMain,
			_horizontalPng: _horizontalPng,
			_verticalPng: _verticalPng,
			_patchesPng: _patchesPng,
			_iconsPng: _iconsPng,
			_bgsPng: _bgsPng
		};
	})(window);

/***/ },
/* 320 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	;(function (window, undefined) {
		"use strict";
	
		var _data = window.ColorPicker,
		    // will be deleted in buildView() and holds:
		// window.ColorPicker = { // comes from colorPicker.data.js and will be overwritten.
		// 	_html: ..., // holds the HTML markup of colorPicker
		// 	_cssFunc: ..., // CSS for all the sliders
		// 	_cssMain: ..., // CSS of the GUI
		// 	_horizontalPng: ..., // horizontal background images for sliders
		// 	_verticalPng: ..., // vertical background images for sliders
		// 	_patchesPng: ..., // background images for square sliders in RGB mode
		// 	_iconsPng: ..., // some icon sprite images
		// 	_bgsPng: ..., // some more icon sprite images
		// }
		_devMode = !_data,
		    // if no _data we assume that colorPicker.data.js is missing (for development)
		_isIE = false,
		    _doesOpacity = false,
	
		// _isIE8 = _isIE && document.querySelectorAll,
	
		_valueRanges = {},
		    // will be assigned in initInstance() by Colors instance
		// _valueRanges = {
		// 	rgb:   {r: [0, 255], g: [0, 255], b: [0, 255]},
		// 	hsv:   {h: [0, 360], s: [0, 100], v: [0, 100]},
		// 	hsl:   {h: [0, 360], s: [0, 100], l: [0, 100]},
		// 	cmyk:  {c: [0, 100], m: [0, 100], y: [0, 100], k: [0, 100]},
		// 	cmy:   {c: [0, 100], m: [0, 100], y: [0, 100]},
		// 	XYZ:   {X: [0, 100], Y: [0, 100], Z: [0, 100]},
		// 	Lab:   {L: [0, 100], a: [-128, 127], b: [-128, 127]},
		// 	alpha: {alpha: [0, 1]},
		// 	HEX:   {HEX: [0, 16777215]}
		// },
		_bgTypes = { w: 'White', b: 'Black', c: 'Custom' },
		    _mouseMoveAction,
		    // current mouseMove handler assigned on mouseDown
		_action = '',
		    // needed for action callback; needed due to minification of javaScript
		_mainTarget,
		    // target on mouseDown, might be parent element though...
		_valueType,
		    // check this variable; gets missused/polutet over time
		_delayState = 1,
		    // mouseMove offset (y-axis) in display elements // same here...
		_startCoords = {},
		    _targetOrigin = {},
		    _renderTimer,
		    // animationFrame/interval variable
		_newData = true,
	
		// _txt = {
		// 	selection: document.selection || window.getSelection(),
		// 	range: (document.createRange ? document.createRange() : document.body.createTextRange())
		// },
	
		_renderVars = {},
		    // used only in renderAll and convertColors
		_cashedVars = {},
		    // reset in initSliders
	
		_colorPicker,
		    _previousInstance,
		    // only used for recycling purposes in buildView()
		_colorInstance = {},
		    _colors = {},
		    _options = {},
		    _nodes = {},
		    _math = Math,
		    animationFrame = 'AnimationFrame',
		    // we also need this later
		requestAnimationFrame = 'request' + animationFrame,
		    cancelAnimationFrame = 'cancel' + animationFrame,
		    vendors = ['ms', 'moz', 'webkit', 'o'],
		    ColorPicker = function ColorPicker(options) {
			// as tiny as possible...
			this.options = {
				color: 'rgba(204, 82, 37, 0.8)',
				mode: 'rgb-b',
				fps: 60, // 1000 / 60 = ~16.7ms
				delayOffset: 8,
				CSSPrefix: 'cp-',
				allMixDetails: true,
				alphaBG: 'w',
				imagePath: ''
				// devPicker: false // uses existing HTML for development...
				// noAlpha: true,
				// customBG: '#808080'
				// size: 0,
				// cmyOnly: false,
				// initStyle: 'display: none',
	
				// memoryColors: "'rgba(82,80,151,1)','rgba(100,200,10,0.5)','rgba(100,0,0,1)','rgba(0,0,0,1)'"
				// memoryColors: [{r: 100, g: 200, b: 10, a: 0.5}] // 
	
				// opacityPositionRelative: undefined,
				// customCSS: undefined,
				// appendTo: document.body,
				// noRangeBackground: false,
				// textRight: false, ?????
				// noHexButton: false,
				// noResize: false,
	
				// noRGBr: false,
				// noRGBg: false,
				// noRGBb: false,
	
				// ------ CSSStrength: 'div.',
				// XYZMatrix: XYZMatrix,
				// XYZReference: {},
				// grey: grey,
				// luminance: luminance,
	
				// renderCallback: undefined,
				// actionCallback: undefined,
				// convertCallback: undefined,
			};
			initInstance(this, options || {});
		};
	
		window.ColorPicker = ColorPicker; // export differently
		ColorPicker.addEvent = addEvent;
		ColorPicker.removeEvent = removeEvent;
		ColorPicker.getOrigin = getOrigin;
		ColorPicker.limitValue = limitValue;
		ColorPicker.changeClass = changeClass;
	
		// ------------------------------------------------------ //
	
		ColorPicker.prototype.setColor = function (newCol, type, alpha, forceRender) {
			focusInstance(this);
			_valueType = true; // right cursor...
			// https://github.com/petkaantonov/bluebird/wiki/Optimization-killers
			preRenderAll(_colorInstance.setColor.apply(_colorInstance, arguments));
			if (forceRender) {
				this.startRender(true);
			}
		};
	
		ColorPicker.prototype.saveAsBackground = function () {
			focusInstance(this);
			return saveAsBackground(true);
		};
	
		ColorPicker.prototype.setCustomBackground = function (col) {
			focusInstance(this); // needed???
			return _colorInstance.setCustomBackground(col);
		};
	
		ColorPicker.prototype.startRender = function (oneTime) {
			focusInstance(this);
			if (oneTime) {
				_mouseMoveAction = false; // prevents window[requestAnimationFrame] in renderAll()
				renderAll();
				this.stopRender();
			} else {
				_mouseMoveAction = 1;
				_renderTimer = window[requestAnimationFrame](renderAll);
			}
		};
	
		ColorPicker.prototype.stopRender = function () {
			focusInstance(this); // check again
			window[cancelAnimationFrame](_renderTimer);
			if (_valueType) {
				// renderAll();
				_mouseMoveAction = 1;
				stopChange(undefined, 'external');
				// _valueType = undefined;
			}
		};
	
		ColorPicker.prototype.setMode = function (mode) {
			// check again ... right cursor
			focusInstance(this);
			setMode(mode);
			initSliders();
			renderAll();
		};
	
		ColorPicker.prototype.destroyAll = function () {
			// check this again...
			var html = this.nodes.colorPicker,
			    destroyReferences = function destroyReferences(nodes) {
				for (var n in nodes) {
					if (nodes[n] && nodes[n].toString() === '[object Object]' || nodes[n] instanceof Array) {
						destroyReferences(nodes[n]);
					}
					nodes[n] = null;
					delete nodes[n];
				}
			};
	
			this.stopRender();
			installEventListeners(this, true);
			destroyReferences(this);
			html.parentNode.removeChild(html);
			html = null;
		};
	
		ColorPicker.prototype.renderMemory = function (memory) {
			var memos = this.nodes.memos,
			    tmp = [];
	
			if (typeof memory === 'string') {
				// revisit!!!
				memory = memory.replace(/^'|'$/g, '').replace(/\s*/, '').split('\',\'');
			}
			for (var n = memos.length; n--;) {
				// check again how to handle alpha...
				if (memory && typeof memory[n] === 'string') {
					tmp = memory[n].replace('rgba(', '').replace(')', '').split(',');
					memory[n] = { r: tmp[0], g: tmp[1], b: tmp[2], a: tmp[3] };
				}
				memos[n].style.cssText = 'background-color: ' + (memory && memory[n] !== undefined ? color2string(memory[n]) + ';' + getOpacityCSS(memory[n]['a'] || 1) : 'rgb(0,0,0);');
			}
		};
	
		// ------------------------------------------------------ //
	
		function initInstance(THIS, options) {
			var exporter,
			    // do something here..
			mode = '',
			    CSSPrefix = '',
			    optionButtons;
	
			for (var option in options) {
				// deep copy ??
				THIS.options[option] = options[option];
			}
			_isIE = document.createStyleSheet !== undefined && document.getElementById || !!window.MSInputMethodContext;
			_doesOpacity = typeof document.body.style.opacity !== 'undefined';
			_colorInstance = new Colors(THIS.options);
			// We transfer the responsibility to the instance of Color (to save space and memory)
			delete THIS.options;
			_options = _colorInstance.options;
			_options.scale = 1;
			CSSPrefix = _options.CSSPrefix;
	
			THIS.color = _colorInstance; // check this again...
			_valueRanges = _options.valueRanges;
			THIS.nodes = _nodes = getInstanceNodes(buildView(THIS), THIS); // ha, ha,... make this different
			setMode(_options.mode);
			focusInstance(THIS);
			saveAsBackground();
	
			mode = ' ' + _options.mode.type + '-' + _options.mode.z;
			_nodes.slds.className += mode;
			_nodes.panel.className += mode;
			//_nodes.colorPicker.className += ' cmy-' + _options.cmyOnly;
	
			if (_options.noHexButton) {
				changeClass(_nodes.HEX_butt, CSSPrefix + 'butt', CSSPrefix + 'labl');
			}
	
			if (_options.size !== undefined) {
				resizeApp(undefined, _options.size);
			}
	
			optionButtons = {
				alphaBG: _nodes.alpha_labl,
				cmyOnly: _nodes.HEX_labl // test... take out
			};
			for (var n in optionButtons) {
				if (_options[n] !== undefined) {
					buttonActions({ target: optionButtons[n], data: _options[n] });
				}
			}
			if (_options.noAlpha) {
				_nodes.colorPicker.className += ' no-alpha'; // IE6 ??? maybe for IE6 on document.body
			}
	
			THIS.renderMemory(_options.memoryColors);
	
			installEventListeners(THIS);
	
			_mouseMoveAction = true;
			stopChange(undefined, 'init');
	
			if (_previousInstance) {
				focusInstance(_previousInstance);
				renderAll();
			}
		}
	
		function focusInstance(THIS) {
			_newData = true;
			if (_colorPicker !== THIS) {
				_colorPicker = THIS;
				_colors = THIS.color.colors;
				_options = THIS.color.options;
				_nodes = THIS.nodes;
				_colorInstance = THIS.color;
	
				_cashedVars = {};
				preRenderAll(_colors);
			}
		}
	
		function getUISizes() {
			var sizes = ['L', 'S', 'XS', 'XXS'];
			_options.sizes = {};
			_nodes.testNode.style.cssText = 'position:absolute;left:-1000px;top:-1000px;';
			document.body.appendChild(_nodes.testNode);
			for (var n = sizes.length; n--;) {
				_nodes.testNode.className = _options.CSSPrefix + 'app ' + sizes[n];
				_options.sizes[sizes[n]] = [_nodes.testNode.offsetWidth, _nodes.testNode.offsetHeight];
			}
			if (_nodes.testNode.removeNode) {
				// old IEs
				_nodes.testNode.removeNode(true);
			} else {
				document.body.removeChild(_nodes.testNode);
			}
		}
	
		function buildView(THIS) {
			var app = document.createElement('div'),
			    prefix = _options.CSSPrefix,
			    urlData = 'data:image/png;base64,',
			    addStyleSheet = function addStyleSheet(cssText, id) {
				var style = document.createElement('style');
	
				style.setAttribute('type', 'text/css');
				if (id) {
					style.setAttribute('id', id);
				}
				if (!style.styleSheet) {
					style.appendChild(document.createTextNode(cssText));
				}
				document.getElementsByTagName('head')[0].appendChild(style);
				if (style.styleSheet) {
					// IE compatible
					document.styleSheets[document.styleSheets.length - 1].cssText = cssText;
				}
			},
			    processCSS = function processCSS(doesBAS64) {
				// CSS - system
				_data._cssFunc = _data._cssFunc.replace(/§/g, prefix).replace('_patches.png', doesBAS64 ? urlData + _data._patchesPng : _options.imagePath + '_patches.png').replace('_vertical.png', doesBAS64 ? urlData + _data._verticalPng : _options.imagePath + '_vertical.png').replace('_horizontal.png', doesBAS64 ? urlData + _data._horizontalPng : _options.imagePath + '_horizontal.png');
				addStyleSheet(_data._cssFunc, 'colorPickerCSS');
				// CSS - main
				if (!_options.customCSS) {
					_data._cssMain = _data._cssMain.replace(/§/g, prefix).replace('_bgs.png', doesBAS64 ? urlData + _data._bgsPng : _options.imagePath + '_bgs.png').replace('_icons.png', doesBAS64 ? urlData + _data._iconsPng : _options.imagePath + '_icons.png').
					// replace('"Courier New",', !_isIE ? '' : '"Courier New",').
					replace(/opacity:(\d*\.*(\d+))/g, function ($1, $2) {
						return !_doesOpacity ? '-ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=' + _math.round(+$2 * 100) + ')";filter: alpha(opacity=' + _math.round(+$2 * 100) + ')' : '-moz-opacity: ' + $2 + '; -khtml-opacity: ' + $2 + '; opacity: ' + $2;
					});
					// style.appendChild(document.createTextNode(_data._cssFunc));
					addStyleSheet(_data._cssMain);
				}
				// for (var n in _data) { // almost 25k of memory ;o)
				// 	_data[n] = null;
				// }
			},
			    test = document.createElement('img');
	
			// development mode
			if (_devMode) {
				return THIS.color.options.devPicker;
			}
	
			// CSS
			if (!document.getElementById('colorPickerCSS')) {
				// only once needed
				test.onload = test.onerror = function () {
					if (_data._cssFunc) {
						processCSS(this.width === 1 && this.height === 1);
					}
				};
				test.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
			}
	
			// HTML
			if (_previousInstance = _colorPicker) {
				// we need to be careful with recycling HTML as slider calssNames might have been changed...
				initSliders();
			}
			// app.innerHTML = _colorPicker ? _colorPicker.nodes.colorPicker.outerHTML : _data._html.replace(/§/g, prefix);
			// faster ... FF8.0 (2011) though (but IE4)
			// outerHTML ... FF11 (2013)
			app.insertAdjacentHTML('afterbegin', _colorPicker ? _colorPicker.nodes.colorPicker.outerHTML || new XMLSerializer().serializeToString(_colorPicker.nodes.colorPicker) : // FF before F11
			_data._html.replace(/§/g, prefix));
			// _colorPicker ? _colorPicker.nodes.colorPicker.parentNode.innerHTML : _data._html.replace(/§/g, prefix));
			// _data._html = null;
	
			app = app.children[0];
			app.style.cssText = _options.initStyle || ''; // for initial hiding...
			// get a better addClass for this....
			// app.className = app.className.split(' ')[0]; // cleanup for multy instances
	
			return (_options.appendTo || document.body).appendChild(app);
		}
	
		function getInstanceNodes(colorPicker, THIS) {
			// check nodes again... are they all needed?
			var all = colorPicker.getElementsByTagName('*'),
			    nodes = { colorPicker: colorPicker },
			    // length ?? // rename nodes.colorPicker
			node,
			    className,
			    memoCounter = 0,
			    regexp = new RegExp(_options.CSSPrefix);
	
			// nodes.displayStyles = {}; // not needed ... or change to CSS
			nodes.styles = {};
			// nodes.styles.displays = {};
	
			nodes.textNodes = {};
			nodes.memos = [];
			nodes.testNode = document.createElement('div');
	
			for (var n = 0, m = all.length; n < m; n++) {
				node = all[n];
				if ((className = node.className) && regexp.test(className)) {
					className = className.split(' ')[0].replace(_options.CSSPrefix, '').replace(/-/g, '_');
					if (/_disp/.test(className)) {
						className = className.replace('_disp', '');
						// nodes.styles.displays[className] = node.style;
						nodes.styles[className] = node.style;
						nodes.textNodes[className] = node.firstChild;
						node.contentEditable = true; // does this slow down rendering??
					} else {
							if (!/(?:hs|cmyk|Lab).*?(?:butt|labl)/.test(className)) {
								nodes[className] = node;
							}
							if (/(?:cur|sld[^s]|opacity|cont|col)/.test(className)) {
								nodes.styles[className] = /(?:col\d)/.test(className) ? node.children[0].style : node.style;
							}
						}
				} else if (/memo/.test(node.parentNode.className)) {
					nodes.memos.push(node);
				}
			}
	
			// Chrome bug: focuses contenteditable on mouse over while dragging
			nodes.panelCover = nodes.panel.appendChild(document.createElement('div'));
	
			return nodes;
		}
	
		// ------------------------------------------------------ //
		// ---- Add event listners to colorPicker and window ---- //
		// -------------------------------------------------------//
	
		function installEventListeners(THIS, off) {
			var onOffEvent = off ? removeEvent : addEvent;
	
			onOffEvent(_nodes.colorPicker, 'mousedown', function (e) {
				var event = e || window.event,
				    page = getPageXY(event),
				    target = (event.button || event.which) < 2 ? event.target || event.srcElement : {},
				    className = target.className;
	
				focusInstance(THIS);
				_mainTarget = target;
				stopChange(undefined, 'resetEventListener');
				_action = ''; // needed due to minification of javaScript
	
				if (target === _nodes.sldl_3 || target === _nodes.curm) {
					_mainTarget = _nodes.sldl_3;
					_mouseMoveAction = changeXYValue;
					_action = 'changeXYValue';
					changeClass(_nodes.slds, 'do-drag');
				} else if (/sldr/.test(className) || target === _nodes.curl || target === _nodes.curr) {
					_mainTarget = _nodes.sldr_4;
					_mouseMoveAction = changeZValue;
					_action = 'changeZValue';
				} else if (target === _nodes.opacity.children[0] || target === _nodes.opacity_slider) {
					_mainTarget = _nodes.opacity;
					_mouseMoveAction = changeOpacityValue;
					_action = 'changeOpacityValue';
				} else if (/-disp/.test(className) && !/HEX-/.test(className)) {
					_mouseMoveAction = changeInputValue;
					_action = 'changeInputValue';
					(target.nextSibling.nodeType === 3 ? target.nextSibling.nextSibling : target.nextSibling).appendChild(_nodes.nsarrow); // nextSibling for better text selection
					_valueType = className.split('-disp')[0].split('-');
					_valueType = { type: _valueType[0], z: _valueType[1] || '' };
					changeClass(_nodes.panel, 'start-change');
					_delayState = 0;
				} else if (target === _nodes.resize && !_options.noResize) {
					if (!_options.sizes) {
						getUISizes();
					}
					_mainTarget = _nodes.resizer;
					_mouseMoveAction = resizeApp;
					_action = 'resizeApp';
				} else {
					_mouseMoveAction = undefined;
				}
	
				if (_mouseMoveAction) {
					_startCoords = { pageX: page.X, pageY: page.Y };
					_mainTarget.style.display = 'block'; // for resizer...
					_targetOrigin = getOrigin(_mainTarget);
					_targetOrigin.width = _nodes.opacity.offsetWidth; // ???????
					_targetOrigin.childWidth = _nodes.opacity_slider.offsetWidth; // ???????
					_mainTarget.style.display = ''; // ??? for resizer...
					_mouseMoveAction(event);
					addEvent(_isIE ? document.body : window, 'mousemove', _mouseMoveAction);
					_renderTimer = window[requestAnimationFrame](renderAll);
				} else {}
				// console.log(className)
				// console.log(THIS.nodes[className.split(' ')[0].replace('cp-', '').replace('-', '_')])
				// resize, button states, etc...
	
	
				// if (_mouseMoveAction !== changeInputValue) preventDefault(event);
				if (!/-disp/.test(className)) {
					return preventDefault(event);
					// document.activeElement.blur();
				}
			});
	
			onOffEvent(_nodes.colorPicker, 'click', function (e) {
				focusInstance(THIS);
				buttonActions(e);
			});
	
			onOffEvent(_nodes.colorPicker, 'dblclick', buttonActions);
	
			onOffEvent(_nodes.colorPicker, 'keydown', function (e) {
				focusInstance(THIS);
				keyControl(e);
			});
	
			// keydown is before keypress and focuses already
			onOffEvent(_nodes.colorPicker, 'keypress', keyControl);
			// onOffEvent(_nodes.colorPicker, 'keyup', keyControl);
	
			onOffEvent(_nodes.colorPicker, 'paste', function (e) {
				e.target.firstChild.data = e.clipboardData.getData('Text');
				return preventDefault(e);
			});
		}
	
		addEvent(_isIE ? document.body : window, 'mouseup', stopChange);
	
		// ------------------------------------------------------ //
		// --------- Event listner's callback functions  -------- //
		// -------------------------------------------------------//
	
		function stopChange(e, action) {
			var mouseMoveAction = _mouseMoveAction;
	
			if (_mouseMoveAction) {
				// why??? please test again...
				// if (document.selection && _mouseMoveAction !== changeInputValue) {
				// 	//ie -> prevent showing the accelerator menu
				// 	document.selection.empty();
				// }
				window[cancelAnimationFrame](_renderTimer);
				removeEvent(_isIE ? document.body : window, 'mousemove', _mouseMoveAction);
				if (_delayState) {
					// hapens on inputs
					_valueType = { type: 'alpha' };
					renderAll();
				}
				// this is dirty... has to do with M|W|! button
				if (typeof _mouseMoveAction === 'function' || typeof _mouseMoveAction === 'number') {
					delete _options.webUnsave;
				}
	
				_delayState = 1;
				_mouseMoveAction = undefined;
	
				changeClass(_nodes.slds, 'do-drag', '');
				changeClass(_nodes.panel, '(?:start-change|do-change)', '');
	
				_nodes.resizer.style.cssText = '';
				_nodes.panelCover.style.cssText = '';
	
				_nodes.memo_store.style.cssText = 'background-color: ' + color2string(_colors.RND.rgb) + '; ' + getOpacityCSS(_colors.alpha);
				_nodes.memo.className = _nodes.memo.className.replace(/\s+(?:dark|light)/, '') + (
				// (/dark/.test(_nodes.colorPicker.className) ? ' dark' : ' light');
				_colors['rgbaMix' + _bgTypes[_options.alphaBG]].luminance < 0.22 ? ' dark' : ' light');
				// (_colors.rgbaMixCustom.luminance < 0.22 ? ' dark' : ' light')
	
				_valueType = undefined;
	
				resetCursors();
	
				if (_options.actionCallback) {
					_options.actionCallback(e, _action || mouseMoveAction.name || action || 'external');
				}
			}
		}
	
		function changeXYValue(e) {
			var event = e || window.event,
			    scale = _options.scale,
			    page = getPageXY(event),
			    x = (page.X - _targetOrigin.left) * (scale === 4 ? 2 : scale),
			    y = (page.Y - _targetOrigin.top) * scale,
			    mode = _options.mode;
	
			_colors[mode.type][mode.x] = limitValue(x / 255, 0, 1);
			_colors[mode.type][mode.y] = 1 - limitValue(y / 255, 0, 1);
			convertColors();
			return preventDefault(event);
		}
	
		function changeZValue(e) {
			// make this part of changeXYValue
			var event = e || window.event,
			    page = getPageXY(event),
			    z = (page.Y - _targetOrigin.top) * _options.scale,
			    mode = _options.mode;
	
			_colors[mode.type][mode.z] = 1 - limitValue(z / 255, 0, 1);
			convertColors();
			return preventDefault(event);
		}
	
		function changeOpacityValue(e) {
			var event = e || window.event,
			    page = getPageXY(event);
	
			_newData = true;
			_colors.alpha = limitValue(_math.round((page.X - _targetOrigin.left) / _targetOrigin.width * 100), 0, 100) / 100;
			convertColors('alpha');
			return preventDefault(event);
		}
	
		function changeInputValue(e) {
			var event = e || window.event,
			    page = getPageXY(event),
			    delta = _startCoords.pageY - page.Y,
			    delayOffset = _options.delayOffset,
			    type = _valueType.type,
			    isAlpha = type === 'alpha',
			    ranges;
	
			if (_delayState || _math.abs(delta) >= delayOffset) {
				if (!_delayState) {
					_delayState = (delta > 0 ? -delayOffset : delayOffset) + +_mainTarget.firstChild.data * (isAlpha ? 100 : 1);
					_startCoords.pageY += _delayState;
					delta += _delayState;
					_delayState = 1;
					changeClass(_nodes.panel, 'start-change', 'do-change');
					_nodes.panelCover.style.cssText = 'position:absolute;left:0;top:0;right:0;bottom:0';
					// window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
					document.activeElement.blur();
					_renderTimer = window[requestAnimationFrame](renderAll);
				}
	
				if (type === 'cmyk' && _options.cmyOnly) {
					type = 'cmy';
				}
	
				if (isAlpha) {
					_newData = true;
					_colors.alpha = limitValue(delta / 100, 0, 1);
				} else {
					ranges = _valueRanges[type][_valueType.z];
					_colors[type][_valueType.z] = type === 'Lab' ? limitValue(delta, ranges[0], ranges[1]) : limitValue(delta / ranges[1], 0, 1);
				}
				convertColors(isAlpha ? 'alpha' : type);
				// event.returnValue is deprecated. Please use the standard event.preventDefault() instead.
				// event.returnValue = false; // see: pauseEvent(event);
				return preventDefault(event);
			}
		}
	
		function keyControl(e) {
			// this is quite big for what it does...
			var event = e || window.event,
			    keyCode = event.which || event.keyCode,
			    key = String.fromCharCode(keyCode),
			    elm = document.activeElement,
			    cln = elm.className.replace(_options.CSSPrefix, '').split('-'),
			    type = cln[0],
			    mode = cln[1],
			    isAlpha = type === 'alpha',
			    isHex = type === 'HEX',
			    arrowKey = { k40: -1, k38: 1, k34: -10, k33: 10 }['k' + keyCode] / (isAlpha ? 100 : 1),
			    validKeys = { 'HEX': /[0-9a-fA-F]/, 'Lab': /[\-0-9]/, 'alpha': /[\.0-9]/ }[type] || /[0-9]/,
			    valueRange = _valueRanges[type][type] || _valueRanges[type][mode],
			    // let op!
	
			textNode = elm.firstChild,
			    // chnge on TAB key
			rangeData = caret(elm),
			    origValue = textNode.data,
			    // do not change
			value,
			    val = origValue === '0' && !isHex ? [] : origValue.split(''); // gefixt
	
			if (/^(?:27|13)$/.test(keyCode)) {
				// ENTER || ESC
				preventDefault(event);
				elm.blur();
			} else if (event.type === 'keydown') {
				// functional keys
				if (arrowKey) {
					// arrow/page keys
					value = limitValue(_math.round((+origValue + arrowKey) * 1e+6) / 1e+6, valueRange[0], valueRange[1]);
				} else if (/^(?:8|46)$/.test(keyCode)) {
					// DELETE / BACKSPACE
					if (!rangeData.range) {
						rangeData.range++;
						rangeData.start -= keyCode === 8 ? 1 : 0;
					}
					val.splice(rangeData.start, rangeData.range);
					value = val.join('') || '0'; // never loose elm.firstChild
				}
	
				if (value !== undefined) {
					// prevent keypress
					preventDefault(event, true);
				}
			} else if (event.type === 'keypress') {
				if (!/^(?:37|39|8|46|9)$/.test(keyCode)) {
					// left, right,DEL, BACK, TAB for FF
					preventDefault(event, true);
				}
				if (validKeys.test(key)) {
					// regular input
					val.splice(rangeData.start, rangeData.range, key);
					value = val.join('');
				}
				rangeData.start++;
			}
	
			if (keyCode === 13 && isHex) {
				if (textNode.data.length % 3 === 0 || textNode.data === '0') {
					// textNode.data.length &&
					return _colorPicker.setColor(textNode.data === '0' ? '000' : textNode.data, 'rgb', _colors.alpha, true);
				} else {
					preventDefault(event, true);
					return elm.focus();
				}
			}
	
			if (isHex && value !== undefined) {
				value = /^0+/.test(value) ? value : parseInt('' + value, 16) || 0;
			}
	
			if (value !== undefined && value !== '' && +value >= valueRange[0] && +value <= valueRange[1]) {
				if (isHex) {
					value = value.toString(16).toUpperCase() || '0';
				}
				if (isAlpha) {
					_colors[type] = +value;
				} else if (!isHex) {
					_colors[type][mode] = +value / (type === 'Lab' ? 1 : valueRange[1]);
				}
				convertColors(isAlpha ? 'alpha' : type);
	
				preRenderAll(_colors);
				_mouseMoveAction = true;
				stopChange(e, event.type);
	
				textNode.data = value; // if
				caret(elm, _math.min(elm.firstChild.data.length, rangeData.start < 0 ? 0 : rangeData.start));
			}
		}
	
		function buttonActions(e) {
			var event = e || window.event,
			    target = event.target || event.srcElement,
			    targetClass = target.className,
			    parent = target.parentNode,
			    options = _options,
			    RGB = _colors.RND.rgb,
			    customBG,
			    alphaBG,
			    mode = _options.mode,
			    newMode = '',
			    prefix = options.CSSPrefix,
			    isModeButton = /(?:hs|rgb)/.test(parent.className) && /^[HSBLRG]$/.test(target.firstChild ? target.firstChild.data : ''),
			    isDblClick = /dblc/.test(event.type),
			    buttonAction = ''; // think this over again....
	
			if (isDblClick && !isModeButton) {
				return;
			} else if (targetClass.indexOf('-labl ' + prefix + 'labl') !== -1) {
				// HSB -> HSL; CMYK -> Lab buttons
				changeClass(_nodes[targetClass.split('-')[0]], prefix + 'hide', '');
				changeClass(_nodes[parent.className.split('-')[1]], prefix + 'hide');
			} else if (targetClass.indexOf(prefix + 'butt') !== -1) {
				// BUTTONS
				if (isModeButton) {
					// set render modes
					if (isDblClick && _options.scale === 2) {
						newMode = /hs/.test(mode.type) ? 'rgb' : /hide/.test(_nodes.hsl.className) ? 'hsv' : 'hsl';
						newMode = newMode + '-' + newMode[mode.type.indexOf(mode.z)];
					}
					_colorPicker.setMode(newMode ? newMode : targetClass.replace('-butt', '').split(' ')[0]);
					buttonAction = 'modeChange';
				} else if (/^[rgb]/.test(targetClass)) {
					// no vertical slider rendering in RGB mode
					newMode = targetClass.split('-')[1];
					changeClass(_nodes.colorPicker, 'no-rgb-' + newMode, (options['noRGB' + newMode] = !options['noRGB' + newMode]) ? undefined : '');
					buttonAction = 'noRGB' + newMode;
					// preRenderAll();
				} else if (target === _nodes.alpha_labl) {
						// alpha button right (background of raster)
						customBG = options.customBG;
						alphaBG = options.alphaBG;
						changeClass(_nodes.colorPicker, 'alpha-bg-' + alphaBG, 'alpha-bg-' + (alphaBG = options.alphaBG = e.data || (alphaBG === 'w' ? customBG ? 'c' : 'b' : alphaBG === 'c' ? 'b' : 'w')));
						target.firstChild.data = alphaBG.toUpperCase();
						_nodes.ctrl.style.backgroundColor = _nodes.memo.style.backgroundColor = alphaBG !== 'c' ? '' : 'rgb(' + _math.round(customBG.r * 255) + ', ' + _math.round(customBG.g * 255) + ', ' + _math.round(customBG.b * 255) + ')';
						_nodes.raster.style.cssText = _nodes.raster_bg.previousSibling.style.cssText = alphaBG !== 'c' ? '' : getOpacityCSS(customBG.luminance < 0.22 ? 0.5 : 0.4);
						buttonAction = 'alphaBackground';
					} else if (target === _nodes.alpha_butt) {
						// alpha button left (disable alpha rendering)
						changeClass(_nodes.colorPicker, 'mute-alpha', (options.muteAlpha = !options.muteAlpha) ? undefined : '');
						buttonAction = 'alphaState';
					} else if (target === _nodes.HEX_butt) {
						// make it on/off
						changeClass(_nodes.colorPicker, 'no-HEX', (options.HEXState = !options.HEXState) ? undefined : '');
						buttonAction = 'HEXState';
					} else if (target === _nodes.HEX_labl) {
						// web save state change
						var isWebSave = _colors.saveColor === 'web save';
	
						if (_colors.saveColor !== 'web smart' && !isWebSave) {
							options.webUnsave = copyColor(RGB);
							_colorPicker.setColor(_colors.webSmart, 'rgb');
						} else if (!isWebSave) {
							if (!options.webUnsave) {
								options.webUnsave = copyColor(RGB);
							}
							_colorPicker.setColor(_colors.webSave, 'rgb');
						} else {
							_colorPicker.setColor(options.webUnsave, 'rgb');
						}
						buttonAction = 'webColorState';
					} else if (/Lab-x-labl/.test(targetClass)) {
						//target === _nodes.cmyk_type) {
						// switch between CMYK and CMY
						changeClass(_nodes.colorPicker, 'cmy-only', (options.cmyOnly = !options.cmyOnly) ? undefined : '');
						buttonAction = 'cmykState';
					}
			} else if (target === _nodes.bsav) {
				// SAVE
				saveAsBackground();
				buttonAction = 'saveAsBackground';
			} else if (target === _nodes.bres) {
				// RESET
				var tmpColor = copyColor(RGB),
				    tmpAlpha = _colors.alpha;
	
				// a bit heavy but... doesn't matter here
				// newCol, type, alpha, forceRender
				_colorPicker.setColor(options.color);
				saveAsBackground();
				_colorPicker.setColor(tmpColor, 'rgb', tmpAlpha);
				buttonAction = 'resetColor';
			} else if (parent === _nodes.col1) {
				// COLOR left
				// _colors.hsv.h = (_colors.hsv.h + 0.5) % 1; // not acurate
				_colors.hsv.h -= _colors.hsv.h > 0.5 ? 0.5 : -0.5;
				convertColors('hsv');
				buttonAction = 'shiftColor';
			} else if (parent === _nodes.col2) {
				// COLOR right
				_colorPicker.setColor(target.style.backgroundColor, 'rgb', _colors.background.alpha);
				buttonAction = 'setSavedColor';
			} else if (parent === _nodes.memo) {
				// MEMORIES // revisit...
				var resetBlink = function resetBlink() {
					if (_nodes.memos.blinker) _nodes.memos.blinker.style.cssText = _nodes.memos.cssText;
				},
				    doBlink = function doBlink(elm) {
					_nodes.memos.blinker = elm;
					elm.style.cssText = 'background-color:' + (_colors.RGBLuminance > 0.22 ? '#333' : '#DDD');
					window.setTimeout(resetBlink, 200);
				};
	
				if (target === _nodes.memo_cursor) {
					// save color in memo
					resetBlink();
					_nodes.memos.blinker = undefined;
					_nodes.testNode.style.cssText = _nodes.memo_store.style.cssText;
					_nodes.memos.cssText = _nodes.testNode.style.cssText; // ...how browser sees css
					for (var n = _nodes.memos.length - 1; n--;) {
						// check if color already exists
						if (_nodes.memos.cssText === _nodes.memos[n].style.cssText) {
							doBlink(_nodes.memos[n]); // sets _nodes.memos.blinker
							break;
						}
					}
					if (!_nodes.memos.blinker) {
						// right shift colors
						for (var n = _nodes.memos.length - 1; n--;) {
							_nodes.memos[n + 1].style.cssText = _nodes.memos[n].style.cssText;
						}
						_nodes.memos[0].style.cssText = _nodes.memo_store.style.cssText;
					}
					buttonAction = 'toMemory';
				} else {
					// reset color from memo
					resetBlink();
					_colorPicker.setColor(target.style.backgroundColor, 'rgb', target.style.opacity || 1);
					_nodes.memos.cssText = target.style.cssText;
					doBlink(target);
					// this is dirty... has to do with M|W|! button
					_mouseMoveAction = 1;
					buttonAction = 'fromMemory';
				}
			}
			// think this over again, does this need to be like this??
			if (buttonAction) {
				preRenderAll(_colors);
				_mouseMoveAction = _mouseMoveAction || true; // !!!! search for: // this is dirty...
				stopChange(e, buttonAction);
			}
		}
	
		function resizeApp(e, size) {
			var event = e || window.event,
			    page = event ? getPageXY(event) : {},
			    isSize = size !== undefined,
			    x = isSize ? size : page.X - _targetOrigin.left + 8,
			    y = isSize ? size : page.Y - _targetOrigin.top + 8,
			    values = [' S XS XXS', ' S XS', ' S', ''],
			    sizes = _options.sizes,
			    // from getUISizes();
			currentSize = isSize ? size : y < sizes.XXS[1] + 25 ? 0 : x < sizes.XS[0] + 25 ? 1 : x < sizes.S[0] + 25 || y < sizes.S[1] + 25 ? 2 : 3,
			    value = values[currentSize],
			    isXXS = false,
			    mode,
			    tmp = '';
	
			if (_cashedVars.resizer !== value) {
				isXXS = /XX/.test(value);
				mode = _options.mode;
	
				if (isXXS && (!/hs/.test(mode.type) || mode.z === 'h')) {
					tmp = mode.type + '-' + mode.z;
					_colorPicker.setMode(/hs/.test(mode.type) ? mode.type + '-s' : 'hsv-s');
					_options.mode.original = tmp;
				} else if (mode.original) {
					// setMode(mode) creates a new object so mode.original gets deleted automatically
					_colorPicker.setMode(mode.original);
				}
	
				_nodes.colorPicker.className = _nodes.colorPicker.className.replace(/\s+(?:S|XS|XXS)/g, '') + value;
				_options.scale = isXXS ? 4 : /S/.test(value) ? 2 : 1;
				_options.currentSize = currentSize;
	
				_cashedVars.resizer = value;
	
				// fix this... from this point on inside if() ... convertColors();
				_newData = true;
				renderAll();
				resetCursors();
			}
	
			_nodes.resizer.style.cssText = 'display: block;' + 'width: ' + (x > 10 ? x : 10) + 'px;' + 'height: ' + (y > 10 ? y : 10) + 'px;';
		}
	
		// ------------------------------------------------------ //
		// --- Colors calculation and rendering related stuff  --- //
		// -------------------------------------------------------//
	
		function setMode(mode) {
			var ModeMatrix = {
				rgb_r: { x: 'b', y: 'g' },
				rgb_g: { x: 'b', y: 'r' },
				rgb_b: { x: 'r', y: 'g' },
	
				hsv_h: { x: 's', y: 'v' },
				hsv_s: { x: 'h', y: 'v' },
				hsv_v: { x: 'h', y: 's' },
	
				hsl_h: { x: 's', y: 'l' },
				hsl_s: { x: 'h', y: 'l' },
				hsl_l: { x: 'h', y: 's' }
			},
			    key = mode.replace('-', '_'),
			    regex = '\\b(?:rg|hs)\\w\\-\\w\\b'; // \\b\\w{3}\\-\\w\\b';
	
			// changeClass(_nodes.colorPicker, '(?:.*?)$', mode);
			// changeClass(_nodes.colorPicker, '\\b\\w{3}\\-\\w\\b', mode);
			// changeClass(_nodes.slds, '\\b\\w{3}\\-\\w\\b', mode);
			changeClass(_nodes.panel, regex, mode);
			changeClass(_nodes.slds, regex, mode);
	
			mode = mode.split('-');
			return _options.mode = {
				type: mode[0],
				x: ModeMatrix[key].x,
				y: ModeMatrix[key].y,
				z: mode[1]
			};
		}
	
		function initSliders() {
			// function name...
			var regex = /\s+(?:hue-)*(?:dark|light)/g,
			    className = 'className'; // minification
	
			_nodes.curl[className] = _nodes.curl[className].replace(regex, ''); // .....
			_nodes.curr[className] = _nodes.curr[className].replace(regex, ''); // .....
			_nodes.slds[className] = _nodes.slds[className].replace(regex, '');
			// var sldrs = ['sldr_2', 'sldr_4', 'sldl_3'];
			// for (var n = sldrs.length; n--; ) {
			// 	_nodes[sldrs[n]][className] = _options.CSSPrefix + sldrs[n].replace('_', '-');
			// }
			_nodes.sldr_2[className] = _options.CSSPrefix + 'sldr-2';
			_nodes.sldr_4[className] = _options.CSSPrefix + 'sldr-4';
			_nodes.sldl_3[className] = _options.CSSPrefix + 'sldl-3';
	
			for (var style in _nodes.styles) {
				if (!style.indexOf('sld')) _nodes.styles[style].cssText = '';
			}
			_cashedVars = {};
		}
	
		function resetCursors() {
			// _renderVars.isNoRGB = undefined;
			_nodes.styles.curr.cssText = _nodes.styles.curl.cssText; // only coordinates
			_nodes.curl.className = _options.CSSPrefix + 'curl' + (_renderVars.noRGBZ ? ' ' + _options.CSSPrefix + 'curl-' + _renderVars.noRGBZ : '');
			_nodes.curr.className = _options.CSSPrefix + 'curr ' + _options.CSSPrefix + 'curr-' + (_options.mode.z === 'h' ? _renderVars.HUEContrast : _renderVars.noRGBZ ? _renderVars.noRGBZ : _renderVars.RGBLuminance);
		}
	
		function convertColors(type) {
			preRenderAll(_colorInstance.setColor(undefined, type || _options.mode.type));
			_newData = true;
		}
	
		function saveAsBackground(refresh) {
			_colorInstance.saveAsBackground();
			_nodes.styles.col2.cssText = 'background-color: ' + color2string(_colors.background.RGB) + ';' + getOpacityCSS(_colors.background.alpha);
	
			if (refresh) {
				preRenderAll(_colors);
				// renderAll();
			}
			return _colors;
		}
	
		function preRenderAll(colors) {
			var _Math = _math,
			    renderVars = _renderVars,
			    bgType = _bgTypes[_options.alphaBG];
	
			renderVars.hueDelta = _Math.round(colors['rgbaMixBGMix' + bgType].hueDelta * 100);
			// renderVars.RGBLuminanceDelta = _Math.round(colors.RGBLuminanceDelta * 100);
			renderVars.luminanceDelta = _Math.round(colors['rgbaMixBGMix' + bgType].luminanceDelta * 100);
			renderVars.RGBLuminance = colors.RGBLuminance > 0.22 ? 'light' : 'dark';
			renderVars.HUEContrast = colors.HUELuminance > 0.22 ? 'light' : 'dark';
			// renderVars.contrast = renderVars.RGBLuminanceDelta > renderVars.hueDelta ? 'contrast' : '';
			renderVars.contrast = renderVars.luminanceDelta > renderVars.hueDelta ? 'contrast' : '';
			renderVars.readabiltiy = colors['rgbaMixBGMix' + bgType].WCAG2Ratio >= 7 ? 'green' : colors['rgbaMixBGMix' + bgType].WCAG2Ratio >= 4.5 ? 'orange' : '';
			renderVars.noRGBZ = _options['no' + _options.mode.type.toUpperCase() + _options.mode.z] ? _options.mode.z === 'g' && colors.rgb.g < 0.59 || _options.mode.z === 'b' || _options.mode.z === 'r' ? 'dark' : 'light' : undefined;
		}
	
		function renderAll() {
			// maybe render alpha seperately...
			if (_mouseMoveAction) {
				// _renderTimer = window[requestAnimationFrame](renderAll);
				if (!_newData) return _renderTimer = window[requestAnimationFrame](renderAll);
				_newData = false;
			}
			// console.time('renderAll');
			var options = _options,
			    mode = options.mode,
			    scale = options.scale,
			    prefix = options.CSSPrefix,
			    colors = _colors,
			    nodes = _nodes,
			    CSS = nodes.styles,
			    textNodes = nodes.textNodes,
			    valueRanges = _valueRanges,
			    valueType = _valueType,
			    renderVars = _renderVars,
			    cashedVars = _cashedVars,
			    _Math = _math,
			    _getOpacityCSS = getOpacityCSS,
			    _color2string = color2string,
			    a = 0,
			    b = 0,
			    x = colors[mode.type][mode.x],
			    X = _Math.round(x * 255 / (scale === 4 ? 2 : scale)),
			    y_ = colors[mode.type][mode.y],
			    y = 1 - y_,
			    Y = _Math.round(y * 255 / scale),
			    z = 1 - colors[mode.type][mode.z],
			    Z = _Math.round(z * 255 / scale),
			    coords =  true ? [x, y_] : [0, 0],
			    // (1 === 2) button label up
	
			isRGB = mode.type === 'rgb',
			    isHue = mode.z === 'h',
			    isHSL = mode.type === 'hsl',
			    isHSL_S = isHSL && mode.z === 's',
			    moveXY = _mouseMoveAction === changeXYValue,
			    moveZ = _mouseMoveAction === changeZValue,
			    display,
			    tmp,
			    value,
			    slider;
	
			if (isRGB) {
				if (coords[0] >= coords[1]) b = 1;else a = 1;
				if (cashedVars.sliderSwap !== a) {
					nodes.sldr_2.className = options.CSSPrefix + 'sldr-' + (3 - a);
					cashedVars.sliderSwap = a;
				}
			}
			if (isRGB && !moveZ || isHue && !moveXY || !isHue && !moveZ) {
				CSS[isHue ? 'sldl_2' : 'sldr_2'][isRGB ? 'cssText' : 'backgroundColor'] = isRGB ? _getOpacityCSS((coords[a] - coords[b]) / (1 - coords[b] || 0)) : _color2string(colors.hueRGB);
			}
			if (!isHue) {
				if (!moveZ) CSS.sldr_4.cssText = _getOpacityCSS(isRGB ? coords[b] : isHSL_S ? _Math.abs(1 - y * 2) : y);
				if (!moveXY) CSS.sldl_3.cssText = _getOpacityCSS(isHSL && mode.z === 'l' ? _Math.abs(1 - z * 2) : z);
				if (isHSL) {
					// switch slider class name for black/white color half way through in HSL(S|L) mode(s)
					slider = isHSL_S ? 'sldr_4' : 'sldl_3';
					tmp = isHSL_S ? 'r-' : 'l-';
					value = isHSL_S ? y > 0.5 ? 4 : 3 : z > 0.5 ? 3 : 4;
	
					if (cashedVars[slider] !== value) {
						nodes[slider].className = options.CSSPrefix + 'sld' + tmp + value;
						cashedVars[slider] = value;
					}
				}
			}
	
			if (!moveZ) CSS.curm.cssText = 'left: ' + X + 'px; top: ' + Y + 'px;';
			if (!moveXY) CSS.curl.top = Z + 'px';
			if (valueType) CSS.curr.top = Z + 'px'; // && valueType.type !== mode.type
			if (valueType && valueType.type === 'alpha' || _mainTarget === nodes.opacity) {
				CSS.opacity_slider.left = options.opacityPositionRelative ? colors.alpha * ((_targetOrigin.width || nodes.opacity.offsetWidth) - (_targetOrigin.childWidth || nodes.opacity_slider.offsetWidth)) + 'px' : colors.alpha * 100 + '%';
			}
	
			CSS.col1.cssText = 'background-color: ' + _color2string(colors.RND.rgb) + '; ' + (options.muteAlpha ? '' : _getOpacityCSS(colors.alpha));
			CSS.opacity.backgroundColor = _color2string(colors.RND.rgb);
			CSS.cold.width = renderVars.hueDelta + '%';
			CSS.cont.width = renderVars.luminanceDelta + '%';
	
			for (display in textNodes) {
				tmp = display.split('_');
				if (options.cmyOnly) {
					tmp[0] = tmp[0].replace('k', '');
				}
				value = tmp[1] ? colors.RND[tmp[0]][tmp[1]] : colors.RND[tmp[0]] || colors[tmp[0]];
				if (cashedVars[display] !== value) {
					cashedVars[display] = value;
					textNodes[display].data = value > 359.5 && display !== 'HEX' ? 0 : value;
	
					if (display !== 'HEX' && !options.noRangeBackground) {
						value = colors[tmp[0]][tmp[1]] !== undefined ? colors[tmp[0]][tmp[1]] : colors[tmp[0]];
						if (tmp[0] === 'Lab') {
							value = (value - valueRanges[tmp[0]][tmp[1]][0]) / (valueRanges[tmp[0]][tmp[1]][1] - valueRanges[tmp[0]][tmp[1]][0]);
						}
						CSS[display].backgroundPosition = _Math.round((1 - value) * 100) + '% 0%';
					}
				}
			}
			// Lab out of gammut
			tmp = colors._rgb ? [colors._rgb.r !== colors.rgb.r, colors._rgb.g !== colors.rgb.g, colors._rgb.b !== colors.rgb.b] : [];
			if (tmp.join('') !== cashedVars.outOfGammut) {
				nodes.rgb_r_labl.firstChild.data = tmp[0] ? '!' : ' ';
				nodes.rgb_g_labl.firstChild.data = tmp[1] ? '!' : ' ';
				nodes.rgb_b_labl.firstChild.data = tmp[2] ? '!' : ' ';
				cashedVars.outOfGammut = tmp.join('');
			}
			if (renderVars.noRGBZ) {
				if (cashedVars.noRGBZ !== renderVars.noRGBZ) {
					nodes.curl.className = prefix + 'curl ' + prefix + 'curl-' + renderVars.noRGBZ;
	
					if (!moveZ) {
						nodes.curr.className = prefix + 'curr ' + prefix + 'curr-' + renderVars.noRGBZ;
					}
					cashedVars.noRGBZ = renderVars.noRGBZ;
				}
			}
			if (cashedVars.HUEContrast !== renderVars.HUEContrast && mode.z === 'h') {
				nodes.slds.className = nodes.slds.className.replace(/\s+hue-(?:dark|light)/, '') + ' hue-' + renderVars.HUEContrast;
				if (!moveZ) {
					nodes.curr.className = prefix + 'curr ' + prefix + 'curr-' + renderVars.HUEContrast;
				}
				cashedVars.HUEContrast = renderVars.HUEContrast;
			} else if (cashedVars.RGBLuminance !== renderVars.RGBLuminance) {
				// test for no else
				nodes.colorPicker.className = nodes.colorPicker.className.replace(/\s+(?:dark|light)/, '') + ' ' + renderVars.RGBLuminance;
				if (!moveZ && mode.z !== 'h' && !renderVars.noRGBZ) {
					nodes.curr.className = prefix + 'curr ' + prefix + 'curr-' + renderVars.RGBLuminance;
				}
				cashedVars.RGBLuminance = renderVars.RGBLuminance;
			}
	
			if (cashedVars.contrast !== renderVars.contrast || cashedVars.readabiltiy !== renderVars.readabiltiy) {
				nodes.ctrl.className = nodes.ctrl.className.replace(' contrast', '').replace(/\s*(?:orange|green)/, '') + (renderVars.contrast ? ' ' + renderVars.contrast : '') + (renderVars.readabiltiy ? ' ' + renderVars.readabiltiy : '');
				cashedVars.contrast = renderVars.contrast;
				cashedVars.readabiltiy = renderVars.readabiltiy;
			}
	
			if (cashedVars.saveColor !== colors.saveColor) {
				nodes.HEX_labl.firstChild.data = !colors.saveColor ? '!' : colors.saveColor === 'web save' ? 'W' : 'M';
				cashedVars.saveColor = colors.saveColor;
			}
	
			if (options.renderCallback) {
				options.renderCallback(colors, mode); // maybe more parameters
			}
	
			if (_mouseMoveAction) {
				_renderTimer = window[requestAnimationFrame](renderAll);
			}
	
			// console.timeEnd('renderAll')
		}
	
		// ------------------------------------------------------ //
		// ------------------ helper functions ------------------ //
		// -------------------------------------------------------//
	
		function copyColor(color) {
			var newColor = {};
	
			for (var n in color) {
				newColor[n] = color[n];
			}
			return newColor;
		}
	
		// function color2string(color, type) {
		// 	var out = [],
		// 		n = 0;
	
		// 	type = type || 'rgb';
		// 	while (type.charAt(n)) { // IE7 // V8 type[n] ||
		// 		out.push(color[type.charAt(n)]);
		// 		n++;
		// 	}
		// 	return type + '(' + out.join(', ') + ')';
		// }
	
		function color2string(color, type) {
			// ~2 x faster on V8
			var out = '',
			    t = (type || 'rgb').split(''),
			    n = t.length;
	
			for (; n--;) {
				out = ', ' + color[t[n]] + out;
			}
			return (type || 'rgb') + '(' + out.substr(2) + ')';
		}
	
		function limitValue(value, min, max) {
			// return Math.max(min, Math.min(max, value)); // faster??
			return value > max ? max : value < min ? min : value;
		}
	
		function getOpacityCSS(value) {
			if (value === undefined) value = 1;
	
			if (_doesOpacity) {
				return 'opacity: ' + _math.round(value * 10000000000) / 10000000000 + ';'; // value.toFixed(16) = 99% slower
				// some speed test:
				// return ['opacity: ', (Math.round(value * 1e+10) / 1e+10), ';'].join('');
			} else {
					return 'filter: alpha(opacity=' + _math.round(value * 100) + ');';
				}
		}
	
		function preventDefault(e, skip) {
			e.preventDefault ? e.preventDefault() : e.returnValue = false;
			if (!skip) window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
			return false;
		}
	
		function changeClass(elm, cln, newCln) {
			return !elm ? false : elm.className = newCln !== undefined ? elm.className.replace(new RegExp('\\s+?' + cln, 'g'), newCln ? ' ' + newCln : '') : elm.className + ' ' + cln;
		}
	
		function getOrigin(elm) {
			var box = elm.getBoundingClientRect ? elm.getBoundingClientRect() : { top: 0, left: 0 },
			    doc = elm && elm.ownerDocument,
			    body = doc.body,
			    win = doc.defaultView || doc.parentWindow || window,
			    docElem = doc.documentElement || body.parentNode,
			    clientTop = docElem.clientTop || body.clientTop || 0,
			    // border on html or body or both
			clientLeft = docElem.clientLeft || body.clientLeft || 0;
	
			return {
				left: box.left + (win.pageXOffset || docElem.scrollLeft) - clientLeft,
				top: box.top + (win.pageYOffset || docElem.scrollTop) - clientTop
			};
		}
	
		function getPageXY(e) {
			var doc = window.document;
	
			return {
				X: e.pageX || e.clientX + doc.body.scrollLeft + doc.documentElement.scrollLeft,
				Y: e.pageY || e.clientY + doc.body.scrollTop + doc.documentElement.scrollTop
			};
		}
	
		function addEvent(obj, type, func) {
			addEvent.cache = addEvent.cache || {
				_get: function _get(obj, type, func, checkOnly) {
					var cache = addEvent.cache[type] || [];
	
					for (var n = cache.length; n--;) {
						if (obj === cache[n].obj && '' + func === '' + cache[n].func) {
							func = cache[n].func;
							if (!checkOnly) {
								cache[n] = cache[n].obj = cache[n].func = null;
								cache.splice(n, 1);
							}
							return func;
						}
					}
				},
				_set: function _set(obj, type, func) {
					var cache = addEvent.cache[type] = addEvent.cache[type] || [];
	
					if (addEvent.cache._get(obj, type, func, true)) {
						return true;
					} else {
						cache.push({
							func: func,
							obj: obj
						});
					}
				}
			};
	
			if (!func.name && addEvent.cache._set(obj, type, func) || typeof func !== 'function') {
				return;
			}
	
			if (obj.addEventListener) obj.addEventListener(type, func, false);else obj.attachEvent('on' + type, func);
		}
	
		function removeEvent(obj, type, func) {
			if (typeof func !== 'function') return;
			if (!func.name) {
				func = addEvent.cache._get(obj, type, func) || func;
			}
	
			if (obj.removeEventListener) obj.removeEventListener(type, func, false);else obj.detachEvent('on' + type, func);
		}
	
		function caret(target, pos) {
			// only for contenteditable
			var out = {};
	
			if (pos === undefined) {
				// get
				if (window.getSelection) {
					// HTML5
					target.focus();
					var range1 = window.getSelection().getRangeAt(0),
					    range2 = range1.cloneRange();
					range2.selectNodeContents(target);
					range2.setEnd(range1.endContainer, range1.endOffset);
					out = {
						end: range2.toString().length,
						range: range1.toString().length
					};
				} else {
					// IE < 9
					target.focus();
					var range1 = document.selection.createRange(),
					    range2 = document.body.createTextRange();
					range2.moveToElementText(target);
					range2.setEndPoint('EndToEnd', range1);
					out = {
						end: range2.text.length,
						range: range1.text.length
					};
				}
				out.start = out.end - out.range;
				return out;
			}
			// set
			if (pos == -1) pos = target['text']().length;
	
			if (window.getSelection) {
				// HTML5
				target.focus();
				window.getSelection().collapse(target.firstChild, pos);
			} else {
				// IE < 9
				var range = document.body.createTextRange();
				range.moveToElementText(target);
				range.moveStart('character', pos);
				range.collapse(true);
				range.select();
			}
			return pos;
		}
	
		// ------------- requestAnimationFrame shim ------------- //
		// ---------- quite optimized for minification ---------- //
	
		for (var n = vendors.length; n-- && !window[requestAnimationFrame];) {
			window[requestAnimationFrame] = window[vendors[n] + 'Request' + animationFrame];
			window[cancelAnimationFrame] = window[vendors[n] + 'Cancel' + animationFrame] || window[vendors[n] + 'CancelRequest' + animationFrame];
		}
	
		window[requestAnimationFrame] = window[requestAnimationFrame] || function (callback) {
			// this is good enough... and better than setTimeout
			return window.setTimeout(callback, 1000 / _options.fps);
			// return _renderTimer ? _renderTimer : window.setInterval(callback, 1000 / _options.fps);
		};
	
		window[cancelAnimationFrame] = window[cancelAnimationFrame] || function (id) {
			// console.log('OFF-', id + '-' + _renderTimer)
			window.clearTimeout(id);
			return _renderTimer = null;
		};
	})(window);

/***/ },
/* 321 */
/***/ function(module, exports) {

	'use strict';
	
	(function (window) {
	  window.jsColorPicker = function (selectors, config) {
	    var renderCallback = function renderCallback(colors, mode) {
	      var options = this,
	          input = options.input,
	          patch = options.patch,
	          RGB = colors.RND.rgb,
	          HSL = colors.RND.hsl,
	          AHEX = options.isIE8 ? (colors.alpha < 0.16 ? '0' : '') + Math.round(colors.alpha * 100).toString(16).toUpperCase() + colors.HEX : '',
	          RGBInnerText = RGB.r + ', ' + RGB.g + ', ' + RGB.b,
	          RGBAText = 'rgba(' + RGBInnerText + ', ' + colors.alpha + ')',
	          isAlpha = colors.alpha !== 1 && !options.isIE8,
	          colorMode = input.getAttribute('data-colorMode');
	
	      // patch.style.cssText =
	      //   'color:' + (colors.rgbaMixCustom.luminance > 0.22 ? '#222' : '#ddd') + ';' + // Black...???
	      //   'background-color:' + RGBAText + ';' +
	      //   'filter:' + (options.isIE8 ? 'progid:DXImageTransform.Microsoft.gradient(' + // IE<9
	      //   'startColorstr=#' + AHEX + ',' + 'endColorstr=#' + AHEX + ')' : '');
	      input.value = colorMode === 'HEX' && !isAlpha ? '#' + (options.isIE8 ? AHEX : colors.HEX) : colorMode === 'rgb' || colorMode === 'HEX' && isAlpha ? !isAlpha ? 'rgb(' + RGBInnerText + ')' : RGBAText : 'hsl' + (isAlpha ? 'a(' : '(') + HSL.h + ', ' + HSL.s + '%c, ' + HSL.l + '%' + (isAlpha ? ', ' + colors.alpha : '') + ')';
	
	      input.dispatchEvent(new Event('change')); //  for Vue's update
	
	      if (options.displayCallback) {
	        options.displayCallback(colors, mode, options);
	      }
	    },
	        extractValue = function extractValue(elm) {
	      return elm.value || elm.getAttribute('value') || elm.style.backgroundColor || '#FFFFFF';
	    },
	        actionCallback = function actionCallback(event, action) {
	      var options = this,
	          colorPicker = colorPickers.current;
	
	      if (action === 'toMemory') {
	        var memos = colorPicker.nodes.memos,
	            backgroundColor = '',
	            opacity = 0,
	            cookieTXT = [];
	
	        for (var n = 0, m = memos.length; n < m; n++) {
	          backgroundColor = memos[n].style.backgroundColor;
	          opacity = memos[n].style.opacity;
	          opacity = Math.round((opacity === '' ? 1 : opacity) * 100) / 100;
	          cookieTXT.push(backgroundColor.replace(/, /g, ',').replace('rgb(', 'rgba(').replace(')', ',' + opacity + ')'));
	        }
	        cookieTXT = '\'' + cookieTXT.join('\',\'') + '\'';
	        ColorPicker.docCookies('colorPickerMemos' + (options.noAlpha ? 'NoAlpha' : ''), cookieTXT);
	      } else if (action === 'resizeApp') {
	        ColorPicker.docCookies('colorPickerSize', colorPicker.color.options.currentSize);
	      } else if (action === 'modeChange') {
	        var mode = colorPicker.color.options.mode;
	
	        ColorPicker.docCookies('colorPickerMode', mode.type + '-' + mode.z);
	      }
	    },
	        createInstance = function createInstance(elm, config) {
	      var initConfig = {
	        klass: window.ColorPicker,
	        input: elm,
	        patch: elm,
	        isIE8: !!document.all && !document.addEventListener, // Opera???
	        // *** animationSpeed: 200,
	        // *** draggable: true,
	        margin: { left: -1, top: 2 },
	        customBG: '#FFFFFF',
	        // displayCallback: displayCallback,
	        /* --- regular colorPicker options from this point --- */
	        color: extractValue(elm),
	        initStyle: 'display: none',
	        mode: ColorPicker.docCookies('colorPickerMode') || 'hsv-h',
	        // memoryColors: (function(colors, config) {
	        // 	return config.noAlpha ?
	        // 		colors.replace(/\,\d*\.*\d*\)/g, ',1)') : colors;
	        // })($.docCookies('colorPickerMemos'), config || {}),
	        memoryColors: ColorPicker.docCookies('colorPickerMemos' + ((config || {}).noAlpha ? 'NoAlpha' : '')),
	        size: ColorPicker.docCookies('colorPickerSize') || 1,
	        renderCallback: renderCallback,
	        actionCallback: actionCallback
	      };
	
	      for (var n in config) {
	        initConfig[n] = config[n];
	      }
	      return new initConfig.klass(initConfig);
	    },
	        doEventListeners = function doEventListeners(elm, multiple, off) {
	      var onOff = off ? 'removeEventListener' : 'addEventListener',
	          focusListener = function focusListener(e) {
	        var input = this,
	            position = window.ColorPicker.getOrigin(input),
	            index = multiple ? Array.prototype.indexOf.call(elms, this) : 0,
	            colorPicker = colorPickers[index] || (colorPickers[index] = createInstance(this, config)),
	            options = colorPicker.color.options,
	            colorPickerUI = colorPicker.nodes.colorPicker;
	
	        options.color = extractValue(elm); // brings color to default on reset
	
	        if (position.top > window.innerHeight - 200) {
	          colorPickerUI.style.cssText = 'position: absolute;' + 'z-index: 1000;' + 'left:' + (position.left + options.margin.left) + 'px;' + 'bottom:' + (window.innerHeight - position.top - options.margin.top) + 'px;';
	        } else {
	          colorPickerUI.style.cssText = 'position: absolute;' + 'z-index: 1000;' + 'left:' + (position.left + options.margin.left) + 'px;' + 'top:' + (position.top + +input.offsetHeight + options.margin.top) + 'px;';
	        }
	
	        if (!multiple) {
	          options.input = elm;
	          options.patch = elm; // check again???
	          colorPicker.setColor(extractValue(elm), undefined, undefined, true);
	          colorPicker.saveAsBackground();
	        }
	        colorPickers.current = colorPickers[index];
	        (options.appendTo || document.body).appendChild(colorPickerUI);
	        setTimeout(function () {
	          // compensating late style on onload in colorPicker
	          colorPickerUI.style.display = 'block';
	        }, 0);
	      },
	          mousDownListener = function mousDownListener(e) {
	        var colorPicker = colorPickers.current,
	            colorPickerUI = colorPicker ? colorPicker.nodes.colorPicker : undefined,
	            animationSpeed = colorPicker ? colorPicker.color.options.animationSpeed : 0,
	            isColorPicker = colorPicker && function (elm) {
	          while (elm) {
	            if ((elm.className || '').indexOf('cp-app') !== -1) return elm;
	            elm = elm.parentNode;
	          }
	          return false;
	        }(e.target),
	            inputIndex = Array.prototype.indexOf.call(elms, e.target);
	
	        if (isColorPicker && Array.prototype.indexOf.call(colorPickers, isColorPicker)) {
	          if (e.target === colorPicker.nodes.exit) {
	            colorPickerUI.style.display = 'none';
	            document.activeElement.blur();
	          } else {
	            // ...
	          }
	        } else if (inputIndex !== -1) {
	            // ...
	          } else if (colorPickerUI) {
	              colorPickerUI.style.display = 'none';
	            }
	      };
	
	      elm[onOff]('focus', focusListener);
	
	      if (!colorPickers.evt || off) {
	        colorPickers.evt = true; // prevent new eventListener for window
	
	        window[onOff]('mousedown', mousDownListener);
	      }
	    },
	
	    // this is a way to prevent data binding on HTMLElements
	    colorPickers = window.jsColorPicker.colorPickers || [],
	        elms = document.querySelectorAll(selectors),
	        testColors = new window.Colors({ customBG: config.customBG, allMixDetails: true });
	
	    window.jsColorPicker.colorPickers = colorPickers;
	
	    for (var n = 0, m = elms.length; n < m; n++) {
	      var elm = elms[n];
	
	      if (config === 'destroy') {
	        doEventListeners(elm, config && config.multipleInstances, true);
	        if (colorPickers[n]) {
	          colorPickers[n].destroyAll();
	        }
	      } else {
	        var color = extractValue(elm);
	        var value = color.split('(');
	
	        testColors.setColor(color);
	        if (config && config.init) {
	          config.init(elm, testColors.colors);
	        }
	        elm.setAttribute('data-colorMode', value[1] ? value[0].substr(0, 3) : 'HEX');
	        doEventListeners(elm, config && config.multipleInstances, false);
	        if (config && config.readOnly) {
	          elm.readOnly = true;
	        }
	      }
	    }
	    ;
	
	    return window.jsColorPicker.colorPickers;
	  };
	
	  window.ColorPicker.docCookies = function (key, val, options) {
	    var encode = encodeURIComponent,
	        decode = decodeURIComponent,
	        cookies,
	        n,
	        tmp,
	        cache = {},
	        days;
	
	    if (val === undefined) {
	      // all about reading cookies
	      cookies = document.cookie.split(/;\s*/) || [];
	      for (n = cookies.length; n--;) {
	        tmp = cookies[n].split('=');
	        if (tmp[0]) cache[decode(tmp.shift())] = decode(tmp.join('=')); // there might be '='s in the value...
	      }
	
	      if (!key) return cache; // return Json for easy access to all cookies
	      else return cache[key]; // easy access to cookies from here
	    } else {
	        // write/delete cookie
	        options = options || {};
	
	        if (val === '' || options.expires < 0) {
	          // prepare deleteing the cookie
	          options.expires = -1;
	          // options.path = options.domain = options.secure = undefined; // to make shure the cookie gets deleted...
	        }
	
	        if (options.expires !== undefined) {
	          // prepare date if any
	          days = new Date();
	          days.setDate(days.getDate() + options.expires);
	        }
	
	        document.cookie = encode(key) + '=' + encode(val) + (days ? '; expires=' + days.toUTCString() : '') + (options.path ? '; path=' + options.path : '') + (options.domain ? '; domain=' + options.domain : '') + (options.secure ? '; secure' : '');
	      }
	  };
	})(window);

/***/ },
/* 322 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__webpack_require__(323)
	__vue_script__ = __webpack_require__(326)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src/vue/painter.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(371)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), true)
	  if (!hotAPI.compatible) return
	  var id = "/Users/greendou/Codemao/user-center/public/program/codemao-fabric/src/vue/painter.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 323 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(324);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(325)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js?sourceMap!./../../node_modules/vue-loader/lib/style-rewriter.js!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./painter.vue", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js?sourceMap!./../../node_modules/vue-loader/lib/style-rewriter.js!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./painter.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 324 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(302)();
	// imports
	
	
	// module
	exports.push([module.id, "\n.painter {\n    width: 100%;\n    height: 100%;\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: flex;\n\n    background-color: #fdb336;\n}\n\n.right-panel {\n    width: 80%;\n    height: 100%;\n    background-color: blueviolet;\n}\n\n.paint-panel {\n    width: 100%;\n    height: 95%;\n\n    display: -webkit-box;\n\n    display: -webkit-flex;\n\n    display: -ms-flexbox;\n\n    display: flex;\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n    -webkit-flex-direction: column;\n        -ms-flex-direction: column;\n            flex-direction: column;\n    -webkit-box-align: center;\n    -webkit-align-items: center;\n        -ms-flex-align: center;\n            align-items: center;\n    -webkit-box-pack: end;\n    -webkit-justify-content: flex-end;\n        -ms-flex-pack: end;\n            justify-content: flex-end;\n\n    background-color: #F8F8F8;\n}\n\n\n", "", {"version":3,"sources":["/./src/vue/painter.vue?4b26fd61"],"names":[],"mappings":";AAaA;IACA,YAAA;IACA,aAAA;IACA,qBAAA;IAAA,sBAAA;IAAA,qBAAA;IAAA,cAAA;;IAEA,0BAAA;CACA;;AAEA;IACA,WAAA;IACA,aAAA;IACA,6BAAA;CACA;;AAEA;IACA,YAAA;IACA,YAAA;;IAEA,qBAAA;;IAAA,sBAAA;;IAAA,qBAAA;;IAAA,cAAA;IACA,6BAAA;IAAA,8BAAA;IAAA,+BAAA;QAAA,2BAAA;YAAA,uBAAA;IACA,0BAAA;IAAA,4BAAA;QAAA,uBAAA;YAAA,oBAAA;IACA,sBAAA;IAAA,kCAAA;QAAA,mBAAA;YAAA,0BAAA;;IAEA,0BAAA;CACA","file":"painter.vue","sourcesContent":["<template>\n    <div class=\"painter\">\n        <painter-tools></painter-tools>\n        <div class=\"right-panel\">\n            <div class=\"paint-panel\">\n                <painter-canvas-wrapper></painter-canvas-wrapper>\n                <painter-object-panel></painter-object-panel>\n            </div>\n            <painter-control-panel></painter-control-panel>\n        </div>\n    </div>\n</template>\n<style>\n    .painter {\n        width: 100%;\n        height: 100%;\n        display: flex;\n\n        background-color: #fdb336;\n    }\n\n    .right-panel {\n        width: 80%;\n        height: 100%;\n        background-color: blueviolet;\n    }\n\n    .paint-panel {\n        width: 100%;\n        height: 95%;\n\n        display: flex;\n        flex-direction: column;\n        align-items: center;\n        justify-content: flex-end;\n\n        background-color: #F8F8F8;\n    }\n\n\n</style>\n<script src=\"../js/painter.js\"></script>"],"sourceRoot":"webpack://"}]);
	
	// exports


/***/ },
/* 325 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];
	
	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}
	
		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();
	
		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";
	
		var styles = listToStyles(list);
		addStylesToDom(styles, options);
	
		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}
	
	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}
	
	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}
	
	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}
	
	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}
	
	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}
	
	function addStyle(obj, options) {
		var styleElement, update, remove;
	
		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}
	
		update(obj);
	
		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}
	
	var replaceText = (function () {
		var textStore = [];
	
		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();
	
	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;
	
		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}
	
	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;
	
		if (media) {
			styleElement.setAttribute("media", media);
		}
	
		if (sourceMap) {
			// https://developer.chrome.com/devtools/docs/javascript-debugging
			// this makes source maps inside style tags work properly in Chrome
			css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */';
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}
	
		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}


/***/ },
/* 326 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _painterTools = __webpack_require__(327);
	
	var _painterTools2 = _interopRequireDefault(_painterTools);
	
	var _painterControlPanel = __webpack_require__(356);
	
	var _painterControlPanel2 = _interopRequireDefault(_painterControlPanel);
	
	var _painterCanvasWrapper = __webpack_require__(361);
	
	var _painterCanvasWrapper2 = _interopRequireDefault(_painterCanvasWrapper);
	
	var _painterObjectPanel = __webpack_require__(366);
	
	var _painterObjectPanel2 = _interopRequireDefault(_painterObjectPanel);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = {
	  components: {
	    painterTools: _painterTools2.default,
	    painterControlPanel: _painterControlPanel2.default,
	    painterCanvasWrapper: _painterCanvasWrapper2.default,
	    painterObjectPanel: _painterObjectPanel2.default
	  }
	};

/***/ },
/* 327 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__webpack_require__(328)
	__vue_script__ = __webpack_require__(330)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src/vue/painter-tools.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(355)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), true)
	  if (!hotAPI.compatible) return
	  var id = "/Users/greendou/Codemao/user-center/public/program/codemao-fabric/src/vue/painter-tools.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 328 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(329);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(325)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js?sourceMap!./../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-f535087c&scoped=true!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./painter-tools.vue", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js?sourceMap!./../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-f535087c&scoped=true!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./painter-tools.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 329 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(302)();
	// imports
	
	
	// module
	exports.push([module.id, "\n.painter-tools[_v-f535087c] {\n    width: 20%;\n    height: 100%;\n    background: #ECE7DD;\n\n    display: -webkit-box;\n\n    display: -webkit-flex;\n\n    display: -ms-flexbox;\n\n    display: flex;\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n    -webkit-flex-direction: column;\n        -ms-flex-direction: column;\n            flex-direction: column;\n}\n\n.painter-tools-tabs[_v-f535087c] {\n    width: 100%;\n    height: 6%;\n\n    display: -webkit-box;\n\n    display: -webkit-flex;\n\n    display: -ms-flexbox;\n\n    display: flex;\n    -webkit-box-align: start;\n    -webkit-align-items: flex-start;\n        -ms-flex-align: start;\n            align-items: flex-start;\n    -webkit-box-pack: center;\n    -webkit-justify-content: center;\n        -ms-flex-pack: center;\n            justify-content: center;\n}\n\n.painter-tools-container[_v-f535087c] {\n    width: 100%;\n    height: calc(94% - 6rem);\n}\n\n.painter-tools-buttons[_v-f535087c] {\n    width: 100%;\n    height: 6rem;\n}\n\n.painter-tools .tab-button[_v-f535087c] {\n    height: calc(85% - 0.3rem);\n    -webkit-box-flex: 1;\n    -webkit-flex-grow: 1;\n        -ms-flex-positive: 1;\n            flex-grow: 1;\n\n    position: relative;\n\n    display: -webkit-box;\n\n    display: -webkit-flex;\n\n    display: -ms-flexbox;\n\n    display: flex;\n    -webkit-box-align: center;\n    -webkit-align-items: center;\n        -ms-flex-align: center;\n            align-items: center;\n    -webkit-box-pack: center;\n    -webkit-justify-content: center;\n        -ms-flex-pack: center;\n            justify-content: center;\n    font-family: STHeitiTC-Light, serif;\n    font-size: 18px;\n    color: #FFFFFF;\n\n    margin-top: 0.3rem;\n\n    cursor: pointer;\n}\n\n.painter-tools .tab-button svg[_v-f535087c] {\n    display: none;\n    width: 100%;\n    position: absolute;\n    top: calc(100% - 0.1rem);\n    left: 0;\n}\n\n.painter-tools .tab-button.active[_v-f535087c]{\n    height: 85%;\n    margin-top:0;\n}\n\n.painter-tools .tab-button.active svg[_v-f535087c]{\n    display: block;\n}\n\n.painter-tools .tabs-painting[_v-f535087c] {\n    background: #F2524C;\n}\n\n.painter-tools .tabs-background[_v-f535087c] {\n    background: #EEB000;\n}\n\n.painter-tools .tabs-layers[_v-f535087c] {\n    background: #44BFD2;\n}\n", "", {"version":3,"sources":["/./src/vue/painter-tools.vue?96626378"],"names":[],"mappings":";AA4CA;IACA,WAAA;IACA,aAAA;IACA,oBAAA;;IAEA,qBAAA;;IAAA,sBAAA;;IAAA,qBAAA;;IAAA,cAAA;IACA,6BAAA;IAAA,8BAAA;IAAA,+BAAA;QAAA,2BAAA;YAAA,uBAAA;CACA;;AAEA;IACA,YAAA;IACA,WAAA;;IAEA,qBAAA;;IAAA,sBAAA;;IAAA,qBAAA;;IAAA,cAAA;IACA,yBAAA;IAAA,gCAAA;QAAA,sBAAA;YAAA,wBAAA;IACA,yBAAA;IAAA,gCAAA;QAAA,sBAAA;YAAA,wBAAA;CACA;;AAEA;IACA,YAAA;IACA,yBAAA;CACA;;AAEA;IACA,YAAA;IACA,aAAA;CACA;;AAEA;IACA,2BAAA;IACA,oBAAA;IAAA,qBAAA;QAAA,qBAAA;YAAA,aAAA;;IAEA,mBAAA;;IAEA,qBAAA;;IAAA,sBAAA;;IAAA,qBAAA;;IAAA,cAAA;IACA,0BAAA;IAAA,4BAAA;QAAA,uBAAA;YAAA,oBAAA;IACA,yBAAA;IAAA,gCAAA;QAAA,sBAAA;YAAA,wBAAA;IACA,oCAAA;IACA,gBAAA;IACA,eAAA;;IAEA,mBAAA;;IAEA,gBAAA;CACA;;AAEA;IACA,cAAA;IACA,YAAA;IACA,mBAAA;IACA,yBAAA;IACA,QAAA;CACA;;AAEA;IACA,YAAA;IACA,aAAA;CACA;;AAEA;IACA,eAAA;CACA;;AAEA;IACA,oBAAA;CACA;;AAEA;IACA,oBAAA;CACA;;AAEA;IACA,oBAAA;CACA","file":"painter-tools.vue","sourcesContent":["<template>\n    <div class=\"painter-tools\">\n        <div class=\"painter-tools-tabs\">\n            <div class=\"tab-button tabs-painting\" v-on:click=\"switchTool(0)\" v-bind:class=\"{'active':isCurrentTool(0)}\">\n                画图\n                <svg width=\"16px\" height=\"7px\" viewBox=\"49 48 16 7\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\"\n                     xmlns:xlink=\"http://www.w3.org/1999/xlink\">\n                    <polygon id=\"rect-tab-painting\" stroke=\"none\" fill=\"#F2524C\" fill-rule=\"evenodd\"\n                             transform=\"translate(57.000000, 51.500000) scale(1, -1) translate(-57.000000, -51.500000) \"\n                             points=\"57 48 65 55 49 55\"></polygon>\n                </svg>\n            </div>\n            <div class=\"tab-button tabs-background\" v-on:click=\"switchTool(1)\"\n                 v-bind:class=\"{'active':isCurrentTool(1)}\">\n                背景\n                <svg width=\"16px\" height=\"7px\" viewBox=\"49 48 16 7\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\"\n                     xmlns:xlink=\"http://www.w3.org/1999/xlink\">\n                    <polygon id=\"rect-tab-background\" stroke=\"none\" fill=\"#EEB000\" fill-rule=\"evenodd\"\n                             transform=\"translate(57.000000, 51.500000) scale(1, -1) translate(-57.000000, -51.500000) \"\n                             points=\"57 48 65 55 49 55\"></polygon>\n                </svg>\n            </div>\n            <div class=\"tab-button tabs-layers\" v-on:click=\"switchTool(2)\" v-bind:class=\"{'active':isCurrentTool(2)}\">\n                图层\n                <svg width=\"16px\" height=\"7px\" viewBox=\"49 48 16 7\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\"\n                     xmlns:xlink=\"http://www.w3.org/1999/xlink\">\n                    <polygon id=\"rect-tab-layers\" stroke=\"none\" fill=\"#44BFD2\" fill-rule=\"evenodd\"\n                             transform=\"translate(57.000000, 51.500000) scale(1, -1) translate(-57.000000, -51.500000) \"\n                             points=\"57 48 65 55 49 55\"></polygon>\n                </svg>\n            </div>\n        </div>\n        <div class=\"painter-tools-container\">\n            <!--<components :is=\"currentTool\"></components>-->\n            <painter-tools-painting v-show=\"isShowPanel('painter-tools-painting')\"></painter-tools-painting>\n            <painter-tools-background v-show=\"isShowPanel('painter-tools-background')\"></painter-tools-background>\n            <painter-tools-layers v-show=\"isShowPanel('painter-tools-layers')\"></painter-tools-layers>\n        </div>\n        <div class=\"painter-tools-buttons\">\n            <painter-tools-costume></painter-tools-costume>\n        </div>\n    </div>\n</template>\n<style scoped>\n    .painter-tools {\n        width: 20%;\n        height: 100%;\n        background: #ECE7DD;\n\n        display: flex;\n        flex-direction: column;\n    }\n\n    .painter-tools-tabs {\n        width: 100%;\n        height: 6%;\n\n        display: flex;\n        align-items: flex-start;\n        justify-content: center;\n    }\n\n    .painter-tools-container {\n        width: 100%;\n        height: calc(94% - 6rem);\n    }\n\n    .painter-tools-buttons {\n        width: 100%;\n        height: 6rem;\n    }\n\n    .painter-tools .tab-button {\n        height: calc(85% - 0.3rem);\n        flex-grow: 1;\n\n        position: relative;\n\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        font-family: STHeitiTC-Light, serif;\n        font-size: 18px;\n        color: #FFFFFF;\n\n        margin-top: 0.3rem;\n\n        cursor: pointer;\n    }\n\n    .painter-tools .tab-button svg {\n        display: none;\n        width: 100%;\n        position: absolute;\n        top: calc(100% - 0.1rem);\n        left: 0;\n    }\n\n    .painter-tools .tab-button.active{\n        height: 85%;\n        margin-top:0;\n    }\n\n    .painter-tools .tab-button.active svg{\n        display: block;\n    }\n\n    .painter-tools .tabs-painting {\n        background: #F2524C;\n    }\n\n    .painter-tools .tabs-background {\n        background: #EEB000;\n    }\n\n    .painter-tools .tabs-layers {\n        background: #44BFD2;\n    }\n</style>\n<script>\n    import painterToolsPainting from './painter-tools-painting.vue';\n    import painterToolsLayers from './painter-tools-layers.vue';\n    import painterToolsBackground from './painter-tools-background.vue';\n    import painterToolsCostume from './painter-tools-costume.vue';\n    export default {\n        props: ['canvas'],\n        components: {\n            painterToolsPainting,\n            painterToolsLayers,\n            painterToolsBackground,\n            painterToolsCostume,\n        },\n        data() {\n            return {\n                currentToolIndex: 0,\n                toolList: ['painting', 'background', 'layers'],\n            }\n        },\n        computed: {\n            currentTool() {\n                return `painter-tools-${this.toolList[this.currentToolIndex]}`;\n            },\n        },\n        methods: {\n            switchTool(index) {\n                let i = index;\n                if (i === undefined) {\n                    i = this.currentToolIndex + 1;\n                }\n                this.currentToolIndex = i % this.toolList.length;\n            },\n            isShowPanel(panel) {\n                return panel === this.currentTool;\n            },\n            isCurrentTool(index) {\n                return index === this.currentToolIndex;\n            }\n        }\n    }\n</script>"],"sourceRoot":"webpack://"}]);
	
	// exports


/***/ },
/* 330 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _painterToolsPainting = __webpack_require__(331);
	
	var _painterToolsPainting2 = _interopRequireDefault(_painterToolsPainting);
	
	var _painterToolsLayers = __webpack_require__(336);
	
	var _painterToolsLayers2 = _interopRequireDefault(_painterToolsLayers);
	
	var _painterToolsBackground = __webpack_require__(345);
	
	var _painterToolsBackground2 = _interopRequireDefault(_painterToolsBackground);
	
	var _painterToolsCostume = __webpack_require__(350);
	
	var _painterToolsCostume2 = _interopRequireDefault(_painterToolsCostume);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = {
	    props: ['canvas'],
	    components: {
	        painterToolsPainting: _painterToolsPainting2.default,
	        painterToolsLayers: _painterToolsLayers2.default,
	        painterToolsBackground: _painterToolsBackground2.default,
	        painterToolsCostume: _painterToolsCostume2.default
	    },
	    data: function data() {
	        return {
	            currentToolIndex: 0,
	            toolList: ['painting', 'background', 'layers']
	        };
	    },
	
	    computed: {
	        currentTool: function currentTool() {
	            return 'painter-tools-' + this.toolList[this.currentToolIndex];
	        }
	    },
	    methods: {
	        switchTool: function switchTool(index) {
	            var i = index;
	            if (i === undefined) {
	                i = this.currentToolIndex + 1;
	            }
	            this.currentToolIndex = i % this.toolList.length;
	        },
	        isShowPanel: function isShowPanel(panel) {
	            return panel === this.currentTool;
	        },
	        isCurrentTool: function isCurrentTool(index) {
	            return index === this.currentToolIndex;
	        }
	    }
	};

/***/ },
/* 331 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__webpack_require__(332)
	__vue_script__ = __webpack_require__(334)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src/vue/painter-tools-painting.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(335)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), true)
	  if (!hotAPI.compatible) return
	  var id = "/Users/greendou/Codemao/user-center/public/program/codemao-fabric/src/vue/painter-tools-painting.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 332 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(333);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(325)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js?sourceMap!./../../node_modules/vue-loader/lib/style-rewriter.js!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./painter-tools-painting.vue", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js?sourceMap!./../../node_modules/vue-loader/lib/style-rewriter.js!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./painter-tools-painting.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 333 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(302)();
	// imports
	
	
	// module
	exports.push([module.id, "\n.tools-painting {\n    width: 100%;\n    height: calc(100% - 2rem);\n\n    display: -webkit-box;\n\n    display: -webkit-flex;\n\n    display: -ms-flexbox;\n\n    display: flex;\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n    -webkit-flex-direction: column;\n        -ms-flex-direction: column;\n            flex-direction: column;\n    -webkit-box-align: center;\n    -webkit-align-items: center;\n        -ms-flex-align: center;\n            align-items: center;\n    -webkit-box-pack: start;\n    -webkit-justify-content: flex-start;\n        -ms-flex-pack: start;\n            justify-content: flex-start;\n\n    padding: 1rem 0;\n\n    background-color: #ECE7DD;\n}\n\n.tools-buttons-container {\n    width: 90%;\n    height: 2.8rem;\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-align: center;\n    -webkit-align-items: center;\n        -ms-flex-align: center;\n            align-items: center;\n    -webkit-box-pack: start;\n    -webkit-justify-content: flex-start;\n        -ms-flex-pack: start;\n            justify-content: flex-start;\n\n    margin: 2% 0;\n    border-radius: 8px;\n    background: #E2D7BE;;\n}\n\n.tools-button {\n    height: 2.5rem;\n    width: 2.5rem;\n\n    display: -webkit-box;\n\n    display: -webkit-flex;\n\n    display: -ms-flexbox;\n\n    display: flex;\n    -webkit-box-align: center;\n    -webkit-align-items: center;\n        -ms-flex-align: center;\n            align-items: center;\n    -webkit-box-pack: center;\n    -webkit-justify-content: center;\n        -ms-flex-pack: center;\n            justify-content: center;\n\n    margin: 0 0.1rem;\n\n    cursor: pointer;\n}\n\n.tools-button img {\n    max-height: 100%;\n    max-width: 100%;\n}\n\n.tools-button.active .button-img {\n    display: none;\n}\n\n.tools-button.active .button-img-on {\n    display: block;\n}\n\n.tools-button .button-img-on {\n    display: none;\n}\n\n.tools-slider-container {\n    width: 90%;\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-align: center;\n    -webkit-align-items: center;\n        -ms-flex-align: center;\n            align-items: center;\n    -webkit-box-pack: start;\n    -webkit-justify-content: flex-start;\n        -ms-flex-pack: start;\n            justify-content: flex-start;\n    margin: 0.5rem 0;\n\n    font-family: STHeitiTC-Medium, serif;\n    font-size: 18px;\n    color: #645542;\n}\n\n.tools-slider-container .tools-container-title {\n    margin-right: 8%;\n\n    font-family: STHeitiTC-Medium, serif;\n    font-size: 18px;\n    color: #645542;\n}\n\n.tools-slider-container input {\n    width: 40%;\n\n    margin: 0.1rem;\n    -webkit-box-flex: 1;\n    -webkit-flex-grow: 1;\n        -ms-flex-positive: 1;\n            flex-grow: 1;\n}\n\n.tools-slider-container span {\n    font-family: STHeitiTC-Medium, serif;\n    font-size: 18px;\n    color: #645542;\n}\n\n.tools-slider-container .number-input {\n    width: 2rem;\n\n    margin-left: 4%;\n\n    font-family: STHeitiTC-Medium, serif;\n    font-size: 14px;\n    color: #645542;\n}\n\n.input-plus {\n    margin-bottom: -3%;\n}\n\n.input-minus {\n    margin-bottom: -1%;\n}\n\n.tools-item {\n    width: 90%;\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-align: center;\n    -webkit-align-items: center;\n        -ms-flex-align: center;\n            align-items: center;\n\n    margin:0.5rem 0;\n}\n\n.item-title {\n    margin-right: 8%;\n\n    font-family: STHeitiTC-Medium, serif;\n    font-size: 18px;\n    color: #645542;\n}\n\n.tools-item input.color {\n    width: 60%;\n\n    background: #8B572A;\n    border: 4px solid #FFFFFF;\n    border: 2px solid #AA9278;\n    box-shadow: inset 0px -2px 0px 0px rgba(0, 0, 0, 0.30);\n    border-radius: 4px;\n\n    cursor: pointer;\n}\n\n.tools-item input:focus {\n    outline: none;\n}\n\n.tools-area {\n    width: calc(90% - 0.2rem);\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-pack: justify;\n    -webkit-justify-content: space-between;\n        -ms-flex-pack: justify;\n            justify-content: space-between;\n    -webkit-box-align: center;\n    -webkit-align-items: center;\n        -ms-flex-align: center;\n            align-items: center;\n    -webkit-flex-wrap: wrap;\n        -ms-flex-wrap: wrap;\n            flex-wrap: wrap;\n\n    margin: 0.5rem 0;\n    padding: 1rem 0.1rem;\n\n    background: #E1D6BE;\n    border-radius: 8px;\n}\n\n.tools-default-color {\n    height: 2rem;\n    width: 2rem;\n\n    margin: 0.2rem;\n\n    border: 1px solid rgba(0, 0, 0, 0.37);\n    border-radius: 1.1rem;\n    box-shadow: inset 0 1px 2px 0 rgba(0, 0, 0, 0.50);\n\n    cursor: pointer;\n}\n\n", "", {"version":3,"sources":["/./src/vue/painter-tools-painting.vue?01d0e826"],"names":[],"mappings":";AAwEA;IACA,YAAA;IACA,0BAAA;;IAEA,qBAAA;;IAAA,sBAAA;;IAAA,qBAAA;;IAAA,cAAA;IACA,6BAAA;IAAA,8BAAA;IAAA,+BAAA;QAAA,2BAAA;YAAA,uBAAA;IACA,0BAAA;IAAA,4BAAA;QAAA,uBAAA;YAAA,oBAAA;IACA,wBAAA;IAAA,oCAAA;QAAA,qBAAA;YAAA,4BAAA;;IAEA,gBAAA;;IAEA,0BAAA;CACA;;AAEA;IACA,WAAA;IACA,eAAA;IACA,qBAAA;IAAA,sBAAA;IAAA,qBAAA;IAAA,cAAA;IACA,0BAAA;IAAA,4BAAA;QAAA,uBAAA;YAAA,oBAAA;IACA,wBAAA;IAAA,oCAAA;QAAA,qBAAA;YAAA,4BAAA;;IAEA,aAAA;IAIA,mBAAA;IACA,oBAAA;CACA;;AAEA;IACA,eAAA;IACA,cAAA;;IAEA,qBAAA;;IAAA,sBAAA;;IAAA,qBAAA;;IAAA,cAAA;IACA,0BAAA;IAAA,4BAAA;QAAA,uBAAA;YAAA,oBAAA;IACA,yBAAA;IAAA,gCAAA;QAAA,sBAAA;YAAA,wBAAA;;IAEA,iBAAA;;IAEA,gBAAA;CACA;;AAEA;IACA,iBAAA;IACA,gBAAA;CACA;;AAEA;IACA,cAAA;CACA;;AAEA;IACA,eAAA;CACA;;AAEA;IACA,cAAA;CACA;;AAEA;IACA,WAAA;IACA,qBAAA;IAAA,sBAAA;IAAA,qBAAA;IAAA,cAAA;IACA,0BAAA;IAAA,4BAAA;QAAA,uBAAA;YAAA,oBAAA;IACA,wBAAA;IAAA,oCAAA;QAAA,qBAAA;YAAA,4BAAA;IACA,iBAAA;;IAEA,qCAAA;IACA,gBAAA;IACA,eAAA;CACA;;AAEA;IACA,iBAAA;;IAEA,qCAAA;IACA,gBAAA;IACA,eAAA;CACA;;AAEA;IACA,WAAA;;IAEA,eAAA;IACA,oBAAA;IAAA,qBAAA;QAAA,qBAAA;YAAA,aAAA;CACA;;AAEA;IACA,qCAAA;IACA,gBAAA;IACA,eAAA;CACA;;AAEA;IACA,YAAA;;IAEA,gBAAA;;IAEA,qCAAA;IACA,gBAAA;IACA,eAAA;CACA;;AAEA;IACA,mBAAA;CACA;;AAEA;IACA,mBAAA;CACA;;AAEA;IACA,WAAA;IACA,qBAAA;IAAA,sBAAA;IAAA,qBAAA;IAAA,cAAA;IACA,0BAAA;IAAA,4BAAA;QAAA,uBAAA;YAAA,oBAAA;;IAEA,gBAAA;CACA;;AAEA;IACA,iBAAA;;IAEA,qCAAA;IACA,gBAAA;IACA,eAAA;CACA;;AAEA;IACA,WAAA;;IAEA,oBAAA;IACA,0BAAA;IACA,0BAAA;IACA,uDAAA;IACA,mBAAA;;IAEA,gBAAA;CACA;;AAEA;IACA,cAAA;CACA;;AAEA;IACA,0BAAA;IACA,qBAAA;IAAA,sBAAA;IAAA,qBAAA;IAAA,cAAA;IACA,0BAAA;IAAA,uCAAA;QAAA,uBAAA;YAAA,+BAAA;IACA,0BAAA;IAAA,4BAAA;QAAA,uBAAA;YAAA,oBAAA;IACA,wBAAA;QAAA,oBAAA;YAAA,gBAAA;;IAEA,iBAAA;IACA,qBAAA;;IAEA,oBAAA;IACA,mBAAA;CACA;;AAEA;IACA,aAAA;IACA,YAAA;;IAEA,eAAA;;IAEA,sCAAA;IACA,sBAAA;IACA,kDAAA;;IAEA,gBAAA;CACA","file":"painter-tools-painting.vue","sourcesContent":["<template>\n    <div class=\"tools-painting\">\n        <div class=\"tools-buttons-container\">\n            <!--<span>笔触</span>-->\n            <div title=\"画笔\" class=\"tools-button tools-pencil\" v-on:click=\"selectBrush('pencil')\"\n                 v-bind:class=\"{'active': isCurrentTool('pencil')}\">\n                <img class=\"button-img\" src=\"//o44j7l4g3.qnssl.com/program/painter/pencil.png\" alt=\"笔\">\n                <img class=\"button-img-on\" src=\"//o44j7l4g3.qnssl.com/program/painter/pencil-on.png\" alt=\"笔\">\n            </div>\n            <div title=\"直线\" class=\"tools-button tools-line\" v-on:click=\"selectBrush('line')\"\n                 v-bind:class=\"{'active': isCurrentTool('line')}\">\n                <img class=\"button-img\" src=\"//o44j7l4g3.qnssl.com/program/painter/line.png\" alt=\"线\">\n                <img class=\"button-img-on\" src=\"//o44j7l4g3.qnssl.com/program/painter/line-on.png\" alt=\"线\">\n            </div>\n            <div title=\"矩形\" class=\"tools-button tools-rect\" v-on:click=\"selectBrush('rect')\"\n                 v-bind:class=\"{'active': isCurrentTool('rect')}\">\n                <img class=\"button-img\" src=\"//o44j7l4g3.qnssl.com/program/painter/rect.png\" alt=\"方\">\n                <img class=\"button-img-on\" src=\"//o44j7l4g3.qnssl.com/program/painter/rect-on.png\" alt=\"方\">\n            </div>\n            <div title=\"圆形\" class=\"tools-button tools-round\" v-on:click=\"selectBrush('round')\"\n                 v-bind:class=\"{'active': isCurrentTool('round')}\">\n                <img class=\"button-img\" src=\"//o44j7l4g3.qnssl.com/program/painter/round.png\" alt=\"圆\">\n                <img class=\"button-img-on\" src=\"//o44j7l4g3.qnssl.com/program/painter/round-on.png\" alt=\"圆\">\n            </div>\n        </div>\n        <div class=\"tools-buttons-container\">\n            <div title=\"橡皮\" class=\"tools-button tools-eraser\" v-on:click=\"selectBrush('eraser')\"\n                 v-bind:class=\"{'active': isCurrentTool('eraser')}\">\n                <img class=\"button-img\" src=\"//o44j7l4g3.qnssl.com/program/painter/eraser.png\" alt=\"橡\">\n                <img class=\"button-img-on\" src=\"//o44j7l4g3.qnssl.com/program/painter/eraser-on.png\" alt=\"橡\">\n            </div>\n            <div title=\"选择\" class=\"tools-button tools-select\" v-on:click=\"selectBrush()\"\n                 v-bind:class=\"{'active': isCurrentTool()}\">\n                <img class=\"button-img\" src=\"//o44j7l4g3.qnssl.com/program/painter/select.png\" alt=\"选\">\n                <img class=\"button-img-on\" src=\"//o44j7l4g3.qnssl.com/program/painter/select-on.png\" alt=\"选\">\n            </div>\n            <div title=\"文字\" class=\"tools-button tools-text\" v-on:click=\"addShape('text')\">\n                <img class=\"button-img\" src=\"//o44j7l4g3.qnssl.com/program/painter/text.png\" alt=\"字\">\n            </div>\n            <div title=\"旋转中心\" class=\"tools-button tools-select\" v-on:click=\"selectBrush('rotation')\"\n                 v-bind:class=\"{'active': isCurrentTool('rotation')}\">\n                <img class=\"button-img\" src=\"//o44j7l4g3.qnssl.com/program/painter/rotation.png\" alt=\"中\">\n                <img class=\"button-img-on\" src=\"//o44j7l4g3.qnssl.com/program/painter/rotation-on.png\" alt=\"中\">\n            </div>\n        </div>\n        <div class=\"tools-slider-container\">\n            <span class=\"tools-container-title\">粗细</span>\n            <span class=\"input-minus\">-</span>\n            <input title=\"粗细\" type=\"range\" value=\"7\" min=\"1\" max=\"100\" step=\"1\" v-model=\"curStrokeWidth\"/>\n            <span class=\"input-plus\">+</span>\n            <span class=\"number-input\" v-text=\"curStrokeWidth\"></span>\n        </div>\n        <div class=\"tools-slider-container\">\n            <span class=\"tools-container-title\">透明</span>\n            <span class=\"input-minus\">-</span>\n            <input title=\"透明度\" type=\"range\" value=\"1\" min=\"0\" max=\"1\" step=\"0.01\" v-model=\"curObjectOpacity\"/>\n            <span class=\"input-plus\">+</span>\n            <span class=\"number-input\" v-text=\"curObjectOpacity\"></span>\n        </div>\n        <div class=\"tools-item\">\n            <span class=\"item-title\">颜色</span>\n            <input title=\"颜色\" type=\"color\" class=\"color\" v-model=\"curColor\"\n                   v-bind:style=\"{backgroundColor: curColor, color: pickerTextColor}\"/>\n        </div>\n        <div class=\"tools-area\">\n            <div class=\"tools-default-color\" v-for=\"color in defaultColors\"\n                 v-bind:style=\"{backgroundColor: color}\" v-on:click=\"selectColor(color)\">\n            </div>\n        </div>\n    </div>\n</template>\n<style>\n    .tools-painting {\n        width: 100%;\n        height: calc(100% - 2rem);\n\n        display: flex;\n        flex-direction: column;\n        align-items: center;\n        justify-content: flex-start;\n\n        padding: 1rem 0;\n\n        background-color: #ECE7DD;\n    }\n\n    .tools-buttons-container {\n        width: 90%;\n        height: 2.8rem;\n        display: flex;\n        align-items: center;\n        justify-content: flex-start;\n\n        margin: 2% 0;\n\n        -webkit-border-radius: 8px;\n        -moz-border-radius: 8px;\n        border-radius: 8px;\n        background: #E2D7BE;;\n    }\n\n    .tools-button {\n        height: 2.5rem;\n        width: 2.5rem;\n\n        display: flex;\n        align-items: center;\n        justify-content: center;\n\n        margin: 0 0.1rem;\n\n        cursor: pointer;\n    }\n\n    .tools-button img {\n        max-height: 100%;\n        max-width: 100%;\n    }\n\n    .tools-button.active .button-img {\n        display: none;\n    }\n\n    .tools-button.active .button-img-on {\n        display: block;\n    }\n\n    .tools-button .button-img-on {\n        display: none;\n    }\n\n    .tools-slider-container {\n        width: 90%;\n        display: flex;\n        align-items: center;\n        justify-content: flex-start;\n        margin: 0.5rem 0;\n\n        font-family: STHeitiTC-Medium, serif;\n        font-size: 18px;\n        color: #645542;\n    }\n\n    .tools-slider-container .tools-container-title {\n        margin-right: 8%;\n\n        font-family: STHeitiTC-Medium, serif;\n        font-size: 18px;\n        color: #645542;\n    }\n\n    .tools-slider-container input {\n        width: 40%;\n\n        margin: 0.1rem;\n        flex-grow: 1;\n    }\n\n    .tools-slider-container span {\n        font-family: STHeitiTC-Medium, serif;\n        font-size: 18px;\n        color: #645542;\n    }\n\n    .tools-slider-container .number-input {\n        width: 2rem;\n\n        margin-left: 4%;\n\n        font-family: STHeitiTC-Medium, serif;\n        font-size: 14px;\n        color: #645542;\n    }\n\n    .input-plus {\n        margin-bottom: -3%;\n    }\n\n    .input-minus {\n        margin-bottom: -1%;\n    }\n\n    .tools-item {\n        width: 90%;\n        display: flex;\n        align-items: center;\n\n        margin:0.5rem 0;\n    }\n\n    .item-title {\n        margin-right: 8%;\n\n        font-family: STHeitiTC-Medium, serif;\n        font-size: 18px;\n        color: #645542;\n    }\n\n    .tools-item input.color {\n        width: 60%;\n\n        background: #8B572A;\n        border: 4px solid #FFFFFF;\n        border: 2px solid #AA9278;\n        box-shadow: inset 0px -2px 0px 0px rgba(0, 0, 0, 0.30);\n        border-radius: 4px;\n\n        cursor: pointer;\n    }\n\n    .tools-item input:focus {\n        outline: none;\n    }\n\n    .tools-area {\n        width: calc(90% - 0.2rem);\n        display: flex;\n        justify-content: space-between;\n        align-items: center;\n        flex-wrap: wrap;\n\n        margin: 0.5rem 0;\n        padding: 1rem 0.1rem;\n\n        background: #E1D6BE;\n        border-radius: 8px;\n    }\n\n    .tools-default-color {\n        height: 2rem;\n        width: 2rem;\n\n        margin: 0.2rem;\n\n        border: 1px solid rgba(0, 0, 0, 0.37);\n        border-radius: 1.1rem;\n        box-shadow: inset 0 1px 2px 0 rgba(0, 0, 0, 0.50);\n\n        cursor: pointer;\n    }\n\n</style>\n<script src=\"../js/painter-tools-painting.js\"></script>"],"sourceRoot":"webpack://"}]);
	
	// exports


/***/ },
/* 334 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {
	  data: function data() {
	    return {
	      lineWidth: {
	        pencil: 5,
	        eraser: 15,
	        line: 5
	      },
	      brushColor: {
	        pencil: '#333333',
	        eraser: '#fff',
	        line: '#333',
	        rect: '#333',
	        round: '#333'
	      },
	      objectOpacity: {
	        pencil: 1,
	        eraser: 1,
	        line: 1,
	        rect: 1,
	        round: 1
	      },
	      currentBrush: 'pencil',
	      isDrawingMode: true,
	      currentColor: '#333333',
	      currentColorObject: new Colors({
	        color: this.currentColor,
	        allMixDetails: true
	      }),
	      pickerTextColor: '#ddd',
	      currentStrokeWidth: 7,
	      currentOpacity: 1,
	      defaultColors: ['#D0021B', '#F5A623', '#8B572A', '#7ED321', '#417505', '#BD10E0', '#9013FE', '#4A90E2', '#50E3C2', '#B8E986', '#000', '#4A4A4A', '#9B9B9B', '#D3D3D3', '#FFF']
	    };
	  },
	
	  computed: {
	    canvas: function canvas() {
	      return this.$root.canvas;
	    },
	    curObject: function curObject() {
	      var object = null;
	      if (this.canvas) {
	        object = this.canvas.getActiveObject();
	      }
	      return object;
	    },
	
	    curStrokeWidth: {
	      get: function get() {
	        var width = void 0;
	        if (this.currentBrush) {
	          width = this.lineWidth[this.currentBrush];
	        } else if (this.curObject) {
	          width = this.curObject.strokeWidth;
	        } else {
	          width = this.currentStrokeWidth;
	        }
	        return width;
	      },
	      set: function set(newValue) {
	        if (this.canvas) {
	          if (this.currentBrush) {
	            this.lineWidth[this.currentBrush] = newValue;
	            this.canvas.freeDrawingBrush.width = newValue;
	          } else if (this.curObject) {
	            this.curObject.strokeWidth = newValue;
	            this.canvas.renderAll();
	          }
	          this.currentStrokeWidth = newValue;
	        }
	      }
	    },
	    curObjectOpacity: {
	      get: function get() {
	        var opacity = this.currentOpacity;
	        if (this.currentBrush) {
	          opacity = this.objectOpacity[this.currentBrush];
	        } else if (this.curObject) {
	          opacity = this.curObject.opacity;
	        }
	        return opacity;
	      },
	      set: function set(newValue) {
	        if (this.canvas) {
	          if (this.currentBrush) {
	            this.objectOpacity[this.currentBrush] = newValue;
	            this.canvas.freeDrawingBrush.opacity = newValue;
	          } else if (this.curObject) {
	            this.curObject.opacity = newValue;
	            this.canvas.renderAll();
	          }
	        }
	        this.currentOpacity = newValue;
	      }
	    },
	    curColor: {
	      get: function get() {
	        var colors = this.currentColorObject.colors;
	        var RGB = colors.RND.rgb;
	        var RGBInnerText = RGB.r + ', ' + RGB.g + ', ' + RGB.b;
	        var color = 'rgba(' + RGBInnerText + ', ' + this.currentColorObject.colors.alpha + ')';
	        if (this.currentBrush) {
	          color = this.brushColor[this.currentBrush];
	        } else {
	          color = this.currentColor;
	        }
	        return color;
	      },
	      set: function set(newValue) {
	        if (this.canvas) {
	          if (this.currentBrush) {
	            this.brushColor[this.currentBrush] = newValue;
	            this.canvas.freeDrawingBrush.color = newValue;
	          }
	        }
	        this.currentColor = newValue;
	        this.currentColorObject.setColor(newValue);
	        this.pickerTextColor = this.currentColorObject.colors.rgbaMixBGMixWhite.luminance > 0.22 ? '#222' : '#ddd';
	      }
	    }
	  },
	  methods: {
	    selectBrush: function selectBrush(brush) {
	      if (brush) {
	        this.canvas.deactivateAll();
	        this.canvas.renderAll();
	        this.canvas.setFreeDrawingBrush(brush, {
	          width: this.lineWidth[brush],
	          color: this.brushColor[brush],
	          opacity: this.objectOpacity[brush]
	        });
	        this.canvas.setDrawingMode(true);
	        this.isDrawingMode = true;
	      } else {
	        this.canvas.setDrawingMode(false);
	        this.isDrawingMode = false;
	      }
	      this.currentBrush = brush;
	    },
	    selectColor: function selectColor(color) {
	      this.curColor = color;
	    },
	    addShape: function addShape(shape) {
	      this.selectBrush();
	      switch (shape) {
	        case 'circle':
	          this.addCircle();
	          break;
	        case 'rect':
	          this.addRect();
	          break;
	        case 'line':
	          this.addLine();
	          break;
	        case 'text':
	          this.addText();
	          break;
	        default:
	      }
	    },
	    isCurrentTool: function isCurrentTool(tool) {
	      var isCurrent = !this.isDrawingMode;
	      if (tool) {
	        isCurrent = tool === this.currentBrush;
	      }
	      return isCurrent;
	    },
	    addText: function addText() {
	      var text = '点我选中文字，在画布下方可以修改文字内容和样式哦~';
	
	      this.canvas.add(new fabric.Text(text, {
	        left: this.canvas.getWidth() / 2,
	        top: this.canvas.getHeight() / 2,
	        fontFamily: 'Microsoft YaHei',
	        angle: 0,
	        fill: this.currentColor,
	        scaleX: 1,
	        scaleY: 1,
	        fontWeight: '',
	        originX: 'left',
	        hasRotatingPoint: true,
	        centerTransform: true
	      }));
	    }
	  }
	};

/***/ },
/* 335 */
/***/ function(module, exports) {

	module.exports = "\n<div class=\"tools-painting\">\n    <div class=\"tools-buttons-container\">\n        <!--<span>笔触</span>-->\n        <div title=\"画笔\" class=\"tools-button tools-pencil\" v-on:click=\"selectBrush('pencil')\"\n             v-bind:class=\"{'active': isCurrentTool('pencil')}\">\n            <img class=\"button-img\" src=\"//o44j7l4g3.qnssl.com/program/painter/pencil.png\" alt=\"笔\">\n            <img class=\"button-img-on\" src=\"//o44j7l4g3.qnssl.com/program/painter/pencil-on.png\" alt=\"笔\">\n        </div>\n        <div title=\"直线\" class=\"tools-button tools-line\" v-on:click=\"selectBrush('line')\"\n             v-bind:class=\"{'active': isCurrentTool('line')}\">\n            <img class=\"button-img\" src=\"//o44j7l4g3.qnssl.com/program/painter/line.png\" alt=\"线\">\n            <img class=\"button-img-on\" src=\"//o44j7l4g3.qnssl.com/program/painter/line-on.png\" alt=\"线\">\n        </div>\n        <div title=\"矩形\" class=\"tools-button tools-rect\" v-on:click=\"selectBrush('rect')\"\n             v-bind:class=\"{'active': isCurrentTool('rect')}\">\n            <img class=\"button-img\" src=\"//o44j7l4g3.qnssl.com/program/painter/rect.png\" alt=\"方\">\n            <img class=\"button-img-on\" src=\"//o44j7l4g3.qnssl.com/program/painter/rect-on.png\" alt=\"方\">\n        </div>\n        <div title=\"圆形\" class=\"tools-button tools-round\" v-on:click=\"selectBrush('round')\"\n             v-bind:class=\"{'active': isCurrentTool('round')}\">\n            <img class=\"button-img\" src=\"//o44j7l4g3.qnssl.com/program/painter/round.png\" alt=\"圆\">\n            <img class=\"button-img-on\" src=\"//o44j7l4g3.qnssl.com/program/painter/round-on.png\" alt=\"圆\">\n        </div>\n    </div>\n    <div class=\"tools-buttons-container\">\n        <div title=\"橡皮\" class=\"tools-button tools-eraser\" v-on:click=\"selectBrush('eraser')\"\n             v-bind:class=\"{'active': isCurrentTool('eraser')}\">\n            <img class=\"button-img\" src=\"//o44j7l4g3.qnssl.com/program/painter/eraser.png\" alt=\"橡\">\n            <img class=\"button-img-on\" src=\"//o44j7l4g3.qnssl.com/program/painter/eraser-on.png\" alt=\"橡\">\n        </div>\n        <div title=\"选择\" class=\"tools-button tools-select\" v-on:click=\"selectBrush()\"\n             v-bind:class=\"{'active': isCurrentTool()}\">\n            <img class=\"button-img\" src=\"//o44j7l4g3.qnssl.com/program/painter/select.png\" alt=\"选\">\n            <img class=\"button-img-on\" src=\"//o44j7l4g3.qnssl.com/program/painter/select-on.png\" alt=\"选\">\n        </div>\n        <div title=\"文字\" class=\"tools-button tools-text\" v-on:click=\"addShape('text')\">\n            <img class=\"button-img\" src=\"//o44j7l4g3.qnssl.com/program/painter/text.png\" alt=\"字\">\n        </div>\n        <div title=\"旋转中心\" class=\"tools-button tools-select\" v-on:click=\"selectBrush('rotation')\"\n             v-bind:class=\"{'active': isCurrentTool('rotation')}\">\n            <img class=\"button-img\" src=\"//o44j7l4g3.qnssl.com/program/painter/rotation.png\" alt=\"中\">\n            <img class=\"button-img-on\" src=\"//o44j7l4g3.qnssl.com/program/painter/rotation-on.png\" alt=\"中\">\n        </div>\n    </div>\n    <div class=\"tools-slider-container\">\n        <span class=\"tools-container-title\">粗细</span>\n        <span class=\"input-minus\">-</span>\n        <input title=\"粗细\" type=\"range\" value=\"7\" min=\"1\" max=\"100\" step=\"1\" v-model=\"curStrokeWidth\"/>\n        <span class=\"input-plus\">+</span>\n        <span class=\"number-input\" v-text=\"curStrokeWidth\"></span>\n    </div>\n    <div class=\"tools-slider-container\">\n        <span class=\"tools-container-title\">透明</span>\n        <span class=\"input-minus\">-</span>\n        <input title=\"透明度\" type=\"range\" value=\"1\" min=\"0\" max=\"1\" step=\"0.01\" v-model=\"curObjectOpacity\"/>\n        <span class=\"input-plus\">+</span>\n        <span class=\"number-input\" v-text=\"curObjectOpacity\"></span>\n    </div>\n    <div class=\"tools-item\">\n        <span class=\"item-title\">颜色</span>\n        <input title=\"颜色\" type=\"color\" class=\"color\" v-model=\"curColor\"\n               v-bind:style=\"{backgroundColor: curColor, color: pickerTextColor}\"/>\n    </div>\n    <div class=\"tools-area\">\n        <div class=\"tools-default-color\" v-for=\"color in defaultColors\"\n             v-bind:style=\"{backgroundColor: color}\" v-on:click=\"selectColor(color)\">\n        </div>\n    </div>\n</div>\n";

/***/ },
/* 336 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__webpack_require__(337)
	__vue_script__ = __webpack_require__(339)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src/vue/painter-tools-layers.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(344)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), true)
	  if (!hotAPI.compatible) return
	  var id = "/Users/greendou/Codemao/user-center/public/program/codemao-fabric/src/vue/painter-tools-layers.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 337 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(338);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(325)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js?sourceMap!./../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-ef1a1346&scoped=true!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./painter-tools-layers.vue", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js?sourceMap!./../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-ef1a1346&scoped=true!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./painter-tools-layers.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 338 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(302)();
	// imports
	
	
	// module
	exports.push([module.id, "\n.tools-layers[_v-ef1a1346] {\n    width: 100%;\n    height: 100%;\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n    -webkit-flex-direction: column;\n        -ms-flex-direction: column;\n            flex-direction: column;\n\n    padding: 0 5%;\n\n    background: #ECE7DD;\n}\n\n.panel-slider-item label[_v-ef1a1346] {\n    height: 2rem;\n\n    display: -webkit-box;\n\n    display: -webkit-flex;\n\n    display: -ms-flexbox;\n\n    display: flex;\n    -webkit-box-align: center;\n    -webkit-align-items: center;\n        -ms-flex-align: center;\n            align-items: center;\n    -webkit-box-pack: center;\n    -webkit-justify-content: center;\n        -ms-flex-pack: center;\n            justify-content: center;\n}\n\n.panel-slider-item input[_v-ef1a1346] {\n    width: 6rem;\n}\n\n.panel-slider-item span[_v-ef1a1346] {\n    margin: 0 0.1rem;\n\n    font-family: STHeitiTC-Medium, serif;\n    font-size: 18px;\n    color: #645542;\n}\n\n.panel-slider-item span.slider-title[_v-ef1a1346] {\n    margin-right: 0.5rem;\n    font-size: 18px;\n}\n\n.panel-slider-item span.slider-value[_v-ef1a1346] {\n    font-size: 14px;\n\n    margin-left: 0.5rem;\n}\n\n.layers-container[_v-ef1a1346] {\n    -webkit-box-flex: 1;\n    -webkit-flex-grow: 1;\n        -ms-flex-positive: 1;\n            flex-grow: 1;\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: reverse;\n    -webkit-flex-direction: column-reverse;\n        -ms-flex-direction: column-reverse;\n            flex-direction: column-reverse;\n    -webkit-box-align: center;\n    -webkit-align-items: center;\n        -ms-flex-align: center;\n            align-items: center;\n    -webkit-box-pack: end;\n    -webkit-justify-content: flex-end;\n        -ms-flex-pack: end;\n            justify-content: flex-end;\n\n    padding: 0 1rem;\n}\n\n.layers-item[_v-ef1a1346] {\n    width: 100%;\n    height: 3.5rem;\n\n    position: relative;\n\n    display: -webkit-box;\n\n    display: -webkit-flex;\n\n    display: -ms-flexbox;\n\n    display: flex;\n    -webkit-box-align: center;\n    -webkit-align-items: center;\n        -ms-flex-align: center;\n            align-items: center;\n\n    margin: 0.2rem 0;\n    padding: 0 0.1rem;\n\n    /*background: #FFFFFF;*/\n}\n\n.layers-item.active[_v-ef1a1346] {\n    background: #FFF;\n}\n\n.layers-item-right[_v-ef1a1346] {\n    -webkit-box-flex: 1;\n    -webkit-flex-grow: 1;\n        -ms-flex-positive: 1;\n            flex-grow: 1;\n    height: 90%;\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n    -webkit-flex-direction: column;\n        -ms-flex-direction: column;\n            flex-direction: column;\n    -webkit-box-pack: justify;\n    -webkit-justify-content: space-between;\n        -ms-flex-pack: justify;\n            justify-content: space-between;\n\n}\n\n.layers-thumbnail[_v-ef1a1346] {\n    width: 3.5rem;\n    height: 3rem;\n\n    margin: 0 0.2rem;\n\n    background: #FFFFFF;\n    border: 1px solid #CCCCCC;\n}\n\n.layers-thumbnail img[_v-ef1a1346] {\n    max-width: 100%;\n    max-height: 100%;\n}\n\n.layers-name[_v-ef1a1346] {\n    font-family: STHeitiTC-Medium, serif;\n    font-size: 14px;\n    color: #645542;\n}\n\n.layers-tools-container[_v-ef1a1346] {\n    height: 2.5rem;\n\n    display: -webkit-box;\n\n    display: -webkit-flex;\n\n    display: -ms-flexbox;\n\n    display: flex;\n    -webkit-box-align: center;\n    -webkit-align-items: center;\n        -ms-flex-align: center;\n            align-items: center;\n    -webkit-box-pack: start;\n    -webkit-justify-content: flex-start;\n        -ms-flex-pack: start;\n            justify-content: flex-start;\n}\n\n.layers-tool[_v-ef1a1346] {\n    height: 1.5rem;\n    width: 2.5rem;\n\n    display: -webkit-box;\n\n    display: -webkit-flex;\n\n    display: -ms-flexbox;\n\n    display: flex;\n    -webkit-box-pack: center;\n    -webkit-justify-content: center;\n        -ms-flex-pack: center;\n            justify-content: center;\n    -webkit-box-align: center;\n    -webkit-align-items: center;\n        -ms-flex-align: center;\n            align-items: center;\n\n    margin: 0.2rem;\n    background-color: #fff;\n    color: #CFBE90;\n\n    cursor: pointer;\n}\n\n.layers-delete[_v-ef1a1346] {\n    display: none;\n    position: absolute;\n    top: 0;\n    right: 0;\n\n    cursor: pointer;\n}\n\n.layers-item.active .layers-delete[_v-ef1a1346] {\n    display: block;\n}\n\n.layers-visible[_v-ef1a1346] {\n    width:1.2rem;\n    height:1.2rem;\n\n    text-align: center;\n    line-height:1.2rem;\n\n    background: #D8D8D8;\n    border: 1px solid #979797;\n\n    font-family: STHeitiTC-Medium,serif;\n    font-size: 12px;\n    color: #645542;\n\n    cursor: pointer;\n}\n", "", {"version":3,"sources":["/./src/vue/painter-tools-layers.vue?d1bfdae6"],"names":[],"mappings":";AA4CA;IACA,YAAA;IACA,aAAA;IACA,qBAAA;IAAA,sBAAA;IAAA,qBAAA;IAAA,cAAA;IACA,6BAAA;IAAA,8BAAA;IAAA,+BAAA;QAAA,2BAAA;YAAA,uBAAA;;IAEA,cAAA;;IAEA,oBAAA;CACA;;AAEA;IACA,aAAA;;IAEA,qBAAA;;IAAA,sBAAA;;IAAA,qBAAA;;IAAA,cAAA;IACA,0BAAA;IAAA,4BAAA;QAAA,uBAAA;YAAA,oBAAA;IACA,yBAAA;IAAA,gCAAA;QAAA,sBAAA;YAAA,wBAAA;CACA;;AAEA;IACA,YAAA;CACA;;AAEA;IACA,iBAAA;;IAEA,qCAAA;IACA,gBAAA;IACA,eAAA;CACA;;AAEA;IACA,qBAAA;IACA,gBAAA;CACA;;AAEA;IACA,gBAAA;;IAEA,oBAAA;CACA;;AAEA;IACA,oBAAA;IAAA,qBAAA;QAAA,qBAAA;YAAA,aAAA;IACA,qBAAA;IAAA,sBAAA;IAAA,qBAAA;IAAA,cAAA;IACA,6BAAA;IAAA,+BAAA;IAAA,uCAAA;QAAA,mCAAA;YAAA,+BAAA;IACA,0BAAA;IAAA,4BAAA;QAAA,uBAAA;YAAA,oBAAA;IACA,sBAAA;IAAA,kCAAA;QAAA,mBAAA;YAAA,0BAAA;;IAEA,gBAAA;CACA;;AAEA;IACA,YAAA;IACA,eAAA;;IAEA,mBAAA;;IAEA,qBAAA;;IAAA,sBAAA;;IAAA,qBAAA;;IAAA,cAAA;IACA,0BAAA;IAAA,4BAAA;QAAA,uBAAA;YAAA,oBAAA;;IAEA,iBAAA;IACA,kBAAA;;IAEA,wBAAA;CACA;;AAEA;IACA,iBAAA;CACA;;AAEA;IACA,oBAAA;IAAA,qBAAA;QAAA,qBAAA;YAAA,aAAA;IACA,YAAA;IACA,qBAAA;IAAA,sBAAA;IAAA,qBAAA;IAAA,cAAA;IACA,6BAAA;IAAA,8BAAA;IAAA,+BAAA;QAAA,2BAAA;YAAA,uBAAA;IACA,0BAAA;IAAA,uCAAA;QAAA,uBAAA;YAAA,+BAAA;;CAEA;;AAEA;IACA,cAAA;IACA,aAAA;;IAEA,iBAAA;;IAEA,oBAAA;IACA,0BAAA;CACA;;AAEA;IACA,gBAAA;IACA,iBAAA;CACA;;AAEA;IACA,qCAAA;IACA,gBAAA;IACA,eAAA;CACA;;AAEA;IACA,eAAA;;IAEA,qBAAA;;IAAA,sBAAA;;IAAA,qBAAA;;IAAA,cAAA;IACA,0BAAA;IAAA,4BAAA;QAAA,uBAAA;YAAA,oBAAA;IACA,wBAAA;IAAA,oCAAA;QAAA,qBAAA;YAAA,4BAAA;CACA;;AAEA;IACA,eAAA;IACA,cAAA;;IAEA,qBAAA;;IAAA,sBAAA;;IAAA,qBAAA;;IAAA,cAAA;IACA,yBAAA;IAAA,gCAAA;QAAA,sBAAA;YAAA,wBAAA;IACA,0BAAA;IAAA,4BAAA;QAAA,uBAAA;YAAA,oBAAA;;IAEA,eAAA;IACA,uBAAA;IACA,eAAA;;IAEA,gBAAA;CACA;;AAEA;IACA,cAAA;IACA,mBAAA;IACA,OAAA;IACA,SAAA;;IAEA,gBAAA;CACA;;AAEA;IACA,eAAA;CACA;;AAEA;IACA,aAAA;IACA,cAAA;;IAEA,mBAAA;IACA,mBAAA;;IAEA,oBAAA;IACA,0BAAA;;IAEA,oCAAA;IACA,gBAAA;IACA,eAAA;;IAEA,gBAAA;CACA","file":"painter-tools-layers.vue","sourcesContent":["<template>\n    <div class=\"tools-layers\">\n        <div class=\"panel-slider-item\">\n            <label>\n                <span class=\"slider-title\">透明</span>\n                <span>-</span>\n                <input type=\"range\" value=\"1\" min=\"0\" max=\"1\" step=\"0.01\" v-model=\"curLayerOpacity\"/>\n                <span>+</span>\n                <span class=\"slider-value\" v-text=\"curLayerOpacity\"></span>\n            </label>\n        </div>\n        <div class=\"layers-container\">\n            <div class=\"layers-item\" v-for=\"layer in layerList\" v-on:click=\"selectLayer($index)\"\n                 v-bind:id=\"'layer'+$index\" v-bind:class=\"{'active': isCurrentLayer($index)}\">\n                <div class=\"layers-thumbnail\">\n                    <img alt=\"缩略图\" v-bind:src=\"getThumbnail(layer)\">\n                </div>\n                <div class=\"layers-item-right\">\n                    <span class=\"layers-name\" v-text=\"layer.name\"></span>\n                    <div class=\"layers-buttons\">\n                        <div class=\"layers-visible\" v-text=\"getVisibleButton(layer.visible)\"\n                             v-on:click.stop=\"toggleLayerVisible($index)\"></div>\n                    </div>\n                    <div class=\"layers-delete\"\n                         v-on:click.stop=\"removeLayer($index)\">\n                        <svg width=\"18px\" height=\"18px\" viewBox=\"194 99 18 18\" version=\"1.1\"\n                             xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\">\n                            <defs></defs>\n                            <path d=\"M201.530628,106.530628 L198.194021,106.530628 C197.459043,106.530628 196.863961,107.127581 196.863961,107.863961 C196.863961,108.605475 197.459449,109.197294 198.194021,109.197294 L201.530628,109.197294 L201.530628,112.533902 C201.530628,113.268879 202.127581,113.863961 202.863961,113.863961 C203.605475,113.863961 204.197294,113.268473 204.197294,112.533902 L204.197294,109.197294 L207.533902,109.197294 C208.268879,109.197294 208.863961,108.600341 208.863961,107.863961 C208.863961,107.122447 208.268473,106.530628 207.533902,106.530628 L204.197294,106.530628 L204.197294,103.194021 C204.197294,102.459043 203.600341,101.863961 202.863961,101.863961 C202.122447,101.863961 201.530628,102.459449 201.530628,103.194021 L201.530628,106.530628 Z\"\n                                  id=\"layer-close-button\" stroke=\"none\" fill=\"#645542\" fill-rule=\"evenodd\"\n                                  transform=\"translate(202.863961, 107.863961) rotate(-315.000000) translate(-202.863961, -107.863961) \"></path>\n                        </svg>\n                    </div>\n                </div>\n            </div>\n        </div>\n        <div class=\"layers-tools-container\">\n            <div class=\"layers-tool\" v-on:click=\"upLayer()\">^</div>\n            <div class=\"layers-tool\" v-on:click=\"downLayer()\">v</div>\n            <div class=\"layers-tool\" v-on:click=\"addLayer()\">+</div>\n        </div>\n    </div>\n</template>\n<style scoped>\n    .tools-layers {\n        width: 100%;\n        height: 100%;\n        display: flex;\n        flex-direction: column;\n\n        padding: 0 5%;\n\n        background: #ECE7DD;\n    }\n\n    .panel-slider-item label {\n        height: 2rem;\n\n        display: flex;\n        align-items: center;\n        justify-content: center;\n    }\n\n    .panel-slider-item input {\n        width: 6rem;\n    }\n\n    .panel-slider-item span {\n        margin: 0 0.1rem;\n\n        font-family: STHeitiTC-Medium, serif;\n        font-size: 18px;\n        color: #645542;\n    }\n\n    .panel-slider-item span.slider-title {\n        margin-right: 0.5rem;\n        font-size: 18px;\n    }\n\n    .panel-slider-item span.slider-value {\n        font-size: 14px;\n\n        margin-left: 0.5rem;\n    }\n\n    .layers-container {\n        flex-grow: 1;\n        display: flex;\n        flex-direction: column-reverse;\n        align-items: center;\n        justify-content: flex-end;\n\n        padding: 0 1rem;\n    }\n\n    .layers-item {\n        width: 100%;\n        height: 3.5rem;\n\n        position: relative;\n\n        display: flex;\n        align-items: center;\n\n        margin: 0.2rem 0;\n        padding: 0 0.1rem;\n\n        /*background: #FFFFFF;*/\n    }\n\n    .layers-item.active {\n        background: #FFF;\n    }\n\n    .layers-item-right {\n        flex-grow: 1;\n        height: 90%;\n        display: flex;\n        flex-direction: column;\n        justify-content: space-between;\n\n    }\n\n    .layers-thumbnail {\n        width: 3.5rem;\n        height: 3rem;\n\n        margin: 0 0.2rem;\n\n        background: #FFFFFF;\n        border: 1px solid #CCCCCC;\n    }\n\n    .layers-thumbnail img {\n        max-width: 100%;\n        max-height: 100%;\n    }\n\n    .layers-name {\n        font-family: STHeitiTC-Medium, serif;\n        font-size: 14px;\n        color: #645542;\n    }\n\n    .layers-tools-container {\n        height: 2.5rem;\n\n        display: flex;\n        align-items: center;\n        justify-content: flex-start;\n    }\n\n    .layers-tool {\n        height: 1.5rem;\n        width: 2.5rem;\n\n        display: flex;\n        justify-content: center;\n        align-items: center;\n\n        margin: 0.2rem;\n        background-color: #fff;\n        color: #CFBE90;\n\n        cursor: pointer;\n    }\n\n    .layers-delete {\n        display: none;\n        position: absolute;\n        top: 0;\n        right: 0;\n\n        cursor: pointer;\n    }\n\n    .layers-item.active .layers-delete {\n        display: block;\n    }\n\n    .layers-visible {\n        width:1.2rem;\n        height:1.2rem;\n\n        text-align: center;\n        line-height:1.2rem;\n\n        background: #D8D8D8;\n        border: 1px solid #979797;\n\n        font-family: STHeitiTC-Medium,serif;\n        font-size: 12px;\n        color: #645542;\n\n        cursor: pointer;\n    }\n</style>\n<script>\n    export default {\n        data(){\n            return {\n                currentLayerOpacity: 1,\n                needRefresh: this.$root.painter.store.state.needRefreshThumbnails,\n            };\n        },\n        computed: {\n            canvas() {\n                return this.$root.canvas;\n            },\n            layerList() {\n                if (this.layerManager)\n                    return this.layerManager.layerList;\n\n            },\n            layerManager() {\n                if (this.canvas) {\n                    return this.canvas.layerManager;\n                }\n            },\n            curLayer() {\n                if (this.layerManager) {\n                    return this.layerManager.currentLayer;\n                }\n            },\n            curLayerOpacity: {\n                get(){\n                    let opacity = this.currentLayerOpacity;\n                    if (this.curLayer) {\n                        opacity = this.curLayer.opacity;\n                    }\n                    return opacity;\n                },\n                set(newValue) {\n                    if (this.curLayer) {\n                        this.curLayer.opacity = newValue;\n                    }\n                    this.currentLayerOpacity = newValue;\n                }\n            },\n            curLayerIndex() {\n                return this.layerManager.getIndex(this.curLayer);\n            },\n            needRefreshThumbnails: {\n                get(){\n                    return this.$root.painter.store.state.needRefreshThumbnails;\n                },\n                set(newValue) {\n                    this.$root.painter.store.state.needRefreshThumbnails = newValue;\n                }\n            },\n        },\n        methods: {\n            toggleLayerVisible(index) {\n                this.layerManager.toggleLayerVisible(index);\n            },\n            removeLayer(index){\n                this.layerManager.removeLayer(index);\n            },\n            addLayer() {\n                this.layerManager.addLayer();\n            },\n            upLayer() {\n                this.layerManager.upLayer(this.curLayerIndex);\n            },\n            downLayer() {\n                this.layerManager.downLayer(this.curLayerIndex);\n            },\n            selectLayer(index) {\n                this.layerManager.selectLayer(index);\n            },\n            isCurrentLayer(index) {\n                return index === this.layerManager.getIndex(this.curLayerIndex);\n            },\n            getThumbnail(layer) {\n                if (this.needRefreshThumbnails)\n                    this.needRefreshThumbnails = false;\n                return layer.thumbnail;\n            },\n            isCurrentLayer(index) {\n                return this.curLayerIndex === index;\n            },\n            getVisibleButton(visible) {\n                return visible ? '显' : '隐';\n            }\n        }\n    }\n</script>"],"sourceRoot":"webpack://"}]);
	
	// exports


/***/ },
/* 339 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _defineProperty2 = __webpack_require__(340);
	
	var _defineProperty3 = _interopRequireDefault(_defineProperty2);
	
	var _methods;
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = {
	    data: function data() {
	        return {
	            currentLayerOpacity: 1,
	            needRefresh: this.$root.painter.store.state.needRefreshThumbnails
	        };
	    },
	
	    computed: {
	        canvas: function canvas() {
	            return this.$root.canvas;
	        },
	        layerList: function layerList() {
	            if (this.layerManager) return this.layerManager.layerList;
	        },
	        layerManager: function layerManager() {
	            if (this.canvas) {
	                return this.canvas.layerManager;
	            }
	        },
	        curLayer: function curLayer() {
	            if (this.layerManager) {
	                return this.layerManager.currentLayer;
	            }
	        },
	
	        curLayerOpacity: {
	            get: function get() {
	                var opacity = this.currentLayerOpacity;
	                if (this.curLayer) {
	                    opacity = this.curLayer.opacity;
	                }
	                return opacity;
	            },
	            set: function set(newValue) {
	                if (this.curLayer) {
	                    this.curLayer.opacity = newValue;
	                }
	                this.currentLayerOpacity = newValue;
	            }
	        },
	        curLayerIndex: function curLayerIndex() {
	            return this.layerManager.getIndex(this.curLayer);
	        },
	
	        needRefreshThumbnails: {
	            get: function get() {
	                return this.$root.painter.store.state.needRefreshThumbnails;
	            },
	            set: function set(newValue) {
	                this.$root.painter.store.state.needRefreshThumbnails = newValue;
	            }
	        }
	    },
	    methods: (_methods = {
	        toggleLayerVisible: function toggleLayerVisible(index) {
	            this.layerManager.toggleLayerVisible(index);
	        },
	        removeLayer: function removeLayer(index) {
	            this.layerManager.removeLayer(index);
	        },
	        addLayer: function addLayer() {
	            this.layerManager.addLayer();
	        },
	        upLayer: function upLayer() {
	            this.layerManager.upLayer(this.curLayerIndex);
	        },
	        downLayer: function downLayer() {
	            this.layerManager.downLayer(this.curLayerIndex);
	        },
	        selectLayer: function selectLayer(index) {
	            this.layerManager.selectLayer(index);
	        },
	        isCurrentLayer: function isCurrentLayer(index) {
	            return index === this.layerManager.getIndex(this.curLayerIndex);
	        },
	        getThumbnail: function getThumbnail(layer) {
	            if (this.needRefreshThumbnails) this.needRefreshThumbnails = false;
	            return layer.thumbnail;
	        }
	    }, (0, _defineProperty3.default)(_methods, 'isCurrentLayer', function isCurrentLayer(index) {
	        return this.curLayerIndex === index;
	    }), (0, _defineProperty3.default)(_methods, 'getVisibleButton', function getVisibleButton(visible) {
	        return visible ? '显' : '隐';
	    }), _methods)
	};

/***/ },
/* 340 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	
	var _defineProperty = __webpack_require__(341);
	
	var _defineProperty2 = _interopRequireDefault(_defineProperty);
	
	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { default: obj };
	}
	
	exports.default = function (obj, key, value) {
	  if (key in obj) {
	    (0, _defineProperty2.default)(obj, key, {
	      value: value,
	      enumerable: true,
	      configurable: true,
	      writable: true
	    });
	  } else {
	    obj[key] = value;
	  }
	
	  return obj;
	};

/***/ },
/* 341 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	module.exports = { "default": __webpack_require__(342), __esModule: true };

/***/ },
/* 342 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var $ = __webpack_require__(343);
	module.exports = function defineProperty(it, key, desc) {
	  return $.setDesc(it, key, desc);
	};

/***/ },
/* 343 */
/***/ function(module, exports) {

	"use strict";
	
	var $Object = Object;
	module.exports = {
	  create: $Object.create,
	  getProto: $Object.getPrototypeOf,
	  isEnum: {}.propertyIsEnumerable,
	  getDesc: $Object.getOwnPropertyDescriptor,
	  setDesc: $Object.defineProperty,
	  setDescs: $Object.defineProperties,
	  getKeys: $Object.keys,
	  getNames: $Object.getOwnPropertyNames,
	  getSymbols: $Object.getOwnPropertySymbols,
	  each: [].forEach
	};

/***/ },
/* 344 */
/***/ function(module, exports) {

	module.exports = "\n<div class=\"tools-layers\" _v-ef1a1346=\"\">\n    <div class=\"panel-slider-item\" _v-ef1a1346=\"\">\n        <label _v-ef1a1346=\"\">\n            <span class=\"slider-title\" _v-ef1a1346=\"\">透明</span>\n            <span _v-ef1a1346=\"\">-</span>\n            <input type=\"range\" value=\"1\" min=\"0\" max=\"1\" step=\"0.01\" v-model=\"curLayerOpacity\" _v-ef1a1346=\"\">\n            <span _v-ef1a1346=\"\">+</span>\n            <span class=\"slider-value\" v-text=\"curLayerOpacity\" _v-ef1a1346=\"\"></span>\n        </label>\n    </div>\n    <div class=\"layers-container\" _v-ef1a1346=\"\">\n        <div class=\"layers-item\" v-for=\"layer in layerList\" v-on:click=\"selectLayer($index)\" v-bind:id=\"'layer'+$index\" v-bind:class=\"{'active': isCurrentLayer($index)}\" _v-ef1a1346=\"\">\n            <div class=\"layers-thumbnail\" _v-ef1a1346=\"\">\n                <img alt=\"缩略图\" v-bind:src=\"getThumbnail(layer)\" _v-ef1a1346=\"\">\n            </div>\n            <div class=\"layers-item-right\" _v-ef1a1346=\"\">\n                <span class=\"layers-name\" v-text=\"layer.name\" _v-ef1a1346=\"\"></span>\n                <div class=\"layers-buttons\" _v-ef1a1346=\"\">\n                    <div class=\"layers-visible\" v-text=\"getVisibleButton(layer.visible)\" v-on:click.stop=\"toggleLayerVisible($index)\" _v-ef1a1346=\"\"></div>\n                </div>\n                <div class=\"layers-delete\" v-on:click.stop=\"removeLayer($index)\" _v-ef1a1346=\"\">\n                    <svg width=\"18px\" height=\"18px\" viewBox=\"194 99 18 18\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" _v-ef1a1346=\"\">\n                        <defs _v-ef1a1346=\"\"></defs>\n                        <path d=\"M201.530628,106.530628 L198.194021,106.530628 C197.459043,106.530628 196.863961,107.127581 196.863961,107.863961 C196.863961,108.605475 197.459449,109.197294 198.194021,109.197294 L201.530628,109.197294 L201.530628,112.533902 C201.530628,113.268879 202.127581,113.863961 202.863961,113.863961 C203.605475,113.863961 204.197294,113.268473 204.197294,112.533902 L204.197294,109.197294 L207.533902,109.197294 C208.268879,109.197294 208.863961,108.600341 208.863961,107.863961 C208.863961,107.122447 208.268473,106.530628 207.533902,106.530628 L204.197294,106.530628 L204.197294,103.194021 C204.197294,102.459043 203.600341,101.863961 202.863961,101.863961 C202.122447,101.863961 201.530628,102.459449 201.530628,103.194021 L201.530628,106.530628 Z\" id=\"layer-close-button\" stroke=\"none\" fill=\"#645542\" fill-rule=\"evenodd\" transform=\"translate(202.863961, 107.863961) rotate(-315.000000) translate(-202.863961, -107.863961) \" _v-ef1a1346=\"\"></path>\n                    </svg>\n                </div>\n            </div>\n        </div>\n    </div>\n    <div class=\"layers-tools-container\" _v-ef1a1346=\"\">\n        <div class=\"layers-tool\" v-on:click=\"upLayer()\" _v-ef1a1346=\"\">^</div>\n        <div class=\"layers-tool\" v-on:click=\"downLayer()\" _v-ef1a1346=\"\">v</div>\n        <div class=\"layers-tool\" v-on:click=\"addLayer()\" _v-ef1a1346=\"\">+</div>\n    </div>\n</div>\n";

/***/ },
/* 345 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__webpack_require__(346)
	__vue_script__ = __webpack_require__(348)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src/vue/painter-tools-background.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(349)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), true)
	  if (!hotAPI.compatible) return
	  var id = "/Users/greendou/Codemao/user-center/public/program/codemao-fabric/src/vue/painter-tools-background.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 346 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(347);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(325)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js?sourceMap!./../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-c6f5b26e&scoped=true!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./painter-tools-background.vue", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js?sourceMap!./../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-c6f5b26e&scoped=true!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./painter-tools-background.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 347 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(302)();
	// imports
	
	
	// module
	exports.push([module.id, "\n.tools-panel[_v-c6f5b26e] {\n    width: 90%;\n    height: 100%;\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n    -webkit-flex-direction: column;\n        -ms-flex-direction: column;\n            flex-direction: column;\n    -webkit-box-align: center;\n    -webkit-align-items: center;\n        -ms-flex-align: center;\n            align-items: center;\n    -webkit-box-pack: start;\n    -webkit-justify-content: flex-start;\n        -ms-flex-pack: start;\n            justify-content: flex-start;\n\n    margin: 0 5%;\n\n    background: #ECE7DD;\n}\n\n.tools-panel .background-container[_v-c6f5b26e] {\n    width: 100%;\n    -webkit-box-flex: 1;\n    -webkit-flex-grow: 1;\n        -ms-flex-positive: 1;\n            flex-grow: 1;\n\n    overflow-y: auto;\n}\n\n.tools-panel .background-item[_v-c6f5b26e] {\n    width: 3.5rem;\n    height: 3.5rem;\n\n    display: -webkit-box;\n\n    display: -webkit-flex;\n\n    display: -ms-flexbox;\n\n    display: flex;\n    -webkit-box-align: center;\n    -webkit-align-items: center;\n        -ms-flex-align: center;\n            align-items: center;\n    -webkit-box-pack: center;\n    -webkit-justify-content: center;\n        -ms-flex-pack: center;\n            justify-content: center;\n\n    border: 1px solid #CCCCCC;\n    border-radius: 4px;\n}\n\n.background-item img[_v-c6f5b26e] {\n    max-width: 100%;\n    max-height: 100%;\n}\n\n.custom-color[_v-c6f5b26e] {\n    width:100%;\n    height: 3rem;\n\n    display: -webkit-box;\n\n    display: -webkit-flex;\n\n    display: -ms-flexbox;\n\n    display: flex;\n    -webkit-box-align: center;\n    -webkit-align-items: center;\n        -ms-flex-align: center;\n            align-items: center;\n    -webkit-box-pack:center;\n    -webkit-justify-content:center;\n        -ms-flex-pack:center;\n            justify-content:center;\n    border-bottom: 2px dashed #DDD0C3;\n\n    font-family: STHeitiTC-Medium, serif;\n    font-size: 18px;\n    color: #645542;\n}\n\n.custom-color input[_v-c6f5b26e] {\n    width:7rem;\n    height:1.5rem;\n\n    margin:0 0.5rem;\n\n    background: #8B572A;\n    border: 4px solid #FFFFFF;\n    border: 2px solid #AA9278;\n    box-shadow: inset 0 -2px 0 0 rgba(0, 0, 0, 0.30);\n    border-radius: 4px;\n\n    cursor: pointer;\n}\n\n.custom-color input[_v-c6f5b26e]:focus {\n    outline: none;\n}\n\n.clear-button[_v-c6f5b26e] {\n    height: 2rem;\n    width: 11rem;\n\n    margin: 0.5rem 0.5rem;\n    border: 2px solid #645542;\n    border-radius: 4px;\n\n    /* 清除背景: */\n    font-family: STHeitiTC-Medium, serif;\n    font-size: 18px;\n    color: #645542;\n    text-align: center;\n    line-height: 2rem;\n\n    cursor: pointer;\n}\n", "", {"version":3,"sources":["/./src/vue/painter-tools-background.vue?447b380e"],"names":[],"mappings":";AAcA;IACA,WAAA;IACA,aAAA;IACA,qBAAA;IAAA,sBAAA;IAAA,qBAAA;IAAA,cAAA;IACA,6BAAA;IAAA,8BAAA;IAAA,+BAAA;QAAA,2BAAA;YAAA,uBAAA;IACA,0BAAA;IAAA,4BAAA;QAAA,uBAAA;YAAA,oBAAA;IACA,wBAAA;IAAA,oCAAA;QAAA,qBAAA;YAAA,4BAAA;;IAEA,aAAA;;IAEA,oBAAA;CACA;;AAEA;IACA,YAAA;IACA,oBAAA;IAAA,qBAAA;QAAA,qBAAA;YAAA,aAAA;;IAEA,iBAAA;CACA;;AAEA;IACA,cAAA;IACA,eAAA;;IAEA,qBAAA;;IAAA,sBAAA;;IAAA,qBAAA;;IAAA,cAAA;IACA,0BAAA;IAAA,4BAAA;QAAA,uBAAA;YAAA,oBAAA;IACA,yBAAA;IAAA,gCAAA;QAAA,sBAAA;YAAA,wBAAA;;IAEA,0BAAA;IACA,mBAAA;CACA;;AAEA;IACA,gBAAA;IACA,iBAAA;CACA;;AAEA;IACA,WAAA;IACA,aAAA;;IAEA,qBAAA;;IAAA,sBAAA;;IAAA,qBAAA;;IAAA,cAAA;IACA,0BAAA;IAAA,4BAAA;QAAA,uBAAA;YAAA,oBAAA;IACA,wBAAA;IAAA,+BAAA;QAAA,qBAAA;YAAA,uBAAA;IACA,kCAAA;;IAEA,qCAAA;IACA,gBAAA;IACA,eAAA;CACA;;AAEA;IACA,WAAA;IACA,cAAA;;IAEA,gBAAA;;IAEA,oBAAA;IACA,0BAAA;IACA,0BAAA;IACA,iDAAA;IACA,mBAAA;;IAEA,gBAAA;CACA;;AAEA;IACA,cAAA;CACA;;AAEA;IACA,aAAA;IACA,aAAA;;IAEA,sBAAA;IACA,0BAAA;IACA,mBAAA;;IAEA,WAAA;IACA,qCAAA;IACA,gBAAA;IACA,eAAA;IACA,mBAAA;IACA,kBAAA;;IAEA,gBAAA;CACA","file":"painter-tools-background.vue","sourcesContent":["<template>\n    <div class=\"tools-panel\">\n        <div class=\"background-container\">\n            <div class=\"background-item\" v-for=\"bg in backgroundImageList\">\n                <img v-bind:title=\"bg.title\" v-bind:src=\"bg.url\" v-on:click=\"setBackgroundImage(bg.url)\"/>\n            </div>\n        </div>\n        <label class=\"custom-color\">自定义\n            <input class=\"color\" v-model=\"bgColor\" v-bind:style=\"{backgroundColor: bgColor}\">\n        </label>\n        <div class=\"clear-button\" v-on:click=\"setBackgroundImage(null)\">清除背景</div>\n    </div>\n</template>\n<style scoped>\n    .tools-panel {\n        width: 90%;\n        height: 100%;\n        display: flex;\n        flex-direction: column;\n        align-items: center;\n        justify-content: flex-start;\n\n        margin: 0 5%;\n\n        background: #ECE7DD;\n    }\n\n    .tools-panel .background-container {\n        width: 100%;\n        flex-grow: 1;\n\n        overflow-y: auto;\n    }\n\n    .tools-panel .background-item {\n        width: 3.5rem;\n        height: 3.5rem;\n\n        display: flex;\n        align-items: center;\n        justify-content: center;\n\n        border: 1px solid #CCCCCC;\n        border-radius: 4px;\n    }\n\n    .background-item img {\n        max-width: 100%;\n        max-height: 100%;\n    }\n\n    .custom-color {\n        width:100%;\n        height: 3rem;\n\n        display: flex;\n        align-items: center;\n        justify-content:center;\n        border-bottom: 2px dashed #DDD0C3;\n\n        font-family: STHeitiTC-Medium, serif;\n        font-size: 18px;\n        color: #645542;\n    }\n\n    .custom-color input {\n        width:7rem;\n        height:1.5rem;\n\n        margin:0 0.5rem;\n\n        background: #8B572A;\n        border: 4px solid #FFFFFF;\n        border: 2px solid #AA9278;\n        box-shadow: inset 0 -2px 0 0 rgba(0, 0, 0, 0.30);\n        border-radius: 4px;\n\n        cursor: pointer;\n    }\n\n    .custom-color input:focus {\n        outline: none;\n    }\n\n    .clear-button {\n        height: 2rem;\n        width: 11rem;\n\n        margin: 0.5rem 0.5rem;\n        border: 2px solid #645542;\n        border-radius: 4px;\n\n        /* 清除背景: */\n        font-family: STHeitiTC-Medium, serif;\n        font-size: 18px;\n        color: #645542;\n        text-align: center;\n        line-height: 2rem;\n\n        cursor: pointer;\n    }\n</style>\n<script>\n    export default {\n        data(){\n            return {\n                backgroundColor: 'transparent',\n                backgroundImageList: [\n                    {\n                        title: '舞台区域',\n                        url: 'https://o44j7l4g3.qnssl.com/program/painter/stage-size.png',\n                    }\n                ]\n            }\n        },\n        computed: {\n            canvas() {\n                return this.$root.canvas;\n            },\n            bgColor: {\n                get() {\n                    let color = this.backgroundColor;\n                    if (this.canvas) {\n                        color = this.canvas.layerManager.currentLayer.backgroundColor;\n                    }\n                    return color;\n                },\n                set(newValue) {\n                    if (this.canvas) {\n                        this.canvas.layerManager.setBackgroundColor(newValue);\n                    }\n                    this.backgroundColor = newValue;\n                }\n            }\n        },\n        methods: {\n            setBackgroundImage(url) {\n                this.canvas.layerManager.setBackgroundImageURL(url);\n                this.canvas.layerManager.setBackgroundColor('transparent');\n            }\n        },\n    }\n</script>"],"sourceRoot":"webpack://"}]);
	
	// exports


/***/ },
/* 348 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = {
	    data: function data() {
	        return {
	            backgroundColor: 'transparent',
	            backgroundImageList: [{
	                title: '舞台区域',
	                url: 'https://o44j7l4g3.qnssl.com/program/painter/stage-size.png'
	            }]
	        };
	    },
	
	    computed: {
	        canvas: function canvas() {
	            return this.$root.canvas;
	        },
	
	        bgColor: {
	            get: function get() {
	                var color = this.backgroundColor;
	                if (this.canvas) {
	                    color = this.canvas.layerManager.currentLayer.backgroundColor;
	                }
	                return color;
	            },
	            set: function set(newValue) {
	                if (this.canvas) {
	                    this.canvas.layerManager.setBackgroundColor(newValue);
	                }
	                this.backgroundColor = newValue;
	            }
	        }
	    },
	    methods: {
	        setBackgroundImage: function setBackgroundImage(url) {
	            this.canvas.layerManager.setBackgroundImageURL(url);
	            this.canvas.layerManager.setBackgroundColor('transparent');
	        }
	    }
	};

/***/ },
/* 349 */
/***/ function(module, exports) {

	module.exports = "\n<div class=\"tools-panel\" _v-c6f5b26e=\"\">\n    <div class=\"background-container\" _v-c6f5b26e=\"\">\n        <div class=\"background-item\" v-for=\"bg in backgroundImageList\" _v-c6f5b26e=\"\">\n            <img v-bind:title=\"bg.title\" v-bind:src=\"bg.url\" v-on:click=\"setBackgroundImage(bg.url)\" _v-c6f5b26e=\"\">\n        </div>\n    </div>\n    <label class=\"custom-color\" _v-c6f5b26e=\"\">自定义\n        <input class=\"color\" v-model=\"bgColor\" v-bind:style=\"{backgroundColor: bgColor}\" _v-c6f5b26e=\"\">\n    </label>\n    <div class=\"clear-button\" v-on:click=\"setBackgroundImage(null)\" _v-c6f5b26e=\"\">清除背景</div>\n</div>\n";

/***/ },
/* 350 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__webpack_require__(351)
	__vue_script__ = __webpack_require__(353)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src/vue/painter-tools-costume.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(354)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), true)
	  if (!hotAPI.compatible) return
	  var id = "/Users/greendou/Codemao/user-center/public/program/codemao-fabric/src/vue/painter-tools-costume.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 351 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(352);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(325)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js?sourceMap!./../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-4c4e8d56&scoped=true!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./painter-tools-costume.vue", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js?sourceMap!./../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-4c4e8d56&scoped=true!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./painter-tools-costume.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 352 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(302)();
	// imports
	
	
	// module
	exports.push([module.id, "\n.tools-costume[_v-4c4e8d56] {\n    width: 100%;\n    height: 100%;\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n    -webkit-flex-direction: column;\n        -ms-flex-direction: column;\n            flex-direction: column;\n\n    background: #E1D6BE;\n}\n\n.costume-title[_v-4c4e8d56] {\n    margin: 0.5rem;\n    padding: 0.5rem;\n    background: #ECE2CA;\n    border: 1px solid #DDD0C3;\n    border-radius: 4px;\n    font-family: STHeitiSC-Light,serif;\n    font-size: 14px;\n    color: #6D4C41;\n}\n\n.costume-title[_v-4c4e8d56]:focus {\n    outline: none;\n}\n\n.costume-buttons[_v-4c4e8d56] {\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-pack: justify;\n    -webkit-justify-content: space-between;\n        -ms-flex-pack: justify;\n            justify-content: space-between;\n\n    margin:0 0.5rem;\n\n    cursor: pointer;\n}\n\n.costume-buttons img[_v-4c4e8d56] {\n    max-width:100%;\n    max-height: 100%;\n}\n\n\n", "", {"version":3,"sources":["/./src/vue/painter-tools-costume.vue?36317bd1"],"names":[],"mappings":";AAcA;IACA,YAAA;IACA,aAAA;IACA,qBAAA;IAAA,sBAAA;IAAA,qBAAA;IAAA,cAAA;IACA,6BAAA;IAAA,8BAAA;IAAA,+BAAA;QAAA,2BAAA;YAAA,uBAAA;;IAEA,oBAAA;CACA;;AAEA;IACA,eAAA;IACA,gBAAA;IACA,oBAAA;IACA,0BAAA;IACA,mBAAA;IACA,mCAAA;IACA,gBAAA;IACA,eAAA;CACA;;AAEA;IACA,cAAA;CACA;;AAEA;IACA,qBAAA;IAAA,sBAAA;IAAA,qBAAA;IAAA,cAAA;IACA,0BAAA;IAAA,uCAAA;QAAA,uBAAA;YAAA,+BAAA;;IAEA,gBAAA;;IAEA,gBAAA;CACA;;AAEA;IACA,eAAA;IACA,iBAAA;CACA","file":"painter-tools-costume.vue","sourcesContent":["<template>\n    <div class=\"tools-costume\">\n        <input title=\"造型名称\" class=\"costume-title\" placeholder=\"请输入造型名称\" v-model=\"costumeTitle\"/>\n        <div class=\"costume-buttons\">\n            <div class=\"save-button\">\n                <img src=\"//o44j7l4g3.qnssl.com/program/painter/save.png\" alt=\"保存\" @click=\"save\">\n            </div>\n            <div class=\"cancel-button\">\n                <img src=\"//o44j7l4g3.qnssl.com/program/painter/cancel.png\" alt=\"取消\" @click=\"cancel\">\n            </div>\n        </div>\n    </div>\n</template>\n<style scoped>\n    .tools-costume {\n        width: 100%;\n        height: 100%;\n        display: flex;\n        flex-direction: column;\n\n        background: #E1D6BE;\n    }\n\n    .costume-title {\n        margin: 0.5rem;\n        padding: 0.5rem;\n        background: #ECE2CA;\n        border: 1px solid #DDD0C3;\n        border-radius: 4px;\n        font-family: STHeitiSC-Light,serif;\n        font-size: 14px;\n        color: #6D4C41;\n    }\n\n    .costume-title:focus {\n        outline: none;\n    }\n\n    .costume-buttons {\n        display: flex;\n        justify-content: space-between;\n\n        margin:0 0.5rem;\n\n        cursor: pointer;\n    }\n\n    .costume-buttons img {\n        max-width:100%;\n        max-height: 100%;\n    }\n\n\n</style>\n<script>\n    export default{\n        data(){\n            return {\n            }\n        },\n        computed: {\n            costumeTitle: {\n                get() {\n                    return this.$root.painter.store.state.costumeTitle;\n                },\n                set(newValue) {\n                    this.$root.painter.store.setCostumeName(newValue);\n                }\n            }\n\n        },\n        methods: {\n            save() {\n                this.$dispatch('painter-save');\n            },\n            cancel() {\n                this.$dispatch('painter-cancel');\n            },\n        }\n    }\n</script>"],"sourceRoot":"webpack://"}]);
	
	// exports


/***/ },
/* 353 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = {
	    data: function data() {
	        return {};
	    },
	
	    computed: {
	        costumeTitle: {
	            get: function get() {
	                return this.$root.painter.store.state.costumeTitle;
	            },
	            set: function set(newValue) {
	                this.$root.painter.store.setCostumeName(newValue);
	            }
	        }
	
	    },
	    methods: {
	        save: function save() {
	            this.$dispatch('painter-save');
	        },
	        cancel: function cancel() {
	            this.$dispatch('painter-cancel');
	        }
	    }
	};

/***/ },
/* 354 */
/***/ function(module, exports) {

	module.exports = "\n<div class=\"tools-costume\" _v-4c4e8d56=\"\">\n    <input title=\"造型名称\" class=\"costume-title\" placeholder=\"请输入造型名称\" v-model=\"costumeTitle\" _v-4c4e8d56=\"\">\n    <div class=\"costume-buttons\" _v-4c4e8d56=\"\">\n        <div class=\"save-button\" _v-4c4e8d56=\"\">\n            <img src=\"//o44j7l4g3.qnssl.com/program/painter/save.png\" alt=\"保存\" @click=\"save\" _v-4c4e8d56=\"\">\n        </div>\n        <div class=\"cancel-button\" _v-4c4e8d56=\"\">\n            <img src=\"//o44j7l4g3.qnssl.com/program/painter/cancel.png\" alt=\"取消\" @click=\"cancel\" _v-4c4e8d56=\"\">\n        </div>\n    </div>\n</div>\n";

/***/ },
/* 355 */
/***/ function(module, exports) {

	module.exports = "\n<div class=\"painter-tools\" _v-f535087c=\"\">\n    <div class=\"painter-tools-tabs\" _v-f535087c=\"\">\n        <div class=\"tab-button tabs-painting\" v-on:click=\"switchTool(0)\" v-bind:class=\"{'active':isCurrentTool(0)}\" _v-f535087c=\"\">\n            画图\n            <svg width=\"16px\" height=\"7px\" viewBox=\"49 48 16 7\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" _v-f535087c=\"\">\n                <polygon id=\"rect-tab-painting\" stroke=\"none\" fill=\"#F2524C\" fill-rule=\"evenodd\" transform=\"translate(57.000000, 51.500000) scale(1, -1) translate(-57.000000, -51.500000) \" points=\"57 48 65 55 49 55\" _v-f535087c=\"\"></polygon>\n            </svg>\n        </div>\n        <div class=\"tab-button tabs-background\" v-on:click=\"switchTool(1)\" v-bind:class=\"{'active':isCurrentTool(1)}\" _v-f535087c=\"\">\n            背景\n            <svg width=\"16px\" height=\"7px\" viewBox=\"49 48 16 7\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" _v-f535087c=\"\">\n                <polygon id=\"rect-tab-background\" stroke=\"none\" fill=\"#EEB000\" fill-rule=\"evenodd\" transform=\"translate(57.000000, 51.500000) scale(1, -1) translate(-57.000000, -51.500000) \" points=\"57 48 65 55 49 55\" _v-f535087c=\"\"></polygon>\n            </svg>\n        </div>\n        <div class=\"tab-button tabs-layers\" v-on:click=\"switchTool(2)\" v-bind:class=\"{'active':isCurrentTool(2)}\" _v-f535087c=\"\">\n            图层\n            <svg width=\"16px\" height=\"7px\" viewBox=\"49 48 16 7\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" _v-f535087c=\"\">\n                <polygon id=\"rect-tab-layers\" stroke=\"none\" fill=\"#44BFD2\" fill-rule=\"evenodd\" transform=\"translate(57.000000, 51.500000) scale(1, -1) translate(-57.000000, -51.500000) \" points=\"57 48 65 55 49 55\" _v-f535087c=\"\"></polygon>\n            </svg>\n        </div>\n    </div>\n    <div class=\"painter-tools-container\" _v-f535087c=\"\">\n        <!--<components :is=\"currentTool\"></components>-->\n        <painter-tools-painting v-show=\"isShowPanel('painter-tools-painting')\" _v-f535087c=\"\"></painter-tools-painting>\n        <painter-tools-background v-show=\"isShowPanel('painter-tools-background')\" _v-f535087c=\"\"></painter-tools-background>\n        <painter-tools-layers v-show=\"isShowPanel('painter-tools-layers')\" _v-f535087c=\"\"></painter-tools-layers>\n    </div>\n    <div class=\"painter-tools-buttons\" _v-f535087c=\"\">\n        <painter-tools-costume _v-f535087c=\"\"></painter-tools-costume>\n    </div>\n</div>\n";

/***/ },
/* 356 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__webpack_require__(357)
	__vue_script__ = __webpack_require__(359)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src/vue/painter-control-panel.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(360)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), true)
	  if (!hotAPI.compatible) return
	  var id = "/Users/greendou/Codemao/user-center/public/program/codemao-fabric/src/vue/painter-control-panel.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 357 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(358);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(325)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js?sourceMap!./../../node_modules/vue-loader/lib/style-rewriter.js!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./painter-control-panel.vue", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js?sourceMap!./../../node_modules/vue-loader/lib/style-rewriter.js!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./painter-control-panel.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 358 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(302)();
	// imports
	
	
	// module
	exports.push([module.id, "\n.control-panel {\n    width: 100%;\n    height: 5%;\n\n    display: -webkit-box;\n\n    display: -webkit-flex;\n\n    display: -ms-flexbox;\n\n    display: flex;\n    -webkit-box-pack:end;\n    -webkit-justify-content:flex-end;\n        -ms-flex-pack:end;\n            justify-content:flex-end;\n    -webkit-box-align:center;\n    -webkit-align-items:center;\n        -ms-flex-align:center;\n            align-items:center;\n\n    background-color: #F8F8F8;\n}\n\n.control-buttons-container {\n    height: 100%;\n}\n\n.control-panel .control-button {\n    width:3rem;\n    height:calc(100% - 0.2rem);\n\n    display: -webkit-box;\n\n    display: -webkit-flex;\n\n    display: -ms-flexbox;\n\n    display: flex;\n    -webkit-box-align: center;\n    -webkit-align-items: center;\n        -ms-flex-align: center;\n            align-items: center;\n    -webkit-box-pack: center;\n    -webkit-justify-content: center;\n        -ms-flex-pack: center;\n            justify-content: center;\n\n    margin:0.1rem;\n\n    font-family: STHeitiTC-Medium,serif;\n    font-size: 18px;\n    color: #645542;\n\n    cursor: pointer;\n}\n\n.control-panel .control-button img {\n    max-height:100%;\n    max-width: 100%;\n}\n", "", {"version":3,"sources":["/./src/vue/painter-control-panel.vue?4a38b942"],"names":[],"mappings":";AAUA;IACA,YAAA;IACA,WAAA;;IAEA,qBAAA;;IAAA,sBAAA;;IAAA,qBAAA;;IAAA,cAAA;IACA,qBAAA;IAAA,iCAAA;QAAA,kBAAA;YAAA,yBAAA;IACA,yBAAA;IAAA,2BAAA;QAAA,sBAAA;YAAA,mBAAA;;IAEA,0BAAA;CACA;;AAEA;IACA,aAAA;CACA;;AAEA;IACA,WAAA;IACA,2BAAA;;IAEA,qBAAA;;IAAA,sBAAA;;IAAA,qBAAA;;IAAA,cAAA;IACA,0BAAA;IAAA,4BAAA;QAAA,uBAAA;YAAA,oBAAA;IACA,yBAAA;IAAA,gCAAA;QAAA,sBAAA;YAAA,wBAAA;;IAEA,cAAA;;IAEA,oCAAA;IACA,gBAAA;IACA,eAAA;;IAEA,gBAAA;CACA;;AAEA;IACA,gBAAA;IACA,gBAAA;CACA","file":"painter-control-panel.vue","sourcesContent":["<template xmlns:v-on=\"http://www.w3.org/1999/xhtml\">\n    <div class=\"control-panel\">\n        <div class=\"control-buttons-container\">\n            <div title=\"清空画布\" class=\"control-button\" v-on:click=\"clear()\">\n                <img src=\"//o44j7l4g3.qnssl.com/program/painter/clear.png\" alt=\"清空画布\">\n            </div>\n        </div>\n    </div>\n</template>\n<style>\n    .control-panel {\n        width: 100%;\n        height: 5%;\n\n        display: flex;\n        justify-content:flex-end;\n        align-items:center;\n\n        background-color: #F8F8F8;\n    }\n\n    .control-buttons-container {\n        height: 100%;\n    }\n\n    .control-panel .control-button {\n        width:3rem;\n        height:calc(100% - 0.2rem);\n\n        display: flex;\n        align-items: center;\n        justify-content: center;\n\n        margin:0.1rem;\n\n        font-family: STHeitiTC-Medium,serif;\n        font-size: 18px;\n        color: #645542;\n\n        cursor: pointer;\n    }\n\n    .control-panel .control-button img {\n        max-height:100%;\n        max-width: 100%;\n    }\n</style>\n<script>\n    export default {\n        data() {\n            return {}\n        },\n        computed: {\n            canvas() {\n                return this.$root.canvas;\n            }\n        },\n        methods: {\n            clear() {\n                this.canvas.layerManager.clearLayers();\n                this.canvas.clear();\n            }\n        }\n    }\n</script>"],"sourceRoot":"webpack://"}]);
	
	// exports


/***/ },
/* 359 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = {
	    data: function data() {
	        return {};
	    },
	
	    computed: {
	        canvas: function canvas() {
	            return this.$root.canvas;
	        }
	    },
	    methods: {
	        clear: function clear() {
	            this.canvas.layerManager.clearLayers();
	            this.canvas.clear();
	        }
	    }
	};

/***/ },
/* 360 */
/***/ function(module, exports) {

	module.exports = "\n<div class=\"control-panel\">\n    <div class=\"control-buttons-container\">\n        <div title=\"清空画布\" class=\"control-button\" v-on:click=\"clear()\">\n            <img src=\"//o44j7l4g3.qnssl.com/program/painter/clear.png\" alt=\"清空画布\">\n        </div>\n    </div>\n</div>\n";

/***/ },
/* 361 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__webpack_require__(362)
	__vue_script__ = __webpack_require__(364)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src/vue/painter-canvas-wrapper.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(365)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), true)
	  if (!hotAPI.compatible) return
	  var id = "/Users/greendou/Codemao/user-center/public/program/codemao-fabric/src/vue/painter-canvas-wrapper.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 362 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(363);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(325)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js?sourceMap!./../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-e28ce672&scoped=true!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./painter-canvas-wrapper.vue", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js?sourceMap!./../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-e28ce672&scoped=true!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./painter-canvas-wrapper.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 363 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(302)();
	// imports
	
	
	// module
	exports.push([module.id, "\ndiv[_v-e28ce672] {\n    width: 85%;\n    height: 85%;\n    background-image: url(https://o44j7l4g3.qnssl.com/program/painter/grid.png);\n\n    border: 4px solid rgba(198, 177, 155, 0.60);\n    border-radius: 4px;\n}\n", "", {"version":3,"sources":["/./src/vue/painter-canvas-wrapper.vue?f1c06448"],"names":[],"mappings":";AAMA;IACA,WAAA;IACA,YAAA;IACA,4EAAA;;IAEA,4CAAA;IACA,mBAAA;CACA","file":"painter-canvas-wrapper.vue","sourcesContent":["<template>\n    <div class=\"painter-canvas-wrapper\">\n        <canvas class=\"painter-canvas\"></canvas>\n    </div>\n</template>\n<style scoped>\n    div {\n        width: 85%;\n        height: 85%;\n        background-image: url(https://o44j7l4g3.qnssl.com/program/painter/grid.png);\n\n        border: 4px solid rgba(198, 177, 155, 0.60);\n        border-radius: 4px;\n    }\n</style>\n<script>\n    export default{}\n</script>"],"sourceRoot":"webpack://"}]);
	
	// exports


/***/ },
/* 364 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {};

/***/ },
/* 365 */
/***/ function(module, exports) {

	module.exports = "\n<div class=\"painter-canvas-wrapper\" _v-e28ce672=\"\">\n    <canvas class=\"painter-canvas\" _v-e28ce672=\"\"></canvas>\n</div>\n";

/***/ },
/* 366 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__webpack_require__(367)
	__vue_script__ = __webpack_require__(369)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src/vue/painter-object-panel.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(370)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), true)
	  if (!hotAPI.compatible) return
	  var id = "/Users/greendou/Codemao/user-center/public/program/codemao-fabric/src/vue/painter-object-panel.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 367 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(368);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(325)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js?sourceMap!./../../node_modules/vue-loader/lib/style-rewriter.js!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./painter-object-panel.vue", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js?sourceMap!./../../node_modules/vue-loader/lib/style-rewriter.js!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./painter-object-panel.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 368 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(302)();
	// imports
	
	
	// module
	exports.push([module.id, "\n.painter-object-panel {\n    width: 85%;\n    height: calc(10% - 1rem);\n    padding: 0.5rem;\n    background-color: #F8F8F8;\n\n    display: -webkit-box;\n\n    display: -webkit-flex;\n\n    display: -ms-flexbox;\n\n    display: flex;\n    -webkit-box-align: center;\n    -webkit-align-items: center;\n        -ms-flex-align: center;\n            align-items: center;\n}\n\n.painter-object-panel .object-color {\n    width: 2rem;\n    height: 1.5rem;\n    color: transparent;\n\n    background: #8B572A;\n    border: 4px solid #FFFFFF;\n    border: 2px solid #DDD0C3;\n    box-shadow: inset 0 -2px 0 0 rgba(0, 0, 0, 0.30);\n    border-radius: 4px;\n}\n\n.painter-object-panel .object-opacity {\n    /*width: 14rem;*/\n    margin: 0 0.5rem;\n\n    font-family: STHeitiTC-Medium, serif;\n    font-size: 18px;\n    color: #645542;\n}\n\n.painter-object-panel .object-opacity input {\n    width: 6.25rem;\n}\n\n.painter-object-panel .object-opacity span {\n    display: inline-block;\n\n    width: 2.2rem;\n    margin-left: 0.5rem;\n    text-align: center;\n}\n\n.painter-object-panel .font-size {\n    width: 3.2rem;\n    height: 1.5rem;\n\n    margin: 0 0.5rem;\n\n    background: #FFFFFF;\n    border: 4px solid #FFFFFF;\n    border: 2px solid #DDD0C3;\n    border-radius: 4px;\n\n    font-family: STHeitiTC-Medium,serif;\n    font-size: 18px;\n    color: #645542;\n\n    text-align: center;\n}\n\n.painter-object-panel .font-size:focus {\n    outline: none;\n}\n\n.painter-object-panel .object-text {\n    width: 15rem;\n    height: 3rem;\n    max-width: 20rem;\n    max-height: 3.5rem;\n\n    margin: 0 0.5rem;\n}\n\n.painter-object-panel .remove-button {\n    float: right;\n\n    font-family: STHeitiTC-Medium,serif;\n    font-size: 18px;\n    color: #645542;\n\n    cursor: pointer;\n}\n", "", {"version":3,"sources":["/./src/vue/painter-object-panel.vue?33b56114"],"names":[],"mappings":";AAmBA;IACA,WAAA;IACA,yBAAA;IACA,gBAAA;IACA,0BAAA;;IAEA,qBAAA;;IAAA,sBAAA;;IAAA,qBAAA;;IAAA,cAAA;IACA,0BAAA;IAAA,4BAAA;QAAA,uBAAA;YAAA,oBAAA;CACA;;AAEA;IACA,YAAA;IACA,eAAA;IACA,mBAAA;;IAEA,oBAAA;IACA,0BAAA;IACA,0BAAA;IACA,iDAAA;IACA,mBAAA;CACA;;AAEA;IACA,iBAAA;IACA,iBAAA;;IAEA,qCAAA;IACA,gBAAA;IACA,eAAA;CACA;;AAEA;IACA,eAAA;CACA;;AAEA;IACA,sBAAA;;IAEA,cAAA;IACA,oBAAA;IACA,mBAAA;CACA;;AAEA;IACA,cAAA;IACA,eAAA;;IAEA,iBAAA;;IAEA,oBAAA;IACA,0BAAA;IACA,0BAAA;IACA,mBAAA;;IAEA,oCAAA;IACA,gBAAA;IACA,eAAA;;IAEA,mBAAA;CACA;;AAEA;IACA,cAAA;CACA;;AAEA;IACA,aAAA;IACA,aAAA;IACA,iBAAA;IACA,mBAAA;;IAEA,iBAAA;CACA;;AAEA;IACA,aAAA;;IAEA,oCAAA;IACA,gBAAA;IACA,eAAA;;IAEA,gBAAA;CACA","file":"painter-object-panel.vue","sourcesContent":["<template xmlns:v-on=\"http://www.w3.org/1999/xhtml\" xmlns:v-bind=\"http://www.w3.org/1999/xhtml\">\n    <div class=\"painter-object-panel\">\n        <input title=\"颜色\" class=\"color object-color\" v-show=\"curObject\"\n               v-bind:style=\"{backgroundColor: curColor}\"\n               v-model=\"curColor\">\n        <label class=\"object-opacity\" v-show=\"curObject\"> 透明度 -\n            <input title=\" 透明度\" type=\"range\" min=\"0\" max=\"1\" step=\"0.01\"\n                   v-model=\"curOpacity\">+\n            <span v-text=\"curOpacity\"></span>\n        </label>\n        <input title=\"字号\" type=\"number\" class=\"font-size\" v-show=\"curObject&&showText\"\n               v-model=\"curFontSize\">\n        <textArea class=\"object-text\" title=\"文字内容\" v-model=\"curText\" v-show=\"curObject&&showText\"></textArea>\n        <div title=\"删除对象\" class=\"remove-button\" v-show=\"curObject||curGroup\" v-on:click=\"removeSelected()\">\n            <img src=\"//o44j7l4g3.qnssl.com/program/painter/delete.png\" alt=\"删除对象\">\n        </div>\n    </div>\n</template>\n<style>\n    .painter-object-panel {\n        width: 85%;\n        height: calc(10% - 1rem);\n        padding: 0.5rem;\n        background-color: #F8F8F8;\n\n        display: flex;\n        align-items: center;\n    }\n\n    .painter-object-panel .object-color {\n        width: 2rem;\n        height: 1.5rem;\n        color: transparent;\n\n        background: #8B572A;\n        border: 4px solid #FFFFFF;\n        border: 2px solid #DDD0C3;\n        box-shadow: inset 0 -2px 0 0 rgba(0, 0, 0, 0.30);\n        border-radius: 4px;\n    }\n\n    .painter-object-panel .object-opacity {\n        /*width: 14rem;*/\n        margin: 0 0.5rem;\n\n        font-family: STHeitiTC-Medium, serif;\n        font-size: 18px;\n        color: #645542;\n    }\n\n    .painter-object-panel .object-opacity input {\n        width: 6.25rem;\n    }\n\n    .painter-object-panel .object-opacity span {\n        display: inline-block;\n\n        width: 2.2rem;\n        margin-left: 0.5rem;\n        text-align: center;\n    }\n\n    .painter-object-panel .font-size {\n        width: 3.2rem;\n        height: 1.5rem;\n\n        margin: 0 0.5rem;\n\n        background: #FFFFFF;\n        border: 4px solid #FFFFFF;\n        border: 2px solid #DDD0C3;\n        border-radius: 4px;\n\n        font-family: STHeitiTC-Medium,serif;\n        font-size: 18px;\n        color: #645542;\n\n        text-align: center;\n    }\n\n    .painter-object-panel .font-size:focus {\n        outline: none;\n    }\n\n    .painter-object-panel .object-text {\n        width: 15rem;\n        height: 3rem;\n        max-width: 20rem;\n        max-height: 3.5rem;\n\n        margin: 0 0.5rem;\n    }\n\n    .painter-object-panel .remove-button {\n        float: right;\n\n        font-family: STHeitiTC-Medium,serif;\n        font-size: 18px;\n        color: #645542;\n\n        cursor: pointer;\n    }\n</style>\n<script src=\"../js/painter-object-panel.js\"></script>"],"sourceRoot":"webpack://"}]);
	
	// exports


/***/ },
/* 369 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {
	  data: function data() {
	    return {
	      currentColor: '#333',
	      currentObjectType: this.$root.painter.store.state.currentObjectType,
	      currentObject: this.$root.painter.store.state.currentObject,
	      currentOpacity: 1
	    };
	  },
	
	  computed: {
	    canvas: function canvas() {
	      return this.$root.canvas;
	    },
	    curObject: function curObject() {
	      return this.$root.painter.store.state.currentObject;
	    },
	    curObjectType: function curObjectType() {
	      return this.$root.painter.store.state.currentObjectType;
	    },
	    curGroup: function curGroup() {
	      return this.$root.painter.store.state.currentGroup;
	    },
	    showText: function showText() {
	      return this.curObjectType === 'text';
	    },
	
	    curColor: {
	      get: function get() {
	        var color = this.currentColor;
	        if (this.curObject) {
	          switch (this.curObjectType) {
	            case 'text':
	              color = this.curObject.fill;
	              break;
	            case 'line':
	              color = this.curObject.stroke;
	              break;
	            default:
	              color = this.curObject.fill;
	          }
	        }
	        return color;
	      },
	      set: function set(newValue) {
	        if (this.curObject) {
	          switch (this.curObjectType) {
	            case 'text':
	              this.curObject.fill = newValue;
	              break;
	            case 'line':
	              this.curObject.stroke = newValue;
	              break;
	            default:
	              this.curObject.fill = newValue;
	          }
	          this.currentColor = newValue;
	          this.canvas.renderAll();
	        }
	      }
	    },
	    curFontSize: {
	      get: function get() {
	        var fontSize = void 0;
	        if (this.curObjectType === 'text' && this.curObject) {
	          fontSize = this.curObject.fontSize;
	        }
	        return fontSize;
	      },
	      set: function set(newValue) {
	        if (this.curObjectType === 'text' && this.curObject) {
	          this.curObject.fontSize = newValue;
	          this.canvas.renderAll();
	        }
	      }
	    },
	    curText: {
	      get: function get() {
	        var text = void 0;
	        if (this.curObjectType === 'text' && this.curObject) {
	          text = this.curObject.text;
	        }
	        return text;
	      },
	      set: function set(newValue) {
	        if (this.curObjectType === 'text' && this.curObject) {
	          this.curObject.text = newValue;
	          this.canvas.renderAll();
	        }
	      }
	    },
	    curOpacity: {
	      get: function get() {
	        var opacity = this.currentOpacity;
	        if (this.curObject) {
	          opacity = this.curObject.opacity;
	        }
	        return opacity;
	      },
	      set: function set(newValue) {
	        if (this.curObject) {
	          this.curObject.opacity = newValue;
	          this.canvas.renderAll();
	        }
	        this.currentOpacity = newValue;
	      }
	    }
	  },
	  methods: {
	    removeSelected: function removeSelected() {
	      var _this = this;
	
	      var activeObject = this.curObject;
	      var activeGroup = this.canvas.getActiveGroup();
	
	      if (activeGroup) {
	        var objectsInGroup = activeGroup.getObjects();
	        this.canvas.discardActiveGroup();
	        objectsInGroup.forEach(function (object) {
	          _this.canvas.remove(object);
	        });
	      } else if (activeObject) {
	        this.canvas.remove(activeObject);
	      }
	    }
	  }
	};

/***/ },
/* 370 */
/***/ function(module, exports) {

	module.exports = "\n<div class=\"painter-object-panel\">\n    <input title=\"颜色\" class=\"color object-color\" v-show=\"curObject\"\n           v-bind:style=\"{backgroundColor: curColor}\"\n           v-model=\"curColor\">\n    <label class=\"object-opacity\" v-show=\"curObject\"> 透明度 -\n        <input title=\" 透明度\" type=\"range\" min=\"0\" max=\"1\" step=\"0.01\"\n               v-model=\"curOpacity\">+\n        <span v-text=\"curOpacity\"></span>\n    </label>\n    <input title=\"字号\" type=\"number\" class=\"font-size\" v-show=\"curObject&&showText\"\n           v-model=\"curFontSize\">\n    <textArea class=\"object-text\" title=\"文字内容\" v-model=\"curText\" v-show=\"curObject&&showText\"></textArea>\n    <div title=\"删除对象\" class=\"remove-button\" v-show=\"curObject||curGroup\" v-on:click=\"removeSelected()\">\n        <img src=\"//o44j7l4g3.qnssl.com/program/painter/delete.png\" alt=\"删除对象\">\n    </div>\n</div>\n";

/***/ },
/* 371 */
/***/ function(module, exports) {

	module.exports = "\n<div class=\"painter\">\n    <painter-tools></painter-tools>\n    <div class=\"right-panel\">\n        <div class=\"paint-panel\">\n            <painter-canvas-wrapper></painter-canvas-wrapper>\n            <painter-object-panel></painter-object-panel>\n        </div>\n        <painter-control-panel></painter-control-panel>\n    </div>\n</div>\n";

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map