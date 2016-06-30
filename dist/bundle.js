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

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var React = __webpack_require__(2);
	var ReactDOM = __webpack_require__(3);
	var Painter_1 = __webpack_require__(4);
	var fabric_canvas_1 = __webpack_require__(13);
	function init() {
	    ReactDOM.render(React.createElement(Painter_1.Painter, {compiler: "TypeScript", framework: "React"}), document.getElementById("painter"));
	}
	exports.init = init;
	exports.codemao_fabric = {
	    Painter: Painter_1.Painter,
	    fabric_canvas: fabric_canvas_1.fabric_canvas,
	    init: init
	};
	var global = window;
	global.codemao_fabric = exports.codemao_fabric;


/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = React;

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = ReactDOM;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var React = __webpack_require__(2);
	__webpack_require__(5);
	__webpack_require__(9);
	__webpack_require__(10);
	__webpack_require__(11);
	__webpack_require__(12);
	var fabric_canvas_1 = __webpack_require__(13);
	var PaintingPanel_1 = __webpack_require__(30);
	var ObjectPanel_1 = __webpack_require__(47);
	var painterStore_1 = __webpack_require__(44);
	// class Painter extends React.Component<PainterProps, { panel_type: number }>
	var global = window;
	var Painter = React.createClass({
	    getInitialState: function () {
	        return painterStore_1.painterStore.states;
	    },
	    componentDidMount: function () {
	        fabric_canvas_1.fabric_canvas.init(this.canvas_element, this.canvas_wrapper_element);
	        painterStore_1.painterStore.add_change_listener(this.onChange);
	    },
	    componentWillUnmount: function () {
	        painterStore_1.painterStore.remove_change_listener(this.onChange);
	    },
	    onChange: function () {
	        this.setState(painterStore_1.painterStore.states);
	        console.log(this.state);
	    },
	    /**
	     * Select tool panel
	     * @param event
	     */
	    selectPanel: function (event) {
	        this.setState({ panel_type: event.target.value });
	    },
	    render: function () {
	        var _this = this;
	        //  todo: will use these buttons soon
	        // let control_buttons = config.control_buttons.map((value) => {
	        //   return <ControlButton key={ value.title } control_button={ value } />;
	        // });
	        var panel_element;
	        switch (this.state.panel_type) {
	            //  todo: will use these panels soon
	            // case 'background':
	            //   panel_element = <BackgroundPanel className="painter-tools-background"/>;
	            //   break;
	            // case 'layer':
	            //   panel_element = <LayerPanel className="painter-tools-layer"/>;
	            //   break;
	            default:
	            case 'painting':
	                panel_element = React.createElement(PaintingPanel_1.PaintingPanel, {className: "painter-tools-painting", current_color: this.state.current_color});
	        }
	        return React.createElement("div", {className: "painter"}, React.createElement("div", {className: "painter-tools"}, React.createElement("div", {className: "painter-tools-tabs"}, React.createElement("button", {value: "painting", className: "tab-button tabs-painting", onClick: this.selectPanel}, "画图", React.createElement("svg", {width: "16px", height: "7px", viewBox: "49 48 16 7", version: "1.1", xmlns: "http://www.w3.org/2000/svg"}, React.createElement("polygon", {id: "rect-tab-painting", stroke: "none", fill: "#F2524C", "fill-rule": "evenodd", transform: "translate(57.000000, 51.500000) scale(1, -1) translate(-57.000000, -51.500000) ", points: "57 48 65 55 49 55"})))), React.createElement("div", {className: "painter-tools-container"}, panel_element), React.createElement("div", {className: "painter-tools-buttons"}, React.createElement("div", {className: "tools-costume"}, React.createElement("input", {title: "造型名称", className: "painter-title", placeholder: "请输入造型名称"}), React.createElement("div", {className: "costume-buttons"}, React.createElement("div", {className: "save-button"}, React.createElement("img", {src: "//o44j7l4g3.qnssl.com/program/painter/save.png", alt: "保存"})), React.createElement("div", {className: "cancel-button"}, React.createElement("img", {src: "//o44j7l4g3.qnssl.com/program/painter/cancel.png", alt: "取消"})))))), React.createElement("div", {className: "right-panel"}, React.createElement("div", {className: "paint-panel"}, React.createElement("div", {className: "painter-canvas-wrapper", ref: function (canvas_wrapper) { return _this.canvas_wrapper_element = canvas_wrapper; }}, React.createElement("canvas", {ref: function (canvas) { return _this.canvas_element = canvas; }, className: "painter-canvas"}), React.createElement("div", {className: "stage-size"})), React.createElement(ObjectPanel_1.ObjectPanel, null)), React.createElement("div", {className: "painter-control-wrapper"}, React.createElement("div", {className: "control-panel"}))));
	        // return <h1>Hello from {this.props.compiler} and {this.props.framework}!</h1>;
	    }
	});
	exports.Painter = Painter;
	//  todo: will use these buttons soon
	// <button value="background" className="tab-button tabs-background" onClick={this.selectPanel}>
	//             背景
	//             <svg width="16px" height="7px" viewBox="49 48 16 7" version="1.1"
	//                  xmlns="http://www.w3.org/2000/svg">
	//               <polygon id="rect-tab-background" stroke="none" fill="#EEB000" fill-rule="evenodd"
	//                        transform="translate(57.000000, 51.500000) scale(1, -1) translate(-57.000000, -51.500000) "
	//                        points="57 48 65 55 49 55"/>
	//             </svg>
	//           </button>
	//           <button value="layer" className="tab-button tabs-layers" onClick={this.selectPanel}>
	//             图层
	//             <svg width="16px" height="7px" viewBox="49 48 16 7" version="1.1"
	//                  xmlns="http://www.w3.org/2000/svg">
	//               <polygon id="rect-tab-layers" stroke="none" fill="#44BFD2" fill-rule="evenodd"
	//                        transform="translate(57.000000, 51.500000) scale(1, -1) translate(-57.000000, -51.500000) "
	//                        points="57 48 65 55 49 55"/>
	//             </svg>
	//           </button>
	global.Painter = Painter;


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(6);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(8)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/postcss-loader/index.js!./painter.css", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/postcss-loader/index.js!./painter.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(7)();
	// imports
	
	
	// module
	exports.push([module.id, ".painter {\n  width: 100%;\n  height: 100%;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  position: fixed;\n  left: 0;\n  top: 0;\n\n  background-color: #fdb336;\n}\n\n.right-panel {\n  width: 75%;\n  /*height: calc(100% - 4rem);*/\n  height: 100%;\n\n  display: -webkit-box;\n\n  display: -ms-flexbox;\n\n  display: flex;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: row;\n          flex-direction: row;\n  -webkit-box-flex: 1;\n      -ms-flex-positive: 1;\n          flex-grow: 1;\n\n  padding: 32px 0 32px 5%;\n  padding: 2rem 0 2rem 5%;\n\n  background-color: rgb(248, 248, 248);\n}\n\n.paint-panel {\n  height: calc(100% - 2rem);\n  width: 70%;\n\n  display: -webkit-box;\n\n  display: -ms-flexbox;\n\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-pack: end;\n      -ms-flex-pack: end;\n          justify-content: flex-end;\n\n  -webkit-box-flex: 1;\n\n      -ms-flex-positive: 1;\n\n          flex-grow: 1;\n  -ms-flex-negative: 1;\n      flex-shrink: 1;\n\n  background-color: #F8F8F8;\n}\n\n.painter-control-wrapper {\n  width: 10%;\n  max-width: 96px;\n  max-width: 6rem;\n  height: 100%;\n\n  -ms-flex-negative: 0;\n\n      flex-shrink: 0;\n}\n\n.painter-tools {\n  width: 20%;\n  height: 100%;\n  background: #ECE7DD;\n\n  display: -webkit-box;\n\n  display: -ms-flexbox;\n\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n}\n\n.painter-tools-tabs {\n  width: 100%;\n  height: 6%;\n\n  display: -webkit-box;\n\n  display: -ms-flexbox;\n\n  display: flex;\n  -webkit-box-align: start;\n      -ms-flex-align: start;\n          align-items: flex-start;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n}\n\n.painter-tools-container {\n  width: 100%;\n  height: calc(94% - 6rem);\n}\n\n.painter-tools-buttons {\n  width: 100%;\n  height: 96px;\n  height: 6rem;\n}\n\n.painter-tools .tab-button {\n  height: calc(85% - 0.3rem);\n  -webkit-box-flex: 1;\n      -ms-flex-positive: 1;\n          flex-grow: 1;\n\n  position: relative;\n\n  display: -webkit-box;\n\n  display: -ms-flexbox;\n\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  font-family: STHeitiTC-Light, serif;\n  font-size: 18px;\n  color: #FFFFFF;\n\n  margin-top: 4.8px;\n  margin-top: 0.3rem;\n\n  cursor: pointer;\n}\n\n.painter-tools .tab-button svg {\n  display: none;\n  width: 100%;\n  position: absolute;\n  top: calc(100% - 0.1rem);\n  left: 0;\n}\n\n.painter-tools .tab-button.active {\n  height: 85%;\n  margin-top: 0;\n}\n\n.painter-tools .tab-button.active svg {\n  display: block;\n}\n\n.painter-tools .tabs-painting {\n  background: #F2524C;\n}\n\n.painter-tools .tabs-background {\n  background: #EEB000;\n}\n\n.painter-tools .tabs-layers {\n  background: #44BFD2;\n}\n\n.painter-canvas-wrapper {\n  position: relative;\n  width: calc(100% - 8px);\n  height: calc(100% - 8px);\n  background-image: url(\"//o44j7l4g3.qnssl.com/program/painter/grid.png\");\n\n  border: 4px solid rgba(198, 177, 155, 0.60);\n  border-radius: 4px;\n}\n\n.stage-size {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  margin-left: -155px;\n  margin-top: -225px;\n  width: 310px;\n  height: 450px;\n  background-image: url('//o44j7l4g3.qnssl.com/program/painter/stage-size.png');\n  opacity: 0.5;\n  pointer-events: none;\n}\n\n.control-panel {\n  width: 100%;\n  height: 100%;\n\n  display: -webkit-box;\n\n  display: -ms-flexbox;\n\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  -webkit-box-pack: start;\n      -ms-flex-pack: start;\n          justify-content: flex-start;\n  -webkit-box-align: start;\n      -ms-flex-align: start;\n          align-items: flex-start;\n\n  background-color: #F8F8F8;\n}\n\n/*.control-buttons-container {*/\n/*width: 100%;*/\n/*height: 100%;*/\n/*}*/\n\n.tools-costume {\n  width: 100%;\n  height: 100%;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n\n  background: #E1D6BE;\n}\n\n.tools-costume input {\n  width: auto;\n  height: auto;\n}\n\n.painter-title {\n  margin: 8px;\n  margin: 0.5rem;\n  padding: 8px;\n  padding: 0.5rem;\n  background: #ECE2CA;\n  border: 1px solid #DDD0C3;\n  border-radius: 4px;\n  font-family: STHeitiSC-Light, serif;\n  font-size: 14px;\n  color: #6D4C41;\n}\n\n.painter-title:focus {\n  outline: none;\n}\n\n.costume-buttons {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: justify;\n      -ms-flex-pack: justify;\n          justify-content: space-between;\n\n  margin: 0 8px;\n  margin: 0 0.5rem;\n\n  cursor: pointer;\n}\n\n.costume-buttons img {\n  max-width: 100%;\n  max-height: 100%;\n}\n", ""]);
	
	// exports


