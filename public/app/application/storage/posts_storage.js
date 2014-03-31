define("posts_storage", ["angular", "application", "pouchdb"], function (angular) {
    "use strict";

    var db = new PouchDB("everynote-posts");
      , remoteCouch = false;


    return {
        findAll: function () {

        },

        create: function (post) {
            var deferred = Q.defer();

            if (!post._id) {
                post._id = new Date().toISOString();
            }

            post.unsync = true;

            db.put(post, function (err, data) {
                if (err) {
                    deferred.reject;
                } else {
                    deferred.resolve(data);
                }
            });

            return deferred.promise;
        },

        update: function (_id, post) {

        },

        destroy: function (_id) {

        },

        sync: function () {

        }
    }

});
