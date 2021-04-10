const AuthController = require("./controller");
const store = require("../../../store/dummy");
const authController = new AuthController(store);
module.exports = { authController };
