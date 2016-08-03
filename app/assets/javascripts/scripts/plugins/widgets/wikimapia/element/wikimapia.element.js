/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element'
], function defineWikimapiaElement(PluginElement) {

    /**
     * Define Wikimapia Element
     * @param view
     * @param opts
     * @returns {WikimapiaElement}
     * @constructor
     * @class WikimapiaElement
     * @extends PluginElement
     */
    var WikimapiaElement = function WikimapiaElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.addCSS('wikimapia', {resource: '/widgets'});

        return this;
    };

    return WikimapiaElement.extend('WikimapiaElement', {

        /**
         * Render Embedded content
         * @memberOf WikimapiaElement
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
