/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/15
 * Time: 10:32 PM
 */

define(['config/workspace'], function defineWorkspaceListeners(Workspace) {

    /**
     * Define Workspace Global listeners
     * @memberOf Workspace
     * @type {{
     *      successRendered: {name: string, callback: function},
     *      createAuthorPanel: {name: string, callback: function},
     *      createToolPanel: {name: string, callback: function}
     * }}
     */
    Workspace.prototype.globalListeners = {
        successRendered: {
            name: "success.rendered",
            callback: function successRenderedCallback() {

                this.permission.check({
                    capability: 'createAuthorPanel',
                    callback: function () {

                        this.observer.publish(
                            this.eventmanager.eventList.createAuthorPanel
                        );

                    }.bind(this)
                });

                this.permission.check({
                    capability: 'createToolPanel',
                    callback: function () {

                        this.observer.publish(
                            this.eventmanager.eventList.createToolPanel
                        );

                    }.bind(this)
                });
            }
        },

        createAuthorPanel: {
            name: 'create.author.panel',
            callback: function createAuthorPanelCallback() {

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
                    app.panels.author = new Panel({
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

                    app.panels.author.view.render();
                });
            }
        },

        createToolPanel: {
            name: 'create.tool.panel',
            callback: function createToolPanelCallback() {

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
                    app.panels.tool = new Panel({
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

                    app.panels.tool.view.render();
                });
            }
        }
    };

    return Workspace;
});