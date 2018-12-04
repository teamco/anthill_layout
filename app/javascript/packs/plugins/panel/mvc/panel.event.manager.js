/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

import {BaseEvent} from '../../../modules/Event';

/**
 * @class PanelEventManager
 * @extends BaseEvent
 */
export class PanelEventManager extends BaseEvent {

  /**
   * Define PanelEvent Manager
   * @constructor
   * @param {string} name
   * @param {Panel} scope
   */
  constructor(name, scope) {
    super(name || 'PanelEventManager', scope);

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
     *  updateItemsCount: string,
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
      updateItemsCount: 'update.items.count',
      refreshModulesContent: 'refresh.modules.content',
      subscribeGenericEvent: 'subscribe.generic.event'
    };
  }
}