/***/ },
/* 7 */
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
/* 8 */
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
/* 9 */
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
	      valueRangesOrder = ['rgb', 'hsv', 'hsl', 'cmy', 'cmyk', 'Lab', 'XYZ', 'alpha', 'HEX'],
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
	        keys = valueRangesOrder,
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
	      for (var i = 0; i < keys.length; i++) {
	        var typ = keys[i];
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
	          mod = ~~h % 6,
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
	          i = ~~h,
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
	          sextant = ~~h,
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
/* 10 */
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
/* 11 */
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
/* 12 */
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
	      return elm.value || elm.getAttribute('value') || elm.style.backgroundColor || '#DDDDDD';
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
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	__webpack_require__(14);
	__webpack_require__(15);
	__webpack_require__(16);
	__webpack_require__(17);
	__webpack_require__(18);
	__webpack_require__(19);
	__webpack_require__(20);
	__webpack_require__(21);
	__webpack_require__(22);
	__webpack_require__(24);
	__webpack_require__(25);
	__webpack_require__(26);
	__webpack_require__(27);
	var Brush_1 = __webpack_require__(28);
	var Shape_1 = __webpack_require__(29);
	//  todo: use modules
	var global = window;
	var FabricCanvas = (function () {
	    function FabricCanvas() {
	        this.shape_offset = 0;
	    }
	    Object.defineProperty(FabricCanvas.prototype, "canvas", {
	        get: function () {
	            return this._canvas;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    FabricCanvas.prototype.init = function (element, wrapper_element) {
	        this._canvas = new global.fabric.Canvas(element);
	        this.set_canvas_size(wrapper_element.clientWidth, wrapper_element.clientHeight);
	        this.canvas.setFreeDrawingBrush(Brush_1.Brush[Brush_1.Brush.pencil], {
	            width: 5,
	            color: '#333',
	            opacity: 1,
	        });
	        this.canvas.setDrawingMode(true);
	    };
	    /**
	     * Set size of the fabric canvas
	     * @param width
	     * @param height
	     */
	    FabricCanvas.prototype.set_canvas_size = function (width, height) {
	        this._canvas.setWidth(width);
	        this._canvas.setHeight(height);
	        this._canvas.layerManager.setBackgroundImageURL();
	    };
	    /**
	     * Select color and set fabric color.
	     * @param color
	     */
	    FabricCanvas.prototype.select_color = function (color) {
	        if (this._canvas) {
	            if (this._canvas.freeDrawingBrush) {
	                this._canvas.freeDrawingBrush.color = color;
	            }
	        }
	    };
	    FabricCanvas.prototype.set_brush = function (brush, width, color) {
	        if (brush === void 0) { brush = Brush_1.Brush.pointer; }
	        if (width === void 0) { width = 7; }
	        if (color === void 0) { color = '#333'; }
	        if (brush !== Brush_1.Brush.pointer) {
	            this.canvas.deactivateAll();
	            this.canvas.renderAll();
	            this.canvas.setFreeDrawingBrush(Brush_1.Brush[brush], {
	                width: width,
	                color: color,
	            });
	            this.canvas.setDrawingMode(true);
	            this.last_shape = undefined;
	        }
	        else {
	            this.canvas.setDrawingMode(false);
	        }
	    };
	    FabricCanvas.prototype.add_shape = function (shape, width, color) {
	        if (width === void 0) { width = 7; }
	        if (color === void 0) { color = '#333'; }
	        var shape_object;
	        this.set_brush();
	        if (shape === this.last_shape) {
	            this.shape_offset += 10;
	        }
	        else {
	            this.shape_offset = 0;
	        }
	        switch (shape) {
	            case Shape_1.Shape.rect:
	                shape_object = new global.fabric.Rect({
	                    left: this.canvas.getWidth() / 2 - width * 5 + this.shape_offset,
	                    top: this.canvas.getHeight() / 2 - width * 5 + this.shape_offset,
	                    fill: color,
	                    width: width * 10,
	                    height: width * 10,
	                });
	                break;
	            case Shape_1.Shape.round:
	                shape_object = new global.fabric.Circle({
	                    left: this.canvas.getWidth() / 2 - width * 5 + this.shape_offset,
	                    top: this.canvas.getHeight() / 2 - width * 5 + this.shape_offset,
	                    fill: color,
	                    radius: width * 10,
	                });
	                break;
	            case Shape_1.Shape.triangle:
	                shape_object = new global.fabric.Triangle({
	                    left: this.canvas.getWidth() / 2 - width * 5 + this.shape_offset,
	                    top: this.canvas.getHeight() / 2 - width * 5 + this.shape_offset,
	                    fill: color,
	                    width: width * 10,
	                    height: width * 10,
	                });
	                break;
	            case Shape_1.Shape.text:
	                var text = '点我选中文字，在画布下方可以修改文字内容和样式哦~';
	                shape_object = new global.fabric.Text(text, {
	                    left: this.canvas.getWidth() / 2 + this.shape_offset,
	                    top: this.canvas.getHeight() / 2 + this.shape_offset,
	                    fontFamily: 'Microsoft YaHei',
	                    angle: 0,
	                    fill: color,
	                    scaleX: 1,
	                    scaleY: 1,
	                    fontWeight: '',
	                    originX: 'center',
	                    originY: 'center',
	                    hasRotatingPoint: true,
	                    centerTransform: true,
	                });
	                break;
	            default:
	                throw (new Error('Shape not found!'));
	        }
	        this.canvas.add(shape_object);
	        this.canvas.setActiveObject(shape_object);
	        this.canvas.fire('path:created', { path: shape_object });
	        this.last_shape = shape;
	    };
	    FabricCanvas.prototype.add_image = function (url, x, y) {
	        var _this = this;
	        var image = global.fabric.Image.fromURL(url, function (image) {
	            image.set({
	                left: x || 0,
	                top: y || 0,
	                angle: 0,
	            }).scale(1).setCoords();
	            _this.canvas.add(image);
	            _this.canvas.renderAll();
	        }, { crossOrigin: '*' });
	    };
	    FabricCanvas.prototype.set_rotate_center = function (point) {
	        this.canvas.rotationPoint = point;
	    };
	    FabricCanvas.prototype.get_rotate_center = function () {
	        return this.canvas.rotationPoint;
	    };
	    FabricCanvas.prototype.clear = function () {
	        this.canvas.clear();
	    };
	    FabricCanvas.prototype.get_canvas_width = function () {
	        return this.canvas.width;
	    };
	    FabricCanvas.prototype.get_canvas_height = function () {
	        return this.canvas.height;
	    };
	    FabricCanvas.prototype.get_base64_data_url = function () {
	        var param = {};
	        this.canvas.setDrawingMode(false);
	        this.canvas.layerManager.combineAllLayers();
	        var activeObj = this.canvas.getActiveObject();
	        var activeGroup = this.canvas.getActiveGroup();
	        if (activeGroup) {
	            var objectsInGroup = activeGroup.getObjects();
	            this.canvas.discardActiveGroup();
	            objectsInGroup.forEach(function (obj) {
	                obj.active = false;
	            });
	        }
	        if (activeObj) {
	            activeObj.active = false;
	        }
	        this.canvas.renderAll();
	        this.canvas.setZoom(1);
	        var data = document.createElement('canvas');
	        data.width = this.canvas.lowerCanvasEl.width;
	        data.height = this.canvas.lowerCanvasEl.height;
	        data.getContext('2d').imageSmoothingEnabled = false;
	        data.getContext('2d').drawImage(this.canvas.lowerCanvasEl, 0, 0);
	        return data.toDataURL();
	    };
	    return FabricCanvas;
	}());
	exports.fabric_canvas = new FabricCanvas();


/***/ },
/* 14 */
/***/ function(module, exports) {

	"use strict";
	
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
/* 15 */
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
	    var objects = this._objects.slice();
	    if (this.layerManager) {
	      this.layerManager.clearLayers();
	    }
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
	    this.fire('canvas:cleared', { objects: objects });
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
	    this.cursorCanvasEl.style.pointerEvents = 'none';
	
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
	      case 'rotate_center':
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
	
	  /**
	   * @private
	   * @param {Event} e Event object
	   * @param {fabric.Object} target
	   */
	  fabric.Canvas.prototype._setupCurrentTransform = function (e, target) {
	    if (!target) {
	      return;
	    }
	
	    var pointer = this.getPointer(e),
	        corner = target._findTargetCorner(this.getPointer(e, true)),
	        action = this._getActionFromCorner(target, corner, e),
	        origin = this._getOriginFromCorner(target, corner);
	
	    this._currentTransform = {
	      target: target,
	      action: action,
	      corner: corner,
	      scaleX: target.scaleX,
	      scaleY: target.scaleY,
	      skewX: target.skewX,
	      skewY: target.skewY,
	      offsetX: pointer.x - target.left,
	      offsetY: pointer.y - target.top,
	      originX: origin.x,
	      originY: origin.y,
	      ex: pointer.x,
	      ey: pointer.y,
	      lastX: pointer.x,
	      lastY: pointer.y,
	      left: target.left,
	      top: target.top,
	      theta: fabric.util.radiansToDegrees(target.angle),
	      width: target.width * target.scaleX,
	      mouseXSign: 1,
	      mouseYSign: 1,
	      shiftKey: e.shiftKey,
	      altKey: e.altKey
	    };
	
	    this._currentTransform.original = {
	      angle: target.angle,
	      left: target.left,
	      top: target.top,
	      scaleX: target.scaleX,
	      scaleY: target.scaleY,
	      skewX: target.skewX,
	      skewY: target.skewY,
	      originX: origin.x,
	      originY: origin.y
	    };
	
	    this._resetCurrentTransform();
	  };
	})(fabric);

/***/ },
/* 16 */
/***/ function(module, exports) {

	'use strict';
	
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
	
	  fabric.Canvas.prototype._finalizeCurrentTransform = function () {
	    var transform = this._currentTransform;
	    var target = transform.target;
	    // const oldTop = target.top;
	    // const oldLeft = target.left;
	
	    if (target._scaling) {
	      target._scaling = false;
	    }
	
	    target.setCoords();
	
	    // only fire :modified event if target coordinates were changed during mousedown-mouseup
	    if (this.stateful && target.hasStateChanged()) {
	      this.fire('object:modified', {
	        target: target,
	        newTop: target.top,
	        newLeft: target.left,
	        newAngle: target.angle,
	        newScaleX: target.scaleX,
	        newScaleY: target.scaleY,
	        oldTop: transform.original.top,
	        oldLeft: transform.original.left,
	        oldAngle: transform.original.angle,
	        oldScaleX: transform.original.scaleX,
	        oldScaleY: transform.original.scaleY,
	        action: transform.action
	      });
	      target.fire('modified');
	    }
	
	    this._restoreOriginXY(target);
	  };
	})();

