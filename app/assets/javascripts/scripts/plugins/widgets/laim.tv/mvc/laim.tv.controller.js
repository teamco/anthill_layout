/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
  'plugins/plugin.controller',
  'plugins/widgets/widget.content.controller'
], function defineLaimTvController(PluginBase, WidgetContentController) {

  /**
   * Define LaimTv controller
   * @class LaimTvController
   * @extends PluginController
   * @extends WidgetContentController
   * @constructor
   */
  var LaimTvController = function LaimTvController() {
  };

  return LaimTvController.extend('LaimTvController', {

    /**
     * Set embedded content
     * @memberOf LaimTvController
     */
    setEmbeddedContent: function setEmbeddedContent() {
      this.view.get$item().renderEmbeddedContent(
          this.model.getPrefs('laimtvEmbedCode')
      );
    },

    /**
     * Add LaimTv rule
     * @memberOf LaimTvController
     * @param {Event} e
     */
    addLaimTvRule: function addLaimTvRule(e) {
      this.addWidgetRule(e, this.scope.name);
    }

  }, PluginBase.prototype, WidgetContentController.prototype);
});
