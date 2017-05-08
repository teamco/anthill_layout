/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
  'plugins/plugin.controller',
  'plugins/widgets/widget.content.controller'
], function defineTinymceController(PluginBase, WidgetContentController) {

  /**
   * Define Tinymce controller
   * @class TinymceController
   * @extends PluginController
   * @extends WidgetContentController
   * @constructor
   */
  var TinymceController = function TinymceController() {
  };

  return TinymceController.extend('TinymceController', {

    /**
     * Set embedded content
     * @memberOf TinymceController
     */
    setEmbeddedContent: function setEmbeddedContent() {
      this.view.get$item().renderEmbeddedContent(
          this.model.getPrefs('tinymceContent')
      );
    },

    /**
     * Add Tinymce rule
     * @memberOf TinymceController
     * @param {Event} e
     */
    addTinymceRule: function addTinymceRule(e) {
      this.addWidgetRule(e, this.scope.name);
    }

  }, PluginBase.prototype, WidgetContentController.prototype);
});
