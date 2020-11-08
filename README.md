# Getting Started with Package Phobia App

This project aims at checking the sizes of npm bundles.

## Available Scripts

In the project directory, you can run:

### `npm run start-app`

Runs the app in the production mode.
Open [http://localhost:3005](http://localhost:3005) to view it in the browser.

### `npm test`

Launches the test runner and executes *.test.tsx and *.spec.ts test files writtem with [Jest](https://jestjs.io/).

### `npm run build`

Builds the app for production to the `build` folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Remaining Work

### Getting size of minified

Currently, only the sizes of unpacked and gzipped package versions are computed and displayed.
Package Phobia App does not provide the size of the minified bundles. In order to get this size, a new method in the ./server/service/search.service.ts has to be implemented.
This method should perform the following steps:
1. Install in the temporary folder the package version
2. Build a minified bundle of the installed package thanks to webpack. The webpack configuration should declare all the mandatory plugin to properly handled most of the supported files (js, jsx, css, scss, etc). The configuration could be the same as the one used by [package-build-stats](https://github.com/pastelsky/package-build-stats/blob/master/src/config/makeWebpackConfig.ts)
3. Measure the size of the minified bundle
4. Gzip the minified bundle thanks to node-gzip for instance
5. Measure the size of the gzipped minified bundle

### Caching the sizes

Currently, the sizes of the package versions are always computed based on the npm command executions. A cache should be implemented in order to reduce the response time of the server.


