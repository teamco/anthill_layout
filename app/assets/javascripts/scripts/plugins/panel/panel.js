/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:02 AM
 */

/**
 * @constant AntHill
 * @type {module.AntHill}
 */
const AntHill = require('../../core/config/anthill.js');

/**
 * Define Panel
 * @class Panel
 * @extends AntHill
 */
module.exports = class Panel extends AntHill {

  /**
   * Define Panel
   * @param opts
   * @param containment
   * @constructor
   */
  constructor(opts, containment) {
    super('Panel', null, true);

    /**
     * @constant PanelController
     * @type {module.PanelController|*}
     */
    const PanelController = require('./mvc/panel.controller.js');

    /**
     * @constant PanelModel
     * @type {module.PanelModel|*}
     */
    const PanelModel = require('./mvc/panel.model.js');

    /**
     * @constant PanelView
     * @type {module.PanelView|*}
     */
    const PanelView = require('./mvc/panel.view.js');

    /**
     * @constant PanelEventManager
     * @type {module.PanelEventManager|*}
     */
    const PanelEventManager = require('./mvc/panel.event.manager.js');

    /**
     * @constant PanelPermission
     * @type {module.PanelPermission|*}
     */
    const PanelPermission = require('./mvc/panel.permission.js');

    /**
     * @constant MVC
     * @type {module.MVC}
     */
    const MVC = require('../../core/lib/modules/MVC.js');

    /**
     * Define containment
     * @property Panel
     */
    this.containment = containment;

    /**
     * Define opened
     * @property Panel
     * @type {Object}
     */
    this.opened = {};

    /**
     * Define active module
     * @property Panel
     * @type {string}
     */
    this.active = undefined;

    /**
     * Render side
     * @type {{top: string, right: string, bottom: string, left: string}}
     */
    const RENDER_AT = {
      top: 'top',
      right: 'right',
      bottom: 'bottom',
      left: 'left'
    };

    /**
     * @constant DEFAULTS
     * @type {{
     *  plugin: boolean,
     *  renderAt: string,
     *  html: {resizable: boolean, style: string, header: boolean, footer: boolean, floating: boolean,
     *    padding: {top: number, right: number, bottom: number, left: number}}
     * }}
     */
    const DEFAULTS = {
      plugin: true,
      renderAt: RENDER_AT.right,
      html: {
        resizable: false,
        style: 'default',
        header: true,
        footer: false,
        floating: false,
        padding: {
          top: 0,
          right: 0,
          bottom: 0,
          left: 0
        }
      }
    };

    /**
     * Define MVC
     * @property Panel
     * @type {module.MVC}
     */
    new MVC({
      scope: this,
      config: [(opts || {}).config, DEFAULTS],
      components: [
        PanelController,
        PanelModel,
        PanelView,
        PanelEventManager,
        PanelPermission
      ],
      render: true
    });

    this.observer.publish(this.eventManager.eventList.successCreated);
    this.observer.publish(this.eventManager.eventList.updateTranslations, require('./translations/en-us.js'));
    this.observer.publish(this.eventManager.eventList.defineModules, [opts.modules]);
    this.observer.publish(this.eventManager.eventList.definePackages, [opts.packages]);
    this.observer.publish(this.eventManager.eventList.subscribeGenericEvent);
  }
};