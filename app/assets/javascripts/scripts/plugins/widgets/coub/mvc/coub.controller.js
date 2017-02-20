/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
  'plugins/plugin.controller',
  'plugins/widgets/widget.content.controller'
], function defineCoubController(PluginBase, WidgetContentController) {

  /**
   * Define Coub controller
   * @class CoubController
   * @extends PluginController
   * @extends WidgetContentController
   * @constructor
   */
  var CoubController = function CoubController() {
  };

  return CoubController.extend('CoubController', {

    /**
     * Set embedded content
     * @memberOf CoubController
     */
    setEmbeddedContent: function setEmbeddedContent() {

      this.view.elements.$coub.renderEmbeddedContent({
        link: this.model.getPrefs('coubLink'),
        start: this.model.getPrefs('coubAutoStart'),
        mute: this.model.getPrefs('coubMute'),
        hide: this.model.getPrefs('coubHideTopBar'),
        hd: this.model.getPrefs('coubStartWithHighDefinition')
      });
    },

    /**
     * Add Coub rule
     * @memberOf CoubController
     * @param {Event} e
     */
    addCoubRule: function addCoubRule(e) {
      this.addWidgetRule(e, this.scope.name);
    }

  }, PluginBase.prototype, WidgetContentController.prototype);
});
