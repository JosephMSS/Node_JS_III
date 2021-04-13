const express = require("express");
const response = require("../../../network/respose");
const { authController } = require("./index");
const router = express.Router();

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const token = await authController.login({ username, password });
    response.success(req,res,token,200);
  } catch (error) {
    response.success(req,res,error.message);

  }
});
module.exports = router;