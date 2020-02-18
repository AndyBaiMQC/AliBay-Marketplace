/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.jsx");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.jsx":
/*!***********************!*\
  !*** ./src/index.jsx ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

throw new Error("Module build failed (from ./node_modules/babel-loader/lib/index.js):\nSyntaxError: /home/andybai/Desktop/AliBay-Marketplace/src/index.jsx: Unexpected token (10:16)\n\n   8 | reloadMagic() // automatic reload\n   9 | \n> 10 | ReactDOM.render(<App />, document.getElementById(\"root\"))\n     |                 ^\n    at Parser.raise (/home/andybai/Desktop/AliBay-Marketplace/node_modules/@babel/parser/lib/index.js:7013:17)\n    at Parser.unexpected (/home/andybai/Desktop/AliBay-Marketplace/node_modules/@babel/parser/lib/index.js:8384:16)\n    at Parser.parseExprAtom (/home/andybai/Desktop/AliBay-Marketplace/node_modules/@babel/parser/lib/index.js:9639:20)\n    at Parser.parseExprSubscripts (/home/andybai/Desktop/AliBay-Marketplace/node_modules/@babel/parser/lib/index.js:9219:23)\n    at Parser.parseMaybeUnary (/home/andybai/Desktop/AliBay-Marketplace/node_modules/@babel/parser/lib/index.js:9199:21)\n    at Parser.parseExprOps (/home/andybai/Desktop/AliBay-Marketplace/node_modules/@babel/parser/lib/index.js:9067:23)\n    at Parser.parseMaybeConditional (/home/andybai/Desktop/AliBay-Marketplace/node_modules/@babel/parser/lib/index.js:9040:23)\n    at Parser.parseMaybeAssign (/home/andybai/Desktop/AliBay-Marketplace/node_modules/@babel/parser/lib/index.js:9000:21)\n    at Parser.parseExprListItem (/home/andybai/Desktop/AliBay-Marketplace/node_modules/@babel/parser/lib/index.js:10295:18)\n    at Parser.parseCallExpressionArguments (/home/andybai/Desktop/AliBay-Marketplace/node_modules/@babel/parser/lib/index.js:9404:22)\n    at Parser.parseSubscript (/home/andybai/Desktop/AliBay-Marketplace/node_modules/@babel/parser/lib/index.js:9310:31)\n    at Parser.parseSubscripts (/home/andybai/Desktop/AliBay-Marketplace/node_modules/@babel/parser/lib/index.js:9240:19)\n    at Parser.parseExprSubscripts (/home/andybai/Desktop/AliBay-Marketplace/node_modules/@babel/parser/lib/index.js:9229:17)\n    at Parser.parseMaybeUnary (/home/andybai/Desktop/AliBay-Marketplace/node_modules/@babel/parser/lib/index.js:9199:21)\n    at Parser.parseExprOps (/home/andybai/Desktop/AliBay-Marketplace/node_modules/@babel/parser/lib/index.js:9067:23)\n    at Parser.parseMaybeConditional (/home/andybai/Desktop/AliBay-Marketplace/node_modules/@babel/parser/lib/index.js:9040:23)\n    at Parser.parseMaybeAssign (/home/andybai/Desktop/AliBay-Marketplace/node_modules/@babel/parser/lib/index.js:9000:21)\n    at Parser.parseExpression (/home/andybai/Desktop/AliBay-Marketplace/node_modules/@babel/parser/lib/index.js:8950:23)\n    at Parser.parseStatementContent (/home/andybai/Desktop/AliBay-Marketplace/node_modules/@babel/parser/lib/index.js:10787:23)\n    at Parser.parseStatement (/home/andybai/Desktop/AliBay-Marketplace/node_modules/@babel/parser/lib/index.js:10658:17)\n    at Parser.parseBlockOrModuleBlockBody (/home/andybai/Desktop/AliBay-Marketplace/node_modules/@babel/parser/lib/index.js:11234:25)\n    at Parser.parseBlockBody (/home/andybai/Desktop/AliBay-Marketplace/node_modules/@babel/parser/lib/index.js:11221:10)\n    at Parser.parseTopLevel (/home/andybai/Desktop/AliBay-Marketplace/node_modules/@babel/parser/lib/index.js:10589:10)\n    at Parser.parse (/home/andybai/Desktop/AliBay-Marketplace/node_modules/@babel/parser/lib/index.js:12192:10)\n    at parse (/home/andybai/Desktop/AliBay-Marketplace/node_modules/@babel/parser/lib/index.js:12243:38)\n    at parser (/home/andybai/Desktop/AliBay-Marketplace/node_modules/@babel/core/lib/parser/index.js:54:34)\n    at parser.next (<anonymous>)\n    at normalizeFile (/home/andybai/Desktop/AliBay-Marketplace/node_modules/@babel/core/lib/transformation/normalize-file.js:93:38)\n    at normalizeFile.next (<anonymous>)\n    at run (/home/andybai/Desktop/AliBay-Marketplace/node_modules/@babel/core/lib/transformation/index.js:31:50)");

/***/ })

/******/ });
//# sourceMappingURL=javascript.js.map