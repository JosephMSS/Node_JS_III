const AuthController = require("./controller");
// const store = require("../../../store/mysql");
const store = require("../../../store/remote-mysql");
const authController = new AuthController(store);
module.exports = { authController };
