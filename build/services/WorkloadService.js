"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = WorkloadService;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _logger = _interopRequireDefault(require("../config/logger"));

var _database = require("../config/database");

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var LOG = new _logger["default"]('RegisterService.js');

function WorkloadService() {
  return _WorkloadService.apply(this, arguments);
}

function _WorkloadService() {
  _WorkloadService = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    var records, resultCount, _iterator, _step, record, result, eachTeacher, eachSubject;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _database.Teacher.findAll();

          case 2:
            records = _context.sent;
            LOG.info('start from convert database all records to count object');

            if (!records.length) {
              _context.next = 15;
              break;
            }

            resultCount = {};
            _iterator = _createForOfIteratorHelper(records);

            try {
              for (_iterator.s(); !(_step = _iterator.n()).done;) {
                record = _step.value;

                // subject code us unique there fore we use it as a key
                if (!Object.prototype.hasOwnProperty.call(resultCount, record.name)) {
                  // intialize result count object regarding each teacher
                  resultCount[record.name] = {}; // add subject field for each subject and count the class

                  resultCount[record.name][record.subjectCode] = {
                    subjectCode: record.subjectCode,
                    subjectName: record.subjectName
                  };
                  resultCount[record.name][record.subjectCode].numberOfClasses = 1; // add subject field for each subject and count the class
                } else if (!Object.prototype.hasOwnProperty.call(resultCount[record.name], [record.subjectCode])) {
                  resultCount[record.name][record.subjectCode] = {
                    subjectCode: record.subjectCode,
                    subjectName: record.subjectName
                  };
                  resultCount[record.name][record.subjectCode].numberOfClasses = 1;
                } // add class if subject and teacher are intialized alrd
                else {
                    resultCount[record.name][record.subjectCode].numberOfClasses += 1;
                  }
              }
            } catch (err) {
              _iterator.e(err);
            } finally {
              _iterator.f();
            }

            result = {}; // convert from count object to the result object

            LOG.info('convert from count object to the result object');

            for (eachTeacher in resultCount) {
              result[eachTeacher] = []; // each Subject is the key we set earlier

              for (eachSubject in resultCount[eachTeacher]) {
                result[eachTeacher].push(resultCount[eachTeacher][eachSubject]);
              }
            }

            LOG.info("the work load is ".concat(JSON.stringify(result)));
            return _context.abrupt("return", result);

          case 15:
            return _context.abrupt("return", null);

          case 16:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _WorkloadService.apply(this, arguments);
}