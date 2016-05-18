/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element'
], function definePavelElement(PluginElement) {

    /**
     * Define Pavel Element
     * @param view
     * @param opts
     * @returns {PavelElement}
     * @constructor
     * @class PavelElement
     * @extends PluginElement
     */
    var PavelElement = function PavelElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.addCSS('pavel', {resource: '/widgets'});

        return this;
    };

    return PavelElement.extend('PavelElement', {

        /**
         * Render Embedded content
         * @memberOf PavelElement
         */
        renderEmbeddedContent: function renderEmbeddedContent() {
            // TODO
        }

    }, PluginElement.prototype);
});
