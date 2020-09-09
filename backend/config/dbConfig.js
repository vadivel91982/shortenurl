const config = require("config");
const db = require("./config.json");
const ENVMODE = config.get("ENVMODE");
const host = db[ENVMODE]["host"];
const user = db[ENVMODE]["username"];
const password = db[ENVMODE]["password"];
const database = db[ENVMODE]["database"];
const encrypt = db[ENVMODE]["encrypt"];

module.exports = {
  host: host,
  user: user,
  password: password,
  database: database,
  port: 3306,
  connectionTimeout: 300000,
  requestTimeout: 300000,
  options: {
    encrypt: true
  }
};
