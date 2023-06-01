const userModel = require("../models/user.model");
const resCode = require("../utils/response-codes");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');


exports.login = async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(resCode.BadRequest).json({
            message: "Username or Password not present",
        })
    }

    try {
        const user = await userModel.findOne({ Email: email });
        if (!user) {
            res.status(resCode.BadRequest).json({
                message: "Login not successful",
                error: "User not found"
            });
            return;
        }
        else {
            bcrypt.compare(password, user.Password).then(function (result) {
                if (result) {
                    let jwtSecret = process.env.JWT_SECRET;
                    
                    const token = jwt.sign(
                        { id: user._id, email: user.Email },
                        jwtSecret
                    );
                    res.cookie("jwt", token, {
                        httpOnly: true
                    });
                    res.status(resCode.OK).json({
                        message: "Login successful",
                        user,
                    });
                } else {
                    res.status(resCode.BadRequest).json({ message: "Email Or Password Is Wrong!!!" })
                }
            })
        }
    } catch (err) {
        res.status(resCode.SomethingWrong).json({
            message: "An error occurred",
            error: err.message,
        })
    }
}