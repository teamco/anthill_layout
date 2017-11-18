/**
 * Created by teamco on 11/4/14.
 */

defineP(function defineSiteConfigImport() {

  /**
   * Define site import
   * @class SiteConfigImport
   * @extends BaseController
   * @constructor
   */
  var SiteConfigImport = function SiteConfigImport() {
  };

  return SiteConfigImport.extend('SiteConfigImport', {

    /**
     * Import site data
     * @memberOf SiteConfigImport
     */
    importSiteData: function importSiteData() {
      this.view.showImportData();
    },

    /**
     * Approve import site data
     * @memberOf SiteConfigImport
     */
    approveImportSiteData: function approveImportSiteData() {

      /**
       * Get scope
       * @type {SiteConfig}
       */
      var scope = this.scope;

      /**
       * Get view elements
       * @type {SiteConfigView.elements|{$import}}
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
          elements.$import.data,
          true
      );

      $modal.$buttons.reload.enable();
      $modal.$buttons.confirm.disable();
      $modal.$buttons.reject.destroy();
      $modal.$buttons.closeX.destroy();
    },

    /**
     * Ready to import site data
     * @memberOf SiteConfigImport
     * @param {object} json
     * @param {File} file
     */
    readyToImportSiteData: function readyToImportSiteData(json, file) {
      this.view.showApproveImportData(json, file);
    },

    /**
     * Reload site data
     * @memberOf SiteConfigImport
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