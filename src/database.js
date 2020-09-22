const mysql = require('mysql');


const pool = mysql.createPool({
    host: process.env.DBHOST, 
    user: process.env.DBUSER,
    password: process.env.DBPASSWORD,
    port: '3306',
    database: process.env.DATABASENAME,
    connectionLimit: 10
  });

   
    
module.exports = pool;


