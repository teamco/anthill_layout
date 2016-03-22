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
    'plugins/widgets/pdf/element/pdf.element',
    'plugins/widgets/pdf/element/pdf.preferences.element',
    'plugins/widgets/pdf/element/pdf.rules.element'
], function definePdfView(BaseView, Header, Footer, PdfElement, PdfPreferencesElement, PdfRulesElement) {

    /**
     * Define view
     * @class PdfView
     * @extends BaseView
     * @constructor
     */
    var PdfView = function PdfView() {
    };

    return PdfView.extend('PdfView', {

        /**
         * Render pdf element
         * @memberOf PdfView
         */
        renderPdf: function renderPdf() {

            this.header(Header, this.get$container());

            /**
             * Define $pdf
             * @type {PdfElement}
             */
            this.elements.$pdf = new PdfElement(this, {
                $container: this.get$container().$,
                id: this.createUUID()
            });

            this.footer(Footer, this.get$container());

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.setEmbeddedContent
            );
        },

        /**
         * Render Prefs
         * @memberOf PdfView
         * @returns {PdfPreferencesElement}
         */
        renderPreferences: function renderPreferences() {

            /**
             * Define Pdf Preferences Element
             * @type {PdfPreferencesElement}
             */
            this.elements.$preferences = new PdfPreferencesElement(this, {
                data: this.controller.getPreferences()
            });

            return this.elements.$preferences;
        },

        /**
         * Render Rules
         * @memberOf PdfView
         * @param widgetRules
         * @param contentRules
         * @returns {PdfRulesElement}
         */
        renderRules: function renderRules(widgetRules, contentRules) {

            /**
             * Define data
             * @type {*|{}}
             */
            var data = this.controller.getRules();

            /**
             * Define Pdf Rules Element
             * @type {PdfRulesElement}
             */
            this.elements.$rules = new PdfRulesElement(this, {
                data: data,
                rules: {
                    widget: widgetRules,
                    content: contentRules
                }
            });

            return this.elements.$rules;
        },

        /**
         * Render pdf
         * @memberOf PdfView
         */
        render: function render() {

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.successRendered,
                this.renderPdf.bind(this)
            );
        }

    }, BaseView.prototype)

});