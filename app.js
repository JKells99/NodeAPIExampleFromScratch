const express = require('express');
const users = require('./routes/user');

const app = express();

app.use(express.json());

app.use('/users', users);

const PORT = process.env.PORT || 3000; // Corrected

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});