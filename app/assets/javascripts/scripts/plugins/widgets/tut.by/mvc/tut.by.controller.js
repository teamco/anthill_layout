/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
  'plugins/plugin.controller',
  'plugins/widgets/widget.content.controller'
], function defineTutByController(PluginBase, WidgetContentController) {

  /**
   * Define TutBy controller
   * @class TutByController
   * @extends PluginController
   * @extends WidgetContentController
   * @constructor
   */
  var TutByController = function TutByController() {
  };

  return TutByController.extend('TutByController', {

    /**
     * Set embedded content
     * @memberOf TutByController
     */
    setEmbeddedContent: function setEmbeddedContent() {
      this.view.get$item().renderEmbeddedContent(
          this.model.getPrefs('tutbyEmbedCode')
      );
    },

    /**
     * Add TutBy rule
     * @memberOf TutByController
     * @param {Event} e
     */
    addTutByRule: function addTutByRule(e) {
      this.addWidgetRule(e, this.scope.name);
    }

  }, PluginBase.prototype, WidgetContentController.prototype);
});
