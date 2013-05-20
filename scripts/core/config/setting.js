define([
    'modules/base'
], function defineSetting(Base) {

    /**
     * Define Setting
     * @class Setting
     * @extends {Base}
     * @param mode
     * @constructor
     */
    var Setting = function Setting(mode) {
        /**
         * Define setting mode
         * @type {String}
         */
        this.mode = mode;

        /**
         * Define setting storage
         * @type {{development: Storage}}
         */
        this.storage = {
            development: localStorage
        };
    };

    return Setting.extend({
        /**
         * Get Storage
         * @returns {*}
         */
        getStorage: function getStorage() {
            return this.storage[this.mode];
        },
        /**
         * Save
         * @param namespace
         * @param opts
         */
        save: function save(namespace, opts) {
            this.getStorage().setItem(
                namespace,
                this.base.define(opts, {}, true)
            );
        },
        /**
         * Load
         * @param namespace
         */
        load: function load(namespace) {
            this.getStorage().getItem(namespace);
        }
    }, Base);
});