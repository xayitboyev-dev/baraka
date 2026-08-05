const { model, Schema } = require('mongoose');

const schema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        phone: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            match: [/^\+998\d{9}$/, 'Invalid Uzbekistan phone number'],
        },
    },
    {
        timestamps: true,
    }
);

module.exports = model('live_user', schema);