const path = require("path")

const NotFound = ((req, res) => (
    res.status(404).render("404")
));

module.exports = NotFound