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
    'plugins/widgets/playwire/element/playwire.element',
    'plugins/widgets/playwire/element/playwire.preferences.element',
    'plugins/widgets/playwire/element/playwire.rules.element'
], function definePlaywireView(BaseView, Header, Footer, PlaywireElement, PlaywirePreferencesElement, PlaywireRulesElement) {

    /**
     * Define view
     * @class PlaywireView
     * @extends BaseView
     * @constructor
     */
    var PlaywireView = function PlaywireView() {
    };

    return PlaywireView.extend('PlaywireView', {

        /**
         * Render Playwire element
         * @memberOf PlaywireView
         */
        renderPlaywire: function renderPlaywire() {

            this.header(Header, this.get$container());

            /**
             * Define $playwire
             * @type {PlaywireElement}
             */
            this.elements.$playwire = new PlaywireElement(this, {
                $container: this.get$container().$
            });

            this.footer(Footer, this.get$container());

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.analyzeEmbeddedContent
            );
        },

        /**
         * Render Prefs
         * @memberOf PlaywireView
         * @returns {PlaywirePreferencesElement}
         */
        renderPreferences: function renderPreferences() {

            /**
             * Define Playwire Preferences Element
             * @type {PlaywirePreferencesElement}
             */
            this.elements.$preferences = new PlaywirePreferencesElement(this, {
                data: this.controller.getPreferences()
            });

            return this.get$preferences();
        },

        /**
         * Render Rules
         * @memberOf PlaywireView
         * @param widgetRules
         * @param contentRules
         * @returns {PlaywireRulesElement}
         */
        renderRules: function renderRules(widgetRules, contentRules) {

            /**
             * Define Playwire Rules Element
             * @type {PlaywireRulesElement}
             */
            this.elements.$rules = new PlaywireRulesElement(this, {
                data: this.controller.getRules(),
                rules: {
                    widget: widgetRules,
                    content: contentRules
                }
            });

            return this.get$rules();
        },

        /**
         * Render Playwire
         * @memberOf PlaywireView
         */
        render: function render() {

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.successRendered,
                this.renderPlaywire.bind(this)
            );
        }

    }, BaseView.prototype);
});
