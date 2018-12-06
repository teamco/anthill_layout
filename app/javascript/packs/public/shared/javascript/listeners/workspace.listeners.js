/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/15
 * Time: 10:32 PM
 */

import {Workspace} from '../../../../core/config/workspace';
import {WorkspaceController} from '../../../../core/controller/workspace.controller';
import {Panel} from '../../../../plugins/panel/panel';
import {Gallery} from '../../../../plugins/gallery/gallery';
import {PageData} from '../../../../plugins/pageData/page.data';
import {WorkspaceData} from '../../../../plugins/workspaceData/workspace.data';
import {WidgetRules} from '../../../../plugins/widgetRules/widget.rules';
import {Bar} from '../../../../plugins/bar/bar';
import {SiteConfig} from '../../../../plugins/siteConfig/site.config';
import {Dashboard} from '../../../../plugins/dashboard/dashboard';

export const workspaceGlobalListeners = () => {

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
   *  successRendered: {name: string, callback(): void},
   *  createDesignTimePanel: {name: string, callback(): void},
   *  createRunTimePanel: {name: string, callback(): void}
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

    afterCreateItem: {
      name: 'after.create.item',
      callback(item) {
        this.logger.debug('Global listener: afterCreateItem', item);

        /**
         * @constant
         * @type {Panel}
         */
        const panel = this.controller.getDesignTimePanel();
        panel.observer.publish(panel.eventManager.eventList.updateItemsCount, [
            'workspace-data', this.model.getItems()])
      }
    },

    createDesignTimePanel: {
      name: 'create.design.time.panel',
      callback() {

        /**
         * Define app
         * @type {Application|{panels, controller, logger}}
         */
        const app = this.controller.root();

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
                long: 'Design'
              }
            }
          },
          modules: [Dashboard, Gallery, WidgetRules, PageData, WorkspaceData],
          packages: [Bar]
        }, app);

        app.panels.designTime.lazyRender();

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

        // /**
        //  * Define app
        //  * @type {Application|{panels, controller, logger}}
        //  */
        // const app = this.controller.root();
        //
        // //   'plugins/maximize/maximize',
        // //   'plugins/dashboard/dashboard'
        //
        // /**
        //  * Init panel plugin
        //  * @type {Panel}
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
        //
        // /**
        //  * Match regex
        //  * @type {Array|{index: number, input: string}}
        //  */
        // const widgetMatch = app.controller.isWidgetMatch2Hash();
        //
        // if (widgetMatch && widgetMatch[2] === 'content') {
        //   app.panels.runTime.view.get$item().hide();
        // }
      }
    }
  };
};