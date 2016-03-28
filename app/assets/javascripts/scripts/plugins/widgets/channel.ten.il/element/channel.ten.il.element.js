/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element'
], function defineChannelTenIlElement(PluginElement) {

    /**
     * Define ChannelTenIl Element
     * @param view
     * @param opts
     * @returns {ChannelTenIlElement}
     * @constructor
     * @class ChannelTenIlElement
     * @extends PluginElement
     */
    var ChannelTenIlElement = function ChannelTenIlElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.addCSS('channel.ten.il', {resource: '/widgets'});

        return this;
    };

    return ChannelTenIlElement.extend('ChannelTenIlElement', {

        /**
         * Render Embedded content
         * @memberOf ChannelTenIlElement
         * @param {string} embed
         */
        renderEmbeddedContent: function renderEmbeddedContent(embed) {
            this.$.append(
                this.renderObject(
                    $(embed)[0]
                )
            );
        }

    }, PluginElement.prototype);

});
