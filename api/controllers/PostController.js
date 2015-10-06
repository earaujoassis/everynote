var BaseController = require("./BaseController"),
    PostServices = require("../services/PostServices");

module.exports = BaseController.extend({
    getMethod: function (req, res) {
        var subject = this;

        PostServices
            .findAll()
            .then(function (value) {
                res.json(200, value);
            }, function (reason) {
                subject.handleException(reason, res);
            });
    },

    postMethod: function (req, res) {
        var subject = this;

        PostServices
            .save(req.body)
            .then(function (value) {
                res.json(200, value);
            }, function (reason) {
                subject.handleException(reason, res);
            });
    },

    putMethod: function (req, res) {
        var subject = this,
            postId = req.params.id || req.body.id || req.body._id;

        if (!!postId) {
            delete req.body._id;
            PostServices
                .update(postId, req.body)
                .then(function (value) {
                    res.json(200, value);
                }, function (reason) {
                    subject.handleException(reason, res);
                });
        } else {
            subject.notFound(res);
        }
    },

    deleteMethod: function (req, res) {
        var subject = this,
            postId = req.params.id || req.body.id || req.body._id;

        if (!!postId) {
            PostServices
                .destroy(postId)
                .then(function (value) {
                    res.json(200, value);
                }, function (reason) {
                    subject.handleException(reason, res);
                });
        } else {
            subject.notFound(res);
        }
    },

    notFound: function (res) {
        res.json(404, { error: "Object not found" });
    }
});
