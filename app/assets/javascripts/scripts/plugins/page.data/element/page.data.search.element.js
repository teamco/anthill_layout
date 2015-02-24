/**
 * Created by i061485 on 3/25/14.
 */

define([
    'modules/Element'
], function definePageDataSearch(BaseElement) {

    /**
     * Define Search Element
     * @param view
     * @param opts
     * @returns {PageDataSearchElement}
     * @constructor
     * @class PageDataSearchElement
     * @extends BaseElement
     */
    var PageDataSearchElement = function PageDataSearchElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        return this.renderData();
    };

    return PageDataSearchElement.extend('PageDataSearchElement', {

        /**
         * Render search
         * @member PageDataSearchElement
         * @returns {PageDataSearchElement}
         */
        renderData: function renderData() {

            /**
             * Get view
             * @type {PageDataView}
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