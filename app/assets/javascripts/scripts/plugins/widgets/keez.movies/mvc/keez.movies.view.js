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
], function defineKeezMoviesView(BaseView, Header, Footer, KeezMoviesElement, KeezMoviesPreferencesElement, KeezMoviesRulesElement) {

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
         * @member KeezMoviesView
         */
        renderKeezMovies: function renderKeezMovies() {

            this.header(Header, this.elements.$container);

            /**
             * Define $keezmovies
             * @type {KeezMoviesElement}
             */
            this.elements.$keezmovies = new KeezMoviesElement(this, {
                $container: this.elements.$container.$,
                id: this.createUUID()
            });

            this.footer(Footer, this.elements.$container);

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.setEmbeddedContent
            );
        },

        /**
         * Render Prefs
         * @member KeezMoviesView
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

            return this.elements.$preferences;
        },

        /**
         * Render Rules
         * @member KeezMoviesView
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

            return this.elements.$rules;
        },

        /**
         * Render keezmovies
         * @member KeezMoviesView
         */
        render: function render() {

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.successRendered,
                this.renderKeezMovies.bind(this)
            );
        }

    }, BaseView.prototype)

});
