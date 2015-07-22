/**
 * Created by teamco on 3/25/14.
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

    return GalleryProvidersElement.extend('GalleryProvidersElement', {

        /**
         * Prepare data for combo box
         * @memberOf GalleryProvidersElement
         * @param data
         * @returns {*}
         */
        sortComboBoxData: function sortComboBoxData(data) {

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

            return combo.sortByValue('value', 'string');
        },

        /**
         * Render data
         * @memberOf GalleryProvidersElement
         * @param data
         * @param currentProvider
         * @returns {GalleryProvidersElement}
         */
        renderData: function renderData(data, currentProvider) {

            if (!currentProvider) {
                this.view.scope.logger.warn(
                    'Undefined current provider'
                );
                return false;
            }

            this.$.append(
                this.renderCombobox(
                    this.sortComboBoxData(data),
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