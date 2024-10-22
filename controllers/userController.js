const db = require('../db'); // Import the db connection
const bcrypt = require('bcrypt');
const saltRounds = 10;


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
    const { name, email,password } = req.body;

    const encryptedPassword = bcrypt.hashSync(password, saltRounds);

    const sql = 'INSERT INTO users (name, email,password) VALUES (?, ?, ?)';
    db.query(sql, [name, email,encryptedPassword], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'User created', id: result.insertId });
    });
}

exports.getUserById = (req, res) => {
    const {id } = req.params;
    const sql = 'SELECT * FROM users WHERE id = ?';
    db.query(sql, [id], (err, results) => {
        if(results.length === 0 || !results.length){
            return res.status(404).json({ error: 'User not found' });
        }
        if (err) return res.status(500).json({ error: err.message });
        res.json(results[0]);
    });

}


exports.deleteUser = (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM users WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'User deleted' });
    });
};

exports.login = (req, res) => {
    const { email, password } = req.body;
    const sql = 'SELECT * FROM users WHERE email = ?';
    db.query(sql, [email], (err, results) => {
        if (results.length === 0 || !results.length) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }
        const user = results[0];
        const isPasswordCorrect = bcrypt.compareSync(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }
        res.json({ message: 'Login successful' });
    });
}