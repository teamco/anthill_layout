/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
  'plugins/plugin.controller',
  'plugins/widgets/widget.content.controller'
], function defineKitchenbowlController(PluginBase, WidgetContentController) {

  /**
   * Define Kitchenbowl controller
   * @class KitchenbowlController
   * @extends PluginController
   * @extends WidgetContentController
   * @constructor
   */
  var KitchenbowlController = function KitchenbowlController() {
  };

  return KitchenbowlController.extend('KitchenbowlController', {

    /**
     * Set embedded content
     * @memberOf KitchenbowlController
     */
    setEmbeddedContent: function setEmbeddedContent() {
      this.view.get$item().renderEmbeddedContent(
          this.model.getPrefs('kitchenbowlEmbedCode')
      );
    },

    /**
     * Add Kitchenbowl rule
     * @memberOf KitchenbowlController
     * @param {Event} e
     */
    addKitchenbowlRule: function addKitchenbowlRule(e) {
      this.addWidgetRule(e, this.scope.name);
    }

  }, PluginBase.prototype, WidgetContentController.prototype);
});
