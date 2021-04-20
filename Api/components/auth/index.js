const AuthController = require("./controller");
const store = require("../../../store/mysql");
const authController = new AuthController(store);
module.exports = { authController };
