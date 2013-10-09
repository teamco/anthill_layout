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
     * Define Base Controller
     * @class BaseController
     * @constructor BaseController
     */
    var BaseController = function BaseController() {

    };

    return BaseController.extend({

        /**
         * Get Application mode
         * @returns {*|number}
         */
        getMode: function getMode() {
            return this.root().config.mode;
        },

        /**
         * Get parent node object
         * @returns {*}
         */
        getContainment: function getContainment() {
            return this.scope.config.containment;
        },

        /**
         * Get Application Root
         * @returns {*|string}
         */
        root: function root() {
            if (this.scope.config.hasOwnProperty('root')) {
                return this.scope.config.root;
            }

            /**
             * Define root instance
             * @type {*}
             */
            var root = this.scope;
            while (root.config.hasOwnProperty('containment')) {
                root = root.config.containment;
            }

            this.scope.config.root = root;

            return root;
        },

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
                this.constructor.name +
                    ' was successfully created',
                this
            );
        },

        /**
         * Success Rendered
         */
        successRendered: function successRendered() {
            this.logger.debug(
                this.constructor.name +
                    ' was successfully rendered',
                this
            );
        },

        /**
         * Get current items
         * @returns {*}
         */
        getCurrentItem: function getCurrentItem() {
            var scope = this.scope,
                item = scope.model.getItemNameSpace();
            if (item === 'object') {
                scope.logger.warn('Unable to locate current item');
            }
            return scope[scope.model.getItemNameSpace()];
        },

        /**
         * Set item as current in parent node
         */
        setAsCurrent: function setAsCurrent() {
            this.getContainment().controller.setCurrentItem(this.scope);
        },

        /**
         * Set current item
         * @param {{}} item
         * @returns {*}
         */
        setCurrentItem: function setCurrentItem(item) {
            var scope = this.scope;
            scope[scope.model.getItemNameSpace()] = item;
            return this.getCurrentItem();
        },

        /**
         * Check condition
         * @param {{condition, msg, [type], [args]}} opts
         * @returns {boolean}
         */
        checkCondition: function checkCondition(opts) {
            if (opts.condition) {
                opts.args ?
                    this.scope.logger[opts.type || 'debug'](opts.msg, opts.args) :
                    this.scope.logger[opts.type || 'debug'](opts.msg);
                return true;
            }
            return false;
        },

        /**
         * Get Development Mode
         * @returns {Boolean}
         */
        isDevelopmentMode: function isDevelopmentMode() {
            return this.getMode() === 'development';
        },

        /**
         * Get Authorize Mode
         * @returns {Boolean}
         */
        isAuthorizeMode: function isAuthorizeMode() {
            return this.getMode() === 'authorize';
        },

        /**
         * Get Consumption Mode
         * @returns {boolean}
         */
        isConsumptionMode: function isConsumptionMode() {
            return this.getMode() === 'consumption';
        },

        /**
         * Get Custom Mode
         * @returns {boolean}
         */
        isCustomMode: function isCustomMode() {
            return this.getMode() === 'custom';
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
            var base = this.base,
                scope = this.scope,
                config = base.lib.hash.extendHash({
                    html: {
                        container: [
                            '#', scope.model.getUUID(),
                            '-', scope.constructor.name.toLowerCase()
                        ].join('')
                    },
                    containment: scope
                }, opts);

            scope.logger.debug('Configuration', config);

            return config;
        },

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
         * Set Interaction
         * @param {String} event
         * @param {*} callback
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
        },

        /**
         * After create item event
         */
        afterCreateItem: function afterCreateItem() {
            this.logger.debug('After create item');
            this.controller.updateDebugger();
        },

        /**
         * After destroy item event
         */
        afterDestroyItem: function afterDestroyItem() {
            this.logger.debug('After destroy item');
            this.controller.updateDebugger();
        },

        /**
         * After destroy item event
         */
        afterDestroyItems: function afterDestroyItems() {
            this.logger.debug('After destroy items');
            this.controller.updateDebugger();
        },

        /**
         * Update debugger info
         * @returns {boolean}
         */
        updateDebugger: function updateDebugger() {
            var scope = this.scope,
                cname = scope.constructor.name.toLowerCase(),
                debug = scope.controller.root().debugger;

            if (!this.base.isDefined(debug)) {
                return false;
            }

            debug[cname].updateItems(scope);
        }

    }, Base);
});