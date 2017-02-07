/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
  'plugins/plugin.controller',
  'plugins/widgets/widget.content.controller'
], function defineFreshTvController(PluginBase, WidgetContentController) {

  /**
   * Define freshtv controller
   * @class FreshTvController
   * @extends PluginController
   * @extends WidgetContentController
   * @constructor
   */
  var FreshTvController = function FreshTvController() {
  };

  return FreshTvController.extend('FreshTvController', {

    /**
     * Set embedded content
     * @memberOf FreshTvController
     */
    setEmbeddedContent: function setEmbeddedContent() {
      this.view.elements.$freshtv.renderEmbeddedContent(
          this.model.getPrefs('freshtvEmbedCode')
      );
    },

    /**
     * Add FreshTv rule
     * @memberOf FreshTvController
     * @param {Event} e
     */
    addFreshTvRule: function addFreshTvRule(e) {
      this.addWidgetRule(e, this.scope.name);
    }

  }, PluginBase.prototype, WidgetContentController.prototype);
});
