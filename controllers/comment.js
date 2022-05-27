const Comment = require("../models/comment")
const News = require("../models/news")

module.exports = {
    comment_create: async (req, res) => {
        const {slug} = req.params;
        const {body} = req.body;

        try {
            if (!body) throw new Error("Comment body is required")
            const news = await News.findOne({slug})
            const comment = await Comment.create({body, author: res.locals.user._id, news: news._id})
            res.json({success: true, error: null})
        } catch(err) {
            res.json({success: false, error: err.message})
        }
    },

    comment_delete: async (req, res) => {
        const {id} = req.params;

        try {
            await Comment.findOneAndDelete({id, author: res.locals.user});
            res.json({success: true, error: null})
        } catch(err) {
            res.json({success: false, error: err.message})
        }
    },

    comment_like: async (req, res) => {
        const {id} = req.params;
        try {
            let comment = await Comment.findById(id)
            if (comment.likes.includes(res.locals.user._id)) {
                comment = await Comment.findByIdAndUpdate(id, { $pull: {likes: res.locals.user._id} },
                    { new: true, useFindAndModify: false })
            } else {
                comment = await Comment.findByIdAndUpdate(id, { $push: {likes: res.locals.user._id} },
                    { new: true, useFindAndModify: false })
            }
            res.json({success: true, error: null, likes: comment.likes.length})
        } catch (err) {
            res.json({success: false})
        }
    },

    comment_list: async(req, res) => {
        try {
            const comments = await Comment.find().populate("author news")
            res.render("news/comments", {title: "Comments", comments: comments.reverse()})
        } catch (err) {
            res.json({success: false})
        }
    }
}