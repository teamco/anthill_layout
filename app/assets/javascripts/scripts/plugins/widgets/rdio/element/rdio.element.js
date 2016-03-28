/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element'
], function defineRdioElement(PluginElement) {

    /**
     * Define Rdio Element
     * @param view
     * @param opts
     * @returns {RdioElement}
     * @constructor
     * @class RdioElement
     * @extends PluginElement
     */
    var RdioElement = function RdioElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.addCSS('rdio', {resource: '/widgets'});

        return this;
    };

    return RdioElement.extend('RdioElement', {

        /**
         * Render Embedded content
         * @memberOf RdioElement
         * @param {string} url
         */
        renderEmbeddedContent: function renderEmbeddedContent(url) {
            this.$.append(
                this.renderIframe(url)
            );
        }

    }, PluginElement.prototype);

});
