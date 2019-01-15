/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 10:28 PM
 */

import {BaseController} from '../modules/Controller';

/**
 * Define Plugin controller
 * @class PluginController
 * @extends BaseController
 */
export class PluginController extends BaseController {

  /**
   * @constructor
   * @param {string} name
   * @param {PluginController|*} scope
   */
  constructor(name, scope) {
    super(name || 'PluginController', scope);

    /**
     * Get gallery
     * @memberOf PluginController
     * @type {function}
     * @returns {Gallery}
     */
    this.getGallery = null;

    /**
     * Get page data
     * @memberOf PluginController
     * @type {function}
     * @returns {PageData}
     */
    this.getPageData = null;

    /**
     * Get widget rules
     * @memberOf PluginController
     * @type {function}
     * @returns {WidgetRules}
     */
    this.getWidgetRules = null;
  }

  /**
   * Overwrite success rendered
   * @memberOf PluginController
   * @param {function} [callback]
   */
  successRendered(callback) {

    /**
     * Define callback
     * @returns {boolean}
     * @param {PluginController} plugin
     * @private
     */
    function _successRenderedCallback(plugin) {
      if (callback) {
        const html = plugin.model.getConfig('html');
        if (!html.selector) {
          plugin.logger.warn('Configuration of render: false', html);
          return false;
        }
        callback();
      } else {
        plugin.logger.warn('Callback should be function type', callback);
      }
    }

    successRenderedSuper.call(this);

    /**
     * Define isWidget
     * @type {*|boolean}
     */
    const isWidget = this.controller.isWidgetContent();

    if (isWidget) {

      /**
       * Get widget
       * @type {Widget}
       */
      const widget = this.controller.getContainment();
      widget.controller.prepareRenderingContent(this, _successRenderedCallback);

    } else {
      _successRenderedCallback(this);
    }
  }

  /**
   * @memberOf PluginController
   * @returns {Panel}
   */
  getDesignTimePanel() {
    return this.root().panels.designTime;
  }

  /**
   * Get runtime panel
   * @memberOf PluginController
   * @returns {Panel}
   */
  getRunTimePanel() {
    return this.root().panels.runTime;
  }

  /**
   * Get module by name
   * @memberOf PluginController
   * @returns {*}
   */
  getModuleByName(name) {

    /**
     * Define panel
     * @type {Panel}
     */
    const panel = this.getDesignTimePanel();
    return panel.model.getModule(panel.model.getModuleIndex(name)).module;
  }

  /**
   * @memberOf PluginController
   * @param {string} name
   * @param {string} type
   * @param {string} value
   */
  getPackageContentElementBy(name, type, value) {
    const module = this.getPackageByName(name);
    const element = module.view.getContentElementBy(type, value);

    if (element) {
      return element;
    }

    module.logger.warn('Undefined element', arguments);
  }

  /**
   * Get package by name
   * @memberOf PluginController
   * @returns {*}
   */
  getPackageByName(name) {

    /**
     * Define panel
     * @type {Panel}
     */
    const panel = this.getDesignTimePanel();
    return panel.model.getPackage(panel.model.getPackageIndex(name));
  }

  /**
   * Check if data was existing
   * @memberOf PluginController
   * @returns {boolean}
   */
  isDataNotExist() {
    return !Object.keys(this.scope.view.elements.items || {}).length;
  }

  /**
   * Update translations
   * @memberOf PluginController
   * @param {string} keys
   * @param {function} [callback]
   */
  updateTranslations(keys, callback) {
    this.i18n.updateData(keys);
    if (typeof callback === 'function') {
      callback();
    }
  }

  /**
   * Load module content
   * @memberOf PluginController
   * @param {boolean} [force]
   */
  loadModuleContent(force) {
    this.view.renderContent(this.controller.getModuleData(), force);
  }

  /**
   * @memberOf PluginController
   * @param {string} type
   * @param {array} items
   */
  updateContentCounter(type, items = []) {

    /**
     * @constant
     * @type {Panel}
     */
    const panel = this.getDesignTimePanel();
    panel.observer.publish(panel.eventManager.eventList.updateItemsCount, [type, items]);
  }


  /**
   * Locate element item
   * @memberOf PluginController
   * @param {Event} event
   */
  locateElementItem(event) {
    event.preventDefault();

    /**
     * Define scope
     * @type {WidgetRules}
     */
    const scope = this.scope;

    scope.observer.publish(scope.eventManager.eventList.prepareActiveComponent, [
      {uuid: this.uuid},
      false, event,
      scope.controller.locateModuleItem.bind(scope)
    ]);
  }

