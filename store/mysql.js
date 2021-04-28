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
    connection.query(`SELECT * FROM ${table} WHERE id='${id}'`, (err, data) => {
      if (err) {
        reject(err);
        return false;
      }
      resolve(data);
    });
  });
}
function insert(table, data) {
  return new Promise((resolve, reject) => {
    connection.query(`INSERT INTO ${table} SET ?`, data, (err, result) => {
      if (err) {
        reject(err);
        return false;
      }
      resolve(result);
    });
  });
}
function update(table, data) {
  return new Promise((resolve, reject) => {
    connection.query(
      `UPDATE ${table} SET ? WHERE id=?`,
      [data, data.id],
      (err, result) => {
        if (err) {
          reject(err);
          return false;
        }
        resolve(result);
      }
    );
  });
}
async function upsert(table, data) {
  console.log("JMMS_table", table);
  console.log("JMMS_data", data);
  let isNew = await exist(table, data);
  console.log("JMMS_isNew", isNew);
  if (isNew) {
    console.log("JMMS_insert", table);
    return insert(table, data);
  } else {
    console.log("JMMS_update", table);
    return update(table, data);
  }
}
function query(table, query, join) {
  let joinQuery = "";
  if (join) {
    console.log('JMMS_join',join)

  const key=Object.keys(join)[0];
  console.log('JMMS_key',key)
  const val=join[key];
  console.log('JMMS_val',val)
  joinQuery=`JOIN ${key} ON ${table}.${val} =${key}.id`
  console.log('JMMS_joinQuery',joinQuery)
  }
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT * FROM ${table} ${joinQuery} WHERE ${table}.?`,
      query,
      (err, result) => {
        if (err) {
          reject(err);
          return false;
        }
        resolve(result[0] || null);
      }
    );
  });
}
function removeAll(table) {
  return new Promise((resolve, reject) => {
    connection.query(`DELETE FROM ${table}`, (err, result) => {
      if (err) {
        reject(err);
        return false;
      }
      resolve(result[0] || null);
    });
  });
}
function exist(table, data) {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT count(*) FROM ${table} WHERE id=?`,
      data.id,
      (err, result) => {
        if (err) {
          reject(err);
          return false;
        }
        let found = result[0];
        resolve(found["count(*)"] ? false : true);
      }
    );
  });
}
module.exports = { list, get, insert, update, query, removeAll };
