/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element'
], function defineProchanElement(PluginElement) {

    /**
     * Define Prochan Element
     * @param view
     * @param opts
     * @returns {ProchanElement}
     * @constructor
     * @class ProchanElement
     * @extends PluginElement
     */
    var ProchanElement = function ProchanElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.addCSS('prochan', {resource: '/widgets'});

        return this;
    };

    return ProchanElement.extend('ProchanElement', {

        /**
         * Render Embedded content
         * @memberOf ProchanElement
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
