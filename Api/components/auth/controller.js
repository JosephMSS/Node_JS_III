const TABLE = "auth";
module.exports = class Auth {
  constructor(store) {
    this.store = store || require("../../../store/dummy");
  }
  upsert({ id, username, password }){
    return new Promise(async (resolve, reject) => {
      const authData = {
        id,
      };
      if (username) {
        authData.username=username
      }
      if (password) {
        authData.password=password
      }
      await this.store.upsert(TABLE, authData);
      resolve(authData);
    });
  }
};
