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

        this._config(view, opts, $('<ul />')).build({
            $container: opts.$container,
            destroy: false
        });

        this.addCSS('gallery');

        return this;
    };

    return GalleryElement.extend('GalleryElement', {

        /**
         * Get footer html
         * @memberOf GalleryElement
         * @returns {*|jQuery}
         */
        getFooter: function getFooter() {

            var counter = 0, index,
                items = this.view.elements.items;

            for (index in items) {

                if (items.hasOwnProperty(index)) {

                    if (!items[index].$.attr('style')) {
                        counter += 1;
                    }
                }
            }

            return $('<div />').text([
                counter,
                'items'
            ].join(' '));
        }

    }, BaseElement.prototype);

});