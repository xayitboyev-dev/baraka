const normalizePhone = require("../utils/normalizePhone");
const { Scenes, Markup } = require("telegraf");
const User = require("../models/User");

module.exports = new Scenes.WizardScene(
    "registration",

    // STEP 1 — Ask name
    async (ctx) => {
        ctx.reply("👤 Ismingizni kiriting:", Markup.removeKeyboard());
        return ctx.wizard.next();
    },

    // STEP 2 — Save name, ask phone
    async (ctx) => {
        const name = ctx.message?.text;

        if (!name || name.length < 2) {
            ctx.reply("❌ Iltimos, to‘g‘ri ism kiriting:");
            return;
        };

        ctx.wizard.state.name = name;

        ctx.reply("📞 Telefon raqamingizni yuboring:", Markup.keyboard([
            Markup.button.contactRequest("📲 Raqamni yuborish"),
        ]).oneTime().resize());

        return ctx.wizard.next();
    },

    // STEP 3 — Save phone, finish
    async (ctx) => {
        let phoneNumber = null;

        // 1️⃣ Contact button
        if (ctx.message?.contact?.phone_number) {
            phoneNumber = normalizePhone(ctx.message.contact.phone_number);
        };

        // 2️⃣ Text input fallback
        if (!phoneNumber && ctx.message?.text) {
            phoneNumber = normalizePhone(ctx.message.text);
        };

        if (!phoneNumber) {
            await ctx.reply(
                "❌ Telefon raqam noto‘g‘ri.\n" +
                "📌 Namuna: 901234567 yoki tugma orqali yuboring."
            );
            return;
        };

        const telegramId = ctx.chat.id;

        await User.updateOne(
            { id: telegramId },
            {
                $set: {
                    name: ctx.wizard.state.name,
                    phoneNumber,
                },
            },
            { upsert: true }
        );

        await ctx.reply(
            "✅ Ro‘yxatdan muvaffaqiyatli o‘tdingiz!",
            Markup.removeKeyboard()
        );

        return ctx.scene.enter("main");
    }
);