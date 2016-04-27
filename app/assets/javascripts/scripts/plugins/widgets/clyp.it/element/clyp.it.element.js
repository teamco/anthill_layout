/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element'
], function defineClypItElement(PluginElement) {

    /**
     * Define ClypIt Element
     * @param view
     * @param opts
     * @returns {ClypItElement}
     * @constructor
     * @class ClypItElement
     * @extends PluginElement
     */
    var ClypItElement = function ClypItElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.addCSS('clyp.it', {resource: '/widgets'});

        return this;
    };

    return ClypItElement.extend('ClypItElement', {

        /**
         * Render Embedded content
         * @memberOf ClypItElement
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
