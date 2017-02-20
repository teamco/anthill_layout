/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
  'plugins/plugin.controller',
  'plugins/widgets/widget.content.controller'
], function defineRepubhubController(PluginBase, WidgetContentController) {

  /**
   * Define Repubhub controller
   * @class RepubhubController
   * @extends PluginController
   * @extends WidgetContentController
   * @constructor
   */
  var RepubhubController = function RepubhubController() {
  };

  return RepubhubController.extend('RepubhubController', {

    /**
     * Set embedded content
     * @memberOf RepubhubController
     */
    setEmbeddedContent: function setEmbeddedContent() {
      this.view.get$item().renderEmbeddedContent(
          this.model.getPrefs('repubhubEmbedCode')
      );
    },

    /**
     * Add Repubhub rule
     * @memberOf RepubhubController
     * @param {Event} e
     */
    addRepubhubRule: function addRepubhubRule(e) {
      this.addWidgetRule(e, this.scope.name);
    }

  }, PluginBase.prototype, WidgetContentController.prototype);
});
