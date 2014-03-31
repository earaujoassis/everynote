define("posts_storage", ["pouchdb", "q"], function (PouchDB, Q) {
    "use strict";

    PouchDB.enableAllDbs = true;

    var db = new PouchDB("everynote-posts")
      , remoteCouch = false;

    return {
        findAll: function () {
            var deferred = Q.defer();

            db.allDocs({ include_docs: true, descending: true }, function (err, data) {
                if (err) {
                    deferred.reject;
                } else {
                    deferred.resolve(data.rows);
                }
            });

            return deferred.promise;
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

        update: function (post) {
            if (!post._rev) {
                delete post._id;
            }

            return this.create(post);
        },

        destroy: function (_id, _rev) {
            var deferred = Q.defer();

            db.remove({ _id: _id, _rev: _rev }, function (err, data) {
                if (err) {
                    deferred.reject;
                } else {
                    deferred.resolve(data);
                }
            });

            return deferred.promise;
        },

        sync: function () {

        }
    };

});
