/**
 * @type {Application}
 */
const Application = require('./core/config/application.js');

(function() {

  const script = document.getElementById('require-init'),
      dataset = script.dataset || {};

  /**
   * Define public loader
   * @returns {boolean}
   * @private
   */
  function _loadPublic() {

    const site = dataset.resource,
        uuid = dataset.uuid,
        version = parseInt(dataset.current || 0, 10) || 1,
        user = dataset.user,
        mode = dataset.mode,
        activated = dataset.activated,
        environment = dataset.environment;

    /**
     * @method _localJs
     * @param file
     * @return {string}
     * @private
     */
    function _localJs(file) {
      return './../public/' + site + '/javascript/' + file;
    }

    /**
     * Define Setup
     * @returns Application
     * @private
     */
    function _setup() {

      if (mode !== 'consumption') {
        //loaderJs.unshift('jquery-ui');
      }

      // const config = require(_localJs('config.js'));
      //
      // Object.assign(config, {
      //   user: user,
      //   uuid: uuid,
      //   version: version,
      //   activate: activated === 'true',
      //   environment: environment,
      //   appName: site,
      //   mode: mode
      // });

      /**
       * Define application
       * @type {Application}
       */
      window.anthill = new Application({config: {}});
    }

    _setup();
  }

  _loadPublic();

})();
