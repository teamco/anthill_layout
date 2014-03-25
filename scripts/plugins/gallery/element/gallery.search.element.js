/**
 * Created by i061485 on 3/25/14.
 */

define([
    'modules/element'
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

    return GallerySearchElement.extend({

        /**
         * Render search
         * @member GallerySearchElement
         * @returns {BaseElement}
         */
        renderData: function renderData() {

            this.$.append(

                this.renderTextField({
                    text: '',
                    name: 'search',
                    placeholder: 'Search'
                })
            );

            return this;
        }

    }, BaseElement.prototype);

});