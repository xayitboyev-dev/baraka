const User = require("../models/User");

module.exports = async function checkSubscription(ctx, next) {
    // if(ctx.scene.currentScene)
    if (ctx.scene.current.id == "registration") return next();

    const isUserExists = await User.findOne({
        id: ctx.chat.id,
        name: { $ne: null },
        phoneNumber: { $ne: null }
    });

    if (!isUserExists) {
        return ctx.scene.enter("registration");
    };

    next();
};