/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/25/15
 * Time: 6:29 PM
 */

import {PageWidgetCopy} from './page.widget.copy';

/**
 * @class PageWidget
 * @extends PageWidgetCopy
 * @type {PageWidget}
 */
export class PageWidget extends PageWidgetCopy {

  /**
   * @constructor
   */
  constructor() {
    super();
  }

  /**
   * Create widget from resource
   * @memberOf PageWidget
   * @param {{
   *  resource: string,
   *  thumbnail: string,
   *  title: string,
   *  description: string,
   *  external_resource: string,
   *  width: number,
   *  height: number
   * }} opts
   * @param {boolean} render
   * @param {boolean} silent
   */
  createWidgetFromResource(opts, render, silent) {

    /**
     * Get scope
     * @type {Page|{api}}
     */
    const scope = this.scope;

    // Merge widget prefs
    const prefs = window.$.extend(true, {}, this.model.getConfig('widget').preferences, {
      resource: opts.resource,
      external_resource: opts.external_resource,
      is_external: !!opts.external_resource,
      thumbnail: opts.thumbnail,
      title: opts.title,
      description: opts.description
    });

    scope.api.createWidget({
      config: {
        preferences: prefs,
        html: {
          dimensions: {
            width: opts.width,
            height: opts.height
          }
        }
      }
    }, render, silent);
  }

  /**
   * Check if allowed to add widget to page
   * @memberOf PageWidget
   * @returns {boolean}
   */
  isAllowAddWidget() {

    /**
     * Define allow to add widgets
     * @type {boolean}
     */
    const allow = this.model.getConfig('widget/allowToAdd');
    this.scope.logger.debug('Is allowed to add widget?', allow);
    return allow;
  }

  /**
   * Allow to add widget to page
   * @memberOf PageWidget
   */
  allowAddWidget() {
    this.scope.logger.debug('Allow to add widget');
    this.model.getConfig('widget').allowToAdd = true;
  }

  /**
   * Do not allow to add widget to page
   * @memberOf PageWidget
   */
  banAddWidget() {
    this.scope.logger.debug('Do not allow to add widget');
    this.model.getConfig('widget').allowToAdd = false;
  }

  /**
   * Get widgets container
   * @memberOf PageWidget
   * @returns {*}
   */
  getWidgetsContainer() {
    return this.scope.view.elements.$widgets;
  }

  /**
   * Update widget properties
   * @memberOf PageWidget
   * @param [item]
   * @returns {boolean}
   */
  updateWidgetsConfig(item) {

    /**
     * Define scope
     * @type {Page}
     */
    const scope = this.scope,
        items = scope.model.getItems(),
        grid = scope.layout.controller.minCellWidth() + scope.layout.config.grid.margin;

    if (scope.layout.config.mode === scope.LAYOUT_MODES.jqUIGrid) {
      if (item) {
        item.controller.updateDraggable('grid', [grid, grid]);
        item.controller.updateResizable('grid', grid);
        return item;
      }

      for (let index in items) {
        if (Object.prototype.hasOwnProperty.call(items, index)) {

          /**
           * Define widget
           * @type {Widget}
           */
          const widget = items[index];
          widget.controller.updateDraggable('grid', [grid, grid]);
          widget.controller.updateResizable('grid', grid);
        }
      }
    }
  }

  /**
   * Define loading items content
   * @memberOf PageWidget
   */
  loadItemsContent() {
    if (this.controller.isLoadedContent()) {
      this.logger.debug('Content already loaded');
      this.view.get$item().hideLoader();
      return false;
    } else {

      let items = this.model.getItems(),
          item, index;

      if (!Object.keys(items).length) {
        this.logger.debug('Page without items');
        this.view.get$item().hideLoader();
        this.observer.publish(this.eventManager.eventList.setLoadedContent, true);
        return false;
      }

      for (index in items) {
        if (Object.prototype.hasOwnProperty.call(items, index)) {

          /**
           * Get item
           * @type {Widget}
           */
          item = items[index];
          item.controller.loadWidgetData();
        }
      }
    }
  }

  /**
   * Update widget interactions
   * @memberOf PageWidget
   */
  updateItemInteractions() {

    let items = this.model.getItems(),
        item, index;

    // Get outline
    const outline = this.model.getConfig('preferences').outlineContainment;
    const containment = outline ? false : this.view.get$item().$;

    this.logger.debug('Update widget containment interactions', outline, containment);

    for (index in items) {
      if (Object.prototype.hasOwnProperty.call(items, index)) {

        /**
         * Get item
         * @type Widget
         */
        item = items[index];
        item.observer.publish(item.eventManager.eventList.updateContainment, [['draggable', 'resizable'], containment]);
      }
    }
  }

  /**
   * Define update loaded content
   * @memberOf PageWidget
   * @param {Widget} widget
   */
  updateLoadedContent(widget) {
    this.logger.debug('Update loaded content', widget);

    // Get items count
    const items = Object.keys(this.model.getItems()).length;
    this.ready += 1;

    if (this.ready === items) {
      this.observer.publish(this.eventManager.eventList.setLoadedContent, true);
      this.view.get$item().hideLoader();
    }
  }

  /**
   * Show widget content
   * @param {Widget|[Widget, string]} item
   * @memberOf PageWidget
   */
  showWidgetContent(item) {
    if (!item) {
      this.logger.warn('Undefined item content');
      return false;
    }

    /**
     * Get workspace
     * @type {Workspace|{controller}}
     */
    const ws = this.controller.getContainment();

    /**
     * Get root element
     * @type {ApplicationElement}
     */
    const rootElement = this.controller.root().view.get$item();

    ws.controller.togglePanels(false);
    rootElement.$.addClass('show-content');
    item.view.get$item().$.addClass('active-content');
  }
}