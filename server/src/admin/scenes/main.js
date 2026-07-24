const { Scenes: { BaseScene } } = require('telegraf');
const scene = new BaseScene('admin:main');
const { main } = require('../keyboards/button');
const auth = require("../middlewares/auth");
const User = require("../../models/User");

scene.enter(auth, (ctx) => {
    ctx.reply('🔝 Admin paneldasiz', main);
});

scene.hears("📤 Xabar tarqatish", (ctx) => {
    ctx.scene.enter('admin:sendMessage', { type: "all" });
});

scene.hears("👤 Userga xabar", (ctx) => {
    ctx.scene.enter('admin:sendTo');
});

scene.hears("📊 Statistika", async (ctx) => {
    const results = await Promise.all([User.count({ active: true }), User.count({ active: false })]);

    ctx.replyWithHTML(`📊 Statistika\n\nActive userlar: <b>${results[0]}</b>\nNonActive userlar: <b>${results[1]}</b>\nBarchasi: <b>${results[0] + results[1]}</b>`);
});

scene.hears("🏠 Client", (ctx) => ctx.scene.enter("main"));

module.exports = scene;