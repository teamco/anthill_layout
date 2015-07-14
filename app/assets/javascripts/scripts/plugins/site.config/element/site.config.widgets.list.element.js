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
     * @extends AntHill
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

        /**
         * Define disabled fields
         * @property SiteConfigWidgetsListElement
         * @type {boolean}
         */
        this.disabled = false;

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
                    index, tr, key;

                for (index in row) {

                    if (row.hasOwnProperty(index)) {

                        if (show.indexOf(index) > -1) {

                            key = 1;
                            tr = [];

                            if (index === 'name') key = 0;
                            if (index === 'thumbnail') key = 2;

                            tr[key] = [
                                '<li class="', index.toDash(), '">',
                                style === 'header' ?
                                    index === 'thumbnail' ? 'icon' : index :
                                    index === 'thumbnail' && style === 'row' ?
                                    '<img alt="' + index + '" src="' + row[index] + '"/>' :
                                        index === 'name' ?
                                        '<span>' + row[index] + '</span>' :
                                            row[index],
                                '</li>'
                            ].join('');

                            html.push(tr.join(''));
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

            this.bindWidgetSort($ul);

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

            $('li.row li.name', $ul).on('click.edit', function clickEdit() {

                scope.observer.publish(
                    scope.eventmanager.eventList.widgetEditor,
                    $('.resource', $(this).parent()).text()
                );
            });

            return $ul;
        },

        /**
         * Bind widget sort
         * @memberOf SiteConfigWidgetsListElement
         * @param $ul
         */
        bindWidgetSort: function bindWidgetSort($ul) {

            // Sort by name
            $('li.header li.name', $ul).on('click.sort', this.sortTextElements.bind({
                    $element: this,
                    $container: $ul,
                    which: 'li.row',
                    selector: 'li.name > span'
                })
            );

            // Sort by resource
            $('li.header li.resource', $ul).on('click.sort', this.sortTextElements.bind({
                    $element: this,
                    $container: $ul,
                    which: 'li.row',
                    selector: 'li.resource'
                })
            );
        },

        /**
         * Get renderer
         * @memberOf SiteConfigWidgetsListElement
         * @param {Renderer} renderer
         * @param {string} index
         * @param {string|boolean} value
         * @param {{[mask]: RegExp}} [validation]
         * @param [monitor]
         * @returns {*}
         * @private
         */
        _getRenderer: function _getRenderer(renderer, index, value, validation, monitor) {

            // Define opts
            var opts = {
                name: index,
                text: index,
                placeholder: 'Enter ' + index,
                disabled: this.base.defineBoolean(this.disabled, false, true),
                readonly: false,
                visible: true,
                value: value,
                validate: false,
                monitor: monitor
            };

            /**
             * Get element
             * @type {SiteConfigWidgetsListElement}
             */
            var $element = this;

            if (validation) {
                opts.validate = {
                    mask: validation.mask,
                    blank: false
                };
            }

            if (monitor) {
                opts.monitor = monitor;
            }

            if (index === 'resource') {
                opts.readonly = opts.disabled;
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
                            if ($element.base.isUrl(value)) {
                                $element.base.lib.image.toDataURL(
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
                            $element.base.lib.image.resizeDataURL(
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
             * Define disabled fields
             * @property SiteConfigWidgetsListElement
             * @type {boolean}
             */
            this.disabled = false;

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
                            $field = this._getRenderer(
                                $element.renderTextField.bind($element),
                                index,
                                widgetData[index],
                                {}, {
                                    events: ['blur.resource'],
                                    callback: function updateResource(e) {
                                        $('input[name="resource"]').val(
                                            e.target.value.toRecource()
                                        );
                                    }
                                }
                            );
                            break;

                        case 'resource':
                            $field = this._getRenderer(
                                $element.renderTextField.bind($element),
                                index,
                                widgetData[index],
                                {}
                            );
                            break;

                        case 'dimensions':
                            $field = [
                                this._getRenderer(
                                    $element.renderTextField.bind($element),
                                    'width',
                                    widgetData[index].width,
                                    {mask: /^\d+$/}
                                ),
                                this._getRenderer(
                                    $element.renderTextField.bind($element),
                                    'height',
                                    widgetData[index].height,
                                    {mask: /^\d+$/}
                                )
                            ];
                            break;

                        case 'description':
                            $field = this._getRenderer(
                                $element.renderTextArea.bind($element),
                                index,
                                widgetData[index],
                                {}
                            );
                            break;

                        case 'thumbnail':
                            scope.base.isDataURL();
                            scope.base.isUrl();
                            $field = this._getRenderer(
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
         * Render widget external form
         * @param {Array} widgets
         * @param {object} [widgetData]
         * @param {Array} types
         * @returns {SiteConfigWidgetsListElement}
         */
        renderWidgetExternalForm: function renderWidgetExternalForm(widgets, types, widgetData) {

            var index, $field,
                widget = widgets[0] ? widgets[0] : widgets,
                $ul = $('<ul />'),
                $element = this;

            widgetData = widgetData || {};
            widgetData.dimensions = widgetData.dimensions || {};

            /**
             * Define disabled fields
             * @property SiteConfigWidgetsListElement
             * @type {boolean}
             */
            this.disabled = true;

            /**
             * Update data
             * @param {{widget: object}} data
             * @param {string} status
             * @param xhr
             * @private
             */
            function _updateData(data, status, xhr) {

                /**
                 * Get $modal
                 * @type {ModalElement}
                 */
                var $modal = $element.view.elements.$modal,
                    widget = data.widget;

                if (!widget.name.length) {
                    $element.view.scope.logger.warn('Unable to parse url', data, status, xhr);
                    return false;
                }

                $('input[name="name"]', $modal.$).val(widget.name);
                $('p[name="description"]', $modal.$).text(widget.description);
                $('input[name="width"]', $modal.$).val(widget.width);
                $('input[name="height"]', $modal.$).val(widget.height);
                $('input[name="resource"]', $modal.$).val(widget.resource);
                $('input[name="type"]', $modal.$).val(widget.type);
                $('p[name="thumbnail"]', $modal.$).text(widget.thumbnail);
                $('li.thumbnail img', $modal.$).attr({src: widget.thumbnail});
            }

            /**
             * Read data
             * @param e
             * @private
             */
            function _readData(e) {

                /**
                 * Get create new widget route
                 * @type {Routes.resources.fetchExternalWidget|*}
                 */
                var route = $element.view.controller.resources.fetchExternalWidget;

                if (!e.target.value.length) {
                    $element.view.scope.logger.debug('Initial content', e);
                    return false;
                }

                $.ajax({

                    url: route[0],
                    method: route[1],
                    data: $element.view.controller.prepareXhrData({
                        author_widget: {url: e.target.value}
                    })

                }).done(_updateData.bind(this));
            }

            /**
             * Get scope
             * @type {SiteConfig}
             */
            var scope = $element.view.scope;

            for (index in widget) {

                if (widget.hasOwnProperty(index)) {

                    switch (index) {

                        case 'name':
                        case 'resource':
                            $field = this._getRenderer(
                                $element.renderTextField.bind($element),
                                index,
                                widgetData[index],
                                {}
                            );
                            break;

                        case 'external_resource':

                            $field = this._getRenderer(
                                $element.renderTextField.bind($element),
                                'url',
                                widgetData[index],
                                {}, {
                                    events: ['blur.url'],
                                    callback: _readData
                                }
                            );

                            $field.find('input').prop('disabled', false);
                            break;

                        case 'dimensions':
                            $field = [
                                this._getRenderer(
                                    $element.renderTextField.bind($element),
                                    'width',
                                    widgetData[index].width,
                                    {mask: /^\d+$/}
                                ),
                                this._getRenderer(
                                    $element.renderTextField.bind($element),
                                    'height',
                                    widgetData[index].height,
                                    {mask: /^\d+$/}
                                )
                            ];
                            break;

                        case 'description':
                            $field = this._getRenderer(
                                $element.renderTextArea.bind($element),
                                index,
                                widgetData[index],
                                {}
                            );
                            break;

                        case 'thumbnail':
                            scope.base.isDataURL();
                            scope.base.isUrl();
                            $field = this._getRenderer(
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

                            $field = this._getRenderer(
                                $element.renderTextField.bind($element),
                                index,
                                types[widgetData[index]],
                                {}
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