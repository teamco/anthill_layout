/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/4/12
 * Time: 10:14 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/base',
    'modules/observer',
    'modules/logger'
], function defineMVC(Base, Observer, Logger) {

    /**
     * Define MVC
     * @class MVC
     * @extends {Base}
     * @param opts
     * @constructor
     */
    var MVC = function MVC(opts) {

        /**
         * Define local base
         * @type {Base}
         * @property
         * @member MVC
         */
        var base = this.base;

        /**
         * Define MVC Relationship from -> to
         * @type {Array}
         */
        this.RELATIONS = [
            ['Controller', 'Model'],
            ['View', 'Controller']
        ];

        /**
         * Define reserved methods
         * @type {{
         *  create: {singular: Array},
         *  destroy: {singular: Array, plural: Array}
         * }}
         */
        this.RESERVED = {
            create: {
                singular: [
                    'Workspace',
                    'Page',
                    'Widget'
                ]
            },
            destroy: {
                singular: [
                    'Workspace',
                    'Page',
                    'Widget'
                ],
                plural: [
                    'Workspaces',
                    'Pages',
                    'Widgets'
                ]
            }
        };

        /**
         * Define opts
         * @type {*}
         */
        opts = base.define(opts, {}, true);

        /**
         * Define scope
         * @type {mvc.scope}
         */
        this.scope = opts.scope;

        /**
         * Apply Configure
         * Define selfConfig
         * @type {*}
         */
        var selfConfig = base.define(opts.config[0], {}, true),
            /**
             * Define selfDefaults
             * @type {*}
             */
                selfDefaults = base.define(opts.config[1], {}, true);

        /**
         * Define scope config
         * @type {mvc.scope.config}
         */
        this.scope.config = base.lib.hash.extendHash(
            selfConfig,
            selfDefaults
        );

        /**
         * Define mvc components
         * @type {mvc.components}
         */
        this.components = base.define(opts.components, [opts.components], true);

        /**
         * Define mvc config
         * @type {mvc.config}
         */
        this.config = base.define(selfConfig, {}, true);

        /**
         * Define mvc force creating components
         * @type {mvc.force}
         */
        this.force = base.defineBoolean(opts.force, false, true);

        /**
         * Define mvc render
         * @type {mvc.render}
         */
        this.render = base.defineBoolean(opts.render, true, true);

        var config = {},
            scope = this.scope;

        scope.eventmanager = {};

        $.extend(config, scope.config);

        /**
         * Define mvc applyLogger
         * @type {mvc.applyLogger}
         */
        this.applyLogger();

        /**
         * Define mvc applyConfig
         * @type {mvc.applyConfig}
         */
        this.applyConfig();

        /**
         * Define mvc applyMVC
         * @type {mvc.applyMVC}
         */
        this.applyMVC();

        /**
         * Define mvc applyObserver
         * @type {mvc.applyObserver}
         */
        this.applyObserver();

        /**
         * Define mvc applyEventManager
         * @type {mvc.applyEventManager}
         */
        this.applyEventManager();

        /**
         * Define mvc applyPermissions
         * @type {mvc.applyPermissions}
         */
        this.applyPermissions();

        /**
         * Define mvc defineSetting
         * @type {mvc.defineSetting}
         */
        this.defineSetting();

        /**
         * Define local instance of eventList
         * @type {*}
         */
        var eventList = scope.eventmanager.eventList;

        if (eventList) {

            /**
             * Publish before InitConfig event
             */
            scope.observer.publish(
                eventList.beforeInitConfig, [
                    'Config before create',
                    config
                ]
            );

            /**
             * Publish after InitConfig event
             */
            scope.observer.publish(
                eventList.afterInitConfig, [
                    'Config after create',
                    scope.config
                ]
            );
        }
    };

    return MVC.extend({

        /**
         * Define MVC
         * @param {Function|String} mvc
         * @param {Boolean} force
         */
        defineMVC: function defineMVC(mvc, force) {

            var base = this.base,
                name = base.isString(mvc) ?
                    mvc : this.constructorName(mvc),
                scope = this.scope;

            if (base.isFunction(mvc)) {

                scope[name] = new mvc();

            } else {

                if (force) {

                    var scopeName = this.constructorName(scope.constructor);

                    var fn = new Function(
                        scopeName,
                        [
                            'return function ', mvc,
                            '(', scopeName, ') { this.scope = ', scopeName, '; };'
                        ].join('')
                    );

                    scope[name.toLowerCase()] = new (new fn(scope))(scope);

                    mvc = scope[name.toLowerCase()].constructor;

                }
            }

            return mvc;

            //scope.logger.debug('Define MVC', mvc, force);
        },

        /**
         * Get constructor name
         * @param {*} scope
         * @returns {string}
         */
        constructorName: function constructorName(scope) {
            return scope.name.toLowerCase();
        },

        /**
         * Set relation between MVC components
         */
        setRelation: function setRelation() {
            var relations = this.RELATIONS,
                i = 0, l = relations.length,
                from, to,
                scope = this.scope,
                base = this.base;

            for (i; i < l; i += 1) {
                var relation = relations[i];
                from = relation[0].toLowerCase();
                to = relation[1].toLowerCase();
                if (base.isDefined(scope[from]) &&
                    base.isDefined(scope[to])) {
                    scope[from][to] = scope[to];
                }
            }

            //scope.logger.debug('Set MVC Relations', relations);

        },

        /**
         * Apply MVC
         * @returns {boolean}
         */
        applyMVC: function applyMVC() {
            var i = 0,
                l = this.components.length;

            for (i; i < l; i += 1) {
                var mvc = this.components[i];

                if (!this.base.isDefined(mvc)) {
                    return false;
                }

                this.scope[
                    this.constructorName(
                        this.defineMVC(mvc, this.force)
                    )].scope = this.scope;

            }

            this.setRelation();

            //this.scope.logger.debug('Apply MVC', this.components);

        },

        /**
         * Apply config
         */
        applyConfig: function applyConfig() {
            var base = this.base,
                scope = this.scope,
                timestamp = base.lib.datetime.timestamp(this.config.timestamp),
                config = scope.config;

            config.uuid = base.lib.generator.UUID(this.config.uuid);
            config.timestamp = timestamp;

            if (this.render) {
                config.html = base.define(config.html, {}, true);
                config.html.selector = '.' + this.constructorName(scope.constructor);
            }

            //scope.logger.debug('Apply config', config);
        },

        /**
         * Apply event manager
         */
        applyEventManager: function applyEventManager() {
            var scope = this.scope,
                base = this.base,
                eventManager = scope.eventmanager;

            if (base.isDefined(eventManager)) {

                eventManager.scope = scope;
                eventManager.abstract = base.define(eventManager.abstract, {}, true);

                var eventList = eventManager.eventList,
                    index;

                for (index in eventList) {
                    if (eventList.hasOwnProperty(index)) {
                        var event = eventList[index],
                            callback = scope.controller[index];

                        if (!base.isDefined(callback)) {
                            var method = index.toPoint().split('.'),
                                key = method[0];

                            method.shift();
                            method = ('.' + method.join('.')).toCamel();

                            if (this.RESERVED.hasOwnProperty(key)) {
                                if ($.inArray(method, this.RESERVED[key].singular) > -1) {
                                    eventManager.abstract[key + 'Item'] = index;
                                    callback = scope.controller[key + 'Item'];
                                } else if ($.inArray(method, this.RESERVED[key].plural) > -1) {
                                    eventManager.abstract[key + 'Items'] = index;
                                    callback = scope.controller[key + 'Items'];
                                } else {
                                    this.scope.logger.warn(
                                        'Undefined Event Callback', [
                                            scope.controller,
                                            key + method
                                        ]);
                                }
                            }
                        }

                        eventManager.subscribe({
                            event: event,
                            callback: callback
                        }, true);
                    }
                }

                eventManager.subscribe({
                    event: 'before.init.config',
                    callback: scope.controller.getConfigLog
                }, true);

                eventManager.subscribe({
                    event: 'after.init.config',
                    callback: scope.controller.getConfigLog
                }, true);

                eventManager.subscribe({
                    event: 'success.created',
                    callback: scope.controller.successCreated
                }, true);

                eventManager.subscribe({
                    event: 'success.rendered',
                    callback: scope.controller.successRendered
                }, true);

                eventManager.subscribe({
                    event: 'after.create.item',
                    callback: scope.controller.afterCreateItem
                }, true);

                eventManager.subscribe({
                    event: 'after.destroy.item',
                    callback: scope.controller.afterDestroyItem
                }, true);

                eventManager.subscribe({
                    event: 'after.destroy.items',
                    callback: scope.controller.afterDestroyItems
                }, true);

                scope.logger.debug('Subscribe events', eventManager);

                this.applyGlobalListeners();

            } else {
                scope.logger.warn('Undefined Event manager', scope.eventmanager);
            }
        },

        /**
         * Apply global listeners
         */
        applyGlobalListeners: function applyGlobalListeners() {
            var index, event,
                scope = this.scope;
            if (typeof scope.globalListeners === 'object') {
                for (index in scope.globalListeners) {
                    if (scope.globalListeners.hasOwnProperty(index)) {
                        event = scope.globalListeners[index];
                        scope.eventmanager.subscribe({
                            event: {
                                eventName: event.name,
                                params: event.params,
                                scope: event.scope
                            },
                            callback: event.callback
                        }, false);
                    }
                }
            }

            scope.logger.debug('Apply global listeners', scope.globalListeners);
        },

        /**
         * Define permissions
         * @returns {boolean}
         */
        applyPermissions: function applyPermissions() {

            this.applyGlobalPermissions();

            var scope = this.scope,
                permission = scope.permission;

            if (scope.controller.checkCondition({
                condition: !this.base.isDefined(permission),
                type: 'warn',
                msg: 'Undefined permission'
            })) {
                return false;
            }

            permission.capability = {};

            this.base.isFunction(permission.config) ?
                permission.config() :
                scope.logger.warn('Force created permissions', permission);

            scope.logger.debug('Local permissions', permission);

        },

        /**
         * Apply global permissions
         * @returns {*|boolean}
         */
        applyGlobalPermissions: function applyGlobalPermissions() {
            var base = this.base,
                scope = this.scope,
                mode = scope.controller.getMode();

            if (scope.controller.checkCondition({
                condition: !base.isDefined(mode),
                type: 'warn',
                msg: 'Undefined global mode'
            })) {
                return false;
            }

            if (scope.controller.checkCondition({
                condition: !base.isDefined(scope.globalPermissions),
                type: 'warn',
                msg: 'Undefined global permission'
            })) {
                return false;
            }

            var capabilities = scope.globalPermissions[mode];

            if (scope.controller.checkCondition({
                condition: !base.isDefined(capabilities),
                type: 'warn',
                msg: 'Undefined global capabilities',
                args: mode
            })) {
                return false;
            }

            scope.logger.debug('Global permissions', capabilities);

            scope.config.permission = capabilities;
        },

        /**
         * Apply Observer
         */
        applyObserver: function applyObserver() {
            var scope = this.scope;
            scope.observer = new Observer();
            scope.observer.scope = scope;

            //scope.logger.debug('Apply Observer', scope.observer);
        },

        /**
         * Apply Logger
         */
        applyLogger: function applyLogger() {
            var scope = this.scope,
                base = this.base;
            scope.logger = new Logger();
            var logger = scope.logger;

            if (base.isDefined(scope.config.logger)) {
                if (base.isObject(Logger.prototype.config)) {
                    logger.config = scope.config.logger;
                } else {
                    Logger.prototype.config = scope.config.logger;
                }
            }

            logger.scope = scope;
            logger.defineLogs();

            //scope.logger.debug('Apply Logger', scope.logger);
        },

        /**
         * Define global setting
         */
        defineSetting: function defineSetting() {
            var scope = this.scope;
            if (this.base.isDefined(this.scope.model)) {
                scope.model.defineSetting();
            }

            //scope.logger.debug('Define model setting', scope.model.setting);
        }
    }, Base);

});