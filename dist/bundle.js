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
/******/ 	__webpack_require__.p = "http://localhost:8080/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);
	__webpack_require__(74);
	module.exports = __webpack_require__(75);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__resourceQuery) {var url = __webpack_require__(2);
	var SockJS = __webpack_require__(9);
	var stripAnsi = __webpack_require__(72);
	var scriptElements = document.getElementsByTagName("script");
	var scriptHost = scriptElements[scriptElements.length-1].getAttribute("src").replace(/\/[^\/]+$/, "");
	
	// If this bundle is inlined, use the resource query to get the correct url.
	// Else, get the url from the <script> this file was called with.
	var urlParts = url.parse( true ?
		__resourceQuery.substr(1) :
		(scriptHost ? scriptHost : "/")
	);
	
	var sock = null;
	var hot = false;
	var initial = true;
	var currentHash = "";
	
	var onSocketMsg = {
		hot: function() {
			hot = true;
			console.log("[WDS] Hot Module Replacement enabled.");
		},
		invalid: function() {
			console.log("[WDS] App updated. Recompiling...");
		},
		hash: function(hash) {
			currentHash = hash;
		},
		"still-ok": function() {
			console.log("[WDS] Nothing changed.")
		},
		ok: function() {
			if(initial) return initial = false;
			reloadApp();
		},
		warnings: function(warnings) {
			console.log("[WDS] Warnings while compiling.");
			for(var i = 0; i < warnings.length; i++)
				console.warn(stripAnsi(warnings[i]));
			if(initial) return initial = false;
			reloadApp();
		},
		errors: function(errors) {
			console.log("[WDS] Errors while compiling.");
			for(var i = 0; i < errors.length; i++)
				console.error(stripAnsi(errors[i]));
			if(initial) return initial = false;
			reloadApp();
		},
		"proxy-error": function(errors) {
			console.log("[WDS] Proxy error.");
			for(var i = 0; i < errors.length; i++)
				console.error(stripAnsi(errors[i]));
			if(initial) return initial = false;
			reloadApp();
		}
	};
	
	var newConnection = function() {
		sock = new SockJS(url.format({
			protocol: urlParts.protocol,
			auth: urlParts.auth,
			hostname: (urlParts.hostname === '0.0.0.0') ? window.location.hostname : urlParts.hostname,
			port: urlParts.port,
			pathname: urlParts.path === '/' ? "/sockjs-node" : urlParts.path
		}));
	
		sock.onclose = function() {
			console.error("[WDS] Disconnected!");
	
			// Try to reconnect.
			sock = null;
			setTimeout(function () {
				newConnection();
			}, 2000);
		};
	
		sock.onmessage = function(e) {
			// This assumes that all data sent via the websocket is JSON.
			var msg = JSON.parse(e.data);
			onSocketMsg[msg.type](msg.data);
		};
	};
	
	newConnection();
	
	function reloadApp() {
		if(hot) {
			console.log("[WDS] App hot update...");
			window.postMessage("webpackHotUpdate" + currentHash, "*");
		} else {
			console.log("[WDS] App updated. Reloading...");
			window.location.reload();
		}
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, "?http://localhost:8080"))

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.
	
	var punycode = __webpack_require__(3);
	
	exports.parse = urlParse;
	exports.resolve = urlResolve;
	exports.resolveObject = urlResolveObject;
	exports.format = urlFormat;
	
	exports.Url = Url;
	
	function Url() {
	  this.protocol = null;
	  this.slashes = null;
	  this.auth = null;
	  this.host = null;
	  this.port = null;
	  this.hostname = null;
	  this.hash = null;
	  this.search = null;
	  this.query = null;
	  this.pathname = null;
	  this.path = null;
	  this.href = null;
	}
	
	// Reference: RFC 3986, RFC 1808, RFC 2396
	
	// define these here so at least they only have to be
	// compiled once on the first module load.
	var protocolPattern = /^([a-z0-9.+-]+:)/i,
	    portPattern = /:[0-9]*$/,
	
	
	// RFC 2396: characters reserved for delimiting URLs.
	// We actually just auto-escape these.
	delims = ['<', '>', '"', '`', ' ', '\r', '\n', '\t'],
	
	
	// RFC 2396: characters not allowed for various reasons.
	unwise = ['{', '}', '|', '\\', '^', '`'].concat(delims),
	
	
	// Allowed by RFCs, but cause of XSS attacks.  Always escape these.
	autoEscape = ['\''].concat(unwise),
	
	// Characters that are never ever allowed in a hostname.
	// Note that any invalid chars are also handled, but these
	// are the ones that are *expected* to be seen, so we fast-path
	// them.
	nonHostChars = ['%', '/', '?', ';', '#'].concat(autoEscape),
	    hostEndingChars = ['/', '?', '#'],
	    hostnameMaxLen = 255,
	    hostnamePartPattern = /^[a-z0-9A-Z_-]{0,63}$/,
	    hostnamePartStart = /^([a-z0-9A-Z_-]{0,63})(.*)$/,
	
	// protocols that can allow "unsafe" and "unwise" chars.
	unsafeProtocol = {
	  'javascript': true,
	  'javascript:': true
	},
	
	// protocols that never have a hostname.
	hostlessProtocol = {
	  'javascript': true,
	  'javascript:': true
	},
	
	// protocols that always contain a // bit.
	slashedProtocol = {
	  'http': true,
	  'https': true,
	  'ftp': true,
	  'gopher': true,
	  'file': true,
	  'http:': true,
	  'https:': true,
	  'ftp:': true,
	  'gopher:': true,
	  'file:': true
	},
	    querystring = __webpack_require__(6);
	
	function urlParse(url, parseQueryString, slashesDenoteHost) {
	  if (url && isObject(url) && url instanceof Url) return url;
	
	  var u = new Url();
	  u.parse(url, parseQueryString, slashesDenoteHost);
	  return u;
	}
	
	Url.prototype.parse = function (url, parseQueryString, slashesDenoteHost) {
	  if (!isString(url)) {
	    throw new TypeError("Parameter 'url' must be a string, not " + (typeof url === 'undefined' ? 'undefined' : _typeof(url)));
	  }
	
	  var rest = url;
	
	  // trim before proceeding.
	  // This is to support parse stuff like "  http://foo.com  \n"
	  rest = rest.trim();
	
	  var proto = protocolPattern.exec(rest);
	  if (proto) {
	    proto = proto[0];
	    var lowerProto = proto.toLowerCase();
	    this.protocol = lowerProto;
	    rest = rest.substr(proto.length);
	  }
	
	  // figure out if it's got a host
	  // user@server is *always* interpreted as a hostname, and url
	  // resolution will treat //foo/bar as host=foo,path=bar because that's
	  // how the browser resolves relative URLs.
	  if (slashesDenoteHost || proto || rest.match(/^\/\/[^@\/]+@[^@\/]+/)) {
	    var slashes = rest.substr(0, 2) === '//';
	    if (slashes && !(proto && hostlessProtocol[proto])) {
	      rest = rest.substr(2);
	      this.slashes = true;
	    }
	  }
	
	  if (!hostlessProtocol[proto] && (slashes || proto && !slashedProtocol[proto])) {
	
	    // there's a hostname.
	    // the first instance of /, ?, ;, or # ends the host.
	    //
	    // If there is an @ in the hostname, then non-host chars *are* allowed
	    // to the left of the last @ sign, unless some host-ending character
	    // comes *before* the @-sign.
	    // URLs are obnoxious.
	    //
	    // ex:
	    // http://a@b@c/ => user:a@b host:c
	    // http://a@b?@c => user:a host:c path:/?@c
	
	    // v0.12 TODO(isaacs): This is not quite how Chrome does things.
	    // Review our test case against browsers more comprehensively.
	
	    // find the first instance of any hostEndingChars
	    var hostEnd = -1;
	    for (var i = 0; i < hostEndingChars.length; i++) {
	      var hec = rest.indexOf(hostEndingChars[i]);
	      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd)) hostEnd = hec;
	    }
	
	    // at this point, either we have an explicit point where the
	    // auth portion cannot go past, or the last @ char is the decider.
	    var auth, atSign;
	    if (hostEnd === -1) {
	      // atSign can be anywhere.
	      atSign = rest.lastIndexOf('@');
	    } else {
	      // atSign must be in auth portion.
	      // http://a@b/c@d => host:b auth:a path:/c@d
	      atSign = rest.lastIndexOf('@', hostEnd);
	    }
	
	    // Now we have a portion which is definitely the auth.
	    // Pull that off.
	    if (atSign !== -1) {
	      auth = rest.slice(0, atSign);
	      rest = rest.slice(atSign + 1);
	      this.auth = decodeURIComponent(auth);
	    }
	
	    // the host is the remaining to the left of the first non-host char
	    hostEnd = -1;
	    for (var i = 0; i < nonHostChars.length; i++) {
	      var hec = rest.indexOf(nonHostChars[i]);
	      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd)) hostEnd = hec;
	    }
	    // if we still have not hit it, then the entire thing is a host.
	    if (hostEnd === -1) hostEnd = rest.length;
	
	    this.host = rest.slice(0, hostEnd);
	    rest = rest.slice(hostEnd);
	
	    // pull out port.
	    this.parseHost();
	
	    // we've indicated that there is a hostname,
	    // so even if it's empty, it has to be present.
	    this.hostname = this.hostname || '';
	
	    // if hostname begins with [ and ends with ]
	    // assume that it's an IPv6 address.
	    var ipv6Hostname = this.hostname[0] === '[' && this.hostname[this.hostname.length - 1] === ']';
	
	    // validate a little.
	    if (!ipv6Hostname) {
	      var hostparts = this.hostname.split(/\./);
	      for (var i = 0, l = hostparts.length; i < l; i++) {
	        var part = hostparts[i];
	        if (!part) continue;
	        if (!part.match(hostnamePartPattern)) {
	          var newpart = '';
	          for (var j = 0, k = part.length; j < k; j++) {
	            if (part.charCodeAt(j) > 127) {
	              // we replace non-ASCII char with a temporary placeholder
	              // we need this to make sure size of hostname is not
	              // broken by replacing non-ASCII by nothing
	              newpart += 'x';
	            } else {
	              newpart += part[j];
	            }
	          }
	          // we test again with ASCII char only
	          if (!newpart.match(hostnamePartPattern)) {
	            var validParts = hostparts.slice(0, i);
	            var notHost = hostparts.slice(i + 1);
	            var bit = part.match(hostnamePartStart);
	            if (bit) {
	              validParts.push(bit[1]);
	              notHost.unshift(bit[2]);
	            }
	            if (notHost.length) {
	              rest = '/' + notHost.join('.') + rest;
	            }
	            this.hostname = validParts.join('.');
	            break;
	          }
	        }
	      }
	    }
	
	    if (this.hostname.length > hostnameMaxLen) {
	      this.hostname = '';
	    } else {
	      // hostnames are always lower case.
	      this.hostname = this.hostname.toLowerCase();
	    }
	
	    if (!ipv6Hostname) {
	      // IDNA Support: Returns a puny coded representation of "domain".
	      // It only converts the part of the domain name that
	      // has non ASCII characters. I.e. it dosent matter if
	      // you call it with a domain that already is in ASCII.
	      var domainArray = this.hostname.split('.');
	      var newOut = [];
	      for (var i = 0; i < domainArray.length; ++i) {
	        var s = domainArray[i];
	        newOut.push(s.match(/[^A-Za-z0-9_-]/) ? 'xn--' + punycode.encode(s) : s);
	      }
	      this.hostname = newOut.join('.');
	    }
	
	    var p = this.port ? ':' + this.port : '';
	    var h = this.hostname || '';
	    this.host = h + p;
	    this.href += this.host;
	
	    // strip [ and ] from the hostname
	    // the host field still retains them, though
	    if (ipv6Hostname) {
	      this.hostname = this.hostname.substr(1, this.hostname.length - 2);
	      if (rest[0] !== '/') {
	        rest = '/' + rest;
	      }
	    }
	  }
	
	  // now rest is set to the post-host stuff.
	  // chop off any delim chars.
	  if (!unsafeProtocol[lowerProto]) {
	
	    // First, make 100% sure that any "autoEscape" chars get
	    // escaped, even if encodeURIComponent doesn't think they
	    // need to be.
	    for (var i = 0, l = autoEscape.length; i < l; i++) {
	      var ae = autoEscape[i];
	      var esc = encodeURIComponent(ae);
	      if (esc === ae) {
	        esc = escape(ae);
	      }
	      rest = rest.split(ae).join(esc);
	    }
	  }
	
	  // chop off from the tail first.
	  var hash = rest.indexOf('#');
	  if (hash !== -1) {
	    // got a fragment string.
	    this.hash = rest.substr(hash);
	    rest = rest.slice(0, hash);
	  }
	  var qm = rest.indexOf('?');
	  if (qm !== -1) {
	    this.search = rest.substr(qm);
	    this.query = rest.substr(qm + 1);
	    if (parseQueryString) {
	      this.query = querystring.parse(this.query);
	    }
	    rest = rest.slice(0, qm);
	  } else if (parseQueryString) {
	    // no query string, but parseQueryString still requested
	    this.search = '';
	    this.query = {};
	  }
	  if (rest) this.pathname = rest;
	  if (slashedProtocol[lowerProto] && this.hostname && !this.pathname) {
	    this.pathname = '/';
	  }
	
	  //to support http.request
	  if (this.pathname || this.search) {
	    var p = this.pathname || '';
	    var s = this.search || '';
	    this.path = p + s;
	  }
	
	  // finally, reconstruct the href based on what has been validated.
	  this.href = this.format();
	  return this;
	};
	
	// format a parsed object into a url string
	function urlFormat(obj) {
	  // ensure it's an object, and not a string url.
	  // If it's an obj, this is a no-op.
	  // this way, you can call url_format() on strings
	  // to clean up potentially wonky urls.
	  if (isString(obj)) obj = urlParse(obj);
	  if (!(obj instanceof Url)) return Url.prototype.format.call(obj);
	  return obj.format();
	}
	
	Url.prototype.format = function () {
	  var auth = this.auth || '';
	  if (auth) {
	    auth = encodeURIComponent(auth);
	    auth = auth.replace(/%3A/i, ':');
	    auth += '@';
	  }
	
	  var protocol = this.protocol || '',
	      pathname = this.pathname || '',
	      hash = this.hash || '',
	      host = false,
	      query = '';
	
	  if (this.host) {
	    host = auth + this.host;
	  } else if (this.hostname) {
	    host = auth + (this.hostname.indexOf(':') === -1 ? this.hostname : '[' + this.hostname + ']');
	    if (this.port) {
	      host += ':' + this.port;
	    }
	  }
	
	  if (this.query && isObject(this.query) && Object.keys(this.query).length) {
	    query = querystring.stringify(this.query);
	  }
	
	  var search = this.search || query && '?' + query || '';
	
	  if (protocol && protocol.substr(-1) !== ':') protocol += ':';
	
	  // only the slashedProtocols get the //.  Not mailto:, xmpp:, etc.
	  // unless they had them to begin with.
	  if (this.slashes || (!protocol || slashedProtocol[protocol]) && host !== false) {
	    host = '//' + (host || '');
	    if (pathname && pathname.charAt(0) !== '/') pathname = '/' + pathname;
	  } else if (!host) {
	    host = '';
	  }
	
	  if (hash && hash.charAt(0) !== '#') hash = '#' + hash;
	  if (search && search.charAt(0) !== '?') search = '?' + search;
	
	  pathname = pathname.replace(/[?#]/g, function (match) {
	    return encodeURIComponent(match);
	  });
	  search = search.replace('#', '%23');
	
	  return protocol + host + pathname + search + hash;
	};
	
	function urlResolve(source, relative) {
	  return urlParse(source, false, true).resolve(relative);
	}
	
	Url.prototype.resolve = function (relative) {
	  return this.resolveObject(urlParse(relative, false, true)).format();
	};
	
	function urlResolveObject(source, relative) {
	  if (!source) return relative;
	  return urlParse(source, false, true).resolveObject(relative);
	}
	
	Url.prototype.resolveObject = function (relative) {
	  if (isString(relative)) {
	    var rel = new Url();
	    rel.parse(relative, false, true);
	    relative = rel;
	  }
	
	  var result = new Url();
	  Object.keys(this).forEach(function (k) {
	    result[k] = this[k];
	  }, this);
	
	  // hash is always overridden, no matter what.
	  // even href="" will remove it.
	  result.hash = relative.hash;
	
	  // if the relative url is empty, then there's nothing left to do here.
	  if (relative.href === '') {
	    result.href = result.format();
	    return result;
	  }
	
	  // hrefs like //foo/bar always cut to the protocol.
	  if (relative.slashes && !relative.protocol) {
	    // take everything except the protocol from relative
	    Object.keys(relative).forEach(function (k) {
	      if (k !== 'protocol') result[k] = relative[k];
	    });
	
	    //urlParse appends trailing / to urls like http://www.example.com
	    if (slashedProtocol[result.protocol] && result.hostname && !result.pathname) {
	      result.path = result.pathname = '/';
	    }
	
	    result.href = result.format();
	    return result;
	  }
	
	  if (relative.protocol && relative.protocol !== result.protocol) {
	    // if it's a known url protocol, then changing
	    // the protocol does weird things
	    // first, if it's not file:, then we MUST have a host,
	    // and if there was a path
	    // to begin with, then we MUST have a path.
	    // if it is file:, then the host is dropped,
	    // because that's known to be hostless.
	    // anything else is assumed to be absolute.
	    if (!slashedProtocol[relative.protocol]) {
	      Object.keys(relative).forEach(function (k) {
	        result[k] = relative[k];
	      });
	      result.href = result.format();
	      return result;
	    }
	
	    result.protocol = relative.protocol;
	    if (!relative.host && !hostlessProtocol[relative.protocol]) {
	      var relPath = (relative.pathname || '').split('/');
	      while (relPath.length && !(relative.host = relPath.shift())) {}
	      if (!relative.host) relative.host = '';
	      if (!relative.hostname) relative.hostname = '';
	      if (relPath[0] !== '') relPath.unshift('');
	      if (relPath.length < 2) relPath.unshift('');
	      result.pathname = relPath.join('/');
	    } else {
	      result.pathname = relative.pathname;
	    }
	    result.search = relative.search;
	    result.query = relative.query;
	    result.host = relative.host || '';
	    result.auth = relative.auth;
	    result.hostname = relative.hostname || relative.host;
	    result.port = relative.port;
	    // to support http.request
	    if (result.pathname || result.search) {
	      var p = result.pathname || '';
	      var s = result.search || '';
	      result.path = p + s;
	    }
	    result.slashes = result.slashes || relative.slashes;
	    result.href = result.format();
	    return result;
	  }
	
	  var isSourceAbs = result.pathname && result.pathname.charAt(0) === '/',
	      isRelAbs = relative.host || relative.pathname && relative.pathname.charAt(0) === '/',
	      mustEndAbs = isRelAbs || isSourceAbs || result.host && relative.pathname,
	      removeAllDots = mustEndAbs,
	      srcPath = result.pathname && result.pathname.split('/') || [],
	      relPath = relative.pathname && relative.pathname.split('/') || [],
	      psychotic = result.protocol && !slashedProtocol[result.protocol];
	
	  // if the url is a non-slashed url, then relative
	  // links like ../.. should be able
	  // to crawl up to the hostname, as well.  This is strange.
	  // result.protocol has already been set by now.
	  // Later on, put the first path part into the host field.
	  if (psychotic) {
	    result.hostname = '';
	    result.port = null;
	    if (result.host) {
	      if (srcPath[0] === '') srcPath[0] = result.host;else srcPath.unshift(result.host);
	    }
	    result.host = '';
	    if (relative.protocol) {
	      relative.hostname = null;
	      relative.port = null;
	      if (relative.host) {
	        if (relPath[0] === '') relPath[0] = relative.host;else relPath.unshift(relative.host);
	      }
	      relative.host = null;
	    }
	    mustEndAbs = mustEndAbs && (relPath[0] === '' || srcPath[0] === '');
	  }
	
	  if (isRelAbs) {
	    // it's absolute.
	    result.host = relative.host || relative.host === '' ? relative.host : result.host;
	    result.hostname = relative.hostname || relative.hostname === '' ? relative.hostname : result.hostname;
	    result.search = relative.search;
	    result.query = relative.query;
	    srcPath = relPath;
	    // fall through to the dot-handling below.
	  } else if (relPath.length) {
	    // it's relative
	    // throw away the existing file, and take the new path instead.
	    if (!srcPath) srcPath = [];
	    srcPath.pop();
	    srcPath = srcPath.concat(relPath);
	    result.search = relative.search;
	    result.query = relative.query;
	  } else if (!isNullOrUndefined(relative.search)) {
	    // just pull out the search.
	    // like href='?foo'.
	    // Put this after the other two cases because it simplifies the booleans
	    if (psychotic) {
	      result.hostname = result.host = srcPath.shift();
	      //occationaly the auth can get stuck only in host
	      //this especialy happens in cases like
	      //url.resolveObject('mailto:local1@domain1', 'local2@domain2')
	      var authInHost = result.host && result.host.indexOf('@') > 0 ? result.host.split('@') : false;
	      if (authInHost) {
	        result.auth = authInHost.shift();
	        result.host = result.hostname = authInHost.shift();
	      }
	    }
	    result.search = relative.search;
	    result.query = relative.query;
	    //to support http.request
	    if (!isNull(result.pathname) || !isNull(result.search)) {
	      result.path = (result.pathname ? result.pathname : '') + (result.search ? result.search : '');
	    }
	    result.href = result.format();
	    return result;
	  }
	
	  if (!srcPath.length) {
	    // no path at all.  easy.
	    // we've already handled the other stuff above.
	    result.pathname = null;
	    //to support http.request
	    if (result.search) {
	      result.path = '/' + result.search;
	    } else {
	      result.path = null;
	    }
	    result.href = result.format();
	    return result;
	  }
	
	  // if a url ENDs in . or .., then it must get a trailing slash.
	  // however, if it ends in anything else non-slashy,
	  // then it must NOT get a trailing slash.
	  var last = srcPath.slice(-1)[0];
	  var hasTrailingSlash = (result.host || relative.host) && (last === '.' || last === '..') || last === '';
	
	  // strip single dots, resolve double dots to parent dir
	  // if the path tries to go above the root, `up` ends up > 0
	  var up = 0;
	  for (var i = srcPath.length; i >= 0; i--) {
	    last = srcPath[i];
	    if (last == '.') {
	      srcPath.splice(i, 1);
	    } else if (last === '..') {
	      srcPath.splice(i, 1);
	      up++;
	    } else if (up) {
	      srcPath.splice(i, 1);
	      up--;
	    }
	  }
	
	  // if the path is allowed to go above the root, restore leading ..s
	  if (!mustEndAbs && !removeAllDots) {
	    for (; up--; up) {
	      srcPath.unshift('..');
	    }
	  }
	
	  if (mustEndAbs && srcPath[0] !== '' && (!srcPath[0] || srcPath[0].charAt(0) !== '/')) {
	    srcPath.unshift('');
	  }
	
	  if (hasTrailingSlash && srcPath.join('/').substr(-1) !== '/') {
	    srcPath.push('');
	  }
	
	  var isAbsolute = srcPath[0] === '' || srcPath[0] && srcPath[0].charAt(0) === '/';
	
	  // put the host back
	  if (psychotic) {
	    result.hostname = result.host = isAbsolute ? '' : srcPath.length ? srcPath.shift() : '';
	    //occationaly the auth can get stuck only in host
	    //this especialy happens in cases like
	    //url.resolveObject('mailto:local1@domain1', 'local2@domain2')
	    var authInHost = result.host && result.host.indexOf('@') > 0 ? result.host.split('@') : false;
	    if (authInHost) {
	      result.auth = authInHost.shift();
	      result.host = result.hostname = authInHost.shift();
	    }
	  }
	
	  mustEndAbs = mustEndAbs || result.host && srcPath.length;
	
	  if (mustEndAbs && !isAbsolute) {
	    srcPath.unshift('');
	  }
	
	  if (!srcPath.length) {
	    result.pathname = null;
	    result.path = null;
	  } else {
	    result.pathname = srcPath.join('/');
	  }
	
	  //to support request.http
	  if (!isNull(result.pathname) || !isNull(result.search)) {
	    result.path = (result.pathname ? result.pathname : '') + (result.search ? result.search : '');
	  }
	  result.auth = relative.auth || result.auth;
	  result.slashes = result.slashes || relative.slashes;
	  result.href = result.format();
	  return result;
	};
	
	Url.prototype.parseHost = function () {
	  var host = this.host;
	  var port = portPattern.exec(host);
	  if (port) {
	    port = port[0];
	    if (port !== ':') {
	      this.port = port.substr(1);
	    }
	    host = host.substr(0, host.length - port.length);
	  }
	  if (host) this.hostname = host;
	};
	
	function isString(arg) {
	  return typeof arg === "string";
	}
	
	function isObject(arg) {
	  return (typeof arg === 'undefined' ? 'undefined' : _typeof(arg)) === 'object' && arg !== null;
	}
	
	function isNull(arg) {
	  return arg === null;
	}
	function isNullOrUndefined(arg) {
	  return arg == null;
	}

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(module, global) {'use strict';
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	/*! https://mths.be/punycode v1.3.2 by @mathias */
	;(function (root) {
	
		/** Detect free variables */
		var freeExports = ( false ? 'undefined' : _typeof(exports)) == 'object' && exports && !exports.nodeType && exports;
		var freeModule = ( false ? 'undefined' : _typeof(module)) == 'object' && module && !module.nodeType && module;
		var freeGlobal = (typeof global === 'undefined' ? 'undefined' : _typeof(global)) == 'object' && global;
		if (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal || freeGlobal.self === freeGlobal) {
			root = freeGlobal;
		}
	
		/**
	  * The `punycode` object.
	  * @name punycode
	  * @type Object
	  */
		var punycode,
	
	
		/** Highest positive signed 32-bit float value */
		maxInt = 2147483647,
		    // aka. 0x7FFFFFFF or 2^31-1
	
		/** Bootstring parameters */
		base = 36,
		    tMin = 1,
		    tMax = 26,
		    skew = 38,
		    damp = 700,
		    initialBias = 72,
		    initialN = 128,
		    // 0x80
		delimiter = '-',
		    // '\x2D'
	
		/** Regular expressions */
		regexPunycode = /^xn--/,
		    regexNonASCII = /[^\x20-\x7E]/,
		    // unprintable ASCII chars + non-ASCII chars
		regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g,
		    // RFC 3490 separators
	
		/** Error messages */
		errors = {
			'overflow': 'Overflow: input needs wider integers to process',
			'not-basic': 'Illegal input >= 0x80 (not a basic code point)',
			'invalid-input': 'Invalid input'
		},
	
	
		/** Convenience shortcuts */
		baseMinusTMin = base - tMin,
		    floor = Math.floor,
		    stringFromCharCode = String.fromCharCode,
	
	
		/** Temporary variable */
		key;
	
		/*--------------------------------------------------------------------------*/
	
		/**
	  * A generic error utility function.
	  * @private
	  * @param {String} type The error type.
	  * @returns {Error} Throws a `RangeError` with the applicable error message.
	  */
		function error(type) {
			throw RangeError(errors[type]);
		}
	
		/**
	  * A generic `Array#map` utility function.
	  * @private
	  * @param {Array} array The array to iterate over.
	  * @param {Function} callback The function that gets called for every array
	  * item.
	  * @returns {Array} A new array of values returned by the callback function.
	  */
		function map(array, fn) {
			var length = array.length;
			var result = [];
			while (length--) {
				result[length] = fn(array[length]);
			}
			return result;
		}
	
		/**
	  * A simple `Array#map`-like wrapper to work with domain name strings or email
	  * addresses.
	  * @private
	  * @param {String} domain The domain name or email address.
	  * @param {Function} callback The function that gets called for every
	  * character.
	  * @returns {Array} A new string of characters returned by the callback
	  * function.
	  */
		function mapDomain(string, fn) {
			var parts = string.split('@');
			var result = '';
			if (parts.length > 1) {
				// In email addresses, only the domain name should be punycoded. Leave
				// the local part (i.e. everything up to `@`) intact.
				result = parts[0] + '@';
				string = parts[1];
			}
			// Avoid `split(regex)` for IE8 compatibility. See #17.
			string = string.replace(regexSeparators, '\x2E');
			var labels = string.split('.');
			var encoded = map(labels, fn).join('.');
			return result + encoded;
		}
	
		/**
	  * Creates an array containing the numeric code points of each Unicode
	  * character in the string. While JavaScript uses UCS-2 internally,
	  * this function will convert a pair of surrogate halves (each of which
	  * UCS-2 exposes as separate characters) into a single code point,
	  * matching UTF-16.
	  * @see `punycode.ucs2.encode`
	  * @see <https://mathiasbynens.be/notes/javascript-encoding>
	  * @memberOf punycode.ucs2
	  * @name decode
	  * @param {String} string The Unicode input string (UCS-2).
	  * @returns {Array} The new array of code points.
	  */
		function ucs2decode(string) {
			var output = [],
			    counter = 0,
			    length = string.length,
			    value,
			    extra;
			while (counter < length) {
				value = string.charCodeAt(counter++);
				if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
					// high surrogate, and there is a next character
					extra = string.charCodeAt(counter++);
					if ((extra & 0xFC00) == 0xDC00) {
						// low surrogate
						output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
					} else {
						// unmatched surrogate; only append this code unit, in case the next
						// code unit is the high surrogate of a surrogate pair
						output.push(value);
						counter--;
					}
				} else {
					output.push(value);
				}
			}
			return output;
		}
	
		/**
	  * Creates a string based on an array of numeric code points.
	  * @see `punycode.ucs2.decode`
	  * @memberOf punycode.ucs2
	  * @name encode
	  * @param {Array} codePoints The array of numeric code points.
	  * @returns {String} The new Unicode string (UCS-2).
	  */
		function ucs2encode(array) {
			return map(array, function (value) {
				var output = '';
				if (value > 0xFFFF) {
					value -= 0x10000;
					output += stringFromCharCode(value >>> 10 & 0x3FF | 0xD800);
					value = 0xDC00 | value & 0x3FF;
				}
				output += stringFromCharCode(value);
				return output;
			}).join('');
		}
	
		/**
	  * Converts a basic code point into a digit/integer.
	  * @see `digitToBasic()`
	  * @private
	  * @param {Number} codePoint The basic numeric code point value.
	  * @returns {Number} The numeric value of a basic code point (for use in
	  * representing integers) in the range `0` to `base - 1`, or `base` if
	  * the code point does not represent a value.
	  */
		function basicToDigit(codePoint) {
			if (codePoint - 48 < 10) {
				return codePoint - 22;
			}
			if (codePoint - 65 < 26) {
				return codePoint - 65;
			}
			if (codePoint - 97 < 26) {
				return codePoint - 97;
			}
			return base;
		}
	
		/**
	  * Converts a digit/integer into a basic code point.
	  * @see `basicToDigit()`
	  * @private
	  * @param {Number} digit The numeric value of a basic code point.
	  * @returns {Number} The basic code point whose value (when used for
	  * representing integers) is `digit`, which needs to be in the range
	  * `0` to `base - 1`. If `flag` is non-zero, the uppercase form is
	  * used; else, the lowercase form is used. The behavior is undefined
	  * if `flag` is non-zero and `digit` has no uppercase form.
	  */
		function digitToBasic(digit, flag) {
			//  0..25 map to ASCII a..z or A..Z
			// 26..35 map to ASCII 0..9
			return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
		}
	
		/**
	  * Bias adaptation function as per section 3.4 of RFC 3492.
	  * http://tools.ietf.org/html/rfc3492#section-3.4
	  * @private
	  */
		function adapt(delta, numPoints, firstTime) {
			var k = 0;
			delta = firstTime ? floor(delta / damp) : delta >> 1;
			delta += floor(delta / numPoints);
			for (; /* no initialization */delta > baseMinusTMin * tMax >> 1; k += base) {
				delta = floor(delta / baseMinusTMin);
			}
			return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
		}
	
		/**
	  * Converts a Punycode string of ASCII-only symbols to a string of Unicode
	  * symbols.
	  * @memberOf punycode
	  * @param {String} input The Punycode string of ASCII-only symbols.
	  * @returns {String} The resulting string of Unicode symbols.
	  */
		function decode(input) {
			// Don't use UCS-2
			var output = [],
			    inputLength = input.length,
			    out,
			    i = 0,
			    n = initialN,
			    bias = initialBias,
			    basic,
			    j,
			    index,
			    oldi,
			    w,
			    k,
			    digit,
			    t,
	
			/** Cached calculation results */
			baseMinusT;
	
			// Handle the basic code points: let `basic` be the number of input code
			// points before the last delimiter, or `0` if there is none, then copy
			// the first basic code points to the output.
	
			basic = input.lastIndexOf(delimiter);
			if (basic < 0) {
				basic = 0;
			}
	
			for (j = 0; j < basic; ++j) {
				// if it's not a basic code point
				if (input.charCodeAt(j) >= 0x80) {
					error('not-basic');
				}
				output.push(input.charCodeAt(j));
			}
	
			// Main decoding loop: start just after the last delimiter if any basic code
			// points were copied; start at the beginning otherwise.
	
			for (index = basic > 0 ? basic + 1 : 0; index < inputLength;) /* no final expression */{
	
				// `index` is the index of the next character to be consumed.
				// Decode a generalized variable-length integer into `delta`,
				// which gets added to `i`. The overflow checking is easier
				// if we increase `i` as we go, then subtract off its starting
				// value at the end to obtain `delta`.
				for (oldi = i, w = 1, k = base;; /* no condition */k += base) {
	
					if (index >= inputLength) {
						error('invalid-input');
					}
	
					digit = basicToDigit(input.charCodeAt(index++));
	
					if (digit >= base || digit > floor((maxInt - i) / w)) {
						error('overflow');
					}
	
					i += digit * w;
					t = k <= bias ? tMin : k >= bias + tMax ? tMax : k - bias;
	
					if (digit < t) {
						break;
					}
	
					baseMinusT = base - t;
					if (w > floor(maxInt / baseMinusT)) {
						error('overflow');
					}
	
					w *= baseMinusT;
				}
	
				out = output.length + 1;
				bias = adapt(i - oldi, out, oldi == 0);
	
				// `i` was supposed to wrap around from `out` to `0`,
				// incrementing `n` each time, so we'll fix that now:
				if (floor(i / out) > maxInt - n) {
					error('overflow');
				}
	
				n += floor(i / out);
				i %= out;
	
				// Insert `n` at position `i` of the output
				output.splice(i++, 0, n);
			}
	
			return ucs2encode(output);
		}
	
		/**
	  * Converts a string of Unicode symbols (e.g. a domain name label) to a
	  * Punycode string of ASCII-only symbols.
	  * @memberOf punycode
	  * @param {String} input The string of Unicode symbols.
	  * @returns {String} The resulting Punycode string of ASCII-only symbols.
	  */
		function encode(input) {
			var n,
			    delta,
			    handledCPCount,
			    basicLength,
			    bias,
			    j,
			    m,
			    q,
			    k,
			    t,
			    currentValue,
			    output = [],
	
			/** `inputLength` will hold the number of code points in `input`. */
			inputLength,
	
			/** Cached calculation results */
			handledCPCountPlusOne,
			    baseMinusT,
			    qMinusT;
	
			// Convert the input in UCS-2 to Unicode
			input = ucs2decode(input);
	
			// Cache the length
			inputLength = input.length;
	
			// Initialize the state
			n = initialN;
			delta = 0;
			bias = initialBias;
	
			// Handle the basic code points
			for (j = 0; j < inputLength; ++j) {
				currentValue = input[j];
				if (currentValue < 0x80) {
					output.push(stringFromCharCode(currentValue));
				}
			}
	
			handledCPCount = basicLength = output.length;
	
			// `handledCPCount` is the number of code points that have been handled;
			// `basicLength` is the number of basic code points.
	
			// Finish the basic string - if it is not empty - with a delimiter
			if (basicLength) {
				output.push(delimiter);
			}
	
			// Main encoding loop:
			while (handledCPCount < inputLength) {
	
				// All non-basic code points < n have been handled already. Find the next
				// larger one:
				for (m = maxInt, j = 0; j < inputLength; ++j) {
					currentValue = input[j];
					if (currentValue >= n && currentValue < m) {
						m = currentValue;
					}
				}
	
				// Increase `delta` enough to advance the decoder's <n,i> state to <m,0>,
				// but guard against overflow
				handledCPCountPlusOne = handledCPCount + 1;
				if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
					error('overflow');
				}
	
				delta += (m - n) * handledCPCountPlusOne;
				n = m;
	
				for (j = 0; j < inputLength; ++j) {
					currentValue = input[j];
	
					if (currentValue < n && ++delta > maxInt) {
						error('overflow');
					}
	
					if (currentValue == n) {
						// Represent delta as a generalized variable-length integer
						for (q = delta, k = base;; /* no condition */k += base) {
							t = k <= bias ? tMin : k >= bias + tMax ? tMax : k - bias;
							if (q < t) {
								break;
							}
							qMinusT = q - t;
							baseMinusT = base - t;
							output.push(stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0)));
							q = floor(qMinusT / baseMinusT);
						}
	
						output.push(stringFromCharCode(digitToBasic(q, 0)));
						bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
						delta = 0;
						++handledCPCount;
					}
				}
	
				++delta;
				++n;
			}
			return output.join('');
		}
	
		/**
	  * Converts a Punycode string representing a domain name or an email address
	  * to Unicode. Only the Punycoded parts of the input will be converted, i.e.
	  * it doesn't matter if you call it on a string that has already been
	  * converted to Unicode.
	  * @memberOf punycode
	  * @param {String} input The Punycoded domain name or email address to
	  * convert to Unicode.
	  * @returns {String} The Unicode representation of the given Punycode
	  * string.
	  */
		function toUnicode(input) {
			return mapDomain(input, function (string) {
				return regexPunycode.test(string) ? decode(string.slice(4).toLowerCase()) : string;
			});
		}
	
		/**
	  * Converts a Unicode string representing a domain name or an email address to
	  * Punycode. Only the non-ASCII parts of the domain name will be converted,
	  * i.e. it doesn't matter if you call it with a domain that's already in
	  * ASCII.
	  * @memberOf punycode
	  * @param {String} input The domain name or email address to convert, as a
	  * Unicode string.
	  * @returns {String} The Punycode representation of the given domain name or
	  * email address.
	  */
		function toASCII(input) {
			return mapDomain(input, function (string) {
				return regexNonASCII.test(string) ? 'xn--' + encode(string) : string;
			});
		}
	
		/*--------------------------------------------------------------------------*/
	
		/** Define the public API */
		punycode = {
			/**
	   * A string representing the current Punycode.js version number.
	   * @memberOf punycode
	   * @type String
	   */
			'version': '1.3.2',
			/**
	   * An object of methods to convert from JavaScript's internal character
	   * representation (UCS-2) to Unicode code points, and back.
	   * @see <https://mathiasbynens.be/notes/javascript-encoding>
	   * @memberOf punycode
	   * @type Object
	   */
			'ucs2': {
				'decode': ucs2decode,
				'encode': ucs2encode
			},
			'decode': decode,
			'encode': encode,
			'toASCII': toASCII,
			'toUnicode': toUnicode
		};
	
		/** Expose `punycode` */
		// Some AMD build optimizers, like r.js, check for specific condition patterns
		// like the following:
		if ("function" == 'function' && _typeof(__webpack_require__(5)) == 'object' && __webpack_require__(5)) {
			!(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
				return punycode;
			}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		} else if (freeExports && freeModule) {
			if (module.exports == freeExports) {
				// in Node.js or RingoJS v0.8.0+
				freeModule.exports = punycode;
			} else {
				// in Narwhal or RingoJS v0.7.0-
				for (key in punycode) {
					punycode.hasOwnProperty(key) && (freeExports[key] = punycode[key]);
				}
			}
		} else {
			// in Rhino or a web browser
			root.punycode = punycode;
		}
	})(undefined);
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)(module), (function() { return this; }())))

