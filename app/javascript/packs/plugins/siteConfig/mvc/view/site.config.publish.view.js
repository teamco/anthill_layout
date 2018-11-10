/**
 * Created with RubyMine.
 * User: teamco
 * Date: 5/2/15
 * Time: 8:47 AM
 */
defineP([
  'plugins/site.config/element/site.config.publish.element'
], function defineSiteConfigPublishView(SiteConfigPublishElement) {

  /**
   * Define SiteConfigPublishView
   * @class SiteConfigPublishView
   * @extends BaseView
   * @constructor
   */
  var SiteConfigPublishView = function SiteConfigPublishView() {
  };

  return SiteConfigPublishView.extend(
      'SiteConfigPublishView', {

        /**
         * Render publish element
         * @memberOf SiteConfigPublishView
         * @returns {SiteConfigPublishElement}
         */
        renderPublish: function renderPublish() {

          /**
           * Define SiteConfig Activate Element
           * @type {SiteConfigPublishElement}
           */
          this.elements.$publish = new SiteConfigPublishElement(this, {});

          return this.elements.$publish;
        },

        /**
         * Render publish confirmation modal dialog
         * @memberOf SiteConfigPublishView
         */
        publishConfirmation: function publishConfirmation() {

          /**
           * Get root
           * @type {Application}
           */
          var root = this.controller.root();

          this.modalDialog({
            style: 'publish',
            type: 'warning',
            title: 'Publish',
            text: [
              'Are you sure want to publish current version: ',
              root.model.getConfig('version'), '?'
            ].join(''),
            html: this.renderPublish().$,
            cover: true,
            autoclose: true,
            buttons: {
              approve: {
                text: this.i18n.t('site.data.confirm'),
                type: 'success',
                events: {
                  click: 'approvePublish'
                }
              },
              reject: {
                text: this.i18n.t('site.data.cancel'),
                events: {
                  click: 'rejectModalEvent'
                }
              }
            }
          });
        }
      }
  );
});