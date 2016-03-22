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
    'plugins/widgets/film.on/element/film.on.element',
    'plugins/widgets/film.on/element/film.on.preferences.element',
    'plugins/widgets/film.on/element/film.on.rules.element'
], function defineFilmOnView(BaseView, Header, Footer, FilmOnElement, FilmOnPreferencesElement, FilmOnRulesElement) {

    /**
     * Define view
     * @class FilmOnView
     * @extends BaseView
     * @constructor
     */
    var FilmOnView = function FilmOnView() {
    };

    return FilmOnView.extend('FilmOnView', {

        /**
         * Render FilmOn element
         * @memberOf FilmOnView
         */
        renderFilmOn: function renderFilmOn() {

            this.header(Header, this.get$container());

            /**
             * Define $filmon
             * @type {FilmOnElement}
             */
            this.elements.$filmon = new FilmOnElement(this, {
                $container: this.get$container().$,
                id: this.createUUID()
            });

            this.footer(Footer, this.get$container());

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.setEmbeddedContent
            );
        },

        /**
         * Render Prefs
         * @memberOf FilmOnView
         * @returns {FilmOnPreferencesElement}
         */
        renderPreferences: function renderPreferences() {

            /**
             * Define FilmOn Preferences Element
             * @type {FilmOnPreferencesElement}
             */
            this.elements.$preferences = new FilmOnPreferencesElement(this, {
                data: this.controller.getPreferences()
            });

            return this.elements.$preferences;
        },

        /**
         * Render Rules
         * @memberOf FilmOnView
         * @param widgetRules
         * @param contentRules
         * @returns {FilmOnRulesElement}
         */
        renderRules: function renderRules(widgetRules, contentRules) {

            /**
             * Define FilmOn Rules Element
             * @type {FilmOnRulesElement}
             */
            this.elements.$rules = new FilmOnRulesElement(this, {
                data: this.controller.getRules(),
                rules: {
                    widget: widgetRules,
                    content: contentRules
                }
            });

            return this.elements.$rules;
        },

        /**
         * Render FilmOn
         * @memberOf FilmOnView
         */
        render: function render() {

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.successRendered,
                this.renderFilmOn.bind(this)
            );
        }

    }, BaseView.prototype)

});
