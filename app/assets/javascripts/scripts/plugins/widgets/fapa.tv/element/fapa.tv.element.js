/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element'
], function defineFapaTvElement(BaseElement) {

    /**
     * Define FapaTv Element
     * @param view
     * @param opts
     * @returns {FapaTvElement}
     * @constructor
     * @class FapaTvElement
     * @extends BaseElement
     */
    var FapaTvElement = function FapaTvElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.addCSS('fapa.tv', {resource: '/widgets'});

        return this;
    };

    return FapaTvElement.extend('FapaTvElement', {

        /**
         * Render Embedded content
         * @member FapaTvElement
         * @param {string} url
         */
        renderEmbeddedContent: function renderEmbeddedContent(url) {
            this.$.append(
                this.renderIframe(url)
            );
        }

    }, BaseElement.prototype);

});
