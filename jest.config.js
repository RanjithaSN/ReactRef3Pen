module.exports = {
  collectCoverageFrom: [
    'src/**/*.{js,jsx}'
  ],
  coveragePathIgnorePatterns: [
    'node_modules',
    '\\.contextual\\.(js|jsx)$',
    '\\.stories\\.(js|jsx)$',
    '\\.test\\.(js|jsx)$'
  ],
  setupFiles: [
    './config/jest/jestPolyfill.js'
  ],
  testPathIgnorePatterns: ['/node_modules/', '/blueprint-templates/'],
  testEnvironment: 'jsdom',
  testURL: 'http://localhost',
  transform: {
    '^.+\\.(js|jsx)$': './node_modules/babel-jest',
    '^.+\\.css$': './config/jest/cssTransform.js',
    '^.+\\.(js|jsx|ts|tsx)$': '<rootDir>node_modules/babel-jest',
    '^(?!.*\\.(css|json)$)': './config/jest/fileTransform.js'
  },
  transformIgnorePatterns: [
    'node_modules/(?!selfcare-ui|selfcare-core)'
  ],
  moduleNameMapper: {
    '@selfcare/core(.*)$': '<rootDir>src/selfcare-core/src/$1',
    '@selfcare/ui(.*)$': '<rootDir>src/selfcare-ui/src/$1'
  },
  moduleFileExtensions: [
    'js',
    'json',
    'jsx',
    'ts',
    'tsx'
  ]
};
