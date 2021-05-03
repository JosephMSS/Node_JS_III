const TABLE = "post";

module.exports = class PostController {
  constructor(store) {
    this.store = store || require("../../../store/dummy");
  }
  list() {
    return this.store.list(TABLE);
  }
  insert(id,text=''){
    const data={
      text:text,
      user:id
    }
    return this.store.insert(TABLE,data)
  }
  update(id_post,text=''){
    const data={
      text:text,
      id:id_post
    }
    return this.store.update(TABLE,data)
  }
  remove(id){
    return this.store.remove(TABLE,id)
  }
};
