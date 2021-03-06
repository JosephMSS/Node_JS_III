const express = require("express");

const response = require("../network/response");
const Store = require("../store/mysql");
const router = express.Router();
//Routes
router.get("/:table", list);
router.get("/:table/:id", get);
router.post("/:table", insert);
router.patch("/:table", update);
router.post('/:table/query', query);
async function list(req, res, next) {
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
  const data = await Store.insert(table, req.body);
  response.success(req, res, data, 200);
}
async function update(req, res, next) {
  const { table } = req.params;
  const data = await Store.update(table, req.body);
  response.success(req, res, data, 200);
}
async function query(req, res, next) {
  const data = await Store.query(req.params.table, req.body.query, req.body.join)
  response.success(req, res, data, 200);
}
module.exports=router

