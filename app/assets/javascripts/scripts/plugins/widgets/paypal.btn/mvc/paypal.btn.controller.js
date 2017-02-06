/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
    'plugins/plugin.controller',
    'plugins/widgets/widget.content.controller'
], function definePaypalBtnController(PluginBase, WidgetContentController) {

    /**
     * Define PaypalBtn controller
     * @class PaypalBtnController
     * @extends PluginController
     * @extends WidgetContentController
     * @constructor
     */
    var PaypalBtnController = function PaypalBtnController() {
    };

    return PaypalBtnController.extend('PaypalBtnController', {

        /**
         * Set embedded content
         * @memberOf PaypalBtnController
         */
        setEmbeddedContent: function setEmbeddedContent() {
            this.view.get$item().renderEmbeddedContent({
                merchant: this.model.getPrefs('paypalbtnMerchant'),
                'data-btn': this.model.getPrefs('paypalbtnType'),
                'data-name': this.model.getPrefs('paypalbtnName'),
                'data-quantity': this.model.getPrefs('paypalbtnQuantity'),
                'data-period': this.model.getPrefs('paypalbtnTypeOfPeriod'),
                'data-amount': this.model.getPrefs('paypalbtnAmount'),
                'data-currency': this.model.getPrefs('paypalbtnCurrency'),
                'data-shipping': this.model.getPrefs('paypalbtnShipping'),
                'data-tax': this.model.getPrefs('paypalbtnTax'),
                'data-recurrence': this.model.getPrefs('paypalbtnRecurrences'),
                'data-callback': this.model.getPrefs('paypalbtnCallbackUrl'),
                'data-return': this.model.getPrefs('paypalbtnReturnUrl'),
                'data-env': this.model.getPrefs('paypalbtnSandboxEnvironment')
            });
        },

        /**
         * Add PaypalBtn rule
         * @memberOf PaypalBtnController
         * @param {Event} e
         */
        addPaypalBtnRule: function addPaypalBtnRule(e) {

            /**
             * Define $btn
             * @type {*|jQuery|HTMLElement}
             */
            var $btn = $(e.target);

            /**
             * Get scope
             * @type {PaypalBtn|{name: string}}
             */
            var scope = this.scope;

            scope.observer.publish(
                scope.eventmanager.eventList.publishRule,
                [$btn.attr('value'), scope.name]
            );
        }

    }, PluginBase.prototype, WidgetContentController.prototype);
});
