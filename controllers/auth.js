const User = require("../models/user")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: "1d",
    })
}

module.exports = {
    signup_page: (req, res) => {
        res.render("auth/signup", {title: "Sign Up"})
    },

    signup: async (req, res) => {
        const {username, email, password} = req.body
        if (!username || !email || !password) throw new Error("All Fields are required.")
        try {
            const user_exists = await User.find({$or: [{username}, {email}]})
            if (user_exists) {
                throw new Error("Username or Email already exists.")
                
            } else {
                const user = await User.create({username, email, password})
                const token = createToken(user._id)
                res.cookie("hn_jwt", token, {
                    maxAge: 24 * 60 * 60 * 1000,
                    httpOnly: true
                })
                res.status(201).json({success: true, error: null})
            }
            
        } catch (err) {
            res.json({success: false, error: err.message})
        }
    },

    login_page: (req, res) => {
        res.render("auth/login", {title: "Log In"})
    },

    login: async (req, res) => {
        const {username, password} = req.body;
        if (!username || !password) throw new Error("All Fields are required.")

        try {
            const user = await User.findOne({username}).select("+password")
            if (user) {
                const auth = await bcrypt.compare(password, user.password)
                if (auth) {
                    const token = createToken(user._id)
                    res.cookie("hn_jwt", token, {
                        maxAge: 24 * 60 * 60 * 1000,
                        httpOnly: true
                    })
                    res.status(201).json({success: true, error: null})
                } else {
                    throw new Error("Invalid Username or Password.")
                }
            } else {
                throw new Error("Invalid Username or Password.")
            }
        } catch (err) {
            res.json({success: false, error: err.message})
        }
    },

    logout: (req, res) => {
        res.cookie("hn_jwt", "", {
            maxAge: 1,
            httpOnly: true
        })
        res.redirect("/")
    }
    
}