/***/ },
/* 4 */
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
/* 5 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(__webpack_amd_options__) {module.exports = __webpack_amd_options__;
	
	/* WEBPACK VAR INJECTION */}.call(exports, {}))

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.decode = exports.parse = __webpack_require__(7);
	exports.encode = exports.stringify = __webpack_require__(8);

/***/ },
/* 7 */
/***/ function(module, exports) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.
	
	'use strict';
	
	// If obj.hasOwnProperty has been overridden, then calling
	// obj.hasOwnProperty(prop) will break.
	// See: https://github.com/joyent/node/issues/1707
	
	function hasOwnProperty(obj, prop) {
	  return Object.prototype.hasOwnProperty.call(obj, prop);
	}
	
	module.exports = function (qs, sep, eq, options) {
	  sep = sep || '&';
	  eq = eq || '=';
	  var obj = {};
	
	  if (typeof qs !== 'string' || qs.length === 0) {
	    return obj;
	  }
	
	  var regexp = /\+/g;
	  qs = qs.split(sep);
	
	  var maxKeys = 1000;
	  if (options && typeof options.maxKeys === 'number') {
	    maxKeys = options.maxKeys;
	  }
	
	  var len = qs.length;
	  // maxKeys <= 0 means that we should not limit keys count
	  if (maxKeys > 0 && len > maxKeys) {
	    len = maxKeys;
	  }
	
	  for (var i = 0; i < len; ++i) {
	    var x = qs[i].replace(regexp, '%20'),
	        idx = x.indexOf(eq),
	        kstr,
	        vstr,
	        k,
	        v;
	
	    if (idx >= 0) {
	      kstr = x.substr(0, idx);
	      vstr = x.substr(idx + 1);
	    } else {
	      kstr = x;
	      vstr = '';
	    }
	
	    k = decodeURIComponent(kstr);
	    v = decodeURIComponent(vstr);
	
	    if (!hasOwnProperty(obj, k)) {
	      obj[k] = v;
	    } else if (Array.isArray(obj[k])) {
	      obj[k].push(v);
	    } else {
	      obj[k] = [obj[k], v];
	    }
	  }
	
	  return obj;
	};

/***/ },
/* 8 */
/***/ function(module, exports) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.
	
	'use strict';
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	var stringifyPrimitive = function stringifyPrimitive(v) {
	  switch (typeof v === 'undefined' ? 'undefined' : _typeof(v)) {
	    case 'string':
	      return v;
	
	    case 'boolean':
	      return v ? 'true' : 'false';
	
	    case 'number':
	      return isFinite(v) ? v : '';
	
	    default:
	      return '';
	  }
	};
	
	module.exports = function (obj, sep, eq, name) {
	  sep = sep || '&';
	  eq = eq || '=';
	  if (obj === null) {
	    obj = undefined;
	  }
	
	  if ((typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object') {
	    return Object.keys(obj).map(function (k) {
	      var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
	      if (Array.isArray(obj[k])) {
	        return obj[k].map(function (v) {
	          return ks + encodeURIComponent(stringifyPrimitive(v));
	        }).join(sep);
	      } else {
	        return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
	      }
	    }).join(sep);
	  }
	
	  if (!name) return '';
	  return encodeURIComponent(stringifyPrimitive(name)) + eq + encodeURIComponent(stringifyPrimitive(obj));
	};

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';
	
	var transportList = __webpack_require__(10);
	
	module.exports = __webpack_require__(56)(transportList);
	
	// TODO can't get rid of this until all servers do
	if ('_sockjs_onload' in global) {
	  setTimeout(global._sockjs_onload, 1);
	}
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	module.exports = [
	// streaming transports
	__webpack_require__(11), __webpack_require__(28), __webpack_require__(38), __webpack_require__(40), __webpack_require__(43)(__webpack_require__(40))
	
	// polling transports
	, __webpack_require__(49), __webpack_require__(43)(__webpack_require__(49)), __webpack_require__(51), __webpack_require__(52), __webpack_require__(43)(__webpack_require__(51)), __webpack_require__(53)];

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';
	
	var utils = __webpack_require__(13),
	    urlUtils = __webpack_require__(16),
	    inherits = __webpack_require__(24),
	    EventEmitter = __webpack_require__(25).EventEmitter,
	    WebsocketDriver = __webpack_require__(27);
	
	var debug = function debug() {};
	if (process.env.NODE_ENV !== 'production') {
	  debug = __webpack_require__(21)('sockjs-client:websocket');
	}
	
	function WebSocketTransport(transUrl, ignore, options) {
	  if (!WebSocketTransport.enabled()) {
	    throw new Error('Transport created when disabled');
	  }
	
	  EventEmitter.call(this);
	  debug('constructor', transUrl);
	
	  var self = this;
	  var url = urlUtils.addPath(transUrl, '/websocket');
	  if (url.slice(0, 5) === 'https') {
	    url = 'wss' + url.slice(5);
	  } else {
	    url = 'ws' + url.slice(4);
	  }
	  this.url = url;
	
	  this.ws = new WebsocketDriver(this.url, [], options);
	  this.ws.onmessage = function (e) {
	    debug('message event', e.data);
	    self.emit('message', e.data);
	  };
	  // Firefox has an interesting bug. If a websocket connection is
	  // created after onunload, it stays alive even when user
	  // navigates away from the page. In such situation let's lie -
	  // let's not open the ws connection at all. See:
	  // https://github.com/sockjs/sockjs-client/issues/28
	  // https://bugzilla.mozilla.org/show_bug.cgi?id=696085
	  this.unloadRef = utils.unloadAdd(function () {
	    debug('unload');
	    self.ws.close();
	  });
	  this.ws.onclose = function (e) {
	    debug('close event', e.code, e.reason);
	    self.emit('close', e.code, e.reason);
	    self._cleanup();
	  };
	  this.ws.onerror = function (e) {
	    debug('error event', e);
	    self.emit('close', 1006, 'WebSocket connection broken');
	    self._cleanup();
	  };
	}
	
	inherits(WebSocketTransport, EventEmitter);
	
	WebSocketTransport.prototype.send = function (data) {
	  var msg = '[' + data + ']';
	  debug('send', msg);
	  this.ws.send(msg);
	};
	
	WebSocketTransport.prototype.close = function () {
	  debug('close');
	  if (this.ws) {
	    this.ws.close();
	  }
	  this._cleanup();
	};
	
	WebSocketTransport.prototype._cleanup = function () {
	  debug('_cleanup');
	  var ws = this.ws;
	  if (ws) {
	    ws.onmessage = ws.onclose = ws.onerror = null;
	  }
	  utils.unloadDel(this.unloadRef);
	  this.unloadRef = this.ws = null;
	  this.removeAllListeners();
	};
	
	WebSocketTransport.enabled = function () {
	  debug('enabled');
	  return !!WebsocketDriver;
	};
	WebSocketTransport.transportName = 'websocket';
	
	// In theory, ws should require 1 round trip. But in chrome, this is
	// not very stable over SSL. Most likely a ws connection requires a
	// separate SSL connection, in which case 2 round trips are an
	// absolute minumum.
	WebSocketTransport.roundTrips = 2;
	
	module.exports = WebSocketTransport;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(12)))

/***/ },
/* 12 */
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
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';
	
	var random = __webpack_require__(14);
	
	var onUnload = {},
	    afterUnload = false
	// detect google chrome packaged apps because they don't allow the 'unload' event
	,
	    isChromePackagedApp = global.chrome && global.chrome.app && global.chrome.app.runtime;
	
	module.exports = {
	  attachEvent: function attachEvent(event, listener) {
	    if (typeof global.addEventListener !== 'undefined') {
	      global.addEventListener(event, listener, false);
	    } else if (global.document && global.attachEvent) {
	      // IE quirks.
	      // According to: http://stevesouders.com/misc/test-postmessage.php
	      // the message gets delivered only to 'document', not 'window'.
	      global.document.attachEvent('on' + event, listener);
	      // I get 'window' for ie8.
	      global.attachEvent('on' + event, listener);
	    }
	  },
	
	  detachEvent: function detachEvent(event, listener) {
	    if (typeof global.addEventListener !== 'undefined') {
	      global.removeEventListener(event, listener, false);
	    } else if (global.document && global.detachEvent) {
	      global.document.detachEvent('on' + event, listener);
	      global.detachEvent('on' + event, listener);
	    }
	  },
	
	  unloadAdd: function unloadAdd(listener) {
	    if (isChromePackagedApp) {
	      return null;
	    }
	
	    var ref = random.string(8);
	    onUnload[ref] = listener;
	    if (afterUnload) {
	      setTimeout(this.triggerUnloadCallbacks, 0);
	    }
	    return ref;
	  },
	
	  unloadDel: function unloadDel(ref) {
	    if (ref in onUnload) {
	      delete onUnload[ref];
	    }
	  },
	
	  triggerUnloadCallbacks: function triggerUnloadCallbacks() {
	    for (var ref in onUnload) {
	      onUnload[ref]();
	      delete onUnload[ref];
	    }
	  }
	};
	
	var unloadTriggered = function unloadTriggered() {
	  if (afterUnload) {
	    return;
	  }
	  afterUnload = true;
	  module.exports.triggerUnloadCallbacks();
	};
	
	// 'unload' alone is not reliable in opera within an iframe, but we
	// can't use `beforeunload` as IE fires it on javascript: links.
	if (!isChromePackagedApp) {
	  module.exports.attachEvent('unload', unloadTriggered);
	}
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	/* global crypto:true */
	
	var crypto = __webpack_require__(15);
	
	// This string has length 32, a power of 2, so the modulus doesn't introduce a
	// bias.
	var _randomStringChars = 'abcdefghijklmnopqrstuvwxyz012345';
	module.exports = {
	  string: function string(length) {
	    var max = _randomStringChars.length;
	    var bytes = crypto.randomBytes(length);
	    var ret = [];
	    for (var i = 0; i < length; i++) {
	      ret.push(_randomStringChars.substr(bytes[i] % max, 1));
	    }
	    return ret.join('');
	  },
	
	  number: function number(max) {
	    return Math.floor(Math.random() * max);
	  },
	
	  numberString: function numberString(max) {
	    var t = ('' + (max - 1)).length;
	    var p = new Array(t + 1).join('0');
	    return (p + this.number(max)).slice(-t);
	  }
	};

/***/ },
/* 15 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';
	
	if (global.crypto && global.crypto.getRandomValues) {
	  module.exports.randomBytes = function (length) {
	    var bytes = new Uint8Array(length);
	    global.crypto.getRandomValues(bytes);
	    return bytes;
	  };
	} else {
	  module.exports.randomBytes = function (length) {
	    var bytes = new Array(length);
	    for (var i = 0; i < length; i++) {
	      bytes[i] = Math.floor(Math.random() * 256);
	    }
	    return bytes;
	  };
	}
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';
	
	var URL = __webpack_require__(17);
	
	var debug = function debug() {};
	if (process.env.NODE_ENV !== 'production') {
	  debug = __webpack_require__(21)('sockjs-client:utils:url');
	}
	
	module.exports = {
	  getOrigin: function getOrigin(url) {
	    if (!url) {
	      return null;
	    }
	
	    var p = new URL(url);
	    if (p.protocol === 'file:') {
	      return null;
	    }
	
	    var port = p.port;
	    if (!port) {
	      port = p.protocol === 'https:' ? '443' : '80';
	    }
	
	    return p.protocol + '//' + p.hostname + ':' + port;
	  },
	
	  isOriginEqual: function isOriginEqual(a, b) {
	    var res = this.getOrigin(a) === this.getOrigin(b);
	    debug('same', a, b, res);
	    return res;
	  },
	
	  isSchemeEqual: function isSchemeEqual(a, b) {
	    return a.split(':')[0] === b.split(':')[0];
	  },
	
	  addPath: function addPath(url, path) {
	    var qs = url.split('?');
	    return qs[0] + path + (qs[1] ? '?' + qs[1] : '');
	  },
	
	  addQuery: function addQuery(url, q) {
	    return url + (url.indexOf('?') === -1 ? '?' + q : '&' + q);
	  }
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(12)))

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	var required = __webpack_require__(18),
	    lolcation = __webpack_require__(19),
	    qs = __webpack_require__(20),
	    relativere = /^\/(?!\/)/,
	    protocolre = /^([a-z0-9.+-]+:)?(\/\/)?(.*)$/i; // actual protocol is first match
	
	/**
	 * These are the parse instructions for the URL parsers, it informs the parser
	 * about:
	 *
	 * 0. The char it Needs to parse, if it's a string it should be done using
	 *    indexOf, RegExp using exec and NaN means set as current value.
	 * 1. The property we should set when parsing this value.
	 * 2. Indication if it's backwards or forward parsing, when set as number it's
	 *    the value of extra chars that should be split off.
	 * 3. Inherit from location if non existing in the parser.
	 * 4. `toLowerCase` the resulting value.
	 */
	var instructions = [['#', 'hash'], // Extract from the back.
	['?', 'query'], // Extract from the back.
	['/', 'pathname'], // Extract from the back.
	['@', 'auth', 1], // Extract from the front.
	[NaN, 'host', undefined, 1, 1], // Set left over value.
	[/\:(\d+)$/, 'port'], // RegExp the back.
	[NaN, 'hostname', undefined, 1, 1] // Set left over.
	];
	
	/**
	* @typedef ProtocolExtract
	* @type Object
	* @property {String} protocol Protocol matched in the URL, in lowercase
	* @property {Boolean} slashes Indicates whether the protocol is followed by double slash ("//")
	* @property {String} rest     Rest of the URL that is not part of the protocol
	*/
	
	/**
	 * Extract protocol information from a URL with/without double slash ("//")
	 *
	 * @param  {String} address   URL we want to extract from.
	 * @return {ProtocolExtract}  Extracted information
	 * @private
	 */
	function extractProtocol(address) {
	  var match = protocolre.exec(address);
	  return {
	    protocol: match[1] ? match[1].toLowerCase() : '',
	    slashes: !!match[2],
	    rest: match[3] ? match[3] : ''
	  };
	}
	
	/**
	 * The actual URL instance. Instead of returning an object we've opted-in to
	 * create an actual constructor as it's much more memory efficient and
	 * faster and it pleases my CDO.
	 *
	 * @constructor
	 * @param {String} address URL we want to parse.
	 * @param {Object|String} location Location defaults for relative paths.
	 * @param {Boolean|Function} parser Parser for the query string.
	 * @api public
	 */
	function URL(address, location, parser) {
	  if (!(this instanceof URL)) {
	    return new URL(address, location, parser);
	  }
	
	  var relative = relativere.test(address),
	      parse,
	      instruction,
	      index,
	      key,
	      type = typeof location === 'undefined' ? 'undefined' : _typeof(location),
	      url = this,
	      i = 0;
	
	  //
	  // The following if statements allows this module two have compatibility with
	  // 2 different API:
	  //
	  // 1. Node.js's `url.parse` api which accepts a URL, boolean as arguments
	  //    where the boolean indicates that the query string should also be parsed.
	  //
	  // 2. The `URL` interface of the browser which accepts a URL, object as
	  //    arguments. The supplied object will be used as default values / fall-back
	  //    for relative paths.
	  //
	  if ('object' !== type && 'string' !== type) {
	    parser = location;
	    location = null;
	  }
	
	  if (parser && 'function' !== typeof parser) {
	    parser = qs.parse;
	  }
	
	  location = lolcation(location);
	
	  // extract protocol information before running the instructions
	  var extracted = extractProtocol(address);
	  url.protocol = extracted.protocol || location.protocol || '';
	  url.slashes = extracted.slashes || location.slashes;
	  address = extracted.rest;
	
	  for (; i < instructions.length; i++) {
	    instruction = instructions[i];
	    parse = instruction[0];
	    key = instruction[1];
	
	    if (parse !== parse) {
	      url[key] = address;
	    } else if ('string' === typeof parse) {
	      if (~(index = address.indexOf(parse))) {
	        if ('number' === typeof instruction[2]) {
	          url[key] = address.slice(0, index);
	          address = address.slice(index + instruction[2]);
	        } else {
	          url[key] = address.slice(index);
	          address = address.slice(0, index);
	        }
	      }
	    } else if (index = parse.exec(address)) {
	      url[key] = index[1];
	      address = address.slice(0, address.length - index[0].length);
	    }
	
	    url[key] = url[key] || (instruction[3] || 'port' === key && relative ? location[key] || '' : '');
	
	    //
	    // Hostname, host and protocol should be lowercased so they can be used to
	    // create a proper `origin`.
	    //
	    if (instruction[4]) {
	      url[key] = url[key].toLowerCase();
	    }
	  }
	
	  //
	  // Also parse the supplied query string in to an object. If we're supplied
	  // with a custom parser as function use that instead of the default build-in
	  // parser.
	  //
	  if (parser) url.query = parser(url.query);
	
	  //
	  // We should not add port numbers if they are already the default port number
	  // for a given protocol. As the host also contains the port number we're going
	  // override it with the hostname which contains no port number.
	  //
	  if (!required(url.port, url.protocol)) {
	    url.host = url.hostname;
	    url.port = '';
	  }
	
	  //
	  // Parse down the `auth` for the username and password.
	  //
	  url.username = url.password = '';
	  if (url.auth) {
	    instruction = url.auth.split(':');
	    url.username = instruction[0] || '';
	    url.password = instruction[1] || '';
	  }
	
	  //
	  // The href is just the compiled result.
	  //
	  url.href = url.toString();
	}
	
	/**
	 * This is convenience method for changing properties in the URL instance to
	 * insure that they all propagate correctly.
	 *
	 * @param {String} prop          Property we need to adjust.
	 * @param {Mixed} value          The newly assigned value.
	 * @param {Boolean|Function} fn  When setting the query, it will be the function used to parse
	 *                               the query.
	 *                               When setting the protocol, double slash will be removed from
	 *                               the final url if it is true.
	 * @returns {URL}
	 * @api public
	 */
	URL.prototype.set = function set(part, value, fn) {
	  var url = this;
	
	  if ('query' === part) {
	    if ('string' === typeof value && value.length) {
	      value = (fn || qs.parse)(value);
	    }
	
	    url[part] = value;
	  } else if ('port' === part) {
	    url[part] = value;
	
	    if (!required(value, url.protocol)) {
	      url.host = url.hostname;
	      url[part] = '';
	    } else if (value) {
	      url.host = url.hostname + ':' + value;
	    }
	  } else if ('hostname' === part) {
	    url[part] = value;
	
	    if (url.port) value += ':' + url.port;
	    url.host = value;
	  } else if ('host' === part) {
	    url[part] = value;
	
	    if (/\:\d+/.test(value)) {
	      value = value.split(':');
	      url.hostname = value[0];
	      url.port = value[1];
	    }
	  } else if ('protocol' === part) {
	    url.protocol = value;
	    url.slashes = !fn;
	  } else {
	    url[part] = value;
	  }
	
	  url.href = url.toString();
	  return url;
	};
	
	/**
	 * Transform the properties back in to a valid and full URL string.
	 *
	 * @param {Function} stringify Optional query stringify function.
	 * @returns {String}
	 * @api public
	 */
	URL.prototype.toString = function toString(stringify) {
	  if (!stringify || 'function' !== typeof stringify) stringify = qs.stringify;
	
	  var query,
	      url = this,
	      protocol = url.protocol;
	
	  if (protocol && protocol.charAt(protocol.length - 1) !== ':') protocol += ':';
	
	  var result = protocol + (url.slashes ? '//' : '');
	
	  if (url.username) {
	    result += url.username;
	    if (url.password) result += ':' + url.password;
	    result += '@';
	  }
	
	  result += url.hostname;
	  if (url.port) result += ':' + url.port;
	
	  result += url.pathname;
	
	  query = 'object' === _typeof(url.query) ? stringify(url.query) : url.query;
	  if (query) result += '?' !== query.charAt(0) ? '?' + query : query;
	
	  if (url.hash) result += url.hash;
	
	  return result;
	};
	
	//
	// Expose the URL parser and some additional properties that might be useful for
	// others.
	//
	URL.qs = qs;
	URL.location = lolcation;
	module.exports = URL;

