define(["angular", "application"], function (angular) {
    "use strict";

    angular.module("app.controllers").controller("AppCtrl", [
        "$scope",
        "$rootScope",
        "$location",
        "$timeout",
        "PostsServices",
        function ($scope, $rootScope, $location, $timeout, PostsServices) {
            $scope.year = (new Date()).getFullYear().toString();
            $rootScope.posts = [];

            $scope.isActiveUrl = function (path) {
                if ($location.path().substr(0, path.length) === path) {
                    if (!($location.path().substr(0).length > 1 && path.length === 1))
                        return true;
                }

                return false;
            };

            $scope.isActiveController = function (controller) {
                if ($rootScope.controller) {
                    return $rootScope.controller === controller;
                }
            };

            $scope.setFavoritePost = function (postId) {
                /* FIX Show a spinning while updating */
                PostsServices
                    .update(postId, { favorite : true })
                    .then(function (value) {
                        var post = _.findWhere($rootScope.posts, { "_id": value._id });
                        post.favorite = true;
                    });
            };

            $scope.removePost = function (postId) {
                /* FIX Show a spinning while updating */
                PostsServices
                    .destroy(postId)
                    .then(function (value) {
                        var post, index;
                        if (value.statuscode === 200) {
                            post = _.findWhere($rootScope.posts, { "_id": postId });
                            index = _.indexOf($rootScope.posts, post);
                            $rootScope.posts.splice(index, 1);
                        }
                    });
            };

            $rootScope.$watchCollection("posts", function(newValue, oldValue) {
                if (document.dimensionalConcerns) {
                    document.dimensionalConcerns.setArticlesBox(newValue.length);
                }
            }, true);

            $rootScope.$on("$routeChangeSuccess", function (ev, data) {
                if (data.$$route && data.$$route.controller) {
                    $rootScope.controller = data.$$route.controller;
                }
            });

            $rootScope.$on("$routeChangeStart", function () {
                /* FIX Integrate with $routeProvider resolve */
                $timeout(function () {
                    if (!$rootScope.posts.length || $rootScope.posts.length < 0) {
                        PostsServices
                            .findAll()
                            .then(function (value) {
                                $rootScope.posts = value;
                            });
                    }
                });
            });
        }
    ]);
});
