/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element'
], function defineUstreamElement(BaseElement) {

    /**
     * Define Ustream Element
     * @param view
     * @param opts
     * @returns {UstreamElement}
     * @constructor
     * @class UstreamElement
     * @extends BaseElement
     */
    var UstreamElement = function UstreamElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.addCSS('ustream', {resource: '/widgets'});

        return this;
    };

    return UstreamElement.extend('UstreamElement', {

        /**
         * Render Embedded content
         * @memberOf UstreamElement
         * @param {string} url
         */
        renderEmbeddedContent: function renderEmbeddedContent(url) {
            this.$.append(
                this.renderIframe(url)
            );
        }

    }, BaseElement.prototype);

});
