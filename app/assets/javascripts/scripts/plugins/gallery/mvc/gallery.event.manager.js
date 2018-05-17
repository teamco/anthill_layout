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
 * @class GalleryEventManager
 * @extends BaseEvent
 */
module.exports = class GalleryEventManager extends BaseEvent {

  /**
   * @constructor
   * @param {string} name
   * @param {Panel} scope
   */
  constructor(name, scope) {
    super(name || 'GalleryEventManager', scope, false);

    /**
     * Define events
     * @memberOf GalleryEventManager
     * @type {{}}
     */
    this.events = {};

    /**
     * Define event list
     * @memberOf GalleryEventManager
     * @type {{
     *  updateTranslations: string,
     *  loadModuleContent: string,
     *  initModel: string,
     *  setProviders: string,
     *  setCurrentProvider: string,
     *  setRoutes: string
     * }}
     */
    this.eventList = {
      updateTranslations: 'update.translations',
      loadModuleContent: 'load.module.content',
      initModel: 'init.model',
      setProviders: 'set.providers',
      setCurrentProvider: 'set.current.provider',
      setRoutes: 'set.routes'
    };
  };
};