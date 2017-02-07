/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
  'plugins/plugin.controller',
  'plugins/widgets/widget.content.controller'
], function defineSlideShareController(PluginBase, WidgetContentController) {

  /**
   * Define SlideShare controller
   * @class SlideShareController
   * @extends PluginController
   * @extends WidgetContentController
   * @constructor
   */
  var SlideShareController = function SlideShareController() {
  };

  return SlideShareController.extend('SlideShareController', {

    /**
     * Set embedded content
     * @memberOf SlideShareController
     */
    setEmbeddedContent: function setEmbeddedContent() {

      this.view.elements.$slideshare.renderEmbeddedContent(
          this.model.getPrefs('slideshareEmbed')
      );
    },

    /**
     * Add SlideShare rule
     * @memberOf SlideShareController
     * @param {Event} e
     */
    addSlideShareRule: function addSlideShareRule(e) {

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
