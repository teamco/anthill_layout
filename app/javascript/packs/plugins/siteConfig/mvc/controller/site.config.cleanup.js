/**
 * Created by teamco on 11/4/14.
 */

/**
 * @class SiteConfigCleanup
 */
export class SiteConfigCleanup {

  /**
   * Clean up local storage
   * @memberOf SiteConfigCleanup
   */
  cleanUpLocalStorage() {

    /**
     * Get scope
     * @type {SiteConfig}
     */
    const scope = this;

    scope.view.cleanUpConfirmation();

    scope.eventManager.subscribePublishOn(scope.controller.root(), () => {

      // Reload without cache
      // document.location.reload(true);

      /**
       * Get root
       * @type {Application}
       */
      const root = scope.controller.root();

      // Store current location
      const currentLocation = window.location.href;

      const regExp = new RegExp([
        ('[' + root.config.appName),
        (root.controller.getMode()),
        '](\\d+)'
      ].join('/'));

      if (!(regExp && currentLocation.match(regExp))) {
        scope.logger.warn('Unable to fetch latest version');
        return false;
      }

      window.location.href = currentLocation.replace(regExp,
          '/' + root.model.getConfig('version'));
    });
  }

  /**
   * Approve clean up
   * @memberOf SiteConfigCleanup
   */
  approveCleanUp() {

    /**
     * Define scope
     * @memberOf SiteConfig
     */
    const scope = this.scope,
        $modal = scope.view.elements.$modal;

    if ($modal) {
      $modal.selfDestroy();
    }

    /**
     * Get root
     * @type {Application}
     */
    const root = this.root();

    root.model.setting.clear();
  }
}