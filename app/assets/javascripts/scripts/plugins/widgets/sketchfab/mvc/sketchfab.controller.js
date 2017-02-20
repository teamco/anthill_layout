/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
  'plugins/plugin.controller',
  'plugins/widgets/widget.content.controller'
], function defineSketchfabController(PluginBase, WidgetContentController) {

  /**
   * Define Sketchfab controller
   * @class SketchfabController
   * @extends PluginController
   * @extends WidgetContentController
   * @constructor
   */
  var SketchfabController = function SketchfabController() {
  };

  return SketchfabController.extend('SketchfabController', {

    /**
     * Set embedded content
     * @memberOf SketchfabController
     */
    setEmbeddedContent: function setEmbeddedContent() {
      this.view.get$item().renderEmbeddedContent(
          this.model.getPrefs('sketchfabEmbedCode')
      );
    },

    /**
     * Add Sketchfab rule
     * @memberOf SketchfabController
     * @param {Event} e
     */
    addSketchfabRule: function addSketchfabRule(e) {
      this.addWidgetRule(e, this.scope.name);
    }

  }, PluginBase.prototype, WidgetContentController.prototype);
});
