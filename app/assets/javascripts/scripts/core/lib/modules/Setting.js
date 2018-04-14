/**
 * @constant Router
 * @type {Router}
 */
const Router = require('./Router.js');

/**
 * @constant LZString
 */
const LZString = require('../lz-string.js');

/**
 * Define Setting
 * @class Setting
 * @extends Router
 */
module.exports = class Setting extends Router {

  /**
   * @param {*} scope
   * @param {String} name
   * @constructor
   */
  constructor(scope, name) {

    super(name || 'Setting', scope);

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
     * @type {{
     *    localStorage: Storage,
     *    serverStorage: {setting: Setting, setItem: Function, getItem: Function, clear: Function}
     * }}
     */
    this.STORAGE_MODES = {
      localStorage: window.localStorage,
      serverStorage: this.serverStorage()
    };

    /**
     * Define setting storage
     * @property Setting
     * @type {{
     *    development: {setting: Setting, setItem: Function, getItem: Function, clear: Function},
     *    authorize: {setting: Setting, setItem: Function, getItem: Function, clear: Function},
     *    consumption: {setting: Setting, setItem: Function, getItem: Function, clear: Function},
     *    test: Storage
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

    this.init();
    this._name = name;
  }

  /**
   * @method getNameSpace
   * @property Setting
   * @return {String|*}
   */
  getNameSpace() {
    return this._name;
  }

  /**
   * Activate on save
   * @property Setting
   * @param {boolean} activate
   */
  activateOnSave(activate) {

    /**
     * Define activate
     * @property Setting
     * @type {boolean}
     */
    this.activate = activate;
  }

  /**
   * Set initial state
   * @property Setting
   * @param {boolean} state
   */
  setInitialState(state) {

    /**
     * Change state
     * @property Setting
     * @type {boolean}
     */
    this.initial = state;
  }

  /**
   * Get initial state
   * @property Setting
   * @returns {boolean}
   */
  getInitialState() {
    return this.initial;
  }

  /**
   * Get token
   * @property Setting
   * @returns {String}
   */
  getToken() {
    return this.token;
  }

  /**
   * Init storage
   * @property Setting
   */
  init() {

    this.setInitialState(true);

    /**
     * Load storage
     * @property Setting
     * @type {{token: string}}
     */
    const storage = this.load();

    /**
     * Define base
     * @type {*}
     */
    const base = this.base;

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
  }

  /**
   * Clear local storage
   * @property Setting
   */
  clear() {
    this.getStorage().clear();
  }

  /**
   * Get Storage
   * @property Setting
   * @method getStorage
   * @returns {*}
   */
  getStorage() {

    /**
     * Define storage
     * @type {*}
     */
    let storage = this.storage[this.mode];

    if (this.getInitialState() || this.scope.model.getConfig('loading')) {
      storage = this.cache;
    }

    return storage;
  }

  /**
   * Import data
   * @property Setting
   * @param data
   * @param {boolean} activate
   */
  importData(data, activate) {
    this.activateOnSave(activate);
    this.updateData(data);
  }

  /**
   * Update data
   * @property Setting
   * @param data
   */
  updateData(data) {

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
  }

  /**
   * Save
   * @property Setting
   * @param [opts]
   */
  save(opts) {

    /**
     * Init opts
     * @type {*}
     */
    opts = opts || {};

    const data = this.load(),
        _dt = this.base.lib.datetime;

    if (data.createdAt) {

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
  }

  /**
   * Load
   * @property Setting
   */
  load() {

    /**
     * Define compressed data
     * @type {string|*}
     */
    const compressed = this.getStorage().getItem(
        this.getNameSpace()
    );
    let data;

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
  }

  /**
   * Compress json
   * @property Setting
   * @param {string} json
   * @returns {string}
   */
  compress(json) {
    this.scope.logger.debug('compress', json);
    return LZString.compressToBase64(json);
  }

  /**
   * Decompress json
   * @property Setting
   * @param {string} compress
   * @returns {string}
   */
  decompress(compress) {
    this.scope.logger.debug('decompress', compress);
    return LZString.decompressFromBase64(compress);
  }

  /**
   * Define server side storage
   * @property Setting
   * @type {function}
   * @method serverStorage
   * @return {*}
   */
  serverStorage() {

    return {

      /**
       * Define setting
       */
      setting: this,

      /**
       * Set storage item
       * @property {STORAGE_MODES}
       */
      setItem(key, value) {

        /**
         * @method _send
         * @param opts
         * @private
         */
        function _send(opts) {
          $.ajax(opts).done(
              function _done(data, type, xhr) {

                setting.cache.setItem(key, value);
                setting.activateOnSave(false);

                scope.logger.debug(data.notice, arguments);

                scope.observer.publish(
                    scope.eventManager.eventList.updateStorageVersion,
                    [data.version, data.activated]
                );

                scope.observer.publish(scope.eventManager.eventList.afterUpdateStorage);
              }
          );
        }

        /**
         * Get setting
         * @type {Setting}
         */
        const setting = this.setting;

        /**
         * Get scope
         * @type {Application|{controller, eventManager}}
         */
        const scope = setting.scope;

        /**
         * Get create update site route
         * @type {string[]}
         */
        const route = scope.config.routes.updateSiteContent;

        // Define opts
        const opts = {

          dataType: 'json',

          url: route[0] + key,
          method: route[1],
          timeout: 30000,

          data: scope.controller.prepareXhrData({
            author_site_storage: {
              content: value
            },
            mode: this.setting.mode,
            activate: this.setting.activate
          })
        };

        setting.makeScreenshot(
            !scope.controller.isDevelopmentMode(),
            document.body,
            imgSrc => {
              opts.data.screenshot = imgSrc;
              _send(opts);
            }
        );
      },

      /**
       * Get storage item
       * @property {STORAGE_MODES}
       * @return {string}
       */
      getItem(key) {

        /**
         * Get cached data
         * @type {string}
         */
        return this.setting.cache.getItem(key);
      },

      /**
       * Clear storage
       * @property {STORAGE_MODES}
       */
      clear() {
        this.setting.save();
      }
    };
  }

  /**
   * Define screenshot maker
   * @property Setting
   * @param {boolean} make
   * @param [domElement]
   * @param {function} callback
   */
  makeScreenshot(make, domElement, callback) {
    make ? this.base.lib.image.resizeThumbnail(domElement, callback) : callback();
  }

};