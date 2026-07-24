// configuration of dotenv
require("dotenv").config({ path: __dirname + "/config/.env" });

// connect to database
require("./utils/database")();

// require modules
const checkSubscribtion = require("./middlewares/checkSubscribtion");
const checkUser = require("./middlewares/checkUser");
const onBlocked = require("./handlers/onBlocked");
const onStart = require("./handlers/onStart");
const stage = require("./scenes/index");
const bot = require("./core/bot");
const onJoined = require("./handlers/onJoined");
const customSession = require("./utils/customSession");
const checkRegistration = require("./middlewares/checkRegistration");
const onStatic = require("./handlers/onStatic");

// use middlewares
bot.use(customSession());
bot.use(
    stage.use(checkUser)
        .start(onStart)
        .action("check_channels", onJoined)
        .on("my_chat_member", onBlocked)
        .use(checkSubscribtion)
        .use(checkRegistration)
        .hears("🔙 Bekor qilish", (ctx) => ctx.scene.enter("admin:main"))
        .command("admin", (ctx) => ctx.scene.enter("admin:main"))
        .hears(/^\/static_(\d+)$/, onStatic)
        .middleware()
);

// run bot
if (process.env.NODE_ENV === 'development') {
    bot.launch();
    console.log("Bot started...");
};

require("./server");

// handle unhandled rejections
process.on("unhandledRejection", (reason) => console.log("unhandledRejection:", reason));
process.on("uncaughtException", (reason) => console.log("uncaughtException:", reason));