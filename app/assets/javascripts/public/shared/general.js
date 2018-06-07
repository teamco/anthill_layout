(function() {

  const script = document.getElementById('require-init'),
      dataset = script.dataset || {};

  /**
   * @method _load3rdParties
   * @private
   */
  function _load3rdParties() {
    require('../../scripts/core/lib/jquery/jquery.zoomooz.min.js');
  }

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
     * Define Setup
     * @returns Application
     * @private
     */
    function _setup() {
      const config = require('./javascript/config.js');
      require('./javascript/listeners.js');
      require('./javascript/permissions.js');

      const defaults = {
        user: user,
        uuid: uuid,
        version: version,
        activate: activated === 'true',
        environment: environment,
        appName: site,
        mode: mode
      };

      /**
       * @constant Application
       * @type {module.Application}
       */
      const Application = require('../../scripts/core/config/application.js');

      /**
       * Define application
       * @type {module.Application}
       */
      new Application({config: {...config, ...defaults} || {}});
    }
    _setup();
  }
  _loadPublic();
  _load3rdParties();
})();
