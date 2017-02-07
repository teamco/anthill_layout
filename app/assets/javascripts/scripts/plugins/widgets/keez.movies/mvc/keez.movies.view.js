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
  'plugins/widgets/keez.movies/element/keez.movies.element',
  'plugins/widgets/keez.movies/element/keez.movies.preferences.element',
  'plugins/widgets/keez.movies/element/keez.movies.rules.element'
], function defineKeezMoviesView(BaseView, Header, Footer, KeezMoviesElement,
    KeezMoviesPreferencesElement, KeezMoviesRulesElement) {

  /**
   * Define view
   * @class KeezMoviesView
   * @extends BaseView
   * @constructor
   */
  var KeezMoviesView = function KeezMoviesView() {
  };

  return KeezMoviesView.extend('KeezMoviesView', {

    /**
     * Render keezmovies element
     * @memberOf KeezMoviesView
     */
    renderKeezMovies: function renderKeezMovies() {

      this.header(Header, this.get$container());

      /**
       * Define $keezmovies
       * @type {KeezMoviesElement}
       */
      this.elements.$keezmovies = new KeezMoviesElement(this, {
        $container: this.get$container().$
      });

      this.footer(Footer, this.get$container());

      this.scope.observer.publish(
          this.scope.eventmanager.eventList.analyzeEmbeddedContent
      );
    },

    /**
     * Render Prefs
     * @memberOf KeezMoviesView
     * @returns {KeezMoviesPreferencesElement}
     */
    renderPreferences: function renderPreferences() {

      /**
       * Define KeezMovies Preferences Element
       * @type {KeezMoviesPreferencesElement}
       */
      this.elements.$preferences = new KeezMoviesPreferencesElement(this, {
        data: this.controller.getPreferences()
      });

      return this.get$preferences();
    },

    /**
     * Render Rules
     * @memberOf KeezMoviesView
     * @param widgetRules
     * @param contentRules
     * @returns {KeezMoviesRulesElement}
     */
    renderRules: function renderRules(widgetRules, contentRules) {

      /**
       * Define data
       * @type {*|{}}
       */
      var data = this.controller.getRules();

      /**
       * Define KeezMovies Rules Element
       * @type {KeezMoviesRulesElement}
       */
      this.elements.$rules = new KeezMoviesRulesElement(this, {
        data: data,
        rules: {
          widget: widgetRules,
          content: contentRules
        }
      });

      return this.get$rules();
    },

    /**
     * Render keezmovies
     * @memberOf KeezMoviesView
     */
    render: function render() {

      this.scope.observer.publish(
          this.scope.eventmanager.eventList.successRendered,
          this.renderKeezMovies.bind(this)
      );
    }

  }, BaseView.prototype)

});
