/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

defineP([
  'modules/Event'
], function defineDashboardEventManager(BaseEvent) {

  /**
   * Define dashboard event manager
   * @class DashboardEventManager
   * @constructor
   * @extends BaseEvent
   */
  var DashboardEventManager = function DashboardEventManager() {

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
         *      updateTranslations: string,
         *      loadModuleContent: string
         * }}
     */
    this.eventList = {
      updateTranslations: 'update.translations',
      loadModuleContent: 'load.content'
    };
  };

  return DashboardEventManager.extend(
      'DashboardEventManager', {}, BaseEvent.prototype
  );
});