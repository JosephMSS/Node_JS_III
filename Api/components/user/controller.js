const TABLE = "user";
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
  upsert(id, name) {
    return new Promise(async (resolve, reject) => {
      if (!id || !name) {
        reject("Invalid data!");
        return false;
      }
      let data = {
        id,
        name,
      };
      let user = await this.store.upsert(TABLE, data);
      resolve(user);
    });
}
remove(id){
    return new Promise(async(resolve, reject) => {
        if(!id){
            reject("Invalid data!");
            return false;
        }
        let user = await this.store.remove(TABLE, id);
        resolve(user);
    })
}
};
