/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/4/12
 * Time: 10:14 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'config/anthill',
    'modules/Observer',
    'modules/Logger'
], function defineMVC(AntHill, Observer, Logger) {

    /**
     * Define MVC
     * @class MVC
     * @param opts
     * @constructor
     * @extends AntHill
     */
    var MVC = function MVC(opts) {

        /**
         * Define scope
         * @property MVC
         * @type {mvc.scope}
         */
        this.scope = opts.scope;

        /**
         * Define MVC Relationship from -> to
         * @property MVC
         * @type {Array}
         */
        this.RELATIONS = [
            ['Controller', 'Model'],
            ['View', 'Controller']
        ];

        /**
         * Define local defaults
         * @type {string[]}
         */
        var singular = [
                'Workspace',
                'Page',
                'Widget'
            ],
            plural = [
                'Workspaces',
                'Pages',
                'Widgets'
            ];

        /**
         * Define reserved methods
         * @property MVC
         * @type {{
         *      create: {singular: Array},
         *      destroy: {singular: Array, plural: Array}
         * }}
         */
        this.RESERVED = {
            resize: {
                singular: singular,
                plural: plural
            },
            create: {
                singular: singular
            },
            destroy: {
                singular: singular,
                plural: plural
            }
        };

        /**
         * Define default listeners
         * @property MVC
         * @type {{
         *      beforeInitConfig: string,
         *      afterInitConfig: string,
         *      successCreated: string,
         *      successRendered: string,
         *      afterCreateItem: string,
         *      afterDestroyItem: string,
         *      afterDestroyItems: string,
         *      afterResizeWindow: string,
         *      successRenderHeader: string,
         *      successRenderFooter: string,
         *      bindModelObserver: string,
         *      defineGenericGetter: string,
         *      openUrlOnEvent: string,
         *      successCreateElement: string,
         *      successBuildElement: string,
         *      successDestroyElement: string
         * }}
         */
        this.defaultListeners = {
            beforeInitConfig: 'before.init.config',
            afterInitConfig: 'after.init.config',
            successCreated: 'success.created',
            successRendered: 'success.rendered',
            afterCreateItem: 'after.create.item',
            afterDestroyItem: 'after.destroy.item',
            afterDestroyItems: 'after.destroy.items',
            afterResizeWindow: 'after.resize.window',
            successRenderHeader: 'success.render.header',
            successRenderFooter: 'success.render.footer',
            bindModelObserver: 'bind.model.observer',
            defineGenericGetter: 'define.generic.getter',
            openUrlOnEvent: 'open.url.on.event',
            successCreateElement: 'success.create.element',
            successBuildElement: 'success.build.element',
            successDestroyElement: 'success.destroy.element'
        };

        /**
         * Reset opts
         * @type {*}
         */
        opts = this.base.define(opts, {}, true);

        /**
         * Apply Configure
         * Define selfConfig
         * @type {*}
         */
        var selfConfig = this.base.define(opts.config[0], {}, true);

        /**
         * Define selfDefaults
         * @type {*}
         */
        var selfDefaults = this.base.define(opts.config[1], {}, true);

        /**
         * Define scope config
         * @property MVC.scope
         * @type {mvc.scope.config}
         */
        this.scope.config = this.base.lib.hash.extendHash(
            selfConfig,
            selfDefaults
        );

        /**
         * Define mvc components
         * @property MVC
         * @type {mvc.components}
         */
        this.components = this.base.define(
            opts.components,
            [opts.components],
            true
        );

        /**
         * Define mvc config
         * @property MVC
         * @type {mvc.config}
         */
        this.config = this.base.define(selfConfig, {}, true);

        /**
         * Define mvc force creating components
         * @property MVC
         * @type {Boolean}
         */
        this.force = this.base.defineBoolean(opts.force, false, true);

        /**
         * Define mvc render
         * @property MVC
         * @type {Boolean}
         */
        this.render = this.base.defineBoolean(opts.render, true, true);

        var config = {},
            scope = this.scope;

        /**
         * Define event manager
         * @memberOf BaseEvent
         * @type {Object}
         */
        scope.eventmanager = {};

        $.extend(true, config, scope.config);

        this.init();

        /**
         * Define local instance of eventList
         * @property BaseEvent.eventmanager
         * @type {Object}
         */
        var eventList = scope.eventmanager.eventList;

        if (eventList) {

            // Publish before InitConfig event
            scope.observer.publish(
                eventList.beforeInitConfig, [
                    'Config before create',
                    config
                ]
            );

            // Publish after InitConfig event
            scope.observer.publish(
                eventList.afterInitConfig, [
                    'Config after create',
                    scope.config
                ]
            );
        }
    };

    return MVC.extend('MVC', {

        /**
         * Init MVC
         * @memberOf MVC
         */
        init: function init() {

            /**
             * Define containment
             * @type {mvc.defineContainment}
             */
            this.defineContainment();

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
        },

        /**
         * Define parent node
         * @memberOf MVC
         */
        defineContainment: function defineContainment() {

            var scope = this.scope,
                config = scope.config;

            if (this.base.isDefined(config.containment)) {

                /**
                 * Define parent node
                 * @memberOf AntHill
                 * @type {*}
                 */
                scope.containment = config.containment;
                delete config.containment;
            }
        },

        /**
         * Define MVC
         * @memberOf MVC
         * @param {Function|String} mvcPattern
         * @param {Boolean} [force]
         * @returns {*}
         */
        defineMVC: function defineMVC(mvcPattern, force) {

            var base = this.base,
                scope = this.scope,
                name = mvcPattern;

            if (base.isFunction(mvcPattern)) {

                /**
                 * Define name space
                 * @type {string}
                 */
                name = mvcPattern.prototype.name.replace(scope.name, '').toLowerCase();

                /**
                 * Define pattern
                 * @type {*}
                 */
                scope[name] = new mvcPattern();

            } else if (force) {

                /**
                 * Define scope name
                 * @type {string}
                 */
                var scopeName = scope.name.toLowerCase();

                /**
                 * Define function
                 * @type {Function}
                 */
                var fn = new Function(
                    scopeName,
                    [
                        'return function ', mvcPattern,
                        '(', scopeName, ') { this.scope = ', scopeName, '; };'
                    ].join('')
                );

                scope[name.toLowerCase()] = new (new fn(scope))(scope);
            }

            return name;
        },

        /**
         * Set relation between MVC components
         * @memberOf MVC
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

                    /**
                     * Define relation
                     * @property {BaseController|BaseModel|BaseView}
                     */
                    scope[from][to] = scope[to];
                }
            }

        },

        /**
         * Apply MVC
         * @memberOf MVC
         * @returns {boolean}
         */
        applyMVC: function applyMVC() {
            var i = 0,
                l = this.components.length;

            for (i; i < l; i += 1) {

                /**
                 * Get mvc component
                 * @type {*}
                 */
                var mvc = this.components[i];

                if (!this.base.isDefined(mvc)) {
                    this.scope.logger.warn('Undefined pattern', i, this.components);
                    return false;
                }

                var pattern = this.defineMVC(mvc, this.force).toLowerCase(),
                    ref = this.scope[pattern];

                /**
                 * Define scope
                 * @type {mvc.scope}
                 * @property {BaseController|BaseModel|BaseView}
                 */
                ref.scope = this.scope;

                this.applyMVCShims(pattern);
            }

            this.setRelation();
        },

        /**
         * Apply MVC shims
         * @memberOf MVC
         * @param pattern
         */
        applyMVCShims: function applyMVCShims(pattern) {

            // Get scope
            var scope = this.scope;

            if (pattern === 'view') {

                /**
                 * Define elements
                 * @property BaseView
                 * @type {Object}
                 */
                scope.view.elements = {};
            }

            if (pattern === 'model' &&
                scope.controller.isWidgetContent()) {

                /**
                 * Define preferences
                 * @memberOf BaseModel
                 * @type {Object}
                 */
                scope.model.preferences = this.base.define(
                    scope.model.preferences,
                    {}, true
                );
            }
        },

        /**
         * Apply config
         * @memberOf MVC
         */
        applyConfig: function applyConfig() {
            var base = this.base,
                scope = this.scope,
                timestamp = base.lib.datetime.timestamp(
                    this.config.timestamp
                ),
                config = scope.config;

            config.uuid = base.lib.generator.UUID(this.config.uuid);
            config.timestamp = timestamp;

            if (this.render) {
                config.html = base.define(config.html, {}, true);
                config.html.selector = scope.name.toDash();
            }
        },

        /**
         * Apply event manager
         * @memberOf MVC
         */
        applyEventManager: function applyEventManager() {

            var scope = this.scope,
                base = this.base,
                eventmanager = scope.eventmanager;

            if (!base.isDefined(eventmanager)) {

                scope.logger.warn('Undefined Event manager');
                return false;
            }

            this.applyGlobalEvents();

            eventmanager.scope = scope;
            eventmanager.abstract = base.define(
                eventmanager.abstract, {}, true
            );

            var eventList = eventmanager.eventList,
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

                                eventmanager.abstract[key + 'Item'] = index;
                                callback = scope.controller[key + 'Item'];

                            } else if ($.inArray(method, this.RESERVED[key].plural) > -1) {

                                eventmanager.abstract[key + 'Items'] = index;
                                callback = scope.controller[key + 'Items'];

                            } else {

                                this.scope.logger.warn(
                                    'Undefined Event Callback', [
                                        scope.controller,
                                        key + method
                                    ]
                                );
                            }
                        }
                    }

                    eventmanager.subscribe({
                        event: event,
                        callback: callback
                    }, true);
                }
            }

            this.applyDefaultListeners();

            scope.logger.debug('Subscribe events', eventmanager);

            this.applyListeners('local');
            this.applyListeners('global');
        },

        /**
         * Apply default listeners
         * @memberOf MVC
         */
        applyDefaultListeners: function applyDefaultListeners() {

            /**
             * Local instance of default listeners
             * @type {*}
             */
            var listeners = this.defaultListeners;

            for (var index in listeners) {

                if (listeners.hasOwnProperty(index)) {
                    this.scope.eventmanager.subscribe({
                        event: listeners[index],
                        callback: this.scope.controller[index]
                    }, true);
                }
            }
        },

        /**
         * Apply global events
         * @memberOf MVC
         */
        applyGlobalEvents: function applyGlobalEvents() {

            // Get scope
            var scope = this.scope,
                index, event,
                eventManager = scope.eventmanager;

            if (scope.globalEvents) {

                for (index in scope.globalEvents) {

                    if (scope.globalEvents.hasOwnProperty(index)) {

                        event = scope.globalEvents[index];

                        if (eventManager.eventList.hasOwnProperty(index)) {

                            scope.logger.warn('Event already defined', index, event);

                        } else {

                            scope.logger.debug('Add event', index, event);
                            eventManager.eventList[index] = event;
                        }
                    }
                }
            }
        },

        /**
         * Apply listeners
         * @memberOf MVC
         */
        applyListeners: function applyListeners(type) {

            var index, event,
                scope = this.scope,
                listener = type + 'Listeners';

            if (typeof scope[listener] === 'object') {

                for (index in scope[listener]) {

                    if (scope[listener].hasOwnProperty(index)) {

                        /**                                                     ß
                         * Define local instance of an event
                         * @type {*}
                         */
                        event = scope[listener][index];

                        if (!this.base.isArray(event)) {
                            event = [event];
                        }

                        for (var i = 0, l = event.length; i < l; i++) {

                            scope.eventmanager.subscribe({
                                event: {
                                    eventName: event[i].name,
                                    params: event[i].params,
                                    scope: event[i].scope
                                },
                                callback: event[i].callback
                            }, false);
                        }
                    }
                }
            }

            scope.logger.debug('Apply ' + type + ' listeners', scope[listener]);
        },

        /**
         * Define permissions
         * @memberOf MVC
         * @returns {boolean}
         */
        applyPermissions: function applyPermissions() {

            if (!this.scope.config.hasOwnProperty('plugin')) {
                this._applyPermissions('local');
                this._applyPermissions('global');
            }

            /**
             * Get scope
             * @type {mvc.scope|{permission, controller, logger}}
             */
            var scope = this.scope;

            /**
             * Get permissions
             * @type {BasePermission|{capability}}
             */
            var permission = scope.permission;

            if (scope.controller.checkCondition({
                    condition: !this.base.isDefined(permission),
                    type: 'warn',
                    msg: 'Undefined permission'
                })) {
                return false;
            }

            /**
             * Define capability
             * @property BasePermission
             * @type {{}}
             */
            permission.capability = {};

            _.isFunction(permission.config) ?
                permission.config() :
                scope.logger.warn('Force created permissions', permission);

            scope.logger.debug('Local permissions', permission);
        },

        /**
         * Apply global permissions
         * @memberOf MVC
         * @returns {*|boolean}
         */
        _applyPermissions: function _applyPermissions(type) {

            var base = this.base,
                scope = this.scope,
                mode = scope.controller.getMode(),
                permission = type + 'Permissions';

            if (scope.controller.checkCondition({
                    condition: !base.isDefined(mode),
                    type: 'warn',
                    msg: 'Undefined ' + type + ' mode'
                })) {
                return false;
            }

            if (scope.controller.checkCondition({
                    condition: !base.isDefined(scope[permission]),
                    type: 'warn',
                    msg: 'Undefined ' + type + ' permission'
                })) {

                scope.constructor.prototype[permission] = {};
            }

            // Define capability
            var capabilities = scope[permission][mode];

            if (scope.controller.checkCondition({
                    condition: !base.isDefined(capabilities),
                    type: 'warn',
                    msg: 'Undefined ' + type + ' capabilities',
                    args: mode
                })) {

                scope.constructor.prototype[permission][mode] = {};
            }

            scope.logger.debug('Apply ' + type + ' permissions', capabilities);

            if (!base.isDefined(scope.config.permission)) {
                scope.config.permission = {};
            }

            $.extend(scope.config.permission, capabilities);
        },

        /**
         * Apply Observer
         * @memberOf MVC
         */
        applyObserver: function applyObserver() {

            var scope = this.scope;

            /**
             * Define observer
             * @type {modules.observer}
             */
            scope.observer = new Observer();

            // Define observer scope
            scope.observer.scope = scope;
        },

        /**
         * Apply Logger
         * @memberOf MVC
         */
        applyLogger: function applyLogger() {

            var scope = this.scope,
                base = this.base,
                config = scope.config.logger;

            /**
             * Define Logger
             * @type {Logger}
             */
            scope.logger = new Logger(scope);

            if (base.isDefined(config)) {
                Logger.prototype.config = config || {};
            }

            scope.logger.defineLogs();
        }

    }, AntHill.prototype);
});