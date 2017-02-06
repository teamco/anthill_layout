/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
  'plugins/plugin.controller',
  'plugins/widgets/widget.content.controller'
], function defineCircuitLabController(PluginBase, WidgetContentController) {

  /**
   * Define CircuitLab controller
   * @class CircuitLabController
   * @extends PluginController
   * @extends WidgetContentController
   * @constructor
   */
  var CircuitLabController = function CircuitLabController() {
  };

  return CircuitLabController.extend('CircuitLabController', {

    /**
     * Set embedded content
     * @memberOf CircuitLabController
     */
    setEmbeddedContent: function setEmbeddedContent() {
      this.view.get$item().renderEmbeddedContent(
          this.model.getPrefs('circuitlabHtmlCode')
      );
    },

    /**
     * Add CircuitLab rule
     * @memberOf CircuitLabController
     * @param {Event} e
     */
    addCircuitLabRule: function addCircuitLabRule(e) {
      this.addWidgetRule(e, this.scope.name);
    }

  }, PluginBase.prototype, WidgetContentController.prototype);
});
