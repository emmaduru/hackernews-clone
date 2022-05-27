const router = require("express").Router()
const { comment_create, comment_delete, comment_like, comment_list } = require("../controllers/comment")
const {news_list, news_detail, news_create_page, news_create, news_like, news_edit_page, news_edit, news_delete} = require("../controllers/news")
const {protect} = require("../middleware/auth")

router.route("/submit").get(protect,news_create_page).post(protect, news_create)
router.route("/comments").get(comment_list)
router.route("/").get(news_list)
router.route("/:slug").get(news_detail)
router.route("/:slug/like").put(protect, news_like)
router.route("/:slug/edit").get(protect, news_edit_page).put(protect, news_edit)
router.route("/:slug/delete").delete(protect, news_delete)
router.route("/:slug/comments/add").post(protect, comment_create)
router.route("/:slug/comments/:id/delete").delete(protect, comment_delete)
router.route("/:slug/comments/:id/like").put(protect, comment_like)

module.exports = router;