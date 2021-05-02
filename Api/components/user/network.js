const express = require("express");

const secure = require("./secure");
const response = require("../../../network/response");
const { userController } = require("./index");
console.log(secure.checkOut);
const router = express.Router();
//Routes
router.get("/", getUsers);
router.get("/:id", getUser);
router.get("/:id/following", getFollowing);
router.post("/", insert);
router.patch("/", secure.checkOut("update"), update);
router.delete("/:id", remove);
router.delete("/all/users", removeAll);
router.post("/follow/:id",secure.checkOut("follow"),follow);

function getUsers(req, res, next) {
    userController.list().then((list)=>{
      response.success(req, res, list, 200);
    }).catch(next)
}
function getFollowing(req, res, next) {
    const {id}=req.params
    userController.getFollowing(id).then((list)=>{
      response.success(req, res, list, 200);
    }).catch(next)
}
async function getUser(req, res, next) {
  const { id } = req.params;
   userController.get(id).then(data=>{
     response.success(req, res, data, 200);
   }).catch(next);
  
}
async function insert(req, res, next) {
  const { id, name, username, password } = req.body;
  try {
    const data = await userController.insert({ id, name, username, password });
    response.success(req, res, data, 200);
  } catch (next) {}
}
async function update(req, res, next) {
  const { id, name, username, password } = req.body;
  try {
    const data = await userController.update({ id, name, username, password });
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
async function removeAll(req, res, next) {
  try {
    const data = await userController.removeAll();
    response.success(req, res, data, 200);
  } catch (next) {}
}
function follow(req,res,next) {
  const from =req.user.id
  const to =req.params.id
  userController.follow(from,to).then((data)=>{
    response.success(req, res, data, 200);
  }).catch(next);
}
module.exports = router;
