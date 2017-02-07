/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
  'plugins/plugin.controller',
  'plugins/widgets/widget.content.controller'
], function defineOfficeMixController(PluginBase, WidgetContentController) {

  /**
   * Define OfficeMix controller
   * @class OfficeMixController
   * @extends PluginController
   * @extends WidgetContentController
   * @constructor
   */
  var OfficeMixController = function OfficeMixController() {
  };

  return OfficeMixController.extend('OfficeMixController', {

    /**
     * Set embedded content
     * @memberOf OfficeMixController
     */
    setEmbeddedContent: function setEmbeddedContent() {
      this.view.get$item().renderEmbeddedContent(
          this.model.getPrefs('officemixEmbedCode')
      );
    },

    /**
     * Add OfficeMix rule
     * @memberOf OfficeMixController
     * @param {Event} e
     */
    addOfficeMixRule: function addOfficeMixRule(e) {
      this.addWidgetRule(e, this.scope.name);
    }

  }, PluginBase.prototype, WidgetContentController.prototype);
});
