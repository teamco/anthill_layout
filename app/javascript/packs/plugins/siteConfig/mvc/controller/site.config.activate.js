/**
 * @class SiteConfigActivate
 */
export class SiteConfigActivate {

  /**
   * Define activate storage
   * @memberOf SiteConfigActivate
   */
  activateStorage() {
    this.view.activateConfirmation();
  }

  /**
   * Define approve activate storage
   * @memberOf SiteConfigActivate
   * @param {function} [callback]
   */
  approveActivate(callback) {

    /**
     * Get scope
     * @type {SiteConfig}
     */
    const scope = this.scope;

    /**
     * Define root
     * @type {Application}
     */
    const root = this.root();

    /**
     * Get root config
     * @type {{activate: boolean, mode: string, appName: string}}
     */
    const config = root.model.getConfig();

    /**
     * Define $modal
     * @type {ModalElement}
     */
    const $modal = scope.view.elements.$modal;

    const route = scope.config.routes.activateSiteStorage,
        opts = {
          dataType: 'json',
          url: [route[0], config.appName, config.version].join('/'),
          method: route[1],
          data: this.prepareXhrData()
        };

    if (config.activate) {
      scope.logger.warn('Version already activated');
      return false;
    }

    $.ajax(opts).done((data, type, xhr) => {
          scope.logger.debug(data.notice, arguments);

          if ($modal) {
            $modal.selfDestroy();
          }

          root.observer.publish(
              root.eventManager.eventList.updateStorageVersion,
              [data.version, data.activated]
          );

          root.observer.publish(root.eventManager.eventList.afterUpdateStorage);

          if (callback) {
            scope.logger.debug('Execute activation callback', callback);
            callback();
          }
        }
    );
  }
}