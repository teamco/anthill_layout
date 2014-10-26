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

        this.renderList(opts.data);

        return this;
    };

    return SiteConfigWidgetsListElement.extend('SiteConfigWidgetsListElement', {

        renderList: function renderList(data) {

            function _renderHeader(header) {

                var html = [],
                    index;

                for (index in header) {

                    if (header.hasOwnProperty(index)) {

                        html.push([
                            '<li class="', index.toDash(), '">',
                            index,
                            '</li>'
                        ].join(''));
                    }
                }

                return [
                    '<li class="header"><ul>',
                    html.join(''),
                    '</ul></li>'
                ];
            }

            var i = 0,
                l = data.length;

            var $ul = $('<ul />');

            // Append header
            $ul.append(_renderHeader(data[0]));

            for (; i < l; i++) {

                var widget = data[i];


            }
        }

    }, BaseElement.prototype);
});