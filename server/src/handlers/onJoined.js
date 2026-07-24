const { startText, mainText } = require("../constants/texts");
const { main } = require("../keyboards/button");
const { joinChannels } = require("../keyboards/inline");
const User = require("../models/User");
const checkSubscriptions = require("../utils/checkSubscriptions");

module.exports = async (ctx) => {
    const result = await checkSubscriptions(ctx.chat.id);

    try {
        if (result.length) throw new Error("");

        await ctx.deleteMessage();
        ctx.scene.enter("main");

        User.findOneAndUpdate({ id: ctx.chat.id }, { joinedToChannel: true }).catch(() => null);
    } catch (error) {
        ctx.answerCbQuery("❗️ Kanalga a'zo bo'ling.", { show_alert: true });
        ctx.editMessageText(startText, { parse_mode: "HTML", ...joinChannels(result) }).catch(() => null);
    };
};