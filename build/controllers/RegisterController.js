"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _express = _interopRequireDefault(require("express"));

var _httpStatusCodes = require("http-status-codes");

var _logger = _interopRequireDefault(require("../config/logger"));

var _RegisterUserService = _interopRequireDefault(require("../services/RegisterUserService"));

var RegisterController = _express["default"].Router();

var LOG = new _logger["default"]('RegisterController.js');

var registerHandler = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var result;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            LOG.info("Starting the RegisterUserService with input ".concat(JSON.stringify(req.body)));
            _context.next = 3;
            return (0, _RegisterUserService["default"])(req.body);

          case 3:
            result = _context.sent;

            if (!(result === 'success')) {
              _context.next = 9;
              break;
            }

            LOG.info('User record successfully registered');
            return _context.abrupt("return", res.status(_httpStatusCodes.NO_CONTENT).send('Updated'));

          case 9:
            LOG.info("User record failed registered, the reason is ".concat(result));
            return _context.abrupt("return", res.status(_httpStatusCodes.INTERNAL_SERVER_ERROR).send(result));

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function registerHandler(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

RegisterController.post('/register', registerHandler);
var _default = RegisterController;
exports["default"] = _default;