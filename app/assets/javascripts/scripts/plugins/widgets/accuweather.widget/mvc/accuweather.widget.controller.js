/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
  'plugins/plugin.controller',
  'plugins/widgets/widget.content.controller'
], function defineAccuweatherWidgetController(PluginBase,
    WidgetContentController) {

  /**
   * Define AccuweatherWidget controller
   * @class AccuweatherWidgetController
   * @extends PluginController
   * @extends WidgetContentController
   * @constructor
   */
  var AccuweatherWidgetController = function AccuweatherWidgetController() {
  };

  return AccuweatherWidgetController.extend('AccuweatherWidgetController', {

    /**
     * Set embedded content
     * @memberOf AccuweatherWidgetController
     */
    setEmbeddedContent: function setEmbeddedContent() {
      this.view.get$item().renderEmbeddedContent(
          this.model.getPrefs('accuweatherwidgetHtmlCode')
      );
    },

    /**
     * Add AccuweatherWidget rule
     * @memberOf AccuweatherWidgetController
     * @param {Event} e
     */
    addAccuweatherWidgetRule: function addAccuweatherWidgetRule(e) {
      this.addWidgetRule(e, this.scope.name);
    }

  }, PluginBase.prototype, WidgetContentController.prototype);
});
