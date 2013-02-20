/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/18/12
 * Time: 8:22 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/base'
], function defineBaseController(Base) {

    /**
     * Base Controller
     * @constructor BaseController
     */
    var BaseController = function BaseController() {

    };

    return BaseController.extend({
        /**
         * Get Config Logger
         * @param {String} log
         * @param {Object} hash
         */
        getConfigLog: function getConfigLog(log, hash) {
            this.logger.debug(log, hash);
        },
        /**
         * Success Created
         */
        successCreated: function successCreated() {
            this.logger.debug(
                this.constructor.getConstructorName() +
                    ' was successfully created',
                this
            );
        },
        /**
         * Success Rendered
         */
        successRendered: function successRendered() {
            this.logger.debug(
                this.constructor.getConstructorName() +
                    ' was successfully rendered',
                this
            );
        },
        getCurrentItem: function getCurrentItem() {
            var scope = this.scope,
                item = scope.model.getItemNamespace();
            if (item === 'object') {
                scope.logger.warn('Unable to locate current item');
            }
            return scope[scope.model.getItemNamespace()];
        },
        setCurrentItem: function setCurrentItem(item) {
            var scope = this.scope;
            scope[scope.model.getItemNamespace()] = item;
            return this.getCurrentItem();
        },
        /**
         * Set Order
         * @param collector
         */
        setOrder: function setOrder(collector) {
            var scope = this.scope,
                base = this.base;
            scope.config.order = base.define(
                scope.config.order,
                base.lib.hash.hashLength(collector)
            );
        },
        /**
         * Extend Config
         * @param {{}} opts
         * @returns {*}
         */
        extendConfig: function extendConfig(opts) {
            var scope = this.scope;
            return this.base.lib.hash.extendHash({
                html: {
                    container: [
                        '#', scope.model.getUUID(),
                        '-', scope.constructor.getConstructorName().toLowerCase()
                    ].join('')
                },
                parent: scope
            }, opts);
        },
        /**
         * Create Item
         * @param {{}} opts
         */
        createItem: function createItem(opts) {
            var item = this.model.createItem(
                this.controller.extendConfig(opts)
            );
            this.logger.info(
                'Create ' + item.constructor.getConstructorName(),
                this.model.getUUID(item),
                item
            );
        },
        /**
         * Destroy Item
         * @param {Object} item
         */
        destroyItem: function destroyItem(item) {
            var items = this.model.destroyItem(item);
            this.logger.info(
                'Destroy ' + item.constructor.getConstructorName(),
                item,
                items
            );
        },
        /**
         * Destroy Items
         */
        destroyItems: function destroyItems() {
            var items = this.model.destroyItems();
            this.logger.info(
                'Destroy Items',
                items
            );
        },
        /**
         * Set Interaction
         * @param {String} event
         * @param {Function} callback
         * @returns {*}
         */
        setInteraction: function setInteraction(event, callback) {
            this.scope.interactions[event] = callback;
            return this.getInteraction(event);
        },
        /**
         * Get Interaction
         * @param {String} event
         * @returns {*}
         */
        getInteraction: function getInteraction(event) {
            return this.scope.interactions[event];
        }
    }, Base);
});