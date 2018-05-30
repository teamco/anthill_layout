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
 * @class PageDataEventManager
 * @extends BaseEvent
 */
module.exports = class PageDataEventManager extends BaseEvent {

  /**
   * @constructor
   * @param {string} name
   * @param {PageData} scope
   */
  constructor(name, scope) {
    super(name || 'PageDataEventManager', scope, false);

    /**
     * Define events
     * @property PageDataEventManager
     * @type {{}}
     */
    this.events = {};

    /**
     * Define event list
     * @property PageDataEventManager
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
      loadModuleContent: 'load.module.content',
      prepareActiveComponent: 'prepare.active.component',
      storeItem: 'store.item',
      setActiveContent: 'set.active.content'
    };
  };
};