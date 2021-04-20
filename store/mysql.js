const mysql = require('mysql');
const {config} = require('../config')
const dbConf={
    host:config.dbHost,
    user:config.dbUser,
    password:config.dbPassword,
    database:config.dbName,
}
let connection;
function handleCon() {
    connection=mysql.createConnection(dbConf)
    connection.connect((err)=>{
        if (err) {
            console.error('[DB ERROR]',err);
            setTimeout(() => {
                handleCon
            }, 2000);
        }else{
            console.log('DB Connected!');
        }
        connection.on('error',err=>{
        console.error('[DB ERROR]',err);
            if (err.code==='PROTOCOL_CONNECTION_LOST') {
                handleCon()
            }else{
                throw err
            }
        })
    })
}
handleCon();
function list(table) {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM ${table}`,(err,data)=>{
            if (err){
                reject(err)
                return false; 
            } 
            resolve(data)
        })
    })
    
}
function list(table) {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM ${table}`,(err,data)=>{
            if (err){
                reject(err)
                return false; 
            } 
            resolve(data)
        })
    })
    
}
module.exports={list}