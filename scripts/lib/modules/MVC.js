/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/4/12
 * Time: 10:14 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'jquery',
    'modules/base'
], function ($, Base) {
    var MVC = function MVC(opts) {

        // MVC Relationship from -> to
        var RELATIONS = [
            ['Controller', 'Model'],
            ['View', 'Controller']
        ];

        opts = this.base.define(opts, {}, true);

        this.scope = opts.scope;
        this.components = this.base.define(opts.components, [opts.components], true);
        this.force = this.base.defineBoolean(opts.force, false, true);

        // MVC setting
        this.applyMVC();

        // Set MV Relation
        this.setRelation(RELATIONS);
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
//    // Attach observer
//    /**
//     * @type {App.Observable}
//     */
//    this.scope.observer = new App.Observable(this.scope);
//
//    // Add Listeners
//    if (App.base.isFunction(this.scope.EventManager)) {
//        this.scope.eventManager = new this.scope.EventManager(this.scope);
//        if (this.scope.config.globalListeners) {
//            this.scope.EventManager.prototype.defineListeners =
//                App.callbacks.defineListeners.bind(this.scope.eventManager)(
//                    this.scope,
//                    this.scope.config.globalListeners[this.scope]
//                );
//        }
//    }
//
//    /**
//     *
//     * @type {App.PermissionManager}
//     */
//    this.scope.permissionManager = new App.PermissionManager(
//        this.scope.config.permission
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

            var name = this.constructorName(mvc);

            if (this.base.isFunction(mvc)) {

                this.scope.constructor.prototype[name] = new mvc();

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

                    this.scope.constructor.prototype[name] = new fn();

                }
            }
        },
        constructorName: function constructorName(scope) {
            return scope.getConstructorName().toLowerCase();
        },
        setRelation: function setRelation(relations) {
            var i = 0, l = relations.length,
                from, to;

            for (i; i < l; i += 1) {
                var relation = relations[i];
                from = relation[0].toLowerCase();
                to = relation[1].toLowerCase();
                if (this.base.isDefined(this.scope[from]) &&
                    this.base.isDefined(this.scope[to])) {
                    this.scope[from].constructor.prototype[to] = this.scope[to];
                }
            }

        },
        applyMVC: function applyMVC() {
            var i = 0, l = this.components.length;

            for (i; i < l; i += 1) {
                var mvc = this.components[i];
                this.defineMVC(mvc, this.force);
                this.scope[this.constructorName(mvc)].
                    constructor.prototype[this.constructorName(this.scope)] = this.scope;
            }
        }
    }, Base);

    return MVC;
});