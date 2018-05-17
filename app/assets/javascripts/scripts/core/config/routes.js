/**
 * Created with RubyMine.
 * User: teamco
 * Date: 10/23/14
 * Time: 11:23 PM
 */

/**
 * Define Routes
 * @class Routes
 */
module.exports = class Routes {

  /**
   * @method initializer
   * @property Routes
   */
  initializer() {

    /**
     * @property Routes
     * @type {{}}
     */
    this.resources = {};
  }

  /**
   * Define route setter
   * @property Routes
   * @param {string} route
   * @param {[string, string]} data
   */
  setRoute(route, data) {

    /**
     * Define route
     * @property Routes
     * @type {string|string[]}
     */
    this.resources[route] = data;
  }

  /**
   * Prepare XHR data before send
   * @property Routes
   * @param [collector]
   * @return {Object|{authenticity_token: string}}
   */
  prepareXhrData(collector) {

    collector = collector || {};

    /**
     * Define token
     * @type {Number|Object|{authenticity_token: string}}
     */
    const data = {authenticity_token: ''};

    data[this.getXCsrfParam()] = this.getXCsrfToken();

    for (let index in collector) {
      if (collector.hasOwnProperty(index)) {
        if (data.hasOwnProperty(index)) {
          throw new Error('Duplicate params', index);
        }
        data[index] = collector[index];
      }
    }

    return data;
  }

  /**
   * Get X-Csrf-Token param
   * @property Routes
   * @returns {string}
   */
  getXCsrfParam() {
    return document.querySelector('meta[name="csrf-param"]').getAttribute('content');
  }

  /**
   * Get X-Csrf-Token
   * @property Routes
   * @returns {string}
   */
  getXCsrfToken() {
    return document.querySelector('meta[name="csrf-token"]').getAttribute('content');
  }
};
