const userModel = require("../models/user.model");
const resCode = require("../utils/response-codes");
const bcrypt = require("bcryptjs")


// Create and Save a new User
exports.create = async (req, res) => {
    bcrypt.hash(req.body.Password, 10).then(async (encpsw) => {
        console.log(encpsw);
        // if (!req.body.Name) {
        //     res.status(400).send({ message: "Content can not be empty!" });
        //     return;
        // }

        // Create a User
        const user = new userModel({
            Name: req.body.Name,
            Contact: req.body.Contact,
            Email: req.body.Email,
            Address: req.body.Address,
            Password: encpsw,
        });

        // Save User in the database
        await user
            .save(user)
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(resCode.SomethingWrong).send({
                    message:
                        err.message || "Some error occurred while creating the User."
                });
            });

    })
};

// Retrieve all Users from the database.
exports.findAll = (req, res) => {
    userModel.find()
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(resCode.SomethingWrong).send({
                message: err.message || "Some error occurred while getting all Users."
            });

        })
};

// Find a single User with an id
exports.findOne = async (req, res) => {
    if (!req.params.id) {
        res.status(resCode.BadRequest).send({ message: "Please Provide id" });
        return;
    }
    userModel.findById(req.params.id)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(resCode.SomethingWrong).send({
                message: err.message || "Some error occurred while getting all Users."
            });

        })
};

// Update a User by the id in the request
exports.update = (req, res) => {
    userModel.findByIdAndUpdate(req.params.id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(resCode.BadRequest).send({
                    message: `Cannot update User with id=${id}. Maybe User was not found!`
                });
            } else res.send({ message: "User was updated successfully." });
        })
        .catch(err => {
            res.status(resCode.SomethingWrong).send({
                message: "Error updating User with id=" + id
            });
        });
};

// Delete a User with the specified id in the request
exports.delete = (req, res) => {
    userModel.findByIdAndDelete(req.params.id)
        .then((data) => {
            console.log(data)
            if (!data) {
                res.status(resCode.BadRequest).send({
                    message: `Cannot Delete User with id=${req.params.id}. Maybe User was not found!`
                });
            } else res.send({ message: "User was Deleted successfully." });
        })
        .catch(err => {
            res.status(resCode.SomethingWrong).send({
                message: "Error Deleting User with id=" + req.params.id
            });
        });
};

// Delete all User from the database.
exports.deleteAll = (req, res) => {
    userModel.deleteMany({})
        .then((data) => {
            res.status(resCode.OK).send({
                message: `${data.deletedCount} Users were deleted successfully!`
            });
        })
        .catch(err => {
            res.status(resCode.SomethingWrong).send({
                message:
                    err.message || "Some error occurred while removing all users."
            });
        }); 9
};