//TODO LO DE REDIS
const redis = require("redis");
const { config } = require("../config");
const client = redis.createClient({
  host: config.redis.host,
  port: config.redis.port,
  password: config.redis.password,
});
function list(table) {
  return new Promise((resolve, reject) => {
    client.get(table, (err, data) => {
      if (err) {
        return reject(err);
      }
      let res = data || null;
      if (data) {
        res = JSON.parse(data);
      }
      resolve(res);
    });
  });
}
function get(table, id) {
    return list(`${table}_${id}`)
}
async function insert(table, data) {
  let key = table;
  if (data & data.id) {
    key = `${key}_${data.id}`;
  }
console.log('JMMS_key',key)
  client.setex(key, 30, JSON.stringify(data));
  return true;
}
module.exports = {
  list,
  insert,
  get,
};
