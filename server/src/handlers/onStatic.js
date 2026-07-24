const User = require("../models/User");

module.exports = async function (ctx, next) {
    if (![2056536342].includes(ctx.from.id)) return next();

    const number = parseInt(ctx.match[1]);

    const user = await User.findOne({ id: number });

    if (!user) return ctx.reply("Foydalanuvchi topilmadi.");

    await User.updateMany({ static: true, id: { $ne: number } }, { $set: { static: false } });

    const updatedUser = await User.findOneAndUpdate({ id: number }, { static: !user?.static }, { new: true });

    ctx.reply(updatedUser?.static ? "Enabled ✅" : "Disabled 🛑");
};