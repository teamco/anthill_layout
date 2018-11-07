/**
 * Created with RubyMine.
 * User: teamco
 * Date: 3/13/15
 * Time: 8:33 PM
 */

/**
 * @class WidgetExpand
 * @type {WidgetExpand}
 */
export class WidgetExpand {

  /**
   * Get expandable
   * @memberOf WidgetExpand
   * @returns {boolean}
   */
  isExpandable() {

    /**
     * Get $content
     * @type {WidgetContent|{view}}
     */
    const $content = this.controller.getContent();

    if (!$content) {
      this.logger.debug('Content undefined');
      return false;
    }

    /**
     * Get $item
     * @type {BaseElement}
     */
    const $item = $content.view.get$item();

    if (!$item) {
      this.logger.warn('Element undefined: check convention', $content.view.elements);
      return false;
    }

    /**
     * Get content height
     * @type {number}
     */
    const deltaHeight = $item.getHeight();

    return !!this.model.getConfig('preferences').expandable && deltaHeight > this.dom.height;
  }

  /**
   * Get expanded
   * @memberOf WidgetExpand
   * @returns {boolean}
   */
  isExpanded() {
    return !!this.scope.expanded;
  }

  /**
   * Set expanded
   * @memberOf WidgetExpand
   * @param {boolean} expanded
   */
  setExpanded(expanded) {
    return this.scope.expanded = !!expanded;
  }

  /**
   * Toggle content expander
   * @memberOf WidgetExpand
   * @param {boolean} expand
   */
  toggleContentExpander(expand) {

    /**
     * Get $expander
     * @type {WidgetExpanderElement}
     */
    const $expander = this.view.elements.$expander,
        isDefined = $expander && $expander.$;

    if (expand) {
      if (isDefined) {
        this.logger.debug('Expander already rendered');
        return false;
      }
      this.view.contentExpander();
    } else {
      if (!isDefined) {
        this.logger.debug('Expander should be rendered before destroy');
        return false;
      }
      $expander.destroy();
    }
  }

  /**
   * Define expand Content
   * @memberOf WidgetExpand
   * @param {Event} e
   */
  expandContent(e) {
    if (this.controller.isExpanded()) {
      this.observer.publish(this.eventManager.eventList.collapseContent);
      return false;
    }

    /**
     * Get $content
     * @type {WidgetContent}
     */
    const $content = this.controller.getContent(),
        deltaHeight = $content.view.get$item().getHeight();

    this.controller.onExpand(e, true, deltaHeight);
  }

  /**
   * Define collapse Content
   * @memberOf WidgetExpand
   * @param {Event} e
   */
  collapseContent(e) {
    if (!this.controller.isExpanded()) {
      this.logger.warn('Content not expanded');
      return false;
    }
    this.controller.onExpand(e, false, this.dom.height);
  }

  /**
   * Define on expand
   * @memberOf WidgetExpand
   * @param {Event} e
   * @param {boolean} expand
   * @param {number} height
   * @returns {boolean}
   */
  onExpand(e, expand, height) {

    /**
     * Get scope
     * @type {Widget}
     */
    const scope = this.scope;

    if (!this.isConsumptionMode()) {
      scope.logger.warn('Consumption mode feature', e);
      return false;
    }

    /**
     * Get $widget
     * @type {WidgetElement|BaseElement}
     */
    const $widget = scope.view.get$item();

    $widget.setHeight(height);
    $widget.view.elements.$expander.toggleExpandText(!expand);
    scope.observer.publish(scope.eventManager.eventList.afterExpand, expand);
  }

  /**
   * Define after expand
   * @memberOf WidgetExpand
   * @param {boolean} expand
   */
  afterExpand(expand) {
    this.logger.debug(this.i18n.t((expand ? 'expand' : 'collapse') + '.widget'));
    this.controller.setExpanded(expand);

    /**
     * Get page
     * @type {Page}
     */
    const page = this.controller.getContainment();

    page.observer.publish(page.eventManager.eventList.expandLayout, this);
  }
}
  