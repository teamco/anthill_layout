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
    'config/widget'
], function defineListeners(Application, Workspace, Page, Layout, Widget) {

    /**
     * Load listeners
     */
    Application.prototype.localListeners = Application.prototype.localListeners || {};
    Workspace.prototype.localListeners = Workspace.prototype.localListeners || {};
    Page.prototype.localListeners = Page.prototype.localListeners || {};
    Layout.prototype.localListeners = Layout.prototype.localListeners || {};
    Widget.prototype.localListeners = Widget.prototype.localListeners || {};

    /**
     * Define Application Local listeners
     * @member App
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
     * @member Workspace
     * @type {{
     *      successCreated: {name: string, callback: Function},
     *      successRendered: {name: string, callback: Function},
     *      createPage: {name: string, callback: Function},
     *      afterLoadingItems: {name: string, callback: Function},
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
                this.observer.publish(
                    this.eventmanager.eventList.loadPreferences
                );
                this.observer.publish(
                    this.eventmanager.eventList.updateSiteWidth
                );
            }
        },

        createPage: {
            name: 'create.page',
            callback: function createPageCallback() {
                this.observer.publish(
                    this.eventmanager.eventList.setPageContainerDimensions
                );
            }
        },

        afterLoadingItems: {
            name: 'after.loading.items',
            callback: function afterLoadingItemsCallback() {
                this.controller.switchPageOnHashChange.bind(this)
            }
        },

        resizePage: {
            name: 'resize.page',
            callback: function resizePageCallback(page) {

                page.controller.updateLayout();

                page.observer.publish(
                    page.eventmanager.eventList.resizeWidgets
                );

                page.controller.updateHeight();
            }
        }
    });

    /**
     * Define Page Local listeners
     * @member Page
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
                    true
                );

                this.observer.publish(
                    this.eventmanager.eventList.updateHeight
                );
            }
        }
    });

    /**
     * Define Layout Local listeners
     * @member Layout
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
     * Define Widget Local listeners
     * @member Widget
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
            callback: function successRenderedCallback(silent) {

                /**
                 * Define silent
                 * @type {boolean}
                 */
                silent = this.base.defineBoolean(silent, false, true);

                /**
                 * Define event
                 * @type {stopResizable|string}
                 */
                var event = this.eventmanager.eventList.stopResizable;

                this.view.renderWidget();
                this.controller.setupInteractions();

                this.observer.publish(event, [
                    event, {
                        organize: !silent,
                        animate: false
                    },
                    arguments
                ]);

                this.observer.publish(
                    this.eventmanager.eventList.loadContent
                );

                this.observer.publish(
                    this.eventmanager.eventList.loadPreferences
                );
            }
        }

    });

});