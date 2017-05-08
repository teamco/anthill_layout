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
  'plugins/widgets/film.ru/element/film.ru.element',
  'plugins/widgets/film.ru/element/film.ru.preferences.element',
  'plugins/widgets/film.ru/element/film.ru.rules.element'
], function defineFilmRuView(BaseView, Header, Footer, FilmRuElement,
    FilmRuPreferencesElement, FilmRuRulesElement) {

  /**
   * Define view
   * @class FilmRuView
   * @extends BaseView
   * @constructor
   */
  var FilmRuView = function FilmRuView() {
  };

  return FilmRuView.extend('FilmRuView', {

    /**
     * Render FilmRu element
     * @memberOf FilmRuView
     */
    renderFilmRu: function renderFilmRu() {

      this.header(Header, this.get$container());

      /**
       * Define $filmru
       * @type {FilmRuElement}
       */
      this.elements.$filmru = new FilmRuElement(this, {
        $container: this.get$container().$
      });

      this.footer(Footer, this.get$container());

      this.scope.observer.publish(
          this.scope.eventmanager.eventList.analyzeEmbeddedContent
      );
    },

    /**
     * Render Prefs
     * @memberOf FilmRuView
     * @returns {FilmRuPreferencesElement}
     */
    renderPreferences: function renderPreferences() {

      /**
       * Define FilmRu Preferences Element
       * @type {FilmRuPreferencesElement}
       */
      this.elements.$preferences = new FilmRuPreferencesElement(this, {
        data: this.controller.getPreferences()
      });

      return this.get$preferences();
    },

    /**
     * Render Rules
     * @memberOf FilmRuView
     * @param widgetRules
     * @param contentRules
     * @returns {FilmRuRulesElement}
     */
    renderRules: function renderRules(widgetRules, contentRules) {

      /**
       * Define FilmRu Rules Element
       * @type {FilmRuRulesElement}
       */
      this.elements.$rules = new FilmRuRulesElement(this, {
        data: this.controller.getRules(),
        rules: {
          widget: widgetRules,
          content: contentRules
        }
      });

      return this.get$rules();
    },

    /**
     * Render FilmRu
     * @memberOf FilmRuView
     */
    render: function render() {

      this.scope.observer.publish(
          this.scope.eventmanager.eventList.successRendered,
          this.renderFilmRu.bind(this)
      );
    }

  }, BaseView.prototype);
});
