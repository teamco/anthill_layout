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
     * @returns {ProvidersElement}
     * @constructor
     * @class ProvidersElement
     * @extends BaseElement
     */
    var ProvidersElement = function ProvidersElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        return this.renderData(
            opts.data,
            opts.default
        );
    };

    return ProvidersElement.extend({

        /**
         * Render data
         * @member ProvidersElement
         * @param data
         * @param defaultProvider
         * @returns {BaseElement}
         */
        renderData: function renderData(data, defaultProvider) {

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
                    defaultProvider.name,
                    ''
                )
            );

            return this;
        }

    }, BaseElement.prototype);

});