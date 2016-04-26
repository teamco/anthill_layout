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
], function definePaypalButtonModel(BaseModel, WidgetContentModel) {

    /**
     * Define PaypalButton model
     * @extends BaseModel
     * @extends WidgetContentModel
     * @class PaypalButtonModel
     * @constructor
     */
    var PaypalButtonModel = function PaypalButtonModel() {

        /**
         * Define preferences
         * @property PaypalButtonModel
         * @type {{}}
         */
        this.preferences = {
            paypalbuttonMerchant: {
                type: 'text',
                disabled: false,
                value: undefined,
                placeholder: 'Email address or merchant ID',
                visible: true,
                validate: {
                    blank: false
                }
            },
            paypalbuttonName: {
                type: 'text',
                disabled: false,
                value: undefined,
                placeholder: 'My Product',
                visible: true
            },
            paypalbuttonTypeOfPeriod: {
                type: 'combobox',
                disabled: false,
                list: [
                    {
                        type: 'text',
                        value: 'Days'
                    },
                    {
                        type: 'text',
                        value: 'Weeks'
                    },
                    {
                        type: 'text',
                        value: 'Months'
                    },
                    {
                        type: 'text',
                        value: 'Years'
                    }
                ],
                value: 'Days',
                visible: true,
                label: true
            },
            paypalbuttonAmount: {
                type: 'text',
                disabled: false,
                value: undefined,
                placeholder: '5.00',
                visible: true
            },
            paypalbuttonCurrency: {
                type: 'text',
                disabled: false,
                value: undefined,
                placeholder: 'USD',
                visible: true
            },
            paypalbuttonRecurrences: {
                type: 'text',
                disabled: false,
                value: undefined,
                placeholder: '2',
                visible: true
            },
            paypalbuttonCallbackUrl: {
                type: 'text',
                disabled: false,
                value: undefined,
                placeholder: 'http://mysite.com/callback',
                visible: true
            },
            paypalbuttonEnvironmentSandbox: {
                type: 'checkbox',
                disabled: false,
                value: false,
                visible: true
            }
        };

        /**
         * Define rules
         * @property PaypalButtonModel
         * @type {{}}
         */
        this.rules = {};
    };

    return PaypalButtonModel.extend(
        'PaypalButtonModel', {},
        BaseModel.prototype,
        WidgetContentModel.prototype
    );
});
