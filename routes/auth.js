const router = require("express").Router()
const {signup, signup_page, login, login_page, logout} = require("../controllers/auth")

router.route("/signup").get(signup_page).post(signup);
router.route("/login").get(login_page).post(login);
router.route("/logout").get(logout);

module.exports = router