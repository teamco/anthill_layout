/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element'
], function defineKremElement(PluginElement) {

    /**
     * Define Krem Element
     * @param view
     * @param opts
     * @returns {KremElement}
     * @constructor
     * @class KremElement
     * @extends PluginElement
     */
    var KremElement = function KremElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.addCSS('krem', {resource: '/widgets'});

        return this;
    };

    return KremElement.extend('KremElement', {

        /**
         * Render Embedded content
         * @memberOf KremElement
         * @param {string} embed
         */
        renderEmbeddedContent: function renderEmbeddedContent(embed) {
            this.$.append(
                this.renderObject(embed)
            );
        }

    }, PluginElement.prototype);

});
