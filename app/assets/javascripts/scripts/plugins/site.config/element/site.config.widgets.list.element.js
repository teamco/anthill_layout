/**
 * Created by i061485 on 7/31/14.
 */

define([
    'modules/Element'
], function defineSiteConfigWidgetsListElement(BaseElement) {

    /**
     * Define SiteConfigWidgetsListElement
     * @class SiteConfigWidgetsListElement
     * @constructor
     * @param {SiteConfigView} view
     * @param opts
     * @extends BaseElement
     * @returns {SiteConfigWidgetsListElement}
     */
    var SiteConfigWidgetsListElement = function SiteConfigWidgetsListElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: false
        });

        this.renderList(opts.data, opts.show);

        return this;
    };

    return SiteConfigWidgetsListElement.extend('SiteConfigWidgetsListElement', {

        /**
         * Render list
         * @member SiteConfigWidgetsListElement
         * @param data
         * @param show
         */
        renderList: function renderList(data, show) {

            /**
             * Render row
             * @param row
             * @param style
             * @returns {string[]}
             * @private
             */
            function _renderRow(row, style) {

                var html = [],
                    index;

                for (index in row) {

                    if (row.hasOwnProperty(index)) {

                        if (show.indexOf(index) > -1) {

                            html.push([
                                '<li class="', index.toDash(), '">',
                                style === 'header' ?
                                    index === 'thumbnail' ? 'icon' : index :
                                    index === 'thumbnail' && style === 'row' ?
                                    '<img alt="' + index + '" src="' + row[index] + '"/>' :
                                        row[index],
                                '</li>'
                            ].join(''));
                        }
                    }
                }

                return [
                    '<li class="', style, '"><ul>',
                    html.join(''),
                    '</ul></li>'
                ].join('');
            }

            var i = 0,
                l = data.length;

            var $ul = $('<ul />');

            // Append header
            $ul.append(
                _renderRow(data[0], 'header')
            );

            for (; i < l; i++) {

                $ul.append(
                    _renderRow(data[i], 'row')
                );
            }

            this.$.append($ul);
        },

        renderWidgetGeneratorForm: function renderWidgetGeneratorForm() {

            this.empty();

            return this.$;
        }

    }, BaseElement.prototype);
});