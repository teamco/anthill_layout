/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:03 AM
 */

import {PluginController} from '../../plugin.controller';
import {PanelElement} from '../element/panel.element';

/**
 * Define panel controller
 * @class PanelController
 * @extends PluginController
 */
export class PanelController extends PluginController {

  /**
   * @constructor
   * @param {string} name
   * @param {Panel} scope
   */
  constructor(name, scope) {
    super(name || 'PanelController', scope);
  }

  /**
   * Check if panel resizable
   * @memberOf PanelController
   * @returns {boolean}
   */
  isResizable() {

    /**
     * Define model
     * @type {PanelModel}
     */
    const model = this.model;
    return model.getConfig('html/resizable') ? model.getConfig('renderAt') : false;
  }

  /**
   * Define modules
   * @memberOf PanelController
   * @param modules
   */
  defineModules(modules) {
    for (let i = 0, l = modules.length; i < l; i++) {
      this.model.defineModule(modules[i]);
    }
  }

  /**
   * Define packages
   * @memberOf PanelController
   * @param packages
   */
  definePackages(packages) {
    for (let i = 0, l = packages.length; i < l; i++) {
      this.model.definePackage(packages[i]);
    }
  }

  /**
   * Check if opened
   * @memberOf PanelController
   * @param {string} [resource]
   * @returns {boolean|*}
   */
  isOpened(resource) {
    return this.scope.opened[resource || this.getActiveResource()];
  }

  /**
   * Check if panel active
   * @param {string} resource
   * @memberOf PanelController
   * @returns {boolean}
   */
  isActive(resource) {
    return this.getActiveResource() === resource;
  }

  /**
   * Refresh modules content
   * @memberOf PanelController
   */
  refreshModulesContent() {
    if (this.controller.isOpened()) {
      this.observer.publish(this.eventManager.eventList.showContent, [this.controller.getActiveResource(), true]);
    }
  }

  /**
   * Get active resource
   * @memberOf PanelController
   * @returns {string}
   */
  getActiveResource() {
    return this.scope.active;
  }

  /**
   * Set active resource
   * @memberOf PanelController
   * @param {string} [resource]
   * @returns {string}
   */
  setActiveResource(resource) {
    return this.scope.active = resource;
  }

  /**
   * Update opened
   * @memberOf PanelController
   * @param {string} resource
   */
  setBehavior(resource) {

    if (!resource) {
      return false;
    }

    /**
     * Define $panel
     * @type {PanelElement}
     */
    const $panel = this.scope.view.get$item();

    this.scope.opened[this.getActiveResource()] = false;

    if (this.getActiveResource()) {
      $panel.hideActiveModule();
    }

    /**
     * Update opened instance
     * @type {boolean}
     */
    this.scope.opened[resource] = true;

    /**
     * Define active panel
     * @type {string}
     */
    this.setActiveResource(resource);
  }

  /**
   * Close panel
   * @memberOf PanelController
   * @param {string} resource
   * @param {boolean} [close]
   */
  closePanel(resource, close) {

    if (!resource) {
      return false;
    }

    const elements = this.view.elements,
        $bar = elements.items['$bar-content'];

    if (this.controller.isActive(resource)) {
      if (this.controller.isOpened(resource) && close) {
        $bar.deactivateItems();
        this.view.get$item().hideActiveModule();
        this.controller.setActiveResource();
        this.opened[resource] = false;
        return false;
      }
    } else {
      this.observer.publish(this.eventManager.eventList.openPanel, resource);
    }
    $bar.selectItem(resource);
  }

  /**
   * Close panels [except this]
   * @memberOf PanelController
   */
  closePanels() {
    const panels = this.root().panels;

    for (let index in panels) {
      if (panels.hasOwnProperty(index)) {

        /**
         * Get panel
         * @type {Panel}
         */
        const panel = panels[index];
        panel.observer.publish(panel.eventManager.eventList.closePanel, [panel.active, false]);
      }
    }
  }

  /**
   * Open panel
   * @memberOf PanelController
   * @param {string} resource
   * @param {*} [event]
   * @param {function} [callback]
   */
  openPanel(resource, event, callback) {

    /**
     * Define $panel
     * @type {PanelElement}
     */
    const $panel = this.view.get$item();

    this.controller.closePanels();
    $panel.toggleModule(resource);
    PanelElement.showActiveModule(this.model.getModuleBy('name', resource));

    if (callback) {
      callback(event);
    }
  }

  /**
   * Show content
   * @memberOf PanelController
   * @param {string} [resource]
   * @param {boolean} [force]
   */
  showContent(resource, force) {

    if (!force && this.controller.isActive(resource) && this.controller.isOpened()) {
      return false;
    }

    /**
     * Define module index
     * @type {number}
     */
    const index = this.model.getModuleIndex(resource);

    /**
     * Define module instance
     * @type {*}
     */
    const module = this.controller.activateModule(index);

    this.view.renderContent(module, false);

    module.view.render();
    module.observer.publish(module.eventManager.eventList.loadModuleContent, true);
    this.controller.setBehavior(resource);
  }

  /**
   * Get render at
   * @memberOf PanelController
   * @returns {*}
   */
  getRenderAt() {
    return [this.scope.name.toLowerCase(), this.model.getConfig('renderAt')].join('-');
  }

  /**
   * Activate module
   * @memberOf PanelController
   * @param {number} index
   * @returns {*}
   */
  activateModule(index) {

    /**
     * Define module config
     * @type {{activated: Boolean, module}}
     */
    const data = this.model.getModule(index);

    if (!data) {
      this.scope.logger.error('Undefined module');
      return false;
    }

    if (!data.activated) {

      /**
       * Activate module
       * @type {boolean}
       */
      data.activated = true;
    }

    return data.module;
  }

  /**
   * Render packages
   * @memberOf PanelController
   */
  renderPackages() {

    /**
     * Init packages
     * @type {*}
     */
    const packages = this.model.getPackage();

    for (let i = 0, l = packages.length; i < l; i++) {

      /**
       * Define package local instance
       * @type {*}
       */
      const module = packages[i];

      this.scope.view.renderPackagesContent(module, false);

      module.view.render();
      module.controller.loadContent();
    }
  }

  /**
   * Execute generic event
   * @memberOf PanelController
   */
  executeGenericEvent() {
    this.observer.publish(this.eventManager.eventList.closePanel, this.active);
  }

  /**
   * Subscribe to generic event
   * @memberOf PanelController
   */
  subscribeGenericEvent() {

    /**
     * Get workspace
     * @type {Workspace}
     */
    const ws = this.controller.getWorkspace();

    /**
     * Get workspace
     * @type {WorkspaceEventManager}
     */
    const wsEventManager = ws.eventManager;

    if (!wsEventManager) {
      this.logger.warn('Workspace not initialized', ws);
      return false;
    }

    wsEventManager.subscribe({
      event: {name: wsEventManager.eventList.switchToPage},
      callback: this.controller.executeGenericEvent.bind(this)
    }, false);
  }

  /**
   * @memberOf PanelController
   * @param {string} value
   * @param items
   */
  updateItemsCount(value, items = {}) {
    const bar = this.controller.getPackageContentElementBy('bar', 'style', value);
    bar.updateBadge(Object.keys(items).length);
  }
}