  /**
   * Prepare to trigger
   * @memberOf PluginController
   */
  prepareTriggerShowModalData() {

    // Get scope
    const scope = this.scope;

    /**
     * Fetch uuid
     * @type {string}
     */
    const rulesUuid = this.widget.model.getUUID() + '-' + scope.name.toDash();

    /**
     * Define $item
     * @type {PageDataContentElement}
     */
    const $item = scope.view.elements.items[rulesUuid];

    $item.triggerShowModalData();
  }

  /**
   * Prepare active component
   * @memberOf PluginController
   * @param config
   * @param {boolean} load
   * @param {Event} [event]
   * @param {function} [callback]
   */
  prepareActiveComponent(config, load, event, callback) {
    this.observer.publish(this.eventManager.eventList.setActiveContent, config.uuid);

    /**
     * Define showModal
     * @type {function}
     */
    const showModal = this.view['show' + this.name + 'Modal'];

    if (showModal && load) {
      showModal.bind(this.view)(config, load);
    }

    /**
     * Define collected items
     * @type {*}
     */
    const items = this.model.getCollectedItems();

    for (let index in items) {
      if (items.hasOwnProperty(index)) {
        this.controller.defineContentReferrer(items[index]);
      }
    }

    if (callback) {
      callback(event);
    }
  }

  /**
   * Locate module item
   * @memberOf PluginController
   * @param {Event} e
   */
  locateModuleItem(e) {

    // Get active content
    const active = this.activeContent;

    if (!active) {
      this.logger.warn('Unable fetch active component');
      return false;
    }

    /**
     * Define $item
     * @type {PluginElement}
     */
    const $item = active.controller.getContainment().view.get$item();

    this.view.get$item().locate$element(e, $item);
  }

  /**
   * Define content referrer
   * @memberOf PluginController
   * @param {Widget} widget
   */
  defineContentReferrer(widget) {

    /**
     * Define content
     * @type {*}
     */
    const content = widget.controller.getContent();

    if (!content) {
      widget.logger.warn('Undefined content');
      return false;
    }

    content.observer.publish(content.eventManager.eventList.defineReferrer, this.scope);
  }

  /**
   * Get resource class name
   * @memberOf PluginController
   * @param {string} resource
   */
  getResourceClassName(resource) {
    return resource.replace(/\./g, '-');
  }

  /**
   * Refresh module content
   * @memberOf PluginController
   * @param {string} moduleName
   */
  refreshModuleContent(moduleName) {

    /**
     * Get scope
     * @type {PageData|Maximize}
     */
    const scope = this.scope;

    /**
     * Get panel
     * @type {Panel}
     */
    const panel = scope.containment;

    /**
     * Get module name
     * @type {string}
     */
    const activeModule = panel.active,
        resourceName = panel.model.getPanelEntityResourceName(scope);

    if (activeModule !== resourceName) {
      scope.logger.debug('Module does not activated in panel');
      return false;
    }

    scope.logger.debug('Refresh content');
    panel.observer.publish(panel.eventManager.eventList.showContent, [moduleName, true]);
  }

  /**
   * Subscribe to refresh content after destroy items
   * @memberOf PluginController
   */
  subscribeRefreshContentAfterDestroyItems() {

    /**
     * Get page
     * @type {Page}
     */
    const page = this.getPage();

    /**
     * Get event manager
     * @type {PageEventManager}
     */
    const pageEventManager = page.eventManager;
    const scope = this.scope;

    pageEventManager.subscribe({
      event: {name: pageEventManager.eventList.afterDestroyItems},
      callback() {
        scope.controller.refreshModuleContent(scope.containment.model.getPanelEntityResourceName());
      }
    }, false);
  }

  /**
   * Subscribe refresh content after switch to page
   * @memberOf PluginController
   */
  subscribeRefreshContentSwitchPage() {

    /**
     * Get workspace
     * @type {Workspace}
     */
    const workspace = this.getWorkspace();
    const scope = this.scope;

    /**
     * Get event manager
     * @type {WorkspaceEventManager|{subscribe, eventList}}
     */
    const workspaceEventManager = workspace.eventManager;

    workspaceEventManager.subscribe({
      event: {name: workspaceEventManager.eventList.afterSwitchToPage},
      callback() {
        scope.controller.refreshModuleContent(scope.containment.model.getPanelEntityResourceName(scope));
      }
    }, false);
  }
}

/**
 * Copy successRendered
 * @type {Function}
 */
const successRenderedSuper = Object.assign(BaseController.prototype.successRendered);