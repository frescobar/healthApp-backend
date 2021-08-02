const {
    Schema,
    model
} = require("mongoose");

const userSchema = Schema({
    nombre: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    img: {
        type: String,
    },
    role: {
        type: String,
        default: 'USER_ROLE'
    },
    google: {
        type: Boolean,
        default: false
    },
})

module.exports = model('User', userSchema);