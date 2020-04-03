const mysql = require('mysql');

// Set database connection credentials
const config = {
    host: 'localhost',
    user: 'juanma',
    password: 'juanma1234',
    database: 'nomutem',
};


// Create a MySQL pool
const pool = mysql.createPool(config);

// Export the pool
module.exports = pool;