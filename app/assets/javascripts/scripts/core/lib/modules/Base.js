define([
    'modules/base/Array',
    'modules/base/Function',
    'modules/base/Generator',
    'modules/base/Hash',
    'modules/base/HTML',
    'modules/base/Number',
    'modules/base/DateTime',
    'modules/base/String',
    'modules/base/Image',
    'modules/base/UA',
    'modules/base/File',
    'modules/base/Event',
    'modules/base/Css',
    'modules/base/RequirePatch'
], function defineBase(arr, fn, gen, hash, html, num, dt, str, img, ua, file, event, css, rpatch) {

    /**
     * Define base utils
     * @class Base
     * @constructor
     */
    var Base = function Base() {

        /**
         * Define shims
         * @type {Object|{
         *      array: LibArray,
         *      function: LibFunction,
         *      generator: LibGenerator,
         *      hash: LibHash,
         *      html: LibHTML,
         *      number: LibNumber,
         *      datetime: LibDateTime,
         *      string: LibString,
         *      image: LibImage,
         *      ua: LibUserAgent,
         *      file: LibFile,
         *      event: LibEvent,
         *      css: LibCss,
         *      rpatch: LibRequirePatch
         * }}
         */
        var Shims = {
            'array': arr,
            'function': fn,
            'generator': gen,
            'hash': hash,
            'html': html,
            'number': num,
            'datetime': dt,
            'string': str,
            'image': img,
            'ua': ua,
            'file': file,
            'event': event,
            'css': css,
            'rpatch': rpatch
        };

        /**
         * Define lib
         * @property Base
         */
        this.lib = {};

        /**
         * Get shim
         * @property Base
         * @param type
         * @returns {*}
         */
        this.getShims = function getShims(type) {
            return Shims[type];
        };

        for (var index in Shims) {

            if (Shims.hasOwnProperty(index)) {

                /**
                 * Define shims
                 * @type {*}
                 */
                this.lib[index] = this.getShims(index);
            }
        }
    };

    return Base.extend('Base', {

        /**
         * Get object type
         * @memberOf Base
         * @param obj
         * @returns {String}
         */
        getType: function getType(obj) {
            return Object.prototype.toString.call(obj).
                match(/^\[object (.*)\]$/)[1];
        },

        /**
         * Check if object defined
         * @memberOf Base
         * @param {*} o
         * @return {boolean}
         */
        isDefined: function isDefined(o) {
            return typeof o !== 'undefined' && o !== null;
        },

        /**
         * Check if object is blank
         * @memberOf Base
         * @param {String} o
         * @return {boolean}
         */
        isBlank: function isBlank(o) {
            return !this.isDefined(o) || this.isEmpty(o);
        },

        /**
         * Check if boolean
         * @memberOf Base
         * @param o
         * @returns {boolean}
         */
        isBoolean: function isBoolean(o) {
            return typeof o === 'boolean';
        },

        /**
         * Check if object is empty
         * @memberOf Base
         * @param {String|Array|jQuery} o
         * @returns {boolean}
         */
        isEmpty: function isEmpty(o) {
            if (this.isString(o)) {
                return $.trim(o).length === 0;
            } else if (this.isArray(o) || this.is$Object(o)) {
                return o.length === 0;
            }
            return false;
        },

        /**
         * Check if object string type
         * @memberOf Base
         * @param {String} o
         * @returns {boolean}
         */
        isString: function isString(o) {
            return this.getType(o).toLowerCase() === 'string';
        },

        /**
         * Check if array
         * @memberOf Base
         * @param a
         * @returns {boolean}
         */
        isArray: function isArray(a) {
            return this.getType(a).toLowerCase() === 'array';
        },

        /**
         * Check if object is instance of jQuery
         * @memberOf Base
         * @param o
         * @returns {boolean}
         */
        is$Object: function is$Object(o) {
            return o instanceof $;
        },

        /**
         * Check if object
         * @memberOf Base
         * @param o
         * @returns {boolean}
         */
        isObject: function isObject(o) {
            return !this.isArray(o) && typeof o === 'object' && this.isDefined(o);
        },

        /**
         * Check if function
         * @memberOf Base
         * @param o
         * @returns {boolean}
         */
        isFunction: function isFunction(o) {
            return typeof o === 'function';
        },

        /**
         * Check if value is numeric
         * @memberOf Base
         * @param n
         * @returns {boolean}
         */
        isNumber: function isNumber(n) {
            n = this.define(n, 0);
            return !!(isNaN(n) ? 0 : n);
        },

        /**
         * Check if uuid has uuid format
         * @memberOf Base
         * @param {string} uuid
         * @returns {Array|{index: number, input: string}|*}
         */
        isUUID: function isUUID(uuid) {
            return uuid.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i);
        },

        /**
         * Check if url
         * @memberOf Base
         * @param {string} [url]
         * @returns {Array|{index: number, input: string}|*}
         */
        isUrl: function isUrl(url) {

            /**
             * Define regex
             * @type {RegExp}
             * https://gist.github.com/dperini/729294
             */
            this.isUrl.regex = new RegExp(
                [
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
                ].join(''),
                'i'
            );

            return url ? url.match(this.isUrl.regex) : url;
        },

        /**
         * Define isBase64 matcher
         * @memberOf Base
         * @param {string} s
         * @returns {boolean}
         */
        isBase64: function isBase64(s) {

            /**
             * Define Base64 matcher
             * @type {RegExp}
             */
            this.isBase64.regex = /^@(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/;
            return s ? !!this.isBase64.regex.test(s) : s;
        },

        /**
         * Detecting data URLs
         * data URI - MDN https://developer.mozilla.org/en-US/docs/data_URIs
         * The "data" URL scheme: http://tools.ietf.org/html/rfc2397
         * Valid URL Characters: http://tools.ietf.org/html/rfc2396#section2
         * @memberOf Base
         * @param {string} [s]
         * @returns {boolean}
         */
        isDataURL: function isDataURL(s) {

            /**
             * Define regex
             * @type {RegExp}
             */
            this.isDataURL.regex = /^data:.+\/(.+);base64,(.*)$/;
            return s ? !!s.match(this.isDataURL.regex) : s;
        },

        /**
         * Define object if undefined
         * @memberOf Base
         * @param o
         * @param value
         * @param {Boolean} [force]
         * @returns {*}
         */
        define: function define(o, value, force) {
            if (!this.isDefined(o)) {
                o = value;
            } else if (typeof(o) !== typeof(value) && !!force) {
                o = value;
            }
            return o;
        },

        /**
         * Define boolean if undefined
         * @memberOf Base
         * @param o
         * @param value
         * @param [force]
         * @returns {*}
         */
        defineBoolean: function defineBoolean(o, value, force) {
            if (!this.isDefined(o)) {
                o = value;
            } else if (typeof(o) !== typeof(value) && force) {
                o = value;
            }
            return o;
        },

        /**
         * Define wait for condition
         * @memberOf Base
         * @param {function} conditionFn
         * @param {function} callbackFn
         * @param {function} fallbackFn
         */
        waitFor: function waitFor(conditionFn, callbackFn, fallbackFn) {

            var timeout = 100, wait;

            /**
             * Define poll
             * @private
             */
            var _poll = function _poll() {

                // Define timeout instance
                wait = setTimeout(function () {

                    timeout--;
                    if (conditionFn()) {

                        // External file loaded
                        callbackFn();
                        clearTimeout(wait)

                    } else if (timeout > 0) {

                        _poll();

                    } else {

                        // External library failed to load
                        fallbackFn();
                    }
                }, 100);
            };

            // Call timer
            _poll();
        }
    });
});