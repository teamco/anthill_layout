/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
  'plugins/plugin.controller',
  'plugins/widgets/widget.content.controller'
], function defineAnimatronController(PluginBase, WidgetContentController) {

  /**
   * Define Animatron controller
   * @class AnimatronController
   * @extends PluginController
   * @extends WidgetContentController
   * @constructor
   */
  var AnimatronController = function AnimatronController() {
  };

  return AnimatronController.extend('AnimatronController', {

    /**
     * Set embedded content
     * @memberOf AnimatronController
     */
    setEmbeddedContent: function setEmbeddedContent() {
      this.view.get$item().renderEmbeddedContent(
          this.model.getPrefs('animatronEmbedCode')
      );
    },

    /**
     * Add Animatron rule
     * @memberOf AnimatronController
     * @param {Event} e
     */
    addAnimatronRule: function addAnimatronRule(e) {
      this.addWidgetRule(e, this.scope.name);
    }

  }, PluginBase.prototype, WidgetContentController.prototype);
});
