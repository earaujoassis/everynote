define(["angular", "application", "posts_storage"], function (angular) {
    "use strict";

    angular.module("app.services").service("PostsServices", [
        "$http",
        "$q",
        function ($http, $q) {
            this.findAll = function () {
                var deferred = $q.defer();

                $http({ method: "GET", url: "/api/posts" })
                    .success(function (data) {
                        deferred.resolve(data);
                    })
                    .error(function (reason) {
                        deferred.reject;
                    });

                return deferred.promise;
            };

            this.create = function (post) {
                var deferred = $q.defer();

                $http({ method: "POST", data: post, url: "/api/posts" })
                    .success(function (data) {
                        deferred.resolve(data);
                    })
                    .error(function (reason) {
                        deferred.reject;
                    });

                return deferred.promise;
            };

            this.update = function (_id, post) {
                var deferred = $q.defer();

                $http({ method: "PUT", data: post, url: "/api/posts/" + _id })
                    .success(function (data) {
                        deferred.resolve(data);
                    })
                    .error(function (reason) {
                        deferred.reject;
                    });

                return deferred.promise;
            };

            this.destroy = function (_id) {
                var deferred = $q.defer();

                $http({ method: "DELETE", url: "/api/posts/" + _id })
                    .success(function (data) {
                        deferred.resolve(data);
                    })
                    .error(function (reason) {
                        deferred.reject;
                    });

                return deferred.promise;
            };
        }
    ]);
});
