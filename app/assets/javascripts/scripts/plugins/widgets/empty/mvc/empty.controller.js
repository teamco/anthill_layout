/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
  'plugins/plugin.controller',
  'plugins/widgets/widget.content.controller'
], function defineEmptyController(PluginBase, WidgetContentController) {

  /**
   * Define Empty controller
   * @class EmptyController
   * @extends PluginController
   * @extends WidgetContentController
   * @constructor
   */
  var EmptyController = function EmptyController() {
  };

  return EmptyController.extend('EmptyController', {

    /**
     * Set embedded content
     * @memberOf EmptyController
     */
    setEmbeddedContent: function setEmbeddedContent() {
      this.view.get$item().renderEmbeddedContent();
    },

    /**
     * Add Empty rule
     * @memberOf EmptyController
     * @param {Event} e
     */
    addEmptyRule: function addEmptyRule(e) {
      this.addWidgetRule(e, this.scope.name);
    }

  }, PluginBase.prototype, WidgetContentController.prototype);
});