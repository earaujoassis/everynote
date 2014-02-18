var mongoose = require("mongoose")
  , instance;

module.exports = function (settings) {
    if (typeof instance === "undefined") {
        instance = mongoose;
    }

    if (!settings && typeof instance !== "undefined") {
        return instance;
    }

    instance.connect([
        "mongodb://",
        settings.get("database:host"),
        ":",
        settings.get("database:port"),
        "/",
        settings.get("database:database")
    ].join(""));

    return instance;
};
