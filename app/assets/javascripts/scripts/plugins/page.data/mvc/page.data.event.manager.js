/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

defineP([
  'modules/Event'
], function definePageDataEventManager(BaseEvent) {

  /**
   * Define layout event manager
   * @class PageDataEventManager
   * @constructor
   * @extends BaseEvent
   */
  var PageDataEventManager = function PageDataEventManager() {

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
         *      updateTranslations: string,
         *      loadModuleContent: string,
         *      prepareActiveComponent: string,
         *      storeItem: string,
         *      setActiveContent: string
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

  return PageDataEventManager.extend(
      'PageDataEventManager', {}, BaseEvent.prototype
  );
});