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
    var MVC = function MVC(scope, force) {

        this.scope = scope;

        // MVC setting
        this.defineMVC('Model', force);
        this.defineMVC('View', force);
        this.defineMVC('Controller', force);

        // Set MV Relation
        this.setRelation('Controller', 'Model');
        this.setRelation('View', 'Controller');
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
            mvc += '';

            var name = mvc.toLowerCase();

            if (this.isFunction(this.scope[mvc])) {

                this.scope.constructor.prototype[name] = new this.scope[mvc](this.scope);

            } else {

                if (force) {

                    if (!this.isFunction(this.scope[mvc])) {
                        var scopeName = this.constructorName(),
                            fnName = scopeName + mvc;

                        var fn = new Function(
                            name,
                            [
                                'return function ', fnName,
                                '(', name, ') { this.', scopeName.toLowerCase(),
                                ' = ', name, ' };'
                            ].join('')
                        );

                        this.scope.constructor.prototype[mvc] = fn();

                        this.scope.constructor.prototype[name] = new this.scope[mvc](this.scope);

                    }

                }
            }
        },
        constructorName: function constructorName() {
            var name = this.getConstructorName(this.scope);
            if (this.isDefined(name)) {
                return name;
            } else {
                // Unknown constructor name
                return false;
            }
        },
        setRelation: function setRelation(from, to) {
            if (this.scope.hasOwnProperty(from.toLowerCase()) &&
                this.scope.hasOwnProperty(to.toLowerCase())) {
                this.scope.controller[to.toLowerCase()] = this.scope[to.toLowerCase()];
            }
        }
    }, Base);

    return MVC;
});