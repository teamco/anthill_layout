/**
 * Created by teamco on 10/1/14.
 */

defineP(function defineGalleryWidgets() {

  /**
   * Define gallery widgets
   * @class GalleryWidgets
   * @constructor
   * @param {GalleryModel} galleryModel
   */
  var GalleryWidgets = function GalleryWidgets(galleryModel) {

    /**
     * Define static gallery content
     * @property GalleryWidgets
     * @type {{
         *      name: string,
         *      description: string,
         *      thumbnail: string,
         *      dimensions: {width: number, height: number},
         *      is_external: boolean,
         *      external_resource: string,
         *      type: string,
         *      resource: string
         * }[]}
     */
    this.defaultData = [];

    /**
     * Define gallery model
     * @property GalleryWidgets
     * @type {GalleryModel}
     */
    this.galleryModel = galleryModel;
  };

  return GalleryWidgets.extend('GalleryWidgets', {

    /**
     * Load Default Data
     * @memberOf GalleryWidgets
     * @param {string} [key]
     * @param {string} [type]
     * @param {boolean} [reverse]
     * @returns {{
         *      name: string,
         *      description: string,
         *      thumbnail: string,
         *      is_external: boolean,
         *      external_resource: string,
         *      dimensions: {width: number, height: number},
         *      type: string,
         *      resource: string
         * }[]}
     */
    loadDefaultData: function loadDefaultData(key, type, reverse) {

      /**
       * Define local
       * @type {GalleryWidgets}
       */
      var galleryWidgets = this;

      /**
       * Define scope
       * @type {Gallery}
       */
      var scope = galleryWidgets.galleryModel.scope;

      /**
       * Define sort
       * @private
       */
      function _sortData() {

        // Store ordered data
        var data = typeof(key) === 'string' && typeof(type) === 'string' ?
            galleryWidgets.defaultData.sortByValue(key, type, reverse) :
            galleryWidgets.defaultData;

        galleryWidgets.setDefaultData({
          widgets: data
        });

        galleryWidgets.galleryModel.init();

        scope.observer.publish(
            scope.eventManager.eventList.setProviders
        );

        scope.observer.publish(
            scope.eventManager.eventList.setCurrentProvider,
            scope.model.currentProvider.key
        );
      }

      if (galleryWidgets.defaultData.length === 0) {

        /**
         * Get show widgets list route
         * @type {Array}
         */
        var route = scope.controller.resources.showWidgetsList;

        $.getJSON(
            route[0].replace(/\{0}/, scope.controller.getAppName()),
            function (json) {
              galleryWidgets.setDefaultData(json);
              _sortData();
            }
        );

      } else {

        _sortData();
      }
    },

    /**
     * Define default data setter
     * @memberOf GalleryWidgets
     * @param {{categories: Array, widgets: Array}} json
     */
    setDefaultData: function setDefaultData(json) {

      if (_.isUndefined(this.galleryModel.dataTypes)) {

        /**
         * Define provider types
         * @property GalleryModel
         * @type {object}
         */
        this.galleryModel.dataTypes = {};

        var category,
            i = 0, l = json.categories.length;

        for (; i < l; i++) {

          /**
           * Define category instance
           * @type {{name_index, name_value}}
           */
          category = json.categories[i];
          this.galleryModel.dataTypes[category.name_index] =
              category.name_value;
        }
      }

      /**
       * Set default data
       * @memberOf GalleryWidgets
       */
      this.defaultData = json.widgets;
    },

    /**
     * Define default data getter
     * @memberOf GalleryWidgets
     * @returns {{
         *      name: string,
         *      description: string,
         *      thumbnail: string,
         *      dimensions: {width: number, height: number},
         *      type: string,
         *      resource: string
         * }[]}
     */
    getDefaultData: function getDefaultData() {
      return this.defaultData;
    },

    /**
     * Update widget's data
     * @memberOf GalleryWidgets
     * @param {{widget, category}} json
     */
    updateDefaultData: function updateDefaultData(json) {

      /**
       * Get default data
       * @type {{
             *      name: string,
             *      description: string,
             *      thumbnail: string,
             *      is_external: boolean,
             *      external_resource: string,
             *      dimensions: {width: number, height: number},
             *      type: string,
             *      resource: string
             * }[]}
       */
      var data = this.getDefaultData(),
          i = 0, l = data.length;

      for (; i < l; i++) {

        if (data[i].id === json.widget.id) {

          /**
           * Define widget instance
           * @type {{
                     *      id: *,
                     *      uuid: *,
                     *      url: *,
                     *      external: *,
                     *      name: (*|string),
                     *      description: (*|string),
                     *      thumbnail: (*|string),
                     *      is_external: (*|boolean),
                     *      external_resource: (*|string),
                     *      dimensions: {width: *, height: *},
                     *      type,
                     *      resource: (*|string)
                     * }}
           */
          var widget = {
            id: data[i].id,
            uuid: data[i].uuid,
            url: data[i].url,
            is_external: data[i].is_external,
            external_resource: data[i].external_resource,
            name: json.widget.name,
            description: json.widget.description,
            thumbnail: json.widget.thumbnail,
            dimensions: {
              width: json.widget.width,
              height: json.widget.height
            },
            type: json.category.name_index,
            resource: json.widget.resource
          };

          // Update data
          data[i] = widget;

          this.galleryModel.scope.logger.debug('Update gallery model', widget);

          break;
        }
      }
    },

    /**
     * Define add default data
     * @memberOf GalleryWidgets
     * @param data
     */
    addDefaultData: function addDefaultData(data) {

      /**
       * Get scope
       * @type {GalleryModel}
       */
      var scope = this.galleryModel.scope;

      if (typeof data === 'string') {
        scope.logger.warn('Unable to update gallery', data);
        return false;
      }

      /**
       * Define widget instance
       * @type {{
             *      id: string,
             *      uuid: string,
             *      url: string,
             *      name: string,
             *      description: string,
             *      thumbnail: string,
             *      dimensions: {width: number, height: number},
             *      type: string,
             *      is_external: boolean,
             *      external_resource: string,
             *      resource: string
             * }}
       */
      var widget = {
        id: data.widget.id,
        uuid: data.widget.uuid,
        url: data.widget.url,
        name: data.widget.name,
        description: data.widget.description,
        thumbnail: data.widget.thumbnail,
        is_external: data.widget.is_external,
        external_resource: data.widget.external_resource,
        dimensions: {
          width: data.widget.width,
          height: data.widget.height
        },
        type: data.category.name_index,
        resource: data.widget.resource
      };

      // Update data
      this.defaultData.push(widget);

      scope.logger.debug('Update gallery model', widget);
    },

    /**
     * Check if resource already exist
     * @memberOf GalleryWidgets
     * @param {string} resource
     * @returns {boolean}
     */
    isExistResource: function isExistResource(resource) {

      if (!resource) {
        return false;
      }

      /**
       * Get gallery widgets
       * @type {{
             *      name: string,
             *      description: string,
             *      thumbnail: string,
             *      dimensions: {width: number, height: number},
             *      is_external: boolean,
             *      external_resource: string,
             *      type: string,
             *      resource: string
             * }[]}
       */
      var widgets = this.getDefaultData(),
          i = 0, l = widgets.length;

      for (; i < l; i++) {
        if (widgets[i].resource === resource) {
          return true;
        }
      }
    },

    /**
     * Define widget data getter
     * @memberOf GalleryWidgets
     * @param {string} type
     * @param {string} source
     * @returns {{
         *      name: string,
         *      description: string,
         *      thumbnail: string,
         *      dimensions: {width: number, height: number},
         *      is_external: boolean,
         *      external_resource: string,
         *      type: string,
         *      resource: string
         * }}
     */
    getWidgetData: function getWidgetData(type, source) {

      /**
       * Get default data
       * @type {{
             *      name: string,
             *      description: string,
             *      thumbnail: string,
             *      dimensions: {width: number, height: number},
             *      is_external: boolean,
             *      external_resource: string,
             *      type: string,
             *      resource: string
             * }[]}
       */
      var data = this.defaultData,
          i = 0,
          l = data.length;

      /**
       * Get scope
       * @type {Gallery}
       */
      var scope = this.galleryModel.scope;

      for (; i < l; i++) {

        if (data[i][type] === source) {

          scope.logger.debug('Get widget data', data[i]);
          return data[i];
        }
      }

      if (source !== 'external') {
        scope.logger.warn('Undefined widget data', source);
      }
    }
  });
});