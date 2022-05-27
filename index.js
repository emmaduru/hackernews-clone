require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const cookieParser = require("cookie-parser")
const helmet = require("helmet")
const hpp = require("hpp")

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(express.static("public"))
app.use(helmet())
app.disable('x-powered-by')
app.use(hpp())
app.set("view engine", "ejs")

mongoose.connect(process.env.DB_URL, (err) => {
    if(err) throw err;
    console.log("Connected to MongoDB.")
})

const {checkUser} = require("./middleware/auth")

app.use("*", checkUser)

app.get("/", (req, res) => {
    res.redirect("/news")
})
app.use("/auth", require("./routes/auth"))
app.use("/users", require("./routes/user"))
app.use("/news", require("./routes/news"))

const PORT = process.env.PORT || 5000;

app.listen(PORT, (err) => {
    if (err) throw err
    console.log(`Server running at port: ${PORT}.`)
})