/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
  'plugins/plugin.controller',
  'plugins/widgets/widget.content.controller'
], function defineFirePicController(PluginBase, WidgetContentController) {

  /**
   * Define firepic controller
   * @class FirePicController
   * @extends PluginController
   * @extends WidgetContentController
   * @constructor
   */
  var FirePicController = function FirePicController() {
  };

  return FirePicController.extend('FirePicController', {

    /**
     * Set embedded content
     * @memberOf FirePicController
     */
    setEmbeddedContent: function setEmbeddedContent() {
      this.view.elements.$firepic.renderEmbeddedContent(
          this.model.getPrefs('firepicUrl')
      );
    },

    /**
     * Add FirePic rule
     * @memberOf FirePicController
     * @param {Event} e
     */
    addFirePicRule: function addFirePicRule(e) {
      this.addWidgetRule(e, this.scope.name);
    }

  }, PluginBase.prototype, WidgetContentController.prototype);
});
