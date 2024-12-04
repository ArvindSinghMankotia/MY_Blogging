const user = require("../models/user")
const btcrypt = require("bcryptjs") 

async function handlerSignupPost(req, res) {
    const { fullName, email, password } = req.body;
    try {
        const existinguser = await user.findOne({ email });

        if (existinguser) {
            console.log("msg: Email is already registered");
            return res.status(400).send({ msg: "Email is already registered" });
        }
        //create hash to sore in db
        const hashedpassword = await btcrypt.hash(password, 10);

        const data = await user.create({
            fullName,
            email,
            password: hashedpassword
        })
        if (data) {
            console.log("msg:user is created");
            return res.redirect("/");
        }
    }
    catch (error) {
        console.error("Error:", error);
        return res.status(500).send({
            msg: "The user is not created",
            error: error.message // Optional: Send error details for better debugging
        });
    }
}

module.exports = handlerSignupPost;
