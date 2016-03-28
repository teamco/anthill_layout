/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element'
], function defineTrubaElement(PluginElement) {

    /**
     * Define Truba Element
     * @param view
     * @param opts
     * @returns {TrubaElement}
     * @constructor
     * @class TrubaElement
     * @extends PluginElement
     */
    var TrubaElement = function TrubaElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.addCSS('truba', {resource: '/widgets'});

        return this;
    };

    return TrubaElement.extend('TrubaElement', {

        /**
         * Render Embedded content
         * @memberOf TrubaElement
         * @param {string} url
         */
        renderEmbeddedContent: function renderEmbeddedContent(url) {
            this.$.append(
                this.renderIframe(url)
            );
        }

    }, PluginElement.prototype);

});
