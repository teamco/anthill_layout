/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element'
], function defineOnetvRuElement(PluginElement) {

    /**
     * Define OnetvRu Element
     * @param view
     * @param opts
     * @returns {OnetvRuElement}
     * @constructor
     * @class OnetvRuElement
     * @extends PluginElement
     */
    var OnetvRuElement = function OnetvRuElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.addCSS('onetv.ru', {resource: '/widgets'});

        return this;
    };

    return OnetvRuElement.extend('OnetvRuElement', {

        /**
         * Render Embedded content
         * @memberOf OnetvRuElement
         * @param {string} url
         */
        renderEmbeddedContent: function renderEmbeddedContent(url) {
            this.$.append(
                this.renderIframe(url)
            );
        }

    }, PluginElement.prototype);

});
