const System = require('npm');

System.config({
  'paths': {
    'app/*': './*',
    'js/*': './app/javascript/packs/*',
    'lib/*': './app/javascript/packs/lib/*',
    'config/*': './app/javascript/packs/core/config/*',
    'test/*': './test/unit/*'
  }
});