/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
  'plugins/plugin.controller',
  'plugins/widgets/widget.content.controller'
], function defineShoudioController(PluginBase, WidgetContentController) {

  /**
   * Define Shoudio controller
   * @class ShoudioController
   * @extends PluginController
   * @extends WidgetContentController
   * @constructor
   */
  var ShoudioController = function ShoudioController() {
  };

  return ShoudioController.extend('ShoudioController', {

    /**
     * Set embedded content
     * @memberOf ShoudioController
     */
    setEmbeddedContent: function setEmbeddedContent() {
      this.view.get$item().renderEmbeddedContent(
          this.model.getPrefs('shoudioEmbedCode')
      );
    },

    /**
     * Add Shoudio rule
     * @memberOf ShoudioController
     * @param {Event} e
     */
    addShoudioRule: function addShoudioRule(e) {
      this.addWidgetRule(e, this.scope.name);
    }

  }, PluginBase.prototype, WidgetContentController.prototype);
});
