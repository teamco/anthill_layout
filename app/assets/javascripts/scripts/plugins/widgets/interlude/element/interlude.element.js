/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element'
], function defineInterludeElement(PluginElement) {

    /**
     * Define Interlude Element
     * @param view
     * @param opts
     * @returns {InterludeElement}
     * @constructor
     * @class InterludeElement
     * @extends PluginElement
     */
    var InterludeElement = function InterludeElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.addCSS('interlude', {resource: '/widgets'});

        return this;
    };

    return InterludeElement.extend('InterludeElement', {

        /**
         * Render Embedded content
         * @memberOf InterludeElement
         * @param {string} embed
         */
        renderEmbeddedContent: function renderEmbeddedContent(embed) {

            if (!embed) {
                return false;
            }

            this.$.append(
                this.renderIframe(
                    $(embed).attr('src')
                )
            );
        }

    }, PluginElement.prototype);
});