/***/ },
/* 18 */
/***/ function(module, exports) {

	'use strict';
	
	/**
	 * Check if we're required to add a port number.
	 *
	 * @see https://url.spec.whatwg.org/#default-port
	 * @param {Number|String} port Port number we need to check
	 * @param {String} protocol Protocol we need to check against.
	 * @returns {Boolean} Is it a default port for the given protocol
	 * @api private
	 */
	
	module.exports = function required(port, protocol) {
	  protocol = protocol.split(':')[0];
	  port = +port;
	
	  if (!port) return false;
	
	  switch (protocol) {
	    case 'http':
	    case 'ws':
	      return port !== 80;
	
	    case 'https':
	    case 'wss':
	      return port !== 443;
	
	    case 'ftp':
	      return port !== 21;
	
	    case 'gopher':
	      return port !== 70;
	
	    case 'file':
	      return false;
	  }
	
	  return port !== 0;
	};

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	var slashes = /^[A-Za-z][A-Za-z0-9+-.]*:\/\//;
	
	/**
	 * These properties should not be copied or inherited from. This is only needed
	 * for all non blob URL's as a blob URL does not include a hash, only the
	 * origin.
	 *
	 * @type {Object}
	 * @private
	 */
	var ignore = { hash: 1, query: 1 },
	    URL;
	
	/**
	 * The location object differs when your code is loaded through a normal page,
	 * Worker or through a worker using a blob. And with the blobble begins the
	 * trouble as the location object will contain the URL of the blob, not the
	 * location of the page where our code is loaded in. The actual origin is
	 * encoded in the `pathname` so we can thankfully generate a good "default"
	 * location from it so we can generate proper relative URL's again.
	 *
	 * @param {Object|String} loc Optional default location object.
	 * @returns {Object} lolcation object.
	 * @api public
	 */
	module.exports = function lolcation(loc) {
	  loc = loc || global.location || {};
	  URL = URL || __webpack_require__(17);
	
	  var finaldestination = {},
	      type = typeof loc === 'undefined' ? 'undefined' : _typeof(loc),
	      key;
	
	  if ('blob:' === loc.protocol) {
	    finaldestination = new URL(unescape(loc.pathname), {});
	  } else if ('string' === type) {
	    finaldestination = new URL(loc, {});
	    for (key in ignore) {
	      delete finaldestination[key];
	    }
	  } else if ('object' === type) {
	    for (key in loc) {
	      if (key in ignore) continue;
	      finaldestination[key] = loc[key];
	    }
	
	    if (finaldestination.slashes === undefined) {
	      finaldestination.slashes = slashes.test(loc.href);
	    }
	  }
	
	  return finaldestination;
	};
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 20 */
/***/ function(module, exports) {

	'use strict';
	
	var has = Object.prototype.hasOwnProperty;
	
	/**
	 * Simple query string parser.
	 *
	 * @param {String} query The query string that needs to be parsed.
	 * @returns {Object}
	 * @api public
	 */
	function querystring(query) {
	  var parser = /([^=?&]+)=([^&]*)/g,
	      result = {},
	      part;
	
	  //
	  // Little nifty parsing hack, leverage the fact that RegExp.exec increments
	  // the lastIndex property so we can continue executing this loop until we've
	  // parsed all results.
	  //
	  for (; part = parser.exec(query); result[decodeURIComponent(part[1])] = decodeURIComponent(part[2])) {}
	
	  return result;
	}
	
	/**
	 * Transform a query string to an object.
	 *
	 * @param {Object} obj Object that should be transformed.
	 * @param {String} prefix Optional prefix.
	 * @returns {String}
	 * @api public
	 */
	function querystringify(obj, prefix) {
	  prefix = prefix || '';
	
	  var pairs = [];
	
	  //
	  // Optionally prefix with a '?' if needed
	  //
	  if ('string' !== typeof prefix) prefix = '?';
	
	  for (var key in obj) {
	    if (has.call(obj, key)) {
	      pairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]));
	    }
	  }
	
	  return pairs.length ? prefix + pairs.join('&') : '';
	}
	
	//
	// Expose the module.
	//
	exports.stringify = querystringify;
	exports.parse = querystring;

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	/**
	 * This is the web browser implementation of `debug()`.
	 *
	 * Expose `debug()` as the module.
	 */
	
	exports = module.exports = __webpack_require__(22);
	exports.log = log;
	exports.formatArgs = formatArgs;
	exports.save = save;
	exports.load = load;
	exports.useColors = useColors;
	exports.storage = 'undefined' != typeof chrome && 'undefined' != typeof chrome.storage ? chrome.storage.local : localstorage();
	
	/**
	 * Colors.
	 */
	
	exports.colors = ['lightseagreen', 'forestgreen', 'goldenrod', 'dodgerblue', 'darkorchid', 'crimson'];
	
	/**
	 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
	 * and the Firebug extension (any Firefox version) are known
	 * to support "%c" CSS customizations.
	 *
	 * TODO: add a `localStorage` variable to explicitly enable/disable colors
	 */
	
	function useColors() {
	  // is webkit? http://stackoverflow.com/a/16459606/376773
	  return 'WebkitAppearance' in document.documentElement.style ||
	  // is firebug? http://stackoverflow.com/a/398120/376773
	  window.console && (console.firebug || console.exception && console.table) ||
	  // is firefox >= v31?
	  // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
	  navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31;
	}
	
	/**
	 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
	 */
	
	exports.formatters.j = function (v) {
	  return JSON.stringify(v);
	};
	
	/**
	 * Colorize log arguments if enabled.
	 *
	 * @api public
	 */
	
	function formatArgs() {
	  var args = arguments;
	  var useColors = this.useColors;
	
	  args[0] = (useColors ? '%c' : '') + this.namespace + (useColors ? ' %c' : ' ') + args[0] + (useColors ? '%c ' : ' ') + '+' + exports.humanize(this.diff);
	
	  if (!useColors) return args;
	
	  var c = 'color: ' + this.color;
	  args = [args[0], c, 'color: inherit'].concat(Array.prototype.slice.call(args, 1));
	
	  // the final "%c" is somewhat tricky, because there could be other
	  // arguments passed either before or after the %c, so we need to
	  // figure out the correct index to insert the CSS into
	  var index = 0;
	  var lastC = 0;
	  args[0].replace(/%[a-z%]/g, function (match) {
	    if ('%%' === match) return;
	    index++;
	    if ('%c' === match) {
	      // we only are interested in the *last* %c
	      // (the user may have provided their own)
	      lastC = index;
	    }
	  });
	
	  args.splice(lastC, 0, c);
	  return args;
	}
	
	/**
	 * Invokes `console.log()` when available.
	 * No-op when `console.log` is not a "function".
	 *
	 * @api public
	 */
	
	function log() {
	  // this hackery is required for IE8/9, where
	  // the `console.log` function doesn't have 'apply'
	  return 'object' === (typeof console === 'undefined' ? 'undefined' : _typeof(console)) && console.log && Function.prototype.apply.call(console.log, console, arguments);
	}
	
	/**
	 * Save `namespaces`.
	 *
	 * @param {String} namespaces
	 * @api private
	 */
	
	function save(namespaces) {
	  try {
	    if (null == namespaces) {
	      exports.storage.removeItem('debug');
	    } else {
	      exports.storage.debug = namespaces;
	    }
	  } catch (e) {}
	}
	
	/**
	 * Load `namespaces`.
	 *
	 * @return {String} returns the previously persisted debug modes
	 * @api private
	 */
	
	function load() {
	  var r;
	  try {
	    r = exports.storage.debug;
	  } catch (e) {}
	  return r;
	}
	
	/**
	 * Enable namespaces listed in `localStorage.debug` initially.
	 */
	
	exports.enable(load());
	
	/**
	 * Localstorage attempts to return the localstorage.
	 *
	 * This is necessary because safari throws
	 * when a user disables cookies/localstorage
	 * and you attempt to access it.
	 *
	 * @return {LocalStorage}
	 * @api private
	 */
	
	function localstorage() {
	  try {
	    return window.localStorage;
	  } catch (e) {}
	}

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	/**
	 * This is the common logic for both the Node.js and web browser
	 * implementations of `debug()`.
	 *
	 * Expose `debug()` as the module.
	 */
	
	exports = module.exports = debug;
	exports.coerce = coerce;
	exports.disable = disable;
	exports.enable = enable;
	exports.enabled = enabled;
	exports.humanize = __webpack_require__(23);
	
	/**
	 * The currently active debug mode names, and names to skip.
	 */
	
	exports.names = [];
	exports.skips = [];
	
	/**
	 * Map of special "%n" handling functions, for the debug "format" argument.
	 *
	 * Valid key names are a single, lowercased letter, i.e. "n".
	 */
	
	exports.formatters = {};
	
	/**
	 * Previously assigned color.
	 */
	
	var prevColor = 0;
	
	/**
	 * Previous log timestamp.
	 */
	
	var prevTime;
	
	/**
	 * Select a color.
	 *
	 * @return {Number}
	 * @api private
	 */
	
	function selectColor() {
	  return exports.colors[prevColor++ % exports.colors.length];
	}
	
	/**
	 * Create a debugger with the given `namespace`.
	 *
	 * @param {String} namespace
	 * @return {Function}
	 * @api public
	 */
	
	function debug(namespace) {
	
	  // define the `disabled` version
	  function disabled() {}
	  disabled.enabled = false;
	
	  // define the `enabled` version
	  function enabled() {
	
	    var self = enabled;
	
	    // set `diff` timestamp
	    var curr = +new Date();
	    var ms = curr - (prevTime || curr);
	    self.diff = ms;
	    self.prev = prevTime;
	    self.curr = curr;
	    prevTime = curr;
	
	    // add the `color` if not set
	    if (null == self.useColors) self.useColors = exports.useColors();
	    if (null == self.color && self.useColors) self.color = selectColor();
	
	    var args = Array.prototype.slice.call(arguments);
	
	    args[0] = exports.coerce(args[0]);
	
	    if ('string' !== typeof args[0]) {
	      // anything else let's inspect with %o
	      args = ['%o'].concat(args);
	    }
	
	    // apply any `formatters` transformations
	    var index = 0;
	    args[0] = args[0].replace(/%([a-z%])/g, function (match, format) {
	      // if we encounter an escaped % then don't increase the array index
	      if (match === '%%') return match;
	      index++;
	      var formatter = exports.formatters[format];
	      if ('function' === typeof formatter) {
	        var val = args[index];
	        match = formatter.call(self, val);
	
	        // now we need to remove `args[index]` since it's inlined in the `format`
	        args.splice(index, 1);
	        index--;
	      }
	      return match;
	    });
	
	    if ('function' === typeof exports.formatArgs) {
	      args = exports.formatArgs.apply(self, args);
	    }
	    var logFn = enabled.log || exports.log || console.log.bind(console);
	    logFn.apply(self, args);
	  }
	  enabled.enabled = true;
	
	  var fn = exports.enabled(namespace) ? enabled : disabled;
	
	  fn.namespace = namespace;
	
	  return fn;
	}
	
	/**
	 * Enables a debug mode by namespaces. This can include modes
	 * separated by a colon and wildcards.
	 *
	 * @param {String} namespaces
	 * @api public
	 */
	
	function enable(namespaces) {
	  exports.save(namespaces);
	
	  var split = (namespaces || '').split(/[\s,]+/);
	  var len = split.length;
	
	  for (var i = 0; i < len; i++) {
	    if (!split[i]) continue; // ignore empty strings
	    namespaces = split[i].replace(/\*/g, '.*?');
	    if (namespaces[0] === '-') {
	      exports.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
	    } else {
	      exports.names.push(new RegExp('^' + namespaces + '$'));
	    }
	  }
	}
	
	/**
	 * Disable debug output.
	 *
	 * @api public
	 */
	
	function disable() {
	  exports.enable('');
	}
	
	/**
	 * Returns true if the given mode name is enabled, false otherwise.
	 *
	 * @param {String} name
	 * @return {Boolean}
	 * @api public
	 */
	
	function enabled(name) {
	  var i, len;
	  for (i = 0, len = exports.skips.length; i < len; i++) {
	    if (exports.skips[i].test(name)) {
	      return false;
	    }
	  }
	  for (i = 0, len = exports.names.length; i < len; i++) {
	    if (exports.names[i].test(name)) {
	      return true;
	    }
	  }
	  return false;
	}
	
	/**
	 * Coerce `val`.
	 *
	 * @param {Mixed} val
	 * @return {Mixed}
	 * @api private
	 */
	
	function coerce(val) {
	  if (val instanceof Error) return val.stack || val.message;
	  return val;
	}

/***/ },
/* 23 */
/***/ function(module, exports) {

	'use strict';
	
	/**
	 * Helpers.
	 */
	
	var s = 1000;
	var m = s * 60;
	var h = m * 60;
	var d = h * 24;
	var y = d * 365.25;
	
	/**
	 * Parse or format the given `val`.
	 *
	 * Options:
	 *
	 *  - `long` verbose formatting [false]
	 *
	 * @param {String|Number} val
	 * @param {Object} options
	 * @return {String|Number}
	 * @api public
	 */
	
	module.exports = function (val, options) {
	  options = options || {};
	  if ('string' == typeof val) return parse(val);
	  return options.long ? long(val) : short(val);
	};
	
	/**
	 * Parse the given `str` and return milliseconds.
	 *
	 * @param {String} str
	 * @return {Number}
	 * @api private
	 */
	
	function parse(str) {
	  str = '' + str;
	  if (str.length > 10000) return;
	  var match = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(str);
	  if (!match) return;
	  var n = parseFloat(match[1]);
	  var type = (match[2] || 'ms').toLowerCase();
	  switch (type) {
	    case 'years':
	    case 'year':
	    case 'yrs':
	    case 'yr':
	    case 'y':
	      return n * y;
	    case 'days':
	    case 'day':
	    case 'd':
	      return n * d;
	    case 'hours':
	    case 'hour':
	    case 'hrs':
	    case 'hr':
	    case 'h':
	      return n * h;
	    case 'minutes':
	    case 'minute':
	    case 'mins':
	    case 'min':
	    case 'm':
	      return n * m;
	    case 'seconds':
	    case 'second':
	    case 'secs':
	    case 'sec':
	    case 's':
	      return n * s;
	    case 'milliseconds':
	    case 'millisecond':
	    case 'msecs':
	    case 'msec':
	    case 'ms':
	      return n;
	  }
	}
	
	/**
	 * Short format for `ms`.
	 *
	 * @param {Number} ms
	 * @return {String}
	 * @api private
	 */
	
	function short(ms) {
	  if (ms >= d) return Math.round(ms / d) + 'd';
	  if (ms >= h) return Math.round(ms / h) + 'h';
	  if (ms >= m) return Math.round(ms / m) + 'm';
	  if (ms >= s) return Math.round(ms / s) + 's';
	  return ms + 'ms';
	}
	
	/**
	 * Long format for `ms`.
	 *
	 * @param {Number} ms
	 * @return {String}
	 * @api private
	 */
	
	function long(ms) {
	  return plural(ms, d, 'day') || plural(ms, h, 'hour') || plural(ms, m, 'minute') || plural(ms, s, 'second') || ms + ' ms';
	}
	
	/**
	 * Pluralization helper.
	 */
	
	function plural(ms, n, name) {
	  if (ms < n) return;
	  if (ms < n * 1.5) return Math.floor(ms / n) + ' ' + name;
	  return Math.ceil(ms / n) + ' ' + name + 's';
	}

/***/ },
/* 24 */
/***/ function(module, exports) {

	'use strict';
	
	if (typeof Object.create === 'function') {
	  // implementation from standard node.js 'util' module
	  module.exports = function inherits(ctor, superCtor) {
	    ctor.super_ = superCtor;
	    ctor.prototype = Object.create(superCtor.prototype, {
	      constructor: {
	        value: ctor,
	        enumerable: false,
	        writable: true,
	        configurable: true
	      }
	    });
	  };
	} else {
	  // old school shim for old browsers
	  module.exports = function inherits(ctor, superCtor) {
	    ctor.super_ = superCtor;
	    var TempCtor = function TempCtor() {};
	    TempCtor.prototype = superCtor.prototype;
	    ctor.prototype = new TempCtor();
	    ctor.prototype.constructor = ctor;
	  };
	}

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var inherits = __webpack_require__(24),
	    EventTarget = __webpack_require__(26);
	
	function EventEmitter() {
	  EventTarget.call(this);
	}
	
	inherits(EventEmitter, EventTarget);
	
	EventEmitter.prototype.removeAllListeners = function (type) {
	  if (type) {
	    delete this._listeners[type];
	  } else {
	    this._listeners = {};
	  }
	};
	
	EventEmitter.prototype.once = function (type, listener) {
	  var self = this,
	      fired = false;
	
	  function g() {
	    self.removeListener(type, g);
	
	    if (!fired) {
	      fired = true;
	      listener.apply(this, arguments);
	    }
	  }
	
	  this.on(type, g);
	};
	
	EventEmitter.prototype.emit = function () {
	  var type = arguments[0];
	  var listeners = this._listeners[type];
	  if (!listeners) {
	    return;
	  }
	  // equivalent of Array.prototype.slice.call(arguments, 1);
	  var l = arguments.length;
	  var args = new Array(l - 1);
	  for (var ai = 1; ai < l; ai++) {
	    args[ai - 1] = arguments[ai];
	  }
	  for (var i = 0; i < listeners.length; i++) {
	    listeners[i].apply(this, args);
	  }
	};
	
	EventEmitter.prototype.on = EventEmitter.prototype.addListener = EventTarget.prototype.addEventListener;
	EventEmitter.prototype.removeListener = EventTarget.prototype.removeEventListener;
	
	module.exports.EventEmitter = EventEmitter;

/***/ },
/* 26 */
/***/ function(module, exports) {

	'use strict';
	
	/* Simplified implementation of DOM2 EventTarget.
	 *   http://www.w3.org/TR/DOM-Level-2-Events/events.html#Events-EventTarget
	 */
	
	function EventTarget() {
	  this._listeners = {};
	}
	
	EventTarget.prototype.addEventListener = function (eventType, listener) {
	  if (!(eventType in this._listeners)) {
	    this._listeners[eventType] = [];
	  }
	  var arr = this._listeners[eventType];
	  // #4
	  if (arr.indexOf(listener) === -1) {
	    // Make a copy so as not to interfere with a current dispatchEvent.
	    arr = arr.concat([listener]);
	  }
	  this._listeners[eventType] = arr;
	};
	
	EventTarget.prototype.removeEventListener = function (eventType, listener) {
	  var arr = this._listeners[eventType];
	  if (!arr) {
	    return;
	  }
	  var idx = arr.indexOf(listener);
	  if (idx !== -1) {
	    if (arr.length > 1) {
	      // Make a copy so as not to interfere with a current dispatchEvent.
	      this._listeners[eventType] = arr.slice(0, idx).concat(arr.slice(idx + 1));
	    } else {
	      delete this._listeners[eventType];
	    }
	    return;
	  }
	};
	
	EventTarget.prototype.dispatchEvent = function () {
	  var event = arguments[0];
	  var t = event.type;
	  // equivalent of Array.prototype.slice.call(arguments, 0);
	  var args = arguments.length === 1 ? [event] : Array.apply(null, arguments);
	  // TODO: This doesn't match the real behavior; per spec, onfoo get
	  // their place in line from the /first/ time they're set from
	  // non-null. Although WebKit bumps it to the end every time it's
	  // set.
	  if (this['on' + t]) {
	    this['on' + t].apply(this, args);
	  }
	  if (t in this._listeners) {
	    // Grab a reference to the listeners list. removeEventListener may alter the list.
	    var listeners = this._listeners[t];
	    for (var i = 0; i < listeners.length; i++) {
	      listeners[i].apply(this, args);
	    }
	  }
	};
	
	module.exports = EventTarget;

/***/ },
/* 27 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';
	
	var Driver = global.WebSocket || global.MozWebSocket;
	if (Driver) {
		module.exports = function WebSocketBrowserDriver(url) {
			return new Driver(url);
		};
	}
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';
	
	var inherits = __webpack_require__(24),
	    AjaxBasedTransport = __webpack_require__(29),
	    XhrReceiver = __webpack_require__(33),
	    XHRCorsObject = __webpack_require__(34),
	    XHRLocalObject = __webpack_require__(36),
	    browser = __webpack_require__(37);
	
	function XhrStreamingTransport(transUrl) {
	  if (!XHRLocalObject.enabled && !XHRCorsObject.enabled) {
	    throw new Error('Transport created when disabled');
	  }
	  AjaxBasedTransport.call(this, transUrl, '/xhr_streaming', XhrReceiver, XHRCorsObject);
	}
	
	inherits(XhrStreamingTransport, AjaxBasedTransport);
	
	XhrStreamingTransport.enabled = function (info) {
	  if (info.nullOrigin) {
	    return false;
	  }
	  // Opera doesn't support xhr-streaming #60
	  // But it might be able to #92
	  if (browser.isOpera()) {
	    return false;
	  }
	
	  return XHRCorsObject.enabled;
	};
	
	XhrStreamingTransport.transportName = 'xhr-streaming';
	XhrStreamingTransport.roundTrips = 2; // preflight, ajax
	
	// Safari gets confused when a streaming ajax request is started
	// before onload. This causes the load indicator to spin indefinetely.
	// Only require body when used in a browser
	XhrStreamingTransport.needBody = !!global.document;
	
	module.exports = XhrStreamingTransport;
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';
	
	var inherits = __webpack_require__(24),
	    urlUtils = __webpack_require__(16),
	    SenderReceiver = __webpack_require__(30);
	
	var debug = function debug() {};
	if (process.env.NODE_ENV !== 'production') {
	  debug = __webpack_require__(21)('sockjs-client:ajax-based');
	}
	
	function createAjaxSender(AjaxObject) {
	  return function (url, payload, callback) {
	    debug('create ajax sender', url, payload);
	    var opt = {};
	    if (typeof payload === 'string') {
	      opt.headers = { 'Content-type': 'text/plain' };
	    }
	    var ajaxUrl = urlUtils.addPath(url, '/xhr_send');
	    var xo = new AjaxObject('POST', ajaxUrl, payload, opt);
	    xo.once('finish', function (status) {
	      debug('finish', status);
	      xo = null;
	
	      if (status !== 200 && status !== 204) {
	        return callback(new Error('http status ' + status));
	      }
	      callback();
	    });
	    return function () {
	      debug('abort');
	      xo.close();
	      xo = null;
	
	      var err = new Error('Aborted');
	      err.code = 1000;
	      callback(err);
	    };
	  };
	}
	
	function AjaxBasedTransport(transUrl, urlSuffix, Receiver, AjaxObject) {
	  SenderReceiver.call(this, transUrl, urlSuffix, createAjaxSender(AjaxObject), Receiver, AjaxObject);
	}
	
	inherits(AjaxBasedTransport, SenderReceiver);
	
	module.exports = AjaxBasedTransport;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(12)))

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';
	
	var inherits = __webpack_require__(24),
	    urlUtils = __webpack_require__(16),
	    BufferedSender = __webpack_require__(31),
	    Polling = __webpack_require__(32);
	
	var debug = function debug() {};
	if (process.env.NODE_ENV !== 'production') {
	  debug = __webpack_require__(21)('sockjs-client:sender-receiver');
	}
	
	function SenderReceiver(transUrl, urlSuffix, senderFunc, Receiver, AjaxObject) {
	  var pollUrl = urlUtils.addPath(transUrl, urlSuffix);
	  debug(pollUrl);
	  var self = this;
	  BufferedSender.call(this, transUrl, senderFunc);
	
	  this.poll = new Polling(Receiver, pollUrl, AjaxObject);
	  this.poll.on('message', function (msg) {
	    debug('poll message', msg);
	    self.emit('message', msg);
	  });
	  this.poll.once('close', function (code, reason) {
	    debug('poll close', code, reason);
	    self.poll = null;
	    self.emit('close', code, reason);
	    self.close();
	  });
	}
	
	inherits(SenderReceiver, BufferedSender);
	
	SenderReceiver.prototype.close = function () {
	  debug('close');
	  this.removeAllListeners();
	  if (this.poll) {
	    this.poll.abort();
	    this.poll = null;
	  }
	  this.stop();
	};
	
	module.exports = SenderReceiver;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(12)))

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';
	
	var inherits = __webpack_require__(24),
	    EventEmitter = __webpack_require__(25).EventEmitter;
	
	var debug = function debug() {};
	if (process.env.NODE_ENV !== 'production') {
	  debug = __webpack_require__(21)('sockjs-client:buffered-sender');
	}
	
	function BufferedSender(url, sender) {
	  debug(url);
	  EventEmitter.call(this);
	  this.sendBuffer = [];
	  this.sender = sender;
	  this.url = url;
	}
	
	inherits(BufferedSender, EventEmitter);
	
	BufferedSender.prototype.send = function (message) {
	  debug('send', message);
	  this.sendBuffer.push(message);
	  if (!this.sendStop) {
	    this.sendSchedule();
	  }
	};
	
	// For polling transports in a situation when in the message callback,
	// new message is being send. If the sending connection was started
	// before receiving one, it is possible to saturate the network and
	// timeout due to the lack of receiving socket. To avoid that we delay
	// sending messages by some small time, in order to let receiving
	// connection be started beforehand. This is only a halfmeasure and
	// does not fix the big problem, but it does make the tests go more
	// stable on slow networks.
	BufferedSender.prototype.sendScheduleWait = function () {
	  debug('sendScheduleWait');
	  var self = this;
	  var tref;
	  this.sendStop = function () {
	    debug('sendStop');
	    self.sendStop = null;
	    clearTimeout(tref);
	  };
	  tref = setTimeout(function () {
	    debug('timeout');
	    self.sendStop = null;
	    self.sendSchedule();
	  }, 25);
	};
	
	BufferedSender.prototype.sendSchedule = function () {
	  debug('sendSchedule', this.sendBuffer.length);
	  var self = this;
	  if (this.sendBuffer.length > 0) {
	    var payload = '[' + this.sendBuffer.join(',') + ']';
	    this.sendStop = this.sender(this.url, payload, function (err) {
	      self.sendStop = null;
	      if (err) {
	        debug('error', err);
	        self.emit('close', err.code || 1006, 'Sending error: ' + err);
	        self._cleanup();
	      } else {
	        self.sendScheduleWait();
	      }
	    });
	    this.sendBuffer = [];
	  }
	};
	
	BufferedSender.prototype._cleanup = function () {
	  debug('_cleanup');
	  this.removeAllListeners();
	};
	
	BufferedSender.prototype.stop = function () {
	  debug('stop');
	  this._cleanup();
	  if (this.sendStop) {
	    this.sendStop();
	    this.sendStop = null;
	  }
	};
	
	module.exports = BufferedSender;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(12)))

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';
	
	var inherits = __webpack_require__(24),
	    EventEmitter = __webpack_require__(25).EventEmitter;
	
	var debug = function debug() {};
	if (process.env.NODE_ENV !== 'production') {
	  debug = __webpack_require__(21)('sockjs-client:polling');
	}
	
	function Polling(Receiver, receiveUrl, AjaxObject) {
	  debug(receiveUrl);
	  EventEmitter.call(this);
	  this.Receiver = Receiver;
	  this.receiveUrl = receiveUrl;
	  this.AjaxObject = AjaxObject;
	  this._scheduleReceiver();
	}
	
	inherits(Polling, EventEmitter);
	
	Polling.prototype._scheduleReceiver = function () {
	  debug('_scheduleReceiver');
	  var self = this;
	  var poll = this.poll = new this.Receiver(this.receiveUrl, this.AjaxObject);
	
	  poll.on('message', function (msg) {
	    debug('message', msg);
	    self.emit('message', msg);
	  });
	
	  poll.once('close', function (code, reason) {
	    debug('close', code, reason, self.pollIsClosing);
	    self.poll = poll = null;
	
	    if (!self.pollIsClosing) {
	      if (reason === 'network') {
	        self._scheduleReceiver();
	      } else {
	        self.emit('close', code || 1006, reason);
	        self.removeAllListeners();
	      }
	    }
	  });
	};
	
	Polling.prototype.abort = function () {
	  debug('abort');
	  this.removeAllListeners();
	  this.pollIsClosing = true;
	  if (this.poll) {
	    this.poll.abort();
	  }
	};
	
	module.exports = Polling;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(12)))

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';
	
	var inherits = __webpack_require__(24),
	    EventEmitter = __webpack_require__(25).EventEmitter;
	
	var debug = function debug() {};
	if (process.env.NODE_ENV !== 'production') {
	  debug = __webpack_require__(21)('sockjs-client:receiver:xhr');
	}
	
	function XhrReceiver(url, AjaxObject) {
	  debug(url);
	  EventEmitter.call(this);
	  var self = this;
	
	  this.bufferPosition = 0;
	
	  this.xo = new AjaxObject('POST', url, null);
	  this.xo.on('chunk', this._chunkHandler.bind(this));
	  this.xo.once('finish', function (status, text) {
	    debug('finish', status, text);
	    self._chunkHandler(status, text);
	    self.xo = null;
	    var reason = status === 200 ? 'network' : 'permanent';
	    debug('close', reason);
	    self.emit('close', null, reason);
	    self._cleanup();
	  });
	}
	
	inherits(XhrReceiver, EventEmitter);
	
	XhrReceiver.prototype._chunkHandler = function (status, text) {
	  debug('_chunkHandler', status);
	  if (status !== 200 || !text) {
	    return;
	  }
	
	  for (var idx = -1;; this.bufferPosition += idx + 1) {
	    var buf = text.slice(this.bufferPosition);
	    idx = buf.indexOf('\n');
	    if (idx === -1) {
	      break;
	    }
	    var msg = buf.slice(0, idx);
	    if (msg) {
	      debug('message', msg);
	      this.emit('message', msg);
	    }
	  }
	};
	
	XhrReceiver.prototype._cleanup = function () {
	  debug('_cleanup');
	  this.removeAllListeners();
	};
	
	XhrReceiver.prototype.abort = function () {
	  debug('abort');
	  if (this.xo) {
	    this.xo.close();
	    debug('close');
	    this.emit('close', null, 'user');
	    this.xo = null;
	  }
	  this._cleanup();
	};
	
	module.exports = XhrReceiver;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(12)))

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var inherits = __webpack_require__(24),
	    XhrDriver = __webpack_require__(35);
	
	function XHRCorsObject(method, url, payload, opts) {
	  XhrDriver.call(this, method, url, payload, opts);
	}
	
	inherits(XHRCorsObject, XhrDriver);
	
	XHRCorsObject.enabled = XhrDriver.enabled && XhrDriver.supportsCORS;
	
	module.exports = XHRCorsObject;

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global, process) {'use strict';
	
	var EventEmitter = __webpack_require__(25).EventEmitter,
	    inherits = __webpack_require__(24),
	    utils = __webpack_require__(13),
	    urlUtils = __webpack_require__(16),
	    XHR = global.XMLHttpRequest;
	
	var debug = function debug() {};
	if (process.env.NODE_ENV !== 'production') {
	  debug = __webpack_require__(21)('sockjs-client:browser:xhr');
	}
	
	function AbstractXHRObject(method, url, payload, opts) {
	  debug(method, url);
	  var self = this;
	  EventEmitter.call(this);
	
	  setTimeout(function () {
	    self._start(method, url, payload, opts);
	  }, 0);
	}
	
	inherits(AbstractXHRObject, EventEmitter);
	
	AbstractXHRObject.prototype._start = function (method, url, payload, opts) {
	  var self = this;
	
	  try {
	    this.xhr = new XHR();
	  } catch (x) {
	    // intentionally empty
	  }
	
	  if (!this.xhr) {
	    debug('no xhr');
	    this.emit('finish', 0, 'no xhr support');
	    this._cleanup();
	    return;
	  }
	
	  // several browsers cache POSTs
	  url = urlUtils.addQuery(url, 't=' + +new Date());
	
	  // Explorer tends to keep connection open, even after the
	  // tab gets closed: http://bugs.jquery.com/ticket/5280
	  this.unloadRef = utils.unloadAdd(function () {
	    debug('unload cleanup');
	    self._cleanup(true);
	  });
	  try {
	    this.xhr.open(method, url, true);
	    if (this.timeout && 'timeout' in this.xhr) {
	      this.xhr.timeout = this.timeout;
	      this.xhr.ontimeout = function () {
	        debug('xhr timeout');
	        self.emit('finish', 0, '');
	        self._cleanup(false);
	      };
	    }
	  } catch (e) {
	    debug('exception', e);
	    // IE raises an exception on wrong port.
	    this.emit('finish', 0, '');
	    this._cleanup(false);
	    return;
	  }
	
	  if ((!opts || !opts.noCredentials) && AbstractXHRObject.supportsCORS) {
	    debug('withCredentials');
	    // Mozilla docs says https://developer.mozilla.org/en/XMLHttpRequest :
	    // "This never affects same-site requests."
	
	    this.xhr.withCredentials = 'true';
	  }
	  if (opts && opts.headers) {
	    for (var key in opts.headers) {
	      this.xhr.setRequestHeader(key, opts.headers[key]);
	    }
	  }
	
	  this.xhr.onreadystatechange = function () {
	    if (self.xhr) {
	      var x = self.xhr;
	      var text, status;
	      debug('readyState', x.readyState);
	      switch (x.readyState) {
	        case 3:
	          // IE doesn't like peeking into responseText or status
	          // on Microsoft.XMLHTTP and readystate=3
	          try {
	            status = x.status;
	            text = x.responseText;
	          } catch (e) {
	            // intentionally empty
	          }
	          debug('status', status);
	          // IE returns 1223 for 204: http://bugs.jquery.com/ticket/1450
	          if (status === 1223) {
	            status = 204;
	          }
	
	          // IE does return readystate == 3 for 404 answers.
	          if (status === 200 && text && text.length > 0) {
	            debug('chunk');
	            self.emit('chunk', status, text);
	          }
	          break;
	        case 4:
	          status = x.status;
	          debug('status', status);
	          // IE returns 1223 for 204: http://bugs.jquery.com/ticket/1450
	          if (status === 1223) {
	            status = 204;
	          }
	          // IE returns this for a bad port
	          // http://msdn.microsoft.com/en-us/library/windows/desktop/aa383770(v=vs.85).aspx
	          if (status === 12005 || status === 12029) {
	            status = 0;
	          }
	
	          debug('finish', status, x.responseText);
	          self.emit('finish', status, x.responseText);
	          self._cleanup(false);
	          break;
	      }
	    }
	  };
	
	  try {
	    self.xhr.send(payload);
	  } catch (e) {
	    self.emit('finish', 0, '');
	    self._cleanup(false);
	  }
	};
	
	AbstractXHRObject.prototype._cleanup = function (abort) {
	  debug('cleanup');
	  if (!this.xhr) {
	    return;
	  }
	  this.removeAllListeners();
	  utils.unloadDel(this.unloadRef);
	
	  // IE needs this field to be a function
	  this.xhr.onreadystatechange = function () {};
	  if (this.xhr.ontimeout) {
	    this.xhr.ontimeout = null;
	  }
	
	  if (abort) {
	    try {
	      this.xhr.abort();
	    } catch (x) {
	      // intentionally empty
	    }
	  }
	  this.unloadRef = this.xhr = null;
	};
	
	AbstractXHRObject.prototype.close = function () {
	  debug('close');
	  this._cleanup(true);
	};
	
	AbstractXHRObject.enabled = !!XHR;
	// override XMLHttpRequest for IE6/7
	// obfuscate to avoid firewalls
	var axo = ['Active'].concat('Object').join('X');
	if (!AbstractXHRObject.enabled && axo in global) {
	  debug('overriding xmlhttprequest');
	  XHR = function XHR() {
	    try {
	      return new global[axo]('Microsoft.XMLHTTP');
	    } catch (e) {
	      return null;
	    }
	  };
	  AbstractXHRObject.enabled = !!new XHR();
	}
	
	var cors = false;
	try {
	  cors = 'withCredentials' in new XHR();
	} catch (ignored) {
	  // intentionally empty
	}
	
	AbstractXHRObject.supportsCORS = cors;
	
	module.exports = AbstractXHRObject;
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(12)))

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var inherits = __webpack_require__(24),
	    XhrDriver = __webpack_require__(35);
	
	function XHRLocalObject(method, url, payload /*, opts */) {
	  XhrDriver.call(this, method, url, payload, {
	    noCredentials: true
	  });
	}
	
	inherits(XHRLocalObject, XhrDriver);
	
	XHRLocalObject.enabled = XhrDriver.enabled;
	
	module.exports = XHRLocalObject;

