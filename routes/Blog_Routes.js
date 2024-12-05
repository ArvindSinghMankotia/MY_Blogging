const { Router } = require("express")
const BlogRoute = Router();
const Blogs = require("../models/newblog");
const cookieParser = require("cookie-parser");


const { VerifieTheTokne } = require("../services/TokenGernater&Vaidater");

BlogRoute.use(cookieParser());

BlogRoute.post("/create", async (req, res) => {
    console.log("try to put the data of ab blog");
    const { name, author, blog, image } = req.body
    const token = req.cookies["token"];
    const validate_user = await VerifieTheTokne(token);
    try {
        if (validate_user) {
            const newBlog = await Blogs.create({
                name,
                author,
                blog,
                image
            })
            if (blog) {
                console.log("the blog is gernated");
                res.redirect('/');
            }
            else {
                res.send({
                    msg: " the blog is not added"
                })
            }
        }
    }
    catch (error) {
        res.send({
            error: error,
            msg: " the validation faled"
        })
    }
})

BlogRoute.get("/", (req, res) => {
    res.render("newBlog.ejs")
})



BlogRoute.get('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const one_blog = await Blogs.findOne({ _id: id });
        if (!one_blog) {
            return res.status(404).send('Blog not found');
        }
        res.render('singleblog', { blog: one_blog });
    } catch (error) {
        console.error('Error fetching blog:', error);
        res.status(500).send('Internal Server Error');
    }
});
module.exports = BlogRoute;