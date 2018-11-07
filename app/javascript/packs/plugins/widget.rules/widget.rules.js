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
 * @class WidgetRules
 * @extends AntHill
 */
module.exports = class WidgetRules extends AntHill {

  /**
   * @param containment
   * @constructor
   */
  constructor(containment) {
    super('WidgetRules', null, true);

    /**
     * Define containment
     * @property WidgetRules
     */
    this.containment = containment;

    /**
     * Define active content
     * @property WidgetRules
     * @type {*}
     */
    this.activeContent = undefined;

    /**
     * Allow to locate element
     * @property WidgetRules
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
     * @constant WidgetRulesController
     * @type {module.WidgetRulesController|*}
     */
    const WidgetRulesController = require('./mvc/widget.rules.controller.js');

    /**
     * @constant WidgetRulesModel
     * @type {module.WidgetRulesModel|*}
     */
    const WidgetRulesModel = require('./mvc/widget.rules.model.js');

    /**
     * @constant WidgetRulesView
     * @type {module.WidgetRulesView|*}
     */
    const WidgetRulesView = require('./mvc/widget.rules.view.js');

    /**
     * @constant WidgetRulesEventManager
     * @type {module.WidgetRulesEventManager|*}
     */
    const WidgetRulesEventManager = require('./mvc/widget.rules.event.manager.js');

    /**
     * @constant WidgetRulesPermission
     * @type {module.WidgetRulesPermission|*}
     */
    const WidgetRulesPermission = require('./mvc/widget.rules.permission.js');

    /**
     * @constant MVC
     * @type {module.MVC}
     */
    const MVC = require('../../core/lib/modules/MVC.js');

    /**
     * Define MVC
     * @property WidgetRules
     * @type {module.MVC}
     */
    new MVC({
      scope: this,
      config: [DEFAULTS],
      components: [
        WidgetRulesController,
        WidgetRulesModel,
        WidgetRulesView,
        WidgetRulesEventManager,
        WidgetRulesPermission
      ],
      render: true
    });

    this.observer.publish(this.eventManager.eventList.successCreated);
    this.observer.publish(this.eventManager.eventList.updateTranslations, ['plugins/widget.rules/translations/en-us']);

    this.utils.waitFor(
        () => this.controller.getPage().eventManager,
        () => {
          this.controller.subscribeRefreshContentAfterDestroyItems();
          this.controller.subscribeRefreshContentSwitchPage();
        },
        () => scope.logger.warn('Page should rendered.')
    );
  }
};