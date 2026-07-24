const { Telegraf } = require("telegraf");
const { commands } = require("../config/config.json");

// bot constructor
const bot = new Telegraf(process.env.BOT_TOKEN);

// bot.telegram.setMyCommands(commands);

module.exports = bot;