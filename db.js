const mysql = require('mysql2');

// Create and export the MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'jordan1234',
    database: 'nodeapiexample'
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err.message);
        process.exit(1); // Exit the application if there's a connection error
    }
    console.log('Connected to MySQL');
});

module.exports = db;
