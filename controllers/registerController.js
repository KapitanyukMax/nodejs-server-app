const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');

const usersDB = {
    users: require('../model/users.json'),
    setUsers(data) {
        this.users = data;
    }
};

const handleNewUser = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ 'message': 'Username and password are required.' });
    }

    const duplicate = usersDB.users.find(user => user.username === username);
    if (duplicate) return res.sendStatus(409);

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = { 'username': username, 'password': hashedPassword };
        usersDB.setUsers([...usersDB.users, newUser]);
        await fs.promises.writeFile(
            path.join(__dirname, '..', 'model', 'users.json'),
            JSON.stringify(usersDB.users)
        );
        console.log(usersDB.users);
        res.status(201).json({ 'success': `New user ${username} created!` });
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
};

module.exports = { handleNewUser };
