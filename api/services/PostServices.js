var Q = require("q")
  , PostModel = require("../models/PostModel")
  , BaseServices = require("./BaseServices");

PostServices = BaseServices.extend({
    model: PostModel,

    findAll: function () {
        var deferred = Q.defer();

        this.model.find({}, null, { sort: { date: -1 } }, function (err, results) {
            if (err) {
                deferred.reject;
            } else {
                deferred.resolve(results);
            }
        });

        return deferred.promise;
    }
});

module.exports = PostServices.create();
