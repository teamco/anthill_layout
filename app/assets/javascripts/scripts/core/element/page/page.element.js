/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/24/12
 * Time: 10:12 PM
 * To change this template use File | Settings | File Templates.
 */

define([
  'modules/Element'
], function definePageElement(BaseElement) {

  /**
   * Define page element
   * @param view
   * @param opts
   * @returns {*}
   * @constructor
   * @class PageElement
   * @extends BaseElement
   */
  var PageElement = function PageElement(view, opts) {
    return this._config(view, opts, $('<li />')).build({
      $container: opts.$container
    });
  };

  return PageElement.extend('PageElement', {

    /**
     * Set page padding
     * @param padding
     * @memberOf PageElement
     */
    setPadding: function setPadding(padding) {

      this.view.elements.$widgets.$.css({
        paddingTop: padding.top,
        paddingRight: padding.right,
        paddingBottom: padding.bottom,
        paddingLeft: padding.left
      });
    },

    /**
     * Define height
     * @memberOf PageElement
     */
    updateDimensions: function updateDimensions() {

      /**
       * Fetch page
       * @type {Page}
       */
      var scope = this.view.scope;

      this.$.removeClass('height-auto');

      /**
       * Get widget
       * @type {Widget}
       */
      var widget = scope.model.getCurrentItem();

      if (!widget.view) {
        scope.logger.debug(
            'Unable to set page height: Page without items (default 100%)');
        return false;
      }

      if (!widget.view.get$item()) {
        scope.logger.debug(
            'Unable to set page height: Initial state (default 100%)');
        return false;
      }

      /**
       * Calculate last occupied row
       * @type {*|number}
       */
      var lastOccupiedRow = widget.map.getLastOccupiedRow();

      /**
       * Get layout
       * @type {*|Layout}
       */
      var layout = scope.controller.getLayout();

      var height = lastOccupiedRow * layout.controller.minCellWidth() +
          (lastOccupiedRow + 1) * layout.config.grid.margin;

      var header = this.view.elements.$header,
          footer = this.view.elements.$footer,
          containerHeight = this.getRootContainer().height();

      var headerHeight = header.$ ? header.$.height() : 0,
          footerHeight = footer.$ ? footer.$.height() : 0,
          outerHeight = headerHeight + footerHeight;

      height = height ? height : containerHeight;

      if (height < containerHeight) {
        height = containerHeight;
      }

      var pageScrollHeight = parseInt(
              scope.model.getConfig('preferences').pageScrollHeight, 10) || 0,
          delta = height + outerHeight;

      if (pageScrollHeight > delta) {
        delta += (pageScrollHeight - delta);
      }

      this.setHeight(delta);
    },

    /**
     * Define page visibility
     * @memberOf PageElement
     * @param {boolean} visible
     */
    setVisibility: function setVisibility(visible) {
      this.$[(visible ? 'add' : 'remove') + 'Class']('current-page');
    }

  }, BaseElement.prototype);
});