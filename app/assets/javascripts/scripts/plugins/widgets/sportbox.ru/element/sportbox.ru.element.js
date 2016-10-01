/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element'
], function defineSportboxRuElement(PluginElement) {

    /**
     * Define SportboxRu Element
     * @param view
     * @param opts
     * @returns {SportboxRuElement}
     * @constructor
     * @class SportboxRuElement
     * @extends PluginElement
     */
    var SportboxRuElement = function SportboxRuElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.addCSS('sportbox.ru', {resource: '/widgets'});

        return this;
    };

    return SportboxRuElement.extend('SportboxRuElement', {

        /**
         * Render Embedded content
         * @memberOf SportboxRuElement
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
