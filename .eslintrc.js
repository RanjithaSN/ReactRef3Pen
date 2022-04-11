module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
    jest: true
  },
  extends: [
    'prettier',
    'prettier/@typescript-eslint',
    'prettier/babel',
    'prettier/react',
    'prettier/standard',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'eslint:recommended'
  ],
  plugins: [
    'import',
    'jest',
    '@typescript-eslint',
    'react-hooks',
    'unused-imports'
  ],
  globals: {
    jest: true,
    LOCALE_HASH: true,
    VERSION: true,
    BUILT: true,
    GIT_TIMESTAMPS: true,
    rg4js: true
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module'
  },
  rules: {
    'import/no-named-as-default': 0,
    'import/no-unresolved': [2, { commonjs: true, amd: true }],
    'import/named': 2,
    'import/namespace': 2,
    'import/default': 2,
    'import/export': 2,
    'no-unused-vars': 'off',
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': [
      'error',
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_'
      }
    ],
    '@typescript-eslint/adjacent-overload-signatures': 'error',
    '@typescript-eslint/array-type': 'error',
    '@typescript-eslint/ban-types': 'error',
    '@typescript-eslint/consistent-type-assertions': 'error',
    '@typescript-eslint/consistent-type-definitions': 'error',
    '@typescript-eslint/explicit-member-accessibility': [
      'off',
      {
        accessibility: 'explicit'
      }
    ],
    '@typescript-eslint/indent': 'off',
    '@typescript-eslint/member-delimiter-style': [
      'off',
      {
        multiline: {
          delimiter: 'none',
          requireLast: true
        },
        singleline: {
          delimiter: 'semi',
          requireLast: false
        }
      }
    ],
    '@typescript-eslint/member-ordering': 'error',
    '@typescript-eslint/no-empty-function': 'error',
    '@typescript-eslint/no-empty-interface': 'error',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-misused-new': 'error',
    '@typescript-eslint/no-namespace': 'error',
    '@typescript-eslint/no-parameter-properties': 'off',
    '@typescript-eslint/no-this-alias': 'error',
    '@typescript-eslint/no-use-before-define': [2, 'nofunc'],
    '@typescript-eslint/no-var-requires': 'error',
    '@typescript-eslint/prefer-for-of': 'error',
    '@typescript-eslint/prefer-function-type': 'error',
    '@typescript-eslint/prefer-namespace-keyword': 'error',
    '@typescript-eslint/quotes': ['error', 'single'],
    '@typescript-eslint/semi': ['error'],
    '@typescript-eslint/triple-slash-reference': 'error',
    '@typescript-eslint/type-annotation-spacing': 'off',
    '@typescript-eslint/unified-signatures': 'error',
    'array-bracket-spacing': ['error', 'never'],
    'arrow-body-style': 'off',
    'arrow-spacing': 'error',
    'arrow-parens': ['error', 'always'],
    'block-spacing': 'error',
    'brace-style': 'error',
    'class-methods-use-this': 'off',
    'comma-dangle': ['error', 'never'],
    'comma-spacing': 'error',
    'comma-style': 'error',
    'computed-property-spacing': ['error', 'never'],
    'consistent-return': 'off',
    curly: 'error',
    'default-case': 'error',
    eqeqeq: 'error',
    'func-call-spacing': 'error',
    'import/no-unresolved': [
      'error',
      {
        commonjs: true,
        amd: true
      }
    ],
    'import/no-cycle': [
      'error',
      {
        maxDepth: 1
      }
    ],
    'import/namespace': 'error',
    'import/default': 'error',
    'import/export': 'error',
    'import/no-dynamic-require': 'off',
    'import/no-named-as-default-member': 'off',
    'import/prefer-default-export': 'off',
    indent: [2, 2],
    'keyword-spacing': 'error',
    'linebreak-style': ['error', 'unix'],
    'max-len': ['off'],
    'no-control-regex': 'off',
    'no-restricted-imports': [
      'error',
      {
        patterns: ['../**/selfcare-ui/*', '../**/selfcare-core/*']
      }
    ],
    'no-trailing-spaces': 'error',
    'no-use-before-define': 'off',
    'no-var': 'error',
    'object-curly-spacing': [2, 'always'],
    'object-curly-newline': [
      'error',
      {
        ObjectExpression: {
          minProperties: 1
        },
        ObjectPattern: { 'multiline': true },
      }
    ],
    'object-property-newline': 'error',
    'operator-linebreak': ['error', 'after'],
    'prefer-const': 'error',
    'prefer-destructuring': [
      'error',
      {
        AssignmentExpression: {
          object: false
        }
      }
    ],
    'prefer-template': 'error',
    quotes: ['error', 'single'],
    'react/destructuring-assignment': 'off',
    'react/jsx-filename-extension': 'off',
    'react/no-did-update-set-state': 'off',
    'react/require-default-props': 'off',
    'react-hooks/rules-of-hooks': 'error', // Checks rules of Hooks
    'react-hooks/exhaustive-deps': 'off', // Checks effect dependencies
    'space-before-blocks': 'error',
    'space-before-function-paren': [
      'error',
      {
        anonymous: 'never',
        named: 'never',
        asyncArrow: 'always'
      }
    ],
    'import/extensions': 'off'
  },
  settings: {
    react: {
      createClass: 'createReactClass', // Regex for Component Factory to use,
      // default to "createReactClass"
      pragma: 'React', // Pragma to use, default to "React"
      version: 'detect'
    },
    'import/core-modules': [
      'react',
      'react-router',
      'react-dom',
      'react-dom/server',
      'ramda',
      'prop-types',
      'reselect',
      'html-to-react',
      'react-ga',
      'history',
      'rg4js',
      'classnames',
      'query-string',
      'Immutable'
    ],
    'import/resolver': {
      typescript: {},
      node: {
        paths: ['src', 'node_modules'],
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
        moduleDirectory: ['node_modules', 'src']
      },
      alias: {
        map: [
          ['selfcare-core', './selfcare-core'],
          ['@selfcare/core', './src/selfcare-core/src'],
          ['selfcare-ui', './selfcare-ui'],
          ['@selfcare/ui', './src/selfcare-ui/src/']
        ],
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json']
      }
    }
  }
};
