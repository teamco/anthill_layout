/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/4/12
 * Time: 9:24 PM
 * To change this template use File | Settings | File Templates.
 */
define([], function defineBaseFunction() {

    /**
     * Define Base function
     * @class BaseFunction
     * @constructor
     */
    var BaseFunction = function BaseFunction() {
    };

    BaseFunction.extend({

        defineConstructor: function defineConstructor() {

            /**
             * Define function
             * @type {Function}
             */
            var fn = new Function(
                scopeName,
                [
                    'return function ', mvcPattern,
                    '(', scopeName, ') { this.scope = ', scopeName, '; };'
                ].join('')
            );
        }

    });

    return new BaseFunction();

});