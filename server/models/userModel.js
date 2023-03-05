const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const userSchema = new Schema({
    username: {
        type: String,
        trim: true,
        required: true
    },
    password: {
        type: String,
        trim: true,
        required: true
    },
    birthday: {
        type: String,
        required: true
    },
    zipCode: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    createdAt: {type: Date}
});

// encrypt password

userSchema.pre("save", async function (next) {
    try {
        if(this.password) {
            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(this.password, salt);
            this.password = hashPassword;
            this.createdAt = Date.now();
        }
        next();
    } catch(err) {
        next(err);
    }
});

const User = mongoose.model("User", userSchema);
module.exports = User;