/**
 * Created by i061485 on 3/25/14.
 */

define([
    'modules/Element'
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
         * @memberOf GalleryProvidersElement
         * @param data
         * @param currentProvider
         * @returns {GalleryProvidersElement}
         */
        renderData: function renderData(data, currentProvider) {

            var combo = [];

            for (var index in data) {

                if (data.hasOwnProperty(index)) {

                    combo.push({
                        type: 'text',
                        key: data[index].key,
                        value: data[index].name
                    });
                }
            }

            this.$.append(
                this.renderCombobox(
                    combo,
                    currentProvider.name,
                    '',
                    'galleryProviders', {
                        type: 'click.changeProvider',
                        callback: this.view.controller.changeProvider.bind(
                            this.view.controller
                        )
                    },
                    true
                )
            );

            return this;
        }

    }, BaseElement.prototype);

});