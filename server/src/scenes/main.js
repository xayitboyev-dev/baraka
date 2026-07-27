const { Scenes: { BaseScene }, Input } = require("telegraf");
const { main } = require("../keyboards/button");
const { mainText, referralText } = require("../constants/texts");
const checkRegistration = require("../middlewares/checkRegistration");
const { referral } = require("../keyboards/inline");
const bot = require("../core/bot");
const User = require("../models/User");
const fs = require("fs");
const path = require("path");

// initializing the scene
const scene = new BaseScene("main");

// use handlers here
scene.enter(checkRegistration, (ctx) => {
    ctx.replyWithHTML(mainText, main);
});

scene.hears("🔗 Mening taklif havolam", async (ctx) => {
    try {
        const result = await ctx.replyWithPhoto(Input.fromLocalFile("/Users/macbookair/Desktop/baraka/server/src/assets/ref.png"));
        console.log(result);
    } catch (error) {
        console.log(error);
    }
    ctx.replyWithHTML("🔝 Tepadagi xabarni do'stlaringizga ulashing va sovrinlardan birini qo'lga kiriting!")
});

scene.hears("📊 Hisobot", async (ctx) => {
    let count = 0;

    const user = await User.findOne({ id: ctx.chat.id });
    if (user?.refCount) {
        count = user.refCount;
    } else {
        count = await User.countDocuments({ referredBy: ctx.chat.id, joinedToChannel: true });
    };

    ctx.replyWithHTML("🔗 Sizning taklif qilgan do'stlaringiz: " + count + " ta");
});

scene.on("message", (ctx) => {
    ctx.replyWithHTML(mainText, main);
});

module.exports = scene;