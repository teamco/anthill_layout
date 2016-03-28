/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element'
], function defineScreencastElement(PluginElement) {

    /**
     * Define Screencast Element
     * @param view
     * @param opts
     * @returns {ScreencastElement}
     * @constructor
     * @class ScreencastElement
     * @extends PluginElement
     */
    var ScreencastElement = function ScreencastElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.addCSS('screencast', {resource: '/widgets'});

        return this;
    };

    return ScreencastElement.extend('ScreencastElement', {

        /**
         * Render Embedded content
         * @memberOf ScreencastElement
         * @param {{type, src}} embed
         */
        renderEmbeddedContent: function renderEmbeddedContent(embed) {

            this.$.append(
                embed.type === 'object' ?
                    this.renderObject(embed.src) :
                    embed.src
            );
        }

    }, PluginElement.prototype);

});
