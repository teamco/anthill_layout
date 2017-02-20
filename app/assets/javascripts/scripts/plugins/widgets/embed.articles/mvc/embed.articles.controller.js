/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
  'plugins/plugin.controller',
  'plugins/widgets/widget.content.controller'
], function defineEmbedArticlesController(PluginBase, WidgetContentController) {

  /**
   * Define EmbedArticles controller
   * @class EmbedArticlesController
   * @extends PluginController
   * @extends WidgetContentController
   * @constructor
   */
  var EmbedArticlesController = function EmbedArticlesController() {
  };

  return EmbedArticlesController.extend('EmbedArticlesController', {

    /**
     * Set embedded content
     * @memberOf EmbedArticlesController
     */
    setEmbeddedContent: function setEmbeddedContent() {
      this.view.get$item().renderEmbeddedContent(
          this.model.getPrefs('embedarticlesEmbedCode')
      );
    },

    /**
     * Add EmbedArticles rule
     * @memberOf EmbedArticlesController
     * @param {Event} e
     */
    addEmbedArticlesRule: function addEmbedArticlesRule(e) {
      this.addWidgetRule(e, this.scope.name);
    }

  }, PluginBase.prototype, WidgetContentController.prototype);
});
