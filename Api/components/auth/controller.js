const TABLE = "auth";
const auth = require('../../../auth/');
module.exports = class Auth {
  constructor(store) {
    this.store = store || require("../../../store/dummy");
  }
  async login({username, password }){
    try {
      const data=await this.store.query(TABLE,{username:username})
      if (data.password===password) {
        return auth.sing(data);
      }else{
        throw new Error('Invalid info!')
      }
   
    } catch (error) {
      return error
    }
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
      console.log("authdata",authData);
      await this.store.upsert(TABLE, authData);
      resolve(authData);
    });
  }
};
