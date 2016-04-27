/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element'
], function defineOumyElement(PluginElement) {

    /**
     * Define Oumy Element
     * @param view
     * @param opts
     * @returns {OumyElement}
     * @constructor
     * @class OumyElement
     * @extends PluginElement
     */
    var OumyElement = function OumyElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.addCSS('oumy', {resource: '/widgets'});

        return this;
    };

    return OumyElement.extend('OumyElement', {

        /**
         * Render Embedded content
         * @memberOf OumyElement
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
