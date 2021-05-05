const UserController = require("./controller");
const { config } = require("../../../config");
let store;
if (config.removeDB === true) {
  store = require("../../../store/remote-mysql");
  cache = require("../../../store/remote-cache");
} else {
  store = require("../../../store/mysql");
  cache = require("../../../store/redis");
}
const userController = new UserController(store,cache);
module.exports = { userController };
