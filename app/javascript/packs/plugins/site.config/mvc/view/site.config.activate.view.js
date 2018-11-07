/**
 * Created with RubyMine.
 * User: teamco
 * Date: 5/2/15
 * Time: 8:55 AM
 */
defineP([
  'plugins/site.config/element/site.config.activate.element'
], function defineSiteConfigActivateView(SiteConfigActivateElement) {

  /**
   * Define SiteConfigActivateView
   * @class SiteConfigActivateView
   * @extends BaseView
   * @constructor
   */
  var SiteConfigActivateView = function SiteConfigActivateView() {
  };

  return SiteConfigActivateView.extend(
      'SiteConfigActivateView', {

        /**
         * Render activate element
         * @memberOf SiteConfigView
         * @param {function} callback
         * @returns {SiteConfigActivateElement}
         */
        renderActivate: function renderActivate(callback) {

          /**
           * Define SiteConfig Activate Element
           * @type {SiteConfigActivateElement}
           */
          this.elements.$activate = new SiteConfigActivateElement(this, {
            callback: callback
          });

          return this.elements.$activate;
        },

        /**
         * Render activate confirmation modal dialog
         * @memberOf SiteConfigView
         */
        activateConfirmation: function activateConfirmation() {

          /**
           * Define show modal callback
           * @private
           */
          function _showModal() {

            // Define buttons
            var buttons = {};

            // Define modal type
            var type = 'info';

            // Get config
            var config = root.model.getConfig();

            // Define title
            var title = 'Version already activated: ';

            if (!config.activate) {

              /**
               * Define approve button if site should be activated
               * @type {{text: (*|string), type: string, events: {click:
               *     string}}}
               */
              buttons.approve = {
                text: view.i18n.t('site.data.activate'),
                type: 'success',
                events: {
                  click: 'approveActivate'
                }
              };

              type = 'warning';
              title = 'Activate version: ';
            }

            /**
             * Define buttons
             * @type {{reject: {text: (*|string), events: {click: string}}}}
             */
            buttons.reject = {
              text: view.i18n.t('site.data.cancel'),
              events: {
                click: 'rejectModalEvent'
              }
            };

            view.modalDialog({
              style: 'activate',
              type: type,
              title: title + config.version,
              html: activate.$,
              cover: true,
              autoclose: true,
              buttons: buttons
            });
          }

          /**
           * Get view
           * @type {SiteConfigActivateView}
           */
          var view = this;

          /**
           * Get root
           * @type {Application}
           */
          var root = view.controller.root();

          /**
           * Get activate
           * @type {SiteConfigActivateElement}
           */
          var activate = view.renderActivate(_showModal);
        }
      }
  );
});