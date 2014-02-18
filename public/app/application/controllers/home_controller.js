define(["angular", "application"], function (angular) {
    "use strict";

    angular.module("app.controllers").controller("HomeController", [
        "$scope",
        "$rootScope",
        "$timeout",
        function ($scope, $rootScope, $timeout) {
            /* FIX BUG For some reason this sections appears blank */
            $timeout(function () {
                jQuery(".articles-container").fadeIn();
            });
        }
    ]);
});
