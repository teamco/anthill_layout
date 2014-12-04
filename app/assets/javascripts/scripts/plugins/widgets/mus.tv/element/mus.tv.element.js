/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element'
], function defineMusTvElement(BaseElement) {

    /**
     * Define MusTv Element
     * @param view
     * @param opts
     * @returns {MusTvElement}
     * @constructor
     * @class MusTvElement
     * @extends BaseElement
     */
    var MusTvElement = function MusTvElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.addCSS('mus.tv', {resource: '/widgets'});

        return this;
    };

    return MusTvElement.extend('MusTvElement', {

        /**
         * Render Embedded content
         * @member MusTvElement
         * @param {string} url
         */
        renderEmbeddedContent: function renderEmbeddedContent(url) {
            this.$.append(
                this.renderIframe(url)
            );
        }

    }, BaseElement.prototype);

});
