const bcrypt = require('bcrypt');

const usersDB = {
    users: require('../model/users.json'),
    setUsers(data) {
        this.data = data;
    }
};

const handleLogin = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ 'message': 'Username and password are required.' });
    }

    const user = usersDB.users.find(user => user.username === username);
    if (!user) return res.sendStatus(401);

    const match = await bcrypt.compare(password, user.password);

    if (match) {
        res.json({ 'success': `User ${username} is logged in!` });
    } else {
        res.sendStatus(401);
    }
}

module.exports = { handleLogin };
