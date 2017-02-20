/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
  'plugins/plugin.controller',
  'plugins/widgets/widget.content.controller'
], function defineClypItController(PluginBase, WidgetContentController) {

  /**
   * Define ClypIt controller
   * @class ClypItController
   * @extends PluginController
   * @extends WidgetContentController
   * @constructor
   */
  var ClypItController = function ClypItController() {
  };

  return ClypItController.extend('ClypItController', {

    /**
     * Set embedded content
     * @memberOf ClypItController
     */
    setEmbeddedContent: function setEmbeddedContent() {
      this.view.get$item().renderEmbeddedContent(
          this.model.getPrefs('clypitEmbedCode')
      );
    },

    /**
     * Add ClypIt rule
     * @memberOf ClypItController
     * @param {Event} e
     */
    addClypItRule: function addClypItRule(e) {
      this.addWidgetRule(e, this.scope.name);
    }

  }, PluginBase.prototype, WidgetContentController.prototype);
});
