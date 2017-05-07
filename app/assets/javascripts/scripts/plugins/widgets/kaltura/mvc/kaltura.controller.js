/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
  'plugins/plugin.controller',
  'plugins/widgets/widget.content.controller'
], function defineKalturaController(PluginBase, WidgetContentController) {

  /**
   * Define Kaltura controller
   * @class KalturaController
   * @extends PluginController
   * @extends WidgetContentController
   * @constructor
   */
  var KalturaController = function KalturaController() {
  };

  return KalturaController.extend('KalturaController', {

    /**
     * Set embedded content
     * @memberOf KalturaController
     */
    setEmbeddedContent: function setEmbeddedContent() {
      this.view.get$item().renderEmbeddedContent(
          this.model.getPrefs('kalturaEmbedCode')
      );
    },

    /**
     * Add Kaltura rule
     * @memberOf KalturaController
     * @param {Event} e
     */
    addKalturaRule: function addKalturaRule(e) {
      this.addWidgetRule(e, this.scope.name);
    }

  }, PluginBase.prototype, WidgetContentController.prototype);
});
