# Ea stack

> Just another MEAN (MongoDB, Node.js/Express, and AngularJS) stack


## Bootstrapping

0. Clone this repo

   ```sh
   $ git clone git@github.com:earaujoassis/ea-stack.git
   ```

1. Install dependencies

   ```sh
   $ npm install && bower install
   ```

2. Create configuration files for each usable environment (see config/example.environment.json for
an example). Files should be something like <environment:development|production>.json.

3. [Optional] Seed the mongoDB database with preliminary entries.

   ```sh
   $ grunt seed
   ```

4. Run and watch

   ```sh
   $ NODE_ENV=<environment> grunt server:watch
   ```

4. Or just run

   ```sh
   $ grunt server
   ```


## License

There is an Application written in this Stack as a way to showcase its potential and how it works.
The Application, named "Everynote", is not intented to be used commercially nor to be used as part
of any further application.

[MIT License](http://ewerton-araujo.mit-license.org/) &copy; Ewerton Assis
