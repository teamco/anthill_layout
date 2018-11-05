/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/15
 * Time: 10:32 PM
 */

/**
 * @constant Workspace
 * @type {module.Workspace}
 */
// const Workspace = require('../../../../scripts/core/config/workspace.js');

/**
 * @constant WorkspaceController
 * @type {module.WorkspaceController}
 */
// const WorkspaceController = require('../../../../scripts/core/controller/workspace.controller.js');

module.exports = () => {

  /**
   * Define global events
   * @property Workspace
   * @type {{
   *  createDesignTimePanel: string,
   *  createRunTimePanel: string,
   *  loadActivateGoogleAnalytics: string,
   *  loadActivateSnapEngage: string,
   *  loadActivateRaygunIO: string,
   *  loadGithubGist: string,
   *  loadActivateBigmirNet: string,
   *  loadActivateYahooFlurry: string,
   *  loadActivateRollbarNotifier: string,
   *  loadActivateRapidEngage: string,
   *  loadActivateDoorbell: string,
   *  loadActivateWoopra: string,
   *  loadActivateVirtualSpirits: string,
   *  loadActivateLoggly: string
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
   * @property WorkspaceController
   */
  WorkspaceController.prototype.createDesignTimePanel = function() {
    this.logger.debug('Create DesignTime panel', arguments);
  };

  /**
   * Create RunTime panel
   * @property WorkspaceController
   */
  WorkspaceController.prototype.createRunTimePanel = function() {
    return this.logger.debug('Create RunTime panel', arguments);
  };

  /**
   * Get DesignTime panel
   * @property WorkspaceController
   */
  WorkspaceController.prototype.getDesignTimePanel = function() {
    return this.getPanels().designTime;
  };

  /**
   * Get RunTime panel
   * @property WorkspaceController
   */
  WorkspaceController.prototype.getRunTimePanel = function() {
    return this.getPanels().runTime;
  };

  /**
   * Get panels
   * @property WorkspaceController
   */
  WorkspaceController.prototype.getPanels = function() {
    return this.getContainment().panels || {};
  };

  /**
   * Toggle panels
   * @property WorkspaceController
   * @param {boolean} show
   */
  WorkspaceController.prototype.togglePanels = show => {

    let index, panel;
    const panels = this.getPanels();

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
   * @property Workspace
   * @type {{
   *  successRendered: {name: string, callback: Workspace.globalListeners.successRendered.callback},
   *  createDesignTimePanel: {name: string, callback: Workspace.globalListeners.createDesignTimePanel.callback},
   *  createRunTimePanel: {name: string, callback: Workspace.globalListeners.createRunTimePanel.callback}
   * }}
   */
  Workspace.prototype.globalListeners = {
    successRendered: {
      name: 'success.rendered',
      callback() {

        this.permission.check({
          capability: 'createDesignTimePanel',
          callback: () => {
            this.observer.publish(this.eventManager.eventList.createDesignTimePanel);
          }
        });

        this.permission.check({
          capability: 'createRunTimePanel',
          callback: () => {
            this.observer.publish(this.eventManager.eventList.createRunTimePanel);
          }
        });
      }
    },

    createDesignTimePanel: {
      name: 'create.design.time.panel',
      callback() {

        /**
         * Define app
         * @type {module.Application|{panels, controller, logger}}
         */
        const app = this.controller.root();

        // /**
        //  * @constant Panel
        //  * @type {module.Panel|*}
        //  */
        // const Panel = require('../../../../scripts/plugins/panel/panel.js');
        //
        // /**
        //  * @constant Bar
        //  * @type {module.Bar|*}
        //  */
        // const Bar = require('../../../../scripts/plugins/bar/bar.js');
        //
        // /**
        //  * @constant Gallery
        //  * @type {module.Gallery|*}
        //  */
        // const Gallery = require('../../../../scripts/plugins/gallery/gallery.js');
        //
        // /**
        //  * @constant PageData
        //  * @type {module.PageData|*}
        //  */
        // const PageData = require('../../../../scripts/plugins/page.data/page.data.js');
        //
        // /**
        //  * @constant WidgetRules
        //  * @type {module.WidgetRules|*}
        //  */
        // const WidgetRules = require('../../../../scripts/plugins/widget.rules/widget.rules.js');
        //
        // /**
        //  * @constant WorkspaceData
        //  * @type {module.WorkspaceData|*}
        //  */
        // const WorkspaceData = require('../../../../scripts/plugins/workspace.data/workspace.data.js');
        //
        // //   'plugins/widget.rules/widget.rules',
        // //   'plugins/site.config/site.config'
        //
        // /**
        //  * Init panel plugin
        //  * @type {module.Panel}
        //  */
        // app.panels.designTime = new Panel({
        //   config: {
        //     renderAt: 'right',
        //     header: {
        //       visible: true,
        //       title: {
        //         short: 'DT',
        //         long: 'Design'
        //       }
        //     }
        //   },
        //   modules: [Gallery, PageData, WorkspaceData, WidgetRules/*, SiteConfig*/],
        //   packages: [Bar]
        // }, app);
        //
        // app.panels.designTime.lazyRender();

        /**
         * Match regex
         * @type {Array|{index: number, input: string}}
         */
        const widgetMatch = app.controller.isWidgetMatch2Hash();

        if (widgetMatch && widgetMatch[2] === 'content') {
          app.panels.designTime.view.get$item().hide();
        }
      }
    },

    createRunTimePanel: {
      name: 'create.run.time.panel',
      callback() {

        /**
         * Define app
         * @type {module.Application|{panels, controller, logger}}
         */
        const app = this.controller.root();

        /**
         * @constant Panel
         * @type {module.Panel|{lazyRender}}
         */
        // const Panel = require('../../../../scripts/plugins/panel/panel.js');
        //
        // /**
        //  * @constant Bar
        //  * @type {module.Bar|*}
        //  */
        // const Bar = require('../../../../scripts/plugins/bar/bar.js');
        //
        // //   'plugins/maximize/maximize',
        // //   'plugins/dashboard/dashboard'
        //
        // /**
        //  * Init panel plugin
        //  * @type {module.Panel}
        //  */
        // app.panels.runTime = new Panel({
        //   config: {
        //     renderAt: 'left',
        //     header: {
        //       visible: true,
        //       title: {
        //         short: 'RT',
        //         long: 'Runtime'
        //       }
        //     }
        //   },
        //   modules: [/*Maximize, Dashboard*/],
        //   packages: [Bar]
        // }, app);
        //
        // app.panels.runTime.lazyRender();

        /**
         * Match regex
         * @type {Array|{index: number, input: string}}
         */
        const widgetMatch = app.controller.isWidgetMatch2Hash();

        if (widgetMatch && widgetMatch[2] === 'content') {
          app.panels.runTime.view.get$item().hide();
        }
      }
    }
  };
};