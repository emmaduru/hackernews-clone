const User = require("../models/user")
const jwt = require("jsonwebtoken")

const protect = async (req, res, next) => {
    const token = req.cookies.hn_jwt;
    if (token) {
        const decoded = jwt.verify(token, process.env.JWT_SECRET, {complete: true});
        const user = await User.findById(decoded.payload.id)
        if (user) {
            res.locals.user = user
            return next()
        }
    }
    res.locals.user = {username: ""}
    return res.redirect("/auth/login")
}

const checkUser = async (req, res, next) => {
    const token = req.cookies.hn_jwt;
    if (token) {
        const decoded = jwt.verify(token, process.env.JWT_SECRET, {complete: true});
        const user = await User.findById(decoded.payload.id)
        res.locals.user = user
    } else {
        res.locals.user = {username: ""}
    }
    return next()
}

module.exports = {protect, checkUser}