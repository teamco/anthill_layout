/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
  'plugins/plugin.controller',
  'plugins/widgets/widget.content.controller'
], function defineBingMapsController(PluginBase, WidgetContentController) {

  /**
   * Define BingMaps controller
   * @class BingMapsController
   * @extends PluginController
   * @extends WidgetContentController
   * @constructor
   */
  var BingMapsController = function BingMapsController() {
  };

  return BingMapsController.extend('BingMapsController', {

    /**
     * Set embedded content
     * @memberOf BingMapsController
     */
    setEmbeddedContent: function setEmbeddedContent() {
      this.view.get$item().renderEmbeddedContent(
          this.model.getPrefs('bingmapsKey'),
          this.model.getPrefs('bingmapsLatitudeLongitude'),
          this.model.getPrefs('bingmapsZoom'),
          this.model.getPrefs('bingmapsMapType')
      );
    },

    /**
     * Add BingMaps rule
     * @memberOf BingMapsController
     * @param {Event} e
     */
    addBingMapsRule: function addBingMapsRule(e) {
      this.addWidgetRule(e, this.scope.name);
    }

  }, PluginBase.prototype, WidgetContentController.prototype);
});
