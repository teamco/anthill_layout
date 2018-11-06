/**
 * Define base utils
 * @class Base
 * @constructor
 */
module.exports = class Base {

  /**
   * @constructor
   */
  constructor() {

    /**
     * Init underscore.
     * @property Base._
     */
    this._ = require('underscore');

    /**
     * @property Base.ts
     * @type {LibDateTime}
     */
    this.ts = new (require('./base/DateTime.js'));

    /**
     * @property Base.gen
     * @type {LibGenerator}
     */
    this.gen = new (require('./base/Generator.js'));

    /**
     * @property Base.str
     * @type {LibString}
     */
    this.str = new (require('./base/String.js'));

    /**
     * @property Base.str
     * @type {LibNumber}
     */
    this.num = new (require('./base/Number.js'));

    /**
     * @property Base.fn
     * @type {LibFunction}
     */
    this.fn = new (require('./base/Function.js'));

    /**
     * @property Base.array
     * @type {LibArray}
     */
    this.array = new (require('./base/Array.js'));

    /**
     * @property Base.css
     * @type {LibCss}
     */
    this.css = new (require('./base/Css.js'));
  }

  /**
   * Get static method
   * @memberOf Base
   * @param {string|array} component
   * @return {boolean}
   */
  getStatic(component) {

    /**
     * @property Base
     * @type {getType|*}
     */
    const method = this.constructor[component];
    if (!method) {
      return false;
    }
    return method;
  }

  /**
   * @method setBoolean
   * @memberOf Base
   * @param {boolean} instanceValue
   * @param {boolean} defaultValue
   * @return {boolean}
   */
  setBoolean(instanceValue, defaultValue) {
    return typeof instanceValue === 'undefined' ? defaultValue : instanceValue;
  }

  /**
   * Get object type
   * @memberOf Base
   * @param obj
   * @returns {string}
   */
  getType(obj) {
    return Object.prototype.toString.call(obj).match(/^\[object (.*)]$/)[1];
  }

  /**
   * Check if uuid has uuid format
   * @memberOf Base
   * @param {string} uuid
   * @returns {Array|{index: number, input: string}|*}
   */
  isUUID(uuid) {
    return uuid.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i);
  }

  /**
   * Check if url
   * @memberOf Base
   * @param {string} [url]
   * @returns {Array|{index: number, input: string}|*}
   */
  isUrl(url) {

    /**
     * Define regex
     * @type {RegExp}
     * https://gist.github.com/dperini/729294
     */
    this.isUrl.regex = new RegExp([
      '^',
      // protocol identifier
      '(?:(?:https?|ftp)://)',
      // user:pass authentication
      '(?:\\S+(?::\\S*)?@)?',
      '(?:',
      // IP address exclusion
      // private & local networks
      '(?!(?:10|127)(?:\\.\\d{1,3}){3})',
      '(?!(?:169\\.254|192\\.168)(?:\\.\\d{1,3}){2})',
      '(?!172\\.(?:1[6-9]|2\\d|3[0-1])(?:\\.\\d{1,3}){2})',
      // IP address dotted notation octets
      // excludes loopback network 0.0.0.0
      // excludes reserved space >= 224.0.0.0
      // excludes network & broadcast addresses
      // (first & last IP address of each class)
      '(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])',
      '(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}',
      '(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))',
      '|',
      // host name
      '(?:(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)',
      // domain name
      '(?:\\.(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)*',
      // TLD identifier
      '(?:\\.(?:[a-z\\u00a1-\\uffff]{2,}))',
      ')',
      // port number
      '(?::\\d{2,5})?',
      // resource path
      '(?:/\\S*)?',
      '$'
    ].join(''), 'i');

    return url ? url.match(this.isUrl.regex) : url;
  }

  /**
   * Define isBase64 matcher
   * @memberOf Base
   * @param {string} s
   * @returns {boolean}
   */
  isBase64(s) {

    /**
     * Define Base64 matcher
     * @type {RegExp}
     */
    this.isBase64.regex = /^@(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/;
    return s ? !!this.isBase64.regex.test(s) : s;
  }

  /**
   * Detecting data URLs
   * data URI - MDN https://developer.mozilla.org/en-US/docs/data_URIs
   * The "data" URL scheme: http://tools.ietf.org/html/rfc2397
   * Valid URL Characters: http://tools.ietf.org/html/rfc2396#section2
   * @memberOf Base
   * @param {string} [s]
   * @returns {boolean}
   */
  isDataURL(s) {

    /**
     * Define regex
     * @type {RegExp}
     */
    this.isDataURL.regex = /^data:.+\/(.+);base64,(.*)$/;
    return s ? !!s.match(this.isDataURL.regex) : s;
  }

  /**
   * Define wait for condition
   * @memberOf Base
   * @param {function} conditionFn
   * @param {function} callbackFn
   * @param {function} [fallbackFn]
   * @param {number} [timeout]
   */
  waitFor(conditionFn, callbackFn, fallbackFn, timeout) {

    // Init timeout
    timeout = timeout || 100;
    let wait;

    /**
     * @constant _poll
     * @private
     */
    const _poll = () => {

      // Define timeout instance
      wait = setTimeout(() => {
        timeout--;
        if (conditionFn()) {

          // External file loaded
          callbackFn();
          clearTimeout(wait);

        } else if (timeout > 0) {
          _poll();
        } else {

          // External library failed to load
          if (typeof(fallbackFn) === 'function') {
            fallbackFn();
          }
        }
      }, 100);
    };

    // Call timer
    _poll();
  }
};