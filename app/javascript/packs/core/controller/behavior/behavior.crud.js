/**
 * Created with RubyMine.
 * User: teamco
 * Date: 1/14/14
 * Time: 8:38 PM
 */

/**
 * Define Base CRUD
 * @extends AntHill
 * @class BehaviorCrud
 */
export class BehaviorCrud {

  /**
   * Create Item
   * @memberOf BehaviorCrud
   * @param {*} opts
   * @param {*|Boolean} silent
   */
  createItem(opts, silent) {

    /**
     * Set silent
     * @type {*|Boolean}
     */
    opts.silent = silent;

    /**
     * Define item
     * @type {*}
     */
    const item = this.model.createItem(this.controller.extendConfig(opts));

    this.logger.debug('Create ' + item.name, this.model.getUUID(item), item);
    this.observer.publish(this.eventManager.eventList.afterCreateItem, item);
  }

  /**
   * Reject to modal event
   * @memberOf BehaviorCrud
   */
  rejectModalEvent() {
    const scope = this.scope,
        $modal = scope.view.elements.$modal;

    if ($modal) {
      scope.logger.debug('Reject modal event', $modal.item);
      $modal.selfDestroy();
    }
  }

  /**
   * Approve to destroy items
   * @memberOf BehaviorCrud
   * @param items
   */
  approveItemsDestroy(items) {
    const scope = this.scope,
        $modal = scope.view.elements.$modal;

    if ($modal) {
      items = $modal.items;
      $modal.selfDestroy();
    }

    const count = items && Object.keys(items).length;

    if (this.checkCondition({
      condition: count === 0,
      type: 'warn',
      msg: 'Undefined items'
    })) {
      return false;
    }

    $.each(items, (uuid, item) => scope.controller.approveItemDestroy(item, count));

    scope.observer.publish(scope.eventManager.eventList.afterDestroyItems);
  }

  /**
   * Approve to destroy item
   * @memberOf BehaviorCrud
   * @param {*} item
   * @param {Number} [count]
   * @returns {boolean}
   */
  approveItemDestroy(item, count) {
    const scope = this.scope;

    count = count || 1;

    if (this.checkCondition({
      condition: !item,
      type: 'warn',
      msg: 'Undefined item'
    })) {
      return false;
    }

    if (this.checkCondition({
      condition: item.name !== this.model.item.name,
      type: 'warn',
      msg: 'Untrusted item',
      args: [item, item.name, this.model.item.name]
    })) {
      return false;
    }

    scope.logger.debug(
        'Destroy ' + item.name,
        item,
        this.model.destroyItem(item)
    );

    if (count === 1) {
      scope.observer.publish(
          scope.eventManager.eventList.afterDestroyItem
      );
    }
  }

  /**
   * Destroy item
   * @memberOf BehaviorCrud
   * @param item
   * @param {boolean} silent
   */
  destroyItem(item, silent) {
    this.api.destroyItems([item], silent);
  }

  /**
   * Destroy Items
   * @memberOf BehaviorCrud
   * @param {Object} [items]
   * @param {Boolean} [silent]
   */
  destroyItems(items, silent) {
    items = items || this.items;

    this.utils.setBoolean(silent, false) ?
        this.observer.publish(this.eventManager.eventList.approveItemsDestroy, items) :
        this.view.destroyWidgetsModalDialog(items);
  }

  /**
   * After create item event
   * @memberOf BehaviorCrud
   * @param {{}} item
   */
  afterCreateItem(item) {
    this.logger.debug('After create item', item);
  }

  /**
   * After destroy item event
   * @memberOf BehaviorCrud
   */
  afterDestroyItem() {
    this.logger.debug('After destroy item');
  }

  /**
   * After destroy item event
   * @memberOf BehaviorCrud
   */
  afterDestroyItems() {
    this.logger.debug('After destroy items');
    this.controller.store();
  }
}