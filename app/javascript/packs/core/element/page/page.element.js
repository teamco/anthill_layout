/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/24/12
 * Time: 10:12 PM
 * To change this template use File | Settings | File Templates.
 */

import $ from 'jquery';
import {BaseElement} from '../../../modules/Element';

/**
 * @extends BaseElement
 * @class PageElement
 * @type {PageElement}
 */
export class PageElement extends BaseElement {

  /**
   * @param {PageView} view
   * @param opts
   * @constructor
   */
  constructor(view, opts) {
    super('PageElement', view);
    this._config(view, opts, $('<page />')).build(opts);
  }

  /**
   * Set page padding
   * @param padding
   * @memberOf PageElement
   */
  setPadding(padding) {
    this.view.elements.$widgets.$.css({
      paddingTop: padding.top,
      paddingRight: padding.right,
      paddingBottom: padding.bottom,
      paddingLeft: padding.left
    });
  }

  /**
   * Define height
   * @memberOf PageElement
   */
  updateDimensions() {

    /**
     * Fetch page
     * @type {Page}
     */
    const scope = this.view.scope;

    this.$.removeClass('height-auto');

    /**
     * Get widget
     * @type {Widget}
     */
    const widget = scope.model.getCurrentItem();

    if (!widget) {
      scope.logger.debug('Widget should be defined', widget);
      return false;
    }

    if (!widget.view) {
      scope.logger.debug('Unable to set page height: Page without items (default 100%)');
      return false;
    }

    if (!widget.view.get$item()) {
      scope.logger.debug('Unable to set page height: Initial state (default 100%)');
      return false;
    }

    /**
     * Calculate last occupied row
     * @type {*|number}
     */
    const lastOccupiedRow = widget.map.getLastOccupiedRow();

    /**
     * Get layout
     * @type {*|Layout}
     */
    const layout = scope.controller.getLayout();
    let height = lastOccupiedRow * layout.controller.minCellWidth() + (lastOccupiedRow + 1) * layout.config.grid.margin;

    const header = this.view.elements.$header,
        footer = this.view.elements.$footer,
        containerHeight = this.getRootContainer().height();

    const headerHeight = header.$ ? header.$.height() : 0,
        footerHeight = footer.$ ? footer.$.height() : 0,
        outerHeight = headerHeight + footerHeight;

    height = height ? height : containerHeight;

    if (height < containerHeight) {
      height = containerHeight;
    }

    const pageScrollHeight = parseInt(scope.model.getConfig('preferences').pageScrollHeight, 10) || 0;
    let delta = height + outerHeight;

    if (pageScrollHeight > delta) {
      delta += (pageScrollHeight - delta);
    }
    this.setHeight(delta);
  }

  /**
   * Define page visibility
   * @memberOf PageElement
   * @param {boolean} visible
   */
  setVisibility(visible) {
    this.$[(visible ? 'add' : 'remove') + 'Class']('current-page');
  }
}