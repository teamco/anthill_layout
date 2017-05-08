/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
  'plugins/plugin.controller',
  'plugins/widgets/widget.content.controller'
], function defineOvvaTvController(PluginBase, WidgetContentController) {

  /**
   * Define OvvaTv controller
   * @class OvvaTvController
   * @extends PluginController
   * @extends WidgetContentController
   * @constructor
   */
  var OvvaTvController = function OvvaTvController() {
  };

  return OvvaTvController.extend('OvvaTvController', {

    /**
     * Set embedded content
     * @memberOf OvvaTvController
     */
    setEmbeddedContent: function setEmbeddedContent() {
      this.view.get$item().renderEmbeddedContent(
          this.model.getPrefs('ovvatvEmbedCode')
      );
    },

    /**
     * Add OvvaTv rule
     * @memberOf OvvaTvController
     * @param {Event} e
     */
    addOvvaTvRule: function addOvvaTvRule(e) {
      this.addWidgetRule(e, this.scope.name);
    }

  }, PluginBase.prototype, WidgetContentController.prototype);
});
