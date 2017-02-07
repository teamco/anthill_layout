/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
  'plugins/plugin.controller',
  'plugins/widgets/widget.content.controller'
], function defineLearningAppsController(PluginBase, WidgetContentController) {

  /**
   * Define LearningApps controller
   * @class LearningAppsController
   * @extends PluginController
   * @extends WidgetContentController
   * @constructor
   */
  var LearningAppsController = function LearningAppsController() {
  };

  return LearningAppsController.extend('LearningAppsController', {

    /**
     * Set embedded content
     * @memberOf LearningAppsController
     */
    setEmbeddedContent: function setEmbeddedContent() {
      this.view.get$item().renderEmbeddedContent(
          this.model.getPrefs('learningappsEmbedCode')
      );
    },

    /**
     * Add LearningApps rule
     * @memberOf LearningAppsController
     * @param {Event} e
     */
    addLearningAppsRule: function addLearningAppsRule(e) {
      this.addWidgetRule(e, this.scope.name);
    }

  }, PluginBase.prototype, WidgetContentController.prototype);
});
