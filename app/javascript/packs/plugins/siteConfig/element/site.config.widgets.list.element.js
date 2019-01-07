/**
 * Created by teamco on 7/31/14.
 */

import {PluginElement} from '../../plugin.element';
import {GalleryProvidersElement} from '../../gallery/element/gallery.providers.element';
import {aggregation} from '../../../lib/extends/aggregation';

/**
 * @class SiteConfigWidgetsListElement
 * @extends {PluginElement, GalleryProvidersElement}
 */
export class SiteConfigWidgetsListElement extends aggregation(PluginElement, GalleryProvidersElement) {

  /**
   * @constructor
   * @param view
   * @param opts
   */
  constructor(view, opts) {
    super('SiteConfigWidgetsListElement', view, false);
    this._config(view, opts, $('<div />')).build({
      $container: opts.$container
    });

    /**
     * Define disabled fields
     * @property SiteConfigWidgetsListElement
     * @type {boolean}
     */
    this.disabled = false;
  }

  /**
   * Render widgets list
   * @memberOf SiteConfigWidgetsListElement
   * @param data
   * @param show
   * @return {SiteConfigWidgetsListElement}
   */
  renderWidgetsList(data, show) {

    /**
     * Render row
     * @param row
     * @param cell
     * @returns {string}
     * @private
     */
    function _renderRow(row, cell) {

      let html = [], index, tr, key;

      for (index in row) {

        if (row.hasOwnProperty(index) && show.indexOf(index) > -1) {

          key = 1;
          tr = [];

          if (index === 'name') key = 0;
          if (index === 'thumbnail') key = 2;

          const style = index === 'thumbnail' ? 'icon' : index;

          tr[key] = [
            '<', cell, ' class="', style, '">',
            cell === 'th' ?
                style : index === 'thumbnail' && cell === 'td' ?
                '<img alt="' + index + '" src="' + row[index] + '"/>' :
                index === 'name' ?
                    '<span>' + row[index] + '</span>' :
                    row[index],
            '</', cell, '>'
          ].join('');

          html[key] = tr.join('');
        }
      }

      return html.join('');
    }

    let i = 0, l = data.length;

    const $table = $('<table class="table" />');

    if (l > 0) {
      data[0].thumbnail = '';

      $table.append('<thead><tr></tr></thead>');

      // Append header
      $table.find('thead tr').append(_renderRow(data[0], 'th'));

      // Append body
      $table.append('<tbody />');

      // Get tbody
      const $tbody = $table.find('tbody');

      for (; i < l; i++) {

        data[i].thumbnail = this.fetchExternalResourceThumbnail(data[i]);

        // Append rows
        $tbody.append($('<tr />').append(_renderRow(data[i], 'td')));
      }

    } else {

      $table.append(
          $('<tr class="no-data" />').append(
              $('<td />').text('No data')
          )
      );
    }

    this.bindWidgetSort($table);

    return this.bindWidgetEdit($table);
  }

  /**
   * Bind widget edit
   * @memberOf SiteConfigWidgetsListElement
   * @param $table
   * @returns {*}
   */
  bindWidgetEdit($table) {

    /**
     * Get scope
     * @type {SiteConfig}
     */
    const scope = this.view.scope;

    $('tbody .name', $table).on('click.edit', function() {
      scope.observer.publish(
          scope.eventManager.eventList.widgetEditor,
          $('td.resource', $(this).parent()).text()
      );
    });

    return $table;
  }

  /**
   * Bind widget sort
   * @memberOf SiteConfigWidgetsListElement
   * @param $table
   */
  bindWidgetSort($table) {

    // Sort by name
    $('thead .name', $table).on('click.sort', this.sortTextElements.bind({
          $element: this,
          $container: $table,
          which: 'tbody > tr',
          selector: 'td.name > span'
        })
    );

    // Sort by resource
    $('thead .resource', $table).on('click.sort', this.sortTextElements.bind({
          $element: this,
          $container: $table,
          which: 'tbody > tr',
          selector: 'td.resource'
        })
    );
  }

