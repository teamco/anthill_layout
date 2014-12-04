/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element'
], function defineChannelTwoElement(BaseElement) {

    /**
     * Define ChannelTwo Element
     * @param view
     * @param opts
     * @returns {ChannelTwoElement}
     * @constructor
     * @class ChannelTwoElement
     * @extends BaseElement
     */
    var ChannelTwoElement = function ChannelTwoElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.addCSS('channel.two', {resource: '/widgets'});

        return this;
    };

    return ChannelTwoElement.extend('ChannelTwoElement', {

        /**
         * Render Embedded content
         * @member ChannelTwoElement
         * @param {string} embed
         */
        renderEmbeddedContent: function renderEmbeddedContent(embed) {
            this.$.append(
                this.renderObject(
                    $(embed)[0]
                )
            );
        }

    }, BaseElement.prototype);

});
