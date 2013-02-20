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
    'config/widget'
], function defineListeners(Debugger, Application, Workspace, Page, Widget) {

    Application.prototype.globalListeners = {
        successRendered: {
            name: "success.rendered",
            callback: function successRenderedCallback() {
                this.view.renderApplication();

                if (this.controller.isDevelopmentMode()) {
                    this.view.debug();
                    this.observer.publish(this.eventmanager.eventList.debugStart);
                }
            }
        },
        debugStart: {
            name: 'debug.start',
            callback: function debugStartCallback() {
                /**
                 * Define Debugger
                 * @type {modules.debugger}
                 */
                this.debugger = new Debugger(this);
            }
        }
    };

    Workspace.prototype.globalListeners = {
        successCreated: {
            name: "success.created",
            callback: function successCreatedCallback() {
                this.controller.defineAbstractDebugger();
            }
        },
        successRendered: {
            name: "success.rendered",
            callback: function successRenderedCallback() {
                this.view.renderWorkspace();
            }
        },
        createPage: {
            name: 'create.page',
            callback: function createPageCallback() {
                this.observer.publish(this.eventmanager.eventList.setPageContainerHeight);
            }
        }
    };

    Page.prototype.globalListeners = {
        successCreated: {
            name: "success.created",
            callback: function successCreatedCallback() {
                this.controller.defineAbstractDebugger();
            }
        },
        successRendered: {
            name: "success.rendered",
            callback: function successRenderedCallback() {
                this.view.renderPage();
                this.controller.updateLayout();
            }
        },
        createWidget: {
            name: 'create.widget',
            callback: function createWidgetCallback() {
                this.observer.publish(this.eventmanager.eventList.setPageHeight);
            }
        }
    };

    Widget.prototype.globalListeners = {
        successCreated: {
            name: "success.created",
            callback: function successCreatedCallback() {
                this.controller.defineAbstractDebugger(true);
            }
        },
        successRendered: {
            name: "success.rendered",
            callback: function successRenderedCallback() {
                this.view.renderWidget();
                this.controller.setupInteractions();
            }
        }

    };

});