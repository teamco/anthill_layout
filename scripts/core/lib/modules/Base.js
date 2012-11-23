requirejs([
    'modules/base/array',
    'modules/base/function',
    'modules/base/generator',
    'modules/base/hash',
    'modules/base/html',
    'modules/base/number',
    'modules/base/datetime'
]);

define(['jquery'], function defineBase($) {
    var Base = function Base() {
    };

    Base.extend({

        lib: {},

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
                return $.trim(o).length === 0;
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
            return $.isArray(a);
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