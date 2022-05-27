const mongoose = require("mongoose")
const {isEmail} = require("validator")
const {DateTime} = require("luxon")
const bcrypt = require("bcrypt")

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: "Username is required.",
        unique: true,
        minLength:[3, "Username have at least 3 characters."]
    },
    email: {
        type: String,
        required: "Email is required.",
        unique: true,
        validate: [isEmail, "Email entered is invalid."],
        select: false
    },
    password: {
        type: String,
        required: "Password is required",
        minLength:[6, "Password should have at least 6 characters."],
        select: false
    }
}, {
    timestamps: true
})

userSchema.virtual("date_created").get(function() {
    return DateTime.fromJSDate(this.createdAt).toLocaleString(DateTime.DATETIME_FULL)
})

userSchema.pre("save", async function() {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

module.exports = mongoose.model("User", userSchema)