/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element'
], function defineSpeakerDeckElement(PluginElement) {

    /**
     * Define SpeakerDeck Element
     * @param view
     * @param opts
     * @returns {SpeakerDeckElement}
     * @constructor
     * @class SpeakerDeckElement
     * @extends PluginElement
     */
    var SpeakerDeckElement = function SpeakerDeckElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.addCSS('speaker.deck', {resource: '/widgets'});

        return this;
    };

    return SpeakerDeckElement.extend('SpeakerDeckElement', {

        /**
         * Render Embedded content
         * @memberOf SpeakerDeckElement
         * @param {string} embed
         */
        renderEmbeddedContent: function renderEmbeddedContent(embed) {

            if (!embed) {
                this.$.empty();
                return false;
            }

            this.$.append(embed);
        }

    }, PluginElement.prototype);
});