/***/ },
/* 37 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';
	
	module.exports = {
	  isOpera: function isOpera() {
	    return global.navigator && /opera/i.test(global.navigator.userAgent);
	  },
	
	  isKonqueror: function isKonqueror() {
	    return global.navigator && /konqueror/i.test(global.navigator.userAgent);
	  }
	
	  // #187 wrap document.domain in try/catch because of WP8 from file:///
	  , hasDomain: function hasDomain() {
	    // non-browser client always has a domain
	    if (!global.document) {
	      return true;
	    }
	
	    try {
	      return !!global.document.domain;
	    } catch (e) {
	      return false;
	    }
	  }
	};
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var inherits = __webpack_require__(24),
	    AjaxBasedTransport = __webpack_require__(29),
	    XhrReceiver = __webpack_require__(33),
	    XDRObject = __webpack_require__(39);
	
	// According to:
	//   http://stackoverflow.com/questions/1641507/detect-browser-support-for-cross-domain-xmlhttprequests
	//   http://hacks.mozilla.org/2009/07/cross-site-xmlhttprequest-with-cors/
	
	function XdrStreamingTransport(transUrl) {
	  if (!XDRObject.enabled) {
	    throw new Error('Transport created when disabled');
	  }
	  AjaxBasedTransport.call(this, transUrl, '/xhr_streaming', XhrReceiver, XDRObject);
	}
	
	inherits(XdrStreamingTransport, AjaxBasedTransport);
	
	XdrStreamingTransport.enabled = function (info) {
	  if (info.cookie_needed || info.nullOrigin) {
	    return false;
	  }
	  return XDRObject.enabled && info.sameScheme;
	};
	
	XdrStreamingTransport.transportName = 'xdr-streaming';
	XdrStreamingTransport.roundTrips = 2; // preflight, ajax
	
	module.exports = XdrStreamingTransport;

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process, global) {'use strict';
	
	var EventEmitter = __webpack_require__(25).EventEmitter,
	    inherits = __webpack_require__(24),
	    eventUtils = __webpack_require__(13),
	    browser = __webpack_require__(37),
	    urlUtils = __webpack_require__(16);
	
	var debug = function debug() {};
	if (process.env.NODE_ENV !== 'production') {
	  debug = __webpack_require__(21)('sockjs-client:sender:xdr');
	}
	
	// References:
	//   http://ajaxian.com/archives/100-line-ajax-wrapper
	//   http://msdn.microsoft.com/en-us/library/cc288060(v=VS.85).aspx
	
	function XDRObject(method, url, payload) {
	  debug(method, url);
	  var self = this;
	  EventEmitter.call(this);
	
	  setTimeout(function () {
	    self._start(method, url, payload);
	  }, 0);
	}
	
	inherits(XDRObject, EventEmitter);
	
	XDRObject.prototype._start = function (method, url, payload) {
	  debug('_start');
	  var self = this;
	  var xdr = new global.XDomainRequest();
	  // IE caches even POSTs
	  url = urlUtils.addQuery(url, 't=' + +new Date());
	
	  xdr.onerror = function () {
	    debug('onerror');
	    self._error();
	  };
	  xdr.ontimeout = function () {
	    debug('ontimeout');
	    self._error();
	  };
	  xdr.onprogress = function () {
	    debug('progress', xdr.responseText);
	    self.emit('chunk', 200, xdr.responseText);
	  };
	  xdr.onload = function () {
	    debug('load');
	    self.emit('finish', 200, xdr.responseText);
	    self._cleanup(false);
	  };
	  this.xdr = xdr;
	  this.unloadRef = eventUtils.unloadAdd(function () {
	    self._cleanup(true);
	  });
	  try {
	    // Fails with AccessDenied if port number is bogus
	    this.xdr.open(method, url);
	    if (this.timeout) {
	      this.xdr.timeout = this.timeout;
	    }
	    this.xdr.send(payload);
	  } catch (x) {
	    this._error();
	  }
	};
	
	XDRObject.prototype._error = function () {
	  this.emit('finish', 0, '');
	  this._cleanup(false);
	};
	
	XDRObject.prototype._cleanup = function (abort) {
	  debug('cleanup', abort);
	  if (!this.xdr) {
	    return;
	  }
	  this.removeAllListeners();
	  eventUtils.unloadDel(this.unloadRef);
	
	  this.xdr.ontimeout = this.xdr.onerror = this.xdr.onprogress = this.xdr.onload = null;
	  if (abort) {
	    try {
	      this.xdr.abort();
	    } catch (x) {
	      // intentionally empty
	    }
	  }
	  this.unloadRef = this.xdr = null;
	};
	
	XDRObject.prototype.close = function () {
	  debug('close');
	  this._cleanup(true);
	};
	
	// IE 8/9 if the request target uses the same scheme - #79
	XDRObject.enabled = !!(global.XDomainRequest && browser.hasDomain());
	
	module.exports = XDRObject;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(12), (function() { return this; }())))

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var inherits = __webpack_require__(24),
	    AjaxBasedTransport = __webpack_require__(29),
	    EventSourceReceiver = __webpack_require__(41),
	    XHRCorsObject = __webpack_require__(34),
	    EventSourceDriver = __webpack_require__(42);
	
	function EventSourceTransport(transUrl) {
	  if (!EventSourceTransport.enabled()) {
	    throw new Error('Transport created when disabled');
	  }
	
	  AjaxBasedTransport.call(this, transUrl, '/eventsource', EventSourceReceiver, XHRCorsObject);
	}
	
	inherits(EventSourceTransport, AjaxBasedTransport);
	
	EventSourceTransport.enabled = function () {
	  return !!EventSourceDriver;
	};
	
	EventSourceTransport.transportName = 'eventsource';
	EventSourceTransport.roundTrips = 2;
	
	module.exports = EventSourceTransport;

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';
	
	var inherits = __webpack_require__(24),
	    EventEmitter = __webpack_require__(25).EventEmitter,
	    EventSourceDriver = __webpack_require__(42);
	
	var debug = function debug() {};
	if (process.env.NODE_ENV !== 'production') {
	  debug = __webpack_require__(21)('sockjs-client:receiver:eventsource');
	}
	
	function EventSourceReceiver(url) {
	  debug(url);
	  EventEmitter.call(this);
	
	  var self = this;
	  var es = this.es = new EventSourceDriver(url);
	  es.onmessage = function (e) {
	    debug('message', e.data);
	    self.emit('message', decodeURI(e.data));
	  };
	  es.onerror = function (e) {
	    debug('error', es.readyState, e);
	    // ES on reconnection has readyState = 0 or 1.
	    // on network error it's CLOSED = 2
	    var reason = es.readyState !== 2 ? 'network' : 'permanent';
	    self._cleanup();
	    self._close(reason);
	  };
	}
	
	inherits(EventSourceReceiver, EventEmitter);
	
	EventSourceReceiver.prototype.abort = function () {
	  debug('abort');
	  this._cleanup();
	  this._close('user');
	};
	
	EventSourceReceiver.prototype._cleanup = function () {
	  debug('cleanup');
	  var es = this.es;
	  if (es) {
	    es.onmessage = es.onerror = null;
	    es.close();
	    this.es = null;
	  }
	};
	
	EventSourceReceiver.prototype._close = function (reason) {
	  debug('close', reason);
	  var self = this;
	  // Safari and chrome < 15 crash if we close window before
	  // waiting for ES cleanup. See:
	  // https://code.google.com/p/chromium/issues/detail?id=89155
	  setTimeout(function () {
	    self.emit('close', null, reason);
	    self.removeAllListeners();
	  }, 200);
	};
	
	module.exports = EventSourceReceiver;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(12)))

/***/ },
/* 42 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {"use strict";
	
	module.exports = global.EventSource;
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';
	
	var inherits = __webpack_require__(24),
	    IframeTransport = __webpack_require__(44),
	    objectUtils = __webpack_require__(48);
	
	module.exports = function (transport) {
	
	  function IframeWrapTransport(transUrl, baseUrl) {
	    IframeTransport.call(this, transport.transportName, transUrl, baseUrl);
	  }
	
	  inherits(IframeWrapTransport, IframeTransport);
	
	  IframeWrapTransport.enabled = function (url, info) {
	    if (!global.document) {
	      return false;
	    }
	
	    var iframeInfo = objectUtils.extend({}, info);
	    iframeInfo.sameOrigin = true;
	    return transport.enabled(iframeInfo) && IframeTransport.enabled();
	  };
	
	  IframeWrapTransport.transportName = 'iframe-' + transport.transportName;
	  IframeWrapTransport.needBody = true;
	  IframeWrapTransport.roundTrips = IframeTransport.roundTrips + transport.roundTrips - 1; // html, javascript (2) + transport - no CORS (1)
	
	  IframeWrapTransport.facadeTransport = transport;
	
	  return IframeWrapTransport;
	};
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';
	
	// Few cool transports do work only for same-origin. In order to make
	// them work cross-domain we shall use iframe, served from the
	// remote domain. New browsers have capabilities to communicate with
	// cross domain iframe using postMessage(). In IE it was implemented
	// from IE 8+, but of course, IE got some details wrong:
	//    http://msdn.microsoft.com/en-us/library/cc197015(v=VS.85).aspx
	//    http://stevesouders.com/misc/test-postmessage.php
	
	var inherits = __webpack_require__(24),
	    JSON3 = __webpack_require__(45),
	    EventEmitter = __webpack_require__(25).EventEmitter,
	    version = __webpack_require__(46),
	    urlUtils = __webpack_require__(16),
	    iframeUtils = __webpack_require__(47),
	    eventUtils = __webpack_require__(13),
	    random = __webpack_require__(14);
	
	var debug = function debug() {};
	if (process.env.NODE_ENV !== 'production') {
	  debug = __webpack_require__(21)('sockjs-client:transport:iframe');
	}
	
	function IframeTransport(transport, transUrl, baseUrl) {
	  if (!IframeTransport.enabled()) {
	    throw new Error('Transport created when disabled');
	  }
	  EventEmitter.call(this);
	
	  var self = this;
	  this.origin = urlUtils.getOrigin(baseUrl);
	  this.baseUrl = baseUrl;
	  this.transUrl = transUrl;
	  this.transport = transport;
	  this.windowId = random.string(8);
	
	  var iframeUrl = urlUtils.addPath(baseUrl, '/iframe.html') + '#' + this.windowId;
	  debug(transport, transUrl, iframeUrl);
	
	  this.iframeObj = iframeUtils.createIframe(iframeUrl, function (r) {
	    debug('err callback');
	    self.emit('close', 1006, 'Unable to load an iframe (' + r + ')');
	    self.close();
	  });
	
	  this.onmessageCallback = this._message.bind(this);
	  eventUtils.attachEvent('message', this.onmessageCallback);
	}
	
	inherits(IframeTransport, EventEmitter);
	
	IframeTransport.prototype.close = function () {
	  debug('close');
	  this.removeAllListeners();
	  if (this.iframeObj) {
	    eventUtils.detachEvent('message', this.onmessageCallback);
	    try {
	      // When the iframe is not loaded, IE raises an exception
	      // on 'contentWindow'.
	      this.postMessage('c');
	    } catch (x) {
	      // intentionally empty
	    }
	    this.iframeObj.cleanup();
	    this.iframeObj = null;
	    this.onmessageCallback = this.iframeObj = null;
	  }
	};
	
	IframeTransport.prototype._message = function (e) {
	  debug('message', e.data);
	  if (!urlUtils.isOriginEqual(e.origin, this.origin)) {
	    debug('not same origin', e.origin, this.origin);
	    return;
	  }
	
	  var iframeMessage;
	  try {
	    iframeMessage = JSON3.parse(e.data);
	  } catch (ignored) {
	    debug('bad json', e.data);
	    return;
	  }
	
	  if (iframeMessage.windowId !== this.windowId) {
	    debug('mismatched window id', iframeMessage.windowId, this.windowId);
	    return;
	  }
	
	  switch (iframeMessage.type) {
	    case 's':
	      this.iframeObj.loaded();
	      // window global dependency
	      this.postMessage('s', JSON3.stringify([version, this.transport, this.transUrl, this.baseUrl]));
	      break;
	    case 't':
	      this.emit('message', iframeMessage.data);
	      break;
	    case 'c':
	      var cdata;
	      try {
	        cdata = JSON3.parse(iframeMessage.data);
	      } catch (ignored) {
	        debug('bad json', iframeMessage.data);
	        return;
	      }
	      this.emit('close', cdata[0], cdata[1]);
	      this.close();
	      break;
	  }
	};
	
	IframeTransport.prototype.postMessage = function (type, data) {
	  debug('postMessage', type, data);
	  this.iframeObj.post(JSON3.stringify({
	    windowId: this.windowId,
	    type: type,
	    data: data || ''
	  }), this.origin);
	};
	
	IframeTransport.prototype.send = function (message) {
	  debug('send', message);
	  this.postMessage('m', message);
	};
	
	IframeTransport.enabled = function () {
	  return iframeUtils.iframeEnabled;
	};
	
	IframeTransport.transportName = 'iframe';
	IframeTransport.roundTrips = 2;
	
	module.exports = IframeTransport;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(12)))

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(module, global) {"use strict";
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	/*! JSON v3.3.2 | http://bestiejs.github.io/json3 | Copyright 2012-2014, Kit Cambridge | http://kit.mit-license.org */
	;(function () {
	  // Detect the `define` function exposed by asynchronous module loaders. The
	  // strict `define` check is necessary for compatibility with `r.js`.
	  var isLoader = "function" === "function" && __webpack_require__(5);
	
	  // A set of types used to distinguish objects from primitives.
	  var objectTypes = {
	    "function": true,
	    "object": true
	  };
	
	  // Detect the `exports` object exposed by CommonJS implementations.
	  var freeExports = objectTypes[ false ? "undefined" : _typeof(exports)] && exports && !exports.nodeType && exports;
	
	  // Use the `global` object exposed by Node (including Browserify via
	  // `insert-module-globals`), Narwhal, and Ringo as the default context,
	  // and the `window` object in browsers. Rhino exports a `global` function
	  // instead.
	  var root = objectTypes[typeof window === "undefined" ? "undefined" : _typeof(window)] && window || this,
	      freeGlobal = freeExports && objectTypes[ false ? "undefined" : _typeof(module)] && module && !module.nodeType && (typeof global === "undefined" ? "undefined" : _typeof(global)) == "object" && global;
	
	  if (freeGlobal && (freeGlobal["global"] === freeGlobal || freeGlobal["window"] === freeGlobal || freeGlobal["self"] === freeGlobal)) {
	    root = freeGlobal;
	  }
	
	  // Public: Initializes JSON 3 using the given `context` object, attaching the
	  // `stringify` and `parse` functions to the specified `exports` object.
	  function runInContext(context, exports) {
	    context || (context = root["Object"]());
	    exports || (exports = root["Object"]());
	
	    // Native constructor aliases.
	    var Number = context["Number"] || root["Number"],
	        String = context["String"] || root["String"],
	        Object = context["Object"] || root["Object"],
	        Date = context["Date"] || root["Date"],
	        SyntaxError = context["SyntaxError"] || root["SyntaxError"],
	        TypeError = context["TypeError"] || root["TypeError"],
	        Math = context["Math"] || root["Math"],
	        nativeJSON = context["JSON"] || root["JSON"];
	
	    // Delegate to the native `stringify` and `parse` implementations.
	    if ((typeof nativeJSON === "undefined" ? "undefined" : _typeof(nativeJSON)) == "object" && nativeJSON) {
	      exports.stringify = nativeJSON.stringify;
	      exports.parse = nativeJSON.parse;
	    }
	
	    // Convenience aliases.
	    var objectProto = Object.prototype,
	        getClass = objectProto.toString,
	        _isProperty,
	        _forEach,
	        undef;
	
	    // Test the `Date#getUTC*` methods. Based on work by @Yaffle.
	    var isExtended = new Date(-3509827334573292);
	    try {
	      // The `getUTCFullYear`, `Month`, and `Date` methods return nonsensical
	      // results for certain dates in Opera >= 10.53.
	      isExtended = isExtended.getUTCFullYear() == -109252 && isExtended.getUTCMonth() === 0 && isExtended.getUTCDate() === 1 &&
	      // Safari < 2.0.2 stores the internal millisecond time value correctly,
	      // but clips the values returned by the date methods to the range of
	      // signed 32-bit integers ([-2 ** 31, 2 ** 31 - 1]).
	      isExtended.getUTCHours() == 10 && isExtended.getUTCMinutes() == 37 && isExtended.getUTCSeconds() == 6 && isExtended.getUTCMilliseconds() == 708;
	    } catch (exception) {}
	
	    // Internal: Determines whether the native `JSON.stringify` and `parse`
	    // implementations are spec-compliant. Based on work by Ken Snyder.
	    function has(name) {
	      if (has[name] !== undef) {
	        // Return cached feature test result.
	        return has[name];
	      }
	      var isSupported;
	      if (name == "bug-string-char-index") {
	        // IE <= 7 doesn't support accessing string characters using square
	        // bracket notation. IE 8 only supports this for primitives.
	        isSupported = "a"[0] != "a";
	      } else if (name == "json") {
	        // Indicates whether both `JSON.stringify` and `JSON.parse` are
	        // supported.
	        isSupported = has("json-stringify") && has("json-parse");
	      } else {
	        var value,
	            serialized = "{\"a\":[1,true,false,null,\"\\u0000\\b\\n\\f\\r\\t\"]}";
	        // Test `JSON.stringify`.
	        if (name == "json-stringify") {
	          var stringify = exports.stringify,
	              stringifySupported = typeof stringify == "function" && isExtended;
	          if (stringifySupported) {
	            // A test function object with a custom `toJSON` method.
	            (value = function value() {
	              return 1;
	            }).toJSON = value;
	            try {
	              stringifySupported =
	              // Firefox 3.1b1 and b2 serialize string, number, and boolean
	              // primitives as object literals.
	              stringify(0) === "0" &&
	              // FF 3.1b1, b2, and JSON 2 serialize wrapped primitives as object
	              // literals.
	              stringify(new Number()) === "0" && stringify(new String()) == '""' &&
	              // FF 3.1b1, 2 throw an error if the value is `null`, `undefined`, or
	              // does not define a canonical JSON representation (this applies to
	              // objects with `toJSON` properties as well, *unless* they are nested
	              // within an object or array).
	              stringify(getClass) === undef &&
	              // IE 8 serializes `undefined` as `"undefined"`. Safari <= 5.1.7 and
	              // FF 3.1b3 pass this test.
	              stringify(undef) === undef &&
	              // Safari <= 5.1.7 and FF 3.1b3 throw `Error`s and `TypeError`s,
	              // respectively, if the value is omitted entirely.
	              stringify() === undef &&
	              // FF 3.1b1, 2 throw an error if the given value is not a number,
	              // string, array, object, Boolean, or `null` literal. This applies to
	              // objects with custom `toJSON` methods as well, unless they are nested
	              // inside object or array literals. YUI 3.0.0b1 ignores custom `toJSON`
	              // methods entirely.
	              stringify(value) === "1" && stringify([value]) == "[1]" &&
	              // Prototype <= 1.6.1 serializes `[undefined]` as `"[]"` instead of
	              // `"[null]"`.
	              stringify([undef]) == "[null]" &&
	              // YUI 3.0.0b1 fails to serialize `null` literals.
	              stringify(null) == "null" &&
	              // FF 3.1b1, 2 halts serialization if an array contains a function:
	              // `[1, true, getClass, 1]` serializes as "[1,true,],". FF 3.1b3
	              // elides non-JSON values from objects and arrays, unless they
	              // define custom `toJSON` methods.
	              stringify([undef, getClass, null]) == "[null,null,null]" &&
	              // Simple serialization test. FF 3.1b1 uses Unicode escape sequences
	              // where character escape codes are expected (e.g., `\b` => `\u0008`).
	              stringify({ "a": [value, true, false, null, "\x00\b\n\f\r\t"] }) == serialized &&
	              // FF 3.1b1 and b2 ignore the `filter` and `width` arguments.
	              stringify(null, value) === "1" && stringify([1, 2], null, 1) == "[\n 1,\n 2\n]" &&
	              // JSON 2, Prototype <= 1.7, and older WebKit builds incorrectly
	              // serialize extended years.
	              stringify(new Date(-8.64e15)) == '"-271821-04-20T00:00:00.000Z"' &&
	              // The milliseconds are optional in ES 5, but required in 5.1.
	              stringify(new Date(8.64e15)) == '"+275760-09-13T00:00:00.000Z"' &&
	              // Firefox <= 11.0 incorrectly serializes years prior to 0 as negative
	              // four-digit years instead of six-digit years. Credits: @Yaffle.
	              stringify(new Date(-621987552e5)) == '"-000001-01-01T00:00:00.000Z"' &&
	              // Safari <= 5.1.5 and Opera >= 10.53 incorrectly serialize millisecond
	              // values less than 1000. Credits: @Yaffle.
	              stringify(new Date(-1)) == '"1969-12-31T23:59:59.999Z"';
	            } catch (exception) {
	              stringifySupported = false;
	            }
	          }
	          isSupported = stringifySupported;
	        }
	        // Test `JSON.parse`.
	        if (name == "json-parse") {
	          var parse = exports.parse;
	          if (typeof parse == "function") {
	            try {
	              // FF 3.1b1, b2 will throw an exception if a bare literal is provided.
	              // Conforming implementations should also coerce the initial argument to
	              // a string prior to parsing.
	              if (parse("0") === 0 && !parse(false)) {
	                // Simple parsing test.
	                value = parse(serialized);
	                var parseSupported = value["a"].length == 5 && value["a"][0] === 1;
	                if (parseSupported) {
	                  try {
	                    // Safari <= 5.1.2 and FF 3.1b1 allow unescaped tabs in strings.
	                    parseSupported = !parse('"\t"');
	                  } catch (exception) {}
	                  if (parseSupported) {
	                    try {
	                      // FF 4.0 and 4.0.1 allow leading `+` signs and leading
	                      // decimal points. FF 4.0, 4.0.1, and IE 9-10 also allow
	                      // certain octal literals.
	                      parseSupported = parse("01") !== 1;
	                    } catch (exception) {}
	                  }
	                  if (parseSupported) {
	                    try {
	                      // FF 4.0, 4.0.1, and Rhino 1.7R3-R4 allow trailing decimal
	                      // points. These environments, along with FF 3.1b1 and 2,
	                      // also allow trailing commas in JSON objects and arrays.
	                      parseSupported = parse("1.") !== 1;
	                    } catch (exception) {}
	                  }
	                }
	              }
	            } catch (exception) {
	              parseSupported = false;
	            }
	          }
	          isSupported = parseSupported;
	        }
	      }
	      return has[name] = !!isSupported;
	    }
	
	    if (!has("json")) {
	      // Common `[[Class]]` name aliases.
	      var functionClass = "[object Function]",
	          dateClass = "[object Date]",
	          numberClass = "[object Number]",
	          stringClass = "[object String]",
	          arrayClass = "[object Array]",
	          booleanClass = "[object Boolean]";
	
	      // Detect incomplete support for accessing string characters by index.
	      var charIndexBuggy = has("bug-string-char-index");
	
	      // Define additional utility methods if the `Date` methods are buggy.
	      if (!isExtended) {
	        var floor = Math.floor;
	        // A mapping between the months of the year and the number of days between
	        // January 1st and the first of the respective month.
	        var Months = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
	        // Internal: Calculates the number of days between the Unix epoch and the
	        // first day of the given month.
	        var getDay = function getDay(year, month) {
	          return Months[month] + 365 * (year - 1970) + floor((year - 1969 + (month = +(month > 1))) / 4) - floor((year - 1901 + month) / 100) + floor((year - 1601 + month) / 400);
	        };
	      }
	
	      // Internal: Determines if a property is a direct property of the given
	      // object. Delegates to the native `Object#hasOwnProperty` method.
	      if (!(_isProperty = objectProto.hasOwnProperty)) {
	        _isProperty = function isProperty(property) {
	          var members = {},
	              constructor;
	          if ((members.__proto__ = null, members.__proto__ = {
	            // The *proto* property cannot be set multiple times in recent
	            // versions of Firefox and SeaMonkey.
	            "toString": 1
	          }, members).toString != getClass) {
	            // Safari <= 2.0.3 doesn't implement `Object#hasOwnProperty`, but
	            // supports the mutable *proto* property.
	            _isProperty = function isProperty(property) {
	              // Capture and break the object's prototype chain (see section 8.6.2
	              // of the ES 5.1 spec). The parenthesized expression prevents an
	              // unsafe transformation by the Closure Compiler.
	              var original = this.__proto__,
	                  result = property in (this.__proto__ = null, this);
	              // Restore the original prototype chain.
	              this.__proto__ = original;
	              return result;
	            };
	          } else {
	            // Capture a reference to the top-level `Object` constructor.
	            constructor = members.constructor;
	            // Use the `constructor` property to simulate `Object#hasOwnProperty` in
	            // other environments.
	            _isProperty = function isProperty(property) {
	              var parent = (this.constructor || constructor).prototype;
	              return property in this && !(property in parent && this[property] === parent[property]);
	            };
	          }
	          members = null;
	          return _isProperty.call(this, property);
	        };
	      }
	
	      // Internal: Normalizes the `for...in` iteration algorithm across
	      // environments. Each enumerated key is yielded to a `callback` function.
	      _forEach = function forEach(object, callback) {
	        var size = 0,
	            Properties,
	            members,
	            property;
	
	        // Tests for bugs in the current environment's `for...in` algorithm. The
	        // `valueOf` property inherits the non-enumerable flag from
	        // `Object.prototype` in older versions of IE, Netscape, and Mozilla.
	        (Properties = function Properties() {
	          this.valueOf = 0;
	        }).prototype.valueOf = 0;
	
	        // Iterate over a new instance of the `Properties` class.
	        members = new Properties();
	        for (property in members) {
	          // Ignore all properties inherited from `Object.prototype`.
	          if (_isProperty.call(members, property)) {
	            size++;
	          }
	        }
	        Properties = members = null;
	
	        // Normalize the iteration algorithm.
	        if (!size) {
	          // A list of non-enumerable properties inherited from `Object.prototype`.
	          members = ["valueOf", "toString", "toLocaleString", "propertyIsEnumerable", "isPrototypeOf", "hasOwnProperty", "constructor"];
	          // IE <= 8, Mozilla 1.0, and Netscape 6.2 ignore shadowed non-enumerable
	          // properties.
	          _forEach = function forEach(object, callback) {
	            var isFunction = getClass.call(object) == functionClass,
	                property,
	                length;
	            var hasProperty = !isFunction && typeof object.constructor != "function" && objectTypes[_typeof(object.hasOwnProperty)] && object.hasOwnProperty || _isProperty;
	            for (property in object) {
	              // Gecko <= 1.0 enumerates the `prototype` property of functions under
	              // certain conditions; IE does not.
	              if (!(isFunction && property == "prototype") && hasProperty.call(object, property)) {
	                callback(property);
	              }
	            }
	            // Manually invoke the callback for each non-enumerable property.
	            for (length = members.length; property = members[--length]; hasProperty.call(object, property) && callback(property)) {}
	          };
	        } else if (size == 2) {
	          // Safari <= 2.0.4 enumerates shadowed properties twice.
	          _forEach = function forEach(object, callback) {
	            // Create a set of iterated properties.
	            var members = {},
	                isFunction = getClass.call(object) == functionClass,
	                property;
	            for (property in object) {
	              // Store each property name to prevent double enumeration. The
	              // `prototype` property of functions is not enumerated due to cross-
	              // environment inconsistencies.
	              if (!(isFunction && property == "prototype") && !_isProperty.call(members, property) && (members[property] = 1) && _isProperty.call(object, property)) {
	                callback(property);
	              }
	            }
	          };
	        } else {
	          // No bugs detected; use the standard `for...in` algorithm.
	          _forEach = function forEach(object, callback) {
	            var isFunction = getClass.call(object) == functionClass,
	                property,
	                isConstructor;
	            for (property in object) {
	              if (!(isFunction && property == "prototype") && _isProperty.call(object, property) && !(isConstructor = property === "constructor")) {
	                callback(property);
	              }
	            }
	            // Manually invoke the callback for the `constructor` property due to
	            // cross-environment inconsistencies.
	            if (isConstructor || _isProperty.call(object, property = "constructor")) {
	              callback(property);
	            }
	          };
	        }
	        return _forEach(object, callback);
	      };
	
	      // Public: Serializes a JavaScript `value` as a JSON string. The optional
	      // `filter` argument may specify either a function that alters how object and
	      // array members are serialized, or an array of strings and numbers that
	      // indicates which properties should be serialized. The optional `width`
	      // argument may be either a string or number that specifies the indentation
	      // level of the output.
	      if (!has("json-stringify")) {
	        // Internal: A map of control characters and their escaped equivalents.
	        var Escapes = {
	          92: "\\\\",
	          34: '\\"',
	          8: "\\b",
	          12: "\\f",
	          10: "\\n",
	          13: "\\r",
	          9: "\\t"
	        };
	
	        // Internal: Converts `value` into a zero-padded string such that its
	        // length is at least equal to `width`. The `width` must be <= 6.
	        var leadingZeroes = "000000";
	        var toPaddedString = function toPaddedString(width, value) {
	          // The `|| 0` expression is necessary to work around a bug in
	          // Opera <= 7.54u2 where `0 == -0`, but `String(-0) !== "0"`.
	          return (leadingZeroes + (value || 0)).slice(-width);
	        };
	
	        // Internal: Double-quotes a string `value`, replacing all ASCII control
	        // characters (characters with code unit values between 0 and 31) with
	        // their escaped equivalents. This is an implementation of the
	        // `Quote(value)` operation defined in ES 5.1 section 15.12.3.
	        var unicodePrefix = "\\u00";
	        var quote = function quote(value) {
	          var result = '"',
	              index = 0,
	              length = value.length,
	              useCharIndex = !charIndexBuggy || length > 10;
	          var symbols = useCharIndex && (charIndexBuggy ? value.split("") : value);
	          for (; index < length; index++) {
	            var charCode = value.charCodeAt(index);
	            // If the character is a control character, append its Unicode or
	            // shorthand escape sequence; otherwise, append the character as-is.
	            switch (charCode) {
	              case 8:case 9:case 10:case 12:case 13:case 34:case 92:
	                result += Escapes[charCode];
	                break;
	              default:
	                if (charCode < 32) {
	                  result += unicodePrefix + toPaddedString(2, charCode.toString(16));
	                  break;
	                }
	                result += useCharIndex ? symbols[index] : value.charAt(index);
	            }
	          }
	          return result + '"';
	        };
	
	        // Internal: Recursively serializes an object. Implements the
	        // `Str(key, holder)`, `JO(value)`, and `JA(value)` operations.
	        var serialize = function serialize(property, object, callback, properties, whitespace, indentation, stack) {
	          var value, className, year, month, date, time, hours, minutes, seconds, milliseconds, results, element, index, length, prefix, result;
	          try {
	            // Necessary for host object support.
	            value = object[property];
	          } catch (exception) {}
	          if ((typeof value === "undefined" ? "undefined" : _typeof(value)) == "object" && value) {
	            className = getClass.call(value);
	            if (className == dateClass && !_isProperty.call(value, "toJSON")) {
	              if (value > -1 / 0 && value < 1 / 0) {
	                // Dates are serialized according to the `Date#toJSON` method
	                // specified in ES 5.1 section 15.9.5.44. See section 15.9.1.15
	                // for the ISO 8601 date time string format.
	                if (getDay) {
	                  // Manually compute the year, month, date, hours, minutes,
	                  // seconds, and milliseconds if the `getUTC*` methods are
	                  // buggy. Adapted from @Yaffle's `date-shim` project.
	                  date = floor(value / 864e5);
	                  for (year = floor(date / 365.2425) + 1970 - 1; getDay(year + 1, 0) <= date; year++) {}
	                  for (month = floor((date - getDay(year, 0)) / 30.42); getDay(year, month + 1) <= date; month++) {}
	                  date = 1 + date - getDay(year, month);
	                  // The `time` value specifies the time within the day (see ES
	                  // 5.1 section 15.9.1.2). The formula `(A % B + B) % B` is used
	                  // to compute `A modulo B`, as the `%` operator does not
	                  // correspond to the `modulo` operation for negative numbers.
	                  time = (value % 864e5 + 864e5) % 864e5;
	                  // The hours, minutes, seconds, and milliseconds are obtained by
	                  // decomposing the time within the day. See section 15.9.1.10.
	                  hours = floor(time / 36e5) % 24;
	                  minutes = floor(time / 6e4) % 60;
	                  seconds = floor(time / 1e3) % 60;
	                  milliseconds = time % 1e3;
	                } else {
	                  year = value.getUTCFullYear();
	                  month = value.getUTCMonth();
	                  date = value.getUTCDate();
	                  hours = value.getUTCHours();
	                  minutes = value.getUTCMinutes();
	                  seconds = value.getUTCSeconds();
	                  milliseconds = value.getUTCMilliseconds();
	                }
	                // Serialize extended years correctly.
	                value = (year <= 0 || year >= 1e4 ? (year < 0 ? "-" : "+") + toPaddedString(6, year < 0 ? -year : year) : toPaddedString(4, year)) + "-" + toPaddedString(2, month + 1) + "-" + toPaddedString(2, date) +
	                // Months, dates, hours, minutes, and seconds should have two
	                // digits; milliseconds should have three.
	                "T" + toPaddedString(2, hours) + ":" + toPaddedString(2, minutes) + ":" + toPaddedString(2, seconds) +
	                // Milliseconds are optional in ES 5.0, but required in 5.1.
	                "." + toPaddedString(3, milliseconds) + "Z";
	              } else {
	                value = null;
	              }
	            } else if (typeof value.toJSON == "function" && (className != numberClass && className != stringClass && className != arrayClass || _isProperty.call(value, "toJSON"))) {
	              // Prototype <= 1.6.1 adds non-standard `toJSON` methods to the
	              // `Number`, `String`, `Date`, and `Array` prototypes. JSON 3
	              // ignores all `toJSON` methods on these objects unless they are
	              // defined directly on an instance.
	              value = value.toJSON(property);
	            }
	          }
	          if (callback) {
	            // If a replacement function was provided, call it to obtain the value
	            // for serialization.
	            value = callback.call(object, property, value);
	          }
	          if (value === null) {
	            return "null";
	          }
	          className = getClass.call(value);
	          if (className == booleanClass) {
	            // Booleans are represented literally.
	            return "" + value;
	          } else if (className == numberClass) {
	            // JSON numbers must be finite. `Infinity` and `NaN` are serialized as
	            // `"null"`.
	            return value > -1 / 0 && value < 1 / 0 ? "" + value : "null";
	          } else if (className == stringClass) {
	            // Strings are double-quoted and escaped.
	            return quote("" + value);
	          }
	          // Recursively serialize objects and arrays.
	          if ((typeof value === "undefined" ? "undefined" : _typeof(value)) == "object") {
	            // Check for cyclic structures. This is a linear search; performance
	            // is inversely proportional to the number of unique nested objects.
	            for (length = stack.length; length--;) {
	              if (stack[length] === value) {
	                // Cyclic structures cannot be serialized by `JSON.stringify`.
	                throw TypeError();
	              }
	            }
	            // Add the object to the stack of traversed objects.
	            stack.push(value);
	            results = [];
	            // Save the current indentation level and indent one additional level.
	            prefix = indentation;
	            indentation += whitespace;
	            if (className == arrayClass) {
	              // Recursively serialize array elements.
	              for (index = 0, length = value.length; index < length; index++) {
	                element = serialize(index, value, callback, properties, whitespace, indentation, stack);
	                results.push(element === undef ? "null" : element);
	              }
	              result = results.length ? whitespace ? "[\n" + indentation + results.join(",\n" + indentation) + "\n" + prefix + "]" : "[" + results.join(",") + "]" : "[]";
	            } else {
	              // Recursively serialize object members. Members are selected from
	              // either a user-specified list of property names, or the object
	              // itself.
	              _forEach(properties || value, function (property) {
	                var element = serialize(property, value, callback, properties, whitespace, indentation, stack);
	                if (element !== undef) {
	                  // According to ES 5.1 section 15.12.3: "If `gap` {whitespace}
	                  // is not the empty string, let `member` {quote(property) + ":"}
	                  // be the concatenation of `member` and the `space` character."
	                  // The "`space` character" refers to the literal space
	                  // character, not the `space` {width} argument provided to
	                  // `JSON.stringify`.
	                  results.push(quote(property) + ":" + (whitespace ? " " : "") + element);
	                }
	              });
	              result = results.length ? whitespace ? "{\n" + indentation + results.join(",\n" + indentation) + "\n" + prefix + "}" : "{" + results.join(",") + "}" : "{}";
	            }
	            // Remove the object from the traversed object stack.
	            stack.pop();
	            return result;
	          }
	        };
	
	        // Public: `JSON.stringify`. See ES 5.1 section 15.12.3.
	        exports.stringify = function (source, filter, width) {
	          var whitespace, callback, properties, className;
	          if (objectTypes[typeof filter === "undefined" ? "undefined" : _typeof(filter)] && filter) {
	            if ((className = getClass.call(filter)) == functionClass) {
	              callback = filter;
	            } else if (className == arrayClass) {
	              // Convert the property names array into a makeshift set.
	              properties = {};
	              for (var index = 0, length = filter.length, value; index < length; value = filter[index++], (className = getClass.call(value), className == stringClass || className == numberClass) && (properties[value] = 1)) {}
	            }
	          }
	          if (width) {
	            if ((className = getClass.call(width)) == numberClass) {
	              // Convert the `width` to an integer and create a string containing
	              // `width` number of space characters.
	              if ((width -= width % 1) > 0) {
	                for (whitespace = "", width > 10 && (width = 10); whitespace.length < width; whitespace += " ") {}
	              }
	            } else if (className == stringClass) {
	              whitespace = width.length <= 10 ? width : width.slice(0, 10);
	            }
	          }
	          // Opera <= 7.54u2 discards the values associated with empty string keys
	          // (`""`) only if they are used directly within an object member list
	          // (e.g., `!("" in { "": 1})`).
	          return serialize("", (value = {}, value[""] = source, value), callback, properties, whitespace, "", []);
	        };
	      }
	
	      // Public: Parses a JSON source string.
	      if (!has("json-parse")) {
	        var fromCharCode = String.fromCharCode;
	
	        // Internal: A map of escaped control characters and their unescaped
	        // equivalents.
	        var Unescapes = {
	          92: "\\",
	          34: '"',
	          47: "/",
	          98: "\b",
	          116: "\t",
	          110: "\n",
	          102: "\f",
	          114: "\r"
	        };
	
	        // Internal: Stores the parser state.
	        var Index, Source;
	
	        // Internal: Resets the parser state and throws a `SyntaxError`.
	        var abort = function abort() {
	          Index = Source = null;
	          throw SyntaxError();
	        };
	
	        // Internal: Returns the next token, or `"$"` if the parser has reached
	        // the end of the source string. A token may be a string, number, `null`
	        // literal, or Boolean literal.
	        var lex = function lex() {
	          var source = Source,
	              length = source.length,
	              value,
	              begin,
	              position,
	              isSigned,
	              charCode;
	          while (Index < length) {
	            charCode = source.charCodeAt(Index);
	            switch (charCode) {
	              case 9:case 10:case 13:case 32:
	                // Skip whitespace tokens, including tabs, carriage returns, line
	                // feeds, and space characters.
	                Index++;
	                break;
	              case 123:case 125:case 91:case 93:case 58:case 44:
	                // Parse a punctuator token (`{`, `}`, `[`, `]`, `:`, or `,`) at
	                // the current position.
	                value = charIndexBuggy ? source.charAt(Index) : source[Index];
	                Index++;
	                return value;
	              case 34:
	                // `"` delimits a JSON string; advance to the next character and
	                // begin parsing the string. String tokens are prefixed with the
	                // sentinel `@` character to distinguish them from punctuators and
	                // end-of-string tokens.
	                for (value = "@", Index++; Index < length;) {
	                  charCode = source.charCodeAt(Index);
	                  if (charCode < 32) {
	                    // Unescaped ASCII control characters (those with a code unit
	                    // less than the space character) are not permitted.
	                    abort();
	                  } else if (charCode == 92) {
	                    // A reverse solidus (`\`) marks the beginning of an escaped
	                    // control character (including `"`, `\`, and `/`) or Unicode
	                    // escape sequence.
	                    charCode = source.charCodeAt(++Index);
	                    switch (charCode) {
	                      case 92:case 34:case 47:case 98:case 116:case 110:case 102:case 114:
	                        // Revive escaped control characters.
	                        value += Unescapes[charCode];
	                        Index++;
	                        break;
	                      case 117:
	                        // `\u` marks the beginning of a Unicode escape sequence.
	                        // Advance to the first character and validate the
	                        // four-digit code point.
	                        begin = ++Index;
	                        for (position = Index + 4; Index < position; Index++) {
	                          charCode = source.charCodeAt(Index);
	                          // A valid sequence comprises four hexdigits (case-
	                          // insensitive) that form a single hexadecimal value.
	                          if (!(charCode >= 48 && charCode <= 57 || charCode >= 97 && charCode <= 102 || charCode >= 65 && charCode <= 70)) {
	                            // Invalid Unicode escape sequence.
	                            abort();
	                          }
	                        }
	                        // Revive the escaped character.
	                        value += fromCharCode("0x" + source.slice(begin, Index));
	                        break;
	                      default:
	                        // Invalid escape sequence.
	                        abort();
	                    }
	                  } else {
	                    if (charCode == 34) {
	                      // An unescaped double-quote character marks the end of the
	                      // string.
	                      break;
	                    }
	                    charCode = source.charCodeAt(Index);
	                    begin = Index;
	                    // Optimize for the common case where a string is valid.
	                    while (charCode >= 32 && charCode != 92 && charCode != 34) {
	                      charCode = source.charCodeAt(++Index);
	                    }
	                    // Append the string as-is.
	                    value += source.slice(begin, Index);
	                  }
	                }
	                if (source.charCodeAt(Index) == 34) {
	                  // Advance to the next character and return the revived string.
	                  Index++;
	                  return value;
	                }
	                // Unterminated string.
	                abort();
	              default:
	                // Parse numbers and literals.
	                begin = Index;
	                // Advance past the negative sign, if one is specified.
	                if (charCode == 45) {
	                  isSigned = true;
	                  charCode = source.charCodeAt(++Index);
	                }
	                // Parse an integer or floating-point value.
	                if (charCode >= 48 && charCode <= 57) {
	                  // Leading zeroes are interpreted as octal literals.
	                  if (charCode == 48 && (charCode = source.charCodeAt(Index + 1), charCode >= 48 && charCode <= 57)) {
	                    // Illegal octal literal.
	                    abort();
	                  }
	                  isSigned = false;
	                  // Parse the integer component.
	                  for (; Index < length && (charCode = source.charCodeAt(Index), charCode >= 48 && charCode <= 57); Index++) {}
	                  // Floats cannot contain a leading decimal point; however, this
	                  // case is already accounted for by the parser.
	                  if (source.charCodeAt(Index) == 46) {
	                    position = ++Index;
	                    // Parse the decimal component.
	                    for (; position < length && (charCode = source.charCodeAt(position), charCode >= 48 && charCode <= 57); position++) {}
	                    if (position == Index) {
	                      // Illegal trailing decimal.
	                      abort();
	                    }
	                    Index = position;
	                  }
	                  // Parse exponents. The `e` denoting the exponent is
	                  // case-insensitive.
	                  charCode = source.charCodeAt(Index);
	                  if (charCode == 101 || charCode == 69) {
	                    charCode = source.charCodeAt(++Index);
	                    // Skip past the sign following the exponent, if one is
	                    // specified.
	                    if (charCode == 43 || charCode == 45) {
	                      Index++;
	                    }
	                    // Parse the exponential component.
	                    for (position = Index; position < length && (charCode = source.charCodeAt(position), charCode >= 48 && charCode <= 57); position++) {}
	                    if (position == Index) {
	                      // Illegal empty exponent.
	                      abort();
	                    }
	                    Index = position;
	                  }
	                  // Coerce the parsed value to a JavaScript number.
	                  return +source.slice(begin, Index);
	                }
	                // A negative sign may only precede numbers.
	                if (isSigned) {
	                  abort();
	                }
	                // `true`, `false`, and `null` literals.
	                if (source.slice(Index, Index + 4) == "true") {
	                  Index += 4;
	                  return true;
	                } else if (source.slice(Index, Index + 5) == "false") {
	                  Index += 5;
	                  return false;
	                } else if (source.slice(Index, Index + 4) == "null") {
	                  Index += 4;
	                  return null;
	                }
	                // Unrecognized token.
	                abort();
	            }
	          }
	          // Return the sentinel `$` character if the parser has reached the end
	          // of the source string.
	          return "$";
	        };
	
	        // Internal: Parses a JSON `value` token.
	        var get = function get(value) {
	          var results, hasMembers;
	          if (value == "$") {
	            // Unexpected end of input.
	            abort();
	          }
	          if (typeof value == "string") {
	            if ((charIndexBuggy ? value.charAt(0) : value[0]) == "@") {
	              // Remove the sentinel `@` character.
	              return value.slice(1);
	            }
	            // Parse object and array literals.
	            if (value == "[") {
	              // Parses a JSON array, returning a new JavaScript array.
	              results = [];
	              for (;; hasMembers || (hasMembers = true)) {
	                value = lex();
	                // A closing square bracket marks the end of the array literal.
	                if (value == "]") {
	                  break;
	                }
	                // If the array literal contains elements, the current token
	                // should be a comma separating the previous element from the
	                // next.
	                if (hasMembers) {
	                  if (value == ",") {
	                    value = lex();
	                    if (value == "]") {
	                      // Unexpected trailing `,` in array literal.
	                      abort();
	                    }
	                  } else {
	                    // A `,` must separate each array element.
	                    abort();
	                  }
	                }
	                // Elisions and leading commas are not permitted.
	                if (value == ",") {
	                  abort();
	                }
	                results.push(get(value));
	              }
	              return results;
	            } else if (value == "{") {
	              // Parses a JSON object, returning a new JavaScript object.
	              results = {};
	              for (;; hasMembers || (hasMembers = true)) {
	                value = lex();
	                // A closing curly brace marks the end of the object literal.
	                if (value == "}") {
	                  break;
	                }
	                // If the object literal contains members, the current token
	                // should be a comma separator.
	                if (hasMembers) {
	                  if (value == ",") {
	                    value = lex();
	                    if (value == "}") {
	                      // Unexpected trailing `,` in object literal.
	                      abort();
	                    }
	                  } else {
	                    // A `,` must separate each object member.
	                    abort();
	                  }
	                }
	                // Leading commas are not permitted, object property names must be
	                // double-quoted strings, and a `:` must separate each property
	                // name and value.
	                if (value == "," || typeof value != "string" || (charIndexBuggy ? value.charAt(0) : value[0]) != "@" || lex() != ":") {
	                  abort();
	                }
	                results[value.slice(1)] = get(lex());
	              }
	              return results;
	            }
	            // Unexpected token encountered.
	            abort();
	          }
	          return value;
	        };
	
	        // Internal: Updates a traversed object member.
	        var update = function update(source, property, callback) {
	          var element = walk(source, property, callback);
	          if (element === undef) {
	            delete source[property];
	          } else {
	            source[property] = element;
	          }
	        };
	
	        // Internal: Recursively traverses a parsed JSON object, invoking the
	        // `callback` function for each value. This is an implementation of the
	        // `Walk(holder, name)` operation defined in ES 5.1 section 15.12.2.
	        var walk = function walk(source, property, callback) {
	          var value = source[property],
	              length;
	          if ((typeof value === "undefined" ? "undefined" : _typeof(value)) == "object" && value) {
	            // `forEach` can't be used to traverse an array in Opera <= 8.54
	            // because its `Object#hasOwnProperty` implementation returns `false`
	            // for array indices (e.g., `![1, 2, 3].hasOwnProperty("0")`).
	            if (getClass.call(value) == arrayClass) {
	              for (length = value.length; length--;) {
	                update(value, length, callback);
	              }
	            } else {
	              _forEach(value, function (property) {
	                update(value, property, callback);
	              });
	            }
	          }
	          return callback.call(source, property, value);
	        };
	
	        // Public: `JSON.parse`. See ES 5.1 section 15.12.2.
	        exports.parse = function (source, callback) {
	          var result, value;
	          Index = 0;
	          Source = "" + source;
	          result = get(lex());
	          // If a JSON string contains multiple tokens, it is invalid.
	          if (lex() != "$") {
	            abort();
	          }
	          // Reset the parser state.
	          Index = Source = null;
	          return callback && getClass.call(callback) == functionClass ? walk((value = {}, value[""] = result, value), "", callback) : result;
	        };
	      }
	    }
	
	    exports["runInContext"] = runInContext;
	    return exports;
	  }
	
	  if (freeExports && !isLoader) {
	    // Export for CommonJS environments.
	    runInContext(root, freeExports);
	  } else {
	    // Export for web browsers and JavaScript engines.
	    var nativeJSON = root.JSON,
	        previousJSON = root["JSON3"],
	        isRestored = false;
	
	    var JSON3 = runInContext(root, root["JSON3"] = {
	      // Public: Restores the original value of the global `JSON` object and
	      // returns a reference to the `JSON3` object.
	      "noConflict": function noConflict() {
	        if (!isRestored) {
	          isRestored = true;
	          root.JSON = nativeJSON;
	          root["JSON3"] = previousJSON;
	          nativeJSON = previousJSON = null;
	        }
	        return JSON3;
	      }
	    });
	
	    root.JSON = {
	      "parse": JSON3.parse,
	      "stringify": JSON3.stringify
	    };
	  }
	
	  // Export for asynchronous module loaders.
	  if (isLoader) {
	    !(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
	      return JSON3;
	    }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  }
	}).call(undefined);
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)(module), (function() { return this; }())))

