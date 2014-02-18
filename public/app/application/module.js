define(["angular"], function (angular) {
    "use strict";

    angular.module("app.controllers", []);
    angular.module("app.services", []);

    var module = angular.module("app", [
        "ngRoute",
        "ngResource",
        "ngSanitize",
        "ui.router",
        "app.controllers",
        "app.services"
    ]);

    module.config([
        "$routeProvider",
        "$locationProvider",
        function ($routeProvider, $locationProvider) {
            $locationProvider.html5Mode(true);
            $routeProvider
                .when("/", {
                    controller: "HomeController",
                    templateUrl: "/app/application/views/home/index.html",
                    public: true
                })
                .when("/posts/new", {
                    controller: "PostsController",
                    templateUrl: "/app/application/views/posts/new_edit.html",
                    public: true
                })
                .when("/posts/:postId", {
                    controller: "PostsController",
                    templateUrl: "/app/application/views/posts/new_edit.html",
                    public: true
                });
        }
    ]);

    return module;
});
