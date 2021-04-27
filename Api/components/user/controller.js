const TABLE = "user";
const { nanoid } = require("nanoid");
const {authController} = require('../auth');
module.exports = class UserController {
  constructor(store) {
    this.store = store || require("../../../store/dummy");
  }
  list() {
    return this.store.list(TABLE);
  }
  get(id) {
    return this.store.get(TABLE, id);
  }
  upsert({ id, name,username,password }) {
    return new Promise(async (resolve, reject) => {
      let auth={};
      if (!name) {
        reject("Invalid data!");
        return false;
      }
      if (!id) {
        id = nanoid();
      }
      if (username||password) {
         auth=await authController.upsert({id,username,password})
      }
      let user = {
        id,
        name,
      };
      await this.store.upsert(TABLE, user);
      resolve({user,auth});
    });
  }
  remove(id) {
    return new Promise(async (resolve, reject) => {
      if (!id) {
        reject("Invalid data!");
        return false;
      }
      let user = await this.store.remove(TABLE, id);
      resolve(user);
    });
  }
  removeAll() {
    return new Promise(async (resolve, reject) => {
 
      let user = await this.store.removeAll(TABLE);
      await authController.removeAll()
      resolve(user);
    });
  }
};
