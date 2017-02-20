define(function defineProduction() {

  /**
   * Define Production mode
   * @class Production
   * @constructor
   * @extends BaseController
   */
  var Production = function Production() {
  };

  return Production.extend('Production', {

    /**
     * Define is production checker
     * @memberOf Production
     */
    isProduction: function isProduction() {

      // TODO until production
      return window.location.hostname !== 'localhost' ||
          this.getEnvironment() === 'production';
    },

    /**
     * Define load production mode
     * @memberOf Production
     */
    loadProduction: function loadProduction() {
      // TODO
    }
  });
});