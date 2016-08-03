/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element'
], function defineLaimTvElement(PluginElement) {

    /**
     * Define LaimTv Element
     * @param view
     * @param opts
     * @returns {LaimTvElement}
     * @constructor
     * @class LaimTvElement
     * @extends PluginElement
     */
    var LaimTvElement = function LaimTvElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.addCSS('laim.tv', {resource: '/widgets'});

        return this;
    };

    return LaimTvElement.extend('LaimTvElement', {

        /**
         * Render Embedded content
         * @memberOf LaimTvElement
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
