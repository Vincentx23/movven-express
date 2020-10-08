const mysql = require('mysql');


const pool = mysql.createPool({
    host: process.env.DBHOST, 
    user: process.env.DBUSER,
    password: process.env.DBPASSWORD,
    port: '20504',
    database: process.env.DATABASENAME,
    connectionLimit: 10
  });

   
    
module.exports = pool;


