//       'api/workspace.api',
//       'controller/workspace.controller',
//       'model/workspace.model',
//       'view/workspace.view',
//       'event/workspace.event.manager',
//       'permission/workspace.permission'
//     ],

/**
 * @constant AntHill
 * @type {AntHill}
 */
const AntHill = require('./anthill.js');

/**
 * Define Workspace
 * @extends AntHill
 */
module.exports = class Workspace extends AntHill {

  /**
   * @param opts
   * @constructor
   */
  constructor(opts) {

    super('Workspace');

    /**
     * @constant MVC
     * @type {MVC}
     */
    const MVC = require('../lib/modules/MVC.js');

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
        // API,
        // Controller,
        // Model,
        // View,
        // EventManager,
        // Permission
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

    // this.observer.batchPublish(
    //     this.eventManager.eventList.successCreated,
    //     this.eventManager.eventList.bindHashChange
    // );
  }
};
 