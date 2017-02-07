/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
  'plugins/plugin.controller',
  'plugins/widgets/widget.content.controller'
], function defineReleasewireController(PluginBase, WidgetContentController) {

  /**
   * Define Releasewire controller
   * @class ReleasewireController
   * @extends PluginController
   * @extends WidgetContentController
   * @constructor
   */
  var ReleasewireController = function ReleasewireController() {
  };

  return ReleasewireController.extend('ReleasewireController', {

    /**
     * Set embedded content
     * @memberOf ReleasewireController
     */
    setEmbeddedContent: function setEmbeddedContent() {
      this.view.get$item().renderEmbeddedContent(
          this.model.getPrefs('releasewireEmbedCode')
      );
    },

    /**
     * Add Releasewire rule
     * @memberOf ReleasewireController
     * @param {Event} e
     */
    addReleasewireRule: function addReleasewireRule(e) {
      this.addWidgetRule(e, this.scope.name);
    }

  }, PluginBase.prototype, WidgetContentController.prototype);
});
