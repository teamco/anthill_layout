/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/5/12
 * Time: 9:51 PM
 * To change this template use File | Settings | File Templates.
 */

import {AntHill} from '../core/config/anthill';

/**
 * Define abstract CRUD
 * @class CRUD
 * @type {CRUD}
 */
export class CRUD extends AntHill {

  /**
   * @param {string} name
   * @param scope
   * @constructor
   */
  constructor(name, scope) {
    super(name || 'CRUD', scope, false);
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

    if (Object.prototype.hasOwnProperty.call(eventManager.abstract, 'destroyItems')) {
      if (Object.prototype.hasOwnProperty.call(eventManager.eventList, eventManager.abstract['destroyItems'])) {
        item.observer.publish(eventManager.eventList[eventManager.abstract.destroyItems]);
      }
    }

    this.destroyItemView(item);

    if (Object.prototype.hasOwnProperty.call(items, index)) {
      delete items[index];
    }

    scope[namespace] = Object.values(items)[0] || {};

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
      if (Object.prototype.hasOwnProperty.call(items, index)) {
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
      if (Object.prototype.hasOwnProperty.call(elements, index)) {

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
}
