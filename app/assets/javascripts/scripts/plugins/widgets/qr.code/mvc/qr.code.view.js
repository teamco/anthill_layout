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
    'plugins/widgets/qr.code/element/qr.code.element',
    'plugins/widgets/qr.code/element/qr.code.preferences.element',
    'plugins/widgets/qr.code/element/qr.code.rules.element'
], function defineQrCodeView(BaseView, Header, Footer, QrCodeElement, QrCodePreferencesElement, QrCodeRulesElement) {

    /**
     * Define view
     * @class QrCodeView
     * @extends BaseView
     * @constructor
     */
    var QrCodeView = function QrCodeView() {
    };

    return QrCodeView.extend('QrCodeView', {

        /**
         * Render QrCode element
         * @member QrCodeView
         */
        renderQrCode: function renderQrCode() {

            this.header(Header, this.elements.$container);

            /**
             * Define $qrcode
             * @type {QrCodeElement}
             */
            this.elements.$qrcode = new QrCodeElement(this, {
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
         * @member QrCodeView
         * @returns {QrCodePreferencesElement}
         */
        renderPreferences: function renderPreferences() {

            /**
             * Define QrCode Preferences Element
             * @type {QrCodePreferencesElement}
             */
            this.elements.$preferences = new QrCodePreferencesElement(this, {
                data: this.controller.getPreferences()
            });

            return this.elements.$preferences;
        },

        /**
         * Render Rules
         * @member QrCodeView
         * @param widgetRules
         * @param contentRules
         * @returns {QrCodeRulesElement}
         */
        renderRules: function renderRules(widgetRules, contentRules) {

            /**
             * Define QrCode Rules Element
             * @type {QrCodeRulesElement}
             */
            this.elements.$rules = new QrCodeRulesElement(this, {
                data: this.controller.getRules(),
                rules: {
                    widget: widgetRules,
                    content: contentRules
                }
            });

            return this.elements.$rules;
        },

        /**
         * Render QrCode
         * @member QrCodeView
         */
        render: function render() {

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.successRendered,
                this.renderQrCode.bind(this)
            );
        }

    }, BaseView.prototype)

});