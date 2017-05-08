/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
  'plugins/plugin.controller',
  'plugins/widgets/widget.content.controller'
], function defineQrCodeController(PluginBase, WidgetContentController) {

  /**
   * Define QrCode controller
   * @class QrCodeController
   * @extends PluginController
   * @extends WidgetContentController
   * @constructor
   */
  var QrCodeController = function QrCodeController() {
  };

  return QrCodeController.extend('QrCodeController', {

    /**
     * Set embedded content
     * @memberOf QrCodeController
     */
    setEmbeddedContent: function setEmbeddedContent() {

      this.view.elements.$qrcode.renderEmbeddedContent(
          this.model.getPrefs('qrcodeText'),
          this.model.getPrefs('qrcodeSize')
      );
    },

    /**
     * Add QrCode rule
     * @memberOf QrCodeController
     * @param {Event} e
     */
    addQrCodeRule: function addQrCodeRule(e) {

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
