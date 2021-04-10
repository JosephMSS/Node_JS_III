const UserController = require("./controller");
const store = require("../../../store/dummy");
const userController = new UserController(store);
module.exports = { userController };
