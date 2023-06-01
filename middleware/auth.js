const jwt = require("jsonwebtoken");

exports.authorize = async (req, res, next) => {
    let token = await req.cookies.jwt;
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
            if (!data) {
                return res.status(401).json({ message: "Not authorized" })
            } else {
                req.user = data;
                next();
            }
        })
    } else {
        return res
            .status(401)
            .json({ message: "Not authorized, token not available" })
    }
}