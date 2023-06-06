const { Mongoose } = require("mongoose");
const exrciseModel = require("../models/exrcise.model");
const resCode = require("../utils/response-codes");

exports.findAll = async (req, res) => {
    let body = req.body;
    let currentPage = body.currentPage ?? 1;
    let perPage = body.perPage ?? 10;
    let sortingObject = {
        ...(body.sort.bodyPart && { "bodyPart": body.sort.bodyPart }),
        ...(body.sort.equipment && { "equipment": body.sort.equipment }),
        ...(body.sort.id && { "id": body.sort.id }),
        ...(body.sort.name && { "name": body.sort.name }),
        ...(body.sort.target && { "target": body.sort.target })
    }

    exrciseModel.createIndexes({
        "name": "text",
        "target": "text",
        "equipment": "text"
    })

    let filterObj = {
        ...(body.filter.bodyPart.length > 0 && { "bodyPart": { $in: body.filter.bodyPart } }),
        ...(body.filter.target.length > 0 && { "target": { $in: body.filter.target } }),
        $text: { $search: body.q }
    };


    let total = await exrciseModel.find(filterObj).countDocuments();
    let totalPages = Math.ceil(total / perPage);

    await exrciseModel.find(filterObj).sort(sortingObject).limit(perPage).skip((currentPage - 1) * perPage)
        .then((data) => {
            res.send({
                currentPage, perPage, totalPages, total, data
            });
        })
        .catch((err) => {
            res.status(resCode.BadRequest).send(err);
        })
}