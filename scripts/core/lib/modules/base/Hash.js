/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/4/12
 * Time: 9:24 PM
 * To change this template use File | Settings | File Templates.
 */
define([
    'modules/base'
], function defineBaseHash(Base) {

    /**
     * Define Hash lib
     * @class BaseHash
     * @constructor
     */
    var BaseHash = function BaseHash() {
    };

    BaseHash.extend({

        /**
         * Extend hash
         * @param {*} hash
         * @param {*} defaults
         * @returns {*}
         */
        extendHash: function extendHash(hash, defaults) {
            defaults = this.base.define(defaults, {}, true);
            hash = this.base.define(hash, {}, true);
            $.extend(true, defaults, hash);
            return defaults;
        },

        /**
         * Check if hash empty
         * @param {*} o
         * @returns {boolean}
         */
        isHashEmpty: function isHashEmpty(o) {
            return this.hashLength(o) === 0;
        },

        /**
         * Check if Hash(h) has Key(k)
         * @param {*} h
         * @param {String} k
         * @returns {boolean}
         */
        isHashKey: function isHashKey(h, k) {
            if (this.base.isObject(h)) {
                return h.hasOwnProperty(k);
            }
        },

        /**
         * First hash element value
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
         * @param {*} h
         * @returns {Array}
         */
        hashKeys: function hashKeys(h) {
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
         * @param {*} o
         * @returns {Number}
         */
        hashLength: function hashLength(o) {
            return this.hashKeys(this.base.define(o, {}, true)).length;
        },

        /**
         * Get hash key by value
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

    }, Base);

    Base.prototype.lib.hash = new BaseHash();

});