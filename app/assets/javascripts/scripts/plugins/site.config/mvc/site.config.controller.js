/**
 * Created with RubyMine.
 * User: i061485
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define(
    [
        'plugins/plugin',
        'config/routes',
        'plugins/site.config/mvc/controller/site.config.import',
        'plugins/site.config/mvc/controller/site.config.export',
        'plugins/site.config/mvc/controller/site.config.cleanup',
        'plugins/site.config/mvc/controller/site.config.preferences',
        'plugins/site.config/mvc/controller/site.config.widget.generator',
        'plugins/preferences/preferences.controller'
    ],

    /**
     * Define SiteConfigController
     * @param {PluginController} PluginBase
     * @param {Routes} Routes
     * @param {SiteConfigImport} SiteConfigImport
     * @param {SiteConfigExport} SiteConfigExport
     * @param {SiteConfigCleanup} SiteConfigCleanup
     * @param {SiteConfigPreferences} SiteConfigPreferences
     * @param {SiteConfigWidgetGenerator} SiteConfigWidgetGenerator
     * @param {PreferencesController} PreferencesController
     * @returns {SiteConfigController}
     */
    function defineSiteConfigController(PluginBase, Routes, SiteConfigImport, SiteConfigExport, SiteConfigCleanup, SiteConfigPreferences, SiteConfigWidgetGenerator, PreferencesController) {

        /**
         * Define site config controller
         * @class SiteConfigController
         * @extends PluginController
         * @extends Routes
         * @extends SiteConfigImport
         * @extends PreferencesController
         * @constructor
         */
        var SiteConfigController = function SiteConfigController() {

        };

        return SiteConfigController.extend('SiteConfigController', {

                /**
                 * Get module data
                 * @member SiteConfigController
                 * @returns {*}
                 */
                getModuleData: function getModuleData() {
                    return this.model.getDataItems(
                        this.getWorkspace()
                    );
                },

                /**
                 * Load site content
                 * @member SiteConfigController
                 * @param opened
                 */
                loadModuleContent: function loadModuleContent(opened) {
                    if (opened) {
                        this.getView().renderContent(
                            this.getData()
                        );
                    }
                }
            },

            PluginBase.prototype,
            Routes.prototype,
            SiteConfigImport.prototype,
            SiteConfigExport.prototype,
            SiteConfigCleanup.prototype,
            SiteConfigPreferences.prototype,
            SiteConfigWidgetGenerator.prototype,
            PreferencesController.prototype
        );
    }
);