/***/ },
/* 17 */
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
/* 18 */
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
	
	    if (this.shadow) {
	      this.shadow.affectStroke = true;
	      path.setShadow(this.shadow);
	    }
	
	    return path;
	  };
	})();

/***/ },
/* 19 */
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
	      this.undoStack = [];
	      this.redoStack = [];
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
/* 20 */
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
/* 21 */
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
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(23);
	
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
	        myself.canvas.fire('eraser:done', {
	          objects: currentLayer.objects.slice(),
	          image: image
	        });
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
/* 23 */
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
	                y = ~~(i / 4 / c.width);
	
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
/* 24 */
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
/* 25 */
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
/* 26 */
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
	      this.canvas.fire('path:created', { path: rect });
	    }
	  }]);
	
	  return RectBrush;
	}(fabric.LineBrush);
	
	Object.assign(fabric, {
	  RectBrush: RectBrush
	});

/***/ },
/* 27 */
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
	      this.canvas.fire('path:created', { path: round });
	    }
	  }]);
	
	  return RoundBrush;
	}(fabric.RectBrush);
	
	Object.assign(fabric, {
	  RoundBrush: RoundBrush
	});

/***/ },
/* 28 */
/***/ function(module, exports) {

	"use strict";
	(function (Brush) {
	    Brush[Brush["pointer"] = 0] = "pointer";
	    Brush[Brush["pencil"] = 1] = "pencil";
	    Brush[Brush["line"] = 2] = "line";
	    Brush[Brush["rotate_center"] = 3] = "rotate_center";
	    Brush[Brush["eraser"] = 4] = "eraser";
	})(exports.Brush || (exports.Brush = {}));
	var Brush = exports.Brush;


/***/ },
/* 29 */
/***/ function(module, exports) {

	"use strict";
	(function (Shape) {
	    Shape[Shape["rect"] = 0] = "rect";
	    Shape[Shape["round"] = 1] = "round";
	    Shape[Shape["triangle"] = 2] = "triangle";
	    Shape[Shape["text"] = 3] = "text";
	})(exports.Shape || (exports.Shape = {}));
	var Shape = exports.Shape;


/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var React = __webpack_require__(2);
	__webpack_require__(31);
	var config_1 = __webpack_require__(33);
	var ColorButton_1 = __webpack_require__(34);
	var PaintingActions_1 = __webpack_require__(46);
	var fabric_canvas_1 = __webpack_require__(13);
	var Brush_1 = __webpack_require__(28);
	var Shape_1 = __webpack_require__(29);
	var PaintingPanel = (function (_super) {
	    __extends(PaintingPanel, _super);
	    function PaintingPanel() {
	        _super.apply(this, arguments);
	    }
	    PaintingPanel.select_brush = function (brush) {
	        if (brush === void 0) { brush = Brush_1.Brush.pointer; }
	        fabric_canvas_1.fabric_canvas.set_brush(brush);
	        PaintingActions_1.PaintingActions.select_brush(brush);
	    };
	    PaintingPanel.add_shape = function (shape) {
	        PaintingPanel.select_brush();
	        fabric_canvas_1.fabric_canvas.add_shape(shape);
	    };
	    PaintingPanel.prototype.render = function () {
	        var _this = this;
	        var default_colors = config_1.config.default_colors.map(function (value) {
	            return React.createElement(ColorButton_1.ColorButton, {key: value, color: value, checked: value === _this.props.current_color});
	        });
	        return React.createElement("div", {className: "tools-painting"}, React.createElement("div", {className: "tools-buttons-container"}, React.createElement("div", {title: "画笔", className: "tools-button tools-pencil", onClick: PaintingPanel.select_brush.bind(this, Brush_1.Brush.pencil)}, React.createElement("img", {className: "button-img", src: "//o44j7l4g3.qnssl.com/program/painter/pencil.png", alt: "笔"}), React.createElement("img", {className: "button-img-on", src: "//o44j7l4g3.qnssl.com/program/painter/pencil-on.png", alt: "笔"})), React.createElement("div", {title: "直线", className: "tools-button tools-line", onClick: PaintingPanel.select_brush.bind(this, Brush_1.Brush.line)}, React.createElement("img", {className: "button-img", src: "//o44j7l4g3.qnssl.com/program/painter/line.png", alt: "线"}), React.createElement("img", {className: "button-img-on", src: "//o44j7l4g3.qnssl.com/program/painter/line-on.png", alt: "线"})), React.createElement("div", {title: "矩形", className: "tools-button tools-rect", onClick: PaintingPanel.add_shape.bind(this, Shape_1.Shape.rect)}, React.createElement("img", {className: "button-img", src: "//o44j7l4g3.qnssl.com/program/painter/rect.png", alt: "方"}), React.createElement("img", {className: "button-img-on", src: "//o44j7l4g3.qnssl.com/program/painter/rect-on.png", alt: "方"})), React.createElement("div", {title: "圆形", className: "tools-button tools-round", onClick: PaintingPanel.add_shape.bind(this, Shape_1.Shape.round)}, React.createElement("img", {className: "button-img", src: "//o44j7l4g3.qnssl.com/program/painter/round.png", alt: "圆"}), React.createElement("img", {className: "button-img-on", src: "//o44j7l4g3.qnssl.com/program/painter/round-on.png", alt: "圆"})), React.createElement("div", {title: "三角", className: "tools-button tools-triangle", onClick: PaintingPanel.add_shape.bind(this, Shape_1.Shape.triangle)}, React.createElement("img", {className: "button-img", src: "//o44j7l4g3.qnssl.com/program/painter/triangle-off.png", alt: "角"}), React.createElement("img", {className: "button-img-on", src: "//o44j7l4g3.qnssl.com/program/painter/triangle-on.png", alt: "圆"}))), React.createElement("div", {className: "tools-buttons-container"}, React.createElement("div", {title: "橡皮", className: "tools-button tools-eraser", onClick: PaintingPanel.select_brush.bind(this, Brush_1.Brush.eraser)}, React.createElement("img", {className: "button-img", src: "//o44j7l4g3.qnssl.com/program/painter/eraser.png", alt: "橡"}), React.createElement("img", {className: "button-img-on", src: "//o44j7l4g3.qnssl.com/program/painter/eraser-on.png", alt: "橡"})), React.createElement("div", {title: "选择", className: "tools-button tools-select", onClick: PaintingPanel.select_brush.bind(this, Brush_1.Brush.pointer)}, React.createElement("img", {className: "button-img", src: "//o44j7l4g3.qnssl.com/program/painter/select.png", alt: "选"}), React.createElement("img", {className: "button-img-on", src: "//o44j7l4g3.qnssl.com/program/painter/select-on.png", alt: "选"})), React.createElement("div", {title: "文字", className: "tools-button tools-text", onClick: PaintingPanel.add_shape.bind(this, Shape_1.Shape.text)}, React.createElement("img", {className: "button-img", src: "//o44j7l4g3.qnssl.com/program/painter/text.png", alt: "字"}), React.createElement("img", {className: "button-img-on", src: "//o44j7l4g3.qnssl.com/program/painter/text-on.png", alt: "字"})), React.createElement("div", {title: "旋转中心", className: "tools-button tools-select", onClick: PaintingPanel.select_brush.bind(this, Brush_1.Brush.rotate_center)}, React.createElement("img", {className: "button-img", src: "//o44j7l4g3.qnssl.com/program/painter/rotation.png", alt: "中"}), React.createElement("img", {className: "button-img-on", src: "//o44j7l4g3.qnssl.com/program/painter/rotation-on.png", alt: "中"}))), React.createElement("div", {className: "tools-slider-container"}, React.createElement("span", {className: "tools-container-title"}, "粗细"), React.createElement("span", {className: "input-minus"}, "-"), React.createElement("input", {title: "粗细", type: "range", value: "7", min: "1", max: "100", step: "1"}), React.createElement("span", {className: "input-plus"}, "+")), React.createElement("div", {className: "tools-item"}, React.createElement("span", {className: "item-title"}, "颜色"), React.createElement("input", {title: "颜色", type: "color", className: "color"})), React.createElement("div", {className: "tools-area"}, default_colors));
	    };
	    return PaintingPanel;
	}(React.Component));
	exports.PaintingPanel = PaintingPanel;


/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(32);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(8)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/postcss-loader/index.js!./painter-tools-painting.css", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/postcss-loader/index.js!./painter-tools-painting.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(7)();
	// imports
	
	
	// module
	exports.push([module.id, ".tools-painting {\n  width: 100%;\n  height: calc(100% - 2rem);\n\n  display: -webkit-box;\n\n  display: -ms-flexbox;\n\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-pack: start;\n      -ms-flex-pack: start;\n          justify-content: flex-start;\n\n  padding: 16px 0;\n  padding: 1rem 0;\n\n  background-color: #ECE7DD;\n}\n\n.tools-buttons-container {\n  width: 90%;\n  height: 44.8px;\n  height: 2.8rem;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-pack: start;\n      -ms-flex-pack: start;\n          justify-content: flex-start;\n\n  margin: 2% 0;\n  border-radius: 8px;\n  background: #E2D7BE;;\n}\n\n.tools-button {\n  height: 40px;\n  height: 2.5rem;\n  width: 40px;\n  width: 2.5rem;\n\n  display: -webkit-box;\n\n  display: -ms-flexbox;\n\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n\n  margin: 0 1.6px;\n  margin: 0 0.1rem;\n\n  cursor: pointer;\n}\n\n.tools-button img {\n  max-height: 100%;\n  max-width: 100%;\n  pointer-events: none;\n}\n\n.tools-button.active .button-img {\n  display: none;\n}\n\n.tools-button.active .button-img-on {\n  display: block;\n}\n\n.tools-button .button-img-on {\n  display: none;\n}\n\n.tools-button:active .button-img {\n  display: none;\n}\n\n.tools-button:active .button-img-on {\n  display: block;\n}\n\n.tools-slider-container {\n  width: 90%;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-pack: start;\n      -ms-flex-pack: start;\n          justify-content: flex-start;\n  margin: 8px 0;\n  margin: 0.5rem 0;\n\n  font-family: STHeitiTC-Medium, serif;\n  font-size: 18px;\n  color: #645542;\n}\n\n.tools-slider-container .tools-container-title {\n  margin-right: 8%;\n\n  font-family: STHeitiTC-Medium, serif;\n  font-size: 18px;\n  color: #645542;\n}\n\n.tools-slider-container input {\n  width: 40%;\n\n  margin: 1.6px;\n  margin: 0.1rem;\n  -webkit-box-flex: 1;\n      -ms-flex-positive: 1;\n          flex-grow: 1;\n}\n\n.tools-slider-container span {\n  font-family: STHeitiTC-Medium, serif;\n  font-size: 18px;\n  color: #645542;\n}\n\n.tools-slider-container .number-input {\n  width: 32px;\n  width: 2rem;\n\n  margin-left: 4%;\n\n  font-family: STHeitiTC-Medium, serif;\n  font-size: 14px;\n  color: #645542;\n}\n\n.input-plus {\n  margin-bottom: -3%;\n}\n\n.input-minus {\n  margin-bottom: -1%;\n}\n\n.tools-item {\n  width: 90%;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n\n  margin: 8px 0;\n  margin: 0.5rem 0;\n}\n\n.item-title {\n  margin-right: 8%;\n\n  font-family: STHeitiTC-Medium, serif;\n  font-size: 18px;\n  color: #645542;\n}\n\n.tools-item input.color {\n  width: 60%;\n\n  background: #8B572A;\n  border: 4px solid #FFFFFF;\n  border: 2px solid #AA9278;\n  box-shadow: inset 0px -2px 0px 0px rgba(0, 0, 0, 0.30);\n  border-radius: 4px;\n\n  cursor: pointer;\n}\n\n.tools-item input:focus {\n  outline: none;\n}\n\n.tools-area {\n  width: calc(90% - 0.2rem);\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: justify;\n      -ms-flex-pack: justify;\n          justify-content: space-between;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -ms-flex-wrap: wrap;\n      flex-wrap: wrap;\n\n  margin: 8px 0;\n  margin: 0.5rem 0;\n  padding: 16px 1.6px;\n  padding: 1rem 0.1rem;\n\n  background: #E1D6BE;\n  border-radius: 8px;\n}\n\n.tools-default-color {\n  height: 32px;\n  height: 2rem;\n  width: 32px;\n  width: 2rem;\n\n  margin: 3.2px;\n  margin: 0.2rem;\n\n  border: 1px solid rgba(0, 0, 0, 0.37);\n  border-radius: 1.1rem;\n  box-shadow: inset 0 1px 2px 0 rgba(0, 0, 0, 0.50);\n\n  cursor: pointer;\n}", ""]);
	
	// exports


/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var Brush_1 = __webpack_require__(28);
	exports.config = {
	    control_buttons: [
	        {
	            title: '撤销',
	            action: 'undo',
	            className: ['undo'],
	        },
	        {
	            title: '重做',
	            action: 'redo',
	            className: ['redo'],
	        },
	        {
	            title: '清空画布',
	            action: 'clear',
	            className: ['clear'],
	        },
	    ],
	    default_colors: [
	        '#D0021B', '#F5A623', '#8B572A', '#7ED321', '#417505',
	        '#BD10E0', '#9013FE', '#4A90E2', '#50E3C2', '#B8E986',
	        '#000', '#4A4A4A', '#9B9B9B', '#D3D3D3', '#FFF',
	    ],
	    default_states: {
	        panel_type: 'painting',
	        current_color: '#333',
	        current_width: 7,
	        current_brush: Brush_1.Brush.pencil,
	        line_width: {
	            pencil: 7,
	            pointer: 7,
	            line: '#333'
	        },
	        brush_color: {
	            pencil: '#333',
	            pointer: '#333',
	            line: '#333'
	        },
	    },
	};


/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var React = __webpack_require__(2);
	__webpack_require__(35);
	var ColorButtonActions_1 = __webpack_require__(37);
	var fabric_canvas_1 = __webpack_require__(13);
	var ColorButton = (function (_super) {
	    __extends(ColorButton, _super);
	    function ColorButton() {
	        _super.apply(this, arguments);
	    }
	    ColorButton.prototype.on_click_color = function () {
	        fabric_canvas_1.fabric_canvas.select_color(this.props.color);
	        ColorButtonActions_1.colorButtonActions.select_color(this.props.color);
	    };
	    ColorButton.prototype.render = function () {
	        var style = {
	            backgroundColor: this.props.color
	        };
	        return React.createElement("div", {className: "tools-default-color", style: style, onClick: this.on_click_color.bind(this)});
	    };
	    return ColorButton;
	}(React.Component));
	exports.ColorButton = ColorButton;


/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(36);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(8)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/postcss-loader/index.js!./ControlButton.css", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/postcss-loader/index.js!./ControlButton.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(7)();
	// imports
	
	
	// module
	exports.push([module.id, ".control-panel .control-button {\n  width: 60%;\n  height: 60%;\n  max-height: 96px;\n  max-height: 6rem;\n\n  margin: 10%;\n\n  background-repeat: no-repeat;\n  background-size: contain;\n\n  cursor: pointer;\n}\n\n.clear {\n  background-image: url('//o44j7l4g3.qnssl.com/program/painter/clear.png');\n}\n\n.clear:hover {\n  background-image: url('//o44j7l4g3.qnssl.com/program/painter/clear-hover.png');\n}\n\n.undo {\n  background-image: url('//o44j7l4g3.qnssl.com/program/painter/undo.png');\n}\n\n.undo:hover {\n  background-image: url('//o44j7l4g3.qnssl.com/program/painter/undo-hover.png ');\n}\n\n.redo {\n  background-image: url('//o44j7l4g3.qnssl.com/program/painter/redo.png');\n}\n\n.redo:hover {\n  background-image: url('//o44j7l4g3.qnssl.com/program/painter/redo-hover.png ');\n}", ""]);
	
	// exports


/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Actions_1 = __webpack_require__(38);
	var ColorButtonActions = (function (_super) {
	    __extends(ColorButtonActions, _super);
	    function ColorButtonActions() {
	        _super.apply(this, arguments);
	    }
	    ColorButtonActions.prototype.select_color = function (color) {
	        Actions_1.Actions.dispatch_action({
	            action_type: 'select_color',
	            color: color,
	        });
	    };
	    return ColorButtonActions;
	}(Actions_1.Actions));
	exports.ColorButtonActions = ColorButtonActions;
	exports.colorButtonActions = new ColorButtonActions();


/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var painter_dispatcher_1 = __webpack_require__(39);
	var Actions = (function () {
	    function Actions() {
	    }
	    Actions.dispatch_action = function (payload) {
	        painter_dispatcher_1.painter_dispatcher.dispatch(payload);
	    };
	    return Actions;
	}());
	exports.Actions = Actions;


/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var flux_1 = __webpack_require__(40);
	var painterStore_1 = __webpack_require__(44);
	var action_list = {
	    'select_color': function (payload) {
	        painterStore_1.painterStore.select_color_handler(payload.color);
	        painterStore_1.painterStore.emit_change();
	    },
	    'select_brush': function (payload) {
	        painterStore_1.painterStore.select_brush_handler(payload.brush);
	        painterStore_1.painterStore.emit_change();
	    },
	    'add_shape': function () {
	        painterStore_1.painterStore.select_brush_handler();
	        painterStore_1.painterStore.emit_change();
	    }
	};
	var painter_dispatcher = new flux_1.Dispatcher();
	exports.painter_dispatcher = painter_dispatcher;
	painter_dispatcher.register(function (payload) {
	    action_list[payload.action_type](payload);
	});


/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	/**
	 * Copyright (c) 2014-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 */
	
	module.exports.Dispatcher = __webpack_require__(41);

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright (c) 2014-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule Dispatcher
	 * 
	 * @preventMunge
	 */
	
	'use strict';
	
	exports.__esModule = true;
	
	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError('Cannot call a class as a function');
	  }
	}
	
	var invariant = __webpack_require__(43);
	
	var _prefix = 'ID_';
	
	/**
	 * Dispatcher is used to broadcast payloads to registered callbacks. This is
	 * different from generic pub-sub systems in two ways:
	 *
	 *   1) Callbacks are not subscribed to particular events. Every payload is
	 *      dispatched to every registered callback.
	 *   2) Callbacks can be deferred in whole or part until other callbacks have
	 *      been executed.
	 *
	 * For example, consider this hypothetical flight destination form, which
	 * selects a default city when a country is selected:
	 *
	 *   var flightDispatcher = new Dispatcher();
	 *
	 *   // Keeps track of which country is selected
	 *   var CountryStore = {country: null};
	 *
	 *   // Keeps track of which city is selected
	 *   var CityStore = {city: null};
	 *
	 *   // Keeps track of the base flight price of the selected city
	 *   var FlightPriceStore = {price: null}
	 *
	 * When a user changes the selected city, we dispatch the payload:
	 *
	 *   flightDispatcher.dispatch({
	 *     actionType: 'city-update',
	 *     selectedCity: 'paris'
	 *   });
	 *
	 * This payload is digested by `CityStore`:
	 *
	 *   flightDispatcher.register(function(payload) {
	 *     if (payload.actionType === 'city-update') {
	 *       CityStore.city = payload.selectedCity;
	 *     }
	 *   });
	 *
	 * When the user selects a country, we dispatch the payload:
	 *
	 *   flightDispatcher.dispatch({
	 *     actionType: 'country-update',
	 *     selectedCountry: 'australia'
	 *   });
	 *
	 * This payload is digested by both stores:
	 *
	 *   CountryStore.dispatchToken = flightDispatcher.register(function(payload) {
	 *     if (payload.actionType === 'country-update') {
	 *       CountryStore.country = payload.selectedCountry;
	 *     }
	 *   });
	 *
	 * When the callback to update `CountryStore` is registered, we save a reference
	 * to the returned token. Using this token with `waitFor()`, we can guarantee
	 * that `CountryStore` is updated before the callback that updates `CityStore`
	 * needs to query its data.
	 *
	 *   CityStore.dispatchToken = flightDispatcher.register(function(payload) {
	 *     if (payload.actionType === 'country-update') {
	 *       // `CountryStore.country` may not be updated.
	 *       flightDispatcher.waitFor([CountryStore.dispatchToken]);
	 *       // `CountryStore.country` is now guaranteed to be updated.
	 *
	 *       // Select the default city for the new country
	 *       CityStore.city = getDefaultCityForCountry(CountryStore.country);
	 *     }
	 *   });
	 *
	 * The usage of `waitFor()` can be chained, for example:
	 *
	 *   FlightPriceStore.dispatchToken =
	 *     flightDispatcher.register(function(payload) {
	 *       switch (payload.actionType) {
	 *         case 'country-update':
	 *         case 'city-update':
	 *           flightDispatcher.waitFor([CityStore.dispatchToken]);
	 *           FlightPriceStore.price =
	 *             getFlightPriceStore(CountryStore.country, CityStore.city);
	 *           break;
	 *     }
	 *   });
	 *
	 * The `country-update` payload will be guaranteed to invoke the stores'
	 * registered callbacks in order: `CountryStore`, `CityStore`, then
	 * `FlightPriceStore`.
	 */
	
	var Dispatcher = function () {
	  function Dispatcher() {
	    _classCallCheck(this, Dispatcher);
	
	    this._callbacks = {};
	    this._isDispatching = false;
	    this._isHandled = {};
	    this._isPending = {};
	    this._lastID = 1;
	  }
	
	  /**
	   * Registers a callback to be invoked with every dispatched payload. Returns
	   * a token that can be used with `waitFor()`.
	   */
	
	  Dispatcher.prototype.register = function register(callback) {
	    var id = _prefix + this._lastID++;
	    this._callbacks[id] = callback;
	    return id;
	  };
	
	  /**
	   * Removes a callback based on its token.
	   */
	
	  Dispatcher.prototype.unregister = function unregister(id) {
	    !this._callbacks[id] ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Dispatcher.unregister(...): `%s` does not map to a registered callback.', id) : invariant(false) : undefined;
	    delete this._callbacks[id];
	  };
	
	  /**
	   * Waits for the callbacks specified to be invoked before continuing execution
	   * of the current callback. This method should only be used by a callback in
	   * response to a dispatched payload.
	   */
	
	  Dispatcher.prototype.waitFor = function waitFor(ids) {
	    !this._isDispatching ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Dispatcher.waitFor(...): Must be invoked while dispatching.') : invariant(false) : undefined;
	    for (var ii = 0; ii < ids.length; ii++) {
	      var id = ids[ii];
	      if (this._isPending[id]) {
	        !this._isHandled[id] ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Dispatcher.waitFor(...): Circular dependency detected while ' + 'waiting for `%s`.', id) : invariant(false) : undefined;
	        continue;
	      }
	      !this._callbacks[id] ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Dispatcher.waitFor(...): `%s` does not map to a registered callback.', id) : invariant(false) : undefined;
	      this._invokeCallback(id);
	    }
	  };
	
	  /**
	   * Dispatches a payload to all registered callbacks.
	   */
	
	  Dispatcher.prototype.dispatch = function dispatch(payload) {
	    !!this._isDispatching ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Dispatch.dispatch(...): Cannot dispatch in the middle of a dispatch.') : invariant(false) : undefined;
	    this._startDispatching(payload);
	    try {
	      for (var id in this._callbacks) {
	        if (this._isPending[id]) {
	          continue;
	        }
	        this._invokeCallback(id);
	      }
	    } finally {
	      this._stopDispatching();
	    }
	  };
	
	  /**
	   * Is this Dispatcher currently dispatching.
	   */
	
	  Dispatcher.prototype.isDispatching = function isDispatching() {
	    return this._isDispatching;
	  };
	
	  /**
	   * Call the callback stored with the given id. Also do some internal
	   * bookkeeping.
	   *
	   * @internal
	   */
	
	  Dispatcher.prototype._invokeCallback = function _invokeCallback(id) {
	    this._isPending[id] = true;
	    this._callbacks[id](this._pendingPayload);
	    this._isHandled[id] = true;
	  };
	
	  /**
	   * Set up bookkeeping needed when dispatching.
	   *
	   * @internal
	   */
	
	  Dispatcher.prototype._startDispatching = function _startDispatching(payload) {
	    for (var id in this._callbacks) {
	      this._isPending[id] = false;
	      this._isHandled[id] = false;
	    }
	    this._pendingPayload = payload;
	    this._isDispatching = true;
	  };
	
	  /**
	   * Clear bookkeeping used for dispatching.
	   *
	   * @internal
	   */
	
	  Dispatcher.prototype._stopDispatching = function _stopDispatching() {
	    delete this._pendingPayload;
	    this._isDispatching = false;
	  };
	
	  return Dispatcher;
	}();
	
	module.exports = Dispatcher;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(42)))