  /**
   * Get renderer
   * @memberOf SiteConfigWidgetsListElement
   * @param {Function|Renderer} renderer
   * @param {string} index
   * @param {string|boolean} value
   * @param {{[mask]: RegExp}} [validation]
   * @param [monitor]
   * @returns {*}
   * @private
   */
  _getRenderer(renderer, index, value, validation,
      monitor) {

    // Define opts
    const opts = {
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
    const $element = this;

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

    const $div = $('<div />').addClass(index);

    if (index === 'thumbnail') {

      opts.text += ' data-uri';

      $div.append(
          $('<img />').attr({
            src: value,
            alt: index
          })
      );

      opts.monitor = {
        events: ['change.' + index],
        callback() {

          /**
           * Convert to Base64
           * @private
           */
          function _toBase64() {
            if ($element.base.isUrl(value)) {
              $element.base.lib.image.toDataURL(
                  value,
                  function _base64Callback(base64Img) {
                    //_resize(base64Img);
                    $input.val(base64Img ? base64Img : value);
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
                function(base64Img) {
                  $input.val(base64Img ? base64Img : value);
                }
            );
          }

          /**
           * Define $input
           * @type {*|jQuery}
           */
          const $input = $(this),
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

    $div.prepend(renderer(opts));

    return $div;
  }

  /**
   * Render widget generator form
   * @memberOf SiteConfigWidgetsListElement
   * @param {Array} widgets
   * @param {object} [widgetData]
   * @param {Array} types
   * @param {boolean} clone
   * @returns {*}
   */
  renderWidgetGeneratorForm(widgets,
      types, widgetData, clone) {

    let index, $field;
    const widget = widgets[0] ? widgets[0] : widgets,
        $element = this,
        $div = $('<div />');

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
    const scope = $element.view.scope;

    if (clone) {
      $div.append(
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
                  callback(e) {
                    $('input[name="resource"]').val(
                        e.target.value.toResource()
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
                  $element.renderNumberField.bind($element),
                  'width',
                  widgetData[index].width,
                  {mask: /^\d+$/}
              ),
              this._getRenderer(
                  $element.renderNumberField.bind($element),
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
            let data = {}, type;

            for (type in types) {
              if (types.hasOwnProperty(type)) {
                data[type] = {
                  key: type,
                  name: types[type]
                };
              }
            }

            /**
             * Define sorted data
             * @type {Array}
             */
            const sorted = $element.sortComboBoxData(data);

            $field = $('<div class="input-group input-group-sm" />').append(
                this.renderLabel(undefined, index, '', true),
                $element.renderDropDown(
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
        }

        $div.append($field);
      }
    }

    return $div;
  }

  /**
   * Render widget external form
   * @param {Array} widgets
   * @param {object} [widgetData]
   * @param {Array} types
   * @returns {SiteConfigWidgetsListElement}
   */
  renderWidgetExternalForm(widgets, types,
      widgetData) {

    let index, $field;
    const widget = widgets[0] ? widgets[0] : widgets,
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
      const $modal = $element.view.elements.$modal;

      /**
       * Get widget
       * @type {Object}
       */
      const widget = data.widget;

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
     * @param {Event} e
     * @private
     */
    function _readData(e) {

      /**
       * Get create new widget route
       * @type {Routes.resources.fetchExternalWidget|*}
       */
      const route = $element.view.controller.resources.fetchExternalWidget;

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
    const scope = $element.view.scope;

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
        }

        $ul.append($field);
      }
    }

    return $ul;
  }

  /**
   * Render clone from field
   * @memberOf SiteConfigWidgetsListElement
   * @param widgets
   * @returns {*[]}
   */
  cloneFromField(widgets) {

    const $element = this;

    /**
     * Define toggle
     * @private
     */
    function _toggleClone(e) {
      if ($element.isDisabledComboBox($combo)) {
        $element.enableComboBox($combo);
        e.target.value = false;

      } else {
        $element.disableComboBox($combo);
        e.target.value = true;
      }
    }

    // Define data
    const data = {}, l = widgets.length;
    let i = 0, widget;

    for (; i < l; i++) {
      widget = widgets[i];
      data[i] = {
        key: widget.resource,
        name: widget.name
      };
    }

    // Define name
    const name = 'scratch';

    /**
     * Define checkbox
     * @type {*|jQuery}
     */
    const $checkbox = $('<div class="checkbox from-scratch" />').append(
        this.renderCheckbox({
          name: name,
          text: 'Make from ' + name,
          checked: true,
          value: true,
          disabled: false,
          visible: true,
          monitor: {
            events: ['click.combo'],
            callback: _toggleClone
          }
        })
    );

    /**
     * Define sorted data
     * @type {Array}
     */
    const sorted = $element.sortComboBoxData(data);

    /**
     * Define combo
     * @type {*|jQuery}
     */
    const $combo = $('<div class="clone-from" />').append(
        $element.renderDropDown(
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
  }

  /**
   * Get resource value
   * @memberOf SiteConfigWidgetsListElement
   * @returns {string}
   */
  getResource() {

    /**
     * Get $modal
     * @type {ModalElement}
     */
    const $modal = this.view.get$modal();

    if ($modal) {
      return $('input[name="resource"]', $modal.$).val();
    }
  }
}
