/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/4/12
 * Time: 9:24 PM
 * To change this template use File | Settings | File Templates.
 */
define([
    'jquery',
    'modules/base'
], function defineBaseHash($, Base) {
    var BaseHash = function BaseHash() {
    };

    BaseHash.extend({
        /**
         * Extend hash
         * @param {{}} self
         * @param {{}} hash
         * @returns {{}}
         */
        extendHash: function extendHash(self, hash) {
            self = this.base.define(self, {}, true);
            hash = this.base.define(hash, {}, true);
            $.extend(true, self, hash);
            return self;
        },
        /**
         * Check if hash empty
         * @param {{}} o
         * @returns {boolean}
         */
        isHashEmpty: function isHashEmpty(o) {
            return this.hashLength(o) === 0;
        },
        /**
         * Check if Hash(h) has Key(k)
         * @param {{}} h
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
         * @param {{}} h
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
         * @param {{}} h
         * @returns {String}
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
         * @param {{}} h
         * @returns {Array}
         */
        hashKeys: function hashKeys(h) {
            var keys = [], k;
            for (k in h) {
                if (h.hasOwnProperty(k) && this.isHashKey(h, k)) {
                    keys.push(k);
                }
            }
            return keys;
        },
        /**
         * Get Hash length
         * @param {{}} o
         * @returns {Number}
         */
        hashLength: function hashLength(o) {
            return this.hashKeys(this.base.define(o, {}, true)).length;
        }
    }, Base);

    Base.prototype.lib.hash = new BaseHash();

});