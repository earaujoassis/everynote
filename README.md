# Everynote

> It is both a mobile-first/offline-first MEAN stack (MongoDB, Node.js/Express, and AngularJS)
and a webapp; you may decide

This project was created as a way to improve my knowledge of the MEAN (MondoDB + Node.js/Express +
AngularJS) stack (January 2014). Also, it uses [NProgress](http://ricostacruz.com/nprogress/) and
[Offline](http://github.hubspot.com/offline/docs/welcome/) to keep the user informed about the
current state of the web application connectivity. **It is not maintained anymore**.

## Running

1. Install dependencies with `$ npm install && bower install`. Grunt and Bower should be available globally
(`$ npm install -g grunt bower`).

2. Generate a `.env` file with the Grunt task `grunt generate` and update its data according to your
environment (like the HOST and PORT for the MongoDB instance; information for Redis connection; etc.)

3. [Optional] Seed the MongoDB database with preliminary entries: `$ grunt seed`.

4. Serve and watch `$ NODE_ENV={development,test,production} grunt server:watch`.

4. Or just serve `$ NODE_ENV={development,test,production} grunt server`.

## Testing

```sh
$ grunt test
```

## License

There is an Application written in this Stack as a way to showcase its potential and how it works.
The Application, named "Everynote", is not intented to be used commercially nor to be used as part of
any further application.

Please refer to the included **LICENSE file** for terms of use.

Code under the [MIT License](http://earaujoassis.mit-license.org/) &copy; Ewerton Assis
