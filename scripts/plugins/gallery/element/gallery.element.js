/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/element'
], function defineGalleryElement(BaseElement) {

    /**
     * Define Gallery Element
     * @param view
     * @param opts
     * @returns {GalleryElement}
     * @constructor
     * @class GalleryElement
     */
    var GalleryElement = function GalleryElement(view, opts) {

        this._config(view, opts, $('<ul />')).build({
            $container: opts.$container,
            destroy: false
        });

        /**
         * Define max width
         * @type {*|number}
         */
        this.maxWidth = opts.maxWidth || 100;

        /**
         * Define min width
         * @type {*|number}
         */
        this.minWidth = opts.minWidth || 0;

        this.addCSS('gallery');

        return this;
    };

    return GalleryElement.extend({

    }, BaseElement.prototype);

});