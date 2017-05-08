/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
  'plugins/plugin.controller',
  'plugins/widgets/widget.content.controller'
], function defineLetsPlayController(PluginBase, WidgetContentController) {

  /**
   * Define LetsPlay controller
   * @class LetsPlayController
   * @extends PluginController
   * @extends WidgetContentController
   * @constructor
   */
  var LetsPlayController = function LetsPlayController() {
  };

  return LetsPlayController.extend('LetsPlayController', {

    /**
     * Set embedded content
     * @memberOf LetsPlayController
     */
    setEmbeddedContent: function setEmbeddedContent() {
      this.view.get$item().renderEmbeddedContent();
    },

    /**
     * Add LetsPlay rule
     * @memberOf LetsPlayController
     * @param {Event} e
     */
    addLetsPlayRule: function addLetsPlayRule(e) {
      this.addWidgetRule(e, this.scope.name);
    }

  }, PluginBase.prototype, WidgetContentController.prototype);
});
