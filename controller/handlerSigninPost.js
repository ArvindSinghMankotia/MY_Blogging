const user = require("../models/user")
const btcrypt = require("bcryptjs")
const { GernateTheToken, VerifieTheTokne } = require("../services/TokenGernater&Vaidater.js")

async function handlerSigninPost(req, res) {
    const { email, password } = req.body;
    console.log(req.body);
    try {
        const presentUser = await user.findOne({ email });

        if (presentUser) {
            const checkpassword = await btcrypt.compare(password, presentUser.password);

            if (checkpassword) {
                //gernate the jwt
                const token = GernateTheToken(presentUser);

                console.log("the user is valid");
                console.log("token is", token);
                return res.cookie("token", token).redirect("/");


            }
            else {
                return res.render('sighin.ejs', {
                    error: "The Password  is Wrong !"
                })
            }
        }
        else {
            return res.render('sighin.ejs', {
                error: "The User is Not Present !"
            })
        }
    }
    catch (Error) {
        console.log(Error);
        return res.status(500).send({
            msg: "Server Error",
            error: Error.error
        })
    }
}

module.exports = handlerSigninPost;