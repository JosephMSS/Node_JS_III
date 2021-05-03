const UserController = require("./controller");
// const store = require("../../../store/mysql");
const store = require("../../../store/remote-mysql");
const userController = new UserController(store);
module.exports = { userController };
