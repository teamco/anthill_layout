/**
 * Created with JetBrains RubyMine.
 * User: i061485
 * Date: 2/13/13
 * Time: 4:50 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'config/application',
    'config/workspace',
    'config/page',
    'config/layout',
    'config/template',
    'config/widget'
], function defineListeners(Application, Workspace, Page, Layout, Template, Widget) {

    /**
     * Load listeners
     */
    Application.prototype.localListeners = Application.prototype.localListeners || {};
    Workspace.prototype.localListeners = Workspace.prototype.localListeners || {};
    Page.prototype.localListeners = Page.prototype.localListeners || {};
    Template.prototype.localListeners = Template.prototype.localListeners || {};
    Layout.prototype.localListeners = Layout.prototype.localListeners || {};
    Widget.prototype.localListeners = Widget.prototype.localListeners || {};

    /**
     * Define Application Local listeners
     * @type {{
     *      successRendered: {name: string, callback: Function},
     *      resizeWindow: {name: string, params: *, callback: Function},
     *      resizeWindowHooks: [],
     *      resizeWorkspace: {name: string, callback: Function}
     * }}
     */
    $.extend(Application.prototype.localListeners, {

        successRendered: {
            name: 'success.rendered',
            callback: function successRenderedCallback() {
                this.view.renderApplication();

                if (this.controller.isDevelopmentMode()) {
                    this.view.debug();
                }
            }
        },

        resizeWindow: {
            name: 'resize.window',
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

    });

    /**
     * Define Workspace Local listeners
     * @type {{
     *      successCreated: {name: string, callback: Function},
     *      successRendered: {name: string, callback: Function},
     *      createPage: {name: string, callback: Function}
     *      resizePage: {name: string, callback: Function}
     * }}
     */
    $.extend(Workspace.prototype.localListeners, {

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

                page.observer.publish(
                    page.eventmanager.eventList.resizeWidgets
                );
            }
        }
    });

    /**
     * Define Page Local listeners
     * @type {{
     *      successCreated: {name: string, callback: Function},
     *      successRendered: {name: string, callback: Function},
     *      createWidget: {name: string, callback: Function}
     *      resizeWidget: {name: string, callback: Function}
     * }}
     */
    $.extend(Page.prototype.localListeners, {

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
                    widget.eventmanager.eventList.adoptDimensions,
                    [false, false]
                );
            }
        }
    });

    /**
     * Define Layout Local listeners
     * @type {{
     *      afterNestedOrganizer: {name: string, callback: Function}
     * }}
     */
    $.extend(Layout.prototype.localListeners, {

        afterNestedOrganizer: {
            name: 'after.nested.organizer',
            callback: function afterNestedOrganizerCallback() {
                // TODO
            }
        }
    });

    /**
     * Define Template Local listeners
     * @type {{
     *      successCreated: {name: string, callback: Function},
     *      successRendered: {name: string, callback: Function},
     *      createWidget: {name: string, callback: Function}
     * }}
     */
    $.extend(Template.prototype.localListeners, {

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
    });

    /**
     * Define Widget Local listeners
     * @type {{
     *      successCreated: {name: string, callback: Function},
     *      successRendered: {name: string, callback: Function}
     * }}
     */
    $.extend(Widget.prototype.localListeners, {

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

    });

});