const mongoose = require("mongoose");

const ExrciseSchema = mongoose.Schema(
    {
        bodyPart: String,
        equipment: { type: String, text: true },
        gifUrl: String,
        id: Number,
        name: { type: String, text: true },
        target: { type: String, text: true }
    },
    { timestamps: true }
);

module.exports = mongoose.model("exrcise", ExrciseSchema);