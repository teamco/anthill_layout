/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
  'plugins/plugin.controller',
  'plugins/widgets/widget.content.controller'
], function defineIceFloeController(PluginBase, WidgetContentController) {

  /**
   * Define ice floe controller
   * @class IceFloeController
   * @extends PluginController
   * @extends WidgetContentController
   * @constructor
   */
  var IceFloeController = function IceFloeController() {
  };

  return IceFloeController.extend('IceFloeController', {

    /**
     * Set embedded content
     * @memberOf IceFloeController
     */
    setEmbeddedContent: function setEmbeddedContent() {

      this.view.elements.$icefloe.renderEmbeddedContent();
    },

    /**
     * Add IceFloe rule
     * @memberOf IceFloeController
     * @param {Event} e
     */
    addIceFloeRule: function addIceFloeRule(e) {

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