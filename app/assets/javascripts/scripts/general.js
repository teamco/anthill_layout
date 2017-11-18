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

      /**
       * @method _filter
       * @param keys
       * @param module
       * @param ext
       * @private
       */
      function _filter(keys, module, ext) {
        var data = keys.filter(function(key) {
          return key.match(new RegExp(module + ext));
        });
        return data.filter(function(x, i, a) {
          return a.indexOf(x) === i;
        });
      }

      methods.forEach(function(method) {
        var _method = method + 'P';

        /**
         * Overwrite original fn
         */
        window[_method] = function() {
          if (mode === 'production') {
            var modules = [];
            if (typeof arguments[0] !== 'function') {
              modules = arguments[0];
              if (!Array.isArray(modules)) {
                modules = [modules];
              }
              var keys = Object.keys(_router);
              for (var i = 0; i < modules.length; i++) {
                var module = modules[i];
                var route = _filter(keys, module, '\\.min\\.js');
                if (!route.length) {
                  route = _filter(keys, module, '\\.js');
                  if (route.length > 1) {
                    window['console'].warn('Fix', route, module);
                  }
                }
                if (!_router[route[0]]) {
                  window['console'].warn('Unable to find module:', module);
                } else {
                  var filter = _router[route[0]].replace(/\.js/, '');
                  filter = filter.replace(/scripts\/core\//, '');
                  filter = filter.replace(/scripts\/plugins\//, '../../plugins/');
                  filter = filter.replace(/plugins\/plugin\./, '../plugin.');
                  modules[i] = filter;
                }
              }
              arguments[0] = modules;
            }
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
