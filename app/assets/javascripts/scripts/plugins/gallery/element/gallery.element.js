/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element'
], function defineGalleryElement(PluginElement) {

    /**
     * Define Gallery Element
     * @param view
     * @param opts
     * @returns {GalleryElement}
     * @constructor
     * @class GalleryElement
     * @extends PluginElement
     */
    var GalleryElement = function GalleryElement(view, opts) {

        this._config(view, opts, $('<ul />')).build({
            $container: opts.$container
        });

        this.addCSS('gallery');

        return this;
    };

    return GalleryElement.extend('GalleryElement', {
    }, PluginElement.prototype);

});