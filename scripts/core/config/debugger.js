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
    'config/widget'
], function defineListeners(Debugger, Application, Workspace, Page, Template, Widget) {

    Application.prototype.localListeners = Application.prototype.localListeners || {};
    Workspace.prototype.localListeners = Workspace.prototype.localListeners || {};
    Page.prototype.localListeners = Page.prototype.localListeners || {};
    Template.prototype.localListeners = Template.prototype.localListeners || {};
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