/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
  'plugins/plugin.controller',
  'plugins/widgets/widget.content.controller'
], function defineCodepenIoController(PluginBase, WidgetContentController) {

  /**
   * Define CodepenIo controller
   * @class CodepenIoController
   * @extends PluginController
   * @extends WidgetContentController
   * @constructor
   */
  var CodepenIoController = function CodepenIoController() {
  };

  return CodepenIoController.extend('CodepenIoController', {

    /**
     * Set embedded content
     * @memberOf CodepenIoController
     */
    setEmbeddedContent: function setEmbeddedContent() {
      this.view.get$item().renderEmbeddedContent(
          this.model.getPrefs('codepenioEmbedCode')
      );
    },

    /**
     * Add CodepenIo rule
     * @memberOf CodepenIoController
     * @param {Event} e
     */
    addCodepenIoRule: function addCodepenIoRule(e) {
      this.addWidgetRule(e, this.scope.name);
    }

  }, PluginBase.prototype, WidgetContentController.prototype);
});
