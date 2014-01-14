/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/18/12
 * Time: 8:22 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/base',
    'controller/behavior/crud',
    'controller/behavior/window.resize'
], function defineBaseController(Base, Crud, Resize) {

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

            /**
             * Define root instance
             * @type {*}
             */
            var root = this.scope;
            while (root.config.hasOwnProperty('containment')) {
                root = root.config.containment;
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
        }

    }, Base, Crud.prototype, Resize.prototype);
});