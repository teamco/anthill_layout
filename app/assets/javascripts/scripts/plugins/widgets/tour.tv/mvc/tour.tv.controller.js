/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
  'plugins/plugin.controller',
  'plugins/widgets/widget.content.controller'
], function defineTourTvController(PluginBase, WidgetContentController) {

  /**
   * Define tourtv controller
   * @class TourTvController
   * @extends PluginController
   * @extends WidgetContentController
   * @constructor
   */
  var TourTvController = function TourTvController() {
  };

  return TourTvController.extend('TourTvController', {

    /**
     * Set embedded content
     * @memberOf TourTvController
     */
    setEmbeddedContent: function setEmbeddedContent() {
      this.view.elements.$tourtv.renderEmbeddedContent(
          this.model.getPrefs('tourtvEmbedCode')
      );
    },

    /**
     * Add TourTv rule
     * @memberOf TourTvController
     * @param {Event} e
     */
    addTourTvRule: function addTourTvRule(e) {
      this.addWidgetRule(e, this.scope.name);
    }

  }, PluginBase.prototype, WidgetContentController.prototype);
});
