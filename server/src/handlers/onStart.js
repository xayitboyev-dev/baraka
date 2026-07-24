const bot = require("../core/bot");
const User = require("../models/User");

module.exports = async (ctx, next) => {
    next();

    let file;
    const result = await bot.telegram.getUserProfilePhotos(ctx.chat.id, 0, 1);
    const photo = result.total_count && result.photos[0][result.photos[0].length - 1];
    if (photo) {
        file = await bot.telegram.getFile(photo.file_id);
    };

    try {
        // create new user in the database
        const lastUser = await User.findOne().sort({ _id: -1 });
        const orderId = lastUser?.orderId + 1 || 1;
        // await User.create({ ...ctx.chat, orderId, photo: file?.file_path, ...(ctx.startPayload && parseInt(ctx.startPayload) && { referredBy: parseInt(ctx.startPayload) }), active: true });
        await User.create({ ...ctx.chat, orderId, photo: file?.file_path, active: true });
    } catch (error) {
        // update if the user already exists in the database
        await User.findOneAndUpdate({ id: ctx.chat.id }, { ...ctx.chat, photo: file?.file_path, active: true });
    };
};