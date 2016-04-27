/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element'
], function defineSwayElement(PluginElement) {

    /**
     * Define Sway Element
     * @param view
     * @param opts
     * @returns {SwayElement}
     * @constructor
     * @class SwayElement
     * @extends PluginElement
     */
    var SwayElement = function SwayElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.addCSS('sway', {resource: '/widgets'});

        return this;
    };

    return SwayElement.extend('SwayElement', {

        /**
         * Render Embedded content
         * @memberOf SwayElement
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
