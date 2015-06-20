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
     * @extends Renderer
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
         * @memberOf SiteConfigWidgetsListElement
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
                data[0].thumbnail = '';

                // Append header
                $ul.append(
                    _renderRow(data[0], 'header')
                );

                for (; i < l; i++) {
                    data[i].thumbnail = '/assets/scripts/plugins/stylesheets/images/' + data[i].resource + '.png';

                    // Append rows
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

        /**
         * Bind widget edit
         * @memberOf SiteConfigWidgetsListElement
         * @param $ul
         * @returns {*}
         */
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
         * @memberOf SiteConfigWidgetsListElement
         * @param {Array} widgets
         * @param {object} [widgetData]
         * @param {Array} types
         * @param {boolean} clone
         * @returns {SiteConfigWidgetsListElement}
         */
        renderWidgetGeneratorForm: function renderWidgetGeneratorForm(widgets, types, widgetData, clone) {

            var index, $field,
                widget = widgets[0] ? widgets[0] : widgets,
                $ul = $('<ul />'),
                $element = this;

            widgetData = widgetData || {};
            widgetData.dimensions = widgetData.dimensions || {};

            /**
             * Get renderer
             * @param {function} renderer
             * @param {string} index
             * @param {string|boolean} value
             * @param {{[mask]: RegExp}} [validation]
             * @param [monitor]
             * @returns {*}
             * @private
             */
            function _getRenderer(renderer, index, value, validation, monitor) {

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

                if (monitor) {
                    opts.monitor = monitor;
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

                            /**
                             * Convert to Base64
                             * @private
                             */
                            function _toBase64() {
                                if (scope.base.isUrl(value)) {
                                    scope.base.lib.image.toDataURL(
                                        value,
                                        function (err, base64Img) {
                                            //_resize(base64Img);
                                            $input.val(
                                                base64Img ?
                                                    base64Img :
                                                    value
                                            )
                                        }
                                    );
                                }
                            }

                            /**
                             * Resize Data-Uri
                             * @param {string} data
                             * @private
                             */
                            function _resize(data) {
                                scope.base.lib.image.resizeDataURL(
                                    data,
                                    64, 64,
                                    function (err, base64Img) {
                                        $input.val(
                                            base64Img ?
                                                base64Img :
                                                value
                                        );
                                    }
                                );
                            }

                            /**
                             * Define $input
                             * @type {*|jQuery}
                             */
                            var $input = $(this),
                                value = this.value;

                            //scope.base.isUrl(value) ?
                            //    _toBase64() :
                            //    _resize(value);

                            _toBase64();

                            $('img', $input.parent()).attr({
                                src: value
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
             * Toggle external url
             * @param e
             * @private
             */
            function _toggleExternalUrl(e) {

                var $scratch = $('.site-config-scratch-prefs input', '.widget-generator-new'),
                    $combo = $('.clone-template', '.widget-generator-new'),
                    $url = $('li.url input', '.widget-generator-new'),
                    checked = $(e.target).prop('checked');

                $scratch.prop('disabled', checked);
                $url.prop('disabled', !checked);

                checked ?
                    $element.disableComboBox($combo) :
                    ($scratch.prop('checked') ?
                        $element.disableComboBox($combo) :
                        $element.enableComboBox($combo));
            }

            /**
             * Get scope
             * @type {SiteConfig}
             */
            var scope = $element.view.scope;

            if (clone) {
                $ul.append(
                    $element.cloneFromField(widgets)
                );
            }

            for (index in widget) {

                if (widget.hasOwnProperty(index)) {

                    switch (index) {

                        case 'name':
                        case 'resource':
                            $field = _getRenderer(
                                $element.renderTextField.bind($element),
                                index,
                                widgetData[index],
                                {}
                            );
                            break;

                        case 'external':

                            var $url = _getRenderer(
                                $element.renderTextField.bind($element),
                                'url',
                                widgetData[index]
                            );

                            $url.find('input').prop('disabled', true);

                            $field = [
                                _getRenderer(
                                    $element.renderCheckbox.bind($element),
                                    'external',
                                    widgetData[index] ?
                                        !!widgetData[index].length :
                                        false,
                                    {}, {
                                        events: ['click.external'],
                                        callback: _toggleExternalUrl
                                    }
                                ).addClass('checkbox'),
                                $url
                            ];
                            break;

                        case 'dimensions':
                            $field = [
                                _getRenderer(
                                    $element.renderTextField.bind($element),
                                    'width',
                                    widgetData[index].width,
                                    {mask: /^\d+$/}
                                ),
                                _getRenderer(
                                    $element.renderTextField.bind($element),
                                    'height',
                                    widgetData[index].height,
                                    {mask: /^\d+$/}
                                )
                            ];
                            break;

                        case 'description':
                            $field = _getRenderer(
                                $element.renderTextArea.bind($element),
                                index,
                                widgetData[index],
                                {}
                            );
                            break;

                        case 'thumbnail':
                            scope.base.isDataURL();
                            scope.base.isUrl();
                            $field = _getRenderer(
                                $element.renderTextArea.bind($element),
                                index,
                                widgetData[index], {
                                    mask: [
                                        scope.base.isDataURL.regex,
                                        scope.base.isUrl.regex,
                                        /^\/assets\/scripts\/plugins\/stylesheets\/images/
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
                            var sorted = $element.sortComboBoxData(data);

                            $field = $('<li />').addClass(index).append(
                                $element.renderCombobox(
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
         * @memberOf SiteConfigWidgetsListElement
         * @param widgets
         * @returns {*[]}
         */
        cloneFromField: function cloneFromField(widgets) {

            /**
             * Define toggle
             * @private
             */
            function _toggleClone(e) {
                if (this.isDisabledComboBox($combo)) {
                    this.enableComboBox($combo);
                    e.target.value = false;

                } else {
                    this.disableComboBox($combo);
                    e.target.value = true;
                }
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
            var name = 'scratch';

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
                    text: 'Make from ' + name,
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
                    undefined,
                    'clone',
                    'clone',
                    undefined,
                    true,
                    true
                )
            );

            this.disableComboBox($combo);

            return [$checkbox, $combo];
        },

        /**
         * Get resource value
         * @memberOf SiteConfigWidgetsListElement
         * @returns {string}
         */
        getResource: function getResource() {

            /**
             * Get $modal
             * @type {ModalElement}
             */
            var $modal = this.view.get$modal();

            if ($modal) {

                return $('input[name="resource"]', $modal.$).val();
            }
        }

    }, BaseElement.prototype, GalleryProvidersElement.prototype);
});