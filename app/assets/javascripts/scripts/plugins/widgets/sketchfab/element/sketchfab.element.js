/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element'
], function defineSketchfabElement(PluginElement) {

    /**
     * Define Sketchfab Element
     * @param view
     * @param opts
     * @returns {SketchfabElement}
     * @constructor
     * @class SketchfabElement
     * @extends PluginElement
     */
    var SketchfabElement = function SketchfabElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.addCSS('sketchfab', {resource: '/widgets'});

        return this;
    };

    return SketchfabElement.extend('SketchfabElement', {

        /**
         * Render Embedded content
         * @memberOf SketchfabElement
         * @param {string} embed
         */
        renderEmbeddedContent: function renderEmbeddedContent(embed) {
            this.addContent(embed);
        }

    }, PluginElement.prototype);
});
