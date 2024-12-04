const { Schema, model } = require("mongoose");

const user_schema = new Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    profilImage: {
        type: String,
        default: "/images/boy.png"
    },
    roll: {
        type: String,
        enum: ["USER", "ADMIN"],
        default: "USER"
    }
}, { timestamps: true })

const user = model("user", user_schema);

module.exports = user;