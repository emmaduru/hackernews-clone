const User = require("../models/user")
const News = require("../models/news");
const Comment = require("../models/comment")
const { default: mongoose } = require("mongoose");

module.exports = {
    profile_page: async (req, res) => {
        const {username} = req.params
        try {
            const user = await User.findOne({username});
            res.render("user/profile", {user, title: user.username})
        } catch(err) {
            res.json({success: false, error: "Could not find user."})
        }
    },

    user_submissions: async(req, res) => {
        const {username} = req.params
        try {
            const user = await User.findOne({username})
            const news = await News.find({author: user._id}).populate("author")
            res.render("home", {news, title: user.username})
        } catch(err) {
            res.json({success: false, error: "Could not find user."})
        }
    },

    user_likes: async(req, res) => {
        const {username} = req.params
        try {
            const user = await User.findOne({username})
            const news = await News.find({"likes": user._id})
            res.render("home", {news, title: user.username})
        } catch(err) {
            res.json({success: false, error: "Could not find user."})
        }
    },
    
    user_comments: async(req, res) => {
        const {username} = req.params;
        try {
            const user = await User.findOne({username})
            const comments = await Comment.find({author: user._id}).populate("author news")
            res.render("news/comments", {comments, title: user.username})
        } catch(err) {
            res.json({success: false, error: "Could not find user."})
        }
    }
}