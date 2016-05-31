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
    'plugins/widgets/benda/element/benda.element',
    'plugins/widgets/benda/element/benda.preferences.element',
    'plugins/widgets/benda/element/benda.rules.element'
], function defineBendaView(BaseView, Header, Footer, BendaElement, BendaPreferencesElement, BendaRulesElement) {

    /**
     * Define view
     * @class BendaView
     * @extends BaseView
     * @constructor
     */
    var BendaView = function BendaView() {
    };

    return BendaView.extend('BendaView', {

        /**
         * Render Benda element
         * @memberOf BendaView
         */
        renderBenda: function renderBenda() {

            this.header(Header, this.get$container());

            /**
             * Define $benda
             * @type {BendaElement}
             */
            this.elements.$benda = new BendaElement(this, {
                $container: this.get$container().$
            });

            this.footer(Footer, this.get$container());

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.analyzeEmbeddedContent
            );
        },

        /**
         * Render Prefs
         * @memberOf BendaView
         * @returns {BendaPreferencesElement}
         */
        renderPreferences: function renderPreferences() {

            /**
             * Define Benda Preferences Element
             * @type {BendaPreferencesElement}
             */
            this.elements.$preferences = new BendaPreferencesElement(this, {
                data: this.controller.getPreferences()
            });

            return this.get$preferences();
        },

        /**
         * Render Rules
         * @memberOf BendaView
         * @param widgetRules
         * @param contentRules
         * @returns {BendaRulesElement}
         */
        renderRules: function renderRules(widgetRules, contentRules) {

            /**
             * Define Benda Rules Element
             * @type {BendaRulesElement}
             */
            this.elements.$rules = new BendaRulesElement(this, {
                data: this.controller.getRules(),
                rules: {
                    widget: widgetRules,
                    content: contentRules
                }
            });

            return this.get$rules();
        },

        /**
         * Render Benda
         * @memberOf BendaView
         */
        render: function render() {

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.successRendered,
                this.renderBenda.bind(this)
            );
        }

    }, BaseView.prototype);
});
