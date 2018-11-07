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
 * Define Bar
 * @class Bar
 * @extends AntHill
 */
module.exports = class Bar extends AntHill {

  /**
   * @constructor
   * @param {Panel} containment
   */
  constructor(containment) {
    super('Bar', null);

    /**
     * Define containment
     * @property Bar
     */
    this.containment = containment;

    /**
     * @constant BarController
     * @type {module.BarController|*}
     */
    const BarController = require('./mvc/bar.controller.js');

    /**
     * @constant BarModel
     * @type {module.BarModel|*}
     */
    const BarModel = require('./mvc/bar.model.js');

    /**
     * @constant BarView
     * @type {module.BarView|*}
     */
    const BarView = require('./mvc/bar.view.js');

    /**
     * @constant BarEventManager
     * @type {module.BarEventManager|*}
     */
    const BarEventManager = require('./mvc/bar.event.manager.js');

    /**
     * @constant BarPermission
     * @type {module.BarPermission|*}
     */
    const BarPermission = require('./mvc/bar.permission.js');

    /**
     * @constant MVC
     * @type {module.MVC}
     */
    const MVC = require('../../core/lib/modules/MVC.js');

    /**
     * @constant DEFAULTS
     * @type {{
     *  plugin: boolean,
     *  html: {
     *    header: boolean,
     *    footer: boolean,
     *    padding: {top: number, right: number, bottom: number, left: number}
     *  }
     * }}
     */
    const DEFAULTS = {
      plugin: true,
      html: {
        header: false,
        footer: false,
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
     * @property Bar
     * @type {module.MVC}
     */
    this.mvc = new MVC({
      scope: this,
      config: [DEFAULTS],
      components: [
        BarController,
        BarModel,
        BarView,
        BarEventManager,
        BarPermission
      ],
      render: true
    });

    this.observer.publish(this.eventManager.eventList.successCreated);
    this.observer.publish(this.eventManager.eventList.defineModules);
    this.observer.publish(this.eventManager.eventList.updateTranslations, ['plugins/bar/translations/en-us']);
  }
};