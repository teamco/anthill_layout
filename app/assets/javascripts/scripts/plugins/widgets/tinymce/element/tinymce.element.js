/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element'
], function defineTinymceElement(PluginElement) {

    /**
     * Define Tinymce Element
     * @param view
     * @param opts
     * @returns {TinymceElement}
     * @constructor
     * @class TinymceElement
     * @extends PluginElement
     */
    var TinymceElement = function TinymceElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.addCSS('tinymce', {resource: '/widgets'});

        return this;
    };

    return TinymceElement.extend('TinymceElement', {

        /**
         * Render Embedded content
         * @memberOf TinymceElement
         * @param {string} html
         */
        renderEmbeddedContent: function renderEmbeddedContent(html) {
            this.setHtml(html);
        }

    }, PluginElement.prototype);
});
