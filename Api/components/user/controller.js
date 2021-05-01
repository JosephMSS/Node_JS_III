const TABLE = "user";
const { nanoid } = require("nanoid");
const { authController } = require("../auth");
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
  getFollowing(id) {
    const join = {};
    join[TABLE] = "user_to"; //{user:"user_to"}
    const query = { user_from: id };
    return this.store.query(`${TABLE}_follow`, query, join);
  }
  insert({ id, name, username, password }) {
    return new Promise(async (resolve, reject) => {
      let auth = {};
      if (!name) {
        reject("Invalid data!");
        return false;
      }
      if (!id) {
        id = nanoid();
      }
      if (username || password) {
        auth = await authController.insert({ id, username, password });
      }
      let user = {
        id,
        name,
      };
      await this.store.insert(TABLE, user);
      resolve({ user, auth });
    });
  }
  update({ id, name, username, password }) {
    return new Promise(async (resolve, reject) => {
      let auth = {};
      if (!name) {
        reject("Invalid data!");
        return false;
      }
      if (!id) {
        id = nanoid();
      }
      if (username || password) {
        auth = await authController.update({ id, username, password });
      }
      let user = {
        id,
        name,
      };
      await this.store.update(TABLE, user);
      resolve({ user, auth });
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
      await authController.removeAll();
      resolve(user);
    });
  }
  follow(from, to) {
    return new Promise(async (resolve, reject) => {
      if (!from || !to) {
        reject("Invalid data!");
        return false;
      }
      let follow = {
        user_from: from,
        user_to: to,
      };
      let response = await this.store.insert(`${TABLE}_follow`, follow);
      resolve(response);
    });
  }
};
