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
});

// sacar el password de la respuesta y __V
userSchema.method('toJSON', function(){
    const {__v,password,...object} = this.toObject();

    return object
})



module.exports = model('User', userSchema);