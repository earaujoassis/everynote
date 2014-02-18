define("menuConcerns", ["jquery", "modernizr"], function (jQuery) {
    "use strict";

    return {
        set: function () {
            if (Modernizr.mq("only all and (max-width: 992px)")) {
                jQuery(".menu-caller").on("click", function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    jQuery(".main-menu").addClass("focus");

                    jQuery("html, document").on("click", function eventHandler () {
                        jQuery("html, document").off("click", eventHandler);
                        if (jQuery(".main-menu").is(".focus")) {
                            jQuery(".main-menu").removeClass("focus");
                        }
                    });
                });
            } else {
                jQuery(".menu-caller").off("click");
            }
        },

        enableSpinner: function () {
            jQuery(".spinner").removeClass("stop");
        },

        disableSpinner: function () {
            jQuery(".spinner").addClass("stop");
        }
    };
});
