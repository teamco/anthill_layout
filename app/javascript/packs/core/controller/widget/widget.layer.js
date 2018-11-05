/**
 * Created by teamco on 7/8/14.
 */

/**
 * @class WidgetLayer
 * @type {module.WidgetLayer}
 */
module.exports = class WidgetLayer {

  /**
   * Set widget layer up
   * @memberOf WidgetLayer
   * @param {boolean} save
   */
  setLayerUp(save) {
    this.map.updateLayer(true, save);
  }

  /**
   * Set widget layer down
   * @memberOf WidgetLayer
   * @param {boolean} save
   */
  setLayerDown(save) {
    this.map.updateLayer(false, save);
  }

  /**
   * Update layout z-index
   * @memberOf WidgetLayer
   * @param index
   */
  updateLayerIndex(index) {

    /**
     * Define config html
     * @type {{}}
     */
    const configHtml = this.model.getConfig('html');

    configHtml.zIndex = index;
    this.mode.setConfig('html', configHtml);
  }

  /**
   * Restore layer index
   * @memberOf WidgetLayer
   */
  restoreLayerIndex() {

    /**
     * Get containment
     * @type {module.Page|*}
     */
    const page = this.controller.getContainment();

    page.controller.revertLayer();
  }

  /**
   * Set widget always on top
   * @memberOf WidgetLayer
   * @param {boolean} ontop
   */
  setAlwaysOnTop(ontop) {
    this.view.get$item().moveOnTopLayer(ontop);

    /**
     * Get containment
     * @type {module.Page}
     */
    const page = this.controller.getContainment();
    page.controller.reorderLayers();
  }
};