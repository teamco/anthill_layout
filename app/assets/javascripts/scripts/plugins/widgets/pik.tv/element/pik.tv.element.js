/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element'
], function definePikTvElement(PluginElement) {

    /**
     * Define PikTv Element
     * @param view
     * @param opts
     * @returns {PikTvElement}
     * @constructor
     * @class PikTvElement
     * @extends PluginElement
     * @extends Renderer
     */
    var PikTvElement = function PikTvElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.addCSS('pik.tv', {resource: '/widgets'});

        return this;
    };

    return PikTvElement.extend('PikTvElement', {

        /**
         * Render Embedded content
         * @memberOf PikTvElement
         * @param {string} url
         */
        renderEmbeddedContent: function renderEmbeddedContent(url) {
            this.$.append(
                this.renderIframe(url)
            );
        }

    }, PluginElement.prototype);

});
