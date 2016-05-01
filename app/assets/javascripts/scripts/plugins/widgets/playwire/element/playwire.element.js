/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element'
], function definePlaywireElement(PluginElement) {

    /**
     * Define Playwire Element
     * @param view
     * @param opts
     * @returns {PlaywireElement}
     * @constructor
     * @class PlaywireElement
     * @extends PluginElement
     */
    var PlaywireElement = function PlaywireElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.addCSS('playwire', {resource: '/widgets'});

        return this;
    };

    return PlaywireElement.extend('PlaywireElement', {

        /**
         * Render Embedded content
         * @memberOf PlaywireElement
         * @param {string} embed
         */
        renderEmbeddedContent: function renderEmbeddedContent(embed) {
            this.addContent(embed);
        }

    }, PluginElement.prototype);
});
