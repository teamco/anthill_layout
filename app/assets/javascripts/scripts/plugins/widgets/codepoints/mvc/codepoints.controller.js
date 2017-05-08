/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
  'plugins/plugin.controller',
  'plugins/widgets/widget.content.controller'
], function defineCodepointsController(PluginBase, WidgetContentController) {

  /**
   * Define Codepoints controller
   * @class CodepointsController
   * @extends PluginController
   * @extends WidgetContentController
   * @constructor
   */
  var CodepointsController = function CodepointsController() {
  };

  return CodepointsController.extend('CodepointsController', {

    /**
     * Set embedded content
     * @memberOf CodepointsController
     */
    setEmbeddedContent: function setEmbeddedContent() {
      this.view.get$item().renderEmbeddedContent(
          this.model.getPrefs('codepointsEmbedCode')
      );
    },

    /**
     * Add Codepoints rule
     * @memberOf CodepointsController
     * @param {Event} e
     */
    addCodepointsRule: function addCodepointsRule(e) {
      this.addWidgetRule(e, this.scope.name);
    }

  }, PluginBase.prototype, WidgetContentController.prototype);
});
