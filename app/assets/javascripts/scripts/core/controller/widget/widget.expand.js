/**
 * Created with RubyMine.
 * User: teamco
 * Date: 3/13/15
 * Time: 8:33 PM
 */

define(function defineWidgetExpand() {

  /**
   * Define WidgetExpand
   * @class WidgetExpand
   * @constructor
   */
  var WidgetExpand = function WidgetExpand() {
  };

  return WidgetExpand.extend('WidgetExpand', {

    /**
     * Get expandable
     * @memberOf WidgetExpand
     * @returns {boolean}
     */
    isExpandable: function isExpandable() {

      /**
       * Get $content
       * @type {WidgetContent}
       */
      var $content = this.getContent();

      if (!this.base.isDefined($content)) {

        this.scope.logger.debug('Content undefined');
        return false;
      }

      /**
       * Get $item
       * @type {BaseElement}
       */
      var $item = $content.view.get$item();

      if (!this.base.isDefined($item)) {
        this.scope.logger.warn(
            'Element undefined: check convention',
            $content.view.elements
        );
        return false;
      }

      /**
       * Get content height
       * @type {number}
       */
      var deltaHeight = $item.getHeight();

      return !!this.model.getConfig('preferences').expandable &&
          deltaHeight > this.scope.dom.height;
    },

    /**
     * Get expanded
     * @memberOf WidgetExpand
     * @returns {boolean}
     */
    isExpanded: function isExpanded() {
      return !!this.scope.expanded;
    },

    /**
     * Set expanded
     * @memberOf WidgetExpand
     * @param {boolean} expanded
     */
    setExpanded: function setExpanded(expanded) {
      return this.scope.expanded = !!expanded;
    },

    /**
     * Toggle content expander
     * @memberOf WidgetExpand
     * @param {boolean} expand
     */
    toggleContentExpander: function toggleContentExpander(expand) {

      /**
       * Get $expander
       * @type {WidgetExpanderElement}
       */
      var $expander = this.view.elements.$expander,
          isDefined = $expander && this.base.isDefined($expander.$);

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
    },

    /**
     * Define expand Content
     * @memberOf WidgetExpand
     * @param {Event} e
     */
    expandContent: function expandContent(e) {

      if (this.controller.isExpanded()) {

        this.observer.publish(
            this.eventmanager.eventList.collapseContent
        );

        return false;
      }

      /**
       * Get $content
       * @type {WidgetContent}
       */
      var $content = this.controller.getContent(),
          deltaHeight = $content.view.get$item().getHeight();

      this.controller.onExpand(e, true, deltaHeight);
    },

    /**
     * Define collapse Content
     * @memberOf WidgetExpand
     * @param {Event} e
     */
    collapseContent: function collapseContent(e) {

      if (!this.controller.isExpanded()) {

        this.logger.warn('Content not expanded');
        return false;
      }

      this.controller.onExpand(e, false, this.dom.height);
    },

    /**
     * Define on expand
     * @param {Event} e
     * @param {boolean} expand
     * @param {number} height
     * @returns {boolean}
     */
    onExpand: function onExpand(e, expand, height) {

      /**
       * Get scope
       * @type {Widget}
       */
      var scope = this.scope;

      if (!this.isConsumptionMode()) {

        scope.logger.warn('Consumption mode feature', e);
        return false;
      }

      /**
       * Get $widget
       * @type {WidgetElement|BaseElement}
       */
      var $widget = scope.view.get$item();

      $widget.setHeight(height);
      $widget.view.elements.$expander.toggleExpandText(!expand);

      scope.observer.publish(
          scope.eventmanager.eventList.afterExpand,
          expand
      );
    },

    /**
     * Define after expand
     * @memberOf WidgetExpand
     * @param {boolean} expand
     */
    afterExpand: function afterExpand(expand) {

      this.logger.debug(
          this.i18n.t(
              (expand ? 'expand' : 'collapse') + '.widget'
          )
      );

      this.controller.setExpanded(expand);

      /**
       * Get page
       * @type {Page}
       */
      var page = this.controller.getContainment();

      page.observer.publish(
          page.eventmanager.eventList.expandLayout,
          this
      );
    }
  });
});