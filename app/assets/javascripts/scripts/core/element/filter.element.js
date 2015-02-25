/**
 * Created by i061485 on 3/25/14.
 */

define([
    'modules/Element'
], function defineFilter(BaseElement) {

    /**
     * Define Filter Element
     * @param view
     * @param opts
     * @returns {FilterElement}
     * @constructor
     * @class FilterElement
     * @extends BaseElement
     */
    var FilterElement = function FilterElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        return this.renderData(opts.callback);
    };

    return FilterElement.extend('FilterElement', {

        /**
         * Render search
         * @member FilterElement
         * @param {function} [callback]
         * @returns {FilterElement}
         */
        renderData: function renderData(callback) {

            /**
             * Define $filter
             * @type {FilterRenderer}
             */
            this.$filter = this.renderFilter({
                text: '',
                name: 'filter',
                placeholder: 'Filter',
                visible: true,
                callback: callback
            });

            this.$.append(this.$filter);

            return this;
        }

    }, BaseElement.prototype);
});