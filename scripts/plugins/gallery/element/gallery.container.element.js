/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/element'
], function defineGalleryContainerElement(BaseElement) {

    /**
     * Define Gallery Container Element
     * @param view
     * @param opts
     * @returns {GalleryContainerElement}
     * @constructor
     * @class GalleryContainerElement
     */
    var GalleryContainerElement = function GalleryContainerElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        return this;
    };

    return GalleryContainerElement.extend({

    }, BaseElement.prototype);

});