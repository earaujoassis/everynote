var PostController = require("./controllers/PostController");

module.exports = function (app) {
    PostController.create("/api/posts/:id?", app);

    app.get("/api/connection-test", function (req, res) {
        res.send(204).end();
    });

    app.get("*", function (req, res, next) {
        res.redirect(["/", "#", req.originalUrl].join(""));
    });
};
