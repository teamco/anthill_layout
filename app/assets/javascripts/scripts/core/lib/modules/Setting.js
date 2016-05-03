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
         * @property Setting
         * @type {*}
         */
        this.scope = scope;

        /**
         * Define setting mode
         * @property Setting
         * @type {String}
         */
        this.mode = this.scope.controller.getMode();

        /**
         * Define storage modes
         * @property Setting
         * @type {{localStorage: Storage, serverStorage: Storage}}
         */
        this.STORAGE_MODES = {
            localStorage: window.localStorage,
            serverStorage: this.serverStorage()
        };

        /**
         * Define setting storage
         * @property Setting
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
         * @property Setting
         * @type {Storage}
         */
        this.cache = this.STORAGE_MODES.localStorage;

        this.activateOnSave(false);

        /**
         * Get storage namespace
         * @property Setting
         * @returns {String}
         */
        this.getNameSpace = function getNameSpace() {
            return name;
        };

        this.init();
    };

    return Setting.extend('Setting', {

        /**
         * Activate on save
         * @memberOf Setting
         * @param {boolean} activate
         */
        activateOnSave: function activateOnSave(activate) {

            /**
             * Define activate
             * @property Setting
             * @type {boolean}
             */
            this.activate = activate;
        },

        /**
         * Set initial state
         * @memberOf Setting
         * @param {boolean} state
         */
        setInitialState: function setInitialState(state) {

            /**
             * Change state
             * @property Setting
             * @type {boolean}
             */
            this.initial = state;
        },

        /**
         * Get initial state
         * @memberOf Setting
         * @returns {boolean}
         */
        getInitialState: function getInitialState() {
            return this.initial;
        },

        /**
         * Get token
         * @memberOf Setting
         * @returns {String}
         */
        getToken: function getToken() {
            return this.token;
        },

        /**
         * Init storage
         * @memberOf Setting
         */
        init: function init() {

            this.setInitialState(true);

            /**
             * Load storage
             * @memberOf Setting
             * @type {{token: string}}
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
                 * @property Setting
                 * @type {String}
                 */
                this.token = base.lib.generator.UUID();

                this.save(storage);
            }

            this.setInitialState(false);
        },

        /**
         * Clear local storage
         * @memberOf Setting
         */
        clear: function clear() {
            this.getStorage().clear();
        },

        /**
         * Get Storage
         * @memberOf Setting
         * @returns {*}
         */
        getStorage: function getStorage() {

            /**
             * Define storage
             * @type {*}
             */
            var storage = this.storage[this.mode];

            if (this.getInitialState() || this.scope.model.getConfig('loading')) {
                storage = this.cache;
            }

            return storage;
        },

        /**
         * Import data
         * @memberOf Setting
         * @param data
         * @param {boolean} activate
         */
        importData: function importData(data, activate) {

            this.activateOnSave(activate);
            this.updateData(data);
        },

        /**
         * Update data
         * @memberOf Setting
         * @param data
         */
        updateData: function updateData(data) {

            /**
             * Set data
             * @type {*}
             */
            this.getStorage().setItem(
                this.getNameSpace(),
                this.compress(
                    JSON.stringify(data)
                )
            );
        },

        /**
         * Save
         * @memberOf Setting
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

            this.importData(opts, false);

            this.scope.logger.debug('Save', opts);
        },

        /**
         * Load
         * @memberOf Setting
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
         * @memberOf Setting
         * @param {string} json
         * @returns {string}
         */
        compress: function compress(json) {
            this.scope.logger.debug('compress', json);
            return LZString.compressToBase64(json);
        },

        /**
         * Decompress json
         * @memberOf Setting
         * @param {string} compress
         * @returns {string}
         */
        decompress: function decompress(compress) {
            this.scope.logger.debug('decompress', compress);
            return LZString.decompressFromBase64(compress)
        },

        /**
         * Define server side storage
         * @memberOf Setting
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
                 * @memberOf {STORAGE_MODES}
                 */
                setItem: function setItem(key, value) {

                    function _send(opts) {
                        $.ajax(opts).done(
                            function _done(data, type, xhr) {

                                setting.cache.setItem(key, value);
                                setting.activateOnSave(false);

                                scope.logger.debug(data.notice, arguments);

                                scope.observer.publish(
                                    scope.eventmanager.eventList.updateStorageVersion,
                                    [data.version, data.activated]
                                );

                                scope.observer.publish(
                                    scope.eventmanager.eventList.afterUpdateStorage
                                );
                            }
                        );
                    }

                    /**
                     * Get setting
                     * @type {Setting}
                     */
                    var setting = this.setting;

                    /**
                     * Get scope
                     * @type {Application}
                     */
                    var scope = setting.scope;

                    /**
                     * Get create update site route
                     * @type {string[]}
                     */
                    var route = scope.config.routes.updateSiteContent;

                    // Define opts
                    var opts = {

                        dataType: 'json',

                        url: route[0] + key,
                        method: route[1],

                        data: scope.controller.prepareXhrData({
                            author_site_storage: {
                                content: value
                            },
                            activate: this.setting.activate
                        })
                    };

                    setting.makeScreenshot(
                        !scope.controller.isDevelopmentMode(),
                        document.body,
                        function _makeScreenshot(imgSrc) {
                            opts.data.screenshot = imgSrc;
                            _send(opts);
                        }
                    );
                },

                /**
                 * Get storage item
                 * @memberOf {STORAGE_MODES}
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
                 * @memberOf {STORAGE_MODES}
                 */
                clear: function clear() {
                    this.setting.save();
                }
            }
        },

        /**
         * Define screenshot maker
         * @memberOf Setting
         * @param {boolean} make
         * @param [domElement]
         * @param {function} callback
         */
        makeScreenshot: function makeScreenshot(make, domElement, callback) {
            make ?
                this.base.lib.image.resizeThumbnail(domElement, callback) :
                callback();
        }

    }, AntHill.prototype, Router);
});