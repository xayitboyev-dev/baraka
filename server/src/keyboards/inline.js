const { Markup } = require("telegraf");
const bot = require("../core/bot");

exports.joinChannels = (channels) => Markup.inlineKeyboard([...channels.map((channel, index) => [Markup.button.url(`Kanalga o'tish ↗️`, "https://t.me/" + channel.replace("@", ""))]), [Markup.button.callback("Bajarildi ✅", "check_channels")]]).resize();

exports.referral = (userId) => Markup.inlineKeyboard([Markup.button.url(`Botga o'tish ↗️`, `https://t.me/${bot.botInfo.username}?start=${userId}`)]);