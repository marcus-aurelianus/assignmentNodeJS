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

var _WorkloadService = _interopRequireDefault(require("../services/WorkloadService"));

var LOG = new _logger["default"]('WorkloadController.js');

var WorkloadController = _express["default"].Router();

var reportWorkloadHandler = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var result;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            LOG.info('Starting the worldload service');
            _context.next = 3;
            return (0, _WorkloadService["default"])();

          case 3:
            result = _context.sent;

            if (!result) {
              _context.next = 9;
              break;
            }

            LOG.info("The worldload service sucess, return value is ".concat(JSON.stringify(result)));
            return _context.abrupt("return", res.status(_httpStatusCodes.OK).json(result));

          case 9:
            LOG.info('No record found in database');
            return _context.abrupt("return", res.status(_httpStatusCodes.INTERNAL_SERVER_ERROR).send('no record'));

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function reportWorkloadHandler(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

WorkloadController.get('/reports/workload', reportWorkloadHandler);
var _default = WorkloadController;
exports["default"] = _default;