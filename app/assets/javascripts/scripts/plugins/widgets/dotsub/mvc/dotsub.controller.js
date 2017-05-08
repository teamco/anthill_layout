/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
  'plugins/plugin.controller',
  'plugins/widgets/widget.content.controller'
], function defineDotsubController(PluginBase, WidgetContentController) {

  /**
   * Define Dotsub controller
   * @class DotsubController
   * @extends PluginController
   * @extends WidgetContentController
   * @constructor
   */
  var DotsubController = function DotsubController() {
  };

  return DotsubController.extend('DotsubController', {

    /**
     * Set embedded content
     * @memberOf DotsubController
     */
    setEmbeddedContent: function setEmbeddedContent() {
      this.view.get$item().renderEmbeddedContent(
          this.model.getPrefs('dotsubEmbedCode')
      );
    },

    /**
     * Add Dotsub rule
     * @memberOf DotsubController
     * @param {Event} e
     */
    addDotsubRule: function addDotsubRule(e) {
      this.addWidgetRule(e, this.scope.name);
    }

  }, PluginBase.prototype, WidgetContentController.prototype);
});
