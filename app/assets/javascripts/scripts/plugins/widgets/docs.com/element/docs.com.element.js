/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element'
], function defineDocsComElement(PluginElement) {

    /**
     * Define DocsCom Element
     * @param view
     * @param opts
     * @returns {DocsComElement}
     * @constructor
     * @class DocsComElement
     * @extends PluginElement
     */
    var DocsComElement = function DocsComElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.addCSS('docs.com', {resource: '/widgets'});

        return this;
    };

    return DocsComElement.extend('DocsComElement', {

        /**
         * Render Embedded content
         * @memberOf DocsComElement
         * @param {string} embed
         */
        renderEmbeddedContent: function renderEmbeddedContent(embed) {
            this.addContent(embed);
        }

    }, PluginElement.prototype);
});
