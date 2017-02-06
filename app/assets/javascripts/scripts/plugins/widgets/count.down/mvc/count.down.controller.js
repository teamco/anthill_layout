/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
  'plugins/plugin.controller',
  'plugins/widgets/widget.content.controller'
], function defineCountDownController(PluginBase, WidgetContentController) {

  /**
   * Define CountDown controller
   * @class CountDownController
   * @extends PluginController
   * @extends WidgetContentController
   * @constructor
   */
  var CountDownController = function CountDownController() {
  };

  return CountDownController.extend('CountDownController', {

    /**
     * Set embedded content
     * @memberOf CountDownController
     */
    setEmbeddedContent: function setEmbeddedContent() {
      this.view.get$item().renderEmbeddedContent();
    },

    /**
     * Add CountDown rule
     * @memberOf CountDownController
     * @param {Event} e
     */
    addCountDownRule: function addCountDownRule(e) {
      this.addWidgetRule(e, this.scope.name);
    }

  }, PluginBase.prototype, WidgetContentController.prototype);
});
