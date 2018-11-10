/**
 * Created by teamco on 11/4/14.
 */

/**
 * @class SiteConfigImport
 */
export class SiteConfigImport {

  /**
   * Import site data
   * @memberOf SiteConfigImport
   */
  importSiteData() {
    this.view.showImportData();
  }

  /**
   * Approve import site data
   * @memberOf SiteConfigImport
   */
  approveImportSiteData() {

    /**
     * Get scope
     * @type {SiteConfig}
     */
    const scope = this.scope;

    /**
     * Get view elements
     * @type {SiteConfigView.elements|{$import}}
     */
    const elements = scope.view.elements;

    /**
     * Get $modal
     * @type {ModalElement}
     */
    const $modal = scope.view.get$modal();

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
  }

  /**
   * Ready to import site data
   * @memberOf SiteConfigImport
   * @param {object} json
   * @param {File} file
   */
  readyToImportSiteData(json, file) {
    this.view.showApproveImportData(json, file);
  }

  /**
   * Reload site data
   * @memberOf SiteConfigImport
   */
  reloadSiteData() {

    /**
     * Get $modal
     * @type {ModalElement}
     */
    const $modal = this.scope.view.get$modal();

    if (!$modal || $modal.$buttons.reload.disabled) {
      return false;
    }

    document.location.reload(true);
  }
}
  