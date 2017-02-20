/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
  'plugins/plugin.controller',
  'plugins/widgets/widget.content.controller'
], function definePostTemplateController(PluginBase, WidgetContentController) {

  /**
   * Define post.template controller
   * @class PostTemplateController
   * @extends PluginController
   * @extends WidgetContentController
   * @constructor
   */
  var PostTemplateController = function PostTemplateController() {
  };

  return PostTemplateController.extend('PostTemplateController', {

    /**
     * Set embedded content
     * @memberOf PostTemplateController
     */
    setEmbeddedContent: function setEmbeddedContent() {
      this.view.get$item().renderEmbeddedContent();
    },

    /**
     * Add PostTemplate rule
     * @memberOf PostTemplateController
     * @param {Event} e
     */
    addPostTemplateRule: function addPostTemplateRule(e) {

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