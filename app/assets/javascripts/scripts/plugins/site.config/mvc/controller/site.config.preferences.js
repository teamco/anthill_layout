/**
 * Created by i061485 on 11/4/14.
 */

define(function defineSiteConfigPreferences() {

    /**
     * Define SiteConfig Preferences
     * @class SiteConfigPreferences
     * @constructor
     */
    var SiteConfigPreferences = function SiteConfigPreferences() {

    };

    return SiteConfigPreferences.extend('SiteConfigPreferences', {

        /**
         * Load preferences
         * @memberOf SiteConfigPreferences
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
         * @memberOf SiteConfigPreferences
         * @returns {SiteConfigModel.preferences}
         */
        getPreferences: function getPreferences() {
            return this.model.preferences;
        },

        /**
         * Approve update preferences
         * @memberOf SiteConfigPreferences
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
         * @memberOf SiteConfigPreferences
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
        }
    });
});