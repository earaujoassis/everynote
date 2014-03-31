define(["angular", "application"], function (angular) {
    "use strict";

    angular.module("app.controllers").controller("PostsController", [
        "$scope",
        "$rootScope",
        "$routeParams",
        "$location",
        "PostsServices",
        function ($scope, $rootScope, $routeParams, $location, PostsServices) {
            $scope.plainPost = {};
            $scope.post;

            if ($routeParams.postId) {
                var post = _.findWhere($rootScope.posts, { "_id": $routeParams.postId });
                $scope.post = angular.copy(post);
            }

            $scope.save = function (post) {
                if (post._id) {
                    var postId = post._id;

                    delete post._id;
                    PostsServices
                        .update(postId, post)
                        .then(function (value) {
                            var originalPost;

                            if (!!value._id) {
                                originalPost = _.findWhere($rootScope.posts, { "_id": value._id });
                                angular.extend(originalPost, value);
                            }
                        });
                } else {
                    post = angular.copy(post);
                    PostsServices
                        .create(post)
                        .then(function (value) {
                            if (!!value._id) {
                                $rootScope.posts.unshift(value);
                            }
                        });
                }

                $location.path("/");
            };
        }
    ]);
});
