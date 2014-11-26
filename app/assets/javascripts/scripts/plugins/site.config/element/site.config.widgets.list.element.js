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
                                        index === 'name' ?
                                        '<span>' + row[index] + '</span>' :
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

            if (l > 0) {

                // Append header
                $ul.append(
                    _renderRow(data[0], 'header')
                );

                for (; i < l; i++) {
                    $ul.append(
                        _renderRow(data[i], 'row')
                    );
                }

            } else {

                $ul.append(
                    $('<li class="no-data" />').text('No data')
                );
            }

            return this.bindWidgetEdit($ul);
        },

        bindWidgetEdit: function bindWidgetEdit($ul) {

            /**
             * Get scope
             * @type {SiteConfig}
             */
            var scope = this.view.scope;

            $('li.name', $ul).on('click.edit', function clickEdit() {

                scope.observer.publish(
                    scope.eventmanager.eventList.widgetEditor,
                    $('.resource', $(this).parent()).text()
                );
            });

            return $ul;
        },

        /**
         * Render widget generator form
         * @member SiteConfigWidgetsListElement
         * @param {Array} widgets
         * @param {object} [widgetData]
         * @param {Array} types
         * @returns {SiteConfigWidgetsListElement}
         */
        renderWidgetGeneratorForm: function renderWidgetGeneratorForm(widgets, types, widgetData) {

            var index, $field,
                widget = widgets[0],
                $ul = $('<ul />');

            widgetData = widgetData || {};
            widgetData.dimensions = widgetData.dimensions || {};

            /**
             * Get renderer
             * @param {function} renderer
             * @param {string} index
             * @param {string} value
             * @param {{[mask]: RegExp}} [validation]
             * @returns {*}
             * @private
             */
            function _getRenderer(renderer, index, value, validation) {

                // Define opts
                var opts = {
                    name: index,
                    text: index,
                    placeholder: 'Enter ' + index,
                    disabled: false,
                    visible: true,
                    value: value,
                    validate: false
                };

                if (validation) {
                    opts.validate = {
                        mask: validation.mask,
                        blank: false
                    };
                }

                if (widgetData.name && index === 'resource') {
                    opts.disabled = true;
                }

                var $li = $('<li />').addClass(index);

                if (index === 'thumbnail') {

                    opts.text += ' data-uri';

                    $li.append(
                        $('<img />').attr({
                            src: value,
                            alt: index
                        })
                    );

                    opts.monitor = {
                        events: ['change.' + index],
                        callback: function onChange() {
                            $('img', $(this).parent()).attr({
                                src: this.value
                            });
                        }
                    };
                }

                $li.append(renderer(opts));

                if (index === 'thumbnail') {
                    $li.append(
                        $('<div />').addClass('clear')
                    );
                }

                return $li;
            }

            /**
             * Get scope
             * @type {SiteConfig}
             */
            var scope = this.view.scope;

            $ul.append(
                this.cloneFromField(widgets)
            );

            for (index in widget) {

                if (widget.hasOwnProperty(index)) {

                    switch (index) {

                        case 'name':
                        case 'resource':
                            $field = _getRenderer(
                                this.renderTextField.bind(this),
                                index,
                                widgetData[index],
                                {mask: /\w+$/}
                            );
                            break;

                        case 'dimensions':
                            $field = [
                                _getRenderer(
                                    this.renderTextField.bind(this),
                                    'width',
                                    widgetData[index].width,
                                    {mask: /^\d+$/}
                                ),
                                _getRenderer(
                                    this.renderTextField.bind(this),
                                    'height',
                                    widgetData[index].height,
                                    {mask: /^\d+$/}
                                )
                            ];
                            break;

                        case 'description':
                            $field = _getRenderer(
                                this.renderTextArea.bind(this),
                                index,
                                widgetData[index],
                                {}
                            );
                            break;

                        case 'thumbnail':
                            scope.base.isDataURL();
                            scope.base.isUrl();
                            $field = _getRenderer(
                                this.renderTextArea.bind(this),
                                index,
                                widgetData[index], {
                                    mask: [
                                        scope.base.isDataURL.regex,
                                        scope.base.isUrl.regex
                                    ]
                                }
                            );
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
                                    (types[widgetData[index]] || sorted[0].value),
                                    index,
                                    'category',
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

            return $ul;
        },

        /**
         * Render clone from field
         * @member SiteConfigWidgetsListElement
         * @param widgets
         * @returns {*[]}
         */
        cloneFromField: function cloneFromField(widgets) {

            /**
             * Define toggle
             * @private
             */
            function _toggleClone() {
                this.isDisabledComboBox($combo) ?
                    this.enableComboBox($combo) :
                    this.disableComboBox($combo);
            }

            // Define data
            var data = {},
                i = 0, l = widgets.length,
                widget;

            for (; i < l; i++) {
                widget = widgets[i];
                data[i] = {
                    key: widget.resource,
                    name: widget.name
                }
            }

            // Define name
            var name = 'new.template';

            /**
             * Define checkbox
             * @type {*|jQuery}
             */
            var $checkbox = $('<li />').
                addClass([
                    ['site-config', name.humanize().toClassName(), 'prefs'].join('-'),
                    'checkbox'
                ].join(' ')).
                append(this.renderCheckbox({
                    name: name,
                    text: name.humanize(),
                    checked: true,
                    value: true,
                    disabled: false,
                    visible: true,
                    monitor: {
                        events: ['click.combo'],
                        callback: _toggleClone.bind(this)
                    }
                })
            );

            /**
             * Define sorted data
             * @type {Array}
             */
            var sorted = this.sortComboBoxData(data);

            /**
             * Define combo
             * @type {*|jQuery}
             */
            var $combo = $('<li />').addClass('clone-template').append(
                this.renderCombobox(
                    sorted,
                    data[0].name,
                    'clone from',
                    'template',
                    undefined,
                    true
                )
            );

            return [$checkbox, $combo];
        }

    }, BaseElement.prototype, GalleryProvidersElement.prototype);
});