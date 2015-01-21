/**
 * Created by i061485 on 11/4/14.
 */

define(function defineSiteConfigImport() {

    /**
     * Define site import
     * @class SiteConfigImport
     * @constructor
     */
    var SiteConfigImport = function SiteConfigImport() {

    };

    return SiteConfigImport.extend('SiteConfigImport', {

        /**
         * Import site data
         * @member SiteConfigImport
         */
        importSiteData: function importSiteData() {
            this.view.showImportData();
        },

        /**
         * Approve import site data
         * @member SiteConfigImport
         */
        approveImportSiteData: function approveImportSiteData() {

            /**
             * Get scope
             * @type {SiteConfig}
             */
            var scope = this.scope;

            /**
             * Get view elements
             * @type {SiteConfigView.elements}
             */
            var elements = scope.view.elements;

            /**
             * Get $modal
             * @type {ModalElement}
             */
            var $modal = scope.view.get$modal();

            if (!$modal || $modal.$buttons.confirm.disabled) {
                return false;
            }

            this.root().model.setting.importData(
                elements.$import.data
            );

            $modal.$buttons.reload.enable();
            $modal.$buttons.confirm.disable();
            $modal.$buttons.reject.destroy();
            $modal.$buttons.closeX.destroy();
        },

        /**
         * Ready to import site data
         * @member SiteConfigImport
         * @param {object} json
         * @param {FileList} file
         */
        readyToImportSiteData: function readyToImportSiteData(json, file) {
            this.view.showApproveImportData(json, file);
        },

        /**
         * Reload site data
         * @member SiteConfigImport
         */
        reloadSiteData: function reloadSiteData() {

            /**
             * Get $modal
             * @type {ModalElement}
             */
            var $modal = this.scope.view.get$modal();

            if (!$modal || $modal.$buttons.reload.disabled) {
                return false;
            }

            document.location.reload(true);
        }
    });
});