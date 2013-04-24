(function addFunctionMethods() {
    (function bindFunction() {
        if (!Function.prototype.bind) {
            /**
             * Function Bind method
             * @param context
             * @returns {*}
             */
            Function.prototype.bind = function bound(context) {
                if (typeof this !== 'function') {
                    // closest thing possible to the ECMAScript 5 internal IsCallable function
                    throw new TypeError('Function.prototype.bind - what is trying to be fBound is not callable');
                }
                // Callee
                var fn = this;
                var bindFn;
                // If no custom arguments bound -> use 'light' bound version
                if (arguments.length < 2) {
                    bindFn = function lightBind() {
                        if (!arguments.length) {
                            return fn.call(context);
                        }
                        return fn.apply(context, arguments);
                    };
                } else {
                    // Else -> use 'heavy' bound version
                    var fnSlice = Array.prototype.slice;
                    var args = (arguments.length > 1) && fnSlice.call(arguments, 1);
                    bindFn = function heavyBind() {
                        if (arguments.length) {
                            return fn.apply(context, args.concat(fnSlice.call(arguments)));
                        }
                        return fn.apply(context, args);
                    };
                }
                bindFn.displayName = fn.displayName || fn.name;
                return bindFn;
            };
            return true;
        }
        return false;
    }());
    // http://www.crockford.com/javascript/inheritance.html

    // First, the method method, which adds an instance method to a class.
    // This adds a public method to the Function.prototype, so all functions get it by
    // Class Augmentation.
    // It takes a name and a function, and adds them to a function's prototype object.
    // It returns this.

    /**
     * Function add Method
     * @param {string} name
     * @param {function} func
     * @returns {Function}
     */
    Function.prototype.method = function method(name, func) {
        this.prototype[name] = func;
        return this;
    };

    // Next comes the inherits method, which indicates that one class inherits from another.
    // It should be called after both classes are defined, but before the inheriting class's
    // methods are added.
    // Again, we augment Function. We make an instance of the parent class and use it as the
    // new prototype. We also correct the constructor field, and we add the uber method to
    // the prototype as well.
    // The uber method looks for the named method in its own prototype. This is the function
    // to invoke in the case of Parasitic Inheritance or Object Augmentation.
    // If we are doing Classical Inheritance, then we need to find the function in the
    // parent's prototype.
    // The return statement uses the function's apply method to invoke the function,
    // explicitly setting this and passing an array of parameters. The parameters (if any)
    // are obtained from the arguments array. Unfortunately, the arguments array is not a
    // true array, so we have to use apply again to invoke the array slice method.

    Function.method('inherits', function inherits(Parent) {
        var d = {},
            p = (this.prototype[Parent.name.toLowerCase()] = new Parent());
        this.method('uber', function uber(name) {
            if (!d.hasOwnProperty(name)) {
                d[name] = 0;
            }
            var f, r, t = d[name], v = Parent.prototype;
            if (t) {
                while (t) {
                    v = v.constructor.prototype;
                    t -= 1;
                }
                f = v[name];
            } else {
                f = p[name];
                if (f === this[name]) {
                    f = v[name];
                }
            }
            d[name] += 1;
            r = f.apply(this, Array.prototype.slice.apply(arguments, [1]));
            d[name] -= 1;
            return r;
        });
        return this;
    });

    // The swiss method loops through the arguments. For each name, it copies a
    // member from the parent's prototype to the new class's prototype.
    Function.method('swiss', function swiss(Parent) {
        var i, l = arguments.length;
        for (i = 1; i < l; i += 1) {
            var name = arguments[i];
            this.prototype[name] = Parent.prototype[name];
        }
        return this;
    });

    /**
     * Get Function name
     */
    if (Function.prototype.name === undefined && Object.defineProperty !== undefined) {
        Object.defineProperty(Function.prototype, 'name', {
            /**
             * Get function name
             * @returns {String}
             */
            get: function get() {
                var funcNameRegex = /function\s+(.{1,})\s*\(/;
                var results = (funcNameRegex).exec((this).toString());
                return (results && results.length > 1) ? results[1] : "";
            },
            set: function set(value) {}
        });
    }

    /**
     * Get Function Caller name
     */
    Function.method('getCallerName', function getCallerName() {
        return this.caller.name;
    });

    /**
     * Extend Function prototype
     */
    Function.method('extend', function extend() {
        var i = 0, l = arguments.length;

        function extendMethod(node) {
            if (typeof node === 'function') {
                var self = {};
                $.extend(true, self, this.prototype);
                this.inherits(node);
                $.extend(true, this.prototype, self);
            } else {
                $.extend(true, this.prototype, node);
            }
        }

        for (i; i < l; i += 1) {
            extendMethod.bind(this)(arguments[i]);
        }

        return this;
    });

    /**
     * String to CamelCase by dot separator
     * @member {Function} String
     * @param {String} (separator)
     * @returns {String}
     */
    String.prototype.toCamel = function toCamel(separator) {
        return this.replace(/(\.[a-z])/g, function ($1) {
            return $1.toUpperCase().replace(separator || '.', '');
        });
    };

    /**
     * String from CamelCase to point separator
     * @member {Function} String
     * @returns {String}
     */
    String.prototype.toPoint = function toPoint() {
        return this.replace(/([A-Z])/g, function ($1) {
            return "." + $1.toLowerCase();
        });
    };

    /**
     * String from CamelCase to underscore separator
     * @returns {string}
     */
    String.prototype.toUnderscore = function toUnderscore() {
        return this.replace(/([A-Z])/g, function ($1) {
            return "_" + $1.toLowerCase();
        });
    };

    /**
     * String from CamelCase to dash separator
     * @returns {string}
     */
    String.prototype.toDash = function toDash() {
        return this.replace(/([A-Z])/g, function ($1) {
            return "-" + $1.toLowerCase();
        });
    };

}());
