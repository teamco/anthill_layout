/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element'
], function defineEdocrElement(PluginElement) {

    /**
     * Define Edocr Element
     * @param view
     * @param opts
     * @returns {EdocrElement}
     * @constructor
     * @class EdocrElement
     * @extends PluginElement
     */
    var EdocrElement = function EdocrElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.addCSS('edocr', {resource: '/widgets'});

        return this;
    };

    return EdocrElement.extend('EdocrElement', {

        /**
         * Render Embedded content
         * @memberOf EdocrElement
         * @param {string} embed
         */
        renderEmbeddedContent: function renderEmbeddedContent(embed) {
            this.addContent(embed);
        }

    }, PluginElement.prototype);
});
