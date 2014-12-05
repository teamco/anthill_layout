/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element'
], function defineChannelNineUaElement(BaseElement) {

    /**
     * Define ChannelNineUa Element
     * @param view
     * @param opts
     * @returns {ChannelNineUaElement}
     * @constructor
     * @class ChannelNineUaElement
     * @extends BaseElement
     */
    var ChannelNineUaElement = function ChannelNineUaElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.addCSS('channel.nine.ua', {resource: '/widgets'});

        return this;
    };

    return ChannelNineUaElement.extend('ChannelNineUaElement', {

        /**
         * Render Embedded content
         * @member ChannelNineUaElement
         * @param {string} url
         */
        renderEmbeddedContent: function renderEmbeddedContent(url) {
            this.$.append(
                this.renderIframe(url)
            );
        }

    }, BaseElement.prototype);

});
