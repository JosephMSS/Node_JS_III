const UserController = require("./controller");
const {config}=require('../../../config')
let store; 
if (config.removeDB===true) {
    store = require("../../../store/remote-mysql");
}else{

    store=require("../../../store/mysql");
}
const userController = new UserController(store);
module.exports = { userController };
