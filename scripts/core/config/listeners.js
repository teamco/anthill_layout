/**
 * Created with JetBrains RubyMine.
 * User: i061485
 * Date: 2/13/13
 * Time: 4:50 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/prototype',
    'config/application',
    'config/workspace',
    'config/page',
    'config/template',
    'config/widget'
], function defineListeners(Prototype, Application, Workspace, Page, Template, Widget) {

    Prototype.preload([
        Application,
        Workspace,
        Page,
        Template,
        Widget
    ], 'localListeners', {});

    /**
     * Define Application Global listeners
     * @type {{
     *      successRendered: {name: string, callback: Function},
     *      resizeWindow: {name: string, params: *, callback: Function},
     *      resizeWorkspace: {name: string, callback: Function}
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

        resizeWindow: {
            name: 'resize.window',
            params: { buffer: 100 },
            callback: function resizeWindowCallback() {
                this.observer.publish(
                    this.eventmanager.eventList.resizeWorkspaces
                );
            }
        },

        resizeWindowHooks: [],

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
     *      successCreated: {name: string, callback: Function},
     *      successRendered: {name: string, callback: Function},
     *      createPage: {name: string, callback: Function}
     *      resizePage: {name: string, callback: Function}
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
                page.controller.updateLayout();
                console.log(page.layout.controller.minCellWidth())
                page.observer.publish(
                    page.eventmanager.eventList.resizeWidgets
                );
            }
        }
    };

    /**
     * Define Page Global listeners
     * @type {{
     *      successCreated: {name: string, callback: Function},
     *      successRendered: {name: string, callback: Function},
     *      createWidget: {name: string, callback: Function}
     *      resizeWidget: {name: string, callback: Function}
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
                widget.observer.publish(
                    widget.eventmanager.eventList.adoptDimensions
                );
            }
        }
    };

    /**
     * Define Template Global listeners
     * @type {{
     *      successCreated: {name: string, callback: Function},
     *      successRendered: {name: string, callback: Function},
     *      createWidget: {name: string, callback: Function}
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
     *      successCreated: {name: string, callback: Function},
     *      successRendered: {name: string, callback: Function}
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
        }

    };

});