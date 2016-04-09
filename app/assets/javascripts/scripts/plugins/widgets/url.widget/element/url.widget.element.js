/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element'
], function defineUrlWidgetElement(PluginElement) {

    /**
     * Define UrlWidget Element
     * @param view
     * @param opts
     * @returns {UrlWidgetElement}
     * @constructor
     * @class UrlWidgetElement
     * @extends PluginElement
     */
    var UrlWidgetElement = function UrlWidgetElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.addCSS('url.widget', {resource: '/widgets'});

        return this;
    };

    return UrlWidgetElement.extend('UrlWidgetElement', {

        /**
         * Render Embedded content
         * @memberOf UrlWidgetElement
         * @param {string} url
         * @param {boolean} isIframe
         */
        renderEmbeddedContent: function renderEmbeddedContent(url, isIframe) {

            // Define $content instance
            var $content = isIframe ?
                this.renderIframe(url, {scrolling: 'yes'}) :
                this.view.controller.fetchReadability(url);

            this.updateEmbeddedContent($content);
        },

        /**
         * Update Embedded content
         * @memberOf UrlWidgetElement
         * @param {string} content
         */
        updateEmbeddedContent: function updateEmbeddedContent(content) {

            // Define $content
            var $content = $(content);

            // Remove unnecessary scripts, links and css
            $('script, style, link', $content).remove();

            this.$.empty().append($content);
        }

    }, PluginElement.prototype);

});
