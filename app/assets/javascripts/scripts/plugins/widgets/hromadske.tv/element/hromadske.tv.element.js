/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element'
], function defineHromadskeTvElement(PluginElement) {

    /**
     * Define HromadskeTv Element
     * @param view
     * @param opts
     * @returns {HromadskeTvElement}
     * @constructor
     * @class HromadskeTvElement
     * @extends PluginElement
     */
    var HromadskeTvElement = function HromadskeTvElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.addCSS('hromadske.tv', {resource: '/widgets'});

        return this;
    };

    return HromadskeTvElement.extend('HromadskeTvElement', {

        /**
         * Render Embedded content
         * @memberOf HromadskeTvElement
         * @param {string} url
         */
        renderEmbeddedContent: function renderEmbeddedContent(url) {
            this.$.append(
                this.renderIframe(url, {
                    id: "ytplayer",
                    type: "text/html"
                })
            );
        }

    }, PluginElement.prototype);

});
