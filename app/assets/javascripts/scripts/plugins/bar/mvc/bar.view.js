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
 * @class BarView
 * @type {module.BarView}
 */
module.exports = class BarView extends BaseView {

  /**
   * @constructor
   * @param {string} name
   * @param {Bar} scope
   */
  constructor(name, scope) {
    super(name || 'BarView', scope, false);
  }

  /**
   * Render Bar
   * @memberOf BarView
   */
  renderBar() {

    /**
     * @constant BarElement
     * @type {module.BarElement|*}
     */
    const BarElement = require('../element/bar.element.js');

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
     * @type {module.BarElement}
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

    /**
     * @constant BarContentElement
     * @type {module.BarContentElement|*}
     */
    const BarContentElement = require('../element/bar.content.element.js');

    if (this.isCachedItems() && !force) {
      return false;
    }

    for (let index in data) {
      if (data.hasOwnProperty(index)) {

        /**
         * Define item
         */
        const item = data[index];

        /**
         * Define module resource
         * @type {string}
         */
        const moduleResource = item.module.name.toDash();

        /**
         * Render item
         * @type {module.BarContentElement}
         */
        const $item = new BarContentElement(this, {
          style: this.utils._.compact(['content', item.activated ? 'activated' : null, moduleResource]).join(' '),
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
};