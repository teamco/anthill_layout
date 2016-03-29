/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/15
 * Time: 10:32 PM
 */

define([
    'config/workspace',
    'controller/workspace.controller'
], function defineWorkspaceListeners(Workspace, WorkspaceController) {

    /**
     * Define global events
     * @memberOf Workspace
     * @type {{createDesignTimePanel: string, createRunTimePanel: string}}
     */
    Workspace.prototype.globalEvents = {
        createDesignTimePanel: 'create.design.time.panel',
        createRunTimePanel: 'create.run.time.panel',
        loadGoogleAnalyticsTrackingId: 'load.google.analytics.tracking.id',
        loadSnapEngageCode: 'load.snap.engage.code',
        loadRaygunIOApiKey: 'load.raygun.io.api.key'
    };

    /**
     * Create DesignTime panel
     * @memberOf WorkspaceController
     */
    WorkspaceController.prototype.createDesignTimePanel = function createDesignTimePanel() {
        this.logger.debug('Create DesignTime panel', arguments);
    };

    /**
     * Create RunTime panel
     * @memberOf WorkspaceController
     */
    WorkspaceController.prototype.createRunTimePanel = function createRunTimePanel() {
        this.logger.debug('Create RunTime panel', arguments);
    };

    /**
     * Define Workspace Global listeners
     * @memberOf Workspace
     * @type {{
     *      successRendered: {name: string, callback: function},
     *      createDesignTimePanel: {name: string, callback: function},
     *      createRunTimePanel: {name: string, callback: function}
     * }}
     */
    Workspace.prototype.globalListeners = {
        successRendered: {
            name: "success.rendered",
            callback: function successRenderedCallback() {

                this.permission.check({
                    capability: 'createDesignTimePanel',
                    callback: function () {

                        this.observer.publish(
                            this.eventmanager.eventList.createDesignTimePanel
                        );

                    }.bind(this)
                });

                this.permission.check({
                    capability: 'createRunTimePanel',
                    callback: function () {

                        this.observer.publish(
                            this.eventmanager.eventList.createRunTimePanel
                        );

                    }.bind(this)
                });
            }
        },

        createDesignTimePanel: {
            name: 'create.design.time.panel',
            callback: function createDesignTimePanelCallback() {

                /**
                 * Define app
                 * @type {Application}
                 */
                var app = this.controller.root();

                require([
                    'plugins/panel/panel',
                    'plugins/bar/bar',
                    'plugins/gallery/gallery',
                    'plugins/page.data/page.data',
                    'plugins/workspace.data/workspace.data',
                    'plugins/widget.rules/widget.rules',
                    'plugins/site.config/site.config'
                ], function definePanel(Panel, Bar, Gallery, PageData, WorkspaceData, WidgetRules, SiteConfig) {

                    /**
                     * Init panel plugin
                     * @type {Panel}
                     */
                    app.panels.designTime = new Panel({
                        config: {
                            renderAt: 'right',
                            header: {
                                visible: true,
                                title: {
                                    short: 'DT',
                                    long: 'Designtime'
                                }
                            }
                        },
                        modules: [Gallery, PageData, WidgetRules, WorkspaceData, SiteConfig],
                        packages: [Bar]
                    }, app);

                    app.panels.designTime.view.render();
                });
            }
        },

        createRunTimePanel: {
            name: 'create.run.time.panel',
            callback: function createRunTimePanelCallback() {

                /**
                 * Define app
                 * @type {Application}
                 */
                var app = this.controller.root();

                require([
                    'plugins/panel/panel',
                    'plugins/bar/bar',
                    'plugins/maximize/maximize'
                ], function definePanel(Panel, Bar, Maximize) {

                    /**
                     * Init panel plugin
                     * @type {Panel}
                     */
                    app.panels.runTime = new Panel({
                        config: {
                            renderAt: 'left',
                            header: {
                                visible: true,
                                title: {
                                    short: 'RT',
                                    long: 'Runtime'
                                }
                            }
                        },
                        modules: [Maximize],
                        packages: [Bar]
                    }, app);

                    app.panels.runTime.view.render();
                });
            }
        }
    };

    return Workspace;
});