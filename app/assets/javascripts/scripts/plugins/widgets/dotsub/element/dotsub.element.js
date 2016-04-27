/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element'
], function defineDotsubElement(PluginElement) {

    /**
     * Define Dotsub Element
     * @param view
     * @param opts
     * @returns {DotsubElement}
     * @constructor
     * @class DotsubElement
     * @extends PluginElement
     */
    var DotsubElement = function DotsubElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.addCSS('dotsub', {resource: '/widgets'});

        return this;
    };

    return DotsubElement.extend('DotsubElement', {

        /**
         * Render Embedded content
         * @memberOf DotsubElement
         * @param {string} embed
         */
        renderEmbeddedContent: function renderEmbeddedContent(embed) {
            this.addContent(
                this.renderIframe(
                    $(embed).attr('src')
                )
            )
        }

    }, PluginElement.prototype);
});
