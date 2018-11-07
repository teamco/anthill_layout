import {AntHill} from './anthill';
import {WorkspaceAPI} from '../api/workspace.api';
import {WorkspaceController} from '../controller/workspace.controller';
import {WorkspaceModel} from '../model/workspace.model';
import {WorkspaceView} from '../view/workspace.view';
import {WorkspaceEventManager} from '../event/workspace.event.manager';
import {WorkspacePermission} from '../permission/workspace.permission';
import {workspaceLocalListeners} from './listeners/workspace.listeners';
import {workspaceLocalPermission} from './permissions/workspace.permissions';
import {MVC} from '../../modules/MVC';

/**
 * Define Workspace
 * @extends AntHill
 */
export class Workspace extends AntHill {

  /**
   * @param opts
   * @constructor
   */
  constructor(opts) {
    super('Workspace', null, true);

    workspaceLocalListeners();
    workspaceLocalPermission();

    /**
     * Define default config
     * @type {{
     *  preferences: (*|{staticWidth: boolean, siteWidthSlider: string}),
     *  SEOSeparator: string,
     *  limit: boolean,
     *  isResized: boolean,
     *  type: string,
     *  order: number,
     *  page: {plural: boolean, counter: number, limit: number, animateSwipe: boolean, showInTabs: boolean, onDestroyShowPrevious: boolean},
     *  html: {style: string, header: boolean, footer: boolean, stretch: boolean, padding: {top: number, right: number, bottom: number, left: number}}
     * }}
     */
    const DEFAULTS = {
      preferences: opts.preferences || {
        staticWidth: true,
        siteWidthSlider: '1'
      },
      SEOSeparator: ' | ',
      limit: false,
      isResized: true,
      type: 'default',
      order: 1,
      page: {
        plural: false,
        counter: 0,
        limit: 10,
        // Animate on switch page
        animateSwipe: true,
        showInTabs: true,
        // Show previous page (false means Next)
        onDestroyShowPrevious: true
      },
      html: {
        style: 'default',
        header: false,
        footer: false,
        stretch: true,
        padding: {
          top: 0,
          right: 0,
          bottom: 0,
          left: 0
        }
      }
    };

    new MVC({
      scope: this,
      config: [opts.config, DEFAULTS],
      components: [
        WorkspaceController,
        WorkspaceAPI,
        WorkspaceModel,
        WorkspaceView,
        WorkspaceEventManager,
        WorkspacePermission
      ]
    });

    this.init();
  }

  /**
   * Define init
   * @property Workspace
   */
  init() {

    /**
     * Define swipe page
     * @property Workspace
     * @type {boolean}
     */
    this.switchPage = false;

    /**
     * Define page
     * @property Workspace
     * @type {Object|Page}
     */
    this.page = {};

    /**
     * Define items
     * @property Workspace
     * @type {Object}
     */
    this.items = {};

    this.observer.batchPublish(
        this.eventManager.eventList.successCreated,
        this.eventManager.eventList.bindHashChange
    );
  }
}
 