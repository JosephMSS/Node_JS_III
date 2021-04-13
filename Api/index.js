const express = require('express');
const bodyParser = require("body-parser");
const {config} = require('../config');
const app=express();

app.use(bodyParser.json()); //Recordar incluir el parse antes de las rutas

const user =require('./components/user/network');
const auth =require('./components/auth/network');
// ROUTES
app.use('/api/user',user)
app.use('/api/auth',auth)
app.listen(config.port,()=>{
    console.log(`Api conectada en: ${config.host}:${config.port}`);
})