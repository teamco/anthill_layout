define([
    'config/anthill',
    'modules/Router'
], function defineSetting(AntHill, Router) {

    /**
     * Define Setting
     * @class Setting
     * @param {*} scope
     * @param {String} name
     * @constructor
     * @extends AntHill
     */
    var Setting = function Setting(scope, name) {

        /**
         * Define scope
         * @member Setting
         * @type {*}
         */
        this.scope = scope;

        /**
         * Define setting mode
         * @member Setting
         * @type {String}
         */
        this.mode = this.scope.controller.getMode();

        /**
         * Define storage modes
         * @member Setting
         * @type {{localStorage: Storage, serverStorage: Storage}}
         */
        this.STORAGE_MODES = {
            localStorage: window.localStorage,
            serverStorage: this.serverStorage()
        };

        /**
         * Define setting storage
         * @member Setting
         * @type {{
         *      development: Storage,
         *      authorize: Storage,
         *      consumption: Storage,
         *      test: Storage
         * }}
         */
        this.storage = {
            development: this.STORAGE_MODES.serverStorage,
            authorize: this.STORAGE_MODES.serverStorage,
            consumption: this.STORAGE_MODES.serverStorage,
            test: this.STORAGE_MODES.localStorage
        };

        /**
         * Define cache
         * @member Setting
         * @type {Storage}
         */
        this.cache = this.STORAGE_MODES.localStorage;

        /**
         * Get storage namespace
         * @member Setting
         * @returns {String}
         */
        this.getNameSpace = function getNameSpace() {
            return name;
        };

        this.init();
    };

    return Setting.extend('Setting', {

        /**
         * Set initial state
         * @member Setting
         * @param {boolean} state
         */
        setInititalState: function setInititalState(state) {

            /**
             * Change state
             * @type {boolean}
             */
            this.initial = state;
        },

        /**
         * Get initial state
         * @member Setting
         * @returns {boolean}
         */
        getInititalState: function getInititalState() {
            return this.initial;
        },

        /**
         * Get token
         * @member Setting
         * @returns {String}
         */
        getToken: function getToken() {
            return this.token;
        },

        /**
         * Init storage
         * @member Setting
         */
        init: function init() {

            this.setInititalState(true);

            /**
             * Load storage
             * @member Setting
             * @type {{}}
             */
            var storage = this.load();

            /**
             * Define base
             * @type {*}
             */
            var base = this.base;

            if (!base.isDefined(storage.token)) {

                /**
                 * Define token
                 * @member Setting
                 * @type {String}
                 */
                this.token = base.lib.generator.UUID();

                this.save(storage);
            }

            this.setInititalState(false);
        },

        /**
         * Clear local storage
         * @member Setting
         */
        clear: function clear() {
            this.getStorage().clear();
        },

        /**
         * Get Storage
         * @member Setting
         * @returns {*}
         */
        getStorage: function getStorage() {

            /**
             * Define storage
             * @type {*}
             */
            var storage = this.storage[this.mode];

            if (this.getInititalState() || this.scope.model.getConfig('loading')) {
                storage = this.cache;
            }

            return storage;
        },

        /**
         * Import data
         * @member Setting
         * @param data
         */
        importData: function importData(data) {

            /**
             * Set data
             * @type {*}
             */
            this.getStorage()[this.getNameSpace()] = this.compress(
                JSON.stringify(data)
            );
        },

        /**
         * Save
         * @member Setting
         * @param [opts]
         */
        save: function save(opts) {

            /**
             * Init opts
             * @type {*}
             */
            opts = this.base.define(opts, {}, true);

            var data = this.load(),
                _dt = this.base.lib.datetime;

            if (this.base.isDefined(data.createdAt)) {

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
                this.compress(
                    JSON.stringify(opts)
                )
            );

            this.scope.logger.debug('Save', opts);
        },

        /**
         * Load
         * @member Setting
         */
        load: function load() {

            /**
             * Define compressed data
             * @type {string|*}
             */
            var compressed = this.getStorage().getItem(
                this.getNameSpace()
            ), data;

            try {

                /**
                 * Define data
                 * @type {*}
                 */
                data = JSON.parse(
                    this.decompress(compressed) || '{}'
                );

            } catch (e) {

                this.scope.logger.warn('Unable to parse JSON', e);
                data = {};
            }

            this.scope.logger.debug('Load', data);

            return data;
        },

        /**
         * Compress json
         * @member Setting
         * @param {string} json
         * @returns {string}
         */
        compress: function compress(json) {
            this.scope.logger.debug('compress', json);
            return LZString.compressToBase64(json);
        },

        /**
         * Decompress json
         * @member Setting
         * @param {string} compress
         * @returns {string}
         */
        decompress: function decompress(compress) {
            this.scope.logger.debug('decompress', compress);
            return LZString.decompressFromBase64(compress)
        },

        /**
         * Define server side storage
         * @member Setting
         * @returns {{
         *      setting: Setting,
         *      setItem: Function,
         *      getItem: Function
         *      clear: Function
         * }}
         */
        serverStorage: function serverStorage() {

            return {

                /**
                 * Define scope
                 * @type {Setting}
                 */
                setting: this,

                /**
                 * Set storage item
                 * @member {STORAGE_MODES}
                 */
                setItem: function setItem(key, value) {

                    /**
                     * Get scope
                     * @type {App}
                     */
                    var scope = this.setting.scope;

                    /**
                     * Get create update site route
                     * @type {{string[]}}
                     */
                    var route = scope.config.routes.updateSiteContent,
                        opts = {

                            dataType: 'json',

                            url: route[0] + key,
                            method: route[1],

                            data: scope.controller.prepareXhrData({
                                author_site_storage: {
                                    content: value
                                }
                            })
                        };

                    $.ajax(opts).done(function (data, type, xhr) {

                        this.setting.cache.setItem(key, value);

                        scope.logger.debug(data.notice, arguments);
                        scope.observer.publish(
                            scope.eventmanager.eventList.updateStorageVersion,
                            data.version
                        );

                    }.bind(this));
                },

                /**
                 * Get storage item
                 * @member {STORAGE_MODES}
                 * @return {string}
                 */
                getItem: function getItem(key) {

                    /**
                     * Get cached data
                     * @type {string}
                     */
                    return this.setting.cache.getItem(key);
                },

                /**
                 * Clear storage
                 * @member {STORAGE_MODES}
                 */
                clear: function clear() {
                    this.setting.save();
                }
            }
        }

    }, AntHill.prototype, Router);
});