/***/ },
/* 46 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = '1.1.1';

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process, global) {'use strict';
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	var eventUtils = __webpack_require__(13),
	    JSON3 = __webpack_require__(45),
	    browser = __webpack_require__(37);
	
	var debug = function debug() {};
	if (process.env.NODE_ENV !== 'production') {
	  debug = __webpack_require__(21)('sockjs-client:utils:iframe');
	}
	
	module.exports = {
	  WPrefix: '_jp',
	  currentWindowId: null,
	
	  polluteGlobalNamespace: function polluteGlobalNamespace() {
	    if (!(module.exports.WPrefix in global)) {
	      global[module.exports.WPrefix] = {};
	    }
	  },
	
	  postMessage: function postMessage(type, data) {
	    if (global.parent !== global) {
	      global.parent.postMessage(JSON3.stringify({
	        windowId: module.exports.currentWindowId,
	        type: type,
	        data: data || ''
	      }), '*');
	    } else {
	      debug('Cannot postMessage, no parent window.', type, data);
	    }
	  },
	
	  createIframe: function createIframe(iframeUrl, errorCallback) {
	    var iframe = global.document.createElement('iframe');
	    var tref, unloadRef;
	    var unattach = function unattach() {
	      debug('unattach');
	      clearTimeout(tref);
	      // Explorer had problems with that.
	      try {
	        iframe.onload = null;
	      } catch (x) {
	        // intentionally empty
	      }
	      iframe.onerror = null;
	    };
	    var cleanup = function cleanup() {
	      debug('cleanup');
	      if (iframe) {
	        unattach();
	        // This timeout makes chrome fire onbeforeunload event
	        // within iframe. Without the timeout it goes straight to
	        // onunload.
	        setTimeout(function () {
	          if (iframe) {
	            iframe.parentNode.removeChild(iframe);
	          }
	          iframe = null;
	        }, 0);
	        eventUtils.unloadDel(unloadRef);
	      }
	    };
	    var onerror = function onerror(err) {
	      debug('onerror', err);
	      if (iframe) {
	        cleanup();
	        errorCallback(err);
	      }
	    };
	    var post = function post(msg, origin) {
	      debug('post', msg, origin);
	      try {
	        // When the iframe is not loaded, IE raises an exception
	        // on 'contentWindow'.
	        setTimeout(function () {
	          if (iframe && iframe.contentWindow) {
	            iframe.contentWindow.postMessage(msg, origin);
	          }
	        }, 0);
	      } catch (x) {
	        // intentionally empty
	      }
	    };
	
	    iframe.src = iframeUrl;
	    iframe.style.display = 'none';
	    iframe.style.position = 'absolute';
	    iframe.onerror = function () {
	      onerror('onerror');
	    };
	    iframe.onload = function () {
	      debug('onload');
	      // `onload` is triggered before scripts on the iframe are
	      // executed. Give it few seconds to actually load stuff.
	      clearTimeout(tref);
	      tref = setTimeout(function () {
	        onerror('onload timeout');
	      }, 2000);
	    };
	    global.document.body.appendChild(iframe);
	    tref = setTimeout(function () {
	      onerror('timeout');
	    }, 15000);
	    unloadRef = eventUtils.unloadAdd(cleanup);
	    return {
	      post: post,
	      cleanup: cleanup,
	      loaded: unattach
	    };
	  }
	
	  /* jshint undef: false, newcap: false */
	  /* eslint no-undef: 0, new-cap: 0 */
	  , createHtmlfile: function createHtmlfile(iframeUrl, errorCallback) {
	    var axo = ['Active'].concat('Object').join('X');
	    var doc = new global[axo]('htmlfile');
	    var tref, unloadRef;
	    var iframe;
	    var unattach = function unattach() {
	      clearTimeout(tref);
	      iframe.onerror = null;
	    };
	    var cleanup = function cleanup() {
	      if (doc) {
	        unattach();
	        eventUtils.unloadDel(unloadRef);
	        iframe.parentNode.removeChild(iframe);
	        iframe = doc = null;
	        CollectGarbage();
	      }
	    };
	    var onerror = function onerror(r) {
	      debug('onerror', r);
	      if (doc) {
	        cleanup();
	        errorCallback(r);
	      }
	    };
	    var post = function post(msg, origin) {
	      try {
	        // When the iframe is not loaded, IE raises an exception
	        // on 'contentWindow'.
	        setTimeout(function () {
	          if (iframe && iframe.contentWindow) {
	            iframe.contentWindow.postMessage(msg, origin);
	          }
	        }, 0);
	      } catch (x) {
	        // intentionally empty
	      }
	    };
	
	    doc.open();
	    doc.write('<html><s' + 'cript>' + 'document.domain="' + global.document.domain + '";' + '</s' + 'cript></html>');
	    doc.close();
	    doc.parentWindow[module.exports.WPrefix] = global[module.exports.WPrefix];
	    var c = doc.createElement('div');
	    doc.body.appendChild(c);
	    iframe = doc.createElement('iframe');
	    c.appendChild(iframe);
	    iframe.src = iframeUrl;
	    iframe.onerror = function () {
	      onerror('onerror');
	    };
	    tref = setTimeout(function () {
	      onerror('timeout');
	    }, 15000);
	    unloadRef = eventUtils.unloadAdd(cleanup);
	    return {
	      post: post,
	      cleanup: cleanup,
	      loaded: unattach
	    };
	  }
	};
	
	module.exports.iframeEnabled = false;
	if (global.document) {
	  // postMessage misbehaves in konqueror 4.6.5 - the messages are delivered with
	  // huge delay, or not at all.
	  module.exports.iframeEnabled = (typeof global.postMessage === 'function' || _typeof(global.postMessage) === 'object') && !browser.isKonqueror();
	}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(12), (function() { return this; }())))

