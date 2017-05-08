/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
  'plugins/plugin.controller',
  'plugins/widgets/widget.content.controller'
], function defineMobypictureController(PluginBase, WidgetContentController) {

  /**
   * Define mobypicture controller
   * @class MobypictureController
   * @extends PluginController
   * @extends WidgetContentController
   * @constructor
   */
  var MobypictureController = function MobypictureController() {
  };

  return MobypictureController.extend('MobypictureController', {

    /**
     * Set embedded content
     * @memberOf MobypictureController
     */
    setEmbeddedContent: function setEmbeddedContent() {
      this.view.elements.$mobypicture.renderEmbeddedContent(
          this.model.getPrefs('mobypictureEmbedCode')
      );
    },

    /**
     * Add Mobypicture rule
     * @memberOf MobypictureController
     * @param {Event} e
     */
    addMobypictureRule: function addMobypictureRule(e) {
      this.addWidgetRule(e, this.scope.name);
    }

  }, PluginBase.prototype, WidgetContentController.prototype);
});
