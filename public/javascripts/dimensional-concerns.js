define("dimensionalConcerns", ["Q", "async", "jquery", "menuConcerns", "YUI", "modernizr", "modernizrCssCalc", "SimpleStateManager", "perfectScrollbar"],
    function (Q, async, jQuery, menuConcerns) {
        "use strict";

        var stylesheet
          , deferred = Q.defer()
          , dimensionalConcerns;

        async.series([
            function (callback) {
                YUI().use("node", "stylesheet", function (Y) {
                    stylesheet = new Y.StyleSheet("ModalDisplacement");
                    callback(null, null);
                });
            },

            function (callback) {
                var entryWidth;

                dimensionalConcerns = {
                    set: function () {
                        var subject = this;

                        jQuery(".horizontal-wrapper").perfectScrollbar();
                        ssm
                            .addState({
                                id: "desktop",
                                minWidth: 992,
                                onEnter: function () {
                                    subject.setDesktop();
                                    subject.setArticlesBox();
                                    subject.setLogoDisplacement();
                                    menuConcerns.set();
                                },
                                onResize: function() {
                                    subject.setDesktop();
                                    subject.setLogoDisplacement();
                                }
                            })
                            .addState({
                                id: "mobile",
                                maxWidth: 991,
                                onEnter: function () {
                                    subject.setMobile();
                                    subject.setArticlesBox();
                                    menuConcerns.set();
                                }
                            })
                            .ready();

                    },

                    setArticlesBox: function (length) {
                        var numberOfPosts = length || jQuery(".main-container .entry").length
                          , usefulWidth = jQuery("body").outerWidth()
                          , totalWidth;

                        if (numberOfPosts > 0 && Modernizr.mq("only all and (min-width: 992px)")) {
                            /* Creates a fake container to get measures */
                            if (typeof entryWidth === "undefined") {
                                /*jshint -W110 */
                                jQuery('<article style="position:absolute;top:-1000px;left:-1000px;" id="fake-entry-container" class="entry">&nbsp;</article>').appendTo(".app-container");
                                /*jshint +W100 */
                                entryWidth = jQuery("#fake-entry-container").outerWidth();
                                jQuery("#fake-entry-container").remove();
                            }
                            totalWidth = (numberOfPosts * (entryWidth + 30)) + 155;
                            if (totalWidth > usefulWidth - 50) {
                                jQuery(".main-container").css("width", [totalWidth, "px"].join(""));
                            } else {
                                jQuery(".main-container").css("width", "auto");
                            }

                        } else {
                            jQuery(".main-container").css("width", "auto");
                        }
                        jQuery(".horizontal-wrapper").perfectScrollbar("update");
                        jQuery(".articles-container").fadeIn("slow");
                        this.visualConcerns.disableSpinner();
                    },

                    setLogoDisplacement: function () {
                        if (!Modernizr.csscalc) {
                            var brandingWidth = jQuery(".branding").outerHeight()
                              , headerHeight = jQuery(".main-header").outerHeight()
                              , idealDisplacement;

                            idealDisplacement = parseInt((headerHeight - brandingWidth) / 2);

                            jQuery(".main-header").animate({
                                paddingTop: (parseInt(idealDisplacement))
                            }, 50);
                        }
                    },

                    setDesktop: function () {
                        var menuLeftOffset = jQuery(".main-menu").offset().left;

                        menuLeftOffset = menuLeftOffset - 705 - 50 - 73;
                        /* 705: dialog-box-width, 50: main-container-padding, 73: main-header-width */
                        menuLeftOffset = menuLeftOffset < 28 ? 28 : menuLeftOffset;
                        stylesheet.disable();
                        stylesheet.set(".dialog", {
                            "left": (menuLeftOffset + "px")
                        });
                        stylesheet.enable();

                        if (!Modernizr.csscalc) {
                        }
                    },

                    setMobile: function () {
                        stylesheet.disable();
                        stylesheet.set(".dialog", {
                            "left": "initial"
                        });
                        stylesheet.enable();
                    },

                    visualConcerns: menuConcerns
                };

                callback(null, null);
            },

            function (callback) {
                deferred.resolve(dimensionalConcerns);
                callback(null, null);
            }
        ]);

        return deferred.promise;
    });
