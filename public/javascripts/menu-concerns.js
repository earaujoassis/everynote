define("menuConcerns", ["jquery", "modernizr"], function (jQuery) {
    "use strict";

    var openMenu, closeMenu;

    openMenu = function () {
        jQuery(".main-header").stop().animate({
            left: "-40px"
        }, 200);
    };

    closeMenu = function () {
        jQuery(".main-header").stop().animate({
            left: "-320px"
        }, 125);
    };

    return {
        set: function () {
            if (Modernizr.mq("only all and (max-width: 992px)")) {
                jQuery(".menu-caller").on("click", function (e) {
                    e.preventDefault();
                    e.stopPropagation();

                    openMenu();
                });
                jQuery(".main-header a, .main-container").on("click", closeMenu);
            } else {
                jQuery(".menu-caller").off("click");
                jQuery(".main-header").removeAttr("style");
                jQuery(".main-header a, .main-container").off("click", closeMenu);
            }
        }
    };
});
