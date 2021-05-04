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
app.listen(config.cache_service.port,()=>{
    console.info(`Servicio Cache conectado en: ${config.host}:${config.cache_service.port}`);
})