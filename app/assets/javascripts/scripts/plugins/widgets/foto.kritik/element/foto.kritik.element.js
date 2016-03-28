/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element'
], function defineFotoKritikElement(PluginElement) {

    /**
     * Define FotoKritik Element
     * @param view
     * @param opts
     * @returns {FotoKritikElement}
     * @constructor
     * @class FotoKritikElement
     * @extends PluginElement
     */
    var FotoKritikElement = function FotoKritikElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.addCSS('foto.kritik', {resource: '/widgets'});

        return this;
    };

    return FotoKritikElement.extend('FotoKritikElement', {

        /**
         * Render Embedded content
         * @memberOf FotoKritikElement
         * @param {string} url
         */
        renderEmbeddedContent: function renderEmbeddedContent(url) {
            this.$.append(
                this.renderIframe(url)
            );
        }

    }, PluginElement.prototype);

});
