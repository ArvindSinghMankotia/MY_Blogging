const jwt = require("jsonwebtoken")
const secret_pass = "$ingh@$ismyNam3";

function GernateTheToken(user) {
    const pay_lode = {
        user: user.fullName,
        email: user.email,
        roll: user.roll,
        id: user._id
    }
    const token = jwt.sign(pay_lode, secret_pass);
    return token;
}

function VerifieTheTokne(token) {
    if(jwt.verify(token,secret_pass)){
        const decoded = jwt.decode(token);
        console.log("the data in funciton is :",decoded);
        return decoded;
    }
    else{
        console.log("the token is not valid");
        return false;
    }
}

module.exports = {
    GernateTheToken, VerifieTheTokne
}