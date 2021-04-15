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
router.patch("/",secure.checkOut('update'),upsert);
router.delete("/:id", remove);

async function getUsers(req, res) {
  console.log(req.body);

  try {
    const data = await userController.list();
    response.success(req, res, data, 200);
  } catch (error) {
    response.error(req, res, error.message, 500);
  }
}
async function getUser(req, res) {
  const { id } = req.params;
  try {
    const data = await userController.get(id);
    response.success(req, res, data, 200);
  } catch (error) {
    response.error(req, res, error.message, 500);
  }
}
async function upsert(req, res) {
  const { id, name, username, password } = req.body;
  try {
    const data = await userController.upsert({ id, name, username, password });
    response.success(req, res, data, 200);
  } catch (error) {
    response.error(req, res, error.message, 500);
  }
}
async function remove(req, res) {
  const { id } = req.params;
  try {
    const data = await userController.remove(id);
    response.success(req, res, data, 200);
  } catch (error) {
    response.error(req, res, error.message, 500);
  }
}
module.exports = router;