/***/ },
/* 42 */
/***/ function(module, exports) {

	'use strict';
	
	// shim for using process in browser
	
	var process = module.exports = {};
	
	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.
	
	var cachedSetTimeout;
	var cachedClearTimeout;
	
	(function () {
	    try {
	        cachedSetTimeout = setTimeout;
	    } catch (e) {
	        cachedSetTimeout = function cachedSetTimeout() {
	            throw new Error('setTimeout is not defined');
	        };
	    }
	    try {
	        cachedClearTimeout = clearTimeout;
	    } catch (e) {
	        cachedClearTimeout = function cachedClearTimeout() {
	            throw new Error('clearTimeout is not defined');
	        };
	    }
	})();
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;
	
	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
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
	    var timeout = cachedSetTimeout(cleanUpNextTick);
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
	    cachedClearTimeout(timeout);
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
	        cachedSetTimeout(drainQueue, 0);
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
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule invariant
	 */
	
	"use strict";
	
	/**
	 * Use invariant() to assert state which your program assumes to be true.
	 *
	 * Provide sprintf-style format (only %s is supported) and arguments
	 * to provide information about what broke and what you were
	 * expecting.
	 *
	 * The invariant message will be stripped in production, but the invariant
	 * will remain to ensure logic does not differ in production.
	 */
	
	var invariant = function invariant(condition, format, a, b, c, d, e, f) {
	  if (process.env.NODE_ENV !== 'production') {
	    if (format === undefined) {
	      throw new Error('invariant requires an error message argument');
	    }
	  }
	
	  if (!condition) {
	    var error;
	    if (format === undefined) {
	      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
	    } else {
	      var args = [a, b, c, d, e, f];
	      var argIndex = 0;
	      error = new Error('Invariant Violation: ' + format.replace(/%s/g, function () {
	        return args[argIndex++];
	      }));
	    }
	
	    error.framesToPop = 1; // we don't care about invariant's own frame
	    throw error;
	  }
	};
	
	module.exports = invariant;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(42)))

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var config_1 = __webpack_require__(33);
	var EventEmitter = __webpack_require__(45);
	var Brush_1 = __webpack_require__(28);
	var PainterStore = (function (_super) {
	    __extends(PainterStore, _super);
	    function PainterStore() {
	        _super.call(this);
	        this._states = config_1.config.default_states;
	    }
	    Object.defineProperty(PainterStore.prototype, "states", {
	        get: function () {
	            return this._states;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    PainterStore.prototype.select_color_handler = function (color) {
	        this._states.current_color = color;
	    };
	    PainterStore.prototype.select_brush_handler = function (brush) {
	        if (brush === void 0) { brush = Brush_1.Brush.pointer; }
	        this._states.current_brush = brush;
	    };
	    // emit_select_color() {
	    //   this.emit('select_color');
	    // }
	    PainterStore.prototype.emit_change = function () {
	        this.emit('change');
	    };
	    PainterStore.prototype.add_change_listener = function (callback) {
	        this.on('change', callback);
	    };
	    PainterStore.prototype.remove_change_listener = function (callback) {
	        this.removeListener('change', callback);
	    };
	    return PainterStore;
	}(EventEmitter));
	exports.painterStore = new PainterStore();


/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var has = Object.prototype.hasOwnProperty;
	
	//
	// We store our EE objects in a plain object whose properties are event names.
	// If `Object.create(null)` is not supported we prefix the event names with a
	// `~` to make sure that the built-in object properties are not overridden or
	// used as an attack vector.
	// We also assume that `Object.create(null)` is available when the event name
	// is an ES6 Symbol.
	//
	var prefix = typeof Object.create !== 'function' ? '~' : false;
	
	/**
	 * Representation of a single EventEmitter function.
	 *
	 * @param {Function} fn Event handler to be called.
	 * @param {Mixed} context Context for function execution.
	 * @param {Boolean} [once=false] Only emit once
	 * @api private
	 */
	function EE(fn, context, once) {
	  this.fn = fn;
	  this.context = context;
	  this.once = once || false;
	}
	
	/**
	 * Minimal EventEmitter interface that is molded against the Node.js
	 * EventEmitter interface.
	 *
	 * @constructor
	 * @api public
	 */
	function EventEmitter() {} /* Nothing to set */
	
	/**
	 * Hold the assigned EventEmitters by name.
	 *
	 * @type {Object}
	 * @private
	 */
	EventEmitter.prototype._events = undefined;
	
	/**
	 * Return an array listing the events for which the emitter has registered
	 * listeners.
	 *
	 * @returns {Array}
	 * @api public
	 */
	EventEmitter.prototype.eventNames = function eventNames() {
	  var events = this._events,
	      names = [],
	      name;
	
	  if (!events) return names;
	
	  for (name in events) {
	    if (has.call(events, name)) names.push(prefix ? name.slice(1) : name);
	  }
	
	  if (Object.getOwnPropertySymbols) {
	    return names.concat(Object.getOwnPropertySymbols(events));
	  }
	
	  return names;
	};
	
	/**
	 * Return a list of assigned event listeners.
	 *
	 * @param {String} event The events that should be listed.
	 * @param {Boolean} exists We only need to know if there are listeners.
	 * @returns {Array|Boolean}
	 * @api public
	 */
	EventEmitter.prototype.listeners = function listeners(event, exists) {
	  var evt = prefix ? prefix + event : event,
	      available = this._events && this._events[evt];
	
	  if (exists) return !!available;
	  if (!available) return [];
	  if (available.fn) return [available.fn];
	
	  for (var i = 0, l = available.length, ee = new Array(l); i < l; i++) {
	    ee[i] = available[i].fn;
	  }
	
	  return ee;
	};
	
	/**
	 * Emit an event to all registered event listeners.
	 *
	 * @param {String} event The name of the event.
	 * @returns {Boolean} Indication if we've emitted an event.
	 * @api public
	 */
	EventEmitter.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
	  var evt = prefix ? prefix + event : event;
	
	  if (!this._events || !this._events[evt]) return false;
	
	  var listeners = this._events[evt],
	      len = arguments.length,
	      args,
	      i;
	
	  if ('function' === typeof listeners.fn) {
	    if (listeners.once) this.removeListener(event, listeners.fn, undefined, true);
	
	    switch (len) {
	      case 1:
	        return listeners.fn.call(listeners.context), true;
	      case 2:
	        return listeners.fn.call(listeners.context, a1), true;
	      case 3:
	        return listeners.fn.call(listeners.context, a1, a2), true;
	      case 4:
	        return listeners.fn.call(listeners.context, a1, a2, a3), true;
	      case 5:
	        return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;
	      case 6:
	        return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
	    }
	
	    for (i = 1, args = new Array(len - 1); i < len; i++) {
	      args[i - 1] = arguments[i];
	    }
	
	    listeners.fn.apply(listeners.context, args);
	  } else {
	    var length = listeners.length,
	        j;
	
	    for (i = 0; i < length; i++) {
	      if (listeners[i].once) this.removeListener(event, listeners[i].fn, undefined, true);
	
	      switch (len) {
	        case 1:
	          listeners[i].fn.call(listeners[i].context);break;
	        case 2:
	          listeners[i].fn.call(listeners[i].context, a1);break;
	        case 3:
	          listeners[i].fn.call(listeners[i].context, a1, a2);break;
	        default:
	          if (!args) for (j = 1, args = new Array(len - 1); j < len; j++) {
	            args[j - 1] = arguments[j];
	          }
	
	          listeners[i].fn.apply(listeners[i].context, args);
	      }
	    }
	  }
	
	  return true;
	};
	
	/**
	 * Register a new EventListener for the given event.
	 *
	 * @param {String} event Name of the event.
	 * @param {Function} fn Callback function.
	 * @param {Mixed} [context=this] The context of the function.
	 * @api public
	 */
	EventEmitter.prototype.on = function on(event, fn, context) {
	  var listener = new EE(fn, context || this),
	      evt = prefix ? prefix + event : event;
	
	  if (!this._events) this._events = prefix ? {} : Object.create(null);
	  if (!this._events[evt]) this._events[evt] = listener;else {
	    if (!this._events[evt].fn) this._events[evt].push(listener);else this._events[evt] = [this._events[evt], listener];
	  }
	
	  return this;
	};
	
	/**
	 * Add an EventListener that's only called once.
	 *
	 * @param {String} event Name of the event.
	 * @param {Function} fn Callback function.
	 * @param {Mixed} [context=this] The context of the function.
	 * @api public
	 */
	EventEmitter.prototype.once = function once(event, fn, context) {
	  var listener = new EE(fn, context || this, true),
	      evt = prefix ? prefix + event : event;
	
	  if (!this._events) this._events = prefix ? {} : Object.create(null);
	  if (!this._events[evt]) this._events[evt] = listener;else {
	    if (!this._events[evt].fn) this._events[evt].push(listener);else this._events[evt] = [this._events[evt], listener];
	  }
	
	  return this;
	};
	
	/**
	 * Remove event listeners.
	 *
	 * @param {String} event The event we want to remove.
	 * @param {Function} fn The listener that we need to find.
	 * @param {Mixed} context Only remove listeners matching this context.
	 * @param {Boolean} once Only remove once listeners.
	 * @api public
	 */
	EventEmitter.prototype.removeListener = function removeListener(event, fn, context, once) {
	  var evt = prefix ? prefix + event : event;
	
	  if (!this._events || !this._events[evt]) return this;
	
	  var listeners = this._events[evt],
	      events = [];
	
	  if (fn) {
	    if (listeners.fn) {
	      if (listeners.fn !== fn || once && !listeners.once || context && listeners.context !== context) {
	        events.push(listeners);
	      }
	    } else {
	      for (var i = 0, length = listeners.length; i < length; i++) {
	        if (listeners[i].fn !== fn || once && !listeners[i].once || context && listeners[i].context !== context) {
	          events.push(listeners[i]);
	        }
	      }
	    }
	  }
	
	  //
	  // Reset the array, or remove it completely if we have no more listeners.
	  //
	  if (events.length) {
	    this._events[evt] = events.length === 1 ? events[0] : events;
	  } else {
	    delete this._events[evt];
	  }
	
	  return this;
	};
	
	/**
	 * Remove all listeners or only the listeners for the specified event.
	 *
	 * @param {String} event The event want to remove all listeners for.
	 * @api public
	 */
	EventEmitter.prototype.removeAllListeners = function removeAllListeners(event) {
	  if (!this._events) return this;
	
	  if (event) delete this._events[prefix ? prefix + event : event];else this._events = prefix ? {} : Object.create(null);
	
	  return this;
	};
	
	//
	// Alias methods names because people roll like that.
	//
	EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
	EventEmitter.prototype.addListener = EventEmitter.prototype.on;
	
	//
	// This function doesn't apply anymore.
	//
	EventEmitter.prototype.setMaxListeners = function setMaxListeners() {
	  return this;
	};
	
	//
	// Expose the prefix.
	//
	EventEmitter.prefixed = prefix;
	
	//
	// Expose the module.
	//
	if (true) {
	  module.exports = EventEmitter;
	}

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Actions_1 = __webpack_require__(38);
	var PaintingActions = (function (_super) {
	    __extends(PaintingActions, _super);
	    function PaintingActions() {
	        _super.apply(this, arguments);
	    }
	    PaintingActions.select_brush = function (brush) {
	        Actions_1.Actions.dispatch_action({
	            action_type: 'select_brush',
	            brush: brush,
	        });
	    };
	    PaintingActions.add_shape = function () {
	        Actions_1.Actions.dispatch_action({
	            action_type: 'add_shape'
	        });
	    };
	    return PaintingActions;
	}(Actions_1.Actions));
	exports.PaintingActions = PaintingActions;


/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var React = __webpack_require__(2);
	__webpack_require__(48);
	var ObjectPanel = (function (_super) {
	    __extends(ObjectPanel, _super);
	    function ObjectPanel() {
	        _super.apply(this, arguments);
	    }
	    ObjectPanel.prototype.render = function () {
	        //  todo: will use this panel soon
	        // return <div className="painter-object-panel">
	        //   <input title="颜色" className="color object-color"/>
	        //   <label className="object-opacity"> 透明度 -
	        //     <input title=" 透明度" type="range" min="0" max="1" step="0.01"/>+
	        //     <span>Opacity</span>
	        //   </label>
	        //   <input title="字号" type="number" className="font-size"/>
	        //   <textarea className="object-text" title="文字内容"/>
	        //   <div title="删除对象" className="remove-button">
	        //     <img src="//o44j7l4g3.qnssl.com/program/painter/delete.png" alt="删除对象"/>
	        //   </div>
	        // </div>;
	        return React.createElement("div", {className: "painter-object-panel"});
	    };
	    return ObjectPanel;
	}(React.Component));
	exports.ObjectPanel = ObjectPanel;


/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(49);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(8)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/postcss-loader/index.js!./ObjectPanel.css", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/postcss-loader/index.js!./ObjectPanel.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(7)();
	// imports
	
	
	// module
	exports.push([module.id, ".painter-object-panel {\n  width: 85%;\n  height: calc(10% - 1rem);\n  padding: 8px;\n  padding: 0.5rem;\n  background-color: #F8F8F8;\n\n  display: -webkit-box;\n\n  display: -ms-flexbox;\n\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n\n  -ms-flex-negative: 0;\n\n      flex-shrink: 0;\n}\n\n.painter-object-panel .object-color {\n  width: 32px;\n  width: 2rem;\n  height: 24px;\n  height: 1.5rem;\n  color: transparent;\n\n  background: #8B572A;\n  border: 4px solid #FFFFFF;\n  border: 2px solid #DDD0C3;\n  box-shadow: inset 0 -2px 0 0 rgba(0, 0, 0, 0.30);\n  border-radius: 4px;\n\n  cursor: pointer;\n}\n\n.painter-object-panel .object-opacity {\n  /*width: 14rem;*/\n  margin: 0 8px;\n  margin: 0 0.5rem;\n\n  font-family: STHeitiTC-Medium, serif;\n  font-size: 18px;\n  color: #645542;\n}\n\n.painter-object-panel .object-opacity input {\n  width: 100px;\n  width: 6.25rem;\n}\n\n.painter-object-panel .object-opacity span {\n  display: inline-block;\n\n  width: 35.2px;\n  width: 2.2rem;\n  margin-left: 8px;\n  margin-left: 0.5rem;\n  text-align: center;\n}\n\n.painter-object-panel .font-size {\n  width: 51.2px;\n  width: 3.2rem;\n  height: 24px;\n  height: 1.5rem;\n\n  margin: 0 8px;\n  margin: 0 0.5rem;\n\n  background: #FFFFFF;\n  border: 4px solid #FFFFFF;\n  border: 2px solid #DDD0C3;\n  border-radius: 4px;\n\n  font-family: STHeitiTC-Medium, serif;\n  font-size: 18px;\n  color: #645542;\n\n  text-align: center;\n}\n\n.painter-object-panel .font-size:focus {\n  outline: none;\n}\n\n.painter-object-panel .object-text {\n  width: 240px;\n  width: 15rem;\n  height: 48px;\n  height: 3rem;\n  max-width: 320px;\n  max-width: 20rem;\n  max-height: 56px;\n  max-height: 3.5rem;\n\n  margin: 0 8px;\n  margin: 0 0.5rem;\n}\n\n.painter-object-panel .remove-button {\n  float: right;\n\n  font-family: STHeitiTC-Medium, serif;\n  font-size: 18px;\n  color: #645542;\n\n  cursor: pointer;\n}", ""]);
	
	// exports


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map