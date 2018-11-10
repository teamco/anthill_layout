/**
 * @class WidgetGeneratorExternal
 */
export class WidgetGeneratorExternal {

  /**
   * Define import external widget step
   * @memberOf WidgetGeneratorExternal
   */
  nextWidgetExternal() {

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
      this.scope.view.showWidgetExternal(
          gallery.model.staticData.getDefaultData(),
          gallery.model.dataTypes,
          this.model.getConfig('widget')
      );
    }
  }

  /**
   * Generate external widget
   * @memberOf WidgetGeneratorExternal
   */
  generateExternalWidget() {

    /**
     * Get collector
     * @type {{
     *  category: string,
     *  collector: {},
     *  $modal: ModalElement,
     *  clone,
     *  validate: *,
     *  empty: number
     * }}
     */
    const data = this._collectFormWidgetData(true);

    /**
     * Get create new widget route
     * @type {Routes.resources.createExternalWidget|*}
     */
    const route = this.resources.createExternalWidget;

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
}