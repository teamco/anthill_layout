module.exports = {
  'plugins': ['react'],
  'extends': [
    'eslint:recommended',
    'plugin:react/recommended'
  ],
  'parser': 'babel-eslint',
  'globals': {
    'module': false,
    'inject': false,
    'document': false
  },
  'env': {
    'browser': true,
    'amd': true,
    'node': true
  }
};