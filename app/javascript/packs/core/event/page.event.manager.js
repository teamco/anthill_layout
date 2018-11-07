/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

import {BaseEvent} from '../../modules/Event';

/**
 * @class PageEventManager
 * @extends BaseEvent
 */
export class PageEventManager extends BaseEvent {

  /**
   * @constructor
   * @param {string} name
   * @param {Page} scope
   */
  constructor(name, scope) {
    super(name || 'PageEventManager', scope);

    /**
     * Define events
     * @property PageEventManager
     * @type {{}}
     */
    this.events = {};

    /**
     * Define event list
     * @property PageEventManager
     * @type {{
     *  setMaximized: string,
     *  unsetMaximized: string,
     *  setAsReady: string,
     *  createWidget: string,
     *  destroyWidget: string,
     *  destroyWidgets: string,
     *  approveItemsDestroy: string,
     *  createLayout: string,
     *  destroyLayout: string,
     *  updateSiteDescription: string,
     *  updateSiteKeywords: string,
     *  updateLayoutConfig: string,
     *  expandLayout: string,
     *  updatePadding: string,
     *  resizeWidgets: string,
     *  resizeWidget: string,
     *  loadItemsContent: string,
     *  setLoadedContent: string,
     *  updateLoadedContent: string,
     *  updateHashOnMaximize: string,
     *  updateHashOnReduce: string,
     *  updateHeight: string,
     *  afterLoadingItems: string,
     *  disableItemInteractions: string,
     *  enableItemInteractions: string,
     *  loadPreferences: string,
     *  transferPreferences: string,
     *  transferContentPreferences: string,
     *  afterUpdatePreferences: string,
     *  updatePageScrollHeight: string,
     *  showWidgetContent: string
     * }}
     */
    this.eventList = {

      setMaximized: 'set.maximized',
      unsetMaximized: 'unset.maximized',

      createWidget: 'create.widget',
      destroyWidget: 'destroy.widget',
      destroyWidgets: 'destroy.widgets',
      approveItemsDestroy: 'approve.items.destroy',

      setAsReady: 'set.as.ready',

      createLayout: 'create.layout',
      destroyLayout: 'destroy.layout',
      updateLayoutConfig: 'update.layout.config',
      expandLayout: 'expand.layout',

      updatePadding: 'update.padding',

      resizeWidget: 'resize.widget',

      resizeWidgets: 'resize.widgets',
      updateHashOnMaximize: 'update.hash.on.maximize',

      updateHashOnReduce: 'update.hash.on.reduce',

      updateHeight: 'update.height',
      updatePageScrollHeight: 'update.page.scroll.height',

      updateSiteDescription: 'update.site.description',
      updateSiteKeywords: 'update.site.keywords',

      afterLoadingItems: 'after.loading.items',
      disableItemInteractions: 'disable.item.interactions',
      loadItemsContent: 'load.items.content',
      setLoadedContent: 'set.loaded.content',
      updateLoadedContent: 'update.loaded.content',
      enableItemInteractions: 'enable.item.interactions',
      updateItemInteractions: 'update.item.interactions',

      loadPreferences: 'load.preferences',
      transferContentPreferences: 'transfer.content.preferences',
      transferPreferences: 'transfer.preferences',
      afterUpdatePreferences: 'after.update.preferences',

      showWidgetContent: 'show.widget.content'
    };
  }
}