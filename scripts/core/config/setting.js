define([
    'modules/base'
], function defineSetting(Base) {

    var Setting = function Setting(mode) {
        /**
         * Define setting mode
         * @type {setting.mode}
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