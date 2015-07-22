/**
 * Created by teamco on 3/25/14.
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

        return this.renderData(
            opts.callback,
            opts.enter
        );
    };

    return FilterElement.extend('FilterElement', {

        /**
         * Render search
         * @memberOf FilterElement
         * @param {function} [callback]
         * @param {boolean} [enter]
         * @returns {FilterElement}
         */
        renderData: function renderData(callback, enter) {

            /**
             * Define $filter
             * @type {FilterRenderer}
             */
            this.$filter = this.renderFilter({
                text: '',
                name: 'filter',
                placeholder: 'Filter',
                visible: true,
                callback: callback,
                enter: enter
            });

            this.$.append(this.$filter);

            return this;
        }

    }, BaseElement.prototype);
});