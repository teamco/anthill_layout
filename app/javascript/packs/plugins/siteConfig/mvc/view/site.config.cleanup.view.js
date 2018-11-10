/**
 * Created with RubyMine.
 * User: teamco
 * Date: 5/2/15
 * Time: 8:52 AM
 */
defineP([
  'plugins/site.config/element/site.config.cleanup.element'
], function defineSiteConfigCleanupView(SiteConfigCleanUpElement) {

  /**
   * Define SiteConfigCleanupView
   * @class SiteConfigCleanupView
   * @extends AntHill
   * @extends BaseView
   * @constructor
   */
  var SiteConfigCleanupView = function SiteConfigCleanupView() {
  };

  return SiteConfigCleanupView.extend(
      'SiteConfigCleanupView', {

        /**
         * Render cleanup element
         * @memberOf SiteConfigCleanupView
         * @returns {SiteConfigCleanUpElement}
         */
        renderCleanUp: function renderCleanUp() {

          /**
           * Define SiteConfig CleanUp Element
           * @type {SiteConfigCleanUpElement}
           */
          this.elements.$cleanup = new SiteConfigCleanUpElement(this, {});

          return this.elements.$cleanup;
        },

        /**
         * Render cleanup confirmation modal dialog
         * @memberOf SiteConfigCleanupView
         */
        cleanUpConfirmation: function cleanUpConfirmation() {

          this.modalDialog({
            style: 'clean-up-data',
            type: 'warning',
            title: 'Clean up',
            text: 'Are you sure want to cleanup browser local storage?',
            html: this.renderCleanUp().$,
            cover: true,
            autoclose: true,
            buttons: {
              approve: {
                text: this.i18n.t('site.data.confirm'),
                type: 'warning',
                events: {
                  click: 'approveCleanUp'
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