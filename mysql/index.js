const express = require('express');
const bodyParser = require('body-parser');
const {config} = require('../config');
const {errors} = require('../network/errors'); 
const app=express();
const network=require('./network');
app.use(express.json())

//routes
app.use('/',network)

// app.use(errors)
app.listen(config.mysql_service.port,()=>{
    console.info(`Servicio Mysql conectado en: ${config.host}:${config.mysql_service.port}`);
})