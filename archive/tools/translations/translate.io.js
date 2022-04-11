const fs = require('fs');
import pathOr from 'ramda/src/pathOr'

module.exports = {
  getDestinationPath,
  loadJSONFromFile,
  notInObject,
  saveFile,
  setInPath,
  sortObject
};

function loadJSONFromFile(path) {
  return JSON.parse(fs.readFileSync(path, 'utf8'));
}

function setInPath(path, value, obj) {
  const stack = path.split('.');

  // we want to assign the value inside the existing object for performance reasons, disabling the eslint rule
  while (stack.length > 1) {
    const elem = stack.shift();
    if (!obj[elem]) {
            obj[elem] = {}; //eslint-disable-line
    }
        obj = obj[elem]; //eslint-disable-line
  }

    obj[stack.shift()] = value; //eslint-disable-line
}
function notInObject(obj, path) {
  return pathOr(undefined, path.split('.'), obj) === undefined;
}

function saveFile(jsonObj, path) {
  const content = JSON.stringify(jsonObj, null, 4);
  fs.writeFileSync(path, content);
}

function getDestinationPath(sourceFile, locale) {
  return sourceFile.replace('en-us.json', `${locale.toLowerCase()}.json`);
}

function sortObject(object) {
  const sortedObj = {};

  Object.keys(object).sort().forEach((key) => {
    if (typeof object[key] === 'object' && !(object[key] instanceof Array)) {
      sortedObj[key] = sortObject(object[key]);
    } else {
      sortedObj[key] = object[key];
    }
  });

  return sortedObj;
}
