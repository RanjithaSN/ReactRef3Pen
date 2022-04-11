const queue = require('async/queue'); // eslint-disable-line
const settings = require('./translate.settings');
const api = require('./translate.api');
const io = require('./translate.io');

settings.sourceFiles.forEach((sourceFile) => {
  console.log('starting', sourceFile);
  const sourceLocale = io.loadJSONFromFile(sourceFile);

  settings.destinationLocales.forEach((destinationLocale) => {
    const destinationPath = io.getDestinationPath(sourceFile, destinationLocale);
    const dest = io.loadJSONFromFile(destinationPath);

    const q = queue((task, callback) => {
      api.callTranslateApi(task.text, task.language).then((result) => {
        callback(task.path, result, dest);
      }).catch((err) => {
        console.log('failed to translate', task.text, err);
      });
    }, settings.concurrentApiReqeusts);

    q.drain = () => {
      console.log('saving', destinationPath);
      io.saveFile(io.sortObject(dest), destinationPath);
    };

    traverse(sourceLocale, null, destinationLocale, q, dest);

    if (!q.started) {
      console.log('nothing to translate for', destinationPath);
    }
  });
});

// recursively traverses a json object to find nodes without children
function traverse(jsonObj, currentPath, language, q, dest) {
  if (jsonObj && typeof jsonObj === 'object') {
    // node is an object, keep traversing
    Object.entries(jsonObj).forEach(([key, value]) => {
      const fullPath = currentPath ? `${currentPath}.${key}` : key; // maintain a path so heirarchy can be regenerated
      traverse(value, fullPath, language, q, dest);
    });
  } else if (io.notInObject(dest, currentPath)) {
    // we've reached a node we want to translate
    q.push({
      text: jsonObj,
      language,
      path: currentPath
    }, translateSuccess);
  }
}

function translateSuccess(path, value, dest) {
  io.setInPath(path, value, dest);
}
