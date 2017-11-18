/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:03 AM
 */

defineP([
  'plugins/plugin.controller',
  'plugins/widgets/widget.content.controller'
], function defineExternalWidgetController(PluginBase,
    WidgetContentController) {

  /**
   * Define image controller
   * @class ExternalWidgetController
   * @extends PluginController
   * @extends WidgetContentController
   * @constructor
   */
  var ExternalWidgetController = function ExternalWidgetController() {
  };

  return ExternalWidgetController.extend('ExternalWidgetController', {

    /**
     * Set embedded content
     * @memberOf ExternalWidgetController
     */
    setEmbeddedContent: function setEmbeddedContent() {

      this.view.elements.$externalwidget.renderEmbeddedContent();
    },

    /**
     * Add ExternalWidget rule
     * @memberOf ExternalWidgetController
     * @param {Event} e
     */
    addExternalRule: function addExternalRule(e) {

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