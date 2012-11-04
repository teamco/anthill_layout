/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/4/12
 * Time: 10:14 PM
 * To change this template use File | Settings | File Templates.
 */

var MVC = function MVC(scope) {

//    this.parent = null;
    this.scope = scope;

//
//    if (App.base.isDefined(this.parent) && App.base.isObject(this.parent)) {
//
//        this.parent = App.base.constructorName(this.parent);
//        if (App.base.isDefined(this.parent)) {
//            this.scope[this.parent.toLowerCase()] = this.parent;
//        } else {
//            // Unknown constructor name
//            return false;
//        }
//    }
//
//    // Init Elements
//    this.scope = App.base.constructorName(this.scope);
//    if (App.base.isDefined(this.scope)) {
//        this.scope.elements = new App.Element.prototype[this.scope](this.scope);
//    } else {
//        // Unknown constructor name
//        return false;
//    }
//
    // MVC setting
    this.checkFn('Model');
    this.checkFn('View');
    this.checkFn('Controller');

    // Set MV Relation
    // Model
//    this.scope.model.view = this.scope.view;
//    this.scope.model.controller = this.scope.controller;
    // Controller
//    this.scope.controller.view = this.scope.view;
//    this.scope.controller.model = this.scope.model;
    // View
//    this.scope.view.model = this.scope.model;
//    this.scope.view.controller = this.scope.controller;
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

jQuery.extend(true, MVC.prototype, {
    checkFn: function checkFn(name) {
        name += '';
        if (this.scope.root.com.base.isFunction(this.scope[name])) {
            this.scope[name.toLowerCase()] = new this.scope[name](this.scope);
        }

    }
});