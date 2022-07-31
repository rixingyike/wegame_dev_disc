"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }

function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }

function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

var _color = /*#__PURE__*/new WeakMap();

var _start = /*#__PURE__*/new WeakSet();

// JS：第1章\1.5.1\index.js
var Car = /*#__PURE__*/function () {
  function Car() {
    _classCallCheck(this, Car);

    _start.add(this);

    _color.set(this, {
      writable: true,
      value: "red"
    });
  }

  _createClass(Car, [{
    key: "color",
    get: function get() {
      return _classPrivateFieldGet(this, _color);
    }
  }, {
    key: "run",
    value: function run() {
      _classPrivateMethodGet(this, _start, _start2).call(this);

      console.log("running");
    }
  }]);

  return Car;
}();

function _start2() {
  console.log("starting");
}

var c = new Car();
console.log(c.color); // 输出：red
// console.log(c.#color) // SyntaxError: Private name #color is not defined.

c.run(); // 输出：running
// c.start() // c.start is not a function
