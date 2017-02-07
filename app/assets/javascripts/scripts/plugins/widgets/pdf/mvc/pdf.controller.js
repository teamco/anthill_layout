/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
  'plugins/plugin.controller',
  'plugins/widgets/widget.content.controller'
], function definePdfController(PluginBase, WidgetContentController) {

  /**
   * Define pdf controller
   * @class PdfController
   * @extends PluginController
   * @extends WidgetContentController
   * @constructor
   */
  var PdfController = function PdfController() {
  };

  return PdfController.extend('PdfController', {

    /**
     * Set embedded content
     * @memberOf PdfController
     */
    setEmbeddedContent: function setEmbeddedContent() {

      this.view.elements.$pdf.renderEmbeddedContent(
          this.model.getPrefs('pdfUrl')
      );
    },

    /**
     * Add Pdf rule
     * @memberOf PdfController
     * @param {Event} e
     */
    addPdfRule: function addPdfRule(e) {
      this.addWidgetRule(e, this.scope.name);
    }

  }, PluginBase.prototype, WidgetContentController.prototype);
});