/**
 * Created with RubyMine.
 * User: i061485
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
    'config/anthill',
    'plugins/plugin'
], function defineSitePreferencesController(AntHill, PluginBase) {

    /**
     * Define site controller
     * @class SitePreferencesController
     * @extends AntHill
     * @extends PluginController
     * @constructor
     */
    var SitePreferencesController = function SitePreferencesController() {
    };

    return SitePreferencesController.extend('SitePreferencesController', {

        /**
         * Load page.data content
         * @member SitePreferencesController
         * @param opened
         */
        loadContent: function loadContent(opened) {

            if (opened) {
                this.getView().renderContent(
                    this.model.getData()
                );
            }
        },

        /**
         * Load preferences
         * @member SitePreferencesController
         * @param data
         */
        loadPreferences: function loadPreferences(data) {
            this.view.showPreferences(data)
        },

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
        }

    }, AntHill.prototype, PluginBase.prototype);
});