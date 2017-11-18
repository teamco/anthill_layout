/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/15
 * Time: 10:32 PM
 */

defineP([
  'config/workspace',
  'controller/workspace.controller'
], function defineWorkspaceListeners(Workspace, WorkspaceController) {

  /**
   * Define global events
   * @memberOf Workspace
   * @type {{
     *      createDesignTimePanel: string,
     *      createRunTimePanel: string,
     *      loadActivateGoogleAnalytics: string,
     *      loadActivateSnapEngage: string,
     *      loadActivateRaygunIO: string,
     *      loadGithubGist: string,
     *      loadActivateBigmirNet: string,
     *      loadActivateYahooFlurry: string,
     *      loadActivateRollbarNotifier: string,
     *      loadActivateRapidEngage: string,
     *      loadActivateDoorbell: string,
     *      loadActivateWoopra: string,
     *      loadActivateVirtualSpirits: string,
     *      loadActivateLoggly: string
     * }}
   */
  Workspace.prototype.globalEvents = {
    createDesignTimePanel: 'create.design.time.panel',
    createRunTimePanel: 'create.run.time.panel',
    loadActivateGoogleAnalytics: 'load.activate.google.analytics',
    loadActivateSnapEngage: 'load.activate.snap.engage',
    loadActivateRaygunIO: 'load.activate.raygun.io',
    loadActivateGithubGist: 'load.activate.github.gist',
    loadActivateInjectScript: 'load.activate.inject.script',
    loadActivateBigmirNet: 'load.activate.bigmir.net',
    loadActivateYahooFlurry: 'load.activate.yahoo.flurry',
    loadActivateRollbarNotifier: 'load.activate.rollbar.notifier',
    loadActivateRapidEngage: 'load.activate.rapid.engage',
    loadActivateDoorbell: 'load.activate.doorbell',
    loadActivateWoopra: 'load.activate.woopra',
    loadActivateVirtualSpirits: 'load.activate.virtual.spirits',
    loadActivateLoggly: 'load.activate.loggly'
  };

  /**
   * Create DesignTime panel
   * @memberOf WorkspaceController
   */
  WorkspaceController.prototype.createDesignTimePanel =
      function createDesignTimePanel() {
        this.logger.debug('Create DesignTime panel', arguments);
      };

  /**
   * Create RunTime panel
   * @memberOf WorkspaceController
   */
  WorkspaceController.prototype.createRunTimePanel =
      function createRunTimePanel() {
        this.logger.debug('Create RunTime panel', arguments);
      };

  /**
   * Get DesignTime panel
   * @memberOf WorkspaceController
   */
  WorkspaceController.prototype.getDesignTimePanel =
      function getDesignTimePanel() {
        return this.getPanels().designTime;
      };

  /**
   * Get RunTime panel
   * @memberOf WorkspaceController
   */
  WorkspaceController.prototype.getRunTimePanel = function getRunTimePanel() {
    return this.getPanels().runTime;
  };

  /**
   * Get panels
   * @memberOf WorkspaceController
   */
  WorkspaceController.prototype.getPanels = function getPanels() {
    return this.getContainment().panels || {};
  };

  /**
   * Toggle panels
   * @memberOf WorkspaceController
   * @param {boolean} show
   */
  WorkspaceController.prototype.togglePanels = function togglePanels(show) {

    var index, panel,
        panels = this.getPanels();

    for (index in panels) {

      if (panels.hasOwnProperty(index)) {

        /**
         * Get panel
         * @type {Panel}
         */
        panel = panels[index];
        panel.view.get$item()[show ? 'show' : 'hide']();
      }
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

        requireP([
          'plugins/panel/panel',
          'plugins/bar/bar',
          'plugins/gallery/gallery',
          'plugins/page.data/page.data',
          'plugins/workspace.data/workspace.data',
          'plugins/widget.rules/widget.rules',
          'plugins/site.config/site.config'
        ], function definePanel(Panel, Bar, Gallery, PageData, WorkspaceData,
            WidgetRules, SiteConfig) {

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
            modules: [Gallery, PageData, WidgetRules, WorkspaceData,
              SiteConfig],
            packages: [Bar]
          }, app);

          app.panels.designTime.view.render();

          /**
           * Match regex
           * @type {Array|{index: number, input: string}}
           */
          var widgetMatch = app.controller.isWidgetMatch2Hash();

          if (widgetMatch && widgetMatch[2] === 'content') {
            app.panels.designTime.view.get$item().hide();
          }
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

        requireP([
          'plugins/panel/panel',
          'plugins/bar/bar',
          'plugins/maximize/maximize',
          'plugins/dashboard/dashboard'
        ], function definePanel(Panel, Bar, Maximize, Dashboard) {

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
            modules: [Maximize, Dashboard],
            packages: [Bar]
          }, app);

          app.panels.runTime.view.render();

          /**
           * Match regex
           * @type {Array|{index: number, input: string}}
           */
          var widgetMatch = app.controller.isWidgetMatch2Hash();

          if (widgetMatch && widgetMatch[2] === 'content') {
            app.panels.runTime.view.get$item().hide();
          }
        });
      }
    }
  };

  return Workspace;
});