/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
  'plugins/plugin.controller',
  'plugins/widgets/widget.content.controller'
], function defineIftttController(PluginBase, WidgetContentController) {

  /**
   * Define Ifttt controller
   * @class IftttController
   * @extends PluginController
   * @extends WidgetContentController
   * @constructor
   */
  var IftttController = function IftttController() {
  };

  return IftttController.extend('IftttController', {

    /**
     * Set embedded content
     * @memberOf IftttController
     */
    setEmbeddedContent: function setEmbeddedContent() {
      this.view.get$item().renderEmbeddedContent(
          this.model.getPrefs('iftttEmbedCode')
      );
    },

    /**
     * Add Ifttt rule
     * @memberOf IftttController
     * @param {Event} e
     */
    addIftttRule: function addIftttRule(e) {
      this.addWidgetRule(e, this.scope.name);
    }

  }, PluginBase.prototype, WidgetContentController.prototype);
});
