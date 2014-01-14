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

    /**
     * Define Application Global listeners
     * @type {{
     *  successRendered: {name: string, callback: Function},
     *  debugStart: {name: string, callback: Function},
     *  debugEnd: {name: string, callback: Function},
     *  resizeWindow: {name: string, params: *, callback: Function}
     *  resizeWorkspace: {name: string, callback: Function}
     * }}
     */
    Application.prototype.localListeners = {

        successRendered: {
            name: "success.rendered",
            callback: function successRenderedCallback() {
                this.view.renderApplication();

                if (this.controller.isDevelopmentMode()) {
                    this.view.debug();
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
        },

        debugEnd: {
            name: 'debug.end',
            callback: function debugEndCallback() {
                this.debugger.destroy();
            }
        },

        resizeWindow: {
            name: 'resize.window',
            params: {
                buffer: 500
            },
            callback: function resizeWindowCallback() {
                this.observer.publish(
                    this.eventmanager.eventList.resizeWorkspaces
                );
            }
        },

        resizeWorkspace: {
            name: 'resize.workspace',
            callback: function resizeWorkspaceCallback(workspace) {
                workspace.observer.publish(
                    workspace.eventmanager.eventList.resizePages
                );
            }
        }

    };

    /**
     * Define Workspace Global listeners
     * @type {{
     *  successCreated: {name: string, callback: Function},
     *  successRendered: {name: string, callback: Function},
     *  createPage: {name: string, callback: Function}
     *  resizePage: {name: string, callback: Function}
     * }}
     */
    Workspace.prototype.localListeners = {

        successCreated: {
            name: "success.created",
            callback: function successCreatedCallback() {
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
                this.observer.publish(
                    this.eventmanager.eventList.setPageContainerHeight
                );
            }
        },

        resizePage: {
            name: 'resize.page',
            callback: function resizePageCallback(page) {
                page.observer.publish(
                    page.eventmanager.eventList.resizeWidgets
                );
                //page.controller.updateLayout();
            }
        }
    };

    /**
     * Define Page Global listeners
     * @type {{
     *  successCreated: {name: string, callback: Function},
     *  successRendered: {name: string, callback: Function},
     *  createWidget: {name: string, callback: Function}
     *  resizeWidget: {name: string, callback: Function}
     * }}
     */
    Page.prototype.localListeners = {

        successCreated: {
            name: "success.created",
            callback: function successCreatedCallback() {
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
                this.observer.publish(
                    this.eventmanager.eventList.updateHeight
                );
            }
        },

        resizeWidget: {
            name: 'resize.widget',
            callback: function resizeWidgetCallback(widget) {
                console.log(this, widget);
            }
        }
    };

    /**
     * Define Template Global listeners
     * @type {{
     *  successCreated: {name: string, callback: Function},
     *  successRendered: {name: string, callback: Function},
     *  createWidget: {name: string, callback: Function}
     * }}
     */
    Template.prototype.localListeners = {

        successCreated: {
            name: "success.created",
            callback: function successCreatedCallback() {
            }
        },

        successRendered: {
            name: "success.rendered",
            callback: function successRenderedCallback(widget) {
                this.view.renderTemplate(widget);
            }
        },

        createWidget: {
            name: 'create.widget',
            callback: function createWidgetCallback() {
            }
        }
    };

    /**
     * Define Widget Global listeners
     * @type {{
     *  successCreated: {name: string, callback: Function},
     *  successRendered: {name: string, callback: Function},
     *  debugInteractions: {name: string, params: {buffer: number}, callback: Function}
     * }}
     */
    Widget.prototype.localListeners = {

        successCreated: {
            name: "success.created",
            callback: function successCreatedCallback() {
            }
        },

        successRendered: {
            name: "success.rendered",
            callback: function successRenderedCallback() {
                var event = this.eventmanager.eventList.stopResizable;
                this.view.renderWidget();
                this.controller.setupInteractions();
                this.observer.publish(event, [event, true, false, arguments]);
            }
        },

        debugInteractions: {
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
        }

    };

});