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
], function defineQrCodeModel(BaseModel, WidgetContentModel) {

    /**
     * Define QrCode model
     * @extends BaseModel
     * @extends WidgetContentModel
     * @class QrCodeModel
     * @constructor
     */
    var QrCodeModel = function QrCodeModel() {

        /**
         * Define preferences
         * @memberOf QrCodeModel
         * @type {{
         *      qrText: {type: string, disabled: boolean, value: undefined, visible: boolean},
         *      qrSize: {type: string, disabled: boolean, value: undefined, visible: boolean}
         * }}
         */
        this.preferences = {
            qrcodeText: {
                type: 'textarea',
                disabled: false,
                value: undefined,
                visible: true
            },
            qrcodeSize: {
                type: 'text',
                disabled: false,
                value: 250,
                visible: true
            }
        };

        /**
         * Define rules
         * @memberOf QrCodeModel
         * @type {{}}
         */
        this.rules = {};
    };

    return QrCodeModel.extend('QrCodeModel', {

        /**
         * Set QrCode text
         * @memberOf QrCodeModel
         * @param {string} qrCodeText
         */
        setQrcodeText: function setQrcodeText(qrCodeText) {
            this.setPrefs('qrcodeText', qrCodeText);
        },

        /**
         * Set QrCode size
         * @memberOf QrCodeModel
         * @param {string} qrCodeSize
         */
        setQrcodeSize: function setQrcodeSize(qrCodeSize) {
            this.setPrefs('qrcodeSize', qrCodeSize);
        }

    }, BaseModel.prototype, WidgetContentModel.prototype);
});
