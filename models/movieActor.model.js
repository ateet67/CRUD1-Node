const mongoose = require("mongoose");

const MovieActorSchema = mongoose.Schema(
    {
        movie_id: { type: mongoose.Types.ObjectId, ref: 'movie' },
        actors_id: { type: mongoose.Types.ObjectId, ref: 'actor' }
    },
    { timestamps: true }
);

module.exports = mongoose.model("movieActor", MovieActorSchema);
