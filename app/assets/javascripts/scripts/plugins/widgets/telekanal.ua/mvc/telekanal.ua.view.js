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
    'plugins/widgets/telekanal.ua/element/telekanal.ua.element',
    'plugins/widgets/telekanal.ua/element/telekanal.ua.preferences.element',
    'plugins/widgets/telekanal.ua/element/telekanal.ua.rules.element'
], function defineTelekanalUaView(BaseView, Header, Footer, TelekanalUaElement, TelekanalUaPreferencesElement, TelekanalUaRulesElement) {

    /**
     * Define view
     * @class TelekanalUaView
     * @extends BaseView
     * @constructor
     */
    var TelekanalUaView = function TelekanalUaView() {
    };

    return TelekanalUaView.extend('TelekanalUaView', {

        /**
         * Render telekanalua element
         * @memberOf TelekanalUaView
         */
        renderTelekanalUa: function renderTelekanalUa() {

            this.header(Header, this.elements.$container);

            /**
             * Define $telekanalua
             * @type {TelekanalUaElement}
             */
            this.elements.$telekanalua = new TelekanalUaElement(this, {
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
         * @memberOf TelekanalUaView
         * @returns {TelekanalUaPreferencesElement}
         */
        renderPreferences: function renderPreferences() {

            /**
             * Define TelekanalUa Preferences Element
             * @type {TelekanalUaPreferencesElement}
             */
            this.elements.$preferences = new TelekanalUaPreferencesElement(this, {
                data: this.controller.getPreferences()
            });

            return this.elements.$preferences;
        },

        /**
         * Render Rules
         * @memberOf TelekanalUaView
         * @param widgetRules
         * @param contentRules
         * @returns {TelekanalUaRulesElement}
         */
        renderRules: function renderRules(widgetRules, contentRules) {

            /**
             * Define data
             * @type {*|{}}
             */
            var data = this.controller.getRules();

            /**
             * Define TelekanalUa Rules Element
             * @type {TelekanalUaRulesElement}
             */
            this.elements.$rules = new TelekanalUaRulesElement(this, {
                data: data,
                rules: {
                    widget: widgetRules,
                    content: contentRules
                }
            });

            return this.elements.$rules;
        },

        /**
         * Render telekanalua
         * @memberOf TelekanalUaView
         */
        render: function render() {

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.successRendered,
                this.renderTelekanalUa.bind(this)
            );
        }

    }, BaseView.prototype)

});
