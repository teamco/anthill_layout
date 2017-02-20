/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
  'plugins/plugin.controller',
  'plugins/widgets/widget.content.controller'
], function defineFilmRuController(PluginBase, WidgetContentController) {

  /**
   * Define FilmRu controller
   * @class FilmRuController
   * @extends PluginController
   * @extends WidgetContentController
   * @constructor
   */
  var FilmRuController = function FilmRuController() {
  };

  return FilmRuController.extend('FilmRuController', {

    /**
     * Set embedded content
     * @memberOf FilmRuController
     */
    setEmbeddedContent: function setEmbeddedContent() {
      this.view.get$item().renderEmbeddedContent(
          this.model.getPrefs('filmruEmbedCode')
      );
    },

    /**
     * Add FilmRu rule
     * @memberOf FilmRuController
     * @param {Event} e
     */
    addFilmRuRule: function addFilmRuRule(e) {
      this.addWidgetRule(e, this.scope.name);
    }

  }, PluginBase.prototype, WidgetContentController.prototype);
});
