const express = require("express");
const response = require("../../../network/response");
const { authController } = require("./index");
const router = express.Router();

router.post("/login", async (req, res,next) => {
  const { username, password } = req.body;
  try {
    const token = await authController.login({ username, password });
    response.success(req,res,token,200);
  } catch (next){};
});
module.exports = router;
