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
       * @private
       */
      function _filter(module, ext) {
        ext = ext || '';
        var data = Object.keys(_router).filter(function(key) {
          return key.match(new RegExp((module + ext + '.js').replace(/\./g, '\\.')));
        });

        // Unique array
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
              for (var i = 0; i < modules.length; i++) {
                var module = modules[i];
                var route = _filter(module, '.min');
                if (!route.length) {
                  route = _filter(module);
                  if (route.length > 1) {
                    if (module === 'element/header.element') {
                      module = 'scripts/core/' + module;
                      route = _filter(module);
                    } else {
                      window['console'].warn('Fix', route, module);
                    }
                  }
                }
                if (!_router[route[0]]) {
                  window['console'].warn('Unable to find module:', module);
                } else {
                  var filter = _router[route[0]].replace(/\.js/, '');
                  filter = filter.replace(/scripts\/core\//, '');
                  filter = filter.replace(/scripts\/plugins/, '../..');
                  filter = filter.replace(/\/bar\//, '/scripts/plugins/bar/');
                  filter = filter.replace(/\/dashboard\//, '/scripts/plugins/dashboard/');
                  filter = filter.replace(/\/gallery\//, '/scripts/plugins/gallery/');
                  filter = filter.replace(/\/maximize\//, '/scripts/plugins/maximize/');
                  filter = filter.replace(/\/page\.data\//, '/scripts/plugins/page.data/');
                  filter = filter.replace(/\/panel\//, '/plugins/panel/');
                  filter = filter.replace(/\/preferences\//, '/scripts/plugins/preferences/');
                  filter = filter.replace(/\/rules\//, '/scripts/plugins/rules/');
                  filter = filter.replace(/\/site\.config\//, '/scripts/plugins/site.config/');
                  filter = filter.replace(/\/widget\.rules\//, '/scripts/plugins/widget.rules/');
                  filter = filter.replace(/\/widgets\//, '/../plugins/widgets/');
                  filter = filter.replace(/\/workspace\.data\//, '/scripts/plugins/workspace.data/');
                  if (module.match(/plugin/)) {
                    window['console'].warn('plugin', _router[route[0]], filter);
                  }
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
