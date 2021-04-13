let db = {
  user: [
    { id: "1", name: "Joseph Morales" },
    { id: "2", name: "Mariliz Montoya" },
  ],
};
async function list(table) {
  return db[table]||[];
}
async function query(table,q) {
  let tab=await list(table);
  console.log('Dummy table entity',tab);
  let keys=Object.keys(q);
  let key=keys[0];
  return tab.filter(item=>item[key]===q[key])[0];
}
async function get(table, id) {
  const tab = await list(table);
  return tab.filter((item) => item.id === id)[0] || null;
}
async function upsert(table, data) {
  if (!db[table]) {
    db[table]=[];
  }
  return await db[table].push(data);
}
async function remove(table, id) {
  const index = db[table].findIndex((item) => item.id === id);
  if (index >= 0) {
    db[table].splice(index, 1);
  }
  return true;
}
module.exports = {
  list,
  get,
  upsert,
  remove,
  query,
};
