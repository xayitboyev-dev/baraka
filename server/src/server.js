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


app.get("/live_users", async (req, res) => {
    const result = await LiveUser.find().sort({ createdAt: -1 });

    res.json(result);
});

app.post("/live_users", async (req, res) => {
    let { name, phone } = req.body;

    phone = '+998' + phone.replaceAll(" ", "");

    if (!name || !phone) {
        return res.status(400).json({ message: "Ism va telefon raqam talab qilinadi" });
    };

    try {
        const user = await LiveUser.create({ name, phone });

        res.json({ message: "Ma'lumotlaringiz qo'shildi", user });
    } catch (error) {
        return res.status(400).json({ message: error.code === 11000 ? "Bu raqam allaqachon ro'yxatdan o'tgan" : "Noto'g'ri telefon raqam" });
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