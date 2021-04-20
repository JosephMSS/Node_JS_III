const UserController = require("./controller");
const store = require("../../../store/mysql");
const userController = new UserController(store);
module.exports = { userController };
