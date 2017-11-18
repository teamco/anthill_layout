/**
 * Created by teamco on 11/4/14.
 */

defineP(function defineSiteConfigActivate() {

  /**
   * Define SiteConfig Activate
   * @class SiteConfigActivate
   * @extends AntHill
   * @extends BaseController
   * @extends Routes
   * @constructor
   */
  var SiteConfigActivate = function SiteConfigActivate() {
  };

  return SiteConfigActivate.extend('SiteConfigActivate', {

    /**
     * Define activate storage
     * @memberOf SiteConfigActivate
     */
    activateStorage: function activateStorage() {
      this.view.activateConfirmation();
    },

    /**
     * Define approve activate storage
     * @memberOf SiteConfigActivate
     * @param {function} [callback]
     */
    approveActivate: function approveActivate(callback) {

      /**
       * Get scope
       * @type {SiteConfig}
       */
      var scope = this.scope;

      /**
       * Define root
       * @type {Application}
       */
      var root = this.root();

      /**
       * Get root config
       * @type {{activate: boolean, mode: string, appName: string}}
       */
      var config = root.model.getConfig();

      /**
       * Define $modal
       * @type {ModalElement}
       */
      var $modal = scope.view.elements.$modal;

      // Get variables
      var route = scope.config.routes.activateSiteStorage,
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

      $.ajax(opts).done(
          function _done(data, type, xhr) {

            scope.logger.debug(data.notice, arguments);

            if (scope.base.isDefined($modal)) {
              $modal.selfDestroy();
            }

            root.observer.publish(
                root.eventmanager.eventList.updateStorageVersion,
                [data.version, data.activated]
            );

            root.observer.publish(
                root.eventmanager.eventList.afterUpdateStorage
            );

            if (_.isFunction(callback)) {

              scope.logger.debug('Execute activation callback', callback);
              callback();
            }
          }
      );
    }
  });
});