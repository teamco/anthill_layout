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
    'plugins/widgets/flip.pdf/element/flip.pdf.element',
    'plugins/widgets/flip.pdf/element/flip.pdf.preferences.element',
    'plugins/widgets/flip.pdf/element/flip.pdf.rules.element'
], function defineFlipPdfView(BaseView, Header, Footer, FlipPdfElement, FlipPdfPreferencesElement, FlipPdfRulesElement) {

    /**
     * Define view
     * @class FlipPdfView
     * @extends BaseView
     * @constructor
     */
    var FlipPdfView = function FlipPdfView() {
    };

    return FlipPdfView.extend('FlipPdfView', {

        /**
         * Render flippdf element
         * @member FlipPdfView
         */
        renderFlipPdf: function renderFlipPdf() {

            this.header(Header, this.elements.$container);

            /**
             * Define $flippdf
             * @type {FlipPdfElement}
             */
            this.elements.$flippdf = new FlipPdfElement(this, {
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
         * @member FlipPdfView
         * @returns {FlipPdfPreferencesElement}
         */
        renderPreferences: function renderPreferences() {

            /**
             * Define FlipPdf Preferences Element
             * @type {FlipPdfPreferencesElement}
             */
            this.elements.$preferences = new FlipPdfPreferencesElement(this, {
                data: this.controller.getPreferences()
            });

            return this.elements.$preferences;
        },

        /**
         * Render Rules
         * @member FlipPdfView
         * @param widgetRules
         * @param contentRules
         * @returns {FlipPdfRulesElement}
         */
        renderRules: function renderRules(widgetRules, contentRules) {

            /**
             * Define data
             * @type {*|{}}
             */
            var data = this.controller.getRules();

            /**
             * Define FlipPdf Rules Element
             * @type {FlipPdfRulesElement}
             */
            this.elements.$rules = new FlipPdfRulesElement(this, {
                data: data,
                rules: {
                    widget: widgetRules,
                    content: contentRules
                }
            });

            return this.elements.$rules;
        },

        /**
         * Render flippdf
         * @member FlipPdfView
         */
        render: function render() {

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.successRendered,
                this.renderFlipPdf.bind(this)
            );
        }

    }, BaseView.prototype)

});