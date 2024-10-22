const db = require('../db'); // Import the db connection

// Get all users
exports.getAllUsers = (req, res) => {
    const sql = 'SELECT * FROM users';
    db.query(sql, (err, results) => {
        if(results.length === 0 || !results.length){
            return res.status(200).json({ error: 'No users found' });

        }
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

exports.createUser = (req, res) => {
    const { name, email } = req.body;
    const sql = 'INSERT INTO users (name, email) VALUES (?, ?)';
    db.query(sql, [name, email], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'User created', id: result.insertId });
    });
}