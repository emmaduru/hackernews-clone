router = require("express").Router()
const {profile_page, user_submissions, user_likes, user_comments} = require("../controllers/user")

router.route("/:username").get(profile_page)
router.route("/:username/submissions").get(user_submissions)
router.route("/:username/likes").get(user_likes)
router.route("/:username/comments").get(user_comments)

module.exports = router