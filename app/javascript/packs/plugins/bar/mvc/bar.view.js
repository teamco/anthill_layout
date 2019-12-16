/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/24/12
 * Time: 10:13 PM
 * To change this template use File | Settings | File Templates.
 */

import {BaseView} from '../../../modules/View';
import {BarElement} from '../element/bar.element';
import {BarContentElement} from '../element/bar.content.element';

/**
 * @class BarView
 * @type {BarView}
 */
export class BarView extends BaseView {

  /**
   * @constructor
   * @param {string} name
   * @param {Bar} scope
   */
  constructor(name, scope) {
    super(name || 'BarView', scope);
  }

  /**
   * Render Bar
   * @memberOf BarView
   */
  renderBar() {

    if (this.isCached('$bar', BarElement)) {
      return false;
    }

    /**
     * @constant $container
     * @type {{}}
     */
    const $container = this.get$container();

    this.header($container);

    /**
     * Define container
     * @type {BarElement}
     */
    this.elements.$bar = new BarElement(this, {
      $container: $container.$,
      style: 'panel-bar'
    });

    this.footer($container);
  }

  /**
   * Render bar content
   * @param data
   * @param {Boolean} force
   * @memberOf BarView
   * @returns {boolean}
   */
  renderContent(data, force) {

    if (this.isCachedItems() && !force) {
      return false;
    }

    for (let index in data) {
      if (Object.prototype.hasOwnProperty.call(data, index)) {

        /**
         * Define item
         */
        const item = data[index];

        /**
         * Define module resource
         * @type {string}
         */
        const moduleResource = item.module.name.toDash();
        // const moduleItems

        /**
         * Render item
         * @type {BarContentElement}
         */
        const $item = new BarContentElement(this, {
          style: window._.compact([item.activated ? 'activated' : null, moduleResource]).join(' '),
          resource: item,
          cname: moduleResource,
          $container: this.get$item().$
        });

        this.updateElementItems($item);
      }
    }
  }

  /**
   * Render bar
   * @memberOf BarView
   */
  render() {
    this.scope.observer.publish(this.scope.eventManager.eventList.successRendered, this.renderBar.bind(this));
  }
}