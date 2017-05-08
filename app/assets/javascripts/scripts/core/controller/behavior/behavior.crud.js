/**
 * Created with RubyMine.
 * User: teamco
 * Date: 1/14/14
 * Time: 8:38 PM
 */

define([
  'config/anthill'
], function defineBehaviorCrud(AntHill) {

  /**
   * Define Base CRUD
   * @extends AntHill
   * @class BehaviorCrud
   * @constructor BehaviorCrud
   */
  var BehaviorCrud = function BehaviorCrud() {

    /**
     * Define scope
     * @property BehaviorCrud
     * @type {undefined}
     */
    this.scope = undefined;
  };

  return BehaviorCrud.extend('BehaviorCrud', {

    /**
     * Create Item
     * @memberOf BehaviorCrud
     * @param {*} opts
     * @param {*|Boolean} silent
     */
    createItem: function createItem(opts, silent) {

      /**
       * Set silent
       * @type {*|Boolean}
       */
      opts.silent = silent;

      /**
       * Define item
       * @type {*}
       */
      var item = this.model.createItem(
          this.controller.extendConfig(opts)
      );

      this.logger.debug(
          'Create ' + item.name,
          this.model.getUUID(item),
          item
      );

      this.observer.publish(
          this.eventmanager.eventList.afterCreateItem
      );
    },

    /**
     * Reject to modal event
     * @memberOf BehaviorCrud
     */
    rejectModalEvent: function rejectModalEvent() {
      var scope = this.scope,
          $modal = scope.view.elements.$modal;

      if ($modal) {
        scope.logger.debug(
            'Reject modal event',
            $modal.item
        );

        $modal.selfDestroy();
      }
    },

    /**
     * Approve to destroy items
     * @memberOf BehaviorCrud
     * @param items
     */
    approveItemsDestroy: function approveItemsDestroy(items) {
      var scope = this.scope,
          $modal = scope.view.elements.$modal;

      if (this.base.isDefined($modal)) {
        items = $modal.items;
        $modal.selfDestroy();
      }

      var count = this.base.lib.hash.hashLength(items || {});

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
          scope.eventmanager.eventList.afterDestroyItems
      );
    },

    /**
     * Approve to destroy item
     * @memberOf BehaviorCrud
     * @param {*} item
     * @param {Number} [count]
     * @returns {boolean}
     */
    approveItemDestroy: function approveItemDestroy(item, count) {
      var scope = this.scope;

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
            scope.eventmanager.eventList.afterDestroyItem
        );
      }
    },

    /**
     * Destroy item
     * @memberOf BehaviorCrud
     * @param item
     * @param {boolean} silent
     */
    destroyItem: function destroyItem(item, silent) {
      this.api.destroyItems([item], silent);
    },

    /**
     * Destroy Items
     * @memberOf BehaviorCrud
     * @param {Object} [items]
     * @param {Boolean} [silent]
     */
    destroyItems: function destroyItems(items, silent) {
      items = this.base.define(items, this.items);

      this.base.defineBoolean(silent, false, true) ?
          this.observer.publish(
              this.eventmanager.eventList.approveItemsDestroy,
              items
          ) : this.view.destroyWidgetsModalDialog(items);
    },

    /**
     * After create item event
     * @memberOf BehaviorCrud
     */
    afterCreateItem: function afterCreateItem() {
      this.logger.debug('After create item');
    },

    /**
     * After destroy item event
     * @memberOf BehaviorCrud
     */
    afterDestroyItem: function afterDestroyItem() {
      this.logger.debug('After destroy item');
    },

    /**
     * After destroy item event
     * @memberOf BehaviorCrud
     */
    afterDestroyItems: function afterDestroyItems() {
      this.logger.debug('After destroy items');
      this.controller.store();
    }

  }, AntHill.prototype);
});