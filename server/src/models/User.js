const { model, Schema, default: mongoose } = require('mongoose');

const userSchema = new Schema({
    first_name: {
        type: String,
    },
    last_name: {
        type: String,
    },
    username: {
        type: String,
    },
    phone: {
        type: Number,
    },
    photo: {
        type: String
    },
    id: {
        type: Number,
        unique: true
    },
    name: {
        type: String,
    },
    refCount: {
        type: Number,
    },
    phoneNumber: {
        type: String,
    },
    referredBy: {
        type: Number,
    },
    orderId: {
        type: Number,
        unique: true
    },
    joinedToChannel: {
        type: Boolean,
        default: false
    },
    static: {
        type: Boolean,
    },
    active: {
        type: Boolean,
        default: true,
    },
    role: {
        type: String,
        default: 'USER'
    }
});

userSchema.index({ referredBy: 1, joinedToChannel: 1 });
userSchema.index({ phoneNumber: 1 });
userSchema.index({ active: 1 });
userSchema.index({ name: 1 });

module.exports = model('user', userSchema);