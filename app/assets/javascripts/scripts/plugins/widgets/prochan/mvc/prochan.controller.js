/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
  'plugins/plugin.controller',
  'plugins/widgets/widget.content.controller'
], function defineProchanController(PluginBase, WidgetContentController) {

  /**
   * Define Prochan controller
   * @class ProchanController
   * @extends PluginController
   * @extends WidgetContentController
   * @constructor
   */
  var ProchanController = function ProchanController() {
  };

  return ProchanController.extend('ProchanController', {

    /**
     * Set embedded content
     * @memberOf ProchanController
     */
    setEmbeddedContent: function setEmbeddedContent() {
      this.view.get$item().renderEmbeddedContent(
          this.model.getPrefs('prochanEmbedCode')
      );
    },

    /**
     * Add Prochan rule
     * @memberOf ProchanController
     * @param {Event} e
     */
    addProchanRule: function addProchanRule(e) {
      this.addWidgetRule(e, this.scope.name);
    }

  }, PluginBase.prototype, WidgetContentController.prototype);
});
