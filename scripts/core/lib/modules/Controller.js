/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/18/12
 * Time: 8:22 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'config/anthill',
    'controller/behavior/behavior.crud',
    'controller/behavior/behavior.window.resize'
], function defineBaseController(AntHill, Crud, Resize) {

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
            return this.scope.containment;
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
            while (root.hasOwnProperty('containment')) {
                root = root.containment;
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
         * Get scope view
         * @returns {view}
         */
        getView: function getView() {
            return this.scope.view;
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
        successRendered: function successRendered() {  if(!this.i18n)debugger
            this.logger.debug(
                this.i18n.t('success.rendered').replace(/\{0\}/, this.constructor.name),
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
         * @param {{config, [dom]}} opts
         * @returns {*}
         */
        extendConfig: function extendConfig(opts) {
            var base = this.base,
                scope = this.scope;

                opts.config = base.lib.hash.extendHash({
                    html: {
                        container: [
                            '#', scope.model.getUUID(),
                            '-', scope.constructor.name.toLowerCase()
                        ].join('')
                    },
                    containment: scope
                }, opts.config);

            scope.logger.debug('Configuration', opts.config);

            return opts;
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
         * Store data after layout organize
         * @param [node]
         * @param [data]
         */
        store: function store(node, data) {

            /**
             * Define node
             * @type {*}
             */
            node = this.base.define(
                node,
                this.root(),
                true
            );

            /**
             * Define data
             * @type {*}
             */
            data = this.base.define(data, {collector: {}}, true);

            /**
             * Define item list
             * @type {*}
             */
            var items = node.model.getItems();

            if (!items) {
                node.logger.debug('Collector', data);
                this.root().model.setting.save(data);
                return false;
            }

            /**
             * Define item name space
             * @type {string}
             */
            var cname = node.model.getItemNameSpace();

            /**
             * Define data
             * @type {*}
             */
            data.collector[cname] = node.controller.collectItemProperties(
                !node[cname].model.getItems()
            );

            this.store.bind(node.controller)(node[cname], data);
        },

        /**
         * Collect items data
         * @param {Boolean} collectDOM
         * @returns {{}}
         */
        collectItemProperties: function collectItemProperties(collectDOM) {

            var collector = {},
                items = this.model.getItems();

            if (items) {

                for (var index in items) {

                    if (items.hasOwnProperty(index)) {

                        var item = items[index],
                            uuid = item.model.getConfig('uuid');

                        collector[uuid] = {};

                        /**
                         * Define config
                         * @type {{}}
                         */
                        collector[uuid].config = this.base.lib.hash.extendHash(
                            item.model.getConfig(),
                            collector[uuid].config
                        );

                        /**
                         * Define containment
                         * @type {String}
                         */
                        collector[uuid].containment = item.containment.model.getConfig('uuid');

                        if (collectDOM) {

                            /**
                             * Collect DOM
                             * @type {{}}
                             */
                            collector[uuid].dom = item.dom;
                        }
                    }
                }
            }

            return collector;
        }

    }, AntHill.prototype, Crud.prototype, Resize.prototype);
});