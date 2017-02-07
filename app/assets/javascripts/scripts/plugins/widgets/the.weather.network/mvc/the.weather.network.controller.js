/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
  'plugins/plugin.controller',
  'plugins/widgets/widget.content.controller'
], function defineTheWeatherNetworkController(PluginBase,
    WidgetContentController) {

  /**
   * Define TheWeatherNetwork controller
   * @class TheWeatherNetworkController
   * @extends PluginController
   * @extends WidgetContentController
   * @constructor
   */
  var TheWeatherNetworkController = function TheWeatherNetworkController() {
  };

  return TheWeatherNetworkController.extend('TheWeatherNetworkController', {

    /**
     * Set embedded content
     * @memberOf TheWeatherNetworkController
     */
    setEmbeddedContent: function setEmbeddedContent() {
      this.view.get$item().renderEmbeddedContent(
          this.model.getPrefs('theweathernetworHtmlCode')
      );
    },

    /**
     * Add TheWeatherNetwork rule
     * @memberOf TheWeatherNetworkController
     * @param {Event} e
     */
    addTheWeatherNetworkRule: function addTheWeatherNetworkRule(e) {
      this.addWidgetRule(e, this.scope.name);
    }

  }, PluginBase.prototype, WidgetContentController.prototype);
});
