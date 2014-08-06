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
             * @memberOf SiteConfigController
             * @returns {*}
             */
            getData: function getData() {
                return this.model.getDataItems(
                    this.getWorkspace()
                );
            },

            /**
             * Load site content
             * @memberOf SiteConfigController
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
             * @memberOf SiteConfigController
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
             * @memberOf SiteConfigController
             * @returns {SiteConfigModel.preferences}
             */
            getPreferences: function getPreferences() {
                return this.model.preferences;
            },

            /**
             * Approve update preferences
             * @memberOf SiteConfigController
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
             * @memberOf SiteConfigController
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
             * @memberOf SiteConfigController
             */
            cleanUpLocalStorage: function cleanUpLocalStorage() {
                this.view.cleanUpConfirmation();
            },

            /**
             * Approve clean up
             * @memberOf SiteConfigController
             */
            approveCleanUp: function approveCleanUp() {

                /**
                 * Define scope
                 * @memberOf SiteConfig
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