/**
 * Created by teamco on 11/4/14.
 */

define(function defineSiteConfigExport() {

    /**
     * Define site Export
     * @class SiteConfigExport
     * @extends BaseController
     * @constructor
     */
    var SiteConfigExport = function SiteConfigExport() {
    };

    return SiteConfigExport.extend('SiteConfigExport', {

        /**
         * Export site data
         * @memberOf SiteConfigExport
         */
        exportSiteData: function exportSiteData() {

            var root = this.controller.root(),
                setting = root.model.setting,
                ns = setting.getNameSpace();

            var fName = [
                ns, root.model.getUUID()
            ].join('-');

            root.view.renderExportLink({
                type: 'text/json',
                fileName: fName + '.json',
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