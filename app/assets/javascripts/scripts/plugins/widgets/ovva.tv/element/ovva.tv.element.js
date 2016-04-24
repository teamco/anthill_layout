/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element'
], function defineOvvaTvElement(PluginElement) {

    /**
     * Define OvvaTv Element
     * @param view
     * @param opts
     * @returns {OvvaTvElement}
     * @constructor
     * @class OvvaTvElement
     * @extends PluginElement
     */
    var OvvaTvElement = function OvvaTvElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.addCSS('ovva.tv', {resource: '/widgets'});

        return this;
    };

    return OvvaTvElement.extend('OvvaTvElement', {

        /**
         * Render Embedded content
         * @memberOf OvvaTvElement
         * @param {string} embed
         */
        renderEmbeddedContent: function renderEmbeddedContent(embed) {
            this.$.append(
                this.renderIframe(
                    $(embed).attr('src')
                )
            );
        }

    }, PluginElement.prototype);
});
