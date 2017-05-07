/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
  'plugins/plugin.controller',
  'plugins/widgets/widget.content.controller'
], function defineFlipPdfController(PluginBase, WidgetContentController) {

  /**
   * Define flippdf controller
   * @class FlipPdfController
   * @extends PluginController
   * @extends WidgetContentController
   * @constructor
   */
  var FlipPdfController = function FlipPdfController() {
  };

  return FlipPdfController.extend('FlipPdfController', {

    /**
     * Set embedded content
     * @memberOf FlipPdfController
     */
    setEmbeddedContent: function setEmbeddedContent() {
      this.view.elements.$flippdf.renderEmbeddedContent(
          this.model.getPrefs('flippdfEmbedCode')
      );
    },

    /**
     * Add FlipPdf rule
     * @memberOf FlipPdfController
     * @param {Event} e
     */
    addFlipPdfRule: function addFlipPdfRule(e) {
      this.addWidgetRule(e, this.scope.name);
    }

  }, PluginBase.prototype, WidgetContentController.prototype);
});
