/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:03 AM
 */

/**
 * Aggregation of base class and mixin classes.
 * @type {(function(*, ...[*]): __Aggregate)|*|(function(): aggregate)}
 */
const aggregation = require('../../../core/lib/extends/aggregation.js');

/**
 * @constant PluginController
 * @type {module.PluginController|*}
 */
const PluginController = require('../../plugin.controller.js');

/**
 * @constant Router
 * @type {module.Router}
 */
const Router = require('../../../core/lib/modules/Router.js');

/**
 * @class PageDataController
 * @extends {PluginController, Router}
 */
module.exports = class PageDataController extends aggregation(PluginController, Router) {

  /**
   * @constructor
   * @param {string} name
   * @param {PageData} scope
   */
  constructor(name, scope) {
    super(name || 'PageDataController', scope, false);
  }

  /**
   * Store item
   * @memberOf PageDataController
   * @param item
   */
  storeItem(item) {
    this.logger.debug('Update storage', item);
    this.model.collectItems(item);
  }

  /**
   * Get module data
   * @memberOf PageDataController
   */
  getModuleData() {
    return this.model.getPageData(this.getPage());
  }

  /**
   * Set active content
   * @memberOf PageDataController
   * @param {string} uuid
   * @returns {*|boolean}
   */
  setActiveContent(uuid) {

    if (!uuid) {
      this.logger.debug('Skip active content setter');
      return false;
    }

    /**
     * Get workspace data
     * @type {WorkspaceData}
     */
    const workspacesData = this.controller.getModuleByName('workspace-data');

    /**
     * Get current page
     * @type {module.Page|{model}}
     */
    const page = this.controller.getPage();

    if (workspacesData) {
      workspacesData.observer.publish(workspacesData.eventManager.eventList.setActiveContent, page.model.getUUID());
    } else {
      this.logger.warn('Module WorkspaceData should be attached');
    }

    /**
     * Get widget
     * @type {Widget}
     */
    const widget = page.model.getItemByUUID(uuid);

    if (!widget) {

      this.logger.warn('Invalid data', page, uuid);

      /**
       * Get panel
       * @type {Panel}
       */
      const panel = this.controller.getDesignTimePanel();

      panel.observer.publish(panel.eventManager.eventList.closePanel, panel.active);
      return false;
    }

    /**
     * Set active content
     * @type {WidgetContent}
     */
    this.activeContent = widget.controller.getContent();

    if (!this.activeContent) {
      this.logger.warn('Undefined content');
      return false;
    }

    /**
     * @property PageData
     * @type {module.PageDataController}
     */
    this.activeContent.referrer = this;
    this.logger.debug('Active content', this.activeContent);
  }

  /**
   * Check if content was updated
   * @memberOf PageDataController
   * @param data
   * @param content
   * @returns {boolean}
   */
  isUpdate(data, content) {

    /**
     * Define hash
     * @type {*}
     */
    const hash = this.base.lib.hash;
    return hash.hashLength(data || {}) !== hash.hashLength(content || {});
  }

  /**
   * Update prefs
   * @memberOf PageDataController
   */
  approveUpdatePreferences() {

    /**
     * Define scope
     * @type {PageData|{name}}
     */
    const scope = this.scope,
        content = scope.activeContent;

    content.controller.updatePreferences(scope.view.elements.$modal, true);

    /**
     * Get widget
     * @type {Widget}
     */
    const widget = content.controller.getContainment();

    /**
     * Get element uuid
     * @type {string}
     */
    const uuid = [widget.model.getUUID(), scope.name.toDash()].join('-');

    this.getView().elements.items[uuid].setAttributes(widget);
  }

  /**
   * Open rules from prefs dialog
   * @memberOf PageDataController
   * @param {*} event
   */
  rulesPageData(event) {

    /**
     * Define panel
     * @type {Panel}
     */
    const panel = this.getDesignTimePanel();

    /**
     * Define widget rules
     * @type {WidgetRules}
     */
    const widgetRules = panel.controller.getWidgetRules();

    /**
     * Define active content
     * @type {*}
     */
    const content = this.scope.activeContent;

    /**
     * Define widget
     * @type {Widget}
     */
    const widget = content.controller.getContainment();

    this.scope.view.get$modal().selfDestroy();

    panel.observer.publish(
        panel.eventManager.eventList.openPanel, [
          'widget-rules', event,
          this.prepareTriggerShowModalData.bind({
            widget: widget,
            scope: widgetRules
          })
        ]
    );
  }

  /**
   * Restore layer index
   * @memberOf PageDataController
   */
  restoreWidgetsLayerIndex() {

    /**
     * Define active content
     * @type {*}
     */
    const content = this.scope.activeContent;

    content.observer.publish(content.eventManager.eventList.executeOnWidgetEvent, 'restoreLayerIndex');
  }

  /**
   * Restore widget sticker
   * @memberOf PageDataController
   */
  restoreWidgetSticker() {

    /**
     * Define active content
     * @type {*}
     */
    const content = this.scope.activeContent;

    content.observer.publish(content.eventManager.eventList.executeOnWidgetEvent, 'restoreWidgetSticker');
  }

  /**
   * Remove widget from page
   * @memberOf PageDataController
   * @param {Event} e
   */
  removeWidget(e) {

    /**
     * Get scope
     * @type {PageData}
     */
    const scope = this.scope;

    /**
     * Get active content
     * @type {WidgetContent|{controller}}
     */
    const content = scope.activeContent;

    if (!content) {
      scope.logger.warn('Undefined active content', e);
      return false;
    }

    /**
     * @constant page
     * @type {module.Page}
     */
    const page = this.getPage();

    /**
     * @constant panel
     * @type {module.Panel|{controller}}
     */
    const panel = this.getDesignTimePanel();

    // Close author panel
    panel.controller.closePanels();

    // Destroy properties dialog
    scope.view.elements.$modal.selfDestroy();
    page.api.destroyWidget(content.controller.getContainment());
  }

  /**
   * Define show widget content
   * @memberOf PageDataController
   * @param {Event} e
   */
  showWidgetContent(e) {

    /**
     * Get scope
     * @type {PageData}
     */
    const scope = this.scope;

    // Get widget content
    const content = scope.activeContent;

    if (!content) {
      scope.logger.debug('Undefined content');
      return false;
    }

    /**
     * Get widget
     * @type {Widget}
     */
    const widget = content.controller.getContainment();

    /**
     * Get page
     * @type {Page}
     */
    const page = widget.controller.getContainment();

    // Destroy properties dialog
    scope.view.elements.$modal.selfDestroy();

    const url = [
      window.location.origin + window.location.pathname + '#',
      this.getItemIdentity(page),
      this.getItemIdentity(widget),
      'content'
    ].join('/');

    scope.logger.debug('showWidgetContent', page, widget, content, url, e);
    scope.observer.publish(scope.eventManager.eventList.openUrlOnEvent, [url, true, false]);
  }

  /**
   * Prepare to create page
   * @method prepareShowContentRules
   * @memberOf PageDataController
   */
  prepareShowContentRules() {

    /**
     * Get scope
     * @type {PageData}
     */
    const scope = this.scope;

    /**
     * Get view
     * @type {module.PageDataView}
     */
    const view = scope.view;

    /**
     * Get workspace
     * @type {module.Page}
     */
    const page = this.getPage();

    view.renderPageContentRulesWizard({
      style: 'page-rules',
      title: 'Page content rules',
      page: page,
      $html: view.elements.$contentRules.renderWizard(page)
    });
  }

  /**
   * approveEditRules
   * @method approveEditRules
   * @memberOf PageDataController
   */
  approveEditRules() {
  }
};