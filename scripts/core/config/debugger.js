/**
 * Created with JetBrains RubyMine.
 * User: i061485
 * Date: 2/13/13
 * Time: 4:50 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/debugger',
    'config/application',
    'config/workspace',
    'config/page',
    'config/template',
    'config/widget',
    'controller/application.controller',
    'controller/behavior/behavior.debugger',
    'event/application.event.manager',
    'event/widget.event.manager'
], function defineDebuggerBehaviors(Debugger, Application, Workspace, Page, Template, Widget, ApplicationController, BehaviorDebugger, ApplicationEventMgr, WidgetEventMgr) {

    ApplicationEventMgr.prototype.eventList.debugStart = 'debug.start';
    ApplicationEventMgr.prototype.eventList.debugEnd = 'debug.end';

    WidgetEventMgr.prototype.eventList.debugInteractions = {
        eventName: 'debug.interactions',
        params: { buffer: 1000 }
    };

    /**
     * Inject debugger functionality to application controller
     */
    for (var index in BehaviorDebugger.prototype) {

        if (BehaviorDebugger.prototype.hasOwnProperty(index)) {
            ApplicationController.prototype[index] = BehaviorDebugger.prototype[index];
        }
    }

    /**
     * Load listeners
     */
    Application.prototype.localListeners = Application.prototype.localListeners || {};
    Widget.prototype.localListeners = Widget.prototype.localListeners || {};

    /**
     * Define debugStart
     * @type {{name: string, callback: Function}}
     */
    Application.prototype.localListeners.debugStart = {
        name: 'debug.start',
        callback: function debugStartCallback() {

            /**
             * Define Debugger
             * @type {modules.debugger}
             */
            this.debugger = new Debugger(this);
        }
    };

    /**
     * Define debugEnd
     * @type {{name: string, callback: Function}}
     */
    Application.prototype.localListeners.debugEnd = {
        name: 'debug.end',
        callback: function debugEndCallback() {
            this.debugger.destroy();
        }
    };

    /**
     * Define resizeWindowHooks
     * @type {{name: string, callback: Function}}
     */
    anthill.base.define(
            Application.prototype.localListeners.resizeWindowHooks, []
        ).push({
            name: 'resize.window.hooks',
            callback: function resizeWindowHooksCallback() {

                /**
                 * Define local instance of a debugger
                 * @type {Debugger}
                 */
                var debug = this.debugger;

                if (debug && debug.grid.visible) {
                    debug.grid.showGrid();
                }
            }
        }
    );


    /**
     * Define Widget debugInteractions
     * @type {{name: string, params: {buffer: number}, callback: Function}}
     */
    Widget.prototype.localListeners.debugInteractions = {
        name: "debug.interactions",
        params: {
            buffer: 50
        },
        callback: function debugInteractionsCallback() {

            /**
             * Define local instance of Debugger
             * @type {Debugger}
             */
            var debug = this.controller.root().debugger;

            if (typeof(debug) !== 'undefined') {

                /**
                 * Define debugger widget
                 * @type {*}
                 */
                var widget = debug.widget;

                widget.updateWidgetInfo.apply(widget, arguments);
            }
        }
    };

});