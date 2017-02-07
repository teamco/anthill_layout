/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
  'plugins/plugin.controller',
  'plugins/widgets/widget.content.controller'
], function defineIframelyController(PluginBase, WidgetContentController) {

  /**
   * Define Iframely controller
   * @class IframelyController
   * @extends PluginController
   * @extends WidgetContentController
   * @constructor
   */
  var IframelyController = function IframelyController() {
  };

  return IframelyController.extend('IframelyController', {

    /**
     * Set embedded content
     * @memberOf IframelyController
     */
    setEmbeddedContent: function setEmbeddedContent() {
      this.view.get$item().renderEmbeddedContent(
          this.model.getPrefs('iframelyApiKey'),
          this.model.getPrefs('iframelyUrl')
      );
    },

    /**
     * Add Iframely rule
     * @memberOf IframelyController
     * @param {Event} e
     */
    addIframelyRule: function addIframelyRule(e) {
      this.addWidgetRule(e, this.scope.name);
    }

  }, PluginBase.prototype, WidgetContentController.prototype);
});
