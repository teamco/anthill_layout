/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element'
], function defineDipityElement(PluginElement) {

    /**
     * Define Dipity Element
     * @param view
     * @param opts
     * @returns {DipityElement}
     * @constructor
     * @class DipityElement
     * @extends PluginElement
     */
    var DipityElement = function DipityElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.addCSS('dipity', {resource: '/widgets'});

        return this;
    };

    return DipityElement.extend('DipityElement', {

        /**
         * Render Embedded content
         * @memberOf DipityElement
         * @param {string} embed
         */
        renderEmbeddedContent: function renderEmbeddedContent(embed) {
            this.addContent(embed);
        }

    }, PluginElement.prototype);
});
