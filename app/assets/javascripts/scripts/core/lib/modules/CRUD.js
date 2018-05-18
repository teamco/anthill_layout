/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/5/12
 * Time: 9:51 PM
 * To change this template use File | Settings | File Templates.
 */

/**
 * @constant AntHill
 * @type {module.AntHill}
 */
const AntHill = require('../../config/anthill.js');

/**
 * Define abstract CRUD
 * @class CRUD
 * @type {CRUD}
 */
module.exports = class CRUD extends AntHill {

  /**
   * @param {string} name
   * @constructor
   */
  constructor(name) {
    super(name || 'CRUD', null, false);
  }

  /**
   * Create item
   * @memberOf CRUD
   * @param opts
   * @returns {*}
   */
  createItem(opts) {
    return this.updateCollector(this.item, opts);
  }

  /**
   * Destroy items
   * @memberOf CRUD
   * @param item
   * @returns {*}
   */
  destroyItem(item) {
    const scope = this.scope,
        namespace = item.name.toLowerCase();

    if (!item) {
      scope.logger.warn('Undefined ' + namespace, item);
      return false;
    }

    const model = item.model;

    if (!model) {
      scope.logger.warn('Uninitialized ' + namespace, item);
      return false;
    }

    const items = scope.items,
        index = model.getUUID(),
        onDestroy = model.onDestroy || [],
        eventManager = item.eventManager,
        l = onDestroy.length;

    for (let i = 0; i < l; i += 1) {
      item.observer.publish(eventManager.eventList['destroy' + onDestroy[i]]);
    }

    if (eventManager.abstract.hasOwnProperty('destroyItems')) {
      if (eventManager.eventList.hasOwnProperty(eventManager.abstract['destroyItems'])) {
        item.observer.publish(eventManager.eventList[eventManager.abstract.destroyItems]);
      }
    }

    this.destroyItemView(item);

    if (items.hasOwnProperty(index)) {
      delete items[index];
    }

    scope[namespace] = base.lib.hash.firstHashElement(items) || {};

    return items;
  }

  /**
   * Destroy items
   * @memberOf CRUD
   * @returns {*}
   */
  destroyItems() {

    const items = this.scope.items || {};

    for (let index in items) {
      if (items.hasOwnProperty(index)) {
        this.destroyItem(items[index]);
      }
    }

    return items;
  }

  /**
   * Destroy item view
   * @memberOf CRUD
   * @param item
   * @returns {*}
   */
  destroyItemView(item) {
    const scope = this.scope,
        namespace = item.name.toLowerCase();

    if (!item) {
      scope.logger.warn('Undefined ' + namespace, item);
      return false;
    }

    const elements = item.view.elements;

    for (let index in elements) {
      if (elements.hasOwnProperty(index)) {

        /**
         * Define element
         * @type {BaseElement}
         */
        let $element = elements[index];
        $element.unbindElement().destroy();
      }
    }

    return item;
  }
};
