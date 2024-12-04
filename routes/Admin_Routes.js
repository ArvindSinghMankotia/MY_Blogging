
const { Router } = require("express");
const AdminRoute = Router();

AdminRoute.get("/", (req, res) => {
    res.send("you are in admin part of the server")
})

module.exports = AdminRoute;