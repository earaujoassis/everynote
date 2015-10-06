var app,
    path = require("path"),
    http = require("http"),
    connect = require("connect"),
    express = require("express"),
    database = require("./api/database"),
    routes = require("./api/routes"),
    settings = require("nconf");

require("dotenv").load();
settings.argv().env();

app = express();

app.configure(function () {
    app.set("port", settings.get("SERVER_PORT") || settings.get("PORT")) || 3000;
    app.set("moongoose", database(settings));
    app.use(connect.compress());
    app.use(express.static(path.join(__dirname, "public"), { maxAge: settings.get("SERVER_MAX_AGE") }));
    app.use(express.favicon(__dirname + "/public/favicon.ico"), { maxAge: 25920000000 });
    app.use(express.logger("dev"));
    app.use(express.methodOverride());
    app.use(express.bodyParser());
    app.use(express.cookieParser(settings.get("SERVER_COOKIE_SECRET")));
    app.use(app.router);
    routes(app);
    app.use(express.errorHandler());
});

app.configure("development", function () {
    var MemoryStore = express.session.MemoryStore;

    app.use(express.session({
        store: new MemoryStore(),
        secret: settings.get("SERVER_SESSION_SECRET")
    }));
});

app.configure("production", function () {
    var RedisStore = require("connect-redis")(connect);

    app.use(express.session({
        store: new RedisStore({
            host: settings.get("REDIS_HOST"),
            port: settings.get("REDIS_PORT")
        }),
        secret: settings.get("SERVER_SESSION_SECRET")
    }));
});

http.createServer(app).listen(app.get("port"), function () {
    var environment = settings.get("NODE_ENV") || "development - defaulted";
    console.log(["Express server listening on port ", app.get("port"), " (", environment, ")"].join(""));
});
