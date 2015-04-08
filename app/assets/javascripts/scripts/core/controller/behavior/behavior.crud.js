/**
 * Created with RubyMine.
 * User: teamco
 * Date: 1/14/14
 * Time: 8:38 PM
 */

define([
    'config/anthill'
], function defineBaseCrud(AntHill) {

    /**
     * Define Base CRUD
     * @extends AntHill
     * @class BaseCrud
     * @constructor BaseCrud
     */
    var BaseCrud = function BaseCrud() {
    };

    return BaseCrud.extend('BaseCrud', {

        /**
         * Create Item
         * @memberOf BaseCrud
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
                'Create ' + item.constructor.prototype.name,
                this.model.getUUID(item),
                item
            );

            this.observer.publish(
                this.eventmanager.eventList.afterCreateItem
            );
        },

        /**
         * Reject to modal event
         * @memberOf BaseCrud
         */
        rejectModalEvent: function rejectModalEvent() {
            var scope = this.scope,
                $modal = scope.view.elements.$modal;

            scope.logger.debug(
                'Reject modal event',
                $modal.item
            );

            $modal.selfDestroy();
        },

        /**
         * Approve to destroy items
         * @memberOf BaseCrud
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
         * @memberOf BaseCrud
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
                    condition: item.constructor.prototype.name !== this.model.item.name,
                    type: 'warn',
                    msg: 'Untrusted item',
                    args: [item, item.constructor.prototype.name, this.model.item.name]
                })) {
                return false;
            }

            scope.logger.debug(
                'Destroy ' + item.constructor.prototype.name,
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
         * @memberOf BaseCrud
         * @param item
         * @param {boolean} silent
         */
        destroyItem: function destroyItem(item, silent) {
            this.api.destroyItems([item], silent);
        },

        /**
         * Destroy Items
         * @memberOf BaseCrud
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
         * @memberOf BaseCrud
         */
        afterCreateItem: function afterCreateItem() {
            this.logger.debug('After create item');
            this.controller._afterCrud();
        },

        /**
         * After destroy item event
         * @memberOf BaseCrud
         */
        afterDestroyItem: function afterDestroyItem() {
            this.logger.debug('After destroy item');
            this.controller._afterCrud();
        },

        /**
         * After destroy item event
         * @memberOf BaseCrud
         */
        afterDestroyItems: function afterDestroyItems() {
            this.logger.debug('After destroy items');
            this.controller._afterCrud();
        },

        /**
         * After CRUD
         * @memberOf BaseCrud
         * @private
         * @returns {*|boolean}
         */
        _afterCrud: function _afterCrud() {

            /**
             * Get root
             * @type {Application}
             */
            var root = this.root(),
                isWidget = this.scope.model.getItemNameSpace() === 'widget',
                isLoading = root.model.getConfig('loading');

            if (isWidget || isLoading) {

                return false;

            } else {

                // Save if not (widget|loading)
                this.store();
            }
        }

    }, AntHill.prototype);

});