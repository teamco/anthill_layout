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
        loadSnapEngageCode: 'load.snap.engage.code'
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
     * Load SnapEngage Code
     * @memberOf WorkspaceController
     */
    WorkspaceController.prototype.loadSnapEngageCode = function loadSnapEngageCode() {

        this.logger.debug('Load SnapEngage Code', arguments);

        /**
         * Get prefs
         * @type {{snapEngageCode, activateSnapEngage}}
         */
        var preferences = this.model.getConfig('preferences');

        /**
         * Get SnapEngage Code
         * @type {string}
         */
        var snapEngageCode = preferences.snapEngageCode,
            activate = preferences.activateSnapEngage;

        if (!(typeof(snapEngageCode) === 'string' && snapEngageCode.length)) {
            this.logger.debug('Unable to fetch SnapEngage Code', snapEngageCode);
            return false;
        }

        if (!activate) {
            this.logger.debug('SnapEngage Code not activated', snapEngageCode);
            $('[id^=SnapABug]').remove();
            return false;
        }

        // Get uuid key
        var code = snapEngageCode.match(/[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89aAbB][a-f0-9]{3}-[a-f0-9]{12}/);

        if (!code) {
            this.logger.debug('Unable to fetch SnapEngage Code UUID', snapEngageCode);
            return false;
        }

        (function () {
            var se = document.createElement('script');
            se.type = 'text/javascript';
            se.async = true;
            se.src = '//storage.googleapis.com/code.snapengage.com/js/' + code[0] + '.js';
            var done = false;
            se.onload = se.onreadystatechange = function () {
                if (!done && (!this.readyState || this.readyState === 'loaded' || this.readyState === 'complete')) {
                    done = true;
                    /* Place your SnapEngage JS API code below */
                    /* SnapEngage.allowChatSound(true); Example JS API: Enable sounds for Visitors. */
                }
            };
            var s = document.getElementsByTagName('script')[0];
            s.parentNode.insertBefore(se, s);
        })();
    };

    /**
     * Load Google Analytics Tracking Id
     * @memberOf WorkspaceController
     */
    WorkspaceController.prototype.loadGoogleAnalyticsTrackingId = function loadGoogleAnalyticsTrackingId() {

        this.logger.debug('Load Google Analytics Tracking Id', arguments);

        /**
         * Get prefs
         * @type {{googleAnalyticsTrackingId}}
         */
        var preferences = this.model.getConfig('preferences');

        /**
         * Get tracking id
         * @type {string}
         */
        var trackingId = preferences.googleAnalyticsTrackingId;

        if (typeof(trackingId) === 'string' && trackingId.length) {

            window._gaq = window._gaq || [];
            window._gaq.push(['_setAccount', trackingId]);
            window._gaq.push(['_trackPageview']);

            (function () {
                var ga = document.createElement('script');
                ga.type = 'text/javascript';
                ga.async = true;
                ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
                var s = document.getElementsByTagName('script')[0];
                s.parentNode.insertBefore(ga, s);
            })();
        }
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