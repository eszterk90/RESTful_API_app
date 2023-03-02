const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const userSchema = new Schema({
    username: {
        type: String,
        trim: true
    },
    password: {
        type: String,
        trim: true
    },
    birthday: {
        type: String
    },
    zipCode: {
        type: String
    },
    phoneNumber: {
        type: String
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