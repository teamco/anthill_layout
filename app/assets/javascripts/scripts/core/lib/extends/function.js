/**
 * Created with JetBrains RubyMine.
 * User: i061485
 * Date: 5/16/13
 * Time: 2:54 PM
 * To change this template use File | Settings | File Templates.
 */

(function addFunctionMethods() {

    if (!Function.prototype.bind) {

        /**
         * Define bind
         * @member Function
         * @param oThis
         * @returns {fBound}
         */
        Function.prototype.bind = function bind(oThis) {

            if (typeof this !== "function") {
                // closest thing possible to the ECMAScript 5 internal IsCallable function
                throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
            }

            var aArgs = Array.prototype.slice.call(arguments, 1),
                fToBind = this,

                /**
                 * Define fNOP
                 * @class fNOP
                 * @constructor
                 */
                fNOP = function fNOP() {
                },

                /**
                 * Define fBound
                 * @returns {*}
                 */
                fBound = function fBound() {
                    return fToBind.apply(this instanceof fNOP && oThis
                            ? this
                            : oThis,
                        aArgs.concat(Array.prototype.slice.call(arguments))
                    );
                };

            /**
             * Set fNOP prototype
             * @type {Object}
             */
            fNOP.prototype = this.prototype;

            /**
             * Set fBound prototype
             * @type {fNOP}
             */
            fBound.prototype = new fNOP();

            return fBound;
        };
    }

    // http://www.crockford.com/javascript/inheritance.html

    // First, the method method, which adds an instance method to a class.
    // This adds a public method to the Function.prototype, so all functions get it by
    // Class Augmentation.
    // It takes a name and a function, and adds them to a function's prototype object.
    // It returns this.

    /**
     * Function add Method
     * @member Function
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
     * @member Function
     */
    if (Function.prototype.name === undefined && Object.defineProperty !== undefined) {

        Object.defineProperty(Function.prototype, 'name', {

            /**
             * Get function name
             * @returns {String}
             */
            get: function get() {
                var funcNameRegex = /function\s+(.{1,})\s*\(/,
                    results = (funcNameRegex).exec((this).toString()),
                    aliases = ["", "anonymous", "Anonymous"],
                    cname = (results && results.length > 1) ? results[1] : "";

                return aliases.indexOf(cname) > -1 ? "Function" : cname;
            },

            set: function set(value) {
            }
        });
    }

    /**
     * Get Function Caller name
     * @member Function
     */
    Function.method('getCallerName', function getCallerName() {
        var cfn = this.caller;
        return typeof cfn === 'function' ? cfn.name : null;
    });

    /**
     * Extend Function prototype
     * @member Function
     */
    Function.method('extend', function extend() {

        var i = 0, l = arguments.length;

        function _extendMethod(node) {

            // Extend constructor as named instance
            if (typeof(node) === 'function') {
                var _proto = {};
                $.extend(true, _proto, this.prototype);
                this.inherits(node);
                $.extend(true, this.prototype, _proto);
            } else if (typeof(node) !== 'string') {
                // Set function name
                // Extend constructor prototype
                delete node.name;
                $.extend(true, this.prototype, node);
            } else this.prototype.name = node;
        }

        for (i; i < l; i += 1) {
            _extendMethod.bind(this)(arguments[i]);
        }

        return this;
    });

    /**
     * Clone function
     * @member Function
     */
    Function.method('clone', function clone() {

        var cloneObj = this;

        if (this.__isClone) {
            cloneObj = this.__clonedFrom;
        }

        var temp = function temp() {
            return cloneObj.apply(this, arguments);
        };

        for (var key in this) {
            temp[key] = this[key];
        }

        temp.__isClone = true;
        temp.__clonedFrom = cloneObj;

        return temp;
    });

    // Debouncing Javascript Methods
    // http://unscriptable.com/index.php/2009/03/20/debouncing-javascript-methods
    // The latest rendition takes two parameters:
    // the detection period (“threshold”) and a Boolean indicating whether the signal
    // should happen at the beginning of the detection period (true) or the end (“execAsap”).
    // Example uses:
    // using debounce in a constructor or initialization function to debounce
    // focus events for a widget (onFocus is the original handler):
    // this.debouncedOnFocus = this.onFocus.debounce(500, false);
    // this.inputNode.addEventListener('focus', this.debouncedOnFocus, false);
    // to coordinate the debounce of a method for all objects of a certain class, do this:
    // MyClass.prototype.someMethod = function () {
    //    /* do something here, but only once */
    // }.debounce(100, true); // execute at start and use a 100ms detection period
    if (!Function.prototype.debounce) {

        /**
         * Define function debounce
         * @member Function
         * @param [threshold]
         * @param [execAsap]
         * @returns {debounced}
         */
        Function.prototype.debounce = function debounce(threshold, execAsap) {
            // reference to original function
            var func = this,
            // handle to setTimeout async task (detection period)
                timeout;

            // return the new debounced function which executes the original function only once
            // until the detection period expires
            return function debounced() {
                // reference to original context object
                var obj = this,
                // arguments at execution time
                    args = arguments;

                // this is the detection function. it will be executed if/when the threshold expires
                function delayed() {
                    // if we're executing at the end of the detection period
                    if (!execAsap) {
                        // execute now
                        func.apply(obj, args);
                    }
                    // clear timeout handle
                    timeout = null;
                }

                // stop any current detection period
                if (timeout) {
                    clearTimeout(timeout);
                } else if (execAsap) {
                    // otherwise, if we're not already waiting and we're executing at the beginning of the detection period
                    // execute now
                    func.apply(obj, args);
                }

                // reset the detection period
                timeout = setTimeout(delayed, threshold || 100);
            };
        }
    }

}());