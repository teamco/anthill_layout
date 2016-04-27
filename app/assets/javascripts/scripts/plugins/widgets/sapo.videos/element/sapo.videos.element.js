/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element'
], function defineSapoVideosElement(PluginElement) {

    /**
     * Define SapoVideos Element
     * @param view
     * @param opts
     * @returns {SapoVideosElement}
     * @constructor
     * @class SapoVideosElement
     * @extends PluginElement
     */
    var SapoVideosElement = function SapoVideosElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.addCSS('sapo.videos', {resource: '/widgets'});

        return this;
    };

    return SapoVideosElement.extend('SapoVideosElement', {

        /**
         * Render Embedded content
         * @memberOf SapoVideosElement
         * @param {string} embed
         */
        renderEmbeddedContent: function renderEmbeddedContent(embed) {
            this.addContent(
                this.renderIframe(
                    $(embed).attr('src')
                )
            );
        }

    }, PluginElement.prototype);
});
