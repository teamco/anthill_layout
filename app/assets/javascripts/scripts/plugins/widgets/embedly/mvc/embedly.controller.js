/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
  'plugins/plugin.controller',
  'plugins/widgets/widget.content.controller'
], function defineEmbedlyController(PluginBase, WidgetContentController) {

  /**
   * Define Embedly controller
   * @class EmbedlyController
   * @extends PluginController
   * @extends WidgetContentController
   * @constructor
   */
  var EmbedlyController = function EmbedlyController() {
  };

  return EmbedlyController.extend('EmbedlyController', {

    /**
     * Set embedded content
     * @memberOf EmbedlyController
     */
    setEmbeddedContent: function setEmbeddedContent() {
      this.view.elements.$embedly.renderEmbeddedContent(
          this.model.getPrefs('embedlyUrl')
      );
    },

    /**
     * Add Embedly rule
     * @memberOf EmbedlyController
     * @param {Event} e
     */
    addEmbedlyRule: function addEmbedlyRule(e) {
      this.addWidgetRule(e, this.scope.name);
    }

  }, PluginBase.prototype, WidgetContentController.prototype);
});
