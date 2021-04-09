const express = require('express');
const router=express.Router();
const response = require('../../../network/respose');
router.get('/',(req,res)=>{
    response.success(req,res,'Siuuu',200)
})

module.exports=router