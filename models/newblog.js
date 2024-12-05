const mongoose = require("mongoose");

const newBlogSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Blog name is required']
    },
    blog: {
        type: String,
        required: [true, 'Blog content is required']
    },
    author: {
        type: String,
        required: [true, 'Author name is required']
    },
    image: {
        type: String,
        required: false
    }
}, { timestamps: true });

const Blogs = mongoose.model("Blogs", newBlogSchema);

module.exports = Blogs;