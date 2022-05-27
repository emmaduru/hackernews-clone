const News = require("../models/news")
const Comment = require("../models/comment")

module.exports = {
    news_list: async (req, res) => {
        try {
            const news = await News.find().populate("author");
            res.render("home", {title: "Home", news: news.reverse()})
        } catch (err) {
            res.json({success: false, error: "Could not find news items."})
        }
    },

    news_detail: async (req, res) => {
        const {slug} = req.params;
        try {
            const news = await News.findOne({slug}).populate("author");
            const comments = await Comment.find({news: news._id}).populate("author")
            res.render("news/detail", {title: news.title, news, comments: comments.reverse()})
        } catch (err) {
            res.json({success: false, error: "Could not find news item."})
        }
    },
    
    news_create_page: (req, res) => {
        res.render("news/submit", {title: "Add a News Item"})
    },
    
    news_create: async (req, res) => {
        const {title, url, description} = req.body;
        if (!title || !url) throw new Error("Title and URL fields are required.")
        try {
            await News.create({title, url, description, author: res.locals.user._id});
            res.status(200).json({success: true, error: null})
        } catch (err) {
            res.json({success: false, error: err.message})
        }
    },
    
    news_like: async(req, res) => {
        const {slug} = req.params;
        try {
            let news = await News.findOne({slug})
            if (news.likes.includes(res.locals.user._id)) {
                news = await News.findOneAndUpdate({slug}, { $pull: {likes: res.locals.user._id} },
                    { new: true, useFindAndModify: false })
            } else {
                news = await News.findOneAndUpdate({slug}, { $push: {likes: res.locals.user._id} },
                    { new: true, useFindAndModify: false })
            }
            res.json({success: true, error: null, likes: news.likes.length})
        } catch (err) {
            res.json({success: false})
        }
    },

    news_edit_page: async (req, res) => {
        const {slug} = req.params;
        try {
            const news = await News.findOne({slug, author: res.locals.user});
            if (news) {
                res.render("news/edit", {title: `Edit: ${news.title}`, news})
            } else {
                throw new Error("You are not authorized to view this page.")
            }
        } catch(err) {
            res.json({success: false, error: err.message})
        }
    },
    
    news_edit: async (req, res) => {
        const {slug} = req.params;
        const {title, url, description} = req.body;
        try {
            if (!title || !url) throw new Error("Title and URL fields are required.")
            await News.findOneAndUpdate({slug}, {title, url, description, author: res.locals.user._id});
            res.status(200).json({success: true, error: null})
        } catch (err) {
            res.json({success: false, error: err.message})
        }
    },

    news_delete: async(req, res) => {
        const {slug} = req.params;
        try {
            await News.findOneAndDelete({slug});
            res.status(201).json({success: true})
        } catch (err) {
            res.json({success: false, error: err.message})
        }
    }
}