"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = RegisterUserService;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _logger = _interopRequireDefault(require("../config/logger"));

var _validateRequestBody = _interopRequireDefault(require("../utils/validateRequestBody"));

var _database = require("../config/database");

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var LOG = new _logger["default"]('RegisterService.js');

function queryBaseOnSubjectAndClass(_x, _x2) {
  return _queryBaseOnSubjectAndClass.apply(this, arguments);
}

function _queryBaseOnSubjectAndClass() {
  _queryBaseOnSubjectAndClass = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(subjectCode, classCode) {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt("return", _database.Teacher.findAll({
              where: {
                subjectCode: subjectCode,
                classCode: classCode
              }
            }));

          case 1:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _queryBaseOnSubjectAndClass.apply(this, arguments);
}

function RegisterUserService(_x3) {
  return _RegisterUserService.apply(this, arguments);
}

function _RegisterUserService() {
  _RegisterUserService = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(requestBody) {
    var validRequestBodyResult, teacher, students, subject, name, email, subjectCode, subjectName, classCode, className, teachers, teacherCreatedForThisClassAndSubject, _iterator, _step, _teacher;

    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            LOG.info('Validating the request body');
            validRequestBodyResult = (0, _validateRequestBody["default"])(requestBody);
            LOG.info("the validation result is ".concat(validRequestBodyResult));

            if (!(validRequestBodyResult === 'correct format')) {
              _context2.next = 38;
              break;
            }

            // destructure the requestbody, class is a system varibale so cannot be destruct here
            teacher = requestBody.teacher, students = requestBody.students, subject = requestBody.subject;
            name = teacher.name, email = teacher.email;
            subjectCode = subject.subjectCode, subjectName = subject.name, classCode = requestBody["class"].classCode, className = requestBody["class"].name; // query the other teachers who teach also on the subject and class code, make sure the students are the same

            _context2.next = 9;
            return queryBaseOnSubjectAndClass(subjectCode, classCode);

          case 9:
            teachers = _context2.sent;
            teacherCreatedForThisClassAndSubject = false;
            _iterator = _createForOfIteratorHelper(teachers);
            _context2.prev = 12;

            _iterator.s();

          case 14:
            if ((_step = _iterator.n()).done) {
              _context2.next = 23;
              break;
            }

            _teacher = _step.value;
            // if the class already existed sync all the students in this class to the latest
            _teacher.students = students;
            _context2.next = 19;
            return _teacher.save();

          case 19:
            LOG.info("Updating students for ".concat(_teacher.name, " for subject ").concat(subjectName, " and class ").concat(className, " in the database"));

            if (_teacher.email == email) {
              teacherCreatedForThisClassAndSubject = true;
            }

          case 21:
            _context2.next = 14;
            break;

          case 23:
            _context2.next = 28;
            break;

          case 25:
            _context2.prev = 25;
            _context2.t0 = _context2["catch"](12);

            _iterator.e(_context2.t0);

          case 28:
            _context2.prev = 28;

            _iterator.f();

            return _context2.finish(28);

          case 31:
            if (teacherCreatedForThisClassAndSubject) {
              _context2.next = 35;
              break;
            }

            _context2.next = 34;
            return _database.Teacher.create({
              name: name,
              email: email,
              students: students,
              subjectCode: subjectCode,
              subjectName: subjectName,
              classCode: classCode,
              className: className
            });

          case 34:
            LOG.info("Insert the Teacher ".concat(name, " teaching subject ").concat(subjectName, " and class ").concat(className, " in the database"));

          case 35:
            return _context2.abrupt("return", 'success');

          case 38:
            return _context2.abrupt("return", validRequestBodyResult);

          case 39:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[12, 25, 28, 31]]);
  }));
  return _RegisterUserService.apply(this, arguments);
}