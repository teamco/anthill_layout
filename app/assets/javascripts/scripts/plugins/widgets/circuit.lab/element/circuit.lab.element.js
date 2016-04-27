/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element'
], function defineCircuitLabElement(PluginElement) {

    /**
     * Define CircuitLab Element
     * @param view
     * @param opts
     * @returns {CircuitLabElement}
     * @constructor
     * @class CircuitLabElement
     * @extends PluginElement
     */
    var CircuitLabElement = function CircuitLabElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.addCSS('circuit.lab', {resource: '/widgets'});

        return this;
    };

    return CircuitLabElement.extend('CircuitLabElement', {

        /**
         * Render Embedded content
         * @memberOf CircuitLabElement
         * @param {string} embed
         */
        renderEmbeddedContent: function renderEmbeddedContent(embed) {
            this.addContent(embed);
        }

    }, PluginElement.prototype);
});
