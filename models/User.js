const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        email:{
            type: String,
            required: [true, "Please provide a valid email address"],
            unique: true,
        },

        password: {
            type: String,
            required: [true, "Please provide a valid password"],
        },

        username: {
            type: String,
            required: true,
            unique: true,
        },
        avatar: {
            type: String,
            default: "https://i.imgur.com/VfBLBKRs.png"
        }
    }
)