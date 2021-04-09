const express = require('express');
const {config} = require('../config');
const app=express();

const user =require('./components/user/network');
// ROUTES
app.use('/api/user',user)
app.listen(config.port,()=>{
    console.log(`Api conectada en: ${config.host}:${config.port}`);
})