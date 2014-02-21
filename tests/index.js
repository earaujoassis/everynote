var settings = require("nconf")
  , database = require(process.cwd() + "/config/database");

settings
    .argv()
    .env()
    .file({ file: process.cwd() + "/config/test.json" });
database = database(settings);

module.exports = {
    check: function (done, f) {
        try {
            f();
            done();
        } catch(e) {
            done(e);
        }
    },

    database: database
};
