/**
 * Created by i061485 on 3/25/14.
 */

define([
    'modules/Element'
], function defineSearch(BaseElement) {

    /**
     * Define Search Element
     * @param view
     * @param opts
     * @returns {GallerySearchElement}
     * @constructor
     * @class GallerySearchElement
     * @extends BaseElement
     */
    var GallerySearchElement = function GallerySearchElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        return this.renderData();
    };

    return GallerySearchElement.extend('GallerySearchElement', {

        /**
         * Render search
         * @member GallerySearchElement
         * @returns {GallerySearchElement}
         */
        renderData: function renderData() {

            /**
             * Get view
             * @type {GalleryView}
             */
            var view = this.view;

            /**
             * Define $filter
             * @type {FilterRenderer}
             */
            this.$filter = this.renderFilter({
                text: '',
                name: 'search',
                placeholder: 'Search',
                visible: true,
                callback: view.updateFooterContent.bind(view)
            });

            this.$.append(this.$filter);

            return this;
        }

    }, BaseElement.prototype);

});