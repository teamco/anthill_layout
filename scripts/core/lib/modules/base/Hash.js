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

        extendHash: function extendHash(self, hash) {
            self = this.base.define(self, {}, true);
            hash = this.base.define(hash, {}, true);
            $.extend(true, self, hash);
            return self;
        },

        // Check if hash empty
        // Return: boolean
        isHashEmpty: function isHashEmpty(o) {
            return this.hashLength(o) === 0;
        },
        // Check if Hash(h) has Key(k)
        // Return: boolean
        isHashKey: function isHashKey(h, k) {
            if (this.base.isObject(h)) {
                return h.hasOwnProperty(k);
            }
        },
        // Return: First hash element value
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
        // Return: First hash element's key
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
        // Equality-Two arrays are equal if they contain the same id attribute
        // and if each element is equal to (according to Object.==) the corresponding
        // element in the other array.
        // @opts = {}
        // @src = [{},{},..] or {}
        // @map = [{},{},..]
        // @key = String (Hash key)
        equalityHA: function equalityHA(opts) {
            var base = this.base;
            opts = base.define(opts, {}, true);

            var src = base.define(opts.src, {}),
                map = base.define(opts.map, {}),
                key = base.define(opts.key, 'undefined');
            if (!base.isArray(src)) {
                src = [src];
            }
            var obj = {};
            $.each(src, function equalityHALoop(i, o) {
                if (base.isDefined(o)) {
                    obj[o[key]] = $.grep(map, function equalityHAGrep(k, v) {
                        return (o[key] !== v[key]);
                    });
                    obj[o[key]] = map[o[key]];
                }
            }.bind(this));
            return obj;
        },
        // Returns two arrays, the first containing the elements of enum
        // for which the block evaluates to true, the second containing the rest.
        // @opts = {}
        // @src = [{},{},..] or {}
        // @map = [{},{},..]
        // @key = String (Hash key)
        partitionHA: function partitionHA(opts) {
            opts = this.base.define(opts, {});
            var src = this.base.define(opts.src, {}),
                map = this.base.define(opts.map, {}),
                key = this.base.define(opts.key, 'undefined');
            if (!this.base.isArray(src)) {
                opts.src = [src];
            }
            var eq = this.equalityHA(opts),
                obj = [];
            $.each(map, function partitionHALoop(k, v) {
                if (!this.isHashKey(eq, v[key])) {
                    obj.push(v);
                }
            }.bind(this));
            return [eq, obj];
        },
        // Find all Hash keys
        // Return: array
        hashKeys: function hashKeys(h) {
            var keys = [],
                k;
            for (k in h) {
                if (h.hasOwnProperty(k) && this.isHashKey(h, k)) {
                    keys.push(k);
                }
            }
            return keys;
        },
        // Check Hash length
        // Return: integer
        hashLength: function hashLength(o) {
            return this.hashKeys(this.base.define(o, {})).length;
        }
    }, Base);

    Base.prototype.lib.hash = new BaseHash();

});