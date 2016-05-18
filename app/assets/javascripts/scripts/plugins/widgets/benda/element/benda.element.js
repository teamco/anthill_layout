/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element'
], function defineBendaElement(PluginElement) {

    /**
     * Define Benda Element
     * @param view
     * @param opts
     * @returns {BendaElement}
     * @constructor
     * @class BendaElement
     * @extends PluginElement
     */
    var BendaElement = function BendaElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.addCSS('benda', {resource: '/widgets'});

        return this;
    };

    return BendaElement.extend('BendaElement', {

        /**
         * Render Embedded content
         * @memberOf BendaElement
         */
        renderEmbeddedContent: function renderEmbeddedContent() {
            // TODO
        }

    }, PluginElement.prototype);
});
