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
    'plugins/widgets/paypal.btn/element/paypal.btn.element',
    'plugins/widgets/paypal.btn/element/paypal.btn.preferences.element',
    'plugins/widgets/paypal.btn/element/paypal.btn.rules.element'
], function definePaypalBtnView(BaseView, Header, Footer, PaypalBtnElement, PaypalBtnPreferencesElement, PaypalBtnRulesElement) {

    /**
     * Define view
     * @class PaypalBtnView
     * @extends BaseView
     * @constructor
     */
    var PaypalBtnView = function PaypalBtnView() {
    };

    return PaypalBtnView.extend('PaypalBtnView', {

        /**
         * Render PaypalBtn element
         * @memberOf PaypalBtnView
         */
        renderPaypalBtn: function renderPaypalBtn() {

            this.header(Header, this.get$container());

            /**
             * Define $paypalbtn
             * @type {PaypalBtnElement}
             */
            this.elements.$paypalbtn = new PaypalBtnElement(this, {
                $container: this.get$container().$
            });

            this.footer(Footer, this.get$container());

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.setEmbeddedContent
            );
        },

        /**
         * Render Prefs
         * @memberOf PaypalBtnView
         * @returns {PaypalBtnPreferencesElement}
         */
        renderPreferences: function renderPreferences() {

            /**
             * Define PaypalBtn Preferences Element
             * @type {PaypalBtnPreferencesElement}
             */
            this.elements.$preferences = new PaypalBtnPreferencesElement(this, {
                data: this.controller.getPreferences()
            });

            return this.get$preferences();
        },

        /**
         * Render Rules
         * @memberOf PaypalBtnView
         * @param widgetRules
         * @param contentRules
         * @returns {PaypalBtnRulesElement}
         */
        renderRules: function renderRules(widgetRules, contentRules) {

            /**
             * Define PaypalBtn Rules Element
             * @type {PaypalBtnRulesElement}
             */
            this.elements.$rules = new PaypalBtnRulesElement(this, {
                data: this.controller.getRules(),
                rules: {
                    widget: widgetRules,
                    content: contentRules
                }
            });

            return this.get$rules();
        },

        /**
         * Render PaypalBtn
         * @memberOf PaypalBtnView
         */
        render: function render() {

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.successRendered,
                this.renderPaypalBtn.bind(this)
            );
        }

    }, BaseView.prototype);
});
