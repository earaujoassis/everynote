"use strict";

module.exports = function (grunt) {
    var path = require("path"),
        fs = require('fs'),
        uuid = require('node-uuid');

    grunt.registerTask("generate", "Generate a .env configuration file.", function () {
        var done = this.async();
        var lines = [];

        var readLines = function (input, func) {
          var remaining = '';

          input.on('data', function(data) {
            remaining += data;
            var index = remaining.indexOf('\n');
            while (index > -1) {
              var line = remaining.substring(0, index);
              remaining = remaining.substring(index + 1);
              func(line);
              index = remaining.indexOf('\n');
            }
          });

          input.on('end', function() {
            if (remaining.length > 0) {
              func(remaining);
            }

            fs.writeFile(".env", lines.join('\n'), function(err) {
                if (err) {
                    grunt.log.ok(".env file was not generated: " + err);
                } else {
                    grunt.log.ok("The file was saved!");
                }

                done();
            });
          });
        }

        var func = function (data) {
            var line = data.replace("_SECRET=", "_SECRET=" + uuid.v4());
            lines.push(line);
        }

        var input = fs.createReadStream('.sample.env');
        readLines(input, func);
    })
};
