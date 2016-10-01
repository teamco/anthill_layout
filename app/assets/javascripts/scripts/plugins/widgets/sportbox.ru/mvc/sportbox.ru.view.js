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
    'plugins/widgets/sportbox.ru/element/sportbox.ru.element',
    'plugins/widgets/sportbox.ru/element/sportbox.ru.preferences.element',
    'plugins/widgets/sportbox.ru/element/sportbox.ru.rules.element'
], function defineSportboxRuView(BaseView, Header, Footer, SportboxRuElement, SportboxRuPreferencesElement, SportboxRuRulesElement) {

    /**
     * Define view
     * @class SportboxRuView
     * @extends BaseView
     * @constructor
     */
    var SportboxRuView = function SportboxRuView() {
    };

    return SportboxRuView.extend('SportboxRuView', {

        /**
         * Render SportboxRu element
         * @memberOf SportboxRuView
         */
        renderSportboxRu: function renderSportboxRu() {

            this.header(Header, this.get$container());

            /**
             * Define $sportboxru
             * @type {SportboxRuElement}
             */
            this.elements.$sportboxru = new SportboxRuElement(this, {
                $container: this.get$container().$
            });

            this.footer(Footer, this.get$container());

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.analyzeEmbeddedContent
            );
        },

        /**
         * Render Prefs
         * @memberOf SportboxRuView
         * @returns {SportboxRuPreferencesElement}
         */
        renderPreferences: function renderPreferences() {

            /**
             * Define SportboxRu Preferences Element
             * @type {SportboxRuPreferencesElement}
             */
            this.elements.$preferences = new SportboxRuPreferencesElement(this, {
                data: this.controller.getPreferences()
            });

            return this.get$preferences();
        },

        /**
         * Render Rules
         * @memberOf SportboxRuView
         * @param widgetRules
         * @param contentRules
         * @returns {SportboxRuRulesElement}
         */
        renderRules: function renderRules(widgetRules, contentRules) {

            /**
             * Define SportboxRu Rules Element
             * @type {SportboxRuRulesElement}
             */
            this.elements.$rules = new SportboxRuRulesElement(this, {
                data: this.controller.getRules(),
                rules: {
                    widget: widgetRules,
                    content: contentRules
                }
            });

            return this.get$rules();
        },

        /**
         * Render SportboxRu
         * @memberOf SportboxRuView
         */
        render: function render() {

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.successRendered,
                this.renderSportboxRu.bind(this)
            );
        }

    }, BaseView.prototype);
});
