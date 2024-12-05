const express = require("express")
const path = require("path")
const mongoose = require("mongoose")
const cookiePaser = require("cookie-parser");
const jwt = require("jsonwebtoken")
const Blogs = require("./models/newblog.js")
const app = express();
const port = 3000;

//routes
const User_Routes = require("./routes/User_Routes.js");
const BlogRoute = require("./routes/Blog_Routes.js")

//seting some things

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use(express.urlencoded({ extended: false }))
app.use(cookiePaser());
app.use(express.static(path.resolve("./public")))


mongoose.connect("___DATA_BASE_URL____")
    .then(console.log("The db is connected")).catch((error) => {
        console.log("The db is not connected");
    })

app.get('/', async (req, res) => {
    const retreveToken = req.cookies["token"];
    const user = jwt.decode(retreveToken);
    const AllBlog = await Blogs.find({});
    res.render("Home.ejs", {
        user,
        blogs: AllBlog
    });
})
app.use('/user', User_Routes);

//blog routes
app.use('/Blog', BlogRoute)

app.listen(port, () => {
    console.log(`The server is UP at port ${port}`);
})
