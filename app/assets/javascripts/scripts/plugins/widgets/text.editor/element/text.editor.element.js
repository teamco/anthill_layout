/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element'
], function defineTextEditorElement(PluginElement) {

    /**
     * Define TextEditor Element
     * @param view
     * @param opts
     * @returns {TextEditorElement}
     * @constructor
     * @class TextEditorElement
     * @extends PluginElement
     */
    var TextEditorElement = function TextEditorElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.addCSS('text.editor', {resource: '/widgets'});

        return this;
    };

    return TextEditorElement.extend('TextEditorElement', {

        /**
         * Render Embedded content
         * @memberOf TextEditorElement
         * @param {string} html
         */
        renderEmbeddedContent: function renderEmbeddedContent(html) {

            this.setHtml(html);

            if (!this.base.isBlank(html)) {
                this.view.controller.clearParentThumbnail();
            }
        }

    }, PluginElement.prototype);

});