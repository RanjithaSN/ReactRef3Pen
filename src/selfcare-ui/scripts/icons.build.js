/* eslint-disable @typescript-eslint/no-var-requires */
const createComponents = require('./icons.createComponents');
const del = require('del');
const fs = require('fs-extra');
const path = require('path');
const svgOptimize = require('./icons.optimize');

const BUILD_PATH = path.join(__dirname, '..', 'src', 'icons', 'react-icons');

// Build the npm packages
const createPackages = (svgDataList) => {
  const packagers = [createComponents]; // list other packagers here
  const packages = packagers.map((packager) => packager(svgDataList));
  del.sync(BUILD_PATH);
  packages.forEach((pack) => {
    // eslint-disable-next-line no-console
    console.log(`Building package: "${pack.name}"`);
    pack.files.forEach((file) => {
      fs.outputFile(path.join(BUILD_PATH, file.filepath), file.source);
    });
  });
};

svgOptimize(path.resolve(__dirname, '..', 'src/icons/*.svg'), createPackages);
