/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
  'plugins/plugin.controller',
  'plugins/widgets/widget.content.controller'
], function defineSkypeController(PluginBase, WidgetContentController) {

  /**
   * Define Skype controller
   * @class SkypeController
   * @extends PluginController
   * @extends WidgetContentController
   * @constructor
   */
  var SkypeController = function SkypeController() {
  };

  return SkypeController.extend('SkypeController', {

    /**
     * Set embedded content
     * @memberOf SkypeController
     */
    setEmbeddedContent: function setEmbeddedContent() {
      this.view.get$item().renderEmbeddedContent(
          this.model.getPrefs('skypeBootstrap'),
          this.model.getPrefs('skypeApiKey'),
          this.model.getPrefs('skypeUiKey')
      );
    },

    /**
     * Add Skype rule
     * @memberOf SkypeController
     * @param {Event} e
     */
    addSkypeRule: function addSkypeRule(e) {
      this.addWidgetRule(e, this.scope.name);
    }

  }, PluginBase.prototype, WidgetContentController.prototype);
});
