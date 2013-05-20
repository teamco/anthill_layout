requirejs([
    'modules/base/array',
    'modules/base/function',
    'modules/base/generator',
    'modules/base/hash',
    'modules/base/html',
    'modules/base/number',
    'modules/base/datetime',
    'modules/base/string',
    'modules/base/ua'
]);

define([
], function defineBase() {

    /**
     * Define base utils
     * @class Base
     * @constructor
     */
    var Base = function Base() {
    };

    Base.extend({

        lib: {},

        /**
         * Get object type
         * @param obj
         * @returns {String}
         */
        getType: function getType(obj) {
            return Object.prototype.toString.call(obj).match(/^\[object (.*)\]$/)[1];
        },
        /**
         * Check if object defined
         * @param {*} o
         * @return {boolean}
         */
        isDefined: function isDefined(o) {
            return typeof o !== 'undefined' && o !== null;
        },

        /**
         * Check if object is blank
         * @param {String} o
         * @return {boolean}
         */
        isBlank: function isBlank(o) {
            return !(this.isDefined(o)) || this.isEmpty(o);
        },

        /**
         * Check if object is empty
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
         * @param {String} o
         * @returns {boolean}
         */
        isString: function isString(o) {
            return this.getType(o).toLowerCase() === 'string';
        },

        // Check if array
        // Return: boolean
        isArray: function isArray(a) {
            return this.getType(a).toLowerCase() === 'array';
        },
        // Check if object is instance of $
        is$Object: function is$Object(o) {
            return o instanceof $;
        },
        // Check if object
        // Return: boolean
        isObject: function isObject(o) {
            return !this.isArray(o) && typeof o === 'object' && this.isDefined(o);
        },
        // Check if function
        // Return: boolean
        isFunction: function isFunction(o) {
            return typeof o === 'function';
        },
        // Check if value is numeric
        // Return: boolean
        isNumber: function isNumber(n) {
            n = this.define(n, 0);
            return !!(isNaN(n) ? 0 : n);
        },

        /**
         * Define object if undefined
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
        defineBoolean: function defineBoolean(o, value, force) {
            if (!this.isDefined(o)) {
                o = value;
            } else if (typeof(o) !== typeof(value) && force) {
                o = value;
            }
            return o;
        }

    });

    return Base;

});