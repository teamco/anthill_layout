/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

import {BaseEvent} from '../../../modules/Event';

/**
 * @class WidgetRulesEventManager
 * @extends BaseEvent
 */
export class WidgetRulesEventManager extends BaseEvent {

  /**
   * Define BarEvent Manager
   * @constructor
   * @param {WidgetRules} scope
   */
  constructor(scope) {
    super('WidgetRulesEventManager', scope);

    /**
     * Define events
     * @property WidgetRulesEventManager
     * @type {{}}
     */
    this.events = {};

    /**
     * Define event list
     * @property WidgetRulesEventManager
     * @type {{
     *  updateTranslations: string,
     *  loadModuleContent: string,
     *  prepareActiveComponent: string,
     *  storeItem: string,
     *  setActiveContent: string
     * }}
     */
    this.eventList = {
      updateTranslations: 'update.translations',
      loadModuleContent: 'load.content',
      prepareActiveComponent: 'prepare.active.component',
      storeItem: 'store.item',
      setActiveContent: 'set.active.content'
    };
  }
}