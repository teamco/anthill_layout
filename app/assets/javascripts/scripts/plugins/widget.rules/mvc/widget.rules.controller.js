/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:03 AM
 */

defineP([
  'config/anthill',
  'plugins/plugin.controller'
], function defineWidgetRulesController(AntHill, PluginBase) {

  /**
   * Define WidgetRules controller
   * @class WidgetRulesController
   * @extends AntHill
   * @extends PluginController
   * @constructor
   */
  var WidgetRulesController = function WidgetRulesController() {
  };

  return WidgetRulesController.extend('WidgetRulesController', {

    /**
     * Store item
     * @memberOf WidgetRulesController
     * @param item
     */
    storeItem: function storeItem(item) {
      this.logger.debug('Update storage', item);
      this.model.collectItems(item);
    },

    /**
     * Get module data
     * @memberOf WidgetRulesController
     */
    getModuleData: function getModuleData() {
      return this.model.getWidgetRulesItems(
          this.getPage()
      );
    },

    /**
     * Get rules html
     * @memberOf WidgetRulesController
     * @param {string} uuid
     * @param {boolean} load
     * @returns {*}
     */
    getRulesHtml: function getRulesHtml(uuid, load) {

      /**
       * Define scope
       * @type {WidgetRules}
       */
      var scope = this.scope;

      // set active content
      scope.observer.publish(
          scope.eventmanager.eventList.setActiveContent,
          uuid
      );

      if (load) {

        /**
         * Define widget
         * @type {Widget}
         */
        var widget = this.getPage().model.getItemByUUID(uuid);

        return this.scope.activeContent.view.renderRules(
            widget.eventmanager.getEvents(),
            widget.controller.getContent().eventmanager.getEvents()
        );
      }
    },

    /**
     * Set active content
     * @memberOf WidgetRulesController
     * @param {string} uuid
     */
    setActiveContent: function setActiveContent(uuid) {

      if (!uuid) {
        this.logger.debug('Skip active content setter');
        return false;
      }

      /**
       * Get current page
       * @type {Page}
       */
      var page = this.controller.getPage();

      /**
       * Get widget
       * @type {Widget}
       */
      var widget = page.model.getItemByUUID(uuid);

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
    },

    /**
     * Load stored rules
     * @memberOf WidgetRulesController
     * @param {{publish, subscribe}} rules
     */
    loadStoredRules: function loadStoredRules(rules) {
      this.showPublishedRules(rules.publish);
    },

    /**
     * Show published rules
     * @memberOf WidgetRulesController
     * @param publish
     */
    showPublishedRules: function showPublishedRules(publish) {

      /**
       * Define active content
       * @type {*}
       */
      var scope = this.scope.activeContent;

      for (var index in publish) {

        if (publish.hasOwnProperty(index)) {

          /**
           * Define rules
           * @type {Array}
           */
          var rules = publish[index];

          for (var i = 0, l = rules.length; i < l; i++) {

            scope.observer.publish(
                scope.eventmanager.eventList.publishRule,
                [rules[i], index]
            );
          }
        }
      }
    },

    /**
     * Check if content was updated
     * @memberOf WidgetRulesController
     * @param data
     * @param content
     * @returns {boolean}
     */
    isUpdate: function isUpdate(data, content) {

      /**
       * Define hash
       * @type {*}
       */
      var hash = this.base.lib.hash;

      return hash.hashLength(data || {}) !==
          hash.hashLength(content || {})
    },

    /**
     * Update rules
     * @memberOf WidgetRulesController
     */
    approveUpdateRules: function approveUpdateRules() {

      /**
       * Define scope
       * @type {WidgetRules}
       */
      var scope = this.scope;

      scope.activeContent.controller.updateRules(
          scope.view.elements.$modal
      );
    },

    /**
     * Open prefs from rules dialog
     * @memberOf WidgetRulesController
     * @param {*} event
     */
    preferencesWidgetRules: function preferencesWidgetRules(event) {

      /**
       * Define panel
       * @type {Panel}
       */
      var panel = this.getDesignTimePanel();

      /**
       * Define widget rules
       * @type {PageData}
       */
      var pageData = panel.controller.getPageData();

      /**
       * Define active content
       * @type {*}
       */
      var content = this.scope.activeContent;

      /**
       * Define widget
       * @type {Widget}
       */
      var widget = content.controller.getContainment();

      this.scope.view.get$modal().selfDestroy();

      panel.observer.publish(
          panel.eventmanager.eventList.openPanel, [
            'page-data', event,
            this.prepareTriggerShowModalData.bind({
              widget: widget,
              scope: pageData
            })
          ]
      );
    }

  }, AntHill.prototype, PluginBase.prototype);
});