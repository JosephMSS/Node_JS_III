const express = require('express');
const {config} = require('../config');
const {errors} = require('../network/errors');
const app=express();

app.use(express.json()); //Recordar incluir el parse antes de las rutas

const post =require('./components/post/network');
// ROUTES
app.use('/api/post',post)
app.use(errors)
app.listen(config.post_service.port,()=>{
    console.log(`Servicio Post escuchando  en: ${config.post_service.host}:${config.post_service.port}`);
})