/***/ },
/* 48 */
/***/ function(module, exports) {

	'use strict';
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	module.exports = {
	  isObject: function isObject(obj) {
	    var type = typeof obj === 'undefined' ? 'undefined' : _typeof(obj);
	    return type === 'function' || type === 'object' && !!obj;
	  },
	
	  extend: function extend(obj) {
	    if (!this.isObject(obj)) {
	      return obj;
	    }
	    var source, prop;
	    for (var i = 1, length = arguments.length; i < length; i++) {
	      source = arguments[i];
	      for (prop in source) {
	        if (Object.prototype.hasOwnProperty.call(source, prop)) {
	          obj[prop] = source[prop];
	        }
	      }
	    }
	    return obj;
	  }
	};

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var inherits = __webpack_require__(24),
	    HtmlfileReceiver = __webpack_require__(50),
	    XHRLocalObject = __webpack_require__(36),
	    AjaxBasedTransport = __webpack_require__(29);
	
	function HtmlFileTransport(transUrl) {
	  if (!HtmlfileReceiver.enabled) {
	    throw new Error('Transport created when disabled');
	  }
	  AjaxBasedTransport.call(this, transUrl, '/htmlfile', HtmlfileReceiver, XHRLocalObject);
	}
	
	inherits(HtmlFileTransport, AjaxBasedTransport);
	
	HtmlFileTransport.enabled = function (info) {
	  return HtmlfileReceiver.enabled && info.sameOrigin;
	};
	
	HtmlFileTransport.transportName = 'htmlfile';
	HtmlFileTransport.roundTrips = 2;
	
	module.exports = HtmlFileTransport;

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process, global) {'use strict';
	
	var inherits = __webpack_require__(24),
	    iframeUtils = __webpack_require__(47),
	    urlUtils = __webpack_require__(16),
	    EventEmitter = __webpack_require__(25).EventEmitter,
	    random = __webpack_require__(14);
	
	var debug = function debug() {};
	if (process.env.NODE_ENV !== 'production') {
	  debug = __webpack_require__(21)('sockjs-client:receiver:htmlfile');
	}
	
	function HtmlfileReceiver(url) {
	  debug(url);
	  EventEmitter.call(this);
	  var self = this;
	  iframeUtils.polluteGlobalNamespace();
	
	  this.id = 'a' + random.string(6);
	  url = urlUtils.addQuery(url, 'c=' + decodeURIComponent(iframeUtils.WPrefix + '.' + this.id));
	
	  debug('using htmlfile', HtmlfileReceiver.htmlfileEnabled);
	  var constructFunc = HtmlfileReceiver.htmlfileEnabled ? iframeUtils.createHtmlfile : iframeUtils.createIframe;
	
	  global[iframeUtils.WPrefix][this.id] = {
	    start: function start() {
	      debug('start');
	      self.iframeObj.loaded();
	    },
	    message: function message(data) {
	      debug('message', data);
	      self.emit('message', data);
	    },
	    stop: function stop() {
	      debug('stop');
	      self._cleanup();
	      self._close('network');
	    }
	  };
	  this.iframeObj = constructFunc(url, function () {
	    debug('callback');
	    self._cleanup();
	    self._close('permanent');
	  });
	}
	
	inherits(HtmlfileReceiver, EventEmitter);
	
	HtmlfileReceiver.prototype.abort = function () {
	  debug('abort');
	  this._cleanup();
	  this._close('user');
	};
	
	HtmlfileReceiver.prototype._cleanup = function () {
	  debug('_cleanup');
	  if (this.iframeObj) {
	    this.iframeObj.cleanup();
	    this.iframeObj = null;
	  }
	  delete global[iframeUtils.WPrefix][this.id];
	};
	
	HtmlfileReceiver.prototype._close = function (reason) {
	  debug('_close', reason);
	  this.emit('close', null, reason);
	  this.removeAllListeners();
	};
	
	HtmlfileReceiver.htmlfileEnabled = false;
	
	// obfuscate to avoid firewalls
	var axo = ['Active'].concat('Object').join('X');
	if (axo in global) {
	  try {
	    HtmlfileReceiver.htmlfileEnabled = !!new global[axo]('htmlfile');
	  } catch (x) {
	    // intentionally empty
	  }
	}
	
	HtmlfileReceiver.enabled = HtmlfileReceiver.htmlfileEnabled || iframeUtils.iframeEnabled;
	
	module.exports = HtmlfileReceiver;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(12), (function() { return this; }())))

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var inherits = __webpack_require__(24),
	    AjaxBasedTransport = __webpack_require__(29),
	    XhrReceiver = __webpack_require__(33),
	    XHRCorsObject = __webpack_require__(34),
	    XHRLocalObject = __webpack_require__(36);
	
	function XhrPollingTransport(transUrl) {
	  if (!XHRLocalObject.enabled && !XHRCorsObject.enabled) {
	    throw new Error('Transport created when disabled');
	  }
	  AjaxBasedTransport.call(this, transUrl, '/xhr', XhrReceiver, XHRCorsObject);
	}
	
	inherits(XhrPollingTransport, AjaxBasedTransport);
	
	XhrPollingTransport.enabled = function (info) {
	  if (info.nullOrigin) {
	    return false;
	  }
	
	  if (XHRLocalObject.enabled && info.sameOrigin) {
	    return true;
	  }
	  return XHRCorsObject.enabled;
	};
	
	XhrPollingTransport.transportName = 'xhr-polling';
	XhrPollingTransport.roundTrips = 2; // preflight, ajax
	
	module.exports = XhrPollingTransport;

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var inherits = __webpack_require__(24),
	    AjaxBasedTransport = __webpack_require__(29),
	    XdrStreamingTransport = __webpack_require__(38),
	    XhrReceiver = __webpack_require__(33),
	    XDRObject = __webpack_require__(39);
	
	function XdrPollingTransport(transUrl) {
	  if (!XDRObject.enabled) {
	    throw new Error('Transport created when disabled');
	  }
	  AjaxBasedTransport.call(this, transUrl, '/xhr', XhrReceiver, XDRObject);
	}
	
	inherits(XdrPollingTransport, AjaxBasedTransport);
	
	XdrPollingTransport.enabled = XdrStreamingTransport.enabled;
	XdrPollingTransport.transportName = 'xdr-polling';
	XdrPollingTransport.roundTrips = 2; // preflight, ajax
	
	module.exports = XdrPollingTransport;

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';
	
	// The simplest and most robust transport, using the well-know cross
	// domain hack - JSONP. This transport is quite inefficient - one
	// message could use up to one http request. But at least it works almost
	// everywhere.
	// Known limitations:
	//   o you will get a spinning cursor
	//   o for Konqueror a dumb timer is needed to detect errors
	
	var inherits = __webpack_require__(24),
	    SenderReceiver = __webpack_require__(30),
	    JsonpReceiver = __webpack_require__(54),
	    jsonpSender = __webpack_require__(55);
	
	function JsonPTransport(transUrl) {
	  if (!JsonPTransport.enabled()) {
	    throw new Error('Transport created when disabled');
	  }
	  SenderReceiver.call(this, transUrl, '/jsonp', jsonpSender, JsonpReceiver);
	}
	
	inherits(JsonPTransport, SenderReceiver);
	
	JsonPTransport.enabled = function () {
	  return !!global.document;
	};
	
	JsonPTransport.transportName = 'jsonp-polling';
	JsonPTransport.roundTrips = 1;
	JsonPTransport.needBody = true;
	
	module.exports = JsonPTransport;
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process, global) {'use strict';
	
	var utils = __webpack_require__(47),
	    random = __webpack_require__(14),
	    browser = __webpack_require__(37),
	    urlUtils = __webpack_require__(16),
	    inherits = __webpack_require__(24),
	    EventEmitter = __webpack_require__(25).EventEmitter;
	
	var debug = function debug() {};
	if (process.env.NODE_ENV !== 'production') {
	  debug = __webpack_require__(21)('sockjs-client:receiver:jsonp');
	}
	
	function JsonpReceiver(url) {
	  debug(url);
	  var self = this;
	  EventEmitter.call(this);
	
	  utils.polluteGlobalNamespace();
	
	  this.id = 'a' + random.string(6);
	  var urlWithId = urlUtils.addQuery(url, 'c=' + encodeURIComponent(utils.WPrefix + '.' + this.id));
	
	  global[utils.WPrefix][this.id] = this._callback.bind(this);
	  this._createScript(urlWithId);
	
	  // Fallback mostly for Konqueror - stupid timer, 35 seconds shall be plenty.
	  this.timeoutId = setTimeout(function () {
	    debug('timeout');
	    self._abort(new Error('JSONP script loaded abnormally (timeout)'));
	  }, JsonpReceiver.timeout);
	}
	
	inherits(JsonpReceiver, EventEmitter);
	
	JsonpReceiver.prototype.abort = function () {
	  debug('abort');
	  if (global[utils.WPrefix][this.id]) {
	    var err = new Error('JSONP user aborted read');
	    err.code = 1000;
	    this._abort(err);
	  }
	};
	
	JsonpReceiver.timeout = 35000;
	JsonpReceiver.scriptErrorTimeout = 1000;
	
	JsonpReceiver.prototype._callback = function (data) {
	  debug('_callback', data);
	  this._cleanup();
	
	  if (this.aborting) {
	    return;
	  }
	
	  if (data) {
	    debug('message', data);
	    this.emit('message', data);
	  }
	  this.emit('close', null, 'network');
	  this.removeAllListeners();
	};
	
	JsonpReceiver.prototype._abort = function (err) {
	  debug('_abort', err);
	  this._cleanup();
	  this.aborting = true;
	  this.emit('close', err.code, err.message);
	  this.removeAllListeners();
	};
	
	JsonpReceiver.prototype._cleanup = function () {
	  debug('_cleanup');
	  clearTimeout(this.timeoutId);
	  if (this.script2) {
	    this.script2.parentNode.removeChild(this.script2);
	    this.script2 = null;
	  }
	  if (this.script) {
	    var script = this.script;
	    // Unfortunately, you can't really abort script loading of
	    // the script.
	    script.parentNode.removeChild(script);
	    script.onreadystatechange = script.onerror = script.onload = script.onclick = null;
	    this.script = null;
	  }
	  delete global[utils.WPrefix][this.id];
	};
	
	JsonpReceiver.prototype._scriptError = function () {
	  debug('_scriptError');
	  var self = this;
	  if (this.errorTimer) {
	    return;
	  }
	
	  this.errorTimer = setTimeout(function () {
	    if (!self.loadedOkay) {
	      self._abort(new Error('JSONP script loaded abnormally (onerror)'));
	    }
	  }, JsonpReceiver.scriptErrorTimeout);
	};
	
	JsonpReceiver.prototype._createScript = function (url) {
	  debug('_createScript', url);
	  var self = this;
	  var script = this.script = global.document.createElement('script');
	  var script2; // Opera synchronous load trick.
	
	  script.id = 'a' + random.string(8);
	  script.src = url;
	  script.type = 'text/javascript';
	  script.charset = 'UTF-8';
	  script.onerror = this._scriptError.bind(this);
	  script.onload = function () {
	    debug('onload');
	    self._abort(new Error('JSONP script loaded abnormally (onload)'));
	  };
	
	  // IE9 fires 'error' event after onreadystatechange or before, in random order.
	  // Use loadedOkay to determine if actually errored
	  script.onreadystatechange = function () {
	    debug('onreadystatechange', script.readyState);
	    if (/loaded|closed/.test(script.readyState)) {
	      if (script && script.htmlFor && script.onclick) {
	        self.loadedOkay = true;
	        try {
	          // In IE, actually execute the script.
	          script.onclick();
	        } catch (x) {
	          // intentionally empty
	        }
	      }
	      if (script) {
	        self._abort(new Error('JSONP script loaded abnormally (onreadystatechange)'));
	      }
	    }
	  };
	  // IE: event/htmlFor/onclick trick.
	  // One can't rely on proper order for onreadystatechange. In order to
	  // make sure, set a 'htmlFor' and 'event' properties, so that
	  // script code will be installed as 'onclick' handler for the
	  // script object. Later, onreadystatechange, manually execute this
	  // code. FF and Chrome doesn't work with 'event' and 'htmlFor'
	  // set. For reference see:
	  //   http://jaubourg.net/2010/07/loading-script-as-onclick-handler-of.html
	  // Also, read on that about script ordering:
	  //   http://wiki.whatwg.org/wiki/Dynamic_Script_Execution_Order
	  if (typeof script.async === 'undefined' && global.document.attachEvent) {
	    // According to mozilla docs, in recent browsers script.async defaults
	    // to 'true', so we may use it to detect a good browser:
	    // https://developer.mozilla.org/en/HTML/Element/script
	    if (!browser.isOpera()) {
	      // Naively assume we're in IE
	      try {
	        script.htmlFor = script.id;
	        script.event = 'onclick';
	      } catch (x) {
	        // intentionally empty
	      }
	      script.async = true;
	    } else {
	      // Opera, second sync script hack
	      script2 = this.script2 = global.document.createElement('script');
	      script2.text = "try{var a = document.getElementById('" + script.id + "'); if(a)a.onerror();}catch(x){};";
	      script.async = script2.async = false;
	    }
	  }
	  if (typeof script.async !== 'undefined') {
	    script.async = true;
	  }
	
	  var head = global.document.getElementsByTagName('head')[0];
	  head.insertBefore(script, head.firstChild);
	  if (script2) {
	    head.insertBefore(script2, head.firstChild);
	  }
	};
	
	module.exports = JsonpReceiver;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(12), (function() { return this; }())))

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process, global) {'use strict';
	
	var random = __webpack_require__(14),
	    urlUtils = __webpack_require__(16);
	
	var debug = function debug() {};
	if (process.env.NODE_ENV !== 'production') {
	  debug = __webpack_require__(21)('sockjs-client:sender:jsonp');
	}
	
	var form, area;
	
	function createIframe(id) {
	  debug('createIframe', id);
	  try {
	    // ie6 dynamic iframes with target="" support (thanks Chris Lambacher)
	    return global.document.createElement('<iframe name="' + id + '">');
	  } catch (x) {
	    var iframe = global.document.createElement('iframe');
	    iframe.name = id;
	    return iframe;
	  }
	}
	
	function createForm() {
	  debug('createForm');
	  form = global.document.createElement('form');
	  form.style.display = 'none';
	  form.style.position = 'absolute';
	  form.method = 'POST';
	  form.enctype = 'application/x-www-form-urlencoded';
	  form.acceptCharset = 'UTF-8';
	
	  area = global.document.createElement('textarea');
	  area.name = 'd';
	  form.appendChild(area);
	
	  global.document.body.appendChild(form);
	}
	
	module.exports = function (url, payload, callback) {
	  debug(url, payload);
	  if (!form) {
	    createForm();
	  }
	  var id = 'a' + random.string(8);
	  form.target = id;
	  form.action = urlUtils.addQuery(urlUtils.addPath(url, '/jsonp_send'), 'i=' + id);
	
	  var iframe = createIframe(id);
	  iframe.id = id;
	  iframe.style.display = 'none';
	  form.appendChild(iframe);
	
	  try {
	    area.value = payload;
	  } catch (e) {
	    // seriously broken browsers get here
	  }
	  form.submit();
	
	  var completed = function completed(err) {
	    debug('completed', id, err);
	    if (!iframe.onerror) {
	      return;
	    }
	    iframe.onreadystatechange = iframe.onerror = iframe.onload = null;
	    // Opera mini doesn't like if we GC iframe
	    // immediately, thus this timeout.
	    setTimeout(function () {
	      debug('cleaning up', id);
	      iframe.parentNode.removeChild(iframe);
	      iframe = null;
	    }, 500);
	    area.value = '';
	    // It is not possible to detect if the iframe succeeded or
	    // failed to submit our form.
	    callback(err);
	  };
	  iframe.onerror = function () {
	    debug('onerror', id);
	    completed();
	  };
	  iframe.onload = function () {
	    debug('onload', id);
	    completed();
	  };
	  iframe.onreadystatechange = function (e) {
	    debug('onreadystatechange', id, iframe.readyState, e);
	    if (iframe.readyState === 'complete') {
	      completed();
	    }
	  };
	  return function () {
	    debug('aborted', id);
	    completed(new Error('Aborted'));
	  };
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(12), (function() { return this; }())))

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process, global) {'use strict';
	
	__webpack_require__(57);
	
	var URL = __webpack_require__(17),
	    inherits = __webpack_require__(24),
	    JSON3 = __webpack_require__(45),
	    random = __webpack_require__(14),
	    escape = __webpack_require__(58),
	    urlUtils = __webpack_require__(16),
	    eventUtils = __webpack_require__(13),
	    transport = __webpack_require__(59),
	    objectUtils = __webpack_require__(48),
	    browser = __webpack_require__(37),
	    log = __webpack_require__(60),
	    Event = __webpack_require__(61),
	    EventTarget = __webpack_require__(26),
	    loc = __webpack_require__(62),
	    CloseEvent = __webpack_require__(63),
	    TransportMessageEvent = __webpack_require__(64),
	    InfoReceiver = __webpack_require__(65);
	
	var debug = function debug() {};
	if (process.env.NODE_ENV !== 'production') {
	  debug = __webpack_require__(21)('sockjs-client:main');
	}
	
	var transports;
	
	// follow constructor steps defined at http://dev.w3.org/html5/websockets/#the-websocket-interface
	function SockJS(url, protocols, options) {
	  if (!(this instanceof SockJS)) {
	    return new SockJS(url, protocols, options);
	  }
	  if (arguments.length < 1) {
	    throw new TypeError("Failed to construct 'SockJS: 1 argument required, but only 0 present");
	  }
	  EventTarget.call(this);
	
	  this.readyState = SockJS.CONNECTING;
	  this.extensions = '';
	  this.protocol = '';
	
	  // non-standard extension
	  options = options || {};
	  if (options.protocols_whitelist) {
	    log.warn("'protocols_whitelist' is DEPRECATED. Use 'transports' instead.");
	  }
	  this._transportsWhitelist = options.transports;
	  this._transportOptions = options.transportOptions || {};
	
	  var sessionId = options.sessionId || 8;
	  if (typeof sessionId === 'function') {
	    this._generateSessionId = sessionId;
	  } else if (typeof sessionId === 'number') {
	    this._generateSessionId = function () {
	      return random.string(sessionId);
	    };
	  } else {
	    throw new TypeError('If sessionId is used in the options, it needs to be a number or a function.');
	  }
	
	  this._server = options.server || random.numberString(1000);
	
	  // Step 1 of WS spec - parse and validate the url. Issue #8
	  var parsedUrl = new URL(url);
	  if (!parsedUrl.host || !parsedUrl.protocol) {
	    throw new SyntaxError("The URL '" + url + "' is invalid");
	  } else if (parsedUrl.hash) {
	    throw new SyntaxError('The URL must not contain a fragment');
	  } else if (parsedUrl.protocol !== 'http:' && parsedUrl.protocol !== 'https:') {
	    throw new SyntaxError("The URL's scheme must be either 'http:' or 'https:'. '" + parsedUrl.protocol + "' is not allowed.");
	  }
	
	  var secure = parsedUrl.protocol === 'https:';
	  // Step 2 - don't allow secure origin with an insecure protocol
	  if (loc.protocol === 'https' && !secure) {
	    throw new Error('SecurityError: An insecure SockJS connection may not be initiated from a page loaded over HTTPS');
	  }
	
	  // Step 3 - check port access - no need here
	  // Step 4 - parse protocols argument
	  if (!protocols) {
	    protocols = [];
	  } else if (!Array.isArray(protocols)) {
	    protocols = [protocols];
	  }
	
	  // Step 5 - check protocols argument
	  var sortedProtocols = protocols.sort();
	  sortedProtocols.forEach(function (proto, i) {
	    if (!proto) {
	      throw new SyntaxError("The protocols entry '" + proto + "' is invalid.");
	    }
	    if (i < sortedProtocols.length - 1 && proto === sortedProtocols[i + 1]) {
	      throw new SyntaxError("The protocols entry '" + proto + "' is duplicated.");
	    }
	  });
	
	  // Step 6 - convert origin
	  var o = urlUtils.getOrigin(loc.href);
	  this._origin = o ? o.toLowerCase() : null;
	
	  // remove the trailing slash
	  parsedUrl.set('pathname', parsedUrl.pathname.replace(/\/+$/, ''));
	
	  // store the sanitized url
	  this.url = parsedUrl.href;
	  debug('using url', this.url);
	
	  // Step 7 - start connection in background
	  // obtain server info
	  // http://sockjs.github.io/sockjs-protocol/sockjs-protocol-0.3.3.html#section-26
	  this._urlInfo = {
	    nullOrigin: !browser.hasDomain(),
	    sameOrigin: urlUtils.isOriginEqual(this.url, loc.href),
	    sameScheme: urlUtils.isSchemeEqual(this.url, loc.href)
	  };
	
	  this._ir = new InfoReceiver(this.url, this._urlInfo);
	  this._ir.once('finish', this._receiveInfo.bind(this));
	}
	
	inherits(SockJS, EventTarget);
	
	function userSetCode(code) {
	  return code === 1000 || code >= 3000 && code <= 4999;
	}
	
	SockJS.prototype.close = function (code, reason) {
	  // Step 1
	  if (code && !userSetCode(code)) {
	    throw new Error('InvalidAccessError: Invalid code');
	  }
	  // Step 2.4 states the max is 123 bytes, but we are just checking length
	  if (reason && reason.length > 123) {
	    throw new SyntaxError('reason argument has an invalid length');
	  }
	
	  // Step 3.1
	  if (this.readyState === SockJS.CLOSING || this.readyState === SockJS.CLOSED) {
	    return;
	  }
	
	  // TODO look at docs to determine how to set this
	  var wasClean = true;
	  this._close(code || 1000, reason || 'Normal closure', wasClean);
	};
	
	SockJS.prototype.send = function (data) {
	  // #13 - convert anything non-string to string
	  // TODO this currently turns objects into [object Object]
	  if (typeof data !== 'string') {
	    data = '' + data;
	  }
	  if (this.readyState === SockJS.CONNECTING) {
	    throw new Error('InvalidStateError: The connection has not been established yet');
	  }
	  if (this.readyState !== SockJS.OPEN) {
	    return;
	  }
	  this._transport.send(escape.quote(data));
	};
	
	SockJS.version = __webpack_require__(46);
	
	SockJS.CONNECTING = 0;
	SockJS.OPEN = 1;
	SockJS.CLOSING = 2;
	SockJS.CLOSED = 3;
	
	SockJS.prototype._receiveInfo = function (info, rtt) {
	  debug('_receiveInfo', rtt);
	  this._ir = null;
	  if (!info) {
	    this._close(1002, 'Cannot connect to server');
	    return;
	  }
	
	  // establish a round-trip timeout (RTO) based on the
	  // round-trip time (RTT)
	  this._rto = this.countRTO(rtt);
	  // allow server to override url used for the actual transport
	  this._transUrl = info.base_url ? info.base_url : this.url;
	  info = objectUtils.extend(info, this._urlInfo);
	  debug('info', info);
	  // determine list of desired and supported transports
	  var enabledTransports = transports.filterToEnabled(this._transportsWhitelist, info);
	  this._transports = enabledTransports.main;
	  debug(this._transports.length + ' enabled transports');
	
	  this._connect();
	};
	
	SockJS.prototype._connect = function () {
	  for (var Transport = this._transports.shift(); Transport; Transport = this._transports.shift()) {
	    debug('attempt', Transport.transportName);
	    if (Transport.needBody) {
	      if (!global.document.body || typeof global.document.readyState !== 'undefined' && global.document.readyState !== 'complete' && global.document.readyState !== 'interactive') {
	        debug('waiting for body');
	        this._transports.unshift(Transport);
	        eventUtils.attachEvent('load', this._connect.bind(this));
	        return;
	      }
	    }
	
	    // calculate timeout based on RTO and round trips. Default to 5s
	    var timeoutMs = this._rto * Transport.roundTrips || 5000;
	    this._transportTimeoutId = setTimeout(this._transportTimeout.bind(this), timeoutMs);
	    debug('using timeout', timeoutMs);
	
	    var transportUrl = urlUtils.addPath(this._transUrl, '/' + this._server + '/' + this._generateSessionId());
	    var options = this._transportOptions[Transport.transportName];
	    debug('transport url', transportUrl);
	    var transportObj = new Transport(transportUrl, this._transUrl, options);
	    transportObj.on('message', this._transportMessage.bind(this));
	    transportObj.once('close', this._transportClose.bind(this));
	    transportObj.transportName = Transport.transportName;
	    this._transport = transportObj;
	
	    return;
	  }
	  this._close(2000, 'All transports failed', false);
	};
	
	SockJS.prototype._transportTimeout = function () {
	  debug('_transportTimeout');
	  if (this.readyState === SockJS.CONNECTING) {
	    this._transportClose(2007, 'Transport timed out');
	  }
	};
	
	SockJS.prototype._transportMessage = function (msg) {
	  debug('_transportMessage', msg);
	  var self = this,
	      type = msg.slice(0, 1),
	      content = msg.slice(1),
	      payload;
	
	  // first check for messages that don't need a payload
	  switch (type) {
	    case 'o':
	      this._open();
	      return;
	    case 'h':
	      this.dispatchEvent(new Event('heartbeat'));
	      debug('heartbeat', this.transport);
	      return;
	  }
	
	  if (content) {
	    try {
	      payload = JSON3.parse(content);
	    } catch (e) {
	      debug('bad json', content);
	    }
	  }
	
	  if (typeof payload === 'undefined') {
	    debug('empty payload', content);
	    return;
	  }
	
	  switch (type) {
	    case 'a':
	      if (Array.isArray(payload)) {
	        payload.forEach(function (p) {
	          debug('message', self.transport, p);
	          self.dispatchEvent(new TransportMessageEvent(p));
	        });
	      }
	      break;
	    case 'm':
	      debug('message', this.transport, payload);
	      this.dispatchEvent(new TransportMessageEvent(payload));
	      break;
	    case 'c':
	      if (Array.isArray(payload) && payload.length === 2) {
	        this._close(payload[0], payload[1], true);
	      }
	      break;
	  }
	};
	
	SockJS.prototype._transportClose = function (code, reason) {
	  debug('_transportClose', this.transport, code, reason);
	  if (this._transport) {
	    this._transport.removeAllListeners();
	    this._transport = null;
	    this.transport = null;
	  }
	
	  if (!userSetCode(code) && code !== 2000 && this.readyState === SockJS.CONNECTING) {
	    this._connect();
	    return;
	  }
	
	  this._close(code, reason);
	};
	
	SockJS.prototype._open = function () {
	  debug('_open', this._transport.transportName, this.readyState);
	  if (this.readyState === SockJS.CONNECTING) {
	    if (this._transportTimeoutId) {
	      clearTimeout(this._transportTimeoutId);
	      this._transportTimeoutId = null;
	    }
	    this.readyState = SockJS.OPEN;
	    this.transport = this._transport.transportName;
	    this.dispatchEvent(new Event('open'));
	    debug('connected', this.transport);
	  } else {
	    // The server might have been restarted, and lost track of our
	    // connection.
	    this._close(1006, 'Server lost session');
	  }
	};
	
	SockJS.prototype._close = function (code, reason, wasClean) {
	  debug('_close', this.transport, code, reason, wasClean, this.readyState);
	  var forceFail = false;
	
	  if (this._ir) {
	    forceFail = true;
	    this._ir.close();
	    this._ir = null;
	  }
	  if (this._transport) {
	    this._transport.close();
	    this._transport = null;
	    this.transport = null;
	  }
	
	  if (this.readyState === SockJS.CLOSED) {
	    throw new Error('InvalidStateError: SockJS has already been closed');
	  }
	
	  this.readyState = SockJS.CLOSING;
	  setTimeout(function () {
	    this.readyState = SockJS.CLOSED;
	
	    if (forceFail) {
	      this.dispatchEvent(new Event('error'));
	    }
	
	    var e = new CloseEvent('close');
	    e.wasClean = wasClean || false;
	    e.code = code || 1000;
	    e.reason = reason;
	
	    this.dispatchEvent(e);
	    this.onmessage = this.onclose = this.onerror = null;
	    debug('disconnected');
	  }.bind(this), 0);
	};
	
	// See: http://www.erg.abdn.ac.uk/~gerrit/dccp/notes/ccid2/rto_estimator/
	// and RFC 2988.
	SockJS.prototype.countRTO = function (rtt) {
	  // In a local environment, when using IE8/9 and the `jsonp-polling`
	  // transport the time needed to establish a connection (the time that pass
	  // from the opening of the transport to the call of `_dispatchOpen`) is
	  // around 200msec (the lower bound used in the article above) and this
	  // causes spurious timeouts. For this reason we calculate a value slightly
	  // larger than that used in the article.
	  if (rtt > 100) {
	    return 4 * rtt; // rto > 400msec
	  }
	  return 300 + rtt; // 300msec < rto <= 400msec
	};
	
	module.exports = function (availableTransports) {
	  transports = transport(availableTransports);
	  __webpack_require__(70)(SockJS, availableTransports);
	  return SockJS;
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(12), (function() { return this; }())))

/***/ },
/* 57 */
/***/ function(module, exports) {

	/* eslint-disable */
	/* jscs: disable */
	'use strict';
	
	// pulled specific shims from https://github.com/es-shims/es5-shim
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	var ArrayPrototype = Array.prototype;
	var ObjectPrototype = Object.prototype;
	var FunctionPrototype = Function.prototype;
	var StringPrototype = String.prototype;
	var array_slice = ArrayPrototype.slice;
	
	var _toString = ObjectPrototype.toString;
	var isFunction = function isFunction(val) {
	    return ObjectPrototype.toString.call(val) === '[object Function]';
	};
	var isArray = function isArray(obj) {
	    return _toString.call(obj) === '[object Array]';
	};
	var isString = function isString(obj) {
	    return _toString.call(obj) === '[object String]';
	};
	
	var supportsDescriptors = Object.defineProperty && function () {
	    try {
	        Object.defineProperty({}, 'x', {});
	        return true;
	    } catch (e) {
	        /* this is ES3 */
	        return false;
	    }
	}();
	
	// Define configurable, writable and non-enumerable props
	// if they don't exist.
	var defineProperty;
	if (supportsDescriptors) {
	    defineProperty = function defineProperty(object, name, method, forceAssign) {
	        if (!forceAssign && name in object) {
	            return;
	        }
	        Object.defineProperty(object, name, {
	            configurable: true,
	            enumerable: false,
	            writable: true,
	            value: method
	        });
	    };
	} else {
	    defineProperty = function defineProperty(object, name, method, forceAssign) {
	        if (!forceAssign && name in object) {
	            return;
	        }
	        object[name] = method;
	    };
	}
	var defineProperties = function defineProperties(object, map, forceAssign) {
	    for (var name in map) {
	        if (ObjectPrototype.hasOwnProperty.call(map, name)) {
	            defineProperty(object, name, map[name], forceAssign);
	        }
	    }
	};
	
	var toObject = function toObject(o) {
	    if (o == null) {
	        // this matches both null and undefined
	        throw new TypeError("can't convert " + o + ' to object');
	    }
	    return Object(o);
	};
	
	//
	// Util
	// ======
	//
	
	// ES5 9.4
	// http://es5.github.com/#x9.4
	// http://jsperf.com/to-integer
	
	function toInteger(num) {
	    var n = +num;
	    if (n !== n) {
	        // isNaN
	        n = 0;
	    } else if (n !== 0 && n !== 1 / 0 && n !== -(1 / 0)) {
	        n = (n > 0 || -1) * Math.floor(Math.abs(n));
	    }
	    return n;
	}
	
	function ToUint32(x) {
	    return x >>> 0;
	}
	
	//
	// Function
	// ========
	//
	
	// ES-5 15.3.4.5
	// http://es5.github.com/#x15.3.4.5
	
	function Empty() {}
	
	defineProperties(FunctionPrototype, {
	    bind: function bind(that) {
	        // .length is 1
	        // 1. Let Target be the this value.
	        var target = this;
	        // 2. If IsCallable(Target) is false, throw a TypeError exception.
	        if (!isFunction(target)) {
	            throw new TypeError('Function.prototype.bind called on incompatible ' + target);
	        }
	        // 3. Let A be a new (possibly empty) internal list of all of the
	        //   argument values provided after thisArg (arg1, arg2 etc), in order.
	        // XXX slicedArgs will stand in for "A" if used
	        var args = array_slice.call(arguments, 1); // for normal call
	        // 4. Let F be a new native ECMAScript object.
	        // 11. Set the [[Prototype]] internal property of F to the standard
	        //   built-in Function prototype object as specified in 15.3.3.1.
	        // 12. Set the [[Call]] internal property of F as described in
	        //   15.3.4.5.1.
	        // 13. Set the [[Construct]] internal property of F as described in
	        //   15.3.4.5.2.
	        // 14. Set the [[HasInstance]] internal property of F as described in
	        //   15.3.4.5.3.
	        var binder = function binder() {
	
	            if (this instanceof bound) {
	                // 15.3.4.5.2 [[Construct]]
	                // When the [[Construct]] internal method of a function object,
	                // F that was created using the bind function is called with a
	                // list of arguments ExtraArgs, the following steps are taken:
	                // 1. Let target be the value of F's [[TargetFunction]]
	                //   internal property.
	                // 2. If target has no [[Construct]] internal method, a
	                //   TypeError exception is thrown.
	                // 3. Let boundArgs be the value of F's [[BoundArgs]] internal
	                //   property.
	                // 4. Let args be a new list containing the same values as the
	                //   list boundArgs in the same order followed by the same
	                //   values as the list ExtraArgs in the same order.
	                // 5. Return the result of calling the [[Construct]] internal
	                //   method of target providing args as the arguments.
	
	                var result = target.apply(this, args.concat(array_slice.call(arguments)));
	                if (Object(result) === result) {
	                    return result;
	                }
	                return this;
	            } else {
	                // 15.3.4.5.1 [[Call]]
	                // When the [[Call]] internal method of a function object, F,
	                // which was created using the bind function is called with a
	                // this value and a list of arguments ExtraArgs, the following
	                // steps are taken:
	                // 1. Let boundArgs be the value of F's [[BoundArgs]] internal
	                //   property.
	                // 2. Let boundThis be the value of F's [[BoundThis]] internal
	                //   property.
	                // 3. Let target be the value of F's [[TargetFunction]] internal
	                //   property.
	                // 4. Let args be a new list containing the same values as the
	                //   list boundArgs in the same order followed by the same
	                //   values as the list ExtraArgs in the same order.
	                // 5. Return the result of calling the [[Call]] internal method
	                //   of target providing boundThis as the this value and
	                //   providing args as the arguments.
	
	                // equiv: target.call(this, ...boundArgs, ...args)
	                return target.apply(that, args.concat(array_slice.call(arguments)));
	            }
	        };
	
	        // 15. If the [[Class]] internal property of Target is "Function", then
	        //     a. Let L be the length property of Target minus the length of A.
	        //     b. Set the length own property of F to either 0 or L, whichever is
	        //       larger.
	        // 16. Else set the length own property of F to 0.
	
	        var boundLength = Math.max(0, target.length - args.length);
	
	        // 17. Set the attributes of the length own property of F to the values
	        //   specified in 15.3.5.1.
	        var boundArgs = [];
	        for (var i = 0; i < boundLength; i++) {
	            boundArgs.push('$' + i);
	        }
	
	        // XXX Build a dynamic function with desired amount of arguments is the only
	        // way to set the length property of a function.
	        // In environments where Content Security Policies enabled (Chrome extensions,
	        // for ex.) all use of eval or Function costructor throws an exception.
	        // However in all of these environments Function.prototype.bind exists
	        // and so this code will never be executed.
	        var bound = Function('binder', 'return function (' + boundArgs.join(',') + '){ return binder.apply(this, arguments); }')(binder);
	
	        if (target.prototype) {
	            Empty.prototype = target.prototype;
	            bound.prototype = new Empty();
	            // Clean up dangling references.
	            Empty.prototype = null;
	        }
	
	        // TODO
	        // 18. Set the [[Extensible]] internal property of F to true.
	
	        // TODO
	        // 19. Let thrower be the [[ThrowTypeError]] function Object (13.2.3).
	        // 20. Call the [[DefineOwnProperty]] internal method of F with
	        //   arguments "caller", PropertyDescriptor {[[Get]]: thrower, [[Set]]:
	        //   thrower, [[Enumerable]]: false, [[Configurable]]: false}, and
	        //   false.
	        // 21. Call the [[DefineOwnProperty]] internal method of F with
	        //   arguments "arguments", PropertyDescriptor {[[Get]]: thrower,
	        //   [[Set]]: thrower, [[Enumerable]]: false, [[Configurable]]: false},
	        //   and false.
	
	        // TODO
	        // NOTE Function objects created using Function.prototype.bind do not
	        // have a prototype property or the [[Code]], [[FormalParameters]], and
	        // [[Scope]] internal properties.
	        // XXX can't delete prototype in pure-js.
	
	        // 22. Return F.
	        return bound;
	    }
	});
	
	//
	// Array
	// =====
	//
	
	// ES5 15.4.3.2
	// http://es5.github.com/#x15.4.3.2
	// https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/isArray
	defineProperties(Array, { isArray: isArray });
	
	var boxedString = Object('a');
	var splitString = boxedString[0] !== 'a' || !(0 in boxedString);
	
	var properlyBoxesContext = function properlyBoxed(method) {
	    // Check node 0.6.21 bug where third parameter is not boxed
	    var properlyBoxesNonStrict = true;
	    var properlyBoxesStrict = true;
	    if (method) {
	        method.call('foo', function (_, __, context) {
	            if ((typeof context === 'undefined' ? 'undefined' : _typeof(context)) !== 'object') {
	                properlyBoxesNonStrict = false;
	            }
	        });
	
	        method.call([1], function () {
	            'use strict';
	
	            properlyBoxesStrict = typeof this === 'string';
	        }, 'x');
	    }
	    return !!method && properlyBoxesNonStrict && properlyBoxesStrict;
	};
	
	defineProperties(ArrayPrototype, {
	    forEach: function forEach(fun /*, thisp*/) {
	        var object = toObject(this),
	            self = splitString && isString(this) ? this.split('') : object,
	            thisp = arguments[1],
	            i = -1,
	            length = self.length >>> 0;
	
	        // If no callback function or if callback is not a callable function
	        if (!isFunction(fun)) {
	            throw new TypeError(); // TODO message
	        }
	
	        while (++i < length) {
	            if (i in self) {
	                // Invoke the callback function with call, passing arguments:
	                // context, property value, property key, thisArg object
	                // context
	                fun.call(thisp, self[i], i, object);
	            }
	        }
	    }
	}, !properlyBoxesContext(ArrayPrototype.forEach));
	
	// ES5 15.4.4.14
	// http://es5.github.com/#x15.4.4.14
	// https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/indexOf
	var hasFirefox2IndexOfBug = Array.prototype.indexOf && [0, 1].indexOf(1, 2) !== -1;
	defineProperties(ArrayPrototype, {
	    indexOf: function indexOf(sought /*, fromIndex */) {
	        var self = splitString && isString(this) ? this.split('') : toObject(this),
	            length = self.length >>> 0;
	
	        if (!length) {
	            return -1;
	        }
	
	        var i = 0;
	        if (arguments.length > 1) {
	            i = toInteger(arguments[1]);
	        }
	
	        // handle negative indices
	        i = i >= 0 ? i : Math.max(0, length + i);
	        for (; i < length; i++) {
	            if (i in self && self[i] === sought) {
	                return i;
	            }
	        }
	        return -1;
	    }
	}, hasFirefox2IndexOfBug);
	
	//
	// String
	// ======
	//
	
	// ES5 15.5.4.14
	// http://es5.github.com/#x15.5.4.14
	
	// [bugfix, IE lt 9, firefox 4, Konqueror, Opera, obscure browsers]
	// Many browsers do not split properly with regular expressions or they
	// do not perform the split correctly under obscure conditions.
	// See http://blog.stevenlevithan.com/archives/cross-browser-split
	// I've tested in many browsers and this seems to cover the deviant ones:
	//    'ab'.split(/(?:ab)*/) should be ["", ""], not [""]
	//    '.'.split(/(.?)(.?)/) should be ["", ".", "", ""], not ["", ""]
	//    'tesst'.split(/(s)*/) should be ["t", undefined, "e", "s", "t"], not
	//       [undefined, "t", undefined, "e", ...]
	//    ''.split(/.?/) should be [], not [""]
	//    '.'.split(/()()/) should be ["."], not ["", "", "."]
	
	var string_split = StringPrototype.split;
	if ('ab'.split(/(?:ab)*/).length !== 2 || '.'.split(/(.?)(.?)/).length !== 4 || 'tesst'.split(/(s)*/)[1] === 't' || 'test'.split(/(?:)/, -1).length !== 4 || ''.split(/.?/).length || '.'.split(/()()/).length > 1) {
	    (function () {
	        var compliantExecNpcg = /()??/.exec('')[1] === void 0; // NPCG: nonparticipating capturing group
	
	        StringPrototype.split = function (separator, limit) {
	            var string = this;
	            if (separator === void 0 && limit === 0) {
	                return [];
	            }
	
	            // If `separator` is not a regex, use native split
	            if (_toString.call(separator) !== '[object RegExp]') {
	                return string_split.call(this, separator, limit);
	            }
	
	            var output = [],
	                flags = (separator.ignoreCase ? 'i' : '') + (separator.multiline ? 'm' : '') + (separator.extended ? 'x' : '') + ( // Proposed for ES6
	            separator.sticky ? 'y' : ''),
	                // Firefox 3+
	            lastLastIndex = 0,
	
	            // Make `global` and avoid `lastIndex` issues by working with a copy
	            separator2,
	                match,
	                lastIndex,
	                lastLength;
	            separator = new RegExp(separator.source, flags + 'g');
	            string += ''; // Type-convert
	            if (!compliantExecNpcg) {
	                // Doesn't need flags gy, but they don't hurt
	                separator2 = new RegExp('^' + separator.source + '$(?!\\s)', flags);
	            }
	            /* Values for `limit`, per the spec:
	             * If undefined: 4294967295 // Math.pow(2, 32) - 1
	             * If 0, Infinity, or NaN: 0
	             * If positive number: limit = Math.floor(limit); if (limit > 4294967295) limit -= 4294967296;
	             * If negative number: 4294967296 - Math.floor(Math.abs(limit))
	             * If other: Type-convert, then use the above rules
	             */
	            limit = limit === void 0 ? -1 >>> 0 : // Math.pow(2, 32) - 1
	            ToUint32(limit);
	            while (match = separator.exec(string)) {
	                // `separator.lastIndex` is not reliable cross-browser
	                lastIndex = match.index + match[0].length;
	                if (lastIndex > lastLastIndex) {
	                    output.push(string.slice(lastLastIndex, match.index));
	                    // Fix browsers whose `exec` methods don't consistently return `undefined` for
	                    // nonparticipating capturing groups
	                    if (!compliantExecNpcg && match.length > 1) {
	                        match[0].replace(separator2, function () {
	                            for (var i = 1; i < arguments.length - 2; i++) {
	                                if (arguments[i] === void 0) {
	                                    match[i] = void 0;
	                                }
	                            }
	                        });
	                    }
	                    if (match.length > 1 && match.index < string.length) {
	                        ArrayPrototype.push.apply(output, match.slice(1));
	                    }
	                    lastLength = match[0].length;
	                    lastLastIndex = lastIndex;
	                    if (output.length >= limit) {
	                        break;
	                    }
	                }
	                if (separator.lastIndex === match.index) {
	                    separator.lastIndex++; // Avoid an infinite loop
	                }
	            }
	            if (lastLastIndex === string.length) {
	                if (lastLength || !separator.test('')) {
	                    output.push('');
	                }
	            } else {
	                output.push(string.slice(lastLastIndex));
	            }
	            return output.length > limit ? output.slice(0, limit) : output;
	        };
	    })();
	
	    // [bugfix, chrome]
	    // If separator is undefined, then the result array contains just one String,
	    // which is the this value (converted to a String). If limit is not undefined,
	    // then the output array is truncated so that it contains no more than limit
	    // elements.
	    // "0".split(undefined, 0) -> []
	} else if ('0'.split(void 0, 0).length) {
	    StringPrototype.split = function split(separator, limit) {
	        if (separator === void 0 && limit === 0) {
	            return [];
	        }
	        return string_split.call(this, separator, limit);
	    };
	}
	
	// ES5 15.5.4.20
	// whitespace from: http://es5.github.io/#x15.5.4.20
	var ws = '\t\n\u000b\f\r   ᠎    ' + '         　\u2028' + '\u2029﻿';
	var zeroWidth = '​';
	var wsRegexChars = '[' + ws + ']';
	var trimBeginRegexp = new RegExp('^' + wsRegexChars + wsRegexChars + '*');
	var trimEndRegexp = new RegExp(wsRegexChars + wsRegexChars + '*$');
	var hasTrimWhitespaceBug = StringPrototype.trim && (ws.trim() || !zeroWidth.trim());
	defineProperties(StringPrototype, {
	    // http://blog.stevenlevithan.com/archives/faster-trim-javascript
	    // http://perfectionkills.com/whitespace-deviations/
	    trim: function trim() {
	        if (this === void 0 || this === null) {
	            throw new TypeError("can't convert " + this + ' to object');
	        }
	        return String(this).replace(trimBeginRegexp, '').replace(trimEndRegexp, '');
	    }
	}, hasTrimWhitespaceBug);
	
	// ECMA-262, 3rd B.2.3
	// Not an ECMAScript standard, although ECMAScript 3rd Edition has a
	// non-normative section suggesting uniform semantics and it should be
	// normalized across all browsers
	// [bugfix, IE lt 9] IE < 9 substr() with negative value not working in IE
	var string_substr = StringPrototype.substr;
	var hasNegativeSubstrBug = ''.substr && '0b'.substr(-1) !== 'b';
	defineProperties(StringPrototype, {
	    substr: function substr(start, length) {
	        return string_substr.call(this, start < 0 ? (start = this.length + start) < 0 ? 0 : start : start, length);
	    }
	}, hasNegativeSubstrBug);

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var JSON3 = __webpack_require__(45);
	
	// Some extra characters that Chrome gets wrong, and substitutes with
	// something else on the wire.
	var extraEscapable = /[\x00-\x1f\ud800-\udfff\ufffe\uffff\u0300-\u0333\u033d-\u0346\u034a-\u034c\u0350-\u0352\u0357-\u0358\u035c-\u0362\u0374\u037e\u0387\u0591-\u05af\u05c4\u0610-\u0617\u0653-\u0654\u0657-\u065b\u065d-\u065e\u06df-\u06e2\u06eb-\u06ec\u0730\u0732-\u0733\u0735-\u0736\u073a\u073d\u073f-\u0741\u0743\u0745\u0747\u07eb-\u07f1\u0951\u0958-\u095f\u09dc-\u09dd\u09df\u0a33\u0a36\u0a59-\u0a5b\u0a5e\u0b5c-\u0b5d\u0e38-\u0e39\u0f43\u0f4d\u0f52\u0f57\u0f5c\u0f69\u0f72-\u0f76\u0f78\u0f80-\u0f83\u0f93\u0f9d\u0fa2\u0fa7\u0fac\u0fb9\u1939-\u193a\u1a17\u1b6b\u1cda-\u1cdb\u1dc0-\u1dcf\u1dfc\u1dfe\u1f71\u1f73\u1f75\u1f77\u1f79\u1f7b\u1f7d\u1fbb\u1fbe\u1fc9\u1fcb\u1fd3\u1fdb\u1fe3\u1feb\u1fee-\u1fef\u1ff9\u1ffb\u1ffd\u2000-\u2001\u20d0-\u20d1\u20d4-\u20d7\u20e7-\u20e9\u2126\u212a-\u212b\u2329-\u232a\u2adc\u302b-\u302c\uaab2-\uaab3\uf900-\ufa0d\ufa10\ufa12\ufa15-\ufa1e\ufa20\ufa22\ufa25-\ufa26\ufa2a-\ufa2d\ufa30-\ufa6d\ufa70-\ufad9\ufb1d\ufb1f\ufb2a-\ufb36\ufb38-\ufb3c\ufb3e\ufb40-\ufb41\ufb43-\ufb44\ufb46-\ufb4e\ufff0-\uffff]/g,
	    extraLookup;
	
	// This may be quite slow, so let's delay until user actually uses bad
	// characters.
	var unrollLookup = function unrollLookup(escapable) {
	  var i;
	  var unrolled = {};
	  var c = [];
	  for (i = 0; i < 65536; i++) {
	    c.push(String.fromCharCode(i));
	  }
	  escapable.lastIndex = 0;
	  c.join('').replace(escapable, function (a) {
	    unrolled[a] = '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
	    return '';
	  });
	  escapable.lastIndex = 0;
	  return unrolled;
	};
	
	// Quote string, also taking care of unicode characters that browsers
	// often break. Especially, take care of unicode surrogates:
	// http://en.wikipedia.org/wiki/Mapping_of_Unicode_characters#Surrogates
	module.exports = {
	  quote: function quote(string) {
	    var quoted = JSON3.stringify(string);
	
	    // In most cases this should be very fast and good enough.
	    extraEscapable.lastIndex = 0;
	    if (!extraEscapable.test(quoted)) {
	      return quoted;
	    }
	
	    if (!extraLookup) {
	      extraLookup = unrollLookup(extraEscapable);
	    }
	
	    return quoted.replace(extraEscapable, function (a) {
	      return extraLookup[a];
	    });
	  }
	};

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';
	
	var debug = function debug() {};
	if (process.env.NODE_ENV !== 'production') {
	  debug = __webpack_require__(21)('sockjs-client:utils:transport');
	}
	
	module.exports = function (availableTransports) {
	  return {
	    filterToEnabled: function filterToEnabled(transportsWhitelist, info) {
	      var transports = {
	        main: [],
	        facade: []
	      };
	      if (!transportsWhitelist) {
	        transportsWhitelist = [];
	      } else if (typeof transportsWhitelist === 'string') {
	        transportsWhitelist = [transportsWhitelist];
	      }
	
	      availableTransports.forEach(function (trans) {
	        if (!trans) {
	          return;
	        }
	
	        if (trans.transportName === 'websocket' && info.websocket === false) {
	          debug('disabled from server', 'websocket');
	          return;
	        }
	
	        if (transportsWhitelist.length && transportsWhitelist.indexOf(trans.transportName) === -1) {
	          debug('not in whitelist', trans.transportName);
	          return;
	        }
	
	        if (trans.enabled(info)) {
	          debug('enabled', trans.transportName);
	          transports.main.push(trans);
	          if (trans.facadeTransport) {
	            transports.facade.push(trans.facadeTransport);
	          }
	        } else {
	          debug('disabled', trans.transportName);
	        }
	      });
	      return transports;
	    }
	  };
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(12)))

