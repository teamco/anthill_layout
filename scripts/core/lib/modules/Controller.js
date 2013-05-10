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
         * Get Application mode
         * @returns {*|number}
         */
        getMode: function getMode() {
            return this.root().config.mode;
        },

        /**
         * Get parent node
         * @returns {*}
         */
        getParent: function getParent() {
            return this.scope.config.parent;
        },

        /**
         * Get Application Root
         * @returns {*|string}
         */
        root: function root() {
            var root = this.scope;
            while (root.config.hasOwnProperty('parent')) {
                root = root.config.parent;
            }

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
                item = scope.model.getItemNamespace();
            if (item === 'object') {
                scope.logger.warn('Unable to locate current item');
            }
            return scope[scope.model.getItemNamespace()];
        },

        /**
         * Set item as current in parent node
         */
        setAsCurrent: function setAsCurrent() {
            this.getParent().controller.setCurrentItem(this.scope);
        },

        /**
         * Set current item
         * @param {{}} item
         * @returns {*}
         */
        setCurrentItem: function setCurrentItem(item) {
            var scope = this.scope;
            scope[scope.model.getItemNamespace()] = item;
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
                    parent: scope
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
         * Approve to destroy item
         * @param {*} item
         * @returns {boolean}
         */
        approveItemDestroy: function approveItemDestroy(item) {
            var base = this.base,
                scope = this.scope,
                $modal = scope.view.elements.$modal;

            if (!(base.isDefined(item) &&
                item.constructor.name === this.model.item.name)) {

                if (base.isDefined($modal)) {
                    item = $modal.item;
                    $modal.selfDestroy();
                }
            }

            if (this.checkCondition({
                condition: !base.isDefined(item),
                type: 'warn',
                msg: 'Undefined item'
            })) {
                return false;
            }

            scope.logger.debug(
                'Destroy ' + item.constructor.name,
                item,
                this.model.destroyItem(item)
            );

            scope.observer.publish(
                scope.eventmanager.eventList.afterDestroyItem
            );
        },

        /**
         * Destroy Item
         * @param {Object} item
         * @param {Boolean} silent
         */
        destroyItem: function destroyItem(item, silent) {
            this.base.defineBoolean(silent, false, true) ?
                this.controller.approveItemDestroy(item) :
                this.view.destroyWidgetModalDialog(item);
        },

        /**
         * Destroy Items
         */
        destroyItems: function destroyItems() {
            var items = this.model.destroyItems();
            this.logger.debug(
                'Destroy Items',
                items
            );
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

        afterCreateItem: function afterCreateItem() {
            this.logger.debug('After create item');
            this.controller.updateDebugger();
        },

        afterDestroyItem: function afterDestroyItem() {
            this.logger.debug('After destroy item');
            this.controller.updateDebugger();
        },

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