/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

import {BaseEvent} from '../../../modules/Event';

/**
 * @class BarEventManager
 * @extends BaseEvent
 */
export class BarEventManager extends BaseEvent {

  /**
   * Define BarEvent Manager
   * @constructor
   * @param {Bar} scope
   */
  constructor(scope) {
    super('BarEventManager', scope);

    /**
     * Define events
     * @type {{}}
     * @property BarEventManager
     */
    this.events = {};

    /**
     * Define event list
     * @property BarEventManager
     * @type {{
     *  updateTranslations: string,
     *  showContent: string,
     *  defineModules: string
     * }}
     */
    this.eventList = {
      updateTranslations: 'update.translations',
      showContent: 'show.content',
      defineModules: 'define.modules'
    };
  }
}
