/**
 * Created by teamco on 7/15/15.
 */

/**
 * @class WidgetGeneratorForm
 */
export class WidgetGeneratorForm {

  /**
   * Clear widget generate form
   * @memberOf WidgetGeneratorForm
   * @protected
   */
  _clearWidgetForm() {

    /**
     * Get $modal
     * @type {ModalElement}
     */
    const $modal = this.scope.view.get$modal();

    // Clear form
    $modal.collectInputFields({
      method: 'not',
      value: '[name="category"]'
    }).val('');

    // Clear image preview
    $modal.$.find('img').attr('src', '');
  }

  /**
   * Collect form widget's data
   * @memberOf WidgetGeneratorForm
   * @param {boolean} [external]
   * @returns {boolean|{
   *  category: string,
   *  collector: {},
   *  $modal: ModalElement,
   *  validate: *,
   *  empty: number
   * }}
   * @protected
   */
  _collectFormWidgetData(external) {

    // Convert to boolean
    external = !!external;

    /**
     * Get scope
     * @type {SiteConfig}
     */
    const scope = this.scope;

    /**
     * Get $modal
     * @type {ModalElement}
     */
    const $modal = scope.view.get$modal();

    const inputs = $modal.collectInputFields(),
        validate = inputs.hasClass('validate'),
        l = inputs.length;
    let empty = 0,
        i = 0,
        data;

    /**
     * Define collector
     * @type {{clone: string, scratch: string, visible: boolean, [category]}}
     */
    const collector = {
      clone: '',
      scratch: '',
      visible: true,
    };

    for (; i < l; i++) {
      data = inputs[i];
      collector[data.name] = data.value;
      $(data).blur();
      if (!data.value.length) empty++;
    }

    if (!collector['clone'].length && collector['scratch'] === 'true') {
      empty--;
    }

    /**
     * Define panel
     * @type {Panel}
     */
    const panel = this.getDesignTimePanel();

    /**
     * Get gallery
     * @type {Gallery|*}
     */
    const gallery = panel.controller.getGallery();
    let clone, category;

    if (gallery) {

      // Store category key
      category = this.base.lib.hash.getKeyByValue(
          gallery.model.dataTypes,
          collector.category
      );

      /**
       * Get widget resource
       * @type {string}
       */
      let resource = scope.view.elements.$widgetgenerator.getResource();

      if (collector.clone.length) {
        resource = (gallery.model.staticData.getWidgetData(
            'name', collector.clone
        ) || {}).resource;
      }

      if (!resource || !resource.length) {
        scope.logger.warn('Undefined resource', collector);
        return false;
      }

      /**
       * Get clone data
       * @type {{
       *  name: string,
       *  description: string,
       *  thumbnail: string,
       *  dimensions: {width: number, height: number},
       *  type: string,
       *  resource: string
       * }}
       */
      clone = gallery.model.staticData.getWidgetData(
          'resource',
          external ? 'external' :
              (collector.scratch === 'true' ? 'empty' : resource)
      ) || {};
    }

    // Define hash
    const hash = {
      clone: clone.resource,
      category: category,
      collector: collector,
      $modal: $modal,
      validate: validate,
      empty: empty
    };

    // Remove none permitted attribute
    delete collector.category;
    delete collector.clone;
    delete collector.scratch;

    return hash;
  }
}