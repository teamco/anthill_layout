/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
  'plugins/plugin.controller',
  'plugins/widgets/widget.content.controller'
], function defineDocsComController(PluginBase, WidgetContentController) {

  /**
   * Define DocsCom controller
   * @class DocsComController
   * @extends PluginController
   * @extends WidgetContentController
   * @constructor
   */
  var DocsComController = function DocsComController() {
  };

  return DocsComController.extend('DocsComController', {

    /**
     * Set embedded content
     * @memberOf DocsComController
     */
    setEmbeddedContent: function setEmbeddedContent() {
      this.view.get$item().renderEmbeddedContent(
          this.model.getPrefs('docscomEmbedCode')
      );
    },

    /**
     * Add DocsCom rule
     * @memberOf DocsComController
     * @param {Event} e
     */
    addDocsComRule: function addDocsComRule(e) {
      this.addWidgetRule(e, this.scope.name);
    }

  }, PluginBase.prototype, WidgetContentController.prototype);
});
