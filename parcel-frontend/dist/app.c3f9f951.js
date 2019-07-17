// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"js/components/Header.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Header;

function Header() {
  return "\n        <nav class= 'nav__header'>\n            <ul>\n                <li class='nav__home'>Home</li>\n                <li class='nav__values'>Values</li>\n                <li class='nav__toDos'>ToDos</li>\n            </ul>\n        </nav>\n    ";
}
},{}],"js/components/Footer.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Footer;

function Footer() {
  return "\n        <small>&copy wcci 2019</wcci>\n    ";
}
},{}],"js/components/Home.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Home;

function Home() {
  return "\n    <h1>Welcome to this SPA demo</h1>\n    <p>Thanks for joining us</p>\n    ";
}
},{}],"js/components/ToDos.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ToDos;

function ToDos(toDos) {
  return "\n        <ul> \n        ".concat(toDos.map(function (toDo) {
    return "\n                    <li>\n                        <h3>".concat(toDo, "</h3>\n                        <input class='delete-toDo__id' type='hidden' value=\"").concat(toDo, "\">\n                        <button class='delete-toDoId__submit'>&times</button>\n                    </li>\n                ");
  }).join(''), "\n         </ul>\n\n         <section class='add-toDo'>\n            <input class='add-toDo__toDoName' type='text' placeholder='Add a toDo!'>\n            <button class='add-toDo__submit'>Submit</button>\n        </section>\n\n        <section class='delete-toDo'>\n            <input class='delete-toDo__toDoName' type='text' placeholder='Delete a toDo!'>\n            <button class='delete-toDo__submit'>Submit</button>\n        </section>\n    ");
}
},{}],"js/components/Values.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Values;

function Values(values) {
  return "\n        <ul>\n            ".concat(values.map(function (value) {
    return "\n                    <li>\n                        <h3>".concat(value, "</h3>\n                    </li>\n                ");
  }).join(''), "\n         </ul>\n    ");
}
},{}],"js/api/api-actions.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function getRequest(location, callback) {
  fetch(location).then(function (response) {
    return response.json();
  }).then(function (data) {
    return callback(data);
  }).catch(function (err) {
    return console.log(err);
  });
}

function postRequest(location, requestBody, callback) {
  fetch(location, {
    method: "POST",
    body: JSON.stringify(requestBody),
    headers: {
      "Content-Type": "application/json"
    }
  }).then(function (response) {
    return response.json();
  }).then(function (data) {
    return callback(data);
  }).catch(function (err) {
    return console.log(err);
  });
}

function deleteRequest(location, requestBody, callback) {
  fetch(location, {
    method: "DELETE",
    body: JSON.stringify(requestBody),
    headers: {
      "Content-Type": "application/json"
    }
  }).then(function (response) {
    return response.json();
  }).then(function (data) {
    return callback(data);
  }).catch(function (err) {
    return console.log(err);
  });
}

var _default = {
  getRequest: getRequest,
  postRequest: postRequest,
  deleteRequest: deleteRequest
};
exports.default = _default;
},{}],"js/app.js":[function(require,module,exports) {
"use strict";

var _Header = _interopRequireDefault(require("./components/Header"));

var _Footer = _interopRequireDefault(require("./components/Footer"));

var _Home = _interopRequireDefault(require("./components/Home"));

var _ToDos = _interopRequireDefault(require("./components/ToDos"));

var _Values = _interopRequireDefault(require("./components/Values"));

var _apiActions = _interopRequireDefault(require("./api/api-actions"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

pageBuild();

function pageBuild() {
  header();
  footer();
  navHome();
  navToDos();
  navValues();
}

function header() {
  var header = document.querySelector("#header");
  header.innerHTML = (0, _Header.default)(); //send component into our html
}

function footer() {
  var footer = document.querySelector("#footer");
  footer.innerHTML = (0, _Footer.default)();
}

function navHome() {
  var homeButton = document.querySelector(".nav__home");
  homeButton.addEventListener("click", function () {
    document.querySelector("#app").innerHTML = (0, _Home.default)();
  });
}

function navToDos() {
  var toDosButton = document.querySelector(".nav__toDos");
  toDosButton.addEventListener("click", function () {
    _apiActions.default.getRequest("https://localhost:5001/api/todos", function (toDos) {
      document.querySelector("#app").innerHTML = (0, _ToDos.default)(toDos);
    });
  });
  var app = document.querySelector("#app");
  app.addEventListener("click", function () {
    if (event.target.classList.contains("add-toDo__submit")) {
      var todo = event.target.parentElement.querySelector(".add-toDo__toDoName").value;

      _apiActions.default.postRequest("https://localhost:5001/api/todos", todo, function (toDos) {
        console.log(toDos);
        document.querySelector("#app").innerHTML = (0, _ToDos.default)(toDos);
      });
    }
  });
  app.addEventListener("click", function () {
    if (event.target.classList.contains("delete-toDo__submit")) {
      var todo = event.target.parentElement.querySelector(".delete-toDo__toDoName").value;

      _apiActions.default.deleteRequest("https://localhost:5001/api/todos", todo, function (toDos) {
        console.log(toDos);
        document.querySelector("#app").innerHTML = (0, _ToDos.default)(toDos);
      });
    }
  });
  app.addEventListener("click", function () {
    if (event.target.classList.contains("delete-toDoId__submit")) {
      console.log("event triggered");
      var todo = event.target.parentElement.querySelector(".delete-toDo__id").value;
      console.log(todo);

      _apiActions.default.deleteRequest("https://localhost:5001/api/todos", todo, function (toDos) {
        console.log(toDos);
        document.querySelector("#app").innerHTML = (0, _ToDos.default)(toDos);
      });
    }
  });
}

function navValues() {
  var valueButton = document.querySelector(".nav__values");
  valueButton.addEventListener("click", function () {
    _apiActions.default.getRequest("https://localhost:5001/api/values", function (values) {
      document.querySelector("#app").innerHTML = (0, _Values.default)(values);
    });
  });
}
},{"./components/Header":"js/components/Header.js","./components/Footer":"js/components/Footer.js","./components/Home":"js/components/Home.js","./components/ToDos":"js/components/ToDos.js","./components/Values":"js/components/Values.js","./api/api-actions":"js/api/api-actions.js"}],"../../../../../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "51391" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else {
        window.location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../../../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/app.js"], null)
//# sourceMappingURL=/app.c3f9f951.js.map