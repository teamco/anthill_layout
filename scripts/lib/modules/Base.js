var Base = function Base(adapter) {
    this.adapter = adapter;
};

jQuery.extend(true, Base.prototype, {

    defaultNumberType: 10,

    extendPrototype: function extendPrototype(self, hash) {
        jQuery.extend(true, self.prototype, hash);
    },

    getConstructorName: function getConstructorName(scope) {
        if (!this.isDefined(scope)) {
            return undefined;
        }
        // IE issue RegEx instead of constructor name
        var instance = scope.constructor.toString().match(/function (\w*)/);
        if (this.isDefined(instance)) {
            return instance[1];
        }
        return undefined;  // Undefined

    },
    // Check if object defined
    // Return: boolean
    isDefined: function isDefined(o) {
        return typeof o !== 'undefined' && o !== null;
    },
    isBlank: function isBlank(o) {
        return !(this.isDefined(o)) || this.isEmpty(o);
    },
    isEmpty: function isEmpty(o) {
        if (this.isString(o)) {
            return jQuery.trim(o).length === 0;
        } else if (this.isArray(o) || this.is$Object(o)) {
            return o.length === 0;
        }
        return false;
    },
    isString: function isString(o) {
        return this.isDefined(o) && typeof o === 'string';
    },
    // Check if array
    // Return: boolean
    isArray: function isArray(a) {
        return jQuery.isArray(a);
    },
    // Check if object is instance of jQuery
    is$Object: function is$Object(o) {
        return o instanceof jQuery;
    },
    // Check if object
    // Return: boolean
    isObject: function isObject(o) {
        return !this.isArray(o) && typeof o === 'object' && this.isDefined(o);
    },
    // Check if function
    // Return: boolean
    isFunction: function isFunction(o) {
        return typeof o === 'function' &&
            o instanceof Function;
    },
    // Check if value is numeric
    // Return: boolean
    isNumber: function isNumber(n) {
        n = this.define(n, 0);
        return !!(isNaN(n) ? 0 : n);
    },
    // Define object if undefined
    // Return: self || default value
    define: function define(o, value, force) {
        if (!this.isDefined(o)) {
            o = value;
        } else if (typeof(o) !== typeof(value) && force) {
            o = value;
        }
        return o;
    },
    // Check if hash empty
    // Return: boolean
    isHashEmpty: function isHashEmpty(o) {
        return jQuery.isEmptyObject(o);
    },
    // Check if Hash(h) has Key(k)
    // Return: boolean
    isHashKey: function isHashKey(h, k) {
        if (this.isObject(h)) {
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
        opts = this.define(opts, {});
        var src = this.define(opts.src, {}),
            map = this.define(opts.map, {}),
            key = this.define(opts.key, 'undefined');
        if (!this.isArray(src)) {
            src = [src];
        }
        var obj = {};
        jQuery.each(src, function equalityHALoop(i, o) {
            if (this.isDefined(o)) {
                obj[o[key]] = jQuery.grep(map, function equalityHAGrep(k, v) {
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
        opts = this.define(opts, {});
        var src = this.define(opts.src, {}),
            map = this.define(opts.map, {}),
            key = this.define(opts.key, 'undefined');
        if (!this.isArray(src)) {
            opts.src = [src];
        }
        var eq = this.equalityHA(opts),
            obj = [];
        jQuery.each(map, function partitionHALoop(k, v) {
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
        return this.hashKeys(this.define(o, {})).length;
    },
    // Pure JavaScript Flatten Array
    // Return: array
    simpleFlatten: function simpleFlatten(array) {
        var flat = [],
            i, l;
        array = this.define(array, []);
        for (i = 0, l = array.length; i < l; i++) {
            var type = Object.prototype.toString.call(array[i]).split(' ').pop().split(']').shift().toLowerCase();
            if (type) {
                flat = flat.concat(/^(array|collection|arguments|object)$/.test(type) ? this.flatten(array[i]) : array[i]);
            }
        }
        return flat;
    },
    // Removes undefined/null items from an Array
    // Return: Compact Array
    compact: function compact(array) {
        var res = [];
        array = this.define(array, []);
        jQuery.each(array, function (k, v) {
            if (App.base.isDefined(v)) {
                res.push(v);
            }
        });
        return res;
    },
    // Convert String to Integer
    // Return: integer || 0 if NaN
    str2int: function str2int(s, t) {
        var number = parseInt(s, this.define(t, this.defaultNumberType));
        return this.isNumber(number) ? number : 0;
    },
    // Convert String to Integer
    // Return: float || 0 if NaN
    str2float: function str2float(s, t) {
        var number = parseFloat(s, this.define(t, this.defaultNumberType));
        return this.isNumber(number) ? number : 0;
    },
    timestamp: function timestamp() {
        return Number(new Date());
    },
    // Generate UUID
    // http://www.ietf.org/rfc/rfc4122.txt
    createUUID: function createUUID() {
        var s = [];
        var hexDigits = '0123456789abcdef';
        var i;
        for (i = 0; i < 36; i++) {
            s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
        }
        // bits 12-15 of the time_hi_and_version field to 0010
        s[14] = '4';
        // bits 6-7 of the clock_seq_hi_and_reserved to 01
        s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);
        s[8] = s[13] = s[18] = s[23] = '-';
        return s.join('');
    },
    escapeHTML: function escapeHTML(text, escape) {
        if (this.isDefined(text)) {
            return escape ?
                // Escape the text with HTML encoding chars
                jQuery('<div/>').text(text).html() :
                // Unescape the text from HTML encoding chars
                jQuery('<div/>').html(text).text();
        } else {
            return typeof text;
        }
    },
    escapeHTMLSymbols: function escapeHTMLSymbols(text, source, target) {
        return this.escapeHTML(text, 1).replace(
            (new RegExp(source, 'gi')),
            target
        );
    }


});