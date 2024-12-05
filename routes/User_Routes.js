const { Router } = require("express");
const cookieParser = require("cookie-parser");
const userroute = Router();

const handlerSignupPost = require("../controller/handerSignupPost");
const handlerSigninPost = require("../controller/handlerSigninPost");
userroute.use(cookieParser());

// while logeout we dont need that the when we clock bak page icon we should not be login
userroute.get("/logout", (req, res) => {
    res.clearCookie("token").redirect("/user/signin");
});
userroute.get("/signin", (req, res) => {
    res.render("sighin.ejs");
});

userroute.post("/signin", handlerSigninPost);

userroute.get("/signup", (req, res) => {
    res.render("signup.ejs");
});

userroute.post("/signup", handlerSignupPost);

module.exports = userroute;
