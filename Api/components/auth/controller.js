const TABLE = "auth";
const bcrypt = require('bcrypt');
const auth = require('../../../auth/');

module.exports = class Auth {
  constructor(store) {
    this.store = store || require("../../../store/dummy");
  }
  async login({username, password }){
    try {
      const data=await this.store.query(TABLE,{username:username})
      const equals=await bcrypt.compare(password,data.password)
      if (equals) {
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
        authData.password=await bcrypt.hash(password,5)
      }
      console.log("authdata",authData);
      await this.store.upsert(TABLE, authData);
      resolve(authData);
    });
  }
};
