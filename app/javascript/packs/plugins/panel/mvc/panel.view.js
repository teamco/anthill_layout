/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/24/12
 * Time: 10:13 PM
 * To change this template use File | Settings | File Templates.
 */

import {BaseView} from '../../../modules/View';
import {PanelElement} from '../element/panel.element';
import {PanelContentContainerElement} from '../element/panel.content.container.element';
import {PanelContentElement} from '../element/panel.content.element';

/**
 * @class PanelView
 * @type {PanelView}
 */
export class PanelView extends BaseView {

  /**
   * @constructor
   * @param {string} name
   * @param {Panel} scope
   */
  constructor(name, scope) {
    super(name || 'PanelView', scope);
  }

  /**
   * Render Panel
   * @memberOf PanelView
   */
  renderPanel() {
    if (this.isCached('$panel', PanelElement)) {
      return false;
    }

    /**
     * Define Panel element
     * @property PanelView.elements
     * @type {PanelElement}
     */
    this.elements.$panel = new PanelElement(this, {
      $container: '.sidebar-nav',
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
     * Define Panel element
     * @type {PanelContentContainerElement}
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

    if (this.isCachedItems() && this.elements.items.hasOwnProperty(sname) && !force) {
      return false;
    }

    /**
     * Render item
     * @type {PanelContentElement}
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
}