/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element'
], function defineElevenChannelUaElement(BaseElement) {

    /**
     * Define ElevenChannelUa Element
     * @param view
     * @param opts
     * @returns {ElevenChannelUaElement}
     * @constructor
     * @class ElevenChannelUaElement
     * @extends BaseElement
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

    }, BaseElement.prototype);

});
