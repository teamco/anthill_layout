/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element'
], function defineTrubaElement(BaseElement) {

    /**
     * Define Truba Element
     * @param view
     * @param opts
     * @returns {TrubaElement}
     * @constructor
     * @class TrubaElement
     * @extends BaseElement
     */
    var TrubaElement = function TrubaElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.addCSS('truba', {resource: '/widgets'});

        return this;
    };

    return TrubaElement.extend('TrubaElement', {

        /**
         * Render Embedded content
         * @member TrubaElement
         * @param {string} url
         */
        renderEmbeddedContent: function renderEmbeddedContent(url) {
            this.$.append(
                this.renderIframe(url, {
                    id: "ytplayer",
                    type: "text/html"
                })
            );
        }

    }, BaseElement.prototype);

});
