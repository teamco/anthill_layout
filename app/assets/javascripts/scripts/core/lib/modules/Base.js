define([
    'modules/base/Array',
    'modules/base/Function',
    'modules/base/Generator',
    'modules/base/Hash',
    'modules/base/HTML',
    'modules/base/Number',
    'modules/base/DateTime',
    'modules/base/String',
    'modules/base/UA'
], function defineBase(arr, fn, gen, hash, html, num, dt, str, ua) {

    /**
     * Define base utils
     * @class Base
     * @constructor
     */
    var Base = function Base() {

        /**
         * Define shims
         * @type {{
         *      array: *,
         *      function: *,
         *      generator: *,
         *      hash: *,
         *      html: *,
         *      number: *,
         *      datetime: *,
         *      string: *,
         *      ua: *
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
            'ua': ua
        };

        /**
         * Get shim
         * @member Base
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

    Base.extend({

        /**
         * Define lib
         * @memberOf Base
         */
        lib: {},

        /**
         * Get object type
         * @member Base
         * @param obj
         * @returns {String}
         */
        getType: function getType(obj) {
            return Object.prototype.toString.call(obj).match(/^\[object (.*)\]$/)[1];
        },
        /**
         * Check if object defined
         * @member Base
         * @param {*} o
         * @return {boolean}
         */
        isDefined: function isDefined(o) {
            return typeof o !== 'undefined' && o !== null;
        },

        /**
         * Check if object is blank
         * @member Base
         * @param {String} o
         * @return {boolean}
         */
        isBlank: function isBlank(o) {
            return !this.isDefined(o) || this.isEmpty(o);
        },

        /**
         * Check if boolean
         * @member Base
         * @param o
         * @returns {boolean}
         */
        isBoolean: function isBoolean(o) {
            return typeof o === 'boolean';
        },

        /**
         * Check if object is empty
         * @member Base
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
         * @member Base
         * @param {String} o
         * @returns {boolean}
         */
        isString: function isString(o) {
            return this.getType(o).toLowerCase() === 'string';
        },

        /**
         * Check if array
         * @member Base
         * @param a
         * @returns {boolean}
         */
        isArray: function isArray(a) {
            return this.getType(a).toLowerCase() === 'array';
        },

        /**
         * Check if object is instance of jQuery
         * @member Base
         * @param o
         * @returns {boolean}
         */
        is$Object: function is$Object(o) {
            return o instanceof $;
        },

        /**
         * Check if object
         * @member Base
         * @param o
         * @returns {boolean}
         */
        isObject: function isObject(o) {
            return !this.isArray(o) && typeof o === 'object' && this.isDefined(o);
        },

        /**
         * Check if function
         * @member Base
         * @param o
         * @returns {boolean}
         */
        isFunction: function isFunction(o) {
            return typeof o === 'function';
        },

        /**
         * Check if value is numeric
         * @member Base
         * @param n
         * @returns {boolean}
         */
        isNumber: function isNumber(n) {
            n = this.define(n, 0);
            return !!(isNaN(n) ? 0 : n);
        },

        /**
         * Check if uuid has uuid format
         * @member Base
         * @param {string} uuid
         * @returns {Array|{index: number, input: string}|*}
         */
        isUUID: function isUUID(uuid) {
            return uuid.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i);
        },

        /**
         * Check if url
         * @member Base
         * @param {string} url
         * @returns {Array|{index: number, input: string}|*}
         */
        isUrl: function isUrl(url) {
            return url.match(
                /^(http(?:s)?\:\/\/[a-zA-Z0-9\-]+(?:\.[a-zA-Z0-9\-]+)*\.[a-zA-Z]{2,6}(?:\/?|(?:\/[\w\-]+)*)(?:\/?|\/\w+\.[a-zA-Z]{2,4}(?:\?[\w]+\=[\w\-]+)?)?(?:\&[\w]+\=[\w\-]+)*)$/
            );
        },

        /**
         * Define object if undefined
         * @member Base
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
         * @member Base
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
        }
    });

    return Base.extend('Base');

});