/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
  'plugins/plugin.controller',
  'plugins/widgets/widget.content.controller'
], function defineTwitrPixController(PluginBase, WidgetContentController) {

  /**
   * Define twitrpix controller
   * @class TwitrPixController
   * @extends PluginController
   * @extends WidgetContentController
   * @constructor
   */
  var TwitrPixController = function TwitrPixController() {
  };

  return TwitrPixController.extend('TwitrPixController', {

    /**
     * Set embedded content
     * @memberOf TwitrPixController
     */
    setEmbeddedContent: function setEmbeddedContent() {
      this.view.elements.$twitrpix.renderEmbeddedContent(
          this.model.getPrefs('twitrpixEmbedCode')
      );
    },

    /**
     * Add TwitrPix rule
     * @memberOf TwitrPixController
     * @param {Event} e
     */
    addTwitrPixRule: function addTwitrPixRule(e) {
      this.addWidgetRule(e, this.scope.name);
    }

  }, PluginBase.prototype, WidgetContentController.prototype);
});
