const { Router } = require("express");
const userroute = Router();


const handlerSignupPost = require("../controller/handerSignupPost");
const handlerSigninPost = require("../controller/handlerSigninPost");

userroute.get("/signin", (req, res) => { 
    res.render('sighin.ejs')
})

userroute.post('/signin', handlerSigninPost)

userroute.get("/signup", (req, res) => {
    res.render("signup.ejs");
})

userroute.post("/signup", handlerSignupPost)

module.exports = userroute;