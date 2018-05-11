/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

/**
 * @constant BaseEvent
 * @type {BaseEvent}
 */
const BaseEvent = require('../../../core/lib/modules/Event.js');

/**
 * @class PanelEventManager
 * @extends BaseEvent
 */
module.exports = class PanelEventManager extends BaseEvent {

  /**
   * Define PanelEvent Manager
   * @constructor
   * @param {Panel} scope
   */
  constructor(scope) {
    super('PanelEventManager', scope, false);

    /**
     * Define events
     * @property PanelEventManager
     * @type {{}}
     */
    this.events = {};

    /**
     * Define event list
     * @property PanelEventManager
     * @type {{
     *  updateTranslations: string,
     *  showContent: string,
     *  defineModules: string,
     *  definePackages: string,
     *  openPanel: string,
     *  closePanel: string,
     *  refreshModulesContent: string,
     *  subscribeGenericEvent: string
     * }}
     */
    this.eventList = {
      updateTranslations: 'update.translations',
      showContent: 'show.content',
      defineModules: 'define.modules',
      definePackages: 'define.packages',
      openPanel: 'open.panel',
      closePanel: 'close.panel',
      refreshModulesContent: 'refresh.modules.content',
      subscribeGenericEvent: 'subscribe.generic.event'
    };
  }
};