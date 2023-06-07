const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const roles = require("../models/role.model");

exports.permit = async (req, res, next, defaultPermissions) => {
    let token = await req.cookies.roles;
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, async (err, data) => {
            if (!data) {
                return res.status(401).json({ message: "You dont have any role provided." })
            } else {
                let userRoles = jwt.decode(token).roles;
                let permissions = await roles.aggregate([
                    { $match: { role: { $in: userRoles } } },
                    { $unwind: "$capabilities" },
                    { $lookup: { from: "capabilities", localField: "capabilities", foreignField: "_id", as: "capabilities" } },
                    { $unwind: "$capabilities" },
                    { $group: { _id: "$_id", permissons: { $push: "$capabilities" } } }
                ]);
                req.permissons = permissions[0].permissons.map((e) => e.capability);
                if (req.permissons.indexOf(defaultPermissions) != -1) {
                    next();
                } else {
                    res.status(401).json({ message: "You dont have permission." })
                }
            }
        })
    } else {
        return res
            .status(401)
            .json({ message: "Not authorized, token not available" })
    }
}