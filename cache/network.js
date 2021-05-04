const express = require("express");

const response = require("../network/response");
const Store = require("../store/redis");
const router = express.Router();
//Routes
router.get("/:table", list);
router.get("/:table/:id", get);
router.post("/:table", insert);
async function list(req, res, next) {
  console.log('listar');
  const { table } = req.params;
  const data = await Store.list(table);
  response.success(req, res, data, 200);
}
async function get(req, res, next) {
  const { table, id } = req.params;
  const data = await Store.get(table, id);
  response.success(req, res, data, 200);
}
async function insert(req, res, next) {
  const { table } = req.params;
  console.log('req.body :>> ', req.body);
  const data = await Store.insert(table, req.body);
  response.success(req, res, data, 200);
}
async function update(req, res, next) {
  const { table } = req.params;
  const data = await Store.update(table, req.body);
  response.success(req, res, data, 200);
}
module.exports=router

