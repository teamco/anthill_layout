/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element'
], function defineRdioElement(BaseElement) {

    /**
     * Define Rdio Element
     * @param view
     * @param opts
     * @returns {RdioElement}
     * @constructor
     * @class RdioElement
     * @extends BaseElement
     */
    var RdioElement = function RdioElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.addCSS('rdio', {resource: '/widgets'});

        return this;
    };

    return RdioElement.extend('RdioElement', {

        /**
         * Render Embedded content
         * @member RdioElement
         * @param {string} url
         */
        renderEmbeddedContent: function renderEmbeddedContent(url) {
            this.$.append(
                this.renderIframe(url)
            );
        }

    }, BaseElement.prototype);

});
