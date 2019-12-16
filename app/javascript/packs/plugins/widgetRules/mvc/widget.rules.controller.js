/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:03 AM
 */

import {PluginController} from '../../plugin.controller';
import {WidgetRulesModel} from 'js/plugins/widgetRules/mvc/widget.rules.model';

/**
 * @class WidgetRulesController
 * @extends PluginController
 */
export class WidgetRulesController extends PluginController {

  /**
   * @constructor
   * @param {Bar} scope
   */
  constructor(scope) {
    super('WidgetRulesController', scope);
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
   * Check if content was updated
   * @memberOf WidgetRulesController
   * @static
   * @param data
   * @param content
   * @returns {boolean}
   */
  static isUpdate(data, content) {
    return Object.keys(data || {}).length !== Object.keys(content || {}).length;
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
   * @this WidgetRules
   */
  setActiveContent(uuid) {
    if (!uuid) {
      this.logger.debug('Skip active content setter');
      return false;
    }

    /**
     * Get current page
     * @type {Page}
     */
    const page = this.controller.getPage();

    /**
     * Get widget
     * @type {Widget}
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

    if (!this.activeContent) {
      this.logger.warn('Undefined active content');
      return false;
    }

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
      if (Object.prototype.hasOwnProperty.call(publish, index)) {

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
   * Get module data
   * @memberOf WidgetRulesController
   */
  getModuleData() {
    return WidgetRulesModel.getWidgetRulesItems(this.getPage());
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
     * @type {PageData}
     */
    const pageData = panel.model.getModuleBy('name', 'page-data');

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
}