/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
  'plugins/plugin.controller',
  'plugins/widgets/widget.content.controller'
], function defineRenTvController(PluginBase, WidgetContentController) {

  /**
   * Define RenTv controller
   * @class RenTvController
   * @extends PluginController
   * @extends WidgetContentController
   * @constructor
   */
  var RenTvController = function RenTvController() {
  };

  return RenTvController.extend('RenTvController', {

    /**
     * Set embedded content
     * @memberOf RenTvController
     */
    setEmbeddedContent: function setEmbeddedContent() {
      this.view.get$item().renderEmbeddedContent(
          this.model.getPrefs('rentvEmbedCode')
      );
    },

    /**
     * Add RenTv rule
     * @memberOf RenTvController
     * @param {Event} e
     */
    addRenTvRule: function addRenTvRule(e) {
      this.addWidgetRule(e, this.scope.name);
    }

  }, PluginBase.prototype, WidgetContentController.prototype);
});
