/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
  'plugins/plugin.controller',
  'plugins/widgets/widget.content.controller'
], function defineEbaumsWorldController(PluginBase, WidgetContentController) {

  /**
   * Define EbaumsWorld controller
   * @class EbaumsWorldController
   * @extends PluginController
   * @extends WidgetContentController
   * @constructor
   */
  var EbaumsWorldController = function EbaumsWorldController() {
  };

  return EbaumsWorldController.extend('EbaumsWorldController', {

    /**
     * Set embedded content
     * @memberOf EbaumsWorldController
     */
    setEmbeddedContent: function setEmbeddedContent() {
      this.view.get$item().renderEmbeddedContent(
          this.model.getPrefs('ebaumsworldEmbedCode')
      );
    },

    /**
     * Add EbaumsWorld rule
     * @memberOf EbaumsWorldController
     * @param {Event} e
     */
    addEbaumsWorldRule: function addEbaumsWorldRule(e) {
      this.addWidgetRule(e, this.scope.name);
    }

  }, PluginBase.prototype, WidgetContentController.prototype);
});
