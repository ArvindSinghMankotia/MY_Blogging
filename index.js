const express = require("express")
const path = require("path")
const mongoose = require("mongoose")
const cookiePaser = require("cookie-parser");
const jwt = require("jsonwebtoken")
const app = express();
const port = 3000;
//routes
const User_Routes = require("./routes/User_Routes.js");
const Admin_Routes = require("./routes/Admin_Routes.js");

//seting some things
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use(express.urlencoded({ extended: false }))
app.use(cookiePaser());


mongoose.connect("mongodb://127.0.0.1:27017/blogging_app")
    .then(console.log("The db is connected")).catch((error) => {
        console.log("The db is not connected");
    }) 

app.get('/', (req, res) => {
    const retreveToken = req.cookies["token"];
    const user = jwt.decode(retreveToken);
    console.log(user);
    res.render("Home.ejs",{
        user,
    });
})



app.use('/user', User_Routes);

app.use('/admin', Admin_Routes);
app.listen(port, () => {
    console.log(`The server is UP at port ${port}`);
})