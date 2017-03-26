# Amanda's Kitcheck

Repo development for kitcheck.

## Getting started

Clone repo.

#### Install dependencies

From within the cloned folder `kitcheck` run:

Install node dependencies

```
npm install
```

Install bower dependencies

```
bower install
```

#### Gulp tasks

- `gulp` or `gulp build` to build an optimized version of your application in folder dist
- `gulp serve` to start BrowserSync server on your source files with live reload
- `gulp serve:dist` to start BrowserSync server on your optimized application without live reload
- `gulp clean` to remove all files from the build and tmp folders
- `gulp test` to run your unit tests with Karma
- `gulp test:auto` to run your unit tests with Karma in watch mode
- `gulp protractor` to launch your e2e tests with Protractor
- `gulp protractor:dist` to launch your e2e tests with Protractor on the dist

#### Tools/Libraries used

540 angular generator: https://www.npmjs.com/package/generator-540-angular (gulp, sass, ui-router)
Angular Chart JS: jtblin.github.io/angular-chart.js/

#### Known bug

When updating the account types of multiple users, a `500 Internal Server Error` occurs - it says CORS wasn't enabled on some of the endpoints. However, it works fine when updating one at a time