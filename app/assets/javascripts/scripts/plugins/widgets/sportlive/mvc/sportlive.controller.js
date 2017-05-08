/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
  'plugins/plugin.controller',
  'plugins/widgets/widget.content.controller'
], function defineSportliveController(PluginBase, WidgetContentController) {

  /**
   * Define Sportlive controller
   * @class SportliveController
   * @extends PluginController
   * @extends WidgetContentController
   * @constructor
   */
  var SportliveController = function SportliveController() {
  };

  return SportliveController.extend('SportliveController', {

    /**
     * Set embedded content
     * @memberOf SportliveController
     */
    setEmbeddedContent: function setEmbeddedContent() {
      this.view.get$item().renderEmbeddedContent(
          this.model.getPrefs('sportliveEmbedCode')
      );
    },

    /**
     * Add Sportlive rule
     * @memberOf SportliveController
     * @param {Event} e
     */
    addSportliveRule: function addSportliveRule(e) {
      this.addWidgetRule(e, this.scope.name);
    }

  }, PluginBase.prototype, WidgetContentController.prototype);
});
