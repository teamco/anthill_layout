/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
  'plugins/plugin.controller',
  'plugins/widgets/widget.content.controller'
], function definePlaywireController(PluginBase, WidgetContentController) {

  /**
   * Define Playwire controller
   * @class PlaywireController
   * @extends PluginController
   * @extends WidgetContentController
   * @constructor
   */
  var PlaywireController = function PlaywireController() {
  };

  return PlaywireController.extend('PlaywireController', {

    /**
     * Set embedded content
     * @memberOf PlaywireController
     */
    setEmbeddedContent: function setEmbeddedContent() {
      this.view.get$item().renderEmbeddedContent(
          this.model.getPrefs('playwireEmbedCode')
      );
    },

    /**
     * Add Playwire rule
     * @memberOf PlaywireController
     * @param {Event} e
     */
    addPlaywireRule: function addPlaywireRule(e) {
      this.addWidgetRule(e, this.scope.name);
    }

  }, PluginBase.prototype, WidgetContentController.prototype);
});
