/**
 * Created by teamco on 7/31/14.
 */

define([
  'plugins/plugin.element',
  'plugins/gallery/element/gallery.providers.element'
], function defineSiteConfigWidgetsListElement(PluginElement,
    GalleryProvidersElement) {

  /**
   * Define SiteConfigWidgetsListElement
   * @class SiteConfigWidgetsListElement
   * @constructor
   * @param {SiteConfigView} view
   * @param opts
   * @extends AntHill
   * @extends PluginElement
   * @extends Renderer
   * @extends GalleryProvidersElement
   * @returns {SiteConfigWidgetsListElement}
   */
  var SiteConfigWidgetsListElement = function SiteConfigWidgetsListElement(view,
      opts) {

    this._config(view, opts, $('<div />')).build({
      $container: opts.$container
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
       * @param cell
       * @returns {string}
       * @private
       */
      function _renderRow(row, cell) {

        var html = [],
            index, tr, key;

        for (index in row) {

          if (row.hasOwnProperty(index) && show.indexOf(index) > -1) {

            key = 1;
            tr = [];

            if (index === 'name') key = 0;
            if (index === 'thumbnail') key = 2;

            var style = index === 'thumbnail' ? 'icon' : index;

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

      var i = 0,
          l = data.length;

      var $table = $('<table class="table" />');

      if (l > 0) {
        data[0].thumbnail = '';

        $table.append('<thead><tr></tr></thead>');

        // Append header
        $table.find('thead tr').append(
            _renderRow(data[0], 'th')
        );

        // Append body
        $table.append('<tbody />');

        // Get tbody
        var $tbody = $table.find('tbody');

        for (; i < l; i++) {

          data[i].thumbnail = this.fetchExternalResourceThumbnail(data[i]);

          // Append rows
          $tbody.append(
              $('<tr />').append(
                  _renderRow(data[i], 'td')
              )
          );
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
    },

    /**
     * Bind widget edit
     * @memberOf SiteConfigWidgetsListElement
     * @param $table
     * @returns {*}
     */
    bindWidgetEdit: function bindWidgetEdit($table) {

      /**
       * Get scope
       * @type {SiteConfig}
       */
      var scope = this.view.scope;

      $('tbody .name', $table).on('click.edit', function clickEdit() {

        scope.observer.publish(
            scope.eventmanager.eventList.widgetEditor,
            $('td.resource', $(this).parent()).text()
        );
      });

      return $table;
    },

    /**
     * Bind widget sort
     * @memberOf SiteConfigWidgetsListElement
     * @param $table
     */
    bindWidgetSort: function bindWidgetSort($table) {

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
    },

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
    _getRenderer: function _getRenderer(renderer, index, value, validation,
        monitor) {

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

      var $div = $('<div />').addClass(index);

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
          callback: function onChange() {

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
                      $input.val(base64Img ? base64Img : value)
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
                  function (base64Img) {
                    $input.val(base64Img ? base64Img : value);
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

      $div.prepend(renderer(opts));

      return $div;
    },

    /**
     * Render widget generator form
     * @memberOf SiteConfigWidgetsListElement
     * @param {Array} widgets
     * @param {object} [widgetData]
     * @param {Array} types
     * @param {boolean} clone
     * @returns {*}
     */
    renderWidgetGeneratorForm: function renderWidgetGeneratorForm(widgets,
        types, widgetData, clone) {

      var index, $field,
          widget = widgets[0] ? widgets[0] : widgets,
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
      var scope = $element.view.scope;

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
                    callback: function updateResource(e) {
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

              $field = $('<div class="input-group input-group-sm" />').append(
                  this.renderLabel(undefined, index, '', true),
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

          $div.append($field);
        }
      }

      return $div;
    },

    /**
     * Render widget external form
     * @param {Array} widgets
     * @param {object} [widgetData]
     * @param {Array} types
     * @returns {SiteConfigWidgetsListElement}
     */
    renderWidgetExternalForm: function renderWidgetExternalForm(widgets, types,
        widgetData) {

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
          $element.view.scope.logger.warn('Unable to parse url', data, status,
              xhr);
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

      var $element = this;

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
      var $checkbox = $('<div class="checkbox from-scratch" />').append(
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
      var sorted = $element.sortComboBoxData(data);

      /**
       * Define combo
       * @type {*|jQuery}
       */
      var $combo = $('<div class="clone-from" />').append(
          $element.renderCombobox(
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

  }, PluginElement.prototype, GalleryProvidersElement.prototype);
});