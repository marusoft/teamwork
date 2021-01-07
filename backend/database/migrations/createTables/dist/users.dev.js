"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _dbConnection = _interopRequireDefault(require("../../dbConnection"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable no-console */
var usersTable = "\nDROP TABLE IF EXISTS users CASCADE;\n  CREATE TABLE IF NOT EXISTS users( \n    id SERIAL PRIMARY KEY NOT NULL,\n    username VARCHAR(128) NOT NULL,\n    firstname VARCHAR(128) NOT NULL,\n    lastname VARCHAR(128) NOT NULL,\n    email VARCHAR(255) UNIQUE NOT NULL,\n    password TEXT NOT NULL,\n    gender VARCHAR(90) NOT NULL DEFAULT 'male',\n    jobrole VARCHAR(100) NOT NULL DEFAULT 'admin',\n    department VARCHAR(128) NOT NULL,\n    address VARCHAR(128) NOT NULL\n  )";
/**
 * Function representing UserTableHandler
 * @returns {object} representing sucess or failure
 */

function createUsersTable() {
  var create;
  return regeneratorRuntime.async(function createUsersTable$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(_dbConnection["default"].query(usersTable));

        case 3:
          create = _context.sent;
          console.log("usersTable: ".concat(create[0].command, "PED and ").concat(create[1].command, "D"));
          _context.next = 10;
          break;

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          console.log("usersTable: ".concat(_context.t0));

        case 10:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 7]]);
}

var _default = createUsersTable;
exports["default"] = _default;