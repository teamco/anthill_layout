/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element'
], function defineSpankwireElement(PluginElement) {

    /**
     * Define Spankwire Element
     * @param view
     * @param opts
     * @returns {SpankwireElement}
     * @constructor
     * @class SpankwireElement
     * @extends PluginElement
     */
    var SpankwireElement = function SpankwireElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.addCSS('spankwire', {resource: '/widgets'});

        return this;
    };

    return SpankwireElement.extend('SpankwireElement', {

        /**
         * Render Embedded content
         * @memberOf SpankwireElement
         * @param {string} url
         */
        renderEmbeddedContent: function renderEmbeddedContent(url) {
            this.$.append(
                this.renderIframe(url)
            );
        }

    }, PluginElement.prototype);

});
