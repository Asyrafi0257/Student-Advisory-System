import mysql from "mysql2/promise";

//create connection pool to database => reuse connection for each request(more efficient);
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
});

export default pool;