/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

import {BaseEvent} from '../../../modules/Event';

/**
 * @class GalleryEventManager
 * @extends BaseEvent
 */
export class GalleryEventManager extends BaseEvent {

  /**
   * @constructor
   * @param {string} name
   * @param {Panel} scope
   */
  constructor(name, scope) {
    super(name || 'GalleryEventManager', scope);

    /**
     * Define events
     * @property GalleryEventManager
     * @type {{}}
     */
    this.events = {};

    /**
     * Define event list
     * @property GalleryEventManager
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
      loadModuleContent: 'load.content',
      initModel: 'init.model',
      setProviders: 'set.providers',
      setCurrentProvider: 'set.current.provider',
      setRoutes: 'set.routes'
    };
  }
}