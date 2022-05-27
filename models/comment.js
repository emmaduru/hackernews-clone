const mongoose = require("mongoose")
const {DateTime} = require("luxon")

const commentSchema = mongoose.Schema({
    body: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    news: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "News"
    },
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ]
}, {
    timestamps: true
})

commentSchema.virtual("date_created").get(function() {
    return DateTime.fromJSDate(this.createdAt).toLocaleString(DateTime.DATETIME_FULL)
})

module.exports = mongoose.model("Comment", commentSchema)