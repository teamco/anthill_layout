/**
 * Created with RubyMine.
 * User: i061485
 * Date: 1/15/14
 * Time: 1:55 PM
 */

define([
], function defineBasePrototype() {

    /**
     * Define Prototype
     * @class Prototype
     * @constructor
     */
    var BasePrototype = function BasePrototype() {
    };

    BasePrototype.extend({

        /**
         * Preload method
         * @param {Array|*} Constructor
         * @param {String} method
         * @param defaultValue
         */
        preload: function preload(Constructor, method, defaultValue) {

            if (!anthill._base.isArray(Constructor)) {
                Constructor = [Constructor];
            }

            for (var i = 0, l = Constructor.length; i < l; i++) {
                Constructor[i].prototype[method] = Constructor[i].prototype[method] || defaultValue;
            }
        }

    });

    return new BasePrototype;

});