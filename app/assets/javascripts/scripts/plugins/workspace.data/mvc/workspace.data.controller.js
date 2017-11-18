/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:03 AM
 */

defineP(
    [
      'plugins/plugin.controller',
      'plugins/preferences/preferences.controller'
    ],

    /**
     * Define WorkspaceDataController
     * @param {PluginController} PluginBase
     * @param {PreferencesController} PreferencesController
     * @returns {WorkspaceDataController}
     */
    function defineWorkspaceDataController(PluginBase, PreferencesController) {

      /**
       * Define pages controller
       * @class WorkspaceDataController
       * @extends PluginController
       * @extends PreferencesController
       * @constructor
       */
      var WorkspaceDataController = function WorkspaceDataController() {
      };

      return WorkspaceDataController.extend(
          'WorkspaceDataController', {

            /**
             * Get module data
             * @memberOf WorkspaceDataController
             * @returns {*}
             */
            getModuleData: function getModuleData() {
              return this.model.getDataItems(
                  this.getWorkspace()
              );
            },

            /**
             * Load pages content
             * @memberOf WorkspaceDataController
             * @param opened
             */
            loadContent: function loadContent(opened) {
              if (opened) {
                this.getView().renderContent(
                    this.getData()
                );
              }
            },

            /**
             * Define preferences
             * @memberOf WorkspaceDataController
             * @param {string} uuid
             * @returns {*}
             */
            definePreferences: function definePreferences(uuid) {

              return this.scope.view.renderPreferences(
                  this.getWorkspace().model.getItemByUUID(uuid)
              );
            },

            /**
             * Set active content
             * @memberOf WorkspaceDataController
             * @param {string} [uuid]
             */
            setActiveContent: function setActiveContent(uuid) {

              /**
               * Define workspace
               * @type {Workspace}
               */
              var workspace = this.controller.getWorkspace();

              /**
               * Set active content
               * @type {Page}
               */
              this.activeContent = workspace.model.getItemByUUID(uuid);
            },

            /**
             * Prepare to show preferences
             * @memberOf WorkspaceDataController
             * @param config
             */
            preparePreferences: function preparePreferences(config) {

              /**
               * Get swipe
               * @type {boolean}
               */
              var swipe = this.model.getConfig('switch');

              this.observer.publish(
                  this.eventmanager.eventList.setActiveContent,
                  config.uuid
              );

              if (swipe) {

                /**
                 * Define Workspace
                 * @type {Workspace}
                 */
                var workspace = this.view.controller.getWorkspace();

                workspace.observer.publish(
                    workspace.eventmanager.eventList.switchToPage,
                    [this.activeContent, false]
                );
              }

              this.view.showPreferences(config, !swipe);
            },

            /**
             * Update prefs
             * @memberOf WorkspaceDataController
             */
            approveUpdatePreferences: function approveUpdatePreferences() {

              /**
               * Define scope
               * @type {WorkspaceData}
               */
              var scope = this.scope;

              /**
               * Get page
               * @type {Page}
               */
              var page = scope.activeContent;

              page.controller.updatePreferences(
                  scope.view.elements.$modal,
                  false
              );

              /**
               * Get element uuid
               * @type {string}
               */
              var uuid = page.model.getUUID() + '-workspace-data-view';

              /**
               * Get $item
               * @type {BaseElement}
               */
              var $item = this.getView().elements.items[uuid];

              $item.updateCounter(page);
              $item.updateShowInTabs(
                  this.checkShowInTabs(page)
              );

              /**
               * Get workspace
               * @type {Workspace}
               */
              var workspace = this.getWorkspace();

              workspace.controller.setPageByHashLocation(page);
            },

            /**
             * Check show in tabs
             * @memberOf WorkspaceDataController
             * @param {Page} page
             * @returns {boolean}
             */
            checkShowInTabs: function checkShowInTabs(page) {

              return this.scope.base.defineBoolean(
                  page.model.getConfig('preferences').showInTabs, true, true
              );
            },

            /**
             * Define publisher
             * @memberOf WorkspaceDataController
             * @param page
             */
            definePublisher: function definePublisher(page) {
              this.scope.eventmanager.subscribePublishOn(
                  page,
                  this.updateCounter.bind(this.scope)
              );
            },

            /**
             * Locate page element
             * @memberOf WorkspaceDataController
             * @param {Event} event
             */
            locatePageElement: function locatePageElement(event) {

              /**
               * Get page
               * @type {Page}
               */
              var page = this.scope.activeContent;

              /**
               * Define $item
               * @type {PluginElement}
               */
              var $item = page.view.get$item();

              $item.locate$element(event);
            },

            /**
             * Destroy page widgets
             * @memberOf WorkspaceDataController
             */
            destroyPageWidgets: function destroyPageWidgets() {

              /**
               * Define page
               * @type {Page}
               */
              var page = this.scope.activeContent;

              page.api.destroyItems(
                  page.model.getItems()
              );

              this.scope.view.elements.$modal.selfDestroy(false);
            },

            /**
             * showPageGrid
             * @method showPageGrid
             * @memberOf WorkspaceDataController
             */
            showPageGrid: function showPageGrid() {

              /**
               * Get page
               * @type {Page}
               */
              var page = this.getPage();

              /**
               * Get layout
               * @type {Layout}
               */
              var layout = page.controller.getLayout();

              layout.observer.publish(
                  layout.eventmanager.eventList.toggleGrid
              );
            },

            /**
             * Update widgets counter
             * @memberOf WorkspaceDataController
             */
            updateCounter: function updateCounter() {

              /**
               * Get workspace
               * @type {Workspace|*}
               */
              var workspace = this.controller.getWorkspace(),
                  pages = workspace.model.getItems(),
                  index, page, $item, uuid,
                  cname = '-workspace-data-view';

              for (index in pages) {

                if (pages.hasOwnProperty(index)) {

                  /**
                   * Define page
                   * @type {Page}
                   */
                  page = pages[index];

                  /**
                   * Define uuid
                   * @type {string}
                   */
                  uuid = page.model.getConfig('uuid');

                  /**
                   * Define pages content element
                   * @type {WorkspaceDataContentElement}
                   */
                  $item = this.view.elements.items[uuid + cname];

                  // TODO Fix
                  if (!$item) {
                    this.logger.warn('Unable to fetch item',
                        this.view.elements.items, uuid, cname);
                    return false;
                  }

                  $item.updateCounter(page);
                }
              }
            },

            /**
             * Prepare to create page
             * @memberOf WorkspaceDataController
             */
            prepareCreatePage: function prepareCreatePage() {

              /**
               * Get scope
               * @type {WorkspaceData}
               */
              var scope = this.scope;

              // Unset active content
              scope.observer.publish(
                  scope.eventmanager.eventList.setActiveContent
              );

              /**
               * Get view
               * @type {WorkspaceDataView}
               */
              var view = scope.view;

              /**
               * Get workspace
               * @type {Workspace}
               */
              var workspace = this.getWorkspace();

              view.renderCreatePageWizard({
                style: 'create-page',
                title: 'Create page',
                workspace: workspace,
                $html: view.elements.$addPage.renderWizard(workspace)
              });
            },

            /**
             * Create new page
             * @memberOf WorkspaceDataController
             */
            approveCreatePage: function approveCreatePage() {

              /**
               * Get workspace
               * @type {Workspace}
               */
              var workspace = this.getWorkspace();

              /**
               * Define page
               * @type {Page}
               */
              var page = workspace.api.createPage([], true);

              page.controller.updatePreferences(
                  this.scope.view.elements.$modal,
                  false
              );

              workspace.observer.publish(
                  workspace.eventmanager.eventList.switchToPage,
                  [page, true]
              );

              /**
               * Get panel
               * @type {Panel}
               */
              var panel = this.getDesignTimePanel();

              panel.observer.publish(
                  panel.eventmanager.eventList.refreshModulesContent
              );
            },

            /**
             * Update pages order
             * @memberOf WorkspaceDataController
             * @param {Array} order
             */
            updatePagesOrder: function updatePagesOrder(order) {

              var i = 0, l = order.length,
                  $item, page;

              for (i; i < l; i++) {

                /**
                 * Get $item
                 * @type {WorkspaceDataContentElement}
                 */
                $item =
                    this.view.elements.items[order[i] + '-workspace-data-view'];

                /**
                 * Get page
                 * @type {Page}
                 */
                page = $item.page;

                page.observer.publish(
                    page.eventmanager.eventList.transferPreferences,
                    ['order', i]
                );
              }

              /**
               * Get workspace
               * @type {Workspace}
               */
              var ws = page.controller.getContainment();

              ws.observer.publish(
                  ws.eventmanager.eventList.afterPageOrder,
                  order
              );
            },

            /**
             * Navigate to page
             * @memberOf WorkspaceDataController
             * @returns {boolean}
             */
            navigateToPage: function navigateToPage() {

              /**
               * Get scope
               * @type {WorkspaceData}
               */
              var scope = this.scope;

              scope.observer.publish(
                  scope.eventmanager.eventList.switchToActivePage,
                  scope.activeContent
              );
            },

            /**
             * Switch to active page before rendering widget preferences
             * @memberOf WorkspaceDataController
             * @param {Page} [page]
             * @returns {boolean}
             */
            switchToActivePage: function switchToActivePage(page) {

              /**
               * Get page
               * @type {Page}
               */
              page = page || this.activeContent;

              if (!page) {
                this.logger.warn('Undefined page');
                return false;
              }

              if (page === this.controller.getPage()) {
                this.logger.debug('Page already current');
                return false;
              }

              /**
               * Get workspace
               * @type {Workspace}
               */
              var ws = page.controller.getContainment();

              ws.observer.publish(
                  ws.eventmanager.eventList.switchToPage, [
                    page,
                    false
                  ]
              );
            }
          },
          PluginBase.prototype,
          PreferencesController.prototype
      );
    }
);