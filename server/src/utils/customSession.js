const sessions = new Map();

function customSession() {
    return async (ctx, next) => {
        if (!ctx.from) return next();

        const key = ctx.from.id;

        if (!sessions.has(key)) {
            sessions.set(key, {});
        }

        ctx.session = sessions.get(key);

        await next();
    };
}

module.exports = customSession;