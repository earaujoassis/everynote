require.config({
    baseUrl: "app",
    paths: {
        q: "../components/q/q",
        underscore: "../components/underscore/underscore",
        pouchdb: "../components/pouchdb/dist/pouchdb-nightly.min",
        angular: "../components/angular/angular.min",
        ngResource: "../components/angular-resource/angular-resource.min",
        ngRoute: "../components/angular-route/angular-route.min",
        ngSanitize: "../components/angular-sanitize/angular-sanitize.min",
        ngUIRouter: "../components/angular-ui-router/release/angular-ui-router.min",
        modernizr: "../components/modernizr/modernizr",
        modernizrCssCalc: "../components/modernizr/feature-detects/css-calc",
        SimpleStateManager: "../components/SimpleStateManager/dist/ssm.min",
        jquery: "../components/jquery/jquery.min",
        menuConcerns: "/javascripts/menu-concerns.min"
    },
    packages: [
        "application"
    ],
    shim: {
        angular: {
            exports: "angular",
            deps: ["pouchdb"]
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
        jquery: {
            exports: "jquery"
        },
        underscore: {
            exports: "underscore"
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
    "underscore",
    "pouchdb",
    "modernizr",
    "modernizrCssCalc",
    "SimpleStateManager",
    "underscore",
    "application",
    "menuConcerns"
], function (angular) {
    "use strict";

    var menuConcerns = arguments[12];

    ssm
        .addState({
            id: "desktop",
            minWidth: 992,
            onEnter: function () {
                menuConcerns.set();
            }
        })
        .addState({
            id: "mobile",
            maxWidth: 991,
            onEnter: function () {
                menuConcerns.set();
            }
        })
        .ready();

    angular.element(document).ready(function () {
        angular.bootstrap(document, ["app"]);
    });
});
