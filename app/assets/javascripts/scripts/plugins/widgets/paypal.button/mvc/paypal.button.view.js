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
    'plugins/widgets/paypal.button/element/paypal.button.element',
    'plugins/widgets/paypal.button/element/paypal.button.preferences.element',
    'plugins/widgets/paypal.button/element/paypal.button.rules.element'
], function definePaypalButtonView(BaseView, Header, Footer, PaypalButtonElement, PaypalButtonPreferencesElement, PaypalButtonRulesElement) {

    /**
     * Define view
     * @class PaypalButtonView
     * @extends BaseView
     * @constructor
     */
    var PaypalButtonView = function PaypalButtonView() {
    };

    return PaypalButtonView.extend('PaypalButtonView', {

        /**
         * Render PaypalButton element
         * @memberOf PaypalButtonView
         */
        renderPaypalButton: function renderPaypalButton() {

            this.header(Header, this.get$container());

            /**
             * Define $paypalbutton
             * @type {PaypalButtonElement}
             */
            this.elements.$paypalbutton = new PaypalButtonElement(this, {
                $container: this.get$container().$
            });

            this.footer(Footer, this.get$container());

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.setEmbeddedContent
            );
        },

        /**
         * Render Prefs
         * @memberOf PaypalButtonView
         * @returns {PaypalButtonPreferencesElement}
         */
        renderPreferences: function renderPreferences() {

            /**
             * Define PaypalButton Preferences Element
             * @type {PaypalButtonPreferencesElement}
             */
            this.elements.$preferences = new PaypalButtonPreferencesElement(this, {
                data: this.controller.getPreferences()
            });

            return this.get$preferences();
        },

        /**
         * Render Rules
         * @memberOf PaypalButtonView
         * @param widgetRules
         * @param contentRules
         * @returns {PaypalButtonRulesElement}
         */
        renderRules: function renderRules(widgetRules, contentRules) {

            /**
             * Define PaypalButton Rules Element
             * @type {PaypalButtonRulesElement}
             */
            this.elements.$rules = new PaypalButtonRulesElement(this, {
                data: this.controller.getRules(),
                rules: {
                    widget: widgetRules,
                    content: contentRules
                }
            });

            return this.get$rules();
        },

        /**
         * Render PaypalButton
         * @memberOf PaypalButtonView
         */
        render: function render() {

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.successRendered,
                this.renderPaypalButton.bind(this)
            );
        }

    }, BaseView.prototype);
});
