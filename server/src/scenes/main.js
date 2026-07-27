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
    // const result = await ctx.replyWithPhoto(Input.fromURL("https://baraka-one.vercel.app/ref.png"));
    await ctx.replyWithPhoto("AgACAgQAAxkDAAN9amfpvclIejFE8rdLfPxHzp9IkfYAAqcNaxsHvERT84gxl7jJO-wBAAMCAAN3AAM9BA", { parse_mode: "HTML", caption: referralText + "\n\n" + `https://t.me/${bot.botInfo.username}?start=${ctx.chat.id}`, ...referral(ctx.chat.id) });
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