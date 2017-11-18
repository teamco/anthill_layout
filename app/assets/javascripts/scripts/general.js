(function() {

  var script = document.getElementById('require-init'),
      dataset = script.dataset || {};

  /**
   * @method _overload
   * @param mode
   * @private
   */
  function _overload(mode) {
    if (typeof window.define === 'function') {
      var methods = ['define', 'require'],
          _router = window._router || {};

      methods.forEach(function(method) {
        var _method = method + 'P';

        /**
         * Overwrite original fn
         */
        window[_method] = function() {
          if (mode === 'production') {
            var modules = arguments[0];
            if (!Array.isArray(modules)) {
              modules = [modules];
            }
            var keys = Object.keys(_router);
            for (var i = 0; i < modules.length; i++) {
              var module = modules[i];
              var route = keys.filter(function(key) {
                return key.match(new RegExp(module + '.min.js'));
              });
              if (!route.length) {
                route = keys.filter(function(key) {
                  return key.match(new RegExp(module + '.js'));
                });
              }
              modules[i] = _router[route[0]].replace(/\.js/, '').replace(/scripts\/core\//, '');
            }
            arguments[0] = modules;
          }
          return this[method].apply(this, arguments);
        };
      });
    }
  }

  /**
   * Define public loader
   * @returns {boolean}
   * @private
   */
  function _loadPublic() {

    var site = dataset.resource,
        uuid = dataset.uuid,
        version = parseInt(dataset.current || 0, 10) || 1,
        user = dataset.user,
        mode = dataset.mode,
        activated = dataset.activated,
        environment = dataset.environment;

    var main = dataset.config || 'config/main';

    /**
     * Define Setup
     * @returns Application
     * @private
     */
    function _setup() {

      /**
       * Define loaderJs
       * @type {[*]}
       */
      var loaderJs = [

        'jquery',
        'bootstrap',
        'underscore',
        'lz-string',
        'jquery.ujs',
        'jquery.resizestop',
        'jquery.zoomooz',

        'extends/function',
        'extends/json',
        'extends/event',
        'extends/string',
        'extends/array',

        'config/listeners',
        'config/permissions',

        'public/' + site + '/javascript/listeners',
        'public/' + site + '/javascript/permissions'

      ];

      if (mode !== 'consumption') {
        loaderJs.unshift('jquery.ui');
      }

      requireP(loaderJs, function init() {

        requireP([
          'config/application',
          'public/' + site + '/javascript/config'
        ], function _initApplication(Application, config) {

          Object.assign(config, {
            user: user,
            uuid: uuid,
            version: version,
            activate: activated === 'true',
            environment: environment,
            appName: site,
            mode: mode
          });

          /**
           * Define application
           * @type {Application}
           */
          return new Application({config: config});
        });
      });
    }

    require([main], _setup);
  }

  _overload(dataset.environment);
  _loadPublic();

})();
