/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/24/12
 * Time: 10:13 PM
 * To change this template use File | Settings | File Templates.
 */

define([
  'modules/View',
  'element/header.element',
  'element/footer.element',
  'plugins/widgets/national.film.board.of.canada/element/national.film.board.of.canada.element',
  'plugins/widgets/national.film.board.of.canada/element/national.film.board.of.canada.preferences.element',
  'plugins/widgets/national.film.board.of.canada/element/national.film.board.of.canada.rules.element'
], function defineNationalFilmBoardOfCanadaView(BaseView, Header, Footer,
    NationalFilmBoardOfCanadaElement,
    NationalFilmBoardOfCanadaPreferencesElement,
    NationalFilmBoardOfCanadaRulesElement) {

  /**
   * Define view
   * @class NationalFilmBoardOfCanadaView
   * @extends BaseView
   * @constructor
   */
  var NationalFilmBoardOfCanadaView = function NationalFilmBoardOfCanadaView() {
  };

  return NationalFilmBoardOfCanadaView.extend('NationalFilmBoardOfCanadaView', {

    /**
     * Render NationalFilmBoardOfCanada element
     * @memberOf NationalFilmBoardOfCanadaView
     */
    renderNationalFilmBoardOfCanada: function renderNationalFilmBoardOfCanada() {

      this.header(Header, this.get$container());

      /**
       * Define $nationalfilmboardofcanada
       * @type {NationalFilmBoardOfCanadaElement}
       */
      this.elements.$nationalfilmboardofcanada =
          new NationalFilmBoardOfCanadaElement(this, {
            $container: this.get$container().$
          });

      this.footer(Footer, this.get$container());

      this.scope.observer.publish(
          this.scope.eventmanager.eventList.analyzeEmbeddedContent
      );
    },

    /**
     * Render Prefs
     * @memberOf NationalFilmBoardOfCanadaView
     * @returns {NationalFilmBoardOfCanadaPreferencesElement}
     */
    renderPreferences: function renderPreferences() {

      /**
       * Define NationalFilmBoardOfCanada Preferences Element
       * @type {NationalFilmBoardOfCanadaPreferencesElement}
       */
      this.elements.$preferences =
          new NationalFilmBoardOfCanadaPreferencesElement(this, {
            data: this.controller.getPreferences()
          });

      return this.get$preferences();
    },

    /**
     * Render Rules
     * @memberOf NationalFilmBoardOfCanadaView
     * @param widgetRules
     * @param contentRules
     * @returns {NationalFilmBoardOfCanadaRulesElement}
     */
    renderRules: function renderRules(widgetRules, contentRules) {

      /**
       * Define NationalFilmBoardOfCanada Rules Element
       * @type {NationalFilmBoardOfCanadaRulesElement}
       */
      this.elements.$rules = new NationalFilmBoardOfCanadaRulesElement(this, {
        data: this.controller.getRules(),
        rules: {
          widget: widgetRules,
          content: contentRules
        }
      });

      return this.get$rules();
    },

    /**
     * Render NationalFilmBoardOfCanada
     * @memberOf NationalFilmBoardOfCanadaView
     */
    render: function render() {

      this.scope.observer.publish(
          this.scope.eventmanager.eventList.successRendered,
          this.renderNationalFilmBoardOfCanada.bind(this)
      );
    }

  }, BaseView.prototype);
});
