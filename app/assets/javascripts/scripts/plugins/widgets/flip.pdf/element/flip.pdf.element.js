/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element'
], function defineFlipPdfElement(BaseElement) {

    /**
     * Define FlipPdf Element
     * @param view
     * @param opts
     * @returns {FlipPdfElement}
     * @constructor
     * @class FlipPdfElement
     * @extends BaseElement
     */
    var FlipPdfElement = function FlipPdfElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.addCSS('flip.pdf', {resource: '/widgets'});

        return this;
    };

    return FlipPdfElement.extend('FlipPdfElement', {

        /**
         * Render Embedded content
         * @memberOf FlipPdfElement
         * @param {string} embed
         */
        renderEmbeddedContent: function renderEmbeddedContent(url) {
            this.$.append(
                this.renderIframe(url)
            );
        }

    }, BaseElement.prototype);

});
