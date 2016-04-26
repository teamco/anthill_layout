/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element'
], function defineSportliveElement(PluginElement) {

    /**
     * Define Sportlive Element
     * @param view
     * @param opts
     * @returns {SportliveElement}
     * @constructor
     * @class SportliveElement
     * @extends PluginElement
     */
    var SportliveElement = function SportliveElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.addCSS('sportlive', {resource: '/widgets'});

        return this;
    };

    return SportliveElement.extend('SportliveElement', {

        /**
         * Render Embedded content
         * @memberOf SportliveElement
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
            )
        }

    }, PluginElement.prototype);
});
