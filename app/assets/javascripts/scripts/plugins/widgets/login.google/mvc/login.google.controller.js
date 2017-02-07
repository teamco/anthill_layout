/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
  'plugins/plugin.controller',
  'plugins/widgets/widget.content.controller'
], function defineLoginGoogleController(PluginBase, WidgetContentController) {

  /**
   * Define login.google controller
   * @class LoginGoogleController
   * @extends PluginController
   * @extends WidgetContentController
   * @constructor
   */
  var LoginGoogleController = function LoginGoogleController() {
  };

  return LoginGoogleController.extend('LoginGoogleController', {

    /**
     * Set embedded content
     * @memberOf LoginGoogleController
     */
    setEmbeddedContent: function setEmbeddedContent() {

      this.view.elements.$logingoogle.renderEmbeddedContent();
    },

    /**
     * Add LoginGoogle rule
     * @memberOf LoginGoogleController
     * @param {Event} e
     */
    addLoginGoogleRule: function addLoginGoogleRule(e) {

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