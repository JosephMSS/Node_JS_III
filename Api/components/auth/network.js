const express = require("express");
const response = require("../../../network/response");
const { authController } = require("./index");
const router = express.Router();

router.post("/login", async (req, res, next) => {
  const { username, password } = req.body;
  authController
    .login({ username, password })
    .then((token) => {
      response.success(req, res, token, 200);
    })
    .catch((e) => {
      response.error(req, res, "Informacion invalida", 400);
    });
});
module.exports = router;
