/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element'
], function definePaypalBtnElement(PluginElement) {

    /**
     * Define PaypalBtn Element
     * @param view
     * @param opts
     * @returns {PaypalBtnElement}
     * @constructor
     * @class PaypalBtnElement
     * @extends PluginElement
     */
    var PaypalBtnElement = function PaypalBtnElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.addCSS('paypal.btn', {resource: '/widgets'});

        return this;
    };

    return PaypalBtnElement.extend('PaypalBtnElement', {

        /**
         * Render Embedded content
         * @memberOf PaypalBtnElement
         * @param opts
         */
        renderEmbeddedContent: function renderEmbeddedContent(opts) {

            /**
             * Get element
             * @type {PaypalBtnElement}
             */
            var $element = this;
            var $btn;

            /**
             * Get scope
             * @type {PaypalBtn}
             */
            var scope = $element.view.scope;

            // Remove previous form
            $('.paypal-button', this.$).remove();

            var types = {
                'Buy Now': 'buynow',
                'Add to Cart': 'cart',
                'Donate': 'donate',
                'Subscribe': 'subscribe'
            };

            this.createScript({
                src: '/assets/scripts/plugins/widgets/paypal.btn/lib/paypal-button.min.js?merchant=' + opts.merchant,
                'data-button': types[opts['data-btn']],
                'data-name': opts['data-name'],
                'data-quantity': opts['data-quantity'],
                'data-amount': opts['data-amount'],
                'data-currency': opts['data-currency'],
                'data-shipping': opts['data-shipping'],
                'data-tax': opts['data-tax'],
                'data-callback': opts['data-callback'],
                'data-return': opts['data-return'],
                'data-period': opts['data-period'][0].toUpperCase(),
                'data-recurrence': opts['data-recurrence'],
                'data-env': opts['data-env']
            });

            this.base.waitFor(
                function condition() {
                    $btn = $('form.paypal-button:last', 'body');
                    return $btn.length > 0;
                },

                function callback() {
                    scope.logger.debug('Move button to container');
                    $btn.appendTo($element.$);
                },

                function fallback() {
                    scope.logger.warn('Timeout. Unable to detect paypal button');
                }
            );
        }

    }, PluginElement.prototype);
});