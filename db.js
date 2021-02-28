const Pool = require("pg").Pool;

const pool = new Pool({
  host: "localhost",
  port: 5432,
  user: "brandonlau",
  database: "pern_todo",
});

module.exports = pool;
