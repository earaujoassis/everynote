"use strict";

module.exports = function (grunt) {

    var path = require("path"),
        async = require("async"),
        settings = require("nconf"),
        database,
        modelsFolder,
        seedData;

    require("dotenv").load();
    settings.argv().env();

    grunt.registerMultiTask("seed", "Seed mongoDB database with data.", function () {
        var done = this.async();

        var functionsAsync = [],
            models,
            options = this.options({
                database: "api/database",
                modelsFolder: "api/models/",
                seedData: "tasks/seed.json",
                cwd: "../"
          });

        if (options.cwd.substr(-1, 1) !== "/") {
            options.cwd = options.cwd + "/";
        }
        database = require(options.cwd + options.database)(settings);
        modelsFolder = options.cwd + options.modelsFolder;
        seedData = require(options.cwd + options.seedData);

        models = seedData.models;

        async.eachSeries(
            models,
            function (model, modelCallback) {
                var modelClass = require(modelsFolder + model.model);
                modelClass.remove({}, function(err) {
                    if (!err) {
                        grunt.log.ok("Old entries for " + model.model + " were removed.");
                    }

                    async.eachSeries(
                        model.entries,
                        function (entry, entryCallback) {
                            var objectSave = new modelClass(entry);
                            objectSave.save(function (err) {
                                if (err) {
                                    grunt.log.error("Error: " + err.toString());
                                }
                                entryCallback(null, null);
                            });
                        },
                        function (err, results) {
                            if (err) {
                                grunt.log.error("Error: " + err.toString());
                            }
                            grunt.log.ok("New entries for " + model.model + " were placed.");
                            modelCallback(null, null);
                        }
                    );
                });
            },
            function (err, results) {
                grunt.log.ok("Oh, man, I'm done");
                done();
            }
        );
    });
};
