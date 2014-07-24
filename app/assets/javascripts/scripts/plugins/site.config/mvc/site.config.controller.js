/**
 * Created with RubyMine.
 * User: i061485
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define(
    [
        'plugins/plugin',
        'plugins/preferences/preferences.controller'
    ],

    /**
     * Define SiteConfigController
     * @param {PluginController} PluginBase
     * @returns {SiteConfigController}
     */
        function defineSiteConfigController(PluginBase, PreferencesController) {

        /**
         * Define pages controller
         * @class SiteConfigController
         * @extends PluginController
         * @extends PreferencesController
         * @constructor
         */
        var SiteConfigController = function SiteConfigController() {

        };

        return SiteConfigController.extend('SiteConfigController', {

            /**
             * Get data
             * @member SiteConfigController
             * @returns {*}
             */
            getData: function getData() {
                return this.model.getDataItems(
                    this.getWorkspace()
                );
            },

            /**
             * Load pages content
             * @member SiteConfigController
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
             * Get Prefs
             * @member SiteConfigController
             * @returns {SiteConfigModel.preferences}
             */
            getPreferences: function getPreferences() {
                return this.model.preferences;
            },

            /**
             * Define preferences
             * @member SiteConfigController
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
             * @member SiteConfigController
             * @param uuid
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
             * Update prefs
             * @member SiteConfigController
             */
            approveUpdatePreferences: function approveUpdatePreferences() {

                /**
                 * Define scope
                 * @type {SiteConfig}
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
                var uuid = page.model.getUUID() + '-site-config-view';

                this.getView().elements.items[uuid].updateCounter(
                    page
                );

                /**
                 * Get workspace
                 * @type {Workspace}
                 */
                var workspace = this.getWorkspace();

                workspace.controller.setPageByHashLocation(page);
            },

            /**
             * Define publisher
             * @member SiteConfigController
             * @param page
             */
            definePublisher: function definePublisher(page) {
                this.scope.eventmanager.subscribePublishOn(
                    page,
                    this.updateCounter.bind(this.scope)
                );
            },

            /**
             * Locate page data element
             * @member SiteConfigController
             * @param e
             */
            locateSiteConfig: function locateSiteConfig(e) {

                /**
                 * Define $item
                 * @type {PageElement}
                 */
                var $item = this.scope.activeContent.view.get$item();

                this.locateElement($item, e);
            },

            /**
             * Destroy page widgets
             * @member SiteConfigController
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

                this.scope.view.elements.$modal.selfDestroy();
            },

            /**
             * Update widgets counter
             * @member SiteConfigController
             */
            updateCounter: function updateCounter() {

                /**
                 * Get workspace
                 * @type {Workspace}
                 */
                var workspace = this.controller.getWorkspace(),
                    pages = workspace.model.getItems(),
                    index, page, $item, uuid,
                    cname = '-site-config-view';

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
                         * @type {SiteConfigContentElement}
                         */
                        $item = this.view.elements.items[uuid + cname];

                        $item.updateCounter(page);
                    }
                }
            },

            /**
             * Create new page
             * @member SiteConfigController
             */
            createPage: function createPage() {

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

                this.store(
                    this.root()
                );

                workspace.observer.publish(
                    workspace.eventmanager.eventList.switchToPage,
                    [page, true]
                );

                /**
                 * Get panel
                 * @type {Panel}
                 */
                var panel = this.getAuthorPanel();

                panel.observer.publish(
                    panel.eventmanager.eventList.showContent,
                    [true, panel.active]
                );

            }

        }, PluginBase.prototype, PreferencesController.prototype);
    }
);