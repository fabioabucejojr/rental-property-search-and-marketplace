const Pool = require("pg").Pool

const pool = new Pool({
    user: "postgres",
    password: "8}Ry^4D^q#*5gH(L",
    host: "localhost",
    port: 5432,
    database: "kmshradb"
});

module.exports = pool;