/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
  'plugins/plugin.controller',
  'plugins/widgets/widget.content.controller'
], function defineWikimapiaController(PluginBase, WidgetContentController) {

  /**
   * Define Wikimapia controller
   * @class WikimapiaController
   * @extends PluginController
   * @extends WidgetContentController
   * @constructor
   */
  var WikimapiaController = function WikimapiaController() {
  };

  return WikimapiaController.extend('WikimapiaController', {

    /**
     * Set embedded content
     * @memberOf WikimapiaController
     */
    setEmbeddedContent: function setEmbeddedContent() {
      this.view.get$item().renderEmbeddedContent(
          this.model.getPrefs('wikimapiaEmbedCode')
      );
    },

    /**
     * Add Wikimapia rule
     * @memberOf WikimapiaController
     * @param {Event} e
     */
    addWikimapiaRule: function addWikimapiaRule(e) {
      this.addWidgetRule(e, this.scope.name);
    }

  }, PluginBase.prototype, WidgetContentController.prototype);
});
