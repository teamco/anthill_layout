/**
 * Created by i061485 on 7/31/14.
 */

define([
    'modules/Element',
    'plugins/gallery/element/gallery.providers.element'
], function defineSiteConfigWidgetsListElement(BaseElement, GalleryProvidersElement) {

    /**
     * Define SiteConfigWidgetsListElement
     * @class SiteConfigWidgetsListElement
     * @constructor
     * @param {SiteConfigView} view
     * @param opts
     * @extends BaseElement
     * @extends GalleryProvidersElement
     * @returns {SiteConfigWidgetsListElement}
     */
    var SiteConfigWidgetsListElement = function SiteConfigWidgetsListElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: false
        });

        return this;
    };

    return SiteConfigWidgetsListElement.extend('SiteConfigWidgetsListElement', {

        /**
         * Render widgets list
         * @member SiteConfigWidgetsListElement
         * @param data
         * @param show
         * @return {SiteConfigWidgetsListElement}
         */
        renderWidgetsList: function renderWidgetsList(data, show) {

            /**
             * Render row
             * @param row
             * @param style
             * @returns {string}
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

            return this;
        },

        /**
         * Render widget generator form
         * @member SiteConfigWidgetsListElement
         * @param {object} widget
         * @param {Array} types
         * @returns {SiteConfigWidgetsListElement}
         */
        renderWidgetGeneratorForm: function renderWidgetGeneratorForm(widget, types) {

            var index, $field,
                $ul = $('<ul />');

            /**
             * Get renderer
             * @param {function} renderer
             * @param {string} index
             * @returns {*}
             * @private
             */
            function _getRenderer(renderer, index) {

                return $('<li />').addClass(index).append(
                    renderer({
                        name: index,
                        text: index,
                        placeholder: 'Enter ' + index,
                        disabled: false,
                        visible: true,
                        validate: false
                    })
                );
            }

            for (index in widget) {

                if (widget.hasOwnProperty(index)) {

                    switch (index) {

                        case 'name':
                        case 'resource':
                            $field = _getRenderer(this.renderTextField.bind(this), index);
                            break;

                        case 'dimensions':
                            $field = [
                                _getRenderer(this.renderTextField.bind(this), 'width'),
                                _getRenderer(this.renderTextField.bind(this), 'height')
                            ];
                            break;

                        case 'description':
                        case 'thumbnail':
                            $field = _getRenderer(this.renderTextArea.bind(this), index);
                            break;

                        case 'type':

                            // Define data
                            var data = {}, type;

                            for (type in types) {
                                if (types.hasOwnProperty(type)) {
                                    data[type] = {
                                        key: type,
                                        name: types[type]
                                    }
                                }
                            }

                            /**
                             * Define sorted data
                             * @type {Array}
                             */
                            var sorted = this.sortComboBoxData(data);

                            $field = $('<li />').addClass(index).append(
                                this.renderCombobox(
                                    sorted,
                                    sorted[0].value,
                                    index,
                                    'widgetsCategory',
                                    undefined,
                                    true
                                )
                            );
                            break;

                        default:
                            continue;
                            break;
                    }

                    $ul.append($field);
                }
            }

            this.$.append($ul);

            return this;
        }

    }, BaseElement.prototype, GalleryProvidersElement.prototype);
});