/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
  'plugins/plugin.controller',
  'plugins/widgets/widget.content.controller'
], function defineDipityController(PluginBase, WidgetContentController) {

  /**
   * Define Dipity controller
   * @class DipityController
   * @extends PluginController
   * @extends WidgetContentController
   * @constructor
   */
  var DipityController = function DipityController() {
  };

  return DipityController.extend('DipityController', {

    /**
     * Set embedded content
     * @memberOf DipityController
     */
    setEmbeddedContent: function setEmbeddedContent() {
      this.view.get$item().renderEmbeddedContent(
          this.model.getPrefs('dipityEmbedCode')
      );
    },

    /**
     * Add Dipity rule
     * @memberOf DipityController
     * @param {Event} e
     */
    addDipityRule: function addDipityRule(e) {
      this.addWidgetRule(e, this.scope.name);
    }

  }, PluginBase.prototype, WidgetContentController.prototype);
});
