define([
], function defineSetting() {

    /**
     * Define Setting
     * @class Setting
     * @param {String} mode
     * @param {String} name
     * @constructor
     */
    var Setting = function Setting(mode, name) {

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
            development:  window.localStorage
        };

        /**
         * Get storage namespace
         * @returns {String}
         */
        this.getNameSpace = function getNameSpace() {
            return name;
        };

        this.init();

    };

    return Setting.extend({

        /**
         * Define local base
         * @type {Object}
         * @property
         * @member Setting
         */
        base: require('modules/base').prototype,

        init: function init() {

            var name = this.getNameSpace(),
                storage = this.load(name);

            if (!this.base.isDefined(storage)) {

                this.save();

                /**
                 * Init storage
                 * @type {*}
                 */
                storage = this.load(name);
            }

            if (!this.base.isDefined(storage.token)) {

                /**
                 * Define token
                 * @type {String}
                 */
                this.token = this.base.lib.generator.UUID();

                this.save(name, storage);
            }

        },

        /**
         * Clear local storage
         */
        clear: function clear() {
            window.localStorage.clear();
        },

        /**
         * Get Storage
         * @returns {*}
         */
        getStorage: function getStorage() {
            return this.storage[this.mode];
        },

        /**
         * Save
         * @param [opts]
         */
        save: function save(opts) {

            opts = this.base.define(opts, {}, true);

            /**
             * Define namespace
             * @type {String}
             */
            var namespace = this.getNameSpace();

            if (this.base.isDefined(this.load(namespace))) {

                /**
                 * Load created at
                 * @type {*}
                 */
                opts.createdAt = this.load(namespace).createdAt;

            } else {

                /**
                 * Define created at
                 * @type {*}
                 */
                opts.createdAt = this.base.lib.datetime.timestamp();
            }

            /**
             * Define updated at
             * @type {*}
             */
            opts.updatedAt = this.base.lib.datetime.timestamp();

            /**
             * Define token
             * @type {*}
             */
            opts.token = this.token;

            this.getStorage().setItem(
                namespace,
                JSON.stringify(opts)
            );
        },

        /**
         * Load
         * @param namespace
         */
        load: function load() {
            return JSON.parse(
                this.getStorage().getItem(this.getNameSpace())
            );
        }

    });
});