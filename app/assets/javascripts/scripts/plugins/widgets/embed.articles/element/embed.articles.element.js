/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element'
], function defineEmbedArticlesElement(PluginElement) {

    /**
     * Define EmbedArticles Element
     * @param view
     * @param opts
     * @returns {EmbedArticlesElement}
     * @constructor
     * @class EmbedArticlesElement
     * @extends PluginElement
     */
    var EmbedArticlesElement = function EmbedArticlesElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.addCSS('embed.articles', {resource: '/widgets'});

        return this;
    };

    return EmbedArticlesElement.extend('EmbedArticlesElement', {

        /**
         * Render Embedded content
         * @memberOf EmbedArticlesElement
         */
        renderEmbeddedContent: function renderEmbeddedContent(embed) {

            var embedArticle = $(embed)[0];

            var k = embedArticle.getAttribute("data-key"),
                u = decodeURI(embedArticle.getAttribute("data-url"));

            var filePath = [
                'http://embedarticles.com/widget/embed/?u=', encodeURIComponent(u),
                '&k=' + k + '&r=' + encodeURIComponent(window.location.href)
            ].join('');

            var md5 = this.base.lib.string.md5(u);

            this.addContent(
                this.renderIframe(
                    filePath, {
                        id: 'ea_embed_article_' + md5,
                        name: 'embed_widget_' + md5
                    }
                )
            );
        }

    }, PluginElement.prototype);
});
