/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/4/12
 * Time: 10:14 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/observer',
    'modules/logger'
], function defineMVC(Observer, Logger) {

    /**
     * Define MVC
     * @class MVC
     * @param opts
     * @constructor
     */
    var MVC = function MVC(opts) {

        /**
         * Define scope
         * @type {mvc.scope}
         */
        this.scope = opts.scope;

        /**
         * Define MVC Relationship from -> to
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
         * @type {{
         *  create: {singular: Array},
         *  destroy: {singular: Array, plural: Array}
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
         * @type {*}
         */
        this.defaultListeners = {
            'before.init.config': 'getConfigLog',
            'after.init.config': 'getConfigLog',
            'success.created': 'successCreated',
            'success.rendered': 'successRendered',
            'after.create.item': 'afterCreateItem',
            'after.destroy.item': 'afterDestroyItem',
            'after.destroy.items': 'afterDestroyItems',
            'after.resize.window': 'afterResizeWindow'
        };

        /**
         * Reset opts
         * @type {*}
         */
        opts = anthill.base.define(opts, {}, true);

        /**
         * Apply Configure
         * Define selfConfig
         * @type {*}
         */
        var selfConfig = anthill.base.define(opts.config[0], {}, true);

        /**
         * Define selfDefaults
         * @type {*}
         */
        var selfDefaults = anthill.base.define(opts.config[1], {}, true);

        /**
         * Define scope config
         * @type {mvc.scope.config}
         */
        this.scope.config = anthill.base.lib.hash.extendHash(
            selfConfig,
            selfDefaults
        );

        /**
         * Define mvc components
         * @type {mvc.components}
         */
        this.components = anthill.base.define(
            opts.components,
            [opts.components],
            true
        );

        /**
         * Define mvc config
         * @type {mvc.config}
         */
        this.config = anthill.base.define(selfConfig, {}, true);

        /**
         * Define mvc force creating components
         * @type {Boolean}
         */
        this.force = anthill.base.defineBoolean(opts.force, false, true);

        /**
         * Define mvc render
         * @type {Boolean}
         */
        this.render = anthill.base.defineBoolean(opts.render, true, true);

        var config = {},
            scope = this.scope;

        scope.eventmanager = {};

        $.extend(config, scope.config);

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
         * Define parent node
         */
        defineContainment: function defineContainment() {

            var scope = this.scope,
                config = scope.config;

            if (anthill.base.isDefined(config.containment)) {

                /**
                 * Define parent node
                 * @type {*}
                 */
                scope.containment = config.containment;
                delete config.containment;
            }
        },

        /**
         * Define MVC
         * @param {Function|String} mvcPattern
         * @param {Boolean} [force]
         */
        defineMVC: function defineMVC(mvcPattern, force) {

            var base = anthill.base,
                name = base.isString(mvcPattern) ?
                    mvcPattern :
                    mvcPattern.name.toLowerCase(),
                scope = this.scope;

            if (base.isFunction(mvcPattern)) {

                scope[name] = new mvcPattern();

            } else {

                if (force) {

                    var scopeName = scope.constructor.name.toLowerCase();

                    var fn = new Function(
                        scopeName,
                        [
                            'return function ', mvc,
                            '(', scopeName, ') { this.scope = ', scopeName, '; };'
                        ].join('')
                    );

                    scope[name.toLowerCase()] = new (new fn(scope))(scope);

                    mvcPattern = scope[name.toLowerCase()].constructor;

                }
            }

            return mvcPattern;

        },

        /**
         * Set relation between MVC components
         */
        setRelation: function setRelation() {
            var relations = this.RELATIONS,
                i = 0, l = relations.length,
                from, to,
                scope = this.scope,
                base = anthill.base;

            for (i; i < l; i += 1) {
                var relation = relations[i];
                from = relation[0].toLowerCase();
                to = relation[1].toLowerCase();
                if (base.isDefined(scope[from]) &&
                    base.isDefined(scope[to])) {
                    scope[from][to] = scope[to];
                }
            }

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

                if (!anthill.base.isDefined(mvc)) {
                    return false;
                }

                var pattern = this.defineMVC(mvc, this.force).name.toLowerCase(),
                    ref = this.scope[pattern];

                ref.scope = this.scope;

                if (pattern === 'view') {

                    /**
                     * Define elements
                     * @type {{}}
                     */
                    this.scope.view.elements = {};
                }
            }

            this.setRelation();
        },

        /**
         * Apply config
         */
        applyConfig: function applyConfig() {
            var base = anthill.base,
                scope = this.scope,
                timestamp = base.lib.datetime.timestamp(
                    this.config.timestamp
                ),
                config = scope.config;

            config.uuid = base.lib.generator.UUID(this.config.uuid);
            config.timestamp = timestamp;

            if (this.render) {
                config.html = base.define(config.html, {}, true);
                config.html.selector = '.' + scope.constructor.name.toLowerCase();
            }
        },

        /**
         * Apply event manager
         */
        applyEventManager: function applyEventManager() {

            var scope = this.scope,
                base = anthill.base,
                eventManager = scope.eventmanager;

            if (base.isDefined(eventManager)) {

                eventManager.scope = scope;
                eventManager.abstract = base.define(
                    eventManager.abstract, {}, true
                );

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
                                        ]
                                    );
                                }
                            }
                        }

                        eventManager.subscribe({
                            event: event,
                            callback: callback
                        }, true);
                    }
                }

                this.applyDefaultListeners();

                scope.logger.debug('Subscribe events', eventManager);

                this.applyListeners('local');
                this.applyListeners('global');

            } else {

                scope.logger.warn('Undefined Event manager', scope.eventmanager);
            }
        },

        /**
         * Apply default listeners
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
                        event: index,
                        callback: this.scope.controller[listeners[index]]
                    }, true);
                }
            }
        },

        /**
         * Apply listeners
         */
        applyListeners: function applyListeners(type) {

            var index, event,
                scope = this.scope,
                listener = type + 'Listeners';

            if (typeof scope[listener] === 'object') {

                for (index in scope[listener]) {

                    if (scope[listener].hasOwnProperty(index)) {

                        /**
                         * Define local instance of an event
                         * @type {*}
                         */
                        event = scope[listener][index];

                        if (!anthill.base.isArray(event)) {
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
         * @returns {boolean}
         */
        applyPermissions: function applyPermissions() {

            if (!this.scope.config.hasOwnProperty('plugin')) {
                this._applyPermissions('local');
                this._applyPermissions('global');
            }

            var scope = this.scope,
                permission = scope.permission;

            if (scope.controller.checkCondition({
                condition: !anthill.base.isDefined(permission),
                type: 'warn',
                msg: 'Undefined permission'
            })) {
                return false;
            }

            permission.capability = {};

            anthill.base.isFunction(permission.config) ?
                permission.config() :
                scope.logger.warn('Force created permissions', permission);

            scope.logger.debug('Local permissions', permission);

        },

        /**
         * Apply global permissions
         * @returns {*|boolean}
         */
        _applyPermissions: function _applyPermissions(type) {
            var base = anthill.base,
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
                return false;
            }

            var capabilities = scope[permission][mode];

            if (scope.controller.checkCondition({
                condition: !base.isDefined(capabilities),
                type: 'warn',
                msg: 'Undefined ' + type + ' capabilities',
                args: mode
            })) {
                return false;
            }

            scope.logger.debug('Apply ' + type + ' permissions', capabilities);

            if (!base.isDefined(scope.config.permission)) {
                scope.config.permission = {};
            }

            $.extend(scope.config.permission, capabilities);
        },

        /**
         * Apply Observer
         */
        applyObserver: function applyObserver() {
            var scope = this.scope;
            scope.observer = new Observer();
            scope.observer.scope = scope;
        },

        /**
         * Apply Logger
         */
        applyLogger: function applyLogger() {
            var scope = this.scope,
                base = anthill.base,
                config = scope.config.logger;

            scope.logger = new Logger(scope);

            if (base.isDefined(config)) {
                Logger.prototype.config = config || {};
            }

            scope.logger.defineLogs();
        }

    });

});