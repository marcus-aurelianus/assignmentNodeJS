"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = validateRequestBody;

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function validateUser(userEntity) {
  if (Object.prototype.hasOwnProperty.call(userEntity, 'name') && Object.prototype.hasOwnProperty.call(userEntity, 'email')) {
    return true;
  }

  return false;
}

function validateRequestBody(requestBody) {
  if (Object.prototype.hasOwnProperty.call(requestBody, 'teacher') && Object.prototype.hasOwnProperty.call(requestBody, 'students') && Object.prototype.hasOwnProperty.call(requestBody, 'subject') && Object.prototype.hasOwnProperty.call(requestBody, 'class') && requestBody !== undefined && requestBody !== null && requestBody.constructor == Object) {
    if (!validateUser(requestBody.teacher)) {
      return 'wrong format in teacher';
    }

    var _iterator = _createForOfIteratorHelper(requestBody.students),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var student = _step.value;

        if (!validateUser(student)) {
          return 'wrong format in students';
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }

    if (!Object.prototype.hasOwnProperty.call(requestBody.subject, 'subjectCode') || !Object.prototype.hasOwnProperty.call(requestBody.subject, 'name')) {
      return 'wrong format in subject';
    }

    if (!Object.prototype.hasOwnProperty.call(requestBody["class"], 'classCode') || !Object.prototype.hasOwnProperty.call(requestBody["class"], 'name')) {
      return 'wrong format in class';
    }

    return 'correct format';
  }

  return 'missing required properties';
}