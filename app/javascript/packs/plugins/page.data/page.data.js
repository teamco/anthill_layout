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
 * @class PageData
 * @extends AntHill
 */
module.exports = class PageData extends AntHill {

  /**
   * @param containment
   * @constructor
   */
  constructor(containment) {
    super('PageData', null, true);

    /**
     * Define containment
     * @property PageData
     */
    this.containment = containment;

    /**
     * Define active content
     * @property PageData
     * @type {*}
     */
    this.activeContent = undefined;

    /**
     * Allow to locate element
     * @property PageData
     * @type {boolean}
     */
    this.allowToLocate = true;

    /**
     * Define defaults
     * @type {{
     *  plugin: boolean,
     *  getter: boolean,
     *  html: {
     *    style: string,
     *    header: boolean,
     *    footer: boolean,
     *    floating: boolean,
     *    padding: {top: number, right: number, bottom: number, left: number}
     *  }
     * }}
     */
    const DEFAULTS = {
      plugin: true,
      getter: true,
      html: {
        style: 'default',
        header: true,
        footer: true,
        floating: true,
        padding: {
          top: 0,
          right: 0,
          bottom: 0,
          left: 0
        }
      }
    };

    /**
     * @constant PageDataController
     * @type {module.PageDataController|*}
     */
    const PageDataController = require('./mvc/page.data.controller.js');

    /**
     * @constant PageDataModel
     * @type {module.PageDataModel|*}
     */
    const PageDataModel = require('./mvc/page.data.model.js');

    /**
     * @constant PageDataView
     * @type {module.PageDataView|*}
     */
    const PageDataView = require('./mvc/page.data.view.js');

    /**
     * @constant PageDataEventManager
     * @type {module.PageDataEventManager|*}
     */
    const PageDataEventManager = require('./mvc/page.data.event.manager.js');

    /**
     * @constant PageDataPermission
     * @type {module.PageDataPermission|*}
     */
    const PageDataPermission = require('./mvc/page.data.permission.js');

    /**
     * @constant MVC
     * @type {module.MVC}
     */
    const MVC = require('../../core/lib/modules/MVC.js');

    new MVC({
      scope: this,
      config: [DEFAULTS],
      components: [
        PageDataController,
        PageDataModel,
        PageDataView,
        PageDataEventManager,
        PageDataPermission
      ],
      render: true
    });

    this.observer.batchPublish(this.eventManager.eventList.successCreated);
    this.observer.publish(this.eventManager.eventList.updateTranslations, ['plugins/page.data/translations/en-us']);

    this.utils.waitFor(
        () => Object.keys(this.controller.getPage()).length,
        () => {
          this.controller.subscribeRefreshContentAfterDestroyItems();
          this.controller.subscribeRefreshContentSwitchPage();
        },
        () => this.logger.warn('Timeout. Unable to subscribe to refresh content')
    );
  }
};