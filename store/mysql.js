const mysql = require("mysql");
const { config } = require("../config");
const dbConf = {
  host: config.dbHost,
  user: config.dbUser,
  password: config.dbPassword,
  database: config.dbName,
};
let connection;
function handleCon() {
  connection = mysql.createConnection(dbConf);
  connection.connect((err) => {
    if (err) {
      console.error("[DB ERROR]", err);
      setTimeout(() => {
        handleCon;
      }, 2000);
    } else {
      console.log("DB Connected!");
    }
    connection.on("error", (err) => {
      console.error("[DB ERROR]", err);
      if (err.code === "PROTOCOL_CONNECTION_LOST") {
        handleCon();
      } else {
        throw err;
      }
    });
  });
}
handleCon();
function list(table) {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM ${table}`, (err, data) => {
      if (err) {
        reject(err);
        return false;
      }
      resolve(data);
    });
  });
}
function list(table) {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM ${table}`, (err, data) => {
      if (err) {
        reject(err);
        return false;
      }
      resolve(data);
    });
  });
}
function get(table, id) {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM ${table} WHERE id=${id}`, (err, data) => {
      if (err) {
        reject(err);
        return false;
      }
      resolve(data);
    });
  });
}
function insert( table,data) {
    return new Promise((resolve, reject) => {
    connection.query(`INSERT INTO ${table} SET ?`,data, (err, result) => {
      if (err) {
        reject(err);
        return false;
      }
      resolve(result);
    });
  });
}
function update( table,data) {
    return new Promise((resolve, reject) => {
    connection.query(`UPDATE INTO ${table} SET ? WHERE id=?`,[data,data.id], (err, result) => {
      if (err) {
        reject(err);
        return false;
      }
      resolve(result);
    });
  });
}
function upsert(table,data) {
    if(data&&data.id){
        return update(table,data)
    }else{
        return insert(table,data); 
    }
}
function query(table,query) {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM ${table} WHERE id=?`,query, (err, result) => {
          if (err) {
            reject(err);
            return false;
          }
          resolve(result[0]||null);
        });
      });
}
module.exports = { list, get,upsert,query};
