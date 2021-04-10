const express = require("express");
const response = require("../../../network/respose");

const { userController } = require("./index");

const router = express.Router();
//Routes
router.get("/", getUsers);
router.get("/:id", getUser);
router.post("/", upsert);
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
  const { id, name } = req.body;
  try {
    const data = await userController.upsert(id, name);
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
