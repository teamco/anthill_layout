(function bindFunction() {
    if (!Function.prototype.bind) {
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