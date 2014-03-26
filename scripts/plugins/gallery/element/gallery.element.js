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
         * @member GalleryElement
         * @returns {*|jQuery}
         */
        getFooter: function getFooter() {
            return $('<div />').text([
                this.view.scope.controller.getCurrentProvider().data.length,
                'items'
            ].join(' '));
        }

    }, BaseElement.prototype);

});