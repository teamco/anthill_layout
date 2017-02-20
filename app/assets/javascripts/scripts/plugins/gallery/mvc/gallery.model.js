/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/4/12
 * Time: 11:06 PM
 * To change this template use File | Settings | File Templates.
 */
define([
  'config/anthill',
  'modules/Model',
  'plugins/gallery/mvc/model/gallery.widgets'
], function defineGalleryModel(AntHill, BaseModel, GalleryWidgets) {

  /**
   * Define Gallery model
   * @extends AntHill
   * @extends BaseModel
   * @class GalleryModel
   * @constructor
   */
  var GalleryModel = function GalleryModel() {

    /**
     * Define data types
     * @property GalleryModel
     * @type {{strings}}
     */
    this.dataTypes = undefined;
  };

  return GalleryModel.extend('GalleryModel', {

    /**
     * Define load static data
     * @memberOf GalleryModel
     */
    loadStaticData: function loadStaticData() {

      /**
       * Define static data
       * @property GalleryModel
       * @type {GalleryWidgets}
       */
      this.staticData = new GalleryWidgets(this);

      // Load data
      this.staticData.loadDefaultData('name', 'string');
    },

    /**
     * Define init
     * @memberOf GalleryModel
     */
    init: function init() {

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
    },

    /**
     * Get data provider
     * @memberOf GalleryModel
     * @param [provider]
     * @returns {*}
     */
    getDataProvider: function getDataProvider(provider) {
      return (provider || this.currentProvider).data;
    },

    /**
     * Get providers list
     * @memberOf GalleryModel
     * @returns {*}
     */
    getProvidersList: function getProvidersList() {
      return this.providers;
    },

    /**
     * Set provider as current
     * @memberOf GalleryModel
     * @param {string} key
     */
    setProviderAsCurrent: function setProviderAsCurrent(key) {

      /**
       * Define provider
       * @type {*}
       */
      var provider = this.providers[key];

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
    },

    /**
     * Set widget to provider
     * @memberOf GalleryModel
     * @param {{type: string}} meta
     */
    setProvider: function setProvider(meta) {

      /**
       * Get providers list
       * @type {*}
       */
      var providers = this.getProvidersList();

      /**
       * Get data types
       * @type {{strings}}
       */
      var dataTypes = this.dataTypes;

      if (meta.type) {

        providers[meta.type] = this.base.define(
            providers[meta.type], {
              name: dataTypes[meta.type] || meta.type,
              key: meta.type,
              data: []
            },
            true
        );

        providers[meta.type].data.push(meta);

      } else {

        providers.all.data.push(meta);
      }
    }

  }, AntHill.prototype, BaseModel.prototype);
});