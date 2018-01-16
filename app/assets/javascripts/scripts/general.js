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
       * @param module
       * @param [ext]
       * @returns {Array}
       * @private
       */
      function _filter(module, ext) {
        var amd = module + (ext || '') + '.js',
            data = _router[amd] ? [_router[amd]] : false;
        return data || Object.keys(_router).filter(function(key) {
          return key.match(new RegExp(amd.replace(/\./g, '\\.')));
        }).filter(function(x, i, a) {
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
              Object.assign([], modules).forEach(function(module, i) {
                var route = _filter(module, '.min');
                if (!route.length) {
                  route = _filter(module);
                }
                if (route[1]) {
                  window['console'].warn('Fix:', route, module);
                } else if (route.length === 1) {
                  var _map = _router[route[0]];
                  if (!_map) {
                    _map = route[0];
                  }
                  _map = _map.replace(/\.js/, '');
                  if (_map.match(/scripts\/plugins/)) {
                    _map = '../../' + _map;
                    if (_map.match(/mvc|\/element/)) {
                      _map = '../' + _map;
                    }
                    if (_map.match(/widgets/)) {
                      _map = '../' + _map;
                    }
                    // if (_map.match(/\.\.\/widgets\//)) {
                    //   _map = _map.replace(/\.\.\/widgets\//, '../../../plugins/widgets/');
                    // }
                    // if (_map.match(/\.\.\/plugins\/plugin\./)) {
                    //   _map = _map.replace(/\.\.\/plugins\/plugin\./, '../../../plugins/plugin./');
                    // }
                    // if (_map.match(/\.\.\/bar/)) {
                    //   _map = _map.replace(/\.\.\/bar/, '../../../plugins/bar');
                    // }
                    // if (_map.match(/\.\.\/gallery/)) {
                    //   _map = _map.replace(/\.\.\/gallery/, '../../../plugins/gallery');
                    // }
                    window['console'].warn('Module:', _map);
                  }
                  modules[i] = _map;
                } else {
                  window['console'].error('Unable to find module:', module);
                }
              });
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

        // 'bootstrap',
        'underscore',
        'lz-string',
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
        //loaderJs.unshift('jquery-ui');
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
