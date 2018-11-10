/**
 * Created by teamco on 7/15/15.
 */

/**
 * @export
 * @class WidgetGeneratorCore
 */
export class WidgetGeneratorCore {

  /**
   * Define create widget step
   * @memberOf WidgetGeneratorCore
   */
  nextWidgetGenerator() {

    /**
     * Define panel
     * @type {Panel}
     */
    const panel = this.getDesignTimePanel();

    /**
     * Get gallery
     * @type {Gallery}
     */
    const gallery = panel.controller.getGallery();

    if (gallery) {
      this.scope.view.showWidgetGenerator(
          gallery.model.staticData.getDefaultData(),
          gallery.model.dataTypes,
          this.model.getConfig('widget')
      );
    }
  }

  /**
   * Generate new widget
   * @memberOf WidgetGeneratorCore
   */
  generateNewWidget() {

    /**
     * @constant
     * @type {*|boolean|{category: string, collector: {}, $modal: ModalElement, validate: *, empty: number}}
     */
    const data = this._collectFormWidgetData();

    /**
     * Get create new widget route
     * @type {Routes.resources.createNewWidget|*}
     */
    const route = this.resources.createNewWidget;

    $.ajax({

      url: route[0],
      method: route[1],

      data: this.prepareXhrData({
        author_widget: data.collector,
        author_widget_clone: data.clone,
        author_widget_category: {
          name_index: data.category
        }
      }),

      beforeSend: this._beforeSendWidgetData.bind({
        controller: this,
        data: data
      }),

      error: this._onErrorSendWidgetData.bind({
        controller: this,
        data: data
      })

    }).done(
        this.generateNewWidgetCallback.bind(this)
    );
  }

  /**
   * Define callback for generate new widget
   * @memberOf WidgetGeneratorCore
   * @param data
   * @param status
   * @param xhr
   */
  generateNewWidgetCallback(data, status, xhr) {

    this._handleSuccessSendWidgetData(data, status, xhr);

    /**
     * Get $modal
     * @type {ModalElement|string}
     */
    const $modal = this.scope.view.get$modal();
    const msg = this.i18n.t('widget.generated.ok').replace(/\{1}/, data.name);

    // Show message
    $modal.handleNotification(msg, 'success');

    /**
     * Define panel
     * @type {Panel}
     */
    const panel = this.getDesignTimePanel();

    /**
     * Get gallery
     * @type {Gallery}
     */
    const gallery = panel.controller.getGallery();

    if (gallery) {
      gallery.model.staticData.addDefaultData(data);
    }

    this._clearWidgetForm();
    this.loadWidgetsList();
  }
}
  