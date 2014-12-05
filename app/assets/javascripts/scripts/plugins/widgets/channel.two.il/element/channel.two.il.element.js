/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element'
], function defineChannelTwoIlElement(BaseElement) {

    /**
     * Define ChannelTwoIl Element
     * @param view
     * @param opts
     * @returns {ChannelTwoIlElement}
     * @constructor
     * @class ChannelTwoIlElement
     * @extends BaseElement
     */
    var ChannelTwoIlElement = function ChannelTwoIlElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.addCSS('channel.two.il', {resource: '/widgets'});

        return this;
    };

    return ChannelTwoIlElement.extend('ChannelTwoIlElement', {

        /**
         * Render Embedded content
         * @member ChannelTwoIlElement
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
