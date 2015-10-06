define(["angular", "posts_storage", "application"], function (angular, localStorage) {
    "use strict";

    angular.module("app.services").service("PostsServices", [
        "$http",
        "$q",
        function ($http, $q) {
            this.findAll = function () {
                var deferred = $q.defer();
                NProgress.start();

                $http({ method: "GET", url: "/api/posts" })
                    .success(function (data) {
                        NProgress.done();
                        deferred.resolve(data);
                    })
                    .error(function (reason) {
                        NProgress.done();
                        deferred.reject;
                    });

                return deferred.promise;
            };

            this.create = function (post) {
                var deferred = $q.defer();
                NProgress.start();

                $http({ method: "POST", data: post, url: "/api/posts" })
                    .success(function (data) {
                        NProgress.done();
                        deferred.resolve(data);
                    })
                    .error(function (reason) {
                        NProgress.done();
                        deferred.reject;
                    });

                return deferred.promise;
            };

            this.update = function (_id, post) {
                var deferred = $q.defer();
                NProgress.start();

                $http({ method: "PUT", data: post, url: "/api/posts/" + _id })
                    .success(function (data) {
                        NProgress.done();
                        deferred.resolve(data);
                    })
                    .error(function (reason) {
                        NProgress.done();
                        deferred.reject;
                    });

                return deferred.promise;
            };

            this.destroy = function (_id) {
                var deferred = $q.defer();
                NProgress.start();

                $http({ method: "DELETE", url: "/api/posts/" + _id })
                    .success(function (data) {
                        NProgress.done();
                        deferred.resolve(data);
                    })
                    .error(function (reason) {
                        NProgress.done();
                        deferred.reject;
                    });

                return deferred.promise;
            };
        }
    ]);
});
