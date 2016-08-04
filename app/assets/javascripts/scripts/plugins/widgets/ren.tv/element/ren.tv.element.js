/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element'
], function defineRenTvElement(PluginElement) {

    /**
     * Define RenTv Element
     * @param view
     * @param opts
     * @returns {RenTvElement}
     * @constructor
     * @class RenTvElement
     * @extends PluginElement
     */
    var RenTvElement = function RenTvElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.addCSS('ren.tv', {resource: '/widgets'});

        return this;
    };

    return RenTvElement.extend('RenTvElement', {

        /**
         * Render Embedded content
         * @memberOf RenTvElement
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
