const express = require('express');
const router=express.Router();
const response = require('../../../network/respose');
const controller= require('../user/controller')
router.get('/',(req,res)=>{
    response.success(req,res,controller.list(),200)
})

module.exports=router