require.config({
    baseUrl: "app",
    paths: {
        Q: "../components/q/q",
        async: "../components/async/lib/async",
        underscore: "../components/underscore/underscore-min",
        angular: "../components/angular/angular.min",
        ngResource: "../components/angular-resource/angular-resource.min",
        ngRoute: "../components/angular-route/angular-route.min",
        ngSanitize: "../components/angular-sanitize/angular-sanitize.min",
        ngUIRouter: "../components/angular-ui-router/release/angular-ui-router.min",
        modernizr: "../components/modernizr/modernizr",
        modernizrCssCalc: "../components/modernizr/feature-detects/css-calc",
        YUI: "../components/yui3/build/yui/yui-min",
        SimpleStateManager: "../components/SimpleStateManager/dist/ssm.min",
        jquery: "../components/jquery/jquery.min",
        perfectScrollbar: "../components/perfect-scrollbar/min/perfect-scrollbar-0.4.8.with-mousewheel.min",
        dimensionalConcerns: "/javascripts/dimensional-concerns.min",
        menuConcerns: "/javascripts/menu-concerns.min"
    },
    packages: [
        "application"
    ],
    shim: {
        Q: {
            exports: "Q"
        },
        async: {
            exports: "async"
        },
        angular: {
            exports: "angular"
        },
        ngResource: {
            deps: ["angular"]
        },
        ngRoute: {
            deps: ["angular"]
        },
        ngSanitize: {
            deps: ["angular"]
        },
        ngUIRouter: {
            deps: ["angular"]
        },
        YUI: {
            exports: "YUI"
        },
        jquery: {
            exports: "jquery"
        },
        perfectScrollbar: {
            exports: "perfectScrollbar",
            deps: ["jquery"]
        },
        modernizr: {
            exports: "modernizr"
        },
        modernizrCssCalc: {
            exports: "modernizrCssCalc",
            deps: ["modernizr"]
        },
        SimpleStateManager: {
            exports: "SimpleStateManager"
        },
        dimensionalConcerns: {
            exports: "dimensionalConcerns",
            deps: ["Q", "async", "jquery", "YUI", "SimpleStateManager", "perfectScrollbar"]
        },
        menuConcerns: {
            exports: "menuConcerns",
            deps: ["jquery", "modernizr"]
        }

    }
});

require([
    "angular",
    "ngRoute",
    "ngSanitize",
    "ngResource",
    "ngUIRouter",
    "modernizr",
    "modernizrCssCalc",
    "underscore",
    "application",
    "dimensionalConcerns",
    "menuConcerns"
], function () {
    "use strict";

    var angular, dimensionalConcerns;

    angular = arguments[0];
    dimensionalConcerns = arguments[9];

    angular.element(document).ready(function () {
        angular.bootstrap(document, ["app"]);
        dimensionalConcerns.then(function (dC) {
            document.dimensionalConcerns = dC;
            dC.set();
        });
    });
});
