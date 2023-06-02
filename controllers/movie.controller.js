const { default: mongoose } = require("mongoose");
const movieModel = require("../models/movie.model");
const movieActor = require("../models/movieActor.model");
const resCode = require("../utils/response-codes");


// Create and Save a new User
exports.create = async (req, res) => {

    // Create a Movie
    const movie = new movieModel({
        name: req.body.name,
        release_date: req.body.release_date
    });

    // Save Movie in the database
    await movie
        .save(movie)
        .then(data => {
            movieActor.insertMany(Array.from(req.body.actors_id).map((e) => {
                return new movieActor({
                    movie_id: data._id,
                    actors_id: new mongoose.Types.ObjectId(e)
                })
            })).then((data2) => {
                res.send({ movie: data, movieActor: data2 });
            })
        })
        .catch(err => {
            res.status(resCode.SomethingWrong).send({
                message:
                    err.message || "Some error occurred while creating the movie."
            });
        });
};

// Retrieve all Movies from the database.
// $lookup: {
//     from: 'actors',
//     localField: '_id',
//     foreignField: 'actors_id',
//     as: 'actors'
// }

exports.findAll = async (req, res) => {
    await movieModel.find()
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(resCode.SomethingWrong).send({
                message: err.message || "Some error occurred while getting all Movies."
            });
        });
};

// Find a single Movie with an id
exports.findOne = async (req, res) => {
    if (!req.params.id) {
        res.status(resCode.BadRequest).send({ message: "Please Provide id" });
        return;
    }
    movieModel.findById(req.params.id).populate('actors_id')
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(resCode.SomethingWrong).send({
                message: err.message || "Some error occurred while getting Movie."
            });

        })
};

// Update a Movie by the id in the request
exports.update = (req, res) => {
    movieModel.findByIdAndUpdate(req.params.id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(resCode.BadRequest).send({
                    message: `Cannot update Movie with id=${req.params.id}. Maybe Movie was not found!`
                });
            } else res.send({ message: "Movie was updated successfully." });
        })
        .catch(err => {
            res.status(resCode.SomethingWrong).send({
                message: "Error updating Movie with id=" + id
            });
        });
};

// Delete a Movie with the specified id in the request
exports.delete = (req, res) => {
    movieModel.findByIdAndDelete(req.params.id)
        .then((data) => {
            if (!data) {
                res.status(resCode.BadRequest).send({
                    message: `Cannot Delete Movie with id=${req.params.id}. Maybe Movie was not found!`
                });
            } else res.send({ message: "Movie was Deleted successfully." });
        })
        .catch(err => {
            res.status(resCode.SomethingWrong).send({
                message: "Error Deleting Movie with id=" + req.params.id
            });
        });
};

// Delete all Movie from the database.
exports.deleteAll = (req, res) => {
    movieModel.deleteMany({})
        .then((data) => {
            res.status(resCode.OK).send({
                message: `${data.deletedCount} Movies were deleted successfully!`
            });
        })
        .catch(err => {
            res.status(resCode.SomethingWrong).send({
                message:
                    err.message || "Some error occurred while removing all Movies."
            });
        });
};