const express = require("express");

const response = require("../../../network/response");
const secure = require("./secure");
const { postController } = require("./index");
const router = express.Router();
//Routes
router.get("/", getPosts);
// router.get("/:id", getUserPosts);
router.post("/", secure.checkOut("update"), insert);
router.patch("/", secure.checkOut("update"), update);
router.delete("/:id", secure.checkOut("update"), remove);
function getPosts(req, res, next) {
  postController
    .list()
    .then((list) => {
      response.success(req, res, list, 200);
    })
    .catch(next);
}
function getUserPosts(req, res, next) {
  const { id } = req.body;
  postController
    .getUserPosts(id)
    .then((list) => {
      response.success(req, res, list, 200);
    })
    .catch(next);
}
function insert(req, res, next) {
  const { id, text } = req.body;
  postController
    .insert(id, text)
    .then((data) => {
      response.success(req, res, data, 200);
    })
    .catch(next);
}
function update(req, res, next) {
  const { text, id_post } = req.body;
  postController
    .update(id_post, text)
    .then((data) => {
      response.success(req, res, data, 200);
    })
    .catch(next);
}
function remove(req, res, next) {
  const { id } = req.params;
  postController
    .remove(id)
    .then((data) => {
      response.success(req, res, data, 200);
    })
    .catch(next);
}
module.exports = router;
