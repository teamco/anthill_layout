define([
], function defineSetting() {

    /**
     * Define Setting
     * @class Setting
     * @param {String} mode
     * @param {String} name
     * @constructor
     */
    var Setting = function Setting(scope, name) {

        /**
         * Define scope
         * @type {*}
         */
        this.scope = scope;

        /**
         * Define setting mode
         * @type {String}
         */
        this.mode = this.scope.controller.getMode();

        /**
         * Define setting storage
         * @type {{development: Storage}}
         */
        this.storage = {
            development: window.localStorage
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

        init: function init() {

            var storage = this.load();

            if (!anthill._base.isDefined(storage)) {

                this.save();

                /**
                 * Init storage
                 * @type {*}
                 */
                storage = this.load();
            }

            if (!anthill._base.isDefined(storage.token)) {

                /**
                 * Define token
                 * @type {String}
                 */
                this.token = anthill._base.lib.generator.UUID();

                this.save(storage);
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

            opts = anthill._base.define(opts, {}, true);

            var data = this.load(),
                _dt = anthill._base.lib.datetime;

            if (anthill._base.isDefined(data)) {

                /**
                 * Load created at
                 * @type {*}
                 */
                opts.createdAt = data.createdAt;

            } else {

                /**
                 * Define created at
                 * @type {*}
                 */
                opts.createdAt = _dt.timestamp();
            }

            /**
             * Define updated at
             * @type {*}
             */
            opts.updatedAt = _dt.timestamp();

            /**
             * Define token
             * @type {*}
             */
            opts.token = this.token;

            this.getStorage().setItem(
                this.getNameSpace(),
                JSON.stringify(opts)
            );

            this.scope.logger.debug('Save', opts);
        },

        /**
         * Load
         */
        load: function load() {

            /**
             * Define data
             * @type {*}
             */
            var data = JSON.parse(
                this.getStorage().getItem(
                    this.getNameSpace()
                )
            );

            this.scope.logger.debug('Load', data);
            return data;
        }
    });
});