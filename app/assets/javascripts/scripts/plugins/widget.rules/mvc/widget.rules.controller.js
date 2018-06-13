/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:03 AM
 */

/**
 * @constant PluginController
 * @type {module.PluginController|*}
 */
const PluginController = require('../../plugin.controller.js');

/**
 * @class WidgetRulesController
 * @extends PluginController
 */
module.exports = class WidgetRulesController extends PluginController {

  /**
   * @constructor
   * @param {Bar} scope
   */
  constructor(scope) {
    super('WidgetRulesController', scope, false);
  }

  /**
   * Store item
   * @memberOf WidgetRulesController
   * @param item
   */
  storeItem(item) {
    this.logger.debug('Update storage', item);
    this.model.collectItems(item);
  }

  /**
   * Get module data
   * @memberOf WidgetRulesController
   */
  getModuleData() {
    return this.model.getWidgetRulesItems(this.getPage());
  }

  /**
   * Get rules html
   * @memberOf WidgetRulesController
   * @param {string} uuid
   * @param {boolean} load
   * @returns {*}
   */
  getRulesHtml(uuid, load) {

    /**
     * Define scope
     * @type {WidgetRules}
     */
    const scope = this.scope;

    // set active content
    scope.observer.publish(scope.eventManager.eventList.setActiveContent, uuid);

    if (load) {

      /**
       * Define widget
       * @type {Widget}
       */
      const widget = this.getPage().model.getItemByUUID(uuid);

      return this.scope.activeContent.view.renderRules(
          widget.eventManager.getEvents(),
          widget.controller.getContent().eventManager.getEvents());
    }
  }

  /**
   * Set active content
   * @memberOf WidgetRulesController
   * @param {string} uuid
   */
  setActiveContent(uuid) {
    if (!uuid) {
      this.logger.debug('Skip active content setter');
      return false;
    }

    /**
     * Get current page
     * @type {module.Page}
     */
    const page = this.controller.getPage();

    /**
     * Get widget
     * @type {module.Widget}
     */
    const widget = page.model.getItemByUUID(uuid);

    if (!widget) {
      this.logger.warn('Undefined widget', uuid, page);
      return false;
    }

    /**
     * Set active content
     * @type {WidgetContent}
     */
    this.activeContent = widget.controller.getContent();

    /**
     * Define referrer
     * @type {WidgetRules}
     */
    this.activeContent.referrer = this;
    this.logger.debug('Active content', this.activeContent);
  }

  /**
   * Load stored rules
   * @memberOf WidgetRulesController
   * @param {{publish, subscribe}} rules
   */
  loadStoredRules(rules) {
    this.showPublishedRules(rules.publish);
  }

  /**
   * Show published rules
   * @memberOf WidgetRulesController
   * @param publish
   */
  showPublishedRules(publish) {

    /**
     * Define active content
     * @type {*}
     */
    const scope = this.scope.activeContent;

    for (let index in publish) {
      if (publish.hasOwnProperty(index)) {

        /**
         * Define rules
         * @type {Array}
         */
        const rules = publish[index];

        for (let i = 0, l = rules.length; i < l; i++) {
          scope.observer.publish(scope.eventManager.eventList.publishRule, [rules[i], index]);
        }
      }
    }
  }

  /**
   * Check if content was updated
   * @memberOf WidgetRulesController
   * @param data
   * @param content
   * @returns {boolean}
   */
  isUpdate(data, content) {
    return Object.keys(data || {}).length !== Object.keys(content || {}).length;
  }

  /**
   * Update rules
   * @memberOf WidgetRulesController
   */
  approveUpdateRules() {

    /**
     * Define scope
     * @type {WidgetRules}
     */
    const scope = this.scope;
    scope.activeContent.controller.updateRules(scope.view.elements.$modal);
  }

  /**
   * Open prefs from rules dialog
   * @memberOf WidgetRulesController
   * @param {*} event
   */
  preferencesWidgetRules(event) {

    /**
     * Define panel
     * @type {Panel}
     */
    const panel = this.getDesignTimePanel();

    /**
     * Define widget rules
     * @type {module.PageData}
     */
    const pageData = panel.controller.getPageData();

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
          'page-data', event,
          this.prepareTriggerShowModalData.bind({
            widget: widget,
            scope: pageData
          })
        ]
    );
  }
};