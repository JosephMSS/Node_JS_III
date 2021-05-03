const TABLE = "auth";
const bcrypt = require('bcrypt');
const auth = require('../../../auth');
const{err}=require('../../../utils/error')


module.exports = class Auth {
  constructor(store) {
    this.store = store || require("../../../store/dummy");
  }
  async login({username, password }){
    try {
      const data=await this.store.query(TABLE,{username:username})
      const equals=await bcrypt.compare(password,data.password)
      console.log('EQUAlS',equals);
      if (equals) {
        return auth.sing(data);
      }else{
        throw err('Invalid info!')
      }
   
    } catch (error) {
      return error
    }
  }
  insert({ id, username, password }){
    return new Promise(async (resolve, reject) => {
      if (!id) {
         resolve('Invalid info!')
         return false
      }
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
      await this.store.insert(TABLE, authData);
      resolve(authData);
    });
  }
  update({ id, username, password }){
    return new Promise(async (resolve, reject) => {
      if (!id) {
         resolve('Invalid info!')
         return false
      }
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
      await this.store.update(TABLE, authData);
      resolve(authData);
    });
  }
  removeAll() {
    return new Promise(async (resolve, reject) => {
 
      let auth = await this.store.removeAll(TABLE);
      resolve(auth);
    });
  }
};
