/**
 * Created with RubyMine.
 * User: teamco
 * Date: 1/14/14
 * Time: 8:38 PM
 */

define([
    'modules/base'
], function defineBaseCrud(Base) {

    /**
     * Define Base CRUD
     * @class BaseCrud
     * @constructor BaseCrud
     */
    var BaseCrud = function BaseCrud() {

    };

    return BaseCrud.extend({

        /**
         * Create Item
         * @param {{}} opts
         */
        createItem: function createItem(opts) {
            var item = this.model.createItem(
                this.controller.extendConfig(opts)
            );
            this.logger.debug(
                'Create ' + item.constructor.name,
                this.model.getUUID(item),
                item
            );
            this.observer.publish(
                this.eventmanager.eventList.afterCreateItem
            );
        },

        /**
         * Reject to destroy widget
         */
        rejectItemDestroy: function rejectItemDestroy() {
            var scope = this.scope,
                $modal = scope.view.elements.$modal;

            scope.logger.debug(
                'Reject destroy',
                $modal.item
            );

            $modal.selfDestroy();
        },

        /**
         * Approve to destroy items
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
                this.approveItemDestroy(item, count);
            }.bind(this));

            scope.observer.publish(
                scope.eventmanager.eventList.afterDestroyItems
            );

        },

        /**
         * Approve to destroy item
         * @param {*} item
         * @param {Number} [count]
         * @returns {boolean}
         */
        approveItemDestroy: function approveItemDestroy(item, count) {
            var base = this.base,
                scope = this.scope;

            count = base.define(count, 1, true);

            if (this.checkCondition({
                condition: !base.isDefined(item),
                type: 'warn',
                msg: 'Undefined item'
            })) {
                return false;
            }

            if (this.checkCondition({
                condition: item.constructor.name !== this.model.item.name,
                type: 'warn',
                msg: 'Untrusted item',
                args: [item, item.constructor.name, this.model.item.name]
            })) {
                return false;
            }

            scope.logger.debug(
                'Destroy ' + item.constructor.name,
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
         * Destroy Items
         * @param {Object} [items]
         * @param {Boolean} [silent]
         */
        destroyItems: function destroyItems(items, silent) {
            var base = this.base;

            items = base.define(items, this.items);

            base.defineBoolean(silent, false, true) ?
                this.controller.approveItemsDestroy(items) :
                this.view.destroyWidgetsModalDialog(items);
        },

        /**
         * After create item event
         */
        afterCreateItem: function afterCreateItem() {
            this.logger.debug('After create item');
            this.controller._afterCrud();
        },

        /**
         * After destroy item event
         */
        afterDestroyItem: function afterDestroyItem() {
            this.logger.debug('After destroy item');
            this.controller._afterCrud();
        },

        /**
         * After destroy item event
         */
        afterDestroyItems: function afterDestroyItems() {
            this.logger.debug('After destroy items');
            this.controller._afterCrud();
        },

        _afterCrud: function _afterCrud() {

            if (this.base.isFunction(this.updateDebugger)) {
                this.updateDebugger();
            }
        }

    }, Base);

});