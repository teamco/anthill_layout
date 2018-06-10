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
 * @class WorkspaceDataEventManager
 * @extends BaseEvent
 */
module.exports = class WorkspaceDataEventManager extends BaseEvent {

  /**
   * @constructor
   * @param {string} name
   * @param {WorkspaceData} scope
   */
  constructor(name, scope) {
    super(name || 'WorkspaceDataEventManager', scope, false);

    /**
     * Define events
     * @property PageDataEventManager
     * @type {{}}
     */
    this.events = {};

    /**
     * Define event list
     * @memberOf WorkspaceDataEventManager
     * @type {{
     *  updateTranslations: string,
     *  loadModuleContent: string,
     *  setActiveContent: string,
     *  updatePagesOrder: string,
     *  preparePreferences: string,
     *  switchToActivePage: string
     * }}
     */
    this.eventList = {
      updateTranslations: 'update.translations',
      loadModuleContent: 'load.module.content',
      setActiveContent: 'set.active.content',
      preparePreferences: 'prepare.preferences',
      updatePagesOrder: 'update.pages.order',
      switchToActivePage: 'switch.to.active.page'
    };
  }

  /**
   * Subscribe publish on
   * @memberOf WorkspaceDataEventManager
   * @param {Page} page
   * @param {Function} [callback]
   * @returns {{}}
   */
  subscribePublishOn(page, callback) {

    /**
     * Define event list
     * @type {*}
     */
    const pageEventList = page.eventManager.eventList;

    /**
     * Define events
     * @type {{scope: Page, events: {eventName: string}[], callback: function}}
     */
    const publish = {
      scope: page,
      events: [
        {name: pageEventList.afterCreateItem},
        {name: pageEventList.afterDestroyItem},
        {name: pageEventList.afterDestroyItems}
      ],
      callback: callback
    };

    this.publishOn(publish);
  }
};