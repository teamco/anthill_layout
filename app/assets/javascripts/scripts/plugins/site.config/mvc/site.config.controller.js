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
     * @param {PreferencesController} PreferencesController
     * @returns {SiteConfigController}
     */
        function defineSiteConfigController(PluginBase, PreferencesController) {

        /**
         * Define site config controller
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
             * Load site content
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
             * Load preferences
             * @member SiteConfigController
             * @param data
             */
            loadSitePreferences: function loadSitePreferences(data) {
                this.view.showPreferences(
                    data,
                    this.model.getSiteWidthRange()
                );
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
             * Approve update preferences
             * @member SiteConfigController
             */
            approveUpdatePreferences: function approveUpdatePreferences() {

                /**
                 * Define scope
                 * @type {SitePreferences}
                 */
                var scope = this.scope,
                    workspace = scope.controller.getWorkspace();

                workspace.controller.updatePreferences(
                    scope.view.elements.$modal,
                    false
                );
            },

            /**
             * Revert preferences on cancel
             * @member SiteConfigController
             */
            revertSitePreferences: function revertSitePreferences() {

                /**
                 * Define workspace
                 * @type {Workspace}
                 */
                var workspace = this.getWorkspace();

                workspace.observer.publish(
                    workspace.eventmanager.eventList.updateSiteWidth
                );
            },

            /**
             * Clean up local storage
             * @member SiteConfigController
             */
            cleanUpLocalStorage: function cleanUpLocalStorage() {
                this.view.cleanUpConfirmation();
            },

            /**
             * Import site data
             * @member SiteConfigController
             */
            importSiteData: function importSiteData() {

                this.view.showImportData();

//                /**
//                 * Get root
//                 * @type {App}
//                 */
//                var root = this.controller.root();
//
//                root.model.setting.importData(JSON.parse(json));
//
//                document.location.reload(true);
            },

            /**
             * Export site data
             * @member SiteConfigController
             */
            exportSiteData: function exportSiteData() {

                /**
                 * Get root
                 * @type {App}
                 */
                var root = this.controller.root(),
                    ns = root.model.setting.getNameSpace();

                root.view.renderExportLink({
                    type: 'text/json;charset=utf-8',
                    fileName: 'data.json',
                    content: LZString.decompress(localStorage[ns]),
                    title: 'Export JSON',
                    autoload: true
                });
            },

            /**
             * Approve clean up
             * @member SiteConfigController
             */
            approveCleanUp: function approveCleanUp() {

                /**
                 * Define scope
                 * @member SiteConfig
                 */
                var scope = this.scope,
                    $modal = scope.view.elements.$modal;

                if (scope.base.isDefined($modal)) {
                    $modal.selfDestroy();
                }

                this.root().model.setting.clear();

                // Reload without cache
                document.location.reload(true);
            }

        }, PluginBase.prototype, PreferencesController.prototype);
    }
);