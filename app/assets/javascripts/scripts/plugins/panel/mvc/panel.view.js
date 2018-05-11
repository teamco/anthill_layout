/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/24/12
 * Time: 10:13 PM
 * To change this template use File | Settings | File Templates.
 */

/**
 * @constant BaseView
 * @type {BaseView}
 */
const BaseView = require('../../../core/lib/modules/View.js');

/**
 * @class PanelView
 * @type {module.PanelView}
 */
module.exports = class PanelView extends BaseView {

  /**
   * @constructor
   * @param {string} name
   * @param {Panel} scope
   */
  constructor(name, scope) {
    super(name || 'PanelView', scope, false);
  }

  /**
   * Render Panel
   * @memberOf PanelView
   */
  renderPanel() {

    /**
     * @constant PanelElement
     * @type {module.PanelElement|*}
     */
    const PanelElement = require('../element/panel.element.js');

    if (this.isCached('$panel', PanelElement)) {
      return false;
    }

    /**
     * Define Panel element
     * @property PanelView.elements
     * @type {module.PanelElement}
     */
    this.elements.$panel = new PanelElement(this, {
      $container: 'body',
      style: ['panel-container', this.controller.getRenderAt()].join(' ')
    });

    this.renderContentContainer();
    this.footer(this.get$item());
    this.controller.renderPackages();
  }

  /**
   * Render content container
   * @memberOf PanelView
   */
  renderContentContainer() {

    /**
     * @constant PanelContentContainerElement
     * @type {module.PanelContentContainerElement|*}
     */
    const PanelContentContainerElement = require('../element/panel.content.container.element.js');

    /**
     * Define Panel element
     * @type {module.PanelContentContainerElement}
     */
    this.elements.$content = new PanelContentContainerElement(this, {
      $container: this.get$item().getContentContainer(),
      style: 'panel-content'
    });
  }

  /**
   * Render panel content
   * @memberOf PanelView
   * @param module
   * @param {Boolean} [force]
   * @returns {boolean}
   */
  renderContent(module, force) {

    /**
     * Define style
     * @type {string}
     */
    const style = [this.scope.model.getPanelEntityResourceName(module), 'content'].join('-'),
        sname = '$' + style;

    this.updateElementItems();

    if ((this.isCachedItems() || this.elements.items.hasOwnProperty(sname)) && !force) {
      return false;
    }

    /**
     * @constant PanelContentElement
     * @type {module.PanelContentElement|*}
     */
    const PanelContentElement = require('../element/panel.content.element.js');

    /**
     * Render item
     * @type {module.PanelContentElement}
     */
    const $item = new PanelContentElement(this, {
      style: style,
      $container: this.elements.$content.$
    });

    module.view.defineContainer($item);
    this.updateElementItems($item, sname);
  }

  /**
   * Render panel
   * @memberOf PanelView
   */
  render() {
    this.scope.observer.publish(this.scope.eventManager.eventList.successRendered, this.renderPanel.bind(this));
  }
};