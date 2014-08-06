/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/4/12
 * Time: 9:24 PM
 * To change this template use File | Settings | File Templates.
 */
define([], function defineBaseHash() {

    /**
     * Define Hash lib
     * @class BaseHash
     * @constructor
     */
    var BaseHash = function BaseHash() {
    };

    BaseHash.extend('BaseHash', {

        /**
         * Extend hash
         * @memberOf BaseHash
         * @param {*} hash
         * @param {*} defaults
         * @returns {*}
         */
        extendHash: function extendHash(hash, defaults) {
            defaults = defaults || {};
            hash = hash || {};
            $.extend(true, defaults, hash);
            return defaults;
        },

        /**
         * Check if hash empty
         * @memberOf BaseHash
         * @param {*} o
         * @returns {boolean}
         */
        isHashEmpty: function isHashEmpty(o) {
            return this.hashLength(o) === 0;
        },

        /**
         * Check if Hash(h) has Key(k)
         * @memberOf BaseHash
         * @param {*} h
         * @param {String} k
         * @returns {boolean}
         */
        isHashKey: function isHashKey(h, k) {
            if (typeof(h) === 'object') {
                return h.hasOwnProperty(k);
            }
        },

        /**
         * First hash element value
         * @memberOf BaseHash
         * @param {*} h
         * @returns {*}
         */
        firstHashElement: function firstHashElement(h) {
            var k;
            if (this.isHashEmpty(h)) {
                return false;
            }
            for (k in h) {
                if (h.hasOwnProperty(k)) {
                    break;
                }
            }
            return h[k];
        },

        /**
         * First hash element's key
         * @memberOf BaseHash
         * @param {*} h
         * @returns {Boolean|String}
         */
        firstHashKey: function firstHashKey(h) {
            var k;
            if (this.isHashEmpty(h)) {
                return false;
            }
            for (k in h) {
                if (h.hasOwnProperty(k)) {
                    break;
                }
            }
            return k;
        },

        /**
         * Find all Hash keys
         * @memberOf BaseHash
         * @param {*} h
         * @returns {Array}
         */
        hashKeys: function hashKeys(h) {
            if (Object.keys) {
                return Object.keys(h);
            }
            var keys = [], k;
            for (k in h) {
                if (this.isHashKey(h, k)) {
                    keys.push(k);
                }
            }
            return keys;
        },

        /**
         * Get Hash length
         * @memberOf BaseHash
         * @param {*} o
         * @returns {Number}
         */
        hashLength: function hashLength(o) {
            return this.hashKeys(o || {}).length;
        },

        /**
         * Get hash key by value
         * @memberOf BaseHash
         * @param {*} h
         * @param {*} v
         * @returns {string}
         */
        getKeyByValue: function getKeyByValue(h, v) {
            for (var prop in v) {
                if (this.hasOwnProperty(prop)) {
                    if (this[prop] === v)
                        return prop;
                }
            }
        }
    });

    return new BaseHash();

});