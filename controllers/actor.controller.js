const actorModel = require("../models/actor.model");
const resCode = require("../utils/response-codes");


// Create and Save a new Actor
exports.create = async (req, res) => {

    // Create a actorModel
    const actor = new actorModel({
        name: req.body.name,
        gender: req.body.gender
    });

    // Save Actor in the database
    await actor
        .save(actor)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(resCode.SomethingWrong).send({
                message:
                    err.message || "Some error occurred while creating the actor."
            });
        });
};

// Retrieve all Actor from the database.
// $lookup: {
//     from: 'actors',
//     localField: '_id',
//     foreignField: 'actors_id',
//     as: 'actors'
// }

exports.findAll = async (req, res) => {
    await actorModel.find()
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(resCode.SomethingWrong).send({
                message: err.message || "Some error occurred while getting all Actor."
            });
        });
};

// Find a single Actor with an id
exports.findOne = async (req, res) => {
    if (!req.params.id) {
        res.status(resCode.BadRequest).send({ message: "Please Provide id" });
        return;
    }
    actorModel.findById(req.params.id)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(resCode.SomethingWrong).send({
                message: err.message || "Some error occurred while getting Actor."
            });

        })
};

// Update a Actor by the id in the request
exports.update = (req, res) => {
    actorModel.findByIdAndUpdate(req.params.id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(resCode.BadRequest).send({
                    message: `Cannot update Actor with id=${req.params.id}. Maybe Actor was not found!`
                });
            } else res.send({ message: "Actor was updated successfully." });
        })
        .catch(err => {
            res.status(resCode.SomethingWrong).send({
                message: "Error updating Actor with id=" + id
            });
        });
};

// Delete a Actor with the specified id in the request
exports.delete = (req, res) => {
    actorModel.findByIdAndDelete(req.params.id)
        .then((data) => {
            if (!data) {
                res.status(resCode.BadRequest).send({
                    message: `Cannot Delete Actor with id=${req.params.id}. Maybe Actor was not found!`
                });
            } else res.send({ message: "Actor was Deleted successfully." });
        })
        .catch(err => {
            res.status(resCode.SomethingWrong).send({
                message: "Error Deleting Actor with id=" + req.params.id
            });
        });
};

// Delete all Actor from the database.
exports.deleteAll = (req, res) => {
    actorModel.deleteMany({})
        .then((data) => {
            res.status(resCode.OK).send({
                message: `${data.deletedCount} Actor were deleted successfully!`
            });
        })
        .catch(err => {
            res.status(resCode.SomethingWrong).send({
                message:
                    err.message || "Some error occurred while removing all Actor."
            });
        }); 9
};

exports.GetMoivesByActorId = async (req, res) => {
    await actorModel.aggregate([{
        $lookup: {
            from: "movie",
            localField: "_id",
            foreignField: "actors_id",
            as: "movies"
        }
    }])
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(resCode.SomethingWrong).send({
                message: err.message || "Some error occurred while getting details."
            });

        });
}