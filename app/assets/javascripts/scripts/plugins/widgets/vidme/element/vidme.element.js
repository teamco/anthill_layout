/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element'
], function defineVidmeElement(PluginElement) {

    /**
     * Define Vidme Element
     * @param view
     * @param opts
     * @returns {VidmeElement}
     * @constructor
     * @class VidmeElement
     * @extends PluginElement
     */
    var VidmeElement = function VidmeElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.addCSS('vidme', {resource: '/widgets'});

        return this;
    };

    return VidmeElement.extend('VidmeElement', {

        /**
         * Render Embedded content
         * @memberOf VidmeElement
         * @param {string} url
         */
        renderEmbeddedContent: function renderEmbeddedContent(url) {
            this.$.append(
                this.renderIframe(url)
            );
        }

    }, PluginElement.prototype);

});
