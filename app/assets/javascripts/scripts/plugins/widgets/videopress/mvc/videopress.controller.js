/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
  'plugins/plugin.controller',
  'plugins/widgets/widget.content.controller'
], function defineVideopressController(PluginBase, WidgetContentController) {

  /**
   * Define Videopress controller
   * @class VideopressController
   * @extends PluginController
   * @extends WidgetContentController
   * @constructor
   */
  var VideopressController = function VideopressController() {
  };

  return VideopressController.extend('VideopressController', {

    /**
     * Set embedded content
     * @memberOf VideopressController
     */
    setEmbeddedContent: function setEmbeddedContent() {
      this.view.get$item().renderEmbeddedContent(
          this.model.getPrefs('videopressEmbedCode')
      );
    },

    /**
     * Add Videopress rule
     * @memberOf VideopressController
     * @param {Event} e
     */
    addVideopressRule: function addVideopressRule(e) {
      this.addWidgetRule(e, this.scope.name);
    }

  }, PluginBase.prototype, WidgetContentController.prototype);
});
