/**
 * Created with RubyMine.
 * User: i061485
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
    'plugins/plugin',
    'plugins/widgets/widget.content.controller'
], function definePdfController(PluginBase, WidgetContentController) {

    /**
     * Define pdf controller
     * @class PdfController
     * @extends PluginController
     * @extends WidgetContentController
     * @constructor
     */
    var PdfController = function PdfController() {
    };

    return PdfController.extend('PdfController', {

        /**
         * Set embedded content
         * @member PdfController
         */
        setEmbeddedContent: function setEmbeddedContent() {

            this.view.elements.$pdf.renderEmbeddedContent(
                this.model.getPrefs('pdfUrl')
            );
        },

        /**
         * Add Pdf rule
         * @member PdfController
         * @param e
         */
        addPdfRule: function addPdfRule(e) {

            /**
             * Define $button
             * @type {*|jQuery|HTMLElement}
             */
            var $button = $(e.target),
                scope = this.scope;

            scope.observer.publish(
                scope.eventmanager.eventList.publishRule,
                [$button.attr('value'), scope.constructor.name]
            );
        }

    }, PluginBase.prototype, WidgetContentController.prototype);
});