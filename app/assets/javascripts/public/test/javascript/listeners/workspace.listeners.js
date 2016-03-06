/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/15
 * Time: 10:32 PM
 */

define(['config/workspace'], function defineWorkspaceListeners(Workspace) {

    /**
     * Define Workspace Global listeners
     * @member Workspace
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
                    app.panels.author = new Panel({
                        config: {renderAt: 'right'},
                        modules: [Gallery, PageData, WidgetRules, WorkspaceData, SiteConfig],
                        packages: [Bar]
                    }, app);

                    app.panels.author.view.render();
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
                    app.panels.tool = new Panel({
                        config: {renderAt: 'left'},
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