/***/ },
/* 60 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';
	
	var logObject = {};
	['log', 'debug', 'warn'].forEach(function (level) {
	  var levelExists;
	
	  try {
	    levelExists = global.console && global.console[level] && global.console[level].apply;
	  } catch (e) {
	    // do nothing
	  }
	
	  logObject[level] = levelExists ? function () {
	    return global.console[level].apply(global.console, arguments);
	  } : level === 'log' ? function () {} : logObject.log;
	});
	
	module.exports = logObject;
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 61 */
/***/ function(module, exports) {

	'use strict';
	
	function Event(eventType) {
	  this.type = eventType;
	}
	
	Event.prototype.initEvent = function (eventType, canBubble, cancelable) {
	  this.type = eventType;
	  this.bubbles = canBubble;
	  this.cancelable = cancelable;
	  this.timeStamp = +new Date();
	  return this;
	};
	
	Event.prototype.stopPropagation = function () {};
	Event.prototype.preventDefault = function () {};
	
	Event.CAPTURING_PHASE = 1;
	Event.AT_TARGET = 2;
	Event.BUBBLING_PHASE = 3;
	
	module.exports = Event;

/***/ },
/* 62 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';
	
	module.exports = global.location || {
	  origin: 'http://localhost:80',
	  protocol: 'http',
	  host: 'localhost',
	  port: 80,
	  href: 'http://localhost/',
	  hash: ''
	};
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var inherits = __webpack_require__(24),
	    Event = __webpack_require__(61);
	
	function CloseEvent() {
	  Event.call(this);
	  this.initEvent('close', false, false);
	  this.wasClean = false;
	  this.code = 0;
	  this.reason = '';
	}
	
	inherits(CloseEvent, Event);
	
	module.exports = CloseEvent;

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var inherits = __webpack_require__(24),
	    Event = __webpack_require__(61);
	
	function TransportMessageEvent(data) {
	  Event.call(this);
	  this.initEvent('message', false, false);
	  this.data = data;
	}
	
	inherits(TransportMessageEvent, Event);
	
	module.exports = TransportMessageEvent;

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';
	
	var EventEmitter = __webpack_require__(25).EventEmitter,
	    inherits = __webpack_require__(24),
	    urlUtils = __webpack_require__(16),
	    XDR = __webpack_require__(39),
	    XHRCors = __webpack_require__(34),
	    XHRLocal = __webpack_require__(36),
	    XHRFake = __webpack_require__(66),
	    InfoIframe = __webpack_require__(67),
	    InfoAjax = __webpack_require__(69);
	
	var debug = function debug() {};
	if (process.env.NODE_ENV !== 'production') {
	  debug = __webpack_require__(21)('sockjs-client:info-receiver');
	}
	
	function InfoReceiver(baseUrl, urlInfo) {
	  debug(baseUrl);
	  var self = this;
	  EventEmitter.call(this);
	
	  setTimeout(function () {
	    self.doXhr(baseUrl, urlInfo);
	  }, 0);
	}
	
	inherits(InfoReceiver, EventEmitter);
	
	// TODO this is currently ignoring the list of available transports and the whitelist
	
	InfoReceiver._getReceiver = function (baseUrl, url, urlInfo) {
	  // determine method of CORS support (if needed)
	  if (urlInfo.sameOrigin) {
	    return new InfoAjax(url, XHRLocal);
	  }
	  if (XHRCors.enabled) {
	    return new InfoAjax(url, XHRCors);
	  }
	  if (XDR.enabled && urlInfo.sameScheme) {
	    return new InfoAjax(url, XDR);
	  }
	  if (InfoIframe.enabled()) {
	    return new InfoIframe(baseUrl, url);
	  }
	  return new InfoAjax(url, XHRFake);
	};
	
	InfoReceiver.prototype.doXhr = function (baseUrl, urlInfo) {
	  var self = this,
	      url = urlUtils.addPath(baseUrl, '/info');
	  debug('doXhr', url);
	
	  this.xo = InfoReceiver._getReceiver(baseUrl, url, urlInfo);
	
	  this.timeoutRef = setTimeout(function () {
	    debug('timeout');
	    self._cleanup(false);
	    self.emit('finish');
	  }, InfoReceiver.timeout);
	
	  this.xo.once('finish', function (info, rtt) {
	    debug('finish', info, rtt);
	    self._cleanup(true);
	    self.emit('finish', info, rtt);
	  });
	};
	
	InfoReceiver.prototype._cleanup = function (wasClean) {
	  debug('_cleanup');
	  clearTimeout(this.timeoutRef);
	  this.timeoutRef = null;
	  if (!wasClean && this.xo) {
	    this.xo.close();
	  }
	  this.xo = null;
	};
	
	InfoReceiver.prototype.close = function () {
	  debug('close');
	  this.removeAllListeners();
	  this._cleanup(false);
	};
	
	InfoReceiver.timeout = 8000;
	
	module.exports = InfoReceiver;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(12)))

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var EventEmitter = __webpack_require__(25).EventEmitter,
	    inherits = __webpack_require__(24);
	
	function XHRFake() /* method, url, payload, opts */{
	  var self = this;
	  EventEmitter.call(this);
	
	  this.to = setTimeout(function () {
	    self.emit('finish', 200, '{}');
	  }, XHRFake.timeout);
	}
	
	inherits(XHRFake, EventEmitter);
	
	XHRFake.prototype.close = function () {
	  clearTimeout(this.to);
	};
	
	XHRFake.timeout = 2000;
	
	module.exports = XHRFake;

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process, global) {'use strict';
	
	var EventEmitter = __webpack_require__(25).EventEmitter,
	    inherits = __webpack_require__(24),
	    JSON3 = __webpack_require__(45),
	    utils = __webpack_require__(13),
	    IframeTransport = __webpack_require__(44),
	    InfoReceiverIframe = __webpack_require__(68);
	
	var debug = function debug() {};
	if (process.env.NODE_ENV !== 'production') {
	  debug = __webpack_require__(21)('sockjs-client:info-iframe');
	}
	
	function InfoIframe(baseUrl, url) {
	  var self = this;
	  EventEmitter.call(this);
	
	  var go = function go() {
	    var ifr = self.ifr = new IframeTransport(InfoReceiverIframe.transportName, url, baseUrl);
	
	    ifr.once('message', function (msg) {
	      if (msg) {
	        var d;
	        try {
	          d = JSON3.parse(msg);
	        } catch (e) {
	          debug('bad json', msg);
	          self.emit('finish');
	          self.close();
	          return;
	        }
	
	        var info = d[0],
	            rtt = d[1];
	        self.emit('finish', info, rtt);
	      }
	      self.close();
	    });
	
	    ifr.once('close', function () {
	      self.emit('finish');
	      self.close();
	    });
	  };
	
	  // TODO this seems the same as the 'needBody' from transports
	  if (!global.document.body) {
	    utils.attachEvent('load', go);
	  } else {
	    go();
	  }
	}
	
	inherits(InfoIframe, EventEmitter);
	
	InfoIframe.enabled = function () {
	  return IframeTransport.enabled();
	};
	
	InfoIframe.prototype.close = function () {
	  if (this.ifr) {
	    this.ifr.close();
	  }
	  this.removeAllListeners();
	  this.ifr = null;
	};
	
	module.exports = InfoIframe;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(12), (function() { return this; }())))

/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var inherits = __webpack_require__(24),
	    EventEmitter = __webpack_require__(25).EventEmitter,
	    JSON3 = __webpack_require__(45),
	    XHRLocalObject = __webpack_require__(36),
	    InfoAjax = __webpack_require__(69);
	
	function InfoReceiverIframe(transUrl) {
	  var self = this;
	  EventEmitter.call(this);
	
	  this.ir = new InfoAjax(transUrl, XHRLocalObject);
	  this.ir.once('finish', function (info, rtt) {
	    self.ir = null;
	    self.emit('message', JSON3.stringify([info, rtt]));
	  });
	}
	
	inherits(InfoReceiverIframe, EventEmitter);
	
	InfoReceiverIframe.transportName = 'iframe-info-receiver';
	
	InfoReceiverIframe.prototype.close = function () {
	  if (this.ir) {
	    this.ir.close();
	    this.ir = null;
	  }
	  this.removeAllListeners();
	};
	
	module.exports = InfoReceiverIframe;

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';
	
	var EventEmitter = __webpack_require__(25).EventEmitter,
	    inherits = __webpack_require__(24),
	    JSON3 = __webpack_require__(45),
	    objectUtils = __webpack_require__(48);
	
	var debug = function debug() {};
	if (process.env.NODE_ENV !== 'production') {
	  debug = __webpack_require__(21)('sockjs-client:info-ajax');
	}
	
	function InfoAjax(url, AjaxObject) {
	  EventEmitter.call(this);
	
	  var self = this;
	  var t0 = +new Date();
	  this.xo = new AjaxObject('GET', url);
	
	  this.xo.once('finish', function (status, text) {
	    var info, rtt;
	    if (status === 200) {
	      rtt = +new Date() - t0;
	      if (text) {
	        try {
	          info = JSON3.parse(text);
	        } catch (e) {
	          debug('bad json', text);
	        }
	      }
	
	      if (!objectUtils.isObject(info)) {
	        info = {};
	      }
	    }
	    self.emit('finish', info, rtt);
	    self.removeAllListeners();
	  });
	}
	
	inherits(InfoAjax, EventEmitter);
	
	InfoAjax.prototype.close = function () {
	  this.removeAllListeners();
	  this.xo.close();
	};
	
	module.exports = InfoAjax;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(12)))

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';
	
	var urlUtils = __webpack_require__(16),
	    eventUtils = __webpack_require__(13),
	    JSON3 = __webpack_require__(45),
	    FacadeJS = __webpack_require__(71),
	    InfoIframeReceiver = __webpack_require__(68),
	    iframeUtils = __webpack_require__(47),
	    loc = __webpack_require__(62);
	
	var debug = function debug() {};
	if (process.env.NODE_ENV !== 'production') {
	  debug = __webpack_require__(21)('sockjs-client:iframe-bootstrap');
	}
	
	module.exports = function (SockJS, availableTransports) {
	  var transportMap = {};
	  availableTransports.forEach(function (at) {
	    if (at.facadeTransport) {
	      transportMap[at.facadeTransport.transportName] = at.facadeTransport;
	    }
	  });
	
	  // hard-coded for the info iframe
	  // TODO see if we can make this more dynamic
	  transportMap[InfoIframeReceiver.transportName] = InfoIframeReceiver;
	  var parentOrigin;
	
	  /* eslint-disable camelcase */
	  SockJS.bootstrap_iframe = function () {
	    /* eslint-enable camelcase */
	    var facade;
	    iframeUtils.currentWindowId = loc.hash.slice(1);
	    var onMessage = function onMessage(e) {
	      if (e.source !== parent) {
	        return;
	      }
	      if (typeof parentOrigin === 'undefined') {
	        parentOrigin = e.origin;
	      }
	      if (e.origin !== parentOrigin) {
	        return;
	      }
	
	      var iframeMessage;
	      try {
	        iframeMessage = JSON3.parse(e.data);
	      } catch (ignored) {
	        debug('bad json', e.data);
	        return;
	      }
	
	      if (iframeMessage.windowId !== iframeUtils.currentWindowId) {
	        return;
	      }
	      switch (iframeMessage.type) {
	        case 's':
	          var p;
	          try {
	            p = JSON3.parse(iframeMessage.data);
	          } catch (ignored) {
	            debug('bad json', iframeMessage.data);
	            break;
	          }
	          var version = p[0];
	          var transport = p[1];
	          var transUrl = p[2];
	          var baseUrl = p[3];
	          debug(version, transport, transUrl, baseUrl);
	          // change this to semver logic
	          if (version !== SockJS.version) {
	            throw new Error('Incompatible SockJS! Main site uses:' + ' "' + version + '", the iframe:' + ' "' + SockJS.version + '".');
	          }
	
	          if (!urlUtils.isOriginEqual(transUrl, loc.href) || !urlUtils.isOriginEqual(baseUrl, loc.href)) {
	            throw new Error('Can\'t connect to different domain from within an ' + 'iframe. (' + loc.href + ', ' + transUrl + ', ' + baseUrl + ')');
	          }
	          facade = new FacadeJS(new transportMap[transport](transUrl, baseUrl));
	          break;
	        case 'm':
	          facade._send(iframeMessage.data);
	          break;
	        case 'c':
	          if (facade) {
	            facade._close();
	          }
	          facade = null;
	          break;
	      }
	    };
	
	    eventUtils.attachEvent('message', onMessage);
	
	    // Start
	    iframeUtils.postMessage('s');
	  };
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(12)))

/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var JSON3 = __webpack_require__(45),
	    iframeUtils = __webpack_require__(47);
	
	function FacadeJS(transport) {
	  this._transport = transport;
	  transport.on('message', this._transportMessage.bind(this));
	  transport.on('close', this._transportClose.bind(this));
	}
	
	FacadeJS.prototype._transportClose = function (code, reason) {
	  iframeUtils.postMessage('c', JSON3.stringify([code, reason]));
	};
	FacadeJS.prototype._transportMessage = function (frame) {
	  iframeUtils.postMessage('t', frame);
	};
	FacadeJS.prototype._send = function (data) {
	  this._transport.send(data);
	};
	FacadeJS.prototype._close = function () {
	  this._transport.close();
	  this._transport.removeAllListeners();
	};
	
	module.exports = FacadeJS;

/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var ansiRegex = __webpack_require__(73)();
	
	module.exports = function (str) {
		return typeof str === 'string' ? str.replace(ansiRegex, '') : str;
	};

/***/ },
/* 73 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = function () {
		return (/[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g
		);
	};

/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	/*globals window __webpack_hash__ */
	if (false) {
		var lastData;
		var upToDate = function upToDate() {
			return lastData.indexOf(__webpack_hash__) >= 0;
		};
		var check = function check() {
			module.hot.check(function (err, updatedModules) {
				if (err) {
					if (module.hot.status() in {
						abort: 1,
						fail: 1
					}) {
						console.warn("[HMR] Cannot check for update. Need to do a full reload!");
						console.warn("[HMR] " + err.stack || err.message);
					} else {
						console.warn("[HMR] Update check failed: " + err.stack || err.message);
					}
					return;
				}
	
				if (!updatedModules) {
					console.warn("[HMR] Cannot find update. Need to do a full reload!");
					console.warn("[HMR] (Probably because of restarting the webpack-dev-server)");
					return;
				}
	
				module.hot.apply({
					ignoreUnaccepted: true
				}, function (err, renewedModules) {
					if (err) {
						if (module.hot.status() in {
							abort: 1,
							fail: 1
						}) {
							console.warn("[HMR] Cannot apply update. Need to do a full reload!");
							console.warn("[HMR] " + err.stack || err.message);
						} else {
							console.warn("[HMR] Update failed: " + err.stack || err.message);
						}
						return;
					}
	
					if (!upToDate()) {
						check();
					}
	
					require("./log-apply-result")(updatedModules, renewedModules);
	
					if (upToDate()) {
						console.log("[HMR] App is up to date.");
					}
				});
			});
		};
		var addEventListener = window.addEventListener ? function (eventName, listener) {
			window.addEventListener(eventName, listener, false);
		} : function (eventName, listener) {
			window.attachEvent("on" + eventName, listener);
		};
		addEventListener("message", function (event) {
			if (typeof event.data === "string" && event.data.indexOf("webpackHotUpdate") === 0) {
				lastData = event.data;
				if (!upToDate() && module.hot.status() === "idle") {
					console.log("[HMR] Checking for updates on the server...");
					check();
				}
			}
		});
		console.log("[HMR] Waiting for update signal from WDS...");
	} else {
		throw new Error("[HMR] Hot Module Replacement is disabled.");
	}

