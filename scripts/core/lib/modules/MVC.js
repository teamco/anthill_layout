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
    'modules/logger',
    'modules/observer'
], function ($, Base, Logger, Observer) {
    var MVC = function MVC(opts) {

        // MVC Relationship from -> to
        this.RELATIONS = [
            ['Controller', 'Model'],
            ['View', 'Controller']
        ];

        opts = this.base.define(opts, {}, true);

        this.scope = opts.scope;
        this.components = this.base.define(opts.components, [opts.components], true);
        this.config = this.base.define(opts.config, {}, true);
        this.force = this.base.defineBoolean(opts.force, false, true);

        this.applyConfig();
        this.applyMVC();
        this.applyObserver();
        this.applyEventManager();
        this.setRelation();

        this.base.lib.function.getProperties(this.scope).logger = this.logger;
//
//    // Development mode
//    this.scope.development = new App.Development(this.scope);
//
//    if (this.debug) {
//        if (App.base.isFunction(this.scope.Debug)) {
//            // Add debugger panel
//            this.scope.debug = new this.scope.Debug(this.scope);
//        }
//    }
//
//    // Attach mixin functionality
//    App.mixin.extend(this, this, 'Controller');
//    App.mixin.extend(this, this, 'Model');
//    App.mixin.extend(this, this, 'View');
//
        /**
         * Attach observer
         * @type {Observer}
         */
//        this.scope.constructor.prototype.observer = new Observer(this.scope);
//        this.scope.constructor.prototype.eventManager = new EventManager(this.scope);

//    // Add Listeners
//    if (App.base.isFunction(this.scope.EventManager)) {
//        if (this.scope.demo.globalListeners) {
//            this.scope.EventManager.prototype.defineListeners =
//                App.callbacks.defineListeners.bind(this.scope.eventManager)(
//                    this.scope,
//                    this.scope.demo.globalListeners[this.scope]
//                );
//        }
//    }
//
//    /**
//     *
//     * @type {App.PermissionManager}
//     */
//    this.scope.permissionManager = new App.PermissionManager(
//        this.scope.demo.permission
//    );
//
//    if (App.base.isFunction(this.scope.Context)) {
//        this.scope.context = new this.scope.Context(this.scope);
//        if (App.base.isFunction(this.scope.context.EventManager)) {
//            this.scope.context.observer = new App.Observable(this.scope.context);
//            this.scope.context.eventManager = new this.scope.context.EventManager(this.scope.context);
//            this.scope.context.observer.fireEvent(this.scope.context.eventManager.eventList.afterContextCreated, this.scope.context);
//        }
//    }
//
//    this.scope.development.info(this.scope[1] + ' configured');

    };

    MVC.extend({
        defineMVC: function defineMVC(mvc, force) {

            var name = this.constructorName(mvc),
                constructor = this.base.lib.function.getProperties(this.scope);

            if (this.base.isFunction(mvc)) {

                constructor[name] = new mvc();

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

                    constructor[name] = new fn();

                }
            }
        },
        constructorName: function constructorName(scope) {
            return scope.getConstructorName().toLowerCase();
        },
        setRelation: function setRelation() {
            var relations = this.RELATIONS,
                i = 0, l = relations.length,
                from, to;

            for (i; i < l; i += 1) {
                var relation = relations[i];
                from = relation[0].toLowerCase();
                to = relation[1].toLowerCase();
                if (this.base.isDefined(this.scope[from]) &&
                    this.base.isDefined(this.scope[to])) {
                    this.base.lib.function.getProperties(
                        this.scope[from]
                    )[to] = this.scope[to];
                }
            }

        },
        applyMVC: function applyMVC() {
            var i = 0, l = this.components.length;

            for (i; i < l; i += 1) {
                var mvc = this.components[i],
                    scope = this.constructorName(this.scope);
                this.defineMVC(mvc, this.force);

                var self = this.base.lib.function.getProperties(
                    this.scope[this.constructorName(mvc)]
                );

                self[scope] = this.scope;
                self.scope = scope;

            }

        },
        applyConfig: function applyConfig() {
            var uuid = this.base.define(
                    this.config.uuid,
                    this.base.lib.generator.UUID()
                ),
                timestamp = this.base.define(
                    this.config.timestamp,
                    this.base.lib.datetime.timestamp()
                ),
                config = this.scope.config;

            config.uuid = uuid;
            config.timestamp = timestamp;
        },
        applyEventManager: function applyEventManager() {
            var self = this.scope,
                scope = this.constructorName(self),
                eventManager = self.eventmanager;

            if (!this.base.isDefined(eventManager)) {
                return false;
            }

            var eventManagerPrototype =
                this.base.lib.function.getProperties(eventManager);

            eventManagerPrototype[scope] = self;
            eventManagerPrototype.scope = scope;

            eventManager.defineEvents();
        },
        applyObserver: function applyObserver() {
            var self = this.scope,
                scope = this.constructorName(self);

            var observerPrototype =
                this.base.lib.function.getProperties(this.observer);

            observerPrototype[scope] = self;
            observerPrototype.scope = scope;

            this.scope.constructor.prototype.observer = new this.observer.constructor;
        }
    }, Base, Logger, Observer);

    return MVC;
});