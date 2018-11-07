/**
 * Created with RubyMine.
 * User: teamco
 * Date: 6/17/14
 * Time: 11:06 AM
 */

import {AntHill} from '../core/config/anthill';

/**
 * Define BaseGeolocation
 * @class BaseGeolocation
 * @constructor
 */
export class BaseGeolocation extends AntHill {

  /**
   * BaseGeolocation constructor
   * @constructor
   * @param {string} [name]
   * @param [scope]
   */
  constructor(name, scope) {
    super(name || 'BaseGeolocation', scope, false);
  }

  /**
   * Get Position
   * @memberOf BaseGeolocation
   * @param {Function} [callback]
   */
  getPosition(callback) {

    /**
     * Set Location callback
     * @param position
     * @returns {*}
     * @private
     */
    function _setLocation(position) {
      if (callback) {
        callback.bind(this)(position);
      }
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
          _setLocation.bind(this),
          this.geolocationErrorHandler.bind(this)
      );
    } else {
      this.geolocationErrorHandler({});
    }
  }

  /**
   * Error handler
   * @memberOf BaseGeolocation
   * @param [error]
   */
  geolocationErrorHandler(error) {

    /**
     * Define default message
     * @type {string}
     */
    let message = 'MapLocator is not supported by this browser';

    switch (error.code) {
      case error.PERMISSION_DENIED:
        message = 'User denied the request for MapLocator';
        break;
      case error.POSITION_UNAVAILABLE:
        message = 'Location information is unavailable';
        break;
      case error.TIMEOUT:
        message = 'The request to get user location timed out';
        break;
      case error.UNKNOWN_ERROR:
        message = 'An unknown error occurred';
        break;
    }

    if (!this.scope) {
      console.warn(message, error);
      return false;
    }

    this.scope.logger.warn(message, error);
  }
}