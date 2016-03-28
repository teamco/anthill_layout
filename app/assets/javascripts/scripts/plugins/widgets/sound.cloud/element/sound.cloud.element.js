/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element'
], function defineSoundCloudElement(PluginElement) {

    /**
     * Define SoundCloud Element
     * @param view
     * @param opts
     * @returns {SoundCloudElement}
     * @constructor
     * @class SoundCloudElement
     * @extends PluginElement
     */
    var SoundCloudElement = function SoundCloudElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.addCSS('sound.cloud', {resource: '/widgets'});

        return this;
    };

    return SoundCloudElement.extend('SoundCloudElement', {

        /**
         * Render Embedded content
         * @memberOf SoundCloudElement
         * @param {string} url
         */
        renderEmbeddedContent: function renderEmbeddedContent(url) {
            this.$.append(
                this.renderIframe(url)
            );
        }

    }, PluginElement.prototype);

});
