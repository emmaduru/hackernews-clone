const mongoose = require("mongoose")
const slugify = require("slugify")
const {DateTime} = require("luxon")

const newsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: "News Title is required.",
    },
    slug: {
        type: String,
        unique: true
    },
    url: {
        type: String,
        required: "News URL is required."
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    description: {
        type: String,
    }
}, {
    timestamps: true
})

newsSchema.virtual("date_created").get(function() {
    return DateTime.fromJSDate(this.createdAt).toLocaleString(DateTime.DATETIME_FULL)
})

newsSchema.pre("save", function() {
    this.slug = slugify(this.title, {
        replacement: "-",
        remove: /[*+~.()'"!:@]/g,
        trim: true
    })
    this.slug += "-" + String(new Date().getTime())
})

module.exports = mongoose.model("News", newsSchema)