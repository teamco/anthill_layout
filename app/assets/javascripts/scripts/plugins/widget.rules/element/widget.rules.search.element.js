/**
 * Created by i061485 on 3/25/14.
 */

define([
    'modules/Element'
], function defineWidgetRulesSearch(BaseElement) {

    /**
     * Define Search Element
     * @param view
     * @param opts
     * @returns {WidgetRulesSearchElement}
     * @constructor
     * @class WidgetRulesSearchElement
     * @extends BaseElement
     */
    var WidgetRulesSearchElement = function WidgetRulesSearchElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        return this.renderData();
    };

    return WidgetRulesSearchElement.extend('WidgetRulesSearchElement', {

        /**
         * Render search
         * @member WidgetRulesSearchElement
         * @returns {WidgetRulesSearchElement}
         */
        renderData: function renderData() {

            /**
             * Get view
             * @type {WidgetRulesView}
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