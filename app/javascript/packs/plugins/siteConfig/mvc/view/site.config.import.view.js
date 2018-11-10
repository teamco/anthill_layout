/**
 * Created with RubyMine.
 * User: teamco
 * Date: 5/2/15
 * Time: 9:03 AM
 */
defineP([
  'plugins/site.config/element/site.config.import.file.element',
  'plugins/site.config/element/site.config.approve.import.element'
], function defineSiteConfigImportView(SiteConfigImportFileElement,
    SiteConfigApproveImportElement) {

  /**
   * Define SiteConfigImportView
   * @class SiteConfigImportView
   * @extends BaseView
   * @constructor
   */
  var SiteConfigImportView = function SiteConfigImportView() {
  };

  return SiteConfigImportView.extend(
      'SiteConfigImportView', {

        /**
         * Show import data
         * @memberOf SiteConfigImportView
         */
        showImportData: function showImportData() {

          /**
           * Define $html
           * @type {SiteConfigImportFileElement}
           */
          var $html = this.renderImportData();

          /**
           * Define buttons
           * @type {*}
           */
          var buttons = {
            reject: {
              text: this.i18n.t('site.data.cancel'),
              events: {
                click: 'rejectModalEvent'
              }
            }
          };

          /**
           * Get Workspace
           * @type {Workspace}
           */
          var workspace = this.controller.getWorkspace();

          this.modalDialog({
            style: 'import-site-data upload-json',
            type: 'info',
            title: this.i18n.t('import.site.data'),
            text: workspace.model.getUUID(),
            html: $html.$,
            cover: true,
            buttons: buttons
          });
        },

        /**
         * Show approve import data
         * @memberOf SiteConfigImportView
         * @param {object} json
         * @param {File} file
         */
        showApproveImportData: function showApproveImportData(json, file) {

          /**
           * Define $html
           * @type {SiteConfigApproveImportElement}
           */
          var $html = this.renderApproveImportData(json);

          /**
           * Define buttons
           * @type {*}
           */
          var buttons = {
            reload: {
              text: this.i18n.t('import.site.data.confirm.reload'),
              disabled: true,
              type: 'success',
              events: {
                click: 'reloadSiteData'
              }
            },
            confirm: {
              text: this.i18n.t('site.data.confirm'),
              type: 'warning',
              events: {
                click: 'approveImportSiteData'
              }
            },
            reject: {
              text: this.i18n.t('site.data.cancel'),
              events: {
                click: 'rejectModalEvent'
              }
            }
          };

          this.elements.$modal.selfDestroy();

          this.modalDialog({
            style: 'import-site-data approve',
            type: 'warning',
            title: this.i18n.t('import.site.data.confirm'),
            text: [
              encodeURIComponent(file.name),
              ' (', file.type || 'n/a', '), ',
              this.scope.base.lib.number.bytes2Size(file.size)
            ].join(''),
            html: $html.$,
            cover: true,
            buttons: buttons
          });
        },

        /**
         * Render import file element
         * @memberOf SiteConfigImportView
         * @returns {SiteConfigImportFileElement}
         */
        renderImportData: function renderImportData() {

          /**
           * Define SiteConfig ImportFile Element
           * @type {SiteConfigImportFileElement|SiteConfigApproveImportElement}
           */
          this.elements.$import = new SiteConfigImportFileElement(this, {});

          return this.elements.$import;
        },

        /**
         * Render approve import file element
         * @memberOf SiteConfigImportView
         * @returns {SiteConfigApproveImportElement}
         */
        renderApproveImportData: function renderApproveImportData(json) {

          /**
           * Define SiteConfig Approve Import Element
           * @type {SiteConfigApproveImportElement}
           */
          this.elements.$import = new SiteConfigApproveImportElement(this, {
            data: json
          });

          return this.elements.$import;
        }
      }
  );
});