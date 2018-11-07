/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

import {BaseEvent} from '../../modules/Event';

/**
 * @class WorkspaceEventManager
 * @extends BaseEvent
 */
export class WorkspaceEventManager extends BaseEvent {

  /**
   * Define workspace event manager
   * @constructor
   * @param {string} name
   * @param {Workspace} scope
   */
  constructor(name, scope) {
    super(name || 'WorkspaceEventManager', scope);

    /**
     * Define events
     * @property WorkspaceEventManager
     * @type {{}}
     */
    this.events = {};

    /**
     * Define event list
     * @property WorkspaceEventManager
     * @type {{
     *  bindHashChange: string,
     *  createPage: string,
     *  destroyPage: string,
     *  destroyPages: string,
     *  resizePages: string,
     *  resizePage: string,
     *  setPageContainerDimensions: string,
     *  updatePagesWidth: string,
     *  beforeSwitchToPage: string,
     *  switchToPage: string,
     *  afterSwitchToPage: string,
     *  adoptContentWidth: string,
     *  afterLoadingItems: string,
     *  updateSiteTitle: string,
     *  updateSiteAuthor: string,
     *  updateSiteDescription: string,
     *  updateSiteKeywords: string,
     *  updateMetaData: string,
     *  updateSiteWidth: string,
     *  loadPreferences: string,
     *  transferPreferences: string,
     *  transferContentPreferences: string,
     *  afterUpdatePreferences: string,
     *  clonePage: string
     * }}
     */
    this.eventList = {
      bindHashChange: 'bind.hash.change',
      createPage: 'create.page',
      destroyPage: 'destroy.page',
      destroyPages: 'destroy.pages',
      resizePage: 'resize.page',
      resizePages: 'resize.pages',
      setPageContainerDimensions: 'set.page.container.dimensions',
      updatePagesWidth: 'update.pages.width',

      beforeSwitchToPage: 'before.switch.to.page',
      resetPagesHeightBeforeSwitch: 'update.pages.height.before.switch',
      switchToPage: 'switch.to.page',
      afterSwitchToPage: 'after.switch.to.page',
      afterPageOrder: 'after.page.order',

      adoptContentWidth: 'adopt.content.width',

      afterLoadingItems: 'after.loading.items',

      updateSiteWidth: 'update.site.width',

      updateSiteTitle: 'update.site.title',
      updateSiteAuthor: 'update.site.author',
      updateSiteDescription: 'update.site.description',
      updateSiteKeywords: 'update.site.keywords',
      updateMetaData: 'update.meta.data',

      loadPreferences: 'load.preferences',
      transferPreferences: 'transfer.preferences',
      transferContentPreferences: 'transfer.content.preferences',
      afterUpdatePreferences: 'after.update.preferences',

      clonePage: 'clone.page'
    };
  }
}