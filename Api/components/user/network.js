const express = require('express');
const router=express.Router();
const response = require('../../../network/respose');
const {userController}= require('./index')
router.get('/',async(req,res)=>{
    console.log(req.body);
    
    try {
        const data=await userController.list()
        response.success(req,res,data,200)
    } catch (error) {
        response.error(req,res,error.message,500)
    }
})
router.get('/:id',async(req,res)=>{
    const {id}=req.params
    try {
        const data=await userController.get(id)
        response.success(req,res,data,200)
    } catch (error) {
        response.error(req,res,error.message,500)
    }
})
router.post('/',async function(req,res){
    const {id,name}=req.body
    try {
        const data=await userController.upsert(id,name)
        response.success(req,res,data,200)
    } catch (error) {
        response.error(req,res,error.message,500)
    }
})
router.delete('/:id',async function(req,res){
    const {id}=req.params
    try {
        const data=await userController.remove(id)
        response.success(req,res,data,200)
    } catch (error) {
        response.error(req,res,error.message,500)
    }
})

module.exports=router