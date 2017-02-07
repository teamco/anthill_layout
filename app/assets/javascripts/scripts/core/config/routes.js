/**
 * Created with RubyMine.
 * User: teamco
 * Date: 10/23/14
 * Time: 11:23 PM
 */

define(function defineRoutes() {

  /**
   * Define Routes
   * @class Routes
   * @constructor
   */
  var Routes = function Routes() {
  };

  return Routes.extend('Routes', {

    /**
     * Define route resources
     * @property Routes
     * @type {object}
     */
    resources: {},

    /**
     * Define route setter
     * @memberOf Routes
     * @param {string} route
     * @param {[string, string]} data
     */
    setRoute: function setRoute(route, data) {

      /**
       * Define route
       * @memberOf Routes
       * @type {string|string[]}
       */
      this.resources[route] = data;
    },

    /**
     * Prepare XHR data before send
     * @memberOf Routes
     * @param {object} [collector]
     * @returns {{authenticity_token: string}}
     */
    prepareXhrData: function prepareXhrData(collector) {

      collector = collector || {};

      /**
       * Define token
       * @type {Object|{authenticity_token: string}}
       */
      var data = {authenticity_token: ''}, index;

      data[this.getXCsrfParam()] = this.getXCsrfToken();

      for (index in collector) {
        if (collector.hasOwnProperty(index)) {
          if (data.hasOwnProperty(index)) {
            throw new Error('Duplicate params', index);
          } else {
            data[index] = collector[index];
          }
        }
      }

      return data;
    },

    /**
     * Get X-Csrf-Token param
     * @memberOf Routes
     * @returns {string}
     */
    getXCsrfParam: function getXCsrfParam() {
      return $('meta[name="csrf-param"]').attr('content');
    },

    /**
     * Get X-Csrf-Token
     * @memberOf Routes
     * @returns {string}
     */
    getXCsrfToken: function getXCsrfToken() {
      return $('meta[name="csrf-token"]').attr('content');
    }
  });
});