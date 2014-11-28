/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element'
], function defineFiveChannelUaElement(BaseElement) {

    /**
     * Define FiveChannelUa Element
     * @param view
     * @param opts
     * @returns {FiveChannelUaElement}
     * @constructor
     * @class FiveChannelUaElement
     * @extends BaseElement
     */
    var FiveChannelUaElement = function FiveChannelUaElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.addCSS('five.channel.ua', {resource: '/widgets'});

        return this;
    };

    return FiveChannelUaElement.extend('FiveChannelUaElement', {

        /**
         * Render Embedded content
         * @member FiveChannelUaElement
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
