/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/4/12
 * Time: 11:06 PM
 * To change this template use File | Settings | File Templates.
 */

/**
 * @constant BaseModel
 * @type {module.BaseModel}
 */
const BaseModel = require('../../../core/lib/modules/Model.js');

/**
 * @class GalleryModel
 * @extends BaseModel
 * @type {module.GalleryModel}
 */
module.exports = class GalleryModel extends BaseModel {

  /**
   * @constructor
   * @param {string} name
   * @param {Panel} scope
   */
  constructor(name, scope) {
    super(name || 'GalleryModel', scope, false);

    /**
     * Define data types
     * @property GalleryModel
     * @type {{strings}}
     */
    this.dataTypes = undefined;
  }

  /**
   * Define load static data
   * @memberOf GalleryModel
   */
  loadStaticData() {

    /**
     * @constant GalleryWidgets
     * @type {module.GalleryWidgets}
     */
    const GalleryWidgets = require('./model/gallery.widgets.js');

    /**
     * Define static data
     * @property GalleryModel
     * @type {module.GalleryWidgets}
     */
    this.staticData = new GalleryWidgets(this);

    // Load data
    this.staticData.loadDefaultData('name', 'string');
  }

  /**
   * Define init
   * @memberOf GalleryModel
   */
  init() {

    /**
     * Define providers
     * @property GalleryModel
     * @type {{indoor: {name: string, data: *[]}}}
     */
    this.providers = {
      all: {
        name: 'All widgets',
        key: 'all',
        data: this.staticData.getDefaultData()
      }
    };

    /**
     * Define default provider
     * @property GalleryModel
     * @type {{name: string, data: *[]}[]}
     */
    this.defaultProvider = this.getProvidersList().all;

    /**
     * Define current provider
     * @property GalleryModel
     * @type {{name: string, data: *[]}[]}
     */
    this.currentProvider = $.extend({}, this.defaultProvider);
  }

  /**
   * Get data provider
   * @memberOf GalleryModel
   * @param [provider]
   * @returns {*}
   */
  getDataProvider(provider) {
    return (provider || this.currentProvider).data;
  }

  /**
   * Get providers list
   * @memberOf GalleryModel
   * @returns {*}
   */
  getProvidersList() {
    return this.providers;
  }

  /**
   * Set provider as current
   * @memberOf GalleryModel
   * @param {string} key
   */
  setProviderAsCurrent(key) {

    /**
     * Define provider
     * @type {*}
     */
    let provider = this.providers[key];

    if (!provider) {
      provider = this.defaultProvider;
      this.scope.logger.warn('Undefined provider, set default', provider);
    }

    /**
     * Define current provider
     * @property GalleryModel
     * @type {{name: string, data: *[]}[]}
     */
    this.currentProvider = $.extend({}, provider);
    this.scope.logger.debug('Current provider', provider);
  }

  /**
   * Set widget to provider
   * @memberOf GalleryModel
   * @param {{type: string}} meta
   */
  setProvider(meta) {

    /**
     * Get providers list
     * @type {*}
     */
    const providers = this.getProvidersList();

    /**
     * Get data types
     * @type {{strings}}
     */
    const dataTypes = this.dataTypes;

    if (meta.type) {
      providers[meta.type] = providers[meta.type] || {
        name: dataTypes[meta.type] || meta.type,
        key: meta.type,
        data: []
      };
      providers[meta.type].data.push(meta);
    } else {
      providers.all.data.push(meta);
    }
  }
};