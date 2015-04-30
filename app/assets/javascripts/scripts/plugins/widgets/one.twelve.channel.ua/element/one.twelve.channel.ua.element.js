/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element'
], function defineOneTwelveChannelUaElement(BaseElement) {

    /**
     * Define OneTwelveChannelUa Element
     * @param view
     * @param opts
     * @returns {OneTwelveChannelUaElement}
     * @constructor
     * @class OneTwelveChannelUaElement
     * @extends BaseElement
     */
    var OneTwelveChannelUaElement = function OneTwelveChannelUaElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.addCSS('one.twelve.channel.ua', {resource: '/widgets'});

        return this;
    };

    return OneTwelveChannelUaElement.extend('OneTwelveChannelUaElement', {

        /**
         * Render Embedded content
         * @memberOf OneTwelveChannelUaElement
         * @param {string} embed
         */
        renderEmbeddedContent: function renderEmbeddedContent(embed) {
            this.$.append(
                this.renderObject(
                    embed.toHtml()
                )
            );
        }

    }, BaseElement.prototype);

});
