/**
 * Created by i061485 on 11/4/14.
 */

define(function defineSiteConfigExport() {

    /**
     * Define site Export
     * @class SiteConfigExport
     * @constructor
     */
    var SiteConfigExport = function SiteConfigExport() {

    };

    return SiteConfigExport.extend('SiteConfigExport', {

        /**
         * Export site data
         * @member SiteConfigExport
         */
        exportSiteData: function exportSiteData() {

            /**
             * Get root
             * @type {Application}
             */
            var root = this.controller.root(),
                setting = root.model.setting,
                ns = setting.getNameSpace();

            root.view.renderExportLink({
                type: 'text/json',
                fileName: 'data.json',
                content: JSON.stringify(
                    setting.decompress(
                        setting.getStorage().getItem([ns])
                    )
                ),
                title: 'Export JSON',
                autoload: true
            });
        }
    });
});