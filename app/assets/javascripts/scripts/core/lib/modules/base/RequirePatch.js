/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/4/12
 * Time: 9:24 PM
 * To change this template use File | Settings | File Templates.
 */
define(function defineBaseRequirePatch() {

    /**
     * Define BaseRequirePatch
     * @class BaseRequirePatch
     * @constructor
     */
    var BaseRequirePatch = function BaseRequirePatch() {
    };

    BaseRequirePatch.extend('BaseRequirePatch', {

        /**
         * Get requirejs config
         * @member BaseRequirePatch
         * @returns {*}
         */
        get: function get() {
            return requirejs.s.contexts._.config;
        },

        /**
         * Update config
         * @member BaseRequirePatch
         * @param opts
         */
        update: function update(opts) {

            // Get config
            var cfg = this.get();

            $.extend(cfg, opts || {}, true);
        }
    });

    return new BaseRequirePatch();
});