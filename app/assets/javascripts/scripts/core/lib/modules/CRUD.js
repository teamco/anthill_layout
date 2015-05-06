/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/5/12
 * Time: 9:51 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'config/anthill'
], function defineCRUD(AntHill) {

    /**
     * Define abstract CRUD
     * @class CRUD
     * @constructor
     */
    var CRUD = function CRUD() {

        /**
         * Define scope
         * @property CRUD
         * @type {undefined}
         */
        this.scope = undefined;

        /**
         * Define base
         * @property CRUD
         * @type {undefined}
         */
        this.base = undefined;
    };

    return CRUD.extend('CRUD', {

        /**
         * Create item
         * @memberOf CRUD
         * @param opts
         * @returns {*}
         */
        createItem: function createItem(opts) {
            return this.updateCollector(
                this.item,
                opts
            );
        },

        /**
         * Destroy items
         * @memberOf CRUD
         * @param item
         * @returns {*}
         */
        destroyItem: function destroyItem(item) {

            var scope = this.scope,
                base = this.base,
                namespace = item.name.toLowerCase();

            if (!base.isDefined(item)) {
                scope.logger.warn('Undefined ' + namespace, item);
                return false;
            }

            var model = item.model;

            if (!base.isDefined(model)) {
                scope.logger.warn('Uninitialized ' + namespace, item);
                return false;
            }

            var items = scope.items,
                index = model.getUUID(),
                onDestroy = this.base.define(model.onDestroy, [], true),
                itemEventManager = item.eventmanager,
                i = 0, l = onDestroy.length;

            for (i; i < l; i += 1) {
                item.observer.publish(
                    item.eventmanager.eventList['destroy' + onDestroy[i]]
                );
            }

            if (itemEventManager.abstract.hasOwnProperty('destroyItems')) {
                if (itemEventManager.eventList.hasOwnProperty(
                    itemEventManager.abstract['destroyItems']
                )) {
                    item.observer.publish(
                        itemEventManager.eventList[itemEventManager.abstract.destroyItems]
                    );
                }
            }

            this.destroyItemView(item);

            if (items.hasOwnProperty(index)) {
                delete items[index];
            }

            this.scope[namespace] = base.lib.hash.firstHashElement(items) || {};

            return items;
        },

        /**
         * Destroy items
         * @memberOf CRUD
         * @returns {*}
         */
        destroyItems: function destroyItems() {

            var index,
                items = this.scope.items || {};

            for (index in items) {
                if (items.hasOwnProperty(index)) {
                    this.destroyItem(items[index])
                }
            }

            return items;
        },

        /**
         * Destroy item view
         * @memberOf CRUD
         * @param item
         * @returns {*}
         */
        destroyItemView: function destroyItemView(item) {
            var scope = this.scope,
                base = this.base,
                namespace = item.constructor.prototype.name.toLowerCase();

            if (!base.isDefined(item)) {
                scope.logger.warn('Undefined ' + namespace, item);
                return false;
            }

            var elements = item.view.elements,
                index, $element;

            for (index in elements) {
                if (elements.hasOwnProperty(index)) {

                    /**
                     * Define element
                     * @type {BaseElement}
                     */
                    $element = elements[index];
                    $element.unbindElement().destroy();
                }
            }

            return item;
        }

    }, AntHill.prototype);
});