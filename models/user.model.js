const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
    {
        Name: {
            type: String,
            required: true
        },
        Contact: Number,
        Email: {
            type: String,
            unique: [true, "Email is Already Exists"],
            required: true
        },
        Address: String,
        Password: {
            type: String,
            unique: true,
            required: true
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("user", UserSchema);