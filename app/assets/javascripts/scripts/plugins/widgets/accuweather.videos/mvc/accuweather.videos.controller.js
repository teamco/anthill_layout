/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
  'plugins/plugin.controller',
  'plugins/widgets/widget.content.controller'
], function defineAccuweatherVideosController(PluginBase,
    WidgetContentController) {

  /**
   * Define AccuweatherVideos controller
   * @class AccuweatherVideosController
   * @extends PluginController
   * @extends WidgetContentController
   * @constructor
   */
  var AccuweatherVideosController = function AccuweatherVideosController() {
  };

  return AccuweatherVideosController.extend('AccuweatherVideosController', {

    /**
     * Set embedded content
     * @memberOf AccuweatherVideosController
     */
    setEmbeddedContent: function setEmbeddedContent() {
      this.view.get$item().renderEmbeddedContent(
          this.model.getPrefs('accuweathervideosEmbedCode')
      );
    },

    /**
     * Add AccuweatherVideos rule
     * @memberOf AccuweatherVideosController
     * @param {Event} e
     */
    addAccuweatherVideosRule: function addAccuweatherVideosRule(e) {
      this.addWidgetRule(e, this.scope.name);
    }

  }, PluginBase.prototype, WidgetContentController.prototype);
});
