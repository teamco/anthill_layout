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
    'plugins/widgets/rutube/element/rutube.element',
    'plugins/widgets/rutube/element/rutube.preferences.element',
    'plugins/widgets/rutube/element/rutube.rules.element'
], function defineRutubeView(BaseView, Header, Footer, RutubeElement, RutubePreferencesElement, RutubeRulesElement) {

    /**
     * Define view
     * @class RutubeView
     * @extends BaseView
     * @constructor
     */
    var RutubeView = function RutubeView() {
    };

    return RutubeView.extend('RutubeView', {

        /**
         * Render rutube element
         * @member RutubeView
         */
        renderRutube: function renderRutube() {

            this.header(Header, this.elements.$container);

            /**
             * Define $rutube
             * @type {RutubeElement}
             */
            this.elements.$rutube = new RutubeElement(this, {
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
         * @member RutubeView
         * @returns {RutubePreferencesElement}
         */
        renderPreferences: function renderPreferences() {

            /**
             * Define Rutube Preferences Element
             * @type {RutubePreferencesElement}
             */
            this.elements.$preferences = new RutubePreferencesElement(this, {
                data: this.controller.getPreferences()
            });

            return this.elements.$preferences;
        },

        /**
         * Render Rules
         * @member RutubeView
         * @param widgetRules
         * @param contentRules
         * @returns {RutubeRulesElement}
         */
        renderRules: function renderRules(widgetRules, contentRules) {

            /**
             * Define data
             * @type {*|{}}
             */
            var data = this.controller.getRules();

            /**
             * Define Rutube Rules Element
             * @type {RutubeRulesElement}
             */
            this.elements.$rules = new RutubeRulesElement(this, {
                data: data,
                rules: {
                    widget: widgetRules,
                    content: contentRules
                }
            });

            return this.elements.$rules;
        },

        /**
         * Render rutube
         * @member RutubeView
         */
        render: function render() {

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.successRendered,
                this.renderRutube.bind(this)
            );
        }

    }, BaseView.prototype)

});