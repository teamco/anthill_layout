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
        'plugins/site.config/mvc/controller/site.config.activate',
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
     * @param {SiteConfigActivate} SiteConfigActivate
     * @param {SiteConfigWidgetGenerator} SiteConfigWidgetGenerator
     * @param {PreferencesController} PreferencesController
     * @returns {SiteConfigController}
     */
    function defineSiteConfigController(PluginBase, Routes, SiteConfigImport, SiteConfigExport, SiteConfigCleanup, SiteConfigPreferences, SiteConfigActivate, SiteConfigWidgetGenerator, PreferencesController) {

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
                 * @memberOf SiteConfigController
                 * @returns {*}
                 */
                getModuleData: function getModuleData() {
                    return this.model.getDataItems(
                        this.getWorkspace()
                    );
                },

                /**
                 * Load site content
                 * @memberOf SiteConfigController
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
            SiteConfigActivate.prototype,
            SiteConfigWidgetGenerator.prototype,
            PreferencesController.prototype
        );
    }
);