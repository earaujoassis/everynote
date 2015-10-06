var mongoose = require("mongoose"),
    instance,
    databaseName;

module.exports = function (settings) {
    if (typeof instance === "undefined") {
        instance = mongoose;
    }

    if (!settings && typeof instance !== "undefined") {
        return instance;
    }

    databaseName = settings.get("DATABASE_PREFIX") + "_" + (settings.get("NODE_ENV") || "development");

    instance
        .connect([
            "mongodb://",
            settings.get("DATABASE_HOST"), ":", settings.get("DATABASE_PORT"),
            "/", databaseName
        ].join(""));

    return instance;
};
