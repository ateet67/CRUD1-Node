const mongoose = require("mongoose");

const ActorSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            message: "name is required."
        },
        gender: {
            type: String,
            enum: ["Female", "Male", "Others"],
            required: true,
            message: "{VALUE} is not supported",
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("actor", ActorSchema);