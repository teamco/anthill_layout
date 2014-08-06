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
     * @extends AntHill
     * @extends BaseCrud
     * @extends BaseResize
     * @constructor BaseController
     */
    var BaseController = function BaseController() {

    };

    return BaseController.extend('BaseController', {

        /**
         * Before init config
         * @memberOf BaseController
         */
        beforeInitConfig: function beforeInitConfig() {
            this.logger.debug('Before init config', arguments);
        },

        /**
         * After init config
         * @memberOf BaseController
         */
        afterInitConfig: function afterInitConfig() {
            this.logger.debug('After init config', arguments);
        },

        /**
         * After loading items
         * @memberOf BaseController
         */
        afterLoadingItems: function afterLoadingItems() {
            this.logger.debug(
                'After loading items',
                this.model.getItems()
            );
            this.controller.setAsLoading(false);
        },

        /**
         * Set core loading attribute
         * @memberOf BaseController
         * @param load
         */
        setAsLoading: function setAsLoading(load) {

            /**
             * Get root
             * @type {App}
             */
            var root = this.root();

            root.loading = load;

            if (this.scope === root) {

                root.observer.publish(
                    root.eventmanager.eventList.setAsLoaded
                );
            }
        },

        /**
         * Set as loaded
         * @memberOf BaseController
         */
        setAsLoaded: function setAsLoaded() {

            this.logger.debug('Application was loaded');

            /**
             * Get item constructor name
             * @type {string}
             */
            var namespace = this.model.getItemNameSpace();

            /**
             * Get workspace
             * @type {Workspace}
             */
            var workspace = this[namespace];

            if (workspace.controller) {

                workspace.controller.switchPageOnHashChange.bind(workspace)();
            }
        },

        /**
         * Check if core already loaded
         * @memberOf @BaseController
         * @returns {boolean}
         */
        isLoading: function isLoading() {
            return this.root().loading;
        },

        /**
         * Get Application mode
         * @memberOf BaseController
         * @returns {*|number}
         */
        getMode: function getMode() {
            return this.root().config.mode;
        },

        /**
         * Get parent node object
         * @memberOf BaseController
         * @returns {*}
         */
        getContainment: function getContainment() {
            return this.scope.containment;
        },

        /**
         * Get Application Root
         * @memberOf BaseController
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
         * Get Workspace
         * @memberOf BaseController
         * @param {string} [uuid]
         * @returns {Workspace}
         */
        getWorkspace: function getWorkspace(uuid) {

            /**
             * Get root
             * @type {App}
             */
            var root = this.root();

            /**
             * Get workspace
             * @type {Workspace}
             */
            var workspace = this.base.isDefined(uuid) ?
                root.model.getItemByUUID(uuid) :
                root.controller.getCurrentItem();

            return workspace;
        },

        /**
         * Get Page
         * @memberOf BaseController
         * @param {string} [uuid]
         * @returns {Page}
         */
        getPage: function getPage(uuid) {

            /**
             * Define workspace
             * @type {Workspace}
             */
            var workspace = this.getWorkspace();

            /**
             * Define page
             * @type {Page}
             */
            var page = this.base.isDefined(uuid) ?
                workspace.model.getItemByUUID(uuid) :
                workspace.controller.getCurrentItem();

            return page;
        },

        /**
         * Get Widget
         * @memberOf BaseController
         * @returns {*|Widget}
         */
        getWidget: function getWidget() {
            return this.getPage().controller.getCurrentItem();
        },

        /**
         * Get Config Logger
         * @memberOf BaseController
         * @param {String} log
         * @param {Object} hash
         */
        getConfigLog: function getConfigLog(log, hash) {
            this.logger.debug(log, hash);
        },

        /**
         * Get scope view
         * @memberOf BaseController
         * @returns {view}
         */
        getView: function getView() {
            return this.scope.view;
        },

        /**
         * Get scope model
         * @memberOf BaseController
         * @returns {model}
         */
        getModel: function getModel() {
            return this.scope.model;
        },

        /**
         * Success Created
         * @memberOf BaseController
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
         * @memberOf BaseController
         */
        successRendered: function successRendered() {
            this.logger.debug(
                this.i18n.t('success.rendered').replace(/\{0\}/, this.constructor.name),
                this
            );
        },

        /**
         * Success Render Footer
         * @memberOf BaseController
         * @param {HeaderElement} $header
         * @param {boolean} render
         */
        successRenderHeader: function successRenderHeader($header, render) {
            this.logger.debug('Success Render Header', render, $header);
        },

        /**
         * Success Render Footer
         * @memberOf BaseController
         * @param {FooterElement} $footer
         * @param {boolean} render
         */
        successRenderFooter: function successRenderFooter($footer, render) {
            this.logger.debug('Success Render Footer', render, $footer);
        },

        /**
         * Get current items
         * @memberOf BaseController
         * @returns {*}
         */
        getCurrentItem: function getCurrentItem() {

            var scope = this.scope,
                sname = scope.model.getItemNameSpace();

            if (sname === 'object') {
                scope.logger.error('Unable to locate current item');
            }

            return scope[sname];
        },

        /**
         * Set item as current in parent node
         * @memberOf BaseController
         */
        setAsCurrent: function setAsCurrent() {
            this.getContainment().controller.setCurrentItem(
                this.scope
            );
        },

        /**
         * Set current item
         * @memberOf BaseController
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
         * @memberOf BaseController
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
         * @memberOf BaseController
         * @returns {Boolean}
         */
        isDevelopmentMode: function isDevelopmentMode() {
            return this.getMode() === 'development';
        },

        /**
         * Get Authorize Mode
         * @memberOf BaseController
         * @returns {Boolean}
         */
        isAuthorizeMode: function isAuthorizeMode() {
            return this.getMode() === 'authorize';
        },

        /**
         * Get Consumption Mode
         * @memberOf BaseController
         * @returns {boolean}
         */
        isConsumptionMode: function isConsumptionMode() {
            return this.getMode() === 'consumption';
        },

        /**
         * Get Custom Mode
         * @memberOf BaseController
         * @returns {boolean}
         */
        isCustomMode: function isCustomMode() {
            return this.getMode() === 'custom';
        },

        /**
         * Transfer preferences to containment
         * @memberOf BaseController
         * @param index
         * @param value
         */
        transferPreferences: function transferPreferences(index, value) {

            if (!this.controller.isWidgetContent()) {
                this.config.preferences[index] = value;
                return false;
            }
        },

        /**
         * Get preferences
         * @memberOf BaseController
         * @returns {{}}
         */
        getPreferences: function getPreferences() {
            return this.model.preferences;
        },

        /**
         * Get rules
         * @memberOf BaseController
         * @returns {{}}
         */
        getRules: function getRules() {
            return this.model.rules;
        },

        /**
         * Extend Config
         * @memberOf BaseController
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
         * @memberOf BaseController
         * @param {Resizable|Draggable|Function} Event
         * @returns {*}
         */
        setInteraction: function setInteraction(Event) {

            /**
             * Event name
             * @type {string}
             */
            var ename = Event.name.toLowerCase();

            /**
             * Register interactions
             * @type {Draggable|Resizable}
             */
            this.scope.interactions[ename] = new Event(this.scope);

            return this.getInteraction(ename);
        },

        /**
         * Get Interaction
         * @memberOf BaseController
         * @param {String} event
         * @returns {*}
         */
        getInteraction: function getInteraction(event) {
            return this.scope.interactions[event];
        },

        /**
         * Check is root
         * @memberOf BaseController
         * @param scope
         * @returns {boolean}
         */
        isRoot: function isRoot(scope) {
            return scope === this.root();
        },

        /**
         * Check is workspace
         * @memberOf BaseController
         * @returns {boolean}
         */
        isWorkspace: function isWorkspace() {
            return this.scope.constructor.name === 'Workspace';
        },

        /**
         * Check is page
         * @memberOf BaseController
         * @returns {boolean}
         */
        isPage: function isPage() {
            return this.scope.constructor.name === 'Page';
        },

        /**
         * Check is widget
         * @memberOf BaseController
         * @returns {boolean}
         */
        isWidget: function isWidget() {
            return this.scope.constructor.name === 'Widget';
        },

        /**
         * Check is widget content
         * @memberOf BaseController
         * @returns {boolean}
         */
        isWidgetContent: function isWidgetContent() {

            /**
             * Get widget
             * @type {Widget}
             */
            var widget = this.scope.controller.getContainment();

            if (!widget) {
                this.scope.logger.info('Root is not widget content');
                return false;
            }

            return widget.controller.isWidget();
        },

        /**
         * Store data after layout organize
         * @memberOf BaseController
         * @param [node]
         * @param [data]
         * @param {number} [counter]
         */
        store: function store(node, data, counter) {

            /**
             * Define root
             * @type {App}
             */
            var root = this.root();

            /**
             * Define node
             * @type {*}
             */
            node = this.base.define(
                node,
                root,
                true
            );

            /**
             * Define data
             * @type {*}
             */
            data = this.base.define(data, {
                collector: {}
            }, true);

            /**
             * Define item list
             * @type {*}
             */
            var items = node.model.getItems(),
                index;

            /**
             * Define item name space
             * @type {string}
             */
            var cname = node.model.getItemNameSpace();

            if (node[cname].model) {

                /**
                 * Define data
                 * @type {*}
                 */
                data.collector[cname] = data.collector[cname] || {};

                $.extend(
                    true,
                    data.collector[cname],
                    node.controller.collectItemProperties(
                        !node[cname].model.getItems()
                    )
                );
            }

            for (index in items) {

                if (items.hasOwnProperty(index)) {

                    var item = items[index];

                    if (item.model && item.model.getItems()) {

                        this.store.bind(node.controller)(item, data, Object.keys(items).length);
                    }
                }
            }

            if (!counter) {
                root.model.setting.save(data);
            }
        },

        /**
         * Get subscribers list
         * @memberOf BaseController
         * @param {string} event
         * @return {Array}
         */
        getSubscribers: function getSubscribers(event) {

            /**
             * Define rules
             * @type {{}}
             */
            var rules = this.model.rules;

            return rules.subscribers ?
                rules.subscribers[event] : []
        },

        /**
         * Collect items data
         * @memberOf BaseController
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