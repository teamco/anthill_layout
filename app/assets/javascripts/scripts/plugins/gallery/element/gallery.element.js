/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element'
], function defineGalleryElement(BaseElement) {

    /**
     * Define Gallery Element
     * @param view
     * @param opts
     * @returns {GalleryElement}
     * @constructor
     * @class GalleryElement
     * @extends BaseElement
     */
    var GalleryElement = function GalleryElement(view, opts) {

        this._config(view, opts, $('<ul class="nav" />')).build({
            $container: opts.$container
        });

        this.addCSS('gallery');

        return this;
    };

    return GalleryElement.extend('GalleryElement', {
    }, BaseElement.prototype);

});