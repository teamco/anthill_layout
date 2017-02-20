/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
  'plugins/plugin.controller',
  'plugins/widgets/widget.content.controller'
], function defineCacooController(PluginBase, WidgetContentController) {

  /**
   * Define Cacoo controller
   * @class CacooController
   * @extends PluginController
   * @extends WidgetContentController
   * @constructor
   */
  var CacooController = function CacooController() {
  };

  return CacooController.extend('CacooController', {

    /**
     * Set embedded content
     * @memberOf CacooController
     */
    setEmbeddedContent: function setEmbeddedContent() {
      this.view.get$item().renderEmbeddedContent(
          this.model.getPrefs('cacooEmbedCode')
      );
    },

    /**
     * Add Cacoo rule
     * @memberOf CacooController
     * @param {Event} e
     */
    addCacooRule: function addCacooRule(e) {
      this.addWidgetRule(e, this.scope.name);
    }

  }, PluginBase.prototype, WidgetContentController.prototype);
});
