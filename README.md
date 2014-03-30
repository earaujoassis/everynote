# Everynote

> It is both a mobile-first/offline-first MEPAN stack (MongoDB, Node.js/Express, PouchDB, and AngularJS) and a webapp; you may decide

## Bootstrapping

0. Clone this repo

   ```sh
   $ git clone git@github.com:earaujoassis/everynote.git
   ```

1. Install dependencies

   ```sh
   $ npm install && bower install
   ```

2. Create configuration files for each usable environment (see config/example.environment.json for
an example). Files should be something like <environment:development|production>.json.

3. [Optional] Seed the MongoDB database with preliminary entries

   ```sh
   $ grunt seed
   ```

4. Run and watch

   ```sh
   $ NODE_ENV=<environment> grunt server:watch
   ```

4. Or just run

   ```sh
   $ NODE_ENV=<environment> grunt server
   ```

## Testing

0. Create a configuration file for the "testing" environment (similar to config/example.environment.json).
The created file should be named config/test.json (mandatory or you may change it in tests/index.js:7).

1. Run the Grunt task for tests

   ```sh
   $ grunt test
   ```

## License

There is an Application written in this Stack as a way to showcase its potential and how it works. The Application, named "Everynote", is not intented to be used commercially nor to be used as part of any further application.

Please refer to the included **LICENSE file** for terms of use.

[MIT License](http://ewerton-araujo.mit-license.org/) &copy; Ewerton Assis
