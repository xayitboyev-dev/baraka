const { channels } = require("../config/config.json");
const bot = require("../core/bot");

async function checkOne(chatId, userId) {
    try {
        const result = await bot.telegram.getChatMember(chatId, userId);
        return ['member', 'administrator', 'creator'].includes(result.status);
    } catch (error) {
        return true;
    };
};

module.exports = async function checkSubscriptions(userId) {
    const notJoinedChannels = [];

    for (const channel of channels) {
        const isMember = await checkOne(channel.id, userId);
        if (!isMember) notJoinedChannels.push(channel.username);
    };

    return notJoinedChannels;
};