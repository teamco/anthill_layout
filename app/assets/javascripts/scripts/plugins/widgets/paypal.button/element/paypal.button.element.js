/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element'
], function definePaypalButtonElement(PluginElement) {

    /**
     * Define PaypalButton Element
     * @param view
     * @param opts
     * @returns {PaypalButtonElement}
     * @constructor
     * @class PaypalButtonElement
     * @extends PluginElement
     */
    var PaypalButtonElement = function PaypalButtonElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.addCSS('paypal.button', {resource: '/widgets'});

        return this;
    };

    return PaypalButtonElement.extend('PaypalButtonElement', {

        /**
         * Render Embedded content
         * @memberOf PaypalButtonElement
         */
        renderEmbeddedContent: function renderEmbeddedContent() {
            // TODO
        }

    }, PluginElement.prototype);
});
