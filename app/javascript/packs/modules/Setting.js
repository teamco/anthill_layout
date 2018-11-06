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
 * @type {module.Setting}
 */
module.exports = class Setting extends Router {

  /**
   * @param {*} scope
   * @constructor
   */
  constructor(scope) {
    super('Setting', scope, false);

    /**
     * Define scope
     * @property Setting
     * @type {*}
     */
    this.scope = scope;

    /**
     * Define setting mode
     * @property Setting
     * @type {string}
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

    /**
     * Application name.
     * @property Setting
     * @type {string}
     */
    this._name = this.scope.model.getConfig('appName');

    this.activateOnSave(false);
    this.init();
  }

  /**
   * @method getNameSpace
   * @memberOf Setting
   * @return {String|*}
   */
  getNameSpace() {
    return this._name;
  }

  /**
   * Activate on save
   * @memberOf Setting
   * @param {boolean} activate
   */
  activateOnSave(activate) {

    /**
     * Define activate
     * @memberOf Setting
     * @type {boolean}
     */
    this.activate = activate;
  }

  /**
   * Set initial state
   * @memberOf Setting
   * @param {boolean} state
   */
  setInitialState(state) {

    /**
     * Change state
     * @memberOf Setting
     * @type {boolean}
     */
    this.initial = state;
  }

  /**
   * Get initial state
   * @memberOf Setting
   * @returns {boolean}
   */
  getInitialState() {
    return this.initial;
  }

  /**
   * Get token
   * @memberOf Setting
   * @returns {string}
   */
  getToken() {
    return this.token;
  }

  /**
   * Init storage
   * @memberOf Setting
   */
  init() {
    this.setInitialState(true);

    /**
     * Load storage
     * @memberOf Setting
     * @type {{token: string}}
     */
    const storage = this.load();

    if (!storage.token) {

      /**
       * Define token
       * @memberOf Setting
       * @type {string}
       */
      this.token = this.utils.gen.UUID();
      this.save(storage);
    }

    this.setInitialState(false);
  }

  /**
   * Clear local storage
   * @memberOf Setting
   */
  clear() {
    this.getStorage().clear();
  }

  /**
   * Get Storage
   * @memberOf Setting
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
   * @memberOf Setting
   * @param data
   * @param {boolean} activate
   */
  importData(data, activate) {
    this.activateOnSave(activate);
    this.updateData(data);
  }

  /**
   * Update data
   * @memberOf Setting
   * @param data
   */
  updateData(data) {

    /**
     * Set data
     * @type {*}
     */
    this.getStorage().setItem(this.getNameSpace(), this.compress(JSON.stringify(data)));
  }

  /**
   * Save
   * @memberOf Setting
   * @param [opts]
   */
  save(opts) {

    /**
     * Init opts
     * @type {*}
     */
    opts = opts || {};

    const data = this.load(),
        _dt = this.utils.ts;

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
   * @memberOf Setting
   */
  load() {

    /**
     * Define compressed data
     * @type {string|*}
     */
    const compressed = this.getStorage().getItem(this.getNameSpace());

    let data;

    try {

      /**
       * Define data
       * @type {*}
       */
      data = JSON.parse(this.decompress(compressed) || '{}');

    } catch (e) {

      this.scope.logger.warn('Unable to parse JSON', e);
      data = {};
    }

    this.scope.logger.debug('Load', data);
    return data;
  }

  /**
   * Compress json
   * @memberOf Setting
   * @param {string} json
   * @returns {string}
   */
  compress(json) {
    this.scope.logger.debug('compress', json);
    return LZString.compressToBase64(json);
  }

  /**
   * Decompress json
   * @memberOf Setting
   * @param {string} compress
   * @returns {string}
   */
  decompress(compress) {
    this.scope.logger.debug('decompress', compress);
    return LZString.decompressFromBase64(compress);
  }

  /**
   * Define server side storage
   * @memberOf Setting
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
       * @memberOf {STORAGE_MODES}
       */
      setItem(key, value) {

        /**
         * @method _send
         * @param opts
         * @private
         */
        function _send(opts) {
          $.ajax(opts).done((data, type, xhr) => {

            setting.cache.setItem(key, value);
            setting.activateOnSave(false);

            scope.logger.debug(data.notice, arguments);
            scope.observer.publish(scope.eventManager.eventList.updateStorageVersion, [data.version, data.activated]);
            scope.observer.publish(scope.eventManager.eventList.afterUpdateStorage);
          });
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
       * @memberOf {STORAGE_MODES}
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
       * @memberOf {STORAGE_MODES}
       */
      clear() {
        this.setting.save();
      }
    };
  }

  /**
   * Define screenshot maker
   * @memberOf Setting
   * @param {boolean} make
   * @param [domElement]
   * @param {function} callback
   */
  makeScreenshot(make, domElement, callback) {
    make ? this.base.lib.image.resizeThumbnail(domElement, callback) : callback();
  }

};