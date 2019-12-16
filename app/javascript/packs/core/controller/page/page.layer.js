/**
 * Created by teamco on 7/9/14.
 */

/**
 * Define page layer
 * @class PageLayer
 * @constructor
 */
export class PageLayer {

  /**
   * Get container target widgets
   * @memberOf PageLayer
   * @param {Widget} source
   * @param {boolean} [up]
   * @returns {{}}
   */
  getTargetWidgetsData(source, up) {
    const targets = {
      widgets: {},
      minLayer: 16777271,
      maxLayer: 0
    };
    let widget, items = this.model.getItems(),
        index, layer, uuid;

    for (index in items) {
      if (Object.prototype.hasOwnProperty.call(items, index)) {

        /**
         * Define widget
         * @type {Widget}
         */
        widget = items[index];

        /**
         * Get widget UUID
         * @type {string}
         */
        uuid = widget.model.getUUID();

        if (source.model.getUUID() !== uuid) {
          targets.widgets[uuid] = widget;
          layer = widget.dom.zIndex;

          if (!layer || layer === 'auto') {
            layer = 0;
          }

          layer = up ? layer : layer + 1;

          if (targets.maxLayer < layer) {
            targets.maxLayer = layer;
          }

          if (targets.minLayer > layer) {
            targets.minLayer = layer;
          }

          this.scope.logger.debug('Adopt widget layer', widget, layer);
          widget.map.adoptLayer(layer, false);
        }
      }
    }

    this.scope.logger.debug('Get container target widgets', targets);
    return targets;
  }

  /**
   * Re-order layers before save
   * @memberOf PageLayer
   */
  reorderLayers() {
    let items = this.model.getItems(),
        minLayer = 16777271,
        maxLayer = 0,
        index, widget, layer,
        onTop;

    for (index in items) {
      if (Object.prototype.hasOwnProperty.call(items, index)) {

        /**
         * Define widget
         * @type {Widget}
         */
        widget = items[index];

        layer = widget.view.elements.$widget.getZIndex();
        widget.dom.zIndex = layer;

        if (!layer || layer === 'auto') {
          layer = 0;
        }

        if (minLayer > layer) {
          minLayer = layer;
        }

        if (maxLayer < layer) {
          maxLayer = layer;
        }

        if (widget.view.get$item().isOnTop()) {
          onTop = widget;
          this.scope.logger.debug('Get always on top widget', onTop);
        }

        widget.map.adoptLayer(widget.dom.zIndex - minLayer, true);
      }
    }

    if (onTop) {
      onTop.map.adoptLayer(maxLayer - minLayer + 2, true);
    }
  }

  /**
   * Revert layer
   * @memberOf PageLayer
   */
  revertLayer() {

    /**
     * Get page items
     * @type {*}
     */
    let items = this.model.getItems(),
        index, widget;

    for (index in items) {
      if (Object.prototype.hasOwnProperty.call(items, index)) {

        /**
         * Define widget
         * @type {Widget}
         */
        widget = items[index];
        widget.map.adoptLayer(widget.dom.zIndex || 'auto', false);
      }
    }
  }
}