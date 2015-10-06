var settings = require("nconf"),
    database = require(process.cwd() + "/api/database");

require("dotenv").load();
settings.argv().env();
settings.set("NODE_ENV", "test");
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
