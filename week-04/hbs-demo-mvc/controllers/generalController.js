const express = require("express");
const router = express.Router();

// setup a 'route' to listen on the default url path (http://localhost)
router.get("/", function (req, res) {
    res.render("general/home");
});

// setup another route to listen on /about
router.get("/about", function (req, res) {
    res.render("general/about");
});

module.exports = router;