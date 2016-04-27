/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element'
], function defineKitchenbowlElement(PluginElement) {

    /**
     * Define Kitchenbowl Element
     * @param view
     * @param opts
     * @returns {KitchenbowlElement}
     * @constructor
     * @class KitchenbowlElement
     * @extends PluginElement
     */
    var KitchenbowlElement = function KitchenbowlElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.addCSS('kitchenbowl', {resource: '/widgets'});

        return this;
    };

    return KitchenbowlElement.extend('KitchenbowlElement', {

        /**
         * Render Embedded content
         * @memberOf KitchenbowlElement
         * @param {string} embed
         */
        renderEmbeddedContent: function renderEmbeddedContent(embed) {
            this.addContent(embed);
        }

    }, PluginElement.prototype);
});
