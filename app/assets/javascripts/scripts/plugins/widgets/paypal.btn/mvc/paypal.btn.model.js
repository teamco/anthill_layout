/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/4/12
 * Time: 11:06 PM
 * To change this template use File | Settings | File Templates.
 */
define([
    'modules/Model',
    'plugins/widgets/widget.content.model'
], function definePaypalBtnModel(BaseModel, WidgetContentModel) {

    /**
     * Define PaypalBtn model
     * @extends BaseModel
     * @extends WidgetContentModel
     * @class PaypalBtnModel
     * @constructor
     */
    var PaypalBtnModel = function PaypalBtnModel() {

        /**
         * Define preferences
         * @property PaypalBtnModel
         * @type {{
         *      paypalbtnType: {type: string, disabled: boolean, list: *[], value: string, visible: boolean, label: boolean}, 
         *      paypalbtnMerchant: {type: string, disabled: boolean, value: undefined, placeholder: string, tooltip: string, visible: boolean, validate: {blank: boolean}}, 
         *      paypalbtnName: {type: string, disabled: boolean, value: undefined, placeholder: string, tooltip: string, visible: boolean, validate: {blank: boolean}}, 
         *      paypalbtnQuantity: {type: string, disabled: boolean, value: undefined, placeholder: string, tooltip: string, visible: boolean, validate: {mask: RegExp}}, 
         *      paypalbtnTypeOfPeriod: {type: string, disabled: boolean, list: *[], value: string, visible: boolean, label: boolean}, 
         *      paypalbtnAmount: {type: string, disabled: boolean, value: undefined, placeholder: string, tooltip: string, visible: boolean, validate: {blank: boolean}}, 
         *      paypalbtnCurrency: {type: string, disabled: boolean, value: undefined, placeholder: string, tooltip: string, visible: boolean}, 
         *      paypalbtnShipping: {type: string, disabled: boolean, value: undefined, placeholder: string, tooltip: string, visible: boolean}, 
         *      paypalbtnTax: {type: string, disabled: boolean, value: undefined, placeholder: string, tooltip: string, visible: boolean}, 
         *      paypalbtnRecurrences: {type: string, disabled: boolean, value: undefined, placeholder: string, visible: boolean}, 
         *      paypalbtnCallbackUrl: {type: string, disabled: boolean, value: undefined, placeholder: string, tooltip: string, visible: boolean}, 
         *      paypalbtnReturnUrl: {type: string, disabled: boolean, value: undefined, placeholder: string, tooltip: string, visible: boolean}, 
         *      paypalbtnSandboxEnvironment: {type: string, disabled: boolean, value: boolean, tooltip: string, visible: boolean}
         * }}
         */
        this.preferences = {
            paypalbtnType: {
                type: 'combobox',
                disabled: false,
                list: [
                    {
                        type: 'text',
                        value: 'Buy Now',
                        tooltip: 'Buy Now buttons are perfect for single item purchases'
                    },
                    {
                        type: 'text',
                        value: 'Add to Cart',
                        tooltip: 'Add To Cart buttons let users add multiple items instantly giving your website a cart'
                    },
                    {
                        type: 'text',
                        value: 'Donate',
                        tooltip: 'Donate buttons are great for accepting donations from users'
                    },
                    {
                        type: 'text',
                        value: 'Subscribe',
                        tooltip: 'Subscribe buttons can be used to set up payment subscriptions with your users'
                    }
                ],
                value: 'Buy Now',
                visible: true,
                label: true
            },
            paypalbtnMerchant: {
                type: 'text',
                disabled: false,
                value: undefined,
                placeholder: 'Email address or merchant ID',
                tooltip: 'Get your Merchant ID or email address. You\'ll need to add it to the code above. If you\'re logged in to PayPal and have a business account, you can get your Merchant ID on your account profile page',
                visible: true,
                validate: {
                    blank: false
                }
            },
            paypalbtnName: {
                type: 'text',
                disabled: false,
                value: undefined,
                placeholder: 'My Product',
                tooltip: 'Description of the item',
                visible: true,
                validate: {
                    blank: false
                }
            },
            paypalbtnQuantity: {
                type: 'number',
                disabled: false,
                value: undefined,
                placeholder: '1',
                tooltip: 'Quantity of items to purchase',
                visible: true,
                validate: {
                    mask: /^[1-9][0-9]*$/
                }
            },
            paypalbtnTypeOfPeriod: {
                type: 'combobox',
                disabled: false,
                list: [
                    {
                        type: 'text',
                        value: 'Days',
                        tooltip: 'Subscription payments for the selected time period'
                    },
                    {
                        type: 'text',
                        value: 'Weeks',
                        tooltip: 'Subscription payments for the selected time period'
                    },
                    {
                        type: 'text',
                        value: 'Months',
                        tooltip: 'Subscription payments for the selected time period'
                    },
                    {
                        type: 'text',
                        value: 'Years',
                        tooltip: 'Subscription payments for the selected time period'
                    }
                ],
                value: 'Days',
                visible: true,
                label: true
            },
            paypalbtnAmount: {
                type: 'text',
                disabled: false,
                value: undefined,
                placeholder: '5.00',
                tooltip: 'The price of the item',
                visible: true,
                validate: {
                    blank: false
                }
            },
            paypalbtnCurrency: {
                type: 'text',
                disabled: false,
                value: undefined,
                placeholder: 'USD',
                tooltip: 'The currency of the item (note: these cannot be mixed)',
                visible: true
            },
            paypalbtnShipping: {
                type: 'number',
                disabled: false,
                value: undefined,
                placeholder: '0.75',
                tooltip: 'The cost of shipping this item',
                visible: true
            },
            paypalbtnTax: {
                type: 'number',
                disabled: false,
                value: undefined,
                placeholder: '3.50',
                tooltip: 'Transaction-based tax override variable',
                visible: true
            },
            paypalbtnRecurrences: {
                type: 'text',
                disabled: false,
                value: undefined,
                placeholder: '2',
                visible: true
            },
            paypalbtnCallbackUrl: {
                type: 'text',
                disabled: false,
                value: undefined,
                placeholder: 'http://mysite.com/callback',
                tooltip: 'The IPN notify URL to be called on completion of the transaction',
                visible: true
            },
            paypalbtnReturnUrl: {
                type: 'text',
                disabled: false,
                value: undefined,
                placeholder: 'http://mysite.com/success',
                tooltip: 'The IPN notify URL to be called on success of the transaction',
                visible: true
            },
            paypalbtnSandboxEnvironment: {
                type: 'checkbox',
                disabled: false,
                value: false,
                tooltip: 'Test your code end-to-end by creating personal and business test accounts. Use test Credentials to make API requests and see the responses.',
                visible: true
            }
        };

        /**
         * Define rules
         * @property PaypalBtnModel
         * @type {{}}
         */
        this.rules = {};
    };

    return PaypalBtnModel.extend(
        'PaypalBtnModel', {},
        BaseModel.prototype,
        WidgetContentModel.prototype
    );
});
