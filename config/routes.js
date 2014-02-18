var WorkController = require("../api/controllers/PostController");

module.exports = function (app) {
    WorkController.create("/api/posts/:id?", app);
    app.get("*", function(req, res, next) {
        res.redirect(["/", "#", req.originalUrl].join(""));
    });
};
