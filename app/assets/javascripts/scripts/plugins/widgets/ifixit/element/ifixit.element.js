/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element'
], function defineIfixitElement(PluginElement) {

    /**
     * Define Ifixit Element
     * @param view
     * @param opts
     * @returns {IfixitElement}
     * @constructor
     * @class IfixitElement
     * @extends PluginElement
     */
    var IfixitElement = function IfixitElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.addCSS('ifixit', {resource: '/widgets'});

        return this;
    };

    return IfixitElement.extend('IfixitElement', {

        /**
         * Render Embedded content
         * @memberOf IfixitElement
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
