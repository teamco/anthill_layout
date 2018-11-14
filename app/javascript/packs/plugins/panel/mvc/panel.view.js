/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/24/12
 * Time: 10:13 PM
 * To change this template use File | Settings | File Templates.
 */

import {BaseView} from '../../../modules/View';
import {PanelElement} from '../element/panel.element';
import {PanelContentElement} from '../element/panel.content.element';
import {PanelPackagesElement} from '../element/panel.packages.element';

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
      $container: '.app-body',
      append: true
    });

    this.controller.renderPackages();
    this.get$item().renderMinimizer();
    this.footer(this.get$item());
  }

  /**
   * Render panel packages
   * @memberOf PanelView
   * @param module
   * @param {Boolean} [force]
   * @returns {boolean}
   */
  renderPackagesContent(module, force) {

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
     * @type {PanelPackagesElement}
     */
    const $item = new PanelPackagesElement(this, {
      $container: this.get$item().$,
      style: style
    });

    module.view.defineContainer($item);
    this.updateElementItems($item, sname);
  }

  /**
   * Render panel content
   * @memberOf PanelView
   * @param module
   * @param {Boolean} [force]
   * @returns {boolean}
   */
  renderContent(module, force) {
    const name = this.scope.model.getPanelEntityResourceName(module);
    const style = `${name}-content`;
    const sname = `$${style}`;

    /**
     * @constant
     * @type {BarContentElement}
     */
    const $container = this.controller.getPackageContentElementBy('bar', 'style', name);

    if (this.isCachedItems() && this.elements.items.hasOwnProperty(sname) && !force) {
      return false;
    }

    /**
     * Render item
     * @type {PanelContentElement}
     */
    const $item = new PanelContentElement(this, {
      $container: $container.$,
      style: style
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