const express = require("express");

const secure = require("./secure");
const response = require("../../../network/response");
const { userController } = require("./index");
console.log(secure.checkOut);
const router = express.Router();
//Routes
router.get("/", getUsers);
router.get("/:id", getUser);
router.post("/", upsert);
router.patch("/", secure.checkOut("update"), upsert);
router.delete("/:id", remove);

function getUsers(req, res, next) {
    userController.list().then((list)=>{
      response.success(req, res, list, 200);
    }).catch(next)
}
async function getUser(req, res, next) {
  const { id } = req.params;
  try {
    const data = await userController.get(id);
    response.success(req, res, data, 200);
  } catch (next) {}
}
async function upsert(req, res, next) {
  const { id, name, username, password } = req.body;
  try {
    const data = await userController.upsert({ id, name, username, password });
    response.success(req, res, data, 200);
  } catch (next) {}
}
async function remove(req, res, next) {
  const { id } = req.params;
  try {
    const data = await userController.remove(id);
    response.success(req, res, data, 200);
  } catch (next) {}
}
module.exports = router;
