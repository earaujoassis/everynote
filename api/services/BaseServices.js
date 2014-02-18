var Proto = require('uberproto')
  , Q = require("q");

module.exports = Proto.extend({
    model: null,

    findAll: function () {
        var deferred = Q.defer();

        this.model.find({}, function (err, results) {
            if (err) {
                deferred.reject;
            } else {
                deferred.resolve(results);
            }
        });

        return deferred.promise;
    },

    save: function (data) {
        var deferred = Q.defer()
          , object = new this.model(data);

        object.save(function (err) {
            if (err) {
                deferred.reject;
            } else {
                deferred.resolve(object);
            }
        });

        return deferred.promise;
    },

    update: function (_id, data) {
        var deferred = Q.defer();

        this.model.findOneAndUpdate({ "_id": _id }, { $set: data }, {}, function (err, result) {
            if (err) {
                deferred.reject;
            } else {
                deferred.resolve(result);
            }
        });

        return deferred.promise;
    },

    destroy: function (_id) {
        var deferred = Q.defer();

        this.model.remove({ "_id": _id }, function (err) {
            if (err) {
                deferred.reject;
            } else {
                deferred.resolve({ statuscode: 200, message: "Object destroyed" });
            }
        })

        return deferred.promise;
    }
});
