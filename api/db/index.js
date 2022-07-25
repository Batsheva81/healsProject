const pqp = require('pg-promise')()
const connectionString = "postgrestsql://postgres:shlomoena@localhost:5432/postgres";

const db = pqp(connectionString);

module.exports = db;