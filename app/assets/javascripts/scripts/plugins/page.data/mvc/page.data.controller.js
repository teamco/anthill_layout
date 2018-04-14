/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:03 AM
 */

defineP([
  'config/anthill',
  'modules/Router',
  'plugins/plugin.controller'
], function definePageDataController(AntHill, Router, PluginBase) {

  /**
   * Define page.data controller
   * @class PageDataController
   * @extends AntHill
   * @extends PluginController
   * @extends Router
   * @constructor
   */
  var PageDataController = function PageDataController() {
  };

  return PageDataController.extend(
      'PageDataController', {

        /**
         * Store item
         * @memberOf PageDataController
         * @param item
         */
        storeItem: function storeItem(item) {
          this.logger.debug('Update storage', item);
          this.model.collectItems(item);
        },

        /**
         * Get module data
         * @memberOf PageDataController
         */
        getModuleData: function getModuleData() {
          return this.model.getPageData(
              this.getPage()
          );
        },

        /**
         * Set active content
         * @memberOf PageDataController
         * @param {string} uuid
         * @returns {*|boolean}
         */
        setActiveContent: function setActiveContent(uuid) {

          if (!uuid) {
            this.logger.debug('Skip active content setter');
            return false;
          }

          /**
           * Get workspace data
           * @type {WorkspaceData}
           */
          var workspacesData = this.controller.getModuleByName(
              'workspace-data');

          /**
           * Get current page
           * @type {Page}
           */
          var page = this.controller.getPage();

          workspacesData.observer.publish(
              workspacesData.eventManager.eventList.setActiveContent,
              page.model.getUUID()
          );

          /**
           * Get widget
           * @type {Widget}
           */
          var widget = page.model.getItemByUUID(uuid);

          if (!widget) {

            this.logger.warn('Invalid data', page, uuid);

            /**
             * Get panel
             * @type {Panel}
             */
            var panel = this.controller.getDesignTimePanel();

            panel.observer.publish(
                panel.eventManager.eventList.closePanel,
                panel.active
            );

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
           * Define referrer
           * @type {PageData}
           */
          this.activeContent.referrer = this;

          this.logger.debug('Active content', this.activeContent);
        },

        /**
         * Check if content was updated
         * @memberOf PageDataController
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
         * Update prefs
         * @memberOf PageDataController
         */
        approveUpdatePreferences: function approveUpdatePreferences() {

          /**
           * Define scope
           * @type {PageData|{name}}
           */
          var scope = this.scope,
              content = scope.activeContent;

          content.controller.updatePreferences(
              scope.view.elements.$modal,
              true
          );

          /**
           * Get widget
           * @type {Widget}
           */
          var widget = content.controller.getContainment();

          /**
           * Get element uuid
           * @type {string}
           */
          var uuid = [
            widget.model.getUUID(),
            scope.name.toDash()
          ].join('-');

          this.getView().elements.items[uuid].setAttributes(
              widget
          );
        },

        /**
         * Open rules from prefs dialog
         * @memberOf PageDataController
         * @param {*} event
         */
        rulesPageData: function rulesPageData(event) {

          /**
           * Define panel
           * @type {Panel}
           */
          var panel = this.getDesignTimePanel();

          /**
           * Define widget rules
           * @type {WidgetRules}
           */
          var widgetRules = panel.controller.getWidgetRules();

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
              panel.eventManager.eventList.openPanel, [
                'widget-rules', event,
                this.prepareTriggerShowModalData.bind({
                  widget: widget,
                  scope: widgetRules
                })
              ]
          );
        },

        /**
         * Restore layer index
         * @memberOf PageDataController
         */
        restoreWidgetsLayerIndex: function restoreWidgetsLayerIndex() {

          /**
           * Define active content
           * @type {*}
           */
          var content = this.scope.activeContent;

          content.observer.publish(
              content.eventManager.eventList.executeOnWidgetEvent,
              'restoreLayerIndex'
          );
        },

        /**
         * Restore widget sticker
         * @memberOf PageDataController
         */
        restoreWidgetSticker: function restoreWidgetSticker() {

          /**
           * Define active content
           * @type {*}
           */
          var content = this.scope.activeContent;

          content.observer.publish(
              content.eventManager.eventList.executeOnWidgetEvent,
              'restoreWidgetSticker'
          );
        },

        /**
         * Remove widget from page
         * @memberOf PageDataController
         * @param {Event} e
         */
        removeWidget: function removeWidget(e) {

          /**
           * Get scope
           * @type {PageData}
           */
          var scope = this.scope;

          /**
           * Get active content
           * @type {WidgetContent}
           */
          var content = scope.activeContent;

          if (!content) {

            scope.logger.warn('Undefined active content', e);
            return false;
          }

          /**
           * Get page
           * @type {Page}
           */
          var page = this.getPage(),
              panel = this.getDesignTimePanel();

          // Close author panel
          panel.controller.closePanels();

          // Destroy properties dialog
          scope.view.elements.$modal.selfDestroy();

          page.api.destroyWidget(
              content.controller.getContainment()
          );
        },

        /**
         * Define show widget content
         * @memberOf PageDataController
         * @param {Event} e
         */
        showWidgetContent: function showWidgetContent(e) {

          /**
           * Get scope
           * @type {PageData}
           */
          var scope = this.scope;

          // Get widget content
          var content = scope.activeContent;

          if (!content) {
            scope.logger.debug('Undefined content');
            return false;
          }

          /**
           * Get widget
           * @type {Widget}
           */
          var widget = content.controller.getContainment();

          /**
           * Get page
           * @type {Page}
           */
          var page = widget.controller.getContainment();

          // Destroy properties dialog
          scope.view.elements.$modal.selfDestroy();

          var url = [
            window.location.origin + window.location.pathname + '#',
            this.getItemIdentity(page),
            this.getItemIdentity(widget),
            'content'
          ].join('/');

          scope.logger.debug('showWidgetContent', page, widget, content, url,
              e);

          scope.observer.publish(
              scope.eventManager.eventList.openUrlOnEvent, [
                url, true, false
              ]
          );
        },

        /**
         * Prepare to create page
         * @method prepareShowContentRules
         * @memberOf PageDataController
         */
        prepareShowContentRules: function prepareShowContentRules() {

          /**
           * Get scope
           * @type {PageData}
           */
          var scope = this.scope;

          /**
           * Get view
           * @type {PageDataView}
           */
          var view = scope.view;

          /**
           * Get workspace
           * @type {Page}
           */
          var page = this.getPage();

          view.renderPageContentRulesWizard({
            style: 'page-rules',
            title: 'Page content rules',
            page: page,
            $html: view.elements.$contentRules.renderWizard(page)
          });
        },

        /**
         * approveEditRules
         * @method approveEditRules
         * @memberOf PageDataController
         */
        approveEditRules: function approveEditRules() {

        }
      },
      AntHill.prototype,
      Router.prototype,
      PluginBase.prototype
  );
});