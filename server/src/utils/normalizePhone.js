module.exports = function normalizePhone(input) {
    if (!input) return null;

    let phone = input.replace(/[^\d+]/g, "");

    // Convert 998901234567 or 901234567 → +998901234567
    if (!phone.startsWith("+")) {
        if (phone.length === 12 && phone.startsWith("998")) {
            phone = "+" + phone;
        } else if (phone.length === 9) {
            phone = "+998" + phone;
        }
    }

    // Final validation (+998XXXXXXXXX)
    if (!/^\+998\d{9}$/.test(phone)) return null;

    return phone;
};