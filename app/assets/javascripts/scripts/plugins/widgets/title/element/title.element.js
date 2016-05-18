/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element'
], function defineTitleElement(PluginElement) {

    /**
     * Define Title Element
     * @param view
     * @param opts
     * @returns {TitleElement}
     * @constructor
     * @class TitleElement
     * @extends PluginElement
     */
    var TitleElement = function TitleElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.addCSS('title', {resource: '/widgets'});

        return this;
    };

    return TitleElement.extend('TitleElement', {

        /**
         * Render Embedded content
         * @memberOf TitleElement
         * @param {string} text
         */
        renderEmbeddedContent: function renderEmbeddedContent(text) {
            this.addContent(text);
        }

    }, PluginElement.prototype);
});
