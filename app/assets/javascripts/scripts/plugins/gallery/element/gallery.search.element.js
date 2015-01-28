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

            this.$.append(

                this.renderTextField({
                    text: '',
                    name: 'search',
                    placeholder: 'Search',
                    monitor: {
                        events: ['keyup.gallery-search'],
                        callback: this.view.controller.filterResults.bind(
                            this.view.controller
                        )
                    },
                    visible: true
                })
            );

            return this;
        },

        /**
         * Focus search field
         * @member GallerySearchElement
         */
        focus: function focus() {
            $('input', this.$).focus();
        }

    }, BaseElement.prototype);

});