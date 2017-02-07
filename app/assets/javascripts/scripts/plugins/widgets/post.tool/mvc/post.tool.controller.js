/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
  'plugins/plugin.controller',
  'plugins/widgets/widget.content.controller'
], function definePostToolController(PluginBase, WidgetContentController) {

  /**
   * Define post.tool controller
   * @class PostToolController
   * @extends PluginController
   * @extends WidgetContentController
   * @constructor
   */
  var PostToolController = function PostToolController() {
  };

  return PostToolController.extend('PostToolController', {

    /**
     * Set embedded content
     * @memberOf PostToolController
     */
    setEmbeddedContent: function setEmbeddedContent() {

      this.view.elements.$posttool.renderEmbeddedContent();
    },

    /**
     * Add PostTool rule
     * @memberOf PostToolController
     * @param {Event} e
     */
    addPostToolRule: function addPostToolRule(e) {

      /**
       * Define $button
       * @type {*|jQuery|HTMLElement}
       */
      var $button = $(e.target),
          scope = this.scope;

      scope.observer.publish(
          scope.eventmanager.eventList.publishRule,
          [$button.attr('value'), this.scope.name]
      );
    }

  }, PluginBase.prototype, WidgetContentController.prototype);
});