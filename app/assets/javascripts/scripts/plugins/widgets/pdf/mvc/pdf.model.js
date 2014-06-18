/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/4/12
 * Time: 11:06 PM
 * To change this template use File | Settings | File Templates.
 */
define([
    'modules/Model'
], function definePdfModel(BaseModel) {

    /**
     * Define Pdf model
     * @extends BaseModel
     * @class PdfModel
     * @constructor
     */
    var PdfModel = function PdfModel() {

        /**
         * Define preferences
         * @member PdfModel
         * @type {{
         *      pdfUrl: {type: string, disabled: boolean, value: undefined, visible: boolean}
         * }}
         */
        this.preferences = {
            pdfUrl: {
                type: 'text',
                disabled: false,
                value: undefined,
                visible: true
            }
        };

        /**
         * Define rules
         * @member PdfModel
         * @type {{}}
         */
        this.rules = {};
    };

    return PdfModel.extend('PdfModel', {

        /**
         * Set Pdf Url
         * @member PdfModel
         * @param {string} url
         */
        setPdfUrl: function setPdfUrl(url) {
            this.setPrefs('pdfUrl', url);
        }

    }, BaseModel.prototype);
});