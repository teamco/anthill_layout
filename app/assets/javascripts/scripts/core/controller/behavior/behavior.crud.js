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
module.exports = class BehaviorCrud {

  /**
   * Create Item
   * @property BehaviorCrud
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
    const item = this.model.createItem(
        this.controller.extendConfig(opts)
    );

    this.logger.debug(
        'Create ' + item.name,
        this.model.getUUID(item),
        item
    );

    this.observer.publish(
        this.eventManager.eventList.afterCreateItem
    );
  }

  /**
   * Reject to modal event
   * @property BehaviorCrud
   */
  rejectModalEvent() {
    const scope = this.scope,
        $modal = scope.view.elements.$modal;

    if ($modal) {
      scope.logger.debug(
          'Reject modal event',
          $modal.item
      );

      $modal.selfDestroy();
    }
  }

  /**
   * Approve to destroy items
   * @property BehaviorCrud
   * @param items
   */
  approveItemsDestroy(items) {
    const scope = this.scope,
        $modal = scope.view.elements.$modal;

    if (this.base.isDefined($modal)) {
      items = $modal.items;
      $modal.selfDestroy();
    }

    const count = this.base.lib.hash.hashLength(items || {});

    if (this.checkCondition({
      condition: count === 0,
      type: 'warn',
      msg: 'Undefined items'
    })) {
      return false;
    }

    $.each(items, function each(uuid, item) {
      scope.controller.approveItemDestroy(item, count);
    });

    scope.observer.publish(
        scope.eventManager.eventList.afterDestroyItems
    );
  }

  /**
   * Approve to destroy item
   * @property BehaviorCrud
   * @param {*} item
   * @param {Number} [count]
   * @returns {boolean}
   */
  approveItemDestroy(item, count) {
    const scope = this.scope;

    count = this.base.define(count, 1, true);

    if (this.checkCondition({
      condition: !this.base.isDefined(item),
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
   * @property BehaviorCrud
   * @param item
   * @param {boolean} silent
   */
  destroyItem(item, silent) {
    this.api.destroyItems([item], silent);
  }

  /**
   * Destroy Items
   * @property BehaviorCrud
   * @param {Object} [items]
   * @param {Boolean} [silent]
   */
  destroyItems(items, silent) {
    items = this.base.define(items, this.items);

    this.base.defineBoolean(silent, false, true) ?
        this.observer.publish(
            this.eventManager.eventList.approveItemsDestroy,
            items
        ) : this.view.destroyWidgetsModalDialog(items);
  }

  /**
   * After create item event
   * @property BehaviorCrud
   */
  afterCreateItem() {
    this.logger.debug('After create item');
  }

  /**
   * After destroy item event
   * @property BehaviorCrud
   */
  afterDestroyItem() {
    this.logger.debug('After destroy item');
  }

  /**
   * After destroy item event
   * @property BehaviorCrud
   */
  afterDestroyItems() {
    this.logger.debug('After destroy items');
    this.controller.store();
  }
};