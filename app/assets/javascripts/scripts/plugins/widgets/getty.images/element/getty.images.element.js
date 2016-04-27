/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element'
], function defineGettyImagesElement(PluginElement) {

    /**
     * Define GettyImages Element
     * @param view
     * @param opts
     * @returns {GettyImagesElement}
     * @constructor
     * @class GettyImagesElement
     * @extends PluginElement
     */
    var GettyImagesElement = function GettyImagesElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.addCSS('getty.images', {resource: '/widgets'});

        return this;
    };

    return GettyImagesElement.extend('GettyImagesElement', {

        /**
         * Render Embedded content
         * @memberOf GettyImagesElement
         * @param {string} embed
         */
        renderEmbeddedContent: function renderEmbeddedContent(embed) {
            this.addContent(embed);
        }

    }, PluginElement.prototype);
});
