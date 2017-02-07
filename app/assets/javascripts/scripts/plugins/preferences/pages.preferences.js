/**
 * Created with RubyMine.
 * User: teamco
 * Date: 3/7/14
 * Time: 7:39 PM
 */

define([
  'plugins/preferences/preferences'
], function definePagesPreferences(BasePreferencesElement) {

  /**
   * Define prefs
   * @class PagesPreferences
   * @extends PluginElement
   * @extends Renderer
   * @extends BasePreferencesElement
   * @constructor
   */
  var PagesPreferences = function PagesPreferences() {
  };

  return PagesPreferences.extend('PagesPreferences', {

    /**
     * Render data
     * @memberOf PagesPreferences
     * @param {{data, page}} opts
     */
    renderData: function renderData(opts) {

      /**
       * Get workspace
       * @type {Workspace}
       */
      var ws = this.view.controller.getWorkspace();

      // Get ws default page config
      var config = ws.model.getConfig('page');

      // Get page prefs
      var pagePrefs = opts.page.model.getConfig('preferences');

      ws.base.isUrl();

      /**
       * Get page
       * @type {Page}
       */
      var page = opts.page;

      // Get default prefs
      var defaultPrefs = page.controller.getPreferences();

      defaultPrefs.pageUrl.monitor.callback =
          this.toggleOpenUrlInDialog.bind(this);
      defaultPrefs.pageUrl.validate.mask = ws.base.isUrl.regex;

      defaultPrefs.uuid.value = page.model.getUUID();
      defaultPrefs.pageOpenUrlInDialog.disabled =
          !(pagePrefs.pageUrl && pagePrefs.pageUrl.length);
      defaultPrefs.animateSwipe.value = config.animateSwipe;
      defaultPrefs.showInTabs.value = config.showInTabs;

      /**
       * Define dom nodes
       * @type {Array}
       */
      var nodes = [];

      /**
       * Merge prefs
       * @param defaults
       * @param prefs
       * @returns {{}}
       * @private
       */
      function _mergePrefs(defaults, prefs) {

        for (var index in prefs) {

          if (prefs.hasOwnProperty(index)) {

            if (defaults.hasOwnProperty(index)) {

              defaults[index].value = prefs[index];

            } else if (defaults.hasOwnProperty(prefs[index])) {

              // input-radio
              defaults[prefs[index]].value = true;
            }
          }
        }

        return defaults;
      }

      /**
       * Merge prefs with default data
       * @type {{}}
       */
      opts.data = _mergePrefs(
          defaultPrefs,
          $.extend(opts.data, {}, true)
      );

      for (var index in opts.data) {

        if (opts.data.hasOwnProperty(index)) {

          /**
           * Define isCheckBox
           * @type {boolean}
           */
          var isCheckBox = opts.data[index].type === 'checkbox';

          /**
           * Define class name
           * @type {string}
           */
          var className = 'page-prefs' + (isCheckBox ? ' checkbox' : '');

          nodes.push(
              $('<li />').append(
                  this.getNodeRenderer(
                      opts.data[index],
                      index.toPoint().humanize(),
                      index
                  )
              ).addClass(className)
          );
        }
      }

      var $tabs = this.renderTabs(),
          $container = this.renderTabItemsContent(),
          text = 'Meta Data';

      this.$.append($tabs, $container);

      this.addTabItem($tabs, {
        uuid: 'meta_data',
        text: text,
        $container: $container,
        content: $('<ul class="default" />').append(nodes)
      }, true);

      text = 'Layout';
      this.addTabItem($tabs, {
        uuid: 'layout',
        text: text,
        $container: $container,
        content: this.renderLayoutPrefs(opts.page)
      });

      var node = this.renderWidgetsPrefs(opts.page);
      this.addTabItem($tabs, {
        uuid: 'widgets',
        text: node[1],
        $container: $container,
        content: node[0]
      });
    },

    /**
     * Render Layout prefs
     * @memberOf PagesPreferences
     * @param {Event} e
     * @returns {*}
     */
    toggleOpenUrlInDialog: function toggleOpenUrlInDialog(e) {

      var url = e.target.value,
          $toggleDialog = $('input[name="pageOpenUrlInDialog"]');

      $toggleDialog.prop({disabled: !url.length})
    },

    /**
     * Render Layout prefs
     * @memberOf PagesPreferences
     * @param {Page} page
     * @returns {*}
     */
    renderLayoutPrefs: function renderLayoutPrefs(page) {

      /**
       * Define layout
       * @type {Layout}
       */
      var layout = page.controller.getLayout(),
          workspace = page.controller.getContainment();

      var modes = page.LAYOUT_MODES;

      /**
       * Define layout container
       * @type {*|jQuery}
       */
      var $ul = $('<ul class="page-layout-prefs" />');

      /**
       * Define dom prefs
       * @type {Number}
       */
      var cellWidth = layout.controller.minCellWidth();

      /**
       * Get static width value
       * @type {boolean|*}
       */
      var staticWidth = workspace.model.getConfig('preferences').staticWidth;

      /**
       * Get page scroll height
       * @type {string}
       */
      var pageScrollHeight = page.model.getConfig(
          'preferences').pageScrollHeight;

      /**
       * Get page width
       * @type {number|string}
       */
      var width = staticWidth ?
          page.view.get$item().getWidth() : 'Flexible';

      // Get padding
      var padding = page.model.getConfig('html/padding');

      var text = 'Mode',
          $combo = $([
            '<div class="input-group">',
            '<span class="input-group-addon">', text, '</span>',
            '</div>'
          ].join(''));

      return $ul.append([

        $('<li class="layout-behavior" />').append(
            $combo.append(
                this.renderCombobox(
                    [
                      {
                        type: 'text',
                        value: modes.freeStyle
                      },
                      {
                        type: 'text',
                        value: modes.jqUIGrid
                      },
                      {
                        type: 'text',
                        value: modes.snap2grid
                      }
                    ],
                    layout.controller.getBehaviorMode(),
                    'Mode',
                    'layoutMode',
                    undefined,
                    true
                )
            )
        ),

        $('<li class="layout-cell-width" />').append(
            this.renderTextField({
              name: 'layout-cell-width',
              text: 'Cell size',
              value: cellWidth.toFixed(3),
              visible: true,
              disabled: true
            })
        ),

        $('<li class="page-width" />').append(
            this.renderTextField({
              name: 'page-width',
              text: 'Page width',
              value: width,
              visible: true,
              disabled: true
            })
        ),

        $('<li class="page-scroll-height" />').append(
            this.renderNumberField({
              name: 'pageScrollHeight',
              text: 'Scroll height',
              value: parseInt(pageScrollHeight, 10) || 0,
              visible: true,
              disabled: false
            })
        ),

        $('<li class="page-layout-columns" />').append(
            this.renderNumberField({
              name: 'layoutColumns',
              text: 'Columns',
              value: layout.config.grid.columns,
              visible: true,
              disabled: true
            })
        ),

        $('<li class="page-padding" />').append(
            this.renderNumberField({
              name: 'pagePaddingTop',
              text: 'Padding top',
              value: padding.top,
              visible: true,
              disabled: false
            })
        ),

        $('<li class="page-padding" />').append(
            this.renderNumberField({
              name: 'pagePaddingLeft',
              text: 'Padding left',
              value: padding.left,
              visible: true,
              disabled: false
            })
        ),

        $('<li class="page-padding" />').append(
            this.renderNumberField({
              name: 'pagePaddingBottom',
              text: 'Padding bottom',
              value: padding.bottom,
              visible: true,
              disabled: false
            })
        ),

        $('<li class="page-padding" />').append(
            this.renderNumberField({
              name: 'pagePaddingRight',
              text: 'Padding right',
              value: padding.right,
              visible: true,
              disabled: false
            })
        )
      ]);
    },

    /**
     * Render widgets prefs
     * @memberOf PagesPreferences
     * @param {Page} page
     * @returns {*}
     */
    renderWidgetsPrefs: function renderWidgetsPrefs(page) {

      /**
       * Get page items
       * @type {*}
       */
      var widgets = page.model.getItems();

      /**
       * Render widgets
       * @returns {Array}
       * @private
       */
      function _renderWidgets() {

        var list = [],
            widget, uuid,
            title, index;

        for (index in widgets) {

          if (widgets.hasOwnProperty(index)) {

            /**
             * Define widget
             * @type {Widget}
             */
            widget = widgets[index];

            /**
             * Define uuid
             * @type {String}
             */
            uuid = widget.model.getUUID();

            /**
             * Get widget preferences
             * @type {*}
             */
            var preferences = widget.model.getConfig('preferences');

            var locateOn = 'mouseenter.widgetPrefs mouseleave.widgetPrefs click.widgetPrefs',
                thumbnail = preferences.thumbnail || '',
                css = thumbnail.length > 0 ?
                    {backgroundImage: 'url("' + thumbnail + '")'} : {};

            /**
             * Get title
             * @type {*|String}
             */
            title = widget.model.getItemTitle();

            /**
             * Define widget element
             * @type {*|jQuery}
             */
            var $li = $('<li class="widget widget-prefs" />').addClass(
                this.view.controller.getResourceClassName(
                    preferences.resource
                )
            ).attr({
              rel: uuid,
              title: title
            }).css(css).off(locateOn).
                on(locateOn, this.showWidgetPrefs.bind(this));

            this.renderTooltip({
              title: title,
              description: preferences.description || '',
              selector: $li
            });

            list.push($li);
          }
        }

        return list.length > 0 ? list :
            '<li class="no-content">No content available</li>';
      }

      /**
       * Define widgets container
       * @type {*|jQuery}
       */
      var $ul = $('<ul class="default widgets-prefs" />'),
          cname = 'Widgets: ' + Object.keys(widgets).length + ' items';

      return [
        $ul.append(
            this.renderPageWidgetsGlobalPrefs(),
            '<li class="separator" />',
            _renderWidgets.bind(this)()
        ),
        cname
      ];
    },

    /**
     * Render page widgets global preferences
     * @memberOf PagesPreferences
     * @returns {Array}
     */
    renderPageWidgetsGlobalPrefs: function renderPageWidgetsGlobalPrefs() {

      /**
       * Get active page
       * @type {Page}
       */
      var page = this.view.scope.activeContent;

      /**
       * Define page widgets global prefs
       * @type {{overlapping: {type: string, disabled: boolean, checked:
       *     boolean, visible: boolean}}}
       */
      var globalPrefs = {
        overlapping: {
          type: 'checkbox',
          disabled: false,
          checked: page.model.getConfig('widget/overlapping'),
          visible: true
        }
      };

      /**
       * Define List node
       * @type {Array}
       */
      var nodes = [];

      for (var index in globalPrefs) {

        if (globalPrefs.hasOwnProperty(index)) {

          var node = globalPrefs[index],
              $element;

          /**
           * Define text
           * @type {string}
           */
          var text = index.toPoint().humanize();

          if (node.type === 'checkbox') {

            /**
             * Get checkbox
             * @type {*[]}
             */
            $element = this.renderCheckbox({
              name: index,
              text: text.trim(),
              checked: node.checked,
              value: node.checked,
              disabled: node.disabled,
              visible: node.visible
            });
          }

          nodes.push(
              $('<li class="page-widget-prefs" />').addClass([
                [page.name.toClassName(), index].join('-'),
                node.type,
                node.visible ? '' : 'hidden'
              ].join(' ')).append($element)
          );
        }
      }

      return nodes;
    },

    /**
     * Show Widget prefs
     * @memberOf PagesPreferences
     * @param {Event} e
     */
    showWidgetPrefs: function showWidgetPrefs(e) {

      /**
       * Get view
       * @type {BaseView}
       */
      var view = this.view;

      // Get $widget item ui
      var $widget = $(e.target);

      /**
       * Get uuid
       * @type {*|jQuery}
       */
      var uuid = $widget.attr('rel');

      /**
       * Define panel
       * @type {Panel}
       */
      var panel = view.controller.getDesignTimePanel();

      /**
       * Define module name
       * @type {string}
       */
      var module = 'page-data';

      /**
       * Define page data
       * @type {*|PageData}
       */
      var pageData = panel.controller.getPageData();

      /**
       * Get scope
       * @type {WorkspaceData}
       */
      var scope = view.scope;

      /**
       * Open panel
       * @param {function} callback
       * @private
       */
      function _openPanel(callback) {

        $widget.popover('hide');

        scope.observer.publish(
            scope.eventmanager.eventList.switchToActivePage
        );

        panel.observer.publish(
            panel.eventmanager.eventList.openPanel,
            [module, e]
        );

        panel.observer.publish(
            panel.eventmanager.eventList.openPanel,
            [module, e, callback]
        );
      }

      if (e.type === 'mouseenter' || e.type === 'mouseleave') {
        _openPanel(
            pageData.view.controller.locateElementItem.bind({
              scope: pageData,
              uuid: uuid
            })
        );
      }
    }

  }, BasePreferencesElement.prototype);
});