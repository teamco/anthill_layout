/**
 * Created by i061485 on 3/25/14.
 */

define([
    'modules/element'
], function defineProviders(BaseElement) {

    /**
     * Define Providers Element
     * @param view
     * @param opts
     * @returns {GalleryProvidersElement}
     * @constructor
     * @class GalleryProvidersElement
     * @extends BaseElement
     */
    var GalleryProvidersElement = function GalleryProvidersElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        return this.renderData(
            opts.data,
            opts.current
        );
    };

    return GalleryProvidersElement.extend({

        /**
         * Render data
         * @member GalleryProvidersElement
         * @param data
         * @param currentProvider
         * @returns {BaseElement}
         */
        renderData: function renderData(data, currentProvider) {

            var combo = [];

            for (var index in data) {

                if (data.hasOwnProperty(index)) {

                    combo.push({
                        type: 'text',
                        value: data[index].name
                    });
                }
            }

            this.$.append(
                this.renderCombobox(
                    combo,
                    currentProvider.name,
                    ''
                )
            );

            return this;
        }

    }, BaseElement.prototype);

});