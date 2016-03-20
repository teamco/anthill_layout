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
         * @memberOf QrCodeView
         */
        renderQrCode: function renderQrCode() {

            this.header(Header, this.getElementContainer());

            /**
             * Define $qrcode
             * @type {QrCodeElement}
             */
            this.elements.$qrcode = new QrCodeElement(this, {
                $container: this.get$container(),
                id: this.createUUID()
            });

            this.footer(Footer, this.getElementContainer());

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.setEmbeddedContent
            );
        },

        /**
         * Render Prefs
         * @memberOf QrCodeView
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
         * @memberOf QrCodeView
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
         * @memberOf QrCodeView
         */
        render: function render() {

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.successRendered,
                this.renderQrCode.bind(this)
            );
        }

    }, BaseView.prototype)

});
