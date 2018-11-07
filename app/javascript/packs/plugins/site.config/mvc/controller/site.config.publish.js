/**
 * Created by teamco on 11/4/14.
 */

defineP(function defineSiteConfigPublish() {

  /**
   * Define SiteConfig Publish
   * @class SiteConfigPublish
   * @extends BaseController
   * @constructor
   */
  var SiteConfigPublish = function SiteConfigPublish() {
  };

  return SiteConfigPublish.extend('SiteConfigPublish', {

    /**
     * Define publish storage
     * @memberOf SiteConfigPublish
     */
    publishStorage: function publishStorage() {
      this.view.publishConfirmation();
    },

    /**
     * Define approve publish storage
     * @memberOf SiteConfigPublish
     */
    approvePublish: function approvePublish() {

      /**
       * Get scope
       * @type {SiteConfig}
       */
      var scope = this.scope;

      /**
       * Define $modal
       * @type {ModalElement}
       */
      var $modal = scope.view.elements.$modal;

      if (!scope.base.isDefined($modal)) {
        scope.logger.warn('Undefined $modal');
        return false;
      }

      /**
       * Get root config
       * @type {{activate: boolean, mode: string}}
       */
      var config = this.root().model.getConfig();

      /**
       * Get create update site route
       * @type {{string[]}}
       */
      var route = scope.model.getConfig('routes/publishSiteStorage'),
          key = config.appName,
          opts = {
            dataType: 'json',
            url: route[0].replace(/\{id}/, key),
            method: route[1]
          };

      $.ajax(opts).done(function (data, type, xhr) {

        scope.logger.debug(data.notice, arguments);
        $modal.selfDestroy();
      });
    }
  });
});