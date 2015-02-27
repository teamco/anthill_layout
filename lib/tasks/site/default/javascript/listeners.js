/**
 * Created with JetBrains RubyMine.
 * User: i061485
 * Date: 2/13/13
 * Time: 4:50 PM
 * To change this template use File | Settings | File Templates.
 */

define(
    [
        'config/application',
        'config/workspace',
        'config/page',
        'config/layout',
        'config/widget'
    ],

    /**
     * @param {Application} Application
     * @param {Workspace} Workspace
     * @param {Page} Page
     * @param {Layout} Layout
     * @param {Widget} Widget
     */
    function defineListeners(Application, Workspace, Page, Layout, Widget) {

        // Define global listeners
        for (var i = 0, l = arguments.length; i < l; i++) {
            arguments[i].prototype.globalListeners = arguments[i].prototype.globalListeners || {};
        }

        /**
         * Define Application Global listeners
         * @member Application
         * @type {{
         *      defineGlobalInstance: {name: string, callback: function}
         * }}
         */
        Application.prototype.globalListeners = {

            defineGlobalInstance: {
                name: 'define.global.instance',
                callback: function defineGlobalInstanceCallback() {
                    if (this.controller.isDevelopmentMode()) {
                        window[this.model.getConfig('appName')] = this;
                    }
                }
            }
        };

        /**
         * Define Workspace Global listeners
         * @member Workspace
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
                            config: {renderAt: 'right'},
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
                            config: {renderAt: 'left'},
                            modules: [Maximize],
                            packages: [Bar]
                        }, app);

                        app.panels.tool.view.render();
                    });
                }
            }
        };

        /**
         * Define Page Global listeners
         * @member Page
         * @type {{}}
         */
        Page.prototype.globalListeners = {};

        /**
         * Define Widget Global listeners
         * @member Widget
         * @type {{}}
         */
        Widget.prototype.globalListeners = {};
    }
);