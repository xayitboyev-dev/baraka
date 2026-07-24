const { startText } = require("../constants/texts");
const { joinChannels } = require("../keyboards/inline");
const checkSubscriptions = require("../utils/checkSubscriptions");

module.exports = async function checkSubscription(ctx, next) {
    const result = await checkSubscriptions(ctx.chat.id);

    if (result.length) {
        return ctx.replyWithHTML(startText, joinChannels(result));
    };

    next();
};