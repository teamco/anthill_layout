/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
  'plugins/plugin.controller',
  'plugins/widgets/widget.content.controller'
], function defineShowTheWayController(PluginBase, WidgetContentController) {

  /**
   * Define ShowTheWay controller
   * @class ShowTheWayController
   * @extends PluginController
   * @extends WidgetContentController
   * @constructor
   */
  var ShowTheWayController = function ShowTheWayController() {
  };

  return ShowTheWayController.extend('ShowTheWayController', {

    /**
     * Set embedded content
     * @memberOf ShowTheWayController
     */
    setEmbeddedContent: function setEmbeddedContent() {
      this.view.get$item().renderEmbeddedContent(
          this.model.getPrefs('showthewayEmbedCode')
      );
    },

    /**
     * Add ShowTheWay rule
     * @memberOf ShowTheWayController
     * @param {Event} e
     */
    addShowTheWayRule: function addShowTheWayRule(e) {
      this.addWidgetRule(e, this.scope.name);
    }

  }, PluginBase.prototype, WidgetContentController.prototype);
});
