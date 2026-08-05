const express = require('express');
const bot = require('./core/bot');
const User = require('./models/User');
const LiveUser = require('./models/LiveUser');
const getUsers = require("./services/getUsers");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("Set webhook to /updates");
});

app.get("/users", async (req, res) => {
    const result = await getUsers(req.query.min, req.query.max, req.query.search);

    res.json(result);
});

app.get("/users/random", async (req, res) => {
    const result = await getUsers(req.query.min, req.query.max, req.query.search);

    const staticUser = result.find(user => user.static);
    const randomUser = result[Math.floor(Math.random() * result.length)];
    const user = staticUser || randomUser;

    delete user.static;

    return res.json(user);
});

app.post("/live_users", async (req, res) => {
    const { name, phoneNumber } = req.body;

    if (!name || !phoneNumber) {
        return res.status(400).json({ error: "Ism va telefon raqam talab qilinadi" });
    };

    try {
        const user = await LiveUser.create({ name, phoneNumber });

        res.json({ message: "Ma'lumotlaringiz qo'shildi", user });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ error: "Bu raqam allaqachon ro'yxatdan o'tgan" });
        };
    };
});

app.get("/stats", async (req, res) => {
    const [registeredUsers, activeUsers, nonActiveUsers] = await Promise.all([User.countDocuments({ name: { $exists: true }, phoneNumber: { $exists: true } }), User.countDocuments({ active: true }), User.countDocuments({ active: false })]);

    res.json({ registeredUsers, activeUsers, nonActiveUsers, total: activeUsers + nonActiveUsers });
});

if (process.env.NODE_ENV === "production") {
    app.post("/updates", (req, res) => {
        bot.handleUpdate(req.body);
        res.send({ ok: true });
    });
};

app.listen(normalizePort(process.env.PORT || 3000), () => {
    console.log("Server listening on port " + process.env.PORT)
});

// port normalizer function
function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    };

    if (port >= 0) {
        // port number
        return port;
    };

    return false;
};