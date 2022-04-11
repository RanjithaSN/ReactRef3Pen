module.exports = (api) => {
  api.cache(true);
  return {
    presets: [
      ['@babel/preset-env', {
        targets: {
          browsers: [
            'last 4 Chrome versions',
            'last 4 Safari versions',
            'last 4 FireFox versions',
            'Explorer 11',
            'last 2 Edge versions'
          ]
        }
      }],
      '@babel/preset-react',
      '@babel/typescript'
    ],
    ignore: [/[/\\]core-js/, /@babel[/\\]runtime/],
    plugins: [
      [
        'module-resolver',
        {
          extensions: ['.js', '.jsx', '.ts', '.tsx', '.css', '.scss'],
          root: ['./src'],
          alias: {
            '@selfcare/core': './src/selfcare-core/src',
            '@selfcare/ui': './src/selfcare-ui/src'
          }
        }
      ],
      '@loadable/babel-plugin',
      '@babel/plugin-transform-runtime',
      '@babel/plugin-transform-modules-commonjs',
      '@babel/plugin-proposal-optional-chaining',
      [
        '@babel/plugin-proposal-nullish-coalescing-operator',
        {
          loose: true
        }
      ],
      '@babel/plugin-proposal-function-bind',
      '@babel/plugin-proposal-class-properties',
      '@babel/plugin-proposal-object-rest-spread'
    ]
  };
};
