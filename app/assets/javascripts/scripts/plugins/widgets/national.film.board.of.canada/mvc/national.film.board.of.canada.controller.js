/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
  'plugins/plugin.controller',
  'plugins/widgets/widget.content.controller'
], function defineNationalFilmBoardOfCanadaController(PluginBase,
    WidgetContentController) {

  /**
   * Define NationalFilmBoardOfCanada controller
   * @class NationalFilmBoardOfCanadaController
   * @extends PluginController
   * @extends WidgetContentController
   * @constructor
   */
  var NationalFilmBoardOfCanadaController = function NationalFilmBoardOfCanadaController() {
  };

  return NationalFilmBoardOfCanadaController.extend(
      'NationalFilmBoardOfCanadaController', {

        /**
         * Set embedded content
         * @memberOf NationalFilmBoardOfCanadaController
         */
        setEmbeddedContent: function setEmbeddedContent() {
          this.view.get$item().renderEmbeddedContent(
              this.model.getPrefs('nationalfilmboardofcanadaEmbedCode')
          );
        },

        /**
         * Add NationalFilmBoardOfCanada rule
         * @memberOf NationalFilmBoardOfCanadaController
         * @param {Event} e
         */
        addNationalFilmBoardOfCanadaRule: function addNationalFilmBoardOfCanadaRule(e) {
          this.addWidgetRule(e, this.scope.name);
        }

      }, PluginBase.prototype, WidgetContentController.prototype);
});
