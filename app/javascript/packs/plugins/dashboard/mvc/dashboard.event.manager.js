/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

import {BaseEvent} from '../../../modules/Event';

/**
 * @class DashboardEventManager
 * @extends BaseEvent
 */
export class DashboardEventManager extends BaseEvent {

  /**
   * @constructor
   * @param {string} name
   * @param {Panel} scope
   */
  constructor(name, scope) {
    super(name || 'DashboardEventManager', scope);

    /**
     * Define events
     * @property DashboardEventManager
     * @type {{}}
     */
    this.events = {};

    /**
     * Define event list
     * @property DashboardEventManager
     * @type {{
     *  updateTranslations: string,
     *  loadModuleContent: string
     * }}
     */
    this.eventList = {
      updateTranslations: 'update.translations',
      loadModuleContent: 'load.content'
    };
  }
}