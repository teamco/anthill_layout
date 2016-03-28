/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element'
], function defineElevenChannelUaElement(PluginElement) {

    /**
     * Define ElevenChannelUa Element
     * @param view
     * @param opts
     * @returns {ElevenChannelUaElement}
     * @constructor
     * @class ElevenChannelUaElement
     * @extends PluginElement
     */
    var ElevenChannelUaElement = function ElevenChannelUaElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.addCSS('eleven.channel.ua', {resource: '/widgets'});

        return this;
    };

    return ElevenChannelUaElement.extend('ElevenChannelUaElement', {

        /**
         * Render Embedded content
         * @memberOf ElevenChannelUaElement
         * @param {string} embed
         */
        renderEmbeddedContent: function renderEmbeddedContent(embed) {
            this.$.append(
                this.renderEmbed(embed)
            );
        }

    }, PluginElement.prototype);

});
