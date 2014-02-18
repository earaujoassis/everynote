var Proto = require('uberproto');

module.exports = Proto.extend({
    init: function (prefix, app) {
        var subject = this;

        if (arguments.length === 1) {
            app = prefix;
            prefix = "/:id?";
        }

        app.all(prefix, function (req, res, next) {
            var method = (req.method.toLowerCase() + "Method");

            try {
                if (typeof subject[method] !== "function") {
                    throw "Server recognizes method but it is not aware on how to fulfill the request";
                }

                subject[method](req, res, next);
            } catch (e) {
                subject.handleException(e, res);
            }
        });
    },

    handleException: function (exception, res) {
        res.json(500, { error: exception.toString() + exception.stack });
    }
});
