"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _validatorjs = _interopRequireDefault(require("validatorjs"));

var _dbConnection = _interopRequireDefault(require("../database/dbConnection"));

var _sql = require("../database/queries/sql");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * UsersValidation
 */
var UsersValidation =
/*#__PURE__*/
function () {
  function UsersValidation() {
    _classCallCheck(this, UsersValidation);
  }

  _createClass(UsersValidation, null, [{
    key: "ValidateCreateUserInput",

    /**
     * @returns {object} ValidateUserSignUpInput
     * @param {*} req
     * @param {*} res
     * @param {*} next
     */
    value: function ValidateCreateUserInput(req, res, next) {
      var _req$body, username, firstname, lastname, password, gender, jobrole, department, address, email, constraint, validation, value, _ref, rows;

      return regeneratorRuntime.async(function ValidateCreateUserInput$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _req$body = req.body, username = _req$body.username, firstname = _req$body.firstname, lastname = _req$body.lastname, password = _req$body.password, gender = _req$body.gender, jobrole = _req$body.jobrole, department = _req$body.department, address = _req$body.address;
              email = req.body.email;
              constraint = {
                username: 'required|min:3|max:20|alpha_num',
                firstname: 'required|min:3|max:20|alpha',
                lastname: 'required|min:3|max:20|alpha',
                email: 'required|email|min:12|max:30',
                password: 'required|min:8|max:14',
                gender: 'required|alpha',
                jobrole: 'required|min:4|max:10|alpha',
                department: 'required|min:8|max:20|alpha',
                address: 'required|string'
              };
              validation = new _validatorjs["default"](req.body, constraint);

              if (!validation.fails()) {
                _context.next = 6;
                break;
              }

              return _context.abrupt("return", res.status(400).json({
                status: 400,
                error: validation.errors.errors
              }));

            case 6:
              email = email.toLowerCase().trim();
              _context.prev = 7;
              value = [email];
              _context.next = 11;
              return regeneratorRuntime.awrap(_dbConnection["default"].query(_sql.findIfUserExist, value));

            case 11:
              _ref = _context.sent;
              rows = _ref.rows;

              if (!rows[0]) {
                _context.next = 15;
                break;
              }

              return _context.abrupt("return", res.status(409).json({
                status: 409,
                error: 'Conflict, Email already registered, proceed to sigin...'
              }));

            case 15:
              _context.next = 20;
              break;

            case 17:
              _context.prev = 17;
              _context.t0 = _context["catch"](7);
              return _context.abrupt("return", res.status(500).json({
                error: _context.t0
              }));

            case 20:
              req.body.email = email;
              req.body.username = username.toLowerCase().trim();
              req.body.firstname = firstname.toLowerCase().trim();
              req.body.lastname = lastname.toLowerCase().trim();
              req.body.password = password.trim();
              req.body.gender = gender.trim();
              req.body.jobrole = jobrole.trim();
              req.body.department = department.trim();
              req.body.address = address.trim();
              return _context.abrupt("return", next());

            case 30:
            case "end":
              return _context.stop();
          }
        }
      }, null, null, [[7, 17]]);
    }
    /**
     * @returns {object} ValidateUserSignInInput
     * @param {*} req
     * @param {*} res
     * @param {*} next
     */

  }, {
    key: "ValidateUserLoginInInput",
    value: function ValidateUserLoginInInput(req, res, next) {
      var _req$body2, email, password, constraint, validation, value, _ref2, rows;

      return regeneratorRuntime.async(function ValidateUserLoginInInput$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password;
              constraint = {
                email: 'required|email',
                password: 'required'
              };
              validation = new _validatorjs["default"](req.body, constraint);

              if (!validation.fails()) {
                _context2.next = 5;
                break;
              }

              return _context2.abrupt("return", res.status(400).json({
                status: 400,
                error: validation.errors.errors
              }));

            case 5:
              email = email.toLowerCase().trim();
              _context2.prev = 6;
              value = [email];
              _context2.next = 10;
              return regeneratorRuntime.awrap(_dbConnection["default"].query(_sql.findIfUserExist, value));

            case 10:
              _ref2 = _context2.sent;
              rows = _ref2.rows;

              if (rows[0]) {
                _context2.next = 14;
                break;
              }

              return _context2.abrupt("return", res.status(401).json({
                status: 401,
                error: 'User does not exist, Please contact an admin for account registration'
              }));

            case 14:
              password = password.trim();
              _context2.next = 20;
              break;

            case 17:
              _context2.prev = 17;
              _context2.t0 = _context2["catch"](6);
              return _context2.abrupt("return", res.status(500).json({
                status: 500,
                error: _context2.t0.message
              }));

            case 20:
              req.body.email = email;
              req.body.password = password;
              return _context2.abrupt("return", next());

            case 23:
            case "end":
              return _context2.stop();
          }
        }
      }, null, null, [[6, 17]]);
    }
  }]);

  return UsersValidation;
}();

var _default = UsersValidation;
exports["default"] = _default;