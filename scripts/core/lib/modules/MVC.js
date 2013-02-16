/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/4/12
 * Time: 10:14 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'jquery',
    'modules/base',
    'modules/observer',
    'modules/logger'
], function ($, Base, Observer, Logger) {
    /**
     *
     * @param opts
     * @constructor
     */
    var MVC = function MVC(opts) {

        this.base = this.base;

        var base = this.base;

        // MVC Relationship from -> to
        this.RELATIONS = [
            ['Controller', 'Model'],
            ['View', 'Controller']
        ];

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

        opts = base.define(opts, {}, true);

        this.scope = opts.scope;

        // Apply Configure
        var selfConfig = base.define(opts.config[0], {}, true),
            selfDefaults = base.define(opts.config[1], {}, true);
        this.scope.config = base.lib.hash.extendHash(
            selfConfig,
            selfDefaults
        );

        this.components = base.define(opts.components, [opts.components], true);
        this.config = base.define(selfConfig, {}, true);
        this.force = base.defineBoolean(opts.force, false, true);
        this.render = base.defineBoolean(opts.render, true, true);

        var config = {},
            scope = this.scope;

        scope.eventmanager = {};

        $.extend(config, scope.config);

        this.applyLogger();
        this.applyConfig();
        this.applyMVC();
        this.applyObserver();
        this.applyEventManager();

        if (scope.eventmanager.eventList) {

            scope.observer.publish(
                scope.eventmanager.eventList.beforeInitConfig, [
                    'Config before create',
                    config
                ]
            );

            scope.observer.publish(
                scope.eventmanager.eventList.afterInitConfig, [
                    'Config after create',
                    scope.config
                ]
            );
        }
    };

    MVC.extend({
        defineMVC: function defineMVC(mvc, force) {

            var base = this.base,
                name = this.constructorName(mvc),
                scope = this.scope;

            if (base.isFunction(mvc)) {

                scope[name] = new mvc();

            } else {

                if (force) {

                    var scopeName = this.constructorName(),
                        fnName = scopeName + mvc.getConstructorName();

                    var fn = new Function(
                        name,
                        [
                            'return function ', fnName,
                            '(', name, ') { this.', scopeName,
                            ' = ', name, ' };'
                        ].join('')
                    );

                    scope[name] = new fn();

                }
            }
        },
        constructorName: function constructorName(scope) {
            return scope.getConstructorName().toLowerCase();
        },
        getPrototype: function getPrototype(scope) {
            return this.base.lib.function.getPrototype(scope);
        },
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

        },
        applyMVC: function applyMVC() {
            var i = 0,
                l = this.components.length;

            for (i; i < l; i += 1) {
                var mvc = this.components[i];

                if (!this.base.isDefined(mvc)) {
                    return false;
                }

                this.defineMVC(mvc, this.force);
                this.scope[this.constructorName(mvc)].scope = this.scope;

            }

            this.setRelation();

        },
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
        },
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
                                        'Undefined Event Callback',
                                        [
                                            scope.controller,
                                            key + method
                                        ]
                                    );
                                }
                            }
                        }

                        eventManager.subscribe({
                            eventName: event,
                            callback: callback
                        });
                    }
                }

                eventManager.subscribe({
                    eventName: 'before.init.config',
                    callback: scope.controller.getConfigLog
                });

                eventManager.subscribe({
                    eventName: 'after.init.config',
                    callback: scope.controller.getConfigLog
                });

                eventManager.subscribe({
                    eventName: 'success.created',
                    callback: scope.controller.successCreated
                });

                if (typeof scope.globalListeners === 'object') {
                    for (index in scope.globalListeners) {
                        if (scope.globalListeners.hasOwnProperty(index)) {
                            event = scope.globalListeners[index];
                            eventManager.subscribe({
                                eventName: event.name,
                                callback: event.callback
                            });
                        }
                    }
                }

            } else {
                scope.logger.warn('Event Manager', scope.eventmanager);
            }
        },
        applyObserver: function applyObserver() {
            var scope = this.scope;
            scope.observer = new Observer();
            scope.observer.scope = scope;
        },
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

        }
    }, Base);

    return MVC;
});