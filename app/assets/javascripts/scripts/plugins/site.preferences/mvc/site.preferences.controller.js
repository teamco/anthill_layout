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
         */
        loadPreferences: function loadPreferences(e, data) {
            this.view.showPreferences()
        }

    }, AntHill.prototype, PluginBase.prototype);
});