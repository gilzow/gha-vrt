/**
 * This file manages the merging of the default-paths and any theme specific paths into on scenarios collection to give
 * to backstop
 *
 */
/**
 *
 * @type {NodeJS.Process}
 */
const process = require('process');
/**
 * Arguments/options passed into backstop
 * @type {{_: []}}
 */
const args = require('minimist')(process.argv.slice(2));
/**
 * System path
 * @type {path.PlatformPath | path}
 */
const path = require('path');
/**
 * The URL we want to test against
 * @type {string}
 */
const testURL = args.testURL;
/**
 * The URL that we will use to create the baseline
 * @type {string}
 */
const baselineURL = args.refURL;

console.log('scenarios file has been called');

/**
 * Path where our template path file is located
 * default is project root path + ./.github/tests/vrt/
 * This SHOULD be set by the github action before it gets to us. If not, try again
 * @type {string}
 */
const test_path = args.testPath ? args.testPath : path.resolve(process.env.GITHUB_WORKSPACE,'.github','tests','vrt') + path.sep;
console.log('test_path is set to ' + test_path);
/**
 * Absolute location of the template-paths file
 * @type {string}
 */
const pathFile = test_path+'template-paths.js'
console.log('pathFile is ' + pathFile);

console.log("testURL is " + testURL);
console.log("baseline is " + baselineURL);

/**
 * Our default paths that (almost) every template should test
 * @type {{}}
 */
let defaultPaths = {};
defaultPaths.paths = require(__dirname+path.sep+'default-paths.js');

/**
 * The collection of new scenarios objects that we'll have backstop test
 * @type {*[]}
 */
let newScenarios = [];

try {
  var templatePaths = require(pathFile);
  var scenarioPaths = [...defaultPaths.paths, ...templatePaths.paths];
} catch (e) {
  console.error(e)
  console.log('pathfile didnt work so we\'re going to use ' + __dirname+path.sep+'default-paths.js');
  var scenarioPaths = defaultPaths.paths;
}

/**
 * @todo we need to allow for a deep merge so that the template-paths.js can include an override for the Home and
 * Forced 404 paths.
 */
for (let i=0;i<scenarioPaths.length;++i) {
  let newScenario = scenarioPaths[i];
  let newPath = newScenario.path;
  scenarioPaths[i].referenceUrl = `${baselineURL}${newPath}`;
  scenarioPaths[i].url = `${testURL}${newPath}`;


  //now that we have referenceURL and url, we dont need path anymore
  delete newScenario.path;

  newScenarios.push(newScenario);
}

const scenarios = newScenarios;

module.exports = {
  scenarios:scenarios
}
