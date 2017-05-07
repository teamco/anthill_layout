/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
  'plugins/plugin.controller',
  'plugins/widgets/widget.content.controller'
], function defineGettyImagesController(PluginBase, WidgetContentController) {

  /**
   * Define GettyImages controller
   * @class GettyImagesController
   * @extends PluginController
   * @extends WidgetContentController
   * @constructor
   */
  var GettyImagesController = function GettyImagesController() {
  };

  return GettyImagesController.extend('GettyImagesController', {

    /**
     * Set embedded content
     * @memberOf GettyImagesController
     */
    setEmbeddedContent: function setEmbeddedContent() {
      this.view.get$item().renderEmbeddedContent(
          this.model.getPrefs('gettyimagesEmbedCode')
      );
    },

    /**
     * Add GettyImages rule
     * @memberOf GettyImagesController
     * @param {Event} e
     */
    addGettyImagesRule: function addGettyImagesRule(e) {
      this.addWidgetRule(e, this.scope.name);
    }

  }, PluginBase.prototype, WidgetContentController.prototype);
});
