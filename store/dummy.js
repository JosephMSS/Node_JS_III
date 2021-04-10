let db = {
  user: [
    { id: "1", name: "Joseph Morales" },
    { id: "2", name: "Mariliz Montoya" },
  ],
};

async function list(table) {
  return db[table];
}
async function get(table, id) {
  const tab = await list(table);
  return tab.filter((item) => item.id === id)[0] || null;
}
async function upsert(table, data) {
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
};
