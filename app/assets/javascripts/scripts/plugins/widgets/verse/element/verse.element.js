/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element'
], function defineVerseElement(PluginElement) {

    /**
     * Define Verse Element
     * @param view
     * @param opts
     * @returns {VerseElement}
     * @constructor
     * @class VerseElement
     * @extends PluginElement
     */
    var VerseElement = function VerseElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.addCSS('verse', {resource: '/widgets'});

        return this;
    };

    return VerseElement.extend('VerseElement', {

        /**
         * Render Embedded content
         * @memberOf VerseElement
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
