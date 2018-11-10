/**
 * Created by teamco on 11/4/14.
 */

/**
 * @class SiteConfigPublish
 */
export class SiteConfigPublish {

  /**
   * Define publish storage
   * @memberOf SiteConfigPublish
   */
  publishStorage() {
    this.view.publishConfirmation();
  }

  /**
   * Define approve publish storage
   * @memberOf SiteConfigPublish
   */
  approvePublish() {

    /**
     * Get scope
     * @type {SiteConfig}
     */
    const scope = this.scope;

    /**
     * Define $modal
     * @type {ModalElement}
     */
    const $modal = scope.view.elements.$modal;

    if (!$modal) {
      scope.logger.warn('Undefined $modal');
      return false;
    }

    /**
     * Get root config
     * @type {{activate: boolean, mode: string}}
     */
    const config = this.root().model.getConfig();

    /**
     * Get create update site route
     * @type {{string[]}}
     */
    const route = scope.model.getConfig('routes/publishSiteStorage');
    const key = config.appName,
        opts = {
          dataType: 'json',
          url: route[0].replace(/\{id}/, key),
          method: route[1]
        };

    $.ajax(opts).done((data, type, xhr) => {
      scope.logger.debug(data.notice, arguments);
      $modal.selfDestroy();
    });
  }
}