/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	/* REACT HOT LOADER */ if (false) { (function () { var ReactHotAPI = require("/Users/greendou/Codemao/Kitten/libs/codemao-fabric/node_modules/react-hot-api/modules/index.js"), RootInstanceProvider = require("/Users/greendou/Codemao/Kitten/libs/codemao-fabric/node_modules/react-hot-loader/RootInstanceProvider.js"), ReactMount = require("react/lib/ReactMount"), React = require("react"); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {
	
	"use strict";
	var React = __webpack_require__(76);
	var ReactDOM = __webpack_require__(77);
	var Painter_1 = __webpack_require__(78);
	ReactDOM.render(React.createElement(Painter_1.Painter, {compiler: "TypeScript", framework: "React"}), document.getElementById("painter"));
	

	/* REACT HOT LOADER */ }).call(this); } finally { if (false) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = require("/Users/greendou/Codemao/Kitten/libs/codemao-fabric/node_modules/react-hot-loader/makeExportsHot.js"); if (makeExportsHot(module, require("react"))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot not apply hot update to " + "main.tsx" + ": " + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }

/***/ },
/* 76 */
/***/ function(module, exports) {

	module.exports = React;

/***/ },
/* 77 */
/***/ function(module, exports) {

	module.exports = ReactDOM;

/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	/* REACT HOT LOADER */ if (false) { (function () { var ReactHotAPI = require("/Users/greendou/Codemao/Kitten/libs/codemao-fabric/node_modules/react-hot-api/modules/index.js"), RootInstanceProvider = require("/Users/greendou/Codemao/Kitten/libs/codemao-fabric/node_modules/react-hot-loader/RootInstanceProvider.js"), ReactMount = require("react/lib/ReactMount"), React = require("react"); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {
	
	"use strict";
	var React = __webpack_require__(76);
	__webpack_require__(79);
	__webpack_require__(83);
	__webpack_require__(84);
	__webpack_require__(85);
	__webpack_require__(86);
	var config_1 = __webpack_require__(87);
	var fabricCanvas_1 = __webpack_require__(88);
	var PaintingPanel_1 = __webpack_require__(103);
	var BackgroundPanel_1 = __webpack_require__(109);
	var LayerPanel_1 = __webpack_require__(112);
	var ObjectPanel_1 = __webpack_require__(115);
	var ControlButton_1 = __webpack_require__(118);
	var painterStore_1 = __webpack_require__(119);
	// class Painter extends React.Component<PainterProps, { panel_type: number }>
	var global = window;
	var Painter = React.createClass({
	    getInitialState: function () {
	        return painterStore_1.painterStore.states;
	    },
	    componentDidMount: function () {
	        fabricCanvas_1.fabricCanvas.init(this.canvas_element, this.canvas_wrapper_element);
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
	        var control_buttons = config_1.config.control_buttons.map(function (value) {
	            return React.createElement(ControlButton_1.ControlButton, {key: value.title, control_button: value});
	        });
	        var panel_element;
	        switch (this.state.panel_type) {
	            case 'background':
	                panel_element = React.createElement(BackgroundPanel_1.BackgroundPanel, {className: "painter-tools-background"});
	                break;
	            case 'layer':
	                panel_element = React.createElement(LayerPanel_1.LayerPanel, {className: "painter-tools-layer"});
	                break;
	            default:
	            case 'painting':
	                panel_element = React.createElement(PaintingPanel_1.PaintingPanel, {className: "painter-tools-painting", current_color: this.state.current_color});
	        }
	        return React.createElement("div", {className: "painter"}, React.createElement("div", {className: "painter-tools"}, React.createElement("div", {className: "painter-tools-tabs"}, React.createElement("button", {value: "painting", className: "tab-button tabs-painting", onClick: this.selectPanel}, "画图", React.createElement("svg", {width: "16px", height: "7px", viewBox: "49 48 16 7", version: "1.1", xmlns: "http://www.w3.org/2000/svg"}, React.createElement("polygon", {id: "rect-tab-painting", stroke: "none", fill: "#F2524C", "fill-rule": "evenodd", transform: "translate(57.000000, 51.500000) scale(1, -1) translate(-57.000000, -51.500000) ", points: "57 48 65 55 49 55"}))), React.createElement("button", {value: "background", className: "tab-button tabs-background", onClick: this.selectPanel}, "背景", React.createElement("svg", {width: "16px", height: "7px", viewBox: "49 48 16 7", version: "1.1", xmlns: "http://www.w3.org/2000/svg"}, React.createElement("polygon", {id: "rect-tab-background", stroke: "none", fill: "#EEB000", "fill-rule": "evenodd", transform: "translate(57.000000, 51.500000) scale(1, -1) translate(-57.000000, -51.500000) ", points: "57 48 65 55 49 55"}))), React.createElement("button", {value: "layer", className: "tab-button tabs-layers", onClick: this.selectPanel}, "图层", React.createElement("svg", {width: "16px", height: "7px", viewBox: "49 48 16 7", version: "1.1", xmlns: "http://www.w3.org/2000/svg"}, React.createElement("polygon", {id: "rect-tab-layers", stroke: "none", fill: "#44BFD2", "fill-rule": "evenodd", transform: "translate(57.000000, 51.500000) scale(1, -1) translate(-57.000000, -51.500000) ", points: "57 48 65 55 49 55"})))), React.createElement("div", {className: "painter-tools-container"}, panel_element), React.createElement("div", {className: "painter-tools-buttons"}, React.createElement("div", {className: "tools-costume"}, React.createElement("input", {title: "造型名称", className: "costume-title", placeholder: "请输入造型名称"}), React.createElement("div", {className: "costume-buttons"}, React.createElement("div", {className: "save-button"}, React.createElement("img", {src: "//o44j7l4g3.qnssl.com/program/painter/save.png", alt: "保存"})), React.createElement("div", {className: "cancel-button"}, React.createElement("img", {src: "//o44j7l4g3.qnssl.com/program/painter/cancel.png", alt: "取消"})))))), React.createElement("div", {className: "right-panel"}, React.createElement("div", {className: "paint-panel"}, React.createElement("div", {className: "painter-canvas-wrapper", ref: function (canvas_wrapper) { return _this.canvas_wrapper_element = canvas_wrapper; }}, React.createElement("canvas", {ref: function (canvas) { return _this.canvas_element = canvas; }, className: "painter-canvas"}), React.createElement("div", {className: "stage-size"})), React.createElement(ObjectPanel_1.ObjectPanel, null)), React.createElement("div", {className: "painter-control-wrapper"}, React.createElement("div", {className: "control-panel"}, control_buttons))));
	        // return <h1>Hello from {this.props.compiler} and {this.props.framework}!</h1>;
	    }
	});
	exports.Painter = Painter;
	

	/* REACT HOT LOADER */ }).call(this); } finally { if (false) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = require("/Users/greendou/Codemao/Kitten/libs/codemao-fabric/node_modules/react-hot-loader/makeExportsHot.js"); if (makeExportsHot(module, require("react"))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot not apply hot update to " + "Painter.tsx" + ": " + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }

/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(80);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(82)(content, {});
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
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(81)();
	// imports
	
	
	// module
	exports.push([module.id, ".painter {\n  width: 100%;\n  height: 100%;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  position: fixed;\n  left: 0;\n  top: 0;\n\n  background-color: #fdb336;\n}\n\n.right-panel {\n  width: 75%;\n  /*height: calc(100% - 4rem);*/\n  height: 100%;\n\n  display: -webkit-box;\n\n  display: -ms-flexbox;\n\n  display: flex;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: row;\n          flex-direction: row;\n  -webkit-box-flex: 1;\n      -ms-flex-positive: 1;\n          flex-grow: 1;\n\n  padding: 32px 0 32px 5%;\n  padding: 2rem 0 2rem 5%;\n\n  background-color: rgb(248, 248, 248);\n}\n\n.paint-panel {\n  height: calc(100% - 2rem);\n  width: 70%;\n\n  display: -webkit-box;\n\n  display: -ms-flexbox;\n\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-pack: end;\n      -ms-flex-pack: end;\n          justify-content: flex-end;\n\n  -webkit-box-flex: 1;\n\n      -ms-flex-positive: 1;\n\n          flex-grow: 1;\n  -ms-flex-negative: 1;\n      flex-shrink: 1;\n\n  background-color: #F8F8F8;\n}\n\n.painter-control-wrapper {\n  width: 10%;\n  max-width: 96px;\n  max-width: 6rem;\n  height: 100%;\n\n  -ms-flex-negative: 0;\n\n      flex-shrink: 0;\n}\n\n.painter-tools {\n  width: 20%;\n  height: 100%;\n  background: #ECE7DD;\n\n  display: -webkit-box;\n\n  display: -ms-flexbox;\n\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n}\n\n.painter-tools-tabs {\n  width: 100%;\n  height: 6%;\n\n  display: -webkit-box;\n\n  display: -ms-flexbox;\n\n  display: flex;\n  -webkit-box-align: start;\n      -ms-flex-align: start;\n          align-items: flex-start;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n}\n\n.painter-tools-container {\n  width: 100%;\n  height: calc(94% - 6rem);\n}\n\n.painter-tools-buttons {\n  width: 100%;\n  height: 96px;\n  height: 6rem;\n}\n\n.painter-tools .tab-button {\n  height: calc(85% - 0.3rem);\n  -webkit-box-flex: 1;\n      -ms-flex-positive: 1;\n          flex-grow: 1;\n\n  position: relative;\n\n  display: -webkit-box;\n\n  display: -ms-flexbox;\n\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  font-family: STHeitiTC-Light, serif;\n  font-size: 18px;\n  color: #FFFFFF;\n\n  margin-top: 4.8px;\n  margin-top: 0.3rem;\n\n  cursor: pointer;\n}\n\n.painter-tools .tab-button svg {\n  display: none;\n  width: 100%;\n  position: absolute;\n  top: calc(100% - 0.1rem);\n  left: 0;\n}\n\n.painter-tools .tab-button.active {\n  height: 85%;\n  margin-top: 0;\n}\n\n.painter-tools .tab-button.active svg {\n  display: block;\n}\n\n.painter-tools .tabs-painting {\n  background: #F2524C;\n}\n\n.painter-tools .tabs-background {\n  background: #EEB000;\n}\n\n.painter-tools .tabs-layers {\n  background: #44BFD2;\n}\n\n.painter-canvas-wrapper {\n  position: relative;\n  width: calc(100% - 8px);\n  height: calc(100% - 8px);\n  background-image: url(\"//o44j7l4g3.qnssl.com/program/painter/grid.png\");\n\n  border: 4px solid rgba(198, 177, 155, 0.60);\n  border-radius: 4px;\n}\n\n.stage-size {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  margin-left: -155px;\n  margin-top: -225px;\n  width: 310px;\n  height: 450px;\n  background-image: url('//o44j7l4g3.qnssl.com/program/painter/stage-size.png');\n  opacity: 0.5;\n  pointer-events: none;\n}\n\n.control-panel {\n  width: 100%;\n  height: 100%;\n\n  display: -webkit-box;\n\n  display: -ms-flexbox;\n\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  -webkit-box-pack: start;\n      -ms-flex-pack: start;\n          justify-content: flex-start;\n  -webkit-box-align: start;\n      -ms-flex-align: start;\n          align-items: flex-start;\n\n  background-color: #F8F8F8;\n}\n\n/*.control-buttons-container {*/\n/*width: 100%;*/\n/*height: 100%;*/\n/*}*/\n\n.tools-costume {\n  width: 100%;\n  height: 100%;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n\n  background: #E1D6BE;\n}\n\n.costume-title {\n  margin: 8px;\n  margin: 0.5rem;\n  padding: 8px;\n  padding: 0.5rem;\n  background: #ECE2CA;\n  border: 1px solid #DDD0C3;\n  border-radius: 4px;\n  font-family: STHeitiSC-Light, serif;\n  font-size: 14px;\n  color: #6D4C41;\n}\n\n.costume-title:focus {\n  outline: none;\n}\n\n.costume-buttons {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: justify;\n      -ms-flex-pack: justify;\n          justify-content: space-between;\n\n  margin: 0 8px;\n  margin: 0 0.5rem;\n\n  cursor: pointer;\n}\n\n.costume-buttons img {\n  max-width: 100%;\n  max-height: 100%;\n}", ""]);
	
	// exports


/***/ },
/* 81 */
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
/* 82 */
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
/* 83 */
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
/* 84 */
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
/* 85 */
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
/* 86 */
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
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	/* REACT HOT LOADER */ if (false) { (function () { var ReactHotAPI = require("/Users/greendou/Codemao/Kitten/libs/codemao-fabric/node_modules/react-hot-api/modules/index.js"), RootInstanceProvider = require("/Users/greendou/Codemao/Kitten/libs/codemao-fabric/node_modules/react-hot-loader/RootInstanceProvider.js"), ReactMount = require("react/lib/ReactMount"), React = require("react"); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {
	
	"use strict";
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
	    },
	};
	

	/* REACT HOT LOADER */ }).call(this); } finally { if (false) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = require("/Users/greendou/Codemao/Kitten/libs/codemao-fabric/node_modules/react-hot-loader/makeExportsHot.js"); if (makeExportsHot(module, require("react"))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot not apply hot update to " + "config.ts" + ": " + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }

/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	/* REACT HOT LOADER */ if (false) { (function () { var ReactHotAPI = require("/Users/greendou/Codemao/Kitten/libs/codemao-fabric/node_modules/react-hot-api/modules/index.js"), RootInstanceProvider = require("/Users/greendou/Codemao/Kitten/libs/codemao-fabric/node_modules/react-hot-loader/RootInstanceProvider.js"), ReactMount = require("react/lib/ReactMount"), React = require("react"); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {
	
	"use strict";
	__webpack_require__(89);
	__webpack_require__(90);
	__webpack_require__(91);
	__webpack_require__(92);
	__webpack_require__(93);
	__webpack_require__(94);
	__webpack_require__(95);
	__webpack_require__(96);
	__webpack_require__(97);
	__webpack_require__(99);
	__webpack_require__(100);
	__webpack_require__(101);
	__webpack_require__(102);
	//  todo: use modules
	var global = window;
	var FabricCanvas = (function () {
	    function FabricCanvas() {
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
	        this.canvas.setFreeDrawingBrush('pencil', {
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
	    return FabricCanvas;
	}());
	exports.fabricCanvas = new FabricCanvas();
	

	/* REACT HOT LOADER */ }).call(this); } finally { if (false) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = require("/Users/greendou/Codemao/Kitten/libs/codemao-fabric/node_modules/react-hot-loader/makeExportsHot.js"); if (makeExportsHot(module, require("react"))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot not apply hot update to " + "fabric_canvas.ts" + ": " + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }

/***/ },
/* 89 */
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
/* 90 */
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
/* 91 */
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
/* 92 */
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
/* 93 */
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
/* 94 */
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
/* 95 */
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
/* 96 */
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
/* 97 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(98);
	
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
/* 98 */
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
/* 99 */
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
/* 100 */
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
/* 101 */
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
/* 102 */
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
/* 103 */
/***/ function(module, exports, __webpack_require__) {

	/* REACT HOT LOADER */ if (false) { (function () { var ReactHotAPI = require("/Users/greendou/Codemao/Kitten/libs/codemao-fabric/node_modules/react-hot-api/modules/index.js"), RootInstanceProvider = require("/Users/greendou/Codemao/Kitten/libs/codemao-fabric/node_modules/react-hot-loader/RootInstanceProvider.js"), ReactMount = require("react/lib/ReactMount"), React = require("react"); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {
	
	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var React = __webpack_require__(76);
	__webpack_require__(104);
	var config_1 = __webpack_require__(87);
	var ColorButton_1 = __webpack_require__(106);
	var PaintingPanel = (function (_super) {
	    __extends(PaintingPanel, _super);
	    function PaintingPanel() {
	        _super.apply(this, arguments);
	    }
	    PaintingPanel.prototype.render = function () {
	        var _this = this;
	        var default_colors = config_1.config.default_colors.map(function (value) {
	            return React.createElement(ColorButton_1.ColorButton, {key: value, color: value, checked: value === _this.props.current_color, onClick: _this.select_color});
	        });
	        return React.createElement("div", {className: "tools-painting"}, React.createElement("div", {className: "tools-buttons-container"}, React.createElement("div", {title: "画笔", className: "tools-button tools-pencil"}, React.createElement("img", {className: "button-img", src: "//o44j7l4g3.qnssl.com/program/painter/pencil.png", alt: "笔"}), React.createElement("img", {className: "button-img-on", src: "//o44j7l4g3.qnssl.com/program/painter/pencil-on.png", alt: "笔"})), React.createElement("div", {title: "直线", className: "tools-button tools-line"}, React.createElement("img", {className: "button-img", src: "//o44j7l4g3.qnssl.com/program/painter/line.png", alt: "线"}), React.createElement("img", {className: "button-img-on", src: "//o44j7l4g3.qnssl.com/program/painter/line-on.png", alt: "线"})), React.createElement("div", {title: "矩形", className: "tools-button tools-rect"}, React.createElement("img", {className: "button-img", src: "//o44j7l4g3.qnssl.com/program/painter/rect.png", alt: "方"}), React.createElement("img", {className: "button-img-on", src: "//o44j7l4g3.qnssl.com/program/painter/rect-on.png", alt: "方"})), React.createElement("div", {title: "圆形", className: "tools-button tools-round"}, React.createElement("img", {className: "button-img", src: "//o44j7l4g3.qnssl.com/program/painter/round.png", alt: "圆"}), React.createElement("img", {className: "button-img-on", src: "//o44j7l4g3.qnssl.com/program/painter/round-on.png", alt: "圆"})), React.createElement("div", {title: "三角", className: "tools-button tools-triangle"}, React.createElement("img", {className: "button-img", src: "//o44j7l4g3.qnssl.com/program/painter/triangle-off.png", alt: "角"}), React.createElement("img", {className: "button-img-on", src: "//o44j7l4g3.qnssl.com/program/painter/triangle-on.png", alt: "圆"}))), React.createElement("div", {className: "tools-buttons-container"}, React.createElement("div", {title: "橡皮", className: "tools-button tools-eraser"}, React.createElement("img", {className: "button-img", src: "//o44j7l4g3.qnssl.com/program/painter/eraser.png", alt: "橡"}), React.createElement("img", {className: "button-img-on", src: "//o44j7l4g3.qnssl.com/program/painter/eraser-on.png", alt: "橡"})), React.createElement("div", {title: "选择", className: "tools-button tools-select"}, React.createElement("img", {className: "button-img", src: "//o44j7l4g3.qnssl.com/program/painter/select.png", alt: "选"}), React.createElement("img", {className: "button-img-on", src: "//o44j7l4g3.qnssl.com/program/painter/select-on.png", alt: "选"})), React.createElement("div", {title: "文字", className: "tools-button tools-text"}, React.createElement("img", {className: "button-img", src: "//o44j7l4g3.qnssl.com/program/painter/text.png", alt: "字"}), React.createElement("img", {className: "button-img-on", src: "//o44j7l4g3.qnssl.com/program/painter/text-on.png", alt: "字"})), React.createElement("div", {title: "旋转中心", className: "tools-button tools-select"}, React.createElement("img", {className: "button-img", src: "//o44j7l4g3.qnssl.com/program/painter/rotation.png", alt: "中"}), React.createElement("img", {className: "button-img-on", src: "//o44j7l4g3.qnssl.com/program/painter/rotation-on.png", alt: "中"}))), React.createElement("div", {className: "tools-slider-container"}, React.createElement("span", {className: "tools-container-title"}, "粗细"), React.createElement("span", {className: "input-minus"}, "-"), React.createElement("input", {title: "粗细", type: "range", value: "7", min: "1", max: "100", step: "1"}), React.createElement("span", {className: "input-plus"}, "+")), React.createElement("div", {className: "tools-item"}, React.createElement("span", {className: "item-title"}, "颜色"), React.createElement("input", {title: "颜色", type: "color", className: "color"})), React.createElement("div", {className: "tools-area"}, React.createElement("div", {className: "tools-default-color"}), default_colors));
	    };
	    return PaintingPanel;
	}(React.Component));
	exports.PaintingPanel = PaintingPanel;
	

	/* REACT HOT LOADER */ }).call(this); } finally { if (false) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = require("/Users/greendou/Codemao/Kitten/libs/codemao-fabric/node_modules/react-hot-loader/makeExportsHot.js"); if (makeExportsHot(module, require("react"))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot not apply hot update to " + "PaintingPanel.tsx" + ": " + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }

/***/ },
/* 104 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(105);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(82)(content, {});
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
/* 105 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(81)();
	// imports
	
	
	// module
	exports.push([module.id, ".tools-painting {\n  width: 100%;\n  height: calc(100% - 2rem);\n\n  display: -webkit-box;\n\n  display: -ms-flexbox;\n\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-pack: start;\n      -ms-flex-pack: start;\n          justify-content: flex-start;\n\n  padding: 16px 0;\n  padding: 1rem 0;\n\n  background-color: #ECE7DD;\n}\n\n.tools-buttons-container {\n  width: 90%;\n  height: 44.8px;\n  height: 2.8rem;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-pack: start;\n      -ms-flex-pack: start;\n          justify-content: flex-start;\n\n  margin: 2% 0;\n  border-radius: 8px;\n  background: #E2D7BE;;\n}\n\n.tools-button {\n  height: 40px;\n  height: 2.5rem;\n  width: 40px;\n  width: 2.5rem;\n\n  display: -webkit-box;\n\n  display: -ms-flexbox;\n\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n\n  margin: 0 1.6px;\n  margin: 0 0.1rem;\n\n  cursor: pointer;\n}\n\n.tools-button img {\n  max-height: 100%;\n  max-width: 100%;\n  pointer-events: none;\n}\n\n.tools-button.active .button-img {\n  display: none;\n}\n\n.tools-button.active .button-img-on {\n  display: block;\n}\n\n.tools-button .button-img-on {\n  display: none;\n}\n\n.tools-button:active .button-img {\n  display: none;\n}\n\n.tools-button:active .button-img-on {\n  display: block;\n}\n\n.tools-slider-container {\n  width: 90%;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-pack: start;\n      -ms-flex-pack: start;\n          justify-content: flex-start;\n  margin: 8px 0;\n  margin: 0.5rem 0;\n\n  font-family: STHeitiTC-Medium, serif;\n  font-size: 18px;\n  color: #645542;\n}\n\n.tools-slider-container .tools-container-title {\n  margin-right: 8%;\n\n  font-family: STHeitiTC-Medium, serif;\n  font-size: 18px;\n  color: #645542;\n}\n\n.tools-slider-container input {\n  width: 40%;\n\n  margin: 1.6px;\n  margin: 0.1rem;\n  -webkit-box-flex: 1;\n      -ms-flex-positive: 1;\n          flex-grow: 1;\n}\n\n.tools-slider-container span {\n  font-family: STHeitiTC-Medium, serif;\n  font-size: 18px;\n  color: #645542;\n}\n\n.tools-slider-container .number-input {\n  width: 32px;\n  width: 2rem;\n\n  margin-left: 4%;\n\n  font-family: STHeitiTC-Medium, serif;\n  font-size: 14px;\n  color: #645542;\n}\n\n.input-plus {\n  margin-bottom: -3%;\n}\n\n.input-minus {\n  margin-bottom: -1%;\n}\n\n.tools-item {\n  width: 90%;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n\n  margin: 8px 0;\n  margin: 0.5rem 0;\n}\n\n.item-title {\n  margin-right: 8%;\n\n  font-family: STHeitiTC-Medium, serif;\n  font-size: 18px;\n  color: #645542;\n}\n\n.tools-item input.color {\n  width: 60%;\n\n  background: #8B572A;\n  border: 4px solid #FFFFFF;\n  border: 2px solid #AA9278;\n  box-shadow: inset 0px -2px 0px 0px rgba(0, 0, 0, 0.30);\n  border-radius: 4px;\n\n  cursor: pointer;\n}\n\n.tools-item input:focus {\n  outline: none;\n}\n\n.tools-area {\n  width: calc(90% - 0.2rem);\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: justify;\n      -ms-flex-pack: justify;\n          justify-content: space-between;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -ms-flex-wrap: wrap;\n      flex-wrap: wrap;\n\n  margin: 8px 0;\n  margin: 0.5rem 0;\n  padding: 16px 1.6px;\n  padding: 1rem 0.1rem;\n\n  background: #E1D6BE;\n  border-radius: 8px;\n}\n\n.tools-default-color {\n  height: 32px;\n  height: 2rem;\n  width: 32px;\n  width: 2rem;\n\n  margin: 3.2px;\n  margin: 0.2rem;\n\n  border: 1px solid rgba(0, 0, 0, 0.37);\n  border-radius: 1.1rem;\n  box-shadow: inset 0 1px 2px 0 rgba(0, 0, 0, 0.50);\n\n  cursor: pointer;\n}", ""]);
	
	// exports


/***/ },
/* 106 */
/***/ function(module, exports, __webpack_require__) {

	/* REACT HOT LOADER */ if (false) { (function () { var ReactHotAPI = require("/Users/greendou/Codemao/Kitten/libs/codemao-fabric/node_modules/react-hot-api/modules/index.js"), RootInstanceProvider = require("/Users/greendou/Codemao/Kitten/libs/codemao-fabric/node_modules/react-hot-loader/RootInstanceProvider.js"), ReactMount = require("react/lib/ReactMount"), React = require("react"); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {
	
	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var React = __webpack_require__(76);
	__webpack_require__(107);
	var ColorButton = (function (_super) {
	    __extends(ColorButton, _super);
	    function ColorButton() {
	        _super.apply(this, arguments);
	    }
	    ColorButton.prototype.render = function () {
	        var style = {
	            backgroundColor: this.props.color
	        };
	        return React.createElement("div", {className: "tools-default-color", style: style});
	    };
	    return ColorButton;
	}(React.Component));
	exports.ColorButton = ColorButton;
	

	/* REACT HOT LOADER */ }).call(this); } finally { if (false) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = require("/Users/greendou/Codemao/Kitten/libs/codemao-fabric/node_modules/react-hot-loader/makeExportsHot.js"); if (makeExportsHot(module, require("react"))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot not apply hot update to " + "ColorButton.tsx" + ": " + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }

/***/ },
/* 107 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(108);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(82)(content, {});
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
/* 108 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(81)();
	// imports
	
	
	// module
	exports.push([module.id, ".control-panel .control-button {\n  width: 60%;\n  height: 60%;\n  max-height: 96px;\n  max-height: 6rem;\n\n  margin: 10%;\n\n  background-repeat: no-repeat;\n  background-size: contain;\n\n  cursor: pointer;\n}\n\n.clear {\n  background-image: url('//o44j7l4g3.qnssl.com/program/painter/clear.png');\n}\n\n.clear:hover {\n  background-image: url('//o44j7l4g3.qnssl.com/program/painter/clear-hover.png');\n}\n\n.undo {\n  background-image: url('//o44j7l4g3.qnssl.com/program/painter/undo.png');\n}\n\n.undo:hover {\n  background-image: url('//o44j7l4g3.qnssl.com/program/painter/undo-hover.png ');\n}\n\n.redo {\n  background-image: url('//o44j7l4g3.qnssl.com/program/painter/redo.png');\n}\n\n.redo:hover {\n  background-image: url('//o44j7l4g3.qnssl.com/program/painter/redo-hover.png ');\n}", ""]);
	
	// exports


/***/ },
/* 109 */
/***/ function(module, exports, __webpack_require__) {

	/* REACT HOT LOADER */ if (false) { (function () { var ReactHotAPI = require("/Users/greendou/Codemao/Kitten/libs/codemao-fabric/node_modules/react-hot-api/modules/index.js"), RootInstanceProvider = require("/Users/greendou/Codemao/Kitten/libs/codemao-fabric/node_modules/react-hot-loader/RootInstanceProvider.js"), ReactMount = require("react/lib/ReactMount"), React = require("react"); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {
	
	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var React = __webpack_require__(76);
	__webpack_require__(110);
	var BackgroundPanel = (function (_super) {
	    __extends(BackgroundPanel, _super);
	    function BackgroundPanel() {
	        _super.apply(this, arguments);
	    }
	    BackgroundPanel.prototype.render = function () {
	        return React.createElement("div", {className: "tools-panel"}, React.createElement("div", {className: "background-container"}, React.createElement("div", {className: "background-item"})), React.createElement("label", {className: "custom-color"}, "自定义", React.createElement("input", {className: "color"})), React.createElement("div", {className: "clear-button"}, "清除背景"));
	    };
	    return BackgroundPanel;
	}(React.Component));
	exports.BackgroundPanel = BackgroundPanel;
	

	/* REACT HOT LOADER */ }).call(this); } finally { if (false) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = require("/Users/greendou/Codemao/Kitten/libs/codemao-fabric/node_modules/react-hot-loader/makeExportsHot.js"); if (makeExportsHot(module, require("react"))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot not apply hot update to " + "BackgroundPanel.tsx" + ": " + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }

/***/ },
/* 110 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(111);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(82)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/postcss-loader/index.js!./painter-tools-background.css", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/postcss-loader/index.js!./painter-tools-background.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 111 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(81)();
	// imports
	
	
	// module
	exports.push([module.id, ".tools-panel {\n  width: 90%;\n  height: 100%;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-pack: start;\n      -ms-flex-pack: start;\n          justify-content: flex-start;\n\n  margin: 0 5%;\n\n  background: #ECE7DD;\n}\n\n.tools-panel .background-container {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n\n  width: 100%;\n  -webkit-box-flex: 1;\n      -ms-flex-positive: 1;\n          flex-grow: 1;\n\n  overflow-y: auto;\n}\n\n.tools-panel .background-item {\n  width: 56px;\n  width: 3.5rem;\n  height: 56px;\n  height: 3.5rem;\n\n  display: -webkit-box;\n\n  display: -ms-flexbox;\n\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n\n  margin: 4.8px;\n  margin: 0.3rem;\n\n  border: 1px solid #CCCCCC;\n  border-radius: 4px;\n}\n\n.background-item img {\n  max-width: 100%;\n  max-height: 100%;\n}\n\n.custom-color {\n  width: 100%;\n  height: 48px;\n  height: 3rem;\n\n  display: -webkit-box;\n\n  display: -ms-flexbox;\n\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  border-bottom: 2px dashed #DDD0C3;\n\n  font-family: STHeitiTC-Medium, serif;\n  font-size: 18px;\n  color: #645542;\n}\n\n.custom-color input {\n  width: 112px;\n  width: 7rem;\n  height: 24px;\n  height: 1.5rem;\n\n  margin: 0 8px;\n  margin: 0 0.5rem;\n\n  background: transparent;\n  border: 4px solid #FFFFFF;\n  border: 2px solid #AA9278;\n  box-shadow: inset 0 -2px 0 0 rgba(0, 0, 0, 0.30);\n  border-radius: 4px;\n\n  cursor: pointer;\n}\n\n.custom-color input:focus {\n  outline: none;\n}\n\n.clear-button {\n  height: 32px;\n  height: 2rem;\n  width: 176px;\n  width: 11rem;\n\n  margin: 8px 8px;\n  margin: 0.5rem 0.5rem;\n  border: 2px solid #645542;\n  border-radius: 4px;\n\n  /* 清除背景: */\n  font-family: STHeitiTC-Medium, serif;\n  font-size: 18px;\n  color: #645542;\n  text-align: center;\n  line-height: 32px;\n  line-height: 2rem;\n\n  cursor: pointer;\n}", ""]);
	
	// exports


/***/ },
/* 112 */
/***/ function(module, exports, __webpack_require__) {

	/* REACT HOT LOADER */ if (false) { (function () { var ReactHotAPI = require("/Users/greendou/Codemao/Kitten/libs/codemao-fabric/node_modules/react-hot-api/modules/index.js"), RootInstanceProvider = require("/Users/greendou/Codemao/Kitten/libs/codemao-fabric/node_modules/react-hot-loader/RootInstanceProvider.js"), ReactMount = require("react/lib/ReactMount"), React = require("react"); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {
	
	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var React = __webpack_require__(76);
	__webpack_require__(113);
	var LayerPanel = (function (_super) {
	    __extends(LayerPanel, _super);
	    function LayerPanel() {
	        _super.apply(this, arguments);
	    }
	    LayerPanel.prototype.render = function () {
	        return React.createElement("div", {className: "tools-layers"}, React.createElement("div", {className: "panel-slider-item"}, React.createElement("label", null, React.createElement("span", {className: "slider-title"}, "透明"), React.createElement("span", null, "-"), React.createElement("input", {type: "range", value: "1", min: "0", max: "1", step: "0.01"}), React.createElement("span", null, "+"), React.createElement("span", {className: "slider-value"}, "Span"))), React.createElement("div", {className: "layers-container"}, React.createElement("div", {className: "layers-item"}, React.createElement("div", {className: "layers-thumbnail"}, React.createElement("img", {alt: "缩略图"})), React.createElement("div", {className: "layers-item-right"}, React.createElement("span", {className: "layers-name"}, "Span 2"), React.createElement("div", {className: "layers-buttons"}, React.createElement("div", {className: "layers-visible"})), React.createElement("div", {className: "layers-delete"}, React.createElement("svg", {width: "18px", height: "18px", viewBox: "194 99 18 18", version: "1.1", xmlns: "http://www.w3.org/2000/svg"}, React.createElement("path", {d: "M201.530628,106.530628 L198.194021,106.530628 C197.459043,106.530628 196.863961,107.127581 196.863961,107.863961 C196.863961,108.605475 197.459449,109.197294 198.194021,109.197294 L201.530628,109.197294 L201.530628,112.533902 C201.530628,113.268879 202.127581,113.863961 202.863961,113.863961 C203.605475,113.863961 204.197294,113.268473 204.197294,112.533902 L204.197294,109.197294 L207.533902,109.197294 C208.268879,109.197294 208.863961,108.600341 208.863961,107.863961 C208.863961,107.122447 208.268473,106.530628 207.533902,106.530628 L204.197294,106.530628 L204.197294,103.194021 C204.197294,102.459043 203.600341,101.863961 202.863961,101.863961 C202.122447,101.863961 201.530628,102.459449 201.530628,103.194021 L201.530628,106.530628 Z", id: "layer-close-button", stroke: "none", fill: "#645542", "fill-rule": "evenodd", transform: "translate(202.863961, 107.863961) rotate(-315.000000) translate(-202.863961, -107.863961) "})))))), React.createElement("div", {className: "layers-tools-container"}, React.createElement("div", {className: "layers-tool"}, "^"), React.createElement("div", {className: "layers-tool"}, "v"), React.createElement("div", {className: "layers-tool"}, "+")));
	    };
	    return LayerPanel;
	}(React.Component));
	exports.LayerPanel = LayerPanel;
	

	/* REACT HOT LOADER */ }).call(this); } finally { if (false) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = require("/Users/greendou/Codemao/Kitten/libs/codemao-fabric/node_modules/react-hot-loader/makeExportsHot.js"); if (makeExportsHot(module, require("react"))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot not apply hot update to " + "LayerPanel.tsx" + ": " + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }

/***/ },
/* 113 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(114);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(82)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/postcss-loader/index.js!./painter-tools-layer.css", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/postcss-loader/index.js!./painter-tools-layer.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 114 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(81)();
	// imports
	
	
	// module
	exports.push([module.id, ".tools-layers {\n  width: 100%;\n  height: 100%;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n\n  padding: 0 5%;\n\n  background: #ECE7DD;\n}\n\n.panel-slider-item label {\n  height: 32px;\n  height: 2rem;\n\n  display: -webkit-box;\n\n  display: -ms-flexbox;\n\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n}\n\n.panel-slider-item input {\n  width: 96px;\n  width: 6rem;\n}\n\n.panel-slider-item span {\n  margin: 0 1.6px;\n  margin: 0 0.1rem;\n\n  font-family: STHeitiTC-Medium, serif;\n  font-size: 18px;\n  color: #645542;\n}\n\n.panel-slider-item span.slider-title {\n  margin-right: 8px;\n  margin-right: 0.5rem;\n  font-size: 18px;\n}\n\n.panel-slider-item span.slider-value {\n  font-size: 14px;\n\n  margin-left: 8px;\n  margin-left: 0.5rem;\n}\n\n.layers-container {\n  -webkit-box-flex: 1;\n      -ms-flex-positive: 1;\n          flex-grow: 1;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: reverse;\n      -ms-flex-direction: column-reverse;\n          flex-direction: column-reverse;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-pack: end;\n      -ms-flex-pack: end;\n          justify-content: flex-end;\n\n  padding: 0 16px;\n  padding: 0 1rem;\n}\n\n.layers-item {\n  width: 100%;\n  height: 56px;\n  height: 3.5rem;\n\n  position: relative;\n\n  display: -webkit-box;\n\n  display: -ms-flexbox;\n\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n\n  margin: 3.2px 0;\n  margin: 0.2rem 0;\n  padding: 0 1.6px;\n  padding: 0 0.1rem;\n\n  /*background: #FFFFFF;*/\n}\n\n.layers-item.active {\n  background: #FFF;\n}\n\n.layers-item-right {\n  -webkit-box-flex: 1;\n      -ms-flex-positive: 1;\n          flex-grow: 1;\n  height: 90%;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  -webkit-box-pack: justify;\n      -ms-flex-pack: justify;\n          justify-content: space-between;\n\n}\n\n.layers-thumbnail {\n  width: 56px;\n  width: 3.5rem;\n  height: 48px;\n  height: 3rem;\n\n  margin: 0 3.2px;\n  margin: 0 0.2rem;\n\n  background: #FFFFFF;\n  border: 1px solid #CCCCCC;\n}\n\n.layers-thumbnail img {\n  max-width: 100%;\n  max-height: 100%;\n}\n\n.layers-name {\n  font-family: STHeitiTC-Medium, serif;\n  font-size: 14px;\n  color: #645542;\n}\n\n.layers-tools-container {\n  height: 40px;\n  height: 2.5rem;\n\n  display: -webkit-box;\n\n  display: -ms-flexbox;\n\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-pack: start;\n      -ms-flex-pack: start;\n          justify-content: flex-start;\n}\n\n.layers-tool {\n  height: 24px;\n  height: 1.5rem;\n  width: 40px;\n  width: 2.5rem;\n\n  display: -webkit-box;\n\n  display: -ms-flexbox;\n\n  display: flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n\n  margin: 3.2px;\n  margin: 0.2rem;\n  background-color: #fff;\n  color: #CFBE90;\n\n  cursor: pointer;\n}\n\n.layers-delete {\n  display: none;\n  position: absolute;\n  top: 0;\n  right: 0;\n\n  cursor: pointer;\n}\n\n.layers-item.active .layers-delete {\n  display: block;\n}\n\n.layers-visible {\n  width: 19.2px;\n  width: 1.2rem;\n  height: 19.2px;\n  height: 1.2rem;\n\n  text-align: center;\n  line-height: 19.2px;\n  line-height: 1.2rem;\n\n  background: #D8D8D8;\n  border: 1px solid #979797;\n\n  font-family: STHeitiTC-Medium, serif;\n  font-size: 12px;\n  color: #645542;\n\n  cursor: pointer;\n}", ""]);
	
	// exports


/***/ },
/* 115 */
/***/ function(module, exports, __webpack_require__) {

	/* REACT HOT LOADER */ if (false) { (function () { var ReactHotAPI = require("/Users/greendou/Codemao/Kitten/libs/codemao-fabric/node_modules/react-hot-api/modules/index.js"), RootInstanceProvider = require("/Users/greendou/Codemao/Kitten/libs/codemao-fabric/node_modules/react-hot-loader/RootInstanceProvider.js"), ReactMount = require("react/lib/ReactMount"), React = require("react"); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {
	
	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var React = __webpack_require__(76);
	__webpack_require__(116);
	var ObjectPanel = (function (_super) {
	    __extends(ObjectPanel, _super);
	    function ObjectPanel() {
	        _super.apply(this, arguments);
	    }
	    ObjectPanel.prototype.render = function () {
	        return React.createElement("div", {className: "painter-object-panel"}, React.createElement("input", {title: "颜色", className: "color object-color"}), React.createElement("label", {className: "object-opacity"}, " 透明度 -", React.createElement("input", {title: " 透明度", type: "range", min: "0", max: "1", step: "0.01"}), "+", React.createElement("span", null, "Opacity")), React.createElement("input", {title: "字号", type: "number", className: "font-size"}), React.createElement("textarea", {className: "object-text", title: "文字内容"}), React.createElement("div", {title: "删除对象", className: "remove-button"}, React.createElement("img", {src: "//o44j7l4g3.qnssl.com/program/painter/delete.png", alt: "删除对象"})));
	    };
	    return ObjectPanel;
	}(React.Component));
	exports.ObjectPanel = ObjectPanel;
	

	/* REACT HOT LOADER */ }).call(this); } finally { if (false) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = require("/Users/greendou/Codemao/Kitten/libs/codemao-fabric/node_modules/react-hot-loader/makeExportsHot.js"); if (makeExportsHot(module, require("react"))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot not apply hot update to " + "ObjectPanel.tsx" + ": " + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }

/***/ },
/* 116 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(117);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(82)(content, {});
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
/* 117 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(81)();
	// imports
	
	
	// module
	exports.push([module.id, ".painter-object-panel {\n  width: 85%;\n  height: calc(10% - 1rem);\n  padding: 8px;\n  padding: 0.5rem;\n  background-color: #F8F8F8;\n\n  display: -webkit-box;\n\n  display: -ms-flexbox;\n\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n\n  -ms-flex-negative: 0;\n\n      flex-shrink: 0;\n}\n\n.painter-object-panel .object-color {\n  width: 32px;\n  width: 2rem;\n  height: 24px;\n  height: 1.5rem;\n  color: transparent;\n\n  background: #8B572A;\n  border: 4px solid #FFFFFF;\n  border: 2px solid #DDD0C3;\n  box-shadow: inset 0 -2px 0 0 rgba(0, 0, 0, 0.30);\n  border-radius: 4px;\n\n  cursor: pointer;\n}\n\n.painter-object-panel .object-opacity {\n  /*width: 14rem;*/\n  margin: 0 8px;\n  margin: 0 0.5rem;\n\n  font-family: STHeitiTC-Medium, serif;\n  font-size: 18px;\n  color: #645542;\n}\n\n.painter-object-panel .object-opacity input {\n  width: 100px;\n  width: 6.25rem;\n}\n\n.painter-object-panel .object-opacity span {\n  display: inline-block;\n\n  width: 35.2px;\n  width: 2.2rem;\n  margin-left: 8px;\n  margin-left: 0.5rem;\n  text-align: center;\n}\n\n.painter-object-panel .font-size {\n  width: 51.2px;\n  width: 3.2rem;\n  height: 24px;\n  height: 1.5rem;\n\n  margin: 0 8px;\n  margin: 0 0.5rem;\n\n  background: #FFFFFF;\n  border: 4px solid #FFFFFF;\n  border: 2px solid #DDD0C3;\n  border-radius: 4px;\n\n  font-family: STHeitiTC-Medium, serif;\n  font-size: 18px;\n  color: #645542;\n\n  text-align: center;\n}\n\n.painter-object-panel .font-size:focus {\n  outline: none;\n}\n\n.painter-object-panel .object-text {\n  width: 240px;\n  width: 15rem;\n  height: 48px;\n  height: 3rem;\n  max-width: 320px;\n  max-width: 20rem;\n  max-height: 56px;\n  max-height: 3.5rem;\n\n  margin: 0 8px;\n  margin: 0 0.5rem;\n}\n\n.painter-object-panel .remove-button {\n  float: right;\n\n  font-family: STHeitiTC-Medium, serif;\n  font-size: 18px;\n  color: #645542;\n\n  cursor: pointer;\n}", ""]);
	
	// exports


/***/ },
/* 118 */
/***/ function(module, exports, __webpack_require__) {

	/* REACT HOT LOADER */ if (false) { (function () { var ReactHotAPI = require("/Users/greendou/Codemao/Kitten/libs/codemao-fabric/node_modules/react-hot-api/modules/index.js"), RootInstanceProvider = require("/Users/greendou/Codemao/Kitten/libs/codemao-fabric/node_modules/react-hot-loader/RootInstanceProvider.js"), ReactMount = require("react/lib/ReactMount"), React = require("react"); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {
	
	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var React = __webpack_require__(76);
	__webpack_require__(107);
	var ControlButton = (function (_super) {
	    __extends(ControlButton, _super);
	    function ControlButton() {
	        _super.apply(this, arguments);
	    }
	    ControlButton.prototype.render = function () {
	        var className = this.props.control_button.className.join(' ') + ' control-button';
	        return React.createElement("div", {className: className});
	    };
	    return ControlButton;
	}(React.Component));
	exports.ControlButton = ControlButton;
	

	/* REACT HOT LOADER */ }).call(this); } finally { if (false) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = require("/Users/greendou/Codemao/Kitten/libs/codemao-fabric/node_modules/react-hot-loader/makeExportsHot.js"); if (makeExportsHot(module, require("react"))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot not apply hot update to " + "ControlButton.tsx" + ": " + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }

/***/ },
/* 119 */
/***/ function(module, exports, __webpack_require__) {

	/* REACT HOT LOADER */ if (false) { (function () { var ReactHotAPI = require("/Users/greendou/Codemao/Kitten/libs/codemao-fabric/node_modules/react-hot-api/modules/index.js"), RootInstanceProvider = require("/Users/greendou/Codemao/Kitten/libs/codemao-fabric/node_modules/react-hot-loader/RootInstanceProvider.js"), ReactMount = require("react/lib/ReactMount"), React = require("react"); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {
	
	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var config_1 = __webpack_require__(87);
	var EventEmitter = __webpack_require__(120);
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
	    PainterStore.prototype.emit_select_color = function () {
	        this.emit('select_color');
	    };
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
	

	/* REACT HOT LOADER */ }).call(this); } finally { if (false) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = require("/Users/greendou/Codemao/Kitten/libs/codemao-fabric/node_modules/react-hot-loader/makeExportsHot.js"); if (makeExportsHot(module, require("react"))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot not apply hot update to " + "painterStore.ts" + ": " + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }

/***/ },
/* 120 */
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

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map