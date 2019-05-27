/**
 * Created with RubyMine.
 * User: teamco
 * Date: 10/23/14
 * Time: 11:23 PM
 */

import {BaseElement} from 'js/modules/Element';

/**
 * Define Routes
 * @class Routes
 */
export class Routes {

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
   * Get X-Csrf-Token param
   * @property Routes
   * @static
   * @returns {string}
   */
  static getXCsrfParam() {
    const csrf = BaseElement.getQs('meta[name="csrf-param"]');
    return csrf ? csrf.getAttribute('content') : '';
  }

  /**
   * Get X-Csrf-Token
   * @property Routes
   * @static
   * @returns {string}
   */
  static getXCsrfToken() {
    const csrf = BaseElement.getQs('meta[name="csrf-token"]');
    return csrf ? csrf.getAttribute('content') : '';
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

    data[Routes.getXCsrfParam()] = Routes.getXCsrfToken();

    for (let index in collector) {
      if (collector.hasOwnProperty(index)) {
        if (data.hasOwnProperty(index)) {
          throw new Error(`Duplicate params: ${index}`);
        }
        data[index] = collector[index];
      }
    }

    return data;
  }
}
