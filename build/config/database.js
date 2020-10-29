"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.Teacher = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _sequelize = require("sequelize");

var _logger = _interopRequireDefault(require("./logger"));

//const {Sequelize} = require('sequelize');
var LOG = new _logger["default"]('database.js');
var _process$env = process.env,
    _process$env$DB_HOST = _process$env.DB_HOST,
    DB_HOST = _process$env$DB_HOST === void 0 ? 'localhost' : _process$env$DB_HOST,
    _process$env$DB_PORT = _process$env.DB_PORT,
    DB_PORT = _process$env$DB_PORT === void 0 ? '3306' : _process$env$DB_PORT,
    _process$env$DB_SCHEM = _process$env.DB_SCHEMA,
    DB_SCHEMA = _process$env$DB_SCHEM === void 0 ? 'school-administration-system' : _process$env$DB_SCHEM,
    _process$env$DB_USER = _process$env.DB_USER,
    DB_USER = _process$env$DB_USER === void 0 ? 'root' : _process$env$DB_USER,
    _process$env$DB_PW = _process$env.DB_PW,
    DB_PW = _process$env$DB_PW === void 0 ? 'password' : _process$env$DB_PW,
    _process$env$DB_POOL_ = _process$env.DB_POOL_ACQUIRE,
    DB_POOL_ACQUIRE = _process$env$DB_POOL_ === void 0 ? '30000' : _process$env$DB_POOL_,
    _process$env$DB_POOL_2 = _process$env.DB_POOL_IDLE,
    DB_POOL_IDLE = _process$env$DB_POOL_2 === void 0 ? '10000' : _process$env$DB_POOL_2,
    _process$env$DB_POOL_3 = _process$env.DB_POOL_MAX_CONN,
    DB_POOL_MAX_CONN = _process$env$DB_POOL_3 === void 0 ? '10' : _process$env$DB_POOL_3,
    _process$env$DB_POOL_4 = _process$env.DB_POOL_MIN_CONN,
    DB_POOL_MIN_CONN = _process$env$DB_POOL_4 === void 0 ? '1' : _process$env$DB_POOL_4,
    _process$env$DB_LOG_L = _process$env.DB_LOG_LEVEL,
    DB_LOG_LEVEL = _process$env$DB_LOG_L === void 0 ? 'info' : _process$env$DB_LOG_L;
var sequelize = new _sequelize.Sequelize(DB_SCHEMA, DB_USER, DB_PW, {
  dialect: 'mysql',
  host: DB_HOST,
  port: parseInt(DB_PORT),
  pool: {
    acquire: parseInt(DB_POOL_ACQUIRE),
    idle: parseInt(DB_POOL_IDLE),
    max: parseInt(DB_POOL_MAX_CONN),
    min: parseInt(DB_POOL_MIN_CONN)
  },
  timezone: '+08:00',
  logging: function logging(msg) {
    LOG[DB_LOG_LEVEL](msg);
  }
}); // initilize teacher table in sequelize

var Teacher = sequelize.define('teacher', {
  name: _sequelize.Sequelize.STRING(100),
  email: _sequelize.Sequelize.STRING(100),
  students: _sequelize.Sequelize.JSON,
  subjectCode: _sequelize.Sequelize.STRING(100),
  subjectName: _sequelize.Sequelize.STRING(100),
  classCode: _sequelize.Sequelize.STRING(100),
  className: _sequelize.Sequelize.STRING(100)
}); // if the table is not existed, create it with sequelize.sync

exports.Teacher = Teacher;
(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
  return _regenerator["default"].wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return sequelize.sync({
            force: false
          });

        case 2:
        case "end":
          return _context.stop();
      }
    }
  }, _callee);
}))();
var _default = sequelize;
exports["default"] = _default;