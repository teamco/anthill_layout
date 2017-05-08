/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
  'plugins/plugin.controller',
  'plugins/widgets/widget.content.controller'
], function defineQuicktimeController(PluginBase, WidgetContentController) {

  /**
   * Define quicktime controller
   * @class QuicktimeController
   * @extends PluginController
   * @extends WidgetContentController
   * @constructor
   */
  var QuicktimeController = function QuicktimeController() {
  };

  return QuicktimeController.extend('QuicktimeController', {

    /**
     * Set embedded content
     * @memberOf QuicktimeController
     */
    setEmbeddedContent: function setEmbeddedContent() {

      this.view.elements.$quicktime.renderEmbeddedContent(
          this.model.getPrefs('quicktimeUrl')
      );
    },

    /**
     * Add Quicktime rule
     * @memberOf QuicktimeController
     * @param {Event} e
     */
    addQuicktimeRule: function addQuicktimeRule(e) {
      this.addWidgetRule(e, this.scope.name);
    }

  }, PluginBase.prototype, WidgetContentController.prototype);
});