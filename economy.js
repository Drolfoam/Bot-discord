const fs = require('fs');
const path = require('path');
const DATA_FILE = path.join(__dirname, 'economy.json');

function loadData() {
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, '{}');
    return {};
  }
  return JSON.parse(fs.readFileSync(DATA_FILE));
}
function saveData(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}
function getBalance(userId) {
  const data = loadData();
  return data[userId]?.balance || 0;
}
function addBalance(userId, amount) {
  const data = loadData();
  if (!data[userId]) data[userId] = { balance: 0 };
  data[userId].balance += amount;
  saveData(data);
  return data[userId].balance;
}
function hasPurchased(userId, itemKey) {
  const data = loadData();
  return data[userId]?.purchases?.includes(itemKey) || false;
}
function markPurchased(userId, itemKey) {
  const data = loadData();
  if (!data[userId]) data[userId] = { balance: 0, purchases: [] };
  if (!data[userId].purchases) data[userId].purchases = [];
  data[userId].purchases.push(itemKey);
  saveData(data);
}

module.exports = { getBalance, addBalance, hasPurchased
