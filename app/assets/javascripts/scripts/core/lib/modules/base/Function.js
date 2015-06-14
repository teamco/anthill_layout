/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/4/12
 * Time: 9:24 PM
 * To change this template use File | Settings | File Templates.
 */
define([], function defineLibFunction() {

    /**
     * Define Lib function
     * @class LibFunction
     * @constructor
     */
    var LibFunction = function LibFunction() {
    };

    LibFunction.extend('LibFunction', {

        /**
         * Define function creator
         * @memberOf LibFunction
         * @param opts
         * @returns {Function}
         */
        create: function create(opts) {

            /**
             * Define function
             * @type {Function}
             */
            var fn = new Function(opts.params, opts.body);

            if (opts.scope) {

                // Add function to scope
                opts.scope[opts.name] = fn;

                return opts.scope[opts.name];
            }

            return fn;
        }
    });

    return new LibFunction();
});