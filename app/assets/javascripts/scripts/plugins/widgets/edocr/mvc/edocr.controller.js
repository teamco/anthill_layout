/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
  'plugins/plugin.controller',
  'plugins/widgets/widget.content.controller'
], function defineEdocrController(PluginBase, WidgetContentController) {

  /**
   * Define Edocr controller
   * @class EdocrController
   * @extends PluginController
   * @extends WidgetContentController
   * @constructor
   */
  var EdocrController = function EdocrController() {
  };

  return EdocrController.extend('EdocrController', {

    /**
     * Set embedded content
     * @memberOf EdocrController
     */
    setEmbeddedContent: function setEmbeddedContent() {
      this.view.get$item().renderEmbeddedContent(
          this.model.getPrefs('edocrEmbedCode')
      );
    },

    /**
     * Add Edocr rule
     * @memberOf EdocrController
     * @param {Event} e
     */
    addEdocrRule: function addEdocrRule(e) {
      this.addWidgetRule(e, this.scope.name);
    }

  }, PluginBase.prototype, WidgetContentController.prototype);
});
