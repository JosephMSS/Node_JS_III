const PostController = require("./controller");
const store = require("../../../store/mysql");
// const store = require("../../../store/remote-mysql");

const postController = new PostController(store);
module.exports = { postController };
